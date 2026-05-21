<script lang="ts">
  import { page } from '$app/stores';
  $: pathname = $page.url.pathname;

  const links = [
    { href: '/admin', label: 'Dashboard', match: (p: string) => p === '/admin' },
    { href: '/admin/abstimmungen', label: 'Abstimmungen', match: (p: string) => p.startsWith('/admin/abstimmungen') },
    { href: '/admin/interessen', label: 'Interessen', match: (p: string) => p.startsWith('/admin/interessen') },
    { href: '/admin/community', label: 'Community', match: (p: string) => p.startsWith('/admin/community') }
  ];
</script>

<div class="bg-surface-alt border-b border-border-light">
  <div class="container-app py-3 flex items-center gap-4 overflow-x-auto">
    <span class="font-mono-data text-xs font-bold text-brand uppercase tracking-widest whitespace-nowrap">
      ⚙ Admin
    </span>
    <nav class="flex items-center gap-1 flex-1" aria-label="Admin-Navigation">
      {#each links as link}
        <a
          href={link.href}
          class="px-3 py-1.5 text-sm font-semibold rounded-md transition-colors whitespace-nowrap {link.match(pathname) ? 'bg-surface text-brand shadow-soft' : 'text-ink-muted hover:text-ink'}"
        >
          {link.label}
        </a>
      {/each}
    </nav>
    <form method="POST" action="/admin/logout">
      <button type="submit" class="text-xs text-ink-muted underline hover:text-ink">Abmelden</button>
    </form>
  </div>
</div>

<slot />
