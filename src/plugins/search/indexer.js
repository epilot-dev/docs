/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Build-time half of the site search: turns the built site into a list of
 * searchable records, one per page section.
 *
 * - Doc, changelog and custom pages are read from the rendered HTML, so the
 *   index contains exactly what a reader sees (including MDX components) and
 *   the anchors are the real heading ids.
 * - API reference pages are rendered client-side by Redoc and have no content
 *   in the HTML, so their operations are read from the OpenAPI specs instead.
 */
const path = require('path');

const cheerio = require('cheerio');
const fs = require('fs-extra');
const yaml = require('yaml');

// h5 and h6 are admonition titles and other labels, not places to link to.
const HEADINGS = new Set(['h1', 'h2', 'h3', 'h4']);

// Never descended into: chrome, controls and rendered diagrams. Anything else
// can opt out with a `data-search-ignore` attribute.
const SKIPPED_TAGS = new Set(['script', 'style', 'noscript', 'svg', 'button', 'nav', 'footer', 'iframe', 'template']);
const SKIPPED_CLASSES = [
  'hash-link',
  'mermaid',
  'theme-doc-toc-mobile',
  'theme-doc-footer',
  'pagination-nav',
  'theme-edit-this-page',
  'sr-only',
];

// Elements that end a run of text. Everything else is inline.
const BLOCK_TAGS = new Set([
  'p',
  'div',
  'section',
  'article',
  'header',
  'ul',
  'ol',
  'li',
  'dl',
  'dt',
  'dd',
  'table',
  'thead',
  'tbody',
  'tr',
  'td',
  'th',
  'pre',
  'blockquote',
  'details',
  'summary',
  'figure',
  'figcaption',
  'br',
  'hr',
]);

const ADMONITION_LABELS = new Set(['note', 'tip', 'info', 'caution', 'danger', 'warning', 'important', 'success']);

const GENERIC_TITLES = new Set(['overview', 'introduction', 'intro', 'readme', 'getting started']);

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'];

// Long sections are cut: nobody reads past this in a search result, and the
// tail of a huge generated table only adds noise to the ranking.
const MAX_SECTION_CHARS = 6000;
const MAX_API_DESCRIPTION_CHARS = 1500;

// Code samples are searchable but kept apart from the prose, so the engine can
// weight them lower: a 200-line sample response must not outrank the paragraph
// that explains the feature. Only the head of a block is kept.
const MAX_CODE_BLOCK_CHARS = 600;
const MAX_SECTION_CODE_CHARS = 1800;

