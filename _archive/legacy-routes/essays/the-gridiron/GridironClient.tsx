"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import "./gridiron.css";

// ============================================================================
// DESIGN RESEARCH REPORT: THE GRIDIRON
// ============================================================================
// Visual Archaeology: Leather footballs, grass fields, chalk lines, stadium lights
// Color Palette: Pigskin brown, grass green, chalk white, helmet gold, stadium night
// Typography: Bold slab-serif for power, clean sans for readability
// Animation Philosophy: Athletic, dynamic — forward momentum with strategic pauses
// Unique Interactions: Spiral scroll, play diagram animator, yard line progress
// ============================================================================

// ==================== SVG ILLUSTRATIONS ====================

const FootballSpiral: React.FC<{ progress: number }> = ({ progress }) => (
  <svg
    viewBox="0 0 120 60"
    className="football-spiral"
    style={{ transform: `rotate(${progress * 720}deg)` }}
    role="img"
    aria-labelledby="football-spiral-title football-spiral-desc"
  >
    <title id="football-spiral-title">American Football</title>
    <desc id="football-spiral-desc">A leather football with white laces spiraling through the air as you scroll</desc>
    <defs>
      <linearGradient id="football-spiral-leather" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--pigskin-light, #A0522D)" />
        <stop offset="50%" stopColor="var(--pigskin-brown, #8B4513)" />
        <stop offset="100%" stopColor="var(--pigskin-dark, #654321)" />
      </linearGradient>
      <linearGradient id="football-spiral-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
    {/* Football body */}
    <ellipse cx="60" cy="30" rx="45" ry="22" fill="url(#football-spiral-leather)" />
    {/* Highlight */}
    <ellipse cx="60" cy="24" rx="35" ry="12" fill="url(#football-spiral-highlight)" />
    {/* Laces */}
    <g stroke="var(--chalk-white, #FFFAF0)" strokeWidth="2" fill="none">
      <line x1="45" y1="30" x2="75" y2="30" />
      <line x1="48" y1="24" x2="48" y2="36" />
      <line x1="56" y1="22" x2="56" y2="38" />
      <line x1="64" y1="22" x2="64" y2="38" />
      <line x1="72" y1="24" x2="72" y2="36" />
    </g>
  </svg>
);

