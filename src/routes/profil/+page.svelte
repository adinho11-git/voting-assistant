<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import { votesStore, clearVote, clearAllVotes, setNote } from '$lib/stores/votes';
  import { showToast } from '$lib/stores/toast';
  import { PARTEIEN } from '$lib/parteiData';
  import { formatDate } from '$lib/mockData';
  import { kompassStore } from '$lib/stores/kompass';
  import Badge from '$lib/components/Badge.svelte';
  import type { ParteiKuerzel, UserPosition } from '$lib/types';

  export let data: PageData;

  let totalCountUp = 0;
  let jaCountUp = 0;
  let neinCountUp = 0;
  let undecidedCountUp = 0;
  let editingSlug: string | null = null;
  let noteDraft = '';

  $: votes = $votesStore;
  $: voteEntries = Object.entries(votes);
  $: total = voteEntries.length;
  $: jaCount = voteEntries.filter(([, e]) => e.position === 'JA').length;
  $: neinCount = voteEntries.filter(([, e]) => e.position === 'NEIN').length;
  $: undecidedCount = voteEntries.filter(([, e]) => e.position === 'UNENTSCHIEDEN').length;

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
  $: if (total !== prevTotal) {
    animateCountTo(total, totalCountUp, (v) => (totalCountUp = v));
    animateCountTo(jaCount, jaCountUp, (v) => (jaCountUp = v));
    animateCountTo(neinCount, neinCountUp, (v) => (neinCountUp = v));
    animateCountTo(undecidedCount, undecidedCountUp, (v) => (undecidedCountUp = v));
    prevTotal = total;
  }

  onMount(() => {
    animateCountTo(total, 0, (v) => (totalCountUp = v));
    animateCountTo(jaCount, 0, (v) => (jaCountUp = v));
    animateCountTo(neinCount, 0, (v) => (neinCountUp = v));
    animateCountTo(undecidedCount, 0, (v) => (undecidedCountUp = v));
  });

  function positionLabel(p: UserPosition): string {
    return p === 'UNENTSCHIEDEN' ? '?' : p;
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

      <div class="md:col-span-4 grid grid-cols-4 gap-4">
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
      </div>
    </div>
  </div>
</section>

{#if total === 0 && !$kompassStore}
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
          <div class="card p-5">
            <div class="flex items-start gap-4 flex-wrap mb-3">
              <span class="{item.position === 'JA' ? 'badge-ja' : item.position === 'NEIN' ? 'badge-nein' : 'badge-neutral'}" style="font-size:12px; padding: 4px 12px;">
                {item.position === 'UNENTSCHIEDEN' ? '? UNENTSCHIEDEN' : positionLabel(item.position)}
              </span>
              <a href="/abstimmungen/{item.abstimmung.slug}" class="flex-1 min-w-0 group">
                <p class="font-mono-data text-[10px] text-ink-subtle uppercase tracking-wider mb-0.5">
                  {formatDate(item.abstimmung.date)} · {item.abstimmung.category}
                </p>
                <p class="font-display text-base text-ink leading-snug group-hover:text-brand transition-colors">
                  {item.abstimmung.shortTitle}
                </p>
              </a>
              <button
                type="button"
                on:click={() => removeVote(item.abstimmung.slug)}
                class="text-xs text-ink-subtle hover:text-contra underline whitespace-nowrap"
                aria-label="Position entfernen"
              >
                Entfernen
              </button>
            </div>

            <!-- Comparison row -->
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3 text-xs">
              <div class="flex justify-between border-b border-border-light pb-1">
                <span class="text-ink-muted">Bundesrat</span>
                <Badge position={item.abstimmung.bundesratPosition} size="sm" />
              </div>
              <div class="flex justify-between border-b border-border-light pb-1">
                <span class="text-ink-muted">Parlament</span>
                <Badge position={item.abstimmung.parlamentPosition} size="sm" />
              </div>
              {#if item.abstimmung.result}
                <div class="flex justify-between border-b border-border-light pb-1">
                  <span class="text-ink-muted">Endergebnis</span>
                  <span class="{item.abstimmung.result.accepted ? 'badge-ja' : 'badge-nein'}" style="font-size:9px;">
                    {item.abstimmung.result.accepted ? 'ANGENOMMEN' : 'ABGELEHNT'}
                  </span>
                </div>
              {/if}
              <div class="flex justify-between border-b border-border-light pb-1">
                <span class="text-ink-muted">Aktualisiert</span>
                <span class="font-mono-data text-ink-muted">{new Date(item.updatedAt).toLocaleDateString('de-CH')}</span>
              </div>
            </div>

            <!-- Note -->
            {#if editingSlug === item.abstimmung.slug}
              <textarea
                bind:value={noteDraft}
                rows="3"
                maxlength="500"
                class="input-field text-sm mb-2"
                placeholder="Notiz (lokal, max. 500 Zeichen)"
              />
              <div class="flex gap-2">
                <button type="button" on:click={() => saveNote(item.abstimmung.slug)} class="btn-primary text-sm">Speichern</button>
                <button type="button" on:click={cancelNote} class="btn-ghost text-sm">Abbrechen</button>
              </div>
            {:else if item.note}
              <div class="p-3 rounded-lg" style="background: var(--surface-alt);">
                <p class="text-sm text-ink leading-relaxed italic mb-2">«{item.note}»</p>
                <button type="button" on:click={() => startEditNote(item.abstimmung.slug, item.note)} class="text-xs text-brand hover:underline">
                  Notiz bearbeiten
                </button>
              </div>
            {:else}
              <button type="button" on:click={() => startEditNote(item.abstimmung.slug, '')} class="text-sm text-brand hover:underline">
                + Notiz hinzufügen
              </button>
            {/if}
          </div>
        {/each}
      </div>
    </section>
  {/if}
{/if}
