# KI-Einsatz im Projekt

> Diese Dokumentation listet die KI-Werkzeuge auf, die im Verlauf des Voting Assistant eingesetzt wurden, ihre jeweilige Hauptaufgabe und die manuellen Qualitätssicherungen, die parallel stattgefunden haben. Ziel ist eine ehrliche, professionelle und vollständig transparente Deklaration.

---

## Eingesetzte KI-Werkzeuge im Überblick

| Tool | Anbieter | Hauptzweck im Projekt |
|---|---|---|
| **Claude Code / Claude Opus 4.7** | Anthropic | Code-Analyse, Refactoring, Dokumentationsstruktur, UX-Verbesserungen, technische Reviews |
| **Codex** | OpenAI | Fokussierte Coding-Tasks, UI- und Workflow-Verbesserungen, Code-Audits, Umsetzung einzelner Features und Fixes |
| **ChatGPT / GPT-5.5** | OpenAI | Projektstrategie, Bewertungsraster-Interpretation, Prompt-Erstellung, UX-Kritik, Priorisierung und Reflexion |

Die Werkzeuge wurden jeweils dort eingesetzt, wo sie ihre spezifischen Stärken am besten ausspielen. Die Entscheidung, welches Werkzeug welche Aufgabe übernimmt, lag durchgehend beim Entwickler.

---

## Detaillierter Einsatz pro Tool

### Claude Code / Claude Opus 4.7

Eingesetzt für Aufgaben, die ein längeres, zusammenhängendes Verstehen der Codebasis erfordern.

- **Code-Analyse über mehrere Dateien hinweg**: Aufdecken von Inkonsistenzen, doppelten State-Stellen (`votesStore` vs. `engagementStore.journal`) und Architektur-Schwächen.
- **Refactoring-Vorschläge** mit Bezug auf konkrete Datei-Stellen und Begründung.
- **Aufbau dieser Dokumentationsstruktur**: Erstellung der Phasen-Dateien `01-understand.md` bis `07-projektorganisation.md` mit konsistenter Form und Sprache.
- **UX-Verbesserungen**: Vorschläge zur Vereinheitlichung des Workflow-Schritte-Modells, Hero-Straffung, Kompass-Spektrum-Idee.
- **Technische Reviews**: Sicherheits-Hinweise zum Admin-Passwort-Fallback, Bewertung der Mongo-Fallback-Strategie.
- **Bewertungsraster-Abgleich**: Strukturierte Auseinandersetzung mit dem ZHAW-Bewertungsraster, Mapping der Code-Stellen auf Kriterien.

### Codex

Eingesetzt für klar abgegrenzte Coding-Tasks, bei denen ein schneller, fokussierter Output gefragt ist.

- **Komponenten-Boilerplate** für Svelte-Komponenten und neue Routen.
- **UI- und Workflow-Verbesserungen**: konkrete Umsetzung von Layout-Anpassungen, Tailwind-Class-Cleanup, Component-Splits.
- **Code-Audits einzelner Dateien** zur Qualitätssicherung (z. B. typsichere Reducer im Engagement-Store).
- **Einzelne Features**: Umsetzung von Detail-Funktionalitäten, kleinere Refactorings, Bug-Fixes.
- **Validierungs-Logik** für Formulare im Admin-Bereich.

### ChatGPT / GPT-5.5

Eingesetzt für strategische und reflexive Aufgaben, ausserhalb der Code-Detailtiefe.

- **Projektstrategie**: Diskussion der Hauptlösung, Abwägung von Erweiterungen, Roadmap-Entscheidungen.
- **Bewertungsraster-Interpretation**: Vertieftes Verständnis, wie die Kriterien gemeint sind, was als «Vorgehen» oder «Methode/Artefakt» zählt.
- **Prompt-Erstellung**: Vorlagen für effektive Coding-Prompts an Claude Code und Codex.
- **UX-Kritik**: Heuristische Reviews der Startseite und der Detailseite, kritische Rückmeldung zur Workflow-Sprache.
- **Priorisierung**: Sortierung von To-dos nach Noten-Wirkung, MoSCoW-Diskussion.
- **Reflexion**: Schreib-Sparring für die Phasen-Dokumente, Konsistenzprüfung der Argumentationen.

---

## Wofür KI insgesamt verwendet wurde — nach Kategorien

### Code

