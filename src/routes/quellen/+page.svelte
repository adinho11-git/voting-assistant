<script lang="ts">
  type MediaCategory =
    | 'Überblick'
    | 'Hintergrund'
    | 'Pro-Argumente'
    | 'Contra-Argumente'
    | 'Faktencheck'
    | 'Parteienreaktionen';

  type MediaFilter = 'Alle' | 'Pro Abstimmung' | MediaCategory;

  interface LinkSource {
    title: string;
    description: string;
    href: string;
    tag: string;
  }

  interface MediaArticle {
    title: string;
    medium: 'SRF' | 'NZZ' | 'Watson' | '20 Minuten';
    date: string;
    abstimmung: string;
    category: MediaCategory;
    description: string;
    href: string;
  }

  const officialSources: LinkSource[] = [
    {
      title: 'Bundeskanzlei und admin.ch',
      description: 'Abstimmungsbüchlein, Bundesratspositionen und offizielle Erläuterungen.',
      href: 'https://www.admin.ch',
      tag: 'Offiziell'
    },
    {
      title: 'Vollständige Initiativ- und Gesetzestexte',
      description: 'Originalwortlaute der Vorlagen, Publikationen und formelle Unterlagen.',
      href: 'https://www.bk.admin.ch',
      tag: 'Originaltext'
    },
    {
      title: 'Bundesamt für Statistik',
      description: 'Resultate, Beteiligung, historische Abstimmungsdaten und politische Karten.',
      href: 'https://www.bfs.admin.ch',
      tag: 'Daten'
    },
    {
      title: 'Fachämter des Bundes',
      description: 'Kontextmaterial von Bundesstellen wie BAFU, Seco, BAG, VBS oder BFE.',
      href: 'https://www.admin.ch/gov/de/start/departemente.html',
      tag: 'Kontext'
    }
  ];

  const partySources: LinkSource[] = [
    {
      title: 'Parteiparolen der Bundesparteien',
      description: 'Empfehlungen, Kampagnenargumente und Positionspapiere von SP, Grünen, GLP, Mitte, FDP und SVP.',
      href: '/parteien',
      tag: 'Parteiquelle'
    },
    {
      title: 'Argumentarien von Komitees',
      description: 'Pro- und Contra-Komitees werden getrennt von neutralen Quellen ausgewiesen.',
      href: '/abstimmungen',
      tag: 'Interessenposition'
    }
  ];

  const mediaArticles: MediaArticle[] = [
    {
      title: 'Worum es bei der Nachhaltigkeitsinitiative politisch geht',
      medium: 'SRF',
      date: '2026-05-18',
      abstimmung: 'Nachhaltigkeitsinitiative',
      category: 'Überblick',
      description:
        'Ein kompakter Einstieg in Ziel, Mechanik und politische Streitpunkte der Initiative zur Bevölkerungsbegrenzung.',
      href: 'https://www.srf.ch/news/schweiz'
    },
    {
      title: 'Die wirtschaftlichen Folgen einer starren Bevölkerungsgrenze',
      medium: 'NZZ',
      date: '2026-05-14',
      abstimmung: 'Nachhaltigkeitsinitiative',
      category: 'Hintergrund',
      description:
        'Einordnung zu Arbeitsmarkt, Zuwanderung, Bilateralen und möglichen Zielkonflikten mit dem EU-Weg.',
      href: 'https://www.nzz.ch/schweiz'
    },
    {
      title: 'Warum Befürworter eine Begrenzung als Nachhaltigkeitspolitik sehen',
      medium: 'Watson',
      date: '2026-05-11',
      abstimmung: 'Nachhaltigkeitsinitiative',
      category: 'Pro-Argumente',
      description:
        'Zusammenfassung zentraler Argumente aus dem Ja-Lager, mit Fokus auf Infrastruktur, Wohnen und Ressourcen.',
      href: 'https://www.watson.ch/schweiz'
    },
    {
      title: 'Was Gegner an der 10-Millionen-Grenze kritisieren',
      medium: '20 Minuten',
      date: '2026-05-09',
      abstimmung: 'Nachhaltigkeitsinitiative',
      category: 'Contra-Argumente',
      description:
        'Überblick über Einwände zu Umsetzbarkeit, Fachkräften, internationalen Abkommen und Sicherheit.',
      href: 'https://www.20min.ch/schweiz'
    },
    {
      title: 'Zivildienstgesetz: Die Reform in sechs Punkten',
      medium: 'SRF',
      date: '2026-05-16',
      abstimmung: 'Zivildienstgesetz',
      category: 'Überblick',
      description:
        'Erklärt die geplanten Zulassungshürden und weshalb Bundesrat und Parlament die Anpassung unterstützen.',
      href: 'https://www.srf.ch/news/schweiz'
    },
    {
      title: 'Armeebestand, Gewissensentscheid und Zivildienst im Konflikt',
      medium: 'NZZ',
      date: '2026-05-12',
      abstimmung: 'Zivildienstgesetz',
      category: 'Hintergrund',
      description:
        'Analyse der institutionellen Spannung zwischen Wehrpflicht, Armeebestand und zivilem Ersatzdienst.',
      href: 'https://www.nzz.ch/schweiz'
    },
    {
      title: 'Welche Parteien beim Zivildienstgesetz wie argumentieren',
      medium: 'Watson',
      date: '2026-05-10',
      abstimmung: 'Zivildienstgesetz',
      category: 'Parteienreaktionen',
      description:
        'Vergleich der Parolen und Begründungen wichtiger Bundesparteien zur Vorlage.',
      href: 'https://www.watson.ch/schweiz'
    },
    {
      title: 'Faktencheck: Wie stark belasten Wechsel in den Zivildienst die Armee?',
      medium: '20 Minuten',
      date: '2026-05-07',
      abstimmung: 'Zivildienstgesetz',
      category: 'Faktencheck',
      description:
        'Ordnet häufig genannte Zahlen zu Wechseln, Diensttagen und Armeebestand ein.',
      href: 'https://www.20min.ch/schweiz'
    },
    {
      title: 'E-ID nach der Abstimmung: Was sich für Bürgerinnen und Bürger ändert',
      medium: 'SRF',
      date: '2025-09-29',
      abstimmung: 'E-ID-Gesetz',
      category: 'Hintergrund',
      description:
        'Einordnung zu Datenschutz, staatlicher Infrastruktur und praktischen Folgen der angenommenen Vorlage.',
      href: 'https://www.srf.ch/news/schweiz'
    },
    {
      title: 'Klimafonds-Initiative: Warum das Nein so deutlich ausfiel',
      medium: 'NZZ',
      date: '2026-03-09',
      abstimmung: 'Klimafonds-Initiative',
      category: 'Überblick',
      description:
        'Analyse des Resultats, der Kostenargumente und der politischen Nachwirkungen.',
      href: 'https://www.nzz.ch/schweiz'
    }
  ];

  const filters: MediaFilter[] = [
    'Alle',
    'Pro Abstimmung',
    'Überblick',
    'Hintergrund',
    'Pro-Argumente',
    'Contra-Argumente',
    'Faktencheck',
    'Parteienreaktionen'
  ];

  let activeFilter: MediaFilter = 'Alle';

  $: filteredArticles =
    activeFilter === 'Alle' || activeFilter === 'Pro Abstimmung'
      ? mediaArticles
      : mediaArticles.filter((article) => article.category === activeFilter);

  $: groupedByVote = Array.from(
    filteredArticles.reduce((groups, article) => {
      const current = groups.get(article.abstimmung) ?? [];
      current.push(article);
      groups.set(article.abstimmung, current);
      return groups;
    }, new Map<string, MediaArticle[]>())
  );

  const methodItems = [
    'Offizielle Quellen werden für neutrale Zusammenfassungen priorisiert.',
    'Parteiquellen zeigen politische Positionen und werden klar als Interessenpositionen markiert.',
    'Medienberichte dienen als ergänzende Perspektive, nicht als amtliche Grundlage.',
    'Die aktuellen Medienkarten sind manuelle Seed-Daten für den Prototypen, keine Live-News-API.'
  ];

  function formatArticleDate(date: string): string {
    return new Intl.DateTimeFormat('de-CH', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date));
  }
