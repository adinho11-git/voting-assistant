# Screenshots der fertigen App

> Dieser Ordner enthält die finalen Screenshots des Prototyps. Sie werden in der [`README.md`](../../README.md) und in [`04-prototype.md`](../04-prototype.md) referenziert.

---

## Wozu dieser Ordner

Die Bewertungsrubrik «Dokumentation & Video» verlangt explizit «Screenshots inkl. Beschreibungen der fertigen App». Dieser Ordner dient als Ablage dafür.

## Datei-Namensschema

```
01-startseite.png
02-abstimmungen.png
03-detail-briefing.png
04-gewichtung.png
05-kompass-frage.png
06-kompass-ergebnis.png
07-profil.png
08-parteien.png
09-quellen.png
10-darkmode.png
11-mobile.png
12-admin.png
```

Empfohlene Auflösung: mindestens 1440 × 900 px für Desktop, 390 × 844 px für Mobile (iPhone-Standardgrösse).

Format: **PNG** (verlustfrei), bei Bedarf auf < 500 KB komprimieren (z. B. mit TinyPNG), damit das Repo nicht aufbläht.

## Screenshot-Checkliste

- [ ] **01-startseite.png** — Komplette Startseite mit Hero, Countdown, anstehenden Vorlagen, Workflow-Erklärung.
- [ ] **02-abstimmungen.png** — Abstimmungsübersicht mit Tab-Navigation, Suche, mindestens zwei Vorlagen-Karten.
- [ ] **03-detail-briefing.png** — Detailseite einer Vorlage mit Briefing, Bundesrat- und Parlament-Position, Quellen-Eintrag.
- [ ] **04-gewichtung.png** — Argumentgewichtungs-Komponente mit aktiven Bewertungen, sichtbarer Live-Tendenz, Score-Bar.
- [ ] **05-kompass-frage.png** — Eine Kompass-Frage mit 5-Stufen-Skala, Themen-Eyebrow, Kontext-Szenario.
- [ ] **06-kompass-ergebnis.png** — Kompass-Ergebnis mit Top-Match, Ranking aller Parteien, Themen-Breakdown.
- [ ] **07-profil.png** — Profil mit Statistik-Header, Voting-Journal-Karten, Übereinstimmung mit Parteipositionen.
- [ ] **08-parteien.png** — Parteienübersicht mit den 6 Bundesparteien, ggf. inklusive Parteien-Vergleichs-Block.
- [ ] **09-quellen.png** — Quellen-Seite mit der getrennten Auflistung amtlich / Partei / Medien.
- [ ] **10-darkmode.png** — Beliebige Seite (z. B. Detail oder Profil) im Dark Mode.
- [ ] **11-mobile.png** — Mobile Ansicht einer zentralen Seite (z. B. Detail oder Übersicht) mit sichtbarer BottomNav.
- [ ] **12-admin.png** — Admin-Dashboard mit System-Status und mindestens einer CRUD-Tabelle.

Optional und sinnvoll als Ergänzung:

- [ ] 13-argument-detail.png — Detail-Seite eines einzelnen Arguments mit Quellen-Box.
- [ ] 14-parteivergleich.png — Direkter Parteien-Vergleich.
- [ ] 15-matrix.png — Positionen-Matrix über mehrere Vorlagen.
- [ ] 16-disclaimer.png — Sichtbarer Disclaimer-Ribbon oben.

## Beschreibungen unter den Bildern

Empfehlung: In der README oder in `docs/04-prototype.md` jedes Bild mit ein bis zwei Sätzen kommentieren, damit die Bewertenden den Kontext sofort verstehen.

Beispiel:

```markdown
### Startseite
![Startseite](docs/screenshots/01-startseite.png)
Die Startseite zeigt den Countdown zur kommenden Abstimmung, die zwei anstehenden Vorlagen vom 14. Juni 2026 und die vier Workflow-Schritte.
```

## Hinweis zu Inhalten

Da es sich um politische Inhalte handelt, gilt:

- **Persönliche Notizen vor dem Screenshot löschen** — `localStorage` leeren, damit keine Test-Notizen aus der Entwicklung sichtbar sind.
- **Reale Parteilogos / -bilder** nicht ohne Erlaubnis verwenden — die App nutzt nur farbige Initialen-Avatare.
- **Live-URL** ist OK auf Screenshots; Admin-Passwörter natürlich nicht.

> **TODO:** Screenshots aufnehmen, hier ablegen und in der README sowie in `04-prototype.md` einbinden.
