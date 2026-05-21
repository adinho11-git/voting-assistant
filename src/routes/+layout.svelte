<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import TopNav from '$lib/components/TopNav.svelte';
  import BottomNav from '$lib/components/BottomNav.svelte';
  import ToastContainer from '$lib/components/ToastContainer.svelte';
  import { loadVotesFromStorage } from '$lib/stores/votes';

  $: hideNavOnDetail = $page.url.pathname.includes('/argumente/');
  $: hideNav = hideNavOnDetail || $page.url.pathname.startsWith('/admin/login');

  onMount(() => {
    loadVotesFromStorage();
  });
</script>

<div class="app-shell">
  <TopNav />

  <main class="app-main">
    {#key $page.url.pathname}
      <div class="page-wrap" in:fly={{ y: 14, duration: 220, delay: 60 }} out:fade={{ duration: 80 }}>
        <slot />
      </div>
    {/key}
  </main>

  {#if !hideNav}
    <div class="bottom-nav-spacer md:hidden" />
    <BottomNav />
  {/if}

  <ToastContainer />
</div>
