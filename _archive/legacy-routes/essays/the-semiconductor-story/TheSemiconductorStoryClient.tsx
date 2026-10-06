"use client";

import React, { useState, useEffect, useRef } from "react";
import "./the-semiconductor-story.css";

// ============================================================================
// TYPES
// ============================================================================

interface Figure {
  id: string;
  name: string;
  role: string;
  years: string;
  contributions: string[];
  quote?: string;
  quoteSource?: string;
  era: "foundation" | "genesis" | "revolution" | "modern";
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  era: "foundation" | "genesis" | "integration" | "prophecy" | "intel" | "foundry" | "modern";
}

interface Source {
  title: string;
  url: string;
  type: "primary" | "academic" | "museum" | "industry";
}

// ============================================================================
// DATA
// ============================================================================

const keyFigures: Figure[] = [
  {
    id: "bardeen",
    name: "John Bardeen",
    role: "The Quiet Genius",
    years: "1908-1991",
    contributions: [
      "Co-invented the transistor at Bell Labs (1947)",
      "Only person to win two Nobel Prizes in Physics (1956, 1972)",
      "Developed surface states theory enabling transistor operation",
    ],
    quote: "Science is a collaborative effort. The combined results of several people working together is often much more effective than could be that of an individual scientist working alone.",
    era: "foundation",
  },
  {
    id: "brattain",
    name: "Walter Brattain",
    role: "The Experimentalist",
    years: "1902-1987",
    contributions: [
      "Built the physical device that proved transistor theory",
      "Expert in surface physics and semiconductor materials",
      "Shared 1956 Nobel Prize in Physics",
    ],
    quote: "It is at a surface where many of our most interesting and useful phenomena occur.",
    era: "foundation",
  },
  {
    id: "shockley",
    name: "William Shockley",
    role: "The Brilliant Tyrant",
    years: "1910-1989",
    contributions: [
      "Led Bell Labs team that invented the transistor",
      "Invented the bipolar junction transistor (1948)",
      "Founded Shockley Semiconductor, spawning Silicon Valley",
    ],
    quote: "If you take a bale of hay and tie it to the tail of a mule and then strike a match and set the bale of hay on fire, and if you then compare the energy expended shortly thereafter by the mule with the energy expended by yourself in striking the match, you will understand the concept of amplification.",
    era: "foundation",
  },
  {
    id: "noyce",
    name: "Robert Noyce",
    role: "The Mayor of Silicon Valley",
    years: "1927-1990",
    contributions: [
      "Co-invented the integrated circuit (1959)",
      "Co-founded Fairchild Semiconductor and Intel",
      "Set Silicon Valley's collaborative, egalitarian culture",
    ],
    quote: "Knowledge is power. Knowledge shared is power multiplied.",
    era: "genesis",
  },
  {
    id: "moore",
    name: "Gordon Moore",
    role: "The Prophet",
    years: "1929-2023",
    contributions: [
      "Formulated Moore's Law (1965)",
      "Co-founded Intel with Robert Noyce",
      "Guided semiconductor industry for 50+ years",
    ],
    quote: "If the auto industry advanced as rapidly as the semiconductor industry, a Rolls Royce would get half a million miles per gallon, and it would be cheaper to throw it away than to park it.",
    era: "genesis",
  },
  {
    id: "kilby",
    name: "Jack Kilby",
    role: "The Inventor",
    years: "1923-2005",
    contributions: [
      "Invented the first integrated circuit at Texas Instruments (1958)",
      "Nobel Prize in Physics (2000)",
      "Co-invented the handheld calculator",
    ],
    quote: "While Robert and I followed our own paths, we worked hard together to achieve commercial acceptance for integrated circuits. If he were still living, I have no doubt we would have shared this prize.",
    quoteSource: "Nobel Prize Acceptance Speech, 2000",
    era: "genesis",
  },
  {
    id: "grove",
    name: "Andy Grove",
    role: "The Paranoid Survivor",
    years: "1936-2016",
    contributions: [
      "Third employee of Intel, CEO 1987-1998",
      "Led pivot from memory chips to microprocessors",
      "TIME Man of the Year (1997)",
    ],
    quote: "Success breeds complacency. Complacency breeds failure. Only the paranoid survive.",
    quoteSource: "Only the Paranoid Survive (1996)",
    era: "revolution",
  },
  {
    id: "chang",
    name: "Morris Chang",
    role: "The Foundry Father",
    years: "1931-present",
    contributions: [
      "Founded TSMC (1987) at age 56",
      "Created the pure-play foundry business model",
      "Transformed Taiwan into semiconductor superpower",
    ],
    quote: "Without strategy, execution is aimless. Without execution, strategy is useless.",
    era: "modern",
  },
];

