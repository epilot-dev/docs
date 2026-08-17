/**
 * Generates static/openapi-specs/apis.json — the discovery document consumed by
 * openapi-analyzer-mcp (see docs/architecture/api-first.md).
 *
 * The API list comes from redoc.config.js so the discovery document always
 * matches the published API reference. Each baseURL is read from the spec's own
 * `servers` entry rather than being maintained here.
 */

const fs = require('fs');
const path = require('path');

const { specs } = require('../redoc.config');

const OUTPUT_PATH = path.join(__dirname, '..', 'static', 'openapi-specs', 'apis.json');
const CONCURRENCY = 8;

/**
 * Reads the first `servers[].url` out of an OpenAPI YAML document.
 *
 * Avoids a YAML dependency: `servers` is always a top-level key, so scan from it
 * until the next top-level key and take the first `url`.
 */
function extractBaseURL(spec) {
  const lines = spec.split('\n');
  const start = lines.findIndex((line) => /^servers:/.test(line));

  if (start === -1) return null;

  for (const line of lines.slice(start + 1)) {
    // A new top-level key ends the block; sequence items may sit at column 0 too.
    if (/^[^\s-]/.test(line)) break;

    const match = line.match(/^\s*-?\s*url:\s*(.+?)\s*$/);

    if (match) return match[1].replace(/^['"]|['"]$/g, '');
  }

  return null;
}

async function resolveBaseURL(spec, previousBaseURL) {
  const fallback = () => {
    if (!previousBaseURL) return null;
    console.warn(`  keeping previously known baseURL ${previousBaseURL}`);

    return previousBaseURL;
  };

  let response;

  try {
    response = await fetch(spec.specUrl);
  } catch (error) {
    console.warn(`✗ ${spec.layout.title}: ${spec.specUrl} — ${error.message}`);

    return fallback();
  }

  if (!response.ok) {
    console.warn(`✗ ${spec.layout.title}: ${spec.specUrl} — HTTP ${response.status}`);

    return fallback();
  }

  const baseURL = extractBaseURL(await response.text());

  if (!baseURL) {
    console.warn(`✗ ${spec.layout.title}: no servers entry in ${spec.specUrl}`);

    return fallback();
  }

  return baseURL;
}

async function mapWithConcurrency(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;

  const worker = async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index]);
    }
  };

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));

  return results;
}

function readPreviousBaseURLs() {
  try {
    const previous = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf8'));

    return new Map(previous.apis.map((api) => [api.properties[0].url, api.baseURL]));
  } catch {
    return new Map();
  }
}

async function main() {
  const previousBaseURLs = readPreviousBaseURLs();

  const apis = (
    await mapWithConcurrency(specs, CONCURRENCY, async (spec) => {
      const baseURL = await resolveBaseURL(spec, previousBaseURLs.get(spec.specUrl));

      if (!baseURL) {
        console.warn(`  skipping ${spec.layout.title} — no baseURL available`);

        return null;
      }

      return {
        name: spec.layout.title,
        baseURL,
        properties: [{ type: 'Swagger', url: spec.specUrl }],
      };
    })
  ).filter(Boolean);

  if (!apis.length) {
    throw new Error('No APIs could be resolved — refusing to write an empty discovery document');
  }

  const document = {
    name: 'Epilot APIs',
    description: 'Collection of Epilot API specifications',
    url: 'https://docs.epilot.io',
    apis,
  };

  const contents = `${JSON.stringify(document, null, 2)}\n`;
  const unchanged = fs.existsSync(OUTPUT_PATH) && fs.readFileSync(OUTPUT_PATH, 'utf8') === contents;

  if (unchanged) {
    console.log(`apis.json already up to date (${apis.length} APIs)`);

    return;
  }

  fs.writeFileSync(OUTPUT_PATH, contents);
  console.log(`Wrote apis.json with ${apis.length} of ${specs.length} APIs`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
