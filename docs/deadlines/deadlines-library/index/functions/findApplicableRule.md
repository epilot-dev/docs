[**@epilot/switching-deadlines**](../../README.md)

***

[@epilot/switching-deadlines](../../modules.md) / [index](../README.md) / findApplicableRule

# Function: findApplicableRule()

> **findApplicableRule**(`commodity`, `useCase`, `requiresTermination`, `rules`): `undefined` \| [`DeadlineRule`](../interfaces/DeadlineRule.md)

Defined in: [rules/utils.ts:7](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/rules/utils.ts#L7)

Get the applicable rule for a specific scenario

## Parameters

### commodity

[`Commodity`](../enumerations/Commodity.md)

### useCase

[`UseCase`](../enumerations/UseCase.md)

### requiresTermination

`boolean`

### rules

[`DeadlineRule`](../interfaces/DeadlineRule.md)[] = `DEFAULT_DEADLINE_RULES`

## Returns

`undefined` \| [`DeadlineRule`](../interfaces/DeadlineRule.md)
