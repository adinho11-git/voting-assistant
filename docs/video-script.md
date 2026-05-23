# Video-Script — Walkthrough Voting Assistant

> 5-Minuten-Walkthrough (max. 10 Min.) für die Modul-Abgabe Prototyping ZHAW FS 2026. Die Modul-Richtlinien verlangen, dass alle Workflows demonstriert werden und der KI-Einsatz dokumentiert ist.

---

## Eckdaten

- **Dauer:** ca. 5 Minuten (Obergrenze 10 Minuten).
- **Sprache:** Hochdeutsch oder Schweizerdeutsch (Hochdeutsch empfohlen für die Klarheit).
- **Bildanteil:** Bildschirmaufnahme der Live-App, Person muss nicht sichtbar sein.
- **Tonqualität:** Headset oder externes Mikrofon empfohlen, Hintergrundgeräusche vermeiden.
- **Auflösung:** 1920 × 1080 (Full HD).
- **Aufnahmewerkzeug:** OBS Studio, QuickTime oder integrierte Bildschirmaufnahme.
- **Ablage:** als Datei zusammen mit dem Repo abgeben **und** Link in der README ergänzen (TODO).

## Struktur (10 Abschnitte)

| # | Abschnitt | Dauer | Inhalt |
|---|---|---|---|
| 1 | Problem und Zielgruppe | 0:00–0:30 | Aufhänger: «Vor jeder Abstimmung viele Quellen, wenig Zeit», Persona kurz erwähnen |
| 2 | Startseite | 0:30–1:00 | Hauptnutzen, Countdown, Workflow-Erklärung, anstehende Vorlagen |
| 3 | Abstimmung öffnen | 1:00–1:45 | Detailseite, Briefing, Datenqualitäts-Badge, Pro/Contra mit Quelle |
| 4 | Argumente gewichten | 1:45–2:30 | 4-Stufen-Skala, Live-Tendenz beobachten, gewichtete Tendenz speichern |
| 5 | Position speichern | 2:30–3:00 | JA / NEIN / Unsicher, Sicherheits-Slider, Notiz, Speichern-Bestätigung |
| 6 | Partei-Kompass | 3:00–3:45 | 2–3 Fragen demonstrieren, Ergebnis öffnen, Themen-Breakdown erklären |
| 7 | Profil / Voting-Journal | 3:45–4:15 | Statistik-Header, Journal-Karten, Übereinstimmung mit Parteien |
| 8 | Quellen & Medienberichte | 4:15–4:35 | Trennung amtlich / Partei / Medien, Filter zeigen |
| 9 | Admin / Datenstruktur | 4:35–4:50 | Login kurz, Dashboard, eine Bearbeitung erwähnen, CSV-Export anteasern |
| 10 | KI-Einsatz und Evaluation | 4:50–5:00 | Disclaimer-Ribbon, KI-Transparenz auf Startseite, Verweis auf Doku und Evaluation |

## Sprechertext (Entwurf)

Der Text ist als Lesefassung gedacht und kann frei angepasst werden. Die Zeiten sind Richtwerte.

### 1. Problem und Zielgruppe — 0:00–0:30

> «Hallo. Ich zeige euch in den nächsten fünf Minuten den Voting Assistant — eine SvelteKit-App, die Stimmberechtigten in der Schweiz hilft, sich vor einer eidgenössischen Abstimmung strukturiert ein eigenes Bild zu machen.
> 
> Das Problem: Bundesbüchlein, Parteiparolen, Medienberichte — die Informationsmenge vor jeder Abstimmung ist hoch, die Zeit knapp. Meine App führt Nutzerinnen und Nutzer in sechs klaren Schritten zu einer eigenen, dokumentierten Position.»

### 2. Startseite — 0:30–1:00

> «Die Startseite zeigt sofort, was die App macht: «Abstimmungen verstehen, Argumente gewichten, eigene Position finden.» Hier sehe ich den Countdown zur kommenden Abstimmung am 14. Juni 2026 und die beiden anstehenden eidgenössischen Vorlagen — die Nachhaltigkeitsinitiative und die Änderung des Zivildienstgesetzes.
> 
> Direkt darunter ist der Workflow erklärt: Verstehen, Abwägen, Gewichten, Speichern.»

### 3. Abstimmung öffnen — 1:00–1:45

> «Ich öffne die Nachhaltigkeitsinitiative. Auf der Detailseite sehe ich das Datum, die Kategorie, ein Datenqualitäts-Badge, das hier «Offiziell» zeigt — die Daten kommen von admin.ch.
> 
> Darunter das KI-gestützte Briefing mit Stand-Datum und Originalquelle. Dann der Abschnitt «Argumente»: Pro und Contra direkt nebeneinander, jedes Argument mit eigener Quelle und Datum.»

### 4. Argumente gewichten — 1:45–2:30

