"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMonthWeeks = void 0;
const cache_1 = require("../utils/cache");
const dateHelpers_1 = require("../utils/dateHelpers");
const day_1 = require("./day");
/**
 * Ultra-fast generation of weeks for a given month - OPTIMIZED with cache
 *
 * @param monthStart - Start date of the month
 * @param localeCode - Locale for date formatting
 * @param calendarStyle - Calendar style ('eu' or 'am')
 * @returns Array of weeks in the month
 */
const generateMonthWeeks = (monthStart, localeCode, calendarStyle) => {
    const monthKey = `month-${monthStart.getTime()}-${localeCode}-${calendarStyle}`;
    if (cache_1.monthCache.has(monthKey)) {
        return cache_1.monthCache.get(monthKey);
    }
    const firstDayOfWeek = (0, dateHelpers_1.getFirstDayOfWeek)(calendarStyle);
    // Get first and last week of the month
    const firstDayOfMonth = new Date(monthStart.getFullYear(), monthStart.getMonth(), 1);
    const lastDayOfMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
    const firstWeek = (0, dateHelpers_1.getWeekBounds)(firstDayOfMonth, firstDayOfWeek);
    const lastWeek = (0, dateHelpers_1.getWeekBounds)(lastDayOfMonth, firstDayOfWeek);
    const weeks = [];
    let currentWeekStart = new Date(firstWeek.start);
    let weekId = 0;
    while (currentWeekStart <= lastWeek.start) {
        const weekBounds = (0, dateHelpers_1.getWeekBounds)(currentWeekStart, firstDayOfWeek);
        weeks.push({
            id: weekId,
            beginDate: weekBounds.start.getTime(),
            endDate: weekBounds.end.getTime(),
            beginDateUTC: weekBounds.start.toISOString(),
            endDateUTC: weekBounds.end.toISOString(),
            beginDateUTConly: weekBounds.start.toISOString().split('T')[0],
            endDateUTConly: weekBounds.end.toISOString().split('T')[0],
            weekDay: (0, day_1.generateWeekDays)(weekBounds.start, monthStart, localeCode),
        });
        // Move to next week
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        weekId++;
    }
    cache_1.monthCache.set(monthKey, weeks);
    return weeks;
};
exports.generateMonthWeeks = generateMonthWeeks;
