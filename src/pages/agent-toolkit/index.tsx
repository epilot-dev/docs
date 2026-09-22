import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import React, { useState } from 'react';

import { ChatGPTIcon, ClaudeIcon, CodexIcon, PlugTabIcon } from '../../components/ClientIcons';
import styles from './styles.module.css';

type InstallTarget = 'claude' | 'openai' | 'other';

const installTargets: Array<{ id: InstallTarget; label: string; icon: JSX.Element }> = [
  { id: 'claude', label: 'Claude', icon: <ClaudeIcon /> },
  { id: 'openai', label: 'ChatGPT & Codex', icon: <ChatGPTIcon /> },
  { id: 'other', label: 'Other MCP clients', icon: <PlugTabIcon /> },
];

const mcpUrl = 'https://mcp.epilot.io/mcp';
const marketplaceUrl = 'https://github.com/epilot-dev/agent-toolkit-for-epilot';
const commands = {
  codex: `codex plugin marketplace add epilot-dev/agent-toolkit-for-epilot\n# Then open /plugins and install epilot-core`,
  claudeCode: `/plugin marketplace add epilot-dev/agent-toolkit-for-epilot\n/plugin install epilot-core@agent-toolkit-for-epilot\n/reload-plugins`,
  claudeMcpOnly: `claude mcp add --transport http epilot ${mcpUrl}`,
  addMcp: `npx -y add-mcp ${mcpUrl}`,
};

const comparison = [
  {
    name: 'epilot plugin',
    tag: 'epilot-core',
    summary:
      'Skills that teach the agent how to work with epilot: which architecture to choose, how to build Apps and integrations, how to configure the platform, and how to design native UI. Includes the MCP configuration.',
    useWhen: [
      'The agent will build or configure something',
      'You want epilot\u2019s proven patterns, not improvisation',
      'You work in Claude Code, Codex, or ChatGPT',
    ],
    footer: 'Needs a client that supports Agent Plugins. Installing it also connects the MCP server.',
  },
  {
    name: 'epilot MCP server',
    tag: 'mcp.epilot.io',
    summary:
      'Hosted tools that return what is true right now: how an organization is configured, what depends on what, the current entity schemas, every published API operation, and the documentation.',
    useWhen: [
      'You only need the live tools, or your client offers connectors but no plugins (Cursor, VS Code, custom agents)',
      'You ask questions about a live organization',
      'You build your own agent and need tools, not prompts',
    ],
    footer: 'Works in any MCP client. Connect with ?access=read for an enforced read-only connection.',
  },
];

const capabilities: Array<{ title: string; description: string; tools: Array<{ name: string; write?: boolean }> }> = [
  {
    title: 'Configuration graph',
    description:
      'How an organization is set up, what is connected to what, and what breaks if something changes. Also the way to list journeys, webhooks, portals, designs, and schemas.',
    tools: [{ name: 'search_configuration' }, { name: 'get_config_dependencies' }, { name: 'get_config_impact' }],
  },
  {
    title: 'Journeys',
    description:
      'Read a journey as summary or editable definition, then create or update it with its entity mapping in one call. Step wiring is validated before anything reaches the API.',
    tools: [
      { name: 'get_journey' },
      { name: 'create_journey', write: true },
      { name: 'update_journey', write: true },
      { name: 'get_journey_mapping' },
      { name: 'update_journey_mapping', write: true },
    ],
  },
  {
    title: 'Workflows and entity model',
    description:
      'Compile a compact graph of tasks, branches, and loops into a valid workflow with linked automations, with dry runs before writing. Read compact tenant schemas that would not fit raw.',
    tools: [
      { name: 'create_workflow', write: true },
      { name: 'update_workflow', write: true },
      { name: 'get_entity_schema' },
    ],
  },
  {
    title: 'Any epilot API',
    description:
      'Discover, describe, and execute every published OpenAPI operation, entity search included. Secrets are redacted; writes need mcp:write.',
    tools: [
      { name: 'search_api_operations' },
      { name: 'describe_api_operation' },
      { name: 'call_api_operation', write: true },
    ],
  },
  {
    title: 'Documentation and connection',
    description: 'Search and read docs.epilot.io, and check who you are connected as.',
    tools: [{ name: 'search_docs' }, { name: 'fetch_doc' }, { name: 'whoami' }],
  },
];

const CodeIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const CompassIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />
  </svg>
);

const PlugIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 22v-5" />
    <path d="M9 8V2" />
    <path d="M15 8V2" />
    <path d="M18 8v3a6 6 0 0 1-12 0V8Z" />
  </svg>
);

const LayoutIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);

const benefits = [
  {
    title: 'Start with the right architecture',
    description:
      'Route a requirement to native configuration, an epilot App, or an external integration before writing code.',
    icon: <CompassIcon />,
  },
  {
    title: 'Build against current contracts',
    description:
      'Discover epilot documentation, OpenAPI operations, entity schemas, and UI components instead of guessing from stale examples.',
    icon: <CodeIcon />,
  },
  {
    title: 'Understand the connected organization',
    description:
      "Use the epilot MCP to inspect the organization's actual schemas and configuration when the task depends on live state.",
    icon: <PlugIcon />,
  },
];

const useCases = [
  {
    title: 'Build Apps',
    examples: [
      'Add a grid-connection tab to the opportunity page',
      'Build a custom journey block with IBAN validation',
      'Show live meter readings as a customer portal widget',
      'Call an external API from a flow action, keeping credentials server-side',
    ],
  },
  {
    title: 'Build integrations',
    examples: [
      'Sync ERP orders into epilot entities with stable unique IDs',
      'Update the JSONata mapping for inbound meter readings',
      'Receive and verify epilot webhooks in an external service',
      'Import a small dataset of contacts without writing a script',
    ],
  },
  {
    title: 'Configure epilot',
    examples: [
      'Extend the contact schema after checking what depends on it',
      'Create products and prices for a new tariff',
      'Wire a journey submission to an automation that starts a workflow',
      'Find every journey and automation that uses an email template',
    ],
  },
];

const workflows = [
  {
    name: 'Understand epilot',
    description:
      'Explains entities, relations, journeys, workflows, Apps, and the boundary between configuration and code.',
  },
  {
    name: 'Build an App',
    description:
      'Scaffolds, extends, validates, and troubleshoots Apps with the current CLI, manifest schema, and App Bridge.',
  },
  {
    name: 'Connect a System',
    description:
      'Designs reliable inbound, outbound, batch, webhook, and bidirectional connections without requiring an App.',
  },
  {
    name: 'Configure epilot',
    description:
      'Sets up schemas, journeys, products, pricing, workflows, automations, portals, and permissions end to end.',
  },
  {
    name: 'Build a Journey',
    description: 'Creates and updates customer-facing forms and funnels, including steps, logic, copy, and design.',
  },
];

