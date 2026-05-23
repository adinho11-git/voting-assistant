# Phase 2 — Sketch

> Ziel dieser Phase: Lösungsraum öffnen, Varianten skizzieren, Unterschiede dokumentieren, bevor entschieden wird.

---

## Vorgehen in der Sketch-Phase

Aus dem Problem Statement und der How-Might-We-Frage (siehe [`01-understand.md`](01-understand.md)) wurden zunächst möglichst breite Lösungsansätze skizziert, ohne sich technisch oder gestalterisch zu früh festzulegen. Die zentrale Methode war **Crazy-8s**: In kurzer Zeit entstanden acht Varianten für den **Abstimmungs-Briefing-Screen**, also für den wichtigsten Moment der App, in dem Nutzer:innen eine Vorlage verstehen und erste Argumente einordnen.

Die Original-Abgabe liegt als PDF unter [`mockups/Uebung9_Abgabe_Adi_Lama.pdf`](mockups/Uebung9_Abgabe_Adi_Lama.pdf). Sie enthält:

- Crazy-8s zum Abstimmungs-Briefing-Screen.
- Acht Varianten des Briefing-Screens.
- Dot-Voting und Peer-Feedback.
- Eine ausgearbeitete Happy-Path-Skizze mit Split Screen Pro/Contra, Parteienraster, Quellen-Footer und CTA.

Folgende Bereiche wurden in der Sketch-Phase besonders untersucht:

1. **Einstieg / Startseite** — was sieht ein:e Nutzer:in zuerst?
2. **Listendarstellung** — wie werden anstehende und vergangene Abstimmungen unterschieden?
3. **Briefing einer Abstimmung** — wie werden neutrale Zusammenfassung, Pro/Contra und Quellen verständlich gebündelt?
4. **Argument-Vertiefung** — wie kommen Nutzer:innen von einem kompakten Argument zur Quelle?
5. **Parteipositionen** — als eigener Bereich oder direkt im Abstimmungs-Flow?

## Crazy-8s: Acht Varianten des Briefing-Screens

Die acht Skizzen dienten nicht dazu, sofort ein fertiges Interface festzulegen, sondern verschiedene Interaktionslogiken schnell gegeneinander sichtbar zu machen. Im Dot-Voting erhielt **Variante 3 «Split Screen Pro/Contra»** die meisten Punkte. **Variante 6 «Parteien-Meinungsraster»** wurde ebenfalls als wertvoll bewertet und später als ergänzendes Orientierungselement übernommen.

Das wichtigste Ergebnis aus Peer-Feedback und Diskussion war die Forderung nach **Quellen-Transparenz**: Argumente sollten nicht nur nebeneinanderstehen, sondern anklickbar sein und nachvollziehbar zeigen, woher die Aussage kommt. Dieses Feedback floss später in Argument-Detailseiten, Quellenangaben pro Argument und die separate Quellen-/Medienberichte-Seite ein.

## Verworfene Richtungen

Einige frühe Interaktionsideen wurden bewusst nicht als Hauptlösung weiterverfolgt:

| Richtung | Warum verworfen |
|---|---|
| Swipe-Logik | Für politische Argumente wirkte eine schnelle Ja/Nein-Mechanik zu oberflächlich. Sie hätte die App näher an ein Reaktionsspiel gebracht, statt Reflexion zu fördern. |
| Chat-Ansatz | Ein Chat hätte zwar niedrigschwellig gewirkt, aber die Nachvollziehbarkeit von Quellen, Gegenargumenten und Parteipositionen erschwert. Zudem wäre stärker der Eindruck entstanden, die KI führe oder empfehle. |
| One-Pager | Ein langer One-Pager hätte alle Informationen sichtbar gemacht, aber wenig Führung geboten. Für die Zielgruppe war ein klarer Schritt-für-Schritt-Happy-Path hilfreicher. |
| Reine Info-Seite | Zu wenig Interaktion und zu geringer Unterschied zu bestehenden Quellen wie Bundesbüchlein oder admin.ch. |

Die Entscheidung fiel deshalb auf eine geführte Struktur: erst verstehen, dann Pro/Contra abwägen, Parteien einordnen, Quellen prüfen und eine eigene Position festhalten.

## Geprüfte Produktvarianten

Neben den Layout-Skizzen wurden fünf grössere Produktkonzepte gegeneinander abgewogen.

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

Die fünf Produktvarianten wurden gegen vier Kriterien bewertet: **Mehrwert für die Zielgruppe**, **Erfüllung des Mindestumfangs**, **Risiko bei politischen Inhalten** und **realistische Umsetzbarkeit in der zur Verfügung stehenden Zeit**.

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

Die Sketch-Phase ist im Ordner [`mockups/`](mockups/README.md) dokumentiert. Relevant für diese Phase ist insbesondere:

- [`mockups/Uebung9_Abgabe_Adi_Lama.pdf`](mockups/Uebung9_Abgabe_Adi_Lama.pdf) — Crazy-8s, Dot-Voting, Peer-Feedback und Happy-Path-Skizze.

Die spätere Mockup-Phase ist in [`03-decide.md`](03-decide.md) und [`mockups/Uebung10_Abgabe_Adi_Lama.pdf`](mockups/Uebung10_Abgabe_Adi_Lama.pdf) beschrieben. Der finale SvelteKit-Prototyp übernahm die Grundlogik der Sketches, wurde aber iterativ erweitert und ist nicht als 1:1-Umsetzung des Wireframes zu verstehen.

---

**Nächste Phase:** [`03-decide.md`](03-decide.md) — Entscheidung, MoSCoW, Abgrenzung.
