/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const fs = require('fs-extra');
const matter = require('gray-matter');

const PLUGIN_NAME = 'docusaurus-plugin-llms-txt';

/**
 * Cleans the prose of an MDX document: removes imports/exports, JSX
 * components and expressions, converts admonitions to blockquotes and simple
 * HTML (spacer paragraphs, headings, paragraphs, images) to markdown.
 * Inline code spans are left untouched.
 */
function cleanProse(prose) {
  const codeSpans = [];
  let cleaned = prose.replace(/`[^`\n]+`/g, (span) => {
    codeSpans.push(span);

    return `\u0000${codeSpans.length - 1}\u0000`;
  });

  // Remove import and export statements
  cleaned = cleaned.replace(/^import\s+.*?(?:from\s+)?['"].*?['"];?\s*$/gm, '');
  cleaned = cleaned.replace(/^export\s+(?:default\s+)?.*?;?\s*$/gm, '');

  // Remove JSX components (self-closing, with content, and leftover tags)
  cleaned = cleaned.replace(/<[A-Z][a-zA-Z0-9]*\s*[^>]*\/>/g, '');
  cleaned = cleaned.replace(/<[A-Z][a-zA-Z0-9]*[^>]*>[\s\S]*?<\/[A-Z][a-zA-Z0-9]*>/g, '');
  cleaned = cleaned.replace(/<[A-Z][a-zA-Z0-9]*[^>]*>/g, '');
  cleaned = cleaned.replace(/<\/[A-Z][a-zA-Z0-9]*>/g, '');

  // Remove single-line MDX expressions {expression}
  cleaned = cleaned.replace(/\{[^{}\n]+\}/g, '');

  // Simple HTML to markdown
  cleaned = cleaned.replace(/^[ \t]*<p>(?:&nbsp;|\s)*<\/p>[ \t]*$/gm, '');
  cleaned = cleaned.replace(/<img\b[^>]*>/g, (tag) => {
    const src = tag.match(/\ssrc="([^"]+)"/)?.[1];
    const alt = tag.match(/\salt="([^"]*)"/)?.[1] || '';

    return src ? `![${alt}](${src})` : '';
  });
  cleaned = cleaned.replace(
    /^[ \t]*<h([1-6])[^>]*>(.*?)<\/h\1>[ \t]*$/gm,
    (_, level, text) => `${'#'.repeat(Number(level))} ${text.trim()}`,
  );
  cleaned = cleaned.replace(/^[ \t]*<p[^>]*>(.*?)<\/p>[ \t]*$/gm, '$1');

  // Clean up Docusaurus admonitions - convert to blockquotes
  cleaned = cleaned.replace(/^:::\s*(note|tip|info|warning|danger|caution)(?:\s+(.+?))?$/gm, (_, type, title) => {
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

    return title ? `> **${capitalizedType}: ${title}**` : `> **${capitalizedType}**`;
  });
  cleaned = cleaned.replace(/^:::$/gm, '');

  // Remove HTML comments
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');

  // eslint-disable-next-line no-control-regex
  return cleaned.replace(/\u0000(\d+)\u0000/g, (_, index) => codeSpans[Number(index)]);
}

/**
 * Cleans markdown content for LLM consumption. MDX-specific syntax is only
 * removed from prose: fenced code blocks are kept verbatim, so code samples
 * keep their imports, JSX and JSON objects.
 */
function cleanMarkdownForLlm(content) {
  const output = [];
  let prose = [];
  let fence = null;

  for (const line of content.split('\n')) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/)?.[1];

    if (fence) {
      output.push(line);
      if (marker && marker[0] === fence[0] && marker.length >= fence.length && line.trim() === marker) fence = null;
    } else if (marker) {
      output.push(cleanProse(prose.join('\n')));
      prose = [];
      output.push(line);
      fence = marker;
    } else {
      prose.push(line);
    }
  }
  output.push(cleanProse(prose.join('\n')));

  // Remove multiple consecutive blank lines (keep max 2)
  return output
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Generates plain markdown content from a source file: the page's H1 (its own
 * or the frontmatter title), then the frontmatter description, then the body.
 */
async function generatePageContent(filePath) {
  if (!(await fs.pathExists(filePath))) {
    return null;
  }

  const fileContent = await fs.readFile(filePath, 'utf-8');
  const { data: frontMatter, content } = matter(fileContent);
  let body = cleanMarkdownForLlm(content);

  let heading = '';
  if (/^#\s/.test(body)) {
    [heading] = body.split('\n', 1);
    body = body.slice(heading.length).trim();
  } else if (frontMatter.title || frontMatter.sidebar_label) {
    heading = `# ${frontMatter.title || frontMatter.sidebar_label}`;
  }

  return [heading, frontMatter.description, body].filter(Boolean).join('\n\n');
}