const timelineEvents: TimelineEvent[] = [
  { year: "Dec 23, 1947", title: "The Transistor Demonstrated", description: "Bell Labs unveils the point-contact transistor to management", era: "foundation" },
  { year: "1956", title: "Nobel Prize Awarded", description: "Shockley, Bardeen, and Brattain share Physics Nobel", era: "foundation" },
  { year: "Sep 18, 1957", title: "The Traitorous Eight Defect", description: "Eight engineers leave Shockley to found Fairchild", era: "genesis" },
  { year: "Sep 12, 1958", title: "First Integrated Circuit", description: "Jack Kilby demonstrates IC at Texas Instruments", era: "integration" },
  { year: "1959", title: "Planar Process", description: "Noyce patents manufacturable integrated circuit", era: "integration" },
  { year: "Apr 19, 1965", title: "Moore's Law Published", description: "Gordon Moore predicts transistor doubling", era: "prophecy" },
  { year: "Jul 18, 1968", title: "Intel Founded", description: "Noyce and Moore start Intel Corporation", era: "intel" },
  { year: "Nov 15, 1971", title: "Intel 4004 Released", description: "First commercial microprocessor: 2,300 transistors", era: "intel" },
  { year: "1985", title: "Intel's Memory Exit", description: "Grove pivots Intel from memory to microprocessors", era: "intel" },
  { year: "Feb 21, 1987", title: "TSMC Founded", description: "Morris Chang creates the foundry model", era: "foundry" },
  { year: "2020", title: "Global Chip Shortage", description: "Pandemic exposes supply chain fragility", era: "modern" },
  { year: "Aug 9, 2022", title: "CHIPS Act Signed", description: "US commits $52B to domestic semiconductor manufacturing", era: "modern" },
];

const sources: Source[] = [
  { title: "Nobel Prize: Transistor Invention (1956)", url: "https://www.nobelprize.org/prizes/physics/1956/summary/", type: "primary" },
  { title: "Computer History Museum: Silicon Engine", url: "https://www.computerhistory.org/siliconengine/", type: "museum" },
  { title: "IEEE: Fairchild Semiconductor Founding", url: "https://ethw.org/Fairchild_Semiconductor", type: "academic" },
  { title: "Intel Museum: Company History", url: "https://www.intel.com/content/www/us/en/history.html", type: "museum" },
  { title: "Gordon Moore: Original 1965 Paper", url: "https://newsroom.intel.com/wp-content/uploads/sites/11/2018/05/moores-law-electronics.pdf", type: "primary" },
  { title: "Nobel Prize: Jack Kilby (2000)", url: "https://www.nobelprize.org/prizes/physics/2000/kilby/facts/", type: "primary" },
  { title: "Stanford Silicon Genesis: Morris Chang Oral History", url: "https://exhibits.stanford.edu/silicongenesis", type: "academic" },
  { title: "ASML: EUV Technology", url: "https://www.asml.com/en/technology/lithography-principles/euv-lithography", type: "industry" },
  { title: "SIA: Semiconductor Industry Data", url: "https://www.semiconductors.org/resources/", type: "industry" },
  { title: "Smithsonian: Jack Kilby's First IC", url: "https://americanhistory.si.edu/collections", type: "museum" },
];

// Moore's Law data points
const mooresLawData = [
  { year: 1971, chip: "Intel 4004", transistors: 2300 },
  { year: 1974, chip: "Intel 8080", transistors: 4500 },
  { year: 1978, chip: "Intel 8086", transistors: 29000 },
  { year: 1982, chip: "Intel 286", transistors: 134000 },
  { year: 1985, chip: "Intel 386", transistors: 275000 },
  { year: 1989, chip: "Intel 486", transistors: 1200000 },
  { year: 1993, chip: "Pentium", transistors: 3100000 },
  { year: 1999, chip: "Pentium III", transistors: 9500000 },
  { year: 2004, chip: "Pentium 4", transistors: 125000000 },
  { year: 2010, chip: "Core i7", transistors: 1170000000 },
  { year: 2017, chip: "EPYC", transistors: 19200000000 },
  { year: 2022, chip: "Apple M1 Ultra", transistors: 114000000000 },
  { year: 2024, chip: "Apple M3 Ultra", transistors: 184000000000 },
];

// ============================================================================
// SCROLL-LOCK HOOK
// ============================================================================

interface ScrollLockState {
  containerRef: React.RefObject<HTMLDivElement>;
  progress: number;
  isPinned: boolean;
  isComplete: boolean;
}

