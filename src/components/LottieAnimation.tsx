import React, { useEffect, useRef } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

type Props = {
  /** Path to the Lottie JSON below /static, e.g. "/animations/agent-toolkit-facade.json" */
  src: string;
  ariaLabel: string;
  maxWidth?: number;
};

/**
 * Renders a looping Lottie animation. lottie-web is loaded lazily on the
 * client only, and playback starts when the animation scrolls into view.
 */
export default function LottieAnimation({ src, ariaLabel, maxWidth = 960 }: Props): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const url = useBaseUrl(src);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let animation: { destroy: () => void; play: () => void; pause: () => void } | null = null;
    let observer: IntersectionObserver | null = null;
    let cancelled = false;

    Promise.all([import('lottie-web'), fetch(url).then((r) => r.json())]).then(
      ([lottieModule, animationData]) => {
        if (cancelled) return;
        const lottie = lottieModule.default;
        animation = lottie.loadAnimation({
          container,
          renderer: 'svg',
          loop: true,
          autoplay: false,
          animationData,
        });
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!animation) return;
              if (entry.isIntersecting) animation.play();
              else animation.pause();
            });
          },
          { threshold: 0.25 }
        );
        observer.observe(container);
      }
    );

    return () => {
      cancelled = true;
      observer?.disconnect();
      animation?.destroy();
    };
  }, [url]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={ariaLabel}
      style={{
        maxWidth,
        margin: '1.5rem auto',
        borderRadius: 14,
        overflow: 'hidden',
        border: '1px solid var(--ifm-color-emphasis-200)',
        background: '#fff',
      }}
    />
  );
}
