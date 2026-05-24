# Video-Walkthrough — Vorbereitung

> Diese Datei ist die **Vorbereitung** des kommentierten Walkthroughs. Das Video selbst wird **zum Abschluss der Projektarbeit** aufgenommen, sobald alle App- und Doku-Inhalte final sind.
>
> Stand: Aufnahme noch ausstehend. Alle Inhalte hier sind Planung, Drehbuch-Entwurf und Aufnahme-Checkliste. Es ist absichtlich noch kein finaler Video-Link eingetragen.

---

## Eckdaten

- **Dauer:** ca. 5 Minuten (Obergrenze 10 Minuten gemäss Aufgabenstellung).
- **Sprache:** Hochdeutsch, Schweizerdeutsch oder Englisch zulässig — empfohlen Hochdeutsch der Klarheit wegen.
- **Bildanteil:** Bildschirmaufnahme der Live-App. Studierende müssen nicht zu sehen sein.
- **Tonqualität:** Headset oder externes Mikrofon empfohlen, ruhige Umgebung.
- **Auflösung:** 1920 × 1080 (Full HD).
- **Aufnahmewerkzeug:** OBS Studio, QuickTime oder integrierte Bildschirmaufnahme.
- **Ziel:** alle relevanten Workflows einmal komplett vorzeigen, KI-Einsatz und Evaluation kurz erwähnen.

---

## Struktur — zehn Abschnitte

| # | Abschnitt | Zeitfenster | Inhalt |
|---|---|---|---|
| 1 | Problem und Zielgruppe | 0:00 – 0:30 | Aufhänger «vor jeder Abstimmung viele Quellen, wenig Zeit», kurze Erwähnung der Zielgruppe |
| 2 | Startseite | 0:30 – 1:00 | Hauptnutzen, Countdown, Workflow-Erklärung, anstehende Vorlagen |
| 3 | Abstimmung öffnen | 1:00 – 1:45 | Detailseite, Briefing, Datenqualitäts-Badge, Pro/Contra mit Quelle |
| 4 | Argumente gewichten | 1:45 – 2:30 | 4-Stufen-Skala, Live-Tendenz beobachten, gewichtete Tendenz speichern |
| 5 | Position speichern | 2:30 – 3:00 | JA / NEIN / Unsicher, Sicherheits-Slider, Notiz, Speichern-Bestätigung |
| 6 | Partei-Kompass | 3:00 – 3:45 | Zwei bis drei Fragen demonstrieren, Ergebnis öffnen, Themen-Breakdown erklären |
| 7 | Profil / Voting-Journal | 3:45 – 4:15 | Statistik-Header, Journal-Karten, Übereinstimmung mit Parteien |
| 8 | Quellen & Medienberichte | 4:15 – 4:35 | Trennung amtlich / Partei / Medien, Filter zeigen |
| 9 | Admin / Datenstruktur | 4:35 – 4:50 | Login kurz, Dashboard, eine Bearbeitung erwähnen, CSV-Export anteasern |
| 10 | KI-Einsatz und Evaluation | 4:50 – 5:00 | Disclaimer-Ribbon, KI-Transparenz auf Startseite, Verweis auf Doku und Evaluation |

---

## Datenbank und CRUD zeigen

Dieser Abschnitt ist wichtig für das Bewertungsraster-Kriterium **«Daten werden aus einer Datenbank geladen und angezeigt; Daten können erstellt und/oder aktualisiert werden»**. Falls die Zeit knapp wird, lieber diesen Teil kurz, aber sichtbar zeigen, statt ihn nur zu erwähnen.

Empfohlener Ablauf:

1. **Admin Login:** `/admin/login` öffnen und sich mit dem gesetzten Admin-Passwort anmelden. Das Passwort selbst nicht im Video nennen oder sichtbar dokumentieren.
2. **Dashboard prüfen:** Auf dem Admin-Dashboard zeigen, dass der produktive Datenmodus aktiv ist, also MongoDB Atlas beziehungsweise `USE_MOCK_DATA=false` angezeigt wird.
3. **CRUD-Aktion zeigen:** Eine bestehende Abstimmung oder ein Argument im Admin-Bereich bearbeiten, zum Beispiel einen Argumenttext oder eine Quellenangabe kurz anpassen.
4. **Öffentliche Seite prüfen:** Zur öffentlichen Abstimmungsdetailseite wechseln und zeigen, dass die Änderung sichtbar ist.
5. **Community Vote abgeben:** Auf der Detailseite eine JA/NEIN-Stimme abgeben.
6. **Aggregation zeigen:** Danach die Community-Anzeige auf der Detailseite oder im Admin-Bereich `/admin/community` zeigen.

