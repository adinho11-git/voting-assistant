<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate } from '$lib/mockData';
  export let data: PageData;

  $: total = data.rows.reduce((s, r) => s + r.community.total, 0);
</script>

<svelte:head>
  <title>Admin – Community-Stimmen</title>
</svelte:head>

<section class="container-app pt-8 pb-6">
  <p class="section-eyebrow mb-1">Verwaltung</p>
  <h1 class="font-display text-3xl text-ink mb-2">Community-Stimmen</h1>
  <p class="text-ink-muted text-sm">{total} Stimmen über {data.rows.length} Vorlagen.</p>
</section>

<section class="container-app pb-20">
  <div class="space-y-4">
    {#each data.rows as r}
      {@const jaPercent = r.community.total > 0 ? Math.round((r.community.ja / r.community.total) * 100) : 0}
      <div class="card p-5">
        <div class="flex items-end justify-between mb-2 gap-3 flex-wrap">
          <div>
            <p class="font-mono-data text-xs text-ink-subtle uppercase tracking-wider">{formatDate(r.date)}</p>
            <h3 class="font-display text-lg text-ink">{r.shortTitle}</h3>
          </div>
          <p class="font-mono-data text-2xl font-medium text-ink">{r.community.total}</p>
        </div>
        <div class="community-bar mb-1.5">
          <div class="bar-ja" style="width: {jaPercent}%" />
          <div class="bar-nein" style="width: {100 - jaPercent}%" />
        </div>
        <div class="flex justify-between text-xs font-mono-data font-semibold">
          <span class="text-pro">JA {r.community.ja} ({jaPercent}%)</span>
          <span class="text-contra">NEIN {r.community.nein} ({r.community.total > 0 ? 100 - jaPercent : 0}%)</span>
        </div>
      </div>
    {/each}
  </div>
</section>
