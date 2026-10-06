/* eslint-disable react/no-unescaped-entities */
"use client";

/**
 * THE WORD THAT DIVIDED EVERYTHING
 * ================================
 * A Typography-Forward Visual Essay on the Etymology of "Sex"
 * 
 * From Latin "secare" (to cut) to modern taboo—tracing 2,000 years
 * of linguistic evolution, from cold categorization to charged desire.
 * 
 * Visual Treatment: Typography-forward with archival imagery
 * - Words themselves become visual elements
 * - Era-specific color grading and typography
 * - Etymology as narrative device
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  VoiceUnseen,
  VoiceEternal,
  PullQuote,
  SectionDivider,
  useCinematicScroll,
  useIntersectionReveal,
  useReducedMotion,
} from '@/components/VisualEssay';
import './the-origin-of-sex.css';

// ===========================================
// SCROLL-LOCK HOOK
// ===========================================

interface ScrollLockState {
  isLocked: boolean;
  progress: number; // 0-100
  isComplete: boolean;
}

const useScrollLock = (
  ref: React.RefObject<HTMLElement | null>,
  lockHeight: number = 300 // vh units of scroll to complete
): ScrollLockState & { skipToEnd: () => void } => {
  const [state, setState] = useState<ScrollLockState>({
    isLocked: false,
    progress: 0,
    isComplete: false,
  });
  const isActiveRef = useRef(false);
  const accumulatedDeltaRef = useRef(0);
  const lockDistanceRef = useRef(0);
  const hasUserScrolledRef = useRef(false);

  const skipToEnd = useCallback(() => {
    setState({ isLocked: false, progress: 100, isComplete: true });
    document.body.style.overflow = "";
    isActiveRef.current = false;
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Calculate lock distance once
    lockDistanceRef.current = (lockHeight / 100) * window.innerHeight;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Detect user has scrolled via any method (keyboard, scrollbar, etc.)
      if (window.scrollY > 10 && !hasUserScrolledRef.current) {
        hasUserScrolledRef.current = true;
      }

      // Activate lock when hero top reaches viewport top AND user has scrolled
      if (rect.top <= 0 && rect.bottom > viewportHeight * 0.5 && !state.isComplete && hasUserScrolledRef.current) {
        if (!isActiveRef.current) {
          isActiveRef.current = true;
          accumulatedDeltaRef.current = 0;
          document.body.style.overflow = "hidden";
          setState(prev => ({ ...prev, isLocked: true }));
        }
      } else if (rect.top > viewportHeight * 0.2) {
        // Reset when scrolling back up past the section
        if (isActiveRef.current) {
          document.body.style.overflow = "";
          isActiveRef.current = false;
        }
        if (!state.isComplete) {
          setState({ isLocked: false, progress: 0, isComplete: false });
          accumulatedDeltaRef.current = 0;
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Mark that user has started scrolling
      if (!hasUserScrolledRef.current && e.deltaY > 0) {
        hasUserScrolledRef.current = true;
        // Check if we should activate lock now
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        if (rect.top <= 0 && rect.bottom > viewportHeight * 0.5 && !state.isComplete) {
          isActiveRef.current = true;
          accumulatedDeltaRef.current = 0;
          document.body.style.overflow = "hidden";
          setState(prev => ({ ...prev, isLocked: true }));
        }
      }
      
      if (isActiveRef.current && !state.isComplete) {
        e.preventDefault();
        
        // Accumulate scroll delta
        accumulatedDeltaRef.current += e.deltaY;
        
        // Calculate progress (0-100)
        const newProgress = Math.min(100, Math.max(0, 
          (accumulatedDeltaRef.current / lockDistanceRef.current) * 100
        ));

        setState(prev => ({ ...prev, progress: newProgress }));

        // Release lock when complete
        if (newProgress >= 100) {
          document.body.style.overflow = "";
          isActiveRef.current = false;
          setState({ isLocked: false, progress: 100, isComplete: true });
        }
      }
    };

    // Handle touch for mobile
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchDelta = touchStartY - e.touches[0].clientY;
      
      // Mark that user has started scrolling (downward swipe)
      if (!hasUserScrolledRef.current && touchDelta > 10) {
        hasUserScrolledRef.current = true;
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        if (rect.top <= 0 && rect.bottom > viewportHeight * 0.5 && !state.isComplete) {
          isActiveRef.current = true;
          accumulatedDeltaRef.current = 0;
          document.body.style.overflow = "hidden";
          setState(prev => ({ ...prev, isLocked: true }));
        }
      }
      
      if (isActiveRef.current && !state.isComplete) {
        e.preventDefault();
        touchStartY = e.touches[0].clientY;
        
        accumulatedDeltaRef.current += touchDelta * 2; // Multiply for responsiveness
        
        const newProgress = Math.min(100, Math.max(0, 
          (accumulatedDeltaRef.current / lockDistanceRef.current) * 100
        ));

        setState(prev => ({ ...prev, progress: newProgress }));

        if (newProgress >= 100) {
          document.body.style.overflow = "";
          isActiveRef.current = false;
          setState({ isLocked: false, progress: 100, isComplete: true });
        }
      }
    };

    // Handle keyboard scroll for accessibility
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActiveRef.current || state.isComplete) return;
      
      const scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space', ' '];
      if (scrollKeys.includes(e.key)) {
        e.preventDefault();
        
        // Simulate scroll progress based on key
        const delta = (e.key === 'ArrowDown' || e.key === 'Space' || e.key === ' ') ? 40 :
                     (e.key === 'ArrowUp') ? -40 :
                     (e.key === 'PageDown') ? 150 :
                     (e.key === 'PageUp') ? -150 : 0;
        
        accumulatedDeltaRef.current += delta;
        
        const newProgress = Math.min(100, Math.max(0, 
          (accumulatedDeltaRef.current / lockDistanceRef.current) * 100
        ));

        setState(prev => ({ ...prev, progress: newProgress }));

        if (newProgress >= 100) {
          document.body.style.overflow = "";
          isActiveRef.current = false;
          setState({ isLocked: false, progress: 100, isComplete: true });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    // Don't call handleScroll on mount - wait for user interaction

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [ref, lockHeight, state.isComplete]);

  return { ...state, skipToEnd };
};

// ===========================================
// ETYMOLOGY CALLOUT COMPONENT
// ===========================================

interface EtymologyCalloutProps {
  word: string;
  pronunciation?: string;
  meaning: React.ReactNode;
  source?: string;
}

const EtymologyCallout: React.FC<EtymologyCalloutProps> = ({
  word,
  pronunciation,
  meaning,
  source,
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  return (
    <div ref={ref} className={`etymology-callout ${isVisible ? 'visible' : ''}`}>
      <div className="etymology-word">{word}</div>
      {pronunciation && (
        <p className="etymology-pronunciation">{pronunciation}</p>
      )}
      <p className="etymology-meaning">{meaning}</p>
      {source && <p className="etymology-source">{source}</p>}
    </div>
  );
};

// ===========================================
// FIGURE PROFILE COMPONENT
// ===========================================

interface FigureProfileProps {
  name: string;
  epithet: string;
  dates: string;
  initial: string;
  contributions: string[];
  quote?: string;
  quoteSource?: string;
  era: 'latin' | 'medieval' | 'renaissance' | 'victorian' | 'modern' | 'contemporary';
}

const FigureProfile: React.FC<FigureProfileProps> = ({
  name,
  epithet,
  dates,
  initial,
  contributions,
  quote,
  quoteSource,
  era,
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  return (
    <figure 
      ref={ref}
      className={`figure-profile era-${era} ${isVisible ? 'visible' : ''}`}
    >
      <div className="figure-portrait">
        <div className="portrait-placeholder">
          <span className="portrait-initial">{initial}</span>
        </div>
        <div className="portrait-frame" />
      </div>
      
      <figcaption className="figure-details">
        <h4 className="figure-name">{name}</h4>
        <p className="figure-epithet">{epithet}</p>
        <p className="figure-dates">{dates}</p>
        
        <ul className="figure-contributions">
          {contributions.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        
        {quote && (
          <blockquote className="figure-quote">
            <p>"{quote}"</p>
            {quoteSource && <cite>— {quoteSource}</cite>}
          </blockquote>
        )}
      </figcaption>
    </figure>
  );
};

// ===========================================
// DEFINITION CARD COMPONENT
// ===========================================

interface DefinitionCardProps {
  year: string;
  definition: string;
  source: string;
  delay?: number;
}

const DefinitionCard: React.FC<DefinitionCardProps> = ({
  year,
  definition,
  source,
  delay = 0,
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  return (
    <div 
      ref={ref}
      className={`definition-card ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="definition-year">{year}</span>
      <p className="definition-text">{definition}</p>
      <span className="definition-source">{source}</span>
    </div>
  );
};

// ===========================================
// REVEALED BLOCK COMPONENT
// ===========================================

interface RevealedBlockProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const RevealedBlock: React.FC<RevealedBlockProps> = ({ children, className = '', delay = 0 }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  return (
    <div 
      ref={ref}
      className={`revealed-block ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ===========================================
// CHAPTER HEADER COMPONENT
// ===========================================

interface ChapterHeaderProps {
  number: string;
  title: string;
  era: string;
  metaphor?: string;
}

const ChapterHeader: React.FC<ChapterHeaderProps> = ({ number, title, era, metaphor }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  return (
    <div ref={ref} className={`chapter-header ${isVisible ? 'visible' : ''}`}>
      <span className="chapter-number">{number}</span>
      <h2 className="chapter-title">{title}</h2>
      <span className="chapter-era">{era}</span>
      {metaphor && <p className="chapter-metaphor">"{metaphor}"</p>}
    </div>
  );
};

// ===========================================
// ETYMOLOGY TREE PROGRESS
// ===========================================

const EtymologyProgress: React.FC<{ progress: number }> = ({ progress }) => {
  const branches = [
    { label: 'secare', position: 5 },
    { label: 'sexus', position: 15 },
    { label: 'division', position: 30 },
    { label: 'category', position: 45 },
    { label: 'gender', position: 60 },
    { label: 'reproduction', position: 75 },
    { label: 'desire', position: 90 },
  ];
  
  return (
    <div className="etymology-progress" aria-label={`Reading progress: ${Math.round(progress * 100)}%`}>
      <div className="etymology-tree">
        <div className="tree-trunk" />
        <div 
          className="tree-growth"
          style={{ height: `${progress * 100}%` }}
        />
        {branches.map((branch) => (
          <div 
            key={branch.label}
            className={`tree-branch ${progress * 100 >= branch.position ? 'active' : ''}`}
            style={{ bottom: `${branch.position}%` }}
          >
            <span className="branch-line" />
            <span className="branch-label">{branch.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===========================================
// SCROLL-LOCK HERO SECTION
// ===========================================

const ScrollLockHero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  
  // Use scroll-lock hook: 250vh of scroll to complete the sequence
  const { isLocked, progress, isComplete, skipToEnd } = useScrollLock(heroRef, 250);

  // For reduced motion, show final state immediately
  if (prefersReduced) {
    return (
      <section className="hero-section hero-static" ref={heroRef}>
        <div className="hero-container">
          <div className="hero-title-layer" style={{ opacity: 1 }}>
            <p className="hero-etymology">Etymology</p>
            <p className="hero-latin">secare — sexus — sex</p>
            <p className="hero-translation">to cut — division — category</p>
            <h1 className="hero-title-word">SEX</h1>
            <p className="hero-subtitle">
              How a word meaning "to divide" became the most charged word in the English language
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ===========================================
  // PHASE CALCULATIONS
  // ===========================================
  // Each phase is 20% of scroll progress (0-100)
  // Phases should cleanly hand off to the next - no overlapping!
  
  const normalizedProgress = progress / 100;
  
  // Phase activation (0 to 1 within each phase's range)
  const phase1 = Math.min(1, normalizedProgress * 5);                           // 0-20%
  const phase2 = Math.max(0, Math.min(1, (normalizedProgress - 0.2) * 5));      // 20-40%
  const phase3 = Math.max(0, Math.min(1, (normalizedProgress - 0.4) * 5));      // 40-60%
  const phase4 = Math.max(0, Math.min(1, (normalizedProgress - 0.6) * 5));      // 60-80%
  const phase5 = Math.max(0, Math.min(1, (normalizedProgress - 0.8) * 5));      // 80-100%
  
  // ===========================================
  // LAYER VISIBILITY - Clean Handoffs
  // ===========================================
  // Each layer fades OUT as the next fades IN
  
  // Division Line: visible in Phase 1, fades out during Phase 2
  const divisionLineOpacity = phase2 < 0.5 
    ? 1 
    : Math.max(0, 1 - (phase2 - 0.5) * 2);
  
  // Letters: fade in during Phase 2, fade out during Phase 3
  const lettersOpacity = phase2 * (phase3 < 0.5 ? 1 : Math.max(0, 1 - (phase3 - 0.5) * 2));
  
  // Etymology: fade in during Phase 3, fade out during Phase 4
  const etymologyOpacity = phase3 * (phase4 < 0.5 ? 1 : Math.max(0, 1 - (phase4 - 0.5) * 2));
  
  // Branches: fade in during Phase 4, fade out during Phase 5
  const branchesOpacity = phase4 * (phase5 < 0.5 ? 1 : Math.max(0, 1 - (phase5 - 0.5) * 2));
  
  // Title: fade in during Phase 5, stays visible
  const titleOpacity = phase5;

  // Initial state: show pulsing line even before scrolling
  const showInitialLine = progress === 0 && !isLocked;
  const lineHeight = showInitialLine ? 30 : 30 + phase1 * 30; // Start at 30vh, grow to 60vh

  return (
    <section 
      className={`hero-section hero-scroll-lock ${isLocked ? 'is-locked' : ''} ${isComplete ? 'is-complete' : ''}`} 
      ref={heroRef}
    >
      <div className="hero-container">
        {/* Skip Button (Accessibility) */}
        {isLocked && !isComplete && (
          <button 
            className="scroll-lock-skip"
            onClick={skipToEnd}
            aria-label="Skip intro animation"
          >
            Skip Intro ↓
          </button>
        )}

        {/* Progress Indicator (visible during scroll-lock) */}
        {isLocked && !isComplete && (
          <div className="scroll-lock-progress" aria-hidden="true">
            <div 
              className="scroll-lock-progress-fill" 
              style={{ height: `${progress}%` }} 
            />
          </div>
        )}

        {/* Phase 1: The Division Line (0-20%) */}
        {divisionLineOpacity > 0 && (
          <div 
            className="hero-division-layer"
            style={{ opacity: divisionLineOpacity }}
          >
            <div 
              className={`division-line-animated ${showInitialLine ? 'pulsing' : ''}`}
              style={{ height: `${lineHeight}vh` }}
            />
          </div>
        )}

        {/* Phase 2: Letters Emerge (20-40%) */}
        {lettersOpacity > 0 && (
          <div 
            className="hero-letters-layer"
            style={{ opacity: lettersOpacity }}
          >
            <div className="letters-container">
              <span 
                className="letter-s"
                style={{ 
                  transform: `translateX(${(1 - phase2) * -50}px)`,
                }}
              >S</span>
              <span 
                className="letter-e"
                style={{ 
                  transform: `scale(${0.5 + phase2 * 0.5})`,
                }}
              >E</span>
              <span 
                className="letter-x"
                style={{ 
                  transform: `translateX(${(1 - phase2) * 50}px)`,
                }}
              >X</span>
            </div>
            <p 
              className="whisper-text"
              style={{ 
                opacity: phase3 < 0.3 ? 1 : Math.max(0, 1 - (phase3 - 0.3) * 1.4),
                transform: `translateY(${(1 - phase2) * 20}px)`,
              }}
            >
              In the beginning, there was division.
            </p>
          </div>
        )}

        {/* Phase 3: Etymology Reveals (40-60%) */}
        {etymologyOpacity > 0 && (
          <div 
            className="hero-etymology-layer"
            style={{ opacity: etymologyOpacity }}
          >
            <div className="etymology-reveal">
              <div 
                className="root-word"
                style={{ 
                  transform: `translateY(${(1 - phase3) * 20}px)`,
                }}
              >
                <span className="word-latin">secare</span>
                <span className="word-arrow">→</span>
                <span className="word-latin">sexus</span>
              </div>
              <p 
                className="root-meaning"
                style={{ 
                  opacity: Math.max(0, phase3 - 0.3) * 1.4,
                  transform: `translateY(${(1 - phase3) * 15}px)`,
                }}
              >
                "to cut, to sever, to divide"
              </p>
            </div>
          </div>
        )}

        {/* Phase 4: Branches of Meaning (60-80%) */}
        {branchesOpacity > 0 && (
          <div 
            className="hero-branches-layer"
            style={{ opacity: branchesOpacity }}
          >
            <div className="meaning-branches">
              <div 
                className="central-word"
                style={{ opacity: phase4 }}
              >
                SEXUS
              </div>
              <div className="branches-container">
                {[
                  { word: 'gender', angle: -60, delay: 0 },
                  { word: 'category', angle: -20, delay: 0.1 },
                  { word: 'half', angle: 20, delay: 0.2 },
                  { word: 'division', angle: 60, delay: 0.3 },
                ].map((branch) => (
                  <div 
                    key={branch.word}
                    className="meaning-branch"
                    style={{ 
                      opacity: Math.max(0, phase4 - branch.delay) * 1.4,
                      transform: `rotate(${branch.angle}deg) translateX(${phase4 * 100}px)`,
                    }}
                  >
                    <span className="branch-word">{branch.word}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Phase 5: Title Card (80-100%) */}
        {titleOpacity > 0 && (
          <div 
            className="hero-title-layer"
            style={{ opacity: titleOpacity }}
          >
            <p 
              className="hero-etymology-tag"
              style={{ 
                transform: `translateY(${(1 - phase5) * 20}px)`,
              }}
            >
              Etymology
            </p>
            <h1 
              className="hero-title-word"
              style={{ 
                letterSpacing: `${0.5 - phase5 * 0.35}em`,
              }}
            >
              SEX
            </h1>
            <p 
              className="hero-subtitle"
              style={{ 
                opacity: Math.max(0, phase5 - 0.3) * 1.4,
                transform: `translateY(${(1 - phase5) * 15}px)`,
              }}
            >
              How a word meaning "to divide" became the most charged word in the English language
            </p>
          </div>
        )}

        {/* Initial prompt text (visible only at start) */}
        {showInitialLine && (
          <div className="hero-initial-prompt">
            <p className="initial-question">What does this word really mean?</p>
          </div>
        )}

        {/* Scroll Indicator */}
        <div 
          className="scroll-indicator-hero"
          style={{ opacity: !isLocked && phase1 < 0.5 ? 0.6 : Math.max(0, 1 - phase1 * 2) }}
        >
          <span>Scroll to begin</span>
          <div className="scroll-line-animated" />
        </div>
      </div>
    </section>
  );
};

// ===========================================
// MAIN CLIENT COMPONENT
// ===========================================

export default function OriginOfSexClient() {
  const { progress: scrollProgress } = useCinematicScroll();
  const prefersReduced = useReducedMotion();
  
  return (
    <div className={`origin-of-sex-essay ${prefersReduced ? 'reduced-motion' : ''}`}>
      {/* Etymology Tree Progress */}
      <EtymologyProgress progress={scrollProgress} />
      
      {/* ============================================
          HERO: THE DIVISION (Scroll-Lock)
          ============================================ */}
      <ScrollLockHero />
      
      {/* ============================================
          PROLOGUE
          ============================================ */}
      <section className="prologue">
        <div className="prologue-content">
          <RevealedBlock className="prologue-text large" delay={0}>
            Words are living things.
          </RevealedBlock>
          <RevealedBlock className="prologue-text" delay={200}>
            They are born, they grow, they change. They carry the fingerprints 
            of every century that touched them. Some words fade. Others explode 
            into meanings their creators never imagined.
          </RevealedBlock>
          <RevealedBlock className="prologue-text" delay={400}>
            The word <span className="prologue-etymology">sex</span> began 
            as something cold and mathematical—a way to sort the world into 
            halves. Today it sells cars, starts wars, and makes headlines.
          </RevealedBlock>
          <RevealedBlock className="prologue-text" delay={600}>
            This is the story of that transformation.
          </RevealedBlock>
        </div>
      </section>
      
      {/* ============================================
          CHAPTER 1: THE CUT
          ============================================ */}
      <section className="chapter chapter-1 era-latin" id="latin">
        <ChapterHeader 
          number="I" 
          title="The Cut" 
          era="Latin Origins · 500 BCE – 500 CE"
          metaphor="Before it meant anything else, sex meant separation—the knife that divides the world."
        />
        
        <EtymologyCallout
          word="SECARE"
          pronunciation="/seˈkaː.re/"
          meaning={<>Latin verb: <em>to cut, to sever, to divide</em></>}
          source="Classical Latin, from Proto-Italic *sekō"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The story begins not with bodies, but with blades. The Latin 
            verb <span className="latin-quote">secare</span> meant to cut, 
            to slice, to separate one thing from another. From this root 
            grew <span className="latin-quote">sexus</span>—a noun for the 
            result of that cutting: a half, a category, a division.
          </VoiceUnseen>
        </div>
        
        <EtymologyCallout
          word="SEXUS"
          pronunciation="/ˈsek.sus/"
          meaning={<>Latin noun: <em>a division, a category, a half of the whole</em></>}
          source="From secare + -tus (result suffix)"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            In ancient Rome, <span className="latin-quote">sexus</span> was 
            as mundane as a census form. It answered a simple question: 
            <span className="word-emphasis"> Which half?</span> Male or female? 
            This category or that? There was nothing salacious about the word. 
            It appeared in legal documents, philosophical treatises, and 
            agricultural manuals with equal indifference.
          </VoiceUnseen>
        </div>
        
        <FigureProfile
          name="Pliny the Elder"
          epithet="The Natural Cataloguer"
          dates="23–79 CE"
          initial="P"
          contributions={[
            "Roman author and natural philosopher",
            "Encyclopedic 'Naturalis Historia' used 'sexus' extensively",
            "Catalogued all living things by sex as a primary division",
            "Died observing the eruption of Vesuvius",
          ]}
          quote="We observe that in all living creatures there exist two sexes."
          quoteSource="Naturalis Historia"
          era="latin"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            Pliny wrote of the sexus of plants and animals with the same 
            clinical detachment we might use for height or weight. The word 
            was cold, rational, mathematical. It divided the world into 
            two—and that was all.
          </VoiceUnseen>
          <VoiceUnseen>
            But words rarely stay still. The cut that creates them is only 
            the beginning.
          </VoiceUnseen>
        </div>
        
        <VoiceEternal>
          Every word carries the blade that made it. Sexus remembered the cut.
        </VoiceEternal>
        
        <SectionDivider symbol="✦" />
      </section>
      
      {/* ============================================
          CHAPTER 2: THE SACRED DIVISION
          ============================================ */}
      <section className="chapter chapter-2 era-medieval" id="medieval">
        <ChapterHeader 
          number="II" 
          title="The Sacred Division" 
          era="Medieval Christianity · 500–1400 CE"
          metaphor="When the Church inherited the word, it dressed sex in theology—division became destiny."
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            Medieval Christianity transformed <span className="latin-quote">sexus</span> from 
            mere category to divine order. Male and female were no longer just halves of a 
            whole—they were God's intentional design, written into creation from the first 
            chapter of Genesis.
          </VoiceUnseen>
        </div>
        
        <PullQuote 
          attribution="Genesis 1:27 (Vulgate)" 
          year="c. 400 CE"
        >
          Masculum et feminam creavit eos.
          <br /><em style={{ fontSize: '0.8em', opacity: 0.7 }}>Male and female He created them.</em>
        </PullQuote>
        
        <div className="narrative-block">
          <VoiceUnseen>
            Church fathers like Augustine and Aquinas wrote extensively about 
            the nature of the sexes, always in terms of spiritual hierarchy and 
            cosmic purpose. The word remained clinical but gained metaphysical 
            weight. To belong to a <span className="latin-quote">sexus</span> was 
            to inherit a destiny—specific virtues, specific sins, specific paths 
            to salvation.
          </VoiceUnseen>
        </div>
        
        <FigureProfile
          name="Thomas Aquinas"
          epithet="The Theologian of Difference"
          dates="1225–1274"
          initial="T"
          contributions={[
            "Dominican friar and scholastic philosopher",
            "Summa Theologica codified sexual difference as divine intent",
            "'Sexus' in his writings meant essential nature, not merely anatomy",
            "Argued that the sexes have different rational capacities",
          ]}
          quote="The woman was made to be a help to man. But she was not fitted to be a help to man except in generation."
          quoteSource="Summa Theologica"
          era="medieval"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            For medieval Christians, the division of sexes was not arbitrary 
            taxonomy but cosmic architecture. Each sex had its place in the 
            great chain of being, its role in the divine economy. The word 
            <span className="word-emphasis"> sex</span> had not yet approached 
            the act—it still meant the category. But the category now trembled 
            with theological significance.
          </VoiceUnseen>
        </div>
        
        <VoiceEternal>
          The division was no longer neutral. It had become moral.
        </VoiceEternal>
        
        <SectionDivider symbol="◆" />
      </section>
      
      {/* ============================================
          CHAPTER 3: THE BOTANICAL TURN
          ============================================ */}
      <section className="chapter chapter-3 era-renaissance" id="renaissance">
        <ChapterHeader 
          number="III" 
          title="The Botanical Turn" 
          era="Renaissance Science · 1600–1750"
          metaphor="Linnaeus did something radical—he gave plants a sex life."
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            In 1735, a Swedish botanist published a book that would scandalize 
            Europe and revolutionize science. Carl Linnaeus proposed organizing 
            all of nature—every plant, every animal, every living thing—by a 
            single principle: sex.
          </VoiceUnseen>
        </div>
        
        <EtymologyCallout
          word="SYSTEMA SEXUALE"
          pronunciation="The Sexual System"
          meaning={<>Linnaeus's classification scheme organizing plants by <em>male and female reproductive parts</em></>}
          source="Systema Naturae, 1735"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            This was revolutionary—and to many, outrageous. Linnaeus described 
            flowers having "husbands" and "wives," petals serving as "bridal 
            beds." His language was deliberately provocative. He was not just 
            naming parts; he was insisting that sex was everywhere in nature, 
            that reproduction was the key to understanding life itself.
          </VoiceUnseen>
        </div>
        
        <FigureProfile
          name="Carl Linnaeus"
          epithet="Father of Sexual Taxonomy"
          dates="1707–1778"
          initial="L"
          contributions={[
            "Swedish botanist who created binomial nomenclature",
            "Made sexual reproduction the basis of plant classification",
            "His 'sexual system' organized plants by stamens and pistils",
            "Accused of bringing obscenity into botany",
          ]}
          quote="The petals serve as bridal beds which the Creator has so gloriously arranged, adorned with such noble bed curtains, and perfumed with so many soft scents."
          quoteSource="Systema Naturae"
          era="renaissance"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            Critics accused Linnaeus of projecting human sin onto innocent 
            nature, of finding "loathsome harlotry" in the lily and the rose. 
            One botanist called his system "too smutty for English readers." 
            But Linnaeus had won. His system worked. And the word 
            <span className="word-emphasis"> sex</span> began its slow migration 
            from category to reproduction.
          </VoiceUnseen>
        </div>
        
        <div className="definition-stack">
          <DefinitionCard 
            year="Before Linnaeus"
            definition="Sex: the category of male or female"
            source="Standard usage"
            delay={0}
          />
          <DefinitionCard 
            year="After Linnaeus"
            definition="Sex: the category, AND the means of reproduction"
            source="Scientific expansion"
            delay={150}
          />
        </div>
        
        <VoiceEternal>
          The word learned a new trick. It now pointed not just to what something was, but to what it did.
        </VoiceEternal>
        
        <SectionDivider symbol="❧" />
      </section>
      
      {/* ============================================
          CHAPTER 4: THE VICTORIAN PARADOX
          ============================================ */}
      <section className="chapter chapter-4 era-victorian" id="victorian">
        <ChapterHeader 
          number="IV" 
          title="The Victorian Paradox" 
          era="Scientific Prudery · 1800–1900"
          metaphor="The Victorians dissected sex in laboratories while blushing at the word."
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The 19th century was the age of taxonomy, classification, and 
            ruthless scientific inquiry. Darwin published on "sexual selection." 
            Medical journals proliferated with studies of "sexual pathology." 
            The word appeared more frequently in print than ever before—but 
            always wrapped in Latin, always filtered through expertise.
          </VoiceUnseen>
        </div>
        
        <FigureProfile
          name="Charles Darwin"
          epithet="Evolution's Sexual Theorist"
          dates="1809–1882"
          initial="D"
          contributions={[
            "English naturalist and biologist",
            "'The Descent of Man, and Selection in Relation to Sex' (1871)",
            "Argued that sexual selection drives evolution",
            "Made 'sex' a scientific term of profound importance",
          ]}
          quote="Sexual selection depends on the success of certain individuals over others of the same sex, in relation to the propagation of the species."
          quoteSource="The Descent of Man"
          era="victorian"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            Yet Victorian culture became increasingly prudish about the word 
            itself. Polite society could not speak of "sex" directly—they 
            invented euphemisms, circumlocutions, meaningful pauses. The same 
            era that produced <span className="word-emphasis">Psychopathia 
            Sexualis</span> produced families that covered piano legs for fear 
            they were too suggestive.
          </VoiceUnseen>
        </div>
        
        <PullQuote 
          attribution="Richard von Krafft-Ebing"
          year="1886"
        >
          The work is written in Latin where matters of a sexual nature are discussed, 
          so as to prevent it from becoming the subject of common conversation.
        </PullQuote>
        
        <div className="narrative-block">
          <VoiceUnseen>
            The word "sex" was now officially dangerous. It required gatekeeping. 
            Doctors could use it; ladies could not. Scientists could publish it; 
            novelists risked prosecution. The division that once meant "category" 
            now meant something that required protection from.
          </VoiceUnseen>
        </div>
        
        <VoiceEternal>
          The Victorians made sex both omnipresent and unspeakable. The paradox would not resolve for another century.
        </VoiceEternal>
        
        <SectionDivider symbol="✧" />
      </section>
      
      {/* ============================================
          CHAPTER 5: THE FREUDIAN EXPLOSION
          ============================================ */}
      <section className="chapter chapter-5 era-modern" id="modern">
        <ChapterHeader 
          number="V" 
          title="The Freudian Explosion" 
          era="Psychoanalysis · 1900–1960"
          metaphor="Freud found sex everywhere—in dreams, in slips, in civilization itself."
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            Sigmund Freud did not invent modern sexuality, but he gave it a 
            language. His work systematically linked "sex" not just to 
            reproduction but to desire, to the unconscious, to the deep 
            engines of human behavior. After Freud, sex was no longer just 
            what bodies did—it was what psyches wanted.
          </VoiceUnseen>
        </div>
        
        <FigureProfile
          name="Sigmund Freud"
          epithet="The Prophet of Desire"
          dates="1856–1939"
          initial="F"
          contributions={[
            "Austrian neurologist who founded psychoanalysis",
            "Placed sexuality at the center of human psychology",
            "'Three Essays on the Theory of Sexuality' (1905)",
            "Made 'sex' the key to understanding human nature",
          ]}
          quote="The sexual life of adult women is a 'dark continent' for psychology."
          quoteSource="The Question of Lay Analysis"
          era="modern"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The word shifted dramatically. "Sexual" now modified thoughts, 
            dreams, drives, complexes. The adjective form became as important 
            as the noun. Everything could be sexual—childhood, creativity, 
            neurosis, civilization itself.
          </VoiceUnseen>
          <VoiceUnseen>
            By mid-century, when people said "sex," they increasingly meant 
            the act itself—not the category. A split was forming. The original 
            meaning was drifting away.
          </VoiceUnseen>
        </div>
        
        <div className="definition-stack">
          <DefinitionCard 
            year="1900"
            definition="Sex (n.): either of the two divisions of organic beings distinguished as male or female"
            source="Oxford English Dictionary"
            delay={0}
          />
          <DefinitionCard 
            year="1929"
            definition="Sex (n.): physical contact between individuals involving sexual stimulation"
            source="First documented use of 'sex' to mean the act"
            delay={150}
          />
        </div>
        
        <VoiceEternal>
          The word had finally crossed over. It no longer just divided—it desired.
        </VoiceEternal>
        
        <SectionDivider symbol="◈" />
      </section>
      
      {/* ============================================
          CHAPTER 6: THE WORD TODAY
          ============================================ */}
      <section className="chapter chapter-6 era-contemporary" id="contemporary">
        <ChapterHeader 
          number="VI" 
          title="The Word Today" 
          era="Contemporary Culture · 1960–Present"
          metaphor="Now the word contains multitudes—biology, pleasure, identity, power."
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The sexual revolution of the 1960s completed the transformation. 
            "Sex" became the primary term for intercourse. A new word—"gender"—split 
            off to handle the original meaning of male/female category. A single 
            word had divided into two, mirroring its own etymology.
          </VoiceUnseen>
        </div>
        
        <EtymologyCallout
          word="THE SPLIT"
          meaning={
            <>
              <strong>SEX:</strong> biological characteristics; the act<br />
              <strong>GENDER:</strong> social/cultural identity; the role
            </>
          }
          source="Linguistic divergence, late 20th century"
        />
        
        <FigureProfile
          name="Alfred Kinsey"
          epithet="The Statistician of Desire"
          dates="1894–1956"
          initial="K"
          contributions={[
            "American biologist and sexologist",
            "Kinsey Reports (1948, 1953) brought 'sex' into public discourse",
            "Made private behavior a matter of scientific survey",
            "His research remains controversial and influential",
          ]}
          quote="The only unnatural sex act is that which you cannot perform."
          quoteSource="Attributed"
          era="contemporary"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            Today, "sex" appears everywhere: clickbait headlines, medical forms, 
            dating apps, political debates. It sells cars and settles divorces. 
            It's censored on some platforms and mandatory on others. The word 
            that once coldly divided the world now provokes the full spectrum 
            of human emotion.
          </VoiceUnseen>
        </div>
        
        <div className="timeline-strip">
          <div className="timeline-point">
            <span className="timeline-year">secare</span>
            <span className="timeline-label">To Cut</span>
          </div>
          <div className="timeline-point">
            <span className="timeline-year">sexus</span>
            <span className="timeline-label">Division</span>
          </div>
          <div className="timeline-point">
            <span className="timeline-year">gender</span>
            <span className="timeline-label">Category</span>
          </div>
          <div className="timeline-point active">
            <span className="timeline-year">sex</span>
            <span className="timeline-label">Desire</span>
          </div>
        </div>
        
        <VoiceEternal>
          The blade that once divided the world now cuts in a different direction—toward intimacy, toward taboo, toward the unspeakable made speakable.
        </VoiceEternal>
      </section>
      
      {/* ============================================
          EPILOGUE
          ============================================ */}
      <section className="epilogue">
        <div className="epilogue-content">
          <div className="epilogue-word">SEX</div>
          
          <RevealedBlock delay={0}>
            <h2 className="epilogue-title">The Word That Divided Everything</h2>
          </RevealedBlock>
          
          <RevealedBlock className="epilogue-text" delay={200}>
            Two thousand years ago, a Roman scribe wrote <em>sexus</em> on a 
            census form. He was sorting, categorizing, dividing the world into 
            manageable halves. He had no idea what he was starting.
          </RevealedBlock>
          
          <RevealedBlock className="epilogue-text" delay={400}>
            Words are living things. They carry the fingerprints of every 
            century that touched them. And this word—this three-letter 
            accident of Latin conjugation—has been touched by everyone.
          </RevealedBlock>
          
          <RevealedBlock className="epilogue-closing" delay={600}>
            You will never hear it the same way again.
          </RevealedBlock>
        </div>
      </section>
      
      {/* ============================================
          SOURCES
          ============================================ */}
      <footer className="sources-section">
        <h3>Sources & Further Reading</h3>
        
        <div className="sources-grid">
          <div className="source-category">
            <h4>Etymology & Linguistics</h4>
            <ul>
              <li><em>Oxford English Dictionary</em>, "sex, n."</li>
              <li><em>Etymonline.com</em>, Douglas Harper</li>
              <li>Lewis & Short, <em>A Latin Dictionary</em></li>
              <li>Walde & Hofmann, <em>Lateinisches Etymologisches Wörterbuch</em></li>
            </ul>
          </div>
          
          <div className="source-category">
            <h4>History of Sexuality</h4>
            <ul>
              <li>Michel Foucault, <em>The History of Sexuality</em> (1976–1984)</li>
              <li>Thomas Laqueur, <em>Making Sex</em> (1990)</li>
              <li>David Halperin, <em>How to Do the History of Homosexuality</em> (2002)</li>
            </ul>
          </div>
          
          <div className="source-category">
            <h4>Scientific History</h4>
            <ul>
              <li>Lisbet Koerner, <em>Linnaeus: Nature and Nation</em> (1999)</li>
              <li>Jonathan Gathorne-Hardy, <em>Kinsey: A Biography</em> (2004)</li>
              <li>Peter Gay, <em>Freud: A Life for Our Time</em> (1988)</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

