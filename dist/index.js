"use strict";
/**
 * Remedy Calendar - Ultra-fast calendar generator with intelligent caching
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.limitYearCacheSize = exports.limitCacheSize = exports.clearAllCaches = exports.clearYearCache = exports.clearCache = exports.generateMonth = exports.warmUpCache = exports.preGenerateYears = exports.generateYearCalendar = void 0;
// Export main calendar generator
var year_1 = require("./generators/year");
Object.defineProperty(exports, "generateYearCalendar", { enumerable: true, get: function () { return year_1.generateYearCalendar; } });
Object.defineProperty(exports, "preGenerateYears", { enumerable: true, get: function () { return year_1.preGenerateYears; } });
Object.defineProperty(exports, "warmUpCache", { enumerable: true, get: function () { return year_1.warmUpCache; } });
// Export month generator
var month_1 = require("./generators/month");
Object.defineProperty(exports, "generateMonth", { enumerable: true, get: function () { return month_1.generateMonth; } });
// Export cache management utilities
var cache_1 = require("./utils/cache");
Object.defineProperty(exports, "clearCache", { enumerable: true, get: function () { return cache_1.clearCache; } });
Object.defineProperty(exports, "clearYearCache", { enumerable: true, get: function () { return cache_1.clearYearCache; } });
Object.defineProperty(exports, "clearAllCaches", { enumerable: true, get: function () { return cache_1.clearAllCaches; } });
Object.defineProperty(exports, "limitCacheSize", { enumerable: true, get: function () { return cache_1.limitCacheSize; } });
Object.defineProperty(exports, "limitYearCacheSize", { enumerable: true, get: function () { return cache_1.limitYearCacheSize; } });
// Export default
var year_2 = require("./generators/year");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return year_2.generateYearCalendar; } });