const PlayDiagram: React.FC<{ animate: boolean }> = ({ animate }) => (
  <svg
    viewBox="0 0 400 300"
    className={`play-diagram ${animate ? "animate" : ""}`}
    role="img"
    aria-labelledby="play-diagram-title play-diagram-desc"
  >
    <title id="play-diagram-title">Football Play Diagram</title>
    <desc id="play-diagram-desc">An offensive formation showing the line of scrimmage, quarterback, running back, wide receivers running routes, and defensive players marked with X symbols</desc>
    <defs>
      <marker id="play-arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="var(--helmet-gold, #CFB53B)" />
      </marker>
    </defs>
    
    {/* Line of scrimmage */}
    <line x1="0" y1="150" x2="400" y2="150" stroke="var(--chalk-white, #FFFAF0)" strokeWidth="3" strokeDasharray="10,5" />
    
    {/* Offensive line (O's) */}
    {[120, 160, 200, 240, 280].map((x, i) => (
      <circle
        key={`ol-${i}`}
        cx={x}
        cy={170}
        r="15"
        fill="none"
        stroke="var(--grass-green, #228B22)"
        strokeWidth="3"
        className="o-lineman"
        style={{ animationDelay: `${i * 0.1}s` }}
      />
    ))}
    
    {/* Quarterback */}
    <circle cx="200" cy="210" r="15" fill="none" stroke="var(--helmet-gold, #CFB53B)" strokeWidth="3" className="qb" />
    <text x="200" y="215" textAnchor="middle" fill="var(--helmet-gold, #CFB53B)" fontSize="12" fontWeight="bold" fontFamily="var(--font-display), sans-serif">QB</text>
    
    {/* Running back */}
    <circle cx="200" cy="260" r="15" fill="none" stroke="var(--grass-green, #228B22)" strokeWidth="3" className="rb" />
    <text x="200" y="265" textAnchor="middle" fill="var(--grass-green, #228B22)" fontSize="12" fontWeight="bold" fontFamily="var(--font-display), sans-serif">RB</text>
    
    {/* Wide receivers */}
    <circle cx="50" cy="170" r="12" fill="none" stroke="var(--grass-green, #228B22)" strokeWidth="3" className="wr-left" />
    <circle cx="350" cy="170" r="12" fill="none" stroke="var(--grass-green, #228B22)" strokeWidth="3" className="wr-right" />
    
    {/* Routes */}
    <path
      d="M50 170 L50 100 L150 50"
      fill="none"
      stroke="var(--helmet-gold, #CFB53B)"
      strokeWidth="2"
      markerEnd="url(#play-arrowhead)"
      className="route route-left"
    />
    <path
      d="M350 170 L350 120 L280 80"
      fill="none"
      stroke="var(--helmet-gold, #CFB53B)"
      strokeWidth="2"
      markerEnd="url(#play-arrowhead)"
      className="route route-right"
    />
    
    {/* Defensive X's */}
    {[100, 180, 220, 300].map((x, i) => (
      <g key={`def-${i}`} className="defender" style={{ animationDelay: `${i * 0.15 + 0.5}s` }}>
        <line x1={x - 10} y1="110" x2={x + 10} y2="130" stroke="var(--pigskin-brown, #8B4513)" strokeWidth="3" />
        <line x1={x + 10} y1="110" x2={x - 10} y2="130" stroke="var(--pigskin-brown, #8B4513)" strokeWidth="3" />
      </g>
    ))}
  </svg>
);

const YardLineProgress: React.FC<{ progress: number }> = ({ progress }) => {
  const yardLine = Math.round(progress * 100);
  const displayYard = yardLine <= 50 ? yardLine : 100 - yardLine;
  
  return (
    <div className="yard-line-progress">
      <div className="yard-marker">
        <span className="yard-number">{displayYard}</span>
        <span className="yard-label">YARD LINE</span>
      </div>
      <div className="field-progress">
        <div className="field-fill" style={{ width: `${progress * 100}%` }} />
        <div className="goal-post left">⊓</div>
        <div className="fifty-marker">50</div>
        <div className="goal-post right">⊓</div>
      </div>
    </div>
  );
};

const StadiumEvolution: React.FC<{ era: "1900" | "1960" | "modern" }> = ({ era }) => {
  const eraDescriptions = {
    "1900": "Early 1900s wooden bleacher stadium with simple grass field",
    "1960": "1960s concrete bowl stadium with lighting towers and yard lines",
    "modern": "Modern domed stadium with jumbotron, LED lighting, and end zones"
  };
  
  return (
    <svg viewBox="0 0 400 200" className={`stadium stadium-${era}`} role="img" aria-labelledby={`stadium-${era}-title stadium-${era}-desc`}>
      <title id={`stadium-${era}-title`}>Football Stadium - {era === "modern" ? "Modern Era" : `${era}s`}</title>
      <desc id={`stadium-${era}-desc`}>{eraDescriptions[era]}</desc>
      {era === "1900" && (
        <>
          {/* Wooden bleachers */}
          <rect x="20" y="100" width="360" height="80" fill="#8B7355" />
          <g stroke="var(--pigskin-dark, #654321)" strokeWidth="2">
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={i} x1="20" y1={100 + i * 20} x2="380" y2={100 + i * 20} />
            ))}
          </g>
          {/* Simple grass field */}
          <rect x="50" y="60" width="300" height="35" fill="var(--grass-green, #228B22)" />
          <text x="200" y="82" textAnchor="middle" fill="var(--chalk-white, #FFFAF0)" fontSize="10" fontFamily="var(--font-display), sans-serif">FIELD</text>
        </>
      )}
      {era === "1960" && (
        <>
          {/* Concrete bowl */}
          <path d="M20 180 Q200 80 380 180" fill="#A9A9A9" stroke="#808080" strokeWidth="2" />
          {/* Field */}
          <ellipse cx="200" cy="130" rx="150" ry="40" fill="var(--grass-green, #228B22)" />
          {/* Yard lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1={80 + i * 60} y1="100" x2={80 + i * 60} y2="160" stroke="var(--chalk-white, #FFFAF0)" strokeWidth="1" />
          ))}
          {/* Lights */}
          {[100, 200, 300].map((x, i) => (
            <circle key={i} cx={x} cy="40" r="8" fill="var(--helmet-gold, #FFD700)" className="stadium-light" />
          ))}
        </>
      )}
      {era === "modern" && (
        <>
          {/* Domed roof */}
          <path d="M10 180 Q200 20 390 180" fill="none" stroke="#4A4A4A" strokeWidth="4" />
          <path d="M10 180 Q200 40 390 180" fill="var(--stadium-night, #2A2A3A)" opacity="0.9" />
          {/* Modern field */}
          <rect x="40" y="120" width="320" height="50" fill="var(--grass-green, #228B22)" rx="5" />
          {/* End zones */}
          <rect x="40" y="120" width="40" height="50" fill="var(--pigskin-brown, #8B4513)" rx="5" />
          <rect x="320" y="120" width="40" height="50" fill="var(--pigskin-brown, #8B4513)" rx="5" />
          {/* Jumbotron */}
          <rect x="160" y="50" width="80" height="40" fill="var(--stadium-night, #1A1A2E)" stroke="var(--helmet-gold, #CFB53B)" strokeWidth="2" />
          <text x="200" y="75" textAnchor="middle" fill="var(--helmet-gold, #CFB53B)" fontSize="10" fontFamily="var(--font-display), sans-serif">HD</text>
          {/* LED lights */}
          {[80, 140, 200, 260, 320].map((x, i) => (
            <rect key={i} x={x - 5} y="95" width="10" height="4" fill="var(--chalk-white, #FFFAF0)" className="led-light" />
          ))}
        </>
      )}
    </svg>
  );
};

