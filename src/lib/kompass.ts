/**
 * Partei-Kompass — 18 realistische Schweizer Szenario-Fragen,
 * 10 Themen, 5-Punkt-Skala. Antwort-Mapping berücksichtigt,
 * ob &quot;Zustimmung zur Aussage&quot; eher JA- oder NEIN-Lager entspricht.
 */
import type { Abstimmung, ParteiKuerzel, Position } from './types';

export type KompassTopic =
  | 'migration'
  | 'klima'
  | 'wirtschaft'
  | 'sozial'
  | 'eu'
  | 'sicherheit'
  | 'gesundheit'
  | 'mobilitaet'
  | 'bildung'
  | 'wohnen';

export interface KompassFrage {
  id: string;
  topic: KompassTopic;
  topicLabel: string;
  scenario: string;
  question: string;
  /** Welche Position entspricht «Zustimmung zur Aussage» (Antwort 1 = stimme voll zu) */
  zustimmungEntspricht: Position;
  /** Statements der einzelnen Parteien (1..5) — 1 = voll dafür, 5 = voll dagegen */
  parteiPositionen: Partial<Record<ParteiKuerzel, number>>;
}

export interface MatchResult {
  kuerzel: ParteiKuerzel;
  name: string;
  color: string;
  match: number;
  /** Pro Topic: Übereinstimmungswert in % */
  topicBreakdown: { topic: KompassTopic; topicLabel: string; match: number; answered: number }[];
  /** Erklärungs-Snippet: «Du und SVP stimmen besonders bei Migration überein» */
  topicHighlight: { topic: KompassTopic; label: string };
}

