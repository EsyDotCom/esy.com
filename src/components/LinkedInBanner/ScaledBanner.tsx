'use client';

/**
 * ScaledBanner — shows a 1584×396 banner at whatever width its container has,
 * scaled like a screenshot (the prototype pattern's step 3), so the preview is
 * the exact artwork, never a reflowed copy. `safeZone` outlines the areas
 * LinkedIn covers with the profile photo.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { BANNER_SIZE } from './size';

export default function ScaledBanner({
  children,
  safeZone = false,
  className = '',
}: {
  children: ReactNode;
  safeZone?: boolean;
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  // Track the container's width; the canvas scales to fill it.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / BANNER_SIZE.width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={box} className={`lib-fit ${className}`} style={{ aspectRatio: `${BANNER_SIZE.width} / ${BANNER_SIZE.height}` }}>
      <div className="lib-fit-inner" style={{ transform: `scale(${scale})`, visibility: scale ? 'visible' : 'hidden' }}>
        {children}
        {/* Where the photo lands: desktop (solid) and the phone app (dashed), in banner px. */}
        {safeZone && (
          <>
            <span className="lib-zone lib-zone--desk" aria-hidden="true">
              <b>Photo on desktop</b>
            </span>
            <span className="lib-zone lib-zone--phone" aria-hidden="true">
              <b>Photo in the app</b>
            </span>
          </>
        )}
      </div>
    </div>
  );
}
