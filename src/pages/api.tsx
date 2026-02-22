import Link from '@docusaurus/Link';
import DocPageStyles from '@docusaurus/theme-classic/lib-next/theme/DocPage/styles.module.css';
import { useWindowSize } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ApiSidebar from '@site/src/components/ApiSidebar';
import Layout from '@theme/Layout';
import TOC from '@theme/TOC';
import React from 'react';

interface Spec {
  layout: {
    title: string;
  };
  routePath: string;
}

const toc = [
  { value: 'Authentication', id: 'authentication', children: [], level: 2 },
  { value: 'SDK', id: 'sdk', children: [], level: 2 },
  { value: 'Data Model', id: 'data-model', children: [], level: 2 },
  { value: 'Webhooks', id: 'webhooks', children: [], level: 2 },
  { value: 'Changelog', id: 'changelog', children: [], level: 2 },
  { value: 'API List', id: 'api-list', children: [], level: 2 },
];

function ApiIntro(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const windowSize = useWindowSize();
  const renderTocDesktop = windowSize === 'desktop' || windowSize === 'ssr';

  const redocusaurusOpts = siteConfig.presets.find((preset) => preset[0] === 'redocusaurus');
  const specs: Spec[] = redocusaurusOpts?.[1]?.['specs'] ?? [];

  return (
    <Layout title="Getting Started" description="epilot REST API Reference">
      <div className={DocPageStyles.docPage}>
        <ApiSidebar />
        <main style={{ width: '100%', minHeight: '100vh' }}>
          <div className="container padding-top--md padding-bottom--lg">
            <div className="row">
              <div className="col" style={{ maxWidth: renderTocDesktop ? '75%' : '100%' }}>
                <div className="markdown" style={{ textAlign: 'center' }}>
                  <p>&nbsp;</p>
                  <p>
                    <a href="/">
                      <img src="/img/logo.png" width="150" alt="epilot" />
                    </a>
                  </p>
                  <h1>epilot API</h1>
                  <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
                    Integrate with all platform features programmatically using RESTful APIs
                  </p>
                  <p>
                    <Link
                      className="button button--secondary button--lg"
                      to="/docs/entities/core-entities"
                      style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
                    >
                      Core Entities
                    </Link>
                    <Link
                      className="button button--secondary button--lg"
                      to="/docs/integrations/core-events"
                      style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
                    >
                      Core Events
                    </Link>
                    <Link
                      className="button button--secondary button--lg"
                      to="/api/changelog"
                      style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
                    >
                      Changelog
                    </Link>
                  </p>
                  <p>&nbsp;</p>
                </div>
                <div className="markdown">
                  <h2 id="authentication">Authentication</h2>
                  <p>
                    All requests require a Bearer token in the <code>Authorization</code> header.
                  </p>
                  <pre>
                    <code>{`curl https://entity.sls.epilot.io/v1/entity/schemas \\
  -H "Authorization: Bearer <token>"`}</code>
                  </pre>
                  <p>
                    Generate tokens from the epilot portal or programmatically via the{' '}
                    <Link to="/api/access-token">Access Token API</Link>. See{' '}
                    <Link to="/docs/auth/access-tokens">Access Tokens</Link> for details.
                  </p>

                  <h2 id="sdk">SDK</h2>
                  <p>
                    The <Link to="/docs/architecture/sdk">epilot SDK</Link> provides typed TypeScript clients for every
                    API.
                  </p>
                  <pre>
                    <code>{`npm i --save @epilot/entity-client
# or
yarn add @epilot/entity-client`}</code>
                  </pre>

                  <h2 id="data-model">Data Model</h2>
                  <p>
                    All data in epilot is stored as entities following a{' '}
                    <Link to="/docs/entities/core-entities">standard data model</Link>. Core entity types like Contacts,
                    Organizations, Orders, and Products come built-in and can be extended with custom schemas.
                  </p>

                  <h2 id="webhooks">Webhooks</h2>
                  <p>
                    Receive real-time notifications when events occur on the platform. Configure endpoints via the{' '}
                    <Link to="/api/webhooks">Webhooks API</Link> and subscribe to any of the standardized{' '}
                    <Link to="/docs/integrations/core-events">core event types</Link>
                  </p>
                  <p>
                    See the <Link to="/docs/integrations/webhooks">Webhooks guide</Link> for setup, payload structure,
                    and signature verification.
                  </p>

                  <h2 id="changelog">Changelog</h2>
                  <p>
                    Breaking changes, new endpoints, and updates are published in the{' '}
                    <Link to="/api/changelog">API Changelog</Link>.
                  </p>
                  <p>
                    <a href="/api/changelog/rss.xml" target="_blank">
                      Subscribe via RSS
                    </a>{' '}
                    to stay up to date.
                  </p>

                  <h2 id="api-list">API List</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>API</th>
                        <th>SDK Client</th>
                      </tr>
                    </thead>
                    <tbody>
                      {specs.map((spec) => {
                        const slug = spec.routePath.replace('/api/', '');

                        return (
                          <tr key={spec.routePath}>
                            <td>
                              <Link to={spec.routePath}>{spec.layout.title}</Link>
                            </td>
                            <td>
                              <a href={`https://www.npmjs.com/package/@epilot/${slug}-client`}>
                                <code>@epilot/{slug}-client</code>
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              {renderTocDesktop && (
                <div className="col col--3">
                  <TOC toc={toc} />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default ApiIntro;
