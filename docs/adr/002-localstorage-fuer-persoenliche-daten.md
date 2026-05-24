# ADR 002: LocalStorage für persönliche Daten

## Status
Accepted

## Kontext
Der Voting Assistant speichert persönliche Reflexionsdaten wie Voting-Journal, Notizen, Sicherheitswerte, Kompass-Ergebnis und persönliche Positionen. Diese Daten sind sensibel, weil sie politische Präferenzen oder Unsicherheiten ausdrücken können. Für den Prototyp soll kein Benutzerkonto und keine Cloud-Speicherung nötig sein.

## Entscheidung
Persönliche Profildaten werden clientseitig im Browser gespeichert. Dafür nutzt die App LocalStorage-basierte Stores. Es werden keine persönlichen Profil- oder Kompassdaten an einen Server gesendet. Zusätzlich bietet das Profil einen clientseitigen JSON-Export sowie eine Druckansicht über den Browser an.

## Begründung
LocalStorage passt zum Prototyping-Kontext: Die Nutzung ist niedrigschwellig, benötigt keine Registrierung und unterstützt die Aussage „Meine Daten gehören mir“. Die lokale Speicherung reduziert Datenschutzrisiken, weil persönliche Reflexionsdaten nicht zentral gesammelt werden. Der Export ergänzt diese Entscheidung, weil Nutzerinnen und Nutzer ihre lokalen Daten sichern oder prüfen können.

## Konsequenzen
Positiv sind Datenschutzfreundlichkeit, einfache Bedienbarkeit und geringe technische Komplexität. Der Trade-off ist, dass Daten geräte- und browsergebunden sind. Wer Browserdaten löscht oder ein anderes Gerät nutzt, sieht die lokalen Daten nicht automatisch wieder. Deshalb muss die App transparent erklären, dass es sich nicht um ein Konto oder eine Cloud-Synchronisation handelt.

## Bezug zum Bewertungsraster
- **Kernfunktionalität & technische Qualität:** Persistenz der persönlichen Entscheidungen ohne Serverabhängigkeit.
- **Nutzerzentrierung & Bedienbarkeit:** Direkter Zugriff ohne Login senkt die Einstiegshürde.
- **Vorgehen:** Datenschutz wurde als Produktentscheidung früh berücksichtigt.
- **Evaluation:** Exportierte Daten können zur Reflexion und zur Überprüfung des Prototyps verwendet werden.
- **Erweiterungen / zusätzliche Methoden / Projektorganisation:** Der Export ist ein zusätzliches Artefakt zur Datenkontrolle.
