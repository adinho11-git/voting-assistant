# Projektdokumentation – Voting Assistant

## Inhaltsverzeichnis

1. [Ausgangslage](#1-ausgangslage)
2. [Lösungsidee](#2-lösungsidee)
3. [Vorgehen & Artefakte](#3-vorgehen--artefakte)
    1. [Understand & Define](#31-understand--define)
    2. [Sketch](#32-sketch)
    3. [Decide](#33-decide)
    4. [Prototype](#34-prototype)
    5. [Validate](#35-validate)
4. [Erweiterungen [Optional]](#4-erweiterungen-optional)
5. [Projektorganisation [Optional]](#5-projektorganisation-optional)
6. [KI-Deklaration](#6-ki-deklaration)
7. [Anhang [Optional]](#7-anhang-optional)

> **Hinweis:** Massgeblich sind die im **Unterricht** und auf **Moodle** kommunizierten Anforderungen.

<!-- WICHTIG: DIE KAPITELSTRUKTUR DARF NICHT VERÄNDERT WERDEN! -->

<!-- Diese README folgt der Moodle-Vorlage. Vertiefende Details bleiben in den verlinkten docs-Dateien versioniert. -->

## 1. Ausgangslage

- **Problem:** Schweizer Stimmberechtigte müssen vor eidgenössischen Abstimmungen viele Quellen einordnen: Abstimmungsbüchlein, admin.ch, Komitee-Texte, Parteiparolen, Medienberichte und Social Media. Diese Informationsmenge ist oft asymmetrisch, zeitintensiv und schwer in eine eigene, später nachvollziehbare Position zu übersetzen. Besonders problematisch sind fehlende Quellen-Transparenz, zu wenig Reflexionsunterstützung und der Eindruck von Black-Box-Empfehlungen bei politischen Quiz-Tools. Herleitung und Persona sind in [docs/01-understand.md](docs/01-understand.md) dokumentiert.
- **Ziele:** Der Voting Assistant soll Stimmberechtigte neutral und quellenbasiert durch einen strukturierten Entscheidungsprozess führen, ohne eine politische Empfehlung auszusprechen. Die App soll Pro- und Contra-Argumente vergleichbar machen, persönliche Gewichtungen ermöglichen, eigene Positionen lokal speichern, Quellen sichtbar machen und über Admin-/CRUD-Funktionen eine realistische Datenpflege demonstrieren. Zusätzlich soll der Prototyp methodisch nachvollziehbar dokumentiert, evaluiert, online verfügbar und mit Screenshots sowie Video belegbar sein.
- **Primäre Zielgruppe:** Stimmberechtigte in der Deutschschweiz, insbesondere Erst- und Gelegenheitswählende sowie digital affine Personen, die vor einer Abstimmung in wenigen Minuten einen strukturierten Einstieg suchen. Die Persona «Lea, 27, Berufseinsteigerin, Zürich» steht für Nutzer:innen mit mittlerem politischem Vorwissen, wenig Zeit und dem Wunsch nach neutralem Überblick, Quellenbezug und persönlicher Notiz.
- **Weitere Stakeholder [Optional]:** Bewertende im Modul Prototyping, Mitstudierende in der Evaluation, Stimmberechtigte als potenzielle Nutzer:innen, amtliche Quellen wie admin.ch/bk.admin.ch als Referenzquellen sowie Parteien und Medien als klar gekennzeichnete Informationsquellen. Die App ist ein studentischer Prototyp und keine offizielle Abstimmungshilfe.

## 2. Lösungsidee

- **Kernfunktionalität:** Der Prototyp ist eine SvelteKit-Web-App für eidgenössische Abstimmungen vom 14. Juni 2026. Der Hauptworkflow führt Nutzer:innen pro Vorlage durch **Verstehen → Abwägen → Gewichten → Einordnen → Entscheiden → Speichern**. Ergänzend gibt es einen Partei-Kompass mit 18 Szenario-Fragen, ein Profil/Voting-Journal, Parteienübersicht und Parteivergleich, eine Quellen- und Medienberichte-Seite sowie einen passwortgeschützten Admin-Bereich zur Datenpflege. Die wichtigsten Workflows sind in [docs/04-prototype.md](docs/04-prototype.md) beschrieben.
- **Annahmen [Optional]:** Der Prototyp prüft unter anderem, ob ein sechsstufiger Workflow als Hilfe verstanden wird, ob eine 0-3-Gewichtung pro Argument ausreichend klar ist, ob eine Live-Tendenz als Reflexion statt als Empfehlung gelesen wird, ob lokale Speicherung politisch sensibler persönlicher Daten akzeptiert wird und ob die Trennung amtlich / Parteien / Medien die Quellen-Einordnung verbessert. Die Annahmen A1-A6 sind in [docs/01-understand.md](docs/01-understand.md) aufgeführt.
- **Abgrenzung [Optional]:** Die App ist keine offizielle Abstimmungshilfe, keine Wahlempfehlung, keine wissenschaftliche Wahlstudie, keine Live-News-Plattform und kein Produktivsystem mit Nutzerkonten. Persönliche Stimmen, Notizen, Bookmarks, Kompass-Ergebnisse und Argumentgewichtungen bleiben im Browser-`localStorage`. Der Admin-Bereich ist als prototypische Datenpflege umgesetzt; für ein Produktivsystem wären Rollen, Hashing und ein Session-Store nötig. Diese Abgrenzungen sind in [docs/03-decide.md](docs/03-decide.md), [docs/04-prototype.md](docs/04-prototype.md) und [docs/07-projektorganisation.md](docs/07-projektorganisation.md) dokumentiert.

## 3. Vorgehen & Artefakte

Die Projektdokumentation folgt den Phasen **Understand & Define**, **Sketch**, **Decide**, **Prototype** und **Validate**. Die Detaildokumente liegen unter [docs/](docs/) und sind als vertiefende Belege zu dieser README gedacht.

### 3.1 Understand & Define

- **Zielgruppenverständnis:** In der ersten Phase wurden Problemraum, Zielgruppe, Persona, Bedürfnisse, Annahmen und Risiken politischer Inhalte beschrieben. Die primäre Persona ist «Lea, 27, Berufseinsteigerin, Zürich»: mobil unterwegs, politisch interessiert, aber unter Zeitdruck und mit dem Wunsch nach neutraler, quellenbasierter Übersicht. Dokumentiert in [docs/01-understand.md](docs/01-understand.md).
- **Wesentliche Erkenntnisse:**
  - Nutzer:innen brauchen einen schnellen, neutralen Einstieg pro Vorlage.
  - Pro und Contra müssen gleichwertig sichtbar sein.
  - Quellen müssen direkt am Argument und auf einer eigenen Quellen-Seite auffindbar sein.
  - Persönliche politische Daten sind sensibel und sollen ohne Konto lokal bleiben.
  - Die App darf keine Wahlempfehlung geben, sondern nur eigene Eingaben spiegeln.
  - Bei politischen Inhalten sind Disclaimer, Quellenstand, KI-Transparenz und vorsichtige Sprache Teil der UX, nicht nachträgliche Ergänzungen.

### 3.2 Sketch

- **Variantenüberblick:** In der Sketch-Phase wurden fünf Produktvarianten geprüft: reine Info-Website, Voting-Assistent mit Argumentgewichtung, Partei-Kompass, Voting-Journal-First sowie Quellen- und Medien-Aggregator. Variante B wurde als Kern gewählt, ergänzt durch C, D und E. Die Begründung steht in [docs/02-sketch.md](docs/02-sketch.md).
- **Skizzen:** Die Originalartefakte liegen unter [docs/mockups/](docs/mockups/README.md). [docs/mockups/Uebung9_Abgabe_Adi_Lama.pdf](docs/mockups/Uebung9_Abgabe_Adi_Lama.pdf) dokumentiert Crazy-8s, acht Varianten des Abstimmungs-Briefing-Screens, Dot-Voting, Peer-Feedback und eine Happy-Path-Skizze. Besonders prägend waren der Split Screen Pro/Contra, das Parteien-Meinungsraster und der Wunsch nach sichtbarer Quellen-Transparenz.

### 3.3 Decide

- **Gewählte Variante & Begründung:** Entschieden wurde ein interaktiver Voting-Assistent mit Argumentgewichtung als Kern, ergänzt um Partei-Kompass, Voting-Journal und Quellen-Seite. Die Entscheidung erfolgte anhand von Zielgruppenmehrwert, Mindestumfang, Risiko politischer Inhalte und realistischer Umsetzbarkeit. Die MoSCoW-Priorisierung unterscheidet Must-have, Should-have, Could-have und bewusst ausgeschlossene Won't-have-Features. Beleg: [docs/03-decide.md](docs/03-decide.md).
- **End-to-End-Ablauf:** Die folgende Tabelle ist die User Journey Map in tabellarischer Form (**Schritt → Nutzerziel → Touchpoint → Schmerzpunkt / Bedürfnis → Beleg**) und verbindet Persona-Bedürfnisse aus [docs/01-understand.md](docs/01-understand.md) mit den im Prototyp umgesetzten Touchpoints.

| Journey-Schritt | Nutzerziel | Touchpoint im Prototyp | Schmerzpunkt / Bedürfnis | Beleg |
|---|---|---|---|---|
| 1. Einstieg | Verstehen, wofür die App da ist | `/` Startseite mit Countdown, Disclaimer, CTAs und Workflow-Erklärung | Reizüberflutung reduzieren, schneller neutraler Einstieg | [Screenshot 01](docs/screenshots/01-startseite.png), [docs/04-prototype.md](docs/04-prototype.md) |
| 2. Vorlage wählen | Anstehende oder vergangene Vorlage finden | `/abstimmungen` mit Tabs, Suche, Filter und Karten | Begrenzte Zeit, Bedarf nach übersichtlicher Auswahl | [Screenshot 02](docs/screenshots/02-abstimmungen.png) |
| 3. Vorlage verstehen | Briefing, Bundesrat-/Parlamentsposition und Quellenstand prüfen | `/abstimmungen/[slug]` | Neutrale Zusammenfassung statt verstreuter Einzelquellen | [Screenshot 03](docs/screenshots/03-detail-briefing.png) |
| 4. Argumente abwägen | Pro/Contra lesen, vertiefen und Quellen prüfen | Detailseite und `/abstimmungen/[slug]/argumente/[id]` | Beide Seiten gleich sichtbar, Quellen direkt prüfbar | [Screenshot 04](docs/screenshots/04-gewichtung.png), [Screenshot 15](docs/screenshots/15-argument-detail.png) |
| 5. Argumente gewichten | Eigene Prioritäten setzen und Live-Tendenz verstehen | `ArgumentWeighting.svelte` auf der Detailseite | Eigene Gewichtung statt fremder Wahlempfehlung | [src/lib/components/ArgumentWeighting.svelte](src/lib/components/ArgumentWeighting.svelte) |
| 6. Politisch einordnen | Parteipositionen und Kompass-Ergebnis als Orientierung nutzen | `/parteien`, `/abstimmungen/[slug]/parteien`, `/kompass` | Black-Box-Risiko politischer Quiz-Tools vermeiden | [Screenshot 05](docs/screenshots/05-kompass-frage.png), [Screenshot 06](docs/screenshots/06-kompass-ergebnis.png), [Screenshot 16](docs/screenshots/16-parteivergleich.png), [Screenshot 17](docs/screenshots/17-matrix.png) |
| 7. Entscheiden und speichern | Position, Sicherheit und Notiz festhalten | `VoteSection` und lokales Voting-Journal | Eigene Gründe dokumentieren, ohne Konto-Zwang | [docs/04-prototype.md](docs/04-prototype.md) |
| 8. Wiederfinden und reflektieren | Gespeicherte Positionen, Notizen und Aktivitäten prüfen | `/profil` | Später nachvollziehen, warum eine Position gewählt wurde | [Screenshot 07](docs/screenshots/07-profil.png) |
| 9. Transparenz prüfen | Quellen, Medienberichte und KI-Methodik einordnen | `/quellen` | Vertrauen durch Trennung amtlich / Parteien / Medien / KI | [Screenshot 10](docs/screenshots/10-quellen.png) |
| 10. Daten pflegen | Inhalte administrativ erstellen, ändern oder löschen | `/admin/*` | Politische Inhalte veralten und müssen aktualisierbar bleiben | [Screenshot 13](docs/screenshots/13-admin.png), [Screenshot 14a](docs/screenshots/14-admin-edit_1.png), [Screenshot 14b](docs/screenshots/14-admin-edit_2.png) |

- **Mockup:** Das Referenz-Mockup aus [docs/mockups/Uebung10_Abgabe_Adi_Lama.pdf](docs/mockups/Uebung10_Abgabe_Adi_Lama.pdf) war ein Mobile-First-Figma-Prototyp mit Home, Abstimmungsliste, Briefing, Argument-Detail, Parteipositionen sowie Quellen & FAQ. Eine separate externe Figma-URL ist im Repository und in [docs/mockups/README.md](docs/mockups/README.md) nicht dokumentiert; belegbar sind die PDF-Artefakte im Repo. Die Übertragung vom Mockup in den finalen Prototyp ist in [docs/03-decide.md](docs/03-decide.md), [docs/04-prototype.md](docs/04-prototype.md) und [docs/mockups/README.md](docs/mockups/README.md) beschrieben.

### 3.4 Prototype

#### 3.4.1. Entwurf (Design)

> **Hinweis:** Hier wird der **Prototyp** beschrieben, nicht das **Mockup**.

- **Informationsarchitektur:** Die App besteht aus öffentlichen Routen für Startseite, Abstimmungen, Detailseiten, Argument-Detail, Parteipositionen, Parteien, Partei-Kompass, Profil/Voting-Journal und Quellen. Der Admin-Bereich ist getrennt und passwortgeschützt. Mobile Navigation erfolgt über BottomNav, Desktop über TopNav. Die vollständige Seitenstruktur ist in [docs/04-prototype.md](docs/04-prototype.md) tabellarisch dokumentiert.
- **User Interface Design:** Das Interface arbeitet mit ruhiger Informationsdichte, klaren Cards, sichtbaren Quellen, Data-Quality-Badges, Dark Mode, Toasts, Skip-Link, ARIA-Labels, `focus-visible` und `prefers-reduced-motion`. Die Sprache vermeidet politische Empfehlungen und nutzt Begriffe wie «Tendenz», «Orientierung» und «Nähe».
- **Designentscheidungen:** Mobile First wurde aus dem Mockup übernommen, aber für Desktop mit TopNav, breiteren Containern und dichterer Darstellung erweitert. Pro/Contra werden gleichwertig gestaltet, persönliche Daten werden lokal gespeichert und die studentische Prototyp-Natur ist über den Disclaimer-Ribbon sichtbar. VA-012 («Finaler Design-Konsistenz-Pass») bleibt als offener Nice-to-have-Punkt dokumentiert, weil kein eigener abschliessender Design-Pass als Artefakt belegt ist ([docs/issues.md](docs/issues.md)).

| Screenshot | Zweck |
|---|---|
| [01-startseite.png](docs/screenshots/01-startseite.png) | Einstieg, Countdown, CTAs, Workflow-Erklärung |
| [02-abstimmungen.png](docs/screenshots/02-abstimmungen.png) | Abstimmungsübersicht mit Suche, Tabs und Karten |
| [03-detail-briefing.png](docs/screenshots/03-detail-briefing.png) | Briefing und Metadaten einer Vorlage |
| [04-gewichtung.png](docs/screenshots/04-gewichtung.png) | Argumentgewichtung mit Live-Tendenz |
| [05-kompass-frage.png](docs/screenshots/05-kompass-frage.png) | Kompass-Frage mit 5-Stufen-Skala |
| [06-kompass-ergebnis.png](docs/screenshots/06-kompass-ergebnis.png) | Kompass-Ergebnis mit Ranking und Themen-Breakdown |
| [07-profil.png](docs/screenshots/07-profil.png) | Profil und Voting-Journal |
| [08-parteien.png](docs/screenshots/08-parteien.png) | Parteienübersicht |
| [09-parteidetail.png](docs/screenshots/09-parteidetail.png) | Parteiprofil mit Kernthemen und Positionen |
| [10-quellen.png](docs/screenshots/10-quellen.png) | Quellen und Medienberichte |
| [11-darkmode.png](docs/screenshots/11-darkmode.png) | Dark Mode |
| [12-mobile.png](docs/screenshots/12-mobile.png) | Mobile Ansicht mit BottomNav |
| [13-admin.png](docs/screenshots/13-admin.png) | Admin-Dashboard mit Systemstatus |
| [14-admin-edit_1.png](docs/screenshots/14-admin-edit_1.png) | Admin-Edit Grunddaten |
| [14-admin-edit_2.png](docs/screenshots/14-admin-edit_2.png) | Admin-Edit Argumente |
| [15-argument-detail.png](docs/screenshots/15-argument-detail.png) | Erweiterte Gewichtung mit Bulk-Aktionen |
| [16-parteivergleich.png](docs/screenshots/16-parteivergleich.png) | Parteivergleich |
| [17-matrix.png](docs/screenshots/17-matrix.png) | Positionen-Matrix |
| [18-disclaimer.png](docs/screenshots/18-disclaimer.png) | Disclaimer-Ribbon |

#### 3.4.2. Umsetzung (Technik)

- **Technologie-Stack:** SvelteKit 2.5.28, Svelte 4.2.20, TypeScript 5.4 strict, Tailwind CSS 3.4, MongoDB 6.6, `@sveltejs/adapter-netlify` 4.4.2. Beleg: [package.json](package.json).
- **Tooling:** VS Code, Vite, `svelte-check`, Netlify Deployment, optionales MongoDB-Seed-Script [scripts/seed.mjs](scripts/seed.mjs). Der KI-Einsatz wird separat in Kapitel 6 deklariert.
- **Struktur & Komponenten:** Routen liegen unter [src/routes/](src/routes/), wiederverwendbare Komponenten unter [src/lib/components/](src/lib/components/), Stores unter [src/lib/stores/](src/lib/stores/) und Server-Utilities unter [src/lib/server/](src/lib/server/). Wichtige Komponenten sind [VotingAssistant.svelte](src/lib/components/VotingAssistant.svelte), [ArgumentWeighting.svelte](src/lib/components/ArgumentWeighting.svelte), `VoteSection`, `VotingJournal`, `TopNav`, `BottomNav`, `DisclaimerRibbon` und `FeedbackForm`.
- **Daten & Schnittstellen:** MongoDB Atlas wird verwendet, wenn `MONGODB_URI` gesetzt ist und `USE_MOCK_DATA=false` gilt. Ohne diese Konfiguration nutzt die App Seed-/In-Memory-Fallback-Daten. Collections: `abstimmungen`, `communityVotes`, `parteiInteressen`. Persönliche Daten bleiben im `localStorage`. API-Endpunkte existieren für Community-Votes, Interessen-Registrierung und CSV-Export. Belege: [src/lib/server/db.ts](src/lib/server/db.ts), [src/lib/server/dataLayer.ts](src/lib/server/dataLayer.ts), [docs/04-prototype.md](docs/04-prototype.md).
- **Deployment:** Die Live-App ist unter <https://friendly-llama-b738d4.netlify.app> erreichbar. Netlify baut aus dem `main`-Branch. Produktiv relevante Environment-Variablen sind `MONGODB_URI`, `USE_MOCK_DATA=false` und `ADMIN_PASSWORD`; echte Werte werden nicht im Repo dokumentiert. Siehe [docs/07-projektorganisation.md](docs/07-projektorganisation.md).
- **Besondere Entscheidungen:** MongoDB mit Fallback, lokale Speicherung persönlicher Daten, SvelteKit/Netlify als Deployment-Stack, KI-Unterstützung mit Quellenprüfung sowie Kompass/Argumentgewichtung sind als ADRs dokumentiert: [docs/adr/001-mongodb-mit-fallback.md](docs/adr/001-mongodb-mit-fallback.md), [docs/adr/002-localstorage-fuer-persoenliche-daten.md](docs/adr/002-localstorage-fuer-persoenliche-daten.md), [docs/adr/003-ki-unterstuetzung-mit-quellenpruefung.md](docs/adr/003-ki-unterstuetzung-mit-quellenpruefung.md), [docs/adr/004-sveltekit-und-netlify.md](docs/adr/004-sveltekit-und-netlify.md), [docs/adr/005-kompass-und-argumentgewichtung.md](docs/adr/005-kompass-und-argumentgewichtung.md).

### 3.5 Validate

- **URL der getesteten Version** (separat deployt): Getestet wurde die öffentliche Netlify-Version <https://friendly-llama-b738d4.netlify.app>. Die Moodle-Vorlage fragt nach einer separat deployten getesteten Version; im Repo ist jedoch kein separates Zwischen-Deployment-Archiv der Testversion vom 20. Mai 2026 dokumentiert. Der finale Abgabestand wird deshalb zusätzlich über [docs/screenshots/](docs/screenshots/README.md) und den Video-Walkthrough in [docs/video/](docs/video/README.md) belegt. Diese Einschränkung ist in [docs/05-validate.md](docs/05-validate.md) transparent dokumentiert.
- **Ziele der Prüfung:** Geprüft wurden Verständlichkeit, Neutralität, Interaktivität, Nutzerführung, UX/Design, Nutzen vor einer realen Abstimmung, Auffindbarkeit von Quellen sowie die Erklärbarkeit von Argumentgewichtung, Kompass und Voting-Journal.
- **Vorgehen:** Moderierte, szenario-basierte Usability-Tests mit Think-Aloud, Beobachtung, Feedback Grid, Issue-Ableitung und 5-stufiger Bewertung. Politische Inhalte wurden nicht per Audio/Video aufgezeichnet, damit Testpersonen offen reagieren konnten.
- **Stichprobe:** Insgesamt fünf anonymisierte Testpersonen: P1-P3 im Unterricht/ZHAW-Kontext am 20. Mai 2026, P4-P5 als private Nachtests am 24. Mai 2026. Die unterschiedlichen Protokolltiefen sind in [docs/05-validate.md](docs/05-validate.md) offengelegt.
- **Aufgaben/Szenarien:** Abstimmung finden, Parteipositionen prüfen, Pro-/Contra-Argumente vergleichen, Argumente gewichten, Position mit Notiz speichern, Kompass absolvieren, gespeicherte Inhalte im Profil wiederfinden und Originalquellen prüfen.
- **Kennzahlen & Beobachtungen:** Die quantitative Bewertung beruht auf der Unterrichtsevaluation mit **n=3** (P1-P3): durchschnittlich **4.2 / 5** über Bedienbarkeit/Navigation (4/5), Verständlichkeit (5/5), Neutralität (4/5), visuelles Design (4/5) und Gesamteindruck (4/5). **3 von 3** Unterrichtstestpersonen würden die App vor einer Abstimmung nutzen oder wahrscheinlich nutzen. Insgesamt sind **7 Szenario-Aufgaben (A-G)**, **5 anonymisierte Testpersonen** und **9 konsolidierte Usability-Issues (U1-U9)** dokumentiert. Die Schweregrad-Verteilung der konsolidierten Issues: **2 Issues mit Schweregrad 3**, **6 Issues mit Schweregrad 2**, **1 Issue mit Schweregrad 1-2**, **0 Issues mit Schweregrad 4**. Die privaten Nachtests P4-P5 ergänzen die Evaluation qualitativ; sie wurden nicht in die 4.2/5-Kennzahl eingerechnet.
- **Zusammenfassung der Resultate:** Grundidee, Pro/Contra-Trennung, KI-Briefing und ruhiges Design wurden positiv aufgenommen. Kritische Punkte lagen bei Interaktionssignalen, Desktop-Layout, Erklärbarkeit der Live-Tendenz, Auffindbarkeit von Quellen und Wunsch nach persönlicher Reflexion.
- **Abgeleitete Verbesserungen:** Umgesetzt wurden unter anderem stärkere Workflow-Führung, Argumentgewichtung, Position/Sicherheit/Notiz, Kompass-Erklärung, Profil/Voting-Journal, Desktop-Layout, prominente Quellen, Admin-/CRUD-Belege und zusätzliche Screenshots. Offen bleibt VA-012 als bewusst dokumentierter Design-Konsistenz-Pass.

## 4. Erweiterungen [Optional]

Dokumentiert Erweiterungen über den Mindestumfang hinaus. Jede Erweiterung ist separat nach dem vorgegebenen Schema beschrieben.

### 4.1 Argumentgewichtung mit Live-Tendenz

- **Beschreibung & Nutzen:** Nutzer:innen gewichten Pro- und Contra-Argumente auf einer 0-3-Skala. Die App berechnet daraus eine Live-Tendenz und zeigt die stärksten gewichteten Gründe. Das macht den Entscheidungsprozess aktiv und nachvollziehbar, ohne eine Empfehlung auszusprechen.
- **Wo umgesetzt:**
  - **Frontend:** [src/lib/components/ArgumentWeighting.svelte](src/lib/components/ArgumentWeighting.svelte), eingebunden auf der Detailseite.
  - **Backend:** Kein eigener Backend-Zwang; persönliche Gewichtungen bleiben lokal.
  - **Datenbank:** Keine Speicherung persönlicher Gewichtungen in MongoDB, bewusst aus Datenschutzgründen.
- **Referenz:** [docs/04-prototype.md](docs/04-prototype.md), [docs/screenshots/04-gewichtung.png](docs/screenshots/04-gewichtung.png), [docs/screenshots/15-argument-detail.png](docs/screenshots/15-argument-detail.png), [docs/adr/005-kompass-und-argumentgewichtung.md](docs/adr/005-kompass-und-argumentgewichtung.md).
- **Aus Evaluation abgeleitet?:** Ja, aus U7 und der Notwendigkeit, Live-Tendenz als Reflexion statt Empfehlung zu erklären.

### 4.2 Partei-Kompass

- **Beschreibung & Nutzen:** Ein eigenständiger Orientierungsworkflow mit 18 Szenario-Fragen aus 10 Themenbereichen zeigt parteipolitische Nähe als Ranking und Themen-Breakdown. Er ergänzt die konkrete Abstimmungsvorbereitung um eine breitere politische Selbsteinordnung.
- **Wo umgesetzt:**
  - **Frontend:** [src/routes/kompass/+page.svelte](src/routes/kompass/+page.svelte).
  - **Backend:** Server-Load für vorhandene Datenbasis in [src/routes/kompass/+page.server.ts](src/routes/kompass/+page.server.ts).
  - **Datenbank:** Kompass-Antworten und Resultat bleiben im `localStorage`; Parteien- und Fragenbasis liegt in TypeScript-Daten.
- **Referenz:** [docs/04-prototype.md](docs/04-prototype.md), [docs/screenshots/05-kompass-frage.png](docs/screenshots/05-kompass-frage.png), [docs/screenshots/06-kompass-ergebnis.png](docs/screenshots/06-kompass-ergebnis.png), [docs/adr/005-kompass-und-argumentgewichtung.md](docs/adr/005-kompass-und-argumentgewichtung.md).
- **Aus Evaluation abgeleitet?:** Teilweise. Der Kompass war als Erweiterung konzipiert; die vorsichtigere Ergebnis-Sprache und Berechnungs-Erklärung wurden aus U7 abgeleitet.

### 4.3 Profil und Voting-Journal

- **Beschreibung & Nutzen:** Gespeicherte Positionen, Notizen, Sicherheit, Bookmarks, Kompass-Ergebnis, Partei-Übereinstimmung und Aktivitäten werden im Profil zusammengeführt. Dadurch entsteht ein persönlicher Reflexionsraum statt einer einmaligen Interaktion.
- **Wo umgesetzt:**
  - **Frontend:** [src/routes/profil/+page.svelte](src/routes/profil/+page.svelte) und Journal-Komponenten.
  - **Backend:** Server-Load für Abstimmungsdaten in [src/routes/profil/+page.server.ts](src/routes/profil/+page.server.ts).
  - **Datenbank:** Persönliche Daten bleiben im `localStorage`; keine personenbezogene serverseitige Speicherung.
- **Referenz:** [docs/04-prototype.md](docs/04-prototype.md), [docs/screenshots/07-profil.png](docs/screenshots/07-profil.png), [docs/adr/002-localstorage-fuer-persoenliche-daten.md](docs/adr/002-localstorage-fuer-persoenliche-daten.md).
- **Aus Evaluation abgeleitet?:** Ja, aus U3 und U8: Wunsch nach Notiz, eigener Position und Wiederfinden im Profil.

### 4.4 Parteienbereich, Parteivergleich und Positionen-Matrix

- **Beschreibung & Nutzen:** Die App zeigt Parteienprofile, Kernthemen, Positionen zu Vorlagen, einen direkten Parteivergleich und eine Matrix der Parteiparolen. Das erweitert die einzelne Vorlage um politische Einordnung.
- **Wo umgesetzt:**
  - **Frontend:** [`src/routes/parteien/+page.svelte`](src/routes/parteien/+page.svelte), [`src/routes/parteien/[kuerzel]/+page.svelte`](src/routes/parteien/[kuerzel]/+page.svelte), [`src/routes/abstimmungen/[slug]/parteien/+page.svelte`](src/routes/abstimmungen/[slug]/parteien/+page.svelte).
  - **Backend:** Server-Loads für Parteien- und Abstimmungsdaten.
  - **Datenbank:** Parteipositionen sind Teil der `abstimmungen`-Daten; Parteienprofile liegen strukturiert in TypeScript-Daten.
- **Referenz:** [docs/screenshots/08-parteien.png](docs/screenshots/08-parteien.png), [docs/screenshots/09-parteidetail.png](docs/screenshots/09-parteidetail.png), [docs/screenshots/16-parteivergleich.png](docs/screenshots/16-parteivergleich.png), [docs/screenshots/17-matrix.png](docs/screenshots/17-matrix.png).
- **Aus Evaluation abgeleitet?:** Teilweise. Parteienraster und Parteikürzel waren in U4 relevant; Parteidetailseiten und grössere Darstellung wurden als Verbesserung umgesetzt, Tooltip bleibt offen.

### 4.5 Admin-CRUD mit MongoDB Atlas und Fallback

- **Beschreibung & Nutzen:** Der Admin-Bereich erlaubt Datenpflege für Abstimmungen, Argumente und Parteipositionen sowie Einsicht in Community-Votes und Interessen-Registrierungen. Damit wird die Bewertungsanforderung «Daten erstellen/aktualisieren» sichtbar erfüllt.
- **Wo umgesetzt:**
  - **Frontend:** [src/routes/admin/](src/routes/admin/) mit Dashboard, Login, Abstimmungsübersicht, New/Edit, Community und Interessen.
  - **Backend:** Form Actions und Data Layer in [src/lib/server/dataLayer.ts](src/lib/server/dataLayer.ts).
  - **Datenbank:** MongoDB Collections `abstimmungen`, `communityVotes`, `parteiInteressen`; bei fehlender Konfiguration In-Memory-Fallback.
- **Referenz:** [docs/04-prototype.md](docs/04-prototype.md), [docs/07-projektorganisation.md](docs/07-projektorganisation.md), [docs/screenshots/13-admin.png](docs/screenshots/13-admin.png), [docs/screenshots/14-admin-edit_1.png](docs/screenshots/14-admin-edit_1.png), [docs/screenshots/14-admin-edit_2.png](docs/screenshots/14-admin-edit_2.png), [docs/adr/001-mongodb-mit-fallback.md](docs/adr/001-mongodb-mit-fallback.md).
- **Aus Evaluation abgeleitet?:** Nein, primär aus technischer Mindestanforderung und Abgabe-Risiko abgeleitet. VA-015 dokumentiert die Sichtbarmachung in Doku und Video.

### 4.6 Quellen- und Medienberichte-Seite

- **Beschreibung & Nutzen:** Amtliche Quellen, Parteiquellen, Medienberichte und Methodik/KI-Transparenz werden getrennt dargestellt. Das stärkt Vertrauen und macht politische Inhalte prüfbar.
- **Wo umgesetzt:**
  - **Frontend:** [src/routes/quellen/+page.svelte](src/routes/quellen/+page.svelte).
  - **Backend:** Keine komplexe Backend-Logik; kuratierte Quellen liegen in der App-Datenbasis.
  - **Datenbank:** Quellenangaben pro Abstimmung und Argument sind Teil der strukturierten Daten.
- **Referenz:** [docs/04-prototype.md](docs/04-prototype.md), [docs/05-validate.md](docs/05-validate.md), [docs/screenshots/10-quellen.png](docs/screenshots/10-quellen.png).
- **Aus Evaluation abgeleitet?:** Ja, aus U5: Quellenhinweise wurden ursprünglich übersehen und wurden danach prominenter platziert.

### 4.7 Community-Votes und Interessen-Registrierungen

- **Beschreibung & Nutzen:** Nutzer:innen können anonym aggregierte Community-Votes abgeben. Zusätzlich können Interessen-Registrierungen aus dem Parteienbereich serverseitig erfasst und im Admin-Bereich als CSV exportiert werden.
- **Wo umgesetzt:**
  - **Frontend:** Vote-Interaktion in Detailseiten, Interessenbereich in Parteien-Workflows, Admin-Ansichten.
  - **Backend:** [`src/routes/api/abstimmungen/[slug]/vote/+server.ts`](src/routes/api/abstimmungen/[slug]/vote/+server.ts), [`src/routes/api/parteien/interesse/+server.ts`](src/routes/api/parteien/interesse/+server.ts), [`src/routes/api/admin/interessen.csv/+server.ts`](src/routes/api/admin/interessen.csv/+server.ts).
  - **Datenbank:** `communityVotes` und `parteiInteressen` bei aktivem MongoDB-Modus.
- **Referenz:** [docs/04-prototype.md](docs/04-prototype.md), [docs/07-projektorganisation.md](docs/07-projektorganisation.md).
- **Aus Evaluation abgeleitet?:** Nein, primär als Produkt- und Datenbankerweiterung umgesetzt.

### 4.8 Dark Mode, Responsive Navigation und Disclaimer-Ribbon

- **Beschreibung & Nutzen:** Dark Mode, mobile BottomNav, Desktop TopNav, Skip-Link, Fokuszustände und Disclaimer-Ribbon verbessern Bedienbarkeit, Zugänglichkeit und rechtlich-ethische Transparenz.
- **Wo umgesetzt:**
  - **Frontend:** Layout und globale Komponenten in [src/routes/+layout.svelte](src/routes/+layout.svelte), [src/lib/components/TopNav.svelte](src/lib/components/TopNav.svelte), [src/lib/components/BottomNav.svelte](src/lib/components/BottomNav.svelte), [src/lib/components/DisclaimerRibbon.svelte](src/lib/components/DisclaimerRibbon.svelte), globale Styles in [src/app.css](src/app.css).
  - **Backend:** Nicht erforderlich.
  - **Datenbank:** Theme- und Disclaimer-Status bleiben im `localStorage`.
- **Referenz:** [docs/screenshots/11-darkmode.png](docs/screenshots/11-darkmode.png), [docs/screenshots/12-mobile.png](docs/screenshots/12-mobile.png), [docs/screenshots/18-disclaimer.png](docs/screenshots/18-disclaimer.png), [docs/issues.md](docs/issues.md).
- **Aus Evaluation abgeleitet?:** Teilweise. Desktop- und Mobile-Verbesserungen wurden aus U2/U9 abgeleitet; der Disclaimer folgt aus rechtlich-ethischer Abgrenzung des Prototyps.

## 5. Projektorganisation [Optional]

- **Repository & Struktur:** Das öffentliche GitHub-Repository liegt unter <https://github.com/adinho11-git/voting-assistant>. Die App-Struktur trennt `src/` für Anwendungscode, `docs/` für Projektartefakte, `docs/mockups/` für Sketch/Mockup-PDFs, `docs/screenshots/` für finale Screenshots und `docs/video/` für den Walkthrough. Die vollständige Struktur ist in [docs/07-projektorganisation.md](docs/07-projektorganisation.md) beschrieben.
- **Issue-Management:** Die versionierte Issue-Dokumentation liegt in [docs/issues.md](docs/issues.md). Sie enthält VA-001 bis VA-016 mit Status, Priorität, Labels, Akzeptanzkriterien und Bewertungsraster-Bezug. VA-012 bleibt bewusst offen, weil kein expliziter finaler Design-Konsistenz-Pass als eigenes Artefakt belegt ist. Die übrigen abgaberelevanten Dokumentations-, Evaluations-, Screenshot-, Video- und Admin-/CRUD-Punkte sind als erledigt dokumentiert.
- **Commit-Praxis:** Das Projekt ist eine Einzelarbeit mit `main` als langlebigem Branch und automatischem Netlify-Deployment. Die Commit-Historie enthält Feature-, Dokumentations-, Deployment- und Abschluss-Commits; Beispiele sind in [docs/07-projektorganisation.md](docs/07-projektorganisation.md) aufgeführt. Vor finalen Deployments werden `npm run check`, `npm run build`, Netlify-Status, zentrale Live-Routen und Admin-Konfiguration geprüft.
- **Artefakt-Ablage:** Alle abgaberelevanten Artefakte sind im Repo greifbar: Phasendoku [docs/01-understand.md](docs/01-understand.md) bis [docs/07-projektorganisation.md](docs/07-projektorganisation.md), Mockups, Screenshots, Video, KI-Deklaration, Promptvorgehen, ADRs und Issue-Set. Dadurch ist die Abgabe auch ohne externe Cloud-Ordner nachvollziehbar.

## 6. KI-Deklaration

Die folgende Deklaration ist verpflichtend und beschreibt den Einsatz von KI im Projekt. Die Langfassung steht in [docs/06-ki-einsatz.md](docs/06-ki-einsatz.md), das Promptvorgehen in [docs/prompts.md](docs/prompts.md).

### 6.1 KI-Tools

- **Eingesetzte Tools:** Claude Code (Anthropic), Codex (OpenAI) und ChatGPT (OpenAI).
- **Zweck & Umfang:** Claude Code wurde für Code-Analyse, Refactoring-Vorschläge, Dokumentationsstruktur, UX-Reviews und technische Reviews eingesetzt. Codex wurde für fokussierte Coding-Tasks, UI-/Workflow-Verbesserungen, Code-Audits und finale Doku-Konsistenz genutzt. ChatGPT wurde für Projektstrategie, Bewertungsraster-Interpretation, Prompt-Erstellung, UX-Kritik, Priorisierung und Reflexion verwendet.
- **Eigene Leistung (Abgrenzung):** Konzept, Zielgruppe, Workflow, finale Feature-Auswahl, Architekturentscheidungen, Quellenprüfung, politische Neutralität, finale Texte und Abgabeprioritäten wurden manuell entschieden und überprüft. KI war Arbeits- und Sparring-Werkzeug, nicht politische Quelle und nicht Entscheiderin.

### 6.2 Prompt-Vorgehen

Das Prompting erfolgte iterativ und auf kleine Arbeitspakete bezogen. Typische Muster waren Code-Analyse, Komponenten-Umsetzung, UX-Review, Bewertungsraster-Abgleich und inhaltliche Verdichtung mit Quellenpflicht. Prompts enthielten konkrete Dateien, Ziele, Bewertungsbezug und klare Grenzen: keine Wahlempfehlungen, keine erfundenen Quellen, keine Secrets, keine personenbezogenen Daten. Repräsentative Muster sind in [docs/prompts.md](docs/prompts.md) dokumentiert.

### 6.3 Reflexion

KI brachte vor allem Geschwindigkeit bei Boilerplate, Strukturierung, Review und Dokumentation. Die grössten Risiken waren Quellen-Halluzination, plausibel klingende falsche politische Inhalte, subtiler Bias, Code-Edge-Cases und ungewollt empfehlende Sprache. Gegenmassnahmen waren manuelle Quellenprüfung, Type-Check/Build, bewusst neutrale Formulierungen, In-App-KI-Transparenz und klare Verantwortung beim Entwickler. Die App nutzt KI zur Verdichtung und Strukturierung, aber nicht als politische Autorität.

## 7. Anhang [Optional]

- **Quellen:** Amtliche Grundlagen und Resultate stammen aus admin.ch, bk.admin.ch und abstimmungen.admin.ch. Parteipositionen und Medienberichte sind als Partei- beziehungsweise Medienquellen gekennzeichnet. Die Quellen- und Methodikdarstellung ist in der App unter `/quellen` sichtbar und in [docs/screenshots/10-quellen.png](docs/screenshots/10-quellen.png) belegt.
- **Testskript & Materialien:** Evaluationsziele, Testaufgaben A-G, Stichprobe P1-P5, Feedback Grid, Schweregrad-Skala, Resultate und Verbesserungen stehen in [docs/05-validate.md](docs/05-validate.md). Die In-App-Feedback-Komponente ist in [src/lib/components/FeedbackForm.svelte](src/lib/components/FeedbackForm.svelte) belegt.
- **Rohdaten/Auswertung:** Die Auswertung ist qualitativ und anonymisiert in [docs/05-validate.md](docs/05-validate.md) dokumentiert. Es wurden keine privaten Chatlogs, personenbezogenen Testdaten oder politischen Rohaufnahmen ins Repo gelegt.
- **Mockups und Skizzen:** [docs/mockups/Uebung9_Abgabe_Adi_Lama.pdf](docs/mockups/Uebung9_Abgabe_Adi_Lama.pdf), [docs/mockups/Uebung10_Abgabe_Adi_Lama.pdf](docs/mockups/Uebung10_Abgabe_Adi_Lama.pdf), Übersicht in [docs/mockups/README.md](docs/mockups/README.md).
- **Screenshots:** Alle finalen Screenshots 01-18 liegen unter [docs/screenshots/](docs/screenshots/README.md).
- **Video-Walkthrough:** Der kommentierte Walkthrough liegt im Repository unter [docs/video/voting-assistant-walkthrough_2026-05-28.mp4](docs/video/voting-assistant-walkthrough_2026-05-28.mp4) und wird gemäss Abgabevorgaben zusätzlich als Datei eingereicht. Details stehen in [docs/video/README.md](docs/video/README.md).
- **ADRs:** Architekturentscheidungen liegen unter [docs/adr/](docs/adr/).
- **Rechtlicher Hinweis:** Der Voting Assistant ist ein studentischer Prototyp im Modul Prototyping (ZHAW FS 2026), keine offizielle Abstimmungshilfe und keine Wahlempfehlung. Für rechtsverbindliche Informationen sind die offiziellen Quellen massgebend.
