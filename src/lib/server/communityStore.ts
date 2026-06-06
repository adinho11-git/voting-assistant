/**
 * In-memory community vote counter (used when MongoDB is unavailable).
 * Resets on server restart, but keeps the UI usable in mock mode.
 *
 * Votes are deduplicated per client: a known clientId can change its mind
 * (the vote is upserted, not added), so repeated requests from the same
 * browser never inflate the totals — mirroring the MongoDB upsert path.
 */
import type { Position } from '$lib/types';

interface CommunityCount {
  ja: number;
  nein: number;
}

// Seed with realistic initial numbers so demo doesn't show 0/0
const SEED: Record<string, CommunityCount> = {
  'klima-initiative-2026': { ja: 28, nein: 14 },
  'gesundheitsreform-2026': { ja: 35, nein: 11 },
  'mieten-initiative-2026': { ja: 19, nein: 22 },
  'mobilitaetsfonds-2026': { ja: 30, nein: 9 }
};

// Per-client votes: slug -> (clientId -> position). One vote per client, upsertable.
const clientVotes = new Map<string, Map<string, Position>>();
// Fallback bucket for requests without a clientId: increment-only.
const anonVotes = new Map<string, CommunityCount>();

function tally(slug: string): CommunityCount {
  const total: CommunityCount = SEED[slug] ? { ...SEED[slug] } : { ja: 0, nein: 0 };
  const cv = clientVotes.get(slug);
  if (cv) {
    for (const pos of cv.values()) {
      if (pos === 'JA') total.ja += 1;
      else total.nein += 1;
    }
  }
  const anon = anonVotes.get(slug);
  if (anon) {
    total.ja += anon.ja;
    total.nein += anon.nein;
  }
  return total;
}

export function recordVote(slug: string, position: Position, clientId?: string): CommunityCount {
  if (clientId) {
    let cv = clientVotes.get(slug);
    if (!cv) {
      cv = new Map<string, Position>();
      clientVotes.set(slug, cv);
    }
    // Upsert: the same client can change its vote, but never counts twice.
    cv.set(clientId, position);
  } else {
    let anon = anonVotes.get(slug);
    if (!anon) {
      anon = { ja: 0, nein: 0 };
      anonVotes.set(slug, anon);
    }
    if (position === 'JA') anon.ja += 1;
    else anon.nein += 1;
  }
  return tally(slug);
}

export function getCommunity(slug: string): CommunityCount {
  return tally(slug);
}

export function getAllCommunity(): Record<string, CommunityCount> {
  const slugs = new Set<string>([
    ...Object.keys(SEED),
    ...clientVotes.keys(),
    ...anonVotes.keys()
  ]);
  const out: Record<string, CommunityCount> = {};
  for (const slug of slugs) out[slug] = tally(slug);
  return out;
}
