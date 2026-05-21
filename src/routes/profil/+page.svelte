<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import { votesStore, clearVote } from '$lib/stores/votes';
  import { showToast } from '$lib/stores/toast';
  import { PARTEIEN } from '$lib/parteiData';
  import { formatDate } from '$lib/mockData';
  import Badge from '$lib/components/Badge.svelte';
  import type { ParteiKuerzel, Position } from '$lib/types';

  export let data: PageData;

  let totalCountUp = 0;
  let jaCountUp = 0;
  let neinCountUp = 0;

  $: votes = $votesStore;
  $: voteEntries = Object.entries(votes) as [string, Position][];
  $: total = voteEntries.length;
  $: jaCount = voteEntries.filter(([, p]) => p === 'JA').length;
  $: neinCount = voteEntries.filter(([, p]) => p === 'NEIN').length;

  $: history = voteEntries
    .map(([slug, position]) => {
      const abstimmung = data.abstimmungen.find((a) => a.slug === slug);
      return abstimmung ? { abstimmung, position } : null;
    })
    .filter(<T>(x: T | null): x is T => x !== null)
    .sort((a, b) => new Date(b.abstimmung.date).getTime() - new Date(a.abstimmung.date).getTime());

  interface PartyMatch {
    kuerzel: ParteiKuerzel;
    name: string;
    color: string;
    match: number;
    matched: number;
    out_of: number;
  }

  $: matches = computeMatches(voteEntries, data.abstimmungen);

  function computeMatches(entries: [string, Position][], abstimmungen: typeof data.abstimmungen): PartyMatch[] {
    const list: PartyMatch[] = [];
    for (const partei of PARTEIEN) {
      let matched = 0;
      let possible = 0;
      for (const [slug, userPos] of entries) {
        const a = abstimmungen.find((x) => x.slug === slug);
        if (!a) continue;
        const partyPos = a.parteien.find((p) => p.kuerzel === partei.kuerzel)?.position;
        if (!partyPos) continue;
        possible++;
        if (partyPos === userPos) matched++;
      }
      const match = possible > 0 ? Math.round((matched / possible) * 100) : 0;
      list.push({ kuerzel: partei.kuerzel, name: partei.name, color: partei.farbe, match, matched, out_of: possible });
    }
    return list.sort((a, b) => b.match - a.match);
  }

  function removeVote(slug: string): void {
    clearVote(slug);
    showToast('Position entfernt.', 'info');
  }

  function clearAll(): void {
    if (typeof window === 'undefined') return;
    if (!confirm('Alle gespeicherten Positionen wirklich löschen?')) return;
    for (const [slug] of voteEntries) clearVote(slug);
    showToast('Alle Positionen gelöscht.', 'info');
  }

  // Count-Up animation when total changes
  let prevTotal = 0;
  function animateCountTo(target: number, current: number, set: (v: number) => void): void {
    if (current === target) return;
    const diff = target - current;
    const steps = Math.min(30, Math.abs(diff) * 5);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const next = Math.round(current + (diff * step) / steps);
      set(next);
      if (step >= steps) {
        clearInterval(interval);
        set(target);
      }
    }, 18);
  }

  $: if (total !== prevTotal) {
    animateCountTo(total, totalCountUp, (v) => (totalCountUp = v));
    animateCountTo(jaCount, jaCountUp, (v) => (jaCountUp = v));
    animateCountTo(neinCount, neinCountUp, (v) => (neinCountUp = v));
    prevTotal = total;
  }

  onMount(() => {
    // trigger initial animation
    totalCountUp = 0;
    jaCountUp = 0;
    neinCountUp = 0;
    animateCountTo(total, 0, (v) => (totalCountUp = v));
    animateCountTo(jaCount, 0, (v) => (jaCountUp = v));
    animateCountTo(neinCount, 0, (v) => (neinCountUp = v));
  });
</script>

<svelte:head>
  <title>Mein Profil – Voting Assistant</title>
  <meta name="description" content="Deine Abstimmungs-History und Partei-Übereinstimmung — alles lokal in deinem Browser, nichts wird an Server gesendet." />
</svelte:head>

<section class="container-app pt-8 md:pt-12 pb-6">
  <p class="section-eyebrow mb-2">Persönliche Übersicht</p>
  <h1 class="font-display text-3xl md:text-4xl text-ink mb-2">Mein Profil</h1>
  <p class="text-ink-muted text-sm md:text-base max-w-2xl">
    Alle deine gespeicherten Abstimmungs-Positionen — privat in deinem Browser, niemals an einen Server gesendet.
  </p>
</section>

