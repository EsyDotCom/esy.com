'use client';

/**
 * @diagram-contract
 * @diagram D2-slow-parade
 * @domain geological-biology
 *
 * @invariant DISTANCE_ACCURACY
 *   per-year distances verified: drift 0.025m, fingernail 0.038m, hair 0.15m, glacier 100m
 *   validation: values traceable to USGS, dermatology literature, glaciology textbooks
 *
 * @invariant TIME_SCALE_MULTIPLIER
 *   1yr = 1x, 100yr = 100x, 1Myr = 1,000,000x — linear multiplier on distance
 *   validation: displayed distances = perYear_m * multiplier
 *
 * @invariant SVG_BAR_PROPORTIONALITY
 *   SVG rect width proportional to distance within current time scale
 *   validation: longest bar fills track, others are proportional
 */

import { useState, useEffect, useRef } from 'react';

interface SlowSpeed {
  name: string;
  perYear_m: number;
  category: 'geological' | 'biological';
  description: string;
}

const SLOW_SPEEDS: SlowSpeed[] = [
  { name: 'Continental Drift', perYear_m: 0.025, category: 'geological', description: 'North America ↔ Europe' },
  { name: 'Fingernail Growth', perYear_m: 0.038, category: 'biological', description: 'Average human rate' },
  { name: 'Hair Growth', perYear_m: 0.15, category: 'biological', description: 'Scalp hair avg.' },
  { name: 'Glacier Flow', perYear_m: 100, category: 'geological', description: 'Typical valley glacier' },
];

const CATEGORY_COLORS: Record<string, string> = {
  geological: '#C4923A',
  biological: '#34A853',
};

const TIME_SCALES = [
  { key: '1yr' as const, label: '1 Year', multiplier: 1 },
  { key: '100yr' as const, label: '100 Years', multiplier: 100 },
  { key: '1Myr' as const, label: '1 Million Years', multiplier: 1_000_000 },
];

type TimeScaleKey = '1yr' | '100yr' | '1Myr';

function formatDistance(meters: number): string {
  if (meters >= 1_000_000) return `${(meters / 1_000).toFixed(0)} km`;
  if (meters >= 1_000) return `${(meters / 1_000).toFixed(1)} km`;
  if (meters >= 1) return `${meters.toFixed(1)} m`;
  if (meters >= 0.01) return `${(meters * 100).toFixed(1)} cm`;
  return `${(meters * 1000).toFixed(1)} mm`;
}

export default function SlowParadeViz() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [timeScale, setTimeScale] = useState<TimeScaleKey>('1yr');
  const [animatedWidths, setAnimatedWidths] = useState<number[]>(SLOW_SPEEDS.map(() => 0));
  const animRef = useRef<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Animate bar widths on time scale change
  useEffect(() => {
    if (!isVisible) return;

    const multiplier = TIME_SCALES.find(s => s.key === timeScale)!.multiplier;
    const values = SLOW_SPEEDS.map(s => s.perYear_m * multiplier);
    const maxVal = Math.max(...values);
    const targets = values.map(v => maxVal > 0 ? (v / maxVal) * 100 : 0);

    const startWidths = [...animatedWidths];
    const startTime = performance.now();
    const duration = 600;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - t, 3);

      const current = targets.map((target, i) => {
        return startWidths[i] + (target - startWidths[i]) * ease;
      });

      setAnimatedWidths(current);

      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeScale, isVisible]);

  const multiplier = TIME_SCALES.find(s => s.key === timeScale)!.multiplier;

  return (
    <div ref={containerRef} className="soe-slow-viz" aria-label="Interactive comparison of imperceptibly slow speeds across different time scales">
      <h3 className="soe-viz-title">The Slow Parade</h3>
      <p className="soe-viz-subtitle">How far do the slowest things travel? Change the time scale.</p>

      {/* Time scale selector */}
      <div className="soe-slow-viz-controls" role="group" aria-label="Time scale selector">
        {TIME_SCALES.map(scale => (
          <button
            key={scale.key}
            className={`soe-slow-viz-btn ${timeScale === scale.key ? 'soe-slow-viz-btn-active' : ''}`}
            onClick={() => setTimeScale(scale.key)}
            aria-pressed={timeScale === scale.key}
          >
            {scale.label}
          </button>
        ))}
      </div>

      {/* SVG Bar visualization */}
      <div className="soe-slow-viz-chart">
        <svg viewBox="0 0 500 200" className="soe-slow-viz-svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            {SLOW_SPEEDS.map((s, i) => (
              <linearGradient key={i} id={`slow-grad-${i}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={CATEGORY_COLORS[s.category]} stopOpacity="0.8" />
                <stop offset="100%" stopColor={CATEGORY_COLORS[s.category]} stopOpacity="0.4" />
              </linearGradient>
            ))}
          </defs>

          {SLOW_SPEEDS.map((s, i) => {
            const y = 10 + i * 48;
            const barWidth = (animatedWidths[i] / 100) * 310;
            const val = s.perYear_m * multiplier;
            const color = CATEGORY_COLORS[s.category];

            return (
              <g key={s.name}>
                {/* Label */}
                <text x="0" y={y + 14} fill="var(--soe-text-primary, #E5E7EB)" fontSize="12" fontWeight="500">
                  {s.name}
                </text>
                <text x="0" y={y + 28} fill="var(--soe-text-secondary, #9CA3AF)" fontSize="9">
                  {s.description}
                </text>

                {/* Bar track */}
                <rect x="155" y={y + 6} width="310" height="22" rx="4" fill="rgba(255,255,255,0.03)" />

                {/* Bar fill */}
                <rect
                  x="155"
                  y={y + 6}
                  width={Math.max(barWidth, 2)}
                  height="22"
                  rx="4"
                  fill={`url(#slow-grad-${i})`}
                />

                {/* Bar end cap glow */}
                {barWidth > 10 && (
                  <circle cx={155 + barWidth} cy={y + 17} r="4" fill={color} opacity="0.5" />
                )}

                {/* Value label */}
                <text
                  x={155 + Math.max(barWidth, 2) + 10}
                  y={y + 21}
                  fill={color}
                  fontSize="11"
                  fontFamily="monospace"
                  fontWeight="500"
                >
                  {formatDistance(val)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Insight */}
      {timeScale === '1Myr' && (
        <p className="soe-slow-viz-insight">
          In 1 million years, a continent drifts <span className="soe-mono soe-highlight">25 km</span> &mdash;
          a glacier travels <span className="soe-mono soe-highlight">100,000 km</span>.
          Slow doesn&apos;t mean unimportant. It means patient.
        </p>
      )}
      {timeScale === '100yr' && (
        <p className="soe-slow-viz-insight">
          Over a human lifetime, your fingernails grow <span className="soe-mono soe-highlight">3.8 m</span> total.
          The continent beneath you moves <span className="soe-mono soe-highlight">2.5 m</span> &mdash; less than one body length.
        </p>
      )}
    </div>
  );
}
