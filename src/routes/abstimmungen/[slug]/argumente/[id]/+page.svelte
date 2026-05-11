<script lang="ts">
  import type { PageData } from './$types';
  import AppBar from '$lib/components/AppBar.svelte';
  import { goto } from '$app/navigation';

  export let data: PageData;

  $: a = data.abstimmung;
  $: arg = data.arg;
  $: isPro = data.isPro;
  $: opposite = data.opposite;
</script>

<svelte:head>
  <title>{arg.text.slice(0, 40)}... – Argument Detail</title>
</svelte:head>

<AppBar backHref="/abstimmungen/{a.slug}" showBookmark={true} />

<div class="px-4 pt-4 pb-6">
  <!-- Badge + Title -->
  <div class="mb-4">
    <span class="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-3
      {isPro ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
      {isPro ? '✓ PRO' : '✗ CONTRA'}
    </span>
    <h1 class="font-serif text-2xl text-gray-900 leading-snug">{arg.text}</h1>
  </div>

  <!-- AI Summary Card -->
  <div class="card p-4 mb-4 border-l-4 {isPro ? 'border-green-500' : 'border-red-500'}">
    <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">KI-Zusammenfassung</p>
    <p class="text-sm text-gray-700 leading-relaxed">{arg.detail ?? arg.text}</p>
    <p class="text-[10px] text-gray-400 mt-3 italic">Generiert von AI · neutral formuliert · basierend auf offiziellen Quellen</p>
  </div>

  <!-- Sources -->
  <div class="card p-4 mb-4">
    <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Originalquellen (1)</p>
    <a
      href={arg.sourceUrl}
      target="_blank"
      rel="noopener"
      class="flex items-center gap-3 py-2 group"
    >
      <div class="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
      <div class="flex-1">
        <p class="font-semibold text-sm text-gray-900 group-hover:text-brand-blue transition-colors">{arg.source}</p>
        <p class="text-xs text-gray-400">Offizielle Quelle · Web</p>
      </div>
      <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </a>
  </div>

  <!-- Opposite argument link -->
  {#if opposite}
    <a
      href="/abstimmungen/{a.slug}/argumente/{opposite.id}"
      class="card p-4 flex items-center gap-3 mb-5 hover:shadow-md transition-shadow group"
    >
      <span class="text-lg">⟺</span>
      <div class="flex-1">
        <p class="text-xs font-bold text-gray-500 mb-0.5">Gegenargument lesen</p>
        <p class="text-sm text-gray-700 group-hover:text-brand-blue transition-colors">«{opposite.text}»</p>
      </div>
      <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </a>
  {/if}

  <!-- Back to briefing -->
  <button
    on:click={() => goto(`/abstimmungen/${a.slug}`)}
    class="btn-primary"
  >
    Zurück zum Briefing
  </button>
</div>
