/**
 * Legacy entry point. The app now uses real data from realData.ts
 * — this file re-exports for backwards compatibility with existing imports.
 *
 * mockAbstimmungen contains:
 *   • 2 real upcoming federal votes (14. Juni 2026)
 *   • 11 curated real past federal votes (2023–2026) with official results
 */
export {
  realAbstimmungen as mockAbstimmungen,
  getAbstimmungBySlug,
  getArgumentById,
  getDaysUntil,
  formatDate,
  formatDateShort
} from './realData';

export { realAbstimmungen } from './realData';
