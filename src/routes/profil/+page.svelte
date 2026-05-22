<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import { votesStore, clearVote, clearAllVotes, setNote, setVote } from '$lib/stores/votes';
  import { showToast } from '$lib/stores/toast';
  import { PARTEIEN } from '$lib/parteiData';
  import { formatDate } from '$lib/mockData';
  import { kompassStore } from '$lib/stores/kompass';
  import { engagementStore, toggleFavorite, saveJournalEntry } from '$lib/stores/engagement';
  import Badge from '$lib/components/Badge.svelte';
  import type { ParteiKuerzel, UserPosition } from '$lib/types';

  export let data: PageData;

  let totalCountUp = 0;
  let jaCountUp = 0;
  let neinCountUp = 0;
  let undecidedCountUp = 0;
  let favoriteCountUp = 0;
  let editingSlug: string | null = null;
  let noteDraft = '';
  const voteOptions: UserPosition[] = ['JA', 'NEIN', 'UNENTSCHIEDEN'];

  $: votes = $votesStore;
  $: engagement = $engagementStore;
  $: favorites = engagement.favorites;
  $: voteEntries = Object.entries(votes);
  $: total = voteEntries.length;
  $: jaCount = voteEntries.filter(([, e]) => e.position === 'JA').length;
  $: neinCount = voteEntries.filter(([, e]) => e.position === 'NEIN').length;
  $: undecidedCount = voteEntries.filter(([, e]) => e.position === 'UNENTSCHIEDEN').length;
  $: bookmarked = data.abstimmungen
    .filter((abstimmung) => favorites[abstimmung.slug])
    .sort((a, b) => {
      if (a.status !== b.status) return a.status === 'anstehend' ? -1 : 1;
      const aTime = new Date(a.date).getTime();
      const bTime = new Date(b.date).getTime();
      return a.status === 'anstehend' ? aTime - bTime : bTime - aTime;
    });

  $: history = voteEntries
    .map(([slug, entry]) => {
      const abstimmung = data.abstimmungen.find((a) => a.slug === slug);
      return abstimmung ? { abstimmung, ...entry } : null;
    })
    .filter(<T,>(x: T | null): x is T => x !== null)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  interface PartyMatch {
    kuerzel: ParteiKuerzel;
    name: string;
    color: string;
    match: number;
    matched: number;
    out_of: number;
  }

  $: matches = computeMatches(history);

  function computeMatches(items: typeof history): PartyMatch[] {
    const list: PartyMatch[] = [];
    for (const partei of PARTEIEN) {
      let matched = 0;
      let possible = 0;
      for (const item of items) {
        if (item.position === 'UNENTSCHIEDEN') continue; // skip undecided for match
        const partyPos = item.abstimmung.parteien.find((p) => p.kuerzel === partei.kuerzel)?.position;
        if (!partyPos) continue;
        possible++;
        if (partyPos === item.position) matched++;
      }
      const match = possible > 0 ? Math.round((matched / possible) * 100) : 0;
      list.push({ kuerzel: partei.kuerzel, name: partei.name, color: partei.farbe, match, matched, out_of: possible });
    }
    return list.sort((a, b) => b.match - a.match);
  }

  function removeVote(slug: string): void {
    clearVote(slug);
    showToast('Position entfernt.', 'info');
  }

  function startEditNote(slug: string, currentNote: string | undefined): void {
    editingSlug = slug;
    noteDraft = currentNote ?? '';
  }

  function saveNote(slug: string): void {
    setNote(slug, noteDraft.trim());
    editingSlug = null;
    showToast('Notiz gespeichert.', 'success');
  }

  function cancelNote(): void {
    editingSlug = null;
    noteDraft = '';
  }

  function clearAll(): void {
    if (typeof window === 'undefined') return;
    if (!confirm('Alle gespeicherten Positionen und Notizen wirklich löschen?')) return;
    clearAllVotes();
    showToast('Alle Positionen gelöscht.', 'info');
  }

  function removeFavorite(slug: string, title: string): void {
    if (!favorites[slug]) return;
    toggleFavorite(slug, title);
    showToast('Aus der Merkliste entfernt.', 'info');
  }

  function updateJournalVote(slug: string, title: string, position: UserPosition): void {
    setVote(slug, position);
    saveJournalEntry(
      slug,
      { position },
      {
        type: 'position',
        title: 'Stimme im Profil angepasst',
        detail: `${title}: ${positionLabel(position)}`
      }
    );
    showToast('Stimme aktualisiert.', 'success');
  }

  function animateCountTo(target: number, current: number, set: (v: number) => void): void {
    if (current === target) return;
    const diff = target - current;
    const steps = Math.min(30, Math.max(1, Math.abs(diff) * 5));
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const next = Math.round(current + (diff * step) / steps);
      set(next);
      if (step >= steps) {
        clearInterval(interval);
        set(target);
      }
    }, 18);
  }

  let prevTotal = 0;
  let prevFavoriteTotal = 0;
  $: if (total !== prevTotal || bookmarked.length !== prevFavoriteTotal) {
    animateCountTo(total, totalCountUp, (v) => (totalCountUp = v));
    animateCountTo(jaCount, jaCountUp, (v) => (jaCountUp = v));
    animateCountTo(neinCount, neinCountUp, (v) => (neinCountUp = v));
    animateCountTo(undecidedCount, undecidedCountUp, (v) => (undecidedCountUp = v));
    animateCountTo(bookmarked.length, favoriteCountUp, (v) => (favoriteCountUp = v));
    prevTotal = total;
    prevFavoriteTotal = bookmarked.length;
  }

  onMount(() => {
    animateCountTo(total, 0, (v) => (totalCountUp = v));
    animateCountTo(jaCount, 0, (v) => (jaCountUp = v));
    animateCountTo(neinCount, 0, (v) => (neinCountUp = v));
    animateCountTo(undecidedCount, 0, (v) => (undecidedCountUp = v));
    animateCountTo(bookmarked.length, 0, (v) => (favoriteCountUp = v));
  });

  function positionLabel(p: UserPosition): string {
    return p === 'UNENTSCHIEDEN' ? 'Unsicher' : p;
  }
