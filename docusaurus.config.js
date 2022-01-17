const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'Epilot Developer Portal',
  tagline: 'The epilot platform for developers.',
  url: 'https://dev.epilot.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'epilot-dev', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
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
        specs: [
          {
            routePath: '/api/user',
            specUrl: 'https://docs.api.epilot.io/user.yaml',
          },
          {
            routePath: '/api/entity',
            specUrl: 'https://docs.api.epilot.io/entity.yaml',
          },
        ],
        theme: {
          primaryColor: '#1b3855',
          redocOptions: { hideDownloadButton: false },
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Developer Portal',
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
            label: 'API Docs',
            position: 'left',
          },
          {
            to: '/docs/architecture/sdk',
            label: 'SDK',
            position: 'left',
          },
          {
            href: 'https://github.com/epilot-dev',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Documentation',
                to: '/docs/intro',
              },
              {
                label: 'API Docs',
                to: '/api',
              },
              {
                label: 'SDK',
                to: '/docs/architecture/sdk',
              },
              {
                label: 'Engineering Principles',
                href: 'https://github.com/epilot-dev/engineering-principles',
              },
            ],
          },
          {
            title: 'Links',
            items: [
              {
                label: 'Portal',
                href: 'https://portal.epilot.cloud',
              },
              {
                label: 'Website',
                href: 'https://epilot.cloud',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/epilot-dev',
              },
              {
                label: 'Blog',
                href: 'https://dev.to/epilot',
              },
            ],
          },
        ],
        copyright: `&copy; epilot GmbH ${new Date().getFullYear()} – Max-the-DEV`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
