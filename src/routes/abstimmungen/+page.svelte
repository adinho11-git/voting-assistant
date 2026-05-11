<script lang="ts">
  import type { PageData } from './$types';
  import AbstimmungCard from '$lib/components/AbstimmungCard.svelte';
  import { formatDate } from '$lib/mockData';

  export let data: PageData;

  let searchQuery = '';
  let activeTab = 'anstehend';

  function setTab(val: string) { activeTab = val; }

  $: filtered = data.abstimmungen.filter((a) =>
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
</svelte:head>

<div class="px-4 pt-6 pb-3">
  <h1 class="font-serif text-2xl text-gray-900 mb-4">Abstimmungen</h1>

  <!-- Search -->
  <div class="relative mb-4">
    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input
      type="text"
      placeholder="Vorlage suchen..."
      bind:value={searchQuery}
      class="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
    />
  </div>

  <!-- Filter tabs -->
  <div class="flex gap-0 border-b border-gray-200 mb-4">
    {#each [['anstehend', 'Anstehend'], ['vergangen', 'Vergangen'], ['kantonal', 'Kantonal']] as [val, label]}
      <button
        on:click={() => setTab(val)}
        class="px-4 py-2.5 text-sm font-medium transition-colors {activeTab === val ? 'text-brand-blue border-b-2 border-brand-blue -mb-px' : 'text-gray-500'}"
      >
        {label}
      </button>
    {/each}
  </div>
</div>

<!-- Grouped list -->
<div class="px-4 space-y-5 pb-4">
  {#if activeTab === 'anstehend'}
    {#each Object.entries(grouped) as [date, items]}
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="font-mono text-xs font-semibold text-brand-blue">{date} · Eidgenössisch</span>
        </div>
        <div class="space-y-2.5">
          {#each items as abstimmung}
            <AbstimmungCard {abstimmung} />
          {/each}
        </div>
      </div>
    {/each}
    {#if filtered.length === 0}
      <div class="text-center py-12 text-gray-400">
        <p class="text-lg mb-1">🔍</p>
        <p class="text-sm">Keine Vorlagen gefunden</p>
      </div>
    {/if}
  {:else}
    <div class="text-center py-12 text-gray-400">
      <p class="text-2xl mb-2">🗂</p>
      <p class="text-sm font-medium text-gray-500">Demnächst verfügbar</p>
      <p class="text-xs text-gray-400 mt-1">Vergangene Abstimmungen folgen in einer nächsten Version.</p>
    </div>
  {/if}
</div>
