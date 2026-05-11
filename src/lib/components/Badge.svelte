<script lang="ts">
  export let position: 'JA' | 'NEIN';
  export let size: 'sm' | 'md' = 'sm';
</script>

<span class="
  inline-flex items-center font-bold rounded-full tracking-wider
  {position === 'JA' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}
  {size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1'}
">
  {position}
</span>
