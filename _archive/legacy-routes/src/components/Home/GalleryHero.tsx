'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useScrollHeaderSearch } from '@/hooks/useScrollHeaderSearch';

/**
 * GalleryHero Component
 * 
 * Cinematic, full-viewport hero section that positions Esy as an authority
 * through visual essays. No SaaS messaging, no signup forms, no AI mentions.
 * 
 * Design: Editorial aesthetic with brand purple→pink gradient
 * Typography: Cormorant Garamond for editorial elegance
 * 
 * SEO: Semantic HTML, accessible, descriptive alt text
 */

const GalleryHero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  
  // Show header search when hero scrolls out of view
  useScrollHeaderSearch(heroRef);

  return (
    <section ref={heroRef} className="gallery-hero" aria-labelledby="hero-title">
      {/* Atmospheric Background */}
      <div className="hero-background" aria-hidden="true">
        <div className="hero-gradient-overlay" />
        <div className="hero-noise" />
        
        {/* Featured Visual - Adds visual interest */}
        <div className="hero-featured-image">
          <Image
            src="/images/great-fire/great-fire-london-1675.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 0vw, 45vw"
          />
        </div>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <span className="hero-eyebrow">Visual Essays</span>
        
        <h1 id="hero-title" className="hero-title">
          <span className="hero-title-line">Essays That</span>
          <span className="hero-title-line">
            <span className="hero-title-emphasis">Unfold</span>
          </span>
        </h1>
        
        <p className="hero-subtitle">
          Cinematic, research-driven essays exploring history, language, power, and ideas.
          Ideas explored, not just explained.
        </p>
        
        <Link href="/essays/" className="hero-cta">
          <span>Explore Essays</span>
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <span>Scroll</span>
        <ChevronDown className="scroll-arrow" />
      </div>
    </section>
  );
};

export default GalleryHero;

