# ADR 001: MongoDB mit Fallback

## Status
Accepted

## Kontext
Der Voting Assistant muss Abstimmungsdaten, Argumente, Parteipositionen und administrative Änderungen strukturiert verwalten. Für das ZHAW-Prototyping-Projekt ist gleichzeitig wichtig, dass die Anwendung in Demos robust bleibt, auch wenn eine externe Datenbankverbindung lokal oder im Deployment nicht verfügbar ist.

## Entscheidung
Die App nutzt MongoDB als produktive strukturierte Datenquelle. Die öffentliche Anwendung und der Admin-Bereich greifen über einen Data Layer auf die Daten zu. Für lokale Entwicklung und Demo-Situationen existiert ein Fallback auf vorbereitete Seed- beziehungsweise Mock-Daten.

## Begründung
MongoDB erfüllt die Anforderung, Daten aus einer Datenbank oder strukturierten Datenquelle zu laden. Die Admin- und CRUD-Funktionen ermöglichen das Erstellen und Aktualisieren von Abstimmungen, Argumenten und Parteipositionen. Der Fallback ist für einen Prototyp sinnvoll, weil die Kernfunktionalität auch dann gezeigt werden kann, wenn Environment-Variablen fehlen oder die Datenbank nicht erreichbar ist.

## Konsequenzen
Positiv ist die klare Trennung zwischen Datenzugriff und UI. Die Anwendung bleibt vorführbar und testbar, ohne dass jede lokale Umgebung eine Datenbank benötigt. Der Trade-off ist, dass der Fallback klar dokumentiert sein muss, damit für Review und Bewertung nachvollziehbar bleibt, ob produktive MongoDB-Daten oder lokale Ersatzdaten angezeigt werden.

## Bezug zum Bewertungsraster
- **Kernfunktionalität & technische Qualität:** Datenbankanbindung, Data Layer und Admin-CRUD stützen die technische Mindestanforderung.
- **Nutzerzentrierung & Bedienbarkeit:** Robustere Demos verhindern leere oder fehlerhafte Ansichten.
- **Vorgehen:** Die Entscheidung zeigt bewusstes Risikomanagement im Prototyping.
- **Evaluation:** Der Fallback erleichtert wiederholbare Tests.
- **Erweiterungen / zusätzliche Methoden / Projektorganisation:** Die ADR dokumentiert eine zentrale Architekturentscheidung nachvollziehbar.
