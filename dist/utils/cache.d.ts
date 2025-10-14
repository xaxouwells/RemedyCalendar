import type { CalculationCacheValue, WeekCacheValue, MonthCacheValue, IRemedyCalendarMonth } from '../types';
/**
 * Cache for basic calculations (formats, week numbers, week bounds)
 */
export declare const calculationCache: Map<string, CalculationCacheValue>;
/**
 * Cache for individual days
 */
export declare const dayCache: Map<string, import("../types").IRemedyCalendarDay>;
/**
 * Cache for complete weeks (7 days)
 */
export declare const weekCache: Map<string, WeekCacheValue>;
/**
 * Cache for complete months (weeks array)
 */
export declare const monthCache: Map<string, MonthCacheValue>;
/**
 * Specific cache for complete year calendars - OPTIMIZED
 */
export declare const yearCalendarCache: Map<string, IRemedyCalendarMonth[]>;
/**
 * Clears all calculation caches (but not year cache)
 */
export declare const clearCache: () => void;
/**
 * Clears the year calendar cache
 */
export declare const clearYearCache: () => void;
/**
 * Clears all caches
 */
export declare const clearAllCaches: () => void;
/**
 * Limits the size of all calculation caches
 * Removes oldest entries when the cache exceeds maxSize
 *
 * @param maxSize - Maximum number of entries to keep per cache (default: 2000)
 */
export declare const limitCacheSize: (maxSize?: number) => void;
/**
 * Limits the size of the year cache
 * Keeps only the most recent years based on year number
 *
 * @param maxYears - Maximum number of years to keep (default: 3)
 */
export declare const limitYearCacheSize: (maxYears?: number) => void;
//# sourceMappingURL=cache.d.ts.map