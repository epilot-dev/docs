import Layout from '@theme/Layout';
import React from 'react';

import ExplorePlatform from '../components/ExplorePlatform';
import HeroSection from '../components/HeroSection';
import QuickStartCards from '../components/QuickStartCards';
import ResourcesFooter from '../components/ResourcesFooter';

export default function Home(): JSX.Element {
  return (
    <Layout>
      <HeroSection />
      <QuickStartCards />
      <ExplorePlatform />
      <ResourcesFooter />
    </Layout>
  );
}
