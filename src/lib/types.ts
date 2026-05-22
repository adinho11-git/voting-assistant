export type Position = 'JA' | 'NEIN';
export type UserPosition = 'JA' | 'NEIN' | 'UNENTSCHIEDEN';
export type ParteiKuerzel = 'SP' | 'GP' | 'GLP' | 'Mitte' | 'FDP' | 'SVP';
export type AbstimmungType = 'eidgenössisch' | 'kantonal';
export type AbstimmungStatus = 'anstehend' | 'vergangen';
export type DataQuality = 'official' | 'official-pending' | 'demo';

export interface Argument {
  id: string;
  text: string;
  source: string;
  sourceUrl: string;
  sourceDate?: string;   // ISO date — when the source was published / when we checked it
  detail?: string;
}

export interface Partei {
  kuerzel: ParteiKuerzel;
  name: string;
  position: Position;
  statement: string;
  color: string;
  /** Source for this party position recommendation (Parteiversammlung, party website, ...) */
  parolenQuelle?: string;
  parolenQuelleUrl?: string;
}

export interface AbstimmungResult {
  /** Ja-Stimmen in % */
  jaPercent: number;
  /** Stimmbeteiligung in % */
  turnoutPercent: number;
  /** Annahme oder Ablehnung */
  accepted: boolean;
  /** Eingegangene Stimmzettel in der Schweiz */
  votersTotal?: number;
  /** Ja-Stimmen absolut */
  jaVotes?: number;
  /** Nein-Stimmen absolut */
  neinVotes?: number;
  /** Bei Volksinitiativen und Verfassungsänderungen: Ständemehr */
  staendeJa?: number;
  staendeNein?: number;
  /** Klar bestes Kanton, schlechtestes Kanton (für Karte/Headline) */
  topKantonJa?: { name: string; jaPercent: number };
  topKantonNein?: { name: string; jaPercent: number };
  /** Quelle der Ergebnisse */
  source: string;
  sourceUrl: string;
}

export interface Abstimmung {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  date: string;
  type: AbstimmungType;
  /** kanton-code wenn kantonal */
  kanton?: string;
  category: string;
  readTime: number;
  status: AbstimmungStatus;
  /** Datenherkunft — 'official' für admin.ch-verifizierte Daten, 'demo' für Prototyp-Inhalte */
  dataQuality: DataQuality;
  bundesratPosition: Position;
  parlamentPosition: Position;
  parlamentStimmen: { ja: number; nein: number };
  /** Kurze Beschreibung des Parlament-Stimmverhältnisses, wenn keine exakten Zahlen verfügbar */
  parlamentNote?: string;
  aiSummary: string;
  /** Quelle der aiSummary — meist admin.ch */
  summarySource: string;
  summarySourceUrl: string;
  summaryLastChecked: string; // ISO date
  proArguments: Argument[];
  contraArguments: Argument[];
  parteien: Partei[];
  /** Bei vergangenen Abstimmungen das Ergebnis */
  result?: AbstimmungResult;
}
