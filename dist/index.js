"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.warmUpCache = exports.limitYearCacheSize = exports.limitCacheSize = exports.clearAllCaches = exports.clearYearCache = exports.clearCache = exports.preGenerateYears = exports.generateYearCalendar = void 0;
// Export main calendar generator
var calendar_1 = require("./calendar");
Object.defineProperty(exports, "generateYearCalendar", { enumerable: true, get: function () { return __importDefault(calendar_1).default; } });
// Export utility functions
var calendar_2 = require("./calendar");
Object.defineProperty(exports, "preGenerateYears", { enumerable: true, get: function () { return calendar_2.preGenerateYears; } });
Object.defineProperty(exports, "clearCache", { enumerable: true, get: function () { return calendar_2.clearCache; } });
Object.defineProperty(exports, "clearYearCache", { enumerable: true, get: function () { return calendar_2.clearYearCache; } });
Object.defineProperty(exports, "clearAllCaches", { enumerable: true, get: function () { return calendar_2.clearAllCaches; } });
Object.defineProperty(exports, "limitCacheSize", { enumerable: true, get: function () { return calendar_2.limitCacheSize; } });
Object.defineProperty(exports, "limitYearCacheSize", { enumerable: true, get: function () { return calendar_2.limitYearCacheSize; } });
Object.defineProperty(exports, "warmUpCache", { enumerable: true, get: function () { return calendar_2.warmUpCache; } });
