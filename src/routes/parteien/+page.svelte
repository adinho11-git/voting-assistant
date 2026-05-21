<script lang="ts">
  import type { PageData } from './$types';
  import type { ParteiProfil } from '$lib/parteiData';

  export let data: PageData;

  type FilterKey = 'alle' | 'links' | 'mitte' | 'rechts';
  let filter: FilterKey = 'alle';

  function matchesFilter(p: ParteiProfil, f: FilterKey): boolean {
    if (f === 'alle') return true;
    if (f === 'links') return p.spektrumLR < 40;
    if (f === 'mitte') return p.spektrumLR >= 40 && p.spektrumLR <= 55;
    if (f === 'rechts') return p.spektrumLR > 55;
    return true;
  }

  $: filteredParteien = data.parteien.filter((p) => matchesFilter(p, filter));

  const filterTabs: { key: FilterKey; label: string }[] = [
    { key: 'alle', label: 'Alle' },
    { key: 'links', label: 'Links' },
    { key: 'mitte', label: 'Mitte' },
    { key: 'rechts', label: 'Rechts' }
  ];
</script>

<svelte:head>
  <title>Schweizer Parteien – Voting Assistant</title>
  <meta name="description" content="Übersicht der sechs grossen Schweizer Parteien: Profil, politische Ausrichtung, Kernthemen und Positionen zu aktuellen Abstimmungen." />
</svelte:head>

<section class="container-app pt-8 md:pt-12 pb-6">
  <p class="section-eyebrow mb-2">Politische Landschaft</p>
  <h1 class="font-display text-3xl md:text-4xl text-ink mb-3">Schweizer Parteien</h1>
  <p class="text-ink-muted text-sm md:text-base max-w-3xl">
    Die sechs grössten Parteien — Ausrichtung, Kernthemen, Positionen zu aktuellen Vorlagen und direkte Kontaktmöglichkeit.
  </p>
</section>

<section class="container-app pb-6">
  <div role="tablist" aria-label="Politisches Spektrum" class="flex gap-1 bg-surface-alt p-1 rounded-lg w-fit">
    {#each filterTabs as tab}
      <button
        type="button"
        role="tab"
        aria-selected={filter === tab.key}
        on:click={() => (filter = tab.key)}
        class="px-4 py-1.5 text-sm font-semibold rounded-md transition-colors {filter === tab.key
          ? 'bg-surface text-brand shadow-soft'
          : 'text-ink-muted hover:text-ink'}"
      >
        {tab.label}
      </button>
    {/each}
  </div>
</section>

<section class="container-app pb-20">
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {#each filteredParteien as partei (partei.kuerzel)}
      <article class="card overflow-hidden flex flex-col" style="border-top: 6px solid {partei.farbe};">
        <div class="p-6 flex-1 flex flex-col">
          <div class="flex items-start gap-3 mb-3">
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style="background-color: {partei.farbe};"
              aria-hidden="true"
            >
              {partei.kuerzel.slice(0, 4)}
            </div>
            <div class="flex-1 min-w-0">
              <h2 class="font-display text-lg text-ink leading-tight">{partei.name}</h2>
              <p class="text-xs font-mono-data text-ink-muted uppercase tracking-wider mt-0.5">
                {partei.ausrichtung} · seit {partei.gegruendet}
              </p>
            </div>
          </div>

          <p class="text-sm text-ink-muted leading-relaxed mb-4 line-clamp-3 flex-1">
            {partei.kurzprofil}
          </p>

          <div class="mb-4">
            <p class="text-xs font-semibold text-ink mb-2">Kernthemen</p>
            <div class="flex flex-wrap gap-1.5">
              {#each partei.kernthemen.slice(0, 3) as thema}
                <span class="tag" style="background: {partei.farbeLight}; color: {partei.farbe}; border-color: {partei.farbe}30;">{thema}</span>
              {/each}
            </div>
          </div>

          <!-- Spektrum bar -->
          <div class="mb-5">
            <div class="flex justify-between text-[10px] font-mono-data text-ink-muted uppercase tracking-wider mb-1.5">
              <span>Links</span>
              <span>Rechts</span>
            </div>
            <div class="spektrum-bar">
              <div class="spektrum-dot" style="left: {partei.spektrumLR}%;" />
            </div>
          </div>

          <div class="flex gap-2 mt-auto">
            <a href="/parteien/{partei.kuerzel.toLowerCase()}" class="btn-primary flex-1 text-sm" style="background: {partei.farbe};">
              Mehr erfahren
            </a>
          </div>
        </div>
      </article>
    {/each}
  </div>

  {#if filteredParteien.length === 0}
    <div class="card p-12 text-center text-ink-muted">
      <p class="font-semibold">Keine Parteien in dieser Kategorie.</p>
    </div>
  {/if}
</section>

<style>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
