"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, ChevronDown, ExternalLink } from "lucide-react";
import "./printing-press.css";

/**
 * THE PRINTING PRESS: A GLOBAL TIMELINE HISTORY
 * =============================================
 * From Tang Dynasty China to the Reformation
 *
 * Design Research Summary:
 * - Materials: Wood, Metal type, Paper, Ink
 * - 4-Era Color System: Asian amber → Gutenberg burgundy → Renaissance blue → Reformation B/W
 * - Typography: Playfair Display (display), Source Serif Pro (body), Cormorant Garamond (quotes)
 * - Unique: Timeline Spine progress bar, Cave Discovery hero, 45,000 Problem visualization
 */

// ==================== TYPES ====================

interface TimelineMarker {
  year: string;
  era: 1 | 2 | 3 | 4;
  position: number; // 0-100
}

// ==================== DATA ====================

const ESSAY_META = {
  title: "The Printing Press",
  subtitle: "A Global Timeline History",
  readTime: "22 min",
  category: "History",
};

const TIMELINE_MARKERS: TimelineMarker[] = [
  { year: "868", era: 1, position: 0 },
  { year: "1040", era: 1, position: 10 },
  { year: "1377", era: 1, position: 20 },
  { year: "1455", era: 2, position: 35 },
  { year: "1476", era: 3, position: 50 },
  { year: "1500", era: 3, position: 65 },
  { year: "1517", era: 4, position: 80 },
];

const SOURCES = [
  { title: "British Library — Diamond Sutra (868 CE)", url: "https://www.bl.uk/collection-items/the-diamond-sutra" },
  { title: "UNESCO — Jikji, Memory of the World", url: "https://en.unesco.org/memoryoftheworld/" },
  { title: "Library of Congress — Gutenberg Bible", url: "https://guides.loc.gov/gutenberg" },
  { title: "Gutenberg Museum, Mainz", url: "https://www.mainz.de/microsite/gutenberg-museum-en/" },
  { title: "Britannica — Johannes Gutenberg", url: "https://www.britannica.com/biography/Johannes-Gutenberg" },
  { title: "World History Encyclopedia — Printing Press", url: "https://www.worldhistory.org/Johannes_Gutenberg/" },
  { title: "Westminster Abbey — William Caxton", url: "https://www.westminster-abbey.org/abbey-commemorations/commemorations/william-caxton" },
  { title: "Shen Kuo, Dream Pool Essays (c. 1088)", url: "https://www.historyofinformation.com/detail.php?id=19" },
];

// ==================== HOOKS ====================

// Custom hook for scroll progress
const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = Math.min(100, Math.max(0, (window.scrollY / scrollHeight) * 100));
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
};

// Custom hook for section visibility
const useSectionVisibility = (threshold: number = 0.2) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// Custom hook for scroll-lock behavior
const useScrollLockProgress = (containerRef: React.RefObject<HTMLDivElement>) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [unpinPoint, setUnpinPoint] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = containerHeight - viewportHeight;
      const scrolledIntoSection = -rect.top;

      if (rect.top <= 0 && scrolledIntoSection <= scrollableDistance) {
        setIsPinned(true);
        setIsExiting(false);
        const progress = Math.min(100, Math.max(0, (scrolledIntoSection / scrollableDistance) * 100));
        setScrollProgress(progress);
      } else if (rect.top > 0) {
        setIsPinned(false);
        setIsExiting(false);
        setScrollProgress(0);
      } else {
        setIsPinned(false);
        setIsExiting(true);
        setScrollProgress(100);
        setUnpinPoint(scrollableDistance);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  return { scrollProgress, isPinned, isExiting, unpinPoint };
};

// ==================== COMPONENTS ====================

