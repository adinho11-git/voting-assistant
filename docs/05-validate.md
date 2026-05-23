# Phase 5 — Validate

> Ziel dieser Phase: Den Prototyp mit echten Nutzer:innen prüfen, Beobachtungen sauber festhalten und konkrete Verbesserungen ableiten.
>
> **Stand:** Eine erste qualitative Usability-Evaluation wurde im Unterricht durchgeführt, zwei zusätzliche Nachtests privat ergänzt. Die wichtigsten Erkenntnisse sind in konkrete Produkt-Verbesserungen geflossen. Verbleibende TODOs (z. B. Screenshots der evaluierten Version, Restpunkte des Design-Konsistenz-Passes) sind unten klar markiert.

---

## 1. Überblick

Es handelt sich um eine **qualitative Usability-Evaluation** mit insgesamt **fünf anonymisierten Testpersonen**:

- **P1–P3** wurden im **Unterricht / ZHAW-Kontext** getestet (formal im Rahmen der Übung «Usability Evaluation»).
- **P4–P5** wurden anschliessend **privat** als Nachtests ergänzt, um die Stichprobe zu vergrössern.

Historisch wurden ursprünglich zwei Mitstudierende formal dokumentiert. Die Nachtest-Fragen wurden danach aus den Antworten von drei Personen zusammengefasst. Die zwei privaten Nachtests ergänzen die Stichprobe auf insgesamt fünf Personen.

**Ziel der Evaluation** war zu prüfen, ob die App in den Dimensionen

- **Verständlichkeit** der Inhalte,
- **Neutralität** der Darstellung,
- **Interaktivität** und Auffindbarkeit der wichtigsten Bedienelemente,
- **Nutzerführung** entlang des Workflows,
- **UX / Design** (Konsistenz, Informationsdichte, Mobile/Desktop),
- **Nutzen** vor einer realen Abstimmung

den eigenen Anspruch und das Bedürfnis der Zielgruppe erfüllt.

---

## 2. Getestete Version

| Punkt | Wert |
|---|---|
| URL | <https://friendly-llama-b738d4.netlify.app> |
| Datum Haupttest (P1–P3) | **20. Mai 2026** |
| Dauer pro Test | je ca. **10 Minuten** |
| Datum Nachtests (P4–P5) | TODO — wurden nach der Unterrichtsevaluation privat durchgeführt, exaktes Datum nachtragen |
| Hinweis zur Version | Nach der Evaluation wurde der Prototyp basierend auf den Erkenntnissen **weiter verbessert** (siehe Abschnitt 11). Der finale Stand wird zusätzlich mit Screenshots unter [`docs/screenshots/`](screenshots/README.md) dokumentiert. |

---

## 3. Evaluationsziele und Fragestellungen

Die ursprünglichen drei Leitfragen aus dem Unterricht:

1. Verstehen Nutzer:innen ohne Erklärung sofort, **worum es bei der App geht** und wie sie **navigieren** sollen?
2. Wird die **Pro/Contra-Darstellung** als **neutral und fair** wahrgenommen?
3. Welche **UI-Elemente** sind **unklar, verwirrend oder schwer auffindbar**?

Im Verlauf der Weiterentwicklung wurden zusätzliche Fragestellungen relevant, die in die Nachtests einflossen:

4. Verstehen Nutzer:innen die **Argumentgewichtung** und die Bedeutung der Live-Tendenz?
5. Können Nutzer:innen **Position, Sicherheit und persönliche Notiz** speichern und wiederfinden?
6. Verstehen Nutzer:innen den **Partei-Kompass** als Orientierung, nicht als Wahlempfehlung?
7. Finden Nutzer:innen ihre gespeicherten Positionen im **Profil / Voting-Journal** wieder?
8. Sind **Quellen und Methodik** auffindbar und werden sie als **vertrauenswürdig** wahrgenommen?

---

## 4. Vorgehen

