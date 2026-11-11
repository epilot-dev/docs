/**
 * Search engine for the docs site. Plain JavaScript without dependencies: it
 * runs in the browser (search modal) and in Node (relevance checks).
 *
 * Ranking, in order of application:
 *
 * 1. BM25F. Every section is a document with five fields (title, keys,
 *    context, body, code). Term frequencies are length-normalised per field,
 *    weighted, summed and only then saturated, so one hit in a title is worth
 *    more than many hits in a long body.
 * 2. Query term expansion. Each query word matches itself, other forms of
 *    the same word ("authenticate" finds "authentication", for less than an
 *    exact match), words it is a prefix of (weighted by how much of the word
 *    was typed) and, only when nothing else matches, words within a small
 *    edit distance (typos). All expansions of one word share a single IDF
 *    and saturation.
 * 3. Coverage. Sections that match every query word rank far above partial
 *    matches; a partial match on a page that covers the query as a whole is
 *    penalised less.
 * 4. Title, page and kind boosts, then phrase and proximity boosts on the
 *    best candidates.
 * 5. Sections are grouped into pages, each page shows its best sections.
 */

const TITLE = 0;
const KEYS = 1;
const CONTEXT = 2;
// 3: body, 4: code
const FIELD_COUNT = 5;

// Relative worth of one occurrence per field, and how strongly the field
// length dampens it (BM25 `b`).
const FIELD_WEIGHT = [9, 9, 2.2, 1, 0.45];
const FIELD_B = [0.35, 0.2, 0.2, 0.75, 0.6];
const K1 = 1.2;

const KIND_WEIGHT = { docs: 1, api: 0.92, changelog: 0.3 };

const STOPWORDS = new Set(
  'a an and are as at be by can do does for from how i in is it my of on or that the this to via what when where which with you your'.split(
    ' ',
  ),
);

// Title words that say nothing about the topic of a page.
const FILLER_WORDS = new Set(['overview', 'introduction', 'intro', 'readme', 'guide', 'reference', 'epilot']);

const WORD = /[A-Za-z0-9À-ɏ]+/g;
const CAMEL_PART = /[A-Z]?[a-z]+|[A-Z]+(?![a-z])|[0-9]+/g;
const DIACRITICS = /[̀-ͯ]/g;

const normalize = (word) => {
  const lower = word.toLowerCase();

  // eslint-disable-next-line no-control-regex
  return /^[\x00-\x7f]*$/.test(lower) ? lower : lower.normalize('NFKD').replace(DIACRITICS, '');
};

/**
 * Folds plurals only ("entities" -> "entity", "webhooks" -> "webhook"). Words
 * that differ by nothing but a plural count as the same word.
 */
const singular = (term) => {
  if (term.length < 4 || !/^[a-z]+$/.test(term)) return term;
  if (term.endsWith('ies')) return `${term.slice(0, -3)}y`;
  if (/(ss|x|z|ch|sh)es$/.test(term)) return term.slice(0, -2);
  if (term.endsWith('s') && !/(ss|us|is)$/.test(term)) return term.slice(0, -1);

  return term;
};

