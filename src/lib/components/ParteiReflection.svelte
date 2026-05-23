<script lang="ts">
  import { browser } from '$app/environment';
  import { showToast } from '$lib/stores/toast';

  export let parteiKuerzel: string;
  export let parteiName: string;
  export let parteiFarbe: string;

  interface PartyReflection {
    note: string;
    remembered: boolean;
    updatedAt: string;
  }

  let note = '';
  let savedNote = '';
  let savedAt = '';
  let remembered = false;
  let loadedKey = '';

  $: if (browser && parteiKuerzel && loadedKey !== storageKey()) {
    loadFromStorage();
  }

  function storageKey(): string {
    return `party_reflection_v1_${parteiKuerzel.toLowerCase()}`;
  }

  function loadFromStorage(): void {
    loadedKey = storageKey();
    try {
      const raw = localStorage.getItem(loadedKey);
      if (!raw) {
        note = '';
        savedNote = '';
        savedAt = '';
        remembered = false;
        return;
      }
      const parsed = JSON.parse(raw) as Partial<PartyReflection>;
      note = parsed.note ?? '';
      savedNote = parsed.note ?? '';
      savedAt = parsed.updatedAt ?? '';
      remembered = !!parsed.remembered;
    } catch {
      note = '';
      savedNote = '';
      savedAt = '';
      remembered = false;
    }
  }

  function persist(nextNote: string, nextRemembered = remembered): void {
    if (!browser) return;
    const cleanNote = nextNote.trim();
    const updatedAt = new Date().toISOString();
    const payload: PartyReflection = {
      note: cleanNote,
      remembered: nextRemembered,
      updatedAt
    };
    try {
      if (!cleanNote && !nextRemembered) {
        localStorage.removeItem(storageKey());
        savedAt = '';
      } else {
        localStorage.setItem(storageKey(), JSON.stringify(payload));
        savedAt = updatedAt;
      }
      note = cleanNote;
      savedNote = cleanNote;
      remembered = nextRemembered;
    } catch {
      showToast('Lokales Speichern ist in diesem Browser gerade nicht möglich.', 'error');
    }
  }

  function saveNote(): void {
    persist(note);
    showToast(note.trim() ? 'Notiz lokal gespeichert.' : 'Notiz geleert.', 'success');
  }

  function clearNote(): void {
    persist('', remembered);
    showToast('Notiz entfernt.', 'info');
  }

  function toggleRemembered(): void {
    const next = !remembered;
    persist(note, next);
    showToast(next ? `${parteiKuerzel} lokal gemerkt.` : `${parteiKuerzel} nicht mehr gemerkt.`, 'success');
  }

  function formatSavedAt(iso: string): string {
    if (!iso) return '';
    return new Date(iso).toLocaleString('de-CH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
</script>

<div
  class="card p-6 md:p-8"
  style="border-top: 4px solid {parteiFarbe};"
>
  <p class="section-eyebrow mb-2">Persönliche Reflexion</p>
  <h3 class="font-display text-2xl text-ink mb-2">Persönliche Notiz: {parteiName}</h3>
  <p class="text-sm text-ink-muted mb-5 max-w-2xl">
    Halte fest, welche Positionen oder Themen du später genauer prüfen möchtest. Diese Demo speichert deine Notiz nur lokal in deinem Browser und sendet nichts an eine Partei oder an den Server.
  </p>

  <div class="flex flex-col sm:flex-row gap-3 mb-5">
    <button
      type="button"
      class="btn-secondary justify-center"
      class:is-remembered={remembered}
      style={remembered ? `border-color: ${parteiFarbe}; color: ${parteiFarbe};` : undefined}
      aria-pressed={remembered}
      on:click={toggleRemembered}
    >
      {remembered ? 'Partei gemerkt' : 'Partei für später merken'}
    </button>
    <a href="/kompass" class="btn-ghost justify-center">
      Politische Nähe im Kompass prüfen
    </a>
  </div>

  <div class="mb-4">
    <label for="party-reflection-note" class="label-field">
      Notiz <span class="text-ink-subtle text-xs">(optional)</span>
    </label>
    <textarea
      id="party-reflection-note"
      bind:value={note}
      class="input-field"
      rows="4"
      maxlength="900"
      placeholder="Welche Fragen, Themen oder Positionen möchtest du später vergleichen?"
    />
    <div class="flex justify-between gap-3 mt-2 text-xs text-ink-muted">
      <span>
        {#if savedAt}
          Lokal gespeichert am {formatSavedAt(savedAt)}
        {:else}
          Noch keine lokale Notiz gespeichert.
        {/if}
      </span>
      <span>{note.length}/900</span>
    </div>
  </div>

  <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
    <button type="button" class="btn-primary" style="background: {parteiFarbe};" on:click={saveNote}>
      Notiz lokal speichern
    </button>
    {#if savedNote}
      <button type="button" class="btn-ghost" on:click={clearNote}>
        Notiz entfernen
      </button>
    {/if}
  </div>
</div>

<style>
  .is-remembered {
    background: var(--surface-alt);
  }
</style>
