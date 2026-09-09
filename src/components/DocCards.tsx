import Link from '@docusaurus/Link';
import React from 'react';

import { featureArt, icons } from './DocCardIcons';
import styles from './DocCards.module.css';

export interface DocCardItem {
  title: string;
  description: string;
  href: string;
  badge?: string;
  /** Key of a glyph in DocCardIcons.icons (compact cards). */
  icon?: keyof typeof icons;
  /** Key of an illustration in DocCardIcons.featureArt (feature cards). */
  art?: keyof typeof featureArt;
}

interface DocCardsProps {
  items: DocCardItem[];
  columns?: 2 | 3;
  /** "feature" renders larger cards with an illustrated header panel. */
  variant?: 'compact' | 'feature';
}

/**
 * Link-card grid for section landing pages (e.g. /docs/apps).
 * Usage in MDX:
 *   <DocCards items={[{ title, description, href, icon: 'rocket' }]} />
 */
export default function DocCards({ items, columns = 3, variant = 'compact' }: DocCardsProps): JSX.Element {
  const gridClass = columns === 2 ? styles.gridTwo : styles.grid;

  if (variant === 'feature') {
    return (
      <div className={gridClass}>
        {items.map((item) => {
          const Art = item.art ? featureArt[item.art] : undefined;
          const accentId = `dc-accent-${item.art ?? 'default'}`;

          return (
            <Link key={item.href} to={item.href} className={styles.feature}>
              {Art && (
                <div className={styles.featureArt}>
                  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
                    <defs>
                      <linearGradient id={accentId} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#00D7FF" />
                        <stop offset="100%" stopColor="#4C4CFF" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <Art surface={styles.artSurface} line={styles.artLine} accentId={accentId} />
                </div>
              )}
              <div className={styles.featureBody}>
                <div className={styles.head}>
                  <span className={styles.featureTitle}>{item.title}</span>
                  {item.badge && <span className={styles.badge}>{item.badge}</span>}
                </div>
                <p className={styles.description}>{item.description}</p>
                <span className={styles.featureArrow} aria-hidden="true">
                  &rarr;
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className={gridClass}>
      {items.map((item) => (
        <Link key={item.href} to={item.href} className={styles.card}>
          {item.icon && icons[item.icon] && <span className={styles.icon}>{icons[item.icon]}</span>}
          <div className={styles.cardBody}>
            <div className={styles.head}>
              <span className={styles.title}>{item.title}</span>
              {item.badge && <span className={styles.badge}>{item.badge}</span>}
            </div>
            <p className={styles.description}>{item.description}</p>
          </div>
          <span className={styles.arrow} aria-hidden="true">
            &rarr;
          </span>
        </Link>
      ))}
    </div>
  );
}
