"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warmUpCache = exports.preGenerateYears = exports.generateYearCalendar = void 0;
const cache_1 = require("../utils/cache");
const validation_1 = require("../utils/validation");
const month_1 = require("./month");
/**
 * ULTRA-FAST year calendar generator with intelligent caching
 *
 * @param year - Year to generate (1900-2100)
 * @param localeCode - Locale for date formatting ('fr-FR', 'en-US', 'es-ES', 'de-DE')
 * @param calendarStyle - 'eu' starts weeks on Monday, 'am' starts on Sunday
 * @param startFromCurrentMonth - If true and year is current year, starts from current month
 * @returns Array of calendar months
 *
 * @throws Error if parameters are invalid
 *
 * @example
 * ```typescript
 * const calendar = generateYearCalendar(2025, 'en-US', 'eu', false);
 * console.log(calendar[0].monthName); // "January"
 * ```
 */
const generateYearCalendar = (year, localeCode, calendarStyle, startFromCurrentMonth = false) => {
    // Validate input parameters
    (0, validation_1.validateYear)(year);
    (0, validation_1.validateLocaleCode)(localeCode);
    (0, validation_1.validateCalendarStyle)(calendarStyle);
    // Create unique cache key for this year configuration
    const cacheKey = `${year}-${localeCode}-${calendarStyle}-${startFromCurrentMonth}`;
    // CACHE HIT - Instant return
    if (cache_1.yearCalendarCache.has(cacheKey)) {
        return cache_1.yearCalendarCache.get(cacheKey);
    }
    let startMonth = 0;
    let endMonth = 11;
    if (startFromCurrentMonth) {
        const now = new Date();
        const currentYear = now.getFullYear();
        if (year === currentYear) {
            startMonth = now.getMonth();
        }
    }
    const months = [];
    // Optimized month generation
    for (let monthIndex = startMonth; monthIndex <= endMonth; monthIndex++) {
        months.push((0, month_1.generateMonth)(year, monthIndex, localeCode, calendarStyle));
    }
    // Store result in cache IMMEDIATELY
    cache_1.yearCalendarCache.set(cacheKey, months);
    return months;
};
exports.generateYearCalendar = generateYearCalendar;
/**
 * Pre-generates calendars for adjacent years (previous and next)
 * This improves performance when users navigate between years
 *
 * @param baseYear - Base year (adjacent years will be generated)
 * @param localeCode - Locale for date formatting
 * @param calendarStyle - Calendar style ('eu' or 'am')
 * @param startFromCurrentMonth - Whether to start from current month
 *
 * @example
 * ```typescript
 * preGenerateYears(2025, 'en-US', 'eu', false);
 * // Generates calendars for 2024 and 2026
 * ```
 */
const preGenerateYears = (baseYear, localeCode, calendarStyle, startFromCurrentMonth = false) => {
    const adjacentYears = [baseYear - 1, baseYear + 1];
    adjacentYears.forEach((targetYear) => {
        const cacheKey = `${targetYear}-${localeCode}-${calendarStyle}-${startFromCurrentMonth}`;
        if (!cache_1.yearCalendarCache.has(cacheKey)) {
            (0, exports.generateYearCalendar)(targetYear, localeCode, calendarStyle, startFromCurrentMonth);
        }
    });
};
exports.preGenerateYears = preGenerateYears;
/**
 * Warms up the cache by pre-generating the current year and adjacent years
 * Call this on app initialization for optimal performance
 *
 * @param currentYear - Current year to generate
 * @param localeCode - Locale for date formatting
 * @param calendarStyle - Calendar style ('eu' or 'am')
 * @param startFromCurrentMonth - Whether to start from current month
 *
 * @example
 * ```typescript
 * // On app initialization
 * warmUpCache(2025, 'en-US', 'eu', false);
 * // Later requests will be instant!
 * ```
 */
const warmUpCache = (currentYear, localeCode, calendarStyle, startFromCurrentMonth = false) => {
    (0, exports.generateYearCalendar)(currentYear, localeCode, calendarStyle, startFromCurrentMonth);
    (0, exports.preGenerateYears)(currentYear, localeCode, calendarStyle, startFromCurrentMonth);
};
exports.warmUpCache = warmUpCache;
