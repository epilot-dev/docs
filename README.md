# epilot Dev Center

## Quick Start

```
npm install
npm dev
```

The dev command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Deployment

The documentation website is hosted by AWS Amplify. All changes merged to the `main` branch are automatically deployed to [docs.epilot.io](https://docs.epilot.io/)

## Local Development

When documenting your APIs, it's possible to perform changes and eval how they look within the docs portal while running locally.

For that, all you need to do is follow the instructions below:

1. `DOCS_URL=http://localhost:3001/ npm run dev` to run the docs portal locally
2. `npm run swagger-ui:watch` to serve your api docs locally on your API project
3. Finally to bypass CORS you will want to get this Chrome [extension](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc)

When you are done, just deploy your `openapi.yml` as you normally would. And don't forget to update your client sdk [here](https://github.com/epilot-dev/sdk-js).

## Search

The site search is a local plugin in [`src/plugins/search`](src/plugins/search):

- `indexer.js` runs after `npm run build` and writes `build/search-index.json`. It indexes every section of the rendered docs and changelog pages, and every operation of the OpenAPI specs listed in `redoc.config.js`.
- `engine.js` ranks results in the browser (BM25F with field weights, stemming, prefix and typo matching, title and phrase boosts).
- `theme/SearchBar` is the search dialog (`Ctrl/⌘ K` or `/`).

The dev server (`npm start`) has no index of its own: it serves the one from the last `npm run build`.

After changing the ranking, verify it against the built index:

```bash
npm run build
npm run test:search                       # relevance checks
npm run test:search -- "webhook signature"  # print the results of a query
```

To keep an element out of the index, add a `data-search-ignore` attribute to it.

## API Changelog

[`CHANGELOG.md`](CHANGELOG.md) is the source of the [API changelog](https://docs.epilot.io/api/changelog). The plugin in [`src/plugins/changelog`](src/plugins/changelog) turns every `## YYYY-MM-DD <API name>` section into an entry, with an RSS feed.

Write each section as a list of changes, one bullet per change:

```md
## 2026-10-23 Workflows Definition API, Workflows Execution API

- [New] [Action needed] **Pass the workflow's main context to automations** — Tasks and triggers can define which context an automation receives. Be prepared for the new `main_context` source value.
  - Flow template tasks accept a new optional `tasks[].input_context` field on `POST /v2/flows/templates`
  - Automation input contexts accept the new `main_context` value for `source`
- [Minor] `DELETE /v1/snapshots/{id}` can respond with `409` when a conflicting operation is in progress
```

- **Say what changed for the consumer first.** `**Title** — summary` tells a reader what they can now do or have to do. The endpoints, fields and values go into nested bullets, which are shown collapsed as "API details".
- **Tag every change.** `[Breaking]`, `[Action needed]` (not breaking by our rules, but consumers have to handle something, like a new enum value), `[Deprecated]`, `[New]`, `[Changed]`, `[Fix]` or `[Minor]`. A change can have several tags. Changes are shown most important first.
- **One entry per change.** When a change spans several APIs, write one section and name the APIs in the heading, separated by commas. Don't repeat the change per API.
- **Roll up the small things.** Optional fields, new response codes and similar additions that nobody has to act on go into a single `[Minor]` line per section, without a title.

### Core APIs and all APIs

The changelog has two views:

- [`/api/changelog`](https://docs.epilot.io/api/changelog), the default, lists the core API surface: the tier 1 APIs, core entities and core events. The change type pages (Breaking, Deprecated) cover the same.
- [`/api/changelog/all`](https://docs.epilot.io/api/changelog/all) lists every section.

An API is tier 1 unless it has `tier: 2` in [`redoc.config.js`](redoc.config.js). Tier 2 APIs are also grouped under "More APIs" in the API reference. An API that is in the changelog but not in `redoc.config.js` counts as tier 2. Section headings are matched to APIs by title, spec file name or route, see [`tiers.js`](src/plugins/changelog/tiers.js). The RSS feed and the entry pages include every section.

Sections written before this format have no tags. Their tags are inferred from the wording (`(breaking)`, "deprecated", "must be prepared", "New …"), see [`format.js`](src/plugins/changelog/format.js).
