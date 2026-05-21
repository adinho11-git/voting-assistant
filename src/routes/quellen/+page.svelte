<script lang="ts">
  const sources = [
    ['Bundeskanzlei (admin.ch)', 'Abstimmungsbüchlein · offiziell', 'https://www.admin.ch'],
    ['Initiativtexte (vollständig)', 'Originalwortlaute der Vorlagen', 'https://www.bk.admin.ch'],
    ['Parteien-Argumentarien', 'SP · GP · GLP · Mitte · FDP · SVP', '#'],
    ['Studien & Gutachten', 'BFE · BAFU · Seco · Wirtschaftsverbände', 'https://www.bafu.admin.ch']
  ] as const;

  const faqs = [
    [
      'Wie neutral ist die KI-Zusammenfassung?',
      'Die KI-Zusammenfassung basiert auf offiziellen Dokumenten und ist darauf ausgelegt, Argumente aller Seiten gleichwertig darzustellen. Es werden keine eigenen politischen Wertungen eingebracht. Jede Aussage ist mit der Originalquelle verlinkt.'
    ],
    [
      'Wer steht hinter dieser App?',
      'Diese App wurde als studentischer Prototyp im Rahmen des ZHAW Prototyping-Moduls (FS 2026) entwickelt. Sie ist kein kommerzielles Produkt und verfolgt keine politische Agenda.'
    ],
    [
      'Werden meine Daten gespeichert?',
      'Persönliche Stimmen werden ausschliesslich lokal in deinem Browser (LocalStorage) gespeichert. Community-Aggregate werden anonym in einer Datenbank gezählt — ohne Personenbezug.'
    ],
    [
      'Kann ich Fehler melden?',
      'Ja — bitte melde Fehler oder inhaltliche Ungenauigkeiten via GitHub Issues. Den Link findest du unten.'
    ]
  ] as const;
</script>

<svelte:head>
  <title>Quellen &amp; Transparenz – Voting Assistant</title>
  <meta name="description" content="Quellen, Methodik und FAQ — wie der AI Swiss Voting Assistant Abstimmungen neutral aufbereitet." />
</svelte:head>

<section class="container-read pt-8 md:pt-14 pb-10">
  <p class="section-eyebrow mb-2">Transparenz</p>
  <h1 class="font-display text-3xl md:text-4xl text-ink mb-4">Quellen &amp; Methodik</h1>
  <p class="text-ink-muted text-base md:text-lg leading-relaxed mb-10">
    Wir arbeiten ausschliesslich mit offiziellen, öffentlich zugänglichen Quellen. Die KI fasst diese neutral zusammen — ohne politische Wertung oder eigene Meinung.
  </p>

  <h2 class="font-display text-xl text-ink mb-4 border-b border-border-light pb-2">Verwendete Originalquellen</h2>
  <div class="space-y-2 mb-12">
    {#each sources as [title, sub, href]}
      <a {href} target="_blank" rel="noopener" class="card card-interactive p-4 flex items-center gap-4 group">
        <div class="w-9 h-9 rounded-lg bg-surface-alt flex items-center justify-center flex-shrink-0">
          <svg class="w-4 h-4 text-ink-muted" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div class="flex-1">
          <p class="font-semibold text-sm text-ink group-hover:text-brand transition-colors">{title}</p>
          <p class="text-xs text-ink-muted">{sub}</p>
        </div>
        <svg class="w-4 h-4 text-ink-subtle" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    {/each}
  </div>

  <h2 class="font-display text-xl text-ink mb-4 border-b border-border-light pb-2">Häufige Fragen</h2>
  <div class="space-y-2 mb-12">
    {#each faqs as [q, a]}
      <details class="card p-4 group">
        <summary class="font-semibold text-sm text-ink cursor-pointer list-none flex justify-between items-center">
          {q}
          <svg class="w-4 h-4 text-ink-subtle transition-transform group-open:rotate-180" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <p class="text-sm text-ink-muted leading-relaxed mt-3">{a}</p>
      </details>
    {/each}
  </div>

  <div class="card p-6 text-center">
    <p class="font-display text-lg text-ink mb-2">KI-Einsatz transparent gemacht</p>
    <p class="text-sm text-ink-muted leading-relaxed max-w-xl mx-auto">
      Diese App wurde unter intensivem Einsatz von Claude (Anthropic) als Code-Assistent entwickelt. Alle KI-generierten Inhalte wurden von Hand geprüft und mit Quellen belegt. Im README findest du eine vollständige Deklaration des KI-Einsatzes.
    </p>
  </div>

  <p class="text-center text-xs text-ink-subtle mt-10">
    Version 1.0 · Mai 2026 ·
    <a href="https://github.com/adinho11-git/voting-assistant" target="_blank" rel="noopener" class="source-link">Open Source auf GitHub</a>
  </p>
</section>
