/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const lightCodeTheme = require('prism-react-renderer/themes/github');

const { specs } = require('./redoc.config');
const DOCS_URL = process.env.DOCS_URL || 'https://docs.epilot.io'

const changelogProcessingDir = path.join(__dirname, 'changelog-processing');

const apiChangelogPlugins = specs
  .filter((spec) => {
    // Use the last segment after the last slash as the id, e.g. access-token
    const id = spec.routePath.replace('/api/', '').replace(/\/$/, '');
    const changelogFile = path.join(changelogProcessingDir, `${id}.md`);

    return spec.specUrl && fs.existsSync(changelogFile);
  })
  .map((spec) => {
    const id = `${spec.routePath.replace('/api/', '').replace(/\/$/, '')}`;
    const changelogFilename = path.join(changelogProcessingDir, `${id}.md`);

    return [
      require.resolve('./src/plugins/changelog/index.js'),
      {
        id: id,
        blogTitle: `${spec.layout.title} Changelog`,
        blogDescription: `Changelog for ${spec.layout.title}`,
        blogSidebarCount: 'ALL',
        blogSidebarTitle: 'Changelog',
        routeBasePath: `${spec.routePath}/changelog`,
        changelogFilename: changelogFilename,
        showReadingTime: false,
        postsPerPage: 20,
        archiveBasePath: null,
        feedOptions: {
          type: 'all',
          title: `${spec.layout.title} Changelog`,
          description: `Changelog for ${spec.layout.title}`,
          language: 'en',
        },
      },
    ];
  });

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
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'apps',
        path: 'apps',
        routeBasePath: 'apps',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/docs/entities/schemas-list',
            to: '/docs/entities/core-entities',
          },
        ],
      },
    ],
    ...apiChangelogPlugins, // Spread the dynamically generated changelog plugins
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
            position: 'left',
            type: 'docSidebar',
            to: '/apps',
            sidebarId: 'appsSidebar',
            label: 'Apps',
            docsPluginId: 'apps',
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
