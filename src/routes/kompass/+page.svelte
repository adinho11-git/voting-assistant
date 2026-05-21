<script lang="ts">
  import type { PageData } from './$types';
  import { fade, fly } from 'svelte/transition';
  import { calculateMatches, type MatchResult } from '$lib/kompass';
  import { kompassStore } from '$lib/stores/kompass';
  import { showToast } from '$lib/stores/toast';
  import { goto } from '$app/navigation';

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
    advance();
  }

  function advance(): void {
    if (currentStep < totalQuestions) {
      currentStep += 1;
    } else if (currentStep === totalQuestions) {
      results = calculateMatches(answers);
      kompassStore.save(answers, results);
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

  const labels = ['Stimme voll zu', 'Eher zu', 'Neutral', 'Eher dagegen', 'Stimme gar nicht zu'];
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
        Welche Partei passt zu dir?
      </h1>
      <p class="text-base md:text-lg text-ink-muted leading-relaxed mb-8 max-w-2xl">
        Beantworte {totalQuestions} realistische Schweizer Szenario-Fragen aus 10 Themenbereichen — von Migration und Klima bis Wohnen und EU-Politik. Wir berechnen, welche der sechs grossen Parteien deinen Positionen am nächsten kommt, und zeigen pro Themenbereich, wo es Übereinstimmungen gibt.
      </p>

      <div class="card p-6 mb-8" style="background: var(--brand-light); border-color: rgba(200,16,46,0.2);">
        <p class="text-sm text-ink leading-relaxed mb-3">
          <strong class="font-semibold">So funktioniert's:</strong>
        </p>
        <ul class="text-sm text-ink leading-relaxed space-y-1.5 list-disc ml-5">
          <li>Pro Frage wählst du auf einer 5-Stufen-Skala (1 = stimme voll zu, 5 = stimme gar nicht zu)</li>
          <li>Du kannst Fragen überspringen — sie zählen dann nicht für deinen Match</li>
          <li>Am Ende siehst du ein Ranking + die Themenbereiche, in denen du mit jeder Partei am stärksten übereinstimmst</li>
          <li>Du kannst deine Antworten anpassen oder als persönliche Positionen speichern</li>
        </ul>
      </div>

      <button type="button" on:click={start} class="btn-primary text-base">
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
          <div class="grid grid-cols-3 text-xs font-mono-data text-ink-muted uppercase tracking-wider mb-4">
            <span class="text-left">Stimme voll zu</span>
            <span class="text-center">Neutral</span>
            <span class="text-right">Stimme gar nicht zu</span>
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

        <div class="flex justify-between items-center flex-wrap gap-2">
          <div class="flex gap-2">
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
            on:click={advance}
            class="btn-primary"
            disabled={answers[currentFrage.id] === undefined && currentStep === 1}
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
      <p class="section-eyebrow mb-2">Dein Ergebnis · {answeredCount} von {totalQuestions} Fragen beantwortet{skippedCount > 0 ? ' (' + skippedCount + ' übersprungen)' : ''}</p>
      <h1 class="font-display text-3xl md:text-4xl text-ink leading-tight mb-3">
        Du stimmst am ähnlichsten wie die <span style="color: {results[0]?.color};">{results[0]?.kuerzel}</span> ab.
      </h1>
      <p class="text-ink-muted mb-2">
        Übereinstimmung: <span class="font-mono-data text-2xl font-medium text-ink">{results[0]?.match}%</span>
      </p>
      {#if results[0]?.topicHighlight}
        <p class="text-sm text-ink-muted mb-8">
          Besonders nahe bei <strong>{results[0].topicHighlight.label}</strong>.
        </p>
      {/if}

      <!-- Ranking -->
      <div class="card p-6 md:p-8 mb-6">
        <p class="section-eyebrow mb-4">Übereinstimmungs-Ranking</p>
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
        <p class="section-eyebrow mb-4">Topic-Breakdown — {results[0]?.kuerzel}</p>
        <p class="text-sm text-ink-muted mb-4">
          So nah bist du der <strong>{results[0]?.kuerzel}</strong> in jedem Themenbereich:
        </p>
        <div class="space-y-2.5">
          {#each results[0]?.topicBreakdown ?? [] as t}
            <div class="flex items-center gap-3">
              <span class="text-sm text-ink w-32">{t.topicLabel}</span>
              <div class="flex-1 community-bar" style="height: 10px;">
                <div class="bar-ja" style="width: {t.match}%;" />
              </div>
              <span class="font-mono-data text-xs text-ink-muted w-10 text-right">{t.match}%</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Explanation -->
      <details class="card p-5 mb-6" bind:open={expandedExplanation}>
        <summary class="font-semibold text-sm text-brand cursor-pointer">Wie wird die Übereinstimmung berechnet?</summary>
        <p class="text-sm text-ink leading-relaxed mt-3">
          Sowohl deine Antworten als auch die Parteipositionen sind auf einer 1–5-Skala kodiert (1 = volle Zustimmung zur Aussage, 5 = volle Ablehnung). Pro Frage wird die absolute Differenz berechnet — 0 ergibt 100% Match, 4 ergibt 0% Match. Übersprungene Fragen werden nicht gewichtet. Der Endwert ist der Durchschnitt über alle beantworteten Fragen. Die Themen-Breakdown zeigt denselben Durchschnitt pro Themenbereich.
        </p>
        <p class="text-xs text-ink-muted mt-3">
          Die Parteipositionen basieren auf publizierten Wahlempfehlungen, Parteiprogrammen und Abstimmungsverhalten im Nationalrat. Sie wurden für diesen Prototyp manuell kalibriert.
        </p>
      </details>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-3 mb-6">
        <a href="/parteien/{results[0]?.kuerzel.toLowerCase()}" class="btn-primary flex-1 text-center" style="background: {results[0]?.color};">
          Mehr über die {results[0]?.kuerzel} erfahren
        </a>
        <button type="button" on:click={adjust} class="btn-secondary flex-1">
          Antworten überprüfen / anpassen
        </button>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <button type="button" on:click={restart} class="btn-ghost flex-1">
          Quiz neu starten
        </button>
        <button type="button" on:click={() => goto('/profil')} class="btn-ghost flex-1">
          Profil ansehen
        </button>
      </div>

      <p class="text-xs text-ink-subtle text-center mt-8">
        Ergebnis wird lokal in deinem Browser gespeichert und im Profil angezeigt. Keine Übermittlung an einen Server.
      </p>
    </div>
  {/if}
</section>
