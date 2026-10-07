'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import './the-anatomy-of-a-wave.css';

/* ═══════════════════════════════════════════════════════════════
   THE ANATOMY OF A WAVE — Client Component
   ═══════════════════════════════════════════════════════════════
   Progressive abstraction: ocean → sound → light → quantum.
   7 interactive visualizations, 9 prose sections.
   ═══════════════════════════════════════════════════════════════ */

/* ─── Intersection Observer Hook ─── */
function useInView(opts = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); if (!opts.repeat) io.disconnect(); } else if (opts.repeat) setVisible(false); },
      { threshold: opts.threshold ?? 0.15, rootMargin: opts.rootMargin ?? '0px' }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [opts.threshold, opts.rootMargin, opts.repeat]);
  return [ref, visible];
}

/* ─── Reduced-motion check ─── */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

/* ═══════════════════════════════════════════════════════════════
   D1 — Ocean Wave Anatomy (SVG)
   Interactive SVG showing amplitude, wavelength, crest, trough.
   ═══════════════════════════════════════════════════════════════ */
/**
 * @diagram-contract
 * @diagram D1-ocean-wave-anatomy
 * @domain wave-mechanics
 *
 * @invariant PROPAGATION_DIRECTION +x
 *   arrow_label: "wave direction" points +x (rightward)
 *   phase_formula: sin(kx - ωt) — phase subtracted for +x propagation
 *   validation: as phase increments, crest x-position increases between frames
 *
 * @invariant AMPLITUDE_SYMMETRY
 *   crest_y: midY - amp (above equilibrium)
 *   trough_y: midY + amp (below equilibrium)
 *   label: "amplitude" arrow spans equilibrium (midY) → crest (midY - amp)
 *
 * @invariant WAVELENGTH_SPAN
 *   label: "λ (wavelength)" bracket spans x=0 to x=wl (one full cycle)
 *   code: bracket endpoints at x1=0, x2=wl
 *
 * @invariant LABEL_POSITION_ACCURACY
 *   "crest" circle + label at (wl/4, midY - amp) — sin() maximum
 *   "trough" circle + label at (wl*0.75, midY + amp) — sin() minimum
 *   "equilibrium" text at y=midY — zero displacement line
 */
