/**
 * Changelog entry format.
 *
 * A section of CHANGELOG.md is a list of changes. Each top-level bullet is one
 * change, written for a reader who skims:
 *
 *   - [New] **File imports** — Run CSV and Excel imports through the API.
 *     - `POST /v2/imports` starts an import
 *     - `GET /v2/imports/{importId}/results` returns the result
 *   - [Minor] New optional fields: `a` on `GET /v1/x`, `b` on `GET /v1/y`
 *
 * - `[Tag]`: one or more of TAGS below. Says what kind of change it is.
 * - `**Title** — summary`: what a consumer can now do, or has to do.
 * - nested bullets: the endpoints, fields and values. Rendered collapsed.
 *
 * Bullets without a tag (entries written before this format) get their tags
 * inferred from the wording, so the whole history renders the same way.
 */

// Ordered by how much a consumer needs to see it. Changes are rendered in this order.
const TAGS = [
  { id: 'breaking', label: 'Breaking' },
  { id: 'action', label: 'Action needed' },
  { id: 'deprecated', label: 'Deprecated' },
  { id: 'new', label: 'New' },
  { id: 'changed', label: 'Changed' },
  { id: 'fix', label: 'Fix' },
  { id: 'minor', label: 'Minor' },
];

const TAG_BY_LABEL = new Map(TAGS.map((tag) => [tag.label.toLowerCase(), tag]));
const TAG_RANK = new Map(TAGS.map((tag, index) => [tag.id, index]));

const TAG_PREFIX = /^\[([^\]]+)\]\s*/;

/** Reads the `[Tag]` prefixes of a bullet. Returns null when it has none. */
function readExplicitTags(text) {
  const tags = [];
  let rest = text;

  for (;;) {
    const match = rest.match(TAG_PREFIX);
    const tag = match && TAG_BY_LABEL.get(match[1].trim().toLowerCase());
    if (!tag) break;
    tags.push(tag.id);
    rest = rest.slice(match[0].length);
  }

  return tags.length > 0 ? { tags, text: rest } : null;
}

/** Derives tags from the wording of a bullet that was written without them. */
function inferTags(text) {
  let rest = text;
  const tags = [];

  const breakingPrefix = /^\*\*Breaking:?\*\*:?\s*/i;
  const breakingSuffix = /\s*\(breaking\)\s*$/i;

  if (breakingPrefix.test(rest) || breakingSuffix.test(rest)) {
    tags.push('breaking');
    rest = rest.replace(breakingPrefix, '').replace(breakingSuffix, '');
  }

  if (/\bdeprecated\b/i.test(rest)) tags.push('deprecated');
  if (!tags.includes('breaking') && /\bmust (be prepared|handle)\b/i.test(rest)) tags.push('action');
  if (/^New\b/.test(rest)) tags.push('new');
  if (tags.length === 0) tags.push('changed');

  return { tags, text: rest };
}

/**
 * Splits a section body into blocks: `{ type: 'change', tags, text, details }`
 * for top-level bullets and `{ type: 'other', lines }` for anything else.
 */
function parseSection(body) {
  const blocks = [];
  let current = null;

  for (const line of body.split('\n')) {
    const bullet = line.match(/^[-*]\s+(.*)$/);

    if (bullet) {
      const { tags, text } = readExplicitTags(bullet[1]) || inferTags(bullet[1]);
      current = { type: 'change', tags, text, details: [] };
      blocks.push(current);
    } else if (current && current.type === 'change' && (/^\s+\S/.test(line) || line.trim() === '')) {
      // Indented lines (and the blank lines between them) belong to the bullet above.
      current.details.push(line);
    } else {
      if (!current || current.type !== 'other') {
        current = { type: 'other', lines: [] };
        blocks.push(current);
      }
      current.lines.push(line);
    }
  }

  for (const block of blocks) {
    if (block.type !== 'change') continue;
    while (block.details.length > 0 && block.details[block.details.length - 1].trim() === '') block.details.pop();
    block.details = dedent(block.details);
  }

  return blocks.filter((block) => block.type === 'change' || block.lines.some((line) => line.trim() !== ''));
}

function dedent(lines) {
  const indents = lines.filter((line) => line.trim() !== '').map((line) => line.match(/^\s*/)[0].length);
  const indent = indents.length > 0 ? Math.min(...indents) : 0;

  return lines.map((line) => line.slice(indent));
}

function rank(change) {
  return Math.min(...change.tags.map((tag) => TAG_RANK.get(tag)));
}

function renderTag(id) {
  const tag = TAGS.find((candidate) => candidate.id === id);

  // Inline code, turned into a tag by theme/ChangelogContent. A paragraph must not
  // start with JSX: MDX would then parse the whole line as JSX.
  return `\`tag:${tag.id}|${tag.label}\``;
}

function renderChange(change) {
  const lines = [`${change.tags.map(renderTag).join(' ')} ${change.text}`];

  if (change.details.length > 0) {
    lines.push('', '<details className="changelog-details">', '<summary>API details</summary>', '');
    lines.push(...change.details);
    lines.push('', '</details>');
  }

  return lines.join('\n');
}

/** Renders a section body to the MDX the changelog pages are built from. */
function renderSection(body) {
  const blocks = parseSection(body);
  const onlyChanges = blocks.every((block) => block.type === 'change');

  // Most important first. Array#sort is stable, so the written order holds within a tag.
  // Sections that mix prose and bullets keep their written order.
  const ordered = onlyChanges ? [...blocks].sort((a, b) => rank(a) - rank(b)) : blocks;

  return ordered
    .map((block) => (block.type === 'change' ? renderChange(block) : block.lines.join('\n').trim()))
    .join('\n\n');
}

/** Plain-text description of a section (page description, RSS): its most important change. */
function describeSection(body) {
  const changes = parseSection(body).filter((block) => block.type === 'change');
  if (changes.length === 0) return undefined;

  const [first] = [...changes].sort((a, b) => rank(a) - rank(b));

  const label = TAGS[rank(first)].label;
  const text = first.text
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .trim();

  return `${label}: ${text}`;
}

module.exports = { TAGS, parseSection, renderSection, describeSection };
