---
sidebar_position: 8
title: Sandbox Organizations
description: How the Integration Toolkit processes the events of sandbox organizations, and how to plan large data loads in them
slug: /integrations/integration-toolkit/sandbox-organizations
---

# Sandbox Organizations

A sandbox organization is where you build and verify an integration: its mappings, its use cases and the real-time flows your end customers will use. The Integration Toolkit processes a sandbox's everyday inbound traffic exactly as it does a production organization's. [Large data loads](./large-data-loads.md) are the difference: in a sandbox, they share a small capacity with the large loads of all other sandbox organizations and run at a deliberately low rate.

:::caution Not active yet
The handling of large loads on this page belongs to the processing described on [Large Data Loads](./large-data-loads.md). It is built and tested, but switched off in every environment, and there is no date for switching it on. The page says what happens once it is on.
:::

:::info What this means for you
- **Everyday traffic is processed as in production.** Single events, small batches and test runs are as quick as in a production organization.
- **Large loads take much longer.** A full data load can take many times longer in a sandbox than in a production organization.
- **Nothing is lost.** Every event a sandbox accepts is processed, with the same results as in production.
- **Real-time flows are unaffected.** Events sent with [interactive inbound](./interactive-inbound.md) keep their own lane in a sandbox too.
:::

## Which Organizations Are Sandboxes

epilot sets an organization's type when it is created: a sandbox belongs to a production organization and is used to prepare changes before they go live. You do not configure anything in the Integration Toolkit. Every page of the Integration Hub shows a banner while you work in a sandbox organization.

## What Is Different in a Sandbox

Everything on [Large Data Loads](./large-data-loads.md) applies to sandboxes, with one difference: the large load of a sandbox runs on a small capacity that all sandbox organizations share, at a deliberately low rate, until it has finished.

- **Everyday traffic**, within the organization's allowance, is processed together with every other organization's, as in production.
- **Large loads**, whether sent through the inbound API, as a file import or as a replay, run on the capacity all sandboxes share.
- **Interactive events** run exactly as in production, within the same [rate limits](./interactive-inbound.md#rate-limits), so you can test registrations and contract additions end to end.
- **The `503` responses** described in [When Capacity Is Exhausted](./large-data-loads.md#when-capacity-is-exhausted) and [When Ingestion Is Busy](./large-data-loads.md#when-ingestion-is-busy) can occur in a sandbox as well, and are handled the same way. The [size limits](./large-data-loads.md#size-limits) apply too.

## How You Notice It

- A banner on every page of the Integration Hub, linking to this page.
- The monitoring code [`SANDBOX_LANE`](./monitoring/codes.md) (level `info`) on the integration while the events of a large load arrive through the inbound API, at most once per hour per integration.
- The events of a large load are processed later than they would be in a production organization. Their results are the same.

## Planning Large Data Loads

- **Test with a representative subset.** A few hundred records that cover your edge cases verify a mapping as well as the full data set does, and they are processed quickly.
- **Run full-volume loads in production.** Initial migrations and full resyncs belong in the production organization. See [Planning a Migration](./large-data-loads.md#planning-a-migration).
- **Ask epilot ahead of a full-volume rehearsal.** If you need a full-volume dress rehearsal in a sandbox, for example before a go-live date, ask your epilot contact or epilot support in advance. For the agreed period, the sandbox is processed like a production organization.

## Why Sandboxes Are Treated Differently

Sandbox and production organizations share the same processing platform. Keeping the large loads of sandboxes on a small, shared capacity means that a test in a sandbox can never slow down a production organization, including your own.
