# Mockups und Skizzen

> Dieser Ordner enthält die Sketch- und Mockup-Artefakte aus den Phasen **Sketch** und **Decide**. Sie dokumentieren, wie aus frühen Papierideen ein Figma-Wireframe und daraus ein iterativ erweiterter SvelteKit-Prototyp entstanden ist.

---

## Vorhandene Artefakte

| Datei | Phase | Inhalt |
|---|---|---|
| [`Uebung9_Abgabe_Adi_Lama.pdf`](Uebung9_Abgabe_Adi_Lama.pdf) | Übung 9 — Skizzieren | Crazy-8s zum Abstimmungs-Briefing, 8 Varianten, Dot-Voting, Peer-Feedback, ausgearbeitete Happy-Path-Skizze |
| [`Uebung10_Abgabe_Adi_Lama.pdf`](Uebung10_Abgabe_Adi_Lama.pdf) | Übung 10 — UI Prototyping / Mockup | Klickbarer Figma-Prototyp, Mobile-App-Wireframes im iPhone-Format, Activity Diagram / Happy Path |

Die PDFs sind bewusst als Original-Artefakte abgelegt. Sie belegen nicht nur das finale Aussehen einzelner Screens, sondern auch den methodischen Weg: Variantenbildung, Auswahl, Feedback und Weiterentwicklung.

## Übung 9 — Sketching und Variantenfindung

Übung 9 fokussierte auf den zentralen **Abstimmungs-Briefing-Screen**. Mit einer Crazy-8s-Methode wurden acht unterschiedliche Varianten skizziert, um verschiedene Informationsarchitekturen schnell sichtbar zu machen.

Wesentliche Ergebnisse:

- **Variante 3 «Split Screen Pro/Contra»** erhielt im Dot-Voting die meisten Punkte.
- **Variante 6 «Parteien-Meinungsraster»** wurde nicht als Hauptscreen gewählt, aber als ergänzendes Orientierungselement übernommen.
- Das Peer-Feedback betonte **Quellen und Transparenz**: Argumente sollten nicht nur sichtbar sein, sondern bei Bedarf anklickbar sein und Quellen anzeigen.
- Die ausgearbeitete Happy-Path-Skizze kombinierte Split-Screen Pro/Contra, Parteienraster, Quellen-Footer und einen klaren CTA.

Damit entstand die Grundlage für den späteren Kern der App: neutrale Information, strukturierte Gegenüberstellung, politische Einordnung und nachvollziehbare Quellen.

## Übung 10 — UI-Prototyping und Figma-Mockup

Übung 10 überführte die Sketch-Entscheidung in einen **klickbaren Mobile-First-Figma-Prototyp**. Der Prototyp war als iPhone-Wireframe aufgebaut und zeigte den wichtigsten Happy Path:

> App öffnen → Home → Abstimmungsliste → Briefing → Argument-Detail / Parteipositionen / Quellen & FAQ

Enthaltene Screens:

1. **Home**
2. **Abstimmungsliste**
3. **Briefing**
4. **Argument-Detail**
5. **Parteipositionen**
6. **Quellen & FAQ**

Dokumentierte Designentscheidungen:

- Mobile First als Ausgangspunkt.
- Bottom Navigation für schnelle Orientierung auf kleinen Screens.
- Hierarchischer Drilldown von Übersicht zu Detailinformationen.
- Split-Screen Pro/Contra als zentrales Briefing-Muster.
- Quellen-Transparenz als sichtbarer Bestandteil der Informationsarchitektur.
- KI-Funktion sichtbar deklarieren, damit Nutzer:innen die Textaufbereitung einordnen können.

## Weiterverwendung im finalen Prototyp

Die Artefakte wurden im finalen SvelteKit-Prototyp nicht 1:1 kopiert, sondern als **Ausgangspunkt für die iterative Umsetzung** genutzt. Erkennbar übernommen wurden vor allem:

- Einstieg über Home und Abstimmungsliste.
- Briefing als geführter Einstieg in eine Vorlage.
- Pro-/Contra-Gegenüberstellung.
- Parteienpositionen als Orientierungshilfe.
- Argument-Detail bzw. Quellenbezug.
- Quellen-/FAQ-Logik als Transparenzebene.
- Mobile Navigationslogik, später ergänzt durch Desktop-Navigation.

Im finalen Prototyp wurden diese Grundlagen erweitert, insbesondere um Argumentgewichtung, Live-Tendenz, Partei-Kompass, Profil/Voting-Journal, Quellen & Medienberichte, Dark Mode sowie technische Datenpflege über Admin-/CRUD-Funktionen, sofern im aktuellen Stand aktiviert.

## Unterschiede zwischen Mockup und finaler App

| Bereich | Mockup / Wireframe | Finaler SvelteKit-Prototyp |
|---|---|---|
| Plattform | Mobile-App-Wireframe im iPhone-Format | Responsive Web-App für Mobile und Desktop |
| Navigation | Bottom Navigation als Mobile-Konzept | Mobile Navigation plus Desktop TopNav |
| Briefing | Einzelner Briefing-Flow mit Drilldown | Geführter Entscheidungs-Assistent mit mehreren Abschnitten |
| Pro/Contra | Statische Gegenüberstellung | Interaktive Argumentgewichtung mit Live-Tendenz |
| Parteien | Parteienraster / Positionen | Parteienübersicht, Detailseiten, Positionen und Kompass-Bezug |
| Quellen | Quellen-Footer und Quellen & FAQ | Eigene Quellen- und Medienberichte-Seite mit Methodik-/KI-Transparenz |
| Persönliche Reflexion | Im Mockup nur angedeutet | Position speichern, Sicherheit, Notiz und Voting-Journal |
| Umfang | Fokus auf Kern-Happy-Path | Erweiterter Prototyp mit zusätzlichen Workflows und Datenstrukturen |

## Bedeutung für das Bewertungsraster

Die Artefakte belegen, dass der finale Prototyp nicht direkt aus Code entstanden ist, sondern aus einem nachvollziehbaren Prototyping-Prozess:

- **Nutzerzentrierung & Bedienbarkeit:** Der zentrale UI-Flow wurde skizziert, diskutiert und in der App wiedererkennbar umgesetzt.
- **Vorgehen:** Crazy-8s, Dot-Voting, Peer-Feedback und Figma-Wireframe dokumentieren die methodische Entwicklung.
- **Zusätzliche Methoden / Artefakte:** Die PDFs ergänzen Code und App um sichtbare Prototyping-Artefakte.
- **Dokumentation:** Der Weg von Sketch zu finaler App ist über [`../02-sketch.md`](../02-sketch.md), [`../03-decide.md`](../03-decide.md) und [`../04-prototype.md`](../04-prototype.md) nachvollziehbar.

## Offene Ergänzungen

Die Original-PDFs sind abgelegt. Optional könnten für die finale Abgabe noch einzelne Screens daraus als PNGs exportiert und direkt in die Phasen-Dokumente eingebettet werden, damit Bewertende die wichtigsten Skizzen ohne PDF-Wechsel sehen.
