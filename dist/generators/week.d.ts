import type { IRemedyCalendarWeek, LocaleCode, CalendarStyle } from '../types';
/**
 * Ultra-fast generation of weeks for a given month - OPTIMIZED with cache
 *
 * @param monthStart - Start date of the month
 * @param localeCode - Locale for date formatting
 * @param calendarStyle - Calendar style ('eu' or 'am')
 * @returns Array of weeks in the month
 */
export declare const generateMonthWeeks: (monthStart: Date, localeCode: LocaleCode, calendarStyle: CalendarStyle) => IRemedyCalendarWeek[];
//# sourceMappingURL=week.d.ts.map