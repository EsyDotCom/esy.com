"use client";

import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import "./great-fire.css";

/* ===========================================
   THE GREAT FIRE OF LONDON
   From Ashes to Empire
   A Cinematic Visual Essay of Destruction & Rebirth
   ===========================================
   
   DESIGN PHILOSOPHY:
   - Fire as living character (animated ember particles)
   - Architectural silhouettes (medieval → baroque)
   - Parchment and charcoal textures
   - Phoenix motif (destruction → rebirth)
   - Mobile-native, 60fps GPU-accelerated
   
   COLOR PALETTE:
   - Ember orange (#E85D04) — living flame core
   - Flame gold (#FAA307) — fire highlight
   - Deep crimson (#9D0208) — destruction, urgency
   - Ash gray (#6C757D) — aftermath
   - Charcoal (#1A1A1D) — night, smoke
   - Smoke (#3D3D3D) — atmospheric depth
   - Parchment cream (#F5E6D3) — historical documents
   - Wren white (#F8F9FA) — architectural renewal
   
   MOVEMENTS:
   I.   INVOCATION — A spark in the darkness
   II.  THE KINDLING — Pudding Lane, September 2, 1666
   III. THE INFERNO — Three days of devastation
   IV.  THE DEVASTATION — What was lost
   V.   THE PHOENIX — Wren's architectural rebirth
   VI.  ETERNAL FLAME — Legacy and transformation
   =========================================== */

// ============================================
// PERFORMANCE UTILITIES
// ============================================

const useScrollProgress = () => {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      setViewportHeight(window.innerHeight);
      setDocumentHeight(document.documentElement.scrollHeight);
    };

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    updateDimensions();
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const progress = useMemo(() => {
    if (documentHeight <= viewportHeight) return 0;
    return Math.min(1, Math.max(0, scrollY / (documentHeight - viewportHeight)));
  }, [scrollY, documentHeight, viewportHeight]);

  return { scrollY, progress, viewportHeight, documentHeight };
};

const useIntersectionReveal = (threshold = 0.15) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin: '0px 0px -10% 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// ============================================
// SVG COMPONENTS — Fire-Driven Illustrations
// ============================================

