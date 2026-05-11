<script lang="ts">
  import '../app.css';
  import BottomNav from '$lib/components/BottomNav.svelte';
  import { page } from '$app/stores';

  // Hide bottom nav on argument detail pages for cleaner focus
  $: hideNav = $page.url.pathname.includes('/argumente/');
</script>

<div class="app-container">
  <slot />
  {#if !hideNav}
    <div class="bottom-nav-spacer" />
    <BottomNav />
  {/if}
</div>
