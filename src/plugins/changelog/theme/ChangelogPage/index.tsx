/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ThemeClassNames } from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import type { Props } from '@theme/BlogPostPage';
import ChangelogItem from '@theme/ChangelogItem';
import ChangelogPaginator from '@theme/ChangelogPaginator';
import Seo from '@theme/Seo';
import TOC from '@theme/TOC';
import React from 'react';

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
    <BlogLayout
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogPostPage}
      sidebar={sidebar}
      toc={
        !hideTableOfContents && ChangelogContent.toc && ChangelogContent.toc.length > 0 ? (
          <TOC toc={ChangelogContent.toc} minHeadingLevel={tocMinHeadingLevel} maxHeadingLevel={tocMaxHeadingLevel} />
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

      <ChangelogItem frontMatter={frontMatter} assets={assets} metadata={metadata} isBlogPostPage>
        <ChangelogContent />
      </ChangelogItem>

      {(nextItem || prevItem) && <ChangelogPaginator nextItem={nextItem} prevItem={prevItem} />}
    </BlogLayout>
  );
}

export default ChangelogPage;
