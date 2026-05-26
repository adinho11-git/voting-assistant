<script lang="ts">
  import { page } from '$app/stores';
  import ThemeToggle from './ThemeToggle.svelte';

  $: path = $page.url.pathname;

  const tabs = [
    {
      href: '/',
      label: 'Home',
      active: (p: string) => p === '/',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />`
    },
    {
      href: '/abstimmungen',
      label: 'Abstimmungen',
      active: (p: string) => p.startsWith('/abstimmungen'),
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />`
    },
    {
      href: '/parteien',
      label: 'Parteien',
      active: (p: string) => p.startsWith('/parteien'),
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />`
    },
    {
      href: '/kompass',
      label: 'Kompass',
      active: (p: string) => p.startsWith('/kompass'),
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`
    },
    {
      href: '/profil',
      label: 'Profil',
      active: (p: string) => p.startsWith('/profil'),
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />`
    }
  ];

</script>

<nav class="bottom-nav md:hidden" aria-label="Mobile Navigation">
  <div class="bottom-nav-theme" aria-label="Darstellung">
    <ThemeToggle />
  </div>

  <div class="bottom-nav-inner">
    {#each tabs as tab}
      <a
        href={tab.href}
        class="flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-colors {tab.active(path) ? 'text-brand' : 'text-ink-muted'}"
        aria-current={tab.active(path) ? 'page' : undefined}
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">
          {@html tab.icon}
        </svg>
        <span class="text-[10px] font-semibold leading-none">{tab.label}</span>
      </a>
    {/each}
  </div>
</nav>
