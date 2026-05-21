<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<svelte:head>
  <title>Admin Dashboard – Voting Assistant</title>
</svelte:head>

<section class="container-app pt-8 pb-6">
  <p class="section-eyebrow mb-2">Übersicht</p>
  <h1 class="font-display text-3xl md:text-4xl text-ink mb-2">Dashboard</h1>
  <p class="text-ink-muted">Verwalte Vorlagen, Argumente, Parteipositionen und Interessen-Registrierungen.</p>
</section>

<section class="container-app pb-6">
  <div class="grid sm:grid-cols-3 gap-4">
    <a href="/admin/abstimmungen" class="card card-interactive p-6">
      <p class="font-mono-data text-3xl font-medium text-ink mb-1">{data.abstimmungenCount}</p>
      <p class="section-eyebrow">Abstimmungen verwalten</p>
      <p class="text-sm text-ink-muted mt-2">Neue erfassen, Argumente und Parteipositionen pflegen.</p>
    </a>
    <a href="/admin/interessen" class="card card-interactive p-6">
      <p class="font-mono-data text-3xl font-medium text-ink mb-1">{data.interessenCount}</p>
      <p class="section-eyebrow">Interessen-Registrierungen</p>
      <p class="text-sm text-ink-muted mt-2">Eingegangene Anfragen einsehen + als CSV exportieren.</p>
    </a>
    <a href="/admin/community" class="card card-interactive p-6">
      <p class="font-mono-data text-3xl font-medium text-ink mb-1">{data.communityVotesTotal}</p>
      <p class="section-eyebrow">Community-Stimmen</p>
      <p class="text-sm text-ink-muted mt-2">Aggregierte JA/NEIN-Statistik pro Vorlage.</p>
    </a>
  </div>
</section>

<section class="container-app pb-12">
  <div class="card p-6">
    <p class="section-eyebrow mb-3">System-Status</p>
    <dl class="grid sm:grid-cols-2 gap-3 text-sm">
      <div class="flex items-center justify-between">
        <dt class="text-ink-muted">Datenbank</dt>
        <dd class="font-mono-data text-ink font-semibold">
          {data.usingMock ? '🟡 Mock-Modus (in-memory)' : '🟢 MongoDB Atlas'}
        </dd>
      </div>
      <div class="flex items-center justify-between">
        <dt class="text-ink-muted">Mode</dt>
        <dd class="font-mono-data text-ink font-semibold">{data.usingMock ? 'USE_MOCK_DATA=true' : 'USE_MOCK_DATA=false'}</dd>
      </div>
    </dl>
    {#if data.usingMock}
      <p class="text-xs text-ink-subtle mt-3">
        Im Mock-Modus werden Änderungen in den Server-Memory geschrieben und sind nach einem Cold-Start weg. Für persistente Daten:
        <code class="bg-surface-alt px-1.5 py-0.5 rounded text-xs">MONGODB_URI</code> setzen und
        <code class="bg-surface-alt px-1.5 py-0.5 rounded text-xs">USE_MOCK_DATA=false</code> wählen.
      </p>
    {/if}
  </div>
</section>
