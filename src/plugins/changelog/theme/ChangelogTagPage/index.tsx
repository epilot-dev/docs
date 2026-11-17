import ChangelogEntries from '@theme/ChangelogEntries';
import React from 'react';

const PAGES = {
  Breaking: {
    title: 'API Changelog: Breaking Changes',
    description:
      'Entries with a breaking change to a core epilot API, newest first. Other changes of the same entry are listed with it.',
  },
  Deprecated: {
    title: 'API Changelog: Deprecations',
    description:
      'Entries that deprecate part of a core epilot API, newest first. Other changes of the same entry are listed with it.',
  },
};

/** The changelog entries of one change type, e.g. /api/changelog/tags/breaking. */
function ChangelogTagPage(props): JSX.Element {
  const { metadata, items } = props;
  const { name, allTagsPath } = metadata;
  const page = PAGES[name] || { title: `API Changelog: ${name}`, description: `Changelog entries tagged ${name}.` };
  const basePath = allTagsPath.replace(/\/tags\/?$/, '');

  return (
    <ChangelogEntries
      title={page.title}
      description={page.description}
      basePath={basePath}
      filter={name.toLowerCase()}
      items={items}
    />
  );
}

export default ChangelogTagPage;
