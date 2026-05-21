<script lang="ts">
  import type { Abstimmung } from '$lib/types';
  import Badge from './Badge.svelte';
  import { formatDate, getDaysUntil } from '$lib/mockData';

  export let abstimmung: Abstimmung;
  export let featured: boolean = false;

  const categoryAccent: Record<string, string> = {
    'Klimaschutz · Energiepolitik': '#16A34A',
    'Sozialversicherung · KVG': '#003087',
    Wohnungspolitik: '#EA580C',
    'Verkehr · Infrastruktur': '#7C3AED'
  };

  $: accent = categoryAccent[abstimmung.category] ?? '#6B6B6B';
  $: days = getDaysUntil(abstimmung.date);
</script>

{#if featured}
  <a
    href="/abstimmungen/{abstimmung.slug}"
    class="card card-interactive block p-6 md:p-8 hero-accent"
    style="border-left-color: {accent};"
  >
    <div class="flex items-center gap-3 mb-3">
      <span class="badge-brand">Eidg. {formatDate(abstimmung.date)}</span>
      <span class="text-xs font-mono-data text-ink-muted">{abstimmung.category}</span>
    </div>
    <h2 class="font-display text-2xl md:text-3xl leading-tight text-ink mb-3">
      {abstimmung.title}
    </h2>
    <p class="text-ink-muted text-sm md:text-base mb-5 leading-relaxed line-clamp-3">
      {abstimmung.aiSummary}
    </p>
    <div class="flex items-center justify-between flex-wrap gap-3">
      <div class="flex items-center gap-4 text-xs font-mono-data text-ink-muted">
        <span>{abstimmung.readTime} MIN LESEZEIT</span>
        <span aria-hidden="true">·</span>
        <span>BUNDESRAT: <strong class="{abstimmung.bundesratPosition === 'JA' ? 'text-pro' : 'text-contra'}">{abstimmung.bundesratPosition}</strong></span>
      </div>
      <span class="btn-primary text-sm">
        Briefing öffnen
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </span>
    </div>
  </a>
{:else}
  <a
    href="/abstimmungen/{abstimmung.slug}"
    class="card card-interactive block p-5 flex gap-4 relative overflow-hidden"
  >
    <div class="absolute left-0 top-0 bottom-0 w-1" style="background: {accent};" />
    <div class="flex-1 min-w-0 pl-2">
      <p class="font-mono-data text-[10px] text-ink-subtle uppercase tracking-wider mb-1">
        {abstimmung.category}
      </p>
      <h3 class="font-display text-lg leading-snug text-ink mb-1 truncate">
        {abstimmung.shortTitle}
      </h3>
      <p class="text-sm text-ink-muted mb-3 line-clamp-2">{abstimmung.aiSummary}</p>
      <div class="flex items-center gap-3 text-xs font-mono-data text-ink-muted">
        <span>{abstimmung.readTime} MIN</span>
        <span aria-hidden="true">·</span>
        <span>BR: <Badge position={abstimmung.bundesratPosition} size="sm" /></span>
        {#if days > 0}
          <span aria-hidden="true">·</span>
          <span>{days}T</span>
        {/if}
      </div>
    </div>
    <div class="flex-shrink-0 self-center">
      <svg class="w-5 h-5 text-ink-subtle" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </a>
{/if}

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
