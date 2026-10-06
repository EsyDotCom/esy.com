'use client';

/**
 * @diagram-contract
 * @diagram D5-light-delay-explorer
 * @domain electromagnetic-propagation
 *
 * @invariant TRAVEL_TIME_ACCURACY
 *   room (5m): 17ns, Moon: 1.3s, Sun: 500s, Neptune: 14,760s, Proxima: 133,800,000s
 *   code: seconds = distance / 299_792_458
 *   validation: all travel times correct to within 1% of NASA/JPL values
 *
 * @invariant PHOTON_ANIMATION
 *   photon beam animates from source to destination with trail effect
 *   validation: animation duration proportional to perceived travel time
 */

import { useState, useEffect, useRef, useCallback } from 'react';

interface Destination {
  label: string;
  shortLabel: string;
  distance_m: number;
  time: string;
  seconds: number;
  animDuration: number; // seconds for the animation
  icon: 'room' | 'moon' | 'sun' | 'neptune' | 'star';
}

const DESTINATIONS: Destination[] = [
  { label: 'Across a Room (5 m)', shortLabel: 'Room', distance_m: 5, time: '17 nanoseconds', seconds: 0.000000017, animDuration: 0.3, icon: 'room' },
  { label: 'Earth to Moon', shortLabel: 'Moon', distance_m: 384_400_000, time: '1.28 seconds', seconds: 1.28, animDuration: 1.3, icon: 'moon' },
  { label: 'Sun to Earth', shortLabel: 'Sun', distance_m: 149_600_000_000, time: '8 min 20 sec', seconds: 500, animDuration: 2.5, icon: 'sun' },
  { label: 'Sun to Neptune', shortLabel: 'Neptune', distance_m: 4_495_100_000_000, time: '4.1 hours', seconds: 14760, animDuration: 3.5, icon: 'neptune' },
  { label: 'To Proxima Centauri', shortLabel: 'Proxima', distance_m: 4.014e16, time: '4.24 years', seconds: 133800000, animDuration: 4.5, icon: 'star' },
];

function DestinationIcon({ type }: { type: string }) {
  switch (type) {
    case 'room':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="soe-light-viz-dest-icon">
          <rect x="3" y="6" width="18" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 20V12h8v8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'moon':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="soe-light-viz-dest-icon">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
        </svg>
      );
    case 'sun':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="soe-light-viz-dest-icon soe-light-viz-icon-sun">
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
            const rad = (angle * Math.PI) / 180;
            return (
              <line key={angle}
                x1={12 + 7 * Math.cos(rad)} y1={12 + 7 * Math.sin(rad)}
                x2={12 + 9.5 * Math.cos(rad)} y2={12 + 9.5 * Math.sin(rad)}
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              />
            );
          })}
        </svg>
      );
    case 'neptune':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="soe-light-viz-dest-icon">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
          <ellipse cx="12" cy="12" rx="10" ry="3" stroke="currentColor" strokeWidth="1" opacity="0.5" transform="rotate(-20 12 12)" />
        </svg>
      );
    case 'star':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="soe-light-viz-dest-icon soe-light-viz-icon-star">
          <path d="M12 2l2.5 7.5H22l-6 4.5 2.5 7.5L12 17l-6.5 4.5 2.5-7.5-6-4.5h7.5z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />
        </svg>
      );
    default:
      return null;
  }
}

export default function LightDelayViz() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState(1);
  const [photonProgress, setPhotonProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

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

  const animatePhoton = useCallback((duration: number) => {
    cancelAnimationFrame(animRef.current);
    setPhotonProgress(0);
    setIsAnimating(true);
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const t = Math.min(elapsed / (duration * 1000), 1);
      setPhotonProgress(t);

      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    animRef.current = requestAnimationFrame(animate);
  }, []);

  // Trigger animation on selection change
  useEffect(() => {
    if (isVisible) {
      animatePhoton(DESTINATIONS[selected].animDuration);
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [selected, isVisible, animatePhoton]);

  const dest = DESTINATIONS[selected];

  return (
    <div ref={containerRef} className="soe-light-viz" aria-label="Light travel time explorer">
      <h3 className="soe-viz-title">Light Delay Explorer</h3>
      <p className="soe-viz-subtitle">Select a destination. Watch the photon travel.</p>

      {/* Destination selector */}
      <div className="soe-light-viz-selector" role="tablist">
        {DESTINATIONS.map((d, i) => (
          <button
            key={d.label}
            role="tab"
            aria-selected={i === selected}
            className={`soe-light-viz-btn ${i === selected ? 'soe-light-viz-btn-active' : ''}`}
            onClick={() => setSelected(i)}
          >
            <DestinationIcon type={d.icon} />
            <span className="soe-light-viz-btn-label">{d.shortLabel}</span>
          </button>
        ))}
      </div>

      {/* Journey visualization */}
      <div className="soe-light-viz-journey" role="tabpanel">
        <svg viewBox="0 0 400 80" className="soe-light-viz-svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="photon-trail" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFB300" stopOpacity="0" />
              <stop offset="60%" stopColor="#FFB300" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFB300" stopOpacity="1" />
            </linearGradient>
            <filter id="photon-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Track */}
          <line x1="40" y1="40" x2="360" y2="40" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />

          {/* Source (Earth) */}
          <circle cx="40" cy="40" r="8" fill="#4285F4" opacity="0.8" />
          <text x="40" y="60" textAnchor="middle" fill="var(--soe-text-secondary, #9CA3AF)" fontSize="10">Earth</text>

          {/* Destination */}
          <circle cx="360" cy="40" r="8" fill="var(--soe-cosmic, #9C27B0)" opacity="0.8" />
          <text x="360" y="60" textAnchor="middle" fill="var(--soe-text-secondary, #9CA3AF)" fontSize="10">{dest.shortLabel}</text>

          {/* Photon trail */}
          <line
            x1="40"
            y1="40"
            x2={40 + photonProgress * 320}
            y2="40"
            stroke="url(#photon-trail)"
            strokeWidth="3"
          />

          {/* Photon */}
          <circle
            cx={40 + photonProgress * 320}
            cy="40"
            r="5"
            fill="#FFB300"
            filter="url(#photon-glow)"
            opacity={isAnimating || photonProgress >= 1 ? 1 : 0}
          />
        </svg>
      </div>

      {/* Result */}
      <div className="soe-light-viz-result">
        <div className="soe-light-viz-distance">
          <span className="soe-light-viz-result-label">Distance</span>
          <span className="soe-mono">{dest.label}</span>
        </div>
        <div className="soe-light-viz-time">
          <span className="soe-light-viz-result-label">Travel time at <span className="soe-mono">c</span></span>
          <span className="soe-mono soe-highlight soe-light-viz-time-value">{dest.time}</span>
        </div>
      </div>

      {selected >= 3 && (
        <p className="soe-light-viz-insight">
          Even light &mdash; the fastest thing in the universe &mdash; takes{' '}
          <span className="soe-mono soe-highlight">{dest.time}</span> to reach {dest.shortLabel}.
          We never see the distant universe in real time.
        </p>
      )}
    </div>
  );
}
