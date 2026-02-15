---
sidebar_position: 1
title: Overview
---

# Integrations

epilot provides multiple integration paths depending on your use case -- from high-level ERP synchronization to low-level API batching and custom form submissions.

## Integration Options

| Approach | Use case | Entry point |
|---|---|---|
| **[ERP Toolkit](/docs/integrations/erp-toolkit/overview)** | Standardized ERP integration with mapping, monitoring, and event-driven sync | Best for energy-sector ERP systems (SAP, Wilken, Schleupen) |
| **[Batch API](/docs/integrations/batch-api)** | Execute multiple API calls in a single request | Best for bulk data operations and middleware with message quotas |
| **[3rd Party Journeys](/docs/integrations/3rd-party-journeys)** | Submit data from external forms and frontends | Best for custom checkout flows and headless integrations |
| **[Webhooks](/docs/webhooks)** | Receive real-time event notifications | Best for event-driven architectures |
| **[Public APIs](/api)** | Direct API access to all platform capabilities | Best for custom integrations with full control |

## Rate Limits

All epilot APIs enforce [rate limits](/docs/integrations/rate-limits) to ensure fair usage. Use the Batch API or ERP Toolkit for high-volume operations.

## Authentication

Integration APIs support two authentication methods:

| Method | Use case |
|---|---|
| **[Access Tokens](/docs/auth/access-tokens)** | Server-to-server integrations with scoped permissions |
| **[Publishable Tokens](/docs/auth/token-types)** | Client-side integrations (e.g., journey embeds, public cart checkout) |

See [Authentication](/docs/auth/authentication) for details.
