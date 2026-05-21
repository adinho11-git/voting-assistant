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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path stroke-linecap="round" d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m12.73 0l-1.41-1.41M6.34 6.34L4.93 4.93" />
    </svg>
  {:else}
    <!-- Moon icon -->
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  {/if}
</button>
