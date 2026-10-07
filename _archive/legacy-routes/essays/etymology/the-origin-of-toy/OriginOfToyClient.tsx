"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, ChevronDown, ExternalLink } from "lucide-react";
import "./the-origin-of-toy.css";
import {
  chapter1Images,
  chapter2Images,
  chapter3Images,
  chapter4Images,
  chapter5Images,
  chapter6Images,
  chapter7Images,
  type ToyImage,
} from "./images";

// ==================== SCROLL-LOCK HOOK ====================
//
// MOBILE BEHAVIOR (December 2025):
// Scroll-lock is DISABLED on mobile devices (width < 768px).
//
// Why:
// - Touch scrolling on mobile doesn't work well with scroll hijacking
// - The wheel event handler intercepts scroll, but mobile uses touch events
// - Locking body overflow on mobile creates a frustrating UX where users
//   cannot scroll at all (no wheel events to progress the animation)
// - Mobile users expect native scroll behavior; hijacking breaks muscle memory
//
// On mobile, the hero section simply scrolls normally with the page.
// The visual animations still occur based on scroll position (via Intersection
// Observer in the component), but without the viewport lock.
//
// See: /Fixes/mobile-scroll-lock-disabled.md for full documentation
// ============================================================

interface ScrollLockState {
  isLocked: boolean;
  progress: number; // 0-100
  stage: number;    // For multi-stage animations
}

/**
 * Hook to detect if the current device is mobile.
 * Uses both viewport width and touch capability for robust detection.
 * Re-evaluates on resize to handle orientation changes.
 */
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Check viewport width (768px is standard tablet/mobile breakpoint)
      const isNarrowViewport = window.innerWidth < 768;
      // Also check for touch capability as a secondary signal
      const hasTouchCapability = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      // Consider mobile if narrow viewport (primary) or touch-only device
      setIsMobile(isNarrowViewport || (hasTouchCapability && window.innerWidth < 1024));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const useScrollLock = (
  ref: React.RefObject<HTMLElement>,
  lockHeight: number = 400, // vh units of scroll to complete
  stages: number = 5
): ScrollLockState => {
  const [state, setState] = useState<ScrollLockState>({
    isLocked: false,
    progress: 0,
    stage: 0,
  });
  const scrollStartRef = useRef(0);
  const isActiveRef = useRef(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // MOBILE: Skip scroll-lock entirely
    // On mobile, we don't hijack scroll. The hero section scrolls naturally.
    // Animations are driven by scroll position via CSS/intersection observer
    // rather than by locking the viewport and intercepting wheel events.
    if (isMobile) {
      // Return early - no scroll lock listeners on mobile
      return;
    }

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollLockDistance = (lockHeight / 100) * viewportHeight;

      // Check if we should activate the lock
      if (rect.top <= 0 && rect.bottom > viewportHeight * 0.5) {
        if (!isActiveRef.current) {
          isActiveRef.current = true;
          scrollStartRef.current = window.scrollY;
          document.body.style.overflow = "hidden";
        }

        // Calculate progress based on scroll within the lock zone
        const scrollDelta = window.scrollY - scrollStartRef.current;
        const progress = Math.min(100, Math.max(0, (scrollDelta / scrollLockDistance) * 100));
        const stage = Math.floor((progress / 100) * stages);

        setState({ isLocked: true, progress, stage });

        // Release lock when complete
        if (progress >= 100) {
          document.body.style.overflow = "";
          isActiveRef.current = false;
        }
      } else if (rect.top > viewportHeight * 0.2) {
        // Reset when scrolling back up
        if (isActiveRef.current) {
          document.body.style.overflow = "";
          isActiveRef.current = false;
        }
        setState({ isLocked: false, progress: 0, stage: 0 });
      }
    };

    // Use wheel event for scroll-lock behavior (DESKTOP ONLY)
    const handleWheel = (e: WheelEvent) => {
      if (isActiveRef.current && state.progress < 100) {
        e.preventDefault();
        const scrollLockDistance = (lockHeight / 100) * window.innerHeight;
        const newProgress = Math.min(100, Math.max(0, state.progress + (e.deltaY / scrollLockDistance) * 20));
        const newStage = Math.floor((newProgress / 100) * stages);

        setState({ isLocked: true, progress: newProgress, stage: newStage });

        if (newProgress >= 100) {
          document.body.style.overflow = "";
          isActiveRef.current = false;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      document.body.style.overflow = "";
    };
  }, [ref, lockHeight, stages, state.progress, isMobile]);

  return state;
};

/*
 * THE ETYMOLOGY OF PLAY
 * How "Toy" Traveled from Sin to Innocence
 * 
 * Design Research Summary:
 * - Subject materials: Parchment, dictionary pages, wooden toys, typography
 * - Color palette: Aged cream, scholarly brown, illuminated gold, terracotta wood
 * - Animation philosophy: Word transformations, gradual reveals (like dictionary archaeology)
 * - Unique element: Building Blocks progress bar (stacking letters T-O-Y-S)
 * - Era treatments: Medieval parchment → Renaissance oil → Enlightenment powder → Victorian sepia → Modern clean
 */

// ==================== TYPES ====================

interface Section {
  id: string;
  era?: string;
  chapterNum?: number;
  title: string;
  metaphor?: string;
  content: React.ReactNode;
  layout: "hero" | "chapter" | "quote" | "timeline" | "etymology" | "revelation";
}

// ==================== DATA ====================

const ESSAY_META = {
  title: "The Etymology of Play",
  subtitle: "How \"Toy\" Traveled from Sin to Innocence",
  readTime: "18 min",
  category: "History",
};

const SOURCES = [
  // Etymology Sources - Academic (.edu)
  { title: "Middle English Dictionary - University of Michigan", url: "https://quod.lib.umich.edu/m/middle-english-dictionary/dictionary" },
  { title: "Middle English Compendium - University of Michigan", url: "https://quod.lib.umich.edu/m/med/" },

  // Historical Dictionaries - Academic (.edu, .ac.uk)
  { title: "Samuel Johnson's Dictionary (1755) - Georgetown University Library", url: "https://repository.library.georgetown.edu/handle/10822/549456" },
  { title: "Johnson's Dictionary in OED Context - Hertford College, Oxford", url: "https://oed.hertford.ox.ac.uk/historical-background/johnson/" },
  { title: "A Table Alphabeticall (1604) - University of Toronto LEME", url: "https://leme.library.utoronto.ca/lexicons/276/" },

  // Shakespeare Sources - Academic (.edu, .org)
  { title: "Shakespeare's Works - Folger Shakespeare Library", url: "https://shakespeare.folger.edu/" },
  { title: "Open Source Shakespeare Concordance", url: "https://www.opensourceshakespeare.org/concordance/" },

  // Academic Sources - Play Theory (.org, .edu)
  { title: "Huizinga, Johan. Homo Ludens (1950 edition) - Internet Archive", url: "https://archive.org/details/homoludensstudyo1950huiz" },
  { title: "Sutton-Smith, Brian. The Ambiguity of Play - Harvard University Press", url: "https://www.hup.harvard.edu/books/9780674017337" },

  // Academic Sources - Toy History (.edu, .org)
  { title: "Cross, Gary. Kids' Stuff - Harvard University Press", url: "https://www.hup.harvard.edu/books/9780674503489" },
  { title: "Fraser, Antonia. A History of Toys - WorldCat", url: "https://www.worldcat.org/title/history-of-toys/oclc/1036854894" },

  // Academic Sources - Childhood History (.edu, .org)
  { title: "Ariès, Philippe. Centuries of Childhood - University of Pittsburgh", url: "https://www.representingchildhood.pitt.edu/aries.htm" },
  { title: "Locke, John. Some Thoughts Concerning Education (1693) - Project Gutenberg", url: "https://www.gutenberg.org/ebooks/10604" },
  { title: "Rousseau, Jean-Jacques. Émile (1762) - Project Gutenberg", url: "https://www.gutenberg.org/ebooks/5427" },

  // Museum Collections - Institutional (.ac.uk, .org, .gov)
  { title: "V&A Museum - Toy Collections", url: "https://collections.vam.ac.uk/search/?q=toys" },
  { title: "The Strong National Museum of Play", url: "https://www.museumofplay.org/" },
  { title: "British Museum - Toys Collection", url: "https://www.britishmuseum.org/collection/search?keyword=toys" },

  // Government Archives (.gov, .gov.uk)
  { title: "Library of Congress - Children's Book Selections", url: "https://www.loc.gov/collections/childrens-book-selections/" },
  { title: "National Archives (UK)", url: "https://www.nationalarchives.gov.uk/" },
];

// ==================== COMPONENTS ====================

