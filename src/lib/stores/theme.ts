import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme_v1';

function initial(): Theme {
  if (!browser) return 'light';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  } catch {
    // ignore
  }
  return 'light';
}

export const theme = writable<Theme>(initial());

export function setTheme(next: Theme): void {
  theme.set(next);
  if (!browser) return;
  try {
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.setAttribute('data-theme', next);
  } catch {
    // ignore
  }
}

export function toggleTheme(): void {
  theme.update((current) => {
    const next: Theme = current === 'dark' ? 'light' : 'dark';
    if (browser) {
      try {
        localStorage.setItem(STORAGE_KEY, next);
        document.documentElement.setAttribute('data-theme', next);
      } catch {
        // ignore
      }
    }
    return next;
  });
}

export function applyInitialTheme(): void {
  if (!browser) return;
  document.documentElement.setAttribute('data-theme', initial());
}
