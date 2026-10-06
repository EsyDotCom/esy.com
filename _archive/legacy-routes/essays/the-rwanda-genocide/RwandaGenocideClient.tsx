"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "./the-rwanda-genocide.css";
import { rwandaImages } from "./images";

// ============================================================================
// CUSTOM HOOKS FOR IMMERSIVE EXPERIENCE
// ============================================================================

/**
 * Hook for scroll-lock hero sequence
 * Locks viewport and drives animation via scroll input
 */
function useScrollLockHero(scrollDepth: number = 1200) {
  const [isLocked, setIsLocked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const accumulatedScroll = useRef(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (isComplete) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Check if hero is in view and should lock
      if (rect.top <= 0 && rect.bottom > viewportHeight * 0.5 && !isComplete) {
        if (!isLocked) {
          setIsLocked(true);
          lastScrollY.current = window.scrollY;
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isLocked || isComplete) return;
      
      // Prevent default scroll
      e.preventDefault();
      
      // Accumulate scroll input
      accumulatedScroll.current += e.deltaY;
      
      // Calculate progress (0-100)
      const newProgress = Math.max(0, Math.min(100, (accumulatedScroll.current / scrollDepth) * 100));
      setProgress(newProgress);
      
      // Check if complete
      if (newProgress >= 100) {
        setIsComplete(true);
        setIsLocked(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLocked || isComplete) return;
      
      // Space or arrow down advances
      if (e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        accumulatedScroll.current += 100;
        const newProgress = Math.min(100, (accumulatedScroll.current / scrollDepth) * 100);
        setProgress(newProgress);
        if (newProgress >= 100) {
          setIsComplete(true);
          setIsLocked(false);
        }
      }
      
      // Escape skips
      if (e.key === 'Escape') {
        skipToEnd();
      }
    };

    // Touch handling for mobile
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (!isLocked || isComplete) return;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isLocked || isComplete) return;
      e.preventDefault();
      
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;
      
      accumulatedScroll.current += deltaY * 2; // Amplify touch
      const newProgress = Math.max(0, Math.min(100, (accumulatedScroll.current / scrollDepth) * 100));
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        setIsComplete(true);
        setIsLocked(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isLocked, isComplete, scrollDepth]);

  const skipToEnd = () => {
    setProgress(100);
    setIsComplete(true);
    setIsLocked(false);
    accumulatedScroll.current = scrollDepth;
  };

  return { containerRef, isLocked, progress, isComplete, skipToEnd };
}

/**
 * Hook for inline scroll-lock sequences within chapters
 * Lighter weight than hero - triggers when element is in center of viewport
 */
function useScrollLockSequence(scrollDepth: number = 800) {
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const accumulatedScroll = useRef(0);

  useEffect(() => {
    if (isComplete) return;

    const checkPosition = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      
      // Activate when element center is in viewport center zone
      if (rect.top < viewportCenter && rect.bottom > viewportCenter && !isComplete) {
        if (!isActive) {
          setIsActive(true);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isActive || isComplete) return;
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      
      // Only capture if still centered
      if (rect.top < viewportCenter && rect.bottom > viewportCenter) {
        e.preventDefault();
        accumulatedScroll.current += e.deltaY;
        const newProgress = Math.max(0, Math.min(100, (accumulatedScroll.current / scrollDepth) * 100));
        setProgress(newProgress);
        
        if (newProgress >= 100) {
          setIsComplete(true);
          setIsActive(false);
        }
      }
    };

    window.addEventListener('scroll', checkPosition, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });

    // Initial check
    checkPosition();

    return () => {
      window.removeEventListener('scroll', checkPosition);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isActive, isComplete, scrollDepth]);

  const skip = () => {
    setProgress(100);
    setIsComplete(true);
    setIsActive(false);
  };

  return { containerRef, isActive, progress, isComplete, skip };
}

// ============================================================================
// TYPES
// ============================================================================

interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  era: string;
  metaphor: string;
}

interface KeyFigure {
  name: string;
  epithet: string;
  contributions: string[];
  quote?: string;
  fate?: string;
  imageDescription: string;
}

interface Source {
  title: string;
  url: string;
  type: "academic" | "institutional" | "journalism" | "documentary" | "archive";
}

// ============================================================================
// DATA
// ============================================================================

const chapters: Chapter[] = [
  {
    id: "before-the-storm",
    number: 1,
    title: "Before the Storm",
    subtitle: "Rwanda Before Colonial Contact",
    era: "Pre-1897",
    metaphor: "The kingdom that colonialism would shatter—a complex society reduced to caricature.",
  },
  {
    id: "colonial-poison",
    number: 2,
    title: "The Colonial Poison",
    subtitle: "Manufacturing Ethnicity",
    era: "1897–1962",
    metaphor: "The Hamitic Hypothesis—how European racism created the categories that would kill.",
  },
  {
    id: "first-blood",
    number: 3,
    title: "The First Blood",
    subtitle: "Independence, Revolution, and Exile",
    era: "1959–1990",
    metaphor: "The reversal—when the oppressed became oppressors, and the cycle began.",
  },
  {
    id: "death-of-peace",
    number: 4,
    title: "The Death of Peace",
    subtitle: "The Arusha Accords and Their Enemies",
    era: "1990–1994",
    metaphor: "The peace that was murdered—how those who would lose power chose genocide over compromise.",
  },
  {
    id: "one-hundred-days",
    number: 5,
    title: "One Hundred Days",
    subtitle: "The Genocide",
    era: "April 7 – July 15, 1994",
    metaphor: "The machete—the hand-to-hand intimacy of neighbors murdering neighbors.",
  },
  {
    id: "world-looked-away",
    number: 6,
    title: "The World Looked Away",
    subtitle: "International Failure",
    era: "April–July 1994",
    metaphor: "The empty chairs—the UN Security Council debating language while Rwanda drowned in blood.",
  },
  {
    id: "liberation",
    number: 7,
    title: "Liberation",
    subtitle: "The RPF Victory",
    era: "July 1994",
    metaphor: "The end that was also a beginning—the gun that stopped the genocide.",
  },
  {
    id: "exodus-aftermath",
    number: 8,
    title: "Exodus and Aftermath",
    subtitle: "The Refugee Crisis",
    era: "1994–1996",
    metaphor: "The poison spreading—how the genocide's perpetrators escaped to kill again.",
  },
  {
    id: "justice-reconciliation",
    number: 9,
    title: "Justice and Reconciliation",
    subtitle: "Gacaca and the Choice to Rebuild",
    era: "1994–2012",
    metaphor: "The impossible conversation—perpetrators and survivors in the same village.",
  },
  {
    id: "rising",
    number: 10,
    title: "Land of a Thousand Hills Rising",
    subtitle: "Rwanda's Transformation",
    era: "1994–Present",
    metaphor: "The phoenix nation—from a million dead to Africa's most remarkable success story.",
  },
];

