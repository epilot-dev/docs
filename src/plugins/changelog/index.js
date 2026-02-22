/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const pluginContentBlog = require('@docusaurus/plugin-content-blog');
const { aliasedSitePath, docuHash, normalizeUrl } = require('@docusaurus/utils');
const fs = require('fs-extra');
const Joi = require('joi');

/**
 * @param {string} section
 * @param {string} routeBasePath
 * @param {Record<string, number>} dateHourMap - tracks hours per date for unique timestamps
 */
function processSection(section, routeBasePath, dateHourMap) {
  const titleMatch = section.match(/^## (\d{4}-\d{2}-\d{2})\s+(.+)/);
  if (!titleMatch) return null;

  const date = titleMatch[1];
  const apiName = titleMatch[2].trim();
  const content = section.replace(/^## .*\n?/, '').trim();

  if (!dateHourMap[date]) dateHourMap[date] = 23;
  const hour = dateHourMap[date]--;
  const dateTime = `${date}T${String(hour).padStart(2, '0')}:00:00`;

  const slug = apiName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const fullSlug = `${routeBasePath.replace(/\/$/, '')}/${date}-${slug}`;
  const filename = `${date}-${slug}`;

  const title = `${date} ${apiName}`;

  return {
    title,
    filename,
    content: `---
title: "${title}"
date: ${dateTime}
slug: ${fullSlug}
---

${content}`,
  };
}

/**
 * Docusaurus Changelog Plugin
 *
 * Processes a single CHANGELOG.md with date-based sections (## YYYY-MM-DD API Name)
 * and generates a paginated blog-style changelog with RSS feed.
 *
 * @param {import('@docusaurus/types').LoadContext} context
 * @param {object} options
 * @returns {import('@docusaurus/types').Plugin}
 */
async function ChangelogPlugin(context, options) {
  const changelogOutputDir = path.join(context.siteDir, 'changelog', `changelog-${options.id}`);
  const blogPlugin = await pluginContentBlog.default(context, {
    ...options,
    path: changelogOutputDir,
    blogListComponent: '@theme/ChangelogList',
    blogPostComponent: '@theme/ChangelogPage',
  });

  return {
    ...blogPlugin,
    name: 'changelog-plugin',
    async loadContent() {
      if (!options.changelogFilename) {
        throw new Error('Changelog plugin requires options.changelogFilename to be set');
      }

      await fs.ensureDir(changelogOutputDir);

      const fileContent = await fs.readFile(options.changelogFilename, 'utf-8');

      const sections = fileContent
        .split(/(?=^## \d{4}-\d{2}-\d{2}\s)/m)
        .filter((s) => s.match(/^## \d{4}-\d{2}-\d{2}/m));

      const dateHourMap = {};

      await Promise.all(
        sections.map(async (section) => {
          const processed = processSection(section, options.routeBasePath, dateHourMap);
          if (!processed) return;

          const outPath = path.join(changelogOutputDir, `${processed.filename}.md`);
          await fs.outputFile(outPath, processed.content);
        }),
      );

      const content = await blogPlugin.loadContent();
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
      const pluginDataDirRoot = path.join(context.generatedFilesDir, 'changelog-plugin', options.id);
      config.module.rules[0].use[1].options.metadataPath = (mdxPath) => {
        const aliasedPath = aliasedSitePath(mdxPath, context.siteDir);

        return path.join(pluginDataDirRoot, `${docuHash(aliasedPath)}.json`);
      };

      return config;
    },
    getThemePath() {
      return path.resolve(__dirname, './theme');
    },
    getPathsToWatch() {
      return [options.changelogFilename];
    },
  };
}

ChangelogPlugin.validateOptions = (params) => {
  const { options, validate } = params;
  const { changelogFilename, ...blogOptions } = options;

  const validatedBlogOptions = pluginContentBlog.validateOptions({ ...params, options: blogOptions });

  const schema = Joi.object({
    changelogFilename: Joi.string().required(),
  });
  validate(schema, { changelogFilename });

  return { ...validatedBlogOptions, changelogFilename };
};

module.exports = ChangelogPlugin;
