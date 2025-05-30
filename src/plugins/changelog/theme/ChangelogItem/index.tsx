/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Link from '@docusaurus/Link';
import { usePluralForm } from '@docusaurus/theme-common';
import Translate from '@docusaurus/Translate';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { blogPostContainerID } from '@docusaurus/utils-common';
import { MDXProvider } from '@mdx-js/react';
import type { Props } from '@theme/BlogPostItem';
import EditThisPage from '@theme/EditThisPage';
import MDXComponents from '@theme/MDXComponents';
import TagsListInline from '@theme/TagsListInline';
import clsx from 'clsx';
import React from 'react';

import styles from './styles.module.css';

// Very simple pluralization: probably good enough for now
function useReadingTimePlural() {
  const { selectMessage } = usePluralForm();

  return (readingTimeFloat: number) => {
    const readingTime = Math.ceil(readingTimeFloat);

    return selectMessage(
      readingTime,
      Translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One min read|{readingTime} min read',
        },
        { readingTime },
      ),
    );
  };
}

function ChangelogItem(props: Props): JSX.Element {
  const readingTimePlural = useReadingTimePlural();
  const { withBaseUrl } = useBaseUrlUtils();
  const { children, frontMatter, assets, metadata, truncated, isBlogPostPage = false } = props;
  const { date, formattedDate, permalink, tags, readingTime, title, editUrl } = metadata;

  const image = assets.image ?? frontMatter.image;
  const truncatedPost = !isBlogPostPage && truncated;
  const tagsExists = tags.length > 0;
  const TitleHeading = isBlogPostPage ? 'h1' : 'h2';

  return (
    <article
      className={!isBlogPostPage ? 'margin-bottom--xl' : undefined}
      itemProp="blogPost"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <header>
        <TitleHeading className={styles.blogPostTitle} itemProp="headline">
          {isBlogPostPage ? (
            title
          ) : (
            <Link itemProp="url" to={permalink}>
              {title}
            </Link>
          )}
        </TitleHeading>
        <div className={clsx(styles.blogPostData, 'margin-vert--md')}>
          <time dateTime={date} itemProp="datePublished">
            {formattedDate}
          </time>

          {typeof readingTime !== 'undefined' && (
            <>
              {' · '}
              {readingTimePlural(readingTime)}
            </>
          )}
        </div>
      </header>

      {image && <meta itemProp="image" content={withBaseUrl(image, { absolute: true })} />}

      <div
        // This ID is used for the feed generation to locate the main content
        id={isBlogPostPage ? blogPostContainerID : undefined}
        className="markdown"
        itemProp="articleBody"
      >
        <MDXProvider components={MDXComponents}>{children}</MDXProvider>
      </div>

      {(tagsExists || truncated) && (
        <footer
          className={clsx('row docusaurus-mt-lg', {
            [styles.blogPostDetailsFull]: isBlogPostPage,
          })}
        >
          {tagsExists && (
            <div className={clsx('col', { 'col--9': truncatedPost })}>
              <TagsListInline tags={tags} />
            </div>
          )}

          {isBlogPostPage && editUrl && (
            <div className="col margin-top--sm">
              <EditThisPage editUrl={editUrl} />
            </div>
          )}

          {truncatedPost && (
            <div
              className={clsx('col text--right', {
                'col--3': tagsExists,
              })}
            >
              <Link to={metadata.permalink} aria-label={`Read more about ${title}`}>
                <b>
                  <Translate
                    id="theme.blog.post.readMore"
                    description="The label used in blog post item excerpts to link to full blog posts"
                  >
                    Read More
                  </Translate>
                </b>
              </Link>
            </div>
          )}
        </footer>
      )}
    </article>
  );
}

export default ChangelogItem;
