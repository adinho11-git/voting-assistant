<script lang="ts">
  import type { Abstimmung, UserPosition } from '$lib/types';
  import { engagementStore, saveJournalEntry } from '$lib/stores/engagement';
  import { setNote, setVote, votesStore } from '$lib/stores/votes';
  import { showToast } from '$lib/stores/toast';

  export let abstimmung: Abstimmung;

  const positionOptions: Array<{ value: UserPosition; label: string }> = [
    { value: 'JA', label: 'JA' },
    { value: 'NEIN', label: 'NEIN' },
    { value: 'UNENTSCHIEDEN', label: 'Unsicher' }
  ];

  let positionDraft: UserPosition = 'UNENTSCHIEDEN';
  let confidenceDraft = 55;
  let noteDraft = '';
  let dirty = false;

  $: journalEntry = $engagementStore.journal[abstimmung.slug];
  $: voteEntry = $votesStore[abstimmung.slug];
  $: timeline = journalEntry?.timeline ?? [];
  $: if (!dirty) {
    positionDraft = journalEntry?.position ?? voteEntry?.position ?? 'UNENTSCHIEDEN';
    confidenceDraft = journalEntry?.confidence ?? 55;
    noteDraft = journalEntry?.note ?? voteEntry?.note ?? '';
  }

  function markDirty(): void {
    dirty = true;
  }

  function save(): void {
    const confidence = Number(confidenceDraft);
    const note = noteDraft.trim();
    setVote(abstimmung.slug, positionDraft, note);
    if (note) setNote(abstimmung.slug, note);
    saveJournalEntry(
      abstimmung.slug,
      {
        position: positionDraft,
        confidence,
        note
      },
      {
        type: 'position',
        title: 'Journal aktualisiert',
        detail: `${positionDraft === 'UNENTSCHIEDEN' ? 'Unsicher' : positionDraft} mit ${confidence}% Sicherheit`
      }
    );
    dirty = false;
    showToast('Voting-Journal gespeichert.', 'success');
  }

  function formatDateTime(iso: string): string {
    try {
      return new Intl.DateTimeFormat('de-CH', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  }

  function eventIcon(type: string): string {
    if (type === 'favorite') return '☆';
    if (type === 'feedback') return '↗';
    if (type === 'weights') return '%';
    if (type === 'assistant') return '→';
    if (type === 'note') return '✎';
    return '✓';
  }
</script>

<div class="journal-shell">
  <div class="journal-editor">
    <p class="section-eyebrow">Persönliches Voting-Journal</p>
    <h2 class="font-display text-2xl md:text-3xl text-ink">Halte fest, wie sich deine Meinung entwickelt</h2>
    <p class="journal-intro">
      Speichere Position, Sicherheit und Notizen. Änderungen erscheinen in einer Timeline und bleiben lokal in deinem Browser.
    </p>

    <div class="journal-position-grid">
      {#each positionOptions as option}
        <button
          type="button"
          class:active={positionDraft === option.value}
          class:ja={option.value === 'JA'}
          class:nein={option.value === 'NEIN'}
          on:click={() => ((positionDraft = option.value), markDirty())}
        >
          {option.label}
        </button>
      {/each}
    </div>

    <label class="confidence-row">
      <span>
        Sicherheit
        <strong>{confidenceDraft}%</strong>
      </span>
      <input type="range" min="0" max="100" step="5" bind:value={confidenceDraft} on:input={markDirty} />
    </label>

    <label class="note-box">
      <span>Meine wichtigsten Gründe</span>
      <textarea
        rows="5"
        maxlength="700"
        bind:value={noteDraft}
        on:input={markDirty}
        placeholder="Was überzeugt dich? Wo bist du noch unsicher?"
      />
    </label>

    <div class="journal-actions">
      <span>{noteDraft.length}/700 Zeichen</span>
      <button type="button" class="btn-primary" on:click={save}>Journal speichern</button>
    </div>
  </div>

  <aside class="timeline-panel">
    <div class="timeline-head">
      <p class="section-eyebrow">Timeline</p>
      <strong>{timeline.length} Ereignis{timeline.length === 1 ? '' : 'se'}</strong>
    </div>

    {#if timeline.length > 0}
      <div class="timeline-list">
        {#each timeline as item}
          <article>
            <div class="timeline-icon">{eventIcon(item.type)}</div>
            <div>
              <time>{formatDateTime(item.createdAt)}</time>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          </article>
        {/each}
      </div>
    {:else}
      <div class="empty-timeline">
        <strong>Noch keine Timeline</strong>
        <p>Starte mit einer Position, einer Gewichtung oder dem Abstimmungs-Assistenten.</p>
      </div>
    {/if}
  </aside>
</div>

<style>
  .journal-shell {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.72fr);
    gap: 18px;
  }

  .journal-editor,
  .timeline-panel {
    padding: clamp(22px, 3vw, 32px);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-lg);
    background: var(--surface);
    box-shadow: var(--shadow-sm);
  }

  .journal-intro {
    margin-top: 8px;
    color: var(--text-muted);
    line-height: 1.55;
  }

  .journal-position-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin-top: 20px;
  }

  .journal-position-grid button {
    min-height: 64px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: var(--surface);
    color: var(--text-muted);
    font-weight: 900;
    cursor: pointer;
    transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, color 180ms ease;
  }

  .journal-position-grid button:hover,
  .journal-position-grid button.active {
    transform: translateY(-1px);
    color: var(--brand);
    background: var(--brand-soft);
    border-color: color-mix(in srgb, var(--brand) 42%, var(--border-light));
  }

  .journal-position-grid .ja.active {
    color: var(--pro);
    background: var(--pro-soft);
    border-color: color-mix(in srgb, var(--pro) 44%, var(--border-light));
  }

  .journal-position-grid .nein.active {
    color: var(--contra);
    background: var(--contra-soft);
    border-color: color-mix(in srgb, var(--contra) 44%, var(--border-light));
  }

  .confidence-row {
    display: grid;
    gap: 10px;
    margin-top: 20px;
    padding: 16px;
    border-radius: var(--radius);
    background: color-mix(in srgb, var(--surface-alt) 48%, var(--surface));
  }

  .confidence-row span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--text-muted);
    font-weight: 700;
  }

  .confidence-row strong {
    color: var(--brand);
    font-family: 'IBM Plex Mono', monospace;
  }

  .confidence-row input {
    width: 100%;
    accent-color: var(--brand);
  }

  .note-box {
    display: grid;
    gap: 8px;
    margin-top: 18px;
  }

  .note-box span {
    color: var(--text);
    font-weight: 800;
  }

  .note-box textarea {
    width: 100%;
    resize: vertical;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--surface);
    color: var(--text);
    padding: 13px 14px;
    line-height: 1.55;
    font: inherit;
  }

  .journal-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 14px;
  }

  .journal-actions span {
    color: var(--text-subtle);
    font-size: 12px;
    font-family: 'IBM Plex Mono', monospace;
  }

  .timeline-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 18px;
  }

  .timeline-head strong {
    color: var(--text-muted);
    font-size: 13px;
  }

  .timeline-list {
    display: grid;
    gap: 12px;
  }

  .timeline-list article {
    display: grid;
    grid-template-columns: 34px minmax(0, 1fr);
    gap: 12px;
    padding-bottom: 13px;
    border-bottom: 1px solid var(--border-light);
  }

  .timeline-icon {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: 999px;
    background: var(--brand-soft);
    color: var(--brand);
    font-weight: 900;
  }

  .timeline-list time {
    display: block;
    color: var(--text-subtle);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    margin-bottom: 3px;
  }

  .timeline-list h3 {
    color: var(--text);
    font-weight: 800;
    line-height: 1.25;
  }

  .timeline-list p,
  .empty-timeline p {
    margin-top: 3px;
    color: var(--text-muted);
    font-size: 13px;
    line-height: 1.45;
  }

  .empty-timeline {
    padding: 20px;
    border: 1px dashed var(--border);
    border-radius: var(--radius);
    color: var(--text);
  }

  @media (max-width: 920px) {
    .journal-shell,
    .journal-position-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 560px) {
    .journal-editor,
    .timeline-panel {
      padding: 18px;
    }

    .journal-actions {
      align-items: stretch;
      flex-direction: column;
    }

    .journal-actions .btn-primary {
      width: 100%;
    }
  }
</style>
