import type { IRemedyCalendarDay, LocaleCode } from '../types';
/**
 * Generates an array of 7 days for a given week - ULTRA OPTIMIZED with cache
 *
 * @param weekStart - Start date of the week
 * @param monthStart - Start date of the month being displayed
 * @param localeCode - Locale for date formatting
 * @returns Array of 7 calendar days
 */
export declare const generateWeekDays: (weekStart: Date, monthStart: Date, localeCode: LocaleCode) => IRemedyCalendarDay[];
//# sourceMappingURL=day.d.ts.map