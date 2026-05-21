/**
 * In-memory store for party-interest registrations (mock-mode fallback).
 */
export interface Interesse {
  id: string;
  parteiKuerzel: string;
  name: string;
  email: string;
  nachricht?: string;
  createdAt: string; // ISO string
}

const interessen: Interesse[] = [];

let counter = 0;

export function addInteresse(data: Omit<Interesse, 'id' | 'createdAt'>): Interesse {
  const entry: Interesse = {
    id: `local-${Date.now()}-${counter++}`,
    createdAt: new Date().toISOString(),
    ...data
  };
  interessen.push(entry);
  return entry;
}

export function listInteressen(): Interesse[] {
  return [...interessen].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
