import Link from '@docusaurus/Link';
import React from 'react';

import styles from './QuickStartCards.module.css';

/*
 * Small brand-coloured illustrations. They share the CSS-driven palette
 * (currentColor + CSS variables) so they adapt to light/dark themes.
 */

const AppsIllustration = () => (
  <svg className={styles.art} viewBox="0 0 240 140" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="qs-apps-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00D7FF" />
        <stop offset="100%" stopColor="#4C4CFF" />
      </linearGradient>
    </defs>
    {/* app window */}
    <rect x="28" y="18" width="184" height="112" rx="10" className={styles.artSurface} />
    <rect x="28" y="18" width="184" height="24" rx="10" className={styles.artBar} />
    <circle cx="42" cy="30" r="3" className={styles.artDot} />
    <circle cx="53" cy="30" r="3" className={styles.artDot} />
    <circle cx="64" cy="30" r="3" className={styles.artDot} />
    {/* sidebar */}
    <rect x="40" y="54" width="42" height="7" rx="3.5" className={styles.artLine} />
    <rect x="40" y="68" width="34" height="7" rx="3.5" className={styles.artLine} />
    <rect x="40" y="82" width="38" height="7" rx="3.5" className={styles.artLine} />
    <rect x="40" y="96" width="30" height="7" rx="3.5" className={styles.artLine} />
    {/* tabs */}
    <rect x="98" y="52" width="30" height="8" rx="4" className={styles.artLine} />
    <rect x="134" y="52" width="30" height="8" rx="4" className={styles.artLine} />
    {/* plugged-in tab */}
    <rect x="170" y="49" width="34" height="14" rx="5" fill="url(#qs-apps-grad)" />
    <rect x="98" y="70" width="106" height="46" rx="8" fill="url(#qs-apps-grad)" fillOpacity="0.12" />
    <rect
      x="98"
      y="70"
      width="106"
      height="46"
      rx="8"
      stroke="url(#qs-apps-grad)"
      strokeWidth="1.5"
      strokeDasharray="4 4"
    />
    <path d="M151 80v26M138 93h26" stroke="url(#qs-apps-grad)" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const DocsIllustration = () => (
  <svg className={styles.art} viewBox="0 0 240 140" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="qs-docs-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00D7FF" />
        <stop offset="100%" stopColor="#4C4CFF" />
      </linearGradient>
    </defs>
    {/* back pages */}
    <rect x="76" y="14" width="112" height="112" rx="10" className={styles.artSurface} opacity="0.55" />
    <rect x="64" y="22" width="112" height="112" rx="10" className={styles.artSurface} opacity="0.8" />
    {/* front page */}
    <rect x="52" y="30" width="112" height="100" rx="10" className={styles.artSurface} />
    <rect x="52" y="30" width="6" height="100" rx="3" fill="url(#qs-docs-grad)" />
    <rect x="70" y="46" width="56" height="9" rx="4.5" fill="url(#qs-docs-grad)" />
    <rect x="70" y="64" width="78" height="6" rx="3" className={styles.artLine} />
    <rect x="70" y="76" width="66" height="6" rx="3" className={styles.artLine} />
    <rect x="70" y="88" width="74" height="6" rx="3" className={styles.artLine} />
    <rect x="70" y="106" width="40" height="6" rx="3" className={styles.artLine} />
    {/* search / discovery lens */}
    <circle cx="176" cy="102" r="16" className={styles.artSurface} stroke="url(#qs-docs-grad)" strokeWidth="3" />
    <path d="M188 114l12 12" stroke="url(#qs-docs-grad)" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const SdkIllustration = () => (
  <svg className={styles.art} viewBox="0 0 240 140" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="qs-sdk-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00D7FF" />
        <stop offset="100%" stopColor="#4C4CFF" />
      </linearGradient>
    </defs>
    {/* editor */}
    <rect x="28" y="18" width="184" height="112" rx="10" className={styles.artSurface} />
    <rect x="28" y="18" width="184" height="24" rx="10" className={styles.artBar} />
    <circle cx="42" cy="30" r="3" className={styles.artDot} />
    <circle cx="53" cy="30" r="3" className={styles.artDot} />
    <circle cx="64" cy="30" r="3" className={styles.artDot} />
    {/* code lines */}
    <rect x="44" y="56" width="26" height="7" rx="3.5" fill="url(#qs-sdk-grad)" />
    <rect x="76" y="56" width="58" height="7" rx="3.5" className={styles.artLine} />
    <rect x="56" y="72" width="34" height="7" rx="3.5" className={styles.artLine} />
    <rect x="96" y="72" width="30" height="7" rx="3.5" fill="url(#qs-sdk-grad)" fillOpacity="0.55" />
    <rect x="56" y="88" width="20" height="7" rx="3.5" className={styles.artLine} />
    <rect x="82" y="88" width="50" height="7" rx="3.5" className={styles.artLine} />
    <rect x="44" y="104" width="12" height="7" rx="3.5" fill="url(#qs-sdk-grad)" />
    {/* package cube */}
    <g transform="translate(150 60)">
      <path d="M26 0l26 14v30L26 58 0 44V14z" fill="url(#qs-sdk-grad)" fillOpacity="0.16" />
      <path d="M26 0l26 14v30L26 58 0 44V14z" stroke="url(#qs-sdk-grad)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M0 14l26 14 26-14M26 28v30" stroke="url(#qs-sdk-grad)" strokeWidth="2.5" strokeLinejoin="round" />
    </g>
  </svg>
);

const items = [
  {
    title: 'Apps',
    description:
      'Extend epilot with Apps that plug into entity pages, journeys, portals, and flows — from custom tabs and blocks to server-side functions.',
    href: '/docs/apps',
    cta: 'Build your first app',
    art: <AppsIllustration />,
  },
  {
    title: 'Documentation',
    description:
      'Understand the Energy XRM: entities, journeys, workflows, automation, pricing, and everything else that runs an energy business.',
    href: '/docs/intro',
    cta: 'Read the docs',
    art: <DocsIllustration />,
  },
  {
    title: 'SDK',
    description:
      'Typed TypeScript clients for every epilot API, generated from the OpenAPI specs and kept in sync with the platform.',
    href: '/docs/sdk/overview',
    cta: 'Install the SDK',
    art: <SdkIllustration />,
  },
];

export default function QuickStartCards(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {items.map((item) => (
            <Link key={item.href} to={item.href} className={styles.card}>
              <div className={styles.artWrap}>{item.art}</div>
              <div className={styles.cardBody}>
                <h2 className={styles.cardTitle}>{item.title}</h2>
                <p className={styles.cardDescription}>{item.description}</p>
                <span className={styles.cardCta}>
                  {item.cta} <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
