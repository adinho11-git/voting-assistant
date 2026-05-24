<script lang="ts">
  import type { PageData } from './$types';
  import { fade, fly } from 'svelte/transition';
  import { calculateMatches, type MatchResult } from '$lib/kompass';
  import { PARTEIEN } from '$lib/parteiData';
  import { kompassStore } from '$lib/stores/kompass';
  import { showToast } from '$lib/stores/toast';
  import { goto } from '$app/navigation';

  type CompassPoint = {
    kuerzel: MatchResult['kuerzel'];
    name: string;
    x: number;
    y: number;
    color: string;
    match?: number;
  };

  type UserCompassPoint = Omit<CompassPoint, 'kuerzel' | 'match'> & {
    kuerzel: 'Du';
  };

  export let data: PageData;

  let currentStep = 0; // 0 = intro, 1..N = fragen, N+1 = resultat
  let answers: Record<string, number> = {};
  let results: MatchResult[] = [];
  let expandedExplanation = false;

  $: totalQuestions = data.fragen.length;
  $: progress = currentStep === 0 ? 0 : Math.min(100, Math.round((currentStep / totalQuestions) * 100));
  $: currentFrage = currentStep > 0 && currentStep <= totalQuestions ? data.fragen[currentStep - 1] : null;
  $: currentAnswer = currentFrage ? answers[currentFrage.id] ?? 3 : 3;
  $: answeredCount = Object.keys(answers).length;
  $: skippedCount = Math.max(0, currentStep - 1 - answeredCount);

  // Ableitungen für die Ergebnis-Erklärung (keine neue Berechnung)
  $: top = results[0];
  $: second = results[1];
  $: breakdown = top?.topicBreakdown ?? [];
  $: topStrengths = breakdown.slice(0, Math.min(3, breakdown.length));
  $: topDifferences = breakdown.length >= 6 ? [...breakdown].slice(-3).reverse() : [];
  $: isClose = top && second ? top.match - second.match <= 5 : false;
  $: hasSkipped = skippedCount > 0;
  $: compassPartyPoints = PARTEIEN
    .filter((p) => isValidCompassValue(p.spektrumLR) && isValidCompassValue(p.spektrumUW))
    .map((p) => ({
      kuerzel: p.kuerzel,
      name: p.name,
      x: p.spektrumLR,
      y: p.spektrumUW,
      color: p.farbe,
      match: results.find((r) => r.kuerzel === p.kuerzel)?.match
    }));
  $: hasCompassData = compassPartyPoints.length === PARTEIEN.length;
  $: userCompassPoint = hasCompassData ? buildUserCompassPoint(results, compassPartyPoints) : null;

  function setAnswer(value: number): void {
    if (!currentFrage) return;
    answers = { ...answers, [currentFrage.id]: value };
  }

  function skip(): void {
    if (!currentFrage) return;
    // Allow user to advance without answering; remove existing answer
    const next = { ...answers };
    delete next[currentFrage.id];
    answers = next;
    advance(false);
  }

  function advance(countNeutralDefault = true): void {
    let nextAnswers = answers;

    if (countNeutralDefault && currentFrage && nextAnswers[currentFrage.id] === undefined) {
      nextAnswers = { ...nextAnswers, [currentFrage.id]: 3 };
      answers = nextAnswers;
    }

    if (currentStep < totalQuestions) {
      currentStep += 1;
    } else if (currentStep === totalQuestions) {
      results = calculateMatches(nextAnswers);
      kompassStore.save(nextAnswers, results);
      currentStep += 1;
    }
  }

  function back(): void {
    if (currentStep > 0) currentStep -= 1;
    expandedExplanation = false;
  }

  function start(): void {
    currentStep = 1;
  }

  function restart(): void {
    answers = {};
    results = [];
    currentStep = 0;
    expandedExplanation = false;
    kompassStore.clear();
  }

  function adjust(): void {
    // Go back to first question to allow review/adjustment
    currentStep = 1;
  }

  const labels = ['Stimme gar nicht zu', 'Eher dagegen', 'Neutral', 'Eher zu', 'Stimme voll zu'];
  const compassEdgePadding = 6;

  function isValidCompassValue(value: number): boolean {
    return Number.isFinite(value) && value >= 0 && value <= 100;
  }

  function compassCssPosition(value: number): number {
    return Math.min(100 - compassEdgePadding, Math.max(compassEdgePadding, value));
  }

  function buildUserCompassPoint(matches: MatchResult[], points: CompassPoint[]): UserCompassPoint | null {
    const matchByParty = new Map(matches.map((m) => [m.kuerzel, Math.max(0, m.match)]));
    const matchValues = Array.from(matchByParty.values());
    const lowestMatch = matchValues.length > 0 ? Math.min(...matchValues) : 0;
    const weightedPoints = points
      .map((point) => {
        const match = matchByParty.get(point.kuerzel) ?? 0;
        const relativeMatch = Math.max(0, match - lowestMatch);
        return { point, weight: relativeMatch > 0 ? relativeMatch * relativeMatch : 0 };
      })
      .filter(({ weight }) => weight > 0);
    const totalWeight = weightedPoints.reduce((sum, { weight }) => sum + weight, 0);

    if (totalWeight <= 0) {
      const fallbackPoints = points
        .map((point) => ({ point, weight: matchByParty.get(point.kuerzel) ?? 0 }))
        .filter(({ weight }) => weight > 0);
      const fallbackWeight = fallbackPoints.reduce((sum, { weight }) => sum + weight, 0);

      if (fallbackWeight <= 0) return null;

      return {
        kuerzel: 'Du',
        name: 'Vereinfachte Näherungsposition',
        x: fallbackPoints.reduce((sum, { point, weight }) => sum + point.x * weight, 0) / fallbackWeight,
        y: fallbackPoints.reduce((sum, { point, weight }) => sum + point.y * weight, 0) / fallbackWeight,
        color: 'var(--brand)'
      };
    }

    return {
      kuerzel: 'Du',
      name: 'Vereinfachte Näherungsposition',
      x: weightedPoints.reduce((sum, { point, weight }) => sum + point.x * weight, 0) / totalWeight,
      y: weightedPoints.reduce((sum, { point, weight }) => sum + point.y * weight, 0) / totalWeight,
      color: 'var(--brand)'
    };
  }
