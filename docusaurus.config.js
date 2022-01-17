/* eslint-disable @typescript-eslint/no-var-requires */
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const lightCodeTheme = require('prism-react-renderer/themes/github');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'Epilot Dev Handbook',
  tagline: 'Official developer documentation for epilot 360',
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
            layout: { title: 'User API' },
            routePath: '/api/user',
            specUrl: 'https://docs.api.epilot.io/user.yaml',
          },
          {
            layout: { title: 'Organization API' },
            routePath: '/api/organization',
            specUrl: 'https://docs.api.epilot.io/organization-v2.yaml',
          },
          {
            layout: { title: 'Entity API' },
            routePath: '/api/entity',
            specUrl: 'https://docs.api.epilot.io/entity.yaml',
          },
          {
            layout: { title: 'Submission API' },
            routePath: '/api/submission',
            specUrl: 'https://docs.api.epilot.io/submission-api.yaml',
          },
          {
            layout: { title: 'Pricing API' },
            routePath: '/api/pricing',
            specUrl: 'https://docs.api.epilot.io/pricing-api.yaml',
          },
          {
            layout: { title: 'Permissions API' },
            routePath: '/api/permissions',
            specUrl: 'https://docs.api.epilot.io/permissions.yaml',
          },
          {
            layout: { title: 'Message API' },
            routePath: '/api/message',
            specUrl: 'https://docs.api.epilot.io/message.yaml',
          },
          {
            layout: { title: 'File API' },
            routePath: '/api/file',
            specUrl: 'https://docs.api.epilot.io/file.yaml',
          },
          {
            layout: { title: 'Document API' },
            routePath: '/api/document',
            specUrl: 'https://docs.api.epilot.io/document.yaml',
          },
          {
            layout: { title: 'Webhooks API' },
            routePath: '/api/webhooks',
            specUrl: 'https://docs.api.epilot.io/webhooks.yaml',
          },
          {
            layout: { title: 'Automation API' },
            routePath: '/api/automation',
            specUrl: 'https://docs.api.epilot.io/automation.yaml',
          },
          {
            layout: { title: 'Consent API' },
            routePath: '/api/consent',
            specUrl: 'https://docs.api.epilot.io/consent.yaml',
          },
          {
            layout: { title: 'Customer Portal API' },
            routePath: '/api/customer-portal',
            specUrl: 'https://docs.api.epilot.io/customer-portal.yaml',
          },
          {
            layout: { title: 'Notification API' },
            routePath: '/api/svc-notification-api',
            specUrl: 'https://docs.api.epilot.io/svc-notification-api.yaml',
          },
          {
            layout: { title: 'Workflows Definition API' },
            routePath: '/api/workflows-definition',
            specUrl: 'https://docs.api.epilot.io/workflows-definition.yaml',
          },
          {
            layout: { title: 'Workflows Execution API' },
            routePath: '/api/workflows-execution',
            specUrl: 'https://docs.api.epilot.io/workflows-execution.yaml',
          },
        ].map((spec) => ({ ...spec, apiDocComponent: '../src/components/RedocPage' })),
        theme: {
          primaryColor: '#cc5cac',
          redocOptions: {
            hideDownloadButton: false,
            nativeScrollbars: true,
            pathInMiddlePanel: true,
          },
        },
      },
    ],
  ],

  plugins: [require.resolve('@cmfcmf/docusaurus-search-local')],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Dev Handbook',
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
            label: 'API Specs',
            position: 'left',
          },
          {
            to: '/docs/architecture/sdk',
            label: 'SDK',
            position: 'left',
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
                label: '360 Portal',
                href: 'https://portal.epilot.cloud',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/epilot-dev',
              },
              {
                label: 'Stackoverflow',
                href: 'https://stackoverflow.com/c/epilot/questions',
              },
              {
                label: 'Blog',
                href: 'https://dev.to/epilot',
              },
            ],
          },
        ],
        copyright: `&copy; epilot.cloud ${new Date().getFullYear()} – Max-the-DEV`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