const HelmetEvolution: React.FC = () => (
  <svg viewBox="0 0 500 150" className="helmet-evolution" role="img" aria-labelledby="helmet-evo-title helmet-evo-desc">
    <title id="helmet-evo-title">Football Helmet Evolution</title>
    <desc id="helmet-evo-desc">Four stages of football helmet evolution: 1900s with no protection (bare head), 1920s leather cap, 1950s plastic shell with single face bar, and modern full facemask helmet</desc>
    
    {/* 1900s - No helmet */}
    <g className="helmet-era era-1900">
      <circle cx="80" cy="75" r="35" fill="#DEB887" stroke="#8B7355" strokeWidth="2" />
      {/* Face features to show it's a head, not a helmet */}
      <circle cx="70" cy="70" r="4" fill="var(--pigskin-dark, #654321)" /> {/* Eye */}
      <circle cx="90" cy="70" r="4" fill="var(--pigskin-dark, #654321)" /> {/* Eye */}
      <ellipse cx="80" cy="85" rx="8" ry="4" fill="var(--pigskin-brown, #8B4513)" /> {/* Mouth */}
      <text x="80" y="130" textAnchor="middle" fill="var(--chalk-white, #FFFAF0)" fontSize="10" fontFamily="var(--font-display), sans-serif">1900s</text>
      <text x="80" y="142" textAnchor="middle" fill="#A0A0A0" fontSize="8" fontFamily="var(--font-body), sans-serif">No Protection</text>
    </g>
    
    {/* 1920s - Leather cap */}
    <g className="helmet-era era-1920">
      <ellipse cx="180" cy="70" rx="38" ry="35" fill="var(--pigskin-brown, #8B4513)" />
      <path d="M145 55 Q180 30 215 55" fill="var(--pigskin-dark, #654321)" />
      {/* Stitching detail */}
      <line x1="180" y1="35" x2="180" y2="70" stroke="var(--pigskin-dark, #654321)" strokeWidth="1" strokeDasharray="3,2" />
      <circle cx="165" cy="80" r="8" fill="var(--stadium-night, #1A1A2E)" /> {/* Ear hole */}
      <text x="180" y="130" textAnchor="middle" fill="var(--chalk-white, #FFFAF0)" fontSize="10" fontFamily="var(--font-display), sans-serif">1920s</text>
      <text x="180" y="142" textAnchor="middle" fill="#A0A0A0" fontSize="8" fontFamily="var(--font-body), sans-serif">Leather Cap</text>
    </g>
    
    {/* 1950s - Plastic with single bar */}
    <g className="helmet-era era-1950">
      <ellipse cx="280" cy="70" rx="40" ry="38" fill="var(--helmet-gold, #CFB53B)" />
      <path d="M245 50 Q280 20 315 50" fill="var(--helmet-gold-dark, #B8860B)" />
      <line x1="250" y1="85" x2="310" y2="85" stroke="#4A4A4A" strokeWidth="4" strokeLinecap="round" /> {/* Face bar */}
      <circle cx="260" cy="75" r="6" fill="var(--stadium-night, #1A1A2E)" /> {/* Ear hole */}
      <text x="280" y="130" textAnchor="middle" fill="var(--chalk-white, #FFFAF0)" fontSize="10" fontFamily="var(--font-display), sans-serif">1950s</text>
      <text x="280" y="142" textAnchor="middle" fill="#A0A0A0" fontSize="8" fontFamily="var(--font-body), sans-serif">Plastic Shell</text>
    </g>
    
    {/* Modern - Full facemask */}
    <g className="helmet-era era-modern">
      <ellipse cx="400" cy="68" rx="42" ry="40" fill="var(--stadium-night, #1A1A2E)" />
      <path d="M362 48 Q400 15 438 48" fill="var(--stadium-darker, #0D0D15)" />
      {/* Facemask grid */}
      <g stroke="#5A5A6A" strokeWidth="3" strokeLinecap="round">
        <line x1="365" y1="75" x2="435" y2="75" />
        <line x1="365" y1="90" x2="435" y2="90" />
        <line x1="380" y1="60" x2="380" y2="100" />
        <line x1="420" y1="60" x2="420" y2="100" />
      </g>
      {/* Team logo placeholder */}
      <circle cx="400" cy="55" r="12" fill="var(--helmet-gold, #CFB53B)" />
      {/* Air vents */}
      <rect x="358" y="50" width="3" height="8" fill="#3A3A4A" rx="1" />
      <rect x="439" y="50" width="3" height="8" fill="#3A3A4A" rx="1" />
      <text x="400" y="130" textAnchor="middle" fill="var(--chalk-white, #FFFAF0)" fontSize="10" fontFamily="var(--font-display), sans-serif">Modern</text>
      <text x="400" y="142" textAnchor="middle" fill="#A0A0A0" fontSize="8" fontFamily="var(--font-body), sans-serif">Full Facemask</text>
    </g>
    
    {/* Evolution arrows */}
    <g fill="var(--helmet-gold, #CFB53B)">
      <polygon points="120,75 135,70 135,80" />
      <polygon points="225,75 240,70 240,80" />
      <polygon points="335,75 350,70 350,80" />
    </g>
  </svg>
);

// Pre-computed confetti positions to avoid Math.random() in render
const CONFETTI_POSITIONS = [
  { x: 15, y: -30, delay: 0.1, duration: 2.5 },
  { x: 45, y: -60, delay: 0.4, duration: 3.2 },
  { x: 85, y: -45, delay: 0.2, duration: 2.8 },
  { x: 120, y: -80, delay: 0.7, duration: 3.5 },
  { x: 155, y: -25, delay: 0.3, duration: 2.2 },
  { x: 180, y: -55, delay: 0.9, duration: 3.0 },
  { x: 30, y: -90, delay: 0.5, duration: 2.7 },
  { x: 70, y: -70, delay: 1.1, duration: 3.3 },
  { x: 110, y: -40, delay: 0.6, duration: 2.4 },
  { x: 145, y: -95, delay: 0.8, duration: 3.8 },
  { x: 10, y: -50, delay: 1.3, duration: 2.6 },
  { x: 55, y: -85, delay: 1.0, duration: 3.1 },
  { x: 95, y: -35, delay: 1.5, duration: 2.9 },
  { x: 130, y: -65, delay: 1.2, duration: 3.4 },
  { x: 165, y: -100, delay: 1.7, duration: 2.3 },
  { x: 190, y: -75, delay: 1.4, duration: 3.6 },
  { x: 25, y: -55, delay: 1.8, duration: 2.1 },
  { x: 60, y: -20, delay: 1.6, duration: 3.7 },
  { x: 100, y: -88, delay: 0.0, duration: 2.5 },
  { x: 140, y: -42, delay: 1.9, duration: 3.0 },
];
const CONFETTI_COLORS = ["#FFD700", "#228B22", "#8B4513", "#FFFAF0"];