/* eslint-disable @typescript-eslint/naming-convention */
export const FRAGEN: KompassFrage[] = [
  // ---- MIGRATION ----
  {
    id: 'q1',
    topic: 'migration',
    topicLabel: 'Migration',
    scenario: 'Die Schweizer Bevölkerung ist Ende 2025 auf rund 9,1 Millionen gewachsen — vor allem durch Zuwanderung aus dem EU-Raum.',
    question: 'Die Schweiz soll die Personenfreizügigkeit mit der EU einschränken, um das Bevölkerungswachstum zu bremsen.',
    zustimmungEntspricht: 'JA',
    parteiPositionen: { SVP: 1, FDP: 4, Mitte: 4, GLP: 5, SP: 5, GP: 5 }
  },
  {
    id: 'q2',
    topic: 'migration',
    topicLabel: 'Migration',
    scenario: 'Asylgesuche steigen in Europa wieder; die Schweiz nimmt jährlich rund 25\'000 neue Geflüchtete auf.',
    question: 'Die Schweiz soll bei Asylverfahren strenger werden und vermehrt Personen rückführen.',
    zustimmungEntspricht: 'JA',
    parteiPositionen: { SVP: 1, FDP: 2, Mitte: 3, GLP: 4, SP: 5, GP: 5 }
  },

  // ---- KLIMA ----
  {
    id: 'q3',
    topic: 'klima',
    topicLabel: 'Klima',
    scenario: 'Die Schweiz hat sich völkerrechtlich verpflichtet, bis 2050 netto-null CO₂ zu erreichen.',
    question: 'Der Bund soll deutlich mehr in Klimaschutz investieren — auch wenn das den Bundeshaushalt belastet.',
    zustimmungEntspricht: 'JA',
    parteiPositionen: { GP: 1, SP: 1, GLP: 2, Mitte: 4, FDP: 4, SVP: 5 }
  },
  {
    id: 'q4',
    topic: 'klima',
    topicLabel: 'Klima',
    scenario: 'Solaranlagen auf Hochalpen-Stauseen würden Winterstrom sichern, aber Landschaftsschutz-Konflikte auslösen.',
    question: 'Energieversorgungssicherheit wiegt schwerer als unberührte Landschaftsbilder.',
    zustimmungEntspricht: 'JA',
    parteiPositionen: { GLP: 2, FDP: 2, Mitte: 2, SP: 3, GP: 3, SVP: 4 }
  },

  // ---- WIRTSCHAFT ----
  {
    id: 'q5',
    topic: 'wirtschaft',
    topicLabel: 'Wirtschaft',
    scenario: 'Schweizer Unternehmen klagen über Bürokratie und steigende Regulierungskosten — gleichzeitig steigt der Wohlstand.',
    question: 'Der Staat soll Unternehmen entlasten, indem Vorschriften und Steuern gesenkt werden.',
    zustimmungEntspricht: 'JA',
    parteiPositionen: { FDP: 1, SVP: 2, Mitte: 3, GLP: 3, SP: 5, GP: 5 }
  },
  {
    id: 'q6',
    topic: 'wirtschaft',
    topicLabel: 'Wirtschaft',
    scenario: 'In der Schweiz besitzen die reichsten 1% rund ein Drittel des Vermögens.',
    question: 'Eine nationale Erbschaftssteuer für sehr grosse Vermögen würde die Schweiz gerechter machen.',
    zustimmungEntspricht: 'JA',
    parteiPositionen: { SP: 1, GP: 1, GLP: 4, Mitte: 4, FDP: 5, SVP: 5 }
  },

  // ---- SOZIAL ----
  {
    id: 'q7',
    topic: 'sozial',
    topicLabel: 'Soziales',
    scenario: 'Die AHV-Renten reichen vielen Älteren knapp; gleichzeitig altert die Bevölkerung.',
    question: 'Die AHV soll ausgebaut werden — auch wenn das höhere Lohnabzüge bedeutet.',
    zustimmungEntspricht: 'JA',
    parteiPositionen: { SP: 1, GP: 1, Mitte: 3, GLP: 4, FDP: 5, SVP: 4 }
  },
  {
    id: 'q8',
    topic: 'sozial',
    topicLabel: 'Soziales',
    scenario: 'Die Schweiz hat keinen gesetzlichen Mindestlohn auf Bundesebene; mehrere Kantone haben eigene Regeln.',
    question: 'Ein nationaler Mindestlohn würde Lohndumping verhindern und Working Poor reduzieren.',
    zustimmungEntspricht: 'JA',
    parteiPositionen: { SP: 1, GP: 1, GLP: 4, Mitte: 4, FDP: 5, SVP: 5 }
  },

  // ---- EU ----
  {
    id: 'q9',
    topic: 'eu',
    topicLabel: 'EU-Politik',
    scenario: 'Die Schweiz verhandelt seit 2024 ein neues Abkommens-Paket («Bilaterale III») mit der EU.',
    question: 'Die Schweiz soll das Bilaterale-III-Paket annehmen, auch wenn das mehr Anpassung an EU-Recht bedeutet.',
    zustimmungEntspricht: 'JA',
    parteiPositionen: { GLP: 1, SP: 2, Mitte: 3, FDP: 2, GP: 3, SVP: 5 }
  },
  {
    id: 'q10',
    topic: 'eu',
    topicLabel: 'EU-Politik',
    scenario: 'Die Schweiz beteiligt sich nicht an den EU-Sanktionen gegen Russland; das wird international zunehmend kritisiert.',
    question: 'Die Schweiz soll EU-Sanktionen vollständig übernehmen, auch unter Aufgabe der Neutralität.',
    zustimmungEntspricht: 'JA',
    parteiPositionen: { GP: 2, GLP: 2, SP: 3, FDP: 3, Mitte: 4, SVP: 5 }
  },

  // ---- SICHERHEIT ----
  {
    id: 'q11',
    topic: 'sicherheit',
    topicLabel: 'Sicherheit',
    scenario: 'Aufgrund des Krieges in der Ukraine erhöht die Schweiz die Armee-Ausgaben Schritt für Schritt.',
    question: 'Die Schweiz soll ihre Armee deutlich stärker ausbauen — auch wenn dafür andere Bereiche kürzen müssen.',
    zustimmungEntspricht: 'JA',
    parteiPositionen: { SVP: 1, FDP: 2, Mitte: 3, GLP: 4, SP: 5, GP: 5 }
  },
  {
    id: 'q12',
    topic: 'sicherheit',
    topicLabel: 'Sicherheit',
    scenario: 'Jährlich wechseln rund 6\'000 Personen vom Militärdienst in den Zivildienst.',
    question: 'Der Wechsel in den Zivildienst soll deutlich erschwert werden, um Armeebestände zu sichern.',
    zustimmungEntspricht: 'JA',
    parteiPositionen: { SVP: 1, FDP: 1, Mitte: 2, GLP: 3, SP: 5, GP: 5 }
  },

  // ---- GESUNDHEIT ----
  {
    id: 'q13',
    topic: 'gesundheit',
    topicLabel: 'Gesundheit',
    scenario: 'Die Krankenkassen-Prämien sind in den letzten 10 Jahren überdurchschnittlich gestiegen.',
    question: 'Der Bund soll Prämien-Anstiege gesetzlich begrenzen, auch wenn das Eingriffe in den Wettbewerb bedeutet.',
    zustimmungEntspricht: 'JA',
    parteiPositionen: { SP: 1, GP: 1, GLP: 3, Mitte: 3, FDP: 5, SVP: 4 }
  },
  {
    id: 'q14',
    topic: 'gesundheit',
    topicLabel: 'Gesundheit',
    scenario: 'In peripheren Regionen schliessen vermehrt Hausarztpraxen und kleine Spitäler.',
    question: 'Der Bund soll medizinische Grundversorgung mit Subventionen sichern — auch in Randregionen.',
    zustimmungEntspricht: 'JA',
    parteiPositionen: { Mitte: 1, SP: 2, GP: 2, GLP: 3, FDP: 4, SVP: 3 }
  },

  // ---- MOBILITÄT ----
  {
    id: 'q15',
    topic: 'mobilitaet',
    topicLabel: 'Mobilität',
    scenario: 'Die Schweiz investiert sowohl in Strassen- als auch in Schienenausbau — die Mittel sind aber begrenzt.',
    question: 'Bei begrenztem Budget soll der öffentliche Verkehr Vorrang vor dem Strassenbau haben.',
    zustimmungEntspricht: 'JA',
    parteiPositionen: { GP: 1, SP: 1, GLP: 2, Mitte: 3, FDP: 4, SVP: 5 }
  },

  // ---- BILDUNG ----
  {
    id: 'q16',
    topic: 'bildung',
    topicLabel: 'Bildung',
    scenario: 'Schweizer Hochschulen erhalten zunehmend Druck zur Forschungskooperation mit der EU (Horizon).',
    question: 'Die Schweiz soll vollständige Horizon-Assoziierung anstreben, auch wenn das EU-Beiträge bedeutet.',
    zustimmungEntspricht: 'JA',
    parteiPositionen: { FDP: 1, GLP: 1, Mitte: 2, SP: 2, GP: 2, SVP: 5 }
  },

  // ---- WOHNEN ----
  {
    id: 'q17',
    topic: 'wohnen',
    topicLabel: 'Wohnen',
    scenario: 'Mieten in Schweizer Städten steigen seit Jahren überdurchschnittlich.',
    question: 'Mietpreis-Erhöhungen sollen gesetzlich stärker beschränkt werden.',
    zustimmungEntspricht: 'JA',
    parteiPositionen: { SP: 1, GP: 1, GLP: 4, Mitte: 4, FDP: 5, SVP: 4 }
  },
  {
    id: 'q18',
    topic: 'wohnen',
    topicLabel: 'Wohnen',
    scenario: 'Der gemeinnützige Wohnungsbau macht in der Schweiz etwa 5% des Bestands aus.',
    question: 'Der Bund soll gemeinnützigen Wohnungsbau stärker fördern.',
    zustimmungEntspricht: 'JA',
    parteiPositionen: { SP: 1, GP: 1, Mitte: 3, GLP: 3, FDP: 4, SVP: 4 }
  }
];
/* eslint-enable */

