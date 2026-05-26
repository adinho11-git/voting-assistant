# GitHub-Issue-Set

> Ziel dieser Datei: Das Issue-Management für die ZHAW-Prototyping-Abgabe nachvollziehbar machen. Diese Datei ist die versionierte Issue-Dokumentation im Repository und kann mit dem GitHub-Issue-Board abgeglichen beziehungsweise dort gespiegelt werden.

---

## Übersicht

| Issue-ID | Titel | Status | Priorität | Labels |
|---|---|---|---|---|
| VA-001 | Startseite stärker auf Hauptworkflow fokussieren | done | high | `ux`, `feature` |
| VA-002 | Abstimmungsdetailseite als geführten Entscheidungsworkflow verbessern | done | high | `ux`, `feature` |
| VA-003 | Argumentgewichtung und Live-Tendenz verständlicher machen | done | high | `ux`, `feature` |
| VA-004 | Persönliche Position mit Sicherheit und Notiz speichern | done | high | `feature` |
| VA-005 | Profil/Voting-Journal als Reflexionsraum verbessern | done | high | `ux`, `feature` |
| VA-006 | Partei-Kompass Ergebnis transparenter und vorsichtiger formulieren | done | medium | `ux`, `feature` |
| VA-007 | Quellen & Medienberichte final prüfen und klar kennzeichnen | done | high | `documentation`, `ux`, `content` |
| VA-008 | Usability Evaluation mit fünf Testpersonen dokumentieren | done | high | `evaluation`, `documentation` |
| VA-009 | Sketches und Mockups aus Übung 9/10 integrieren | done | medium | `documentation`, `methodology` |
| VA-010 | Screenshots der finalen App ergänzen | done | high | `documentation` |
| VA-011 | Video-Walkthrough aufnehmen und verlinken | open | high | `documentation` |
| VA-012 | Finaler Design-Konsistenz-Pass | open | medium | `ux`, `nice-to-have` |
| VA-013 | Mobile Navigation und Dark Mode final prüfen | done | medium | `ux`, `accessibility` |
| VA-014 | README und docs für finale Abgabe prüfen | done | high | `documentation` |
| VA-015 | Admin-/CRUD-Bereich in Video und Dokumentation sichtbar machen | in progress | medium | `documentation`, `feature` |
| VA-016 | Zusatz-Screenshots (CRUD-Edit, Gewichtung, Parteivergleich, Matrix, Disclaimer) ergänzen | done | medium | `documentation` |

## Labels

Vorgeschlagene Labels für GitHub:

- `feature` — neue oder erweiterte Funktion.
- `ux` — Nutzerführung, Bedienbarkeit, Informationsarchitektur.
- `documentation` — README, Phasen-Dokumentation, Screenshots, Video.
- `evaluation` — Usability-Test, Beobachtung, Auswertung.
- `methodology` — Prototyping-Methoden, Sketches, Mockups, Entscheidungsprozess.
- `content` — politische Inhalte, Quellen, Texte, Kennzeichnung.
- `accessibility` — Tastatur, Kontrast, Screenreader, Motion.
- `nice-to-have` — Qualitätsverbesserung ausserhalb des Mindestumfangs.

---

## VA-001 — Startseite stärker auf Hauptworkflow fokussieren

**Labels:** `ux`, `feature`
**Status:** done
**Priorität:** high

### Beschreibung

Die Startseite sollte nicht nur als allgemeiner Einstieg funktionieren, sondern den Hauptnutzen des Voting Assistant klar erklären: Abstimmungen verstehen, Argumente gewichten und eine eigene Position finden. Vor der Iteration war der Einstieg weniger stark auf den Entscheidungsworkflow ausgerichtet.

### Akzeptanzkriterien

- Der Hauptnutzen ist im ersten Viewport erkennbar.
- Der Workflow Verstehen → Abwägen → Gewichten → Einordnen → Entscheiden → Speichern ist auf der Startseite sichtbar oder inhaltlich klar angelegt.
- Aktuelle oder kommende Abstimmungen sind direkt erreichbar.
- CTAs führen in die wichtigsten Workflows.

### Bezug zum Bewertungsraster

