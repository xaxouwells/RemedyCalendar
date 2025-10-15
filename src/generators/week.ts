import type { IRemedyCalendarWeek, LocaleCode, CalendarStyle } from '../types';
import { monthCache } from '../utils/cache';
import { getFirstDayOfWeek, getWeekBounds } from '../utils/dateHelpers';
import { generateWeekDays } from './day';

/**
 * Ultra-fast generation of weeks for a given month - OPTIMIZED with cache
 *
 * @param monthStart - Start date of the month
 * @param localeCode - Locale for date formatting
 * @param calendarStyle - Calendar style ('eu' or 'am')
 * @returns Array of weeks in the month
 */
export const generateMonthWeeks = (
  monthStart: Date,
  localeCode: LocaleCode,
  calendarStyle: CalendarStyle
): IRemedyCalendarWeek[] => {
  const monthKey = `month-${monthStart.getTime()}-${localeCode}-${calendarStyle}`;

  if (monthCache.has(monthKey)) {
    return monthCache.get(monthKey)!;
  }

  const firstDayOfWeek = getFirstDayOfWeek(calendarStyle);

  // Get first and last week of the month
  const firstDayOfMonth = new Date(monthStart.getFullYear(), monthStart.getMonth(), 1);
  const lastDayOfMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);

  const firstWeek = getWeekBounds(firstDayOfMonth, firstDayOfWeek);
  const lastWeek = getWeekBounds(lastDayOfMonth, firstDayOfWeek);

  const weeks: IRemedyCalendarWeek[] = [];
  let currentWeekStart = new Date(firstWeek.start);
  let weekId = 0;

  while (currentWeekStart <= lastWeek.start) {
    const weekBounds = getWeekBounds(currentWeekStart, firstDayOfWeek);

    weeks.push({
      id: weekId,
      beginDate: weekBounds.start.getTime(),
      endDate: weekBounds.end.getTime(),
      beginDateUTC: weekBounds.start.toISOString(),
      endDateUTC: weekBounds.end.toISOString(),
      beginDateUTConly: weekBounds.start.toISOString().split('T')[0],
      endDateUTConly: weekBounds.end.toISOString().split('T')[0],
      weekDay: generateWeekDays(weekBounds.start, monthStart, localeCode),
    });

    // Move to next week
    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    weekId++;
  }

  monthCache.set(monthKey, weeks);
  return weeks;
};
