<script lang="ts">
  import type { Partei } from '$lib/types';
  export let parteien: Partei[];
</script>

<div class="grid grid-cols-3 gap-2">
  {#each parteien as partei}
    <div class="flex flex-col items-center gap-1 p-2 rounded-xl bg-gray-50 border border-gray-100">
      <div
        class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
        style="background-color: {partei.color}"
      >
        {partei.kuerzel.slice(0, 3)}
      </div>
      <span class="text-[10px] font-medium text-gray-600 leading-none">{partei.kuerzel}</span>
      <span class="text-[10px] font-bold {partei.position === 'JA' ? 'text-green-600' : 'text-red-600'}">
        {partei.position}
      </span>
    </div>
  {/each}
</div>