const LombardiTrophy: React.FC<{ celebrate: boolean }> = ({ celebrate }) => (
  <svg viewBox="0 0 200 300" className={`lombardi-trophy ${celebrate ? "celebrating" : ""}`} role="img" aria-labelledby="trophy-title trophy-desc">
    <title id="trophy-title">Vince Lombardi Trophy</title>
    <desc id="trophy-desc">The iconic sterling silver Super Bowl trophy featuring a regulation-size football in kicking position atop a three-sided base, awarded annually to the NFL champion</desc>
    <defs>
      <linearGradient id="lombardi-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="var(--helmet-gold, #CFB53B)" />
        <stop offset="100%" stopColor="var(--helmet-gold-dark, #B8860B)" />
      </linearGradient>
      <linearGradient id="lombardi-shine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
    
    {/* Base */}
    <rect x="60" y="260" width="80" height="30" fill="url(#lombardi-gold)" rx="5" />
    <rect x="70" y="255" width="60" height="10" fill="url(#lombardi-gold)" />
    
    {/* Stem */}
    <rect x="90" y="180" width="20" height="80" fill="url(#lombardi-gold)" />
    
    {/* Football */}
    <ellipse cx="100" cy="100" rx="60" ry="80" fill="url(#lombardi-gold)" />
    <ellipse cx="100" cy="100" rx="55" ry="75" fill="none" stroke="var(--helmet-gold-dark, #B8860B)" strokeWidth="2" />
    
    {/* Laces on trophy */}
    <g stroke="var(--chalk-white, #FFFAF0)" strokeWidth="2">
      <line x1="80" y1="100" x2="120" y2="100" />
      <line x1="85" y1="85" x2="85" y2="115" />
      <line x1="100" y1="80" x2="100" y2="120" />
      <line x1="115" y1="85" x2="115" y2="115" />
    </g>
    
    {/* Shine effect */}
    <ellipse cx="75" cy="80" rx="15" ry="30" fill="url(#lombardi-shine)" opacity="0.5" />
    
    {/* Confetti (when celebrating) - deterministic positions */}
    {celebrate && (
      <g className="confetti" aria-hidden="true">
        {CONFETTI_POSITIONS.map((pos, i) => (
          <rect
            key={i}
            x={pos.x}
            y={pos.y}
            width="8"
            height="8"
            fill={CONFETTI_COLORS[i % CONFETTI_COLORS.length]}
            className="confetti-piece"
            style={{
              animationDelay: `${pos.delay}s`,
              animationDuration: `${pos.duration}s`,
            }}
          />
        ))}
      </g>
    )}
  </svg>
);

// ==================== SECTION COMPONENTS ====================

const Section: React.FC<{
  id: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id, className = "", children }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`gridiron-section ${className} ${isVisible ? "visible" : ""}`}
    >
      {children}
    </section>
  );
};

// ==================== MAIN COMPONENT ====================

