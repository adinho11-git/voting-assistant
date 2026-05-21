<script lang="ts">
  import type { PageData } from './$types';
  import AbstimmungCard from '$lib/components/AbstimmungCard.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import { formatDate } from '$lib/mockData';

  export let data: PageData;
</script>

<svelte:head>
  <title>Voting Assistant – Schweizer Abstimmungen neutral verstehen</title>
  <meta name="description" content="Interaktiver politischer Orientierungsassistent für Schweizer Abstimmungen und Parteien — Briefings, Pro/Contra, Partei-Kompass, persönliches Voting-Journal." />
  <meta property="og:title" content="AI Swiss Voting Assistant" />
  <meta property="og:description" content="Schweizer Abstimmungen neutral verstehen — KI-gestützt, quellenbasiert, interaktiv." />
  <meta property="og:type" content="website" />
</svelte:head>

<!-- HERO -->
<section class="container-app pt-8 md:pt-14 pb-8 md:pb-12">
  <div class="hero-accent mb-8 max-w-3xl">
    <p class="section-eyebrow mb-3">Eidgenössische Volksabstimmung · 14. Juni 2026</p>
    <h1 class="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ink mb-4">
      Abstimmungen<br />neutral verstehen.
    </h1>
    <p class="text-base md:text-lg text-ink-muted leading-relaxed mb-5">
      Interaktiver politischer Orientierungsassistent für Schweizer Abstimmungen und Parteien — KI-gestützte Briefings, Pro/Contra mit Originalquellen, Partei-Kompass und persönliches Voting-Journal.
    </p>

    {#if data.daysUntil > 0}
      <div class="flex items-baseline gap-3 mb-6">
        <span class="font-mono-data text-3xl md:text-4xl font-medium text-brand">{data.daysUntil}</span>
        <span class="font-mono-data text-xs uppercase tracking-wider text-ink-muted">
          Tage bis zur nächsten Abstimmung
        </span>
      </div>
    {/if}

    <div class="flex flex-wrap gap-3">
      <a href="/abstimmungen" class="btn-primary">
        Alle Abstimmungen
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
      <a href="/kompass" class="btn-secondary">Partei-Kompass starten</a>
    </div>
  </div>

  <!-- 2-card hero with both upcoming votes -->
  {#if data.upcoming.length > 0}
    <div class="grid md:grid-cols-2 gap-5">
      {#each data.upcoming as a}
        <AbstimmungCard abstimmung={a} featured={true} />
      {/each}
    </div>
  {/if}
</section>

<!-- HOW IT WORKS -->
<section class="container-app pb-12 md:pb-16">
  <div class="border-t border-border-light pt-12">
    <div class="max-w-3xl mb-10">
      <p class="section-eyebrow mb-2">Persönlicher Voting-Workflow</p>
      <h2 class="font-display text-3xl md:text-4xl text-ink mb-3">In drei Minuten zur informierten Stimme.</h2>
      <p class="text-ink-muted">
        Der Voting Assistant ist kein Ersatz für das Abstimmungsbüchlein, sondern dein Einstieg: schnell, neutral, interaktiv.
      </p>
    </div>

    <div class="grid md:grid-cols-4 gap-5">
      {#each [
        { n: '1', t: 'Briefing lesen', d: 'KI-Zusammenfassung der Vorlage in drei Minuten. Alle Argumente mit Originalquelle hinterlegt.' },
        { n: '2', t: 'Pro &amp; Contra abwägen', d: 'Argumente mit Quellen-Datum und Verlinkung. Direkter Vergleich der Gegenseite.' },
        { n: '3', t: 'Position speichern', d: 'JA, NEIN oder UNENTSCHIEDEN, mit persönlicher Notiz — alles lokal in deinem Browser.' },
        { n: '4', t: 'Vergleichen', d: 'Wie liegen Bundesrat, Parlament, Parteien, Community? Bei vergangenen Vorlagen: Endresultat.' }
      ] as step}
        <div class="card p-5 md:p-6">
          <p class="font-mono-data text-2xl font-medium text-brand mb-3">{step.n}</p>
          <h3 class="font-display text-lg text-ink mb-2">{step.t}</h3>
          <p class="text-sm text-ink-muted leading-relaxed">{@html step.d}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- METHODOLOGY -->
<section class="container-app pb-12 md:pb-16">
  <div class="card p-6 md:p-10">
    <div class="grid md:grid-cols-3 gap-8 md:gap-10">
      <div>
        <p class="section-eyebrow mb-3">Quellen-basiert</p>
        <h3 class="font-display text-xl text-ink mb-2">admin.ch first</h3>
        <p class="text-sm text-ink-muted leading-relaxed">
          Bundesrat-Empfehlungen, Initiativtexte und Abstimmungsbüchlein stammen direkt von admin.ch und bk.admin.ch. Jede Aussage ist mit Originallink und Datum versehen.
        </p>
      </div>
      <div>
        <p class="section-eyebrow mb-3">KI-gestützt</p>
        <h3 class="font-display text-xl text-ink mb-2">Neutral zusammengefasst</h3>
        <p class="text-sm text-ink-muted leading-relaxed">
          Texte werden mit Claude (Anthropic) verdichtet — von Hand auf Genauigkeit geprüft und mit der jeweiligen Originalquelle verlinkt. Pro/Contra werden gleichgewichtig dargestellt.
        </p>
      </div>
      <div>
        <p class="section-eyebrow mb-3">Interaktiv</p>
        <h3 class="font-display text-xl text-ink mb-2">Deine Meinung zählt</h3>
        <p class="text-sm text-ink-muted leading-relaxed">
          Stimme ab, schreib eine Notiz, vergleiche dich mit der Community, finde im Kompass-Quiz heraus, welche Partei dir am nächsten steht.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- VERGANGENE — KONTEXT -->
{#if data.past.length > 0}
  <section class="container-app pb-12 md:pb-16">
    <div class="flex items-end justify-between mb-5 border-b border-border-light pb-3 flex-wrap gap-3">
      <div>
        <p class="section-eyebrow mb-1">Kontext &amp; Resultate</p>
        <h2 class="font-display text-2xl md:text-3xl text-ink">Letzte eidgenössische Abstimmungen</h2>
      </div>
      <a href="/abstimmungen" class="text-sm font-semibold text-brand hover:text-brand-dark">Alle Vergangenen →</a>
    </div>

    <div class="grid md:grid-cols-3 gap-5">
      {#each data.past as a}
        {#if a.result}
          <a href="/abstimmungen/{a.slug}" class="card card-interactive p-5" style="border-left: 4px solid {a.result.accepted ? 'var(--pro)' : 'var(--contra)'};">
            <div class="flex items-center gap-2 mb-2 flex-wrap">
              <span class="font-mono-data text-[10px] text-ink-muted uppercase tracking-wider">{formatDate(a.date)}</span>
              <span class="{a.result.accepted ? 'badge-ja' : 'badge-nein'}" style="font-size:9px;">
                {a.result.accepted ? 'JA' : 'NEIN'}
              </span>
            </div>
            <h3 class="font-display text-base text-ink leading-snug mb-3">{a.shortTitle}</h3>
            <div class="result-bar mb-1.5">
              <div class="bar-ja" style="width: {a.result.jaPercent}%;" />
              <div class="bar-nein" style="width: {100 - a.result.jaPercent}%;" />
            </div>
            <div class="flex justify-between text-xs font-mono-data font-semibold">
              <span class="text-pro">JA {a.result.jaPercent.toFixed(1)}%</span>
              <span class="text-contra">NEIN {(100 - a.result.jaPercent).toFixed(1)}%</span>
            </div>
          </a>
        {/if}
      {/each}
    </div>
  </section>
{/if}

<!-- FAQ + TRANSPARENCY -->
<section class="container-app pb-20">
  <div class="grid md:grid-cols-2 gap-6">
    <div class="card p-6 md:p-8">
      <p class="section-eyebrow mb-3">FAQ</p>
      <h3 class="font-display text-xl text-ink mb-4">Häufige Fragen</h3>
      <div class="space-y-2">
        {#each [
          ['Werden meine Daten gespeichert?', 'Persönliche Stimmen und Notizen liegen ausschliesslich lokal in deinem Browser. Anonyme JA/NEIN-Zähler werden auf dem Server aggregiert — ohne Personenbezug.'],
          ['Wie neutral ist die KI-Zusammenfassung?', 'Texte basieren auf admin.ch und werden manuell auf Genauigkeit geprüft. Pro/Contra werden gleichgewichtig dargestellt; jede Aussage ist verlinkt.'],
          ['Wer steht hinter dieser App?', 'Studentischer Prototyp im Modul Prototyping (ZHAW FS 2026). Kein kommerzielles Produkt, keine politische Agenda.'],
          ['Kann ich Fehler melden?', 'Ja — bitte via GitHub Issues melden. Link unten auf der Quellen-Seite.']
        ] as [q, a]}
          <details class="border-b border-border-light pb-2 group">
            <summary class="font-semibold text-sm text-ink cursor-pointer list-none flex justify-between items-center py-2">
              {q}
              <svg class="w-4 h-4 text-ink-subtle transition-transform group-open:rotate-180" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p class="text-sm text-ink-muted leading-relaxed pb-2">{a}</p>
          </details>
        {/each}
      </div>
    </div>

    <div class="card p-6 md:p-8" style="background: var(--brand-light); border-color: rgba(200,16,46,0.2);">
      <p class="section-eyebrow mb-3">Transparenz</p>
      <h3 class="font-display text-xl text-ink mb-4">KI-Einsatz in dieser App</h3>
      <ul class="space-y-3 text-sm text-ink leading-relaxed">
        <li class="flex gap-2"><span aria-hidden="true">·</span><span><strong>Code-Assistent:</strong> Entwickelt mit Claude Opus 4.7. Alle Architektur-Entscheidungen, Datenmodelle und Inhalte wurden manuell verifiziert.</span></li>
        <li class="flex gap-2"><span aria-hidden="true">·</span><span><strong>Inhalte:</strong> Zusammenfassungen basieren auf admin.ch / bk.admin.ch (Stand 21. Mai 2026). KI strukturiert, ein Mensch prüft.</span></li>
        <li class="flex gap-2"><span aria-hidden="true">·</span><span><strong>Was die KI <em>nicht</em> macht:</strong> Wertet politische Positionen nicht, erfindet keine Quellen, generiert keine Resultate. Bei demo-Inhalten ist das klar gelabelt.</span></li>
      </ul>
      <div class="mt-5 pt-4 border-t border-border-light">
        <a href="/quellen" class="text-sm font-semibold text-brand hover:text-brand-dark">Vollständige Methodik &amp; Quellen →</a>
      </div>
    </div>
  </div>
</section>
