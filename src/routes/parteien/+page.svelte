<script lang="ts">
  import type { PageData } from './$types';
  import type { ParteiProfil } from '$lib/parteiData';
  import { formatDate } from '$lib/mockData';
  import Badge from '$lib/components/Badge.svelte';

  export let data: PageData;

  type FilterKey = 'alle' | 'links' | 'mitte' | 'rechts';
  let filter: FilterKey = 'alle';

  function matchesFilter(p: ParteiProfil, f: FilterKey): boolean {
    if (f === 'alle') return true;
    if (f === 'links') return p.spektrumLR < 40;
    if (f === 'mitte') return p.spektrumLR >= 40 && p.spektrumLR <= 55;
    if (f === 'rechts') return p.spektrumLR > 55;
    return true;
  }

  $: filteredParteien = data.parteien.filter((p) => matchesFilter(p, filter));

  const filterTabs: { key: FilterKey; label: string }[] = [
    { key: 'alle', label: 'Alle' },
    { key: 'links', label: 'Links' },
    { key: 'mitte', label: 'Mitte' },
    { key: 'rechts', label: 'Rechts' }
  ];

  let compareA: string = 'SP';
  let compareB: string = 'SVP';

  $: parteiA = data.parteien.find((p) => p.kuerzel === compareA);
  $: parteiB = data.parteien.find((p) => p.kuerzel === compareB);
  $: sameComparison = compareA === compareB;
</script>

<svelte:head>
  <title>Schweizer Parteien – Voting Assistant</title>
  <meta name="description" content="Vergleiche Schweizer Parteien als Orientierungshilfe: politische Grundausrichtungen, Kernthemen und ausgewählte Abstimmungspositionen im Kontext." />
</svelte:head>

<!-- HERO -->
<section class="container-app pt-8 md:pt-12 pb-6">
  <p class="section-eyebrow mb-2">Politische Landschaft</p>
  <h1 class="font-display text-3xl md:text-4xl text-ink mb-3">Schweizer Parteien</h1>
  <p class="text-ink-muted text-sm md:text-base max-w-3xl">
    Vergleiche Schweizer Parteien als Orientierungshilfe. Die Seite zeigt politische Grundausrichtungen, Kernthemen und Positionen zu ausgewählten Vorlagen — als Kontext, nicht als Wahlempfehlung.
  </p>
  <a href="#parteienvergleich" class="inline-flex mt-4 text-sm font-semibold text-brand hover:underline">
    Zum Parteienvergleich
  </a>
</section>

<!-- FILTER (separate row with breathing space) -->
<section class="container-app pb-8">
  <div class="filter-panel max-w-full">
    <p class="font-mono-data text-xs uppercase tracking-wider text-ink-muted mb-3">Politisches Spektrum filtern</p>
    <div role="tablist" aria-label="Politisches Spektrum" class="flex max-w-full gap-1 overflow-x-auto bg-surface-alt p-1 rounded-lg w-fit">
      {#each filterTabs as tab}
        <button
          type="button"
          role="tab"
          aria-selected={filter === tab.key}
          on:click={() => (filter = tab.key)}
          class="shrink-0 px-4 py-1.5 text-sm font-semibold rounded-md transition-colors {filter === tab.key
            ? 'bg-surface text-brand shadow-soft'
            : 'text-ink-muted hover:text-ink'}"
        >
          {tab.label}
        </button>
      {/each}
    </div>
    <p class="text-xs text-ink-muted mt-3 max-w-2xl">
      Die Einordnung ist eine vereinfachte Orientierung anhand programmatischer Schwerpunkte und ausgewählter Abstimmungspositionen.
    </p>
  </div>
</section>

