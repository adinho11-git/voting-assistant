import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export const toasts = writable<Toast[]>([]);

let counter = 0;

export function showToast(message: string, type: ToastType = 'success', durationMs = 3500): void {
  const id = Date.now() + counter++;
  toasts.update((t) => [...t, { id, message, type }]);
  setTimeout(() => {
    toasts.update((t) => t.filter((x) => x.id !== id));
  }, durationMs);
}

export function dismissToast(id: number): void {
  toasts.update((t) => t.filter((x) => x.id !== id));
}