const useScrollLock = (sectionHeight: number = 2.5): ScrollLockState => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
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
        setIsComplete(false);
        const newProgress = Math.min(Math.max(scrolledIntoSection / scrollableDistance, 0), 1);
        setProgress(newProgress);
      } else if (sectionTop > 0) {
        setIsPinned(false);
        setIsComplete(false);
        setProgress(0);
      } else {
        setIsPinned(false);
        setIsComplete(true);
        setProgress(1);
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

  return { containerRef, progress, isPinned, isComplete };
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const formatTransistorCount = (count: number): string => {
  if (count >= 1e12) return `${(count / 1e12).toFixed(1)}T`;
  if (count >= 1e9) return `${(count / 1e9).toFixed(1)}B`;
  if (count >= 1e6) return `${(count / 1e6).toFixed(1)}M`;
  if (count >= 1e3) return `${(count / 1e3).toFixed(1)}K`;
  return count.toLocaleString();
};

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Silicon Wafer Progress Bar
 * Die blocks fill as chapters complete
 */
const WaferProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = Math.min((window.scrollY / scrollHeight) * 100, 100);
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const chapters = [
    { id: 1, name: "The Transistor", position: 10 },
    { id: 2, name: "The Traitorous Eight", position: 22 },
    { id: 3, name: "Two Paths", position: 34 },
    { id: 4, name: "The Prophecy", position: 46 },
    { id: 5, name: "Only the Paranoid", position: 54 },
    { id: 6, name: "Everybody's Foundry", position: 64 },
    { id: 7, name: "The Impossible Machine", position: 74 },
    { id: 8, name: "The New Oil", position: 84 },
    { id: 9, name: "What Happens Next", position: 94 },
  ];

  return (
    <div className="wafer-progress" aria-hidden="true">
      <div className="wafer-track">
        <div className="wafer-fill" style={{ height: `${progress}%` }} />
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className={`die-block ${progress >= chapter.position ? "processed" : ""}`}
            style={{ top: `${chapter.position}%` }}
            title={chapter.name}
          >
            <span className="die-number">{chapter.id}</span>
          </div>
        ))}
        <div className="processing-indicator" style={{ top: `${progress}%` }} />
      </div>
    </div>
  );
};

/**
 * Section with Intersection Observer
 */
const Section: React.FC<{
  id: string;
  className?: string;
  children: React.ReactNode;
  era?: "foundation" | "genesis" | "revolution" | "modern";
}> = ({ id, className = "", children, era }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`semi-section ${className} ${isVisible ? "visible" : ""} ${era ? `era-${era}` : ""}`}
    >
      {children}
    </section>
  );
};

/**
 * Quote Monument
 */
const QuoteMonument: React.FC<{
  quote: string;
  speaker: string;
  source?: string;
  year?: string;
}> = ({ quote, speaker, source, year }) => {
  return (
    <blockquote className="quote-monument">
      <p className="quote-text">&ldquo;{quote}&rdquo;</p>
      <footer className="quote-footer">
        <cite className="quote-speaker">{speaker}</cite>
        {source && (
          <span className="quote-source">
            {source}
            {year && `, ${year}`}
          </span>
        )}
      </footer>
    </blockquote>
  );
};

/**
 * Figure Profile Card
 */
