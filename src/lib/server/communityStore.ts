/**
 * In-memory community vote counter (used when MongoDB is unavailable).
 * Resets on server restart, but keeps the UI usable in mock mode.
 */
import type { Position } from '$lib/types';

interface CommunityCount {
  ja: number;
  nein: number;
}

const counts = new Map<string, CommunityCount>();

// Seed with realistic initial numbers so demo doesn't show 0/0
const SEED: Record<string, CommunityCount> = {
  'klima-initiative-2026': { ja: 28, nein: 14 },
  'gesundheitsreform-2026': { ja: 35, nein: 11 },
  'mieten-initiative-2026': { ja: 19, nein: 22 },
  'mobilitaetsfonds-2026': { ja: 30, nein: 9 }
};

function ensure(slug: string): CommunityCount {
  if (!counts.has(slug)) {
    counts.set(slug, SEED[slug] ? { ...SEED[slug] } : { ja: 0, nein: 0 });
  }
  return counts.get(slug)!;
}

export function recordVote(slug: string, position: Position): CommunityCount {
  const c = ensure(slug);
  if (position === 'JA') c.ja += 1;
  else c.nein += 1;
  return { ...c };
}

export function getCommunity(slug: string): CommunityCount {
  return { ...ensure(slug) };
}

export function getAllCommunity(): Record<string, CommunityCount> {
  const out: Record<string, CommunityCount> = {};
  for (const slug of Object.keys(SEED)) ensure(slug);
  for (const [k, v] of counts.entries()) out[k] = { ...v };
  return out;
}
