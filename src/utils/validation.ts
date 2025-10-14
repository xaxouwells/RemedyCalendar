import { MIN_YEAR, MAX_YEAR } from '../constants';
import type { LocaleCode, CalendarStyle } from '../types';

/**
 * Validates year parameter
 *
 * @param year - Year to validate
 * @throws Error if year is invalid
 */
export const validateYear = (year: number): void => {
  if (!Number.isInteger(year)) {
    throw new Error(`Invalid year: ${year}. Year must be an integer.`);
  }

  if (year < MIN_YEAR || year > MAX_YEAR) {
    throw new Error(`Invalid year: ${year}. Year must be between ${MIN_YEAR} and ${MAX_YEAR}.`);
  }
};

/**
 * Validates locale code parameter
 *
 * @param localeCode - Locale code to validate
 * @throws Error if locale code is invalid
 */
export const validateLocaleCode = (localeCode: LocaleCode): void => {
  const validLocales: LocaleCode[] = ['fr-FR', 'en-US', 'es-ES', 'de-DE'];

  if (!validLocales.includes(localeCode)) {
    throw new Error(
      `Invalid locale code: ${localeCode}. Must be one of: ${validLocales.join(', ')}`
    );
  }
};

/**
 * Validates calendar style parameter
 *
 * @param calendarStyle - Calendar style to validate
 * @throws Error if calendar style is invalid
 */
export const validateCalendarStyle = (calendarStyle: CalendarStyle): void => {
  const validStyles: CalendarStyle[] = ['eu', 'am'];

  if (!validStyles.includes(calendarStyle)) {
    throw new Error(
      `Invalid calendar style: ${calendarStyle}. Must be one of: ${validStyles.join(', ')}`
    );
  }
};
