# AI Swiss Voting Assistant

> Schweizer Abstimmungen neutral verstehen — KI-gestützt, quellenbasiert, interaktiv.

[![Live](https://img.shields.io/badge/Live-friendly--llama--b738d4.netlify.app-C8102E)](https://friendly-llama-b738d4.netlify.app)
[![GitHub](https://img.shields.io/badge/GitHub-adinho11--git%2Fvoting--assistant-333)](https://github.com/adinho11-git/voting-assistant)
[![Stack](https://img.shields.io/badge/Stack-SvelteKit%202%20·%20TypeScript%20·%20MongoDB%20·%20Tailwind-003087)](#tech-stack)

---

## Inhalt

1. [Idee &amp; Problem](#idee--problem)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Setup](#lokales-setup)
5. [Architektur](#architektur)
6. [Vorgehen (Methodik)](#vorgehen-methodik)
7. [Evaluation](#usability-evaluation)
8. [KI-Einsatz](#ki-einsatz-deklaration)
9. [Erweiterungen](#erweiterungen-über-den-mindestumfang-hinaus)
10. [Projektkontext](#projektkontext)

---

## Idee &amp; Problem

In der direkten Demokratie der Schweiz stimmen rund 5,5 Mio. Stimmberechtigte bis zu vier Mal pro Jahr ab. Doch das offizielle Abstimmungsbüchlein ist textlastig, Parteien-Argumentarien sind einseitig, und unabhängige Quellen sind verstreut. **Junge Stimmberechtigte und Erst-Wählende verlieren oft den Überblick — und stimmen entweder nicht oder uninformiert.**

Der **AI Swiss Voting Assistant** löst genau dieses Problem:

- 🗳 **Briefing in 3 Minuten** — neutrale KI-Zusammenfassung jeder Vorlage
- ✓ **PRO und CONTRA gleichwertig** — jedes Argument mit Originalquelle verlinkt
- 🏛 **Alle 6 grossen Parteien transparent** — Position + Statement zur jeweiligen Vorlage
- 🧭 **Partei-Kompass-Quiz** — finde heraus, welche Partei dir am nächsten steht
- 📊 **Community-Stimmung** — anonyme Aggregation der Nutzer-Positionen
- 👤 **Persönliches Profil** — deine Voting-History + Partei-Übereinstimmung

---

## Features

### Public-Bereich

| Feature | Beschreibung |
|---------|--------------|
| **Home** | Hero mit Countdown bis zur nächsten Abstimmung + Vorschau-Grid |
| **Abstimmungsliste** | Suche, Filter (Anstehend/Vergangen/Kantonal), Desktop-Grid |
| **Briefing-Screen** | KI-Zusammenfassung, PRO/CONTRA-Split, Parteipositionen, Stimmenverhältnis, CTA |
| **Argument-Detail** | Erweiterte Erklärung + Originalquelle + Link zum Gegenargument |
| **Parteipositionen** | Detailseite pro Vorlage mit Parlament-Balken |
| **Parteien-Portal** | Alle 6 Parteien mit Filter nach Ausrichtung |
| **Partei-Detailseite** | Profil, Spektrum-Visualisierung (LR + UW), Kernthemen, Positionen, Interessen-Formular |
| **Interessen-Registrierung** | Formular pro Partei, mit Validierung + Server-Persistenz |
| **Persönliche Position** | JA/NEIN pro Vorlage, localStorage + anonym in DB |
| **Community-Stimmung** | Anonyme Aggregation als animierter Balken |
| **Partei-Kompass-Quiz** | 5-Schritt-Flow mit 1–5-Slider + Match-Algorithmus + animiertem Ranking |
| **Profil-Seite** | History, JA/NEIN-Statistik, Partei-Übereinstimmung in %, alles lokal |
| **Quellen &amp; FAQ** | Methodik, Originalquellen-Links, häufige Fragen, KI-Deklaration |

### Admin-Bereich (passwortgeschützt)

| Feature | Beschreibung |
|---------|--------------|
| **Dashboard** | Stat-Cards (Vorlagen / Interessen / Community-Stimmen) + System-Status |
| **Abstimmungen verwalten** | Tabelle mit Bearbeiten / Löschen, &quot;Neue Abstimmung&quot;-Button |
| **Erfassen / Bearbeiten** | Vollständige Editor-Oberfläche für Meta-Daten, Argumente, Parteipositionen |
| **Argumente** | PRO/CONTRA-Argumente einzeln hinzufügen / entfernen, mit Quellen-URL |
| **Parteipositionen** | Pro Vorlage alle 6 Parteien-Positionen + Statement editieren |
| **Interessen-Registrierungen** | Vollständige Liste, sortiert, mit CSV-Export (UTF-8 + BOM für Excel) |
| **Community-Stimmen** | Pro Vorlage JA/NEIN-Aggregation mit Balken |

### Foundations

- **Toast-Notification-System** — Reactive Store für Success/Error/Info-Meldungen
- **Page-Transitions** — fly in / fade out zwischen allen Routen
- **Mobile-first &amp; Desktop-optimiert** — Top-Nav (Desktop) + Bottom-Nav (Mobile), volles Desktop-Layout
- **Accessibility** — Skip-Link, ARIA-Labels, focus-visible-Styles, `prefers-reduced-motion`
- **SEO** — pro Page eigene Title + Description, canonical URLs, OG-Tags

---

## Tech Stack

| Layer | Technologie |
|-------|-------------|
| **Framework** | SvelteKit 2 (file-based routing, server load + form actions) |
| **Sprache** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS 3 + custom CSS-Variablen (Swiss Editorial Design) |
| **Fonts** | Playfair Display (Headlines), Source Sans 3 (Body), IBM Plex Mono (Data) |
| **DB** | MongoDB Atlas (mit in-memory Fallback für Mock-Modus) |
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
# .env editieren: USE_MOCK_DATA=true (default) oder MONGODB_URI eintragen
# ADMIN_PASSWORD wird mit Default 'zhaw2026admin' gesetzt

# 4. Dev-Server starten
npm run dev
# → http://localhost:5173
```

### Mit echter MongoDB

```bash
# 1. MongoDB Atlas Cluster erstellen (gratis Free-Tier reicht)
#    → mongodb.com/atlas
# 2. Connection-String kopieren und in .env eintragen:
#    MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true
#    USE_MOCK_DATA=false
# 3. Datenbank initial befüllen:
npm run seed
# → upserted ✓, Community-Seeds eingespielt
# 4. App neu starten
npm run dev
```

### Admin-Login

```
URL:      /admin
Passwort: zhaw2026admin   (änderbar via ADMIN_PASSWORD in .env)
Session:  8h (Cookie httpOnly + SameSite=Lax)
```

### Deployment auf Netlify

ENV-Variables im Netlify-Dashboard setzen:
- `MONGODB_URI` (optional)
- `USE_MOCK_DATA` (`true` oder `false`)
- `ADMIN_PASSWORD`

Push auf `main` triggert automatisches Re-Deploy.

---

## Architektur

```
src/
├── lib/
│   ├── types.ts                # Abstimmung, Argument, Partei, Position
│   ├── mockData.ts             # 4 Abstimmungen — Single Source of Truth für Seed
│   ├── parteiData.ts           # 6 Parteien mit vollständigen Profilen
│   ├── kompass.ts              # Match-Algorithmus + Fragen-Framing
│   ├── actions/
│   │   └── inView.ts           # use:inView IntersectionObserver Action
│   ├── components/             # 10 wiederverwendbare Komponenten
│   │   ├── TopNav.svelte       # Desktop sticky nav
│   │   ├── BottomNav.svelte    # Mobile bottom nav
│   │   ├── AppBar.svelte       # Mobile back-bar
│   │   ├── AbstimmungCard.svelte
│   │   ├── ParteiGrid.svelte
│   │   ├── Badge.svelte        # JA/NEIN badges
│   │   ├── VoteSection.svelte  # JA/NEIN + Community
│   │   ├── InteresseForm.svelte # Form mit Validierung
│   │   └── ToastContainer.svelte
│   ├── stores/
│   │   ├── toast.ts            # Reactive Toast-Store
│   │   └── votes.ts            # LocalStorage-backed Vote-Store
│   └── server/
│       ├── db.ts               # MongoDB-Connect mit Timeout + Fallback
│       ├── dataLayer.ts        # Unified API (DB-first, Mock-Fallback)
│       ├── abstimmungenStore.ts # In-memory store für Admin-CRUD
│       ├── communityStore.ts   # In-memory community-vote counter
│       └── interesseStore.ts   # In-memory interesse-Liste
├── routes/
│   ├── +layout.svelte          # Top-Nav, Bottom-Nav, Toast, Page-Transitions
│   ├── +page.svelte            # Home (Hero + Grid + Trust)
│   ├── +error.svelte           # 404 / 500
│   ├── abstimmungen/
│   │   ├── +page.svelte        # Liste mit Filter
│   │   └── [slug]/
│   │       ├── +page.svelte    # Briefing (Hauptworkflow)
│   │       ├── argumente/[id]/ # Argument-Detail
│   │       └── parteien/       # Vollständige Parteipositionen
│   ├── parteien/
│   │   ├── +page.svelte        # Parteien-Übersicht
│   │   └── [kuerzel]/          # Partei-Detail + Interessen-Form
│   ├── kompass/+page.svelte    # Quiz
│   ├── profil/+page.svelte     # User-History + Match
│   ├── quellen/+page.svelte    # Methodik + FAQ
│   ├── admin/
│   │   ├── +layout.svelte      # Admin-Subnav
│   │   ├── +page.svelte        # Dashboard
│   │   ├── login/, logout/     # Auth
│   │   ├── abstimmungen/
│   │   │   ├── +page.svelte    # Tabelle
│   │   │   ├── new/            # Erfassen
│   │   │   └── [slug]/edit/    # Bearbeiten
│   │   ├── interessen/         # Liste + CSV-Link
│   │   └── community/          # Aggregat-Übersicht
│   └── api/
│       ├── abstimmungen/[slug]/vote/+server.ts
│       ├── parteien/interesse/+server.ts
│       └── admin/interessen.csv/+server.ts
├── hooks.server.ts             # Admin-Auth-Guard
├── app.css                     # Design-System (Variablen + Komponenten)
├── app.d.ts                    # Locals-Typen
└── app.html                    # HTML-Shell + Fonts
```

### Datenfluss

```
┌─────────────────┐   ┌──────────────────────┐   ┌──────────────────┐
│  +page.server.ts│──▶│  lib/server/dataLayer│──▶│ MongoDB Atlas    │
│  +server.ts     │   │   (unified API)      │   │ (production)     │
│  Form Actions   │   │                      │   └──────────────────┘
└─────────────────┘   │                      │   ┌──────────────────┐
                      │   Fallback wenn keine│──▶│ In-memory stores │
                      │   DB-URI/Connection  │   │ (mock-mode)      │
                      └──────────────────────┘   └──────────────────┘
```

---

## Vorgehen (Methodik)

Die Entwicklung folgt dem Phasen-Modell aus dem Modul **Prototyping (ZHAW, FS 2026)**:

### 1. Understand &amp; Define (Übung 8)
- **Problemraum**: Schweizer Stimmberechtigte verlieren Überblick bei vielen, komplexen Vorlagen.
- **Zielgruppe**: Erst-Wähler, junge Stimmberechtigte, politisch Interessierte ohne Zeit für Abstimmungsbüchlein.
- **Ziel**: Briefing-App, die in 3 Minuten neutral aufklärt.
- **Artefakt**: `Uebung8_Ideenfindung.pdf`

### 2. Sketch (Übung 9)
- Crazy-8s mit verschiedenen Navigationsmodellen.
- Auswahlkriterien: Mobile-first, neutralisierbar, expandierbar (Kantone, Parlamentswahlen).
- **Artefakt**: `Uebung9_Abgabe_Adi_Lama.pdf`

### 3. Decide (Übung 10)
- Mockup in Figma: Mobile-Wireframes für Home, Liste, Briefing, Detail.
- Variante festgelegt: Bottom-Nav-App mit zentralem Briefing-Workflow.
- **Artefakt**: `Uebung10_Abgabe_Adi_Lama.pdf`

### 4. Prototype (Übung 11 + finaler Sprint)
- Übung 11: Erste SvelteKit-Implementation (Mobile-only, max-width 430px).
- **Finaler Sprint** (dieser Commit-Stream): Komplettes Swiss Editorial Redesign, Desktop-Layout, Daten-Persistenz, Admin-Panel, alle interaktiven Features.

### 5. Validate (Mai 2026)
- Usability-Test mit zwei Personen (siehe unten).
- Beobachtungen → Verbesserungen → finale Iteration.

---

## Usability Evaluation

### Setup
- **Datum**: 20. Mai 2026
- **Methode**: Moderierter On-Site Usability-Test, ~10 Min. pro Person, Think-Aloud
- **Testpersonen**:
  - **Andi Kadolli** (24, IT-Student, ZHAW) — Mobile-Nutzer, technisch versiert
  - **Donart Imeri** (26, Wirtschafts-Student, ZHAW) — Desktop-Nutzer, politisch interessiert
- **Aufgaben**:
  1. &quot;Finde heraus, was die Klima-Initiative 2026 besagt und wie deine Lieblings-Partei dazu steht.&quot;
  2. &quot;Finde mit dem Kompass die Partei, die deinen Positionen am nächsten steht.&quot;
  3. &quot;Stimme bei zwei Vorlagen ab und sieh dein Profil an.&quot;

### Wichtigste Erkenntnisse (Vorher-Version)

| # | Beobachtung | Schwere | Behoben durch |
|---|-------------|---------|---------------|
| 1 | App wirkte auf Desktop &quot;wie ein vergessenes iPhone in der Mitte&quot; — schmal, viel weisser Rand | Hoch | Komplettes Desktop-Layout mit Top-Nav, Grid, voller Breite |
| 2 | Argumente waren als Cards erkennbar, aber Klick führte zu Detail-Seite — Nutzer erwartete Expand-Inline | Mittel | Argumente bleiben als Link; Card-Hover-Effekt verstärkt, Klick-Pfeil hinzugefügt |
| 3 | Nutzer wollte &quot;eigene Meinung speichern&quot;, fand keinen Button | Hoch | VoteSection mit JA/NEIN + Community-Stimmung im Briefing eingebaut |
| 4 | Kein klares Branding — wirkte &quot;wie generische Voting-App&quot; | Mittel | Swiss Editorial Design-System (Rot/Off-White, Playfair-Display, Schweizer Kreuz Logo) |
| 5 | Parteien-Liste fühlte sich &quot;wie Fussnote&quot; an — Nutzer wollte mehr über Parteien wissen | Mittel | Komplettes Parteien-Portal mit Detailseiten + Spektrum-Visualisierung |
| 6 | &quot;Wer steckt hinter dieser App? Sind das die Linken?&quot; — fehlende Transparenz | Hoch | Quellen-Seite ausgebaut + Trust-Sektion auf Home |

### Abgeleitete Verbesserungen (in finale Version eingeflossen)

- ✅ Desktop-Top-Nav + voller Breite-Layout
- ✅ VoteSection mit JA/NEIN-Buttons direkt im Briefing
- ✅ Community-Stimmung als animierter Balken
- ✅ Partei-Detailseiten mit Spektrum-Visualisierung
- ✅ Partei-Kompass-Quiz als interaktive Selbsteinschätzung
- ✅ Profil-Seite mit History und Partei-Match
- ✅ Tooltips/Hover-Effekte auf allen Cards
- ✅ Klare KI-Deklaration auf Quellen-Seite

---

## KI-Einsatz (Deklaration)

Diese App wurde unter intensivem Einsatz von **Claude Opus 4.7 (Anthropic)** als Code-Assistent entwickelt. Konkrete Verwendung:

| Phase | KI-Einsatz | Eigenleistung |
|-------|------------|---------------|
| Ideenfindung | Brainstorming-Sparring | Konzept &amp; Zielgruppe selbst formuliert |
| Mockups | — | Vollständig in Figma erstellt |
| Code-Generierung | SvelteKit-Komponenten, CSS-Design-System, Server-Routen | Architektur-Entscheidungen, Datenmodell, Datenmigration |
| Mock-Daten (Abstimmungen, Parteien) | Erste Vorschläge | Fakten-Check, Kürzung, journalistische Neutralisierung |
| Inhaltliche Texte | Erste Entwürfe der Argumente | Vergleich mit echten Quellen (admin.ch, BFE, BAFU), Korrekturen |
| Match-Algorithmus | Kern-Logik | Test-Daten, Korrekturen, Edge-Cases |
| README / Doku | Strukturvorschlag, Tabellen-Layout | Inhalt selbst |
| Usability-Test | — | Vollständig selbst durchgeführt |

**Verantwortung**: Sämtliche Inhalte wurden vor Veröffentlichung von Hand geprüft. Politische Argumente sind absichtlich ausgewogen formuliert. Faktische Aussagen sind mit Originalquellen verlinkt. Der KI-Einsatz ersetzt nicht die kritische Prüfung — diese liegt vollständig beim Entwickler.

**Prompts &amp; Workflow**: Die zentralen Prompts (insbesondere der finale Upgrade-Prompt mit Phasen-Plan) sind im Repository unter `docs/prompts/` versioniert (sofern vorhanden) oder in der Git-Commit-Historie nachvollziehbar.

---

## Erweiterungen (über den Mindestumfang hinaus)

Über die in den Übungen 8–11 definierten Mindestanforderungen hinaus wurden folgende Erweiterungen umgesetzt:

| Erweiterung | Mehrwert |
|-------------|----------|
| **Partei-Kompass-Quiz** | Interaktive Selbsteinschätzung mit Match-Algorithmus |
| **Profil-Seite** | Persönliche History + dynamische Partei-Übereinstimmung |
| **Admin-Panel mit CRUD** | Vollständige Daten-Verwaltung, nicht nur Anzeige |
| **CSV-Export** | Reale Daten-Export-Funktion für Interessen |
| **Community-Aggregation** | Server-seitiges Voting + Cookie-basierte Idempotenz |
| **Swiss Editorial Design-System** | Eigenes CSS-Variablen-System, kein Standard-Framework-Look |
| **MongoDB + Fallback-Architektur** | Production-ready DB-Layer mit graceful degradation |
| **Page-Transitions** | Echte fly/fade-Animationen zwischen Routen |
| **Scroll-Reveal mit IntersectionObserver** | Custom Svelte-Action |
| **Vollständige A11y-Implementierung** | Skip-Link, ARIA, prefers-reduced-motion, focus-visible |
| **Seed-Script** | Reproducible DB-Initialisierung |
| **TypeScript strict + zentrales Datenmodell** | Type-Safety vom Frontend bis ins Backend |

---

## Bewertungs-Mapping (ZHAW)

| ZHAW-Kriterium | Erfüllt durch |
|----------------|---------------|
| Mindestumfang Workflows | Briefing-Workflow (Home → Liste → Briefing → Argument-Detail → Vote) |
| Daten erfassen / bearbeiten | Admin-Panel mit CRUD für Abstimmungen + Argumente + Parteipositionen |
| Übersichtsseite mit DB-Daten | Home + Abstimmungen-Liste laden aus dataLayer |
| SvelteKit + Komponenten | 10+ wiederverwendbare Komponenten in `src/lib/components/` |
| MongoDB-Persistenz | dataLayer mit Atlas-Connect + In-memory-Fallback |
| Mehrere Pages + Navigation | 12+ Routen, Top-Nav (Desktop) + Bottom-Nav (Mobile) |
| Validierungen | InteresseForm, Admin-Forms — Inline-Errors + Server-Validation |
| Visuelle Datenauswertung | Community-Balken, Match-Bars, Spektrum-Visualisierungen |
| Rollenunterschiede | Public vs. Admin (Auth-Guard) |
| Online zugänglich | https://friendly-llama-b738d4.netlify.app |
| GitHub-Repo vollständig | https://github.com/adinho11-git/voting-assistant (öffentlich) |
| Strukturierte Commit-History | Pro Feature ein Commit, jeder mit Co-Author-Tag |
| Evaluation dokumentiert | Siehe Sektion &quot;Usability Evaluation&quot; |
| KI-Einsatz transparent | Siehe Sektion &quot;KI-Einsatz&quot; |

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
| **Konzept** | Übung 8 (Ideenfindung) → Übung 9 (Sketches) → Übung 10 (Mockups) → Übung 11 (Erste Implementation) → Final Sprint (alle Features, Redesign, Polish) |

---

## Lizenz

Studentisches Prototyping-Projekt. Code unter MIT verwendbar. Inhalte (Abstimmungs-Argumente) sind sinngemäss aus offiziellen Quellen abgeleitet — bei Wiederverwendung bitte auf admin.ch verweisen.
