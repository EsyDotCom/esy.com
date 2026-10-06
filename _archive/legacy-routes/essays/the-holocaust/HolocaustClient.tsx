"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import "./the-holocaust.css";
import {
  heroImages,
  chapter1Images,
  chapter2Images,
  chapter3Images,
  chapter4Images,
  chapter5Images,
  chapter6Images,
  chapter7Images,
  chapter8Images,
  type HolocaustImage,
} from "./images";

// ============================================================================
// DESIGN RESEARCH REPORT: THE HOLOCAUST — NEVER FORGET
// ============================================================================
// Visual Philosophy: Sobriety and respect. No sensationalism. The horror speaks.
// Color Palette: Void black (#0A0A0A), memorial gold (#C9A227), parchment cream (#F5E6C8),
//                deep red (#8B0000), liberation warmth (#F0E6D2), memorial blue (#1B365D)
// Typography: Playfair Display (headlines), Source Serif Pro (body),
//             Crimson Pro italic (testimony), IBM Plex Mono (names/data)
// Animation Philosophy: Sobriety over spectacle. No flourishes. Motion serves meaning.
// Unique Interactions: Memorial candle progress bar, name scroll, testimony reveals
// Photo Treatment: Era-based B&W processing, minimal manipulation—images speak for themselves
// ============================================================================

// ==================== TYPE DEFINITIONS ====================

interface ScrollLockState {
  containerRef: React.RefObject<HTMLDivElement | null>;
  progress: number;
  isPinned: boolean;
}

interface Figure {
  name: string;
  epithet: string;
  facts: string[];
  quote?: string;
  photoDescription: string;
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
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionHeight]);

  return { containerRef, progress, isPinned };
};

// Global scroll progress for memorial candle
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

// ==================== CONTENT WARNING OVERLAY ====================

