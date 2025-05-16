/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Link from '@docusaurus/Link';
import { ThemeClassNames } from '@docusaurus/theme-common';
import ApiSidebar from '@site/src/components/ApiSidebar';
import BlogLayout from '@theme/BlogLayout';
import type { Props } from '@theme/BlogPostPage';
import ChangelogItem from '@theme/ChangelogItem';
import ChangelogPaginator from '@theme/ChangelogPaginator';
import Layout from '@theme/Layout';
import Seo from '@theme/Seo';
import TOC from '@theme/TOC';
import React from 'react';

import styles from './styles.module.css';

function ChangelogPage(props: Props): JSX.Element {
  const { content: ChangelogContent, sidebar } = props;
  const { assets, metadata } = ChangelogContent;
  const { title, description, nextItem, prevItem, date, tags, authors, frontMatter } = metadata;
  const {
    hide_table_of_contents: hideTableOfContents,
    keywords,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
  } = frontMatter;

  const image = assets.image ?? frontMatter.image;

  return (
    <Layout
      title={title}
      description={description}
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogPostPage}
    >
      <ApiSidebar />
      <main className={styles.changelogBlogContainer}>
        <BlogLayout
          wrapperClassName={ThemeClassNames.wrapper.blogPages}
          pageClassName={ThemeClassNames.page.blogPostPage}
          sidebar={sidebar}
          hideNavBar="true"
          noFooter="true"
          toc={
            !hideTableOfContents && ChangelogContent.toc && ChangelogContent.toc.length > 0 ? (
              <TOC
                toc={ChangelogContent.toc}
                minHeadingLevel={tocMinHeadingLevel}
                maxHeadingLevel={tocMaxHeadingLevel}
              />
            ) : undefined
          }
        >
          <Seo title={title} description={description} keywords={keywords} image={image}>
            <meta property="og:type" content="article" />
            <meta property="article:published_time" content={date} />
            {authors.some((author) => author.url) && (
              <meta
                property="article:author"
                content={authors
                  .map((author) => author.url)
                  .filter(Boolean)
                  .join(',')}
              />
            )}
            {tags.length > 0 && <meta property="article:tag" content={tags.map((tag) => tag.label).join(',')} />}
          </Seo>

          <div style={{ marginBottom: '1rem' }}>
            <Link to={metadata.listPageLink || metadata.permalink || '/'}>
              ← Back to {metadata.blogTitle || 'Changelog Index'}
            </Link>
          </div>

          <ChangelogItem frontMatter={frontMatter} assets={assets} metadata={metadata} isBlogPostPage>
            <ChangelogContent />
          </ChangelogItem>

          {(nextItem || prevItem) && <ChangelogPaginator nextItem={nextItem} prevItem={prevItem} />}
        </BlogLayout>
      </main>
    </Layout>
  );
}

export default ChangelogPage;
