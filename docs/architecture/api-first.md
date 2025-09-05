---
sidebar_position: 2
---

# API First

:::info

As one of our core [engineering principles](https://github.com/epilot-dev/engineering-principles#api-first-we-design-software-with-apis), epilot is built API first, meaning the software is designed using concrete API contracts before implementation.

:::

We use machine readable standards to design and describe our APIs:

- [OpenAPI specification](https://www.openapis.org/)
- [GraphQL schemas](https://graphql.org/)
- [TypeScript type definitions](https://www.typescriptlang.org/)

## Public API

Our core APIs are public and free to use for our technical partners and customers to build and extend our product for their own purposes.

Click here to view our [API documentation](/api).

## Accessing APIs with MCP Server

For developers working with LLM clients (like Claude Desktop), you can interact with epilot APIs more naturally using our MCP (Model Context Protocol) server integration. This allows you to ask questions about our APIs and explore endpoints directly within your LLM interface.

### Setup

Add the following configuration to your MCP client settings (see [MCP configuration guide](https://modelcontextprotocol.io/quickstart/user) for detailed setup instructions):

```json
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

- Ask questions about available endpoints
- Get detailed information about API schemas
- Explore request/response formats interactively
- Generate code examples for specific endpoints
- Understand API relationships and dependencies

This integration makes it easier to discover and work with epilot's extensive API ecosystem directly from your development environment.
