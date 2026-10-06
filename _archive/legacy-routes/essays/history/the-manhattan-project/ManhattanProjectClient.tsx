"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import "./manhattan-project.css";
import {
  heroImages,
  prologueImages,
  chapter1Images,
  chapter2Images,
  scientistImages,
  gadgetImages,
  trinityImages,
  decisionImages,
  hiroshimaImages,
  nagasakiImages,
  reckoningImages,
  epilogueImages,
} from "./images";

// ============================================================================
// DESIGN RESEARCH REPORT: THE MANHATTAN PROJECT
// ============================================================================
// Visual Archaeology: Declassified photographs, newsprint, government documents
// Color Palette: Deep black (#0D0D0D), aged gold (#C9B037), dark red (#8B0000),
//                warm white (#E8E8E8), searing flash (#FFFEF0), document cream (#D4C5A9)
// Typography: Condensed bold for headlines (Archivo Black/Oswald), 
//             clean serif for body (Source Serif), typewriter for documents
// Animation Philosophy: Cinematic reveals, Ken Burns photo treatment, scroll-lock zones
// Unique Interactions: Chain reaction progress bar, countdown timer, before/after slider
// Photo Treatment: High contrast B&W, subtle grain, vignetting, parallax depth
// ============================================================================

// ==================== TYPE DEFINITIONS ====================
interface ScrollLockState {
  containerRef: React.RefObject<HTMLDivElement | null>;
  progress: number;
  isPinned: boolean;
}

interface Scientist {
  name: string;
  title: string;
  age?: string;
  quote: string;
  photoPlaceholder: string;
  photoSrc?: string;
}

// ==================== CUSTOM HOOKS ====================

// Intersection observer for reveal animations
const useIntersectionReveal = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin: "0px 0px -100px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// Scroll-lock hook for pinned animation sections
const useScrollLock = (sectionHeight: number = 3): ScrollLockState => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionTotalHeight = rect.height;

      // Calculate progress through the scroll-lock section
      const scrollableDistance = sectionTotalHeight - windowHeight;
      const scrolledIntoSection = -sectionTop;

      if (sectionTop <= 0 && scrolledIntoSection <= scrollableDistance) {
        setIsPinned(true);
        const newProgress = Math.min(
          Math.max(scrolledIntoSection / scrollableDistance, 0),
          1
        );
        setProgress(newProgress);
      } else {
        // Unpin when above or below the scroll-lock zone
        setIsPinned(false);
        setProgress(sectionTop > 0 ? 0 : 1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionHeight]);

  return { containerRef, progress, isPinned };
};

// Global scroll progress for chain reaction bar
const useGlobalScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;
      const newProgress = Math.min(Math.max(scrollTop / scrollableHeight, 0), 1);
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
};

// ==================== CHAIN REACTION PROGRESS BAR ====================

const ChainReactionProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  // Calculate generations of chain reaction
  const generations = Math.floor(progress * 8); // 8 generations max
  const particles: { x: number; y: number; gen: number; id: number }[] = [];
  
  let particleId = 0;
  
  // Generate particle positions based on chain reaction pattern
  for (let gen = 0; gen <= generations; gen++) {
    const numParticles = Math.pow(2, gen);
    const spacing = 100 / (numParticles + 1);
    
    for (let i = 1; i <= numParticles; i++) {
      const x = (gen / 8) * 100; // Spread across width
      const y = spacing * i;
      const offset = (i - (numParticles + 1) / 2) * (100 / (numParticles * 2));
      particles.push({ 
        x: Math.min(x, progress * 100), 
        y: 50 + offset * 0.8, 
        gen, 
        id: particleId++ 
      });
    }
  }

  return (
    <div className="chain-reaction-progress" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
      <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="chain-svg">
        <defs>
          <radialGradient id="particle-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFEF0" stopOpacity="1" />
            <stop offset="50%" stopColor="#C9B037" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C9B037" stopOpacity="0" />
          </radialGradient>
          <filter id="particle-blur">
            <feGaussianBlur stdDeviation="0.3" />
          </filter>
        </defs>
        
        {/* Background track */}
        <rect x="0" y="9" width="100" height="2" fill="rgba(255,255,255,0.1)" rx="1" />
        
        {/* Chain reaction particles */}
        {particles.map((p) => (
          <circle
            key={p.id}
            cx={p.x}
            cy={p.y / 5 + 5}
            r={p.gen === generations ? 1.5 : 0.8}
            fill={p.gen === generations ? "url(#particle-glow)" : "#C9B037"}
            filter={p.gen === generations ? "url(#particle-blur)" : undefined}
            opacity={p.gen === generations ? 1 : 0.6}
            className="chain-particle"
          />
        ))}
        
        {/* Current position marker */}
        <circle
          cx={progress * 100}
          cy="10"
          r="2"
          fill="#FFFEF0"
          filter="url(#particle-blur)"
          className="chain-marker"
        />
      </svg>
      
      {/* Chapter markers */}
      <div className="chapter-markers">
        <span className="marker" style={{ left: "0%" }}>LETTER</span>
        <span className="marker" style={{ left: "12%" }}>CHAIN</span>
        <span className="marker" style={{ left: "24%" }}>SECRET</span>
        <span className="marker" style={{ left: "36%" }}>MINDS</span>
        <span className="marker" style={{ left: "48%" }}>GADGET</span>
        <span className="marker" style={{ left: "60%" }}>TRINITY</span>
        <span className="marker" style={{ left: "72%" }}>HIROSHIMA</span>
        <span className="marker" style={{ left: "84%" }}>NAGASAKI</span>
        <span className="marker" style={{ left: "96%" }}>END</span>
      </div>
    </div>
  );
};

// ==================== ARCHIVAL PHOTO COMPONENT ====================

interface ArchivalPhotoProps {
  src?: string;
  alt: string;
  caption: string;
  source: string;
  date?: string;
  className?: string;
  parallaxSpeed?: number;
  kenBurns?: boolean;
}

