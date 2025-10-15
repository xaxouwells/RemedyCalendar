/**
 * Remedy Calendar - Ultra-fast calendar generator with intelligent caching
 *
 * @packageDocumentation
 */

// Export main calendar generator
export { generateYearCalendar, preGenerateYears, warmUpCache } from './generators/year';

// Export month generator
export { generateMonth } from './generators/month';

// Export cache management utilities
export {
  clearCache,
  clearYearCache,
  clearAllCaches,
  limitCacheSize,
  limitYearCacheSize,
} from './utils/cache';

// Export types
export type {
  LocaleCode,
  CalendarStyle,
  IRemedyCalendarDay,
  IRemedyCalendarWeek,
  IRemedyCalendarMonth,
  CacheOptions,
} from './types';

// Export default
export { generateYearCalendar as default } from './generators/year';
