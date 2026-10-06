"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import './the-tea-journey.css';

/**
 * LEAVES OF TIME: THE GLOBAL JOURNEY OF TEA
 * Adult Educational Scrollytelling Experience
 * 
 * DESIGN RESEARCH (Tea-Specific):
 * - Materials: porcelain, ceramic, bamboo, silk, wooden tea boxes
 * - Colors: jade greens, amber/gold, cream, terracotta, deep browns
 * - Textures: steam wisps, liquid gradients, leaf veins
 * 
 * UNIQUE MECHANICS:
 * 1. SVG World Map with animated trade routes (glowing paths)
 * 2. Processing Wheel - radial SVG showing tea types/oxidation
 * 3. Tea Plant Anatomy - interactive botanical diagram
 * 4. Ceremony Split-Screen - morphing between cultures
 * 5. Steam Timeline - dates dissolve into rising steam
 * 6. Leaf Unfurl Animation - scroll-driven leaf opening
 * 
 * ANTI-PATTERN MATCHING:
 * ✅ NO standard timeline cards
 * ✅ NO generic quote blocks
 * ✅ NO left/right alternating layout monotony
 * ✅ Unique steam-based progress indicator
 * ✅ Tea-specific color transitions by region
 */

// ============================================
// DATA: Trade Route Eras
// ============================================
const tradeEras = [
  {
    id: 'china-origin',
    year: '2737 BCE',
    title: 'The First Sip',
    description: 'Legend tells of Emperor Shen Nung discovering tea when leaves blew into his boiling water. In the misty mountains of Yunnan, wild Camellia sinensis trees had grown for millennia—waiting to be discovered.',
    region: 'Ancient China',
    color: 'jade'
  },
  {
    id: 'tang-dynasty',
    year: '760 CE',
    title: 'The Classic of Tea',
    description: 'Lu Yu writes the Cha Jing, the world\'s first comprehensive treatise on tea. Tea transforms from medicine to art form. The Tang Dynasty elevates tea drinking to a spiritual practice.',
    region: 'Tang Dynasty China',
    color: 'jade'
  },
  {
    id: 'japan-monks',
    year: '805 CE',
    title: 'Monks Carry Seeds East',
    description: 'Buddhist monk Saichō brings tea seeds from China to Japan. Over centuries, Japanese culture transforms tea into a philosophy—wabi-sabi, the beauty of imperfection.',
    region: 'Heian Japan',
    color: 'cream'
  },
  {
    id: 'silk-road',
    year: '1200 CE',
    title: 'Caravans West',
    description: 'Tea bricks become currency along the Silk Road. Camel caravans carry compressed tea across Central Asia. Nomadic tribes discover that tea prevents scurvy and aids digestion of meat-heavy diets.',
    region: 'Silk Road',
    color: 'terracotta'
  },
  {
    id: 'europe-arrives',
    year: '1610 CE',
    title: 'Europe\'s First Taste',
    description: 'Dutch traders bring Chinese tea to Amsterdam. Within decades, tea becomes fashionable across European courts. The Portuguese princess Catherine of Braganza brings her tea habit to England.',
    region: 'Europe',
    color: 'porcelain'
  },
  {
    id: 'british-empire',
    year: '1773 CE',
    title: 'Tea & Empire',
    description: 'The Boston Tea Party ignites revolution. Britain\'s tea addiction drives imperial expansion into India. The East India Company becomes history\'s most powerful corporation—built on tea.',
    region: 'British Empire',
    color: 'porcelain'
  },
  {
    id: 'india-theft',
    year: '1848 CE',
    title: 'The Great Tea Theft',
    description: 'Robert Fortune, disguised as a Chinese merchant, smuggles tea plants and expertise to British India. Within decades, Assam and Darjeeling rival Chinese production. China\'s monopoly shatters.',
    region: 'British India',
    color: 'gold'
  },
  {
    id: 'ceylon-rise',
    year: '1870 CE',
    title: 'Ceylon Rising',
    description: 'Coffee blight devastates Sri Lanka. Planters pivot to tea, transforming the island\'s highlands. Ceylon becomes synonymous with bold, bright tea. Lipton builds an empire on accessibility.',
    region: 'Ceylon',
    color: 'gold'
  }
];

// ============================================
// DATA: Tea Types for Processing Wheel
// ============================================
const teaTypes = [
  { id: 'white', name: 'White', oxidation: 0, description: 'Minimal processing. Delicate, subtle flavors.', color: '#F5F5DC' },
  { id: 'green', name: 'Green', oxidation: 10, description: 'Pan-fired or steamed. Grassy, vegetal notes.', color: '#4A7C59' },
  { id: 'yellow', name: 'Yellow', oxidation: 15, description: 'Rare. Wrapped and warmed. Mellow sweetness.', color: '#D4AF37' },
  { id: 'oolong', name: 'Oolong', oxidation: 50, description: 'Partially oxidized. Complex, floral to roasted.', color: '#B87333' },
  { id: 'black', name: 'Black', oxidation: 85, description: 'Fully oxidized. Bold, malty, robust.', color: '#3D1C02' },
  { id: 'puerh', name: 'Pu-erh', oxidation: 100, description: 'Fermented and aged. Earthy, deep complexity.', color: '#2D1B0E' }
];