const STEP2 = {
  ational: 'ate',
  tional: 'tion',
  enci: 'ence',
  anci: 'ance',
  izer: 'ize',
  bli: 'ble',
  alli: 'al',
  entli: 'ent',
  eli: 'e',
  ousli: 'ous',
  ization: 'ize',
  ation: 'ate',
  ator: 'ate',
  alism: 'al',
  iveness: 'ive',
  fulness: 'ful',
  ousness: 'ous',
  aliti: 'al',
  iviti: 'ive',
  biliti: 'ble',
  logi: 'log',
};
const STEP3 = { icate: 'ic', ative: '', alize: 'al', iciti: 'ic', ical: 'ic', ful: '', ness: '' };
const CONSONANTS = '[^aeiou][^aeiouy]*';
const VOWELS = '[aeiouy][aeiou]*';
const MEASURE_GT0 = new RegExp(`^(${CONSONANTS})?${VOWELS}${CONSONANTS}`);
const MEASURE_EQ1 = new RegExp(`^(${CONSONANTS})?${VOWELS}${CONSONANTS}(${VOWELS})?$`);
const MEASURE_GT1 = new RegExp(`^(${CONSONANTS})?${VOWELS}${CONSONANTS}${VOWELS}${CONSONANTS}`);
const HAS_VOWEL = new RegExp(`^(${CONSONANTS})?[aeiouy]`);
const ENDS_CVC = new RegExp(`^${CONSONANTS}[aeiouy][^aeiouwxy]$`);
const STEP2_SUFFIX = new RegExp(`^(.+?)(${Object.keys(STEP2).join('|')})$`);
const STEP3_SUFFIX = new RegExp(`^(.+?)(${Object.keys(STEP3).join('|')})$`);
const STEP4_SUFFIX = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
const stems = new Map();

/**
 * Porter stemmer: reduces a word to its root, so that inflections and
 * derivations of a word find each other ("authenticate", "authenticated",
 * "authentication").
 */
const porter = (word) => {
  if (word.length < 4 || !/^[a-z]+$/.test(word)) return word;

  let w = word;
  let match;

  if (w[0] === 'y') w = `Y${w.slice(1)}`;

  // Step 1a: plurals
  if (/^(.+?)(ss|i)es$/.test(w)) w = w.slice(0, -2);
  else if (/^(.+?)([^s])s$/.test(w)) w = w.slice(0, -1);

  // Step 1b: -eed, -ed, -ing
  if ((match = /^(.+?)eed$/.exec(w))) {
    if (MEASURE_GT0.test(match[1])) w = w.slice(0, -1);
  } else if ((match = /^(.+?)(ed|ing)$/.exec(w)) && HAS_VOWEL.test(match[1])) {
    w = match[1];
    if (/(at|bl|iz)$/.test(w)) w += 'e';
    else if (/([^aeiouylsz])\1$/.test(w)) w = w.slice(0, -1);
    else if (ENDS_CVC.test(w)) w += 'e';
  }

  // Step 1c: -y
  if ((match = /^(.+?)y$/.exec(w)) && HAS_VOWEL.test(match[1])) w = `${match[1]}i`;

  // Steps 2 and 3: double and derivational suffixes
  if ((match = STEP2_SUFFIX.exec(w)) && MEASURE_GT0.test(match[1])) w = match[1] + STEP2[match[2]];
  if ((match = STEP3_SUFFIX.exec(w)) && MEASURE_GT0.test(match[1])) w = match[1] + STEP3[match[2]];

  // Step 4: remaining suffixes
  if ((match = STEP4_SUFFIX.exec(w))) {
    if (MEASURE_GT1.test(match[1])) w = match[1];
  } else if ((match = /^(.+?)(s|t)(ion)$/.exec(w)) && MEASURE_GT1.test(match[1] + match[2])) {
    w = match[1] + match[2];
  }

  // Step 5: final -e and -ll
  if ((match = /^(.+?)e$/.exec(w))) {
    if (MEASURE_GT1.test(match[1]) || (MEASURE_EQ1.test(match[1]) && !ENDS_CVC.test(match[1]))) w = match[1];
  }
  if (/ll$/.test(w) && MEASURE_GT1.test(w)) w = w.slice(0, -1);

  return w[0] === 'Y' ? `y${w.slice(1)}` : w;
};

/**
 * Index key shared by all forms of a word. Prefixed, so it never collides
 * with a word itself.
 */
const rootOf = (word) => {
  let root = stems.get(word);

  if (root === undefined) stems.set(word, (root = `~${porter(word)}`));

  return root;
};

// An exact word is worth EXACT + ROOT, another form of it only ROOT.
const EXACT = 0.6;
const ROOT = 0.4;

