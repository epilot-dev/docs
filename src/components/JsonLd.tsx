import Head from '@docusaurus/Head';
import React from 'react';

type Props = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

/**
 * Renders schema.org structured data as a JSON-LD script in the page head.
 * Only describe what is visible on the page.
 */
export default function JsonLd({ data }: Props): JSX.Element {
  // Escape "<" so a value can never close the script tag early.
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <Head>
      <script type="application/ld+json">{json}</script>
    </Head>
  );
}