- Komponenten-Gerüste (z. B. `VoteSection`, `ArgumentWeighting`, `VotingJournal`).
- TypeScript-Typsystem in `src/lib/types.ts`.
- Refactorings: konsistente Klassennutzung, Aufteilung grosser Komponenten, Tailwind-Cleanup.
- Tailwind-Konfiguration und CSS-Token-System in `src/app.css`.
- MongoDB-Wrapper in `src/lib/server/db.ts` und das `dataLayer.ts`-Pattern.
- API-Routes für Vote-Endpoints und CSV-Export.
- Form-Validierung im Admin-Bereich.

### Inhalt

- Erste Entwürfe von Argument-Texten auf Basis der amtlichen Vorlagen-Texte (Bundesrat-Botschaft, Komitee-Argumentarien).
- Strukturierung der Briefings unter Wahrung der Originalquelle.
- Sprachliche Verdichtung langer amtlicher Texte zu 3–5-Satz-Briefings.
- Erste Vorschläge für die 18 Kompass-Szenarien und deren 10 Themen.

### UX und Kommunikation

- Workflow-Kritik (Anzahl Schritte, Bezeichnungen, Reihenfolge).
- Formulierungs-Reviews für nicht-manipulative, vorsichtige Sprache (Tendenz statt Empfehlung).
- Microcopy für Toasts, Hinweise, Empty-States.
- Disclaimer-Texte für die Kennzeichnung als studentischer Prototyp.

### Methodik und Bewertung

- Bewertungsraster-Analyse.
- Aufbau der Phasen-Dateien und Konsistenzprüfung.
- README-Konsolidierung.

---

## Was manuell überprüft und entschieden wurde

Sämtliche KI-Outputs wurden vor der Übernahme manuell geprüft. Insbesondere:

- **Politische Inhalte**: Jedes Argument wurde mit der angegebenen Originalquelle verglichen. Argumente, die KI «plausibel klangen», aber nicht in der Quelle stehen, wurden verworfen.
- **Quellen-Links und Daten**: `sourceUrl` und `sourceDate` wurden manuell geprüft.
- **Neutralität der Sprache**: Pro- und Contra-Argumente wurden auf vergleichbaren Tonfall und vergleichbare Schärfe geprüft.
- **Bundesrat- und Parlaments-Positionen, Endresultate**: direkt von admin.ch / bk.admin.ch übernommen, nicht aus KI-Outputs.
- **Parteipositionen**: auf Parteiwebsites und in Mediencoverage gegengeprüft.
- **Kompass-Fragen**: Parteipositionen pro Frage manuell kalibriert und auf Bias hin geprüft.
- **Funktionale Korrektheit**: jeder generierte Code wurde lokal getestet, Fehler korrigiert, Edge-Cases ergänzt.
- **Architektur-Entscheidungen**: Datenmodell, Routing-Struktur, Persistenz-Strategie und Auth-Mechanismus wurden bewusst vom Entwickler entschieden, nicht von KI vorgeschlagen.
- **Visuelles Design**: Token-System, Typografie, Farbpalette wurden vom Entwickler festgelegt; KI hat bei der Umsetzung geholfen.
- **Finale Inhalts-Entscheidungen**: Auswahl der Vorlagen, Auswahl der Argumente, Auswahl der Quellen und Medienberichte.

---

## Beispiel-Prompts

Die nachfolgenden Prompts illustrieren den Stil, in dem die Werkzeuge eingesetzt wurden. Sie sind verkürzt wiedergegeben.

### Beispiel 1 — Claude Code / Claude Opus 4.7 (Code-Analyse + Refactoring)

> «Analysiere [`src/lib/stores/votes.ts`] und [`src/lib/stores/engagement.ts`]. Beide speichern eine `position`. Wer ist Single Source of Truth? Gibt es eine Stelle, an der diese inkonsistent werden können? Schlage einen Refactoring-Pfad vor, der die App-Logik unverändert lässt.»

### Beispiel 2 — Codex (fokussierte Umsetzung)

> «Erstelle eine Svelte-Komponente `ArgumentWeighting.svelte` mit zwei Spalten Pro/Contra. Pro Argument vier Buttons (0–3) für die Gewichtung. Live berechnen: Pro-Score, Contra-Score, Tendenz JA/NEIN/Unsicher. Nutze den Engagement-Store. Setze beim Klick auf «Tendenz speichern» einen Timeline-Eintrag vom Typ `weights`.»

### Beispiel 3 — ChatGPT / GPT-5.5 (Strategie und Priorisierung)

> «Hier ist das ZHAW-Bewertungsraster [PDF] und der aktuelle Projektstand [Code-Übersicht]. Schätze die aktuelle Punktzahl pro Kriterium und priorisiere die drei wichtigsten Verbesserungen für die bessere Note. Konzentriere dich auf Massnahmen mit hoher Wirkung pro Aufwand.»

