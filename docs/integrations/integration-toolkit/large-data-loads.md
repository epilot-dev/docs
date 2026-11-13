---
sidebar_position: 8
title: Large Data Loads
description: How the Integration Toolkit processes migrations, full resyncs and large file imports, and the one response your client has to handle for them
slug: /integrations/integration-toolkit/large-data-loads
---

# Large Data Loads

An initial migration, a full resync or a large file import sends far more events than an integration's everyday traffic. The Integration Toolkit recognizes such a load by itself and processes it on capacity set aside for it, so that it does not slow down other organizations and is not slowed down by them.

:::info What this means for you
- **Everyday traffic is processed promptly.** Another organization's large load does not slow it down.
- **Large loads need no configuration.** They are recognized automatically. Nothing is rejected in the normal case, nothing is lost, and the results are the same as for any other event.
- **Large loads take longer.** The first part is processed at once. After a short pause, the rest follows at a steady pace, which can take hours for a very large migration.
- **Interactive inbound is unaffected.** Pushes an end customer is waiting for keep their own lane.
- **One response to handle.** Rarely, a request is refused with `503` and `BULK_CAPACITY_EXHAUSTED`. Wait for the `Retry-After` interval and send it again. See [When Capacity Is Exhausted](#when-capacity-is-exhausted).
:::

## Everyday Traffic and Large Loads

The inbound events of all organizations are processed together. Each organization has an **allowance** for that: how many events it can send in a short time and still count as everyday traffic. Single changes, delta syncs and occasional batches stay within it.

An organization that sends more than its allowance covers is treated as running a **large load**. A migration or a full resync does that: it sends thousands of events within minutes. From then on, the organization's events are processed on capacity set aside for the load:

- **At a pace that follows the health of the services behind it**, not as fast as the events arrive. A load moves faster when the platform is quiet and slower when it is busy, so that it does not degrade everyday traffic.
- **With the same ordering rules as everyday traffic.** What the inbound API says about the order of events, under `group_id` in the [API reference](https://docs.epilot.io/api/erp-integration), applies to a large load as well.
- **Until the load has finished** and the organization has been quiet for a while. After that, its events count as everyday traffic again.

Your large load does not slow down other organizations, and their large loads do not slow down your everyday traffic.

### What Counts {#what-counts}

- Every event sent to the [inbound API](./inbound/getting-started.md), on every version of the endpoint.
- Every row of a [file import](#file-imports).
- Every [replayed](./monitoring/investigating.md#replaying-events) event.

An event that turns into very many entity updates counts for more than one that writes a single entity. Events processed with [interactive inbound](./interactive-inbound.md) do not count.

## What a Large Load Looks Like {#what-a-large-load-looks-like}

From the outside, a large load runs in three steps:

1. **The beginning is processed at once**, like everyday traffic, up to the allowance.
2. **A short pause.** Once the load is recognized, the rest of it waits until the events already queued ahead of it have been processed. This usually takes a few minutes. Your requests are accepted as usual during the pause.
3. **A steady pace.** The rest of the load is processed steadily until it is done. For a very large migration, this can take hours.

The results are the same as for everyday traffic: the same mappings, the same entities and the same [monitoring codes](./monitoring/codes.md). Follow the progress in the [Monitoring tab](./monitoring/overview.md), where the events appear as they are processed.

**Your own everyday traffic joins the load.** While a load runs, everything else the organization sends through the inbound API and file imports is processed as part of it, at the load's pace. A delta sync sent during a migration therefore takes longer than usual. Send what an end customer is waiting for with [interactive inbound](./interactive-inbound.md), which a large load does not delay.

There are no fixed processing times. How long a load takes depends on its size, on the work each event causes and on how busy the platform is.

## When Capacity Is Exhausted {#when-capacity-is-exhausted}

The capacity for large loads that run at the same time is limited. If all of it is in use at the moment your organization goes over its allowance, the request that goes over it is refused. This is rare. Requests within the allowance are never refused for this reason, and neither are interactive events.

### The Response

A refused request is answered with HTTP `503`, a `Retry-After` header and the error code `BULK_CAPACITY_EXHAUSTED`. This applies to `POST /v3/erp/updates/events`, to the deprecated v1 and v2 endpoints, and to [replays](./monitoring/investigating.md#replaying-events).

```http title="503 — a request refused whole"
HTTP/1.1 503 Service Unavailable
Retry-After: 60
Content-Type: application/json

{
  "code": "BULK_CAPACITY_EXHAUSTED",
  "message": "The bulk capacity is exhausted: this organisation has used up its allowance and every bulk slot is taken. Nothing of this request was accepted. The request can be retried after the Retry-After interval."
}
```

The body is the error alone: it carries no `correlation_id` and no `results`. Nothing of the request was queued, and its deduplication ids were not used up, so the same request sent again is processed, not skipped as a duplicate.

### What to Do {#what-to-do}

1. **Wait for the `Retry-After` interval**, in seconds. Read it from the header rather than using a fixed delay. Retrying sooner does not help.
2. **Send the same request again**, unchanged.
3. **Hold back the requests that follow it** until the retry is accepted, so that your events keep the order in which you send them.
4. **If the retry is refused again, wait again.** Capacity becomes free as other loads finish. If refusals continue for a long time, contact epilot support.

Give every event a `deduplication_id`. A request refused whole can be sent again either way, but with deduplication ids, every retry, whether after a `503`, a timeout or a lost response, is recognized and never processed twice.

### Requests That Mix Interactive and Other Events {#mixed-requests}

Interactive events do not count towards the allowance and are never refused for lack of capacity. When a request carries interactive events and others, for example `interactive: true` on the request while one of its events belongs to a use case that does not allow interactive processing, only the other events are refused. The response is still a `503` with `Retry-After`, and it lists every event:

```json title="503 — a mixed request: the interactive event was accepted"
{
  "code": "BULK_CAPACITY_EXHAUSTED",
  "message": "The bulk capacity is exhausted: this organisation has used up its allowance and every bulk slot is taken. Nothing of this request was accepted. The request can be retried after the Retry-After interval.",
  "correlation_id": "018f8e9b-5a1b-7c4e-9b2a-4f0f6c1d7a21",
  "results": [
    {
      "event_id": "0199c3f2-8a41-7d0e-b6c7-2f1a9d3e4b55",
      "status": "success",
      "interactive": true,
      "lane": "interactive"
    },
    {
      "event_id": "0199c3f2-8a42-7a10-9c3e-5b7d2e1f0a66",
      "status": "error",
      "message": "The bulk capacity is exhausted: this organisation has used up its allowance and every bulk slot is taken. Nothing of this request was accepted. The request can be retried after the Retry-After interval."
    }
  ]
}
```

- **Read `results`, not `message`.** The top-level `message` is the same text as for a request refused whole. Events with `success` were accepted; events with `error` and the capacity message were refused.
- **Retry the refused events** after the `Retry-After` interval. You can also send the whole request again if every event carries a `deduplication_id`: the accepted events then come back `skipped`.
- **A close is not applied.** A `correlation_complete: true` on such a request is ignored with the reason `retry_requested`, as the response's `correlation_close` says. The retry closes the correlation; see [What Became of the Close](./interactive-inbound.md#what-became-of-the-close).

Events that asked for interactive processing but run as everyday traffic, because the organization is over its [interactive rate limit](./interactive-inbound.md#rate-limits), count as everyday traffic here as well and can be refused like any other.

## File Imports {#file-imports}

A file import counts as a whole. A large import is recognized as a large load when it starts, and its rows are processed as described above.

If the capacity for large loads is exhausted when an import needs it, the import does not fail. It waits and tries again by itself, for several hours:

- While it waits, its status stays `PROCESSING` and its progress does not advance.
- Rows already sent stay sent. The import continues where it stopped, and no row is sent twice.
- You can abort the import while it waits.

Only if no capacity becomes free in that time does the import fail, with the error code `BULK_CAPACITY_EXHAUSTED` and this message:

```text
the platform cannot take more rows for this organisation right now and stopped the import — rows already sent stay sent, please run the import again in a little while
```

Run the import again later: validate it, then execute it. The rows that were already sent are sent again and update the same entities.

## Planning a Migration {#planning-a-migration}

- **Tell epilot about a very large migration in advance.** For an initial load of a whole customer base, or a full resync, ask your epilot contact or epilot support ahead of time and agree on a time window. epilot can then set capacity aside for that window, so that it is ready when your load starts.
- **Verify the mapping on a subset first.** Use the [mapping simulation endpoint](./overview.md#inbound-api) and a small batch. A mapping error in a large load repeats for every event.
- **Handle the `503` before you start**, and give every event a `deduplication_id`. See [What to Do](#what-to-do).
- **Plan for hours, not minutes.** Allow for a very large migration to take hours, and schedule cut-overs and go-live dates accordingly.
- **Keep end customers' flows on interactive inbound.** Registrations and contract additions that happen during a migration are not delayed by it. Do not set `interactive: true` on the migration itself; see [Common Mistakes](./interactive-inbound.md#common-mistakes).
- **Rehearse in a sandbox with a subset, and run the full volume in production.** Large loads in a sandbox are processed at a deliberately low rate; see [Sandbox Organizations](./sandbox-organizations.md).

## Next Steps

- [Sandbox Organizations](./sandbox-organizations.md) — how large loads behave in a sandbox
- [Inbound Getting Started](./inbound/getting-started.md) — the inbound API and its responses
- [Interactive Inbound](./interactive-inbound.md) — pushes an end customer is waiting for
- [Investigating Events](./monitoring/investigating.md) — traces and replay
