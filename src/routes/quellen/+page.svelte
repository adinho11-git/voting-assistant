<script lang="ts">
  import AppBar from '$lib/components/AppBar.svelte';
</script>

<svelte:head>
  <title>Quellen & Transparenz – Voting Assistant</title>
</svelte:head>

<AppBar title="Quellen & Transparenz" backHref="/" />

<div class="px-4 pt-4 pb-6">
  <!-- How we work -->
  <div class="card p-4 mb-5 flex items-start gap-3">
    <span class="text-2xl flex-shrink-0">🏛</span>
    <div>
      <p class="font-semibold text-sm text-gray-900">Wie wir arbeiten</p>
      <p class="text-xs text-gray-500 leading-relaxed mt-1">
        Alle Argumente stammen aus offiziellen, öffentlich zugänglichen Quellen.
        Die KI fasst diese neutral zusammen — ohne politische Wertung oder eigene Meinung.
      </p>
    </div>
  </div>

  <!-- Sources list -->
  <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Verwendete Originalquellen</h3>
  <div class="space-y-2 mb-6">
    {#each [
      ['Bundeskanzlei (admin.ch)', 'Abstimmungsbüchlein · offiziell', 'https://www.admin.ch'],
      ['Initiativtext (vollständig)', 'Originalwortlaut der Vorlage', '#'],
      ['Parteien-Argumentarien (6)', 'SP · GP · GLP · Mitte · FDP · SVP', '#'],
      ['Studien & Gutachten (4)', 'ETH · BAFU · Seco · Wirtschaftsverbände', '#']
    ] as [title, sub, href]}
      <a {href} target="_blank" rel="noopener" class="card px-4 py-3 flex items-center gap-3 group">
        <div class="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div class="flex-1">
          <p class="font-semibold text-sm text-gray-900 group-hover:text-brand-blue transition-colors">{title}</p>
          <p class="text-xs text-gray-400">{sub}</p>
        </div>
        <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    {/each}
  </div>

  <!-- FAQ -->
  <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Häufige Fragen</h3>
  <div class="space-y-2 mb-6">
    {#each [
      ['Wie neutral ist die KI-Zusammenfassung?', 'Die KI-Zusammenfassung basiert auf offiziellen Dokumenten und ist darauf ausgelegt, Argumente aller Seiten gleichwertig darzustellen. Es werden keine eigenen politischen Wertungen eingebracht.'],
      ['Wer steht hinter dieser App?', 'Diese App wurde als studentischer Prototyp im Rahmen des ZHAW Prototyping-Moduls (FS 2026) entwickelt. Sie ist kein kommerzielles Produkt und verfolgt keine politische Agenda.'],
      ['Werden meine Daten gespeichert?', 'Nein. Die App speichert keine persönlichen Nutzerdaten. Es werden keine Cookies gesetzt und kein Tracking durchgeführt.'],
      ['Kann ich Fehler melden?', 'Ja — bitte melde Fehler oder inhaltliche Ungenauigkeiten über GitHub Issues. Den Link findest du am Ende dieser Seite.']
    ] as [q, a]}
      <details class="card px-4 py-3 group">
        <summary class="font-semibold text-sm text-gray-900 cursor-pointer list-none flex justify-between items-center">
          {q}
          <svg class="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180 flex-shrink-0 ml-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <p class="text-xs text-gray-500 leading-relaxed mt-2">{a}</p>
      </details>
    {/each}
  </div>

  <p class="text-center text-[10px] text-gray-400">
    Version 0.9 · Mai 2026 · <a href="https://github.com" class="underline">Open Source auf GitHub</a>
  </p>
</div>