const EmberParticles: React.FC<{ count?: number; intensity?: 'low' | 'medium' | 'high' }> = ({ 
  count = 20, 
  intensity = 'medium' 
}) => {
  const particles = useMemo(() => {
    const sizes = { low: 2, medium: 3, high: 4 };
    const baseSize = sizes[intensity];
    
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
      size: baseSize + Math.random() * 2,
      drift: (Math.random() - 0.5) * 30,
    }));
  }, [count, intensity]);

  return (
    <div className="ember-container" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="ember-particle"
          style={{
            left: `${p.x}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--drift': `${p.drift}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

const FlameAnimation: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg 
      className={`flame-svg ${className}`}
      viewBox="0 0 100 150" 
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="flameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="var(--flame-core)" />
          <stop offset="40%" stopColor="var(--ember)" />
          <stop offset="70%" stopColor="var(--flame-gold)" />
          <stop offset="100%" stopColor="var(--flame-tip)" />
        </linearGradient>
        <filter id="flameGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g className="flame-group" filter="url(#flameGlow)">
        <path 
          className="flame-main"
          d="M50 150 C30 120 20 90 25 60 C28 40 35 25 50 5 C65 25 72 40 75 60 C80 90 70 120 50 150"
          fill="url(#flameGradient)"
        />
        <path 
          className="flame-inner"
          d="M50 150 C38 125 32 100 35 75 C37 60 42 45 50 25 C58 45 63 60 65 75 C68 100 62 125 50 150"
          fill="var(--flame-gold)"
          opacity="0.7"
        />
        <path 
          className="flame-core-path"
          d="M50 150 C42 130 38 110 40 90 C42 75 46 60 50 45 C54 60 58 75 60 90 C62 110 58 130 50 150"
          fill="var(--parchment)"
          opacity="0.5"
        />
      </g>
    </svg>
  );
};

const MedievalSkyline: React.FC<{ burning?: boolean }> = ({ burning = false }) => {
  return (
    <svg 
      className={`skyline-svg ${burning ? 'burning' : ''}`}
      viewBox="0 0 400 120"
      preserveAspectRatio="xMidYMax meet"
      aria-label="Medieval London skyline"
    >
      <defs>
        <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--charcoal)" />
          <stop offset="100%" stopColor="var(--smoke)" />
        </linearGradient>
      </defs>
      {/* Medieval timber houses - densely packed */}
      <rect x="10" y="60" width="25" height="60" fill="url(#buildingGradient)" className="building" />
      <polygon points="10,60 22.5,40 35,60" fill="var(--charcoal)" className="roof" />
      
      <rect x="38" y="55" width="30" height="65" fill="url(#buildingGradient)" className="building" />
      <polygon points="38,55 53,30 68,55" fill="var(--charcoal)" className="roof" />
      
      <rect x="72" y="50" width="20" height="70" fill="url(#buildingGradient)" className="building" />
      <polygon points="72,50 82,35 92,50" fill="var(--charcoal)" className="roof" />
      
      {/* Old St Paul's Cathedral - central */}
      <rect x="150" y="30" width="60" height="90" fill="url(#buildingGradient)" className="building cathedral" />
      <polygon points="150,30 180,0 210,30" fill="var(--charcoal)" className="roof cathedral-spire" />
      <rect x="175" y="0" width="10" height="30" fill="var(--charcoal)" className="spire" />
      
      {/* More houses */}
      <rect x="220" y="55" width="25" height="65" fill="url(#buildingGradient)" className="building" />
      <polygon points="220,55 232.5,35 245,55" fill="var(--charcoal)" className="roof" />
      
      <rect x="250" y="60" width="30" height="60" fill="url(#buildingGradient)" className="building" />
      <polygon points="250,60 265,40 280,60" fill="var(--charcoal)" className="roof" />
      
      <rect x="285" y="50" width="20" height="70" fill="url(#buildingGradient)" className="building" />
      <polygon points="285,50 295,30 305,50" fill="var(--charcoal)" className="roof" />
      
      <rect x="310" y="55" width="35" height="65" fill="url(#buildingGradient)" className="building" />
      <polygon points="310,55 327.5,30 345,55" fill="var(--charcoal)" className="roof" />
      
      <rect x="350" y="60" width="25" height="60" fill="url(#buildingGradient)" className="building" />
      <polygon points="350,60 362.5,40 375,60" fill="var(--charcoal)" className="roof" />

      {/* Flames overlay when burning */}
      {burning && (
        <g className="flames-overlay">
          <path d="M30 60 Q25 45 30 30 Q35 45 30 60" fill="var(--ember)" className="building-flame" />
          <path d="M55 55 Q48 35 55 15 Q62 35 55 55" fill="var(--flame-gold)" className="building-flame" />
          <path d="M82 50 Q77 30 82 10 Q87 30 82 50" fill="var(--ember)" className="building-flame" />
          <path d="M180 30 Q168 -5 180 -40 Q192 -5 180 30" fill="var(--crimson)" className="building-flame cathedral-flame" />
          <path d="M232 55 Q227 35 232 15 Q237 35 232 55" fill="var(--flame-gold)" className="building-flame" />
          <path d="M265 60 Q258 40 265 20 Q272 40 265 60" fill="var(--ember)" className="building-flame" />
          <path d="M327 55 Q320 30 327 5 Q334 30 327 55" fill="var(--flame-gold)" className="building-flame" />
        </g>
      )}
    </svg>
  );
};

const WrenDome: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg 
      className={`wren-dome-svg ${className}`}
      viewBox="0 0 200 250"
      preserveAspectRatio="xMidYMax meet"
      aria-label="St Paul's Cathedral dome by Christopher Wren"
    >
      <defs>
        <linearGradient id="domeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--wren-white)" />
          <stop offset="50%" stopColor="#E8E8E8" />
          <stop offset="100%" stopColor="#CCCCCC" />
        </linearGradient>
        <linearGradient id="columnGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E0E0E0" />
          <stop offset="50%" stopColor="var(--wren-white)" />
          <stop offset="100%" stopColor="#E0E0E0" />
        </linearGradient>
      </defs>
      
      {/* Base structure */}
      <rect x="20" y="180" width="160" height="70" fill="url(#columnGradient)" className="cathedral-base" />
      
      {/* Columns */}
      <rect x="30" y="150" width="12" height="30" fill="url(#columnGradient)" className="column" />
      <rect x="55" y="150" width="12" height="30" fill="url(#columnGradient)" className="column" />
      <rect x="85" y="150" width="12" height="30" fill="url(#columnGradient)" className="column" />
      <rect x="105" y="150" width="12" height="30" fill="url(#columnGradient)" className="column" />
      <rect x="133" y="150" width="12" height="30" fill="url(#columnGradient)" className="column" />
      <rect x="158" y="150" width="12" height="30" fill="url(#columnGradient)" className="column" />
      
      {/* Dome drum */}
      <rect x="40" y="100" width="120" height="50" fill="url(#domeGradient)" className="dome-drum" />
      
      {/* Main dome */}
      <ellipse cx="100" cy="100" rx="60" ry="40" fill="url(#domeGradient)" className="main-dome" />
      
      {/* Lantern */}
      <rect x="85" y="50" width="30" height="20" fill="url(#columnGradient)" className="lantern-base" />
      <ellipse cx="100" cy="50" rx="18" ry="10" fill="url(#domeGradient)" className="lantern-dome" />
      
      {/* Cross */}
      <rect x="97" y="20" width="6" height="30" fill="var(--flame-gold)" className="cross-vertical" />
      <rect x="90" y="30" width="20" height="6" fill="var(--flame-gold)" className="cross-horizontal" />
      
      {/* Golden ball */}
      <circle cx="100" cy="20" r="6" fill="var(--flame-gold)" className="golden-ball" />
    </svg>
  );
};

