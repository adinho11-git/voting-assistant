# KI-Einsatz im Projekt

> Diese Dokumentation listet sämtliche KI-Werkzeuge auf, die für den Voting Assistant eingesetzt wurden, sowie die manuellen Qualitätsprüfungen, die parallel stattgefunden haben.

---

## Eingesetzte KI-Werkzeuge

| Tool | Anbieter | Hauptzweck im Projekt |
|---|---|---|
| **Claude Opus 4.7** | Anthropic | Code-Assistent für SvelteKit-Komponenten, Refactorings, Architektur-Diskussionen, Doku-Strukturierung |
| **Claude Code (CLI)** | Anthropic | Direkter Editor-Zugriff für mehrteilige Dateiänderungen, Reviews und das Erstellen dieser Dokumentation |
| **ChatGPT** (gelegentlich) | OpenAI | Stichproben-Vergleich für UX-Formulierungen und alternative Codebeispiele |

> **TODO:** Falls weitere Tools eingesetzt wurden (Codex, Cursor, Gemini, Copilot, Midjourney etc.), hier nachtragen mit Anbieter und Zweck.

---

## Wofür KI eingesetzt wurde

### Code

- **Komponentengerüste** für Svelte-Komponenten (z. B. `VoteSection`, `ArgumentWeighting`, `VotingJournal`).
- **TypeScript-Typsystem** in `src/lib/types.ts` und Refinements an den Server-Stores.
- **Refactorings**: konsistente Klassennutzung, Aufteilung grosser Komponenten, Tailwind-Class-Cleanup.
- **Tailwind-Konfiguration** und das CSS-Token-System in `src/app.css` (Light + Dark).
- **MongoDB-Wrapper** in `src/lib/server/db.ts` und das `dataLayer.ts`-Pattern.
- **API-Routes** für Vote-Endpoints und CSV-Export.
- **Boilerplate** für Form-Validierung im Admin-Bereich.

### Inhalt

- **Erste Entwürfe** von Argument-Texten auf Basis der amtlichen Vorlagen-Texte (Bundesrat-Botschaft, Komitee-Argumentarien).
- **Strukturierung** der KI-Briefings unter Wahrung der Quelle (admin.ch).
- **Sprachliche Verdichtung** langer amtlicher Texte in 3–5-Satz-Briefings.
- **Erste Vorschläge** für die 18 Kompass-Szenarien und ihre 10 Themen.

### UX und Kommunikation

- **UX-Kritik** zum Workflow-Aufbau (Anzahl Schritte, Bezeichnungen, Reihenfolge).
- **Formulierungs-Reviews** für vorsichtige, nicht-manipulative Sprache (Tendenz statt Empfehlung).
- **Microcopy** für Toasts, Hinweise, Empty-States.
- **Disclaimer-Texte** für die Kennzeichnung als studentischer Prototyp.

### Methodik und Bewertung

- **Bewertungsraster-Analyse**: Strukturierte Auseinandersetzung mit dem Modul-Bewertungsraster, um den Stand des Projekts gegenüber jedem Kriterium einschätzen zu können.
- **Doku-Struktur**: Aufbau dieser Phasen-Dateien (`01-understand.md` bis `07-projektorganisation.md`).
- **README-Konsolidierung** und Konsistenzprüfung.

---

## Was manuell geprüft und entschieden wurde

Sämtliche KI-Outputs sind vor der Übernahme manuell geprüft worden. Insbesondere:

- **Politische Inhalte** — jedes Argument wurde mit der angegebenen Originalquelle verglichen. Argumente, die KI «plausibel klangen», aber nicht in der Quelle stehen, wurden verworfen.
- **Quellen-Links und Daten** — `sourceUrl` und `sourceDate` wurden manuell geprüft, Tippfehler bei URLs sind häufiger, als man denkt.
- **Bundesrat- und Parlaments-Positionen, Endresultate** — direkt von admin.ch / bk.admin.ch übernommen, nicht aus KI-Outputs.
- **Parteipositionen** — auf Parteiwebsites und in Mediencoverage gegengeprüft.
- **Kompass-Fragen** — Parteipositionen pro Frage wurden manuell kalibriert und auf Bias hin geprüft.
- **Neutralität der Sprache** — Pro/Contra-Argumente wurden auf vergleichbaren Tonfall und vergleichbare Schärfe geprüft.
- **Funktionale Korrektheit** — jeder generierte Code wurde lokal getestet, Fehler korrigiert, Edge-Cases nachgezogen.
- **Architekturentscheidungen** — Datenmodell, Routing-Struktur, Persistenz-Strategie, Auth-Mechanismus wurden bewusst entschieden, nicht von KI vorgeschlagen.
- **Visuelles Design** — Token-System, Typografie, Farbpalette wurden vom Entwickler festgelegt; KI hat nur bei der Umsetzung geholfen.

---

## Beispiel-Prompts

> Die nachfolgenden Prompts illustrieren den Stil, in dem KI eingesetzt wurde. Sie sind verkürzt wiedergegeben.

### Beispiel 1 — Code-Assistent

