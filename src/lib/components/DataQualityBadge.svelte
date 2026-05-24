<script lang="ts">
  import type { DataQuality } from '$lib/types';
  export let quality: DataQuality;

  const labels: Record<DataQuality, string> = {
    official: 'Offiziell · admin.ch',
    'official-pending': 'Offizielle Quelle in Prüfung',
    demo: 'Demo-/Seed-Daten'
  };

  const cls: Record<DataQuality, string> = {
    official: 'dq-official',
    'official-pending': 'dq-pending',
    demo: 'dq-demo'
  };
</script>

<span class="dq-badge {cls[quality]}" title={labels[quality]}>
  {#if quality === 'demo'}
    ⚠
  {:else if quality === 'official-pending'}
    ⌛
  {:else}
    ✓
  {/if}
  {labels[quality]}
</span>