// Building Blocks Progress Bar
const BlocksProgress: React.FC<{ progress: number }> = ({ progress }) => {
  const blocks = ["T", "O", "Y", "S", "!", "★", "∞"];
  const activeBlocks = Math.floor((progress / 100) * blocks.length);

  return (
    <div className="blocks-progress" aria-label={`Reading progress: ${Math.round(progress)}%`}>
      <div className="blocks-stack">
        {blocks.map((letter, index) => (
          <div
            key={index}
            className={`block ${index < activeBlocks ? "stacked" : ""} ${
              index === activeBlocks - 1 ? "current" : ""
            }`}
            style={{ 
              transitionDelay: `${index * 50}ms`,
              opacity: index <= activeBlocks ? 1 : 0.2,
            }}
          >
            <span className="block-letter">{letter}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Header with scroll awareness
const EssayHeader: React.FC<{ scrolled: boolean }> = ({ scrolled }) => (
  <header className={`essay-header ${scrolled ? "scrolled" : ""}`}>
    <Link href="/essays/visual" className="back-link">
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

// Hero Section - Static display showing bright "TOY" word
// Simplified: No scroll locking, no animations, just the word at full brightness
const HeroSection: React.FC = () => {
  return (
    <section className="hero-section hero-static" aria-label="Essay title">
      {/* Background with parchment texture */}
      <div className="hero-background" style={{ opacity: 1 }}>
        <div className="parchment-texture" />
      </div>

      <div className="hero-content">
        {/* TOY word - always visible at full brightness */}
        <div className="word-container visible">
          <div className="modern-word" style={{ opacity: 1 }}>
            <span>T</span>
            <span>O</span>
            <span>Y</span>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-indicator" style={{ opacity: 1, visibility: "visible" }}>
          <ChevronDown size={24} />
          <span>Scroll to discover</span>
        </div>
      </div>
    </section>
  );
};

// Chapter Section Component
const ChapterSection: React.FC<{
  chapter: number;
  title: string;
  era: string;
  metaphor: string;
  children: React.ReactNode;
}> = ({ chapter, title, era, metaphor, children }) => {
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
    <section ref={sectionRef} className={`chapter-section ${isVisible ? "visible" : ""}`}>
      <div className="chapter-header">
        <span className="chapter-number">Chapter {chapter}</span>
        <span className="chapter-era">{era}</span>
      </div>
      <h2 className="chapter-title">{title}</h2>
      <p className="chapter-metaphor">&ldquo;{metaphor}&rdquo;</p>
      <div className="chapter-content">{children}</div>
    </section>
  );
};

// Quote Monument Component
const QuoteMonument: React.FC<{
  quote: string;
  attribution: string;
  year?: string;
}> = ({ quote, attribution, year }) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={`quote-monument ${isVisible ? "visible" : ""}`}>
      <blockquote>
        <p>&ldquo;{quote}&rdquo;</p>
        <cite>
          — {attribution}
          {year && <span className="quote-year">, {year}</span>}
        </cite>
      </blockquote>
    </section>
  );
};

// Figure Profile Component
const FigureProfile: React.FC<{
  name: string;
  epithet: string;
  years?: string;
  contributions: string[];
  quote?: string;
}> = ({ name, epithet, years, contributions, quote }) => (
  <div className="figure-profile">
    <div className="figure-header">
      <h3 className="figure-name">{name}</h3>
      <span className="figure-epithet">{epithet}</span>
      {years && <span className="figure-years">{years}</span>}
    </div>
    <ul className="figure-contributions">
      {contributions.map((c, i) => (
        <li key={i}>{c}</li>
      ))}
    </ul>
    {quote && (
      <p className="figure-quote">&ldquo;{quote}&rdquo;</p>
    )}
  </div>
);

// Dictionary Entry Animation
const DictionaryEntry: React.FC<{
  era: string;
  definition: string;
  source?: string;
}> = ({ era, definition, source }) => (
  <div className="dictionary-entry">
    <div className="entry-era">{era}</div>
    <div className="entry-word">toy</div>
    <div className="entry-definition">{definition}</div>
    {source && <div className="entry-source">{source}</div>}
  </div>
);

// Etymology Tree Branch
const EtymologyBranch: React.FC<{
  compound: string;
  meaning: string;
  era: string;
}> = ({ compound, meaning, era }) => (
  <div className="etymology-branch">
    <span className="branch-compound">{compound}</span>
    <span className="branch-meaning">{meaning}</span>
    <span className="branch-era">{era}</span>
  </div>
);

// Figure Image Component
const FigureImage: React.FC<{
  image: ToyImage;
  priority?: boolean;
}> = ({ image, priority = false }) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={ref} className={`figure-image ${isVisible ? "visible" : ""} era-${image.era}`}>
      <div className="figure-image-container">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          priority={priority}
          className="figure-img"
        />
      </div>
      <figcaption>
        <p className="figure-caption">{image.caption}</p>
        <p className="figure-attribution">{image.attribution}</p>
      </figcaption>
    </figure>
  );
};

// Image Gallery Component
const ImageGallery: React.FC<{
  images: ToyImage[];
  columns?: 1 | 2;
}> = ({ images, columns = 2 }) => (
  <div className={`image-gallery columns-${columns}`}>
    {images.map((img) => (
      <FigureImage key={img.id} image={img} />
    ))}
  </div>
);

// Dictionary Archaeology Scroll-Lock Sequence
// FIXED: Added proper scroll-lock pinning + exit transition
const DictionaryArchaeology: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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

      // Scroll-lock calculation: pin when section reaches top, release when scrolled through
      const scrollableDistance = containerHeight - viewportHeight;
      const scrolledIntoSection = -rect.top;

      if (rect.top <= 0 && scrolledIntoSection < scrollableDistance) {
        // Currently in the scroll-lock zone
        setIsPinned(true);
        setIsExiting(false);
        const progress = Math.min(100, Math.max(0, (scrolledIntoSection / scrollableDistance) * 100));
        setScrollProgress(progress);
      } else if (scrolledIntoSection >= scrollableDistance && rect.top <= 0) {
        // Exiting - scrolled past the section
        setIsPinned(false);
        setIsExiting(true);
        setUnpinPoint(scrollableDistance);
        setScrollProgress(100);
      } else {
        // Before the section
        setIsPinned(false);
        setIsExiting(false);
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Spec-precise definitions: Each layer excavates deeper into the word's history
  // CRITICAL: Johnson layer must include "Amorous dalliance" to bridge modern→medieval meanings
  const definitions = [
    { era: "Modern", year: "2024", def: "A thing for a child to play with", style: "modern" },
    { era: "Early 20th C.", year: "1920", def: "An article for children's amusement", style: "vintage" },
    { era: "Victorian", year: "1888", def: "A thing of little value; a trifle; a plaything", style: "victorian" },
    { era: "Johnson", year: "1755", def: "A petty commodity; a trifle; a thing of no value. Also: Amorous dalliance.", style: "johnson" },
    { era: "Medieval", year: "c. 1303", def: "Toye: Daliance. Foolyssh behavoir.", style: "medieval" },
  ];

  // Calculate which layer is active based on scroll progress
  const activeLayer = Math.min(4, Math.floor(scrollProgress / 20));

  return (
    <div ref={containerRef} className="dictionary-archaeology" style={{ height: "450vh", position: "relative" }}>
      <div 
        className={`pinned-content ${isPinned ? "is-pinned" : ""} ${isExiting ? "is-exiting" : ""}`}
        style={isExiting ? {
          position: "absolute",
          top: `${unpinPoint}px`,
          left: 0,
          right: 0,
          height: "100vh",
        } : undefined}
      >
        {/* Skip button */}
        {isPinned && scrollProgress < 95 && (
          <button className="skip-button" onClick={() => setScrollProgress(100)}>Skip →</button>
        )}

        {/* Progress bar */}
        {isPinned && (
          <div className="scroll-lock-progress">
            <div className="progress-fill" style={{ width: `${scrollProgress}%` }} />
          </div>
        )}

        <div className="archaeology-header">
          <span className="archaeology-label">Scroll-Lock: Dictionary Archaeology</span>
          <span className="archaeology-instruction">Scroll to excavate the word&apos;s history</span>
        </div>
        
        {/* Excavation depth indicator - shows how deep we've dug */}
        <div className="excavation-progress" aria-label={`Excavation depth: ${Math.round(scrollProgress)}%`}>
          <div className="excavation-track">
            <div 
              className="excavation-fill" 
              style={{ height: `${scrollProgress}%` }}
            />
            <div className="excavation-markers">
              {definitions.map((def, index) => (
                <div 
                  key={def.era} 
                  className={`excavation-marker ${index <= activeLayer ? "reached" : ""}`}
                  style={{ top: `${index * 20}%` }}
                  title={def.era}
                />
              ))}
            </div>
          </div>
          <span className="excavation-label">
            {activeLayer < 4 ? `${definitions.length - activeLayer - 1} more layers` : "Origin reached"}
          </span>
        </div>
        
        <div className="dictionary-layers">
          {definitions.map((def, index) => {
            const isActive = index <= activeLayer;
            const isCurrent = index === activeLayer;
            const layerProgress = Math.max(0, Math.min(100, (scrollProgress - index * 20) * 5));
            
            return (
              <div
                key={def.era}
                className={`dict-layer ${def.style} ${isActive ? "visible" : ""} ${isCurrent ? "current" : ""}`}
                style={{
                  opacity: isActive ? Math.min(1, layerProgress / 100) : 0,
                  transform: `translateY(${isActive ? 0 : 30}px)`,
                  zIndex: definitions.length - index,
                }}
              >
                <div className="layer-era">{def.era}</div>
                <div className="layer-year">{def.year}</div>
                <div className="layer-word">toy</div>
                <div className="layer-def">{def.def}</div>
              </div>
            );
          })}
        </div>

        <div className="archaeology-footer">
          <p className="archaeology-insight">
            {activeLayer === 0 && "The familiar definition. But what lies beneath?"}
            {activeLayer === 1 && "A century ago, still innocent..."}
            {activeLayer === 2 && "The Victorians hint at something more: 'a trifle.'"}
            {activeLayer === 3 && "Johnson reveals the secret: 'Amorous dalliance.'"}
            {activeLayer >= 4 && "The original meaning revealed: before playthings, there was dalliance."}
          </p>
          <p className="archaeology-citation">
            {activeLayer >= 4 && (
              <span className="citation-text">&ldquo;To find what a word truly means, read its first definitions.&rdquo;</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

// Shakespeare Shuffle Scroll-Lock Sequence  
// FIXED: Added proper scroll-lock pinning with smooth exit transition
const ShakespeareShuffle: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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

      // Scroll-lock calculation: pin when section reaches top, release when scrolled through
      const scrollableDistance = containerHeight - viewportHeight;
      const scrolledIntoSection = -rect.top;

      if (rect.top <= 0 && scrolledIntoSection <= scrollableDistance) {
        // Currently in scroll-lock zone
        setIsPinned(true);
        setIsExiting(false);
        const progress = Math.min(100, Math.max(0, (scrolledIntoSection / scrollableDistance) * 100));
        setScrollProgress(progress);
      } else if (rect.top > 0) {
        // Before scroll-lock zone
        setIsPinned(false);
        setIsExiting(false);
        setScrollProgress(0);
      } else {
        // After scroll-lock zone - smooth exit
        // Content should be positioned at the unpin point and scroll up naturally
        setIsPinned(false);
        setIsExiting(true);
        setScrollProgress(100);
        setUnpinPoint(scrollableDistance);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Spec: Shakespeare's 30+ uses, grouped by meaning category for sorting phase
  const shakespeareUses = [
    { play: "Hamlet", quote: "These are but wild and whirling toys", meaning: "fantasies", category: "whim" },
    { play: "Much Ado", quote: "This is a very scurvy toy of Fortune's", meaning: "trick", category: "trifle" },
    { play: "Winter's Tale", quote: "A toy in blood", meaning: "fancy, whim", category: "whim" },
    { play: "Othello", quote: "Trifles light as air", meaning: "related: trifles", category: "trifle" },
    { play: "King Lear", quote: "As flies to wanton boys", meaning: "sport, play", category: "ornament" },
  ];

  // Spec phases (EXACT from the-origin-of-toy.md):
  // 0-25%: First Folio page, one highlighted "toy" 
  // 25-45%: More cards flip, meanings revealed
  // 45-65%: Cards spread + TEXT: "Shakespeare never used 'toy' to mean plaything. Not once."
  // 65-85%: Cards sort by meaning (Fancy/Trifle/Ornament)
  // 85-100%: Empty space + TEXT: "The meaning we know was not yet born."
  
  const phase = scrollProgress < 25 ? 1 : scrollProgress < 45 ? 2 : scrollProgress < 65 ? 3 : scrollProgress < 85 ? 4 : 5;
  
  // Calculate visible cards based on phase - all visible once phase 2 starts
  const visibleCards = phase === 1 ? 1 : 5;
  
  // FIX: Fan progress should be calculated independently and persist through phase 4
  // Phase 2 (25-45%): Cards are appearing, start slight spreading
  // Phase 3 (45-65%): Full fan animation
  const fanProgress = scrollProgress < 25 ? 0 : 
                      scrollProgress < 45 ? (scrollProgress - 25) / 20 * 0.3 : // Slight spread during reveal
                      scrollProgress < 65 ? 0.3 + ((scrollProgress - 45) / 20) * 0.7 : // Full fan
                      1; // Maintain fan position in phases 4-5
  
  // Sort into groups during phase 4 (65-85%)
  const sortProgress = phase >= 4 ? Math.min(1, (scrollProgress - 65) / 20) : 0;
  
  // Show spread text during phase 3
  const showSpreadText = scrollProgress >= 50 && scrollProgress < 85;
  
  // Show conclusion during phase 5
  const showConclusion = scrollProgress >= 85;

  return (
    <div ref={containerRef} className="shakespeare-shuffle" style={{ height: "500vh", position: "relative" }}>
      <div 
        className={`pinned-content ${isPinned ? "is-pinned" : ""} ${isExiting ? "is-exiting" : ""}`}
        style={isExiting ? { 
          position: "absolute",
          top: `${unpinPoint}px`,
          left: 0,
          right: 0,
          height: "100vh",
        } : undefined}
      >
        {/* Skip button */}
        {isPinned && scrollProgress < 95 && (
          <button className="skip-button" onClick={() => setScrollProgress(100)}>Skip →</button>
        )}

        {/* Progress bar */}
        {isPinned && (
          <div className="scroll-lock-progress">
            <div className="progress-fill" style={{ width: `${scrollProgress}%` }} />
          </div>
        )}

        <div className="shuffle-header">
          <span className="shuffle-label">Scroll-Lock: Shakespeare&apos;s Thirty Uses</span>
        </div>

        <div className={`card-deck ${phase >= 3 ? "fanned" : "stacked"} ${phase >= 4 ? "sorted" : ""}`}>
          {shakespeareUses.map((use, index) => {
            const isVisible = index < visibleCards;
            const cardCount = shakespeareUses.length;
            const centerIndex = 2; // Middle card (index 2 of 5)
            const offsetFromCenter = index - centerIndex; // -2, -1, 0, 1, 2
            
            // Base centering offset (card is 200px wide, center it)
            const centerOffsetX = -100;
            const centerOffsetY = -75;
            
            let translateX = centerOffsetX;
            let translateY = centerOffsetY;
            let rotation = 0;
            let zIndex = cardCount - index;
            let scale = 1;
            
            // FAN_SPREAD: Distance between cards when fanned - increased for visual drama
            const FAN_SPREAD = 180; // px per card offset (was 140)
            const FAN_ARC = 25; // Vertical arc height
            const FAN_ROTATION = 12; // degrees per card offset
            
            // Phase 1-2: Neat stack with cascade effect
            // Phase 3: Full fan out across viewport
            // Phase 4-5: Sort into meaning categories
            
            if (phase <= 2) {
              // Stacked state with subtle cascade
              const stackOffset = index * 4; // Horizontal cascade
              const stackY = index * 3; // Vertical offset
              const stackRotation = index * 0.5 - 1; // Slight rotation variance
              
              // Apply fan progress even during reveal (phase 2) for smooth transition
              translateX = centerOffsetX + stackOffset + (offsetFromCenter * FAN_SPREAD * fanProgress);
              translateY = centerOffsetY + stackY + (Math.abs(offsetFromCenter) * FAN_ARC * fanProgress);
              rotation = stackRotation + (offsetFromCenter * FAN_ROTATION * fanProgress);
              
              // Z-index: during stack, top cards are in front
              // During fan transition, outer cards come forward
              zIndex = fanProgress < 0.2 
                ? cardCount - index 
                : 10 + Math.abs(offsetFromCenter); // Outer cards in front during fan
            } else if (phase === 3) {
              // Full fan - cards spread across viewport
              translateX = centerOffsetX + (offsetFromCenter * FAN_SPREAD);
              translateY = centerOffsetY + (Math.abs(offsetFromCenter) * FAN_ARC);
              rotation = offsetFromCenter * FAN_ROTATION;
              // Z-index: outer cards slightly raised for dramatic effect
              zIndex = 10 + Math.abs(offsetFromCenter);
              scale = 1 - (Math.abs(offsetFromCenter) * 0.02); // Subtle depth effect
            } else {
              // Phase 4-5: Sort into category columns with smooth choreography
              const categoryPositions: Record<string, number> = { 
                whim: -220,    // Left column
                trifle: 0,     // Center column  
                ornament: 220  // Right column
              };
              const targetX = categoryPositions[use.category] || 0;
              
              // Find position within category stack
              const sameCategory = shakespeareUses.filter(u => u.category === use.category);
              const categoryIndex = sameCategory.findIndex(u => u.play === use.play);
              const targetY = categoryIndex * 60; // Vertical stacking within category
              
              // Current fan position (what we're animating FROM)
              const fanX = offsetFromCenter * FAN_SPREAD;
              const fanY = Math.abs(offsetFromCenter) * FAN_ARC;
              const fanRotation = offsetFromCenter * FAN_ROTATION;
              
              // Apply easing to sortProgress for smoother animation
              // Use ease-out cubic for more natural deceleration
              const easedProgress = 1 - Math.pow(1 - sortProgress, 3);
              
              // Interpolate from fan position to sorted position
              translateX = centerOffsetX + fanX + (targetX - fanX) * easedProgress;
              
              // Add a subtle "lift" arc during transition - cards rise then settle
              const liftAmount = Math.sin(sortProgress * Math.PI) * 30;
              translateY = centerOffsetY + fanY + (targetY - fanY) * easedProgress - liftAmount;
              
              // Rotation settles to 0 with easing
              rotation = fanRotation * (1 - easedProgress);
              
              // Z-index strategy during sort:
              // - Column-based z-index to keep columns visually separated
              // - Left column in back, center middle, right in front (like a card spread)
              // - Within column, higher cards (larger categoryIndex) are in front
              const columnZ = use.category === 'whim' ? 0 : use.category === 'trifle' ? 10 : 20;
              zIndex = columnZ + categoryIndex + 5;
              
              // During transition (not yet settled), boost z-index of cards still moving
              if (sortProgress < 0.8) {
                // Cards further from their target get higher z-index to stay visible
                const distanceFromTarget = Math.abs(fanX - targetX);
                zIndex += Math.floor(distanceFromTarget / 50);
            }
            }
            
            // Use longer transition during sorting phase for smoother animation
            const transitionDuration = phase >= 4 ? '0.7s' : '0.5s';
            
            return (
              <div
                key={use.play}
                className={`folio-card ${isVisible ? "revealed" : ""}`}
                style={{
                  transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg) scale(${scale})`,
                  opacity: isVisible ? 1 : 0,
                  zIndex: zIndex,
                  transition: `transform ${transitionDuration} cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease`,
                  willChange: 'transform, opacity',
                }}
              >
                <div className="card-play">{use.play}</div>
                <div className="card-quote">&ldquo;{use.quote}&rdquo;</div>
                <div className="card-meaning">meaning: {use.meaning}</div>
              </div>
            );
          })}
        </div>
        
        {/* Category labels for sorting phase */}
        {phase >= 4 && (
          <div className="category-labels" style={{ opacity: sortProgress }}>
            <span className="category-label" style={{ left: "calc(50% - 200px)" }}>Whim/Fancy</span>
            <span className="category-label" style={{ left: "50%", transform: "translateX(-50%)" }}>Trifle</span>
            <span className="category-label" style={{ left: "calc(50% + 150px)" }}>Ornament</span>
          </div>
        )}

        {/* Phase 3 text (45-65%): Spec requirement */}
        {showSpreadText && (
          <div className="shuffle-spread-text">
            <p className="spread-emphasis">Shakespeare never used &ldquo;toy&rdquo; to mean plaything.</p>
            <p className="spread-subtext">Not once.</p>
          </div>
        )}

        {/* Phase 5 (85-100%): Empty space + spec conclusion */}
        {showConclusion && (
          <div className="shuffle-conclusion">
            {/* Empty space representing the absent modern meaning */}
            <div className="empty-meaning-space">
              <span className="empty-label">[ modern meaning ]</span>
              <span className="empty-absent">— absent —</span>
            </div>
            <p className="conclusion-emphasis">&ldquo;The meaning we know was not yet born.&rdquo;</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== SCROLL-LOCK SEQUENCES ====================

// Scroll-Lock: Invention of Childhood (Ch3) - Transformation Pattern
// Per spec: Child transforms from adult-miniature to genuine child as philosophy accumulates
const InventionOfChildhood: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Check if we're in the pinned zone
      if (rect.top <= 0 && rect.bottom > viewportHeight) {
        setIsPinned(true);
        const scrolled = -rect.top;
        const scrollableDistance = containerHeight - viewportHeight;
        const progress = Math.min(100, Math.max(0, (scrolled / scrollableDistance) * 100));
        setScrollProgress(progress);
      } else {
        setIsPinned(false);
        if (rect.top > 0) setScrollProgress(0);
        if (rect.bottom <= viewportHeight) setScrollProgress(100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Phase calculations per spec
  const phase1 = scrollProgress < 20;  // Small adult figure
  const phase2 = scrollProgress >= 20 && scrollProgress < 40;  // Locke's words
  const phase3 = scrollProgress >= 40 && scrollProgress < 60;  // Rousseau, child shrinks
  const phase4 = scrollProgress >= 60 && scrollProgress < 80;  // Surrounded by toys
  const phase5 = scrollProgress >= 80;  // Word "TOY" appears

  // Figure scale: starts at 0.7 (adult-like), grows to 1.0 (child proportions)
  const figureScale = 0.7 + (Math.min(scrollProgress, 60) / 60) * 0.3;
  // Figure posture: rigid at start, relaxed at end
  const figureRotation = Math.max(0, 15 - (scrollProgress / 60) * 15);
  // Toys opacity
  const toysOpacity = scrollProgress >= 40 ? Math.min(1, (scrollProgress - 40) / 20) : 0;
  // Final word opacity
  const wordOpacity = scrollProgress >= 80 ? (scrollProgress - 80) / 20 : 0;

  const handleSkip = useCallback(() => {
    if (containerRef.current) {
      const containerBottom = containerRef.current.offsetTop + containerRef.current.offsetHeight;
      window.scrollTo({ top: containerBottom - 100, behavior: "smooth" });
    }
  }, []);

  return (
    <div ref={containerRef} className="scroll-lock-childhood" style={{ height: "450vh" }}>
      <div className={`pinned-content ${isPinned ? "is-pinned" : ""}`}>
        {/* Skip button */}
        {isPinned && scrollProgress < 95 && (
          <button className="skip-button" onClick={handleSkip}>Skip →</button>
        )}

        {/* Progress bar */}
        {isPinned && (
          <div className="scroll-lock-progress">
            <div className="progress-fill" style={{ width: `${scrollProgress}%` }} />
          </div>
        )}

        <div className="childhood-header">
          <span className="scroll-lock-label">Scroll-Lock: The Invention of Childhood</span>
        </div>

        <div className="childhood-stage">
          {/* The child figure - transforms from rigid adult-miniature to playful child */}
          <div 
            className={`child-figure ${phase1 ? "adult-like" : ""} ${phase4 || phase5 ? "playing" : ""}`}
            style={{
              transform: `scale(${figureScale}) rotate(${figureRotation}deg)`,
            }}
          >
            <div className="figure-body">
              <div className="figure-head" />
              <div className="figure-torso" />
              <div className="figure-arms" />
              <div className="figure-legs" />
            </div>
          </div>

          {/* Philosophy text overlays */}
          {phase2 && (
            <div className="philosophy-text locke" style={{ opacity: Math.min(1, (scrollProgress - 20) / 10) }}>
              <span className="philosopher">Locke, 1693</span>
              <p>&ldquo;Children should have playthings suited to their development.&rdquo;</p>
            </div>
          )}

          {phase3 && (
            <div className="philosophy-text rousseau" style={{ opacity: Math.min(1, (scrollProgress - 40) / 10) }}>
              <span className="philosopher">Rousseau, 1762</span>
              <p>&ldquo;Nature provides for the child&apos;s growth in her own fashion.&rdquo;</p>
            </div>
          )}

          {/* Toys appearing around the child */}
          <div className="surrounding-toys" style={{ opacity: toysOpacity }}>
            <span className="toy-icon toy-1">🎠</span>
            <span className="toy-icon toy-2">🪀</span>
            <span className="toy-icon toy-3">🧸</span>
            <span className="toy-icon toy-4">🎲</span>
          </div>

          {/* Final word reveal */}
          {phase5 && (
            <div className="childhood-reveal" style={{ opacity: wordOpacity }}>
              <span className="reveal-word">TOY</span>
              <p className="reveal-caption">When we invented childhood, children claimed the word.</p>
            </div>
          )}
        </div>

        <div className="childhood-insight">
          {phase1 && <p>Before the 17th century, children were dressed as miniature adults.</p>}
          {phase2 && <p>Locke argued children needed play for proper development.</p>}
          {phase3 && <p>Rousseau revolutionized how we see childhood itself.</p>}
          {phase4 && <p>As childhood became a concept, it required vocabulary.</p>}
          {phase5 && <p>The word &ldquo;toy&rdquo; found its permanent home.</p>}
        </div>
      </div>
    </div>
  );
};

// Scroll-Lock: Toymaker's Bench (Ch4) - Assembly Pattern
// Per spec: Wooden horse assembles piece by piece on a craftsman's workbench
const ToymakersBench: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      if (rect.top <= 0 && rect.bottom > viewportHeight) {
        setIsPinned(true);
        const scrolled = -rect.top;
        const scrollableDistance = containerHeight - viewportHeight;
        const progress = Math.min(100, Math.max(0, (scrolled / scrollableDistance) * 100));
        setScrollProgress(progress);
      } else {
        setIsPinned(false);
        if (rect.top > 0) setScrollProgress(0);
        if (rect.bottom <= viewportHeight) setScrollProgress(100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Phase calculations per spec:
  // 0-20%: Empty workbench, tools arranged
  // 20-40%: Body shape emerges
  // 40-60%: Legs, head attached
  // 60-80%: Painting phase
  // 80-100%: Finished pull-along horse
  const phase = Math.floor(scrollProgress / 20);
  
  const bodyOpacity = scrollProgress >= 20 ? Math.min(1, (scrollProgress - 20) / 15) : 0;
  const legsOpacity = scrollProgress >= 40 ? Math.min(1, (scrollProgress - 40) / 10) : 0;
  const headOpacity = scrollProgress >= 45 ? Math.min(1, (scrollProgress - 45) / 10) : 0;
  const paintOpacity = scrollProgress >= 60 ? Math.min(1, (scrollProgress - 60) / 15) : 0;
  const wheelsOpacity = scrollProgress >= 75 ? Math.min(1, (scrollProgress - 75) / 10) : 0;
  const stringOpacity = scrollProgress >= 85 ? Math.min(1, (scrollProgress - 85) / 10) : 0;

  const handleSkip = useCallback(() => {
    if (containerRef.current) {
      const containerBottom = containerRef.current.offsetTop + containerRef.current.offsetHeight;
      window.scrollTo({ top: containerBottom - 100, behavior: "smooth" });
    }
  }, []);

  return (
    <div ref={containerRef} className="scroll-lock-toymaker" style={{ height: "450vh" }}>
      <div className={`pinned-content ${isPinned ? "is-pinned" : ""}`}>
        {isPinned && scrollProgress < 95 && (
          <button className="skip-button" onClick={handleSkip}>Skip →</button>
        )}

        {isPinned && (
          <div className="scroll-lock-progress">
            <div className="progress-fill" style={{ width: `${scrollProgress}%` }} />
          </div>
        )}

        <div className="toymaker-header">
          <span className="scroll-lock-label">Scroll-Lock: The Toymaker&apos;s Bench</span>
          <span className="toymaker-instruction">Scroll to build</span>
        </div>

        <div className="workbench">
          {/* Tools and shavings - always visible */}
          <div className="bench-surface">
            <div className="wood-shavings" />
            <div className="tools">
              <span className="tool chisel">🪚</span>
              <span className="tool hammer">🔨</span>
              <span className="tool brush">🖌️</span>
            </div>
          </div>

          {/* The toy horse being built */}
          <div className="toy-horse">
            {/* Body - raw wood */}
            <div 
              className={`horse-body ${paintOpacity > 0 ? "painted" : "raw"}`}
              style={{ opacity: bodyOpacity }}
            >
              <div className="body-shape" />
            </div>

            {/* Legs */}
            <div 
              className={`horse-legs ${paintOpacity > 0 ? "painted" : "raw"}`}
              style={{ opacity: legsOpacity }}
            >
              <div className="leg leg-1" />
              <div className="leg leg-2" />
              <div className="leg leg-3" />
              <div className="leg leg-4" />
            </div>

            {/* Head and mane */}
            <div 
              className={`horse-head ${paintOpacity > 0 ? "painted" : "raw"}`}
              style={{ opacity: headOpacity }}
            >
              <div className="head-shape" />
              <div className="mane" style={{ opacity: paintOpacity }} />
              <div className="eye" style={{ opacity: paintOpacity }} />
            </div>

            {/* Wheels (pull-along toy) */}
            <div className="horse-wheels" style={{ opacity: wheelsOpacity }}>
              <div className="wheel wheel-front" />
              <div className="wheel wheel-back" />
            </div>

            {/* Pull string */}
            <div className="pull-string" style={{ opacity: stringOpacity }} />
          </div>
        </div>

        <div className="toymaker-caption">
          {phase === 0 && <p>The toymaker&apos;s bench. Raw materials await transformation.</p>}
          {phase === 1 && <p>The body takes shape. Rough-cut, unfinished.</p>}
          {phase === 2 && <p>Legs attached, head carved. The horse emerges.</p>}
          {phase === 3 && <p>Dappled gray. Red bridle. Black mane. Color brings life.</p>}
          {phase >= 4 && <p>Wheels, string attached. A toy is born.</p>}
        </div>

        {scrollProgress >= 90 && (
          <div className="toymaker-conclusion" style={{ opacity: (scrollProgress - 90) / 10 }}>
            <p>&ldquo;When your livelihood is &apos;toys,&apos; the word cannot be trivial.&rdquo;</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Scroll-Lock: Department Store Ascent (Ch5) - Pan/Reveal Pattern (Vertical)
// Per spec: Rise through floors of a grand Victorian department store
const DepartmentStoreAscent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      if (rect.top <= 0 && rect.bottom > viewportHeight) {
        setIsPinned(true);
        const scrolled = -rect.top;
        const scrollableDistance = containerHeight - viewportHeight;
        const progress = Math.min(100, Math.max(0, (scrolled / scrollableDistance) * 100));
        setScrollProgress(progress);
      } else {
        setIsPinned(false);
        if (rect.top > 0) setScrollProgress(0);
        if (rect.bottom <= viewportHeight) setScrollProgress(100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Per spec:
  // 0-20%: Ground floor (haberdashery, gloves)
  // 20-40%: Rising, glimpses of color
  // 40-60%: TOY DEPARTMENT reveal
  // 60-80%: Pan across treasures
  // 80-100%: Child enters, wonder
  
  const floorPosition = scrollProgress * 3; // 0-300 representing vertical movement
  const currentFloor = Math.floor(scrollProgress / 25);
  const toyDeptRevealed = scrollProgress >= 40;
  const childEnters = scrollProgress >= 80;

  const handleSkip = useCallback(() => {
    if (containerRef.current) {
      const containerBottom = containerRef.current.offsetTop + containerRef.current.offsetHeight;
      window.scrollTo({ top: containerBottom - 100, behavior: "smooth" });
    }
  }, []);

  return (
    <div ref={containerRef} className="scroll-lock-department" style={{ height: "450vh" }}>
      <div className={`pinned-content ${isPinned ? "is-pinned" : ""}`}>
        {isPinned && scrollProgress < 95 && (
          <button className="skip-button" onClick={handleSkip}>Skip →</button>
        )}

        {isPinned && (
          <div className="scroll-lock-progress">
            <div className="progress-fill" style={{ width: `${scrollProgress}%` }} />
          </div>
        )}

        <div className="department-header">
          <span className="scroll-lock-label">Scroll-Lock: The Department Store Ascent</span>
        </div>

        <div className="store-viewport">
          {/* The vertical store structure that moves up as we scroll */}
          <div 
            className="store-floors"
            style={{ transform: `translateY(${-floorPosition}px)` }}
          >
            {/* Ground Floor */}
            <div className={`floor floor-ground ${currentFloor === 0 ? "active" : ""}`}>
              <div className="floor-label">Ground Floor</div>
              <div className="floor-contents">
                <span className="item">🧤 Gloves</span>
                <span className="item">🎩 Haberdashery</span>
                <span className="item">👜 Sundries</span>
              </div>
              <div className="sign-pointing">↑ Toys</div>
            </div>

            {/* Second Floor */}
            <div className={`floor floor-second ${currentFloor === 1 ? "active" : ""}`}>
              <div className="floor-label">Second Floor</div>
              <div className="floor-contents">
                <span className="item">🪑 Furniture</span>
                <span className="item">🖼️ Décor</span>
                <span className="glimpse">🎨 Colors ahead...</span>
              </div>
            </div>

            {/* TOY DEPARTMENT */}
            <div className={`floor floor-toys ${currentFloor >= 2 ? "active" : ""} ${toyDeptRevealed ? "revealed" : ""}`}>
              <div className="floor-label toy-dept-label">✨ TOY DEPARTMENT ✨</div>
              <div className="floor-contents toy-contents">
                <div className="toy-shelf shelf-1">
                  <span className="toy-item">🚂</span>
                  <span className="toy-item">🎎</span>
                  <span className="toy-item">🪆</span>
                </div>
                <div className="toy-shelf shelf-2">
                  <span className="toy-item">🧸</span>
                  <span className="toy-item">🎠</span>
                  <span className="toy-item">🪁</span>
                </div>
                <div className="toy-shelf shelf-3">
                  <span className="toy-item">🎪</span>
                  <span className="toy-item">🎭</span>
                  <span className="toy-item">🎨</span>
                </div>
              </div>
            </div>
          </div>

          {/* Child entering - appears at 80% */}
          {childEnters && (
            <div className="child-wonder" style={{ opacity: (scrollProgress - 80) / 15 }}>
              <div className="wonder-child">👧</div>
              <div className="wonder-eyes">✨</div>
            </div>
          )}
        </div>

        <div className="department-caption">
          {currentFloor === 0 && <p>Ground floor. Ordinary goods. But a sign points upward.</p>}
          {currentFloor === 1 && <p>Rising. Glimpses of color appear.</p>}
          {currentFloor >= 2 && !childEnters && <p>TOY DEPARTMENT. Paradise found.</p>}
          {childEnters && <p>&ldquo;Toy&rdquo; was no longer something you dismissed. It was something you dreamed of.</p>}
        </div>
      </div>
    </div>
  );
};

// Scroll-Lock: Word Branches (Ch6) - Assembly Pattern
// Per spec: Tree diagram grows, showing how "toy" has branched into compound words
const WordBranches: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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
        // Currently in scroll-lock zone
        setIsPinned(true);
        setIsExiting(false);
        const progress = Math.min(100, Math.max(0, (scrolledIntoSection / scrollableDistance) * 100));
        setScrollProgress(progress);
      } else if (rect.top > 0) {
        // Before scroll-lock zone
        setIsPinned(false);
        setIsExiting(false);
        setScrollProgress(0);
      } else {
        // After scroll-lock zone - smooth exit
        setIsPinned(false);
        setIsExiting(true);
        setScrollProgress(100);
        setUnpinPoint(scrollableDistance);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Per spec:
  // 0-25%: Trunk "TOY" appears
  // 25-50%: First branches (toy soldier, toy train, toy box)
  // 50-70%: New branches (toy poodle, executive toy, boy toy)
  // 70-85%: Modern branches (digital toys, adult toys)
  // 85-100%: Full tree revealed with conclusion

  const branches = [
    { word: "toy soldier", meaning: "miniature figure", era: "19th c.", group: 1 },
    { word: "toy train", meaning: "model locomotive", era: "1850s", group: 1 },
    { word: "toy box", meaning: "storage for playthings", era: "1800s", group: 1 },
    { word: "toy poodle", meaning: "small dog breed", era: "20th c.", group: 2 },
    { word: "executive toy", meaning: "desk distraction", era: "1970s", group: 2 },
    { word: "boy toy", meaning: "young attractive person", era: "1980s", group: 2 },
    { word: "digital toys", meaning: "electronic games", era: "1990s", group: 3 },
    { word: "adult toys", meaning: "intimate devices", era: "modern", group: 3 },
  ];

  const trunkVisible = scrollProgress >= 5;
  const trunkOpacity = Math.min(1, scrollProgress / 20);
  const showConclusion = scrollProgress >= 85;

  const handleSkip = useCallback(() => {
    if (containerRef.current) {
      const containerBottom = containerRef.current.offsetTop + containerRef.current.offsetHeight;
      window.scrollTo({ top: containerBottom - 100, behavior: "smooth" });
    }
  }, []);

  return (
    <div ref={containerRef} className="scroll-lock-branches" style={{ height: "450vh", position: "relative" }}>
      <div 
        className={`pinned-content ${isPinned ? "is-pinned" : ""} ${isExiting ? "is-exiting" : ""}`}
        style={isExiting ? {
          position: "absolute",
          top: `${unpinPoint}px`,
          left: 0,
          right: 0,
          height: "100vh",
        } : undefined}
      >
        {isPinned && scrollProgress < 95 && (
          <button className="skip-button" onClick={handleSkip}>Skip →</button>
        )}

        {isPinned && (
          <div className="scroll-lock-progress">
            <div className="progress-fill" style={{ width: `${scrollProgress}%` }} />
          </div>
        )}

        <div className="branches-header">
          <span className="scroll-lock-label">Scroll-Lock: The Word Branches</span>
        </div>

        <div className="tree-container">
          {/* Trunk */}
          <div 
            className={`tree-trunk ${trunkVisible ? "visible" : ""}`}
            style={{ opacity: trunkOpacity }}
          >
            <span className="trunk-word">TOY</span>
          </div>

          {/* Branches - organized as rows by group */}
          <div className="tree-branches-grid">
            {[1, 2, 3].map(groupNum => {
              const groupBranches = branches.filter(b => b.group === groupNum);
              const groupStart = groupNum === 1 ? 25 : groupNum === 2 ? 50 : 70;
              
              return (
                <div key={groupNum} className={`branch-row row-${groupNum}`}>
                  {groupBranches.map((branch, indexInGroup) => {
                    const branchStart = groupStart + indexInGroup * 8;
              const branchOpacity = scrollProgress >= branchStart 
                      ? Math.min(1, (scrollProgress - branchStart) / 12) 
                : 0;
                    const branchScale = 0.8 + (branchOpacity * 0.2);

              return (
                <div
                  key={branch.word}
                  className={`tree-branch group-${branch.group}`}
                  style={{
                    opacity: branchOpacity,
                          transform: `scale(${branchScale}) translateY(${(1 - branchOpacity) * 20}px)`,
                          transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                  }}
                >
                  <div className="branch-line" />
                  <div className="branch-content">
                    <span className="branch-word">{branch.word}</span>
                    <span className="branch-meaning">{branch.meaning}</span>
                    <span className="branch-era">{branch.era}</span>
                  </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {showConclusion && (
          <div className="branches-conclusion" style={{ opacity: (scrollProgress - 85) / 12 }}>
            <p>&ldquo;A word is never finished. It grows with every mouth that speaks it.&rdquo;</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Etymology Complete - Scroll-Lock Sequence (Chapter 7)
// Per spec: "We reverse the hero sequence—reassembling the word with new understanding"
// Phases:
// 0-20%: Medieval "TOYE" - Dalliance, Trifle, Scandal
// 20-40%: Renaissance meanings gather - ornament, fancy, whim
// 40-60%: Enlightenment shift - childhood, education, play
// 60-75%: Industrial transformation - product, industry, desire
// 75-90%: Modern sprawl - all meanings coexisting
// 90-100%: TOY reassembles and glows
const EtymologyComplete: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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
  }, []);

  // Era-based meanings per spec
  const eras = [
    { name: "Medieval", period: "1300s", meanings: ["dalliance", "trifle", "scandal"], startAt: 0 },
    { name: "Renaissance", period: "1500s", meanings: ["ornament", "fancy", "whim"], startAt: 20 },
    { name: "Enlightenment", period: "1700s", meanings: ["childhood", "education", "play"], startAt: 40 },
    { name: "Industrial", period: "1800s", meanings: ["product", "industry", "desire"], startAt: 60 },
    { name: "Modern", period: "1900s+", meanings: ["all meanings coexist"], startAt: 75 },
  ];

  // Calculate which phase we're in
  const phase = scrollProgress < 20 ? 1 : scrollProgress < 40 ? 2 : scrollProgress < 60 ? 3 : scrollProgress < 75 ? 4 : scrollProgress < 90 ? 5 : 6;
  
  // Final reassembly phase (90-100%)
  const reassemblyProgress = Math.max(0, Math.min(1, (scrollProgress - 90) / 10));
  const showFinalWord = scrollProgress >= 90;

  // Calculate convergence - meanings move toward center as we approach finale
  const convergeFactor = Math.max(0, Math.min(1, (scrollProgress - 75) / 15));
  
  // Fade out era clusters when final TOY appears (85-95% scroll)
  const clusterFadeOut = Math.max(0, Math.min(1, (scrollProgress - 85) / 10));

  const handleSkip = useCallback(() => {
    if (containerRef.current) {
      const containerBottom = containerRef.current.offsetTop + containerRef.current.offsetHeight;
      window.scrollTo({ top: containerBottom - 100, behavior: "smooth" });
    }
  }, []);

  return (
    <div ref={containerRef} className="scroll-lock-etymology" style={{ height: "400vh", position: "relative" }}>
      <div 
        className={`pinned-content ${isPinned ? "is-pinned" : ""} ${isExiting ? "is-exiting" : ""}`}
        style={isExiting ? {
          position: "absolute",
          top: `${unpinPoint}px`,
          left: 0,
          right: 0,
          height: "100vh",
        } : undefined}
      >
        {/* Skip button */}
        {isPinned && scrollProgress < 95 && (
          <button className="skip-button" onClick={handleSkip}>Skip →</button>
        )}

        {/* Progress bar */}
        {isPinned && (
          <div className="scroll-lock-progress">
            <div className="progress-fill" style={{ width: `${scrollProgress}%` }} />
      </div>
        )}

        <div className="etymology-header">
          <span className="scroll-lock-label">The Word Reassembles</span>
        </div>

        {/* Era meanings gathering toward center */}
        <div className="etymology-stage">
          {/* Medieval TOYE - blackletter style */}
          {phase >= 1 && (
            <div
              className={`era-cluster medieval ${phase === 1 ? 'active' : ''}`}
              style={{
                opacity: Math.min(1, scrollProgress / 15) * (1 - clusterFadeOut),
                transform: `translateY(${convergeFactor * -50}px) scale(${1 - convergeFactor * 0.3})`,
              }}
            >
              <span className="era-word blackletter">TOYE</span>
              <div className="era-meanings">
                {eras[0].meanings.map((m, i) => (
                  <span key={m} className="meaning-tag" style={{ 
                    opacity: Math.min(1, (scrollProgress - i * 3) / 10),
                    animationDelay: `${i * 100}ms`
                  }}>{m}</span>
                ))}
            </div>
      </div>
          )}

          {/* Renaissance meanings */}
          {phase >= 2 && (
            <div 
              className={`era-cluster renaissance ${phase === 2 ? 'active' : ''}`}
              style={{
                opacity: Math.min(1, (scrollProgress - 20) / 15) * (1 - clusterFadeOut),
                transform: `translateX(${-80 + convergeFactor * 80}px) translateY(${convergeFactor * -30}px) scale(${1 - convergeFactor * 0.3})`,
              }}
            >
              <div className="era-meanings">
                {eras[1].meanings.map((m, i) => (
                  <span key={m} className="meaning-tag" style={{ 
                    opacity: Math.min(1, (scrollProgress - 20 - i * 3) / 10),
                  }}>{m}</span>
                ))}
              </div>
            </div>
          )}

          {/* Enlightenment meanings */}
          {phase >= 3 && (
            <div 
              className={`era-cluster enlightenment ${phase === 3 ? 'active' : ''}`}
              style={{
                opacity: Math.min(1, (scrollProgress - 40) / 15) * (1 - clusterFadeOut),
                transform: `translateX(${80 - convergeFactor * 80}px) translateY(${convergeFactor * -10}px) scale(${1 - convergeFactor * 0.3})`,
              }}
            >
              <div className="era-meanings">
                {eras[2].meanings.map((m, i) => (
                  <span key={m} className="meaning-tag" style={{ 
                    opacity: Math.min(1, (scrollProgress - 40 - i * 3) / 10),
                  }}>{m}</span>
                ))}
              </div>
            </div>
          )}

          {/* Industrial meanings */}
          {phase >= 4 && (
            <div 
              className={`era-cluster industrial ${phase === 4 ? 'active' : ''}`}
              style={{
                opacity: Math.min(1, (scrollProgress - 60) / 12) * (1 - clusterFadeOut),
                transform: `translateX(${-60 + convergeFactor * 60}px) translateY(${20 + convergeFactor * -20}px) scale(${1 - convergeFactor * 0.3})`,
              }}
            >
              <div className="era-meanings">
                {eras[3].meanings.map((m, i) => (
                  <span key={m} className="meaning-tag" style={{ 
                    opacity: Math.min(1, (scrollProgress - 60 - i * 3) / 10),
                  }}>{m}</span>
                ))}
              </div>
            </div>
          )}

          {/* Modern - all coexisting */}
          {phase >= 5 && (
            <div 
              className={`era-cluster modern ${phase === 5 ? 'active' : ''}`}
              style={{
                opacity: Math.min(1, (scrollProgress - 75) / 10) * (1 - clusterFadeOut),
                transform: `translateX(${60 - convergeFactor * 60}px) translateY(${40 + convergeFactor * -40}px) scale(${1 - convergeFactor * 0.3})`,
              }}
            >
              <span className="meaning-tag coexist">all meanings coexist</span>
            </div>
          )}

          {/* Final TOY reassembly - glowing - only when pinned */}
          {showFinalWord && isPinned && (
            <div 
              className="final-reassembly"
              style={{ 
                opacity: reassemblyProgress,
                transform: `translate(-50%, -50%) scale(${0.8 + reassemblyProgress * 0.2})`,
              }}
            >
              <span className="reassembled-word">
                <span className="letter" style={{ animationDelay: '0ms' }}>T</span>
                <span className="letter" style={{ animationDelay: '100ms' }}>O</span>
                <span className="letter" style={{ animationDelay: '200ms' }}>Y</span>
          </span>
              <p className="final-text" style={{ opacity: reassemblyProgress }}>
                Every time you say &ldquo;toy,&rdquo; seven centuries speak through you.
              </p>
        </div>
      )}
        </div>
      </div>
    </div>
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
              <ExternalLink size={12} />
            </a>
          </li>
        ))}
      </ul>
      <p className="sources-note">
        This narrative was researched using peer-reviewed etymological sources, 
        historical dictionaries, and museum collections specializing in toy history.
      </p>
    </div>
  </section>
);

// ==================== MAIN COMPONENT ====================

const OriginOfToyClient: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(Math.min(currentProgress, 100));
      setHeaderScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="origin-of-toy visual-essay">
      <EssayHeader scrolled={headerScrolled} />
      <BlocksProgress progress={scrollProgress} />

      <main className="essay-main">
        {/* Hero Section */}
        <HeroSection />

        {/* Chapter 1: The Medieval Toye */}
        <ChapterSection
          chapter={1}
          title="The Medieval Toye"
          era="England, 1300–1500"
          metaphor="When 'toy' meant whispered scandal—the word's lost first life."
        >
          <FigureImage image={chapter1Images[0]} priority />

          <div className="content-block">
            <p>
              The word &ldquo;toy&rdquo; first appears in English around 1303, and it has nothing 
              to do with children. In the medieval imagination, a <em>toye</em> was a dalliance—a 
              flirtation, a romantic interlude, perhaps something improper. To &ldquo;toy with&rdquo; 
              someone was to engage in amorous play.
            </p>
          </div>

          <DictionaryEntry
            era="c. 1303"
            definition="Daliance; amorous sport or play; trifling behavior"
            source="Middle English Dictionary"
          />

          <ImageGallery images={chapter1Images.slice(1)} columns={2} />

          <div className="content-block">
            <p>
              The etymology itself is mysterious. Scholars debate whether &ldquo;toy&rdquo; descends from 
              Middle Dutch <em>toi</em> (ornament, finery), or emerges independently from English wordplay. 
              What&apos;s certain is its early semantic field: frivolity, worthlessness, idle amusement.
            </p>
            <p>
              For medieval writers, the word carried a whiff of moral suspicion. To spend time on 
              &ldquo;toys&rdquo; was to waste it. The word was already teaching a lesson about value.
            </p>
          </div>

          <FigureProfile
            name="Geoffrey Chaucer"
            epithet="The Poet Who First Toyed"
            years="c. 1343–1400"
            contributions={[
              "Among the earliest recorded users of 'toy' in Middle English",
              "Used the word to mean idle talk and trifling matters",
              "His Canterbury Tales established many words in English literature",
            ]}
          />
        </ChapterSection>

        {/* Scroll-Lock: Dictionary Archaeology (OUTSIDE section to avoid transform conflicts) */}
        <DictionaryArchaeology />

        {/* Chapter 1 continued after scroll-lock */}
        <div className="chapter-continued" style={{ transform: "none" }} />

        {/* Quote: Peter Damian */}
        <QuoteMonument
          quote="Nor did she deign to touch food with her fingers, but would command her eunuchs to cut it up into small pieces, which she would impale on a certain golden instrument with two prongs."
          attribution="Peter Damian, on Byzantine customs"
          year="c. 1060"
        />

        {/* Chapter 2: Trifle and Dalliance */}
        <ChapterSection
          chapter={2}
          title="Trifle and Dalliance"
          era="Early Modern England, 1500–1650"
          metaphor="When 'toy' meant everything except plaything—the word at its wildest."
        >
          <FigureImage image={chapter2Images[0]} />

          <div className="content-block">
            <p>
              Shakespeare used &ldquo;toy&rdquo; over thirty times—<em>never once</em> meaning 
              a child&apos;s plaything. For the Elizabethans, &ldquo;toy&rdquo; was a Swiss Army knife 
              of a word: a fancy, a whim, an idle thought, a trifle, an ornament, a small gift, 
              a romantic entanglement.
            </p>
          </div>

          <ImageGallery images={chapter2Images.slice(1, 3)} columns={2} />

          <QuoteMonument
            quote="These are but wild and whirling toys."
            attribution="Hamlet"
            year="1601"
          />

          <FigureImage image={chapter2Images[3]} />

          <div className="content-block">
            <p>
              Wealthy women wore &ldquo;toys&rdquo;—not playthings but jewelry, ornamental trinkets, 
              decorative frivolities. Men dismissed women&apos;s concerns as &ldquo;toys,&rdquo; meaning 
              matters of no consequence. The word lived in the space between desire and dismissal.
            </p>
            <p>
              Crucially, &ldquo;toy&rdquo; in this era still belonged primarily to adults. Children had 
              playthings—dolls, balls, hoops—but the English language rarely called them &ldquo;toys.&rdquo; 
              That association was still forming, like a photograph developing in chemical baths.
            </p>
          </div>
        </ChapterSection>

        {/* Scroll-Lock: Shakespeare Shuffle (OUTSIDE section to avoid transform conflicts) */}
        <ShakespeareShuffle />

        {/* Chapter 2 continued after scroll-lock */}
        <section className="chapter-section chapter-continued" style={{ transform: "none" }}>
          <div className="figure-grid">
            <FigureProfile
              name="William Shakespeare"
              epithet="Master of Semantic Range"
              years="1564–1616"
              contributions={[
                "Used 'toy' 30+ times, never meaning 'child's plaything'",
                "His uses include: fancy, whim, ornament, trifle, idle imagination",
                "Demonstrates the word's breadth before semantic narrowing",
              ]}
              quote="This is a very scurvy toy of Fortune's."
            />
            <FigureProfile
              name="Robert Cawdrey"
              epithet="The First Dictionary Maker"
              years="c. 1538–1604"
              contributions={[
                "Compiled 'A Table Alphabeticall' (1604)—first English dictionary",
                "Captured early definitions showing 'toy' as trifle and ornament",
                "Preserved evidence of how Elizabethans understood common words",
              ]}
            />
          </div>
        </section>

        {/* Chapter 3: The Children's Claim */}
        <ChapterSection
          chapter={3}
          title="The Children's Claim"
          era="17th–18th Century"
          metaphor="When childhood itself was invented—and claimed a word."
        >
          <ImageGallery images={chapter3Images.slice(0, 2)} columns={2} />

          <div className="content-block">
            <p>
              The 17th and 18th centuries invented childhood as we know it. Philosophers like 
              John Locke and Jean-Jacques Rousseau argued that children were not miniature adults 
              but a distinct category of human being—with distinct needs, including play.
            </p>
            <p>
              As childhood crystallized as a concept, it required vocabulary. &ldquo;Toy&rdquo; was available.
            </p>
          </div>

          <FigureImage image={chapter3Images[2]} />

          <DictionaryEntry
            era="1755"
            definition="TOY: A petty commodity; a trifle; a thing of no value; a plaything; a bauble."
            source="Samuel Johnson's Dictionary"
          />

          <FigureImage image={chapter3Images[3]} />

          <div className="content-block">
            <p>
              Samuel Johnson&apos;s Dictionary (1755) still lists multiple meanings for &ldquo;toy&rdquo;—but 
              the children&apos;s sense is rising. By century&apos;s end, &ldquo;toy&rdquo; increasingly meant what 
              adults gave children: objects designed for play, for learning-through-amusement, 
              for cultivating innocent joy.
            </p>
          </div>

          <FigureImage image={chapter3Images[4]} />

          <div className="figure-grid">
            <FigureProfile
              name="John Locke"
              epithet="Philosopher of Childhood"
              years="1632–1704"
              contributions={[
                "Some Thoughts Concerning Education (1693) emphasized learning through play",
                "Argued children should have playthings suited to their development",
                "Helped establish philosophical foundation for toys as educational tools",
              ]}
            />
            <FigureProfile
              name="Jean-Jacques Rousseau"
              epithet="Champion of Natural Play"
              years="1712–1778"
              contributions={[
                "Émile (1762) revolutionized thinking about childhood",
                "Advocated for children's natural inclination to play as essential",
                "Influenced how society conceptualized childhood—and its objects",
              ]}
            />
          </div>
        </ChapterSection>

        {/* Scroll-Lock: Invention of Childhood (OUTSIDE section to avoid transform conflicts) */}
        <InventionOfChildhood />

        {/* Chapter 3 continued after scroll-lock */}
        <div className="chapter-continued" style={{ transform: "none" }} />

        {/* Chapter 4: The Toymaker's Art */}
        <ChapterSection
          chapter={4}
          title="The Toymaker's Art"
          era="Nuremberg & European Toymaking, 1600–1850"
          metaphor="When 'toy' became a profession—the word gains weight."
        >
          <FigureImage image={chapter4Images[0]} />

          <div className="content-block">
            <p>
              Nuremberg claimed the title &ldquo;Toy Capital of the World&rdquo; by the 18th century. 
              Generations of craftsmen—wood carvers, tin smiths, doll makers—transformed &ldquo;toy&rdquo; 
              from dismissive noun to proud profession. When your family name was synonymous with 
              toymaking, the word commanded respect.
            </p>
            <p>
              The guild system elevated toy production to recognized craft. Master toymakers trained 
              apprentices. Quality standards emerged. Toy fairs drew international buyers. What had 
              been &ldquo;trifles&rdquo; were now serious business.
            </p>
          </div>

          <ImageGallery images={chapter4Images.slice(1, 3)} columns={2} />

          <div className="craft-showcase">
            <div className="craft-item">
              <span className="craft-material">Wood</span>
              <span className="craft-region">Black Forest</span>
            </div>
            <div className="craft-item">
              <span className="craft-material">Tin</span>
              <span className="craft-region">Nuremberg</span>
            </div>
            <div className="craft-item">
              <span className="craft-material">Porcelain</span>
              <span className="craft-region">Thuringia</span>
            </div>
          </div>

          <FigureImage image={chapter4Images[3]} />

          <div className="content-block">
            <p>
              The materials told stories: carved wood from the Black Forest, painted tin from 
              Nuremberg, delicate porcelain dolls from Thuringia. Each material had its masters, 
              each region its specialty. &ldquo;Toy&rdquo; absorbed the dignity of craft, the weight of 
              tradition, the pride of expertise.
            </p>
          </div>

          <FigureProfile
            name="The Nuremberg Toymakers"
            epithet="Craftsmen Who Gave 'Toy' Weight"
            years="16th–19th Century"
            contributions={[
              "Established Nuremberg as 'Toy Capital of the World' by 1700s",
              "Guild system elevated toymaking to recognized profession",
              "Exported tin soldiers, wooden figures, and mechanical toys worldwide",
              "Families like Märklin and Bing made 'toymaker' a proud identity",
            ]}
          />
        </ChapterSection>

        {/* Scroll-Lock: Toymaker's Bench (OUTSIDE section to avoid transform conflicts) */}
        <ToymakersBench />

        {/* Chapter 4 continued after scroll-lock */}
        <div className="chapter-continued" style={{ transform: "none" }} />

        {/* Chapter 5: Industry and Innocence */}
        <ChapterSection
          chapter={5}
          title="Industry and Innocence"
          era="Victorian Era to Early 20th Century"
          metaphor="When toys became products—and 'toy' became synonymous with childhood."
        >
          <FigureImage image={chapter5Images[0]} />

          <div className="content-block">
            <p>
              The Industrial Revolution transformed toys from handcraft to mass product. Factories 
              in Germany, Britain, and America churned out tin soldiers, porcelain dolls, and 
              mechanical wonders at unprecedented scale. Prices fell. Availability exploded. 
              For the first time, toys reached beyond the wealthy.
            </p>
          </div>

          <ImageGallery images={chapter5Images.slice(1, 3)} columns={2} />

          <div className="stat-block">
            <div className="stat-item">
              <span className="stat-value">1862</span>
              <span className="stat-label">FAO Schwarz founded</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">1760</span>
              <span className="stat-label">Hamleys opens in London</span>
            </div>
          </div>

          <FigureImage image={chapter5Images[3]} />

          <div className="content-block">
            <p>
              Victorian sentiment wrapped &ldquo;toy&rdquo; in moral warmth. Childhood was sacred; toys 
              were childhood&apos;s sacred objects. Christmas traditions made toy-giving a ritual of love. 
              Department stores built cathedrals of consumerism with toy departments as their holy of holies.
            </p>
            <p>
              By 1900, the semantic transformation was complete. &ldquo;Toy&rdquo; now meant, primarily and 
              overwhelmingly, an object for children&apos;s play. The older meanings—trifle, ornament, 
              dalliance—retreated to archaic status.
            </p>
          </div>

          <FigureProfile
            name="A.C. Gilbert"
            epithet="The Man Who Saved Christmas"
            years="1884–1961"
            contributions={[
              "Invented the Erector Set (1913)—educational construction toy",
              "Olympic gold medalist who became toy magnate",
              "During WWI, lobbied Congress to exempt toy industry from war production",
              "Earned nickname 'The Man Who Saved Christmas' for ensuring toys remained available",
            ]}
            quote="Hello, Boys! Make Lots of Toys!"
          />
        </ChapterSection>

        {/* Scroll-Lock: Department Store Ascent (OUTSIDE section to avoid transform conflicts) */}
        <DepartmentStoreAscent />

        {/* Chapter 5 continued after scroll-lock */}
        <div className="chapter-continued" style={{ transform: "none" }} />

        {/* Chapter 6: The Living Word */}
        <ChapterSection
          chapter={6}
          title="The Living Word"
          era="20th Century to Present"
          metaphor="When 'toy' outgrew the nursery—the word's modern migrations."
        >
          <FigureImage image={chapter6Images[0]} />

          <div className="content-block">
            <p>
              The 20th century secured &ldquo;toy&rdquo; as a children&apos;s word—but the word refused to 
              stay put. New compounds emerged: &ldquo;toy soldier,&rdquo; &ldquo;toy car,&rdquo; &ldquo;toy poodle&rdquo; 
              (a dog bred small enough to be... toy-like?). &ldquo;Sex toys&rdquo; reclaimed the word&apos;s 
              ancient association with adult pleasure. &ldquo;Executive toys&rdquo; colonized office desks.
            </p>
          </div>

          <ImageGallery images={chapter6Images.slice(1)} columns={2} />
        </ChapterSection>

        {/* Scroll-Lock: Word Branches (OUTSIDE section to avoid transform conflicts) */}
        <WordBranches />

        {/* Chapter 6 continued after scroll-lock */}
        <section className="chapter-continued" style={{ transform: "none" }}>
          <div className="content-block">
            <p>
              Today, &ldquo;toy&rdquo; lives everywhere. It modifies nouns (toy car, toy gun), names entire 
              industries, describes anything miniature or playful or not-quite-serious. The word 
              that once meant &ldquo;trifle&rdquo; has become essential to billion-dollar commerce—the 
              ultimate revenge of frivolity.
            </p>
          </div>

          <div className="figure-grid">
            <FigureProfile
              name="Ole Kirk Christiansen"
              epithet="The Block Builder"
              years="1891–1958"
              contributions={[
                "Founded LEGO (from Danish 'leg godt' = 'play well')",
                "Created the world's most successful toy",
                "LEGO represents the enduring power of creative play",
              ]}
            />
            <FigureProfile
              name="Ruth Handler"
              epithet="Barbie's Mother"
              years="1916–2002"
              contributions={[
                "Co-founded Mattel; created Barbie (1959)",
                "Created the most successful doll in history",
                "Transformed 'toy' into cultural phenomenon",
              ]}
              quote="Through the doll, the little girl could be anything she wanted to be."
            />
          </div>
        </section>

        {/* Chapter 7: The Meaning of Play */}
        <ChapterSection
          chapter={7}
          title="The Meaning of Play"
          era="Present Day and Reflection"
          metaphor="What the journey of one word teaches us about permission to play."
        >
          <FigureImage image={chapter7Images[0]} />

          <div className="content-block">
            <p>
              Johan Huizinga, the Dutch historian, argued that play is older than culture itself. 
              Animals play. Babies play before they speak. Play is not a break from life—it is 
              essential to life. The word &ldquo;toy&rdquo; carries this weight now, but it didn&apos;t always.
            </p>
          </div>

          <FigureImage image={chapter7Images[2]} />

          <QuoteMonument
            quote="Play is older than culture, for culture, however inadequately defined, always presupposes human society, and animals have not waited for man to teach them their playing."
            attribution="Johan Huizinga"
            year="1938"
          />

          <div className="content-block">
            <p>
              When &ldquo;toy&rdquo; meant &ldquo;trifle,&rdquo; society confessed its suspicion of play. When 
              &ldquo;toy&rdquo; meant &ldquo;ornament,&rdquo; it revealed anxiety about frivolity. When &ldquo;toy&rdquo; 
              finally settled on &ldquo;children&apos;s plaything,&rdquo; it both honored childhood and exiled 
              adult play—giving children permission while implicitly denying it to adults.
            </p>
            <p>
              To trace a word is to trace a culture&apos;s permission structures. What we call things 
              reveals what we allow ourselves to want.
            </p>
          </div>

          <FigureProfile
            name="Johan Huizinga"
            epithet="Philosopher of Play"
            years="1872–1945"
            contributions={[
              "Homo Ludens (1938) argued play is foundational to culture",
              "Elevated play from frivolity to fundamental human need",
              "His work reframed how scholars understand toys and games",
            ]}
          />
        </ChapterSection>

        {/* Scroll-Lock: Etymology Complete - OUTSIDE ChapterSection to avoid transform conflicts */}
          <EtymologyComplete />

        {/* Revelation / Closing */}
        <section className="revelation-section">
          <div className="revelation-content">
            <p className="revelation-text">
              Every time you say &ldquo;toy,&rdquo; seven centuries speak through you.
            </p>
            <p className="revelation-subtext">
              The word carries medieval scandal and Enlightenment philosophy, 
              Victorian sentiment and modern commerce. A single syllable—and 
              an entire history of humanity&apos;s relationship with play.
            </p>
          </div>
        </section>

        {/* Sources */}
        <SourcesSection />

        {/* Footer */}
        <footer className="essay-footer">
          <Link href="/essays/visual" className="footer-back">
            <ArrowLeft size={16} />
            <span>All Visual Essays</span>
          </Link>
          <p className="footer-note">
            An Esy Visual Essay
          </p>
        </footer>
      </main>
    </div>
  );
};

export default OriginOfToyClient;
