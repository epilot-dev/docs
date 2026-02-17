import mermaid from 'mermaid';
import React, { useEffect, useRef, useState, useMemo } from 'react';

let idCounter = 0;
let initialized = false;

const getTheme = (html, config) => {
  const htmlTheme = html?.getAttribute('data-theme') ?? 'light';
  const defaultTheme = htmlTheme === 'dark' ? 'dark' : 'default';

  return config?.theme?.[htmlTheme] ?? config?.mermaid?.theme ?? defaultTheme;
};

const Mermaid = ({ chart, config: configSrc }) => {
  const containerRef = useRef(null);
  const idRef = useRef(`mermaid-${idCounter++}`);
  const [svg, setSvg] = useState('');

  const config = useMemo(() => (typeof configSrc === 'string' ? JSON.parse(configSrc) : configSrc), [configSrc]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const html = document.querySelector('html');
    const theme = getTheme(html, config);

    if (!initialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme,
        ...(config?.mermaid || {}),
      });
      initialized = true;
    }

    const render = async () => {
      try {
        const { svg: renderedSvg } = await mermaid.render(idRef.current, chart);
        setSvg(renderedSvg);
      } catch (e) {
        console.error('Mermaid rendering failed:', e);
      }
    };

    render();
  }, [chart, config]);

  // Re-render on theme change
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const html = document.querySelector('html');

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type !== 'attributes' || mutation.attributeName !== 'data-theme') continue;

        const theme = getTheme(html, config);
        initialized = false;
        mermaid.initialize({
          startOnLoad: false,
          theme,
          ...(config?.mermaid || {}),
        });
        initialized = true;

        idRef.current = `mermaid-${idCounter++}`;
        mermaid.render(idRef.current, chart).then(({ svg: renderedSvg }) => {
          setSvg(renderedSvg);
        });
        break;
      }
    });

    observer.observe(html, { attributes: true });

    return () => observer.disconnect();
  }, [chart, config]);

  if (typeof window === 'undefined') {
    return <div className="mermaid">{chart}</div>;
  }

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: svg }} />;
};

export { Mermaid };
