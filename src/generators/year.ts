import type { IRemedyCalendarMonth, LocaleCode, CalendarStyle } from '../types';
import { yearCalendarCache } from '../utils/cache';
import { validateYear, validateLocaleCode, validateCalendarStyle } from '../utils/validation';
import { generateMonth } from './month';

/**
 * ULTRA-FAST year calendar generator with intelligent caching
 *
 * @param year - Year to generate (1900-2100)
 * @param localeCode - Locale for date formatting ('fr-FR', 'en-US', 'es-ES', 'de-DE')
 * @param calendarStyle - 'eu' starts weeks on Monday, 'am' starts on Sunday
 * @param startFromCurrentMonth - If true and year is current year, starts from current month
 * @returns Array of calendar months
 *
 * @throws Error if parameters are invalid
 *
 * @example
 * ```typescript
 * const calendar = generateYearCalendar(2025, 'en-US', 'eu', false);
 * console.log(calendar[0].monthName); // "January"
 * ```
 */
export const generateYearCalendar = (
  year: number,
  localeCode: LocaleCode,
  calendarStyle: CalendarStyle,
  startFromCurrentMonth: boolean = false
): IRemedyCalendarMonth[] => {
  // Validate input parameters
  validateYear(year);
  validateLocaleCode(localeCode);
  validateCalendarStyle(calendarStyle);

  // Create unique cache key for this year configuration
  const cacheKey = `${year}-${localeCode}-${calendarStyle}-${startFromCurrentMonth}`;

  // CACHE HIT - Instant return
  if (yearCalendarCache.has(cacheKey)) {
    return yearCalendarCache.get(cacheKey) as IRemedyCalendarMonth[];
  }

  let startMonth = 0;
  let endMonth = 11;

  if (startFromCurrentMonth) {
    const now = new Date();
    const currentYear = now.getFullYear();

    if (year === currentYear) {
      startMonth = now.getMonth();
    }
  }

  const months: IRemedyCalendarMonth[] = [];

  // Optimized month generation
  for (let monthIndex = startMonth; monthIndex <= endMonth; monthIndex++) {
    months.push(generateMonth(year, monthIndex, localeCode, calendarStyle));
  }

  // Store result in cache IMMEDIATELY
  yearCalendarCache.set(cacheKey, months);

  return months;
};

/**
 * Pre-generates calendars for adjacent years (previous and next)
 * This improves performance when users navigate between years
 *
 * @param baseYear - Base year (adjacent years will be generated)
 * @param localeCode - Locale for date formatting
 * @param calendarStyle - Calendar style ('eu' or 'am')
 * @param startFromCurrentMonth - Whether to start from current month
 *
 * @example
 * ```typescript
 * preGenerateYears(2025, 'en-US', 'eu', false);
 * // Generates calendars for 2024 and 2026
 * ```
 */
export const preGenerateYears = (
  baseYear: number,
  localeCode: LocaleCode,
  calendarStyle: CalendarStyle,
  startFromCurrentMonth: boolean = false
): void => {
  const adjacentYears = [baseYear - 1, baseYear + 1];

  adjacentYears.forEach((targetYear) => {
    const cacheKey = `${targetYear}-${localeCode}-${calendarStyle}-${startFromCurrentMonth}`;

    if (!yearCalendarCache.has(cacheKey)) {
      generateYearCalendar(targetYear, localeCode, calendarStyle, startFromCurrentMonth);
    }
  });
};

/**
 * Warms up the cache by pre-generating the current year and adjacent years
 * Call this on app initialization for optimal performance
 *
 * @param currentYear - Current year to generate
 * @param localeCode - Locale for date formatting
 * @param calendarStyle - Calendar style ('eu' or 'am')
 * @param startFromCurrentMonth - Whether to start from current month
 *
 * @example
 * ```typescript
 * // On app initialization
 * warmUpCache(2025, 'en-US', 'eu', false);
 * // Later requests will be instant!
 * ```
 */
export const warmUpCache = (
  currentYear: number,
  localeCode: LocaleCode,
  calendarStyle: CalendarStyle,
  startFromCurrentMonth: boolean = false
): void => {
  generateYearCalendar(currentYear, localeCode, calendarStyle, startFromCurrentMonth);
  preGenerateYears(currentYear, localeCode, calendarStyle, startFromCurrentMonth);
};
