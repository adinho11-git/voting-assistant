<script lang="ts">
  import type { Abstimmung } from '$lib/types';
  import Badge from './Badge.svelte';
  import DataQualityBadge from './DataQualityBadge.svelte';
  import { formatDate, getDaysUntil } from '$lib/mockData';
  import { votesStore } from '$lib/stores/votes';

  export let abstimmung: Abstimmung;
  export let featured: boolean = false;
  export let ctaLabel: string | undefined = undefined;

  const categoryAccent: Record<string, string> = {
    'Klimaschutz · Energiepolitik': '#16A34A',
    'Klimaschutz · Finanzen': '#16A34A',
    'Klimaschutz · Wirtschaft': '#16A34A',
    'Sozialversicherung · KVG': '#003087',
    'Sozialversicherung · Vorsorge': '#003087',
    'Migration · Bevölkerung · EU': '#7C2D12',
    'Sicherheit · Armee · Zivildienst': '#15803D',
    'Wohnungspolitik': '#EA580C',
    'Verkehr · Infrastruktur': '#7C3AED',
    'Verkehr · Kantonal': '#7C3AED',
    'Digitalisierung · Identität': '#0D9488'
  };

  $: accent = categoryAccent[abstimmung.category] ?? '#6B6B6B';
  $: days = getDaysUntil(abstimmung.date);
  $: userEntry = $votesStore[abstimmung.slug];
  $: isPast = abstimmung.status === 'vergangen';
  $: isDemo = abstimmung.dataQuality === 'demo';
  $: actionLabel =
    ctaLabel ?? (isPast ? 'Details ansehen' : isDemo ? 'Demo-Detail ansehen' : 'Entscheidungshilfe starten');
  $: decisionStatus = userEntry?.position && userEntry.position !== 'UNENTSCHIEDEN'
    ? 'Position gespeichert'
    : 'Noch nicht entschieden';
</script>

