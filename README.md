# Remedy Calendar

Ultra-fast calendar generator with intelligent caching system for TypeScript/JavaScript applications.

## Features

- ⚡ **Ultra-fast performance** with intelligent multi-level caching
- 🔒 **TypeScript support** with full type definitions and type safety
- 🌍 **i18n support** for multiple locales (fr-FR, en-US, es-ES, de-DE)
- 📅 **Calendar styles** for European (Monday first) and American (Sunday first) formats
- 📊 **ISO week numbers** calculation
- 🎯 **Flexible API** for generating calendars by year, month, or week
- 🧹 **Cache management** utilities for optimal memory usage
- ✅ **100% tested** with comprehensive test suite
- 📦 **Zero dependencies** (only TypeScript for development)

## Installation

```bash
npm install remedy-calendar
```

## Usage

### Basic Example

```typescript
import generateYearCalendar from 'remedy-calendar';

// Generate a full year calendar
const calendar = generateYearCalendar(2025, 'en-US', 'eu', false);

console.log(calendar);
```

### API

#### `generateYearCalendar(year, localeCode, calendarStyle, startFromCurrentMonth)`

Generates a complete calendar for the specified year.

**Parameters:**

- `year` (number): The year to generate the calendar for (1900-2100)
- `localeCode` ('fr-FR' | 'en-US' | 'es-ES' | 'de-DE'): The locale for date formatting
- `calendarStyle` ('eu' | 'am'): Calendar style - 'eu' starts weeks on Monday, 'am' starts on Sunday
- `startFromCurrentMonth` (boolean, optional): If true and year is current year, starts from current month

**Returns:** Array of `IRemedyCalendarMonth` objects

**Throws:** Error if parameters are invalid

```typescript
// Example
const calendar = generateYearCalendar(2025, 'fr-FR', 'eu', false);
// Returns 12 months starting from January
```

#### `generateMonth(year, monthIndex, localeCode, calendarStyle)`

Generates a single month calendar.

**Parameters:**

- `year` (number): The year (1900-2100)
- `monthIndex` (number): Month index (0-11, where 0 is January)
- `localeCode` ('fr-FR' | 'en-US' | 'es-ES' | 'de-DE'): Locale for formatting
- `calendarStyle` ('eu' | 'am'): Calendar style

**Returns:** `IRemedyCalendarMonth` object

```typescript
import { generateMonth } from 'remedy-calendar';

// Generate only January 2025
const january = generateMonth(2025, 0, 'en-US', 'eu');
```

### Utility Functions

#### Cache Warming

Pre-generate calendars on app initialization for instant access:

```typescript
import { warmUpCache } from 'remedy-calendar';

// Pre-generate current year and adjacent years
warmUpCache(2025, 'en-US', 'eu', false);
```

#### Pre-generate Adjacent Years

```typescript
import { preGenerateYears } from 'remedy-calendar';

// Generate calendars for previous and next years
preGenerateYears(2025, 'en-US', 'eu', false);
// Generates 2024 and 2026
```

#### Cache Management

```typescript
import {
  clearCache,
  clearYearCache,
  clearAllCaches,
  limitCacheSize,
  limitYearCacheSize,
} from 'remedy-calendar';

// Clear all caches
clearAllCaches();

// Clear only calculation caches (keeps year cache)
clearCache();

// Clear only year cache (keeps calculation caches)
clearYearCache();

// Limit cache sizes
limitCacheSize(2000); // Limit calculation cache to 2000 entries per cache type
limitYearCacheSize(3); // Keep only 3 years in cache
```

### TypeScript Interfaces

```typescript
import type {
  IRemedyCalendarDay,
  IRemedyCalendarWeek,
  IRemedyCalendarMonth,
  LocaleCode,
  CalendarStyle,
} from 'remedy-calendar';
```

#### `IRemedyCalendarDay`

```typescript
interface IRemedyCalendarDay {
  date: number; // Day of the month (1-31)
  fullDate: Date; // Full Date object
  isoStringWithTime: string; // Full ISO string (e.g., "2025-01-15T00:00:00.000Z")
  isoString: string; // ISO date string (e.g., "2025-01-15")
  dayName: string; // Full day name (e.g., "Monday", "Lundi")
  dayShort: string; // Short day name (e.g., "M", "L")
  isCurrentMonth: boolean; // Whether day belongs to current month
  isToday: boolean; // Whether this day is today
  isWeekend: boolean; // Whether this day is a weekend
  weekNumber: number; // ISO week number (1-53)
}
```

#### `IRemedyCalendarWeek`

```typescript
interface IRemedyCalendarWeek {
  id: number; // Week ID within month (0-indexed)
  beginDate: number; // Week start timestamp (ms)
  endDate: number; // Week end timestamp (ms)
  beginDateUTC: string; // Week start ISO string with time
  endDateUTC: string; // Week end ISO string with time
  beginDateUTConly: string; // Week start ISO date (YYYY-MM-DD)
  endDateUTConly: string; // Week end ISO date (YYYY-MM-DD)
  weekDay: IRemedyCalendarDay[]; // Array of 7 days
}
```

