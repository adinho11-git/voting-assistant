<script lang="ts">
  import type { PageData } from './$types';
  import AppBar from '$lib/components/AppBar.svelte';
  import Badge from '$lib/components/Badge.svelte';

  export let data: PageData;
  $: a = data.abstimmung;
  $: jaPercent = Math.round(a.parlamentStimmen.ja / (a.parlamentStimmen.ja + a.parlamentStimmen.nein) * 100);
</script>

<svelte:head>
  <title>Parteipositionen – {a.shortTitle}</title>
</svelte:head>

<AppBar title="Parteipositionen" backHref="/abstimmungen/{a.slug}" />

<div class="px-4 pt-4 pb-6">
  <h2 class="font-serif text-xl text-gray-900 mb-0.5">{a.shortTitle}</h2>
  <p class="text-xs text-gray-500 mb-5">6 Parteien · Bundesrat · Parlament</p>

  <!-- Parliament bar -->
  <div class="card p-4 mb-5">
    <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Stimmenverhältnis Parlament</p>
    <div class="h-4 rounded-full bg-red-100 overflow-hidden mb-2">
      <div class="h-full bg-green-500 rounded-full transition-all duration-700"
        style="width: {jaPercent}%">
      </div>
    </div>
    <div class="flex justify-between text-xs font-mono font-semibold">
      <span class="text-green-600">JA {a.parlamentStimmen.ja} ({jaPercent}%)</span>
      <span class="text-red-600">NEIN {a.parlamentStimmen.nein} ({100 - jaPercent}%)</span>
    </div>
  </div>

  <!-- Party detail cards -->
  <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Detailübersicht</h3>
  <div class="space-y-2.5">
    {#each a.parteien as partei}
      <div class="card px-4 py-3.5 flex items-center gap-3">
        <div
          class="w-11 h-11 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style="background-color: {partei.color}"
        >
          {partei.kuerzel}
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-sm text-gray-900">{partei.name}</p>
          <p class="text-xs text-gray-500 italic leading-snug mt-0.5">{partei.statement}</p>
        </div>
        <Badge position={partei.position} size="md" />
      </div>
    {/each}
  </div>

  <!-- Bundesrat -->
  <div class="card px-4 py-3.5 flex items-center gap-3 mt-2.5">
    <div class="w-11 h-11 rounded-full bg-brand-blue flex items-center justify-center text-white text-xs font-bold flex-shrink-0">BR</div>
    <div class="flex-1">
      <p class="font-semibold text-sm text-gray-900">Bundesrat</p>
      <p class="text-xs text-gray-500 italic">Offizielle Empfehlung der Landesregierung</p>
    </div>
    <Badge position={a.bundesratPosition} size="md" />
  </div>

  <p class="text-[10px] text-gray-400 text-center mt-5">
    Quelle: Parlamentsabstimmung · Stand: {new Date().toLocaleDateString('de-CH')} · Aktualisiert täglich
  </p>
</div>
