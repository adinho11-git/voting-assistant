# Phase 1 — Understand / Define

> Ziel dieser Phase: Problemraum schärfen, Zielgruppe verstehen, Annahmen und Risiken explizit machen, bevor entworfen wird.

---

## Projektidee

Der **Voting Assistant** ist eine SvelteKit-Webanwendung, die Stimmberechtigten in der Schweiz hilft, sich vor einer eidgenössischen Abstimmung **strukturiert** ein eigenes Bild zu machen — entlang eines klaren, geführten Workflows von Verstehen über Abwägen und Gewichten bis zu Entscheiden und Speichern.

Anders als reine Newsportale oder Parteiparolen ist der Voting Assistant **prozessorientiert**: Die App stellt nicht primär Informationen aus, sondern führt die Nutzerin / den Nutzer durch eine Reflexion mit eigenen Eingaben (Gewichtung, Sicherheit, Notiz). Die persönliche Position wird im Voting-Journal lokal festgehalten.

## Ausgangslage und Problem

Vier wiederkehrende Beobachtungen vor jeder Abstimmung in der Schweiz:

1. **Reizüberflutung.** Bundesbüchlein, Komitee-Kampagnen, Zeitungsartikel, Social-Media-Beiträge, Parteiparolen — Stimmberechtigte sind mit einer hohen Informationsmenge konfrontiert.
2. **Asymmetrische Quellen.** Komitee-Texte sind naturgemäss einseitig; News-Artikel kuratieren, gewichten aber meist nicht die Argumente einer Vorlage strukturiert nach Pro und Contra.
3. **Fehlende Reflexionsstütze.** Wer wenige Wochen nach der Abstimmung gefragt wird, warum er oder sie so gestimmt hat, kann die eigenen Gründe oft nicht mehr exakt rekonstruieren.
4. **Vertrauensproblem bei Wahl-O-Mat-artigen Apps.** Bestehende Tools wie smartvote sind etabliert, wirken aber für viele Nutzer:innen wie eine Black-Box. Es ist nicht immer klar, wie die Empfehlung zustande kommt.

Das Modul Prototyping verlangt eine SvelteKit-Anwendung mit echtem Workflow, strukturierter Datenquelle und Möglichkeit zum Erstellen / Aktualisieren von Daten. Die Projektidee passt natürlich auf diese Anforderungen, weil sie sowohl interaktiv (Argumentgewichtung, Kompass, Journal) als auch datenintensiv (Vorlagen, Argumente, Parteien) ist.

## Zielgruppe und Persona

**Primäre Zielgruppe:** Stimmberechtigte in der Deutschschweiz zwischen ca. 18 und 45 Jahren, die digital affin sind und sich bewusst eine zweite Meinung bilden möchten, statt einer einzelnen Parteiparole zu folgen.

**Persona — «Lea, 27, Berufseinsteigerin, Zürich»**

| Dimension | Beschreibung |
|---|---|
| Beruf | UX-affine Wirtschaftsinformatikerin in einem KMU |
| Politisches Verhalten | Stimmt bei eidgenössischen Abstimmungen meistens ab, fühlt sich aber bei vielen Vorlagen unter Zeitdruck |
| Informationsquellen heute | Tagesanzeiger-App, NZZ-Newsletter, SRF News, gelegentlich smartvote vor Wahlen |
| Frustration | «Ich lese vier Artikel und habe trotzdem das Gefühl, ich kenne nur eine Seite.» «Beim Abstimmen weiss ich nachher nicht mehr, was eigentlich der Kern war.» |
| Wunsch | Klarer Überblick in wenigen Minuten, beide Seiten sichtbar, eine eigene Notiz, die sie später wiederfindet |
| Endgerät | Hauptsächlich Smartphone, abends auch Laptop |

**Sekundäre Zielgruppe:**

- Erst-Wählende ab 18, die zum ersten Mal eidgenössisch abstimmen.
- Politisch interessierte Personen, die Pro- und Contra-Argumente kompakt nachschlagen möchten.
- Lehrpersonen / Multiplikator:innen, die ein didaktisches Werkzeug suchen.

## Nutzerbedürfnisse

Aus Persona, Recherche und eigenen Beobachtungen abgeleitet:

1. **Schneller, neutraler Einstieg** pro Vorlage in unter drei Minuten.
2. **Beide Seiten gleich sichtbar**, ohne dass eine Partei dominiert.
3. **Quellenbezug**, der nachprüfbar ist und nicht erst gesucht werden muss.
4. **Möglichkeit zur eigenen Gewichtung**, statt einfach JA/NEIN-Empfehlungen zu konsumieren.
5. **Persönliche Notiz**, die später wiederzufinden ist — ohne Konto-Zwang.
6. **Sicherheit, dass die App nicht manipuliert** oder politisch verzerrt ist.
7. **Mobile First**: Die Vorbereitung passiert oft kurz vor dem Abstimmen, unterwegs.
8. **Dark Mode** für die abendliche Nutzung.

## Problem Statement

