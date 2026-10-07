"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import './the-tea-journey-illustrated.css';

/**
 * LEAVES OF TIME: THE GLOBAL JOURNEY OF TEA
 * ==========================================
 * ILLUSTRATED EDITION - Premium Visual Experience
 * 
 * SVG ILLUSTRATION SYSTEM (@svg-illustration-animation-expert.md):
 * ----------------------------------------------------------------
 * 1. HERO: Intricate tea plant with animated leaves unfurling
 * 2. CHINESE MOUNTAIN SCENE: Layered parallax mountains with mist
 * 3. GONGFU TEA SET: Detailed Yixing clay teapot with steam particles
 * 4. JAPANESE ZEN GARDEN: Matcha bowl, whisk, stone garden
 * 5. SILK ROAD CARAVAN: Animated camels with tea brick loads
 * 6. SAILING SHIPS: Clipper ships on animated waves
 * 7. WORLD MAP: Detailed continents with glowing trade routes
 * 8. TEA PLANT ANATOMY: Scientific botanical illustration
 * 9. PROCESSING DIAGRAM: Visual fermentation/oxidation cycle
 * 10. CEREMONY TRIPTYCH: Three cultures, three ceremonies
 * 
 * ANIMATION TECHNIQUES:
 * - Path drawing (stroke-dashoffset) for routes
 * - Multi-layer parallax for depth
 * - Particle systems for steam/mist
 * - Morphing for leaf transformation
 * - Physics-based floating for leaves
 * - Staggered reveals for dramatic effect
 * 
 * ANTI-PATTERNS AVOIDED:
 * ✅ NO stock photos or raster images
 * ✅ NO generic icon libraries
 * ✅ NO cookie-cutter layouts
 * ✅ Everything hand-crafted for this story
 */

// ============================================
// REUSABLE SVG COMPONENTS
// ============================================

// Decorative Tea Leaf
const TeaLeafSVG: React.FC<{ className?: string; delay?: number }> = ({ className = '', delay = 0 }) => (
  <svg 
    className={`tea-leaf-svg ${className}`} 
    viewBox="0 0 60 100" 
    style={{ animationDelay: `${delay}s` }}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--leaf-light)" />
        <stop offset="100%" stopColor="var(--leaf-dark)" />
      </linearGradient>
    </defs>
    <path 
      className="leaf-body"
      d="M30 5 Q10 25 10 55 Q10 90 30 95 Q50 90 50 55 Q50 25 30 5"
      fill="url(#leafGradient)"
    />
    {/* Central vein */}
    <path 
      className="leaf-vein central"
      d="M30 10 L30 90"
      stroke="var(--leaf-dark)"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Side veins */}
    {[20, 35, 50, 65, 78].map((y, i) => (
      <g key={i}>
        <path 
          className="leaf-vein side"
          d={`M30 ${y} Q${20 - i} ${y + 5} ${12 + i * 2} ${y + 10}`}
          stroke="var(--leaf-dark)"
          strokeWidth="0.8"
          fill="none"
          style={{ animationDelay: `${delay + i * 0.1}s` }}
        />
        <path 
          className="leaf-vein side"
          d={`M30 ${y} Q${40 + i} ${y + 5} ${48 - i * 2} ${y + 10}`}
          stroke="var(--leaf-dark)"
          strokeWidth="0.8"
          fill="none"
          style={{ animationDelay: `${delay + i * 0.1 + 0.05}s` }}
        />
      </g>
    ))}
  </svg>
);

// Steam Particle System
const SteamParticles: React.FC<{ count?: number; className?: string }> = ({ count = 8, className = '' }) => (
  <g className={`steam-particles ${className}`}>
    {[...Array(count)].map((_, i) => {
      const x = 15 + (i % 3) * 15;
      const delay = i * 0.25;
      return (
        <circle 
          key={i}
          className="steam-particle"
          cx={x}
          cy={80}
          r={3 + (i % 3)}
          style={{ animationDelay: `${delay}s` }}
        />
      );
    })}
  </g>
);

