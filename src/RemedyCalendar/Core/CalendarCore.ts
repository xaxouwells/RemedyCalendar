import { 
  startOfYear, 
  endOfYear, 
  eachMonthOfInterval, 
  eachWeekOfInterval,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  getWeek,
  isToday,
  isWeekend,
  isSameMonth,
  endOfMonth,
  type Locale
} from 'date-fns'
import { fr, enUS, es, de } from 'date-fns/locale'

/**
 * Génère un calendrier annuel avec la structure exacte demandée
 * @param {number} year - L'année à générer 
 * @param {string} localeCode - Code locale ('fr-FR', 'en-US', etc.)
 * @returns {Array} Tableau avec structure [{monthName, month: [...]}]
 */
type localeCode = 'fr-FR' | 'en-US' | 'es-ES' | 'de-DE';

const generateMonthWeeks = (monthStart: Date, locale:Locale, calendarStyle: 'eu' | 'am') => {
  const monthEnd = endOfMonth(monthStart)
  const weekStartsOnValue = calendarStyle === 'eu' ? 1 : 0
  // Obtenir la première et dernière semaine qui touchent le mois
  const firstWeekStart = startOfWeek(monthStart, { weekStartsOn:weekStartsOnValue}) // Lundi
  const lastWeekEnd = endOfWeek(monthEnd,  { weekStartsOn: weekStartsOnValue})
  
  // Générer toutes les semaines du mois
  const weeks = eachWeekOfInterval(
    { start: firstWeekStart, end: lastWeekEnd },
    { weekStartsOn: weekStartsOnValue}
  )
  
  return weeks.map((weekStart, index) => {
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: weekStartsOnValue })
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })
    
    return {
      id: index,
      beginDate: weekStart.getTime(), // Timestamp en millisecondes
      endDate: weekEnd.getTime(),     // Timestamp en millisecondes
      weekDay: weekDays.map(day => ({
        date: day.getDate(),
        fullDate: day,
        dayName: format(day, 'EEEE', { locale }),
        dayShort: format(day, 'EEEEEE', { locale }),
        isCurrentMonth: isSameMonth(day, monthStart),
        dayInitial: format(day, 'EEEEEE', { locale }), 
        isToday: isToday(day),
        isWeekend: isWeekend(day),
        weekNumber: getWeek(day),
        isoString: format(day, 'yyyy-MM-dd'),
      }))
    }
  })
};

const generateYearCalendar = (year:number, localeCode:localeCode, calendarStyle: 'eu' | 'am') => {
  // Mapping des codes locale vers les locales date-fns
  const localeMap = {
    'fr-FR': fr,
    'en-US': enUS,
    'es-ES': es,
    'de-DE': de
  }
  
  const locale = localeMap[localeCode] || fr;
  
  const yearStart = startOfYear(new Date(year, 0, 1))
  const yearEnd = endOfYear(new Date(year, 0, 1))
  
  // Obtenir tous les mois de l'année
  const months = eachMonthOfInterval({ start: yearStart, end: yearEnd })
  
  return months.map(monthStart => ({
    monthName: format(monthStart, 'MMMM', { locale }),
    month: generateMonthWeeks(monthStart, locale, calendarStyle),
    
  }))
};

/**
 * Génère les semaines d'un mois avec la structure demandée
 * @param {Date} monthStart - Premier jour du mois
 * @param {Object} locale - Locale date-fns
 * @returns {Array} Semaines avec structure {id, beginDate, endDate, weekDay}
 */


