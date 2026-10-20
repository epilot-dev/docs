/**
 * Wraps the default DocItem to add per-page machine-readable metadata:
 * - a <link rel="alternate" type="text/markdown"> pointing at the raw markdown
 *   version of the page, which the llms-txt plugin writes next to every doc
 *   (/docs/foo/ -> /docs/foo.md)
 * - TechArticle JSON-LD built from the page's own title and description
 */
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { organization, website } from '@site/src/utils/structured-data';
import OriginalDocItem from '@theme-original/DocItem';
import type { Props } from '@theme/DocItem';
import React from 'react';

import JsonLd from '../../components/JsonLd';

export default function DocItem(props: Props): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const { metadata } = props.content;
  const siteUrl = siteConfig.url;
  const pageUrl = `${siteUrl}${metadata.permalink}`;
  const markdownUrl = `${siteUrl}${metadata.permalink.replace(/\/$/, '')}.md`;

  const article: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: metadata.title,
    url: pageUrl,
    inLanguage: 'en',
    isPartOf: website(siteUrl, siteConfig.title),
    publisher: organization(siteUrl),
  };

  if (metadata.description) article.description = metadata.description;
  if (metadata.lastUpdatedAt) article.dateModified = new Date(metadata.lastUpdatedAt * 1000).toISOString();

  return (
    <>
      <Head>
        <link rel="alternate" type="text/markdown" href={markdownUrl} title={`${metadata.title} (Markdown)`} />
      </Head>
      <JsonLd data={article} />
      <OriginalDocItem {...props} />
    </>
  );
}