const GridironClient: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTrophyCelebration, setShowTrophyCelebration] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(1, Math.max(0, window.scrollY / scrollHeight));
    setScrollProgress(progress);
    
    // Trigger trophy celebration near the end
    if (progress > 0.85 && !showTrophyCelebration) {
      setShowTrophyCelebration(true);
    }
  }, [showTrophyCelebration]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="gridiron-story" ref={containerRef}>
      {/* Progress indicator */}
      <div className="scroll-progress-bar">
        <div className="scroll-progress-fill" style={{ width: `${scrollProgress * 100}%` }} />
      </div>

      {/* Floating football spiral */}
      <div className="floating-football">
        <FootballSpiral progress={scrollProgress} />
      </div>

      {/* Yard line progress */}
      <YardLineProgress progress={scrollProgress} />

      {/* ==================== SECTION 1: THE KICKOFF (HERO) ==================== */}
      <Section id="hero" className="hero-section full-bleed">
        <div className="hero-backdrop">
          <div className="stadium-lights">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="light-beam" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
          <div className="field-texture" />
        </div>
        
        <div className="hero-content">
          <div className="hero-stats">
            <span className="stat-number">113M</span>
            <span className="stat-label">viewers watched one game</span>
          </div>
          
          <h1 className="hero-title">
            <span className="title-line">THE</span>
            <span className="title-line accent">GRIDIRON</span>
          </h1>
          
          <p className="hero-subtitle">
            How a Brutal College Game Became America&apos;s Obsession
          </p>
          
          <div className="hero-question">
            How did a chaotic rugby variant evolve into the most watched sport in America?
          </div>
          
          <div className="scroll-indicator">
            <span>Scroll to explore</span>
            <div className="scroll-arrow">↓</div>
          </div>
        </div>
      </Section>

      {/* ==================== SECTION 2: BEFORE THE SNAP ==================== */}
      <Section id="origins" className="split-screen">
        <div className="split-image">
          <div className="vintage-frame">
            <div className="mob-football-illustration">
              <svg viewBox="0 0 400 300" role="img" aria-labelledby="mob-title mob-desc">
                <title id="mob-title">Mob Football, 1860s</title>
                <desc id="mob-desc">A chaotic scene depicting early American football with fifteen players in a disorganized scrum on a muddy field, representing the unstructured nature of the sport before standardized rules</desc>
                {/* Grass field */}
                <ellipse cx="200" cy="200" rx="150" ry="80" fill="var(--grass-green, #228B22)" opacity="0.3" />
                {/* Pre-computed player positions for deterministic rendering */}
                {[
                  { cx: 145, cy: 175, r: 18 }, { cx: 200, cy: 190, r: 22 }, { cx: 255, cy: 180, r: 19 },
                  { cx: 170, cy: 210, r: 20 }, { cx: 230, cy: 205, r: 21 }, { cx: 120, cy: 195, r: 17 },
                  { cx: 280, cy: 200, r: 18 }, { cx: 185, cy: 165, r: 23 }, { cx: 215, cy: 170, r: 16 },
                  { cx: 160, cy: 230, r: 19 }, { cx: 240, cy: 225, r: 20 }, { cx: 195, cy: 240, r: 22 },
                  { cx: 130, cy: 220, r: 17 }, { cx: 270, cy: 215, r: 18 }, { cx: 205, cy: 155, r: 21 },
                ].map((player, i) => (
                  <circle
                    key={i}
                    cx={player.cx}
                    cy={player.cy}
                    r={player.r}
                    fill={i % 2 === 0 ? "var(--pigskin-brown, #8B4513)" : "var(--pigskin-dark, #654321)"}
                    className="mob-player"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
                {/* Title banner */}
                <rect x="100" y="30" width="200" height="35" fill="var(--stadium-night, #1A1A2E)" opacity="0.8" rx="4" />
                <text x="200" y="55" textAnchor="middle" fill="var(--chalk-white, #FFFAF0)" fontSize="14" fontWeight="bold" fontFamily="var(--font-display), sans-serif">
                  MOB FOOTBALL, 1860s
                </text>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="split-content">
          <span className="section-badge">ORIGINS</span>
          <h2>Before the Snap</h2>
          <p className="lead">
            Before there were rules, there was chaos. Before there was strategy, there was survival.
          </p>
          <p>
            In the 1860s, American colleges adopted a violent mix of rugby and soccer that had no fixed rules. 
            Each school played by their own code. Games were barely organized brawls—hundreds of players 
            chasing an inflated pig bladder across muddy fields.
          </p>
          <p>
            Harvard called their version &quot;the Boston Game.&quot; Yale preferred rugby-style carrying. 
            Princeton favored kicking. When these schools met, they first had to negotiate 
            <em> which rules to use</em>.
          </p>
          <div className="highlight-box">
            <span className="highlight-number">200+</span>
            <span className="highlight-text">players could be on the field at once</span>
          </div>
        </div>
      </Section>

      {/* ==================== SECTION 3: THE FIRST DOWN (TIMELINE) ==================== */}
      <Section id="first-game" className="timeline-section">
        <div className="timeline-header">
          <span className="section-badge">THE FIRST DOWN</span>
          <h2>A Game Is Born</h2>
        </div>
        
        <div className="timeline">
          <div className="timeline-line" />
          
          <div className="timeline-event">
            <div className="event-year">1869</div>
            <div className="event-content">
              <h3>The First Game</h3>
              <p>
                Rutgers defeats Princeton 6-4 in New Brunswick, New Jersey. 
                The game uses soccer-style rules—no carrying allowed. 
                Each team fields 25 players.
              </p>
              <div className="event-detail">
                <strong>Final Score:</strong> Rutgers 6, Princeton 4
              </div>
            </div>
          </div>
          
          <div className="timeline-event">
            <div className="event-year">1874</div>
            <div className="event-content">
              <h3>Harvard Meets McGill</h3>
              <p>
                Harvard plays McGill University of Canada in two games—one with 
                American rules, one with rugby rules. Harvard players love the rugby 
                version. The carrying game begins its American journey.
              </p>
            </div>
          </div>
          
          <div className="timeline-event">
            <div className="event-year">1876</div>
            <div className="event-content">
              <h3>The Intercollegiate Football Association</h3>
              <p>
                Harvard, Yale, Princeton, and Columbia form the IFA and adopt 
                rugby-style rules as the standard. The field is set at 140 yards 
                by 70 yards. 15 players per side.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ==================== SECTION 4: WALTER CAMP (STICKY SCROLL) ==================== */}
      <Section id="walter-camp" className="sticky-scroll-section">
        <div className="sticky-element">
          <div className="camp-portrait">
            {/* Decorative frame with actual public domain portrait */}
            <div className="portrait-frame">
              <div className="frame-corner top-left" />
              <div className="frame-corner top-right" />
              <div className="frame-corner bottom-left" />
              <div className="frame-corner bottom-right" />
              <img 
                src="/images/walter-camp-portrait.jpg"
                alt="Walter Camp, portrait by George M. Reevs, 1909. The Father of American Football, shown in formal Victorian attire with his characteristic balding head and small mustache."
                className="camp-photo"
                loading="lazy"
              />
              <div className="name-plate">
                <span className="camp-name">WALTER CAMP</span>
                <span className="camp-years">1859 – 1925</span>
              </div>
            </div>
            {/* Attribution */}
            <p className="portrait-credit">
              Portrait by George M. Reevs, 1909 • Public Domain
            </p>
          </div>
          <div className="camp-title">
            <span className="the-title">THE FATHER OF</span>
            <span className="football-title">AMERICAN FOOTBALL</span>
          </div>
        </div>
        
        <div className="scroll-content">
          <div className="scroll-panel">
            <h3>The Visionary</h3>
            <p>
              Walter Camp arrived at Yale in 1876 as a student and never really left. 
              As a player, coach, and rules committee member, he would spend the next 
              four decades transforming a chaotic rugby variant into a uniquely American game.
            </p>
          </div>
          
          <div className="scroll-panel">
            <h3>1880: The Line of Scrimmage</h3>
            <p>
              Camp&apos;s first revolutionary rule: instead of a rugby scrum, the team with 
              the ball would have <em>undisputed possession</em>. The center would snap the 
              ball to the quarterback. The line of scrimmage was born.
            </p>
            <PlayDiagram animate={true} />
          </div>
          
          <div className="scroll-panel">
            <h3>1882: The Downs System</h3>
            <p>
              To prevent teams from simply holding the ball indefinitely, Camp created 
              the downs system: a team must advance 5 yards in 3 attempts or surrender 
              possession. The strategic chess match of football began.
            </p>
            <div className="rule-change-box">
              <div className="rule-old">Rugby: Continuous possession</div>
              <div className="rule-arrow">→</div>
              <div className="rule-new">Football: 3 downs, 5 yards</div>
            </div>
          </div>
          
          <div className="scroll-panel">
            <h3>1882: Scoring Standardized</h3>
            <p>
              Camp established point values: 5 points for a touchdown (later 6), 
              1 point for the conversion kick, 2 points for a safety, and 5 points 
              for a field goal (later 3). The modern scoring system took shape.
            </p>
          </div>
          
          <div className="scroll-panel">
            <h3>1888: Tackling Below the Waist</h3>
            <p>
              Camp legalized tackling below the waist, making defense more effective. 
              The physical chess match intensified—but so did the injuries.
            </p>
          </div>
        </div>
      </Section>

      {/* ==================== SECTION 5: THE DEATH TOLL (QUOTE MONUMENT) ==================== */}
      <Section id="death-toll" className="quote-monument-section">
        <div className="monument-backdrop death-backdrop">
          <div className="death-count">
            <span className="death-number">19</span>
            <span className="death-label">PLAYERS KILLED</span>
            <span className="death-year">1905 SEASON</span>
          </div>
        </div>
        
        <blockquote className="monument-quote">
          <p>
            &quot;Brutality and foul play should receive the same summary punishment 
            given to a man who cheats at cards.&quot;
          </p>
          <cite>— President Theodore Roosevelt, 1905</cite>
        </blockquote>
        
        <div className="monument-context">
          <p>
            Football had become a killing field. Mass formations like the &quot;flying wedge&quot; 
            turned players into human battering rams. In 1905 alone, 19 players died 
            and over 100 were seriously injured.
          </p>
          <p>
            President Roosevelt, whose own son played at Harvard, summoned coaches from 
            Yale, Harvard, and Princeton to the White House. His ultimatum was clear: 
            <strong> reform the game or he would abolish it by executive order.</strong>
          </p>
        </div>
      </Section>

      {/* ==================== SECTION 6: THE FORWARD PASS (COMPARISON) ==================== */}
      <Section id="forward-pass" className="comparison-section">
        <div className="comparison-header">
          <span className="section-badge">THE SALVATION</span>
          <h2>1906: The Rule That Saved Football</h2>
        </div>
        
        <div className="comparison-container">
          <div className="comparison-panel before">
            <h3>Before 1906</h3>
            <div className="panel-illustration">
              <svg viewBox="0 0 200 150" role="img" aria-labelledby="mass-title mass-desc">
                <title id="mass-title">Mass Formation</title>
                <desc id="mass-desc">Football players clustered tightly together in a dangerous mass formation, the style of play that caused numerous injuries and deaths before 1906</desc>
                {/* Dense cluster of players - deterministic grid */}
                {[
                  { cx: 60, cy: 50 }, { cx: 85, cy: 50 }, { cx: 110, cy: 50 }, { cx: 135, cy: 50 },
                  { cx: 60, cy: 80 }, { cx: 85, cy: 80 }, { cx: 110, cy: 80 }, { cx: 135, cy: 80 },
                  { cx: 72, cy: 110 }, { cx: 97, cy: 110 }, { cx: 122, cy: 110 },
                ].map((pos, i) => (
                  <circle
                    key={i}
                    cx={pos.cx}
                    cy={pos.cy}
                    r="15"
                    fill="var(--pigskin-brown, #8B4513)"
                    stroke="var(--pigskin-dark, #654321)"
                    strokeWidth="2"
                  />
                ))}
                {/* Impact lines to show collision danger */}
                <g stroke="var(--color-danger, #DC2626)" strokeWidth="1" opacity="0.5">
                  <line x1="50" y1="45" x2="40" y2="35" />
                  <line x1="145" y1="45" x2="155" y2="35" />
                  <line x1="50" y1="115" x2="40" y2="125" />
                  <line x1="132" y1="115" x2="142" y2="125" />
                </g>
                <text x="100" y="140" textAnchor="middle" fill="var(--chalk-white, #FFFAF0)" fontSize="10" fontFamily="var(--font-display), sans-serif">
                  MASS FORMATION
                </text>
              </svg>
            </div>
            <ul className="panel-traits">
              <li><span className="trait-negative">✕</span> Mass formations</li>
              <li><span className="trait-negative">✕</span> Running only</li>
              <li><span className="trait-negative">✕</span> High casualties</li>
              <li><span className="trait-negative">✕</span> Brutal collisions</li>
            </ul>
          </div>
          
          <div className="comparison-divider">
            <div className="divider-year">1906</div>
            <div className="divider-text">FORWARD PASS LEGALIZED</div>
          </div>
          
          <div className="comparison-panel after">
            <h3>After 1906</h3>
            <div className="panel-illustration">
              <svg viewBox="0 0 200 150" role="img" aria-labelledby="spread-title spread-desc">
                <title id="spread-title">Spread Formation with Forward Pass</title>
                <desc id="spread-desc">Football players spread across the field in an open formation, with a dotted line showing the trajectory of a forward pass - the revolutionary rule change that saved football in 1906</desc>
                {/* Spread players */}
                {[30, 70, 100, 130, 170].map((x, i) => (
                  <circle key={i} cx={x} cy="110" r="12" fill="var(--grass-green, #228B22)" stroke="var(--grass-dark, #1A5D1A)" strokeWidth="2" />
                ))}
                {/* Ball trajectory arc */}
                <path d="M100 100 Q130 40 170 70" fill="none" stroke="var(--helmet-gold, #CFB53B)" strokeWidth="2" strokeDasharray="5,5" className="pass-arc" />
                {/* Football in flight */}
                <ellipse cx="170" cy="70" rx="12" ry="8" fill="var(--pigskin-brown, #8B4513)" />
                {/* Laces on ball */}
                <line x1="165" y1="70" x2="175" y2="70" stroke="var(--chalk-white, #FFFAF0)" strokeWidth="1" />
                {/* Receiver running route */}
                <path d="M170 110 L170 80" fill="none" stroke="var(--grass-green, #228B22)" strokeWidth="1" strokeDasharray="3,2" />
                <text x="100" y="140" textAnchor="middle" fill="var(--chalk-white, #FFFAF0)" fontSize="10" fontFamily="var(--font-display), sans-serif">
                  SPREAD + PASSING
                </text>
              </svg>
            </div>
            <ul className="panel-traits">
              <li><span className="trait-positive">✓</span> Spread formations</li>
              <li><span className="trait-positive">✓</span> Aerial attack</li>
              <li><span className="trait-positive">✓</span> Reduced injuries</li>
              <li><span className="trait-positive">✓</span> Strategic depth</li>
            </ul>
          </div>
        </div>
        
        <div className="comparison-footnote">
          <p>
            The forward pass opened the field, spread players apart, and reduced 
            the deadly mass collisions. Football survived—and became infinitely 
            more strategic and entertaining.
          </p>
        </div>
      </Section>

      {/* ==================== SECTION 7: AMERICA'S GAME (DATA VIZ) ==================== */}
      <Section id="americas-game" className="data-viz-section">
        <div className="data-header">
          <span className="section-badge">THE PHENOMENON</span>
          <h2>America&apos;s Game</h2>
          <p className="data-intro">
            From leather helmets to billion-dollar stadiums, football grew alongside 
            American media and became inseparable from national identity.
          </p>
        </div>
        
        <div className="data-grid">
          <div className="data-card">
            <div className="data-icon">📺</div>
            <div className="data-value">1958</div>
            <div className="data-label">&quot;The Greatest Game Ever Played&quot;</div>
            <div className="data-description">
              Colts vs. Giants in sudden death overtime. 45 million TV viewers witness 
              football&apos;s first prime-time classic.
            </div>
          </div>
          
          <div className="data-card">
            <div className="data-icon">🏆</div>
            <div className="data-value">1967</div>
            <div className="data-label">First Super Bowl</div>
            <div className="data-description">
              Green Bay defeats Kansas City 35-10. The championship would become 
              America&apos;s unofficial national holiday.
            </div>
          </div>
          
          <div className="data-card featured">
            <div className="data-icon">💰</div>
            <div className="data-value">$15B</div>
            <div className="data-label">Annual NFL Revenue</div>
            <div className="data-description">
              The NFL is the most valuable sports league in the world. 
              Average team value: $4.6 billion.
            </div>
          </div>
          
          <div className="data-card">
            <div className="data-icon">🎯</div>
            <div className="data-value">113M</div>
            <div className="data-label">Super Bowl LVII Viewers</div>
            <div className="data-description">
              The most-watched telecast in American history. 
              30-second ads cost $7 million.
            </div>
          </div>
        </div>
        
        <div className="viewership-chart">
          <h3>Super Bowl Viewership Growth</h3>
          <div className="chart-container">
            {[
              { year: "1967", viewers: 51, height: 45 },
              { year: "1980", viewers: 76, height: 67 },
              { year: "1990", viewers: 73, height: 64 },
              { year: "2000", viewers: 89, height: 79 },
              { year: "2010", viewers: 106, height: 94 },
              { year: "2023", viewers: 113, height: 100 },
            ].map((d) => (
              <div key={d.year} className="chart-bar-container">
                <div className="chart-bar" style={{ height: `${d.height}%` }}>
                  <span className="bar-value">{d.viewers}M</span>
                </div>
                <span className="bar-label">{d.year}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ==================== SECTION 8: MODERN GRIDIRON ==================== */}
      <Section id="modern-era" className="split-screen reverse">
        <div className="split-content">
          <span className="section-badge">THE RECKONING</span>
          <h2>The Modern Gridiron</h2>
          <p className="lead">
            Football&apos;s dominance comes with a price. The same collisions that thrill 
            fans have sparked a crisis of conscience.
          </p>
          <p>
            In 2002, Dr. Bennet Omalu discovered CTE (Chronic Traumatic Encephalopathy) 
            in the brain of former Steelers center Mike Webster. The NFL initially 
            denied the connection between football and brain damage.
          </p>
          <p>
            Today, the league has implemented concussion protocols, banned certain 
            hits, and paid over $1 billion in settlements to former players. 
            Youth football participation has declined 27% since 2008.
          </p>
          <div className="highlight-box caution">
            <span className="highlight-number">27%</span>
            <span className="highlight-text">decline in youth football participation since 2008</span>
          </div>
        </div>
        
        <div className="split-image">
          <HelmetEvolution />
          <p className="image-caption">
            The evolution of protective equipment mirrors football&apos;s ongoing 
            struggle with player safety.
          </p>
        </div>
      </Section>

      {/* ==================== SECTION 9: LEGACY (FULL BLEED) ==================== */}
      <Section id="legacy" className="legacy-section full-bleed">
        <div className="legacy-backdrop">
          <StadiumEvolution era="modern" />
        </div>
        
        <div className="legacy-content">
          <h2>Legacy on the Line</h2>
          
          <p className="legacy-lead">
            From muddy college fields to gleaming billion-dollar stadiums, 
            American football&apos;s 150-year journey is a story of reinvention.
          </p>
          
          <div className="legacy-answer">
            <h3>So how did a chaotic rugby variant become America&apos;s obsession?</h3>
            <p>
              Through the vision of Walter Camp. Through the crisis of 1905 and 
              Theodore Roosevelt&apos;s ultimatum. Through the forward pass that saved 
              the game. Through television&apos;s embrace of its drama. Through the 
              Super Bowl&apos;s transformation into a national holiday.
            </p>
            <p>
              Football succeeded because it evolved—repeatedly, dramatically, 
              sometimes desperately. It nearly died before it lived. And that 
              capacity for reinvention may be what defines it most.
            </p>
          </div>
          
          <div className="trophy-display">
            <LombardiTrophy celebrate={showTrophyCelebration} />
          </div>
          
          <div className="final-stat">
            <span className="stat-context">On any given Sunday</span>
            <span className="stat-big">17.1 MILLION</span>
            <span className="stat-context">Americans are watching</span>
          </div>
        </div>
      </Section>

      {/* ==================== SOURCES SECTION ==================== */}
      <Section id="sources" className="sources-section">
        <div className="sources-content">
          <h3 className="sources-title">Sources & Further Reading</h3>
          
          <ul className="sources-list">
            <li>
              <a href="https://www.profootballhof.com/football-history/birth-of-pro-football/" target="_blank" rel="noopener noreferrer">
                Pro Football Hall of Fame: Birth of Professional Football
              </a>
            </li>
            <li>
              <a href="https://www.ncaa.org/sports/2021/2/10/history.aspx" target="_blank" rel="noopener noreferrer">
                NCAA: History of College Football
              </a>
            </li>
            <li>
              <a href="https://www.britannica.com/biography/Walter-Camp" target="_blank" rel="noopener noreferrer">
                Encyclopedia Britannica: Walter Camp
              </a>
            </li>
            <li>
              <a href="https://www.smithsonianmag.com/history/the-origins-of-football/" target="_blank" rel="noopener noreferrer">
                Smithsonian Magazine: The Origins of Football
              </a>
            </li>
            <li>
              <a href="https://www.nfl.com/100/timeline" target="_blank" rel="noopener noreferrer">
                NFL: 100 Years Timeline
              </a>
            </li>
            <li>
              <a href="https://www.history.com/topics/sports/history-of-football" target="_blank" rel="noopener noreferrer">
                History.com: History of Football
              </a>
            </li>
            <li>
              <a href="https://www.statista.com/topics/963/super-bowl/" target="_blank" rel="noopener noreferrer">
                Statista: Super Bowl Statistics and Facts
              </a>
            </li>
          </ul>
          
          <h4 className="sources-subtitle">Image Credits</h4>
          <ul className="sources-list">
            <li>
              <a href="https://commons.wikimedia.org/wiki/File:Walter_Camp._Portrait_by_George_M._Reevs.jpg" target="_blank" rel="noopener noreferrer">
                Walter Camp Portrait by George M. Reevs (1909) — Wikimedia Commons, Public Domain
              </a>
              <span className="source-detail">
                Originally published in The Century Illustrated Monthly Magazine, Volume 79
              </span>
            </li>
          </ul>
          
          <p className="sources-note">
            This narrative was fact-checked against authoritative historical records, 
            sports archives, and peer-reviewed research on American football history.
          </p>
        </div>
      </Section>
    </div>
  );
};

export default GridironClient;
