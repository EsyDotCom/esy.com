'use client';

/**
 * @diagram-contract
 * @diagram D3-sound-vs-light
 * @domain wave-propagation
 *
 * @invariant SPEED_RATIO
 *   light/sound ratio: 299,792,458 / 343 = 873,775x
 *   validation: light beam completes traversal ~874,000x faster than sound
 *
 * @invariant VACUUM_CONSTRAINT
 *   sound requires a medium — "No medium, no sound" for space distances
 *   validation: sound propagation disabled for scenarios without continuous medium
 */

import { useState, useEffect, useRef, useCallback } from 'react';

interface Scenario {
  label: string;
  distance_m: number;
  soundTime: string;
  lightTime: string;
  hasMedium: boolean;
  description: string;
}

const SCENARIOS: Scenario[] = [
  {
    label: '1 km',
    distance_m: 1_000,
    soundTime: '2.9 seconds',
    lightTime: '3.3 microseconds',
    hasMedium: true,
    description: 'A thunderstorm 1 km away',
  },
  {
    label: 'Earth → Moon',
    distance_m: 384_400_000,
    soundTime: 'N/A (vacuum)',
    lightTime: '1.28 seconds',
    hasMedium: false,
    description: '384,400 km of empty space',
  },
  {
    label: 'Sun → Earth',
    distance_m: 149_600_000_000,
    soundTime: 'N/A (vacuum)',
    lightTime: '8 min 20 sec',
    hasMedium: false,
    description: '149.6 million km',
  },
];

export default function SoundVsLightViz() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scenario, setScenario] = useState(0);
  const [soundPos, setSoundPos] = useState(0);
  const [lightPos, setLightPos] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animRef = useRef<number>(0);
  const startRef = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const animate = useCallback(() => {
    cancelAnimationFrame(animRef.current);
    setSoundPos(0);
    setLightPos(0);
    setIsAnimating(true);
    startRef.current = performance.now();

    const s = SCENARIOS[scenario];
    // Light completes in a fixed short time, sound takes longer
    const lightDuration = s.hasMedium ? 300 : 1500; // ms
    // Sound: ratio-based — at 1km, sound takes ~874,000x longer than light
    // For animation purposes, compress to a few seconds
    const soundDuration = s.hasMedium ? 4000 : 0;

    const frame = (now: number) => {
      const elapsed = now - startRef.current;

      const lt = Math.min(elapsed / lightDuration, 1);
      setLightPos(lt);

      if (s.hasMedium && soundDuration > 0) {
        const st = Math.min(elapsed / soundDuration, 1);
        setSoundPos(st);
      }

      const maxDuration = Math.max(lightDuration, soundDuration);
      if (elapsed < maxDuration) {
        animRef.current = requestAnimationFrame(frame);
      } else {
        setIsAnimating(false);
      }
    };

    animRef.current = requestAnimationFrame(frame);
  }, [scenario]);

  // Trigger animation on scenario change
  useEffect(() => {
    if (isVisible) animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [scenario, isVisible, animate]);

  const s = SCENARIOS[scenario];

  return (
    <div ref={containerRef} className="soe-sl-viz" aria-label="Sound vs light speed comparison visualization">
      <h3 className="soe-viz-title">Sound vs. Light</h3>
      <p className="soe-viz-subtitle">{s.description}</p>

      {/* Scenario buttons */}
      <div className="soe-sl-viz-controls" role="group" aria-label="Distance scenario">
        {SCENARIOS.map((sc, i) => (
          <button
            key={sc.label}
            className={`soe-sl-viz-btn ${scenario === i ? 'soe-sl-viz-btn-active' : ''}`}
            onClick={() => setScenario(i)}
            aria-pressed={scenario === i}
          >
            {sc.label}
          </button>
        ))}
      </div>

      {/* SVG Visualization */}
      <div className="soe-sl-viz-track-container">
        <svg viewBox="0 0 500 120" className="soe-sl-viz-svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="sound-trail" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#78909C" stopOpacity="0" />
              <stop offset="100%" stopColor="#78909C" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="light-trail" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFB300" stopOpacity="0" />
              <stop offset="100%" stopColor="#FFB300" stopOpacity="0.8" />
            </linearGradient>
            <filter id="sl-glow">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>

          {/* Labels */}
          <text x="30" y="38" fill="#78909C" fontSize="12" fontWeight="600" textAnchor="middle">Sound</text>
          <text x="30" y="88" fill="#FFB300" fontSize="12" fontWeight="600" textAnchor="middle">Light</text>

          {/* Sound track */}
          <line x1="65" y1="35" x2="430" y2="35" stroke="rgba(255,255,255,0.06)" strokeWidth="12" strokeLinecap="round" />
          {s.hasMedium ? (
            <>
              {/* Sound trail */}
              <line x1="65" y1="35" x2={65 + soundPos * 365} y2="35" stroke="url(#sound-trail)" strokeWidth="8" strokeLinecap="round" />
              {/* Sound wavefront */}
              {soundPos > 0 && soundPos < 1 && (
                <>
                  <circle cx={65 + soundPos * 365} cy="35" r="12" fill="#78909C" opacity="0.15" />
                  <circle cx={65 + soundPos * 365} cy="35" r="6" fill="#78909C" opacity="0.8" />
                </>
              )}
              {soundPos >= 1 && <circle cx="430" cy="35" r="6" fill="#78909C" />}
            </>
          ) : (
            <text x="250" y="39" fill="#78909C" fontSize="11" textAnchor="middle" opacity="0.5" fontStyle="italic">
              No medium — sound cannot propagate
            </text>
          )}

          {/* Sound time */}
          <text x="460" y="38" fill="#78909C" fontSize="10" fontFamily="monospace" textAnchor="start">{s.soundTime}</text>

          {/* Light track */}
          <line x1="65" y1="85" x2="430" y2="85" stroke="rgba(255,255,255,0.06)" strokeWidth="12" strokeLinecap="round" />
          {/* Light trail */}
          <line x1="65" y1="85" x2={65 + lightPos * 365} y2="85" stroke="url(#light-trail)" strokeWidth="8" strokeLinecap="round" />
          {/* Light glow */}
          {lightPos > 0 && (
            <circle cx={65 + lightPos * 365} cy="85" r="10" fill="#FFB300" opacity="0.2" filter="url(#sl-glow)" />
          )}
          {/* Light photon */}
          {lightPos > 0 && <circle cx={65 + lightPos * 365} cy="85" r="5" fill="#FFB300" />}

          {/* Light time */}
          <text x="460" y="88" fill="#FFB300" fontSize="10" fontFamily="monospace" textAnchor="start">{s.lightTime}</text>
        </svg>
      </div>

      {/* Insight text */}
      {s.hasMedium ? (
        <p className="soe-sl-viz-insight">
          Light crosses 1 km in <span className="soe-mono soe-highlight">3.3 microseconds</span>.
          Sound takes <span className="soe-mono soe-highlight">2.9 seconds</span> &mdash; nearly a million times slower.
          That&apos;s why you see lightning before you hear thunder.
        </p>
      ) : (
        <p className="soe-sl-viz-insight">
          Sound needs a medium &mdash; air, water, rock. In the vacuum of space, there is no medium.
          Light is the only messenger between worlds.
        </p>
      )}

      {/* Replay */}
      {!isAnimating && (
        <button className="soe-sl-viz-replay" onClick={animate}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 7a6 6 0 1 1 1.5 3.9" strokeLinecap="round" />
            <path d="M1 11V7h4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Replay
        </button>
      )}
    </div>
  );
}
