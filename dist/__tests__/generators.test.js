"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const index_1 = require("../index");
(0, vitest_1.describe)('Calendar Generator', () => {
    (0, vitest_1.beforeEach)(() => {
        (0, index_1.clearAllCaches)();
    });
    (0, vitest_1.describe)('generateYearCalendar', () => {
        (0, vitest_1.it)('should generate 12 months for a full year', () => {
            const calendar = (0, index_1.generateYearCalendar)(2025, 'en-US', 'eu', false);
            (0, vitest_1.expect)(calendar).toHaveLength(12);
            (0, vitest_1.expect)(calendar[0].monthName).toBe('January');
            (0, vitest_1.expect)(calendar[11].monthName).toBe('December');
        });
        (0, vitest_1.it)('should generate correct months for French locale', () => {
            const calendar = (0, index_1.generateYearCalendar)(2025, 'fr-FR', 'eu', false);
            (0, vitest_1.expect)(calendar[0].monthName).toBe('janvier');
            (0, vitest_1.expect)(calendar[11].monthName).toBe('décembre');
        });
        (0, vitest_1.it)('should start week on Monday for EU style', () => {
            const calendar = (0, index_1.generateYearCalendar)(2025, 'en-US', 'eu', false);
            const firstWeek = calendar[0].month[0];
            const firstDay = firstWeek.weekDay[0];
            // January 1, 2025 is a Wednesday, so first day of week should be December 30, 2024 (Monday)
            (0, vitest_1.expect)(firstDay.fullDate.getDay()).toBe(1); // Monday
        });
        (0, vitest_1.it)('should start week on Sunday for AM style', () => {
            const calendar = (0, index_1.generateYearCalendar)(2025, 'en-US', 'am', false);
            const firstWeek = calendar[0].month[0];
            const firstDay = firstWeek.weekDay[0];
            // First day should be a Sunday
            (0, vitest_1.expect)(firstDay.fullDate.getDay()).toBe(0); // Sunday
        });
        (0, vitest_1.it)('should detect today correctly', () => {
            const currentYear = new Date().getFullYear();
            const calendar = (0, index_1.generateYearCalendar)(currentYear, 'en-US', 'eu', false);
            let todayFound = false;
            for (const month of calendar) {
                for (const week of month.month) {
                    for (const day of week.weekDay) {
                        if (day.isToday) {
                            todayFound = true;
                            (0, vitest_1.expect)(day.fullDate.toDateString()).toBe(new Date().toDateString());
                        }
                    }
                }
            }
            (0, vitest_1.expect)(todayFound).toBe(true);
        });
        (0, vitest_1.it)('should detect weekends correctly', () => {
            const calendar = (0, index_1.generateYearCalendar)(2025, 'en-US', 'eu', false);
            const firstWeek = calendar[0].month[0];
            // Check that Saturday and Sunday are marked as weekends
            firstWeek.weekDay.forEach((day) => {
                const dayOfWeek = day.fullDate.getDay();
                if (dayOfWeek === 0 || dayOfWeek === 6) {
                    (0, vitest_1.expect)(day.isWeekend).toBe(true);
                }
                else {
                    (0, vitest_1.expect)(day.isWeekend).toBe(false);
                }
            });
        });
        (0, vitest_1.it)('should generate correct ISO strings', () => {
            const calendar = (0, index_1.generateYearCalendar)(2025, 'en-US', 'eu', false);
            const firstDay = calendar[0].month[0].weekDay.find((d) => d.date === 1 && d.isCurrentMonth);
            (0, vitest_1.expect)(firstDay?.isoString).toBe('2025-01-01');
            (0, vitest_1.expect)(firstDay?.isoStringWithTime).toContain('2025-01-01');
        });
        (0, vitest_1.it)('should throw error for invalid year', () => {
            (0, vitest_1.expect)(() => (0, index_1.generateYearCalendar)(1800, 'en-US', 'eu', false)).toThrow('Invalid year');
            (0, vitest_1.expect)(() => (0, index_1.generateYearCalendar)(2200, 'en-US', 'eu', false)).toThrow('Invalid year');
        });
        (0, vitest_1.it)('should use cache on second call', () => {
            const start1 = Date.now();
            const calendar1 = (0, index_1.generateYearCalendar)(2025, 'en-US', 'eu', false);
            const time1 = Date.now() - start1;
            const start2 = Date.now();
            const calendar2 = (0, index_1.generateYearCalendar)(2025, 'en-US', 'eu', false);
            const time2 = Date.now() - start2;
            // Second call should be significantly faster (cached)
            (0, vitest_1.expect)(time2).toBeLessThan(time1);
            (0, vitest_1.expect)(calendar1).toEqual(calendar2);
        });
        (0, vitest_1.it)('should start from current month when flag is true', () => {
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth();
            const calendar = (0, index_1.generateYearCalendar)(currentYear, 'en-US', 'eu', true);
            (0, vitest_1.expect)(calendar.length).toBe(12 - currentMonth);
            (0, vitest_1.expect)(calendar[0].monthIndex).toBe(currentMonth);
        });
    });
});