Nutzerzentrierung & Bedienbarkeit: Die Startseite unterstützt Orientierung und reduziert Einstiegshürden.

### Ergebnis / Umsetzungshinweis

Im Projektverlauf umgesetzt. Die Startseite wurde stärker auf den Hauptworkflow und direkte Einstiege in Abstimmungen, Kompass und weitere Kernbereiche ausgerichtet.

---

## VA-002 — Abstimmungsdetailseite als geführten Entscheidungsworkflow verbessern

**Labels:** `ux`, `feature`
**Status:** done
**Priorität:** high

### Beschreibung

Die Detailseite einer Abstimmung ist der wichtigste Arbeitsbereich der App. Sie sollte Nutzer:innen nicht mit Informationen alleinlassen, sondern Schritt für Schritt durch Verstehen, Abwägen, Einordnen und Entscheiden führen.

### Akzeptanzkriterien

- Die Detailseite hat eine erkennbare Abschnittsstruktur.
- Briefing, Pro/Contra, Parteipositionen, persönliche Position und Quellen sind logisch angeordnet.
- Nutzer:innen können vom Überblick zur eigenen Position gelangen, ohne den Kontext zu verlieren.
- Der Workflow bleibt politisch neutral und vermeidet empfehlende Sprache.

### Bezug zum Bewertungsraster

Nutzerzentrierung, Interaktivität: Der zentrale Use Case wird geführt und bedienbar umgesetzt.

### Ergebnis / Umsetzungshinweis

Im Projektverlauf umgesetzt. Die Detailseite wurde als Entscheidungs-Assistent dokumentiert und im finalen Prototyp als Hauptworkflow ausgestaltet.

---

## VA-003 — Argumentgewichtung und Live-Tendenz verständlicher machen

**Labels:** `ux`, `feature`
**Status:** done
**Priorität:** high

### Beschreibung

Die Argumentgewichtung ist ein zentrales Differenzierungsmerkmal der App. Die Live-Tendenz musste klar als Spiegelung der eigenen Gewichtungen erkennbar sein, nicht als politische Empfehlung durch das System.

### Akzeptanzkriterien

- Pro- und Contra-Argumente können gewichtet werden.
- Die Live-Tendenz aktualisiert sich nachvollziehbar.
- Die App erklärt, dass die Tendenz aus den eigenen Eingaben entsteht.
- Sprache und UI vermeiden den Eindruck einer Wahlempfehlung.

### Bezug zum Bewertungsraster

Produkt-/Funktions-Erweiterungen: Die Interaktion geht über reine Informationsdarstellung hinaus und unterstützt reflektierte Meinungsbildung.

### Ergebnis / Umsetzungshinweis

Im Projektverlauf umgesetzt. Die Gewichtung und Live-Tendenz wurden als interaktiver Teil des Entscheidungsworkflows dokumentiert und in der Evaluation als erklärungsbedürftiger, aber wertvoller Bereich reflektiert.

---

## VA-004 — Persönliche Position mit Sicherheit und Notiz speichern

**Labels:** `feature`
**Status:** done
**Priorität:** high

### Beschreibung

Nutzer:innen sollen ihre eigene Position nicht nur als Ja/Nein speichern können, sondern auch ihre Sicherheit und persönliche Begründung festhalten. Dadurch entsteht ein persönlicher Reflexionswert statt einer rein momentanen Interaktion.

### Akzeptanzkriterien

- Positionen können als JA, NEIN oder Unsicher gespeichert werden.
- Eine Sicherheitseinschätzung kann erfasst werden.
- Eine persönliche Notiz kann gespeichert und später wieder angezeigt werden.
- Die Daten bleiben lokal im Browser oder werden klar als lokale Daten beschrieben.

### Bezug zum Bewertungsraster

Mindestanforderung Daten erstellen/aktualisieren: Nutzer:innen erzeugen eigene Daten und können diese im Verlauf wieder nutzen.

### Ergebnis / Umsetzungshinweis

Im Projektverlauf umgesetzt. Die Funktion ist Teil des persönlichen Entscheidungs- und Journal-Flows.

---

