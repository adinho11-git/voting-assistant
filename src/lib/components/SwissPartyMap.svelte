<script lang="ts">
  import topoJson from '$lib/data/ch-cantons.json';

  export let variant: 'hero' | 'feature' = 'feature';
  export let revealed = false;
  export let id = 'feature';

  type PartyKey = 'SVP' | 'SP' | 'FDP' | 'Mitte' | 'GLP' | 'Gruene';
  type PartySelection = PartyKey | 'dominant';
  type Point = [number, number];
  type CantonResult = Record<PartyKey, number>;

  type TopoGeometry = {
    type: 'Polygon' | 'MultiPolygon';
    id: number;
    arcs: number[][] | number[][][];
  };

  type Topology = {
    arcs: number[][][];
    transform: {
      scale: [number, number];
      translate: [number, number];
    };
    objects: {
      cantons: {
        geometries: TopoGeometry[];
      };
    };
  };

  type CantonShape = {
    id: number;
    abbr: string;
    name: string;
    path: string;
    centroid: Point;
    result: CantonResult;
  };

  const shadowId = `swiss-shadow-${id}`;
  const redId = `swiss-red-${id}`;

  const topology = topoJson as unknown as Topology;
  const viewBox = { x: 90, y: 0, width: 790, height: 500 };

  const parties: Array<{ key: PartySelection; label: string; color: string }> = [
    { key: 'dominant', label: 'Stärkste', color: '#f30d91' },
    { key: 'SVP', label: 'SVP', color: '#15803D' },
    { key: 'SP', label: 'SP', color: '#E11D48' },
    { key: 'FDP', label: 'FDP', color: '#2563EB' },
    { key: 'Mitte', label: 'Mitte', color: '#EA580C' },
    { key: 'GLP', label: 'GLP', color: '#0D9488' },
    { key: 'Gruene', label: 'Grüne', color: '#16A34A' }
  ];

  const partyColors: Record<PartyKey, string> = {
    SVP: '#15803D',
    SP: '#F30D91',
    FDP: '#2563EB',
    Mitte: '#EA580C',
    GLP: '#0D9488',
    Gruene: '#16A34A'
  };

  const partyLabels: Record<PartyKey, string> = {
    SVP: 'SVP',
    SP: 'SP',
    FDP: 'FDP',
    Mitte: 'Mitte',
    GLP: 'GLP',
    Gruene: 'Grüne'
  };

  const cantonMeta: Record<number, { abbr: string; name: string; result: CantonResult }> = {
    1: { abbr: 'ZH', name: 'Zürich', result: { SVP: 26.7, SP: 17.6, FDP: 14.6, Mitte: 4.4, GLP: 11.9, Gruene: 9.6 } },
    2: { abbr: 'BE', name: 'Bern', result: { SVP: 29.0, SP: 18.2, FDP: 8.6, Mitte: 10.1, GLP: 7.5, Gruene: 9.9 } },
    3: { abbr: 'LU', name: 'Luzern', result: { SVP: 24.5, SP: 13.1, FDP: 13.2, Mitte: 29.4, GLP: 7.1, Gruene: 6.8 } },
    4: { abbr: 'UR', name: 'Uri', result: { SVP: 27.0, SP: 8.0, FDP: 15.0, Mitte: 38.0, GLP: 3.0, Gruene: 2.0 } },
    5: { abbr: 'SZ', name: 'Schwyz', result: { SVP: 34.0, SP: 10.0, FDP: 19.0, Mitte: 25.0, GLP: 5.0, Gruene: 3.0 } },
    6: { abbr: 'OW', name: 'Obwalden', result: { SVP: 30.0, SP: 8.0, FDP: 17.0, Mitte: 34.0, GLP: 3.5, Gruene: 2.5 } },
    7: { abbr: 'NW', name: 'Nidwalden', result: { SVP: 28.0, SP: 8.5, FDP: 18.0, Mitte: 36.0, GLP: 4.0, Gruene: 2.0 } },
    8: { abbr: 'GL', name: 'Glarus', result: { SVP: 32.0, SP: 13.0, FDP: 15.0, Mitte: 21.0, GLP: 5.0, Gruene: 7.0 } },
    9: { abbr: 'ZG', name: 'Zug', result: { SVP: 26.0, SP: 12.0, FDP: 23.0, Mitte: 19.0, GLP: 10.0, Gruene: 5.0 } },
    10: { abbr: 'FR', name: 'Freiburg', result: { SVP: 20.0, SP: 21.0, FDP: 15.0, Mitte: 27.0, GLP: 5.0, Gruene: 7.0 } },
    11: { abbr: 'SO', name: 'Solothurn', result: { SVP: 31.0, SP: 19.0, FDP: 17.0, Mitte: 16.0, GLP: 5.0, Gruene: 6.0 } },
    12: { abbr: 'BS', name: 'Basel-Stadt', result: { SVP: 10.0, SP: 30.0, FDP: 13.0, Mitte: 8.0, GLP: 10.0, Gruene: 17.0 } },
    13: { abbr: 'BL', name: 'Basel-Landschaft', result: { SVP: 24.0, SP: 22.0, FDP: 17.0, Mitte: 8.0, GLP: 9.0, Gruene: 10.0 } },
    14: { abbr: 'SH', name: 'Schaffhausen', result: { SVP: 31.0, SP: 21.0, FDP: 15.0, Mitte: 6.0, GLP: 7.0, Gruene: 8.0 } },
    15: { abbr: 'AR', name: 'Appenzell Ausserrhoden', result: { SVP: 28.0, SP: 14.0, FDP: 29.0, Mitte: 10.0, GLP: 8.0, Gruene: 5.0 } },
    16: { abbr: 'AI', name: 'Appenzell Innerrhoden', result: { SVP: 28.0, SP: 5.0, FDP: 15.0, Mitte: 42.0, GLP: 2.0, Gruene: 2.0 } },
    17: { abbr: 'SG', name: 'St. Gallen', result: { SVP: 31.0, SP: 13.0, FDP: 15.0, Mitte: 22.0, GLP: 6.0, Gruene: 5.0 } },
    18: { abbr: 'GR', name: 'Graubünden', result: { SVP: 30.0, SP: 14.0, FDP: 18.0, Mitte: 22.0, GLP: 5.0, Gruene: 4.0 } },
    19: { abbr: 'AG', name: 'Aargau', result: { SVP: 32.0, SP: 16.0, FDP: 16.0, Mitte: 15.0, GLP: 7.0, Gruene: 6.0 } },
    20: { abbr: 'TG', name: 'Thurgau', result: { SVP: 39.0, SP: 11.0, FDP: 14.0, Mitte: 17.0, GLP: 6.0, Gruene: 4.0 } },
    21: { abbr: 'TI', name: 'Tessin', result: { SVP: 18.0, SP: 15.0, FDP: 24.0, Mitte: 22.0, GLP: 3.0, Gruene: 6.0 } },
    22: { abbr: 'VD', name: 'Waadt', result: { SVP: 16.0, SP: 23.0, FDP: 22.0, Mitte: 6.0, GLP: 8.0, Gruene: 13.0 } },
    23: { abbr: 'VS', name: 'Wallis', result: { SVP: 24.0, SP: 13.0, FDP: 18.0, Mitte: 33.0, GLP: 2.0, Gruene: 5.0 } },
    24: { abbr: 'NE', name: 'Neuenburg', result: { SVP: 18.0, SP: 25.0, FDP: 20.0, Mitte: 6.0, GLP: 7.0, Gruene: 12.0 } },
    25: { abbr: 'GE', name: 'Genf', result: { SVP: 15.0, SP: 20.0, FDP: 17.0, Mitte: 7.0, GLP: 8.0, Gruene: 16.0 } },
    26: { abbr: 'JU', name: 'Jura', result: { SVP: 14.0, SP: 26.0, FDP: 12.0, Mitte: 28.0, GLP: 2.0, Gruene: 7.0 } }
  };

  let selectedParty: PartySelection = 'SP';
  let activeId = 1;

  function decodeArc(reference: number): Point[] {
    const arc = topology.arcs[reference >= 0 ? reference : -reference - 1];
    const points: Point[] = [];
    let x = 0;
    let y = 0;

    for (const [dx, dy] of arc) {
      x += dx;
      y += dy;
      points.push([
        x * topology.transform.scale[0] + topology.transform.translate[0],
        y * topology.transform.scale[1] + topology.transform.translate[1]
      ]);
    }

    return reference >= 0 ? points : points.reverse();
  }

  function ringToPoints(ring: number[]): Point[] {
    return ring.flatMap((reference, index) => {
      const points = decodeArc(reference);
      return index === 0 ? points : points.slice(1);
    });
  }

  function round(value: number) {
    return Math.round(value * 10) / 10;
  }

  function ringToPath(ring: number[]) {
    const points = ringToPoints(ring);
    if (points.length === 0) return '';

    return points
      .map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${round(x)} ${round(y)}`)
      .join(' ') + ' Z';
  }

  function ringsForGeometry(geometry: TopoGeometry): number[][][] {
    return geometry.type === 'Polygon' ? [geometry.arcs as number[][]] : (geometry.arcs as number[][][]);
  }

  function geometryPath(geometry: TopoGeometry) {
    return ringsForGeometry(geometry)
      .flatMap((polygon) => polygon.map((ring) => ringToPath(ring)))
      .join(' ');
  }

  function geometryCentroid(geometry: TopoGeometry): Point {
    const points = ringsForGeometry(geometry)
      .flatMap((polygon) => polygon)
      .flatMap((ring) => ringToPoints(ring));

    const xs = points.map(([x]) => x);
    const ys = points.map(([, y]) => y);

    return [
      (Math.min(...xs) + Math.max(...xs)) / 2,
      (Math.min(...ys) + Math.max(...ys)) / 2
    ];
  }

  const cantons: CantonShape[] = topology.objects.cantons.geometries
    .map((geometry) => {
      const meta = cantonMeta[geometry.id];
      return {
        id: geometry.id,
        abbr: meta.abbr,
        name: meta.name,
        path: geometryPath(geometry),
        centroid: geometryCentroid(geometry),
        result: meta.result
      };
    })
    .sort((a, b) => a.id - b.id);

  $: activeCanton = cantons.find((canton) => canton.id === activeId) ?? cantons[0];
  $: activeDominant = dominantParty(activeCanton.result);
  $: activeTopParties = rankedParties(activeCanton.result).slice(0, 4);
  $: activeOtherShare = Math.max(0, 100 - Object.values(activeCanton.result).reduce((sum, value) => sum + value, 0));
  $: activeTooltipStyle = tooltipStyle(activeCanton);

  function rankedParties(result: CantonResult) {
    return (Object.entries(result) as Array<[PartyKey, number]>).sort(([, a], [, b]) => b - a);
  }

  function dominantParty(result: CantonResult) {
    return rankedParties(result)[0][0];
  }

  function selectedShare(canton: CantonShape) {
    return selectedParty === 'dominant'
      ? canton.result[dominantParty(canton.result)]
      : canton.result[selectedParty];
  }

  function cantonFill(canton: CantonShape) {
    return selectedParty === 'dominant'
      ? partyColors[dominantParty(canton.result)]
      : partyColors[selectedParty];
  }

  function cantonOpacity(canton: CantonShape) {
    const share = selectedShare(canton);
    return 0.38 + Math.min(share, 42) / 42 * 0.55;
  }

  function tooltipStyle(canton: CantonShape) {
    const left = ((canton.centroid[0] - viewBox.x) / viewBox.width) * 100;
    const top = ((canton.centroid[1] - viewBox.y) / viewBox.height) * 100;
    const isUpperCanton = top < 38;
    const safeLeft = Math.min(82, Math.max(18, left));
    const safeTop = isUpperCanton
      ? Math.min(46, Math.max(24, top))
      : Math.min(72, Math.max(18, top));
    const transform = isUpperCanton ? 'translate(-50%, 22px)' : 'translate(-50%, -115%)';

    return `left:${safeLeft}%;top:${safeTop}%;--tooltip-transform:${transform};`;
  }

  function formatPercent(value: number) {
    return `${value.toFixed(1).replace('.', ',')}%`;
  }

  function selectCanton(event: Event) {
    activeId = Number((event.currentTarget as HTMLSelectElement).value);
  }
</script>

{#if variant === 'hero'}
  <div class="swiss-party-map hero" aria-hidden="true">
    <svg class="swiss-map-svg" viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}>
      <defs>
        <filter id={shadowId} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="20" stdDeviation="18" flood-color="#000000" flood-opacity="0.24" />
          <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#000000" flood-opacity="0.16" />
        </filter>

        <linearGradient id={redId} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#ff3a32" />
          <stop offset="46%" stop-color="#e41224" />
          <stop offset="100%" stop-color="#990612" />
        </linearGradient>
      </defs>

      <g class="hero-map-depth" filter={`url(#${shadowId})`}>
        {#each cantons as canton}
          <path class="hero-depth deep" d={canton.path} transform="translate(0 22)" />
        {/each}
        {#each cantons as canton}
          <path class="hero-depth mid" d={canton.path} transform="translate(0 12)" />
        {/each}
      </g>

      <g class="hero-map-top">
        {#each cantons as canton}
          <path class="hero-canton" d={canton.path} fill={`url(#${redId})`} />
        {/each}
        <g class="swiss-cross" transform="translate(486 248) rotate(-12)">
          <rect x="-92" y="-27" width="184" height="54" rx="2" />
          <rect x="-27" y="-92" width="54" height="184" rx="2" />
        </g>
      </g>
    </svg>
  </div>
{:else}
  <div class="swiss-party-map feature" class:revealed aria-label="Interaktive Kantonskarte mit Parteianteilen">
    <div class="canton-map-stage">
      <div class="party-map-toolbar" aria-label="Partei auswählen">
        {#each parties as party}
          <button
            type="button"
            class:active={selectedParty === party.key}
            on:click={() => (selectedParty = party.key)}
          >
            <span style="background: {party.color};"></span>
            {party.label}
          </button>
        {/each}
      </div>

      <label class="canton-picker">
        <span>Kanton auswählen</span>
        <select value={activeId} on:change={selectCanton}>
          {#each cantons as canton}
            <option value={canton.id}>{canton.name}</option>
          {/each}
        </select>
      </label>

      <svg class="canton-map-svg" viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`} role="img">
        <title>Parteistärken nach Schweizer Kantonen</title>
        <g class="canton-depth">
          {#each cantons as canton}
            <path d={canton.path} fill="#7c074a" transform="translate(0 10)" />
          {/each}
        </g>

        <g class="cantons">
          {#each cantons as canton, index}
            <path
              class="canton-path"
              class:active={activeId === canton.id}
              d={canton.path}
              fill={cantonFill(canton)}
              fill-opacity={cantonOpacity(canton)}
              stroke="#151515"
              style={`--delay:${90 + index * 26}ms;`}
              tabindex="0"
              role="button"
              aria-label={`${canton.name}: ${partyLabels[dominantParty(canton.result)]} stärkste Partei mit ${formatPercent(canton.result[dominantParty(canton.result)])}`}
              on:mouseenter={() => (activeId = canton.id)}
              on:focus={() => (activeId = canton.id)}
              on:click={() => (activeId = canton.id)}
              on:keydown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  activeId = canton.id;
                }
              }}
            />
          {/each}
        </g>

        <path class="active-outline" d={activeCanton.path} />
      </svg>

      <div class="canton-tooltip" style={activeTooltipStyle}>
        <div class="canton-badge" aria-hidden="true">{activeCanton.abbr}</div>
        <div class="canton-tooltip-body">
          <div class="canton-tooltip-title">
            <span>{activeCanton.name}</span>
            <strong>{partyLabels[activeDominant]} vorne</strong>
          </div>
          <div class="selected-share">
            {#if selectedParty === 'dominant'}
              Stärkste Partei: {formatPercent(activeCanton.result[activeDominant])}
            {:else}
              {partyLabels[selectedParty]}: {formatPercent(activeCanton.result[selectedParty])}
            {/if}
          </div>
          <div class="party-share-list">
            {#each activeTopParties as [party, share]}
              <span>
                <i style="background: {partyColors[party]};"></i>
                {partyLabels[party]} {formatPercent(share)}
              </span>
            {/each}
            <span class="other-share">Andere {formatPercent(activeOtherShare)}</span>
          </div>
        </div>
      </div>
    </div>

    <p class="map-disclaimer">
      Prototyp-Datensatz: Parteianteile pro Kanton sind für die Interaktion verdichtet. Die Geometrie basiert auf swisstopo-Kantonsgrenzen.
    </p>
  </div>
{/if}

<style>
  .swiss-party-map {
    position: relative;
    width: 100%;
    max-width: 920px;
    margin: 0 auto;
  }

  .swiss-map-svg,
  .canton-map-svg {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }

  .canton-map-svg {
    width: min(76%, 680px);
    max-width: 100%;
    margin: 36px auto 0;
    touch-action: manipulation;
  }

  .swiss-party-map.hero {
    opacity: 0.92;
    filter: saturate(1.04);
    animation: swiss-background-drift 22s ease-in-out infinite alternate;
    transform-origin: 52% 55%;
  }

  .hero-map-depth,
  .hero-map-top {
    transform-origin: 50% 55%;
  }

  .hero-depth.deep {
    fill: #7f0711;
    opacity: 0.44;
  }

  .hero-depth.mid {
    fill: color-mix(in srgb, var(--brand) 58%, #2a1010);
    opacity: 0.56;
  }

  .hero-canton {
    stroke: color-mix(in srgb, #ff372f 82%, #980812);
    stroke-width: 1.1;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }

  .swiss-cross rect {
    fill: #fff;
  }

  .swiss-party-map.feature {
    max-width: 900px;
    opacity: 0.12;
    filter: blur(1.4px) saturate(0.88);
    transform: perspective(1100px) translateY(84px) translateZ(-120px) rotateX(18deg) scale(0.78);
    transform-origin: 50% 68%;
    transition:
      opacity 1100ms cubic-bezier(0.16, 1, 0.3, 1),
      filter 1200ms cubic-bezier(0.16, 1, 0.3, 1),
      transform 1500ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .swiss-party-map.feature.revealed {
    opacity: 1;
    filter: blur(0) saturate(1.02);
    transform: perspective(1100px) translateY(0) translateZ(0) rotateX(0deg) scale(1);
  }

  .party-map-toolbar {
    position: absolute;
    z-index: 4;
    top: 14px;
    left: 14px;
    right: 14px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    scrollbar-width: none;
  }

  .party-map-toolbar::-webkit-scrollbar {
    display: none;
  }

  .party-map-toolbar button {
    display: inline-flex;
    align-items: center;
    flex: 0 0 auto;
    gap: 7px;
    min-height: 34px;
    padding: 7px 11px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.74);
    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;
    overflow-wrap: normal;
    cursor: pointer;
    transition:
      background 180ms ease,
      border-color 180ms ease,
      color 180ms ease,
      transform 180ms ease;
  }

  .party-map-toolbar button:hover,
  .party-map-toolbar button.active {
    background: rgba(255, 255, 255, 0.14);
    border-color: rgba(255, 255, 255, 0.32);
    color: #fff;
    transform: translateY(-1px);
  }

  .party-map-toolbar span {
    width: 9px;
    height: 9px;
    border-radius: 999px;
  }

  .canton-picker {
    display: none;
  }

  .canton-picker span {
    color: var(--text-muted);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.08em;
    line-height: 1.2;
    text-transform: uppercase;
  }

  .canton-picker select {
    width: 100%;
    min-height: 44px;
    padding: 10px 12px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--surface);
    color: var(--text);
    font: 700 15px/1.2 'Source Sans 3', system-ui, sans-serif;
  }

  .canton-map-stage {
    position: relative;
    overflow: hidden;
    min-height: 310px;
    padding: clamp(38px, 3.5vw, 46px) clamp(16px, 2.2vw, 22px) clamp(14px, 2vw, 20px);
    background:
      radial-gradient(circle at 48% 52%, rgba(243, 13, 145, 0.24), transparent 39%),
      linear-gradient(135deg, #181818, #0f0f10);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    box-shadow: 0 28px 65px rgba(0, 0, 0, 0.34);
  }

  :global(:root[data-theme='light']) .canton-map-stage {
    background:
      radial-gradient(circle at 50% 52%, rgba(243, 13, 145, 0.16), transparent 42%),
      linear-gradient(135deg, #ffffff, #f1eee8);
    border-color: rgba(200, 16, 46, 0.14);
    box-shadow: 0 26px 60px rgba(48, 38, 28, 0.16);
  }

  :global(:root[data-theme='light']) .party-map-toolbar button {
    background: rgba(255, 255, 255, 0.78);
    border-color: rgba(26, 26, 26, 0.12);
    color: rgba(26, 26, 26, 0.72);
    box-shadow: 0 5px 18px rgba(48, 38, 28, 0.08);
  }

  :global(:root[data-theme='light']) .party-map-toolbar button:hover,
  :global(:root[data-theme='light']) .party-map-toolbar button.active {
    background: #ffffff;
    border-color: rgba(200, 16, 46, 0.26);
    color: #1a1a1a;
  }

  :global(:root[data-theme='light']) .canton-depth {
    opacity: 0.18;
  }

  :global(:root[data-theme='light']) .canton-depth path {
    fill: rgba(80, 42, 64, 0.32);
  }

  :global(:root[data-theme='light']) .canton-path:hover,
  :global(:root[data-theme='light']) .canton-path:focus-visible,
  :global(:root[data-theme='light']) .canton-path.active {
    filter: drop-shadow(0 0 9px rgba(200, 16, 46, 0.32));
  }

  :global(:root[data-theme='light']) .active-outline {
    stroke: #ffffff;
    filter: drop-shadow(0 0 7px rgba(200, 16, 46, 0.42));
  }

  .canton-depth {
    opacity: 0.42;
    filter: blur(1px);
  }

  .canton-depth path {
    stroke: none;
  }

  .canton-path {
    stroke-width: 1.05;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
    cursor: pointer;
    touch-action: manipulation;
    opacity: 0;
    transform-box: fill-box;
    transform-origin: center;
    animation: canton-in 820ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: var(--delay);
    transition:
      fill-opacity 180ms ease,
      filter 180ms ease,
      stroke 180ms ease;
  }

  .canton-path:hover,
  .canton-path:focus-visible,
  .canton-path.active {
    fill-opacity: 0.98;
    stroke: #fff;
    stroke-width: 2.35;
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.4));
    outline: none;
  }

  .active-outline {
    fill: none;
    stroke: #fff;
    stroke-width: 3;
    stroke-linejoin: round;
    pointer-events: none;
    vector-effect: non-scaling-stroke;
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.45));
  }

  .canton-tooltip {
    position: absolute;
    z-index: 3;
    display: grid;
    grid-template-columns: 34px minmax(0, 1fr);
    gap: 8px;
    width: min(270px, calc(100% - 28px));
    padding: 9px;
    pointer-events: none;
    background: rgba(255, 255, 255, 0.82);
    border: 1px solid rgba(255, 255, 255, 0.62);
    color: #171717;
    border-radius: 8px;
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.28);
    backdrop-filter: blur(13px) saturate(145%);
    transform: var(--tooltip-transform, translate(-50%, -115%));
    transition:
      left 260ms cubic-bezier(0.16, 1, 0.3, 1),
      top 260ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .canton-badge {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: 7px;
    background:
      linear-gradient(135deg, #fff 0 48%, #2b96d3 49% 100%);
    border: 1px solid #c8c8c8;
    color: #111;
    font: 800 11px 'IBM Plex Mono', monospace;
  }

  .canton-tooltip-title {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: baseline;
    font-weight: 800;
    line-height: 1.15;
    font-size: 14px;
  }

  .canton-tooltip-title strong {
    color: #9b9b9b;
    font-size: 10px;
    white-space: nowrap;
  }

  .selected-share {
    margin-top: 2px;
    color: #9a9a9a;
    font-weight: 700;
    font-size: 11px;
  }

  .party-share-list {
    display: flex;
    flex-wrap: wrap;
    gap: 5px 8px;
    margin-top: 6px;
    font-size: 10px;
    font-weight: 700;
    color: #9b9b9b;
  }

  .party-share-list span {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    white-space: nowrap;
  }

  .party-share-list i {
    width: 7px;
    height: 7px;
    border-radius: 999px;
  }

  .other-share {
    opacity: 0.78;
  }

  .map-disclaimer {
    margin-top: 10px;
    color: rgba(255, 255, 255, 0.54);
    font-size: 11px;
    line-height: 1.45;
  }

  :global(:root[data-theme='light']) .map-disclaimer {
    color: var(--text-subtle);
  }

  @keyframes canton-in {
    0% {
      opacity: 0;
      transform: translateY(14px) scale(0.985);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes swiss-background-drift {
    0% {
      transform: translate3d(0, 0, 0) rotate(-0.4deg);
    }
    100% {
      transform: translate3d(-10px, 12px, 0) rotate(0.7deg);
    }
  }

  @media (max-width: 720px) {
    .party-map-toolbar {
      position: static;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      margin-bottom: 12px;
      padding-bottom: 0;
    }

    .party-map-toolbar button {
      justify-content: center;
      min-width: 0;
      min-height: 42px;
      padding: 8px 9px;
    }

    .canton-map-stage {
      min-height: auto;
      padding: 14px;
      touch-action: pan-y;
    }

    .canton-picker {
      display: grid;
      gap: 6px;
      margin-bottom: 10px;
    }

    .canton-map-svg {
      width: 100%;
      margin-top: 4px;
    }

    .canton-tooltip {
      position: static;
      left: 50% !important;
      top: auto !important;
      width: 100%;
      margin-top: 12px;
      transform: none;
    }
  }

  @media (max-width: 380px) {
    .party-map-toolbar {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .swiss-party-map.feature,
    .swiss-party-map.hero,
    .canton-path {
      opacity: 1;
      transform: none;
      filter: none;
      transition: none;
      animation: none;
    }
  }
</style>
