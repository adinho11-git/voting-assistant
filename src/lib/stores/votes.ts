import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import type { Position } from '$lib/types';

const STORAGE_KEY = 'votes_v1';

export const votesStore = writable<Record<string, Position>>({});

export function loadVotesFromStorage(): void {
  if (!browser) return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, Position>;
      votesStore.set(parsed);
    }
  } catch {
    // ignore corrupt storage
  }
}

function persist(state: Record<string, Position>): void {
  if (!browser) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage may be full / disabled
  }
}

export function setVote(slug: string, position: Position): void {
  votesStore.update((state) => {
    const next = { ...state, [slug]: position };
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

export function getVote(slug: string): Position | undefined {
  return get(votesStore)[slug];
}