const sources: Source[] = [
  {
    title: "Leave None to Tell the Story: Genocide in Rwanda — Human Rights Watch",
    url: "https://www.hrw.org/reports/1999/rwanda/",
    type: "institutional",
  },
  {
    title: "The Rwanda Genocide — United States Holocaust Memorial Museum",
    url: "https://www.ushmm.org/genocide-prevention/countries/rwanda",
    type: "institutional",
  },
  {
    title: "Shake Hands with the Devil: The Failure of Humanity in Rwanda — Roméo Dallaire",
    url: "https://www.penguinrandomhouse.com/books/286815/shake-hands-with-the-devil-by-romeo-dallaire/",
    type: "documentary",
  },
  {
    title: "We Wish to Inform You That Tomorrow We Will Be Killed with Our Families — Philip Gourevitch",
    url: "https://www.penguinrandomhouse.com/books/119434/we-wish-to-inform-you-that-tomorrow-we-will-be-killed-with-our-families-by-philip-gourevitch/",
    type: "journalism",
  },
  {
    title: "Machete Season: The Killers in Rwanda Speak — Jean Hatzfeld",
    url: "https://us.macmillan.com/books/9780312425036/macheteseason",
    type: "journalism",
  },
  {
    title: "The Order of Genocide: Race, Power, and War in Rwanda — Scott Straus",
    url: "https://www.cornellpress.cornell.edu/book/9780801474927/the-order-of-genocide/",
    type: "academic",
  },
  {
    title: "A History of Modern Rwanda — Christian Scherrer (Cambridge University Press)",
    url: "https://www.cambridge.org/core/books/history-of-modern-rwanda/",
    type: "academic",
  },
  {
    title: "Kigali Genocide Memorial — Official Website",
    url: "https://kgm.rw/",
    type: "institutional",
  },
  {
    title: "International Criminal Tribunal for Rwanda (ICTR) — UN Archives",
    url: "https://unictr.irmct.org/",
    type: "archive",
  },
  {
    title: "Left to Tell: Discovering God Amidst the Rwandan Holocaust — Immaculée Ilibagiza",
    url: "https://www.hayhouse.com/left-to-tell-paperback",
    type: "documentary",
  },
  {
    title: "Rwanda: The Preventable Genocide — OAU International Panel of Eminent Personalities",
    url: "https://www.refworld.org/docid/4d1da8752.html",
    type: "institutional",
  },
  {
    title: "Conspiracy to Murder: The Rwandan Genocide — Linda Melvern",
    url: "https://www.versobooks.com/books/1721-conspiracy-to-murder",
    type: "journalism",
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

// Content Warning Modal
const ContentWarning: React.FC<{ onAccept: () => void; onExit: () => void }> = ({
  onAccept,
  onExit,
}) => {
  return (
    <div className="content-warning-overlay">
      <div className="content-warning-modal">
        <div className="warning-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2>Content Warning</h2>
        <p className="warning-text">
          The following experience documents the <strong>1994 Genocide against the Tutsi in Rwanda</strong>—the 
          murder of approximately one million people in one hundred days.
        </p>
        <p className="warning-text">
          This material includes descriptions of mass violence, sexual violence, and death, as well as 
          archival photographs from the genocide and its aftermath. Viewer discretion is strongly advised.
        </p>
        <p className="warning-note">
          The Rwandan term for this commemoration is <em>Kwibuka</em>—to remember.
          <br />
          By proceeding, you agree to remember.
        </p>
        <div className="warning-buttons">
          <button className="btn-continue" onClick={onAccept}>
            Continue to Experience
          </button>
          <button className="btn-exit" onClick={onExit}>
            Return to Essays
          </button>
        </div>
        <p className="crisis-note">
          If you or someone you know is struggling, please reach out to a{" "}
          <a href="https://findahelpline.com/" target="_blank" rel="noopener noreferrer">
            crisis support service
          </a>
          .
        </p>
      </div>
    </div>
  );
};

// Progress Bar - The Memorial Flame
const ProgressFlame: React.FC<{ progress: number; currentChapter: number }> = ({
  progress,
  currentChapter,
}) => {
  return (
    <div className="progress-flame-container">
      <div className="flame-track">
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className={`flame-marker ${index < currentChapter ? "lit" : ""} ${
              index === currentChapter ? "current" : ""
            }`}
            style={{ top: `${(index / (chapters.length - 1)) * 100}%` }}
          >
            <div className="flame-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 23c-3.9 0-7-3.1-7-7 0-2.5 1.5-4.8 3.5-6.4-.3 1.3.2 2.7 1.2 3.7.3.3.7.3 1 0 .3-.3.3-.7 0-1-1-1-1.3-2.4-.9-3.7.5-1.5 1.8-2.7 3.4-3.1.4-.1.8.2.8.6v.5c0 1.7 1 3.2 2.5 3.9.3.2.7 0 .8-.3.1-.3 0-.7-.2-.9-.9-.5-1.5-1.4-1.5-2.5v-.5c0-1.2-.8-2.2-1.9-2.5C11.7 3.3 9.9 4.5 9 6c-.4.7-.6 1.4-.6 2.2 0 .5.1 1 .2 1.5C7 11.2 6 13 6 15c0 3.3 2.7 6 6 6s6-2.7 6-6c0-1.4-.5-2.7-1.3-3.8-.2-.3-.6-.4-.9-.2-.3.2-.4.6-.2.9.6.9 1 1.9 1 3.1 0 2.5-2 4.5-4.5 4.5S8 17.5 8 15c0-2 1.1-3.7 2.8-4.5.3-.2.5-.5.4-.9-.1-.3-.4-.6-.8-.5-2.6.7-4.4 3-4.4 5.9 0 3.3 2.7 6 6 6z" />
              </svg>
            </div>
          </div>
        ))}
        <div className="flame-progress" style={{ height: `${progress}%` }} />
      </div>
      <div className="progress-label">Kwibuka</div>
    </div>
  );
};

// Section Component with Intersection Observer and Accessibility
const Section: React.FC<{
  id: string;
  className?: string;
  children: React.ReactNode;
  onVisible?: () => void;
  ariaLabel?: string;
}> = ({ id, className = "", children, onVisible, ariaLabel }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          onVisible?.();
        }
      },
      { 
        threshold: 0.05,  // Trigger when just 5% visible
        rootMargin: '100px 0px'  // Start loading 100px before entering viewport
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`section ${className} ${isVisible ? "visible" : ""}`}
      aria-label={ariaLabel}
      tabIndex={-1}
    >
      {children}
    </section>
  );
};

// Chapter Header
const ChapterHeader: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  return (
    <div className="chapter-header">
      <div className="chapter-number">Chapter {chapter.number}</div>
      <h2 className="chapter-title">{chapter.title}</h2>
      <p className="chapter-subtitle">{chapter.subtitle}</p>
      <div className="chapter-era">{chapter.era}</div>
      <p className="chapter-metaphor">{chapter.metaphor}</p>
    </div>
  );
};

// Quote Monument
const QuoteMonument: React.FC<{
  quote: string;
  attribution: string;
  context?: string;
}> = ({ quote, attribution, context }) => {
  return (
    <div className="quote-monument">
      <blockquote>
        <p>&ldquo;{quote}&rdquo;</p>
        <cite>— {attribution}</cite>
        {context && <span className="quote-context">{context}</span>}
      </blockquote>
    </div>
  );
};

// ============================================================================
// IMMERSIVE HERO SECTION
// ============================================================================

// ============================================================================
// SCROLL-LOCK HERO SECTION (Per Spec Layer 3)
// ============================================================================

