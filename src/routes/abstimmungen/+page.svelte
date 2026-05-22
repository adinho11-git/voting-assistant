<script lang="ts">
  import type { PageData } from './$types';
  import AbstimmungCard from '$lib/components/AbstimmungCard.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import { formatDate } from '$lib/mockData';
  import { votesStore } from '$lib/stores/votes';

  export let data: PageData;

  type TabKey = 'anstehend' | 'vergangen' | 'kantonal';
  let searchQuery = '';
  let activeTab: TabKey = 'anstehend';
  let selectedKanton = 'ZH';

  $: tabDefs = [
    ['anstehend', `Anstehend (${anstehende.length})`],
    ['vergangen', `Vergangen (${vergangene.length})`],
    ['kantonal', 'Kantonal']
  ] as [TabKey, string][];

  const kantone = [
    { code: 'ZH', name: 'Zürich' },
    { code: 'BE', name: 'Bern' },
    { code: 'LU', name: 'Luzern' },
    { code: 'BS', name: 'Basel-Stadt' },
    { code: 'GE', name: 'Genf' },
    { code: 'TI', name: 'Tessin' }
  ];

  $: anstehende = data.abstimmungen.filter((a) => a.status === 'anstehend' && a.type === 'eidgenössisch');
  $: vergangene = data.abstimmungen.filter((a) => a.status === 'vergangen' && a.type === 'eidgenössisch')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  $: kantonale = data.cantonal.filter((a) => a.kanton === selectedKanton);

  function matchesQuery(a: { shortTitle: string; title: string; category: string }) {
    const q = searchQuery.toLowerCase();
    return (
      a.shortTitle.toLowerCase().includes(q) ||
      a.title.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q)
    );
  }

  $: filteredAnstehende = anstehende.filter(matchesQuery);
  $: filteredVergangene = vergangene.filter(matchesQuery);

  $: groupedAnstehende = filteredAnstehende.reduce<Record<string, typeof filteredAnstehende>>((acc, a) => {
    const key = formatDate(a.date);
    if (!acc[key]) acc[key] = [];
    acc[key].push(a);
    return acc;
  }, {});

  $: groupedVergangene = filteredVergangene.reduce<Record<string, typeof filteredVergangene>>((acc, a) => {
    const key = formatDate(a.date);
    if (!acc[key]) acc[key] = [];
    acc[key].push(a);
    return acc;
  }, {});

  function userPositionFor(slug: string) {
    return $votesStore[slug]?.position;
  }
</script>

<svelte:head>
  <title>Abstimmungen – Voting Assistant</title>
  <meta name="description" content="Anstehende und vergangene eidgenössische Vorlagen — mit Ergebnissen, Pro/Contra und Quellen." />
</svelte:head>

<!-- HEADER -->
<section class="container-app pt-8 md:pt-12 pb-4">
  <p class="section-eyebrow mb-2">Übersicht</p>
  <h1 class="font-display text-3xl md:text-4xl text-ink mb-2">Abstimmungen</h1>
  <p class="text-ink-muted text-sm md:text-base max-w-2xl">
    Eidgenössische Volksabstimmungen — anstehend &amp; vergangen — chronologisch sortiert, mit offiziellen Resultaten.
  </p>
</section>

<!-- TAB BAR (separate from search) -->
<section class="container-app pb-3">
  <div role="tablist" aria-label="Status-Filter" class="flex gap-1 bg-surface-alt p-1 rounded-lg w-fit overflow-x-auto">
    {#each tabDefs as [val, label]}
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === val}
        on:click={() => (activeTab = val)}
        class="px-3 md:px-4 py-1.5 text-sm font-semibold rounded-md transition-colors whitespace-nowrap {activeTab === val
          ? 'bg-surface text-brand shadow-soft'
          : 'text-ink-muted hover:text-ink'}"
      >
        {label}
      </button>
    {/each}
  </div>
</section>

<!-- SEARCH (separate row, no overlap) -->
<section class="container-app pb-8">
  <div class="card p-4 md:p-5">
    <label for="vote-search" class="sr-only">Abstimmungen durchsuchen</label>
    <div class="relative">
      <span
        class="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-ink-subtle"
        aria-hidden="true"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
      <input
        id="vote-search"
        type="text"
        placeholder="Vorlage, Kategorie oder Stichwort suchen ..."
        bind:value={searchQuery}
        class="input-field"
        style="padding-left: 44px;"
      />
    </div>
  </div>
</section>

