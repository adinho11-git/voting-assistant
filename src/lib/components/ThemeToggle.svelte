<script lang="ts">
  import { theme, toggleTheme } from '$lib/stores/theme';
</script>

<button
  type="button"
  on:click={toggleTheme}
  class="theme-toggle"
  aria-label="Theme umschalten (aktuell: {$theme})"
  title="Hell/Dunkel umschalten"
>
  {#if $theme === 'dark'}
    <!-- Sun icon -->
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path stroke-linecap="round" d="M12 2.2v2.2m0 15.2v2.2M4.8 4.8l1.6 1.6m11.2 11.2 1.6 1.6M2.2 12h2.2m15.2 0h2.2M4.8 19.2l1.6-1.6m11.2-11.2 1.6-1.6" />
    </svg>
  {:else}
    <!-- Moon icon -->
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  {/if}
</button>