function InstallPanel(): JSX.Element {
  const [target, setTarget] = useState<InstallTarget>('claude');

  return (
    <div className={styles.installPanel}>
      <div className={styles.tabs} role="tablist" aria-label="Installation audience">
        {installTargets.map((item, index) => (
          <button
            key={item.id}
            id={`install-tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={target === item.id}
            aria-controls={`install-panel-${item.id}`}
            tabIndex={target === item.id ? 0 : -1}
            className={target === item.id ? styles.activeTab : styles.tab}
            onClick={() => setTarget(item.id)}
            onKeyDown={(event) => {
              const offsets: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 1, ArrowUp: -1 };
              let next = index;
              if (event.key in offsets) {
                next = (index + offsets[event.key] + installTargets.length) % installTargets.length;
              } else if (event.key === 'Home') next = 0;
              else if (event.key === 'End') next = installTargets.length - 1;
              else return;
              event.preventDefault();
              setTarget(installTargets[next].id);
              document.getElementById(`install-tab-${installTargets[next].id}`)?.focus();
            }}
          >
            <span className={styles.tabIcon}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div
        id={`install-panel-${target}`}
        className={styles.installBody}
        role="tabpanel"
        aria-labelledby={`install-tab-${target}`}
        tabIndex={0}
      >
        {target === 'claude' && (
          <>
            <h3>Claude.ai, Claude Desktop, and Claude Cowork</h3>
            <p>
              Install the full plugin under Customize → Plugins once your workspace admin has made it available. Or
              connect the MCP server as a custom connector:
            </p>
            <ol className={styles.setupSteps}>
              <li>Open Settings → Connectors → Add custom connector.</li>
              <li>
                Name it <code>epilot</code>, enter the URL below, and click Connect.
              </li>
              <li>Sign in to epilot, choose the organization, and choose read-only or read-and-write access.</li>
            </ol>
            <pre className={styles.command}>
              <code>{mcpUrl}</code>
            </pre>
            <h4>Claude Code · full plugin with skills</h4>
            <pre className={styles.command}>
              <code>{commands.claudeCode}</code>
            </pre>
            <details className={styles.setupDetails}>
              <summary>Claude Code · MCP server only</summary>
              <pre className={styles.command}>
                <code>{commands.claudeMcpOnly}</code>
              </pre>
              <p>
                For CI or headless use, reference an epilot API token from <code>.mcp.json</code> instead of OAuth. See
                the <Link to="/docs/agent-toolkit/setup">setup guide</Link>.
              </p>
            </details>
          </>
        )}
        {target === 'openai' && (
          <>
            <h3>Codex</h3>
            <pre className={styles.command}>
              <code>{commands.codex}</code>
            </pre>
            <h4>ChatGPT · workspace import</h4>
            <p>
              A workspace administrator imports the repository once under Admin → Plugins → Add → Import marketplace.
              Users then install epilot from the Plugins menu in the desktop app and connect their own epilot account.
            </p>
            <pre className={styles.command}>
              <code>{marketplaceUrl}</code>
            </pre>
            <p className={styles.previewNote}>
              ChatGPT marks plugins that declare MCP servers as Desktop only. A public ChatGPT directory listing is not
              yet available; to use only the MCP server, add a custom connector with the MCP URL.
            </p>
          </>
        )}
        {target === 'other' && (
          <>
            <h3>Cursor, VS Code, Windsurf, Gemini, and custom agents</h3>
            <p>
              Add a remote HTTP MCP server. Clients with OAuth 2.1 support authenticate in the browser automatically;
              others can send an epilot API token as the Bearer token. Terminal users can add it to every installed
              client at once:
            </p>
            <pre className={styles.command}>
              <code>{commands.addMcp}</code>
            </pre>
            <p className={styles.commandNote}>Server URL for manual configuration:</p>
            <pre className={styles.command}>
              <code>{mcpUrl}</code>
            </pre>
            <p className={styles.commandNote}>
              Enforced read-only, regardless of consent: <code>{mcpUrl}?access=read</code>
            </p>
            <p className={styles.commandNote}>
              Per-client steps for Cursor, VS Code, Windsurf, and Gemini are in the{' '}
              <Link to="/docs/agent-toolkit/setup#set-up-your-client">setup guide</Link>.
            </p>
            <details className={styles.setupDetails}>
              <summary>Agent Plugins clients</summary>
              <p>
                Any client implementing the Agent Plugins standard can install <code>epilot-core</code> from the
                repository <code>epilot-dev/agent-toolkit-for-epilot</code>.
              </p>
            </details>
          </>
        )}
      </div>
    </div>
  );
}

export default function AgentToolkitPage(): JSX.Element {
  return (
    <Layout
      title="Agent Toolkit"
      description="Use AI assistance to configure epilot, create journeys, and build Apps and integrations."
    >
      <main>
        <header className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className={styles.kicker}>
                Agent Toolkit for epilot <span className={styles.betaPill}>Beta</span>
              </span>
              <h1>Give your AI assistant the context to work with epilot</h1>
              <p>
                Focused workflows and live platform tools for configuring epilot, creating customer journeys, and
                building Apps and integrations. Works in Claude, ChatGPT, Codex, and any MCP client.
              </p>
              <div className={styles.heroActions}>
                <a className="button button--primary button--lg" href="#install">
                  View installation
                </a>
                <a
                  className="button button--secondary button--lg"
                  href="https://github.com/epilot-dev/agent-toolkit-for-epilot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </div>
              <div className={styles.compatibility}>
                <span>Built on Agent Plugins 1.0</span>
                <span aria-hidden="true">•</span>
                <span>Skills + MCP</span>
                <span aria-hidden="true">•</span>
                <span>Open source ready</span>
              </div>
              <p className={styles.betaNotice}>
                The Agent Toolkit and the epilot MCP server are available in Beta on all plans. Your use is subject to
                your epilot agreement and epilot&apos;s terms for beta features; tools can change, see the{' '}
                <Link to="/docs/agent-toolkit/mcp-server#changelog">changelog</Link>.
              </p>
            </div>

            <div className={styles.architectureCard} aria-label="Toolkit architecture">
              <div className={styles.agentRow}>
                <span>
                  <i className={styles.agentIcon}>
                    <CodexIcon />
                  </i>
                  Codex
                </span>
                <span>
                  <i className={styles.agentIcon}>
                    <ChatGPTIcon />
                  </i>
                  ChatGPT
                </span>
                <span>
                  <i className={styles.agentIcon}>
                    <ClaudeIcon />
                  </i>
                  Claude
                </span>
              </div>
              <div className={styles.connector} />
              <div className={styles.toolkitCore}>
                <span className={styles.coreLabel}>Agent Toolkit for epilot</span>
                <strong>Skills route the work</strong>
                <small>Only the relevant guidance is loaded</small>
              </div>
              <div className={styles.connector} />
              <div className={styles.sourceGrid}>
                <div>
                  <strong>epilot MCP</strong>
                  <span>Docs, APIs, org state</span>
                </div>
                <div>
                  <strong>Volt UI MCP</strong>
                  <span>Components and tokens</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeading}>
              <span className={styles.kicker}>Use cases</span>
              <h2>Describe the outcome. The agent does the epilot part.</h2>
              <p>
                Everyday tasks from real epilot projects — phrased the way you would ask for them, executed against
                current APIs and your organization&apos;s actual configuration.
              </p>
            </div>
            <div className={styles.useCaseGrid}>
              {useCases.map((useCase) => (
                <article key={useCase.title} className={styles.useCaseCard}>
                  <h3>{useCase.title}</h3>
                  <ul className={styles.promptList}>
                    {useCase.examples.map((example) => (
                      <li key={example}>“{example}”</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.surfaceSection}`}>
          <div className="container">
            <div className={styles.sectionHeading}>
              <span className={styles.kicker}>Two parts</span>
              <h2>Plugin or MCP server? Usually both.</h2>
              <p>
                The plugin carries the know-how. The MCP server carries the live facts. Install the plugin where your
                client supports it; connect the MCP server everywhere else.
              </p>
            </div>
            <div className={styles.compareGrid}>
              {comparison.map((part) => (
                <article key={part.name} className={styles.compareCard}>
                  <div className={styles.compareHead}>
                    <h3>{part.name}</h3>
                    <span className={styles.compareTag}>{part.tag}</span>
                  </div>
                  <p>{part.summary}</p>
                  <p className={styles.compareLabel}>Use it when</p>
                  <ul className={styles.compareList}>
                    {part.useWhen.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <div className={styles.compareFoot}>{part.footer}</div>
                </article>
              ))}
            </div>
            <p className={styles.compareNote}>
              Plain code against the public APIs needs neither. Use the <Link to="/docs/sdk/overview">SDK</Link> or{' '}
              <Link to="/docs/cli/overview">CLI</Link>, and point any model at <code>docs.epilot.io/llms.txt</code>.{' '}
              <Link to="/docs/agent-toolkit">Read the full comparison</Link>.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeading}>
              <span className={styles.kicker}>Why it matters</span>
              <h2>Platform expertise without a giant static prompt</h2>
              <p>
                The toolkit keeps stable decision guidance close to the agent and retrieves changing facts from their
                authoritative source when they are needed.
              </p>
            </div>
            <div className={styles.benefitGrid}>
              {benefits.map((benefit) => (
                <article key={benefit.title} className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.splitHeading}>
              <div>
                <span className={styles.kicker}>Included workflows</span>
                <h2>One toolkit, five focused skills</h2>
              </div>
              <p>
                Each skill stays focused on one workflow, so the agent loads only the epilot guidance that is relevant
                to the current task.
              </p>
            </div>
            <div className={styles.workflowGrid}>
              {workflows.map((workflow, index) => (
                <article key={workflow.name} className={styles.workflowCard}>
                  <span className={styles.workflowNumber}>0{index + 1}</span>
                  <h3>{workflow.name}</h3>
                  <p>{workflow.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.surfaceSection}`}>
          <div className="container">
            <div className={styles.sectionHeading}>
              <span className={styles.kicker}>MCP capabilities</span>
              <h2>What the epilot MCP server can do</h2>
              <p>
                17 tools, built for the person configuring epilot. Curated tools only where a workflow spans several
                APIs or needs validation first; one generic route for every other published operation.
              </p>
            </div>
            <div className={styles.capGrid}>
              {capabilities.map((cap) => (
                <article key={cap.title} className={styles.capCard}>
                  <h3>{cap.title}</h3>
                  <p>{cap.description}</p>
                  <ul className={styles.capTools}>
                    {cap.tools.map((tool) => (
                      <li key={tool.name} data-write={tool.write ? 'true' : undefined}>
                        {tool.name}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className={styles.capLegend}>
              <span>Plain: works with mcp:read</span>
              <span>Highlighted: requires mcp:write</span>
              <span>Runs as you, in your organization, PII-masked by default</span>
            </div>
            <div className={styles.capActions}>
              <Link className="button button--secondary" to="/docs/agent-toolkit/mcp-server">
                Open the MCP server reference
              </Link>
            </div>
          </div>
        </section>

        <section id="install" className={`${styles.section} ${styles.installSection}`}>
          <div className="container">
            <div className={styles.installGrid}>
              <div className={styles.installCopy}>
                <span className={styles.kicker}>Get started</span>
                <h2>Choose the setup for your client.</h2>
                <p>
                  Claude, ChatGPT, Codex, and every other Agent Plugins client install the full plugin with skills. Any
                  MCP client can also connect the hosted MCP server directly.
                </p>
                <ul className={styles.checkList}>
                  <li>Each user connects their own epilot account</li>
                  <li>Read-only is preselected; write access is an explicit choice</li>
                  <li>Available actions follow your epilot permissions</li>
                  <li>
                    Only connect to the official endpoint <code>mcp.epilot.io</code>
                  </li>
                </ul>
                <p>
                  <Link to="/docs/agent-toolkit/setup">Full setup guide</Link> ·{' '}
                  <Link to="/docs/agent-toolkit/setup#security-best-practices">Security best practices</Link>
                </p>
              </div>
              <InstallPanel />
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={`container ${styles.ctaInner}`}>
            <div className={styles.ctaIcon}>
              <LayoutIcon />
            </div>
            <div>
              <h2>Start with an epilot App</h2>
              <p>
                Use the current CLI scaffold, then let the toolkit guide implementation, validation, and native UI
                design.
              </p>
            </div>
            <Link className="button button--secondary" to="/docs/apps/getting-started/quick-start">
              Open the quick start
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