/**
 * Splits text into words with their offsets. An identifier such as
 * `getEntityV2` yields the whole word plus its camelCase parts, so both
 * "getEntity" and "get entity" find it.
 */
function tokenize(text) {
  const tokens = [];
  let match;

  WORD.lastIndex = 0;

  while ((match = WORD.exec(text))) {
    const word = match[0];
    const terms = [normalize(word)];

    if (/[a-z][A-Z]|[A-Z]{2}[a-z]/.test(word)) {
      for (const part of word.match(CAMEL_PART) || []) {
        if (part.length > 1) terms.push(normalize(part));
      }
    }

    tokens.push({ terms, start: match.index, end: match.index + word.length });
  }

  return tokens;
}

/** Optimal string alignment distance, cut off above `max`. */
function editDistance(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;

  let previous2 = null;
  let previous = Array.from({ length: b.length + 1 }, (_, j) => j);

  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    let rowMin = i;

    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let value = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost);

      if (previous2 && i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        value = Math.min(value, previous2[j - 2] + 1);
      }

      current.push(value);
      if (value < rowMin) rowMin = value;
    }

    if (rowMin > max) return max + 1;

    previous2 = previous;
    previous = current;
  }

  return previous[b.length];
}

/**
 * @param {{pages: Array, sections: Array}} data Contents of search-index.json
 */
