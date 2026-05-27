# Projektorganisation

> Diese Datei dokumentiert, wie das Projekt organisatorisch aufgebaut ist: Repository, Branches, Commits, Issues, Artefakt-Ablage, Deployment, technische Schulden und Future Work.

---

## Repository

- **GitHub:** <https://github.com/adinho11-git/voting-assistant>
- **Sichtbarkeit:** öffentlich (mit Zugang für alle Modul-Dozierenden gemäss Modulrichtlinien).
- **Standardbranch:** `main` — automatisches Netlify-Deployment bei jedem Push.
- **Lizenz und Verantwortung:** studentisches Modul-Projekt, siehe Hinweise in der README im Repo-Root.

### Wichtige Verzeichnisse

```
voting-assistant/
├── src/                         # Anwendungscode (SvelteKit)
│   ├── lib/                     # Wiederverwendbare Komponenten, Stores, Daten, Server-Utils
│   ├── routes/                  # File-based Routing
│   ├── app.css / app.html       # Globales Styling / Shell
│   └── hooks.server.ts          # Admin-Auth-Guard
├── static/                      # Statische Assets (favicon, etc.)
├── scripts/seed.mjs             # MongoDB-Seed (optional)
├── docs/                        # Projekt-Dokumentation (diese Dateien)
│   ├── 01-understand.md
│   ├── 02-sketch.md
│   ├── 03-decide.md
│   ├── 04-prototype.md
│   ├── 05-validate.md
│   ├── 06-ki-einsatz.md
│   ├── 07-projektorganisation.md
│   ├── mockups/                 # Skizzen / Wireframes / Figma-Exports
│   ├── screenshots/             # Finale App-Screenshots
│   └── video/                   # Kommentierter Walkthrough
├── README.md                    # Einstiegspunkt im Repo
├── package.json
├── svelte.config.js
├── tsconfig.json
└── tailwind.config / postcss.config / vite.config
```

## Branch- und Commit-Strategie

Da das Projekt als **Einzelarbeit** umgesetzt wurde, ist die Branch-Strategie bewusst schlank gehalten:

- **`main`** als einziger langlebiger Branch, von dem Netlify deployt.
- **Feature-Arbeit** direkt auf `main` oder in kurzen, lokal-temporären Branches, die nach Merge gelöscht werden.
- **Commit-Stil:** sprechende Imperativ-Commit-Messages auf Deutsch oder Englisch, in der Regel kurz, mit klarem Subjekt.

Auszug aus der tatsächlichen Commit-Historie (`git log --oneline`):

- `adf6335 Improve mobile layout responsiveness`
- `7b00a0d Add deployment and SEO polish`
- `2e28a6d Add architecture decision records`
- `82f3139 Replace media placeholders with verified article links`
- `41cc09f Add GitHub issue tracking documentation`
- `5dffe8a Document sketch and mockup artifacts`
- `c5ea577 Complete private evaluation participant details`
- `9e2234d feat: Admin-Panel mit CRUD und Interessen-Export`
- `e563518 feat: Profil-Seite mit History und Partei-Übereinstimmung`
- `ff6ea08 feat: Partei-Kompass Quiz mit Match-Algorithmus`

Die Historie zeigt sowohl Feature-Arbeit als auch Dokumentations-, Deployment- und Qualitätsverbesserungen. Einzelne späte Abschluss-Commits sind breiter formuliert, weil mehrere Abgabeartefakte gemeinsam finalisiert wurden.

## Issue-Management

Das Issue-Set liegt in [`issues.md`](issues.md). Es enthält 16 realistische Issues aus dem Projektverlauf mit Status, Priorität, Label-Vorschlägen, Akzeptanzkriterien, Bewertungsraster-Bezug und Umsetzungshinweisen.

Für die Abgabe ist diese Datei die verlässliche, versionierte Issue-Dokumentation im Repository. Die Einträge können zusätzlich im GitHub-Issue-Board gespiegelt werden; massgebend für die Projektdokumentation bleibt jedoch der Stand in [`issues.md`](issues.md), weil er direkt mit README, Phasen-Dokumentation, Screenshots und Video verlinkt ist.

Statuslogik:

- **Done**: im Prototyp umgesetzt und/oder in der Dokumentation nachweisbar.
- **In progress**: Abschluss- oder Qualitätsaufgabe, die vor Abgabe nochmals geprüft wird.
- **Open**: bewusst verbleibende Restaufgabe oder Future-Work-Punkt.

Zusätzlich sind einfache GitHub-Issue-Templates unter `.github/ISSUE_TEMPLATE/` vorbereitet:

- `feature.md`
- `bug.md`
- `ux.md`
- `documentation.md`

## Architectural Decision Records

Zentrale Architektur- und Produktentscheidungen sind als ADRs dokumentiert. Sie zeigen, welche technischen und methodischen Entscheidungen bewusst getroffen wurden und welche Trade-offs daraus entstehen.

