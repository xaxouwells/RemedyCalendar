/**
 * Remedy Calendar - Ultra-fast calendar generator with intelligent caching
 *
 * @packageDocumentation
 */
export { generateYearCalendar, preGenerateYears, warmUpCache } from './generators/year';
export { generateMonth } from './generators/month';
export { clearCache, clearYearCache, clearAllCaches, limitCacheSize, limitYearCacheSize, } from './utils/cache';
export type { LocaleCode, CalendarStyle, IRemedyCalendarDay, IRemedyCalendarWeek, IRemedyCalendarMonth, CacheOptions, } from './types';
export { generateYearCalendar as default } from './generators/year';
//# sourceMappingURL=index.d.ts.map