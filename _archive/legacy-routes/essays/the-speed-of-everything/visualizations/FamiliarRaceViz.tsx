'use client';

/**
 * @diagram-contract
 * @diagram D1-familiar-race
 * @domain kinematics
 *
 * @invariant SPEED_ORDERING
 *   racers ordered by speed: Walking (1.4) < Bolt (12.3) < Car (31) < Jet (250)
 *   validation: each racer[i].speed < racer[i+1].speed
 *
 * @invariant POSITION_PROPORTIONALITY
 *   position at any time t: x(t) = (speed / maxSpeed) * trackWidth * min(t/duration, 1)
 *   validation: at completion, jet fills track, walking is at 1.4/250 = 0.56%
 *
 * @invariant ANIMATION_PHYSICS
 *   animation uses requestAnimationFrame, not CSS transitions
 *   validation: positions update per-frame, not via width% or CSS keyframes
 */

import { useRef, useEffect, useState, useCallback } from 'react';

interface Racer {
  label: string;
  speed_ms: number;
  display: string;
  icon: string; // SVG path for the icon
}

const RACERS: Racer[] = [
  { label: 'Walking', speed_ms: 1.4, display: '1.4 m/s (5 km/h)', icon: 'person' },
  { label: 'Usain Bolt', speed_ms: 12.3, display: '12.3 m/s (44 km/h)', icon: 'runner' },
  { label: 'Highway Car', speed_ms: 31, display: '31 m/s (112 km/h)', icon: 'car' },
  { label: 'Commercial Jet', speed_ms: 250, display: '250 m/s (900 km/h)', icon: 'plane' },
];

const MAX_SPEED = Math.max(...RACERS.map(r => r.speed_ms));
const RACE_DURATION_MS = 3000; // Time for jet to complete

function RacerIcon({ type, color }: { type: string; color: string }) {
  switch (type) {
    case 'person':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill={color}>
          <circle cx="10" cy="4" r="3" />
          <path d="M10 8 L10 14 M6 10 L14 10 M10 14 L7 19 M10 14 L13 19" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'runner':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill={color}>
          <circle cx="12" cy="3" r="2.5" />
          <path d="M8 8 L12 7 L15 10 M12 7 L10 13 L7 18 M10 13 L14 17 M6 6 L9 9" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'car':
      return (
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
          <rect x="1" y="6" width="20" height="7" rx="2" fill={color} />
          <path d="M4 6 L7 2 L15 2 L18 6" fill={color} stroke={color} />
          <circle cx="5.5" cy="14" r="2" fill="#1a1a2e" stroke={color} strokeWidth="1" />
          <circle cx="16.5" cy="14" r="2" fill="#1a1a2e" stroke={color} strokeWidth="1" />
          <rect x="7" y="3" width="3" height="3" rx="0.5" fill="rgba(255,255,255,0.3)" />
          <rect x="11" y="3" width="4" height="3" rx="0.5" fill="rgba(255,255,255,0.3)" />
        </svg>
      );
    case 'plane':
      return (
        <svg width="24" height="16" viewBox="0 0 24 16" fill={color}>
          <path d="M2 8 L8 6 L18 6 L23 4 L23 5 L20 7 L23 7 L23 9 L20 9 L23 11 L23 12 L18 10 L8 10 L2 8Z" />
          <path d="M8 6 L10 2 L12 2 L10 6" opacity="0.6" />
        </svg>
      );
    default:
      return <circle r="8" fill={color} />;
  }
}

export default function FamiliarRaceViz() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [positions, setPositions] = useState<number[]>(RACERS.map(() => 0));
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const startRace = useCallback(() => {
    setPositions(RACERS.map(() => 0));
    setIsComplete(false);
    setHasStarted(true);
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const t = Math.min(elapsed / RACE_DURATION_MS, 1);

      // Ease out cubic for natural deceleration feel
      const ease = 1 - Math.pow(1 - t, 3);

      const newPositions = RACERS.map(r => {
        const normalizedSpeed = r.speed_ms / MAX_SPEED;
        return Math.min(normalizedSpeed * ease, normalizedSpeed);
      });

      setPositions(newPositions);

      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
      }
    };

    animRef.current = requestAnimationFrame(animate);
  }, []);

  // Start race when visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setIsVisible(true);
          startRace();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(animRef.current); };
  }, [hasStarted, startRace]);

  const color = '#4285F4';

  return (
    <div ref={containerRef} className="soe-race-viz" aria-label="Animated speed comparison race: walking, sprinting, driving, and flying">
      <div className="soe-race-viz-header">
        <h3 className="soe-viz-title">The Familiar Race</h3>
        <p className="soe-viz-subtitle">How fast are the speeds you already know?</p>
      </div>

      <div className="soe-race-viz-track-container">
        {/* Start line */}
        <div className="soe-race-viz-start-line" />

        {RACERS.map((racer, i) => {
          const pos = positions[i];
          return (
            <div key={racer.label} className="soe-race-viz-lane">
              <div className="soe-race-viz-lane-label">
                <span className="soe-race-viz-lane-name">{racer.label}</span>
              </div>
              <div className="soe-race-viz-lane-track">
                {/* Track surface */}
                <div className="soe-race-viz-lane-surface" />

                {/* Trail */}
                <div
                  className="soe-race-viz-trail"
                  style={{
                    width: `${pos * 100}%`,
                    background: `linear-gradient(90deg, transparent, ${color}40)`,
                  }}
                />

                {/* Racer */}
                <div
                  className="soe-race-viz-racer"
                  style={{ left: `${pos * 100}%` }}
                >
                  <RacerIcon type={racer.icon} color={color} />
                </div>
              </div>
              <div className="soe-race-viz-lane-speed">
                <span className="soe-mono">{racer.speed_ms} m/s</span>
              </div>
            </div>
          );
        })}

        {/* Finish line */}
        <div className="soe-race-viz-finish-line">
          <span className="soe-race-viz-finish-label">FINISH</span>
        </div>
      </div>

      {isComplete && (
        <div className="soe-race-viz-result">
          <p className="soe-race-viz-insight">
            The jet crosses the finish at <span className="soe-mono soe-highlight">250 m/s</span>.
            At that moment, the walking human has covered just <span className="soe-mono soe-highlight">{((1.4 / 250) * 100).toFixed(1)}%</span> of the track.
          </p>
          <button className="soe-race-viz-replay" onClick={startRace}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 7a6 6 0 1 1 1.5 3.9" strokeLinecap="round" />
              <path d="M1 11V7h4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Replay
          </button>
        </div>
      )}
    </div>
  );
}
