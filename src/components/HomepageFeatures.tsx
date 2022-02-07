/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
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
    title: 'For Developers',
    image: '/img/unicorn.png',
    description: (
      <>
        This developer center is intended for all developers building and working with epilot platform. All resources
        you need in one place.
      </>
    ),
  },
  {
    title: 'API First',
    image: '/img/openapi-logo.png',
    description: (
      <>
        All our platform features are available and documented with industry standard <Link to="/api">API specs</Link>{' '}
        like OpenAPI and GraphQL.
      </>
    ),
  },
  {
    title: 'SDK',
    image: '/img/npm-logo.png',
    description: (
      <>
        Use <Link to="/docs/architecture/sdk">our SDK</Link> for TypeScript and JavaScript to build faster. All our APIs
        just one npm install away.
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
