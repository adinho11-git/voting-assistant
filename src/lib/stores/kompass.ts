import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { MatchResult } from '$lib/kompass';

const STORAGE_KEY = 'kompass_v1';

export interface KompassState {
  answers: Record<string, number>;
  results: MatchResult[];
  savedAt: string;
}

function load(): KompassState | null {
  if (!browser) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as KompassState;
  } catch {
    return null;
  }
}

const internal = writable<KompassState | null>(load());

export const kompassStore = {
  subscribe: internal.subscribe,
  save(answers: Record<string, number>, results: MatchResult[]) {
    const state: KompassState = { answers, results, savedAt: new Date().toISOString() };
    internal.set(state);
    if (browser) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // ignore
      }
    }
  },
  clear() {
    internal.set(null);
    if (browser) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  }
};