</script>

<svelte:head>
  <title>Mein Profil – Voting Assistant</title>
  <meta name="description" content="Persönliches Voting-Journal — alle gespeicherten Positionen, Notizen und deine Partei-Übereinstimmung. Daten bleiben lokal im Browser." />
</svelte:head>

<section class="container-app pt-8 md:pt-12 pb-6">
  <p class="section-eyebrow mb-2">Persönliches Voting-Journal</p>
  <h1 class="font-display text-3xl md:text-4xl text-ink mb-2">Mein Profil</h1>
  <p class="text-ink-muted text-sm md:text-base max-w-2xl">
    Alle gespeicherten Positionen und Notizen — lokal in deinem Browser, niemals an einen Server gesendet.
  </p>
</section>

<!-- IDENTITY + STATS -->
<section class="container-app pb-6">
  <div class="card p-6 md:p-8">
    <div class="grid md:grid-cols-5 gap-6 md:gap-8 items-center">
      <div class="flex items-center gap-4 md:col-span-1">
        <div class="w-16 h-16 rounded-full bg-brand text-white font-display text-2xl font-bold flex items-center justify-center flex-shrink-0">A</div>
        <div>
          <p class="font-display text-xl text-ink leading-none">Anonym</p>
          <p class="text-xs text-ink-muted mt-1 font-mono-data uppercase tracking-wider">Lokales Profil</p>
        </div>
      </div>

      <div class="md:col-span-4 grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div>
          <p class="font-mono-data text-3xl md:text-4xl font-medium text-ink">{totalCountUp}</p>
          <p class="text-xs text-ink-muted uppercase tracking-wider font-mono-data">Positionen</p>
        </div>
        <div>
          <p class="font-mono-data text-3xl md:text-4xl font-medium text-pro">{jaCountUp}</p>
          <p class="text-xs text-ink-muted uppercase tracking-wider font-mono-data">JA</p>
        </div>
        <div>
          <p class="font-mono-data text-3xl md:text-4xl font-medium text-contra">{neinCountUp}</p>
          <p class="text-xs text-ink-muted uppercase tracking-wider font-mono-data">NEIN</p>
        </div>
        <div>
          <p class="font-mono-data text-3xl md:text-4xl font-medium text-ink-muted">{undecidedCountUp}</p>
          <p class="text-xs text-ink-muted uppercase tracking-wider font-mono-data">Offen</p>
        </div>
        <div>
          <p class="font-mono-data text-3xl md:text-4xl font-medium text-brand">{favoriteCountUp}</p>
          <p class="text-xs text-ink-muted uppercase tracking-wider font-mono-data">Merkliste</p>
        </div>
      </div>
    </div>
  </div>