const HeroSection: React.FC = () => {
  // AUDIT FIX: Increased scroll depth from 1200px to 2400px for proper pacing
  // Per Immersive Experience Engineer: "Dramatic moments have appropriate scroll depth"
  const { containerRef, isLocked, progress, isComplete, skipToEnd } = useScrollLockHero(2400);
  
  // RECALIBRATED STAGE TIMING (2400px scroll depth)
  // Each stage now has proper breathing room for content absorption
  // 
  // Stage 1: 0-12%   (288px) - Hills panorama - peaceful opening
  // Stage 2: 12-25%  (312px) - Church approach - building tension
  // Stage 3: 25-38%  (312px) - Inside church text - horror dawns
  // Stage 4: 38-52%  (336px) - Murder text - the revelation
  // Stage 5: 52-65%  (312px) - Memorial context - processing
  // Stage 6: 65-78%  (312px) - 1,000,000 number - THE DRAMATIC MOMENT
  // Stage 7: 78-90%  (288px) - Scale statistics - comprehending scale
  // Stage 8: 90-100% (240px) - KWIBUKA title - resolution
  
  // Opacity helper with proper fade timing
  // fadeIn: 5% for smooth entry, hold, then fadeOut: 8% for graceful exit
  const getStageOpacity = (stageStart: number, peakStart: number, peakEnd: number, stageEnd: number) => {
    if (progress < stageStart) return 0;
    // Fade in
    if (progress < peakStart) {
      return (progress - stageStart) / (peakStart - stageStart);
    }
    // Hold at full opacity
    if (progress < peakEnd) return 1;
    // Fade out
    if (progress < stageEnd) {
      return 1 - (progress - peakEnd) / (stageEnd - peakEnd);
    }
    return 0;
  };
  
  // Camera zoom effect (simulated via scale)
  const zoomLevel = 1 + (progress / 100) * 0.3; // 1x to 1.3x
  
  // Darken as we progress into the horror
  const darkenLevel = Math.min(progress / 50, 1) * 0.5;

  // RECALIBRATED IMAGE CROSSFADES
  // Image 1: Hills (0-40%) - longer presence for the peaceful opening
  // Image 2: Church interior (35-68%) - the horror
  // Image 3: Child survivors (60-82%) - the human cost
  // Image 4: Fade to dark for stats (78-100%) - abstraction for processing
  
  const getImageOpacity = (imageStart: number, imageEnd: number, fadeIn: number = 8, fadeOut: number = 8) => {
    if (progress < imageStart) return 0;
    if (progress < imageStart + fadeIn) {
      return (progress - imageStart) / fadeIn;
    }
    if (progress < imageEnd - fadeOut) return 1;
    if (progress < imageEnd) {
      return 1 - (progress - (imageEnd - fadeOut)) / fadeOut;
    }
    return 0;
  };

  // Image opacities with extended durations
  const hillsOpacity = progress < 40 ? 1 : Math.max(0, 1 - (progress - 40) / 12);
  const churchOpacity = getImageOpacity(32, 68, 8, 10);
  const survivorsOpacity = getImageOpacity(58, 82, 8, 10);

  return (
    <section 
      ref={containerRef}
      className={`hero-section hero-scroll-lock ${isLocked ? 'is-locked' : ''} ${isComplete ? 'is-complete' : ''}`}
    >
      {/* Background with multiple images crossfading */}
      <div className="hero-background">
        {/* Image 1: Hills panorama (0-35%) */}
        <div 
          className="hero-image-wrapper"
          style={{ 
            transform: `scale(${zoomLevel}) translateZ(0)`,
            opacity: hillsOpacity,
            willChange: 'transform, opacity'
          }}
        >
          <Image
            src={rwandaImages.thousandHills.url}
            alt={rwandaImages.thousandHills.alt}
            fill
            className="hero-image"
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
        
        {/* Image 2: Church interior (35-70%) */}
        <div 
          className="hero-image-wrapper hero-image-church"
          style={{ 
            opacity: churchOpacity,
            willChange: 'opacity'
          }}
        >
          <Image
            src={rwandaImages.ntaramaChurch.url}
            alt={rwandaImages.ntaramaChurch.alt}
            fill
            className="hero-image hero-image--dark"
            style={{ objectFit: "cover" }}
          />
        </div>
        
        {/* Image 3: Child survivors (65-85%) */}
        <div 
          className="hero-image-wrapper hero-image-survivors"
          style={{ 
            opacity: survivorsOpacity,
            willChange: 'opacity'
          }}
        >
          <Image
            src={rwandaImages.childSurvivors.url}
            alt={rwandaImages.childSurvivors.alt}
            fill
            className="hero-image hero-image--survivors"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
        
        {/* Progressive darkening */}
        <div 
          className="hero-darken"
          style={{ opacity: darkenLevel }}
        />
        <div className="hero-gradient" />
      </div>

      {/* Stage 1: 0-12% - Opening panorama (288px of scroll) */}
      {/* VISIBLE IMMEDIATELY at start, then fades out as user scrolls */}
      <div 
        className="hero-stage hero-stage-1"
        style={{ opacity: progress < 8 ? 1 : Math.max(0, 1 - (progress - 8) / 6) }}
      >
        <p className="hero-location">Rwanda</p>
        <p className="hero-tagline">The Land of a Thousand Hills</p>
      </div>

      {/* Stage 2: 12-25% - Church approach (312px of scroll) */}
      <div 
        className="hero-stage hero-stage-2"
        style={{ opacity: getStageOpacity(10, 14, 20, 28) }}
      >
        <p className="hero-location">Ntarama Church</p>
        <p className="hero-tagline">April 1994</p>
      </div>

      {/* Stage 3: 25-38% - Inside the church (312px of scroll) */}
      <div 
        className="hero-stage hero-stage-4"
        style={{ opacity: getStageOpacity(23, 27, 33, 40) }}
      >
        <p className="hero-church-text">
          The doors were open.<br />
          Darkness inside.<br />
          Silence where there should be life.
        </p>
      </div>

      {/* Stage 4: 38-52% - The murder revelation (336px of scroll) */}
      <div 
        className="hero-stage hero-stage-5"
        style={{ opacity: getStageOpacity(36, 40, 47, 55) }}
      >
        <p className="hero-murder-text">
          On April 15, 1994, over 5,000 people were murdered at Ntarama Church.
        </p>
        <p className="hero-murder-subtext">
          They had come seeking sanctuary.<br />
          The killers followed them inside.
        </p>
      </div>

      {/* Stage 5: 52-65% - Memorial context (312px of scroll) */}
      <div 
        className="hero-stage hero-stage-6"
        style={{ opacity: getStageOpacity(50, 54, 60, 67) }}
      >
        <p className="hero-memorial-text">
          This church is now a memorial.<br />
          These bones are real.
        </p>
      </div>

      {/* Stage 6: 65-78% - THE NUMBER (312px of scroll - dramatic moment) */}
      <div 
        className="hero-stage hero-stage-7"
        style={{ opacity: getStageOpacity(63, 67, 73, 80) }}
      >
        <div className="hero-main-stat">
          <span className="hero-stat-number">
            {/* Count up as user scrolls through this stage */}
            {progress < 65 ? '0' : 
             progress >= 75 ? '1,000,000' :
             Math.floor(((progress - 65) / 10) * 1000000).toLocaleString()}
          </span>
          <span className="hero-stat-label">Murdered</span>
          <span className="hero-stat-sublabel">in 100 days</span>
        </div>
      </div>

      {/* Stage 7: 78-90% - Scale statistics (288px of scroll) */}
      <div 
        className="hero-stage hero-stage-8"
        style={{ opacity: getStageOpacity(76, 80, 86, 92) }}
      >
        <div className="hero-scale-stats">
          <div className="hero-scale-stat">
            <span className="scale-number">10,000</span>
            <span className="scale-label">per day</span>
          </div>
          <div className="hero-scale-stat">
            <span className="scale-number">400</span>
            <span className="scale-label">per hour</span>
          </div>
          <div className="hero-scale-stat">
            <span className="scale-number">7</span>
            <span className="scale-label">per minute</span>
          </div>
        </div>
        <p className="hero-scale-context">
          The scale of industrial genocide achieved with machetes.
        </p>
      </div>

      {/* Stage 8: 90-100% - KWIBUKA title (240px of scroll - resolution) */}
      <div 
        className="hero-stage hero-stage-9"
        style={{ opacity: getStageOpacity(88, 92, 100, 100) }}
      >
        <h1 className="hero-title">KWIBUKA</h1>
        <p className="hero-subtitle">A Hundred Days of Darkness, A Generation of Light</p>
        <p className="hero-translation">
          <em>Kwibuka</em> — &ldquo;To remember&rdquo;
        </p>
      </div>

      {/* Progress indicator */}
      <div className="hero-progress">
        <div 
          className="hero-progress-fill"
          style={{ height: `${progress}%` }}
        />
      </div>

      {/* Skip affordance */}
      {!isComplete && (
        <button 
          className="hero-skip"
          onClick={skipToEnd}
          aria-label="Skip introduction"
        >
          Skip intro
        </button>
      )}

      {/* Scroll prompt (only at start) */}
      {progress < 5 && (
        <div className="hero-scroll-prompt">
          <span>Scroll to begin</span>
          <div className="scroll-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      )}
    </section>
  );
};

// Animated Statistic with Count-Up
const AnimatedStatistic: React.FC<{
  endValue: number;
  label: string;
  sublabel?: string;
  variant?: "large" | "medium" | "small";
  formatValue?: (n: number) => string;
  duration?: number;
  delay?: number;
}> = ({ endValue, label, sublabel, variant = "medium", formatValue, duration = 2000, delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Start animation when element is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          // Delay start if specified
          setTimeout(() => setHasStarted(true), delay);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted, delay]);

  // Count-up animation
  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Cubic ease-out for dramatic slowdown at the end
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(easeOut * endValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, endValue, duration]);

  const formattedValue = formatValue ? formatValue(displayValue) : displayValue.toString();

  return (
    <div ref={ref} className={`statistic statistic-${variant}`}>
      <div className="stat-value">{formattedValue}</div>
      <div className="stat-label">{label}</div>
      {sublabel && <div className="stat-sublabel">{sublabel}</div>}
    </div>
  );
};