Technische Sprechzeile:

> «Die App nutzt MongoDB Atlas, wenn `MONGODB_URI` gesetzt ist und `USE_MOCK_DATA=false` gilt. Die wichtigsten Collections sind `abstimmungen`, `communityVotes` und `parteiInteressen`. Falls MongoDB nicht aktiv ist, fällt der Prototyp auf Seed- und In-Memory-Daten zurück, damit die Demo weiter funktioniert.»

Keine Secret-Werte wie `MONGODB_URI` oder `ADMIN_PASSWORD` im Video zeigen.

---

## Sprechertext (Entwurf)

Der Text ist als Lesefassung gedacht und kann beim Aufnehmen frei angepasst werden. Die Zeiten sind Richtwerte.

### 1. Problem und Zielgruppe — 0:00 – 0:30

> «In den nächsten fünf Minuten zeige ich euch den Voting Assistant — eine SvelteKit-App, die Stimmberechtigten in der Schweiz hilft, sich vor einer eidgenössischen Abstimmung strukturiert ein eigenes Bild zu machen.
>
> Vor jeder Abstimmung ist die Informationsmenge hoch und die Zeit knapp. Die App führt Nutzerinnen und Nutzer in sechs klaren Schritten zu einer eigenen, dokumentierten Position.»

### 2. Startseite — 0:30 – 1:00

> «Die Startseite zeigt sofort, was die App leistet: «Abstimmungen verstehen, Argumente gewichten, eigene Position finden.» Hier sehe ich den Countdown zur kommenden Abstimmung am 14. Juni 2026 und die anstehenden eidgenössischen Vorlagen — die Nachhaltigkeitsinitiative und die Änderung des Zivildienstgesetzes.
>
> Darunter ist der Workflow erklärt: Verstehen, Abwägen, Gewichten, Speichern.»

### 3. Abstimmung öffnen — 1:00 – 1:45

> «Ich öffne die Nachhaltigkeitsinitiative. Auf der Detailseite sehe ich Datum, Kategorie und ein Datenqualitäts-Badge — die Daten kommen von admin.ch.
>
> Darunter das KI-gestützte Briefing mit Stand-Datum und Originalquelle. Dann der Abschnitt «Argumente»: Pro und Contra direkt nebeneinander, jedes Argument mit eigener Quelle und Datum.»

### 4. Argumente gewichten — 1:45 – 2:30

> «Jetzt der eigentliche Kern: Ich kann jedes Argument auf einer vierstufigen Skala gewichten, 0 für nicht wichtig bis 3 für sehr wichtig. Rechts seht ihr, wie sich die Live-Tendenz verändert — Pro-Punkte, Contra-Punkte und eine Tendenz JA oder NEIN. Das ist keine Empfehlung, sondern eine Spiegelung meiner eigenen Gewichtung.
>
> Diese gewichtete Tendenz übernehme ich direkt in mein Voting-Journal.»

### 5. Position speichern — 2:30 – 3:00

> «Im Abschnitt «Meine Position» wähle ich JA, NEIN oder Unsicher, gebe meine Sicherheit per Slider an, schreibe eine kurze Notiz und speichere. Die Bestätigung erscheint als Toast.
>
> Diese Daten bleiben ausschliesslich in meinem Browser — kein Konto, kein Server-Profil.»

### 6. Partei-Kompass — 3:00 – 3:45

> «Wechsel zum Partei-Kompass. 18 Fragen aus zehn Themenbereichen — Migration, Klima, Wirtschaft, Sicherheit und so weiter. Pro Frage eine 5-Stufen-Skala, Fragen sind überspringbar.
>
> Am Ende sehe ich das Ranking aller sechs Bundesparteien und einen Themen-Breakdown. Die Berechnung ist transparent erklärt.»

