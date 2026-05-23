# Screenshots der fertigen App

> Dieser Ordner enthält die finalen Screenshots des Prototyps. Sie werden in der [`README.md`](../../README.md) im Repo-Root und in [`docs/04-prototype.md`](../04-prototype.md) referenziert.

---

## Wozu dieser Ordner

Die Bewertungsrubrik «Dokumentation & Video» verlangt explizit «Screenshots inkl. Beschreibungen der fertigen App». Dieser Ordner ist die zentrale Ablage dafür.

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
09-parteidetail.png
10-quellen.png
11-darkmode.png
12-mobile.png
13-admin.png
```

Empfohlene Auflösung: mindestens 1440 × 900 px für Desktop, 390 × 844 px für Mobile (iPhone-Standardgrösse).

Format: **PNG** (verlustfrei), bei Bedarf auf < 500 KB komprimieren (z. B. mit TinyPNG), damit das Repo nicht aufbläht.

## Screenshot-Checkliste

- [ ] **01-startseite.png** — Komplette Startseite mit Hero, Countdown, anstehenden Vorlagen, Workflow-Erklärung.
- [ ] **02-abstimmungen.png** — Abstimmungsübersicht mit Tab-Navigation, Suche, mindestens zwei Vorlagen-Karten.
- [ ] **03-detail-briefing.png** — Abstimmungsdetailseite mit Briefing, Bundesrat- und Parlament-Position, Quellen-Eintrag, sichtbaren Sektionen «Überblick» und «Argumente».
- [ ] **04-gewichtung.png** — Argumentgewichtungs-Komponente mit aktiven Bewertungen, sichtbarer Live-Tendenz, Score-Bar und «Stärkste gewichtete Gründe».
- [ ] **05-kompass-frage.png** — Partei-Kompass Frage mit 5-Stufen-Skala, Themen-Eyebrow, Kontext-Szenario und Fortschritts-Balken.
- [ ] **06-kompass-ergebnis.png** — Partei-Kompass Ergebnis mit Top-Match, Ranking aller sechs Parteien, Themen-Breakdown und ausklappbarer Erklärung der Berechnung.
- [ ] **07-profil.png** — Profil / Voting-Journal mit Statistik-Header, mindestens einer Journal-Karte und «Übereinstimmung mit Parteipositionen».
- [ ] **08-parteien.png** — Parteienübersicht mit den sechs Bundesparteien, idealerweise mit sichtbarem Filter und/oder Parteien-Vergleichs-Block.
- [ ] **09-parteidetail.png** — Parteidetailseite mit Profil, Kernthemen, Spektrum 2D und Positionen zu aktuellen Vorlagen.
- [ ] **10-quellen.png** — Quellen & Medienberichte mit der getrennten Auflistung «amtlich / Partei / Medien» und sichtbarem Filter.
- [ ] **11-darkmode.png** — Beliebige Seite (Empfehlung: Startseite oder Detail) im Dark Mode.
- [ ] **12-mobile.png** — Mobile Ansicht einer zentralen Seite (z. B. Detail oder Übersicht) mit sichtbarer Bottom-Nav.
- [ ] **13-admin.png** — Admin-Dashboard mit System-Status und mindestens einer CRUD-Tabelle.

Optional und sinnvoll als Ergänzung:

- [ ] `14-argument-detail.png` — Detail-Seite eines einzelnen Arguments mit Quellen-Box.
- [ ] `15-parteivergleich.png` — Direkter Parteien-Vergleich (A vs. B).
- [ ] `16-matrix.png` — Positionen-Matrix über mehrere Vorlagen.
- [ ] `17-disclaimer.png` — Sichtbarer Disclaimer-Ribbon oben.

## Beschreibungen unter den Bildern

Empfehlung: In der README im Repo-Root oder in `docs/04-prototype.md` jedes Bild mit ein bis zwei Sätzen kommentieren, damit Bewertende den Kontext sofort verstehen.

Beispiel:

```markdown
### Startseite
![Startseite](docs/screenshots/01-startseite.png)
Die Startseite zeigt den Countdown zur kommenden eidgenössischen Abstimmung, die anstehenden Vorlagen und die Workflow-Erklärung.
```

## Hinweise zu Inhalten

Da es sich um politische Inhalte handelt, gilt:

- **Persönliche Notizen vor dem Screenshot löschen** — `localStorage` leeren (DevTools → Application → Storage → Clear site data), damit keine Test-Notizen aus der Entwicklung sichtbar sind.
- **Reale Parteilogos / -bilder** nicht ohne Erlaubnis verwenden — die App nutzt nur farbige Initialen-Avatare.
- **Live-URL** ist OK auf Screenshots; Admin-Passwörter natürlich nicht.
- **Persönliche Browser-Bookmarks** ausblenden (Browser-Lesezeichenleiste schliessen vor der Aufnahme).

> **TODO:** Screenshots aufnehmen, hier ablegen, in der README im Repo-Root einbinden, in `docs/04-prototype.md` referenzieren.
