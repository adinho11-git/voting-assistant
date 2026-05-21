<script lang="ts">
  import { page } from '$app/stores';

  const links = [
    { href: '/abstimmungen', label: 'Abstimmungen', match: (p: string) => p.startsWith('/abstimmungen') },
    { href: '/parteien', label: 'Parteien', match: (p: string) => p.startsWith('/parteien') },
    { href: '/kompass', label: 'Kompass', match: (p: string) => p.startsWith('/kompass') },
    { href: '/profil', label: 'Profil', match: (p: string) => p.startsWith('/profil') },
    { href: '/quellen', label: 'Quellen', match: (p: string) => p.startsWith('/quellen') }
  ];

  $: path = $page.url.pathname;
</script>

<header class="top-nav hidden md:block">
  <div class="container-app top-nav-inner">
    <a href="/" class="flex items-center gap-2.5 group" aria-label="Voting Assistant Home">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true" class="flex-shrink-0">
        <rect width="32" height="32" rx="4" fill="#C8102E" />
        <rect x="13" y="7" width="6" height="18" fill="white" />
        <rect x="7" y="13" width="18" height="6" fill="white" />
      </svg>
      <span class="font-display text-xl font-bold tracking-tight text-ink group-hover:text-brand transition-colors">
        Voting Assistant
      </span>
    </a>

    <nav class="flex items-center gap-7" aria-label="Hauptnavigation">
      {#each links as link}
        <a
          href={link.href}
          class="top-nav-link {link.match(path) ? 'active' : ''}"
        >
          {link.label}
        </a>
      {/each}
    </nav>

    <div class="flex items-center gap-2">
      <a href="/admin" class="btn-ghost text-sm" aria-label="Admin-Bereich">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m0 0v3m0-3h-3m3 0h3M5 8a7 7 0 0114 0v3a2 2 0 002 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 002-2V8z" />
        </svg>
        Admin
      </a>
    </div>
  </div>
</header>
