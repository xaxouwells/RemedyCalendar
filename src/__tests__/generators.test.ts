import { describe, it, expect, beforeEach } from 'vitest';
import { generateYearCalendar, clearAllCaches } from '../index';

describe('Calendar Generator', () => {
  beforeEach(() => {
    clearAllCaches();
  });

  describe('generateYearCalendar', () => {
    it('should generate 12 months for a full year', () => {
      const calendar = generateYearCalendar(2025, 'en-US', 'eu', false);

      expect(calendar).toHaveLength(12);
      expect(calendar[0].monthName).toBe('January');
      expect(calendar[11].monthName).toBe('December');
    });

    it('should generate correct months for French locale', () => {
      const calendar = generateYearCalendar(2025, 'fr-FR', 'eu', false);

      expect(calendar[0].monthName).toBe('janvier');
      expect(calendar[11].monthName).toBe('décembre');
    });

    it('should start week on Monday for EU style', () => {
      const calendar = generateYearCalendar(2025, 'en-US', 'eu', false);
      const firstWeek = calendar[0].month[0];
      const firstDay = firstWeek.weekDay[0];

      // January 1, 2025 is a Wednesday, so first day of week should be December 30, 2024 (Monday)
      expect(firstDay.fullDate.getDay()).toBe(1); // Monday
    });

    it('should start week on Sunday for AM style', () => {
      const calendar = generateYearCalendar(2025, 'en-US', 'am', false);
      const firstWeek = calendar[0].month[0];
      const firstDay = firstWeek.weekDay[0];

      // First day should be a Sunday
      expect(firstDay.fullDate.getDay()).toBe(0); // Sunday
    });

    it('should detect today correctly', () => {
      const currentYear = new Date().getFullYear();
      const calendar = generateYearCalendar(currentYear, 'en-US', 'eu', false);

      let todayFound = false;
      for (const month of calendar) {
        for (const week of month.month) {
          for (const day of week.weekDay) {
            if (day.isToday) {
              todayFound = true;
              expect(day.fullDate.toDateString()).toBe(new Date().toDateString());
            }
          }
        }
      }

      expect(todayFound).toBe(true);
    });

    it('should detect weekends correctly', () => {
      const calendar = generateYearCalendar(2025, 'en-US', 'eu', false);
      const firstWeek = calendar[0].month[0];

      // Check that Saturday and Sunday are marked as weekends
      firstWeek.weekDay.forEach((day) => {
        const dayOfWeek = day.fullDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          expect(day.isWeekend).toBe(true);
        } else {
          expect(day.isWeekend).toBe(false);
        }
      });
    });

    it('should generate correct ISO strings', () => {
      const calendar = generateYearCalendar(2025, 'en-US', 'eu', false);
      const firstDay = calendar[0].month[0].weekDay.find((d) => d.date === 1 && d.isCurrentMonth);

      expect(firstDay?.isoString).toBe('2025-01-01');
      expect(firstDay?.isoStringWithTime).toContain('2025-01-01');
    });

    it('should throw error for invalid year', () => {
      expect(() => generateYearCalendar(1800, 'en-US', 'eu', false)).toThrow('Invalid year');
      expect(() => generateYearCalendar(2200, 'en-US', 'eu', false)).toThrow('Invalid year');
    });

    it('should use cache on second call', () => {
      const start1 = Date.now();
      const calendar1 = generateYearCalendar(2025, 'en-US', 'eu', false);
      const time1 = Date.now() - start1;

      const start2 = Date.now();
      const calendar2 = generateYearCalendar(2025, 'en-US', 'eu', false);
      const time2 = Date.now() - start2;

      // Second call should be significantly faster (cached)
      expect(time2).toBeLessThan(time1);
      expect(calendar1).toEqual(calendar2);
    });

    it('should start from current month when flag is true', () => {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const calendar = generateYearCalendar(currentYear, 'en-US', 'eu', true);

      expect(calendar.length).toBe(12 - currentMonth);
      expect(calendar[0].monthIndex).toBe(currentMonth);
    });
  });
});