## VA-005 — Profil/Voting-Journal als Reflexionsraum verbessern

**Labels:** `ux`, `feature`
**Status:** done
**Priorität:** high

### Beschreibung

Das Profil sollte nicht nur gespeicherte Positionen anzeigen, sondern als Voting-Journal funktionieren: Was habe ich entschieden, warum, mit welcher Sicherheit und wie passt das zu Parteien oder Kompass-Ergebnis?

### Akzeptanzkriterien

- Gespeicherte Positionen sind im Profil sichtbar.
- Notizen und Sicherheit werden nachvollziehbar angezeigt.
- Kompass-Ergebnis und Parteivergleiche werden als Orientierung eingebunden.
- Aktivitäten oder Verlaufselemente unterstützen Reflexion.

### Bezug zum Bewertungsraster

Nutzerzentrierung, Erweiterungen: Das Journal erhöht den persönlichen Nutzen und macht eigene Daten sinnvoll wiederverwendbar.

### Ergebnis / Umsetzungshinweis

Im Projektverlauf umgesetzt. Das Profil wurde als Voting-Journal mit Reflexions-, Kompass- und Übereinstimmungsbezug dokumentiert.

---

## VA-006 — Partei-Kompass Ergebnis transparenter und vorsichtiger formulieren

**Labels:** `ux`, `feature`
**Status:** done
**Priorität:** medium

### Beschreibung

Der Partei-Kompass darf nicht wie eine definitive Wahlempfehlung wirken. Ergebnisdarstellung, Berechnung und Sprache müssen transparent bleiben und Unsicherheiten klar machen.

### Akzeptanzkriterien

- Ergebnisse werden als Nähe, Tendenz oder Orientierung formuliert.
- Die Berechnung wird verständlich erklärt.
- Knappheit oder Unsicherheit des Ergebnisses wird nicht überdeckt.
- Es gibt keine Aussage, dass Nutzer:innen einer Partei folgen sollten.

### Bezug zum Bewertungsraster

Erklärbarkeit, politisch sensible UX: Die App behandelt politische Orientierung vorsichtig und transparent.

### Ergebnis / Umsetzungshinweis

Im Projektverlauf umgesetzt. Die Dokumentation hält fest, dass der Kompass transparent erklärt und nicht als Wahlempfehlung formuliert wird.

---

## VA-007 — Quellen & Medienberichte final prüfen und klar kennzeichnen

**Labels:** `documentation`, `ux`, `content`
**Status:** done
**Priorität:** high

### Beschreibung

Quellen sind bei einem politischen Prototyp zentral. Offizielle Quellen, Parteiquellen und Medienberichte müssen klar unterscheidbar sein, damit Nutzer:innen den Charakter einer Information einordnen können.

### Akzeptanzkriterien

- Offizielle Quellen sind klar von Partei- und Medienquellen getrennt.
- Quellenlinks und Datumsangaben sind vorhanden, soweit verfügbar.
- KI-/Methodik-Transparenz ist dokumentiert.
- Demo- oder noch nicht vollständig geprüfte Inhalte sind nicht als amtlich dargestellt.

### Bezug zum Bewertungsraster

Rechtliche Rahmenbedingungen, Transparenz: Quellen und politische Neutralität sind für die Abgabe und den Nutzungskontext wesentlich.

### Ergebnis / Umsetzungshinweis

Umgesetzt und fuer die Abgabe nochmals strukturell geprueft. Die Quellen-Seite trennt amtliche Quellen, Parteiquellen, Medienberichte und Methodik sichtbar voneinander; der finale Stand ist mit `docs/screenshots/10-quellen.png` dokumentiert. Die externe Linkverfuegbarkeit wurde nicht per Crawler validiert, die im Prototyp aufgefuehrten Quellen sind jedoch mit Titel, Medium/Kategorie, Datum und URL hinterlegt.

---

## VA-008 — Usability Evaluation mit fünf Testpersonen dokumentieren

**Labels:** `evaluation`, `documentation`
**Status:** done
**Priorität:** high

### Beschreibung

