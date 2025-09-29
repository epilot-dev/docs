[**@epilot/switching-deadlines**](../../README.md)

***

[@epilot/switching-deadlines](../../modules.md) / [index](../README.md) / validateDate

# Function: validateDate()

> **validateDate**(`__namedParameters`, `proposedDate`, `fromDate?`): `boolean`

Defined in: [helpers.ts:52](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/helpers.ts#L52)

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
