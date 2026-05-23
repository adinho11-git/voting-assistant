# Phase 5 — Validate

> Ziel dieser Phase: Den Prototyp mit echten Nutzer:innen prüfen, Beobachtungen sauber festhalten und konkrete Verbesserungen ableiten.

---

## Evaluationsplan

### Testziel

Überprüfen, ob die zentralen Workflows des Voting Assistants

1. **verständlich** sind (Verstehen, Abwägen, Gewichten, Speichern),
2. **effizient** durchgeführt werden können (innerhalb weniger Minuten pro Vorlage),
3. **vertrauenswürdig** wirken (Neutralität, Quellen, KI-Transparenz),
4. **angenehm** zu bedienen sind (UI-Konsistenz, Mobile, Dark Mode).

### Methode

- **Form:** Moderierter, on-site oder remote durchgeführter Usability-Test mit Think-Aloud.
- **Dauer:** ca. 10–15 Minuten pro Testperson.
- **Aufzeichnung:** Notizen durch den Beobachter; auf Audio-/Video-Aufzeichnung wird verzichtet, weil die getesteten Inhalte politisch sind und Testpersonen sich offen äussern sollen.
- **Anschluss:** Kurzer Debrief mit gezielten Fragen zur Wahrnehmung von Neutralität, Tendenz-Anzeige und Datenschutz.

### Testpersonen

Aus dem persönlichen Umfeld wurden Personen mit unterschiedlichem politischem Vorwissen und unterschiedlichem Studienhintergrund ausgewählt, um Bias durch eine einzelne Persona-Gruppe zu reduzieren.

| Code | Profil | Endgerät | Vorwissen |
|---|---|---|---|
| P1 | Andi Kadolli — Wirtschaftsinformatik-Student, 24 | Smartphone | Mittel, hohe Tech-Affinität |
| P2 | Donart Imeri — Wirtschafts-Student, 26 | Laptop | Politisch interessiert |
| P3 | TODO — Persona/Profil ergänzen | TODO | TODO |
| P4 | TODO | TODO | TODO |
| P5 | TODO | TODO | TODO |

> **TODO:** P3–P5 mit echten anonymisierten Testpersonen ergänzen (Profil, Endgerät, Vorwissen).

### Testaufgaben

Die Aufgaben decken alle zentralen Workflows ab und wurden bewusst alltagsnah formuliert, nicht in App-Sprache.

| Nr. | Aufgabe | Erfolg gemessen an |
|---|---|---|
| 1 | «Finde die aktuelle Abstimmung, über die am 14. Juni 2026 abgestimmt wird.» | Zeit bis Vorlage geöffnet |
| 2 | «Lies dir in eigenen Worten zusammen, worum es bei der Nachhaltigkeitsinitiative geht.» | Verständnis im Debrief |
| 3 | «Schau dir Argumente Pro und Contra an und sag, welches dich am meisten überzeugt.» | Findet Pro/Contra ohne Hilfe? |
| 4 | «Gewichte mindestens drei Argumente nach deiner Wichtigkeit.» | Findet Gewichtungs-UI, keine Verwirrung |
| 5 | «Speichere deine Position mit Sicherheit und einer kurzen Notiz.» | Klare Speicherung, Bestätigungs-Feedback wird wahrgenommen |
| 6 | «Mach das Partei-Kompass-Quiz und schau, welche Partei dir am nächsten steht.» | Quiz wird vollständig durchlaufen |
| 7 | «Erkläre mir das Ergebnis des Quiz in deinen Worten.» | Versteht die Berechnung und den Themen-Breakdown |
| 8 | «Finde dein Profil / Voting-Journal und zeige mir deine gespeicherte Position.» | Findet Profil über Navigation |
| 9 | «Prüfe für ein Argument die Originalquelle.» | Klickt auf die Quellen-Verlinkung |

## Durchführung

- **Datum / Ort:** TODO eintragen — geplant ist ein erster Durchgang im Mai 2026 mit den oben genannten Testpersonen, weitere Personen im Anschluss.
- **Setup:** Live-App unter <https://friendly-llama-b738d4.netlify.app> wird auf dem Endgerät der Testperson aufgerufen. Vor dem Test wird der `localStorage` der App zurückgesetzt, damit jede Testperson mit einem leeren Voting-Journal startet.
- **Rolle des Moderators:** Begrüssung, Kontext erklären («studentischer Prototyp, alles, was dich verwirrt, ist ein wertvoller Befund»), Aufgaben einzeln vorlesen, Notizen machen, **keine** Hilfestellungen ausser bei kompletten Sackgassen.

## Beobachtungstabelle

Die folgende Tabelle dient als Erfassungs-Template. Pro Beobachtung eine Zeile.

**Schweregrad-Skala:**

