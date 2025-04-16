/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ThemeClassNames } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BlogLayout from '@theme/BlogLayout';
import type { Props } from '@theme/BlogListPage';
import BlogListPaginator from '@theme/BlogListPaginator';
import BlogPostItem from '@theme/BlogPostItem';
import React from 'react';

function ChangelogList(props: Props): JSX.Element {
  const { metadata, items, sidebar } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;

  return (
    <BlogLayout
      title={title}
      description={blogDescription}
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogListPage}
      searchMetadata={{
        // assign unique search tag to exclude this page from search results!
        tag: 'blog_posts_list',
      }}
      sidebar={sidebar}
    >
      {items.map(({ content: BlogPostContent }) => (
        <BlogPostItem
          key={BlogPostContent.metadata.permalink}
          frontMatter={BlogPostContent.frontMatter}
          assets={BlogPostContent.assets}
          metadata={BlogPostContent.metadata}
          truncated={BlogPostContent.metadata.truncated}
        >
          <header>
            <h2>{BlogPostContent.metadata.title}</h2>
            <p>{BlogPostContent.metadata.date}</p>
          </header>
          <BlogPostContent />
        </BlogPostItem>
      ))}
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
}

export default ChangelogList;
