import type { ParteiKuerzel } from './types';

export type Ausrichtung = 'Links' | 'Links-Mitte' | 'Mitte-Links' | 'Mitte' | 'Mitte-Rechts' | 'Rechts';

export interface ParteiProfil {
  kuerzel: ParteiKuerzel;
  name: string;
  farbe: string;
  farbeLight: string;
  ausrichtung: Ausrichtung;
  /** 0 = ganz links, 100 = ganz rechts */
  spektrumLR: number;
  /** 0 = Wirtschaft / weniger Staat, 100 = Umwelt / mehr Staat */
  spektrumUW: number;
  gegruendet: number;
  mitglieder: number;
  praesident: string;
  website: string;
  kurzprofil: string;
  kernthemen: string[];
  slogan: string;
}

export const PARTEIEN: ParteiProfil[] = [
  {
    kuerzel: 'SP',
    name: 'Sozialdemokratische Partei',
    farbe: '#E11D48',
    farbeLight: '#FFF1F2',
    ausrichtung: 'Links',
    spektrumLR: 15,
    spektrumUW: 72,
    gegruendet: 1888,
    mitglieder: 35000,
    praesident: 'Cédric Wermuth & Mattea Meyer (Co-Präsidium)',
    website: 'sp-ps.ch',
    kurzprofil:
      'Die SP ist eine grosse linke Partei der Schweiz und setzt sich für soziale Gerechtigkeit, Umweltschutz und starke öffentliche Institutionen ein. Sie ist in National- und Ständerat vertreten und gehört zu den Bundesratsparteien.',
    kernthemen: ['Soziale Gerechtigkeit', 'Klimaschutz', 'Gleichstellung', 'AHV-Ausbau', 'Mindestlohn', 'Wohnbau'],
    slogan: 'Für eine gerechte Schweiz.'
  },
  {
    kuerzel: 'GP',
    name: 'Grüne Partei',
    farbe: '#16A34A',
    farbeLight: '#F0FDF4',
    ausrichtung: 'Links',
    spektrumLR: 20,
    spektrumUW: 95,
    gegruendet: 1983,
    mitglieder: 12000,
    praesident: 'Lisa Mazzone',
    website: 'gruene.ch',
    kurzprofil:
      'Die Grünen stellen den Klimaschutz ins Zentrum ihrer Politik. Die Partei wuchs bei den Wahlen 2019 stark und ist seither eine der prägenden Kräfte im Nationalrat. Sie verbindet ökologische mit sozialen Themen.',
    kernthemen: ['Klimakrise', 'Biodiversität', 'Erneuerbare Energien', 'Verkehrswende', 'Soziale Ökologie', 'Tierschutz'],
    slogan: 'Für Mensch und Natur.'
  },
  {
    kuerzel: 'GLP',
    name: 'Grünliberale Partei',
    farbe: '#0D9488',
    farbeLight: '#F0FDFA',
    ausrichtung: 'Mitte',
    spektrumLR: 45,
    spektrumUW: 80,
    gegruendet: 2007,
    mitglieder: 8500,
    praesident: 'Jürg Grossen',
    website: 'grunliberale.ch',
    kurzprofil:
      'Die GLP verbindet ökologische Nachhaltigkeit mit marktwirtschaftlichen Lösungen. Sie entstand 2007 und setzt Schwerpunkte bei Klima, Innovation, Digitalisierung und institutioneller Reformpolitik.',
    kernthemen: ['Ökologische Marktwirtschaft', 'CO₂-Lenkungsabgabe', 'Digitalisierung', 'Bildung', 'Raumplanung', 'Verkehr'],
    slogan: 'Ökologisch. Liberal. Zukunftsorientiert.'
  },
  {
    kuerzel: 'Mitte',
    name: 'Die Mitte',
    farbe: '#EA580C',
    farbeLight: '#FFF7ED',
    ausrichtung: 'Mitte',
    spektrumLR: 50,
    spektrumUW: 45,
    gegruendet: 1912,
    mitglieder: 95000,
    praesident: 'Gerhard Pfister',
    website: 'die-mitte.ch',
    kurzprofil:
      'Die Mitte (ehemals CVP/BDP) ist eine der traditionsreichsten Parteien der Schweiz. Sie steht für Ausgleich, Föderalismus und christlich-soziale Werte. Hochburgen liegen in der katholischen Innerschweiz.',
    kernthemen: ['Familienpolitik', 'Landwirtschaft', 'Gesundheit', 'Föderalismus', 'KMU-Förderung', 'Aussenpolitik'],
    slogan: 'Stark. Sozial. Nachhaltig.'
  },
  {
    kuerzel: 'FDP',
    name: 'FDP. Die Liberalen',
    farbe: '#2563EB',
    farbeLight: '#EFF6FF',
    ausrichtung: 'Mitte-Rechts',
    spektrumLR: 70,
    spektrumUW: 30,
    gegruendet: 1894,
    mitglieder: 120000,
    praesident: 'Thierry Burkart',
    website: 'fdp.ch',
    kurzprofil:
      'Die FDP steht für wirtschaftliche Freiheit, weniger Staat und individuelle Verantwortung. Sie ist traditionell in wirtschaftsnahen Milieus verankert und seit Langem auf Bundesebene vertreten.',
    kernthemen: ['Wirtschaftsfreiheit', 'Bildung & Innovation', 'Steuersenkung', 'Bürokratieabbau', 'Bilaterale', 'Sicherheit'],
    slogan: 'Frei und verantwortlich.'
  },
  {
    kuerzel: 'SVP',
    name: 'Schweizerische Volkspartei',
    farbe: '#15803D',
    farbeLight: '#F0FDF4',
    ausrichtung: 'Rechts',
    spektrumLR: 90,
    spektrumUW: 15,
    gegruendet: 1971,
    mitglieder: 90000,
    praesident: 'Marcel Dettling',
    website: 'svp.ch',
    kurzprofil:
      'Die SVP ist eine der wählerstärksten Parteien der Schweiz. Sie setzt auf strikte Migrationspolitik, direkte Demokratie und Skepsis gegenüber internationalen Institutionen. Sie ist auf Bundesebene stark vertreten.',
    kernthemen: ['Migrationspolitik', 'Neutralität', 'Direktdemokratie', 'Eigenverantwortung', 'Landwirtschaft', 'EU-Skepsis'],
    slogan: 'Sicher. Stark. Frei.'
  }
];

export function getParteiByKuerzel(kuerzel: string): ParteiProfil | undefined {
  return PARTEIEN.find((p) => p.kuerzel.toLowerCase() === kuerzel.toLowerCase());
}

export function getAusrichtungFromSpektrum(spektrumLR: number): Ausrichtung {
  if (spektrumLR < 25) return 'Links';
  if (spektrumLR < 40) return 'Links-Mitte';
  if (spektrumLR <= 55) return 'Mitte';
  if (spektrumLR <= 75) return 'Mitte-Rechts';
  return 'Rechts';
}
