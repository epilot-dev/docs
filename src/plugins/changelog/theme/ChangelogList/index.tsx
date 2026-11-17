import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BlogListPaginator from '@theme/BlogListPaginator';
import ChangelogEntries from '@theme/ChangelogEntries';
import React from 'react';

function ChangelogList(props): JSX.Element {
  const { metadata, items } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  // `permalink` is the page of the list: /api/changelog or /api/changelog/page/2
  const basePath = permalink.replace(/\/page\/\d+\/?$/, '').replace(/\/$/, '');

  return (
    <ChangelogEntries title={title} description={blogDescription} basePath={basePath} filter="all" items={items}>
      <BlogListPaginator metadata={metadata} />
    </ChangelogEntries>
  );
}

export default ChangelogList;
