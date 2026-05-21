<script lang="ts">
  import type { PageData } from './$types';
  import AppBar from '$lib/components/AppBar.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import InteresseForm from '$lib/components/InteresseForm.svelte';
  import { formatDate } from '$lib/mockData';

  export let data: PageData;

  $: p = data.partei;
  $: mitgliederFmt = new Intl.NumberFormat('de-CH').format(p.mitglieder);
</script>

<svelte:head>
  <title>{p.name} ({p.kuerzel}) – Voting Assistant</title>
  <meta name="description" content="{p.kurzprofil.slice(0, 155)}" />
</svelte:head>

<AppBar title={p.kuerzel} backHref="/parteien" />

<!-- HERO with party color -->
<section
  class="border-b border-border-light"
  style="background: linear-gradient(135deg, {p.farbeLight} 0%, var(--surface) 100%);"
>
  <div class="container-app py-10 md:py-14">
    <a href="/parteien" class="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold mb-6" style="color: {p.farbe};">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Alle Parteien
    </a>

    <div class="flex items-start gap-5">
      <div
        class="w-20 h-20 rounded-full flex items-center justify-center text-white text-base font-bold flex-shrink-0 shadow-card"
        style="background-color: {p.farbe};"
        aria-hidden="true"
      >
        {p.kuerzel.slice(0, 4)}
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-mono-data text-xs uppercase tracking-wider mb-1" style="color: {p.farbe};">
          {p.ausrichtung} · seit {p.gegruendet}
        </p>
        <h1 class="font-display text-3xl md:text-5xl text-ink leading-tight mb-2">
          {p.name}
        </h1>
        <p class="font-display italic text-base md:text-lg text-ink-muted">«{p.slogan}»</p>
      </div>
    </div>
  </div>
</section>

<!-- DETAILS GRID -->
<section class="container-app py-10 md:py-14">
  <div class="grid md:grid-cols-3 gap-6 md:gap-8">
    <!-- Kurzprofil + Fakten -->
    <div class="md:col-span-2">
      <p class="section-eyebrow mb-2">Über die {p.kuerzel}</p>
      <h2 class="font-display text-2xl text-ink mb-4 border-b border-border-light pb-2">Profil</h2>
      <p class="text-base text-ink leading-relaxed mb-6">{p.kurzprofil}</p>

      <p class="section-eyebrow mb-3">Kernthemen</p>
      <div class="flex flex-wrap gap-2 mb-8">
        {#each p.kernthemen as thema}
          <span class="tag" style="background: {p.farbeLight}; color: {p.farbe}; border-color: {p.farbe}40;">{thema}</span>
        {/each}
      </div>
    </div>

    <!-- Fakten Sidebar -->
    <aside class="md:col-span-1">
      <div class="card p-5 mb-4">
        <p class="section-eyebrow mb-4">Fakten</p>
        <dl class="space-y-3 text-sm">
          <div class="flex justify-between border-b border-border-light pb-2">
            <dt class="text-ink-muted">Gegründet</dt>
            <dd class="font-mono-data text-ink font-semibold">{p.gegruendet}</dd>
          </div>
          <div class="flex justify-between border-b border-border-light pb-2">
            <dt class="text-ink-muted">Mitglieder</dt>
            <dd class="font-mono-data text-ink font-semibold">{mitgliederFmt}</dd>
          </div>
          <div class="border-b border-border-light pb-2">
            <dt class="text-ink-muted mb-0.5">Präsidium</dt>
            <dd class="text-ink font-medium leading-snug">{p.praesident}</dd>
          </div>
          <div>
            <dt class="text-ink-muted mb-0.5">Website</dt>
            <dd>
              <a href="https://{p.website}" target="_blank" rel="noopener" class="source-link inline-flex items-center gap-1">
                {p.website}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <!-- Spektrum -->
      <div class="card p-5">
        <p class="section-eyebrow mb-4">Politisches Spektrum</p>

        <p class="text-xs font-semibold text-ink mb-1.5">Links → Rechts</p>
        <div class="flex justify-between text-[10px] font-mono-data text-ink-muted uppercase tracking-wider mb-1.5">
          <span>Links</span>
          <span>Rechts</span>
        </div>
        <div class="spektrum-bar mb-4">
          <div class="spektrum-dot" style="left: {p.spektrumLR}%;" />
        </div>

        <p class="text-xs font-semibold text-ink mb-1.5">Wirtschaft → Umwelt</p>
        <div class="flex justify-between text-[10px] font-mono-data text-ink-muted uppercase tracking-wider mb-1.5">
          <span>Wirtschaft</span>
          <span>Umwelt</span>
        </div>
        <div
          class="relative h-2 rounded-full mb-1"
          style="background: linear-gradient(to right, #2563EB 0%, #EAB308 50%, #16A34A 100%);"
        >
          <div class="spektrum-dot" style="left: {p.spektrumUW}%;" />
        </div>
      </div>
    </aside>
  </div>
</section>

<!-- POSITIONEN ZU ABSTIMMUNGEN -->
{#if data.positionen.length > 0}
  <section class="container-app pb-12">
    <div class="border-b border-border-light pb-2 mb-5">
      <p class="section-eyebrow mb-1">Aktuelle Vorlagen</p>
      <h2 class="font-display text-2xl text-ink">Positionen zu Abstimmungen</h2>
    </div>

    <div class="space-y-3">
      {#each data.positionen as item}
        <a
          href="/abstimmungen/{item.abstimmung.slug}"
          class="card card-interactive p-5 flex items-start gap-4"
          style="border-left: 4px solid {p.farbe};"
        >
          <div class="flex-1 min-w-0">
            <p class="font-mono-data text-[10px] text-ink-subtle uppercase tracking-wider mb-1">
              {formatDate(item.abstimmung.date)} · {item.abstimmung.category}
            </p>
            <h3 class="font-display text-lg text-ink mb-1 leading-snug">
              {item.abstimmung.shortTitle}
            </h3>
            <p class="text-sm text-ink-muted italic">«{item.statement}»</p>
          </div>
          <Badge position={item.position} size="md" />
        </a>
      {/each}
    </div>
  </section>
{/if}

<!-- INTERESSE FORM (Feature 3) -->
<section class="container-app pb-20">
  <InteresseForm parteiKuerzel={p.kuerzel} parteiName={p.name} parteiFarbe={p.farbe} />
</section>
