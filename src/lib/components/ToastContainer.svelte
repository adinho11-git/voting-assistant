<script lang="ts">
  import { toasts, dismissToast } from '$lib/stores/toast';
  import { fly } from 'svelte/transition';
</script>

<div class="toast-stack" aria-live="polite" aria-atomic="true">
  {#each $toasts as toast (toast.id)}
    <button
      type="button"
      class="toast toast-{toast.type} text-left"
      in:fly={{ y: 20, duration: 280 }}
      out:fly={{ y: 20, duration: 200 }}
      on:click={() => dismissToast(toast.id)}
      aria-label="Benachrichtigung schliessen: {toast.message}"
    >
      {toast.message}
    </button>
  {/each}
</div>

<style>
  .toast {
    border: none;
    cursor: pointer;
    font-family: inherit;
  }
</style>
