<script lang="ts">
  import type { PageData } from './$types';
  import AppBar from '$lib/components/AppBar.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import VoteSection from '$lib/components/VoteSection.svelte';
  import DataQualityBadge from '$lib/components/DataQualityBadge.svelte';
  import { formatDate } from '$lib/mockData';

  export let data: PageData;

  $: a = data.abstimmung;
  $: dateStr = formatDate(a.date);
  $: parlamentTotal = a.parlamentStimmen.ja + a.parlamentStimmen.nein;
  $: jaPercent = parlamentTotal > 0 ? Math.round((a.parlamentStimmen.ja / parlamentTotal) * 100) : 0;
  $: isPast = a.status === 'vergangen';
</script>

<svelte:head>
  <title>{a.shortTitle} – Briefing | Voting Assistant</title>
  <meta name="description" content="{a.aiSummary.slice(0, 155)}" />
  <meta property="og:title" content="{a.title}" />
  <meta property="og:description" content="{a.aiSummary.slice(0, 200)}" />
</svelte:head>

<AppBar title="Briefing {dateStr}" backHref="/abstimmungen" showBookmark={true} />

<!-- HEADER -->
<section class="container-app pt-6 md:pt-10 pb-4">
  <a href="/abstimmungen" class="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark mb-6">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    Alle Abstimmungen
  </a>

  <div class="flex flex-wrap items-center gap-2 mb-3">
    <span class="badge-brand">
      {#if a.type === 'kantonal'}Kantonal {a.kanton ?? ''}{:else}Eidg.{/if} {dateStr}
    </span>
    <span class="text-xs font-mono-data text-ink-muted uppercase tracking-wider">{a.category}</span>
    <DataQualityBadge quality={a.dataQuality} />
    {#if isPast}
      <span class="badge-neutral" style="font-size:11px;">VERGANGEN</span>
    {/if}
  </div>

  <h1 class="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-ink mb-5 max-w-4xl">
    {a.title}
  </h1>

  <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono-data text-ink-muted uppercase tracking-wider">
    <span>{a.readTime} MIN LESEZEIT</span>
    <span aria-hidden="true">·</span>
    <span class="inline-flex items-center gap-1">BUNDESRAT <Badge position={a.bundesratPosition} size="sm" /></span>
    <span aria-hidden="true">·</span>
    <span class="inline-flex items-center gap-1">PARLAMENT <Badge position={a.parlamentPosition} size="sm" /> ({a.parlamentStimmen.ja}:{a.parlamentStimmen.nein})</span>
  </div>
</section>

<!-- RESULT BANNER for past votes -->
{#if isPast && a.result}
  <section class="container-app pb-6">
    <div class="card p-6 md:p-8" style="border-left: 4px solid {a.result.accepted ? 'var(--pro)' : 'var(--contra)'};">
      <div class="flex flex-wrap items-baseline gap-3 mb-3">
        <p class="section-eyebrow">Endresultat</p>
        <span class="{a.result.accepted ? 'badge-ja' : 'badge-nein'}" style="font-size: 12px;">
          {a.result.accepted ? 'ANGENOMMEN' : 'ABGELEHNT'}
        </span>
      </div>
      <div class="grid sm:grid-cols-3 gap-5 mb-4">
        <div>
          <p class="font-mono-data text-3xl font-medium text-ink">{a.result.jaPercent.toFixed(1)}%</p>
          <p class="text-xs text-ink-muted uppercase tracking-wider font-mono-data">JA-Anteil</p>
        </div>
        <div>
          <p class="font-mono-data text-3xl font-medium text-ink">{(100 - a.result.jaPercent).toFixed(1)}%</p>
          <p class="text-xs text-ink-muted uppercase tracking-wider font-mono-data">NEIN-Anteil</p>
        </div>
        <div>
          <p class="font-mono-data text-3xl font-medium text-ink">{a.result.turnoutPercent.toFixed(1)}%</p>
          <p class="text-xs text-ink-muted uppercase tracking-wider font-mono-data">Stimmbeteiligung</p>
        </div>
      </div>
      <div class="community-bar mb-2">
        <div class="bar-ja" style="width: {a.result.jaPercent}%" />
        <div class="bar-nein" style="width: {100 - a.result.jaPercent}%" />
      </div>
      <p class="text-xs text-ink-subtle mt-3">
        Quelle: <a href={a.result.sourceUrl} target="_blank" rel="noopener" class="source-link">{a.result.source}</a>
      </p>
    </div>
  </section>
{/if}

<!-- AI SUMMARY -->
<section class="container-app pb-8">
  <div class="card p-6 md:p-8 hero-accent">
    <div class="flex items-center justify-between flex-wrap gap-2 mb-3">
      <p class="section-eyebrow">KI-Zusammenfassung · neutral formuliert</p>
      <p class="text-xs text-ink-subtle font-mono-data">
        Quelle: <a href={a.summarySourceUrl} target="_blank" rel="noopener" class="source-link">{a.summarySource}</a>
        · Stand {a.summaryLastChecked}
      </p>
    </div>
    <p class="text-base md:text-lg text-ink leading-relaxed">{a.aiSummary}</p>
    {#if a.parlamentNote}
      <p class="text-xs text-ink-subtle mt-3 italic">{a.parlamentNote}</p>
    {/if}
  </div>
</section>

<!-- PRO / CONTRA SPLIT -->
<section class="container-app pb-10">
  <div class="grid md:grid-cols-2 gap-5">
    <!-- PRO -->
    <div>
      <div class="flex items-center gap-2 mb-4 border-b border-pro/30 pb-2">
        <span class="w-7 h-7 rounded-full bg-pro flex items-center justify-center text-white text-sm font-bold" aria-hidden="true">✓</span>
        <h2 class="font-display text-xl uppercase tracking-wider font-bold" style="color: var(--pro);">PRO</h2>
        <span class="text-xs font-mono-data text-ink-muted ml-auto">{a.proArguments.length} ARGUMENTE</span>
      </div>
      <div class="space-y-3">
        {#each a.proArguments as arg}
          <a href="/abstimmungen/{a.slug}/argumente/{arg.id}" class="argument-card pro group">
            <p class="text-sm text-ink leading-snug group-hover:text-pro transition-colors mb-2">
              {arg.text}
            </p>
            <p class="text-xs source-link inline-flex items-center gap-1">
              {arg.source}{#if arg.sourceDate} · {arg.sourceDate}{/if}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </p>
          </a>
        {/each}
      </div>
    </div>

    <!-- CONTRA -->
    <div>
      <div class="flex items-center gap-2 mb-4 border-b border-contra/30 pb-2">
        <span class="w-7 h-7 rounded-full bg-contra flex items-center justify-center text-white text-sm font-bold" aria-hidden="true">✗</span>
        <h2 class="font-display text-xl uppercase tracking-wider font-bold" style="color: var(--contra);">CONTRA</h2>
        <span class="text-xs font-mono-data text-ink-muted ml-auto">{a.contraArguments.length} ARGUMENTE</span>
      </div>
      <div class="space-y-3">
        {#each a.contraArguments as arg}
          <a href="/abstimmungen/{a.slug}/argumente/{arg.id}" class="argument-card contra group">
            <p class="text-sm text-ink leading-snug group-hover:text-contra transition-colors mb-2">
              {arg.text}
            </p>
            <p class="text-xs source-link inline-flex items-center gap-1">
              {arg.source}{#if arg.sourceDate} · {arg.sourceDate}{/if}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </p>
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- PARTEIPOSITIONEN -->
<section class="container-app pb-10">
  <div class="card p-6 md:p-8">
    <div class="flex items-end justify-between mb-5 border-b border-border-light pb-3 flex-wrap gap-3">
      <div>
        <p class="section-eyebrow mb-1">Politische Landkarte</p>
        <h2 class="font-display text-2xl text-ink">Parteipositionen</h2>
      </div>
      <a href="/abstimmungen/{a.slug}/parteien" class="text-sm font-semibold text-brand hover:text-brand-dark">
        Details →
      </a>
    </div>

    <div class="space-y-2 mb-6">
      {#each a.parteien as partei}
        <a
          href="/parteien/{partei.kuerzel.toLowerCase()}"
          class="card card-interactive flex items-center gap-4 p-4"
          style="border-left: 4px solid {partei.color};"
        >
          <div
            class="w-11 h-11 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
            style="background-color: {partei.color}"
            aria-hidden="true"
          >
            {partei.kuerzel.slice(0, 4)}
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-sm text-ink">{partei.name}</p>
            <p class="text-xs text-ink-muted italic leading-snug mt-0.5">«{partei.statement}»</p>
          </div>
          <Badge position={partei.position} size="md" />
        </a>
      {/each}
    </div>

    <!-- Parlament stimmenbar -->
    <div>
      <p class="section-eyebrow mb-2">Stimmenverhältnis Parlament</p>
      <div class="community-bar mb-1.5">
        <div class="bar-ja" style="width: {jaPercent}%" />
        <div class="bar-nein" style="width: {100 - jaPercent}%" />
      </div>
      <div class="flex justify-between text-xs font-mono-data font-semibold">
        <span class="text-pro">JA {a.parlamentStimmen.ja} ({jaPercent}%)</span>
        <span class="text-contra">NEIN {a.parlamentStimmen.nein} ({100 - jaPercent}%)</span>
      </div>
    </div>
  </div>
</section>

<!-- USER VOTE / COMMUNITY / COMPARE -->
<section class="container-app pb-10">
  <VoteSection slug={a.slug} abstimmung={a} initialCommunity={data.community} />
</section>

<!-- CTA -->
<section class="container-app pb-20">
  <div class="card p-6 md:p-8 text-center" style="background: var(--brand-light); border-color: rgba(200,16,46,0.2);">
    <p class="font-display text-xl md:text-2xl text-ink mb-2">
      {#if isPast}Vergleiche dich mit anderen Vorlagen{:else}Bereit zur Abstimmung?{/if}
    </p>
    <p class="text-sm text-ink-muted mb-5 max-w-md mx-auto">
      {#if isPast}
        Diese Vorlage liegt bereits hinter uns. Schau dir die anstehenden Vorlagen oder dein persönliches Profil an.
      {:else}
        Alle Informationen und Unterlagen findest du auf der offiziellen Plattform des Bundes.
      {/if}
    </p>
    {#if isPast}
      <div class="flex flex-wrap gap-3 justify-center">
        <a href="/abstimmungen" class="btn-primary">Aktuelle Abstimmungen</a>
        <a href="/profil" class="btn-secondary">Mein Profil</a>
      </div>
    {:else}
      <a href="https://www.ch.ch/de/abstimmungen/" target="_blank" rel="noopener" class="btn-primary">
        Jetzt informiert abstimmen
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    {/if}
  </div>
</section>
