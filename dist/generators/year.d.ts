import type { IRemedyCalendarMonth, LocaleCode, CalendarStyle } from '../types';
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
export declare const generateYearCalendar: (year: number, localeCode: LocaleCode, calendarStyle: CalendarStyle, startFromCurrentMonth?: boolean) => IRemedyCalendarMonth[];
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
export declare const preGenerateYears: (baseYear: number, localeCode: LocaleCode, calendarStyle: CalendarStyle, startFromCurrentMonth?: boolean) => void;
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
export declare const warmUpCache: (currentYear: number, localeCode: LocaleCode, calendarStyle: CalendarStyle, startFromCurrentMonth?: boolean) => void;
//# sourceMappingURL=year.d.ts.map