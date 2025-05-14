/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Orignally copied as per https://github.com/facebook/docusaurus/discussions/10882
 */

const path = require('path');
const semver = require('semver');

const pluginContentBlog = require('@docusaurus/plugin-content-blog');
const { aliasedSitePath, docuHash, normalizeUrl } = require('@docusaurus/utils');
const fs = require('fs-extra');
const Joi = require('joi');

// If you ever consider adding the date to the post (which we might), then also consider
// Looking back at the details of the link above to the GitHub Discussion and linked
// source code from which this plugin was derrived.
// It included an approach to allow for multiple postings per day by incrementing the hour
// to maintain correct and intended order of items.

/**
 * @param {string} section
 * @param {string} routeBasePath
 */
function processSection(section, routeBasePath) {
  // Match '# ...' at the start of the section or after a newline
  const titleMatch = section.match(/^(# .*)|\n# .*/);
  const title = titleMatch ? titleMatch[0].replace('\n', '').replace('# ', '').trim() : null;
  if (!title) {
    return null;
  }
  const content = section.replace(/^(# .*)|\n# .*/, '').trim();

  const apiRoutesAndMethods = (content.match(/^## (.*)/gm) || [])
    .map((h) => `\`${h.replace(/^## /, '')}\``)
    .join('  \n');

  // Clean version for slug (remove date, spaces, etc)
  const versionSlug = title.replace(/\s.*$/, '');
  const slug = `${routeBasePath.replace(/\/$/, '')}/${versionSlug}`;

  return {
    title: title.replace(/ \(.*\)/, ''),
    content: `---
title: ${title.replace(/ \(.*\)/, '')}
slug: ${slug}
---

# ${title.replace(/ \(.*\)/, '')}

Changes to...

${apiRoutesAndMethods}

<!-- truncate -->

${content}`,
  };
}

/**
 * Docusaurus Changelog Plugin
 *
 * This plugin processes a single changelog markdown file (specified by options.changelogFilename) for a specific API.
 * It splits the changelog into versioned sections, generates individual markdown files with YAML frontmatter for each version,
 * and outputs them to a dedicated directory for that API. The plugin then delegates to the Docusaurus blog plugin to handle
 * rendering and routing, ensuring each API's changelog is isolated and only APIs with changelogs are included.
 *
 * Key features:
 * - Only processes the changelog file specified in options.changelogFilename (one per plugin instance)
 * - Splits changelog into versioned sections and generates output files with frontmatter
 * - Ensures correct output structure and avoids duplicate React import/build errors
 * - Integrates with Docusaurus blog plugin for rendering and navigation
 *
 * @param {import('@docusaurus/types').LoadContext} context - Docusaurus site context
 * @param {object} options - Plugin options (must include changelogFilename, id, and routeBasePath)
 * @returns {import('@docusaurus/types').Plugin}
 */
async function ChangelogPlugin(context, options) {
  const changelogsDir = path.join(__dirname, '../../../changelog-processing');
  const changelogOutputRoot = path.join(context.siteDir, 'changelog');
  const blogPlugin = await pluginContentBlog.default(context, {
    ...options,
    path: path.join(changelogOutputRoot, `changelog-${options.id}`), // Not used for writing, but required by plugin
    blogListComponent: '@theme/ChangelogList',
    blogPostComponent: '@theme/ChangelogPage',
  });

  return {
    ...blogPlugin,
    name: 'changelog-plugin',
    /**
     * Loads and processes the changelog for a single API instance.
     *
     * - Reads the changelog markdown file specified by options.changelogFilename.
     * - Splits the file into versioned sections and generates individual markdown files with YAML frontmatter for each version.
     * - Writes the generated files to a dedicated output directory for this API.
     * - Delegates to the Docusaurus blog plugin for further processing and rendering.
     * - Ensures only APIs with changelogs are included and avoids duplicate processing/build errors.
     *
     * @returns {Promise<object>} The content object as expected by the Docusaurus blog plugin.
     */
    async loadContent() {
      // === Changelog Processing Start ===
      // Only process the changelog file specified in options.changelogFilename
      // This ensures each plugin instance is isolated to its own changelog file and output directory.
      if (!options.changelogFilename) {
        throw new Error('Changelog plugin requires options.changelogFilename to be set');
      }

      const filePath = options.changelogFilename;
      const baseName = path.basename(filePath, '.md');
      // Output directory for this changelog's generated markdown files (no 'source' subdir)
      const outputDir = path.join(changelogOutputRoot, `changelog-${baseName}`);
      await fs.ensureDir(outputDir);

      const fileContent = await fs.readFile(filePath, 'utf-8');

      // Split the file into sections, each starting with a version heading (# <version> ) - This could later include the date.
      // Note: The regex below expects headings to start with a single # followed by a space and a digit (e.g., # 1.0.0)
      let versionSections = fileContent.split(/(?=^# [0-9])/m).filter((s) => s.match(/^# [0-9]/m));

      // This didn't effect the order. Think it must only be date based.
      // Found a newer version of docusarus (above 3) has custom sorting, while this version (fixed at beta of 2) does not.
      // // Sort sections by version (descending)
      // versionSections.sort((a, b) => {
      //   const getVersion = (section) => {
      //     const m = section.match(/^# ([0-9]+\.[0-9]+\.[0-9]+)/m);
      //     return m ? m[1] : '0.0.0';
      //   };
      //   return semver.rcompare(getVersion(a), getVersion(b));
      // });

      let allSections = [];
      // Process each version section in parallel and write to output
      await Promise.all(
        versionSections.map(async (section) => {
          // Parse the section for title and content, including YAML frontmatter
          const processed = processSection(section, options.routeBasePath);
          if (!processed) return;

          const { title, content } = processed;
          // Write the processed markdown to the output directory
          const outPath = path.join(outputDir, `${title}.md`);
          await fs.outputFile(outPath, content);
          allSections.push({
            title,
            content,
            outputPath: outPath,
          });
        }),
      );

      // === Docusaurus Blog Plugin Integration ===
      // Let the wrapped blog plugin handle the rest of the content loading
      const content = await blogPlugin.loadContent();
      // Patch blog post metadata for correct list page links
      content.blogPosts.forEach((post, index) => {
        const pageIndex = Math.floor(index / options.postsPerPage);
        post.metadata.listPageLink = normalizeUrl([
          context.baseUrl,
          options.routeBasePath,
          pageIndex === 0 ? '/' : `/page/${pageIndex + 1}`,
        ]);
      });

      return content;
    },
    configureWebpack(...args) {
      const config = blogPlugin.configureWebpack(...args);
      const pluginDataDirRoot = path.join(
        context.generatedFilesDir,
        'changelog-plugin',
        options.id, // Use the dynamically provided id
      );
      // Redirect the metadata path to the correct folder
      config.module.rules[0].use[1].options.metadataPath = (mdxPath) => {
        // Note that metadataPath must be the same/in-sync as
        // the path from createData for each MDX.
        const aliasedPath = aliasedSitePath(mdxPath, context.siteDir);

        return path.join(pluginDataDirRoot, `${docuHash(aliasedPath)}.json`);
      };

      return config;
    },
    getThemePath() {
      return path.resolve(__dirname, './theme'); // Ensure this points to the plugin's theme folder
    },
    getPathsToWatch() {
      // Don't watch the generated dir
      return [changelogsDir];
    },
  };
}

// Call the original blog plugin's validateOptions, then validate our custom option
ChangelogPlugin.validateOptions = (params) => {
  // Remove our custom option before passing to the blog plugin's validation
  const { options, validate } = params;
  const { changelogFilename, ...blogOptions } = options;

  // Validate blog options and get defaults
  const validatedBlogOptions = pluginContentBlog.validateOptions({ ...params, options: blogOptions });

  // Validate our custom changelogFilename option
  const schema = Joi.object({
    changelogFilename: Joi.string().required(),
  });
  validate(schema, { changelogFilename });

  // Merge validated blog options (with defaults) and our custom option
  return { ...validatedBlogOptions, changelogFilename };
};

module.exports = ChangelogPlugin;
