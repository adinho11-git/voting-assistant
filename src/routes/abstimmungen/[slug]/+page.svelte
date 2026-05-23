<script lang="ts">
  import type { PageData } from './$types';
  import AppBar from '$lib/components/AppBar.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import VoteSection from '$lib/components/VoteSection.svelte';
  import VotingAssistant from '$lib/components/VotingAssistant.svelte';
  import ArgumentWeighting from '$lib/components/ArgumentWeighting.svelte';
  import VotingJournal from '$lib/components/VotingJournal.svelte';
  import FeedbackForm from '$lib/components/FeedbackForm.svelte';
  import FavoriteButton from '$lib/components/FavoriteButton.svelte';
  import DataQualityBadge from '$lib/components/DataQualityBadge.svelte';
  import { engagementStore, toggleFavorite } from '$lib/stores/engagement';
  import { showToast } from '$lib/stores/toast';
  import { formatDate } from '$lib/mockData';

  export let data: PageData;

  interface SourceItem {
    label: string;
    url: string;
    context: string;
    date?: string;
  }

  const sectionLinks = [
    { label: 'Überblick', href: '#ueberblick' },
    { label: 'Argumente', href: '#argumente' },
    { label: 'Parteien', href: '#parteien' },
    { label: 'Meine Position', href: '#meine-position' },
    { label: 'Quellen', href: '#quellen' }
  ];

  let sectionScrollAnimation: number | null = null;
  let sectionScrollBehaviorBefore: string | null = null;

  $: a = data.abstimmung;
  $: dateStr = formatDate(a.date);
  $: parlamentTotal = a.parlamentStimmen.ja + a.parlamentStimmen.nein;
  $: jaPercent = parlamentTotal > 0 ? Math.round((a.parlamentStimmen.ja / parlamentTotal) * 100) : 0;
  $: isPast = a.status === 'vergangen';
  $: resultNeinPercent = a.result ? 100 - a.result.jaPercent : 0;
  $: resultVotesTotal =
    a.result?.votersTotal ?? (a.result?.jaVotes && a.result?.neinVotes ? a.result.jaVotes + a.result.neinVotes : null);
  $: resultVotesLabel = resultVotesTotal ? new Intl.NumberFormat('de-CH').format(resultVotesTotal) : null;
  $: resultJaVotesLabel = a.result?.jaVotes ? new Intl.NumberFormat('de-CH').format(a.result.jaVotes) : null;
  $: resultNeinVotesLabel = a.result?.neinVotes ? new Intl.NumberFormat('de-CH').format(a.result.neinVotes) : null;
  $: bookmarked = !!$engagementStore.favorites[a.slug];
  $: sourceItems = collectSources(a);

  function collectSources(vote: PageData['abstimmung']): SourceItem[] {
    const seen = new Set<string>();
    const items: SourceItem[] = [];

    function add(label: string | undefined, url: string | undefined, context: string, date?: string): void {
      if (!label || !url) return;
      const key = `${label}-${url}`;
      if (seen.has(key)) return;
      seen.add(key);
      items.push({ label, url, context, date });
    }

    add(vote.summarySource, vote.summarySourceUrl, 'Neutraler Überblick', vote.summaryLastChecked);
    if (vote.result) add(vote.result.source, vote.result.sourceUrl, 'Offizielles Resultat');

    for (const argument of vote.proArguments) {
      add(argument.source, argument.sourceUrl, 'Pro-Argument', argument.sourceDate);
    }
    for (const argument of vote.contraArguments) {
      add(argument.source, argument.sourceUrl, 'Contra-Argument', argument.sourceDate);
    }
    for (const party of vote.parteien) {
      add(party.parolenQuelle, party.parolenQuelleUrl, `Parole ${party.kuerzel}`);
    }

    return items;
  }

  function toggleDetailFavorite(): void {
    const next = toggleFavorite(a.slug, a.shortTitle);
    showToast(next ? 'In deiner Merkliste gespeichert.' : 'Aus deiner Merkliste entfernt.', 'success');
  }

  function updateHash(href: string): void {
    if (window.location.hash === href) {
      history.replaceState(null, '', href);
    } else {
      history.pushState(null, '', href);
    }
  }

  function scrollToSection(event: MouseEvent, href: string): void {
    if (!href.startsWith('#')) return;

    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    event.preventDefault();
    updateHash(href);

    if (sectionScrollAnimation !== null) {
      cancelAnimationFrame(sectionScrollAnimation);
      sectionScrollAnimation = null;
      document.documentElement.style.scrollBehavior = sectionScrollBehaviorBefore ?? '';
      sectionScrollBehaviorBefore = null;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const startY = window.scrollY;
    const scrollMarginTop = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - scrollMarginTop);
    const distance = targetY - startY;
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;

    if (reduceMotion || Math.abs(distance) < 4) {
      window.scrollTo({ top: targetY, left: 0, behavior: 'auto' });
      return;
    }

    root.style.scrollBehavior = 'auto';
    sectionScrollBehaviorBefore = previousScrollBehavior;

    const duration = Math.min(850, Math.max(420, Math.abs(distance) * 0.42));
    const startTime = performance.now();
    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const nextY = startY + distance * easeInOutCubic(progress);

      window.scrollTo({ top: nextY, left: 0, behavior: 'auto' });

      if (progress < 1) {
        sectionScrollAnimation = requestAnimationFrame(animate);
      } else {
        root.style.scrollBehavior = sectionScrollBehaviorBefore ?? previousScrollBehavior;
        sectionScrollBehaviorBefore = null;
        sectionScrollAnimation = null;
      }
    };

    sectionScrollAnimation = requestAnimationFrame(animate);
  }
