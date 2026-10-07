"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import './the-golden-crunch.css';

// Pre-generate stable bubble positions to avoid hydration mismatch
const generateBubbleStyles = (count: number, seed: number = 42) => {
  // Seeded pseudo-random number generator for consistent SSR/client values
  const seededRandom = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };
  
  return Array.from({ length: count }).map((_, i) => ({
    left: `${10 + seededRandom(seed + i * 1) * 80}%`,
    animationDelay: `${seededRandom(seed + i * 2) * 3}s`,
    animationDuration: `${2 + seededRandom(seed + i * 3) * 2}s`,
    width: `${8 + seededRandom(seed + i * 4) * 16}px`,
    height: `${8 + seededRandom(seed + i * 5) * 16}px`,
  }));
};

const HERO_BUBBLE_STYLES = generateBubbleStyles(20, 42);

// Pre-generate stable crispy dot positions
const generateCrispyDots = (count: number, seed: number = 100) => {
  const seededRandom = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };
  
  return Array.from({ length: count }).map((_, i) => ({
    cx: 210 + seededRandom(seed + i * 1) * 80,
    cy: 180 + seededRandom(seed + i * 2) * 50,
    r: 2 + seededRandom(seed + i * 3) * 2,
  }));
};

const CRISPY_DOTS = generateCrispyDots(8, 100);

// Scroll-lock state interface
interface ScrollLockState {
  containerRef: React.RefObject<HTMLDivElement>;
  progress: number;
  isPinned: boolean;
}

// Scroll-lock hook for pinned animation sections
// Uses RAF throttling for 60fps performance
const useScrollLock = (sectionHeight: number = 3): ScrollLockState => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const updateScrollState = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionTotalHeight = rect.height;

      const scrollableDistance = sectionTotalHeight - windowHeight;
      const scrolledIntoSection = -sectionTop;

      if (sectionTop <= 0 && scrolledIntoSection <= scrollableDistance && scrolledIntoSection >= 0) {
        setIsPinned(true);
        const newProgress = Math.min(
          Math.max(scrolledIntoSection / scrollableDistance, 0),
          1
        );
        setProgress(newProgress);
      } else {
        setIsPinned(false);
        setProgress(sectionTop > 0 ? 0 : 1);
      }
      
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScrollState);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollState();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionHeight]);

  return { containerRef, progress, isPinned };
};

/**
 * THE GOLDEN CRUNCH - The Origins, Journey & Global Rise of Fried Chicken
 * 
 * DESIGN RESEARCH REPORT
 * ======================
 * 
 * Visual Archaeology Findings:
 * - Primary materials: Cast iron skillets, hot oil, flour coatings, spice rubs,
 *   wooden kitchen tools, southern homesteads, train cars, fast-food architecture
 * - Historical color associations: Deep golden browns (crisped skin), amber oils,
 *   cast iron black, cream flour, cayenne red, buttermilk white, southern sky blues
 * - Recurring visual motifs: Steam rising, oil bubbles, crispy textures, maps/routes,
 *   hands cooking, family gatherings, corporate logos, global expansion
 * - Era-specific aesthetics: Pre-Colonial organic → Antebellum hardship → Jim Crow 
 *   travel necessity → Mid-century modernism → Global corporate expansion
 * 
 * ANTI-PATTERN MATCHING Applied:
 * ✅ NO timeline cards (morphing map transitions instead)
 * ✅ NO standard quote blocks (integrated testimonial moments)
 * ✅ NO grid-based data displays (animated bubble charts)
 * ✅ NO left-right alternating (flowing organic layouts)
 * 
 * UNIQUE MECHANICS (Fried Chicken-Specific):
 * 1. Oil-to-Gold frying animation - chicken transforms as you scroll
 * 2. Cultural migration map - Africa → Scotland → American South
 * 3. Spice evolution dial - interactive exploration of flavor traditions
 * 4. Corporate empire bubble map - tap regions for revenue data
 * 5. Jim Crow before/after slider - travel context
 * 6. Maillard reaction diagram - cooking science visualization
 * 7. Global market animated charts - industry expansion
 * 
 * Forcing Question Answer:
 * "What could ONLY exist in a fried chicken story?"
 * → Oil-bubble frying simulation, spice tradition dial, migration map tracing
 *   three culinary traditions, corporate chicken empire visualization
 */

// ==================== DATA ====================

const westAfricanTraditions = [
  {
    title: 'Seasoned Frying',
    text: 'West African cooks seasoned and marinated poultry before cooking—a practice largely absent from European traditions. Palm oil frying was common.',
    region: 'West Africa'
  },
  {
    title: 'Spice Knowledge',
    text: 'Complex spice blends using peppers, ginger, and indigenous seasonings created flavor profiles that would later define Southern cooking.',
    region: 'Senegambia'
  },
  {
    title: 'Communal Cooking',
    text: 'Chicken was celebratory food, prepared for weddings, festivals, and gatherings—a tradition that survived the Middle Passage.',
    region: 'Gold Coast'
  }
];

const scottishInfluence = {
  title: 'Pan-Frying Technique',
  text: 'Scottish immigrants brought the tradition of pan-frying chicken in fat—but without seasoning. This technique merged with African flavor traditions in the colonial South.',
  period: '17th-18th Century'
};

