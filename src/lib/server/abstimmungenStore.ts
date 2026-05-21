/**
 * In-memory mutable store for Abstimmungen (mock-mode fallback for Admin CRUD).
 * Starts from mockAbstimmungen, then admin edits stay in memory until next deploy.
 */
import { mockAbstimmungen } from '$lib/mockData';
import type { Abstimmung, Argument, Partei } from '$lib/types';

let store: Abstimmung[] = mockAbstimmungen.map((a) => structuredClone(a));

export function listAbstimmungen(): Abstimmung[] {
  return store.map((a) => structuredClone(a));
}

export function getAbstimmung(slug: string): Abstimmung | null {
  return store.find((a) => a.slug === slug) ?? null;
}

export function createAbstimmung(a: Abstimmung): Abstimmung {
  if (store.some((x) => x.slug === a.slug)) {
    throw new Error(`Abstimmung mit Slug "${a.slug}" existiert bereits.`);
  }
  store.push(structuredClone(a));
  return structuredClone(a);
}

export function updateAbstimmung(slug: string, patch: Partial<Abstimmung>): Abstimmung | null {
  const idx = store.findIndex((a) => a.slug === slug);
  if (idx === -1) return null;
  store[idx] = { ...store[idx], ...structuredClone(patch), slug }; // slug stays
  return structuredClone(store[idx]);
}

export function deleteAbstimmung(slug: string): boolean {
  const before = store.length;
  store = store.filter((a) => a.slug !== slug);
  return store.length < before;
}

export function addArgument(slug: string, side: 'pro' | 'contra', arg: Argument): Abstimmung | null {
  const a = store.find((x) => x.slug === slug);
  if (!a) return null;
  if (side === 'pro') a.proArguments.push(structuredClone(arg));
  else a.contraArguments.push(structuredClone(arg));
  return structuredClone(a);
}

export function removeArgument(slug: string, side: 'pro' | 'contra', argId: string): Abstimmung | null {
  const a = store.find((x) => x.slug === slug);
  if (!a) return null;
  if (side === 'pro') a.proArguments = a.proArguments.filter((x) => x.id !== argId);
  else a.contraArguments = a.contraArguments.filter((x) => x.id !== argId);
  return structuredClone(a);
}

export function setParteiPosition(slug: string, parteien: Partei[]): Abstimmung | null {
  const a = store.find((x) => x.slug === slug);
  if (!a) return null;
  a.parteien = structuredClone(parteien);
  return structuredClone(a);
}