</script>

<svelte:head>
  <title>{a.shortTitle} – Briefing | Voting Assistant</title>
  <meta name="description" content={a.aiSummary.slice(0, 155)} />
  <meta property="og:title" content={a.title} />
  <meta property="og:description" content={a.aiSummary.slice(0, 200)} />
</svelte:head>

<AppBar title="Briefing {dateStr}" backHref="/abstimmungen" showBookmark={true} bookmarked={bookmarked} on:bookmark={toggleDetailFavorite} />

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

  <div class="flex items-start justify-between gap-5 mb-5">
    <h1 class="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-ink max-w-4xl">
      {a.title}
    </h1>
    <div class="hidden md:block flex-shrink-0 pt-2">
      <FavoriteButton slug={a.slug} title={a.shortTitle} />
    </div>
  </div>

  <div class="meta-strip">
    <div class="meta-pill">
      <span class="meta-label">Lesezeit</span>
      <span class="meta-value">{a.readTime} Min</span>
    </div>
    <div class="meta-pill">
      <span class="meta-label">Bundesrat</span>
      <Badge position={a.bundesratPosition} size="sm" />
    </div>
    <div class="meta-pill">
      <span class="meta-label">Parlament</span>
      <span class="inline-flex items-center gap-2"><Badge position={a.parlamentPosition} size="sm" /> {a.parlamentStimmen.ja}:{a.parlamentStimmen.nein}</span>
    </div>
  </div>
</section>

