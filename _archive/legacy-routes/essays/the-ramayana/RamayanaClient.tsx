"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import "./the-ramayana.css";
import { 
  heroImages, 
  prologueImages, 
  chapter1Images,
  chapter2Images,
  chapter3Images,
  chapter4Images,
  chapter5Images,
  chapter6Images,
  chapter7Images,
  chapter8Images,
  epilogueImages,
} from "./images";

// ============================================================================
// THE JOURNEY HOME: The Ramayana in Art and Symbol
// ============================================================================
// Visual Treatment: Mixed historical art photography + custom illustration
// Arc Type: Quest (Exile → Trial → Descent → War → Return → Restoration)
// Progress Bar: "The Fourteen Years" - vertical path with landmarks
// Mythology Lens: Living tradition, multiple interpretations acknowledged
// ============================================================================

// ==================== TYPE DEFINITIONS ====================

interface ScrollLockState {
  containerRef: React.RefObject<HTMLDivElement | null>;
  progress: number;
  isPinned: boolean;
}

interface DivineFigure {
  name: string;
  epithet: string;
  domain: string;
  quote: string;
  visualRef?: string;
  imageSrc?: string;
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

      if (sectionTop <= 0 && scrolledIntoSection <= scrollableDistance) {
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

// Global scroll progress for journey progress bar
const useGlobalScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;
      const newProgress = Math.min(Math.max(scrollTop / scrollableHeight, 0), 1);
      setProgress(newProgress);
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateProgress);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
};

// ==================== FOURTEEN YEARS PROGRESS BAR ====================

const journeyLandmarks = [
  { id: "palace", label: "Palace", position: 0 },
  { id: "forest", label: "Forest", position: 0.1 },
  { id: "hermitage", label: "Panchavati", position: 0.2 },
  { id: "abduction", label: "Abduction", position: 0.3 },
  { id: "kishkindha", label: "Kishkindha", position: 0.4 },
  { id: "ocean", label: "Ocean", position: 0.5 },
  { id: "bridge", label: "Bridge", position: 0.6 },
  { id: "lanka", label: "Lanka", position: 0.7 },
  { id: "war", label: "War", position: 0.8 },
  { id: "ayodhya", label: "Ayodhya", position: 1.0 },
];

const JourneyProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  const activeLandmarkIndex = useMemo(() => {
    for (let i = journeyLandmarks.length - 1; i >= 0; i--) {
      if (progress >= journeyLandmarks[i].position) {
        return i;
      }
    }
    return 0;
  }, [progress]);

  return (
    <div className="journey-progress" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
      <svg viewBox="0 0 40 100" preserveAspectRatio="none" className="journey-path-svg">
        {/* Background path */}
        <path
          d="M20 5 Q25 15, 20 25 Q15 35, 20 45 Q25 55, 20 65 Q15 75, 20 85 Q25 95, 20 95"
          className="journey-path-bg"
        />
        
        {/* Progress path */}
        <path
          d="M20 5 Q25 15, 20 25 Q15 35, 20 45 Q25 55, 20 65 Q15 75, 20 85 Q25 95, 20 95"
          className="journey-path-progress"
          strokeDasharray="200"
          strokeDashoffset={200 - (progress * 200)}
        />
        
        {/* Landmarks */}
        {journeyLandmarks.map((landmark, index) => {
          const y = 5 + (landmark.position * 90);
          const isActive = index === activeLandmarkIndex;
          const isPassed = index < activeLandmarkIndex;
          
          return (
            <circle
              key={landmark.id}
              cx="20"
              cy={y}
              r={isActive ? 4 : 3}
              className={`journey-landmark ${isActive ? "active" : ""} ${isPassed ? "passed" : ""}`}
            />
          );
        })}
        
        {/* Current position - Rama figure */}
        <circle
          cx="20"
          cy={5 + (progress * 90)}
          r="5"
          className="journey-figure"
        />
      </svg>
      
      {/* Landmark labels */}
      <div className="journey-labels">
        {journeyLandmarks.filter((_, i) => i % 2 === 0).map((landmark, index) => (
          <span
            key={landmark.id}
            className={`journey-label ${progress >= landmark.position ? "active" : ""}`}
          >
            {landmark.label}
          </span>
        ))}
      </div>
    </div>
  );
};

// ==================== ARCHIVAL ART COMPONENT ====================

interface ArchivalArtProps {
  src?: string;
  alt: string;
  caption: string;
  source: string;
  period?: string;
  tradition?: string;
  className?: string;
  kenBurns?: boolean;
}

const ArchivalArt: React.FC<ArchivalArtProps> = ({
  src,
  alt,
  caption,
  source,
  period,
  tradition,
  className = "",
  kenBurns = false,
}) => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  
  return (
    <figure 
      ref={ref}
      className={`archival-art ${className} ${isVisible ? "revealed" : ""} ${kenBurns ? "ken-burns" : ""}`}
    >
      <div className="art-frame">
        {src ? (
          <img 
            src={src} 
            alt={alt}
            className="archival-img"
            loading="lazy"
          />
        ) : (
          <div className="art-placeholder" aria-label={alt}>
            <span className="placeholder-text">{alt}</span>
            <span className="placeholder-source">{source}</span>
          </div>
        )}
        <div className="art-vignette" />
        <div className="art-grain" />
      </div>
      <figcaption>
        <span className="caption-text">{caption}</span>
        <span className="caption-meta">
          {tradition && <span className="caption-tradition">{tradition}</span>}
          {period && <span className="caption-period">{period}</span>}
          <span className="caption-source">{source}</span>
        </span>
      </figcaption>
    </figure>
  );
};

