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
