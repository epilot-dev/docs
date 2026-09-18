import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import React, { useState } from 'react';

import styles from './styles.module.css';

type InstallTarget = 'claude' | 'openai' | 'other';

const CodexIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const ChatGPTIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.073zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997z" />
  </svg>
);

const ClaudeIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
    <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
  </svg>
);

const PlugTabIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22v-5" />
    <path d="M9 8V2" />
    <path d="M15 8V2" />
    <path d="M18 8v3a6 6 0 0 1-12 0V8Z" />
  </svg>
);

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
      'Read a journey as summary or editable definition, validate step wiring offline, then create or update it with its entity mapping in one call.',
    tools: [
      { name: 'get_journey' },
      { name: 'validate_journey_definition' },
      { name: 'create_journey', write: true },
      { name: 'update_journey', write: true },
      { name: 'get_journey_mapping' },
      { name: 'update_journey_mapping', write: true },
    ],
  },
  {
    title: 'Designs and entity model',
    description:
      'Create and update the designs that brand journeys and portals, and read compact tenant schemas that would not fit raw.',
    tools: [
      { name: 'create_design', write: true },
      { name: 'update_design', write: true },
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
            <h3>Cursor, VS Code, and custom agents</h3>
            <p>
              Add a remote HTTP MCP server. Clients with OAuth 2.1 support authenticate in the browser automatically;
              others can send an epilot API token as the Bearer token.
            </p>
            <pre className={styles.command}>
              <code>{mcpUrl}</code>
            </pre>
            <p className={styles.commandNote}>
              Enforced read-only, regardless of consent: <code>{mcpUrl}?access=read</code>
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
              <span className={styles.kicker}>Agent Toolkit for epilot</span>
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
                18 tools, built for the person configuring epilot. Curated tools only where a workflow spans several
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
                </ul>
                <p>
                  <Link to="/docs/agent-toolkit/setup">Full setup guide</Link>
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