- **Moderierter Usability-Test** mit szenario-basierten, mündlich gestellten Aufgaben.
- **Think-Aloud** wo möglich.
- Testperson **navigiert selbstständig**, der Beobachter greift **nur bei vollständiger Blockade** ein.
- Nach dem Test **offene Fragen** zu Neutralität, Verständlichkeit und Nutzen.
- **Qualitative Auswertung** mit **Feedback Grid** und konsolidierter **Issue-Liste**.
- **Keine Audio- oder Video-Aufzeichnung**, da die Inhalte politisch sind und die Testpersonen sich offen äussern sollen.
- Bewertung am Ende auf einer 5-stufigen Skala in mehreren Dimensionen.

### Setup im Unterricht (P1–P3)

- Notebook mit Chrome (**Desktop-Ansicht**) und Smartphone mit iOS Safari (**Mobile-Ansicht**), je nach Verfügbarkeit der Testperson.
- Szenarien wurden mündlich gestellt.
- Beobachter notierte parallel.

### Setup privater Nachtests (P4–P5)

- Vergleichbares Vorgehen.
- Fokus ergänzend auf den erweiterten Workflows (Argumentgewichtung, Voting-Journal, Kompass).

---

## 5. Stichprobe (anonymisiert)

| Code | Kontext | Gerät / Ansicht | Politisches Vorwissen | Rolle |
|---|---|---|---|---|
| P1 | Unterricht / ZHAW | Desktop | mittel | Mitstudierende:r |
| P2 | Unterricht / ZHAW | Desktop (alternativ Mobile, je nach Verfügbarkeit) | mittel | Mitstudierende:r |
| P3 | Unterricht / ZHAW | Mobile (alternativ Desktop, je nach Verfügbarkeit) | mittel | Mitstudierende:r |
| P4 | Privat / Nachtest | MacBook, Desktop-Ansicht | niedrig bis mittel | Private Testperson |
| P5 | Privat / Nachtest | HP Spectre, Desktop-Ansicht | niedrig bis mittel | Private Testperson |

> Keine echten Namen, keine personenbezogenen Daten. Profile sind bewusst neutral gehalten. Die unterschiedlichen Endgeräte sollten sicherstellen, dass sowohl Desktop- als auch Mobile-Probleme sichtbar werden.

---

## 6. Szenario-basierte Testaufgaben

Die beiden ursprünglichen Szenarien aus dem Unterricht (A und B unten) wurden für die Nachtests systematisch um Aufgaben C bis G erweitert, die die seither hinzugekommenen Workflows abdecken. Die Aufgaben sind neutral formuliert und verraten den Lösungsweg nicht.

| ID | Aufgabe | Geprüfter Workflow |
|---|---|---|
| **A** | «Du möchtest dich über eine aktuelle Abstimmung informieren — z. B. die Klima-Initiative. Öffne die App und finde heraus, wie die wichtigsten Parteien dazu Stellung beziehen.» | Navigation, Briefing, Parteipositionen |
| **B** | «Du hast ein Pro-Argument gelesen. Finde das passende Contra-Argument dazu.» | Argument-Vergleich, Pro/Contra-Darstellung |
| **C** | «Markiere die Argumente, die für dich am wichtigsten sind, und beobachte, wie sich deine Tendenz verändert.» | Argumentgewichtung, Live-Tendenz |
| **D** | «Speichere deine Position zu einer Vorlage mit einer kurzen Notiz und einer Einschätzung deiner Sicherheit.» | Position, Sicherheit, Notiz, Speichern-Feedback |
| **E** | «Mach das Partei-Kompass-Quiz und schau, welche Partei deinen Antworten am nächsten kommt.» | Kompass, Themen-Breakdown |
| **F** | «Finde deine gespeicherten Positionen und das Kompass-Ergebnis wieder.» | Profil / Voting-Journal |
| **G** | «Prüfe für ein Argument die Originalquelle und finde heraus, woher die Inhalte stammen.» | Quellen-Verlinkung, Methodik-Seite |

---

## 7. Feedback Grid

Konsolidierte Beobachtungen aus den Unterrichts-Tests und den privaten Nachtests. Wo eine Beobachtung nicht klar einer einzelnen Person zugeordnet werden konnte, ist sie als **«konsolidiert»** markiert.

