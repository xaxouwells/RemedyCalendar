"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeekBounds = exports.getISOWeekNumber = exports.getFormat = exports.getFirstDayOfWeek = void 0;
const cache_1 = require("./cache");
const constants_1 = require("../constants");
/**
 * Gets the first day of the week based on calendar style
 *
 * @param calendarStyle - 'eu' for Monday, 'am' for Sunday
 * @returns Day number (0 = Sunday, 1 = Monday)
 */
const getFirstDayOfWeek = (calendarStyle) => {
    return constants_1.FIRST_DAY_OF_WEEK[calendarStyle];
};
exports.getFirstDayOfWeek = getFirstDayOfWeek;
/**
 * Formats a date according to type and locale - OPTIMIZED with cache
 *
 * @param date - Date to format
 * @param type - Type of format to apply
 * @param localeCode - Locale for formatting
 * @returns Formatted date string
 */
const getFormat = (date, type, localeCode) => {
    const cacheKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${type}-${localeCode}`;
    if (cache_1.calculationCache.has(cacheKey)) {
        return cache_1.calculationCache.get(cacheKey);
    }
    let result;
    switch (type) {
        case 'dayName':
            result = date.toLocaleDateString(localeCode, { weekday: 'long' });
            break;
        case 'dayShort':
            result = date.toLocaleDateString(localeCode, { weekday: 'narrow' });
            break;
        case 'monthName':
            result = date.toLocaleDateString(localeCode, { month: 'long' });
            break;
        case 'monthYear':
            result = date.toLocaleDateString(localeCode, { month: 'long', year: 'numeric' });
            break;
        default:
            result = '';
    }
    cache_1.calculationCache.set(cacheKey, result);
    return result;
};
exports.getFormat = getFormat;
/**
 * Calculates the ISO week number for a given date - OPTIMIZED with cache
 *
 * @param date - Date to get week number for
 * @returns ISO week number (1-53)
 */
const getISOWeekNumber = (date) => {
    const cacheKey = `week-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    if (cache_1.calculationCache.has(cacheKey)) {
        return cache_1.calculationCache.get(cacheKey);
    }
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNumber = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    cache_1.calculationCache.set(cacheKey, weekNumber);
    return weekNumber;
};
exports.getISOWeekNumber = getISOWeekNumber;
/**
 * Gets the start and end dates of the week for a given date - OPTIMIZED with cache
 *
 * @param date - Date within the week
 * @param firstDayOfWeek - First day of week (0 = Sunday, 1 = Monday)
 * @returns Object with start and end dates of the week
 */
const getWeekBounds = (date, firstDayOfWeek) => {
    const cacheKey = `bounds-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${firstDayOfWeek}`;
    if (cache_1.calculationCache.has(cacheKey)) {
        return cache_1.calculationCache.get(cacheKey);
    }
    const day = date.getDay();
    const diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek;
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - diff);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    const result = { start: weekStart, end: weekEnd };
    cache_1.calculationCache.set(cacheKey, result);
    return result;
};
exports.getWeekBounds = getWeekBounds;
