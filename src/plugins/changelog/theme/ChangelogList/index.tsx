/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ThemeClassNames } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ApiSidebar from '@site/src/components/ApiSidebar';
import BlogLayout from '@theme/BlogLayout';
import type { Props } from '@theme/BlogListPage';
import BlogListPaginator from '@theme/BlogListPaginator';
import BlogPostItem from '@theme/BlogPostItem';
import Layout from '@theme/Layout';
import React from 'react';

import styles from './styles.module.css';

function ChangelogList(props: Props): JSX.Element {
  const { metadata, items, sidebar } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;

  return (
    <Layout
      title={title}
      description={blogDescription}
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogListPage}
    >
      <ApiSidebar />
      <main className={styles.changelogBlogContainer}>
        <BlogLayout
          title={title}
          description={blogDescription}
          wrapperClassName={ThemeClassNames.wrapper.blogPages}
          pageClassName={ThemeClassNames.page.blogListPage}
          searchMetadata={{ tag: 'blog_posts_list' }}
          sidebar={sidebar}
          hideNavBar
          noFooter
        >
          <a href={permalink.replace(/\/changelog.*/, '')} style={{ display: 'inline-block', marginBottom: 16 }}>
            ← Back to API definition
          </a>
          <h1>{title}</h1>
          {items.map(({ content: BlogPostContent }) => {
            const meta = BlogPostContent.metadata;
            if (!meta) return null;

            return (
              <BlogPostItem
                key={meta.permalink}
                frontMatter={BlogPostContent.frontMatter}
                assets={BlogPostContent.assets}
                metadata={meta}
                truncated={meta.truncated}
              >
                <header>
                  <h2>{meta.title}</h2>
                </header>
                <BlogPostContent truncated />
              </BlogPostItem>
            );
          })}
          <BlogListPaginator metadata={metadata} />
        </BlogLayout>
      </main>
    </Layout>
  );
}

export default ChangelogList;
