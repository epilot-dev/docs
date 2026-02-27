import Link from '@docusaurus/Link';
import React from 'react';

import styles from './ExplorePlatform.module.css';

/* Inline SVG icons — Lucide-style, 24x24, currentColor */

const LayersIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const DatabaseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const RouteIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="6" cy="19" r="3" />
    <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
    <circle cx="18" cy="5" r="3" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const FileTextIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const ZapIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const GitBranchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="6" y1="3" x2="6" y2="15" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 9a9 9 0 0 1-9 9" />
  </svg>
);

const CopyIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const TagIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const PlugIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const GridSmallIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const PencilIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

interface PlatformItem {
  label: string;
  href: string;
  description: string;
  icon: React.ReactNode;
}

interface PlatformGroup {
  title: string;
  items: PlatformItem[];
}

const groups: PlatformGroup[] = [
  {
    title: 'Core Platform',
    items: [
      {
        label: 'Architecture',
        href: '/docs/architecture/overview',
        description: 'Microservices, SDK, and system design',
        icon: <LayersIcon />,
      },
      {
        label: 'Auth & Security',
        href: '/docs/auth/access-tokens',
        description: 'Access tokens, SSO, and permissions',
        icon: <ShieldIcon />,
      },
      {
        label: 'Entities',
        href: '/docs/entities/flexible-entities',
        description: 'Flexible data model with schemas and relations',
        icon: <DatabaseIcon />,
      },
    ],
  },
  {
    title: 'Customer Experience',
    items: [
      {
        label: 'Journeys',
        href: '/docs/journeys/embedding',
        description: 'Embeddable forms and multi-step flows',
        icon: <RouteIcon />,
      },
      {
        label: 'Portals',
        href: '/docs/portals/customer-portal',
        description: 'Self-service portals for end customers',
        icon: <GlobeIcon />,
      },
      {
        label: 'Messaging',
        href: '/docs/messaging/email-settings',
        description: 'Email, threads, and inbox management',
        icon: <MailIcon />,
      },
      {
        label: 'Templates',
        href: '/docs/templates/document-templates',
        description: 'Document and email template engine',
        icon: <FileTextIcon />,
      },
    ],
  },
  {
    title: 'Process & Automation',
    items: [
      {
        label: 'Automation',
        href: '/docs/automation/architecture',
        description: 'Triggers, actions, and entity mapping',
        icon: <ZapIcon />,
      },
      {
        label: 'Workflows',
        href: '/docs/workflows/intro',
        description: 'Stateful business processes and phases',
        icon: <GitBranchIcon />,
      },
      {
        label: 'Blueprints',
        href: '/docs/blueprints/intro',
        description: 'Reusable configuration packages',
        icon: <CopyIcon />,
      },
    ],
  },
  {
    title: 'Commerce & Integrations',
    items: [
      {
        label: 'Pricing',
        href: '/docs/pricing/entities',
        description: 'Products, catalogs, and pricing models',
        icon: <TagIcon />,
      },
      {
        label: 'Integrations',
        href: '/docs/integrations/webhooks',
        description: 'Webhooks, events, and third-party APIs',
        icon: <PlugIcon />,
      },
      {
        label: 'Apps',
        href: '/docs/apps',
        description: 'Custom apps for the epilot marketplace',
        icon: <GridSmallIcon />,
      },
      {
        label: 'Notes',
        href: '/docs/notes/intro',
        description: 'Structured notes and annotations',
        icon: <PencilIcon />,
      },
    ],
  },
];

export default function ExplorePlatform(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Explore the platform</h2>
        <p className={styles.sectionSubtitle}>Dive into the building blocks of epilot</p>
        <div className={styles.groupGrid}>
          {groups.map((group) => (
            <div key={group.title} className={styles.group}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <ul className={styles.itemList}>
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link to={item.href} className={styles.item}>
                      <span className={styles.itemIcon}>{item.icon}</span>
                      <div>
                        <span className={styles.itemLabel}>{item.label}</span>
                        <span className={styles.itemDesc}>{item.description}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