Die qualitative Usability Evaluation musste nachvollziehbar dokumentiert werden: Testpersonen, Aufgaben, Beobachtungen, Bewertung, Erkenntnisse und daraus abgeleitete Verbesserungen.

### Akzeptanzkriterien

- Es sind fünf anonymisierte Testpersonen dokumentiert.
- Unterrichtsevaluation und private Nachtests sind unterscheidbar.
- Zentrale Erkenntnisse und Probleme sind konsolidiert.
- Umgesetzte und offene Verbesserungen sind transparent aufgeführt.

### Bezug zum Bewertungsraster

Evaluation 10 Punkte: Die Durchführung und Auswertung sind als eigenständiger Projektbestandteil sichtbar.

### Ergebnis / Umsetzungshinweis

Im Projektverlauf umgesetzt. Die Evaluation ist in [`05-validate.md`](05-validate.md) dokumentiert.

---

## VA-009 — Sketches und Mockups aus Übung 9/10 integrieren

**Labels:** `documentation`, `methodology`
**Status:** done
**Priorität:** medium

### Beschreibung

Die vorhandenen Sketch- und Mockup-Artefakte aus Übung 9 und 10 sollen im Repo sichtbar dokumentiert werden, damit der Weg von Ideation zu finalem Prototyp nachvollziehbar ist.

### Akzeptanzkriterien

- Die PDFs aus Übung 9 und 10 sind im Repo unter `docs/mockups/` abgelegt.
- Crazy-8s, Dot-Voting, Peer-Feedback und Figma-Wireframe sind dokumentiert.
- Die Verbindung zwischen Mockup und finalem Prototyp ist ehrlich beschrieben.
- Es wird nicht behauptet, dass die finale App das Mockup 1:1 umgesetzt hat.

### Bezug zum Bewertungsraster

Vorgehen, zusätzliche Artefakte: Sketches, Wireframes und Entscheidungsdokumentation belegen den Prototyping-Prozess.

### Ergebnis / Umsetzungshinweis

Im Projektverlauf umgesetzt. Die Integration ist in [`02-sketch.md`](02-sketch.md), [`03-decide.md`](03-decide.md), [`04-prototype.md`](04-prototype.md) und [`mockups/README.md`](mockups/README.md) dokumentiert.

---

## VA-010 — Screenshots der finalen App ergänzen

**Labels:** `documentation`
**Status:** done
**Priorität:** high

### Beschreibung

Für die finale Abgabe sollen die wichtigsten App-Screens als Screenshots abgelegt und in der Dokumentation referenziert werden. Dadurch wird der finale Stand auch ohne lokale Ausführung sichtbar.

### Akzeptanzkriterien

- Screenshots liegen unter `docs/screenshots/`.
- Die wichtigsten Ansichten sind abgedeckt: Startseite, Abstimmungsübersicht, Detailseite, Gewichtung, Kompass, Profil, Parteien, Quellen, Dark Mode, Mobile, Admin falls vorhanden.
- README und `docs/screenshots/README.md` verweisen auf die finalen Dateien.
- Screenshots zeigen den Abgabestand und keine veralteten Zwischenstände.

### Bezug zum Bewertungsraster

Dokumentation & Video: Visuelle Nachweise unterstützen Review und Bewertung.

### Ergebnis / Umsetzungshinweis

Umgesetzt. Die finalen Screenshots `01-startseite.png` bis `13-admin.png` liegen unter `docs/screenshots/`, sind in der Root-README eingebunden und werden in `docs/04-prototype.md` referenziert. Der Admin-Screenshot zeigt den produktiven MongoDB-Atlas-Modus mit `USE_MOCK_DATA=false`.

---

## VA-011 — Video-Walkthrough aufnehmen und verlinken

**Labels:** `documentation`
**Status:** open
**Priorität:** high

### Beschreibung

Der finale Walkthrough soll die wichtigsten Workflows kurz und verständlich zeigen: Start, Abstimmung verstehen, Argumente gewichten, Position speichern, Profil prüfen, Kompass, Quellen und optional Admin.

### Akzeptanzkriterien

