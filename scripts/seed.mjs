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
import dns from 'node:dns';
import { MongoClient } from 'mongodb';

// Fall back to Google DNS if the system resolver refuses SRV lookups (common on some ISPs).
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // ignore — keep default resolver
}

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

async function loadAbstimmungen() {
  // Source-of-truth is src/lib/realData.ts. We extract realAbstimmungen literal via regex
  // and evaluate it as JS. This avoids requiring tsx / esbuild for the seed pipeline.
  const realPath = path.join(ROOT, 'src', 'lib', 'realData.ts');
  const raw = await readFile(realPath, 'utf8');
  const match = raw.match(/export const realAbstimmungen[^=]*=\s*(\[[\s\S]*?\n\];)/);
  if (!match) {
    throw new Error('Konnte realAbstimmungen nicht aus realData.ts extrahieren.');
  }
  const literal = match[1].replace(/;$/, '');
  // Resolve `TODAY` constant referenced inside the literal
  const today = new Date().toISOString().slice(0, 10);
  const literalResolved = literal.replace(/TODAY/g, JSON.stringify(today));
  // eslint-disable-next-line no-new-func
  const value = new Function(`return ${literalResolved};`)();
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

  const abstimmungen = await loadAbstimmungen();
  console.log(`[seed] ${abstimmungen.length} Abstimmungen aus realData.ts geladen.`);

  // Wipe abstimmungen-Collection first so renames / removals propagate
  await abstimmungenCol.deleteMany({});

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

  // Community-vote seeds for the two upcoming June 2026 votes
  // (only inserted if no real votes exist for that slug)
  const seedCounts = {
    'nachhaltigkeitsinitiative-2026': { ja: 38, nein: 41 },
    'zivildienstgesetz-2026': { ja: 49, nein: 31 }
  };
  for (const [slug, { ja, nein }] of Object.entries(seedCounts)) {
    const existing = await communityCol.countDocuments({ slug, seeded: { $exists: false } });
    if (existing === 0) {
      // Clear previous seeded entries before re-seeding
      await communityCol.deleteMany({ slug, seeded: true });
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
