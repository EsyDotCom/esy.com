/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import "./the-silicon-revolution.css";
import { figureImages, chapter1Images, technologyImages, modernImages, heroImages, type SiliconImage } from "./images";

// ============================================================================
// DESIGN RESEARCH REPORT: THE SILICON REVOLUTION
// ============================================================================
// Visual Identity: Technical precision meets historical gravitas
// Color Palette: Silicon Blue (#0A1628), Wafer Gray (#1A2634), Gold Trace (#D4A84B)
// Typography: Inter (display/body), Georgia (quotes), JetBrains Mono (technical)
// Animation Philosophy: Educator-first reveals, technical explanations via scroll-lock
// Unique Interactions: Circuit trace progress bar, transistor explainer, Moore's Law viz
// Photo Treatment: Era-based (B&W 1940s-60s, faded 70s-80s, vivid 90s+, modern present)
// Tone: EDUCATOR - clarity over drama, one metaphor per chapter max
// ============================================================================

// ==================== TYPE DEFINITIONS ====================

interface Figure {
  id: string;
  name: string;
  title: string;
  era: string;
  years: string;
  contribution: string[];
  quote: string;
  quoteSource: string;
  legacy?: string;
  imagePlaceholder: string;
  imageUrl?: string;
  imageAlt?: string;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  significance: string;
}

interface MooresLawDataPoint {
  year: number;
  chip: string;
  transistors: number;
  node: string;
}

interface ManufacturingShare {
  year: number;
  usa: number;
  japan: number;
  europe: number;
  taiwan: number;
  korea: number;
  china: number;
}

// ==================== DATA: KEY FIGURES (ALL 12) ====================

const keyFigures: Figure[] = [
  {
    id: "bardeen",
    name: "John Bardeen",
    title: "The Quiet Theorist",
    era: "1940s",
    years: "1908–1991",
    contribution: [
      "Co-invented the point-contact transistor at Bell Labs",
      "Only person to win two Nobel Prizes in Physics",
      "Provided theoretical framework for semiconductor behavior",
    ],
    quote: "Science is a field which grows continuously with ever expanding frontiers.",
    quoteSource: "Nobel acceptance speech, 1956",
    legacy: "Left Bell Labs partly due to friction with Shockley",
    imagePlaceholder: "[Bell Labs portrait, 1940s — thoughtful, reserved]",
    imageUrl: figureImages.bardeen?.src,
    imageAlt: figureImages.bardeen?.alt,
  },
  {
    id: "brattain",
    name: "Walter Brattain",
    title: "The Experimentalist",
    era: "1940s",
    years: "1902–1987",
    contribution: [
      "Built the first working point-contact transistor",
      "Experimental physicist who made theory real",
      "Shared 1956 Nobel Prize with Bardeen and Shockley",
    ],
    quote: "I knew the transistor was important, but I had no idea it would lead to all this.",
    quoteSource: "Bell Labs oral history",
    imagePlaceholder: "[Bell Labs, working in laboratory — hands-on]",
    imageUrl: figureImages.brattain?.src,
    imageAlt: figureImages.brattain?.alt,
  },
  {
    id: "shockley",
    name: "William Shockley",
    title: "The Brilliant Tyrant",
    era: "1940s–1950s",
    years: "1910–1989",
    contribution: [
      "Invented the junction transistor (1951)",
      "Founded Shockley Semiconductor in Palo Alto",
      "Inadvertently created Silicon Valley through his toxicity",
    ],
    quote: "If you take a bale of hay and tie it to the tail of a mule and then strike a match and set the bale of hay on fire, and if you then compare the energy expended shortly thereafter by the mule with the energy expended by yourself in the striking of the match, you will understand the concept of amplification.",
    quoteSource: "Attributed, various interviews",
    legacy: "His management style drove the Traitorous Eight to leave",
    imagePlaceholder: "[Bell Labs portrait, formal — intense gaze]",
    imageUrl: figureImages.shockley?.src,
    imageAlt: figureImages.shockley?.alt,
  },
  {
    id: "noyce",
    name: "Robert Noyce",
    title: "The Mayor of Silicon Valley",
    era: "1950s–1960s",
    years: "1927–1990",
    contribution: [
      "Co-invented the planar integrated circuit",
      "Co-founded Fairchild Semiconductor (1957)",
      "Co-founded Intel with Gordon Moore (1968)",
    ],
    quote: "Don't be encumbered by history. Go off and do something wonderful.",
    quoteSource: "Widely attributed",
    legacy: "The charismatic leader who gave Silicon Valley its culture",
    imagePlaceholder: "[Fairchild era — casual confidence, pilot's swagger]",
    imageUrl: figureImages.noyce?.src,
    imageAlt: figureImages.noyce?.alt,
  },
  {
    id: "moore",
    name: "Gordon Moore",
    title: "The Prophet of Progress",
    era: "1960s",
    years: "1929–2023",
    contribution: [
      "Articulated Moore's Law (1965)",
      "Co-founded Intel with Robert Noyce",
      "Guided industry roadmap for 50 years",
    ],
    quote: "The complexity for minimum component costs has increased at a rate of roughly a factor of two per year.",
    quoteSource: "Electronics Magazine, April 19, 1965",
    legacy: "His observation became a self-fulfilling prophecy",
    imagePlaceholder: "[1960s, at work — quiet, analytical]",
    imageUrl: figureImages.moore?.src,
    imageAlt: figureImages.moore?.alt,
  },
  {
    id: "kilby",
    name: "Jack Kilby",
    title: "The Other Inventor",
    era: "1950s",
    years: "1923–2005",
    contribution: [
      "Invented the integrated circuit at Texas Instruments (1958)",
      "Demonstrated first working IC on September 12, 1958",
      "Won Nobel Prize in Physics (2000)",
    ],
    quote: "What we didn't realize then was that the integrated circuit would reduce the cost of electronic functions by a factor of a million to one.",
    quoteSource: "Nobel Lecture, December 2000",
    legacy: "Noyce and Kilby share credit for the IC; Kilby outlived Noyce to receive the Nobel",
    imagePlaceholder: "[Texas Instruments, with IC prototype]",
    imageUrl: figureImages.kilby?.src,
    imageAlt: figureImages.kilby?.alt,
  },
  {
    id: "hoff",
    name: "Ted Hoff",
    title: "The Microprocessor Architect",
    era: "1970s",
    years: "1937–present",
    contribution: [
      "Conceived single-chip CPU architecture",
      "Led development of Intel 4004 (1971)",
      "Invented the microprocessor concept",
    ],
    quote: "We put together a small computer—all on one chip.",
    quoteSource: "Intel oral history",
    imagePlaceholder: "[Intel, 1970s — engineer at work]",
    imageUrl: figureImages.hoff?.src,
    imageAlt: figureImages.hoff?.alt,
  },
  {
    id: "grove",
    name: "Andy Grove",
    title: "The Paranoid Survivor",
    era: "1970s–1990s",
    years: "1936–2016",
    contribution: [
      "Built Intel's operational excellence as CEO",
      "Drove the pivot from memory to microprocessors",
      "Created 'Intel Inside' marketing phenomenon",
    ],
    quote: "Only the paranoid survive.",
    quoteSource: "Book title, 1996",
    legacy: "Escaped Hungary during the 1956 uprising; built Intel into a powerhouse",
    imagePlaceholder: "[Intel office — intense, focused]",
    imageUrl: figureImages.grove?.src,
    imageAlt: figureImages.grove?.alt,
  },
  {
    id: "chang",
    name: "Morris Chang",
    title: "The Foundry Father",
    era: "1980s–present",
    years: "1931–present",
    contribution: [
      "Founded TSMC in 1987",
      "Invented the pure-play foundry business model",
      "Enabled the fabless semiconductor industry",
    ],
    quote: "I didn't start TSMC to compete with Intel. I started it to enable a whole new industry.",
    quoteSource: "Business interviews",
    legacy: "Born in China, MIT/Stanford educated, TI veteran; founded TSMC at age 55",
    imagePlaceholder: "[TSMC founder portrait — dignified, assured]",
    imageUrl: figureImages.chang?.src,
    imageAlt: figureImages.chang?.alt,
  },
  {
    id: "wennink",
    name: "Peter Wennink",
    title: "The Lightsmith",
    era: "2000s–2020s",
    years: "1957–present",
    contribution: [
      "Led ASML as CEO during EUV commercialization",
      "Built the world's only EUV lithography company",
      "Made ASML indispensable to advanced chipmaking",
    ],
    quote: "There is no alternative to EUV if you want to continue Moore's Law.",
    quoteSource: "Industry interviews",
    legacy: "Retired 2024 after making ASML a $300B company",
    imagePlaceholder: "[ASML corporate — technical executive]",
    imageUrl: figureImages.wennink?.src,
    imageAlt: figureImages.wennink?.alt,
  },
  {
    id: "su",
    name: "Lisa Su",
    title: "The Turnaround Artist",
    era: "2010s–present",
    years: "1969–present",
    contribution: [
      "Revived AMD from near-bankruptcy as CEO",
      "Led development of Zen architecture",
      "Made AMD competitive with Intel again",
    ],
    quote: "You have to set very high goals. And you have to be willing to put in the work every single day to meet those goals.",
    quoteSource: "Various interviews",
    imagePlaceholder: "[AMD corporate — confident, professional]",
    imageUrl: figureImages.su?.src,
    imageAlt: figureImages.su?.alt,
  },
  {
    id: "huang",
    name: "Jensen Huang",
    title: "The AI Kingmaker",
    era: "2000s–present",
    years: "1963–present",
    contribution: [
      "Co-founded NVIDIA (1993)",
      "Pivoted from gaming GPUs to AI compute",
      "Built CUDA platform for parallel computing",
    ],
    quote: "Software is eating the world, but AI is going to eat software.",
    quoteSource: "Conference appearances",
    legacy: "Made NVIDIA the most valuable semiconductor company",
    imagePlaceholder: "[NVIDIA keynote — leather jacket, showman]",
    imageUrl: figureImages.huang?.src,
    imageAlt: figureImages.huang?.alt,
  },
];

