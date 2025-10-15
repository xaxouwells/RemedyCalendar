/**
 * Default cache size limits
 */
export const DEFAULT_CACHE_SIZE = 2000;
export const DEFAULT_YEAR_CACHE_SIZE = 3;

/**
 * Valid year range
 */
export const MIN_YEAR = 1900;
export const MAX_YEAR = 2100;

/**
 * Days in a week
 */
export const DAYS_IN_WEEK = 7;

/**
 * First day of week by calendar style
 * EU: Monday (1), AM: Sunday (0)
 */
export const FIRST_DAY_OF_WEEK = {
  eu: 1,
  am: 0,
} as const;
