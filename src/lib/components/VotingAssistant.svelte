<script lang="ts">
  import type { Abstimmung, UserPosition } from '$lib/types';
  import { saveAssistantEntry, saveJournalEntry } from '$lib/stores/engagement';
  import { setVote } from '$lib/stores/votes';
  import { showToast } from '$lib/stores/toast';

  export let abstimmung: Abstimmung;

  const steps = ['Kurz verstehen', 'Argumente prüfen', 'Prioritäten setzen', 'Tendenz speichern'];
  const themes = [
    'Kosten',
    'Freiheit',
    'Sicherheit',
    'Umwelt',
    'Soziale Gerechtigkeit',
    'Wirtschaft',
    'Service public',
    'EU-Beziehungen'
  ];

  let step = 0;
  let selectedThemes: string[] = [];
  let position: UserPosition | undefined;
  let saved = false;

  $: progress = ((step + 1) / steps.length) * 100;
  $: leadingPro = abstimmung.proArguments.slice(0, 2);
  $: leadingContra = abstimmung.contraArguments.slice(0, 2);
  $: reason =
    selectedThemes.length > 0
      ? `Du gewichtest vor allem ${selectedThemes.slice(0, 3).join(', ')}.`
      : 'Du hast noch keine Prioritäten gesetzt.';
  $: positionLabel = position === 'UNENTSCHIEDEN' ? 'Unsicher' : position;
  $: suggestedConfidence = position === 'UNENTSCHIEDEN' || !position ? 45 : Math.min(90, 58 + selectedThemes.length * 5);

  function toggleTheme(theme: string): void {
    if (selectedThemes.includes(theme)) {
      selectedThemes = selectedThemes.filter((item) => item !== theme);
    } else {
      selectedThemes = [...selectedThemes, theme].slice(0, 5);
    }
    saved = false;
  }

  function next(): void {
    step = Math.min(steps.length - 1, step + 1);
  }

  function previous(): void {
    step = Math.max(0, step - 1);
  }

  function finish(): void {
    if (!position) {
      showToast('Wähle zuerst eine Tendenz oder Unsicher.', 'info');
      return;
    }

    const detail = `${positionLabel}: ${reason}`;
    saveAssistantEntry(
      abstimmung.slug,
      {
        themes: selectedThemes,
        position,
        reason
      },
      detail
    );
    setVote(abstimmung.slug, position);
    saveJournalEntry(
      abstimmung.slug,
      {
        position,
        confidence: suggestedConfidence
      },
      {
        type: 'assistant',
        title: 'Tendenz aus Assistent übernommen',
        detail
      }
    );
    saved = true;
    showToast('Assistent-Ergebnis im Journal gespeichert.', 'success');
  }
</script>