const PhoenixIcon: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg 
      className={`phoenix-svg ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-label="Phoenix rising from flames"
    >
      <defs>
        <linearGradient id="phoenixGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="var(--crimson)" />
          <stop offset="50%" stopColor="var(--ember)" />
          <stop offset="100%" stopColor="var(--flame-gold)" />
        </linearGradient>
      </defs>
      {/* Phoenix body */}
      <path 
        d="M50 90 C40 80 35 65 40 50 C42 40 48 30 50 20 C52 30 58 40 60 50 C65 65 60 80 50 90" 
        fill="url(#phoenixGradient)"
        className="phoenix-body"
      />
      {/* Left wing */}
      <path 
        d="M40 50 C25 45 10 50 5 60 C15 55 30 50 40 55"
        fill="var(--ember)"
        className="phoenix-wing-left"
      />
      {/* Right wing */}
      <path 
        d="M60 50 C75 45 90 50 95 60 C85 55 70 50 60 55"
        fill="var(--ember)"
        className="phoenix-wing-right"
      />
      {/* Tail feathers */}
      <path 
        d="M45 85 C40 95 35 100 30 95 C38 92 42 88 45 85"
        fill="var(--flame-gold)"
        className="tail-feather"
      />
      <path 
        d="M55 85 C60 95 65 100 70 95 C62 92 58 88 55 85"
        fill="var(--flame-gold)"
        className="tail-feather"
      />
      {/* Head */}
      <circle cx="50" cy="22" r="8" fill="var(--flame-gold)" className="phoenix-head" />
      <circle cx="48" cy="20" r="2" fill="var(--charcoal)" className="phoenix-eye" />
    </svg>
  );
};

const BakeryIcon: React.FC = () => {
  return (
    <svg 
      className="bakery-svg"
      viewBox="0 0 80 80"
      preserveAspectRatio="xMidYMid meet"
      aria-label="Thomas Farriner's bakery"
    >
      {/* Oven base */}
      <rect x="15" y="50" width="50" height="25" rx="3" fill="var(--charcoal)" />
      <rect x="20" y="55" width="40" height="15" rx="2" fill="var(--smoke)" />
      
      {/* Flames inside oven */}
      <path d="M30 60 Q28 55 30 50 Q32 55 30 60" fill="var(--ember)" className="oven-flame" />
      <path d="M40 58 Q37 52 40 46 Q43 52 40 58" fill="var(--flame-gold)" className="oven-flame" />
      <path d="M50 60 Q48 55 50 50 Q52 55 50 60" fill="var(--ember)" className="oven-flame" />
      
      {/* Bread */}
      <ellipse cx="35" cy="40" rx="12" ry="8" fill="var(--parchment)" className="bread" />
      <ellipse cx="50" cy="42" rx="10" ry="6" fill="#D4A574" className="bread" />
      
      {/* Smoke wisps */}
      <path d="M35 30 Q30 25 35 20" stroke="var(--ash)" strokeWidth="2" fill="none" className="smoke-wisp" />
      <path d="M45 28 Q50 22 45 16" stroke="var(--ash)" strokeWidth="2" fill="none" className="smoke-wisp" />
    </svg>
  );
};

const AshParticles: React.FC<{ count?: number }> = ({ count = 15 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 4 + Math.random() * 3,
      size: 2 + Math.random() * 4,
      sway: (Math.random() - 0.5) * 40,
    }));
  }, [count]);

  return (
    <div className="ash-container" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="ash-particle"
          style={{
            left: `${p.x}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--sway': `${p.sway}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

// ============================================
// DATA — Historical Facts & Timeline
// ============================================

const fireTimeline = [
  {
    time: "1:00 AM",
    date: "Sunday, September 2, 1666",
    event: "Fire starts in Thomas Farriner's bakery on Pudding Lane",
    detail: "The king's baker forgot to extinguish his oven. Sparks ignite nearby straw and kindling."
  },
  {
    time: "3:00 AM",
    date: "Sunday",
    event: "Fire spreads to neighboring buildings",
    detail: "Medieval timber-frame houses, packed tightly together, catch flame. The Lord Mayor dismisses it."
  },
  {
    time: "7:00 AM",
    date: "Sunday",
    event: "300 houses already destroyed",
    detail: "Samuel Pepys climbs the Tower of London to witness the inferno spreading west."
  },
  {
    time: "All day",
    date: "Monday, September 3",
    event: "Fire reaches the Royal Exchange and Cheapside",
    detail: "The city's commercial heart burns. Molten lead from church roofs flows through streets."
  },
  {
    time: "Night",
    date: "Tuesday, September 4",
    event: "Old St Paul's Cathedral consumed",
    detail: "The medieval cathedral, wrapped in scaffolding for repairs, explodes into flame."
  },
  {
    time: "Evening",
    date: "Wednesday, September 5",
    event: "Fire finally contained",
    detail: "Strong easterly winds die. Firebreaks created by gunpowder finally hold."
  }
];

const devastationStats = [
  { value: "13,200", label: "Houses destroyed" },
  { value: "87", label: "Parish churches lost" },
  { value: "£10M", label: "In damages (1666 £)" },
  { value: "436", label: "Acres burned" },
  { value: "100,000", label: "People homeless" },
  { value: "6", label: "Confirmed deaths*" },
];

const wrenBuildings = [
  { name: "St Paul's Cathedral", year: "1675-1710", description: "35 years to build the masterpiece that defines London's skyline" },
  { name: "51 City Churches", year: "1670-1686", description: "Each unique, each a baroque gem rising from medieval ashes" },
  { name: "Monument to the Fire", year: "1671-1677", description: "202 feet tall—the exact distance from Pudding Lane" },
  { name: "Royal Exchange", year: "1669", description: "Commerce reborn in stone and classical columns" },
];

// ============================================
// SECTION COMPONENTS
// ============================================

const MovementI_Invocation: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.2);
  
  return (
    <section className="movement invocation" ref={ref}>
      <div className="invocation-canvas">
        <div className={`spark-container ${isVisible ? 'ignite' : ''}`}>
          <div className="single-spark" />
          <div className="spark-glow" />
        </div>
        
        <div className={`invocation-text ${isVisible ? 'reveal' : ''}`}>
          <p className="invocation-line">In the depth of night,</p>
          <p className="invocation-line">a single ember glows.</p>
          <p className="invocation-line">What follows will consume</p>
          <p className="invocation-line">an entire civilization.</p>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span>Scroll to witness the inferno</span>
        <div className="scroll-flame">
          <FlameAnimation className="mini-flame" />
        </div>
      </div>
    </section>
  );
};

