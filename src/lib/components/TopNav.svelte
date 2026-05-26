<script lang="ts">
  import { page } from '$app/stores';
  import ThemeToggle from './ThemeToggle.svelte';

  const links: Array<{ href: string; label: string; shortLabel?: string; match: (p: string) => boolean }> = [
    { href: '/abstimmungen', label: 'Abstimmungen', match: (p: string) => p.startsWith('/abstimmungen') },
    { href: '/parteien', label: 'Parteien', match: (p: string) => p.startsWith('/parteien') },
    { href: '/kompass', label: 'Kompass', match: (p: string) => p.startsWith('/kompass') },
    { href: '/profil', label: 'Profil', match: (p: string) => p.startsWith('/profil') },
    { href: '/quellen', label: 'Quellen & Medienberichte', shortLabel: 'Quellen', match: (p: string) => p.startsWith('/quellen') }
  ];

  $: path = $page.url.pathname;
</script>

<header class="top-nav hidden md:block" data-sveltekit-preload-code="viewport">
  <div class="container-app top-nav-inner">
    <a href="/" class="flex items-center gap-2.5 group min-w-0" aria-label="Voting Assistant Home">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true" class="flex-shrink-0">
        <rect width="32" height="32" rx="4" fill="#C8102E" />
        <rect x="13" y="7" width="6" height="18" fill="white" />
        <rect x="7" y="13" width="18" height="6" fill="white" />
      </svg>
      <span class="hidden lg:inline font-display text-xl font-bold tracking-tight text-ink group-hover:text-brand transition-colors truncate">
        Voting Assistant
      </span>
    </a>

    <nav class="flex items-center gap-4 lg:gap-7" aria-label="Hauptnavigation">
      {#each links as link}
        <a href={link.href} class="top-nav-link {link.match(path) ? 'active' : ''}">
          {#if link.shortLabel}
            <span class="hidden xl:inline">{link.label}</span>
            <span class="xl:hidden">{link.shortLabel}</span>
          {:else}
            {link.label}
          {/if}
        </a>
      {/each}
    </nav>

    <ThemeToggle />
  </div>
</header>
