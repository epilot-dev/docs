import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React from 'react';

import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Entities',
    image: '/img/devs.webp',
    description: (
      <>
        A standard data model with flexible schemas and attributes. Build on{' '}
        <Link to="/docs/entities/core-entities">core entities</Link> like contacts, orders, products and contracts — or
        define your own.
      </>
    ),
  },
  {
    title: 'APIs',
    image: '/img/cogwheel.webp',
    description: (
      <>
        All platform features available via <Link to="/api">REST APIs</Link> documented with OpenAPI specs.
        Subscribe to platform events through <Link to="/docs/integrations/webhooks">Webhooks</Link> with{' '}
        standardized <Link to="/docs/integrations/core-events">event schemas</Link>.
      </>
    ),
  },
  {
    title: 'SDK',
    image: '/img/epilot.png',
    description: (
      <>
        Use the <Link to="/docs/architecture/sdk">epilot SDK</Link> for TypeScript and JavaScript. All APIs just one{' '}
        <code>npm install</code> away.
      </>
    ),
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureImage}>
          <img alt={title} src={image} />
        </div>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
