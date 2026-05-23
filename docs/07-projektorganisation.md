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
│   ├── video-script.md
│   ├── mockups/                 # Skizzen / Wireframes / Figma-Exports
│   └── screenshots/             # Finale App-Screenshots
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

Beispiele bisheriger Commit-Stile aus der Historie:

- `feat: Argument-Gewichtung mit Live-Tendenz`
- `fix: dark mode FOUC eliminieren`
- `chore: realData für Juni-2026-Vorlagen aktualisieren`
- `docs: README + docs/ vollständig`
- `refactor: dataLayer trennt Mock und Mongo sauber`

> **TODO:** Falls am Ende einzelne Commits noch fehlen oder zusammengefasst werden sollen, vor der Abgabe einmal `git log --oneline` durchsehen und ggf. ergänzen.

## Issue-Management

> **TODO:** Issue-Liste vor der Abgabe als sichtbaren Bestandteil des Repos sicherstellen.

Empfehlung für die Ablage:

- **Offene Issues** anlegen für die noch unter «Offene Verbesserungen» genannten Punkte (siehe [`05-validate.md`](05-validate.md)).
- **Geschlossene Issues** im Nachgang anlegen für die wichtigsten Meilensteine, die bereits umgesetzt sind (Voting-Journal, Dark Mode, Kompass V2, Realdaten-Replacement, Admin-CRUD), damit eine Spur des Vorgehens auch in GitHub sichtbar ist.
- **Labels:** `feature`, `bug`, `ux`, `docs`, `nice-to-have`.

Vorschläge für Issues, die bereits jetzt sinnvoll als «Open» geführt werden können:

- Theme-Toggle auch in Mobile-Nav anbieten
- Workflow-Schritte vereinheitlichen (Startseite vs. Detail vs. Übersicht)
- `votesStore` und `engagementStore.journal[].position` konsolidieren
- 2D-Spektrum-Visualisierung im Kompass-Ergebnis
- Optionalen Profil-Export (JSON / PDF) bauen
- E2E-Smoke-Test für Kern-Workflow

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

> **TODO:** Falls weitere Sprints durchlaufen wurden, hier ergänzen.

## Ablage der Artefakte

Sämtliche Artefakte sind im Repo selbst greifbar — kein Cloud-Ordner, kein Drive:

| Artefakt | Ort |
|---|---|
| Phasen-Dokumentation | `docs/01-…` bis `docs/07-…` |
| Mockups / Skizzen | `docs/mockups/` (siehe [`mockups/README.md`](mockups/README.md)) |
| Screenshots | `docs/screenshots/` (siehe [`screenshots/README.md`](screenshots/README.md)) |
| Video-Drehbuch | `docs/video-script.md` |
| Datenquelle | `src/lib/realData.ts`, `src/lib/parteiData.ts`, `src/lib/kompass.ts` |
| Code | `src/` |
| Deployment-Konfiguration | `svelte.config.js`, `netlify` via Adapter |

> **TODO:** Falls die ZHAW-Übungs-PDFs (Übung 8, 9, 10) ebenfalls Teil der Abgabe sein sollen, im Repo unter `docs/uebungen/` ablegen und hier verlinken.

## Deployment-Prozess

- **Plattform:** Netlify (Build-Adapter `@sveltejs/adapter-netlify`).
- **Quelle:** GitHub-Repo `main`-Branch.
- **Auslöser:** jeder Push auf `main` löst einen Build aus.
- **Build-Befehle:** standard (`npm install` → `npm run build`).
- **Environment-Variablen in Netlify:**
  - `MONGODB_URI` — Connection-String für MongoDB Atlas.
  - `USE_MOCK_DATA` — `false` für Produktion mit DB, `true` für Mock-Modus.
  - `ADMIN_PASSWORD` — Passwort für den Admin-Bereich.
- **Aktuelle URL:** <https://friendly-llama-b738d4.netlify.app>
- **Custom Domain:** noch nicht konfiguriert. **TODO:** Falls gewünscht, in Netlify hinterlegen und in der README ergänzen.

### Vorgehen beim Deployen

1. Lokal `npm run check` und `npm run build` durchlaufen lassen.
2. Commit + Push auf `main`.
3. Netlify-Dashboard prüfen (Build erfolgreich, Logs sauber).
4. Live-URL aufrufen, kritische Routen kurz prüfen (`/`, `/abstimmungen`, `/kompass`, `/profil`, `/admin/login`).

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
