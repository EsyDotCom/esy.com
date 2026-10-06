"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import { photoEssays } from "@/data/visualEssays";
import { essayImages } from "./images";
import "./photo-essays.css";

// ============================================================================
// DESIGN RESEARCH REPORT: PHOTO ESSAYS LANDING
// ============================================================================
// Subject: Documentary photography, photojournalism, archival imagery
// Visual Archaeology: Film grain, silver gelatin prints, darkroom chemicals, newsprint
// Color Palette: Deep black (#0A0A0A), warm silver (#9A9A9A), archival cream (#E8E4DC),
//                darkroom red accent (#8B2323), film edge (#2A2A2A)
// Typography: Condensed editorial headlines, elegant serif for body
// Animation Philosophy: Slow cinematic reveals, Ken Burns zooms, documentary pacing
// Unique Element: Film strip progress indicator, aperture-like transitions
// ============================================================================

// ==================== ESSAY DATA WITH IMAGES ====================

// Essay showcases with properly licensed images from images.ts
const essayShowcases = [
  {
    id: "the-manhattan-project",
    title: "Now I Am Become Death",
    subtitle: "The Making of the Atomic Bomb",
    image: essayImages.manhattanProject.src,
    alt: essayImages.manhattanProject.alt,
    pullQuote: "I am become Death, the destroyer of worlds.",
    quoteAttribution: "J. Robert Oppenheimer",
    href: "/essays/history/the-manhattan-project",
    readTime: "22 min",
    imageAttribution: null, // Public Domain - no attribution required
  },
  {
    id: "the-holocaust",
    title: "Never Forget",
    subtitle: "Bearing Witness to the Holocaust",
    image: essayImages.holocaust.src,
    alt: essayImages.holocaust.alt,
    pullQuote: "For the dead and the living, we must bear witness.",
    quoteAttribution: "Elie Wiesel",
    href: "/essays/the-holocaust",
    readTime: "30 min",
    imageAttribution: null, // Public Domain - no attribution required
  },
  {
    id: "the-thinking-machine",
    title: "The Thinking Machine",
    subtitle: "A Visual History of Artificial Intelligence",
    image: essayImages.thinkingMachine.src,
    alt: essayImages.thinkingMachine.alt,
    pullQuote: "Can machines think?",
    quoteAttribution: "Alan Turing, 1950",
    href: "/essays/the-thinking-machine",
    readTime: "25 min",
    imageAttribution: null, // Public Domain - no attribution required
  },
  {
    id: "the-ramayana",
    title: "The Journey Home",
    subtitle: "The Ramayana in Art and Symbol",
    image: essayImages.ramayana.src,
    alt: essayImages.ramayana.alt,
    pullQuote: "Truth is one; sages call it by various names.",
    quoteAttribution: "Rig Veda",
    href: "/essays/the-ramayana",
    readTime: "22 min",
    imageAttribution: null, // CC0 Met Museum - no attribution required
  },
  {
    id: "the-distance-between",
    title: "The Distance Between",
    subtitle: "A History of the Fork",
    image: essayImages.fork.src,
    alt: essayImages.fork.alt,
    pullQuote: "The fork was once condemned as satanic vanity.",
    quoteAttribution: "Byzantine chronicles",
    href: "/essays/the-fork",
    readTime: "25 min",
    imageAttribution: essayImages.fork.attribution, // CC BY-SA 3.0 - attribution required
  },
];

// ==================== CUSTOM HOOKS ====================

// Scroll progress tracking
const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY / scrollHeight;
      setProgress(Math.min(1, Math.max(0, scrolled)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
};

// Intersection observer for reveals
const useIntersectionReveal = (threshold = 0.15) => {
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

// Parallax effect hook
const useParallax = (speed: number = 0.3) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate offset based on element position in viewport
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distance = elementCenter - viewportCenter;
      
      setOffset(distance * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref, offset };
};

// ==================== MINIMAL HEADER ====================

const MinimalHeader: React.FC = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`pe-header ${hasScrolled ? "scrolled" : ""}`}>
      <Link href="/essays" className="pe-header-logo" aria-label="Back to Essays">
        <Logo suffix="" href="" showText={false} theme="dark" size={52} />
      </Link>
    </header>
  );
};

// ==================== FILM STRIP PROGRESS ====================

const FilmStripProgress: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="film-progress" role="progressbar" aria-valuenow={Math.round(progress * 100)}>
      <div className="film-track">
        {/* Film perforations */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className={`film-perf ${i / 20 < progress ? "passed" : ""}`}
            style={{ left: `${(i / 20) * 100}%` }}
          />
        ))}
        {/* Progress fill */}
        <div className="film-fill" style={{ width: `${progress * 100}%` }} />
        {/* Current position indicator */}
        <div className="film-head" style={{ left: `${progress * 100}%` }}>
          <div className="film-aperture" />
        </div>
      </div>
    </div>
  );
};

