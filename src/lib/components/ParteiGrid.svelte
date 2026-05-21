<script lang="ts">
  import type { Partei } from '$lib/types';
  export let parteien: Partei[];
</script>

<div class="grid grid-cols-3 sm:grid-cols-6 gap-2">
  {#each parteien as partei}
    <a
      href="/parteien/{partei.kuerzel.toLowerCase()}"
      class="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-surface-alt border border-border-light hover:border-border hover:-translate-y-0.5 transition-all"
      style="--ring-color: {partei.color};"
    >
      <div
        class="w-9 h-9 rounded-full flex items-center justify-center text-white text-[10px] font-bold ring-2 ring-offset-2 ring-offset-surface-alt"
        style="background-color: {partei.color}; --tw-ring-color: {partei.color}30;"
      >
        {partei.kuerzel.slice(0, 4)}
      </div>
      <span class="text-[10px] font-semibold text-ink leading-none">{partei.kuerzel}</span>
      <span class="text-[10px] font-bold {partei.position === 'JA' ? 'text-pro' : 'text-contra'}">
        {partei.position}
      </span>
    </a>
  {/each}
</div>
