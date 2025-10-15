import type { IRemedyCalendarDay, LocaleCode } from '../types';
import { dayCache, weekCache } from '../utils/cache';
import { getFormat, getISOWeekNumber } from '../utils/dateHelpers';
import { DAYS_IN_WEEK } from '../constants';

/**
 * Generates an array of 7 days for a given week - ULTRA OPTIMIZED with cache
 *
 * @param weekStart - Start date of the week
 * @param monthStart - Start date of the month being displayed
 * @param localeCode - Locale for date formatting
 * @returns Array of 7 calendar days
 */
export const generateWeekDays = (
  weekStart: Date,
  monthStart: Date,
  localeCode: LocaleCode
): IRemedyCalendarDay[] => {
  const weekKey = `week-${weekStart.getTime()}-${monthStart.getTime()}-${localeCode}`;

  // Cache hit - return complete week instantly
  if (weekCache.has(weekKey)) {
    return weekCache.get(weekKey)!;
  }

  const days: IRemedyCalendarDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTime = today.getTime();

  for (let i = 0; i < DAYS_IN_WEEK; i++) {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);

    const dayKey = `day-${day.getTime()}-${monthStart.getTime()}-${localeCode}`;

    if (dayCache.has(dayKey)) {
      days.push(dayCache.get(dayKey)!);
      continue;
    }

    // Ultra-fast native calculations
    const dayTime = day.getTime();
    const isCurrentMonth = day.getMonth() === monthStart.getMonth();
    const isToday = dayTime === todayTime;
    const isWeekend = day.getDay() === 0 || day.getDay() === 6;

    // Pre-calculated native ISO formats
    const year = day.getFullYear();
    const month = day.getMonth() + 1;
    const date = day.getDate();

    const isoString = `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
    const isoStringWithTime = day.toISOString();

    const dayData: IRemedyCalendarDay = {
      date,
      fullDate: day,
      isoStringWithTime,
      isoString,
      dayName: getFormat(day, 'dayName', localeCode),
      dayShort: getFormat(day, 'dayShort', localeCode),
      isCurrentMonth,
      isToday,
      isWeekend,
      weekNumber: getISOWeekNumber(day),
    };

    dayCache.set(dayKey, dayData);
    days.push(dayData);
  }

  // Cache the complete week
  weekCache.set(weekKey, days);
  return days;
};
