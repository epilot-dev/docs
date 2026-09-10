---
sidebar_position: 4
title: Alerting & Notifications
description: Configure per-integration alert rules, anomaly thresholds, digests and recipients so integration problems find you instead of the other way round
slug: /integrations/integration-toolkit/monitoring/alerting
---

# Alerting & Notifications

Monitoring tells you what happened when you go and look. Alerting tells you without
looking. Each integration has its own notification configuration: who gets told, about
what, and how often.

Open the integration in epilot 360 and use the **Notifications** tab. Everything below
is configurable there, and through the API on the integration's
`settings.notifications`.

## Getting started

Notifications are **off** until you turn them on. Switching them on gives you a
sensible starting set rather than a blank page:

| Rule | On by default? |
|---|---|
| Critical error | ✅ |
| Error rate | ✅ |
| Success-rate drop | ✅ |
| Recovery — all clear | ✅ |
| Warning rate | ❌ opt-in |
| Silence / heartbeat | ❌ opt-in |

Plus a **weekly digest**, Monday 08:00 in your organization's timezone, that skips
itself when nothing happened.

Add at least one recipient and save. The defaults are deliberately quiet — the two
noisiest rules start off.

:::tip
Use **Send test** on the Notifications tab to see exactly what an alert or digest looks
like. It renders a real notification and sends it **only to you**, and it is not
written to the notification history.
:::

## The rules

Six trigger types, each answering a different question.

### Critical error

Notifies the moment a single error occurs. This is the real-time path — it does not
wait for a sweep.

Because one bad deployment on your side can produce thousands of identical errors in
a minute, identical alerts are collapsed: once an alert has fired for a given code, the
same code stays quiet for the rule's window (2 hours by default) instead of paging you
repeatedly for one incident. Suppressed decisions still appear in the history, marked
`debounced`, so you can see what was folded in.

### Error rate and warning rate

Notify when errors — or warnings — in a window climb above normal. Use these instead
of *Critical error* when a trickle of failures is expected and only a surge matters.

Warning rate is off by default and, when enabled, is in-app only: warnings are common
enough that mailing every spike is rarely what you want.

### Success-rate drop

Notifies when the proportion of successful events falls below normal. This is the best
single health signal, because it catches "everything is slow and half of it is failing"
without you having to guess an error count.