<!-- PARTY CARDS -->
<section class="container-app pb-16">
  {#key filter}
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each filteredParteien as partei, i (partei.kuerzel)}
        <article
          class="card overflow-hidden flex flex-col party-card-appear"
          style="border-top: 6px solid {partei.farbe}; --party-delay: {Math.min(i, 4) * 70}ms;"
        >
        <div class="p-6 flex-1 flex flex-col">
          <div class="flex items-start gap-3 mb-3">
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style="background-color: {partei.farbe};"
              aria-hidden="true"
            >
              {partei.kuerzel.slice(0, 4)}
            </div>
            <div class="flex-1 min-w-0">
              <h2 class="font-display text-lg text-ink leading-tight">{partei.name}</h2>
              <p class="text-xs font-mono-data text-ink-muted uppercase tracking-wider mt-0.5">
                {partei.ausrichtung} · seit {partei.gegruendet}
              </p>
            </div>
          </div>

          <p class="text-sm text-ink-muted leading-relaxed mb-4">
            {partei.kurzprofil}
          </p>

          <div class="mb-4">
            <p class="text-xs font-semibold text-ink mb-2">Kernthemen</p>
            <div class="flex flex-wrap gap-1.5">
              {#each partei.kernthemen.slice(0, 3) as thema}
                <span class="tag" style="background: {partei.farbeLight}; color: {partei.farbe}; border-color: {partei.farbe}30;">{thema}</span>
              {/each}
            </div>
          </div>

          <div class="mb-5">
            <div class="flex justify-between text-[10px] font-mono-data text-ink-muted uppercase tracking-wider mb-1.5">
              <span>Links</span>
              <span>Rechts</span>
            </div>
            <div class="spektrum-bar">
              <div class="spektrum-dot" style="left: {partei.spektrumLR}%;" />
            </div>
          </div>

          <a href="/parteien/{partei.kuerzel.toLowerCase()}" class="btn-primary text-sm mt-auto" style="background: {partei.farbe};">
            Profil ansehen
          </a>
        </div>
        </article>
      {/each}
    </div>
  {/key}
</section>

<!-- COMPARE TWO PARTIES -->
<section id="parteienvergleich" class="container-app pb-16">
  <div class="border-t border-border-light pt-10">
    <p class="section-eyebrow mb-2">Direkter Vergleich</p>
    <h2 class="font-display text-2xl md:text-3xl text-ink mb-3">Zwei Parteien gegenüberstellen</h2>
    <p class="text-ink-muted mb-6 max-w-2xl">
      Wähle zwei unterschiedliche Parteien, um Ausrichtung, Spektrum und ausgewählte Abstimmungspositionen direkt zu vergleichen.
    </p>

    <div class="card p-5 md:p-7 mb-5">
      <div class="grid sm:grid-cols-2 gap-4 mb-6">
        <label class="block">
          <span class="label-field">Partei A</span>
          <select bind:value={compareA} class="input-field">
            {#each data.parteien as p}
              <option value={p.kuerzel}>{p.name} ({p.kuerzel})</option>
            {/each}
          </select>
        </label>
        <label class="block">
          <span class="label-field">Partei B</span>
          <select bind:value={compareB} class="input-field">
            {#each data.parteien as p}
              <option value={p.kuerzel}>{p.name} ({p.kuerzel})</option>
            {/each}
          </select>
        </label>
      </div>

      {#if sameComparison}
        <p class="data-notice data-notice-inline mb-5">
          Wähle zwei unterschiedliche Parteien, damit der Vergleich einen echten Orientierungskontrast zeigt.
        </p>
      {/if}

      {#if parteiA && parteiB}
        <div class="grid md:grid-cols-2 gap-5">
          {#each [parteiA, parteiB] as p}
            <div class="card p-5" style="border-top: 4px solid {p.farbe};">
              <div class="flex items-center gap-3 mb-3">
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style="background: {p.farbe};"
                  aria-hidden="true"
                >
                  {p.kuerzel.slice(0, 4)}
                </div>
                <div>
                  <p class="font-display text-base text-ink leading-none">{p.name}</p>
                  <p class="text-xs font-mono-data text-ink-muted mt-0.5">{p.ausrichtung}</p>
                </div>
              </div>
              <dl class="text-xs space-y-1.5 mb-3">
                <div class="flex justify-between border-b border-border-light pb-1">
                  <dt class="text-ink-muted">Gegründet</dt>
                  <dd class="font-mono-data text-ink">{p.gegruendet}</dd>
                </div>
                <div class="flex justify-between border-b border-border-light pb-1">
                  <dt class="text-ink-muted">Mitglieder</dt>
                  <dd class="font-mono-data text-ink">{new Intl.NumberFormat('de-CH').format(p.mitglieder)}</dd>
                </div>
                <div class="flex justify-between border-b border-border-light pb-1">
                  <dt class="text-ink-muted">Links-Rechts</dt>
                  <dd class="font-mono-data text-ink">{p.spektrumLR}/100</dd>
                </div>
              </dl>
              <p class="text-sm text-ink-muted mb-3">
                Kernthemen: {p.kernthemen.slice(0, 3).join(', ')}
              </p>
              <a href="/parteien/{p.kuerzel.toLowerCase()}" class="text-sm font-semibold hover:underline" style="color: {p.farbe};">
                Detailseite öffnen →
              </a>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>

<!-- COMPARISON MATRIX -->
{#if data.matrixAbstimmungen.length > 0}
  <section class="container-app pb-16">
    <div class="border-t border-border-light pt-10">
      <p class="section-eyebrow mb-2">Positionen-Matrix</p>
      <h2 class="font-display text-2xl md:text-3xl text-ink mb-3">Ausgewählte Parteipositionen zu Abstimmungen</h2>
      <p class="text-ink-muted mb-6 max-w-2xl">
        Die Matrix zeigt ausgewählte Parteiempfehlungen und Parolen zu Vorlagen. Sie dient der politischen Einordnung und ersetzt keine eigene Bewertung der Argumente.
      </p>

      <div class="party-matrix-scroll card overflow-x-auto" role="region" aria-label="Parteipositionen horizontal scrollen">
        <table class="w-full text-sm min-w-[640px]">
          <thead class="bg-surface-alt text-ink-muted font-mono-data text-xs uppercase tracking-wider">
            <tr>
              <th class="px-4 py-3 text-left">Vorlage</th>
              {#each data.parteien as p}
                <th class="px-3 py-3 text-center" style="color: {p.farbe};">{p.kuerzel}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each data.matrixAbstimmungen as a}
              <tr class="border-t border-border-light">
                <td class="px-4 py-3">
                  <a href="/abstimmungen/{a.slug}" class="block group">
                    <p class="font-mono-data text-[10px] text-ink-subtle uppercase tracking-wider">{formatDate(a.date)}</p>
                    <p class="font-semibold text-ink group-hover:text-brand">{a.shortTitle}</p>
                  </a>
                </td>
                {#each data.parteien as p}
                  {@const partyVote = a.parteien.find((x) => x.kuerzel === p.kuerzel)}
                  <td class="px-3 py-3 text-center">
                    {#if partyVote}
                      <Badge position={partyVote.position} size="sm" />
                    {:else}
                      <span class="text-ink-subtle text-xs">—</span>
                    {/if}
                  </td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </section>
{/if}

<!-- METHODOLOGY -->
<section class="container-app pb-20">
  <div class="border-t border-border-light pt-10">
    <p class="section-eyebrow mb-2">Methodik</p>
    <h2 class="font-display text-2xl md:text-3xl text-ink mb-3">Wie wir Parteien einordnen</h2>

    <div class="grid md:grid-cols-2 gap-6 mt-6">
      <div class="card p-6">
        <h3 class="font-display text-lg text-ink mb-3">Spektrum (Links–Rechts)</h3>
        <p class="text-sm text-ink-muted leading-relaxed mb-4">
          Die Werte basieren auf programmatischen Schwerpunkten und ausgewählten Abstimmungspositionen. Positionen und Spektrumwerte wurden für den Prototyp vereinfacht zusammengefasst — Parteien sind nicht in einem einzigen Wert erfassbar.
        </p>
        <div class="spektrum-bar mb-2"></div>
        <div class="flex justify-between text-xs font-mono-data text-ink-muted">
          <span>0 = Links</span>
          <span>50 = Mitte</span>
          <span>100 = Rechts</span>
        </div>
      </div>

      <div class="card p-6">
        <h3 class="font-display text-lg text-ink mb-3">Quellen</h3>
        <div class="space-y-4 text-sm text-ink leading-relaxed">
          <div>
            <p class="font-semibold text-ink mb-1">Offizielle Parteiwebsites</p>
            <p class="text-ink-muted">sp-ps.ch, gruene.ch, grunliberale.ch, die-mitte.ch, fdp.ch, svp.ch</p>
          </div>
          <div>
            <p class="font-semibold text-ink mb-1">Bundeskanzlei / Abstimmungsdashboard</p>
            <p class="text-ink-muted">abstimmungen.admin.ch</p>
          </div>
          <div>
            <p class="font-semibold text-ink mb-1">Ergänzende Orientierung</p>
            <p class="text-ink-muted">easyvote.ch und Année politique suisse</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .party-matrix-scroll {
    overflow-x: auto;
    overflow-y: visible;
    scrollbar-width: thin;
    -webkit-overflow-scrolling: touch;
  }

  .party-matrix-scroll table {
    max-width: none;
  }

  @media (max-width: 640px) {
    .party-matrix-scroll {
      margin-inline: 0;
    }

    .party-matrix-scroll::after {
      content: 'Seitlich scrollen';
      position: sticky;
      left: 0;
      display: block;
      border-top: 1px solid var(--border-light);
      padding: 0.45rem 0.75rem;
      background: var(--surface);
      color: var(--text-muted);
      font-family: 'IBM Plex Mono', ui-monospace, monospace;
      font-size: 0.68rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
  }
</style>
