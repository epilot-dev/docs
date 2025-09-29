[**@epilot/switching-deadlines**](../README.md)

***

[@epilot/switching-deadlines](../modules.md) / EXAMPLES

# 📖 Usage Examples

This section provides examples of typical usage scenarios. For detailed information on how to use the library, please refer to the complete [documentation](https://docs.epilot.io/docs/deadlines/deadlines-library/index/).

## Calculating a single deadline

Use the function `calculateDeadline` when you only need the earliest possible contract start date for a single case, without additional details.

### Example

```typescript
import { calculateDeadline, Commodity, UseCase } from '@epilot/switching-deadlines'

const result = calculateDeadline(
  {
    commodity: Commodity.POWER,
    useCase: UseCase.SWITCH,
    requiresTermination: true
  },
  '2025-10-01' // optional date to calculate from
)

console.log(result)
```

### Expected Output

```
2025-10-07
```

## Validating a date

Use the function `validateDate` if you want to quickly check whether a specific switching date is valid for a given commodity and use case.

### Example

```typescript
import { validateDate, Commodity, UseCase } from '@epilot/switching-deadlines'

const isValid = validateDate(
  {
    commodity: Commodity.POWER,
    useCase: UseCase.SWITCH,
    requiresTermination: true
  },
  '2025-01-05', // proposed start date
  '2025-10-01'  // optional date to calculate from
)

console.log(isValid)
```

### Expected Output

```
false
```

## Using the Deadline Calculator

Use the `DeadlineCalculator` class when you need more detailed results (e.g., for APIs or batch calculations), including applied rules and working days.

### Example

```typescript
import { DeadlineCalculator, Commodity, UseCase } from '@epilot/switching-deadlines'

const calculator = new DeadlineCalculator()

const result = calculator.calculateEarliestStartDate(
  {
    commodity: Commodity.POWER,
    useCase: UseCase.SWITCH,
    requiresTermination: true
  },
  '2025-10-01'
)

console.log(result)
```

### Expected Output

```json
{
  earliestStartDate: 2025-10-07T00:00:00.000Z,
  earliestStartDateString: '2025-10-07',
  workingDaysApplied: 2,
  calendarDaysTotal: 6,
  isRetrospective: false,
  ruleApplied: {
    id: 'power_switch_with_termination',
    commodity: 'power',
    useCase: 'switch',
    requiresTermination: true,
    requiredWorkingDays: 2,
    allowsRetrospective: false,
    description: 'Power contract switch with termination requires 2 working days lead time'
  }
```

## Using a custom Calendar Provider

Use a custom calendar provider if you want to include one-time or special holidays not yet reflected in the default calendar.

### Example

```typescript
import { DeadlineCalculator, CalendarProvider, HolidayType } from '@epilot/switching-deadlines'

const customCalendar = new CalendarProvider({
  customCalendar: {
    holidays: [
      {
        date: '2026-03-10',
        name: 'Einmaliger Sonderfeiertag',
        type: HolidayType.SPECIAL_HOLIDAY,
        description: 'Special holiday for demonstration purposes',
        isOneTime: true
      }
    ]
  },
  useSpecialHolidays: true
})

const calculator = new DeadlineCalculator({
  customCalendarProvider: customCalendar
})
```

## Checking the library version

To verify that your library installation contains the latest holiday updates and is up to date.

### Example

```typescript
import { getVersion } from '@epilot/switching-deadlines'

const { version } = getVersion()

console.log(`Library version: ${version}`)
```

### Expected Output

```
Library version: 2025.1.4
```

Alternatively, you can use the `CalendarProvider` to check the version details.

### Example

```typescript
import { CalendarProvider } from '@epilot/switching-deadlines'

const customCalendar = new CalendarProvider()

console.log(customCalendar.getCalendarVersion())
```

### Expected Output

```json
{
  version: "2025.1.4",
  year: 2025,
  lastUpdated: "2025-09-29T13:20:52.863Z"
}
```