### 7. Profil / Voting-Journal — 3:45 – 4:15

> «Im Profil sehe ich alle meine gespeicherten Positionen, das Kompass-Ergebnis und automatisch berechnet, mit welchen Parteien meine bisherigen Stimmen am stärksten übereinstimmen.
>
> Jede Position kann ich nachträglich ändern, eine neue Notiz schreiben oder löschen.»

### 8. Quellen & Medienberichte — 4:15 – 4:35

> «Die Quellen-Seite trennt bewusst: amtliche Originalquellen, Parteipositionen — als Interessenpositionen gekennzeichnet — und Medienberichte mit Filter. So bleibt der Vertrauensgrad transparent.»

### 9. Admin / Datenstruktur — 4:35 – 4:50

> «Kurz die technische Tiefe: Ein passwortgeschützter Admin-Bereich erlaubt CRUD auf Abstimmungen, Argumente und Parteipositionen. Das Dashboard zeigt, ob die App im produktiven MongoDB-Atlas-Modus läuft oder im Fallback-Modus. Für die finale Abgabe müssen in Netlify `MONGODB_URI`, `USE_MOCK_DATA=false` und `ADMIN_PASSWORD` gesetzt sein.
>
> Ich kann hier eine Vorlage oder ein Argument bearbeiten und die Änderung anschliessend auf der öffentlichen Detailseite sehen. Zusätzlich werden Community-Stimmen serverseitig aggregiert, und Interessen-Registrierungen lassen sich im Admin-Bereich als CSV exportieren.»

### 10. KI-Einsatz und Evaluation — 4:50 – 5:00

> «Der KI-Einsatz ist deklariert: Briefings und Code-Boilerplate sind mit KI-Werkzeugen entstanden, alle Inhalte manuell auf Genauigkeit geprüft. Das ist auf der Startseite und auf der Quellen-Seite sichtbar.
>
> Die Usability-Evaluation ist mit anonymisierten Testpersonen geplant. Das vollständige Vorgehen steht im `docs/`-Ordner des Repos. Danke!»

---

## Aufnahme-Checkliste

### Vor der Aufnahme

- [ ] Live-App (oder Netlify-Deployment) bereit.
- [ ] `localStorage` leeren (DevTools → Application → Storage → Clear site data) — sonst werden persönliche Notizen sichtbar.
- [ ] Browser-Tabs schliessen, Lesezeichen-Bar ausblenden (Cmd/Ctrl + Shift + B).
- [ ] Notifications stummschalten, Messenger schliessen.
- [ ] Theme bewusst wählen (oder Wechsel als Element einbauen).
- [ ] Drehbuch ausdrucken oder auf zweitem Monitor öffnen.
- [ ] Mikrofon-Test, Lautstärke prüfen.

### Während der Aufnahme

- [ ] Eine Vorlage konsistent durchführen (Empfehlung: Nachhaltigkeitsinitiative, weil alle Workflow-Schritte gut zeigbar sind).
- [ ] Cursor-Bewegungen ruhig und deutlich.
- [ ] Vor wichtigen Klicks kurz pausieren.
- [ ] Nicht hetzen — lieber etwas zu langsam als gehetzt klingen.

### Nach der Aufnahme

- [ ] Schnitt: Pausen und Versprecher kürzen, optionale Untertitel ergänzen.
- [ ] Export als MP4 in 1080p.
- [ ] Datei sinnvoll benennen, z. B. `voting-assistant_walkthrough.mp4`.
- [ ] Upload auf Moodle und/oder YouTube (unlisted).
- [ ] URL in der README im Repo-Root unter «Video-Walkthrough» eintragen.

---

## TODOs

- [ ] Drehbuch auf finale App-Stand abgleichen, bevor aufgenommen wird.
- [ ] Probelauf machen, Zeit messen, ggf. Sprechertext kürzen.
- [ ] Aufnahme durchführen.
- [ ] Schnitt und Export.
- [ ] Upload und URL ergänzen.

```
Video-URL: <noch nicht aufgenommen — wird nach Upload ergänzt>
```

---

**Zurück zur Übersicht:** [`../README.md`](../README.md)
