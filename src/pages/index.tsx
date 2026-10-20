import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { organization, website } from '@site/src/utils/structured-data';
import Layout from '@theme/Layout';
import React from 'react';

import CliSection from '../components/CliSection';
import ExplorePlatform from '../components/ExplorePlatform';
import HeroSection from '../components/HeroSection';
import JsonLd from '../components/JsonLd';
import QuickStartCards from '../components/QuickStartCards';
import ResourcesFooter from '../components/ResourcesFooter';

const DESCRIPTION =
  'Build on epilot, the energy XRM: developer documentation, REST API reference with OpenAPI specs, TypeScript SDK, CLI, Apps, integrations and agent tooling.';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title="Developer documentation, APIs and SDK" description={DESCRIPTION}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            { ...website(siteConfig.url, siteConfig.title), description: DESCRIPTION },
            organization(siteConfig.url),
          ],
        }}
      />
      <HeroSection />
      <QuickStartCards />
      <CliSection />
      <ExplorePlatform />
      <ResourcesFooter />
    </Layout>
  );
}