const MovementII_Kindling: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.15);
  const { ref: ref2, isVisible: isVisible2 } = useIntersectionReveal(0.15);
  
  return (
    <section className="movement kindling">
      <div className="movement-header" ref={ref}>
        <span className={`movement-number ${isVisible ? 'reveal' : ''}`}>II</span>
        <h2 className={`movement-title ${isVisible ? 'reveal' : ''}`}>The Kindling</h2>
        <p className={`movement-subtitle ${isVisible ? 'reveal' : ''}`}>Pudding Lane, London • September 2, 1666</p>
      </div>

      <div className="kindling-scene" ref={ref2}>
        <div className={`bakery-illustration ${isVisible2 ? 'reveal' : ''}`}>
          <BakeryIcon />
          <EmberParticles count={8} intensity="low" />
        </div>
        
        <div className={`kindling-narrative ${isVisible2 ? 'reveal' : ''}`}>
          <p className="narrative-lead">
            It began with bread.
          </p>
          <p className="narrative-body">
            Thomas Farriner, the king&apos;s baker, retired for the night leaving embers 
            smoldering in his oven. In the cramped, timber-built neighborhood of 
            Pudding Lane, straw and kindling lay everywhere.
          </p>
          <p className="narrative-body">
            At one o&apos;clock in the morning, a spark found fuel.
          </p>
        </div>
      </div>

      <div className="context-panel">
        <h3 className="panel-title">The Perfect Kindling</h3>
        <div className="context-grid">
          <div className="context-item">
            <span className="context-icon">🏚️</span>
            <h4>Timber Construction</h4>
            <p>Medieval London was built of wood. Houses leaned over narrow streets, nearly touching.</p>
          </div>
          <div className="context-item">
            <span className="context-icon">☀️</span>
            <h4>Drought Conditions</h4>
            <p>1666 brought an unusually hot, dry summer. Wood was desiccated kindling.</p>
          </div>
          <div className="context-item">
            <span className="context-icon">💨</span>
            <h4>East Wind</h4>
            <p>Strong easterly winds would push flames west, toward the city&apos;s heart.</p>
          </div>
          <div className="context-item">
            <span className="context-icon">😤</span>
            <h4>Official Dismissal</h4>
            <p>Lord Mayor Bludworth scoffed: &quot;A woman could piss it out.&quot;</p>
          </div>
        </div>
      </div>

      <div className="witness-portrait-quote">
        <div className="portrait-frame pepys-portrait">
          <Image
            src="/images/great-fire/samuel-pepys-portrait.jpg"
            alt="Samuel Pepys, painted by John Hayls, 1666"
            width={200}
            height={250}
            className="historical-portrait"
          />
          <span className="portrait-caption">Samuel Pepys by John Hayls, 1666</span>
        </div>
        <blockquote className="pepys-quote with-portrait">
          <p>{`"Jane called us up about three in the morning, to tell us of a great fire they saw in the City."`}</p>
          <cite>— Samuel Pepys, Diary, September 2, 1666</cite>
        </blockquote>
      </div>
    </section>
  );
};

