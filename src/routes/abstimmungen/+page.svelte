<script lang="ts">
  import type { PageData } from './$types';
  import AbstimmungCard from '$lib/components/AbstimmungCard.svelte';
  import { formatDate } from '$lib/mockData';

  export let data: PageData;

  let searchQuery = '';
  let activeTab: 'anstehend' | 'vergangen' | 'kantonal' = 'anstehend';

  $: filtered = data.abstimmungen.filter(
    (a) =>
      a.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  $: grouped = filtered.reduce<Record<string, typeof filtered>>((acc, a) => {
    const key = formatDate(a.date);
    if (!acc[key]) acc[key] = [];
    acc[key].push(a);
    return acc;
  }, {});
</script>

<svelte:head>
  <title>Abstimmungen – Voting Assistant</title>
  <meta name="description" content="Alle anstehenden Schweizer Abstimmungen — chronologisch sortiert, mit Pro/Contra-Übersicht und Parteipositionen." />
</svelte:head>

<section class="container-app pt-8 md:pt-12 pb-6">
  <p class="section-eyebrow mb-2">Übersicht</p>
  <h1 class="font-display text-3xl md:text-4xl text-ink mb-2">Abstimmungen</h1>
  <p class="text-ink-muted text-sm md:text-base max-w-2xl">
    Alle eidgenössischen Vorlagen — chronologisch nach Abstimmungstermin sortiert.
  </p>
</section>

<section class="container-app pb-6">
  <div class="card p-4 md:p-5 flex flex-col md:flex-row gap-3 md:items-center">
    <div class="relative flex-1">
      <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-subtle" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder="Vorlage, Kategorie oder Stichwort suchen..."
        bind:value={searchQuery}
        class="input-field pl-10"
        aria-label="Abstimmungen suchen"
      />
    </div>

    <div role="tablist" aria-label="Filter" class="flex gap-1 bg-surface-alt p-1 rounded-lg">
      {#each [['anstehend', 'Anstehend'], ['vergangen', 'Vergangen'], ['kantonal', 'Kantonal']] as [val, label]}
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === val}
          on:click={() => (activeTab = val)}
          class="px-3 md:px-4 py-1.5 text-sm font-semibold rounded-md transition-colors {activeTab === val
            ? 'bg-surface text-brand shadow-soft'
            : 'text-ink-muted hover:text-ink'}"
        >
          {label}
        </button>
      {/each}
    </div>
  </div>
</section>

<section class="container-app pb-16">
  {#if activeTab === 'anstehend'}
    {#each Object.entries(grouped) as [date, items]}
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-4 border-b border-border-light pb-2">
          <span class="font-mono-data text-xs font-semibold uppercase tracking-wider text-brand">
            {date} · Eidgenössisch
          </span>
          <span class="text-xs text-ink-subtle">{items.length} Vorlage{items.length === 1 ? '' : 'n'}</span>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          {#each items as abstimmung}
            <AbstimmungCard {abstimmung} />
          {/each}
        </div>
      </div>
    {/each}
    {#if filtered.length === 0}
      <div class="card p-12 text-center text-ink-muted">
        <p class="text-3xl mb-2">🔍</p>
        <p class="font-semibold">Keine Vorlagen gefunden</p>
        <p class="text-xs mt-1">Suchbegriff anpassen oder zurücksetzen.</p>
      </div>
    {/if}
  {:else if activeTab === 'vergangen'}
    <div class="card p-12 text-center text-ink-muted">
      <p class="font-display text-xl text-ink mb-2">Archiv folgt</p>
      <p class="text-sm">Vergangene Abstimmungen werden ab Sommer 2026 schrittweise erschlossen.</p>
    </div>
  {:else}
    <div class="card p-12 text-center text-ink-muted">
      <p class="font-display text-xl text-ink mb-2">Kantonale Vorlagen</p>
      <p class="text-sm">In Vorbereitung. Aktuell konzentriert sich der Prototyp auf eidgenössische Vorlagen.</p>
    </div>
  {/if}
</section>
