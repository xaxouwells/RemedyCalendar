"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const cache_1 = require("../utils/cache");
const year_1 = require("../generators/year");
(0, vitest_1.describe)('Cache Management', () => {
    (0, vitest_1.beforeEach)(() => {
        (0, cache_1.clearAllCaches)();
    });
    (0, vitest_1.describe)('clearCache', () => {
        (0, vitest_1.it)('should clear calculation caches', () => {
            (0, year_1.generateYearCalendar)(2025, 'en-US', 'eu', false);
            (0, cache_1.clearCache)();
            // Cache should be cleared, but year cache should remain
            const calendar = (0, year_1.generateYearCalendar)(2025, 'en-US', 'eu', false);
            (0, vitest_1.expect)(calendar).toBeDefined();
        });
    });
    (0, vitest_1.describe)('clearYearCache', () => {
        (0, vitest_1.it)('should clear year cache', () => {
            (0, year_1.generateYearCalendar)(2025, 'en-US', 'eu', false);
            (0, cache_1.clearYearCache)();
            // Year cache should be cleared
            const calendar = (0, year_1.generateYearCalendar)(2025, 'en-US', 'eu', false);
            (0, vitest_1.expect)(calendar).toBeDefined();
        });
    });
    (0, vitest_1.describe)('clearAllCaches', () => {
        (0, vitest_1.it)('should clear all caches', () => {
            (0, year_1.generateYearCalendar)(2025, 'en-US', 'eu', false);
            (0, cache_1.clearAllCaches)();
            const calendar = (0, year_1.generateYearCalendar)(2025, 'en-US', 'eu', false);
            (0, vitest_1.expect)(calendar).toBeDefined();
        });
    });
    (0, vitest_1.describe)('warmUpCache', () => {
        (0, vitest_1.it)('should pre-generate current year and adjacent years', () => {
            const start = Date.now();
            (0, year_1.warmUpCache)(2025, 'en-US', 'eu', false);
            const warmUpTime = Date.now() - start;
            // Accessing pre-generated years should be instant
            const start2 = Date.now();
            (0, year_1.generateYearCalendar)(2025, 'en-US', 'eu', false);
            const accessTime = Date.now() - start2;
            (0, vitest_1.expect)(accessTime).toBeLessThan(warmUpTime / 2);
        });
    });
    (0, vitest_1.describe)('preGenerateYears', () => {
        (0, vitest_1.it)('should pre-generate adjacent years', () => {
            (0, year_1.generateYearCalendar)(2025, 'en-US', 'eu', false);
            (0, year_1.preGenerateYears)(2025, 'en-US', 'eu', false);
            // Adjacent years should now be cached
            const start2024 = Date.now();
            const cal2024 = (0, year_1.generateYearCalendar)(2024, 'en-US', 'eu', false);
            const time2024 = Date.now() - start2024;
            const start2026 = Date.now();
            const cal2026 = (0, year_1.generateYearCalendar)(2026, 'en-US', 'eu', false);
            const time2026 = Date.now() - start2026;
            (0, vitest_1.expect)(cal2024).toBeDefined();
            (0, vitest_1.expect)(cal2026).toBeDefined();
            (0, vitest_1.expect)(time2024).toBeLessThan(10); // Should be very fast (cached)
            (0, vitest_1.expect)(time2026).toBeLessThan(10);
        });
    });
    (0, vitest_1.describe)('limitCacheSize', () => {
        (0, vitest_1.it)('should limit cache size', () => {
            // Generate multiple years to fill cache
            for (let i = 2020; i < 2030; i++) {
                (0, year_1.generateYearCalendar)(i, 'en-US', 'eu', false);
            }
            (0, cache_1.limitCacheSize)(1000);
            // Cache should still work
            const calendar = (0, year_1.generateYearCalendar)(2025, 'en-US', 'eu', false);
            (0, vitest_1.expect)(calendar).toBeDefined();
        });
    });
    (0, vitest_1.describe)('limitYearCacheSize', () => {
        (0, vitest_1.it)('should keep only specified number of years', () => {
            // Generate multiple years
            for (let i = 2020; i < 2030; i++) {
                (0, year_1.generateYearCalendar)(i, 'en-US', 'eu', false);
            }
            (0, cache_1.limitYearCacheSize)(3);
            // Recent years should still be accessible
            const calendar = (0, year_1.generateYearCalendar)(2029, 'en-US', 'eu', false);
            (0, vitest_1.expect)(calendar).toBeDefined();
        });
    });
});
