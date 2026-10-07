'use client';

/**
 * @diagram-contract
 * @diagram D7-logarithmic-ruler
 * @domain mathematics-visualization
 *
 * @invariant LOG_SCALE_MAPPING
 *   position on axis = (log10(speed_ms) - LOG_MIN) / LOG_RANGE
 *   validation: each entry placed at its correct order-of-magnitude position
 *
 * @invariant SCROLL_PROGRESS_LINEARITY
 *   scroll position maps linearly to log-scale position
 *   validation: scrolling 50% places viewer at midpoint of the log range
 *
 * @invariant HUMAN_RANGE_BAND
 *   "You Are Here" band spans log10 0 to 1.5 (1 m/s to ~30 m/s)
 *   validation: band visually highlights the narrow human perception range
 *
 * @invariant ENTRY_COUNT
 *   all entries from SPEEDS array appear on the ruler
 *   validation: no entry filtered out or omitted
 *
 * @invariant CANVAS_RENDERING
 *   visualization uses Canvas 2D API for smooth scroll-linked rendering
 *   validation: no DOM nodes per data point, requestAnimationFrame for scroll
 */

import { useRef, useEffect, useState, useCallback } from 'react';

interface SpeedEntry {
  name: string;
  speed_ms: number;
  log10: number;
  display_speed: string;
  category: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  geological: '#C4923A',
  biological: '#34A853',
  human: '#4285F4',
  atmospheric: '#78909C',
  cosmic: '#9C27B0',
  electromagnetic: '#FFB300',
};

const LOG_MIN = -9.5;
const LOG_MAX = 9;
const LOG_RANGE = LOG_MAX - LOG_MIN;
const HUMAN_LOG_MIN = 0;
const HUMAN_LOG_MAX = 1.5;

interface LogarithmicRulerVizProps {
  speeds: SpeedEntry[];
}

