---
sidebar_position: 1
title: Overview
---

# epilot CLI

[[GitHub](https://github.com/epilot-dev/sdk-js/tree/main/packages/cli)] [[npm](https://www.npmjs.com/package/@epilot/cli)]

One command to call any epilot API operation. No SDK setup, no boilerplate — just `npx epilot`.

:::tip
No install needed. Run any command with `npx epilot`.
:::

### Use cases

- **Quick API calls** — look up entities, search data, check configurations without writing code
- **Automation & scripting** — pipe JSON in/out, `--json` mode for `jq`-friendly output, `--no-interactive` for CI pipelines
- **AI agent tool use** — structured `--json` output and `--no-interactive` mode make it ideal as a tool for LLM agents and MCP servers
- **Explore & discover** — interactive operation picker, `--guided` mode, and built-in help with sample requests/responses for every operation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Install

<Tabs>
  <TabItem value="npx" label="npx (no install)" default>

```bash
npx epilot --help
```

  </TabItem>
  <TabItem value="npm" label="npm">

```bash
npm install -g @epilot/cli
```

  </TabItem>
</Tabs>

## Quick start

```bash
# Authenticate (opens browser)
epilot auth login

# List available operations for an API
epilot entity

# Call an operation
epilot entity getEntity contact abc123

# Search with a request body
epilot entity searchEntities -d '{"q":"*"}'

# Transform response with JSONata
epilot entity searchEntities -d '{"q":"*"}' --jsonata 'results[0]._title'
```

## Usage

```
epilot <api> <operationId> [params...] [flags]
```

Run `epilot <api>` to list available operations. Run `epilot <api> <operationId> --help` for operation details including parameters, sample calls, and sample responses.

### Flags

| Flag | Alias | Description |
| ---- | ----- | ----------- |
| `--token <token>` | `-t` | Bearer token for authentication |
| `--profile <name>` | | Use a named profile (or `EPILOT_PROFILE` env) |
| `--server <url>` | `-s` | Override server base URL |
| `--json` | | Output raw JSON (no colors, no metadata) |
| `--verbose` | `-v` | Verbose output (show request + response details) |
| `--include` | `-i` | Include response headers in output |
| `--jsonata <expr>` | | JSONata expression to transform response |
| `--guided` | | Prompt for all parameters interactively |
| `--no-interactive` | | Disable interactive prompts (for CI/scripts) |
| `--definition <file>` | | Override bundled OpenAPI spec with a file or URL |

### Parameter flags

| Flag | Alias | Description |
| ---- | ----- | ----------- |
| `-p key=value` | | Set a named parameter |
| `-d '{...}'` | | Request body JSON |
| `-H 'Key: Value'` | | Custom request header |

## Authentication

```bash
# Browser-based login (opens epilot portal)
epilot auth login

# Manual token
epilot auth login --token <your-token>

# Or pass token per-command
epilot entity listSchemas --token <your-token>

# Or via environment variable
EPILOT_TOKEN=<your-token> epilot entity listSchemas

# Check auth status
epilot auth status

# Logout
epilot auth logout
```

Token resolution order:
1. `--token` flag
2. `EPILOT_TOKEN` environment variable
3. Active profile token
4. Stored credentials (`~/.config/epilot/credentials.json`)
5. Interactive prompt (if TTY)

## Parameters

```bash
# Named parameters with -p
epilot entity getEntity -p slug=contact -p id=abc123

# Positional args map to path parameters in URL template order
epilot entity getEntity contact abc123

# Query parameters
epilot entity listSchemas -p unpublished=true
```

Positional arguments are mapped to path parameters in the order they appear in the URL template. For example, `/v1/entity/{slug}/{id}` maps the first positional arg to `slug` and the second to `id`.

## Request body

```bash
# Inline JSON with -d
epilot entity createEntity -p slug=contact -d '{"first_name":"John","last_name":"Doe"}'

# Pipe from file
cat entity.json | epilot entity createEntity -p slug=contact

# Pipe from another command
echo '{"q":"*"}' | epilot entity searchEntities
```

When running interactively without `-d` and no piped input, the CLI opens your `$EDITOR` with a pre-filled JSON template based on the request body schema.

## Response formatting

```bash
# Pretty-printed, syntax-highlighted JSON (default in TTY)
epilot entity getEntity contact abc123

# Raw JSON for piping to jq, etc.
epilot entity getEntity contact abc123 --json

# Include response headers
epilot entity getEntity contact abc123 --include

# Verbose: show full request + response metadata
epilot entity getEntity contact abc123 --verbose

# JSONata transformation
epilot entity searchEntities -d '{"q":"*"}' --jsonata 'results[0]._title'
epilot user getMeV2 --jsonata 'email'
```

In interactive mode, long output is automatically paged through `less`. Use `--no-interactive` to disable paging.

## Profiles

Manage multiple environments, similar to AWS CLI profiles:

```bash
# Create profiles
epilot profile create dev --server https://entity.dev.sls.epilot.io --token <dev-token>
epilot profile create staging --server https://entity.staging.sls.epilot.io --token <staging-token>
epilot profile create prod --token <prod-token>

# Switch active profile
epilot profile use dev

# Use per-command
epilot entity listSchemas --profile staging

# Or via environment variable
EPILOT_PROFILE=dev epilot entity listSchemas

# List / show / delete
epilot profile list
epilot profile show dev
epilot profile delete dev
```

Profiles store server URL, auth token, org ID, and custom headers in `~/.config/epilot/profiles.json`.

## Interactive mode

When running in a TTY without required arguments, the CLI prompts interactively:

- **No operation**: shows a searchable operation picker (type to filter)
- **Missing required params**: prompts for each one
- **Missing request body**: opens `$EDITOR` with a JSON template
- **No auth token**: prompts to paste a token

Disable with `--no-interactive` for CI/scripts.

### Guided mode

Use `--guided` to be prompted for **all** parameters, not just required ones. This is useful for exploring an API operation without having to look up every available parameter.

```bash
# Walk through all parameters for getEntity
epilot entity getEntity --guided

# Guided mode also opens the body editor for operations with a request body
epilot entity searchEntities --guided
```

Each optional parameter shows "(optional, press Enter to skip)" so you can quickly skip ones you don't need.

## OpenAPI spec override

For unreleased API features, override the bundled OpenAPI spec:

```bash
# From a local file
epilot entity getEntity -p slug=contact -p id=abc --definition ./my-spec.json

# From a URL
epilot entity getEntity --definition https://example.com/openapi.json

# Or place in .epilot/overrides/
mkdir -p .epilot/overrides
cp my-entity-spec.json .epilot/overrides/entity.json
epilot entity getEntity contact abc123  # automatically uses override
```

## Shell completions

Tab completion for API names, operation IDs, and flags:

```bash
# Auto-install for your current shell
epilot completion --install

# Or generate for a specific shell
epilot completion bash
epilot completion zsh
epilot completion fish
```

## API Commands

Per-API command reference with all operations, parameters, and sample calls. See the [API Commands](commands/entity) section in the sidebar, or browse the table below.

<!-- cli-commands-table -->

| API | Command | Reference |
| --- | ------- | --------- |
| Access Token API | `epilot access-token` | [reference](commands/access-token) |
| Address Suggestions API | `epilot address-suggestions` | [reference](commands/address-suggestions) |
| Address API | `epilot address` | [reference](commands/address) |
| AI Agents API - OpenAPI 3.0 | `epilot ai-agents` | [reference](commands/ai-agents) |
| App API | `epilot app` | [reference](commands/app) |
| Audit Log | `epilot audit-logs` | [reference](commands/audit-logs) |
| Automation API | `epilot automation` | [reference](commands/automation) |
| Billing API | `epilot billing` | [reference](commands/billing) |
| Blueprint Manifest API | `epilot blueprint-manifest` | [reference](commands/blueprint-manifest) |
| Consent API | `epilot consent` | [reference](commands/consent) |
| Portal API | `epilot customer-portal` | [reference](commands/customer-portal) |
| Dashboard API | `epilot dashboard` | [reference](commands/dashboard) |
| Data Management API | `epilot data-management` | [reference](commands/data-management) |
| Deduplication API | `epilot deduplication` | [reference](commands/deduplication) |
| Design Builder API v2 | `epilot design` | [reference](commands/design) |
| Document API | `epilot document` | [reference](commands/document) |
| Messaging Settings API | `epilot email-settings` | [reference](commands/email-settings) |
| Email template API | `epilot email-template` | [reference](commands/email-template) |
| Entity Mapping API | `epilot entity-mapping` | [reference](commands/entity-mapping) |
| Entity API | `epilot entity` | [reference](commands/entity) |
| Environments API | `epilot environments` | [reference](commands/environments) |
| ERP Integration API | `epilot erp-integration` | [reference](commands/erp-integration) |
| Event Catalog API | `epilot event-catalog` | [reference](commands/event-catalog) |
| File API | `epilot file` | [reference](commands/file) |
| Iban API | `epilot iban` | [reference](commands/iban) |
| Journey API | `epilot journey` | [reference](commands/journey) |
| Kanban API | `epilot kanban` | [reference](commands/kanban) |
| Message API | `epilot message` | [reference](commands/message) |
| Metering API | `epilot metering` | [reference](commands/metering) |
| Notes API | `epilot notes` | [reference](commands/notes) |
| Notification API | `epilot notification` | [reference](commands/notification) |
| Organization API | `epilot organization` | [reference](commands/organization) |
| Partner API | `epilot partner-directory` | [reference](commands/partner-directory) |
| Permissions API | `epilot permissions` | [reference](commands/permissions) |
| Pricing Tier API | `epilot pricing-tier` | [reference](commands/pricing-tier) |
| Pricing API | `epilot pricing` | [reference](commands/pricing) |
| Purpose API | `epilot purpose` | [reference](commands/purpose) |
| Sandbox API | `epilot sandbox` | [reference](commands/sandbox) |
| Submission API | `epilot submission` | [reference](commands/submission) |
| Targeting API | `epilot targeting` | [reference](commands/targeting) |
| Template Variables API | `epilot template-variables` | [reference](commands/template-variables) |
| User API | `epilot user` | [reference](commands/user) |
| Validation Rules API | `epilot validation-rules` | [reference](commands/validation-rules) |
| Webhooks | `epilot webhooks` | [reference](commands/webhooks) |
| Workflows Definitions | `epilot workflow-definition` | [reference](commands/workflow-definition) |
| Workflows Executions | `epilot workflow` | [reference](commands/workflow) |
<!-- /cli-commands-table -->
