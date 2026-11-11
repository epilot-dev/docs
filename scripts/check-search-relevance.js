/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Relevance checks for the site search.
 *
 * Runs real queries against the index of the last build and verifies that the
 * page a reader is looking for is among the first results. Run it after
 * changing the ranking in src/plugins/search/engine.js:
 *
 *   npm run build && npm run test:search
 *
 * Pass queries as arguments to print their results instead:
 *
 *   npm run test:search -- "webhook signature" getEntity
 */
const fs = require('fs');
const path = require('path');

const { createIndex } = require('../src/plugins/search/engine');

const INDEX_PATH = path.join(__dirname, '..', 'build', 'search-index.json');

// [query, expected page (or one of several), worst acceptable position]
const CASES = [
  // Topics: the page about the topic comes first
  ['webhooks', '/docs/integrations/webhooks/', 1],
  ['authentication', '/docs/auth/authentication/', 1],
  ['access tokens', '/docs/auth/access-tokens/', 1],
  ['token types', '/docs/auth/token-types/', 1],
  ['permissions', ['/docs/auth/permissions/', '/docs/apps/configure-permissions/'], 1],
  ['grant actions', '/docs/auth/grant-actions/', 1],
  ['sso', '/docs/sso/single-sign-on/', 1],
  ['single sign on', '/docs/sso/single-sign-on/', 1],
  ['mfa', '/docs/auth/mfa/', 1],
  ['passkeys', '/docs/auth/passkeys/', 1],
  ['pii anonymization', '/docs/auth/anonymization/', 1],
  ['rate limits', '/docs/integrations/rate-limits/', 1],
  ['blueprints', '/docs/blueprints/intro/', 1],
  ['sandbox', '/docs/blueprints/sandboxes/', 3],
  ['entity mapping', '/docs/automation/entity-mapping/', 1],
  ['core entities', '/docs/entities/core-entities/', 1],
  ['relations', '/docs/entities/relations/', 1],
  ['taxonomy', '/docs/entities/taxonomies/', 1],
  ['changesets', '/docs/entities/changesets/', 1],
  ['customer portal', '/docs/portals/customer-portal/', 2],
  ['pricing models', '/docs/pricing/pricing-models/', 1],
  ['orders', '/docs/pricing/orders/', 2],
  ['document generation', '/docs/files/document-generation/', 1],
  ['template variables', '/docs/templates/template-variables/', 1],
  ['email templates', '/docs/templates/email-templates/', 1],
  ['custom css', '/docs/journeys/custom-css/', 1],
  ['journey embed', ['/docs/journeys/sdk/', '/docs/journeys/embedding/'], 1],
  ['web components', '/docs/journeys/web-components/', 1],
  ['sdk', '/docs/sdk/overview/', 1],
  ['cli', '/docs/cli/overview/', 1],
  ['mcp', '/docs/agent-toolkit/mcp-server/', 1],
  ['zapier', '/docs/integrations/zapier/', 1],
  ['integration toolkit', '/docs/integrations/integration-toolkit/overview/', 1],
  ['meter readings', '/docs/integrations/integration-toolkit/inbound/meter-readings/', 2],
  ['static ip', '/docs/integrations/webhooks/static-ip/', 1],
  ['audit logs', '/docs/audit-logs/', 1],
  ['app manifest', '/docs/apps/app-manifest/', 1],
  [
    'custom journey block',
    ['/docs/apps/components/custom-journey-block/', '/docs/apps/how-to-guides/build-a-custom-jb/'],
    1,
  ],
  ['datalake', '/docs/datalake/epilot-datalake/', 1],
  ['workflows', '/docs/workflows/intro/', 1],
  ['automation', '/docs/automation/intro/', 1],
  ['environments secrets', '/docs/environments/environments-secrets/', 1],
  ['volt ui', '/docs/architecture/design-system/', 1],

  // Questions and word forms
  ['how to authenticate', '/docs/auth/authentication/', 3],
  ['how do I verify a webhook signature', '/docs/integrations/webhooks/security/', 1],
  ['installing blueprints', '/docs/blueprints/installing-a-blueprint/', 1],
  ['embed a journey', ['/docs/journeys/sdk/', '/docs/journeys/embedding/'], 1],
  ['generate documents', '/docs/files/document-generation/', 2],
  ['webhook signature', '/docs/integrations/webhooks/security/', 1],
  ['file upload', ['/docs/files/file-api/', '/api/file/'], 3],

  // Identifiers, endpoints and headers
  ['getEntity', '/api/entity/', 1],
  ['createEntity', '/api/entity/', 1],
  ['searchEntities', '/api/entity/', 1],
  ['create entity', '/api/entity/', 2],
  ['triggerWebhook', '/api/webhooks/', 1],
  ['POST /v1/entity/{slug}', '/api/entity/', 1],
  ['/v1/webhooks/configs', '/api/webhooks/', 1],
  ['x-epilot-org-id', '/docs/collaboration/sharing/', 3],
  ['entity api', ['/docs/entities/entity-api/', '/api/entity/'], 1],

  // Typing in progress
  ['authen', '/docs/auth/authentication/', 1],
  ['webh', '/docs/integrations/webhooks/', 1],
  ['blueprin', '/docs/blueprints/intro/', 1],
  ['entity map', '/docs/automation/entity-mapping/', 1],

  // Typos
  ['authentcation', '/docs/auth/authentication/', 1],
  ['webhok', '/docs/integrations/webhooks/', 1],
  ['entiy mapping', '/docs/automation/entity-mapping/', 1],
  ['bluprint', '/docs/blueprints/intro/', 3],
];

if (!fs.existsSync(INDEX_PATH)) {
  console.error(`No search index at ${INDEX_PATH}. Run "npm run build" first.`);
  process.exit(1);
}

const index = createIndex(JSON.parse(fs.readFileSync(INDEX_PATH, 'utf-8')));

index.build();

const plain = (segments) => segments.map(([text, isMatch]) => (isMatch ? `[${text}]` : text)).join('');
const queries = process.argv.slice(2);

if (queries.length) {
  for (const query of queries) {
    const result = index.search(query);

    console.log(`\n"${query}": ${result.total} pages`);

    for (const page of result.pages) {
      console.log(`  ${page.score.toFixed(1).padStart(6)}  ${plain(page.title)}  (${page.url})`);

      for (const section of page.sections) {
        const label = section.heading ? plain(section.heading) : 'page';
        const text = section.excerpt ? plain(section.excerpt.text) : '';

        console.log(`          ${section.score.toFixed(1)} ${label}: ${text.slice(0, 110)}`);
      }
    }
  }
  process.exit(0);
}

let failures = 0;

for (const [query, expected, worst] of CASES) {
  const accepted = [].concat(expected);
  const urls = index.search(query, { limit: 10 }).pages.map((page) => page.url);
  const position = urls.findIndex((url) => accepted.includes(url)) + 1;

  if (position === 0 || position > worst) {
    failures++;
    console.log(
      `FAIL  "${query}": expected ${accepted.join(' or ')} in top ${worst}, got position ${position || 'none'}`,
    );
    urls.slice(0, 4).forEach((url, i) => console.log(`        ${i + 1}. ${url}`));
  }
}

console.log(`\n${CASES.length - failures}/${CASES.length} search relevance checks passed`);
process.exit(failures ? 1 : 0);
