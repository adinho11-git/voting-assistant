<script lang="ts">
  import type { PageData } from './$types';
  import { onMount, onDestroy } from 'svelte';
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
  let exportStatus = '';
  const voteOptions: UserPosition[] = ['JA', 'NEIN', 'UNENTSCHIEDEN'];

  $: votes = $votesStore;
  $: engagement = $engagementStore;
  $: favorites = engagement.favorites;
  $: voteEntries = Object.entries(votes);
  $: total = voteEntries.length;
  $: jaCount = voteEntries.filter(([, e]) => e.position === 'JA').length;
  $: neinCount = voteEntries.filter(([, e]) => e.position === 'NEIN').length;
  $: undecidedCount = voteEntries.filter(([, e]) => e.position === 'UNENTSCHIEDEN').length;
  $: decidedCount = jaCount + neinCount;
  $: lowData = total > 0 && total < 3;
  $: lowDecisionBase = decidedCount > 0 && decidedCount < 3;
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
      if (!abstimmung) return null;
      const journal = engagement.journal[slug];
      return {
        abstimmung,
        ...entry,
        confidence: journal?.confidence,
        journalNote: journal?.note
      };
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

  $: topKompass = $kompassStore?.results?.[0];
  $: secondKompass = $kompassStore?.results?.[1];
  $: kompassClose =
    !!topKompass && !!secondKompass && Math.abs(topKompass.match - secondKompass.match) < 5;

  interface ActivityItem {
    slug?: string;
    title: string;
    detail: string;
    createdAt: string;
    type: string;
    href?: string;
  }

  $: recentActivities = collectRecentActivities(
    engagement?.journal ?? {},
    data.abstimmungen,
    $kompassStore
  );

  function collectRecentActivities(
    journal: Record<string, { timeline?: Array<{ title: string; detail: string; createdAt: string; type: string }> }>,
    abstimmungen: typeof data.abstimmungen,
    kompass: typeof $kompassStore
  ): ActivityItem[] {
    const items: ActivityItem[] = [];

    for (const [slug, entry] of Object.entries(journal)) {
      const abstimmung = abstimmungen.find((a) => a.slug === slug);
      const title = abstimmung?.shortTitle ?? slug;
      for (const event of entry?.timeline ?? []) {
        items.push({
          slug,
          title: `${event.title} – ${title}`,
          detail: event.detail,
          createdAt: event.createdAt,
          type: event.type,
          href: abstimmung ? `/abstimmungen/${abstimmung.slug}` : undefined
        });
      }
    }

    if (kompass) {
      const top = kompass.results?.[0];
      items.push({
        title: 'Partei-Kompass abgeschlossen',
        detail: top ? `Stärkste Nähe: ${top.kuerzel} (${top.match}%)` : 'Quiz gespeichert',
        createdAt: kompass.savedAt,
        type: 'kompass',
        href: '/kompass'
      });
    }

    return items
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }

  function computeMatches(items: typeof history): PartyMatch[] {
    const list: PartyMatch[] = [];
    for (const partei of PARTEIEN) {
      let matched = 0;
      let possible = 0;
      for (const item of items) {
        if (item.position === 'UNENTSCHIEDEN') continue;
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

  function publicVoteMeta(slug: string) {
    const abstimmung = data.abstimmungen.find((a) => a.slug === slug);
    if (!abstimmung) return { slug };
    return {
      slug,
      title: abstimmung.shortTitle,
      category: abstimmung.category,
      date: abstimmung.date,
      status: abstimmung.status
    };
  }

  function buildProfileExport() {
    const exportedAt = new Date().toISOString();
    const journalEntries = Object.entries(engagement.journal ?? {}).map(([slug, entry]) => ({
      abstimmung: publicVoteMeta(slug),
      position: entry.position,
      confidence: entry.confidence,
      note: entry.note,
      updatedAt: entry.updatedAt,
      timeline: entry.timeline ?? []
    }));
    const savedVotes = Object.entries(votes).map(([slug, entry]) => ({
      abstimmung: publicVoteMeta(slug),
      position: entry.position,
      note: entry.note,
      updatedAt: entry.updatedAt
    }));
    const savedNotes = [
      ...Object.entries(votes)
        .filter(([, entry]) => !!entry.note)
        .map(([slug, entry]) => ({
          source: 'position',
          abstimmung: publicVoteMeta(slug),
          note: entry.note,
          updatedAt: entry.updatedAt
        })),
      ...Object.entries(engagement.journal ?? {})
        .filter(([, entry]) => !!entry.note)
        .map(([slug, entry]) => ({
          source: 'journal',
          abstimmung: publicVoteMeta(slug),
          note: entry.note,
          updatedAt: entry.updatedAt
        }))
    ];
    const confidenceValues = Object.entries(engagement.journal ?? {})
      .filter(([, entry]) => entry.confidence !== undefined)
      .map(([slug, entry]) => ({
        abstimmung: publicVoteMeta(slug),
        confidence: entry.confidence,
        updatedAt: entry.updatedAt
      }));
    const timeline = Object.entries(engagement.journal ?? {}).flatMap(([slug, entry]) =>
      (entry.timeline ?? []).map((event) => ({
        abstimmung: publicVoteMeta(slug),
        type: event.type,
        title: event.title,
        detail: event.detail,
        createdAt: event.createdAt
      }))
    );
    const favorites = Object.entries(engagement.favorites ?? {})
      .filter(([, isFavorite]) => isFavorite)
      .map(([slug]) => publicVoteMeta(slug));

    return {
      meta: {
        appName: 'Voting Assistant',
        exportVersion: '1.0',
        exportedAt,
        source: 'Lokaler Browser-Export',
        privacyNote:
          'Diese Datei wurde direkt im Browser aus lokal gespeicherten Profildaten erstellt. Es wurden keine Daten an einen Server gesendet.',
        contentsNote: 'Der Export dient deiner persönlichen Reflexion und ist keine Wahlempfehlung.'
      },
      summary: {
        savedPositions: savedVotes.length,
        journalEntries: journalEntries.length,
        notes: savedNotes.length,
        confidenceValues: confidenceValues.length,
        bookmarks: favorites.length,
        hasKompassResult: !!$kompassStore
      },
      votingJournal: journalEntries,
      savedPositions: savedVotes,
      savedNotes,
      confidenceValues,
      kompass: $kompassStore
        ? {
            savedAt: $kompassStore.savedAt,
            topResult: $kompassStore.results?.[0] ?? null,
            results: $kompassStore.results ?? [],
            answers: $kompassStore.answers ?? {}
          }
        : null,
      activities: {
        timeline,
        latestVisibleInProfile: recentActivities
      },
      bookmarks: favorites
    };
  }

  function exportProfileJson(): void {
    if (typeof window === 'undefined') return;

    try {
      const exportData = buildProfileExport();
      const date = new Date().toISOString().slice(0, 10);
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json;charset=utf-8'
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `voting-assistant-profil-export-${date}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      exportStatus = 'JSON-Export wurde lokal erstellt.';
      showToast('Profil als JSON exportiert.', 'success');
    } catch {
      exportStatus = 'Export konnte nicht erstellt werden. Bitte versuche es erneut.';
      showToast('Export fehlgeschlagen.', 'error');
    }
  }

  function printProfile(): void {
    if (typeof window === 'undefined') return;
    exportStatus = 'Druckdialog geöffnet. Wähle im Browser „Als PDF speichern“, falls gewünscht.';
    window.print();
  }

  const activeIntervals = new Set<ReturnType<typeof setInterval>>();

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
        activeIntervals.delete(interval);
        set(target);
      }
    }, 18);
    activeIntervals.add(interval);
  }

  onDestroy(() => {
    for (const interval of activeIntervals) {
      clearInterval(interval);
    }
    activeIntervals.clear();
  });

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

  function formatDateTime(iso: string): string {
    try {
      return new Intl.DateTimeFormat('de-CH', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  }

  function activityIcon(type: string): string {
    if (type === 'favorite') return '☆';
    if (type === 'feedback') return '↗';
    if (type === 'weights') return '%';
    if (type === 'assistant') return '→';
    if (type === 'note') return '✎';
    if (type === 'kompass') return '◎';
    return '✓';
  }
</script>

<svelte:head>
  <title>Mein politisches Profil – Voting Assistant</title>
  <meta name="description" content="Dein persönlicher Reflexionsraum: gespeicherte Positionen, Kompass-Ergebnis und Vergleich mit Parteipositionen. Alles bleibt lokal in deinem Browser." />
</svelte:head>

<section class="container-app pt-8 md:pt-12 pb-6">
  <div class="profile-hero">
    <div>
      <p class="section-eyebrow mb-2">Persönlicher Reflexionsraum</p>
      <h1 class="profile-title font-display text-3xl md:text-4xl text-ink mb-2">Mein politisches Profil</h1>
      <p class="profile-lead text-ink-muted text-sm md:text-base max-w-2xl">
        Hier findest du deine gespeicherten Positionen, das Kompass-Ergebnis und einen Vergleich mit Parteipositionen — als Grundlage für deine eigene politische Orientierung.
      </p>
    </div>

    <div class="profile-export-mini" aria-label="Meine Daten exportieren">
      <p class="profile-export-mini-label">Meine Daten</p>
      <div class="profile-export-mini-actions">
        <button
          type="button"
          class="export-icon-box"
          on:click={exportProfileJson}
          aria-label="Profil als JSON exportieren"
          title="Profil als JSON exportieren"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v11m0 0 4-4m-4 4-4-4" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" />
          </svg>
          <span>JSON</span>
        </button>
        <button
          type="button"
          class="export-icon-box"
          on:click={printProfile}
          aria-label="Druckansicht öffnen oder als PDF speichern"
          title="Druckansicht / PDF speichern"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 8V3h10v5" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 17H5a2 2 0 0 1-2-2v-3a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v3a2 2 0 0 1-2 2h-2" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 14h10v7H7z" />
          </svg>
          <span>PDF</span>
        </button>
      </div>
      {#if exportStatus}
        <p class="export-status" role="status">{exportStatus}</p>
      {/if}
    </div>
  </div>
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
          <p class="text-xs text-ink-muted uppercase tracking-wider font-mono-data">Ja</p>
        </div>
        <div>
          <p class="font-mono-data text-3xl md:text-4xl font-medium text-contra">{neinCountUp}</p>
          <p class="text-xs text-ink-muted uppercase tracking-wider font-mono-data">Nein</p>
        </div>
        <div>
          <p class="font-mono-data text-3xl md:text-4xl font-medium text-ink-muted">{undecidedCountUp}</p>
          <p class="text-xs text-ink-muted uppercase tracking-wider font-mono-data">Unsicher</p>
        </div>
        <div>
          <p class="font-mono-data text-3xl md:text-4xl font-medium text-brand">{favoriteCountUp}</p>
          <p class="text-xs text-ink-muted uppercase tracking-wider font-mono-data">Merkliste</p>
        </div>
      </div>
    </div>

    <p class="privacy-hint">
      <span aria-hidden="true">🔒</span>
      Deine Positionen bleiben lokal im Browser und dienen nur deiner eigenen Orientierung. Nichts wird an einen Server gesendet.
    </p>

    {#if lowData}
      <p class="data-notice">
        <strong>Noch wenig Datenbasis.</strong>
        Speichere weitere Abstimmungen, damit du Muster in deinen Entscheidungen zuverlässiger erkennen kannst.
      </p>
    {/if}
  </div>
</section>

{#if total === 0 && !$kompassStore && bookmarked.length === 0}
  <section class="container-app pb-20">
    <div class="card p-10 md:p-12">
      <p class="text-5xl mb-4 text-center" aria-hidden="true">🗳</p>
      <h2 class="font-display text-2xl text-ink mb-3 text-center">Dein Journal ist noch leer</h2>
      <p class="text-ink-muted mb-6 max-w-xl mx-auto text-center">
        Das Voting-Journal ist dein persönlicher Reflexionsraum. Wenn du erste Positionen speicherst, hilft dir diese Seite, deine politischen Entscheidungen besser zu verstehen.
      </p>

      <ul class="empty-points">
        <li>
          <span class="empty-point-marker" aria-hidden="true">1</span>
          <span>Speichere deine Position zu Abstimmungen — mit Notiz und Sicherheits-Einschätzung.</span>
        </li>
        <li>
          <span class="empty-point-marker" aria-hidden="true">2</span>
          <span>Finde im Partei-Kompass eine erste politische Tendenz.</span>
        </li>
        <li>
          <span class="empty-point-marker" aria-hidden="true">3</span>
          <span>Sieh hier, wo deine Positionen im Vergleich mit Parteipositionen liegen.</span>
        </li>
      </ul>

      <div class="flex flex-wrap gap-3 justify-center mt-8">
        <a href="/abstimmungen" class="btn-primary w-full sm:w-auto">Erste Abstimmung verstehen</a>
        <a href="/kompass" class="btn-secondary w-full sm:w-auto">Partei-Kompass starten</a>
      </div>
    </div>
  </section>
{:else}
  <!-- KOMPASS RESULT -->
  {#if $kompassStore && topKompass}
    <section class="container-app pb-6">
      <div class="card p-6 md:p-8">
        <div class="flex items-end justify-between mb-3 border-b border-border-light pb-2 flex-wrap gap-3">
          <div>
            <p class="section-eyebrow mb-1">Aus dem Partei-Kompass</p>
            <h2 class="font-display text-2xl text-ink">Politische Nähe aus dem Kompass</h2>
          </div>
          <a href="/kompass" class="text-sm font-semibold text-brand hover:text-brand-dark">
            Quiz erneut öffnen →
          </a>
        </div>

        <p class="text-sm text-ink-muted mb-3">
          Stärkste Nähe zu
          <strong style="color: {topKompass.color};">{topKompass.kuerzel}</strong>:
          <span class="font-mono-data">{topKompass.match}%</span> Nähe-Wert.
          Das ist eine <em>Tendenz</em>, keine feste Zuordnung.
        </p>

        {#if kompassClose}
          <p class="closeness-hint">
            <span aria-hidden="true">⚖</span>
            Die ersten Parteien liegen nah beieinander — das Ergebnis ist keine eindeutige Zuordnung.
          </p>
        {/if}

        <div class="space-y-2 mt-4">
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

        <p class="text-xs text-ink-subtle mt-4">
          Gespeichert am {new Date($kompassStore.savedAt).toLocaleString('de-CH')}. Werte zeigen Orientierung, keine Wahlempfehlung und kein politisches Urteil.
        </p>
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
                <a href="/abstimmungen/{abstimmung.slug}" class="btn-primary text-sm w-full sm:w-auto">
                  Briefing öffnen
                </a>
                <button
                  type="button"
                  class="btn-secondary text-sm w-full sm:w-auto"
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
        <div class="flex items-end justify-between mb-3 border-b border-border-light pb-3 flex-wrap gap-3">
          <div>
            <p class="section-eyebrow mb-1">Aus deinen Ja/Nein-Positionen</p>
            <h2 class="font-display text-2xl text-ink">Momentaner Vergleich mit Parteipositionen</h2>
          </div>
          <span class="text-xs font-mono-data text-ink-muted">Basis: {decidedCount} {decidedCount === 1 ? 'Position' : 'Positionen'}</span>
        </div>

        {#if lowDecisionBase}
          <p class="data-notice data-notice-inline">
            <strong>Datenbasis noch klein:</strong>
            Die Prozentwerte sind nur eine erste Momentaufnahme — bei nur {decidedCount}
            {decidedCount === 1 ? 'gespeicherten Ja/Nein-Position' : 'gespeicherten Ja/Nein-Positionen'}
            kann ein 100%-Wert noch keine starke politische Aussage sein.
          </p>
        {/if}

        <div class="space-y-3 mt-2">
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
          Diese Werte basieren nur auf deinen gespeicherten Ja/Nein-Positionen zu Abstimmungen, nicht auf dem Partei-Kompass. Berechnung: Vergleich deiner Position mit der ausgewiesenen Parteiposition pro Vorlage (Unsicher zählt nicht). Das ist eine Orientierung, kein Parteienmatching und keine Wahlempfehlung.
        </p>
      </div>
    </section>
  {/if}

  <!-- RECENT ACTIVITIES -->
  {#if recentActivities.length > 0}
    <section class="container-app pb-6">
      <div class="card p-6 md:p-8">
        <div class="flex items-end justify-between mb-4 border-b border-border-light pb-3 flex-wrap gap-3">
          <div>
            <p class="section-eyebrow mb-1">Im Blick</p>
            <h2 class="font-display text-2xl text-ink">Letzte Aktivitäten</h2>
          </div>
          <span class="text-xs font-mono-data text-ink-muted">
            {recentActivities.length} {recentActivities.length === 1 ? 'Eintrag' : 'Einträge'}
          </span>
        </div>

        <ul class="activity-list">
          {#each recentActivities as activity}
            <li class="activity-item">
              <span class="activity-icon" aria-hidden="true">{activityIcon(activity.type)}</span>
              <div class="activity-body">
                <p class="activity-meta">{formatDateTime(activity.createdAt)}</p>
                {#if activity.href}
                  <a href={activity.href} class="activity-title">{activity.title}</a>
                {:else}
                  <p class="activity-title">{activity.title}</p>
                {/if}
                <p class="activity-detail">{activity.detail}</p>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    </section>
  {/if}

  <!-- HISTORY / JOURNAL -->
  {#if history.length > 0}
    <section class="container-app pb-20">
      <div class="flex items-end justify-between mb-3 border-b border-border-light pb-3 flex-wrap gap-3">
        <div>
          <p class="section-eyebrow mb-1">Deine Einträge</p>
          <h2 class="font-display text-2xl text-ink">Voting-Journal</h2>
          <p class="text-sm text-ink-muted mt-1 max-w-2xl">
            Persönliche Reflexionskarten zu jeder gespeicherten Vorlage — Position, Sicherheit, Notiz und Kontext auf einen Blick.
          </p>
        </div>
        <button type="button" on:click={clearAll} class="text-sm text-ink-muted underline hover:text-contra">
          Alle löschen
        </button>
      </div>

      <div class="space-y-4 mt-5">
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
                  {formatDate(item.abstimmung.date)} · <span class="journal-topic">{item.abstimmung.category}</span>
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
                {#if item.confidence !== undefined}
                  <div class="journal-confidence">
                    <span class="journal-label">Sicherheit</span>
                    <div class="journal-confidence-bar" aria-hidden="true">
                      <div class="journal-confidence-fill" style="width: {item.confidence}%;"></div>
                    </div>
                    <span class="font-mono-data text-xs font-semibold text-ink">{item.confidence}%</span>
                  </div>
                {/if}
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
                  <span class="font-mono-data text-xs text-ink-muted">{formatDateTime(item.updatedAt)}</span>
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
            {:else if item.note || item.journalNote}
              <div class="journal-note">
                <p class="text-sm text-ink leading-relaxed italic mb-2">«{item.note || item.journalNote}»</p>
                <button type="button" on:click={() => startEditNote(item.abstimmung.slug, item.note || item.journalNote)} class="text-xs text-brand hover:underline">
                  Notiz bearbeiten
                </button>
              </div>
            {:else}
              <button type="button" on:click={() => startEditNote(item.abstimmung.slug, '')} class="text-sm text-brand hover:underline mt-4">
                + Notiz hinzufügen
              </button>
            {/if}

            <div class="journal-actions-row">
              <a href="/abstimmungen/{item.abstimmung.slug}" class="journal-cta">
                Briefing erneut öffnen →
              </a>
            </div>
          </article>
        {/each}
      </div>

      <div class="next-step-card">
        <div>
          <p class="font-display text-lg text-ink leading-tight">Bereit für die nächste Vorlage?</p>
          <p class="text-sm text-ink-muted mt-1">Schau dir weitere Abstimmungen an und erweitere deine Datenbasis.</p>
        </div>
        <a href="/abstimmungen" class="btn-primary text-sm w-full sm:w-auto text-center sm:whitespace-nowrap">Weitere Abstimmungen</a>
      </div>
    </section>
  {/if}
{/if}

<style>
  .privacy-hint {
    display: flex;
    align-items: flex-start;
    gap: 0.55rem;
    margin-top: 1.4rem;
    border-top: 1px solid var(--border-light);
    padding-top: 1rem;
    color: var(--text-muted);
    font-size: 0.82rem;
    line-height: 1.55;
  }

  .privacy-hint span[aria-hidden] {
    font-size: 0.95rem;
    line-height: 1;
    margin-top: 0.1rem;
  }

  .export-status {
    margin: 0;
    max-width: 13rem;
    text-align: right;
    color: var(--brand);
    font-weight: 700;
  }

  .profile-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 1.5rem;
    align-items: start;
  }

  .profile-title,
  .profile-lead {
    max-width: 100%;
    min-width: 0;
    overflow-wrap: anywhere;
    word-break: normal;
  }

  .profile-export-mini {
    display: grid;
    justify-items: end;
    gap: 0.45rem;
    padding-top: 1.55rem;
  }

  .profile-export-mini-label {
    color: var(--brand);
    font-family: 'IBM Plex Mono', ui-monospace, monospace;
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    line-height: 1;
    text-transform: uppercase;
  }

  .profile-export-mini-actions {
    display: flex;
    gap: 0.55rem;
  }

  .export-icon-box {
    display: grid;
    grid-template-rows: 1fr auto;
    justify-items: center;
    align-items: center;
    gap: 0.25rem;
    width: 74px;
    min-height: 66px;
    padding: 0.65rem 0.55rem 0.55rem;
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    background: var(--surface);
    color: var(--text-muted);
    box-shadow: var(--shadow-sm);
    transition:
      transform 160ms ease,
      border-color 160ms ease,
      color 160ms ease,
      box-shadow 160ms ease;
  }

  .export-icon-box:hover {
    transform: translateY(-1px);
    border-color: color-mix(in srgb, var(--brand) 45%, var(--border-light));
    color: var(--brand);
    box-shadow: var(--shadow-md);
  }

  .export-icon-box span {
    font-family: 'IBM Plex Mono', ui-monospace, monospace;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.04em;
  }

  .export-icon-box svg {
    align-self: end;
  }

  .data-notice {
    margin-top: 1rem;
    border-left: 3px solid var(--brand);
    background: var(--brand-soft, color-mix(in srgb, var(--brand) 12%, var(--surface)));
    border-radius: 0 var(--radius) var(--radius) 0;
    padding: 0.7rem 0.9rem;
    color: var(--text);
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .data-notice strong {
    color: var(--text);
    font-weight: 800;
  }

  .data-notice-inline {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .closeness-hint {
    display: flex;
    align-items: flex-start;
    gap: 0.55rem;
    margin: 0 0 0.5rem;
    border-radius: var(--radius);
    background: var(--surface-alt);
    border: 1px dashed var(--border);
    padding: 0.55rem 0.8rem;
    color: var(--text-muted);
    font-size: 0.82rem;
    line-height: 1.5;
  }

  .empty-points {
    list-style: none;
    margin: 1.5rem auto 0;
    padding: 0;
    max-width: 32rem;
    display: grid;
    gap: 0.7rem;
  }

  .empty-points li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    color: var(--text-muted);
    font-size: 0.9rem;
    line-height: 1.55;
  }

  .empty-point-marker {
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: var(--radius-full);
    background: var(--brand-soft, color-mix(in srgb, var(--brand) 14%, var(--surface)));
    color: var(--brand);
    font-family: 'IBM Plex Mono', ui-monospace, monospace;
    font-size: 0.75rem;
    font-weight: 800;
    display: grid;
    place-items: center;
    margin-top: 0.05rem;
  }

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

  .journal-topic {
    color: var(--brand);
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

  .journal-confidence {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.55rem;
    padding-top: 0.55rem;
    border-top: 1px dashed var(--border-light);
  }

  .journal-confidence-bar {
    height: 6px;
    border-radius: var(--radius-full);
    background: var(--border-light);
    overflow: hidden;
  }

  .journal-confidence-fill {
    height: 100%;
    background: var(--brand);
    border-radius: var(--radius-full);
    transition: width 240ms ease;
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

  .journal-actions-row {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .journal-cta {
    color: var(--brand);
    font-size: 0.85rem;
    font-weight: 700;
    transition: color 160ms ease;
  }

  .journal-cta:hover {
    color: var(--brand-dark, var(--brand));
    text-decoration: underline;
  }

  .next-step-card {
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    border: 1px dashed var(--border);
    border-radius: var(--radius-lg);
    background: var(--surface-alt);
    padding: 1rem 1.25rem;
    flex-wrap: wrap;
  }

  .activity-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.85rem;
  }

  .activity-item {
    display: grid;
    grid-template-columns: 34px minmax(0, 1fr);
    gap: 0.75rem;
    padding-bottom: 0.85rem;
    border-bottom: 1px solid var(--border-light);
  }

  .activity-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .activity-icon {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: var(--radius-full);
    background: var(--brand-soft, color-mix(in srgb, var(--brand) 14%, var(--surface)));
    color: var(--brand);
    font-weight: 900;
    font-size: 0.95rem;
  }

  .activity-body {
    min-width: 0;
  }

  .activity-meta {
    color: var(--text-subtle);
    font-family: 'IBM Plex Mono', ui-monospace, monospace;
    font-size: 0.7rem;
    letter-spacing: 0.03em;
    margin-bottom: 0.15rem;
  }

  .activity-title {
    display: block;
    color: var(--text);
    font-weight: 700;
    font-size: 0.92rem;
    line-height: 1.3;
    transition: color 160ms ease;
  }

  a.activity-title:hover {
    color: var(--brand);
  }

  .activity-detail {
    margin-top: 0.15rem;
    color: var(--text-muted);
    font-size: 0.82rem;
    line-height: 1.45;
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
    .profile-hero {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .profile-title {
      font-size: clamp(1.85rem, 7.4vw, 2.2rem);
      line-height: 1.08;
      hyphens: auto;
    }

    .profile-lead {
      font-size: 0.96rem;
      line-height: 1.58;
    }

    .profile-export-mini {
      justify-items: stretch;
      padding-top: 0;
    }

    .profile-export-mini-actions {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .export-icon-box {
      width: 100%;
      min-height: 60px;
    }

    .export-status {
      max-width: none;
      text-align: left;
    }

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

    .journal-confidence {
      grid-template-columns: 1fr;
      gap: 0.35rem;
    }

    .bookmark-context {
      grid-template-columns: 1fr;
    }

    .next-step-card {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
