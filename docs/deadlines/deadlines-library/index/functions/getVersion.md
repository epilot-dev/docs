[**@epilot/switching-deadlines**](../../README.md)

***

[@epilot/switching-deadlines](../../modules.md) / [index](../README.md) / getVersion

# Function: getVersion()

> **getVersion**(): [`CalendarVersion`](../interfaces/CalendarVersion.md)

Defined in: [helpers.ts:80](https://github.com/epilot-dev/switching-deadlines/blob/399b2cc39d63ef20d5c31e06d92ee448511e691c/src/helpers.ts#L80)

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
