import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';

import HomepageFeatures from '../components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={clsx(styles.mainLogoContainer)}>
          <img src="/img/logo-white.svg" alt="epilot-log" />
        </div>
        <h1 className={clsx('hero__title', styles.heroBannerTitle)}>&lt;{siteConfig.title} /&gt;</h1>
        <p className={clsx('hero__subtitle', styles.heroBannerSubtitle)}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            Read the Docs
          </Link>
          <Link className="button button--primary button--lg" to="/api">
            Browse APIs
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout>
      <HomepageHeader />
      <HomepageFeatures />
      <div className={styles.graphic} />
    </Layout>
  );
}