<!-- IDENTITY + STATS -->
<section class="container-app pb-6">
  <div class="card p-6 md:p-8">
    <div class="grid md:grid-cols-4 gap-6 md:gap-8 items-center">
      <div class="flex items-center gap-4 md:col-span-1">
        <div class="w-16 h-16 rounded-full bg-brand text-white font-display text-2xl font-bold flex items-center justify-center flex-shrink-0">A</div>
        <div>
          <p class="font-display text-xl text-ink leading-none">Anonym</p>
          <p class="text-xs text-ink-muted mt-1 font-mono-data uppercase tracking-wider">Lokales Profil</p>
        </div>
      </div>

      <div class="md:col-span-3 grid grid-cols-3 gap-4">
        <div>
          <p class="font-mono-data text-3xl md:text-4xl font-medium text-ink">{totalCountUp}</p>
          <p class="text-xs text-ink-muted uppercase tracking-wider font-mono-data">Positionen</p>
        </div>
        <div>
          <p class="font-mono-data text-3xl md:text-4xl font-medium text-pro">{jaCountUp}</p>
          <p class="text-xs text-ink-muted uppercase tracking-wider font-mono-data">JA-Stimmen</p>
        </div>
        <div>
          <p class="font-mono-data text-3xl md:text-4xl font-medium text-contra">{neinCountUp}</p>
          <p class="text-xs text-ink-muted uppercase tracking-wider font-mono-data">NEIN-Stimmen</p>
        </div>
      </div>
    </div>
  </div>
</section>

{#if total === 0}
  <!-- EMPTY STATE -->
  <section class="container-app pb-20">
    <div class="card p-12 text-center">
      <p class="text-5xl mb-4" aria-hidden="true">🗳</p>
      <h2 class="font-display text-2xl text-ink mb-2">Noch keine Positionen</h2>
      <p class="text-ink-muted mb-6 max-w-md mx-auto">
        Stimme bei deiner ersten Abstimmung ab oder mach das Kompass-Quiz — danach erscheinen hier deine History und die Partei-Übereinstimmung.
      </p>
      <div class="flex flex-wrap gap-3 justify-center">
        <a href="/abstimmungen" class="btn-primary">Zu den Abstimmungen</a>
        <a href="/kompass" class="btn-secondary">Kompass-Quiz starten</a>
      </div>
    </div>
  </section>
{:else}
  <!-- PARTEI-MATCH -->
  <section class="container-app pb-10">
    <div class="card p-6 md:p-8">
      <div class="flex items-end justify-between mb-5 border-b border-border-light pb-3">
        <div>
          <p class="section-eyebrow mb-1">Politische Nähe</p>
          <h2 class="font-display text-2xl text-ink">Partei-Übereinstimmung</h2>
        </div>
        <span class="text-xs font-mono-data text-ink-muted">Basis: {total} Position{total === 1 ? '' : 'en'}</span>
      </div>

      <div class="space-y-3">
        {#each matches as m}
          <a href="/parteien/{m.kuerzel.toLowerCase()}" class="block">
            <div class="flex items-center gap-3 mb-1">
              <div
                class="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold"
                style="background: {m.color};"
                aria-hidden="true"
              >
                {m.kuerzel.slice(0, 4)}
              </div>
              <span class="font-semibold text-sm text-ink flex-1">{m.kuerzel}</span>
              <span class="font-mono-data text-xs text-ink-muted">{m.matched}/{m.out_of}</span>
            </div>
            <div class="match-bar">
              <div class="match-bar-fill" style="width: {Math.max(m.match, 4)}%; background: {m.color};">
                {m.match}%
              </div>
            </div>
          </a>
        {/each}
      </div>

      <p class="text-xs text-ink-subtle mt-5">
        Berechnung: Übereinstimmung deiner Position mit der offiziellen Parteiposition pro Vorlage.
      </p>
    </div>
  </section>

  <!-- HISTORY -->
  <section class="container-app pb-20">
    <div class="flex items-end justify-between mb-5 border-b border-border-light pb-3">
      <div>
        <p class="section-eyebrow mb-1">Deine Stimmen</p>
        <h2 class="font-display text-2xl text-ink">Abstimmungs-History</h2>
      </div>
      <button type="button" on:click={clearAll} class="text-sm text-ink-muted underline hover:text-contra">
        Alle löschen
      </button>
    </div>

    <div class="space-y-3">
      {#each history as item}
        <div class="card p-5 flex items-center gap-4" style="border-left: 4px solid {item.position === 'JA' ? 'var(--pro)' : 'var(--contra)'};">
          <Badge position={item.position} size="md" />
          <a href="/abstimmungen/{item.abstimmung.slug}" class="flex-1 min-w-0 group">
            <p class="font-mono-data text-[10px] text-ink-subtle uppercase tracking-wider mb-0.5">
              {formatDate(item.abstimmung.date)} · {item.abstimmung.category}
            </p>
            <p class="font-display text-base text-ink leading-snug group-hover:text-brand transition-colors truncate">
              {item.abstimmung.shortTitle}
            </p>
          </a>
          <button
            type="button"
            on:click={() => removeVote(item.abstimmung.slug)}
            class="text-xs text-ink-subtle hover:text-contra underline whitespace-nowrap"
            aria-label="Position für {item.abstimmung.shortTitle} entfernen"
          >
            Entfernen
          </button>
        </div>
      {/each}
    </div>
  </section>
{/if}
