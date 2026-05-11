<script lang="ts">
  import { page } from '$app/stores';

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
      href: '#',
      label: 'Merkliste',
      active: () => false,
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />`
    },
    {
      href: '#',
      label: 'Profil',
      active: () => false,
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />`
    }
  ];
</script>

<nav class="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200"
  style="padding-bottom: env(safe-area-inset-bottom, 0px);">
  <div class="max-w-[430px] mx-auto flex">
    {#each tabs as tab}
      <a
        href={tab.href}
        class="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors
          {tab.active(path) ? 'text-brand-blue' : 'text-gray-400'}"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
          {@html tab.icon}
        </svg>
        <span class="text-[10px] font-medium leading-none">{tab.label}</span>
      </a>
    {/each}
  </div>
</nav>
