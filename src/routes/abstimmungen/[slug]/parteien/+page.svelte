<script lang="ts">
  import type { PageData } from './$types';
  import AppBar from '$lib/components/AppBar.svelte';
  import Badge from '$lib/components/Badge.svelte';

  export let data: PageData;

  $: a = data.abstimmung;
  $: parlamentTotal = a.parlamentStimmen.ja + a.parlamentStimmen.nein;
  $: jaPercent = parlamentTotal > 0 ? Math.round((a.parlamentStimmen.ja / parlamentTotal) * 100) : 0;
</script>

<svelte:head>
  <title>Parteipositionen – {a.shortTitle} | Voting Assistant</title>
</svelte:head>

<AppBar title="Parteipositionen" backHref="/abstimmungen/{a.slug}" />

<section class="container-read pt-6 md:pt-12 pb-16">
  <a href="/abstimmungen/{a.slug}" class="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark mb-6">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    Zurück zum Briefing
  </a>

  <p class="section-eyebrow mb-2">{a.shortTitle}</p>
  <h1 class="font-display text-3xl md:text-4xl text-ink mb-2">Parteipositionen</h1>
  <p class="text-ink-muted mb-8">6 Parteien · Bundesrat · Parlament</p>

  <div class="card p-6 mb-8">
    <p class="section-eyebrow mb-3">Stimmenverhältnis Parlament</p>
    <div class="community-bar mb-2" style="height: 16px;">
      <div class="bar-ja" style="width: {jaPercent}%" />
      <div class="bar-nein" style="width: {100 - jaPercent}%" />
    </div>
    <div class="flex justify-between text-sm font-mono-data font-semibold">
      <span class="text-pro">JA {a.parlamentStimmen.ja} ({jaPercent}%)</span>
      <span class="text-contra">NEIN {a.parlamentStimmen.nein} ({100 - jaPercent}%)</span>
    </div>
  </div>

  <h2 class="font-display text-xl text-ink mb-4 border-b border-border-light pb-2">Detailübersicht</h2>
  <div class="space-y-3">
    {#each a.parteien as partei}
      <a
        href="/parteien/{partei.kuerzel.toLowerCase()}"
        class="card card-interactive flex items-center gap-4 p-4"
        style="border-left: 4px solid {partei.color};"
      >
        <div
          class="w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style="background-color: {partei.color}"
          aria-hidden="true"
        >
          {partei.kuerzel.slice(0, 4)}
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-base text-ink">{partei.name}</p>
          <p class="text-sm text-ink-muted italic leading-snug mt-0.5">«{partei.statement}»</p>
        </div>
        <Badge position={partei.position} size="md" />
      </a>
    {/each}

    <div class="card flex items-center gap-4 p-4" style="border-left: 4px solid var(--blue);">
      <div class="w-12 h-12 rounded-full bg-swiss-blue flex items-center justify-center text-white text-xs font-bold flex-shrink-0" aria-hidden="true">BR</div>
      <div class="flex-1">
        <p class="font-semibold text-base text-ink">Bundesrat</p>
        <p class="text-sm text-ink-muted italic">Offizielle Empfehlung der Landesregierung</p>
      </div>
      <Badge position={a.bundesratPosition} size="md" />
    </div>
  </div>

  <p class="text-xs text-ink-subtle text-center mt-8">
    Quelle: Parlamentsabstimmung · Aktualisiert täglich
  </p>
</section>
