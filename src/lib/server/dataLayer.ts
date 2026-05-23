/**
 * Unified data layer: prefers MongoDB when configured, falls back to in-memory stores.
 * All server routes import from here — they don't need to know which backend is active.
 */
import type { Abstimmung, Argument, Partei, Position } from '$lib/types';
import { getCollection, COLLECTIONS, shouldUseMock } from './db';
import { getAbstimmungBySlug, realAbstimmungen } from '$lib/realData';
import {
  listAbstimmungen as memList,
  getAbstimmung as memGet,
  createAbstimmung as memCreate,
  updateAbstimmung as memUpdate,
  deleteAbstimmung as memDelete,
  addArgument as memAddArg,
  removeArgument as memRemoveArg,
  setParteiPosition as memSetPartei
} from './abstimmungenStore';
import { recordVote as memRecordVote, getCommunity as memGetCommunity, getAllCommunity as memGetAllCommunity } from './communityStore';
import { addInteresse as memAddInteresse, listInteressen as memListInteressen, type Interesse } from './interesseStore';

// ---------- ABSTIMMUNGEN ----------

function withOfficialSeed(items: Abstimmung[]): Abstimmung[] {
  const bySlug = new Map<string, Abstimmung>();
  for (const seed of realAbstimmungen) bySlug.set(seed.slug, structuredClone(seed));
  for (const item of items) bySlug.set(item.slug, structuredClone(item));
  return Array.from(bySlug.values());
}

export async function listAbstimmungen(): Promise<Abstimmung[]> {
  const col = await getCollection<Abstimmung>(COLLECTIONS.abstimmungen);
  if (!col) return withOfficialSeed(memList());
  try {
    const items = await col.find({}, { projection: { _id: 0 } }).toArray();
    if (items.length === 0) return withOfficialSeed(memList());
    return withOfficialSeed(items as Abstimmung[]);
  } catch (err) {
    console.error('[dataLayer] listAbstimmungen DB error:', err);
    return withOfficialSeed(memList());
  }
}

export async function getAbstimmung(slug: string): Promise<Abstimmung | null> {
  const col = await getCollection<Abstimmung>(COLLECTIONS.abstimmungen);
  if (!col) return memGet(slug) ?? getAbstimmungBySlug(slug) ?? null;
  try {
    const doc = await col.findOne({ slug }, { projection: { _id: 0 } });
    if (doc) return doc as Abstimmung;
    return memGet(slug) ?? getAbstimmungBySlug(slug) ?? null;
  } catch (err) {
    console.error('[dataLayer] getAbstimmung DB error:', err);
    return memGet(slug) ?? getAbstimmungBySlug(slug) ?? null;
  }
}

export async function createAbstimmung(a: Abstimmung): Promise<Abstimmung> {
  const col = await getCollection<Abstimmung>(COLLECTIONS.abstimmungen);
  if (!col) return memCreate(a);
  try {
    await col.insertOne(a);
    memCreate(a); // keep memory in sync for hybrid setups
    return a;
  } catch (err) {
    console.error('[dataLayer] createAbstimmung DB error:', err);
    return memCreate(a);
  }
}

export async function updateAbstimmung(slug: string, patch: Partial<Abstimmung>): Promise<Abstimmung | null> {
  const col = await getCollection<Abstimmung>(COLLECTIONS.abstimmungen);
  if (!col) return memUpdate(slug, patch);
  try {
    const { _id, ...cleanPatch } = patch as Record<string, unknown>;
    await col.updateOne({ slug }, { $set: cleanPatch });
    memUpdate(slug, patch);
    return getAbstimmung(slug);
  } catch (err) {
    console.error('[dataLayer] updateAbstimmung DB error:', err);
    return memUpdate(slug, patch);
  }
}

export async function deleteAbstimmung(slug: string): Promise<boolean> {
  const col = await getCollection<Abstimmung>(COLLECTIONS.abstimmungen);
  if (!col) return memDelete(slug);
  try {
    await col.deleteOne({ slug });
    memDelete(slug);
    return true;
  } catch (err) {
    console.error('[dataLayer] deleteAbstimmung DB error:', err);
    return memDelete(slug);
  }
}

export async function addArgument(slug: string, side: 'pro' | 'contra', arg: Argument): Promise<Abstimmung | null> {
  const col = await getCollection<Abstimmung>(COLLECTIONS.abstimmungen);
  if (!col) return memAddArg(slug, side, arg);
  try {
    const field = side === 'pro' ? 'proArguments' : 'contraArguments';
    await col.updateOne({ slug }, { $push: { [field]: arg } } as never);
    memAddArg(slug, side, arg);
    return getAbstimmung(slug);
  } catch (err) {
    console.error('[dataLayer] addArgument DB error:', err);
    return memAddArg(slug, side, arg);
  }
}

export async function removeArgument(slug: string, side: 'pro' | 'contra', argId: string): Promise<Abstimmung | null> {
  const col = await getCollection<Abstimmung>(COLLECTIONS.abstimmungen);
  if (!col) return memRemoveArg(slug, side, argId);
  try {
    const field = side === 'pro' ? 'proArguments' : 'contraArguments';
    await col.updateOne({ slug }, { $pull: { [field]: { id: argId } } } as never);
    memRemoveArg(slug, side, argId);
    return getAbstimmung(slug);
  } catch (err) {
    console.error('[dataLayer] removeArgument DB error:', err);
    return memRemoveArg(slug, side, argId);
  }
}

