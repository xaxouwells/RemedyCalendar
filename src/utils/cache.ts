import type {
  CalculationCacheValue,
  DayCacheValue,
  WeekCacheValue,
  MonthCacheValue,
  IRemedyCalendarMonth,
} from '../types';
import { DEFAULT_CACHE_SIZE, DEFAULT_YEAR_CACHE_SIZE } from '../constants';

/**
 * Cache for basic calculations (formats, week numbers, week bounds)
 */
export const calculationCache = new Map<string, CalculationCacheValue>();

/**
 * Cache for individual days
 */
export const dayCache = new Map<string, DayCacheValue>();

/**
 * Cache for complete weeks (7 days)
 */
export const weekCache = new Map<string, WeekCacheValue>();

/**
 * Cache for complete months (weeks array)
 */
export const monthCache = new Map<string, MonthCacheValue>();

/**
 * Specific cache for complete year calendars - OPTIMIZED
 */
export const yearCalendarCache = new Map<string, IRemedyCalendarMonth[]>();

/**
 * Clears all calculation caches (but not year cache)
 */
export const clearCache = (): void => {
  calculationCache.clear();
  dayCache.clear();
  weekCache.clear();
  monthCache.clear();
};

/**
 * Clears the year calendar cache
 */
export const clearYearCache = (): void => {
  yearCalendarCache.clear();
};

/**
 * Clears all caches
 */
export const clearAllCaches = (): void => {
  calculationCache.clear();
  dayCache.clear();
  weekCache.clear();
  monthCache.clear();
  yearCalendarCache.clear();
};

/**
 * Limits the size of all calculation caches
 * Removes oldest entries when the cache exceeds maxSize
 *
 * @param maxSize - Maximum number of entries to keep per cache (default: 2000)
 */
export const limitCacheSize = (maxSize: number = DEFAULT_CACHE_SIZE): void => {
  const caches = [calculationCache, dayCache, weekCache, monthCache];

  caches.forEach((cache) => {
    if (cache.size > maxSize) {
      const keysToDelete = Array.from(cache.keys()).slice(0, cache.size - maxSize);
      keysToDelete.forEach((key) => cache.delete(key));
    }
  });
};

/**
 * Limits the size of the year cache
 * Keeps only the most recent years based on year number
 *
 * @param maxYears - Maximum number of years to keep (default: 3)
 */
export const limitYearCacheSize = (maxYears: number = DEFAULT_YEAR_CACHE_SIZE): void => {
  if (yearCalendarCache.size > maxYears) {
    const entries = Array.from(yearCalendarCache.entries());
    const sortedEntries = entries.sort((a, b) => {
      const yearA = parseInt(a[0].split('-')[0]);
      const yearB = parseInt(b[0].split('-')[0]);
      return yearB - yearA; // Descending order
    });

    yearCalendarCache.clear();
    const toKeep = sortedEntries.slice(0, maxYears);
    toKeep.forEach(([key, value]) => {
      yearCalendarCache.set(key, value);
    });
  }
};