{#if featured}
  <a
    href="/abstimmungen/{abstimmung.slug}"
    class="card card-interactive block p-6 md:p-8 hero-accent h-full flex flex-col"
    style="border-left-color: {accent};"
  >
    <div class="flex items-center gap-2 mb-3 flex-wrap">
      <span class="badge-brand">Eidg. {formatDate(abstimmung.date)}</span>
      <span class="text-xs font-mono-data text-ink-muted">{abstimmung.category}</span>
    </div>
    <h2 class="font-display text-2xl md:text-3xl leading-tight text-ink mb-3">
      {abstimmung.title}
    </h2>
    <p class="featured-summary text-ink-muted text-sm md:text-base mb-6 leading-relaxed">
      {abstimmung.aiSummary}
    </p>
    <div class="featured-footer flex items-center justify-between flex-wrap gap-3 min-w-0">
      <div class="flex items-center gap-3 text-xs font-mono-data text-ink-muted flex-wrap min-w-0">
        <span>{abstimmung.readTime} MIN LESEZEIT</span>
        <span aria-hidden="true">·</span>
        <span class="inline-flex items-center gap-1">BR <Badge position={abstimmung.bundesratPosition} size="sm" /></span>
        {#if userEntry}
          <span aria-hidden="true">·</span>
          <span class="inline-flex items-center gap-1">DU
            <span class="{userEntry.position === 'JA' ? 'badge-ja' : userEntry.position === 'NEIN' ? 'badge-nein' : 'badge-neutral'}" style="font-size:10px;">
              {userEntry.position === 'UNENTSCHIEDEN' ? '?' : userEntry.position}
            </span>
          </span>
        {/if}
      </div>
      <span class="btn-primary text-sm w-full sm:w-auto">
        {actionLabel}
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
      <div class="flex items-center gap-2 flex-wrap mb-1">
        <p class="font-mono-data text-[10px] text-ink-subtle uppercase tracking-wider">
          {abstimmung.category}
        </p>
        {#if isDemo}
          <DataQualityBadge quality={abstimmung.dataQuality} />
        {/if}
        {#if isPast && abstimmung.result}
          <span class="{abstimmung.result.accepted ? 'badge-ja' : 'badge-nein'}" style="font-size:9px;">
            {abstimmung.result.accepted ? 'ANGENOMMEN' : 'ABGELEHNT'}
          </span>
        {/if}
      </div>
      <h3 class="font-display text-lg leading-snug text-ink mb-1">
        {abstimmung.shortTitle}
      </h3>
      <p class="text-sm text-ink-muted mb-3 line-clamp-2">{abstimmung.aiSummary}</p>
      <div class="flex items-center gap-3 text-xs font-mono-data text-ink-muted flex-wrap">
        <span>{formatDate(abstimmung.date)}</span>
        <span aria-hidden="true">·</span>
        {#if isPast && abstimmung.result}
          <span><strong class="{abstimmung.result.accepted ? 'text-pro' : 'text-contra'}">{abstimmung.result.jaPercent.toFixed(1)}%</strong> JA</span>
        {:else}
          <span>{abstimmung.readTime} MIN</span>
        {/if}
        <span aria-hidden="true">·</span>
        <span class="inline-flex items-center gap-1">BR <Badge position={abstimmung.bundesratPosition} size="sm" /></span>
        {#if !isPast && days > 0}
          <span aria-hidden="true">·</span>
          <span>{days}T</span>
        {/if}
        {#if userEntry}
          <span aria-hidden="true">·</span>
          <span class="inline-flex items-center gap-1">DU
            <span class="{userEntry.position === 'JA' ? 'badge-ja' : userEntry.position === 'NEIN' ? 'badge-nein' : 'badge-neutral'}" style="font-size:9px;">
              {userEntry.position === 'UNENTSCHIEDEN' ? '?' : userEntry.position}
            </span>
          </span>
        {/if}
      </div>
      <div class="card-action-row">
        <span class="card-cta">
          {actionLabel}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
        {#if !isPast}
          <span class="card-status {decisionStatus === 'Position gespeichert' ? 'saved' : ''}">
            {decisionStatus}
          </span>
        {/if}
      </div>
    </div>
    <div class="flex-shrink-0 self-start pt-1" aria-hidden="true">
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
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .featured-summary {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
    max-height: 6.6em;
    overflow: hidden;
  }

  .featured-footer {
    margin-top: auto;
    padding-top: 10px;
  }

  .card-action-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px solid var(--border-light);
    flex-wrap: wrap;
  }

  .card-cta {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: var(--brand);
    font-size: 14px;
    font-weight: 800;
    line-height: 1.2;
  }

  .card-status {
    display: inline-flex;
    align-items: center;
    min-height: 24px;
    padding: 3px 10px;
    border-radius: var(--radius-full);
    background: var(--surface-alt);
    color: var(--text-muted);
    font-size: 11px;
    font-weight: 700;
  }

  .card-status.saved {
    background: var(--pro-soft);
    color: var(--pro);
  }

  @media (min-width: 1024px) {
    .featured-summary {
      -webkit-line-clamp: 3;
      line-clamp: 3;
      max-height: 4.95em;
    }
  }

  @media (max-width: 560px) {
    :global(.hero-accent).card {
      padding: 18px;
    }

    h2,
    h3,
    p,
    span {
      min-width: 0;
      max-width: 100%;
      overflow-wrap: anywhere;
      word-break: normal;
      hyphens: auto;
    }

    .line-clamp-2,
    .featured-summary {
      display: block;
      max-height: none;
      overflow: visible;
      -webkit-line-clamp: initial;
      line-clamp: initial;
      -webkit-box-orient: initial;
    }

    .featured-footer {
      align-items: stretch;
    }

    .card-action-row {
      align-items: stretch;
      flex-direction: column;
    }

    .card-cta,
    .card-status {
      justify-content: center;
      width: 100%;
    }
  }
</style>
