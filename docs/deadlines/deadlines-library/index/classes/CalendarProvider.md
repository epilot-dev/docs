[**@epilot/switching-deadlines**](../../README.md)

***

[@epilot/switching-deadlines](../../modules.md) / [index](../README.md) / CalendarProvider

# Class: CalendarProvider

Defined in: [calendar-provider.ts:41](https://github.com/epilot-dev/switching-deadlines/blob/6764c18ea2525d949c8b9824eea28bc98b53665e/src/calendar-provider.ts#L41)

Calendar provider that manages holidays, working days, and date calculations.

This class provides functionality for:
- Holiday detection (fixed, moving, and special holidays)
- Working day calculations
- Date range analysis
- Custom holiday configuration
- German Bundesländer-specific holiday support

## Example

```typescript
const calendar = new CalendarProvider({
  customCalendar: {
    holidays: [
      { date: '2024-12-24', name: 'Christmas Eve', type: HolidayType.SPECIAL_HOLIDAY }
    ]
  },
  useSpecialHolidays: true
});

const isWorking = calendar.isWorkingDay('2024-12-25'); // false (Christmas)
const nextWorking = calendar.getNextWorkingDay('2024-12-25');
```

## Constructors

### Constructor

> **new CalendarProvider**(`options?`): `CalendarProvider`

Defined in: [calendar-provider.ts:81](https://github.com/epilot-dev/switching-deadlines/blob/6764c18ea2525d949c8b9824eea28bc98b53665e/src/calendar-provider.ts#L81)

Creates a new CalendarProvider instance.

#### Parameters

##### options?

Configuration options for the calendar

###### customCalendar?

\{ `holidays?`: [`CustomHolidayConfig`](../interfaces/CustomHolidayConfig.md)[]; `version?`: [`CalendarVersion`](../interfaces/CalendarVersion.md); \}

Custom calendar configuration

###### customCalendar.holidays?

[`CustomHolidayConfig`](../interfaces/CustomHolidayConfig.md)[]

Array of custom holidays to include

###### customCalendar.version?

[`CalendarVersion`](../interfaces/CalendarVersion.md)

Version information for custom calendar

###### useSpecialHolidays?

`boolean`

Whether to include special holidays from the library (default: true)

#### Returns

`CalendarProvider`

#### Example

```typescript
const provider = new CalendarProvider({
  customCalendar: {
    holidays: [
      {
        date: '2024-03-17',
        name: 'St. Patrick\'s Day',
        type: HolidayType.SPECIAL_HOLIDAY,
        description: 'Irish cultural celebration'
      }
    ],
    version: { version: '1.0.0', year: 2024, lastUpdated: '2024-01-01T00:00:00Z' }
  },
  useSpecialHolidays: true
});
```

## Methods

### addWorkingDays()

> **addWorkingDays**(`startDate`, `workingDays`): `Date`

Defined in: [calendar-provider.ts:278](https://github.com/epilot-dev/switching-deadlines/blob/6764c18ea2525d949c8b9824eea28bc98b53665e/src/calendar-provider.ts#L278)

Adds a specified number of working days to a date, skipping weekends and holidays.

#### Parameters

##### startDate

The starting date (Date object or ISO date string YYYY-MM-DD)

`string` | `Date`

##### workingDays

`number`

Number of working days to add (must be positive)

#### Returns

`Date`

A new Date object representing the result

#### Example

```typescript
// Add 5 working days to a Friday
const result = provider.addWorkingDays('2024-07-12', 5); // Friday + 5 working days
console.log(result); // Next Friday (skipping weekend)

// Handle holidays automatically
const beforeHoliday = provider.addWorkingDays('2024-12-20', 3); // Skips Christmas
```

***

### countWorkingDays()

> **countWorkingDays**(`startDate`, `endDate`): `number`

Defined in: [calendar-provider.ts:387](https://github.com/epilot-dev/switching-deadlines/blob/6764c18ea2525d949c8b9824eea28bc98b53665e/src/calendar-provider.ts#L387)

Counts the number of working days between two dates (inclusive).

#### Parameters

##### startDate

The start date of the range (Date object or ISO date string YYYY-MM-DD)

`string` | `Date`

##### endDate

The end date of the range (Date object or ISO date string YYYY-MM-DD)

`string` | `Date`

#### Returns

`number`

The number of working days in the specified range

#### Example

```typescript
const workingDaysCount = provider.countWorkingDays('2024-07-01', '2024-07-31');
console.log(`There are ${workingDaysCount} working days in July 2024`);

// Quick calculation for project planning
const projectDays = provider.countWorkingDays('2024-01-15', '2024-03-15');
```

***

### getCalendarVersion()

> **getCalendarVersion**(): [`CalendarVersion`](../interfaces/CalendarVersion.md)

Defined in: [calendar-provider.ts:460](https://github.com/epilot-dev/switching-deadlines/blob/6764c18ea2525d949c8b9824eea28bc98b53665e/src/calendar-provider.ts#L460)

Gets the current calendar version information.

#### Returns

[`CalendarVersion`](../interfaces/CalendarVersion.md)

The CalendarVersion object containing version, year, and last updated information

#### Example

```typescript
const version = provider.getCalendarVersion();
console.log(`Calendar version: ${version.version} for year ${version.year}`);
console.log(`Last updated: ${version.lastUpdated}`);
```

***

### getDayInfo()

> **getDayInfo**(`date`): [`DayInfo`](../interfaces/DayInfo.md)

Defined in: [calendar-provider.ts:235](https://github.com/epilot-dev/switching-deadlines/blob/6764c18ea2525d949c8b9824eea28bc98b53665e/src/calendar-provider.ts#L235)

Gets detailed information about a specific day including working day status and holiday information.

#### Parameters

##### date

The date to analyze (Date object or ISO date string YYYY-MM-DD)

`string` | `Date`

#### Returns

[`DayInfo`](../interfaces/DayInfo.md)

Detailed day information including date, working day status, and holiday details

#### Example

```typescript
const dayInfo = provider.getDayInfo('2024-12-25');
console.log(dayInfo);
// {
//   date: '2024-12-25',
//   isWorkingDay: false,
//   holiday: { date: '2024-12-25', name: 'Weihnachtstag', type: 'PUBLIC_HOLIDAY' }
// }
```

***

### getNextWorkingDay()

> **getNextWorkingDay**(`date`): `Date`

Defined in: [calendar-provider.ts:410](https://github.com/epilot-dev/switching-deadlines/blob/6764c18ea2525d949c8b9824eea28bc98b53665e/src/calendar-provider.ts#L410)

Gets the next working day from a given date.

#### Parameters

##### date

The reference date (Date object or ISO date string YYYY-MM-DD)

`string` | `Date`

#### Returns

`Date`

A Date object representing the next working day

#### Example

```typescript
// If today is Friday, get next Monday (or Tuesday if Monday is a holiday)
const nextWorking = provider.getNextWorkingDay('2024-07-12'); // Friday
console.log(nextWorking); // Monday July 15, 2024 (or next working day)

// Automatically skips holidays
const afterChristmas = provider.getNextWorkingDay('2024-12-25');
```

***

### getNonWorkingDaysInRange()

> **getNonWorkingDaysInRange**(`startDate`, `endDate`): [`DayInfo`](../interfaces/DayInfo.md)[]

Defined in: [calendar-provider.ts:351](https://github.com/epilot-dev/switching-deadlines/blob/6764c18ea2525d949c8b9824eea28bc98b53665e/src/calendar-provider.ts#L351)

Gets all non-working days (weekends and holidays) between two dates (inclusive).

#### Parameters

##### startDate

The start date of the range (Date object or ISO date string YYYY-MM-DD)

`string` | `Date`

##### endDate

The end date of the range (Date object or ISO date string YYYY-MM-DD)

`string` | `Date`

#### Returns

[`DayInfo`](../interfaces/DayInfo.md)[]

Array of DayInfo objects for all non-working days in the range

#### Example

```typescript
const nonWorkingDays = provider.getNonWorkingDaysInRange('2024-12-01', '2024-12-31');
console.log(`${nonWorkingDays.length} holidays and weekends in December 2024`);

nonWorkingDays.forEach(day => {
  if (day.holiday) {
    console.log(`${day.date}: ${day.holiday.name} (${day.holiday.type})`);
  }
});
```

***

### getPreviousWorkingDay()

> **getPreviousWorkingDay**(`date`): `Date`

Defined in: [calendar-provider.ts:437](https://github.com/epilot-dev/switching-deadlines/blob/6764c18ea2525d949c8b9824eea28bc98b53665e/src/calendar-provider.ts#L437)

Gets the previous working day from a given date.

#### Parameters

##### date

The reference date (Date object or ISO date string YYYY-MM-DD)

`string` | `Date`

#### Returns

`Date`

A Date object representing the previous working day

#### Example

```typescript
// If today is Monday, get previous Friday (or earlier if Friday was a holiday)
const prevWorking = provider.getPreviousWorkingDay('2024-07-15'); // Monday
console.log(prevWorking); // Friday July 12, 2024 (or previous working day)

// Automatically skips holidays
const beforeNewYear = provider.getPreviousWorkingDay('2024-01-02');
```

***

### getWorkingDaysInRange()

> **getWorkingDaysInRange**(`startDate`, `endDate`): [`DayInfo`](../interfaces/DayInfo.md)[]

Defined in: [calendar-provider.ts:312](https://github.com/epilot-dev/switching-deadlines/blob/6764c18ea2525d949c8b9824eea28bc98b53665e/src/calendar-provider.ts#L312)

Gets all working days between two dates (inclusive).

#### Parameters

##### startDate

The start date of the range (Date object or ISO date string YYYY-MM-DD)

`string` | `Date`

##### endDate

The end date of the range (Date object or ISO date string YYYY-MM-DD)

`string` | `Date`

#### Returns

[`DayInfo`](../interfaces/DayInfo.md)[]

Array of DayInfo objects for all working days in the range

#### Example

```typescript
const workingDays = provider.getWorkingDaysInRange('2024-07-01', '2024-07-31');
console.log(`${workingDays.length} working days in July 2024`);

workingDays.forEach(day => {
  console.log(`${day.date} is a working day`);
});
```

***

### isHoliday()

> **isHoliday**(`date`): `false` \| [`Holiday`](../interfaces/Holiday.md)

Defined in: [calendar-provider.ts:178](https://github.com/epilot-dev/switching-deadlines/blob/6764c18ea2525d949c8b9824eea28bc98b53665e/src/calendar-provider.ts#L178)

Checks if a specific date is a holiday.

#### Parameters

##### date

The date to check (Date object or ISO date string YYYY-MM-DD)

`string` | `Date`

#### Returns

`false` \| [`Holiday`](../interfaces/Holiday.md)

The Holiday object if the date is a holiday, false otherwise

#### Example

```typescript
const holiday = provider.isHoliday('2024-12-25');
if (holiday) {
  console.log(`${holiday.name} is a ${holiday.type}`);
}

const dateHoliday = provider.isHoliday(new Date('2024-01-01'));
```

***

### isWorkingDay()

> **isWorkingDay**(`date`): `boolean`

Defined in: [calendar-provider.ts:202](https://github.com/epilot-dev/switching-deadlines/blob/6764c18ea2525d949c8b9824eea28bc98b53665e/src/calendar-provider.ts#L202)

Checks if a specific date is a working day (not a weekend or holiday).

#### Parameters

##### date

The date to check (Date object or ISO date string YYYY-MM-DD)

`string` | `Date`

#### Returns

`boolean`

True if the date is a working day, false if it's a weekend or holiday

#### Example

```typescript
const isWorking = provider.isWorkingDay('2024-07-15'); // true (Monday, no holiday)
const isWeekend = provider.isWorkingDay('2024-07-14'); // false (Sunday)
const isHoliday = provider.isWorkingDay('2024-12-25'); // false (Christmas)
```

***

### updateCustomHolidays()

> **updateCustomHolidays**(`customHolidays`): `void`

Defined in: [calendar-provider.ts:487](https://github.com/epilot-dev/switching-deadlines/blob/6764c18ea2525d949c8b9824eea28bc98b53665e/src/calendar-provider.ts#L487)

Updates the custom holidays configuration and clears the holiday cache.

#### Parameters

##### customHolidays

[`CustomHolidayConfig`](../interfaces/CustomHolidayConfig.md)[]

Array of custom holiday configurations to replace existing ones

#### Returns

`void`

#### Example

```typescript
provider.updateCustomHolidays([
  {
    date: '2024-04-01',
    name: 'Company Foundation Day',
    type: HolidayType.SPECIAL_HOLIDAY,
    description: 'Annual company celebration'
  },
  {
    date: '2024-07-04',
    name: 'Independence Day',
    type: HolidayType.PUBLIC_HOLIDAY,
    bundeslaender: ['BY'] // Bavaria only
  }
]);
```
