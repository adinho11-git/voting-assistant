<script lang="ts">
  import type { Abstimmung, Argument, UserPosition } from '$lib/types';
  import { engagementStore, type ArgumentSide, type ArgumentWeight } from '$lib/stores/engagement';

  export let abstimmung: Abstimmung;

  interface WorkflowStep {
    label: string;
    action: string;
    href: string;
  }

  interface WeightedReason {
    side: ArgumentSide;
    text: string;
    source: string;
    weight: ArgumentWeight;
  }

  const steps: WorkflowStep[] = [
    { label: 'Verstehen', action: 'neutralen Überblick lesen', href: '#ueberblick' },
    { label: 'Abwägen', action: 'Pro und Contra prüfen', href: '#argumente' },
    { label: 'Gewichten', action: 'überzeugende Argumente markieren', href: '#argumente' },
    { label: 'Einordnen', action: 'Parteien als Orientierung nutzen', href: '#parteien' },
    { label: 'Entscheiden', action: 'eigene Position setzen', href: '#meine-position' },
    { label: 'Speichern', action: 'Sicherheit und Notiz sichern', href: '#meine-position' }
  ];

  $: slugWeights = $engagementStore.weights[abstimmung.slug] ?? {};
  $: proScore = sumWeights(slugWeights, abstimmung.proArguments, 'pro');
  $: contraScore = sumWeights(slugWeights, abstimmung.contraArguments, 'contra');
  $: totalScore = proScore + contraScore;
  $: tendencyPosition = computeTendency(proScore, contraScore);
  $: tendencyLabel = formatPosition(tendencyPosition);
  $: topReasons = collectTopReasons(slugWeights, abstimmung);
  $: tendencyDetail =
    totalScore === 0
      ? 'Gewichte weiter unten Argumente, dann erscheint hier deine aktuelle Tendenz.'
      : `Pro ${proScore} zu Contra ${contraScore}. Die Tendenz entsteht nur aus deinen Gewichtungen und ist keine Empfehlung.`;

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

  function computeTendency(pro: number, contra: number): UserPosition {
    if (pro + contra === 0 || pro === contra) return 'UNENTSCHIEDEN';
    return pro > contra ? 'JA' : 'NEIN';
  }

  function formatPosition(position: UserPosition): string {
    if (position === 'UNENTSCHIEDEN') return 'Unsicher';
    return position;
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
</script>

<div class="assistant-shell" aria-labelledby="assistant-title">
  <div class="assistant-grid">
    <div class="assistant-main">
      <p class="section-eyebrow">Geführter Entscheidungs-Assistent</p>
      <h2 id="assistant-title" class="font-display text-2xl md:text-3xl text-ink">
        Verstehen → Abwägen → Gewichten → Einordnen → Entscheiden → Speichern
      </h2>
      <p class="assistant-summary">{abstimmung.aiSummary}</p>
      <p class="assistant-transparency">
        KI-gestützte Zusammenfassungen dienen als verständliche Einstiegshilfe und wurden im Projektkontext manuell geprüft.
      </p>

      <div class="assistant-facts" aria-label="Kurzfakten">
        <span>{abstimmung.readTime} Min Lesezeit</span>
        <span>Bundesrat: {abstimmung.bundesratPosition}</span>
        <span>Parlament: {abstimmung.parlamentPosition}</span>
      </div>

      <div class="assistant-actions">
        <a class="btn-primary" href="#argumente">Argumente gewichten</a>
        <a class="btn-ghost" href="#meine-position">Position speichern</a>
      </div>
    </div>

    <aside class="assistant-result" class:is-pro={tendencyPosition === 'JA'} class:is-contra={tendencyPosition === 'NEIN'} aria-live="polite">
      <span class="result-kicker">Reflexion aus deiner Gewichtung</span>
      <strong>Deine aktuelle Tendenz: {tendencyLabel}</strong>
      <p>{tendencyDetail}</p>
      <p class="assistant-result-note">Keine Prognose und keine Abstimmungsempfehlung.</p>
      {#if topReasons.length > 0}
        <ul>
          {#each topReasons as reason}
            <li>
              <span>{reason.side === 'pro' ? 'Pro' : 'Contra'} · {reason.weight}/3</span>
              {reason.text}
            </li>
          {/each}
        </ul>
      {/if}
    </aside>
  </div>

  <div class="assistant-steps" aria-label="Workflow-Schritte">
    {#each steps as item, index}
      <a href={item.href} class="assistant-step">
        <span>{index + 1}</span>
        <strong>{item.label}</strong>
        <small>{item.action}</small>
      </a>
    {/each}
  </div>
</div>

<style>
  .assistant-shell {
    position: relative;
    overflow: hidden;
    padding: clamp(22px, 3vw, 34px);
    border: 1px solid color-mix(in srgb, var(--brand) 24%, var(--border-light));
    border-radius: var(--radius-lg);
    background:
      linear-gradient(135deg, color-mix(in srgb, var(--brand-soft) 72%, transparent), transparent 42%),
      var(--surface);
    box-shadow: var(--shadow-md);
  }

  .assistant-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(300px, 0.45fr);
    gap: clamp(18px, 3vw, 30px);
    align-items: stretch;
  }

  .assistant-main {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .assistant-summary {
    max-width: 880px;
    color: var(--text);
    font-size: clamp(16px, 1.35vw, 20px);
    line-height: 1.58;
  }

  .assistant-transparency {
    max-width: 780px;
    color: var(--text-muted);
    font-size: 13px;
    line-height: 1.5;
  }

  .assistant-facts,
  .assistant-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .assistant-facts span {
    padding: 7px 10px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius-full);
    background: var(--surface);
    color: var(--text-muted);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    font-weight: 700;
  }

  .assistant-actions {
    margin-top: 4px;
  }

  .assistant-result {
    display: flex;
    min-height: 100%;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    padding: 20px;
    border-radius: var(--radius);
    color: white;
    background: linear-gradient(135deg, var(--brand), color-mix(in srgb, var(--brand) 58%, #111));
  }

  .assistant-result.is-pro {
    background: linear-gradient(135deg, var(--pro), color-mix(in srgb, var(--pro) 58%, #111));
  }

  .assistant-result.is-contra {
    background: linear-gradient(135deg, var(--contra), color-mix(in srgb, var(--contra) 58%, #111));
  }

  .assistant-result strong {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(23px, 2.2vw, 31px);
    line-height: 1.12;
  }

  .assistant-result p,
  .assistant-result li {
    color: rgba(255, 255, 255, 0.82);
    line-height: 1.45;
  }

  .assistant-result .assistant-result-note {
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
  }

  .assistant-result ul {
    display: grid;
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .assistant-result li {
    padding-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.18);
    font-size: 13px;
  }

  .assistant-result li span,
  .result-kicker {
    display: block;
    margin-bottom: 3px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.72);
  }

  .assistant-steps {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 10px;
    margin-top: 22px;
  }

  .assistant-step {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 4px 9px;
    min-height: 94px;
    padding: 14px;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: color-mix(in srgb, var(--surface) 88%, var(--surface-alt));
    text-decoration: none;
    transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
  }

  .assistant-step:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--brand) 35%, var(--border-light));
    background: var(--brand-soft);
  }

  .assistant-step span {
    display: grid;
    place-items: center;
    width: 26px;
    height: 26px;
    border-radius: var(--radius-full);
    background: var(--brand);
    color: white;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    font-weight: 900;
  }

  .assistant-step strong {
    align-self: center;
    color: var(--text);
    font-size: 14px;
  }

  .assistant-step small {
    grid-column: 2;
    color: var(--text-muted);
    font-size: 12px;
    line-height: 1.35;
  }

  @media (max-width: 1080px) {
    .assistant-grid,
    .assistant-steps {
      grid-template-columns: 1fr;
    }

    .assistant-step {
      min-height: 0;
    }
  }

  @media (max-width: 560px) {
    .assistant-shell {
      padding: 18px;
      overflow: visible;
    }

    .assistant-result {
      padding: 16px;
    }

    .assistant-actions a {
      width: 100%;
    }

    .assistant-steps {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      margin-left: 0;
      margin-right: 0;
      overflow: visible;
      padding: 0;
    }

    .assistant-step {
      min-height: 0;
      padding: 12px;
    }
  }
</style>
