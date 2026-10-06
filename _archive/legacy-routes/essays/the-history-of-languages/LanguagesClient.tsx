"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import "./the-history-of-languages.css";
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
  languageFamilyData,
  writingSystemsTimeline,
  endangeredLanguagesData,
  type LanguageImage,
} from "./images";

// ============================================================================
// DESIGN PHILOSOPHY: THE HISTORY OF LANGUAGES
// ============================================================================
// This visual essay traces humanity's greatest invention—language—from
// prehistoric sounds to 7,000 living tongues. The experience uses flowing,
// organic animations that evoke the natural spread of languages across
// continents. We speak to readers from every corner of the world, using
// universal themes: the first word a child speaks, the pain of losing a
// language, the wonder of understanding someone from a distant land.
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
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

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

// ==================== SCROLL PROGRESS INDICATOR ====================

const LanguageScrollProgress: React.FC<{ progress: number }> = ({ progress }) => {
  const chapters = [
    { id: "chapter-1", label: "I" },
    { id: "chapter-2", label: "II" },
    { id: "chapter-3", label: "III" },
    { id: "chapter-4", label: "IV" },
    { id: "chapter-5", label: "V" },
    { id: "chapter-6", label: "VI" },
    { id: "chapter-7", label: "VII" },
    { id: "chapter-8", label: "VIII" },
  ];

  const scrollToChapter = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="language-scroll-progress" role="navigation" aria-label="Reading progress">
      <div className="chapter-dots">
        {chapters.map((chapter, i) => {
          const chapterProgress = i / chapters.length;
          return (
            <button
              key={chapter.id}
              className={`chapter-dot ${progress >= chapterProgress ? 'active' : ''}`}
              onClick={() => scrollToChapter(chapter.id)}
              aria-label={`Jump to Chapter ${chapter.label}`}
              title={`Chapter ${chapter.label}`}
            />
          );
        })}
      </div>
      <div className="scroll-track">
        <div 
          className="scroll-fill" 
          style={{ height: `${progress * 100}%` }}
        />
      </div>
      <span className="scroll-label">Progress</span>
    </div>
  );
};

// ==================== ARCHIVAL PHOTO COMPONENT ====================

interface ArchivalPhotoProps {
  image?: LanguageImage;
  alt?: string;
  caption?: string;
  source?: string;
  date?: string;
  era?: "ancient" | "classical" | "medieval" | "modern";
  className?: string;
}

const ArchivalPhoto: React.FC<ArchivalPhotoProps> = ({
  image,
  alt: altProp,
  caption: captionProp,
  source: sourceProp,
  date: dateProp,
  era = "modern",
  className = "",
}) => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  
  const src = image?.src;
  const alt = image?.alt || altProp || "";
  const caption = image?.caption || captionProp || "";
  const source = image?.source || sourceProp || "";
  const date = image?.date || dateProp;
  
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

// ==================== FIGURE PROFILE COMPONENT ====================

interface FigureProfileProps {
  figure: Figure;
  image?: LanguageImage;
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
      </div>
    </article>
  );
};

// ==================== HERO SECTION: THE FIRST WORD ====================

// Pre-generated deterministic values for particles (avoids hydration mismatch)
const VOID_PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  left: ((i * 37 + 13) % 100),
  top: ((i * 53 + 29) % 100),
  delay: ((i * 17) % 40) / 10,
  scale: 0.5 + ((i * 23) % 50) / 100,
}));

const HeroSection: React.FC = () => {
  const [animationStage, setAnimationStage] = useState(0);
  
  useEffect(() => {
    // Staged animation sequence
    const timers = [
      setTimeout(() => setAnimationStage(1), 500),   // First word fades in
      setTimeout(() => setAnimationStage(2), 2000),  // Sound waves
      setTimeout(() => setAnimationStage(3), 3500),  // Title reveals
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <header className="hero-section">
      {/* Background particles */}
      <div className="hero-particles">
        {VOID_PARTICLES.map((particle, i) => (
          <div
            key={i}
            className="void-particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              transform: `scale(${particle.scale})`
            }}
          />
        ))}
      </div>

      {/* Sound waves emanating from center */}
      <div className={`hero-sound-waves ${animationStage >= 2 ? 'active' : ''}`}>
        <div className="sound-wave" />
        <div className="sound-wave" />
        <div className="sound-wave" />
        <div className="sound-wave" />
      </div>

      {/* Central content */}
      <div className="hero-content">
        {/* The first word */}
        <div className={`hero-first-word ${animationStage >= 1 ? 'visible' : ''}`}>
          <span className="first-word">Mama</span>
          <span className="word-meaning">The word that every language shares</span>
        </div>

        {/* Main title */}
        <div className={`hero-title-container ${animationStage >= 3 ? 'visible' : ''}`}>
          <h1 className="hero-title">The History of Languages</h1>
          <p className="hero-subtitle">
            From the first human utterance to 7,000 living tongues—the story of how we learned to share our minds
          </p>
          <div className="hero-meta">
            <span>100,000 years</span>
            <span>•</span>
            <span>7,000 languages</span>
            <span>•</span>
            <span>8 billion speakers</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`scroll-indicator ${animationStage >= 3 ? 'visible' : ''}`}>
        <span>Scroll to explore</span>
        <div className="scroll-line" />
      </div>
    </header>
  );
};