const ContentWarningOverlay: React.FC<{
  onContinue: () => void;
  onExit: () => void;
}> = ({ onContinue, onExit }) => {
  return (
    <div className="content-warning-overlay" role="alertdialog" aria-modal="true" aria-labelledby="warning-title">
      <div className="warning-card">
        <div className="warning-icon">🕯️</div>
        <h2 id="warning-title" className="warning-title">Content Advisory</h2>
        <div className="warning-content">
          <p>
            The following experience documents <strong>the Holocaust</strong>—the systematic 
            murder of six million Jews and millions of others by Nazi Germany.
          </p>
          <p>
            This material includes descriptions of mass murder, starvation, and genocide, 
            as well as archival photographs from this period.
          </p>
          <p className="warning-emphasis">
            Viewer discretion is strongly advised.
          </p>
          <p className="warning-resources">
            If you or someone you know is struggling with distressing content, 
            please reach out to a crisis support service.
          </p>
        </div>
        <div className="warning-actions">
          <button 
            className="warning-button continue"
            onClick={onContinue}
            autoFocus
          >
            I Understand — Continue to Experience
          </button>
          <button 
            className="warning-button exit"
            onClick={onExit}
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== MEMORIAL CANDLE PROGRESS BAR ====================

const MemorialCandleProgress: React.FC<{ progress: number }> = ({ progress }) => {
  // Candle burns down as user progresses
  const candleHeight = 100 - (progress * 85); // Leave 15% at end for flame transfer
  const flamePosition = Math.max(15, candleHeight);
  
  // Chapter markers as wax drips
  const chapters = [
    { position: 12.5, label: "I" },
    { position: 25, label: "II" },
    { position: 37.5, label: "III" },
    { position: 50, label: "IV" },
    { position: 62.5, label: "V" },
    { position: 75, label: "VI" },
    { position: 87.5, label: "VII" },
    { position: 95, label: "VIII" },
  ];

  return (
    <div className="memorial-candle-progress" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Reading progress">
      <div className="candle-container">
        {/* The candle body */}
        <div 
          className="candle-body"
          style={{ height: `${candleHeight}%` }}
        />
        
        {/* The flame */}
        <div 
          className="candle-flame-container"
          style={{ bottom: `${flamePosition}%` }}
        >
          <div className="candle-flame">
            <div className="flame-inner" />
            <div className="flame-glow" />
          </div>
        </div>
        
        {/* Chapter markers (wax drips) */}
        {chapters.map((chapter, i) => (
          <div 
            key={i}
            className={`chapter-drip ${progress * 100 >= chapter.position ? 'passed' : ''}`}
            style={{ top: `${chapter.position}%` }}
            aria-label={`Chapter ${chapter.label}`}
          >
            <span className="drip-marker" />
            <span className="drip-label">{chapter.label}</span>
          </div>
        ))}
      </div>
      
      {/* Final state: flame transfers to multiple candles */}
      {progress > 0.95 && (
        <div className="flame-transfer">
          <div className="transferred-flame" style={{ animationDelay: "0s" }} />
          <div className="transferred-flame" style={{ animationDelay: "0.2s" }} />
          <div className="transferred-flame" style={{ animationDelay: "0.4s" }} />
        </div>
      )}
    </div>
  );
};

// ==================== ARCHIVAL PHOTO COMPONENT ====================

interface ArchivalPhotoProps {
  image?: HolocaustImage;
  alt?: string;
  caption?: string;
  source?: string;
  date?: string;
  era?: "warning" | "descent" | "abyss" | "testimony" | "liberation";
  className?: string;
}

const ArchivalPhoto: React.FC<ArchivalPhotoProps> = ({
  image,
  alt: altProp,
  caption: captionProp,
  source: sourceProp,
  date: dateProp,
  era = "abyss",
  className = "",
}) => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  
  // Use image object props if provided, fall back to direct props
  const src = image?.src;
  const alt = image?.alt || altProp || "";
  const caption = image?.caption || captionProp || "";
  const source = image?.source || sourceProp || "";
  const date = image?.date || dateProp;
  const attribution = image?.attribution;
  
  return (
    <figure 
      ref={ref}
      className={`archival-photo era-${era} ${className} ${isVisible ? "revealed" : ""}`}
    >
      <div className="photo-frame">
        {src ? (
          <img 
            src={src} 
            alt={alt}
            className="archival-image"
            loading="lazy"
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
        {attribution && (
          <span className="caption-attribution">{attribution}</span>
        )}
      </figcaption>
    </figure>
  );
};

// ==================== FIGURE PROFILE COMPONENT ====================

interface FigureProfileProps {
  figure: Figure;
  image?: HolocaustImage;
  delay?: number;
}

const FigureProfile: React.FC<FigureProfileProps> = ({ 
  figure, 
  image,
  delay = 0 
}) => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  
  return (
    <article 
      ref={ref}
      className={`figure-profile ${isVisible ? "revealed" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="profile-portrait">
        {image?.src ? (
          <img 
            src={image.src} 
            alt={image.alt || figure.name}
            className="portrait-image"
            loading="lazy"
          />
        ) : (
          <div className="portrait-placeholder">
            <span>{figure.photoDescription}</span>
          </div>
        )}
        <div className="portrait-vignette" />
      </div>
      <div className="profile-content">
        <h4 className="figure-name">{figure.name}</h4>
        <span className="figure-epithet">{figure.epithet}</span>
        <ul className="figure-facts">
          {figure.facts.map((fact, i) => (
            <li key={i}>{fact}</li>
          ))}
        </ul>
        {figure.quote && (
          <blockquote className="figure-quote">
            <p>&ldquo;{figure.quote}&rdquo;</p>
          </blockquote>
        )}
        {image?.attribution && (
          <span className="figure-attribution">{image.attribution}</span>
        )}
      </div>
    </article>
  );
};

// ==================== TESTIMONY REVEAL COMPONENT ====================

const TestimonyReveal: React.FC<{
  text: string;
  speaker: string;
  progress: number;
}> = ({ text, speaker, progress }) => {
  const visibleChars = Math.floor(progress * text.length);
  
  return (
    <blockquote className="testimony-reveal">
      <p className="testimony-text">
        <span className="visible-text">{text.slice(0, visibleChars)}</span>
        <span className="cursor" aria-hidden="true">|</span>
      </p>
      <cite className="testimony-speaker">— {speaker}</cite>
    </blockquote>
  );
};

// ==================== HERO SECTION: THE LAST PHOTOGRAPH ====================

const HeroSection: React.FC = () => {
  const { containerRef, progress, isPinned } = useScrollLock(4);
  
  const phase = useMemo(() => {
    if (progress < 0.10) return "candle";
    if (progress < 0.25) return "illuminating";
    if (progress < 0.40) return "photograph";
    if (progress < 0.55) return "testimony";
    if (progress < 0.70) return "fading";
    if (progress < 0.85) return "darkness";
    if (progress < 0.95) return "number";
    return "title";
  }, [progress]);

  return (
    <header
      className={`hero-section scroll-lock-container phase-${phase}`}
      ref={containerRef}
      style={{ height: "400vh" }}
    >
      <div className="hero-pinned">
        {/* Phase 1: Single candle flame in darkness */}
        <div className="hero-candle" style={{ opacity: phase === "candle" ? 1 : 0 }}>
          <div className="single-flame">
            <div className="flame-body" />
            <div className="flame-glow" />
          </div>
        </div>
        
        {/* Phase 2-3: The photograph emerges */}
        <div 
          className="hero-photograph"
          style={{ 
            opacity: ["illuminating", "photograph", "testimony", "fading"].includes(phase) ? 1 : 0,
            filter: phase === "illuminating" 
              ? `brightness(${0.3 + (progress - 0.10) * 4})` 
              : phase === "testimony"
                ? "brightness(0.5)"
                : phase === "fading" 
                  ? `brightness(${0.5 - (progress - 0.55) * 2})` 
                  : "none"
          }}
        >
          <div className="photograph-frame">
            <img 
              src={heroImages[0].src}
              alt={heroImages[0].alt}
              className="hero-family-image"
            />
            <div className="photograph-vignette" />
          </div>
          
          {/* Caption appears */}
          <div className={`hero-photo-caption ${phase === "photograph" || phase === "testimony" ? "visible" : ""}`}>
            <p>Kalisz, Poland — May 16, 1935</p>
            <p className="caption-subtitle">A family strolls through their city. An ordinary day.</p>
          </div>
        </div>
        
        {/* Phase 4: The testimony */}
        <div 
          className="hero-testimony"
          style={{ opacity: phase === "testimony" ? 1 : 0 }}
        >
          <p className="testimony-line">
            <em>Of the three million Jews in Poland, only 300,000 survived.</em>
          </p>
        </div>
        
        {/* Phase 5-6: Darkness descends */}
        <div 
          className="hero-darkness-overlay"
          style={{ 
            opacity: phase === "darkness" ? 1 : 0 
          }}
        />
        
        {/* Phase 7: The number */}
        <div 
          className="hero-number"
          style={{ opacity: phase === "number" ? 1 : 0 }}
        >
          <span className="number-main">6,000,000</span>
          <span className="number-subtitle">Jewish victims alone.</span>
        </div>
        
        {/* Phase 8: The title */}
        <div 
          className="hero-title-card"
          style={{ opacity: phase === "title" ? 1 : 0 }}
        >
          <h1 className="hero-title">NEVER FORGET</h1>
          <p className="hero-subtitle">Bearing Witness to the Holocaust</p>
        </div>
      </div>
    </header>
  );
};

// ==================== CHAPTER 1: BEFORE THE DARKNESS ====================

const Chapter1: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  const { containerRef, progress, isPinned } = useScrollLock(3);
  
  const korczak: Figure = {
    name: "Janusz Korczak",
    epithet: "The Teacher Who Walked with His Children",
    facts: [
      "Pediatrician, author, and educator who ran an orphanage in Warsaw",
      "Pioneer of children's rights—called for respect for children as full human beings",
      "Refused multiple offers to escape, choosing to accompany his orphans to Treblinka",
      "Walked into the gas chambers holding the hands of the youngest children"
    ],
    quote: "You do not leave a sick child in the night, and you do not leave children at a time like this.",
    photoDescription: "Korczak surrounded by children at the orphanage, eyes of infinite gentleness"
  };

  return (
    <section id="chapter-1" className="chapter chapter-1" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-marker">Chapter I</span>
          <span className="chapter-date">1900 — 1932</span>
          <h2 className="chapter-title">Before the Darkness</h2>
          <p className="chapter-metaphor">
            The world that was—a civilization erased, its richness forgotten in the shadow of its destruction.
          </p>
        </header>
        
        <div className="chapter-intro">
          <p>
            Before we understand what was destroyed, we must understand what existed. 
            <strong> Nine million Jews lived in Europe in 1933.</strong> They had lived there 
            for centuries—in some places, a thousand years.
          </p>
          <p>
            They were doctors, tailors, teachers, writers, shopkeepers, laborers. They built 
            synagogues of breathtaking beauty. They argued about politics, worried about their 
            children, celebrated holidays, fell in love.
          </p>
        </div>
        
        <div className="photo-grid">
          <ArchivalPhoto
            image={chapter1Images[0]}
            era="testimony"
          />
          <ArchivalPhoto
            image={chapter1Images[2]}
            era="testimony"
          />
        </div>
        
        <div className="chapter-text">
          <p>
            This was not a people passively awaiting destruction. This was a vibrant, diverse 
            civilization—secular and religious, Zionist and assimilationist, rich and poor. 
            In Poland alone, there were <strong>3.3 million Jews</strong>. They published newspapers, 
            produced theater, debated philosophy, raised families.
          </p>
          
          <blockquote className="voice-eternal">
            <p>When we say &ldquo;six million,&rdquo; we must understand each one was a person with a name, 
            a face, a story. Each death was the end of a universe.</p>
          </blockquote>
        </div>
        
        <FigureProfile figure={korczak} image={chapter1Images[1]} />
      </div>
      
      {/* Scroll-Lock Sequence: "The World That Was" */}
      <div 
        ref={containerRef}
        className="scroll-lock-sequence world-that-was"
        style={{ height: "300vh" }}
        id="seq-world-that-was"
      >
        <a href="#chapter-2" className="skip-sequence">Skip to next chapter</a>
        <div className="sequence-pinned">
          <div className="mosaic-container">
            <div className="europe-outline" />
            <div 
              className="photograph-mosaic"
              style={{ 
                opacity: progress,
                transform: `scale(${0.8 + progress * 0.2})`
              }}
            >
              {/* Photographs cluster around major centers */}
              <div className="photo-cluster warsaw" style={{ opacity: progress > 0.25 ? 1 : 0 }} />
              <div className="photo-cluster vienna" style={{ opacity: progress > 0.35 ? 1 : 0 }} />
              <div className="photo-cluster berlin" style={{ opacity: progress > 0.45 ? 1 : 0 }} />
              <div className="photo-cluster budapest" style={{ opacity: progress > 0.55 ? 1 : 0 }} />
              <div className="photo-cluster small-towns" style={{ opacity: progress > 0.7 ? 1 : 0 }} />
            </div>
            
            {progress > 0.85 && (
              <div className="mosaic-message">
                <p>3 million photographs would be needed for Poland alone.</p>
                <p className="message-emphasis">The impossibility of comprehension is the point.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 2: THE RISE OF HATRED ====================

const Chapter2: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  const { containerRef, progress, isPinned } = useScrollLock(3);
  
  const arendt: Figure = {
    name: "Hannah Arendt",
    epithet: "The Philosopher Who Saw the Machine",
    facts: [
      "Political theorist who fled Germany in 1933",
      "Later reported on Eichmann trial for The New Yorker",
      "Coined \"the banality of evil\"—how ordinary bureaucrats enabled genocide",
      "Her analysis of totalitarianism remains essential to understanding the Holocaust"
    ],
    quote: "The sad truth is that most evil is done by people who never make up their minds to be good or evil.",
    photoDescription: "Arendt in New York, cigarette in hand, penetrating gaze"
  };
  
  const laws = [
    { date: "April 1, 1933", text: "Boycott of Jewish businesses" },
    { date: "April 7, 1933", text: "Jews banned from civil service" },
    { date: "April 25, 1933", text: "Quotas on Jewish students" },
    { date: "September 29, 1933", text: "Jews banned from cultural life" },
    { date: "September 15, 1935", text: "Nuremberg Laws — citizenship revoked" },
    { date: "November 14, 1935", text: "Jews cannot vote" },
    { date: "March 1936", text: "Jews cannot practice medicine for non-Jews" },
    { date: "October 1936", text: "Jewish teachers dismissed" },
    { date: "April 26, 1938", text: "Jews must register all property" },
    { date: "July 23, 1938", text: "Jews must carry identification cards" },
    { date: "October 5, 1938", text: "Jewish passports stamped with \"J\"" },
    { date: "November 15, 1938", text: "Jewish children expelled from schools" },
  ];

  return (
    <section id="chapter-2" className="chapter chapter-2" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-marker">Chapter II</span>
          <span className="chapter-date">1933 — 1938</span>
          <h2 className="chapter-title">The Rise of Hatred</h2>
          <p className="chapter-metaphor">
            The step by step—how civilization collapses not in explosion but in increments, 
            each one preparing the ground for the next.
          </p>
        </header>
        
        <div className="chapter-intro">
          <p>
            It began not with death camps but with words. The Nazis did not come to power 
            promising genocide—they came promising restoration of German greatness. 
            <strong> The persecution of Jews was gradual, legal, bureaucratic.</strong>
          </p>
        </div>
        
        <div className="photo-grid">
          <ArchivalPhoto
            image={chapter2Images[0]}
            era="warning"
          />
          <ArchivalPhoto
            image={chapter2Images[1]}
            era="warning"
          />
        </div>
        
        <div className="chapter-text">
          <p>
            Each law seemed survivable. Each accommodation seemed reasonable. 
            <em>&ldquo;It will pass.&rdquo; &ldquo;It could be worse.&rdquo; &ldquo;We have lived here for generations.&rdquo;</em>
          </p>
          <p>
            The incremental nature of persecution is essential to understanding how it succeeded.
          </p>
        </div>
        
        <FigureProfile figure={arendt} image={chapter2Images[2]} />
      </div>
      
      {/* Scroll-Lock Sequence: "The Tightening Noose" */}
      <div 
        ref={containerRef}
        className="scroll-lock-sequence tightening-noose"
        style={{ height: "300vh" }}
        id="seq-tightening-noose"
      >
        <a href="#chapter-3" className="skip-sequence">Skip to next chapter</a>
        <div className="sequence-pinned">
          <div className="laws-timeline">
            <h3 className="timeline-title">The Tightening Noose</h3>
            <div className="laws-container">
              {laws.map((law, i) => {
                const lawProgress = i / laws.length;
                const isVisible = progress >= lawProgress;
                const speed = 0.3 + (progress * 0.7); // Laws appear faster as we scroll
                
                return (
                  <div 
                    key={i}
                    className={`law-item ${isVisible ? "visible" : ""}`}
                    style={{ 
                      animationDelay: `${i * 100 * (1 - speed)}ms`,
                      opacity: isVisible ? 1 : 0
                    }}
                  >
                    <span className="law-date">{law.date}</span>
                    <span className="law-text">{law.text}</span>
                  </div>
                );
              })}
            </div>
            
            {progress > 0.9 && (
              <p className="timeline-conclusion">
                By the end, laws were appearing faster than they could be read.
                <br />
                <strong>The overwhelming totality of persecution.</strong>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 3: KRISTALLNACHT ====================

const Chapter3: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  const { containerRef, progress, isPinned } = useScrollLock(2.5);
  
  const grynszpan: Figure = {
    name: "Herschel Grynszpan",
    epithet: "The Desperate Trigger",
    facts: [
      "17-year-old Polish Jew living in Paris",
      "Shot German diplomat Ernst vom Rath on November 7, 1938",
      "His act was the pretext (not the cause) for Kristallnacht",
      "His family had just been deported from Germany to Poland",
      "Fate unknown—disappeared in Nazi custody"
    ],
    quote: "Being a Jew is not a crime. I am not a dog. I have a right to live.",
    photoDescription: "Grynszpan under arrest, a teenager caught in history's machinery"
  };

  return (
    <section id="chapter-3" className="chapter chapter-3" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-marker">Chapter III</span>
          <span className="chapter-date">November 9-10, 1938</span>
          <h2 className="chapter-title">The Night of Broken Glass</h2>
          <p className="chapter-metaphor">
            The night the mask came off—state-organized violence revealed the true intention.
          </p>
        </header>
        
        <div className="chapter-intro">
          <p>
            In a single night, November 9-10, 1938, the pretense ended. Across Germany, Austria, 
            and the Sudetenland, Nazi paramilitaries and ordinary citizens destroyed Jewish 
            businesses, homes, and synagogues. They called it <em>Kristallnacht</em>—the Night of Broken Glass.
          </p>
        </div>
        
        <div className="statistics-block kristallnacht-stats">
          <div className="stat">
            <span className="stat-value">7,500</span>
            <span className="stat-label">businesses destroyed</span>
          </div>
          <div className="stat">
            <span className="stat-value">1,400</span>
            <span className="stat-label">synagogues burned</span>
          </div>
          <div className="stat">
            <span className="stat-value">30,000</span>
            <span className="stat-label">Jewish men arrested</span>
          </div>
          <div className="stat">
            <span className="stat-value">91+</span>
            <span className="stat-label">Jews murdered</span>
          </div>
        </div>
        
        <div className="chapter-text">
          <p>
            But more devastating than the violence was the response. <strong>The world did nothing.</strong> 
            Many Germans did nothing—or helped. And the Jews themselves were forced to pay for the 
            damage: one billion reichsmarks.
          </p>
          <p>
            The message was clear: there would be no protection, no recourse, no rescue.
          </p>
          
          <blockquote className="voice-eternal">
            <p>For those with eyes to see, Kristallnacht revealed the future. 
            Many tried to flee. Most could not. The world closed its doors.</p>
          </blockquote>
        </div>
        
        <FigureProfile figure={grynszpan} image={chapter3Images[2]} />
      </div>
      
      {/* Scroll-Lock Sequence: "The Night Unfolds" */}
      <div 
        ref={containerRef}
        className="scroll-lock-sequence night-unfolds"
        style={{ height: "250vh" }}
        id="seq-night-unfolds"
      >
        <a href="#chapter-4" className="skip-sequence">Skip to next chapter</a>
        <div className="sequence-pinned">
          <div className="germany-map">
            <div className="map-outline" />
            
            {/* Flames appear at synagogue locations */}
            <div className="flames-container">
              {Array.from({ length: Math.floor(progress * 50) }).map((_, i) => (
                <div 
                  key={i}
                  className="map-flame"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${15 + Math.random() * 70}%`,
                    animationDelay: `${i * 50}ms`
                  }}
                />
              ))}
            </div>
            
            {progress > 0.8 && (
              <div className="map-expansion">
                <span className="expansion-label">Austria</span>
                <span className="expansion-label">Sudetenland</span>
              </div>
            )}
          </div>
          
          <div className="sequence-caption">
            <p>
              {progress < 0.3 
                ? "A single flame appears..."
                : progress < 0.6
                  ? "Flames multiply across major cities..."
                  : progress < 0.85
                    ? "Fire spreads to smaller towns—the scope becomes clear..."
                    : "The scale. Austria. Sudetenland. All burning."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 4: THE GHETTOS ====================

const Chapter4: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  const { containerRef, progress, isPinned } = useScrollLock(2.5);
  
  const ringelblum: Figure = {
    name: "Emanuel Ringelblum",
    epithet: "The Historian Who Buried the Truth",
    facts: [
      "Organized the Oyneg Shabes archive in the Warsaw Ghetto",
      "Collected 35,000 documents, testimonies, and artifacts",
      "Buried in milk cans and boxes, recovered after the war",
      "Killed with his family in 1944"
    ],
    quote: "I do not ask for myself. I ask that this should not be forgotten.",
    photoDescription: "Ringelblum at his desk, the weight of witness on his shoulders"
  };
  
  const czerniakow: Figure = {
    name: "Adam Czerniaków",
    epithet: "The Impossible Position",
    facts: [
      "Chairman of the Warsaw Ghetto Jewish Council",
      "Tried to negotiate, to save who he could",
      "When ordered to compile deportation lists, he refused",
      "Took cyanide rather than send children to death"
    ],
    quote: "They want me to kill the children of my nation with my own hands.",
    photoDescription: "Czerniaków in his office, the exhaustion of impossible choices"
  };

  return (
    <section id="chapter-4" className="chapter chapter-4" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-marker">Chapter IV</span>
          <span className="chapter-date">1939 — 1942</span>
          <h2 className="chapter-title">The Ghettos</h2>
          <p className="chapter-metaphor">
            The holding pen—where starvation and disease did the Nazis&apos; work before the gas chambers were ready.
          </p>
        </header>
        
        <div className="chapter-intro">
          <p>
            When the war began, the Nazis confined Jews to ghettos—walled sections of cities 
            where hundreds of thousands were compressed into streets meant for thousands.
          </p>
        </div>
        
        <div className="statistics-block ghetto-stats">
          <div className="stat">
            <span className="stat-value">400,000</span>
            <span className="stat-label">people in Warsaw Ghetto</span>
          </div>
          <div className="stat">
            <span className="stat-value">1.3</span>
            <span className="stat-label">square miles</span>
          </div>
          <div className="stat">
            <span className="stat-value">184</span>
            <span className="stat-label">calories per day (official ration)</span>
          </div>
          <div className="stat">
            <span className="stat-value">83,000</span>
            <span className="stat-label">died before deportations</span>
          </div>
        </div>
        
        <div className="chapter-text">
          <p>
            The ghettos were designed to kill through calculated neglect. Disease spread through 
            crowded, unsanitary conditions. In Warsaw, 83,000 Jews died of starvation and disease 
            before the deportations to death camps began.
          </p>
          <p>
            And yet, <strong>life persisted</strong>. Secret schools operated. Underground newspapers 
            circulated. The historian Emanuel Ringelblum and his team documented everything—
            collecting tens of thousands of documents, buried in milk cans and metal boxes, hidden for posterity.
          </p>
          
          <blockquote className="voice-eternal">
            <p>&ldquo;We know what awaits us. But we want the world to read and know.&rdquo;</p>
            <cite>— Emanuel Ringelblum</cite>
          </blockquote>
        </div>
        
        <div className="dual-profiles">
          <FigureProfile figure={ringelblum} image={chapter4Images[2]} />
          <FigureProfile figure={czerniakow} delay={150} />
        </div>
      </div>
      
      {/* Scroll-Lock Sequence: "The Shrinking World" */}
      <div 
        ref={containerRef}
        className="scroll-lock-sequence shrinking-world"
        style={{ height: "250vh" }}
        id="seq-shrinking-world"
      >
        <a href="#chapter-5" className="skip-sequence">Skip to next chapter</a>
        <div className="sequence-pinned">
          <div className="warsaw-map">
            <div className="city-outline" />
            
            {/* Ghetto walls appear and shrink */}
            <div 
              className="ghetto-walls"
              style={{
                transform: `scale(${1 - progress * 0.3})`,
                opacity: progress > 0.25 ? 1 : 0
              }}
            >
              <div className="wall north" />
              <div className="wall south" />
              <div className="wall east" />
              <div className="wall west" />
            </div>
            
            {progress > 0.75 && (
              <div className="ghetto-statistics">
                <span className="ghetto-stat">400,000 people</span>
                <span className="ghetto-stat">1.3 square miles</span>
                <span className="ghetto-stat-emphasis">The impossibility of the numbers.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 5: THE FINAL SOLUTION ====================

const Chapter5: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  const { containerRef, progress, isPinned } = useScrollLock(3);
  
  const levi: Figure = {
    name: "Primo Levi",
    epithet: "The Chemist Who Testified",
    facts: [
      "Italian Jewish chemist deported to Auschwitz in 1944",
      "Survived as slave labor in a chemical plant",
      "Wrote If This Is a Man, one of the essential accounts",
      "Died in 1987"
    ],
    quote: "It happened, therefore it can happen again. This is the core of what we have to say.",
    photoDescription: "Levi in later years, the survivor's burden in his eyes"
  };
  
  const frank: Figure = {
    name: "Anne Frank",
    epithet: "The Voice That Survived",
    facts: [
      "German-Jewish girl who hid in Amsterdam for two years",
      "Diary discovered and published after her death",
      "Died in Bergen-Belsen, weeks before liberation, age 15",
      "Her diary has been read by tens of millions"
    ],
    quote: "In spite of everything, I still believe that people are really good at heart.",
    photoDescription: "Anne Frank's famous portrait—the face of innocence destroyed"
  };
  
  const wiesel: Figure = {
    name: "Elie Wiesel",
    epithet: "The Witness Who Would Not Be Silent",
    facts: [
      "Deported to Auschwitz at 15, survived Buchenwald",
      "Wrote Night, the defining memoir of Holocaust experience",
      "Nobel Peace Prize, 1986",
      "Dedicated life to testimony, human rights"
    ],
    quote: "To forget the dead would be akin to killing them a second time.",
    photoDescription: "Wiesel as a young survivor, and in later years"
  };

  return (
    <section id="chapter-5" className="chapter chapter-5" ref={ref}>
      {/* Chapter-specific content warning */}
      <div className="chapter-warning">
        <p>
          <strong>Content Warning:</strong> This chapter contains descriptions of mass murder. 
          The photographs are selected to convey scale and horror without gratuitous display 
          of victims&apos; suffering.
        </p>
      </div>
      
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-marker">Chapter V</span>
          <span className="chapter-date">1941 — 1945</span>
          <h2 className="chapter-title">The Final Solution</h2>
          <p className="chapter-metaphor">
            The machinery—industrial murder, designed for efficiency, executed with bureaucratic precision.
          </p>
        </header>
        
        <div className="chapter-intro">
          <p>
            On January 20, 1942, fifteen Nazi officials met at a villa in Wannsee, a suburb of Berlin. 
            Over lunch, they coordinated the bureaucratic details of genocide. They called it 
            <strong> &ldquo;the Final Solution to the Jewish Question.&rdquo;</strong>
          </p>
        </div>
        
        <div className="chapter-text">
          <p>
            The death camps—Auschwitz-Birkenau, Treblinka, Sobibor, Belzec, Chelmno, Majdanek—were 
            designed for one purpose: industrial murder. Trains arrived daily. SS doctors performed 
            &ldquo;selections&rdquo; on the platform—left to labor, right to death. Most went right.
          </p>
          <p>
            At Auschwitz, up to <strong>6,000 people were gassed and cremated every day</strong>.
          </p>
          <p>
            This was not madness. <strong>This was bureaucracy.</strong> Train schedules were coordinated. 
            Zyklon B was ordered in quantities. Gold teeth were extracted, hair was collected, 
            possessions were sorted. The genocide was administered like any other government program.
          </p>
        </div>
        
        <div className="statistics-block final-solution-stats">
          <div className="stat">
            <span className="stat-value">6,000,000</span>
            <span className="stat-label">Jews murdered</span>
          </div>
          <div className="stat">
            <span className="stat-value">200,000-500,000</span>
            <span className="stat-label">Roma murdered</span>
          </div>
          <div className="stat">
            <span className="stat-value">17,000,000+</span>
            <span className="stat-label">total victims (including POWs, disabled, others)</span>
          </div>
        </div>
        
        <div className="witnesses-gallery">
          <h3 className="gallery-title">The Witnesses</h3>
          <div className="gallery-grid">
            <FigureProfile figure={levi} image={chapter5Images[4]} />
            <FigureProfile figure={frank} image={chapter5Images[2]} delay={100} />
            <FigureProfile figure={wiesel} image={chapter5Images[3]} delay={200} />
          </div>
        </div>
      </div>
      
      {/* Scroll-Lock Sequence: "The Selection" — handled with extreme care */}
      <div 
        ref={containerRef}
        className="scroll-lock-sequence the-selection"
        style={{ height: "300vh" }}
        id="seq-the-selection"
      >
        <a href="#chapter-6" className="skip-sequence">Skip to next chapter</a>
        <div className="sequence-pinned">
          <div className="selection-scene">
            {/* Phase 1: Train arrives */}
            <div 
              className="selection-phase train-arrives"
              style={{ opacity: progress < 0.25 ? 1 : 0 }}
            >
              <div className="train-tracks" />
              <div className="train-silhouette" />
              <p className="phase-text">The train arrives. Doors slide open.</p>
            </div>
            
            {/* Phase 2: Figures emerge */}
            <div 
              className="selection-phase figures-emerge"
              style={{ opacity: progress >= 0.25 && progress < 0.50 ? 1 : 0 }}
            >
              <div className="platform-crowd" />
              <p className="phase-text">Figures emerge. Confusion. Fear.</p>
            </div>
            
            {/* Phase 3: The line advances */}
            <div 
              className="selection-phase line-advances"
              style={{ opacity: progress >= 0.50 && progress < 0.75 ? 1 : 0 }}
            >
              <div className="selection-line">
                <div className="line-left" />
                <div className="line-right" />
              </div>
              <p className="phase-text">The line advances. Left or right. The arbitrariness of survival.</p>
            </div>
            
            {/* Phase 4: The divergence */}
            <div 
              className="selection-phase divergence"
              style={{ opacity: progress >= 0.75 ? 1 : 0 }}
            >
              <div className="two-paths">
                <div className="path-labor">
                  <span>To the barracks</span>
                </div>
                <div className="path-death">
                  <span>To the smoke rising in the distance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 6: RESISTANCE ====================

const Chapter6: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  const { containerRef, progress, isPinned } = useScrollLock(2.5);
  
  const anielewicz: Figure = {
    name: "Mordechai Anielewicz",
    epithet: "The Commander Who Knew He Would Die",
    facts: [
      "Leader of the Jewish Fighting Organization (ZOB) in Warsaw",
      "Organized the Warsaw Ghetto Uprising at age 24",
      "Knew the revolt could not succeed; fought anyway",
      "Died in the bunker at Mila 18, May 8, 1943"
    ],
    quote: "We will die like human beings.",
    photoDescription: "Anielewicz in the ghetto, young face, ancient eyes"
  };
  
  const wallenberg: Figure = {
    name: "Raoul Wallenberg",
    epithet: "The Diplomat Who Saved Tens of Thousands",
    facts: [
      "Swedish diplomat in Budapest, 1944",
      "Issued thousands of protective \"Schutzpässe\"",
      "Pulled Jews off deportation trains",
      "Saved an estimated 100,000 Hungarian Jews",
      "Arrested by Soviets in 1945, fate unknown"
    ],
    photoDescription: "Wallenberg in Budapest, the face of righteous courage"
  };
  
  const schindler: Figure = {
    name: "Oskar Schindler",
    epithet: "The Profiteer Who Became a Savior",
    facts: [
      "German industrialist and Nazi Party member",
      "Employed Jews in his factories to protect them",
      "Saved over 1,200 Jews from Auschwitz and Płaszów",
      "Spent his fortune bribing officials to keep his workers alive"
    ],
    quote: "Whoever saves one life, saves the world entire.",
    photoDescription: "Schindler with some of his surviving workers, post-war"
  };

  return (
    <section id="chapter-6" className="chapter chapter-6" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-marker">Chapter VI</span>
          <span className="chapter-date">1942 — 1945</span>
          <h2 className="chapter-title">Resistance</h2>
          <p className="chapter-metaphor">
            The flame that would not die—human dignity asserting itself even in the face of certain death.
          </p>
        </header>
        
        <div className="chapter-intro">
          <p>
            Resistance took many forms. There was armed resistance—the Warsaw Ghetto Uprising 
            of April 1943, when a few hundred fighters with pistols and homemade bombs held off 
            the German army for <strong>nearly a month</strong>.
          </p>
        </div>
        
        <div className="chapter-text">
          <p>
            But resistance was also survival. It was Ringelblum burying his archive. It was 
            parents teaching children in secret schools. It was maintaining religious observance 
            in the camps. It was choosing how to die when death was certain.
          </p>
          <p>
            And there were non-Jews who risked everything. Raoul Wallenberg in Budapest. 
            Oskar Schindler. Thousands of unknown helpers—hiding Jews in attics, barns, convents, 
            at risk of death for themselves and their families.
          </p>
          
          <blockquote className="voice-eternal">
            <p>They could not stop the Holocaust. But they proved that even in the darkest hour, 
            human beings are capable of courage and compassion.</p>
          </blockquote>
        </div>
        
        <div className="resistance-profiles">
          <FigureProfile figure={anielewicz} image={chapter6Images[1]} />
          <div className="righteous-section">
            <h3 className="section-label">Righteous Among the Nations</h3>
            <FigureProfile figure={wallenberg} image={chapter6Images[2]} delay={100} />
            <FigureProfile figure={schindler} image={chapter6Images[3]} delay={200} />
          </div>
        </div>
      </div>
      
      {/* Scroll-Lock Sequence: "The Last Stand" */}
      <div 
        ref={containerRef}
        className="scroll-lock-sequence last-stand"
        style={{ height: "250vh" }}
        id="seq-last-stand"
      >
        <a href="#chapter-7" className="skip-sequence">Skip to next chapter</a>
        <div className="sequence-pinned">
          <div className="uprising-scene">
            <div className="ghetto-buildings">
              {/* Buildings progressively burn */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div 
                  key={i}
                  className={`building ${progress > (i * 0.1 + 0.2) ? "burning" : ""}`}
                />
              ))}
            </div>
            
            <div className="uprising-timeline">
              {progress < 0.3 && (
                <p className="timeline-event">April 19, 1943 — German forces enter the ghetto</p>
              )}
              {progress >= 0.3 && progress < 0.6 && (
                <p className="timeline-event">Fighting escalates — Jewish fighters engage</p>
              )}
              {progress >= 0.6 && progress < 0.85 && (
                <p className="timeline-event">The ghetto burns, but resistance continues</p>
              )}
              {progress >= 0.85 && (
                <div className="timeline-conclusion">
                  <p className="timeline-event">May 16, 1943 — The Great Synagogue is destroyed</p>
                  <blockquote className="uprising-quote">
                    <p>&ldquo;We did not save ourselves. We saved Jewish honor.&rdquo;</p>
                  </blockquote>
                  <p className="days-count">27 days of resistance.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 7: LIBERATION ====================

const Chapter7: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  const { containerRef, progress, isPinned } = useScrollLock(2.5);
  
  const wiesenthal: Figure = {
    name: "Simon Wiesenthal",
    epithet: "The Hunter of Nazis",
    facts: [
      "Survived Mauthausen concentration camp",
      "Dedicated his life to tracking Nazi war criminals",
      "Helped bring over 1,100 Nazis to justice, including Adolf Eichmann"
    ],
    quote: "Survival is a privilege which entails obligations. I am forever asking myself what I can do for those who have not survived.",
    photoDescription: "Wiesenthal in his office, surrounded by files, the persistence of justice"
  };
  
  const frankl: Figure = {
    name: "Viktor Frankl",
    epithet: "The Psychiatrist Who Found Meaning",
    facts: [
      "Austrian psychiatrist deported to Auschwitz",
      "Lost his wife, mother, brother in the camps",
      "Wrote Man's Search for Meaning, one of the most influential books of the 20th century"
    ],
    quote: "Those who have a 'why' to live can bear with almost any 'how'.",
    photoDescription: "Frankl in later years, the survivor who helped others survive their own darkness"
  };

  return (
    <section id="chapter-7" className="chapter chapter-7" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-marker">Chapter VII</span>
          <span className="chapter-date">1944 — 1946</span>
          <h2 className="chapter-title">Liberation</h2>
          <p className="chapter-metaphor">
            The light that revealed horror—the camps opened, the world saw, and the witnesses began to speak.
          </p>
        </header>
        
        <div className="chapter-intro">
          <p>
            Soviet forces reached Majdanek in July 1944. Auschwitz was liberated on January 27, 1945—
            now commemorated as <strong>International Holocaust Remembrance Day</strong>.
          </p>
        </div>
        
        <div className="chapter-text">
          <p>
            What the soldiers found defied comprehension. General Eisenhower ordered every available 
            camera to document the horrors, predicting that future generations would deny.
          </p>
          
          <blockquote className="historic-quote">
            <p>
              &ldquo;Get it all on record now. Get the films. Get the witnesses. Because somewhere down 
              the road of history, some bastard will get up and say that this never happened.&rdquo;
            </p>
            <cite>— General Dwight D. Eisenhower</cite>
          </blockquote>
          
          <p>
            For survivors, liberation was not the end. They emerged into a world where their families 
            had been murdered, their homes occupied, their communities erased. Many spent years in 
            displaced persons camps. The psychological wounds would never fully heal.
          </p>
        </div>
        
        <div className="dual-profiles">
          <FigureProfile figure={wiesenthal} image={chapter7Images[2]} />
          <FigureProfile figure={frankl} image={chapter7Images[3]} delay={150} />
        </div>
      </div>
      
      {/* Scroll-Lock Sequence: "The Gates Open" */}
      <div 
        ref={containerRef}
        className="scroll-lock-sequence gates-open"
        style={{ height: "250vh" }}
        id="seq-gates-open"
      >
        <a href="#chapter-8" className="skip-sequence">Skip to next chapter</a>
        <div className="sequence-pinned">
          <div className="gates-scene">
            {/* The gates of Auschwitz, from inside */}
            <div className="auschwitz-gates">
              <div 
                className="gate left-gate"
                style={{ transform: `translateX(${-progress * 40}%)` }}
              />
              <div 
                className="gate right-gate"
                style={{ transform: `translateX(${progress * 40}%)` }}
              />
              <span className="gate-text">ARBEIT MACHT FREI</span>
            </div>
            
            {/* Light streams in */}
            <div 
              className="liberation-light"
              style={{ opacity: progress * 1.5 }}
            />
            
            {/* Survivor faces appear */}
            {progress > 0.7 && (
              <div className="survivor-faces">
                <p className="faces-caption">
                  Faces of survivors. Their names, if known.
                  <br />
                  <em>The living testimony.</em>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 8: NEVER FORGET ====================

const Chapter8: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  const { containerRef, progress, isPinned } = useScrollLock(3);

  return (
    <section id="chapter-8" className="chapter chapter-8" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-marker">Chapter VIII</span>
          <span className="chapter-date">1945 — Present</span>
          <h2 className="chapter-title">Never Forget</h2>
          <p className="chapter-metaphor">
            The candle passed forward—memory as sacred duty, testimony as resistance to oblivion.
          </p>
        </header>
        
        <div className="chapter-intro">
          <p>
            In 1945, there were millions of survivors. Today, there are fewer than 
            <strong> 250,000 worldwide</strong>—most over 80 years old. Within a decade, 
            there will be no living witnesses.
          </p>
          <p className="urgency-statement">
            The question of memory becomes urgent: <em>Who will remember when those who 
            experienced it are gone?</em>
          </p>
        </div>
        
        <div className="chapter-text">
          <p>
            This is not merely historical interest. <strong>Antisemitism is rising worldwide.</strong> 
            Holocaust denial persists. The lessons of the Shoah—about the dangers of dehumanization, 
            propaganda, bystander silence, the fragility of democracy—remain urgently relevant.
          </p>
          
          <blockquote className="voice-eternal">
            <p>To remember is an act of resistance. To speak the names is to refuse erasure. 
            To learn the history is to accept the obligation: this must never happen again. 
            Not to Jews. Not to anyone.</p>
          </blockquote>
          
          <p>
            The Holocaust was not inevitable. It was chosen—by perpetrators, by collaborators, 
            by bystanders who did nothing. And it was resisted—by fighters, by rescuers, by 
            those who maintained their humanity in inhuman conditions.
          </p>
          <p>
            The question is not only &ldquo;How could this happen?&rdquo; but <strong>&ldquo;How do we ensure 
            it never happens again?&rdquo;</strong>
          </p>
        </div>
      </div>
      
      {/* Scroll-Lock Sequence: "The Name Scroll" */}
      <div 
        ref={containerRef}
        className="scroll-lock-sequence name-scroll"
        style={{ height: "350vh" }}
        id="seq-name-scroll"
      >
        <a href="#sources" className="skip-sequence">Skip to sources</a>
        <div className="sequence-pinned">
          <div className="names-container">
            <div className="names-scroll" style={{ transform: `translateY(${-progress * 200}%)` }}>
              {/* Names scroll continuously — symbolic representation */}
              {[
                "Abramowitz, Sarah", "Adler, Josef", "Altman, Miriam", "Auerbach, David",
                "Berger, Hannah", "Bergman, Isaac", "Blum, Rachel", "Brandt, Abraham",
                "Cohen, Esther", "Davidowitz, Solomon", "Edelstein, Ruth", "Eisenberg, Max",
                "Feinberg, Leah", "Feldman, Samuel", "Fischer, Anna", "Friedman, Jacob",
                "Goldberg, Rebecca", "Goldstein, Benjamin", "Greenbaum, Ida", "Gross, Nathan",
                "Halpern, Dora", "Hirsch, Emanuel", "Hoffman, Clara", "Horowitz, Meyer",
                "Isaacs, Eva", "Jacobson, Leo", "Kahn, Bessie", "Kaplan, Morris",
                "Klein, Rosa", "Kohn, Simon", "Levi, Maria", "Levin, Bernard",
                "Lieberman, Fanny", "Mandel, Herman", "Marcus, Pauline", "Mayer, Ludwig",
                "Neumann, Helene", "Oppenheim, Fritz", "Perl, Gertrude", "Pollak, Karl",
                "Rabinowitz, Chana", "Reich, Otto", "Rosen, Frieda", "Rosenbaum, Arthur",
                "Rothschild, Margot", "Rubinstein, Wolf", "Schiff, Edith", "Schneider, Hans",
                "Schwartz, Greta", "Segal, Mordechai", "Shapiro, Bella", "Silberman, Heinrich",
                "Singer, Lotte", "Stein, Viktor", "Stern, Ilse", "Strauss, Werner",
                "Vogel, Thea", "Wasserman, Kurt", "Weinberg, Paula", "Weiss, Erich",
                "Wexler, Yetta", "Zimmerman, Felix", "Zuckerman, Rivka"
              ].map((name, i) => (
                <span key={i} className="victim-name">{name}</span>
              ))}
              <span className="names-ellipsis">...</span>
            </div>
            
            {progress > 0.9 && (
              <div className="names-conclusion">
                <p className="conclusion-text">
                  We cannot name them all.
                  <br />
                  <strong>But we must try.</strong>
                </p>
                <p className="conclusion-count">
                  Six million names would take years to read.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Final Candle Lighting */}
      <div className="final-candle-sequence">
        <div className="candles-spreading">
          <div className="primary-candle">
            <div className="final-flame" />
          </div>
          <div className="spreading-candles">
            {Array.from({ length: 7 }).map((_, i) => (
              <div 
                key={i}
                className="spread-candle"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <div className="spread-flame" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="final-message">
          <blockquote className="talmud-quote">
            <p>&ldquo;Whoever saves one life, saves the world entire.&rdquo;</p>
            <cite>— Talmud, Sanhedrin 37a</cite>
          </blockquote>
          
          <blockquote className="wiesel-quote">
            <p>&ldquo;Never shall I forget.&rdquo;</p>
            <cite>— Elie Wiesel</cite>
          </blockquote>
          
          <p className="flame-handoff">
            <em>Now the flame is yours to carry.</em>
          </p>
        </div>
      </div>
    </section>
  );
};

// ==================== SOURCES SECTION ====================

const SourcesSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  
  const sources = [
    {
      category: "Archives & Primary Sources",
      items: [
        "United States Holocaust Memorial Museum (USHMM), Washington D.C.",
        "Yad Vashem, Jerusalem",
        "Memorial and Museum Auschwitz-Birkenau",
        "Bundesarchiv (German Federal Archives)",
        "Ghetto Fighters' House Archives",
        "YIVO Institute for Jewish Research",
        "USC Shoah Foundation Visual History Archive",
        "Wiener Holocaust Library, London"
      ]
    },
    {
      category: "Essential Works",
      items: [
        "Elie Wiesel, \"Night\" (1960)",
        "Primo Levi, \"If This Is a Man\" (1947)",
        "Anne Frank, \"The Diary of a Young Girl\" (1947)",
        "Viktor Frankl, \"Man's Search for Meaning\" (1946)",
        "Raul Hilberg, \"The Destruction of the European Jews\" (1961)",
        "Hannah Arendt, \"Eichmann in Jerusalem\" (1963)"
      ]
    },
    {
      category: "Historical Resources",
      items: [
        "United States Holocaust Memorial Museum - Holocaust Encyclopedia",
        "Yad Vashem - The World Holocaust Remembrance Center",
        "USC Shoah Foundation - Visual History Archive",
        "International Holocaust Remembrance Alliance (IHRA)"
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
        
        <div className="crisis-resources">
          <h3>Crisis Resources</h3>
          <p>
            If you or someone you know is struggling after engaging with this content:
          </p>
          <ul className="resource-list">
            <li>Crisis Text Line: Text HOME to 741741</li>
            <li>National Suicide Prevention Lifeline: 988</li>
            <li>International Association for Suicide Prevention: <a href="https://www.iasp.info/resources/Crisis_Centres/" target="_blank" rel="noopener noreferrer">Crisis Centers</a></li>
          </ul>
        </div>
        
        <div className="memorial-note">
          <p className="hebrew-blessing">זכרונם לברכה</p>
          <p className="blessing-translation">May their memory be a blessing.</p>
        </div>
      </div>
    </section>
  );
};

// ==================== MAIN COMPONENT ====================

const HolocaustClient: React.FC = () => {
  const globalProgress = useGlobalScrollProgress();

  return (
    <article className="holocaust-memorial-essay" aria-label="Never Forget: Bearing Witness to the Holocaust">
      {/* Skip Link for Accessibility */}
      <a href="#chapter-1" className="skip-link">
        Skip to content
      </a>
      
      {/* Memorial Candle Progress Bar */}
      <MemorialCandleProgress progress={globalProgress} />
      
      {/* Essay Sections */}
      <HeroSection />
      <Chapter1 />
      <Chapter2 />
      <Chapter3 />
      <Chapter4 />
      <Chapter5 />
      <Chapter6 />
      <Chapter7 />
      <Chapter8 />
      <SourcesSection />
      
      {/* Skip to top */}
      <button 
        className="scroll-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Return to beginning"
        style={{ opacity: globalProgress > 0.1 ? 1 : 0 }}
      >
        ↑
      </button>
    </article>
  );
};

export default HolocaustClient;













