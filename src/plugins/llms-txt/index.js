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
  if (title) {
    result += `# ${title}\n\n`;
  }

  if (frontMatter.description) {
    result += `${frontMatter.description}\n\n`;
  }

  result += cleanedContent;

  return result;
}

/**
 * Recursively collects all doc routes with source file paths.
 */
function collectDocRoutes(routes) {
  const result = [];

  function walk(routeList) {
    for (const route of routeList) {
      if (route.metadata && route.metadata.sourceFilePath) {
        result.push({
          path: route.path,
          sourceFilePath: route.metadata.sourceFilePath,
        });
      }
      if (route.routes) {
        walk(route.routes);
      }
    }
  }

  walk(routes);
  return result;
}

/**
 * Generates the root llms.txt content with a page index.
 */
function generateRootLlmsTxt(siteConfig, items, siteDescription) {
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
      lines.push(`- [${item.title}](${fullUrl}): ${fullUrl}/llms.txt`);
      if (item.description) {
        lines.push(`  ${item.description}`);
      }
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

    async postBuild({ siteConfig, routes, outDir, siteDir }) {
      const docRoutes = collectDocRoutes(routes);

      if (docRoutes.length === 0) {
        console.warn(`[${PLUGIN_NAME}] No doc routes with source files found. Falling back to docs/ directory scan.`);
      }

      // Collect all doc files from the docs/ directory as a reliable source
      const docsDir = path.join(siteDir, 'docs');
      const allDocFiles = [];

      async function scanDir(dir, relativePath = '') {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          const relPath = path.join(relativePath, entry.name);

          if (entry.isDirectory()) {
            await scanDir(fullPath, relPath);
          } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
            allDocFiles.push({ fullPath, relativePath: relPath });
          }
        }
      }

      if (await fs.pathExists(docsDir)) {
        await scanDir(docsDir);
      }

      console.log(`[${PLUGIN_NAME}] Found ${allDocFiles.length} doc files to process.`);

      const items = [];
      let successCount = 0;

      // Generate per-page llms.txt files
      await Promise.all(
        allDocFiles.map(async ({ fullPath, relativePath }) => {
          try {
            const content = await generatePageContent(fullPath);
            if (!content) return;

            const fileContent = await fs.readFile(fullPath, 'utf-8');
            const { data: frontMatter } = matter(fileContent);

            // Determine the URL path for this doc
            // e.g. docs/journeys/journey-builder.md -> /docs/journeys/journey-builder
            let urlPath = relativePath
              .replace(/\.mdx?$/, '')
              .replace(/\\/g, '/');

            // Handle index files (intro.md or index.md at directory level)
            if (urlPath.endsWith('/intro')) {
              // Keep as-is, Docusaurus maps these to the directory path or /intro
            }

            const docPath = `/docs/${urlPath}`;

            // Write llms.txt for this page
            const outputDir = path.join(outDir, docPath);
            const outputPath = path.join(outputDir, 'llms.txt');

            await fs.ensureDir(outputDir);
            await fs.writeFile(outputPath, content, 'utf-8');
            successCount++;

            // Collect metadata for root index
            const title = frontMatter.title || frontMatter.sidebar_label || urlPath.split('/').pop();
            items.push({
              path: docPath,
              title,
              description: frontMatter.description,
            });
          } catch (err) {
            console.error(`[${PLUGIN_NAME}] Failed to process ${relativePath}:`, err.message);
          }
        }),
      );

      console.log(`[${PLUGIN_NAME}] Generated ${successCount} per-page llms.txt files.`);

      // Sort items by path
      items.sort((a, b) => a.path.localeCompare(b.path));

      // Generate root llms.txt
      try {
        const rootContent = generateRootLlmsTxt(siteConfig, items, siteDescription);
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

        for (const { fullPath, relativePath } of allDocFiles.sort((a, b) => a.relativePath.localeCompare(b.relativePath))) {
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
