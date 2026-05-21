<script lang="ts">
  import type { PageData } from './$types';
  import { fade, fly } from 'svelte/transition';
  import { calculateMatches, type MatchResult } from '$lib/kompass';
  import { showToast } from '$lib/stores/toast';
  import { goto } from '$app/navigation';

  export let data: PageData;

  let currentStep = 0; // 0 = intro, 1..N = fragen, N+1 = resultat
  let answers: Record<string, number> = {};
  let results: MatchResult[] = [];

  $: totalQuestions = data.fragen.length;
  $: progress = currentStep === 0 ? 0 : Math.min(100, Math.round((currentStep / totalQuestions) * 100));
  $: currentFrage = currentStep > 0 && currentStep <= totalQuestions ? data.fragen[currentStep - 1] : null;
  $: currentAnswer = currentFrage ? answers[currentFrage.slug] ?? 3 : 3;

  function setAnswer(value: number): void {
    if (!currentFrage) return;
    answers = { ...answers, [currentFrage.slug]: value };
  }

  function next(): void {
    if (currentStep < totalQuestions) {
      currentStep += 1;
    } else if (currentStep === totalQuestions) {
      computeResults();
      currentStep += 1;
    }
  }

  function back(): void {
    if (currentStep > 0) currentStep -= 1;
  }

  function start(): void {
    currentStep = 1;
  }

  function restart(): void {
    answers = {};
    results = [];
    currentStep = 0;
  }

  function computeResults(): void {
    results = calculateMatches(data.abstimmungen, answers);
  }

  function saveAsPositions(): void {
    let savedCount = 0;
    if (typeof localStorage === 'undefined') return;
    let stored: Record<string, 'JA' | 'NEIN'> = {};
    try {
      const raw = localStorage.getItem('votes_v1');
      if (raw) stored = JSON.parse(raw) as Record<string, 'JA' | 'NEIN'>;
    } catch {
      stored = {};
    }
    for (const [slug, ans] of Object.entries(answers)) {
      if (ans < 3) {
        stored[slug] = 'JA';
        savedCount++;
      } else if (ans > 3) {
        stored[slug] = 'NEIN';
        savedCount++;
      }
    }
    try {
      localStorage.setItem('votes_v1', JSON.stringify(stored));
      // also push into svelte store for live UI
      import('$lib/stores/votes').then(({ votesStore }) => votesStore.set(stored));
      showToast(`${savedCount} Position${savedCount === 1 ? '' : 'en'} gespeichert. Schau dir dein Profil an!`, 'success');
    } catch {
      showToast('Konnte Positionen nicht speichern.', 'error');
    }
  }

  const labels = ['Stimme voll zu', 'Eher zu', 'Neutral', 'Eher dagegen', 'Stimme gar nicht zu'];
</script>

<svelte:head>
  <title>Partei-Kompass – Voting Assistant</title>
  <meta name="description" content="Finde in wenigen Minuten heraus, welche Schweizer Partei deinen politischen Positionen am nächsten steht — anhand aktueller Abstimmungsvorlagen." />
</svelte:head>

<section class="container-read pt-10 md:pt-16 pb-20">
  {#if currentStep === 0}
    <!-- INTRO -->
    <div in:fade={{ duration: 250 }}>
      <p class="section-eyebrow mb-3">Partei-Kompass</p>
      <h1 class="font-display text-4xl md:text-5xl text-ink leading-tight mb-4">
        Welche Partei passt zu dir?
      </h1>
      <p class="text-base md:text-lg text-ink-muted leading-relaxed mb-8 max-w-2xl">
        Beantworte {totalQuestions} Fragen zu aktuellen Abstimmungen. Wir berechnen, welche Schweizer Partei deinen Positionen am nächsten kommt — ohne Werbung, ohne Datenspeicherung beim Server.
      </p>

      <div class="card p-6 mb-8 bg-brand-light border-brand/20">
        <p class="text-sm text-ink leading-relaxed">
          <strong class="font-semibold">So funktioniert's:</strong> Pro Frage wählst du auf einer 5-Stufen-Skala, wie sehr du einer politischen Aussage zustimmst. Am Ende siehst du ein Ranking aller 6 Parteien — und kannst deine Antworten als persönliche Abstimmungspositionen speichern.
        </p>
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
        <div class="mb-8">
          <div class="flex justify-between text-xs font-mono-data text-ink-muted uppercase tracking-wider mb-2">
            <span>Frage {currentStep} von {totalQuestions}</span>
            <span>{progress}%</span>
          </div>
          <div class="h-1.5 bg-surface-alt rounded-full overflow-hidden">
            <div
              class="h-full bg-brand rounded-full transition-all duration-300"
              style="width: {progress}%;"
            />
          </div>
        </div>

        <p class="section-eyebrow mb-2">{currentFrage.shortTitle}</p>
        <h2 class="font-display text-2xl md:text-3xl text-ink leading-snug mb-8">
          «{currentFrage.question}»
        </h2>

        <div class="card p-6 md:p-8 mb-6">
          <div class="flex justify-between text-xs font-mono-data text-ink-muted uppercase tracking-wider mb-4">
            <span>{labels[0]}</span>
            <span class="hidden sm:inline">Neutral</span>
            <span>{labels[4]}</span>
          </div>

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

          <div class="flex justify-between mt-4">
            {#each [1, 2, 3, 4, 5] as i}
              <div class="flex flex-col items-center gap-1 text-xs font-mono-data text-ink-muted">
                <span class="w-6 h-6 rounded-full flex items-center justify-center font-bold {currentAnswer === i ? 'bg-brand text-white' : 'bg-surface-alt'}">{i}</span>
              </div>
            {/each}
          </div>

          <p class="text-center text-sm font-semibold text-ink mt-4">
            {labels[currentAnswer - 1]}
          </p>
        </div>

        <div class="flex justify-between items-center">
          <button type="button" on:click={back} class="btn-ghost" disabled={currentStep === 1}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Zurück
          </button>
          <button type="button" on:click={next} class="btn-primary">
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
      <p class="section-eyebrow mb-2">Dein Ergebnis</p>
      <h1 class="font-display text-3xl md:text-4xl text-ink leading-tight mb-3">
        Du stimmst am ähnlichsten wie die <span style="color: {results[0]?.color};">{results[0]?.kuerzel}</span> ab.
      </h1>
      <p class="text-ink-muted mb-8">
        Übereinstimmung: <span class="font-mono-data text-2xl font-medium text-ink">{results[0]?.match}%</span>
      </p>

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
                  <div
                    class="match-bar-fill"
                    style="width: {Math.max(r.match, 4)}%; background: {r.color};"
                  >
                    {r.match}%
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 mb-8">
        <a href="/parteien/{results[0]?.kuerzel.toLowerCase()}" class="btn-primary flex-1 text-center" style="background: {results[0]?.color};">
          Mehr über die {results[0]?.kuerzel} erfahren
        </a>
        <button type="button" on:click={saveAsPositions} class="btn-secondary flex-1">
          Antworten als Positionen speichern
        </button>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <button type="button" on:click={restart} class="btn-ghost flex-1">
          Quiz wiederholen
        </button>
        <button type="button" on:click={() => goto('/profil')} class="btn-ghost flex-1">
          Profil ansehen
        </button>
      </div>

      <p class="text-xs text-ink-subtle text-center mt-8">
        Berechnung: Score aus 1–5-Antworten verglichen mit offiziellen Parteipositionen ({totalQuestions} Vorlagen).
      </p>
    </div>
  {/if}
</section>
