import Link from '@docusaurus/Link';
import React from 'react';

import styles from './HeroSection.module.css';

function EpilotLogo() {
  return (
    <div className={styles.logoWrap}>
      <svg className={styles.logo} viewBox="0 0 73.9 70.3" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="epilot-grad1" x1="0.5" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#00D7FF" />
            <stop offset="100%" stopColor="#4C4CFF" />
          </linearGradient>
          <linearGradient id="epilot-grad2" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0%" stopColor="#4C4CFF" />
            <stop offset="100%" stopColor="#00A5FF" />
          </linearGradient>
          <linearGradient id="epilot-grad3" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#4C4CFF" />
            <stop offset="100%" stopColor="#00D7FF" />
          </linearGradient>
        </defs>
        <path
          className={styles.blade1}
          fill="url(#epilot-grad1)"
          d="M60.7,22.7c0.2,5.1-1.2,9.8-3.7,13.8c-0.9,1.4-3,0.7-2.9-0.9c0,0,0,0,0-0.1c0-13.1-10.7-23.8-23.8-23.8
            c-4.5,0-8.7,1.3-12.3,3.5c-1.4,0.8-3-0.7-2.3-2.1C19.8,4.9,28.5-0.5,38.3,0C50.4,0.7,60.2,10.6,60.7,22.7z"
        />
        <path
          className={styles.blade2}
          fill="url(#epilot-grad2)"
          d="M70,59.6c5.4-8.3,5-18.5,0-26.1c-0.9-1.3-3-0.7-2.9,0.9c0.1,4.2-0.9,8.5-3.2,12.4
            c-6.6,11.4-21.2,15.3-32.5,8.7l0,0c-1.4-0.8-3,0.7-2.3,2.1c2.2,4.2,5.6,7.7,10.1,10.1C49.9,73.2,63.4,69.7,70,59.6z"
        />
        <path
          className={styles.blade3}
          fill="url(#epilot-grad3)"
          d="M2.5,57.2C7,66,16,70.8,25.1,70.2c1.6-0.1,2.1-2.2,0.7-3c-3.7-2-6.9-5-9.2-9
            c-6.6-11.4-2.7-26,8.7-32.5l0,0c1.4-0.8,0.9-2.9-0.7-3c-4.7-0.2-9.5,1-13.8,3.7C0.7,33-2.9,46.4,2.5,57.2z"
        />
      </svg>
    </div>
  );
}

export default function HeroSection(): JSX.Element {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <EpilotLogo />
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
