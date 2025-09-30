[**@epilot/switching-deadlines**](../../README.md)

***

[@epilot/switching-deadlines](../../modules.md) / [index](../README.md) / calculateDeadline

# Function: calculateDeadline()

> **calculateDeadline**(`__namedParameters`, `fromDate?`): `Date`

Defined in: [helpers.ts:23](https://github.com/epilot-dev/switching-deadlines/blob/399b2cc39d63ef20d5c31e06d92ee448511e691c/src/helpers.ts#L23)

Calculate the earliest start date for a contract using default settings

## Parameters

### \_\_namedParameters

[`SwitchingCase`](../interfaces/SwitchingCase.md)

### fromDate?

`string` | `Date`

## Returns

`Date`

## Example

```typescript
import { calculateDeadline, Commodity, UseCase } from '@epilot/switching-deadlines';

const result = calculateDeadline({
  commodity: Commodity.POWER,
  useCase: UseCase.SWITCH,
  requiresTermination: true,
  fromDate: '2025-10-01'
});

console.log(result.earliestStartDateString); // '2025-10-07'
```