// Docusaurus strips number prefixes like "1-entities" from path segments.
const stripNumberPrefix = (segment) => segment.replace(/^\d+[-_.]+/, '');

/**
 * Resolves the actual Docusaurus route for a doc source file, mirroring the
 * docs plugin's slug rules: frontmatter `slug` wins (absolute slugs are
 * relative to the docs base), `index`/`README` files map to their directory,
 * and number prefixes are stripped from every path segment.
 */
function resolveDocRoute(relativePath, frontMatter) {
  const posixPath = relativePath.replace(/\\/g, '/').replace(/\.mdx?$/, '');
  const segments = posixPath.split('/').map(stripNumberPrefix);
  const baseName = segments[segments.length - 1];
  const dirSegments = segments.slice(0, -1);

  const slug = frontMatter.slug;
  if (typeof slug === 'string' && slug.length > 0) {
    if (slug.startsWith('/')) {
      return `/docs${slug === '/' ? '' : slug}`.replace(/\/$/, '') || '/docs';
    }

    return ['/docs', ...dirSegments, slug].join('/');
  }

  if (/^(index|readme)$/i.test(baseName)) {
    return ['/docs', ...dirSegments].join('/').replace(/\/$/, '') || '/docs';
  }

  return ['/docs', ...segments].join('/');
}

/**
 * Scans the docs/ directory and resolves each source file to its route.
 */
async function collectDocs(siteDir) {
  const docsDir = path.join(siteDir, 'docs');
  const files = [];

  async function scanDir(dir, relativePath = '') {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.join(relativePath, entry.name);

      if (entry.isDirectory()) {
        await scanDir(fullPath, relPath);
      } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
        files.push({ fullPath, relativePath: relPath });
      }
    }
  }

  if (await fs.pathExists(docsDir)) {
    await scanDir(docsDir);
  }

  const docs = [];
  for (const { fullPath, relativePath } of files) {
    try {
      const { data: frontMatter } = matter(await fs.readFile(fullPath, 'utf-8'));
      docs.push({ fullPath, relativePath, frontMatter, route: resolveDocRoute(relativePath, frontMatter) });
    } catch (err) {
      console.error(`[${PLUGIN_NAME}] Failed to parse ${relativePath}:`, err.message);
    }
  }

  return docs;
}

/** Title as shown on the page: frontmatter title, else the page's own H1, else its URL segment. */
const docTitle = (doc, content) =>
  doc.frontMatter.title ||
  doc.frontMatter.sidebar_label ||
  content.match(/^#\s+(.+)$/m)?.[1].trim() ||
  doc.route.split('/').pop();

const HTML_ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

function decodeHtmlEntities(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
    if (entity[0] === '#') {
      const code = entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);

      return String.fromCodePoint(code);
    }

    return HTML_ENTITIES[entity.toLowerCase()] ?? match;
  });
}

/**
 * Reads the meta description Docusaurus rendered for a page: the frontmatter
 * `description`, or else its own excerpt of the first paragraph. Excerpts that
 * are only a link row ("[API Docs] [SDK]"), a list item or whitespace are
 * dropped rather than shown as a description.
 */
async function readBuiltDescription(htmlPath) {
  const html = await fs.readFile(htmlPath, 'utf-8');
  const match = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/);
  if (!match) return undefined;

  const description = decodeHtmlEntities(match[1]).replace(/\s+/g, ' ').trim();
  if (description.length < 30 || /^(\[|- |\* )/.test(description) || /^@[\w/.-]+$/.test(description)) return undefined;

  return description;
}

/**
 * Reads the label and position of a top-level docs section from its
 * _category_.json / _category_.yml, as shown in the sidebar.
 */