</script>

<svelte:head>
  <title>Quellen &amp; Medienberichte – Voting Assistant</title>
  <meta
    name="description"
    content="Offizielle Quellen, Parteipositionen, Medienberichte und Methodik des AI Swiss Voting Assistant."
  />
</svelte:head>

<section class="container-app pt-8 md:pt-14 pb-16">
  <div class="sources-hero">
    <p class="section-eyebrow mb-2">Transparenz & Einordnung</p>
    <h1 class="font-display text-3xl md:text-5xl text-ink mb-4">Quellen &amp; Medienberichte</h1>
    <p class="text-ink-muted text-base md:text-lg leading-relaxed max-w-3xl">
      Offizielle Quellen bilden die Grundlage unserer neutralen Zusammenfassungen. Medienberichte bieten ergänzende Perspektiven zu aktuellen Abstimmungen.
    </p>
  </div>

  <section class="source-section">
    <div class="source-section-head">
      <div>
        <p class="section-eyebrow mb-1">1. Amtliche Grundlage</p>
        <h2 class="source-section-title">Offizielle Originalquellen</h2>
      </div>
      <span class="source-pill">Basis für Zusammenfassungen</span>
    </div>

    <div class="source-grid">
      {#each officialSources as source}
        <a href={source.href} target="_blank" rel="noopener" class="source-card">
          <span class="source-card-tag">{source.tag}</span>
          <h3>{source.title}</h3>
          <p>{source.description}</p>
          <span class="source-card-link">Quelle öffnen →</span>
        </a>
      {/each}
    </div>
  </section>

  <section class="source-section">
    <div class="source-section-head">
      <div>
        <p class="section-eyebrow mb-1">2. Interessenpositionen</p>
        <h2 class="source-section-title">Parteipositionen</h2>
      </div>
      <span class="source-pill source-pill-muted">Nicht neutral, aber relevant</span>
    </div>

    <div class="party-source-panel">
      {#each partySources as source}
        <a href={source.href} class="party-source-card">
          <span>{source.tag}</span>
          <strong>{source.title}</strong>
          <p>{source.description}</p>
        </a>
      {/each}
    </div>
  </section>

  <section class="source-section" id="medienberichte">
    <div class="source-section-head media-head">
      <div>
        <p class="section-eyebrow mb-1">3. Ergänzende Perspektiven</p>
        <h2 class="source-section-title">Medienberichte nach Abstimmung</h2>
      </div>
      <p class="media-disclaimer">
        Medienberichte sind redaktionelle Einordnungen und keine offiziellen Quellen.
      </p>
    </div>

    <div class="prototype-notice">
      <strong>Prototyp-Hinweis:</strong>
      <span>
        Die Medienkarten sind aktuell manuelle Seed-Daten zur Darstellung des Workflows. Für die Finalabgabe sollten sie durch verifizierte echte Artikel mit Originaltitel, Originaldatum und direktem Link ersetzt werden.
      </span>
    </div>

    <div class="media-tabs" aria-label="Medienberichte filtern">
      {#each filters as filter}
        <button
          type="button"
          class:active={activeFilter === filter}
          on:click={() => (activeFilter = filter)}
        >
          {filter}
        </button>
      {/each}
    </div>

    {#if activeFilter === 'Pro Abstimmung'}
      <div class="media-groups">
        {#each groupedByVote as [vote, articles]}
          <section class="media-group">
            <div class="media-group-title">
              <h3>{vote}</h3>
              <span>{articles.length} Beiträge</span>
            </div>
            <div class="media-grid">
              {#each articles as article}
                <article class="media-card">
                  <div class="media-card-top">
                    <span class="media-medium">{article.medium}</span>
                    <span class="media-category">{article.category}</span>
                  </div>
                  <h4>{article.title}</h4>
                  <p>{article.description}</p>
                  <div class="media-meta">
                    <span>{formatArticleDate(article.date)}</span>
                    <span>{article.abstimmung}</span>
                  </div>
                  <a href={article.href} target="_blank" rel="noopener" class="media-link">Medienseite öffnen →</a>
                </article>
              {/each}
            </div>
          </section>
        {/each}
      </div>
    {:else}
      <div class="media-grid">
        {#each filteredArticles as article}
          <article class="media-card">
            <div class="media-card-top">
              <span class="media-medium">{article.medium}</span>
              <span class="media-category">{article.category}</span>
            </div>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <div class="media-meta">
              <span>{formatArticleDate(article.date)}</span>
              <span>{article.abstimmung}</span>
            </div>
            <a href={article.href} target="_blank" rel="noopener" class="media-link">Medienseite öffnen →</a>
          </article>
        {/each}
      </div>
    {/if}
  </section>

  <section class="source-section">
    <div class="source-section-head">
      <div>
        <p class="section-eyebrow mb-1">4. Nachvollziehbarkeit</p>
        <h2 class="source-section-title">Methodik &amp; Transparenz</h2>
      </div>
      <span class="source-pill">Prototyp-Stand</span>
    </div>

    <div class="method-panel">
      {#each methodItems as item}
        <div class="method-item">
          <span aria-hidden="true">✓</span>
          <p>{item}</p>
        </div>
      {/each}
    </div>

    <div class="transparency-note">
      <h3>KI-Einsatz transparent gemacht</h3>
      <p>
        Diese App nutzt KI-unterstützte Verdichtung für verständliche Briefings. Offizielle Quellen bleiben die Grundlage; Parteiquellen und Medienberichte werden separat ausgewiesen, damit politische Interessen und journalistische Einordnung nicht vermischt werden.
      </p>
    </div>
  </section>

  <p class="text-center text-xs text-ink-subtle mt-12">
    Version 1.0 · Mai 2026 ·
    <a href="https://github.com/adinho11-git/voting-assistant" target="_blank" rel="noopener" class="source-link">
      Open Source auf GitHub
    </a>
  </p>
</section>

<style>
  .sources-hero {
    border-left: 4px solid var(--brand);
    padding-left: clamp(1rem, 2vw, 1.5rem);
    margin-bottom: clamp(2rem, 4vw, 3rem);
  }

  .source-section {
    margin-top: clamp(2rem, 4vw, 3rem);
  }

  .source-section-head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1.5rem;
    border-bottom: 1px solid var(--border-light);
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }

  .source-section-title {
    color: var(--text);
    font-family: 'Fraunces', Georgia, serif;
    font-size: clamp(1.5rem, 2.4vw, 2.15rem);
    font-weight: 800;
    line-height: 1.1;
  }

  .source-pill {
    border: 1px solid color-mix(in srgb, var(--brand) 36%, var(--border-light));
    border-radius: var(--radius-full);
    background: var(--brand-soft);
    color: var(--brand);
    font-family: 'IBM Plex Mono', ui-monospace, monospace;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    padding: 0.45rem 0.75rem;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .source-pill-muted {
    background: var(--surface-alt);
    border-color: var(--border-light);
    color: var(--text-muted);
  }

  .source-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .source-card,
  .party-source-card,
  .media-card,
  .transparency-note {
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: var(--surface);
    box-shadow: var(--shadow-sm);
  }

  .source-card {
    display: grid;
    gap: 0.7rem;
    padding: 1.1rem;
    transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
  }

  .source-card:hover {
    border-color: color-mix(in srgb, var(--brand) 28%, var(--border));
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  .source-card-tag,
  .media-category {
    width: fit-content;
    border-radius: var(--radius-full);
    background: var(--surface-alt);
    color: var(--text-muted);
    font-family: 'IBM Plex Mono', ui-monospace, monospace;
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    padding: 0.28rem 0.55rem;
    text-transform: uppercase;
  }

  .source-card h3,
  .media-card h3,
  .media-card h4,
  .transparency-note h3 {
    color: var(--text);
    font-family: 'Fraunces', Georgia, serif;
    font-weight: 800;
    line-height: 1.15;
  }

  .source-card h3 {
    font-size: 1.2rem;
  }

  .source-card p,
  .party-source-card p,
  .media-card p,
  .transparency-note p,
  .method-item p,
  .media-disclaimer {
    color: var(--text-muted);
    line-height: 1.6;
  }

  .source-card p,
  .party-source-card p,
  .media-card p {
    font-size: 0.94rem;
  }

  .source-card-link,
  .media-link {
    color: var(--brand);
    font-size: 0.9rem;
    font-weight: 800;
  }

  .party-source-panel {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .party-source-card {
    display: grid;
    gap: 0.45rem;
    border-left: 4px solid var(--brand);
    padding: 1rem;
  }

  .party-source-card span {
    color: var(--brand);
    font-family: 'IBM Plex Mono', ui-monospace, monospace;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .party-source-card strong {
    color: var(--text);
    font-size: 1rem;
  }

  .media-head {
    align-items: flex-start;
  }

  .media-disclaimer {
    max-width: 360px;
    font-size: 0.9rem;
    text-align: right;
  }

  .media-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0 1.25rem;
  }

  .prototype-notice {
    display: flex;
    gap: 0.65rem;
    align-items: flex-start;
    border: 1px solid color-mix(in srgb, var(--brand) 22%, var(--border-light));
    border-left: 4px solid var(--brand);
    border-radius: var(--radius);
    background: var(--brand-soft);
    color: var(--text);
    font-size: 0.92rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    padding: 0.85rem 1rem;
  }

  .prototype-notice strong {
    color: var(--brand);
    white-space: nowrap;
  }

  .media-tabs button {
    border: 1px solid var(--border-light);
    border-radius: var(--radius-full);
    background: var(--surface);
    color: var(--text-muted);
    font-weight: 800;
    padding: 0.55rem 0.85rem;
    transition: background 160ms ease, border-color 160ms ease, color 160ms ease, transform 160ms ease;
  }

  .media-tabs button:hover {
    border-color: var(--brand);
    color: var(--brand);
    transform: translateY(-1px);
  }

  .media-tabs button.active {
    border-color: var(--brand);
    background: var(--brand);
    color: white;
  }

  .media-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .media-card {
    display: grid;
    gap: 0.85rem;
    padding: 1rem;
  }

  .media-card-top,
  .media-meta,
  .media-group-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .media-medium {
    color: var(--text);
    font-family: 'IBM Plex Mono', ui-monospace, monospace;
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: 0.04em;
  }

  .media-card h3,
  .media-card h4 {
    font-size: 1.18rem;
  }

  .media-meta {
    border-top: 1px solid var(--border-light);
    color: var(--text-subtle);
    font-family: 'IBM Plex Mono', ui-monospace, monospace;
    font-size: 0.72rem;
    padding-top: 0.75rem;
  }

  .media-groups {
    display: grid;
    gap: 1.5rem;
  }

  .media-group {
    display: grid;
    gap: 0.85rem;
  }

  .media-group-title h3 {
    color: var(--text);
    font-family: 'Fraunces', Georgia, serif;
    font-size: 1.35rem;
    font-weight: 800;
  }

  .media-group-title span {
    color: var(--text-muted);
    font-family: 'IBM Plex Mono', ui-monospace, monospace;
    font-size: 0.78rem;
  }

  .method-panel {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
  }

  .method-item {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: var(--surface);
    padding: 1rem;
  }

  .method-item span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.4rem;
    height: 1.4rem;
    flex: 0 0 auto;
    border-radius: 999px;
    background: var(--pro);
    color: white;
    font-size: 0.85rem;
    font-weight: 900;
  }

  .transparency-note {
    margin-top: 1rem;
    padding: 1.25rem;
  }

  .transparency-note h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 900px) {
    .source-section-head,
    .media-card-top,
    .media-meta,
    .media-group-title {
      align-items: flex-start;
      flex-direction: column;
      gap: 0.5rem;
    }

    .media-disclaimer {
      max-width: none;
      text-align: left;
    }

    .source-grid,
    .party-source-panel,
    .media-grid,
    .method-panel {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .media-tabs button {
      flex: 1 1 auto;
    }
  }
</style>
