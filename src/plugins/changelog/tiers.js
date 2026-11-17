/**
 * Which changelog sections belong to the core API surface.
 *
 * The API list in redoc.config.js is the source of truth: an API is core unless it
 * is marked `tier: 2` there. APIs that are not listed at all are not core either.
 * Core entities and core events are always core.
 *
 * Sections of non-core APIs stay in the changelog, with a page of their own, but
 * are left out of its default view and of the change type pages.
 */

/** "Customer Portal API", "customer-portal" and "/api/customer-portal" all become "customerportal". */
function apiKey(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
    .replace(/^svc/, '')
    .replace(/v\d+$/, '')
    .replace(/apis?$/, '');
}

/** The names a section heading can use for an API: its title, its spec file and its route. */
function specKeys(spec) {
  const specFile = spec.specUrl
    .split('/')
    .pop()
    .replace(/\.ya?ml$/, '');
  const route = spec.routePath.split('/').pop();

  return [spec.layout.title, specFile, route].map(apiKey);
}

const ENTITY_OR_EVENT = /^(Core (Entities|Events)|Event: .+|.+ Entity)$/;

/**
 * @param {{ layout: { title: string }, routePath: string, specUrl: string, tier?: number }[]} specs
 * @returns {(sectionName: string) => boolean} whether a section, named as in its `## date name` heading, is core
 */
function createCoreMatcher(specs) {
  const tierByKey = new Map();
  for (const spec of specs) {
    for (const key of specKeys(spec)) tierByKey.set(key, spec.tier || 1);
  }

  const isCoreApi = (name) => tierByKey.get(apiKey(name)) === 1;

  // A section can name several APIs ("Workflows Definition API, Workflows Execution API").
  return (sectionName) =>
    ENTITY_OR_EVENT.test(sectionName) || sectionName.split(',').some((name) => isCoreApi(name.trim()));
}

module.exports = { createCoreMatcher };