</script>

<svelte:head>
  <title>Partei-Kompass – Voting Assistant</title>
  <meta name="description" content="18 realistische Schweizer Szenarien zu Migration, Klima, Wirtschaft, Sozialpolitik, EU, Sicherheit, Gesundheit, Mobilität, Bildung und Wohnen — finde deine politische Nähe." />
</svelte:head>

<section class="container-read pt-10 md:pt-16 pb-20">
  {#if currentStep === 0}
    <!-- INTRO -->
    <div in:fade={{ duration: 250 }}>
      <p class="section-eyebrow mb-3">Partei-Kompass · {totalQuestions} Fragen</p>
      <h1 class="font-display text-4xl md:text-5xl text-ink leading-tight mb-4">
        Wo liegt deine politische Nähe?
      </h1>
      <p class="text-base md:text-lg text-ink-muted leading-relaxed mb-8 max-w-2xl">
        Beantworte {totalQuestions} realistische Schweizer Szenario-Fragen aus 10 Themenbereichen — von Migration und Klima bis Wohnen und EU-Politik. Wir berechnen, welchen Parteipositionen deine Antworten inhaltlich näher liegen, und zeigen pro Themenbereich, wo Nähe oder Distanz entsteht.
      </p>

      <div class="card p-6 mb-8" style="background: var(--brand-light); border-color: rgba(200,16,46,0.2);">
        <p class="text-sm text-ink leading-relaxed mb-3">
          <strong class="font-semibold">So funktioniert's:</strong>
        </p>
        <ul class="text-sm text-ink leading-relaxed space-y-1.5 list-disc ml-5">
          <li>Pro Frage wählst du auf einer 5-Stufen-Skala (1 = stimme gar nicht zu, 5 = stimme voll zu)</li>
          <li>Du kannst Fragen überspringen — sie zählen dann nicht für deinen Match</li>
          <li>Am Ende siehst du ein Nähe-Ranking + Themenbereiche, in denen deine Antworten den Parteipositionen näher liegen</li>
          <li>Du kannst deine Antworten anpassen oder als persönliche Positionen speichern</li>
        </ul>
      </div>

      <button type="button" on:click={start} class="btn-primary text-base w-full sm:w-auto">
        Quiz starten
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  {:else if currentStep <= totalQuestions && currentFrage}
    <!-- FRAGE -->
    {#key currentStep}
      <div in:fly={{ y: 16, duration: 220 }}>
        <!-- Progress -->
        <div class="mb-6">
          <div class="flex justify-between text-xs font-mono-data text-ink-muted uppercase tracking-wider mb-2">
            <span>Frage {currentStep} von {totalQuestions} · {currentFrage.topicLabel}</span>
            <span>{progress}%</span>
          </div>
          <div class="h-1.5 bg-surface-alt rounded-full overflow-hidden">
            <div
              class="h-full bg-brand rounded-full transition-all duration-300"
              style="width: {progress}%;"
            />
          </div>
        </div>

        <p class="section-eyebrow mb-3">{currentFrage.topicLabel}</p>
        <p class="text-sm text-ink-muted leading-relaxed mb-4 italic">
          Kontext: {currentFrage.scenario}
        </p>
        <h2 class="font-display text-2xl md:text-3xl text-ink leading-snug mb-8">
          «{currentFrage.question}»
        </h2>

        <div class="card p-6 md:p-8 mb-6">
          <div class="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-2 text-xs font-mono-data text-ink-muted uppercase tracking-wider mb-4">
            <span class="text-left leading-tight">Stimme gar nicht zu</span>
            <span class="text-center leading-tight">Neutral</span>
            <span class="text-right leading-tight">Stimme voll zu</span>
          </div>

          <!-- Click-based 5-button scale -->
          <div class="flex justify-between gap-1.5 mb-4">
            {#each [1, 2, 3, 4, 5] as i}
              <button
                type="button"
                on:click={() => setAnswer(i)}
                class="flex-1 py-3 rounded-lg border-2 transition-all font-mono-data text-base font-bold {currentAnswer === i ? 'bg-brand text-white border-brand shadow-card' : 'bg-surface text-ink border-border hover:border-brand hover:text-brand'}"
                aria-label="Antwort {i}: {labels[i - 1]}"
              >
                {i}
              </button>
            {/each}
          </div>

          <p class="text-center text-sm font-semibold text-ink mb-4">
            {labels[currentAnswer - 1]}
          </p>

          <!-- Hidden range as fallback -->
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            bind:value={currentAnswer}
            on:input={(e) => setAnswer(parseInt(e.currentTarget.value, 10))}
            class="slider-vote"
            aria-label="Zustimmung zur Aussage"
          />
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div class="flex w-full sm:w-auto gap-2">
            <button type="button" on:click={back} class="btn-ghost" disabled={currentStep === 1}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Zurück
            </button>
            <button type="button" on:click={skip} class="text-sm text-ink-muted underline hover:text-ink">
              Überspringen
            </button>
          </div>
          <button
            type="button"
            on:click={() => advance()}
            class="btn-primary w-full sm:w-auto"
          >
            {currentStep === totalQuestions ? 'Ergebnis anzeigen' : 'Weiter'}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    {/key}
  {:else}
    <!-- RESULTAT -->
    <div in:fade={{ duration: 300 }}>
      <p class="section-eyebrow mb-2">Deine Orientierung · {answeredCount} von {totalQuestions} Fragen beantwortet{skippedCount > 0 ? ' (' + skippedCount + ' übersprungen)' : ''}</p>
      <h1 class="font-display text-3xl md:text-4xl text-ink leading-tight mb-3">
        Deine stärkste politische Nähe: <span style="color: {top?.color};">{top?.kuerzel}</span>
      </h1>
      <p class="text-sm text-ink-muted mb-3 max-w-2xl">
        Der Partei-Kompass zeigt politische Nähe auf Basis der beantworteten Fragen. Das Ergebnis ist eine Orientierung, keine Wahl- oder Abstimmungsempfehlung und keine Prognose.
      </p>
      <p class="text-ink-muted mb-6">
        Nähe-Wert: <span class="font-mono-data text-2xl font-medium text-ink">{top?.match}%</span>
      </p>

      <!-- Warum dieses Ergebnis? -->
      <div class="card p-6 md:p-7 mb-6" style="background: var(--brand-light); border-color: rgba(200,16,46,0.2);">
        <p class="section-eyebrow mb-3">Warum dieses Ergebnis?</p>
        {#if topStrengths.length > 0}
          <p class="text-sm text-ink leading-relaxed mb-2">
            <strong class="font-semibold">Stärkste Themen-Nähe</strong> zur {top?.kuerzel}:
            {#each topStrengths as t, i}<span>{t.topicLabel} <span class="font-mono-data text-ink-muted">({t.match}%)</span>{i < topStrengths.length - 1 ? ', ' : ''}</span>{/each}.
          </p>
        {/if}
        {#if topDifferences.length > 0}
          <p class="text-sm text-ink leading-relaxed mb-2">
            <strong class="font-semibold">Grösste inhaltliche Distanz</strong>:
            {#each topDifferences as t, i}<span>{t.topicLabel} <span class="font-mono-data text-ink-muted">({t.match}%)</span>{i < topDifferences.length - 1 ? ', ' : ''}</span>{/each}.
          </p>
        {/if}
        {#if hasSkipped}
          <p class="text-sm text-ink-muted leading-relaxed mb-2">
            Übersprungene Fragen wurden nicht gewertet ({skippedCount} von {totalQuestions}).
          </p>
        {/if}
        {#if isClose && second}
          <p class="text-sm text-ink-muted leading-relaxed">
            Hinweis: Die ersten Parteien liegen nah beieinander ({top?.kuerzel} {top?.match}% · {second.kuerzel} {second.match}%) – das Ergebnis zeigt eine Tendenz, keine eindeutige Zuordnung.
          </p>
        {/if}
      </div>

      {#if hasCompassData && userCompassPoint}
        <!-- 2D compass -->
        <div class="card p-6 md:p-8 mb-6">
          <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
            <div>
              <p class="section-eyebrow mb-2">2D-Partei-Kompass</p>
              <h2 class="font-display text-2xl text-ink leading-tight">Deine politische Nähe im 2D-Kompass</h2>
              <p class="text-sm text-ink-muted leading-relaxed mt-2">
                Vereinfachte Einordnung deiner Antworten im Verhältnis zu den Parteien.
              </p>
            </div>
            <p class="text-xs text-ink-muted md:text-right max-w-xs leading-relaxed">
              vereinfachte Orientierung, keine Wahlempfehlung
            </p>
          </div>

          <div
            class="compass-frame"
            role="img"
            aria-label="Vereinfachter Partei-Kompass mit Links-Rechts-Modellachse und Umwelt-Wirtschaft-Modellachse"
          >
            <div class="compass-axis compass-axis-x" aria-hidden="true" />
            <div class="compass-axis compass-axis-y" aria-hidden="true" />
            <span class="compass-axis-label compass-label-left">Modellachse: eher links</span>
            <span class="compass-axis-label compass-label-right">Modellachse: eher rechts</span>
            <span class="compass-axis-label compass-label-top">Modellachse: Umwelt / Staat</span>
            <span class="compass-axis-label compass-label-bottom">Modellachse: Wirtschaft / weniger Staat</span>

            {#each compassPartyPoints as point (point.kuerzel)}
              <div
                class="compass-point party-point"
                class:isTop={point.kuerzel === top?.kuerzel}
                style="left: {compassCssPosition(point.x)}%; top: {compassCssPosition(100 - point.y)}%; --point-color: {point.color};"
                aria-label="{point.name}: Links-Rechts {Math.round(point.x)}, Umwelt-Wirtschaft {Math.round(point.y)}"
                title={point.match === undefined ? point.name : `${point.name} · Nähe ${point.match}%`}
              >
                <span class="compass-dot" aria-hidden="true" />
                <span class="compass-point-label">{point.kuerzel}</span>
              </div>
            {/each}

            <div
              class="compass-point user-point"
              style="left: {compassCssPosition(userCompassPoint.x)}%; top: {compassCssPosition(100 - userCompassPoint.y)}%; --point-color: {userCompassPoint.color};"
              aria-label="Deine abgeleitete Nähe: Links-Rechts-Modellachse {Math.round(userCompassPoint.x)}, Umwelt-Wirtschaft-Modellachse {Math.round(userCompassPoint.y)}"
              title="Deine abgeleitete Nähe"
            >
              <span class="compass-dot" aria-hidden="true" />
              <span class="compass-point-label">Du</span>
            </div>
          </div>

          <div class="compass-legend" aria-label="Legende">
            <span class="compass-legend-item user-legend">
              <span class="legend-dot" aria-hidden="true" />
              Diamant = deine abgeleitete Nähe
            </span>
            <span class="compass-legend-item party-shape-legend">
              <span class="legend-dot" aria-hidden="true" />
              Kreise = Parteien
            </span>
          </div>

          <div class="compass-party-key" aria-label="Parteifarben">
            {#each compassPartyPoints as point (point.kuerzel)}
              <span class="compass-legend-item" style="--point-color: {point.color};">
                <span class="legend-dot" aria-hidden="true" />
                {point.kuerzel}
              </span>
            {/each}
          </div>

          <p class="text-xs text-ink-muted leading-relaxed mt-4">
            Der Punkt zeigt eine aus dem Matching abgeleitete Näherungsposition. Das Ranking bleibt die genauere Auswertung. Keine Wahlempfehlung.
          </p>
        </div>
      {/if}

      <!-- Ranking -->
      <div class="card p-6 md:p-8 mb-6">
        <p class="section-eyebrow mb-2">Nähe-Ranking</p>
        <p class="text-xs text-ink-muted leading-relaxed mb-4">
          Prozentwerte sind Vergleichswerte aus deinen Antworten – kein absolutes Urteil über eine Partei.
        </p>
        <div class="space-y-3">
          {#each results as r, i}
            <div class="flex items-center gap-3" in:fly={{ y: 10, duration: 300, delay: i * 80 }}>
              <span class="font-mono-data text-xs font-semibold text-ink-muted w-4 text-right">{i + 1}.</span>
              <div
                class="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold"
                style="background: {r.color};"
                aria-hidden="true"
              >
                {r.kuerzel.slice(0, 4)}
              </div>
              <div class="flex-1">
                <div class="match-bar">
                  <div class="match-bar-fill" style="width: {Math.max(r.match, 4)}%; background: {r.color};">
                    {r.match}%
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Topic breakdown -->
      <div class="card p-6 md:p-8 mb-6">
        <p class="section-eyebrow mb-4">Themen-Nähe zu {top?.kuerzel}</p>
        <p class="text-sm text-ink-muted mb-4">
          So nah liegen deine Antworten der <strong>{top?.kuerzel}</strong> pro Themenbereich:
        </p>
        <div class="space-y-2.5">
          {#each breakdown as t}
            <div class="flex items-center gap-3">
              <span class="text-sm text-ink w-32">{t.topicLabel}</span>
              <div class="flex-1 community-bar" style="height: 10px;">
                <div class="bar-ja" style="width: {t.match}%;" />
              </div>
              <span class="font-mono-data text-xs text-ink-muted w-10 text-right">{t.match}%</span>
            </div>
          {/each}
        </div>

        {#if topStrengths.length > 0 || topDifferences.length > 0}
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-5 border-t" style="border-color: var(--border-light);">
            {#if topStrengths.length > 0}
              <div>
                <p class="text-xs font-semibold uppercase tracking-wider text-ink mb-2">Stärkste Übereinstimmungen</p>
                <ul class="space-y-1.5">
                  {#each topStrengths as t}
                    <li class="flex justify-between gap-2 text-sm">
                      <span class="text-ink">{t.topicLabel}</span>
                      <span class="font-mono-data text-ink-muted">{t.match}%</span>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
            {#if topDifferences.length > 0}
              <div>
                <p class="text-xs font-semibold uppercase tracking-wider text-ink mb-2">Grösste Unterschiede</p>
                <ul class="space-y-1.5">
                  {#each topDifferences as t}
                    <li class="flex justify-between gap-2 text-sm">
                      <span class="text-ink">{t.topicLabel}</span>
                      <span class="font-mono-data text-ink-muted">{t.match}%</span>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </div>
        {/if}
      </div>

      <!-- Explanation -->
      <details class="card p-5 mb-6" bind:open={expandedExplanation}>
        <summary class="font-semibold text-sm text-brand cursor-pointer">Wie wird die Nähe berechnet?</summary>
        <p class="text-sm text-ink leading-relaxed mt-3">
          Deine Antworten sind auf einer 1–5-Skala kodiert (1 = volle Ablehnung der Aussage, 5 = volle Zustimmung). Für den Vergleich werden sie mit den Parteipositionen auf dieselbe Richtung gebracht. Pro Frage wird die absolute Differenz berechnet — 0 ergibt 100% Nähe, 4 ergibt 0% Nähe. Übersprungene Fragen werden nicht gewichtet. Der Endwert ist der Durchschnitt über alle beantworteten Fragen. Die Themen-Aufstellung zeigt denselben Durchschnitt pro Themenbereich.
        </p>
        <p class="text-xs text-ink-muted mt-3">
          Die Parteipositionen basieren auf publizierten Parolen, Parteiprogrammen und Abstimmungsverhalten im Nationalrat. Sie wurden für diesen Prototyp manuell kalibriert und sind eine vereinfachte Modellierung – keine offizielle Parteiposition.
        </p>
      </details>

      <!-- Actions: beide gleichwertig, Reflexions-CTA zuerst -->
      <div class="flex flex-col sm:flex-row gap-3 mb-3">
        <button type="button" on:click={adjust} class="btn-primary flex-1 text-center">
          Antworten überprüfen / anpassen
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v6h6M20 20v-6h-6M4 20l6-6M20 4l-6 6" />
          </svg>
        </button>
        <a href="/parteien/{top?.kuerzel.toLowerCase()}" class="btn-primary flex-1 text-center" style="background: {top?.color};">
          Mehr über die {top?.kuerzel} erfahren
        </a>
      </div>
      <p class="text-xs text-ink-muted text-center mb-6">
        Dein Ergebnis lässt sich jederzeit anpassen – probier andere Antworten und sieh, wie sich die Nähe verschiebt.
      </p>

      <div class="flex flex-col sm:flex-row gap-3">
        <button type="button" on:click={restart} class="btn-ghost flex-1">
          Quiz neu starten
        </button>
        <button type="button" on:click={() => goto('/profil')} class="btn-ghost flex-1">
          Profil ansehen
        </button>
      </div>

      <p class="text-sm text-ink-muted text-center mt-8 max-w-2xl mx-auto leading-relaxed">
        Der Kompass dient der politischen Orientierung und ersetzt keine persönliche Prüfung der Parteipositionen. Er ist keine Wahlempfehlung und keine Prognose.
      </p>
      <p class="text-xs text-ink-subtle text-center mt-3">
        Ergebnis wird lokal in deinem Browser gespeichert und im Profil angezeigt. Keine Übermittlung an einen Server.
      </p>
    </div>
  {/if}
</section>

<style>
  .compass-frame {
    position: relative;
    height: clamp(300px, 46vw, 420px);
    overflow: hidden;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background:
      linear-gradient(to right, color-mix(in srgb, var(--border-light) 70%, transparent) 1px, transparent 1px),
      linear-gradient(to bottom, color-mix(in srgb, var(--border-light) 70%, transparent) 1px, transparent 1px),
      color-mix(in srgb, var(--surface-alt) 72%, var(--surface));
    background-size: 25% 100%, 100% 25%, auto;
  }

  .compass-axis {
    position: absolute;
    background: color-mix(in srgb, var(--text-muted) 38%, transparent);
    pointer-events: none;
  }

  .compass-axis-x {
    left: 0;
    right: 0;
    top: 50%;
    height: 1px;
  }

  .compass-axis-y {
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
  }

  .compass-axis-label {
    position: absolute;
    z-index: 1;
    padding: 3px 7px;
    border: 1px solid color-mix(in srgb, var(--border-light) 76%, transparent);
    border-radius: var(--radius);
    background: color-mix(in srgb, var(--surface) 88%, transparent);
    color: var(--text-muted);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.68rem;
    font-weight: 700;
    line-height: 1.15;
    text-transform: uppercase;
    pointer-events: none;
  }

  .compass-label-left {
    left: 10px;
    bottom: 10px;
    max-width: 130px;
  }

  .compass-label-right {
    right: 10px;
    bottom: 10px;
    max-width: 130px;
    text-align: right;
  }

  .compass-label-top {
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
    text-align: center;
  }

  .compass-label-bottom {
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
    text-align: center;
  }

  .compass-point {
    position: absolute;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transform: translate(-50%, -50%);
  }

  .compass-dot {
    width: 14px;
    height: 14px;
    flex: 0 0 auto;
    border: 2px solid var(--surface);
    border-radius: var(--radius-full);
    background: var(--point-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.22);
  }

  .party-point.isTop {
    z-index: 3;
  }

  .party-point.isTop .compass-dot {
    width: 18px;
    height: 18px;
    box-shadow:
      0 0 0 4px color-mix(in srgb, var(--point-color) 18%, transparent),
      0 4px 12px rgba(0, 0, 0, 0.24);
  }

  .compass-point-label {
    max-width: 76px;
    padding: 3px 6px;
    overflow: hidden;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: color-mix(in srgb, var(--surface) 90%, transparent);
    color: var(--text);
    font-size: 0.72rem;
    font-weight: 800;
    line-height: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .user-point {
    z-index: 4;
  }

  .user-point .compass-dot {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    background: var(--brand);
    box-shadow:
      0 0 0 5px color-mix(in srgb, var(--brand) 18%, transparent),
      0 4px 14px rgba(0, 0, 0, 0.26);
    transform: rotate(45deg);
  }

  .user-point .compass-point-label {
    color: var(--brand);
    border-color: color-mix(in srgb, var(--brand) 30%, var(--border-light));
  }

  .compass-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 12px;
    margin-top: 14px;
  }

  .compass-party-key {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 12px;
    margin-top: 10px;
  }

  .compass-legend-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--text-muted);
    font-size: 0.78rem;
    font-weight: 700;
    line-height: 1;
  }

  .legend-dot {
    width: 10px;
    height: 10px;
    border-radius: var(--radius-full);
    background: var(--point-color);
  }

  .user-legend {
    color: var(--text);
  }

  .user-legend .legend-dot {
    border-radius: 3px;
    background: var(--brand);
    transform: rotate(45deg);
  }

  .party-shape-legend {
    color: var(--text);
  }

  .party-shape-legend .legend-dot {
    background: var(--text-muted);
  }

  @media (max-width: 520px) {
    .compass-frame {
      height: 320px;
    }

    .compass-axis-label {
      max-width: 118px;
      font-size: 0.58rem;
    }

    .compass-label-top,
    .compass-label-bottom {
      max-width: 150px;
    }

    .compass-point {
      gap: 4px;
    }

    .compass-point-label {
      max-width: 58px;
      padding: 3px 5px;
      font-size: 0.64rem;
    }
  }
</style>