const clean = (text) =>
  (text || '')
    .replace(/\u200b|\u00ad/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const hasSkippedClass = (el) => {
  const classes = el.attribs?.class;

  return Boolean(classes) && SKIPPED_CLASSES.some((name) => classes.split(/\s+/).includes(name));
};

/**
 * Walks a rendered page in document order and splits it at every heading.
 * A heading without an id belongs to the nearest anchor above it, so its
 * result still links to a place close to the text.
 */
function splitIntoSections($, root) {
  const sections = [{ heading: null, level: 0, anchor: '', parts: [], code: [] }];
  let current = sections[0];
  let lastAnchor = '';

  const walk = (node) => {
    if (node.type === 'text') {
      current.parts.push(node.data);

      return;
    }
    if (node.type !== 'tag') return;

    const tag = node.name;

    if (SKIPPED_TAGS.has(tag) || hasSkippedClass(node) || 'data-search-ignore' in node.attribs) return;

    // "note", "tip" and the like label the box, they are not part of the text.
    if (/\badmonition-heading\b/.test(node.attribs.class || '')) {
      if (ADMONITION_LABELS.has(clean($(node).text()).toLowerCase())) return;
    }

    if (tag === 'pre') {
      const code = clean($(node).text()).slice(0, MAX_CODE_BLOCK_CHARS);

      if (code) current.code.push(code);

      return;
    }

    if (HEADINGS.has(tag)) {
      const heading = $(node).clone();

      heading.find('.hash-link, button, svg').remove();

      const text = clean(heading.text());

      if (!text) return;
      if (node.attribs.id) lastAnchor = node.attribs.id;

      current = { heading: text, level: Number(tag[1]), anchor: lastAnchor, parts: [], code: [] };
      sections.push(current);

      return;
    }

    const isBlock = BLOCK_TAGS.has(tag) || (tag === 'a' && /\bbutton\b/.test(node.attribs.class || ''));

    if (isBlock) current.parts.push('\n');
    node.children.forEach(walk);
    if (isBlock) current.parts.push('\n');
  };

  walk(root);

  return sections.map(({ parts, code, ...section }) => ({
    ...section,
    text: clean(parts.join('')).slice(0, MAX_SECTION_CHARS),
    code: code.join(' \n ').slice(0, MAX_SECTION_CODE_CHARS),
  }));
}

const kindOfRoute = (route) => {
  if (route.startsWith('/api/changelog/')) return 'changelog';
  if (route.startsWith('/api/')) return 'api';

  return 'docs';
};

/**
 * Reads one built page. Returns null for anything that is not content:
 * redirect stubs, listings, pages marked noindex.
 */
function readHtmlPage(html, route, siteTitle) {
  const $ = cheerio.load(html);

  if ($('meta[http-equiv="refresh"]').length) return null;
  if (/noindex/i.test($('meta[name="robots"]').attr('content') || '')) return null;

  const root = $('.theme-doc-markdown').get(0) || $('article').get(0) || $('main').get(0);

  if (!root) return null;

  const sections = splitIntoSections($, root);
  const metaTitle = clean($('title').first().text()).replace(new RegExp(`\\s*\\|\\s*${siteTitle}$`), '');
  const h1 = sections.find((section) => section.level === 1);
  const title = h1?.heading || metaTitle;

  if (!title) return null;

  // Sidebar position of the page, e.g. Integrations > Webhooks.
  const breadcrumbs = $('.menu__link--active')
    .map((_, el) => clean($(el).text()))
    .get()
    .slice(0, -1) // the page itself
    .filter((label) => label && label !== title);

  // "Overview" says nothing without its section: name the page after both.
  const displayTitle =
    GENERIC_TITLES.has(title.toLowerCase()) && breadcrumbs.length
      ? `${breadcrumbs[breadcrumbs.length - 1]} ${title}`
      : title;

  const description = clean($('meta[name="description"]').attr('content'));
  const records = [];
  const parents = [];

  // Text above the first heading and under the h1 both describe the page itself.
  const lead = sections.filter((section) => section.level <= 1);
  const intro = lead
    .map((section) => section.text)
    .filter(Boolean)
    .join(' ');

  // The URL names the page too, often better than its title
  // (/docs/portals/customer-portal/ is titled "Overview"). The landing page
  // of a section (/docs/sdk/overview/) is named after the section.
  const segments = route.split('/').filter(Boolean);
  const isLanding = GENERIC_TITLES.has((segments[segments.length - 1] || '').replace(/-/g, ' '));
  const slug = (isLanding ? segments[segments.length - 2] : segments[segments.length - 1]) || '';

  records.push({
    heading: null,
    anchor: '',
    parents: [],
    keys: slug.replace(/[-_]/g, ' '),
    text: intro || description,
    code: lead
      .map((section) => section.code)
      .filter(Boolean)
      .join(' \n '),
  });

  for (const section of sections) {
    if (section.level <= 1) continue;

    while (parents.length && parents[parents.length - 1].level >= section.level) parents.pop();

    records.push({
      heading: section.heading,
      anchor: section.anchor,
      parents: parents.map((parent) => parent.heading),
      text: section.text,
      code: section.code,
    });
    parents.push(section);
  }

  return {
    page: { url: route, title: displayTitle, kind: kindOfRoute(route), breadcrumbs },
    // A heading with nothing under it is still a valid target.
    sections: records.filter((record, index) => index === 0 || record.heading),
  };
}

const markdownToText = (markdown) =>
  clean(
    (markdown || '')
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/^\s*(#{1,6}|>|[-*+]|\d+\.)\s+/gm, '')
      .replace(/[*_`|]/g, ' '),
  );

/**
 * Mirrors Redoc's anchor ids, so a result opens the API page scrolled to the
 * operation: `#tag/<tag>/operation/<operationId>`.
 */
const operationAnchor = (tag, operationId, apiPath, method) => {
  const prefix = tag ? `tag/${tag.replace(/\s/g, '-')}/` : '';

  if (operationId) return `${prefix}operation/${operationId}`;

  return `${prefix}paths/${apiPath.replace(/~/g, '~0').replace(/\//g, '~1')}/${method}`;
};

/**
 * Turns an OpenAPI document into one page (the API) and one section per
 * operation. The endpoint and operationId go into `keys`, which the search
 * engine weights like a title: developers search for both.
 */
function readOpenApiSpec(spec, { routePath, title }) {
  const url = routePath.endsWith('/') ? routePath : `${routePath}/`;
  const sections = [
    {
      heading: null,
      anchor: '',
      parents: [],
      text: markdownToText(spec.info?.description).slice(0, MAX_API_DESCRIPTION_CHARS),
    },
  ];

  for (const tag of spec.tags || []) {
    const text = markdownToText(tag.description);

    if (!tag.name || !text) continue;

    sections.push({
      heading: tag['x-displayName'] || tag.name,
      anchor: `tag/${tag.name.replace(/\s/g, '-')}`,
      parents: [],
      text: text.slice(0, MAX_API_DESCRIPTION_CHARS),
    });
  }

  for (const [apiPath, pathItem] of Object.entries(spec.paths || {})) {
    for (const method of HTTP_METHODS) {
      const operation = pathItem?.[method];

      if (!operation || operation['x-internal']) continue;

      const tag = operation.tags?.[0];
      const endpoint = `${method.toUpperCase()} ${apiPath}`;
      const parameters = [...(pathItem.parameters || []), ...(operation.parameters || [])]
        .map((parameter) => parameter?.name)
        .filter(Boolean);
      const description = markdownToText(operation.description).slice(0, MAX_API_DESCRIPTION_CHARS);

      sections.push({
        heading: clean(operation.summary) || operation.operationId || endpoint,
        anchor: operationAnchor(tag, operation.operationId, apiPath, method),
        parents: tag ? [tag] : [],
        keys: [operation.operationId, endpoint].filter(Boolean).join(' '),
        endpoint,
        deprecated: operation.deprecated || undefined,
        text: [description, parameters.length ? `Parameters: ${[...new Set(parameters)].join(', ')}` : '']
          .filter(Boolean)
          .join(' '),
      });
    }
  }

  return { page: { url, title: title || spec.info?.title, kind: 'api', breadcrumbs: ['REST API'] }, sections };
}

async function fetchSpec(specUrl, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(specUrl, { signal: controller.signal });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    return yaml.parse(await response.text());
  } finally {
    clearTimeout(timer);
  }
}

async function mapWithConcurrency(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const index = next++;

        results[index] = await fn(items[index]);
      }
    }),
  );

  return results;
}

