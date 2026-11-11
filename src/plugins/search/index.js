/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Site search.
 *
 * - `indexer.js` runs after the build and writes `search-index.json`: one
 *   record per section of every doc, changelog entry and API operation.
 * - `engine.js` ranks those records. It runs in the browser.
 * - `theme/SearchBar` is the search box and results dialog in the navbar.
 *
 * `npm run test:search` verifies the ranking against the last build.
 */
const path = require('path');

const fs = require('fs-extra');

const { buildSearchIndex } = require('./indexer');

const PLUGIN_NAME = 'docusaurus-plugin-search';
const INDEX_FILENAME = 'search-index.json';

const DEFAULT_OPTIONS = {
  // API reference pages rendered by Redoc: [{ routePath, specUrl, layout: { title } }]
  specs: [],
  // Routes that are listings or navigation, not content.
  exclude: [/^\/$/, /^\/(404|search)\//, /^\/blog\//, /^\/api\/changelog\/(page\/.*)?$/],
  // Generated reference pages repeat what the guides and the API reference
  // say. They are searchable, but rank below both.
  weights: [
    { test: /^\/docs\/(sdk\/clients|cli\/commands)\//, weight: 0.7 },
    { test: /-library\//, weight: 0.7 },
  ],
};

module.exports = function searchPlugin(context, pluginOptions) {
  const options = { ...DEFAULT_OPTIONS, ...pluginOptions };
  // The dev server has no built pages to index. It serves the index of the
  // last production build instead, so search can be tried out locally.
  const devDir = path.join(context.generatedFilesDir, PLUGIN_NAME);

  return {
    name: PLUGIN_NAME,

    getThemePath() {
      return path.resolve(__dirname, './theme');
    },

    async loadContent() {
      const lastBuild = path.join(context.outDir, INDEX_FILENAME);

      await fs.ensureDir(devDir);
      if (process.env.NODE_ENV !== 'production' && (await fs.pathExists(lastBuild))) {
        await fs.copy(lastBuild, path.join(devDir, INDEX_FILENAME));
      }
    },

    configureWebpack(_config, isServer) {
      if (isServer || process.env.NODE_ENV === 'production') return {};

      return {
        devServer: {
          static: [{ publicPath: context.siteConfig.baseUrl, directory: devDir, watch: false }],
        },
      };
    },

    async postBuild({ outDir, routesPaths, baseUrl, siteConfig }) {
      const started = Date.now();
      const index = await buildSearchIndex({
        outDir,
        routesPaths,
        baseUrl,
        siteTitle: siteConfig.title,
        specs: options.specs,
        exclude: (route) => options.exclude.some((pattern) => pattern.test(route)),
        weightOf: (route) => options.weights.find(({ test }) => test.test(route))?.weight ?? 1,
        log: (message) => console.warn(`[${PLUGIN_NAME}] ${message}`),
      });
      const json = JSON.stringify(index);

      await fs.writeFile(path.join(outDir, INDEX_FILENAME), json, 'utf-8');

      console.log(
        `[${PLUGIN_NAME}] Indexed ${index.sections.length} sections of ${index.pages.length} pages ` +
          `(${(json.length / 1024 / 1024).toFixed(1)} MB) in ${((Date.now() - started) / 1000).toFixed(1)}s.`,
      );
    },
  };
};

module.exports.INDEX_FILENAME = INDEX_FILENAME;
