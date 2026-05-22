import { browser } from '$app/environment';
import { get, writable } from 'svelte/store';
import type { Position, UserPosition } from '$lib/types';

const STORAGE_KEY = 'engagement_v1';

export type ArgumentSide = 'pro' | 'contra';
export type ArgumentWeight = 0 | 1 | 2 | 3;

export interface WeightedArgument {
  side: ArgumentSide;
  weight: ArgumentWeight;
  updatedAt: string;
}

export interface JournalEvent {
  id: string;
  type: 'position' | 'confidence' | 'note' | 'assistant' | 'weights' | 'feedback' | 'favorite';
  title: string;
  detail: string;
  createdAt: string;
}

export interface JournalEntry {
  position?: UserPosition;
  confidence?: number;
  note?: string;
  updatedAt: string;
  timeline: JournalEvent[];
}

export interface FeedbackEntry {
  clarity: number;
  neutrality: number;
  usefulness: number;
  comment: string;
  updatedAt: string;
}

export interface AssistantEntry {
  themes: string[];
  position?: UserPosition;
  reason: string;
  updatedAt: string;
}

export interface EngagementState {
  favorites: Record<string, boolean>;
  weights: Record<string, Record<string, WeightedArgument>>;
  journal: Record<string, JournalEntry>;
  feedback: Record<string, FeedbackEntry>;
  assistant: Record<string, AssistantEntry>;
}

const initialState: EngagementState = {
  favorites: {},
  weights: {},
  journal: {},
  feedback: {},
  assistant: {}
};

export const engagementStore = writable<EngagementState>(initialState);

function now(): string {
  return new Date().toISOString();
}

function eventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createEvent(type: JournalEvent['type'], title: string, detail: string): JournalEvent {
  return {
    id: eventId(),
    type,
    title,
    detail,
    createdAt: now()
  };
}

function emptyJournalEntry(): JournalEntry {
  return {
    updatedAt: now(),
    timeline: []
  };
}

function appendTimeline(entry: JournalEntry | undefined, event: JournalEvent): JournalEntry {
  const base = entry ?? emptyJournalEntry();
  return {
    ...base,
    updatedAt: now(),
    timeline: [event, ...(base.timeline ?? [])].slice(0, 14)
  };
}

function persist(state: EngagementState): void {
  if (!browser) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Local persistence is best-effort in the prototype.
  }
}

export function loadEngagementFromStorage(): void {
  if (!browser) return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Partial<EngagementState>;
    engagementStore.set({
      favorites: parsed.favorites ?? {},
      weights: parsed.weights ?? {},
      journal: parsed.journal ?? {},
      feedback: parsed.feedback ?? {},
      assistant: parsed.assistant ?? {}
    });
  } catch {
    engagementStore.set(initialState);
  }
}

function updateState(updater: (state: EngagementState) => EngagementState): void {
  engagementStore.update((state) => {
    const next = updater(state);
    persist(next);
    return next;
  });
}

export function toggleFavorite(slug: string, title: string): boolean {
  const current = !!get(engagementStore).favorites[slug];
  const nextValue = !current;
  updateState((state) => {
    const journal = appendTimeline(
      state.journal[slug],
      createEvent(
        'favorite',
        nextValue ? 'Zur Merkliste hinzugefügt' : 'Aus Merkliste entfernt',
        title
      )
    );
    return {
      ...state,
      favorites: { ...state.favorites, [slug]: nextValue },
      journal: { ...state.journal, [slug]: journal }
    };
  });
  return nextValue;
}

export function setArgumentWeight(
  slug: string,
  argumentId: string,
  side: ArgumentSide,
  weight: ArgumentWeight
): void {
  updateState((state) => {
    const slugWeights = state.weights[slug] ?? {};
    return {
      ...state,
      weights: {
        ...state.weights,
        [slug]: {
          ...slugWeights,
          [argumentId]: { side, weight, updatedAt: now() }
        }
      }
    };
  });
}

export function recordWeightSummary(slug: string, title: string, detail: string): void {
  updateState((state) => ({
    ...state,
    journal: {
      ...state.journal,
      [slug]: appendTimeline(state.journal[slug], createEvent('weights', title, detail))
    }
  }));
}

export function saveJournalEntry(
  slug: string,
  patch: Partial<Pick<JournalEntry, 'position' | 'confidence' | 'note'>>,
  event?: { type: JournalEvent['type']; title: string; detail: string }
): void {
  updateState((state) => {
    const current = state.journal[slug] ?? emptyJournalEntry();
    const withEvent = event ? appendTimeline(current, createEvent(event.type, event.title, event.detail)) : current;
    return {
      ...state,
      journal: {
        ...state.journal,
        [slug]: {
          ...withEvent,
          ...patch,
          updatedAt: now()
        }
      }
    };
  });
}

export function saveAssistantEntry(
  slug: string,
  entry: Omit<AssistantEntry, 'updatedAt'>,
  detail: string
): void {
  updateState((state) => ({
    ...state,
    assistant: {
      ...state.assistant,
      [slug]: { ...entry, updatedAt: now() }
    },
    journal: {
      ...state.journal,
      [slug]: appendTimeline(
        state.journal[slug],
        createEvent('assistant', 'Abstimmungs-Assistent abgeschlossen', detail)
      )
    }
  }));
}

export function saveFeedback(slug: string, feedback: FeedbackEntry): void {
  const avg = Math.round(((feedback.clarity + feedback.neutrality + feedback.usefulness) / 3) * 10) / 10;
  updateState((state) => ({
    ...state,
    feedback: {
      ...state.feedback,
      [slug]: { ...feedback, updatedAt: now() }
    },
    journal: {
      ...state.journal,
      [slug]: appendTimeline(
        state.journal[slug],
        createEvent('feedback', 'Feedback abgegeben', `Durchschnittliche Bewertung: ${avg}/5`)
      )
    }
  }));
}

export function toOfficialPosition(position: UserPosition | undefined): Position | undefined {
  if (position === 'JA' || position === 'NEIN') return position;
  return undefined;
}
