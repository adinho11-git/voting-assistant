<script lang="ts">
  import { onMount } from 'svelte';
  import { votesStore, setVote, clearVote, setNote } from '$lib/stores/votes';
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
  let noteDraft = '';
  let editingNote = false;

  $: userEntry = $votesStore[slug];
  $: userVote = userEntry?.position;
  $: jaPercent = community.total > 0 ? Math.round((community.ja / community.total) * 100) : 0;
  $: neinPercent = community.total > 0 ? 100 - jaPercent : 0;
  $: if (revealed) {
    renderedJaPercent = jaPercent;
    renderedNeinPercent = neinPercent;
  }

  async function submitVote(position: UserPosition): Promise<void> {
    if (isSubmitting) return;
    isSubmitting = true;
    try {
      if (position !== 'UNENTSCHIEDEN') {
        const res = await fetch(`/api/abstimmungen/${slug}/vote`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ position })
        });
        if (res.ok) {
          const data = (await res.json()) as { ja: number; nein: number; total: number };
          community = data;
        }
      }
      setVote(slug, position);
      pulse = true;
      setTimeout(() => (pulse = false), 400);
      showToast(`Deine Position: ${position}`, 'success');
    } catch (err) {
      console.error(err);
      setVote(slug, position);
      showToast('Lokal gespeichert. Server gerade nicht erreichbar.', 'info');
    } finally {
      isSubmitting = false;
    }
  }

  async function refreshCommunity(): Promise<void> {
    try {
      const res = await fetch(`/api/abstimmungen/${slug}/vote`);
      if (res.ok) community = (await res.json()) as typeof community;
    } catch {
      // ignore
    }
  }

  function change(): void {
    clearVote(slug);
    noteDraft = '';
    editingNote = false;
    showToast('Position zurückgesetzt.', 'info');
  }

  function startEditNote(): void {
    noteDraft = userEntry?.note ?? '';
    editingNote = true;
  }

  function saveNote(): void {
    if (!userEntry) return;
    setNote(slug, noteDraft.trim());
    editingNote = false;
    showToast('Notiz gespeichert.', 'success');
  }

  function cancelNote(): void {
    editingNote = false;
    noteDraft = '';
  }

  onMount(() => {
    refreshCommunity();
  });

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
    <!-- Voting -->
    <div>
      <p class="section-eyebrow mb-3">Deine Position</p>
      {#if userVote}
        <h3 class="font-display text-xl text-ink mb-3">
          Du würdest mit <span class="{userVote === 'JA' ? 'text-pro' : userVote === 'NEIN' ? 'text-contra' : 'text-ink-muted'}">{userVote === 'UNENTSCHIEDEN' ? 'UNENTSCHIEDEN' : userVote}</span> stimmen.
        </h3>
        <div class="flex items-center gap-3 flex-wrap mb-4">
          <span class="{positionClass(userVote)} text-sm px-4 py-1.5 {pulse ? 'badge-pulse' : ''}" style="font-size:13px;">
            {userVote === 'UNENTSCHIEDEN' ? 'UNENTSCHIEDEN' : userVote}
          </span>
          <button type="button" on:click={change} class="text-sm text-ink-muted underline hover:text-ink">
            Position zurücksetzen
          </button>
        </div>

        <!-- Note section -->
        <div class="border-t border-border-light pt-4">
          <p class="section-eyebrow mb-2">Deine Notiz</p>
          {#if editingNote}
            <textarea
              bind:value={noteDraft}
              rows="3"
              maxlength="500"
              class="input-field text-sm mb-2"
              placeholder="Was bewegt dich an dieser Vorlage? (lokal gespeichert, max. 500 Zeichen)"
            />
            <div class="flex gap-2">
              <button type="button" on:click={saveNote} class="btn-primary text-sm">Speichern</button>
              <button type="button" on:click={cancelNote} class="btn-ghost text-sm">Abbrechen</button>
            </div>
          {:else if userEntry?.note}
            <p class="text-sm text-ink leading-relaxed italic mb-2">«{userEntry.note}»</p>
            <button type="button" on:click={startEditNote} class="text-xs text-brand hover:underline">
              Notiz bearbeiten
            </button>
          {:else}
            <button type="button" on:click={startEditNote} class="text-sm text-brand hover:underline">
              + Notiz hinzufügen
            </button>
          {/if}
        </div>
      {:else}
        <h3 class="font-display text-xl text-ink mb-2">Wie würdest du abstimmen?</h3>
        <p class="text-sm text-ink-muted mb-4">
          Anonym, ohne Login. Speichert sich in deinem Browser, fliesst anonym in die Community-Statistik ein.
        </p>
        <div class="flex flex-col sm:flex-row gap-2">
          <button type="button" on:click={() => submitVote('JA')} disabled={isSubmitting} class="btn-vote-ja flex-1">
            ✓ JA
          </button>
          <button type="button" on:click={() => submitVote('NEIN')} disabled={isSubmitting} class="btn-vote-nein flex-1">
            ✗ NEIN
          </button>
          <button type="button" on:click={() => submitVote('UNENTSCHIEDEN')} disabled={isSubmitting} class="btn-ghost flex-1">
            ? Unentschieden
          </button>
        </div>
      {/if}
    </div>

    <!-- Compare -->
    <div class="lg:border-l lg:border-border-light lg:pl-8">
      <p class="section-eyebrow mb-3">Vergleich mit offiziellen Positionen</p>

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
