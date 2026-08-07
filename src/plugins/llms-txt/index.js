/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');

const PLUGIN_NAME = 'docusaurus-plugin-llms-txt';

/**
 * Cleans markdown content for LLM consumption.
 * Removes MDX-specific syntax, JSX components, and other non-standard markdown.
 */
function cleanMarkdownForLlm(content) {
  let cleaned = content;

  // Remove import statements
  cleaned = cleaned.replace(/^import\s+.*?(?:from\s+)?['"].*?['"];?\s*$/gm, '');

  // Remove export statements
  cleaned = cleaned.replace(/^export\s+(?:default\s+)?.*?;?\s*$/gm, '');

  // Remove JSX self-closing components like <Component />
  cleaned = cleaned.replace(/<[A-Z][a-zA-Z0-9]*\s*[^>]*\/>/g, '');

  // Remove JSX opening and closing tags with content
  cleaned = cleaned.replace(/<[A-Z][a-zA-Z0-9]*[^>]*>[\s\S]*?<\/[A-Z][a-zA-Z0-9]*>/g, '');

  // Remove remaining JSX tags
  cleaned = cleaned.replace(/<[A-Z][a-zA-Z0-9]*[^>]*>/g, '');
  cleaned = cleaned.replace(/<\/[A-Z][a-zA-Z0-9]*>/g, '');

  // Remove MDX expressions {expression}
  cleaned = cleaned.replace(/\{[^}]+\}/g, '');

  // Clean up Docusaurus admonitions - convert to blockquotes
  cleaned = cleaned.replace(
    /^:::\s*(note|tip|info|warning|danger|caution)(?:\s+(.+?))?$/gm,
    (_, type, title) => {
      const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
      return title ? `> **${capitalizedType}: ${title}**` : `> **${capitalizedType}**`;
    },
  );
  cleaned = cleaned.replace(/^:::$/gm, '');

  // Remove HTML comments
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');

  // Remove multiple consecutive blank lines (keep max 2)
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned.trim();
}

/**
 * Generates plain text content from a markdown source file.
 */
async function generatePageContent(filePath) {
  if (!(await fs.pathExists(filePath))) {
    return null;
  }

  const fileContent = await fs.readFile(filePath, 'utf-8');
  const { data: frontMatter, content } = matter(fileContent);
  const cleanedContent = cleanMarkdownForLlm(content);

  let result = '';

  const title = frontMatter.title || frontMatter.sidebar_label;
  // Skip the frontmatter title when the body already opens with its own H1.
  if (title && !/^#\s/.test(cleanedContent)) {
    result += `# ${title}\n\n`;
  }

  if (frontMatter.description) {
    result += `${frontMatter.description}\n\n`;
  }

  result += cleanedContent;

  return result;
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

const docTitle = (doc) =>
  doc.frontMatter.title || doc.frontMatter.sidebar_label || doc.route.split('/').pop();

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

/**
 * Generates the root llms.txt content with agent instructions and a page index.
 */
function generateRootLlmsTxt(siteConfig, items, siteDescription, apiSpecs) {
  const siteUrl = siteConfig.url;
  const lines = [];

  lines.push(`# ${siteConfig.title}`);
  lines.push('');

  if (siteDescription) {
    lines.push(siteDescription);
    lines.push('');
  } else if (siteConfig.tagline) {
    lines.push(siteConfig.tagline);
    lines.push('');
  }

  lines.push('## Instructions for LLM agents');
  lines.push('');
  lines.push(
    '- Every documentation page is available as raw markdown by appending `.md` to its URL (e.g. `' +
      siteUrl +
      '/docs/intro.md`). Prefer the markdown version over the HTML page.',
  );
  lines.push(`- The complete documentation in a single file: ${siteUrl}/llms-full.txt`);
  lines.push(
    '- REST API contracts are published as raw OpenAPI 3.0 YAML specs (see the APIs section below). Use the spec, not the HTML API reference pages, which render client-side.',
  );
  lines.push(
    '- Official TypeScript SDK: `@epilot/sdk` on npm, plus per-API clients (e.g. `@epilot/entity-client`, `@epilot/pricing-client`). Check the npm registry for current versions instead of relying on memorized ones.',
  );
  lines.push('');

  if (apiSpecs.length > 0) {
    lines.push('## APIs');
    lines.push('');
    lines.push('Raw OpenAPI 3.0 specifications for every epilot API:');
    lines.push('');
    for (const spec of apiSpecs) {
      lines.push(`- [${spec.title}](${spec.specUrl}): reference at ${siteUrl}${spec.routePath}`);
    }
    lines.push('');
  }

  lines.push('## Documentation Pages');
  lines.push('');

  // Group items by top-level path
  const grouped = new Map();

  for (const item of items) {
    const pathParts = item.path.split('/').filter(Boolean);
    const groupKey = pathParts.length > 1 ? `/${pathParts[0]}/${pathParts[1]}` : `/${pathParts[0] || ''}`;

    if (!grouped.has(groupKey)) {
      grouped.set(groupKey, []);
    }
    grouped.get(groupKey).push(item);
  }

  for (const [groupPath, groupItems] of grouped) {
    lines.push(`### ${groupPath}`);
    lines.push('');

    for (const item of groupItems) {
      const fullUrl = `${siteUrl}${item.path}`;
      const description = item.description ? `: ${item.description}` : '';
      lines.push(`- [${item.title}](${fullUrl}.md)${description}`);
    }
    lines.push('');
  }

  lines.push('---');
  lines.push('');
  lines.push('> This file follows the llms.txt standard. See: https://llmstxt.org/');

  return lines.join('\n');
}

/**
 * @param {import('@docusaurus/types').LoadContext} context
 * @param {object} options
 */
module.exports = function pluginLlmsTxt(context, options = {}) {
  const { siteDescription } = options;

  return {
    name: PLUGIN_NAME,

    async postBuild({ siteConfig, outDir, siteDir }) {
      const allDocs = await collectDocs(siteDir);

      console.log(`[${PLUGIN_NAME}] Found ${allDocs.length} doc files to process.`);

      const items = [];
      let successCount = 0;
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
            if (!(await fs.pathExists(path.join(routeDir, 'index.html')))) {
              unresolvedCount++;
              console.warn(`[${PLUGIN_NAME}] No built page for ${doc.relativePath} at ${doc.route}, skipping.`);
              return;
            }

            // Raw markdown at the parallel .md URL (industry convention)
            await fs.writeFile(`${routeDir}.md`, content, 'utf-8');

            // Legacy per-page llms.txt location, kept for existing consumers
            await fs.writeFile(path.join(routeDir, 'llms.txt'), content, 'utf-8');
            successCount++;

            // Collect metadata for root index
            items.push({
              path: doc.route,
              title: docTitle(doc),
              description: doc.frontMatter.description,
            });
          } catch (err) {
            console.error(`[${PLUGIN_NAME}] Failed to process ${doc.relativePath}:`, err.message);
          }
        }),
      );

      console.log(
        `[${PLUGIN_NAME}] Generated ${successCount} per-page .md/llms.txt files` +
          (unresolvedCount ? ` (${unresolvedCount} files had no matching route).` : '.'),
      );

      // Sort items by path
      items.sort((a, b) => a.path.localeCompare(b.path));

      const apiSpecs = loadApiSpecs(siteDir);

      // Generate root llms.txt
      try {
        const rootContent = generateRootLlmsTxt(siteConfig, items, siteDescription, apiSpecs);
        const rootPath = path.join(outDir, 'llms.txt');
        await fs.writeFile(rootPath, rootContent, 'utf-8');
        console.log(`[${PLUGIN_NAME}] Generated root llms.txt with ${items.length} entries.`);
      } catch (err) {
        console.error(`[${PLUGIN_NAME}] Failed to generate root llms.txt:`, err.message);
        throw err;
      }

      // Generate llms-full.txt with all docs concatenated
      try {
        const fullLines = [];
        fullLines.push(`# ${siteConfig.title} - Complete Documentation`);
        fullLines.push('');

        if (siteDescription) {
          fullLines.push(siteDescription);
        } else if (siteConfig.tagline) {
          fullLines.push(siteConfig.tagline);
        }
        fullLines.push('');
        fullLines.push('---');
        fullLines.push('');

        for (const { fullPath } of allDocs.sort((a, b) => a.relativePath.localeCompare(b.relativePath))) {
          const content = await generatePageContent(fullPath);
          if (content) {
            fullLines.push(content);
            fullLines.push('');
            fullLines.push('---');
            fullLines.push('');
          }
        }

        const fullPath = path.join(outDir, 'llms-full.txt');
        await fs.writeFile(fullPath, fullLines.join('\n'), 'utf-8');
        console.log(`[${PLUGIN_NAME}] Generated llms-full.txt.`);
      } catch (err) {
        console.error(`[${PLUGIN_NAME}] Failed to generate llms-full.txt:`, err.message);
      }
    },
  };
};
