'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { Playfair_Display, Inter, Source_Serif_4, IBM_Plex_Mono } from 'next/font/google';
import './why-venezuela-matters.css';

// =============================================================================
// SELF-HOSTED FONTS (next/font)
// Eliminates external Google Fonts request, auto-subsets, improves LCP
// =============================================================================

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-headline',
  display: 'swap',
});

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

// =============================================================================
// SCROLL-LOCK HOOK (Three-State System)
// =============================================================================

interface ScrollLockState {
  containerRef: React.RefObject<HTMLDivElement>;
  progress: number;
  isPinned: boolean;
  isComplete: boolean;
}

function useScrollLock(sectionHeight: number = 2.5): ScrollLockState {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionTotalHeight = rect.height;
      const scrollableDistance = sectionTotalHeight - windowHeight;
      const scrolledIntoSection = -sectionTop;

      if (sectionTop <= 0 && scrolledIntoSection <= scrollableDistance) {
        // Currently in the scroll-lock zone
        setIsPinned(true);
        setIsComplete(false);
        const newProgress = Math.min(Math.max(scrolledIntoSection / scrollableDistance, 0), 1);
        setProgress(newProgress);
      } else if (sectionTop > 0) {
        // Above the section (haven't reached it yet)
        setIsPinned(false);
        setIsComplete(false);
        setProgress(0);
      } else {
        // Below the section (scrolled past it)
        setIsPinned(false);
        setIsComplete(true);
        setProgress(1);
      }
    };

    window.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => window.removeEventListener('scroll', updateScrollState);
  }, [sectionHeight]);

  return { containerRef, progress, isPinned, isComplete };
}

// Types
interface FactItem {
  text: string;
  source?: string;
}

// Timeline Event interface
interface TimelineEvent {
  time?: string;
  text: string;
  source?: string;
}

// Mission Timeline Event type
interface MissionEvent {
  time: string;
  phase?: 'strikes' | 'extraction' | 'transit' | 'custody';
  headline: string;
  details?: string[];
}

