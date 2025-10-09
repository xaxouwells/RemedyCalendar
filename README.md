# Remedy Calendar

Ultra-fast calendar generator with intelligent caching system for TypeScript/JavaScript applications.

## Features

- **Ultra-fast performance** with intelligent multi-level caching
- **TypeScript support** with full type definitions
- **i18n support** for multiple locales (fr-FR, en-US, es-ES, de-DE)
- **Calendar styles** for European (Monday first) and American (Sunday first) formats
- **ISO week numbers** calculation
- **Flexible API** for generating calendars by year, month, or week
- **Cache management** utilities for optimal memory usage

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
- `year` (number): The year to generate the calendar for
- `localeCode` ('fr-FR' | 'en-US' | 'es-ES' | 'de-DE'): The locale for date formatting
- `calendarStyle` ('eu' | 'am'): Calendar style - 'eu' starts weeks on Monday, 'am' starts on Sunday
- `startFromCurrentMonth` (boolean, optional): If true and year is current year, starts from current month

**Returns:** Array of `IRemedyCalendarMonth` objects

### Utility Functions

#### Cache Warming

```typescript
import { warmUpCache } from 'remedy-calendar';

// Pre-generate calendars for better performance
warmUpCache(2025, 'en-US', 'eu', false);
```

#### Pre-generate Adjacent Years

```typescript
import { preGenerateYears } from 'remedy-calendar';

// Generate calendars for previous and next years
preGenerateYears(2025, 'en-US', 'eu', false);
```

#### Cache Management

```typescript
import {
  clearCache,
  clearYearCache,
  clearAllCaches,
  limitCacheSize,
  limitYearCacheSize
} from 'remedy-calendar';

// Clear all caches
clearAllCaches();

// Limit cache sizes
limitCacheSize(2000); // Limit calculation cache to 2000 entries
limitYearCacheSize(3); // Keep only 3 years in cache
```

### TypeScript Interfaces

```typescript
import type {
  IRemedyCalendarDay,
  IRemedyCalendarWeek,
  IRemedyCalendarMonth
} from 'remedy-calendar';
```

#### `IRemedyCalendarDay`

```typescript
interface IRemedyCalendarDay {
  date: number;
  fullDate: Date;
  fullDateUTC: string;
  dateUTC: string;
  dayName: string;
  dayShort: string;
  isCurrentMonth: boolean;
  dayInitial: string;
  isToday: boolean;
  isWeekend: boolean;
  weekNumber: number;
  isoString: string;
  isoStringUTC: string;
}
```

#### `IRemedyCalendarWeek`

```typescript
interface IRemedyCalendarWeek {
  id: number;
  beginDate: number;
  endDate: number;
  beginDateUTC: string;
  endDateUTC: string;
  beginDateUTConly: string;
  endDateUTConly: string;
  weekDay: IRemedyCalendarDay[];
}
```

#### `IRemedyCalendarMonth`

```typescript
interface IRemedyCalendarMonth {
  monthIndex: number;
  monthName: string;
  monthYear: string;
  month: IRemedyCalendarWeek[];
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

## Performance

Remedy Calendar uses a sophisticated two-level caching system:

1. **Calculation Cache**: Caches individual date calculations, formats, and week calculations
2. **Year Cache**: Caches complete year calendars for instant retrieval

This approach ensures:
- First generation: Fast
- Subsequent requests: Instant (cached)
- Memory efficient with built-in cache size limits

## License

MIT

## Author

Created for fast and efficient calendar generation in modern JavaScript/TypeScript applications.
