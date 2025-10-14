"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMonth = void 0;
const dateHelpers_1 = require("../utils/dateHelpers");
const week_1 = require("./week");
/**
 * Generates a calendar month with all its weeks and days
 *
 * @param year - Year of the month
 * @param monthIndex - Month index (0-11)
 * @param localeCode - Locale for date formatting
 * @param calendarStyle - Calendar style ('eu' or 'am')
 * @returns Calendar month object
 */
const generateMonth = (year, monthIndex, localeCode, calendarStyle) => {
    const monthStart = new Date(year, monthIndex, 1);
    return {
        monthIndex,
        monthName: (0, dateHelpers_1.getFormat)(monthStart, 'monthName', localeCode),
        monthYear: (0, dateHelpers_1.getFormat)(monthStart, 'monthYear', localeCode),
        month: (0, week_1.generateMonthWeeks)(monthStart, localeCode, calendarStyle),
    };
};
exports.generateMonth = generateMonth;
