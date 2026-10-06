'use client';

/**
 * @diagram-contract
 * @diagram D6-time-dilation-preview
 * @domain special-relativity
 *
 * @invariant LORENTZ_FACTOR
 *   gamma = 1 / sqrt(1 - v²/c²)
 *   validation: gamma(0) = 1, gamma(0.5c) ≈ 1.155, gamma(0.9c) ≈ 2.294, gamma(0.99c) ≈ 7.089
 *
 * @invariant CLOCK_RATE_VISUAL
 *   traveler clock second hand rotates at 1/gamma the rate of earth clock
 *   validation: at 0.9c, traveler clock ticks ~2.3x slower
 *
 * @invariant SLIDER_RANGE
 *   v ranges from 0 to 0.9999c — never reaches c (physically impossible)
 *   validation: gamma approaches but never reaches infinity
 */

import { useState, useEffect, useRef } from 'react';

function ClockFace({
  rate,
  label,
  color,
  timeLabel,
}: {
  rate: number; // 1.0 = normal, 0.5 = half speed
  label: string;
  color: string;
  timeLabel: string;
}) {
  const [angle, setAngle] = useState(0);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const animate = (now: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = now;
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      // Second hand: 6 degrees per second * rate
      setAngle(prev => (prev + (delta / 1000) * 6 * rate) % 360);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [rate]);

  const cx = 60;
  const cy = 60;
  const r = 52;

  // Hour markers
  const markers = Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 - 90) * (Math.PI / 180);
    return {
      x1: cx + (r - 6) * Math.cos(a),
      y1: cy + (r - 6) * Math.sin(a),
      x2: cx + r * Math.cos(a),
      y2: cy + r * Math.sin(a),
    };
  });

  // Minute markers
  const minuteMarkers = Array.from({ length: 60 }, (_, i) => {
    if (i % 5 === 0) return null;
    const a = (i * 6 - 90) * (Math.PI / 180);
    return {
      x1: cx + (r - 3) * Math.cos(a),
      y1: cy + (r - 3) * Math.sin(a),
      x2: cx + r * Math.cos(a),
      y2: cy + r * Math.sin(a),
    };
  });

  // Second hand
  const secondAngle = (angle - 90) * (Math.PI / 180);
  const handLength = r - 12;

  return (
    <div className="soe-dilation-clock-viz">
      <svg viewBox="0 0 120 120" className="soe-dilation-clock-svg">
        {/* Clock face */}
        <circle cx={cx} cy={cy} r={r} fill="rgba(255,255,255,0.03)" stroke={color} strokeWidth="2" opacity="0.6" />

        {/* Minute markers */}
        {minuteMarkers.map((m, i) => m && (
          <line key={i} x1={m.x1} y1={m.y1} x2={m.x2} y2={m.y2} stroke={color} strokeWidth="0.5" opacity="0.3" />
        ))}

        {/* Hour markers */}
        {markers.map((m, i) => (
          <line key={i} x1={m.x1} y1={m.y1} x2={m.x2} y2={m.y2} stroke={color} strokeWidth="2" opacity="0.8" />
        ))}

        {/* Second hand */}
        <line
          x1={cx}
          y1={cy}
          x2={cx + handLength * Math.cos(secondAngle)}
          y2={cy + handLength * Math.sin(secondAngle)}
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Center dot */}
        <circle cx={cx} cy={cy} r="3" fill={color} />

        {/* Speed arc indicator */}
        {rate < 1 && (
          <circle
            cx={cx}
            cy={cy}
            r={r + 5}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray={`${rate * Math.PI * (r + 5) * 2} ${(1 - rate) * Math.PI * (r + 5) * 2}`}
            opacity="0.3"
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        )}
      </svg>
      <div className="soe-dilation-clock-info">
        <span className="soe-dilation-clock-label">{label}</span>
        <span className="soe-dilation-clock-time soe-mono" style={{ color }}>{timeLabel}</span>
      </div>
    </div>
  );
}

export default function TimeDilationViz() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [beta, setBeta] = useState(0);

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

  const gamma = beta < 0.9999 ? 1 / Math.sqrt(1 - beta * beta) : 70.71;
  const travelerRate = 1 / gamma;
  const travelerDays = 365.25 / gamma;

  const formatTravelerTime = (days: number) => {
    if (days >= 365) return `${(days / 365.25).toFixed(1)} years`;
    if (days >= 1) return `${days.toFixed(1)} days`;
    if (days * 24 >= 1) return `${(days * 24).toFixed(1)} hours`;
    return `${(days * 24 * 60).toFixed(1)} minutes`;
  };

  return (
    <div ref={containerRef} className="soe-dilation-viz" aria-label="Interactive time dilation visualizer with animated clocks">
      <h3 className="soe-viz-title">Time Dilation</h3>
      <p className="soe-viz-subtitle">
        As you approach <span className="soe-mono">c</span>, your clock slows down relative to an observer.
      </p>

      {/* Clocks */}
      <div className="soe-dilation-viz-clocks">
        <ClockFace
          rate={1}
          label="Earth Observer"
          color="var(--soe-text-secondary, #9CA3AF)"
          timeLabel="1 year"
        />

        <div className="soe-dilation-viz-equals">=</div>

        <ClockFace
          rate={travelerRate}
          label="Traveler"
          color="var(--soe-em, #FFB300)"
          timeLabel={formatTravelerTime(travelerDays)}
        />
      </div>

      {/* Slider */}
      <div className="soe-dilation-viz-controls">
        <label className="soe-dilation-viz-speed-label" htmlFor="dilation-speed">
          Your speed: <span className="soe-mono soe-highlight">{(beta * 100).toFixed(beta > 0.99 ? 2 : 0)}% of c</span>
        </label>
        <div className="soe-dilation-viz-slider-track">
          <input
            id="dilation-speed"
            type="range"
            className="soe-dilation-viz-slider"
            min="0"
            max="0.9999"
            step="0.0001"
            value={beta}
            onChange={(e) => setBeta(parseFloat(e.target.value))}
          />
          <div
            className="soe-dilation-viz-slider-fill"
            style={{ width: `${(beta / 0.9999) * 100}%` }}
          />
        </div>
        <div className="soe-dilation-viz-slider-labels">
          <span>Rest</span>
          <span>0.5c</span>
          <span>0.99c</span>
        </div>
      </div>

      {/* Gamma display */}
      <div className="soe-dilation-viz-gamma">
        <span>Lorentz factor</span>
        <span className="soe-mono soe-dilation-viz-gamma-value">
          &#947; = {gamma.toFixed(gamma > 10 ? 1 : 3)}
        </span>
      </div>

      {beta > 0.99 && (
        <p className="soe-dilation-viz-insight">
          At {(beta * 100).toFixed(2)}% of <span className="soe-mono">c</span>, one year on Earth
          is just <span className="soe-mono soe-highlight">{formatTravelerTime(travelerDays)}</span> for the traveler.
          Time itself bends.
        </p>
      )}
    </div>
  );
}
