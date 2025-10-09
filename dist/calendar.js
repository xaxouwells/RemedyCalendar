"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warmUpCache = exports.limitYearCacheSize = exports.limitCacheSize = exports.clearAllCaches = exports.clearYearCache = exports.clearCache = exports.preGenerateYears = void 0;
// Cache ultra-rapide pour les calculs individuels (jours, formats, etc.)
const calendarCache = new Map();
// Cache spécifique pour les années complètes - OPTIMISÉ
const yearCalendarCache = new Map();
// Helper pour obtenir le premier jour de la semaine
function getFirstDayOfWeek(calendarStyle) {
    return calendarStyle === 'eu' ? 1 : 0; // EU: Lundi=1, AM: Dimanche=0
}
// Helper pour formater les noms de jours/mois - OPTIMISÉ
function getFormat(date, type, localeCode) {
    const cacheKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${type}-${localeCode}`;
    if (calendarCache.has(cacheKey)) {
        return calendarCache.get(cacheKey);
    }
    let result;
    switch (type) {
        case 'dayName':
            result = date.toLocaleDateString(localeCode, { weekday: 'long' });
            break;
        case 'dayShort':
            result = date.toLocaleDateString(localeCode, { weekday: 'narrow' });
            break;
        case 'monthName':
            result = date.toLocaleDateString(localeCode, { month: 'long' });
            break;
        case 'monthYear':
            result = date.toLocaleDateString(localeCode, { month: 'long', year: 'numeric' });
            break;
        default:
            result = '';
    }
    calendarCache.set(cacheKey, result);
    return result;
}
// Helper natif pour obtenir le numéro de semaine ISO - OPTIMISÉ
function getISOWeekNumber(date) {
    const cacheKey = `week-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    if (calendarCache.has(cacheKey)) {
        return calendarCache.get(cacheKey);
    }
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNumber = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    calendarCache.set(cacheKey, weekNumber);
    return weekNumber;
}
// Helper natif pour obtenir le début/fin de semaine - OPTIMISÉ
function getWeekBounds(date, firstDayOfWeek) {
    const cacheKey = `bounds-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${firstDayOfWeek}`;
    if (calendarCache.has(cacheKey)) {
        return calendarCache.get(cacheKey);
    }
    const day = date.getDay();
    const diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek;
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - diff);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    const result = { start: weekStart, end: weekEnd };
    calendarCache.set(cacheKey, result);
    return result;
}
// Helper natif pour générer les jours d'une semaine - ULTRA OPTIMISÉ
function generateWeekDays(weekStart, monthStart, localeCode) {
    const weekKey = `week-${weekStart.getTime()}-${monthStart.getTime()}-${localeCode}`;
    // Cache complet de la semaine
    if (calendarCache.has(weekKey)) {
        return calendarCache.get(weekKey);
    }
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTime = today.getTime();
    for (let i = 0; i < 7; i++) {
        const day = new Date(weekStart);
        day.setDate(weekStart.getDate() + i);
        const dayKey = `day-${day.getTime()}-${monthStart.getTime()}-${localeCode}`;
        if (calendarCache.has(dayKey)) {
            days.push(calendarCache.get(dayKey));
            continue;
        }
        // Calculs natifs ultra-rapides
        const dayTime = day.getTime();
        const isCurrentMonth = day.getMonth() === monthStart.getMonth();
        const isToday = dayTime === todayTime;
        const isWeekend = day.getDay() === 0 || day.getDay() === 6;
        // Formats ISO natifs pré-calculés
        const year = day.getFullYear();
        const month = day.getMonth() + 1;
        const date = day.getDate();
        const isoString = `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
        const fullDateUTC = day.toISOString();
        const dateUTC = fullDateUTC.split('T')[0];
        const dayData = {
            date: date,
            fullDate: day,
            fullDateUTC,
            dateUTC,
            dayName: getFormat(day, 'dayName', localeCode),
            dayShort: getFormat(day, 'dayShort', localeCode),
            isCurrentMonth,
            dayInitial: getFormat(day, 'dayShort', localeCode),
            isToday,
            isWeekend,
            weekNumber: getISOWeekNumber(day),
            isoString,
            isoStringUTC: fullDateUTC,
        };
        calendarCache.set(dayKey, dayData);
        days.push(dayData);
    }
    // Cache la semaine complète
    calendarCache.set(weekKey, days);
    return days;
}
// Génération ultra-rapide des semaines d'un mois - OPTIMISÉ
function generateMonthWeeks(monthStart, localeCode, calendarStyle) {
    const monthKey = `month-${monthStart.getTime()}-${localeCode}-${calendarStyle}`;
    if (calendarCache.has(monthKey)) {
        return calendarCache.get(monthKey);
    }
    const firstDayOfWeek = getFirstDayOfWeek(calendarStyle);
    // Obtenir la première et dernière semaine du mois
    const firstDayOfMonth = new Date(monthStart.getFullYear(), monthStart.getMonth(), 1);
    const lastDayOfMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
    const firstWeek = getWeekBounds(firstDayOfMonth, firstDayOfWeek);
    const lastWeek = getWeekBounds(lastDayOfMonth, firstDayOfWeek);
    const weeks = [];
    let currentWeekStart = new Date(firstWeek.start);
    let weekId = 0;
    while (currentWeekStart <= lastWeek.start) {
        const weekBounds = getWeekBounds(currentWeekStart, firstDayOfWeek);
        weeks.push({
            id: weekId,
            beginDate: weekBounds.start.getTime(),
            endDate: weekBounds.end.getTime(),
            beginDateUTC: weekBounds.start.toISOString(),
            endDateUTC: weekBounds.end.toISOString(),
            beginDateUTConly: weekBounds.start.toISOString().split('T')[0],
            endDateUTConly: weekBounds.end.toISOString().split('T')[0],
            weekDay: generateWeekDays(weekBounds.start, monthStart, localeCode)
        });
        // Passer à la semaine suivante
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        weekId++;
    }
    calendarCache.set(monthKey, weeks);
    return weeks;
}
/**
 * Générateur de calendrier ULTRA-RAPIDE avec cache intelligent par année
 */
const generateYearCalendar = (year, localeCode, calendarStyle, startFromCurrentMonth = false) => {
    // Créer une clé de cache unique pour cette configuration d'année
    const cacheKey = `${year}-${localeCode}-${calendarStyle}-${startFromCurrentMonth}`;
    // CACHE HIT - Retour instantané
    if (yearCalendarCache.has(cacheKey)) {
        return yearCalendarCache.get(cacheKey);
    }
    let startMonth = 0;
    let endMonth = 11;
    if (startFromCurrentMonth) {
        const now = new Date();
        const currentYear = now.getFullYear();
        if (year === currentYear) {
            startMonth = now.getMonth();
        }
    }
    const months = [];
    // Génération optimisée des mois
    for (let monthIndex = startMonth; monthIndex <= endMonth; monthIndex++) {
        const monthStart = new Date(year, monthIndex, 1);
        months.push({
            monthIndex,
            monthName: getFormat(monthStart, 'monthName', localeCode),
            monthYear: getFormat(monthStart, 'monthYear', localeCode),
            month: generateMonthWeeks(monthStart, localeCode, calendarStyle),
        });
    }
    // Stocker le résultat en cache IMMÉDIATEMENT
    yearCalendarCache.set(cacheKey, months);
    return months;
};
// Fonction pour pré-générer SEULEMENT les années adjacentes (simple)
const preGenerateYears = (baseYear, localeCode, calendarStyle, startFromCurrentMonth = false) => {
    let generated = 0;
    const adjacentYears = [baseYear - 1, baseYear + 1];
    adjacentYears.forEach(targetYear => {
        const cacheKey = `${targetYear}-${localeCode}-${calendarStyle}-${startFromCurrentMonth}`;
        if (!yearCalendarCache.has(cacheKey)) {
            generateYearCalendar(targetYear, localeCode, calendarStyle, startFromCurrentMonth);
            generated++;
        }
    });
};
exports.preGenerateYears = preGenerateYears;
// Fonction pour nettoyer le cache des jours/formats
const clearCache = () => {
    calendarCache.clear();
};
exports.clearCache = clearCache;
// Fonction pour nettoyer le cache des années
const clearYearCache = () => {
    yearCalendarCache.clear();
};
exports.clearYearCache = clearYearCache;
// Fonction pour nettoyer tous les caches
const clearAllCaches = () => {
    calendarCache.clear();
    yearCalendarCache.clear();
};
exports.clearAllCaches = clearAllCaches;
// Fonction pour limiter la taille du cache des calculs
const limitCacheSize = (maxSize = 2000) => {
    if (calendarCache.size > maxSize) {
        const keysToDelete = Array.from(calendarCache.keys()).slice(0, calendarCache.size - maxSize);
        keysToDelete.forEach(key => calendarCache.delete(key));
    }
};
exports.limitCacheSize = limitCacheSize;
// Fonction pour limiter la taille du cache des années - SIMPLE
const limitYearCacheSize = (maxYears = 3) => {
    if (yearCalendarCache.size > maxYears) {
        const entries = Array.from(yearCalendarCache.entries());
        const sortedEntries = entries.sort((a, b) => {
            const yearA = parseInt(a[0].split('-')[0]);
            const yearB = parseInt(b[0].split('-')[0]);
            return yearB - yearA; // Décroissant
        });
        yearCalendarCache.clear();
        const toKeep = sortedEntries.slice(0, maxYears);
        toKeep.forEach(([key, value]) => {
            yearCalendarCache.set(key, value);
        });
    }
};
exports.limitYearCacheSize = limitYearCacheSize;
const warmUpCache = (currentYear, localeCode, calendarStyle, startFromCurrentMonth = false) => {
    generateYearCalendar(currentYear, localeCode, calendarStyle, startFromCurrentMonth);
    (0, exports.preGenerateYears)(currentYear, localeCode, calendarStyle, startFromCurrentMonth);
};
exports.warmUpCache = warmUpCache;
exports.default = generateYearCalendar;
