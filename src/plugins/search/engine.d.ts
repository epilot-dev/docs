/** Text split into [text, isMatch] pairs, for highlighting. */
export type Highlighted = [text: string, isMatch: boolean][];

export type PageKind = 'docs' | 'api' | 'changelog';

export interface SectionResult {
  url: string;
  /** Null for the page itself (its introduction). */
  heading: Highlighted | null;
  parents: string[];
  /** "GET /v1/entity/{slug}" for API operations. */
  endpoint: string | null;
  deprecated: boolean;
  /** The excerpt comes from a code sample. */
  isCode: boolean;
  excerpt: { prefix: boolean; suffix: boolean; text: Highlighted } | null;
  score: number;
}

export interface PageResult {
  url: string;
  title: Highlighted;
  kind: PageKind;
  breadcrumbs: string[];
  score: number;
  sections: SectionResult[];
}

export interface SearchResults {
  pages: PageResult[];
  /** Number of matching pages, before `limit`. */
  total: number;
  /** Number of matching pages per kind, regardless of the `kind` filter. */
  counts: Partial<Record<PageKind, number>>;
  terms: string[];
}

export interface SearchIndex {
  /** Indexes for at most `budgetMs` milliseconds. Returns true when done. */
  build(budgetMs?: number): boolean;
  search(query: string, options?: { kind?: PageKind; limit?: number; sectionsPerPage?: number }): SearchResults;
  size: number;
}

export function createIndex(data: { pages: unknown[]; sections: unknown[] }): SearchIndex;
