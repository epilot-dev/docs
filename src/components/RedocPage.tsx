import { useLocation } from '@docusaurus/router';
import DocPageStyles from '@docusaurus/theme-classic/lib-next/theme/DocPage/styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import DocSidebar from '@theme/DocSidebar';
import Layout from '@theme/Layout';
import Redoc from '@theme/Redoc';
import { ApiDocProps as Props } from 'docusaurus-theme-redoc/src/types/common';
import React from 'react';

import styles from './RedocPage.module.css';

interface Spec {
  layout: {
    title: string;
  };
  routePath: string;
  specUrl: string;
}

function RedocPage({ layoutProps, spec: propSpec }: Props): JSX.Element {
  const { title = 'API Docs', description = 'Open API Reference Docs for the API' } = layoutProps || {};

  const location = useLocation();
  const { siteConfig } = useDocusaurusContext();

  const redocusaurusOpts = siteConfig.presets.find((preset) => preset[0] === 'redocusaurus');
  const specs: Spec[] = redocusaurusOpts?.[1]?.['specs'] ?? [];

  const specUrl: string | undefined = propSpec.type === 'url' ? propSpec.content : undefined;

  return (
    <Layout {...layoutProps} title={title} description={description} pageClassName={DocPageStyles.docPage}>
      <aside className={DocPageStyles.docSidebarContainer} role="complementary">
        <DocSidebar
          path={location.pathname}
          isHidden={false}
          onCollapse={() => null}
          sidebar={specs.map((spec) => ({
            type: 'link',
            href: spec.routePath,
            label: spec.layout.title,
          }))}
        />
      </aside>

      <main className={styles.redocContainer}>
        <Redoc specUrl={specUrl || propSpec.specUrl} style={{ width: '100%' }} />
      </main>
    </Layout>
  );
}

export default RedocPage;