- **Kritisch (K):** Workflow abgebrochen oder fundamentale Falschannahme.
- **Hoch (H):** Aufgabe erledigt, aber mit deutlicher Friktion.
- **Mittel (M):** Aufgabe gelöst, kleine Reibung erkennbar.
- **Niedrig (N):** Kosmetisch oder Nice-to-have.

| Testperson | Aufgabe | Beobachtung | Vermutetes Problem | Schweregrad | Verbesserungsvorschlag |
|---|---|---|---|---|---|
| P1 | A2 | TODO | TODO | TODO | TODO |
| P1 | A4 | TODO | TODO | TODO | TODO |
| P1 | A6 | TODO | TODO | TODO | TODO |
| P2 | A2 | TODO | TODO | TODO | TODO |
| P2 | A3 | TODO | TODO | TODO | TODO |
| P2 | A5 | TODO | TODO | TODO | TODO |
| P3 | … | TODO | TODO | TODO | TODO |
| P4 | … | TODO | TODO | TODO | TODO |
| P5 | … | TODO | TODO | TODO | TODO |

> **TODO:** Echte Beobachtungen aus den Tests eintragen. Pro Testperson und Aufgabe mindestens eine Zeile, mehr wenn substanziell.

## Erkenntnisse (Auswertung)

> **TODO:** Nach Abschluss der Testtage hier 3–6 zentrale Erkenntnisse zusammenfassen. Format: «Erkenntnis — Häufigkeit — abgeleitete Konsequenz».

Beispielhafte Platzhalter, die nach den Tests durch echte Erkenntnisse ersetzt werden:

1. **TODO Erkenntnis 1** — z. B. «Die 4-stufige Gewichtungs-Skala wird von 2/3 Personen sofort verstanden, eine Person verwechselt «0 = nicht wichtig» mit «keine Bewertung abgegeben». → Konsequenz: Tooltip oder Label-Klärung.»
2. **TODO Erkenntnis 2** — z. B. «Die Live-Tendenz wird durchgängig als Reflexion gelesen, nicht als Empfehlung. Annahme A3 bestätigt.»
3. **TODO Erkenntnis 3** — z. B. «Die Kompass-Berechnung wird von 4/5 als nachvollziehbar bezeichnet.»
4. **TODO Erkenntnis 4** — z. B. «Mobile Bottom-Nav ist intuitiv; eine Person sucht das Theme-Toggle dort und findet es nicht.»

## Umgesetzte Verbesserungen aus der Evaluation

> **TODO:** Nach den Tests konkrete bereits eingebaute Verbesserungen hier dokumentieren. Beispiele aus früheren Iterationen, die schon umgesetzt sind:

- **Disclaimer-Ribbon** als sofort sichtbares Element, dismissbar — adressiert das Vertrauensthema bei Erst-Nutzenden.
- **Datenqualitäts-Badges** auf jeder Vorlage — adressiert die in der Pilot-Iteration genannte Sorge «Sind das echte Daten?».
- **Quellen-Datum pro Argument** — adressiert das Bedürfnis «Kann ich die Aussage gegenchecken?».
- **«Wie wird das berechnet?»-Bereich im Kompass** — adressiert die Black-Box-Sorge bei Quiz-Apps.
- **Bottom-Nav für Mobile** — adressiert Persona «Lea» und mobile Nutzung unterwegs.
- **Sicherheits-Slider zusätzlich zur Position** — ermöglicht «Ich bin noch nicht ganz sicher, ich tendiere zu JA», ohne die Position binär zu machen.

## Offene Verbesserungen

> **TODO:** Nach den Tests offene Verbesserungen hier priorisieren.

Bereits identifiziert (vor den Nutzer-Tests, aus eigener Heuristik-Review):

- **Theme-Toggle für Mobile** ergänzen oder im Profil-Header anbieten.
- **Workflow-Schritte vereinheitlichen** (aktuell unterscheiden sich Anzahl/Bezeichnung zwischen Startseite, Übersicht und Detailseite).
- **Hero auf Startseite straffen** — aktuell viele Sektionen vor dem ersten Workflow-Block.
- **Kompass-Spektrum 2D-Visualisierung** zusätzlich zum Bar-Ranking (Daten in `parteiData.ts` schon vorhanden).
- **Konsolidierung von `votesStore` und `engagementStore.journal[].position`** zu einer Single Source of Truth.

## Verlinkung in der App

Zur Datenerhebung läuft zusätzlich ein **In-App-Feedback-Formular** ([`FeedbackForm.svelte`](../src/lib/components/FeedbackForm.svelte)) am Ende jeder Detailseite. Es erfasst Clarity, Neutrality und Usefulness auf einer 5-stufigen Skala plus optionalen Freitext. Das ist eine sekundäre Datenquelle, kein Ersatz für den moderierten Test.

---

**Nächste Phase / Querschnitt:** [`06-ki-einsatz.md`](06-ki-einsatz.md) — KI-Einsatz dokumentiert und reflektiert.
