import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import type { UserPosition } from '$lib/types';

const STORAGE_KEY = 'votes_v2';
const LEGACY_KEY = 'votes_v1';

export interface VoteEntry {
  position: UserPosition;
  note?: string;
  /** ISO timestamp of last update */
  updatedAt: string;
}

export type VotesMap = Record<string, VoteEntry>;

export const votesStore = writable<VotesMap>({});

function migrateLegacy(): VotesMap | null {
  if (!browser) return null;
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, 'JA' | 'NEIN'>;
    const upgraded: VotesMap = {};
    for (const [slug, position] of Object.entries(parsed)) {
      upgraded[slug] = { position, updatedAt: new Date().toISOString() };
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(upgraded));
    localStorage.removeItem(LEGACY_KEY);
    return upgraded;
  } catch {
    return null;
  }
}

export function loadVotesFromStorage(): void {
  if (!browser) return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      votesStore.set(JSON.parse(raw) as VotesMap);
      return;
    }
    const migrated = migrateLegacy();
    if (migrated) votesStore.set(migrated);
  } catch {
    // ignore
  }
}

function persist(state: VotesMap): void {
  if (!browser) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function setVote(slug: string, position: UserPosition, note?: string): void {
  votesStore.update((state) => {
    const existing = state[slug];
    const next: VotesMap = {
      ...state,
      [slug]: {
        position,
        note: note !== undefined ? note : existing?.note,
        updatedAt: new Date().toISOString()
      }
    };
    persist(next);
    return next;
  });
}

export function setNote(slug: string, note: string): void {
  votesStore.update((state) => {
    const existing = state[slug];
    if (!existing) return state;
    const next: VotesMap = {
      ...state,
      [slug]: { ...existing, note, updatedAt: new Date().toISOString() }
    };
    persist(next);
    return next;
  });
}

export function clearVote(slug: string): void {
  votesStore.update((state) => {
    const next = { ...state };
    delete next[slug];
    persist(next);
    return next;
  });
}

export function clearAllVotes(): void {
  votesStore.set({});
  persist({});
}

export function getVote(slug: string): VoteEntry | undefined {
  return get(votesStore)[slug];
}