async function readCategory(siteDir, section) {
  const dir = path.join(siteDir, 'docs', section);
  for (const name of ['_category_.json', '_category_.yml', '_category_.yaml']) {
    const file = path.join(dir, name);
    if (!(await fs.pathExists(file))) continue;

    const raw = await fs.readFile(file, 'utf-8');
    if (name.endsWith('.json')) {
      const { label, position } = JSON.parse(raw);

      return { label, position };
    }

    const label = raw.match(/^label:\s*['"]?(.+?)['"]?\s*$/m)?.[1];
    const position = raw.match(/^position:\s*(\d+)/m)?.[1];

    return { label, position: position === undefined ? undefined : Number(position) };
  }

  return {};
}

/**
 * Groups doc items by their top-level docs section (/docs/<section>/...),
 * ordered like the sidebar. Single top-level pages such as /docs/intro form
 * their own section named after the page.
 */
async function groupBySection(siteDir, items) {
  const sections = new Map();

  for (const item of items) {
    const key = item.path.split('/').filter(Boolean)[1] || '';
    if (!sections.has(key)) sections.set(key, { key, items: [] });
    sections.get(key).items.push(item);
  }

  for (const section of sections.values()) {
    const { label, position } = await readCategory(siteDir, section.key);
    const isSinglePage = section.items.length === 1 && section.items[0].path === `/docs/${section.key}`;
    section.label = label || (isSinglePage ? section.items[0].title : section.key);
    // The docs landing page always comes first.
    section.position = section.key === 'intro' ? -1 : position ?? Number.MAX_SAFE_INTEGER;
  }

  return [...sections.values()].sort((a, b) => a.position - b.position || a.label.localeCompare(b.label));
}

/**
 * Loads the OpenAPI spec list from redoc.config.js for the llms.txt APIs section.
 */
function loadApiSpecs(siteDir) {
  try {
    // eslint-disable-next-line import/no-dynamic-require
    const { specs } = require(path.join(siteDir, 'redoc.config.js'));

    return specs.map((spec) => ({
      title: spec.layout.title,
      routePath: spec.routePath,
      specUrl: spec.specUrl,
    }));
  } catch (err) {
    console.warn(`[${PLUGIN_NAME}] Could not load redoc.config.js:`, err.message);

    return [];
  }
}

const formatSize = (bytes) =>
  bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(bytes / 1024)} KB`;

/**
 * Generates the root llms.txt following https://llmstxt.org/: H1 title,
 * blockquote summary, free-form details, then H2 sections of
 * "- [Title](url): description" links, ending with an "Optional" section.
 */
function generateRootLlmsTxt({ siteConfig, pageUrl, sections, siteSummary, siteDescription, apiSpecs, docSets }) {
  const siteUrl = siteConfig.url;
  const lines = [];

  lines.push(`# ${siteConfig.title}`);
  lines.push('');

  const summary = siteSummary || siteConfig.tagline;
  if (summary) {
    lines.push(`> ${summary}`);
    lines.push('');
  }

  if (siteDescription) {
    lines.push(siteDescription);
    lines.push('');
  }

  lines.push('## Instructions for LLM agents');
  lines.push('');
  lines.push(
    '- Every documentation page is available as raw markdown by appending `.md` to its URL without the trailing slash (e.g. `' +
      siteUrl +
      '/docs/intro.md`). The links below point at those markdown versions. Prefer them over the HTML pages.',
  );
  lines.push(
    `- The complete documentation in a single file: ${siteUrl}/llms-full.txt. Smaller per-section files are listed under "Documentation sets".`,
  );
  lines.push(
    '- REST API contracts are published as raw OpenAPI specs (see the APIs section below). Use the spec, not the HTML API reference pages, which render client-side.',
  );
  lines.push(
    '- Official TypeScript SDK: `@epilot/sdk` on npm, plus per-API clients (e.g. `@epilot/entity-client`, `@epilot/pricing-client`). Check the npm registry for current versions instead of relying on memorized ones.',
  );
  lines.push('');

  if (apiSpecs.length > 0) {
    lines.push('## APIs');
    lines.push('');
    for (const spec of apiSpecs) {
      lines.push(
        `- [${spec.title}](${spec.specUrl}): OpenAPI spec. Human-readable reference: ${pageUrl(spec.routePath)}`,
      );
    }
    lines.push('');
  }

  for (const section of sections) {
    lines.push(`## ${section.label}`);
    lines.push('');
    for (const item of section.items) {
      const description = item.description ? `: ${item.description}` : '';
      lines.push(`- [${item.title}](${siteUrl}${item.path}.md)${description}`);
    }
    lines.push('');
  }

  lines.push('## Documentation sets');
  lines.push('');
  for (const set of docSets) {
    lines.push(`- [${set.title}](${set.url}): ${set.description} (${formatSize(set.bytes)})`);
  }
  lines.push('');

  lines.push('## Optional');
  lines.push('');
  lines.push(
    `- [API Changelog](${pageUrl(
      '/api/changelog',
    )}): Breaking changes, new features, and significant updates to epilot APIs, newest first. Also available as RSS at ${siteUrl}/api/changelog/rss.xml`,
  );
  lines.push(
    `- [API discovery document](${siteUrl}/openapi-specs/apis.json): Machine-readable list of every epilot API with its OpenAPI spec URL and base URL.`,
  );
  lines.push('');

  return lines.join('\n');
}

/**
 * Builds an llms-full style document: a header, then each page with its
 * canonical Source URL, separated by horizontal rules.
 */
