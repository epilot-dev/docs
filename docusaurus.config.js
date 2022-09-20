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
  tagline: 'The platform to simplify your business - for developers.',
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
        specs: [
          {
            layout: { title: 'Access Token API' },
            route: '/api/access-token',
            spec: 'https://docs.api.epilot.io/access-token.yaml',
          },
          {
            layout: { title: 'User API' },
            route: '/api/user',
            spec: 'https://docs.api.epilot.io/user.yaml',
          },
          {
            layout: { title: 'Organization API' },
            route: '/api/organization',
            spec: 'https://docs.api.epilot.io/organization-v2.yaml',
          },
          {
            layout: { title: 'Entity API' },
            route: '/api/entity',
            spec: 'https://docs.api.epilot.io/entity.yaml',
          },
          {
            layout: { title: 'Submission API' },
            route: '/api/submission',
            spec: 'https://docs.api.epilot.io/submission-api.yaml',
          },
          {
            layout: { title: 'Pricing API' },
            route: '/api/pricing',
            spec: 'https://docs.api.epilot.io/pricing-api.yaml',
          },
          {
            layout: { title: 'Webhooks API' },
            route: '/api/webhooks',
            spec: 'https://docs.api.epilot.io/webhooks-howto.yaml',
          },
          {
            layout: { title: 'Permissions API' },
            route: '/api/permissions',
            spec: 'https://docs.api.epilot.io/permissions.yaml',
          },
          {
            layout: { title: 'Message API' },
            route: '/api/message',
            spec: 'https://docs.api.epilot.io/message.yaml',
          },
          {
            layout: { title: 'File API' },
            route: '/api/file',
            spec: 'https://docs.api.epilot.io/file.yaml',
          },
          {
            layout: { title: 'Journey API' },
            route: '/api/journey',
            spec: 'https://docs.api.epilot.io/journey-config.yaml',
          },
          {
            layout: { title: 'Automation API' },
            route: '/api/automation',
            spec: 'https://docs.api.epilot.io/automation.yaml',
          },
          {
            layout: { title: 'Document API' },
            route: '/api/document',
            spec: 'https://docs.api.epilot.io/document.yaml',
          },
          {
            layout: { title: 'Template Variables API' },
            route: '/api/template-variables',
            spec: 'https://docs.api.epilot.io/template-variables.yaml',
          },
          {
            layout: { title: 'Customer Portal API' },
            route: '/api/customer-portal',
            spec: 'https://docs.api.epilot.io/customer-portal.yaml',
          },
          {
            layout: { title: 'Notification API' },
            route: '/api/notification',
            spec: 'https://docs.api.epilot.io/svc-notification-api.yaml',
          },
          {
            layout: { title: 'Workflow Definition API' },
            route: '/api/workflow-definition',
            spec: 'https://docs.api.epilot.io/workflows-definition.yaml',
          },
          {
            layout: { title: 'Workflow Execution API' },
            route: '/api/workflow-execution',
            spec: 'https://docs.api.epilot.io/workflows-execution.yaml',
          },
          {
            layout: { title: 'Partner API' },
            route: '/api/partner',
            spec: 'https://docs.api.epilot.io/partner-directory-api.yaml',
          },
          {
            layout: { title: 'Internal Auth API' },
            route: '/api/internal-auth',
            spec: 'https://docs.api.epilot.io/internal-auth.yaml',
          },
        ],
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
