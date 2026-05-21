<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;

  function fmtDate(iso: string): string {
    return new Date(iso).toLocaleDateString('de-CH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
</script>

<svelte:head>
  <title>Admin – Interessen-Registrierungen</title>
</svelte:head>

<section class="container-app pt-8 pb-6">
  <div class="flex items-end justify-between gap-4 flex-wrap mb-2">
    <div>
      <p class="section-eyebrow mb-1">Verwaltung</p>
      <h1 class="font-display text-3xl text-ink">Interessen-Registrierungen</h1>
    </div>
    <a href="/api/admin/interessen.csv" class="btn-primary" download>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
      </svg>
      CSV-Export
    </a>
  </div>
  <p class="text-ink-muted text-sm">{data.interessen.length} Anfrage{data.interessen.length === 1 ? '' : 'n'} eingegangen.</p>
</section>

<section class="container-app pb-20">
  <div class="card overflow-hidden">
    <table class="w-full text-sm">
      <thead class="bg-surface-alt text-ink-muted font-mono-data text-xs uppercase tracking-wider">
        <tr>
          <th class="px-4 py-3 text-left">Datum</th>
          <th class="px-4 py-3 text-left">Partei</th>
          <th class="px-4 py-3 text-left">Name</th>
          <th class="px-4 py-3 text-left">E-Mail</th>
          <th class="px-4 py-3 text-left hidden md:table-cell">Nachricht</th>
        </tr>
      </thead>
      <tbody>
        {#each data.interessen as i}
          <tr class="border-t border-border-light">
            <td class="px-4 py-3 text-xs text-ink-muted whitespace-nowrap">{fmtDate(i.createdAt)}</td>
            <td class="px-4 py-3 font-mono-data text-xs font-bold text-brand">{i.parteiKuerzel}</td>
            <td class="px-4 py-3 text-ink">{i.name}</td>
            <td class="px-4 py-3">
              <a href="mailto:{i.email}" class="source-link text-sm">{i.email}</a>
            </td>
            <td class="px-4 py-3 text-xs text-ink-muted max-w-md hidden md:table-cell">{i.nachricht ?? '—'}</td>
          </tr>
        {/each}

        {#if data.interessen.length === 0}
          <tr><td colspan="5" class="px-4 py-12 text-center text-ink-muted">Noch keine Anfragen eingegangen.</td></tr>
        {/if}
      </tbody>
    </table>
  </div>
</section>
