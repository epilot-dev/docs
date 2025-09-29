[**@epilot/switching-deadlines**](../../README.md)

***

[@epilot/switching-deadlines](../../modules.md) / [index](../README.md) / DeadlineRule

# Interface: DeadlineRule

Defined in: [rules/types.ts:11](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/rules/types.ts#L11)

## Properties

### allowsRetrospective

> **allowsRetrospective**: `boolean`

Defined in: [rules/types.ts:28](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/rules/types.ts#L28)

Whether retrospective switching is allowed

***

### commodity

> **commodity**: [`Commodity`](../enumerations/Commodity.md)

Defined in: [rules/types.ts:16](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/rules/types.ts#L16)

The commodity this rule applies to

***

### description

> **description**: `string`

Defined in: [rules/types.ts:34](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/rules/types.ts#L34)

Description of the rule

***

### id

> **id**: `string`

Defined in: [rules/types.ts:13](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/rules/types.ts#L13)

Unique identifier for the rule

***

### maxRetrospectiveDays?

> `optional` **maxRetrospectiveDays**: `number`

Defined in: [rules/types.ts:31](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/rules/types.ts#L31)

Maximum retrospective period in days

***

### requiredWorkingDays

> **requiredWorkingDays**: `number`

Defined in: [rules/types.ts:25](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/rules/types.ts#L25)

Required working days lead time

***

### requiresTermination

> **requiresTermination**: `boolean`

Defined in: [rules/types.ts:22](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/rules/types.ts#L22)

Whether this rule is for cases requiring termination

***

### useCase

> **useCase**: [`UseCase`](../enumerations/UseCase.md)

Defined in: [rules/types.ts:19](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/rules/types.ts#L19)

The use case this rule applies to