<div class="assistant-shell">
  <div class="assistant-head">
    <div>
      <p class="section-eyebrow">Abstimmungs-Assistent</p>
      <h2 class="font-display text-2xl md:text-3xl text-ink">In vier Schritten zur eigenen Tendenz</h2>
    </div>
    <div class="assistant-progress" aria-label="Fortschritt">
      <span>{step + 1}/{steps.length}</span>
      <div><i style="width: {progress}%"></i></div>
    </div>
  </div>

  <div class="step-tabs" aria-label="Assistent-Schritte">
    {#each steps as label, index}
      <button type="button" class:active={step === index} on:click={() => (step = index)}>
        <span>{index + 1}</span>
        {label}
      </button>
    {/each}
  </div>

  <div class="assistant-body">
    {#if step === 0}
      <div class="assistant-panel intro-panel">
        <p class="section-eyebrow">Worum geht es?</p>
        <p class="assistant-summary">{abstimmung.aiSummary}</p>
        <div class="assistant-fact-row">
          <span>{abstimmung.readTime} Min Lesezeit</span>
          <span>Bundesrat: {abstimmung.bundesratPosition}</span>
          <span>Parlament: {abstimmung.parlamentPosition}</span>
        </div>
      </div>
    {:else if step === 1}
      <div class="argument-duel">
        <div class="mini-column pro">
          <p class="section-eyebrow">Spricht für JA</p>
          {#each leadingPro as argument}
            <article>
              <strong>{argument.text}</strong>
              <span>{argument.source}</span>
            </article>
          {/each}
        </div>
        <div class="mini-column contra">
          <p class="section-eyebrow">Spricht für NEIN</p>
          {#each leadingContra as argument}
            <article>
              <strong>{argument.text}</strong>
              <span>{argument.source}</span>
            </article>
          {/each}
        </div>
      </div>
    {:else if step === 2}
      <div class="assistant-panel">
        <p class="section-eyebrow">Was ist dir bei dieser Vorlage wichtig?</p>
        <div class="theme-grid">
          {#each themes as theme}
            <button type="button" class:active={selectedThemes.includes(theme)} on:click={() => toggleTheme(theme)}>
              {theme}
            </button>
          {/each}
        </div>
        <p class="assistant-hint">{reason} Maximal fünf Prioritäten, damit die Entscheidung fokussiert bleibt.</p>
      </div>
    {:else}
      <div class="assistant-panel result-panel">
        <div>
          <p class="section-eyebrow">Deine aktuelle Tendenz</p>
          <div class="position-grid">
            <button type="button" class:active={position === 'JA'} class="ja" on:click={() => ((position = 'JA'), (saved = false))}>JA</button>
            <button type="button" class:active={position === 'NEIN'} class="nein" on:click={() => ((position = 'NEIN'), (saved = false))}>NEIN</button>
            <button type="button" class:active={position === 'UNENTSCHIEDEN'} on:click={() => ((position = 'UNENTSCHIEDEN'), (saved = false))}>Unsicher</button>
          </div>
        </div>
        <div class="assistant-result-card">
          <span class="result-kicker">Orientierung</span>
          <strong>{position ? `${positionLabel} mit ${suggestedConfidence}% Sicherheit` : 'Noch keine Tendenz gewählt'}</strong>
          <p>{reason}</p>
          <button type="button" class="btn-primary" on:click={finish}>
            {saved ? 'Gespeichert' : 'Ins Journal übernehmen'}
          </button>
        </div>
      </div>
    {/if}
  </div>

  <div class="assistant-actions">
    <button type="button" class="btn-ghost" on:click={previous} disabled={step === 0}>Zurück</button>
    {#if step < steps.length - 1}
      <button type="button" class="btn-primary" on:click={next}>Weiter</button>
    {:else}
      <button type="button" class="btn-secondary" on:click={() => (step = 1)}>Argumente nochmals ansehen</button>
    {/if}
  </div>
</div>

<style>
  .assistant-shell {
    position: relative;
    overflow: hidden;
    padding: clamp(22px, 3vw, 34px);
    border: 1px solid color-mix(in srgb, var(--brand) 22%, var(--border-light));
    border-radius: var(--radius-lg);
    background:
      radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--brand-soft) 75%, transparent), transparent 36%),
      var(--surface);
    box-shadow: var(--shadow-md);
  }

  .assistant-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 18px;
    margin-bottom: 18px;
  }

  .assistant-progress {
    min-width: 170px;
    font-family: 'IBM Plex Mono', monospace;
    color: var(--text-muted);
    font-size: 12px;
    text-align: right;
  }

  .assistant-progress div {
    height: 7px;
    margin-top: 8px;
    overflow: hidden;
    border-radius: 999px;
    background: var(--surface-alt);
  }

  .assistant-progress i {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--brand), color-mix(in srgb, var(--brand) 60%, var(--pro)));
    transition: width 420ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .step-tabs {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
    margin-bottom: 18px;
  }

  .step-tabs button,
  .theme-grid button,
  .position-grid button {
    border: 1px solid var(--border-light);
    background: var(--surface);
    color: var(--text-muted);
    cursor: pointer;
    transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, color 180ms ease;
  }

  .step-tabs button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    min-height: 42px;
    border-radius: var(--radius);
    font-weight: 700;
    font-size: 13px;
  }

  .step-tabs span {
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
    border-radius: 999px;
    background: var(--surface-alt);
    color: var(--text);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
  }

  .step-tabs button.active,
  .theme-grid button.active,
  .position-grid button.active {
    border-color: color-mix(in srgb, var(--brand) 46%, var(--border-light));
    background: var(--brand-soft);
    color: var(--brand);
  }

  .assistant-body {
    min-height: 270px;
  }

  .assistant-panel {
    height: 100%;
    min-height: 270px;
    padding: clamp(18px, 2.4vw, 26px);
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: color-mix(in srgb, var(--surface) 86%, var(--surface-alt));
    animation: panel-in 360ms cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .assistant-summary {
    max-width: 980px;
    color: var(--text);
    font-size: clamp(17px, 1.55vw, 22px);
    line-height: 1.58;
  }

  .assistant-fact-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    font-family: 'IBM Plex Mono', monospace;
    color: var(--text-muted);
    font-size: 12px;
  }

  .assistant-fact-row span {
    padding: 7px 10px;
    border-radius: 999px;
    background: var(--surface);
    border: 1px solid var(--border-light);
  }

  .argument-duel {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    animation: panel-in 360ms cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .mini-column {
    min-height: 270px;
    padding: clamp(18px, 2.4vw, 24px);
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: var(--surface);
  }

  .mini-column.pro {
    border-top: 4px solid var(--pro);
  }

  .mini-column.contra {
    border-top: 4px solid var(--contra);
  }

  .mini-column article {
    padding: 16px 0;
    border-top: 1px solid var(--border-light);
  }

  .mini-column strong {
    display: block;
    color: var(--text);
    line-height: 1.35;
  }

  .mini-column span {
    display: block;
    margin-top: 7px;
    color: var(--text-muted);
    font-size: 12px;
  }

  .theme-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 18px;
  }

  .theme-grid button {
    min-height: 42px;
    padding: 0 14px;
    border-radius: 999px;
    font-weight: 700;
  }

  .assistant-hint {
    margin-top: 18px;
    color: var(--text-muted);
    line-height: 1.55;
  }

  .result-panel {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(280px, 0.7fr);
    gap: 18px;
    align-items: stretch;
  }

  .position-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin-top: 18px;
  }

  .position-grid button {
    min-height: 76px;
    border-radius: var(--radius);
    font-size: 18px;
    font-weight: 800;
  }

  .position-grid .ja.active {
    color: var(--pro);
    border-color: color-mix(in srgb, var(--pro) 44%, var(--border-light));
    background: var(--pro-soft);
  }

  .position-grid .nein.active {
    color: var(--contra);
    border-color: color-mix(in srgb, var(--contra) 44%, var(--border-light));
    background: var(--contra-soft);
  }

  .assistant-result-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    padding: 20px;
    border-radius: var(--radius);
    color: white;
    background: linear-gradient(135deg, var(--brand), color-mix(in srgb, var(--brand) 62%, #111));
  }

  .assistant-result-card strong {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 24px;
    line-height: 1.1;
  }

  .assistant-result-card p {
    color: rgba(255, 255, 255, 0.78);
    line-height: 1.45;
  }

  .result-kicker {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.72);
  }

  .assistant-actions {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-top: 18px;
  }

  @keyframes panel-in {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 860px) {
    .assistant-head,
    .result-panel {
      grid-template-columns: 1fr;
      display: grid;
    }

    .assistant-progress {
      text-align: left;
      min-width: 0;
    }

    .step-tabs,
    .argument-duel,
    .position-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
