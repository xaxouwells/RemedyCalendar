"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCalendarStyle = exports.validateLocaleCode = exports.validateYear = void 0;
const constants_1 = require("../constants");
/**
 * Validates year parameter
 *
 * @param year - Year to validate
 * @throws Error if year is invalid
 */
const validateYear = (year) => {
    if (!Number.isInteger(year)) {
        throw new Error(`Invalid year: ${year}. Year must be an integer.`);
    }
    if (year < constants_1.MIN_YEAR || year > constants_1.MAX_YEAR) {
        throw new Error(`Invalid year: ${year}. Year must be between ${constants_1.MIN_YEAR} and ${constants_1.MAX_YEAR}.`);
    }
};
exports.validateYear = validateYear;
/**
 * Validates locale code parameter
 *
 * @param localeCode - Locale code to validate
 * @throws Error if locale code is invalid
 */
const validateLocaleCode = (localeCode) => {
    const validLocales = ['fr-FR', 'en-US', 'es-ES', 'de-DE'];
    if (!validLocales.includes(localeCode)) {
        throw new Error(`Invalid locale code: ${localeCode}. Must be one of: ${validLocales.join(', ')}`);
    }
};
exports.validateLocaleCode = validateLocaleCode;
/**
 * Validates calendar style parameter
 *
 * @param calendarStyle - Calendar style to validate
 * @throws Error if calendar style is invalid
 */
const validateCalendarStyle = (calendarStyle) => {
    const validStyles = ['eu', 'am'];
    if (!validStyles.includes(calendarStyle)) {
        throw new Error(`Invalid calendar style: ${calendarStyle}. Must be one of: ${validStyles.join(', ')}`);
    }
};
exports.validateCalendarStyle = validateCalendarStyle;
