import { useHistory } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { createIndex } from '../../engine';
import type { Highlighted, PageKind, PageResult, SearchIndex, SectionResult } from '../../engine';

import styles from './styles.module.css';

const KINDS: { kind: PageKind | undefined; label: string }[] = [
  { kind: undefined, label: 'All' },
  { kind: 'docs', label: 'Docs' },
  { kind: 'api', label: 'API reference' },
  { kind: 'changelog', label: 'Changelog' },
];

const KIND_LABEL: Record<PageKind, string> = { docs: 'Docs', api: 'API', changelog: 'Changelog' };

const SUGGESTIONS = ['webhooks', 'access tokens', 'getEntity', 'journey embed', 'entity mapping'];

let indexPromise: Promise<SearchIndex> | null = null;

/**
 * Downloads the index once per visit and builds it in short slices, so
 * typing stays responsive while it loads.
 */
function loadIndex(url: string): Promise<SearchIndex> {
  if (!indexPromise) {
    indexPromise = fetch(url, { cache: 'no-cache' })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        return response.json();
      })
      .then(
        (data) =>
          new Promise<SearchIndex>((resolve) => {
            const index = createIndex(data);
            const step = () => (index.build(12) ? resolve(index) : setTimeout(step, 0));

            step();
          }),
      )
      .catch((error) => {
        indexPromise = null;
        throw error;
      });
  }

  return indexPromise;
}

const Marked = ({ text }: { text: Highlighted }) => (
  <>{text.map(([part, isMatch], i) => (isMatch ? <mark key={i}>{part}</mark> : part))}</>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="m19 19-4.35-4.35M17 9A8 8 0 1 1 1 9a8 8 0 0 1 16 0Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface Item {
  key: string;
  url: string;
  page: PageResult;
  /** Undefined for the row of the page itself. */
  section?: SectionResult;
}

/**
 * Rows in display order: every page, followed by its matching sections.
 */
function toItems(pages: PageResult[]): { items: Item[]; preferred: number } {
  const items: Item[] = [];
  let preferred = 0;

  pages.forEach((page, pageIndex) => {
    items.push({ key: page.url, url: page.url, page });

    page.sections.forEach((section, sectionIndex) => {
      if (!section.heading) return;

      // The best result is a section of the first page: start there.
      if (pageIndex === 0 && sectionIndex === 0) preferred = items.length;
      items.push({ key: `${section.url} ${sectionIndex}`, url: section.url, page, section });
    });
  });

  return { items, preferred };
}

const Excerpt = ({ section }: { section: SectionResult }) =>
  section.excerpt ? (
    <span className={clsx(styles.excerpt, section.isCode && styles.excerptCode)}>
      {section.excerpt.prefix && '… '}
      <Marked text={section.excerpt.text} />
      {section.excerpt.suffix && ' …'}
    </span>
  ) : null;

const Endpoint = ({ endpoint }: { endpoint: string }) => {
  const [method, ...path] = endpoint.split(' ');

  return (
    <span className={styles.endpoint}>
      <span className={clsx(styles.method, styles[`method${method}`])}>{method}</span>
      {path.join(' ')}
    </span>
  );
};

interface DialogProps {
  indexUrl: string;
  onClose: () => void;
}

