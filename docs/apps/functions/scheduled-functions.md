---
title: Scheduled Functions
hide_title: true
sidebar_position: 4
---

# Scheduled Functions

A function with `type: "scheduled"` runs automatically on a cron schedule — **once per installation**. If ten organizations install your app, your function runs ten times per tick, each run isolated to one organization's data, options and permissions.

```json title="manifest.json"
{
  "functions": [
    {
      "name": "sync-open-requests",
      "type": "scheduled",
      "handler": "./functions/sync-open-requests/dist/handler.js",
      "schedule": "rate(30 minutes)",
      "schedule_timezone": "Europe/Berlin"
    }
  ]
}
```

## Schedule expressions

Two formats, both validated at deploy time (and locally by `epilot app validate`):

| Format | Example | Meaning |
|---|---|---|
| Rate | `rate(30 minutes)`, `rate(1 hour)`, `rate(2 days)` | Fixed interval |
| 5-field cron | `0 3 * * *` | [crontab.guru](https://crontab.guru/)-compatible; evaluated in `schedule_timezone` (default `Europe/Berlin`) |

**Rules:**

- Minimum interval: **15 minutes** — denser expressions are rejected, including list tricks like `0,5 * * * *`.
- At most **5 scheduled functions** per app.
- Don't restrict day-of-month *and* day-of-week in the same expression — set one of them to `*`.

## Execution semantics

- **Jitter**: runs execute within roughly **15 minutes after** the scheduled time, not at the exact second. Design for "around 3 AM", not "at 03:00:00".
- **Hard 60-second budget** per run.
- **No overlap**: if the previous run is still going, the tick is skipped.
- **At-least-once**: a failed delivery is retried; occasionally a tick may run twice — make your logic idempotent.
- **Lifecycle**: schedules are created when an org installs your app, updated when the installation moves to a new version, and deleted on uninstall. A disabled installation (missing required options) is skipped.

## Do bounded work per tick

60 seconds is a budget, not a target. The reliable pattern is incremental processing: handle a bounded batch, let the next tick pick up the rest.

```ts
const MAX_ITEMS_PER_RUN = 150;
const TIME_BUDGET_MS = 45_000;

async function handler(input, context) {
  const started = Date.now();
  const items = await findPendingItems(context, input); // bounded query

  let processed = 0;
  for (const item of items.slice(0, MAX_ITEMS_PER_RUN)) {
    if (Date.now() - started > TIME_BUDGET_MS) break; // next tick continues
    await processItem(context, input, item);           // idempotent!
    processed++;
  }

  return { success: true, processed, remaining: items.length - processed };
}
```

Two more habits that keep scheduled syncs well-behaved:

- **Write only on change.** Diff before you PATCH an entity — otherwise every tick touches every entity and fires the org's entity-based automations for nothing.
- **Let single items fail individually.** Log per-item errors and continue; only return `{ error_reason }` when the whole run is broken (e.g. the target system is down), so failures in your Insights mean something.

## Observability

Every run is recorded in your app's **Insights** (source `APP_FUNCTION`) — successes, skips and failures with their messages, per version and per installing organization. Installing orgs see the schedule as a plain-language summary ("every 30 minutes") on the installed app's **Configuration tab**.
