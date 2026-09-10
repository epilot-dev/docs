---
sidebar_position: 1
title: Monitoring Overview
description: How Integration Toolkit monitoring is structured — levels, codes, event and correlation ids, use case lanes, and how long data is kept
slug: /integrations/integration-toolkit/monitoring/overview
---

# Monitoring Overview

Every event the Integration Toolkit processes leaves a trail. Inbound syncs, outbound
deliveries, file proxy fetches, managed calls and secure proxy requests all write to
one monitoring stream, visible in the Integration Hub's **Monitoring** tab and
queryable through the API.

This page covers how that data is shaped, so the rest of the section makes sense. If
you are chasing a specific failure right now, go to
[Investigating events](./investigating.md) or look your code up in the
[code reference](./codes.md).

## Where to look

Open an integration in epilot 360 (**Integrations → your integration**) and use the
**Monitoring** tab. It gives you, in one place:

- **Stat tiles** — total events, successes, errors, warnings, success rate, and
  ACK timeouts for the selected period
- **Events over time** — a bucketed chart, optionally split by use case or lane
- **Use case breakdown** — which use cases produce the volume, and the errors
- **The event table** — filterable by level, code, use case and time, with a detail
  panel per event
- **Access logs** — which API token called what

The **Notifications** tab beside it is where you configure who gets told about all
this — see [Alerting](./alerting.md).

## How an event is shaped

Each row in the stream is one monitoring event:

| Field | What it is |
|---|---|
| `level` | How much you should care: `success`, `error`, `warning` or `info` |
| `code` | What specifically happened — see the [code reference](./codes.md) |
| `message` | A human-readable line, usually the error text |
| `detail` | Free-form JSON with context for that code — including the captured request and response where there was one |
| `use_case_type` | Which lane produced it |
| `use_case_id` | Which configured use case, when one owns the event |
| `event_id` | The triggering event |
| `correlation_id` | The business operation |
| `created_at` | When it happened |

### Levels

There are four, and the distinction between the last two matters more than it looks:

| Level | Meaning |
|---|---|
| `success` | The event did what it was meant to do |
| `error` | It failed |
| `warning` | It continued, but something needs a human eye — a retry in flight, an unmapped value |
| `info` | A lifecycle marker rather than an outcome: a message queued, a duplicate ignored, a step skipped by configuration |

**`info` events are excluded from the success rate.** They are counted in
`total_events`, but a queued message or an ignored duplicate is not something that
could have succeeded or failed, so including them would drag the rate down for no
reason. An integration using ACK tracking or the poll queue emits a lot of them.

A code's level is fixed — `ENTITY_CREATED` is always `success`, `ACK_TIMEOUT` is always
`warning`. That is what makes [alert rules](./alerting.md#choosing-what-to-watch)
scoped to a whole level predictable.

### Use case lanes

`use_case_type` separates the five kinds of work, so one noisy lane does not hide
another:

| Lane | What it covers |
|---|---|
| `inbound` | ERP data arriving and being applied to entities and meter readings |
| `outbound` | epilot events delivered to your ERP by webhook or poll queue |
| `file_proxy` | Files fetched from, or delivered to, an external document system |
| `managed_call` | Synchronous calls to an external API |
| `secure_proxy` | Requests routed through the static-IP or VPN proxy |

Two values in the use case column are not use cases:

- **"General"** (an empty `use_case_id`) — system-level events that happened before
  any use case was resolved, such as an event rejected at ingest.
- **`__unknown__`** — the event names a use case id that no longer exists on this
  integration, usually because it was deleted or recreated. The history is real; the
  configuration behind it is gone.

### `event_id` and `correlation_id` are different groupings

This is the single most useful thing to understand about the stream, because the two
answer different questions.

One inbound event does not produce one monitoring row. It fans out — child entities,
post-actions, relation resolutions — and each step records its own event. All of those
share the **`event_id`** of the thing that triggered them.

A **`correlation_id`** is wider: it identifies one *business operation*, and can span
several events and even several systems. If your middleware stamps the same
`correlation_id` on the spans it pushes and on the event it forwards, one trace covers
both halves — that is what [External Monitoring Events](./external-events.md) is for.

```
correlation_id: "bp-8f3a2c"          ← one business operation
├── middleware span: received         (external)
├── middleware span: mapped           (external)
└── event_id: "evt_91af"              ← one epilot event
    ├── contact created
    ├── billing account created
    └── relation resolved
```

Two endpoints match the two groupings, and picking the wrong one is why a trace can
look incomplete:

| To see | Use |
|---|---|
| Everything one epilot event produced | `GET …/monitoring/events/{eventId}/associated` |
| The whole business operation, across systems | `GET …/monitoring/traces/{correlationId}` |

Both are covered in [Investigating events](./investigating.md#tracing).

## How long data is kept

| Data | Retained | What that limits |
|---|---|---|
| Monitoring events | **90 days** | How far back stats, charts and the event table can go |
| Received inbound payloads | **14 days** | How far back you can [replay](./investigating.md#replaying-events), and how long a trace can still show the original payload |

The 14-day figure is the one that catches people out. Replay reconstructs the event
from the stored inbound payload, so **an event older than 14 days cannot be replayed**
— the monitoring record of it survives for the full 90 days, but the payload behind it
does not. If you are working through a backlog of failures, work through the oldest
first.

## Is a specific entity up to date?

Monitoring answers "what happened". A separate endpoint answers "is *this record*
current with the ERP":

```bash
curl 'https://integration-toolkit.sls.epilot.io/v1/integrations/entities/{entityId}/sync-status' \
  -H 'Authorization: Bearer <token>'
```

It returns, per integration that has touched the entity, when it was last **synced**
and when it was last **changed**.

The distinction matters: `last_synced_at` also advances on a no-op — an event that was
received and evaluated but changed nothing. Those deliberately leave no trace on the
entity itself: no activity feed entry, no `_updated_at` bump. So an entity that looks
untouched for weeks may be being checked constantly and simply not changing, and this
endpoint is the only way to tell those two states apart. An entity no inbound use case
has ever processed returns an empty list.

Add `?integration_id=…` to narrow it to one integration.

## Next

- [Monitoring Codes](./codes.md) — look up what you saw
- [Investigating events](./investigating.md) — traces, captured payloads, replay
- [Alerting](./alerting.md) — get told without watching
- [ACK Tracking](./acks.md) — confirm the ERP processed what you sent
- [External Monitoring Events](./external-events.md) — bring your middleware's steps in