### Beispiel 4 — ChatGPT / GPT-5.5 (UX-Kritik)

> «Hier ist die aktuelle Startseite [Quellcode]. Beurteile aus UX-Sicht: Ist der Hero zu lang? Wo verliere ich Erst-Nutzende? Welche Sektion ist redundant zu welcher? Konkrete Vorschläge in priorisierter Reihenfolge.»

### Beispiel 5 — Claude Code (Doku-Struktur)

> «Erstelle eine Doku-Struktur in `docs/` mit Phasen-Dateien `01-understand.md` bis `07-projektorganisation.md`. Pro Datei: klarer Titel, Einleitungssatz, danach strukturierter Inhalt nach dem ZHAW-Bewertungsraster. Verwende deutsche Sprache, keine erfundenen Testergebnisse.»

> **TODO:** Falls eine ausführliche Promptliste gewünscht ist, kann sie in einer eigenen Datei `docs/prompts.md` als tagebuchartiger Auszug der wichtigsten Sessions ergänzt werden.

---

## Abgrenzung — was die KI ausdrücklich nicht macht

- **Keine politische Wertung.** KI generiert keine Aussagen über «richtige» oder «falsche» politische Positionen.
- **Keine Wahlempfehlung.** Weder die App noch ihre Inhalte sind aus KI-Outputs als Empfehlung übernommen.
- **Keine erfundenen Quellen.** Quellen-Links wurden manuell geprüft; URL-Halluzinationen wurden konsequent verworfen.
- **Keine fiktiven Resultate.** Endresultate vergangener Abstimmungen kommen direkt von der Bundeskanzlei.
- **Keine Personendaten.** Die App speichert keine personenbezogenen Daten serverseitig; KI hat keinen Zugriff auf Nutzer-Stimmen.
- **Keine Entscheidung über die Projektidentität.** Konzept, Zielgruppe, Workflow und Tonalität wurden vom Entwickler festgelegt.

---

## Reflexion

### Nutzen

- **Geschwindigkeitsgewinn** bei Boilerplate-Aufgaben.
- **Frühe Konsistenz** im Design-System.
- **Sparringspartner**, der jederzeit gegenliest und kritische Fragen stellt.
- **Doku-Beschleuniger** mit Strukturvorschlägen.
- **Bewertungs-Sparring**, das die eigene Selbsteinschätzung schärft.

### Risiken und wie sie adressiert wurden

| Risiko | Adressierung |
|---|---|
| Quellen-Halluzination | Manuelle Prüfung aller URLs und Datumsangaben |
| Plausibel klingender, aber inhaltlich falscher Output | Quellenvergleich pro Argument, Verzicht auf nicht-belegbare Aussagen |
| Bias zur populärsten Position | Bewusste Kalibrierung von Pro/Contra in Anzahl, Wortlänge und Schärfe |
| Code mit nicht-offensichtlichen Edge-Cases | Lokales Testen, Type-Check (`svelte-check`), manuelle Code-Review |
| Subtile Anglizismen oder ungewollte Übersetzungen | Manuelle Sprach-Review aller User-facing Texte auf Deutsch / Schweizer Deutsch |
| Über-Promptig zu Beginn | Iteratives Vorgehen mit kleinen Schritten statt einer einzigen «Build the whole app»-Anweisung |

### Qualitätssicherung — Checkliste pro KI-Output

- [x] Liegt eine Originalquelle vor? Ist die URL korrekt? Ist das Datum plausibel?
- [x] Stimmt der Inhalt mit der amtlichen Quelle überein?
- [x] Ist die Sprache neutral, nicht-wertend, nicht-manipulativ?
- [x] Funktioniert der Code lokal und in der Produktion?
- [x] Verletzt der Output Modul- oder Datenschutzrichtlinien?
- [x] Ist klar erkennbar, was KI-Anteil ist und was manuell ist?

---

## In-App-Transparenz

Die KI-Nutzung ist nicht nur in der Doku, sondern auch in der App selbst sichtbar:

- **Startseite, Abschnitt «KI-Einsatz in dieser App»**: explizite Liste, was KI macht und was nicht.
- **Quellen-Seite, Abschnitt «Methodik & Transparenz»**: KI als «Verdichtung, nicht Quelle» klar markiert.
- **Disclaimer-Ribbon**: kennzeichnet die App als studentischen Prototyp.
- **Datenqualitäts-Badges** auf Vorlagen: `official` / `official-pending` / `demo`.

---

**Fortsetzung:** [`07-projektorganisation.md`](07-projektorganisation.md) — Repository, Branches, Commits, Issues, Deployment.
