"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIRST_DAY_OF_WEEK = exports.DAYS_IN_WEEK = exports.MAX_YEAR = exports.MIN_YEAR = exports.DEFAULT_YEAR_CACHE_SIZE = exports.DEFAULT_CACHE_SIZE = void 0;
/**
 * Default cache size limits
 */
exports.DEFAULT_CACHE_SIZE = 2000;
exports.DEFAULT_YEAR_CACHE_SIZE = 3;
/**
 * Valid year range
 */
exports.MIN_YEAR = 1900;
exports.MAX_YEAR = 2100;
/**
 * Days in a week
 */
exports.DAYS_IN_WEEK = 7;
/**
 * First day of week by calendar style
 * EU: Monday (1), AM: Sunday (0)
 */
exports.FIRST_DAY_OF_WEEK = {
    eu: 1,
    am: 0,
};
