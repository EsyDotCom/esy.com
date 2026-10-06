'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo, Component } from 'react';
import dynamic from 'next/dynamic';
import { Newsreader, JetBrains_Mono } from 'next/font/google';
import './inside-a-black-hole.css';

// =============================================================================
// SELF-HOSTED FONTS (next/font)
// Eliminates external Google Fonts request, auto-subsets, improves LCP
// =============================================================================

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--bh-font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--bh-font-mono',
  display: 'swap',
});

const SpacetimeVisualization = dynamic(
  () => import('./SpacetimeVisualization'),
  { ssr: false, loading: () => <div style={{ height: 500, background: '#050508' }} /> }
);

/* ─── Error Boundary for Three.js visualization ────────────── */
class VisualizationErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.warn('[VisualizationErrorBoundary] Caught render error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{ height: 500, background: '#050508', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a8580', fontFamily: "var(--bh-font-mono), monospace", fontSize: 12 }}>
          <span>3D visualization unavailable</span>
        </div>
      );
    }
    return this.props.children;
  }
}

const PenroseVisualization = dynamic(
  () => import('./PenroseVisualization'),
  { ssr: false, loading: () => <div style={{ height: 500, background: '#050508' }} /> }
);

/* ═══════════════════════════════════════════════════════════════
   Inside a Black Hole — Interactive Visual Essay
   
   Research: 22 Tier-1 sources (91%)
   Spec: 9 sections, 6 visualizations
   Design: Subject-derived (EHT gold, lensing blue, quantum violet)
   ═══════════════════════════════════════════════════════════════ */

const SOURCES = [
  'Penrose, R. (1965). "Gravitational Collapse and Space-Time Singularities." Physical Review Letters 14(3), 57–59.',
  'Hawking, S. (1975). "Particle Creation by Black Holes." Communications in Mathematical Physics 43(3), 199–220.',
  'Schwarzschild, K. (1916). "Über das Gravitationsfeld eines Massenpunktes." Sitzungsberichte der Königlich Preußischen Akademie der Wissenschaften, 189–196.',
  'EHT Collaboration (2019). "First M87 Event Horizon Telescope Results I–VI." The Astrophysical Journal Letters 875.',
  'Abbott, B. et al. / LIGO (2016). "Observation of Gravitational Waves from a Binary Black Hole Merger." Physical Review Letters 116(6), 061102.',
  'Almheiri, A., Marolf, D., Polchinski, J., Sully, J. (2013). "Black Holes: Complementarity vs. Firewalls." JHEP 2013(2), 62.',
  'Maldacena, J. (1999). "The Large N Limit of Superconformal Field Theories and Supergravity." Int. J. Theor. Phys. 38(4), 1113–1133.',
  'Bekenstein, J. (1973). "Black Holes and Entropy." Physical Review D 7(8), 2333.',
  'Misner, C., Thorne, K., Wheeler, J. (1973). Gravitation. W.H. Freeman.',
  'Carroll, S. (2004). Spacetime and Geometry: An Introduction to General Relativity. Addison-Wesley.',
  'Thorne, K. (1994). Black Holes and Time Warps: Einstein\'s Outrageous Legacy. W.W. Norton.',
  'Susskind, L. (2008). The Black Hole War. Little, Brown.',
  'Hawking, S. & Ellis, G. (1973). The Large Scale Structure of Space-Time. Cambridge University Press.',
  'Kerr, R. (1963). "Gravitational Field of a Spinning Mass." Physical Review Letters 11(5), 237.',
  'Bousso, R. (2002). "The Holographic Principle." Reviews of Modern Physics 74(3), 825.',
  'Susskind, L., Thorlacius, L., Uglum, J. (1993). "The Stretched Horizon and Black Hole Complementarity." Physical Review D 48(8), 3743.',
];

/* ─── Intersection Observer Hook ─────────────────────────────── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (options.once !== false) observer.unobserve(el);
        }
      },
      { threshold: options.threshold || 0.15, rootMargin: options.rootMargin || '0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.once]);

  return [ref, isInView];
}

/* ─── Scroll Progress Hook ───────────────────────────────────── */
function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return progress;
}

