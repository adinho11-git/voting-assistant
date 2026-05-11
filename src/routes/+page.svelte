<script lang="ts">
  import type { PageData } from './$types';
  import AbstimmungCard from '$lib/components/AbstimmungCard.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>Voting Assistant – Abstimmungen</title>
</svelte:head>

<!-- Header -->
<header class="px-4 pt-12 pb-6">
  <div class="flex items-center justify-between mb-1">
    <span class="font-serif text-2xl text-gray-900">Voting Assistant</span>
    <button class="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center" aria-label="Einstellungen">
      <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </button>
  </div>

  {#if data.daysUntil > 0}
    <p class="text-gray-500 text-sm">
      Nächste Abstimmung in
      <span class="font-semibold text-brand-blue font-mono">{data.daysUntil}</span> Tagen
    </p>
  {:else}
    <p class="text-gray-500 text-sm">Abstimmungssonntag — heute!</p>
  {/if}
</header>

<div class="px-4 space-y-6 pb-4">
  <!-- Hero / Next abstimmung -->
  {#if data.next}
    <section>
      <AbstimmungCard abstimmung={data.next} featured={true} />
    </section>
  {/if}

  <!-- Rest of abstimmungen -->
  {#if data.rest.length > 0}
    <section>
      <h2 class="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-3">Anstehende Abstimmungen</h2>
      <div class="space-y-2.5">
        {#each data.rest as abstimmung}
          <AbstimmungCard {abstimmung} />
        {/each}
      </div>
    </section>
  {/if}

  <!-- Search older -->
  <button class="w-full text-center text-sm text-gray-400 py-3 border border-dashed border-gray-200 rounded-xl">
    🔍 Frühere Abstimmungen suchen...
  </button>
</div>
