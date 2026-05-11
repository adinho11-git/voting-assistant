export type Position = 'JA' | 'NEIN';
export type ParteiKuerzel = 'SP' | 'GP' | 'GLP' | 'Mitte' | 'FDP' | 'SVP';
export type AbstimmungType = 'eidgenössisch' | 'kantonal';

export interface Argument {
  id: string;
  text: string;
  source: string;
  sourceUrl: string;
  detail?: string; // expanded text for detail view
}

export interface Partei {
  kuerzel: ParteiKuerzel;
  name: string;
  position: Position;
  statement: string;
  color: string;
}

export interface Abstimmung {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  date: string; // ISO date string
  type: AbstimmungType;
  category: string;
  readTime: number;
  bundesratPosition: Position;
  parlamentPosition: Position;
  parlamentStimmen: { ja: number; nein: number };
  aiSummary: string;
  proArguments: Argument[];
  contraArguments: Argument[];
  parteien: Partei[];
}
