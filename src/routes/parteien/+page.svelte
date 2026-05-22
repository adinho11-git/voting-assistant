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
</script>

<svelte:head>
  <title>Schweizer Parteien – Voting Assistant</title>
  <meta name="description" content="Übersicht der sechs grossen Schweizer Parteien — Profil, politische Ausrichtung, Positionen zu aktuellen Vorlagen, direkter Vergleich." />
</svelte:head>

<!-- HERO -->
<section class="container-app pt-8 md:pt-12 pb-6">
  <p class="section-eyebrow mb-2">Politische Landschaft</p>
  <h1 class="font-display text-3xl md:text-4xl text-ink mb-3">Schweizer Parteien</h1>
  <p class="text-ink-muted text-sm md:text-base max-w-3xl">
    Die sechs grössten Bundesparteien — Ausrichtung, Kernthemen, Positionen zu aktuellen Vorlagen. Vergleiche zwei Parteien direkt im unteren Bereich.
  </p>
</section>

<!-- FILTER (separate row with breathing space) -->
<section class="container-app pb-8">
  <div class="filter-panel">
    <p class="font-mono-data text-xs uppercase tracking-wider text-ink-muted mb-3">Politisches Spektrum filtern</p>
    <div role="tablist" aria-label="Politisches Spektrum" class="flex gap-1 bg-surface-alt p-1 rounded-lg w-fit">
      {#each filterTabs as tab}
        <button
          type="button"
          role="tab"
          aria-selected={filter === tab.key}
          on:click={() => (filter = tab.key)}
          class="px-4 py-1.5 text-sm font-semibold rounded-md transition-colors {filter === tab.key
            ? 'bg-surface text-brand shadow-soft'
            : 'text-ink-muted hover:text-ink'}"
        >
          {tab.label}
        </button>
      {/each}
    </div>
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

          <p class="text-sm text-ink-muted leading-relaxed mb-4 line-clamp-3 flex-1">
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
            Mehr erfahren
          </a>
        </div>
        </article>
      {/each}
    </div>
  {/key}
</section>

<!-- COMPARE TWO PARTIES -->
<section class="container-app pb-16">
  <div class="border-t border-border-light pt-10">
    <p class="section-eyebrow mb-2">Direkter Vergleich</p>
    <h2 class="font-display text-2xl md:text-3xl text-ink mb-3">Zwei Parteien gegenüberstellen</h2>
    <p class="text-ink-muted mb-6 max-w-2xl">
      Wähle zwei Parteien, um Ausrichtung, Spektrum und Positionen zu aktuellen Vorlagen direkt zu vergleichen.
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
              <p class="font-display italic text-sm text-ink-muted mb-3">«{p.slogan}»</p>
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
      <h2 class="font-display text-2xl md:text-3xl text-ink mb-3">Parteipositionen zu aktuellen Vorlagen</h2>
      <p class="text-ink-muted mb-6 max-w-2xl">
        Auf einen Blick: Wer empfiehlt JA, wer NEIN — zu den anstehenden und zuletzt entschiedenen Vorlagen.
      </p>

      <div class="card overflow-x-auto">
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
          Die Werte basieren auf publizierten Wahlempfehlungen, Parteiprogrammen und der Abstimmungsanalyse im Nationalrat. Sie sind eine Annäherung — Parteien sind nicht in einem einzigen Wert erfassbar.
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
        <ul class="text-sm text-ink leading-relaxed space-y-2">
          <li>· Offizielle Websites der sechs Parteien (sp-ps.ch, gruene.ch, grunliberale.ch, die-mitte.ch, fdp.ch, svp.ch)</li>
          <li>· Bundeskanzlei — Abstimmungsdashboard (abstimmungen.admin.ch)</li>
          <li>· easyvote.ch (Abstimmungsparolen)</li>
          <li>· Année politique suisse (annee­politique.swiss)</li>
        </ul>
      </div>
    </div>
  </div>
</section>