// ==================== DATA: TIMELINE ====================

const timeline: TimelineEvent[] = [
  {
    year: "1947",
    title: "The First Transistor",
    description: "Bardeen and Brattain demonstrate the point-contact transistor at Bell Labs",
    significance: "Birth of solid-state electronics",
  },
  {
    year: "1954",
    title: "Silicon Wins",
    description: "Texas Instruments produces the first silicon transistor",
    significance: "Silicon replaces germanium as the standard",
  },
  {
    year: "1957",
    title: "The Traitorous Eight",
    description: "Eight engineers leave Shockley to found Fairchild Semiconductor",
    significance: "Silicon Valley's origin moment",
  },
  {
    year: "1958",
    title: "The Integrated Circuit",
    description: "Jack Kilby demonstrates the first IC at Texas Instruments",
    significance: "Integration replaces discrete components",
  },
  {
    year: "1959",
    title: "The Planar Process",
    description: "Robert Noyce patents the planar integrated circuit at Fairchild",
    significance: "Manufacturing breakthrough enables mass production",
  },
  {
    year: "1965",
    title: "Moore's Law",
    description: "Gordon Moore observes transistor doubling in Electronics Magazine",
    significance: "Industry roadmap for 50 years",
  },
  {
    year: "1968",
    title: "Intel Founded",
    description: "Noyce and Moore leave Fairchild to start Intel",
    significance: "The company that will dominate PCs",
  },
  {
    year: "1971",
    title: "The Microprocessor",
    description: "Intel releases the 4004—a computer on a chip",
    significance: "Personal computing becomes possible",
  },
  {
    year: "1981",
    title: "The IBM PC",
    description: "IBM chooses Intel's 8088 for the first IBM PC",
    significance: "Intel becomes the PC standard",
  },
  {
    year: "1985",
    title: "Intel's Pivot",
    description: "Andy Grove exits memory business, bets on microprocessors",
    significance: "Strategic transformation saves Intel",
  },
  {
    year: "1987",
    title: "The Foundry Model",
    description: "Morris Chang founds TSMC in Taiwan",
    significance: "Design separates from manufacturing",
  },
  {
    year: "1993",
    title: "Intel Inside",
    description: "Intel launches consumer marketing campaign",
    significance: "Chips become branded products",
  },
  {
    year: "2006",
    title: "Apple's Switch",
    description: "Apple announces transition from PowerPC to Intel",
    significance: "Intel at its peak influence",
  },
  {
    year: "2012",
    title: "TSMC Leads",
    description: "TSMC surpasses Intel in manufacturing technology",
    significance: "Foundry ascendancy begins",
  },
  {
    year: "2019",
    title: "EUV Production",
    description: "TSMC begins volume production with EUV lithography",
    significance: "New era of chipmaking",
  },
  {
    year: "2020",
    title: "The Chip Shortage",
    description: "COVID exposes semiconductor supply chain fragility",
    significance: "Chips become geopolitical priority",
  },
  {
    year: "2020",
    title: "Apple Silicon",
    description: "Apple announces M1 chip, leaves Intel",
    significance: "Intel loses its most prestigious customer",
  },
  {
    year: "2022",
    title: "The CHIPS Act",
    description: "US commits $52 billion to domestic semiconductor manufacturing",
    significance: "Reshoring begins",
  },
  {
    year: "2023",
    title: "AI Explosion",
    description: "ChatGPT drives unprecedented demand for AI chips",
    significance: "NVIDIA becomes most valuable chipmaker",
  },
];

// ==================== DATA: MOORE'S LAW ====================

const mooresLawData: MooresLawDataPoint[] = [
  { year: 1971, chip: "Intel 4004", transistors: 2300, node: "10 μm" },
  { year: 1974, chip: "Intel 8080", transistors: 4500, node: "6 μm" },
  { year: 1978, chip: "Intel 8086", transistors: 29000, node: "3 μm" },
  { year: 1982, chip: "Intel 286", transistors: 134000, node: "1.5 μm" },
  { year: 1985, chip: "Intel 386", transistors: 275000, node: "1.5 μm" },
  { year: 1989, chip: "Intel 486", transistors: 1200000, node: "1 μm" },
  { year: 1993, chip: "Pentium", transistors: 3100000, node: "0.8 μm" },
  { year: 1997, chip: "Pentium II", transistors: 7500000, node: "0.35 μm" },
  { year: 2000, chip: "Pentium 4", transistors: 42000000, node: "180 nm" },
  { year: 2004, chip: "Prescott", transistors: 125000000, node: "90 nm" },
  { year: 2008, chip: "Core i7", transistors: 731000000, node: "45 nm" },
  { year: 2012, chip: "Ivy Bridge", transistors: 1400000000, node: "22 nm" },
  { year: 2016, chip: "Kaby Lake", transistors: 3000000000, node: "14 nm" },
  { year: 2020, chip: "Apple M1", transistors: 16000000000, node: "5 nm" },
  { year: 2022, chip: "Apple M2 Ultra", transistors: 134000000000, node: "5 nm" },
  { year: 2023, chip: "NVIDIA H100", transistors: 80000000000, node: "4 nm" },
];

// ==================== DATA: MANUFACTURING SHARE ====================

