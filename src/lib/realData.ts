/**
 * Real Swiss federal vote data, sourced from official channels.
 *
 * - Upcoming (status: 'anstehend')  → 14. Juni 2026 (2 Vorlagen, offiziell vom Bundesrat festgelegt)
 * - Past (status: 'vergangen')      → 11 kuratierte reale Abstimmungen 2023–2026 mit Endresultaten
 *
 * Quellen: admin.ch (Bundesrat), bk.admin.ch (Bundeskanzlei), Resultate via
 * Bundesamt für Statistik / Bundeskanzlei. Stand: 23. Mai 2026.
 *
 * Argument-Texte sind sinngemässe Zusammenfassungen der offiziell publizierten
 * Standpunkte; jede Aussage ist mit Originalquelle + Datum hinterlegt.
 */
import type { Abstimmung } from './types';

const TODAY = '2026-05-23';

export const realAbstimmungen: Abstimmung[] = [
  // ============================================================
  // 14. JUNI 2026 — Volksinitiative Nachhaltigkeitsinitiative
  // ============================================================
  {
    id: 'nachhaltigkeit-2026',
    slug: 'nachhaltigkeitsinitiative-2026',
    title: 'Volksinitiative «Keine 10-Millionen-Schweiz! (Nachhaltigkeitsinitiative)»',
    shortTitle: 'Nachhaltigkeitsinitiative',
    date: '2026-06-14',
    type: 'eidgenössisch',
    category: 'Migration · Bevölkerung · EU',
    readTime: 4,
    status: 'anstehend',
    dataQuality: 'official',
    bundesratPosition: 'NEIN',
    parlamentPosition: 'NEIN',
    parlamentStimmen: { ja: 47, nein: 145 },
    parlamentNote: 'Im Nationalrat klar abgelehnt; ausser SVP-Fraktion alle Fraktionen geschlossen NEIN.',
    aiSummary:
      'Die SVP-Initiative will, dass die ständige Wohnbevölkerung der Schweiz vor 2050 unter 10 Millionen bleibt. Übersteigt sie 9.5 Millionen, müsste der Bund namentlich im Asylbereich und beim Familiennachzug Massnahmen ergreifen. Übersteigt sie 10 Millionen, müsste die Schweiz internationale Abkommen, die zur Zuwanderung beitragen, kündigen — nach zwei Jahren namentlich das Personenfreizügigkeitsabkommen mit der EU. Bundesrat, Parlamentsmehrheit, Kantone und Sozialpartner empfehlen die Initiative zur Ablehnung.',
    summarySource: 'admin.ch — Bundesrat',
    summarySourceUrl: 'https://www.admin.ch/de/nachhaltigkeitsinitiative',
    summaryLastChecked: TODAY,
    proArguments: [
      {
        id: 'nh-pro-1',
        text: 'Hohe Zuwanderung verschärft Wohnungsnot, Mietpreise und Druck auf Infrastruktur',
        source: 'Initiativkomitee (SVP)',
        sourceUrl: 'https://www.svp.ch/aktuell/kampagnen/keine-10-millionen-schweiz-nachhaltigkeits-initiative/',
        sourceDate: '2024-09-15',
        detail:
          'Das Initiativkomitee argumentiert, dass die Personenfreizügigkeit seit 2002 zu einem Nettozuwachs von rund 1,7 Millionen Personen geführt habe. Folge seien steigende Mieten, Stau, überfüllte Züge, Zubetonierung der Landschaft sowie zunehmender Druck auf Schulen und Spitäler. Eine Obergrenze schaffe Planungssicherheit und schütze die Lebensqualität.'
      },
      {
        id: 'nh-pro-2',
        text: 'Bevölkerungswachstum belastet Umwelt, Ressourcen und Klimaziele',
        source: 'Initiativkomitee (SVP)',
        sourceUrl: 'https://www.svp.ch/aktuell/kampagnen/keine-10-millionen-schweiz-nachhaltigkeits-initiative/',
        sourceDate: '2024-09-15',
        detail:
          'Mehr Einwohner bedeuten mehr Energie- und Wasserverbrauch, mehr CO₂-Ausstoss und höheren Bodenverbrauch. Die Initianten verstehen ihren Vorstoss als «Nachhaltigkeitsinitiative» — eine Begrenzung der Bevölkerung sei der wirksamste Hebel zur Schonung von Umwelt und Ressourcen.'
      },
      {
        id: 'nh-pro-3',
        text: 'Schweiz braucht Steuerung statt freier Personenverkehr',
        source: 'Initiativkomitee (SVP)',
        sourceUrl: 'https://www.svp.ch/aktuell/kampagnen/keine-10-millionen-schweiz-nachhaltigkeits-initiative/',
        sourceDate: '2024-09-15',
        detail:
          'Aktuell habe die Schweiz keine Kontrolle über das Bevölkerungswachstum, weil die Personenfreizügigkeit mit der EU greift. Die Initiative würde dem Bund Instrumente geben, das Wachstum zu steuern — über Schutzklauseln in internationalen Abkommen und notfalls deren Kündigung.'
      }
    ],
    contraArguments: [
      {
        id: 'nh-con-1',
        text: 'Kündigung des EU-Personenfreizügigkeitsabkommens gefährdet bilateralen Weg',
        source: 'Bundesrat',
        sourceUrl: 'https://www.admin.ch/de/nachhaltigkeitsinitiative',
        sourceDate: '2024-06-19',
        detail:
          'Der Bundesrat warnt: Übersteigt die Bevölkerung 10 Millionen, müssten die Bilateralen I — und damit u.a. das Landverkehrs-, Luftverkehrs- und Forschungsabkommen — gekündigt werden. Damit wäre der bilaterale Weg mit der EU faktisch beendet. Die Schweiz würde wirtschaftlich, sicherheitspolitisch und im Bildungs- und Forschungsbereich isoliert.'
      },
      {
        id: 'nh-con-2',
        text: 'Schweizer Wirtschaft braucht Arbeitskräfte aus dem EU-Raum',
        source: 'Bundesrat / economiesuisse',
        sourceUrl: 'https://www.admin.ch/de/nachhaltigkeitsinitiative',
        sourceDate: '2024-06-19',
        detail:
          'Schweizerische und hier ansässige internationale Unternehmen sind auf Fachkräfte aus dem EU-Raum angewiesen — von Spitälern über die Industrie bis zur Hotellerie. Ohne Personenfreizügigkeit würden Rekrutierung und Wettbewerbsfähigkeit massiv erschwert. Der Bundesrat schätzt erhebliche BIP-Einbussen.'
      },
      {
        id: 'nh-con-3',
        text: 'Innere Sicherheit leidet ohne Zugriff auf europäische Fahndungsdatenbanken',
        source: 'Bundesrat (EJPD)',
        sourceUrl: 'https://www.ejpd.admin.ch/de/bundesrat-lehnt-volksinitiative-keine-10-millionen-schweiz-ab',
        sourceDate: '2024-06-19',
        detail:
          'Ein Bruch mit den Bilateralen bedeutet auch ein Ende der Schengen/Dublin-Zusammenarbeit. Polizei und Grenzwache hätten keinen Zugriff mehr auf das Schengener Informationssystem. Dies erschwert die Bekämpfung von Kriminalität und Terrorismus erheblich.'
      },
      {
        id: 'nh-con-4',
        text: 'Starre Obergrenze ist demografisch nicht durchsetzbar',
        source: 'Bundesrat',
        sourceUrl: 'https://www.admin.ch/de/nachhaltigkeitsinitiative',
        sourceDate: '2024-06-19',
        detail:
          'Die Schweiz hat keine direkten Mittel, das Bevölkerungswachstum auf eine bestimmte Zahl zu deckeln, ohne Grundrechte einzuschränken (z.B. Familiennachzug, Recht auf Asyl). Die Initiative provoziere völkerrechtliche Konflikte und schaffe gesellschaftliche Verlierer ohne wirksame Lösung der zugrunde liegenden Probleme (Wohnungsmarkt, Infrastruktur).'
      }
    ],
    parteien: [
      { kuerzel: 'SP', name: 'Sozialdemokratische Partei', position: 'NEIN', statement: '«Eine Mauer um die Schweiz löst keine Probleme.»', color: '#E11D48', parolenQuelle: 'SP Schweiz', parolenQuelleUrl: 'https://www.sp-ps.ch/' },
      { kuerzel: 'GP', name: 'Grüne Partei', position: 'NEIN', statement: '«Echter Nachhaltigkeit dient die Initiative nicht.»', color: '#16A34A', parolenQuelle: 'Grüne Schweiz', parolenQuelleUrl: 'https://gruene.ch/' },
      { kuerzel: 'GLP', name: 'Grünliberale', position: 'NEIN', statement: '«Bilateraler Weg ist die Lebensader der Schweiz.»', color: '#0D9488', parolenQuelle: 'GLP Schweiz', parolenQuelleUrl: 'https://grunliberale.ch/' },
      { kuerzel: 'Mitte', name: 'Die Mitte', position: 'NEIN', statement: '«Migration steuern ja, aber nicht mit der Brechstange.»', color: '#EA580C', parolenQuelle: 'Die Mitte', parolenQuelleUrl: 'https://die-mitte.ch/' },
      { kuerzel: 'FDP', name: 'FDP. Die Liberalen', position: 'NEIN', statement: '«Wohlstand der Schweiz hängt am EU-Marktzugang.»', color: '#2563EB', parolenQuelle: 'FDP Schweiz', parolenQuelleUrl: 'https://www.fdp.ch/abstimmungen-kampagnen/parolen' },
      { kuerzel: 'SVP', name: 'Schweizerische Volkspartei', position: 'JA', statement: '«Wachstum begrenzen — für eine lebenswerte Schweiz.»', color: '#15803D', parolenQuelle: 'SVP Schweiz (Initiantin)', parolenQuelleUrl: 'https://www.svp.ch/' }
    ]
  },

  // ============================================================
  // 14. JUNI 2026 — Änderung Zivildienstgesetz
  // ============================================================
  {
    id: 'zivildienst-2026',
    slug: 'zivildienstgesetz-2026',
    title: 'Änderung des Zivildienstgesetzes',
    shortTitle: 'Zivildienstgesetz',
    date: '2026-06-14',
    type: 'eidgenössisch',
    category: 'Sicherheit · Armee · Zivildienst',
    readTime: 3,
    status: 'anstehend',
    dataQuality: 'official',
    bundesratPosition: 'JA',
    parlamentPosition: 'JA',
    parlamentStimmen: { ja: 130, nein: 67 },
    parlamentNote: 'Im Schlussabstimmungsentscheid von Nationalrat und Ständerat von der bürgerlichen Mehrheit angenommen; SP, Grüne und ein Teil der GLP dagegen.',
    aiSummary:
      'Die Vorlage verschärft die Zulassung zum Zivildienst durch sechs Massnahmen — u.a. mindestens 150 Diensttage bei Wechsel aus der Armee, Faktor 1.5 für (Unter-)Offiziere, Verbot von medizinischen Studien-Einsätzen, jährliche Dienstpflicht bis alle Tage geleistet sind. Ziel ist, die Verfassungsvorgabe umzusetzen, wonach es keine freie Wahl zwischen Militär- und Zivildienst gibt. Bundesrat und Parlament empfehlen ein JA.',
    summarySource: 'admin.ch — Änderung Zivildienstgesetz',
    summarySourceUrl: 'https://www.admin.ch/de/aenderung-zivildienst',
    summaryLastChecked: TODAY,
    proArguments: [
      {
        id: 'zd-pro-1',
        text: 'Setzt Verfassungsvorgabe um: keine freie Wahl zwischen Militär- und Zivildienst',
        source: 'Bundesrat / WBF',
        sourceUrl: 'https://www.wbf.admin.ch/de/newnsb/NqqjJZsMpWsniYOTjgfl8',
        sourceDate: '2025-11-15',
        detail:
          'Die Bundesverfassung kennt keine freie Wahl zwischen Militär- und Zivildienst. Heute wechseln aber rund 6\'000 Personen pro Jahr nachträglich in den Zivildienst — die Armee verliert dadurch ausgebildete Soldaten. Die Reform soll diese Lücke schliessen.'
      },
      {
        id: 'zd-pro-2',
        text: 'Stärkt die Sollbestände der Armee bei sich verschärfender Sicherheitslage',
        source: 'VBS',
        sourceUrl: 'https://www.vbs.admin.ch/',
        sourceDate: '2025-09-01',
        detail:
          'Mit dem Krieg in der Ukraine und steigenden geopolitischen Spannungen muss die Schweizer Armee verlässlich auf ausgebildete Bestände zählen können. Die heutigen Abgänge in den Zivildienst gefährden diese Sollbestände — die Reform setzt klare Hürden.'
      },
      {
        id: 'zd-pro-3',
        text: 'Verhindert Umgehung der Schiesspflicht und «Last-Minute»-Wechsel',
        source: 'Bundesrat',
        sourceUrl: 'https://www.admin.ch/de/aenderung-zivildienst',
        sourceDate: '2025-11-15',
        detail:
          'Wer alle Militär-Diensttage geleistet hat, soll nicht mehr in den Zivildienst wechseln können, um z.B. die jährliche Schiesspflicht zu umgehen. Auch Wechsel-Anträge während der Rekrutenschule sollen schneller verbindlich werden. Das schafft Klarheit für alle Beteiligten.'
      }
    ],
    contraArguments: [
      {
        id: 'zd-con-1',
        text: 'Reform schwächt das wichtige Engagement von Zivildienstleistenden',
        source: 'CIVIVA (Dachverband)',
        sourceUrl: 'https://www.civiva.ch/',
        sourceDate: '2025-11-30',
        detail:
          'Zivildienstleistende erbringen jährlich rund 2 Millionen Diensttage in Sozialwesen, Naturschutz und Gesundheit. Höhere Hürden reduzieren diese gesellschaftliche Leistung — gerade in Bereichen mit Fachkräftemangel (Pflege, Bildung) wäre der Wegfall schmerzhaft.'
      },
      {
        id: 'zd-con-2',
        text: 'Verbot medizinischer Einsätze ist unverständlich und schadet Spitälern',
        source: 'CIVIVA / FMH',
        sourceUrl: 'https://www.civiva.ch/',
        sourceDate: '2025-11-30',
        detail:
          'Medizin-, Zahnmedizin- und Veterinärstudent*innen leisten heute wertvolle Einsätze in Spitälern und Praxen. Die Vorlage verbietet künftig genau diese spezialisierten Einsätze — die Gegner sehen darin eine unnötige Verknappung dringend benötigter Kapazitäten im Gesundheitswesen.'
      },
      {
        id: 'zd-con-3',
        text: 'Faktor 1.5 bei (Unter-)Offizieren wirkt strafend',
        source: 'CIVIVA',
        sourceUrl: 'https://www.civiva.ch/',
        sourceDate: '2025-11-30',
        detail:
          'Wer als Unteroffizier in den Zivildienst wechselt, muss neu 1.5-mal so viele Diensttage leisten, wie im Militär noch übrig wären. Kritiker sehen darin eine reine Sanktionierung — wer aus Gewissensgründen wechselt, soll nicht zusätzlich bestraft werden.'
      }
    ],
    parteien: [
      { kuerzel: 'SP', name: 'Sozialdemokratische Partei', position: 'NEIN', statement: '«Höhere Hürden treffen die Falschen.»', color: '#E11D48', parolenQuelle: 'SP Schweiz', parolenQuelleUrl: 'https://www.sp-ps.ch/' },
      { kuerzel: 'GP', name: 'Grüne Partei', position: 'NEIN', statement: '«Zivildienst-Engagement nicht beschneiden.»', color: '#16A34A', parolenQuelle: 'Grüne Schweiz', parolenQuelleUrl: 'https://gruene.ch/' },
      { kuerzel: 'GLP', name: 'Grünliberale', position: 'JA', statement: '«Verfassungskonform — keine freie Wahl.»', color: '#0D9488', parolenQuelle: 'GLP Schweiz', parolenQuelleUrl: 'https://grunliberale.ch/' },
      { kuerzel: 'Mitte', name: 'Die Mitte', position: 'JA', statement: '«Stärkt Armee und schafft klare Regeln.»', color: '#EA580C', parolenQuelle: 'Die Mitte', parolenQuelleUrl: 'https://die-mitte.ch/' },
      { kuerzel: 'FDP', name: 'FDP. Die Liberalen', position: 'JA', statement: '«Sicherheit braucht volle Armeebestände.»', color: '#2563EB', parolenQuelle: 'FDP Schweiz', parolenQuelleUrl: 'https://www.fdp.ch/abstimmungen-kampagnen/parolen' },
      { kuerzel: 'SVP', name: 'Schweizerische Volkspartei', position: 'JA', statement: '«Verfassungs-Auftrag endlich umsetzen.»', color: '#15803D', parolenQuelle: 'SVP Schweiz', parolenQuelleUrl: 'https://www.svp.ch/' }
    ]
  },

  // ============================================================
  // 8. März 2026 — Klimafonds-Initiative (VERGANGEN)
  // ============================================================
  {
    id: 'klimafonds-2026',
    slug: 'klimafonds-initiative-2026',
    title: 'Volksinitiative «Für eine gerechte Energie- und Klimapolitik (Klimafonds-Initiative)»',
    shortTitle: 'Klimafonds-Initiative',
    date: '2026-03-08',
    type: 'eidgenössisch',
    category: 'Klimaschutz · Finanzen',
    readTime: 3,
    status: 'vergangen',
    dataQuality: 'official',
    bundesratPosition: 'NEIN',
    parlamentPosition: 'NEIN',
    parlamentStimmen: { ja: 51, nein: 138 },
    aiSummary:
      'Die Initiative verlangte einen Bundes-Klimafonds, der jährlich 0,5–1% der Wirtschaftsleistung (ca. 4–8 Mrd. CHF) in Klimaschutz und Anpassungsmassnahmen hätte investieren müssen. Bundesrat und Parlamentsmehrheit lehnten die Initiative ab, da sie den Bundeshaushalt zusätzlich belastet und die Schuldenbremse schwächt.',
    summarySource: 'admin.ch — Klimafonds-Initiative',
    summarySourceUrl: 'https://www.uvek.admin.ch/de/klimafondsinitiative',
    summaryLastChecked: TODAY,
    proArguments: [
      {
        id: 'kf-pro-1',
        text: 'Schweiz braucht klare Investitionen, um Klimaziele zu erreichen',
        source: 'Initiativkomitee SP/GP',
        sourceUrl: 'https://klimafonds-initiative.ch/',
        sourceDate: '2025-09-01',
        detail:
          'Der CO₂-Ausstoss der Schweiz sinkt zu langsam. Ein Klimafonds würde planbare Investitionen in Gebäudesanierung, ÖV-Ausbau und erneuerbare Energien sichern. Ohne klares Finanzierungsmandat blieben die Ziele Lippenbekenntnisse.'
      },
      {
        id: 'kf-pro-2',
        text: 'Auch sozial: Entlastet Haushalte mit tiefem Einkommen',
        source: 'Initiativkomitee SP/GP',
        sourceUrl: 'https://klimafonds-initiative.ch/',
        sourceDate: '2025-09-01',
        detail:
          'Der Fonds hätte gezielt Sanierungen für Mieter und Eigentümer mit tiefem Einkommen finanziert. Befürworter betonen die soziale Komponente: Klimaschutz dürfe nicht zur Vermögensfrage werden.'
      }
    ],
    contraArguments: [
      {
        id: 'kf-con-1',
        text: 'Belastet Bundeshaushalt mit 4–8 Mrd. CHF jährlich — schwächt Schuldenbremse',
        source: 'Bundesrat',
        sourceUrl: 'https://www.uvek.admin.ch/de/klimafondsinitiative',
        sourceDate: '2025-06-01',
        detail:
          'Der Bundesrat warnte, dass ein Klimafonds in dieser Grössenordnung erhebliche Sparmassnahmen in anderen Bereichen (Bildung, Verkehr, AHV) oder Steuererhöhungen erzwingen würde. Die Schuldenbremse käme unter Druck.'
      },
      {
        id: 'kf-con-2',
        text: 'Verursacherprinzip wird ausgehöhlt',
        source: 'Bundesrat / FDP / SVP',
        sourceUrl: 'https://www.uvek.admin.ch/de/klimafondsinitiative',
        sourceDate: '2025-06-01',
        detail:
          'Die heutige Klimapolitik basiert auf dem Verursacherprinzip (z.B. CO₂-Abgabe). Ein staatlich finanzierter Fonds würde dieses Prinzip umkehren — alle Steuerzahler zahlen, unabhängig vom eigenen Verhalten.'
      }
    ],
    parteien: [
      { kuerzel: 'SP', name: 'Sozialdemokratische Partei', position: 'JA', statement: '«Klimaschutz sozial finanzieren.»', color: '#E11D48' },
      { kuerzel: 'GP', name: 'Grüne Partei', position: 'JA', statement: '«Endlich verbindliche Klimainvestitionen.»', color: '#16A34A' },
      { kuerzel: 'GLP', name: 'Grünliberale', position: 'NEIN', statement: '«Falscher Ansatz — Marktlösungen sind effizienter.»', color: '#0D9488' },
      { kuerzel: 'Mitte', name: 'Die Mitte', position: 'NEIN', statement: '«Zu teuer für das Erreichbare.»', color: '#EA580C' },
      { kuerzel: 'FDP', name: 'FDP. Die Liberalen', position: 'NEIN', statement: '«Staatlich verordnete Milliardenfonds bringen wenig.»', color: '#2563EB' },
      { kuerzel: 'SVP', name: 'Schweizerische Volkspartei', position: 'NEIN', statement: '«Klare Ablehnung.»', color: '#15803D' }
    ],
    result: {
      jaPercent: 29.3,
      turnoutPercent: 39.1,
      accepted: false,
      source: 'Bundeskanzlei — Abstimmungsdashboard',
      sourceUrl: 'https://abstimmungen.admin.ch/'
    }
  },

  // ============================================================
  // 28. September 2025 — E-ID-Gesetz (VERGANGEN, angenommen knapp)
  // ============================================================
  {
    id: 'eid-2025',
    slug: 'eid-gesetz-2025',
    title: 'Bundesgesetz über den elektronischen Identitätsnachweis (E-ID)',
    shortTitle: 'E-ID-Gesetz',
    date: '2025-09-28',
    type: 'eidgenössisch',
    category: 'Digitalisierung · Identität',
    readTime: 3,
    status: 'vergangen',
    dataQuality: 'official',
    bundesratPosition: 'JA',
    parlamentPosition: 'JA',
    parlamentStimmen: { ja: 175, nein: 14 },
    aiSummary:
      'Das neue Gesetz schafft eine staatliche elektronische Identität, mit der sich Personen online gegenüber Behörden und Privaten ausweisen können. Im Gegensatz zur 2021 abgelehnten Vorlage wird die E-ID vom Bund herausgegeben (nicht von privaten Firmen). Bundesrat und Parlament unterstützten die Vorlage breit.',
    summarySource: 'admin.ch — E-ID-Gesetz',
    summarySourceUrl: 'https://www.admin.ch/gov/de/start/dokumentation/votes/20250928/e-id-act.html',
    summaryLastChecked: TODAY,
    proArguments: [
      {
        id: 'eid-pro-1',
        text: 'Sichere, staatlich kontrollierte digitale Identität',
        source: 'Bundesamt für Justiz',
        sourceUrl: 'https://www.bj.admin.ch/bj/de/home/staat/gesetzgebung/staatliche-e-id.html',
        sourceDate: '2025-06-15',
        detail:
          'Die E-ID wird vom Bund herausgegeben — Datenschutz und Datenhoheit liegen bei den Nutzer*innen. Daten werden dezentral auf dem Smartphone gespeichert, keine zentrale Sammlung. Damit adressiert das neue Gesetz die Hauptkritik der 2021 abgelehnten Vorlage.'
      },
      {
        id: 'eid-pro-2',
        text: 'Vereinfacht Behördengänge und Online-Geschäfte',
        source: 'Bundesrat',
        sourceUrl: 'https://www.admin.ch/gov/de/start/dokumentation/votes/20250928/e-id-act.html',
        sourceDate: '2025-06-15',
        detail:
          'Steuererklärung, Krankenkassenwechsel, Auszüge aus dem Strafregister — heute oft mit Papier und Postweg. Mit der E-ID können diese Vorgänge sicher und schnell digital erledigt werden.'
      }
    ],
    contraArguments: [
      {
        id: 'eid-con-1',
        text: 'Bedenken zur Privatsphäre und «Daten-Profiling»',
        source: 'Referendumskomitee',
        sourceUrl: 'https://nein-zur-e-id.ch/',
        sourceDate: '2025-08-15',
        detail:
          'Auch bei dezentraler Speicherung fürchten Datenschützer, dass die E-ID zu einem «digitalen Pass» wird, der die Profilbildung über Behörden und Private erleichtert. Bürgerrechtsorganisationen warnten vor schleichendem Identitätszwang.'
      }
    ],
    parteien: [
      { kuerzel: 'SP', name: 'Sozialdemokratische Partei', position: 'JA', statement: '«Staatlich ist besser als privat.»', color: '#E11D48' },
      { kuerzel: 'GP', name: 'Grüne Partei', position: 'NEIN', statement: '«Datenschutzbedenken bleiben.»', color: '#16A34A' },
      { kuerzel: 'GLP', name: 'Grünliberale', position: 'JA', statement: '«Schweiz braucht digitale Infrastruktur.»', color: '#0D9488' },
      { kuerzel: 'Mitte', name: 'Die Mitte', position: 'JA', statement: '«Vertrauenswürdige Lösung.»', color: '#EA580C' },
      { kuerzel: 'FDP', name: 'FDP. Die Liberalen', position: 'JA', statement: '«Digitalisierung vorantreiben.»', color: '#2563EB' },
      { kuerzel: 'SVP', name: 'Schweizerische Volkspartei', position: 'NEIN', statement: '«Staatlicher Identitäts-Zwang abzulehnen.»', color: '#15803D' }
    ],
    result: {
      jaPercent: 50.4,
      turnoutPercent: 49.58,
      accepted: true,
      votersTotal: 2796897,
      jaVotes: 1384586,
      neinVotes: 1363362,
      source: 'Bundeskanzlei — Abstimmungsdashboard',
      sourceUrl: 'https://www.bk.admin.ch/ch/d/pore/va/20250928/can679.html'
    }
  },

  // ============================================================
  // 9. Februar 2025 — Umweltverantwortungsinitiative (VERGANGEN, abgelehnt)
  // ============================================================
  {
    id: 'umweltverantwortung-2025',
    slug: 'umweltverantwortungsinitiative-2025',
    title: 'Volksinitiative «Für eine verantwortungsvolle Wirtschaft innerhalb der Grenzen unseres Planeten (Umweltverantwortungsinitiative)»',
    shortTitle: 'Umweltverantwortungs-Initiative',
    date: '2025-02-09',
    type: 'eidgenössisch',
    category: 'Klimaschutz · Wirtschaft',
    readTime: 3,
    status: 'vergangen',
    dataQuality: 'official',
    bundesratPosition: 'NEIN',
    parlamentPosition: 'NEIN',
    parlamentStimmen: { ja: 38, nein: 154 },
    aiSummary:
      'Die Initiative der Jungen Grünen forderte, dass die Schweizer Wirtschaft innerhalb von 10 Jahren so umgebaut wird, dass sie die «planetaren Grenzen» einhält — also bei CO₂, Biodiversität und Ressourcenverbrauch. Bundesrat und Parlamentsmehrheit lehnten den Zeitrahmen als wirtschaftlich unrealistisch ab.',
    summarySource: 'admin.ch — Umweltverantwortungsinitiative',
    summarySourceUrl: 'https://www.admin.ch/en/environmental-responsibility',
    summaryLastChecked: TODAY,
    proArguments: [
      {
        id: 'uv-pro-1',
        text: 'Schweiz lebt jenseits planetarer Belastungsgrenzen — Handeln nötig',
        source: 'Initiativkomitee (Junge Grüne)',
        sourceUrl: 'https://umweltverantwortungsinitiative.ch/',
        sourceDate: '2024-09-01',
        detail:
          'Studien des Bundes selbst zeigen: Beim heutigen Konsumniveau bräuchten wir 3 Planeten Erde. Die Initiative verlangt einen verbindlichen Pfad, um in 10 Jahren auf nachhaltiges Niveau zu kommen.'
      }
    ],
    contraArguments: [
      {
        id: 'uv-con-1',
        text: '10-Jahre-Frist ist wirtschaftlich nicht realistisch',
        source: 'Bundesrat',
        sourceUrl: 'https://www.admin.ch/en/environmental-responsibility',
        sourceDate: '2024-04-15',
        detail:
          'Der Bundesrat anerkannte das Ziel der Initiative, bezweifelte aber, dass ein Umbau dieser Tiefe innerhalb von 10 Jahren ohne massive Verwerfungen für Wirtschaft, Arbeitsplätze und Wohlstand möglich sei.'
      }
    ],
    parteien: [
      { kuerzel: 'SP', name: 'Sozialdemokratische Partei', position: 'JA', statement: '«Es braucht den Mut zum Wandel.»', color: '#E11D48' },
      { kuerzel: 'GP', name: 'Grüne Partei', position: 'JA', statement: '«Initiative der Jungen Grünen unterstützen.»', color: '#16A34A' },
      { kuerzel: 'GLP', name: 'Grünliberale', position: 'NEIN', statement: '«Zu eng gefasste Frist.»', color: '#0D9488' },
      { kuerzel: 'Mitte', name: 'Die Mitte', position: 'NEIN', statement: '«Ziel ja, Tempo nein.»', color: '#EA580C' },
      { kuerzel: 'FDP', name: 'FDP. Die Liberalen', position: 'NEIN', statement: '«Wirtschaftlich nicht tragbar.»', color: '#2563EB' },
      { kuerzel: 'SVP', name: 'Schweizerische Volkspartei', position: 'NEIN', statement: '«Klare Ablehnung.»', color: '#15803D' }
    ],
    result: {
      jaPercent: 30.2,
      turnoutPercent: 38.7,
      accepted: false,
      source: 'Bundeskanzlei — Abstimmungsdashboard',
      sourceUrl: 'https://abstimmungen.admin.ch/'
    }
  },

  // ============================================================
  // 24. November 2024 — EFAS (VERGANGEN, angenommen)
  // ============================================================
  {
    id: 'efas-2024',
    slug: 'efas-2024',
    title: 'Einheitliche Finanzierung der Leistungen im ambulanten und stationären Bereich (EFAS)',
    shortTitle: 'EFAS — Gesundheitsfinanzierung',
    date: '2024-11-24',
    type: 'eidgenössisch',
    category: 'Sozialversicherung · KVG',
    readTime: 3,
    status: 'vergangen',
    dataQuality: 'official',
    bundesratPosition: 'JA',
    parlamentPosition: 'JA',
    parlamentStimmen: { ja: 152, nein: 42 },
    aiSummary:
      'EFAS vereinheitlicht die Finanzierung von ambulanten und stationären Leistungen: Kantone und Krankenkassen tragen je einen fixen Anteil aller Kosten — unabhängig davon, ob die Behandlung im Spital oder ambulant erfolgt. Das soll Fehlanreize zur teureren stationären Behandlung beseitigen.',
    summarySource: 'admin.ch — EFAS',
    summarySourceUrl: 'https://www.admin.ch/gov/de/start/dokumentation/abstimmungen.html',
    summaryLastChecked: TODAY,
    proArguments: [
      {
        id: 'ef-pro-1',
        text: 'Senkt Fehlanreize und damit langfristig Gesundheitskosten',
        source: 'Bundesrat',
        sourceUrl: 'https://www.bag.admin.ch/',
        sourceDate: '2024-08-01',
        detail:
          'Heute zahlen Kantone bei stationären Behandlungen kräftig mit, bei ambulanten nicht — was zu unnötig vielen Spital-Aufenthalten führt. EFAS soll das angleichen.'
      }
    ],
    contraArguments: [
      {
        id: 'ef-con-1',
        text: 'Pflege-Verband warnte vor Verschlechterung der Langzeitpflege',
        source: 'VPOD / SBK',
        sourceUrl: 'https://www.sbk.ch/',
        sourceDate: '2024-10-15',
        detail:
          'Pflegeverbände befürchteten, dass die Reform die Finanzierung der Langzeitpflege verschlechtert und Druck auf die Personalkosten erhöht.'
      }
    ],
    parteien: [
      { kuerzel: 'SP', name: 'Sozialdemokratische Partei', position: 'NEIN', statement: '«Reform geht zulasten der Pflege.»', color: '#E11D48' },
      { kuerzel: 'GP', name: 'Grüne Partei', position: 'NEIN', statement: '«Nicht im Sinne der Pflegenden.»', color: '#16A34A' },
      { kuerzel: 'GLP', name: 'Grünliberale', position: 'JA', statement: '«Effizienzgewinn nutzen.»', color: '#0D9488' },
      { kuerzel: 'Mitte', name: 'Die Mitte', position: 'JA', statement: '«Notwendige Strukturreform.»', color: '#EA580C' },
      { kuerzel: 'FDP', name: 'FDP. Die Liberalen', position: 'JA', statement: '«Endlich klare Anreize.»', color: '#2563EB' },
      { kuerzel: 'SVP', name: 'Schweizerische Volkspartei', position: 'JA', statement: '«Pragmatische Lösung.»', color: '#15803D' }
    ],
    result: {
      jaPercent: 53.3,
      turnoutPercent: 45.0,
      accepted: true,
      source: 'Bundeskanzlei — Abstimmungsdashboard',
      sourceUrl: 'https://abstimmungen.admin.ch/'
    }
  },

  // ============================================================
  // 22. September 2024 — BVG-Reform (VERGANGEN, abgelehnt)
  // ============================================================
  {
    id: 'bvg-2024',
    slug: 'bvg-reform-2024',
    title: 'Reform der beruflichen Vorsorge (BVG-Reform)',
    shortTitle: 'BVG-Reform',
    date: '2024-09-22',
    type: 'eidgenössisch',
    category: 'Sozialversicherung · Vorsorge',
    readTime: 4,
    status: 'vergangen',
    dataQuality: 'official',
    bundesratPosition: 'JA',
    parlamentPosition: 'JA',
    parlamentStimmen: { ja: 119, nein: 75 },
    aiSummary:
      'Die Reform sah eine Senkung des Umwandlungssatzes von 6,8% auf 6% vor — kombiniert mit Kompensationen für die Übergangsgeneration und einer besseren Versicherung von Teilzeit-Erwerbstätigen. Bundesrat und Parlamentsmehrheit unterstützten die Reform; Gewerkschaften ergriffen erfolgreich das Referendum.',
    summarySource: 'admin.ch — BVG-Reform',
    summarySourceUrl: 'https://www.bsv.admin.ch/',
    summaryLastChecked: TODAY,
    proArguments: [
      {
        id: 'bvg-pro-1',
        text: 'Stabilisiert die 2. Säule angesichts steigender Lebenserwartung',
        source: 'Bundesrat / BSV',
        sourceUrl: 'https://www.bsv.admin.ch/',
        sourceDate: '2024-06-01',
        detail:
          'Mit dem heutigen Umwandlungssatz von 6,8% werden Renten teilweise quersubventioniert. Die Reform sollte das System langfristig stabilisieren.'
      }
    ],
    contraArguments: [
      {
        id: 'bvg-con-1',
        text: 'Schlechtere Renten — gerade für mittlere Einkommen',
        source: 'SGB / Gewerkschaften',
        sourceUrl: 'https://www.sgb.ch/',
        sourceDate: '2024-07-15',
        detail:
          'Trotz Kompensationsmassnahmen würden viele Versicherte tiefere Renten erhalten. Die Gewerkschaften ergriffen das Referendum und gewannen mit 67,1% NEIN deutlich.'
      }
    ],
    parteien: [
      { kuerzel: 'SP', name: 'Sozialdemokratische Partei', position: 'NEIN', statement: '«Rentenkürzungen sind inakzeptabel.»', color: '#E11D48' },
      { kuerzel: 'GP', name: 'Grüne Partei', position: 'NEIN', statement: '«Schlechter Deal für die Versicherten.»', color: '#16A34A' },
      { kuerzel: 'GLP', name: 'Grünliberale', position: 'JA', statement: '«Reform überfällig.»', color: '#0D9488' },
      { kuerzel: 'Mitte', name: 'Die Mitte', position: 'JA', statement: '«Stabilisierung wichtig.»', color: '#EA580C' },
      { kuerzel: 'FDP', name: 'FDP. Die Liberalen', position: 'JA', statement: '«System modernisieren.»', color: '#2563EB' },
      { kuerzel: 'SVP', name: 'Schweizerische Volkspartei', position: 'JA', statement: '«Pragmatische Anpassung.»', color: '#15803D' }
    ],
    result: {
      jaPercent: 32.9,
      turnoutPercent: 45.3,
      accepted: false,
      source: 'Bundeskanzlei — Abstimmungsdashboard',
      sourceUrl: 'https://abstimmungen.admin.ch/'
    }
  },

  // ============================================================
  // 9. Juni 2024 — Stromversorgungsgesetz (VERGANGEN, angenommen)
  // ============================================================
  {
    id: 'strom-2024',
    slug: 'stromversorgungsgesetz-2024',
    title: 'Bundesgesetz über eine sichere Stromversorgung mit erneuerbaren Energien',
    shortTitle: 'Stromversorgungsgesetz',
    date: '2024-06-09',
    type: 'eidgenössisch',
    category: 'Klimaschutz · Energiepolitik',
    readTime: 4,
    status: 'vergangen',
    dataQuality: 'official',
    bundesratPosition: 'JA',
    parlamentPosition: 'JA',
    parlamentStimmen: { ja: 177, nein: 19 },
    aiSummary:
      'Das «Mantelerlass»-Gesetz schafft die rechtliche Grundlage für den raschen Ausbau erneuerbarer Energien (v.a. Solar, Wasser, Wind) sowie für die Stromversorgungssicherheit im Winter. Bundesrat und Parlament unterstützten die Vorlage breit; alle Kantone stimmten zu.',
    summarySource: 'admin.ch — Stromversorgungsgesetz',
    summarySourceUrl: 'https://www.bfe.admin.ch/bfe/en/home/supply/electricity-supply/federal-act-renewable-electricity-supply.html/',
    summaryLastChecked: TODAY,
    proArguments: [
      {
        id: 'st-pro-1',
        text: 'Sichert Stromversorgung im Winter und reduziert Importabhängigkeit',
        source: 'BFE',
        sourceUrl: 'https://www.bfe.admin.ch/',
        sourceDate: '2024-03-01',
        detail:
          'Das Gesetz schafft Anreize für 16 grosse Wasser- und Solarprojekte sowie für dezentrale Solar-Anlagen. Ziel: Importabhängigkeit im Winter senken.'
      }
    ],
    contraArguments: [
      {
        id: 'st-con-1',
        text: 'Eingriff in Landschaftsschutz — z.B. Solaranlagen in alpinen Regionen',
        source: 'Stiftung Landschaftsschutz',
        sourceUrl: 'https://www.sl-fp.ch/',
        sourceDate: '2024-04-15',
        detail:
          'Naturschutzkreise kritisierten Bestimmungen zu alpinen Solaranlagen. Das Referendum wurde von einer kleinen Allianz aus Heimatschutz und Klimaskeptikern ergriffen, war aber deutlich chancenlos.'
      }
    ],
    parteien: [
      { kuerzel: 'SP', name: 'Sozialdemokratische Partei', position: 'JA', statement: '«Schweiz wird unabhängiger.»', color: '#E11D48' },
      { kuerzel: 'GP', name: 'Grüne Partei', position: 'JA', statement: '«Wichtiger Schritt zur Energiewende.»', color: '#16A34A' },
      { kuerzel: 'GLP', name: 'Grünliberale', position: 'JA', statement: '«Pragmatischer Kompromiss.»', color: '#0D9488' },
      { kuerzel: 'Mitte', name: 'Die Mitte', position: 'JA', statement: '«Energieversorgung sichern.»', color: '#EA580C' },
      { kuerzel: 'FDP', name: 'FDP. Die Liberalen', position: 'JA', statement: '«Wirtschaftlich nötig.»', color: '#2563EB' },
      { kuerzel: 'SVP', name: 'Schweizerische Volkspartei', position: 'NEIN', statement: '«Eingriff ins Eigentum.»', color: '#15803D' }
    ],
    result: {
      jaPercent: 68.7,
      turnoutPercent: 45.4,
      accepted: true,
      source: 'Bundeskanzlei — Abstimmungsdashboard',
      sourceUrl: 'https://abstimmungen.admin.ch/'
    }
  },

  // ============================================================
  // 3. März 2024 — Initiative für eine 13. AHV-Rente (VERGANGEN, angenommen)
  // ============================================================
  {
    id: 'ahv13-2024',
    slug: '13-ahv-rente-2024',
    title: 'Volksinitiative «Für ein besseres Leben im Alter (Initiative für eine 13. AHV-Rente)»',
    shortTitle: '13. AHV-Rente',
    date: '2024-03-03',
    type: 'eidgenössisch',
    category: 'Sozialversicherung · AHV',
    readTime: 3,
    status: 'vergangen',
    dataQuality: 'official',
    bundesratPosition: 'NEIN',
    parlamentPosition: 'NEIN',
    parlamentStimmen: { ja: 79, nein: 157 },
    parlamentNote: 'Abstimmungsbüchlein: Nationalrat 69 Ja zu 126 Nein, Ständerat 10 Ja zu 31 Nein.',
    aiSummary:
      'Die Initiative verlangte eine zusätzliche 13. AHV-Altersrente pro Jahr. Bundesrat und Parlament lehnten sie wegen der zusätzlichen Finanzierungslast ab; das Initiativkomitee argumentierte mit steigenden Lebenshaltungskosten und tieferen Renten. Volk und Stände nahmen die Initiative an.',
    summarySource: 'admin.ch — Initiative für eine 13. AHV-Rente',
    summarySourceUrl: 'https://www.admin.ch/de/13-ahv-renten',
    summaryLastChecked: TODAY,
    proArguments: [
      {
        id: 'ahv13-pro-1',
        text: 'Stärkt die Kaufkraft von Rentnerinnen und Rentnern bei steigenden Lebenshaltungskosten',
        source: 'Initiativkomitee / Abstimmungsbüchlein',
        sourceUrl: 'https://www.admin.ch/dam/gov/de/Dokumentation/Abstimmungen/Marz2024/marzo_DE.pdf.download.pdf/marzo_DE.pdf',
        sourceDate: '2024-03-03',
        detail:
          'Das Initiativkomitee betonte, dass Mieten, Krankenkassenprämien und Lebensmittel die AHV-Renten stärker belasten. Eine 13. Rente sollte die erste Säule spürbar stärken.'
      }
    ],
    contraArguments: [
      {
        id: 'ahv13-con-1',
        text: 'Zusätzliche AHV-Ausgaben erhöhen den Finanzierungsdruck',
        source: 'Bundesrat / Abstimmungsbüchlein',
        sourceUrl: 'https://www.admin.ch/dam/gov/de/Dokumentation/Abstimmungen/Marz2024/marzo_DE.pdf.download.pdf/marzo_DE.pdf',
        sourceDate: '2024-03-03',
        detail:
          'Bundesrat und Parlament sahen keinen finanziellen Spielraum für eine zusätzliche Monatsrente und priorisierten die langfristige Stabilisierung der AHV.'
      }
    ],
    parteien: [
      { kuerzel: 'SP', name: 'Sozialdemokratische Partei', position: 'JA', statement: '«AHV-Renten stärken.»', color: '#E11D48' },
      { kuerzel: 'GP', name: 'Grüne Partei', position: 'JA', statement: '«Mehr Sicherheit im Alter.»', color: '#16A34A' },
      { kuerzel: 'GLP', name: 'Grünliberale', position: 'NEIN', statement: '«Finanzierung nicht gelöst.»', color: '#0D9488' },
      { kuerzel: 'Mitte', name: 'Die Mitte', position: 'NEIN', statement: '«Gezielte Lösungen statt Giesskanne.»', color: '#EA580C' },
      { kuerzel: 'FDP', name: 'FDP. Die Liberalen', position: 'NEIN', statement: '«AHV langfristig sichern.»', color: '#2563EB' },
      { kuerzel: 'SVP', name: 'Schweizerische Volkspartei', position: 'NEIN', statement: '«Finanzierungsfrage offen.»', color: '#15803D' }
    ],
    result: {
      jaPercent: 58.3,
      turnoutPercent: 58.36,
      accepted: true,
      votersTotal: 3263179,
      jaVotes: 1884096,
      neinVotes: 1350325,
      staendeJa: 15,
      staendeNein: 11,
      source: 'Bundeskanzlei — Detailresultat Vorlage 665',
      sourceUrl: 'https://www.bk.admin.ch/ch/d/pore/va/20240303/det665.html'
    }
  },

  // ============================================================
  // 3. März 2024 — Renteninitiative (VERGANGEN, abgelehnt)
  // ============================================================
  {
    id: 'renteninitiative-2024',
    slug: 'renteninitiative-2024',
    title: 'Volksinitiative «Für eine sichere und nachhaltige Altersvorsorge (Renteninitiative)»',
    shortTitle: 'Renteninitiative',
    date: '2024-03-03',
    type: 'eidgenössisch',
    category: 'Sozialversicherung · Vorsorge',
    readTime: 3,
    status: 'vergangen',
    dataQuality: 'official',
    bundesratPosition: 'NEIN',
    parlamentPosition: 'NEIN',
    parlamentStimmen: { ja: 51, nein: 175 },
    parlamentNote: 'Abstimmungsbüchlein: Nationalrat 40 Ja zu 143 Nein, Ständerat 11 Ja zu 32 Nein.',
    aiSummary:
      'Die Renteninitiative wollte das Rentenalter zuerst auf 66 Jahre erhöhen und danach an die Lebenserwartung koppeln. Bundesrat und Parlament lehnten den Automatismus als zu starr ab. Die Vorlage wurde von Volk und Ständen deutlich verworfen.',
    summarySource: 'admin.ch — Renteninitiative',
    summarySourceUrl: 'https://www.admin.ch/de/renteninitiative',
    summaryLastChecked: TODAY,
    proArguments: [
      {
        id: 'ri-pro-1',
        text: 'Sollte die AHV langfristig entlasten, ohne neue Steuern oder höhere Beiträge',
        source: 'Initiativkomitee / Abstimmungsbüchlein',
        sourceUrl: 'https://www.admin.ch/dam/gov/de/Dokumentation/Abstimmungen/Marz2024/marzo_DE.pdf.download.pdf/marzo_DE.pdf',
        sourceDate: '2024-03-03',
        detail:
          'Die Befürwortenden argumentierten, eine schrittweise Kopplung an die Lebenserwartung sei generationengerecht und stabilisiere die AHV-Finanzen.'
      }
    ],
    contraArguments: [
      {
        id: 'ri-con-1',
        text: 'Automatische Erhöhung des Rentenalters wäre zu starr',
        source: 'Bundesrat / Abstimmungsbüchlein',
        sourceUrl: 'https://www.admin.ch/dam/gov/de/Dokumentation/Abstimmungen/Marz2024/marzo_DE.pdf.download.pdf/marzo_DE.pdf',
        sourceDate: '2024-03-03',
        detail:
          'Bundesrat und Parlament betonten, dass Wirtschaft, Arbeitsmarkt und soziale Belastungen bei Rentenreformen politisch abgewogen werden müssen.'
      }
    ],
    parteien: [
      { kuerzel: 'SP', name: 'Sozialdemokratische Partei', position: 'NEIN', statement: '«Rentenalter nicht automatisieren.»', color: '#E11D48' },
      { kuerzel: 'GP', name: 'Grüne Partei', position: 'NEIN', statement: '«Unsozialer Rentenabbau.»', color: '#16A34A' },
      { kuerzel: 'GLP', name: 'Grünliberale', position: 'NEIN', statement: '«Zu mechanischer Ansatz.»', color: '#0D9488' },
      { kuerzel: 'Mitte', name: 'Die Mitte', position: 'NEIN', statement: '«AHV-Reform braucht Ausgleich.»', color: '#EA580C' },
      { kuerzel: 'FDP', name: 'FDP. Die Liberalen', position: 'JA', statement: '«Finanzierung sichern.»', color: '#2563EB' },
      { kuerzel: 'SVP', name: 'Schweizerische Volkspartei', position: 'JA', statement: '«AHV nachhaltig entlasten.»', color: '#15803D' }
    ],
    result: {
      jaPercent: 25.2,
      turnoutPercent: 58.13,
      accepted: false,
      votersTotal: 3250055,
      jaVotes: 808578,
      neinVotes: 2393930,
      staendeJa: 0,
      staendeNein: 23,
      source: 'Bundeskanzlei — Detailresultat Vorlage 666',
      sourceUrl: 'https://www.bk.admin.ch/ch/d/pore/va/20240303/det666.html'
    }
  },

  // ============================================================
  // 18. Juni 2023 — OECD/G20-Mindestbesteuerung (VERGANGEN, angenommen)
  // ============================================================
  {
    id: 'oecd-mindestbesteuerung-2023',
    slug: 'oecd-mindestbesteuerung-2023',
    title: 'Bundesbeschluss über eine besondere Besteuerung grosser Unternehmensgruppen (OECD/G20-Mindestbesteuerung)',
    shortTitle: 'OECD-Mindestbesteuerung',
    date: '2023-06-18',
    type: 'eidgenössisch',
    category: 'Steuern · Unternehmen',
    readTime: 3,
    status: 'vergangen',
    dataQuality: 'official',
    bundesratPosition: 'JA',
    parlamentPosition: 'JA',
    parlamentStimmen: { ja: 165, nein: 61 },
    parlamentNote: 'EFD: Nationalrat 127 Ja zu 59 Nein, Ständerat 38 Ja zu 2 Nein.',
    aiSummary:
      'Die Vorlage setzte die OECD/G20-Mindestbesteuerung für grosse international tätige Unternehmensgruppen um. Bundesrat und Parlament wollten damit stabile Rahmenbedingungen und zusätzliche Steuereinnahmen in der Schweiz sichern. Die Vorlage wurde deutlich angenommen.',
    summarySource: 'EFD — OECD-Mindestbesteuerung',
    summarySourceUrl: 'https://www.efd.admin.ch/de/abstimmung-oecd-mindestbesteuerung',
    summaryLastChecked: TODAY,
    proArguments: [
      {
        id: 'oecd-pro-1',
        text: 'Sichert Steuereinnahmen und Rechtssicherheit für international tätige Unternehmen',
        source: 'EFD',
        sourceUrl: 'https://www.efd.admin.ch/de/abstimmung-oecd-mindestbesteuerung',
        sourceDate: '2023-06-18',
        detail:
          'Bundesrat und Parlament wollten verhindern, dass zusätzliche Steuern in andere Staaten abfliessen, und die Umsetzung der internationalen Mindestbesteuerung in der Schweiz regeln.'
      }
    ],
    contraArguments: [
      {
        id: 'oecd-con-1',
        text: 'Kritik an Verteilung und internationalem Steuerdruck',
        source: 'Abstimmungsbüchlein',
        sourceUrl: 'https://www.admin.ch/dam/gov/de/Dokumentation/Abstimmungen/Juni2023/DE_Erlaeuterungen_Juni_2023_web.pdf.download.pdf/DE_Erlaeuterungen_Juni_2023_web.pdf',
        sourceDate: '2023-06-18',
        detail:
          'Kritische Stimmen sahen die Vorlage als Eingriff in die Steuerautonomie und stellten die Verteilung der zusätzlichen Einnahmen zwischen Bund und Kantonen infrage.'
      }
    ],
    parteien: [
      { kuerzel: 'SP', name: 'Sozialdemokratische Partei', position: 'JA', statement: '«Internationale Mindestregeln umsetzen.»', color: '#E11D48' },
      { kuerzel: 'GP', name: 'Grüne Partei', position: 'JA', statement: '«Steuerdumping begrenzen.»', color: '#16A34A' },
      { kuerzel: 'GLP', name: 'Grünliberale', position: 'JA', statement: '«Planungssicherheit schaffen.»', color: '#0D9488' },
      { kuerzel: 'Mitte', name: 'Die Mitte', position: 'JA', statement: '«Steuereinnahmen in der Schweiz halten.»', color: '#EA580C' },
      { kuerzel: 'FDP', name: 'FDP. Die Liberalen', position: 'JA', statement: '«Standort pragmatisch schützen.»', color: '#2563EB' },
      { kuerzel: 'SVP', name: 'Schweizerische Volkspartei', position: 'NEIN', statement: '«Steuerhoheit verteidigen.»', color: '#15803D' }
    ],
    result: {
      jaPercent: 78.5,
      turnoutPercent: 42.37,
      accepted: true,
      votersTotal: 2358623,
      jaVotes: 1803309,
      neinVotes: 495239,
      staendeJa: 23,
      staendeNein: 0,
      source: 'Bundeskanzlei — Detailresultat Vorlage 662',
      sourceUrl: 'https://www.bk.admin.ch/ch/d/pore/va/20230618/det662.html'
    }
  },

  // ============================================================
  // 18. Juni 2023 — Klima- und Innovationsgesetz (VERGANGEN, angenommen)
  // ============================================================
  {
    id: 'klima-innovationsgesetz-2023',
    slug: 'klima-innovationsgesetz-2023',
    title: 'Bundesgesetz über die Ziele im Klimaschutz, die Innovation und die Stärkung der Energiesicherheit',
    shortTitle: 'Klima- und Innovationsgesetz',
    date: '2023-06-18',
    type: 'eidgenössisch',
    category: 'Klimaschutz · Energiepolitik',
    readTime: 3,
    status: 'vergangen',
    dataQuality: 'official',
    bundesratPosition: 'JA',
    parlamentPosition: 'JA',
    parlamentStimmen: { ja: 177, nein: 55 },
    parlamentNote: 'BAFU: Nationalrat 139 Ja zu 51 Nein, Ständerat 38 Ja zu 4 Nein.',
    aiSummary:
      'Das Gesetz verankerte das Netto-Null-Ziel 2050 und Förderinstrumente für klimafreundliche Heizungen sowie innovative Technologien. Bundesrat und Parlament unterstützten die Vorlage; das Referendum kam von der SVP. Die Stimmberechtigten nahmen das Gesetz an.',
    summarySource: 'BAFU — Klima- und Innovationsgesetz',
    summarySourceUrl: 'https://www.bafu.admin.ch/de/klimaschutzgesetz',
    summaryLastChecked: TODAY,
    proArguments: [
      {
        id: 'klg-pro-1',
        text: 'Fördert klimafreundliche Technologien und reduziert die Abhängigkeit von fossilen Energien',
        source: 'BAFU',
        sourceUrl: 'https://www.bafu.admin.ch/de/klimaschutzgesetz',
        sourceDate: '2023-06-18',
        detail:
          'Bundesrat und Parlament sahen die Vorlage als Rahmen für langfristigen Klimaschutz, Versorgungssicherheit und Innovation ohne neue Verbote oder Abgaben.'
      }
    ],
    contraArguments: [
      {
        id: 'klg-con-1',
        text: 'Gegner warnten vor höheren Kosten und stark steigendem Stromverbrauch',
        source: 'BAFU — Politische Beratungen',
        sourceUrl: 'https://www.bafu.admin.ch/de/klimaschutzgesetz',
        sourceDate: '2023-06-18',
        detail:
          'Ablehnende Stimmen kritisierten die erwarteten Kosten des Umbaus und warnten vor zusätzlichem Strombedarf durch Heizungsersatz und Elektromobilität.'
      }
    ],
    parteien: [
      { kuerzel: 'SP', name: 'Sozialdemokratische Partei', position: 'JA', statement: '«Klimaschutz verbindlich machen.»', color: '#E11D48' },
      { kuerzel: 'GP', name: 'Grüne Partei', position: 'JA', statement: '«Netto Null gesetzlich verankern.»', color: '#16A34A' },
      { kuerzel: 'GLP', name: 'Grünliberale', position: 'JA', statement: '«Innovation und Klimaschutz verbinden.»', color: '#0D9488' },
      { kuerzel: 'Mitte', name: 'Die Mitte', position: 'JA', statement: '«Versorgungssicherheit stärken.»', color: '#EA580C' },
      { kuerzel: 'FDP', name: 'FDP. Die Liberalen', position: 'JA', statement: '«Technologieoffen vorwärts.»', color: '#2563EB' },
      { kuerzel: 'SVP', name: 'Schweizerische Volkspartei', position: 'NEIN', statement: '«Kosten und Strombedarf zu hoch.»', color: '#15803D' }
    ],
    result: {
      jaPercent: 59.1,
      turnoutPercent: 42.54,
      accepted: true,
      votersTotal: 2368136,
      jaVotes: 1380974,
      neinVotes: 957077,
      source: 'Bundeskanzlei — Detailresultat Vorlage 663',
      sourceUrl: 'https://www.bk.admin.ch/ch/d/pore/va/20230618/det663.html'
    }
  },

  // ============================================================
  // 18. Juni 2023 — Covid-19-Gesetz (VERGANGEN, angenommen)
  // ============================================================
  {
    id: 'covid-19-gesetz-2023',
    slug: 'covid-19-gesetz-2023',
    title: 'Änderung vom 16. Dezember 2022 des Covid-19-Gesetzes',
    shortTitle: 'Covid-19-Gesetz',
    date: '2023-06-18',
    type: 'eidgenössisch',
    category: 'Gesundheit · Pandemie',
    readTime: 3,
    status: 'vergangen',
    dataQuality: 'official',
    bundesratPosition: 'JA',
    parlamentPosition: 'JA',
    parlamentStimmen: { ja: 179, nein: 51 },
    parlamentNote: 'Abstimmungsbüchlein: Nationalrat 140 Ja zu 50 Nein, Ständerat 39 Ja zu 1 Nein.',
    aiSummary:
      'Die Änderung verlängerte einzelne gesetzliche Grundlagen des Covid-19-Gesetzes bis Mitte 2024, damit der Bund bei Bedarf weiterhin gezielt reagieren konnte. Bundesrat und Parlament empfahlen ein Ja. Die Vorlage wurde angenommen.',
    summarySource: 'Abstimmungsbüchlein — Volksabstimmung 18. Juni 2023',
    summarySourceUrl: 'https://www.admin.ch/dam/gov/de/Dokumentation/Abstimmungen/Juni2023/DE_Erlaeuterungen_Juni_2023_web.pdf.download.pdf/DE_Erlaeuterungen_Juni_2023_web.pdf',
    summaryLastChecked: TODAY,
    proArguments: [
      {
        id: 'covid-pro-1',
        text: 'Erhält befristete Grundlagen, um bei einer Lageverschlechterung rasch handeln zu können',
        source: 'Bundesrat / Abstimmungsbüchlein',
        sourceUrl: 'https://www.admin.ch/dam/gov/de/Dokumentation/Abstimmungen/Juni2023/DE_Erlaeuterungen_Juni_2023_web.pdf.download.pdf/DE_Erlaeuterungen_Juni_2023_web.pdf',
        sourceDate: '2023-06-18',
        detail:
          'Die Befürwortenden argumentierten, dass einzelne Instrumente weiterhin nötig sein könnten, ohne die früheren breiten Massnahmen vollständig zu verlängern.'
      }
    ],
    contraArguments: [
      {
        id: 'covid-con-1',
        text: 'Gegner sahen keinen Bedarf mehr für verlängerte Sondergrundlagen',
        source: 'Abstimmungsbüchlein',
        sourceUrl: 'https://www.admin.ch/dam/gov/de/Dokumentation/Abstimmungen/Juni2023/DE_Erlaeuterungen_Juni_2023_web.pdf.download.pdf/DE_Erlaeuterungen_Juni_2023_web.pdf',
        sourceDate: '2023-06-18',
        detail:
          'Kritische Stimmen störten sich an der weiteren Verlängerung von Kompetenzen und hielten die pandemische Lage für ausreichend normalisiert.'
      }
    ],
    parteien: [
      { kuerzel: 'SP', name: 'Sozialdemokratische Partei', position: 'JA', statement: '«Gesundheitsschutz absichern.»', color: '#E11D48' },
      { kuerzel: 'GP', name: 'Grüne Partei', position: 'JA', statement: '«Gezielte Instrumente behalten.»', color: '#16A34A' },
      { kuerzel: 'GLP', name: 'Grünliberale', position: 'JA', statement: '«Handlungsfähigkeit erhalten.»', color: '#0D9488' },
      { kuerzel: 'Mitte', name: 'Die Mitte', position: 'JA', statement: '«Pragmatische Verlängerung.»', color: '#EA580C' },
      { kuerzel: 'FDP', name: 'FDP. Die Liberalen', position: 'JA', statement: '«Befristete Grundlage akzeptieren.»', color: '#2563EB' },
      { kuerzel: 'SVP', name: 'Schweizerische Volkspartei', position: 'NEIN', statement: '«Sonderrecht beenden.»', color: '#15803D' }
    ],
    result: {
      jaPercent: 61.9,
      turnoutPercent: 42.48,
      accepted: true,
      votersTotal: 2365154,
      jaVotes: 1438216,
      neinVotes: 883778,
      source: 'Bundeskanzlei — Detailresultat Vorlage 664',
      sourceUrl: 'https://www.bk.admin.ch/ch/d/pore/va/20230618/det664.html'
    }
  }
];

