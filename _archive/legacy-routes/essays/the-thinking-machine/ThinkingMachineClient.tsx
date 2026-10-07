"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import "./thinking-machine.css";
import {
  heroImages,
  prologueImages,
  turingImages,
  dartmouthImages,
  goldenAgeImages,
  firstWinterImages,
  expertSystemsImages,
  secondWinterImages,
  believersImages,
  imageNetImages,
  deepLearningImages,
  transformerImages,
  foundationModelImages,
  reckoningImages,
  epilogueImages,
} from "./images";

// ============================================================================
// DESIGN RESEARCH REPORT: THE THINKING MACHINE
// ============================================================================
// Visual Archaeology: Vacuum tubes, academic labs, server racks, neural diagrams
// Color Palette: Deep black (#0A0A0F), neural blue (#00B4D8), computation purple (#7209B7),
//                circuit green (#06D6A0), terminal amber (#F4A261), warning red (#FF6B6B)
// Typography: Space Grotesk for display, Crimson Pro for quotes, Inter for body
// Animation Philosophy: Neural patterns, era transitions, typewriter reveals
// Unique Interactions: Neural network progress bar, era color shifts, attention visualization
// Photo Treatment: Era-based (B&W → Kodachrome → Full color)
// ============================================================================

// ==================== TYPE DEFINITIONS ====================

interface ScrollLockState {
  containerRef: React.RefObject<HTMLDivElement | null>;
  progress: number;
  isPinned: boolean;
}

interface Pioneer {
  name: string;
  title: string;
  era?: string;
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
// Uses RAF throttling for 60fps performance
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

// Global scroll progress for neural network progress bar
// Uses RAF throttling for 60fps performance
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

// ==================== NEURAL NETWORK PROGRESS BAR ====================

// Memoized neural network structure for performance
const useNeuralNetworkStructure = () => {
  return useMemo(() => {
    const layers = 8;
    const nodesPerLayer = [1, 3, 5, 7, 5, 3, 2, 1];
    const layerSpacing = 100 / (layers + 1);
    
    const nodes: { x: number; y: number; layer: number; id: string }[] = [];
    const connections: { x1: number; y1: number; x2: number; y2: number; fromLayer: number; toLayer: number; id: string }[] = [];
    
    nodesPerLayer.forEach((nodeCount, layerIndex) => {
      const layerY = (layerIndex + 1) * layerSpacing;
      const nodeSpacing = 100 / (nodeCount + 1);
      
      for (let i = 0; i < nodeCount; i++) {
        const nodeX = (i + 1) * nodeSpacing;
        nodes.push({
          x: nodeX,
          y: layerY,
          layer: layerIndex,
          id: `node-${layerIndex}-${i}`,
        });
        
        if (layerIndex > 0) {
          const prevNodeCount = nodesPerLayer[layerIndex - 1];
          const prevNodeSpacing = 100 / (prevNodeCount + 1);
          const prevLayerY = layerIndex * layerSpacing;
          
          for (let j = 0; j < prevNodeCount; j++) {
            const prevNodeX = (j + 1) * prevNodeSpacing;
            connections.push({
              x1: prevNodeX,
              y1: prevLayerY,
              x2: nodeX,
              y2: layerY,
              fromLayer: layerIndex - 1,
              toLayer: layerIndex,
              id: `conn-${layerIndex}-${i}-${j}`,
            });
          }
        }
      }
    });
    
    const chapterLabels = [
      "TURING",
      "DARTMOUTH",
      "GOLDEN",
      "WINTER",
      "EXPERT",
      "UNDERGROUND",
      "IMAGENET",
      "FUTURE",
    ];
    
    return { nodes, connections, chapterLabels, layers };
  }, []);
};

const NeuralNetworkProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  // Use memoized structure - only activeLayer changes with progress
  const { nodes, connections, chapterLabels, layers } = useNeuralNetworkStructure();
  const activeLayer = Math.floor(progress * layers);

  return (
    <div className="neural-network-progress" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="neural-svg">
        <defs>
          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00B4D8" stopOpacity="1" />
            <stop offset="100%" stopColor="#00B4D8" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Connections */}
        {connections.map((conn) => {
          const isActive = conn.toLayer <= activeLayer;
          return (
            <line
              key={conn.id}
              x1={conn.x1}
              y1={conn.y1}
              x2={conn.x2}
              y2={conn.y2}
              className={`neural-connection ${isActive ? "active" : ""}`}
            />
          );
        })}
        
        {/* Nodes */}
        {nodes.map((node) => {
          const isActive = node.layer <= activeLayer;
          return (
            <circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={isActive ? 2.5 : 1.5}
              className={`neural-node ${isActive ? "active" : ""}`}
              fill={isActive ? "#00B4D8" : "#555"}
            />
          );
        })}
        
        {/* Current position marker */}
        <circle
          cx={50}
          cy={progress * 100}
          r="4"
          className="neural-current-marker"
        />
      </svg>
      
      {/* Chapter markers */}
      <div className="chapter-markers-neural">
        {chapterLabels.map((label, i) => (
          <span
            key={label}
            className={`chapter-marker-neural ${i / chapterLabels.length <= progress ? "active" : ""}`}
          >
            {label}
          </span>
        ))}
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
  kenBurns?: boolean;
}

