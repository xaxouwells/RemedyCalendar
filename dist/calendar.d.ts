export type localeCode = 'fr-FR' | 'en-US' | 'es-ES' | 'de-DE';
/**
 * Générateur de calendrier ULTRA-RAPIDE avec cache intelligent par année
 */
declare const generateYearCalendar: (year: number, localeCode: localeCode, calendarStyle: "eu" | "am", startFromCurrentMonth?: boolean) => any;
export declare const preGenerateYears: (baseYear: number, localeCode: localeCode, calendarStyle: "eu" | "am", startFromCurrentMonth?: boolean) => void;
export declare const clearCache: () => void;
export declare const clearYearCache: () => void;
export declare const clearAllCaches: () => void;
export declare const limitCacheSize: (maxSize?: number) => void;
export declare const limitYearCacheSize: (maxYears?: number) => void;
export declare const warmUpCache: (currentYear: number, localeCode: localeCode, calendarStyle: "eu" | "am", startFromCurrentMonth?: boolean) => void;
export default generateYearCalendar;
//# sourceMappingURL=calendar.d.ts.map