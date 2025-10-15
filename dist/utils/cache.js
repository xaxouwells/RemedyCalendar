"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limitYearCacheSize = exports.limitCacheSize = exports.clearAllCaches = exports.clearYearCache = exports.clearCache = exports.yearCalendarCache = exports.monthCache = exports.weekCache = exports.dayCache = exports.calculationCache = void 0;
const constants_1 = require("../constants");
/**
 * Cache for basic calculations (formats, week numbers, week bounds)
 */
exports.calculationCache = new Map();
/**
 * Cache for individual days
 */
exports.dayCache = new Map();
/**
 * Cache for complete weeks (7 days)
 */
exports.weekCache = new Map();
/**
 * Cache for complete months (weeks array)
 */
exports.monthCache = new Map();
/**
 * Specific cache for complete year calendars - OPTIMIZED
 */
exports.yearCalendarCache = new Map();
/**
 * Clears all calculation caches (but not year cache)
 */
const clearCache = () => {
    exports.calculationCache.clear();
    exports.dayCache.clear();
    exports.weekCache.clear();
    exports.monthCache.clear();
};
exports.clearCache = clearCache;
/**
 * Clears the year calendar cache
 */
const clearYearCache = () => {
    exports.yearCalendarCache.clear();
};
exports.clearYearCache = clearYearCache;
/**
 * Clears all caches
 */
const clearAllCaches = () => {
    exports.calculationCache.clear();
    exports.dayCache.clear();
    exports.weekCache.clear();
    exports.monthCache.clear();
    exports.yearCalendarCache.clear();
};
exports.clearAllCaches = clearAllCaches;
/**
 * Limits the size of all calculation caches
 * Removes oldest entries when the cache exceeds maxSize
 *
 * @param maxSize - Maximum number of entries to keep per cache (default: 2000)
 */
const limitCacheSize = (maxSize = constants_1.DEFAULT_CACHE_SIZE) => {
    const caches = [exports.calculationCache, exports.dayCache, exports.weekCache, exports.monthCache];
    caches.forEach((cache) => {
        if (cache.size > maxSize) {
            const keysToDelete = Array.from(cache.keys()).slice(0, cache.size - maxSize);
            keysToDelete.forEach((key) => cache.delete(key));
        }
    });
};
exports.limitCacheSize = limitCacheSize;
/**
 * Limits the size of the year cache
 * Keeps only the most recent years based on year number
 *
 * @param maxYears - Maximum number of years to keep (default: 3)
 */
const limitYearCacheSize = (maxYears = constants_1.DEFAULT_YEAR_CACHE_SIZE) => {
    if (exports.yearCalendarCache.size > maxYears) {
        const entries = Array.from(exports.yearCalendarCache.entries());
        const sortedEntries = entries.sort((a, b) => {
            const yearA = parseInt(a[0].split('-')[0]);
            const yearB = parseInt(b[0].split('-')[0]);
            return yearB - yearA; // Descending order
        });
        exports.yearCalendarCache.clear();
        const toKeep = sortedEntries.slice(0, maxYears);
        toKeep.forEach(([key, value]) => {
            exports.yearCalendarCache.set(key, value);
        });
    }
};
exports.limitYearCacheSize = limitYearCacheSize;