const MovementIII_Inferno: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  const { ref: timelineRef, isVisible: timelineVisible } = useIntersectionReveal(0.1);
  
  return (
    <section className="movement inferno">
      <EmberParticles count={40} intensity="high" />
      <AshParticles count={25} />
      
      <div className="movement-header" ref={ref}>
        <span className={`movement-number ${isVisible ? 'reveal' : ''}`}>III</span>
        <h2 className={`movement-title ${isVisible ? 'reveal' : ''}`}>The Inferno</h2>
        <p className={`movement-subtitle ${isVisible ? 'reveal' : ''}`}>Four Days That Consumed a City</p>
      </div>

      <div className={`skyline-scene ${isVisible ? 'burning' : ''}`}>
        <MedievalSkyline burning={isVisible} />
      </div>

      <div className="timeline-section" ref={timelineRef}>
        <div className="timeline-track">
          {fireTimeline.map((event, index) => (
            <div 
              key={index} 
              className={`timeline-event ${timelineVisible ? 'reveal' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="event-marker">
                <FlameAnimation className="marker-flame" />
              </div>
              <div className="event-content">
                <span className="event-time">{event.time}</span>
                <span className="event-date">{event.date}</span>
                <h4 className="event-title">{event.event}</h4>
                <p className="event-detail">{event.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="witness-accounts">
        <h3 className="accounts-title">Witnesses to the Inferno</h3>
        
        <blockquote className="witness-quote pepys">
          <p>{`"The churches, houses, and all on fire and flaming at once; and a horrid noise the flames made, and the cracking of houses at their ruins."`}</p>
          <cite>— Samuel Pepys</cite>
        </blockquote>
        
        <blockquote className="witness-quote evelyn">
          <p>{`"God grant mine eyes may never behold the like, who now saw above 10,000 houses all in one flame; the noise and cracking and thunder of people, the fall of towers, houses, and churches, was like an hideous storm."`}</p>
          <cite>— John Evelyn, Diarist</cite>
        </blockquote>
      </div>
    </section>
  );
};

const MovementIV_Devastation: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.15);
  const { ref: statsRef, isVisible: statsVisible } = useIntersectionReveal(0.1);
  
  return (
    <section className="movement devastation">
      <AshParticles count={30} />
      
      <div className="movement-header" ref={ref}>
        <span className={`movement-number ${isVisible ? 'reveal' : ''}`}>IV</span>
        <h2 className={`movement-title ${isVisible ? 'reveal' : ''}`}>The Devastation</h2>
        <p className={`movement-subtitle ${isVisible ? 'reveal' : ''}`}>What the Flames Consumed</p>
      </div>

      {/* Historical Painting - Contemporary Depiction */}
      <div className="historical-painting-reveal">
        <div className="painting-frame">
          <Image
            src="/images/great-fire/great-fire-london-1675.jpg"
            alt="The Great Fire of London, painted c. 1675, showing the fire from the Thames near Tower Wharf"
            width={1280}
            height={745}
            className="historical-painting"
            priority
          />
          <div className="painting-overlay" />
        </div>
        <div className="painting-caption">
          <h4>Contemporary Witness</h4>
          <p>&quot;The Great Fire of London&quot; • Anonymous, c. 1675 • Oil on panel</p>
          <p className="caption-detail">View from a boat near Tower Wharf, showing Old London Bridge and the city ablaze. Collection of the Museum of London.</p>
        </div>
      </div>

      {/* Before/After Visual Comparison */}
      <div className="devastation-visual">
        <h3 className="before-after-title">The Transformation</h3>
        <div className="before-after-container historical">
          <div className="city-before">
            <div className="historical-comparison-frame">
              <Image
                src="/images/great-fire/london-panorama-visscher-1616.jpg"
                alt="Panorama of London by Claes Visscher, 1616 - showing medieval London before the Great Fire"
                width={500}
                height={119}
                className="comparison-image before-image"
              />
            </div>
            <span className="label">Before: Medieval London</span>
            <p className="comparison-caption">Dense timber buildings, narrow streets, Old St Paul&apos;s dominating the skyline</p>
          </div>
          <div className="destruction-arrow">
            <FlameAnimation className="arrow-flame" />
          </div>
          <div className="city-after">
            <div className="historical-comparison-frame ruins">
              <Image
                src="/images/great-fire/great-fire-london-1675.jpg"
                alt="The Great Fire of London, 1675 painting showing the city ablaze"
                width={400}
                height={233}
                className="comparison-image after-image"
              />
            </div>
            <span className="label">After: Ashes & Ruin</span>
            <p className="comparison-caption">436 acres destroyed, only stone shells and chimneys remaining</p>
          </div>
        </div>
      </div>

      <div className="stats-grid" ref={statsRef}>
        {devastationStats.map((stat, index) => (
          <div 
            key={index} 
            className={`stat-card ${statsVisible ? 'reveal' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="lost-landmarks">
        <h3>Lost Forever</h3>
        <ul className="landmark-list">
          <li><strong>Old St Paul&apos;s Cathedral</strong> — The medieval masterpiece, already damaged, exploded as lead roofing melted and stone shattered</li>
          <li><strong>The Guildhall</strong> — Seat of city government for 500 years, burned to its stone shell</li>
          <li><strong>87 Parish Churches</strong> — Centuries of worship, art, and community—gone in days</li>
          <li><strong>The Royal Exchange</strong> — London&apos;s commercial heart, Thomas Gresham&apos;s monument</li>
          <li><strong>Newgate Prison</strong> — Prisoners fled as walls crumbled</li>
        </ul>
      </div>

      <p className="devastation-note">
        *Official death toll was only 6, but historians believe hundreds—perhaps thousands—of 
        poor and homeless deaths went unrecorded. The true toll remains unknown.
      </p>
    </section>
  );
};

const MovementV_Phoenix: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.15);
  const { ref: domeRef, isVisible: domeVisible } = useIntersectionReveal(0.2);
  const { ref: buildingsRef, isVisible: buildingsVisible } = useIntersectionReveal(0.1);
  
  return (
    <section className="movement phoenix">
      <div className="phoenix-rising">
        <PhoenixIcon className={isVisible ? 'animate' : ''} />
      </div>
      
      <div className="movement-header" ref={ref}>
        <span className={`movement-number ${isVisible ? 'reveal' : ''}`}>V</span>
        <h2 className={`movement-title ${isVisible ? 'reveal' : ''}`}>The Phoenix</h2>
        <p className={`movement-subtitle ${isVisible ? 'reveal' : ''}`}>Christopher Wren and the Rebirth of London</p>
      </div>

      <div className="wren-introduction">
        <div className="wren-portrait-section">
          <div className="portrait-frame wren-portrait">
            <Image
              src="/images/great-fire/christopher-wren-portrait.jpg"
              alt="Sir Christopher Wren, architect of the new St Paul's Cathedral"
              width={200}
              height={260}
              className="historical-portrait"
            />
            <span className="portrait-caption">Sir Christopher Wren</span>
          </div>
          <div className="wren-text">
            <p className="wren-lead">
              From the ashes, a genius emerged.
            </p>
            <p className="wren-body">
              <strong>Christopher Wren</strong>, 34 years old, professor of astronomy at Oxford, 
              presented King Charles II with a bold vision just days after the fire: 
              a new London built in stone, with wide boulevards and grand plazas.
            </p>
            <p className="wren-body">
              The plan was rejected—property rights made it impossible. But Wren would 
              reshape London anyway, one magnificent building at a time.
            </p>
          </div>
        </div>
      </div>

      <div className="dome-showcase" ref={domeRef}>
        <div className={`dome-illustration ${domeVisible ? 'reveal' : ''}`}>
          <Image
            src="/images/great-fire/st-pauls-framed-polishko.jpg"
            alt="St Paul's Cathedral dome viewed between modern London buildings"
            width={800}
            height={1140}
            className="st-pauls-photo"
            priority={false}
          />
          <span className="photo-credit">Photo by Lena Polishko / Unsplash</span>
        </div>
        <div className={`dome-details ${domeVisible ? 'reveal' : ''}`}>
          <h3>St Paul&apos;s Cathedral</h3>
          <p className="dome-subtitle">Wren&apos;s Masterpiece • 1675-1710</p>
          <p className="dome-description">
            Rising 365 feet from the rubble of Old St Paul&apos;s, Wren&apos;s cathedral 
            married English baroque with classical elegance. Its dome—inspired by 
            St Peter&apos;s in Rome—became the symbol of London&apos;s resurrection.
          </p>
          <div className="dome-stats">
            <div className="dome-stat">
              <span className="value">35</span>
              <span className="label">Years to build</span>
            </div>
            <div className="dome-stat">
              <span className="value">365</span>
              <span className="label">Feet tall</span>
            </div>
            <div className="dome-stat">
              <span className="value">850</span>
              <span className="label">Feet long</span>
            </div>
          </div>
        </div>
      </div>

      <div className="wren-buildings-grid" ref={buildingsRef}>
        <h3 className="buildings-title">Wren&apos;s London</h3>
        {wrenBuildings.map((building, index) => (
          <div 
            key={index}
            className={`building-card ${buildingsVisible ? 'reveal' : ''}`}
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            <span className="building-year">{building.year}</span>
            <h4 className="building-name">{building.name}</h4>
            <p className="building-description">{building.description}</p>
          </div>
        ))}
      </div>

      <blockquote className="wren-epitaph">
        <p>{`"Si monumentum requiris, circumspice."`}</p>
        <p className="translation">&quot;If you seek his monument, look around you.&quot;</p>
        <cite>— Inscription in St Paul&apos;s Cathedral, marking Wren&apos;s tomb</cite>
      </blockquote>
    </section>
  );
};

const MovementVI_Legacy: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.15);
  
  return (
    <section className="movement legacy">
      <div className="movement-header" ref={ref}>
        <span className={`movement-number ${isVisible ? 'reveal' : ''}`}>VI</span>
        <h2 className={`movement-title ${isVisible ? 'reveal' : ''}`}>Eternal Flame</h2>
        <p className={`movement-subtitle ${isVisible ? 'reveal' : ''}`}>The Fire&apos;s Lasting Legacy</p>
      </div>

      <div className="legacy-grid">
        <div className="legacy-item">
          <span className="legacy-icon">🧱</span>
          <h4>Building Codes Revolution</h4>
          <p>
            The Rebuilding Act of 1667 mandated brick and stone construction, 
            wider streets, and fire-resistant design—the world&apos;s first modern 
            building codes.
          </p>
        </div>
        
        <div className="legacy-item">
          <span className="legacy-icon">🚒</span>
          <h4>Fire Insurance & Brigades</h4>
          <p>
            Nicholas Barbon founded the first fire insurance company in 1680. 
            Insurance companies created their own fire brigades—the ancestors 
            of modern fire departments.
          </p>
        </div>
        
        <div className="legacy-item">
          <span className="legacy-icon">🏛️</span>
          <h4>English Baroque</h4>
          <p>
            Wren and his successors created a distinctly English architectural 
            style that influenced buildings worldwide, from American colonial 
            architecture to modern civic design.
          </p>
        </div>
        
        <div className="legacy-item">
          <span className="legacy-icon">📜</span>
          <h4>Urban Planning</h4>
          <p>
            Though Wren&apos;s grand plan wasn&apos;t implemented, the fire demonstrated 
            the need for planned urban development—a principle that shapes 
            cities to this day.
          </p>
        </div>
      </div>

      <div className="monument-section">
        <h3>The Monument</h3>
        <div className="monument-visual">
          <Image
            src="/images/great-fire/monument-great-fire-london.jpg"
            alt="The Monument to the Great Fire of London - a 202-foot Doric column topped with a gilded urn of flames"
            width={356}
            height={536}
            className="monument-photo"
          />
          <span className="photo-credit">Photo: Wikimedia Commons / CC BY-SA 3.0</span>
        </div>
        <p className="monument-description">
          Standing 202 feet tall—the exact distance from Pudding Lane—the Monument 
          is crowned with a gilded urn of flames. Climb its 311 steps for views 
          across the city that rose from the ashes.
        </p>
      </div>

      <div className="final-reflection">
        <p className="reflection-line large">
          From catastrophe, transformation.
        </p>
        <p className="reflection-body">
          The Great Fire destroyed medieval London, but it gave birth to the modern city. 
          In four days of destruction, London gained centuries of progress: building codes, 
          fire safety, urban planning, and architectural wonders that still define its skyline.
        </p>
        <p className="reflection-line">
          Every city that prevents fires owes a debt to the flames of 1666.
        </p>
      </div>

      <blockquote className="final-quote">
        <p>{`"London rises again, whether from its domestic ashes, or the spoils of foreign enemies, made more illustrious by its calamities."`}</p>
        <cite>— John Evelyn, writing to Samuel Pepys, 1666</cite>
      </blockquote>
    </section>
  );
};

const SourcesSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  
  return (
    <section className="sources-section" ref={ref}>
      <h2 className={`sources-title ${isVisible ? 'reveal' : ''}`}>Sources & Further Reading</h2>
      
      <div className={`sources-grid ${isVisible ? 'reveal' : ''}`}>
        <div className="source-category">
          <h3>Primary Sources</h3>
          <ul>
            <li>
              <strong>Samuel Pepys</strong> — <em>The Diary of Samuel Pepys</em> (1666)
              <span className="source-note">Eyewitness account of the fire&apos;s progress day by day</span>
            </li>
            <li>
              <strong>John Evelyn</strong> — <em>Diary</em> (1666)
              <span className="source-note">Another contemporary witness and future advisor on rebuilding</span>
            </li>
            <li>
              <strong>London Gazette</strong> — Issues of September 3-10, 1666
              <span className="source-note">Official government accounts during and after the fire</span>
            </li>
          </ul>
        </div>

        <div className="source-category">
          <h3>Historical Studies</h3>
          <ul>
            <li>
              <strong>Adrian Tinniswood</strong> — <em>By Permission of Heaven: The True Story of the Great Fire of London</em> (2003)
            </li>
            <li>
              <strong>Neil Hanson</strong> — <em>The Great Fire of London: In That Apocalyptic Year, 1666</em> (2001)
            </li>
            <li>
              <strong>Stephen Porter</strong> — <em>The Great Fire of London</em> (1996)
            </li>
          </ul>
        </div>

        <div className="source-category">
          <h3>Christopher Wren</h3>
          <ul>
            <li>
              <strong>Lisa Jardine</strong> — <em>On a Grander Scale: The Outstanding Life of Sir Christopher Wren</em> (2002)
            </li>
            <li>
              <strong>Kerry Downes</strong> — <em>Christopher Wren</em> (1971)
            </li>
            <li>
              <strong>Museum of London</strong> — Fire! Fire! Exhibition Archives
            </li>
          </ul>
        </div>

        <div className="source-category">
          <h3>Online Resources</h3>
          <ul>
            <li>
              <a href="https://www.pepysdiary.com/" target="_blank" rel="noopener noreferrer">
                Pepys Diary Online — Complete transcription with annotations
              </a>
            </li>
            <li>
              <a href="https://www.museumoflondon.org.uk/museum-london/great-fire-london" target="_blank" rel="noopener noreferrer">
                Museum of London — Great Fire of London Collection
              </a>
            </li>
            <li>
              <a href="https://www.stpauls.co.uk/history-collections" target="_blank" rel="noopener noreferrer">
                St Paul&apos;s Cathedral — History &amp; Collections
              </a>
            </li>
          </ul>
        </div>

        <div className="source-category">
          <h3>Image Credits</h3>
          <ul>
            <li>
              <strong>&quot;The Great Fire of London&quot;</strong> — Anonymous, c. 1675, oil on panel
              <span className="source-note">Museum of London (Accession #000793). Public domain. <a href="https://commons.wikimedia.org/wiki/File:Great_Fire_London.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></span>
            </li>
            <li>
              <strong>Panorama of London (1616)</strong> — Claes Visscher
              <span className="source-note">Pre-fire London showing Old St Paul&apos;s and medieval cityscape. Public domain. <a href="https://commons.wikimedia.org/wiki/File:Panorama_of_London_by_Claes_Van_Visscher,_1616.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></span>
            </li>
            <li>
              <strong>&quot;London After the Fire&quot;</strong> — Wenceslaus Hollar, 1666, etching
              <span className="source-note">View of London ruins looking from Southwark. Public domain. <a href="https://commons.wikimedia.org/wiki/File:London_after_the_fire.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></span>
            </li>
            <li>
              <strong>Portrait of Samuel Pepys</strong> — John Hayls, 1666, oil on canvas
              <span className="source-note">National Portrait Gallery, London. Public domain. <a href="https://commons.wikimedia.org/wiki/File:Samuel_Pepys.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></span>
            </li>
            <li>
              <strong>Portrait of Sir Christopher Wren</strong> — After Sir Godfrey Kneller
              <span className="source-note">Public domain. <a href="https://commons.wikimedia.org/wiki/File:Christopher_Wren.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></span>
            </li>
            <li>
              <strong>St Paul&apos;s Cathedral Dome</strong> — Lena Polishko
              <span className="source-note">Unsplash License (free for all uses). <a href="https://unsplash.com/photos/o6Z240AZfjw" target="_blank" rel="noopener noreferrer">Unsplash</a></span>
            </li>
            <li>
              <strong>The Monument to the Great Fire of London</strong>
              <span className="source-note">CC BY-SA 3.0. <a href="https://commons.wikimedia.org/wiki/File:The_Monument_to_the_Great_Fire_of_London.JPG" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function GreatFireClient() {
  const { progress } = useScrollProgress();
  
  return (
    <article className="great-fire-essay">
      {/* Progress indicator */}
      <div 
        className="fire-progress-bar" 
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
      
      {/* Hero Section */}
      <header className="fire-hero">
        <div className="hero-backdrop">
          <EmberParticles count={30} intensity="medium" />
        </div>
        
        <div className="hero-content">
          <span className="hero-date">September 2-5, 1666</span>
          <h1 className="hero-title">
            <span className="title-line">The Great Fire</span>
            <span className="title-line accent">of London</span>
          </h1>
          <p className="hero-subtitle">
            From Ashes to Empire
          </p>
          <p className="hero-description">
            When a spark in a bakery consumed medieval London—and gave birth to the modern city
          </p>
          
          <div className="hero-meta">
            <span className="meta-item">📖 16 min read</span>
            <span className="meta-item">🔥 1666</span>
            <span className="meta-item">🏛️ British History</span>
          </div>
        </div>
        
        <div className="hero-flame-decoration">
          <FlameAnimation className="hero-flame" />
        </div>
      </header>

      {/* Movements */}
      <main className="fire-narrative">
        <MovementI_Invocation />
        <MovementII_Kindling />
        <MovementIII_Inferno />
        <MovementIV_Devastation />
        <MovementV_Phoenix />
        <MovementVI_Legacy />
      </main>

      {/* Sources */}
      <SourcesSection />

      {/* Footer */}
      <footer className="fire-footer">
        <div className="footer-content">
          <PhoenixIcon className="footer-phoenix" />
          <p className="footer-text">
            From destruction, renewal. From ashes, empire.
          </p>
          <p className="footer-credit">
            A Visual Essay by <strong>Esy</strong>
          </p>
        </div>
      </footer>
    </article>
  );
}

