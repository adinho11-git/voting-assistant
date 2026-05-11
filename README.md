# AI Swiss Voting Assistant

Eine mobile Web-App, die Schweizer Stimmberechtigten hilft, Abstimmungsvorlagen schnell und neutral zu verstehen — durch KI-gestützte Zusammenfassungen und eine klare Pro/Contra-Übersicht.

## 🔗 Links

- **Live App**: _[Netlify URL nach Deployment einfügen]_
- **GitHub Repo**: _[GitHub URL einfügen]_

## 🛠 Tech Stack

- **Framework**: SvelteKit 2 + TypeScript
- **Styling**: Tailwind CSS 3
- **Deployment**: Netlify (adapter-netlify)
- **Datenbank**: MongoDB (optional, aktuell: Mock-Daten)

## 🚀 Lokales Setup

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. .env erstellen
cp .env.example .env

# 3. Dev-Server starten
npm run dev
```

Die App läuft standardmässig mit Mock-Daten (`USE_MOCK_DATA=true`). Für echte MongoDB-Verbindung:
1. `MONGODB_URI=mongodb+srv://...` in `.env` eintragen
2. `USE_MOCK_DATA=false` setzen

## 📱 Features (Zwischenstand Übung 11)

### Implementiert (Mindestumfang)
- ✅ **Home Screen** – Hero-Karte mit nächster Abstimmung, Countdown in Tagen
- ✅ **Abstimmungsliste** – Alle Vorlagen mit Suchfunktion und Filter-Tabs
- ✅ **Briefing Screen (Hauptworkflow)** – Split-Screen Pro/Contra mit Parteienraster und KI-Zusammenfassung
- ✅ **Argument-Detail** – Einzelargument mit erweiterter Erklärung, Quellen und Gegenargument-Link
- ✅ **Parteipositionen** – Detailübersicht aller Parteien mit Parlamentsabstimmungsbalken
- ✅ **Quellen & FAQ** – Transparenz-Screen mit Accordion-FAQ
- ✅ **SvelteKit-Komponenten** – AppBar, BottomNav, Badge, AbstimmungCard, ParteiGrid
- ✅ **Persistenz** – Mock-Daten (MongoDB-Integration vorbereitet)
- ✅ **Navigation** – Bottom-Tab-Bar + Push-Navigation
- ✅ **Responsive** – Mobile-first (390px), Desktop-kompatibel

### Geplant (Finale Abgabe)
- 🔲 Echte MongoDB-Anbindung
- 🔲 Merkliste-Funktion (localStorage)
- 🔲 Suchfunktion für vergangene Abstimmungen
- 🔲 Shareable URLs per Abstimmung
- 🔲 Zugänglichkeit (a11y) verbessern

## 🏗 Projektstruktur

```
src/
├── lib/
│   ├── types.ts          # TypeScript-Interfaces
│   ├── mockData.ts       # Mock-Daten (4 Abstimmungen)
│   └── components/       # Wiederverwendbare Komponenten
└── routes/               # SvelteKit-Pages (file-based routing)
    ├── +page.svelte       # Home
    ├── abstimmungen/      # Liste + Detail-Seiten
    └── quellen/           # Quellen & FAQ
```

## 🎓 Kontext

Entwickelt als Prototyp für das Modul **Prototyping** (FS 2026) an der ZHAW School of Management and Law (Klasse WIN24TZb).

**Konzept**: Übung 8 (Ideenfindung) · **Skizze**: Übung 9 (Crazy-8s) · **Mockup**: Übung 10 (Figma) · **Implementierung**: Übung 11

Entwickelt von: **Adi Lama** | ZHAW WIN24TZb | 2026