// Mission Timeline Component - Military briefing style
function MissionTimeline({
  title,
  timestamp,
  events,
  reported,
  unknown,
}: {
  title: string;
  timestamp: string;
  events: MissionEvent[];
  reported: FactItem[];
  unknown: FactItem[];
}) {
  const phaseColors = {
    strikes: '#ef4444',
    extraction: '#f59e0b', 
    transit: '#3b82f6',
    custody: '#22c55e',
  };

  const phaseLabels = {
    strikes: 'STRIKES',
    extraction: 'EXTRACTION',
    transit: 'TRANSIT',
    custody: 'CUSTODY',
  };

  return (
    <div className="mission-timeline">
      <div className="mission-timeline__header">
        <h2 className="mission-timeline__title">{title}</h2>
        <span className="mission-timeline__timestamp">As of {timestamp}</span>
      </div>

      <div className="mission-timeline__track">
        {events.map((event, i) => (
          <div 
            key={i} 
            className={`mission-timeline__event ${event.phase ? `mission-timeline__event--${event.phase}` : ''}`}
          >
            <div className="mission-timeline__time-column">
              <span className="mission-timeline__time">{event.time}</span>
              {event.phase && (
                <span 
                  className="mission-timeline__phase"
                  style={{ color: phaseColors[event.phase] }}
                >
                  {phaseLabels[event.phase]}
                </span>
              )}
            </div>
            <div className="mission-timeline__connector">
              <div 
                className="mission-timeline__node"
                style={{ 
                  borderColor: event.phase ? phaseColors[event.phase] : '#22c55e',
                  boxShadow: event.phase ? `0 0 12px ${phaseColors[event.phase]}40` : '0 0 12px rgba(34, 197, 94, 0.25)'
                }}
              />
              {i < events.length - 1 && <div className="mission-timeline__line" />}
            </div>
            <div className="mission-timeline__content">
              <span className="mission-timeline__headline">{event.headline}</span>
              {event.details && event.details.length > 0 && (
                <ul className="mission-timeline__details">
                  {event.details.map((detail, j) => (
                    <li key={j}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row: Reported and Unknown side by side */}
      <div className="fact-box-footer">
        {/* Reported section */}
        <div className="fact-caveats">
          <div className="fact-caveats-label">
            <svg viewBox="0 0 20 20" fill="currentColor" className="fact-caveats-icon">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Reported (Unverified)
          </div>
          <ul className="fact-caveats-list">
            {reported.map((item, i) => (
              <li key={i}>{item.text}</li>
            ))}
          </ul>
        </div>

        {/* Unknown section */}
        <div className="fact-questions">
          <div className="fact-questions-label">
            <svg viewBox="0 0 20 20" fill="currentColor" className="fact-questions-icon">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Open Questions
          </div>
          <ul className="fact-questions-list">
            {unknown.map((item, i) => (
              <li key={i}>{item.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SVG DIAGRAM COMPONENTS
// ============================================================================

// Module A: Hemisphere Map (placeholder - uses Orinoco Belt image)
function HemisphereMap() {
  return (
    <div className="visual-module">
      <div className="visual-module-label">Module A: Geographic Context</div>
      <div style={{ background: '#1a365d', padding: '1rem' }}>
        <img
          src="https://images.esy.com/essays/why-venezuela-matters/orinoco-oil-belt-map.2de055ee32.png"
          alt="Orinoco Oil Belt geological map showing Venezuela's heavy crude deposits"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <p className="visual-module-caption">
        The Orinoco Belt: 600km of heavy crude deposits. Source: U.S. Geological Survey (Public Domain)
      </p>
    </div>
  );
}

// Module B: Heavy vs Light Crude Comparison (with phase animation)
function HeavyVsLightCrudeDiagram({ phase = 'complete' }: { phase?: string }) {
  // Phase progression: scale → labels → orinoco → brent → details
  const showScale = phase !== 'init';
  const showLabels = ['labels', 'orinoco', 'brent', 'complete'].includes(phase);
  const showOrinoco = ['orinoco', 'brent', 'complete'].includes(phase);
  const showBrent = ['brent', 'complete'].includes(phase);
  const showDetails = phase === 'complete';

  const transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';

  return (
    <div className="visual-module">
      <div className="visual-module-label">Module B: Crude Oil Chemistry</div>
      <svg viewBox="0 0 700 320" style={{ width: '100%', height: 'auto' }}>
        {/* Background */}
        <rect width="700" height="320" fill="#242424" rx="8" />

        {/* Title - always visible */}
        <text x="350" y="30" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="700" fill="#F5F2EB">
          API Gravity Scale: Why Oil Type Matters
        </text>

        {/* API Scale Bar */}
        <defs>
          <linearGradient id="apiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0D0D0D" />
            <stop offset="30%" stopColor="#744210" />
            <stop offset="70%" stopColor="#d69e2e" />
            <stop offset="100%" stopColor="#f6e05e" />
          </linearGradient>
        </defs>
        <g style={{ opacity: showScale ? 1 : 0, transition }}>
          <rect x="50" y="60" width="600" height="30" fill="url(#apiGradient)" rx="4" />
        </g>

        {/* Scale Labels */}
        <g style={{ opacity: showLabels ? 1 : 0, transition }}>
          <text x="50" y="110" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#718096">0°</text>
          <text x="140" y="110" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#718096">10°</text>
          <text x="350" y="110" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#718096">22°</text>
          <text x="560" y="110" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#718096">40°</text>
          <text x="640" y="110" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#718096">50°+</text>
        </g>

        {/* Orinoco Marker */}
        <g style={{ opacity: showOrinoco ? 1 : 0, transform: `translateY(${showOrinoco ? 0 : -10}px)`, transition }}>
          <line x1="110" y1="55" x2="110" y2="95" stroke="#FF4500" strokeWidth="3" />
          <circle cx="110" cy="52" r="6" fill="#FF4500" />
          <text x="110" y="130" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="#FF4500">
            Orinoco
          </text>
          <text x="110" y="145" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#718096">
            8-12° API
          </text>
          {/* Heavy Label */}
          <text x="130" y="175" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#F5F2EB">HEAVY</text>
          <text x="130" y="192" fontFamily="Inter, sans-serif" fontSize="11" fill="#718096">Thick, high sulfur</text>
          <text x="130" y="207" fontFamily="Inter, sans-serif" fontSize="11" fill="#718096">Requires complex refining</text>
        </g>

        {/* Brent Marker */}
        <g style={{ opacity: showBrent ? 1 : 0, transform: `translateY(${showBrent ? 0 : -10}px)`, transition }}>
          <line x1="540" y1="55" x2="540" y2="95" stroke="#2E5A3C" strokeWidth="3" />
          <circle cx="540" cy="52" r="6" fill="#2E5A3C" />
          <text x="540" y="130" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="#2E5A3C">
            Brent
          </text>
          <text x="540" y="145" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#718096">
            38° API
          </text>
          {/* Light Label */}
          <text x="500" y="175" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#F5F2EB">LIGHT</text>
          <text x="500" y="192" fontFamily="Inter, sans-serif" fontSize="11" fill="#718096">Flows easily, low sulfur</text>
          <text x="500" y="207" fontFamily="Inter, sans-serif" fontSize="11" fill="#718096">Simple refining</text>
        </g>

        {/* Comparison Boxes */}
        <g style={{ opacity: showDetails ? 1 : 0, transform: `translateY(${showDetails ? 0 : 20}px)`, transition }}>
          <rect x="50" y="230" width="290" height="75" fill="#0D0D0D" rx="6" stroke="#FF4500" strokeWidth="1" strokeOpacity="0.3" />
          <text x="195" y="255" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="#D69E2E">
            Venezuela (Orinoco)
          </text>
          <text x="195" y="275" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#a0aec0">
            303B barrels reserves
          </text>
          <text x="195" y="292" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#a0aec0">
            ~1M bpd production
          </text>

          <rect x="360" y="230" width="290" height="75" fill="#0A1628" rx="6" />
          <text x="505" y="255" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="#90cdf4">
            U.S. Shale
          </text>
          <text x="505" y="275" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#a0aec0">
            Light sweet crude
          </text>
          <text x="505" y="292" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#a0aec0">
            13M+ bpd production
          </text>
        </g>
      </svg>
      <p className="visual-module-caption" style={{ opacity: showDetails ? 1 : 0, transition }}>
        Higher API gravity = lighter oil. Gulf Coast refineries were built for heavy crude like Venezuela produces.
      </p>
    </div>
  );
}

// =============================================================================
// SCROLL-LOCK: Chemistry Lesson (Ch2)
// =============================================================================

function ChemistryLessonScrollLock() {
  const { containerRef, progress, isPinned, isComplete } = useScrollLock(2.5);

  const phase = useMemo(() => {
    if (progress < 0.20) return 'scale';
    if (progress < 0.40) return 'labels';
    if (progress < 0.60) return 'orinoco';
    if (progress < 0.80) return 'brent';
    return 'complete';
  }, [progress]);

  const getPinnedClass = () => {
    if (isPinned) return 'is-pinned';
    if (isComplete) return 'is-complete';
    return '';
  };

  return (
    <section
      ref={containerRef}
      className="scroll-lock-container"
      style={{ height: '250vh' }}
    >
      <div className={`scroll-lock-pinned ${getPinnedClass()}`}>
        <div className="scroll-lock-content">
          <div className="scroll-lock-text">
            <h3 className="scroll-lock-title">The Chemistry Problem</h3>
            <p className="scroll-lock-description">
              {phase === 'scale' && 'Oil density is measured on the API gravity scale...'}
              {phase === 'labels' && 'Higher numbers mean lighter oil that flows more easily.'}
              {phase === 'orinoco' && 'Orinoco crude: 8-12° API — so thick it barely flows at room temperature.'}
              {phase === 'brent' && 'Brent crude: 38° API — the light benchmark. These are not interchangeable.'}
              {phase === 'complete' && 'Gulf Coast refineries were built for heavy crude. U.S. shale produces light.'}
            </p>
          </div>
          <div className="scroll-lock-diagram">
            <HeavyVsLightCrudeDiagram phase={phase} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Module C: Import Flow Diagram (with phase animation)
function ImportFlowDiagram({ phase = 'complete' }: { phase?: string }) {
  // Phase progression: shale → exports → refineries → sources → complete
  const showShale = phase !== 'init';
  const showExports = ['exports', 'refineries', 'sources', 'complete'].includes(phase);
  const showRefineries = ['refineries', 'sources', 'complete'].includes(phase);
  const showSources = ['sources', 'complete'].includes(phase);
  const showConnections = phase === 'complete';

  const transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';

  return (
    <div className="visual-module">
      <div className="visual-module-label">Module C: The Structural Mismatch</div>
      <svg viewBox="0 0 700 280" style={{ width: '100%', height: 'auto' }}>
        <rect width="700" height="280" fill="#242424" rx="8" />

        {/* Title - always visible */}
        <text x="350" y="28" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="15" fontWeight="700" fill="#F5F2EB">
          Why the U.S. Both Exports AND Imports Oil
        </text>

        {/* Defs for arrows */}
        <defs>
          <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#38a169" />
          </marker>
          <marker id="arrowAmber" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#d69e2e" />
          </marker>
        </defs>

        {/* Left side: U.S. Shale Production */}
        <g style={{ opacity: showShale ? 1 : 0, transform: `translateX(${showShale ? 0 : -20}px)`, transition }}>
          <rect x="30" y="60" width="140" height="70" fill="#0A1628" rx="6" />
          <text x="100" y="90" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="white">U.S. Shale</text>
          <text x="100" y="108" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#90cdf4">13M bpd</text>
          <text x="100" y="122" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fill="#a0aec0">Light Sweet</text>
        </g>

        {/* Export Arrow and Box */}
        <g style={{ opacity: showExports ? 1 : 0, transform: `translateY(${showExports ? 0 : -10}px)`, transition }}>
          <path d="M 170 95 L 220 60" stroke="#38a169" strokeWidth="3" fill="none" markerEnd="url(#arrowGreen)" />
          <rect x="220" y="35" width="120" height="50" fill="#38a169" rx="6" />
          <text x="280" y="58" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="white">EXPORTS</text>
          <text x="280" y="74" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#c6f6d5">→ Global Markets</text>
        </g>

        {/* Center: Gulf Coast Refineries */}
        <g style={{ opacity: showRefineries ? 1 : 0, transform: `scale(${showRefineries ? 1 : 0.9})`, transformOrigin: '350px 175px', transition }}>
          <rect x="250" y="130" width="200" height="90" fill="#d69e2e" rx="8" />
          <text x="350" y="160" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="700" fill="#1a202c">Gulf Coast Refineries</text>
          <text x="350" y="180" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#744210">Built for HEAVY crude</text>
          <text x="350" y="198" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#744210">Cokers • Hydrocrackers • Desulfurizers</text>
        </g>

        {/* Right side: Heavy Crude Sources */}
        <g style={{ opacity: showSources ? 1 : 0, transform: `translateX(${showSources ? 0 : 20}px)`, transition }}>
          <rect x="530" y="50" width="140" height="55" fill="#1a202c" rx="6" />
          <text x="600" y="73" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#d69e2e">Canada</text>
          <text x="600" y="90" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#a0aec0">4M+ bpd heavy</text>

          <rect x="530" y="115" width="140" height="55" fill="#1a202c" rx="6" />
          <text x="600" y="138" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#ed8936">Venezuela</text>
          <text x="600" y="155" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#a0aec0">Blocked by sanctions</text>

          <rect x="530" y="180" width="140" height="55" fill="#1a202c" rx="6" />
          <text x="600" y="203" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#a0aec0">Mexico</text>
          <text x="600" y="220" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#718096">Declining (22K bpd)</text>
        </g>

        {/* Import Arrows and Label */}
        <g style={{ opacity: showConnections ? 1 : 0, transition }}>
          <path d="M 530 77 L 460 150" stroke="#d69e2e" strokeWidth="3" fill="none" markerEnd="url(#arrowAmber)" />
          <path d="M 530 175 L 460 175" stroke="#ed8936" strokeWidth="2" strokeDasharray="5,5" fill="none" />
          <rect x="470" y="95" width="50" height="24" fill="#e53e3e" rx="4" />
          <text x="495" y="112" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" fill="white">IMPORTS</text>
        </g>

        {/* Key insight */}
        <g style={{ opacity: showConnections ? 1 : 0, transform: `translateY(${showConnections ? 0 : 10}px)`, transition }}>
          <rect x="30" y="240" width="640" height="30" fill="#edf2f7" rx="4" />
          <text x="350" y="260" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill="#4a5568">
            The U.S. exports light crude it produces, but must import heavy crude its refineries need.
          </text>
        </g>
      </svg>
      <p className="visual-module-caption" style={{ opacity: showConnections ? 1 : 0, transition }}>
        Gulf Coast refineries represent billions in specialized equipment that cannot simply switch to processing light shale oil.
      </p>
    </div>
  );
}

// =============================================================================
// SCROLL-LOCK: The Split Flow (Ch3)
// =============================================================================

function SplitFlowScrollLock() {
  const { containerRef, progress, isPinned, isComplete } = useScrollLock(2.5);

  const phase = useMemo(() => {
    if (progress < 0.20) return 'shale';
    if (progress < 0.40) return 'exports';
    if (progress < 0.60) return 'refineries';
    if (progress < 0.80) return 'sources';
    return 'complete';
  }, [progress]);

  const getPinnedClass = () => {
    if (isPinned) return 'is-pinned';
    if (isComplete) return 'is-complete';
    return '';
  };

  return (
    <section
      ref={containerRef}
      className="scroll-lock-container"
      style={{ height: '250vh' }}
    >
      <div className={`scroll-lock-pinned ${getPinnedClass()}`}>
        <div className="scroll-lock-content">
          <div className="scroll-lock-text">
            <h3 className="scroll-lock-title">The U.S. Paradox</h3>
            <p className="scroll-lock-description">
              {phase === 'shale' && 'The shale revolution made the U.S. the world\'s largest oil producer — 13M barrels per day.'}
              {phase === 'exports' && 'But shale oil is light and sweet. Much of it gets exported to global markets.'}
              {phase === 'refineries' && 'Gulf Coast refineries were built for heavy crude. Billions in specialized equipment.'}
              {phase === 'sources' && 'So the U.S. must import heavy crude from Canada, Venezuela, and Mexico.'}
              {phase === 'complete' && 'The structural mismatch: producing light, needing heavy. They are not interchangeable.'}
            </p>
          </div>
          <div className="scroll-lock-diagram">
            <ImportFlowDiagram phase={phase} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Module D: Production Chart (conceptual)
function ProductionMismatchChart() {
  return (
    <div className="visual-module">
      <div className="visual-module-label">Module D: The Gap</div>
      <svg viewBox="0 0 700 260" style={{ width: '100%', height: 'auto' }}>
        <rect width="700" height="260" fill="#f7fafc" rx="8" />

        {/* Title */}
        <text x="350" y="28" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="15" fontWeight="700" fill="#1a202c">
          U.S. Crude Production vs. Refinery Requirements
        </text>

        {/* Chart area */}
        <rect x="50" y="50" width="600" height="160" fill="white" stroke="#e2e8f0" strokeWidth="1" rx="4" />

        {/* Y-axis labels */}
        <text x="45" y="70" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#718096">100%</text>
        <text x="45" y="130" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#718096">50%</text>
        <text x="45" y="205" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#718096">0%</text>

        {/* Light crude bar (what U.S. produces) */}
        <rect x="120" y="65" width="120" height="140" fill="#1a365d" rx="4" />
        <text x="180" y="145" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="white">LIGHT</text>
        <text x="180" y="165" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#90cdf4">U.S. Shale</text>
        <text x="180" y="180" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#90cdf4">Production</text>

        {/* Heavy crude bar (what refineries need) */}
        <rect x="290" y="110" width="120" height="95" fill="#d69e2e" rx="4" />
        <text x="350" y="155" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="#1a202c">HEAVY</text>
        <text x="350" y="175" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#744210">Refinery</text>
        <text x="350" y="190" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#744210">Requirement</text>

        {/* Gap indicator */}
        <rect x="460" y="65" width="120" height="45" fill="#e53e3e" rx="4" />
        <text x="520" y="92" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="700" fill="white">THE GAP</text>

        {/* Arrow showing the problem */}
        <path d="M 520 115 L 520 180" stroke="#e53e3e" strokeWidth="2" strokeDasharray="4,4" fill="none" />
        <text x="520" y="198" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#e53e3e">Must Import</text>

        {/* Bottom label */}
        <rect x="50" y="220" width="600" height="30" fill="#fff5f5" rx="4" />
        <text x="350" y="240" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill="#c53030">
          ~40 million barrels/month of heavy crude imported to Gulf Coast (Feb 2025)
        </text>
      </svg>
      <p className="visual-module-caption">
        Qualitative illustration of the structural mismatch between U.S. production and refinery requirements.
      </p>
    </div>
  );
}

// Module E: Timeline Band
function TimelineBand() {
  return (
    <div className="visual-module">
      <div className="visual-module-label">Module E: Historical Timeline</div>
      <div style={{ overflowX: 'auto' }}>
        <svg viewBox="0 0 900 200" style={{ minWidth: '800px', width: '100%', height: 'auto' }}>
          <rect width="900" height="200" fill="#f7fafc" rx="8" />

          {/* Timeline base */}
          <line x1="50" y1="100" x2="850" y2="100" stroke="#cbd5e0" strokeWidth="3" />

          {/* Pre-Chavez Era */}
          <rect x="50" y="60" width="150" height="80" fill="rgba(183, 121, 31, 0.2)" rx="4" />
          <line x1="50" y1="140" x2="200" y2="140" stroke="#b7791f" strokeWidth="4" />
          <text x="125" y="85" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#744210">Pre-1999</text>
          <text x="125" y="105" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#744210">3.5M bpd</text>
          <text x="125" y="120" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fill="#744210">Peak Production</text>

          {/* Chavez Era */}
          <rect x="200" y="60" width="200" height="80" fill="rgba(197, 48, 48, 0.15)" rx="4" />
          <line x1="200" y1="140" x2="400" y2="140" stroke="#c53030" strokeWidth="4" />
          <text x="300" y="85" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#c53030">1999-2013</text>
          <text x="300" y="105" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#9b2c2c">Chavez Era</text>
          <text x="300" y="120" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fill="#9b2c2c">Nationalization, decline begins</text>

          {/* Maduro Era */}
          <rect x="400" y="60" width="250" height="80" fill="rgba(214, 158, 46, 0.15)" rx="4" />
          <line x1="400" y1="140" x2="650" y2="140" stroke="#d69e2e" strokeWidth="4" />
          <text x="525" y="85" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#b7791f">2013-2025</text>
          <text x="525" y="105" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#744210">Maduro Era</text>
          <text x="525" y="120" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fill="#744210">Sanctions, ~1M bpd</text>

          {/* Operation Era */}
          <rect x="650" y="60" width="200" height="80" fill="rgba(229, 62, 62, 0.2)" rx="4" />
          <line x1="650" y1="140" x2="850" y2="140" stroke="#e53e3e" strokeWidth="4" />
          <text x="750" y="85" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill="#e53e3e">Jan 3, 2026</text>
          <text x="750" y="105" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#c53030">Operation</text>
          <text x="750" y="120" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fill="#c53030">Absolute Resolve</text>

          {/* Key Events */}
          <circle cx="200" cy="100" r="8" fill="#c53030" />
          <text x="200" y="170" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#718096">1999</text>

          <circle cx="400" cy="100" r="8" fill="#d69e2e" />
          <text x="400" y="170" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#718096">2013</text>

          <circle cx="550" cy="100" r="6" fill="#ed8936" />
          <text x="550" y="170" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#718096">2019</text>
          <text x="550" y="182" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fill="#a0aec0">Indictment</text>

          <circle cx="650" cy="100" r="10" fill="#e53e3e" stroke="#fff" strokeWidth="2" />
          <text x="650" y="170" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#e53e3e">2026</text>
        </svg>
      </div>
      <p className="visual-module-caption">
        From peak production to capture: Venezuela&apos;s oil output collapsed from 3.5M to ~1M barrels per day.
      </p>
    </div>
  );
}

// Module F: Markets Chart
function MarketsChart() {
  return (
    <div className="visual-module">
      <div className="visual-module-label">Module F: Market Response Pattern</div>
      <svg viewBox="0 0 700 220" style={{ width: '100%', height: 'auto' }}>
        <rect width="700" height="220" fill="#f7fafc" rx="8" />

        {/* Title */}
        <text x="350" y="28" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="15" fontWeight="700" fill="#1a202c">
          Typical Market Response to Geopolitical Shock
        </text>

        {/* Chart area */}
        <rect x="50" y="50" width="600" height="120" fill="white" stroke="#e2e8f0" strokeWidth="1" rx="4" />

        {/* Baseline */}
        <line x1="50" y1="130" x2="650" y2="130" stroke="#cbd5e0" strokeWidth="1" strokeDasharray="4,4" />
        <text x="45" y="134" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#a0aec0">baseline</text>

        {/* Response curve */}
        <path
          d="M 80 130
             L 150 130
             Q 180 130 200 70
             Q 220 55 250 80
             Q 300 120 350 115
             Q 400 110 450 120
             Q 500 125 550 128
             L 620 130"
          stroke="#d69e2e"
          strokeWidth="3"
          fill="none"
        />

        {/* Phase labels */}
        <rect x="80" y="155" width="80" height="25" fill="#e2e8f0" rx="4" />
        <text x="120" y="172" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a5568">Pre-Event</text>

        <rect x="180" y="155" width="80" height="25" fill="#fed7d7" rx="4" />
        <text x="220" y="172" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" fill="#c53030">Shock</text>

        <rect x="290" y="155" width="100" height="25" fill="#feebc8" rx="4" />
        <text x="340" y="172" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#744210">Volatility</text>

        <rect x="420" y="155" width="110" height="25" fill="#c6f6d5" rx="4" />
        <text x="475" y="172" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#276749">Stabilization</text>

        {/* Spike annotation */}
        <line x1="210" y1="55" x2="210" y2="45" stroke="#e53e3e" strokeWidth="1" />
        <text x="210" y="42" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill="#e53e3e">Peak volatility</text>

        {/* Caveat */}
        <rect x="50" y="190" width="600" height="22" fill="#fff5f5" rx="4" />
        <text x="350" y="205" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#c53030">
          Pattern assumes contained conflict. Escalation scenarios diverge significantly.
        </text>
      </svg>
      <p className="visual-module-caption">
        Conceptual illustration. Actual market response depends on escalation, supply disruption duration, and policy response.
      </p>
    </div>
  );
}

// Module H: Legality Matrix
function LegalityMatrix() {
  return (
    <div className="visual-module">
      <div className="visual-module-label">Module H: Legal Framework</div>
      <svg viewBox="0 0 700 340" style={{ width: '100%', height: 'auto' }}>
        <rect width="700" height="340" fill="#f7fafc" rx="8" />

        {/* Title */}
        <text x="350" y="28" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="15" fontWeight="700" fill="#1a202c">
          Legality Tests: Domestic vs. International
        </text>

        {/* Matrix Grid */}
        {/* Headers */}
        <rect x="50" y="50" width="300" height="40" fill="#1a365d" rx="4" />
        <text x="200" y="76" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="white">U.S. DOMESTIC LAW</text>

        <rect x="360" y="50" width="300" height="40" fill="#1a202c" rx="4" />
        <text x="510" y="76" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="white">INTERNATIONAL LAW</text>

        {/* Domestic Column */}
        <rect x="50" y="90" width="300" height="70" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="200" y="115" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#1a365d">Article II Authority</text>
        <text x="200" y="135" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a5568">President as Commander-in-Chief</text>
        <circle cx="320" cy="125" r="12" fill="#ed8936" />
        <text x="320" y="129" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="white">?</text>

        <rect x="50" y="160" width="300" height="70" fill="#f7fafc" stroke="#e2e8f0" strokeWidth="1" />
        <text x="200" y="185" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#1a365d">War Powers Resolution</text>
        <text x="200" y="205" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a5568">48hr notification, 60-day limit</text>
        <circle cx="320" cy="195" r="12" fill="#e53e3e" />
        <text x="320" y="199" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="white">!</text>

        <rect x="50" y="230" width="300" height="70" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="200" y="255" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#1a365d">Law Enforcement Framing</text>
        <text x="200" y="275" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a5568">Arrest warrant execution</text>
        <circle cx="320" cy="265" r="12" fill="#ed8936" />
        <text x="320" y="269" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="white">?</text>

        {/* International Column */}
        <rect x="360" y="90" width="300" height="70" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="510" y="115" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#1a202c">UN Charter Art. 2(4)</text>
        <text x="510" y="135" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a5568">Prohibition on use of force</text>
        <circle cx="630" cy="125" r="12" fill="#e53e3e" />
        <text x="630" y="129" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="white">✗</text>

        <rect x="360" y="160" width="300" height="70" fill="#f7fafc" stroke="#e2e8f0" strokeWidth="1" />
        <text x="510" y="185" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#1a202c">Self-Defense (Art. 51)</text>
        <text x="510" y="205" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a5568">Armed attack requirement</text>
        <circle cx="630" cy="195" r="12" fill="#a0aec0" />
        <text x="630" y="199" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="white">—</text>

        <rect x="360" y="230" width="300" height="70" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="510" y="255" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#1a202c">Security Council Auth.</text>
        <text x="510" y="275" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a5568">None obtained</text>
        <circle cx="630" cy="265" r="12" fill="#e53e3e" />
        <text x="630" y="269" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="white">✗</text>

        {/* Legend */}
        <rect x="50" y="310" width="600" height="22" fill="#edf2f7" rx="4" />
        <circle cx="120" cy="321" r="8" fill="#38a169" />
        <text x="135" y="325" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a5568">Satisfied</text>
        <circle cx="220" cy="321" r="8" fill="#ed8936" />
        <text x="235" y="325" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a5568">Contested</text>
        <circle cx="330" cy="321" r="8" fill="#e53e3e" />
        <text x="345" y="325" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a5568">Violated/Not Met</text>
        <circle cx="460" cy="321" r="8" fill="#a0aec0" />
        <text x="475" y="325" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a5568">Not Applicable</text>
      </svg>
      <p className="visual-module-caption">
        Legal status is contested on domestic grounds and broadly criticized on international grounds.
      </p>
    </div>
  );
}

// Legacy placeholder for Module A if needed
function VisualModulePlaceholder({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) {
  return (
    <div className="visual-module">
      <div className="visual-module-label">Visual Module {id}</div>
      <div
        style={{
          background: 'linear-gradient(135deg, #1a365d 0%, #1a202c 100%)',
          height: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#d69e2e',
          fontFamily: 'var(--font-headline)',
          fontSize: '1.25rem',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        {title}
      </div>
      <p className="visual-module-caption">{description}</p>
    </div>
  );
}

// Progress Bar Component (Pipeline Pressure Gauge)
function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="progress-bar">
      <div className="progress-bar__pipe">
        <div className="progress-bar__fill" style={{ height: `${progress}%` }} />
        <div className="progress-bar__markers">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="progress-bar__marker" />
          ))}
        </div>
      </div>
      <span className="progress-bar__label">Progress</span>
    </div>
  );
}

// Hero Section Component
function Hero() {
  return (
    <section className="hero">
      <div className="hero__background">
        <img
          src="https://images.esy.com/essays/why-venezuela-matters/orinoco-oil-belt-map.2de055ee32.png"
          alt=""
          className="hero__background-image"
        />
        <div className="hero__overlay" />
      </div>
      <div className="hero__flare-glow" />
      <div className="hero__content">
        <span className="hero__eyebrow">Visual Systems Essay</span>
        <h1 className="hero__title">
          Why <span className="accent">Venezuela</span> Matters
        </h1>
        <p className="hero__subtitle">
          Oil, Refineries, and Power in the Western Hemisphere — Understanding the forces
          behind Operation Absolute Resolve
        </p>
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-value">303B</span>
            <span className="hero__stat-label">Barrels in Reserve</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-value">8°</span>
            <span className="hero__stat-label">API Gravity</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-value">~1M</span>
            <span className="hero__stat-label">Barrels/Day</span>
          </div>
        </div>
      </div>
      <div className="hero__scroll-indicator">
        <div className="hero__scroll-text">Scroll to explore</div>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}

// Main Component
export default function WhyVenezuelaMattersClient() {
  // Combine font variables for CSS custom properties
  const fontClasses = `${playfairDisplay.variable} ${inter.variable} ${sourceSerif4.variable} ${ibmPlexMono.variable}`;
  
  return (
    <article className={`venezuela-essay ${fontClasses}`}>
      <ProgressBar />
      <Hero />

      {/* Main Content */}
      <main className="venezuela-essay__container">
        {/* Executive Summary */}
        <section>
          <p>
            On January 3, 2026, U.S. forces captured Venezuelan President Nicolas Maduro in an
            operation codenamed &quot;Absolute Resolve.&quot; President Trump announced the United States
            would &quot;run&quot; Venezuela until a transition could occur.
          </p>
          <p>
            This essay explains the systems behind the headlines.
          </p>
          <p>
            Venezuela sits atop 303 billion barrels of oil — the world&apos;s largest proven reserves.
            But it produces only about 1 million barrels per day, a fraction of its historical 3.5
            million. This paradox reflects not geology but governance: decades of underinvestment,
            mismanagement, and sanctions have created an oil industry that struggles to extract the
            resources beneath it.
          </p>
          <p>
            Meanwhile, U.S. Gulf Coast refineries were built to process exactly the kind of heavy,
            sour crude that Venezuela produces — and that American shale does not. The United
            States both exports light crude and imports heavy crude because they are not
            substitutable. Billions of dollars in specialized refinery equipment cannot simply
            switch.
          </p>
        </section>

        {/* Venezuela in One Paragraph */}
        <h2>Venezuela in One Paragraph</h2>
        <section>
          <p>
            Venezuela occupies the northern coast of South America, facing the Caribbean Sea.
            Thirty million people live across a geography that spans Andean highlands, Amazon
            jungle, and coastal plains. Its capital, Caracas, sits in a valley behind the coastal
            mountains.
          </p>
          <p>But what makes Venezuela matter to the world sits underground.</p>
          <p>
            The country holds the world&apos;s largest proven oil reserves: approximately 303 billion
            barrels, surpassing Saudi Arabia. The Energy Information Administration and OPEC&apos;s
            Annual Statistical Bulletin confirm this figure year after year.
          </p>
          <p>
            Yet Venezuela produces only about 1 million barrels per day — roughly 1% of global
            production. In the 1990s, it produced over 3.5 million barrels per day. The collapse is
            not geological. The oil is still there.
          </p>
          <p>
            The collapse is political, economic, and institutional. Understanding why requires
            understanding the oil itself.
          </p>

          <HemisphereMap />
        </section>

        {/* The Oil That Doesn't Behave */}
        <h2>The Oil That Doesn&apos;t Behave: Orinoco, Heavy Crude, and Refinery Physics</h2>
        <section>
          <p>
            The Orinoco Belt stretches 600 kilometers across eastern Venezuela, roughly 70
            kilometers wide. The U.S. Geological Survey estimates it contains 900 to 1,400 billion
            barrels of heavy crude in proven and unproven deposits. Of this, 380 to 652 billion
            barrels may be technically recoverable.
          </p>
          <p>
            These are staggering numbers. But &quot;reserves&quot; does not equal &quot;production.&quot;
          </p>
        </section>

        {/* SCROLL-LOCK: Chemistry Lesson */}
        <ChemistryLessonScrollLock />

        <section>
          <h3>The sulfur problem</h3>
          <p>
            Orinoco crude is &quot;sour&quot; — high in sulfur content. Sulfur must be removed during
            refining (it creates air pollution and corrodes equipment). Desulfurization is
            expensive.
          </p>
          <p>Heavy, sour crude requires complex refineries with specific equipment:</p>
          <ul>
            <li>
              <strong>Cokers</strong>: Break down heavy residual oil into lighter products
            </li>
            <li>
              <strong>Hydrocrackers</strong>: Use hydrogen and pressure to convert heavy molecules
            </li>
            <li>
              <strong>Desulfurization units</strong>: Remove sulfur to meet environmental standards
            </li>
          </ul>
          <p>
            Not all refineries have this equipment. Most were built for lighter, sweeter crudes.
            The ones that have it represent billions of dollars in sunk costs.
          </p>
        </section>

        {/* The U.S. Paradox */}
        <h2>The U.S. Paradox: Producing Light, Needing Heavy</h2>
        <section>
          <p>
            The U.S. Gulf Coast (PADD 3 in EIA terminology) hosts the largest concentration of
            complex refineries in the world. These facilities were constructed decades ago to
            process heavy, sour crude — the kind that once flowed abundantly from Venezuela and
            Mexico.
          </p>
        </section>

        {/* SCROLL-LOCK: The Split Flow */}
        <SplitFlowScrollLock />

        <section>
          <h3>The structural mismatch</h3>
          <p>
            For the 12 months ending in February 2025, Gulf Coast refiners imported roughly 40
            million barrels of heavy crude each month<span className="source-note">EIA</span>. This is not a choice. It&apos;s a necessity. The
            equipment cannot efficiently process light shale oil.
          </p>
          <h3>Who supplies heavy crude?</h3>
          <ul>
            <li>
              <strong>Canada</strong>: Now the largest single supplier, exporting over 4 million
              barrels per day from Alberta&apos;s oil sands<span className="source-note">EIA</span>
            </li>
            <li>
              <strong>Mexico</strong>: Historically important, but collapsing — Maya crude exports
              down to 22,000 barrels/day, a six-year low<span className="source-note">S&amp;P Global</span>
            </li>
            <li>
              <strong>Venezuela</strong>: Once supplied millions of barrels monthly; now reduced to
              a trickle under sanctions
            </li>
          </ul>
          <p>
            The result: The United States simultaneously exports light crude and imports heavy
            crude. These are not substitutable products. The wrong-shaped key does not fit the
            lock.
          </p>

          <ProductionMismatchChart />
        </section>

        {/* Power as Flow Control */}
        <h2>Power as Flow Control: Shipping, Sanctions, and Institutional Levers</h2>
        <section>
          <p>If you control the flows, you control the power.</p>
          <p>
            U.S. sanctions against Venezuela have evolved across three administrations, each
            tightening the economic pressure:
          </p>
          
          <div className="sanctions-timeline">
            <div className="sanctions-timeline__event">
              <div className="sanctions-timeline__marker">
                <span className="sanctions-timeline__year">2017–18</span>
                <div className="sanctions-timeline__dot" />
              </div>
              <div className="sanctions-timeline__content">
                <span className="sanctions-timeline__label">Targeted</span>
                <p>Initial targeted sanctions on individuals</p>
              </div>
            </div>
            
            <div className="sanctions-timeline__event sanctions-timeline__event--escalation">
              <div className="sanctions-timeline__marker">
                <span className="sanctions-timeline__year">2019–20</span>
                <div className="sanctions-timeline__dot" />
              </div>
              <div className="sanctions-timeline__content">
                <span className="sanctions-timeline__label">Maximum Pressure</span>
                <p>Sanctions on PDVSA, oil sector designations</p>
              </div>
            </div>
            
            <div className="sanctions-timeline__event sanctions-timeline__event--legal">
              <div className="sanctions-timeline__marker">
                <span className="sanctions-timeline__year">2020</span>
                <div className="sanctions-timeline__dot" />
              </div>
              <div className="sanctions-timeline__content">
                <span className="sanctions-timeline__label">Indictment</span>
                <p>DOJ indicts Maduro on narco-terrorism charges</p>
              </div>
            </div>
            
            <div className="sanctions-timeline__event sanctions-timeline__event--relief">
              <div className="sanctions-timeline__marker">
                <span className="sanctions-timeline__year">2023</span>
                <div className="sanctions-timeline__dot" />
              </div>
              <div className="sanctions-timeline__content">
                <span className="sanctions-timeline__label">Limited Relief</span>
                <p>Chevron receives license to resume operations</p>
              </div>
            </div>
            
            <div className="sanctions-timeline__event sanctions-timeline__event--escalation">
              <div className="sanctions-timeline__marker">
                <span className="sanctions-timeline__year">2025</span>
                <div className="sanctions-timeline__dot" />
              </div>
              <div className="sanctions-timeline__content">
                <span className="sanctions-timeline__label">Blockade</span>
                <p>Maximum pressure reinstated — export blockade, additional designations</p>
              </div>
            </div>
          </div>
          <p className="sanctions-timeline-caption">
            Color indicates policy direction: escalation, legal action, relief
          </p>
          
          <p>
            By December 2025, the situation had become acute. OFAC designated additional companies
            and tankers. A de facto blockade prevented vessels from entering or leaving Venezuelan
            ports.
          </p>
          <p>
            PDVSA&apos;s storage approached capacity: 25 million barrels of crude and fuel oil with
            nowhere to go. Industry sources told Reuters the situation was &quot;getting ugly.&quot; Without
            tanker departures, the company risked shutting down refining units.
          </p>
          <p>
            This is how sanctions work when they work. Not through military action, but through the
            slow strangulation of logistics. Ships that cannot move. Oil that cannot flow. Revenue
            that cannot arrive.
          </p>
        </section>

        {/* The Monroe Doctrine Returns */}
        <h2>The Monroe Doctrine Returns</h2>
        <section>
          <p>
            In 1823, President James Monroe declared to Congress that the Western Hemisphere would
            not be subject to further European colonization. Any attempt by European powers to
            extend their influence would be viewed as &quot;the manifestation of an unfriendly
            disposition toward the United States.&quot;
          </p>
          <p>
            This was not international law. It was not a treaty. It was an assertion of hemispheric
            influence — a claim that this half of the planet belonged to America&apos;s sphere.
          </p>
          <p>
            For two centuries, the Monroe Doctrine has been invoked, forgotten, and revived. Its
            most recent manifestation: the &quot;Trump Corollary.&quot;
          </p>
          <h3>The 1989 precedent</h3>
          <p>
            Operation Just Cause in Panama. U.S. forces invaded, captured General Manuel Noriega,
            and flew him to the United States to face drug charges. He was tried, convicted, and
            died in custody in 2017.
          </p>
          <p>
            The parallels are not subtle. Same justification (drugs). Same method (military
            capture). Same destination (federal court in New York).
          </p>

          <TimelineBand />
        </section>

        {/* Operation Absolute Resolve */}
        <section>
          <MissionTimeline
            title="Operation Absolute Resolve"
            timestamp="January 3, 2026, 11:00 PM ET"
            events={[
              {
                time: '~02:00',
                phase: 'strikes',
                headline: 'U.S. military strikes begin',
                details: [
                  'Explosions heard across Caracas',
                  '150+ aircraft: B-1B, F-22, F-35, F/A-18, EA-18G, E-2',
                  'Targets: Military installations, air defenses',
                ],
              },
              {
                time: '02:30',
                phase: 'extraction',
                headline: 'Ground operation commences',
                details: [
                  'Delta Force and law enforcement lead extraction',
                  'Maduro and Cilia Flores located',
                ],
              },
              {
                time: '02:45',
                phase: 'extraction',
                headline: 'Maduro captured',
                details: [
                  'Trump: "gave up without a fight"',
                ],
              },
              {
                time: '03:29',
                phase: 'transit',
                headline: 'Transferred to USS Iwo Jima',
                details: [
                  'Amphibious assault ship stationed offshore',
                ],
              },
              {
                time: 'EVE',
                phase: 'custody',
                headline: 'Arrives DEA facility, NYC',
                details: [
                  'Charges: Narco-terrorism, cocaine importation, weapons',
                  'Jurisdiction: Southern District of New York',
                ],
              },
            ]}
            reported={[
              { text: '~40 casualties (military + civilian) — Venezuelan officials; not independently verified' },
              { text: 'Strikes in civilian areas — Venezuelan Defense Minister claim' },
              { text: 'Full operational details remain partially classified' },
            ]}
            unknown={[
              { text: 'Who controls Venezuelan government now' },
              { text: 'PDVSA export control and decision-making' },
              { text: 'How "running the country" works operationally' },
              { text: 'Whether Venezuelan military will resist or cooperate' },
            ]}
          />

          <blockquote>
            &quot;The United States of America has successfully carried out a large-scale strike against
            Venezuela and its leader, President Nicolas Maduro, who has been, along with his wife,
            captured and flown out of the country.&quot;
            <cite>— Donald Trump, Truth Social, January 3, 2026</cite>
          </blockquote>

          <blockquote>
            &quot;We are going to run the country until such time as we can do a safe, proper and
            judicious transition.&quot;
            <cite>— Donald Trump, Press Conference, January 3, 2026</cite>
          </blockquote>
        </section>

        {/* Legality and Legitimacy */}
        <h2>Legality and Legitimacy: Two Rulebooks, One Precedent</h2>
        <section>
          <p>
            The operation faces legal challenges on two fronts: domestic U.S. law and international
            law. Neither is settled.
          </p>

          <h3>The Domestic Test</h3>
          <p>
            <strong>The Constitution</strong>: Article I gives Congress the power to declare war.
            The President commands the military but requires authorization for offensive
            operations.
          </p>
          <p>
            <strong>The War Powers Resolution (1973)</strong>: Enacted after Vietnam, this law
            requires the President to notify Congress within 48 hours of introducing forces into
            hostilities and to withdraw within 60 days without congressional authorization.
          </p>
          <p>
            <strong>The administration&apos;s argument</strong>: Secretary of State Rubio reportedly
            told Senator Mike Lee that &quot;the kinetic action we saw tonight was deployed to protect
            and defend those executing the arrest warrant.&quot; The argument: This was law
            enforcement, not war.
          </p>
          <p>
            <strong>The critics&apos; argument</strong>: Senator Tim Kaine told NPR, &quot;I think these
            strikes are clearly illegal. They have not been authorized by Congress.&quot;
          </p>

          <h3>The International Test</h3>
          <p>
            <strong>UN Charter Article 2(4)</strong>: &quot;All Members shall refrain in their
            international relations from the threat or use of force against the territorial
            integrity or political independence of any state.&quot;
          </p>
          <p>
            <strong>Exceptions</strong>: Self-defense (Article 51) or UN Security Council
            authorization. Neither applies here.
          </p>

          <blockquote>
            &quot;Independently of the situation in Venezuela, these developments constitute a dangerous
            precedent. The Secretary-General continues to emphasize the importance of full respect
            — by all — of international law, including the UN Charter.&quot;
            <cite>— Antonio Guterres, UN Secretary-General, January 3, 2026</cite>
          </blockquote>

          <LegalityMatrix />
        </section>

        {/* Stakeholders */}
        <h2>Stakeholders: Venezuela, the Region, the Great Powers, the Markets</h2>
        <section className="stakeholders-section">
          <div className="stakeholder-bloc">
            <h3 className="bloc-title bloc-title--condemn">
              <span className="bloc-indicator"></span>
              The Condemnation Bloc
            </h3>
            <div className="stakeholder-grid">
              <div className="stakeholder-card stakeholder-card--condemn">
                <div className="stakeholder-flag">🇨🇳</div>
                <div className="stakeholder-info">
                  <span className="stakeholder-name">China</span>
                  <p className="stakeholder-quote">&quot;Firmly opposes such hegemonic behavior by the U.S.&quot;</p>
                  <span className="stakeholder-context">Received ~80% of Venezuela&apos;s oil exports pre-blockade</span>
                </div>
              </div>
              <div className="stakeholder-card stakeholder-card--condemn">
                <div className="stakeholder-flag">🇷🇺</div>
                <div className="stakeholder-info">
                  <span className="stakeholder-name">Russia</span>
                  <p className="stakeholder-quote">&quot;Unfounded pretexts&quot;</p>
                  <span className="stakeholder-context">Military sales agreements &amp; strategic investments</span>
                </div>
              </div>
              <div className="stakeholder-card stakeholder-card--condemn">
                <div className="stakeholder-flag">🇨🇺</div>
                <div className="stakeholder-info">
                  <span className="stakeholder-name">Cuba</span>
                  <p className="stakeholder-quote">&quot;State terrorism&quot;</p>
                  <span className="stakeholder-context">Long-standing Maduro ally</span>
                </div>
              </div>
              <div className="stakeholder-card stakeholder-card--condemn">
                <div className="stakeholder-flag">🇨🇴</div>
                <div className="stakeholder-info">
                  <span className="stakeholder-name">Colombia</span>
                  <p className="stakeholder-quote">&quot;Assault on the sovereignty of Latin America&quot;</p>
                  <span className="stakeholder-context">Pres. Petro ordered military deployment to border</span>
                </div>
              </div>
              <div className="stakeholder-card stakeholder-card--condemn">
                <div className="stakeholder-flag">🇧🇷</div>
                <div className="stakeholder-info">
                  <span className="stakeholder-name">Brazil</span>
                  <p className="stakeholder-quote">&quot;Crossed an unacceptable line&quot;</p>
                  <span className="stakeholder-context">President Lula</span>
                </div>
              </div>
              <div className="stakeholder-card stakeholder-card--condemn">
                <div className="stakeholder-flag">🇫🇷</div>
                <div className="stakeholder-info">
                  <span className="stakeholder-name">France</span>
                  <p className="stakeholder-quote">&quot;Violates the principle of not resorting to force&quot;</p>
                  <span className="stakeholder-context">Cites international law</span>
                </div>
              </div>
            </div>
          </div>

          <div className="stakeholder-bloc">
            <h3 className="bloc-title bloc-title--cautious">
              <span className="bloc-indicator"></span>
              The Cautious Bloc
            </h3>
            <div className="stakeholder-grid">
              <div className="stakeholder-card stakeholder-card--cautious">
                <div className="stakeholder-flag">🇩🇪</div>
                <div className="stakeholder-info">
                  <span className="stakeholder-name">Germany</span>
                  <p className="stakeholder-quote">&quot;The legal assessment is complex&quot;</p>
                  <span className="stakeholder-context">Leader Merz: &quot;will take our time&quot;</span>
                </div>
              </div>
              <div className="stakeholder-card stakeholder-card--cautious">
                <div className="stakeholder-flag">🇺🇳</div>
                <div className="stakeholder-info">
                  <span className="stakeholder-name">UN Security Council</span>
                  <p className="stakeholder-quote">Emergency session convening January 5</p>
                  <span className="stakeholder-context">Requested by Colombia, Russia, China</span>
                </div>
              </div>
            </div>
          </div>

          <MarketsChart />
        </section>

        {/* Why Venezuela Is Not Iraq */}
        <h2>Why Venezuela Is Not Iraq (and what can still go wrong)</h2>
        <section>
          <p>
            The comparisons are inevitable. Both involve U.S. military action to remove a leader.
            Both are justified partly through drug/security framing. Both raise sovereignty
            questions.
          </p>
          <p>But the differences matter:</p>

          <h3>Geography</h3>
          <p>
            Iraq is 6,000 miles from the United States. Venezuela shares the Caribbean with the
            Gulf Coast. Supply lines are shorter. Evacuation is easier. But so is the reverse: any
            Venezuelan threat to U.S. interests is also closer.
          </p>

          <h3>Oil Type</h3>
          <p>
            Iraq&apos;s oil is light. Venezuela&apos;s is heavy. U.S. refineries need Venezuelan-type
            crude. This creates structural dependence regardless of who controls Caracas.
          </p>

          <h3>What Can Still Go Wrong</h3>
          <ul>
            <li>
              <strong>Military fragmentation</strong>: If Venezuelan forces splinter into factions,
              the country becomes ungovernable
            </li>
            <li>
              <strong>Proxy resistance</strong>: Cuba, Russia, or Iran could provide arms to
              resistance movements
            </li>
            <li>
              <strong>Cyber attacks</strong>: Venezuelan or allied actors could target U.S.
              infrastructure
            </li>
            <li>
              <strong>Migration surge</strong>: Economic chaos could trigger another wave of
              Venezuelan emigration
            </li>
            <li>
              <strong>Regional destabilization</strong>: Colombia and Brazil face direct spillover
              risks
            </li>
          </ul>
        </section>

        {/* A Clean Exit Checklist */}
        <h2>A Clean Exit Checklist (systems, not slogans)</h2>
        <section>
          <p>What would &quot;success&quot; require? Not rhetoric, but systems:</p>
          <ul className="checklist">
            <li>Legitimate successor government formed</li>
            <li>Military/security forces aligned or neutralized</li>
            <li>PDVSA operational control established</li>
            <li>Sanctions framework clarified</li>
            <li>International recognition secured</li>
            <li>Humanitarian corridor for migration</li>
            <li>Oil production stabilized</li>
            <li>Export infrastructure restored</li>
            <li>Regional diplomatic relations normalized</li>
            <li>Congressional authorization (retroactive or new)</li>
            <li>Legal challenges resolved</li>
          </ul>
          <p>Each item has dependencies. None happens automatically.</p>
        </section>

        {/* What to Watch Next */}
        <h2>What to Watch Next</h2>
        <section>
          <h3>This Week</h3>
          <ul className="watch-list">
            <li>
              <strong>UN Security Council (January 5)</strong>: What resolutions are proposed?
            </li>
            <li>
              <strong>Maduro arraignment (Monday)</strong>: What charges proceed?
            </li>
            <li>
              <strong>Venezuelan military posture</strong>: Resistance, cooperation, or
              fragmentation?
            </li>
            <li>
              <strong>PDVSA operations</strong>: Do exports resume? Under whose authority?
            </li>
          </ul>

          <h3>Coming Weeks</h3>
          <ul className="watch-list">
            <li>Congressional action on War Powers resolutions</li>
            <li>Regional responses from Colombia, Brazil, Caribbean states</li>
            <li>International legal proceedings</li>
            <li>Market stabilization or continued volatility</li>
          </ul>

          <h3>Ongoing</h3>
          <ul className="watch-list">
            <li>Governance implementation: What does &quot;running the country&quot; look like?</li>
            <li>Disinformation monitoring: AI-generated content will continue spreading</li>
            <li>Economic recovery (or not): Venezuela&apos;s economy collapsed before the intervention</li>
          </ul>
        </section>

        {/* FAQ */}
        <h2>FAQ</h2>
        <section className="faq-section">
          <div className="faq-item">
            <p className="faq-question">
              1. Was this legal under U.S. law? Under international law?
            </p>
            <p className="faq-answer">
              Both are contested. U.S. law: The administration claims Article II authority; critics
              say Congress should have authorized. International law: The UN Charter prohibits use
              of force except in self-defense or with Security Council authorization. Neither
              applies. UN Secretary-General Guterres called it a &quot;dangerous precedent.&quot;
            </p>
          </div>

          <div className="faq-item">
            <p className="faq-question">
              2. Is this about oil, drugs, democracy, or all three?
            </p>
            <p className="faq-answer">
              All three. The formal justification is narco-terrorism. The political justification
              is restoring democracy after disputed elections. The structural reality is that
              Venezuela has oil U.S. refineries need. These motives are not mutually exclusive.
            </p>
          </div>

          <div className="faq-item">
            <p className="faq-question">
              3. What changes if leaders can be seized abroad?
            </p>
            <p className="faq-answer">
              This is the precedent question. If sovereignty can be violated for drug charges, what
              limits exist? The UN Security Council will debate this. The answer will emerge over
              years, not days.
            </p>
          </div>

          <div className="faq-item">
            <p className="faq-question">
              4. What happens to PDVSA, ports, and exports?
            </p>
            <p className="faq-answer">
              Uncertain. PDVSA facilities reportedly operated normally after the strikes. But
              exports were already halted under the blockade. Who controls export decisions remains
              unclear.
            </p>
          </div>

          <div className="faq-item">
            <p className="faq-question">
              5. Why do refineries care about heavy crude specifically?
            </p>
            <p className="faq-answer">
              Gulf Coast refineries were built with billions in specialized equipment (cokers,
              hydrocrackers) designed for heavy sour crude. U.S. shale produces light sweet crude —
              a different product. They are not interchangeable.
            </p>
          </div>

          <div className="faq-item">
            <p className="faq-question">6. What would a &quot;clean exit&quot; require?</p>
            <p className="faq-answer">
              At minimum: legitimate successor government, military cooperation, PDVSA operational
              control, clarified sanctions, international recognition, and resolution of legal
              challenges. Each has dependencies.
            </p>
          </div>

          <div className="faq-item">
            <p className="faq-question">7. What are the risks of escalation?</p>
            <p className="faq-answer">
              Military fragmentation, proxy resistance from Cuba/Russia/China, cyber attacks on
              U.S. infrastructure, migration surge, regional diplomatic breakdown, and extended
              occupation costs.
            </p>
          </div>

          <div className="faq-item">
            <p className="faq-question">
              8. How should I evaluate social media videos and images right now?
            </p>
            <p className="faq-answer">
              With extreme skepticism. AI-generated images of Maduro&apos;s arrest have been confirmed
              circulating. Old footage from 2024 has been recycled as current. Look for wire
              service (Reuters, AP) sourcing. When in doubt, wait.
            </p>
          </div>
        </section>

        {/* Glossary */}
        <section className="glossary">
          <div className="glossary-header">
            <span className="glossary-eyebrow">Reference</span>
            <h2 className="glossary-title">Glossary</h2>
          </div>
          
          <div className="glossary-columns">
            <div className="glossary-category">
              <h3 className="glossary-category-title">Oil &amp; Energy</h3>
              <dl className="glossary-list">
                <div className="glossary-entry">
                  <dt>API gravity</dt>
                  <dd>Measure of oil density; higher numbers indicate lighter crude that flows more easily</dd>
                </div>
                <div className="glossary-entry">
                  <dt>Heavy crude</dt>
                  <dd>Oil with low API gravity (&lt;22°), thick consistency, requires specialized refining equipment</dd>
                </div>
                <div className="glossary-entry">
                  <dt>Sour crude</dt>
                  <dd>Oil with high sulfur content (&gt;0.5%), requires desulfurization before processing</dd>
                </div>
                <div className="glossary-entry">
                  <dt>Coker</dt>
                  <dd>Refinery unit that thermally cracks heavy residual oil into lighter, more valuable products</dd>
                </div>
                <div className="glossary-entry">
                  <dt>PDVSA</dt>
                  <dd>Petróleos de Venezuela, S.A. — Venezuela&apos;s state-owned oil and natural gas company</dd>
                </div>
                <div className="glossary-entry">
                  <dt>Orinoco Belt</dt>
                  <dd>600km region in eastern Venezuela containing the world&apos;s largest heavy oil deposits</dd>
                </div>
              </dl>
            </div>
            
            <div className="glossary-category">
              <h3 className="glossary-category-title">Legal &amp; Political</h3>
              <dl className="glossary-list">
                <div className="glossary-entry">
                  <dt>Monroe Doctrine</dt>
                  <dd>1823 U.S. foreign policy opposing European colonialism in the Western Hemisphere</dd>
                </div>
                <div className="glossary-entry">
                  <dt>War Powers Resolution</dt>
                  <dd>1973 federal law requiring presidential notification to Congress within 48 hours of military action</dd>
                </div>
                <div className="glossary-entry">
                  <dt>Ker-Frisbie doctrine</dt>
                  <dd>Legal principle allowing prosecution regardless of how a defendant was brought before the court</dd>
                </div>
                <div className="glossary-entry">
                  <dt>Narco-terrorism</dt>
                  <dd>Terrorism funded through drug trafficking; carries enhanced federal penalties</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Related Essays */}
        <section className="related-essays">
          <h2>Related Visual Essays</h2>
          <div className="related-essays-grid">
            <Link href="/essays/history/cambodia-bombing" className="related-essay-card">
              <span className="related-essay-category">History</span>
              <span className="related-essay-title">The Cambodia Bombing</span>
              <span className="related-essay-description">U.S. foreign intervention and its consequences</span>
            </Link>
            <Link href="/essays/history/palestine-israel" className="related-essay-card">
              <span className="related-essay-category">Geopolitics</span>
              <span className="related-essay-title">Palestine-Israel</span>
              <span className="related-essay-description">Territorial conflict and international law</span>
            </Link>
            <Link href="/essays/how-money-is-created" className="related-essay-card">
              <span className="related-essay-category">Systems</span>
              <span className="related-essay-title">How Money Is Created</span>
              <span className="related-essay-description">Understanding economic power structures</span>
            </Link>
          </div>
        </section>

        {/* Sources & Further Reading */}
        <section className="sources">
          <div className="sources-header">
            <span className="sources-eyebrow">Bibliography</span>
            <h2 className="sources-title">Sources &amp; Further Reading</h2>
          </div>

          <div className="sources-content">
            {/* Works Cited */}
            <div className="sources-block">
              <h3 className="sources-block-title">
                Works Cited
              </h3>
              
              <div className="sources-categories">
                <div className="sources-category">
                  <h4 className="sources-category-label">Operation Absolute Resolve</h4>
                  <ul className="sources-list">
                    <li>
                      <a href="https://www.reuters.com/world/americas/trump-says-us-has-captured-venezuela-president-maduro-2026-01-03/" target="_blank" rel="noopener noreferrer">
                        <span className="sources-publisher">Reuters</span>
                        <span className="sources-title-text">Trump says Venezuela&apos;s Maduro captured after strikes</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.reuters.com/world/americas/world-reacts-us-strikes-venezuela-2026-01-03/" target="_blank" rel="noopener noreferrer">
                        <span className="sources-publisher">Reuters</span>
                        <span className="sources-title-text">World reacts to US strikes on Venezuela</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.pbs.org/newshour/world/how-u-s-forces-captured-venezuelan-leader-nicolas-maduro-in-caracas" target="_blank" rel="noopener noreferrer">
                        <span className="sources-publisher">PBS NewsHour</span>
                        <span className="sources-title-text">How U.S. forces captured Venezuelan leader</span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="sources-category">
                  <h4 className="sources-category-label">Legal Analysis</h4>
                  <ul className="sources-list">
                    <li>
                      <a href="https://news.un.org/en/story/2026/01/1166698" target="_blank" rel="noopener noreferrer">
                        <span className="sources-publisher">UN News</span>
                        <span className="sources-title-text">Guterres on &quot;dangerous precedent&quot;</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.justsecurity.org/127962/maduro-capture-operation-and-presidents-duty-to-faithfully-execute-un-charter/" target="_blank" rel="noopener noreferrer">
                        <span className="sources-publisher">Just Security</span>
                        <span className="sources-title-text">Maduro Capture and UN Charter</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.congress.gov/bill/119th-congress/senate-joint-resolution/90/text" target="_blank" rel="noopener noreferrer">
                        <span className="sources-publisher">Congress.gov</span>
                        <span className="sources-title-text">S.J.Res.90 War Powers Resolution</span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="sources-category">
                  <h4 className="sources-category-label">Energy &amp; Oil</h4>
                  <ul className="sources-list">
                    <li>
                      <a href="https://www.eia.gov/international/analysis/country/VEN" target="_blank" rel="noopener noreferrer">
                        <span className="sources-publisher">U.S. EIA</span>
                        <span className="sources-title-text">Venezuela Country Analysis</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://pubs.usgs.gov/publication/fs20093028" target="_blank" rel="noopener noreferrer">
                        <span className="sources-publisher">USGS</span>
                        <span className="sources-title-text">Orinoco Oil Belt Resources Estimate</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.spglobal.com/energy/en/news-research/latest-news/refined-products/052925-usgc-likely-to-source-more-heavy-crude-from-canada-as-venezuela-mexico-supplies-decline" target="_blank" rel="noopener noreferrer">
                        <span className="sources-publisher">S&amp;P Global</span>
                        <span className="sources-title-text">Gulf Coast heavy crude sourcing</span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="sources-category">
                  <h4 className="sources-category-label">Disinformation</h4>
                  <ul className="sources-list">
                    <li>
                      <a href="https://spotlight.ebu.ch/p/maduro-capture-fake-image-fact-check" target="_blank" rel="noopener noreferrer">
                        <span className="sources-publisher">EBU / WIRED</span>
                        <span className="sources-title-text">AI-generated capture images fact-check</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Image Credits */}
            <div className="sources-block sources-block--secondary">
              <h3 className="sources-block-title sources-block-title--small">
                Image Credits
              </h3>
              
              <div className="sources-images-grid">
                <div className="sources-image-credit">
                  <span className="sources-image-title">Orinoco Oil Belt geological map</span>
                  <span className="sources-image-meta">U.S. Geological Survey, Public Domain</span>
                  <a href="https://commons.wikimedia.org/wiki/File:Orinoco_Oil_Belt.png" target="_blank" rel="noopener noreferrer" className="sources-image-link">
                    Wikimedia Commons →
                  </a>
                </div>
              </div>
              <p className="sources-image-note">All diagrams and charts are original creations for this essay.</p>
            </div>
          </div>

          <div className="sources-footer">
            <p>All sources verified as of January 3, 2026. Full citation list available in research package.</p>
          </div>
        </section>
      </main>

    </article>
  );
}