- Ein ca. fünfminütiger Walkthrough ist aufgenommen.
- Die Live-App oder der finale lokale Build wird gezeigt.
- Die wichtigsten Bewertungsraster-Punkte werden im Video sichtbar.
- Der Link ist in README und Video-Dokumentation eingetragen.

### Bezug zum Bewertungsraster

Dokumentation & Video: Das Video ist ein expliziter Bestandteil der Abgabe.

### Ergebnis / Umsetzungshinweis

Noch offen. Ein Drehbuch ist in [`video-script.md`](video-script.md) vorbereitet.

---

## VA-012 — Finaler Design-Konsistenz-Pass

**Labels:** `ux`, `nice-to-have`
**Status:** open
**Priorität:** medium

### Beschreibung

Vor der finalen Abgabe sollte die App visuell nochmals geprüft werden: Abstände, Karten, Buttons, Typografie, Responsive-Verhalten, Farbkontraste und einheitliche Sprache.

### Akzeptanzkriterien

- Wichtige Seiten wirken visuell konsistent.
- Keine offensichtlichen Layout-Brüche auf Desktop oder Mobile.
- CTAs und Interaktionselemente sind einheitlich erkennbar.
- Sprache und Labels sind über zentrale Workflows hinweg konsistent.

### Bezug zum Bewertungsraster

Hohe Qualität im Mindestumfang: Ein konsistenter UI-Pass verbessert Professionalität und Bedienbarkeit.

### Ergebnis / Umsetzungshinweis

Noch offen. Der Punkt ist bewusst als Qualitäts- und Abgabe-Check vorgesehen, nicht als neue Kernfunktion.

---

## VA-013 — Mobile Navigation und Dark Mode final prüfen

**Labels:** `ux`, `accessibility`
**Status:** done
**Priorität:** medium

### Beschreibung

Mobile Navigation und Dark Mode sind wichtige Nutzungs- und Komfortfunktionen. Vor der Abgabe sollten beide über zentrale Seiten hinweg geprüft werden.

### Akzeptanzkriterien

- Mobile Navigation funktioniert auf den wichtigsten Routen.
- Keine wichtigen Inhalte werden durch Navigationselemente verdeckt.
- Dark Mode ist konsistent und lesbar.
- Kontraste, Fokuszustände und gespeicherte Theme-Einstellung sind plausibel.

### Bezug zum Bewertungsraster

Bedienbarkeit, Erweiterung: Responsive Navigation und Dark Mode stützen UX-Qualität und technische Reife.

### Ergebnis / Umsetzungshinweis

Umgesetzt für die Abgabe-Dokumentation. Mobile Ansicht und Dark Mode wurden geprüft und mit `docs/screenshots/12-mobile.png` sowie `docs/screenshots/11-darkmode.png` visuell dokumentiert.

---

## VA-014 — README und docs für finale Abgabe prüfen

**Labels:** `documentation`
**Status:** done
**Priorität:** high

### Beschreibung

Die Projektdokumentation muss vor der Abgabe inhaltlich konsistent, vollständig und frei von überholten Restpunkten sein. Dazu gehören README, Phasen-Dokumente, Evaluation, KI-Einsatz, Projektorganisation, Mockups, Screenshots und Video-Hinweise.

### Akzeptanzkriterien

- README und `docs/` sind miteinander verlinkt.
- Offene Restpunkte sind entweder erledigt oder klar als offen markiert.
- Keine falschen Behauptungen zu Umsetzung, Evaluation, PRs oder GitHub-Issues.
- Bewertungsraster-Bezüge sind nachvollziehbar.

### Bezug zum Bewertungsraster

Dokumentation, Projektorganisation: Die Abgabe muss für Bewertende schnell prüfbar und methodisch nachvollziehbar sein.

### Ergebnis / Umsetzungshinweis

Abgeschlossen. README, Phasen-Dokumente, Issue-Liste und Screenshot-Dokumentation wurden in einem finalen Doku-Audit durchgegangen. Verbleibender Restpunkt ist ausschliesslich der Video-Link, der bewusst erst nach der Aufnahme ergänzt wird (siehe VA-011).

---

## VA-015 — Admin-/CRUD-Bereich in Video und Dokumentation sichtbar machen

