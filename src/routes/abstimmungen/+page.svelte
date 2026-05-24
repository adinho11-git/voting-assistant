<script lang="ts">
  import type { PageData } from './$types';
  import AbstimmungCard from '$lib/components/AbstimmungCard.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import type { Abstimmung } from '$lib/types';
  import { formatDate } from '$lib/mockData';
  import { votesStore } from '$lib/stores/votes';

  export let data: PageData;

  type TabKey = 'anstehend' | 'vergangen';
  let searchQuery = '';
  let activeTab: TabKey = 'anstehend';

  $: anstehende = data.abstimmungen.filter((a) => a.status === 'anstehend' && a.type === 'eidgenössisch');
  $: vergangene = data.abstimmungen.filter((a) => a.status === 'vergangen' && a.type === 'eidgenössisch')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  $: normalizedQuery = searchQuery.trim().toLowerCase();
  $: tabDefs = [
    ['anstehend', `Anstehend (${anstehende.length})`],
    ['vergangen', `Vergangen (${vergangene.length})`]
  ] as [TabKey, string][];

  function matchesQuery(a: Pick<Abstimmung, 'shortTitle' | 'title' | 'category' | 'aiSummary'>, q: string) {
    if (!q) return true;
    return (
      a.shortTitle.toLowerCase().includes(q) ||
      a.title.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.aiSummary.toLowerCase().includes(q)
    );
  }

  $: filteredAnstehende = anstehende.filter((a) => matchesQuery(a, normalizedQuery));
  $: filteredVergangene = vergangene.filter((a) => matchesQuery(a, normalizedQuery));

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

  function voteCountLabel(count: number) {
    return `${count} ${count === 1 ? 'Vorlage' : 'Vorlagen'}`;
  }
</script>

<svelte:head>
  <title>Abstimmungen – Voting Assistant</title>
  <meta name="description" content="Eidgenössische Vorlagen auswählen, Pro und Contra abwägen, politische Einordnungen vergleichen und die eigene Position speichern." />
</svelte:head>

