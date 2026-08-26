import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';

/**
 * The Agent Toolkit section of the docs overview page. Rendered as a component
 * (instead of plain markdown) so the internal SHOW_AGENT_TOOLKIT flag hides it
 * everywhere at once — the rendered page, the search index, and llms.txt.
 */
export default function AgentToolkitPromo(): JSX.Element | null {
  const { siteConfig } = useDocusaurusContext();

  if (!siteConfig.customFields?.showAgentToolkit) {
    return null;
  }

  return (
    <>
      <h2>Agent Toolkit</h2>
      <p>
        Give Codex, ChatGPT, or Claude focused epilot development knowledge plus live access to current docs, APIs, UI
        components, and connected-organization context.
      </p>
      <a className="button button--primary" href="/agent-toolkit">
        Explore the Agent Toolkit
      </a>
    </>
  );
}