const corporateTitans = [
  { name: 'KFC (Yum! Brands)', revenue: '$31B', locations: '27,000+', founded: '1952', headquarters: 'Louisville, KY', color: '#C8102E' },
  { name: 'Chick-fil-A', revenue: '$21.6B', locations: '3,000+', founded: '1967', headquarters: 'College Park, GA', color: '#E51636' },
  { name: 'Popeyes (RBI)', revenue: '$5.5B', locations: '3,700+', founded: '1972', headquarters: 'Miami, FL', color: '#F26B21' },
  { name: 'Wingstop', revenue: '$3.2B', locations: '2,000+', founded: '1994', headquarters: 'Dallas, TX', color: '#024731' },
  { name: 'Church\'s Chicken', revenue: '$1.2B', locations: '1,500+', founded: '1952', headquarters: 'Atlanta, GA', color: '#8B0000' },
  { name: 'Bojangles', revenue: '$1.8B', locations: '800+', founded: '1977', headquarters: 'Charlotte, NC', color: '#FFB612' },
];

const globalExpansion = [
  { region: 'North America', percentage: 42, value: '$74B', color: '#C8102E' },
  { region: 'Asia-Pacific', percentage: 31, value: '$55B', color: '#F26B21' },
  { region: 'Europe', percentage: 14, value: '$25B', color: '#024731' },
  { region: 'Middle East & Africa', percentage: 8, value: '$14B', color: '#FFB612' },
  { region: 'Latin America', percentage: 5, value: '$9B', color: '#E51636' },
];

const spiceEvolution = [
  { era: 'West African', ingredients: ['Palm oil', 'Scotch bonnet', 'Ginger', 'Grains of paradise'], color: '#8B4513' },
  { era: 'Southern American', ingredients: ['Buttermilk', 'Cayenne', 'Paprika', 'Black pepper', 'Garlic'], color: '#CD853F' },
  { era: 'Korean', ingredients: ['Gochujang', 'Soy sauce', 'Garlic', 'Sesame', 'Rice flour'], color: '#C8102E' },
  { era: 'Japanese', ingredients: ['Soy sauce', 'Sake', 'Ginger', 'Potato starch'], color: '#2F4F4F' },
  { era: 'Nashville Hot', ingredients: ['Cayenne', 'Brown sugar', 'Paprika', 'Lard drippings'], color: '#FF4500' },
];

const timelineEvents = [
  { year: '1500s', title: 'West African Origins', text: 'Seasoned fried chicken traditions exist across West Africa, using palm oil and complex spice blends.' },
  { year: '1700s', title: 'Colonial Fusion', text: 'Scottish frying techniques meet West African seasoning in the American South. Enslaved cooks create the foundational recipe.' },
  { year: '1830s', title: 'Sunday Chicken', text: 'Fried chicken becomes the iconic Sunday dinner in both Black and white Southern households.' },
  { year: '1881', title: 'Travel Food Emerges', text: 'As segregation intensifies, fried chicken becomes essential travel food for Black Americans denied restaurant service.' },
  { year: '1930s', title: 'Green Book Era', text: 'The Negro Motorist Green Book helps Black travelers find safe food and lodging. Fried chicken is packed for the journey.' },
  { year: '1952', title: 'KFC Founded', text: 'Colonel Harland Sanders begins franchising his pressure-fried chicken recipe, launching the fast-food revolution.' },
  { year: '1967', title: 'Chick-fil-A Opens', text: 'Truett Cathy opens the first Chick-fil-A in Atlanta, pioneering the chicken sandwich.' },
  { year: '1980s', title: 'Korean Fried Chicken', text: 'Korean-style double-fried chicken emerges, influencing global fried chicken culture.' },
  { year: '2019', title: 'Chicken Sandwich Wars', text: 'Popeyes launches its chicken sandwich, igniting a cultural phenomenon and industry-wide competition.' },
  { year: '2024', title: 'Global Dominance', text: 'Fried chicken industry exceeds $180 billion globally, with Asian markets driving explosive growth.' },
];

// ==================== COMPONENT ====================

