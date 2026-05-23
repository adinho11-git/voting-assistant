# AI Swiss Voting Assistant

> Interaktiver politischer Orientierungsassistent für Schweizer Abstimmungen und Parteien.

[![Live](https://img.shields.io/badge/Live-friendly--llama--b738d4.netlify.app-C8102E)](https://friendly-llama-b738d4.netlify.app)
[![GitHub](https://img.shields.io/badge/GitHub-adinho11--git%2Fvoting--assistant-333)](https://github.com/adinho11-git/voting-assistant)
[![Stack](https://img.shields.io/badge/Stack-SvelteKit%202%20·%20TypeScript%20·%20MongoDB%20·%20Tailwind-003087)](#tech-stack)
[![Data](https://img.shields.io/badge/Daten-admin.ch%20(21.05.2026)-065F46)](https://abstimmungen.admin.ch/)

---

## Inhalt

1. [Idee &amp; Problem](#idee--problem)
2. [Features](#features)
3. [Datenmodell](#datenmodell)
4. [Tech Stack](#tech-stack)
5. [Setup](#lokales-setup)
6. [Architektur](#architektur)
7. [Workflows](#workflows)
8. [Vorgehen (Methodik)](#vorgehen-methodik)
9. [Usability-Evaluation](#usability-evaluation)
10. [KI-Einsatz](#ki-einsatz-deklaration)
11. [Erweiterungen](#erweiterungen-über-den-mindestumfang-hinaus)
12. [Video-Walkthrough](#video-walkthrough)
13. [Projektkontext](#projektkontext)
14. [Projektdokumentation (`docs/`)](#projektdokumentation-docs)

---

## Idee &amp; Problem

In der direkten Demokratie der Schweiz stimmen rund 5,5 Mio. Stimmberechtigte bis zu vier Mal pro Jahr ab. Das offizielle Abstimmungsbüchlein ist textlastig, Parteien-Argumentarien sind einseitig, und unabhängige Quellen sind verstreut. **Junge Stimmberechtigte und Erst-Wählende verlieren oft den Überblick — und stimmen entweder nicht oder uninformiert.**

Der **AI Swiss Voting Assistant** positioniert sich als interaktiver politischer Orientierungsassistent — kein Ersatz für das Abstimmungsbüchlein, sondern dein Einstieg:

- 🗳 **Briefings in drei Minuten** — neutrale KI-Zusammenfassung mit Quellen
- ✓ **PRO und CONTRA gleichwertig** — jedes Argument mit Originalquelle + Datum
- 🏛 **Alle sechs Bundesparteien transparent** — Profil, Spektrum, Position + Vergleich
- 🧭 **Partei-Kompass Quiz** — 18 realistische Szenarien aus 10 Themenbereichen
- 📊 **Community-Stimmung** — anonyme JA/NEIN/Unentschieden-Aggregation
- 📓 **Persönliches Voting-Journal** — Position, Notiz, Vergleich mit BR/Parlament/Community/Endresultat

> **Studentischer Prototyp** im Modul Prototyping (ZHAW FS 2026) — **keine offizielle Abstimmungshilfe.** Reale Daten von admin.ch / bk.admin.ch (Stand 21.05.2026), kantonale Inhalte sind klar als Demo markiert.

---

## Features

### Realdaten — 14. Juni 2026 + 6 vergangene Abstimmungen

**Anstehend (offiziell verifiziert, Quelle admin.ch):**

| Vorlage | BR | Parlament | Status |
|---------|----|-----------|--------|
| Volksinitiative «Keine 10-Millionen-Schweiz! (Nachhaltigkeitsinitiative)» | NEIN | NEIN | anstehend |
| Änderung des Zivildienstgesetzes | JA | JA | anstehend |

**Vergangen (mit Endresultaten, Quelle bk.admin.ch / abstimmungen.admin.ch):**

| Datum | Vorlage | Ergebnis |
|-------|---------|----------|
| 08.03.2026 | Klimafonds-Initiative | 29.3% JA — abgelehnt |
| 28.09.2025 | E-ID-Gesetz | 50.4% JA — angenommen |
| 09.02.2025 | Umweltverantwortungs-Initiative | 30.2% JA — abgelehnt |
| 24.11.2024 | EFAS (Einheitliche Finanzierung) | 53.3% JA — angenommen |
| 22.09.2024 | BVG-Reform | 32.9% JA — abgelehnt |
| 09.06.2024 | Stromversorgungsgesetz | 68.7% JA — angenommen |

**Kantonal:** Eine als <kbd>DEMO</kbd> gelabelte Vorlage für Zürich illustriert die Kantons-Ebene; bei echtem Einsatz würden offizielle Kantons-APIs angebunden.

### Public-Bereich

| Feature | Beschreibung |
|---------|--------------|
| **Home** | 2-Card-Hero mit den realen Juni-2026-Vorlagen, Workflow-Erklärung, Methodik, FAQ, KI-Transparenz, letzte 3 Resultate |
| **Abstimmungen** | Drei Tabs (Anstehend / Vergangen / Kantonal); Such-Input ohne Icon-Overlap; Filter |
| **Vergangen-Tab** | Result-Karten mit Ja/Nein-Balken, Stimmbeteiligung, BR-Empfehlung und persönlichem Vote-Indikator |
| **Kantonal-Tab** | Kanton-Selector (ZH-Default), Demo-Vorlagen klar gelabelt, Methodik-Hinweis |
| **Briefing** | KI-Zusammenfassung mit Quellen-Datum, PRO/CONTRA-Argumente, Parteipositionen, Endresultat-Banner bei vergangenen Vorlagen |
| **Argument-Detail** | Erweiterte Erklärung mit Originalquelle, Quellen-Datum und Link zum Gegenargument |
| **Parteien-Portal** | 6 Parteien · Filter (Alle/Links/Mitte/Rechts) · Spektrum-Visualisierung |
| **Partei-Detail** | Profil, Fakten (Mitglieder, Präsidium), Spektrum 2D (LR + Umwelt-Wirtschaft), Positionen zu aktuellen Vorlagen, Interessen-Form |
| **Direkter Partei-Vergleich** | Zwei Parteien Side-by-Side mit Daten + Slogan |
| **Positionen-Matrix** | Alle 6 Parteien × aktuelle &amp; jüngste Vorlagen — JA/NEIN auf einen Blick |
| **Kompass-Quiz** | 18 realistische Szenarien aus 10 Themen, 5-Punkt-Skala click-basiert, Überspring-Option, Match-Algorithmus mit Topic-Breakdown + Erklärung |
| **Profil-Journal** | JA/NEIN/Unentschieden + Notizen pro Vorlage, Vergleich mit BR/Parlament/Community/Endresultat, Partei-Übereinstimmung in %, Kompass-Ergebnis |
| **Quellen-Seite** | Methodik, Original-Quellen-Liste, FAQ, KI-Deklaration |

### Admin-Bereich (passwortgeschützt)

| Feature | Beschreibung |
|---------|--------------|
| **Dashboard** | Stats (Vorlagen / Interessen / Community-Votes) + System-Status (Mock vs. MongoDB) |
| **Vorlagen-CRUD** | Tabelle, Bearbeiten-Forms für Meta-Daten, Argumente (PRO/CONTRA hinzufügen/löschen), Parteipositionen |
| **Interessen** | Tabelle aller Anfragen + CSV-Export (UTF-8 + BOM für Excel) |
| **Community-Stimmen** | Pro Vorlage JA/NEIN-Aggregation |

### Foundations

- **Dark Mode** mit Theme-Persistenz (LocalStorage) + FOUC-freier Initialisierung
- **Disclaimer-Banner** (dismissable) — kennzeichnet App als Prototyp
- **Data-Quality-Badges** (Offiziell / In Vorbereitung / Demo) auf jedem Briefing
- **Toast-Notifications** für alle Interaktionen
- **Page-Transitions** zwischen Routen
- **Accessibility:** Skip-Link, ARIA-Labels, `focus-visible`, `prefers-reduced-motion`
- **Responsive:** Top-Nav (Desktop) + Bottom-Nav (Mobile), zero horizontal overflow
- **SEO:** pro Page Title + Description, canonical URLs, OG-Tags

---

## Datenmodell

Zentrale Types in `src/lib/types.ts`:

```typescript
type UserPosition = 'JA' | 'NEIN' | 'UNENTSCHIEDEN';
type AbstimmungStatus = 'anstehend' | 'vergangen';
type DataQuality = 'official' | 'official-pending' | 'demo';

interface Abstimmung {
  id, slug, title, shortTitle, date, type, category, readTime,
  status,                          // anstehend / vergangen
  dataQuality,                     // official / demo
  bundesratPosition, parlamentPosition, parlamentStimmen,
  aiSummary, summarySource, summarySourceUrl, summaryLastChecked,
  proArguments: Argument[],        // jedes Arg hat sourceDate
  contraArguments: Argument[],
  parteien: Partei[],              // 6 Parteien mit parolenQuelle
  result?: AbstimmungResult        // bei vergangenen Vorlagen
}

interface VoteEntry {              // Profil-Journal Eintrag
  position: UserPosition;
  note?: string;
  updatedAt: string;
}
```

### MongoDB-Collections

| Collection | Inhalt | CRUD via |
|------------|--------|----------|
| `abstimmungen` | 8 reale + 1 Demo-Vorlagen mit Argumenten, Quellen, Ergebnissen | Admin Panel + Seed-Script |
| `communityVotes` | Anonyme JA/NEIN-Aggregation pro Vorlage | API `/api/abstimmungen/[slug]/vote` |
| `parteiInteressen` | Interessens-Registrierungen | Form `/parteien/[kuerzel]` + Admin-Export |

**Daten-Lese-Operationen:** Votes, Argumente, Parteipositionen, Ergebnisse, Community-Counts.
**Daten-Schreib-Operationen:** Admin-CRUD (Vorlagen + Argumente + Parteipositionen), anonyme Votes, Interessens-Registrierungen.

Persönliche Notizen + JA/NEIN-Positionen bleiben in **LocalStorage** — das Profil-Journal bleibt privat.

---

## Tech Stack

| Layer | Technologie |
|-------|-------------|
| **Framework** | SvelteKit 2 (file-based routing, server load + form actions) |
| **Sprache** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS 3 + custom CSS-Variablen (Light + Dark Theme) |
| **Fonts** | Playfair Display (Headlines), Source Sans 3 (Body), IBM Plex Mono (Data) |
| **DB** | MongoDB Atlas (mit in-memory Fallback im Mock-Modus) |
| **Hosting** | Netlify (`@sveltejs/adapter-netlify`) |
| **Auth** | Session-Cookie + zentrale Hook in `hooks.server.ts` |

---

## Lokales Setup

```bash
# 1. Repo klonen
git clone https://github.com/adinho11-git/voting-assistant.git
cd voting-assistant

# 2. Abhängigkeiten installieren
npm install

# 3. Environment konfigurieren
cp .env.example .env
# Optionen:
#  - USE_MOCK_DATA=true             → läuft komplett ohne DB
#  - USE_MOCK_DATA=false + MONGODB_URI → echte DB-Persistenz
#  - ADMIN_PASSWORD=zhaw2026admin    → Login für /admin

# 4. (Optional) DB initial befüllen
npm run seed

# 5. Dev-Server
npm run dev   # → http://localhost:5173
```

### MongoDB Atlas Setup

```bash
# 1. Cluster auf cloud.mongodb.com/atlas erstellen (Free-Tier reicht)
# 2. URI in .env eintragen + USE_MOCK_DATA=false setzen
# 3. Datenbank initial befüllen:
npm run seed
# → upsertet 8 Abstimmungen, erstellt Indexes, seedet Community-Counts
```

### Admin-Login

```
URL:       /admin
Passwort:  zhaw2026admin   (oder ADMIN_PASSWORD in .env)
Session:   8h (HttpOnly Cookie + SameSite=Lax)
```

### Quality Gates

```bash
npm run check        # TypeScript + Svelte (0 Errors required)
npm run build        # Production Build (Netlify-ready)
```

---

## Architektur

```
src/
├── lib/
│   ├── types.ts                # Abstimmung, Argument, Partei, VoteEntry, DataQuality
│   ├── realData.ts             # 8 reale Vorlagen + 1 Demo (Single Source of Truth)
│   ├── mockData.ts             # Backwards-compat re-exports
│   ├── parteiData.ts           # 6 Parteien mit vollständigen Profilen
│   ├── kompass.ts              # 18 Fragen + Match-Algorithmus + Topic-Breakdown
│   ├── actions/inView.ts       # IntersectionObserver-Action für Scroll-Reveal
│   ├── components/             # 15+ wiederverwendbare Komponenten
│   │   ├── TopNav, BottomNav, AppBar
│   │   ├── AbstimmungCard (mit User-Vote-Indikator)
│   │   ├── VoteSection (JA/NEIN/Unentschieden + Notiz + Vergleich)
│   │   ├── InteresseForm (Validierung + API)
│   │   ├── DataQualityBadge, DisclaimerRibbon, ThemeToggle, ToastContainer
│   ├── stores/                 # toast, votes (v2 mit Notes), theme, kompass
│   └── server/
│       ├── db.ts               # MongoDB-Connect mit Timeout + Fallback
│       ├── dataLayer.ts        # Unified API (DB-first, Mock-Fallback)
│       └── *Store.ts           # In-Memory Stores für Mock-Modus
├── routes/
│   ├── +layout.svelte          # TopNav + BottomNav + Toast + Disclaimer + Theme
│   ├── +page.svelte            # Home V2 (2-Card-Hero, Workflow, Methodik, FAQ, KI-Transparenz)
│   ├── abstimmungen/
│   │   ├── +page.svelte        # 3 Tabs (Anstehend/Vergangen/Kantonal), Such-Input, Result-Cards
│   │   └── [slug]/
│   │       ├── +page.svelte    # Briefing + Endresultat-Banner für Past Votes
│   │       ├── argumente/[id]/ # Argument-Detail mit Quellen-Datum
│   │       └── parteien/       # Vollständige Parteipositionen
│   ├── parteien/
│   │   ├── +page.svelte        # 6 Cards + Compare-Tool + Positionen-Matrix + Methodik
│   │   └── [kuerzel]/          # Detail + Spektrum 2D + Positionen + Interessen-Form
│   ├── kompass/+page.svelte    # 18-Fragen Quiz mit Topic-Breakdown
│   ├── profil/+page.svelte     # Voting-Journal + Notes + Compare + Kompass-Result
│   ├── quellen/+page.svelte    # Methodik + Quellen + FAQ + KI-Deklaration
│   ├── admin/                  # Login + Dashboard + CRUD + Interessen + Community
│   └── api/                    # /vote, /interesse, /admin/interessen.csv
├── hooks.server.ts             # Admin-Auth-Guard
├── app.css                     # Design-System + Light + Dark Theme
└── app.html                    # HTML-Shell + FOUC-freier Theme-Bootstrap
```

---

## Workflows

### Primary Workflow

```
User öffnet App
  → sieht reale 14.6.2026-Vorlagen auf Home
  → wählt Vorlage → liest neutrale KI-Zusammenfassung
  → bewertet PRO/CONTRA mit Quellen-Links
  → speichert eigene Position (JA/NEIN/Unentschieden) + optional Notiz
  → vergleicht mit BR, Parlament, Parteien, Community (und bei vergangenen Vorlagen mit dem Endresultat)
  → sieht Position im Profil-Journal mit Diff zur offiziellen Empfehlung
```

### Secondary Workflow — Partei-Kompass

```
User startet Kompass
  → beantwortet 18 realistische Szenario-Fragen (10 Themen)
  → kann Fragen überspringen oder mit Zurück anpassen
  → sieht transparentes Ranking: Top-Match mit Match-%, Topic-Breakdown
  → kann Antworten anpassen → Live-Recalculation
  → Ergebnis wird lokal gespeichert + im Profil angezeigt
```

### Tertiary Workflow — Parteien-Vergleich

```
User öffnet /parteien
  → wählt zwei Parteien (Default SP vs. SVP)
  → vergleicht Eckdaten + Slogan + Spektrum-Wert
  → sieht Positionen-Matrix für aktuelle Vorlagen
  → springt in Partei-Detail mit Interessens-Form
```

---

## Vorgehen (Methodik)

Die Entwicklung folgt dem Phasen-Modell aus dem Modul **Prototyping (ZHAW, FS 2026)**:

| Phase | Inhalt | Artefakt |
|-------|--------|----------|
| **1. Understand &amp; Define** | Problemraum, Zielgruppe, Ziele | `Uebung8_Ideenfindung.pdf` |
| **2. Sketch** | Crazy-8s, Variantenvergleich, Mobile-first-Entscheid | `Uebung9_Abgabe_Adi_Lama.pdf` |
| **3. Decide** | Figma-Mockup Mobile, Briefing-Workflow festgelegt | `Uebung10_Abgabe_Adi_Lama.pdf` |
| **4. Prototype (Übung 11)** | Erste SvelteKit-Version, Mobile-only | Commit `82e7f4b` |
| **4. Prototype (Sprint 1)** | Swiss Editorial Redesign, Desktop-Layout, Persistenz, Admin, 10 Features | 9 Commits |
| **4. Prototype (Sprint 2)** | Real-Data-Replacement, Kompass-V2, Voting-Journal, Dark-Mode, Disclaimer | 5 Commits |
| **5. Validate** | Moderierter Usability-Test 20.05.2026 | siehe unten |

---

## Usability-Evaluation

### Setup

- **Datum:** 20. Mai 2026
- **Methode:** Moderierter On-Site Usability-Test, Think-Aloud, ~10 Min. pro Person
- **Testpersonen:**
  - **Andi Kadolli** (24, IT-Student, ZHAW) — Mobile-Nutzer, technisch versiert
  - **Donart Imeri** (26, Wirtschafts-Student, ZHAW) — Desktop-Nutzer, politisch interessiert
  - (Vorgesehen für Erweiterung: 3 weitere Test-User aus dem persönlichen Netzwerk)

### Test-Aufgaben

1. Informiere dich über die Nachhaltigkeitsinitiative — was will sie konkret, wer ist dagegen?
2. Speichere deine Position dazu und füge eine Notiz hinzu.
3. Mach den Partei-Kompass und schau, welche Partei dir am nächsten steht.
4. Vergleiche SP und SVP direkt.
5. Schau dir das Ergebnis der letzten BVG-Reform an.

### Wichtigste Erkenntnisse aus Übung-11-Vorversion

| # | Beobachtung | Schwere | Behoben in V2 |
|---|-------------|---------|---------------|
| 1 | App auf Desktop wirkt &quot;wie vergessenes iPhone in der Mitte&quot; | Hoch | Full-Width Desktop-Layout, Top-Nav |
| 2 | &quot;Wo ist meine Stimme?&quot; — Nutzer wollte Position speichern | Hoch | VoteSection mit JA/NEIN/Unentschieden + Notiz |
| 3 | &quot;Welche Partei passt zu mir?&quot; — Wunsch nach Quiz | Hoch | 18-Fragen Kompass mit Topic-Breakdown |
| 4 | Keine echten Daten — wirkt unseriös | Hoch | Komplett-Replacement durch admin.ch-Daten |
| 5 | Suche-Icon überlagert Placeholder | Mittel | Padding-Left fix |
| 6 | &quot;Wer steht dahinter?&quot; | Mittel | Disclaimer-Ribbon + KI-Deklaration + Quellen-Seite |
| 7 | Vergangen/Kantonal-Tabs leer | Mittel | Beide Tabs mit Realdaten resp. gelabelten Demos befüllt |
| 8 | Dark-Mode-Bedarf | Niedrig | Theme-Toggle + persistente Wahl |

### Verbesserungsvorschläge für nächste Iteration

- Kompass-Fragen breiter validieren (mit politikwissenschaftlichem Coaching)
- Echte kantonale Daten via Kantons-APIs (zh.ch, be.ch) integrieren
- Mehr historische Vorlagen (Archiv ab 2020 statt nur 2024–2026)
- A11y-Audit mit Screenreader (NVDA / VoiceOver)
- Mehr Testpersonen (Ziel: 5–8 mit unterschiedlichen politischen Vorprägungen)

---

## KI-Einsatz (Deklaration)

Diese App wurde unter intensivem Einsatz von **Claude Opus 4.7 (Anthropic)** als Code-Assistent entwickelt.

| Phase | KI-Einsatz | Eigenleistung |
|-------|------------|---------------|
| Ideenfindung &amp; Mockup | — (Brainstorming-Sparring) | Konzept, Zielgruppe, Mockup vollständig selbst |
| Code-Generierung | SvelteKit-Komponenten, Design-System, Server-Routen, Tests | Architektur-Entscheidungen, Datenmodell, Datenpipeline |
| Realdaten (Vorlagen, Ergebnisse) | KI hat zusammengefasst, ich habe **auf admin.ch verifiziert** und nur dort übernommen, wo offiziell belegbar | Fakten-Check, Linking, Datums-Verifikation |
| Argumenten-Texte | Erste Entwürfe pro Argument | Vergleich mit Originalquellen (BR-Botschaft, EJPD, SVP-Kampagne), Korrekturen |
| Kompass-Fragen | Erste Vorschläge zu Themen + Szenarien | Parteipositionen kalibriert, Szenarien geprüft, Bias-Check |
| README / Doku | Strukturvorschlag, Tabellen-Layout | Inhalt selbst, faktischer Check |
| Usability-Test | — | Vollständig selbst durchgeführt |

**Verantwortung:** Sämtliche Inhalte wurden vor Veröffentlichung von Hand geprüft. Politische Argumente sind absichtlich ausgewogen formuliert. Faktische Aussagen (Bundesrat-Position, Parlament-Stimmen, Endresultate) sind mit Originalquelle + Datum verlinkt. Der KI-Einsatz ersetzt nicht die kritische Prüfung — diese liegt vollständig beim Entwickler.

**Was die KI _nicht_ macht:**
- Wertet politische Positionen nicht
- Erfindet keine Quellen, Ergebnisse oder Stimmenverhältnisse
- Generiert keine "Plausibel-aber-falsch"-Inhalte (alle Demo-Inhalte sind als DEMO gelabelt)

---

## Erweiterungen (über den Mindestumfang hinaus)

| Erweiterung | Mehrwert |
|-------------|----------|
| **Reale Schweizer Abstimmungs-Daten** (admin.ch) | Aus Demo-App wurde produktnaher Orientierungsassistent |
| **Past Votes mit Endresultaten** (6 reale Vorlagen 2024-2026) | Kontext + Vergleich eigene Position vs. Endresultat |
| **Partei-Kompass mit 18 Szenarien** (10 Themen, Match-Algorithmus, Topic-Breakdown) | Beste Single-User-Interaktion der App |
| **Voting-Journal mit Notizen** | Mehrwert über reines Lesen hinaus — App wird zum Lerntool |
| **Dark Mode mit Theme-Persistenz** | Modernes UX-Element ohne Performance-Impact |
| **Positionen-Matrix** | Schnellster Überblick aller 6 Parteien × Vorlagen |
| **Direkter Parteien-Vergleich** | Zwei Parteien Side-by-Side mit Eckdaten |
| **Admin-Panel mit CRUD** | Vollständige Daten-Verwaltung (Pflichtanforderung erfüllt + erweitert) |
| **CSV-Export** | Echte Datenexport-Funktion mit UTF-8 + BOM |
| **MongoDB + Fallback-Architektur** | Production-ready DB-Layer mit graceful degradation |
| **Data-Quality-Badges** | Offiziell vs. Demo transparent gekennzeichnet |
| **A11y-Implementierung** | Skip-Link, ARIA, prefers-reduced-motion, focus-visible |
| **Seed-Script mit DNS-Fallback** | Reproducible DB-Initialisierung auch hinter restriktiven Resolvern |
| **TypeScript strict + 0 Errors** | Type-Safety vom Frontend bis ins Backend |

---

## Bewertungs-Mapping (ZHAW)

| ZHAW-Kriterium | Erfüllt durch |
|----------------|---------------|
| Mindestumfang Workflows | Briefing-Workflow (Home → Liste → Briefing → Vote + Notiz → Vergleich + Profil) |
| Daten erfassen / bearbeiten | Admin-Panel mit CRUD; öffentlicher Voting-Flow speichert Positionen + Notes |
| Übersichtsseite mit DB-Daten | Home + Abstimmungen-Liste laden aus dataLayer |
| Mehrere Pages + Navigation | 14+ Routen, Top-Nav (Desktop) + Bottom-Nav (Mobile) |
| SvelteKit + Komponenten | 15+ wiederverwendbare Komponenten |
| MongoDB-Persistenz | 8 Vorlagen + ~160 Community-Votes in Atlas |
| Validierungen | InteresseForm, Admin-Forms — Inline-Errors + Server-Validation |
| Visuelle Datenauswertung | Community-Balken, Match-Bars, Spektrum, Result-Diagramme |
| Rollenunterschiede | Public vs. Admin (Auth-Guard) |
| Online zugänglich | https://friendly-llama-b738d4.netlify.app |
| GitHub-Repo vollständig | https://github.com/adinho11-git/voting-assistant (öffentlich) |
| Strukturierte Commit-History | Pro Feature ein Commit, mit Co-Author-Tag |
| Evaluation dokumentiert | Siehe «Usability-Evaluation» |
| KI-Einsatz transparent | Siehe «KI-Einsatz» |

---

## Video-Walkthrough

Vorgeschlagene Struktur (5–7 Min.):

1. **00:00–00:30** — Intro: Problemstellung, Positionierung als &quot;Orientierungsassistent&quot;
2. **00:30–02:00** — Hauptworkflow: Home → Nachhaltigkeitsinitiative-Briefing → PRO/CONTRA → Position speichern mit Notiz → Vergleich mit BR/Parlament/Community
3. **02:00–03:00** — Partei-Kompass: 4–5 Fragen demonstrieren, Ergebnis-Ranking + Topic-Breakdown
4. **03:00–04:00** — Profil-Journal: gespeicherte Positionen + Notizen, Partei-Übereinstimmung, Kompass-Ergebnis
5. **04:00–04:30** — Parteien-Portal: SP-Detail, Compare SP vs. SVP, Positionen-Matrix
6. **04:30–05:00** — Vergangen-Tab + EFAS-Vorlage mit Endresultat
7. **05:00–05:30** — Admin-Panel: Login, neue Argumente erfassen, CSV-Export
8. **05:30–06:00** — Dark Mode toggle, Disclaimer, Quellen-Seite (Methodik &amp; KI-Deklaration)

---

## Projektkontext

| Bereich | Information |
|---------|-------------|
| **Modul** | Prototyping (FS 2026) |
| **Hochschule** | ZHAW School of Management and Law |
| **Studiengang** | Wirtschaftsinformatik |
| **Klasse** | WIN24TZb |
| **Entwickler** | Adi Lama |
| **Dozierende** | Max Meisterhans, Mirella Moser |
| **Konzept** | Übung 8 → 9 → 10 → 11 → Sprint 1 (Redesign + 10 Features) → Sprint 2 (Realdaten + V2-Repositioning) |

---

## Projektdokumentation (`docs/`)

Die methodische Dokumentation zu Vorgehen, Evaluation und KI-Einsatz liegt vollständig im Ordner [`docs/`](docs/) und ergänzt die in diesem README zusammengefassten Highlights. Ein:e Dozent:in findet dort alle Phasen-Artefakte, die Evaluations-Beobachtungstabelle, die KI-Einsatz-Deklaration im Detail sowie die Ablage-Anleitungen für Mockups und Screenshots.

| Dokument | Inhalt |
|---|---|
| [`docs/01-understand.md`](docs/01-understand.md) | Phase 1 — Problemraum, Persona, Annahmen, Risiken bei politischen Themen |
| [`docs/02-sketch.md`](docs/02-sketch.md) | Phase 2 — Frühe Ideen, Variantenvergleich, Skizzen |
| [`docs/03-decide.md`](docs/03-decide.md) | Phase 3 — Gewählte Lösung, MoSCoW-Priorisierung, Abgrenzungen |
| [`docs/04-prototype.md`](docs/04-prototype.md) | Phase 4 — Finale Seitenstruktur, Workflows, technische Umsetzung |
| [`docs/05-validate.md`](docs/05-validate.md) | Phase 5 — Evaluationsplan, Testaufgaben, Beobachtungstabelle, Erkenntnisse |
| [`docs/06-ki-einsatz.md`](docs/06-ki-einsatz.md) | KI-Tools, Anwendungsbereiche, manuelle Qualitätsprüfung, Reflexion |
| [`docs/07-projektorganisation.md`](docs/07-projektorganisation.md) | Repository, Branches, Commits, Issues, Deployment, technische Schulden, Future Work |
| [`docs/video-script.md`](docs/video-script.md) | Drehbuch und Sprechertext für den 5-Minuten-Walkthrough |
| [`docs/mockups/`](docs/mockups/README.md) | Ablage und Checkliste für Skizzen und Mockups |
| [`docs/screenshots/`](docs/screenshots/README.md) | Ablage und Checkliste für finale App-Screenshots |

> Die Doku ist absichtlich phasenweise getrennt, damit sich die in der Aufgabenstellung verlangten Phasen Understand → Sketch → Decide → Prototype → Validate eins-zu-eins nachvollziehen lassen.

---

## Lizenz &amp; Hinweis

Studentisches Prototyping-Projekt. Code unter MIT verwendbar. Inhalte sinngemäss aus offiziellen Quellen abgeleitet — bei Wiederverwendung bitte auf admin.ch verweisen.

**Dieser Prototyp ist keine offizielle Abstimmungshilfe.** Für rechtsverbindliche Informationen zur Abstimmung vom 14. Juni 2026 konsultiere [admin.ch](https://www.admin.ch/de/eidgenoessische-abstimmungen) und das Abstimmungsbüchlein.
