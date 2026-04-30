---
sidebar_position: 2
---

# API First

:::info

As a core [engineering principle](https://github.com/epilot-dev/engineering-principles#api-first-we-design-software-with-apis), epilot designs API contracts before implementation.

:::

All APIs are defined using machine-readable standards:

- [OpenAPI specification](https://www.openapis.org/)
- [TypeScript type definitions](https://www.typescriptlang.org/)

## Public API

All core APIs are public. Partners and customers use them to build integrations and extend the platform.

<a className="button button--secondary" href="/api">Browse the API Reference</a>
{' '}
<a className="button button--secondary" href="/api/changelog">API Changelog</a>

## Webhooks & Event Schemas

epilot publishes platform events through [Webhooks](/docs/integrations/webhooks), enabling real-time push notifications to external systems. Events follow a standardized schema defined in [Core Events](/docs/integrations/core-events), covering entity lifecycle changes, workflow transitions, portal actions, and more.

Webhooks are the primary mechanism for outbound integrations — ERPs, middleware, and third-party systems subscribe to the events they care about and receive structured payloads as they happen. See [Payload Structure](/docs/integrations/webhooks/payload-structure/intro) for format details and [Security](/docs/integrations/webhooks/security) for signature verification.

## API Versioning & Compatibility

epilot maintains strong backwards compatibility commitments for all public APIs. This ensures integrations remain stable and predictable over time.

### Compatibility Guarantees

- **No breaking changes to existing operations** — existing API endpoints, request/response schemas, and webhook/event payloads remain backwards compatible
- **Additive changes only** — new fields, parameters, and endpoints may be added at any time; consumers should ignore unknown fields
- **Minimum two years support** — any published API route is supported for at least two years from its release

### Deprecation Policy

When an API operation needs to be retired:

1. **12-month notice period** — breaking changes are announced at least 12 months in advance
2. **Deprecation in OpenAPI spec** — deprecated operations are marked in the [OpenAPI definitions](/api), which propagates to generated SDKs and documentation
3. **Changelog announcement** — all deprecations are published in the [API Changelog](/api/changelog), available via RSS feed or email notifications

:::note Exceptions
Security vulnerabilities or regulatory/legal requirements may necessitate changes on shorter notice. In such cases, as much advance notice as feasible will be communicated.
:::

### What Constitutes a Breaking Change

- Removing an API endpoint (sunsetting)
- Removing or renaming a required request parameter
- Removing or renaming a response field
- Changing the type or format of an existing field
- Changing error codes or response status codes for existing scenarios
- Tightening validation on existing parameters

### Staying Informed

Subscribe to API changes through:

- **[API Changelog](/api/changelog)** — detailed changelog with RSS feed support
- **OpenAPI specs** — deprecation notices embedded in API definitions
- **Release notes** — major platform updates announced via email to registered developers

## Accessing APIs with MCP

:::tip
Developers using LLM clients (Claude Desktop, Cursor, etc.) can explore epilot APIs interactively through the [MCP](https://modelcontextprotocol.io/) server — no manual API doc browsing required.
:::

### Setup

Add this to your MCP client configuration (see [MCP setup guide](https://modelcontextprotocol.io/quickstart/user)):

```json title="MCP client config"
{
  "mcpServers": {
    "epilot-openapi": {
      "command": "npx",
      "args": ["-y", "openapi-analyzer-mcp"],
      "env": {
        "OPENAPI_DISCOVERY_URL": "https://docs.epilot.io/openapi-specs/apis.json"
      }
    }
  }
}
```

### Usage

Once configured, you can:

- Query available endpoints and schemas
- Explore request/response formats interactively
- Generate code examples for specific endpoints
