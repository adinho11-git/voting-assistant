<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import TopNav from '$lib/components/TopNav.svelte';
  import BottomNav from '$lib/components/BottomNav.svelte';
  import ToastContainer from '$lib/components/ToastContainer.svelte';
  import DisclaimerRibbon from '$lib/components/DisclaimerRibbon.svelte';
  import { loadVotesFromStorage } from '$lib/stores/votes';
  import { loadEngagementFromStorage } from '$lib/stores/engagement';
  import { applyInitialTheme } from '$lib/stores/theme';

  $: hideNavOnDetail = $page.url.pathname.includes('/argumente/');
  $: isAdmin = $page.url.pathname.startsWith('/admin');
  $: hideNav = hideNavOnDetail || $page.url.pathname.startsWith('/admin/login');
  $: canonical = `https://friendly-llama-b738d4.netlify.app${$page.url.pathname}`;
  const siteTitle = 'Voting Assistant';
  const siteDescription = 'Interaktiver politischer Orientierungsassistent für Schweizer Abstimmungen und Parteipositionen.';

  onMount(() => {
    loadVotesFromStorage();
    loadEngagementFromStorage();
    applyInitialTheme();
  });
</script>

<svelte:head>
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content={siteTitle} />
  <meta property="og:description" content={siteDescription} />
  <meta property="og:site_name" content="AI Swiss Voting Assistant" />
  <meta property="og:locale" content="de_CH" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonical} />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<a href="#main-content" class="skip-link">Zum Hauptinhalt springen</a>

<div class="app-shell">
  {#if !isAdmin}
    <DisclaimerRibbon />
  {/if}
  <TopNav />

  <main id="main-content" class="app-main">
    {#key $page.url.pathname}
      <div class="page-wrap route-reveal">
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
