/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const pluginContentBlog = require('@docusaurus/plugin-content-blog');
const { aliasedSitePath, docuHash, normalizeUrl } = require('@docusaurus/utils');
const fs = require('fs-extra');
const Joi = require('joi');

const { describeSection, renderSection, sectionTags } = require('./format');
const { createCoreMatcher } = require('./tiers');

/**
 * @param {string} section
 * @param {string} routeBasePath
 * @param {Record<string, number>} dateHourMap - tracks hours per date for unique timestamps
 * @param {(sectionName: string) => boolean} isCore - whether a section belongs to the core API surface
 */
function processSection(section, routeBasePath, dateHourMap, isCore) {
  const titleMatch = section.match(/^## (\d{4}-\d{2}-\d{2})\s+(.+)/);
  if (!titleMatch) return null;

  const date = titleMatch[1];
  const apiName = titleMatch[2].trim();
  const body = section.replace(/^## .*\n?/, '').trim();
  const content = renderSection(body);
  const description = describeSection(body);
  const core = isCore(apiName);
  // The change type pages (/tags/breaking) list core APIs only, like the default view.
  const tags = core ? sectionTags(body) : [];

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
    core,
    content: `---
title: "${title}"
date: ${dateTime}
slug: ${fullSlug}${tags.length > 0 ? `\ntags: [${tags.join(', ')}]` : ''}${
      description ? `\ndescription: ${JSON.stringify(description)}` : ''
    }
---

${content}`,
  };
}

/**
 * Paginates one view of the changelog. Sets `listPageLink` on each post to the page
 * that lists it; the core view is paginated first, so the "all" view only sets it on
 * the posts the core view does not have.
 *
 * @param {object[]} posts
 * @param {string} viewPath - route of the first page of the view
 * @param {'core' | 'all'} scope
 * @param {{ metadata: object } | undefined} template - a list page of the blog plugin, for the blog metadata
 * @param {number} postsPerPage
 */
function paginate(posts, viewPath, scope, template, postsPerPage) {
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const pagePath = (page) => (page === 0 ? viewPath : normalizeUrl([viewPath, `page/${page + 1}`]));
  const pages = [];

  for (let page = 0; page < totalPages; page += 1) {
    const items = posts.slice(page * postsPerPage, (page + 1) * postsPerPage);
    items.forEach((post) => {
      if (!post.metadata.listPageLink) post.metadata.listPageLink = pagePath(page);
    });

    pages.push({
      metadata: {
        ...(template ? template.metadata : {}),
        permalink: pagePath(page),
        page: page + 1,
        postsPerPage,
        totalPages,
        totalCount: posts.length,
        previousPage: page > 0 ? pagePath(page - 1) : null,
        nextPage: page < totalPages - 1 ? pagePath(page + 1) : null,
        scope,
      },
      items: items.map((post) => post.id),
    });
  }

  return pages;
}

/**
 * Docusaurus Changelog Plugin
 *
 * Processes a single CHANGELOG.md with date-based sections (## YYYY-MM-DD API Name)
 * and generates a paginated blog-style changelog with RSS feed. A section can name
 * several APIs, separated by commas, when one change spans them. The format of the
 * changes inside a section is described in ./format.js.
 *
 * The changelog has two views. The default one (/api/changelog) lists the core API
 * surface only; /api/changelog/all lists every section. `options.apis` is the API
 * list that says which APIs are core, see ./tiers.js. The RSS feed has every section.
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
    blogTagsPostsComponent: '@theme/ChangelogTagPage',
  });

  return {
    ...blogPlugin,
    name: 'changelog-plugin',
    async loadContent() {
      if (!options.changelogFilename) {
        throw new Error('Changelog plugin requires options.changelogFilename to be set');
      }

      // Generated on every load. Emptied first so renamed or merged sections leave no stale entries.
      await fs.emptyDir(changelogOutputDir);

      const fileContent = await fs.readFile(options.changelogFilename, 'utf-8');

      const sections = fileContent
        .split(/(?=^## \d{4}-\d{2}-\d{2}\s)/m)
        .filter((s) => s.match(/^## \d{4}-\d{2}-\d{2}/m));

      const dateHourMap = {};
      const isCore = createCoreMatcher(options.apis);
      const coreFilenames = new Set();

      await Promise.all(
        sections.map(async (section) => {
          const processed = processSection(section, options.routeBasePath, dateHourMap, isCore);
          if (!processed) return;
          if (processed.core) coreFilenames.add(`${processed.filename}.md`);

          const outPath = path.join(changelogOutputDir, `${processed.filename}.md`);
          await fs.outputFile(outPath, processed.content);
        }),
      );

      const content = await blogPlugin.loadContent();
      const basePath = normalizeUrl([context.baseUrl, options.routeBasePath]);
      const corePosts = content.blogPosts.filter((post) => coreFilenames.has(path.basename(post.metadata.source)));

      content.blogListPaginated = [
        ...paginate(corePosts, basePath, 'core', content.blogListPaginated[0], options.postsPerPage),
        ...paginate(
          content.blogPosts,
          normalizeUrl([basePath, 'all']),
          'all',
          content.blogListPaginated[0],
          options.postsPerPage,
        ),
      ];

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
  const { changelogFilename, apis, ...blogOptions } = options;

  const validatedBlogOptions = pluginContentBlog.validateOptions({ ...params, options: blogOptions });

  const schema = Joi.object({
    changelogFilename: Joi.string().required(),
    apis: Joi.array().items(Joi.object().unknown()).default([]),
  });
  const { apis: validatedApis } = validate(schema, { changelogFilename, apis });

  return { ...validatedBlogOptions, changelogFilename, apis: validatedApis };
};

module.exports = ChangelogPlugin;
