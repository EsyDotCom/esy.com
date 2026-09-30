'use client';

/* A number that counts up once it scrolls into view (E · Live). The real value
 * is in the HTML from the start, and people who ask for reduced motion see it
 * still. Ranges like "250–1,000" count each end. */
import { useEffect, useRef, useState } from 'react';

const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

export default function CountUp({ value, ms = 1400 }: { value: string; ms?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const targets = value.split('–').map((v) => Number(v.replace(/,/g, '')));
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || targets.some(Number.isNaN)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / ms);
          const e = 1 - Math.pow(1 - p, 3); // ease out
          setShown(targets.map((t) => fmt(t * e)).join('–'));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // targets comes from value; recount only when the value changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, ms]);

  return <span ref={ref}>{shown}</span>;
}
