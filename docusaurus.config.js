/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const lightCodeTheme = require('prism-react-renderer/themes/github');

const { specs } = require('./redoc.config');
const DOCS_URL = process.env.DOCS_URL || 'https://docs.epilot.io';

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

  organizationName: 'epilot-dev',
  projectName: 'docs',
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          id: 'default',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/epilot-dev/docs/edit/main/',
          remarkPlugins: [require('mdx-mermaid')],
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
          primaryColor: '#4C4CFF',
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
    function mermaidAliasPlugin() {
      return {
        name: 'mermaid-alias',
        configureWebpack() {
          return {
            resolve: {
              alias: {
                'mdx-mermaid/lib/Mermaid': path.resolve(__dirname, 'src/components/Mermaid.js'),
              },
            },
          };
        },
      };
    },
    require.resolve('@cmfcmf/docusaurus-search-local'),
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/docs/entities/schemas-list',
            to: '/docs/entities/core-entities',
          },
        ],
        createRedirects(existingPath) {
          // Redirect old /apps/* paths to /docs/apps/*
          if (existingPath.includes('/docs/apps')) {
            return [existingPath.replace('/docs/apps', '/apps')];
          }
          return undefined;
        },
      },
    ],
    [
      require.resolve('./src/plugins/changelog/index.js'),
      {
        id: 'api-changelog',
        blogTitle: 'API Changelog',
        blogDescription: 'Breaking changes, new features, and significant updates to epilot APIs.',
        blogSidebarCount: 'ALL',
        blogSidebarTitle: 'Changelog',
        routeBasePath: '/api/changelog',
        changelogFilename: path.join(__dirname, 'CHANGELOG.md'),
        showReadingTime: false,
        postsPerPage: 25,
        archiveBasePath: null,
        feedOptions: {
          type: 'all',
          title: 'epilot API Changelog',
          description: 'Breaking changes, new features, and significant updates to epilot APIs.',
          language: 'en',
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true
      },
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
            to: '/docs/architecture/sdk',
            label: 'SDK',
            position: 'left',
          },
          {
            to: '/docs/apps',
            label: 'Apps',
            position: 'left',
          },
          {
            href: 'https://marketplace.epilot.cloud/en',
            label: 'Marketplace',
            position: 'right',
            className: 'navbar-button navbar-button--secondary',
          },
          {
            href: 'https://portal.epilot.cloud',
            label: 'Log in',
            position: 'right',
            className: 'navbar-button navbar-button--primary',
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
                label: 'SDK',
                to: '/docs/architecture/sdk',
              },
              {
                label: 'Open Source',
                to: '/docs/architecture/open-source',
              },
            ],
          },
          {
            title: 'Links',
            items: [
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
              {
                label: 'Careers',
                href: 'https://www.epilot.cloud/en/company/careers',
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
