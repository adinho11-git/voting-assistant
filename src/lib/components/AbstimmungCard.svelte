<script lang="ts">
  import type { Abstimmung } from '$lib/types';
  import Badge from './Badge.svelte';
  import { formatDate } from '$lib/mockData';

  export let abstimmung: Abstimmung;
  export let featured: boolean = false;

  const categoryColors: Record<string, string> = {
    'Klimaschutz · Energiepolitik': 'bg-emerald-100 text-emerald-700',
    'Sozialversicherung · KVG': 'bg-blue-100 text-blue-700',
    'Wohnungspolitik': 'bg-orange-100 text-orange-700',
    'Verkehr · Infrastruktur': 'bg-purple-100 text-purple-700'
  };
  const color = categoryColors[abstimmung.category] ?? 'bg-gray-100 text-gray-600';
</script>

<a href="/abstimmungen/{abstimmung.slug}" class="block card p-4 hover:shadow-md transition-shadow active:scale-[0.99]">
  {#if featured}
    <!-- Featured / Hero card -->
    <div class="mb-3">
      <span class="font-mono text-xs text-brand-blue font-medium bg-brand-light px-2.5 py-1 rounded-full">
        Eidg. {formatDate(abstimmung.date).replace(/\d{4}$/, '2026')}
      </span>
    </div>
    <h2 class="font-serif text-xl leading-snug text-gray-900 mb-1">{abstimmung.title}</h2>
    <p class="text-sm text-gray-500 mb-4">{abstimmung.parlamentStimmen.ja + abstimmung.parlamentStimmen.nein > 0 ? abstimmung.parlamentStimmen.ja + abstimmung.parlamentStimmen.nein + ' Stimmende im Parlament' : '3 weitere Vorlagen am gleichen Termin'}</p>
    <div class="flex items-center gap-2">
      <span class="flex-1 font-semibold text-sm text-white bg-brand-blue rounded-xl py-3 text-center">
        Briefing öffnen →
      </span>
    </div>
  {:else}
    <!-- List card -->
    <div class="flex items-start gap-3">
      <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 {color}">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="font-semibold text-sm leading-snug text-gray-900 mb-0.5">{abstimmung.shortTitle}</h3>
        <p class="text-xs text-gray-500">{abstimmung.category}</p>
        <p class="text-xs text-gray-400 mt-0.5 font-mono">{abstimmung.readTime} Min · Bundesrat: <span class="{abstimmung.bundesratPosition === 'JA' ? 'text-green-600' : 'text-red-600'} font-bold">{abstimmung.bundesratPosition}</span></p>
      </div>
      <svg class="w-4 h-4 text-gray-300 flex-shrink-0 mt-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  {/if}
</a>
