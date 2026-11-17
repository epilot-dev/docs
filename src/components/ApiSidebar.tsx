// src/components/ApiSidebar.tsx
import { useLocation } from '@docusaurus/router';
import DocPageStyles from '@docusaurus/theme-classic/lib-next/theme/DocPage/styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import DocSidebar from '@theme/DocSidebar';
import React from 'react';

interface Spec {
  layout: {
    title: string;
  };
  routePath: string;
  specUrl: string;
}

export default function ApiSidebar() {
  const location = useLocation();
  const { siteConfig } = useDocusaurusContext();

  const redocusaurusOpts = siteConfig.presets.find((preset) => preset[0] === 'redocusaurus');
  const specs: Spec[] = redocusaurusOpts?.[1]?.['specs'] ?? [];

  // Tier 2 APIs (see redoc.config.js) are grouped below the core APIs, collapsed.
  const moreApiPaths = (siteConfig.customFields?.moreApiPaths ?? []) as string[];
  const toLink = (spec: Spec) => ({ type: 'link', href: spec.routePath, label: spec.layout.title });
  const coreApis = specs.filter((spec) => !moreApiPaths.includes(spec.routePath));
  const moreApis = specs.filter((spec) => moreApiPaths.includes(spec.routePath));

  const sidebar = [
    { type: 'link', href: '/api', label: 'Getting Started' },
    { type: 'link', href: '/api/changelog', label: 'Changelog' },
    ...coreApis.map(toLink),
    ...(moreApis.length > 0
      ? [{ type: 'category', label: 'More APIs', collapsible: true, collapsed: true, items: moreApis.map(toLink) }]
      : []),
  ];

  return (
    <aside className={DocPageStyles.docSidebarContainer} role="complementary">
      <DocSidebar path={location.pathname} isHidden={false} onCollapse={() => null} sidebar={sidebar} />
    </aside>
  );
}
