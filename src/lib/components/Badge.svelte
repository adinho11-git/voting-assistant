<script lang="ts">
  export let position: 'JA' | 'NEIN';
  export let size: 'sm' | 'md' | 'lg' = 'sm';
  export let pulse: boolean = false;

  $: cls = position === 'JA' ? 'badge-ja' : 'badge-nein';
  $: sizeStyle =
    size === 'sm'
      ? 'text-[10px] py-0.5 px-2'
      : size === 'md'
        ? 'text-xs py-1 px-3'
        : 'text-sm py-1.5 px-4';
</script>

<span class="{cls} {sizeStyle} {pulse ? 'badge-pulse' : ''}">
  {position}
</span>