#### `IRemedyCalendarMonth`

```typescript
interface IRemedyCalendarMonth {
  monthIndex: number; // Month index (0-11)
  monthName: string; // Full month name (e.g., "January", "Janvier")
  monthYear: string; // Month and year (e.g., "January 2025")
  month: IRemedyCalendarWeek[]; // Array of weeks in the month
}
```

## Examples

### Generate Calendar for Current Year (French locale, European style)

```typescript
import generateYearCalendar from 'remedy-calendar';

const calendar = generateYearCalendar(2025, 'fr-FR', 'eu', false);

// Access first month
const january = calendar[0];
console.log(january.monthName); // "janvier"

// Access first week of January
const firstWeek = january.month[0];
console.log(firstWeek.weekDay); // Array of 7 days
```

### Generate Calendar Starting from Current Month

```typescript
import generateYearCalendar from 'remedy-calendar';

const currentYear = new Date().getFullYear();
const calendar = generateYearCalendar(currentYear, 'en-US', 'am', true);
// Only generates months from current month onwards
```

### Using Cache for Better Performance

```typescript
import generateYearCalendar, { warmUpCache, preGenerateYears } from 'remedy-calendar';

// Warm up cache on app initialization
warmUpCache(2025, 'en-US', 'eu', false);

// Later requests will be instant
const calendar = generateYearCalendar(2025, 'en-US', 'eu', false); // Instant!

// Pre-generate adjacent years for navigation
preGenerateYears(2025, 'en-US', 'eu', false); // Generates 2024 and 2026
```

### Find Today's Date

```typescript
import generateYearCalendar from 'remedy-calendar';

const currentYear = new Date().getFullYear();
const calendar = generateYearCalendar(currentYear, 'en-US', 'eu', false);

// Find today
for (const month of calendar) {
  for (const week of month.month) {
    for (const day of week.weekDay) {
      if (day.isToday) {
        console.log(`Today is ${day.dayName}, ${day.date} ${month.monthName}`);
        console.log(`Week number: ${day.weekNumber}`);
      }
    }
  }
}
```

## Performance

Remedy Calendar uses a sophisticated multi-level caching system:

1. **Calculation Cache**: Caches individual date calculations, formats, and week calculations
2. **Day Cache**: Caches individual day objects
3. **Week Cache**: Caches complete weeks (7 days)
4. **Month Cache**: Caches complete months (weeks array)
5. **Year Cache**: Caches complete year calendars for instant retrieval

### Benchmarks

- **First generation**: ~30-40ms for a full year
- **Cached retrieval**: ~0.01ms (instant)
- **Memory efficient**: Built-in cache size limits

```typescript
// Example: Cache performance
const start1 = Date.now();
const calendar1 = generateYearCalendar(2025, 'en-US', 'eu', false);
console.log(`First call: ${Date.now() - start1}ms`); // ~35ms

const start2 = Date.now();
const calendar2 = generateYearCalendar(2025, 'en-US', 'eu', false);
console.log(`Cached call: ${Date.now() - start2}ms`); // ~0.01ms
```

## Development

### Scripts

```bash
# Build the project
npm run build

# Run tests (Vitest)
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run legacy tests
npm run test:legacy

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting
npm run format:check

# Type check without building
npm run typecheck
```

### Project Structure

```
src/
├── types/              # TypeScript type definitions
│   └── index.ts
├── constants.ts        # Constants and configuration
├── utils/             # Utility functions
│   ├── cache.ts       # Cache management
│   ├── dateHelpers.ts # Date manipulation helpers
│   └── validation.ts  # Input validation
├── generators/        # Calendar generation logic
│   ├── day.ts        # Day generation
│   ├── week.ts       # Week generation
│   ├── month.ts      # Month generation
│   └── year.ts       # Year generation
├── __tests__/        # Test files
│   ├── generators.test.ts
│   └── cache.test.ts
└── index.ts          # Main entry point
```

## Contributing

Contributions are welcome! Please ensure:

- All tests pass (`npm test`)
- Code is properly formatted (`npm run format`)
- No linting errors (`npm run lint`)
- TypeScript types are correct (`npm run typecheck`)

## License

MIT

## Author

Created for fast and efficient calendar generation in modern JavaScript/TypeScript applications.

## Changelog

### Version 1.0.0

- Complete refactoring with modular architecture
- Improved TypeScript types (removed `any` types)
- Added input validation
- Added comprehensive test suite with Vitest
- Added ESLint and Prettier configuration
- Multi-level intelligent caching system
- Support for 4 locales (fr-FR, en-US, es-ES, de-DE)
- ISO week number support
- Full JSDoc documentation