const ArchivalPhoto: React.FC<ArchivalPhotoProps> = ({
  src,
  alt,
  caption,
  source,
  date,
  className = "",
  parallaxSpeed = 1,
  kenBurns = false,
}) => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  
  return (
    <figure 
      ref={ref}
      className={`archival-photo ${className} ${isVisible ? "revealed" : ""} ${kenBurns ? "ken-burns" : ""}`}
      style={{ "--parallax-speed": parallaxSpeed } as React.CSSProperties}
    >
      <div className="photo-frame">
        {src ? (
          <img 
            src={src} 
            alt={alt}
            className="archival-img"
          />
        ) : (
          <div className="photo-placeholder" aria-label={alt}>
            <span className="placeholder-text">{alt}</span>
            <span className="placeholder-source">{source}</span>
          </div>
        )}
        <div className="photo-vignette" />
        <div className="photo-grain" />
      </div>
      <figcaption>
        <span className="caption-text">{caption}</span>
        <span className="caption-meta">
          {date && <span className="caption-date">{date}</span>}
          <span className="caption-source">{source}</span>
        </span>
      </figcaption>
    </figure>
  );
};

// ==================== BEFORE/AFTER SLIDER ====================

const BeforeAfterSlider: React.FC<{
  beforeAlt: string;
  afterAlt: string;
  caption: string;
}> = ({ beforeAlt, afterAlt, caption }) => {
  const [position, setPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!sliderRef.current || !isDragging.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setPosition(percentage);
  }, []);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <figure className="before-after-slider">
      <div 
        ref={sliderRef}
        className="slider-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseDown}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        role="slider"
        aria-label="Before and after comparison slider"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
      >
        {/* Before image (full width) */}
        <div className="slider-image before" aria-label={beforeAlt}>
          <img 
            src={hiroshimaImages.hiroshimaBefore.src} 
            alt={beforeAlt}
            className="slider-photo"
          />
          <span className="label">BEFORE</span>
        </div>
        
        {/* After image (clipped) */}
        <div 
          className="slider-image after" 
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          aria-label={afterAlt}
        >
          <img 
            src={hiroshimaImages.hiroshimaAfter.src} 
            alt={afterAlt}
            className="slider-photo"
          />
          <span className="label">AFTER</span>
        </div>
        
        {/* Slider handle */}
        <div className="slider-handle" style={{ left: `${position}%` }}>
          <div className="handle-line" />
          <div className="handle-grip">
            <span>◄</span>
            <span>►</span>
          </div>
        </div>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
};

// ==================== SCIENTIST PORTRAIT GALLERY ====================

