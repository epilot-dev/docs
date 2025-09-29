[**@epilot/switching-deadlines**](../../README.md)

***

[@epilot/switching-deadlines](../../modules.md) / [index](../README.md) / SwitchingCase

# Interface: SwitchingCase

Defined in: [types.ts:25](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/types.ts#L25)

Represents a switching case configuration.

 SwitchingCase

## Properties

### commodity

> **commodity**: [`Commodity`](../enumerations/Commodity.md)

Defined in: [types.ts:26](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/types.ts#L26)

The commodity type (power or gas)

***

### requiresTermination

> **requiresTermination**: `boolean`

Defined in: [types.ts:28](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/types.ts#L28)

Whether termination of the previous contract is required

***

### useCase

> **useCase**: [`UseCase`](../enumerations/UseCase.md)

Defined in: [types.ts:27](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/types.ts#L27)

The use case (relocation or supplier switch)
