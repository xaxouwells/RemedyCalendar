import type { IRemedyCalendarMonth, LocaleCode, CalendarStyle } from '../types';
import { getFormat } from '../utils/dateHelpers';
import { generateMonthWeeks } from './week';

/**
 * Generates a calendar month with all its weeks and days
 *
 * @param year - Year of the month
 * @param monthIndex - Month index (0-11)
 * @param localeCode - Locale for date formatting
 * @param calendarStyle - Calendar style ('eu' or 'am')
 * @returns Calendar month object
 */
export const generateMonth = (
  year: number,
  monthIndex: number,
  localeCode: LocaleCode,
  calendarStyle: CalendarStyle
): IRemedyCalendarMonth => {
  const monthStart = new Date(year, monthIndex, 1);

  return {
    monthIndex,
    monthName: getFormat(monthStart, 'monthName', localeCode),
    monthYear: getFormat(monthStart, 'monthYear', localeCode),
    month: generateMonthWeeks(monthStart, localeCode, calendarStyle),
  };
};
