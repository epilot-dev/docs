import { MDXProvider } from '@mdx-js/react';
import React from 'react';

// Change type tags are written to the generated MDX as inline code (`tag:new|New`),
// see ../../format.js. A paragraph that starts with a JSX tag would be parsed as JSX
// to its end, which breaks on text like `List<Text>`.
const TAG = /^tag:([a-z]+)\|(.+)$/;

function InlineCode(props: React.HTMLAttributes<HTMLElement>): JSX.Element {
  const tag = typeof props.children === 'string' ? props.children.match(TAG) : null;

  if (tag) {
    return <span className={`changelog-tag changelog-tag--${tag[1]}`}>{tag[2]}</span>;
  }

  return <code {...props} />;
}

const components = { inlineCode: InlineCode };

/** Renders the MDX of changelog entries, with change type tags. */
function ChangelogContent({ children }: { children: React.ReactNode }): JSX.Element {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}

export default ChangelogContent;