It only evaluates once there are enough events to be meaningful — a handful of events
with one failure is not a 50% outage. That minimum sample counts **outcomes**: `info`
events (queued messages, ignored duplicates) are excluded, exactly as they are from the
[success rate itself](./overview.md#levels).

### Recovery — all clear

Notifies when an alerting integration returns to healthy. Worth leaving on: without it,
you learn things broke but never that they resolved.

### Silence / heartbeat

Notifies when an integration goes unusually **quiet**. This is the rule that catches
what counts and rates cannot: a middleware that has stopped calling produces no errors,
so every other rule stays green while nothing is being synced at all.

Off by default because a legitimately intermittent integration would cry wolf. If yours
sends continuously, turn it on — it is the difference between noticing a dead feed in
minutes and noticing it in a month.

## Fixed thresholds or automatic

Rate rules take either a number you choose or `auto`.

**A fixed threshold** is predictable and right when you know your own numbers — "more
than 20 errors an hour is a problem."

**`auto`** learns what normal looks like for *this* integration at *this* time of week,
and alerts on departures from it. It exists because integration traffic is not flat: a
nightly batch at 03:00 and a quiet Sunday afternoon have completely different normal
error counts, and one fixed number cannot be right for both. `auto` compares like with
like — this Tuesday 09:00 against previous Tuesday 09:00s — and is deliberately
resistant to one-off spikes, so a single bad hour does not teach it that bad hours are
normal.

Two knobs shape it:

| Setting | Effect |
|---|---|
| **Sensitivity** — low / medium / high | How far from normal counts as abnormal. Higher sensitivity alerts on smaller departures. Start at medium. |
| **Fallback threshold** | A plain number used while there is not yet enough history to know what normal is. |

**Cold start:** a new integration has no history, so `auto` behaves as the fallback
threshold until roughly two weeks of data exist, then switches over on its own. You do
not have to do anything, but it does mean a brand-new integration alerts on the
fallback number — set one you would actually be happy with.

The Notifications tab draws the learned range as a band with your current value marked
against it. The band is what the rule currently considers normal for this hour of the
week; a value outside it is what triggers the alert. A rule still in cold start shows
no band.

## Choosing what to watch {#choosing-what-to-watch}

By default a rule watches **every error-level code** across every use case. You can
narrow both axes.

**By use case** — restrict the integration to specific use cases, so a known-noisy
import does not drown a critical sync.

**By code** — either pick individual [codes](./codes.md), or use a group:

| Group | Matches |
|---|---|
| `_error_` | Every error-level code |
| `_warning_` | Every warning-level code |
| `_success_` | Every success-level code |
| `_info_` | Every info-level code |
| `_any_` | Everything, any level |
| `_parent_` | Whatever the integration-level scope is set to |

Groups and individual codes combine, so `_error_` plus `ACK_TIMEOUT` means "all errors,
and also that one warning I care about". Because [a code's level is
fixed](./overview.md#levels), a group scope keeps meaning the same thing as the
taxonomy grows.

A maximum of 20 rules per integration keeps evaluation bounded.

## Recipients and channels

Recipients are epilot users in the same organization. Channels are **email** and
**in-app**, set once as a default and overridable per rule — for instance error rate by
email and in-app, warning rate in-app only.

:::note
Channel settings are a ceiling, not an override. Each recipient's own notification
preferences still apply, so turning a channel **on** here never forces a delivery
someone has opted out of; turning it **off** does suppress it. A notification skipped
this way appears in the history as `recipient_opt_out`.
:::

## Digests

A digest is the scheduled counterpart to alerts: a periodic summary rather than an
interruption.

| Setting | Options |
|---|---|
| Frequency | Daily, or weekly on a chosen day |
| Time | Any time of day, in a timezone you pick |
| Channels | Email, in-app |
| Include healthy | List every integration, or only ones with issues |
| Skip if empty | Suppress the digest entirely when nothing happened |

Leaving **skip if empty** on is what keeps a weekly digest worth reading.

## Muting

**Mute** silences all non-digest alerts until a time you choose — for a planned ERP
migration, or while you work through a known backlog. Muted decisions are still
recorded in the history, marked `muted`, so muting never hides what happened. It is
time-boxed by design: there is no permanent mute to forget about.

## Seeing what fired, and why nothing did

The **Activity** list on the Notifications tab is the notification history: every real
decision, including ones that did **not** result in a message. That second part is what
makes it useful — when someone says "we should have been alerted", the history tells
you whether the rule never fired, or fired and was suppressed:

| `suppressed_reason` | Meaning |
|---|---|
| `muted` | The integration was muted at the time |
| `debounced` | An alert for that code had already fired inside its window |
| `recipient_opt_out` | Every recipient had that channel switched off |

Alongside it, the live status shows each rule's current state — `ok`, `alerting` or
`recovered` — with when it last fired and last cleared.

## From the API

The configuration lives on the integration itself, at `settings.notifications`, so it
round-trips through the normal integration `GET` and `PUT`. Three endpoints cover the
rest:

| Endpoint | Purpose | Permission |
|---|---|---|
| `GET …/notifications/status` | Live per-rule state, and the learned band for `auto` rules. Add `?include=baseline_series` for the full picture. | `integration:view` |
| `GET …/notifications/history` | Cursor-paginated decisions, newest first; `?type=` filters by rule type | `integration:view` |
| `POST …/notifications/test` | Render and send one notification to the calling user only | `integration:manage` |

```bash
curl 'https://integration-toolkit.sls.epilot.io/v2/integrations/{integrationId}/notifications/status' \
  -H 'Authorization: Bearer <token>'
```

:::note
Rules are evaluated on a sweep every few minutes, so status and rate-based alerts are
near-real-time rather than instant. *Critical error* is the exception — it fires on the
event itself.
:::

## Related

- [Monitoring Codes](./codes.md) — what to scope your rules to
- [Monitoring Overview](./overview.md) — levels, and why `info` is excluded from the success rate
- [Investigating events](./investigating.md) — what to do once an alert arrives