- [ADR 001: MongoDB mit Fallback](adr/001-mongodb-mit-fallback.md)
- [ADR 002: LocalStorage für persönliche Daten](adr/002-localstorage-fuer-persoenliche-daten.md)
- [ADR 003: KI-Unterstützung mit Quellenprüfung](adr/003-ki-unterstuetzung-mit-quellenpruefung.md)
- [ADR 004: SvelteKit und Netlify](adr/004-sveltekit-und-netlify.md)
- [ADR 005: Kompass und Argumentgewichtung](adr/005-kompass-und-argumentgewichtung.md)

## Wichtige Meilensteine

| Phase / Meilenstein | Inhalt |
|---|---|
| **Übung 8 — Understand** | Problemraum, Zielgruppe, Persona, Annahmen |
| **Übung 9 — Sketch** | Crazy-8s, Variantenvergleich, Mobile-First-Entscheid |
| **Übung 10 — Decide** | Figma-Mockup, MoSCoW, Workflow festgelegt |
| **Übung 11 — Prototype** | Erste SvelteKit-Version, Mobile-Layout |
| **Sprint 1** | Swiss Editorial Redesign, Desktop-Layout, Persistenz, Admin, Basis-Features |
| **Sprint 2** | Real-Data-Replacement (admin.ch), Kompass V2, Voting-Journal, Dark Mode, Disclaimer |
| **Validate-Phase** | Moderierte Usability-Tests mit ersten Testpersonen, Iteration |
| **Doku & Abgabe** | README + `docs/`-Struktur, Screenshots, Video-Walkthrough |

## Ablage der Artefakte

Sämtliche Artefakte sind im Repo selbst greifbar — kein Cloud-Ordner, kein Drive:

| Artefakt | Ort |
|---|---|
| Phasen-Dokumentation | `docs/01-…` bis `docs/07-…` |
| Mockups / Skizzen | `docs/mockups/` (siehe [`mockups/README.md`](mockups/README.md)) |
| Screenshots | `docs/screenshots/` (siehe [`screenshots/README.md`](screenshots/README.md)) |
| Video-Walkthrough | `docs/video/voting-assistant-walkthrough_2026-05-28.mp4` |
| Promptvorgehen / KI-Workflows | `docs/prompts.md` |
| Datenquelle | `src/lib/realData.ts`, `src/lib/parteiData.ts`, `src/lib/kompass.ts` |
| Code | `src/` |
| Deployment-Konfiguration | `svelte.config.js`, `netlify` via Adapter |

## Deployment-Prozess

- **Plattform:** Netlify (Build-Adapter `@sveltejs/adapter-netlify`).
- **Quelle:** GitHub-Repo `main`-Branch.
- **Auslöser:** jeder Push auf `main` löst einen Build aus.
- **Build-Befehle:** standard (`npm install` → `npm run build`).
- **Environment-Variablen in Netlify:**
  - `MONGODB_URI` — Connection-String für MongoDB Atlas.
  - `USE_MOCK_DATA` — muss für den produktiven MongoDB-Modus exakt auf `false` gesetzt sein; sonst nutzt die App den Seed-/Fallback-Modus.
  - `ADMIN_PASSWORD` — Passwort für den Admin-Bereich.
- **Aktuelle URL:** <https://friendly-llama-b738d4.netlify.app>
- **Custom Domain:** keine Custom Domain geplant; die Abgabe verweist auf die Netlify-URL.

Keine geheimen Werte werden im Repository dokumentiert. Der Admin-Screenshot [`screenshots/13-admin.png`](screenshots/13-admin.png) zeigt den produktiven MongoDB-Atlas-Modus mit `USE_MOCK_DATA=false`.

### Datenbank- und CRUD-Nachweis

Die Mindestanforderung «Daten werden aus einer Datenbank geladen und angezeigt; Daten können erstellt und/oder aktualisiert werden» wird organisatorisch wie folgt nachgewiesen:

| Nachweis | Umsetzung |
|---|---|
| Datenbank-Anbindung | MongoDB Atlas über `src/lib/server/db.ts` und `src/lib/server/dataLayer.ts` |
| Produktiver Modus | Aktiv, wenn `MONGODB_URI` gesetzt ist und `USE_MOCK_DATA=false` gilt |
| Fallback | Seed-/In-Memory-Modus für lokale Entwicklung und robuste Demo-Anzeige |
| Collections | `abstimmungen`, `communityVotes`, `parteiInteressen` |
| Daten laden und anzeigen | Öffentliche Seiten laden Abstimmungen, Argumente, Parteipositionen und Community-Aggregate über den Data Layer |
| Daten erstellen / aktualisieren | Admin-CRUD für Abstimmungen, Argumente und Parteipositionen; Community-Votes; Interessen-Registrierungen |
| Persönliche Daten | Stimmen, Notizen, Journal und Kompass-Ergebnis bleiben im Browser-`localStorage` |

Für Screenshots und Video ist mindestens eine Admin-Ansicht sichtbar: Das Dashboard zeigt Datenbankstatus, verwaltete Abstimmungen, Interessen-Registrierungen und Community-Stimmen. Der Walkthrough zeigt zusätzlich den Admin-/CRUD-Bereich, um die CRUD-Funktionalität noch direkter sichtbar zu machen.

