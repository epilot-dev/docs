import Link from '@docusaurus/Link';
import DocPageStyles from '@docusaurus/theme-classic/lib-next/theme/DocPage/styles.module.css';
import { ThemeClassNames, useWindowSize } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ApiSidebar from '@site/src/components/ApiSidebar';
import BlogListPaginator from '@theme/BlogListPaginator';
import Layout from '@theme/Layout';
import TOC from '@theme/TOC';
import React from 'react';

import styles from './styles.module.css';

function ChangelogList(props): JSX.Element {
  const { metadata, items } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;

  const toc = items
    .map(({ content: BlogPostContent }) => {
      const meta = BlogPostContent.metadata;
      if (!meta) return null;
      const titleParts = meta.title.match(/^(\d{4}-\d{2}-\d{2})\s+(.+)$/);
      const label = titleParts ? `${titleParts[1]} ${titleParts[2]}` : meta.title;
      const slug = titleParts
        ? `${titleParts[1]}-${titleParts[2].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
        : meta.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      return { value: label, id: slug, children: [], level: 2 };
    })
    .filter(Boolean);

  const windowSize = useWindowSize();
  const renderTocDesktop = toc.length > 0 && (windowSize === 'desktop' || windowSize === 'ssr');

  return (
    <Layout title={title} description={blogDescription} pageClassName={DocPageStyles.docPage}>
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
                    {blogDescription}{' '}
                    <a href={permalink.replace(/\/$/, '') + '/rss.xml'} target="_blank">
                      Subscribe via RSS
                    </a>
                  </p>
                  {items.map(({ content: BlogPostContent }) => {
                    const meta = BlogPostContent.metadata;
                    if (!meta) return null;

                    const titleParts = meta.title.match(/^(\d{4}-\d{2}-\d{2})\s+(.+)$/);
                    const date = titleParts ? titleParts[1] : meta.formattedDate;
                    const apiName = titleParts ? titleParts[2] : meta.title;
                    const anchorId = titleParts
                      ? `${titleParts[1]}-${titleParts[2].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
                      : meta.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

                    return (
                      <section key={meta.permalink}>
                        <h2 id={anchorId}>
                          <Link to={meta.permalink} style={{ color: 'inherit' }}>
                            {date} {apiName}
                          </Link>
                        </h2>
                        <BlogPostContent />
                      </section>
                    );
                  })}
                </div>
                <BlogListPaginator metadata={metadata} />
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

export default ChangelogList;