function createIndex(data) {
  const { pages, sections } = data;
  const count = sections.length;
  const postings = new Map(); // term -> [docId * FIELD_COUNT + field, tf, ...]
  const vocabulary = new Set(); // unstemmed words, for prefix and typo lookup
  const fieldLength = Array.from({ length: FIELD_COUNT }, () => new Float32Array(count));
  const averageLength = new Array(FIELD_COUNT).fill(1);
  let sortedVocabulary = [];
  let indexed = 0;

  const fieldsOf = (id) => {
    const [pageIndex, heading, , parents, text, extra] = sections[id];
    const page = pages[pageIndex];

    return [
      heading || page[1],
      extra?.k || '',
      [heading ? page[1] : '', ...parents, ...page[3]].join(' '),
      text,
      extra?.c || '',
    ];
  };

  const addDocument = (id) => {
    const fields = fieldsOf(id);

    for (let field = 0; field < FIELD_COUNT; field++) {
      if (!fields[field]) continue;

      const tokens = tokenize(fields[field]);
      const frequencies = new Map();

      for (const token of tokens) {
        for (const word of token.terms) {
          if (word.length < 2) continue;
          vocabulary.add(word);

          const term = singular(word);
          const root = rootOf(term);

          frequencies.set(term, (frequencies.get(term) || 0) + 1);
          frequencies.set(root, (frequencies.get(root) || 0) + 1);
        }
      }

      fieldLength[field][id] = tokens.length;

      for (const [term, frequency] of frequencies) {
        let list = postings.get(term);

        if (!list) postings.set(term, (list = []));
        list.push(id * FIELD_COUNT + field, frequency);
      }
    }
  };

  /**
   * Indexes the next sections for at most `budgetMs`, so the browser can
   * build the index in slices without blocking input. Returns true when done.
   */
  const build = (budgetMs = Infinity) => {
    const deadline = Date.now() + budgetMs;

    while (indexed < count) {
      addDocument(indexed++);
      if (indexed % 64 === 0 && Date.now() > deadline) return false;
    }

    for (let field = 0; field < FIELD_COUNT; field++) {
      let total = 0;
      let filled = 0;

      for (let id = 0; id < count; id++) {
        if (fieldLength[field][id]) {
          total += fieldLength[field][id];
          filled++;
        }
      }
      averageLength[field] = filled ? total / filled : 1;
    }

    sortedVocabulary = [...vocabulary].sort();

    return true;
  };

  /** Words of the vocabulary starting with `prefix` (binary search). */
  const wordsWithPrefix = (prefix, limit) => {
    let low = 0;
    let high = sortedVocabulary.length;

    while (low < high) {
      const middle = (low + high) >> 1;

      if (sortedVocabulary[middle] < prefix) low = middle + 1;
      else high = middle;
    }

    const words = [];

    for (let i = low; i < sortedVocabulary.length && sortedVocabulary[i].startsWith(prefix); i++) {
      words.push(sortedVocabulary[i]);
    }

    // Shortest first: the closest completions of what was typed.
    return words.sort((a, b) => a.length - b.length).slice(0, limit);
  };

  /**
   * Index terms a query word may match, with a weight between 0 and 1.
   */
  const expand = (word, isLast) => {
    // term -> [weight in the score, closeness to what was typed (0..1)]
    const candidates = new Map();
    const offer = (term, weight, closeness = weight) => {
      if (postings.has(term) && weight > (candidates.get(term)?.[0] || 0)) candidates.set(term, [weight, closeness]);
    };
    const own = singular(word);

    offer(own, EXACT, 1);
    offer(rootOf(own), ROOT, 0.85);

    // While typing, the last word is usually incomplete. Earlier words are
    // complete more often than not, so their completions count for less.
    if (word.length >= (isLast ? 2 : 3)) {
      for (const completion of wordsWithPrefix(word, 150)) {
        const typed = word.length / completion.length;

        offer(singular(completion), (isLast ? 0.5 : 0.35) + 0.45 * typed);
      }
    }

    // Typos: only when the word is unknown, otherwise "entity" would also
    // return everything about "entry".
    if (!candidates.size && word.length >= 4) {
      const max = word.length >= 8 ? 2 : 1;

      for (const known of sortedVocabulary) {
        if (known[0] !== word[0] && known[1] !== word[1]) continue;

        const distance = editDistance(word, known, max);

        if (distance <= max) {
          offer(singular(known), distance === 1 ? 0.6 : 0.4);
        } else if (isLast && known.length > word.length && editDistance(word, known.slice(0, word.length), 1) <= 1) {
          // A typo in a word that is still being typed.
          offer(singular(known), 0.3);
        }
      }
    }

    return candidates;
  };

  const parseQuery = (query) => {
    const seen = new Set();
    const words = [];

    for (const token of tokenize(query)) {
      const word = token.terms[0];

      if (!seen.has(word)) {
        seen.add(word);
        words.push(word);
      }
    }

    const meaningful = words.filter((word) => word.length > 1 || words.length === 1);
    const hasContentWord = meaningful.some((word) => !STOPWORDS.has(word));

    return meaningful.slice(0, 12).map((word, index, all) => ({
      word,
      isLast: index === all.length - 1 && !/\s$/.test(query),
      // Stopwords still score, but a section is not required to contain them.
      importance: hasContentWord && STOPWORDS.has(word) ? 0.1 : 1,
    }));
  };

  /** Whether a word of the text is one of the index terms a query matched. */
  const isMatch = (word, terms) => {
    if (word.length < 2) return false;

    const term = singular(word);

    return terms.has(term) || terms.has(rootOf(term));
  };

  /**
   * Highlights matching words. Returns [text, isMatch] pairs.
   */
  const highlight = (text, matchTerms) => {
    const segments = [];
    let cursor = 0;

    for (const token of tokenize(text)) {
      if (!token.terms.some((word) => isMatch(word, matchTerms))) continue;
      if (token.start > cursor) segments.push([text.slice(cursor, token.start), false]);
      segments.push([text.slice(token.start, token.end), true]);
      cursor = token.end;
    }

    if (cursor < text.length) segments.push([text.slice(cursor), false]);

    return segments;
  };

  /**
   * Picks the passage of `text` that contains the most distinct query words
   * closest together.
   */
  const excerpt = (text, queryTerms, length = 170) => {
    if (!text) return null;

    const hits = [];

    for (const token of tokenize(text)) {
      let best = -1;

      for (const word of token.terms) {
        for (let i = 0; i < queryTerms.length; i++) {
          if (isMatch(word, queryTerms[i].candidates)) best = i;
        }
      }
      if (best >= 0) hits.push({ query: best, start: token.start, end: token.end });
    }

    if (!hits.length) return null;

    let bestStart = hits[0].start;
    let bestScore = -1;

    for (let i = 0; i < hits.length; i++) {
      const covered = new Set();
      let score = 0;

      for (let j = i; j < hits.length && hits[j].end - hits[i].start <= length; j++) {
        // Distinct query words count most, repeats a little.
        score += covered.has(hits[j].query) ? 0.1 : queryTerms[hits[j].query].idf + 1;
        covered.add(hits[j].query);
      }

      if (score > bestScore) {
        bestScore = score;
        bestStart = hits[i].start;
      }
    }

    // Lead in with some context, starting at a word (ideally a sentence).
    let start = Math.max(0, bestStart - 40);

    if (start > 0) {
      const sentence = text.lastIndexOf('. ', bestStart);

      if (sentence >= start - 40 && sentence < bestStart) start = sentence + 2;
      else start = text.indexOf(' ', start) + 1 || start;
    }

    let end = Math.min(text.length, start + length);

    if (end < text.length) end = text.lastIndexOf(' ', end) > start ? text.lastIndexOf(' ', end) : end;

    return {
      prefix: start > 0,
      suffix: end < text.length,
      text: text.slice(start, end),
    };
  };

  /**
   * Smallest distance, in words, over which the query words appear in order
   * of the text. 1 per word means an exact phrase.
   */
  const proximity = (text, queryTerms) => {
    const positions = queryTerms.map(() => []);

    tokenize(text).forEach((token, position) => {
      for (const word of token.terms) {
        queryTerms.forEach((queryTerm, i) => {
          if (isMatch(word, queryTerm.candidates) && !positions[i].includes(position)) positions[i].push(position);
        });
      }
    });

    const present = positions.filter((list) => list.length);

    if (present.length < 2) return { phrase: false, span: Infinity, words: present.length };

    // Phrase: every present word directly follows the previous one.
    const phrase = present[0].some((position) => present.every((list, offset) => list.includes(position + offset)));

    let span = Infinity;

    for (const anchor of present[0]) {
      let low = anchor;
      let high = anchor;

      for (let i = 1; i < present.length; i++) {
        let nearest = present[i][0];

        for (const position of present[i]) {
          if (Math.abs(position - anchor) < Math.abs(nearest - anchor)) nearest = position;
        }
        low = Math.min(low, nearest);
        high = Math.max(high, nearest);
      }
      span = Math.min(span, high - low + 1);
    }

    return { phrase: phrase && present.length === queryTerms.length, span, words: present.length };
  };

  /**
   * @param {string} query
   * @param {object} [options]
   * @param {string} [options.kind] Only pages of this kind (docs, api, changelog)
   * @param {number} [options.limit] Maximum number of pages
   * @param {number} [options.sectionsPerPage] Maximum sections shown per page
   */
  const search = (query, { kind, limit = 8, sectionsPerPage = 3 } = {}) => {
    const queryTerms = parseQuery(query).map((term) => ({ ...term, candidates: expand(term.word, term.isLast) }));
    const empty = { pages: [], total: 0, counts: {}, terms: [] };

    if (!queryTerms.length) return empty;

    const scores = new Float32Array(count);
    const matched = new Int32Array(count); // bitmask: query words found anywhere
    const matchedOwn = new Int32Array(count); // ... found outside the context field
    // Per query word: how closely the title or keys of a section match it.
    const titleMatch = queryTerms.map(() => new Float32Array(count));

    queryTerms.forEach((queryTerm, index) => {
      const bit = 1 << index;
      const weighted = new Map(); // docId -> weighted, normalised term frequency

      for (const [term, [weight, closeness]] of queryTerm.candidates) {
        const list = postings.get(term);

        for (let i = 0; i < list.length; i += 2) {
          const field = list[i] % FIELD_COUNT;
          const id = (list[i] - field) / FIELD_COUNT;
          const norm = 1 - FIELD_B[field] + (FIELD_B[field] * fieldLength[field][id]) / averageLength[field];

          weighted.set(id, (weighted.get(id) || 0) + (weight * FIELD_WEIGHT[field] * list[i + 1]) / norm);
          matched[id] |= bit;
          if (field !== CONTEXT) matchedOwn[id] |= bit;
          if ((field === TITLE || field === KEYS) && closeness > titleMatch[index][id])
            titleMatch[index][id] = closeness;
        }
      }

      queryTerm.idf = Math.log(1 + (count - weighted.size + 0.5) / (weighted.size + 0.5));

      for (const [id, frequency] of weighted) {
        scores[id] += queryTerm.importance * queryTerm.idf * (frequency / (K1 + frequency)) * (K1 + 1);
      }
    });

    const allBits = (1 << queryTerms.length) - 1;
    const requiredBits = queryTerms.reduce((bits, term, i) => (term.importance === 1 ? bits | (1 << i) : bits), 0);
    const totalImportance = queryTerms.reduce((sum, term) => sum + term.importance * (term.idf + 0.5), 0);
    const coverageOf = (bits) => {
      if (bits === allBits) return 1;

      let sum = 0;

      queryTerms.forEach((term, i) => {
        if (bits & (1 << i)) sum += term.importance * (term.idf + 0.5);
      });

      return sum / totalImportance;
    };

    // What the page as a whole covers, to go easier on sections of a page
    // that answers the query across several sections.
    const pageBits = new Map();

    for (let id = 0; id < count; id++) {
      if (matched[id]) pageBits.set(sections[id][0], (pageBits.get(sections[id][0]) || 0) | matched[id]);
    }

    const joinedQuery = queryTerms.map((term) => term.word).join('');
    const pagesByKind = {};
    let candidates = [];

    for (let id = 0; id < count; id++) {
      // A section that only matches through its page title or parent
      // headings is not a result by itself.
      if (!matchedOwn[id]) continue;

      const section = sections[id];
      const page = pages[section[0]];

      // Counted before filtering, so the filters can show what each holds.
      (pagesByKind[page[2]] = pagesByKind[page[2]] || new Set()).add(section[0]);
      if (kind && page[2] !== kind) continue;

      const coverage = coverageOf(matched[id]);
      const pageCoverage = coverageOf(pageBits.get(section[0]));
      let score = scores[id] * Math.max(coverage ** 3, 0.45 * coverage * pageCoverage ** 3);

      // How well the title covers the query: the weakest required word decides.
      let inTitle = requiredBits ? 1 : 0;

      queryTerms.forEach((term, i) => {
        if (term.importance === 1) inTitle = Math.min(inTitle, titleMatch[i][id]);
      });

      if (inTitle > 0) {
        // Every query word is in the title: this section is about the query.
        // The less else the title says, the more: "Webhooks" is a better
        // answer to "webhooks" than "Environments & Secrets in Webhooks".
        // An identifier counts by its parts: "pricing" is a quarter of
        // "PricingEntitiesExtractResult".
        let words = 0;
        let matching = 0;

        for (const token of tokenize(section[1] || page[1])) {
          if (STOPWORDS.has(token.terms[0]) || FILLER_WORDS.has(token.terms[0])) continue;

          const parts = token.terms.length > 1 ? token.terms.slice(1) : token.terms;
          const isWhole = queryTerms.some((term) => isMatch(token.terms[0], term.candidates));

          words += parts.length;
          matching += isWhole
            ? parts.length
            : parts.filter((word) => queryTerms.some((term) => isMatch(word, term.candidates))).length;
        }

        // An operation is named by its operationId, the first of its keys.
        const isKey = Boolean(section[5]?.e) && section[5].k.split(' ')[0].toLowerCase() === joinedQuery;
        let boost = 1.5 * (1 + 0.6 * (isKey ? 1 : matching / Math.max(words, queryTerms.length)));

        // The page about a topic beats a section about it somewhere else.
        if (!section[1]) boost *= 1.8;

        score *= 1 + (boost - 1) * inTitle;
      }

      score *= (KIND_WEIGHT[page[2]] || 1) * (page[4] || 1);
      if (section[5]?.d) score *= 0.5;

      candidates.push({ id, score });
    }

    candidates.sort((a, b) => b.score - a.score);

    // Phrase and proximity need the text, so only the best candidates get them.
    if (queryTerms.length > 1) {
      const head = candidates.slice(0, 120);

      for (const candidate of head) {
        const section = sections[candidate.id];
        const page = pages[section[0]];
        const inTitle = proximity(`${section[1] || page[1]} ${section[5]?.k || ''}`, queryTerms);
        const inBody = proximity(section[4], queryTerms);

        if (inTitle.phrase) candidate.score *= 1.5;
        else if (inBody.phrase) candidate.score *= 1.35;
        else if (inBody.words === queryTerms.length)
          candidate.score *= 1 + 0.3 * Math.min(1, queryTerms.length / inBody.span);
      }

      candidates = head.sort((a, b) => b.score - a.score).concat(candidates.slice(120));
    }

    // Group into pages. Further matching sections add a little to the page.
    const groups = new Map();

    for (const candidate of candidates) {
      const pageIndex = sections[candidate.id][0];
      let group = groups.get(pageIndex);

      if (!group) groups.set(pageIndex, (group = { pageIndex, score: 0, hits: [] }));
      if (group.hits.length < 6) group.score += candidate.score * (group.hits.length ? 0.12 / group.hits.length : 1);
      group.hits.push(candidate);
    }

    const ranked = [...groups.values()].sort((a, b) => b.score - a.score);
    const counts = {};

    for (const [pageKind, found] of Object.entries(pagesByKind)) counts[pageKind] = found.size;

    const matchTerms = new Set();

    for (const queryTerm of queryTerms) for (const term of queryTerm.candidates.keys()) matchTerms.add(term);

    // Weak tail: results far below the best one are noise.
    const threshold = ranked.length ? ranked[0].score * 0.04 : 0;

    const results = ranked
      .filter((group) => group.score >= threshold)
      .slice(0, limit)
      .map((group) => {
        const [url, title, pageKind, breadcrumbs] = pages[group.pageIndex];
        const best = group.hits[0].score;

        return {
          url,
          title: highlight(title, matchTerms),
          kind: pageKind,
          breadcrumbs,
          score: group.score,
          sections: group.hits
            .filter((hit, index) => index === 0 || hit.score >= best * 0.2)
            .slice(0, sectionsPerPage)
            .map((hit) => {
              const [, heading, anchor, parents, text, extra] = sections[hit.id];
              const fromText = excerpt(text, queryTerms);
              const fromCode = fromText ? null : excerpt(extra?.c, queryTerms);
              const passage = fromText ||
                fromCode || { prefix: false, suffix: text.length > 170, text: text.slice(0, 170) };

              return {
                url: anchor ? `${url}#${anchor}` : url,
                heading: heading ? highlight(heading, matchTerms) : null,
                parents,
                endpoint: extra?.e || null,
                deprecated: Boolean(extra?.d),
                isCode: Boolean(fromCode),
                excerpt: passage.text ? { ...passage, text: highlight(passage.text, matchTerms) } : null,
                score: hit.score,
              };
            }),
        };
      });

    return { pages: results, total: ranked.length, counts, terms: queryTerms.map((term) => term.word) };
  };

  return { build, search, size: count };
}

module.exports = { createIndex, tokenize, singular, porter, editDistance };