const TOPIC_LABELS: Record<KompassTopic, string> = {
  migration: 'Migration',
  klima: 'Klima',
  wirtschaft: 'Wirtschaft',
  sozial: 'Soziales',
  eu: 'EU-Politik',
  sicherheit: 'Sicherheit',
  gesundheit: 'Gesundheit',
  mobilitaet: 'Mobilität',
  bildung: 'Bildung',
  wohnen: 'Wohnen'
};

const PARTY_META: { kuerzel: ParteiKuerzel; name: string; color: string }[] = [
  { kuerzel: 'SP', name: 'Sozialdemokratische Partei', color: '#E11D48' },
  { kuerzel: 'GP', name: 'Grüne Partei', color: '#16A34A' },
  { kuerzel: 'GLP', name: 'Grünliberale', color: '#0D9488' },
  { kuerzel: 'Mitte', name: 'Die Mitte', color: '#EA580C' },
  { kuerzel: 'FDP', name: 'FDP. Die Liberalen', color: '#2563EB' },
  { kuerzel: 'SVP', name: 'Schweizerische Volkspartei', color: '#15803D' }
];

/**
 * Calculate match between user answers and party positions.
 * Both are on a 1..5 scale where 1 = "stimme voll zu", 5 = "stimme gar nicht zu".
 * The match per question = 100 - |user - party| * 25 (perfect match 100%, max diff 100%).
 */
