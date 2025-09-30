[**@epilot/switching-deadlines**](../../README.md)

***

[@epilot/switching-deadlines](../../modules.md) / [index](../README.md) / SwitchingCase

# Interface: SwitchingCase

Defined in: [types.ts:25](https://github.com/epilot-dev/switching-deadlines/blob/399b2cc39d63ef20d5c31e06d92ee448511e691c/src/types.ts#L25)

Represents a switching case configuration.

 SwitchingCase

## Properties

### commodity

> **commodity**: [`Commodity`](../enumerations/Commodity.md)

Defined in: [types.ts:26](https://github.com/epilot-dev/switching-deadlines/blob/399b2cc39d63ef20d5c31e06d92ee448511e691c/src/types.ts#L26)

The commodity type (power or gas)

***

### requiresTermination

> **requiresTermination**: `boolean`

Defined in: [types.ts:28](https://github.com/epilot-dev/switching-deadlines/blob/399b2cc39d63ef20d5c31e06d92ee448511e691c/src/types.ts#L28)

Whether termination of the previous contract is required

***

### useCase

> **useCase**: [`UseCase`](../enumerations/UseCase.md)

Defined in: [types.ts:27](https://github.com/epilot-dev/switching-deadlines/blob/399b2cc39d63ef20d5c31e06d92ee448511e691c/src/types.ts#L27)

The use case (relocation or supplier switch)