// ==================== DIVINE FIGURE PROFILE ====================

const DivineFigureProfile: React.FC<{ figure: DivineFigure; delay?: number }> = ({ 
  figure, 
  delay = 0 
}) => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  
  return (
    <article 
      ref={ref}
      className={`divine-figure featured ${isVisible ? "revealed" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="figure-portrait">
        {figure.imageSrc ? (
          <img 
            src={figure.imageSrc} 
            alt={figure.name}
            loading="lazy"
          />
        ) : (
          <div className="art-placeholder">
            <span className="placeholder-text">{figure.visualRef || figure.name}</span>
          </div>
        )}
      </div>
      <div className="figure-content">
        <h3>{figure.name}</h3>
        <span className="figure-epithet">{figure.epithet}</span>
        <span className="figure-domain">{figure.domain}</span>
        <blockquote className="sacred-quote">
          <p>&ldquo;{figure.quote}&rdquo;</p>
        </blockquote>
      </div>
    </article>
  );
};

// ==================== HERO SECTION ====================

const HeroSection: React.FC = () => {
  const { containerRef, progress, isPinned } = useScrollLock(4.5);
  
  const phase = useMemo(() => {
    if (progress < 0.15) return "dharma";
    if (progress < 0.30) return "ocean";
    if (progress < 0.45) return "vishnu";
    if (progress < 0.60) return "imbalance";
    if (progress < 0.75) return "manifestation";
    if (progress < 0.90) return "youth";
    return "title";
  }, [progress]);

  return (
    <header
      className={`hero-section scroll-lock-container phase-${phase}`}
      ref={containerRef}
      style={{ height: "500vh" }}
    >
      <div className={`hero-pinned ${isPinned ? "is-pinned" : ""}`}>
        {/* Cosmic Ocean Background */}
        <div className={`cosmic-ocean ${phase !== "dharma" ? "visible" : ""}`} />
        <div className={`cosmic-waves ${phase === "ocean" || phase === "vishnu" ? "visible" : ""}`} />
        
        {/* Phase 1: Dharma */}
        <div className="hero-dharma" style={{ opacity: phase === "dharma" ? 1 : 0 }}>
          <p className="dharma-text">धर्म</p>
          <p style={{ 
            fontFamily: "var(--font-serif)", 
            fontSize: "1rem", 
            color: "var(--rama-text-secondary)",
            marginTop: "1rem",
            opacity: progress > 0.05 ? 1 : 0,
            transition: "opacity 0.6s ease"
          }}>
            Dharma
          </p>
        </div>
        
        {/* Phase 2-4: Vishnu Manifestation */}
        <div className={`vishnu-manifestation ${(phase === "vishnu" || phase === "imbalance" || phase === "manifestation") ? "visible" : ""}`}>
          <div className={`divine-glow ${phase === "vishnu" || phase === "manifestation" ? "visible" : ""}`} />
          <div className="vishnu-figure">
            {heroImages[0] ? (
              <img 
                src={heroImages[0].src} 
                alt={heroImages[0].alt}
                className="vishnu-image"
                loading="eager"
              />
            ) : (
              <div className="vishnu-placeholder">
                <span>Vishnu reclining on Shesha</span>
                <span style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>Badami cave style</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Quote - Imbalance phase */}
        <div 
          className={`hero-quote ${phase === "imbalance" ? "visible" : ""}`}
          style={{ position: "absolute", bottom: "20%" }}
        >
          <p className="hero-quote-text">
            &ldquo;When righteousness falters, I descend.&rdquo;
          </p>
          <span className="hero-quote-attr">— Bhagavad Gita 4.7-8</span>
        </div>
        
        {/* Title Card */}
        <div className={`hero-title-card ${phase === "title" ? "visible" : ""}`}>
          <h1 className="hero-title">THE JOURNEY HOME</h1>
          <p className="hero-subtitle">The Ramayana in Art and Symbol</p>
          <p className="hero-tagline">&ldquo;A story of exile, devotion, and the long way back&rdquo;</p>
        </div>
        
        {/* Scroll hint */}
        <div className="scroll-hint" style={{ opacity: progress < 0.05 ? 1 : 0 }}>
          <span>Scroll to begin</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>
    </header>
  );
};

// ==================== PROLOGUE: THE COSMIC FRAME ====================
// Scroll-Lock Sequence: "The Cosmic Ocean" (per spec)
// - 0-30%:   Darkness parts → infinite ocean with stars
// - 30-60%:  Vishnu materializes (close-up, Badami sculpture)
// - 60-80%:  "Pull back" → Brahma painting REPLACES Vishnu (wider cosmic view)
// - 80-100%: Fade to descent text

const PrologueSection: React.FC = () => {
  const { containerRef, progress, isPinned } = useScrollLock(3.5);
  
  // Determine current phase based on scroll progress
  const phase = useMemo(() => {
    if (progress < 0.30) return "ocean";
    if (progress < 0.60) return "vishnu";
    if (progress < 0.80) return "cosmos";
    return "descent";
  }, [progress]);
  
  // Ocean intro: fades out as Vishnu appears
  const oceanOpacity = progress < 0.25 ? 1 : Math.max(0, 1 - (progress - 0.25) / 0.10);
  
  // Vishnu: appears at 25%, fades out at 55% (before Brahma takes over)
  const vishnuOpacity = progress < 0.25 
    ? 0 
    : progress < 0.55 
      ? Math.min(1, (progress - 0.25) / 0.10)  // fade in
      : Math.max(0, 1 - (progress - 0.55) / 0.10);  // fade out for pull-back
  
  // Brahma: appears at 55%, replacing Vishnu (the "pull back" to wider view)
  const brahmaOpacity = progress < 0.55 
    ? 0 
    : progress < 0.75 
      ? Math.min(1, (progress - 0.55) / 0.10)  // fade in
      : Math.max(0, 1 - (progress - 0.75) / 0.10);  // fade out for descent
  
  // Descent text: appears at 75%
  const descentOpacity = progress < 0.75 
    ? 0 
    : Math.min(1, (progress - 0.75) / 0.10);

  return (
    <section 
      id="prologue" 
      className={`prologue-scroll-lock scroll-lock-container phase-${phase}`}
      ref={containerRef}
      style={{ height: "350vh" }}
    >
      <div className={`prologue-pinned ${isPinned ? "is-pinned" : ""}`}>
        
        {/* Background: Cosmic ocean persists throughout */}
        <div className="prologue-ocean-bg">
          <div className="ocean-stars" />
          <div className="ocean-waves" />
        </div>
        
        {/* PHASE 1: Ocean intro text (0-30%) */}
        <div 
          className="prologue-intro"
          style={{ 
            opacity: oceanOpacity,
            pointerEvents: oceanOpacity > 0.5 ? "auto" : "none"
          }}
        >
          <span className="prologue-label">Prologue</span>
          <h2 className="prologue-title">The Cosmic Frame</h2>
          <p className="prologue-subtitle">Before time, before story</p>
        </div>
        
        {/* PHASE 2: Vishnu close-up (30-60%) */}
        <div 
          className="prologue-vishnu-layer"
          style={{ 
            opacity: vishnuOpacity,
            pointerEvents: vishnuOpacity > 0.5 ? "auto" : "none"
          }}
        >
          {prologueImages[0]?.src ? (
            <img 
              src={prologueImages[0].src}
              alt={prologueImages[0].alt}
              className="prologue-vishnu-img"
            />
          ) : (
            <div className="art-placeholder">
              <span>Vishnu on Shesha</span>
            </div>
          )}
          <p className="prologue-vishnu-caption">
            Vishnu reclines on the cosmic ocean — the universe dreams within him
          </p>
        </div>
        
        {/* PHASE 3: Brahma/Cosmos "pull back" (60-80%) - REPLACES Vishnu */}
        <div 
          className="prologue-brahma-layer"
          style={{ 
            opacity: brahmaOpacity,
            pointerEvents: brahmaOpacity > 0.5 ? "auto" : "none"
          }}
        >
          {prologueImages[1]?.src ? (
            <img 
              src={prologueImages[1].src}
              alt={prologueImages[1].alt}
              className="prologue-brahma-img"
            />
          ) : (
            <div className="art-placeholder">
              <span>Brahma on lotus</span>
            </div>
          )}
          <div className="prologue-cosmos-text">
            <p>From Vishnu&apos;s navel, a lotus.</p>
            <p>On the lotus, Brahma.</p>
            <p className="cosmos-emphasis">Creation within creation.</p>
          </div>
        </div>
        
        {/* PHASE 4: Descent text (80-100%) */}
        <div 
          className="prologue-descent"
          style={{ 
            opacity: descentOpacity,
            pointerEvents: descentOpacity > 0.5 ? "auto" : "none"
          }}
        >
          <div className="descent-content">
            <p className="descent-text">
              Ravana has accumulated power through austerities. He has a boon—no god 
              or demon can kill him. He did not think to fear humans.
            </p>
            
            <blockquote className="descent-quote">
              <p>
                The cosmos requires a correction: the divine must descend in human form, 
                subject to human limitations, to defeat what cannot otherwise be defeated.
              </p>
            </blockquote>
            
            <p className="descent-text">
              This is the frame: a god chooses to forget his godhood, to become 
              vulnerable, to suffer loss—all so that dharma can be restored.
            </p>
            
            <p className="descent-final">
              The journey home is not just Rama&apos;s.
            </p>
            <p className="descent-emphasis">
              It is the cosmos returning to balance.
            </p>
            
            <div className="descent-arrow">
              <span>↓</span>
              <span className="arrow-label">Ayodhya awaits</span>
            </div>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="prologue-progress">
          <div 
            className="prologue-progress-fill"
            style={{ height: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 1: THE PROMISE AND THE EXILE ====================

const Chapter1: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  const rama: DivineFigure = {
    name: "Rama",
    epithet: "मर्यादा पुरुषोत्तम — The Ideal Man",
    domain: "Dharma, righteous action, the human face of divinity",
    quote: "A promise is a promise, even when the promise is unjust.",
    visualRef: "South Indian bronze",
    imageSrc: chapter1Images[3]?.src,
  };

  return (
    <section id="chapter-1" className="chapter chapter-1 tradition-ayodhya" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 1</span>
          <span className="chapter-setting">Ayodhya, the eve of coronation</span>
          <h2 className="chapter-title">The Promise and the Exile</h2>
          <p className="chapter-metaphor">The crown that slips through fingers</p>
        </header>
        
        <div className="chapter-grid">
          <div className="chapter-visual">
            <ArchivalArt
              src={chapter1Images[0]?.src}
              alt={chapter1Images[0]?.alt || "Ayodhya palace scene, coronation preparation"}
              caption="Ayodhya on the eve of coronation — golden spires, gardens in bloom"
              source="Kangra school, Pahari painting"
              period="c. 1780-1790"
              tradition="The Fitzwilliam Museum"
              kenBurns
            />
          </div>
          
          <div className="chapter-text">
            <p className="chapter-intro">
              Rama is hours from coronation when his father&apos;s past catches up. 
              Years ago, King Dasharatha promised his wife Kaikeyi any two boons. 
              Now, poisoned by her maid Manthara&apos;s jealousy, she claims them: 
              her son Bharata will be king; Rama will be exiled for fourteen years.
            </p>
            
            <p>
              Dasharatha is shattered. He begs Rama to refuse, to take the throne 
              by force. Rama refuses. Dharma demands that sons honor fathers&apos; words.
            </p>
            
            <blockquote className="sacred-quote">
              <p>
                &ldquo;Where you go, I go. The forest with you is heaven; 
                the palace without you is hell.&rdquo;
              </p>
              <cite>— Sita (adapted from Valmiki Ramayana, Ayodhya Kanda)</cite>
            </blockquote>
          </div>
        </div>
        
        <DivineFigureProfile figure={rama} />
        
        <div className="art-grid" style={{ marginTop: "var(--space-xl)" }}>
          <ArchivalArt
            src={chapter1Images[1]?.src}
            alt={chapter1Images[1]?.alt || "Kaikeyi and Manthara plotting"}
            caption="Kaikeyi listens to Manthara — the seed of exile is planted"
            source="M.V. Dhurandhar, 1909"
            period="1909"
            tradition="Ravi Varma school"
          />
          <ArchivalArt
            src={chapter1Images[2]?.src}
            alt={chapter1Images[2]?.alt || "Rama, Sita, and Lakshmana leaving Ayodhya"}
            caption="The departure — Rama, Sita, and Lakshmana leave as the city weeps"
            source="San Diego Museum of Art"
            period="c. 1790"
            tradition="Kangra school"
          />
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 2: THE FOREST YEARS ====================

const Chapter2: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section id="chapter-2" className="chapter chapter-2 tradition-forest" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 2</span>
          <span className="chapter-setting">Thirteen years in exile</span>
          <h2 className="chapter-title">The Forest Years</h2>
          <p className="chapter-metaphor">The wilderness where the soul is refined</p>
        </header>
        
        <div className="chapter-text centered">
          <p className="chapter-intro">
            The forest is not punishment—it is preparation. For thirteen years, 
            Rama, Sita, and Lakshmana live among sages, learning, protecting 
            the hermitages from demons, deepening their dharma.
          </p>
          
          <p>
            But the forest is also where danger enters. Surpanakha, Ravana&apos;s sister, 
            desires Rama. When rejected, she attacks Sita. Lakshmana cuts off her 
            nose and ears. Humiliated, she runs to her brother.
          </p>
        </div>
        
        <div className="chapter-grid" style={{ marginTop: "var(--space-xl)" }}>
          <ArchivalArt
            src={chapter2Images[1]?.src}
            alt={chapter2Images[1]?.alt || "Forest hermitage at Panchavati"}
            caption="Panchavati — the hermitage in the forest where danger will find them"
            source="Prambanan Temple"
            period="9th century CE"
            tradition="Javanese sculpture"
          />
          <ArchivalArt
            src={chapter2Images[0]?.src}
            alt={chapter2Images[0]?.alt || "The golden deer Maricha"}
            caption="The golden deer appears — Maricha in disguise, sent by Ravana"
            source="Kangra painting"
            period="c. 1780"
            tradition="Pahari school"
          />
        </div>
        
        <div className="chapter-text centered" style={{ marginTop: "var(--space-xl)" }}>
          <p>
            Ravana sends Maricha disguised as a golden deer. Sita, enchanted, 
            asks Rama to catch it. He pursues; the deer leads him far away.
          </p>
          
          <p>
            Sita is alone. An old ascetic approaches, begging alms. She steps 
            outside the protective boundary to give charity.
          </p>
          
          <p style={{ color: "var(--rama-blood)", fontWeight: 600 }}>
            The ascetic is Ravana.
          </p>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 3: THE ABDUCTION ====================

const Chapter3: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  const sita: DivineFigure = {
    name: "Sita",
    epithet: "भूमि पुत्री — The Earth's Daughter",
    domain: "Fertility, fidelity, the feminine divine, steadfast love",
    quote: "Her body is captive. Her spirit remains free.",
    visualRef: "Sita in the Ashoka grove, Kangra miniature",
    imageSrc: chapter3Images[1]?.src,
  };

  return (
    <section id="chapter-3" className="chapter chapter-3 tradition-lanka" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 3</span>
          <span className="chapter-setting">Lanka</span>
          <h2 className="chapter-title">The Abduction</h2>
          <p className="chapter-metaphor">The cage of gold cannot contain the spirit</p>
        </header>
        
        <div className="chapter-grid">
          <div className="chapter-text">
            <p className="chapter-intro">
              Ravana carries Sita across the sky in his flying chariot. 
              Jatayu, the aged vulture king, friend to Rama&apos;s father, 
              tries to stop him. Ravana cuts off his wings.
            </p>
            
            <p>
              Sita is placed in the Ashoka grove, surrounded by demon guards. 
              Ravana does not force himself on her—he wants her to choose him. 
              He gives her one year.
            </p>
            
            <p>
              She sits beneath an ashoka tree, meditating on Rama. She holds 
              a blade of grass between them—<em>you are worth no more than this</em>.
            </p>
          </div>
          
          <div className="chapter-visual">
            <ArchivalArt
              src={chapter3Images[0]?.src}
              alt={chapter3Images[0]?.alt || "Ravana carrying Sita through the sky"}
              caption="Ravana's chariot crosses the sky — Sita throws jewels as markers"
              source="Kangra painting"
              period="c. 1780"
              tradition="Pahari school"
              kenBurns
            />
          </div>
        </div>
        
        <DivineFigureProfile figure={sita} />
      </div>
    </section>
  );
};

// ==================== CHAPTER 4: HANUMAN ====================

const Chapter4: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  const hanuman: DivineFigure = {
    name: "Hanuman",
    epithet: "महाभक्त — The Perfect Devotee",
    domain: "Devotion, strength, celibacy, service, the power of the divine name",
    quote: "When he tears open his chest, Rama and Sita are within—there is no Hanuman separate from his love for them.",
    visualRef: "Chola bronze, Hanuman in anjali mudra",
    imageSrc: chapter4Images[1]?.src,
  };

  return (
    <section id="chapter-4" className="chapter chapter-4 tradition-cosmic" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 4</span>
          <span className="chapter-setting">The devotee who moved mountains</span>
          <h2 className="chapter-title">Hanuman</h2>
          <p className="chapter-metaphor">Love that makes the impossible ordinary</p>
        </header>
        
        <div className="chapter-text centered">
          <p className="chapter-intro">
            Among Sugriva&apos;s ministers is Hanuman—son of the wind god, 
            cursed in youth to forget his powers until reminded at the right moment. 
            When told he must leap across the ocean to Lanka, he remembers.
          </p>
          
          <p style={{ fontSize: "1.5rem", color: "var(--rama-gold)", marginTop: "var(--space-lg)" }}>
            He grows vast. He leaps.
          </p>
        </div>
        
        <div className="art-grid" style={{ marginTop: "var(--space-xl)" }}>
          <ArchivalArt
            src={chapter4Images[2]?.src}
            alt={chapter4Images[2]?.alt || "Hanuman's leap across the ocean"}
            caption="Stone witness to eternal devotion — 9th century Prambanan relief"
            source="Prambanan Temple"
            period="9th century CE"
            tradition="Javanese sculpture"
          />
          <ArchivalArt
            src={chapter4Images[0]?.src}
            alt={chapter4Images[0]?.alt || "Hanuman finding Sita in the Ashoka grove"}
            caption="Hanuman finds Sita — he offers to carry her back; she refuses"
            source="Kangra painting"
            period="Late 18th century"
            tradition="Pahari school"
          />
        </div>
        
        <DivineFigureProfile figure={hanuman} />
        
        <div className="chapter-text centered" style={{ marginTop: "var(--space-xl)" }}>
          <p>
            In Lanka, he finds Sita. He offers to carry her back—he could. 
            She refuses. Rama must come himself; dharma requires he defeat 
            Ravana, not sneak away.
          </p>
          
          <p>
            Hanuman allows himself to be captured so he can see Ravana&apos;s strength. 
            They set his tail on fire; he escapes, burning Lanka as he goes.
          </p>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 5: THE BRIDGE ====================

const Chapter5: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section id="chapter-5" className="chapter chapter-5 tradition-ocean" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 5</span>
          <span className="chapter-setting">From shore to shore</span>
          <h2 className="chapter-title">The Bridge</h2>
          <p className="chapter-metaphor">Faith makes stone float</p>
        </header>
        
        <div className="chapter-text centered">
          <p className="chapter-intro">
            The ocean bars the way. Rama meditates for three days, asking the 
            ocean god for passage. Silence. On the fourth day, Rama raises 
            his bow—he will dry the ocean with celestial weapons.
          </p>
          
          <p>
            The ocean god appears, terrified. He cannot part himself, but he 
            offers help: stones inscribed with Rama&apos;s name will float.
          </p>
        </div>
        
        <div className="art-grid" style={{ marginTop: "var(--space-xl)" }}>
          <ArchivalArt
            src={chapter5Images[0]?.src}
            alt={chapter5Images[0]?.alt || "Stones floating with Rama's name"}
            caption="The Setu complete — millions of monkeys built the bridge to Lanka"
            source="Kangra painting"
            period="c. 1800"
            tradition="Pahari school"
          />
          <ArchivalArt
            src={chapter5Images[1]?.src}
            alt={chapter5Images[1]?.alt || "The army crossing Ram Setu"}
            caption="Stone memory — 12th century Khmer artists carved the eternal war"
            source="Angkor Wat"
            period="12th century"
            tradition="Khmer sculpture"
          />
        </div>
        
        <div className="quote-monument">
          <blockquote>
            <p className="quote-text">
              The army writes &ldquo;Rama&rdquo; on every stone. They float. 
              For five days, millions of monkeys build the bridge to Lanka—the Setu, 
              Ram Setu, still said to exist between India and Sri Lanka.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 6: THE WAR ====================

const Chapter6: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  const ravana: DivineFigure = {
    name: "Ravana",
    epithet: "दशमुख — The Ten-Headed King",
    domain: "Lanka, scholarship, power, desire that corrupts, the ego unchecked",
    quote: "He is not simple evil—he is brilliant, devout in his way, a master of arts. His flaw is desire unrestrained by dharma.",
    visualRef: "Ravana lifting Kailash, Ellora Cave 16",
    imageSrc: chapter6Images[3]?.src,
  };

  return (
    <section id="chapter-6" className="chapter chapter-6 tradition-lanka" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 6</span>
          <span className="chapter-setting">Lanka burns</span>
          <h2 className="chapter-title">The War</h2>
          <p className="chapter-metaphor">When the storm finally breaks</p>
        </header>
        
        <div className="chapter-grid">
          <div className="chapter-visual">
            <ArchivalArt
              src={chapter6Images[0]?.src}
              alt={chapter6Images[0]?.alt || "Battle panorama at Lanka"}
              caption="The war at Lanka — demons and monkeys clash beneath the walls"
              source="Prambanan Temple"
              period="9th century"
              tradition="Javanese relief"
              kenBurns
            />
          </div>
          
          <div className="chapter-text">
            <p className="chapter-intro">
              The war lasts many days. Ravana&apos;s son Indrajit wields sorcery—serpent 
              weapons bind the entire army. Lakshmana falls, pierced by a shakti weapon. 
              He will die by dawn unless he receives herbs from a distant Himalayan peak.
            </p>
            
            <p>
              Hanuman flies north. He cannot identify the herbs; 
              <strong> he carries the entire mountain</strong>. Lakshmana lives.
            </p>
          </div>
        </div>
        
        <div className="art-grid" style={{ marginTop: "var(--space-lg)" }}>
          <ArchivalArt
            src={chapter6Images[1]?.src}
            alt={chapter6Images[1]?.alt || "Hanuman carrying the mountain"}
            caption="Hanuman carries the mountain — he could not identify the herb, so he brought it all"
            source="Indian devotional art"
            tradition="Popular iconography"
          />
          <ArchivalArt
            src={chapter6Images[3]?.src}
            alt={chapter6Images[3]?.alt || "Ravana shaking Mount Kailash"}
            caption="Ravana's pride — even the cosmic mountain trembles, but cannot be moved"
            source="Ellora Caves"
            period="8th century CE"
            tradition="Rashtrakuta sculpture"
          />
        </div>
        
        <DivineFigureProfile figure={ravana} />
        
        <div className="chapter-text centered" style={{ marginTop: "var(--space-xl)" }}>
          <p>
            One by one, Ravana&apos;s generals fall. His brothers. His sons. His armies. 
            Still he will not surrender. Still he will not return Sita.
          </p>
          
          <p>
            Finally, Rama and Ravana face each other. Rama fires an arrow blessed 
            by Brahma. It strikes Ravana&apos;s heart—the one place his boon did not 
            protect, because his pride never imagined a mere human could reach it.
          </p>
          
          <p style={{ color: "var(--rama-blood)", fontWeight: 600, fontSize: "1.25rem" }}>
            Ravana falls. Lanka is silenced. The war is over.
          </p>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 7: THE FIRE TRIAL ====================

const Chapter7: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section id="chapter-7" className="chapter chapter-7 tradition-cosmic" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 7</span>
          <span className="chapter-setting">Doubt and proof</span>
          <h2 className="chapter-title">The Fire Trial</h2>
          <p className="chapter-metaphor">The flame that purifies also wounds</p>
        </header>
        
        <div className="sensitivity-notice">
          <h4>A Note on Interpretation</h4>
          <p>
            This episode is painful. Different traditions interpret it differently—some 
            as Rama&apos;s failing, some as cosmic necessity, some as later interpolation. 
            We present it honestly, acknowledging the difficulty, letting viewers sit 
            with discomfort.
          </p>
        </div>
        
        <div className="chapter-text centered">
          <p className="chapter-intro">
            Sita is brought before Rama. She expects embrace. He looks away.
          </p>
          
          <blockquote className="sacred-quote" style={{ textAlign: "center", maxWidth: "600px", margin: "var(--space-lg) auto" }}>
            <p>
              &ldquo;You have lived in another man&apos;s house for a year. 
              How can I take you back? What will people say?&rdquo;
            </p>
          </blockquote>
          
          <p>
            She asks Lakshmana to build a pyre. She will enter the fire. 
            If she is pure, it will not burn her.
          </p>
          
          <p style={{ fontStyle: "italic" }}>
            She walks into the flames.
          </p>
          
          <p>
            Agni, the fire god, rises with Sita in his arms—unburned, unscorched, radiant. 
            She is pure. She has always been pure. They embrace. The war is truly over.
          </p>
        </div>
        
        <div className="art-grid" style={{ marginTop: "var(--space-xl)" }}>
          <ArchivalArt
            src={chapter7Images[0]?.src}
            alt={chapter7Images[0]?.alt || "Sita entering the fire"}
            caption="Sita enters the flames — faith expressed through fire"
            source="Indian painting"
            tradition="Agni Pariksha iconography"
          />
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 8: THE RETURN ====================

const Chapter8: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section id="chapter-8" className="chapter chapter-8 tradition-ayodhya" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 8</span>
          <span className="chapter-setting">Ayodhya welcomes its king</span>
          <h2 className="chapter-title">The Return</h2>
          <p className="chapter-metaphor">The lamps that light the way home</p>
        </header>
        
        <div className="chapter-text centered">
          <p className="chapter-intro">
            Fourteen years to the day. They fly home in Ravana&apos;s captured vimana, 
            the magical flying chariot. Below them, they see the path of their exile—the 
            forests, the mountains, the ocean, Lanka now at peace under Vibhishana&apos;s rule.
          </p>
          
          <p style={{ color: "var(--rama-gold)", fontSize: "1.25rem" }}>
            The people light every lamp in the city. The darkness will not touch this night.
          </p>
          
          <p style={{ fontStyle: "italic" }}>
            This, tradition says, is the origin of Diwali.
          </p>
        </div>
        
        <div className="art-grid" style={{ marginTop: "var(--space-xl)" }}>
          <ArchivalArt
            src={chapter8Images[0]?.src}
            alt={chapter8Images[0]?.alt || "Ayodhya lit with lamps"}
            caption="Ayodhya ablaze with light — every lamp welcomes Rama home"
            source="Diwali celebration"
            tradition="Living tradition"
          />
          <ArchivalArt
            src={chapter8Images[1]?.src}
            alt={chapter8Images[1]?.alt || "Diwali celebration"}
            caption="The festival of lights — celebrating the return to Ayodhya"
            source="Contemporary photograph"
            tradition="Living tradition"
          />
        </div>
        
        <div className="quote-monument">
          <blockquote>
            <p className="quote-text">
              Rama is crowned. Sita beside him. The brothers united. The kingdom flourishes. 
              Dharma reigns. For a moment—it is enough. For a moment—the journey is complete.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 9: THE SHADOW (UTTARA KANDA) ====================

const Chapter9: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section id="chapter-9" className="chapter chapter-9 tradition-cosmic" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 9</span>
          <span className="chapter-setting">What the story doesn&apos;t forget</span>
          <h2 className="chapter-title">The Shadow</h2>
          <p className="chapter-metaphor">Even perfect dharma casts a shadow</p>
        </header>
        
        <div className="sensitivity-notice">
          <h4>Scholarly Context</h4>
          <p>
            The Uttara Kanda is widely considered a later addition to the original epic. 
            Goldman&apos;s critical edition includes it with scholarly apparatus noting its 
            contested status. We present the narrative as it shapes how millions understand 
            the story, while acknowledging the scholarly debate.
          </p>
        </div>
        
        <div className="chapter-text centered">
          <p className="chapter-intro">
            Years pass. Sita is pregnant. The kingdom prospers—but a washerman 
            refuses to take back his wife who spent a night away.
          </p>
          
          <blockquote className="sacred-quote" style={{ textAlign: "center", maxWidth: "600px", margin: "var(--space-lg) auto" }}>
            <p>&ldquo;I am no Rama, to accept a woman who has lived with another.&rdquo;</p>
            <cite>— The washerman (Uttara Kanda)</cite>
          </blockquote>
          
          <p>
            Rama hears. He sends Sita away. Pregnant. Alone. To the forest.
          </p>
          
          <p>
            Years later, she returns—but will not stay. She has been exiled twice. 
            She calls to her mother, the earth. The ground opens. 
            <strong style={{ color: "var(--rama-gold)" }}> Sita descends. She does not return.</strong>
          </p>
          
          <p style={{ fontStyle: "italic", color: "var(--rama-text-muted)" }}>
            Rama rules for many more years, but alone. When he finally chooses to leave 
            this world, he walks into the Sarayu River and does not emerge.
          </p>
        </div>
        
        <div className="quote-monument">
          <blockquote>
            <p className="quote-text">
              Sita&apos;s return to the earth is not defeat—it is reclamation. She came from 
              the earth; she returns to it, on her own terms. The story does not pretend 
              this is happy. It asks: was it worth it? It does not answer.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

// ==================== EPILOGUE: THE ETERNAL RETURN ====================

const EpilogueSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section id="epilogue" className="chapter epilogue tradition-cosmic" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Epilogue</span>
          <h2 className="chapter-title">The Eternal Return</h2>
          <p className="chapter-metaphor">Why we still tell this story</p>
        </header>
        
        <div className="chapter-text centered">
          <p className="chapter-intro">
            The Ramayana has been told for at least 2,500 years. It has crossed 
            oceans—to Thailand, Cambodia, Indonesia, where Rama is Phra Ram, 
            where the story adapts and endures.
          </p>
          
          <p>
            Every autumn in India, millions gather for Ram Lila—dramatic retellings 
            across days and nights. Every Diwali, lights celebrate the return to 
            Ayodhya. Every temple contains Rama, Sita, Lakshmana, Hanuman—worshipped, 
            alive, present.
          </p>
        </div>
        
        <div className="art-grid" style={{ marginTop: "var(--space-xl)" }}>
          <ArchivalArt
            src={epilogueImages[0]?.src}
            alt={epilogueImages[0]?.alt || "Ram Lila performance"}
            caption="Ram Lila — the story performed, the myth made present"
            source="Contemporary photography"
            tradition="Living tradition"
          />
          <ArchivalArt
            src={epilogueImages[1]?.src}
            alt={epilogueImages[1]?.alt || "Ram Lila Ravana actor"}
            caption="Ravana lives again — each year the story repeats, the lesson renews"
            source="Contemporary photography"
            tradition="Living tradition"
          />
        </div>
        
        <div className="quote-monument">
          <blockquote>
            <p className="quote-text">
              The Ramayana does not end. Every time it is told, Rama is exiled again, 
              Sita is taken again, the war is fought again, the return is made again. 
              And every time we listen, we take the journey ourselves.
            </p>
          </blockquote>
        </div>
        
        <div className="chapter-text centered" style={{ marginTop: "var(--space-xl)" }}>
          <p style={{ fontSize: "1.5rem", color: "var(--rama-gold)", fontStyle: "italic" }}>
            &ldquo;Where are you in the story?&rdquo;
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
      category: "Primary Texts",
      items: [
        "Goldman, Robert P. (trans.) — The Rāmāyaṇa of Vālmīki. Princeton University Press, 1984–2017",
        "Pollock, Sheldon — Ayodhyākāṇḍa. Princeton University Press, 1986",
        "Richman, Paula (ed.) — Many Rāmāyaṇas. University of California Press, 1991",
      ]
    },
    {
      category: "Art Historical Sources",
      items: [
        "Guy, John (ed.) — Lost Kingdoms: Hindu-Buddhist Sculpture. Metropolitan Museum of Art, 2014",
        "Archer, W.G. — Indian Paintings from the Punjab Hills. Sotheby Parke Bernet, 1973",
        "Dehejia, Vidya — The Body Adorned. Columbia University Press, 2009",
      ]
    },
    {
      category: "Scholarly Interpretation",
      items: [
        "Lutgendorf, Philip — Hanuman's Tale. Oxford University Press, 2007",
        "Pattanaik, Devdutt — Sita: An Illustrated Retelling. Penguin India, 2013",
        "Brockington, John — The Sanskrit Epics. Brill, 1998",
      ]
    },
    {
      category: "Living Tradition",
      items: [
        "UNESCO — Ramlila, Traditional Performance of the Ramayana (Intangible Heritage)",
        "Lutgendorf, Philip — \"Ramayan: The Video\" The Drama Review, 1990",
        "Encyclopedia Britannica — Ramayana",
      ]
    },
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
        
        <div className="visual-credits">
          <h3>Visual Sources</h3>
          <p>
            This essay presents the Ramayana through historical art: temple sculpture 
            from Angkor Wat, Prambanan, and Mahabalipuram; Chola bronzes from the 
            Tamil Nadu tradition; Pahari and Rajasthani miniature paintings; and 
            Southeast Asian interpretations. All visual sources are documented with 
            period, tradition, and collection where known. This is a living religious 
            tradition; we approach with respect while acknowledging scholarly perspectives.
          </p>
        </div>
      </div>
    </section>
  );
};

// ==================== MAIN COMPONENT ====================

const RamayanaClient: React.FC = () => {
  const globalProgress = useGlobalScrollProgress();
  
  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <article className="ramayana-story" aria-label="The Journey Home: The Ramayana in Art and Symbol">
      {/* Skip link for accessibility */}
      <a href="#prologue" className="skip-link">
        Skip to content
      </a>
      
      {/* Journey progress bar */}
      <JourneyProgressBar progress={globalProgress} />
      
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
        className={`scroll-to-top ${globalProgress > 0.1 ? "visible" : ""}`}
        onClick={handleScrollToTop}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </article>
  );
};

export default RamayanaClient;