<!-- TAB PANELS -->
<section class="container-app pb-20">
  {#if activeTab === 'anstehend'}
    {#if filteredAnstehende.length > 0}
      {#each Object.entries(groupedAnstehende) as [date, items]}
        <div class="mb-12">
          <div class="vote-group-header">
            <span class="font-mono-data text-xs font-semibold uppercase tracking-wider text-brand">
              {date} · Eidgenössische Abstimmungen
            </span>
            <span class="text-xs text-ink-subtle block mt-1">{items.length} Vorlage{items.length === 1 ? '' : 'n'} am selben Abstimmungstermin</span>
          </div>
          <div class="grid md:grid-cols-2 gap-5">
            {#each items as abstimmung}
              <AbstimmungCard {abstimmung} />
            {/each}
          </div>
        </div>
      {/each}
    {:else}
      <div class="card p-12 text-center text-ink-muted">
        <p class="text-3xl mb-2" aria-hidden="true">🔍</p>
        <p class="font-semibold">Keine Treffer</p>
        <p class="text-xs mt-1">Suchbegriff anpassen oder Tab wechseln.</p>
      </div>
    {/if}
  {:else if activeTab === 'vergangen'}
    {#if filteredVergangene.length > 0}
      {#each Object.entries(groupedVergangene) as [date, items]}
        <div class="mb-12">
          <div class="vote-group-header">
            <span class="font-mono-data text-xs font-semibold uppercase tracking-wider text-ink-muted">
              {date} · Eidgenössische Abstimmungen
            </span>
            <span class="text-xs text-ink-subtle block mt-1">Offizielles Endergebnis mit Quellen und Vergleichsmöglichkeit</span>
          </div>
          <div class="grid gap-5 {items.length > 1 ? 'xl:grid-cols-2' : ''}">
            {#each items as a}
              {@const userPos = userPositionFor(a.slug)}
              <a href="/abstimmungen/{a.slug}" class="card card-interactive p-5 block" style="border-left: 4px solid {a.result?.accepted ? 'var(--pro)' : 'var(--contra)'};">
                <div class="flex items-start justify-between gap-3 mb-2 flex-wrap">
                  <h3 class="font-display text-lg leading-snug text-ink flex-1 min-w-0">
                    {a.shortTitle}
                  </h3>
                  {#if a.result}
                    <span class="{a.result.accepted ? 'badge-ja' : 'badge-nein'}" style="font-size:10px;">
                      {a.result.accepted ? 'ANGENOMMEN' : 'ABGELEHNT'}
                    </span>
                  {/if}
                </div>
                <p class="text-xs text-ink-muted mb-3 line-clamp-2">{a.aiSummary}</p>

                {#if a.result}
                  <div class="result-bar mb-2">
                    <div class="bar-ja" style="width: {a.result.jaPercent}%;" />
                    <div class="bar-nein" style="width: {100 - a.result.jaPercent}%;" />
                  </div>
                  <div class="flex justify-between text-xs font-mono-data font-semibold mb-3">
                    <span class="text-pro">JA {a.result.jaPercent.toFixed(1)}%</span>
                    <span class="text-contra">NEIN {(100 - a.result.jaPercent).toFixed(1)}%</span>
                  </div>
                  <div class="flex flex-wrap gap-2 text-xs font-mono-data text-ink-muted">
                    <span>{a.result.turnoutPercent.toFixed(1)}% Stimmbeteiligung</span>
                    <span aria-hidden="true">·</span>
                    <span class="inline-flex items-center gap-1">BR <Badge position={a.bundesratPosition} size="sm" /></span>
                    {#if userPos}
                      <span aria-hidden="true">·</span>
                      <span class="inline-flex items-center gap-1">DU
                        <span class="{userPos === 'JA' ? 'badge-ja' : userPos === 'NEIN' ? 'badge-nein' : 'badge-neutral'}" style="font-size:9px;">
                          {userPos === 'UNENTSCHIEDEN' ? '?' : userPos}
                        </span>
                      </span>
                    {/if}
                  </div>
                {/if}
              </a>
            {/each}
          </div>
        </div>
      {/each}
    {:else}
      <div class="card p-12 text-center text-ink-muted">
        <p class="font-semibold">Keine Treffer.</p>
      </div>
    {/if}
  {:else}
    <!-- KANTONAL -->
    <div class="mb-6 card p-5 md:p-6">
      <p class="section-eyebrow mb-2">Kantonale Abstimmungen</p>
      <p class="text-sm text-ink-muted mb-4">
        Kantons-Vorlagen sind im Prototyp als <strong style="color: var(--contra);">Demo-Inhalt</strong>
        deklariert (siehe Methodik). Wähle einen Kanton, um die illustrativen Vorlagen zu sehen.
      </p>
      <label for="kanton" class="sr-only">Kanton auswählen</label>
      <select id="kanton" bind:value={selectedKanton} class="input-field max-w-xs">
        {#each kantone as k}
          <option value={k.code}>{k.name} ({k.code})</option>
        {/each}
      </select>
    </div>

    {#if kantonale.length > 0}
      <div class="grid md:grid-cols-2 gap-5 mb-6">
        {#each kantonale as a}
          <AbstimmungCard abstimmung={a} />
        {/each}
      </div>
    {:else}
      <div class="card p-10 text-center">
        <p class="font-display text-lg text-ink mb-2">Für {kantone.find((k) => k.code === selectedKanton)?.name} liegen aktuell keine Demo-Vorlagen vor.</p>
        <p class="text-sm text-ink-muted">
          Im Prototyp ist Zürich als Beispiel hinterlegt. Reale kantonale Daten würden via offizielle
          Kantons-Datenquellen integriert.
        </p>
      </div>
    {/if}

    <div class="card p-5 md:p-6 bg-surface-alt">
      <p class="section-eyebrow mb-2">Hinweis zur Datenqualität</p>
      <p class="text-sm text-ink-muted">
        Echte kantonale Abstimmungen werden auf den Kantons-Websites publiziert (z.B. <a href="https://www.zh.ch/de/politik-staat/wahlen-abstimmungen.html" class="source-link" target="_blank" rel="noopener">zh.ch</a>, <a href="https://www.be.ch/abstimmungen" class="source-link" target="_blank" rel="noopener">be.ch</a>).
        Die Anbindung an offene Kantons-Schnittstellen wäre die nächste produktive Erweiterung.
      </p>
    </div>
  {/if}
</section>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
