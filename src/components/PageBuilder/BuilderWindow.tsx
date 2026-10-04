'use client';

/* The page builder as a window: its full-screen page (the raw route) in an
 * iframe at a fixed desktop size, scaled to fit like a screenshot you can use
 * (the pattern in docs/prototypes/README.md). The iframe gives the builder a
 * real 1440-wide viewport, so os.esy.com's own breakpoints never stack it on
 * a small screen. */

import { useLayoutEffect, useRef, useState } from 'react';
import './preview.css';

const DESIGN_WIDTH = 1440;

export function BuilderWindow({ src, url, height = 860 }: { src: string; url: string; height?: number }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.8);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const fit = () => setScale(Math.min(1, el.clientWidth / DESIGN_WIDTH));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="pbw-frame">
      <div className="pbw-chrome">
        <span className="pbw-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="pbw-url" aria-hidden="true">{url}</span>
        <a className="pbw-full" href={src} target="_blank" rel="noopener">Open full screen ↗</a>
      </div>
      <div className="pbw-viewport" ref={viewportRef} style={{ height: height * scale }}>
        <iframe
          className="pbw-iframe"
          src={src}
          title="The page builder, working"
          style={{ width: DESIGN_WIDTH, height, transform: `scale(${scale})` }}
        />
      </div>
    </div>
  );
}