**Labels:** `documentation`, `feature`
**Status:** in progress
**Priorität:** medium

### Beschreibung

Der Admin-/CRUD-Bereich bzw. die vorhandene Datenpflege-Struktur sollte für die Abgabe sichtbar gemacht werden, sofern sie im finalen Stand vorhanden ist. Damit wird der technische Aspekt Daten erstellen/aktualisieren nachvollziehbar.

### Akzeptanzkriterien

- Die Dokumentation beschreibt den Admin-/CRUD-Bereich ehrlich und ohne Übertreibung.
- Das Video zeigt den Bereich kurz oder erklärt, warum er nicht gezeigt wird.
- Zugangsdaten oder Passwörter werden nicht öffentlich offengelegt.
- Der Bezug zu Daten erstellen/aktualisieren ist klar.

### Bezug zum Bewertungsraster

Technische Qualität, Daten erstellen/aktualisieren: Der Admin-Bereich zeigt, dass Daten nicht nur konsumiert, sondern gepflegt werden können.

### Ergebnis / Umsetzungshinweis

Teilweise abgeschlossen. Der Admin-Bereich ist in [`04-prototype.md`](04-prototype.md) und [`07-projektorganisation.md`](07-projektorganisation.md) beschrieben. Visuell belegen drei Screenshots den CRUD-Stand: das Dashboard mit produktivem MongoDB-Atlas-Modus (`docs/screenshots/13-admin.png`) sowie die Edit-Ansicht einer Vorlage in zwei Teilen — Grunddaten (`docs/screenshots/14-admin-edit_1.png`) und Argument-Sektion mit Hinzufügen/Entfernen (`docs/screenshots/14-admin-edit_2.png`). Das Drehbuch in [`video-script.md`](video-script.md) sieht zusätzlich eine Live-Demo des CRUD-Vorgangs im Video vor. Der Status wird erst auf `done` gesetzt, wenn das finale Video aufgenommen, verlinkt und der Admin-/CRUD-Abschnitt darin sichtbar ist.

---

## VA-016 — Zusatz-Screenshots ergänzen

**Labels:** `documentation`
**Status:** done
**Priorität:** medium

### Beschreibung

Über die 13 Pflicht-Screenshots hinaus sollten weitere Ansichten visuell belegt werden, um den Funktionsumfang vollständiger nachzuweisen: Admin-Edit, erweiterte Argumentgewichtung, Parteivergleich, Positionen-Matrix und der dismissbare Disclaimer-Ribbon.

### Akzeptanzkriterien

- Zusatzscreenshots liegen unter `docs/screenshots/` mit konsistentem Namensschema.
- Sie zeigen reale App-Zustände, keine Mockup- oder Test-Daten.
- README, `04-prototype.md` und `docs/screenshots/README.md` referenzieren die neuen Dateien mit Beschreibungen.
- Keine Secrets oder Passwörter sichtbar.

### Bezug zum Bewertungsraster

Dokumentation & Video, Hohe Qualität im Mindestumfang: Erweiterte Belege stützen die Bewertung in „Vorgehen", „Produkt-Erweiterungen" und „rechtliche Rahmenbedingungen" (Disclaimer).

### Ergebnis / Umsetzungshinweis

Abgeschlossen. Sechs Zusatzscreenshots wurden ergänzt: `14-admin-edit_1.png`, `14-admin-edit_2.png`, `15-argument-detail.png`, `16-parteivergleich.png`, `17-matrix.png`, `18-disclaimer.png`. Sie sind in [`../README.md`](../README.md), [`04-prototype.md`](04-prototype.md) und [`screenshots/README.md`](screenshots/README.md) referenziert.

---

## Abgleich mit GitHub

Für die Bewertung ist diese Datei die stabile Quelle, weil sie im Repository versioniert ist und direkt auf die Projektdokumentation verweist. Falls die Einträge zusätzlich im GitHub-Issue-Board geführt werden, sollten Titel, Status und Labels mit dieser Datei abgeglichen werden. Dadurch bleibt das Issue-Management auch dann nachvollziehbar, wenn einzelne Board-Ansichten oder CLI-Zugriffe nicht verfügbar sind.