function SearchDialog({ indexUrl, onClose }: DialogProps) {
  const history = useHistory();
  const baseUrl = useBaseUrl('/');
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<PageKind | undefined>(undefined);
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;

    loadIndex(indexUrl).then(
      (loaded) => active && setIndex(loaded),
      () => active && setFailed(true),
    );

    return () => {
      active = false;
    };
  }, [indexUrl]);

  // The page behind the dialog must not scroll.
  useEffect(() => {
    const { overflow } = document.body.style;

    document.body.style.overflow = 'hidden';
    input.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  // A single character matches everything and nothing.
  const hasQuery = query.trim().length > 1;
  const results = useMemo(
    () => (index && hasQuery ? index.search(query, { kind, limit: 12 }) : null),
    [index, query, kind, hasQuery],
  );
  const { items, preferred } = useMemo(() => toItems(results?.pages ?? []), [results]);

  useEffect(() => {
    setSelected(preferred);
    if (list.current) list.current.scrollTop = 0;
  }, [results, preferred]);

  const open = useCallback(
    (url: string) => {
      onClose();
      history.push(baseUrl.replace(/\/$/, '') + url);
    },
    [history, baseUrl, onClose],
  );

  const select = (next: number) => {
    setSelected(next);
    list.current?.querySelector(`[data-index="${next}"]`)?.scrollIntoView({ block: 'nearest' });
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    } else if (event.key === 'ArrowDown' && items.length) {
      event.preventDefault();
      select((selected + 1) % items.length);
    } else if (event.key === 'ArrowUp' && items.length) {
      event.preventDefault();
      select((selected - 1 + items.length) % items.length);
    } else if (event.key === 'Enter' && items[selected]) {
      event.preventDefault();

      const url = baseUrl.replace(/\/$/, '') + items[selected].url;

      if (event.metaKey || event.ctrlKey) window.open(url, '_blank', 'noopener');
      else open(items[selected].url);
    } else if (event.key === 'Tab') {
      // Keep the focus inside the dialog.
      const focusable = Array.from(dialog.current?.querySelectorAll<HTMLElement>('input, button') ?? []);
      const position = focusable.indexOf(document.activeElement as HTMLElement);
      const next = (position + (event.shiftKey ? -1 : 1) + focusable.length) % focusable.length;

      event.preventDefault();
      focusable[next]?.focus();
    }
  };

  const onLinkClick = (event: React.MouseEvent, url: string) => {
    // Let the browser open new tabs and windows itself.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    open(url);
  };

  const row = (item: Item, position: number) => {
    const { page, section } = item;
    const intro = section ? undefined : page.sections.find((candidate) => !candidate.heading);

    return (
      <a
        key={item.key}
        id={`search-result-${position}`}
        role="option"
        aria-selected={position === selected}
        data-index={position}
        tabIndex={-1}
        href={baseUrl.replace(/\/$/, '') + item.url}
        className={clsx(
          styles.row,
          section ? styles.sectionRow : styles.pageRow,
          position === selected && styles.selected,
        )}
        onClick={(event) => onLinkClick(event, item.url)}
        onMouseMove={() => position !== selected && setSelected(position)}
      >
        {section ? (
          <>
            <span className={styles.rowTitle}>
              <span className={styles.hash} aria-hidden="true">
                #
              </span>
              <span className={styles.rowHeading}>
                <Marked text={section.heading ?? []} />
              </span>
              {section.deprecated && <span className={styles.deprecated}>Deprecated</span>}
              {section.endpoint && <Endpoint endpoint={section.endpoint} />}
            </span>
            <Excerpt section={section} />
          </>
        ) : (
          <>
            <span className={styles.rowTitle}>
              <span className={clsx(styles.kind, styles[`kind-${page.kind}`])}>{KIND_LABEL[page.kind]}</span>
              <span className={styles.pageTitle}>
                <Marked text={page.title} />
              </span>
              {page.breadcrumbs.length > 0 && (
                <span className={styles.breadcrumbs}>{page.breadcrumbs.join(' › ')}</span>
              )}
            </span>
            {intro && <Excerpt section={intro} />}
          </>
        )}
      </a>
    );
  };

  let body: React.ReactNode;

  if (failed) {
    body = (
      <p className={styles.message}>
        {process.env.NODE_ENV === 'production'
          ? 'Search is unavailable right now. Reload the page to try again.'
          : 'No search index yet. Run "npm run build" once: the dev server uses the index of the last build.'}
      </p>
    );
  } else if (!hasQuery) {
    body = (
      <div className={styles.message}>
        <p>Search guides, API operations and the changelog.</p>
        <div className={styles.suggestions}>
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              className={styles.suggestion}
              onClick={() => {
                setQuery(suggestion);
                input.current?.focus();
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    );
  } else if (!index) {
    body = <p className={styles.message}>Loading search index…</p>;
  } else if (!items.length) {
    body = (
      <p className={styles.message}>
        No results for <strong>“{query.trim()}”</strong>
        {kind ? ` in ${KINDS.find((entry) => entry.kind === kind)?.label}` : ''}. Check the spelling or use fewer words.
      </p>
    );
  } else {
    let position = 0;

    body = results?.pages.map((page) => {
      const rows = items.filter((item) => item.page === page);

      return (
        <div key={page.url} className={styles.group}>
          {rows.map((item) => row(item, position++))}
        </div>
      );
    });
  }

  const counts = results?.counts ?? {};
  const totalCount = Object.values(counts).reduce((sum, count) => sum + (count ?? 0), 0);

  return (
    <div className={styles.overlay} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div
        ref={dialog}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        onKeyDown={onKeyDown}
      >
        <div className={styles.inputRow}>
          <SearchIcon />
          <input
            ref={input}
            className={styles.input}
            type="search"
            role="combobox"
            aria-expanded={items.length > 0}
            aria-controls="search-results"
            aria-activedescendant={items.length ? `search-result-${selected}` : undefined}
            aria-autocomplete="list"
            aria-label="Search the documentation"
            placeholder="Search docs and APIs"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close search">
            Esc
          </button>
        </div>

        <div className={styles.filters} role="group" aria-label="Filter results">
          {KINDS.map((entry) => {
            const count = entry.kind ? counts[entry.kind] ?? 0 : totalCount;

            return (
              <button
                key={entry.label}
                type="button"
                aria-pressed={kind === entry.kind}
                className={clsx(styles.filter, kind === entry.kind && styles.filterActive)}
                onClick={() => {
                  setKind(entry.kind);
                  input.current?.focus();
                }}
              >
                {entry.label}
                {results && <span className={styles.count}>{count}</span>}
              </button>
            );
          })}
        </div>

        <div ref={list} id="search-results" className={styles.results} role="listbox" aria-label="Search results">
          {body}
        </div>

        <div className={styles.footer}>
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> to navigate
          </span>
          <span>
            <kbd>↵</kbd> to open
          </span>
          <span>
            <kbd>Esc</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SearchBar(): JSX.Element {
  const indexUrl = useBaseUrl('/search-index.json');
  const [isOpen, setIsOpen] = useState(false);
  const [shortcut, setShortcut] = useState('');
  const button = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    button.current?.focus();
  }, []);

  useEffect(() => {
    setShortcut(/Mac|iPhone|iPad/.test(navigator.platform) ? '⌘K' : 'Ctrl K');

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target?.tagName ?? '');

      if ((event.key === 'k' || event.key === 'K') && (event.metaKey || event.ctrlKey) && !event.altKey) {
        event.preventDefault();
        setIsOpen((value) => !value);
      } else if (event.key === '/' && !isTyping && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Start downloading the index as soon as a search is likely.
  const preload = () => {
    loadIndex(indexUrl).catch(() => undefined);
  };

  return (
    <div className="navbar__search">
      <button
        ref={button}
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(true)}
        onMouseEnter={preload}
        onFocus={preload}
        onTouchStart={preload}
        aria-label="Search"
        aria-keyshortcuts="Control+K Meta+K"
      >
        <SearchIcon />
        <span className={styles.triggerLabel}>Search</span>
        {shortcut && <kbd className={styles.triggerShortcut}>{shortcut}</kbd>}
      </button>
      {isOpen && createPortal(<SearchDialog indexUrl={indexUrl} onClose={close} />, document.body)}
    </div>
  );
}
