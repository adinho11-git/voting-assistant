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

  interface Column {
    side: ArgumentSide;
    label: string;
    icon: string;
    items: Argument[];
  }

  interface WeightedReason {
    side: ArgumentSide;
    text: string;
    source: string;
    weight: ArgumentWeight;
  }

  $: slugWeights = $engagementStore.weights[abstimmung.slug] ?? {};
  $: proScore = sumWeights(slugWeights, abstimmung.proArguments, 'pro');
  $: contraScore = sumWeights(slugWeights, abstimmung.contraArguments, 'contra');
  $: totalScore = proScore + contraScore;
  $: strongestScore = Math.max(proScore, contraScore);
  $: tendencyPercent = totalScore > 0 ? Math.round((strongestScore / totalScore) * 100) : 50;
  $: tendencyPosition = computeTendency(proScore, contraScore);
  $: tendencyLabel = formatPosition(tendencyPosition);
  $: visibleArguments = [...abstimmung.proArguments, ...abstimmung.contraArguments];
  $: weightedCount = visibleArguments.filter((argument) => weightOf(slugWeights, argument.id) > 0).length;
  $: openArgumentCount = visibleArguments.length - weightedCount;
  $: topReasons = collectTopReasons(slugWeights, abstimmung);
  $: statusText =
    totalScore === 0
      ? 'Gewichte mindestens ein Argument, dann berechnet sich deine Tendenz.'
      : tendencyPosition === 'UNENTSCHIEDEN'
        ? 'Deine aktuelle Tendenz: Unsicher.'
        : `Deine aktuelle Tendenz: ${tendencyLabel}.`;
  $: scoreDetail =
    totalScore === 0
      ? 'Noch neutral: Pro und Contra sind für dich nicht gewichtet.'
      : `Pro ${proScore} zu Contra ${contraScore}. ${tendencyPercent}% der gewichteten Punkte liegen auf der stärkeren Seite.`;
  $: columns = [
    { side: 'pro', label: 'Pro', icon: '✓', items: abstimmung.proArguments },
    { side: 'contra', label: 'Contra', icon: '×', items: abstimmung.contraArguments }
  ] as Column[];

  function sumWeights(
    weights: Record<string, { side: ArgumentSide; weight: ArgumentWeight; updatedAt: string }>,
    argumentsList: Argument[],
    side: ArgumentSide
  ): number {
    return argumentsList.reduce((sum, argument) => {
      const current = weights[argument.id];
      if (!current || current.side !== side) return sum;
      return sum + current.weight;
    }, 0);
  }

  function weightOf(
    weights: Record<string, { side: ArgumentSide; weight: ArgumentWeight; updatedAt: string }>,
    argumentId: string
  ): ArgumentWeight {
    return (weights[argumentId]?.weight ?? 0) as ArgumentWeight;
  }

  function labelOf(weight: ArgumentWeight): string {
    return weightOptions.find((option) => option.value === weight)?.label ?? 'Nicht wichtig';
  }

  function computeTendency(pro: number, contra: number): UserPosition {
    if (pro + contra === 0 || pro === contra) return 'UNENTSCHIEDEN';
    return pro > contra ? 'JA' : 'NEIN';
  }

  function formatPosition(position: UserPosition): string {
    if (position === 'UNENTSCHIEDEN') return 'Unsicher';
    return position;
  }

  function sideLabel(side: ArgumentSide): string {
    return side === 'pro' ? 'Pro' : 'Contra';
  }

  function collectTopReasons(
    weights: Record<string, { side: ArgumentSide; weight: ArgumentWeight; updatedAt: string }>,
    vote: Abstimmung
  ): WeightedReason[] {
    const proReasons = vote.proArguments.map((argument) => toReason(argument, 'pro', weights));
    const contraReasons = vote.contraArguments.map((argument) => toReason(argument, 'contra', weights));
    return [...proReasons, ...contraReasons]
      .filter((reason) => reason.weight > 0)
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 2);
  }

  function toReason(
    argument: Argument,
    side: ArgumentSide,
    weights: Record<string, { side: ArgumentSide; weight: ArgumentWeight; updatedAt: string }>
  ): WeightedReason {
    return {
      side,
      text: argument.text,
      source: argument.source,
      weight: weightOf(weights, argument.id)
    };
  }

  function reasonSummary(): string {
    if (topReasons.length === 0) return 'Noch keine gewichteten Gründe.';
    return topReasons.map((reason) => `${sideLabel(reason.side)} (${reason.weight}/3): ${reason.text}`).join(' | ');
  }

  function setWeight(argumentId: string, side: ArgumentSide, weight: ArgumentWeight): void {
    setArgumentWeight(abstimmung.slug, argumentId, side, weight);
  }

  function adjustWeight(argumentId: string, side: ArgumentSide, delta: number): void {
    const current = weightOf(slugWeights, argumentId);
    const next = Math.min(3, Math.max(0, current + delta)) as ArgumentWeight;
    setWeight(argumentId, side, next);
  }

  function setSideWeight(side: ArgumentSide, weight: ArgumentWeight): void {
    const argumentsList = side === 'pro' ? abstimmung.proArguments : abstimmung.contraArguments;
    for (const argument of argumentsList) {
      setWeight(argument.id, side, weight);
    }
  }

  function saveTendency(): void {
    if (totalScore === 0) {
      showToast('Gewichte zuerst mindestens ein Argument.', 'info');
      return;
    }

    const confidence = tendencyPosition === 'UNENTSCHIEDEN' ? 45 : Math.min(96, Math.max(52, tendencyPercent));
    const detail = `${statusText} ${scoreDetail} Gründe: ${reasonSummary()}`;
    setVote(abstimmung.slug, tendencyPosition);
    saveJournalEntry(
      abstimmung.slug,
      {
        position: tendencyPosition,
        confidence
      },
      {
        type: 'weights',
        title: 'Gewichtete Tendenz gespeichert',
        detail
      }
    );
    recordWeightSummary(abstimmung.slug, 'Argumentgewichtung aktualisiert', detail);
    showToast('Gewichtete Tendenz im Journal gespeichert.', 'success');
  }