const manufacturingData: ManufacturingShare[] = [
  { year: 1990, usa: 37, japan: 49, europe: 9, taiwan: 0, korea: 0, china: 0 },
  { year: 2000, usa: 28, japan: 27, europe: 11, taiwan: 22, korea: 8, china: 1 },
  { year: 2010, usa: 13, japan: 15, europe: 9, taiwan: 22, korea: 17, china: 9 },
  { year: 2020, usa: 12, japan: 15, europe: 9, taiwan: 22, korea: 20, china: 16 },
  { year: 2024, usa: 10, japan: 13, europe: 8, taiwan: 22, korea: 18, china: 18 },
];

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

const useScrollProgress = () => {
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

// Scroll-lock hook for pinned animation sections
const useScrollLock = (heightMultiplier: number = 3) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Throttle via requestAnimationFrame for 60fps
      if (rafId.current) return;
      
      rafId.current = requestAnimationFrame(() => {
        if (!containerRef.current) {
          rafId.current = null;
          return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionTop = rect.top;
        const sectionTotalHeight = rect.height;
        const scrollableDistance = sectionTotalHeight - windowHeight;
        const scrolledIntoSection = -sectionTop;

        // Check if we're within the scroll-lock zone
        const inLockZone = sectionTop <= 0 && scrolledIntoSection <= scrollableDistance && scrolledIntoSection >= 0;

        if (inLockZone) {
          const newProgress = scrolledIntoSection / scrollableDistance;
          // Clamp between 0 and 1
          const clampedProgress = Math.min(Math.max(newProgress, 0), 1);
          
          setIsLocked(true);
          setProgress(clampedProgress);
        } else {
          setIsLocked(false);
          // Set to 0 if before section, 1 if after
          setProgress(sectionTop > 0 ? 0 : 1);
        }
        
        rafId.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call to set state on mount
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []); // Empty deps - containerRef is stable

  return { containerRef, progress, isLocked };
};

// ==================== COMPONENTS ====================

// Circuit Trace Progress Bar
const CircuitProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  const nodes = 8;
  const activeNodes = Math.floor(progress * nodes);
  
  return (
    <div className="sr-progress-bar">
      <div 
        className="sr-progress-bar-fill" 
        style={{ width: `${progress * 100}%` }}
      />
      <div className="sr-progress-nodes">
        {Array.from({ length: nodes }).map((_, i) => (
          <div 
            key={i}
            className={`sr-progress-node ${i < activeNodes ? 'active' : ''}`}
            style={{ left: `${((i + 1) / nodes) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
};

// Archival Photo Component
const ArchivalPhoto: React.FC<{ 
  image: SiliconImage; 
  size?: 'full' | 'half' | 'third';
  className?: string;
}> = ({ image, size = 'full', className = '' }) => {
  const { ref, isVisible } = useIntersectionReveal(0.2);
  
  return (
    <figure 
      ref={ref}
      className={`sr-archival-photo sr-photo-${size} ${isVisible ? 'visible' : ''} ${className}`}
    >
      <div className="sr-photo-wrapper">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={size === 'full' ? '100vw' : size === 'half' ? '50vw' : '33vw'}
          style={{ objectFit: 'cover' }}
          className={`sr-photo-image ${image.era ? `sr-era-${image.era.replace('s', '')}` : ''}`}
        />
      </div>
      <figcaption className="sr-photo-caption">
        <span className="sr-photo-caption-text">{image.caption}</span>
        <span className="sr-photo-attribution">{image.attribution}</span>
      </figcaption>
    </figure>
  );
};

// Photo Grid Component
const PhotoGrid: React.FC<{ images: SiliconImage[]; columns?: 2 | 3 }> = ({ images, columns = 2 }) => {
  return (
    <div className={`sr-photo-grid sr-photo-grid-${columns}`}>
      {images.map((image) => (
        <ArchivalPhoto key={image.id} image={image} size={columns === 2 ? 'half' : 'third'} />
      ))}
    </div>
  );
};

// Figure Profile Card (Compact)
const FigureProfileCompact: React.FC<{ figure: Figure }> = ({ figure }) => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  
  return (
    <div 
      ref={ref}
      className={`sr-figure-profile ${isVisible ? 'visible' : ''}`}
    >
      <div className="sr-figure-photo-container">
        <div className="sr-figure-photo">
          {figure.imageUrl ? (
            <Image
              src={figure.imageUrl}
              alt={figure.imageAlt || figure.name}
              fill
              sizes="180px"
              style={{ objectFit: 'cover' }}
              className="sr-figure-image"
            />
          ) : (
            <span className="sr-figure-photo-placeholder">{figure.imagePlaceholder}</span>
          )}
        </div>
        <span className="sr-figure-years">{figure.years}</span>
      </div>
      <div className="sr-figure-info">
        <h3 className="sr-figure-name">{figure.name}</h3>
        <p className="sr-figure-title">{figure.title}</p>
        <ul className="sr-figure-contributions">
          {figure.contribution.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
        <blockquote className="sr-figure-quote">
          "{figure.quote}"
          <cite>— {figure.quoteSource}</cite>
        </blockquote>
        {figure.legacy && (
          <p className="sr-figure-legacy">{figure.legacy}</p>
        )}
      </div>
    </div>
  );
};

// Figure Grid (for showing multiple figures)
const FigureGrid: React.FC<{ figures: Figure[] }> = ({ figures }) => {
  return (
    <div className="sr-figure-grid">
      {figures.map((figure) => (
        <FigureProfileCompact key={figure.id} figure={figure} />
      ))}
    </div>
  );
};

// Moore's Law Chart
const MooresLawChart: React.FC<{ progress?: number }> = ({ progress = 1 }) => {
  const visiblePoints = Math.ceil(progress * mooresLawData.length);
  const maxTransistors = Math.max(...mooresLawData.map(d => d.transistors));
  
  return (
    <div className="sr-chart-container sr-moores-law-chart">
      <h3 className="sr-chart-title">Moore's Law: Transistor Count (1971–2023)</h3>
      <div className="sr-chart-area">
        <div className="sr-chart-y-axis">
          <span>100B</span>
          <span>10B</span>
          <span>1B</span>
          <span>100M</span>
          <span>10M</span>
          <span>1M</span>
          <span>100K</span>
          <span>1K</span>
        </div>
        <div className="sr-chart-bars">
          {mooresLawData.slice(0, visiblePoints).map((point, i) => {
            const logValue = Math.log10(point.transistors);
            const logMax = Math.log10(maxTransistors);
            const logMin = Math.log10(1000);
            const height = ((logValue - logMin) / (logMax - logMin)) * 100;
            
            return (
              <div key={point.year} className="sr-chart-bar-container">
                <div 
                  className="sr-chart-bar"
                  style={{ 
                    height: `${height}%`,
                    transitionDelay: `${i * 50}ms`
                  }}
                >
                  <span className="sr-chart-bar-label">
                    {point.transistors >= 1e9 
                      ? `${(point.transistors / 1e9).toFixed(0)}B`
                      : point.transistors >= 1e6 
                        ? `${(point.transistors / 1e6).toFixed(0)}M`
                        : `${(point.transistors / 1e3).toFixed(0)}K`
                    }
                  </span>
                </div>
                <span className="sr-chart-x-label">{point.year}</span>
              </div>
            );
          })}
        </div>
      </div>
      <p className="sr-chart-insight">
        From 2,300 transistors to 80 billion — a 35-million-fold increase in 52 years
      </p>
      <p className="sr-chart-source">
        Source: Intel, Apple, NVIDIA product specifications
      </p>
    </div>
  );
};

// Manufacturing Share Chart
const ManufacturingChart: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.3);
  const latestData = manufacturingData[manufacturingData.length - 1];
  
  const regions = [
    { key: 'taiwan', label: 'Taiwan', color: '#10B981' },
    { key: 'korea', label: 'South Korea', color: '#3B82F6' },
    { key: 'china', label: 'China', color: '#EF4444' },
    { key: 'japan', label: 'Japan', color: '#F59E0B' },
    { key: 'usa', label: 'United States', color: '#8B5CF6' },
    { key: 'europe', label: 'Europe', color: '#EC4899' },
  ];

  return (
    <div ref={ref} className={`sr-chart-container sr-manufacturing-chart ${isVisible ? 'visible' : ''}`}>
      <h3 className="sr-chart-title">Global Semiconductor Manufacturing Share (2024)</h3>
      <div className="sr-pie-chart">
        {regions.map((region, i) => {
          const value = latestData[region.key as keyof ManufacturingShare] as number;
          return (
            <div key={region.key} className="sr-pie-segment" style={{ '--delay': `${i * 100}ms` } as React.CSSProperties}>
              <div 
                className="sr-pie-bar" 
                style={{ 
                  width: isVisible ? `${value}%` : '0%',
                  backgroundColor: region.color,
                }}
              />
              <div className="sr-pie-label">
                <span className="sr-pie-region">{region.label}</span>
                <span className="sr-pie-value">{value}%</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="sr-chart-callout">
        <strong>Key Insight:</strong> Taiwan produces 22% of all chips and <em>92% of advanced chips</em> (≤7nm)
      </div>
      <p className="sr-chart-source">
        Source: Semiconductor Industry Association, TrendForce
      </p>
    </div>
  );
};

// Global Manufacturing Map
const ManufacturingMap: React.FC<{ progress: number }> = ({ progress }) => {
  const stage = Math.floor(progress * 5);
  
  const countries = [
    { id: 'taiwan', name: 'Taiwan', share: 22, advanced: 92, x: 78, y: 45, color: '#10B981' },
    { id: 'korea', name: 'South Korea', share: 18, advanced: 8, x: 75, y: 38, color: '#3B82F6' },
    { id: 'china', name: 'China', share: 18, advanced: 0, x: 70, y: 42, color: '#EF4444' },
    { id: 'japan', name: 'Japan', share: 13, advanced: 0, x: 82, y: 38, color: '#F59E0B' },
    { id: 'usa', name: 'United States', share: 10, advanced: 0, x: 22, y: 40, color: '#8B5CF6' },
    { id: 'europe', name: 'Europe', share: 8, advanced: 0, x: 48, y: 35, color: '#EC4899' },
  ];

  const stages = [
    { title: "1990: American Dominance", description: "The US produces 37% of global chips" },
    { title: "2000: Japan Peaks", description: "Japan reaches 27%, but Taiwan emerges at 22%" },
    { title: "2010: Asia Ascends", description: "Manufacturing shifts across the Pacific" },
    { title: "2020: Taiwan's Supremacy", description: "TSMC becomes indispensable" },
    { title: "2024: Concentration Risk", description: "92% of advanced chips from one island" },
  ];

  return (
    <div className="sr-map-container">
      <h3 className="sr-chart-title">The Geography of Chipmaking</h3>
      
      <div className="sr-map-visual">
        <svg viewBox="0 0 100 60" className="sr-world-map">
          {/* Simplified world map outline */}
          <path 
            d="M15,35 Q20,30 25,32 L35,30 Q40,28 45,32 L55,30 Q60,28 65,32 L75,35 Q80,38 85,35"
            fill="none"
            stroke="var(--sr-text-dim)"
            strokeWidth="0.3"
            opacity="0.3"
          />
          
          {/* Country markers */}
          {countries.map((country, i) => {
            const isVisible = i <= stage;
            const size = Math.sqrt(country.share) * 1.5;
            
            return (
              <g key={country.id} className={`sr-map-marker ${isVisible ? 'visible' : ''}`}>
                <circle
                  cx={country.x}
                  cy={country.y}
                  r={isVisible ? size : 0}
                  fill={country.color}
                  opacity={0.8}
                  style={{ transition: 'r 0.5s ease-out', transitionDelay: `${i * 100}ms` }}
                />
                {isVisible && (
                  <>
                    <text
                      x={country.x}
                      y={country.y - size - 2}
                      textAnchor="middle"
                      fill="var(--sr-text-primary)"
                      fontSize="3"
                      fontWeight="600"
                    >
                      {country.name}
                    </text>
                    <text
                      x={country.x}
                      y={country.y + 1}
                      textAnchor="middle"
                      fill="var(--sr-text-primary)"
                      fontSize="2.5"
                      fontWeight="700"
                    >
                      {country.share}%
                    </text>
                  </>
                )}
              </g>
            );
          })}
          
          {/* Taiwan highlight for advanced chips */}
          {stage >= 4 && (
            <g className="sr-taiwan-highlight">
              <circle
                cx={78}
                cy={45}
                r={12}
                fill="none"
                stroke="#10B981"
                strokeWidth="0.5"
                strokeDasharray="2,1"
                opacity="0.6"
              >
                <animate attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite" />
              </circle>
              <text x={78} y={58} textAnchor="middle" fill="#10B981" fontSize="2.5" fontWeight="600">
                92% of advanced chips
              </text>
            </g>
          )}
        </svg>
      </div>
      
      <div className="sr-map-stages">
        {stages.map((s, i) => (
          <div key={i} className={`sr-map-stage ${i === stage ? 'active' : ''} ${i < stage ? 'complete' : ''}`}>
            <span className="sr-map-stage-dot" />
            <div className="sr-map-stage-content">
              <strong>{s.title}</strong>
              <p>{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Hero Zoom Sequence with Real Images
// Choreography based on spec: 0-15%, 15-30%, 30-45%, 45-60%, 60-75%, 75-90%, 90-100%
const HeroZoomSequence: React.FC<{ progress: number; onSkip: () => void }> = ({ progress, onSkip }) => {
  // Map progress (0-1) to 7 stages matching spec choreography
  const getStage = (p: number) => {
    if (p < 0.15) return 0;
    if (p < 0.30) return 1;
    if (p < 0.45) return 2;
    if (p < 0.60) return 3;
    if (p < 0.75) return 4;
    if (p < 0.90) return 5;
    return 6;
  };
  
  const stage = getStage(progress);

  const stages = [
    { label: "Every light you see...", scale: 1, blur: 0 },
    { label: "...runs on the same invention.", scale: 1.1, blur: 0 },
    { label: "Billions of them.", scale: 1.25, blur: 0 },
    { label: "Smaller than a grain of rice.", scale: 1.4, blur: 0 },
    { label: "More intricate than a city.", scale: 1.6, blur: 0 },
    { label: "The transistor.", scale: 1.8, blur: 0 },
    { label: "", scale: 2, blur: 0 }, // Title reveal
  ];

  const currentStage = stages[stage];
  
  // Smooth interpolation for scale based on progress
  const smoothScale = 1 + (progress * 1); // Scale from 1x to 2x
  const smoothBrightness = 0.25 + (progress * 0.45); // Brightness from 0.25 to 0.7
  const overlayOpacity = Math.max(0, 0.7 - (progress * 0.5)); // Overlay fades out

  return (
    <div className="sr-hero-zoom">
      {/* Background Image - Silicon Wafer */}
      <div className="sr-hero-image-container">
        <Image
          src={heroImages[0].src}
          alt={heroImages[0].alt}
          fill
          priority
          sizes="100vw"
          style={{ 
            objectFit: 'cover',
            transform: `scale(${smoothScale})`,
            filter: `brightness(${smoothBrightness})`,
            transition: 'transform 0.1s linear, filter 0.1s linear',
          }}
          className="sr-hero-bg-image"
        />
        <div 
          className="sr-hero-overlay" 
          style={{ 
            opacity: overlayOpacity,
            transition: 'opacity 0.1s linear',
          }} 
        />
      </div>
      
      {/* Content layers */}
      <div className="sr-zoom-content">
        {/* Caption - fades out before title appears */}
        <div 
          className="sr-zoom-caption" 
          style={{ 
            opacity: stage < 6 ? 1 : 0,
            transform: `translateY(${stage >= 5 ? -20 : 0}px)`,
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          <p className="sr-zoom-label">{currentStage.label}</p>
        </div>
        
        {/* Title reveal - appears at 90%+ */}
        <div 
          className="sr-zoom-title-container"
          style={{ 
            opacity: progress >= 0.85 ? Math.min(1, (progress - 0.85) / 0.15) : 0,
            transform: `translateY(${progress >= 0.85 ? 0 : 40}px)`,
            transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <p className="sr-label">A Visual Essay</p>
          <h1 className="sr-zoom-main-title">THE SILICON REVOLUTION</h1>
          <p className="sr-zoom-subtitle">How a Tiny Switch Changed Everything</p>
        </div>
      </div>
      
      {/* Skip button */}
      <button className="sr-skip-button" onClick={onSkip}>
        Skip intro →
      </button>
      
      {/* Progress indicator - 7 dots for 7 stages */}
      <div className="sr-zoom-progress">
        {stages.map((_, i) => (
          <div
            key={i}
            className={`sr-zoom-progress-dot ${i <= stage ? 'active' : ''}`}
          />
        ))}
      </div>
      
      {/* Scroll hint - visible only at start */}
      <div 
        className="sr-hero-scroll-hint" 
        style={{ 
          opacity: progress < 0.15 ? 1 : Math.max(0, 1 - (progress - 0.15) * 10),
          transition: 'opacity 0.3s ease',
        }}
      >
        <span>Scroll to explore</span>
        <div className="sr-scroll-arrow" />
      </div>
    </div>
  );
};

// Skip Affordance Button
const SkipButton: React.FC<{ onClick: () => void; label?: string }> = ({ onClick, label = "Skip →" }) => (
  <button className="sr-skip-button" onClick={onClick} aria-label="Skip this section">
    {label}
  </button>
);

// Transistor Explainer Diagram
const TransistorDiagram: React.FC<{ progress: number }> = ({ progress }) => {
  const stage = Math.floor(progress * 5);
  
  const stages = [
    { label: "Structure", description: "A MOSFET has three terminals: Source, Gate, and Drain" },
    { label: "Gate Off", description: "No voltage on the gate = no channel forms = no current flows" },
    { label: "Gate On", description: "Apply voltage to gate = channel forms = electrons can flow" },
    { label: "Switching", description: "This on/off behavior happens billions of times per second" },
    { label: "Scale", description: "Modern chips have billions of these switches, each just nanometers across" },
  ];

  return (
    <div className="sr-transistor-diagram">
      <div className="sr-diagram-visual">
        <svg viewBox="0 0 300 200" className="sr-transistor-svg">
          {/* Substrate */}
          <rect x="50" y="140" width="200" height="40" fill="#1A2634" stroke="#D4A84B" strokeWidth="1" />
          <text x="150" y="165" textAnchor="middle" fill="#64748B" fontSize="10">P-type Silicon</text>
          
          {/* Source */}
          <rect x="60" y="110" width="50" height="30" fill="#3B82F6" opacity={stage >= 0 ? 1 : 0.3} />
          <text x="85" y="100" textAnchor="middle" fill="#F8FAFC" fontSize="10">Source</text>
          
          {/* Drain */}
          <rect x="190" y="110" width="50" height="30" fill="#3B82F6" opacity={stage >= 0 ? 1 : 0.3} />
          <text x="215" y="100" textAnchor="middle" fill="#F8FAFC" fontSize="10">Drain</text>
          
          {/* Oxide layer */}
          <rect x="110" y="105" width="80" height="10" fill="#8B5CF6" opacity={stage >= 0 ? 1 : 0.3} />
          
          {/* Gate */}
          <rect x="120" y="75" width="60" height="30" fill={stage >= 2 ? "#10B981" : "#D4A84B"} />
          <text x="150" y="65" textAnchor="middle" fill="#F8FAFC" fontSize="10">Gate</text>
          
          {/* Channel */}
          {stage >= 2 && (
            <rect x="110" y="115" width="80" height="25" fill="#10B981" opacity={0.5}>
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1s" repeatCount="indefinite" />
            </rect>
          )}
          
          {/* Electrons */}
          {stage >= 2 && stage < 4 && (
            <>
              {[0, 1, 2, 3, 4].map((i) => (
                <circle 
                  key={i}
                  r="4" 
                  fill="#F8FAFC"
                  opacity={0.8}
                >
                  <animate 
                    attributeName="cx" 
                    values="85;215" 
                    dur="0.8s" 
                    begin={`${i * 0.15}s`}
                    repeatCount="indefinite" 
                  />
                  <animate 
                    attributeName="cy" 
                    values="125;125" 
                    dur="0.8s" 
                    begin={`${i * 0.15}s`}
                    repeatCount="indefinite" 
                  />
                </circle>
              ))}
            </>
          )}
          
          {/* Voltage indicator */}
          {stage >= 1 && (
            <g>
              <line x1="150" y1="45" x2="150" y2="75" stroke={stage >= 2 ? "#10B981" : "#64748B"} strokeWidth="2" />
              <text x="150" y="40" textAnchor="middle" fill={stage >= 2 ? "#10B981" : "#64748B"} fontSize="10">
                {stage >= 2 ? "V+" : "0V"}
              </text>
            </g>
          )}
        </svg>
      </div>
      
      <div className="sr-diagram-stages">
        {stages.map((s, i) => (
          <div key={i} className={`sr-diagram-stage ${i === stage ? 'active' : ''} ${i < stage ? 'complete' : ''}`}>
            <span className="sr-diagram-stage-dot" />
            <div className="sr-diagram-stage-content">
              <strong>{s.label}</strong>
              <p>{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// EUV Explainer
const EUVDiagram: React.FC<{ progress: number }> = ({ progress }) => {
  const stage = Math.floor(progress * 4);
  
  return (
    <div className="sr-euv-diagram">
      <h4 className="sr-diagram-title">EUV Lithography: The Impossible Machine</h4>
      
      <div className="sr-euv-steps">
        <div className={`sr-euv-step ${stage >= 0 ? 'active' : ''}`}>
          <div className="sr-euv-step-icon">💧</div>
          <div className="sr-euv-step-content">
            <strong>1. Tin Droplets</strong>
            <p>Tiny droplets of molten tin fall through a vacuum chamber</p>
          </div>
        </div>
        
        <div className={`sr-euv-step ${stage >= 1 ? 'active' : ''}`}>
          <div className="sr-euv-step-icon">⚡</div>
          <div className="sr-euv-step-content">
            <strong>2. Laser Strike</strong>
            <p>A powerful CO₂ laser vaporizes each droplet into plasma — 50,000 times per second</p>
          </div>
        </div>
        
        <div className={`sr-euv-step ${stage >= 2 ? 'active' : ''}`}>
          <div className="sr-euv-step-icon">✨</div>
          <div className="sr-euv-step-content">
            <strong>3. EUV Light</strong>
            <p>The plasma emits 13.5nm extreme ultraviolet light</p>
          </div>
        </div>
        
        <div className={`sr-euv-step ${stage >= 3 ? 'active' : ''}`}>
          <div className="sr-euv-step-icon">🪞</div>
          <div className="sr-euv-step-content">
            <strong>4. Mirrors</strong>
            <p>EUV is absorbed by glass, so 11 ultra-precise mirrors guide the light to the wafer</p>
          </div>
        </div>
      </div>
      
      <div className="sr-euv-stats">
        <div className="sr-stat">
          <span className="sr-stat-value">180</span>
          <span className="sr-stat-label">tons per machine</span>
        </div>
        <div className="sr-stat">
          <span className="sr-stat-value">$150M+</span>
          <span className="sr-stat-label">per machine</span>
        </div>
        <div className="sr-stat">
          <span className="sr-stat-value">1</span>
          <span className="sr-stat-label">supplier (ASML)</span>
        </div>
        <div className="sr-stat">
          <span className="sr-stat-value">20+</span>
          <span className="sr-stat-label">years to develop</span>
        </div>
      </div>
    </div>
  );
};

// Timeline Item Component (extracted to use hooks properly)
const TimelineItem: React.FC<{ event: TimelineEvent; index: number }> = ({ event, index }) => {
        const { ref, isVisible } = useIntersectionReveal(0.2);
        return (
          <div 
            ref={ref}
            className={`sr-timeline-item ${isVisible ? 'visible' : ''}`}
            style={{ '--delay': `${(index % 5) * 50}ms` } as React.CSSProperties}
          >
            <span className="sr-timeline-year">{event.year}</span>
            <h4 className="sr-timeline-title">{event.title}</h4>
            <p className="sr-timeline-description">{event.description}</p>
          </div>
        );
};

// Timeline Component
const Timeline: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
  return (
    <div className="sr-timeline">
      {events.map((event, index) => (
        <TimelineItem key={`${event.year}-${index}`} event={event} index={index} />
      ))}
    </div>
  );
};

// Section Header
const SectionHeader: React.FC<{
  chapter: number;
  title: string;
  temporalMarker: string;
  metaphor: string;
}> = ({ chapter, title, temporalMarker, metaphor }) => {
  const { ref, isVisible } = useIntersectionReveal();
  
  return (
    <header 
      ref={ref}
      className={`sr-section-header ${isVisible ? 'visible' : ''}`}
    >
      <span className="sr-chapter-marker">
        Chapter {chapter} · {temporalMarker}
      </span>
      <h2 className="sr-headline-2">{title}</h2>
      <p className="sr-chapter-metaphor"><em>{metaphor}</em></p>
    </header>
  );
};

// Scroll-Lock Section
const ScrollLockSection: React.FC<{
  id: string;
  heightMultiplier?: number;
  children: (progress: number, isLocked: boolean) => React.ReactNode;
}> = ({ id, heightMultiplier = 3, children }) => {
  const { containerRef, progress, isLocked } = useScrollLock(heightMultiplier);
  
  return (
    <div 
      ref={containerRef}
      id={id}
      className="sr-scroll-lock"
      style={{ height: `${heightMultiplier * 100}vh` }}
    >
      <div className={`sr-scroll-lock-inner ${isLocked ? 'locked' : ''}`}>
        {children(progress, isLocked)}
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================

export default function SiliconRevolutionClient() {
  const progress = useScrollProgress();
  const [skipHero, setSkipHero] = useState(false);
  const chapter1Ref = useRef<HTMLElement>(null);

  const handleSkipHero = useCallback(() => {
    setSkipHero(true);
    chapter1Ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <article className="silicon-revolution">
      <CircuitProgressBar progress={progress} />
      
      {/* ==================== HERO SCROLL-LOCK SEQUENCE ==================== */}
      {/* Spec: 800px lock - using heightMultiplier of 3 for ~3 screens of scroll */}
      {!skipHero ? (
        <ScrollLockSection id="hero-sequence" heightMultiplier={3}>
          {(heroProgress) => (
            <HeroZoomSequence progress={heroProgress} onSkip={handleSkipHero} />
          )}
        </ScrollLockSection>
      ) : (
        <header className="sr-hero sr-hero-compact">
          <div className="sr-hero-background">
            <div className="sr-hero-grid" />
          </div>
          <div className="sr-hero-content">
            <p className="sr-label">A Visual Essay</p>
            <h1 className="sr-headline-1 sr-hero-title">
              The Silicon Revolution
            </h1>
            <p className="sr-subtitle sr-hero-subtitle">
              How a Tiny Switch Changed Everything
            </p>
          </div>
        </header>
      )}
      
      {/* ==================== HERO STATIC (after scroll-lock) ==================== */}
      <header className="sr-hero-intro-section">
        <div className="sr-container sr-content">
          <p className="sr-body sr-hero-intro">
            From a 1947 laboratory curiosity to the foundation of modern civilization—
            the story of the transistor, the visionaries who built an industry, 
            and why these tiny switches now shape the fate of nations.
          </p>
        </div>
      </header>

      {/* ==================== CHAPTER 1: THE INVENTION ==================== */}
      <section ref={chapter1Ref} className="sr-chapter sr-section" id="chapter-1">
        <div className="sr-container sr-content">
          <SectionHeader
            chapter={1}
            title="The Invention"
            temporalMarker="Bell Labs, December 1947"
            metaphor="The controlled accident"
          />
          
          <p className="sr-body">
            In the winter of 1947, inside a cramped laboratory at Bell Labs in Murray Hill, 
            New Jersey, two physicists did something that would reshape human civilization. 
            John Bardeen and Walter Brattain, working under the direction of William Shockley, 
            demonstrated a device that could amplify an electrical signal using a solid 
            piece of material—no vacuum tube required.
          </p>
          
          <p className="sr-body">
            They called it a <strong>transistor</strong>. It was ugly, unreliable, and almost no one
            outside the lab understood what it meant. Within two decades, it would
            make vacuum tubes obsolete. Within five decades, billions of transistors
            would fit on a chip smaller than a fingernail.
          </p>

          {/* Historic Photo: First Transistor */}
          <ArchivalPhoto image={chapter1Images[0]} size="full" />

          <FigureGrid figures={keyFigures.filter(f => ['bardeen', 'brattain', 'shockley'].includes(f.id))} />
          
          {/* Photo: The Inventors at Bell Labs */}
          <ArchivalPhoto image={chapter1Images[1]} size="full" />
          
          <p className="sr-body">
            The transistor solved a problem that had plagued electronics since its birth: 
            vacuum tubes were hot, fragile, power-hungry, and unreliable. A computer built 
            from vacuum tubes filled a room and required constant maintenance. The transistor 
            promised something different—a switch with no moving parts, no heated filament, 
            no glass envelope waiting to crack.
          </p>
          
          <p className="sr-body">
            But the transistor almost didn't happen. The team's leader, William Shockley, 
            was brilliant and impossible. His theoretical insights guided the work, but his 
            abrasive personality drove talent away. When Shockley later founded his own 
            company in California, his management style would trigger an exodus—eight 
            engineers leaving at once, an act so shocking it earned them a name: 
            <strong> the Traitorous Eight</strong>.
          </p>
          
          <p className="sr-body sr-emphasis">
            That betrayal would create Silicon Valley.
          </p>
        </div>
      </section>

      {/* ==================== CHAPTER 2: HOW IT WORKS ==================== */}
      <section className="sr-chapter" id="chapter-2">
        <div className="sr-container sr-content">
          <SectionHeader
            chapter={2}
            title="How It Works"
            temporalMarker="The Science, Explained"
            metaphor="The gate and the river"
          />
          
          <p className="sr-body">
            A transistor is, at its core, a <strong>controllable switch</strong>. Apply a small voltage to 
            one terminal (the gate), and you control whether current can flow between the 
            other two terminals (source and drain). Think of it like a dam: a small amount 
            of energy controls a much larger flow.
          </p>
        </div>
        
        {/* Scroll-Lock: Transistor Explainer */}
        <ScrollLockSection id="transistor-explainer" heightMultiplier={4}>
          {(progress, isLocked) => (
            <div className="sr-scroll-lock-content">
              <div className="sr-container">
                <TransistorDiagram progress={progress} />
              </div>
            </div>
          )}
        </ScrollLockSection>
        
        <div className="sr-container sr-content">
          <p className="sr-body">
            Modern computers work in binary—ones and zeros—because transistors are 
            fundamentally binary devices. On or off. Current flows or it doesn't. 
            By combining billions of these simple switches in precise arrangements, 
            we can perform any computation.
          </p>
          
          <p className="sr-body">
            The magic isn't in any single transistor. It's in <strong>how many</strong> you can fit 
            in a given space, and <strong>how fast</strong> you can switch them. This is why the 
            semiconductor industry has spent seventy years making transistors smaller. 
            Smaller transistors switch faster, use less power, and cost less per unit. 
            The relentless drive toward miniaturization isn't about elegance—it's about physics.
          </p>
        </div>
      </section>

      {/* ==================== CHAPTER 3: THE TRAITOROUS EIGHT ==================== */}
      <section className="sr-chapter sr-section" id="chapter-3">
        <div className="sr-container sr-content">
          <SectionHeader
            chapter={3}
            title="The Traitorous Eight"
            temporalMarker="1957, California"
            metaphor="The exodus that built an industry"
          />
          
          <p className="sr-body">
            In 1957, eight young engineers did something nearly unthinkable: they quit 
            their jobs at Shockley Semiconductor Laboratory, all on the same day, to 
            found a competing company. Their boss, William Shockley—Nobel laureate, 
            transistor co-inventor—called them traitors. The name stuck.
          </p>
          
          <FigureGrid figures={keyFigures.filter(f => ['noyce', 'moore', 'kilby'].includes(f.id))} />
          
          <p className="sr-body">
            The Traitorous Eight founded <strong>Fairchild Semiconductor</strong>, and from that company 
            would spring Intel, AMD, and dozens of others. Silicon Valley wasn't named 
            for a geographic feature—it was named for the material these companies worked 
            with. The valley's entire identity traces back to eight people who couldn't 
            work for a difficult genius.
          </p>
          
          <p className="sr-body">
            In 1965, Gordon Moore observed something remarkable. Plotting the number 
            of transistors on a chip over time, he noticed they were roughly doubling 
            every year (later revised to every two years). He published this observation 
            in Electronics Magazine. It became known as <strong>Moore's Law</strong>—not a physical law, 
            but a self-fulfilling prophecy that guided the industry for half a century.
          </p>
        </div>
        
        {/* Scroll-Lock: Moore's Law Chart */}
        <ScrollLockSection id="moores-law" heightMultiplier={3}>
          {(progress) => (
            <div className="sr-scroll-lock-content">
              <div className="sr-container">
                <MooresLawChart progress={progress} />
              </div>
            </div>
          )}
        </ScrollLockSection>
      </section>

      {/* ==================== CHAPTER 4: THE MICROPROCESSOR ==================== */}
      <section className="sr-chapter sr-section" id="chapter-4">
        <div className="sr-container sr-content">
          <SectionHeader
            chapter={4}
            title="The Microprocessor Moment"
            temporalMarker="1968–1981"
            metaphor="The computer escapes the room"
          />
          
          <p className="sr-body">
            In 1968, Robert Noyce and Gordon Moore left Fairchild to start a new company. 
            They called it <strong>Intel</strong>—a contraction of "integrated electronics." Their initial 
            focus was memory chips, but a Japanese calculator company's request would 
            change everything.
          </p>
          
          <p className="sr-body">
            Busicom wanted a set of chips for a new calculator. Ted Hoff, an Intel 
            engineer, proposed a radical alternative: instead of building custom chips 
            for each function, why not build a single chip that could be <em>programmed</em> to 
            do anything? A general-purpose processor. A computer on a chip.
          </p>
          
          <FigureGrid figures={keyFigures.filter(f => ['hoff', 'grove'].includes(f.id))} />

          {/* Photo: Intel 4004 */}
          <ArchivalPhoto image={technologyImages[1]} size="full" />

          <p className="sr-body">
            The <strong>Intel 4004</strong>, released in November 1971, was the world's first commercial
            microprocessor. It had 2,300 transistors and ran at 740 kHz. Today's
            processors have billions of transistors and run thousands of times faster.
            But the 4004 established the template: a programmable chip that could execute
            stored instructions.
          </p>
          
          <p className="sr-body">
            Intel's success wasn't guaranteed. The company nearly died in the memory 
            business when Japanese competitors undercut them on price. Andy Grove, 
            Intel's CEO, made a brutal decision: abandon memory and bet everything on 
            microprocessors. It was the right call. When IBM chose Intel's 8088 chip 
            for the first IBM PC in 1981, Intel became the engine of the personal 
            computer revolution.
          </p>
        </div>
      </section>

      {/* ==================== CHAPTER 5: THE FOUNDRY REVOLUTION ==================== */}
      <section className="sr-chapter sr-section" id="chapter-5">
        <div className="sr-container sr-content">
          <SectionHeader
            chapter={5}
            title="The Foundry Revolution"
            temporalMarker="1987, Taiwan"
            metaphor="The factory that freed designers"
          />
          
          <p className="sr-body">
            For decades, the semiconductor industry operated on a simple model: if you 
            designed chips, you also manufactured them. Companies like Intel, Texas 
            Instruments, and Motorola ran their own fabrication plants—"fabs"—at 
            enormous cost. Building a new fab required billions of dollars and years 
            of construction.
          </p>
          
          <p className="sr-body">
            Morris Chang saw a different model. What if a company <em>only</em> manufactured 
            chips—no designs of its own? A "pure-play foundry" that would fabricate 
            other companies' designs. This would allow small companies to create chips 
            without building billion-dollar factories.
          </p>
          
          <FigureProfileCompact figure={keyFigures.find(f => f.id === 'chang')!} />

          {/* Photo: TSMC Fab */}
          <ArchivalPhoto image={modernImages[0]} size="full" />

          <p className="sr-body">
            In 1987, Chang founded <strong>Taiwan Semiconductor Manufacturing Company (TSMC)</strong>.
            The industry was skeptical. Who would trust their most valuable intellectual
            property to an outside manufacturer? But Chang's insight was correct. The
            foundry model enabled an explosion of "fabless" chip companies: Qualcomm, 
            NVIDIA, AMD (which later spun off its fabs), and eventually Apple.
          </p>
          
          <ManufacturingChart />
          
          <p className="sr-body">
            Today, TSMC manufactures chips for nearly every major technology company. 
            It produces <strong>92% of the world's most advanced semiconductors</strong>. A single 
            company in Taiwan, on an island 100 miles from China, has become 
            indispensable to global technology.
          </p>
        </div>
      </section>

      {/* ==================== CHAPTER 6: THE SHRINKING RACE ==================== */}
      <section className="sr-chapter" id="chapter-6">
        <div className="sr-container sr-content">
          <SectionHeader
            chapter={6}
            title="The Shrinking Race"
            temporalMarker="1990s–Present"
            metaphor="The physics gauntlet"
          />
          
          <p className="sr-body">
            Making transistors smaller isn't just about cramming more onto a chip. 
            Smaller transistors switch faster and use less power. The economics are 
            compelling: twice as many transistors per square millimeter means roughly 
            half the cost per transistor. The industry has spent trillions of dollars 
            chasing this scaling.
          </p>
          
          <p className="sr-body">
            But physics pushes back. To print ever-smaller features onto silicon, 
            you need shorter wavelengths of light. The industry used 193-nanometer 
            deep ultraviolet (DUV) light for decades, pushing it far beyond its 
            natural limits through clever tricks. Eventually, those tricks weren't enough.
          </p>
          
          <p className="sr-body">
            The answer was <strong>extreme ultraviolet (EUV) lithography</strong>—light with a wavelength 
            of just 13.5 nanometers. EUV light is absorbed by air, so the machines 
            operate in a vacuum. It's absorbed by glass, so mirrors replace lenses. 
            The light source? Tiny droplets of tin vaporized by a powerful laser, 
            50,000 times per second.
          </p>
        </div>
        
        {/* Scroll-Lock: EUV Explainer */}
        <ScrollLockSection id="euv-explainer" heightMultiplier={3}>
          {(progress) => (
            <div className="sr-scroll-lock-content">
              <div className="sr-container">
                <EUVDiagram progress={progress} />
              </div>
            </div>
          )}
        </ScrollLockSection>
        
        <div className="sr-container sr-content">
          {/* Photo: ASML EUV Machine */}
          <ArchivalPhoto image={modernImages[1]} size="full" />
          
          <FigureProfileCompact figure={keyFigures.find(f => f.id === 'wennink')!} />

          <p className="sr-body">
            Only one company on Earth can build EUV machines: <strong>ASML</strong>, based in the
            Netherlands. Without ASML, there are no leading-edge chips. Without
            leading-edge chips, there is no advanced AI, no cutting-edge smartphones,
            no modern data centers. A single company in a small European country has
            become a critical node in the global technology supply chain.
          </p>
        </div>
      </section>

      {/* ==================== CHAPTER 7: THE GEOPOLITICAL CHIP ==================== */}
      <section className="sr-chapter sr-section" id="chapter-7">
        <div className="sr-container sr-content">
          <SectionHeader
            chapter={7}
            title="The Geopolitical Chip"
            temporalMarker="2020–Present"
            metaphor="The strategic resource"
          />
          
          <p className="sr-body">
            In 2020, the COVID-19 pandemic disrupted global supply chains. Car factories 
            shut down because they couldn't get chips. Game console launches were delayed. 
            The chip shortage made visible what had been invisible: modern civilization 
            runs on semiconductors, and the supply is fragile.
          </p>
          
          <p className="sr-body">
            The numbers are stark. Taiwan produces 22% of the world's semiconductors
            and <strong>92% of the most advanced ones</strong>. Taiwan is an island 100 miles from
            mainland China. The Taiwan Strait is now one of the most strategically
            significant bodies of water on Earth.
          </p>
        </div>
        
        {/* Scroll-Lock: Global Manufacturing Map */}
        <ScrollLockSection id="manufacturing-map" heightMultiplier={4}>
          {(mapProgress) => (
            <div className="sr-scroll-lock-content">
              <div className="sr-container">
                <ManufacturingMap progress={mapProgress} />
              </div>
            </div>
          )}
        </ScrollLockSection>
        
        <div className="sr-container sr-content">
          <FigureGrid figures={keyFigures.filter(f => ['su', 'huang'].includes(f.id))} />
          
          <p className="sr-body">
            The United States, once the world's leading chip manufacturer, now 
            produces only about 10% of global supply. In August 2022, President Biden 
            signed the <strong>CHIPS and Science Act</strong>, committing $52 billion to domestic 
            semiconductor manufacturing. Intel, TSMC, and Samsung are building new 
            fabs on American soil.
          </p>
          
          <p className="sr-body">
            Meanwhile, the United States has imposed export controls on advanced 
            semiconductor technology to China. ASML cannot sell its EUV machines to 
            Chinese companies. The goal is to slow China's advancement in AI and 
            military technology. Chips have become instruments of geopolitical competition.
          </p>
          
          <blockquote className="sr-pullquote">
            "Geopolitics is real. Technology is not just technology anymore."
            <cite>— Morris Chang, 2022</cite>
          </blockquote>
        </div>
      </section>

      {/* ==================== CHAPTER 8: WHAT COMES NEXT ==================== */}
      <section className="sr-chapter sr-section" id="chapter-8">
        <div className="sr-container sr-content">
          <SectionHeader
            chapter={8}
            title="What Comes Next"
            temporalMarker="The Present and Near Future"
            metaphor="The plateau and the cliff"
          />
          
          <p className="sr-body">
            Moore's Law is slowing. Transistors are now measured in nanometers—a few 
            dozen atoms across. Quantum effects that were once negligible now cause 
            problems. Each new process node costs more than the last to develop. 
            Fewer companies can afford to stay at the leading edge.
          </p>
          
          <p className="sr-body">
            But the demand for computing power has never been higher. Training a 
            large AI model like GPT-4 requires months of computation on thousands 
            of chips. The AI revolution is driving unprecedented demand for 
            semiconductors—and unprecedented concentration of power among the 
            companies that can supply them.
          </p>
          
          <p className="sr-body">
            The industry is adapting. Instead of making transistors smaller, engineers 
            are <strong>stacking chips in three dimensions</strong>. They're using "chiplets"—small 
            modular pieces that can be combined like building blocks. They're developing 
            new materials and new transistor architectures. The end of Moore's Law 
            doesn't mean the end of progress—it means progress takes new forms.
          </p>
          
          <blockquote className="sr-closing-quote">
            The next transistor revolution won't be about making things smaller. 
            It will be about making things smarter—and deciding who controls that intelligence.
          </blockquote>
        </div>
      </section>

      {/* ==================== TIMELINE SECTION ==================== */}
      <section className="sr-section sr-timeline-section" id="timeline">
        <div className="sr-container">
          <h2 className="sr-headline-2 sr-section-title">Key Moments</h2>
          <p className="sr-subtitle sr-section-subtitle">77 years of semiconductor history</p>
          <Timeline events={timeline} />
        </div>
      </section>

      {/* ==================== SOURCES ==================== */}
      <section className="sr-section sr-sources-section" id="sources">
        <div className="sr-container sr-content">
          <div className="sr-sources">
            <h2 className="sr-sources-title">Sources & Further Reading</h2>
            
            <div className="sr-sources-category">
              <h3>Books</h3>
              <ul className="sr-sources-list">
                <li className="sr-sources-item">
                  Leslie Berlin, <em>The Man Behind the Microchip: Robert Noyce and the Invention of Silicon Valley</em> (Oxford, 2005)
                </li>
                <li className="sr-sources-item">
                  Andrew Grove, <em>Only the Paranoid Survive</em> (Currency Doubleday, 1996)
                </li>
                <li className="sr-sources-item">
                  Chris Miller, <em>Chip War: The Fight for the World's Most Critical Technology</em> (Scribner, 2022)
                </li>
              </ul>
            </div>
            
            <div className="sr-sources-category">
              <h3>Primary Sources</h3>
              <ul className="sr-sources-list">
                <li className="sr-sources-item">
                  Gordon Moore, "Cramming More Components onto Integrated Circuits," <em>Electronics Magazine</em>, April 19, 1965
                </li>
                <li className="sr-sources-item">
                  Nobel Prize Archives: Shockley, Bardeen, Brattain (1956); Jack Kilby (2000)
                </li>
                <li className="sr-sources-item">
                  U.S. Congress, CHIPS and Science Act of 2022
                </li>
              </ul>
            </div>
            
            <div className="sr-sources-category">
              <h3>Data Sources</h3>
              <ul className="sr-sources-list">
                <li className="sr-sources-item">
                  Semiconductor Industry Association (SIA), Industry Statistics
                </li>
                <li className="sr-sources-item">
                  TrendForce, IC Insights, Foundry Market Reports
                </li>
                <li className="sr-sources-item">
                  Intel, Apple, NVIDIA, TSMC, ASML — Corporate Filings and Press Releases
                </li>
              </ul>
            </div>
            
            <div className="sr-sources-category">
              <h3>Archives & Oral Histories</h3>
              <ul className="sr-sources-list">
                <li className="sr-sources-item">
                  Computer History Museum, Oral Histories Collection
                </li>
                <li className="sr-sources-item">
                  IEEE History Center
                </li>
                <li className="sr-sources-item">
                  Bell Labs Archives (via Nokia)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="sr-footer">
        <div className="sr-container">
          <p className="sr-footer-brand">A visual essay by Esy</p>
          <p className="sr-footer-date">December 2024</p>
        </div>
      </footer>
    </article>
  );
}

