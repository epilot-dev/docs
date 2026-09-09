---
title: Overview
sidebar_position: 1
slug: /agent-toolkit
description: 'The Agent Toolkit for epilot: the epilot plugin (skills) and the epilot MCP server, and when to use which.'
---

# Agent Toolkit for epilot

The Agent Toolkit gives AI assistants the context they need to work with epilot. It has two parts that you can use together or separately:

|                         | **epilot plugin**                                                                                                        | **epilot MCP server**                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| What it is              | A package of skills (guidance, decision rules, workflows) plus MCP configuration                                         | A hosted server at `https://mcp.epilot.io/mcp` that exposes tools                                              |
| What it gives the agent | _How_ to work with epilot: architecture choices, App and integration patterns, configuration workflows, native UI design | _What is true right now_: your organization's configuration, entity schemas, published APIs, and documentation |
| Runs where              | Inside the agent client (Claude Code, Codex, ChatGPT, and other Agent Plugins clients)                                   | On epilot infrastructure; any MCP client can connect                                                           |
| Needs                   | A client that supports Agent Plugins                                                                                     | A client that supports remote MCP over HTTP with OAuth                                                         |
| Identifier              | `epilot-core` from the `agent-toolkit-for-epilot` marketplace                                                            | `https://mcp.epilot.io/mcp`                                                                                    |

The plugin **includes** the MCP server configuration. Installing the plugin connects the MCP server for you. Connecting the MCP server alone does not install the skills.

## When to use what

**Use the plugin** when the agent will build or configure something and you want it to follow epilot's proven patterns:

- Building an App with the CLI, manifest, and App Bridge.
- Deciding between native configuration, an App, or an external integration.
- Configuring schemas, journeys, products, workflows, automations, or portals end to end.
- Designing App surfaces that look native with Volt UI components and tokens.

The plugin's skills route the task to the right workflow and load only the relevant guidance. They rely on the MCP server for live facts, so the two work best together.

**Use the MCP server alone** when you only need live access to an organization or the platform contracts:

- Your client does not support Agent Plugins but does support MCP (Claude.ai, Claude Cowork, Cursor, VS Code, custom agents).
- You are asking questions about an organization: how it is set up, what depends on what, what would break if something changed.
- You are building your own agent and want tools rather than prompts.
- Compliance requires a read-only connection. Connect `https://mcp.epilot.io/mcp?access=read` and writes are impossible regardless of consent.

**Use neither** when the task is plain code against the public APIs. The [SDK](/docs/sdk/overview) and [CLI](/docs/cli/overview) are lighter, and `llms.txt` at `https://docs.epilot.io/llms.txt` gives any model the documentation index.

## What is inside the plugin

The `epilot-core` plugin ships six skills and two MCP servers.

| Skill                     | Use it for                                                                                                              |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| epilot platform guide     | Explains entities, relations, journeys, workflows, Apps, and routes a requirement to configuration, App, or integration |
| Build an epilot App       | Scaffolds, extends, validates, and troubleshoots Apps with the current CLI, manifest schema, and App Bridge             |
| Integrate with epilot     | Designs inbound, outbound, batch, webhook, and bidirectional connections without an App                                 |
| Configure epilot          | Sets up schemas, journeys, products, pricing, workflows, automations, portals, and permissions                          |
| Build an epilot journey   | Creates and updates customer-facing forms and funnels, including logic, copy, and design                                |
| epilot interface designer | Uses live Volt UI component and token guidance to make custom surfaces feel native                                      |

| MCP server | Transport                                | Purpose                                                                                                                                                      |
| ---------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `epilot`   | Remote HTTP, `https://mcp.epilot.io/mcp` | Configuration graph, schemas, journeys, portals, API discovery and execution, documentation. See the [MCP server reference](/docs/agent-toolkit/mcp-server). |
| `volt-ui`  | Local, `npx -y @epilot/volt-ui-mcp`      | Volt UI components, props, and design tokens for App interfaces. Needs Node.js 22+.                                                                          |

## Next steps

- [Set up the toolkit](/docs/agent-toolkit/setup) in Claude, ChatGPT, Codex, or another MCP client.
- [Browse the MCP server capabilities](/docs/agent-toolkit/mcp-server).
- Source: [agent-toolkit-for-epilot on GitHub](https://github.com/epilot-dev/agent-toolkit-for-epilot).