<!-- HEADER -->
<section class="container-app pt-8 md:pt-12 pb-4">
  <p class="section-eyebrow mb-2">Übersicht</p>
  <h1 class="font-display text-3xl md:text-4xl text-ink mb-2">Abstimmungen</h1>
  <p class="text-ink-muted text-sm md:text-base max-w-2xl">
    Wähle eine eidgenössische Vorlage, prüfe Pro- und Contra-Argumente, vergleiche Einordnungen und speichere am Ende deine eigene Position.
  </p>
  <div class="overview-workflow" aria-label="Workflow der Entscheidungshilfe">
    {#each ['Verstehen', 'Abwägen', 'Einordnen', 'Entscheiden'] as step, index}
      <span>{step}</span>
      {#if index < 3}
        <i aria-hidden="true">→</i>
      {/if}
    {/each}
  </div>
</section>

<!-- FILTER + SEARCH -->
<section class="container-app pb-8">
  <div class="overview-controls">
    <div role="tablist" aria-label="Status-Filter" class="overview-tabs">
      {#each tabDefs as [val, label]}
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === val}
          on:click={() => (activeTab = val)}
          class="overview-tab {activeTab === val ? 'active' : ''}"
        >
          {label}
        </button>
      {/each}
    </div>

    <div class="overview-search">
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
  </div>
</section>

<!-- TAB PANELS -->
<section class="container-app pb-20">
  {#if activeTab === 'anstehend'}
    {#if filteredAnstehende.length > 0}
      {#each Object.entries(groupedAnstehende) as [date, items]}
        <div class="mb-12">
          <div class="vote-group-header">
            <div>
              <span class="font-mono-data text-xs font-semibold uppercase tracking-wider text-brand">
                {date} · Eidgenössische Abstimmungen
              </span>
              <span class="text-xs text-ink-subtle block mt-1">
                {voteCountLabel(items.length)} am selben Abstimmungstermin.
              </span>
            </div>
            <p class="text-sm text-ink-muted">Wähle eine Vorlage, um die geführte Entscheidungshilfe zu starten.</p>
          </div>
          <div class="grid md:grid-cols-2 gap-5">
            {#each items as abstimmung}
              <AbstimmungCard {abstimmung} ctaLabel="Entscheidungshilfe starten" />
            {/each}
          </div>
        </div>
      {/each}
    {:else}
      <div class="card empty-state">
        <p class="font-semibold">Keine Treffer</p>
        <p class="text-sm mt-1">Für deine Suche wurden keine anstehenden Vorlagen gefunden.</p>
      </div>
    {/if}
  {:else if activeTab === 'vergangen'}
    {#if filteredVergangene.length > 0}
      {#each Object.entries(groupedVergangene) as [date, items]}
        <div class="mb-12">
          <div class="vote-group-header">
            <div>
              <span class="font-mono-data text-xs font-semibold uppercase tracking-wider text-ink-muted">
                {date} · Eidgenössische Abstimmungen
              </span>
              <span class="text-xs text-ink-subtle block mt-1">
                {voteCountLabel(items.length)} mit offiziellem Endergebnis.
              </span>
            </div>
            <p class="text-sm text-ink-muted">Ausgewählte vergangene eidgenössische Vorlagen dienen zur Einordnung und Nachvollziehbarkeit offizieller Resultate.</p>
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
                  <div class="past-card-action">
                    <span>Resultat einordnen</span>
                    <span>Details ansehen</span>
                  </div>
                {/if}
              </a>
            {/each}
          </div>
        </div>
      {/each}
    {:else}
      <div class="card empty-state">
        <p class="font-semibold">Keine Treffer</p>
        <p class="text-sm mt-1">Für deine Suche wurden keine vergangenen Vorlagen gefunden.</p>
      </div>
    {/if}
  {/if}
</section>

<style>
  .overview-workflow {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 14px;
    padding: 8px 10px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius-full);
    background: color-mix(in srgb, var(--surface-alt) 62%, var(--surface));
    color: var(--text-muted);
    font-size: 12px;
    font-weight: 800;
    line-height: 1.2;
    width: fit-content;
    max-width: 100%;
    overflow: visible;
  }

  .overview-workflow span,
  .overview-workflow i {
    min-width: 0;
  }

  .overview-workflow i {
    color: var(--text-subtle);
    font-style: normal;
  }

  .overview-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: var(--surface);
    box-shadow: var(--shadow-sm);
  }

  .overview-tabs {
    display: flex;
    max-width: 100%;
    gap: 4px;
    overflow-x: auto;
    padding: 4px;
    border-radius: var(--radius);
    background: var(--surface-alt);
  }

  .overview-tab {
    flex-shrink: 0;
    padding: 7px 12px;
    border: 0;
    border-radius: calc(var(--radius) - 2px);
    background: transparent;
    color: var(--text-muted);
    font: inherit;
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;
    transition: color 160ms ease, background 160ms ease, box-shadow 160ms ease;
  }

  .overview-tab:hover,
  .overview-tab:focus-visible {
    color: var(--text);
  }

  .overview-tab:focus-visible {
    outline: 2px solid var(--brand);
    outline-offset: 2px;
  }

  .overview-tab.active {
    background: var(--surface);
    color: var(--brand);
    box-shadow: var(--shadow-sm);
  }

  .overview-search {
    flex: 1;
    width: 100%;
    max-width: 420px;
    min-width: 260px;
  }

  .past-card-action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px solid var(--border-light);
    color: var(--brand);
    font-size: 14px;
    font-weight: 800;
  }

  .past-card-action span:last-child {
    color: var(--text-subtle);
    font-size: 12px;
    font-weight: 700;
  }

  .empty-state {
    padding: 36px 24px;
    text-align: center;
    color: var(--text-muted);
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (max-width: 760px) {
    .overview-controls {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
    }

    .overview-tabs,
    .overview-search {
      width: 100%;
      max-width: none;
      min-width: 0;
    }
  }

  @media (max-width: 480px) {
    .overview-workflow {
      border-radius: var(--radius);
      gap: 6px 7px;
      letter-spacing: 0;
    }

    .past-card-action {
      align-items: flex-start;
      flex-direction: column;
      gap: 4px;
    }

    .line-clamp-2 {
      display: block;
      overflow: visible;
      -webkit-line-clamp: initial;
      line-clamp: initial;
      -webkit-box-orient: initial;
    }
  }
</style>
