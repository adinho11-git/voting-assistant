# ADR 003: KI-Unterstützung mit Quellenprüfung

## Status
Accepted

## Kontext
Der Voting Assistant verarbeitet politisch sensible Inhalte. Zusammenfassungen, Argumente, UX-Texte und technische Umsetzung müssen verständlich, neutral und überprüfbar bleiben. KI kann im Projekt unterstützen, darf aber keine unkontrollierte Quelle politischer Aussagen werden.

## Entscheidung
KI wird als unterstützendes Werkzeug für Strukturierung, Zusammenfassungen, UX-Verbesserungen, Code-Unterstützung und Dokumentationsarbeit eingesetzt. Grundlage für politische Inhalte bleiben offizielle oder überprüfbare Quellen. Politische Neutralität, Formulierungen und Quellenbezug werden manuell geprüft. Die App und die KI-gestützten Artefakte formulieren keine Wahlempfehlung.

Im Projektkontext wurden insbesondere folgende Werkzeuge genutzt beziehungsweise vorgesehen:

- Claude Code / Claude Opus 4.7
- Codex
- ChatGPT / GPT-5.5

## Begründung
KI beschleunigt Exploration, Prototyping und Qualitätsverbesserung. Gleichzeitig erfordert politische Orientierung besondere Sorgfalt. Die Kombination aus KI-Unterstützung und manueller Quellenprüfung erlaubt produktives Arbeiten, ohne die Verantwortung für Inhalte an ein Modell abzugeben.

## Konsequenzen
Positiv sind schnellere Iterationen, bessere Textvarianten und Unterstützung bei Implementierung und Dokumentation. Der Trade-off ist zusätzlicher Prüfaufwand: KI-Ergebnisse müssen transparent dokumentiert, inhaltlich kontrolliert und bei politisch relevanten Aussagen mit Quellen abgeglichen werden.

## Bezug zum Bewertungsraster
- **Kernfunktionalität & technische Qualität:** KI unterstützt Codequalität und UX-Iteration, ersetzt aber keine Prüfung.
- **Nutzerzentrierung & Bedienbarkeit:** Verständliche Texte und vorsichtige Formulierungen verbessern die Orientierung.
- **Vorgehen:** Der KI-Einsatz ist methodisch reflektiert statt unsichtbar.
- **Evaluation:** Politische Neutralität und Quellenbezug werden manuell kontrolliert.
- **Erweiterungen / zusätzliche Methoden / Projektorganisation:** Der dokumentierte KI-Einsatz ist ein zusätzliches methodisches Artefakt.
