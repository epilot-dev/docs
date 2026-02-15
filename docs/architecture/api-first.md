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

Browse the full [API Reference](/api).

## Webhooks & Event Schemas

epilot publishes platform events through [Webhooks](/docs/webhooks), enabling real-time push notifications to external systems. Events follow a standardized schema defined in [Core Events](/docs/webhooks/core-events), covering entity lifecycle changes, workflow transitions, portal actions, and more.

Webhooks are the primary mechanism for outbound integrations — ERPs, middleware, and third-party systems subscribe to the events they care about and receive structured payloads as they happen. See [Payload Structure](/docs/webhooks/payload-structure/intro) for format details and [Security](/docs/webhooks/security) for signature verification.

## Accessing APIs with MCP

Developers using LLM clients (Claude Desktop, Cursor, etc.) can explore epilot APIs through the [MCP](https://modelcontextprotocol.io/) server.

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
