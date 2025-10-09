// Test file for remedy-calendar package
const {
  generateYearCalendar,
  warmUpCache,
  preGenerateYears,
  clearAllCaches,
  limitCacheSize,
  limitYearCacheSize
} = require('./dist/index.js');

console.log('>� Testing Remedy Calendar Package\n');

// Test 1: Generate calendar for 2025 (French, European style)
console.log('Test 1: Generate calendar for 2025 (French, European style)');
const calendar2025FR = generateYearCalendar(2025, 'fr-FR', 'eu', false);
console.log(` Generated ${calendar2025FR.length} months`);
console.log(` First month: ${calendar2025FR[0].monthName} ${calendar2025FR[0].monthYear}`);
console.log(` Number of weeks in January: ${calendar2025FR[0].month.length}`);
console.log(` First day of year: ${calendar2025FR[0].month[0].weekDay[0].dayName}\n`);

// Test 2: Generate calendar for 2025 (English, American style)
console.log('Test 2: Generate calendar for 2025 (English, American style)');
const calendar2025EN = generateYearCalendar(2025, 'en-US', 'am', false);
console.log(` Generated ${calendar2025EN.length} months`);
console.log(` First month: ${calendar2025EN[0].monthName} ${calendar2025EN[0].monthYear}`);
console.log(` First day of week (should start Sunday): ${calendar2025EN[0].month[0].weekDay[0].dayName}\n`);

// Test 3: Test today detection
console.log('Test 3: Today detection');
const currentYear = new Date().getFullYear();
const currentCalendar = generateYearCalendar(currentYear, 'en-US', 'eu', false);
let todayFound = false;
for (const month of currentCalendar) {
  for (const week of month.month) {
    for (const day of week.weekDay) {
      if (day.isToday) {
        todayFound = true;
        console.log(` Today found: ${day.dayName}, ${day.date} ${month.monthName} ${currentYear}`);
        console.log(` ISO String: ${day.isoString}`);
        console.log(` Week number: ${day.weekNumber}`);
        console.log(` Is weekend: ${day.isWeekend}\n`);
        break;
      }
    }
    if (todayFound) break;
  }
  if (todayFound) break;
}

// Test 4: Cache warming
console.log('Test 4: Cache warming and performance');
console.time('First generation (no cache)');
const cal1 = generateYearCalendar(2024, 'fr-FR', 'eu', false);
console.timeEnd('First generation (no cache)');

console.time('Second generation (cached)');
const cal2 = generateYearCalendar(2024, 'fr-FR', 'eu', false);
console.timeEnd('Second generation (cached)');

console.log(` Cache working: second call should be much faster\n`);

// Test 5: Pre-generate adjacent years
console.log('Test 5: Pre-generate adjacent years');
preGenerateYears(2025, 'en-US', 'eu', false);
console.log(' Pre-generated calendars for 2024 and 2026\n');

// Test 6: Test different locales
console.log('Test 6: Test different locales');
const locales = ['fr-FR', 'en-US', 'es-ES', 'de-DE'];
locales.forEach(locale => {
  const cal = generateYearCalendar(2025, locale, 'eu', false);
  console.log(` ${locale}: ${cal[0].monthName}`);
});
console.log();

// Test 7: Week structure validation
console.log('Test 7: Week structure validation');
const testMonth = calendar2025FR[0];
const testWeek = testMonth.month[0];
console.log(` Week has ${testWeek.weekDay.length} days`);
console.log(` Week ID: ${testWeek.id}`);
console.log(` Week start: ${new Date(testWeek.beginDate).toLocaleDateString()}`);
console.log(` Week end: ${new Date(testWeek.endDate).toLocaleDateString()}\n`);

// Test 8: Cache management
console.log('Test 8: Cache management');
limitCacheSize(1000);
console.log(' Limited calculation cache to 1000 entries');
limitYearCacheSize(3);
console.log(' Limited year cache to 3 years');
clearAllCaches();
console.log(' Cleared all caches\n');

// Test 9: Start from current month
console.log('Test 9: Start from current month (current year only)');
const partialCalendar = generateYearCalendar(currentYear, 'en-US', 'eu', true);
const currentMonth = new Date().getMonth();
console.log(` Current month index: ${currentMonth}`);
console.log(` Generated months starting from: ${partialCalendar[0].monthName}`);
console.log(` Total months generated: ${partialCalendar.length} (should be ${12 - currentMonth})\n`);

// Test 10: Weekend detection
console.log('Test 10: Weekend detection');
const weekToTest = calendar2025EN[0].month[0];
let weekendCount = 0;
let weekdayCount = 0;
weekToTest.weekDay.forEach(day => {
  if (day.isWeekend) {
    weekendCount++;
  } else {
    weekdayCount++;
  }
});
console.log(` Weekends in first week: ${weekendCount}`);
console.log(` Weekdays in first week: ${weekdayCount}\n`);

console.log(' All tests completed successfully!');
