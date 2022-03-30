module.exports = [
  ...[
    {
      id: 'customer-portal',
      url: 'https://docs.api.epilot.io/graphql/customer-portal.graphql',
      homepage: 'static/graphql/customer-portal.md',
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