function OceanWaveAnatomy({ visible }) {
  const svgRef = useRef(null);
  const animRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  const W = 800;
  const H = 450;
  const midY = H * 0.5;
  const amp = 80;
  const wl = 300; // wavelength in px

  useEffect(() => {
    if (!visible || reducedMotion) return;
    const svg = svgRef.current;
    if (!svg) return;

    let phase = 0;
    let _devAsserted = false;
    let _devPrevCrestX = null;

    const draw = () => {
      phase += 0.012;
      const wavePath = svg.querySelector('.wave-ocean-path');
      if (!wavePath) return;
      let d = `M 0 ${midY}`;
      let crestX = 0, crestY = Infinity;
      for (let x = 0; x <= W; x += 2) {
        const y = midY - amp * Math.sin((2 * Math.PI * x) / wl - phase);
        d += ` L ${x} ${y}`;
        if (y < crestY) { crestY = y; crestX = x; }
      }
      wavePath.setAttribute('d', d);

      /* ── Runtime diagram-contract assertion (D1, PROPAGATION_DIRECTION) ── */
      if (process.env.NODE_ENV === 'development' && !_devAsserted && _devPrevCrestX !== null) {
        const delta = crestX - _devPrevCrestX;
        // Allow wrapping (crest exits right, re-enters left) — only flag if consistently negative
        if (delta < -1 && crestX > 10 && _devPrevCrestX < W - 10) {
          console.warn('[D1 Diagram Contract] PROPAGATION_DIRECTION violation: crest moved -x (left) but arrow indicates +x (right). Check phase formula sign.');
        }
        _devAsserted = true;
      }
      _devPrevCrestX = crestX;

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [visible, reducedMotion]);

  // Static path for initial/reduced-motion
  const staticD = (() => {
    let d = `M 0 ${midY}`;
    for (let x = 0; x <= W; x += 2) {
      d += ` L ${x} ${midY - amp * Math.sin((2 * Math.PI * x) / wl)}`;
    }
    return d;
  })();

  return (
    <div className="wave-ocean-viz" aria-label="Ocean wave anatomy diagram showing wavelength, amplitude, crest, and trough">
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        {/* Water gradient fill */}
        <defs>
          <linearGradient id="ocean-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a6fa0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0a1929" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Equilibrium line */}
        <line x1="0" y1={midY} x2={W} y2={midY} stroke="rgba(255,255,255,0.15)" strokeDasharray="6 4" />
        <text x={W - 10} y={midY - 8} fill="rgba(255,255,255,0.4)" fontSize="11" textAnchor="end" fontFamily="monospace">equilibrium</text>

        {/* Wave */}
        <path className="wave-ocean-path" d={staticD} fill="none" stroke="var(--wave-ocean-blue)" strokeWidth="3" />

        {/* Amplitude arrows */}
        {/* Crest */}
        <line x1={wl / 4} y1={midY} x2={wl / 4} y2={midY - amp} stroke="var(--wave-constructive)" strokeWidth="1.5" strokeDasharray="4 3" />
        <polygon points={`${wl / 4 - 4},${midY - amp + 8} ${wl / 4},${midY - amp} ${wl / 4 + 4},${midY - amp + 8}`} fill="var(--wave-constructive)" />
        <polygon points={`${wl / 4 - 4},${midY - 8} ${wl / 4},${midY} ${wl / 4 + 4},${midY - 8}`} fill="var(--wave-constructive)" />
        <text x={wl / 4 + 12} y={midY - amp / 2 + 4} fill="var(--wave-constructive)" fontSize="12" fontFamily="monospace">amplitude</text>

        {/* Wavelength bracket */}
        <line x1={0} y1={midY - amp - 30} x2={wl} y2={midY - amp - 30} stroke="var(--wave-interference-cyan)" strokeWidth="1.5" />
        <line x1={0} y1={midY - amp - 36} x2={0} y2={midY - amp - 24} stroke="var(--wave-interference-cyan)" strokeWidth="1.5" />
        <line x1={wl} y1={midY - amp - 36} x2={wl} y2={midY - amp - 24} stroke="var(--wave-interference-cyan)" strokeWidth="1.5" />
        <text x={wl / 2} y={midY - amp - 38} fill="var(--wave-interference-cyan)" fontSize="13" textAnchor="middle" fontFamily="monospace">
          λ (wavelength)
        </text>

        {/* Crest & Trough labels */}
        <circle cx={wl / 4} cy={midY - amp} r="4" fill="var(--wave-constructive)" />
        <text x={wl / 4} y={midY - amp - 12} fill="var(--wave-constructive)" fontSize="12" textAnchor="middle" fontWeight="600">crest</text>

        <circle cx={wl * 0.75} cy={midY + amp} r="4" fill="var(--wave-destructive)" />
        <text x={wl * 0.75} y={midY + amp + 20} fill="var(--wave-destructive)" fontSize="12" textAnchor="middle" fontWeight="600">trough</text>

        {/* Direction arrow */}
        <line x1={W * 0.6} y1={H - 30} x2={W * 0.85} y2={H - 30} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <polygon points={`${W * 0.85 - 6},${H - 34} ${W * 0.85},${H - 30} ${W * 0.85 - 6},${H - 26}`} fill="rgba(255,255,255,0.4)" />
        <text x={(W * 0.6 + W * 0.85) / 2} y={H - 36} fill="rgba(255,255,255,0.4)" fontSize="11" textAnchor="middle" fontFamily="monospace">wave direction</text>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   D2 — Sound Pressure (SVG + animation)
   Longitudinal wave: compressions and rarefactions.
   ═══════════════════════════════════════════════════════════════ */
/**
 * @diagram-contract
 * @diagram D2-sound-pressure
 * @domain wave-mechanics
 *
 * @invariant LONGITUDINAL_MOTION
 *   particle_oscillation: parallel to wave propagation direction (+x)
 *   displacement_formula: ampX * sin(2π·i/20 - phase) — particles move along x-axis
 *
 * @invariant COMPRESSION_LABEL_ACCURACY
 *   "compression" label placed at regions of maximum particle density
 *   compression_condition: cos(2π·i/20 - phase) > 0 → particles bunched together
 *
 * @invariant RAREFACTION_LABEL_ACCURACY
 *   "rarefaction" label placed at regions of minimum particle density
 *   rarefaction_condition: cos(2π·i/20 - phase) < 0 → particles spread apart
 *   rarefaction is half-cycle (10 indices) from compression
 *
 * @invariant DENSITY_VISUAL_ENCODING
 *   particle_size: larger in compression regions (dotR + max(0, compression) * 2)
 *   particle_opacity: brighter in compression regions (0.3 + 0.7 * max(0, compression))
 */
function SoundPressure({ visible }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!visible || reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;
    const numDots = 60;
    const dotR = 3;
    let phase = 0;

    const draw = () => {
      phase += 0.03;
      ctx.clearRect(0, 0, W, H);

      const midY = H / 2;
      const spacing = W / (numDots + 1);
      const ampX = spacing * 0.8;

      for (let i = 0; i < numDots; i++) {
        const baseX = spacing * (i + 1);
        const displacement = ampX * Math.sin((2 * Math.PI * i) / 20 - phase);
        const x = baseX + displacement;

        // Color intensity by compression
        const compression = Math.cos((2 * Math.PI * i) / 20 - phase);
        const alpha = 0.3 + 0.7 * Math.max(0, compression);

        ctx.beginPath();
        ctx.arc(x, midY, dotR + Math.max(0, compression) * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 135, 44, ${alpha})`;
        ctx.fill();
      }

      // Labels
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';

      // Find a compression
      const compIdx = Math.round(phase / (2 * Math.PI / 20)) % numDots;
      const compX = spacing * (compIdx + 1);
      ctx.fillStyle = 'rgba(212, 135, 44, 0.7)';
      ctx.fillText('compression', compX, midY - 30);

      // Find rarefaction (half cycle away)
      const rarIdx = (compIdx + 10) % numDots;
      const rarX = spacing * (rarIdx + 1);
      ctx.fillStyle = 'rgba(212, 135, 44, 0.4)';
      ctx.fillText('rarefaction', rarX, midY + 40);

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [visible, reducedMotion]);

  return (
    <div className="wave-sound-viz" aria-label="Sound wave visualization showing compressions and rarefactions">
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   D3 — Light Spectrum (CSS)
   Electromagnetic spectrum with wavelength labels.
   ═══════════════════════════════════════════════════════════════ */
/**
 * @diagram-contract
 * @diagram D3-light-spectrum
 * @domain electromagnetism
 *
 * @invariant WAVELENGTH_ORDER
 *   spectrum ordered left-to-right: long wavelength (Radio) → short wavelength (Gamma)
 *   visible band: Red (700nm) → Violet (380nm) left-to-right within visible range
 *
 * @invariant WAVELENGTH_VALUES
 *   Red ≈ 700nm, Orange ≈ 600nm, Yellow ≈ 580nm, Green ≈ 520nm, Blue ≈ 470nm, Violet ≈ 380nm
 *   all values within accepted physics ranges (±10nm)
 *
 * @invariant LABEL_POSITION_ACCURACY
 *   band labels ordered by decreasing wavelength (Red first, Violet last)
 *   each label positioned proportionally within the visible strip
 */
function LightSpectrum() {
  const bands = [
    { label: 'Radio', nm: '>1m', pos: '0%' },
    { label: 'Micro', nm: '1mm', pos: '10%' },
    { label: 'IR', nm: '700nm', pos: '22%' },
    { label: 'Red', nm: '700', pos: '33%' },
    { label: 'Orange', nm: '600', pos: '40%' },
    { label: 'Yellow', nm: '580', pos: '46%' },
    { label: 'Green', nm: '520', pos: '52%' },
    { label: 'Blue', nm: '470', pos: '60%' },
    { label: 'Violet', nm: '380', pos: '68%' },
    { label: 'UV', nm: '10nm', pos: '78%' },
    { label: 'X-ray', nm: '0.01nm', pos: '88%' },
    { label: 'Gamma', nm: '<0.01', pos: '96%' },
  ];

  return (
    <div className="wave-spectrum" aria-label="Electromagnetic spectrum from radio waves to gamma rays">
      <div className="wave-spectrum__strip" role="img" aria-label="Visible light spectrum gradient" />
      <div className="wave-spectrum__labels">
        {bands.filter((_, i) => i >= 3 && i <= 8).map(b => (
          <div key={b.label} className="wave-spectrum__label-item">
            <span>{b.label}</span>
            <span className="wave-spectrum__nm">{b.nm}nm</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1rem', fontSize: '0.8125rem', opacity: 0.5, textAlign: 'center' }}>
        Visible light is a narrow sliver of the full electromagnetic spectrum — from radio waves (meters long) to gamma rays (smaller than atoms).
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   D4 — Superposition Playground (Canvas)
   Two waves combine — adjust frequency & amplitude.
   ═══════════════════════════════════════════════════════════════ */
/**
 * @diagram-contract
 * @diagram D4-superposition-playground
 * @domain wave-mechanics
 *
 * @invariant SUPERPOSITION_PRINCIPLE
 *   sum_wave: y_sum(x,t) = y_A(x,t) + y_B(x,t) at every x
 *   code: thirdH*2.5 - (y1 + y2) where y1, y2 are individual displacements
 *
 * @invariant CONSTRUCTIVE_INTERFERENCE
 *   when freq1 == freq2 and amp1 == amp2: sum amplitude ≈ 2 × individual amplitude
 *
 * @invariant WAVE_INDEPENDENCE
 *   Wave A rendered independently in top third (thirdH * 0.5)
 *   Wave B rendered independently in middle third (thirdH * 1.5)
 *   Sum rendered in bottom third (thirdH * 2.5)
 *   individual waves unaffected by each other's parameters
 *
 * @invariant SLIDER_LABEL_ACCURACY
 *   "A freq" slider controls freq1 (Wave A frequency)
 *   "B freq" slider controls freq2 (Wave B frequency)
 *   displayed value matches state variable to 1 decimal
 */
function SuperpositionPlayground({ visible }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  const [freq1, setFreq1] = useState(1);
  const [freq2, setFreq2] = useState(1.5);
  const [amp1, setAmp1] = useState(1);
  const [amp2, setAmp2] = useState(1);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;
    let phase = 0;

    const draw = () => {
      if (!reducedMotion) phase += 0.02;
      ctx.clearRect(0, 0, W, H);

      const thirdH = H / 3;

      // Draw wave in a band
      const drawWave = (yCenter, ampScale, freq, color, label) => {
        ctx.beginPath();
        for (let x = 0; x <= W; x++) {
          const t = x / W;
          const y = yCenter - ampScale * 40 * Math.sin(2 * Math.PI * freq * t * 3 + phase);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Label
        ctx.font = '11px monospace';
        ctx.fillStyle = color;
        ctx.textAlign = 'left';
        ctx.fillText(label, 10, yCenter - ampScale * 40 - 10);
      };

      // Dashed midlines
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 1;
      [thirdH * 0.5, thirdH * 1.5, thirdH * 2.5].forEach(y => {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // Wave 1
      drawWave(thirdH * 0.5, amp1, freq1, '#1a6fa0', `Wave A (f=${freq1.toFixed(1)})`);

      // Wave 2
      drawWave(thirdH * 1.5, amp2, freq2, '#d4872c', `Wave B (f=${freq2.toFixed(1)})`);

      // Sum
      ctx.beginPath();
      for (let x = 0; x <= W; x++) {
        const t = x / W;
        const y1 = amp1 * 40 * Math.sin(2 * Math.PI * freq1 * t * 3 + phase);
        const y2 = amp2 * 40 * Math.sin(2 * Math.PI * freq2 * t * 3 + phase);
        const y = thirdH * 2.5 - (y1 + y2);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#00bcd4';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.font = '11px monospace';
      ctx.fillStyle = '#00bcd4';
      ctx.textAlign = 'left';
      ctx.fillText('A + B (superposition)', 10, thirdH * 2.5 - (amp1 + amp2) * 40 - 10);

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [visible, freq1, freq2, amp1, amp2, reducedMotion]);

  return (
    <div className="wave-viz" aria-label="Interactive superposition playground — adjust two waves and see their combination">
      <div className="wave-viz__canvas-wrap">
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="wave-super-controls">
        <label>
          <span style={{ color: '#1a6fa0' }}>A freq</span>
          <input type="range" min="0.5" max="3" step="0.1" value={freq1} onChange={e => setFreq1(+e.target.value)} />
          <span style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{freq1.toFixed(1)}</span>
        </label>
        <label>
          <span style={{ color: '#d4872c' }}>B freq</span>
          <input type="range" min="0.5" max="3" step="0.1" value={freq2} onChange={e => setFreq2(+e.target.value)} />
          <span style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{freq2.toFixed(1)}</span>
        </label>
        <label>
          <span style={{ color: '#1a6fa0' }}>A amp</span>
          <input type="range" min="0" max="2" step="0.1" value={amp1} onChange={e => setAmp1(+e.target.value)} />
          <span style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{amp1.toFixed(1)}</span>
        </label>
        <label>
          <span style={{ color: '#d4872c' }}>B amp</span>
          <input type="range" min="0" max="2" step="0.1" value={amp2} onChange={e => setAmp2(+e.target.value)} />
          <span style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{amp2.toFixed(1)}</span>
        </label>
      </div>
      <div className="wave-viz__caption">Drag the sliders to see how two waves combine through superposition.</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   D5 — Ripple Tank (Canvas)
   Two-source interference pattern.
   ═══════════════════════════════════════════════════════════════ */
/**
 * @diagram-contract
 * @diagram D5-ripple-tank
 * @domain wave-mechanics
 *
 * @invariant TWO_SOURCE_INTERFERENCE
 *   sum: v = v1 + v2 where v1, v2 are individual source contributions
 *   constructive: bright where v1 + v2 > 0 (crests aligned)
 *   destructive: dark where v1 + v2 ≈ 0 (crest meets trough)
 *
 * @invariant CIRCULAR_WAVEFRONTS
 *   each source emits circular waves: distance = sqrt((px-sx)² + (py-sy)²)
 *   phase determined by distance from source (not angle)
 *
 * @invariant SOURCE_LABEL_ACCURACY
 *   "S1" label at source 1 position (W*0.35, H*0.5)
 *   "S2" label at source 2 position (W*0.65, H*0.5)
 *   both sources emit at identical frequency and phase
 *
 * @invariant COLOR_ENCODING
 *   positive sum (constructive) → blue/bright
 *   negative sum (destructive) → dark
 *   zero sum → intermediate
 */
function RippleTank({ visible }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;
    const s1 = { x: W * 0.35, y: H * 0.5 };
    const s2 = { x: W * 0.65, y: H * 0.5 };
    let t = 0;
    const freq = 0.08;
    const wl = 40;

    const draw = () => {
      if (!reducedMotion) t += 1;
      ctx.clearRect(0, 0, W, H);

      const imgData = ctx.createImageData(Math.ceil(W), Math.ceil(H));
      const data = imgData.data;
      const w = Math.ceil(W);

      for (let py = 0; py < Math.ceil(H); py++) {
        for (let px = 0; px < w; px++) {
          const d1 = Math.sqrt((px - s1.x) ** 2 + (py - s1.y) ** 2);
          const d2 = Math.sqrt((px - s2.x) ** 2 + (py - s2.y) ** 2);
          const v1 = Math.sin((2 * Math.PI * d1) / wl - t * freq);
          const v2 = Math.sin((2 * Math.PI * d2) / wl - t * freq);
          const sum = (v1 + v2) / 2;

          const idx = (py * w + px) * 4;
          // Map sum to color: blue for positive, dark for negative
          if (sum > 0) {
            data[idx] = 0;
            data[idx + 1] = Math.floor(100 + sum * 80);
            data[idx + 2] = Math.floor(160 + sum * 80);
          } else {
            data[idx] = 0;
            data[idx + 1] = Math.floor(20 + (1 + sum) * 30);
            data[idx + 2] = Math.floor(40 + (1 + sum) * 40);
          }
          data[idx + 3] = 255;
        }
      }

      ctx.putImageData(imgData, 0, 0);

      // Source dots
      [s1, s2].forEach((s, i) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.font = '11px monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.textAlign = 'center';
        ctx.fillText(`S${i + 1}`, s.x, s.y - 12);
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [visible, reducedMotion]);

  return (
    <div className="wave-viz" aria-label="Ripple tank showing interference pattern from two sources">
      <div className="wave-viz__canvas-wrap">
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="wave-viz__caption">Two point sources create an interference pattern — bright bands where crests meet crests, dark bands where crests meet troughs.</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   D6 — Standing Wave Builder (SVG)
   Select harmonic number (1-6), nodes/antinodes labeled.
   ═══════════════════════════════════════════════════════════════ */
/**
 * @diagram-contract
 * @diagram D6-standing-wave-builder
 * @domain wave-mechanics
 *
 * @invariant NODE_COUNT
 *   harmonic n has exactly (n + 1) nodes (including both fixed endpoints)
 *   code: loop i = 0..harmonic → (harmonic + 1) nodes
 *
 * @invariant ANTINODE_COUNT
 *   harmonic n has exactly n antinodes
 *   code: loop i = 0..(harmonic-1) → harmonic antinodes
 *
 * @invariant NODE_POSITIONS
 *   nodes at x = padX + (i/n) * strLen for i = 0..n
 *   nodes are points of zero displacement: sin(nπ · i/n) = 0 ✓
 *   "N" labels placed at node positions along equilibrium line (midY)
 *
 * @invariant ANTINODE_POSITIONS
 *   antinodes at x = padX + ((i+0.5)/n) * strLen for i = 0..(n-1)
 *   antinodes are points of maximum displacement: sin(nπ · (i+0.5)/n) = ±1
 *   "A" labels placed at antinode positions above wave
 *
 * @invariant FIXED_ENDPOINTS
 *   both endpoints (x=padX, x=padX+strLen) are nodes with zero displacement
 *   visual: wall/bracket rectangles at both ends
 *
 * @invariant STANDING_WAVE_ENVELOPE
 *   envelope: amplitude modulated by sin(ωt) — entire pattern oscillates in unison
 *   spatial shape: sin(nπ · x/L) — unchanged between frames
 *   no traveling component — pattern does not translate left or right
 */
function StandingWaveBuilder({ visible }) {
  const [harmonic, setHarmonic] = useState(1);
  const svgRef = useRef(null);
  const animRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  const W = 800;
  const H = 300;
  const padX = 40;
  const midY = H / 2;
  const amp = 80;
  const strLen = W - padX * 2;

  useEffect(() => {
    if (!visible || reducedMotion) return;
    let phase = 0;
    const draw = () => {
      phase += 0.04;
      const path = svgRef.current?.querySelector('.standing-wave-path');
      if (!path) return;
      const envelope = Math.sin(phase);
      let d = `M ${padX} ${midY}`;
      for (let x = 0; x <= strLen; x += 2) {
        const xi = x / strLen;
        const y = midY - amp * Math.sin(Math.PI * harmonic * xi) * envelope;
        d += ` L ${padX + x} ${y}`;
      }
      path.setAttribute('d', d);
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [visible, harmonic, reducedMotion]);

  // Nodes and antinodes positions
  const nodes = [];
  const antinodes = [];
  for (let i = 0; i <= harmonic; i++) {
    nodes.push(padX + (i / harmonic) * strLen);
  }
  for (let i = 0; i < harmonic; i++) {
    antinodes.push(padX + ((i + 0.5) / harmonic) * strLen);
  }

  // Static path
  const staticD = (() => {
    let d = `M ${padX} ${midY}`;
    for (let x = 0; x <= strLen; x += 2) {
      const xi = x / strLen;
      const y = midY - amp * Math.sin(Math.PI * harmonic * xi);
      d += ` L ${padX + x} ${y}`;
    }
    return d;
  })();

  return (
    <div className="wave-standing-viz" aria-label={`Standing wave on a string, harmonic ${harmonic}`}>
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', display: 'block' }}>
        {/* Fixed endpoints */}
        <rect x={padX - 4} y={midY - 60} width="4" height="120" rx="2" fill="rgba(255,255,255,0.3)" />
        <rect x={padX + strLen} y={midY - 60} width="4" height="120" rx="2" fill="rgba(255,255,255,0.3)" />

        {/* Equilibrium */}
        <line x1={padX} y1={midY} x2={padX + strLen} y2={midY} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />

        {/* Wave path */}
        <path className="standing-wave-path" d={staticD} fill="none" stroke="var(--wave-ocean-blue)" strokeWidth="2.5" />

        {/* Nodes */}
        {nodes.map((x, i) => (
          <g key={`n${i}`}>
            <circle cx={x} cy={midY} r="4" fill="var(--wave-node)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <text x={x} y={midY + 22} fill="var(--wave-node)" fontSize="10" textAnchor="middle" fontFamily="monospace">N</text>
          </g>
        ))}

        {/* Antinodes */}
        {antinodes.map((x, i) => (
          <g key={`a${i}`}>
            <line x1={x} y1={midY - amp - 10} x2={x} y2={midY + amp + 10} stroke="var(--wave-constructive)" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
            <text x={x} y={midY - amp - 16} fill="var(--wave-constructive)" fontSize="10" textAnchor="middle" fontFamily="monospace">A</text>
          </g>
        ))}

        {/* Label */}
        <text x={W / 2} y={H - 10} fill="rgba(255,255,255,0.5)" fontSize="12" textAnchor="middle" fontFamily="monospace">
          Harmonic {harmonic} — {harmonic === 1 ? 'Fundamental' : `${harmonic}${harmonic === 2 ? 'nd' : harmonic === 3 ? 'rd' : 'th'} overtone`}
        </text>
      </svg>

      <div className="wave-standing-controls">
        {[1, 2, 3, 4, 5, 6].map(n => (
          <button
            key={n}
            className={`wave-standing-btn ${n === harmonic ? 'wave-standing-btn--active' : ''}`}
            onClick={() => setHarmonic(n)}
            aria-label={`Set harmonic ${n}`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   D7 — Double-Slit Experiment (Canvas)
   Scroll-triggered: shows single-electron buildup.
   ═══════════════════════════════════════════════════════════════ */
/**
 * @diagram-contract
 * @diagram D7-double-slit-experiment
 * @domain quantum-mechanics
 *
 * @invariant INTERFERENCE_PATTERN
 *   probability: P(θ) ∝ cos²(πd·sinθ/λ) · sinc²(πa·sinθ/λ)
 *   pattern: alternating bright/dark bands on detector screen
 *   accumulation: pattern emerges statistically from many individual detections
 *
 * @invariant SINGLE_PARTICLE_DETECTION
 *   each electron lands as a single point (particle behavior)
 *   pattern only visible after many (>100) detections (wave behavior)
 *   counter label "electrons: N" tracks accumulated detections
 *
 * @invariant BARRIER_GEOMETRY
 *   two slits in barrier (not one, not three)
 *   "slit 1" and "slit 2" labels positioned at slit openings
 *   barrier blocks all paths except through the two slits
 *
 * @invariant PROBABILITY_NON_NEGATIVE
 *   rejection sampling ensures all dot positions are physically valid
 *   probability distribution P ≥ 0 everywhere (cos² · sinc² ≥ 0 ✓)
 *
 * @invariant DETECTOR_POSITION
 *   "detector" label and detection dots on the right side of barrier
 *   electrons travel left → right (source → barrier → detector)
 */
function DoubleSlit({ visible }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const dotsRef = useRef([]);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;
    const maxDots = 2000;

    // Generate a double-slit probability distribution
    const slitSep = 0.3; // in units of screen half-width
    const slitWidth = 0.05;
    const wavelength = 0.12;

    function sampleDot() {
      // Sample from double-slit interference pattern (Fraunhofer approximation)
      // P(θ) ∝ cos²(πd sinθ / λ) · sinc²(πa sinθ / λ)
      // We use rejection sampling on the screen coordinate
      while (true) {
        const y = (Math.random() - 0.5) * H;
        const theta = y / (H * 2); // approximate angle
        const d = slitSep;
        const a = slitWidth;
        const cosArg = Math.PI * d * theta / wavelength;
        const sincArg = Math.PI * a * theta / wavelength;
        const sinc = sincArg === 0 ? 1 : Math.sin(sincArg) / sincArg;
        const prob = Math.cos(cosArg) ** 2 * sinc ** 2;
        if (Math.random() < prob) {
          return { x: W * 0.8 + (Math.random() - 0.5) * 20, y: H / 2 + y };
        }
      }
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 25, 41, 1)';
      ctx.fillRect(0, 0, W, H);

      // Draw barrier
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      const barrierX = W * 0.35;
      const slitGap = H * 0.06;
      const slitHeight = H * 0.08;
      ctx.fillRect(barrierX - 2, 0, 4, H / 2 - slitGap - slitHeight / 2);
      ctx.fillRect(barrierX - 2, H / 2 - slitGap + slitHeight / 2, 4, slitGap * 2 - slitHeight);
      ctx.fillRect(barrierX - 2, H / 2 + slitGap + slitHeight / 2, 4, H);

      // Slit labels
      ctx.font = '10px monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.textAlign = 'right';
      ctx.fillText('slit 1', barrierX - 8, H / 2 - slitGap);
      ctx.fillText('slit 2', barrierX - 8, H / 2 + slitGap);

      // Detection screen
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(W * 0.75, 0, W * 0.1, H);
      ctx.font = '10px monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.textAlign = 'center';
      ctx.fillText('detector', W * 0.8, H - 10);

      // Add new dots gradually
      if (dotsRef.current.length < maxDots) {
        const batchSize = reducedMotion ? 50 : 3;
        for (let i = 0; i < batchSize; i++) {
          if (dotsRef.current.length < maxDots) {
            dotsRef.current.push(sampleDot());
          }
        }
      }

      // Draw dots
      dotsRef.current.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(107, 63, 160, 0.8)';
        ctx.fill();
      });

      // Count label
      ctx.font = '12px monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.textAlign = 'left';
      ctx.fillText(`electrons: ${dotsRef.current.length}`, 10, 20);

      if (dotsRef.current.length < maxDots) {
        animRef.current = requestAnimationFrame(draw);
      }
    };

    dotsRef.current = [];
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [visible, reducedMotion]);

  return (
    <div className="wave-viz" aria-label="Double-slit experiment — electrons build an interference pattern one at a time">
      <div className="wave-viz__canvas-wrap">
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="wave-viz__caption">Each dot is a single electron. One by one, they build the interference pattern predicted by wave mechanics — no classical explanation suffices.</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function TheAnatomyOfAWaveClient() {
  const [s1Ref, s1Vis] = useInView();
  const [s2Ref, s2Vis] = useInView();
  const [s3Ref, s3Vis] = useInView();
  const [s4Ref, s4Vis] = useInView();
  const [s5Ref, s5Vis] = useInView();
  const [s6Ref, s6Vis] = useInView();
  const [s7Ref, s7Vis] = useInView();
  const [s8Ref, s8Vis] = useInView();
  const [s9Ref, s9Vis] = useInView();

  return (
    <article className="wave-essay">

      {/* ═══ HERO ═══ */}
      <header className="wave-hero">
        <h1 className="wave-hero__title">The Anatomy<br />of a Wave</h1>
        <p className="wave-hero__subtitle">From ocean ripples to quantum probabilities — the universal pattern that governs everything.</p>
        <span className="wave-hero__scroll-hint">↓ scroll to begin</span>
      </header>

      {/* ═══ §1 — WHAT IS A WAVE? ═══ */}
      <section ref={s1Ref} className="wave-section wave-section--ocean">
        <div className="wave-section__inner">
          <div className={`wave-fade-in ${s1Vis ? 'wave-fade-in--visible' : ''}`}>
            <span className="wave-section__number">Section 01</span>
            <h2 className="wave-section__title">What is a wave, really?</h2>
            <p className="wave-section__subtitle">Energy in motion — not matter</p>
          </div>

          <div className={`wave-fade-in wave-fade-in--d1 ${s1Vis ? 'wave-fade-in--visible' : ''}`}>
            <p>
              Imagine a crowd doing the wave in a stadium. People stand up, raise their arms, and sit back down — a ripple of motion sweeps around the arena. But no one <em>actually moves</em> from their seat. The wave carries energy and information through the crowd, but the people stay put.
            </p>
            <p>
              That is the defining feature of every wave in the universe: <strong>a wave is a disturbance that transfers energy from one place to another without transferring matter</strong>. Whether it&apos;s an ocean swell crossing the Pacific, a sound vibrating through air, or light traveling across 13 billion years of space — the principle is the same.
            </p>
          </div>

          <div className={`wave-fade-in wave-fade-in--d2 ${s1Vis ? 'wave-fade-in--visible' : ''}`}>
            <div className="wave-misconception">
              <div className="wave-misconception__header">Common Misconception</div>
              <p className="wave-misconception__wrong">&ldquo;Waves carry matter from one place to another.&rdquo;</p>
              <p className="wave-misconception__correct">
                Not so. A cork bobbing on ocean waves stays in roughly the same place. The wave passes <em>through</em> the water; the water itself merely oscillates around an equilibrium position. Energy moves. Matter doesn&apos;t.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ §2 — BASIC PROPERTIES ═══ */}
      <section ref={s2Ref} className="wave-section wave-section--ocean">
        <div className="wave-section__inner">
          <div className={`wave-fade-in ${s2Vis ? 'wave-fade-in--visible' : ''}`}>
            <span className="wave-section__number">Section 02</span>
            <h2 className="wave-section__title">The basic anatomy</h2>
            <p className="wave-section__subtitle">Wavelength, frequency, amplitude</p>
          </div>

          <div className={`wave-fade-in wave-fade-in--d1 ${s2Vis ? 'wave-fade-in--visible' : ''}`}>
            <p>
              Every wave — from a ripple in a pond to a beam of starlight — can be described by just a few measurable properties. These are the vital signs of a wave.
            </p>
            <p>
              <strong>Amplitude</strong> measures the maximum displacement from equilibrium — how tall the wave is. For ocean waves, it&apos;s the height of the crest above the resting waterline. For sound, it corresponds to how loud.
            </p>
            <p>
              <strong>Wavelength</strong> (λ) is the distance from one crest to the next — one complete cycle of the wave&apos;s shape. It can range from kilometers (radio waves) to fractions of an atom (gamma rays).
            </p>
            <p>
              <strong>Frequency</strong> (f) is how many complete cycles pass a point each second, measured in Hertz (Hz). Concert pitch A is 440 Hz — the air vibrates 440 times every second.
            </p>
          </div>

          <OceanWaveAnatomy visible={s2Vis} />

          <div className={`wave-fade-in wave-fade-in--d2 ${s2Vis ? 'wave-fade-in--visible' : ''}`}>
            <div className="wave-equation" role="img" aria-label="Wave speed equals wavelength times frequency">
              <div className="wave-equation__part">
                <div className="wave-equation__symbol">v</div>
                <div className="wave-equation__desc">speed</div>
              </div>
              <div className="wave-equation__symbol">=</div>
              <div className="wave-equation__part">
                <div className="wave-equation__symbol">λ</div>
                <div className="wave-equation__desc">wavelength</div>
              </div>
              <div className="wave-equation__symbol">×</div>
              <div className="wave-equation__part">
                <div className="wave-equation__symbol">f</div>
                <div className="wave-equation__desc">frequency</div>
              </div>
            </div>

            <div className="wave-insight">
              <div className="wave-insight__label">Key Relationship</div>
              <p>
                This single equation — <em>v = λf</em> — connects all three properties. If the speed is fixed (as it is for light in a vacuum or sound in still air), increasing the frequency <em>must</em> decrease the wavelength, and vice versa. High-pitched sounds have short wavelengths. Red light has a longer wavelength than blue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ §3 — TRANSVERSE vs LONGITUDINAL ═══ */}
      <section ref={s3Ref} className="wave-section wave-section--sound">
        <div className="wave-section__inner">
          <div className={`wave-fade-in ${s3Vis ? 'wave-fade-in--visible' : ''}`}>
            <span className="wave-section__number">Section 03</span>
            <h2 className="wave-section__title">Two flavors of wave</h2>
            <p className="wave-section__subtitle">Transverse and longitudinal</p>
          </div>

          <div className={`wave-fade-in wave-fade-in--d1 ${s3Vis ? 'wave-fade-in--visible' : ''}`}>
            <p>
              Not all waves vibrate in the same direction. There are two fundamental types, distinguished by the relationship between the vibration and the direction of travel.
            </p>
            <p>
              In a <strong>transverse wave</strong>, the particles of the medium oscillate <em>perpendicular</em> to the wave&apos;s direction of travel. Think of shaking a rope side-to-side — the wave travels down the rope horizontally, but the rope itself moves up and down. Light waves are transverse: the electric and magnetic fields oscillate at right angles to the direction of propagation.
            </p>
            <p>
              In a <strong>longitudinal wave</strong>, the particles oscillate <em>parallel</em> to the direction of travel. Push one end of a Slinky and a compression pulse travels along its length — the coils bunch together and spread apart in the same direction the wave moves. Sound is the most important example: air molecules are alternately compressed and spread apart.
            </p>
          </div>

          <SoundPressure visible={s3Vis} />

          <div className={`wave-fade-in wave-fade-in--d2 ${s3Vis ? 'wave-fade-in--visible' : ''}`}>
            <div className="wave-insight wave-insight--amber">
              <div className="wave-insight__label">Why it Matters</div>
              <p>
                The distinction determines how waves interact with barriers and openings. Transverse waves can be <em>polarized</em> (filtered to oscillate in only one plane) — which is how polarized sunglasses work. Longitudinal waves cannot be polarized because they only oscillate in one direction: along the wave itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ §4 — LIGHT SPECTRUM ═══ */}
      <section ref={s4Ref} className="wave-section wave-section--light">
        <div className="wave-section__inner">
          <div className={`wave-fade-in ${s4Vis ? 'wave-fade-in--visible' : ''}`}>
            <span className="wave-section__number">Section 04</span>
            <h2 className="wave-section__title">Waves all around us</h2>
            <p className="wave-section__subtitle">From ocean to light</p>
          </div>

          <div className={`wave-fade-in wave-fade-in--d1 ${s4Vis ? 'wave-fade-in--visible' : ''}`}>
            <p>
              Ocean waves, sound waves, and light waves — three seemingly different phenomena, all governed by the same principles. What distinguishes them is the <em>medium</em> they travel through (or in the case of light, no medium at all) and their wavelength.
            </p>
            <p>
              <strong>Ocean waves</strong> are mechanical transverse waves on the water surface. They carry the energy of wind and storms across thousands of kilometers, with wavelengths from centimeters (capillary ripples) to hundreds of meters (deep-ocean swells).
            </p>
            <p>
              <strong>Sound waves</strong> are mechanical longitudinal waves in air, water, or solids. They require a medium — which is why there&apos;s no sound in space. Human hearing spans about 20 Hz to 20,000 Hz.
            </p>
            <p>
              <strong>Light</strong> is an electromagnetic wave that needs no medium at all. It travels through the vacuum of space at 299,792,458 meters per second. What we call &ldquo;visible light&rdquo; is just a narrow band of the vast electromagnetic spectrum.
            </p>
          </div>

          <div className={`wave-fade-in wave-fade-in--d2 ${s4Vis ? 'wave-fade-in--visible' : ''}`}>
            <LightSpectrum />
          </div>

          <div className={`wave-fade-in wave-fade-in--d3 ${s4Vis ? 'wave-fade-in--visible' : ''}`}>
            <div className="wave-misconception">
              <div className="wave-misconception__header">Common Misconception</div>
              <p className="wave-misconception__wrong">&ldquo;All waves need a medium to travel through.&rdquo;</p>
              <p className="wave-misconception__correct">
                Mechanical waves (sound, ocean) absolutely require a medium. But electromagnetic waves — light, radio, X-rays — propagate through empty space. This was one of the great discoveries of 19th-century physics: when Maxwell showed that oscillating electric and magnetic fields sustain each other, no ether is needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ §5 — SUPERPOSITION ═══ */}
      <section ref={s5Ref} className="wave-section wave-section--super">
        <div className="wave-section__inner">
          <div className={`wave-fade-in ${s5Vis ? 'wave-fade-in--visible' : ''}`}>
            <span className="wave-section__number">Section 05</span>
            <h2 className="wave-section__title">When waves meet</h2>
            <p className="wave-section__subtitle">Superposition and interference</p>
          </div>

          <div className={`wave-fade-in wave-fade-in--d1 ${s5Vis ? 'wave-fade-in--visible' : ''}`}>
            <p>
              Perhaps the most remarkable thing about waves is what happens when two of them occupy the same space at the same time. Unlike solid objects, waves don&apos;t bounce off each other — they pass right through, and at the point of overlap, they simply <em>add up</em>.
            </p>
            <p>
              This is the <strong>principle of superposition</strong>: the displacement at any point is the sum of the displacements from each individual wave. Where two crests align, they build a larger crest — <strong>constructive interference</strong>. Where a crest meets a trough, they cancel out — <strong>destructive interference</strong>.
            </p>
          </div>

          <SuperpositionPlayground visible={s5Vis} />

          <div className={`wave-fade-in wave-fade-in--d2 ${s5Vis ? 'wave-fade-in--visible' : ''}`}>
            <p>
              Interference isn&apos;t just a physics curiosity. It&apos;s how noise-canceling headphones work (destructive interference silences ambient noise), how radio antennas are designed, and how the vivid colors on soap bubbles and oil slicks emerge (thin-film interference of light waves).
            </p>

            <div className="wave-insight wave-insight--cyan">
              <div className="wave-insight__label">Try It</div>
              <p>
                Set both waves to the same frequency and amplitude. At f=1.0 for both, you get perfect constructive interference — the sum has double the amplitude. Now shift Wave B to exactly double the frequency. Watch how the pattern becomes more complex — this is how musical chords and harmonics are built.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ §6 — INTERFERENCE PATTERNS ═══ */}
      <section ref={s6Ref} className="wave-section wave-section--super">
        <div className="wave-section__inner">
          <div className={`wave-fade-in ${s6Vis ? 'wave-fade-in--visible' : ''}`}>
            <span className="wave-section__number">Section 06</span>
            <h2 className="wave-section__title">Interference in two dimensions</h2>
            <p className="wave-section__subtitle">The ripple tank</p>
          </div>

          <div className={`wave-fade-in wave-fade-in--d1 ${s6Vis ? 'wave-fade-in--visible' : ''}`}>
            <p>
              The superposition principle extends beyond one dimension. Drop two pebbles in a pond, and the circular ripples from each source overlap and interfere. Where crests from both sources arrive at the same time, the water rises higher — constructive interference. Where a crest meets a trough, the water barely moves — destructive interference.
            </p>
            <p>
              The result is a striking pattern of bright and dark bands radiating outward. This pattern is governed by the difference in distance from each source to any given point. Where the path difference is a whole number of wavelengths, the waves arrive in sync and reinforce. Where it&apos;s half a wavelength off, they cancel.
            </p>
          </div>

          <RippleTank visible={s6Vis} />

          <div className={`wave-fade-in wave-fade-in--d2 ${s6Vis ? 'wave-fade-in--visible' : ''}`}>
            <p>
              This isn&apos;t just a water phenomenon. The same geometry explains the interference patterns created by sound waves from two speakers, radio waves from two antennas, and — most consequentially — light passing through two slits. Thomas Young first demonstrated this in 1801, providing decisive evidence that light behaves as a wave.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ §7 — STANDING WAVES ═══ */}
      <section ref={s7Ref} className="wave-section wave-section--standing">
        <div className="wave-section__inner">
          <div className={`wave-fade-in ${s7Vis ? 'wave-fade-in--visible' : ''}`}>
            <span className="wave-section__number">Section 07</span>
            <h2 className="wave-section__title">The stationary illusion</h2>
            <p className="wave-section__subtitle">Standing waves</p>
          </div>

          <div className={`wave-fade-in wave-fade-in--d1 ${s7Vis ? 'wave-fade-in--visible' : ''}`}>
            <p>
              When two waves of equal frequency and amplitude travel in opposite directions — say, a wave on a guitar string reflecting back from each fixed end — they don&apos;t create a traveling wave at all. Instead, they produce a <strong>standing wave</strong>: a pattern that appears to vibrate in place, with fixed points of zero motion called <strong>nodes</strong> and points of maximum motion called <strong>antinodes</strong>.
            </p>
          </div>

          <StandingWaveBuilder visible={s7Vis} />

          <div className={`wave-fade-in wave-fade-in--d2 ${s7Vis ? 'wave-fade-in--visible' : ''}`}>
            <p>
              Each numbered button selects a <em>harmonic</em>. The fundamental (1st harmonic) has just one antinode. The 2nd harmonic has two, vibrating at double the frequency. A guitar string, an organ pipe, a microwave cavity — all produce specific standing wave patterns determined by their boundary conditions.
            </p>

            <div className="wave-misconception">
              <div className="wave-misconception__header">Common Misconception</div>
              <p className="wave-misconception__wrong">&ldquo;A standing wave isn&apos;t really a wave — it&apos;s not moving.&rdquo;</p>
              <p className="wave-misconception__correct">
                A standing wave is very much a wave — in fact, it&apos;s <em>two</em> waves. The energy is continuously oscillating back and forth between kinetic and potential forms. The nodes are stationary because at those precise points, the two traveling waves always cancel exactly.
              </p>
            </div>
          </div>

          <div className={`wave-fade-in wave-fade-in--d3 ${s7Vis ? 'wave-fade-in--visible' : ''}`}>
            <div className="wave-insight wave-insight--green">
              <div className="wave-insight__label">Why Standing Waves Matter</div>
              <p>
                Standing waves are everywhere in music and engineering. Every musical note from a guitar, violin, piano, or organ is a standing wave with a specific fundamental frequency and a unique blend of harmonics — which is what gives each instrument its characteristic <em>timbre</em>. In physics, standing waves in cavities were the puzzle that led Max Planck to propose quantization of energy in 1900 — and quantum mechanics was born.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ §8 — QUANTUM WAVES ═══ */}
      <section ref={s8Ref} className="wave-section wave-section--quantum">
        <div className="wave-section__inner">
          <div className={`wave-fade-in ${s8Vis ? 'wave-fade-in--visible' : ''}`}>
            <span className="wave-section__number">Section 08</span>
            <h2 className="wave-section__title">The quantum twist</h2>
            <p className="wave-section__subtitle">Waves of probability</p>
          </div>

          <div className={`wave-fade-in wave-fade-in--d1 ${s8Vis ? 'wave-fade-in--visible' : ''}`}>
            <p>
              In 1924, Louis de Broglie proposed something radical: not just light, but <em>all</em> matter has wave-like properties. An electron, a proton, even a baseball — all have an associated wavelength given by λ&nbsp;=&nbsp;h/p, where h is Planck&apos;s constant and p is momentum.
            </p>
            <p>
              For a baseball, the wavelength is absurdly small — far below anything measurable. But for an electron, the de Broglie wavelength is comparable to atomic dimensions. Electrons don&apos;t just orbit atoms like tiny planets — they exist as <strong>standing waves</strong> around the nucleus, with specific allowed wavelengths corresponding to discrete energy levels.
            </p>
            <p>
              The quantum wave function (ψ) doesn&apos;t describe a physical wave in the way an ocean wave does. Instead, |ψ|² gives the <em>probability density</em> — the likelihood of finding the particle at a given location. Think of it like a weather map: it doesn&apos;t tell you exactly where each raindrop will fall, but it shows you where rain is most likely.
            </p>
          </div>

          <DoubleSlit visible={s8Vis} />

          <div className={`wave-fade-in wave-fade-in--d2 ${s8Vis ? 'wave-fade-in--visible' : ''}`}>
            <p>
              The double-slit experiment is the most stunning demonstration of quantum wave behavior. Fire electrons one at a time through two narrow slits, and each one lands as a single dot — a particle. But after thousands of electrons, the dots build up into an interference pattern — a wave signature. Each individual electron somehow &ldquo;interferes with itself,&rdquo; passing through both slits as a probability wave and collapsing to a point only when detected.
            </p>

            <div className="wave-insight wave-insight--violet">
              <div className="wave-insight__label">The Deep Lesson</div>
              <p>
                The double-slit experiment shows that at the quantum scale, the wave concept transcends metaphor. An electron isn&apos;t &ldquo;like&rdquo; a wave — it is described <em>by</em> a wave. The wave function is the most complete description of reality that physics can offer.
              </p>
            </div>
          </div>

          <div className={`wave-fade-in wave-fade-in--d3 ${s8Vis ? 'wave-fade-in--visible' : ''}`}>
            <div className="wave-misconception">
              <div className="wave-misconception__header">Common Misconception</div>
              <p className="wave-misconception__wrong">&ldquo;The quantum wave function describes a physical wave that the electron surfs on.&rdquo;</p>
              <p className="wave-misconception__correct">
                No. The wave function is a mathematical object that encodes probability amplitudes. There is no physical medium vibrating. The &ldquo;wave&rdquo; is in an abstract mathematical space, and what it predicts — with extraordinary precision — is the likelihood of outcomes when you make a measurement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ §9 — SYNTHESIS ═══ */}
      <section ref={s9Ref} className="wave-section wave-section--synthesis">
        <div className="wave-section__inner">
          <div className={`wave-fade-in ${s9Vis ? 'wave-fade-in--visible' : ''}`}>
            <span className="wave-section__number">Section 09</span>
            <h2 className="wave-section__title">One pattern, everywhere</h2>
            <p className="wave-section__subtitle">The universality of waves</p>
          </div>

          <div className={`wave-fade-in wave-fade-in--d1 ${s9Vis ? 'wave-fade-in--visible' : ''}`}>
            <p>
              We started at the ocean — with visible, tangible waves you can feel crashing against your body. We moved to sound, a wave you hear but cannot see. Then to light, a wave so fast and so tiny that it took centuries for humanity to even recognize its wave nature. And finally to quantum mechanics, where the wave concept itself is redefined — no longer a physical vibration, but a mathematical structure governing probability.
            </p>
            <p>
              Yet at every scale, the same core ideas recur: <em>wavelength, frequency, amplitude</em>. The same behaviors appear: <em>interference, superposition, standing waves</em>. The same equation — v&nbsp;=&nbsp;λf — connects them.
            </p>
            <p>
              The wave is not just a physical phenomenon. It is a <strong>pattern</strong> — one of nature&apos;s most fundamental organizing principles. It appears wherever energy propagates, wherever oscillations arise, wherever systems are governed by differential equations that support wave-like solutions. From the vibrations of a guitar string to the quantum fields that underpin all of particle physics, the wave is the universal language of energy in motion.
            </p>
          </div>

          <div className={`wave-fade-in wave-fade-in--d2 ${s9Vis ? 'wave-fade-in--visible' : ''}`}>
            <div className="wave-closing-quote">
              <p className="wave-closing-quote__text">
                &ldquo;I think I can safely say that nobody understands quantum mechanics.&rdquo;
              </p>
              <p className="wave-closing-quote__attribution">— Richard Feynman, 1964</p>
            </div>

            <div className="wave-insight wave-insight--violet">
              <div className="wave-insight__label">The Paradox of Understanding</div>
              <p>
                Feynman&apos;s famous remark isn&apos;t a confession of failure — it&apos;s an acknowledgment of depth. We can predict quantum behavior with extraordinary precision using wave mechanics. We can engineer lasers, transistors, and MRI machines from wave equations. But the <em>meaning</em> of the wave — what it tells us about the fundamental nature of reality — remains one of the deepest open questions in all of science.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section className="wave-sources">
        <div className="wave-sources__inner">
          <h2 className="wave-sources__title">Sources</h2>
          <ol className="wave-sources__list">
            <li className="wave-sources__item">
              Feynman, R. P., Leighton, R. B., &amp; Sands, M. (1964). <em>The Feynman Lectures on Physics</em>, Vol. I, Ch. 47-51. Addison-Wesley.
              <span className="wave-sources__tier wave-sources__tier--1">Tier-1</span>
            </li>
            <li className="wave-sources__item">
              Halliday, D., Resnick, R., &amp; Walker, J. (2014). <em>Fundamentals of Physics</em>, 10th ed., Ch. 16-17, 33-35. Wiley.
              <span className="wave-sources__tier wave-sources__tier--1">Tier-1</span>
            </li>
            <li className="wave-sources__item">
              Griffiths, D. J. (2018). <em>Introduction to Quantum Mechanics</em>, 3rd ed., Ch. 1-2. Cambridge University Press.
              <span className="wave-sources__tier wave-sources__tier--1">Tier-1</span>
            </li>
            <li className="wave-sources__item">
              Serway, R. A. &amp; Jewett, J. W. (2018). <em>Physics for Scientists and Engineers</em>, 10th ed. Cengage.
              <span className="wave-sources__tier wave-sources__tier--1">Tier-1</span>
            </li>
            <li className="wave-sources__item">
              Young, T. (1802). &ldquo;On the Theory of Light and Colours.&rdquo; <em>Philosophical Transactions of the Royal Society</em>, 92, 12-48.
              <span className="wave-sources__tier wave-sources__tier--1">Tier-1</span>
            </li>
            <li className="wave-sources__item">
              de Broglie, L. (1924). &ldquo;Recherches sur la théorie des quanta.&rdquo; PhD Thesis, University of Paris.
              <span className="wave-sources__tier wave-sources__tier--1">Tier-1</span>
            </li>
            <li className="wave-sources__item">
              Tonomura, A. et al. (1989). &ldquo;Demonstration of single-electron buildup of an interference pattern.&rdquo; <em>American Journal of Physics</em>, 57(2), 117-120.
              <span className="wave-sources__tier wave-sources__tier--1">Tier-1</span>
            </li>
            <li className="wave-sources__item">
              Maxwell, J. C. (1865). &ldquo;A Dynamical Theory of the Electromagnetic Field.&rdquo; <em>Philosophical Transactions of the Royal Society</em>, 155, 459-512.
              <span className="wave-sources__tier wave-sources__tier--1">Tier-1</span>
            </li>
            <li className="wave-sources__item">
              Planck, M. (1901). &ldquo;Über das Gesetz der Energieverteilung im Normalspectrum.&rdquo; <em>Annalen der Physik</em>, 309(3), 553-563.
              <span className="wave-sources__tier wave-sources__tier--1">Tier-1</span>
            </li>
            <li className="wave-sources__item">
              Eisberg, R. &amp; Resnick, R. (1985). <em>Quantum Physics of Atoms, Molecules, Solids, Nuclei, and Particles</em>, 2nd ed. Wiley.
              <span className="wave-sources__tier wave-sources__tier--1">Tier-1</span>
            </li>
            <li className="wave-sources__item">
              Crawford, F. S. (1968). <em>Waves: Berkeley Physics Course</em>, Vol. 3. McGraw-Hill.
              <span className="wave-sources__tier wave-sources__tier--1">Tier-1</span>
            </li>
            <li className="wave-sources__item">
              Hecht, E. (2017). <em>Optics</em>, 5th ed. Pearson.
              <span className="wave-sources__tier wave-sources__tier--2">Tier-2</span>
            </li>
            <li className="wave-sources__item">
              French, A. P. (1971). <em>Vibrations and Waves</em>. W. W. Norton.
              <span className="wave-sources__tier wave-sources__tier--1">Tier-1</span>
            </li>
            <li className="wave-sources__item">
              Pain, H. J. (2005). <em>The Physics of Vibrations and Waves</em>, 6th ed. Wiley.
              <span className="wave-sources__tier wave-sources__tier--2">Tier-2</span>
            </li>
          </ol>
        </div>
      </section>

    </article>
  );
}