// Static Statistic Display (for chapters)
const Statistic: React.FC<{
  value: string;
  label: string;
  sublabel?: string;
  variant?: "large" | "medium" | "small";
}> = ({ value, label, sublabel, variant = "medium" }) => {
  return (
    <div className={`statistic statistic-${variant}`}>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {sublabel && <div className="stat-sublabel">{sublabel}</div>}
    </div>
  );
};

// Key Figure Card
const KeyFigureCard: React.FC<{ figure: KeyFigure }> = ({ figure }) => {
  return (
    <div className="key-figure-card">
      <div className="figure-header">
        <h4 className="figure-name">{figure.name}</h4>
        <p className="figure-epithet">{figure.epithet}</p>
      </div>
      <ul className="figure-contributions">
        {figure.contributions.map((contribution, index) => (
          <li key={index}>{contribution}</li>
        ))}
      </ul>
      {figure.quote && (
        <blockquote className="figure-quote">&ldquo;{figure.quote}&rdquo;</blockquote>
      )}
      {figure.fate && <p className="figure-fate">{figure.fate}</p>}
    </div>
  );
};

// ============================================================================
// SCROLL-LOCK SEQUENCES - In-chapter immersive moments
// ============================================================================

/**
 * "The Roadblock" - Chapter 5 Scroll-Lock Sequence
 * Per spec: A road stretches before the viewer. As user scrolls, a roadblock 
 * appears: logs, tires, Interahamwe with machetes. A hand extends into frame, 
 * holding an ID card. The words are visible: TUTSI. The machete rises.
 */
