[**@epilot/switching-deadlines**](../../README.md)

***

[@epilot/switching-deadlines](../../modules.md) / [index](../README.md) / getVersion

# Function: getVersion()

> **getVersion**(): [`CalendarVersion`](../interfaces/CalendarVersion.md)

Defined in: [helpers.ts:80](https://github.com/epilot-dev/switching-deadlines/blob/3e728b5f762c5b978f43c05453d07a8b73878933/src/helpers.ts#L80)

Get the calendar version information

## Returns

[`CalendarVersion`](../interfaces/CalendarVersion.md)

The calendar version details including version number and metadata

## Example

```typescript
import { getVersion } from '@epilot/switching-deadlines';

const version = getVersion();
console.log(version); // CalendarVersion object with version info
```
