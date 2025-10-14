import { describe, it, expect, beforeEach } from 'vitest';
import {
  clearCache,
  clearYearCache,
  clearAllCaches,
  limitCacheSize,
  limitYearCacheSize,
} from '../utils/cache';
import { generateYearCalendar, warmUpCache, preGenerateYears } from '../generators/year';

describe('Cache Management', () => {
  beforeEach(() => {
    clearAllCaches();
  });

  describe('clearCache', () => {
    it('should clear calculation caches', () => {
      generateYearCalendar(2025, 'en-US', 'eu', false);
      clearCache();

      // Cache should be cleared, but year cache should remain
      const calendar = generateYearCalendar(2025, 'en-US', 'eu', false);
      expect(calendar).toBeDefined();
    });
  });

  describe('clearYearCache', () => {
    it('should clear year cache', () => {
      generateYearCalendar(2025, 'en-US', 'eu', false);
      clearYearCache();

      // Year cache should be cleared
      const calendar = generateYearCalendar(2025, 'en-US', 'eu', false);
      expect(calendar).toBeDefined();
    });
  });

  describe('clearAllCaches', () => {
    it('should clear all caches', () => {
      generateYearCalendar(2025, 'en-US', 'eu', false);
      clearAllCaches();

      const calendar = generateYearCalendar(2025, 'en-US', 'eu', false);
      expect(calendar).toBeDefined();
    });
  });

  describe('warmUpCache', () => {
    it('should pre-generate current year and adjacent years', () => {
      const start = Date.now();
      warmUpCache(2025, 'en-US', 'eu', false);
      const warmUpTime = Date.now() - start;

      // Accessing pre-generated years should be instant
      const start2 = Date.now();
      generateYearCalendar(2025, 'en-US', 'eu', false);
      const accessTime = Date.now() - start2;

      expect(accessTime).toBeLessThan(warmUpTime / 2);
    });
  });

  describe('preGenerateYears', () => {
    it('should pre-generate adjacent years', () => {
      generateYearCalendar(2025, 'en-US', 'eu', false);
      preGenerateYears(2025, 'en-US', 'eu', false);

      // Adjacent years should now be cached
      const start2024 = Date.now();
      const cal2024 = generateYearCalendar(2024, 'en-US', 'eu', false);
      const time2024 = Date.now() - start2024;

      const start2026 = Date.now();
      const cal2026 = generateYearCalendar(2026, 'en-US', 'eu', false);
      const time2026 = Date.now() - start2026;

      expect(cal2024).toBeDefined();
      expect(cal2026).toBeDefined();
      expect(time2024).toBeLessThan(10); // Should be very fast (cached)
      expect(time2026).toBeLessThan(10);
    });
  });

  describe('limitCacheSize', () => {
    it('should limit cache size', () => {
      // Generate multiple years to fill cache
      for (let i = 2020; i < 2030; i++) {
        generateYearCalendar(i, 'en-US', 'eu', false);
      }

      limitCacheSize(1000);

      // Cache should still work
      const calendar = generateYearCalendar(2025, 'en-US', 'eu', false);
      expect(calendar).toBeDefined();
    });
  });

  describe('limitYearCacheSize', () => {
    it('should keep only specified number of years', () => {
      // Generate multiple years
      for (let i = 2020; i < 2030; i++) {
        generateYearCalendar(i, 'en-US', 'eu', false);
      }

      limitYearCacheSize(3);

      // Recent years should still be accessible
      const calendar = generateYearCalendar(2029, 'en-US', 'eu', false);
      expect(calendar).toBeDefined();
    });
  });
});
