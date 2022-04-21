/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const lightCodeTheme = require('prism-react-renderer/themes/github');

const graphqlMarkdownConfig = require('./graphql-markdown.config');
const DOCS_URL = 'https://docs.epilot.io';

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'epilot dev center',
  tagline: 'Build complex commerce solutions easily powered by epilot platform & portals',
  url: DOCS_URL,
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
          id: 'default',
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
            layout: { title: 'Document API' },
            routePath: '/api/document',
            specUrl: 'https://docs.api.epilot.io/document.yaml',
          },
          {
            layout: { title: 'Template Variables API' },
            routePath: '/api/template-variables',
            specUrl: 'https://docs.api.epilot.io/template-variables.yaml',
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
            routePath: '/api/notification',
            specUrl: 'https://docs.api.epilot.io/svc-notification-api.yaml',
          },
          {
            layout: { title: 'Workflow Definition API' },
            routePath: '/api/workflow-definition',
            specUrl: 'https://docs.api.epilot.io/workflows-definition.yaml',
          },
          {
            layout: { title: 'Workflow Execution API' },
            routePath: '/api/workflow-execution',
            specUrl: 'https://docs.api.epilot.io/workflows-execution.yaml',
          },
          {
            layout: { title: 'Internal Auth API' },
            routePath: '/api/internal-auth',
            specUrl: 'https://docs.api.epilot.io/internal-auth.yaml',
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
            label: 'Graphql API',
            to: '/graphql/customer-portal',
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
                label: 'REST API Docs',
                to: '/api',
              },
              {
                label: 'Graphql API Docs',
                to: '/graphql/customer-portal',
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
                label: 'Blog',
                href: 'https://dev.to/epilot',
              },
              {
                label: 'Tech Radar',
                href: `${DOCS_URL}/techradar`,
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
