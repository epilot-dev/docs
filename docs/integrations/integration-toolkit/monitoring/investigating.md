---
sidebar_position: 3
title: Investigating Events
description: Trace a failed event across systems, read the captured request and response, replay it, and query the monitoring stream from the API
slug: /integrations/integration-toolkit/monitoring/investigating
---

# Investigating Events

Something went wrong and you need to find out what. This page is the path from "the
Hub shows red" to "I know why, and I have fixed it".

## Start with the event

In the integration's **Monitoring** tab, filter the event table to `error` and pick
the event. The detail panel gives you the [code](./codes.md), the message, and the
`detail` object with everything the producer knew at the time.

For anything that made an HTTP call — file proxy, managed call, secure proxy, outbound
delivery — `detail` also carries the **captured request and response**, rendered as
panels. This is usually where the answer is: you can see exactly what epilot sent and
exactly what came back.

### What is captured, and what is not

Two deliberate limits shape those panels.

**Credentials are never stored.** Headers and body fields that carry secrets are
replaced with `<redacted>` before anything is written — in both directions, and
wherever they appear in the structure. That covers the obvious names and the
credential-shaped ones a mapping might introduce, and it covers bodies as well as
headers, because an OAuth2 exchange puts the secret in the body and gets a token back
in the response.

:::tip
If you configure a custom authentication header, prefer routing the call through the
[Secure Proxy](../configuration.md#secure-proxy-use-cases). It injects credentials
server-side, so the secret never travels through the part of the request that gets
captured at all — a stronger guarantee than relying on name matching.
:::

**Long values are elided, not truncated.** A string over 256 characters is replaced
with its first 32 characters, a `✂ truncated` marker, and its original length. The
result is still valid, copyable JSON with every field in place — you can see that a
base64 document was there and how big it was, without the analytics store having to
hold it. A whole captured body is capped at 4KB.

So a payload that looks cut off is working as intended. If you need the full body,
reproduce the call against your own system with the field values shown around the
elision.

## Tracing {#tracing}

One failure is rarely one row. Two endpoints group the stream, and they answer
different questions — see
[event_id vs correlation_id](./overview.md#event_id-and-correlation_id-are-different-groupings)
for why.

**Everything one epilot event produced** — the fan-out: child entities, post-actions,
relation resolutions:

```bash
curl 'https://integration-toolkit.sls.epilot.io/v2/integrations/{integrationId}/monitoring/events/{eventId}/associated' \
  -H 'Authorization: Bearer <token>'
```

It returns the associated events in chronological order, plus the original inbound
payload as the head of the trace when it is still within its 14-day window.

**The whole business operation, across systems** — including spans your middleware
pushed:

```bash
curl 'https://integration-toolkit.sls.epilot.io/v2/integrations/{integrationId}/monitoring/traces/{correlationId}' \
  -H 'Authorization: Bearer <token>'
```

This one rolls the spans up into a single `status` (`error` beats `warning` beats
`success` beats `info`), reports `started_at` / `ended_at`, and flags `truncated` when
the trace is longer than the returned window. Spans that came from outside epilot are
identifiable by their `EXTERNAL_*` code prefix.

## Replaying events {#replaying-events}

Once you have fixed the cause — corrected a mapping, mapped a missing value, brought
the ERP back up — replay the events that failed.

```bash
curl -X POST 'https://integration-toolkit.sls.epilot.io/v1/integrations/{integrationId}/events/replay' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{ "event_ids": ["evt_91af", "evt_91b0"] }'
```

Things worth knowing before you use it:

- **Inbound only.** Replay reconstructs a received inbound event. It does not re-send
  outbound deliveries.
- **Maximum 100 event ids per request.**
- **14-day horizon.** The event is rebuilt from the stored inbound payload, which is
  kept for 14 days — see [retention](./overview.md#how-long-data-is-kept). Older
  events return `not_found`.
- **Always HTTP 200.** Per-event outcomes are in `results`, one entry per requested id
  in request order, with a `status` of `success` / `queued`, `not_found`, `skipped`,
  `ignored` or `error`. Compare `replayed` against the number of ids you sent rather
  than trusting the status code.
- **A replay is a new event.** It is assigned a fresh `event_id` and a new
  `correlation_id` prefixed `replay_`, so the replayed run is distinguishable from the
  original in monitoring rather than overwriting it.

## Querying from the API

Everything the Monitoring tab shows is available directly. All three endpoints take a
POST body and are scoped to one integration.

**The event stream** — filter by `level`, `code`, `use_case_id`, `use_case_type`,
`event_id`, `correlation_id` and a time range, with cursor pagination:

```bash
curl -X POST 'https://integration-toolkit.sls.epilot.io/v2/integrations/{integrationId}/monitoring/events' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "level": "error",
    "use_case_type": "inbound",
    "from_date": "2026-01-15T00:00:00Z",
    "limit": 50
  }'
```

**Aggregates** — `…/monitoring/stats` for totals, success rate and `ack_timeout_count`,
with an optional `group_by` of `use_case_id`, `use_case_type`, `level`, `code` or
`date`. **Time series** — `…/monitoring/time-series` for bucketed counts at `5m`,
`10m`, `30m`, `1h`, `3h` or `1d`.

### Which number am I looking at? {#which-number}

Stats have two sources, and they answer genuinely different questions. Reading one as
the other is the most common way to reach a wrong conclusion from this data.

| `source` | Counts | Use it for |
|---|---|---|
| `monitoring` *(default)* | Every row in the processing tree — fan-out children, post-actions, relation resolutions | "How much work happened, and how much of it failed" |
| `incoming` | Distinct events actually received, before any fan-out | "How many events did the ERP actually send us" |

One received event routinely produces many monitoring rows, so `monitoring` totals are
legitimately much larger than `incoming` ones. Neither is wrong; they are different
denominators.

:::warning
`source: incoming` reads the received-payload store, which is kept for **14 days**. A
query with a longer window silently under-reports — a 30-day chart will show a
suspicious cliff two weeks back, and a 30-day total will simply be too low. For
anything beyond 14 days, use the default `monitoring` source.
:::

`source: incoming` also supports only `group_by: use_case_id`, and returns zero for the
level breakdown, because the received-payload store has no notion of an outcome.

## Who called the API

The **Access Token** tab, and `…/monitoring/access-logs`, show how the integration's
API tokens are actually being used — filterable by `token_id`, `service`, `method`,
`path`, `status` and time range, with cursor pagination.

```bash
curl -X POST 'https://integration-toolkit.sls.epilot.io/v1/integrations/{integrationId}/monitoring/access-logs' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{ "status": 403, "from_date": "2026-01-15T00:00:00Z" }'
```

This is the place to answer "is the middleware still calling us", "which token is
being used for what", and "why is it getting 403s" — questions the monitoring stream
cannot answer, because a rejected call never becomes a monitoring event.

## Related

- [Monitoring Codes](./codes.md) — what the code you found means
- [Alerting](./alerting.md) — find out without looking
- [External Monitoring Events](./external-events.md) — make traces span your middleware