/* ─── EHT Ring Component ─────────────────────────────────────── */
function EHTRing() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const vis = inView ? 'bh-eht-diagram--visible' : '';

  /* Leader lines: [featureAnchor → ... → nearLabel]
     700×500 viewBox. Ring center = (350, 250). Ring element = 46% of 700 = 322px.
     Radial gradient puts ring band at ~40-55% of element radius (64–89px from center).
     Shadow (dark center) fills ~0-35% (0–56px). Outer glow fades at ~65% (105px).

     Feature anchors (gold dots) sit ON the actual feature:
       Shadow:  inside the dark center, near its left boundary   → (300, 250)
       Disk:    on the bright ring band at the top               → (370, 170)
       Lensing: at the outer glow edge, right side               → (456, 248)
       Doppler: on the brighter (bottom) side of the ring band   → (375, 332)   */
  const leaders = [
    { id: 'shadow',  pts: '300,250 140,250',    delay: 0.3 },   // dark center → left to label
    { id: 'disk',    pts: '370,170 435,75',     delay: 0.5 },   // ring top → upper-right to label
    { id: 'lensing', pts: '456,248 565,248',    delay: 0.7 },   // outer glow right → right to label
    { id: 'doppler', pts: '375,332 465,430',    delay: 0.9 },   // ring bottom bright → lower-right to label
  ];

  const labels = [
    { id: 'shadow',  label: 'The Shadow',            text: 'Light that crossed the event horizon and never returned.',               x: '1%',  y: '44%', align: 'left',  delay: 0.3 },
    { id: 'disk',    label: 'Accretion Disk',         text: 'Superheated gas spiraling inward, glowing at billions of degrees.',      x: '63%', y: '3%',  align: 'left',  delay: 0.5 },
    { id: 'lensing', label: 'Gravitational Lensing',  text: 'Light from behind, bent around the hole.',                              x: '82%', y: '42%', align: 'left',  delay: 0.7 },
    { id: 'doppler', label: 'Doppler Beaming',        text: 'Brighter side = gas moving toward us.',                                 x: '68%', y: '83%', align: 'left',  delay: 0.9 },
  ];

  return (
    <div ref={ref} className={`bh-eht-diagram ${vis}`} role="img" aria-label="Annotated diagram of a black hole image inspired by the Event Horizon Telescope photograph of M87*. A bright orange ring of superheated gas surrounds a dark central shadow.">
      {/* Ring visual */}
      <div className="bh-eht-diagram__ring">
        <div className="bh-eht-ring__outer">
          <div className="bh-eht-ring__asymmetry" />
        </div>
        <div className="bh-eht-ring__shadow" />
      </div>

      {/* SVG leader lines from features to labels */}
      <svg className="bh-eht-diagram__svg" viewBox="0 0 700 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {leaders.map(l => (
          <g key={l.id}>
            <polyline
              points={l.pts}
              className={`bh-eht-diagram__leader ${vis ? 'bh-eht-diagram__leader--visible' : ''}`}
              style={{ transitionDelay: `${l.delay}s` }}
              stroke="var(--bh-diagram-line, rgba(74,74,90,0.5))"
              strokeWidth="1"
              fill="none"
            />
            {/* Dot at feature anchor — dark outline ensures visibility on the gold ring */}
            <circle
              cx={l.pts.split(' ')[0].split(',')[0]}
              cy={l.pts.split(' ')[0].split(',')[1]}
              r="4"
              fill="var(--bh-accretion-gold, #c4922a)"
              stroke="rgba(0,0,0,0.6)"
              strokeWidth="1.5"
              className={`bh-eht-diagram__dot ${vis ? 'bh-eht-diagram__dot--visible' : ''}`}
              style={{ transitionDelay: `${l.delay}s` }}
            />
          </g>
        ))}
      </svg>

      {/* Labels */}
      {labels.map(lb => (
        <div
          key={lb.id}
          className={`bh-eht-diagram__label ${vis ? 'bh-eht-diagram__label--visible' : ''}`}
          style={{ left: lb.x, top: lb.y, textAlign: lb.align, transitionDelay: `${lb.delay}s` }}
        >
          <span className="bh-eht-diagram__label-title">{lb.label}</span>
          <span className="bh-eht-diagram__label-desc">{lb.text}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Observer Duality Split Component ───────────────────────── */
function ObserverDuality() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2400),
      setTimeout(() => setPhase(3), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const externalScenes = [
    { clock: '12:00:00', desc: 'Your friend watches you fall toward the black hole.' },
    { clock: '12:00:01', desc: 'You appear to slow down. Your light begins to shift red.' },
    { clock: '12:00:01', desc: 'You freeze at the horizon — fading from view. To them, you never cross.' },
    { clock: '12:00:01', desc: 'Frozen. Red-shifted. Invisible. Forever.' },
  ];

  const infallingScenes = [
    { clock: '12:00:00', desc: 'You fall freely. Nothing unusual.' },
    { clock: '12:03:47', desc: 'Still nothing. Your watch runs normally.' },
    { clock: '12:07:22', desc: 'You cross the event horizon. Nothing happens.' },
    { clock: '12:07:23', desc: 'But you can never go back.' },
  ];

  const ext = externalScenes[phase];
  const inf = infallingScenes[phase];

  return (
    <div ref={ref} className="bh-observer-split" role="figure" aria-label="Split-screen comparison showing two perspectives of someone falling into a black hole.">
      <div className="bh-observer-panel bh-observer-panel--external" style={{ backgroundColor: phase >= 2 ? '#0d0808' : undefined }}>
        <div className="bh-observer-panel__title">What Your Friend Sees</div>
        <div className="bh-observer-panel__scene">
          <div className={`bh-observer-panel__clock ${phase >= 2 ? 'bh-observer-panel__clock--frozen' : ''}`}>
            {ext.clock}
          </div>
        </div>
        <div className="bh-observer-panel__description">{ext.desc}</div>
      </div>
      <div className="bh-observer-panel">
        <div className="bh-observer-panel__title">What You Experience</div>
        <div className="bh-observer-panel__scene">
          <div className="bh-observer-panel__clock">{inf.clock}</div>
        </div>
        <div className="bh-observer-panel__description">{inf.desc}</div>
      </div>
    </div>
  );
}

/* ─── Horizon Crossing Component ─────────────────────────────── */
function HorizonCrossing() {
  const containerRef = useRef(null);
  const [crossed, setCrossed] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && !crossed) {
      const timer = setTimeout(() => setCrossed(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [inView, crossed]);

  const stars = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.5,
    })), []
  );

  return (
    <div ref={ref} className="bh-crossing" role="figure" aria-label="Scroll-triggered transition simulating crossing a black hole's event horizon.">
      <div className="bh-crossing__starfield" ref={containerRef}>
        {stars.map(s => (
          <div
            key={s.id}
            className="bh-crossing__star"
            style={{
              left: `${s.x}%`,
              top: crossed ? `${s.y * 0.3}%` : `${s.y}%`,
              width: s.size,
              height: s.size,
              opacity: crossed ? s.opacity * 0.4 : s.opacity,
            }}
          />
        ))}
      </div>
      <div className={`bh-crossing__horizon-line ${crossed ? 'bh-crossing__horizon-line--flash' : ''}`} />
      <div className="bh-crossing__label">
        {crossed
          ? "You've crossed the event horizon. Nothing happened."
          : 'Approaching the event horizon...'}
      </div>
    </div>
  );
}


/* ─── Tidal Force Comparison Component ───────────────────────── */
/* Shows a recognizable HUMAN FIGURE being deformed by tidal forces.
   The stretch factor controls how dramatically the silhouette elongates
   vertically and compresses horizontally — spaghettification made visible.
   Card 1 (stellar): figure is almost thread-thin, unmistakably lethal.
   Card 2 (Sgr A*): figure is noticeably elongated but recognizable.
   Card 3 (TON 618): figure is nearly normal — you'd barely notice. */
