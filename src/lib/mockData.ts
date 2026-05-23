/**
 * Legacy entry point. The app now uses real data from realData.ts
 * — this file re-exports for backwards compatibility with existing imports.
 *
 * mockAbstimmungen now contains:
 *   • 2 real upcoming votes (14. Juni 2026)
 *   • 1 demo cantonal vote (clearly labelled)
 *   • 11 curated real past votes (2023–2026) with official results
 */
export {
  realAbstimmungen as mockAbstimmungen,
  getAbstimmungBySlug,
  getArgumentById,
  getDaysUntil,
  formatDate,
  formatDateShort
} from './realData';

export { realAbstimmungen, cantonalDemoAbstimmungen } from './realData';
