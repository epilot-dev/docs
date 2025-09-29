[**@epilot/switching-deadlines**](../../README.md)

***

[@epilot/switching-deadlines](../../modules.md) / [index](../README.md) / DeadlineCalculator

# Class: DeadlineCalculator

Defined in: [deadlines-calculator.ts:47](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/deadlines-calculator.ts#L47)

Calculator for determining deadline dates and validating start dates for utility switching cases.

Handles different switching scenarios including power and gas contracts,
with support for various use cases (relocation or supplier switch) and termination requirements.
Can calculate both forward-looking and retrospective switching deadlines based on
configurable business rules and working day calendars.

## Example

```typescript
const calculator = new DeadlineCalculator()

const result = calculator.calculateEarliestStartDate({
  commodity: 'power',
  useCase: 'relocation',
  requiresTermination: false
})

console.log(result.earliestStartDate)
```

## Constructors

### Constructor

> **new DeadlineCalculator**(`options?`): `DeadlineCalculator`

Defined in: [deadlines-calculator.ts:68](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/deadlines-calculator.ts#L68)

Creates a new DeadlineCalculator instance.

#### Parameters

##### options?

[`DeadlineCalculatorOptions`](../interfaces/DeadlineCalculatorOptions.md)

Optional configuration options for the calculator.

#### Returns

`DeadlineCalculator`

#### Example

```typescript
// Default: built-in calendar + default rules
const calc = new DeadlineCalculator();

// With a custom calendar and rules
const calcCustom = new DeadlineCalculator({
  calendarProvider: new CalendarProvider(),
  customRules: [], // custom DeadlineRule objects
});
```

## Methods

### calculateEarliestStartDate()

> **calculateEarliestStartDate**(`switchingCase`, `fromDate?`): `object`

Defined in: [deadlines-calculator.ts:91](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/deadlines-calculator.ts#L91)

Calculate the earliest possible start date for a contract

Determines the earliest valid start date for a new utility contract based on
the switching case type, applicable business rules, and working day calculations.
Handles both standard forward switching and retrospective switching scenarios.

#### Parameters

##### switchingCase

[`SwitchingCase`](../interfaces/SwitchingCase.md)

The switching case configuration

##### fromDate?

The date from which to calculate the deadline (defaults to current date)

`string` | `Date`

#### Returns

Object containing calculated dates, applied rules, and metadata

##### calendarDaysTotal

> **calendarDaysTotal**: `number`

Total calendar days between request and earliest start

##### earliestStartDate

> **earliestStartDate**: `Date`

The earliest possible start date for the new contract

##### earliestStartDateString

> **earliestStartDateString**: `string`

The earliest start date as ISO string

##### isRetrospective

> **isRetrospective**: `boolean`

Whether this is a retrospective switch (gas only)

##### ruleApplied

> **ruleApplied**: [`DeadlineRule`](../interfaces/DeadlineRule.md)

The rule that was applied

##### workingDaysApplied

> **workingDaysApplied**: `number`

Number of working days applied

#### Throws

When no applicable rule is found for the switching case

***

### getRule()

> **getRule**(`switchingCase`): `undefined` \| [`DeadlineRule`](../interfaces/DeadlineRule.md)

Defined in: [deadlines-calculator.ts:220](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/deadlines-calculator.ts#L220)

Get a specific rule for a switching case

Finds and returns the deadline rule that applies to the specified
switching case configuration. Returns undefined if no matching rule exists.

#### Parameters

##### switchingCase

[`SwitchingCase`](../interfaces/SwitchingCase.md)

The switching case to find a rule for

#### Returns

`undefined` \| [`DeadlineRule`](../interfaces/DeadlineRule.md)

The matching deadline rule or undefined if none found

***

### getRules()

> **getRules**(): [`DeadlineRule`](../interfaces/DeadlineRule.md)[]

Defined in: [deadlines-calculator.ts:204](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/deadlines-calculator.ts#L204)

Get all configured rules

Returns a copy of all deadline rules currently configured in the calculator.
Useful for debugging or displaying available switching scenarios.

#### Returns

[`DeadlineRule`](../interfaces/DeadlineRule.md)[]

Array of all configured deadline rules

***

### validateStartDate()

> **validateStartDate**(`switchingCase`, `proposedDate`, `fromDate?`): `object`

Defined in: [deadlines-calculator.ts:167](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/deadlines-calculator.ts#L167)

Validate if a proposed start date is valid

Checks whether a proposed contract start date meets the minimum deadline
requirements for the given switching case. Compares the proposed date
against the calculated earliest valid date.

#### Parameters

##### switchingCase

[`SwitchingCase`](../interfaces/SwitchingCase.md)

The switching case configuration

##### proposedDate

The date to validate

`string` | `Date`

##### fromDate?

The date from which to calculate the deadline (defaults to current date)

`string` | `Date`

#### Returns

`object`

Validation result with validity status and earliest valid alternative if invalid

##### earliestValidDate?

> `optional` **earliestValidDate**: `Date`

##### isValid

> **isValid**: `boolean`

##### ruleApplied

> **ruleApplied**: [`DeadlineRule`](../interfaces/DeadlineRule.md)
