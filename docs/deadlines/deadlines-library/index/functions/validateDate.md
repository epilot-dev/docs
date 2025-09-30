[**@epilot/switching-deadlines**](../../README.md)

***

[@epilot/switching-deadlines](../../modules.md) / [index](../README.md) / validateDate

# Function: validateDate()

> **validateDate**(`__namedParameters`, `proposedDate`, `fromDate?`): `boolean`

Defined in: [helpers.ts:52](https://github.com/epilot-dev/switching-deadlines/blob/399b2cc39d63ef20d5c31e06d92ee448511e691c/src/helpers.ts#L52)

Validate if a proposed start date is valid using default settings

## Parameters

### \_\_namedParameters

[`SwitchingCase`](../interfaces/SwitchingCase.md)

### proposedDate

`string` | `Date`

### fromDate?

`string` | `Date`

## Returns

`boolean`

## Example

```typescript
import { validateDate, Commodity, UseCase } from '@epilot/switching-deadlines';

const isValid = validateDate('2025-10-05', {
  commodity: Commodity.POWER,
  useCase: UseCase.SWITCH,
  requiresTermination: true
});

console.log(isValid); // false
```
