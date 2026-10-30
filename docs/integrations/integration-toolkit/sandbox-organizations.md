---
sidebar_position: 8
title: Sandbox Organizations
description: How the Integration Toolkit processes the events of sandbox organizations, and how to plan large data loads
slug: /integrations/integration-toolkit/sandbox-organizations
---

# Sandbox Organizations

A sandbox organization is where you build and verify an integration: its mappings, its use cases and the real-time flows your end customers will use. The Integration Toolkit processes the inbound events of every sandbox organization on a dedicated **sandbox lane**, separate from production organizations and with a fixed, small processing capacity.

:::info What this means for you
- **Nothing is rejected and nothing is lost.** Every event you send to a sandbox is processed.
- **Large loads take longer.** A full data load that a production organization processes in minutes can take hours in a sandbox.
- **Real-time flows are unaffected.** Events sent with [interactive registration](./interactive-registration.md) keep their own lane in a sandbox too.
:::

## Which Organizations Are Sandboxes

epilot sets an organization's type when it is created: a sandbox belongs to a production organization and is used to prepare changes before they go live. You do not configure anything in the Integration Toolkit. Every page of the Integration Hub shows a banner while you work in a sandbox organization.

## What Runs on the Sandbox Lane

- Events sent to the [inbound API](./inbound/getting-started.md), on every version of the endpoint.
- Rows of file imports.
- Everything these events lead to: entity writes, relations and meter readings.

[Interactive](./interactive-registration.md) events are the exception. They run on the interactive lane exactly as in production, within the same [rate limits](./interactive-registration.md#rate-limits), so you can test registrations and contract additions end to end in a sandbox.

## How You Notice It

- A banner on every page of the Integration Hub, linking to this page.
- The monitoring code [`SANDBOX_LANE`](./monitoring/codes.md) (level `info`) on the integration while events arrive, at most once per hour per integration.
- Events are processed later than in a production organization when you send many of them at once. Their results are the same.

## Planning Large Data Loads

- **Test with a representative subset.** A few hundred to a few thousand records that cover your edge cases verify a mapping as well as the full data set does, and finish quickly.
- **Run full-volume loads in production.** Initial migrations and full resyncs belong in the production organization.
- **Ask for a time-boxed lift for a rehearsal.** If you need a full-volume dress rehearsal in a sandbox, for example before a go-live date, ask your epilot contact or epilot support in advance. For the agreed period the sandbox is processed like a production organization.

## Why Sandboxes Have Their Own Lane

Sandbox and production organizations share the same processing infrastructure. Keeping sandbox traffic on its own lane means a test in a sandbox can never slow down a production organization, including your own.