// ==================== HERO SECTION ====================

const HeroSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ken Burns zoom and parallax
  const zoomScale = 1 + scrollY * 0.0004;
  const translateY = scrollY * 0.4;
  const contentOpacity = Math.max(0, 1 - scrollY / 600);
  const overlayOpacity = Math.min(0.85, 0.4 + scrollY / 800);

  return (
    <section className="pe-hero" ref={heroRef}>
      {/* Background with Ken Burns */}
      <div 
        className="pe-hero-bg"
        style={{ 
          transform: `scale(${Math.min(zoomScale, 1.2)}) translateY(${translateY}px)`,
        }}
      >
        <img 
          src={essayShowcases[0].image}
          alt={essayShowcases[0].alt}
          className="pe-hero-image"
        />
      </div>
      <div className="pe-hero-overlay" style={{ opacity: overlayOpacity }} />

      {/* Hero content */}
      <div className="pe-hero-content" style={{ opacity: contentOpacity, transform: `translateY(${scrollY * 0.2}px)` }}>
        <span className="pe-hero-label">Documentary Visual Storytelling</span>
        <h1 className="pe-hero-title">Photo Essays</h1>
        <p className="pe-hero-tagline">
          History told through the lens. Immersive narratives built on archival photography.
        </p>
        
        {/* Stats */}
        <div className="pe-hero-stats">
          <div className="pe-stat">
            <span className="pe-stat-number">{photoEssays.length}</span>
            <span className="pe-stat-label">Essays</span>
          </div>
          <div className="pe-stat-divider" />
          <div className="pe-stat">
            <span className="pe-stat-number">
              {photoEssays.reduce((acc, e) => acc + parseInt(e.readTime), 0)}
            </span>
            <span className="pe-stat-label">Minutes</span>
          </div>
          <div className="pe-stat-divider" />
          <div className="pe-stat">
            <span className="pe-stat-number">100+</span>
            <span className="pe-stat-label">Archival Images</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="pe-scroll-indicator">
          <span>Explore</span>
          <div className="pe-scroll-line" />
        </div>
      </div>
    </section>
  );
};

// ==================== ESSAY SHOWCASE SECTION ====================

interface ShowcaseSectionProps {
  essay: typeof essayShowcases[0];
  index: number;
  isReversed?: boolean;
}

