<script lang="ts">
  import { onMount } from 'svelte';
  import { votesStore, setVote, clearVote } from '$lib/stores/votes';
  import { engagementStore, saveJournalEntry } from '$lib/stores/engagement';
  import { showToast } from '$lib/stores/toast';
  import { inView } from '$lib/actions/inView';
  import type { UserPosition, Abstimmung } from '$lib/types';

  export let slug: string;
  export let abstimmung: Abstimmung;
  export let initialCommunity: { ja: number; nein: number; total: number } = { ja: 0, nein: 0, total: 0 };

  let community = initialCommunity;
  let isSubmitting = false;
  let pulse = false;
  let revealed = false;
  let renderedJaPercent = 0;
  let renderedNeinPercent = 0;
  let positionDraft: UserPosition | undefined;
  let confidenceDraft = 65;
  let noteDraft = '';
  let editingDecision = false;

  $: userEntry = $votesStore[slug];
  $: journalEntry = $engagementStore.journal[slug];
  $: userVote = userEntry?.position;
  $: savedConfidence = journalEntry?.confidence;
  $: savedNote = userEntry?.note ?? journalEntry?.note ?? '';
  $: showDecisionForm = editingDecision || !userVote;
  $: jaPercent = community.total > 0 ? Math.round((community.ja / community.total) * 100) : 0;
  $: neinPercent = community.total > 0 ? 100 - jaPercent : 0;
  $: if (revealed) {
    renderedJaPercent = jaPercent;
    renderedNeinPercent = neinPercent;
  }

  function choosePosition(position: UserPosition): void {
    positionDraft = position;
    if (position === 'UNENTSCHIEDEN' && confidenceDraft > 60) {
      confidenceDraft = 45;
    }
    if ((position === 'JA' || position === 'NEIN') && confidenceDraft < 50) {
      confidenceDraft = 65;
    }
  }

  async function saveDecision(): Promise<void> {
    if (isSubmitting) return;
    if (!positionDraft) {
      showToast('Wähle zuerst Ja, Nein oder Unsicher.', 'info');
      return;
    }

    isSubmitting = true;
    let serverSynced = true;
    try {
      if (positionDraft !== 'UNENTSCHIEDEN') {
        const res = await fetch(`/api/abstimmungen/${slug}/vote`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ position: positionDraft })
        });
        if (res.ok) {
          const data = (await res.json()) as { ja: number; nein: number; total: number };
          community = data;
        } else {
          serverSynced = false;
        }
      }
    } catch (err) {
      console.error(err);
      serverSynced = false;
    } finally {
      const cleanNote = noteDraft.trim();
      setVote(slug, positionDraft, cleanNote);
      saveJournalEntry(
        slug,
        {
          position: positionDraft,
          confidence: confidenceDraft,
          note: cleanNote
        },
        {
          type: 'position',
          title: 'Position im Journal gespeichert',
          detail: `${formatPosition(positionDraft)} · ${confidenceDraft}% Sicherheit${cleanNote ? ` · ${cleanNote.slice(0, 90)}` : ''}`
        }
      );
      editingDecision = false;
      pulse = true;
      setTimeout(() => (pulse = false), 400);
      showToast(
        serverSynced ? 'Position, Sicherheit und Notiz gespeichert.' : 'Lokal gespeichert. Server gerade nicht erreichbar.',
        serverSynced ? 'success' : 'info'
      );
      isSubmitting = false;
    }
  }

  async function refreshCommunity(): Promise<void> {
    try {
      const res = await fetch(`/api/abstimmungen/${slug}/vote`);
      if (res.ok) community = (await res.json()) as typeof community;
    } catch {
      // Community data is optional for the local prototype.
    }
  }

  function change(): void {
    clearVote(slug);
    positionDraft = undefined;
    confidenceDraft = 65;
    noteDraft = '';
    editingDecision = false;
    showToast('Position zurückgesetzt.', 'info');
  }

  function startDecisionEdit(): void {
    positionDraft = userVote;
    confidenceDraft = savedConfidence ?? (userVote === 'UNENTSCHIEDEN' ? 45 : 65);
    noteDraft = savedNote;
    editingDecision = true;
  }

  function cancelDecisionEdit(): void {
    editingDecision = false;
    positionDraft = userVote;
    confidenceDraft = savedConfidence ?? 65;
    noteDraft = savedNote;
  }

  onMount(() => {
    refreshCommunity();
  });

  function formatPosition(position: UserPosition | undefined): string {
    if (!position) return 'Noch offen';
    if (position === 'UNENTSCHIEDEN') return 'Unsicher';
    return position;
  }

  function positionClass(p: UserPosition): string {
    if (p === 'JA') return 'badge-ja';
    if (p === 'NEIN') return 'badge-nein';
    return 'badge-neutral';
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
  class="card p-6 md:p-8 reveal-stage {revealed ? 'is-visible' : ''}"
  style="border-left: 4px solid var(--brand);"
  use:inView
  on:reveal|once={() => (revealed = true)}
>
  <div class="grid lg:grid-cols-2 gap-6 lg:gap-8">
    <div>
      <p class="section-eyebrow mb-3">Entscheiden und speichern</p>

      {#if showDecisionForm}
        <h3 class="font-display text-xl text-ink mb-2">Was ist deine aktuelle Position?</h3>
        <p class="text-sm text-ink-muted mb-4">
          Speichere Position, Sicherheit und Notiz gemeinsam in deinem Voting-Journal. Du kannst alles später wieder ändern.
        </p>

        <div class="decision-options" role="group" aria-label="Position wählen">
          <button
            type="button"
            class="decision-option ja"
            class:active={positionDraft === 'JA'}
            on:click={() => choosePosition('JA')}
            disabled={isSubmitting}
          >
            JA
          </button>
          <button
            type="button"
            class="decision-option nein"
            class:active={positionDraft === 'NEIN'}
            on:click={() => choosePosition('NEIN')}
            disabled={isSubmitting}
          >
            NEIN
          </button>
          <button
            type="button"
            class="decision-option neutral"
            class:active={positionDraft === 'UNENTSCHIEDEN'}
            on:click={() => choosePosition('UNENTSCHIEDEN')}
            disabled={isSubmitting}
          >
            Unsicher
          </button>
        </div>

        <label class="decision-label" for="confidence-slider">Sicherheit</label>
        <div class="confidence-row">
          <input
            id="confidence-slider"
            class="slider-vote"
            type="range"
            min="0"
            max="100"
            step="5"
            bind:value={confidenceDraft}
            disabled={isSubmitting}
          />
          <strong>{confidenceDraft}%</strong>
        </div>

        <label class="decision-label" for="decision-note">Notiz</label>
        <textarea
          id="decision-note"
          bind:value={noteDraft}
          rows="3"
          maxlength="500"
          class="input-field text-sm"
          placeholder="Was überzeugt dich oder macht dich noch unsicher? (lokal gespeichert, max. 500 Zeichen)"
          disabled={isSubmitting}
        />

        <div class="decision-actions">
          <button type="button" on:click={saveDecision} disabled={isSubmitting} class="btn-primary">
            {isSubmitting ? 'Speichert...' : 'Position im Journal speichern'}
          </button>
          {#if userVote}
            <button type="button" on:click={cancelDecisionEdit} disabled={isSubmitting} class="btn-ghost">
              Abbrechen
            </button>
          {/if}
        </div>
      {:else if userVote}
        <h3 class="font-display text-xl text-ink mb-3">
          Du würdest aktuell mit
          <span class="{userVote === 'JA' ? 'text-pro' : userVote === 'NEIN' ? 'text-contra' : 'text-ink-muted'}">
            {formatPosition(userVote)}
          </span>
          stimmen.
        </h3>
        <div class="saved-decision {pulse ? 'badge-pulse' : ''}">
          <span class="{positionClass(userVote)} text-sm px-4 py-1.5" style="font-size:13px;">
            {formatPosition(userVote)}
          </span>
          <span class="saved-meta">
            {#if savedConfidence !== undefined}{savedConfidence}% Sicherheit{:else}Sicherheit noch offen{/if}
          </span>
          <span class="saved-journal">Im Voting-Journal gespeichert</span>
        </div>

        {#if savedNote}
          <div class="saved-note">
            <p class="section-eyebrow mb-2">Deine Notiz</p>
            <p>«{savedNote}»</p>
          </div>
        {/if}

        <div class="decision-actions">
          <button type="button" on:click={startDecisionEdit} class="btn-primary">Position bearbeiten</button>
          <button type="button" on:click={change} class="btn-ghost">Position zurücksetzen</button>
        </div>
      {/if}
    </div>

    <div class="lg:border-l lg:border-border-light lg:pl-8">
      <p class="section-eyebrow mb-3">Einordnung deiner Position</p>

      <div class="space-y-2 mb-5">
        <div class="flex items-center justify-between gap-3 py-1.5 border-b border-border-light">
          <span class="text-sm text-ink">Bundesrat</span>
          <span class="{abstimmung.bundesratPosition === 'JA' ? 'badge-ja' : 'badge-nein'}" style="font-size:11px;">
            {abstimmung.bundesratPosition}
          </span>
        </div>
        <div class="flex items-center justify-between gap-3 py-1.5 border-b border-border-light">
          <span class="text-sm text-ink">Parlament</span>
          <span class="{abstimmung.parlamentPosition === 'JA' ? 'badge-ja' : 'badge-nein'}" style="font-size:11px;">
            {abstimmung.parlamentPosition} ({abstimmung.parlamentStimmen.ja}:{abstimmung.parlamentStimmen.nein})
          </span>
        </div>
        {#if abstimmung.result}
          <div class="flex items-center justify-between gap-3 py-1.5 border-b border-border-light">
            <span class="text-sm font-semibold text-ink">Endergebnis</span>
            <span class="{abstimmung.result.accepted ? 'badge-ja' : 'badge-nein'}" style="font-size:11px;">
              {abstimmung.result.accepted ? 'ANGENOMMEN' : 'ABGELEHNT'} · {abstimmung.result.jaPercent.toFixed(1)}% JA
            </span>
          </div>
        {/if}
        <div class="flex items-center justify-between gap-3 py-1.5">
          <span class="text-sm text-ink">Community-Stimmung</span>
          <span class="font-mono-data text-xs text-ink-muted">{community.total} Stimme{community.total === 1 ? '' : 'n'}</span>
        </div>
      </div>

      <div class="community-bar mb-2">
        <div class="bar-ja" style="width: {renderedJaPercent}%" />
        <div class="bar-nein" style="width: {renderedNeinPercent}%" />
      </div>

      <div class="flex justify-between text-xs font-mono-data font-semibold">
        <span class="text-pro">JA {community.ja} ({jaPercent}%)</span>
        <span class="text-contra">NEIN {community.nein} ({neinPercent}%)</span>
      </div>

      <p class="text-xs text-ink-subtle mt-3">
        Anonyme Aggregation aller Nutzer-Stimmen. Quelle: dieser Prototyp.
      </p>
    </div>
  </div>
</div>

<style>
  .decision-options {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin-bottom: 18px;
  }

  .decision-option {
    min-height: 72px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: var(--surface);
    color: var(--text-muted);
    cursor: pointer;
    font-size: 17px;
    font-weight: 900;
    transition: transform 160ms ease, border-color 160ms ease, background 160ms ease, color 160ms ease;
  }

  .decision-option:hover:not(:disabled) {
    transform: translateY(-1px);
    border-color: color-mix(in srgb, var(--brand) 38%, var(--border-light));
  }

  .decision-option.active.ja {
    color: var(--pro);
    border-color: color-mix(in srgb, var(--pro) 44%, var(--border-light));
    background: var(--pro-soft);
  }

  .decision-option.active.nein {
    color: var(--contra);
    border-color: color-mix(in srgb, var(--contra) 44%, var(--border-light));
    background: var(--contra-soft);
  }

  .decision-option.active.neutral {
    color: var(--brand);
    border-color: color-mix(in srgb, var(--brand) 44%, var(--border-light));
    background: var(--brand-soft);
  }

  .decision-label {
    display: block;
    margin: 14px 0 7px;
    color: var(--text);
    font-size: 13px;
    font-weight: 800;
  }

  .confidence-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 64px;
    gap: 14px;
    align-items: center;
    padding: 12px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: color-mix(in srgb, var(--surface-alt) 44%, var(--surface));
  }

  .confidence-row strong {
    color: var(--text);
    font-family: 'IBM Plex Mono', monospace;
    text-align: right;
  }

  .decision-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 16px;
  }

  .saved-decision {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    padding: 14px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: color-mix(in srgb, var(--brand-soft) 46%, var(--surface));
  }

  .saved-meta,
  .saved-journal {
    color: var(--text-muted);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    font-weight: 700;
  }

  .saved-journal {
    color: var(--brand);
  }

  .saved-note {
    margin-top: 16px;
    padding: 14px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: var(--surface);
  }

  .saved-note p:last-child {
    color: var(--text);
    font-size: 14px;
    line-height: 1.55;
    font-style: italic;
  }

  @media (max-width: 560px) {
    .decision-options {
      grid-template-columns: 1fr;
    }

    .decision-actions .btn-primary,
    .decision-actions .btn-ghost {
      width: 100%;
    }
  }
</style>
