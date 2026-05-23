<script lang="ts">
  import type { Abstimmung } from '$lib/types';
  import { engagementStore, saveFeedback } from '$lib/stores/engagement';
  import { showToast } from '$lib/stores/toast';

  export let abstimmung: Abstimmung;

  let clarity = 4;
  let neutrality = 4;
  let usefulness = 4;
  let comment = '';
  let initialized = false;

  $: existing = $engagementStore.feedback[abstimmung.slug];
  $: if (existing && !initialized) {
    clarity = existing.clarity;
    neutrality = existing.neutrality;
    usefulness = existing.usefulness;
    comment = existing.comment;
    initialized = true;
  }

  function submit(): void {
    saveFeedback(abstimmung.slug, {
      clarity,
      neutrality,
      usefulness,
      comment: comment.trim(),
      updatedAt: new Date().toISOString()
    });
    showToast('Feedback gespeichert. Danke für die Rückmeldung.', 'success');
  }
</script>

<div class="feedback-shell">
  <div>
    <p class="section-eyebrow">Feedback zur Vorlage</p>
    <h2 class="font-display text-2xl text-ink">Hilft dir diese Abstimmungsseite wirklich?</h2>
    <p>Bewerte Verständlichkeit, Neutralität und Nutzen. Das ist bewusst als Prototyp-Feedback sichtbar und lokal gespeichert.</p>
  </div>

  <div class="feedback-grid">
    <div class="feedback-rating-group">
      <span id="feedback-clarity">Verständlichkeit</span>
      <div class="rating-row" role="group" aria-labelledby="feedback-clarity">
        {#each [1, 2, 3, 4, 5] as value}
          <button
            type="button"
            class:active={clarity === value}
            aria-pressed={clarity === value}
            aria-label="Verständlichkeit mit {value} von 5 bewerten"
            on:click={() => (clarity = value)}
          >
            {value}
          </button>
        {/each}
      </div>
    </div>

    <div class="feedback-rating-group">
      <span id="feedback-neutrality">Neutralität</span>
      <div class="rating-row" role="group" aria-labelledby="feedback-neutrality">
        {#each [1, 2, 3, 4, 5] as value}
          <button
            type="button"
            class:active={neutrality === value}
            aria-pressed={neutrality === value}
            aria-label="Neutralität mit {value} von 5 bewerten"
            on:click={() => (neutrality = value)}
          >
            {value}
          </button>
        {/each}
      </div>
    </div>

    <div class="feedback-rating-group">
      <span id="feedback-usefulness">Nützlichkeit</span>
      <div class="rating-row" role="group" aria-labelledby="feedback-usefulness">
        {#each [1, 2, 3, 4, 5] as value}
          <button
            type="button"
            class:active={usefulness === value}
            aria-pressed={usefulness === value}
            aria-label="Nützlichkeit mit {value} von 5 bewerten"
            on:click={() => (usefulness = value)}
          >
            {value}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <label class="feedback-comment">
    <span>Was fehlt dir noch?</span>
    <textarea rows="4" maxlength="500" bind:value={comment} placeholder="Optional: Was war unklar, unausgewogen oder besonders hilfreich?" />
  </label>

  <div class="feedback-actions">
    <span>{existing ? 'Feedback bereits vorhanden und updatebar' : 'Noch kein Feedback gespeichert'}</span>
    <button type="button" class="btn-primary" on:click={submit}>{existing ? 'Feedback aktualisieren' : 'Feedback speichern'}</button>
  </div>
</div>

<style>
  .feedback-shell {
    padding: clamp(22px, 3vw, 32px);
    border: 1px solid color-mix(in srgb, var(--brand) 20%, var(--border-light));
    border-radius: var(--radius-lg);
    background:
      linear-gradient(135deg, color-mix(in srgb, var(--brand-soft) 62%, transparent), transparent 48%),
      var(--surface);
    box-shadow: var(--shadow-sm);
  }

  .feedback-shell p:not(.section-eyebrow) {
    margin-top: 8px;
    max-width: 780px;
    color: var(--text-muted);
    line-height: 1.55;
  }

  .feedback-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    margin-top: 22px;
  }

  .feedback-rating-group,
  .feedback-comment {
    display: grid;
    gap: 9px;
  }

  .feedback-grid span,
  .feedback-comment span {
    color: var(--text);
    font-weight: 800;
  }

  .rating-row {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 7px;
  }

  .rating-row button {
    min-height: 42px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: var(--surface);
    color: var(--text-muted);
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 900;
    cursor: pointer;
    transition: transform 160ms ease, background 160ms ease, border-color 160ms ease, color 160ms ease;
  }

  .rating-row button.active {
    transform: translateY(-1px);
    color: white;
    border-color: var(--brand);
    background: var(--brand);
  }

  .rating-row button:hover:not(.active) {
    transform: translateY(-1px);
    color: var(--brand);
    border-color: color-mix(in srgb, var(--brand) 42%, var(--border-light));
    background: var(--brand-soft);
  }

  .rating-row button:focus-visible {
    outline: 2px solid var(--brand);
    outline-offset: 2px;
  }

  .feedback-comment {
    margin-top: 18px;
  }

  .feedback-comment textarea {
    width: 100%;
    resize: vertical;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--surface);
    color: var(--text);
    padding: 13px 14px;
    line-height: 1.55;
    font: inherit;
  }

  .feedback-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 14px;
  }

  .feedback-actions span {
    color: var(--text-subtle);
    font-size: 12px;
    font-family: 'IBM Plex Mono', monospace;
  }

  @media (max-width: 820px) {
    .feedback-grid {
      grid-template-columns: 1fr;
    }

    .feedback-actions {
      align-items: stretch;
      flex-direction: column;
    }
  }
</style>
