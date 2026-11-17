import Link from '@docusaurus/Link';
import DocPageStyles from '@docusaurus/theme-classic/lib-next/theme/DocPage/styles.module.css';
import { ThemeClassNames, useWindowSize } from '@docusaurus/theme-common';
import ApiSidebar from '@site/src/components/ApiSidebar';
import ChangelogContent from '@theme/ChangelogContent';
import Layout from '@theme/Layout';
import TOC from '@theme/TOC';
import React from 'react';

import styles from './styles.module.css';

// The change types that have their own page, see `sectionTags` in ../../format.js.
const FILTERS = [
  { id: 'all', label: 'All changes', path: '' },
  { id: 'breaking', label: 'Breaking', path: '/tags/breaking' },
  { id: 'deprecated', label: 'Deprecated', path: '/tags/deprecated' },
];

type EntryMetadata = { title: string; formattedDate: string; permalink: string };

/** The MDX component of a changelog entry, as the blog plugin passes it. */
type Entry = React.ComponentType & { metadata?: EntryMetadata };

type Props = {
  title: string;
  description: string;
  /** Route of the changelog, without a trailing slash. */
  basePath: string;
  /** The filter this page shows. */
  filter: string;
  items: { content: Entry }[];
  children?: React.ReactNode;
};

function entryOf(meta: EntryMetadata) {
  const titleParts = meta.title.match(/^(\d{4}-\d{2}-\d{2})\s+(.+)$/);
  const date = titleParts ? titleParts[1] : meta.formattedDate;
  const apiName = titleParts ? titleParts[2] : meta.title;
  const id = titleParts
    ? `${titleParts[1]}-${titleParts[2]
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')}`
    : meta.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return { date, apiName, id };
}

const DATE_FORMAT = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' });

/** "2026-11-03" -> "November 3, 2026". Anything else is shown as it is. */
function formatDate(date: string): string {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? DATE_FORMAT.format(new Date(`${date}T00:00:00Z`)) : date;
}

/** Groups entries by date. Entries are sorted by date, so a group is a run of entries. */
function groupByDate(entries: { content: Entry }[]) {
  const groups: { date: string; entries: { Entry: Entry; apiName: string; id: string }[] }[] = [];

  for (const { content } of entries) {
    const { date, apiName, id } = entryOf(content.metadata);
    const last = groups[groups.length - 1];
    const group = last && last.date === date ? last : { date, entries: [] };
    if (group !== last) groups.push(group);
    group.entries.push({ Entry: content, apiName, id });
  }

  return groups;
}

/** A page of changelog entries: the changelog itself, or the entries of one change type. */
function ChangelogEntries({ title, description, basePath, filter, items, children }: Props): JSX.Element {
  const groups = groupByDate(items.filter(({ content }) => content.metadata));
  const toc = groups.map(({ date, entries }) => ({
    value: formatDate(date),
    id: date,
    level: 2,
    children: entries.map(({ apiName, id }) => ({ value: apiName, id, children: [], level: 3 })),
  }));

  const windowSize = useWindowSize();
  const renderTocDesktop = toc.length > 0 && (windowSize === 'desktop' || windowSize === 'ssr');

  return (
    <Layout title={title} description={description} pageClassName={DocPageStyles.docPage}>
      <ApiSidebar />
      <main className={styles.changelogMain}>
        <div className="container padding-top--md padding-bottom--lg">
          <div className="row">
            <div className={`col ${renderTocDesktop ? styles.docItemCol : ''}`}>
              <article>
                <div className={`${ThemeClassNames.docs.docMarkdown} markdown`}>
                  <header>
                    <h1>{title}</h1>
                  </header>
                  <p>
                    {description}{' '}
                    <a href={`${basePath}/rss.xml`} target="_blank">
                      Subscribe via RSS
                    </a>
                  </p>
                  <nav className={styles.filters} aria-label="Filter changes" data-search-ignore>
                    {FILTERS.map(({ id, label, path }) => (
                      <Link
                        key={id}
                        to={`${basePath}${path}`}
                        className={`${styles.filter} ${id === filter ? styles.filterActive : ''}`}
                        aria-current={id === filter ? 'page' : undefined}
                      >
                        {label}
                      </Link>
                    ))}
                  </nav>
                  {groups.map(({ date, entries }) => (
                    <section key={date} className={styles.day}>
                      <h2 id={date} className={styles.date}>
                        {formatDate(date)}
                      </h2>
                      {entries.map(({ Entry, apiName, id }) => (
                        <section key={Entry.metadata.permalink}>
                          <h3 id={id}>
                            <Link to={Entry.metadata.permalink} style={{ color: 'inherit' }}>
                              {apiName}
                            </Link>
                          </h3>
                          <ChangelogContent>
                            <Entry />
                          </ChangelogContent>
                        </section>
                      ))}
                    </section>
                  ))}
                </div>
                {children}
              </article>
            </div>
            {renderTocDesktop && (
              <div className="col col--3">
                <TOC toc={toc} className={ThemeClassNames.docs.docTocDesktop} />
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default ChangelogEntries;
