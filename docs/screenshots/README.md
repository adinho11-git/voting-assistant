# Screenshots der fertigen App

> Dieser Ordner enthält die finalen Screenshots des Prototyps. Sie werden in der [`README.md`](../../README.md) im Repo-Root und in [`docs/04-prototype.md`](../04-prototype.md) referenziert.

---

## Wozu dieser Ordner

Die Bewertungsrubrik «Dokumentation & Video» verlangt explizit «Screenshots inkl. Beschreibungen der fertigen App». Dieser Ordner ist die zentrale Ablage dafür. Alle Pflichtscreenshots liegen direkt in diesem Ordner und werden in der Root-README sowie in [`../04-prototype.md`](../04-prototype.md) referenziert.

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
14-admin-edit_1.png
14-admin-edit_2.png
15-argument-detail.png
16-parteivergleich.png
17-matrix.png
18-disclaimer.png
```

Empfohlene Auflösung: mindestens 1440 × 900 px für Desktop, 390 × 844 px für Mobile (iPhone-Standardgrösse).

Format: **PNG** (verlustfrei), bei Bedarf auf < 500 KB komprimieren (z. B. mit TinyPNG), damit das Repo nicht aufbläht.

## Screenshot-Checkliste

### Pflichtbestand

- [x] **01-startseite.png** — Startseite mit Hero, Countdown, anstehenden Vorlagen und Workflow-Einstieg.
- [x] **02-abstimmungen.png** — Abstimmungsübersicht mit Tab-Navigation, Suche und Vorlagen-Karten.
- [x] **03-detail-briefing.png** — Abstimmungsdetailseite mit Briefing, Bundesrat- und Parlament-Position sowie Quellen-Eintrag.
- [x] **04-gewichtung.png** — Argumentgewichtungs-Komponente mit aktiven Bewertungen, sichtbarer Live-Tendenz, Score-Bar und gewichteten Gründen.
- [x] **05-kompass-frage.png** — Partei-Kompass-Frage mit 5-Stufen-Skala, Themen-Eyebrow, Kontext-Szenario und Fortschritts-Balken.
- [x] **06-kompass-ergebnis.png** — Partei-Kompass-Ergebnis mit Top-Match, Ranking und Themen-Breakdown.
- [x] **07-profil.png** — Profil / Voting-Journal mit Statistik-Header, Journal-Bezug und gespeicherten Orientierungsdaten.
- [x] **08-parteien.png** — Parteienübersicht mit sechs Bundesparteien und politischer Einordnung.
- [x] **09-parteidetail.png** — Parteidetailseite mit Profil, Kernthemen, Spektrum und Positionen zu aktuellen Vorlagen.
- [x] **10-quellen.png** — Quellen & Medienberichte mit getrennter Auflistung amtlicher Quellen, Parteiquellen und Medien.
- [x] **11-darkmode.png** — Zentrale Ansicht im Dark Mode.
- [x] **12-mobile.png** — Mobile Ansicht mit sichtbarer Bottom-Nav und Smartphone-Layout.
- [x] **13-admin.png** — Admin-Dashboard mit System-Status, Kennzahlen und produktivem MongoDB-Atlas-Modus.

### Ergänzungen für vertiefte Belegung

- [x] **14-admin-edit_1.png** — Admin-Edit-Seite einer Vorlage: Grunddaten (Titel, Slug, Datum, Kategorie, Lesezeit) mit Speichern-Button.
- [x] **14-admin-edit_2.png** — Admin-Edit-Seite einer Vorlage: Argument-Sektion mit Pro/Contra, Quelle pro Argument, Hinzufügen- und Entfernen-Aktionen.
- [x] **15-argument-detail.png** — Erweiterte Argumentgewichtung mit Bulk-Aktionen pro Spalte («Pro wichtig setzen», «Pro zurücksetzen» und analog Contra).
- [x] **16-parteivergleich.png** — Direkter Parteivergleich (A vs. B) mit Eckdaten, Gründungsdatum, Mitgliederzahl, Links-Rechts-Skala und Kernthemen.
- [x] **17-matrix.png** — Positionen-Matrix der sechs Bundesparteien zu ausgewählten Vorlagen mit JA/NEIN-Parolen.
- [x] **18-disclaimer.png** — Disclaimer-Ribbon oben auf der Startseite mit Quellenverweis und Dismiss-Button.

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

Status: Pflicht- und Zusatzscreenshots wurden aufgenommen, unter dem festgelegten Namensschema abgelegt und in der README sowie in [`../04-prototype.md`](../04-prototype.md) referenziert. Die Zusatzscreenshots 14–18 ergänzen den Pflichtbestand visuell um Admin-CRUD, erweiterte Gewichtung, Parteivergleich, Positionen-Matrix und Disclaimer-Ribbon.
