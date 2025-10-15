import type { LocaleCode, CalendarStyle } from '../types';
/**
 * Gets the first day of the week based on calendar style
 *
 * @param calendarStyle - 'eu' for Monday, 'am' for Sunday
 * @returns Day number (0 = Sunday, 1 = Monday)
 */
export declare const getFirstDayOfWeek: (calendarStyle: CalendarStyle) => number;
/**
 * Formats a date according to type and locale - OPTIMIZED with cache
 *
 * @param date - Date to format
 * @param type - Type of format to apply
 * @param localeCode - Locale for formatting
 * @returns Formatted date string
 */
export declare const getFormat: (date: Date, type: "dayName" | "dayShort" | "monthName" | "monthYear", localeCode: LocaleCode) => string;
/**
 * Calculates the ISO week number for a given date - OPTIMIZED with cache
 *
 * @param date - Date to get week number for
 * @returns ISO week number (1-53)
 */
export declare const getISOWeekNumber: (date: Date) => number;
/**
 * Gets the start and end dates of the week for a given date - OPTIMIZED with cache
 *
 * @param date - Date within the week
 * @param firstDayOfWeek - First day of week (0 = Sunday, 1 = Monday)
 * @returns Object with start and end dates of the week
 */
export declare const getWeekBounds: (date: Date, firstDayOfWeek: number) => {
    start: Date;
    end: Date;
};
//# sourceMappingURL=dateHelpers.d.ts.map