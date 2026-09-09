import React from 'react';

/* Minimal 24x24 stroke glyphs (Lucide-style). Rendered with currentColor. */

const base = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const icons: Record<string, JSX.Element> = {
  rocket: (
    <svg {...base}>
      <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2" />
      <path d="M14 4c3-1 6 0 7 1s0 4-1 7c-2 4-7 8-9 8l-4-4c0-2 4-7 7-9z" />
      <circle cx="15" cy="9" r="1.5" />
    </svg>
  ),
  sandbox: (
    <svg {...base}>
      <path d="M3 8l9-4 9 4-9 4-9-4z" />
      <path d="M3 8v8l9 4 9-4V8" />
      <path d="M12 12v8" />
    </svg>
  ),
  terminal: (
    <svg {...base}>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  dev: (
    <svg {...base}>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M9 9l-2 2 2 2M15 9l2 2-2 2" />
    </svg>
  ),
  agent: (
    <svg {...base}>
      <path d="M12 3v3" />
      <rect x="4" y="6" width="16" height="12" rx="3" />
      <circle cx="9" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <path d="M9 15.5h6" />
    </svg>
  ),
  journey: (
    <svg {...base}>
      <circle cx="6" cy="19" r="2.5" />
      <path d="M8.5 19h8a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="2.5" />
    </svg>
  ),
  page: (
    <svg {...base}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 9v11" />
    </svg>
  ),
  entity: (
    <svg {...base}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 7h.01M11 7h.01" />
      <rect x="7" y="13" width="10" height="4" rx="1" />
    </svg>
  ),
  portal: (
    <svg {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
    </svg>
  ),
  flow: (
    <svg {...base}>
      <rect x="3" y="3" width="6" height="6" rx="1.5" />
      <rect x="15" y="15" width="6" height="6" rx="1.5" />
      <path d="M9 6h4a3 3 0 0 1 3 3v6" />
    </svg>
  ),
  catalog: (
    <svg {...base}>
      <path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" />
      <path d="M7 7h.01" />
    </svg>
  ),
  manifest: (
    <svg {...base}>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  ),
  fn: (
    <svg {...base}>
      <path d="M8 4c-2 0-3 1-3 3v10c0 2 1 3 3 3" />
      <path d="M16 4c2 0 3 1 3 3v10c0 2-1 3-3 3" />
      <path d="M10 15l4-6" />
    </svg>
  ),
  proxy: (
    <svg {...base}>
      <rect x="3" y="7" width="5" height="10" rx="1.5" />
      <rect x="16" y="7" width="5" height="10" rx="1.5" />
      <path d="M8 12h8" />
      <path d="M13 9.5l3 2.5-3 2.5" />
    </svg>
  ),
  bridge: (
    <svg {...base}>
      <path d="M3 18V10a9 9 0 0 1 18 0v8" />
      <path d="M3 14h18M8 14v4M12 14v4M16 14v4" />
    </svg>
  ),
  shield: (
    <svg {...base}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  settings: (
    <svg {...base}>
      <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="10" cy="17" r="2" />
    </svg>
  ),
  lock: (
    <svg {...base}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  ),
  version: (
    <svg {...base}>
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  ),
  check: (
    <svg {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  ),
  list: (
    <svg {...base}>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M8 12h8M8 16h5" />
    </svg>
  ),
  guide: (
    <svg {...base}>
      <circle cx="12" cy="12" r="9" />
      <polygon points="16 8 14 14 8 16 10 10 16 8" />
    </svg>
  ),
  api: (
    <svg {...base}>
      <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 5l-4 14" />
    </svg>
  ),
};

/* Larger header illustrations for feature cards. Palette is driven by CSS classes. */

interface ArtProps {
  surface: string;
  line: string;
  accentId: string;
}

export const featureArt: Record<string, (p: ArtProps) => JSX.Element> = {
  quickstart: ({ surface, line, accentId }) => (
    <svg viewBox="0 0 240 120" fill="none" aria-hidden="true">
      <rect x="24" y="14" width="192" height="92" rx="10" className={surface} />
      <rect x="24" y="14" width="192" height="22" rx="10" className={line} opacity="0.6" />
      <circle cx="38" cy="25" r="3" className={line} />
      <circle cx="49" cy="25" r="3" className={line} />
      <circle cx="60" cy="25" r="3" className={line} />
      <text x="40" y="58" fontFamily="ui-monospace, Menlo, monospace" fontSize="11" fill={`url(#${accentId})`}>
        $
      </text>
      <rect x="52" y="49" width="110" height="9" rx="4.5" className={line} />
      <text x="40" y="76" fontFamily="ui-monospace, Menlo, monospace" fontSize="11" fill={`url(#${accentId})`}>
        $
      </text>
      <rect x="52" y="67" width="80" height="9" rx="4.5" className={line} />
      <rect x="40" y="86" width="60" height="9" rx="4.5" fill={`url(#${accentId})`} />
      <circle cx="190" cy="80" r="14" fill={`url(#${accentId})`} fillOpacity="0.18" />
      <path
        d="M183 80l5 5 9-10"
        stroke={`url(#${accentId})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  sandbox: ({ surface, line, accentId }) => (
    <svg viewBox="0 0 240 120" fill="none" aria-hidden="true">
      <rect x="32" y="30" width="176" height="76" rx="12" className={surface} />
      <path d="M32 54h176" className={line} strokeWidth="1.5" stroke="currentColor" opacity="0.4" />
      <rect x="48" y="66" width="40" height="26" rx="6" className={line} />
      <rect x="100" y="66" width="40" height="26" rx="6" className={line} />
      <rect x="152" y="66" width="40" height="26" rx="6" fill={`url(#${accentId})`} fillOpacity="0.9" />
      <rect x="48" y="38" width="54" height="8" rx="4" fill={`url(#${accentId})`} />
      <g transform="translate(150 6)">
        <path
          d="M20 0l20 10v22L20 42 0 32V10z"
          className={surface}
          stroke={`url(#${accentId})`}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M0 10l20 10 20-10M20 20v22" stroke={`url(#${accentId})`} strokeWidth="2" strokeLinejoin="round" />
      </g>
    </svg>
  ),
};
