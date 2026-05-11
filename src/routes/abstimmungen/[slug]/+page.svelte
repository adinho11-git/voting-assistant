<script lang="ts">
  import type { PageData } from './$types';
  import AppBar from '$lib/components/AppBar.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import ParteiGrid from '$lib/components/ParteiGrid.svelte';
  import { formatDate } from '$lib/mockData';
  import { goto } from '$app/navigation';

  export let data: PageData;

  let activeTab: 'pro-contra' | 'parteien' | 'quellen' | 'faq' = 'pro-contra';

  $: a = data.abstimmung;
  $: dateStr = formatDate(a.date);
  $: todayStr = new Date().toLocaleDateString('de-CH', { day: 'numeric', month: 'long', year: 'numeric' });

  const tabs = [
    { id: 'pro-contra', label: 'Pro / Contra' },
    { id: 'parteien', label: 'Parteien' },
    { id: 'quellen', label: 'Quellen' },
    { id: 'faq', label: 'FAQ' }
  ] as const;
</script>

<svelte:head>
  <title>{a.shortTitle} – Briefing</title>
</svelte:head>

<AppBar title="Abstimmung {dateStr}" backHref="/abstimmungen" showBookmark={true} />

<div class="px-4 pt-4 pb-2">
  <!-- Title Card -->
  <div class="card p-4 mb-4">
    <h1 class="font-serif text-xl leading-snug text-gray-900 mb-1">{a.title}</h1>
    <p class="text-xs text-gray-500 font-mono">KI-Zusammenfassung · Quelle: admin.ch · Stand {todayStr}</p>
    <p class="text-sm text-gray-700 mt-3 leading-relaxed">{a.aiSummary}</p>
  </div>

  <!-- Tabs -->
  <div class="flex gap-0 border-b border-gray-200 mb-4 -mx-1 overflow-x-auto">
    {#each tabs as tab}
      <button
        on:click={() => activeTab = tab.id}
        class="px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0
          {activeTab === tab.id
            ? 'text-brand-blue border-b-2 border-brand-blue -mb-px'
            : 'text-gray-500'}"
      >
        {tab.label}
      </button>
    {/each}
  </div>

  <!-- PRO / CONTRA -->
  {#if activeTab === 'pro-contra'}
    <div class="grid grid-cols-2 gap-2.5 mb-4">
      <!-- PRO -->
      <div class="rounded-2xl border border-green-200 bg-green-50 p-3">
        <div class="flex items-center gap-1.5 mb-3">
          <span class="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">✓</span>
          <span class="text-xs font-bold text-green-700 uppercase tracking-wider">PRO</span>
        </div>
        <div class="space-y-3">
          {#each a.proArguments as arg}
            <a href="/abstimmungen/{a.slug}/argumente/{arg.id}" class="block group">
              <p class="text-xs text-gray-800 leading-snug group-hover:text-green-700 transition-colors">{arg.text}</p>
              <p class="text-[10px] text-green-600 mt-0.5 underline underline-offset-2">{arg.source} ›</p>
            </a>
          {/each}
        </div>
      </div>

      <!-- CONTRA -->
      <div class="rounded-2xl border border-red-200 bg-red-50 p-3">
        <div class="flex items-center gap-1.5 mb-3">
          <span class="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold">✗</span>
          <span class="text-xs font-bold text-red-700 uppercase tracking-wider">CONTRA</span>
        </div>
        <div class="space-y-3">
          {#each a.contraArguments as arg}
            <a href="/abstimmungen/{a.slug}/argumente/{arg.id}" class="block group">
              <p class="text-xs text-gray-800 leading-snug group-hover:text-red-700 transition-colors">{arg.text}</p>
              <p class="text-[10px] text-red-500 mt-0.5 underline underline-offset-2">{arg.source} ›</p>
            </a>
          {/each}
        </div>
      </div>
    </div>

    <!-- Party overview mini -->
    <div class="card p-4 mb-3">
      <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Parteipositionen</h3>
      <ParteiGrid parteien={a.parteien} />
      <p class="text-[10px] text-gray-400 mt-2 text-center">
        Bundesrat: <span class="font-bold {a.bundesratPosition === 'JA' ? 'text-green-600' : 'text-red-600'}">{a.bundesratPosition}</span>
        &nbsp;·&nbsp;
        Parlament: <span class="font-bold {a.parlamentPosition === 'JA' ? 'text-green-600' : 'text-red-600'}">{a.parlamentPosition}</span>
        ({a.parlamentStimmen.ja}:{a.parlamentStimmen.nein})
      </p>
    </div>

    <!-- Source footer -->
    <div class="flex items-center gap-2 py-2 px-3 bg-blue-50 rounded-xl mb-4">
      <svg class="w-4 h-4 text-brand-blue flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-[10px] text-blue-700">Alle Argumente mit Originalquellen hinterlegt · Stand: {todayStr}</p>
    </div>

    <!-- CTA -->
    <a href="https://www.ch.ch/de/abstimmungen/" target="_blank" rel="noopener" class="btn-primary block mb-2 text-sm">
      Jetzt informiert abstimmen →
    </a>

  <!-- PARTEIEN TAB -->
  {:else if activeTab === 'parteien'}
    <div class="space-y-2.5 mb-4">
      {#each a.parteien as partei}
        <div class="card px-4 py-3 flex items-center gap-3">
          <div class="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style="background-color: {partei.color}">
            {partei.kuerzel.slice(0, 3)}
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-sm text-gray-900">{partei.name}</p>
            <p class="text-xs text-gray-500 italic leading-snug mt-0.5">{partei.statement}</p>
          </div>
          <Badge position={partei.position} size="md" />
        </div>
      {/each}
    </div>
    <!-- Parliament bar -->
    <div class="card p-4 mb-4">
      <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Stimmenverhältnis Parlament</p>
      <div class="h-3 rounded-full bg-red-200 overflow-hidden mb-1">
        <div class="h-full bg-green-500 rounded-full transition-all"
          style="width: {Math.round(a.parlamentStimmen.ja / (a.parlamentStimmen.ja + a.parlamentStimmen.nein) * 100)}%">
        </div>
      </div>
      <div class="flex justify-between text-[10px] font-mono">
        <span class="text-green-600 font-semibold">JA {a.parlamentStimmen.ja} ({Math.round(a.parlamentStimmen.ja / (a.parlamentStimmen.ja + a.parlamentStimmen.nein) * 100)}%)</span>
        <span class="text-red-600 font-semibold">NEIN {a.parlamentStimmen.nein} ({Math.round(a.parlamentStimmen.nein / (a.parlamentStimmen.ja + a.parlamentStimmen.nein) * 100)}%)</span>
      </div>
    </div>

  <!-- QUELLEN TAB -->
  {:else if activeTab === 'quellen'}
    <div class="card p-4 mb-3">
      <div class="flex items-start gap-3">
        <span class="text-2xl">📚</span>
        <div>
          <p class="font-semibold text-sm text-gray-900">Wie wir arbeiten</p>
          <p class="text-xs text-gray-500 mt-1 leading-relaxed">Alle Argumente stammen aus offiziellen, öffentlich zugänglichen Quellen. Die KI-Zusammenfassung ist darauf ausgelegt, neutral und faktenbasiert zu sein — ohne politische Wertung.</p>
        </div>
      </div>
    </div>
    <div class="space-y-2 mb-4">
      {#each [['Bundeskanzlei (admin.ch)', 'Abstimmungsbüchlein · offiziell'], ['Initiativtext', 'Originalwortlaut der Vorlage'], ['Parteien-Argumentarien', 'SP · GP · GLP · Mitte · FDP · SVP'], ['Studien & Gutachten', 'BFE · BAFU · Seco · Wirtschaftsverbände']] as [title, sub]}
        <div class="card px-4 py-3 flex items-center justify-between">
          <div>
            <p class="font-semibold text-sm text-gray-900">{title}</p>
            <p class="text-xs text-gray-400">{sub}</p>
          </div>
          <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      {/each}
    </div>

  <!-- FAQ TAB -->
  {:else if activeTab === 'faq'}
    <div class="space-y-2 mb-4">
      {#each [
        ['Wie neutral ist die KI-Zusammenfassung?', 'Die KI-Zusammenfassung basiert auf offiziellen Dokumenten und ist so kalibriert, dass sie Argumente aller Seiten gleichwertig darstellt. Es werden keine eigenen Wertungen eingebracht.'],
        ['Wer steht hinter dieser App?', 'Diese App wurde als Prototyp im Rahmen des ZHAW Prototyping-Moduls (FS 2026) entwickelt. Sie ist kein kommerzielles Produkt und hat keine politische Agenda.'],
        ['Werden meine Daten gespeichert?', 'Nein. Die App speichert keine persönlichen Nutzerdaten. Es werden keine Cookies gesetzt und kein Tracking durchgeführt.'],
        ['Kann ich Fehler melden?', 'Ja — bitte melde Fehler oder inhaltliche Ungenauigkeiten über GitHub Issues. Der Link befindet sich im Footer der Quellen-Seite.']
      ] as [q, a_text]}
        <details class="card px-4 py-3 group">
          <summary class="font-semibold text-sm text-gray-900 cursor-pointer list-none flex justify-between items-center">
            {q}
            <svg class="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <p class="text-xs text-gray-500 leading-relaxed mt-2">{a_text}</p>
        </details>
      {/each}
    </div>
  {/if}
</div>
