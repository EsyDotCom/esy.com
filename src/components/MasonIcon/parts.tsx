'use client';

/* Shared pieces of the Mason-as-an-icon takes: a real 16-px raster blown up,
   a browser tab strip, and a phone home screen. Each takes an image src, so a
   flat SVG mark and a vinyl render can sit in the same mock. */

import { useEffect, useRef } from 'react';
import type { Mode } from './icons';

/** A real 16 × 16 rasterisation of an icon, blown up so each pixel shows. */
export function Pixels({ src, size = 16 }: { src: string; size?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      const ctx = ref.current?.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, size, size);
    };
    img.src = src;
  }, [src, size]);
  return <canvas ref={ref} width={size} height={size} className="mi-pixels" aria-hidden />;
}

/** A browser tab strip at real size, with the given icon on the Esy tabs. */
export function TabStrip({ src, mode }: { src: string; mode: Mode }) {
  const tabs = [
    { icon: src, title: 'AI Marketing News · Esy', active: true },
    { icon: src, title: 'Compose · Esy' },
    { icon: null, title: 'Search Console' },
    { icon: null, title: 'Inbox (3)' },
  ];
  return (
    <div className={`mi-strip is-${mode}`}>
      {tabs.map((t) => (
        <div key={t.title} className={`mi-tab${t.active ? ' is-active' : ''}`}>
          {t.icon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={t.icon} width={16} height={16} alt="" />
          ) : (
            <span className="mi-tab-blank" aria-hidden />
          )}
          <span className="mi-tab-title">{t.title}</span>
          <span className="mi-tab-x" aria-hidden>×</span>
        </div>
      ))}
      <span className="mi-tab-plus" aria-hidden>+</span>
    </div>
  );
}

const APPS = ['Mail', 'Calendar', 'Photos', 'Notes', 'Maps', 'Music', 'Esy', 'Camera', 'Clock', 'Files', 'Weather', 'Settings'];
const TINTS = ['#3D7BF6', '#F25C54', '#F2C230', '#8E8E93', '#34C759', '#AF52DE', '', '#5AC8FA', '#1C1C1E', '#0A84FF', '#64D2FF', '#636366'];

/**
 * A phone's home screen with `src` as the Esy app icon; the other apps are
 * blank samples. `real` draws it at iPhone scale (60-pt icons in a 390-pt
 * screen, iOS's corner mask) instead of the compact mock.
 */
export function Phone({ src, label, real = false }: { src: string; label: string; real?: boolean }) {
  return (
    <figure className={`mi-phone${real ? ' is-real' : ''}`}>
      <div className="mi-phone-screen">
        {APPS.map((a, i) => (
          <div key={a} className="mi-app">
            {a === 'Esy' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt="" className="mi-app-icon" />
            ) : (
              <span className="mi-app-icon" style={{ background: TINTS[i] }} />
            )}
            <span>{a}</span>
          </div>
        ))}
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}