const FigureCard: React.FC<{ figure: Figure }> = ({ figure }) => {
  return (
    <article className={`figure-card figure-${figure.era}`}>
      <div className="figure-header">
        <h4 className="figure-name">{figure.name}</h4>
        <p className="figure-role">{figure.role}</p>
        <p className="figure-years">{figure.years}</p>
      </div>
      <ul className="figure-contributions">
        {figure.contributions.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
      {figure.quote && (
        <blockquote className="figure-quote">
          <p>&ldquo;{figure.quote}&rdquo;</p>
          {figure.quoteSource && <cite>{figure.quoteSource}</cite>}
        </blockquote>
      )}
    </article>
  );
};

/**
 * Moore's Law Visualization
 */
const MooresLawViz: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const vizRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!vizRef.current) return;
      const rect = vizRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height + 200)));
      setActiveIndex(Math.floor(progress * mooresLawData.length));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={vizRef} className="moores-law-viz">
      <h3 className="viz-title">Moore&apos;s Law in Action</h3>
      <p className="viz-subtitle">Transistor counts over 50+ years</p>
      <div className="viz-timeline">
        {mooresLawData.map((point, i) => (
          <div key={point.year} className={`viz-point ${i <= activeIndex ? "active" : ""}`}>
            <div className="point-marker">
              <span className="point-year">{point.year}</span>
            </div>
            <div className="point-content">
              <span className="point-chip">{point.chip}</span>
              <span className="point-count">{formatTransistorCount(point.transistors)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Hero Scroll-Lock Sequence
 */
const HeroScrollLock: React.FC = () => {
  const { containerRef, progress, isPinned, isComplete } = useScrollLock(3);

  const getStage = () => {
    if (progress < 0.15) return 0; // Darkness with electron
    if (progress < 0.30) return 1; // Electron flow
    if (progress < 0.50) return 2; // Chip die reveal
    if (progress < 0.70) return 3; // Device montage
    if (progress < 0.85) return 4; // Taiwan focus
    return 5; // Title card
  };

  const stage = getStage();
  const showTitle = progress > 0.80;
  const showScrollHint = progress < 0.08;

  return (
    <section
      ref={containerRef}
      className="hero-scroll-lock-container"
      style={{ height: "300vh" }}
    >
      <div className={`hero-pinned ${isPinned ? "is-pinned" : ""} ${isComplete ? "is-complete" : ""}`}>
        {/* Circuit trace background */}
        <div
          className="circuit-bg"
          style={{ opacity: stage >= 1 ? Math.min(0.6, progress * 2) : 0 }}
        />

        {/* Stage 0-1: Electron and flow */}
        <div
          className="electron-container"
          style={{
            opacity: stage < 3 ? 1 : Math.max(0, 1 - (progress - 0.45) * 5),
          }}
        >
          <div className={`electron-core ${stage >= 1 ? "multiplied" : ""}`} />
          {stage >= 1 && (
            <div className="electron-text">
              Everything runs on something most people have never seen.
            </div>
          )}
        </div>

        {/* Stage 2: Chip die */}
        <div
          className="chip-die-reveal"
          style={{
            opacity: stage >= 2 && stage < 4 ? Math.min(1, (progress - 0.28) * 5) : 0,
            transform: `scale(${stage >= 2 ? 1 : 0.9})`,
          }}
        >
          <div className="chip-die-visual">
            <div className="die-grid">
              {[...Array(64)].map((_, i) => (
                <div key={i} className="die-cell" style={{ animationDelay: `${i * 20}ms` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Stage 3-4: Device montage and Taiwan */}
        <div
          className="montage-container"
          style={{
            opacity: stage >= 3 && stage < 5 ? 1 : 0,
          }}
        >
          {stage === 3 && (
            <div className="device-montage">
              <span className="device-item">Your phone</span>
              <span className="device-item">Your car</span>
              <span className="device-item">Your pacemaker</span>
              <span className="device-item">Everything</span>
            </div>
          )}
          {stage === 4 && (
            <div className="taiwan-focus">
              <div className="stat-highlight">90%</div>
              <div className="stat-label">of advanced chips come from one island</div>
            </div>
          )}
        </div>

        {/* Stage 5: Title card */}
        <div
          className="hero-title-card"
          style={{
            opacity: showTitle ? 1 : 0,
            transform: showTitle ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <h1 className="hero-main-title">The Semiconductor Story</h1>
          <p className="hero-main-subtitle">
            How Eight Rebellious Scientists Built the Foundation of Modern Civilization
          </p>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint" style={{ opacity: showScrollHint ? 1 : 0 }}>
          <span>Scroll to explore</span>
          <div className="scroll-arrow-animated" />
        </div>

        {/* Skip button */}
        {isPinned && progress > 0.1 && (
          <button
            className="skip-button"
            onClick={() => {
              const container = containerRef.current;
              if (container) {
                const rect = container.getBoundingClientRect();
                window.scrollTo({ top: window.scrollY + rect.height - window.innerHeight + 100, behavior: "smooth" });
              }
            }}
          >
            Skip &rarr;
          </button>
        )}

        {/* Progress indicator */}
        <div className="scroll-lock-progress" style={{ opacity: isPinned ? 1 : 0 }}>
          <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </section>
  );
};

/**
 * Transistor Explanation Scroll-Lock
 */
const TransistorScrollLock: React.FC = () => {
  const { containerRef, progress, isPinned, isComplete } = useScrollLock(2.5);

  const getStage = () => {
    if (progress < 0.25) return 1;
    if (progress < 0.50) return 2;
    if (progress < 0.75) return 3;
    return 4;
  };

  const stage = getStage();

  return (
    <div
      ref={containerRef}
      className="transistor-scroll-lock-container"
      style={{ height: "250vh" }}
    >
      <div className={`transistor-pinned ${isPinned ? "is-pinned" : ""} ${isComplete ? "is-complete" : ""}`}>
        <h3 className="sequence-title">How a Transistor Works</h3>

        <div className="transistor-diagram">
          {/* Base structure */}
          <div className="transistor-base">
            <div className={`component source ${stage >= 1 ? "active" : ""}`}>
              <span className="component-label">Source</span>
            </div>
            <div className={`component gate ${stage >= 2 ? "active" : ""}`}>
              <span className="component-label">Gate</span>
            </div>
            <div className={`component drain ${stage >= 3 ? "active" : ""}`}>
              <span className="component-label">Drain</span>
            </div>
          </div>

          {/* Electron flow */}
          <div className={`electron-flow ${stage >= 4 ? "flowing" : ""}`}>
            <div className="flow-particles">
              {[...Array(8)].map((_, i) => (
                <span key={i} className="flow-particle" style={{ animationDelay: `${i * 100}ms` }} />
              ))}
            </div>
          </div>

          {/* Stage explanations */}
          <div className="stage-explanation">
            {stage === 1 && <p>The <strong>Source</strong> contains electrons waiting to flow.</p>}
            {stage === 2 && <p>The <strong>Gate</strong> controls whether current can pass&mdash;a voltage switches it on or off.</p>}
            {stage === 3 && <p>The <strong>Drain</strong> receives the electrons when the gate opens.</p>}
            {stage === 4 && <p>When voltage is applied to the gate, electrons flow from source to drain&mdash;<strong>amplification and switching</strong> in one tiny device.</p>}
          </div>
        </div>

        <div className="scroll-lock-progress" style={{ opacity: isPinned ? 1 : 0 }}>
          <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </div>
  );
};

/**
 * Timeline Section
 */
const TimelineSection: React.FC = () => {
  return (
    <div className="timeline-section">
      <h3 className="timeline-title">Key Moments in Semiconductor History</h3>
      <div className="timeline-events">
        {timelineEvents.map((event, i) => (
          <div key={i} className={`timeline-event era-${event.era}`}>
            <div className="timeline-year">{event.year}</div>
            <div className="timeline-content">
              <h4 className="timeline-event-title">{event.title}</h4>
              <p className="timeline-description">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Sources Section
 */
const SourcesSection: React.FC = () => {
  return (
    <section className="sources-section">
      <div className="sources-content">
        <h3 className="sources-title">Sources &amp; Further Reading</h3>
        <ul className="sources-list">
          {sources.map((source, i) => (
            <li key={i} className={`source-item source-${source.type}`}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.title}
              </a>
            </li>
          ))}
        </ul>
        <p className="sources-note">
          This visual essay was researched using primary sources, academic scholarship, museum collections, and industry documentation.
          All quotes are verified against documented sources.
        </p>
      </div>
    </section>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const TheSemiconductorStoryClient: React.FC = () => {
  return (
    <article className="the-semiconductor-story">
      <WaferProgress />

      {/* Hero Scroll-Lock Section */}
      <HeroScrollLock />

      {/* Chapter 1: The Transistor */}
      <Section id="chapter-1" className="chapter chapter-transistor" era="foundation">
        <div className="chapter-header">
          <span className="chapter-number">Chapter One</span>
          <h2 className="chapter-title">The Transistor</h2>
          <p className="chapter-marker">December 1947 &mdash; Bell Labs, Murray Hill, New Jersey</p>
        </div>

        <div className="chapter-content">
          <p className="chapter-lead">
            In a basement laboratory at Bell Labs, two physicists named John Bardeen and Walter Brattain
            pressed gold contacts into a piece of germanium and changed the world.
          </p>

          <p>
            It was December 16, 1947. The device they created&mdash;christened the &ldquo;transistor&rdquo; by a
            colleague&mdash;could do what only vacuum tubes had done before: amplify an electrical signal. But it
            was smaller, more reliable, and didn&apos;t burn out.
          </p>

          <p>
            Their team leader, William Shockley, had conceived the theoretical approach but had been absent for
            the crucial breakthrough. He would spend the next decade taking credit, earning a Nobel Prize alongside
            them, and planting the seeds of his own downfall.
          </p>

          <QuoteMonument
            quote="A magnificent Christmas present."
            speaker="William Shockley"
            source="Describing the December 23rd demonstration to management"
            year="1947"
          />

          <p>
            The transistor didn&apos;t immediately replace vacuum tubes. But the scientists at Bell Labs understood
            its potential. This was the first step toward the end of mechanical computing and the birth of the digital age.
          </p>
        </div>
      </Section>

      {/* Transistor Explanation Scroll-Lock */}
      <TransistorScrollLock />

      <Section id="chapter-1-continued" className="chapter chapter-transistor-continued" era="foundation">
        <div className="chapter-content">
          <div className="figures-grid">
            <FigureCard figure={keyFigures.find(f => f.id === "bardeen")!} />
            <FigureCard figure={keyFigures.find(f => f.id === "brattain")!} />
            <FigureCard figure={keyFigures.find(f => f.id === "shockley")!} />
          </div>
        </div>
      </Section>

      {/* Chapter 2: The Traitorous Eight */}
      <Section id="chapter-2" className="chapter chapter-traitorous" era="genesis">
        <div className="chapter-header">
          <span className="chapter-number">Chapter Two</span>
          <h2 className="chapter-title">The Traitorous Eight</h2>
          <p className="chapter-marker">September 1957 &mdash; Mountain View, California</p>
        </div>

        <div className="chapter-content">
          <p className="chapter-lead">
            William Shockley was a genius, a Nobel laureate, and an impossible boss. He demanded loyalty
            tests, suspected sabotage, and treated his employees with contempt.
          </p>

          <p>
            In 1956, he had recruited the brightest young minds in semiconductors to his new laboratory in
            Mountain View. By 1957, eight of them had had enough.
          </p>

          <p>
            On September 18, 1957, Robert Noyce, Gordon Moore, and six colleagues resigned and signed a
            contract with Sherman Fairchild to start their own company. Shockley called them the &ldquo;traitorous
            eight.&rdquo; The name stuck&mdash;and became a badge of honor.
          </p>

          <div className="callout-box">
            <p>
              <strong>The Traitorous Eight:</strong> Julius Blank, Victor Grinich, Jean Hoerni, Eugene Kleiner,
              Jay Last, Gordon Moore, Robert Noyce, Sheldon Roberts
            </p>
          </div>

          <p>
            Fairchild Semiconductor would become the seedbed of Silicon Valley. The eight founders and their
            employees would go on to create Intel, AMD, National Semiconductor, and dozens more companies. The
            pattern of employees leaving to start competitors became the Valley&apos;s defining feature&mdash;and
            its engine of innovation.
          </p>

          <div className="figures-grid">
            <FigureCard figure={keyFigures.find(f => f.id === "noyce")!} />
            <FigureCard figure={keyFigures.find(f => f.id === "moore")!} />
          </div>
        </div>
      </Section>

      {/* Chapter 3: Two Paths to Integration */}
      <Section id="chapter-3" className="chapter chapter-integration" era="genesis">
        <div className="chapter-header">
          <span className="chapter-number">Chapter Three</span>
          <h2 className="chapter-title">Two Paths to Integration</h2>
          <p className="chapter-marker">1958&ndash;1959 &mdash; Texas and California</p>
        </div>

        <div className="chapter-content">
          <p className="chapter-lead">
            In the summer of 1958, a new Texas Instruments employee named Jack Kilby had a problem: he had
            no vacation time accumulated while the rest of the company emptied for summer break.
          </p>

          <p>
            Alone in the lab, he had time to think. What if you could build an entire circuit&mdash;transistors,
            resistors, capacitors&mdash;on a single piece of semiconductor?
          </p>

          <p>
            On September 12, 1958, Kilby demonstrated a working integrated circuit to TI management. It was
            crude&mdash;connected by fine gold &ldquo;flying wires&rdquo;&mdash;but it worked.
          </p>

          <p>
            Six months later and 1,500 miles away, Robert Noyce had the same idea but a better solution. Using
            the planar process developed by his colleague Jean Hoerni, Noyce conceived of printing the connections
            directly onto the chip. No flying wires. Manufacturable at scale.
          </p>

          <QuoteMonument
            quote="While Robert and I followed our own paths, we worked hard together to achieve commercial acceptance for integrated circuits. If he were still living, I have no doubt we would have shared this prize."
            speaker="Jack Kilby"
            source="Nobel Prize Acceptance Speech"
            year="2000"
          />

          <FigureCard figure={keyFigures.find(f => f.id === "kilby")!} />
        </div>
      </Section>

      {/* Chapter 4: The Prophecy */}
      <Section id="chapter-4" className="chapter chapter-prophecy" era="genesis">
        <div className="chapter-header">
          <span className="chapter-number">Chapter Four</span>
          <h2 className="chapter-title">The Prophecy</h2>
          <p className="chapter-marker">April 19, 1965</p>
        </div>

        <div className="chapter-content">
          <p className="chapter-lead">
            In April 1965, <em>Electronics</em> magazine asked Gordon Moore to predict the future of integrated
            circuits. Moore, then director of R&amp;D at Fairchild, looked at five data points&mdash;five years
            of transistor counts&mdash;and drew a line.
          </p>

          <QuoteMonument
            quote="The complexity for minimum component costs has increased at a rate of roughly a factor of two per year. By 1975, economics may dictate squeezing as many as 65,000 components on a single silicon chip."
            speaker="Gordon Moore"
            source="Electronics Magazine"
            year="1965"
          />

          <p>
            It was a wild extrapolation. Moore knew it. But the prediction took on a life of its own. Caltech
            professor Carver Mead dubbed it &ldquo;Moore&apos;s Law,&rdquo; and the semiconductor industry adopted
            it not as an observation but as a roadmap.
          </p>

          <div className="callout-box callout-insight">
            <p>
              Moore&apos;s Law wasn&apos;t a law of physics. It was a <strong>coordination mechanism</strong>&mdash;a
              shared expectation that synchronized R&amp;D investments across competing companies. For fifty years,
              the industry collectively agreed to make Moore&apos;s prediction come true.
            </p>
          </div>
        </div>
      </Section>

      {/* Moore's Law Visualization */}
      <MooresLawViz />

      {/* Chapter 5: Only the Paranoid Survive */}
      <Section id="chapter-5" className="chapter chapter-paranoid" era="revolution">
        <div className="chapter-header">
          <span className="chapter-number">Chapter Five</span>
          <h2 className="chapter-title">Only the Paranoid Survive</h2>
          <p className="chapter-marker">1968&ndash;1998 &mdash; Intel</p>
        </div>

        <div className="chapter-content">
          <p className="chapter-lead">
            Intel was founded in 1968 to make memory chips. For years, that&apos;s what it did&mdash;and did well.
            But by the mid-1980s, Japanese manufacturers were eating Intel&apos;s lunch.
          </p>

          <p>
            Andy Grove, Intel&apos;s third employee and eventual CEO, faced a choice: keep fighting a losing battle
            or abandon the company&apos;s core business. He chose to abandon.
          </p>

          <QuoteMonument
            quote="If we got kicked out and the board brought in a new CEO, what would he do? He would get us out of memories."
            speaker="Andy Grove"
            source="To Gordon Moore during the memory crisis"
            year="1985"
          />

          <p>
            Intel pivoted from memory chips to microprocessors&mdash;the CPUs that power personal computers. The
            386, the 486, the Pentium. The &ldquo;Intel Inside&rdquo; campaign. The company that almost died in
            the memory wars became the most valuable semiconductor company in the world.
          </p>

          <FigureCard figure={keyFigures.find(f => f.id === "grove")!} />
        </div>
      </Section>

      {/* Chapter 6: Everybody's Foundry */}
      <Section id="chapter-6" className="chapter chapter-foundry" era="modern">
        <div className="chapter-header">
          <span className="chapter-number">Chapter Six</span>
          <h2 className="chapter-title">Everybody&apos;s Foundry</h2>
          <p className="chapter-marker">February 21, 1987 &mdash; Hsinchu, Taiwan</p>
        </div>

        <div className="chapter-content">
          <p className="chapter-lead">
            Morris Chang spent 25 years at Texas Instruments, rising to Group Vice President. He knew semiconductors.
            He also knew something the industry hadn&apos;t figured out: not every company needs to own a fabrication
            facility.
          </p>

          <p>
            In 1987, with backing from the Taiwanese government and technology from Philips, Chang founded
            TSMC&mdash;Taiwan Semiconductor Manufacturing Company. The pitch was simple: &ldquo;We are everybody&apos;s
            foundry.&rdquo;
          </p>

          <p>
            The industry thought he was crazy. Intel and Texas Instruments both declined to partner. Why would
            anyone separate design from manufacturing?
          </p>

          <QuoteMonument
            quote="Without strategy, execution is aimless. Without execution, strategy is useless."
            speaker="Morris Chang"
            source="TSMC Leadership Philosophy"
          />

          <p>
            The answer came from startups. Companies like NVIDIA and Qualcomm could now design cutting-edge chips
            without building billion-dollar fabs. The &ldquo;fabless&rdquo; semiconductor industry was born. And
            TSMC became its enabler.
          </p>

          <div className="stat-block">
            <div className="stat-item">
              <span className="stat-number">60%+</span>
              <span className="stat-label">Global foundry market share</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">90%</span>
              <span className="stat-label">Advanced chip production</span>
            </div>
          </div>

          <FigureCard figure={keyFigures.find(f => f.id === "chang")!} />
        </div>
      </Section>

      {/* Chapter 7: The Impossible Machine */}
      <Section id="chapter-7" className="chapter chapter-euv" era="modern">
        <div className="chapter-header">
          <span className="chapter-number">Chapter Seven</span>
          <h2 className="chapter-title">The Impossible Machine</h2>
          <p className="chapter-marker">1990&ndash;2024 &mdash; Netherlands to the World</p>
        </div>

        <div className="chapter-content">
          <p className="chapter-lead">
            To print features smaller than the wavelength of visible light, you need light that doesn&apos;t exist
            in nature&mdash;at least not usefully.
          </p>

          <p>
            Extreme Ultraviolet (EUV) lithography uses light with a wavelength of 13.5 nanometers, generated by
            a process that sounds like science fiction.
          </p>

          <div className="callout-box callout-technical">
            <p>
              A laser pulse hits a tiny droplet of molten tin traveling at 70 meters per second. The tin vaporizes
              into plasma, emitting EUV light. That light bounces off mirrors so precise that if scaled to the size
              of Germany, the largest imperfection would be one millimeter tall.
            </p>
          </div>

          <p>
            ASML, a Dutch company, is the only manufacturer of EUV machines in the world. Each machine costs
            $150&ndash;200 million. The newest High NA EUV machines cost $350 million. They contain 100,000 parts
            from 5,000 suppliers across dozens of countries.
          </p>

          <p>
            The EUV machine is arguably the most complex device ever built. It took 30 years and tens of billions
            of dollars to develop. And it&apos;s the only reason your phone can have a chip with 16 billion transistors.
          </p>
        </div>
      </Section>

      {/* Chapter 8: The New Oil */}
      <Section id="chapter-8" className="chapter chapter-geopolitics" era="modern">
        <div className="chapter-header">
          <span className="chapter-number">Chapter Eight</span>
          <h2 className="chapter-title">The New Oil</h2>
          <p className="chapter-marker">2020&ndash;Present &mdash; Global</p>
        </div>

        <div className="chapter-content">
          <p className="chapter-lead">
            In 2020, the world discovered what semiconductor engineers had known for decades: everything depends
            on chips, and chips depend on a fragile supply chain concentrated in a geopolitically unstable region.
          </p>

          <p>
            The pandemic disrupted manufacturing. Cars sat unfinished in lots, waiting for chips. Medical equipment
            was delayed. A shortage of $1 chips shut down production of $40,000 vehicles.
          </p>

          <p>
            The U.S. government woke up. In August 2022, President Biden signed the CHIPS and Science Act,
            committing $52 billion to rebuild domestic semiconductor manufacturing.
          </p>

          <div className="callout-box callout-warning">
            <p>
              Taiwan&mdash;home to TSMC and 90% of advanced chip production&mdash;sits 100 miles from China,
              which claims the island as its own. A conflict there wouldn&apos;t just be a regional tragedy.
              It would be a global technological catastrophe.
            </p>
          </div>

          <p>
            Chips have become the new oil: a strategic resource that determines economic and military power.
            The countries that control chip manufacturing control the future.
          </p>
        </div>
      </Section>

      {/* Chapter 9: What Happens Next */}
      <Section id="chapter-9" className="chapter chapter-future" era="modern">
        <div className="chapter-header">
          <span className="chapter-number">Chapter Nine</span>
          <h2 className="chapter-title">What Happens Next</h2>
          <p className="chapter-marker">The Present and the Future</p>
        </div>

        <div className="chapter-content">
          <p className="chapter-lead">
            Moore&apos;s Law is slowing but not dead. We&apos;ve reached 3 nanometers&mdash;atoms are about 0.1
            nanometers. We&apos;re approaching fundamental physical limits.
          </p>

          <p>
            But the demand for computing has never been higher. AI requires exponentially more processing power.
            Large language models needed thousands of advanced chips to train. The next generation will need more.
          </p>

          <p>
            The race isn&apos;t just technological anymore. It&apos;s geopolitical. The United States, China,
            Taiwan, Korea, Japan, and Europe are all investing billions to secure chip manufacturing capability.
          </p>

          <div className="closing-reflection">
            <h3>The Invisible Foundation</h3>
            <p>
              No one knows what happens next. Will Moore&apos;s Law find new life in new materials, new
              architectures, new physics? Will the supply chain diversify or concentrate further? Will the
              Taiwan Strait remain peaceful?
            </p>
            <p>
              What we do know: the invisible technology that powers modern civilization is no longer invisible.
              The semiconductor story is now everyone&apos;s story.
            </p>
          </div>

          <TimelineSection />
        </div>
      </Section>

      {/* Sources */}
      <SourcesSection />
    </article>
  );
};

export default TheSemiconductorStoryClient;