export default function LogarithmicRulerViz({ speeds }: LogarithmicRulerVizProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const animFrameRef = useRef<number>(0);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const total = el.offsetHeight - viewH;
      if (total <= 0) { setProgress(0); return; }
      const scrolled = -rect.top;
      setProgress(Math.min(1, Math.max(0, scrolled / total)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Canvas rendering
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    // Set canvas size for HiDPI
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, w, h);

    const padding = { top: 40, bottom: 40, left: 20, right: 160 };
    const trackX = padding.left + 30;
    const trackH = h - padding.top - padding.bottom;
    const trackTop = padding.top;

    const currentLog = LOG_MIN + progress * LOG_RANGE;

    // --- Background gradient ---
    const bgGrad = ctx.createLinearGradient(0, trackTop, 0, trackTop + trackH);
    bgGrad.addColorStop(0, 'rgba(196, 146, 58, 0.05)');   // geological
    bgGrad.addColorStop(0.25, 'rgba(52, 168, 83, 0.05)');  // biological
    bgGrad.addColorStop(0.5, 'rgba(66, 133, 244, 0.05)');  // human
    bgGrad.addColorStop(0.75, 'rgba(156, 39, 176, 0.05)'); // cosmic
    bgGrad.addColorStop(1, 'rgba(255, 179, 0, 0.05)');     // electromagnetic
    ctx.fillStyle = bgGrad;
    ctx.fillRect(trackX - 10, trackTop, w - trackX + 10 - padding.right + 80, trackH);

    // --- Main axis line ---
    ctx.beginPath();
    ctx.moveTo(trackX, trackTop);
    ctx.lineTo(trackX, trackTop + trackH);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // --- "You Are Here" band ---
    const humanBottomY = trackTop + trackH - ((HUMAN_LOG_MIN - LOG_MIN) / LOG_RANGE) * trackH;
    const humanTopY = trackTop + trackH - ((HUMAN_LOG_MAX - LOG_MIN) / LOG_RANGE) * trackH;
    ctx.fillStyle = 'rgba(66, 133, 244, 0.08)';
    ctx.fillRect(trackX - 10, humanTopY, w - trackX + 10 - padding.right + 80, humanBottomY - humanTopY);

    // "You Are Here" label
    const humanMidY = (humanTopY + humanBottomY) / 2;
    ctx.save();
    ctx.font = '600 10px system-ui, sans-serif';
    ctx.fillStyle = 'rgba(66, 133, 244, 0.6)';
    ctx.textAlign = 'center';
    ctx.translate(trackX - 16, humanMidY);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('YOU ARE HERE', 0, 0);
    ctx.restore();

    // --- Tick marks for each power of 10 ---
    for (let logVal = Math.ceil(LOG_MIN); logVal <= Math.floor(LOG_MAX); logVal++) {
      const pct = (logVal - LOG_MIN) / LOG_RANGE;
      const y = trackTop + trackH - pct * trackH;
      const dist = Math.abs(logVal - currentLog);
      const alpha = dist < 3 ? 1 - (dist / 3) * 0.7 : 0.3;

      // Tick line
      ctx.beginPath();
      ctx.moveTo(trackX - 6, y);
      ctx.lineTo(trackX + 6, y);
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Power label
      ctx.font = '500 10px "JetBrains Mono", monospace';
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      const superscript = logVal >= 0 ? `10^${logVal}` : `10^${logVal}`;
      ctx.fillText(superscript, trackX - 10, y);
    }

    // --- Speed entries ---
    for (const entry of speeds) {
      const pct = (entry.log10 - LOG_MIN) / LOG_RANGE;
      const y = trackTop + trackH - pct * trackH;
      const dist = Math.abs(entry.log10 - currentLog);
      const isNear = dist < 2;
      const isClose = dist < 0.8;

      const color = CATEGORY_COLORS[entry.category] || '#ffffff';
      const alpha = isClose ? 1 : isNear ? 0.7 : 0.2;
      const dotR = isClose ? 5 : isNear ? 4 : 3;

      // Dot
      ctx.beginPath();
      ctx.arc(trackX, y, dotR, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.fill();

      // Glow for close entries
      if (isClose) {
        ctx.beginPath();
        ctx.arc(trackX, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.15;
        ctx.fill();
      }

      // Label (only for near entries)
      if (isNear) {
        const labelX = trackX + 18;

        ctx.globalAlpha = alpha;
        ctx.font = isClose ? '600 12px system-ui, sans-serif' : '400 11px system-ui, sans-serif';
        ctx.fillStyle = isClose ? '#ffffff' : 'rgba(255, 255, 255, 0.7)';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(entry.name, labelX, y - 7);

        ctx.font = isClose ? '500 10px "JetBrains Mono", monospace' : '400 9px "JetBrains Mono", monospace';
        ctx.fillStyle = color;
        ctx.fillText(entry.display_speed, labelX, y + 7);
      }

      ctx.globalAlpha = 1;
    }

    // --- Scroll cursor ---
    const cursorY = trackTop + trackH - progress * trackH;
    ctx.beginPath();
    ctx.moveTo(trackX - 12, cursorY);
    ctx.lineTo(trackX - 4, cursorY - 4);
    ctx.lineTo(trackX - 4, cursorY + 4);
    ctx.closePath();
    ctx.fillStyle = '#FFB300';
    ctx.fill();

    // Cursor horizontal line
    ctx.beginPath();
    ctx.moveTo(trackX - 4, cursorY);
    ctx.lineTo(trackX + 100, cursorY);
    ctx.strokeStyle = 'rgba(255, 179, 0, 0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Current log value display
    ctx.font = '500 11px "JetBrains Mono", monospace';
    ctx.fillStyle = '#FFB300';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`10^${currentLog.toFixed(1)} m/s`, trackX + 110, cursorY);

  }, [progress, speeds]);

  // Animation frame loop
  useEffect(() => {
    const render = () => {
      draw();
      animFrameRef.current = requestAnimationFrame(render);
    };
    animFrameRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [draw]);

  return (
    <div ref={containerRef} className="soe-ruler-viz" aria-label="Scroll-linked logarithmic speed scale spanning 17 orders of magnitude">
      <div className="soe-ruler-viz-sticky">
        <canvas
          ref={canvasRef}
          className="soe-ruler-viz-canvas"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="soe-ruler-viz-scroll-hint" style={{ opacity: progress < 0.05 ? 1 : 0 }}>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="4" y="1" width="8" height="14" rx="4" />
            <line x1="8" y1="5" x2="8" y2="8" strokeLinecap="round" />
            <path d="M4 19 L8 23 L12 19" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Scroll to explore
        </div>
      </div>
    </div>
  );
}
