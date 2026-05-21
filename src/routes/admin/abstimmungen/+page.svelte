<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate } from '$lib/mockData';
  import Badge from '$lib/components/Badge.svelte';
  export let data: PageData;
</script>

<svelte:head>
  <title>Admin – Abstimmungen verwalten</title>
</svelte:head>

<section class="container-app pt-8 pb-6">
  <div class="flex items-end justify-between flex-wrap gap-4 mb-2">
    <div>
      <p class="section-eyebrow mb-1">Verwaltung</p>
      <h1 class="font-display text-3xl text-ink">Abstimmungen</h1>
    </div>
    <a href="/admin/abstimmungen/new" class="btn-primary">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Neue Abstimmung
    </a>
  </div>
  <p class="text-ink-muted text-sm">{data.abstimmungen.length} Vorlage{data.abstimmungen.length === 1 ? '' : 'n'} im System.</p>
</section>

<section class="container-app pb-20">
  <div class="card overflow-hidden">
    <table class="w-full text-sm">
      <thead class="bg-surface-alt text-ink-muted font-mono-data text-xs uppercase tracking-wider">
        <tr>
          <th class="px-4 py-3 text-left">Slug</th>
          <th class="px-4 py-3 text-left">Titel</th>
          <th class="px-4 py-3 text-left hidden md:table-cell">Datum</th>
          <th class="px-4 py-3 text-center hidden md:table-cell">BR</th>
          <th class="px-4 py-3 text-right">Aktionen</th>
        </tr>
      </thead>
      <tbody>
        {#each data.abstimmungen as a}
          <tr class="border-t border-border-light">
            <td class="px-4 py-3 font-mono-data text-xs text-ink-muted">{a.slug}</td>
            <td class="px-4 py-3">
              <p class="font-semibold text-ink">{a.shortTitle}</p>
              <p class="text-xs text-ink-muted">{a.category}</p>
            </td>
            <td class="px-4 py-3 text-ink-muted text-xs hidden md:table-cell">{formatDate(a.date)}</td>
            <td class="px-4 py-3 text-center hidden md:table-cell">
              <Badge position={a.bundesratPosition} size="sm" />
            </td>
            <td class="px-4 py-3 text-right whitespace-nowrap">
              <a href="/admin/abstimmungen/{a.slug}/edit" class="text-brand font-semibold text-sm hover:underline">Bearbeiten</a>
              <form method="POST" action="?/delete" class="inline ml-3" on:submit={(e) => { if (!confirm('Wirklich löschen?')) e.preventDefault(); }}>
                <input type="hidden" name="slug" value={a.slug} />
                <button type="submit" class="text-contra font-semibold text-sm hover:underline">Löschen</button>
              </form>
            </td>
          </tr>
        {/each}

        {#if data.abstimmungen.length === 0}
          <tr><td colspan="5" class="px-4 py-12 text-center text-ink-muted">Keine Abstimmungen erfasst.</td></tr>
        {/if}
      </tbody>
    </table>
  </div>
</section>