{#if isPast && a.result}
  <section class="container-app pb-6">
    <div class="card p-6 md:p-8" style="border-left: 4px solid {a.result.accepted ? 'var(--pro)' : 'var(--contra)'};">
      <div class="flex flex-wrap items-baseline gap-3 mb-3">
        <p class="section-eyebrow">Endresultat</p>
        <span class="{a.result.accepted ? 'badge-ja' : 'badge-nein'}" style="font-size: 12px;">
          {a.result.accepted ? 'ANGENOMMEN' : 'ABGELEHNT'}
        </span>
      </div>
      <div class="result-metrics">
        <div class="result-metric result-metric-ja">
          <div class="result-metric-label">
            <span class="result-icon result-icon-ja" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            <span>JA-Anteil</span>
          </div>
          <p class="result-metric-value text-pro">{a.result.jaPercent.toFixed(1)}%</p>
          {#if resultJaVotesLabel}
            <p class="result-metric-note">{resultJaVotesLabel} Ja-Stimmen</p>
          {/if}
        </div>

        <div class="result-metric result-metric-nein">
          <div class="result-metric-label">
            <span class="result-icon result-icon-nein" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
              </svg>
            </span>
            <span>NEIN-Anteil</span>
          </div>
          <p class="result-metric-value text-contra">{resultNeinPercent.toFixed(1)}%</p>
          {#if resultNeinVotesLabel}
            <p class="result-metric-note">{resultNeinVotesLabel} Nein-Stimmen</p>
          {/if}
        </div>

        <div class="result-metric">
          <div class="result-metric-label">
            <span>Abstimmende Schweiz</span>
          </div>
          <p class="result-metric-value">{resultVotesLabel ?? 'Nicht ausgewiesen'}</p>
          <p class="result-metric-note">{a.result.turnoutPercent.toFixed(2)}% Stimmbeteiligung</p>
        </div>
      </div>
      <div class="community-bar mb-2">
        <div class="bar-ja" style="width: {a.result.jaPercent}%" />
        <div class="bar-nein" style="width: {resultNeinPercent}%" />
      </div>
      <p class="text-xs text-ink-subtle mt-3">
        Quelle: <a href={a.result.sourceUrl} target="_blank" rel="noopener" class="source-link">{a.result.source}</a>
      </p>
    </div>
  </section>
{/if}

<section class="container-app pb-6">
  <nav class="workflow-nav" aria-label="Abschnitte des Entscheidungs-Assistenten">
    {#each sectionLinks as item, index}
      <a href={item.href} on:click={(event) => scrollToSection(event, item.href)}>
        <span>{index + 1}</span>
        {item.label}
      </a>
    {/each}
  </nav>
</section>

<section id="ueberblick" class="container-app pb-8 workflow-anchor">
  <VotingAssistant abstimmung={a} />
  {#if a.parlamentNote}
    <p class="briefing-note">{a.parlamentNote}</p>
  {/if}
</section>

<section id="argumente" class="container-app pb-10 workflow-anchor">
  <div class="section-heading">
    <div>
      <p class="section-eyebrow">2 Abwägen · 3 Gewichten</p>
      <h2 class="font-display text-2xl md:text-3xl text-ink">Argumente mit Wirkung auf deine Tendenz</h2>
    </div>
    <p>
      Die Gewichtung ist keine Prognose und kein Parteien-Matching, sondern nur deine eigene Priorisierung der Argumente.
    </p>
  </div>
  <ArgumentWeighting abstimmung={a} />
</section>

<section id="parteien" class="container-app pb-10 workflow-anchor">
  <div class="card p-6 md:p-8">
    <div class="section-heading compact">
      <div>
        <p class="section-eyebrow">4 Einordnen</p>
        <h2 class="font-display text-2xl text-ink">Parteipositionen</h2>
      </div>
      <a href="/abstimmungen/{a.slug}/parteien" class="text-sm font-semibold text-brand hover:text-brand-dark">
        Details →
      </a>
    </div>

    <p class="party-note">
      Parteiparolen zeigen politische Orientierungslinien. Sie sind keine persönliche Empfehlung und ersetzen deine eigene Gewichtung nicht.
    </p>

    <div class="party-list">
      {#each a.parteien as partei}
        <a
          href="/parteien/{partei.kuerzel.toLowerCase()}"
          class="party-row"
          style="border-left-color: {partei.color};"
        >
          <div
            class="party-avatar"
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

<section id="meine-position" class="container-app pb-10 workflow-anchor">
  <div class="section-heading">
    <div>
      <p class="section-eyebrow">5 Entscheiden · 6 Speichern</p>
      <h2 class="font-display text-2xl md:text-3xl text-ink">Meine Position und Voting-Journal</h2>
    </div>
    <p>
      Lege deine aktuelle Haltung fest, speichere die Sicherheit dazu und halte kurz fest, warum du so entscheidest.
    </p>
  </div>
  <VoteSection slug={a.slug} abstimmung={a} initialCommunity={data.community} />
  <div class="journal-followup">
    <VotingJournal abstimmung={a} />
  </div>
</section>

<section id="quellen" class="container-app pb-10 workflow-anchor">
  <div class="card p-6 md:p-8">
    <div class="section-heading compact">
      <div>
        <p class="section-eyebrow">Quellen</p>
        <h2 class="font-display text-2xl text-ink">Nachprüfen statt nur vertrauen</h2>
      </div>
      <a href="/quellen" class="text-sm font-semibold text-brand hover:text-brand-dark">Quellenübersicht →</a>
    </div>

    <div class="source-grid">
      {#each sourceItems as source}
        <a href={source.url} target="_blank" rel="noopener" class="source-item">
          <span>{source.context}{#if source.date} · {source.date}{/if}</span>
          <strong>{source.label}</strong>
        </a>
      {/each}
    </div>
  </div>
</section>

<section class="container-app pb-10">
  <FeedbackForm abstimmung={a} />
</section>

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

<style>
  .workflow-anchor {
    scroll-margin-top: 96px;
  }

  .workflow-nav {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 8px;
    padding: 10px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius-lg);
    background: color-mix(in srgb, var(--surface) 92%, transparent);
    box-shadow: var(--shadow-sm);
  }

  .workflow-nav a {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 44px;
    padding: 8px 10px;
    border: 1px solid transparent;
    border-radius: var(--radius);
    color: var(--text);
    font-size: 14px;
    font-weight: 800;
    text-decoration: none;
    transition: background 160ms ease, border-color 160ms ease, color 160ms ease;
  }

  .workflow-nav a:hover {
    color: var(--brand);
    border-color: color-mix(in srgb, var(--brand) 32%, var(--border-light));
    background: var(--brand-soft);
  }

  .workflow-nav span {
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    border-radius: var(--radius-full);
    background: var(--surface-alt);
    color: var(--brand);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    font-weight: 900;
  }

  .section-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 18px;
    margin-bottom: 18px;
  }

  .section-heading.compact {
    align-items: center;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--border-light);
  }

  .section-heading > p {
    max-width: 430px;
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1.5;
  }

  .briefing-note {
    margin-top: 12px;
    padding: 12px 14px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: var(--surface);
    color: var(--text-muted);
    font-size: 13px;
    font-style: italic;
    line-height: 1.45;
  }

  .party-note {
    margin: 16px 0;
    padding: 12px 14px;
    border: 1px solid color-mix(in srgb, var(--brand) 22%, var(--border-light));
    border-radius: var(--radius);
    background: var(--brand-soft);
    color: var(--text);
    font-size: 14px;
    line-height: 1.5;
  }

  .party-list {
    display: grid;
    gap: 10px;
    margin-bottom: 24px;
  }

  .party-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px;
    border: 1px solid var(--border-light);
    border-left: 4px solid var(--brand);
    border-radius: var(--radius);
    background: color-mix(in srgb, var(--surface-alt) 22%, var(--surface));
    text-decoration: none;
    transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
  }

  .party-row:hover {
    transform: translateY(-1px);
    border-color: var(--border);
    background: var(--surface);
  }

  .party-avatar {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    border-radius: var(--radius-full);
    color: white;
    font-size: 11px;
    font-weight: 800;
  }

  .journal-followup {
    margin-top: 18px;
  }

  .source-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin-top: 16px;
  }

  .source-item {
    display: grid;
    gap: 5px;
    padding: 14px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: color-mix(in srgb, var(--surface-alt) 30%, var(--surface));
    text-decoration: none;
    transition: border-color 160ms ease, background 160ms ease, transform 160ms ease;
  }

  .source-item:hover {
    transform: translateY(-1px);
    border-color: color-mix(in srgb, var(--brand) 35%, var(--border-light));
    background: var(--surface);
  }

  .source-item span {
    color: var(--text-muted);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .source-item strong {
    color: var(--brand);
    font-size: 14px;
    line-height: 1.35;
  }

  @media (max-width: 820px) {
    .workflow-anchor {
      scroll-margin-top: 124px;
    }

    .workflow-nav {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .workflow-nav a {
      min-width: 0;
    }

    .section-heading,
    .section-heading.compact {
      display: grid;
      align-items: start;
    }

    .source-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 560px) {
    .workflow-nav {
      grid-template-columns: 1fr;
    }

    .party-row {
      align-items: flex-start;
    }
  }
</style>