const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ essay, index, isReversed }) => {
  const { ref, isVisible } = useIntersectionReveal(0.1);
  const { ref: parallaxRef, offset } = useParallax(0.15);

  return (
    <section 
      className={`pe-showcase ${isReversed ? "reversed" : ""} ${isVisible ? "revealed" : ""}`}
      ref={ref}
    >
      {/* Full-bleed image with parallax */}
      <div className="pe-showcase-image-wrapper" ref={parallaxRef}>
        <div 
          className="pe-showcase-image-container"
          style={{ transform: `translateY(${offset}px)` }}
        >
          <img 
            src={essay.image}
            alt={essay.alt}
            className="pe-showcase-image"
            loading="lazy"
          />
          <div className="pe-showcase-image-overlay" />
          {/* Image attribution for CC BY-SA licensed images */}
          {essay.imageAttribution && (
            <span className="pe-image-credit">{essay.imageAttribution}</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="pe-showcase-content">
        <span className="pe-showcase-number">{String(index + 1).padStart(2, "0")}</span>
        
        <div className="pe-showcase-text">
          <h2 className="pe-showcase-title">{essay.title}</h2>
          <p className="pe-showcase-subtitle">{essay.subtitle}</p>
          
          <blockquote className="pe-showcase-quote">
            <p>&ldquo;{essay.pullQuote}&rdquo;</p>
            <cite>— {essay.quoteAttribution}</cite>
          </blockquote>

          <Link href={essay.href} className="pe-showcase-cta">
            <span>Experience the Story</span>
            <span className="pe-cta-time">{essay.readTime}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

// ==================== WHAT IS A PHOTO ESSAY ====================

const DefinitionSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.2);

  return (
    <section className="pe-definition" ref={ref}>
      <div className={`pe-definition-content ${isVisible ? "revealed" : ""}`}>
        <span className="pe-definition-label">The Art Form</span>
        
        <h2 className="pe-definition-title">What is a Photo Essay?</h2>
        
        <div className="pe-definition-text">
          <p className="pe-definition-lead">
            A photo essay is a form of visual storytelling that combines photographs 
            with narrative text to document history, explore ideas, and preserve 
            human experience through the power of the image.
          </p>
          
          <p>
            Unlike traditional essays that rely on words alone, photo essays place 
            images at the center of the narrative—each photograph carefully chosen 
            to reveal, to prove, to move. The best photo essays don&apos;t just show 
            history; they make you feel it.
          </p>
          
          <p>
            Our photo essays draw from museum archives, national collections, and 
            declassified government records. Every image is authentic, every caption 
            verified, every narrative built on scholarly research.
          </p>
        </div>

        <div className="pe-definition-traits">
          <div className="pe-trait">
            <span className="pe-trait-icon">◉</span>
            <span className="pe-trait-text">Archival Photography</span>
          </div>
          <div className="pe-trait">
            <span className="pe-trait-icon">◉</span>
            <span className="pe-trait-text">Scholarly Sources</span>
          </div>
          <div className="pe-trait">
            <span className="pe-trait-icon">◉</span>
            <span className="pe-trait-text">Immersive Scroll</span>
          </div>
          <div className="pe-trait">
            <span className="pe-trait-icon">◉</span>
            <span className="pe-trait-text">Cinematic Pacing</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== FINAL CTA ====================

const FinalCTA: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.2);

  return (
    <section className="pe-cta-section" ref={ref}>
      <div className={`pe-cta-content ${isVisible ? "revealed" : ""}`}>
        <h2 className="pe-cta-title">Continue Exploring</h2>
        <p className="pe-cta-text">
          Discover more visual essays spanning science, history, and culture.
        </p>
        
        <div className="pe-cta-buttons">
          <Link href="/essays/" className="pe-button primary">
            All Visual Essays
            <ArrowRight size={18} />
          </Link>
          <Link href="/essays" className="pe-button secondary">
            Essay Examples
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

// ==================== SOURCES ====================

const SourcesSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section className="pe-sources" ref={ref}>
      <div className={`pe-sources-content ${isVisible ? "revealed" : ""}`}>
        <h3 className="pe-sources-title">Sources & Image Credits</h3>
        
        {/* Image Sources */}
        <div className="pe-sources-group">
          <h4 className="pe-sources-subtitle">Image Sources</h4>
          <ul className="pe-sources-list">
            <li>
              <a href="https://commons.wikimedia.org/wiki/File:Trinity_Detonation_T%26B.jpg" target="_blank" rel="noopener noreferrer">
                Trinity Test — U.S. Department of Energy (Public Domain)
              </a>
            </li>
            <li>
              <a href="https://commons.wikimedia.org/wiki/File:Auschwitz_I_entrance_snow.jpg" target="_blank" rel="noopener noreferrer">
                Auschwitz Gate — Wikimedia Commons (Public Domain)
              </a>
            </li>
            <li>
              <a href="https://commons.wikimedia.org/wiki/File:Alan_Turing_Aged_16.jpg" target="_blank" rel="noopener noreferrer">
                Alan Turing Portrait — Wikimedia Commons (Public Domain)
              </a>
            </li>
            <li>
              <a href="https://www.metmuseum.org/art/collection/search/39328" target="_blank" rel="noopener noreferrer">
                Hanuman Bronze — The Metropolitan Museum of Art (CC0)
              </a>
            </li>
            <li>
              <a href="https://commons.wikimedia.org/wiki/File:Assorted_forks.jpg" target="_blank" rel="noopener noreferrer">
                Fork Collection — Photo by Rainer Zenz (CC BY-SA 3.0 US)
              </a>
            </li>
          </ul>
        </div>

        {/* Archives */}
        <div className="pe-sources-group">
          <h4 className="pe-sources-subtitle">Archives & Collections</h4>
          <ul className="pe-sources-list">
            <li>
              <a href="https://www.loc.gov/" target="_blank" rel="noopener noreferrer">
                Library of Congress Digital Collections
              </a>
            </li>
            <li>
              <a href="https://www.archives.gov/" target="_blank" rel="noopener noreferrer">
                National Archives and Records Administration
              </a>
            </li>
            <li>
              <a href="https://www.metmuseum.org/art/collection" target="_blank" rel="noopener noreferrer">
                Metropolitan Museum of Art Open Access
              </a>
            </li>
          </ul>
        </div>

        <p className="pe-sources-note">
          All photographs verified for licensing compliance. Public domain and Creative Commons 
          licensed images sourced from authoritative institutional archives.
        </p>
      </div>
    </section>
  );
};

// ==================== MAIN COMPONENT ====================

const PhotoEssaysClient: React.FC = () => {
  const scrollProgress = useScrollProgress();

  return (
    <article className="photo-essays-experience">
      <MinimalHeader />
      <FilmStripProgress progress={scrollProgress} />
      
      <HeroSection />
      
      {/* Essay showcases - alternating layout */}
      {essayShowcases.map((essay, index) => (
        <ShowcaseSection 
          key={essay.id} 
          essay={essay} 
          index={index}
          isReversed={index % 2 === 1}
        />
      ))}
      
      <DefinitionSection />
      <FinalCTA />
      <SourcesSection />
    </article>
  );
};

export default PhotoEssaysClient;











