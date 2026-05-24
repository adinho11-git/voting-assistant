# ADR 004: SvelteKit und Netlify

## Status
Accepted

## Kontext
Der Voting Assistant ist eine interaktive Web-App mit mehreren Bereichen: Abstimmungsbriefings, Parteienseiten, Partei-Kompass, Profil, Admin-Bereich und Quellenübersicht. Die App muss öffentlich zugänglich sein und gleichzeitig lokale Interaktion, Stores und Server-Routen unterstützen.

## Entscheidung
Die Anwendung wird mit SvelteKit umgesetzt und über Netlify deployt. SvelteKit übernimmt Routing, Komponentenstruktur, Stores und serverseitige Routen. Netlify stellt das öffentlich erreichbare Deployment bereit.

## Begründung
SvelteKit passt zur Bewertungsanforderung einer online zugänglichen SvelteKit-App und eignet sich für eine Multi-Page-Anwendung mit interaktiven Komponenten. Netlify unterstützt den Build- und Deployment-Prozess mit dem verwendeten Adapter und ermöglicht ein öffentliches, reproduzierbares Deployment aus dem GitHub-Repository.

## Konsequenzen
Positiv sind klare Projektstruktur, komponentenbasierte Entwicklung und ein einfacher Deployment-Pfad. Der Trade-off ist, dass Environment-Variablen korrekt gesetzt und dokumentiert sein müssen, insbesondere für MongoDB, Admin-Zugang und Datenmodus. Ohne korrekte Konfiguration kann die App in den Fallback-Modus wechseln oder Admin-Funktionen eingeschränkt zeigen.

## Bezug zum Bewertungsraster
- **Kernfunktionalität & technische Qualität:** SvelteKit unterstützt Routing, Stores, Serverlogik und UI-Komponenten.
- **Nutzerzentrierung & Bedienbarkeit:** Schnelle Navigation und interaktive Workflows werden sauber abgebildet.
- **Vorgehen:** Deployment über Netlify macht den Prototyp überprüfbar.
- **Evaluation:** Eine öffentliche URL erleichtert Tests, Review und Video-Nachweis.
- **Erweiterungen / zusätzliche Methoden / Projektorganisation:** Die Deployment-Entscheidung ist dokumentiert und reproduzierbar.
