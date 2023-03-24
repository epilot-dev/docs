module.exports = [
  ...[
    {
      id: 'customer-portal',
      url: 'https://docs.api.epilot.io/graphql/customer-portal.graphql',
      homepage: 'static/graphql/customer-portal.md',
    },
    {
      id: 'sharing',
      url: 'https://docs.api.epilot.io/graphql/sharing-api.graphql',
      homepage: 'static/graphql/sharing.md',
    },
  ].map((schema) => [
    '@edno/docusaurus2-graphql-doc-generator',
    {
      id: schema.id,
      schema: schema.url,
      rootPath: '.',
      baseURL: `/graphql/${schema.id}`,
      homepage: schema.homepage,
      loaders: {
        UrlLoader: '@graphql-tools/url-loader',
      },
    },
  ]),
];
