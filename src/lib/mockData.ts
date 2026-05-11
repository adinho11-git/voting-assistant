import type { Abstimmung } from './types';

export const mockAbstimmungen: Abstimmung[] = [
  {
    id: '1',
    slug: 'klima-initiative-2026',
    title: 'Volksinitiative «Für ein gesundes Klima»',
    shortTitle: 'Klima-Initiative',
    date: '2026-06-18',
    type: 'eidgenössisch',
    category: 'Klimaschutz · Energiepolitik',
    readTime: 3,
    bundesratPosition: 'NEIN',
    parlamentPosition: 'NEIN',
    parlamentStimmen: { ja: 88, nein: 104 },
    aiSummary:
      'Die Volksinitiative verlangt, dass die Schweiz bis 2040 klimaneutral wird und fossile Energien schrittweise durch erneuerbare ersetzt. Der Bundesrat lehnt die Initiative ab, weil er die bestehenden Klimagesetze als ausreichend erachtet und die Umsetzungskosten für Wirtschaft und Bevölkerung als unverhältnismässig hoch beurteilt.',
    proArguments: [
      {
        id: 'pro-1',
        text: 'Fördert erneuerbare Energien und stärkt die Versorgungssicherheit',
        source: 'BFE',
        sourceUrl: 'https://www.bfe.admin.ch',
        detail:
          'Das Bundesamt für Energie (BFE) bestätigt, dass ein konsequenter Ausbau erneuerbarer Energien die Importabhängigkeit der Schweiz deutlich reduzieren würde. Laut aktuellen Studien könnte der Anteil einheimischer Energie bis 2040 von 28% auf über 60% gesteigert werden — durch Solar-, Wind- und Wasserkraftausbau. Dies stärkt gleichzeitig die Resilienz des Stromnetzes gegenüber geopolitischen Schocks.'
      },
      {
        id: 'pro-2',
        text: 'Reduziert CO₂-Emissionen langfristig und schützt das Klima',
        source: 'BAFU',
        sourceUrl: 'https://www.bafu.admin.ch',
        detail:
          'Das Bundesamt für Umwelt (BAFU) zeigt in seinen Klimaprojektionen, dass ohne verbindliche Massnahmen die Schweizer Temperaturen bis 2100 um bis zu 4,5°C steigen könnten. Die Initiative setzt rechtlich verbindliche Zwischenziele und schafft damit die Planungssicherheit, die Unternehmen und Gemeinden für langfristige Investitionen in saubere Technologien benötigen.'
      },
      {
        id: 'pro-3',
        text: 'Schafft neue Arbeitsplätze im Cleantech-Sektor',
        source: 'Seco',
        sourceUrl: 'https://www.seco.admin.ch',
        detail:
          'Gemäss einer Studie des Staatssekretariats für Wirtschaft (Seco) könnten durch die Umsetzung der Initiative bis 2035 rund 45\'000 neue Stellen im Bereich erneuerbare Energien, Gebäudesanierung und nachhaltige Mobilität entstehen. Diese Arbeitsplätze wären regional verteilt und könnten strukturschwache Regionen stärken.'
      },
      {
        id: 'pro-4',
        text: 'Stärkt die Energieautonomie und reduziert Abhängigkeit vom Ausland',
        source: 'Initiativkomitee',
        sourceUrl: 'https://www.klima-initiative.ch',
        detail:
          'Die Schweiz importiert derzeit rund 75% ihres Energiebedarfs aus dem Ausland, grösstenteils in Form fossiler Brennstoffe. Die Initiative schafft Anreize, diese Abhängigkeit systematisch abzubauen. Die Initianten verweisen auf Deutschland und Österreich, wo ähnliche Massnahmen die Energieimporte bereits deutlich reduziert haben.'
      }
    ],
    contraArguments: [
      {
        id: 'contra-1',
        text: 'Hohe Umsetzungskosten belasten KMU und Haushalte unverhältnismässig',
        source: 'SGV',
        sourceUrl: 'https://www.sgv-usam.ch',
        detail:
          'Der Schweizerische Gewerbeverband (SGV) schätzt, dass die vollständige Umsetzung der Initiative Mehrkosten von 8–12 Milliarden Franken pro Jahr verursachen würde. Besonders betroffen wären energieintensive KMU in der Produktion, im Transport und im Gastgewerbe, die diese Kosten nicht ohne weiteres auf Kunden überwälzen können.'
      },
      {
        id: 'contra-2',
        text: 'Abhängigkeit von importierten Technologien steigt kurzfristig',
        source: 'SVP',
        sourceUrl: 'https://www.svp.ch',
        detail:
          'Solarmodule, Windturbinen und Batteriespeicher werden zu einem grossen Teil in China und anderen Ländern produziert. Kritiker warnen, dass die Initiative zwar die Abhängigkeit von fossilen Importen reduziert, aber eine neue Abhängigkeit von technologischen Importen schafft — was aus sicherheitspolitischer Sicht problematisch sein könnte.'
      },
      {
        id: 'contra-3',
        text: 'Keine konkreten Zwischenziele gefährden die Planungssicherheit',
        source: 'FDP',
        sourceUrl: 'https://www.fdp.ch',
        detail:
          'Die FDP. Die Liberalen kritisieren, dass der Initiativtext zwar ein Enddatum (2040) nennt, aber keine verbindlichen Etappenziele definiert. Dies schaffe für Unternehmen und Investoren Planungsunsicherheit. Zudem fehle ein Mechanismus, der greift, wenn Zwischenziele verfehlt werden.'
      },
      {
        id: 'contra-4',
        text: 'Verfassungsänderung notwendig, bestehende Gesetze reichen aus',
        source: 'Bundesrat',
        sourceUrl: 'https://www.admin.ch',
        detail:
          'Der Bundesrat ist der Ansicht, dass das bestehende CO₂-Gesetz und das Klimaschutzgesetz bereits einen ausreichenden rechtlichen Rahmen bieten. Eine Verfassungsänderung sei nicht notwendig und könnte die Klimapolitik durch Klagen und Referenden sogar verlangsamen.'
      }
    ],
    parteien: [
      { kuerzel: 'SP', name: 'Sozialdemokratische Partei', position: 'JA', statement: '«Klimaschutz ist soziale Gerechtigkeit — wer wartet, zahlt mehr.»', color: '#E11D48' },
      { kuerzel: 'GP', name: 'Grüne Partei', position: 'JA', statement: '«Ein mutiger Schritt für die Zukunft unserer Kinder.»', color: '#16A34A' },
      { kuerzel: 'GLP', name: 'Grünliberale', position: 'JA', statement: '«Marktwirtschaftlich sinnvoll und technologieoffen.»', color: '#0D9488' },
      { kuerzel: 'Mitte', name: 'Die Mitte', position: 'NEIN', statement: '«Ziele richtig, aber der Weg ist unklar und zu teuer.»', color: '#EA580C' },
      { kuerzel: 'FDP', name: 'FDP. Die Liberalen', position: 'NEIN', statement: '«Belastet KMU zu stark — bessere Lösungen existieren bereits.»', color: '#2563EB' },
      { kuerzel: 'SVP', name: 'Schweizerische Volkspartei', position: 'NEIN', statement: '«Energie-Diktatur schadet der Wirtschaft und der Freiheit.»', color: '#15803D' }
    ]
  },
  {
    id: '2',
    slug: 'gesundheitsreform-2026',
    title: 'Bundesgesetz über die Gesundheitsreform (GesG)',
    shortTitle: 'Gesundheitsreform',
    date: '2026-06-18',
    type: 'eidgenössisch',
    category: 'Sozialversicherung · KVG',
    readTime: 4,
    bundesratPosition: 'JA',
    parlamentPosition: 'JA',
    parlamentStimmen: { ja: 120, nein: 72 },
    aiSummary:
      'Das neue Gesetz soll die steigenden Krankenkassenprämien durch staatliche Kostendämpfungsmassnahmen begrenzen und die Grundversorgung im ländlichen Raum stärken. Es sieht Budgetobergrenzen für Kantone, verstärkte Medikamentenpreiskontrollen und Anreize für die integrierte Versorgung vor.',
    proArguments: [
      {
        id: 'pro-1',
        text: 'Dämpft den Prämiananstieg und entlastet Haushalte mit mittlerem Einkommen',
        source: 'BAG',
        sourceUrl: 'https://www.bag.admin.ch',
        detail: 'Das Bundesamt für Gesundheit (BAG) prognostiziert, dass die Massnahmen den jährlichen Prämienanstieg von durchschnittlich 4,5% auf rund 2,5% reduzieren könnten. Besonders Familien mit mittlerem Einkommen, die weder von Prämienverbilligungen profitieren noch steuerlich absetzen können, würden stark entlastet.'
      },
      {
        id: 'pro-2',
        text: 'Stärkt die medizinische Grundversorgung in ländlichen Gebieten',
        source: 'FMH',
        sourceUrl: 'https://www.fmh.ch',
        detail: 'Der Ärztemangel in Bergregionen und ländlichen Gemeinden ist akut. Das Gesetz schafft finanzielle Anreize für Ärzte, sich in unterversorgten Gebieten niederzulassen, und fördert Gruppenpraxen und Telemedizin als Ergänzung zur Vor-Ort-Versorgung.'
      },
      {
        id: 'pro-3',
        text: 'Senkt Medikamentenpreise durch stärkere Verhandlungsposition',
        source: 'Santésuisse',
        sourceUrl: 'https://www.santesuisse.ch',
        detail: 'Die Schweiz zahlt für patentgeschützte Medikamente im internationalen Vergleich bis zu 40% mehr als Nachbarländer. Das neue Gesetz gibt dem Bund mehr Verhandlungsmacht gegenüber Pharmakonzernen und verpflichtet Hersteller zu mehr Preistransparenz.'
      }
    ],
    contraArguments: [
      {
        id: 'contra-1',
        text: 'Staatlicher Eingriff gefährdet medizinische Qualität und Therapiefreiheit',
        source: 'FMH-Minderheit',
        sourceUrl: 'https://www.fmh.ch',
        detail: 'Eine Minderheit der Ärzteschaft warnt, dass Budgetobergrenzen dazu führen könnten, dass notwendige Behandlungen rationiert werden. Wenn ein Kanton sein Budget erschöpft hat, könnten teure aber medizinisch notwendige Eingriffe aufgeschoben werden.'
      },
      {
        id: 'contra-2',
        text: 'Massiver Bürokratieaufbau belastet Praxen und Spitäler',
        source: 'H+',
        sourceUrl: 'https://www.hplus.ch',
        detail: 'Der Spitalverband H+ schätzt, dass die neuen Reporting- und Dokumentationspflichten pro Spital zusätzlich 2–5 Vollzeitstellen erfordern. Dieser administrative Mehraufwand würde paradoxerweise die Kosten im Gesundheitswesen erhöhen, statt sie zu senken.'
      },
      {
        id: 'contra-3',
        text: 'Keine nachhaltige Lösung — Ursachen der Kostenentwicklung werden nicht adressiert',
        source: 'SVP',
        sourceUrl: 'https://www.svp.ch',
        detail: 'Kritiker bemängeln, dass das Gesetz zwar Symptome bekämpft, aber die eigentlichen Treiber der Kostenentwicklung — Überversorgung, fehlende Eigenverantwortung, Mengenanreize — nicht angeht. Eine nachhaltige Reform müsste tiefer eingreifen.'
      }
    ],
    parteien: [
      { kuerzel: 'SP', name: 'Sozialdemokratische Partei', position: 'JA', statement: '«Endlich Entlastung für den Mittelstand.»', color: '#E11D48' },
      { kuerzel: 'GP', name: 'Grüne Partei', position: 'JA', statement: '«Prävention stärken, Kosten senken.»', color: '#16A34A' },
      { kuerzel: 'GLP', name: 'Grünliberale', position: 'JA', statement: '«Systemreform mit Augenmass.»', color: '#0D9488' },
      { kuerzel: 'Mitte', name: 'Die Mitte', position: 'JA', statement: '«Wichtiger Schritt zur Kostendämpfung.»', color: '#EA580C' },
      { kuerzel: 'FDP', name: 'FDP. Die Liberalen', position: 'NEIN', statement: '«Bürokratie statt echter Reformen.»', color: '#2563EB' },
      { kuerzel: 'SVP', name: 'Schweizerische Volkspartei', position: 'NEIN', statement: '«Staatliche Kontrolle verschlechtert die Versorgung.»', color: '#15803D' }
    ]
  },
  {
    id: '3',
    slug: 'mieten-initiative-2026',
    title: 'Volksinitiative «Mieten senken — Initiative für faire Mieten»',
    shortTitle: 'Mieten-Initiative',
    date: '2026-06-18',
    type: 'eidgenössisch',
    category: 'Wohnungspolitik',
    readTime: 2,
    bundesratPosition: 'NEIN',
    parlamentPosition: 'NEIN',
    parlamentStimmen: { ja: 94, nein: 98 },
    aiSummary:
      'Die Initiative will Mietpreiserhöhungen an die Entwicklung der Hypothekarzinsen koppeln und soll verhindern, dass Vermieter bei sinkenden Zinsen die Mieten stabil halten. Der Bundesrat lehnt die Initiative ab, da er das bestehende Mietrecht als ausreichend ansieht und negative Auswirkungen auf das Wohnungsangebot befürchtet.',
    proArguments: [
      {
        id: 'pro-1',
        text: 'Schützt Mieter bei sinkenden Zinsen vor ungerechtfertigten Mehrbelastungen',
        source: 'MieterInnenverband',
        sourceUrl: 'https://www.mieterverband.ch',
        detail: 'Der Schweizerische MieterInnenverband zeigt, dass Vermieter in der Vergangenheit Mieterhöhungen bei steigenden Zinsen konsequent umgesetzt haben, Senkungen bei fallenden Zinsen aber systematisch vermieden. Die Initiative soll diese Asymmetrie per Gesetz beheben.'
      },
      {
        id: 'pro-2',
        text: 'Faire Marktregulation ohne Eingriff in Eigentumsrechte',
        source: 'Mieterforum Schweiz',
        sourceUrl: 'https://www.mieterforum.ch',
        detail: 'Anders als eine Mietpreisbremse würde die Initiative keine Mietober- oder -untergrenzen einführen, sondern lediglich die bestehende Kopplung von Miete und Hypothekarzins stärken. Dieses Prinzip ist bereits im Schweizer Recht verankert — die Initiative macht es nur konsequent durchsetzbar.'
      }
    ],
    contraArguments: [
      {
        id: 'contra-1',
        text: 'Eingriff ins Eigentumsrecht schreckt Investoren ab und hemmt Wohnungsbau',
        source: 'HEV Schweiz',
        sourceUrl: 'https://www.hev-schweiz.ch',
        detail: 'Der Hauseigentümerverband warnt, dass regulierte Renditen Investitionen in Neubauten und Sanierungen unrentabel machen. Langfristig würde das Wohnungsangebot schrumpfen, was die Mietpreise trotz Regulierung in die Höhe treibt — wie Beispiele aus anderen Ländern zeigen.'
      },
      {
        id: 'contra-2',
        text: 'Rechtliche Komplexität führt zu langen Gerichtsverfahren und Unsicherheit',
        source: 'FDP',
        sourceUrl: 'https://www.fdp.ch',
        detail: 'Juristen befürchten, dass die Umsetzung der Initiative eine Welle von Mietstreitigkeiten auslösen würde. Unklar ist, wie historische Mietverträge rückwirkend angepasst werden müssten und welche Behörden für die Kontrolle zuständig wären.'
      }
    ],
    parteien: [
      { kuerzel: 'SP', name: 'Sozialdemokratische Partei', position: 'JA', statement: '«Wohnen ist ein Grundrecht, kein Spekulationsobjekt.»', color: '#E11D48' },
      { kuerzel: 'GP', name: 'Grüne Partei', position: 'JA', statement: '«Faire Mieten für alle.»', color: '#16A34A' },
      { kuerzel: 'GLP', name: 'Grünliberale', position: 'NEIN', statement: '«Gut gemeint, aber falsch umgesetzt.»', color: '#0D9488' },
      { kuerzel: 'Mitte', name: 'Die Mitte', position: 'NEIN', statement: '«Gefährdet das Wohnungsangebot langfristig.»', color: '#EA580C' },
      { kuerzel: 'FDP', name: 'FDP. Die Liberalen', position: 'NEIN', statement: '«Markt regulieren schadet dem Markt.»', color: '#2563EB' },
      { kuerzel: 'SVP', name: 'Schweizerische Volkspartei', position: 'NEIN', statement: '«Staatliche Einmischung ins Eigentum stoppen.»', color: '#15803D' }
    ]
  },
  {
    id: '4',
    slug: 'mobilitaetsfonds-2026',
    title: 'Gegenvorschlag «Nationaler Mobilitätsfonds»',
    shortTitle: 'Mobilitätsfonds',
    date: '2026-06-18',
    type: 'eidgenössisch',
    category: 'Verkehr · Infrastruktur',
    readTime: 3,
    bundesratPosition: 'JA',
    parlamentPosition: 'JA',
    parlamentStimmen: { ja: 130, nein: 62 },
    aiSummary:
      'Der Gegenvorschlag schafft einen zweckgebundenen Fonds von 2,5 Milliarden Franken jährlich für die Modernisierung der Verkehrsinfrastruktur — Strassen, Schiene und Velowege gleichermassen. Das Parlament empfiehlt die Annahme als Alternative zur ursprünglichen Volksinitiative, die einen rein strassenbasierten Ansatz verfolgte.',
    proArguments: [
      {
        id: 'pro-1',
        text: 'Modernisiert marode Infrastruktur und reduziert Stau und Unfallgefahr',
        source: 'ASTRA',
        sourceUrl: 'https://www.astra.admin.ch',
        detail: 'Das Bundesamt für Strassen (ASTRA) schätzt, dass 15% der Schweizer Strasseninfrastruktur dringend sanierungsbedürftig ist. Ohne Investitionen drohen bis 2035 flächendeckende Kapazitätsengpässe. Der Fonds schafft die finanzielle Basis für eine langfristige Planung.'
      },
      {
        id: 'pro-2',
        text: 'Multimodaler Ansatz stärkt Schiene und Langsamverkehr gleichermassen',
        source: 'VCS',
        sourceUrl: 'https://www.vcs.ch',
        detail: 'Anders als die ursprüngliche Initiative finanziert der Gegenvorschlag nicht nur Strassen, sondern auch den öffentlichen Verkehr und Veloschnellrouten. Der Verkehrs-Club der Schweiz unterstützt den Gegenvorschlag deshalb ausdrücklich als klimakompatiblere Alternative.'
      }
    ],
    contraArguments: [
      {
        id: 'contra-1',
        text: 'Finanzierung durch Neuverschuldung belastet künftige Generationen',
        source: 'EFD-Kritiker',
        sourceUrl: 'https://www.efd.admin.ch',
        detail: 'Ökonomen warnen, dass die Finanzierung des Fonds unklar ist. Sofern er nicht durch Nutzergebühren gedeckt wird, müsste er durch allgemeine Bundeseinnahmen oder Schulden finanziert werden — beides sei in der aktuellen Haushaltslage problematisch.'
      },
      {
        id: 'contra-2',
        text: 'Prioritätensetzung unklar — zu viele Bereiche, zu wenig Fokus',
        source: 'SVP',
        sourceUrl: 'https://www.svp.ch',
        detail: 'Die SVP kritisiert, dass der Fonds zu breit aufgestellt ist und keine klaren Prioritäten setzt. Wer bestimmt, welche Projekte finanziert werden? Die fehlende Zweckbindung öffne politischen Lobbying Tür und Tor.'
      }
    ],
    parteien: [
      { kuerzel: 'SP', name: 'Sozialdemokratische Partei', position: 'JA', statement: '«Investitionen in Mobilität = Investitionen in Gleichheit.»', color: '#E11D48' },
      { kuerzel: 'GP', name: 'Grüne Partei', position: 'JA', statement: '«Gut, wenn ÖV und Velo priorisiert werden.»', color: '#16A34A' },
      { kuerzel: 'GLP', name: 'Grünliberale', position: 'JA', statement: '«Pragmatischer Kompromiss mit Zukunft.»', color: '#0D9488' },
      { kuerzel: 'Mitte', name: 'Die Mitte', position: 'JA', statement: '«Notwendig für den Wirtschaftsstandort Schweiz.»', color: '#EA580C' },
      { kuerzel: 'FDP', name: 'FDP. Die Liberalen', position: 'JA', statement: '«Infrastruktur ist Volkswirtschaft.»', color: '#2563EB' },
      { kuerzel: 'SVP', name: 'Schweizerische Volkspartei', position: 'NEIN', statement: '«Zu teuer, zu wenig konkret.»', color: '#15803D' }
    ]
  }
];

export function getAbstimmungBySlug(slug: string): Abstimmung | undefined {
  return mockAbstimmungen.find((a) => a.slug === slug);
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
