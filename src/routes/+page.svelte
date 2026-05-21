<script lang="ts">
  import type { PageData } from './$types';
  import AbstimmungCard from '$lib/components/AbstimmungCard.svelte';
  import { formatDate } from '$lib/mockData';

  export let data: PageData;
</script>

<svelte:head>
  <title>Voting Assistant – Schweizer Abstimmungen verstehen</title>
  <meta name="description" content="KI-gestützte, neutrale Briefings zu Schweizer Volksabstimmungen — Pro & Contra, Parteipositionen, Quellen und Community-Stimmung." />
  <meta property="og:title" content="AI Swiss Voting Assistant" />
  <meta property="og:description" content="Schweizer Abstimmungen neutral verstehen — KI-gestützt, quellenbasiert, interaktiv." />
  <meta property="og:type" content="website" />
</svelte:head>

<!-- HERO SECTION -->
<section class="container-app pt-8 md:pt-14 pb-10 md:pb-16">
  <div class="grid md:grid-cols-5 gap-8 md:gap-12 items-stretch">
    <!-- Left: Hero copy -->
    <div class="md:col-span-2 flex flex-col justify-center hero-accent">
      <p class="section-eyebrow mb-3">Schweiz · Eidgenössische Abstimmung</p>
      <h1 class="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ink mb-5">
        Abstimmungen<br />neutral verstehen.
      </h1>
      <p class="text-base md:text-lg text-ink-muted leading-relaxed mb-6">
        KI-gestützte Briefings, Pro &amp; Contra mit Originalquellen, Parteipositionen und Community-Stimmung — alles auf einen Blick.
      </p>

      {#if data.daysUntil > 0}
        <div class="flex items-baseline gap-3 mb-7">
          <span class="font-mono-data text-3xl md:text-4xl font-medium text-brand">{data.daysUntil}</span>
          <span class="font-mono-data text-xs uppercase tracking-wider text-ink-muted">
            Tage bis zur nächsten Abstimmung
          </span>
        </div>
      {:else}
        <p class="font-mono-data text-xs uppercase tracking-wider text-brand mb-7">
          Abstimmungssonntag · heute
        </p>
      {/if}

      <div class="flex flex-wrap gap-3">
        <a href="/abstimmungen" class="btn-primary">
          Alle Abstimmungen
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
        <a href="/kompass" class="btn-secondary">
          Partei-Kompass starten
        </a>
      </div>
    </div>

    <!-- Right: Featured next abstimmung -->
    <div class="md:col-span-3">
      {#if data.next}
        <AbstimmungCard abstimmung={data.next} featured={true} />
      {/if}
    </div>
  </div>
</section>

<!-- ANSTEHENDE -->
{#if data.rest.length > 0}
  <section class="container-app pb-16">
    <div class="flex items-end justify-between mb-6 border-b border-border-light pb-3">
      <div>
        <p class="section-eyebrow mb-1">Weitere Vorlagen</p>
        <h2 class="font-display text-2xl md:text-3xl text-ink">Anstehende Abstimmungen</h2>
      </div>
      <a href="/abstimmungen" class="text-sm font-semibold text-brand hover:text-brand-dark">
        Alle ansehen →
      </a>
    </div>

    <div class="grid md:grid-cols-2 gap-4">
      {#each data.rest as abstimmung}
        <AbstimmungCard {abstimmung} />
      {/each}
    </div>
  </section>
{/if}

<!-- TRUST / FEATURES -->
<section class="container-app pb-20">
  <div class="card p-8 md:p-12">
    <div class="grid md:grid-cols-3 gap-8 md:gap-10">
      <div>
        <p class="section-eyebrow mb-3">Quellen-basiert</p>
        <h3 class="font-display text-xl text-ink mb-2">Nur offizielle Quellen</h3>
        <p class="text-sm text-ink-muted leading-relaxed">
          Argumente stammen aus dem Abstimmungsbüchlein, Studien des Bundes und Stellungnahmen der Parteien — jede Aussage ist verlinkt.
        </p>
      </div>
      <div>
        <p class="section-eyebrow mb-3">KI-gestützt</p>
        <h3 class="font-display text-xl text-ink mb-2">Neutral zusammengefasst</h3>
        <p class="text-sm text-ink-muted leading-relaxed">
          Komplexe Vorlagen werden in drei Minuten erklärt — ohne Spin, ohne politische Wertung, ausgewogen auf beiden Seiten.
        </p>
      </div>
      <div>
        <p class="section-eyebrow mb-3">Interaktiv</p>
        <h3 class="font-display text-xl text-ink mb-2">Deine Meinung zählt</h3>
        <p class="text-sm text-ink-muted leading-relaxed">
          Stimme ab, vergleiche dich mit der Community, finde im Kompass-Quiz heraus, welche Partei dir am nächsten steht.
        </p>
      </div>
    </div>
  </div>
</section>