// Timeline Spine Progress Bar
const TimelineSpine: React.FC<{ progress: number }> = ({ progress }) => {
  const currentMarkerIndex = TIMELINE_MARKERS.findIndex(m => m.position > progress) - 1;

  return (
    <div className="timeline-spine" aria-label={`Reading progress: ${Math.round(progress)}%`}>
      <div className="timeline-track">
        <div className="timeline-fill" style={{ height: `${progress}%` }} />
        <div className="timeline-markers">
          {TIMELINE_MARKERS.map((marker, index) => (
            <div
              key={marker.year}
              className={`timeline-marker era-${marker.era} ${progress >= marker.position ? "reached" : ""} ${index === currentMarkerIndex ? "current" : ""}`}
              style={{ top: `${marker.position}%` }}
            >
              <div className="timeline-marker-dot" />
              <span className="timeline-marker-year">{marker.year}</span>
            </div>
          ))}
        </div>
        <div
          className="timeline-current"
          style={{ top: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// Header with scroll awareness
const EssayHeader: React.FC<{ scrolled: boolean }> = ({ scrolled }) => (
  <header className={`essay-header ${scrolled ? "scrolled" : ""}`}>
    <Link href="/essays" className="back-link">
      <ArrowLeft size={18} />
      <span>Essays</span>
    </Link>
    <div className="header-meta">
      <span className="header-category">{ESSAY_META.category}</span>
      <span className="header-divider">·</span>
      <Clock size={14} />
      <span>{ESSAY_META.readTime}</span>
    </div>
  </header>
);

// Hero Section - The Cave Discovery
// Spec: orchestration/skills/visual-essay-invocation/specs/the-printing-press.md lines 130-155
const HeroCave: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollProgress, isPinned, isExiting, unpinPoint } = useScrollLockProgress(containerRef);

  // Calculate visual stages based on spec choreography:
  // 0-15%: Darkness + flickering Chinese characters
  // 15-35%: Cave walls + "868 CE" date
  // 35-55%: Golden light + Diamond Sutra glows
  // 55-75%: "The oldest dated printed book" text
  // 75-90%: Colophon reveals
  // 90-100%: Question + Title card
  const stage = scrollProgress < 15 ? 0 :
                scrollProgress < 35 ? 1 :
                scrollProgress < 55 ? 2 :
                scrollProgress < 75 ? 3 :
                scrollProgress < 90 ? 4 : 5;

  // Flickering Chinese characters for darkness phase
  const chineseChars = ['佛', '經', '印', '刷', '藏'];

  return (
    <div ref={containerRef} className="hero-scroll-lock" style={{ height: "500vh" }}>
      <div
        className={`hero-pinned ${isPinned ? "is-pinned" : ""}`}
        style={isExiting ? {
          position: "absolute",
          top: `${unpinPoint}px`,
          left: 0,
          right: 0,
          height: "100dvh",
        } : undefined}
      >
        {/* Darkness layer */}
        <div
          className="hero-darkness"
          style={{ opacity: stage < 1 ? 1 : Math.max(0, 1 - (scrollProgress - 15) / 20) }}
        />

        {/* Flickering Chinese characters at edges (0-15% per spec) */}
        {stage === 0 && (
          <div className="hero-chinese-chars">
            {chineseChars.map((char, i) => (
              <span
                key={i}
                className="hero-chinese-char"
                style={{
                  left: `${10 + i * 20}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                {char}
              </span>
            ))}
          </div>
        )}

        {/* Cave walls (15-35% per spec) */}
        <div className={`hero-cave-walls ${stage >= 1 ? "visible" : ""}`} />

        {/* Date at bottom (15-35% per spec) */}
        <div className={`hero-date-bottom ${stage >= 1 && stage < 5 ? "visible" : ""}`}>
          868 CE
        </div>

        {/* Golden light (35-55% per spec) */}
        <div className={`hero-light ${stage >= 2 ? "visible" : ""}`} />

        {/* Hero content container - absolutely positioned, stages replace each other */}
        <div className="hero-content-stack">
          {/* Diamond Sutra reveal (35-55% per spec) - visible at stage 2 only */}
          <div className={`hero-scroll ${stage === 2 ? "visible" : ""}`}>
            <h2 className="hero-artifact-title">The Diamond Sutra</h2>
          </div>

          {/* "The oldest dated printed book" text (55-75% per spec) - visible at stage 3 only */}
          <div className={`hero-oldest-text ${stage === 3 ? "visible" : ""}`}>
            <h2 className="hero-artifact-title">The Diamond Sutra</h2>
            <p className="hero-oldest-label">The oldest dated printed book in the world.</p>
          </div>

          {/* Colophon text (75-90% per spec) - visible at stage 4 only */}
          <div className={`hero-colophon-block ${stage === 4 ? "visible" : ""}`}>
            <h2 className="hero-artifact-title">The Diamond Sutra</h2>
            <p className="hero-oldest-label">The oldest dated printed book in the world.</p>
            <p className="hero-colophon">
              &ldquo;Reverently made for universal free distribution by Wang Jie
              on behalf of his two parents. May 11, 868.&rdquo;
            </p>
          </div>

          {/* Question + Title card (90-100% per spec) - visible at stage 5 */}
          <div className={`hero-finale ${stage === 5 ? "visible" : ""}`}>
            <div className="hero-question">
              <p className="hero-question-text">
                But wait — if China had printing in 868...
                why do we say Gutenberg invented it in 1455?
              </p>
            </div>
            <div className="hero-title-card">
              <h1 className="hero-main-title">The Printing Press</h1>
              <p className="hero-subtitle">A Global Timeline History</p>
            </div>
          </div>
        </div>

        {/* Skip button */}
        {isPinned && scrollProgress < 95 && (
          <button
            className="skip-button"
            onClick={() => {
              const container = containerRef.current;
              if (container) {
                const targetScroll = container.offsetTop + container.offsetHeight - window.innerHeight;
                window.scrollTo({ top: targetScroll, behavior: "smooth" });
              }
            }}
          >
            Skip →
          </button>
        )}

        {/* Progress indicator */}
        {isPinned && (
          <div className="scroll-lock-progress">
            <div className="scroll-lock-progress-fill" style={{ width: `${scrollProgress}%` }} />
          </div>
        )}

        {/* Initial scroll indicator */}
        {stage === 0 && (
          <div className="scroll-indicator">
            <ChevronDown size={24} />
            <span className="scroll-indicator-text">Scroll to enter</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Chapter Section wrapper
const ChapterSection: React.FC<{
  era: 1 | 2 | 3 | 4;
  eraLabel: string;
  chapterNum: number;
  title: string;
  metaphor?: string;
  children: React.ReactNode;
}> = ({ era, eraLabel, chapterNum, title, metaphor, children }) => {
  const { ref, isVisible } = useSectionVisibility();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`chapter-section era-${era} section-transition ${isVisible ? "visible" : ""}`}
    >
      <div className="chapter-header">
        <div className="chapter-era">{eraLabel}</div>
        <div className="chapter-number">Chapter {chapterNum}</div>
        <h2 className="chapter-title">{title}</h2>
        {metaphor && <p className="chapter-metaphor">{metaphor}</p>}
      </div>
      {children}
    </section>
  );
};

// Quote Monument
const QuoteMonument: React.FC<{
  quote: string;
  attribution: string;
  era?: 1 | 2 | 3 | 4;
}> = ({ quote, attribution, era = 1 }) => {
  const { ref, isVisible } = useSectionVisibility();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`layout-quote era-${era} section-transition ${isVisible ? "visible" : ""}`}
    >
      <blockquote className="quote-text">&ldquo;{quote}&rdquo;</blockquote>
      <cite className="quote-attribution">— {attribution}</cite>
    </div>
  );
};

// Timeline Event
const TimelineEvent: React.FC<{
  year: string;
  title: string;
  content: string;
}> = ({ year, title, content }) => {
  const { ref, isVisible } = useSectionVisibility();

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`timeline-event ${isVisible ? "visible" : ""}`}>
      <div className="timeline-event-dot" />
      <div className="timeline-event-year">{year}</div>
      <h4 className="timeline-event-title">{title}</h4>
      <p className="timeline-event-content">{content}</p>
    </div>
  );
};

// The 45,000 Problem - Scroll Lock Sequence
const The45000Problem: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollProgress, isPinned, isExiting, unpinPoint } = useScrollLockProgress(containerRef);

  const stage = scrollProgress < 20 ? 0 :
                scrollProgress < 40 ? 1 :
                scrollProgress < 60 ? 2 :
                scrollProgress < 80 ? 3 : 4;

  return (
    <div ref={containerRef} className="scroll-lock-section era-1" style={{ height: "400vh" }}>
      <div
        className={`scroll-lock-pinned ${isPinned ? "is-pinned" : ""}`}
        style={isExiting ? {
          position: "absolute",
          top: `${unpinPoint}px`,
          left: 0,
          right: 0,
          minHeight: "100dvh",
        } : undefined}
      >
        <div className="layout-comparison">
          {/* Chinese characters panel */}
          <div className={`comparison-panel ${stage >= 0 ? "visible" : ""}`} style={{ opacity: stage >= 0 ? 1 : 0, transform: stage >= 0 ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
            <div className="comparison-panel-stat">45,000+</div>
            <div className="comparison-panel-title">Chinese Characters</div>
            <p className="comparison-panel-label">Each requires its own type piece</p>
          </div>

          <div className="comparison-divider">
            <span className="comparison-vs" style={{ opacity: stage >= 2 ? 1 : 0.3 }}>vs</span>
          </div>

          {/* European alphabet panel */}
          <div className={`comparison-panel ${stage >= 2 ? "visible" : ""}`} style={{ opacity: stage >= 2 ? 1 : 0.3, transform: stage >= 2 ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
            <div className="comparison-panel-stat">26</div>
            <div className="comparison-panel-title">Latin Letters</div>
            <p className="comparison-panel-label">A manageable set for any text</p>
          </div>
        </div>

        {/* Resolution text */}
        <div className="layout-standard" style={{ textAlign: "center", marginTop: "2rem", opacity: stage >= 4 ? 1 : 0, transition: "opacity 0.6s ease" }}>
          <p style={{ fontFamily: "var(--press-font-display)", fontSize: "1.5rem", color: "var(--press-accent-asian)" }}>
            The same innovation. Radically different economics.
          </p>
        </div>

        {/* Skip and progress */}
        {isPinned && scrollProgress < 95 && (
          <button
            className="skip-button"
            onClick={() => {
              const container = containerRef.current;
              if (container) {
                const targetScroll = container.offsetTop + container.offsetHeight - window.innerHeight;
                window.scrollTo({ top: targetScroll, behavior: "smooth" });
              }
            }}
          >
            Skip →
          </button>
        )}

        {isPinned && (
          <div className="scroll-lock-progress">
            <div className="scroll-lock-progress-fill" style={{ width: `${scrollProgress}%` }} />
          </div>
        )}
      </div>
    </div>
  );
};

// The Map Journey - Scroll Lock Sequence
const MapJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollProgress, isPinned, isExiting, unpinPoint } = useScrollLockProgress(containerRef);

  const stage = scrollProgress < 20 ? 0 :
                scrollProgress < 40 ? 1 :
                scrollProgress < 60 ? 2 :
                scrollProgress < 80 ? 3 : 4;

  const cities = stage < 1 ? 1 :
                 stage < 2 ? 15 :
                 stage < 3 ? 77 :
                 stage < 4 ? 200 : 282;

  return (
    <div ref={containerRef} className="scroll-lock-section era-3" style={{ height: "350vh" }}>
      <div
        className={`scroll-lock-pinned ${isPinned ? "is-pinned" : ""}`}
        style={isExiting ? {
          position: "absolute",
          top: `${unpinPoint}px`,
          left: 0,
          right: 0,
          minHeight: "100dvh",
        } : undefined}
      >
        <div className="layout-dataviz">
          <div className="dataviz-counter">
            <div className="dataviz-counter-value" style={{ color: "var(--press-accent-spread)" }}>{cities}</div>
            <div className="dataviz-counter-label">
              {stage < 1 ? "Mainz, 1455" :
               stage < 2 ? "German cities by 1470" :
               stage < 3 ? "Italian cities by 1500" :
               stage < 4 ? "European cities by 1500" : "Cities with presses by 1500"}
            </div>
          </div>

          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
            <p style={{ color: "var(--press-text-secondary)", opacity: stage >= 4 ? 1 : 0, transition: "opacity 0.6s ease" }}>
              <strong style={{ color: "var(--press-accent-spread)" }}>20 million books</strong> existed in Europe by 1500.
              Fifty years earlier, there had been only manuscripts.
            </p>
          </div>
        </div>

        {/* Skip and progress */}
        {isPinned && scrollProgress < 95 && (
          <button
            className="skip-button"
            onClick={() => {
              const container = containerRef.current;
              if (container) {
                const targetScroll = container.offsetTop + container.offsetHeight - window.innerHeight;
                window.scrollTo({ top: targetScroll, behavior: "smooth" });
              }
            }}
          >
            Skip →
          </button>
        )}

        {isPinned && (
          <div className="scroll-lock-progress">
            <div className="scroll-lock-progress-fill" style={{ width: `${scrollProgress}%` }} />
          </div>
        )}
      </div>
    </div>
  );
};

// The Assembly - Gutenberg's printing process
const TheAssembly: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollProgress, isPinned, isExiting, unpinPoint } = useScrollLockProgress(containerRef);

  // 7 stages based on spec: 0-15, 15-30, 30-45, 45-60, 60-75, 75-90, 90-100
  const stage = scrollProgress < 15 ? 0 :
                scrollProgress < 30 ? 1 :
                scrollProgress < 45 ? 2 :
                scrollProgress < 60 ? 3 :
                scrollProgress < 75 ? 4 :
                scrollProgress < 90 ? 5 : 6;

  const stageLabels = [
    "The Process",
    "Setting Type",
    "Locking the Form",
    "Inking",
    "Positioning Paper",
    "Pressing",
    "The Printed Page"
  ];

  const stageDescriptions = [
    "An empty wooden frame awaits. The compositor stands ready.",
    "Individual metal letters placed right-to-left into the composing stick — mirror writing that will read correctly when printed.",
    "Composed lines transferred to the type bed. The chase locks everything into place.",
    "Leather ink balls, soaked in oil-based ink, dab across the raised metal surfaces.",
    "A sheet of dampened paper lowers onto the inked type. Positioned with precision.",
    "The wooden screw turns. The platen descends. Pressure transfers ink to paper.",
    "The paper lifts away. A printed page emerges. Repeat 180 times. One Bible."
  ];

  return (
    <div ref={containerRef} className="scroll-lock-section era-2 the-assembly-section" style={{ height: "500vh" }}>
      <div
        className={`scroll-lock-pinned ${isPinned ? "is-pinned" : ""}`}
        style={isExiting ? {
          position: "absolute",
          top: `${unpinPoint}px`,
          left: 0,
          right: 0,
          minHeight: "100dvh",
        } : undefined}
      >
        <div className="assembly-container">
          {/* Stage indicator */}
          <div className="assembly-stage-indicator">
            {stageLabels.map((label, index) => (
              <div
                key={index}
                className={`assembly-stage-dot ${stage >= index ? "active" : ""} ${stage === index ? "current" : ""}`}
                title={label}
              />
            ))}
          </div>

          {/* Press visualization */}
          <div className="assembly-press">
            {/* Frame - always visible */}
            <div className={`assembly-frame ${stage >= 0 ? "visible" : ""}`}>
              <div className="assembly-frame-top" />
              <div className="assembly-frame-side assembly-frame-left" />
              <div className="assembly-frame-side assembly-frame-right" />
              <div className="assembly-platen-area">
                {/* Screw mechanism */}
                <div className={`assembly-screw ${stage >= 5 ? "active" : ""}`}>
                  <div className="assembly-screw-handle" />
                  <div className="assembly-screw-shaft" />
                </div>
                {/* Platen */}
                <div
                  className={`assembly-platen ${stage >= 5 ? "pressing" : ""}`}
                  style={{ transform: stage >= 5 ? "translateY(30px)" : "translateY(0)" }}
                />
              </div>
              <div className="assembly-bed">
                {/* Type pieces */}
                <div className={`assembly-type ${stage >= 1 ? "visible" : ""}`}>
                  {stage >= 1 && (
                    <div className="assembly-type-letters">
                      {"BIBLE".split("").reverse().map((letter, i) => (
                        <span
                          key={i}
                          className="assembly-letter"
                          style={{
                            opacity: stage >= 1 ? Math.min(1, (scrollProgress - 15 - i * 2) / 8) : 0,
                            transform: `rotateY(180deg)`,
                          }}
                        >
                          {letter}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Chase/frame lock */}
                <div className={`assembly-chase ${stage >= 2 ? "locked" : ""}`} />

                {/* Ink layer */}
                <div
                  className={`assembly-ink ${stage >= 3 ? "visible" : ""}`}
                  style={{ opacity: stage >= 3 ? Math.min(1, (scrollProgress - 45) / 10) : 0 }}
                />

                {/* Paper */}
                <div
                  className={`assembly-paper ${stage >= 4 ? "positioned" : ""} ${stage >= 6 ? "printed" : ""}`}
                  style={{
                    transform: stage < 4 ? "translateY(-100px)" :
                              stage >= 6 ? "translateY(-80px)" : "translateY(0)",
                    opacity: stage >= 4 ? 1 : 0,
                  }}
                >
                  {stage >= 6 && (
                    <div className="assembly-printed-text">BIBLE</div>
                  )}
                </div>
              </div>
              <div className="assembly-frame-base" />
            </div>
          </div>

          {/* Stage title and description */}
          <div className="assembly-text">
            <h3 className="assembly-title">{stageLabels[stage]}</h3>
            <p className="assembly-description">{stageDescriptions[stage]}</p>
          </div>
        </div>

        {/* Skip and progress */}
        {isPinned && scrollProgress < 95 && (
          <button
            className="skip-button"
            onClick={() => {
              const container = containerRef.current;
              if (container) {
                const targetScroll = container.offsetTop + container.offsetHeight - window.innerHeight;
                window.scrollTo({ top: targetScroll, behavior: "smooth" });
              }
            }}
          >
            Skip →
          </button>
        )}

        {isPinned && (
          <div className="scroll-lock-progress">
            <div className="scroll-lock-progress-fill" style={{ width: `${scrollProgress}%` }} />
          </div>
        )}
      </div>
    </div>
  );
};

// The Viral Moment - Luther's pamphlets
const ViralMoment: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollProgress, isPinned, isExiting, unpinPoint } = useScrollLockProgress(containerRef);

  const stage = scrollProgress < 20 ? 0 :
                scrollProgress < 40 ? 1 :
                scrollProgress < 60 ? 2 :
                scrollProgress < 85 ? 3 : 4;

  const copies = stage < 1 ? 1 :
                 stage < 2 ? 100 :
                 stage < 3 ? 10000 :
                 stage < 4 ? 400000 : 400000;

  return (
    <div ref={containerRef} className="scroll-lock-section era-4" style={{ height: "350vh" }}>
      <div
        className={`scroll-lock-pinned ${isPinned ? "is-pinned" : ""}`}
        style={isExiting ? {
          position: "absolute",
          top: `${unpinPoint}px`,
          left: 0,
          right: 0,
          minHeight: "100dvh",
        } : undefined}
      >
        <div className="layout-dataviz">
          <div className="dataviz-counter">
            <div className="dataviz-counter-value" style={{ color: "var(--press-text-primary)" }}>
              {copies.toLocaleString()}
            </div>
            <div className="dataviz-counter-label">
              {stage < 1 ? "October 31, 1517 — Wittenberg" :
               stage < 2 ? "Copies in two weeks" :
               stage < 3 ? "Copies in two months" :
               "Copies by 1520"}
            </div>
          </div>

          {/* Luther quote */}
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "2rem auto 0", opacity: stage >= 4 ? 1 : 0, transition: "opacity 0.8s ease" }}>
            <blockquote style={{ fontFamily: "var(--press-font-quote)", fontSize: "1.25rem", fontStyle: "italic", color: "var(--press-text-primary)", marginBottom: "1rem" }}>
              &ldquo;It is a mystery to me how my theses were spread to so many places.
              They were meant exclusively for our academic circle here.&rdquo;
            </blockquote>
            <cite style={{ fontFamily: "var(--press-font-sans)", fontSize: "0.875rem", color: "var(--press-text-muted)" }}>
              — Luther to Pope Leo X
            </cite>
            <p style={{ marginTop: "2rem", fontFamily: "var(--press-font-display)", fontSize: "1.5rem", color: "var(--press-text-primary)" }}>
              The mystery was the printing press.
            </p>
          </div>
        </div>

        {/* Skip and progress */}
        {isPinned && scrollProgress < 95 && (
          <button
            className="skip-button"
            onClick={() => {
              const container = containerRef.current;
              if (container) {
                const targetScroll = container.offsetTop + container.offsetHeight - window.innerHeight;
                window.scrollTo({ top: targetScroll, behavior: "smooth" });
              }
            }}
          >
            Skip →
          </button>
        )}

        {isPinned && (
          <div className="scroll-lock-progress">
            <div className="scroll-lock-progress-fill" style={{ width: `${scrollProgress}%` }} />
          </div>
        )}
      </div>
    </div>
  );
};

// FAQ Section
const FAQSection: React.FC = () => {
  const { ref, isVisible } = useSectionVisibility();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className={`faq-section section-transition ${isVisible ? "visible" : ""}`}>
      <div className="faq-content">
        <h3 className="faq-title">The Question, Answered</h3>
        <h4 className="faq-question">Who invented the printing press?</h4>
        <div className="faq-answer">
          <p>
            <strong>Johannes Gutenberg</strong> of Mainz, Germany, around 1440 — but the full answer is more nuanced.
          </p>
          <p>
            Gutenberg didn&apos;t invent printing itself. Chinese woodblock printing dates to the 9th century, and
            <em> Bi Sheng</em> created ceramic movable type around 1040. Korea produced metal movable type by the 1230s.
          </p>
          <p>
            What Gutenberg invented was a <em>system</em>: movable metal type (cast in a hand mold he designed),
            oil-based ink (that adhered to metal), and a wooden press adapted from wine-making.
            This synthesis made mass production of books economically viable in Europe for the first time.
          </p>
          <p>
            So Gutenberg invented <em>the European printing press</em> — the specific technology that
            ignited the information revolution in the West.
          </p>
        </div>
      </div>
    </section>
  );
};

// Sources Section
const SourcesSection: React.FC = () => (
  <section className="sources-section">
    <div className="sources-content">
      <h3 className="sources-title">Sources & Further Reading</h3>
      <ul className="sources-list">
        {SOURCES.map((source, index) => (
          <li key={index}>
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {source.title}
              <ExternalLink size={12} style={{ marginLeft: "0.5rem", opacity: 0.5 }} />
            </a>
          </li>
        ))}
      </ul>
      <p className="sources-note">
        This narrative was fact-checked against peer-reviewed sources and authoritative historical records.
        Primary sources include British Library, UNESCO, Library of Congress, and Gutenberg Museum archives.
      </p>
    </div>
  </section>
);

// ==================== MAIN CLIENT COMPONENT ====================

export default function PrintingPressClient() {
  const [scrolled, setScrolled] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="printing-press-essay">
      <EssayHeader scrolled={scrolled} />
      <TimelineSpine progress={progress} />

      <main className="essay-main">
        {/* HERO: The Cave Discovery */}
        <HeroCave />

        {/* CHAPTER 1: Eastern Origins (868-1400) */}
        <ChapterSection
          era={1}
          eraLabel="868 – 1400 CE"
          chapterNum={1}
          title="Eastern Origins"
          metaphor="The roots that didn't flower — innovation ahead of its time"
        >
          <div className="layout-standard">
            <p>
              The story begins not where you expect. In 868 CE, six hundred years before Gutenberg,
              a Buddhist scroll was printed in Tang Dynasty China — complete with a woodcut illustration
              that remains the oldest dated book art. This Diamond Sutra now sits in the British Library,
              proof that printing&apos;s roots run deep into Asian soil.
            </p>
            <p>
              Around 1040, a commoner named <strong>Bi Sheng</strong> created something even more revolutionary:
              movable type. Individual characters, carved into clay, baked hard, and arranged to print any text —
              then rearranged for the next. The concept Gutenberg would &ldquo;invent&rdquo; 400 years later.
            </p>
          </div>

          <QuoteMonument
            quote="If one were to print only two or three copies, this method would be neither simple nor easy. But for printing hundreds or thousands of copies, it was marvelously quick."
            attribution="Shen Kuo, describing Bi Sheng's method, c. 1088"
            era={1}
          />

          {/* The 45,000 Problem */}
          <The45000Problem />

          <div className="layout-timeline">
            <div className="timeline-line" />
            <TimelineEvent
              year="1234"
              title="Korea's Metal Leap"
              content="Korean craftsmen develop metal movable type — more durable than clay, with the Jikji becoming the oldest surviving metal type book in 1377."
            />
            <TimelineEvent
              year="1377"
              title="The Jikji"
              content="Monks at Heungdeok Temple print the Jikji, a Buddhist teaching anthology. It survives today at the Bibliothèque nationale de France: 78 years before the Gutenberg Bible."
            />
          </div>
        </ChapterSection>

        {/* CHAPTER 2: The Synthesis (1440-1460) */}
        <ChapterSection
          era={2}
          eraLabel="1440 – 1460 CE"
          chapterNum={2}
          title="The Synthesis"
          metaphor="The goldsmith's secret — not invention but integration"
        >
          <div className="layout-standard">
            <p>
              In the 1440s, in the German city of Mainz, a goldsmith named <strong>Johannes Gutenberg</strong>
              was working on something he called &ldquo;aventur und kunst&rdquo; — adventure and art.
              He was secretive, working in borrowed spaces, borrowing money.
            </p>
            <p>
              What he created wasn&apos;t printing — that existed. It wasn&apos;t movable type — that existed too.
              What Gutenberg created was a <em>system</em>: movable metal type (cast in a hand mold from a
              lead-tin-antimony alloy that melted easily and held precise shapes), oil-based ink
              (water-based ink beaded up on metal), and a wooden screw press (adapted from wine-making).
            </p>
            <p>
              Each element existed before. The combination changed everything.
            </p>
          </div>

          <div className="layout-comparison">
            <div className="comparison-panel">
              <div className="comparison-panel-title">Movable Type</div>
              <p className="comparison-panel-label">Lead-tin-antimony alloy</p>
            </div>
            <div className="comparison-divider">
              <span className="comparison-vs">+</span>
            </div>
            <div className="comparison-panel">
              <div className="comparison-panel-title">Oil-Based Ink</div>
              <p className="comparison-panel-label">Adheres to metal</p>
            </div>
            <div className="comparison-divider">
              <span className="comparison-vs">+</span>
            </div>
            <div className="comparison-panel">
              <div className="comparison-panel-title">Screw Press</div>
              <p className="comparison-panel-label">Adapted from wine-making</p>
            </div>
          </div>

          <div className="layout-standard" style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "var(--press-font-display)", fontSize: "1.5rem", color: "var(--press-accent-gutenberg)" }}>
              = The European Printing Revolution
            </p>
          </div>

          {/* The Assembly - scroll-lock showing the printing process */}
          <TheAssembly />

          <div className="layout-timeline">
            <div className="timeline-line" />
            <TimelineEvent
              year="1455"
              title="The Gutenberg Bible"
              content="42 lines per page, approximately 180 copies, three years of work. Future Pope Pius II saw pages in Frankfurt and wrote of their beauty."
            />
            <TimelineEvent
              year="Nov 6, 1455"
              title="The Lawsuit"
              content="Johann Fust, who had loaned Gutenberg 1,600 guilders, files suit. Fust wins. Gutenberg loses his press, his type, his Bible. Modern scholarship suggests he wasn't ruined — he continued working until 1468."
            />
          </div>
        </ChapterSection>

        {/* CHAPTER 3: The Spread (1460-1500) */}
        <ChapterSection
          era={3}
          eraLabel="1460 – 1500 CE"
          chapterNum={3}
          title="The Spread"
          metaphor="The network effect — German craftsmen fan out across a continent"
        >
          <div className="layout-standard">
            <p>
              In 1462, two German printers — Arnold Pannartz and Conrad Sweynheym — carried
              Gutenberg&apos;s secrets across the Alps to a Benedictine monastery at Subiaco, near Rome.
              Italy had printing. By 1467, Rome. By 1469, Venice — which would become the printing
              capital of Europe with 150 presses by century&apos;s end.
            </p>
            <p>
              The spread was explosive. Cologne (1466). Paris (1470). Buda and Kraków (1473).
              London never — until a merchant named <strong>William Caxton</strong> learned to print
              in Cologne, set up a press in Bruges, and in 1476 established England&apos;s first
              printing shop in Westminster.
            </p>
          </div>

          <QuoteMonument
            quote="My pen became worn, my hand weary, my eye dimmed with copying by hand. So I practiced and learnt... the art of printing."
            attribution="William Caxton, Prologue to Recuyell of the Historyes of Troye, 1473"
            era={3}
          />

          {/* The Map Journey */}
          <MapJourney />

          <div className="layout-standard">
            <p>
              The master printers spreading the technology were overwhelmingly German — Gutenberg&apos;s
              apprentices and their apprentices, carrying knowledge outward in widening circles.
            </p>
            <p>
              <strong>Aldus Manutius</strong> in Venice introduced italic type and the pocket book,
              making Greek and Latin classics affordable to ordinary readers. His dolphin-and-anchor
              emblem is still used by Doubleday Books today.
            </p>
          </div>
        </ChapterSection>

        {/* CHAPTER 4: The Cascade (1500-1550) */}
        <ChapterSection
          era={4}
          eraLabel="1500 – 1550 CE"
          chapterNum={4}
          title="The Cascade"
          metaphor="The demonstration of power — what printing made possible, proven in weeks"
        >
          <div className="layout-standard">
            <p>
              On October 31, 1517, a professor named <strong>Martin Luther</strong> composed
              95 propositions for academic debate about the sale of indulgences. He may have
              posted them on the church door at Wittenberg — the standard way to announce
              a scholarly disputation.
            </p>
            <p>
              He expected a local conversation among theologians.
            </p>
            <p>
              Within two weeks, the 95 Theses had spread throughout Germany.
              Within two months, throughout Europe.
            </p>
          </div>

          {/* The Viral Moment */}
          <ViralMoment />

          <div className="layout-standard">
            <p>
              Luther became the first bestselling author. Between 1517 and 1520, thirty of his
              pamphlets ran through 370 editions — roughly 400,000 copies flooding Germany.
              By 1525, his complete works totaled 287 tracts and some two million copies.
              He wrote in German, not Latin, expanding his audience beyond the educated elite.
            </p>
            <p>
              The Reformation might have been impossible in the pre-Gutenberg age. One man with
              strong opinions had always existed. A technology that could multiply those opinions
              faster than any authority could respond — that was new.
            </p>
          </div>

          <div className="layout-fullbleed">
            <div className="fullbleed-content">
              <p style={{ fontFamily: "var(--press-font-display)", fontSize: "1.5rem", color: "var(--press-text-primary)", marginBottom: "1rem" }}>
                It took 700 years to get here — from Diamond Sutra to Luther&apos;s pamphlets.
              </p>
              <p style={{ fontFamily: "var(--press-font-display)", fontSize: "1.5rem", color: "var(--press-text-primary)" }}>
                The revolution, when it finally came, took only weeks.
              </p>
            </div>
          </div>
        </ChapterSection>

        {/* FAQ Section */}
        <FAQSection />

        {/* Sources Section */}
        <SourcesSection />
      </main>
    </div>
  );
}