> **Stimmberechtigte in der Schweiz haben vor jeder eidgenössischen Abstimmung wenig Zeit und viele unterschiedlich gewichtete Informationsquellen. Sie wünschen sich einen strukturierten, neutralen Einstieg, in dem Pro und Contra direkt vergleichbar sind, in dem sie eine eigene Gewichtung vornehmen können und in dem ihre persönliche Position dokumentiert bleibt — ohne Konto, ohne Wahlempfehlung und ohne dass eine Partei oder eine KI ihnen das Urteil abnimmt.**

## How-Might-We-Frage

> **Wie könnten wir Stimmberechtigte in maximal fünf Minuten pro Vorlage zu einer eigenen, dokumentierten Position führen — mit verifizierbaren Quellen, gleichwertig dargestellten Argumenten, einer Möglichkeit zur eigenen Gewichtung und einem persönlichen Reflexionsspeicher, der lokal bleibt?**

## Zentrale Annahmen

Diese Annahmen liegen dem Konzept zugrunde und wurden in der Evaluation überprüft (siehe `docs/05-validate.md`).

| # | Annahme | Konsequenz, wenn falsch |
|---|---|---|
| A1 | Nutzer:innen verstehen einen sechsstufigen Workflow als Hilfe, nicht als Hindernis. | Workflow vereinfachen oder verkürzen. |
| A2 | Eine 4-stufige Gewichtung (0–3) ist ausreichend granular und nicht überfordernd. | Auf 3-stufig reduzieren oder durch reine Drag-Reihung ersetzen. |
| A3 | Eine Live-Tendenz («Du tendierst zu JA») wird als Reflexion, nicht als Empfehlung gelesen. | Tendenz neutraler formulieren oder weglassen. |
| A4 | Lokale Speicherung wird als datenschutzfreundlich akzeptiert, der Verlust beim Gerätewechsel ist tolerierbar. | Optionalen Export / Import ergänzen. |
| A5 | Ein expliziter Disclaimer «Studentischer Prototyp» schafft Vertrauen, ohne abzuschrecken. | Disclaimer-Text anpassen. |
| A6 | Die Trennung amtlich / Parteien / Medien auf der Quellen-Seite hilft bei der Quellen-Einordnung. | Visuelle Trennung stärker hervorheben. |

## Risiken bei politischen Themen

Politische Inhalte verlangen einen besonders sorgfältigen Umgang. Folgende Risiken wurden adressiert:

### 1. Neutralität

- **Risiko:** Auch unbewusste Asymmetrien (mehr Pro- als Contra-Argumente, schärfere Formulierung einer Seite) wirken sich auf die Wahrnehmung aus.
- **Massnahme:** Pro/Contra werden im UI gleichwertig dargestellt, beide Seiten haben dieselben Formulierungsmuster und dieselbe Quellenstruktur. Die App spricht durchgängig von «Tendenz» und «Orientierung», nicht von «Empfehlung».

### 2. Vertrauen

- **Risiko:** Nutzer:innen sind bei politischen Apps zurecht skeptisch. Eine intransparente Berechnung (z.B. Black-Box-Matching) verliert sofort Glaubwürdigkeit.
- **Massnahme:** Alle Berechnungen (Kompass-Matching, Live-Tendenz, Partei-Übereinstimmung) sind in der App in einem ausklappbaren Bereich «Wie wird das berechnet?» erklärt. Datenqualitäts-Badges machen demo-Inhalte sichtbar.

### 3. Quellen

- **Risiko:** Argumente ohne überprüfbare Quelle wirken wie eine Behauptung.
- **Massnahme:** Jedes Argument trägt eine Quelle mit Originallink und Datum (`sourceUrl`, `sourceDate`). Eine eigene Quellen-Seite trennt amtliche Grundlagen, Parteiquellen und Medien.

### 4. Datenschutz

- **Risiko:** Stimm- und Notiz-Daten sind politisch sensibel und nicht kommerziell verwertbar.
- **Massnahme:** Persönliche Daten bleiben im `localStorage`. Auf der Profil-Seite und in der Datenschutz-Notiz im UI wird das explizit gesagt («🔒 Deine Positionen bleiben lokal im Browser»).

### 5. Manipulation

- **Risiko:** Eine politisch geladene App könnte bewusst oder unbewusst zu einer Seite drängen.
- **Massnahme:** Es gibt **keine** algorithmische Empfehlung, **kein** «Du solltest mit X stimmen». Die Live-Tendenz ist eine Spiegelung der eigenen Gewichtung, nicht ein externes Urteil. Eine Empfehlung wird auch im Voting-Journal nicht gegeben.

### 6. Aktualität

- **Risiko:** Politische Inhalte veralten schnell (neue Parolen, neue Argumente, neue Medienlage).
- **Massnahme:** Alle Texte haben ein «Letzter Stand»-Datum, die App benennt den Stand explizit. Im Admin-Bereich können Inhalte aktualisiert werden.

---

**Nächste Phase:** [`02-sketch.md`](02-sketch.md) — Ideen, Varianten, Skizzen.
