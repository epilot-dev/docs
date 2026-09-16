---
title: Setup
sidebar_position: 2
description: 'Install the epilot plugin or connect the epilot MCP server in Claude, ChatGPT, Codex, and other MCP clients, including the administrator steps.'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Set up the Agent Toolkit

This guide walks you through connecting your AI assistant to epilot. Every route ends with the same step: the client opens the epilot login, you choose an organization, and you choose the access level. **Read-only is preselected**; read-and-write is an explicit choice.

:::info Plugins and connectors are usually managed by an administrator
Most AI tools, including **ChatGPT** and **Claude**, are rolled out to companies as managed workspaces. In these workspaces, plugins and custom MCP connectors are disabled by default, and a workspace or IT administrator has to enable them manually before you can add the epilot plugin or connector. If you don't see the options described below in your client, ask your administrator to follow the **Administrator** steps in your client's tab.
:::

:::warning Use the MCP server only with enterprise editions or EU-regulated models
The epilot MCP server sends your organization's configuration, and depending on the tools you use, entity data, to the AI provider that runs your assistant. We recommend using it only with **enterprise editions** of AI tools, which come with a data processing agreement and exclude your data from model training, or with **models hosted and regulated within the EU**. Do not connect the epilot MCP server from consumer or free plans of AI tools that may use your conversations for training or store them outside the EU. Check with your data protection officer if you are unsure which plan your company uses. Entity data is [PII-anonymized by default](#pii-anonymization) on every OAuth connection, but configuration data such as journey texts and workflow names is sent as is.
:::

## Before you start

Make sure you have:

- An **epilot user account** in the organization the assistant should work with. Every tool runs with your permissions, so the assistant can only see and change what you can.
- A **[sandbox organization](/docs/blueprints/sandboxes)** if the assistant should build or change configuration. Keep production connections read-only; see [The typical workflow: sandbox first](/docs/agent-toolkit#the-typical-workflow-sandbox-first).
- An AI client on an **enterprise plan** or an **EU-regulated model** (see the warning above).
- **Plugins or custom connectors enabled** in your AI client by your administrator (see the note above).
- **Node.js 22 or newer** on your machine if you install the full plugin. The plugin's Volt UI server runs locally through `npx`.

## Choose your route

The toolkit has two parts. Which one you can use depends on your client:

| Route              | You get                                                            | Works in                                                                          |
| ------------------ | ------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| **epilot plugin**  | Skills (epilot know-how) **and** the MCP server, connected for you | Clients that support [Agent Plugins](https://agent-plugins.org): Claude Code, Codex, the ChatGPT desktop app, and Claude workspaces where an admin has imported the plugin |
| **MCP server only** | The live tools, without the packaged know-how                      | Any client that supports remote MCP over HTTP with OAuth: Claude.ai, Claude Desktop, Claude Cowork, ChatGPT, Cursor, VS Code, custom agents |

Install the plugin when you can. It includes the MCP server configuration, so there is nothing extra to connect. If your client does not support plugins, connect the MCP server directly as a connector.

## Set up your client

<Tabs>
<TabItem value="claude" label="Claude" default>

### Claude.ai, Claude Desktop, and Claude Cowork

**Administrator.** In Claude workspaces, only owners can add custom connectors and make plugins available to the organization:

1. Open the **Admin settings** of your Claude organization.
2. Under **Connectors**, add a custom connector named `epilot` with the URL `https://mcp.epilot.io/mcp`. To enforce read-only access for the whole organization, use `https://mcp.epilot.io/mcp?access=read` instead.
3. Enable the connector for the organization, or for the roles that should use it.
4. Optionally, import the epilot plugin from the repository `epilot-dev/agent-toolkit-for-epilot` so that users find it under **Customize → Plugins** in the section *From your organization*.

**Users.** If your administrator has made the plugin available:

1. Open **Customize → Plugins** and search for **epilot**.
2. Add the plugin. It contains the epilot skills and two connectors, **Epilot 360 MCP** and **Volt UI**.
3. Open the plugin's **Connectors** tab and connect **Epilot 360 MCP**. The epilot login opens; sign in, pick the organization, and approve the access level.

If only the connector is available, or you added it yourself:

1. Open **Settings → Connectors**.
2. Choose **Add custom connector**, name it `epilot`, and enter `https://mcp.epilot.io/mcp`.
3. Click **Connect**. The epilot login opens; sign in, pick the organization, and approve the access level.
4. In a new chat or Cowork session, enable the epilot connector and ask a question such as "How is this organization set up?".

### Claude Code

Install the full plugin, skills included, from inside Claude Code:

```text
/plugin marketplace add epilot-dev/agent-toolkit-for-epilot
/plugin install epilot-core@agent-toolkit-for-epilot
/reload-plugins
```

The first time a skill uses the epilot MCP, Claude Code asks you to authenticate. The Volt UI server starts locally through `npx` and needs Node.js 22+.

To connect only the MCP server without the skills:

```bash
claude mcp add --transport http epilot https://mcp.epilot.io/mcp
```

For CI or headless use, an epilot API token can replace OAuth. Reference it from `.mcp.json`:

```json
{
  "mcpServers": {
    "epilot": {
      "type": "http",
      "url": "https://mcp.epilot.io/mcp",
      "headers": { "Authorization": "Bearer ${EPILOT_API_TOKEN}" }
    }
  }
}
```

</TabItem>
<TabItem value="openai" label="ChatGPT & Codex">

### ChatGPT

**Administrator.** ChatGPT installs plugins through the workspace. A workspace administrator imports the repository once and decides who can use it:

1. Open **Admin → Plugins → Add → Import marketplace**.
2. Enter `https://github.com/epilot-dev/agent-toolkit-for-epilot` as Source. Leave Path and revision empty.
3. Authorize GitHub access, review the import, and make epilot available to the relevant roles.
4. To enforce read-only access for a production organization, allow only `https://mcp.epilot.io/mcp?access=read` in the MCP configuration. The read/write selection then never appears on the login screen.

**Users.** Once the plugin is available in your workspace:

1. Open **Plugins** in the **ChatGPT desktop app** and install **epilot**.
2. Connect your own epilot account when prompted: sign in, pick the organization, and approve the access level.
3. In a chat, type `@epilot` followed by your request.

ChatGPT marks plugins that declare MCP servers as **Desktop only**. The Volt UI server runs locally and needs Node.js 22+ on each machine. A public ChatGPT directory listing is not yet available.

To use only the MCP server in ChatGPT, create a custom connector with `https://mcp.epilot.io/mcp`. OAuth discovery and client registration are automatic. In managed workspaces, custom connectors also have to be enabled by an administrator first.

### Codex

Add the marketplace from your terminal:

```bash
codex plugin marketplace add epilot-dev/agent-toolkit-for-epilot
```

Then open `/plugins` in Codex and install `epilot-core`. Codex asks you to authenticate the first time a skill uses the epilot MCP.

</TabItem>
<TabItem value="other" label="Other MCP clients">

### Cursor, VS Code, Windsurf, and custom agents

Add a remote HTTP server with the URL `https://mcp.epilot.io/mcp`. Clients that support OAuth 2.1 with dynamic client registration authenticate through the browser automatically. Clients without OAuth support can send an epilot API token as the Bearer token.

| Purpose                                             | URL                                     |
| --------------------------------------------------- | --------------------------------------- |
| Default, access level chosen on the approval screen | `https://mcp.epilot.io/mcp`             |
| Enforced read-only, regardless of consent           | `https://mcp.epilot.io/mcp?access=read` |

### Agent Plugins clients

Any client that implements the [Agent Plugins](https://agent-plugins.org) standard can install `epilot-core` from the repository `epilot-dev/agent-toolkit-for-epilot`. The portable manifest is `plugins/epilot-core/plugin.json`.

</TabItem>
</Tabs>

## Choose the access level

The epilot login asks for two things: the **organization** the assistant should work with and the **access level**.

- **Read-only** (`mcp:read`) is preselected. The assistant can inspect configuration, schemas, journeys, and documentation, but cannot change anything.
- **Read & write** (`mcp:write`) additionally allows the curated tools and the generic API route to create and update configuration. Every write still goes through your approval in the client.

Grant write access to a **sandbox organization** and keep production read-only. To make read-only technically enforceable, connect with `https://mcp.epilot.io/mcp?access=read`. Writes are then impossible regardless of what is approved on the login screen.

## Verify the connection

Ask the agent to run `whoami`. The answer names the organization, the user, the authentication mode, the granted scopes (`mcp:read` or `mcp:write`), and whether entity data is PII-anonymized. If a task needs a write and the connection is read-only, the server returns a reauthorization challenge; reconnect and approve write access.

## Switch organizations or change the access level

You do not need to reinstall the plugin. Disconnect the epilot MCP connector and connect it again. Reconnecting opens the epilot login, where you pick a different organization or access level.

- **Claude:** open **Customize → Plugins → epilot → Connectors**, select **Epilot 360 MCP**, and click **Disconnect**. If you use a standalone connector, disconnect it under **Settings → Connectors**. See the [walkthrough in the overview](/docs/agent-toolkit#the-typical-workflow-sandbox-first).
- **ChatGPT:** open the epilot plugin in **Plugins**, disconnect the epilot account, and connect again.
- **Claude Code and Codex:** run `/mcp`, select the epilot server, and clear the authentication. Or reinstall the plugin.
- **Other clients:** remove the epilot server from the client's MCP configuration and add it again.

Disconnecting also revokes the integration token that the connection created in epilot 360.

## Troubleshooting

| Symptom                                                              | What to do                                                                                                                                                      |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No option to add a plugin or custom connector in your client         | Plugins and connectors are disabled in your workspace. Ask your administrator to follow the **Administrator** steps for your client above.                       |
| The epilot plugin is not listed under Plugins                        | The administrator has not imported the marketplace yet, or has not made it available to your role.                                                             |
| The assistant says a tool needs write access                         | The connection is read-only. Disconnect and reconnect, and choose **Read & write** on the epilot login. Use a sandbox organization for this.                    |
| The assistant works with the wrong organization                      | Disconnect and reconnect the epilot MCP connector and pick the right organization on the login screen. Run `whoami` to confirm.                                |
| The Volt UI connector does not start                                 | It runs locally through `npx` and needs Node.js 22 or newer on your machine.                                                                                     |
| Entity fields show placeholder values instead of real names          | This is expected. Entity data on OAuth connections is [PII-anonymized](#pii-anonymization) server-side and cannot be disabled by the client.                    |

## PII anonymization

Entity data that the epilot MCP server returns to your AI assistant is **anonymized by default**. The OAuth connection mints an epilot access token with the `anonymize` flag set, which forces PII anonymization on all entity data returned to that token. The assistant cannot disable it. `whoami` reports this as `entity_pii: anonymized`.

Anonymization is implemented by the open-source [@epilot/anonymization](https://github.com/epilot-dev/anonymization) library, the shared implementation behind epilot's anonymized API responses (`?anonymize=true` on the Entity API, or access tokens created with `anonymize: true`). It replaces personal data with deterministic pseudonyms, so the same person gets the same placeholder within an organization and the assistant can still reason about relations without seeing real values:

| Data                            | What the assistant sees                                               |
| ------------------------------- | --------------------------------------------------------------------- |
| Names                           | A stable pseudonym such as `person_4f2a9b1c`                          |
| Emails, phones, IBANs           | Format-preserving pseudonyms such as `4f2a9b1c@anonymized.invalid`    |
| Addresses                       | Postal code, city, and country are kept; the street is pseudonymized  |
| Birthdates                      | Truncated to the year                                                 |
| Free text (notes, descriptions) | `[REDACTED]`                                                          |
| IDs, status fields, timestamps  | Unchanged                                                             |

### Best effort by default, explicit where it matters

Without further configuration, the library decides what to anonymize by **best effort**: it uses the attribute type (email, phone, address, payment), a curated list of well-known PII field names such as `first_name` or `iban`, and pattern matching for emails, phone numbers, and IBANs embedded in string values. This catches the common cases, but a custom attribute with an unusual name, or personal data typed into a generic text field, can slip through.

If you need certainty for an attribute, classify it explicitly in the entity schema. Every attribute supports a `data_classification` property, which takes precedence over the built-in defaults:

| `data_classification` | Effect                                                                                                                       |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `pii`                 | The value is **always** anonymized in anonymized responses. Use it to opt in custom fields and free-text fields with personal data. |
| `public`              | The value is **never** anonymized. Use it to opt out fields that the defaults match by mistake, such as non-personal identifiers.   |
| unset                 | Built-in defaults apply based on attribute type and the curated PII field list.                                              |

```json title="Marking a custom attribute as PII in the entity schema"
{
  "name": "internal_remarks",
  "label": "Internal remarks",
  "type": "string",
  "data_classification": "pii"
}
```

Update the attribute in the [entity schema](/docs/entities/attributes) of your organization, for example through the Entity Builder or the Entity API, and the change applies to every anonymized response from then on, including everything the AI assistant reads.

:::tip Review your custom attributes once
Before connecting an AI assistant, walk through the custom attributes of your contact, account, and order schemas and set `data_classification: "pii"` on every field that can contain personal data. The built-in defaults cover standard fields; your custom fields are where personal data slips through.
:::

## Permissions and data protection

- Every tool runs as the signed-in epilot user in the chosen organization. Upstream APIs enforce their normal permissions on every call.
- OAuth connections create a dedicated integration token that is visible and revocable under epilot 360 token settings. Revoking the connection deletes it.
- Entity data returned to OAuth connections is PII-anonymized server-side by default. The client cannot disable this. See [PII anonymization](#pii-anonymization) for what is masked and how to classify your own attributes.
- Journey tokens, webhook secrets, and portal auth infrastructure are never returned. The curated tools project safe fields only, and the generic API route blocks the operations that would leak them.
- Configuration data that the assistant reads is processed by your AI provider. This is why we recommend enterprise editions or EU-regulated models, see the warning at the top of this page.