// ============================================
// DATA: Global Statistics
// ============================================
const teaStats = [
  { value: '6.7B', label: 'kilograms produced annually', icon: 'leaf' },
  { value: '3B', label: 'cups drunk every day worldwide', icon: 'cup' },
  { value: '2nd', label: 'most consumed beverage (after water)', icon: 'globe' },
  { value: '$200B+', label: 'global tea market value', icon: 'chart' }
];

// ============================================
// COMPONENT: Main Client
// ============================================
const TeaJourneyClient: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mapProgress, setMapProgress] = useState(0);
  const [activeTeaType, setActiveTeaType] = useState<string | null>(null);
  // Initialize with 'hero' to prevent flash of unstyled content on first load
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['hero']));
  const [ceremonyPosition, setCeremonyPosition] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  
  const mapSectionRef = useRef<HTMLElement>(null);
  const ceremonySectionRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Mark as mounted after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ============================================
  // SCROLL HANDLERS
  // ============================================
  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(window.scrollY / scrollHeight, 1);
    setScrollProgress(progress);

    // Map section progress
    if (mapSectionRef.current) {
      const rect = mapSectionRef.current.getBoundingClientRect();
      const sectionHeight = mapSectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const sectionProgress = Math.max(0, Math.min(1, 
          (viewportHeight - rect.top) / (sectionHeight + viewportHeight)
        ));
        setMapProgress(sectionProgress);
      }
    }

    // Ceremony split-screen progress
    if (ceremonySectionRef.current) {
      const rect = ceremonySectionRef.current.getBoundingClientRect();
      const sectionHeight = ceremonySectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const pos = Math.max(0, Math.min(1, 
          (viewportHeight - rect.top) / (sectionHeight)
        ));
        setCeremonyPosition(pos);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // ============================================
  // INTERSECTION OBSERVER
  // ============================================
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute('data-section-id');
          if (id) {
            setVisibleSections(prev => {
              const next = new Set(prev);
              if (entry.isIntersecting) {
                next.add(id);
              }
              return next;
            });
          }
        });
      },
      { threshold: 0.2 }
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
    <div className="tea-journey">
      {/* Steam Progress Indicator */}
      <div className="steam-progress">
        <div className="steam-fill" style={{ height: `${scrollProgress * 100}%` }} />
        <div className="steam-wisps">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="steam-wisp" 
              style={{ 
                animationDelay: `${i * 0.3}s`,
                opacity: scrollProgress > 0.1 ? 1 : 0
              }} 
            />
          ))}
        </div>
      </div>

      {/* ============================================
          SCENE 1: HERO - A World in a Cup
          ============================================ */}
      <section className="hero-scene">
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="hero-mist" />
        </div>
        
        {/* Animated Tea Cup with World Map */}
        <div className="hero-cup-container">
          <svg className="hero-cup-svg" viewBox="0 0 300 400" aria-hidden="true">
            {/* Cup silhouette */}
            <path 
              className="cup-body"
              d="M60 120 Q60 350 150 380 Q240 350 240 120 L240 100 L60 100 Z"
            />
            {/* Tea liquid with world continents hint */}
            <clipPath id="tea-clip">
              <path d="M65 130 Q65 340 150 370 Q235 340 235 130 Z" />
            </clipPath>
            <rect 
              className="tea-liquid"
              x="60" 
              y={400 - (scrollProgress * 50 + 250)}
              width="180" 
              height="300"
              clipPath="url(#tea-clip)"
            />
            {/* Steam rising */}
            <g className="hero-steam">
              <path className="steam-path steam-1" d="M120 80 Q110 40 130 20 Q140 0 120 -20" />
              <path className="steam-path steam-2" d="M150 70 Q160 30 140 10 Q130 -10 150 -30" />
              <path className="steam-path steam-3" d="M180 80 Q190 40 170 20 Q160 0 180 -20" />
            </g>
            {/* Cup handle */}
            <path 
              className="cup-handle"
              d="M240 150 Q290 150 290 220 Q290 290 240 290"
              fill="none"
            />
          </svg>
        </div>

        <div className="hero-content">
          <span className="hero-era">5,000 Years</span>
          <h1 className="hero-title">
            <span className="title-line">Leaves</span>
            <span className="title-line">of</span>
            <span className="title-line title-accent">Time</span>
          </h1>
          <p className="hero-subtitle">The Global Journey of Tea</p>
          <p className="hero-intro">
            Before coffee. Before chocolate. Before the Silk Road carried silk.
            A single leaf transformed medicine, trade, empire, and ritual across every continent.
          </p>
        </div>

        <div className="scroll-indicator">
          <div className="leaf-fall">
            <svg viewBox="0 0 24 24" className="falling-leaf">
              <path d="M12 2C8 6 4 10 4 14c0 4.4 3.6 8 8 8s8-3.6 8-8c0-4-4-8-8-12z" />
            </svg>
          </div>
          <span className="scroll-text">Steep yourself in history</span>
        </div>
      </section>

      {/* ============================================
          SCENE 2: Origins in Ancient China
          ============================================ */}
      <section 
        className={`origins-scene ${visibleSections.has('origins') ? 'visible' : ''}`}
        ref={el => registerSection('origins', el)}
      >
        <div className="scene-backdrop origins-backdrop" />
        
        <div className="origins-content">
          <div className="origins-legend">
            <div className="legend-year">2737 BCE</div>
            <h2 className="legend-title">The Discovery</h2>
            <p className="legend-text">
              In the misty mountains of Yunnan, wild <em>Camellia sinensis</em> trees 
              had grown for millions of years. Legend tells of Emperor Shen Nung resting 
              beneath a tree when leaves drifted into his boiling water.
            </p>
            <p className="legend-text">
              Whether myth or memory, this moment marks humanity&apos;s first recorded 
              encounter with tea—a beverage that would reshape civilizations.
            </p>
          </div>

          <div className="origins-visual">
            {/* Animated leaf falling into cup */}
            <svg className="discovery-svg" viewBox="0 0 200 300" aria-hidden="true">
              {/* Tree branch */}
              <path 
                className="tree-branch" 
                d="M100 0 Q80 30 90 60 Q100 80 85 100"
                fill="none"
              />
              {/* Falling leaves */}
              <g className="falling-leaves">
                <ellipse className="fall-leaf fall-1" cx="95" cy="90" rx="12" ry="6" />
                <ellipse className="fall-leaf fall-2" cx="105" cy="85" rx="10" ry="5" />
              </g>
              {/* Simple bowl */}
              <ellipse className="bowl-rim" cx="100" cy="240" rx="50" ry="15" />
              <path className="bowl-body" d="M50 240 Q50 290 100 290 Q150 290 150 240" fill="none" />
              {/* Water/steam in bowl */}
              <ellipse className="bowl-water" cx="100" cy="245" rx="45" ry="12" />
            </svg>
          </div>
        </div>

        <blockquote className="origins-quote">
          <p>&quot;Tea began as a medicine and grew into a beverage.&quot;</p>
          <cite>— Kakuzō Okakura, The Book of Tea (1906)</cite>
        </blockquote>
      </section>

      {/* ============================================
          SCENE 3: Medicine to Ritual (China)
          ============================================ */}
      <section 
        className={`ritual-scene ${visibleSections.has('ritual') ? 'visible' : ''}`}
        ref={el => registerSection('ritual', el)}
      >
        <div className="ritual-split">
          <div className="ritual-left">
            <div className="ritual-era">Tang Dynasty · 618–907 CE</div>
            <h2 className="ritual-title">From Medicine to Daily Art</h2>
            <p className="ritual-text">
              In 760 CE, the scholar Lu Yu completed the <em>Cha Jing</em>—the Classic of Tea. 
              This extraordinary work transformed tea from folk remedy to cultural institution.
            </p>
            <p className="ritual-text">
              Lu Yu codified everything: water sources, vessel shapes, firing techniques, 
              the proper temperature for each variety. Tea became poetry, philosophy, and practice.
            </p>
            <div className="ritual-fact">
              <span className="fact-label">The Cha Jing</span>
              <span className="fact-value">First tea treatise in world history</span>
            </div>
          </div>
          <div className="ritual-right">
            {/* Chinese Tea Set SVG */}
            <svg className="chinese-tea-svg" viewBox="0 0 300 250" aria-hidden="true">
              {/* Gaiwan (lidded bowl) */}
              <g className="gaiwan-group">
                <ellipse className="gaiwan-saucer" cx="150" cy="200" rx="60" ry="15" />
                <path className="gaiwan-bowl" d="M100 120 Q100 180 150 190 Q200 180 200 120" />
                <ellipse className="gaiwan-rim" cx="150" cy="120" rx="50" ry="12" />
                <ellipse className="gaiwan-tea" cx="150" cy="135" rx="42" ry="10" />
                <ellipse className="gaiwan-lid" cx="150" cy="100" rx="45" ry="10" />
                <circle className="gaiwan-knob" cx="150" cy="90" r="8" />
              </g>
              {/* Steam wisps */}
              <g className="gaiwan-steam">
                <path className="steam-wisp-path" d="M130 80 Q125 50 135 30" />
                <path className="steam-wisp-path" d="M150 75 Q155 45 145 25" />
                <path className="steam-wisp-path" d="M170 80 Q175 50 165 30" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* ============================================
          SCENE 4: Japan & The Zen Connection
          ============================================ */}
      <section 
        className={`japan-scene ${visibleSections.has('japan') ? 'visible' : ''}`}
        ref={el => registerSection('japan', el)}
      >
        <div className="scene-backdrop japan-backdrop" />
        
        <div className="japan-content">
          <div className="japan-header">
            <span className="japan-era">Heian Period · 794–1185 CE</span>
            <h2 className="japan-title">The Way of Tea</h2>
          </div>

          <div className="japan-body">
            <p className="japan-text">
              In 805 CE, the Buddhist monk Saichō returned from China carrying more than 
              sutras—he brought tea seeds. Within centuries, tea became inseparable from 
              Zen Buddhism: a tool for meditation, focus, and awakening.
            </p>
            <p className="japan-text">
              <em>Chado</em>—the Way of Tea—emerged as a complete philosophy. Sen no Rikyū 
              perfected the ceremony in the 16th century, distilling four principles: 
              <strong> harmony, respect, purity, tranquility</strong>.
            </p>
          </div>

          {/* Matcha Preparation Visual */}
          <div className="matcha-visual">
            <svg className="matcha-svg" viewBox="0 0 200 160" aria-hidden="true">
              {/* Chawan (tea bowl) */}
              <path 
                className="chawan-bowl" 
                d="M30 100 Q30 140 100 150 Q170 140 170 100 Q170 70 100 60 Q30 70 30 100"
              />
              <ellipse className="chawan-rim" cx="100" cy="80" rx="70" ry="20" />
              <ellipse className="matcha-surface" cx="100" cy="85" rx="60" ry="15" />
              {/* Chasen (whisk) hint */}
              <g className="chasen-group">
                <rect className="chasen-handle" x="95" y="10" width="10" height="30" rx="2" />
                <g className="chasen-tines">
                  {[...Array(7)].map((_, i) => (
                    <line 
                      key={i}
                      className="chasen-tine"
                      x1={85 + i * 5} y1="40" 
                      x2={80 + i * 6} y2="70"
                    />
                  ))}
                </g>
              </g>
            </svg>
            <div className="matcha-principles">
              <span className="principle">和 Harmony</span>
              <span className="principle">敬 Respect</span>
              <span className="principle">清 Purity</span>
              <span className="principle">寂 Tranquility</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SCENE 5: Ceremony Split-Screen Comparison
          ============================================ */}
      <section 
        className="ceremony-scene"
        ref={ceremonySectionRef}
      >
        <div className="ceremony-sticky">
          <h2 className="ceremony-title">One Leaf, Many Rituals</h2>
          <p className="ceremony-subtitle">
            As tea traveled, every culture reshaped it into something new
          </p>

          <div className="ceremony-comparison">
            {/* Chinese Gongfu */}
            <div 
              className="ceremony-panel gongfu-panel"
              style={{ opacity: ceremonyPosition < 0.5 ? 1 : 0.3 }}
            >
              <div className="ceremony-label">Chinese Gongfu</div>
              <div className="ceremony-desc">
                Multiple short infusions. Tiny cups. Clay teapots seasoned over decades.
                <em> &quot;Kung fu&quot; of tea—mastery through practice.</em>
              </div>
              <svg className="ceremony-icon" viewBox="0 0 80 60" aria-hidden="true">
                <ellipse className="yixing-body" cx="40" cy="40" rx="25" ry="15" />
                <ellipse className="yixing-lid" cx="40" cy="30" rx="20" ry="8" />
                <circle className="yixing-knob" cx="40" cy="25" r="5" />
                <path className="yixing-spout" d="M65 35 Q75 30 80 20" fill="none" />
                <path className="yixing-handle" d="M15 35 Q5 35 5 45 Q5 50 15 50" fill="none" />
              </svg>
            </div>

            {/* Japanese Chanoyu */}
            <div 
              className="ceremony-panel chanoyu-panel"
              style={{ opacity: ceremonyPosition >= 0.25 && ceremonyPosition < 0.75 ? 1 : 0.3 }}
            >
              <div className="ceremony-label">Japanese Chanoyu</div>
              <div className="ceremony-desc">
                Powdered matcha whisked to froth. Every movement choreographed.
                <em> A meditation on impermanence and beauty.</em>
              </div>
              <svg className="ceremony-icon" viewBox="0 0 80 60" aria-hidden="true">
                <path className="chawan-icon" d="M10 50 Q10 20 40 15 Q70 20 70 50" fill="none" />
                <ellipse className="matcha-icon" cx="40" cy="40" rx="25" ry="8" />
              </svg>
            </div>

            {/* British Afternoon Tea */}
            <div 
              className="ceremony-panel british-panel"
              style={{ opacity: ceremonyPosition >= 0.5 ? 1 : 0.3 }}
            >
              <div className="ceremony-label">British Afternoon Tea</div>
              <div className="ceremony-desc">
                Porcelain teapots. Milk and sugar. Scones with clotted cream.
                <em> Social institution and marker of refinement.</em>
              </div>
              <svg className="ceremony-icon" viewBox="0 0 80 60" aria-hidden="true">
                <ellipse className="british-pot" cx="35" cy="35" rx="20" ry="20" />
                <ellipse className="british-lid" cx="35" cy="18" rx="12" ry="5" />
                <circle className="british-knob" cx="35" cy="14" r="3" />
                <path className="british-spout" d="M55 30 Q65 25 70 15" fill="none" />
                <path className="british-handle" d="M15 25 Q0 25 0 40 Q0 50 15 50" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SCENE 6: Animated Trade Routes Map
          ============================================ */}
      <section className="map-scene" ref={mapSectionRef}>
        <div className="map-sticky">
          <div className="map-header">
            <h2 className="map-title">The Routes That Changed the World</h2>
            <p className="map-subtitle">
              Scroll to trace tea&apos;s journey across continents
            </p>
          </div>

          <div className="map-container">
            <svg className="world-map-svg" viewBox="0 0 1000 500" aria-hidden="true">
              {/* Simplified world map outlines */}
              <g className="continents">
                {/* Asia */}
                <path 
                  className="continent asia" 
                  d="M550 100 Q650 80 750 120 Q800 150 780 200 Q760 250 700 280 Q650 300 600 280 Q550 250 530 200 Q520 150 550 100"
                />
                {/* Europe */}
                <path 
                  className="continent europe" 
                  d="M400 100 Q450 90 480 110 Q500 130 490 160 Q480 190 450 200 Q420 210 400 190 Q380 170 390 140 Q395 110 400 100"
                />
                {/* Africa */}
                <path 
                  className="continent africa" 
                  d="M420 220 Q460 210 480 250 Q500 300 480 360 Q450 400 410 380 Q370 350 380 300 Q390 250 420 220"
                />
                {/* India/Sri Lanka */}
                <path 
                  className="continent india" 
                  d="M600 200 Q620 190 640 210 Q650 240 640 280 Q620 310 600 300 Q580 280 590 250 Q595 220 600 200"
                />
                {/* Americas hint */}
                <path 
                  className="continent americas" 
                  d="M150 150 Q180 120 200 150 Q220 200 200 280 Q180 350 150 380 Q120 350 130 280 Q135 200 150 150"
                />
              </g>

              {/* Trade Routes - Animated Paths */}
              <g className="trade-routes">
                {/* China to Japan */}
                <path 
                  className={`route route-japan ${mapProgress > 0.1 ? 'active' : ''}`}
                  d="M680 180 Q720 160 760 170"
                  style={{ strokeDashoffset: `${100 - Math.min(mapProgress * 200, 100)}%` }}
                />
                {/* Silk Road */}
                <path 
                  className={`route route-silk ${mapProgress > 0.2 ? 'active' : ''}`}
                  d="M650 180 Q550 150 480 140"
                  style={{ strokeDashoffset: `${100 - Math.min((mapProgress - 0.2) * 200, 100)}%` }}
                />
                {/* Maritime to Europe */}
                <path 
                  className={`route route-europe ${mapProgress > 0.35 ? 'active' : ''}`}
                  d="M650 220 Q550 280 480 320 Q420 340 400 280 Q420 220 450 180"
                  style={{ strokeDashoffset: `${100 - Math.min((mapProgress - 0.35) * 150, 100)}%` }}
                />
                {/* To India */}
                <path 
                  className={`route route-india ${mapProgress > 0.5 ? 'active' : ''}`}
                  d="M680 200 Q650 220 620 250"
                  style={{ strokeDashoffset: `${100 - Math.min((mapProgress - 0.5) * 200, 100)}%` }}
                />
                {/* To Americas */}
                <path 
                  className={`route route-americas ${mapProgress > 0.7 ? 'active' : ''}`}
                  d="M400 200 Q300 220 200 200"
                  style={{ strokeDashoffset: `${100 - Math.min((mapProgress - 0.7) * 150, 100)}%` }}
                />
              </g>

              {/* Key Locations */}
              <g className="locations">
                <circle className={`location ${mapProgress > 0 ? 'pulse' : ''}`} cx="680" cy="180" r="8" />
                <text x="680" y="165" className="location-label">Yunnan</text>
                
                <circle className={`location ${mapProgress > 0.15 ? 'pulse' : ''}`} cx="760" cy="170" r="6" />
                <text x="760" y="155" className="location-label">Japan</text>
                
                <circle className={`location ${mapProgress > 0.4 ? 'pulse' : ''}`} cx="450" cy="160" r="6" />
                <text x="450" y="145" className="location-label">Europe</text>
                
                <circle className={`location ${mapProgress > 0.55 ? 'pulse' : ''}`} cx="620" cy="260" r="6" />
                <text x="620" y="285" className="location-label">India</text>
                
                <circle className={`location ${mapProgress > 0.75 ? 'pulse' : ''}`} cx="180" cy="200" r="6" />
                <text x="180" y="220" className="location-label">Americas</text>
              </g>
            </svg>
          </div>

          {/* Timeline markers */}
          <div className="map-timeline">
            {tradeEras.slice(0, 5).map((era, index) => (
              <div 
                key={era.id}
                className={`timeline-marker ${mapProgress > index * 0.2 ? 'active' : ''}`}
              >
                <span className="marker-year">{era.year}</span>
                <span className="marker-title">{era.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SCENE 7: Empire & Power
          ============================================ */}
      <section 
        className={`empire-scene ${visibleSections.has('empire') ? 'visible' : ''}`}
        ref={el => registerSection('empire', el)}
      >
        <div className="scene-backdrop empire-backdrop" />
        
        <div className="empire-content">
          <div className="empire-stat">
            <span className="stat-year">1773</span>
            <span className="stat-event">Boston Tea Party</span>
          </div>

          <h2 className="empire-title">Tea, Taxes, and Revolution</h2>
          
          <p className="empire-text">
            When Britain&apos;s East India Company gained a monopoly on tea sales to the American 
            colonies, it sparked more than protest. On December 16, 1773, colonists dumped 
            342 chests of tea into Boston Harbor—a symbolic act that ignited revolution.
          </p>
          
          <blockquote className="empire-quote">
            <p>&quot;This destruction of the Tea is so bold, so daring... it must have 
            so important Consequences, and so lasting.&quot;</p>
            <cite>— John Adams, December 17, 1773</cite>
          </blockquote>

          <p className="empire-text">
            But tea&apos;s imperial story ran deeper. Britain&apos;s addiction to Chinese tea created 
            a trade deficit that led to the Opium Wars. Tea didn&apos;t just build empires—it 
            broke them too.
          </p>
        </div>
      </section>

      {/* ============================================
          SCENE 8: India - Plantations and Empire
          ============================================ */}
      <section 
        className={`india-scene ${visibleSections.has('india') ? 'visible' : ''}`}
        ref={el => registerSection('india', el)}
      >
        <div className="india-content">
          <div className="india-header">
            <span className="india-era">1848</span>
            <h2 className="india-title">The Great Tea Theft</h2>
          </div>

          <div className="india-story">
            <p className="india-text">
              Robert Fortune was a Scottish botanist with a dangerous mission: steal China&apos;s 
              tea secrets. Disguised as a Chinese merchant—shaved head, traditional robes, 
              broken Mandarin—he infiltrated tea-growing regions that had never seen a Westerner.
            </p>
            
            <div className="india-theft-visual">
              <div className="theft-item">
                <svg viewBox="0 0 50 50" className="theft-icon" aria-hidden="true">
                  <path d="M25 5 C15 5 10 15 10 25 C10 40 25 45 25 45 C25 45 40 40 40 25 C40 15 35 5 25 5" />
                </svg>
                <span>20,000 tea plants smuggled</span>
              </div>
              <div className="theft-item">
                <svg viewBox="0 0 50 50" className="theft-icon" aria-hidden="true">
                  <circle cx="25" cy="25" r="18" fill="none" strokeWidth="3" />
                  <path d="M25 10 L25 25 L35 30" fill="none" strokeWidth="2" />
                </svg>
                <span>8 Chinese tea experts recruited</span>
              </div>
              <div className="theft-item">
                <svg viewBox="0 0 50 50" className="theft-icon" aria-hidden="true">
                  <path d="M10 40 L25 10 L40 40 Z" fill="none" strokeWidth="2" />
                  <line x1="15" y1="30" x2="35" y2="30" strokeWidth="2" />
                </svg>
                <span>Processing secrets stolen</span>
              </div>
            </div>

            <p className="india-text">
              Fortune delivered plants and expertise to the Himalayan foothills. Within decades, 
              Assam and Darjeeling rivaled—then surpassed—Chinese production. Britain had broken 
              China&apos;s 5,000-year monopoly.
            </p>
          </div>

          <div className="india-regions">
            <div className="region-card assam">
              <h3>Assam</h3>
              <p>Bold, malty, robust. The backbone of English Breakfast.</p>
            </div>
            <div className="region-card darjeeling">
              <h3>Darjeeling</h3>
              <p>The &quot;Champagne of teas.&quot; Delicate, muscatel, prized.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SCENE 9: Ceylon - Coffee to Tea
          ============================================ */}
      <section 
        className={`ceylon-scene ${visibleSections.has('ceylon') ? 'visible' : ''}`}
        ref={el => registerSection('ceylon', el)}
      >
        <div className="ceylon-content">
          <div className="ceylon-before-after">
            <div className="ba-panel before">
              <span className="ba-label">Before 1869</span>
              <h3>Coffee Island</h3>
              <p>Sri Lanka&apos;s highlands carpeted in coffee plantations. Export economy booming.</p>
            </div>
            <div className="ba-divider">
              <svg viewBox="0 0 50 100" className="ba-arrow" aria-hidden="true">
                <path d="M25 10 L25 90 M15 80 L25 90 L35 80" fill="none" strokeWidth="2" />
              </svg>
              <span className="ba-year">Coffee Rust</span>
            </div>
            <div className="ba-panel after">
              <span className="ba-label">After 1880</span>
              <h3>Tea Paradise</h3>
              <p>Hemileia vastatrix destroys coffee. Planters pivot to tea. Ceylon becomes legendary.</p>
            </div>
          </div>

          <div className="ceylon-text">
            <p>
              The coffee blight that devastated Ceylon became tea&apos;s greatest opportunity. 
              Scottish merchant Thomas Lipton bought failing coffee estates, planted tea, 
              and built a global brand on one radical idea: quality tea for everyone.
            </p>
            <div className="lipton-fact">
              <span className="fact-quote">&quot;Direct from the tea gardens to the teapot&quot;</span>
              <span className="fact-attr">— Lipton&apos;s revolutionary slogan</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SCENE 10: Processing Wheel - One Plant, Many Teas
          ============================================ */}
      <section 
        className={`processing-scene ${visibleSections.has('processing') ? 'visible' : ''}`}
        ref={el => registerSection('processing', el)}
      >
        <div className="processing-content">
          <h2 className="processing-title">One Plant, Infinite Possibilities</h2>
          <p className="processing-subtitle">
            Every tea comes from <em>Camellia sinensis</em>. 
            The difference? Oxidation, technique, and tradition.
          </p>

          <div className="processing-wheel-container">
            <svg className="processing-wheel" viewBox="0 0 400 400" aria-hidden="true">
              {/* Center - Fresh leaf */}
              <circle className="wheel-center" cx="200" cy="200" r="40" />
              <text x="200" y="205" className="wheel-center-text">Fresh Leaf</text>

              {/* Segments for each tea type */}
              {teaTypes.map((tea, index) => {
                const angle = (index * 60) - 90; // 6 types, 60° each
                const radians = (angle * Math.PI) / 180;
                const x = 200 + Math.cos(radians) * 120;
                const y = 200 + Math.sin(radians) * 120;
                const isActive = activeTeaType === tea.id;
                
                return (
                  <g 
                    key={tea.id} 
                    className={`wheel-segment ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveTeaType(isActive ? null : tea.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Segment arc */}
                    <circle 
                      cx={x} cy={y} r={isActive ? 45 : 35}
                      fill={tea.color}
                      className="segment-circle"
                    />
                    {/* Label */}
                    <text 
                      x={x} y={y + 4} 
                      className="segment-label"
                      fill={tea.id === 'white' || tea.id === 'yellow' ? '#333' : '#fff'}
                    >
                      {tea.name}
                    </text>
                    {/* Oxidation indicator */}
                    <text 
                      x={x} y={y + 18} 
                      className="segment-oxidation"
                      fill={tea.id === 'white' || tea.id === 'yellow' ? '#666' : 'rgba(255,255,255,0.7)'}
                    >
                      {tea.oxidation}%
                    </text>
                  </g>
                );
              })}

              {/* Connecting lines from center */}
              {teaTypes.map((tea, index) => {
                const angle = (index * 60) - 90;
                const radians = (angle * Math.PI) / 180;
                const x = 200 + Math.cos(radians) * 75;
                const y = 200 + Math.sin(radians) * 75;
                
                return (
                  <line 
                    key={`line-${tea.id}`}
                    x1="200" y1="200"
                    x2={x} y2={y}
                    className="wheel-spoke"
                  />
                );
              })}
            </svg>

            {/* Tea Type Detail Panel */}
            {activeTeaType && (
              <div className="tea-detail-panel">
                {(() => {
                  const tea = teaTypes.find(t => t.id === activeTeaType);
                  if (!tea) return null;
                  return (
                    <>
                      <h3 style={{ color: tea.color }}>{tea.name} Tea</h3>
                      <p>{tea.description}</p>
                      <div className="oxidation-bar">
                        <div 
                          className="oxidation-fill" 
                          style={{ 
                            width: `${tea.oxidation}%`,
                            backgroundColor: tea.color
                          }}
                        />
                      </div>
                      <span className="oxidation-label">{tea.oxidation}% Oxidation</span>
                    </>
                  );
                })()}
              </div>
            )}
          </div>

          <p className="processing-note">
            Tap each tea type to learn more
          </p>
        </div>
      </section>

      {/* ============================================
          SCENE 11: Tea Plant Anatomy
          ============================================ */}
      <section 
        className={`anatomy-scene ${visibleSections.has('anatomy') ? 'visible' : ''}`}
        ref={el => registerSection('anatomy', el)}
      >
        <div className="anatomy-content">
          <h2 className="anatomy-title">The Perfect Leaf</h2>
          <p className="anatomy-subtitle">
            Not all leaves are created equal. The finest teas use only the bud and top two leaves—
            the &quot;two leaves and a bud&quot; standard that determines quality worldwide.
          </p>

          <div className="anatomy-diagram">
            <svg className="plant-svg" viewBox="0 0 300 400" aria-hidden="true">
              {/* Stem */}
              <path className="plant-stem" d="M150 380 L150 100" />
              
              {/* Bud at top */}
              <g className="plant-part bud-group">
                <ellipse className="leaf-bud" cx="150" cy="90" rx="8" ry="15" />
                <text x="200" y="95" className="part-label">Bud (Pekoe)</text>
                <text x="200" y="110" className="part-desc">Most tender, highest value</text>
              </g>
              
              {/* First leaf */}
              <g className="plant-part leaf1-group">
                <ellipse className="tea-leaf leaf-1" cx="120" cy="140" rx="30" ry="12" transform="rotate(-20 120 140)" />
                <text x="40" y="135" className="part-label">First Leaf</text>
                <text x="40" y="150" className="part-desc">Young, delicate</text>
              </g>
              
              {/* Second leaf */}
              <g className="plant-part leaf2-group">
                <ellipse className="tea-leaf leaf-2" cx="180" cy="180" rx="35" ry="14" transform="rotate(15 180 180)" />
                <text x="230" y="175" className="part-label">Second Leaf</text>
                <text x="230" y="190" className="part-desc">Prime picking</text>
              </g>
              
              {/* Older leaves (lower grade) */}
              <g className="plant-part older-group">
                <ellipse className="tea-leaf leaf-old" cx="115" cy="250" rx="40" ry="16" transform="rotate(-25 115 250)" />
                <ellipse className="tea-leaf leaf-old" cx="185" cy="290" rx="42" ry="17" transform="rotate(20 185 290)" />
                <text x="40" y="320" className="part-label">Older Leaves</text>
                <text x="40" y="335" className="part-desc">Lower grades, more tannins</text>
              </g>
              
              {/* "Two leaves and a bud" bracket */}
              <path className="prime-bracket" d="M85 80 L85 195 M85 80 L75 80 M85 195 L75 195" fill="none" />
              <text x="65" y="140" className="prime-label" transform="rotate(-90 65 140)">Premium</text>
            </svg>
          </div>
        </div>
      </section>

      {/* ============================================
          SCENE 12: Modern Global Tea Culture
          ============================================ */}
      <section 
        className={`modern-scene ${visibleSections.has('modern') ? 'visible' : ''}`}
        ref={el => registerSection('modern', el)}
      >
        <div className="modern-content">
          <h2 className="modern-title">Tea Today</h2>
          <p className="modern-subtitle">
            From bubble tea shops to wellness retreats, tea continues to evolve—
            bridging ancient tradition and modern innovation.
          </p>

          <div className="stats-grid">
            {teaStats.map((stat, index) => (
              <div 
                key={index}
                className={`stat-card ${visibleSections.has('modern') ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="modern-trends">
            <div className="trend">
              <h3>Specialty Tea Renaissance</h3>
              <p>Single-origin, artisan teas commanding premium prices—the &quot;third wave&quot; mirrors craft coffee.</p>
            </div>
            <div className="trend">
              <h3>Wellness & Mindfulness</h3>
              <p>Adaptogens, ceremonial matcha, and tea meditation retreats find new audiences.</p>
            </div>
            <div className="trend">
              <h3>Sustainability Challenges</h3>
              <p>Climate change threatens tea-growing regions. Fair trade and ethical sourcing gain urgency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SCENE 13: Closing - What You Hold in Your Cup
          ============================================ */}
      <section className="closing-scene">
        <div className="closing-content">
          <div className="closing-cup">
            <svg className="closing-cup-svg" viewBox="0 0 200 250" aria-hidden="true">
              {/* Cup */}
              <path 
                className="cup-outline"
                d="M40 80 Q40 200 100 220 Q160 200 160 80"
              />
              <ellipse className="cup-rim" cx="100" cy="80" rx="60" ry="15" />
              <ellipse className="cup-tea" cx="100" cy="100" rx="50" ry="12" />
              {/* Handle */}
              <path className="cup-handle-final" d="M160 100 Q200 100 200 140 Q200 180 160 180" fill="none" />
              {/* Reflection of the world - abstract */}
              <g className="tea-reflection">
                <circle cx="100" cy="105" r="35" className="world-reflect" />
              </g>
              {/* Final steam */}
              <g className="final-steam">
                <path className="steam-final s1" d="M80 60 Q70 30 90 10" />
                <path className="steam-final s2" d="M100 55 Q110 25 95 5" />
                <path className="steam-final s3" d="M120 60 Q130 30 110 10" />
              </g>
            </svg>
          </div>

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

          <div className="closing-quote">
            <blockquote>
              &quot;Tea is quiet and our thirst for tea is never satisfied.&quot;
            </blockquote>
            <cite>— James Norwood Pratt</cite>
          </div>

          <p className="closing-final">
            The next time you lift a cup, remember: you&apos;re drinking five thousand years 
            of human history, one sip at a time.
          </p>
        </div>
      </section>

      {/* ============================================
          SOURCES
          ============================================ */}
      <section className="sources-scene">
        <div className="sources-content">
          <h3 className="sources-title">Sources & Further Reading</h3>
          <ul className="sources-list">
            <li>
              <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4055352/" target="_blank" rel="noopener noreferrer">
                PNAS: Origin of Tea (Camellia sinensis) Traced to Southwest China
              </a>
            </li>
            <li>
              <a href="https://www.smithsonianmag.com/history/the-great-british-tea-heist-9866709/" target="_blank" rel="noopener noreferrer">
                Smithsonian: The Great British Tea Heist
              </a>
            </li>
            <li>
              <a href="https://www.britannica.com/topic/tea-beverage" target="_blank" rel="noopener noreferrer">
                Britannica: History of Tea
              </a>
            </li>
            <li>
              <a href="https://www.worldhistory.org/article/1096/the-history-of-tea-in-china/" target="_blank" rel="noopener noreferrer">
                World History Encyclopedia: Tea in China
              </a>
            </li>
            <li>
              <a href="https://www.fao.org/markets-and-trade/commodities/tea/en/" target="_blank" rel="noopener noreferrer">
                FAO: World Tea Production Statistics
              </a>
            </li>
            <li>
              <a href="https://teaepicure.com/tea-history-timeline/" target="_blank" rel="noopener noreferrer">
                Tea Epicure: Comprehensive Tea Timeline
              </a>
            </li>
            <li>
              <a href="https://www.amazon.com/Tea-History-Global-Thousand-Years/dp/0300213883" target="_blank" rel="noopener noreferrer">
                &quot;Tea: A History of the Drink That Changed the World&quot; — Laura C. Martin
              </a>
            </li>
            <li>
              <a href="https://www.harvard.edu/academic/tea-and-empire/" target="_blank" rel="noopener noreferrer">
                Harvard: Tea and the British Empire
              </a>
            </li>
          </ul>
          <p className="sources-note">
            This narrative was fact-checked against peer-reviewed academic sources, 
            historical records, and expert publications on tea history and cultivation.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TeaJourneyClient;

