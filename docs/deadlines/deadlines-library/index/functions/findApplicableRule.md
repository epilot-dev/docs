[**@epilot/switching-deadlines**](../../README.md)

***

[@epilot/switching-deadlines](../../modules.md) / [index](../README.md) / findApplicableRule

# Function: findApplicableRule()

> **findApplicableRule**(`commodity`, `useCase`, `requiresTermination`, `rules`): `undefined` \| [`DeadlineRule`](../interfaces/DeadlineRule.md)

Defined in: [rules/utils.ts:7](https://github.com/epilot-dev/switching-deadlines/blob/6764c18ea2525d949c8b9824eea28bc98b53665e/src/rules/utils.ts#L7)

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