/**
 * Builds the search index for a built site.
 *
 * @param {object} options
 * @param {string} options.outDir Build output directory
 * @param {string[]} options.routesPaths Every route of the site
 * @param {string} options.baseUrl Site base URL
 * @param {string} options.siteTitle Site title, stripped from page titles
 * @param {{routePath: string, specUrl: string, layout?: {title?: string}}[]} options.specs API reference pages
 * @param {(route: string) => boolean} options.exclude Routes left out of the index
 * @param {(route: string) => number} options.weightOf Ranking weight of a page, 1 by default
 */
async function buildSearchIndex({
  outDir,
  routesPaths,
  baseUrl,
  siteTitle,
  specs = [],
  exclude,
  weightOf = () => 1,
  log = console.warn,
}) {
  const pages = [];
  const sections = [];
  const add = (entry) => {
    const pageIndex = pages.length;

    const weight = weightOf(entry.page.url);
    const page = [entry.page.url, entry.page.title, entry.page.kind, entry.page.breadcrumbs];

    if (weight !== 1) page.push(weight);
    pages.push(page);

    for (const section of entry.sections) {
      const extra = {};

      if (section.code) extra.c = section.code;
      if (section.keys) extra.k = section.keys;
      if (section.endpoint) extra.e = section.endpoint;
      if (section.deprecated) extra.d = 1;

      const record = [pageIndex, section.heading || '', section.anchor || '', section.parents, section.text || ''];

      if (Object.keys(extra).length) record.push(extra);
      sections.push(record);
    }
  };

  const apiRoutes = new Set(specs.map((spec) => spec.routePath.replace(/\/$/, '')));
  const routes = [...new Set(routesPaths)]
    .filter((route) => route.startsWith(baseUrl))
    .map((route) => `/${route.slice(baseUrl.length)}`)
    .filter((route) => !apiRoutes.has(route.replace(/\/$/, '')) && !exclude(route))
    .sort();

  for (const route of routes) {
    const file = path.join(outDir, route, 'index.html');

    if (!(await fs.pathExists(file))) continue;

    const entry = readHtmlPage(await fs.readFile(file, 'utf-8'), route.endsWith('/') ? route : `${route}/`, siteTitle);

    if (entry) add(entry);
  }

  const failed = [];
  const apiEntries = await mapWithConcurrency(specs, 8, async (spec) => {
    try {
      return readOpenApiSpec(await fetchSpec(spec.specUrl, 20000), {
        routePath: spec.routePath,
        title: spec.layout?.title,
      });
    } catch (error) {
      failed.push(`${spec.specUrl} (${error.message})`);

      // The API stays findable by name even when its spec cannot be read.
      return readOpenApiSpec({}, { routePath: spec.routePath, title: spec.layout?.title });
    }
  });

  apiEntries.forEach(add);

  if (failed.length) log(`Could not index operations of ${failed.length} API spec(s): ${failed.join(', ')}`);

  return { version: 1, pages, sections };
}

module.exports = { buildSearchIndex, readHtmlPage, readOpenApiSpec };