function TidalComparison() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  const cards = [
    {
      name: 'Stellar Black Hole',
      mass: '10 M☉',
      radius: '~30 km',
      stretch: 3.5,
      color: 'var(--bh-danger-red)',
      rgb: '181,56,42',
      verdict: 'Spaghettified before reaching the horizon.',
      lethal: true,
      forceLabel: 'extreme',
    },
    {
      name: 'Sagittarius A*',
      mass: '4 million M☉',
      radius: '~12 million km',
      stretch: 1.4,
      color: 'var(--bh-accretion-gold)',
      rgb: '196,146,42',
      verdict: 'Survive crossing. ~20 seconds inside.',
      lethal: false,
      forceLabel: 'mild',
    },
    {
      name: 'TON 618',
      mass: '66 billion M☉',
      radius: '~200 billion km',
      stretch: 1.05,
      color: 'var(--bh-horizon-teal)',
      rgb: '26,158,143',
      verdict: 'Cross in comfort. Hours to days inside.',
      lethal: false,
      forceLabel: 'negligible',
    },
  ];

  return (
    <div ref={ref} className="bh-tidal-comparison" role="figure" aria-label="Comparison of tidal forces at the event horizon for three black holes of different masses.">
      {cards.map((c, i) => {
        const cx = 60;

        // ── Visual amplification ──────────────────────────────
        // Raw stretch values (1.05, 1.4, 3.5) cluster near 1.0.
        // We remap to a wider visual range so the DIFFERENCE between
        // "mild" and "negligible" is obvious to the eye:
        //   1.05 → ~1.15  (barely any deformation — normal person)
        //   1.40 → ~2.15  (clearly elongated — visibly uncomfortable)
        //   3.50 → ~5.2   (extreme — spaghetti noodle)
        const s = 1 + Math.pow(c.stretch - 1, 0.7) * 2.2;

        // ── Figure geometry: parameterized by amplified stretch ──
        // As s ↑: figure elongates vertically, compresses horizontally
        const headRx = Math.max(3, 7 / Math.pow(s, 0.35));
        const headRy = Math.max(4, 7 * Math.pow(s, 0.15));
        const neckH = Math.min(8, 4 * Math.pow(s, 0.25));
        const shoulderW = Math.max(3, 24 / Math.pow(s, 0.6));
        const torsoH = Math.min(58, 26 * Math.pow(s, 0.5));
        const torsoW = shoulderW * 0.85;
        const waistW = Math.max(1.5, torsoW * 0.65);
        const armLen = Math.min(40, 20 * Math.pow(s, 0.25));
        const armSpread = Math.max(0, 7 / Math.pow(s, 0.65) - 0.5);
        const legH = Math.min(50, 30 * Math.pow(s, 0.4));
        const legSpread = Math.max(0, 8 / Math.pow(s, 0.6) - 0.5);
        const strokeW = Math.max(0.7, 1.8 / Math.pow(s, 0.4));

        // Center figure vertically in available space (y: 32 → 182)
        const totalH = headRy * 2 + neckH + torsoH + legH;
        const offsetY = 32 + (150 - totalH) / 2;
        const headCy = offsetY + headRy;
        const shoulderY = headCy + headRy + neckH;
        const waistY = shoulderY + torsoH;
        const legBottom = waistY + legH;

        // Arrow sizing (proportional to deformation severity)
        const arrowScale = Math.min(1, (s - 1) * 0.45);
        const vArrowLen = Math.min(18, (s - 1) * 8);
        const hArrowLen = Math.min(14, (s - 1) * 6);
        const showArrows = s > 1.15;

        return (
          <div
            key={c.name}
            className={`bh-tidal-card bh-fade-in ${inView ? 'bh-fade-in--visible' : ''}`}
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <div className="bh-tidal-card__name">{c.name}</div>
            <div className="bh-tidal-card__mass">{c.mass}</div>
            <div className="bh-tidal-card__radius">{c.radius}</div>
            <div className="bh-tidal-card__figure">
              <svg viewBox="0 0 120 200" width="120" height="200">
                <defs>
                  <radialGradient id={`tfield-${i}`} cx="50%" cy="8%" r="80%">
                    <stop offset="0%" stopColor={`rgba(${c.rgb},0.18)`} />
                    <stop offset="100%" stopColor={`rgba(${c.rgb},0)`} />
                  </radialGradient>
                </defs>

                {/* Force field gradient background */}
                <rect x="0" y="0" width="120" height="200" fill={`url(#tfield-${i})`} />

                {/* Black hole (gravitational source) */}
                <circle cx={cx} cy="16" r="13" fill="#050508" stroke={c.color} strokeWidth="1.5" opacity="0.6" />
                <circle cx={cx} cy="16" r="5.5" fill="#050508" />

                {/* Force field lines converging toward the hole */}
                {[-0.55, -0.3, -0.1, 0.1, 0.3, 0.55].map((f, j) => (
                  <line key={j}
                    x1={cx + 38 * f} y1="30"
                    x2={cx + 16 * f} y2="195"
                    stroke={c.color} strokeWidth="0.5" opacity={0.06 + Math.abs(f) * 0.05}
                  />
                ))}

                {/* ── Human figure silhouette ── */}

                {/* Head */}
                <ellipse cx={cx} cy={headCy} rx={headRx} ry={headRy}
                  fill={`rgba(${c.rgb},0.3)`} stroke={c.color} strokeWidth={strokeW} opacity="0.7" />

                {/* Neck */}
                <line x1={cx} y1={headCy + headRy} x2={cx} y2={shoulderY}
                  stroke={c.color} strokeWidth={strokeW * 0.8} opacity="0.45" />

                {/* Shoulders */}
                <line x1={cx - shoulderW / 2} y1={shoulderY} x2={cx + shoulderW / 2} y2={shoulderY}
                  stroke={c.color} strokeWidth={strokeW} opacity="0.5" strokeLinecap="round" />

                {/* Torso (trapezoid: wider at shoulders, narrower at waist) */}
                <path
                  d={`M ${cx - torsoW / 2} ${shoulderY} L ${cx - waistW / 2} ${waistY} L ${cx + waistW / 2} ${waistY} L ${cx + torsoW / 2} ${shoulderY} Z`}
                  fill={`rgba(${c.rgb},0.1)`} stroke={c.color} strokeWidth={strokeW * 0.8}
                  opacity="0.45" strokeLinejoin="round" />

                {/* Arms (hang from shoulders — compress inward with stretch) */}
                <path
                  d={`M ${cx - shoulderW / 2} ${shoulderY} Q ${cx - shoulderW / 2 - armSpread} ${shoulderY + armLen * 0.45} ${cx - shoulderW / 2 - armSpread + 0.5} ${shoulderY + armLen}`}
                  fill="none" stroke={c.color} strokeWidth={strokeW * 0.7} opacity="0.35" strokeLinecap="round" />
                <path
                  d={`M ${cx + shoulderW / 2} ${shoulderY} Q ${cx + shoulderW / 2 + armSpread} ${shoulderY + armLen * 0.45} ${cx + shoulderW / 2 + armSpread - 0.5} ${shoulderY + armLen}`}
                  fill="none" stroke={c.color} strokeWidth={strokeW * 0.7} opacity="0.35" strokeLinecap="round" />

                {/* Legs */}
                <line x1={cx - waistW * 0.3} y1={waistY} x2={cx - legSpread} y2={legBottom}
                  stroke={c.color} strokeWidth={strokeW} opacity="0.5" strokeLinecap="round" />
                <line x1={cx + waistW * 0.3} y1={waistY} x2={cx + legSpread} y2={legBottom}
                  stroke={c.color} strokeWidth={strokeW} opacity="0.5" strokeLinecap="round" />

                {/* ── Tidal force arrows ── */}
                {showArrows && (
                  <>
                    {/* Vertical stretch: upward arrow above head */}
                    <line x1={cx} y1={headCy - headRy - 4 - vArrowLen} x2={cx} y2={headCy - headRy - 4}
                      stroke={c.color} strokeWidth="1.5" opacity={arrowScale * 0.55} />
                    <polygon
                      points={`${cx},${headCy - headRy - 4 - vArrowLen - 5} ${cx - 4},${headCy - headRy - 4 - vArrowLen + 1} ${cx + 4},${headCy - headRy - 4 - vArrowLen + 1}`}
                      fill={c.color} opacity={arrowScale * 0.55} />

                    {/* Vertical stretch: downward arrow below feet */}
                    <line x1={cx} y1={legBottom + 4} x2={cx} y2={legBottom + 4 + vArrowLen}
                      stroke={c.color} strokeWidth="1.5" opacity={arrowScale * 0.55} />
                    <polygon
                      points={`${cx},${legBottom + 4 + vArrowLen + 5} ${cx - 4},${legBottom + 4 + vArrowLen - 1} ${cx + 4},${legBottom + 4 + vArrowLen - 1}`}
                      fill={c.color} opacity={arrowScale * 0.55} />

                    {/* Horizontal compression: left inward arrow */}
                    <line x1={cx - shoulderW / 2 - armSpread - 6 - hArrowLen} y1={shoulderY + torsoH * 0.4}
                      x2={cx - shoulderW / 2 - armSpread - 6} y2={shoulderY + torsoH * 0.4}
                      stroke={c.color} strokeWidth="1.2" opacity={arrowScale * 0.4} />
                    <polygon
                      points={`${cx - shoulderW / 2 - armSpread - 4},${shoulderY + torsoH * 0.4} ${cx - shoulderW / 2 - armSpread - 10},${shoulderY + torsoH * 0.4 - 3.5} ${cx - shoulderW / 2 - armSpread - 10},${shoulderY + torsoH * 0.4 + 3.5}`}
                      fill={c.color} opacity={arrowScale * 0.4} />

                    {/* Horizontal compression: right inward arrow */}
                    <line x1={cx + shoulderW / 2 + armSpread + 6} y1={shoulderY + torsoH * 0.4}
                      x2={cx + shoulderW / 2 + armSpread + 6 + hArrowLen} y2={shoulderY + torsoH * 0.4}
                      stroke={c.color} strokeWidth="1.2" opacity={arrowScale * 0.4} />
                    <polygon
                      points={`${cx + shoulderW / 2 + armSpread + 4},${shoulderY + torsoH * 0.4} ${cx + shoulderW / 2 + armSpread + 10},${shoulderY + torsoH * 0.4 - 3.5} ${cx + shoulderW / 2 + armSpread + 10},${shoulderY + torsoH * 0.4 + 3.5}`}
                      fill={c.color} opacity={arrowScale * 0.4} />
                  </>
                )}

                {/* Force magnitude label */}
                <text x="60" y="195" textAnchor="middle"
                  style={{ fontSize: '9px', fill: c.color, opacity: 0.5, fontFamily: "var(--bh-font-mono), monospace" }}>
                  ∝ 1/M² → {c.forceLabel}
                </text>
              </svg>
            </div>
            <div className={`bh-tidal-card__verdict ${c.lethal ? 'bh-tidal-card__verdict--lethal' : 'bh-tidal-card__verdict--safe'}`}>
              {c.verdict}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Information Flow Diagram ───────────────────────────────── */
function InformationFlow() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  // Random thermal dots representing featureless Hawking radiation
  const thermalDots = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      x: 8 + Math.random() * 84,
      y: 8 + Math.random() * 84,
      r: 1.5 + Math.random() * 3,
      o: 0.35 + Math.random() * 0.45,
    })), []
  );

  // Bespoke SVG illustrations — each conveys the RICHNESS of the information it represents.
  // The visual character of each icon contrasts with the featureless thermal noise on the right.
  const StructuredIcons = [
    // ── Open book — organized information, structure, meaning ──
    <svg key="book" viewBox="0 0 40 40" width="36" height="36" className="bh-info-flow__svg-icon">
      {/* Left page — slight curve at spine suggests binding */}
      <path d="M 20 7 C 15 7, 6 8.5, 4 10 L 4 33 C 6 32, 15 31, 20 31.5 Z"
        fill="rgba(61,126,199,0.08)" stroke="#3d7ec7" strokeWidth="1" strokeLinejoin="round" opacity="0.55" />
      {/* Right page */}
      <path d="M 20 7 C 25 7, 34 8.5, 36 10 L 36 33 C 34 32, 25 31, 20 31.5 Z"
        fill="rgba(61,126,199,0.05)" stroke="#3d7ec7" strokeWidth="1" strokeLinejoin="round" opacity="0.55" />
      {/* Spine */}
      <line x1="20" y1="7" x2="20" y2="31.5" stroke="#3d7ec7" strokeWidth="0.6" opacity="0.35" />
      {/* Text lines — the content with meaning */}
      <line x1="8" y1="15" x2="17" y2="14.5" stroke="#3d7ec7" strokeWidth="0.6" opacity="0.28" />
      <line x1="8" y1="19" x2="16" y2="18.5" stroke="#3d7ec7" strokeWidth="0.6" opacity="0.2" />
      <line x1="8" y1="23" x2="17" y2="22.5" stroke="#3d7ec7" strokeWidth="0.6" opacity="0.28" />
      <line x1="8" y1="27" x2="14" y2="26.7" stroke="#3d7ec7" strokeWidth="0.6" opacity="0.15" />
      <line x1="23" y1="14.5" x2="32" y2="15" stroke="#3d7ec7" strokeWidth="0.6" opacity="0.28" />
      <line x1="23" y1="18.5" x2="31" y2="19" stroke="#3d7ec7" strokeWidth="0.6" opacity="0.2" />
      <line x1="23" y1="22.5" x2="32" y2="23" stroke="#3d7ec7" strokeWidth="0.6" opacity="0.28" />
    </svg>,

    // ── Human figure with internal quantum-state constellation ──
    // A person is not just a shape — it's an irreducible network of quantum states.
    // The body outline gives recognition; the internal nodes convey complexity.
    <svg key="person" viewBox="0 0 40 40" width="36" height="36" className="bh-info-flow__svg-icon">
      {/* Head */}
      <circle cx="20" cy="8" r="4" fill="rgba(26,158,143,0.06)" stroke="#1a9e8f" strokeWidth="0.9" opacity="0.5" />
      {/* Body — shoulders to waist silhouette */}
      <path d="M 12 17 C 14 14, 18 12.5, 20 12.5 C 22 12.5, 26 14, 28 17 L 26 30 C 24 32, 22 33, 20 33 C 18 33, 16 32, 14 30 Z"
        fill="rgba(26,158,143,0.04)" stroke="#1a9e8f" strokeWidth="0.9" opacity="0.4" />
      {/* Internal quantum-state nodes — the information that defines this person */}
      <circle cx="17" cy="20" r="1" fill="#1a9e8f" opacity="0.5" />
      <circle cx="23" cy="20" r="1" fill="#1a9e8f" opacity="0.5" />
      <circle cx="20" cy="17" r="0.7" fill="#1a9e8f" opacity="0.4" />
      <circle cx="20" cy="24" r="0.9" fill="#1a9e8f" opacity="0.4" />
      <circle cx="16" cy="27" r="0.6" fill="#1a9e8f" opacity="0.3" />
      <circle cx="24" cy="27" r="0.6" fill="#1a9e8f" opacity="0.3" />
      <circle cx="20" cy="30" r="0.5" fill="#1a9e8f" opacity="0.25" />
      {/* Quantum connections — entangled states that make this person unique */}
      <line x1="17" y1="20" x2="23" y2="20" stroke="#1a9e8f" strokeWidth="0.4" opacity="0.2" />
      <line x1="17" y1="20" x2="20" y2="24" stroke="#1a9e8f" strokeWidth="0.4" opacity="0.15" />
      <line x1="23" y1="20" x2="20" y2="24" stroke="#1a9e8f" strokeWidth="0.4" opacity="0.15" />
      <line x1="20" y1="17" x2="17" y2="20" stroke="#1a9e8f" strokeWidth="0.3" opacity="0.12" />
      <line x1="20" y1="17" x2="23" y2="20" stroke="#1a9e8f" strokeWidth="0.3" opacity="0.12" />
      <line x1="16" y1="27" x2="20" y2="30" stroke="#1a9e8f" strokeWidth="0.3" opacity="0.1" />
      <line x1="24" y1="27" x2="20" y2="30" stroke="#1a9e8f" strokeWidth="0.3" opacity="0.1" />
      {/* Mind — subtle glow in the head */}
      <circle cx="20" cy="8" r="1.8" fill="#1a9e8f" opacity="0.06" />
    </svg>,

    // ── Stellar body — layered structure with corona ──
    // A star is concentric layers: core → radiative zone → convective zone → photosphere → corona.
    // Each layer carries information about mass, composition, history.
    <svg key="stellar" viewBox="0 0 40 40" width="36" height="36" className="bh-info-flow__svg-icon">
      {/* Outer corona */}
      <circle cx="20" cy="20" r="17" fill="none" stroke="#c4922a" strokeWidth="0.4" opacity="0.12" />
      {/* Chromosphere */}
      <circle cx="20" cy="20" r="13" fill="none" stroke="#c4922a" strokeWidth="0.5" opacity="0.18" />
      {/* Photosphere (visible surface) */}
      <circle cx="20" cy="20" r="9" fill="rgba(196,146,42,0.06)" stroke="#c4922a" strokeWidth="0.9" opacity="0.4" />
      {/* Radiative zone */}
      <circle cx="20" cy="20" r="5.5" fill="rgba(196,146,42,0.1)" stroke="#c4922a" strokeWidth="0.6" opacity="0.35" />
      {/* Core — where fusion happens */}
      <circle cx="20" cy="20" r="2.5" fill="rgba(196,146,42,0.25)" opacity="0.6" />
      {/* Corona emission rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, j) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line key={j}
            x1={20 + Math.cos(rad) * 10} y1={20 + Math.sin(rad) * 10}
            x2={20 + Math.cos(rad) * 16} y2={20 + Math.sin(rad) * 16}
            stroke="#c4922a" strokeWidth="0.5" opacity={0.1 + (j % 2) * 0.08} />
        );
      })}
    </svg>,
  ];

  const items = [
    { label: 'A book', sub: 'Organized content with meaning' },
    { label: 'A person', sub: 'Complete quantum state' },
    { label: 'A star', sub: 'Mass, composition, history' },
  ];

  const iconTypes = ['book', 'person', 'star'];

  return (
    <div ref={ref} className={`bh-info-flow ${inView ? 'bh-info-flow--active' : ''}`}
      role="figure" aria-label="The information paradox: structured information enters a black hole, only featureless thermal radiation exits.">

      <div className="bh-info-flow__input">
        <div className="bh-info-flow__column-label">Falls In</div>
        {items.map((item, i) => (
          <div key={i} className={`bh-info-flow__item bh-info-flow__item--${iconTypes[i]}`}>
            <span className={`bh-info-flow__item-icon bh-info-flow__icon--${iconTypes[i]}`}>{StructuredIcons[i]}</span>
            <span className="bh-info-flow__item-text">
              <span className="bh-info-flow__item-label">{item.label}</span>
              <span className="bh-info-flow__item-sublabel">{item.sub}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="bh-info-flow__center">
        {/* Converging arrows */}
        <svg className="bh-info-flow__conv-arrows" viewBox="0 0 40 80" width="24" height="48">
          <line x1="0" y1="15" x2="36" y2="40" stroke="var(--bh-diagram-line)" strokeWidth="1" opacity="0.35" />
          <line x1="0" y1="40" x2="36" y2="40" stroke="var(--bh-diagram-line)" strokeWidth="1" opacity="0.45" />
          <line x1="0" y1="65" x2="36" y2="40" stroke="var(--bh-diagram-line)" strokeWidth="1" opacity="0.35" />
          <polygon points="37,40 30,36 30,44" fill="var(--bh-diagram-line)" opacity="0.4" />
        </svg>

        <div className="bh-info-flow__hole-wrap">
          <div className="bh-info-flow__accretion-ring" />
          <div className="bh-info-flow__hole" />
        </div>

        {/* Diverging dashed arrows */}
        <svg className="bh-info-flow__div-arrows" viewBox="0 0 40 80" width="24" height="48">
          <line x1="4" y1="40" x2="40" y2="15" stroke="var(--bh-quantum-violet-dim)" strokeWidth="1" opacity="0.25" strokeDasharray="3 4" />
          <line x1="4" y1="40" x2="40" y2="40" stroke="var(--bh-quantum-violet-dim)" strokeWidth="1" opacity="0.35" strokeDasharray="3 4" />
          <line x1="4" y1="40" x2="40" y2="65" stroke="var(--bh-quantum-violet-dim)" strokeWidth="1" opacity="0.25" strokeDasharray="3 4" />
        </svg>

        <span className="bh-info-flow__center-label bh-caption">Black Hole</span>
      </div>

      <div className="bh-info-flow__output">
        <div className="bh-info-flow__column-label">Comes Out</div>
        <div className="bh-info-flow__thermal-box">
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            {thermalDots.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="var(--bh-quantum-violet-bright)" opacity={d.o} />
            ))}
          </svg>
        </div>
        <div className="bh-info-flow__thermal-desc">
          <span className="bh-info-flow__thermal-title">Thermal noise</span>
          <span className="bh-info-flow__thermal-detail">Perfectly random. Featureless. No trace of what fell in.</span>
        </div>
      </div>

      <div className="bh-info-flow__paradox">
        <div className="bh-info-flow__paradox-label">The Paradox</div>
        <div className="bh-info-flow__paradox-text">
          Quantum mechanics says information can never be truly destroyed.
          But Hawking radiation carries no information about what fell in.
          If the black hole evaporates completely, the information is simply… gone.
        </div>
      </div>
    </div>
  );
}

