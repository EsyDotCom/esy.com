'use client';

/**
 * @diagram-contract
 * @diagram D4-cosmic-speedometer
 * @domain orbital-mechanics
 *
 * @invariant VELOCITY_NESTING
 *   velocities are additive reference frames: rotation + orbit + galactic + CMB
 *   validation: each layer represents a larger reference frame containing the previous
 *
 * @invariant RING_RADIUS_PROPORTIONALITY
 *   ring radius proportional to velocity magnitude: outermost (600k m/s) is largest
 *   validation: visual radius ordered correctly from center outward
 *
 * @invariant ROTATION_SPEED_PROPORTIONALITY
 *   CSS animation duration inversely proportional to velocity
 *   validation: outermost ring rotates fastest visually
 */

import { useState, useEffect, useRef } from 'react';

interface Layer {
  label: string;
  speed: number;
  displaySpeed: string;
  description: string;
  color: string;
}

const LAYERS: Layer[] = [
  { label: 'Earth Rotation', speed: 465, displaySpeed: '465 m/s', description: 'Spinning at the equator', color: '#78909C' },
  { label: 'Earth Orbit', speed: 29_800, displaySpeed: '29,800 m/s', description: 'Orbiting the Sun', color: '#9C27B0' },
  { label: 'Galactic Orbit', speed: 220_000, displaySpeed: '220,000 m/s', description: 'Circling the Milky Way', color: '#7B1FA2' },
  { label: 'Toward Great Attractor', speed: 600_000, displaySpeed: '600,000 m/s', description: 'Pulled by gravity itself', color: '#4A148C' },
];

const TOTAL_SPEED = LAYERS.reduce((s, l) => s + l.speed, 0);

export default function CosmicSpeedometerViz() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

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

  const maxRadius = 160;
  const minRadius = 30;
  const center = maxRadius + 20;
  const svgSize = (maxRadius + 20) * 2;

  return (
    <div ref={containerRef} className="soe-cosmic-viz" aria-label="Your stacked cosmic velocities visualized as concentric orbital rings">
      <h3 className="soe-viz-title">The Cosmic Speedometer</h3>
      <p className="soe-viz-subtitle">You are never sitting still. These velocities stack.</p>

      <div className="soe-cosmic-viz-container">
        <svg
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="soe-cosmic-viz-svg"
          role="img"
          aria-label="Concentric rings showing Earth rotation, orbital, galactic, and cosmic velocities"
        >
          <defs>
            {LAYERS.map((layer, i) => (
              <radialGradient key={`grad-${i}`} id={`cosmic-grad-${i}`}>
                <stop offset="0%" stopColor={layer.color} stopOpacity="0" />
                <stop offset="70%" stopColor={layer.color} stopOpacity="0.1" />
                <stop offset="100%" stopColor={layer.color} stopOpacity="0.3" />
              </radialGradient>
            ))}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Rings — outermost first for correct z-order */}
          {[...LAYERS].reverse().map((layer, reverseI) => {
            const i = LAYERS.length - 1 - reverseI;
            const radius = minRadius + ((i + 1) / LAYERS.length) * (maxRadius - minRadius);
            const isActive = activeLayer === i;
            const dashArray = `${Math.PI * radius * 0.1} ${Math.PI * radius * 0.05}`;
            // Rotation speed inversely proportional to actual speed (visual representation)
            const animDuration = Math.max(4, 60 - (layer.speed / TOTAL_SPEED) * 50);

            return (
              <g key={layer.label}>
                {/* Filled area */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill={`url(#cosmic-grad-${i})`}
                  className={`soe-cosmic-viz-area ${isVisible ? 'soe-cosmic-viz-area-visible' : ''}`}
                  style={{ animationDelay: `${i * 0.3}s` }}
                />

                {/* Orbital path */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke={layer.color}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  strokeDasharray={dashArray}
                  opacity={isActive ? 1 : 0.6}
                  className={`soe-cosmic-viz-ring ${isVisible ? 'soe-cosmic-viz-ring-spin' : ''}`}
                  style={{
                    animationDuration: `${animDuration}s`,
                    animationDelay: `${i * 0.2}s`,
                    transformOrigin: `${center}px ${center}px`,
                  }}
                />

                {/* Orbiting dot */}
                <circle
                  cx={center + radius}
                  cy={center}
                  r={isActive ? 5 : 3}
                  fill={layer.color}
                  filter="url(#glow)"
                  className={`soe-cosmic-viz-dot ${isVisible ? 'soe-cosmic-viz-ring-spin' : ''}`}
                  style={{
                    animationDuration: `${animDuration}s`,
                    animationDelay: `${i * 0.2}s`,
                    transformOrigin: `${center}px ${center}px`,
                  }}
                />
              </g>
            );
          })}

          {/* Center — "You" */}
          <circle cx={center} cy={center} r={12} fill="#4285F4" opacity={isVisible ? 1 : 0}>
            <animate attributeName="opacity" from="0" to="1" dur="0.5s" fill="freeze" begin={isVisible ? '0.5s' : 'indefinite'} />
          </circle>
          <text x={center} y={center + 1} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="8" fontWeight="bold">
            YOU
          </text>
        </svg>

        {/* Layer legend */}
        <div className="soe-cosmic-viz-legend">
          {LAYERS.map((layer, i) => (
            <button
              key={layer.label}
              className={`soe-cosmic-viz-legend-item ${activeLayer === i ? 'soe-cosmic-viz-legend-active' : ''}`}
              onMouseEnter={() => setActiveLayer(i)}
              onMouseLeave={() => setActiveLayer(null)}
              onFocus={() => setActiveLayer(i)}
              onBlur={() => setActiveLayer(null)}
            >
              <span className="soe-cosmic-viz-legend-dot" style={{ backgroundColor: layer.color }} />
              <span className="soe-cosmic-viz-legend-label">{layer.label}</span>
              <span className="soe-cosmic-viz-legend-speed soe-mono">+{layer.displaySpeed}</span>
              {activeLayer === i && (
                <span className="soe-cosmic-viz-legend-desc">{layer.description}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className={`soe-cosmic-viz-total ${isVisible ? 'soe-visible' : ''}`}>
        <span className="soe-cosmic-viz-total-label">Your total speed right now:</span>
        <span className="soe-mono soe-cosmic-viz-total-value">~{Math.round(TOTAL_SPEED / 1000)} km/s</span>
        <span className="soe-cosmic-viz-total-sub">&hellip;and you feel nothing.</span>
      </div>
    </div>
  );
}