function generateFullText(heading, intro, pages) {
  const lines = [`# ${heading}`, ''];
  if (intro) lines.push(intro, '');
  lines.push('---', '');

  for (const { url, content } of pages) {
    // Put the Source line right below the page's H1 (generatePageContent
    // always starts the page with one when the page has a title).
    const [firstLine, ...rest] = content.split('\n');
    if (/^#\s/.test(firstLine)) {
      lines.push(firstLine, '', `Source: ${url}`, ...rest);
    } else {
      lines.push(`Source: ${url}`, '', content);
    }
    lines.push('', '---', '');
  }

  return lines.join('\n');
}

/**
 * @param {import('@docusaurus/types').LoadContext} context
 * @param {object} options
 */
module.exports = function pluginLlmsTxt(_context, options = {}) {
  const { siteSummary, siteDescription } = options;

  return {
    name: PLUGIN_NAME,

    async postBuild({ siteConfig, outDir, siteDir }) {
      const allDocs = await collectDocs(siteDir);
      const siteUrl = siteConfig.url;
      // Canonical page URL, matching the site's trailingSlash setting.
      const pageUrl = (route) => `${siteUrl}${route}${siteConfig.trailingSlash && !route.endsWith('/') ? '/' : ''}`;

      console.log(`[${PLUGIN_NAME}] Found ${allDocs.length} doc files to process.`);

      const pages = [];
      let unresolvedCount = 0;

      // Generate per-page markdown (.md) and legacy llms.txt files
      await Promise.all(
        allDocs.map(async (doc) => {
          try {
            const content = await generatePageContent(doc.fullPath);
            if (!content) return;

            // Only emit for routes that exist in the build output, so llms.txt
            // never links to pages that 404.
            const routeDir = path.join(outDir, doc.route);
            const htmlPath = path.join(routeDir, 'index.html');
            if (!(await fs.pathExists(htmlPath))) {
              unresolvedCount++;
              console.warn(`[${PLUGIN_NAME}] No built page for ${doc.relativePath} at ${doc.route}, skipping.`);

              return;
            }

            // Raw markdown at the parallel .md URL (industry convention)
            await fs.writeFile(`${routeDir}.md`, content, 'utf-8');

            // Legacy per-page llms.txt location, kept for existing consumers
            await fs.writeFile(path.join(routeDir, 'llms.txt'), content, 'utf-8');

            pages.push({
              path: doc.route,
              url: pageUrl(doc.route),
              title: docTitle(doc, content),
              description: await readBuiltDescription(htmlPath),
              content,
            });
          } catch (err) {
            console.error(`[${PLUGIN_NAME}] Failed to process ${doc.relativePath}:`, err.message);
          }
        }),
      );

      console.log(
        `[${PLUGIN_NAME}] Generated ${pages.length} per-page .md/llms.txt files` +
          (unresolvedCount ? ` (${unresolvedCount} files had no matching route).` : '.'),
      );

      pages.sort((a, b) => a.path.localeCompare(b.path));
      const sections = await groupBySection(siteDir, pages);

      // llms-full.txt with every page, plus one file per multi-page section
      const docSets = [];
      const writeFullText = async (relativePath, title, description, heading, intro, sectionPages) => {
        const text = generateFullText(heading, intro, sectionPages);
        await fs.outputFile(path.join(outDir, relativePath), text, 'utf-8');
        docSets.push({ title, description, url: `${siteUrl}/${relativePath}`, bytes: Buffer.byteLength(text) });
      };

      await writeFullText(
        'llms-full.txt',
        'Complete documentation',
        'Every documentation page in one markdown file.',
        `${siteConfig.title} - Complete Documentation`,
        siteSummary || siteConfig.tagline,
        pages,
      );
      for (const section of sections) {
        if (section.items.length < 2) continue;
        await writeFullText(
          `docs/${section.key}/llms-full.txt`,
          section.label,
          `All ${section.items.length} pages of the ${section.label} section in one markdown file.`,
          `${siteConfig.title} - ${section.label}`,
          undefined,
          section.items,
        );
      }
      console.log(`[${PLUGIN_NAME}] Generated llms-full.txt and ${docSets.length - 1} per-section files.`);

      const rootContent = generateRootLlmsTxt({
        siteConfig,
        pageUrl,
        sections,
        siteSummary,
        siteDescription,
        apiSpecs: loadApiSpecs(siteDir),
        docSets,
      });
      await fs.writeFile(path.join(outDir, 'llms.txt'), rootContent, 'utf-8');
      console.log(
        `[${PLUGIN_NAME}] Generated root llms.txt with ${pages.length} entries in ${sections.length} sections.`,
      );
    },
  };
};
