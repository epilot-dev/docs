---
title: MCP server reference
sidebar_position: 3
description: 'Every tool exposed by the epilot MCP server at mcp.epilot.io, with access requirements and example prompts, plus how the server handles your data.'
---

# epilot MCP server

`https://mcp.epilot.io/mcp` is the official, hosted MCP server for the epilot platform. It connects AI assistants such as Claude, ChatGPT, Codex, Cursor, or your own agents to epilot through the [Model Context Protocol](https://modelcontextprotocol.io/). It is built for the person **configuring** epilot: solution engineers, administrators, partners taking over an organization. It answers three questions well:

1. **How is this organization set up?**
2. **What is connected to what?**
3. **What breaks if I change X?**

For everything else it exposes the full published OpenAPI catalog, so any epilot API operation can be discovered, described, and executed through one generic route.

:::info Beta
The epilot MCP server is available in **Beta** on all epilot plans. Your use is subject to your epilot agreement and to epilot's terms for beta features: the server is provided without a service level commitment, it is under active development, and its tools are subject to change. The [changelog](#changelog) at the end of this page lists every change to the tool surface. Share feedback and requests in the [agent-toolkit-for-epilot repository](https://github.com/epilot-dev/agent-toolkit-for-epilot/issues).
:::

## Before you start

- The **MCP Server** feature has to be enabled for your epilot organization by an administrator under **Settings → Features** in epilot 360. Until then, every connection is refused with `mcp_server_disabled`.
- Follow the [setup guide](/docs/agent-toolkit/setup) for your AI client. Read the [data protection recommendations](/docs/agent-toolkit/setup#permissions-and-data-protection) and the [security best practices](/docs/agent-toolkit/setup#security-best-practices) first if you work with a production organization.
- Only connect to the official endpoint `https://mcp.epilot.io/mcp`. epilot does not operate the MCP server under any other host, and a one-click installer or marketplace listing that points elsewhere is not from epilot.

## How it works

The MCP server does not receive your prompts and does not send any data to a third-party AI provider. Your AI client sends **individual tool calls** to the server, for example "search the configuration for journeys named *Solar*". The server executes each call against the epilot APIs **as the signed-in user in the chosen organization** and returns the result to your client. Everything the AI provider learns about your organization, it learns from those tool results inside your client.

Three things are enforced on the server before a result leaves epilot:

- **Permissions.** Every tool runs with your epilot permissions. Upstream APIs apply their normal permission checks on every call, so the assistant can only see and change what you can.
- **PII anonymization.** Entity data on OAuth connections is anonymized server-side by an access token minted with the `anonymize` flag. The assistant cannot disable it. See [PII anonymization](/docs/agent-toolkit/setup#pii-anonymization).
- **Credential redaction.** `auth` blocks, signed journey tokens, and portal authentication infrastructure are stripped from responses and reported in `redacted_fields`.

## Permissions

Two levels of permissions apply to every tool call:

| Level                       | What it controls                                                                                                                                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **MCP scope**               | `mcp:read` allows tools that read. `mcp:write` additionally allows tools that create or modify configuration. Read-only is preselected on the epilot login; write is an explicit choice. A connection over `/mcp?access=read` is enforced read-only regardless of consent. |
| **epilot permissions**      | The signed-in user's roles in the chosen organization. A tool call that the user could not perform in epilot 360 fails in the same way through the MCP server.                                                |

Connecting through OAuth creates a dedicated integration token on your behalf, so the approving user also needs permission to create access tokens in that organization.

## Design principles

- **Curated only where it earns its slot.** A dedicated tool exists when a workflow spans several APIs (journey plus design plus mapping plus automation), when validation should happen before a write, or when a raw payload would not fit a model context (tenant schemas are hundreds of kilobytes). Plain wrappers over single API operations were removed on 9 and 17 September 2026; those reads and writes go through `search_configuration` and `call_api_operation`.
- **Read by default.** The OAuth scopes are `mcp:read` and `mcp:write`. Read-only is preselected on the approval screen.
- **Validate before writing.** Journey and workflow writes go through curated tools that check the definition before anything reaches the API. Both workflow tools and the generic route support dry runs on read-only connections.
- **Credentials never leave the server.** Responses from webhook, journey, and portal configuration endpoints have `auth` blocks, signed journey tokens, and Cognito wiring stripped. The removed paths are listed in `redacted_fields`, so a missing value is reported as redacted, not unset.
- **Your permissions, always.** Tools run as the signed-in user. The server never trusts a caller-supplied organization, and every upstream API applies its own permission checks.
- **PII masked.** Entity data on OAuth connections is anonymized server-side using the open-source [@epilot/anonymization](https://github.com/epilot-dev/anonymization) library. Detection is best effort by default; set `data_classification: "pii"` on a schema attribute to guarantee it is masked. `whoami` reports the state as `entity_pii`.

## Tools

The server exposes 17 tools in seven groups. Each entry lists the required **access** (**Read** works with `mcp:read`, **Write** requires `mcp:write`) and example prompts you can type into your assistant as they are. Prompts are examples; your assistant picks the tool, you never call it by name.

### Connection

#### `whoami`

_Access: Read_

Returns the organization, user, authentication mode, granted scopes, and whether entity data is PII-anonymized for this connection. Call it first in a session, and whenever organization, write access, or masked values are unclear.

- Which epilot organization are you connected to right now?
- Do you have write access on this connection?
- Why do I see placeholder names instead of real customer names?

### Configuration graph

Powered by the Configuration Hub, which indexes 33 resource types. This is also how you list things: journeys are `type: journey`, webhooks `webhook`, portals `portal_config`, designs `designbuilder`, entity schemas `schema`, automations `automation_flow`, workflows `flow_template`.

#### `search_configuration`

_Access: Read_

Without arguments: an org-wide inventory with counts per type. With a query or a type: find resources by name or alias, or list one resource type. Pass a type whenever it is known; a search without type fans out to every configuration type and is slow.

- Give me an overview of everything configured in this organization.
- List all journeys and tell me which ones are inactive.
- Find every automation with "Wärmepumpe" in its name.

#### `get_config_dependencies`

_Access: Read_

Forward edges: what a resource references, for example the automations, products, and email templates a journey uses.

- Which products, automations, and email templates does the "Solar Anfrage" journey use?
- What does the "New order" automation depend on?

#### `get_config_impact`

_Access: Read_

Reverse edges: what references a resource. Check before changing or deleting anything. An empty result with `index_status` not `ready` means unknown, not safe.

- What would break if I deleted the "Order confirmation" email template?
- Which journeys and automations use the contact schema attribute `customer_number`?
- Is it safe to deactivate this webhook?

### Entity model

#### `get_entity_schema`

_Access: Read_

Compact tenant schema: attribute names, types, and required flags. The raw schema is hundreds of kilobytes and does not fit a tool result. Verify attributes here before touching journeys, automations, or mappings. Slugs come from `search_configuration` with type `schema`.

- Which attributes does our contact schema have, and which are required?
- Is there an attribute for the meter number on the meter schema?
- Compare the opportunity schema with the order schema.

Entity records are searched on the generic route: `call_api_operation` with `searchEntities` and a Lucene query such as `_schema:contact AND first_name:Erika`. It is a read-equivalent POST and runs with `mcp:read`.

### Journeys

Journey writes on the generic route are redirected to these tools because they would bypass validation and mapping sync. The signed journey token is never returned.

#### `get_journey`

_Access: Read_

One journey. `view=full` (default) is the editable definition as accepted by `update_journey`: steps with schema and uischema, logics, injection rules, context parameters, and safe settings. `view=summary` reduces steps to block names and shows logic wiring, injection rules, context parameters, and state flags, small enough for an overview of a large journey.

- Summarize the steps and logic of the "Netzanschluss" journey.
- Show me the full definition of the tariff calculator journey so we can copy its product block.
- Which context parameters does this journey accept?

#### `create_journey`

_Access: Write_

One call creates a working journey end to end: optionally a new design, the journey, the automation that maps submissions into entities, and optionally its mapping targets. Step wiring (unique step IDs, uischema scopes matching schema properties, resolvable step targets) is validated before any API call. Each part is reported as created or skipped with the reason. New journeys start inactive.

- Create a heat pump inquiry journey with a contact step, an address step, and a consent step, and map submissions to a contact and an opportunity.
- Build a copy of the "Solar Anfrage" journey for wallboxes with our brand colors as a new design.

#### `update_journey`

_Access: Write_

Replace whole sections (name, steps, logics, rules, contextSchema, settings). Omitted sections stay unchanged. Read the current definition with `get_journey` first, and check `get_config_impact` before changing a journey that other configuration references. Step wiring is validated first.

- Add a step asking for the desired installation date after the address step.
- Rename the journey and activate it.
- Change the logic so that business customers skip the consumption step.

#### `get_journey_mapping`

_Access: Read_

How submissions map into entities: versioned mapping targets and the executing automation, including `safeModeAutomation`. Read this before `update_journey_mapping`, and after adding blocks with `update_journey` to check whether they need mapping.

- Which entity attributes does this journey write to when a customer submits it?
- Are all blocks of the journey mapped, or is anything unmapped?

#### `update_journey_mapping`

_Access: Write_

Store mapping targets as a new version and keep the automation in sync. Skipped when `safeModeAutomation` is on. Conflict detection on version, so re-read with `get_journey_mapping` on conflict. Verify target attributes with `get_entity_schema` before storing.

- Map the new installation date block to the opportunity attribute `preferred_installation_date`.
- Also create a meter entity from the meter number block.

### Workflows

Workflows (Prozesse) are described as a compact graph of tasks, phases, decision branches, and loops. The server compiles the graph into a valid flow template, validates it like the backend, and the Workflow Definition API creates and links the trigger automation and one automation per automated task. Both tools accept `dryRun`, which returns the compiled template without saving and works on read-only connections.

#### `create_workflow`

_Access: Write (dry run: Read)_

Create a workflow from named tasks (manual, automation, decision, AI agent) wired with next pointers, optional phases, decision branches with conditions on the trigger entity, a default branch, and loops with a maximum iteration count. The result lists every created automation, edges the backend healed away, and limit warnings. New workflows start disabled unless requested otherwise.

- Create a lead qualification workflow for opportunities: call the customer, and if not reached retry up to three times, then close as lost. If reached, send the welcome email template.
- Design a grid connection process with the phases "Check", "Offer", and "Installation", and show me the compiled template before creating it.

#### `update_workflow`

_Access: Write (dry run: Read)_

Update an existing workflow. With tasks: replace the full graph in the `create_workflow` format, keeping stored task and phase IDs so linked automations survive. Without tasks: change only name, description, enabled flag, linear flag, or closing reasons. Enabling a reviewed workflow is the most common use. Reports what changed and what the backend will delete.

- Enable the "Lead-Qualifizierung" workflow now that we reviewed it.
- Add a "Send reminder" automation task after the second unsuccessful call.
- Rename the workflow and add "Duplicate" as a closing reason.

### API discovery and execution

The generic route for every published epilot API, including webhooks, portals, automations, products, and entity records.

#### `search_api_operations`

_Access: Read_

Search operationIds, summaries, tags, and paths across all published OpenAPI specs. Without a query and service it returns the list of services with their operation counts; with a service and no query it lists that service's operations. This is the entry point for anything no curated tool covers.

- Which epilot APIs are available through this connection?
- Find the API operation for listing webhook configurations.
- What operations does the Pricing API offer?

#### `describe_api_operation`

_Access: Read_

Method, path, parameters, request body, and referenced component schemas for one operationId, with responses as status and description. `view=full` adds response schemas. Call it before the first execution of an operation instead of guessing field names.

- What does the request body for creating a product look like?
- Which query parameters does the entity search accept?

#### `call_api_operation`

_Access: Read for `GET`, `searchEntities`, and `simulateMappingV2`; Write for every other `POST`, `PUT`, `PATCH`, `DELETE`_

Execute an operation by operationId. The URL always comes from the trusted catalog, never from the caller. Large responses can be projected with the `response_filter` JSONata parameter, which is required when a call fails with `RESULT_TOO_LARGE`. Credentials embedded in webhook, journey, and portal configurations are removed and listed in `redacted_fields`. Journey and workflow writes are redirected to the curated tools.

- How many contacts do we have in Bavaria? Search entities by postal code.
- List all webhook configurations and their target URLs.
- Simulate the inbound mapping for meter readings with this sample payload and show me the resulting entity update.
- Create a new product "Wallbox Premium" with a one-time price of 1,299 euros.

### Documentation

Both tools are limited to `docs.epilot.io`.

#### `search_docs`

_Access: Read_

Search the published epilot documentation for how-to and concept pages. Use it to explain how a feature works before touching configuration.

- How do purposes on entities work in epilot?
- Where is the documentation for the Integration Toolkit mapping syntax?

#### `fetch_doc`

_Access: Read_

Read one documentation page as Markdown, by URL from `search_docs`.

- Read the page about journey embedding and summarize the options.

## Typical flows

**Understand an organization**

1. `search_configuration` with no arguments for the inventory.
2. `search_configuration` with a query or type to find the resource you care about.
3. `get_config_dependencies` and `get_config_impact` to walk the graph in both directions.

**Create a journey**

1. `get_journey` with `view=full` on a proven journey to copy block shapes instead of inventing them.
2. `get_entity_schema` to verify the attributes the mapping targets should write to.
3. `create_journey` with the definition, an optional inline design, and mapping targets. Structural problems come back as `INVALID_INPUT` before any API call. Read the per-part report.
4. `get_journey_mapping` to confirm the mapping targets exist.

**Change a journey safely**

1. `get_config_impact` on the journey to see what depends on it.
2. `get_journey`, edit, then `update_journey` with only the changed sections.
3. `get_journey_mapping` to check whether new blocks need mapping.

**Build a workflow**

1. `get_entity_schema` on the trigger entity to verify the attributes used in decision branches.
2. `create_workflow` with `dryRun: true` to review the compiled template. This works on a read-only connection.
3. `create_workflow` without dry run to create the workflow, disabled.
4. Review it in epilot 360, then `update_workflow` with `enabled: true`.

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

OAuth connections create a dedicated integration token named after the client and user, for example `MCP: Claude (Erika)`. It is visible and revocable in epilot 360 token settings, and revoking the MCP connection deletes it. A connection lives for at most seven days before the user has to sign in again.

## Monitor usage

- **Token settings.** Every OAuth connection appears as an integration token in epilot 360 under **Settings → Access Tokens**, named after the AI client and the approving user. Administrators see at a glance who has connected which assistant, and can revoke a connection there.
- **Audit logs.** Changes made through the MCP server are recorded in the [audit log](/docs/audit-logs) like any other change, with the integration token as the acting user. Filter by the token name to review what an assistant changed. Audit logs are an enterprise-tier feature.
- **`whoami`.** Ask the assistant which connection it uses when a result looks unexpected. The answer names the organization, scopes, and anonymization state.

## Protocol

The server implements the current MCP specification over stateless [streamable HTTP](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports#streamable-http) with the standard [MCP authorization](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization) flow (OAuth 2.1 with authorization server discovery and dynamic client registration), and remains compatible with 2025-era streamable HTTP clients. Every request creates a fresh server; no session IDs are issued. Only tools are exposed. There are no resources or prompts. The server is listed in the official MCP Registry as `io.epilot/mcp`.

## Limits

- Automation executions can only be queried per entity upstream, so org-wide failure triage is not available yet.
- Organizations can hold thousands of journeys. Narrow `search_configuration` with a query rather than listing the whole type.
- Large API responses are truncated with a note. Use `response_filter`, narrower queries, or pagination parameters.
- A single tool call has to complete within 25 seconds. Long-running upstream operations return `request_timeout`.

## Changelog

- **2026-09-17** (0.11): Removed `create_design` and `update_design`. A design is created through the `design` field of `create_journey` or `addDesign` on the generic route. Removed `validate_journey_definition`; `create_journey` and `update_journey` run the same structural checks before any API call. `search_api_operations` returns a service overview without a query. `describe_api_operation` returns the request contract by default; `view=full` adds response schemas.
- **2026-09-10** (0.10): Added `update_workflow`: full-graph replace compiled against the stored template so linked automations survive by task ID, or metadata-only changes such as enabling a reviewed workflow.
- **2026-09-09** (0.9): Added `create_workflow`: compiles a compact graph description into a flow template with branches, a default branch, and loops. The backend links the automations.
- **2026-09-09** (0.8): Removed plain wrappers `list_webhooks`, `list_portals`, `describe_portal`, `list_designs`, `get_design`, `list_journeys`, `describe_journey`, `list_entity_schemas`, `search_entities`. Added `get_journey` with `view`. `create_journey` now creates design, journey, mapping automation, and mapping targets in one call. Credential redaction moved into the generic route.
