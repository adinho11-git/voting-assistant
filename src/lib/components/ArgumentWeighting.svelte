<script lang="ts">
  import type { Abstimmung, Argument, UserPosition } from '$lib/types';
  import {
    engagementStore,
    recordWeightSummary,
    saveJournalEntry,
    setArgumentWeight,
    type ArgumentSide,
    type ArgumentWeight
  } from '$lib/stores/engagement';
  import { setVote } from '$lib/stores/votes';
  import { showToast } from '$lib/stores/toast';

  export let abstimmung: Abstimmung;

  const weightOptions: Array<{ value: ArgumentWeight; label: string; short: string }> = [
    { value: 0, label: 'Nicht wichtig', short: '0' },
    { value: 1, label: 'Eher wichtig', short: '1' },
    { value: 2, label: 'Wichtig', short: '2' },
    { value: 3, label: 'Sehr wichtig', short: '3' }
  ];

  $: slugWeights = $engagementStore.weights[abstimmung.slug] ?? {};
  $: proScore = sumWeights(abstimmung.proArguments, 'pro');
  $: contraScore = sumWeights(abstimmung.contraArguments, 'contra');
  $: totalScore = proScore + contraScore;
  $: strongestScore = Math.max(proScore, contraScore);
  $: tendencyPercent = totalScore > 0 ? Math.round((strongestScore / totalScore) * 100) : 50;
  $: tendencyPosition = getTendency();
  $: visibleArguments = [...abstimmung.proArguments, ...abstimmung.contraArguments];
  $: weightedCount = visibleArguments.filter((argument) => getWeight(argument.id) > 0).length;
  $: statusText =
    totalScore === 0
      ? 'Tippe eine Argument-Karte an und gewichte, was dich wirklich bewegt.'
      : tendencyPosition === 'UNENTSCHIEDEN'
        ? 'Ausgeglichen: Pro und Contra sind für dich gleich stark.'
        : `Deine gewichtete Tendenz: ${tendencyPercent}% ${tendencyPosition}.`;

  function sumWeights(argumentsList: Argument[], side: ArgumentSide): number {
    return argumentsList.reduce((sum, argument) => {
      const current = slugWeights[argument.id];
      if (!current || current.side !== side) return sum;
      return sum + current.weight;
    }, 0);
  }

  function getWeight(argumentId: string): ArgumentWeight {
    return slugWeights[argumentId]?.weight ?? 0;
  }

  function getTendency(): UserPosition {
    if (totalScore === 0 || proScore === contraScore) return 'UNENTSCHIEDEN';
    return proScore > contraScore ? 'JA' : 'NEIN';
  }

  function setWeight(argumentId: string, side: ArgumentSide, weight: ArgumentWeight): void {
    setArgumentWeight(abstimmung.slug, argumentId, side, weight);
  }

  function weightLabel(argumentId: string): string {
    return weightOptions.find((option) => option.value === getWeight(argumentId))?.label ?? 'Nicht wichtig';
  }

  function cycleWeight(argumentId: string, side: ArgumentSide): void {
    const next = ((getWeight(argumentId) + 1) % 4) as ArgumentWeight;
    setWeight(argumentId, side, next);
  }

  function adjustWeight(argumentId: string, side: ArgumentSide, delta: number): void {
    const next = Math.min(3, Math.max(0, getWeight(argumentId) + delta)) as ArgumentWeight;
    setWeight(argumentId, side, next);
  }

  function setSideWeight(side: ArgumentSide, weight: ArgumentWeight): void {
    const argumentsList = side === 'pro' ? abstimmung.proArguments : abstimmung.contraArguments;
    for (const argument of argumentsList) {
      setWeight(argument.id, side, weight);
    }
  }

  function handleCardKeydown(event: KeyboardEvent, argumentId: string, side: ArgumentSide): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      cycleWeight(argumentId, side);
    } else if (event.key === 'ArrowRight' || event.key === '+') {
      event.preventDefault();
      adjustWeight(argumentId, side, 1);
    } else if (event.key === 'ArrowLeft' || event.key === '-') {
      event.preventDefault();
      adjustWeight(argumentId, side, -1);
    }
  }

  interface Column {
    side: ArgumentSide;
    label: string;
    icon: string;
    items: Argument[];
  }

  $: columns = [
    { side: 'pro', label: 'Pro', icon: '✓', items: abstimmung.proArguments },
    { side: 'contra', label: 'Contra', icon: '×', items: abstimmung.contraArguments }
  ] as Column[];

  function saveTendency(): void {
    if (totalScore === 0) {
      showToast('Gewichte zuerst mindestens ein Argument.', 'info');
      return;
    }

    const confidence = tendencyPosition === 'UNENTSCHIEDEN' ? 45 : Math.min(96, Math.max(52, tendencyPercent));
    setVote(abstimmung.slug, tendencyPosition);
    saveJournalEntry(
      abstimmung.slug,
      {
        position: tendencyPosition,
        confidence
      },
      {
        type: 'weights',
        title: 'Argumente gewichtet',
        detail: `${statusText} Bewertete Argumente: ${weightedCount}`
      }
    );
    recordWeightSummary(abstimmung.slug, 'Gewichtete Tendenz berechnet', statusText);
    showToast('Gewichtete Tendenz im Journal gespeichert.', 'success');
  }
