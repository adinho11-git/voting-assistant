# Phase 3 — Decide

> Ziel dieser Phase: Aus den Varianten der Sketch-Phase eine konkrete Lösung wählen, Auswahlkriterien dokumentieren, Workflows definieren, Mockup festlegen.

---

## Entscheidungsprozess

Die Sketch-Phase hat fünf Varianten geliefert (siehe [`02-sketch.md`](02-sketch.md)). Sie wurden gegen vier Kriterien bewertet:

| Kriterium | Gewichtung | Begründung |
|---|---|---|
| Mehrwert für die Zielgruppe | hoch | Persona «Lea» (siehe Phase 1) sucht aktive Reflexionsstütze, nicht reines Lesen |
| Erfüllung des Mindestumfangs | hoch | Interaktivität, Daten erstellen/aktualisieren, mehrere Workflows verlangt |
| Risiko bei politischen Inhalten | mittel-hoch | Inhalte müssen neutral, quellen-belegt, nicht-manipulativ sein |
| Realistische Umsetzbarkeit | mittel-hoch | Einzelarbeit, begrenzte Zeit, parallel zu anderen Modulen |

**Ergebnis:** Variante B (Voting-Assistent mit Argument-Gewichtung) als Kern, ergänzt durch Variante C (Partei-Kompass), D (Voting-Journal) und E (Quellen-Seite) als integrierte Erweiterungen.

## Gewählte Hauptlösung

Eine SvelteKit-Webanwendung, die Stimmberechtigte entlang eines **sechsstufigen Workflows** pro Vorlage führt:

> **Verstehen → Abwägen → Gewichten → Einordnen → Entscheiden → Speichern**

Dieser Workflow ist die Identität der App. Er taucht in folgenden Komponenten auf:

- als visuelle Schritte-Leiste im `VotingAssistant`-Block auf jeder Detail-Seite,
- als nummerierte Section-Eyebrows in der Detail-Seite («1 Verstehen», «2 Abwägen», etc.),
- als 4-Karten-Block «So führt dich der Assistent» auf der Startseite,
- als Pill-Reihe «Verstehen → Abwägen → Einordnen → Entscheiden» auf der Übersicht.

Ergänzt um:

- **Partei-Kompass** als eigene Seite (`/kompass`) für politische Orientierung.
- **Voting-Journal / Profil** als persönlichen Reflexionsspeicher (`/profil`).
- **Parteienbereich** für Detail- und Vergleichsansichten (`/parteien`, `/parteien/[kuerzel]`).
- **Quellen & Medienberichte** als Transparenzschicht (`/quellen`).
- **Admin-Bereich** (`/admin/*`) für die Datenpflege.

## MoSCoW-Priorisierung

Die folgende Tabelle zeigt, wie die Features priorisiert wurden, bevor die Implementierung startete. Das hat geholfen, im Laufe des Projekts Scope-Creep zu vermeiden.

### Must-have (für Mindestumfang notwendig)

| Feature | Begründung |
|---|---|
| Startseite mit klarem Hauptnutzen | Einstieg + Mindestanforderung «mehrere Pages» |
| Liste anstehender und vergangener Abstimmungen | Mehrere Workflows + Datenanzeige aus Datenquelle |
| Abstimmungs-Detailseite mit Briefing, Pro/Contra, Parteien | Kern-Workflow |
| Eigene Position speichern (JA/NEIN/UNENTSCHIEDEN) | Interaktivität + «Daten erstellen» |
| Quellenangabe pro Argument | Rechtliche und ethische Mindestanforderung |
| Strukturiertes Datenmodell mit TypeScript-Types | Code-Qualität, nachvollziehbare Struktur |
| Mobile-Navigation (BottomNav) | Persona ist Mobile-First |
| Disclaimer / Kennzeichnung als Prototyp | Mindestanforderung rechtlicher Rahmen |
| KI-Einsatz-Deklaration | Mindestanforderung Modulrichtlinien |

### Should-have (für eine gute Bewertung wichtig)

| Feature | Begründung |
|---|---|
| Argument-Gewichtung mit Live-Tendenz | Differenzierung gegenüber Info-Sites, didaktischer Kern |
| Voting-Journal mit Notiz und Sicherheit | Reflexionsmehrwert, Persona-Bedürfnis |
| Partei-Kompass | Zweiter eigenständiger Workflow, klare Erweiterung |
| Parteienübersicht und -detail | Orientierung über reine Vorlagen-Sicht hinaus |
| Quellen- und Medien-Seite | Vertrauen, Transparenz, Rechtliches |
| Persistente Speicherung im `localStorage` | Datenschutz-freundlich, kein Konto nötig |
| Suche und Filter auf der Übersicht | Standard-UX-Erwartung |
| Datenqualitäts-Badges | Trennung official / demo |
| Admin-Bereich mit CRUD | «Daten aktualisieren» klar erfüllt |

### Could-have (Erweiterungen, falls Zeit reicht)

| Feature | Begründung |
|---|---|
| Dark Mode | Persona nutzt App abends |
| Parteienvergleich (A vs. B) | Zusatzinteraktion |
| Positionen-Matrix | Visueller Mehrwert über mehrere Vorlagen |
| Community-Votes (anonymes Aggregat) | «Wie sehen es andere?» — sozialer Vergleichsanker |
| MongoDB-Integration | Persistenter Server-State, Production-Pattern |
| CSV-Export im Admin | Realistische Daten-Bewirtschaftung |
| Activity-Stream im Profil | Reflexions-Bonus |
| SwissPartyMap | Visuelle Exploration als Bonus |
| Argument-Detailseite mit erweitertem Kontext | Tiefe für interessierte Nutzer:innen |

