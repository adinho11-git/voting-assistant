# ADR 005: Kompass und Argumentgewichtung

## Status
Accepted

## Kontext
Der Voting Assistant soll mehr leisten als reine Informationsanzeige. Nutzerinnen und Nutzer sollen Vorlagen verstehen, Argumente reflektieren und eigene politische Tendenzen vorsichtig einordnen können. Gleichzeitig darf die App keine Wahlempfehlung aussprechen oder eine scheinbar exakte politische Wahrheit behaupten.

## Entscheidung
Die App enthält zwei zentrale Erweiterungen: eine Argumentgewichtung pro Vorlage und einen Partei-Kompass. Die Argumentgewichtung unterstützt die individuelle Reflexion zu Pro- und Contra-Argumenten. Der Partei-Kompass berechnet politische Nähe als Orientierung auf Basis von Quiz-Antworten. Eine 2D-Kompass-Visualisierung ergänzt das Ranking als vereinfachte Modellansicht.

## Begründung
Die Argumentgewichtung macht den Entscheidungsprozess aktiver und nachvollziehbarer. Der Kompass erweitert die App um eine übergreifende Orientierung, ohne auf eine einzelne Abstimmung beschränkt zu sein. Das Ranking bleibt die genauere Auswertung; die 2D-Visualisierung hilft vor allem beim schnellen visuellen Verständnis.

## Konsequenzen
Positiv sind höherer Reflexionsnutzen, mehr Interaktivität und ein klarer Mehrwert gegenüber statischen Informationsseiten. Der Trade-off ist die Gefahr falscher Präzision. Deshalb müssen Kompass, Ranking und Visualisierung vorsichtig erklärt werden: Ergebnisse sind Orientierung, keine Wahl- oder Abstimmungsempfehlung und kein offizielles Parteienmatching.

## Bezug zum Bewertungsraster
- **Kernfunktionalität & technische Qualität:** Interaktive Berechnung und Visualisierung erweitern den Prototyp technisch.
- **Nutzerzentrierung & Bedienbarkeit:** Gewichtung und Kompass helfen, persönliche Unsicherheit sichtbar zu machen.
- **Vorgehen:** Die Erweiterungen zeigen bewusste Produktentscheidungen über den Mindestumfang hinaus.
- **Evaluation:** Die Wirkung der Interaktionen kann in Usability-Tests beobachtet werden.
- **Erweiterungen / zusätzliche Methoden / Projektorganisation:** Kompass, Argumentgewichtung und vorsichtige Ergebnisformulierung sind zentrale zusätzliche Artefakte.
