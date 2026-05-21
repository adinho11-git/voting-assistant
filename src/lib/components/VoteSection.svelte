<script lang="ts">
  import { onMount } from 'svelte';
  import { votesStore, setVote, clearVote } from '$lib/stores/votes';
  import { showToast } from '$lib/stores/toast';
  import type { Position } from '$lib/types';

  export let slug: string;
  export let initialCommunity: { ja: number; nein: number; total: number } = { ja: 0, nein: 0, total: 0 };

  let community = initialCommunity;
  let isSubmitting = false;
  let pulse = false;

  $: userVote = $votesStore[slug];
  $: jaPercent = community.total > 0 ? Math.round((community.ja / community.total) * 100) : 0;
  $: neinPercent = community.total > 0 ? 100 - jaPercent : 0;

  async function submitVote(position: Position): Promise<void> {
    if (isSubmitting) return;
    isSubmitting = true;
    try {
      const res = await fetch(`/api/abstimmungen/${slug}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ position })
      });
      if (!res.ok) throw new Error('Server-Fehler');
      const data = (await res.json()) as { ja: number; nein: number; total: number };
      community = data;
      setVote(slug, position);
      pulse = true;
      setTimeout(() => (pulse = false), 400);
      showToast(`Deine Stimme: ${position} — danke!`, 'success');
    } catch (err) {
      console.error(err);
      // Still save locally so user feels responsive
      setVote(slug, position);
      showToast('Lokal gespeichert. Server ist gerade nicht erreichbar.', 'info');
    } finally {
      isSubmitting = false;
    }
  }

  async function refreshCommunity(): Promise<void> {
    try {
      const res = await fetch(`/api/abstimmungen/${slug}/vote`);
      if (res.ok) {
        community = (await res.json()) as typeof community;
      }
    } catch {
      // ignore — keep initial server-rendered numbers
    }
  }

  function change(): void {
    clearVote(slug);
    showToast('Du kannst jetzt neu abstimmen.', 'info');
  }

  onMount(() => {
    refreshCommunity();
  });
</script>

<div class="card p-6 md:p-8" style="border-left: 4px solid var(--brand);">
  <div class="flex flex-col md:flex-row md:items-start gap-6">
    <!-- Voting -->
    <div class="flex-1">
      <p class="section-eyebrow mb-3">Deine Position</p>
      {#if userVote}
        <h3 class="font-display text-xl text-ink mb-3">Du würdest mit <span class="{userVote === 'JA' ? 'text-pro' : 'text-contra'}">{userVote}</span> stimmen.</h3>
        <div class="flex items-center gap-3 flex-wrap">
          <span class="{userVote === 'JA' ? 'badge-ja' : 'badge-nein'} text-sm px-4 py-1.5 {pulse ? 'badge-pulse' : ''}" style="font-size:13px;">
            {userVote}
          </span>
          <button type="button" on:click={change} class="text-sm text-ink-muted underline hover:text-ink">
            Position ändern
          </button>
        </div>
        <p class="text-xs text-ink-subtle mt-3">
          Deine Stimme wird lokal gespeichert und anonym zur Community-Statistik beigesteuert.
        </p>
      {:else}
        <h3 class="font-display text-xl text-ink mb-2">Wie würdest du abstimmen?</h3>
        <p class="text-sm text-ink-muted mb-4">
          Anonym &amp; ohne Login. Speichert sich in deinem Browser und fliesst in die Community-Statistik ein.
        </p>
        <div class="flex gap-3">
          <button type="button" on:click={() => submitVote('JA')} disabled={isSubmitting} class="btn-vote-ja flex-1">
            ✓ JA
          </button>
          <button type="button" on:click={() => submitVote('NEIN')} disabled={isSubmitting} class="btn-vote-nein flex-1">
            ✗ NEIN
          </button>
        </div>
      {/if}
    </div>

    <!-- Divider on desktop -->
    <div class="hidden md:block w-px bg-border-light self-stretch" aria-hidden="true" />

    <!-- Community -->
    <div class="flex-1">
      <p class="section-eyebrow mb-3">Community-Stimmung</p>
      <div class="flex items-baseline gap-2 mb-2">
        <span class="font-mono-data text-3xl font-medium text-ink">{community.total}</span>
        <span class="text-sm text-ink-muted">Stimme{community.total === 1 ? '' : 'n'}</span>
      </div>

      <div class="community-bar mb-2">
        <div class="bar-ja" style="width: {jaPercent}%" />
        <div class="bar-nein" style="width: {neinPercent}%" />
      </div>

      <div class="flex justify-between text-xs font-mono-data font-semibold">
        <span class="text-pro">JA {community.ja} ({jaPercent}%)</span>
        <span class="text-contra">NEIN {community.nein} ({neinPercent}%)</span>
      </div>

      <p class="text-xs text-ink-subtle mt-3">
        Anonyme Aggregation aller Nutzer-Stimmen — keine personenbezogenen Daten.
      </p>
    </div>
  </div>
</div>