### Won't-have (bewusst ausgeschlossen)

| Feature | Begründung |
|---|---|
| Login mit Konto und Server-Profil | Politisch sensible Daten — Datenschutz hat Priorität |
| Algorithmische Wahlempfehlung | Risiko «Manipulation», App soll Reflexion, nicht Vorgabe |
| Live-News-API | Scope-Creep, Wartungsaufwand, Datenrechte |
| Push-Benachrichtigungen | Browser-Permissions würden Disclaimer-Botschaft verwässern |
| Mehrsprachigkeit (FR/IT/EN) | Scope-Creep, Modul ist auf Deutsch |
| Vollständige politische Analyse / Studien-Anbindung | Würde Anspruch an Wissenschaftlichkeit erzeugen, der vom Prototyp nicht eingelöst werden kann |
| Crowdsourcing von Argumenten | Moderations-Aufwand, Manipulationsrisiko |

## Begründung wichtiger Design- und Produktentscheidungen

### Kein Login, sondern `localStorage`

- **Datenschutz:** Persönliche Stimmen sind politisch sensible Daten. Kein Konto = kein Server-State = kein Datenleck-Risiko.
- **Niedrige Einstiegshürde:** Sofort nutzbar, ohne Onboarding-Friktion.
- **Trade-off bewusst akzeptiert:** Gerätewechsel verliert das Journal. Im UI ist das klar kommuniziert. Ein optionaler Export wäre eine sinnvolle Erweiterung (siehe Future Work in `07-projektorganisation.md`).

### Sechsstufiger Workflow statt freier Reihenfolge

- **Klarheit für Erst-Nutzende:** Persona «Lea» möchte geführt werden, nicht navigieren.
- **Methodisch nachvollziehbar für Bewertung:** Der Workflow ist im Code, im UI und in der Doku identisch — das erleichtert die Beurteilung.

### Vorsichtige Sprache durchgängig

- Nicht «Empfehlung», sondern «Tendenz», «Orientierung», «Nähe».
- Nicht «Du solltest stimmen», sondern «Du würdest aktuell mit X stimmen».
- Kompass-Ergebnis explizit als «keine Wahlempfehlung» gelabelt.
- Live-Tendenz wird klar als Spiegelung der eigenen Eingaben beschrieben.

### Quellen-Transparenz als sichtbarer UI-Bestandteil

- Jedes Argument hat eine eigene Detailseite mit `sourceDate`.
- Quellen-Seite trennt amtlich, Partei und Medien.
- Datenqualitäts-Badges zeigen demo-Inhalte.
- KI-Einsatz ist auf Startseite und Quellen-Seite explizit deklariert.

### KI nur als Unterstützung, nicht als Entscheider

- KI wird zur sprachlichen Verdichtung amtlicher Texte und zur Code-Generierung genutzt.
- Inhalte werden manuell auf Genauigkeit und Neutralität geprüft.
- KI generiert keine Parteipositionen, keine Wahlempfehlungen, keine Resultate.

### Mobile First, Desktop voll unterstützt

- BottomNav für Mobile (Persona nutzt unterwegs).
- TopNav für Desktop ab `md`-Breakpoint.
- Responsive Layouts auf allen Detail-Seiten.

### MongoDB mit transparenter In-Memory-Fallback-Schicht

- Production-Pattern: Echte DB-Anbindung.
- Lokales Entwickeln ohne DB-Zugang möglich (Mock-Modus).
- Admin-Dashboard zeigt klar, in welchem Modus die App läuft.

## Abgrenzung — was die App ausdrücklich nicht ist

Damit klar ist, was der Prototyp **nicht** versucht zu sein:

- **Keine offizielle Abstimmungshilfe.** Originalquelle bleibt admin.ch und das Abstimmungsbüchlein.
- **Keine Wahlempfehlung.** Weder algorithmisch noch redaktionell.
- **Keine Live-News-API.** Medienberichte sind eine kuratierte Auswahl.
- **Keine vollständige politische Analyse.** Pro/Contra ist eine bewusste Auswahl der prägnantesten Argumente, nicht eine erschöpfende Liste.
- **Keine wissenschaftliche Studie.** Die Kompass-Berechnung ist transparent erklärt, aber methodisch eine vereinfachte Modellierung.
- **Keine Daten-Sammlung für Werbung oder Analyse.** Persönliche Daten bleiben lokal.

## Referenz-Mockup

> **TODO:** Finale Mockup-Screenshots als PNGs unter `docs/mockups/` ablegen und hier referenzieren. Eine Ablage-Anleitung findet sich in [`mockups/README.md`](mockups/README.md).

Der gewählte Workflow und die wichtigsten Bildschirme wurden vor der Implementierung als Mobile-First-Wireframes in Figma festgelegt. Das Mockup diente als verbindliche Vorlage für die Komponenten-Hierarchie, die Sektions-Reihenfolge auf der Detailseite und die Navigation (TopNav / BottomNav).

---

**Nächste Phase:** [`04-prototype.md`](04-prototype.md) — Finale Umsetzung, Seitenstruktur, Workflows, Technik.
