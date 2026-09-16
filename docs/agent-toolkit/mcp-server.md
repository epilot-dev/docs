---
title: MCP server reference
sidebar_position: 3
description: 'Every tool exposed by the epilot MCP server at mcp.epilot.io, grouped by purpose, with access requirements.'
---

# epilot MCP server

`https://mcp.epilot.io/mcp` is the official, hosted MCP server for the epilot platform. It is built for the person **configuring** epilot: solution engineers, administrators, partners taking over an organization. It answers three questions well:

1. **How is this organization set up?**
2. **What is connected to what?**
3. **What breaks if I change X?**

For everything else it exposes the full published OpenAPI catalog, so any epilot API operation can be discovered, described, and executed through one generic route.

## Design principles

- **Curated only where it earns its slot.** A dedicated tool exists when a workflow spans several APIs (journey plus design plus mapping plus automation), when validation should happen before a write, or when a raw payload would not fit a model context (tenant schemas are hundreds of kilobytes). Plain wrappers over single API operations were removed on 9 September 2026; those reads go through `search_configuration` and `call_api_operation`.
- **Read by default.** The OAuth scopes are `mcp:read` and `mcp:write`. Read-only is preselected on the approval screen. A connection over `/mcp?access=read` is enforced read-only.
- **Credentials never leave the server.** Responses from webhook, journey, and portal configuration endpoints have `auth` blocks, signed journey tokens, and Cognito wiring stripped. The removed paths are listed in `redacted_fields`, so a missing value is reported as redacted, not unset.
- **Your permissions, always.** Tools run as the signed-in user. The server never trusts a caller-supplied organization, and every upstream API applies its own permission checks.
- **PII masked.** Entity data on OAuth connections is anonymized server-side by an access token minted with the `anonymize` flag, using the open-source [@epilot/anonymization](https://github.com/epilot-dev/anonymization) library. Detection is best effort by default; set `data_classification: "pii"` on a schema attribute to guarantee it is masked. `whoami` reports the state as `entity_pii`. See [PII anonymization](/docs/agent-toolkit/setup#pii-anonymization).

## Tools

Access column: **Read** works with `mcp:read`. **Write** requires the `mcp:write` scope.

### Connection

| Tool     | Purpose                                                                                                 | Access |
| -------- | ------------------------------------------------------------------------------------------------------- | ------ |
| `whoami` | Organization, user, auth mode, granted scopes, and PII anonymization state. Call it first in a session. | Read   |

### Configuration graph

Powered by the Configuration Hub, which indexes 33 resource types. This is also how you list things: journeys are `type: journey`, webhooks `webhook`, portals `portal_config`, designs `designbuilder`, entity schemas `schema`, automations `automation_flow`.

| Tool                      | Purpose                                                                                                                                                         | Access |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `search_configuration`    | Without arguments: an org-wide inventory with counts per type. With a query or a type: find resources by name or alias, or list one resource type.              | Read   |
| `get_config_dependencies` | Forward edges: what a resource references, for example the automations, products, and email templates a journey uses.                                           | Read   |
| `get_config_impact`       | Reverse edges: what references a resource. Check before changing or deleting anything. An empty result with `index_status` not `ready` means unknown, not safe. | Read   |

### Entity model

| Tool                | Purpose                                                                                                                                                                                              | Access |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `get_entity_schema` | Compact tenant schema: attribute names, types, required flags. Verify attributes here before touching journeys, automations, or mappings. Slugs come from `search_configuration` with type `schema`. | Read   |

Entity records are searched on the generic route: `call_api_operation` with `searchEntities` and a Lucene query such as `_schema:contact AND first_name:Erika`. It is a read-equivalent POST and runs with `mcp:read`.

### Journeys

Journey writes on the generic route are redirected to these tools because they would bypass validation and mapping sync. The signed journey token is never returned.

| Tool                          | Purpose                                                                                                                                                                                                                                                                             | Access |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `get_journey`                 | One journey. `view=full` is the editable definition as accepted by `update_journey`. `view=summary` reduces steps to block names and shows logic wiring, injection rules, context parameters, and state flags.                                                                      | Read   |
| `validate_journey_definition` | Structural checks on journey steps with no API call: unique step IDs, schema keys matching every uischema scope, button targets pointing at existing steps. Returns the same problems the write tools would reject with, so a definition can be iterated on a read-only connection. | Read   |
| `create_journey`              | One call creates a working journey end to end: optionally a new design, the journey, the automation that maps submissions into entities, and optionally its mapping targets. Each part is reported as created or skipped with the reason. New journeys start inactive.              | Write  |
| `update_journey`              | Replace whole sections (name, steps, logics, rules, contextSchema, settings). Omitted sections stay unchanged. Step wiring is validated first.                                                                                                                                      | Write  |
| `get_journey_mapping`         | How submissions map into entities: versioned mapping targets and the executing automation, including `safeModeAutomation`.                                                                                                                                                          | Read   |
| `update_journey_mapping`      | Store mapping targets as a new version and keep the automation in sync. Skipped when `safeModeAutomation` is on. Conflict detection on version.                                                                                                                                     | Write  |

### Designs

Designs hold journey and portal branding. Find them with `search_configuration` type `designbuilder`; read one with `call_api_operation` and `getDesign`.

| Tool            | Purpose                                                                                                                                                   | Access |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `create_design` | Create a design. A style name and palette are enough; typography is inherited from the default design. Can also be passed inline to `create_journey`.     | Write  |
| `update_design` | Replace provided sections of a design; design tokens merge field by field. Affects every journey and portal using it, so check `get_config_impact` first. | Write  |

### API discovery and execution

The generic route for every published epilot API, including webhooks, portals, automations, workflows, products, and entity records.

| Tool                     | Purpose                                                                                                                                                                                                                                                                                                                                                                            | Access       |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `search_api_operations`  | Search operationIds, summaries, tags, and paths across all published OpenAPI specs. Omit the query to list every operation, optionally scoped to one service.                                                                                                                                                                                                                      | Read         |
| `describe_api_operation` | Method, path, parameters, request body, responses, security, and referenced schemas for one operationId.                                                                                                                                                                                                                                                                           | Read         |
| `call_api_operation`     | Execute an operation by operationId. The URL always comes from the trusted catalog, never from the caller. `GET` and the read-equivalent POSTs `searchEntities`, `simulateMapping`, and `simulateMappingV2` run with `mcp:read`; every other `POST`, `PUT`, `PATCH`, `DELETE` requires `mcp:write`. Large responses can be projected with the `response_filter` JSONata parameter. | Read / Write |

### Documentation

| Tool          | Purpose                                                                 | Access |
| ------------- | ----------------------------------------------------------------------- | ------ |
| `search_docs` | Search the published epilot documentation for how-to and concept pages. | Read   |
| `fetch_doc`   | Read one documentation page as Markdown, by URL from `search_docs`.     | Read   |

Both tools are limited to `docs.epilot.io`.

## Typical flows

**Understand an organization**

1. `search_configuration` with no arguments for the inventory.
2. `search_configuration` with a query or type to find the resource you care about.
3. `get_config_dependencies` and `get_config_impact` to walk the graph in both directions.

**Create a journey**

1. `get_journey` with `view=full` on a proven journey to copy block shapes instead of inventing them.
2. `validate_journey_definition` until the wiring is clean. This works on a read-only connection.
3. `create_journey` with the definition, an optional inline design, and mapping targets. Read the per-part report.
4. `get_journey_mapping` and `get_entity_schema` to confirm the mapping targets exist.

**Change a journey safely**

1. `get_config_impact` on the journey to see what depends on it.
2. `get_journey`, edit, then `update_journey` with only the changed sections.
3. `get_journey_mapping` to check whether new blocks need mapping.

**Call any API**

1. `search_api_operations` with a keyword, or scoped to a service.
2. `describe_api_operation` to see the request shape.
3. `call_api_operation` with the operationId and parameters. Use `response_filter` to keep large responses small.

**Iterate on an inbound mapping**

`simulateMappingV2` from the Integration Toolkit computes the resulting entity updates from a mapping and a sample payload without persisting anything, and runs with `mcp:read`. Simulate until the output is right, then store the configuration.

## Authentication

| Mode             | Best for                                               | How                                                                                                                                  |
| ---------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| OAuth 2.1        | Claude, ChatGPT, Cursor, and other interactive clients | The client discovers the authorization server, registers dynamically, and opens the epilot 360 login. Public clients with PKCE only. |
| epilot API token | Claude Code with `.mcp.json`, CI, service accounts     | Send the token as the Bearer header. The organization and roles are resolved from the token.                                         |

OAuth connections create a dedicated integration token named after the client and user, for example `MCP: Claude (Erika)`. It is visible and revocable in epilot 360 token settings, and revoking the MCP connection deletes it.

## Protocol

The server speaks the current MCP specification over stateless streamable HTTP and remains compatible with 2025-era streamable HTTP clients. Every request creates a fresh server; no session IDs are issued. Only tools are exposed. There are no resources or prompts.

## Limits

- Automation executions can only be queried per entity upstream, so org-wide failure triage is not available yet.
- Organizations can hold thousands of journeys. Narrow `search_configuration` with a query rather than listing the whole type.
- Large API responses are truncated with a note. Use `response_filter`, narrower queries, or pagination parameters.

## Changelog

- **2026-09-09**: Removed plain wrappers `list_webhooks`, `list_portals`, `describe_portal`, `list_designs`, `get_design`, `list_journeys`, `describe_journey`, `list_entity_schemas`, `search_entities`. Added `get_journey` with `view` and `validate_journey_definition`. `create_journey` now creates design, journey, mapping automation, and mapping targets in one call. Credential redaction moved into the generic route.