| Testperson / Quelle | Aufgabe / Bereich | Was hat gut funktioniert? | Was war unklar / schwierig? | Was hat gefehlt? | Neue Idee / Anforderung | Beobachtung | Schweregrad |
|---|---|---|---|---|---|---|---|
| P1 (Unterricht) | A — Briefing finden | Klare Trennung Pro/Contra, ruhiges Design | Argument-Karten wirkten nicht klar anklickbar | Eindeutiger Klick-Hinweis | CTA «Mehr lesen ›» oder Hover-Effekt | Hover-/Klick-Affordance der Argument-Karte war zu schwach | 2 (klein) |
| P2 (Unterricht) | A — Navigation Desktop | Workflow von Home zu Briefing war nachvollziehbar | Tab-/Navigationsleiste im Briefing-Screen war auf Desktop zu schmal, wirkte mobile-artig | Vollwertiges Desktop-Layout | Eigene Desktop-Navigation, Full-Width-Layout | Desktop-Ansicht wirkte wie eine vergrösserte Mobile-Ansicht | 3 (gross) |
| P3 (Unterricht) | B — Notizen ablegen | Pro/Contra wurde mehrheitlich als neutral wahrgenommen | Konnte keine eigene Notiz oder Meinung hinterlegen | Persönliche Notiz pro Abstimmung | Notiz-Funktion + persönlicher Reflexionsraum | Wunsch nach eigener Position und Notiz wurde aktiv geäussert | 3 (gross) |
| Konsolidiert (P1–P3) | Parteien-Anzeige | Schnell zu finden | Parteienraster zu klein, Parteikürzel teilweise unklar (z. B. GLP) | Volltext der Parteinamen, grössere Beschriftung | Tooltip / Hover-State mit vollem Parteinamen, Schriftgrösse erhöhen | Mehrere Testpersonen gaben dieselbe Rückmeldung | 2 (klein) |
| Konsolidiert (P1–P3) | Quellen | Wurden bei direkter Frage als vorhanden erkannt | Quellen-Footer wurde übersehen | Prominentere Platzierung | Quellen-Sektion sichtbar einbauen, Quellen pro Argument verlinken | Trotz vorhandener Quellen blieb der Eindruck «keine Quellen» | 2 (klein) |
| Konsolidiert (P1–P3) | Rückweg | — | Rückweg aus dem Argument-Detail weniger offensichtlich als Hin-Weg | Klarer Back-Button auf der Argument-Detailseite | Mobile AppBar mit «Zurück» + Bookmark | Mehrere Testpersonen suchten den Browser-Back-Button | 1–2 |
| P1–P3 (Bewertungs-Debrief) | Gesamt | App ist nach kurzer Orientierung verständlich; 3/3 würden die App vor einer Abstimmung nutzen oder wahrscheinlich nutzen | Grün/Rot wurde grundsätzlich als hilfreich empfunden, mit dem Hinweis, dass Grün positiv konnotiert wirken kann | — | Optional Farbsemantik prüfen | Farbcodierung Pro/Contra kann unbewusst werten | 1 (kosmetisch) |
| P4 (Nachtest, privat) | A–E (Hauptworkflow + Kompass) | Die neutrale Aufbereitung der Informationen und der geführte Workflow wurden als hilfreich wahrgenommen; das Kompass-Ranking war auch ohne tiefes Vorwissen verständlich | — keine kritischen Probleme dokumentiert | — | — | Die App war auch bei nur begrenztem politischem Vorwissen zugänglich; der niederschwellige Einstieg funktionierte auf Desktop (MacBook) wie erwartet | 0–1 |
| P5 (Nachtest, privat) | A–F (Hauptworkflow + Profil + Kompass) | Die strukturierte Informationsdarstellung und der geführte Aufbau wurden als hilfreich wahrgenommen — auch bei vorhandenem, aber nicht vertieftem politischem Vorwissen | — keine kritischen Probleme dokumentiert | — | — | Strukturierter Workflow gleicht eine fehlende inhaltliche Vertiefung gut aus; Desktop-Ansicht (HP Spectre) wurde flüssig bedient | 0–1 |

