# Phase 2 — Sketch

> Ziel dieser Phase: Lösungsraum öffnen, Varianten skizzieren, Unterschiede dokumentieren, bevor entschieden wird.

---

## Vorgehen in der Sketch-Phase

Aus dem Problem Statement und der How-Might-We-Frage (siehe [`01-understand.md`](01-understand.md)) wurden zunächst möglichst breite Lösungsansätze skizziert, ohne sich technisch oder gestalterisch zu früh festzulegen. Methode: Crazy-8-artige Schnellskizzen auf Papier, anschliessend Übertragung der erfolgversprechendsten Bildschirme nach Figma als Low-Fidelity-Wireframe.

Folgende Bereiche wurden skizziert:

1. **Einstieg / Startseite** — was sieht ein:e Nutzer:in zuerst?
2. **Listendarstellung** — wie werden anstehende und vergangene Abstimmungen unterschieden?
3. **Detail-Workflow einer Abstimmung** — wie viele Schritte? In welcher Reihenfolge?
4. **Reflexions-/Profil-Bereich** — als eigene Seite oder als Modal?
5. **Partei-Komponente** — als eigener Bereich oder integriert in Abstimmungen?

## Geprüfte Varianten

Es wurden fünf Konzepte gegeneinander abgewogen.

### Variante A — Reine Info-Website

**Idee:** Eine schlichte Sammlung von Abstimmungen mit neutralem Briefing, Pro/Contra und Quellen. Keine eigene Eingabe.

| Stärken | Schwächen |
|---|---|
| Einfach umsetzbar | Kein interaktiver Workflow → erfüllt Mindestumfang knapp |
| Niedrige Einstiegshürde | Kein Mehrwert gegenüber admin.ch / Bundesbüchlein |
| Niedriges Risiko bei politischen Inhalten | Keine persönliche Reflexion → Nutzer-Mehrwert klein |

### Variante B — Voting-Assistent mit Argument-Gewichtung

**Idee:** Pro Vorlage führt ein geführter Workflow durch Briefing, Pro/Contra, eigene Gewichtung und Position-Speicherung.

| Stärken | Schwächen |
|---|---|
| Hoher didaktischer Mehrwert | Komplexer in der Umsetzung |
| Klarer Workflow → gute Story für Demo/Video | Mehr Schritte → höheres Abbruchrisiko |
| Interaktivität direkt im Kern → erfüllt Mindestumfang sehr gut | Live-Tendenz muss neutral kommuniziert werden, damit sie nicht als Empfehlung wirkt |

### Variante C — Partei-Kompass / Quiz

**Idee:** 15–20 Fragen, Ergebnis: Ranking von Parteien. Vergleichbar mit smartvote, aber didaktisch transparent.

| Stärken | Schwächen |
|---|---|
| Bekannte Mechanik, intuitiv | Allein steht es in starker Konkurrenz zu smartvote |
| Sehr stark als Engagement-Tool | Black-Box-Risiko, wenn Berechnung nicht offen |
| Politisches Spektrum wird greifbar | Keine konkrete Abstimmungs-Vorbereitung |

### Variante D — Voting-Journal-First

**Idee:** Schwerpunkt auf Reflexion. Nutzer:innen tragen ihre eigene Position pro Vorlage ein, sehen Übereinstimmung mit Parteien aus ihrer Stimm-Historie.

| Stärken | Schwächen |
|---|---|
| Differenziert sich klar von bestehenden Angeboten | Benötigt erst Daten, bevor Mehrwert sichtbar wird |
| Hoher Reflexionsmehrwert | Allein zu schmal als Hauptlösung |
| Sehr datenschutz-freundlich | Schwächer als reiner Einstieg ohne bisherige Stimmen |

### Variante E — Quellen- und Medien-Aggregator

**Idee:** Kuratierte Quellen pro Vorlage (amtlich + Parteien + Medien), getrennt nach Vertrauensgrad.

| Stärken | Schwächen |
|---|---|
| Klare Wertversprechung «Übersicht über Quellenarten» | Wenig Interaktivität |
| Wertvoll als Begleitfunktion | Allein zu nahe an einer Linksammlung |
| Stärkt das Vertrauensargument | Schwer abzugrenzen gegen RSS / News-Aggregatoren |

## Bewertung und Kombination

Die fünf Varianten wurden gegen vier Kriterien bewertet: **Mehrwert für die Zielgruppe**, **Erfüllung des Mindestumfangs**, **Risiko bei politischen Inhalten** und **Realistische Umsetzbarkeit in der zur Verfügung stehenden Zeit**.

Ergebnis:

- **B (Voting-Assistent)** liefert den klarsten Workflow und den höchsten Mindestumfang-Mehrwert.
- **C (Partei-Kompass)** ergänzt B um eine politische Orientierungskomponente, ohne mit dem Hauptworkflow zu kollidieren.
- **D (Voting-Journal)** ergibt sich natürlich aus B, sobald Position-Speicherung implementiert ist.
- **E (Quellen)** wird als unterstützende Sektion («Quellen & Medienberichte»-Seite) integriert, nicht als eigenständige App.
- **A (Info-Website)** wird verworfen, weil sie den Mindestumfang an Interaktivität gefährdet.

Daraus ergibt sich die gewählte Kombi-Lösung: **B als Hauptlösung, ergänzt um C, D und E als integrierte Erweiterungen.** Begründung und MoSCoW-Priorisierung folgen in [`03-decide.md`](03-decide.md).

## Begründung der Kernentscheidung — interaktiver Entscheidungs-Assistent

Drei Gründe sprachen für den interaktiven Entscheidungs-Assistenten als Kern:

1. **Differenzierung.** Reine Info-Sites und reine Quiz-Tools gibt es bereits — eine geführte Reflexion mit eigener Gewichtung pro Argument ist seltener.
2. **Methodisch sauber.** Der Workflow «Verstehen → Abwägen → Gewichten → Einordnen → Entscheiden → Speichern» ist gut erklärbar, gut sichtbar im UI und liefert klare didaktische Etappen.
3. **Passend zum Mindestumfang.** Die Aufgabenstellung verlangt explizit interaktive App, mehrere Workflows und Möglichkeit zum Datenerstellen — der Voting-Assistent erfüllt alle drei Punkte natürlich.

## Skizzen und Mockups

> **TODO: Tatsächliche Skizzen und Mockup-Screenshots als Bilder unter `docs/mockups/` ablegen und hier referenzieren.**

Geplant sind folgende Mockup-Bilder:

- `mockups/01-startseite.png` — Low-Fi-Wireframe der Startseite (Hero, anstehende Vorlagen, Workflow-Erklärung).
- `mockups/02-detail-workflow.png` — Sechsstufiger Workflow auf der Detailseite.
- `mockups/03-argumentgewichtung.png` — Pro/Contra-Spalten mit 4-Stufen-Skala.
- `mockups/04-kompass.png` — Fragestellung mit 5-Stufen-Skala und Ergebnis-Ranking.
- `mockups/05-profil.png` — Statistiken, Journal-Karten, Partei-Übereinstimmung.
- `mockups/06-quellen.png` — Trennung amtlich / Partei / Medien.

Eine Ablage-Anleitung für `docs/mockups/` findet sich in [`mockups/README.md`](mockups/README.md).

Wenn Bilder ergänzt sind, hier verlinken:

```markdown
![Startseiten-Mockup](mockups/01-startseite.png)
```

---

**Nächste Phase:** [`03-decide.md`](03-decide.md) — Entscheidung, MoSCoW, Abgrenzung.
