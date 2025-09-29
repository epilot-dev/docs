[**@epilot/switching-deadlines**](../../README.md)

***

[@epilot/switching-deadlines](../../modules.md) / [index](../README.md) / CalendarProviderOptions

# Interface: CalendarProviderOptions

Defined in: [calendar-provider.ts:19](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/calendar-provider.ts#L19)

Options for configuring a [CalendarProvider](../classes/CalendarProvider.md).

## Properties

### customCalendar?

> `optional` **customCalendar**: `object`

Defined in: [calendar-provider.ts:23](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/calendar-provider.ts#L23)

Custom calendar configuration.

#### holidays?

> `optional` **holidays**: [`CustomHolidayConfig`](CustomHolidayConfig.md)[]

Array of custom holidays to include.

#### version?

> `optional` **version**: [`CalendarVersion`](CalendarVersion.md)

Version information for the custom calendar.

***

### useSpecialHolidays?

> `optional` **useSpecialHolidays**: `boolean`

Defined in: [calendar-provider.ts:40](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/calendar-provider.ts#L40)

Whether to include special holidays from the library.

#### Default Value

```ts
true
```