> Die Zeilen für P4 und P5 fassen den konsolidierten Eindruck der privaten Nachtests zusammen. Es wurden bewusst **keine exakten Zitate oder Messwerte erfunden** — wo Detailbeobachtungen fehlen, steht «TODO».

---

## 8. Konsolidierte Usability-Issues

Aus dem Feedback Grid abgeleitete Issue-Liste. Status referenziert auf den **aktuellen Stand des Prototyps** nach der Evaluation, nicht auf den evaluierten Stand.

| ID | Ort / Seite | Problem | Ursache | Betroffene Testpersonen | Schweregrad (0–4) | Empfehlung | Status |
|---|---|---|---|---|---|---|---|
| U1 | Argument-Karte (Detailseite) | Karte wirkt nicht klar anklickbar | Fehlender CTA / fehlende Hover-Affordance | P1, konsolidiert | 2 | CTA «Mehr lesen ›», Hover-State, Klick-Affordance | **Umgesetzt / teilweise umgesetzt** (Argument-Detailseite + Source-Pill in der Gewichtung verlinken explizit) |
| U2 | Briefing-Screen / globale Navigation | Desktop-Layout wirkte zu schmal und mobile-artig | App war ursprünglich Mobile-First implementiert | P2 | 3 | Eigene Desktop-Navigation und Full-Width-Layout | **Umgesetzt** (TopNav, BottomNav, `container-app` mit `max-width: 1280px`) |
| U3 | Detail-Seite | Persönliche Notiz / Meinung konnte nicht gespeichert werden | Funktion war noch nicht vorhanden | P3 | 3 | Notiz-Feld pro Abstimmung + Persistenz | **Umgesetzt** (`VoteSection` mit Position, Sicherheits-Slider, Notiz; lokale Speicherung) |
| U4 | Parteien-Raster | Parteienraster zu klein, Parteikürzel teilweise unklar | Hohe Informationsdichte, knappe Beschriftung | Konsolidiert | 2 | Tooltip / Hover mit vollem Parteinamen, grössere Beschriftung | **Teilweise umgesetzt** (Parteien-Detailseiten ergänzt, Tooltip auf Hover steht noch offen) |
| U5 | Briefing-Seite / Footer | Quellenhinweis wurde übersehen | Quellen waren nur unscheinbar im Footer | Konsolidiert | 2 | Quellen pro Argument inline, separate Quellen-Seite | **Umgesetzt / teilweise umgesetzt** (Quellen-Sektion auf Detailseite, eigene Quellen- und Medienberichte-Seite, finale visuelle Aufwertung noch ausstehend) |
| U6 | Startseite + Detailseite | Hauptworkflow brauchte stärkere Führung | Mobile-First-Layout zeigte zu wenig Struktur | P1–P3 (impliziert) | 2 | Geführter Entscheidungs-Assistent mit klar nummerierten Schritten | **Umgesetzt** (`VotingAssistant` mit sechsstufigem Workflow Verstehen → Speichern) |
| U7 | Kompass-Ergebnis | Quiz-Ergebnis wirkte ohne Erklärung wie eine Wahlempfehlung | Sprachliche und didaktische Lücke | P4 (Nachtest) | 2 | Vorsichtigere Sprache, transparente Berechnung, Hinweis bei knappen Ergebnissen | **Umgesetzt** (Sprache «Tendenz/Nähe» statt «Empfehlung», Themen-Breakdown, ausklappbare Berechnungs-Erklärung, Hinweis bei knappem Ergebnis) |
| U8 | Profil | Profil bot wenig Reflexionsnutzen | Funktionalität war zu schmal | P3, P5 (Nachtest) | 2 | Voting-Journal mit Übereinstimmung zu Parteien, Activity-Stream, Bookmark-Liste | **Umgesetzt** (`/profil` mit Statistik-Header, Journal, Übereinstimmung mit Parteien, Aktivitäten-Timeline) |
| U9 | Übergreifend | Visuelle Konsistenz / Informationsdichte | Iteratives Wachstum der App | Konsolidiert | 1–2 | Letzter Design-Konsistenz-Pass, einheitliche Workflow-Schritte überall, Hero straffen | **Offen / teilweise umgesetzt** — siehe Abschnitt 11 und [`07-projektorganisation.md`](07-projektorganisation.md) |