const ArchivalPhoto: React.FC<ArchivalPhotoProps> = ({
  src,
  alt,
  caption,
  source,
  date,
  className = "",
  kenBurns = false,
}) => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  
  return (
    <figure 
      ref={ref}
      className={`archival-photo ${className} ${isVisible ? "revealed" : ""} ${kenBurns ? "ken-burns" : ""}`}
    >
      <div className="photo-frame">
        {src ? (
          <img 
            src={src} 
            alt={alt}
            className="archival-img"
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
      </figcaption>
    </figure>
  );
};

// ==================== PIONEER PORTRAIT GALLERY ====================

const PioneerPortrait: React.FC<{ pioneer: Pioneer; delay: number }> = ({ 
  pioneer, 
  delay 
}) => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  
  return (
    <article 
      ref={ref}
      className={`scientist-portrait ${isVisible ? "revealed" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="portrait-frame">
        {pioneer.photoSrc ? (
          <img 
            src={pioneer.photoSrc} 
            alt={pioneer.photoPlaceholder}
            className="portrait-photo-img"
            loading="lazy"
          />
        ) : (
          <div className="photo-placeholder portrait-photo">
            <span className="placeholder-text">{pioneer.photoPlaceholder}</span>
          </div>
        )}
        <div className="photo-vignette" />
      </div>
      <div className="portrait-info">
        <h4 className="scientist-name">{pioneer.name}</h4>
        <span className="scientist-title">{pioneer.title}</span>
        {pioneer.era && <span className="scientist-age">{pioneer.era}</span>}
        <blockquote className="scientist-quote">&ldquo;{pioneer.quote}&rdquo;</blockquote>
      </div>
    </article>
  );
};

// ==================== HERO SECTION ====================

const HeroSection: React.FC = () => {
  const { containerRef, progress, isPinned } = useScrollLock(4);
  
  const phase = useMemo(() => {
    // Extended question phase (0-22%) to allow reading "— Alan Turing, 1950" attribution
    // Typewriter completes around 10%, holds for ~12% more scroll before fading
    if (progress < 0.22) return "question";
    if (progress < 0.40) return "silhouettes";
    if (progress < 0.58) return "dialogue";
    if (progress < 0.76) return "evolution";
    if (progress < 0.90) return "turing";
    return "title";
  }, [progress]);

  // Typewriter effect for the question
  // Multiplier of 8 means typewriter completes at ~12.5% progress
  // leaving ~10% of the question phase to read the attribution
  const question = "Can a machine think?";
  const visibleChars = phase === "question" ? Math.floor(progress * 8 * question.length) : question.length;
  const displayQuestion = question.slice(0, Math.min(visibleChars, question.length));
  
  return (
    <header
      className={`hero-section scroll-lock-container phase-${phase}`}
      ref={containerRef}
      style={{ height: "450vh" }}
    >
      <div className={`hero-pinned ${isPinned ? "is-pinned" : ""}`}>
        {/* The Question */}
        <div className="hero-question" style={{ opacity: phase === "question" ? 1 : 0 }}>
          <p className="hero-question-text">
            &ldquo;{displayQuestion}<span className="typewriter"></span>&rdquo;
          </p>
          <span className="hero-dates" style={{ opacity: visibleChars >= question.length ? 1 : 0 }}>
            — Alan Turing, 1950
          </span>
        </div>
        
        {/* Silhouettes: Human vs Machine */}
        <div className="hero-silhouettes" style={{ opacity: phase === "silhouettes" || phase === "dialogue" ? 1 : 0 }}>
          <div className={`silhouette-human ${progress > 0.27 ? "visible" : ""}`}>
            <div className="silhouette-icon" />
            <span style={{ marginTop: "1rem", color: "#888" }}>Human</span>
          </div>
          <div className={`silhouette-machine ${progress > 0.32 ? "visible" : ""}`}>
            <div className="silhouette-icon" />
            <span style={{ marginTop: "1rem", color: "#888" }}>Machine</span>
          </div>
        </div>
        
        {/* Dialogue: The Imitation Game */}
        {phase === "dialogue" && (
          <div className="hero-dialogue">
            <div className={`dialogue-line human ${progress > 0.43 ? "visible" : ""}`}>
              What do you think about poetry?
            </div>
            <div className={`dialogue-line machine ${progress > 0.47 ? "visible" : ""}`}>
              Poetry speaks to the human condition in ways I find fascinating.
            </div>
            <div className={`dialogue-line human ${progress > 0.51 ? "visible" : ""}`}>
              Which response was human?
            </div>
            <div className={`dialogue-line machine ${progress > 0.55 ? "visible" : ""}`}>
              Does it matter?
            </div>
          </div>
        )}
        
        {/* Turing Portrait */}
        <div className={`hero-turing ${phase === "turing" ? "visible" : ""}`}>
          <div className="turing-portrait">
            {turingImages.turingPortrait.src ? (
              <img 
                src={turingImages.turingPortrait.src} 
                alt={turingImages.turingPortrait.alt}
              />
            ) : (
              <div className="photo-placeholder">Turing Portrait</div>
            )}
          </div>
          <blockquote style={{ textAlign: "center", maxWidth: 500 }}>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontStyle: "italic", color: "var(--ai-text-secondary)" }}>
              He asked the question in 1950. He never lived to see the answer.
            </p>
          </blockquote>
        </div>
        
        {/* Title Card */}
        <div className={`hero-title-card ${phase === "title" ? "visible" : ""}`}>
          <h1 className="hero-title">THE THINKING MACHINE</h1>
          <p className="hero-subtitle">A Visual History of Artificial Intelligence</p>
          <span className="hero-dates">1943 — 2025</span>
        </div>
      </div>
    </header>
  );
};

// ==================== PROLOGUE: THE ETERNAL QUESTION ====================

// Timeline milestones for the scroll-lock sequence
const timelineMilestones = [
  {
    era: "myth",
    year: "~400 BCE",
    title: "Talos",
    description: "The bronze giant of Greek mythology, built by Hephaestus to guard Crete. Humanity's first dream of an artificial protector.",
    visual: "ancient",
  },
  {
    era: "myth",
    year: "16th Century",
    title: "The Golem of Prague",
    description: "Rabbi Loew shapes clay into a living servant. The word 'emet' (truth) animates; remove a letter and it becomes 'met' (death).",
    visual: "ancient",
  },
  {
    era: "literature",
    year: "1818",
    title: "Frankenstein",
    description: "Mary Shelley asks what it would mean to create life from unliving matter—and what responsibility comes with creation.",
    visual: "vintage",
  },
  {
    era: "automata",
    year: "1770",
    title: "The Mechanical Turk",
    description: "An 'automaton' chess player that fooled Europe. A fraud, but it planted a seed: could a machine truly play chess?",
    visual: "vintage",
  },
  {
    era: "calculation",
    year: "1832",
    title: "The Difference Engine",
    description: "Charles Babbage designs a machine to calculate polynomial functions. Ada Lovelace sees further: it could manipulate symbols, not just numbers.",
    visual: "sepia",
  },
  {
    era: "electronic",
    year: "1946",
    title: "ENIAC",
    description: "Thirty tons of vacuum tubes. 150 kilowatts of power. The first general-purpose electronic computer. Dreams become engineering.",
    visual: "photograph",
  },
];

const PrologueSection: React.FC = () => {
  const { containerRef, progress, isPinned } = useScrollLock(3);
  
  // Calculate which milestone is active based on scroll progress
  const activeMilestoneIndex = useMemo(() => {
    const index = Math.floor(progress * timelineMilestones.length);
    return Math.min(index, timelineMilestones.length - 1);
  }, [progress]);
  
  const activeMilestone = timelineMilestones[activeMilestoneIndex];
  
  // Calculate the visual era for styling (ancient -> vintage -> sepia -> photograph)
  const visualEra = activeMilestone?.visual || "ancient";
  
  // Progress within current milestone (0-1)
  const milestoneProgress = useMemo(() => {
    const segmentSize = 1 / timelineMilestones.length;
    const segmentStart = activeMilestoneIndex * segmentSize;
    return (progress - segmentStart) / segmentSize;
  }, [progress, activeMilestoneIndex]);

  return (
    <section 
      id="prologue" 
      className={`chapter prologue era-foundations scroll-lock-container visual-era-${visualEra}`}
      ref={containerRef}
      style={{ height: "350vh" }}
    >
      <div className={`prologue-pinned ${isPinned ? "is-pinned" : ""}`}>
        <header className="chapter-header" style={{ marginBottom: "var(--space-lg)" }}>
          <span className="chapter-date">From Myth to Mathematics</span>
          <h2 className="chapter-title">The Eternal Question</h2>
          <p className="chapter-metaphor">Before there were computers, there were dreams</p>
        </header>
        
        {/* Timeline visualization */}
        <div className="prologue-timeline">
          {/* Year indicator */}
          <div className="timeline-year">
            <span className="year-display">{activeMilestone?.year}</span>
          </div>
          
          {/* Central content area */}
          <div className="timeline-content">
            <h3 className="timeline-title">{activeMilestone?.title}</h3>
            <p className="timeline-description">{activeMilestone?.description}</p>
          </div>
          
          {/* Progress dots */}
          <div className="timeline-dots">
            {timelineMilestones.map((milestone, index) => (
              <div 
                key={milestone.title}
                className={`timeline-dot ${index === activeMilestoneIndex ? "active" : ""} ${index < activeMilestoneIndex ? "passed" : ""}`}
                title={milestone.title}
              >
                <span className="dot-year">{milestone.year.replace("~", "")}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Visual treatment indicator - the "film grain" effect intensifies for older eras */}
        <div className={`era-overlay era-${visualEra}`} style={{ opacity: visualEra === "ancient" ? 0.3 : visualEra === "vintage" ? 0.2 : visualEra === "sepia" ? 0.1 : 0 }} />
        
        {/* Transition hint */}
        <div className="scroll-hint" style={{ opacity: progress < 0.1 ? 1 : 0 }}>
          <span>Scroll through time</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>
      
      {/* Static content after scroll-lock completes */}
      <div className="prologue-conclusion" style={{ opacity: progress > 0.95 ? 1 : 0 }}>
        {/* The Pioneers: Babbage and Lovelace */}
        <div className="photo-grid" style={{ marginTop: "var(--space-2xl)" }}>
          <ArchivalPhoto
            src={prologueImages.babbagePortrait?.src}
            alt={prologueImages.babbagePortrait?.alt || "Charles Babbage"}
            caption="Charles Babbage — the father of the computer, dreamed of thinking machines"
            source="Wikimedia Commons"
            date="1860"
          />
          <ArchivalPhoto
            src={prologueImages.adaLovelace?.src}
            alt={prologueImages.adaLovelace?.alt || "Ada Lovelace"}
            caption="Ada Lovelace — wrote the first algorithm, imagined machines that could compose music"
            source="Wikimedia Commons"
            date="c. 1840"
          />
        </div>
        
        {/* The Machines */}
        <div className="photo-grid" style={{ marginTop: "var(--space-xl)" }}>
          <ArchivalPhoto
            src={prologueImages.babbageEngine?.src}
            alt={prologueImages.babbageEngine?.alt || "Babbage's Difference Engine"}
            caption="Charles Babbage's Difference Engine — mechanical calculation foreshadowing electronic minds"
            source="Science Museum, London"
            date="1832"
          />
          <ArchivalPhoto
            src={prologueImages.eniac?.src}
            alt={prologueImages.eniac?.alt || "ENIAC computer with operators"}
            caption="ENIAC — the first general-purpose electronic computer, 1946"
            source="U.S. Army / National Archives"
            date="1946"
          />
        </div>
        
        {/* ENIAC Programmers */}
        <div className="chapter-visual" style={{ marginTop: "var(--space-xl)", maxWidth: "600px", margin: "var(--space-xl) auto" }}>
          <ArchivalPhoto
            src={prologueImages.eniacProgrammers?.src}
            alt={prologueImages.eniacProgrammers?.alt || "Women programming ENIAC"}
            caption="Women programmers operating ENIAC — the hidden figures of early computing"
            source="U.S. Army / National Archives"
            date="1946"
          />
        </div>
        
        <div className="chapter-text centered" style={{ marginTop: "var(--space-xl)" }}>
          <p>
            In 1946, ENIAC filled a room and consumed 150 kilowatts of power to perform calculations 
            a modern smartphone does in microseconds. But to the engineers who built it, the question 
            was already forming: <strong>If a machine can calculate, can it think?</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 1: THE PROPHET (TURING) ====================

const Chapter1: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  const { ref: tragedyRef, isVisible: tragedyVisible } = useIntersectionReveal(0.3);

  return (
    <section id="chapter-1" className="chapter chapter-1 era-foundations" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 1</span>
          <span className="chapter-date">1936-1954</span>
          <h2 className="chapter-title">The Prophet</h2>
          <p className="chapter-metaphor">Alan Turing and the foundations of machine intelligence</p>
        </header>
        
        <div className="chapter-grid">
          <div className="chapter-visual">
            <ArchivalPhoto
              src={turingImages.turingPortrait?.src}
              alt="Alan Turing portrait"
              caption="Alan Turing — the prophet who saw too soon"
              source="National Portrait Gallery"
              date="1951"
              kenBurns
            />
          </div>
          
          <div className="chapter-text">
            <p className="chapter-intro">
              Before there were computers, Alan Turing imagined them. His 1936 paper on 
              computable numbers described a theoretical machine that could perform any 
              calculation—the mathematical foundation for every computer that followed.
            </p>
            
            <p>
              During World War II, he built machines that broke Nazi codes and shortened 
              the war by an estimated two years, saving countless lives.
            </p>
            
            <blockquote className="historic-quote">
              <p>&ldquo;We can only see a short distance ahead, but we can see plenty there that needs to be done.&rdquo;</p>
              <cite>— Alan Turing, &ldquo;Computing Machinery and Intelligence,&rdquo; 1950</cite>
            </blockquote>
          </div>
        </div>
        
        <div className="photo-grid" style={{ marginTop: "var(--space-xl)" }}>
          <ArchivalPhoto
            src={turingImages.bombeeMachine?.src}
            alt="The Bombe cryptanalysis machine"
            caption="The Bombe — Turing's machine that broke Nazi Enigma codes"
            source="Bletchley Park Trust"
            date="1943"
          />
          <ArchivalPhoto
            src={turingImages.aceComputer?.src}
            alt="The ACE computer"
            caption="ACE — Turing's design for a stored-program computer"
            source="National Physical Laboratory"
            date="1950"
          />
        </div>
        
        {/* Bletchley Park */}
        <div className="chapter-visual" style={{ marginTop: "var(--space-xl)", maxWidth: "700px", margin: "var(--space-xl) auto" }}>
          <ArchivalPhoto
            src={turingImages.bletchleyPark?.src}
            alt={turingImages.bletchleyPark?.alt || "Bletchley Park mansion"}
            caption="Bletchley Park — where Turing's codebreakers shortened World War II by years"
            source="Wikimedia Commons"
            date="2008"
          />
        </div>
        
        <div className="quote-monument" style={{ marginTop: "var(--space-xl)" }}>
          <blockquote>
            <p className="quote-text">
              In 1950, he asked the question that launched artificial intelligence: 
              &ldquo;Can machines think?&rdquo;
            </p>
          </blockquote>
        </div>
        
        <div 
          ref={tragedyRef}
          className={`key-figure featured tragedy-section ${tragedyVisible ? "revealed" : ""}`} 
          style={{ marginTop: "var(--space-xl)" }}
        >
          <div className="figure-photo">
            {turingImages.turingTragedy?.src ? (
              <img 
                src={turingImages.turingTragedy.src} 
                alt={turingImages.turingTragedy.alt}
                className="tragedy-portrait"
                loading="lazy"
              />
            ) : (
              <div className="photo-placeholder">
                <span className="placeholder-text">Turing, 1951</span>
              </div>
            )}
          </div>
          <div className="figure-content">
            <h3>The Tragedy</h3>
            <p style={{ color: "var(--ai-text-secondary)", marginBottom: "var(--space-md)" }}>
              Turing never saw the field he founded. Prosecuted for homosexuality in 1952, 
              chemically castrated by the British government, he died in 1954 at forty-one. 
              An apple laced with cyanide. The father of computer science, destroyed by 
              the society he helped save.
            </p>
            <ul className="figure-facts">
              <li>Invented the theoretical computer (1936)</li>
              <li>Broke the Enigma code (1939-1945)</li>
              <li>Proposed the Turing Test (1950)</li>
              <li>Died by suicide after government persecution (1954)</li>
              <li>Pardoned by the British government in 2013—59 years too late</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 2: THE DARTMOUTH SUMMER ====================

// The Dartmouth Proposal phrases to reveal progressively
const proposalPhrases = [
  { text: "We propose that a", highlight: false },
  { text: "2-month, 10-man study", highlight: true, emphasis: "timeline" },
  { text: "of", highlight: false },
  { text: "artificial intelligence", highlight: true, emphasis: "name" },
  { text: "be carried out...", highlight: false },
  { text: "An attempt will be made to find how to make machines", highlight: false },
  { text: "use language,", highlight: true, emphasis: "capability" },
  { text: "form abstractions and concepts,", highlight: true, emphasis: "capability" },
  { text: "solve kinds of problems now reserved for humans,", highlight: true, emphasis: "audacity" },
  { text: "and", highlight: false },
  { text: "improve themselves.", highlight: true, emphasis: "audacity" },
];

const Chapter2: React.FC = () => {
  const { containerRef, progress, isPinned } = useScrollLock(3.5);
  const { ref: contentRef, isVisible } = useIntersectionReveal(0.1);
  
  // Calculate how many phrases to show based on scroll progress
  const visiblePhraseCount = useMemo(() => {
    // First 50% of scroll reveals phrases one by one
    const revealProgress = Math.min(progress / 0.5, 1);
    return Math.floor(revealProgress * proposalPhrases.length);
  }, [progress]);
  
  // Staggered punchline reveal for dramatic impact
  const showPunchlineLine1 = progress > 0.52; // "They believed... 2 months"
  const showPunchlineLine2 = progress > 0.60; // "It would take 70 years" (the twist)
  const showPunchlineLine3 = progress > 0.68; // "They were brilliant..." (conclusion)
  const showPunchline = progress > 0.52; // Container visibility
  const showFounders = progress > 0.78;
  
  const founders: Pioneer[] = [
    {
      name: "John McCarthy",
      title: "The Namer of Dreams",
      quote: "Every aspect of learning or any other feature of intelligence can be so precisely described that a machine can be made to simulate it.",
      photoPlaceholder: "McCarthy at a blackboard",
      photoSrc: dartmouthImages.mcCarthyPortrait?.src,
    },
    {
      name: "Marvin Minsky",
      title: "The Mind as Machine",
      quote: "Minds are what brains do.",
      photoPlaceholder: "Minsky, intense gaze",
      photoSrc: dartmouthImages.minskyPortrait?.src,
    },
    {
      name: "Claude Shannon",
      title: "The Father of Information",
      quote: "Information is the resolution of uncertainty.",
      photoPlaceholder: "Shannon with maze-solving mouse",
      photoSrc: dartmouthImages.shannonPortrait?.src,
    },
  ];

  return (
    <section 
      id="chapter-2" 
      className={`chapter chapter-2 era-golden-age scroll-lock-container ${isPinned ? "is-pinned" : ""}`}
      ref={containerRef}
      style={{ height: "350vh" }}
    >
      {/* Scroll-lock "The Proposal" */}
      <div className={`proposal-pinned ${isPinned ? "is-pinned" : ""}`}>
        <header 
          className="chapter-header" 
          style={{ 
            marginBottom: "var(--space-md)",
            opacity: showFounders ? 0 : 1,
            transition: "opacity 0.4s ease"
          }}
        >
          <span className="chapter-number">Chapter 2</span>
          <span className="chapter-date">Summer 1956 — Dartmouth College</span>
          <h2 className="chapter-title">The Dartmouth Summer</h2>
          <p className="chapter-metaphor">The moment lightning struck—and a name was born</p>
        </header>
        
        {/* The Proposal - revealed phrase by phrase */}
        <div 
          className="proposal-document"
          style={{ opacity: showPunchline ? 0 : 1, transition: "opacity 0.4s ease" }}
        >
          <div className="proposal-header">
            <span className="proposal-label">THE DARTMOUTH PROPOSAL</span>
            <span className="proposal-year">1955</span>
          </div>
          
          <div className="proposal-text">
            {proposalPhrases.map((phrase, index) => {
              const isVisible = index < visiblePhraseCount;
              const isLatest = index === visiblePhraseCount - 1;
              
              return (
                <span 
                  key={index}
                  className={`
                    proposal-phrase 
                    ${isVisible ? "visible" : ""} 
                    ${isLatest ? "latest" : ""}
                    ${phrase.highlight ? `highlight-${phrase.emphasis}` : ""}
                  `}
                >
                  {phrase.text}{" "}
                </span>
              );
            })}
          </div>
          
          <div className="proposal-citation">
            — McCarthy, Minsky, Rochester, Shannon
          </div>
        </div>
        
        {/* The Punchline - staggered reveal for dramatic impact */}
        <div className={`proposal-punchline ${showPunchline ? "visible" : ""}`}>
          <p className={`punchline-text ${showPunchlineLine1 ? "revealed" : ""}`}>
            They believed they could solve it in <span className="time-contrast">2 months</span>.
          </p>
          <p className={`punchline-reality ${showPunchlineLine2 ? "revealed" : ""}`}>
            It would take <span className="time-contrast">70 years</span>.
          </p>
          <p className={`punchline-conclusion ${showPunchlineLine3 ? "revealed" : ""}`}>
            They were brilliant. They were wrong about the timeline.<br />
            <strong>But they were right that it could be done.</strong>
          </p>
        </div>
        
        {/* Founders overlay */}
        <div className={`founders-overlay ${showFounders ? "visible" : ""}`}>
          <h3 className="founders-title">The Founders</h3>
          <div className="founders-grid">
            {founders.map((founder, index) => (
              <div 
                key={founder.name} 
                className="founder-card"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="founder-photo">
                  {founder.photoSrc ? (
                    <img src={founder.photoSrc} alt={founder.name} loading="lazy" />
                  ) : (
                    <div className="photo-placeholder">{founder.photoPlaceholder}</div>
                  )}
                </div>
                <div className="founder-info">
                  <h4>{founder.name}</h4>
                  <span className="founder-title">{founder.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll hint */}
        <div className="scroll-hint" style={{ opacity: progress < 0.05 ? 1 : 0 }}>
          <span>Scroll to read the proposal</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>
      
      {/* Static content after scroll-lock */}
      <div 
        className="chapter-content dartmouth-conclusion"
        ref={contentRef}
        style={{ 
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          opacity: progress > 0.95 ? 1 : 0,
          transition: "opacity 0.6s ease"
        }}
      >
        <div className="chapter-text centered">
          <p>
            That summer, they gave the field its name: <strong style={{ color: "var(--ai-neural-blue)" }}>artificial intelligence</strong>.
          </p>
          <p>
            The workshop didn&apos;t solve AI. But it created a community, a vocabulary, 
            and a dream that would survive decades of disappointment.
          </p>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 3: THE GOLDEN AGE ====================

const Chapter3: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section id="chapter-3" className="chapter chapter-3 era-golden-age" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 3</span>
          <span className="chapter-date">1956-1973</span>
          <h2 className="chapter-title">The Golden Age</h2>
          <p className="chapter-metaphor">The garden before the frost</p>
        </header>
        
        <div className="chapter-grid">
          <div className="chapter-text">
            <p className="chapter-intro">
              The early years delivered wonders. Programs that proved mathematical theorems. 
              Machines that recognized patterns. Robots that navigated rooms.
            </p>
            
            <p>
              A chatbot named ELIZA convinced users it understood them—even though its 
              creator knew it was just clever pattern matching. Its creator, Joseph Weizenbaum, 
              was disturbed when his secretary asked him to leave the room so she could have 
              a private conversation with the program.
            </p>
            
            <p>
              Funding flowed. DARPA believed. The researchers made promises: machine 
              translation in five years, human-level AI in a generation.
            </p>
          </div>
          
          <div className="chapter-visual">
            <ArchivalPhoto
              src={goldenAgeImages.perceptronMachine?.src}
              alt="Frank Rosenblatt with the Perceptron"
              caption="Frank Rosenblatt and the Perceptron — the first machine that learned from experience"
              source="Cornell University Archives"
              date="1958"
              kenBurns
            />
          </div>
        </div>
        
        <div className="key-figure featured" style={{ marginTop: "var(--space-xl)" }}>
          <div className="figure-photo">
            {goldenAgeImages.rosenblattPortrait?.src ? (
              <img 
                src={goldenAgeImages.rosenblattPortrait.src} 
                alt={goldenAgeImages.rosenblattPortrait.alt}
                loading="lazy"
              />
            ) : (
              <div className="photo-placeholder">
                <span className="placeholder-text">Rosenblatt</span>
              </div>
            )}
          </div>
          <div className="figure-content">
            <h3>Frank Rosenblatt — The Neural Network Pioneer</h3>
            <span className="figure-title">Vindicated sixty years later</span>
            <p style={{ color: "var(--ai-text-secondary)", margin: "var(--space-sm) 0" }}>
              In 1958, Rosenblatt built the Perceptron—hardware that learned from examples. 
              He predicted machines would &ldquo;be conscious of their existence.&rdquo; 
              The New York Times ran the headline: &ldquo;Navy Reveals Embryo of Computer 
              Designed to Read and Grow Wiser.&rdquo;
            </p>
            <p style={{ color: "var(--ai-warning-red)" }}>
              In 1969, Minsky and Papert published a book proving perceptrons couldn&apos;t 
              solve important problems. Funding for neural networks collapsed. Rosenblatt 
              died in a boating accident in 1971, his work dismissed. It took fifty years 
              to prove he was right all along.
            </p>
          </div>
        </div>
        
        <div className="photo-grid" style={{ marginTop: "var(--space-xl)" }}>
          <ArchivalPhoto
            src={goldenAgeImages.shakey?.src}
            alt="Shakey the robot"
            caption="Shakey — the first mobile robot to reason about its actions"
            source="Stanford Research Institute"
            date="1969"
          />
          <ArchivalPhoto
            src={goldenAgeImages.elizaTerminal?.src}
            alt="ELIZA program running"
            caption="ELIZA — the first chatbot, fooled users into thinking it understood"
            source="MIT"
            date="1966"
          />
        </div>
        
        {/* Key figures of the Golden Age */}
        <div className="photo-grid" style={{ marginTop: "var(--space-xl)" }}>
          <ArchivalPhoto
            src={goldenAgeImages.rosenblattPortrait?.src}
            alt={goldenAgeImages.rosenblattPortrait?.alt || "Frank Rosenblatt"}
            caption="Frank Rosenblatt — built the Perceptron, predicted conscious machines, vindicated sixty years later"
            source="Cornell University"
            date="1960s"
          />
          <ArchivalPhoto
            src={goldenAgeImages.weizenbaumPortrait?.src}
            alt={goldenAgeImages.weizenbaumPortrait?.alt || "Joseph Weizenbaum"}
            caption="Joseph Weizenbaum — created ELIZA, then became horrified by what he'd built"
            source="Ulrich Hansen / Wikimedia"
            date="2005"
          />
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 4: THE FIRST WINTER ====================

// Freeze headlines that stack during scroll-lock
const freezeHeadlines = [
  { year: "1973", text: "AI Has Failed to Achieve Its Grandiose Objectives", source: "Lighthill Report" },
  { year: "1974", text: "DARPA Cuts AI Funding by 75%", source: "Department of Defense" },
  { year: "1975", text: "Machine Translation: A Decade of Disappointment", source: "ALPAC Report" },
  { year: "1976", text: "Thinking Machines Remain a Fantasy", source: "Science Magazine" },
  { year: "1978", text: "Neural Networks: A Dead End?", source: "AI Review" },
  { year: "1980", text: "The AI Winter Deepens", source: "MIT Technology Review" },
];

const Chapter4: React.FC = () => {
  const { containerRef, progress, isPinned } = useScrollLock(3);
  const { ref: contentRef, isVisible } = useIntersectionReveal(0.1);
  
  // Calculate which headlines are visible based on scroll progress
  const visibleHeadlineCount = Math.min(
    Math.floor(progress * (freezeHeadlines.length + 1)),
    freezeHeadlines.length
  );
  
  // Funding graph animation: rises then falls
  // 0-30% progress: graph rises (optimism of 1960s)
  // 30-100% progress: graph plummets (the freeze)
  const graphProgress = useMemo(() => {
    if (progress < 0.3) {
      // Rising phase: 0 -> 100%
      return progress / 0.3;
    } else {
      // Falling phase: 100% -> 10%
      const fallProgress = (progress - 0.3) / 0.7;
      return 1 - (fallProgress * 0.9); // Falls to 10%
    }
  }, [progress]);
  
  // Temperature effect: gets colder as scroll progresses
  const coldness = Math.min(progress * 1.2, 1);

  return (
    <section 
      id="chapter-4" 
      className={`chapter chapter-4 era-winter scroll-lock-container ${isPinned ? "is-pinned" : ""}`}
      ref={containerRef}
      style={{ height: "300vh" }}
    >
      {/* Scroll-lock "The Freeze" visualization */}
      <div className={`freeze-pinned ${isPinned ? "is-pinned" : ""}`}>
        <header className="chapter-header" style={{ marginBottom: "var(--space-lg)" }}>
          <span className="chapter-number">Chapter 4</span>
          <span className="chapter-date">1973-1980</span>
          <h2 className="chapter-title">The First Winter</h2>
          <p className="chapter-metaphor">When the funding froze</p>
        </header>
        
        {/* Funding Graph Visualization */}
        <div className="freeze-graph-container">
          <div className="freeze-graph">
            <div className="graph-label-y">AI Funding</div>
            <div className="graph-area">
              {/* Graph bars representing funding levels by year */}
              <div className="graph-bars">
                {[1965, 1967, 1969, 1971, 1973, 1975, 1977, 1979].map((year, index) => {
                  // Calculate height based on progress
                  let targetHeight;
                  if (year <= 1971) {
                    // Pre-winter: rising
                    targetHeight = 30 + (index * 10);
                  } else {
                    // Post-1973: falling
                    const fallIndex = index - 4;
                    targetHeight = 70 - (fallIndex * 15);
                  }
                  
                  // Animate based on scroll progress
                  const barProgress = Math.min(progress * 2, 1);
                  const currentHeight = year <= 1971 
                    ? targetHeight * barProgress 
                    : progress > 0.3 
                      ? targetHeight * Math.max(0.1, 1 - ((progress - 0.3) / 0.7))
                      : targetHeight * barProgress;
                  
                  return (
                    <div 
                      key={year}
                      className={`graph-bar ${year >= 1973 ? "frozen" : "warm"}`}
                      style={{ 
                        height: `${currentHeight}%`,
                        opacity: progress > 0.05 ? 1 : 0,
                        transitionDelay: `${index * 0.05}s`
                      }}
                    >
                      <span className="bar-year">{year}</span>
                    </div>
                  );
                })}
              </div>
              <div className="graph-label-x">Year</div>
            </div>
          </div>
        </div>
        
        {/* Stacking Headlines */}
        <div className="freeze-headlines">
          {freezeHeadlines.slice(0, visibleHeadlineCount).map((headline, index) => (
            <div 
              key={headline.year}
              className="freeze-headline"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                opacity: 1,
              }}
            >
              <span className="headline-year">{headline.year}</span>
              <span className="headline-text">&ldquo;{headline.text}&rdquo;</span>
              <span className="headline-source">— {headline.source}</span>
            </div>
          ))}
        </div>
        
        {/* Cold overlay effect */}
        <div 
          className="freeze-overlay" 
          style={{ opacity: coldness * 0.3 }}
        />
        
        {/* Scroll hint */}
        <div className="scroll-hint" style={{ opacity: progress < 0.1 ? 1 : 0 }}>
          <span>Scroll to witness the freeze</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>
      
      {/* Static content after scroll-lock */}
      <div 
        className={`chapter-content winter-content ${progress > 0.95 ? "revealed" : ""}`}
        ref={contentRef}
        style={{ 
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          opacity: progress > 0.9 ? 1 : 0,
          transition: "opacity 0.6s ease"
        }}
      >
        <div className="chapter-text centered">
          <blockquote className="historic-quote">
            <p>&ldquo;In no part of the field have the discoveries made so far produced 
            the major impact that was then promised.&rdquo;</p>
            <cite>— Sir James Lighthill, 1973</cite>
          </blockquote>
          
          <p>
            The dream froze. Those who remained became cautious. The word &ldquo;AI&rdquo; 
            itself became toxic. Researchers rebranded their work as &ldquo;machine learning&rdquo; 
            or &ldquo;expert systems&rdquo;—anything but artificial intelligence.
          </p>
        </div>
        
        {/* Stats section */}
        <div className="data-stats" style={{ marginTop: "var(--space-xl)" }}>
          <div className="stat-card frozen">
            <span className="stat-value" style={{ color: "var(--ai-frost-blue, #6BA3BE)" }}>-75%</span>
            <span className="stat-label">DARPA AI funding cut</span>
          </div>
          <div className="stat-card frozen">
            <span className="stat-value" style={{ color: "var(--ai-frost-blue, #6BA3BE)" }}>0</span>
            <span className="stat-label">Major neural network papers, 1975-1982</span>
          </div>
          <div className="stat-card frozen">
            <span className="stat-value" style={{ color: "var(--ai-frost-blue, #6BA3BE)" }}>7</span>
            <span className="stat-label">Years of &ldquo;AI Winter&rdquo;</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 5: EXPERT SYSTEMS ====================

const Chapter5: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section id="chapter-5" className="chapter chapter-5 era-expert-systems" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 5</span>
          <span className="chapter-date">1980-1987</span>
          <h2 className="chapter-title">The Expert Systems Boom</h2>
          <p className="chapter-metaphor">A false dawn—warmth before the next freeze</p>
        </header>
        
        <div className="chapter-grid">
          <div className="chapter-visual">
            <ArchivalPhoto
              src={expertSystemsImages.lispMachine?.src}
              alt="Symbolics LISP machine"
              caption="LISP machines — specialized AI hardware that briefly created an industry"
              source="Computer History Museum"
              date="1980s"
            />
          </div>
          
          <div className="chapter-text">
            <p className="chapter-intro">
              Commercial salvation arrived in the form of &ldquo;expert systems&rdquo;—programs 
              encoding human expertise as rules.
            </p>
            
            <p>
              Banks used them for loan decisions. Hospitals for diagnosis. The market boomed. 
              Companies spent billions. Japan announced the Fifth Generation Computing project—a 
              national effort to dominate AI. America panicked. Funding returned.
            </p>
            
            <p>
              But expert systems were brittle. They couldn&apos;t learn. They couldn&apos;t 
              handle ambiguity. They required armies of human experts to build and maintain.
            </p>
          </div>
        </div>
        
        <div className="data-stats" style={{ marginTop: "var(--space-xl)" }}>
          <div className="stat-card">
            <span className="stat-value">$2B</span>
            <span className="stat-label">Expert systems market at peak (1987)</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">1987</span>
            <span className="stat-label">The bubble burst</span>
          </div>
          <div className="stat-card">
            <span className="stat-value" style={{ color: "var(--ai-warning-red)" }}>$0</span>
            <span className="stat-label">LISP machine market by 1990</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 6: THE SECOND WINTER ====================

const Chapter6: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section id="chapter-6" className="chapter chapter-6 era-foundations" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 6</span>
          <span className="chapter-date">1987-1993</span>
          <h2 className="chapter-title">The Second Winter</h2>
          <p className="chapter-metaphor">The wilderness years—when believers became exiles</p>
        </header>
        
        <div className="chapter-text centered">
          <p className="chapter-intro" style={{ color: "var(--ai-text-muted)" }}>
            The expert systems bubble burst. Companies that had rebranded everything as 
            &ldquo;AI&rdquo; collapsed. The backlash was brutal.
          </p>
          
          <p>
            AI researchers learned to never use those two letters in funding proposals. 
            The field retreated to the margins of computer science.
          </p>
        </div>
        
        <div className="quote-monument">
          <blockquote>
            <p className="quote-text">
              But in small pockets—Toronto, Montreal, a few European labs—a different 
              approach survived. Neural networks. The approach that Minsky and Papert 
              had &ldquo;killed&rdquo; in 1969.
            </p>
          </blockquote>
        </div>
        
        <div className="chapter-text centered">
          <p>
            A handful of researchers believed that if networks got big enough and had 
            enough data, something different might emerge.
          </p>
          <p style={{ color: "var(--ai-neural-blue)" }}>
            <strong>They couldn&apos;t prove it. They couldn&apos;t get funding. 
            They persisted anyway.</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 7: THE BELIEVERS ====================

// Timeline milestones for "The Three Who Believed" scroll-lock
const believersTimeline = [
  { year: "1986", event: "Hinton publishes backpropagation paper", phase: "obscurity" },
  { year: "1989", event: "LeCun creates convolutional networks at Bell Labs", phase: "obscurity" },
  { year: "1993", event: "Bengio begins language modeling research", phase: "obscurity" },
  { year: "2000", event: "Neural networks declared 'dead' by mainstream AI", phase: "wilderness" },
  { year: "2006", event: "Hinton's deep belief networks paper", phase: "awakening" },
  { year: "2012", event: "AlexNet wins ImageNet — the world notices", phase: "awakening" },
  { year: "2018", event: "Turing Award: Vindication", phase: "triumph" },
];

const Chapter7: React.FC = () => {
  const { containerRef, progress, isPinned } = useScrollLock(4);
  const { ref: contentRef, isVisible } = useIntersectionReveal(0.1);
  
  // Calculate which phase we're in based on progress
  const currentTimelineIndex = useMemo(() => {
    const index = Math.floor(progress * believersTimeline.length);
    return Math.min(index, believersTimeline.length - 1);
  }, [progress]);
  
  const currentMilestone = believersTimeline[currentTimelineIndex];
  const phase = currentMilestone?.phase || "obscurity";
  
  // Portrait visibility: appear sequentially in first 40% of scroll
  const hintonVisible = progress > 0.08;
  const lecunVisible = progress > 0.16;
  const bengioVisible = progress > 0.24;
  
  // Color saturation increases as we approach "awakening" and "triumph"
  const saturation = useMemo(() => {
    if (progress < 0.5) return 0; // Grayscale during obscurity/wilderness
    if (progress < 0.7) return (progress - 0.5) / 0.2; // Fade in color
    return 1; // Full color during triumph
  }, [progress]);
  
  // Turing Award reveal in final phase
  const showTuringAward = progress > 0.85;

  return (
    <section 
      id="chapter-7" 
      className={`chapter chapter-7 era-neural-underground scroll-lock-container ${isPinned ? "is-pinned" : ""}`}
      ref={containerRef}
      style={{ height: "400vh" }}
    >
      {/* Scroll-lock "The Three Who Believed" */}
      <div className={`believers-pinned ${isPinned ? "is-pinned" : ""}`}>
        <header 
          className="chapter-header" 
          style={{ 
            marginBottom: "var(--space-md)",
            opacity: showTuringAward ? 0 : 1,
            transition: "opacity 0.4s ease"
          }}
        >
          <span className="chapter-number">Chapter 7</span>
          <span className="chapter-date">1986-2018</span>
          <h2 className="chapter-title">The Believers</h2>
          <p className="chapter-metaphor">The monks who preserved knowledge through the dark ages</p>
        </header>
        
        {/* Timeline indicator - hide when Turing Award shows */}
        <div 
          className="believers-timeline"
          style={{
            opacity: showTuringAward ? 0 : 1,
            transition: "opacity 0.4s ease"
          }}
        >
          <span className="timeline-year-display">{currentMilestone?.year}</span>
          <span className="timeline-event-display">{currentMilestone?.event}</span>
        </div>
        
        {/* Three portraits - appear sequentially, gain color over time */}
        <div 
          className="believers-portraits"
          style={{ 
            filter: `grayscale(${1 - saturation}) contrast(${1 + saturation * 0.1})`,
          }}
        >
          {/* Hinton */}
          <div className={`believer-portrait ${hintonVisible ? "visible" : ""}`}>
            <div className="portrait-image">
              <img 
                src={believersImages.hintonToronto?.src} 
                alt="Geoffrey Hinton"
                loading="lazy"
              />
            </div>
            <div className="portrait-info">
              <h3>Geoffrey Hinton</h3>
              <span className="portrait-title">The Godfather of Deep Learning</span>
              <span className="portrait-location">Toronto</span>
              <p className="portrait-quote">&ldquo;I&apos;ve always believed this would work. I just didn&apos;t know when.&rdquo;</p>
            </div>
          </div>
          
          {/* LeCun */}
          <div className={`believer-portrait ${lecunVisible ? "visible" : ""}`}>
            <div className="portrait-image">
              <img 
                src={believersImages.lecunBellLabs?.src} 
                alt="Yann LeCun"
                loading="lazy"
              />
            </div>
            <div className="portrait-info">
              <h3>Yann LeCun</h3>
              <span className="portrait-title">The Convolutional Pioneer</span>
              <span className="portrait-location">Bell Labs → Facebook AI</span>
              <p className="portrait-quote">&ldquo;Deep learning will transform the world.&rdquo;</p>
            </div>
          </div>
          
          {/* Bengio */}
          <div className={`believer-portrait ${bengioVisible ? "visible" : ""}`}>
            <div className="portrait-image">
              <img 
                src={believersImages.bengioMontreal?.src} 
                alt="Yoshua Bengio"
                loading="lazy"
              />
            </div>
            <div className="portrait-info">
              <h3>Yoshua Bengio</h3>
              <span className="portrait-title">The Quiet Architect</span>
              <span className="portrait-location">Montreal</span>
              <p className="portrait-quote">&ldquo;We were outcasts. We believed anyway.&rdquo;</p>
            </div>
          </div>
        </div>
        
        {/* Turing Award reveal */}
        <div 
          className={`believers-award ${showTuringAward ? "visible" : ""}`}
        >
          <div className="award-content">
            <span className="award-year">2018</span>
            <h3 className="award-title">ACM Turing Award</h3>
            
            {/* Three portraits in a row */}
            <div className="award-portraits">
              <div className="award-portrait">
                <img src={believersImages.hintonToronto?.src} alt="Hinton" />
                <span>Hinton</span>
              </div>
              <div className="award-portrait">
                <img src={believersImages.lecunBellLabs?.src} alt="LeCun" />
                <span>LeCun</span>
              </div>
              <div className="award-portrait">
                <img src={believersImages.bengioMontreal?.src} alt="Bengio" />
                <span>Bengio</span>
              </div>
            </div>
            
            <p className="award-subtitle">&ldquo;For conceptual and engineering breakthroughs that have made deep neural networks a critical component of computing&rdquo;</p>
            <p className="award-tagline">Vindication forty years in the making.</p>
          </div>
        </div>
        
        {/* Progress indicator - hide when Turing Award shows */}
        <div 
          className="believers-progress"
          style={{
            opacity: showTuringAward ? 0 : 1,
            transition: "opacity 0.4s ease"
          }}
        >
          {believersTimeline.map((milestone, index) => (
            <div 
              key={milestone.year}
              className={`progress-dot ${index <= currentTimelineIndex ? "active" : ""} ${milestone.phase}`}
              title={`${milestone.year}: ${milestone.event}`}
            />
          ))}
        </div>
        
        {/* Scroll hint */}
        <div className="scroll-hint" style={{ opacity: progress < 0.05 ? 1 : 0 }}>
          <span>Scroll through four decades</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>
      
      {/* Static content after scroll-lock */}
      <div 
        className={`chapter-content believers-conclusion`}
        ref={contentRef}
        style={{ 
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          opacity: progress > 0.95 ? 1 : 0,
          transition: "opacity 0.6s ease"
        }}
      >
        <div className="chapter-text centered">
          <p>
            They published papers no one read. They trained students who couldn&apos;t get jobs. 
            They believed in an idea the world had abandoned.
          </p>
          <p style={{ color: "var(--ai-neural-blue)", marginTop: "var(--space-md)" }}>
            <strong>And they were right.</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 8: THE IMAGENET MOMENT ====================

// ImageNet error rates by year (approximate historical data)
const imageNetErrorRates = [
  { year: 2010, errorRate: 28.2, method: "Traditional CV" },
  { year: 2011, errorRate: 25.8, method: "SIFT + SVM" },
  { year: 2012, errorRate: 16.4, method: "AlexNet", isAlexNet: true },
  { year: 2013, errorRate: 11.7, method: "ZFNet" },
  { year: 2014, errorRate: 6.7, method: "GoogLeNet" },
  { year: 2015, errorRate: 3.6, method: "ResNet" },
];

const Chapter8: React.FC = () => {
  const { containerRef, progress, isPinned } = useScrollLock(3.5);
  const { ref: contentRef, isVisible } = useIntersectionReveal(0.1);
  
  // Calculate which year to show based on scroll progress
  const currentYearIndex = useMemo(() => {
    const index = Math.floor(progress * imageNetErrorRates.length);
    return Math.min(index, imageNetErrorRates.length - 1);
  }, [progress]);
  
  const currentData = imageNetErrorRates[currentYearIndex];
  const isCliffMoment = currentData?.isAlexNet && progress > 0.3 && progress < 0.5;
  
  // Show "Everything Changed" after 2012
  const showRevolution = progress > 0.7;

  return (
    <section 
      id="chapter-8" 
      className={`chapter chapter-8 era-deep-learning scroll-lock-container ${isPinned ? "is-pinned" : ""}`}
      ref={containerRef}
      style={{ height: "350vh" }}
    >
      {/* Scroll-lock "The Collapse" */}
      <div className={`imagenet-pinned ${isPinned ? "is-pinned" : ""}`}>
        <header 
          className="chapter-header" 
          style={{ 
            marginBottom: "var(--space-md)",
            opacity: showRevolution ? 0 : 1,
            transition: "opacity 0.4s ease"
          }}
        >
          <span className="chapter-number">Chapter 8</span>
          <span className="chapter-date">2012</span>
          <h2 className="chapter-title">The ImageNet Moment</h2>
          <p className="chapter-metaphor">The shot heard round the world</p>
        </header>
        
        {/* Year indicator */}
        <div 
          className="imagenet-year-display"
          style={{ opacity: showRevolution ? 0 : 1, transition: "opacity 0.4s ease" }}
        >
          <span className={`year-number ${isCliffMoment ? "cliff-moment" : ""}`}>
            {currentData?.year}
          </span>
          <span className="method-name">{currentData?.method}</span>
        </div>
        
        {/* Error rate graph */}
        <div 
          className="imagenet-graph"
          style={{ opacity: showRevolution ? 0 : 1, transition: "opacity 0.4s ease" }}
        >
          <div className="graph-container">
            <div className="graph-y-axis">
              <span>30%</span>
              <span>20%</span>
              <span>10%</span>
              <span>0%</span>
            </div>
            <div className="graph-bars-area">
              {imageNetErrorRates.map((data, index) => {
                const isVisible = index <= currentYearIndex;
                const isCurrentYear = index === currentYearIndex;
                const barHeight = (data.errorRate / 30) * 100;
                
                return (
                  <div 
                    key={data.year}
                    className={`graph-bar-wrapper ${isVisible ? "visible" : ""} ${isCurrentYear ? "current" : ""} ${data.isAlexNet ? "alexnet" : ""}`}
                  >
                    <div 
                      className="graph-bar"
                      style={{ 
                        height: isVisible ? `${barHeight}%` : "0%",
                        background: data.isAlexNet 
                          ? "var(--ai-circuit-green)" 
                          : index > 2 
                            ? "var(--ai-neural-blue)" 
                            : "var(--ai-text-tertiary)"
                      }}
                    />
                    <span className="bar-label">{data.year}</span>
                    {isVisible && (
                      <span className="bar-value">{data.errorRate}%</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <p className="graph-caption">ImageNet Top-5 Error Rate</p>
        </div>
        
        {/* The Cliff moment callout */}
        <div className={`cliff-callout ${isCliffMoment ? "visible" : ""}`}>
          <span className="cliff-drop">↓ 10%</span>
          <span className="cliff-text">The cliff. Everything changes.</span>
        </div>
        
        {/* Revolution overlay */}
        <div className={`revolution-overlay ${showRevolution ? "visible" : ""}`}>
          <div className="revolution-content">
            <span className="revolution-year">2012</span>
            <h3 className="revolution-title">AlexNet</h3>
            <p className="revolution-quote">
              &ldquo;It didn&apos;t just win. <span style={{ color: "var(--ai-circuit-green)" }}>It crushed the competition.</span>&rdquo;
            </p>
            <div className="revolution-stats">
              <div className="rev-stat">
                <span className="rev-value">-10%</span>
                <span className="rev-label">Error drop in one year</span>
              </div>
              <div className="rev-stat">
                <span className="rev-value">10×</span>
                <span className="rev-label">More progress than previous decade</span>
              </div>
            </div>
            <p className="revolution-tagline">The modern AI revolution had begun.</p>
          </div>
        </div>
        
        {/* Scroll hint */}
        <div className="scroll-hint" style={{ opacity: progress < 0.05 ? 1 : 0 }}>
          <span>Scroll through the competition</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>
      
      {/* Static content after scroll-lock */}
      <div 
        className="chapter-content imagenet-conclusion"
        ref={contentRef}
        style={{ 
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          opacity: progress > 0.95 ? 1 : 0,
          transition: "opacity 0.6s ease"
        }}
      >
        <div className="chapter-grid">
          <div className="chapter-text">
            <p>
              The field went into shock. Within months, every major tech company was 
              hiring neural network researchers.
            </p>
            <p>
              Fei-Fei Li had spent years building ImageNet when funding agencies called 
              it &ldquo;unimportant.&rdquo; Her dataset became the proving ground for a revolution.
            </p>
          </div>
          
          <div className="chapter-visual">
            <ArchivalPhoto
              src={imageNetImages.feifeiLi?.src}
              alt={imageNetImages.feifeiLi?.alt || "Fei-Fei Li"}
              caption="Fei-Fei Li — created ImageNet when funding agencies called it 'unimportant'"
              source="ITU Pictures / Wikimedia"
              date="2017"
            />
          </div>
        </div>
      </div>
    </section>
  );
};


// ==================== CHAPTER 9: DEEP LEARNING CONQUERS ====================

const Chapter9: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section id="chapter-9" className="chapter chapter-9 era-deep-learning" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 9</span>
          <span className="chapter-date">2012-2017</span>
          <h2 className="chapter-title">Deep Learning Conquers</h2>
          <p className="chapter-metaphor">The dam breaks—and floods everything</p>
        </header>
        
        <div className="chapter-text centered">
          <p className="chapter-intro">
            Deep learning didn&apos;t just succeed at vision. It consumed domain after domain. 
            Speech recognition. Language translation. Game playing. Medical diagnosis. 
            Autonomous vehicles.
          </p>
        </div>
        
        <div className="chapter-grid">
          <div className="chapter-visual">
            <ArchivalPhoto
              src={deepLearningImages.alphaGoMatch?.src}
              alt="AlphaGo vs Lee Sedol"
              caption="March 2016: AlphaGo defeats Lee Sedol at Go"
              source="Google DeepMind"
              date="2016"
              kenBurns
            />
          </div>
          
          <div className="chapter-text">
            <p>
              In 2016, Google DeepMind&apos;s AlphaGo defeated Lee Sedol at Go—a game long 
              thought to require human intuition beyond any algorithm.
            </p>
            
            <blockquote className="historic-quote">
              <p>&ldquo;Move 37&rdquo; — AlphaGo&apos;s move that shocked the Go world. 
              Commentators called it creative. <em>Beautiful.</em></p>
              <cite>— A machine had demonstrated creativity</cite>
            </blockquote>
            
            <p>
              The question shifted from &ldquo;Can neural networks work?&rdquo; to 
              &ldquo;What can&apos;t they do?&rdquo;
            </p>
          </div>
        </div>
        
        {/* The protagonists */}
        <div className="photo-grid" style={{ marginTop: "var(--space-xl)" }}>
          <ArchivalPhoto
            src={deepLearningImages.demisHassabis?.src}
            alt={deepLearningImages.demisHassabis?.alt || "Demis Hassabis"}
            caption="Demis Hassabis — former chess prodigy who founded DeepMind to build AGI"
            source="Royal Society / Wikimedia"
            date="2017"
          />
          <ArchivalPhoto
            src={deepLearningImages.leeSedolPortrait?.src}
            alt={deepLearningImages.leeSedolPortrait?.alt || "Lee Sedol"}
            caption="Lee Sedol — the Go master who became the face of humanity's first confrontation with superhuman AI"
            source="Wikimedia Commons"
            date="2016"
          />
        </div>
        
        <div className="key-figure featured" style={{ marginTop: "var(--space-xl)" }}>
          <div className="figure-photo">
            {deepLearningImages.demisHassabis?.src ? (
              <img 
                src={deepLearningImages.demisHassabis.src} 
                alt={deepLearningImages.demisHassabis.alt}
                loading="lazy"
              />
            ) : (
              <div className="photo-placeholder">
                <span className="placeholder-text">Demis Hassabis</span>
              </div>
            )}
          </div>
          <div className="figure-content">
            <h3>Demis Hassabis — The Game Player</h3>
            <span className="figure-title">Former chess prodigy who founded DeepMind</span>
            <ul className="figure-facts">
              <li>Founded DeepMind with the explicit goal of building AGI</li>
              <li>AlphaGo, AlphaFold, Gemini</li>
              <li>&ldquo;We&apos;re building the most transformative technology in human history&rdquo;</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 10: THE TRANSFORMER ====================

const Chapter10: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section id="chapter-10" className="chapter chapter-10 era-deep-learning" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 10</span>
          <span className="chapter-date">2017</span>
          <h2 className="chapter-title">The Transformer</h2>
          <p className="chapter-metaphor">The architecture that changed everything</p>
        </header>
        
        <div className="chapter-text centered">
          <p className="chapter-intro">
            In 2017, a team at Google published an eight-page paper titled 
            &ldquo;Attention Is All You Need.&rdquo;
          </p>
        </div>
        
        <div className="quote-monument">
          <blockquote>
            <p className="quote-text">
              The paper&apos;s impact was nuclear. Within two years, transformers dominated 
              natural language processing. Then vision. Then audio. Then biology.
            </p>
          </blockquote>
        </div>
        
        <div className="chapter-grid">
          <div className="chapter-text">
            <p>
              The transformer architecture became the universal foundation for modern AI. 
              It introduced the &ldquo;attention mechanism&rdquo;—a way for models to focus 
              on relevant context across entire sequences.
            </p>
            
            <p style={{ color: "var(--ai-warning-red)" }}>
              The authors didn&apos;t fully anticipate what they&apos;d unleashed. Several 
              later expressed concern about the acceleration they enabled.
            </p>
          </div>
          
          <div className="chapter-visual">
            <div className="attention-viz">
              <div className="attention-sentence">
                <span className="attention-word">The</span>
                <span className="attention-word highlighted">cat</span>
                <span className="attention-word">sat</span>
                <span className="attention-word">on</span>
                <span className="attention-word">the</span>
                <span className="attention-word highlighted">mat</span>
                <span className="attention-word">because</span>
                <span className="attention-word focused">it</span>
                <span className="attention-word">was</span>
                <span className="attention-word">tired</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--ai-text-muted)", textAlign: "center", marginTop: "1rem" }}>
                Attention: The model learns which words relate to each other
              </p>
            </div>
          </div>
        </div>
        
        <div className="data-stats" style={{ marginTop: "var(--space-xl)" }}>
          <div className="stat-card">
            <span className="stat-value">8</span>
            <span className="stat-label">Pages that changed everything</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">150K+</span>
            <span className="stat-label">Citations and counting</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">2017</span>
            <span className="stat-label">The foundation was laid</span>
          </div>
        </div>
        
        {/* Transformer architecture diagram */}
        <div className="chapter-visual" style={{ marginTop: "var(--space-xl)", maxWidth: "500px", margin: "var(--space-xl) auto" }}>
          <ArchivalPhoto
            src={transformerImages.transformerArchitecture?.src}
            alt={transformerImages.transformerArchitecture?.alt || "Transformer architecture diagram"}
            caption="The Transformer architecture — attention mechanisms that revolutionized AI"
            source="Wikimedia Commons"
            date="2017"
          />
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 11: FOUNDATION MODELS ====================

const Chapter11: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section id="chapter-11" className="chapter chapter-11 era-deep-learning" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 11</span>
          <span className="chapter-date">2018-2023</span>
          <h2 className="chapter-title">Language Models Awaken</h2>
          <p className="chapter-metaphor">The Cambrian explosion—suddenly, everything is possible</p>
        </header>
        
        <div className="timeline-section">
          <div className="timeline-event">
            <span className="event-year">2018</span>
            <h4 className="event-title">GPT-1</h4>
            <p className="event-description">
              OpenAI releases GPT-1—a transformer trained on raw text. It could write 
              coherent paragraphs. Interesting, but limited.
            </p>
          </div>
          
          <div className="timeline-event">
            <span className="event-year">2019</span>
            <h4 className="event-title">GPT-2</h4>
            <p className="event-description">
              Good enough to frighten its creators. They delayed release, worried about misuse. 
              The first AI &ldquo;too dangerous to release.&rdquo;
            </p>
          </div>
          
          <div className="timeline-event">
            <span className="event-year">2020</span>
            <h4 className="event-title">GPT-3</h4>
            <p className="event-description">
              Could write essays, code, poetry. It felt like something had shifted. 
              175 billion parameters. Researchers began to wonder if scale was all you needed.
            </p>
          </div>
          
          <div className="timeline-event" style={{ borderLeftColor: "var(--ai-circuit-green)" }}>
            <span className="event-year" style={{ color: "var(--ai-circuit-green)" }}>November 2022</span>
            <h4 className="event-title">ChatGPT</h4>
            <p className="event-description">
              The fastest-growing consumer application in history. 100 million users in two months. 
              For the first time, ordinary people could converse with AI that felt genuinely capable.
            </p>
          </div>
        </div>
        
        <div className="quote-monument" style={{ marginTop: "var(--space-xl)" }}>
          <blockquote>
            <p className="quote-text">
              The technology that researchers had pursued for seventy years was suddenly 
              in everyone&apos;s pocket.
            </p>
          </blockquote>
        </div>
        
        <div className="scientists-gallery" style={{ marginTop: "var(--space-xl)" }}>
          <PioneerPortrait
            pioneer={{
              name: "Sam Altman",
              title: "The Accelerationist",
              era: "CEO of OpenAI",
              quote: "We're on the cusp of the most transformative technology humanity has ever created.",
              photoPlaceholder: "Altman at product launch",
              photoSrc: foundationModelImages.samAltman?.src,
            }}
            delay={0}
          />
          <PioneerPortrait
            pioneer={{
              name: "Dario Amodei",
              title: "The Safety-Conscious Builder",
              era: "CEO of Anthropic",
              quote: "We're in a race—we'd rather the safety-focused labs be at the frontier.",
              photoPlaceholder: "Amodei speaking",
              photoSrc: foundationModelImages.darioAmodei?.src,
            }}
            delay={100}
          />
          <PioneerPortrait
            pioneer={{
              name: "Daniela Amodei",
              title: "The Institutional Architect",
              era: "President of Anthropic",
              quote: "Building the organizational guardrails for AI safety.",
              photoPlaceholder: "Daniela Amodei",
              photoSrc: foundationModelImages.danielaAmodei?.src,
            }}
            delay={200}
          />
          <PioneerPortrait
            pioneer={{
              name: "Ilya Sutskever",
              title: "The Young Visionary",
              era: "Co-founder of OpenAI",
              quote: "It may be that today's large neural networks are slightly conscious.",
              photoPlaceholder: "Sutskever portrait",
              photoSrc: imageNetImages.ilyaSutskever?.src,
            }}
            delay={300}
          />
        </div>
      </div>
    </section>
  );
};

// ==================== CHAPTER 12: THE RECKONING ====================

const Chapter12: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section id="chapter-12" className="chapter chapter-12 era-deep-learning" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-number">Chapter 12</span>
          <span className="chapter-date">2023-Present</span>
          <h2 className="chapter-title">The Reckoning</h2>
          <p className="chapter-metaphor">The questions that remain</p>
        </header>
        
        <div className="chapter-text centered">
          <p className="chapter-intro">
            The field that spent decades begging for attention now faces something unexpected: 
            <strong style={{ color: "var(--ai-warning-red)" }}> fear.</strong>
          </p>
          
          <p>
            Not the science-fiction fear of robot uprisings, but concrete concerns about 
            misinformation, job displacement, concentration of power, and systems too 
            complex for their creators to understand.
          </p>
        </div>
        
        <div className="chapter-grid" style={{ marginTop: "var(--space-xl)" }}>
          <div className="chapter-visual">
            <ArchivalPhoto
              src={reckoningImages.hintonWarning?.src}
              alt="Geoffrey Hinton speaking about AI risks"
              caption="2023: The godfather of deep learning warns about what he helped create"
              source="Press photography"
              date="2023"
            />
          </div>
          
          <div className="chapter-text">
            <blockquote className="historic-quote">
              <p>&ldquo;I&apos;ve come to believe that these things could become more intelligent 
              than us... and we need to worry about how to stop them from taking over.&rdquo;</p>
              <cite>— Geoffrey Hinton, 2023 (after leaving Google)</cite>
            </blockquote>
            
            <p>
              The researchers who built modern AI are themselves uncertain about what 
              they&apos;ve created. The debates that once seemed philosophical—consciousness, 
              alignment, control—are now engineering challenges without clear solutions.
            </p>
          </div>
        </div>
        
        {/* The Scale */}
        <div className="chapter-visual" style={{ marginTop: "var(--space-xl)", maxWidth: "800px", margin: "var(--space-xl) auto" }}>
          <ArchivalPhoto
            src={reckoningImages.dataCenter?.src}
            alt={reckoningImages.dataCenter?.alt || "Modern data center"}
            caption="The scale of modern AI — entire power plants feeding rows of thinking machines"
            source="CERN / Wikimedia Commons"
            date="2010"
          />
        </div>
        
        <div className="quote-monument" style={{ marginTop: "var(--space-xl)" }}>
          <blockquote>
            <p className="quote-text">
              The story of AI has reached the present tense. 
              <span style={{ color: "var(--ai-neural-blue)" }}> Its ending is unwritten.</span>
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

// ==================== EPILOGUE ====================

const EpilogueSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section id="epilogue" className="chapter epilogue era-deep-learning" ref={ref}>
      <div className={`chapter-content ${isVisible ? "revealed" : ""}`}>
        <header className="chapter-header">
          <span className="chapter-date">Epilogue</span>
          <h2 className="chapter-title">The Open Question</h2>
        </header>
        
        <div className="chapter-text centered">
          <p className="chapter-intro" style={{ fontSize: "1.5rem" }}>
            In 1950, Alan Turing asked:
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.75rem", color: "var(--ai-text-primary)", margin: "var(--space-lg) 0" }}>
            &ldquo;Can a machine think?&rdquo;
          </p>
        </div>
        
        <div className="chapter-text centered" style={{ marginTop: "var(--space-xl)" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "var(--ai-text-secondary)" }}>
            Now new questions layer over it:
          </p>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)", alignItems: "center", margin: "var(--space-xl) 0" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.125rem", color: "var(--ai-computation-purple)" }}>
            &ldquo;Should a machine think?&rdquo;
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.125rem", color: "var(--ai-terminal-amber)" }}>
            &ldquo;Who controls a thinking machine?&rdquo;
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.125rem", color: "var(--ai-warning-red)" }}>
            &ldquo;What happens when machines think better than we do?&rdquo;
          </p>
        </div>
        
        {/* Turing statue - completing the circle */}
        <div className="chapter-visual" style={{ marginTop: "var(--space-xl)", maxWidth: "500px", margin: "var(--space-xl) auto" }}>
          <ArchivalPhoto
            src={epilogueImages.turingStatue?.src}
            alt={epilogueImages.turingStatue?.alt || "Alan Turing memorial statue"}
            caption="Turing's statue in Manchester — the prophet remembered, finally honored"
            source="Wikimedia Commons"
            date="2007"
          />
        </div>
        
        <div className="quote-monument" style={{ marginTop: "var(--space-xl)" }}>
          <blockquote>
            <p className="quote-text" style={{ fontSize: "1.25rem" }}>
              In 2025, machines are asking humans to define what thinking means.
              <br />
              <span style={{ color: "var(--ai-neural-blue)" }}>
                The answer will shape everything that follows.
              </span>
            </p>
          </blockquote>
        </div>
        
        <div className="chapter-text centered" style={{ marginTop: "var(--space-2xl)" }}>
          <p style={{ color: "var(--ai-text-muted)", fontStyle: "italic" }}>
            The user who completes this essay now understands not just what AI is, 
            but why it took so long, why it suddenly accelerated, and why the people 
            who built it are themselves uncertain about what comes next.
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
      category: "Key Works & Books",
      items: [
        "Nils J. Nilsson, \"The Quest for Artificial Intelligence\" (2009)",
        "Pedro Domingos, \"The Master Algorithm\" (2015)",
        "Cade Metz, \"Genius Makers\" (2021)",
        "Stuart Russell & Peter Norvig, \"Artificial Intelligence: A Modern Approach\"",
        "Michael Wooldridge, \"The Road to Conscious Machines\" (2020)",
      ]
    },
    {
      category: "Archives & Primary Sources",
      items: [
        "Computer History Museum — AI Gallery",
        "MIT Museum — Artificial Intelligence Collection",
        "Stanford AI Lab Historical Archives",
        "ACM Digital Library",
        "IEEE Annals of the History of Computing",
      ]
    },
    {
      category: "Original Papers",
      items: [
        "Alan Turing, \"Computing Machinery and Intelligence\" (1950)",
        "McCarthy et al., \"A Proposal for the Dartmouth Summer Research Project\" (1955)",
        "Rosenblatt, \"The Perceptron\" (1958)",
        "Rumelhart, Hinton, Williams, \"Learning representations by back-propagating errors\" (1986)",
        "Vaswani et al., \"Attention Is All You Need\" (2017)",
      ]
    },
    {
      category: "Contemporary Sources",
      items: [
        "OpenAI Research Publications",
        "Google AI Blog",
        "DeepMind Publications",
        "Anthropic Research",
        "arXiv Machine Learning Archive",
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
        
        <div className="photo-credits">
          <h3>Photography Credits</h3>
          <p>
            Historical photographs sourced from public archives including the Computer History Museum, 
            MIT Museum, Stanford AI Lab Archives, and various university collections. Contemporary 
            photographs from press releases and news photography, used under fair use for educational 
            purposes. Era-specific visual treatments (grayscale, sepia, color grading) applied to 
            evoke historical periods.
          </p>
        </div>
      </div>
    </section>
  );
};

// ==================== MAIN COMPONENT ====================

const ThinkingMachineClient: React.FC = () => {
  const globalProgress = useGlobalScrollProgress();
  
  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <article className="thinking-machine-story" aria-label="The Thinking Machine: A Visual History of Artificial Intelligence">
      {/* Skip link for accessibility - allows keyboard users to bypass scroll-lock */}
      <a href="#prologue" className="skip-link">
        Skip to content
      </a>
      
      {/* Neural network progress bar */}
      <NeuralNetworkProgressBar progress={globalProgress} />
      
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
      <Chapter10 />
      <Chapter11 />
      <Chapter12 />
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

export default ThinkingMachineClient;