export function calculateMatches(answers: Record<string, number>): MatchResult[] {
  const results: MatchResult[] = [];

  for (const party of PARTY_META) {
    const topicScores = new Map<KompassTopic, { sum: number; count: number }>();
    let totalScore = 0;
    let totalAnswered = 0;

    for (const frage of FRAGEN) {
      const userAnswer = answers[frage.id];
      if (userAnswer === undefined) continue;
      const partyAnswer = frage.parteiPositionen[party.kuerzel];
      if (partyAnswer === undefined) continue;

      const diff = Math.abs(userAnswer - partyAnswer);
      const matchPercent = Math.max(0, 100 - diff * 25); // 0 diff → 100, 4 diff → 0
      totalScore += matchPercent;
      totalAnswered += 1;

      const t = topicScores.get(frage.topic) ?? { sum: 0, count: 0 };
      t.sum += matchPercent;
      t.count += 1;
      topicScores.set(frage.topic, t);
    }

    const match = totalAnswered > 0 ? Math.round(totalScore / totalAnswered) : 0;
    const topicBreakdown = Array.from(topicScores.entries())
      .map(([topic, v]) => ({
        topic,
        topicLabel: TOPIC_LABELS[topic],
        match: Math.round(v.sum / v.count),
        answered: v.count
      }))
      .sort((a, b) => b.match - a.match);

    const topicHighlight = topicBreakdown[0]
      ? { topic: topicBreakdown[0].topic, label: topicBreakdown[0].topicLabel }
      : { topic: 'wirtschaft' as KompassTopic, label: 'Wirtschaft' };

    results.push({
      kuerzel: party.kuerzel,
      name: party.name,
      color: party.color,
      match,
      topicBreakdown,
      topicHighlight
    });
  }

  return results.sort((a, b) => b.match - a.match);
}

/* Legacy compatibility — older code imports buildKompassFragen */
export function buildKompassFragen(_abstimmungen: Abstimmung[]) {
  return FRAGEN.map((f) => ({
    slug: f.id,
    shortTitle: f.topicLabel,
    question: f.question,
    scenario: f.scenario,
    bundesratPosition: 'JA' as Position
  }));
}
