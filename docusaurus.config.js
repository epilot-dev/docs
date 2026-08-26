/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const lightCodeTheme = require('prism-react-renderer/themes/github');

const { specs } = require('./redoc.config');
const DOCS_URL = process.env.DOCS_URL || 'https://docs.epilot.io';

// Internal flag: the Agent Toolkit is hidden from the public site until launch.
// Build with SHOW_AGENT_TOOLKIT=true to include the page, nav links, and promos.
const showAgentToolkit = process.env.SHOW_AGENT_TOOLKIT === 'true';

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
  customFields: {
    showAgentToolkit,
  },
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
        pages: {
          exclude: [
            // plugin-content-pages defaults (replaced when `exclude` is set)
            '**/_*.{js,jsx,ts,tsx,md,mdx}',
            '**/_*/**',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__tests__/**',
            ...(showAgentToolkit ? [] : ['agent-toolkit/**']),
          ],
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

  clientModules: [require.resolve('./src/clientModules/playgroundNewTab.js')],

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
          {
            // Component options were replaced by app-level options
            from: [
              '/docs/apps/components/configure-options',
              '/apps/components/configure-options',
            ],
            to: '/docs/apps/app-options',
          },
        ],
        createRedirects(existingPath) {
          // Redirect old /apps/* paths to /docs/apps/*
          if (existingPath.includes('/docs/apps')) {
            return [existingPath.replace('/docs/apps', '/apps')];
          }
          // Redirect old ERP Toolkit paths to the rebranded Integration Toolkit
          if (existingPath.includes('/docs/integrations/integration-toolkit')) {
            return [
              existingPath.replace(
                '/docs/integrations/integration-toolkit',
                '/docs/integrations/erp-toolkit'
              ),
            ];
          }
          return undefined;
        },
      },
    ],
    [
      require.resolve('./src/plugins/llms-txt/index.js'),
      {
        siteDescription: `epilot is a cloud-native SaaS platform (Energy XRM) designed for energy suppliers and service providers in the German energy market.

The platform provides:
- **Entity Management**: Flexible data modeling with schemas for contacts, products, orders, opportunities, and custom entities
- **Journey Builder**: Visual designer for customer onboarding journeys, self-service portals, and multi-step forms
- **Workflow Engine**: Configurable workflows for business process automation with task management and SLA tracking
- **Automation Engine**: Rule-based automation for entity mapping, document generation, and integrations
- **Portal Framework**: Customer (ECP) and installer portals with granular permissions and self-service capabilities
- **Messaging Hub**: Centralized email and messaging with templates and shared inboxes
- **Integration Toolkit**: Pre-built connectors for SAP, Wilken, and other ERP/billing systems
- **REST APIs & SDK**: Comprehensive APIs for all platform capabilities with TypeScript SDK
- **Document Generation**: Template-based document creation with variable support
- **Pricing & Product Catalog**: Flexible product management with tiered pricing and availability rules
- **AI Features**: AI-powered copilot for entity management, messaging, and workflow automation
- **Apps & Marketplace**: Extensibility platform for third-party and custom applications

This documentation covers all aspects of the epilot platform for developers, administrators, and integration partners.`,
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
            to: '/docs/sdk/overview',
            label: 'SDK',
            position: 'left',
          },
          ...(showAgentToolkit
            ? [
                {
                  to: '/agent-toolkit',
                  label: 'Agent Toolkit',
                  position: 'left',
                },
              ]
            : []),
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
            label: 'Documentation',
            to: '/docs/intro',
          },
          {
            label: 'REST API',
            to: '/api',
          },
          {
            label: 'SDK',
            to: '/docs/sdk/overview',
          },
          ...(showAgentToolkit
            ? [
                {
                  label: 'Agent Toolkit',
                  to: '/agent-toolkit',
                },
              ]
            : []),
          {
            label: 'GitHub',
            href: 'https://github.com/epilot-dev',
          },
          {
            label: 'Blog',
            href: 'https://dev.to/epilot',
          },
          {
            label: 'Changelog',
            to: '/api/changelog',
          },
          {
            label: 'Careers',
            href: 'https://www.epilot.cloud/en/company/careers',
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