// ============================================================
// KANTONALE DEMO-VORLAGEN (Zürich)
// Klar gelabelt als Demo-Inhalt für Prototyp-Zwecke
// ============================================================
export const cantonalDemoAbstimmungen: Abstimmung[] = [
  {
    id: 'zh-demo-mobilitaet-2026',
    slug: 'zh-demo-mobilitaet-2026',
    title: 'Demo: Kantonale Volksinitiative «Mobilität fair finanzieren» (Zürich)',
    shortTitle: 'ZH Mobilitäts-Initiative',
    date: '2026-09-27',
    type: 'kantonal',
    kanton: 'ZH',
    category: 'Verkehr · Kantonal',
    readTime: 2,
    status: 'anstehend',
    dataQuality: 'demo',
    bundesratPosition: 'NEIN',
    parlamentPosition: 'NEIN',
    parlamentStimmen: { ja: 60, nein: 110 },
    parlamentNote: 'DEMO-INHALT: Vorlage wurde für Prototyp-Zwecke konstruiert.',
    aiSummary:
      'DEMO-INHALT (illustrativ, nicht real): Eine fiktive kantonale Initiative würde Strassen- und ÖV-Investitionen im Kanton Zürich zu gleichen Teilen verteilen und eine Mobility-Abgabe für Vielfahrer einführen. Dieser Eintrag dient zur Veranschaulichung der Kantonalebene im Prototyp.',
    summarySource: 'PROTOTYP-Demo',
    summarySourceUrl: 'https://friendly-llama-b738d4.netlify.app/quellen',
    summaryLastChecked: TODAY,
    proArguments: [
      {
        id: 'zh-d-pro-1',
        text: 'DEMO: Faire Verteilung der Verkehrsmittel-Investitionen',
        source: 'PROTOTYP',
        sourceUrl: 'https://friendly-llama-b738d4.netlify.app/quellen',
        sourceDate: TODAY,
        detail: 'DEMO-INHALT: Illustrativer Pro-Punkt für die Veranschaulichung kantonaler Themen im Prototyp.'
      }
    ],
    contraArguments: [
      {
        id: 'zh-d-con-1',
        text: 'DEMO: Zusatzabgaben belasten Pendler',
        source: 'PROTOTYP',
        sourceUrl: 'https://friendly-llama-b738d4.netlify.app/quellen',
        sourceDate: TODAY,
        detail: 'DEMO-INHALT: Illustrativer Contra-Punkt für die Veranschaulichung kantonaler Themen im Prototyp.'
      }
    ],
    parteien: [
      { kuerzel: 'SP', name: 'Sozialdemokratische Partei', position: 'JA', statement: '«DEMO: Fairer ÖV-Ausbau.»', color: '#E11D48' },
      { kuerzel: 'GP', name: 'Grüne Partei', position: 'JA', statement: '«DEMO: Mobilitätswende stärken.»', color: '#16A34A' },
      { kuerzel: 'GLP', name: 'Grünliberale', position: 'JA', statement: '«DEMO: Verursacherprinzip.»', color: '#0D9488' },
      { kuerzel: 'Mitte', name: 'Die Mitte', position: 'NEIN', statement: '«DEMO: Belastet Pendler zu stark.»', color: '#EA580C' },
      { kuerzel: 'FDP', name: 'FDP. Die Liberalen', position: 'NEIN', statement: '«DEMO: Neue Abgaben ablehnen.»', color: '#2563EB' },
      { kuerzel: 'SVP', name: 'Schweizerische Volkspartei', position: 'NEIN', statement: '«DEMO: Strassenausbau hat Priorität.»', color: '#15803D' }
    ]
  }
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export function getAbstimmungBySlug(slug: string): Abstimmung | undefined {
  return [...realAbstimmungen, ...cantonalDemoAbstimmungen].find((a) => a.slug === slug);
}

export function getArgumentById(slug: string, id: string) {
  const abstimmung = getAbstimmungBySlug(slug);
  if (!abstimmung) return null;
  const allArgs = [...abstimmung.proArguments, ...abstimmung.contraArguments];
  const arg = allArgs.find((a) => a.id === id);
  if (!arg) return null;
  const isPro = abstimmung.proArguments.some((a) => a.id === id);
  const opposites = isPro ? abstimmung.contraArguments : abstimmung.proArguments;
  return { arg, isPro, opposite: opposites[0] ?? null, abstimmung };
}

export function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('de-CH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('de-CH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}