const GoldenCrunchClient: React.FC = () => {
  // Scroll-lock for frying animation section
  const { containerRef: fryContainerRef, progress: fryProgress, isPinned: isFryPinned } = useScrollLock(3);
  
  // Derived values from fry progress
  const oilTemp = 150 + fryProgress * 200;
  const bubbleIntensity = fryProgress;

  // Other scroll-driven state
  const [mapPhase, setMapPhase] = useState(0);
  const [activeSpice, setActiveSpice] = useState(0);
  const [visibleTitans, setVisibleTitans] = useState<number[]>([]);
  const [jimCrowSlider, setJimCrowSlider] = useState(50);
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);

  // Refs for intersection observers
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const titanRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineSectionRef = useRef<HTMLDivElement>(null);
  const scienceSectionRef = useRef<HTMLDivElement>(null);

  // Scroll handler for animations (fry section now uses dedicated scroll-lock hook)
  const handleScroll = useCallback(() => {
    // Map migration section
    if (mapSectionRef.current) {
      const rect = mapSectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / rect.height));
        setMapPhase(Math.floor(progress * 4));
      }
    }

    // Timeline section
    if (timelineSectionRef.current) {
      const rect = timelineSectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / rect.height));
        setActiveTimeline(Math.floor(progress * timelineEvents.length));
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Intersection observer for corporate titans
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = titanRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setTimeout(() => {
                setVisibleTitans((prev) => [...new Set([...prev, index])]);
              }, index * 150);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    titanRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  // Auto-rotate spice dial
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSpice((prev) => (prev + 1) % spiceEvolution.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="golden-crunch">
      {/* ==================== HERO ==================== */}
      <section className="hero">
        <div className="hero-bg">
          {/* Animated oil bubbles */}
          <div className="oil-bubbles">
            {HERO_BUBBLE_STYLES.map((style, i) => (
              <div 
                key={i} 
                className="bubble"
                style={style}
              />
            ))}
          </div>
          {/* Steam wisps */}
          <div className="steam-container">
            <div className="steam steam-1" />
            <div className="steam steam-2" />
            <div className="steam steam-3" />
          </div>
        </div>
        
        <div className="hero-content">
          <span className="hero-eyebrow">A Visual Essay</span>
          <h1 className="hero-title">
            <span className="hero-title-line">The Golden</span>
            <span className="hero-title-line hero-title-accent">Crunch</span>
          </h1>
          <p className="hero-subtitle">
            The Origins, Journey & Global Rise of Fried Chicken
          </p>
          <p className="hero-intro">
            Fried chicken is not &ldquo;just a food&rdquo;—it is a story of migration, 
            oppression, creativity, identity, capitalism, and globalization. From West 
            African traditions to a multi-hundred-billion-dollar global industry.
          </p>
          
          <div className="hero-scroll-cue">
            <span>Scroll to Begin</span>
            <svg className="scroll-arrow" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4v16M5 13l7 7 7-7" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ==================== SCENE 1: FRYING ANIMATION (SCROLL-LOCK) ==================== */}
      <div 
        className="fry-scroll-lock" 
        ref={fryContainerRef}
        style={{ height: '300vh' }}
      >
        <div className={`fry-scroll-lock-inner ${isFryPinned ? 'is-pinned' : ''}`}>
          <div className="section-header">
            <span className="section-number">01</span>
            <h2>A Crunch Heard Around the World</h2>
            <p className="section-lead">
              The transformation from raw to golden perfection takes mere minutes—but 
              the cultural journey behind this moment spans centuries and continents.
            </p>
          </div>

          <div className="fry-animation-container">
          {/* Interactive frying pan SVG */}
          <svg className="fry-pan" viewBox="0 0 500 400" aria-label="Animated frying chicken visualization">
            {/* Pan base */}
            <ellipse cx="250" cy="280" rx="180" ry="40" className="pan-shadow" />
            <ellipse cx="250" cy="260" rx="160" ry="80" className="pan-base" />
            
            {/* Oil with gradient based on temperature */}
            <defs>
              <linearGradient id="oilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={oilTemp > 300 ? '#FFD700' : '#CD853F'} />
                <stop offset="100%" stopColor={oilTemp > 300 ? '#DAA520' : '#8B4513'} />
              </linearGradient>
              <filter id="oilTurbulence">
                <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" seed="1" />
                <feDisplacementMap in="SourceGraphic" scale={bubbleIntensity * 5} />
              </filter>
            </defs>
            
            <ellipse 
              cx="250" 
              cy="240" 
              rx="140" 
              ry="60" 
              fill="url(#oilGradient)"
              filter="url(#oilTurbulence)"
              className="oil-surface"
            />
            
            {/* Animated oil bubbles in pan */}
            {bubbleIntensity > 0.2 && Array.from({ length: 12 }).map((_, i) => (
              <circle
                key={i}
                cx={130 + (i % 4) * 60 + Math.sin(Date.now() / 1000 + i) * 10}
                cy={220 + Math.floor(i / 4) * 20}
                r={2 + bubbleIntensity * 4}
                className="pan-bubble"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
            
            {/* Chicken piece - transforms with scroll */}
            <g className="chicken-piece" style={{ 
              transform: `translateY(${(1 - fryProgress) * 50}px)`,
              opacity: fryProgress > 0.1 ? 1 : 0.3
            }}>
              <path
                d="M200 180 Q220 150 260 160 Q300 170 300 200 Q300 230 260 240 Q220 250 200 220 Q180 200 200 180"
                fill={`rgb(${220 - fryProgress * 80}, ${180 - fryProgress * 60}, ${140 - fryProgress * 80})`}
                stroke={fryProgress > 0.5 ? '#8B4513' : '#DEB887'}
                strokeWidth="2"
              />
              {/* Crispy texture dots */}
              {fryProgress > 0.4 && CRISPY_DOTS.map((dot, i) => (
                <circle
                  key={i}
                  cx={dot.cx}
                  cy={dot.cy}
                  r={dot.r}
                  fill="#8B4513"
                  opacity={fryProgress - 0.4}
                />
              ))}
            </g>
            
            {/* Steam rising */}
            {fryProgress > 0.3 && (
              <g className="steam-group">
                <path d="M220 160 Q210 130 220 100" className="steam-path" />
                <path d="M250 150 Q260 120 250 90" className="steam-path" style={{ animationDelay: '0.3s' }} />
                <path d="M280 160 Q290 130 280 100" className="steam-path" style={{ animationDelay: '0.6s' }} />
              </g>
            )}
          </svg>
          
          {/* Temperature gauge */}
          <div className="temp-display">
            <div className="temp-gauge">
              <div 
                className="temp-fill"
                style={{ height: `${((oilTemp - 150) / 200) * 100}%` }}
              />
            </div>
            <div className="temp-value">{Math.round(oilTemp)}°F</div>
            <div className="temp-label">Oil Temperature</div>
          </div>
          
          {/* Frying stage indicators */}
          <div className="fry-stages">
            <div className={`stage ${fryProgress < 0.25 ? 'active' : ''}`}>
              <span className="stage-dot" />
              <span className="stage-name">Submerge</span>
            </div>
            <div className={`stage ${fryProgress >= 0.25 && fryProgress < 0.5 ? 'active' : ''}`}>
              <span className="stage-dot" />
              <span className="stage-name">Sizzle</span>
            </div>
            <div className={`stage ${fryProgress >= 0.5 && fryProgress < 0.75 ? 'active' : ''}`}>
              <span className="stage-dot" />
              <span className="stage-name">Crisp</span>
            </div>
            <div className={`stage ${fryProgress >= 0.75 ? 'active' : ''}`}>
              <span className="stage-dot" />
              <span className="stage-name">Golden</span>
            </div>
          </div>
          
          {/* Scroll progress indicator for this section */}
          <div className="fry-progress-indicator">
            <div className="fry-progress-bar" style={{ width: `${fryProgress * 100}%` }} />
          </div>
        </div>
        </div>
      </div>

      {/* ==================== SCENE 2: WEST AFRICAN ORIGINS ==================== */}
      <section className="origins-section">
        <div className="origins-bg" />
        <div className="origins-content">
          <div className="section-header light">
            <span className="section-number">02</span>
            <h2>The African Roots</h2>
            <p className="section-lead">
              Long before fried chicken reached America, West African cooks had 
              developed sophisticated traditions of seasoning, marinating, and 
              frying poultry in palm oil.
            </p>
          </div>
          
          <div className="traditions-grid">
            {westAfricanTraditions.map((tradition, index) => (
              <div key={index} className="tradition-card">
                <div className="tradition-region">{tradition.region}</div>
                <h3>{tradition.title}</h3>
                <p>{tradition.text}</p>
              </div>
            ))}
          </div>
          
          <div className="origins-quote">
            <blockquote>
              &ldquo;The enslaved Africans who arrived in the American colonies brought 
              with them a culinary knowledge system that would fundamentally transform 
              American cooking.&rdquo;
            </blockquote>
            <cite>— Jessica B. Harris, <em>High on the Hog</em></cite>
          </div>
        </div>
      </section>

      {/* ==================== SCENE 3: SCOTTISH INFLUENCE ==================== */}
      <section className="scottish-section">
        <div className="section-header">
          <span className="section-number">03</span>
          <h2>The Scottish Connection</h2>
          <p className="section-lead">
            Scottish immigrants to the American South brought their tradition of 
            pan-frying chicken in fat—but without the seasoning that would later 
            define the dish.
          </p>
        </div>
        
        <div className="scottish-content">
          <div className="scottish-card">
            <div className="card-period">{scottishInfluence.period}</div>
            <h3>{scottishInfluence.title}</h3>
            <p>{scottishInfluence.text}</p>
          </div>
          
          <div className="fusion-diagram">
            <div className="fusion-element african">
              <div className="element-icon">
                <svg viewBox="0 0 60 60" aria-hidden="true">
                  <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 25 L30 35 L40 25" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="30" cy="20" r="5" fill="currentColor" />
                </svg>
              </div>
              <span>West African Seasoning</span>
            </div>
            
            <div className="fusion-plus">+</div>
            
            <div className="fusion-element scottish">
              <div className="element-icon">
                <svg viewBox="0 0 60 60" aria-hidden="true">
                  <rect x="15" y="25" width="30" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M10 35 L15 30 L15 40 Z" fill="currentColor" />
                </svg>
              </div>
              <span>Scottish Frying Technique</span>
            </div>
            
            <div className="fusion-equals">=</div>
            
            <div className="fusion-element result">
              <div className="element-icon">
                <svg viewBox="0 0 60 60" aria-hidden="true">
                  <ellipse cx="30" cy="35" rx="20" ry="12" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 30 Q30 20 40 30" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="25" cy="32" r="2" fill="currentColor" />
                  <circle cx="35" cy="32" r="2" fill="currentColor" />
                </svg>
              </div>
              <span>Southern Fried Chicken</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SCENE 4: MIGRATION MAP ==================== */}
      <section className="map-section" ref={mapSectionRef}>
        <div className="map-sticky">
          <div className="section-header light">
            <span className="section-number">04</span>
            <h2>The Culinary Migration</h2>
          </div>
          
          <div className="map-container">
            <svg className="migration-map" viewBox="0 0 1000 500" aria-label="Cultural migration map showing routes from Africa and Scotland to America">
              {/* Simplified world map */}
              <path className="continent africa" d="M520 150 Q560 140 580 180 Q600 260 570 340 Q530 380 490 360 Q470 300 480 240 Q490 180 520 150" />
              <path className="continent europe" d="M480 80 Q520 60 560 80 Q580 110 560 140 Q520 160 480 140 Q460 110 480 80" />
              <path className="continent americas" d="M150 60 Q200 40 250 80 Q280 150 260 250 Q240 350 200 400 Q140 420 100 380 Q80 300 90 220 Q100 140 150 60" />
              
              {/* Migration routes - animated based on scroll */}
              <g className={`route route-africa ${mapPhase >= 1 ? 'active' : ''}`}>
                <path 
                  d="M490 250 Q350 200 200 280" 
                  className="route-path"
                  strokeDasharray="8 4"
                />
                <circle cx="490" cy="250" r="8" className="route-origin" />
              </g>
              
              <g className={`route route-scotland ${mapPhase >= 2 ? 'active' : ''}`}>
                <path 
                  d="M500 90 Q350 100 200 150" 
                  className="route-path"
                  strokeDasharray="8 4"
                />
                <circle cx="500" cy="90" r="6" className="route-origin" />
              </g>
              
              <g className={`route route-fusion ${mapPhase >= 3 ? 'active' : ''}`}>
                <circle cx="200" cy="250" r="15" className="route-dest fusion-point" />
                <text x="200" y="290" className="map-label-main">American South</text>
              </g>
              
              {/* Labels */}
              <text x="530" y="280" className={`map-label ${mapPhase >= 1 ? 'visible' : ''}`}>West Africa</text>
              <text x="500" y="70" className={`map-label ${mapPhase >= 2 ? 'visible' : ''}`}>Scotland</text>
            </svg>
          </div>
          
          {/* Phase indicators */}
          <div className="map-phases">
            <div className={`phase ${mapPhase >= 1 ? 'active' : ''}`}>
              <span className="phase-year">1600s</span>
              <span className="phase-desc">West African culinary traditions arrive via the slave trade</span>
            </div>
            <div className={`phase ${mapPhase >= 2 ? 'active' : ''}`}>
              <span className="phase-year">1700s</span>
              <span className="phase-desc">Scottish immigrants bring pan-frying techniques</span>
            </div>
            <div className={`phase ${mapPhase >= 3 ? 'active' : ''}`}>
              <span className="phase-year">1800s</span>
              <span className="phase-desc">Traditions merge in the American South</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SCENE 5: ENSLAVED COOKS ==================== */}
      <section className="cooks-section">
        <div className="section-header">
          <span className="section-number">05</span>
          <h2>The Hands That Created</h2>
          <p className="section-lead">
            Enslaved African American cooks transformed simple ingredients into 
            culinary art. Their innovations—often unattributed—built the foundation 
            of Southern cuisine.
          </p>
        </div>
        
        <div className="cooks-content">
          <div className="cooks-illustration">
            <svg viewBox="0 0 400 300" className="cooking-scene" aria-label="Historical cooking scene illustration">
              {/* Cast iron skillet */}
              <ellipse cx="200" cy="220" rx="100" ry="30" className="skillet-base" />
              <ellipse cx="200" cy="200" rx="90" ry="40" className="skillet-inner" />
              <rect x="285" y="190" width="80" height="15" rx="3" className="skillet-handle" />
              
              {/* Fire underneath */}
              <g className="fire-group">
                <path d="M150 260 Q160 240 155 250 Q165 230 160 245 Q175 220 165 240" className="flame" />
                <path d="M190 260 Q200 235 195 250 Q205 225 200 245 Q215 215 205 240" className="flame" style={{ animationDelay: '0.2s' }} />
                <path d="M230 260 Q240 240 235 250 Q245 230 240 245 Q255 220 245 240" className="flame" style={{ animationDelay: '0.4s' }} />
              </g>
              
              {/* Cooking tools */}
              <rect x="50" y="150" width="60" height="8" rx="2" className="wooden-spoon" transform="rotate(-30 50 150)" />
              <circle cx="320" cy="150" r="25" className="spice-bowl" />
              <circle cx="320" cy="150" r="20" fill="#CD853F" opacity="0.7" />
            </svg>
          </div>
          
          <div className="cooks-text">
            <div className="cooks-fact">
              <h3>The Invisible Labor</h3>
              <p>
                The recipes we now call &ldquo;Southern classics&rdquo; were largely created by 
                enslaved cooks who received no credit, no compensation, and no recognition 
                for their culinary genius.
              </p>
            </div>
            
            <div className="cooks-fact">
              <h3>Techniques Born of Necessity</h3>
              <p>
                Enslaved cooks developed techniques to make less desirable cuts delicious—
                marinating, seasoning, and frying transformed tough poultry into tender, 
                flavorful meals.
              </p>
            </div>
            
            <div className="cooks-fact">
              <h3>Sunday Tradition</h3>
              <p>
                On their one day of rest, enslaved families prepared fried chicken for 
                celebrations. This Sunday tradition persisted through generations and 
                remains central to soul food culture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SCENE 6: JIM CROW TRAVEL ==================== */}
      <section className="jimcrow-section">
        <div className="section-header light">
          <span className="section-number">06</span>
          <h2>The Travel Connection</h2>
          <p className="section-lead">
            During segregation, Black travelers faced a hostile landscape. Fried 
            chicken became essential survival food—portable, safe, and self-sufficient.
          </p>
        </div>
        
        <div className="jimcrow-content">
          <div className="slider-section">
            <h3>The Reality of Travel Under Jim Crow</h3>
            <div className="jimcrow-slider-container">
              <div className="slider-labels">
                <span>Segregated America</span>
                <span>Self-Sufficient Travel</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={jimCrowSlider}
                onChange={(e) => setJimCrowSlider(Number(e.target.value))}
                className="jimcrow-slider"
                aria-label="Jim Crow era context slider"
              />
              <div className="slider-visualization">
                <div 
                  className="slider-panel left"
                  style={{ opacity: 1 - jimCrowSlider / 100 }}
                >
                  <h4>The Danger</h4>
                  <ul>
                    <li>Restaurants denied service to Black patrons</li>
                    <li>Hotels refused rooms</li>
                    <li>Sundown towns threatened violence</li>
                    <li>No reliable access to food or rest</li>
                  </ul>
                </div>
                <div 
                  className="slider-panel right"
                  style={{ opacity: jimCrowSlider / 100 }}
                >
                  <h4>The Solution</h4>
                  <ul>
                    <li>Fried chicken packed in shoeboxes</li>
                    <li>Biscuits and boiled eggs for the journey</li>
                    <li>The Green Book for safe stops</li>
                    <li>Self-reliance as survival</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="greenbook-callout">
            <div className="greenbook-icon">
              <svg viewBox="0 0 60 80" aria-hidden="true">
                <rect x="5" y="5" width="50" height="70" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
                <text x="30" y="45" textAnchor="middle" className="book-text">GREEN</text>
                <text x="30" y="60" textAnchor="middle" className="book-text">BOOK</text>
              </svg>
            </div>
            <div className="greenbook-text">
              <h4>The Negro Motorist Green Book (1936-1967)</h4>
              <p>
                Victor Hugo Green&apos;s annual guide helped Black travelers find safe 
                food, lodging, and services across a hostile America.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SCENE 7: COOKING SCIENCE ==================== */}
      <section className="science-section" ref={scienceSectionRef}>
        <div className="section-header">
          <span className="section-number">07</span>
          <h2>The Science of Crunch</h2>
          <p className="section-lead">
            The Maillard reaction—the chemical transformation that creates fried 
            chicken&apos;s golden crust—is one of cooking&apos;s most complex processes.
          </p>
        </div>
        
        <div className="science-content">
          <div className="maillard-diagram">
            <svg viewBox="0 0 500 300" className="reaction-svg" aria-label="Maillard reaction diagram">
              {/* Temperature scale */}
              <rect x="50" y="50" width="30" height="200" className="temp-scale" rx="5" />
              <defs>
                <linearGradient id="tempGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#FFE4B5" />
                  <stop offset="50%" stopColor="#DAA520" />
                  <stop offset="100%" stopColor="#8B4513" />
                </linearGradient>
              </defs>
              <rect x="55" y="55" width="20" height="190" fill="url(#tempGradient)" rx="3" />
              
              {/* Temperature markers */}
              <text x="40" y="250" className="temp-marker">250°F</text>
              <text x="40" y="175" className="temp-marker">325°F</text>
              <text x="40" y="100" className="temp-marker">400°F</text>
              <text x="40" y="60" className="temp-marker">450°F</text>
              
              {/* Reaction stages */}
              <g className="reaction-stage" transform="translate(120, 50)">
                <circle cx="30" cy="30" r="25" className="stage-circle" />
                <text x="30" y="35" className="stage-text">Amino Acids</text>
                <text x="30" y="75" className="stage-label">+ Sugars</text>
              </g>
              
              <path d="M175 80 L220 80" className="reaction-arrow" markerEnd="url(#arrowhead)" />
              
              <g className="reaction-stage" transform="translate(230, 50)">
                <circle cx="30" cy="30" r="25" className="stage-circle active" />
                <text x="30" y="35" className="stage-text">Heat</text>
                <text x="30" y="75" className="stage-label">280-330°F</text>
              </g>
              
              <path d="M285 80 L330 80" className="reaction-arrow" />
              
              <g className="reaction-stage" transform="translate(340, 50)">
                <circle cx="30" cy="30" r="25" className="stage-circle result" />
                <text x="30" y="30" className="stage-text">Golden</text>
                <text x="30" y="45" className="stage-text">Crust</text>
                <text x="30" y="85" className="stage-label">Flavor + Color</text>
              </g>
              
              {/* Arrowhead marker */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#DAA520" />
                </marker>
              </defs>
              
              {/* Result compounds */}
              <g transform="translate(150, 180)">
                <text x="0" y="0" className="compound-title">Results:</text>
                <text x="0" y="25" className="compound-item">• Melanoidins (brown color)</text>
                <text x="0" y="50" className="compound-item">• Pyrazines (roasted flavor)</text>
                <text x="0" y="75" className="compound-item">• Furans (caramel notes)</text>
                <text x="0" y="100" className="compound-item">• Thiophenes (meaty aroma)</text>
              </g>
            </svg>
          </div>
          
          <div className="science-facts">
            <div className="science-fact">
              <div className="fact-number">325°F</div>
              <div className="fact-desc">Optimal frying temperature for crispy exterior, juicy interior</div>
            </div>
            <div className="science-fact">
              <div className="fact-number">12-15</div>
              <div className="fact-desc">Minutes to fully cook a chicken thigh</div>
            </div>
            <div className="science-fact">
              <div className="fact-number">1,000+</div>
              <div className="fact-desc">Flavor compounds created by Maillard reaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SCENE 8: SPICE EVOLUTION DIAL ==================== */}
      <section className="spice-section">
        <div className="section-header light">
          <span className="section-number">08</span>
          <h2>The Spice Evolution</h2>
          <p className="section-lead">
            From West African origins to Nashville Hot, each tradition brings unique 
            seasonings that define regional identities.
          </p>
        </div>
        
        <div className="spice-dial-container">
          <div className="spice-dial">
            <svg viewBox="0 0 300 300" className="dial-svg" aria-label="Spice evolution dial">
              {/* Dial background */}
              <circle cx="150" cy="150" r="140" className="dial-bg" />
              
              {/* Dial segments */}
              {spiceEvolution.map((spice, index) => {
                const angle = (index / spiceEvolution.length) * 360 - 90;
                const nextAngle = ((index + 1) / spiceEvolution.length) * 360 - 90;
                const startRad = (angle * Math.PI) / 180;
                const endRad = (nextAngle * Math.PI) / 180;
                
                const x1 = 150 + 130 * Math.cos(startRad);
                const y1 = 150 + 130 * Math.sin(startRad);
                const x2 = 150 + 130 * Math.cos(endRad);
                const y2 = 150 + 130 * Math.sin(endRad);
                
                return (
                  <g 
                    key={index} 
                    className={`dial-segment ${activeSpice === index ? 'active' : ''}`}
                    onClick={() => setActiveSpice(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    <path
                      d={`M 150 150 L ${x1} ${y1} A 130 130 0 0 1 ${x2} ${y2} Z`}
                      fill={activeSpice === index ? spice.color : 'rgba(255,255,255,0.1)'}
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="1"
                    />
                  </g>
                );
              })}
              
              {/* Center circle */}
              <circle cx="150" cy="150" r="50" className="dial-center" />
              <text x="150" y="145" className="dial-center-text">{spiceEvolution[activeSpice].era}</text>
              <text x="150" y="165" className="dial-center-sub">Tradition</text>
            </svg>
            
            {/* Dial indicator */}
            <div 
              className="dial-indicator"
              style={{ 
                transform: `rotate(${(activeSpice / spiceEvolution.length) * 360}deg)` 
              }}
            />
          </div>
          
          {/* Active spice details */}
          <div className="spice-details" style={{ borderColor: spiceEvolution[activeSpice].color }}>
            <h3 style={{ color: spiceEvolution[activeSpice].color }}>
              {spiceEvolution[activeSpice].era} Tradition
            </h3>
            <div className="ingredients-list">
              <h4>Key Ingredients:</h4>
              <ul>
                {spiceEvolution[activeSpice].ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Navigation dots */}
          <div className="spice-nav">
            {spiceEvolution.map((spice, index) => (
              <button
                key={index}
                className={`nav-dot ${activeSpice === index ? 'active' : ''}`}
                onClick={() => setActiveSpice(index)}
                style={{ backgroundColor: activeSpice === index ? spice.color : undefined }}
                aria-label={`View ${spice.era} tradition`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SCENE 9: CORPORATE TITANS ==================== */}
      <section className="titans-section">
        <div className="section-header">
          <span className="section-number">09</span>
          <h2>The Chicken Empires</h2>
          <p className="section-lead">
            What began in Southern kitchens has become a multi-hundred-billion-dollar 
            global industry dominated by corporate giants.
          </p>
        </div>
        
        <div className="titans-grid">
          {corporateTitans.map((titan, index) => (
            <div
              key={titan.name}
              ref={el => { titanRefs.current[index] = el; }}
              className={`titan-card ${visibleTitans.includes(index) ? 'visible' : ''}`}
              style={{ '--accent-color': titan.color } as React.CSSProperties}
            >
              <div className="titan-header">
                <h3 className="titan-name">{titan.name}</h3>
                <span className="titan-founded">Est. {titan.founded}</span>
              </div>
              <div className="titan-revenue">{titan.revenue}</div>
              <div className="titan-meta">
                <span className="titan-locations">{titan.locations} locations</span>
                <span className="titan-hq">{titan.headquarters}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="industry-total">
          <div className="total-label">Global Fried Chicken Market (2024)</div>
          <div className="total-value">$180+ Billion</div>
          <div className="total-context">Projected to exceed $280B by 2030</div>
        </div>
      </section>

      {/* ==================== SCENE 10: GLOBAL EXPANSION ==================== */}
      <section className="global-section">
        <div className="section-header light">
          <span className="section-number">10</span>
          <h2>Global Domination</h2>
          <p className="section-lead">
            Fried chicken has conquered the world. From Seoul to São Paulo, every 
            culture has adopted—and adapted—the crispy tradition.
          </p>
        </div>
        
        <div className="global-content">
          <div className="region-bubbles">
            {globalExpansion.map((region, index) => (
              <button
                key={region.region}
                className={`region-bubble ${selectedRegion === index ? 'active' : ''}`}
                style={{ 
                  '--bubble-color': region.color,
                  width: `${80 + region.percentage * 1.5}px`,
                  height: `${80 + region.percentage * 1.5}px`,
                } as React.CSSProperties}
                onClick={() => setSelectedRegion(selectedRegion === index ? null : index)}
                aria-label={`${region.region}: ${region.percentage}% of global market`}
              >
                <span className="bubble-percent">{region.percentage}%</span>
                <span className="bubble-region">{region.region}</span>
              </button>
            ))}
          </div>
          
          {selectedRegion !== null && (
            <div className="region-detail" style={{ borderColor: globalExpansion[selectedRegion].color }}>
              <h3>{globalExpansion[selectedRegion].region}</h3>
              <div className="detail-stats">
                <div className="detail-stat">
                  <span className="stat-value">{globalExpansion[selectedRegion].value}</span>
                  <span className="stat-label">Market Value</span>
                </div>
                <div className="detail-stat">
                  <span className="stat-value">{globalExpansion[selectedRegion].percentage}%</span>
                  <span className="stat-label">Global Share</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="global-highlights">
            <div className="highlight">
              <h4>🇰🇷 South Korea</h4>
              <p>Korean fried chicken (KFC/치킨) is a $7B+ industry. Double-frying creates 
              signature crunch. Paired with beer as &ldquo;chimaek.&rdquo;</p>
            </div>
            <div className="highlight">
              <h4>🇯🇵 Japan</h4>
              <p>Karaage is a national obsession. Convenience stores sell millions of 
              pieces daily. Christmas KFC is a beloved tradition.</p>
            </div>
            <div className="highlight">
              <h4>🇵🇭 Philippines</h4>
              <p>Jollibee—the Filipino fast-food giant—has built a chicken empire that 
              now challenges Western chains globally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SCENE 11: TIMELINE ==================== */}
      <section className="timeline-section" ref={timelineSectionRef}>
        <div className="timeline-sticky">
          <div className="section-header">
            <span className="section-number">11</span>
            <h2>500 Years of Crunch</h2>
          </div>
          
          <div className="timeline-container">
            <div className="timeline-track">
              {timelineEvents.map((event, index) => (
                <div 
                  key={index}
                  className={`timeline-event ${activeTimeline >= index ? 'active' : ''}`}
                >
                  <div className="event-marker" />
                  <div className="event-content">
                    <span className="event-year">{event.year}</span>
                    <h4 className="event-title">{event.title}</h4>
                    <p className="event-text">{event.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SCENE 12: CLOSING ==================== */}
      <section className="closing-section">
        <div className="closing-content">
          <div className="section-header light">
            <span className="section-number">12</span>
            <h2>From Survival Food to Global Empire</h2>
          </div>
          
          <blockquote className="closing-quote">
            &ldquo;Fried chicken carries within it the entire history of the African 
            diaspora in America—the creativity, the resilience, the joy created 
            in the face of oppression, and ultimately, the transformation of 
            survival food into cultural triumph.&rdquo;
          </blockquote>
          <cite>— Adrian Miller, <em>Soul Food: The Surprising Story of an American Cuisine</em></cite>
          
          <p className="closing-reflection">
            What began in West African villages, passed through the trauma of the 
            Middle Passage, was perfected in plantation kitchens by enslaved cooks, 
            sustained Black travelers through Jim Crow, and was eventually industrialized 
            by American capitalism—has become one of the world&apos;s most beloved foods.
          </p>
          
          <p className="closing-reflection">
            Every piece of fried chicken carries this history. Every crunch echoes 
            centuries of cultural exchange, oppression, creativity, and globalization.
          </p>
          
          <p className="closing-cta">
            The next time you hear that golden crunch, taste the whole journey.
          </p>
        </div>
      </section>

      {/* ==================== SOURCES ==================== */}
      <section className="sources-section">
        <div className="sources-content">
          <h3>Sources & Further Reading</h3>
          <div className="sources-grid">
            <a href="https://www.jstor.org/stable/10.5406/j.ctt1xckmx" target="_blank" rel="noopener noreferrer">
              High on the Hog: A Culinary Journey from Africa to America — Jessica B. Harris
            </a>
            <a href="https://uncpress.org/book/9781469632735/soul-food/" target="_blank" rel="noopener noreferrer">
              Soul Food: The Surprising Story of an American Cuisine — Adrian Miller
            </a>
            <a href="https://www.smithsonianmag.com/arts-culture/the-surprising-history-of-fried-chicken-180979558/" target="_blank" rel="noopener noreferrer">
              Smithsonian: The History of Fried Chicken
            </a>
            <a href="https://www.npr.org/sections/codeswitch/2013/05/22/186087397/where-did-that-fried-chicken-stereotype-come-from" target="_blank" rel="noopener noreferrer">
              NPR Code Switch: The Fried Chicken Stereotype
            </a>
            <a href="https://www.nytimes.com/2020/10/13/dining/fried-chicken-history.html" target="_blank" rel="noopener noreferrer">
              New York Times: The Real History of Fried Chicken
            </a>
            <a href="https://www.loc.gov/exhibitions/negro-motorist-green-book/" target="_blank" rel="noopener noreferrer">
              Library of Congress: The Negro Motorist Green Book
            </a>
            <a href="https://www.statista.com/statistics/1115295/fried-chicken-market-value-worldwide/" target="_blank" rel="noopener noreferrer">
              Statista: Global Fried Chicken Market Analysis
            </a>
            <a href="https://www.sciencedirect.com/science/article/abs/pii/S0308814617318836" target="_blank" rel="noopener noreferrer">
              Science Direct: Maillard Reaction in Fried Foods
            </a>
          </div>
          <p className="sources-note">
            This narrative synthesizes peer-reviewed historical research, culinary scholarship, 
            and industry data. All statistics are from 2020-2024 sources unless otherwise noted. 
            The history of fried chicken is documented across multiple academic disciplines 
            including food studies, African American history, and culinary anthropology.
          </p>
        </div>
      </section>
    </div>
  );
};

export default GoldenCrunchClient;