export async function setParteiPosition(slug: string, parteien: Partei[]): Promise<Abstimmung | null> {
  const col = await getCollection<Abstimmung>(COLLECTIONS.abstimmungen);
  if (!col) return memSetPartei(slug, parteien);
  try {
    await col.updateOne({ slug }, { $set: { parteien } });
    memSetPartei(slug, parteien);
    return getAbstimmung(slug);
  } catch (err) {
    console.error('[dataLayer] setParteiPosition DB error:', err);
    return memSetPartei(slug, parteien);
  }
}

// ---------- COMMUNITY VOTES ----------

export interface CommunityResult {
  ja: number;
  nein: number;
  total: number;
}

interface VoteDoc {
  slug: string;
  position: Position;
  createdAt: Date;
  clientId?: string;
}

export async function recordCommunityVote(slug: string, position: Position, clientId?: string): Promise<CommunityResult> {
  const col = await getCollection<VoteDoc>(COLLECTIONS.communityVotes);
  if (!col) {
    const c = memRecordVote(slug, position);
    return { ja: c.ja, nein: c.nein, total: c.ja + c.nein };
  }
  try {
    if (clientId) {
      // Upsert per clientId so the same client can change their mind once
      await col.updateOne(
        { slug, clientId },
        { $set: { slug, position, clientId, createdAt: new Date() } },
        { upsert: true }
      );
    } else {
      await col.insertOne({ slug, position, createdAt: new Date() });
    }
    return getCommunityVotes(slug);
  } catch (err) {
    console.error('[dataLayer] recordCommunityVote DB error:', err);
    const c = memRecordVote(slug, position);
    return { ja: c.ja, nein: c.nein, total: c.ja + c.nein };
  }
}

export async function getCommunityVotes(slug: string): Promise<CommunityResult> {
  const col = await getCollection<VoteDoc>(COLLECTIONS.communityVotes);
  if (!col) {
    const c = memGetCommunity(slug);
    return { ja: c.ja, nein: c.nein, total: c.ja + c.nein };
  }
  try {
    const ja = await col.countDocuments({ slug, position: 'JA' });
    const nein = await col.countDocuments({ slug, position: 'NEIN' });
    // Merge seed numbers so empty production DB still shows life
    const seed = memGetCommunity(slug);
    const totalJa = ja + (ja === 0 ? seed.ja : 0);
    const totalNein = nein + (nein === 0 ? seed.nein : 0);
    return { ja: totalJa, nein: totalNein, total: totalJa + totalNein };
  } catch (err) {
    console.error('[dataLayer] getCommunityVotes DB error:', err);
    const c = memGetCommunity(slug);
    return { ja: c.ja, nein: c.nein, total: c.ja + c.nein };
  }
}

export async function getAllCommunityVotes(): Promise<Record<string, CommunityResult>> {
  const col = await getCollection<VoteDoc>(COLLECTIONS.communityVotes);
  if (!col) {
    const all = memGetAllCommunity();
    const out: Record<string, CommunityResult> = {};
    for (const [k, v] of Object.entries(all)) out[k] = { ja: v.ja, nein: v.nein, total: v.ja + v.nein };
    return out;
  }
  try {
    const agg = await col
      .aggregate([
        { $group: { _id: { slug: '$slug', position: '$position' }, count: { $sum: 1 } } }
      ])
      .toArray();
    const out: Record<string, CommunityResult> = {};
    for (const row of agg) {
      const slug = row._id.slug as string;
      const pos = row._id.position as Position;
      out[slug] ??= { ja: 0, nein: 0, total: 0 };
      if (pos === 'JA') out[slug].ja = row.count as number;
      else out[slug].nein = row.count as number;
      out[slug].total = out[slug].ja + out[slug].nein;
    }
    return out;
  } catch (err) {
    console.error('[dataLayer] getAllCommunityVotes DB error:', err);
    const all = memGetAllCommunity();
    const out: Record<string, CommunityResult> = {};
    for (const [k, v] of Object.entries(all)) out[k] = { ja: v.ja, nein: v.nein, total: v.ja + v.nein };
    return out;
  }
}

// ---------- INTERESSE (Party-interest registration) ----------

interface InteresseDoc {
  id: string;
  parteiKuerzel: string;
  name: string;
  email: string;
  nachricht?: string;
  createdAt: Date | string;
}

export async function addInteresse(data: { parteiKuerzel: string; name: string; email: string; nachricht?: string }): Promise<Interesse> {
  const col = await getCollection<InteresseDoc>(COLLECTIONS.parteiInteressen);
  if (!col) return memAddInteresse(data);
  try {
    const entry: InteresseDoc = {
      id: `db-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ...data,
      createdAt: new Date()
    };
    await col.insertOne(entry);
    return {
      id: entry.id,
      parteiKuerzel: entry.parteiKuerzel,
      name: entry.name,
      email: entry.email,
      nachricht: entry.nachricht,
      createdAt: (entry.createdAt as Date).toISOString()
    };
  } catch (err) {
    console.error('[dataLayer] addInteresse DB error:', err);
    return memAddInteresse(data);
  }
}

export async function listInteressen(): Promise<Interesse[]> {
  const col = await getCollection<InteresseDoc>(COLLECTIONS.parteiInteressen);
  if (!col) return memListInteressen();
  try {
    const rows = await col.find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).toArray();
    return rows.map((r) => ({
      id: r.id,
      parteiKuerzel: r.parteiKuerzel,
      name: r.name,
      email: r.email,
      nachricht: r.nachricht,
      createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt)
    }));
  } catch (err) {
    console.error('[dataLayer] listInteressen DB error:', err);
    return memListInteressen();
  }
}

export { shouldUseMock };
export type { Interesse };