// ==================== CHAPTER 1: THE DAWN OF SPEECH ====================

const Chapter1: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  const { containerRef, progress } = useScrollLock(1.5); // 150vh = ~1350px scroll depth

  return (
    <section id="chapter-1" className="chapter chapter-1" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-marker">Chapter I</span>
          <span className="chapter-date">100,000 BCE — 40,000 BCE</span>
          <h2 className="chapter-title">The Dawn of Speech</h2>
          <p className="chapter-metaphor">
            In the darkness before history, a sound became a meaning—and everything changed.
          </p>
        </header>

        <div className="chapter-intro">
          <p>
            Picture a group of early humans huddled around a fire on the African savanna, perhaps 
            100,000 years ago. One points to the sky and makes a sound. Another understands. 
            <strong> In that moment, the world changed forever.</strong>
          </p>
          <p>
            We don&apos;t know what the first word was. We never will. But we know this: somewhere 
            in our past, humans developed the ability to assign arbitrary sounds to meanings—and 
            to share those meanings with others.
          </p>
        </div>

        <div className="photo-grid">
          <ArchivalPhoto image={chapter1Images[1]} era="ancient" />
          <ArchivalPhoto image={chapter1Images[0]} era="ancient" />
        </div>

        <div className="chapter-text">
          <p>
            This wasn&apos;t just learning to communicate—animals do that. This was learning to 
            <em> think in symbols</em>. To represent the world in sounds. To share not just 
            &ldquo;danger!&rdquo; but &ldquo;there was danger yesterday, at the river, and it might 
            come back tomorrow.&rdquo;
          </p>
          
          <blockquote className="voice-eternal">
            <p>Language didn&apos;t just let us describe the world. It let us imagine worlds that 
            don&apos;t exist—and then build them.</p>
          </blockquote>

          <p>
            Scientists call this &ldquo;recursion&rdquo;—the ability to embed ideas within ideas, 
            to say not just &ldquo;the man&rdquo; but &ldquo;the man who saw the lion that killed 
            the zebra that drank from the river.&rdquo; No other species has this. It&apos;s what 
            makes us human.
          </p>
        </div>

        <div className="statistics-block">
          <div className="stat">
            <span className="stat-value">100,000+</span>
            <span className="stat-label">years of spoken language</span>
          </div>
          <div className="stat">
            <span className="stat-value">~5,000</span>
            <span className="stat-label">years of written language</span>
          </div>
          <div className="stat">
            <span className="stat-value">7,168</span>
            <span className="stat-label">languages alive today</span>
          </div>
        </div>
      </div>

      {/* Photo-based Scroll Sequence: "The Spread of Speech" */}
      <div 
        ref={containerRef}
        className="scroll-lock-sequence speech-spread"
        style={{ height: "150vh" }}
        id="seq-speech-spread"
      >
        <a href="#chapter-2" className="skip-sequence">Skip to next chapter</a>
        <div className="sequence-pinned">
          {/* Progress bar at bottom */}
          <div 
            className="scroll-progress-bar"
            style={{ width: `${progress * 100}%` }}
          />
          
          {/* NASA Blue Marble Earth photo as background */}
          <div className="earth-photo-container">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/c/cb/The_Blue_Marble_%28remastered%29.jpg"
              alt="NASA Blue Marble photograph of Earth showing Africa"
              className="earth-photo"
              style={{
                transform: `scale(${1 + progress * 0.2})`,
                filter: `brightness(${0.6 + progress * 0.3}) saturate(${1 + progress * 0.2})`
              }}
            />
            
            {/* Animated pulse rings emanating from Africa */}
            <div className="migration-pulse-container">
              <div className={`origin-dot ${progress > 0.02 ? 'visible' : ''}`} />
              <div className={`pulse-ring ring-1 ${progress > 0.1 ? 'active' : ''}`} />
              <div className={`pulse-ring ring-2 ${progress > 0.25 ? 'active' : ''}`} />
              <div className={`pulse-ring ring-3 ${progress > 0.45 ? 'active' : ''}`} />
              <div className={`pulse-ring ring-4 ${progress > 0.65 ? 'active' : ''}`} />
            </div>
            
            {/* Progressive text narrative */}
            <div className="migration-narrative">
              <p className={`narrative-line ${progress >= 0 && progress < 0.25 ? 'visible' : ''}`}>
                Language begins in Africa...
              </p>
              <p className={`narrative-line ${progress >= 0.25 && progress < 0.5 ? 'visible' : ''}`}>
                Humans migrate north, carrying their tongues...
              </p>
              <p className={`narrative-line ${progress >= 0.5 && progress < 0.75 ? 'visible' : ''}`}>
                Spreading across Asia and Europe...
              </p>
              <p className={`narrative-line ${progress >= 0.75 ? 'visible' : ''}`}>
                Until every continent has voices.
              </p>
            </div>
            
            {/* Timeline markers */}
            <div className="migration-timeline">
              <span className={`timeline-marker ${progress > 0.05 ? 'active' : ''}`}>100,000 years ago</span>
              <span className={`timeline-marker ${progress > 0.35 ? 'active' : ''}`}>70,000 years ago</span>
              <span className={`timeline-marker ${progress > 0.65 ? 'active' : ''}`}>15,000 years ago</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 2: THE INVENTION OF WRITING ====================

const Chapter2: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  const { containerRef, progress } = useScrollLock(1.5); // 150vh = ~1350px scroll depth

  const champollion: Figure = {
    name: "Jean-François Champollion",
    epithet: "The Man Who Unlocked Egypt",
    facts: [
      "French scholar who deciphered Egyptian hieroglyphics in 1822",
      "Used the Rosetta Stone's three parallel texts as his key",
      "Dedicated his entire short life to this single puzzle",
      "Died at 41, having given humanity back 3,000 years of history"
    ],
    quote: "I've got it!",
    photoDescription: "Champollion studying the Rosetta Stone"
  };

  return (
    <section id="chapter-2" className="chapter chapter-2" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-marker">Chapter II</span>
          <span className="chapter-date">3400 BCE — 500 BCE</span>
          <h2 className="chapter-title">The Invention of Writing</h2>
          <p className="chapter-metaphor">
            When sounds became marks on clay, memory became immortal.
          </p>
        </header>

        <div className="chapter-intro">
          <p>
            For 95,000 years, language existed only in the air. Words were spoken, heard, and 
            gone. Everything that humans knew had to be memorized, passed from mouth to ear, 
            generation after generation.
          </p>
          <p>
            Then, around 3400 BCE in ancient Sumer (modern-day Iraq), someone pressed a wedge 
            into wet clay. <strong>Writing was born.</strong>
          </p>
        </div>

        <div className="photo-grid">
          <ArchivalPhoto image={chapter2Images[0]} era="ancient" />
          <ArchivalPhoto image={chapter2Images[1]} era="ancient" />
        </div>

        <div className="chapter-text">
          <p>
            The first writing wasn&apos;t poetry or philosophy—it was accounting. &ldquo;Five goats 
            delivered to the temple.&rdquo; But once humans could record words, they quickly realized 
            they could record <em>ideas</em>. Laws. Stories. Dreams.
          </p>
          
          <blockquote className="voice-eternal">
            <p>Writing is frozen speech. It lets the dead speak to the living, and the living 
            speak to the unborn.</p>
          </blockquote>

          <p>
            Writing emerged independently in at least four places: Mesopotamia (cuneiform), Egypt 
            (hieroglyphics), China (oracle bones), and Mesoamerica (Maya glyphs). Each developed 
            its own logic, its own beauty.
          </p>
        </div>

        <ArchivalPhoto image={chapter2Images[2]} era="classical" className="photo-full" />

        <FigureProfile figure={champollion} />

        <div className="script-samples">
          <div className="script-sample">
            <div className="script-glyph">𒀭</div>
            <div className="script-name">Cuneiform</div>
          </div>
          <div className="script-sample">
            <div className="script-glyph">𓂀</div>
            <div className="script-name">Hieroglyphic</div>
          </div>
          <div className="script-sample">
            <div className="script-glyph">甲</div>
            <div className="script-name">Chinese</div>
          </div>
          <div className="script-sample">
            <div className="script-glyph">Α</div>
            <div className="script-name">Greek</div>
          </div>
        </div>
      </div>

      {/* Scroll-Lock Sequence: "The Evolution of Scripts" */}
      <div
        ref={containerRef}
        className="scroll-lock-sequence writing-evolution"
        style={{ height: "150vh" }}
        id="seq-writing-evolution"
      >
        <a href="#chapter-3" className="skip-sequence">Skip to next chapter</a>
        <div className="sequence-pinned">
          {/* Progress bar */}
          <div 
            className="scroll-progress-bar"
            style={{ width: `${progress * 100}%` }}
          />
          
          <div className="writing-timeline-container">
            <div className="writing-timeline">
              <div className="timeline-track">
                <div className="timeline-fill" style={{ height: `${progress * 100}%` }} />
              </div>
              
              {writingSystemsTimeline.slice(0, 7).map((event, i) => {
                const eventProgress = (i + 0.5) / 7; // Offset so first shows at ~7% progress
                const isVisible = progress >= eventProgress;
                return (
                  <div 
                    key={event.system}
                    className={`timeline-event ${isVisible ? 'visible' : ''}`}
                  >
                    <div className="timeline-marker" />
                    <div className="event-content">
                      <span className="event-year">{event.year < 0 ? `${Math.abs(event.year)} BCE` : `${event.year} CE`}</span>
                      <span className="event-system">{event.system}</span>
                      <span className="event-region">{event.region}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 3: THE GREAT LANGUAGE FAMILIES ====================

const Chapter3: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  const [activeFamily, setActiveFamily] = useState(0);

  return (
    <section id="chapter-3" className="chapter chapter-3" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-marker">Chapter III</span>
          <span className="chapter-date">4000 BCE — Present</span>
          <h2 className="chapter-title">The Great Language Families</h2>
          <p className="chapter-metaphor">
            Like branches of a great tree, languages diverge from common roots—cousins across continents who share ancient words.
          </p>
        </header>

        <div className="chapter-intro">
          <p>
            Here&apos;s a remarkable fact: English and Hindi are related. So are Persian and Swedish, 
            Bengali and Portuguese. They all descend from a language spoken by nomads on the 
            steppes of Central Asia about 6,000 years ago. We call it <strong>Proto-Indo-European</strong>.
          </p>
          <p>
            No one knows exactly what Proto-Indo-European sounded like—it was never written down. 
            But by comparing its descendants, linguists have reconstructed hundreds of words. 
            The word for &ldquo;mother&rdquo; was something like <em>*méh₂tēr</em>—which became 
            <em> mater</em> in Latin, <em>mātar</em> in Sanskrit, <em>mother</em> in English.
          </p>
        </div>

        <div className="photo-grid">
          <ArchivalPhoto image={chapter3Images[0]} era="ancient" />
          <ArchivalPhoto image={chapter3Images[4]} era="medieval" />
        </div>

        <div className="chapter-text">
          <p>
            Indo-European is just one of hundreds of language families. <strong>Sino-Tibetan</strong> 
            connects Mandarin to Tibetan and Burmese. <strong>Niger-Congo</strong> links Swahili to 
            Yoruba to Zulu—over 1,500 languages across Africa. <strong>Austronesian</strong> spreads 
            from Madagascar to Hawaii, following ancient seafarers across the Pacific.
          </p>
        </div>

        {/* Language Family Wheel */}
        <div className="family-wheel-container">
          <div className="family-wheel">
            <svg className="wheel-svg" viewBox="0 0 300 300">
              {languageFamilyData.map((family, i) => {
                const startAngle = (i / languageFamilyData.length) * 360 - 90;
                const endAngle = ((i + 1) / languageFamilyData.length) * 360 - 90;
                const largeArc = endAngle - startAngle > 180 ? 1 : 0;
                
                const x1 = 150 + 120 * Math.cos(startAngle * Math.PI / 180);
                const y1 = 150 + 120 * Math.sin(startAngle * Math.PI / 180);
                const x2 = 150 + 120 * Math.cos(endAngle * Math.PI / 180);
                const y2 = 150 + 120 * Math.sin(endAngle * Math.PI / 180);
                
                return (
                  <path
                    key={family.family}
                    d={`M 150 150 L ${x1} ${y1} A 120 120 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={family.color}
                    className={`wheel-segment ${activeFamily === i ? 'active' : ''}`}
                    onClick={() => setActiveFamily(i)}
                    style={{ opacity: activeFamily === i ? 1 : 0.7 }}
                  />
                );
              })}
            </svg>
            <div className="wheel-center">
              <span className="wheel-center-title">Total</span>
              <span className="wheel-center-value">7,000+</span>
              <span className="wheel-center-label">languages</span>
            </div>
          </div>
          
          <div className="family-detail">
            <h3 className="family-name">{languageFamilyData[activeFamily].family}</h3>
            <div className="family-stats">
              <div className="family-stat">
                <span className="family-stat-value">{languageFamilyData[activeFamily].speakers}</span>
                <span className="family-stat-label">speakers</span>
              </div>
              <div className="family-stat">
                <span className="family-stat-value">{languageFamilyData[activeFamily].languages}</span>
                <span className="family-stat-label">languages</span>
              </div>
            </div>
            <p style={{ color: 'var(--lang-text-secondary)', marginBottom: '1rem' }}>
              {languageFamilyData[activeFamily].regions}
            </p>
            <div className="family-examples">
              {languageFamilyData[activeFamily].examples.map((ex) => (
                <span key={ex} className="family-example">{ex}</span>
              ))}
            </div>
          </div>
        </div>

        <blockquote className="voice-eternal">
          <p>Every language carries a world inside it—a way of seeing, a philosophy, a culture. 
          When a language dies, a window on the universe closes forever.</p>
        </blockquote>
      </div>
    </section>
  );
};

// ==================== CHAPTER 4: EMPIRES AND ALPHABETS ====================

const Chapter4: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  const { containerRef, progress } = useScrollLock(1.5); // 150vh = ~1350px scroll depth

  const sejong: Figure = {
    name: "King Sejong the Great",
    epithet: "The King Who Created an Alphabet",
    facts: [
      "Ruled the Joseon Dynasty of Korea (1418-1450)",
      "Invented Hangul in 1443—a systematic alphabet for the Korean people",
      "Designed it to be easy to learn, so commoners could read",
      "Hangul is considered one of the most scientifically designed writing systems"
    ],
    quote: "A wise man can acquaint himself with them before the morning is over; a stupid man can learn them in ten days.",
    photoDescription: "King Sejong presenting Hangul to his court"
  };

  return (
    <section id="chapter-4" className="chapter chapter-4" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-marker">Chapter IV</span>
          <span className="chapter-date">1050 BCE — 1500 CE</span>
          <h2 className="chapter-title">Empires and Alphabets</h2>
          <p className="chapter-metaphor">
            Conquerors carried their languages on the tips of swords—but traders carried them 
            on the wings of commerce.
          </p>
        </header>

        <div className="chapter-intro">
          <p>
            Around 1050 BCE, Phoenician merchants along the Mediterranean developed something 
            revolutionary: <strong>the alphabet</strong>. Instead of hundreds of symbols like 
            Egyptian hieroglyphics or thousands like Chinese characters, they used just 22 marks—
            one for each consonant sound.
          </p>
          <p>
            This idea spread like wildfire. The Greeks borrowed it, adding vowels. The Romans 
            adapted the Greek version. Arabic developed its own. Today, most of the world&apos;s 
            writing systems trace back to those Phoenician traders.
          </p>
        </div>

        <div className="photo-grid">
          <ArchivalPhoto image={chapter4Images[0]} era="ancient" />
          <ArchivalPhoto image={chapter4Images[1]} era="medieval" />
        </div>

        <div className="chapter-text">
          <p>
            But the alphabet wasn&apos;t just about writing—it was about <em>power</em>. When 
            Alexander the Great conquered the known world, Greek became the language of learning 
            from Egypt to India. When Rome built its empire, Latin followed. The language of 
            rulers became the language of the ruled.
          </p>
          <p>
            Arabic spread with Islam from Spain to Indonesia. Sanskrit carried Hindu thought 
            across Southeast Asia. Chinese characters were adopted by Japanese, Korean, and 
            Vietnamese scholars.
          </p>
        </div>

        <FigureProfile figure={sejong} />

        <div className="translation-grid">
          <div className="translation-card">
            <div className="translation-word">Amor</div>
            <div className="translation-lang">Latin</div>
          </div>
          <div className="translation-card">
            <div className="translation-word">Amour</div>
            <div className="translation-lang">French</div>
          </div>
          <div className="translation-card">
            <div className="translation-word">Amor</div>
            <div className="translation-lang">Spanish</div>
          </div>
          <div className="translation-card">
            <div className="translation-word">Amore</div>
            <div className="translation-lang">Italian</div>
          </div>
          <div className="translation-card">
            <div className="translation-word">Amor</div>
            <div className="translation-lang">Portuguese</div>
          </div>
          <div className="translation-card">
            <div className="translation-word">Dragoste</div>
            <div className="translation-lang">Romanian</div>
          </div>
        </div>
      </div>

      {/* Scroll-Lock Sequence: "The Spread of Scripts" */}
      <div
        ref={containerRef}
        className="scroll-lock-sequence"
        style={{ height: "150vh" }}
        id="seq-alphabet-spread"
      >
        <a href="#chapter-5" className="skip-sequence">Skip to next chapter</a>
        <div className="sequence-pinned">
          <div className="world-map-container">
            <div style={{ textAlign: 'center', maxWidth: '700px' }}>
              <h3 style={{ 
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                color: 'var(--lang-text-primary)',
                marginBottom: '1rem'
              }}>
                One Alphabet, Many Scripts
              </h3>
              
              <div className="script-samples" style={{ justifyContent: 'center' }}>
                {[
                  { glyph: "A", name: "Latin", visible: progress > 0.1 },
                  { glyph: "Α", name: "Greek", visible: progress > 0.25 },
                  { glyph: "א", name: "Hebrew", visible: progress > 0.4 },
                  { glyph: "ا", name: "Arabic", visible: progress > 0.55 },
                  { glyph: "А", name: "Cyrillic", visible: progress > 0.7 },
                  { glyph: "અ", name: "Gujarati", visible: progress > 0.85 },
                ].map((script, i) => (
                  <div 
                    key={script.name}
                    className="script-sample"
                    style={{ 
                      opacity: script.visible ? 1 : 0.2,
                      transform: script.visible ? 'scale(1)' : 'scale(0.9)',
                      transition: 'all 0.4s ease',
                      transitionDelay: `${i * 50}ms`
                    }}
                  >
                    <div className="script-glyph">{script.glyph}</div>
                    <div className="script-name">{script.name}</div>
                  </div>
                ))}
              </div>
              
              <p style={{ 
                fontFamily: 'Source Serif Pro, serif',
                fontSize: '1.125rem',
                color: 'var(--lang-text-secondary)',
                marginTop: '2rem',
                fontStyle: 'italic'
              }}>
                {progress > 0.9 
                  ? "All descended from those 22 Phoenician letters."
                  : "Each script adapted to fit its language..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 5: COLONIZATION AND CHANGE ====================

const Chapter5: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section id="chapter-5" className="chapter chapter-5" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-marker">Chapter V</span>
          <span className="chapter-date">1500 CE — 1900 CE</span>
          <h2 className="chapter-title">Colonization and Change</h2>
          <p className="chapter-metaphor">
            Ships carried conquest across oceans—and languages landed on shores where they had never been spoken.
          </p>
        </header>

        <div className="chapter-intro">
          <p>
            In 1492, Columbus sailed west. Within a century, European powers had claimed vast 
            territories across the Americas, Africa, and Asia. They brought guns, disease, 
            missionaries—<strong>and their languages</strong>.
          </p>
          <p>
            Spanish swept across Latin America. Portuguese took root in Brazil and along the 
            coasts of Africa and Asia. English spread to North America, India, Australia, 
            and beyond. French colonized parts of every continent.
          </p>
        </div>

        <div className="photo-grid">
          <ArchivalPhoto image={chapter5Images[0]} era="modern" />
          <ArchivalPhoto image={chapter5Images[1]} era="modern" />
        </div>

        <div className="chapter-text">
          <p>
            This wasn&apos;t peaceful linguistic exchange. Colonial languages were often imposed 
            by force. Children were punished for speaking their mother tongues in school. 
            Indigenous languages were banned, mocked, erased.
          </p>
          <p>
            And yet—languages resisted. They survived in homes, in songs, in secret. They 
            blended with colonial tongues to create new languages: <strong>creoles</strong> and 
            <strong> pidgins</strong> that belong to neither colonizer nor colonized, but to 
            the communities that created them.
          </p>
          
          <blockquote className="voice-eternal">
            <p>To speak another&apos;s language is to enter their world. To lose your own is to 
            be exiled from your ancestors.</p>
          </blockquote>
        </div>

        <ArchivalPhoto image={chapter5Images[2]} era="modern" className="photo-full" />

        <div className="statistics-block">
          <div className="stat">
            <span className="stat-value">1,000+</span>
            <span className="stat-label">languages once spoken in the Americas</span>
          </div>
          <div className="stat">
            <span className="stat-value">~350</span>
            <span className="stat-label">survive today</span>
          </div>
          <div className="stat">
            <span className="stat-value">90%</span>
            <span className="stat-label">of African kids educated in colonial languages</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 6: ENDANGERED VOICES ====================

const Chapter6: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section id="chapter-6" className="chapter chapter-6 endangered-section" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-marker">Chapter VI</span>
          <span className="chapter-date">Present Day</span>
          <h2 className="chapter-title">Endangered Voices</h2>
          <p className="chapter-metaphor">
            Every two weeks, a language dies. With it goes a way of seeing, a library of 
            knowledge, a thread in the human tapestry.
          </p>
        </header>

        <div className="extinction-counter">
          <span className="counter-stat">43%</span>
          <p className="counter-label">
            of the world&apos;s languages are endangered
          </p>
        </div>

        <div className="chapter-intro">
          <p>
            Of the roughly 7,000 languages spoken today, <strong>half may vanish by the end of 
            this century</strong>. The last fluent speakers are aging. Young people are switching 
            to dominant languages like English, Mandarin, Spanish.
          </p>
          <p>
            When a language dies, it&apos;s not just words that are lost. It&apos;s the unique 
            knowledge encoded in those words—medicinal plants known only by their indigenous 
            names, ecological wisdom passed down for millennia, oral histories that were never 
            written down.
          </p>
        </div>

        <div className="endangered-grid">
          {endangeredLanguagesData.map((lang, i) => (
            <div 
              key={lang.name} 
              className={`endangered-card ${isVisible ? 'revealed' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="card-header">
                <h4 className="language-name">{lang.name}</h4>
                <span className={`status-badge status-${lang.status.toLowerCase().replace(' ', '-')}`}>
                  {lang.status}
                </span>
              </div>
              <div className="speaker-count">
                <span className="speaker-number">{lang.speakers}</span>
                <span className="speaker-label">speakers</span>
              </div>
              <p className="card-region">{lang.region}</p>
            </div>
          ))}
        </div>

        <div className="chapter-text" style={{ marginTop: 'var(--lang-space-lg)' }}>
          <blockquote className="voice-eternal">
            <p>Every language is a unique solution to the puzzle of being human. When we lose one, 
            we lose answers to questions we haven&apos;t yet learned to ask.</p>
          </blockquote>

          <p>
            But there is hope. Communities worldwide are fighting to revive their languages. 
            Welsh has grown from near-extinction to over half a million speakers. Hebrew was 
            resurrected as a living language after being dormant for centuries. Maori immersion 
            schools in New Zealand are creating a new generation of fluent speakers.
          </p>
        </div>

        <ArchivalPhoto image={chapter6Images[0]} era="modern" />
      </div>
    </section>
  );
};

// ==================== CHAPTER 7: THE DIGITAL AGE ====================

const Chapter7: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section id="chapter-7" className="chapter chapter-7" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-marker">Chapter VII</span>
          <span className="chapter-date">1990 — Present</span>
          <h2 className="chapter-title">The Digital Age</h2>
          <p className="chapter-metaphor">
            In the space of a generation, language leaped from paper to pixels—and the way 
            we communicate changed forever.
          </p>
        </header>

        <div className="chapter-intro">
          <p>
            The internet began in English. For years, the digital world was dominated by the 
            Roman alphabet. But as the web expanded, so did its languages. Today, less than 
            <strong> 60% of web content is in English</strong>—and that share is shrinking.
          </p>
          <p>
            Something else remarkable has happened: <strong>emoji</strong>. These tiny pictures—
            first created by a Japanese phone company in 1999—have become the first truly 
            universal pictographic communication system since Egyptian hieroglyphics.
          </p>
        </div>

        <div className="photo-grid">
          <ArchivalPhoto image={chapter7Images[0]} era="modern" />
          <ArchivalPhoto image={chapter7Images[2]} era="modern" />
        </div>

        <div className="chapter-text">
          <p>
            The digital revolution has been both a threat and a lifeline for languages. 
            On one hand, global platforms privilege major languages. On the other, technology 
            offers unprecedented tools for preservation: voice recording, dictionary apps, 
            online communities for scattered speakers.
          </p>
          <p>
            And then there are <strong>programming languages</strong>—a new kind of language 
            entirely. Python, JavaScript, SQL: languages designed not to communicate with 
            other humans, but with machines. In a way, we&apos;re teaching our creations to 
            understand us.
          </p>
          
          <blockquote className="voice-eternal">
            <p>Artificial intelligence can now write poetry, translate languages, generate 
            text—but it learned from us. Every word it knows was once spoken by a human.</p>
          </blockquote>
        </div>

        <div className="statistics-block">
          <div className="stat">
            <span className="stat-value">100+</span>
            <span className="stat-label">languages supported by Google Translate</span>
          </div>
          <div className="stat">
            <span className="stat-value">3,600+</span>
            <span className="stat-label">emoji characters</span>
          </div>
          <div className="stat">
            <span className="stat-value">700+</span>
            <span className="stat-label">programming languages</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 8: THE UNIVERSAL THREAD ====================

const Chapter8: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  const universalWords = [
    { word: "Mama", languages: "Nearly all languages" },
    { word: "Aha!", languages: "Moment of understanding" },
    { word: "Huh?", languages: "Request for clarification" },
    { word: "Ouch", languages: "Expression of pain" },
    { word: "Wow", languages: "Expression of wonder" },
  ];

  return (
    <section id="chapter-8" className="chapter chapter-8" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-marker">Chapter VIII</span>
          <span className="chapter-date">The Eternal Present</span>
          <h2 className="chapter-title">The Universal Thread</h2>
          <p className="chapter-metaphor">
            Beneath the 7,000 different ways of speaking, there is one language—the language of being human.
          </p>
        </header>

        <div className="chapter-intro">
          <p>
            After all this—after 100,000 years of speaking, 5,000 years of writing, after 
            empires and extinctions and digital revolutions—what remains constant?
          </p>
          <p>
            <strong>We all speak of the same things.</strong> Every language has words for 
            mother and father, for water and fire, for love and death. Every language can 
            express joy and sorrow, hope and fear. Every language can tell a story.
          </p>
        </div>

        <div className="photo-grid">
          <ArchivalPhoto image={chapter8Images[0]} era="modern" />
          <ArchivalPhoto image={chapter8Images[1]} era="modern" />
        </div>

        <div className="chapter-text">
          <p>
            Linguists have discovered something remarkable: certain words are nearly universal. 
            <strong> &ldquo;Mama&rdquo;</strong> sounds similar in hundreds of unrelated languages—
            not because they borrowed it from each other, but because it&apos;s one of the first 
            sounds a baby can make, and mothers everywhere claimed it.
          </p>
          <p>
            The word <strong>&ldquo;huh?&rdquo;</strong> appears in essentially the same form in 
            every language ever studied—a universal expression of &ldquo;what did you say?&rdquo; 
            We are not as different as we sometimes think.
          </p>
        </div>

        <div className="translation-grid">
          {[
            { word: "ماما", lang: "Arabic (Mama)" },
            { word: "妈妈", lang: "Chinese (Māma)" },
            { word: "Мама", lang: "Russian (Mama)" },
            { word: "माँ", lang: "Hindi (Mā)" },
            { word: "Mama", lang: "Swahili" },
            { word: "ママ", lang: "Japanese (Mama)" },
          ].map((item) => (
            <div key={item.lang} className="translation-card">
              <div className="translation-word">{item.word}</div>
              <div className="translation-lang">{item.lang}</div>
            </div>
          ))}
        </div>

        <blockquote className="voice-eternal">
          <p>Language is not what divides us. It is the proof that we are one species, 
          endlessly creative, forever reaching out across the silence to connect.</p>
        </blockquote>
      </div>

      {/* Finale Section */}
      <div className="finale-section">
        <p className="finale-statement">
          7,000 languages. 8 billion speakers. One human family.
        </p>
        
        <div className="finale-words">
          {["Hello", "Bonjour", "你好", "مرحبا", "Olá", "Здравствуйте", "こんにちは", "Jambo"].map((word, i) => (
            <span 
              key={word} 
              className="universal-word"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              {word}
            </span>
          ))}
        </div>
        
        <div className="finale-cta">
          <p><em>Every word you speak connects you to everyone who has ever spoken before—and everyone who will speak after.</em></p>
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
      category: "Academic Sources",
      items: [
        "Ethnologue: Languages of the World (24th edition)",
        "UNESCO Atlas of the World's Languages in Danger",
        "The Cambridge Encyclopedia of Language by David Crystal",
        "The Story of Human Language (Great Courses) by John McWhorter",
        "Guns, Germs, and Steel by Jared Diamond",
        "The Power of Babel by John McWhorter"
      ]
    },
    {
      category: "Research Organizations",
      items: [
        "Linguistic Society of America",
        "UNESCO Intangible Cultural Heritage",
        "Endangered Languages Project (Google)",
        "The Language Conservancy",
        "Foundation for Endangered Languages",
        "Max Planck Institute for Evolutionary Anthropology"
      ]
    },
    {
      category: "Digital Resources",
      items: [
        "Glottolog 4.0 Language Database",
        "WALS Online (World Atlas of Language Structures)",
        "PHOIBLE (Cross-linguistic Phonological Database)",
        "Omniglot Writing Systems Encyclopedia"
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
              <h3>{group.category}</h3>
              <ul className="source-list">
                {group.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== MAIN COMPONENT ====================

const LanguagesClient: React.FC = () => {
  const globalProgress = useGlobalScrollProgress();

  return (
    <article className="languages-essay" aria-label="The History of Languages: Humanity's Greatest Invention">
      {/* Skip Link for Accessibility */}
      <a href="#chapter-1" className="skip-link">
        Skip to content
      </a>
      
      {/* Progress Indicator */}
      <LanguageScrollProgress progress={globalProgress} />
      
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
      
      {/* Scroll to top */}
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

export default LanguagesClient;