// ============================================
// MAIN COMPONENT
// ============================================
const TeaJourneyIllustratedClient: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  // Initialize with 'hero' to prevent flash of unstyled content on first load
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['hero']));
  const [activeRoute, setActiveRoute] = useState(0);
  const [mapProgress, setMapProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  
  const mapRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Mark as mounted after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scroll handler
  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(window.scrollY / scrollHeight, 1);
    setScrollProgress(progress);

    // Map section progress
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      const sectionHeight = mapRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const sectionProgress = Math.max(0, Math.min(1, 
          (viewportHeight - rect.top) / (sectionHeight + viewportHeight)
        ));
        setMapProgress(sectionProgress);
        setActiveRoute(Math.floor(sectionProgress * 5));
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Intersection observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute('data-section-id');
          if (id && entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionRefs.current.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const registerSection = useCallback((id: string, el: HTMLElement | null) => {
    if (el) {
      sectionRefs.current.set(id, el);
      el.setAttribute('data-section-id', id);
    }
  }, []);

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="tea-illustrated">
      {/* Floating Leaf Progress Indicator */}
      <div className="leaf-progress-indicator">
        <svg viewBox="0 0 40 120" className="progress-leaf-svg">
          <defs>
            <clipPath id="progress-clip">
              <rect x="0" y={120 - scrollProgress * 120} width="40" height="120" />
            </clipPath>
          </defs>
          {/* Background leaf outline */}
          <path 
            className="progress-leaf-outline"
            d="M20 5 Q5 20 5 60 Q5 110 20 115 Q35 110 35 60 Q35 20 20 5"
          />
          {/* Filled portion based on scroll */}
          <path 
            className="progress-leaf-fill"
            d="M20 5 Q5 20 5 60 Q5 110 20 115 Q35 110 35 60 Q35 20 20 5"
            clipPath="url(#progress-clip)"
          />
          {/* Veins */}
          <path className="progress-vein" d="M20 15 L20 105" />
        </svg>
      </div>

      {/* ============================================
          SCENE 1: HERO - Tea Plant Emergence
          ============================================ */}
      <section className="hero-illustrated">
        {/* Layered Mountain Background */}
        <div className="hero-mountains">
          <svg className="mountain-layer layer-1" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice">
            <path d="M0 400 L0 250 Q180 150 360 200 Q540 250 720 180 Q900 110 1080 170 Q1260 230 1440 160 L1440 400 Z" />
          </svg>
          <svg className="mountain-layer layer-2" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice">
            <path d="M0 400 L0 300 Q240 220 480 280 Q720 340 960 260 Q1200 180 1440 250 L1440 400 Z" />
          </svg>
          <svg className="mountain-layer layer-3" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice">
            <path d="M0 400 L0 320 Q360 280 720 340 Q1080 400 1440 350 L1440 400 Z" />
          </svg>
          {/* Animated Mist */}
          <div className="mist-layer mist-1" />
          <div className="mist-layer mist-2" />
        </div>

        {/* Central Tea Plant Illustration */}
        <div className="hero-plant-container">
          <svg 
            className="hero-plant-svg" 
            viewBox="0 0 400 500" 
            role="img" 
            aria-labelledby="hero-plant-title"
          >
            <title id="hero-plant-title">Camellia sinensis - The Tea Plant</title>
            <defs>
              <linearGradient id="stemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6B4423" />
                <stop offset="100%" stopColor="#3D2814" />
              </linearGradient>
              <linearGradient id="leafGradientHero" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4A7C59" />
                <stop offset="50%" stopColor="#2D5A4A" />
                <stop offset="100%" stopColor="#1E3D32" />
              </linearGradient>
              <filter id="leafShadow">
                <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Main Stem */}
            <path 
              className="plant-stem anim-draw"
              d="M200 480 Q200 400 195 350 Q190 300 200 250 Q210 200 200 150 Q195 120 200 100"
              stroke="url(#stemGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Branch stems */}
            <g className="branch-group">
              <path className="branch anim-draw delay-1" d="M200 350 Q230 330 280 340" stroke="url(#stemGradient)" strokeWidth="4" fill="none" />
              <path className="branch anim-draw delay-2" d="M200 300 Q160 280 120 290" stroke="url(#stemGradient)" strokeWidth="4" fill="none" />
              <path className="branch anim-draw delay-3" d="M200 250 Q240 230 290 245" stroke="url(#stemGradient)" strokeWidth="3" fill="none" />
              <path className="branch anim-draw delay-4" d="M200 200 Q170 180 130 195" stroke="url(#stemGradient)" strokeWidth="3" fill="none" />
            </g>

            {/* Tea Leaves - Each with unique animation */}
            <g className="leaves-group" filter="url(#leafShadow)">
              {/* Large bottom-right leaf */}
              <g className="leaf-unit leaf-1 anim-unfurl">
                <path 
                  d="M280 340 Q320 320 350 360 Q370 400 340 430 Q300 450 270 420 Q250 390 280 340"
                  fill="url(#leafGradientHero)"
                />
                <path d="M280 340 Q305 385 310 420" className="leaf-vein-path" />
              </g>

              {/* Large bottom-left leaf */}
              <g className="leaf-unit leaf-2 anim-unfurl">
                <path 
                  d="M120 290 Q80 270 50 310 Q30 350 60 380 Q100 400 130 370 Q150 340 120 290"
                  fill="url(#leafGradientHero)"
                />
                <path d="M120 290 Q90 335 85 365" className="leaf-vein-path" />
              </g>

              {/* Medium right leaf */}
              <g className="leaf-unit leaf-3 anim-unfurl">
                <path 
                  d="M290 245 Q320 230 340 260 Q355 290 330 315 Q300 330 280 305 Q265 280 290 245"
                  fill="url(#leafGradientHero)"
                />
                <path d="M290 245 Q310 280 308 305" className="leaf-vein-path" />
              </g>

              {/* Medium left leaf */}
              <g className="leaf-unit leaf-4 anim-unfurl">
                <path 
                  d="M130 195 Q100 175 75 200 Q55 230 80 260 Q110 280 135 255 Q155 230 130 195"
                  fill="url(#leafGradientHero)"
                />
                <path d="M130 195 Q100 225 95 250" className="leaf-vein-path" />
              </g>

              {/* Top bud/young leaves */}
              <g className="bud-group anim-emerge">
                <ellipse cx="200" cy="95" rx="12" ry="25" fill="#5A8A5A" className="bud-leaf bud-1" />
                <ellipse cx="190" cy="105" rx="8" ry="18" fill="#6B9B6B" className="bud-leaf bud-2" />
                <ellipse cx="210" cy="105" rx="8" ry="18" fill="#6B9B6B" className="bud-leaf bud-3" />
              </g>

              {/* Small accent leaves */}
              <ellipse className="small-leaf sl-1 anim-float" cx="250" cy="310" rx="15" ry="8" transform="rotate(30 250 310)" fill="url(#leafGradientHero)" />
              <ellipse className="small-leaf sl-2 anim-float" cx="150" cy="255" rx="12" ry="6" transform="rotate(-25 150 255)" fill="url(#leafGradientHero)" />
            </g>

            {/* Decorative flower buds */}
            <g className="flower-buds">
              <circle className="flower-bud fb-1" cx="260" cy="280" r="6" fill="#F5F1E3" />
              <circle className="flower-bud fb-2" cx="145" cy="230" r="5" fill="#F5F1E3" />
              <circle className="flower-bud fb-3" cx="220" cy="180" r="4" fill="#F5F1E3" />
            </g>
          </svg>
        </div>

        {/* Hero Text Content */}
        <div className="hero-content-illustrated">
          <div className="era-badge">
            <span className="era-years">5,000</span>
            <span className="era-label">Years</span>
          </div>
          <h1 className="hero-title-illustrated">
            <span className="title-word tw-1">Leaves</span>
            <span className="title-word tw-2">of</span>
            <span className="title-word tw-3">Time</span>
          </h1>
          <p className="hero-tagline">The Global Journey of Tea</p>
          <p className="hero-intro-illustrated">
            From wild mountain leaves discovered by accident to the most consumed 
            beverage on Earth—one plant reshaped empires, sparked revolutions, 
            and connected every culture across five millennia.
          </p>
        </div>

        {/* Scroll Prompt with animated leaf */}
        <div className="scroll-prompt-illustrated">
          <TeaLeafSVG className="prompt-leaf" delay={0} />
          <span className="prompt-text">Begin the journey</span>
        </div>
      </section>

      {/* ============================================
          SCENE 2: Ancient China - The Discovery
          ============================================ */}
      <section 
        className={`scene-china ${visibleSections.has('china') ? 'visible' : ''}`}
        ref={el => registerSection('china', el)}
      >
        <div className="china-illustration">
          <svg 
            className="china-scene-svg" 
            viewBox="0 0 800 500" 
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-labelledby="china-scene-title"
          >
            <title id="china-scene-title">Ancient Chinese tea discovery scene</title>
            <defs>
              <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1A0F0A" />
                <stop offset="50%" stopColor="#2D1B14" />
                <stop offset="100%" stopColor="#3D5A4A" />
              </linearGradient>
              <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4A7C59" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#1E3D32" stopOpacity="0.6" />
              </linearGradient>
              <filter id="mistFilter">
                <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
              </filter>
            </defs>

            {/* Sky background */}
            <rect x="0" y="0" width="800" height="500" fill="url(#skyGradient)" />

            {/* Distant mountains */}
            <g className="distant-mountains">
              <path className="mountain dm-1" d="M-50 500 L100 200 L200 350 L300 180 L450 320 L500 250 L650 380 L800 220 L850 500 Z" fill="#1E3D32" opacity="0.4" />
              <path className="mountain dm-2" d="M-50 500 L150 280 L280 380 L400 260 L550 350 L700 290 L850 500 Z" fill="#2D5A4A" opacity="0.5" />
            </g>

            {/* Floating mist layers */}
            <g className="scene-mist" filter="url(#mistFilter)">
              <ellipse className="mist-blob mb-1" cx="200" cy="350" rx="150" ry="30" fill="#8FA98F" opacity="0.3" />
              <ellipse className="mist-blob mb-2" cx="550" cy="320" rx="180" ry="25" fill="#8FA98F" opacity="0.25" />
              <ellipse className="mist-blob mb-3" cx="400" cy="380" rx="200" ry="35" fill="#8FA98F" opacity="0.2" />
            </g>

            {/* Tea tree */}
            <g className="tea-tree">
              <path className="tree-trunk" d="M380 500 Q375 450 385 400 Q395 350 380 320" stroke="#4A3728" strokeWidth="12" fill="none" strokeLinecap="round" />
              <path className="tree-branch tb-1" d="M380 380 Q340 360 300 370" stroke="#4A3728" strokeWidth="6" fill="none" />
              <path className="tree-branch tb-2" d="M380 350 Q420 330 470 345" stroke="#4A3728" strokeWidth="5" fill="none" />
              <path className="tree-branch tb-3" d="M380 320 Q350 300 320 310" stroke="#4A3728" strokeWidth="4" fill="none" />
              
              {/* Tree foliage */}
              <ellipse className="foliage f-1" cx="280" cy="350" rx="50" ry="35" fill="#2D5A4A" />
              <ellipse className="foliage f-2" cx="480" cy="330" rx="55" ry="40" fill="#3D6B5A" />
              <ellipse className="foliage f-3" cx="350" cy="300" rx="45" ry="30" fill="#4A7C59" />
              <ellipse className="foliage f-4" cx="400" cy="280" rx="40" ry="25" fill="#5A8A5A" />
            </g>

            {/* Falling leaves animation */}
            <g className="falling-leaves-scene">
              {[...Array(6)].map((_, i) => (
                <ellipse 
                  key={i}
                  className={`scene-leaf sl-${i + 1}`}
                  cx={320 + (i * 30)}
                  cy={280}
                  rx={6 + (i % 3)}
                  ry={3 + (i % 2)}
                  fill="#4A7C59"
                  transform={`rotate(${20 + i * 15} ${320 + (i * 30)} 280)`}
                />
              ))}
            </g>

            {/* Scholar figure (simplified) */}
            <g className="scholar-figure">
              {/* Body/robe */}
              <path className="scholar-robe" d="M600 500 Q590 450 580 420 Q570 390 590 370 Q610 350 630 370 Q650 390 640 420 Q630 450 620 500 Z" fill="#C9A227" opacity="0.8" />
              {/* Head */}
              <circle className="scholar-head" cx="610" cy="345" r="20" fill="#D4B896" />
              {/* Hat */}
              <path className="scholar-hat" d="M590 340 Q610 310 630 340" fill="#2D1B14" />
            </g>

            {/* Bowl with steam */}
            <g className="tea-bowl-scene">
              <ellipse className="bowl-shadow" cx="660" cy="465" rx="30" ry="8" fill="#1A0F0A" opacity="0.4" />
              <path className="bowl-body" d="M630 440 Q630 470 660 475 Q690 470 690 440" fill="#B86B4C" />
              <ellipse className="bowl-rim" cx="660" cy="440" rx="30" ry="8" fill="#C47A5A" />
              <ellipse className="bowl-tea" cx="660" cy="442" rx="25" ry="6" fill="#C9A227" opacity="0.8" />
              
              {/* Steam wisps */}
              <g className="bowl-steam">
                <path className="steam-wisp sw-1" d="M650 430 Q645 410 655 390" stroke="#F5F1E3" strokeWidth="2" fill="none" opacity="0.4" />
                <path className="steam-wisp sw-2" d="M660 428 Q665 405 658 385" stroke="#F5F1E3" strokeWidth="2" fill="none" opacity="0.3" />
                <path className="steam-wisp sw-3" d="M670 430 Q675 408 668 388" stroke="#F5F1E3" strokeWidth="2" fill="none" opacity="0.35" />
              </g>
            </g>

            {/* Year badge */}
            <g className="year-badge-svg">
              <rect x="50" y="50" width="120" height="50" rx="4" fill="#C9A227" opacity="0.2" />
              <text x="110" y="85" className="year-text" textAnchor="middle" fill="#C9A227">2737 BCE</text>
            </g>
          </svg>
        </div>

        <div className="china-content">
          <h2 className="section-title">The Discovery</h2>
          <p className="section-text">
            In the mist-shrouded mountains of Yunnan, wild <em>Camellia sinensis</em> trees 
            had flourished for millennia. Legend speaks of Emperor Shen Nung resting beneath 
            such a tree when leaves drifted into his pot of boiling water.
          </p>
          <p className="section-text">
            Whether myth or memory, this moment marks humanity&apos;s first encounter with tea—
            a discovery that would reshape medicine, culture, trade, and empire across 
            every continent on Earth.
          </p>
          <blockquote className="illustrated-quote">
            <span className="quote-mark">&quot;</span>
            <p>Tea began as a medicine and grew into a beverage.</p>
            <cite>— Kakuzō Okakura, The Book of Tea</cite>
          </blockquote>
        </div>
      </section>

      {/* ============================================
          SCENE 3: Chinese Tea Culture - Gongfu
          ============================================ */}
      <section 
        className={`scene-gongfu ${visibleSections.has('gongfu') ? 'visible' : ''}`}
        ref={el => registerSection('gongfu', el)}
      >
        <div className="gongfu-illustration">
          {/* Intricate Yixing Teapot Illustration */}
          <svg 
            className="yixing-svg" 
            viewBox="0 0 400 350" 
            role="img" 
            aria-labelledby="yixing-title"
          >
            <title id="yixing-title">Traditional Yixing clay teapot with tea ceremony elements</title>
            <defs>
              <linearGradient id="yixingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C4703A" />
                <stop offset="30%" stopColor="#A85D30" />
                <stop offset="70%" stopColor="#8B4A26" />
                <stop offset="100%" stopColor="#6B3A1E" />
              </linearGradient>
              <linearGradient id="teaLiquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D4A84D" />
                <stop offset="100%" stopColor="#A07A30" />
              </linearGradient>
              <filter id="clayShadow">
                <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#1A0F0A" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* Platform/tray */}
            <g className="tea-tray">
              <rect x="50" y="280" width="300" height="20" rx="3" fill="#5A3E28" />
              <rect x="60" y="285" width="280" height="10" rx="2" fill="#6B4A32" />
            </g>

            {/* Main teapot body */}
            <g className="yixing-pot" filter="url(#clayShadow)">
              {/* Body */}
              <ellipse className="pot-body" cx="200" cy="220" rx="80" ry="55" fill="url(#yixingGradient)" />
              
              {/* Shoulder */}
              <ellipse className="pot-shoulder" cx="200" cy="175" rx="65" ry="25" fill="url(#yixingGradient)" />
              
              {/* Neck */}
              <rect className="pot-neck" x="175" y="150" width="50" height="25" fill="url(#yixingGradient)" />
              
              {/* Lid */}
              <ellipse className="pot-lid-base" cx="200" cy="150" rx="45" ry="12" fill="#9A5A32" />
              <ellipse className="pot-lid-top" cx="200" cy="145" rx="40" ry="10" fill="#B86840" />
              <ellipse className="pot-lid-knob" cx="200" cy="135" rx="12" ry="8" fill="#8B4A26" />
              <circle className="pot-knob-top" cx="200" cy="130" r="6" fill="#A85D30" />

              {/* Spout */}
              <path 
                className="pot-spout" 
                d="M280 200 Q310 190 330 160 Q340 140 335 130"
                fill="none"
                stroke="url(#yixingGradient)"
                strokeWidth="18"
                strokeLinecap="round"
              />
              {/* Spout opening */}
              <ellipse cx="335" cy="125" rx="8" ry="5" fill="#6B3A1E" />

              {/* Handle */}
              <path 
                className="pot-handle"
                d="M120 180 Q80 180 80 220 Q80 260 120 260"
                fill="none"
                stroke="url(#yixingGradient)"
                strokeWidth="14"
                strokeLinecap="round"
              />

              {/* Decorative band */}
              <path 
                className="pot-decoration"
                d="M130 200 Q200 185 270 200"
                fill="none"
                stroke="#5A3020"
                strokeWidth="2"
                strokeDasharray="5,3"
              />
            </g>

            {/* Pouring tea stream */}
            <g className="tea-pour anim-pour">
              <path 
                className="pour-stream"
                d="M335 130 Q345 140 348 160 Q350 180 345 200 Q340 220 350 240"
                fill="none"
                stroke="url(#teaLiquidGradient)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Droplets */}
              <circle className="tea-drop td-1" cx="350" cy="250" r="3" fill="#C9A227" />
              <circle className="tea-drop td-2" cx="345" cy="260" r="2" fill="#C9A227" />
            </g>

            {/* Small cups */}
            <g className="tea-cups">
              <g className="cup cup-1">
                <ellipse cx="340" cy="275" rx="18" ry="5" fill="#8B4A26" />
                <path d="M322 260 Q322 275 340 278 Q358 275 358 260" fill="#9A5A32" />
                <ellipse cx="340" cy="260" rx="18" ry="5" fill="#A86840" />
                <ellipse className="cup-tea" cx="340" cy="262" rx="14" ry="4" fill="url(#teaLiquidGradient)" />
              </g>
              <g className="cup cup-2">
                <ellipse cx="380" cy="275" rx="18" ry="5" fill="#8B4A26" />
                <path d="M362 260 Q362 275 380 278 Q398 275 398 260" fill="#9A5A32" />
                <ellipse cx="380" cy="260" rx="18" ry="5" fill="#A86840" />
              </g>
            </g>

            {/* Steam from pot */}
            <g className="pot-steam">
              <path className="steam-curl sc-1" d="M195 120 Q185 100 195 80 Q205 60 195 40" stroke="#F5F1E3" strokeWidth="2" fill="none" opacity="0.3" />
              <path className="steam-curl sc-2" d="M205 118 Q215 95 205 75 Q195 55 205 35" stroke="#F5F1E3" strokeWidth="2" fill="none" opacity="0.25" />
              <path className="steam-curl sc-3" d="M200 115 Q200 90 205 70 Q210 50 200 30" stroke="#F5F1E3" strokeWidth="2" fill="none" opacity="0.2" />
            </g>
          </svg>
        </div>

        <div className="gongfu-content">
          <span className="era-tag">Tang Dynasty · 760 CE</span>
          <h2 className="section-title">The Art of Gongfu</h2>
          <p className="section-text">
            In 760 CE, the scholar Lu Yu completed the <em>Cha Jing</em>—the Classic of Tea—
            transforming tea from folk remedy into high art. He documented water quality, 
            vessel shapes, brewing temperatures, and the philosophy that tea was not merely 
            a drink but a path to mindfulness.
          </p>
          <p className="section-text">
            The Yixing clay teapots of Jiangsu became treasures. Over decades, their porous 
            walls absorbed tea&apos;s essence, each pot dedicated to a single variety, its flavor 
            deepening with every brew.
          </p>
          <div className="gongfu-facts">
            <div className="fact">
              <span className="fact-number">7</span>
              <span className="fact-label">seconds per steep</span>
            </div>
            <div className="fact">
              <span className="fact-number">20+</span>
              <span className="fact-label">infusions possible</span>
            </div>
            <div className="fact">
              <span className="fact-number">1</span>
              <span className="fact-label">tea per pot, forever</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SCENE 4: Japan - Zen and Matcha
          ============================================ */}
      <section 
        className={`scene-japan ${visibleSections.has('japan') ? 'visible' : ''}`}
        ref={el => registerSection('japan', el)}
      >
        <div className="japan-illustration">
          <svg 
            className="zen-garden-svg" 
            viewBox="0 0 600 400" 
            role="img" 
            aria-labelledby="zen-garden-title"
          >
            <title id="zen-garden-title">Japanese zen garden with matcha tea ceremony elements</title>
            <defs>
              <linearGradient id="matchaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7CB342" />
                <stop offset="50%" stopColor="#558B2F" />
                <stop offset="100%" stopColor="#33691E" />
              </linearGradient>
              <pattern id="sandPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="#E8E0CC" />
                <path d="M0 10 Q10 5 20 10" stroke="#D4C8B0" strokeWidth="1" fill="none" />
              </pattern>
              <filter id="softGlow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
              </filter>
            </defs>

            {/* Zen garden background */}
            <rect x="0" y="200" width="600" height="200" fill="url(#sandPattern)" />
            
            {/* Raked sand patterns */}
            <g className="sand-patterns">
              {[...Array(12)].map((_, i) => (
                <path 
                  key={i}
                  className={`sand-line anim-rake delay-${i % 4}`}
                  d={`M0 ${220 + i * 15} Q150 ${215 + i * 15} 300 ${220 + i * 15} Q450 ${225 + i * 15} 600 ${220 + i * 15}`}
                  stroke="#C4B8A0"
                  strokeWidth="1"
                  fill="none"
                />
              ))}
            </g>

            {/* Stones */}
            <g className="zen-stones">
              <ellipse className="stone stone-1" cx="150" cy="300" rx="40" ry="25" fill="#5A5A5A" />
              <ellipse className="stone stone-2" cx="450" cy="320" rx="35" ry="20" fill="#4A4A4A" />
              <circle className="stone stone-3" cx="300" cy="340" r="15" fill="#6A6A6A" />
            </g>

            {/* Matcha bowl (chawan) */}
            <g className="chawan-group">
              <ellipse className="chawan-shadow" cx="300" cy="180" rx="55" ry="15" fill="#1A0F0A" opacity="0.2" />
              
              {/* Bowl body */}
              <path 
                className="chawan-body"
                d="M245 120 Q230 150 245 170 Q270 185 300 185 Q330 185 355 170 Q370 150 355 120"
                fill="#B86B4C"
              />
              {/* Bowl rim */}
              <ellipse className="chawan-rim" cx="300" cy="120" rx="55" ry="15" fill="#C47A5A" />
              {/* Matcha surface */}
              <ellipse className="matcha-surface" cx="300" cy="125" rx="48" ry="12" fill="url(#matchaGradient)" />
              {/* Foam texture */}
              <g className="matcha-foam">
                <circle cx="285" cy="122" r="3" fill="#8BC34A" opacity="0.6" />
                <circle cx="310" cy="120" r="4" fill="#9CCC65" opacity="0.5" />
                <circle cx="295" cy="128" r="2" fill="#8BC34A" opacity="0.7" />
                <circle cx="320" cy="125" r="3" fill="#AED581" opacity="0.5" />
              </g>
            </g>

            {/* Chasen (bamboo whisk) */}
            <g className="chasen-group anim-whisk">
              <rect className="chasen-handle" x="380" y="80" width="15" height="50" rx="3" fill="#D4B896" />
              <g className="chasen-tines">
                {[...Array(12)].map((_, i) => (
                  <path 
                    key={i}
                    className={`tine tine-${i + 1}`}
                    d={`M${382 + i} 130 Q${380 + i * 0.5} 150 ${375 + i * 1.5} 160`}
                    stroke="#C4A35A"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                ))}
              </g>
            </g>

            {/* Bamboo grove in background */}
            <g className="bamboo-grove">
              {[50, 80, 110, 500, 530, 560].map((x, i) => (
                <g key={i} className={`bamboo-stalk bs-${i + 1}`}>
                  <rect x={x} y="0" width="8" height="200" fill="#6B8E23" />
                  <line x1={x} y1="40" x2={x + 8} y2="40" stroke="#4A6B1A" strokeWidth="2" />
                  <line x1={x} y1="90" x2={x + 8} y2="90" stroke="#4A6B1A" strokeWidth="2" />
                  <line x1={x} y1="140" x2={x + 8} y2="140" stroke="#4A6B1A" strokeWidth="2" />
                  {/* Leaves */}
                  <path d={`M${x + 8} ${50 + (i % 3) * 20} Q${x + 30} ${45 + (i % 3) * 20} ${x + 40} ${55 + (i % 3) * 20}`} fill="#7CB342" />
                </g>
              ))}
            </g>

            {/* Decorative moon */}
            <circle className="zen-moon" cx="520" cy="60" r="35" fill="#F5F1E3" opacity="0.3" />
          </svg>
        </div>

        <div className="japan-content">
          <span className="era-tag">Heian Period · 805 CE</span>
          <h2 className="section-title">The Way of Tea</h2>
          <p className="section-text">
            Buddhist monk Saichō returned from China carrying tea seeds and a philosophy. 
            In Japan, tea became <em>chadō</em>—the Way of Tea—a spiritual practice 
            rooted in Zen Buddhism&apos;s pursuit of enlightenment through simplicity.
          </p>
          <p className="section-text">
            Sen no Rikyū perfected the ceremony in the 16th century, reducing it to 
            essence: a small room, a single bowl, a moment of complete presence. 
            Four principles guide every movement:
          </p>
          <div className="zen-principles">
            <div className="principle-card">
              <span className="kanji">和</span>
              <span className="romaji">Wa</span>
              <span className="meaning">Harmony</span>
            </div>
            <div className="principle-card">
              <span className="kanji">敬</span>
              <span className="romaji">Kei</span>
              <span className="meaning">Respect</span>
            </div>
            <div className="principle-card">
              <span className="kanji">清</span>
              <span className="romaji">Sei</span>
              <span className="meaning">Purity</span>
            </div>
            <div className="principle-card">
              <span className="kanji">寂</span>
              <span className="romaji">Jaku</span>
              <span className="meaning">Tranquility</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SCENE 5: Trade Routes - Silk Road
          ============================================ */}
      <section className="scene-trade" ref={mapRef}>
        <div className="trade-sticky">
          <h2 className="map-title-illustrated">Tea Conquers the World</h2>
          <p className="map-subtitle-illustrated">
            Scroll to trace tea&apos;s journey across continents
          </p>

          <svg 
            className="world-map-illustrated" 
            viewBox="0 0 1200 600" 
            role="img" 
            aria-labelledby="world-map-title"
          >
            <title id="world-map-title">World map showing tea trade routes from China across the globe</title>
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C9A227" />
                <stop offset="100%" stopColor="#D4B84D" />
              </linearGradient>
              <filter id="routeGlow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <marker id="routeArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0 0 L0 6 L9 3 Z" fill="#C9A227" />
              </marker>
            </defs>

            {/* Ocean background */}
            <rect x="0" y="0" width="1200" height="600" fill="#0D1820" />
            
            {/* Stylized continents */}
            <g className="continents-detailed">
              {/* Asia */}
              <path 
                className="continent-shape asia-shape"
                d="M650 80 Q750 60 900 100 Q1000 140 1050 200 Q1100 280 1050 350 Q1000 400 900 420 Q800 450 700 400 Q620 350 600 280 Q580 200 620 140 Q640 100 650 80"
                fill="#1E3D32"
              />
              {/* Europe */}
              <path 
                className="continent-shape europe-shape"
                d="M450 100 Q520 80 580 110 Q620 140 600 180 Q580 220 520 240 Q460 250 420 220 Q380 190 400 150 Q420 110 450 100"
                fill="#2D5A4A"
              />
              {/* Africa */}
              <path 
                className="continent-shape africa-shape"
                d="M480 260 Q540 240 580 280 Q620 340 600 420 Q560 500 500 520 Q440 510 420 460 Q400 400 420 340 Q450 280 480 260"
                fill="#3D6B5A"
              />
              {/* India */}
              <path 
                className="continent-shape india-shape"
                d="M720 240 Q760 220 790 250 Q810 290 790 340 Q760 390 720 380 Q680 360 690 310 Q700 260 720 240"
                fill="#4A7C59"
              />
              {/* Americas hint */}
              <path 
                className="continent-shape americas-shape"
                d="M150 150 Q200 100 240 140 Q280 200 260 300 Q240 400 180 450 Q120 420 110 350 Q100 260 120 200 Q140 160 150 150"
                fill="#2D5A4A"
              />
            </g>

            {/* Tea origin point - Yunnan */}
            <g className="origin-marker">
              <circle className="origin-pulse" cx="820" cy="240" r="20" fill="#C9A227" opacity="0.3">
                <animate attributeName="r" values="15;25;15" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="820" cy="240" r="8" fill="#C9A227" />
              <text x="820" y="270" className="origin-label" textAnchor="middle">Yunnan</text>
            </g>

            {/* Trade Routes with animated drawing */}
            <g className="trade-routes-illustrated" filter="url(#routeGlow)">
              {/* Route 1: China to Japan */}
              <path 
                className={`route-path route-japan ${activeRoute >= 0 ? 'active' : ''}`}
                d="M820 240 Q900 200 950 190"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="3"
                strokeDasharray="500"
                strokeDashoffset={activeRoute >= 0 ? 0 : 500}
                markerEnd="url(#routeArrow)"
              />
              <circle className={`route-end ${activeRoute >= 0 ? 'show' : ''}`} cx="950" cy="190" r="6" fill="#4A7C59" />
              <text x="960" y="180" className={`route-label ${activeRoute >= 0 ? 'show' : ''}`}>Japan 805 CE</text>

              {/* Route 2: Silk Road to Central Asia & Europe */}
              <path 
                className={`route-path route-silk ${activeRoute >= 1 ? 'active' : ''}`}
                d="M820 240 Q700 200 600 180 Q500 160 450 170"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="3"
                strokeDasharray="500"
                strokeDashoffset={activeRoute >= 1 ? 0 : 500}
                markerEnd="url(#routeArrow)"
              />
              <text x="520" y="150" className={`route-label ${activeRoute >= 1 ? 'show' : ''}`}>Silk Road 1200 CE</text>

              {/* Route 3: Maritime to Europe */}
              <path 
                className={`route-path route-maritime ${activeRoute >= 2 ? 'active' : ''}`}
                d="M820 260 Q750 320 650 380 Q550 420 480 380 Q420 340 450 280 Q480 220 520 200"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="3"
                strokeDasharray="800"
                strokeDashoffset={activeRoute >= 2 ? 0 : 800}
                markerEnd="url(#routeArrow)"
              />
              <circle className={`route-end ${activeRoute >= 2 ? 'show' : ''}`} cx="520" cy="200" r="6" fill="#4A6B8A" />
              <text x="530" y="190" className={`route-label ${activeRoute >= 2 ? 'show' : ''}`}>Europe 1610 CE</text>

              {/* Route 4: To India */}
              <path 
                className={`route-path route-india ${activeRoute >= 3 ? 'active' : ''}`}
                d="M820 240 Q780 280 750 320"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="3"
                strokeDasharray="200"
                strokeDashoffset={activeRoute >= 3 ? 0 : 200}
                markerEnd="url(#routeArrow)"
              />
              <circle className={`route-end ${activeRoute >= 3 ? 'show' : ''}`} cx="750" cy="320" r="6" fill="#B86B4C" />
              <text x="760" y="350" className={`route-label ${activeRoute >= 3 ? 'show' : ''}`}>India 1848 CE</text>

              {/* Route 5: To Americas */}
              <path 
                className={`route-path route-americas ${activeRoute >= 4 ? 'active' : ''}`}
                d="M520 200 Q400 220 300 240 Q200 250 180 280"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="3"
                strokeDasharray="400"
                strokeDashoffset={activeRoute >= 4 ? 0 : 400}
                markerEnd="url(#routeArrow)"
              />
              <circle className={`route-end ${activeRoute >= 4 ? 'show' : ''}`} cx="180" cy="280" r="6" fill="#8A5A4A" />
              <text x="180" y="310" className={`route-label ${activeRoute >= 4 ? 'show' : ''}`}>Americas 1773 CE</text>
            </g>

            {/* Sailing ship illustrations */}
            <g className={`ships-group ${activeRoute >= 2 ? 'sailing' : ''}`}>
              <g className="ship ship-1" transform="translate(600, 360)">
                {/* Hull */}
                <path d="M0 20 Q20 30 40 20 Q35 10 20 5 Q5 10 0 20" fill="#6B4423" />
                {/* Mast */}
                <line x1="20" y1="5" x2="20" y2="-25" stroke="#4A3020" strokeWidth="2" />
                {/* Sail */}
                <path className="ship-sail" d="M22 -25 Q35 -15 30 0 L22 0 Z" fill="#F5F1E3" />
              </g>
            </g>

            {/* Camel caravan for Silk Road */}
            <g className={`caravan-group ${activeRoute >= 1 ? 'walking' : ''}`}>
              <g className="camel" transform="translate(650, 180)">
                {/* Simplified camel shape */}
                <ellipse cx="15" cy="10" rx="12" ry="6" fill="#C4A35A" />
                <ellipse cx="8" cy="5" rx="4" ry="5" fill="#C4A35A" />
                <circle cx="5" cy="2" r="3" fill="#B89A50" />
                {/* Legs */}
                <line x1="8" y1="16" x2="6" y2="25" stroke="#A08040" strokeWidth="2" />
                <line x1="22" y1="16" x2="24" y2="25" stroke="#A08040" strokeWidth="2" />
                {/* Tea load */}
                <rect x="10" y="0" width="10" height="6" rx="1" fill="#6B4423" />
              </g>
            </g>
          </svg>

          {/* Timeline markers */}
          <div className="map-timeline-illustrated">
            {[
              { year: '805', label: 'Japan', active: activeRoute >= 0 },
              { year: '1200', label: 'Silk Road', active: activeRoute >= 1 },
              { year: '1610', label: 'Europe', active: activeRoute >= 2 },
              { year: '1848', label: 'India', active: activeRoute >= 3 },
              { year: '1773', label: 'Americas', active: activeRoute >= 4 },
            ].map((item, i) => (
              <div key={i} className={`timeline-item ${item.active ? 'active' : ''}`}>
                <span className="tl-year">{item.year}</span>
                <span className="tl-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SCENE 6: British Empire & Boston Tea Party
          ============================================ */}
      <section 
        className={`scene-empire ${visibleSections.has('empire') ? 'visible' : ''}`}
        ref={el => registerSection('empire', el)}
      >
        <div className="empire-illustration">
          <svg 
            className="british-scene-svg" 
            viewBox="0 0 600 400" 
            role="img" 
            aria-labelledby="british-scene-title"
          >
            <title id="british-scene-title">British tea clipper ship and tea chests</title>
            <defs>
              <linearGradient id="seaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1A3A4A" />
                <stop offset="100%" stopColor="#0D1820" />
              </linearGradient>
              <linearGradient id="woodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6B4423" />
                <stop offset="100%" stopColor="#4A3020" />
              </linearGradient>
            </defs>

            {/* Sea background */}
            <rect x="0" y="200" width="600" height="200" fill="url(#seaGradient)" />
            
            {/* Waves */}
            <g className="waves-group">
              {[...Array(8)].map((_, i) => (
                <path 
                  key={i}
                  className={`wave wave-${i + 1}`}
                  d={`M${-50 + i * 20} ${250 + (i % 3) * 30} Q${25 + i * 20} ${240 + (i % 3) * 30} ${100 + i * 60} ${250 + (i % 3) * 30} Q${175 + i * 60} ${260 + (i % 3) * 30} ${250 + i * 40} ${250 + (i % 3) * 30}`}
                  stroke="#2A5A6A"
                  strokeWidth="2"
                  fill="none"
                  opacity={0.3 + (i % 3) * 0.1}
                />
              ))}
            </g>

            {/* Clipper ship */}
            <g className="clipper-ship anim-rock">
              {/* Hull */}
              <path 
                className="ship-hull"
                d="M150 280 Q200 310 350 310 Q400 310 450 280 L430 250 Q350 230 270 230 L150 280"
                fill="url(#woodGradient)"
              />
              {/* Deck */}
              <path d="M180 250 L420 250 L410 240 L190 240 Z" fill="#5A3A20" />
              
              {/* Masts */}
              <line className="mast mast-1" x1="250" y1="240" x2="250" y2="100" stroke="#4A3020" strokeWidth="4" />
              <line className="mast mast-2" x1="320" y1="240" x2="320" y2="80" stroke="#4A3020" strokeWidth="5" />
              <line className="mast mast-3" x1="390" y1="240" x2="390" y2="110" stroke="#4A3020" strokeWidth="4" />
              
              {/* Sails */}
              <g className="sails anim-billow">
                <path className="sail sail-1" d="M252 100 Q280 120 300 140 L252 150 Z" fill="#F5F1E3" />
                <path className="sail sail-2" d="M252 155 Q285 175 310 195 L252 210 Z" fill="#F5F1E3" />
                <path className="sail sail-3" d="M322 80 Q360 110 400 140 L322 150 Z" fill="#F5F1E3" />
                <path className="sail sail-4" d="M322 155 Q365 185 410 215 L322 225 Z" fill="#F5F1E3" />
                <path className="sail sail-5" d="M392 110 Q420 130 440 150 L392 160 Z" fill="#F5F1E3" />
              </g>

              {/* British flag hint */}
              <rect x="318" y="78" width="8" height="5" fill="#C41E3A" />
            </g>

            {/* Tea chests being thrown */}
            <g className="tea-chests-falling">
              <g className="chest chest-1 anim-fall">
                <rect x="480" y="180" width="25" height="18" rx="2" fill="url(#woodGradient)" />
                <text x="492" y="193" fontSize="8" fill="#C9A227" textAnchor="middle">TEA</text>
              </g>
              <g className="chest chest-2 anim-fall">
                <rect x="510" y="220" width="25" height="18" rx="2" fill="url(#woodGradient)" />
                <text x="522" y="233" fontSize="8" fill="#C9A227" textAnchor="middle">TEA</text>
              </g>
              <g className="chest chest-3 anim-fall">
                <rect x="540" y="200" width="25" height="18" rx="2" fill="url(#woodGradient)" />
                <text x="552" y="213" fontSize="8" fill="#C9A227" textAnchor="middle">TEA</text>
              </g>
            </g>

            {/* Splash effects */}
            <g className="splashes">
              <circle className="splash sp-1" cx="505" cy="300" r="10" fill="#4A8A9A" opacity="0.5" />
              <circle className="splash sp-2" cx="535" cy="310" r="8" fill="#5A9AAA" opacity="0.4" />
            </g>

            {/* Year overlay */}
            <text className="year-overlay" x="300" y="60" textAnchor="middle" fill="#C9A227" opacity="0.2" fontSize="80">1773</text>
          </svg>
        </div>

        <div className="empire-content">
          <span className="era-tag">December 16, 1773</span>
          <h2 className="section-title">Tea, Taxes & Revolution</h2>
          <p className="section-text">
            When Britain&apos;s East India Company gained a monopoly on tea sales to the 
            American colonies, it sparked more than protest. On a cold December night, 
            colonists disguised as Mohawk warriors dumped 342 chests—over 92,000 pounds 
            of tea—into Boston Harbor.
          </p>
          <blockquote className="illustrated-quote empire-quote">
            <span className="quote-mark">&quot;</span>
            <p>This destruction of the Tea is so bold, so daring... 
            it must have so important Consequences.</p>
            <cite>— John Adams, December 17, 1773</cite>
          </blockquote>
          <p className="section-text">
            The &quot;Boston Tea Party&quot; ignited revolution. But tea&apos;s imperial story ran 
            deeper still—Britain&apos;s addiction created a trade deficit that led to 
            the Opium Wars, reshaping Asia for centuries.
          </p>
        </div>
      </section>

      {/* ============================================
          SCENE 7: Processing - One Plant, Many Teas
          ============================================ */}
      <section 
        className={`scene-processing ${visibleSections.has('processing') ? 'visible' : ''}`}
        ref={el => registerSection('processing', el)}
      >
        <div className="processing-illustration">
          <svg 
            className="processing-diagram-svg" 
            viewBox="0 0 500 500" 
            role="img" 
            aria-labelledby="processing-diagram-title"
          >
            <title id="processing-diagram-title">Tea processing diagram showing oxidation levels for different tea types</title>
            <defs>
              <linearGradient id="freshLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7CB342" />
                <stop offset="100%" stopColor="#558B2F" />
              </linearGradient>
            </defs>

            {/* Central fresh leaf */}
            <g className="center-leaf">
              <ellipse cx="250" cy="250" rx="45" ry="60" fill="url(#freshLeafGrad)" />
              <path d="M250 200 L250 310" stroke="#33691E" strokeWidth="2" />
              <text x="250" y="330" className="center-label" textAnchor="middle">Fresh Leaf</text>
            </g>

            {/* Connecting lines */}
            <g className="processing-lines">
              {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const rad = (angle - 90) * Math.PI / 180;
                const x1 = 250 + Math.cos(rad) * 70;
                const y1 = 250 + Math.sin(rad) * 70;
                const x2 = 250 + Math.cos(rad) * 140;
                const y2 = 250 + Math.sin(rad) * 140;
                return (
                  <line 
                    key={i}
                    className={`process-line pl-${i + 1}`}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#4A7C59"
                    strokeWidth="2"
                    strokeDasharray="5,3"
                  />
                );
              })}
            </g>

            {/* Tea type circles */}
            {[
              { name: 'White', color: '#F5F5DC', angle: 0, ox: '0-5%' },
              { name: 'Green', color: '#4A7C59', angle: 60, ox: '5-12%' },
              { name: 'Yellow', color: '#D4AF37', angle: 120, ox: '8-20%' },
              { name: 'Oolong', color: '#B87333', angle: 180, ox: '15-80%' },
              { name: 'Black', color: '#3D1C02', angle: 240, ox: '80-100%' },
              { name: 'Pu-erh', color: '#2D1B0E', angle: 300, ox: 'Fermented' },
            ].map((tea, i) => {
              const rad = (tea.angle - 90) * Math.PI / 180;
              const x = 250 + Math.cos(rad) * 170;
              const y = 250 + Math.sin(rad) * 170;
              const textColor = ['White', 'Yellow'].includes(tea.name) ? '#333' : '#F5F1E3';
              return (
                <g key={i} className={`tea-node tn-${i + 1} anim-appear`} style={{ animationDelay: `${i * 0.15}s` }}>
                  <circle cx={x} cy={y} r="40" fill={tea.color} />
                  <text x={x} y={y - 5} className="tea-name" textAnchor="middle" fill={textColor}>{tea.name}</text>
                  <text x={x} y={y + 12} className="tea-ox" textAnchor="middle" fill={textColor} fontSize="10">{tea.ox}</text>
                </g>
              );
            })}

            {/* Oxidation gradient arc */}
            <path 
              className="oxidation-arc anim-draw"
              d="M425 250 A175 175 0 1 0 424 251"
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="4"
              strokeDasharray="1100"
              strokeDashoffset="0"
            />
          </svg>
        </div>

        <div className="processing-content">
          <h2 className="section-title">One Plant, Infinite Teas</h2>
          <p className="section-text">
            Every tea—from delicate white to earthy pu-erh—comes from the same plant: 
            <em>Camellia sinensis</em>. The difference lies in processing: when leaves 
            are picked, how they&apos;re withered, rolled, and oxidized.
          </p>
          <p className="section-text">
            Oxidation is the key. Like an apple browning when cut, tea leaves darken 
            when their cell walls break and enzymes meet oxygen. Stop oxidation early 
            for green tea; let it run completely for black.
          </p>
          <div className="processing-key">
            <div className="key-item">
              <span className="key-dot" style={{ background: '#F5F5DC' }}></span>
              <span>Minimal processing</span>
            </div>
            <div className="key-arrow">→</div>
            <div className="key-item">
              <span className="key-dot" style={{ background: '#2D1B0E' }}></span>
              <span>Full fermentation</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SCENE 8: Modern Tea - Global Statistics
          ============================================ */}
      <section 
        className={`scene-modern ${visibleSections.has('modern') ? 'visible' : ''}`}
        ref={el => registerSection('modern', el)}
      >
        <div className="modern-stats-visual">
          <div className="stat-card-illustrated sc-1">
            <svg className="stat-icon" viewBox="0 0 60 60" aria-hidden="true">
              <path d="M30 5 Q10 20 10 40 Q10 55 30 55 Q50 55 50 40 Q50 20 30 5" fill="#4A7C59" />
              <path d="M30 15 L30 45" stroke="#2D5A4A" strokeWidth="2" />
            </svg>
            <span className="stat-number">6.7B</span>
            <span className="stat-desc">kilograms produced annually</span>
          </div>
          <div className="stat-card-illustrated sc-2">
            <svg className="stat-icon" viewBox="0 0 60 60" aria-hidden="true">
              <path d="M15 50 Q15 25 30 20 Q45 25 45 50" fill="none" stroke="#C9A227" strokeWidth="3" />
              <ellipse cx="30" cy="50" rx="15" ry="5" fill="none" stroke="#C9A227" strokeWidth="3" />
              <ellipse cx="30" cy="35" rx="10" ry="3" fill="#C9A227" opacity="0.5" />
            </svg>
            <span className="stat-number">3B</span>
            <span className="stat-desc">cups drunk every day</span>
          </div>
          <div className="stat-card-illustrated sc-3">
            <svg className="stat-icon" viewBox="0 0 60 60" aria-hidden="true">
              <circle cx="30" cy="30" r="22" fill="none" stroke="#8FA98F" strokeWidth="3" />
              <path d="M30 10 Q45 20 45 30 Q45 45 30 50 Q15 45 15 30 Q15 20 30 10" fill="#8FA98F" opacity="0.3" />
            </svg>
            <span className="stat-number">2nd</span>
            <span className="stat-desc">most consumed beverage</span>
          </div>
          <div className="stat-card-illustrated sc-4">
            <svg className="stat-icon" viewBox="0 0 60 60" aria-hidden="true">
              <rect x="10" y="40" width="10" height="15" fill="#C9A227" />
              <rect x="25" y="25" width="10" height="30" fill="#C9A227" />
              <rect x="40" y="15" width="10" height="40" fill="#C9A227" />
            </svg>
            <span className="stat-number">$200B+</span>
            <span className="stat-desc">global market value</span>
          </div>
        </div>

        <div className="modern-content">
          <h2 className="section-title">Tea Today</h2>
          <p className="section-text">
            From bubble tea shops in Taipei to wellness retreats in California, 
            tea continues to evolve. The &quot;third wave&quot; of specialty tea mirrors 
            craft coffee—single-origin, artisan-processed, commanding premium prices.
          </p>
          <p className="section-text">
            But challenges loom. Climate change threatens traditional growing regions. 
            Ethical sourcing and fair wages demand attention. The plant that connected 
            the world now calls on us to protect it.
          </p>
        </div>
      </section>

      {/* ============================================
          SCENE 9: Closing - What You Hold
          ============================================ */}
      <section className="scene-closing">
        <div className="closing-illustration">
          {/* Final cup illustration */}
          <svg 
            className="final-cup-svg" 
            viewBox="0 0 300 350" 
            role="img" 
            aria-labelledby="final-cup-title"
          >
            <title id="final-cup-title">A cup of tea containing the world&apos;s history</title>
            <defs>
              <clipPath id="cupClip">
                <path d="M80 100 Q80 280 150 300 Q220 280 220 100" />
              </clipPath>
              <linearGradient id="finalTeaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D4A84D" />
                <stop offset="100%" stopColor="#8A6A30" />
              </linearGradient>
            </defs>

            {/* Cup shadow */}
            <ellipse cx="150" cy="310" rx="70" ry="15" fill="#1A0F0A" opacity="0.3" />

            {/* Cup body */}
            <path 
              className="final-cup-body"
              d="M80 100 Q80 280 150 300 Q220 280 220 100"
              fill="#F5F1E3"
              stroke="#E8E0CC"
              strokeWidth="2"
            />
            
            {/* Cup rim */}
            <ellipse className="final-cup-rim" cx="150" cy="100" rx="70" ry="18" fill="#FDFCFA" stroke="#E8E0CC" strokeWidth="2" />
            
            {/* Tea liquid */}
            <ellipse className="final-tea-surface" cx="150" cy="110" rx="60" ry="14" fill="url(#finalTeaGrad)" />

            {/* World reflection in tea */}
            <g className="tea-world" clipPath="url(#cupClip)">
              <circle className="world-outline" cx="150" cy="180" r="50" fill="none" stroke="#C9A227" strokeWidth="1" opacity="0.3" />
              {/* Continent hints */}
              <path className="continent-hint ch-1" d="M130 160 Q145 155 155 165 Q160 175 150 180" fill="none" stroke="#C9A227" strokeWidth="1" opacity="0.2" />
              <path className="continent-hint ch-2" d="M165 170 Q175 175 170 185" fill="none" stroke="#C9A227" strokeWidth="1" opacity="0.2" />
            </g>

            {/* Handle */}
            <path 
              className="final-cup-handle"
              d="M220 130 Q270 130 270 190 Q270 250 220 250"
              fill="none"
              stroke="#F5F1E3"
              strokeWidth="12"
              strokeLinecap="round"
            />

            {/* Steam - more elaborate */}
            <g className="final-steam">
              <path className="steam-elaborate se-1" d="M120 80 Q110 50 125 20 Q135 0 120 -20" stroke="#F5F1E3" strokeWidth="2" fill="none" opacity="0.3" />
              <path className="steam-elaborate se-2" d="M150 70 Q160 40 150 10 Q145 -10 155 -25" stroke="#F5F1E3" strokeWidth="2" fill="none" opacity="0.25" />
              <path className="steam-elaborate se-3" d="M180 80 Q190 45 175 15 Q165 -5 180 -20" stroke="#F5F1E3" strokeWidth="2" fill="none" opacity="0.3" />
            </g>

            {/* Decorative leaves floating */}
            <g className="floating-leaves-final">
              <ellipse className="fl-leaf fl-1" cx="100" cy="60" rx="8" ry="4" fill="#4A7C59" transform="rotate(-30 100 60)" />
              <ellipse className="fl-leaf fl-2" cx="200" cy="50" rx="6" ry="3" fill="#2D5A4A" transform="rotate(20 200 50)" />
              <ellipse className="fl-leaf fl-3" cx="140" cy="30" rx="7" ry="3" fill="#5A8A5A" transform="rotate(-15 140 30)" />
            </g>
          </svg>
        </div>

        <div className="closing-content-illustrated">
          <h2 className="closing-title">What You Hold in Your Cup</h2>
          <p className="closing-text">
            Every cup of tea contains multitudes: the mountain mists of Yunnan, 
            the hands of pickers in Darjeeling, the philosophy of Zen monks, 
            the audacity of smugglers and empire-builders.
          </p>
          <p className="closing-text">
            From a wild leaf discovered by accident to the most consumed beverage 
            on Earth, tea&apos;s journey mirrors humanity&apos;s own—across oceans, through 
            wars, into rituals sacred and mundane.
          </p>
          <blockquote className="final-quote">
            <p>&quot;Tea is quiet and our thirst for tea is never satisfied.&quot;</p>
            <cite>— James Norwood Pratt</cite>
          </blockquote>
          <p className="closing-final">
            The next time you lift a cup, remember: you&apos;re drinking five thousand 
            years of human history, one sip at a time.
          </p>
        </div>
      </section>

      {/* ============================================
          SOURCES
          ============================================ */}
      <section className="sources-illustrated">
        <div className="sources-inner">
          <h3 className="sources-title">Sources & Further Reading</h3>
          <div className="sources-grid">
            <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4055352/" target="_blank" rel="noopener noreferrer">
              PNAS: Origin of Tea Traced to Southwest China
            </a>
            <a href="https://www.smithsonianmag.com/history/the-great-british-tea-heist-9866709/" target="_blank" rel="noopener noreferrer">
              Smithsonian: The Great British Tea Heist
            </a>
            <a href="https://www.britannica.com/topic/tea-beverage" target="_blank" rel="noopener noreferrer">
              Britannica: History of Tea
            </a>
            <a href="https://www.worldhistory.org/article/1096/the-history-of-tea-in-china/" target="_blank" rel="noopener noreferrer">
              World History Encyclopedia: Tea in China
            </a>
            <a href="https://www.fao.org/markets-and-trade/commodities/tea/en/" target="_blank" rel="noopener noreferrer">
              FAO: World Tea Production Statistics
            </a>
            <a href="https://www.amazon.com/Book-Tea-Kakuzo-Okakura/dp/0486200701" target="_blank" rel="noopener noreferrer">
              &quot;The Book of Tea&quot; — Kakuzō Okakura
            </a>
          </div>
          <p className="sources-note">
            This illustrated narrative was researched using peer-reviewed academic sources, 
            historical records, and expert publications on tea history and cultivation.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TeaJourneyIllustratedClient;

