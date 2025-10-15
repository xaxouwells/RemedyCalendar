"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWeekDays = void 0;
const cache_1 = require("../utils/cache");
const dateHelpers_1 = require("../utils/dateHelpers");
const constants_1 = require("../constants");
/**
 * Generates an array of 7 days for a given week - ULTRA OPTIMIZED with cache
 *
 * @param weekStart - Start date of the week
 * @param monthStart - Start date of the month being displayed
 * @param localeCode - Locale for date formatting
 * @returns Array of 7 calendar days
 */
const generateWeekDays = (weekStart, monthStart, localeCode) => {
    const weekKey = `week-${weekStart.getTime()}-${monthStart.getTime()}-${localeCode}`;
    // Cache hit - return complete week instantly
    if (cache_1.weekCache.has(weekKey)) {
        return cache_1.weekCache.get(weekKey);
    }
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTime = today.getTime();
    for (let i = 0; i < constants_1.DAYS_IN_WEEK; i++) {
        const day = new Date(weekStart);
        day.setDate(weekStart.getDate() + i);
        const dayKey = `day-${day.getTime()}-${monthStart.getTime()}-${localeCode}`;
        if (cache_1.dayCache.has(dayKey)) {
            days.push(cache_1.dayCache.get(dayKey));
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
        const dayData = {
            date,
            fullDate: day,
            isoStringWithTime,
            isoString,
            dayName: (0, dateHelpers_1.getFormat)(day, 'dayName', localeCode),
            dayShort: (0, dateHelpers_1.getFormat)(day, 'dayShort', localeCode),
            isCurrentMonth,
            isToday,
            isWeekend,
            weekNumber: (0, dateHelpers_1.getISOWeekNumber)(day),
        };
        cache_1.dayCache.set(dayKey, dayData);
        days.push(dayData);
    }
    // Cache the complete week
    cache_1.weekCache.set(weekKey, days);
    return days;
};
exports.generateWeekDays = generateWeekDays;
