/** Shared schema.org nodes for JSON-LD on docs.epilot.io. */

export const organization = (siteUrl: string) => ({
  '@type': 'Organization',
  '@id': 'https://www.epilot.cloud/#organization',
  name: 'epilot',
  url: 'https://www.epilot.cloud',
  logo: `${siteUrl}/img/logo.png`,
  sameAs: ['https://github.com/epilot-dev', 'https://dev.to/epilot'],
});

export const website = (siteUrl: string, name: string) => ({
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name,
  url: `${siteUrl}/`,
  inLanguage: 'en',
  publisher: { '@id': 'https://www.epilot.cloud/#organization' },
});
