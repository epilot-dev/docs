/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const lightCodeTheme = require('prism-react-renderer/themes/github');

const graphqlMarkdownConfig = require('./graphql-markdown.config');
const { specs } = require('./redoc.config');
const DOCS_URL = 'https://docs.epilot.io';

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'epilot dev center',
  tagline: 'The Energy XRM - for developers.',
  url: DOCS_URL,
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',
  organizationName: 'epilot-dev', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          id: 'default',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/epilot-dev/docs/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
    [
      'redocusaurus',
      {
        debug: Boolean(process.env.DEBUG || process.env.CI),
        specs: specs.map((spec) => ({ ...spec, apiDocComponent: '../src/components/RedocPage' })),
        theme: {
          primaryColor: '#9b91ff',
          redocOptions: {
            hideDownloadButton: false,
            nativeScrollbars: true,
            pathInMiddlePanel: true,
          },
        },
      },
    ],
  ],

  plugins: [
    require.resolve('@cmfcmf/docusaurus-search-local'),
    ...graphqlMarkdownConfig,
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'graphql',
        path: 'graphql',
        routeBasePath: 'graphql',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Dev Center',
        logo: {
          alt: 'epilot',
          src: 'img/logo.png',
        },
        items: [
          {
            label: 'Documentation',
            type: 'doc',
            docId: 'intro',
            position: 'left',
          },
          {
            to: '/api',
            label: 'REST API',
            position: 'left',
          },
          {
            position: 'left',
            label: 'GraphQL',
            to: '/graphql/sharing',
          },
          {
            to: '/docs/architecture/sdk',
            label: 'SDK',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Documentation',
                to: '/docs/intro',
              },
              {
                label: 'REST API Docs',
                to: '/api',
              },
              {
                label: 'Graphql API Docs',
                to: '/graphql/sharing',
              },
              {
                label: 'SDK',
                to: '/docs/architecture/sdk',
              },
            ],
          },
          {
            title: 'Links',
            items: [
              {
                label: 'Portal login',
                href: 'https://portal.epilot.cloud',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/epilot-dev',
              },
              {
                label: 'Blog',
                href: 'https://dev.to/epilot',
              },
              {
                label: 'Tech Radar',
                href: `${DOCS_URL}/techradar`,
              },
              {
                label: 'Engineering Principles',
                href: 'https://github.com/epilot-dev/engineering-principles',
              },
            ],
          },
        ],
        copyright: `&copy; epilot.cloud ${new Date().getFullYear()}`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