/* ─── Section Wrapper ────────────────────────────────────────── */
function Section({ id, className = '', children }) {
  const [ref, inView] = useInView({ threshold: 0.1 });
  return (
    <section
      ref={ref}
      id={id}
      className={`bh-section ${className} bh-fade-in ${inView ? 'bh-fade-in--visible' : ''}`}
    >
      {children}
    </section>
  );
}

/* ─── Main Essay Component ───────────────────────────────────── */
export default function InsideABlackHoleClient() {
  const scrollProgress = useScrollProgress();

  return (
    <article className={`bh-essay ${newsreader.variable} ${jetbrainsMono.variable}`}>
      {/* Progress bar */}
      <div className="bh-progress">
        <div className="bh-progress__bar" style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>

      {/* ═══ HERO ═══ */}
      <header className="bh-hero">
        <h1 className="bh-title">Inside a Black Hole</h1>
        <p className="bh-subtitle">What physics actually tells us about the most extreme object in the universe</p>
      </header>

      {/* ═══ SECTION 1: We Photographed One ═══ */}
      <Section id="photographed">
        <div className="bh-prose-container bh-prose">
          <h2 className="bh-section-heading">We Photographed One</h2>
          <p>
            On April 10, 2019, the Event Horizon Telescope collaboration released an image that took
            eight telescopes spanning four continents, five petabytes of data, and two years of
            computational processing to develop. It showed a glowing ring of light surrounding an
            abyss of total darkness. Humanity had photographed a black hole.
          </p>
          <p>
            The image — of M87*, a supermassive black hole 55 million light-years away with the mass
            of 6.5 billion suns — was not what most people expected. No swirling vortex. No dramatic
            funnel. Just a lopsided ring of fire around a void. Three years later, the same team
            captured Sagittarius A*, the black hole at the center of our own galaxy.
            <span className="bh-citation"> [EHT Collaboration, 2019; Akiyama et al., 2022]</span>
          </p>
        </div>

        <div className="bh-vis-container">
          <EHTRing />
        </div>

        <div className="bh-prose-container bh-prose">
          <p>
            That bright ring is not the black hole. It is superheated plasma — gas heated to billions
            of degrees — orbiting just outside the point of no return. The darkness at the center is
            the shadow: the region where photons crossed the event horizon and never returned. We are
            looking at absence made visible.
          </p>
          <p>
            Black holes are no longer theoretical. LIGO detected gravitational waves from two merging
            black holes in 2015 — ripples in spacetime itself, arriving exactly as Einstein's equations
            predicted a century earlier.
            <span className="bh-citation"> [Abbott et al., 2016]</span>
          </p>
          <p>
            We know what they look like from the outside. But what happens <em>inside</em>? The answer
            is stranger than any science fiction — and it begins with a paradox about time.
          </p>
        </div>
      </Section>

      {/* ═══ SECTION 2: Approaching the Horizon ═══ */}
      <Section id="approaching">
        <div className="bh-prose-container bh-prose">
          <h2 className="bh-section-heading">Approaching the Horizon</h2>
          <p>
            Imagine your friend watches you fall toward a black hole from a safe distance.
            What they see and what you experience are not just different — they are irreconcilable.
            And both are simultaneously, physically real.
          </p>
          <p>
            This is not a metaphor. It is a mathematical consequence of the Schwarzschild metric —
            the equation Karl Schwarzschild derived in 1916, while serving on the Eastern Front of
            World War I, describing the curvature of spacetime around a spherical mass.
            <span className="bh-citation"> [Schwarzschild, 1916]</span>
          </p>
        </div>

        <div className="bh-vis-container">
          <ObserverDuality />
        </div>

        <div className="bh-prose-container bh-prose">
          <p>
            For your friend, time dilation becomes infinite at the event horizon. They watch you
            slow down, redshift from visible light to infrared to radio waves, and asymptotically
            freeze — never quite reaching the boundary. To them, you hover there forever, fading
            from view but never crossing.
            <span className="bh-citation"> [Carroll, 2004]</span>
          </p>
          <p>
            For you, falling freely, none of this happens. Your watch ticks normally. You cross the
            event horizon in finite time — minutes or hours depending on the black hole's mass. You
            notice nothing special at the boundary. The universe outside is still visible above you.
            But from the moment you cross, no signal you send — no photon, no radio wave, no
            gravitational wave — will ever reach your friend again.
          </p>
          <p>
            Two observers. Two realities. Both correct. So what happens when you actually cross?
          </p>
        </div>
      </Section>

      {/* ═══ SECTION 3: The Crossing ═══ */}
      <Section id="crossing">
        <div className="bh-prose-container bh-prose">
          <h2 className="bh-section-heading">The Crossing</h2>
          <p>
            You're moments from the event horizon. Every instinct says something dramatic should
            happen — a wall, a membrane, a flash of light, a physical sensation. You brace yourself.
          </p>
        </div>

        <div className="bh-vis-container">
          <HorizonCrossing />
        </div>

        <div className="bh-prose-container bh-prose">
          <p>
            The most surprising thing about crossing the event horizon is that nothing happens.
            No wall. No flash. No alarm. The event horizon is not a physical surface — it is a
            mathematical boundary, as invisible and intangible as the equator.
            <span className="bh-citation"> [Thorne, 1994]</span>
          </p>
          <p>
            For a supermassive black hole — one with millions or billions of solar masses — you would
            not even notice tidal forces at the crossing. The curvature of spacetime at the horizon
            of a supermassive black hole is gentle. It is only for stellar-mass black holes, small and
            intensely curved, that the tidal stretch becomes lethal before you even arrive.
            <span className="bh-citation"> [Misner, Thorne, Wheeler, 1973]</span>
          </p>

          <div className="bh-pull-quote">
            The most anticlimactic moment in the most extreme object in the universe. You crossed
            the point of no return — and felt nothing at all.
          </div>

          <p>
            But everything has changed. Looking up, you can still see the universe — stars,
            galaxies, the light of everything outside — compressed into a shrinking circle above you.
            Looking in any other direction: darkness. And ahead of you is something your spatial
            intuition cannot prepare you for.
          </p>
        </div>
      </Section>

      {/* ═══ SECTION 4: Where Space Becomes Time ═══ */}
      <Section id="spacetime-swap">
        <div className="bh-prose-container bh-prose">
          <h2 className="bh-section-heading">Where Space Becomes Time</h2>
          <p>
            Now the universe turns inside out.
          </p>
          <p>
            If you've imagined the singularity as a point at the center of the black hole — a dense
            dot you fall toward like a marble rolling into a bowl — you need to abandon that image
            entirely. It is the most widely held and most completely wrong intuition about black holes.
          </p>
        </div>

        <div className="bh-vis-container bh-vis-container--3d">
          <VisualizationErrorBoundary>
            <SpacetimeVisualization />
          </VisualizationErrorBoundary>
          <p className="bh-vis-caption">
            Spacetime curves so steeply inside the event horizon (teal ring) that every path — 
            shown as light cones on the surface — tilts inward. The gold particles spiral in from all 
            directions, demonstrating that no trajectory can escape. The singularity waits at the bottom.
          </p>
        </div>

        <div className="bh-prose-container bh-prose">
          <p>
            Inside the event horizon, the roles of space and time swap. The radial coordinate — the
            direction toward what you'd call "the center" — becomes timelike. The singularity is not
            a place in space you travel toward. It is a moment in your future.
            <span className="bh-citation"> [Penrose, 1965; Misner, Thorne, Wheeler, 1973]</span>
          </p>

          <div className="bh-pull-quote">
            Inside a black hole, the singularity is not a point at the center you fall toward.
            It is a moment in your future — as unavoidable as next Tuesday.
          </div>

          <p>
            You can no more avoid the singularity than you can avoid tomorrow. You can flail around,
            change direction, fire rockets at maximum thrust in the opposite direction — and every
            one of these actions brings you to the singularity <em>faster</em>, not slower. Attempting
            to escape is like trying to run backward through time.
          </p>
          <p>
            This is not a consequence of overwhelming gravitational force. It is a consequence of
            geometry. Inside the horizon, every possible trajectory — every path through spacetime
            that obeys the laws of physics — terminates at the singularity. It is built into the
            structure of spacetime itself.
          </p>
        </div>
      </Section>

      {/* ═══ SECTION 5: The Stretch ═══ */}
      <Section id="spaghettification">
        <div className="bh-prose-container bh-prose">
          <h2 className="bh-section-heading">The Stretch</h2>
          <p>
            As you fall toward the moment you cannot avoid, the tidal forces grow. The curvature
            of spacetime is steeper on the side of your body closer to the singularity than the side
            farther away — what physicists call tidal forces. The result: you are stretched vertically
            and compressed horizontally — spaghettified, in the word Stephen Hawking coined.
          </p>
          <p>
            But the severity of spaghettification depends entirely on the black hole's mass. The
            tidal force at the horizon scales as 1/M² — the square of the mass. A more massive
            black hole means a more gentle crossing.
          </p>
        </div>

        <div className="bh-vis-container">
          <TidalComparison />
        </div>

        <div className="bh-prose-container bh-prose">
          <p>
            For a stellar black hole of 10 solar masses, the tidal forces would tear you apart
            long before you reached the event horizon. For Sagittarius A*, the supermassive black
            hole at the center of our galaxy, you could cross the horizon in comfort and survive
            for roughly 20 seconds of proper time inside. For the most massive black holes known —
            like TON 618, at 66 billion solar masses — you could live for hours.
            <span className="bh-citation"> [Thorne, 1994; Hamilton, 2021]</span>
          </p>
          <p>
            Looking outward during these final moments, you would see something extraordinary. The
            entire visible universe — every star, every galaxy — compressed into a shrinking bright
            circle directly above you. Cosmic history plays out in fast-forward as light from the
            outside universe blueshifts to extreme energies. The universe is saying goodbye.
          </p>
        </div>
      </Section>

      {/* ═══ SECTION 6: Reading the Map of Everything ═══ */}
      <Section id="penrose">
        <div className="bh-prose-container bh-prose">
          <h2 className="bh-section-heading">Reading the Map of Everything</h2>
          <p>
            Physicists needed a way to see the causal structure of spacetime at a glance — to
            determine instantly which events can influence which, where signals can travel, and
            where they cannot. In 1963, Roger Penrose invented one: the conformal diagram.
            <span className="bh-citation"> [Penrose, 1963]</span>
          </p>
          <p>
            A Penrose diagram maps all of spacetime — past, present, future, even infinity — onto
            a finite diamond-shaped page using a coordinate transformation that preserves one
            critical property: light always travels at exactly 45° angles. This single rule makes
            causal structure immediately visible.
          </p>
        </div>

        <div className="bh-vis-container bh-vis-container--penrose3d">
          <VisualizationErrorBoundary>
            <PenroseVisualization />
          </VisualizationErrorBoundary>
        </div>

        <div className="bh-prose-container bh-prose">
          <p>
            Tap any point on the diagram to see its light cone — the set of all events it can
            possibly influence. Outside the event horizon, light cones reach future infinity. A
            signal sent from there can, in principle, reach anywhere in the universe.
          </p>
          <p>
            Inside the horizon, every light cone points upward — toward the singularity. There is
            no direction you can orient a light cone that avoids it. This is not because something
            is blocking the light. It is because the geometry of spacetime inside the horizon
            <em> has no outward directions</em>. Every direction is toward the future. And the
            future is the singularity.
            <span className="bh-citation"> [Hawking & Ellis, 1973]</span>
          </p>
          <p>
            This is the complete classical picture — elegant, beautiful, mathematically exact. General
            relativity gives us a perfect map of a black hole's interior. But it is missing something.
            When you add quantum mechanics, everything breaks.
          </p>
        </div>
      </Section>

      {/* ═══ SECTION 7: The Evaporating Paradox ═══ */}
      <Section id="information-paradox" className="bh-section--quantum">
        <div className="bh-prose-container bh-prose">
          <h2 className="bh-section-heading">The Evaporating Paradox</h2>
          <p>
            In 1974, Stephen Hawking made a calculation that would haunt physics for half a century.
            Working at the intersection of quantum field theory and general relativity — two
            frameworks that had never been successfully combined — he showed that black holes are
            not perfectly black. They glow.
            <span className="bh-citation"> [Hawking, 1975]</span>
          </p>
          <p>
            Quantum effects near the event horizon cause black holes to emit faint thermal radiation
            — now called Hawking radiation. This radiation carries energy away from the black hole,
            which means the black hole slowly loses mass. Given enough time — roughly 10⁶⁷ years for
            a stellar-mass black hole, inconceivably longer than the current age of the universe — it
            would evaporate completely.
          </p>
          <p>
            But here is where the story breaks.
          </p>
        </div>

        <div className="bh-vis-container">
          <InformationFlow />
        </div>

        <div className="bh-prose-container bh-prose">
          <p>
            Think of burning a book. In principle, if you collected every ash particle, every photon
            of light, every molecule of smoke, you could reconstruct the text. The information is
            scrambled beyond any practical recovery, but it still exists somewhere in the universe.
            <span className="bh-citation"> [Susskind, 2008]</span>
          </p>
          <p>
            Hawking radiation is different. It is purely thermal — perfectly random, bearing no
            relationship whatsoever to what fell into the black hole. It's as if the smoke from the
            fire contained no trace of which book was burned. The information doesn't get scrambled.
            It seems to <em>vanish</em>.
          </p>

          <div className="bh-pull-quote">
            If a black hole evaporates completely, where does the information about everything
            that fell in go? Quantum mechanics says it can't be destroyed. Hawking's calculation
            says it is. Someone is wrong.
          </div>

          <p>
            This is the information paradox, and it has been debated since 1976. It pits the two
            pillars of modern physics against each other: general relativity (which says black holes
            can evaporate) and quantum mechanics (which says information is never destroyed).
            Resolving it may require changing something fundamental about one — or both — of these
            theories.
            <span className="bh-citation"> [Hawking, 1976]</span>
          </p>
        </div>
      </Section>

      {/* ═══ SECTION 8: Firewalls, Holograms, and the Frontier ═══ */}
      <Section id="frontier" className="bh-section--quantum">
        <div className="bh-prose-container bh-prose">
          <h2 className="bh-section-heading">Firewalls, Holograms, and the Frontier</h2>
          <p>
            In 2012, four physicists — Ahmed Almheiri, Donald Marolf, Joseph Polchinski, and James
            Sully — published a paper that sharpened the information paradox into a razor. They showed
            that three individually reasonable assumptions about black holes are mutually contradictory.
            At least one must be wrong. Several proposed resolutions exist — none proven, each with
            radical implications for our understanding of spacetime.
            <span className="bh-citation"> [Almheiri et al., 2013]</span>
          </p>
          <p>
            The three assumptions: (1) Hawking radiation preserves information (unitarity holds).
            (2) The event horizon is smooth — an infalling observer notices nothing special when
            crossing. (3) Local quantum field theory is valid outside the horizon.
          </p>
          <p>
            If you accept (1) and (3), then (2) must be false — the event horizon is NOT smooth.
            Instead, there is a "firewall" of high-energy particles that would incinerate anything
            that crosses. Everything we said in Section 3 — the gentle, unremarkable crossing — would
            be wrong.
          </p>
          <p>
            Before AMPS, Leonard Susskind had proposed a different resolution: black hole
            complementarity. Information is both reflected at the horizon (from an outside observer's
            perspective) and passes through (from the infalling observer's perspective). No single
            observer can ever witness the contradiction, so there is no paradox — just two
            complementary descriptions of the same physics.
            <span className="bh-citation"> [Susskind, Thorlacius, Uglum, 1993]</span>
          </p>
          <p>
            Others look to the holographic principle — the idea that all information inside the
            black hole is encoded on its two-dimensional event horizon surface, like data on a DVD.
            The mathematics of the AdS/CFT correspondence, discovered by Juan Maldacena in 1997,
            provides a concrete framework where this works perfectly. But it works in a universe
            with different geometry than ours.
            <span className="bh-citation"> [Maldacena, 1999]</span>
          </p>
          <p>
            Fifty years after Hawking's calculation, there is no consensus. The information paradox
            remains open — arguably the most important unsolved problem in theoretical physics.
            Whichever assumption falls, our understanding of the universe changes with it.
          </p>
        </div>
      </Section>

      {/* ═══ SECTION 9: What Black Holes Tell Us About Reality ═══ */}
      <Section id="reality">
        <div className="bh-prose-container bh-prose">
          <h2 className="bh-section-heading">What Black Holes Tell Us About Reality</h2>
          <p>
            In 1973, Jacob Bekenstein made an observation that still astonishes. The entropy of a
            black hole — its information content, the number of distinct quantum states it could
            have — is proportional not to its volume, but to the <em>area</em> of its event horizon.
            <span className="bh-citation"> [Bekenstein, 1973]</span>
          </p>
          <p>
            This is deeply strange. For every other physical system, entropy scales with volume. A
            box twice as large can hold twice as many states. But a black hole's information capacity
            is written on its surface, not contained in its interior. It is as if the interior is a
            projection — a hologram — of the boundary.
            <span className="bh-citation"> [Bousso, 2002]</span>
          </p>
          <p>
            The holographic principle, inspired by this discovery, proposes that this is not unique
            to black holes. All of three-dimensional reality may be a projection of information
            encoded on a two-dimensional boundary. Our experience of depth, volume, and interiority
            may emerge from a fundamentally flat encoding.
          </p>
          <p>
            Black holes are not just the universe's most extreme objects. They are its most
            <em>revealing</em>. The event horizon is where general relativity and quantum mechanics
            collide. The singularity is where general relativity predicts infinite density — not as a
            physical reality, but as an admission that the theory has reached its limit and something
            deeper must take over. The information paradox is where the deepest principles of physics
            contradict each other.
          </p>
          <p>
            We went inside a black hole — as far as physics can take us — and found the limits of
            human knowledge. Not a wall, not a void, but a question: What is the nature of spacetime
            itself? The answer, when it comes, will not just resolve a paradox. It will rewrite our
            understanding of reality.
          </p>

          <div className="bh-pull-quote">
            Black holes aren't just the universe's most extreme objects. They may be its most
            fundamental — the place where the deepest laws of nature are written, and where we
            can almost, but not quite, read them.
          </div>
        </div>
      </Section>

      {/* ═══ SOURCES ═══ */}
      <footer className="bh-sources">
        <div className="bh-sources__title">Sources</div>
        <div className="bh-sources__list">
          {SOURCES.map((s, i) => (
            <div key={i} className="bh-sources__item">{s}</div>
          ))}
        </div>
      </footer>
    </article>
  );
}
