[**@epilot/switching-deadlines**](../../README.md)

***

[@epilot/switching-deadlines](../../modules.md) / [index](../README.md) / DeadlineCalculatorOptions

# Interface: DeadlineCalculatorOptions

Defined in: [deadlines-calculator.ts:14](https://github.com/epilot-dev/switching-deadlines/blob/399b2cc39d63ef20d5c31e06d92ee448511e691c/src/deadlines-calculator.ts#L14)

Options for configuring a [DeadlineCalculator](../classes/DeadlineCalculator.md).

## Properties

### calendarProvider?

> `optional` **calendarProvider**: [`CalendarProvider`](../classes/CalendarProvider.md)

Defined in: [deadlines-calculator.ts:18](https://github.com/epilot-dev/switching-deadlines/blob/399b2cc39d63ef20d5c31e06d92ee448511e691c/src/deadlines-calculator.ts#L18)

Custom holiday calendar provider used for working day calculations.

***

### customRules?

> `optional` **customRules**: [`DeadlineRule`](DeadlineRule.md)[]

Defined in: [deadlines-calculator.ts:23](https://github.com/epilot-dev/switching-deadlines/blob/399b2cc39d63ef20d5c31e06d92ee448511e691c/src/deadlines-calculator.ts#L23)

Override default deadline rules with custom business logic.
