import type { IRemedyCalendarMonth, LocaleCode, CalendarStyle } from '../types';
/**
 * Generates a calendar month with all its weeks and days
 *
 * @param year - Year of the month
 * @param monthIndex - Month index (0-11)
 * @param localeCode - Locale for date formatting
 * @param calendarStyle - Calendar style ('eu' or 'am')
 * @returns Calendar month object
 */
export declare const generateMonth: (year: number, monthIndex: number, localeCode: LocaleCode, calendarStyle: CalendarStyle) => IRemedyCalendarMonth;
//# sourceMappingURL=month.d.ts.map