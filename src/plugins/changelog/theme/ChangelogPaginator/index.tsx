import Translate, { translate } from '@docusaurus/Translate';
import type { Props } from '@theme/BlogPostPaginator';
import PaginatorNavLink from '@theme/PaginatorNavLink';
import React from 'react';

export default function ChangelogPaginator(props: Props): JSX.Element {
  const { nextItem, prevItem } = props;

  return (
    <nav
      className="pagination-nav docusaurus-mt-lg"
      aria-label={translate({
        id: 'theme.changelog.post.paginator.navAriaLabel',
        message: 'Changelog navigation',
        description: 'The ARIA label for the changelog pagination',
      })}
    >
      {prevItem && (
        <PaginatorNavLink
          {...prevItem}
          subLabel={
            <Translate
              id="theme.changelog.post.paginator.newer"
              description="The changelog button label to navigate to newer changes"
            >
              Newer
            </Translate>
          }
        />
      )}
      {nextItem && (
        <PaginatorNavLink
          {...nextItem}
          subLabel={
            <Translate
              id="theme.changelog.post.paginator.older"
              description="The changelog button label to navigate to older changes"
            >
              Older
            </Translate>
          }
          isNext
        />
      )}
    </nav>
  );
}
