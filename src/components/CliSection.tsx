import Link from '@docusaurus/Link';
import React, { useState } from 'react';

import styles from './CliSection.module.css';

interface Snippet {
  id: string;
  label: string;
  title: string;
  lines: { comment?: string; cmd?: string }[];
}

const snippets: Snippet[] = [
  {
    id: 'app',
    label: 'Build an app',
    title: 'Scaffold, extend, and deploy an epilot App',
    lines: [
      {
        comment: 'Create a new app project',
        cmd: 'npx epilot app init my-app',
      },
      {
        comment: 'Add a component to it',
        cmd: 'epilot app add-component meter-readings --type CUSTOM_CAPABILITY',
      },
      { comment: 'Deploy to your organization', cmd: 'epilot app deploy' },
    ],
  },
  {
    id: 'api',
    label: 'Call any API',
    title: 'Every operation of every epilot API, one command away',
    lines: [
      {
        comment: 'Fetch an entity',
        cmd: 'epilot entity getEntity contact abc123',
      },
      {
        comment: 'Search with a request body',
        cmd: `epilot entity searchEntities -d '{"q":"*"}'`,
      },
      {
        comment: 'Shape the output with JSONata',
        cmd: `epilot user getMeV2 --jsonata 'email'`,
      },
    ],
  },
  {
    id: 'auth',
    label: 'Manage environments',
    title: 'Log in once, switch between organizations with profiles',
    lines: [
      { comment: 'Browser-based login', cmd: 'epilot auth login' },
      {
        comment: 'Create a profile per environment',
        cmd: 'epilot profile create sandbox --token <token>',
      },
      {
        comment: 'Use it per command or as default',
        cmd: 'epilot entity listSchemas --profile sandbox',
      },
    ],
  },
];

const features = [
  {
    title: 'Zero setup',
    description: 'Run everything through npx. No SDK wiring, no boilerplate, no config files to get started.',
  },
  {
    title: 'Manifest-driven apps',
    description: 'Scaffold components and functions, validate locally, and deploy — the manifest stays in sync.',
  },
  {
    title: 'Built for scripts and agents',
    description:
      'JSON output, non-interactive mode, and JSONata transforms make it a natural tool for CI and LLM agents.',
  },
];

export default function CliSection(): JSX.Element {
  const [active, setActive] = useState(snippets[0].id);
  const snippet = snippets.find((s) => s.id === active) ?? snippets[0];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.copy}>
            <span className={styles.eyebrow}>epilot CLI</span>
            <h2 className={styles.title}>Accelerate development with the epilot CLI.</h2>
            <p className={styles.lead}>
              Scaffold and deploy Apps, call any API operation, and manage environments from one command-line tool.
              Install it globally or just run it with npx.
            </p>
            <ul className={styles.features}>
              {features.map((f) => (
                <li key={f.title}>
                  <strong>{f.title}</strong>
                  <span>{f.description}</span>
                </li>
              ))}
            </ul>
            <div className={styles.actions}>
              <Link className="button button--primary" to="/docs/cli/overview">
                Get started with the CLI
              </Link>
              <Link className="button button--secondary" to="/docs/apps/cli">
                App CLI reference
              </Link>
            </div>
          </div>

          <div className={styles.terminal}>
            <div className={styles.tabs} role="tablist" aria-label="CLI examples">
              {snippets.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={s.id === active}
                  className={s.id === active ? styles.tabActive : styles.tab}
                  onClick={() => setActive(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className={styles.terminalBody} role="tabpanel">
              <p className={styles.terminalTitle}>{snippet.title}</p>
              <pre className={styles.pre}>
                <code>
                  {snippet.lines.map((line, i) => (
                    <React.Fragment key={i}>
                      {line.comment && (
                        <span className={styles.comment}>
                          # {line.comment}
                          {'\n'}
                        </span>
                      )}
                      {line.cmd && (
                        <span className={styles.cmd}>
                          <span className={styles.prompt}>$ </span>
                          {line.cmd}
                          {'\n'}
                        </span>
                      )}
                      {i < snippet.lines.length - 1 && '\n'}
                    </React.Fragment>
                  ))}
                </code>
              </pre>
            </div>
            <div className={styles.install}>
              <span className={styles.installLabel}>Install</span>
              <code>npm install -g @epilot/cli</code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