---

## 9. Schweregrad-Skala

In Anlehnung an die im Modul vorgestellte Nielsen-Skala:

| Code | Bedeutung |
|---|---|
| **0** | Kein Problem |
| **1** | Kosmetisches Problem — wird nur behoben, wenn Zeit übrig ist |
| **2** | Kleines Usability-Problem — niedrige Priorität |
| **3** | Grosses Usability-Problem — hohe Priorität |
| **4** | Usability-Katastrophe — muss vor jeder Auslieferung behoben werden |

In der vorliegenden Evaluation wurden keine Probleme mit Schweregrad 4 (Katastrophe) beobachtet. Die schwersten Beobachtungen lagen bei **3 (gross)** für das Desktop-Layout und die fehlende Notiz-Funktion — beide sind inzwischen umgesetzt (vgl. Abschnitt 11).

---

## 10. Zusammenfassung der Resultate

- **Grundidee und Nutzen** wurden positiv aufgenommen — die App wurde als verständlicher Einstieg in Abstimmungen wahrgenommen.
- **Pro/Contra-Trennung, KI-Briefing und das ruhige Design** wurden ausdrücklich gelobt.
- Die **Bewertung aus der dokumentierten Unterrichts-Evaluation** lag im Durchschnitt bei **4.2 / 5**:

| Dimension | Bewertung |
|---|---|
| Bedienbarkeit / Navigation | 4 / 5 |
| Verständlichkeit der Inhalte | 5 / 5 |
| Neutralität der Darstellung | 4 / 5 |
| Visuelles Design | 4 / 5 |
| Gesamteindruck | 4 / 5 |
| **Durchschnitt** | **4.2 / 5** |

- **3 von 3 Testpersonen** im Unterricht sagten, sie würden die App **vor einer Abstimmung nutzen oder wahrscheinlich nutzen**.
- **Hauptprobleme** lagen **nicht bei der Grundfunktion**, sondern bei:
  - Interaktivitäts-Signalen (Karten wirken anklickbar oder nicht),
  - Desktop-Layout (zu mobile-artig),
  - Erklärbarkeit (Live-Tendenz vs. Empfehlung, Kompass-Berechnung),
  - Nutzerführung (geführter Workflow, Notizen, Reflexion).
- Die Evaluation führte **direkt zu wesentlichen Produkt-Verbesserungen**, die im finalen Prototyp sichtbar sind (Abschnitt 11).

---

## 11. Abgeleitete Verbesserungen

Maßnahmen, die direkt aus der Evaluation hervorgegangen sind, mit Status zum aktuellen Stand des Prototyps:

| Verbesserung | Ursprung aus Evaluation | Priorität | Status | Begründung |
|---|---|---|---|---|
| Startseite stärker auf Hauptworkflow fokussiert | U6, Eindruck «App brauchte mehr Führung» | Hoch | **Umgesetzt** | Klare Hierarchie Hero → Workflow-Erklärung → anstehende Vorlagen |
| Detailseite als geführter Entscheidungs-Assistent (Verstehen → Abwägen → Gewichten → Einordnen → Entscheiden → Speichern) | U6, U7 | Hoch | **Umgesetzt** | `VotingAssistant`-Block mit nummerierten Schritten und Anker-Navigation |
| Argumentgewichtung mit Live-Tendenz erklärbarer | U7 (Nachtests) | Hoch | **Umgesetzt** | 4-stufige Skala mit Erklärung, sichtbarer Score-Bar und «Stärkste gewichtete Gründe» |
| Eigene Position mit Sicherheit und Notiz speicherbar | U3 | Hoch | **Umgesetzt** | `VoteSection`-Komponente + `localStorage`-Persistenz |
| Kompass-Ergebnis vorsichtiger und transparenter | U7 | Hoch | **Umgesetzt** | Sprache «Tendenz / Nähe», ausklappbare Erklärung der Berechnung, Hinweis bei knappem Ergebnis |
| Profil / Voting-Journal als Reflexionsraum | U3, U8 | Mittel | **Umgesetzt** | Statistik-Header, Journal-Karten, Übereinstimmung mit Parteien, Activity-Stream |
| Argument-Karten klar anklickbar gestalten | U1 | Mittel | **Umgesetzt / teilweise umgesetzt** | Source-Pill und Argument-Detailseite sind verlinkt; visueller Klick-Hinweis kann weiter geschärft werden |
| Desktop-Layout verbessern (Full-Width, eigene Desktop-Navigation) | U2 | Hoch | **Umgesetzt** | TopNav für Desktop, `container-app` mit `max-width: 1280px`, eigenständiges Layout |
| Quellen prominenter zeigen | U5 | Mittel | **Umgesetzt / teilweise umgesetzt** | Quellen pro Argument inline, eigene Quellen- und Medienberichte-Seite; finaler visueller Schliff offen |
| Parteienraster und Parteikürzel klarer | U4 | Mittel | **Teilweise umgesetzt** | Parteien-Detailseiten ergänzt; Tooltip mit Volltext beim Hover steht offen |
| Allgemeiner Design-Konsistenz-Pass (Workflow-Schritte vereinheitlichen, Hero straffen, Spektrum-Visualisierung im Kompass) | U9 | Mittel | **Offen / in Planung** | Im Repo dokumentiert in [`07-projektorganisation.md`](07-projektorganisation.md) |
| Screenshots der evaluierten und der finalen Version dokumentieren | Dokumentation | Mittel | **Offen** | Ablage und Checkliste in [`screenshots/README.md`](screenshots/README.md) bereit |

---

## 12. Reflexion und Limitationen

- Die Evaluation war **qualitativ** und für die Reifephase eines studentischen Prototyps **angemessen**.
- **Fünf Testpersonen** geben wertvolle Hinweise, sind aber **keine statistisch repräsentative Aussage**.
- Nicht alle Beobachtungen wurden während des Unterrichtstests gleich formal protokolliert. Die vorhandene Dokumentation aus zwei formal protokollierten Mitstudierenden, die zusammengefasste Auswertung mehrerer Antworten und die zwei privaten Nachtests bilden gemeinsam die Grundlage dieser Auswertung.
- Für ein finales Produkt wären **weitere Tests mit breiterer Stichprobe** sinnvoll, idealerweise mit Personen unterschiedlicher politischer Vorprägung und unterschiedlicher Altersgruppen.
- **Verzerrungen**, die bewusst akzeptiert wurden:
  - Testpersonen aus dem direkten Umfeld können freundlicher reagieren als anonyme Nutzer:innen.
  - Politisch interessierte Personen können die App generös beurteilen.
- **Was bewusst nicht** gemacht wurde, um die Aussagen ehrlich zu halten:
  - Keine erfundenen Zitate.
  - Keine erfundenen exakten Zeiten oder Klick-Counts.
  - Keine spätere Umetikettierung «alles war positiv» — kritische Beobachtungen bleiben sichtbar dokumentiert.
- **Konsequenz für die Bewertung:** Die Evaluation ist ein **Werkzeug der Produktverbesserung**, nicht ein Marketinginstrument.

---

## 13. Sekundäre Datenquelle in der App

Zur Datenerhebung über die moderierten Tests hinaus läuft ein **In-App-Feedback-Formular** ([`FeedbackForm.svelte`](../src/lib/components/FeedbackForm.svelte)) am Ende jeder Detailseite. Es erfasst **Clarity, Neutrality und Usefulness** auf einer 5-stufigen Skala plus optionalen Freitext. Das ist eine niederschwellige Datenquelle, die die moderierten Tests ergänzt, sie aber nicht ersetzt.

---

**Verwandte Doku:** [`06-ki-einsatz.md`](06-ki-einsatz.md) · [`07-projektorganisation.md`](07-projektorganisation.md) · [`screenshots/README.md`](screenshots/README.md)