</script>

<div class="weighting-shell">
  <div class="weighting-header">
    <div>
      <p class="section-eyebrow">Argumente gewichten</p>
      <h2 class="font-display text-2xl md:text-3xl text-ink">Welche Argumente tragen deine Entscheidung?</h2>
      <p>Tippe eine Karte an, erhöhe oder senke die Wichtigkeit und sieh sofort, wie sich deine Tendenz verändert.</p>
    </div>

    <div class="weighting-score" class:is-neutral={tendencyPosition === 'UNENTSCHIEDEN'} aria-live="polite">
      <span>{weightedCount} bewertet</span>
      <strong>{statusText}</strong>
      <div class="score-bar" aria-hidden="true">
        <i class="pro" style="width: {totalScore > 0 ? (proScore / totalScore) * 100 : 50}%"></i>
        <i class="contra" style="width: {totalScore > 0 ? (contraScore / totalScore) * 100 : 50}%"></i>
      </div>
      <button type="button" class="btn-primary" on:click={saveTendency}>Tendenz übernehmen</button>
    </div>
  </div>

  <div class="weighting-grid">
    {#each columns as column}
      <section class="weighting-column {column.side}">
        <div class="column-title">
          <span>{column.icon}</span>
          <h3>{column.label}</h3>
        </div>
        <div class="column-actions">
          <button type="button" on:click={() => setSideWeight(column.side, 2)}>{column.label} wichtig setzen</button>
          <button type="button" on:click={() => setSideWeight(column.side, 0)}>{column.label} zurücksetzen</button>
        </div>

        {#each column.items as argument (argument.id)}
          {@const weight = getWeight(argument.id)}
          <div
            class="weight-card"
            class:is-weighted={weight > 0}
            style="--impact: {weight};"
            role="button"
            tabindex="0"
            aria-label="Gewichtung für '{argument.text}' ändern. Aktuell: {weightLabel(argument.id)}. Klick erhöht die Wichtigkeit."
            aria-pressed={weight > 0}
            on:click={() => cycleWeight(argument.id, column.side)}
            on:keydown={(e) => handleCardKeydown(e, argument.id, column.side)}
          >
            <div class="weight-card-head">
              <div class="weight-card-text">
                <p>{argument.text}</p>
                <span class="tap-hint">Karte antippen: Wichtigkeit erhöhen · Pfeil ← / → fein justieren</span>
              </div>
              <div class="impact-orb" aria-hidden="true">
                <span>{weight}</span>
                <small>{weightLabel(argument.id)}</small>
              </div>
            </div>

            <a
              class="source-pill"
              href="/abstimmungen/{abstimmung.slug}/argumente/{argument.id}"
              on:click|stopPropagation
              on:keydown|stopPropagation
            >
              {argument.source} prüfen →
            </a>

            <!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-no-static-element-interactions -->
            <div class="weight-stepper" role="group" on:click|stopPropagation on:keydown|stopPropagation aria-label="Feineinstellung">
              <button
                type="button"
                on:click={() => adjustWeight(argument.id, column.side, -1)}
                disabled={weight === 0}
                aria-label="Wichtigkeit verringern"
              >−</button>
              <strong>{weightLabel(argument.id)}</strong>
              <button
                type="button"
                on:click={() => adjustWeight(argument.id, column.side, 1)}
                disabled={weight === 3}
                aria-label="Wichtigkeit erhöhen"
              >+</button>
            </div>

            <!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-no-static-element-interactions -->
            <div
              class="weight-controls"
              role="group"
              aria-label="Gewichtung wählen"
              on:click|stopPropagation
              on:keydown|stopPropagation
            >
              {#each weightOptions as option}
                <button
                  type="button"
                  class:active={weight === option.value}
                  class:zero={option.value === 0}
                  on:click={() => setWeight(argument.id, column.side, option.value)}
                  aria-label="{option.label} setzen"
                  aria-pressed={weight === option.value}
                >
                  <span>{option.short}</span>
                  {option.label}
                </button>
              {/each}
            </div>
          </div>
        {/each}
      </section>
    {/each}
  </div>
</div>

<style>
  .weighting-shell {
    padding: clamp(22px, 3vw, 34px);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-lg);
    background: var(--surface);
    box-shadow: var(--shadow-sm);
  }

  .weighting-header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(320px, 0.42fr);
    gap: 22px;
    align-items: stretch;
    margin-bottom: 22px;
  }

  .weighting-header p:not(.section-eyebrow) {
    max-width: 720px;
    color: var(--text-muted);
    line-height: 1.55;
    margin-top: 8px;
  }

  .weighting-score {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    padding: 18px;
    border-radius: var(--radius);
    color: white;
    background: linear-gradient(135deg, var(--pro), var(--contra));
  }

  .weighting-score.is-neutral {
    background: linear-gradient(135deg, var(--brand), color-mix(in srgb, var(--brand) 54%, #1a1a1a));
  }

  .weighting-score span {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    text-transform: uppercase;
    opacity: 0.78;
  }

  .weighting-score strong {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(22px, 2.2vw, 30px);
    line-height: 1.12;
  }

  .score-bar {
    display: flex;
    overflow: hidden;
    height: 10px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.18);
  }

  .score-bar i {
    display: block;
    height: 100%;
    transition: width 500ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .score-bar .pro { background: #34d399; }
  .score-bar .contra { background: #ff7a7a; }

  .weighting-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  .weighting-column {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 14px;
    border-radius: var(--radius);
    border: 1px solid var(--border-light);
    background: color-mix(in srgb, var(--surface-alt) 34%, var(--surface));
  }

  .weighting-column.pro { border-top: 4px solid var(--pro); }
  .weighting-column.contra { border-top: 4px solid var(--contra); }

  .column-title {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 2px 4px 8px;
    border-bottom: 1px solid var(--border-light);
  }

  .column-title span {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: 999px;
    color: white;
    font-weight: 900;
    background: var(--pro);
  }

  .contra .column-title span { background: var(--contra); }

  .column-title h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 24px;
    color: var(--text);
  }

  .column-actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  .column-actions button {
    min-height: 36px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: var(--surface);
    color: var(--text-muted);
    cursor: pointer;
    font-size: 12px;
    font-weight: 800;
    transition: transform 160ms ease, border-color 160ms ease, color 160ms ease, background 160ms ease;
  }

  .column-actions button:hover {
    transform: translateY(-1px);
    color: var(--brand);
    background: var(--brand-soft, var(--brand-light));
    border-color: color-mix(in srgb, var(--brand) 34%, var(--border-light));
  }

  /* The whole card is now a single interactive surface */
  .weight-card {
    position: relative;
    display: grid;
    gap: 12px;
    padding: 16px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: var(--surface);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.02);
    cursor: pointer;
    outline: none;
    transition:
      transform 190ms ease,
      border-color 190ms ease,
      box-shadow 190ms ease,
      background 190ms ease;
  }

  .weight-card::before {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: calc(4px + var(--impact, 0) * 2px);
    border-radius: var(--radius) 0 0 var(--radius);
    background: color-mix(in srgb, var(--brand) calc(var(--impact, 0) * 24%), transparent);
    transition: width 220ms ease, background 220ms ease;
    pointer-events: none;
  }

  .weight-card:hover,
  .weight-card.is-weighted {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--brand) 24%, var(--border-light));
    box-shadow: var(--shadow-md);
  }

  .weight-card.is-weighted {
    background:
      linear-gradient(90deg, color-mix(in srgb, var(--brand-soft, var(--brand-light)) calc(var(--impact, 0) * 18%), transparent), transparent 58%),
      var(--surface);
  }

  .weight-card:focus-visible {
    outline: 3px solid var(--brand);
    outline-offset: 3px;
  }

  .weight-card:active {
    transform: translateY(0);
    transition-duration: 80ms;
  }

  /* Head row: text + orb. Click anywhere on this region also cycles via card click. */
  .weight-card-head {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 14px;
    align-items: center;
    pointer-events: none; /* card-level handler fires instead */
  }

  .weight-card-text {
    min-width: 0;
  }

  .weight-card-text p {
    color: var(--text);
    line-height: 1.42;
  }

  .tap-hint {
    display: inline-flex;
    margin-top: 9px;
    color: var(--text-subtle);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  .impact-orb {
    display: grid;
    place-items: center;
    width: 82px;
    min-height: 74px;
    padding: 8px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: color-mix(in srgb, var(--surface-alt) 72%, var(--surface));
    text-align: center;
    transition: transform 190ms ease, background 190ms ease, border-color 190ms ease;
  }

  .weight-card:hover .impact-orb,
  .weight-card.is-weighted .impact-orb {
    transform: scale(1.03);
    border-color: color-mix(in srgb, var(--brand) 32%, var(--border-light));
    background: var(--brand-soft, var(--brand-light));
  }

  .impact-orb span {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: 999px;
    background: var(--surface);
    color: var(--brand);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 15px;
    font-weight: 900;
  }

  .impact-orb small {
    color: var(--text-muted);
    font-size: 10px;
    font-weight: 900;
    line-height: 1.15;
  }

  .source-pill {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: fit-content;
    padding: 4px 10px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--brand-soft, var(--brand-light)) 70%, transparent);
    color: var(--brand);
    font-weight: 700;
    font-size: 12px;
    text-decoration: none;
    cursor: pointer;
  }
  .source-pill:hover {
    background: color-mix(in srgb, var(--brand) 14%, var(--surface));
  }

  .weight-stepper {
    position: relative;
    display: grid;
    grid-template-columns: 42px minmax(0, 1fr) 42px;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border-radius: var(--radius);
    background: color-mix(in srgb, var(--surface-alt) 52%, var(--surface));
    cursor: default;
  }

  .weight-stepper button {
    display: grid;
    place-items: center;
    min-height: 38px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: var(--surface);
    color: var(--text);
    cursor: pointer;
    font-size: 20px;
    font-weight: 900;
    transition: transform 160ms ease, border-color 160ms ease, color 160ms ease, background 160ms ease;
  }

  .weight-stepper button:not(:disabled):hover {
    transform: translateY(-1px);
    color: var(--brand);
    border-color: color-mix(in srgb, var(--brand) 42%, var(--border-light));
    background: var(--brand-soft, var(--brand-light));
  }

  .weight-stepper button:disabled {
    cursor: not-allowed;
    opacity: 0.42;
  }

  .weight-stepper strong {
    color: var(--text);
    text-align: center;
    font-size: 13px;
  }

  .weight-controls {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 7px;
    cursor: default;
  }

  .weight-controls button {
    display: grid;
    place-items: center;
    gap: 4px;
    min-height: 58px;
    padding: 8px 6px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: var(--surface);
    color: var(--text-muted);
    cursor: pointer;
    font-size: 11px;
    font-weight: 800;
    transition: transform 160ms ease, border-color 160ms ease, background 160ms ease, color 160ms ease;
  }

  .weight-controls button:hover,
  .weight-controls button.active {
    transform: translateY(-1px);
    color: var(--brand);
    border-color: color-mix(in srgb, var(--brand) 42%, var(--border-light));
    background: var(--brand-soft, var(--brand-light));
  }

  .weight-controls button.active.zero {
    color: var(--text-muted);
    border-color: var(--border-light);
    background: color-mix(in srgb, var(--surface-alt) 54%, var(--surface));
  }

  .weight-controls span {
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
    border-radius: 999px;
    background: var(--surface-alt);
    color: var(--text);
    font-family: 'IBM Plex Mono', monospace;
  }

  @media (max-width: 980px) {
    .weighting-header,
    .weighting-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 560px) {
    .column-actions,
    .weight-controls {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .weight-card-head {
      grid-template-columns: 1fr;
    }

    .impact-orb {
      width: 100%;
      min-height: 58px;
      grid-template-columns: auto 1fr;
      justify-items: start;
      gap: 10px;
      display: grid;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .weight-card,
    .weight-card::before,
    .impact-orb,
    .weight-stepper button,
    .weight-controls button {
      transition: none;
    }
  }
</style>