</section>

{#if total === 0 && !$kompassStore && bookmarked.length === 0}
  <section class="container-app pb-20">
    <div class="card p-12 text-center">
      <p class="text-5xl mb-4" aria-hidden="true">🗳</p>
      <h2 class="font-display text-2xl text-ink mb-2">Noch keine Einträge</h2>
      <p class="text-ink-muted mb-6 max-w-md mx-auto">
        Stimme bei einer Vorlage ab oder mach das Kompass-Quiz — danach erscheinen hier deine Positionen, Notizen und die Partei-Übereinstimmung.
      </p>
      <div class="flex flex-wrap gap-3 justify-center">
        <a href="/abstimmungen" class="btn-primary">Zu den Abstimmungen</a>
        <a href="/kompass" class="btn-secondary">Kompass-Quiz starten</a>
      </div>
    </div>
  </section>
{:else}
  <!-- KOMPASS RESULT -->
  {#if $kompassStore}
    <section class="container-app pb-6">
      <div class="card p-6 md:p-8">
        <div class="flex items-end justify-between mb-3 border-b border-border-light pb-2 flex-wrap gap-3">
          <div>
            <p class="section-eyebrow mb-1">Partei-Kompass</p>
            <h2 class="font-display text-2xl text-ink">Dein Quiz-Ergebnis</h2>
          </div>
          <a href="/kompass" class="text-sm font-semibold text-brand hover:text-brand-dark">
            Quiz öffnen →
          </a>
        </div>
        <p class="text-sm text-ink-muted mb-4">
          Top-Match: <strong style="color: {$kompassStore.results[0]?.color};">{$kompassStore.results[0]?.kuerzel}</strong>
          mit <span class="font-mono-data">{$kompassStore.results[0]?.match}%</span>.
          Gespeichert am {new Date($kompassStore.savedAt).toLocaleString('de-CH')}.
        </p>
        <div class="space-y-2">
          {#each $kompassStore.results.slice(0, 3) as r, i}
            <div class="flex items-center gap-3">
              <span class="font-mono-data text-xs font-semibold text-ink-muted w-4 text-right">{i + 1}.</span>
              <div
                class="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold"
                style="background: {r.color};"
              >
                {r.kuerzel.slice(0, 4)}
              </div>
              <div class="flex-1">
                <div class="match-bar" style="height: 22px;">
                  <div class="match-bar-fill" style="width: {Math.max(r.match, 4)}%; background: {r.color}; font-size: 11px;">
                    {r.match}%
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>
  {/if}

  {#if bookmarked.length > 0}
    <section class="container-app pb-6">
      <div class="card p-6 md:p-8">
        <div class="flex items-end justify-between mb-5 border-b border-border-light pb-3 flex-wrap gap-3">
          <div>
            <p class="section-eyebrow mb-1">Merkliste</p>
            <h2 class="font-display text-2xl text-ink">Gemerkte Abstimmungen</h2>
          </div>
          <span class="text-xs font-mono-data text-ink-muted">
            {bookmarked.length} {bookmarked.length === 1 ? 'Vorlage' : 'Vorlagen'} gespeichert
          </span>
        </div>

        <div class="grid lg:grid-cols-2 gap-4">
          {#each bookmarked as abstimmung}
            {@const journal = engagement.journal[abstimmung.slug]}
            {@const savedPosition = votes[abstimmung.slug]?.position ?? journal?.position}
            <article class="bookmark-card">
              <div class="flex items-start justify-between gap-4 mb-4">
                <div class="min-w-0">
                  <p class="font-mono-data text-[11px] uppercase tracking-wider text-ink-subtle mb-2">
                    {formatDate(abstimmung.date)} · {abstimmung.category}
                  </p>
                  <a href="/abstimmungen/{abstimmung.slug}" class="group">
                    <h3 class="font-display text-xl text-ink leading-tight group-hover:text-brand transition-colors">
                      {abstimmung.shortTitle}
                    </h3>
                  </a>
                </div>
                <span class="bookmark-status {abstimmung.status === 'anstehend' ? 'bookmark-status-upcoming' : 'bookmark-status-past'}">
                  {abstimmung.status === 'anstehend' ? 'Anstehend' : 'Vergangen'}
                </span>
              </div>

              <p class="text-sm text-ink-muted leading-relaxed mb-4">
                {abstimmung.aiSummary}
              </p>

              <div class="bookmark-context">
                <div>
                  <span class="bookmark-context-label">Bundesrat</span>
                  <Badge position={abstimmung.bundesratPosition} size="sm" />
                </div>
                <div>
                  <span class="bookmark-context-label">Parlament</span>
                  <Badge position={abstimmung.parlamentPosition} size="sm" />
                </div>
                {#if savedPosition}
                  <div>
                    <span class="bookmark-context-label">Deine Position</span>
                    <span class="{savedPosition === 'JA' ? 'badge-ja' : savedPosition === 'NEIN' ? 'badge-nein' : 'badge-neutral'}" style="font-size:10px; padding: 2px 8px;">
                      {savedPosition === 'UNENTSCHIEDEN' ? 'OFFEN' : savedPosition}
                    </span>
                  </div>
                {/if}
                {#if journal?.confidence}
                  <div>
                    <span class="bookmark-context-label">Sicherheit</span>
                    <span class="font-mono-data text-xs font-semibold text-ink">{journal.confidence}%</span>
                  </div>
                {/if}
              </div>

              {#if journal?.note}
                <p class="bookmark-note">«{journal.note}»</p>
              {/if}

              <div class="flex flex-wrap gap-3 mt-5">
                <a href="/abstimmungen/{abstimmung.slug}" class="btn-primary text-sm">
                  Briefing öffnen
                </a>
                <button
                  type="button"
                  class="btn-secondary text-sm"
                  on:click={() => removeFavorite(abstimmung.slug, abstimmung.shortTitle)}
                >
                  Aus Merkliste entfernen
                </button>
              </div>
            </article>
          {/each}
        </div>
      </div>
    </section>
  {/if}

  {#if matches.some((m) => m.out_of > 0)}
    <!-- PARTY MATCH FROM VOTES -->
    <section class="container-app pb-6">
      <div class="card p-6 md:p-8">
        <div class="flex items-end justify-between mb-5 border-b border-border-light pb-3 flex-wrap gap-3">
          <div>
            <p class="section-eyebrow mb-1">Aus deinen JA/NEIN-Positionen</p>
            <h2 class="font-display text-2xl text-ink">Partei-Übereinstimmung</h2>
          </div>
          <span class="text-xs font-mono-data text-ink-muted">Basis: {jaCount + neinCount} Positionen</span>
        </div>

        <div class="space-y-3">
          {#each matches as m}
            {#if m.out_of > 0}
              <a href="/parteien/{m.kuerzel.toLowerCase()}" class="block">
                <div class="flex items-center gap-3 mb-1">
                  <div
                    class="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold"
                    style="background: {m.color};"
                  >
                    {m.kuerzel.slice(0, 4)}
                  </div>
                  <span class="font-semibold text-sm text-ink flex-1">{m.kuerzel}</span>
                  <span class="font-mono-data text-xs text-ink-muted">{m.matched}/{m.out_of}</span>
                </div>
                <div class="match-bar">
                  <div class="match-bar-fill" style="width: {Math.max(m.match, 4)}%; background: {m.color};">
                    {m.match}%
                  </div>
                </div>
              </a>
            {/if}
          {/each}
        </div>

        <p class="text-xs text-ink-subtle mt-5">
          Berechnung: Übereinstimmung deiner Position mit der offiziellen Parteiposition pro Vorlage (UNENTSCHIEDEN zählt nicht).
        </p>
      </div>
    </section>
  {/if}

  <!-- HISTORY / JOURNAL -->
  {#if history.length > 0}
    <section class="container-app pb-20">
      <div class="flex items-end justify-between mb-5 border-b border-border-light pb-3 flex-wrap gap-3">
        <div>
          <p class="section-eyebrow mb-1">Deine Einträge</p>
          <h2 class="font-display text-2xl text-ink">Voting-Journal</h2>
        </div>
        <button type="button" on:click={clearAll} class="text-sm text-ink-muted underline hover:text-contra">
          Alle löschen
        </button>
      </div>

      <div class="space-y-4">
        {#each history as item}
          <article
            class="journal-card"
            class:journal-is-ja={item.position === 'JA'}
            class:journal-is-nein={item.position === 'NEIN'}
            class:journal-is-open={item.position === 'UNENTSCHIEDEN'}
          >
            <div class="journal-head">
              <a href="/abstimmungen/{item.abstimmung.slug}" class="journal-title group">
                <span class="journal-meta">
                  {formatDate(item.abstimmung.date)} · {item.abstimmung.category}
                </span>
                <span class="journal-name group-hover:text-brand">
                  {item.abstimmung.shortTitle}
                </span>
              </a>
              <button
                type="button"
                on:click={() => removeVote(item.abstimmung.slug)}
                class="journal-remove"
                aria-label="Position entfernen"
              >
                Entfernen
              </button>
            </div>

            <div class="journal-panel">
              <div class="journal-own-position">
                <div class="journal-position-topline">
                  <span class="journal-label">Deine Stimme</span>
                  <span class="{item.position === 'JA' ? 'badge-ja' : item.position === 'NEIN' ? 'badge-nein' : 'badge-neutral'} journal-current-pill">
                    {positionLabel(item.position)}
                  </span>
                </div>
                <div class="journal-vote-switch" aria-label="Stimme anpassen">
                  {#each voteOptions as option}
                    <button
                      type="button"
                      class="journal-vote-option"
                      class:is-active={item.position === option}
                      class:is-ja={option === 'JA'}
                      class:is-nein={option === 'NEIN'}
                      on:click={() => updateJournalVote(item.abstimmung.slug, item.abstimmung.shortTitle, option)}
                      aria-pressed={item.position === option}
                    >
                      {positionLabel(option)}
                    </button>
                  {/each}
                </div>
              </div>

              <div class="journal-official-grid">
              <div class="journal-fact">
                <span class="journal-label">Bundesrat</span>
                <Badge position={item.abstimmung.bundesratPosition} size="sm" />
              </div>
              <div class="journal-fact">
                <span class="journal-label">Parlament</span>
                <Badge position={item.abstimmung.parlamentPosition} size="sm" />
              </div>
              {#if item.abstimmung.result}
                <div class="journal-fact">
                  <span class="journal-label">Endergebnis</span>
                  <span class="{item.abstimmung.result.accepted ? 'badge-ja' : 'badge-nein'}" style="font-size:9px;">
                    {item.abstimmung.result.accepted ? 'ANGENOMMEN' : 'ABGELEHNT'}
                  </span>
                </div>
              {/if}
              <div class="journal-fact">
                <span class="journal-label">Aktualisiert</span>
                <span class="font-mono-data text-xs text-ink-muted">{new Date(item.updatedAt).toLocaleDateString('de-CH')}</span>
              </div>
              </div>
            </div>

            <!-- Note -->
            {#if editingSlug === item.abstimmung.slug}
              <textarea
                bind:value={noteDraft}
                rows="3"
                maxlength="500"
                class="input-field text-sm mt-4 mb-2"
                placeholder="Notiz (lokal, max. 500 Zeichen)"
              />
              <div class="flex gap-2">
                <button type="button" on:click={() => saveNote(item.abstimmung.slug)} class="btn-primary text-sm">Speichern</button>
                <button type="button" on:click={cancelNote} class="btn-ghost text-sm">Abbrechen</button>
              </div>
            {:else if item.note}
              <div class="journal-note">
                <p class="text-sm text-ink leading-relaxed italic mb-2">«{item.note}»</p>
                <button type="button" on:click={() => startEditNote(item.abstimmung.slug, item.note)} class="text-xs text-brand hover:underline">
                  Notiz bearbeiten
                </button>
              </div>
            {:else}
              <button type="button" on:click={() => startEditNote(item.abstimmung.slug, '')} class="text-sm text-brand hover:underline mt-4">
                + Notiz hinzufügen
              </button>
            {/if}
          </article>
        {/each}
      </div>
    </section>
  {/if}
{/if}

<style>
  .journal-card {
    position: relative;
    overflow: hidden;
    border: 1px solid var(--border-light);
    border-left: 4px solid var(--text-subtle);
    border-radius: var(--radius-lg);
    background: var(--surface);
    padding: clamp(1rem, 2vw, 1.45rem);
    box-shadow: var(--shadow-sm);
  }

  .journal-is-ja {
    border-left-color: var(--pro);
  }

  .journal-is-nein {
    border-left-color: var(--contra);
  }

  .journal-is-open {
    border-left-color: var(--text-subtle);
  }

  .journal-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .journal-title {
    display: grid;
    gap: 0.25rem;
    min-width: 0;
  }

  .journal-meta,
  .journal-label {
    color: var(--text-muted);
    font-family: 'IBM Plex Mono', ui-monospace, monospace;
    font-size: 0.72rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .journal-name {
    color: var(--text);
    font-family: 'Fraunces', Georgia, serif;
    font-size: clamp(1.15rem, 1.5vw, 1.45rem);
    font-weight: 700;
    line-height: 1.1;
    transition: color 180ms ease;
  }

  .journal-remove {
    color: var(--text-muted);
    font-size: 0.85rem;
    text-decoration: underline;
    white-space: nowrap;
    transition: color 160ms ease;
  }

  .journal-remove:hover {
    color: var(--contra);
  }

  .journal-panel {
    display: grid;
    grid-template-columns: minmax(260px, 0.9fr) minmax(0, 1.5fr);
    gap: 1rem;
    align-items: stretch;
    border-top: 1px solid var(--border-light);
    padding-top: 1rem;
  }

  .journal-own-position,
  .journal-official-grid {
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: var(--surface-alt);
    padding: 0.9rem;
  }

  .journal-own-position {
    display: grid;
    gap: 0.8rem;
  }

  .journal-position-topline,
  .journal-fact {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .journal-current-pill {
    font-size: 0.72rem;
    padding: 0.24rem 0.7rem;
    white-space: nowrap;
  }

  .journal-vote-switch {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.45rem;
  }

  .journal-vote-option {
    min-height: 42px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--surface);
    color: var(--text-muted);
    font-size: 0.82rem;
    font-weight: 800;
    transition:
      transform 160ms ease,
      border-color 160ms ease,
      background 160ms ease,
      color 160ms ease;
  }

  .journal-vote-option:hover {
    transform: translateY(-1px);
    border-color: var(--brand);
    color: var(--brand);
  }

  .journal-vote-option.is-active {
    background: var(--surface);
    color: var(--text);
    box-shadow: inset 0 0 0 2px var(--text);
  }

  .journal-vote-option.is-active.is-ja {
    background: var(--pro);
    border-color: var(--pro);
    color: white;
    box-shadow: none;
  }

  .journal-vote-option.is-active.is-nein {
    background: var(--contra);
    border-color: var(--contra);
    color: white;
    box-shadow: none;
  }

  .journal-official-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem 1rem;
  }

  .journal-fact {
    min-height: 38px;
    border-bottom: 1px solid var(--border-light);
    padding-bottom: 0.35rem;
  }

  .journal-note {
    margin-top: 1rem;
    border-radius: var(--radius);
    background: var(--surface-alt);
    padding: 0.95rem 1rem;
  }

  .journal-note p {
    margin: 0 0 0.65rem;
    color: var(--text);
    font-size: 0.95rem;
    font-style: italic;
    line-height: 1.55;
  }

  .bookmark-card {
    position: relative;
    overflow: hidden;
    border: 1px solid var(--border-light);
    border-radius: var(--radius-lg);
    background:
      linear-gradient(135deg, color-mix(in srgb, var(--brand-soft) 42%, transparent), transparent 42%),
      var(--surface);
    padding: clamp(1.1rem, 2vw, 1.5rem);
    box-shadow: var(--shadow-sm);
    transition:
      transform 180ms ease,
      border-color 180ms ease,
      box-shadow 180ms ease;
  }

  .bookmark-card::before {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: 4px;
    background: var(--brand);
  }

  .bookmark-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--brand) 34%, var(--border-light));
    box-shadow: var(--shadow-md);
  }

  .bookmark-status {
    border: 1px solid var(--border-light);
    border-radius: var(--radius-full);
    padding: 0.28rem 0.65rem;
    color: var(--text-muted);
    font-family: 'IBM Plex Mono', ui-monospace, monospace;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .bookmark-status-upcoming {
    border-color: color-mix(in srgb, var(--brand) 34%, var(--border-light));
    background: var(--brand-soft);
    color: var(--brand);
  }

  .bookmark-status-past {
    background: var(--surface-alt);
  }

  .bookmark-context {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
    border-top: 1px solid var(--border-light);
    border-bottom: 1px solid var(--border-light);
    padding: 0.9rem 0;
  }

  .bookmark-context > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    min-width: 0;
  }

  .bookmark-context-label {
    color: var(--text-muted);
    font-family: 'IBM Plex Mono', ui-monospace, monospace;
    font-size: 0.68rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .bookmark-note {
    margin-top: 1rem;
    border-left: 3px solid var(--brand);
    background: var(--surface-alt);
    border-radius: 0 var(--radius) var(--radius) 0;
    color: var(--text-muted);
    font-size: 0.9rem;
    font-style: italic;
    line-height: 1.55;
    padding: 0.75rem 0.9rem;
  }

  @media (max-width: 640px) {
    .journal-head,
    .journal-position-topline,
    .journal-fact {
      align-items: flex-start;
      flex-direction: column;
    }

    .journal-panel,
    .journal-official-grid {
      grid-template-columns: 1fr;
    }

    .journal-vote-switch {
      grid-template-columns: 1fr;
    }

    .bookmark-context {
      grid-template-columns: 1fr;
    }
  }
</style>
