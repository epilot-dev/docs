import Head from '@docusaurus/Head';
import DocPageStyles from '@docusaurus/theme-classic/lib-next/theme/DocPage/styles.module.css';
import ApiSidebar from '@site/src/components/ApiSidebar';
import { enrichSpecWithPermissions } from '@site/src/utils/openapi-permissions';
import Layout from '@theme/Layout';
import Redoc from '@theme/Redoc';
import { ApiDocProps as Props } from 'docusaurus-theme-redoc/src/types/common';
import React, { useEffect, useState } from 'react';
import { Loading, loadAndBundleSpec } from 'redoc';

import styles from './RedocPage.module.css';

type SpecState = { status: 'loading' } | { status: 'loaded'; spec: Record<string, unknown> } | { status: 'failed' };

/**
 * Loads the spec in the browser (so the reference always shows the latest published spec)
 * and renders `x-epilot-permissions` into operation descriptions.
 */
function useEnrichedSpec(specUrl: string): SpecState {
  const [state, setState] = useState<SpecState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    setState({ status: 'loading' });
    loadAndBundleSpec(specUrl)
      .then((spec) => {
        const enriched = enrichSpecWithPermissions(spec) as unknown as Record<string, unknown>;

        if (!cancelled) setState({ status: 'loaded', spec: enriched });
      })
      .catch((error) => {
        console.warn(`Could not enrich ${specUrl} with permissions`, error);

        if (!cancelled) setState({ status: 'failed' });
      });

    return () => {
      cancelled = true;
    };
  }, [specUrl]);

  return state;
}

function RedocPage({ layoutProps, spec: propSpec }: Props): JSX.Element {
  const specUrl: string = (propSpec.type === 'url' ? propSpec.content : undefined) || propSpec.specUrl;
  const specState = useEnrichedSpec(specUrl);

  const { title = 'API Docs' } = layoutProps || {};
  const description =
    layoutProps?.description ||
    `Reference for the epilot ${title}: endpoints, parameters, and request and response schemas, with the OpenAPI spec to download for SDK clients and AI agents.`;

  return (
    <Layout {...layoutProps} title={title} description={description} pageClassName={DocPageStyles.docPage}>
      <Head>
        {/* The reference renders client-side; point crawlers and agents at the machine-readable contract. */}
        <link rel="alternate" type="application/vnd.oai.openapi" href={specUrl} title={`${title} OpenAPI spec`} />
      </Head>
      <ApiSidebar />
      <main className={styles.redocContainer}>
        {specState.status === 'loading' && (
          <>
            {/* Server-rendered while the spec loads; replaced by the full reference. */}
            <div className={styles.loadingIntro}>
              <h1>{title}</h1>
              <p>{description}</p>
              <p>
                OpenAPI spec: <a href={specUrl}>{specUrl}</a>
              </p>
            </div>
            <Loading color="#4C4CFF" />
          </>
        )}
        {specState.status === 'loaded' && <Redoc spec={specState.spec} specUrl={specUrl} style={{ width: '100%' }} />}
        {/* Fall back to plain Redoc, which shows its own error when the spec cannot be loaded */}
        {specState.status === 'failed' && <Redoc specUrl={specUrl} style={{ width: '100%' }} />}
      </main>
    </Layout>
  );
}

export default RedocPage;
