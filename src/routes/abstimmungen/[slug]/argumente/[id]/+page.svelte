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
  <title>{arg.text.slice(0, 60)} – Argument | Voting Assistant</title>
  <meta name="description" content="{arg.detail?.slice(0, 155) ?? arg.text}" />
</svelte:head>

<AppBar backHref="/abstimmungen/{a.slug}" showBookmark={true} />

<section class="container-read pt-6 md:pt-12 pb-16">
  <a href="/abstimmungen/{a.slug}" class="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark mb-6">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    Zurück zum Briefing
  </a>

  <p class="font-mono-data text-xs uppercase tracking-wider text-ink-muted mb-3">
    {a.shortTitle}
  </p>

  <div class="mb-5">
    <span class="{isPro ? 'badge-ja' : 'badge-nein'} text-xs px-3 py-1" style="font-size:11px;">
      {isPro ? '✓ PRO' : '✗ CONTRA'}
    </span>
  </div>

  <h1 class="font-display text-3xl md:text-4xl text-ink leading-tight mb-8">
    {arg.text}
  </h1>

  <div class="card p-6 md:p-8 mb-6" style="border-left: 4px solid {isPro ? 'var(--pro)' : 'var(--contra)'};">
    <p class="section-eyebrow mb-3">KI-Zusammenfassung · Neutral formuliert</p>
    <p class="text-base text-ink leading-relaxed">{arg.detail ?? arg.text}</p>
    <p class="text-xs text-ink-subtle mt-4 italic">
      Generiert auf Basis offizieller Quellen — von Hand auf Genauigkeit geprüft.
    </p>
  </div>

  <div class="card p-6 mb-6">
    <p class="section-eyebrow mb-3">Originalquelle</p>
    <a
      href={arg.sourceUrl}
      target="_blank"
      rel="noopener"
      class="flex items-center gap-3 group"
    >
      <div class="w-10 h-10 rounded-lg bg-surface-alt flex items-center justify-center flex-shrink-0">
        <svg class="w-5 h-5 text-ink-muted" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-semibold text-sm text-ink group-hover:text-brand transition-colors">{arg.source}</p>
        <p class="text-xs text-ink-muted truncate">{arg.sourceUrl}</p>
      </div>
      <svg class="w-4 h-4 text-ink-subtle" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </a>
  </div>

  {#if opposite}
    <a
      href="/abstimmungen/{a.slug}/argumente/{opposite.id}"
      class="card card-interactive p-5 mb-8 flex items-start gap-4 group"
    >
      <span class="text-2xl flex-shrink-0" aria-hidden="true">⟺</span>
      <div class="flex-1 min-w-0">
        <p class="section-eyebrow mb-1">Andere Perspektive</p>
        <p class="font-display text-lg text-ink leading-snug group-hover:text-brand transition-colors">
          «{opposite.text}»
        </p>
      </div>
      <svg class="w-5 h-5 text-ink-subtle flex-shrink-0 mt-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </a>
  {/if}

  <button type="button" on:click={() => goto(`/abstimmungen/${a.slug}`)} class="btn-primary">
    Zurück zum Briefing
  </button>
</section>