> «Erstelle eine Svelte 4-Komponente `ArgumentWeighting.svelte`, die für jede Vorlage zwei Spalten (Pro / Contra) zeigt. Pro Argument 4 Buttons (0–3) für die Gewichtung. Live berechnen: Pro-Score, Contra-Score, Tendenz (JA/NEIN/Unsicher). Verwende den Engagement-Store `setArgumentWeight(slug, argId, side, weight)`. Setze beim Klick auf «Tendenz speichern» einen Eintrag im Voting-Journal mit Typ `weights`.»

### Beispiel 2 — UX-Kritik

> «Hier ist die aktuelle Startseite [Quellcode]. Bitte sag mir aus UX-Sicht: ist der Hero zu lang? Wo verliere ich Erst-Nutzende? Welche Sektion ist redundant zu welcher? Konkrete Vorschläge in priorisierter Reihenfolge.»

### Beispiel 3 — Inhalt strukturieren

> «Hier ist die offizielle Bundesrat-Botschaft zur Nachhaltigkeitsinitiative [Original-Link]. Bitte verdichte den Kern in drei Sätze in neutralem Schweizer Deutsch. Verwende keine wertenden Adjektive. Erwähne, dass Bundesrat und Parlament die Initiative ablehnen, ohne zu werten warum.»

### Beispiel 4 — Bewertungsraster-Analyse

> «Hier ist das ZHAW-Bewertungsraster [PDF-Inhalt] und der aktuelle Projektstand [Code-Übersicht]. Bewerte das Projekt streng nach jedem Kriterium, schätze die Punkte und priorisiere die wichtigsten 3 Verbesserungen für eine bessere Note.»

> **TODO:** Falls eine vollständige Promptliste gewünscht ist, hier oder in einer eigenen Datei `docs/prompts.md` einen tagebuchartigen Auszug der wichtigsten Sessions ergänzen.

---

## Abgrenzung — was die KI ausdrücklich nicht macht

- **Keine politische Wertung.** KI generiert keine Aussagen über «richtige» oder «falsche» politische Positionen.
- **Keine erfundenen Quellen.** Quellen-Links wurden manuell geprüft; URL-Halluzinationen wurden konsequent verworfen.
- **Keine fiktiven Resultate.** Endresultate vergangener Abstimmungen kommen direkt von der Bundeskanzlei, nicht aus dem Sprachmodell.
- **Keine Personendaten.** Die App speichert keine personenbezogenen Daten serverseitig; KI hat keinen Zugriff auf Nutzer-Stimmen.
- **Keine Entscheidung über die App-Identität.** Konzept, Zielgruppe, Workflow und Tonalität wurden vom Entwickler festgelegt.

---

## Reflexion

### Nutzen

- **Erheblicher Geschwindigkeitsgewinn** bei Boilerplate (Komponenten-Skelette, Form-Validierung, MongoDB-Wrapper). Realistisch geschätzt: Faktor 3–4 schneller als manuell.
- **Frühe Konsistenz** im Design-System, weil KI gut Tokens und Spacing einhält, wenn man eines vorgibt.
- **UX-Sparringspartner**, der jederzeit gegenliest und kritische Fragen stellt.
- **Doku-Beschleuniger**, der Strukturen und Tabellen schnell vorschlägt.

### Risiken und wie sie adressiert wurden

| Risiko | Adressierung |
|---|---|
| **Quellen-Halluzination** (KI erfindet Links / Daten) | Manuelle Prüfung aller URLs und Datumsangaben |
| **«Plausibel klingender» falscher Inhalt** | Quellenvergleich pro Argument, Verzicht auf Aussagen, die nicht belegt sind |
| **Bias zur populärsten Position** | Bewusste Kalibrierung von Pro/Contra in Anzahl, Wortlänge und Schärfe |
| **Code, der auf den ersten Blick funktioniert, aber Edge-Cases ignoriert** | Lokales Testen, Type-Check (`svelte-check`), manuelle Code-Review |
| **Subtile Anglizismen und ungewollte Übersetzungen** | Manuelle Sprach-Review aller User-facing Texte auf Deutsch / Schweizer Deutsch |
| **Überspezifizierung in Prompts** | Iterativer Stil mit kleinen Schritten, statt einer einzigen «Build the whole app»-Anweisung |

### Qualitätssicherung — Checkliste

Pro KI-Output wurde geprüft:

- [x] Liegt eine Originalquelle vor, ist die URL korrekt, ist das Datum plausibel?
- [x] Stimmt der Inhalt mit der amtlichen Quelle überein?
- [x] Ist die Sprache neutral, nicht-wertend, nicht-manipulativ?
- [x] Funktioniert der Code lokal und in der Produktion?
- [x] Verletzt der Output Modul- oder Datenschutzrichtlinien?
- [x] Ist klar erkennbar, was KI-Anteil ist und was manuell ist?

---

## In-App-Transparenz

Die KI-Nutzung ist nicht nur in der Doku, sondern auch in der App selbst sichtbar:

- **Startseite, Abschnitt «KI-Einsatz in dieser App»** — explizite Liste, was KI macht und was nicht.
- **Quellen-Seite, Abschnitt «Methodik & Transparenz»** — KI als «Verdichtung, nicht Quelle» klar markiert.
- **Disclaimer-Ribbon** — kennzeichnet die App als studentischen Prototyp.
- **Datenqualitäts-Badges** auf Vorlagen — `official` / `official-pending` / `demo`.

---

**Fortsetzung:** [`07-projektorganisation.md`](07-projektorganisation.md) — Repository, Branches, Commits, Issues, Deployment.