### Vorgehen beim Deployen

1. Lokal `npm run check` und `npm run build` durchlaufen lassen.
2. Commit + Push auf `main`.
3. Netlify-Dashboard prüfen (Build erfolgreich, Logs sauber, `MONGODB_URI`, `USE_MOCK_DATA=false` und `ADMIN_PASSWORD` gesetzt).
4. Live-URL aufrufen, kritische Routen kurz prüfen (`/`, `/abstimmungen`, `/kompass`, `/profil`, `/admin/login`).
5. Admin-Dashboard prüfen: Für die finale Abgabe muss dort MongoDB Atlas beziehungsweise `USE_MOCK_DATA=false` sichtbar sein.

### Build-Toolchain-Pinning

Die App bleibt bewusst auf Svelte 4. Die Svelte-/Vite-Toolchain ist deshalb in `package.json` ohne Caret gepinnt: `@sveltejs/kit@2.5.28`, `@sveltejs/vite-plugin-svelte@3.1.2`, `svelte@4.2.20`, `svelte-check@3.8.6` und `vite@5.4.21`.

Grund: Neuere SvelteKit-2-Minor-Versionen wie `2.59.x` importieren Runtime-Exports wie `hydratable`, `untrack`, `fork` und `settled`, die in Svelte 4 nicht verfuegbar sind. Das fuehrte beim Produktionsbuild zu Export-Warnungen, obwohl die App selbst auf Svelte 4 korrekt laeuft. Der Pin haelt lokale Builds und Netlify-Deploys auf einer stabilen Svelte-4-kompatiblen Kombination.

## Bekannte technische Schulden

| Schuld | Wo | Auswirkung | Empfohlene Massnahme |
|---|---|---|---|
| `mockData.ts` ist ein Legacy-Re-Export über `realData.ts` | [`src/lib/mockData.ts`](../src/lib/mockData.ts) | Kann als Lesefalle wirken, weil der Name «mock» nahelegt, es seien Demo-Daten | Entweder löschen oder als `@deprecated` Compatibility-Shim mit klarem Kommentar belassen |
| `realData.ts` ist eine sehr grosse Datei (>30k Tokens) | [`src/lib/realData.ts`](../src/lib/realData.ts) | Mühsam zu reviewen, Diffs sind unübersichtlich | Aufsplitten in `src/lib/data/abstimmungen/<slug>.ts` mit zentralem Index |
| Doppelte Speicherung der Position in `votes` und `engagement.journal` | [`votes.ts`](../src/lib/stores/votes.ts) + [`engagement.ts`](../src/lib/stores/engagement.ts) | Kann inkonsistent werden bei Edge-Cases | Single Source of Truth wählen und die andere als Cache markieren, oder konsolidieren |
| Admin-Passwort hat Hardcoded-Fallback | [`hooks.server.ts`](../src/hooks.server.ts) | Sicherheitsrelevant, akzeptabel für Prototyp, aber dokumentationspflichtig | Env-Variable zwingend setzen, Fallback entfernen oder klar als Demo-Modus markieren |
| Community-Vote-Aggregation mischt Seed mit DB-Counts | [`dataLayer.ts`](../src/lib/server/dataLayer.ts) `getCommunityVotes` | Verwirrend bei Code-Review | Seed-Logik entfernen, sobald genug echte Stimmen vorliegen |
| Canonical-URL ist hartkodiert | [`+layout.svelte`](../src/routes/+layout.svelte) | Custom-Domain-Umstellung wäre fehleranfällig | Über `PUBLIC_SITE_URL` aus Env lesen |
| Keine automatisierten Tests | gesamtes Projekt | Manuelle Regression notwendig | Mindestens ein E2E-Smoke-Test für den Kern-Workflow (Playwright) |
| Workflow-Schritte (4 oder 6) mehrfach hardcoded | mehrere Routen / Komponenten | Inkonsistenz im UI | Zentrale Konstante anlegen und überall importieren |

## Future Work

Diese Punkte gehen über den Mindestumfang hinaus und sind als sinnvolle Folgeschritte gedacht:

- **Automatisierte Datenpflege** gegen die Bundeskanzlei-API.
- **Mehrsprachigkeit** (FR / IT) im Briefing-Teil.
- **Profil-Export** als JSON oder PDF, ohne Konto-Zwang.
- **Spektrum-Visualisierung 2D** im Kompass-Ergebnis.
- **A/B-Test** zur Wirkung der Live-Tendenz auf das Entscheidungsverhalten.
- **Native PWA**-Erweiterung mit Offline-Modus.
- **Browser-Erweiterung**, die ein Briefing auf news-Seiten als Overlay anbietet.
- **Längere Historie** vergangener Abstimmungen mit Archiv-Suche.
- **Lehrmaterial-Modus** für Schulen mit didaktischen Aufgaben.
- **Erweiterte Accessibility-Audits** (Screenreader, Tastaturnavigation, Kontraste).

---

**Zurück zur Übersicht:** [`README.md`](../README.md)
