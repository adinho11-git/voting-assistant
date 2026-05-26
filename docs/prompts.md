# Promptvorgehen und KI-Workflows

> Diese Datei ergänzt [`06-ki-einsatz.md`](06-ki-einsatz.md). Sie dokumentiert nicht jeden einzelnen Chatverlauf, sondern die wiederkehrenden Prompt-Muster, Rollen der eingesetzten Werkzeuge und Qualitätssicherungsregeln im Projekt.

---

## Ziel des Promptvorgehens

KI wurde im Projekt als Arbeits- und Sparring-Werkzeug eingesetzt, nicht als Quelle politischer Wahrheit und nicht als Entscheiderin über Konzept, Inhalte oder Bewertung. Die Prompts waren deshalb meistens auf klar abgegrenzte Aufgaben ausgerichtet:

- Code verstehen, prüfen oder gezielt refactoren.
- UI- und UX-Probleme anhand des bestehenden Prototyps analysieren.
- Dokumentationsstruktur gegen das Bewertungsraster prüfen.
- Politische Inhalte sprachlich verdichten, anschliessend manuell mit Quellen abgleichen.
- Abgabe-Risiken, Restpunkte und Widersprüche identifizieren.

## Eingesetzte Werkzeuge

| Werkzeug | Rolle im Promptprozess |
|---|---|
| Claude Code | Längere Codebasis verstehen, Refactoring-Vorschläge, Dokumentationsstruktur, UX-Review |
| Codex | Konkrete Implementierungsschritte, Code-Audits, Dateiänderungen, finale Doku-Konsistenz |
| ChatGPT | Bewertungsraster-Sparring, Prompt-Entwürfe, Priorisierung, UX-Kritik und Reflexion |

## Prompt-Prinzipien

1. **Kontext zuerst:** Prompts enthielten möglichst konkrete Dateien, aktuelle Ziele und Bewertungsbezug.
2. **Kleine Arbeitspakete:** Statt «baue die ganze App» wurden einzelne Komponenten, Dokumente oder Workflows beauftragt.
3. **Quellenpflicht bei politischen Inhalten:** Politische Aussagen durften nur übernommen werden, wenn sie mit admin.ch, bk.admin.ch oder einer klar gekennzeichneten Parteiquelle gegengeprüft wurden.
4. **Keine Wahlempfehlungen:** Prompts verlangten neutrale Sprache wie «Tendenz», «Orientierung» oder «Nähe» statt «Empfehlung».
5. **Manuelle Entscheidung:** Architektur, Inhaltsscope, finale Formulierungen und Abgabeprioritäten wurden vom Entwickler entschieden.

## Repräsentative Prompt-Muster

### Code-Analyse

```text
Analysiere die Stores votes.ts und engagement.ts. Prüfe, ob Positionen doppelt gespeichert werden und wo Inkonsistenzen entstehen können. Schlage einen Refactoring-Pfad vor, ohne das Verhalten für Nutzer:innen zu verändern.
```

Zweck: Risiken in der Client-Persistenz erkennen und den Voting-Journal-Flow stabilisieren.

### Komponenten-Umsetzung

```text
Erstelle eine Svelte-Komponente für Argumentgewichtung. Pro Argument soll eine 0-3-Gewichtung möglich sein. Berechne Pro-Punkte, Contra-Punkte und eine neutrale Live-Tendenz. Speichere die gewichtete Tendenz im lokalen Journal.
```

Zweck: Interaktivität im Hauptworkflow erhöhen und den Bewertungsaspekt «Daten erstellen / aktualisieren» stützen.

### UX-Review

```text
Beurteile die Startseite aus Sicht einer erstmaligen Nutzerin. Wo ist der Hauptworkflow unklar? Welche Inhalte sind redundant? Priorisiere Änderungen nach Wirkung auf Nutzerzentrierung und Bewertungsraster.
```

Zweck: Startseite und Detailseite stärker auf Verstehen, Abwägen, Gewichten und Speichern fokussieren.

### Bewertungsraster-Abgleich

```text
Prüfe README und docs gegen das ZHAW-Prototyping-Raster. Suche nach Widersprüchen, fehlenden Screenshots, ungeklärter Evaluation, KI-Deklaration und offenen Restpunkten. Erstelle eine Must-fix-/Should-fix-Liste.
```

Zweck: Abgabequalität verbessern und falsche oder veraltete Aussagen entfernen.

### Inhaltliche Verdichtung mit Quellenprüfung

```text
Formuliere aus dem amtlichen Vorlagentext ein kurzes neutrales Briefing. Verwende keine politische Wertung, keine Empfehlung und keine Aussage ohne Quellenbezug. Markiere Stellen, die manuell gegen admin.ch geprüft werden müssen.
```

Zweck: Amtliche Texte verständlicher machen, ohne KI als politische Quelle zu verwenden.

## Qualitätssicherung nach KI-Output

Jeder relevante KI-Output wurde vor Übernahme geprüft:

- Stimmen Pfad, Komponente und Import mit der Codebasis überein?
- Ist der Code lokal lauffähig und typkompatibel?
- Werden sensible Daten wie `MONGODB_URI` und `ADMIN_PASSWORD` nicht offengelegt?
- Sind politische Inhalte mit Quellen abgeglichen?
- Ist die Sprache neutral und nicht manipulierend?
- Wird der Prototyp ehrlich als studentische Orientierungshilfe und nicht als offizielle Abstimmungshilfe dargestellt?

## Grenzen

Die Prompt-Dokumentation ist bewusst eine professionelle Zusammenfassung der Arbeitsmuster. Sie enthält keine vollständigen privaten Chatlogs, keine Secrets und keine personenbezogenen Informationen. Für die Abgabe relevanter als Roh-Chats sind die nachvollziehbaren Einsatzbereiche, die manuelle Prüfung und die klare Verantwortung des Entwicklers.

---

**Zurück:** [`06-ki-einsatz.md`](06-ki-einsatz.md)
