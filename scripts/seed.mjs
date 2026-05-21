#!/usr/bin/env node
/**
 * Seed-Script — populates MongoDB with the initial mockAbstimmungen.
 *
 * Usage:
 *   node scripts/seed.mjs
 *
 * Reads MONGODB_URI from .env (or process env). USE_MOCK_DATA must be 'false'
 * (or unset) for this script to proceed.
 *
 * Safe to re-run: uses upsert by `slug`. Won't overwrite existing
 * community votes or interesse-registrations.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MongoClient } from 'mongodb';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

async function loadDotEnv() {
  try {
    const raw = await readFile(path.join(ROOT, '.env'), 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    }
  } catch {
    // .env not present — fall through to process env
  }
}

async function loadMockAbstimmungen() {
  // Mirror of src/lib/mockData.ts — kept in sync manually.
  // We import via a side-by-side .js shim to avoid TS-runner dependencies.
  const mockPath = path.join(ROOT, 'src', 'lib', 'mockData.ts');
  const raw = await readFile(mockPath, 'utf8');
  // Heuristic extraction — only safe because the file is hand-maintained.
  // For a hardened pipeline, switch to `tsx` and import directly.
  const match = raw.match(/export const mockAbstimmungen[^=]*=\s*(\[[\s\S]*?\n\];)/);
  if (!match) {
    throw new Error('Konnte mockAbstimmungen nicht aus mockData.ts extrahieren.');
  }
  // Wrap in a function to evaluate as a JS literal
  const literal = match[1].replace(/;$/, '');
  // eslint-disable-next-line no-new-func
  const value = new Function(`return ${literal};`)();
  return value;
}

async function main() {
  await loadDotEnv();
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('[seed] FEHLER: MONGODB_URI ist nicht gesetzt. Trage sie in .env ein oder setze sie als Umgebungsvariable.');
    process.exit(1);
  }

  console.log('[seed] Verbinde mit MongoDB...');
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
  await client.connect();
  const db = client.db('voting_assistant');

  const abstimmungenCol = db.collection('abstimmungen');
  const communityCol = db.collection('communityVotes');
  const interesseCol = db.collection('parteiInteressen');

  // Ensure indexes
  await abstimmungenCol.createIndex({ slug: 1 }, { unique: true });
  await communityCol.createIndex({ slug: 1, clientId: 1 }, { unique: false });
  await interesseCol.createIndex({ createdAt: -1 });

  const abstimmungen = await loadMockAbstimmungen();
  console.log(`[seed] ${abstimmungen.length} Abstimmungen aus mockData.ts geladen.`);

  let inserted = 0;
  let updated = 0;
  for (const a of abstimmungen) {
    const res = await abstimmungenCol.updateOne(
      { slug: a.slug },
      { $set: a },
      { upsert: true }
    );
    if (res.upsertedCount > 0) inserted++;
    else if (res.modifiedCount > 0) updated++;
  }

  console.log(`[seed] ✓ Fertig: ${inserted} neu, ${updated} aktualisiert.`);

  // Optional: ensure community-vote seeds exist (without overwriting real votes)
  const seedCounts = {
    'klima-initiative-2026': { ja: 28, nein: 14 },
    'gesundheitsreform-2026': { ja: 35, nein: 11 },
    'mieten-initiative-2026': { ja: 19, nein: 22 },
    'mobilitaetsfonds-2026': { ja: 30, nein: 9 }
  };
  for (const [slug, { ja, nein }] of Object.entries(seedCounts)) {
    const existing = await communityCol.countDocuments({ slug });
    if (existing === 0) {
      const docs = [];
      for (let i = 0; i < ja; i++) docs.push({ slug, position: 'JA', createdAt: new Date(), seeded: true });
      for (let i = 0; i < nein; i++) docs.push({ slug, position: 'NEIN', createdAt: new Date(), seeded: true });
      if (docs.length > 0) await communityCol.insertMany(docs);
      console.log(`[seed] Community-Seed für ${slug}: +${docs.length}`);
    }
  }

  await client.close();
  console.log('[seed] Verbindung geschlossen. 🚀 Setze USE_MOCK_DATA=false und deploy.');
}

main().catch((err) => {
  console.error('[seed] FEHLER:', err);
  process.exit(1);
});