> «Jetzt der eigentliche Kern: Ich kann jedes Argument auf einer vierstufigen Skala gewichten, 0 für nicht wichtig bis 3 für sehr wichtig. Schaut, wie sich rechts die Live-Tendenz verändert: Pro-Punkte, Contra-Punkte, und am Ende eine Tendenz JA oder NEIN — das ist keine Empfehlung, sondern eine Spiegelung meiner eigenen Gewichtung.
> 
> Ich kann diese gewichtete Tendenz direkt in mein Voting-Journal übernehmen.»

### 5. Position speichern — 2:30–3:00

> «Im Abschnitt «Meine Position» wähle ich JA, NEIN oder Unsicher. Ich gebe meine Sicherheit per Slider an, schreibe eine kurze Notiz, und speichere. Die Bestätigung erscheint sofort als Toast.
> 
> Diese Daten bleiben ausschliesslich in meinem Browser — kein Konto, kein Server-Profil.»

### 6. Partei-Kompass — 3:00–3:45

> «Wechsel zum Partei-Kompass. 18 Fragen aus 10 Themenbereichen — Migration, Klima, Wirtschaft, Sicherheit und so weiter. Pro Frage eine 5-Stufen-Skala, ich kann Fragen auch überspringen.
> 
> Am Ende sehe ich das Ranking aller sechs Bundesparteien und einen Themen-Breakdown — wo ich am stärksten und am schwächsten mit der Top-Partei übereinstimme. Die Berechnung ist transparent erklärt.»

### 7. Profil / Voting-Journal — 3:45–4:15

> «Im Profil sehe ich alle meine gespeicherten Positionen, mein Kompass-Ergebnis und automatisch berechnet, mit welchen Parteien meine bisherigen Stimmen am stärksten übereinstimmen.
> 
> Jede Position kann ich nachträglich ändern, eine neue Notiz schreiben oder löschen.»

### 8. Quellen & Medienberichte — 4:15–4:35

> «Die Quellen-Seite trennt bewusst: amtliche Originalquellen, Parteipositionen — die als Interessenpositionen gekennzeichnet sind — und Medienberichte mit Filter. So bleibt der Vertrauensgrad transparent.»

### 9. Admin / Datenstruktur — 4:35–4:50

> «Kurz die technische Tiefe: Ein passwortgeschützter Admin-Bereich erlaubt CRUD auf Abstimmungen, Argumente und Parteipositionen. Im Hintergrund läuft eine MongoDB-Anbindung mit transparentem In-Memory-Fallback, der Modus wird im Dashboard angezeigt. Interessen-Registrierungen lassen sich als CSV exportieren.»

### 10. KI-Einsatz und Evaluation — 4:50–5:00

> «Der KI-Einsatz ist deklariert: Briefings und Code-Boilerplate sind mit Claude entstanden, alle Inhalte manuell auf Genauigkeit geprüft. Das ist auf der Startseite und auf der Quellen-Seite sichtbar.
> 
> Eine Usability-Evaluation mit Testpersonen wurde durchgeführt, das vollständige Vorgehen und die Erkenntnisse stehen im `docs/`-Ordner des Repos. Danke!»

## Aufnahme-Checkliste

Vor der Aufnahme:

- [ ] Lokale Live-App (oder Netlify-Deployment) bereit, Login-Daten griffbereit.
- [ ] `localStorage` leeren (DevTools → Application → Storage → Clear site data) — sonst werden persönliche Notizen sichtbar.
- [ ] Browser-Tabs schliessen, Lesezeichen-Bar ausblenden (Cmd/Ctrl + Shift + B).
- [ ] Notifications stummschalten, Slack/Teams beenden.
- [ ] Dunkles/helles Theme bewusst wählen (oder Wechsel als Element einbauen).
- [ ] Drehbuch ausdrucken oder auf zweitem Monitor öffnen.

Während der Aufnahme:

- [ ] Eine Vorlage konsistent durchführen (Nachhaltigkeitsinitiative empfohlen, weil sie alle Workflow-Schritte gut zeigt).
- [ ] Cursor-Bewegungen ruhig und deutlich.
- [ ] Vor wichtigen Klicks kurz pausieren.

Nach der Aufnahme:

- [ ] Schnitt: Pausen und «Ähms» kürzen, Untertitel ergänzen (optional).
- [ ] Export als MP4 in 1080p.
- [ ] Datei sinnvoll benennen: `Voting-Assistant_Walkthrough_Adi-Lama.mp4`.
- [ ] Auf Moodle / unlisted YouTube hochladen.
- [ ] **TODO:** Link in der README ergänzen.

## TODOs

- [ ] **Video-URL nach Upload eintragen** in `README.md` (Abschnitt «Video-Walkthrough»).
- [ ] Optionalen Untertitel hinzufügen (verbessert Auffindbarkeit und Accessibility).
- [ ] Falls Zeit reicht: Mini-Outro mit Kontaktinfo und Repo-Link einblenden.

---

**Zurück zur Übersicht:** [`../README.md`](../README.md)
