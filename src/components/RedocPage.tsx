import DocPageStyles from '@docusaurus/theme-classic/lib-next/theme/DocPage/styles.module.css';
import ApiSidebar from '@site/src/components/ApiSidebar';
import Layout from '@theme/Layout';
import Redoc from '@theme/Redoc';
import { ApiDocProps as Props } from 'docusaurus-theme-redoc/src/types/common';
import React from 'react';

import styles from './RedocPage.module.css';

function RedocPage({ layoutProps, spec: propSpec }: Props): JSX.Element {
  const { title = 'API Docs', description = 'Open API Reference Docs for the API' } = layoutProps || {};

  const specUrl: string | undefined = propSpec.type === 'url' ? propSpec.content : undefined;

  return (
    <Layout {...layoutProps} title={title} description={description} pageClassName={DocPageStyles.docPage}>
      <ApiSidebar />
      <main className={styles.redocContainer}>
        <Redoc specUrl={specUrl || propSpec.specUrl} style={{ width: '100%' }} />
      </main>
    </Layout>
  );
}

export default RedocPage;
