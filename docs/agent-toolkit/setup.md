---
title: Setup
sidebar_position: 2
description: 'Install the epilot plugin or connect the epilot MCP server in Claude, ChatGPT, Codex, and other MCP clients.'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Set up the Agent Toolkit

Pick your client. Every route ends with the same step: the client opens the epilot login, you choose an organization, and you choose the access level. **Read-only is preselected**; read-and-write is an explicit choice. To change it later, disconnect and connect again.

<Tabs>
<TabItem value="claude" label="Claude" default>

### Claude.ai, Claude Desktop, and Claude Cowork

These clients support remote MCP servers through connectors. The plugin's skills are not available here, but every MCP tool is.

1. Open **Settings → Connectors** (organization admins can add a connector for the whole workspace).
2. Choose **Add custom connector**, name it `epilot`, and enter `https://mcp.epilot.io/mcp`.
3. Click **Connect**. The epilot login opens; sign in, pick the organization, and approve the access level.
4. In a new chat or Cowork session, enable the epilot connector and ask a question such as "How is this organization set up?".

For a connection that must never write, use `https://mcp.epilot.io/mcp?access=read` as the URL.

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

### Codex

```bash
codex plugin marketplace add epilot-dev/agent-toolkit-for-epilot
```

Then open `/plugins` in Codex and install `epilot-core`.

### ChatGPT

ChatGPT installs plugins through the workspace. A workspace administrator imports the repository once; users then install epilot from the Plugins menu.

1. **Admin → Plugins → Add → Import marketplace.**
2. Enter `https://github.com/epilot-dev/agent-toolkit-for-epilot` as Source. Leave Path and revision empty.
3. Authorize GitHub access, review the import, and make epilot available to the relevant roles.
4. Each user opens Plugins in the ChatGPT desktop app, installs epilot, and connects their own epilot account when prompted.

ChatGPT marks plugins that declare MCP servers as **Desktop only**. The Volt UI server runs locally and needs Node.js 22+ on each machine. A public ChatGPT directory listing is not yet available.

To use only the MCP server in ChatGPT, create a custom connector with `https://mcp.epilot.io/mcp`. OAuth discovery and client registration are automatic.

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

## Verify the connection

Ask the agent to run `whoami`. The answer names the organization, the user, the authentication mode, the granted scopes (`mcp:read` or `mcp:write`), and whether entity data is PII-anonymized. If a task needs a write and the connection is read-only, the server returns a reauthorization challenge; reconnect and approve write access.

## Permissions and data protection

- Every tool runs as the signed-in epilot user in the chosen organization. Upstream APIs enforce their normal permissions on every call.
- OAuth connections create a dedicated integration token that is visible and revocable under epilot 360 token settings. Revoking the connection deletes it.
- Entity data returned to OAuth connections is PII-anonymized server-side by default. The client cannot disable this.
- Journey tokens, webhook secrets, and portal auth infrastructure are never returned. The curated tools project safe fields only, and the generic API route blocks the operations that would leak them.
