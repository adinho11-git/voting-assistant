import type { Abstimmung, ParteiKuerzel, Position } from './types';

/**
 * Convert a 1..5 slider answer into a position-leaning weight.
 *  1 = "stimme voll zu"      → JA-leaning (weight +1.0 toward JA)
 *  3 = "neutral"             → no signal
 *  5 = "stimme gar nicht zu" → NEIN-leaning (weight +1.0 toward NEIN)
 */
function answerToLeaning(answer: number): { ja: number; nein: number } {
  // map 1..5 → -1..+1 (negative = JA agreement, positive = NEIN agreement)
  const normalized = (answer - 3) / 2; // 1→-1, 3→0, 5→+1
  if (normalized < 0) return { ja: -normalized, nein: 0 };
  if (normalized > 0) return { ja: 0, nein: normalized };
  return { ja: 0, nein: 0 };
}

export interface MatchResult {
  kuerzel: ParteiKuerzel;
  name: string;
  color: string;
  match: number; // 0..100
}

/**
 * Calculate party match scores given the user's 1..5 answers per abstimmung.
 *
 * Algorithm:
 *  - For every abstimmung the user answered and every party, compute how aligned
 *    the user's leaning is with the party's official position.
 *  - Award up to `weight` points per question; sum across all questions.
 *  - Normalize: 100% would mean perfect agreement on every question.
 *
 * The question framing ("Soll X passieren?") aligns with JA = passieren / NEIN = nicht passieren.
 */
export function calculateMatches(
  abstimmungen: Abstimmung[],
  answers: Record<string, number>
): MatchResult[] {
  // Collect parties from union over all abstimmungen
  const partyMap = new Map<ParteiKuerzel, { name: string; color: string }>();
  for (const a of abstimmungen) {
    for (const p of a.parteien) {
      if (!partyMap.has(p.kuerzel)) partyMap.set(p.kuerzel, { name: p.name, color: p.color });
    }
  }

  const results: MatchResult[] = [];
  for (const [kuerzel, meta] of partyMap.entries()) {
    let earned = 0;
    let possible = 0;

    for (const a of abstimmungen) {
      const ans = answers[a.slug];
      if (ans === undefined) continue;

      const partyPos = a.parteien.find((p) => p.kuerzel === kuerzel)?.position;
      if (!partyPos) continue;

      const lean = answerToLeaning(ans);
      const totalLean = lean.ja + lean.nein;
      if (totalLean === 0) continue; // neutral answer: skip (don't penalize either party)

      possible += 1;
      // award up to 1 point per question
      const matchScore = partyPos === 'JA' ? lean.ja : lean.nein;
      earned += matchScore;
    }

    const match = possible > 0 ? Math.round((earned / possible) * 100) : 0;
    results.push({ kuerzel, name: meta.name, color: meta.color, match });
  }

  return results.sort((a, b) => b.match - a.match);
}

export interface KompassFrage {
  slug: string;
  shortTitle: string;
  question: string;
  bundesratPosition: Position;
}

/**
 * Reframe each Abstimmung as a neutral statement ("Soll X passieren?").
 * Default fallback uses the original title with a generic prefix.
 */
const QUESTION_OVERRIDES: Record<string, string> = {
  'klima-initiative-2026':
    'Die Schweiz soll bis 2040 klimaneutral werden, auch wenn das Wirtschaft und Haushalte spürbar belastet.',
  'gesundheitsreform-2026':
    'Der Bund soll Krankenkassen-Prämien durch staatliche Kostendämpfungs-Massnahmen aktiv begrenzen.',
  'mieten-initiative-2026':
    'Mietpreise sollen gesetzlich an die Hypothekarzinsen gekoppelt werden, um Mieter besser zu schützen.',
  'mobilitaetsfonds-2026':
    'Ein nationaler Fonds soll 2,5 Mrd. Franken pro Jahr in Strasse, Schiene und Velo investieren.'
};

export function buildKompassFragen(abstimmungen: Abstimmung[]): KompassFrage[] {
  return abstimmungen.map((a) => ({
    slug: a.slug,
    shortTitle: a.shortTitle,
    question: QUESTION_OVERRIDES[a.slug] ?? `Diese Vorlage sollte angenommen werden: «${a.shortTitle}».`,
    bundesratPosition: a.bundesratPosition
  }));
}
