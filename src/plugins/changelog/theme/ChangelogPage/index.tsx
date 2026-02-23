import Link from '@docusaurus/Link';
import DocPageStyles from '@docusaurus/theme-classic/lib-next/theme/DocPage/styles.module.css';
import { ThemeClassNames, useWindowSize } from '@docusaurus/theme-common';
import ApiSidebar from '@site/src/components/ApiSidebar';
import type { Props } from '@theme/BlogPostPage';
import ChangelogPaginator from '@theme/ChangelogPaginator';
import Layout from '@theme/Layout';
import TOC from '@theme/TOC';
import React from 'react';

import styles from './styles.module.css';

function ChangelogPage(props: Props): JSX.Element {
  const { content: ChangelogContent } = props;
  const { metadata, toc } = ChangelogContent;
  const { title, nextItem, prevItem } = metadata;

  const windowSize = useWindowSize();
  const renderTocDesktop = toc && toc.length > 0 && (windowSize === 'desktop' || windowSize === 'ssr');

  return (
    <Layout title={title} description={title} pageClassName={DocPageStyles.docPage}>
      <ApiSidebar />
      <main className={styles.changelogMain}>
        <div className="container padding-top--md padding-bottom--lg">
          <div className="row">
            <div className={`col ${renderTocDesktop ? styles.docItemCol : ''}`}>
              <article>
                <div className={`${ThemeClassNames.docs.docMarkdown} markdown`}>
                  <div style={{ marginBottom: '1rem' }}>
                    <Link to={metadata.listPageLink || '/api/changelog'}>← Back to Changelog</Link>
                  </div>
                  <header>
                    <h1 className={styles.changelogHeader}>{title}</h1>
                  </header>
                  <ChangelogContent />
                </div>
                {(nextItem || prevItem) && <ChangelogPaginator nextItem={nextItem} prevItem={prevItem} />}
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

export default ChangelogPage;
