# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-10-14

### 🚀 Major Refactoring

#### Architecture

- **Complete code restructuring** into modular components
  - `src/types/` - TypeScript type definitions
  - `src/constants.ts` - Constants and configuration
  - `src/utils/` - Utility functions (cache, validation, date helpers)
  - `src/generators/` - Calendar generation logic (day, week, month, year)

#### Type Safety

- **Removed all `any` types** - Full type safety throughout the codebase
- **Created specific cache types**:
  - `CalculationCacheValue` for basic calculations
  - `DayCacheValue` for individual days
  - `WeekCacheValue` for complete weeks
  - `MonthCacheValue` for complete months
- **Improved interface naming** - Changed `localeCode` type to `LocaleCode` (PascalCase)
- **Removed duplicate properties** - Removed `dayInitial` (duplicate of `dayShort`)
- **Better property naming**:
  - `fullDateUTC` → `isoStringWithTime`
  - `dateUTC` → `isoString`

#### Validation

- **Added input validation** for all public functions
- **Year validation** (1900-2100)
- **Locale validation** (fr-FR, en-US, es-ES, de-DE)
- **Calendar style validation** ('eu' or 'am')
- **Meaningful error messages** for invalid inputs

#### Documentation

- **Complete JSDoc documentation** on all functions
- **English comments** throughout the codebase
- **Updated README** with comprehensive examples
- **Better API documentation** with parameter descriptions

#### Testing

- **Added Vitest** as modern test framework
- **17 comprehensive tests** covering:
  - Calendar generation
  - Cache functionality
  - Locale support
  - Today detection
  - Weekend detection
  - ISO string generation
  - Performance
- **100% test pass rate**
- **Legacy test compatibility** maintained

#### Code Quality

- **ESLint configuration** with TypeScript support
- **Prettier configuration** for consistent formatting
- **Pre-commit scripts** available:
  - `npm run lint` - Check for issues
  - `npm run format` - Auto-format code
  - `npm run typecheck` - Verify types

#### Cache Improvements

- **Multi-level caching system**:
  - Calculation cache (formats, week numbers, bounds)
  - Day cache (individual days)
  - Week cache (7-day weeks)
  - Month cache (month weeks)
  - Year cache (complete years)
- **Better cache management**:
  - `limitCacheSize()` - Applies to all calculation caches
  - More efficient cache key generation

#### New Features

- **`generateMonth()` function** - Generate a single month
- **Better exports** - All types and functions properly exported
- **Improved performance** - Multi-level caching reduces redundant calculations

### 📝 Scripts Added

- `npm test` - Run Vitest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report
- `npm run test:legacy` - Run original test file
- `npm run lint` - Check code quality
- `npm run lint:fix` - Auto-fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted
- `npm run typecheck` - Verify TypeScript types

### 🔧 Developer Experience

- **Modular code** - Easy to maintain and extend
- **Type-safe** - Catch errors at compile time
- **Well-tested** - Confidence in changes
- **Documented** - Easy to understand and use
- **Linted** - Consistent code style
- **Formatted** - Beautiful code

### ⚠️ Breaking Changes

- **Interface changes**:
  - Removed `dayInitial` property from `IRemedyCalendarDay`
  - Renamed `fullDateUTC` to `isoStringWithTime`
  - Renamed `dateUTC` to `isoString`
- **Type exports**:
  - `localeCode` is now `LocaleCode`
- **File structure** - Old imports may need updating

### 📦 Dependencies

- Added `vitest` for testing
- Added `@vitest/coverage-v8` for coverage reports
- Added `eslint` and `@typescript-eslint/*` for linting
- Added `prettier` for formatting

### 🐛 Bug Fixes

- Fixed cache type safety issues
- Improved date handling consistency

### 📈 Performance

- **First generation**: ~35ms for full year
- **Cached retrieval**: ~0.01ms (instant)
- **Multi-level caching** reduces redundant calculations
- **Memory efficient** with configurable cache limits

---

## Previous Versions

Previous development was not versioned. This is the first official release with proper semantic versioning.