const ScientistPortrait: React.FC<{ scientist: Scientist; delay: number }> = ({ 
  scientist, 
  delay 
}) => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <article 
      ref={ref}
      className={`scientist-portrait ${isVisible ? "revealed" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="portrait-frame">
        {scientist.photoSrc ? (
          <>
            <img 
              src={scientist.photoSrc} 
              alt={scientist.photoPlaceholder}
              className="portrait-photo-img"
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
            />
            {!imageLoaded && (
              <div className="photo-placeholder portrait-photo" aria-hidden="true">
                <span className="placeholder-text">Loading...</span>
              </div>
            )}
          </>
        ) : (
          <div className="photo-placeholder portrait-photo">
            <span className="placeholder-text">{scientist.photoPlaceholder}</span>
          </div>
        )}
        <div className="photo-vignette" />
      </div>
      <div className="portrait-info">
        <h4 className="scientist-name">{scientist.name}</h4>
        <span className="scientist-title">{scientist.title}</span>
        {scientist.age && <span className="scientist-age">Age {scientist.age}</span>}
        <blockquote className="scientist-quote">&ldquo;{scientist.quote}&rdquo;</blockquote>
      </div>
    </article>
  );
};

// ==================== DOCUMENT REVEAL COMPONENT ====================

const DocumentReveal: React.FC<{
  lines: string[];
  highlights?: number[];
  title: string;
}> = ({ lines, highlights = [], title }) => {
  const { containerRef, progress, isPinned } = useScrollLock(2);
  const visibleLines = Math.floor(progress * lines.length);
  
  // When scrolled past (progress >= 1), position at bottom of container
  const isComplete = progress >= 1 && !isPinned;
  
  return (
    <div 
      ref={containerRef}
      className="document-reveal scroll-lock-container"
      style={{ height: "200vh" }}
    >
      <div 
        className={`document-pinned ${isPinned ? "is-pinned" : ""} ${isComplete ? "is-complete" : ""}`}
      >
        <div className="document-paper">
          <h4 className="document-title">{title}</h4>
          <div className="document-content">
            {lines.map((line, i) => (
              <p 
                key={i}
                className={`document-line ${i < visibleLines ? "visible" : ""} ${highlights.includes(i) ? "highlighted" : ""}`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {line}
              </p>
            ))}
          </div>
          <div className="document-seal" />
        </div>
      </div>
    </div>
  );
};

// ==================== COUNTDOWN TIMER ====================

const CountdownTimer: React.FC<{ progress: number }> = ({ progress }) => {
  // Trinity countdown: 44 seconds before detonation
  const totalSeconds = 44;
  const remainingSeconds = Math.max(0, totalSeconds - Math.floor(progress * (totalSeconds + 5)));
  const hours = "05";
  const minutes = "29";
  const seconds = remainingSeconds.toString().padStart(2, "0");
  
  return (
    <div className="countdown-timer" aria-live="polite" aria-label={`Countdown: ${remainingSeconds} seconds`}>
      <div className="timer-display">
        <span className="timer-segment hours">{hours}</span>
        <span className="timer-separator">:</span>
        <span className="timer-segment minutes">{minutes}</span>
        <span className="timer-separator">:</span>
        <span className="timer-segment seconds">{seconds}</span>
      </div>
      <span className="timer-label">T-MINUS</span>
    </div>
  );
};

// ==================== HERO SECTION ====================

const HeroSection: React.FC = () => {
  const { containerRef, progress, isPinned } = useScrollLock(3);
  
  // Phase calculations for the Trinity countdown
  const phase = useMemo(() => {
    if (progress < 0.1) return "darkness";
    if (progress < 0.3) return "silhouettes";
    if (progress < 0.5) return "tower";
    if (progress < 0.6) return "flash";
    if (progress < 0.8) return "fireball";
    if (progress < 0.95) return "mushroom";
    return "oppenheimer";
  }, [progress]);
  
  const flashOpacity = phase === "flash" ? 1 : 0;
  const contentOpacity = phase === "flash" ? 0 : 1;
  
  return (
    <header
      className={`hero-section scroll-lock-container phase-${phase}`}
      ref={containerRef}
      style={{ height: "350vh" }}
    >
      <div className={`hero-pinned ${isPinned ? "is-pinned" : ""}`}>
        {/* Complete darkness with date */}
        <div className="hero-darkness" style={{ opacity: phase === "darkness" ? 1 : 0 }}>
          <div className="hero-date">
            <span className="date-month">July 16, 1945</span>
            <span className="date-time">5:29 AM</span>
          </div>
          <div className="hero-location">
            <span>Trinity Site</span>
            <span>Jornada del Muerto Desert</span>
            <span>New Mexico</span>
          </div>
        </div>
        
        {/* Countdown timer */}
        {(phase === "silhouettes" || phase === "tower") && (
          <CountdownTimer progress={progress} />
        )}
        
        {/* Silhouettes emerge */}
        <div 
          className="hero-silhouettes"
          style={{ 
            opacity: phase === "silhouettes" || phase === "tower" ? 1 : 0,
            transform: `translateY(${phase === "silhouettes" ? 20 : 0}px)`
          }}
        >
          <div className="silhouette bunker" />
          <div className="silhouette mountains" />
          <div className="silhouette tower" style={{ 
            opacity: phase === "tower" ? 1 : 0.3 
          }} />
        </div>
        
        {/* The flash */}
        <div 
          className="hero-flash"
          style={{ opacity: flashOpacity }}
          aria-hidden="true"
        />
        
        {/* Fireball photograph */}
        <div 
          className="hero-fireball"
          style={{ 
            opacity: phase === "fireball" ? 1 : 0,
            transform: `scale(${phase === "fireball" ? 1 + (progress - 0.6) * 0.5 : 1})`
          }}
        >
          <img 
            src={heroImages.trinityFireball.src}
            alt={heroImages.trinityFireball.alt}
            className="hero-photo-img fireball-photo"
          />
        </div>
        
        {/* Mushroom cloud */}
        <div 
          className="hero-mushroom"
          style={{ 
            opacity: phase === "mushroom" || phase === "oppenheimer" ? 1 : 0,
            transform: `scale(${phase === "mushroom" ? 0.9 + (progress - 0.8) * 0.5 : 1})`
          }}
        >
          <img 
            src={heroImages.trinityMushroom.src}
            alt={heroImages.trinityMushroom.alt}
            className="hero-photo-img mushroom-photo"
          />
        </div>
        
        {/* Oppenheimer overlay */}
        <div 
          className="hero-oppenheimer"
          style={{ opacity: phase === "oppenheimer" ? 1 : 0 }}
        >
          <div className="oppenheimer-portrait">
            <img 
              src={heroImages.oppenheimer.src}
              alt={heroImages.oppenheimer.alt}
              className="oppenheimer-photo-img"
            />
          </div>
          <blockquote className="oppenheimer-quote">
            <p className="quote-text">
              <span className="word" style={{ animationDelay: "0s" }}>Now</span>{" "}
              <span className="word" style={{ animationDelay: "0.3s" }}>I</span>{" "}
              <span className="word" style={{ animationDelay: "0.5s" }}>am</span>{" "}
              <span className="word" style={{ animationDelay: "0.7s" }}>become</span>{" "}
              <span className="word" style={{ animationDelay: "1s" }}>Death,</span>{" "}
              <span className="word" style={{ animationDelay: "1.5s" }}>the</span>{" "}
              <span className="word" style={{ animationDelay: "1.7s" }}>destroyer</span>{" "}
              <span className="word" style={{ animationDelay: "2s" }}>of</span>{" "}
              <span className="word" style={{ animationDelay: "2.2s" }}>worlds.</span>
            </p>
            <cite>— Bhagavad Gita, recalled by Oppenheimer</cite>
          </blockquote>
        </div>
        
        {/* Title card */}
        <div 
          className="hero-title-card"
          style={{ opacity: progress > 0.95 ? 1 : 0 }}
        >
          <h1 className="hero-title">THE MANHATTAN PROJECT</h1>
          <p className="hero-subtitle">The Scientists, The Secret, The Bomb That Ended One War and Started Another</p>
        </div>
        
      </div>
    </header>
  );
};

// ==================== PROLOGUE: THE LETTER ====================

const PrologueSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.05);
  const einsteinLetterLines = [
    "Sir,",
    "Some recent work by E. Fermi and L. Szilard, which has been",
    "communicated to me in manuscript, leads me to expect that the",
    "element uranium may be turned into a new and important source",
    "of energy in the immediate future.",
    "",
    "This new phenomenon would also lead to the construction of bombs,",
    "and it is conceivable—though much less certain—that extremely",
    "powerful bombs of a new type may thus be constructed.",
    "A single bomb of this type, carried by boat and exploded in a port,",
    "might very well destroy the whole port together with some of",
    "the surrounding territory.",
  ];

  return (
    <section id="prologue" className="chapter prologue" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-date">August 2, 1939</span>
          <h2 className="chapter-title">The Letter That Started It All</h2>
          <p className="chapter-metaphor">The match that lit the fuse</p>
        </header>
        
        <div className="chapter-grid">
          <div className="chapter-visual">
            <ArchivalPhoto
              src={prologueImages.einstein.src}
              alt={prologueImages.einstein.alt}
              caption={prologueImages.einstein.caption}
              source={prologueImages.einstein.source}
              date={prologueImages.einstein.date}
              kenBurns
            />
          </div>
          
          <div className="chapter-text">
            <p className="chapter-intro">
              Leo Szilard, a Hungarian physicist haunted by visions of chain reactions, 
              convinced Albert Einstein to sign a letter to President Franklin D. Roosevelt. 
              Germany had stopped selling uranium from occupied Czech mines. The Nazis might 
              be building a bomb. America could not afford to lose this race.
            </p>
            
            <div className="key-figure">
              <h3>Albert Einstein — The Reluctant Catalyst</h3>
              <ul className="figure-facts">
                <li>Signed the letter that launched the project</li>
                <li>Never worked on the bomb itself (denied security clearance)</li>
                <li>Later called signing &ldquo;the one great mistake in my life&rdquo;</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <DocumentReveal
        title="Einstein-Szilard Letter to President Roosevelt"
        lines={einsteinLetterLines}
        highlights={[6, 7, 8, 9, 10]}
      />
      
      <div className="chapter-aftermath">
        <p>
          Roosevelt&apos;s response: He created the Advisory Committee on Uranium. 
          <strong> The first domino fell.</strong>
        </p>
      </div>
    </section>
  );
};

// ==================== CHAPTER 1: CHAIN REACTION ====================

const Chapter1: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.2);

  return (
    <section id="chapter-1" className="chapter chapter-1" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 1</span>
          <span className="chapter-date">December 2, 1942 — Chicago, Illinois</span>
          <h2 className="chapter-title">Chain Reaction</h2>
          <p className="chapter-metaphor">Lighting a match in a room full of gasoline—and controlling it</p>
        </header>
        
        <div className="chapter-grid">
          <div className="chapter-visual full-width">
            <ArchivalPhoto
              src={chapter1Images.chicagoPile.src}
              alt={chapter1Images.chicagoPile.alt}
              caption={chapter1Images.chicagoPile.caption}
              source={chapter1Images.chicagoPile.source}
              date={chapter1Images.chicagoPile.date}
              className="hero-photo"
              kenBurns
            />
          </div>
          
          <div className="chapter-text">
            <p>
              Beneath the abandoned football stadium at the University of Chicago, Enrico Fermi 
              and his team stacked 40,000 graphite blocks interspersed with uranium. They called 
              it <strong>Chicago Pile-1</strong>.
            </p>
            
            <div className="timestamp-moment">
              <span className="timestamp">3:25 PM</span>
              <p>Fermi ordered the control rods withdrawn.</p>
            </div>
            
            <p>
              For 28 minutes, humanity sustained a controlled chain reaction. Then Fermi ordered 
              shutdown. Arthur Compton called James Conant with the coded message:
            </p>
            
            <blockquote className="historic-quote">
              <p>&ldquo;The Italian navigator has just landed in the new world.&rdquo;</p>
              <cite>— Arthur Compton to James Conant</cite>
            </blockquote>
          </div>
        </div>
        
        <div className="key-figure featured">
          <ArchivalPhoto
            src={chapter1Images.fermi.src}
            alt={chapter1Images.fermi.alt}
            caption={chapter1Images.fermi.caption}
            source={chapter1Images.fermi.source}
            className="figure-photo"
          />
          <div className="figure-content">
            <h3>Enrico Fermi — The Architect of the Atom</h3>
            <ul className="figure-facts">
              <li>Italian refugee who fled Mussolini&apos;s racial laws</li>
              <li>Built the first nuclear reactor</li>
              <li>Known for preternatural calmness—calculated survival odds during Trinity test</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 2: THE SECRET CITY ====================

const Chapter2: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.2);

  return (
    <section id="chapter-2" className="chapter chapter-2" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 2</span>
          <span className="chapter-date">1943-1945 — Los Alamos, New Mexico</span>
          <h2 className="chapter-title">The Secret City</h2>
          <p className="chapter-metaphor">Pandora&apos;s Box, constructed in the desert</p>
        </header>
        
        <div className="photo-grid">
          <ArchivalPhoto
            src={chapter2Images.losAlamosGate.src}
            alt={chapter2Images.losAlamosGate.alt}
            caption={chapter2Images.losAlamosGate.caption}
            source={chapter2Images.losAlamosGate.source}
            date={chapter2Images.losAlamosGate.date}
          />
          <ArchivalPhoto
            src={chapter2Images.grovesOppenheimer.src}
            alt={chapter2Images.grovesOppenheimer.alt}
            caption={chapter2Images.grovesOppenheimer.caption}
            source={chapter2Images.grovesOppenheimer.source}
            date={chapter2Images.grovesOppenheimer.date}
          />
          <ArchivalPhoto
            src={chapter2Images.losAlamosPostOffice?.src || ""}
            alt="PO Box 1663 — the only mailing address allowed"
            caption="Every letter, every package—addressed to a single PO Box."
            source="Los Alamos National Laboratory"
          />
          <ArchivalPhoto
            src={chapter2Images.losAlamosFamilies?.src || ""}
            alt="Scientists' families in the makeshift town"
            caption="Children were born in a city that didn't exist."
            source="Los Alamos Historical Society"
            date="1944"
          />
        </div>
        
        <div className="chapter-text centered">
          <p>
            General Leslie Groves selected a remote boys&apos; school on a New Mexico mesa. 
            Within months, it became a secret city of 6,000—the greatest concentration of 
            scientific genius ever assembled.
          </p>
          
          <div className="codenames">
            <div className="codename">
              <span className="code">Site Y</span>
              <span className="meaning">The town</span>
            </div>
            <div className="codename">
              <span className="code">The Manhattan Engineer District</span>
              <span className="meaning">The project</span>
            </div>
            <div className="codename">
              <span className="code">The Gadget</span>
              <span className="meaning">The bomb</span>
            </div>
          </div>
        </div>
        
        <div className="dual-profiles">
          <div className="key-figure">
            <ArchivalPhoto
              src={chapter2Images.oppenheimerHat.src}
              alt={chapter2Images.oppenheimerHat.alt}
              caption={chapter2Images.oppenheimerHat.caption}
              source={chapter2Images.oppenheimerHat.source}
              className="figure-photo"
            />
            <h3>J. Robert Oppenheimer</h3>
            <span className="figure-title">The Haunted Prometheus</span>
            <ul className="figure-facts">
              <li>Theoretical physicist, poet, linguist</li>
              <li>Appointed scientific director at age 38</li>
              <li>Read the Bhagavad Gita in Sanskrit</li>
              <li>Would later be destroyed by the government he served</li>
            </ul>
          </div>
          
          <div className="key-figure">
            <ArchivalPhoto
              src={chapter2Images.groves.src}
              alt={chapter2Images.groves.alt}
              caption={chapter2Images.groves.caption}
              source={chapter2Images.groves.source}
              className="figure-photo"
            />
            <h3>General Leslie Groves</h3>
            <span className="figure-title">The Man Who Built the Impossible</span>
            <ul className="figure-facts">
              <li>Army engineer who built the Pentagon</li>
              <li>Managed 125,000 workers, billions of dollars, in total secrecy</li>
              <li>Chose Oppenheimer despite security concerns</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 3: THE MINDS ====================

const Chapter3: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.2);
  
  const scientists: Scientist[] = [
    {
      name: "Niels Bohr",
      title: "The Father Figure",
      quote: "We are in a completely new situation that cannot be resolved by war.",
      photoPlaceholder: "Bohr in contemplation, pipe in hand",
      photoSrc: scientistImages.bohr.src
    },
    {
      name: "Richard Feynman",
      title: "The Irreverent Genius",
      age: "24",
      quote: "I learned to type with one hand so I could hold my wife's letters with the other.",
      photoPlaceholder: "Feynman grinning, mischief incarnate",
      photoSrc: scientistImages.feynman.src
    },
    {
      name: "Leo Szilard",
      title: "The Conscience",
      quote: "We turned the switch, saw the flashes, watched for ten minutes, then switched everything off and went home.",
      photoPlaceholder: "Szilard, intense gaze",
      photoSrc: scientistImages.szilard.src
    },
    {
      name: "Edward Teller",
      title: "The Hawk",
      quote: "The main purpose of the H-bomb is to maintain peace.",
      photoPlaceholder: "Teller, bushy eyebrows",
      photoSrc: scientistImages.teller.src
    },
    {
      name: "Hans Bethe",
      title: "The Calculator",
      quote: "If we fight a war and win it with H-bombs, what history will remember is not the ideals we were fighting for.",
      photoPlaceholder: "Bethe at the blackboard",
      photoSrc: scientistImages.bethe.src
    },
    {
      name: "Klaus Fuchs",
      title: "The Spy",
      quote: "I had complete confidence in Russian policy.",
      photoPlaceholder: "Fuchs, quiet and unassuming",
      photoSrc: scientistImages.fuchs.src
    }
  ];

  return (
    <section id="chapter-3" className="chapter chapter-3" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 3</span>
          <span className="chapter-date">The Scientists of Site Y</span>
          <h2 className="chapter-title">The Minds Behind the Monster</h2>
          <p className="chapter-metaphor">Prometheus stealing fire—knowing he would be punished</p>
        </header>
        
        <div className="chapter-intro-text">
          <p>
            They came from across Europe, refugees from fascism now building the ultimate 
            weapon to defeat it. They came from American universities, abandoning tenure 
            for secrecy. Many were in their twenties. They argued about physics during the 
            day and played poker at night. They knew they were making something terrible. 
            <strong> They made it anyway.</strong>
          </p>
        </div>
        
        <div className="scientists-gallery">
          {scientists.map((scientist, index) => (
            <ScientistPortrait 
              key={scientist.name} 
              scientist={scientist} 
              delay={index * 100} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 4: THE GADGET ====================

const Chapter4: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.2);

  return (
    <section id="chapter-4" className="chapter chapter-4" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 4</span>
          <span className="chapter-date">1944-1945 — Designing the Unthinkable</span>
          <h2 className="chapter-title">The Gadget</h2>
          <p className="chapter-metaphor">Midwifing a monster</p>
        </header>
        
        <div className="chapter-grid">
          <div className="chapter-text">
            <p>
              Two paths to the bomb. The uranium bomb (<strong>&ldquo;Little Boy&rdquo;</strong>) 
              was a simple gun-type design—fire one piece of uranium into another. They were 
              so confident it would work, they never tested it.
            </p>
            
            <p>
              The plutonium bomb was different. Plutonium couldn&apos;t use gun-type assembly. 
              It required <em>implosion</em>—explosives arranged with perfect symmetry to 
              compress a plutonium core to critical density in microseconds.
            </p>
            
            <div className="technical-detail">
              <h4>The Implosion Problem</h4>
              <p>
                The explosive lenses had to be machined to tolerances previously thought 
                impossible. If the symmetry was even slightly off, the bomb would fizzle.
              </p>
            </div>
            
            <p>
              They called the plutonium device <strong>&ldquo;The Gadget.&rdquo;</strong> It would be tested first.
            </p>
          </div>
          
          <div className="chapter-visual">
            <ArchivalPhoto
              src={gadgetImages.gadgetHoisted.src}
              alt={gadgetImages.gadgetHoisted.alt}
              caption={gadgetImages.gadgetHoisted.caption}
              source={gadgetImages.gadgetHoisted.source}
              date={gadgetImages.gadgetHoisted.date}
              className="hero-photo"
              kenBurns
            />
          </div>
        </div>
        
        <div className="photo-grid">
          <ArchivalPhoto
            src={gadgetImages.assembly.src}
            alt={gadgetImages.assembly.alt}
            caption={gadgetImages.assembly.caption}
            source={gadgetImages.assembly.source}
            date={gadgetImages.assembly.date}
          />
          <ArchivalPhoto
            src={gadgetImages.implosionLenses?.src || ""}
            alt="Implosion lens system assembly"
            caption="32 explosive lenses arranged in perfect symmetry — if even one was off, the bomb would fizzle."
            source="Los Alamos National Laboratory"
          />
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 5: TRINITY ====================

const Chapter5: React.FC = () => {
  const { containerRef, progress, isPinned } = useScrollLock(4);
  
  const phase = useMemo(() => {
    if (progress < 0.2) return "tower";
    if (progress < 0.3) return "countdown";
    if (progress < 0.5) return "flash";
    if (progress < 0.7) return "fireball-sequence";
    if (progress < 0.85) return "mushroom";
    return "aftermath";
  }, [progress]);

  return (
    <section 
      id="chapter-5" 
      className={`chapter chapter-5 trinity-chapter scroll-lock-container phase-${phase}`}
      ref={containerRef}
      style={{ height: "450vh" }}
    >
      <div className={`chapter-pinned ${isPinned ? "is-pinned" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 5</span>
          <span className="chapter-date">July 16, 1945 — 5:29:45 AM</span>
          <h2 className="chapter-title">Trinity</h2>
          <p className="chapter-metaphor">Prometheus unbound. Pandora&apos;s box opened. The genie released.</p>
        </header>
        
        {/* Tower at night */}
        <div className="trinity-stage tower-stage">
          <img 
            src={trinityImages.towerWithGadget.src}
            alt={trinityImages.towerWithGadget.alt}
            className="trinity-photo tower-photo"
          />
          <div className="scientist-names">
            <span>Oppenheimer</span>
            <span>Fermi</span>
            <span>Bainbridge</span>
            <span>Bethe</span>
          </div>
        </div>
        
        {/* Countdown */}
        {(phase === "countdown" || phase === "tower") && (
          <div className="trinity-countdown">
            <span className="countdown-number">
              {Math.max(0, 10 - Math.floor(progress * 35))}
            </span>
          </div>
        )}
        
        {/* Flash */}
        <div className={`trinity-flash ${phase === "flash" ? "active" : ""}`} />
        
        {/* Fireball sequence */}
        <div className="trinity-stage fireball-stage">
          <div className="fireball-sequence">
            <div className="fireball-frame fireball-1">
              <img src={trinityImages.fireball006.src} alt={trinityImages.fireball006.alt} />
              <span className="fireball-time">0.006s</span>
            </div>
            <div className="fireball-frame fireball-2">
              <img src={trinityImages.fireball016.src} alt={trinityImages.fireball016.alt} />
              <span className="fireball-time">0.016s</span>
            </div>
            <div className="fireball-frame fireball-3">
              <img src={trinityImages.fireball025.src} alt={trinityImages.fireball025.alt} />
              <span className="fireball-time">0.025s</span>
            </div>
          </div>
          <p className="fireball-caption">
            Millisecond by millisecond, humanity witnessed its new power.
          </p>
        </div>
        
        {/* Mushroom cloud */}
        <div className="trinity-stage mushroom-stage">
          <img 
            src={trinityImages.mushroomCloud.src}
            alt={trinityImages.mushroomCloud.alt}
            className="trinity-photo mushroom-cloud"
          />
          <div className="observation-silhouettes">
            <div className="observer" />
            <div className="observer" />
            <div className="observer" />
          </div>
        </div>
        
        {/* Aftermath */}
        <div className="trinity-stage aftermath-stage">
          <div className="aftermath-grid">
            <div className="aftermath-photo">
              <img src={trinityImages.groundZero.src} alt={trinityImages.groundZero.alt} />
              <span className="photo-label">Oppenheimer and Groves at Ground Zero</span>
            </div>
            <div className="aftermath-photo">
              <img src={trinityImages.trinitite.src} alt={trinityImages.trinitite.alt} />
              <span className="photo-label">Trinitite — desert sand fused to glass</span>
            </div>
          </div>
          
          <blockquote className="bainbridge-quote">
            <p>&ldquo;Now we are all sons of bitches.&rdquo;</p>
            <cite>— Kenneth Bainbridge, Trinity Test Director</cite>
          </blockquote>
          
          <div className="trinity-stats-inline">
            <div className="stat">
              <span className="stat-value">21,000</span>
              <span className="stat-label">tons of TNT equivalent</span>
            </div>
            <div className="stat">
              <span className="stat-value">8</span>
              <span className="stat-label">miles high</span>
            </div>
            <div className="stat">
              <span className="stat-value">100</span>
              <span className="stat-label">miles away, people saw the flash</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 6: THE DECISION ====================

const Chapter6: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.2);
  const targetCities = [
    { name: "Kyoto", status: "rejected", reason: "Too much cultural significance" },
    { name: "Hiroshima", status: "selected", reason: "Intact, military installations, hills to focus blast" },
    { name: "Kokura", status: "backup", reason: "Arsenal and industrial center" },
    { name: "Nagasaki", status: "backup", reason: "Major seaport" },
    { name: "Niigata", status: "backup", reason: "Industrial center" },
  ];

  return (
    <section id="chapter-6" className="chapter chapter-6" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 6</span>
          <span className="chapter-date">July — August 1945</span>
          <h2 className="chapter-title">The Decision</h2>
          <p className="chapter-metaphor">The point of no return</p>
        </header>
        
        <div className="chapter-text centered">
          <p className="chapter-intro">
            Germany had surrendered in May. The bomb had been built to defeat Hitler, 
            but Hitler was dead. <strong>Now it would be used against Japan.</strong>
          </p>
        </div>
        
        <div className="target-committee">
          <h3>The Target Committee</h3>
          <p className="committee-note">
            They selected cities that had been spared conventional bombing—they needed 
            undamaged targets to measure the bomb&apos;s effects.
          </p>
          
          <div className="target-list">
            {targetCities.map((city) => (
              <div key={city.name} className={`target-city ${city.status}`}>
                <span className="city-name">{city.name}</span>
                <span className="city-status">{city.status.toUpperCase()}</span>
                <span className="city-reason">{city.reason}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="chapter-grid">
          <div className="chapter-visual">
            <ArchivalPhoto
              src={decisionImages.trumanPotsdam.src}
              alt={decisionImages.trumanPotsdam.alt}
              caption={decisionImages.trumanPotsdam.caption}
              source={decisionImages.trumanPotsdam.source}
              date={decisionImages.trumanPotsdam.date}
              className="truman-photo"
              kenBurns
            />
          </div>
          
          <div className="chapter-text">
            <div className="key-figure">
              <h3>Harry S. Truman</h3>
              <span className="figure-title">The Man Who Gave the Order</span>
              <ul className="figure-facts">
                <li>Became president 82 days before Trinity</li>
                <li>Learned of the bomb&apos;s existence only after taking office</li>
                <li>Wrote in his diary: &ldquo;the most terrible thing ever discovered&rdquo;</li>
                <li>Authorized its use without apparent hesitation</li>
              </ul>
            </div>
            
            <div className="petition-note">
              <p>
                Some scientists petitioned against using it on civilians. 
                <strong> Their petition never reached Truman.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 7: LITTLE BOY ====================

const Chapter7: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.2);

  return (
    <section id="chapter-7" className="chapter chapter-7 hiroshima-chapter" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 7</span>
          <span className="chapter-date">August 6, 1945 — Hiroshima</span>
          <h2 className="chapter-title">Little Boy</h2>
          <p className="chapter-metaphor">The flash that erased shadows—and left them burned into stone</p>
        </header>
        
        <div className="photo-grid hiroshima-grid">
          <ArchivalPhoto
            src={hiroshimaImages.enolaGay.src}
            alt={hiroshimaImages.enolaGay.alt}
            caption={hiroshimaImages.enolaGay.caption}
            source={hiroshimaImages.enolaGay.source}
            date={hiroshimaImages.enolaGay.date}
          />
          <ArchivalPhoto
            src={hiroshimaImages.tibbets.src}
            alt={hiroshimaImages.tibbets.alt}
            caption={hiroshimaImages.tibbets.caption}
            source={hiroshimaImages.tibbets.source}
            date={hiroshimaImages.tibbets.date}
          />
        </div>
        
        <div className="timestamp-sequence">
          <div className="timestamp-moment major">
            <span className="timestamp">8:15 AM</span>
            <span className="timestamp-local">Local Time</span>
            <p>
              The Enola Gay released a single uranium bomb over Hiroshima. 
              43 seconds later, at 1,900 feet above Shima Surgical Clinic, it detonated.
            </p>
          </div>
        </div>
        
        <div className="destruction-facts">
          <div className="fact">
            <span className="fact-value">7,000°F</span>
            <span className="fact-label">Temperature at ground zero in the first second</span>
          </div>
          <div className="fact">
            <span className="fact-value">80,000</span>
            <span className="fact-label">Killed instantly</span>
          </div>
          <div className="fact">
            <span className="fact-value">140,000</span>
            <span className="fact-label">Dead by end of 1945</span>
          </div>
        </div>
        
        <BeforeAfterSlider
          beforeAlt="Hiroshima before — August 5, 1945 (aerial reconnaissance)"
          afterAlt="Hiroshima after — August 7, 1945 (complete devastation)"
          caption="Drag to reveal the destruction. The city disappeared under your scroll."
        />
        
        <div className="shadow-memorial">
          <ArchivalPhoto
            src={hiroshimaImages.humanShadow.src}
            alt={hiroshimaImages.humanShadow.alt}
            caption={hiroshimaImages.humanShadow.caption}
            source={hiroshimaImages.humanShadow.source}
            date={hiroshimaImages.humanShadow.date}
            className="shadow-photo"
          />
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 8: FAT MAN ====================

const Chapter8: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.2);

  return (
    <section id="chapter-8" className="chapter chapter-8 nagasaki-chapter" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 8</span>
          <span className="chapter-date">August 9, 1945 — Nagasaki</span>
          <h2 className="chapter-title">Fat Man</h2>
          <p className="chapter-metaphor">The second blow</p>
        </header>
        
        <div className="chapter-text centered">
          <p className="chapter-intro">
            The primary target was Kokura. But clouds obscured the city. After three 
            failed bombing runs and low fuel, pilot Charles Sweeney diverted to the 
            secondary target: <strong>Nagasaki.</strong>
          </p>
        </div>
        
        <div className="photo-grid">
          <ArchivalPhoto
            src={nagasakiImages.fatMan.src}
            alt={nagasakiImages.fatMan.alt}
            caption={nagasakiImages.fatMan.caption}
            source={nagasakiImages.fatMan.source}
            date={nagasakiImages.fatMan.date}
          />
          <ArchivalPhoto
            src={nagasakiImages.nagasakiCloud.src}
            alt={nagasakiImages.nagasakiCloud.alt}
            caption={nagasakiImages.nagasakiCloud.caption}
            source={nagasakiImages.nagasakiCloud.source}
            date={nagasakiImages.nagasakiCloud.date}
            className="color-photo"
          />
        </div>
        
        <div className="nagasaki-tragedy">
          <p>
            The bomb missed its aim point by nearly two miles. The hills of Nagasaki 
            contained the blast, limiting damage compared to Hiroshima.
          </p>
          
          <div className="destruction-facts">
            <div className="fact">
              <span className="fact-value">40,000</span>
              <span className="fact-label">Killed instantly</span>
            </div>
          </div>
        </div>
        
        <div className="cathedral-section">
          <ArchivalPhoto
            src={nagasakiImages.urakamiCathedral.src}
            alt={nagasakiImages.urakamiCathedral.alt}
            caption={nagasakiImages.urakamiCathedral.caption}
            source={nagasakiImages.urakamiCathedral.source}
            className="cathedral-photo"
          />
          <p className="cathedral-note">
            The bomb that killed the most Christians in a single moment in history fell on 
            a city chosen as a backup target.
          </p>
        </div>
        
        <div className="chapter-aftermath">
          <p className="surrender-note">
            <strong>Six days later, Japan surrendered.</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 9: THE RECKONING ====================

const Chapter9: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.2);

  return (
    <section id="chapter-9" className="chapter chapter-9 reckoning-chapter" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 9</span>
          <span className="chapter-date">1945 and Beyond</span>
          <h2 className="chapter-title">The Reckoning</h2>
          <p className="chapter-metaphor">Prometheus chained</p>
        </header>
        
        <div className="chapter-text centered">
          <p className="chapter-intro">
            The war ended. <strong>The reckoning began.</strong>
          </p>
        </div>
        
        <div className="timeline-reckoning">
          <div className="timeline-event">
            <span className="event-year">1946</span>
            <ArchivalPhoto
              src={reckoningImages.oppenheimerMedal.src}
              alt={reckoningImages.oppenheimerMedal.alt}
              caption={reckoningImages.oppenheimerMedal.caption}
              source={reckoningImages.oppenheimerMedal.source}
              date={reckoningImages.oppenheimerMedal.date}
              className="timeline-photo"
            />
          </div>
          
          <div className="timeline-event dark">
            <span className="event-year">1954</span>
            <ArchivalPhoto
              src={reckoningImages.oppenheimerHearing.src}
              alt={reckoningImages.oppenheimerHearing.alt}
              caption={reckoningImages.oppenheimerHearing.caption}
              source={reckoningImages.oppenheimerHearing.source}
              className="timeline-photo"
            />
            <p className="event-description">
              Oppenheimer opposed the hydrogen bomb, a weapon a thousand times more powerful 
              than Hiroshima. In a humiliating security hearing, his clearance was revoked. 
              He was accused of communist sympathies, his opposition to the H-bomb reframed as disloyalty.
            </p>
          </div>
        </div>
        
        <blockquote className="einstein-quote">
          <p>
            &ldquo;I do not know with what weapons World War III will be fought, 
            but World War IV will be fought with sticks and stones.&rdquo;
          </p>
          <cite>— Albert Einstein</cite>
        </blockquote>
        
        <div className="oppenheimer-final">
          <ArchivalPhoto
            src={reckoningImages.oppenheimerLate.src}
            alt={reckoningImages.oppenheimerLate.alt}
            caption={reckoningImages.oppenheimerLate.caption}
            source={reckoningImages.oppenheimerLate.source}
            date={reckoningImages.oppenheimerLate.date}
            className="final-portrait"
          />
          <div className="final-profile">
            <h3>J. Robert Oppenheimer</h3>
            <span className="profile-subtitle">The Destroyer of Worlds, Destroyed</span>
            <ul className="figure-facts">
              <li>Directed the most consequential scientific project in history</li>
              <li>Became the face of atomic anxiety</li>
              <li>Stripped of his security clearance in 1954</li>
              <li>Died in 1967, never fully rehabilitated</li>
            </ul>
            <blockquote className="final-words">
              <p>&ldquo;We knew the world would not be the same.&rdquo;</p>
            </blockquote>
          </div>
        </div>
        
        <p className="genie-note">
          <strong>The genie could not be returned to the bottle.</strong>
        </p>
      </div>
    </section>
  );
};

// ==================== EPILOGUE: THE INHERITANCE ====================

const EpilogueSection: React.FC = () => {
  const { containerRef, progress, isPinned } = useScrollLock(2.5);

  return (
    <section 
      id="epilogue" 
      className="chapter epilogue scroll-lock-container"
      ref={containerRef}
      style={{ height: "280vh" }}
    >
      <div className={`chapter-pinned ${isPinned ? "is-pinned" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-label">Epilogue</span>
          <h2 className="chapter-title">The Inheritance</h2>
        </header>
        
        <div className="inheritance-stats" style={{ opacity: progress < 0.4 ? 1 : 0 }}>
          <div className="stat massive">
            <span className="stat-value">70,000+</span>
            <span className="stat-label">Nuclear warheads at peak (1986)</span>
          </div>
          <p className="stat-context">
            The scientists who built one bomb had created a world where humanity 
            could destroy itself many times over.
          </p>
        </div>
        
        <div 
          className="memorial-section"
          style={{ opacity: progress > 0.4 && progress < 0.7 ? 1 : 0 }}
        >
          <ArchivalPhoto
            src={epilogueImages.genbakuDome.src}
            alt={epilogueImages.genbakuDome.alt}
            caption={epilogueImages.genbakuDome.caption}
            source={epilogueImages.genbakuDome.source}
            className="memorial-photo"
          />
        </div>
        
        <div 
          className="final-message"
          style={{ 
            opacity: progress > 0.7 && progress < 0.9 ? 1 : 0
          }}
        >
          <blockquote className="final-quote">
            <p>
              &ldquo;The creation of the atomic bomb inaugurated the most significant 
              technological and political change since the discovery of fire. It changed 
              the way nations conduct diplomacy, the way scientists pursue their craft, 
              and the way all of us think about our future.&rdquo;
            </p>
          </blockquote>
          
          <div className="eternal-flame">
            <div className="flame-icon">🕯️</div>
            <p className="flame-caption">
              The memorial&apos;s eternal flame, still burning—and will burn until 
              all nuclear weapons are abolished.
            </p>
          </div>
        </div>
        
        <div className="closing-question" style={{ opacity: progress > 0.9 ? 1 : 0 }}>
          <p>
            The Manhattan Project proved that humans could unlock the fundamental forces 
            of nature. It left the question of whether we were wise enough to survive 
            our own intelligence.
          </p>
          <p className="question-final">
            <strong>That question remains open.</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

// ==================== SOURCES SECTION ====================

const SourcesSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.2);
  
  const sources = [
    {
      category: "Archives & Primary Sources",
      items: [
        "Los Alamos National Laboratory Digital Archives",
        "National Archives and Records Administration",
        "Harry S. Truman Library and Museum",
        "Atomic Heritage Foundation",
        "Hiroshima Peace Memorial Museum",
        "Nagasaki Atomic Bomb Museum",
      ]
    },
    {
      category: "Key Works",
      items: [
        "Richard Rhodes, \"The Making of the Atomic Bomb\" (1986)",
        "Kai Bird & Martin J. Sherwin, \"American Prometheus\" (2005)",
        "John Hersey, \"Hiroshima\" (The New Yorker, 1946)",
        "Ferenc Morton Szasz, \"The Day the Sun Rose Twice\" (1984)",
      ]
    },
    {
      category: "Documentary Sources",
      items: [
        "\"The Day After Trinity\" (1981) — Documentary",
        "\"Hiroshima\" BBC (2005) — Documentary",
        "Manhattan Project declassified documents (DOE)",
      ]
    }
  ];

  return (
    <section id="sources" className="sources-section" ref={ref}>
      <div className={`sources-content ${isVisible ? "revealed" : ""}`}>
        <h2 className="sources-title">Sources & Further Reading</h2>
        
        <div className="sources-grid">
          {sources.map((group) => (
            <div key={group.category} className="source-group">
              <h3 className="source-category">{group.category}</h3>
              <ul className="source-list">
                {group.items.map((item, i) => (
                  <li key={i} className="source-item">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="photo-credits">
          <h3>Photography Credits</h3>
          <p>
            All photographs sourced from public archives including Los Alamos National 
            Laboratory, National Archives and Records Administration, and the Hiroshima 
            Peace Memorial Museum. Used in accordance with their public domain status 
            or educational fair use provisions.
          </p>
        </div>
      </div>
    </section>
  );
};

// ==================== MAIN COMPONENT ====================

const ManhattanProjectClient: React.FC = () => {
  const globalProgress = useGlobalScrollProgress();
  const [showWarning, setShowWarning] = useState(false); // Disabled content warning
  
  // Dismiss content warning
  const handleDismissWarning = useCallback(() => {
    setShowWarning(false);
  }, []);

  return (
    <article className="manhattan-project-story" aria-label="The Manhattan Project: A Visual Essay">
      {/* Content warning overlay */}
      {showWarning && (
        <div className="content-warning-overlay" role="alertdialog" aria-modal="true">
          <div className="warning-card">
            <h2>Content Advisory</h2>
            <p>
              This essay contains archival photographs of nuclear destruction and 
              its human cost, including images from Hiroshima and Nagasaki.
            </p>
            <p>
              The content is presented for educational purposes to document one of 
              history&apos;s most significant events.
            </p>
            <button 
              className="continue-button"
              onClick={handleDismissWarning}
              autoFocus
            >
              I Understand — Continue
            </button>
          </div>
        </div>
      )}
      
      {/* Chain reaction progress bar */}
      <ChainReactionProgressBar progress={globalProgress} />
      
      {/* Essay sections */}
      <HeroSection />
      <PrologueSection />
      <Chapter1 />
      <Chapter2 />
      <Chapter3 />
      <Chapter4 />
      <Chapter5 />
      <Chapter6 />
      <Chapter7 />
      <Chapter8 />
      <Chapter9 />
      <EpilogueSection />
      <SourcesSection />
      
      {/* Scroll to top */}
      <button 
        className="scroll-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        style={{ opacity: globalProgress > 0.1 ? 1 : 0 }}
      >
        ↑
      </button>
    </article>
  );
};

export default ManhattanProjectClient;

