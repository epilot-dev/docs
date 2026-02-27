import Link from '@docusaurus/Link';
import React from 'react';

import styles from './HeroSection.module.css';

export default function HeroSection(): JSX.Element {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className={styles.title}>epilot dev center</h1>
        <p className={styles.subtitle}>Build on the Energy XRM. Explore our APIs, SDKs, and platform docs.</p>
        <div className={styles.actions}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            Read the Docs
          </Link>
          <Link className="button button--secondary button--lg" to="/api">
            Browse APIs
          </Link>
        </div>
      </div>
    </header>
  );
}