const RoadblockSequence: React.FC = () => {
  const { containerRef, progress, isComplete, skip } = useScrollLockSequence(1000);

  // Stage calculations based on spec:
  // 0-20%: Open road, peaceful
  // 20-40%: Roadblock appears
  // 40-60%: Approach, ID card demanded
  // 60-80%: Card shown: TUTSI
  // 80-100%: Machete rises. Black.

  const getOpacity = (start: number, end: number) => {
    if (progress < start) return 0;
    if (progress >= end) return 1;
    return (progress - start) / (end - start);
  };

  const getFadeOut = (start: number, duration: number = 15) => {
    if (progress < start) return 1;
    return Math.max(0, 1 - (progress - start) / duration);
  };

  return (
    <div 
      ref={containerRef}
      className={`roadblock-sequence ${isComplete ? 'complete' : ''}`}
      role="region"
      aria-label="Interactive roadblock sequence"
    >
      <div className="roadblock-scene">
        {/* Stage 1: Open road (0-20%) */}
        <div 
          className="roadblock-stage roadblock-road"
          style={{ opacity: getFadeOut(20) }}
        >
          <p className="roadblock-narration">A road in Rwanda. April 1994.</p>
          <div className="road-visual">
            <div className="road-line" />
          </div>
        </div>

        {/* Stage 2: Roadblock appears (20-40%) */}
        <div 
          className="roadblock-stage roadblock-barrier"
          style={{ opacity: getOpacity(15, 25) * getFadeOut(45) }}
        >
          <div className="barrier-visual">
            <div className="barrier-log" />
            <div className="barrier-log" />
            <div className="barrier-tire" />
          </div>
          <p className="roadblock-narration">Roadblock ahead.</p>
        </div>

        {/* Stage 3: The demand (40-60%) */}
        <div 
          className="roadblock-stage roadblock-demand"
          style={{ opacity: getOpacity(35, 45) * getFadeOut(65) }}
        >
          <p className="roadblock-demand-text">
            &ldquo;Carte d&apos;identité.&rdquo;
          </p>
          <p className="roadblock-subtext">Show your papers.</p>
        </div>

        {/* Stage 4: The card revealed (60-80%) */}
        <div 
          className="roadblock-stage roadblock-card-reveal"
          style={{ opacity: getOpacity(55, 65) * getFadeOut(85) }}
        >
          <div className="roadblock-id-card">
            <span className="card-header">CARTE D&apos;IDENTITÉ</span>
            <span className="card-ethnic">TUTSI</span>
          </div>
        </div>

        {/* Stage 5: The darkness (80-100%) */}
        <div 
          className="roadblock-stage roadblock-end"
          style={{ opacity: getOpacity(75, 90) }}
        >
          <div className="roadblock-darkness" style={{ opacity: getOpacity(85, 95) }} />
          <p className="roadblock-final-text" style={{ opacity: getOpacity(90, 98) }}>
            This happened over one million times in 100 days.
          </p>
        </div>
      </div>

      {/* Progress indicator */}
      {!isComplete && (
        <div className="roadblock-progress">
          <div className="roadblock-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* Skip button */}
      {!isComplete && progress > 0 && (
        <button className="roadblock-skip" onClick={skip}>
          Skip
        </button>
      )}

      {/* Scroll prompt */}
      {progress < 5 && !isComplete && (
        <p className="roadblock-prompt">Scroll to continue</p>
      )}
    </div>
  );
};

// Timeline Event
const TimelineEvent: React.FC<{
  date: string;
  title: string;
  description: string;
}> = ({ date, title, description }) => {
  return (
    <div className="timeline-event">
      <div className="timeline-date">{date}</div>
      <div className="timeline-content">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

// Data Visualization - Rising Metrics
const RisingMetrics: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const metrics = [
    { label: "GDP Growth", before: "0%", after: "7-8%", sublabel: "Annual average" },
    { label: "Life Expectancy", before: "29 yrs", after: "67 yrs", sublabel: "More than doubled" },
    { label: "Women in Parliament", before: "—", after: "61%", sublabel: "Highest in world" },
    { label: "Healthcare Coverage", before: "—", after: "90%", sublabel: "Universal health insurance" },
    { label: "Primary School", before: "—", after: "98%", sublabel: "Near-universal enrollment" },
  ];

  return (
    <div ref={containerRef} className={`rising-metrics ${isVisible ? "animate" : ""}`}>
      <h3 className="metrics-title">The Transformation</h3>
      <p className="metrics-subtitle">From 1994 baseline to present day</p>
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className="metric-card"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="metric-label">{metric.label}</div>
            <div className="metric-comparison">
              <span className="metric-before">{metric.before}</span>
              <span className="metric-arrow">→</span>
              <span className="metric-after">{metric.after}</span>
            </div>
            <div className="metric-sublabel">{metric.sublabel}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Sources Section
const SourcesSection: React.FC<{ sources: Source[] }> = ({ sources }) => {
  const getTypeLabel = (type: Source["type"]) => {
    const labels = {
      academic: "Academic",
      institutional: "Institution",
      journalism: "Journalism",
      documentary: "Documentary",
      archive: "Archive",
    };
    return labels[type];
  };

  return (
    <section className="sources-section">
      <div className="sources-content">
        <h3 className="sources-title">Sources & Further Reading</h3>
        <ul className="sources-list">
          {sources.map((source, index) => (
            <li key={index}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.title}
              </a>
              <span className="source-type">{getTypeLabel(source.type)}</span>
            </li>
          ))}
        </ul>
        <p className="sources-note">
          This narrative was fact-checked against peer-reviewed scholarship, institutional reports, 
          and authoritative historical records. The 1994 Genocide against the Tutsi is extensively 
          documented by the International Criminal Tribunal for Rwanda, Human Rights Watch, and 
          the Kigali Genocide Memorial.
        </p>
      </div>
    </section>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const RwandaGenocideClient: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(0);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / scrollHeight) * 100;
      setProgress(Math.min(currentProgress, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="rwanda-genocide-essay">
      {/* Skip Link for Accessibility */}
      <a href="#before-the-storm" className="skip-link">
        Skip to main content
      </a>

      {/* Progress Indicator */}
      <ProgressFlame progress={progress} currentChapter={currentChapter} />

      {/* Hero Section - Immersive */}
      <HeroSection />

      {/* Chapter 1: Before the Storm */}
      <Section id="before-the-storm" className="chapter" onVisible={() => setCurrentChapter(0)}>
        <ChapterHeader chapter={chapters[0]} />
        <div className="chapter-image-container">
          <Image
            src={rwandaImages.rwandaLandscape.url}
            alt={rwandaImages.rwandaLandscape.alt}
            width={1200}
            height={600}
            className="chapter-image"
            style={{ objectFit: "cover" }}
          />
          <p className="image-caption">{rwandaImages.rwandaLandscape.alt}</p>
        </div>
        <div className="chapter-content">
          <p className="lead-paragraph">
            Before the Europeans arrived, Rwanda was one of Africa&apos;s most centralized and 
            sophisticated kingdoms. The <em>Mwami</em> (king) ruled through a complex hierarchy 
            of chiefs and sub-chiefs. The society was organized not primarily by ethnicity but 
            by clan, region, and occupation.
          </p>
          <p>
            The terms Hutu, Tutsi, and Twa did exist—but they were fluid categories, more like 
            social classes than fixed ethnicities. Hutu generally referred to cultivators, Tutsi 
            to cattle-keepers, and Twa to forest-dwelling potters and hunters. Intermarriage was 
            common. A wealthy Hutu who acquired cattle could become Tutsi through a process called 
            <em>kwihutura</em>. The categories were permeable.
          </p>
          <div className="emphasis-block">
            <p>
              Understanding this pre-colonial complexity is essential. The genocide of 1994 was 
              not the eruption of &ldquo;ancient tribal hatreds.&rdquo; Those hatreds were 
              manufactured—and the manufacturers were European.
            </p>
          </div>
          <KeyFigureCard
            figure={{
              name: "Kigeli IV Rwabugiri",
              epithet: "The Last Great Mwami",
              contributions: [
                "Ruled Rwanda 1853-1895, the most powerful king in Rwandan history",
                "Expanded the kingdom through military conquest",
                "Centralized administration and strengthened royal power",
                "Died just before German colonizers arrived",
              ],
              quote: "Rwanda was a nation before Europe named it one.",
              imageDescription: "Historical illustration—regal figure with royal drums",
            }}
          />
        </div>
      </Section>

      {/* Chapter 2: Colonial Poison */}
      <Section id="colonial-poison" className="chapter colonial-era" onVisible={() => setCurrentChapter(1)}>
        <ChapterHeader chapter={chapters[1]} />
        <div className="chapter-content">
          <p className="lead-paragraph">
            Germany colonized Rwanda in 1897, but it was Belgium—granted the territory after 
            World War I—that would engineer the ethnic division that enabled genocide.
          </p>
          <p>
            The Belgians arrived with the <strong>Hamitic Hypothesis</strong>: a pseudoscientific 
            theory that &ldquo;superior&rdquo; African peoples must have descended from Ham, Noah&apos;s 
            son, and migrated from the north. The taller, thinner Tutsi, they decided, were these 
            Hamitic invaders—natural rulers, almost European. The shorter, broader Hutu were the 
            &ldquo;native&rdquo; Bantu—born to serve.
          </p>
          <div className="id-card-visual">
            <div className="id-card">
              <div className="id-card-header">CARTE D&apos;IDENTITÉ</div>
              <div className="id-card-field">
                <span className="field-label">Ethnie:</span>
                <span className="field-value ethnic-field">TUTSI</span>
              </div>
              <p className="id-card-caption">
                In 1933, Belgium introduced identity cards requiring every Rwandan to be classified 
                as Hutu, Tutsi, or Twa. This card would become, sixty years later, the instrument of 
                selection at roadblocks across Rwanda.
              </p>
            </div>
          </div>
          <QuoteMonument
            quote="I simply described what I saw"
            attribution="Richard Kandt, German colonial administrator"
            context="But description became prescription—and prescription became death sentence."
          />
        </div>
      </Section>

      {/* Chapter 3: First Blood */}
      <Section id="first-blood" className="chapter" onVisible={() => setCurrentChapter(2)}>
        <ChapterHeader chapter={chapters[2]} />
        <div className="chapter-content">
          <p className="lead-paragraph">
            As independence approached, Belgium reversed course. Having ruled through the Tutsi 
            minority, they now backed the Hutu majority in a calculated transition of power. The 
            &ldquo;Hutu Revolution&rdquo; of 1959-1961 inverted the colonial hierarchy through violence.
          </p>
          <div className="timeline-container">
            <TimelineEvent
              date="1959"
              title="Hutu Revolution Begins"
              description="Tutsi homes burned. Thousands killed. First wave of refugees flees to Uganda, Burundi, Congo."
            />
            <TimelineEvent
              date="1962"
              title="Independence"
              description="Grégoire Kayibanda leads independent Rwanda with explicit Hutu supremacist ideology."
            />
            <TimelineEvent
              date="1963, 1967, 1973"
              title="Periodic Pogroms"
              description="Waves of violence punctuate the decades. After each, more refugees flee. By 1990: 750,000 in exile."
            />
            <TimelineEvent
              date="1973"
              title="Habyarimana Seizes Power"
              description="General Juvénal Habyarimana rules for twenty-one years, building the apparatus of genocide."
            />
          </div>
          <KeyFigureCard
            figure={{
              name: "Fred Rwigyema",
              epithet: "The General Who Almost Came Home",
              contributions: [
                "Co-founder of the Rwandan Patriotic Front",
                "Hero of the Ugandan civil war, decorated general",
                "Led the RPF invasion of October 1990",
                "Killed on the second day of the invasion",
              ],
              fate: "His death forced his friend Paul Kagame to take command.",
              imageDescription: "Rwigyema in military uniform, the face of the exiled generation",
            }}
          />
        </div>
      </Section>

      {/* Chapter 4: Death of Peace */}
      <Section id="death-of-peace" className="chapter" onVisible={() => setCurrentChapter(3)}>
        <ChapterHeader chapter={chapters[3]} />
        <div className="chapter-content">
          <p className="lead-paragraph">
            International pressure forced negotiations. The Arusha Accords of August 1993 promised 
            power-sharing, integration of the RPF into a new government, and the return of refugees. 
            Peace seemed possible.
          </p>
          <p>
            But the <em>akazu</em> had no intention of sharing power. As diplomats celebrated, the 
            extremists prepared genocide.
          </p>
          <div className="radio-visual">
            <div className="radio-dial">
              <span className="radio-label">RTLM</span>
              <span className="radio-frequency">106.0 FM</span>
            </div>
            <div className="radio-transcript">
              <p>&ldquo;The graves are not yet full. Who will help us fill them?&rdquo;</p>
              <p>&ldquo;Cut down the tall trees.&rdquo;</p>
              <p>&ldquo;The enemy is the Tutsi.&rdquo;</p>
            </div>
            <p className="radio-caption">
              RTLM (Radio Télévision Libre des Mille Collines) broadcast ethnic hatred daily. 
              The Tutsi were called <em>inyenzi</em> (cockroaches) and <em>inzoka</em> (snakes).
            </p>
          </div>
          <div className="weapons-stat">
            <Statistic 
              value="500,000" 
              label="Machetes imported" 
              sublabel="from China in the years before"
              variant="large"
            />
          </div>
          <div className="figure-with-image">
            <div className="figure-image-container">
              <Image
                src={rwandaImages.romeoDallaire.url}
                alt={rwandaImages.romeoDallaire.alt}
                width={300}
                height={400}
                className="figure-image"
                style={{ objectFit: "cover" }}
              />
            </div>
            <KeyFigureCard
              figure={{
                name: "Roméo Dallaire",
                epithet: "The General Who Was Ordered Not to Save",
                contributions: [
                  "Canadian general commanding UN forces in Rwanda (UNAMIR)",
                  "Warned headquarters of impending genocide, was ordered to stand down",
                  "Watched helplessly as murder unfolded",
                  "Wrote Shake Hands with the Devil, essential memoir",
                ],
                quote: "We watched as the devil took control of paradise on earth.",
                fate: "Suffered severe PTSD; attempted suicide. Dedicated life to genocide prevention.",
                imageDescription: "Dallaire in UN peacekeepers uniform, the weight of failure in his eyes",
              }}
            />
          </div>
        </div>
      </Section>

      {/* Chapter 5: One Hundred Days - CONTENT WARNING */}
      <Section id="one-hundred-days" className="chapter genocide-chapter" onVisible={() => setCurrentChapter(4)}>
        <div className="chapter-warning">
          <p>⚠️ This chapter documents mass murder. Images are selected to convey scale while 
          maintaining victims&apos; dignity.</p>
        </div>
        <ChapterHeader chapter={chapters[4]} />
        <div className="chapter-image-container memorial-image">
          <Image
            src={rwandaImages.ntaramaChurch.url}
            alt={rwandaImages.ntaramaChurch.alt}
            width={1200}
            height={600}
            className="chapter-image"
            style={{ objectFit: "cover" }}
          />
          <p className="image-caption">Ntarama Church Memorial - where over 5,000 people were murdered seeking sanctuary</p>
        </div>
        <div className="chapter-content">
          <p className="lead-paragraph">
            On April 6, 1994, at 8:20 PM, a plane carrying President Habyarimana was shot down 
            over Kigali. Within an hour, the killing began.
          </p>
          <p>
            The genocide was not spontaneous chaos. It was organized, planned, and directed. The 
            Presidential Guard and army established roadblocks. The Interahamwe fanned out with 
            machetes and lists of names. The radio instructed: &ldquo;The graves are not yet full.&rdquo;
          </p>
          {/* Scroll-Lock Sequence: "The Roadblock" */}
          <RoadblockSequence />
          <p>
            Churches became killing grounds. At Nyarubuye, 35,000 were murdered in the church compound. 
            At Ntarama, over 5,000. At Murambi Technical School, 45,000. The sanctuaries became abattoirs.
          </p>
          <div className="genocide-stats">
            <Statistic value="250,000–500,000" label="Women raped" sublabel="before being killed" variant="medium" />
            <Statistic value="800,000–1,000,000" label="People murdered" sublabel="in 100 days" variant="medium" />
          </div>
          <QuoteMonument
            quote="In spite of everything, I still believe that people are really good at heart."
            attribution="Anne Frank (1929-1945)"
            context="Anne Frank's words resonate with Rwanda's survivors—many of whom found the strength to forgive."
          />
          <div className="survivors-section">
            <div className="survivor-image-container">
              <Image
                src={rwandaImages.childSurvivors.url}
                alt={rwandaImages.childSurvivors.alt}
                width={600}
                height={400}
                className="survivor-image"
                style={{ objectFit: "cover" }}
              />
              <p className="image-caption">Child survivors of the Tutsi genocide</p>
            </div>
          </div>
          <div className="figure-with-image">
            <div className="figure-image-container">
              <Image
                src={rwandaImages.immaculeeIlibagiza.url}
                alt={rwandaImages.immaculeeIlibagiza.alt}
                width={300}
                height={400}
                className="figure-image"
                style={{ objectFit: "cover" }}
              />
            </div>
            <KeyFigureCard
              figure={{
                name: "Immaculée Ilibagiza",
                epithet: "The Woman Who Prayed in the Bathroom",
                contributions: [
                  "Survived 91 days hiding in a 3×4 foot bathroom with seven other women",
                  "Sheltered by a Hutu pastor who risked his life",
                  "Emerged to find her entire family murdered except one brother",
                  "Wrote Left to Tell, met her family's killer, forgave him",
                ],
                quote: "Forgiveness is all I have to give.",
                imageDescription: "Ilibagiza before the genocide, with her family; later, as survivor and speaker",
              }}
            />
          </div>
        </div>
      </Section>

      {/* Chapter 6: World Looked Away */}
      <Section id="world-looked-away" className="chapter" onVisible={() => setCurrentChapter(5)}>
        <ChapterHeader chapter={chapters[5]} />
        <div className="chapter-content">
          <p className="lead-paragraph">
            The genocide succeeded because the world let it happen.
          </p>
          <p>
            General Dallaire commanded 2,500 UN peacekeepers in Rwanda. On January 11, 1994, he sent 
            his now-famous &ldquo;genocide fax&rdquo; to UN headquarters, detailing Interahamwe training, 
            weapons caches, and plans for extermination. He requested permission to raid the weapons. 
            <strong>The request was denied.</strong>
          </p>
          <div className="un-failure-visual">
            <div className="empty-chamber">
              <p className="chamber-date">UN Security Council • April 21, 1994</p>
              <p className="chamber-debate">&ldquo;We must be careful with language...&rdquo;</p>
              <p className="chamber-debate">&ldquo;Acts of genocide may have occurred...&rdquo;</p>
              <div className="death-counter">
                <span className="counter-label">Meanwhile:</span>
                <span className="counter-value">~400,000</span>
                <span className="counter-label">already dead</span>
              </div>
            </div>
          </div>
          <p>
            The United States, scarred by Somalia, refused to use the word &ldquo;genocide&rdquo; 
            because international law would require action. Belgium withdrew its forces after ten 
            soldiers were murdered. Rather than reinforce, the Security Council voted to 
            <em>reduce</em> UNAMIR to 270 troops.
          </p>
          <QuoteMonument
            quote="We did not act quickly enough after the killing began. We should not have allowed the refugee camps to become safe havens for the killers. We did not immediately call these crimes by their rightful name: genocide."
            attribution="President Bill Clinton, 1998"
            context="Four years too late."
          />
          <div className="international-figures">
            <div className="figure-with-image horizontal">
              <div className="figure-image-container small">
                <Image
                  src={rwandaImages.kofiAnnan.url}
                  alt={rwandaImages.kofiAnnan.alt}
                  width={250}
                  height={300}
                  className="figure-image"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <KeyFigureCard
                figure={{
                  name: "Kofi Annan",
                  epithet: "The Future Secretary-General Who Failed to Act",
                  contributions: [
                    "Head of UN Peacekeeping during the genocide",
                    "Received and did not act on Dallaire's genocide fax",
                    "Later became Secretary-General, acknowledged the failure",
                  ],
                  quote: "In Rwanda, we made unforgivable mistakes.",
                  fate: "Rwanda was the shame that haunted his career.",
                  imageDescription: "Annan at the UN, before and after",
                }}
              />
            </div>
          </div>
          <div className="clinton-visit-image">
            <Image
              src={rwandaImages.clintonVisit.url}
              alt={rwandaImages.clintonVisit.alt}
              width={800}
              height={500}
              className="chapter-image"
              style={{ objectFit: "cover" }}
            />
            <p className="image-caption">President Clinton meeting genocide survivors in Kigali, 1998 - four years after the genocide</p>
          </div>
        </div>
      </Section>

      {/* Chapter 7: Liberation */}
      <Section id="liberation" className="chapter liberation-chapter" onVisible={() => setCurrentChapter(6)}>
        <ChapterHeader chapter={chapters[6]} />
        <div className="chapter-content">
          <p className="lead-paragraph">
            The genocide ended not because the world intervened, but because the RPF won the war.
          </p>
          <p>
            On July 4, 1994, RPF forces captured Kigali. Over the following two weeks, they swept 
            across the country. On July 18, the RPF declared the war over.
          </p>
          <p>
            What they found defied comprehension. Churches filled with bones. Entire villages empty. 
            Bodies in rivers, in fields, along roads. The smell of death everywhere.
          </p>
          <div className="liberation-choice">
            <h4>The Pivotal Choice</h4>
            <p>
              The RPF—a predominantly Tutsi force that had lost family members in the genocide—faced 
              the question that would define Rwanda&apos;s future: <strong>revenge or reconstruction?</strong>
            </p>
            <p className="choice-result">
              They chose reconstruction. There was no counter-genocide. The new government declared 
              that there would be no Hutu, no Tutsi—only Rwandans.
            </p>
          </div>
          <div className="figure-with-image">
            <div className="figure-image-container">
              <Image
                src={rwandaImages.paulKagame.url}
                alt={rwandaImages.paulKagame.alt}
                width={300}
                height={400}
                className="figure-image"
                style={{ objectFit: "cover" }}
              />
            </div>
            <KeyFigureCard
              figure={{
                name: "Paul Kagame",
                epithet: "The Commander Who Became President",
                contributions: [
                  "Born 1957, fled to Uganda as a child",
                  "Rose through Ugandan military, co-founded RPF",
                  "Took command after Rwigyema's death",
                  "Led the RPF to victory and ended the genocide",
                  "President of Rwanda since 2000",
                ],
                quote: "Rwanda's history will not be written by outsiders.",
                fate: "Controversial but transformative leader—architect of Rwanda's reconstruction.",
                imageDescription: "Young Kagame in fatigues; later, as president in civilian dress",
              }}
            />
          </div>
        </div>
      </Section>

      {/* Chapter 8: Exodus */}
      <Section id="exodus-aftermath" className="chapter" onVisible={() => setCurrentChapter(7)}>
        <ChapterHeader chapter={chapters[7]} />
        <div className="chapter-image-container">
          <Image
            src={rwandaImages.gomaRefugeeCamp.url}
            alt={rwandaImages.gomaRefugeeCamp.alt}
            width={1200}
            height={600}
            className="chapter-image"
            style={{ objectFit: "cover" }}
          />
          <p className="image-caption">Kibumba refugee camp at Goma, Zaire - where millions fled in 1994</p>
        </div>
        <div className="chapter-content">
          <p className="lead-paragraph">
            As the RPF advanced, two million people fled westward into Zaire. They were a mixture: 
            genuine refugees fleeing war, and génocidaires fleeing justice.
          </p>
          <div className="exodus-visual">
            <div className="exodus-stat">
              <Statistic value="2,000,000" label="Refugees" sublabel="fled to Zaire" variant="large" />
            </div>
            <p className="exodus-caption">
              Among them: the perpetrators. The Interahamwe evacuated intact, bringing their weapons—and 
              their ideology. The camps became states-within-states, armed and hostile.
            </p>
          </div>
          <p>
            The international community, having failed to stop the genocide, now rushed to help the 
            refugees. But the camps were controlled by the génocidaires. Aid meant to feed refugees 
            instead sustained the killers.
          </p>
          <div className="regional-impact">
            <h4>The Poison Spreads</h4>
            <p>
              The génocidaires used the camps as bases for cross-border raids into Rwanda. In 1996, 
              Rwanda invaded Zaire, scattered the camps, and helped install Laurent-Désiré Kabila. 
              The First Congo War had begun—a conflict that would kill millions and destabilize the 
              region for decades.
            </p>
            <p className="impact-note">
              The genocide did not end in July 1994. Its consequences are still being felt.
            </p>
          </div>
        </div>
      </Section>

      {/* Chapter 9: Justice and Reconciliation */}
      <Section id="justice-reconciliation" className="chapter" onVisible={() => setCurrentChapter(8)}>
        <ChapterHeader chapter={chapters[8]} />
        <div className="chapter-image-container">
          <Image
            src={rwandaImages.ictrKigali.url}
            alt={rwandaImages.ictrKigali.alt}
            width={1200}
            height={600}
            className="chapter-image"
            style={{ objectFit: "cover" }}
          />
          <p className="image-caption">International Criminal Tribunal for Rwanda (ICTR) - where genocide architects faced justice</p>
        </div>
        <div className="reconciliation-images">
          <div className="reconciliation-image">
            <Image
              src={rwandaImages.peaceSigh.url}
              alt={rwandaImages.peaceSigh.alt}
              width={400}
              height={300}
              className="chapter-image"
              style={{ objectFit: "cover" }}
            />
            <p className="image-caption">Rwanda Makes Peace - the path of reconciliation</p>
          </div>
        </div>
        <div className="chapter-content">
          <p className="lead-paragraph">
            After the genocide, Rwanda faced an impossible problem: over 100,000 genocide suspects 
            in prisons built for 10,000. A traditional court system would have taken over a century 
            to process them all.
          </p>
          <p>
            They chose another way.
          </p>
          <div className="gacaca-visual">
            <h4>The Gacaca Courts</h4>
            <p>
              Rwanda revived and adapted the traditional <em>Gacaca</em> system—community justice 
              courts where local judges heard cases, perpetrators could confess, and survivors could 
              confront those who had harmed them.
            </p>
            <div className="gacaca-stats">
              <Statistic value="12,000" label="Gacaca courts" variant="small" />
              <Statistic value="2,000,000" label="Cases processed" variant="small" />
              <Statistic value="2002–2012" label="Duration" variant="small" />
            </div>
          </div>
          <QuoteMonument
            quote="I cannot forgive. But I can live next to you."
            attribution="A survivor, speaking to her family's killer at Gacaca"
            context="The impossible conversation, repeated thousands of times across Rwanda."
          />
          <p>
            The Gacaca system was imperfect. Some perpetrators lied. Some survivors could not bear to 
            participate. But it accomplished something remarkable: the conversation happened. Perpetrators 
            faced their victims. Many confessed. Some survivors forgave—not because they forgot, but 
            because they chose to live alongside those who had wronged them.
          </p>
          <KeyFigureCard
            figure={{
              name: "Théoneste Bagosora",
              epithet: "The Colonel Convicted as Genocide's Architect",
              contributions: [
                "Senior military officer, considered the operational planner of the genocide",
                "Convicted by ICTR of genocide, crimes against humanity",
                "Sentenced to life imprisonment",
              ],
              fate: "The 'mastermind' who organized the infrastructure of death—brought to justice.",
              imageDescription: "Bagosora at trial, the planner facing judgment",
            }}
          />
        </div>
      </Section>

      {/* Chapter 10: Rising */}
      <Section id="rising" className="chapter rising-chapter" onVisible={() => setCurrentChapter(9)}>
        <ChapterHeader chapter={chapters[9]} />
        <div className="chapter-image-container modern-rwanda">
          <Image
            src={rwandaImages.kigaliSkyline.url}
            alt={rwandaImages.kigaliSkyline.alt}
            width={1200}
            height={600}
            className="chapter-image"
            style={{ objectFit: "cover" }}
          />
          <p className="image-caption">Modern Kigali - from ashes to one of Africa&apos;s cleanest and safest cities</p>
        </div>
        <div className="chapter-content">
          <p className="lead-paragraph">
            From the ashes of genocide, Rwanda has achieved what many considered impossible.
          </p>
          <RisingMetrics />
          <div className="transformation-details">
            <p>
              The government abolished ethnic identity cards. It is illegal in Rwanda to identify as 
              Hutu, Tutsi, or Twa—there are only Rwandans. The monthly <em>umuganda</em> (community 
              service day) brings all citizens together for public works.
            </p>
            <p>
              Kigali is one of Africa&apos;s cleanest and safest cities. Corruption is among the lowest 
              in Africa. Rwanda has the highest percentage of women in parliament of any country in 
              the world.
            </p>
          </div>
          <div className="complexity-note">
            <h4>The Debate Continues</h4>
            <p>
              This transformation is not without critics. Kagame has extended his rule through 
              constitutional changes and faces accusations of authoritarianism, suppression of dissent, 
              and involvement in neighboring conflicts. Opposition politicians have been imprisoned. 
              Journalists who criticize the government face consequences.
            </p>
            <p>
              The question of Rwanda&apos;s future is genuine: Is this a development model for Africa, 
              or a benevolent dictatorship? What happens after Kagame?
            </p>
            <p className="undeniable">
              But one thing is undeniable: a nation that experienced genocide did not collapse. 
              It rebuilt. It functions. Its people, in their millions, go about the ordinary business 
              of life—which is perhaps the greatest revenge against those who tried to end life entirely.
            </p>
          </div>
          <KeyFigureCard
            figure={{
              name: "Agnes Binagwaho",
              epithet: "The Doctor Who Rebuilt Healthcare",
              contributions: [
                "Pediatrician, former Minister of Health",
                "Architect of Rwanda's universal healthcare system",
                "Reduced child mortality by 70%",
              ],
              quote: "Health is not a luxury. It is the foundation of everything.",
              imageDescription: "Binagwaho at a community health clinic, medicine as reconstruction",
            }}
          />
        </div>
      </Section>

      {/* Memorial Section */}
      <Section id="memorial" className="memorial-section">
        <div className="memorial-image-container">
          <Image
            src={rwandaImages.kigaliMemorial.url}
            alt={rwandaImages.kigaliMemorial.alt}
            width={1200}
            height={600}
            className="memorial-hero-image"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="memorial-content">
          <div className="memorial-flame-large">
            <svg viewBox="0 0 100 150" className="flame-svg">
              <defs>
                <linearGradient id="flameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#B8860B" />
                  <stop offset="50%" stopColor="#DAA520" />
                  <stop offset="100%" stopColor="#FFD700" />
                </linearGradient>
              </defs>
              <path
                d="M50 10 C60 40, 80 60, 70 100 C65 120, 55 130, 50 140 C45 130, 35 120, 30 100 C20 60, 40 40, 50 10"
                fill="url(#flameGradient)"
                className="flame-path"
              />
            </svg>
          </div>
          <h2 className="memorial-title">Kwibuka</h2>
          <p className="memorial-translation">&ldquo;To remember&rdquo;</p>
          <div className="memorial-text">
            <p>
              Every April, Rwanda stops. The nation remembers. The dead are named. The survivors speak. 
              The world is invited to witness.
            </p>
            <p>
              Remembrance is not passive. It is an act of resistance against forgetting. Against denial. 
              Against the forces that made genocide possible.
            </p>
            <p>
              One million people were murdered because the world had categories for them. Because 
              propaganda made them less than human. Because neighbors became killers. Because those 
              who could have intervened chose not to.
            </p>
            <p>
              But Rwanda did not end. It rose. Not perfectly. Not without controversy. But it rose.
            </p>
            <p className="memorial-closing">
              The living and the dead share the land of a thousand hills.
              <br />
              And the living have chosen to remember.
            </p>
          </div>
          <div className="memorial-phrase">
            <p className="phrase-kinyarwanda">Twibuke. Twiyubake.</p>
            <p className="phrase-translation">Remember. Rebuild.</p>
          </div>
        </div>
      </Section>

      {/* Sources */}
      <SourcesSection sources={sources} />

      {/* Footer */}
      <footer className="essay-footer">
        <p className="footer-dedication">
          This visual essay was created with the deepest respect for the victims of the Genocide 
          against the Tutsi, the survivors who have borne witness, and the Rwandan people who have 
          chosen reconciliation.
        </p>
        <p className="footer-phrase">
          <em>Kwibuka.</em>
        </p>
      </footer>
    </div>
  );
};

export default RwandaGenocideClient;