</script>

<div class="weighting-shell">
  <div class="weighting-header">
    <div class="weighting-intro">
      <p class="section-eyebrow">Abwägen und gewichten</p>
      <h2 class="font-display text-2xl md:text-3xl text-ink">Welche Argumente tragen deine Entscheidung?</h2>
      <p class="weighting-copy">
        Pro und Contra stehen direkt neben der 4-Stufen-Gewichtung. Wähle pro Argument, wie stark es dich überzeugt; die Zusammenfassung aktualisiert sich live.
      </p>

      <div class="weighting-guide-card" aria-label="So funktioniert die Gewichtung">
        <div>
          <p class="guide-title">So funktioniert die Gewichtung</p>
          <ol class="guide-steps">
            <li><span>1</span>Pro und Contra lesen</li>
            <li><span>2</span>Argumente nach Überzeugung bewerten</li>
            <li><span>3</span>Live-Tendenz beobachten</li>
            <li><span>4</span>Tendenz speichern</li>
          </ol>
        </div>

        <dl class="progress-summary" aria-label="Fortschritt der Gewichtung">
          <div>
            <dt>Bewertet</dt>
            <dd>{weightedCount}/{visibleArguments.length}</dd>
          </div>
          <div>
            <dt>Pro-Punkte</dt>
            <dd>{proScore}</dd>
          </div>
          <div>
            <dt>Contra-Punkte</dt>
            <dd>{contraScore}</dd>
          </div>
          <div>
            <dt>Offen</dt>
            <dd>{openArgumentCount}</dd>
          </div>
        </dl>
      </div>
    </div>

    <div
      class="weighting-score"
      class:is-neutral={tendencyPosition === 'UNENTSCHIEDEN'}
      class:is-pro={tendencyPosition === 'JA'}
      class:is-contra={tendencyPosition === 'NEIN'}
      aria-live="polite"
    >
      <span>{weightedCount} von {visibleArguments.length} Argumenten bewertet</span>
      <strong>Deine aktuelle Tendenz: {tendencyLabel}</strong>
      <p>{scoreDetail}</p>

      {#if topReasons.length > 0}
        <div class="reason-list" aria-label="Stärkste gewichtete Gründe">
          {#each topReasons as reason}
            <article>
              <span>{sideLabel(reason.side)} · Gewicht {reason.weight}/3</span>
              <p>{reason.text}</p>
            </article>
          {/each}
        </div>
      {:else}
        <p class="empty-reasons">Noch keine Gründe ausgewählt.</p>
      {/if}

      <div class="score-bar" aria-hidden="true">
        <i class="pro" style="width: {totalScore > 0 ? (proScore / totalScore) * 100 : 50}%"></i>
        <i class="contra" style="width: {totalScore > 0 ? (contraScore / totalScore) * 100 : 50}%"></i>
      </div>
      <button type="button" class="btn-primary" on:click={saveTendency}>Gewichtete Tendenz speichern</button>
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
          {@const weight = weightOf(slugWeights, argument.id)}
          {@const wLabel = labelOf(weight)}
          <article class="weight-card" class:is-weighted={weight > 0} style="--impact: {weight};">
            <header class="weight-card-head">
              <div class="weight-card-text">
                <p>{argument.text}</p>
                <a
                  class="source-pill"
                  href="/abstimmungen/{abstimmung.slug}/argumente/{argument.id}"
                >
                  {argument.source} prüfen →
                </a>
              </div>
              <div class="impact-orb" aria-hidden="true">
                <span>{weight}</span>
                <small>{wLabel}</small>
              </div>
            </header>

            <div class="weight-controls" role="group" aria-label="Wichtigkeit wählen für {argument.text.slice(0, 60)}">
              {#each weightOptions as option}
                <button
                  type="button"
                  class="weight-pill"
                  class:active={weight === option.value}
                  class:zero={option.value === 0}
                  on:click={() => setWeight(argument.id, column.side, option.value)}
                  aria-label="{option.label} setzen"
                  aria-pressed={weight === option.value}
                >
                  <span class="pill-num">{option.short}</span>
                  <span class="pill-label">{option.label}</span>
                </button>
              {/each}
            </div>

            <div class="weight-stepper" role="group" aria-label="Feintuning">
              <button
                type="button"
                class="step-btn"
                on:click={() => adjustWeight(argument.id, column.side, -1)}
                disabled={weight === 0}
                aria-label="Wichtigkeit verringern"
              >-</button>
              <strong>{wLabel}</strong>
              <button
                type="button"
                class="step-btn"
                on:click={() => adjustWeight(argument.id, column.side, 1)}
                disabled={weight === 3}
                aria-label="Wichtigkeit erhöhen"
              >+</button>
            </div>
          </article>
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
    grid-template-columns: minmax(0, 1fr) minmax(320px, 0.46fr);
    gap: 22px;
    align-items: start;
    margin-bottom: 22px;
  }

  .weighting-intro {
    display: flex;
    min-height: 100%;
    flex-direction: column;
    gap: 12px;
  }

  .weighting-copy {
    max-width: 720px;
    color: var(--text-muted);
    line-height: 1.55;
  }

  .weighting-guide-card {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(220px, 0.55fr);
    gap: 16px;
    margin-top: 6px;
    padding: 16px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: color-mix(in srgb, var(--surface-alt) 38%, var(--surface));
  }

  .guide-title {
    color: var(--text);
    font-size: 13px;
    font-weight: 800;
    margin-bottom: 10px;
  }

  .guide-steps {
    display: grid;
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .guide-steps li {
    display: flex;
    align-items: center;
    gap: 9px;
    color: var(--text-muted);
    font-size: 13px;
    line-height: 1.35;
  }

  .guide-steps span {
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
    flex: 0 0 22px;
    border-radius: var(--radius-full);
    background: var(--surface);
    color: var(--brand);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    font-weight: 900;
    border: 1px solid var(--border-light);
  }

  .progress-summary {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    margin: 0;
  }

  .progress-summary div {
    min-height: 66px;
    padding: 10px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: var(--surface);
  }

  .progress-summary dt {
    color: var(--text-muted);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .progress-summary dd {
    margin: 6px 0 0;
    color: var(--text);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 18px;
    font-weight: 900;
    line-height: 1;
  }

  .weighting-score {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    padding: 18px;
    border-radius: var(--radius);
    color: white;
    background: linear-gradient(135deg, var(--brand), color-mix(in srgb, var(--brand) 54%, #1a1a1a));
  }

  .weighting-score.is-pro {
    background: linear-gradient(135deg, var(--pro), color-mix(in srgb, var(--pro) 54%, #1a1a1a));
  }

  .weighting-score.is-contra {
    background: linear-gradient(135deg, var(--contra), color-mix(in srgb, var(--contra) 54%, #1a1a1a));
  }

  .weighting-score span {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    text-transform: uppercase;
    opacity: 0.8;
  }

  .weighting-score strong {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(22px, 2.2vw, 30px);
    line-height: 1.12;
  }

  .weighting-score p {
    color: rgba(255, 255, 255, 0.82);
    line-height: 1.45;
  }

  .reason-list {
    display: grid;
    gap: 8px;
  }

  .reason-list article {
    padding: 10px 0 0;
    border-top: 1px solid rgba(255, 255, 255, 0.18);
  }

  .reason-list article p {
    margin-top: 3px;
    font-size: 13px;
  }

  .empty-reasons {
    padding: 10px 0 0;
    border-top: 1px solid rgba(255, 255, 255, 0.18);
    font-size: 13px;
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

  .weighting-column.contra .column-title span { background: var(--contra); }

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

  .weight-card {
    position: relative;
    display: grid;
    gap: 14px;
    padding: 16px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: var(--surface);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.02);
    transition:
      border-color 220ms ease,
      box-shadow 220ms ease,
      background 220ms ease;
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

  .weight-card.is-weighted {
    border-color: color-mix(in srgb, var(--brand) 24%, var(--border-light));
    box-shadow: var(--shadow-sm);
    background:
      linear-gradient(90deg, color-mix(in srgb, var(--brand-soft, var(--brand-light)) calc(var(--impact, 0) * 18%), transparent), transparent 58%),
      var(--surface);
  }

  .weight-card-head {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 14px;
    align-items: start;
  }

  .weight-card-text {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .weight-card-text p {
    color: var(--text);
    line-height: 1.42;
    margin: 0;
  }

  .impact-orb {
    display: grid;
    place-items: center;
    width: 76px;
    min-height: 68px;
    padding: 6px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: color-mix(in srgb, var(--surface-alt) 72%, var(--surface));
    text-align: center;
    transition: background 220ms ease, border-color 220ms ease;
  }

  .weight-card.is-weighted .impact-orb {
    border-color: color-mix(in srgb, var(--brand) 32%, var(--border-light));
    background: var(--brand-soft, var(--brand-light));
  }

  .impact-orb span {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
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
    margin-top: 2px;
  }

  .source-pill {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--brand-soft, var(--brand-light)) 70%, transparent);
    color: var(--brand);
    font-weight: 700;
    font-size: 12px;
    text-decoration: none;
    cursor: pointer;
    transition: background 160ms ease, color 160ms ease;
  }

  .source-pill:hover {
    background: color-mix(in srgb, var(--brand) 14%, var(--surface));
    color: var(--brand-dark, var(--brand));
  }

  .weight-controls {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
  }

  .weight-pill {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    min-height: 68px;
    padding: 8px 6px;
    border: 2px solid var(--border-light);
    border-radius: var(--radius);
    background: var(--surface);
    color: var(--text-muted);
    cursor: pointer;
    font-size: 11px;
    font-weight: 800;
    line-height: 1.15;
    text-align: center;
    transition: transform 140ms ease, border-color 140ms ease, background 140ms ease, color 140ms ease, box-shadow 140ms ease;
  }

  .weight-pill:hover {
    transform: translateY(-1px);
    border-color: color-mix(in srgb, var(--brand) 42%, var(--border-light));
    color: var(--brand);
    background: var(--brand-soft, var(--brand-light));
  }

  .weight-pill:focus-visible {
    outline: 3px solid var(--brand);
    outline-offset: 2px;
  }

  .weight-pill.active {
    background: var(--brand);
    color: white;
    border-color: var(--brand);
    box-shadow: 0 4px 14px color-mix(in srgb, var(--brand) 35%, transparent);
  }

  .weight-pill.active .pill-num {
    background: rgba(255, 255, 255, 0.22);
    color: white;
  }

  .weight-pill.zero.active {
    background: var(--surface-alt);
    color: var(--text);
    border-color: var(--border);
    box-shadow: none;
  }

  .weight-pill.zero.active .pill-num {
    background: var(--surface);
    color: var(--text);
  }

  .pill-num {
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    border-radius: 999px;
    background: var(--surface-alt);
    color: var(--text);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    transition: background 140ms ease, color 140ms ease;
  }

  .pill-label {
    font-size: 11px;
    font-weight: 800;
  }

  .weight-stepper {
    display: grid;
    grid-template-columns: 44px minmax(0, 1fr) 44px;
    align-items: center;
    gap: 8px;
    padding: 6px;
    border-radius: var(--radius);
    background: color-mix(in srgb, var(--surface-alt) 52%, var(--surface));
  }

  .step-btn {
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
    transition: transform 140ms ease, border-color 140ms ease, color 140ms ease, background 140ms ease;
  }

  .step-btn:not(:disabled):hover {
    transform: translateY(-1px);
    color: var(--brand);
    border-color: color-mix(in srgb, var(--brand) 42%, var(--border-light));
    background: var(--brand-soft, var(--brand-light));
  }

  .step-btn:disabled {
    cursor: not-allowed;
    opacity: 0.42;
  }

  .weight-stepper strong {
    color: var(--text);
    text-align: center;
    font-size: 13px;
    font-weight: 700;
  }

  @media (max-width: 980px) {
    .weighting-header,
    .weighting-grid {
      grid-template-columns: 1fr;
    }

    .weighting-guide-card {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 560px) {
    .column-actions {
      grid-template-columns: 1fr;
    }

    .weight-controls {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .weight-card-head {
      grid-template-columns: 1fr;
    }

    .impact-orb {
      width: 100%;
      min-height: 56px;
      grid-template-columns: auto 1fr auto;
      justify-items: start;
      gap: 10px;
      padding: 6px 12px;
      text-align: left;
    }

    .impact-orb small {
      margin-top: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .weight-card,
    .weight-card::before,
    .impact-orb,
    .weight-pill,
    .step-btn,
    .score-bar i {
      transition: none;
    }
  }
</style>
