// src/components/ApiSidebar.tsx
import { useLocation } from '@docusaurus/router';
import DocPageStyles from '@docusaurus/theme-classic/lib-next/theme/DocPage/styles.module.css';Add
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

  const sidebar = specs.map((spec) => ({
    type: 'link',
    href: spec.routePath,
    label: spec.layout.title,
  }));

  const pathname = location.pathname;
  // Match /api/{api-name}/changelog or /api/{api-name}/changelog/... and extract /api/{api-name}
  const changelogMatch = pathname.match(/^\/api\/([^/]+)\/changelog(\/|$)/);
  const highlightPath = changelogMatch ? `/api/${changelogMatch[1]}` : pathname;

  return (
    <aside className={DocPageStyles.docSidebarContainer} role="complementary">
      <DocSidebar path={highlightPath} isHidden={false} onCollapse={() => null} sidebar={sidebar} />
    </aside>
  );
}
