/**
 * Supported locale codes for date formatting
 */
export type LocaleCode = 'fr-FR' | 'en-US' | 'es-ES' | 'de-DE';

/**
 * Calendar style: 'eu' starts weeks on Monday, 'am' starts on Sunday
 */
export type CalendarStyle = 'eu' | 'am';

/**
 * Represents a single day in the calendar
 */
export interface IRemedyCalendarDay {
  /** Day of the month (1-31) */
  date: number;

  /** Full Date object */
  fullDate: Date;

  /** Full ISO string with time (e.g., "2025-01-15T00:00:00.000Z") */
  isoStringWithTime: string;

  /** ISO date string without time (e.g., "2025-01-15") */
  isoString: string;

  /** Full day name (e.g., "Monday", "Lundi") */
  dayName: string;

  /** Short day name (e.g., "M", "L") */
  dayShort: string;

  /** Whether this day belongs to the current month being displayed */
  isCurrentMonth: boolean;

  /** Whether this day is today */
  isToday: boolean;

  /** Whether this day is a weekend (Saturday or Sunday) */
  isWeekend: boolean;

  /** ISO week number (1-53) */
  weekNumber: number;
}

/**
 * Represents a week in the calendar
 */
export interface IRemedyCalendarWeek {
  /** Week ID within the month (0-indexed) */
  id: number;

  /** Week start timestamp (milliseconds) */
  beginDate: number;

  /** Week end timestamp (milliseconds) */
  endDate: number;

  /** Week start ISO string with time */
  beginDateUTC: string;

  /** Week end ISO string with time */
  endDateUTC: string;

  /** Week start ISO date string (YYYY-MM-DD) */
  beginDateUTConly: string;

  /** Week end ISO date string (YYYY-MM-DD) */
  endDateUTConly: string;

  /** Array of 7 days in the week */
  weekDay: IRemedyCalendarDay[];
}

/**
 * Represents a month in the calendar
 */
export interface IRemedyCalendarMonth {
  /** Month index (0-11) */
  monthIndex: number;

  /** Full month name (e.g., "January", "Janvier") */
  monthName: string;

  /** Month and year (e.g., "January 2025", "Janvier 2025") */
  monthYear: string;

  /** Array of weeks in the month */
  month: IRemedyCalendarWeek[];
}

/**
 * Cache configuration options
 */
export interface CacheOptions {
  /** Maximum size for calculation cache (default: 2000) */
  maxSize?: number;

  /** Maximum number of years to keep in cache (default: 3) */
  maxYears?: number;
}

/**
 * Type for calculation cache values (strings, numbers, week bounds)
 */
export type CalculationCacheValue = string | number | { start: Date; end: Date };

/**
 * Type for day cache values
 */
export type DayCacheValue = IRemedyCalendarDay;

/**
 * Type for week cache values
 */
export type WeekCacheValue = IRemedyCalendarDay[];

/**
 * Type for month cache values
 */
export type MonthCacheValue = IRemedyCalendarWeek[];
