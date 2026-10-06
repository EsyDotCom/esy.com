"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { publishedVisualEssays, CATEGORY_COLORS, isNewEssay, type VisualEssay } from "@/data/visualEssays";
import './scrollytelling-showcase.css';

/*
 * Scrollytelling Showcase
 * 
 * Design Philosophy:
 * - Demonstrates scrollytelling technology through the page itself
 * - Premium, immersive landing experience
 * - Links to canonical URLs at /essays/
 * - Targets "scrollytelling" keyword for SEO
 * - NOT a content hub - that's /essays/
 */

// Featured stories to showcase
const featuredStories = publishedVisualEssays.slice(0, 6);

// ==================== COMPONENTS ====================

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;
  const opacityFade = Math.max(0, 1 - scrollY / 600);

  return (
    <section className="showcase-hero">
      <div className="hero-background">
        <div 
          className="hero-gradient-orb hero-orb-1" 
          style={{ transform: `translate(-50%, ${-50 + parallaxOffset * 0.2}%)` }}
        />
        <div 
          className="hero-gradient-orb hero-orb-2" 
          style={{ transform: `translate(-50%, ${-50 - parallaxOffset * 0.15}%)` }}
        />
        <div 
          className="hero-gradient-orb hero-orb-3" 
          style={{ transform: `translate(-50%, ${-50 + parallaxOffset * 0.1}%)` }}
        />
        <div className="hero-noise" />
      </div>
      
      <div className="hero-content" style={{ opacity: opacityFade }}>
        <div className="hero-badge">
          <Sparkles size={14} />
          <span>Interactive Storytelling</span>
        </div>
        
        <h1 className="hero-title">
          <span className="hero-title-line">Stories that</span>
          <span className="hero-title-line hero-title-accent">come alive</span>
          <span className="hero-title-line">as you scroll</span>
        </h1>
        
        <p className="hero-description">
          Scrollytelling transforms reading into an immersive journey. 
          Watch ideas unfold, animations dance, and narratives reveal 
          themselves with every scroll.
        </p>
        
        <div className="hero-cta-group">
          <Link href="/essays/" className="hero-cta-primary">
            <Play size={18} />
            Explore Visual Essays
          </Link>
          <Link href="#featured" className="hero-cta-secondary">
            See Examples
            <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="hero-scroll-indicator">
          <div className="scroll-line" />
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

const WhatIsSection: React.FC = () => {
  return (
    <section className="what-is-section">
      <div className="what-is-content">
        <span className="section-label">What is Scrollytelling?</span>
        <h2 className="what-is-title">
          The art of telling stories through scroll
        </h2>
        <p className="what-is-description">
          Scrollytelling combines narrative journalism with interactive design. 
          As you scroll, animations trigger, scenes transition, and complex ideas 
          unfold at your pace. It&apos;s reading reimagined for the digital age.
        </p>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2v20M2 12h20" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <h3>Scroll-Driven</h3>
            <p>Content reveals as you scroll, creating a cinematic narrative experience</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 3v18M3 12h18" strokeLinecap="round"/>
                <path d="M12 3l4 4-4 4-4-4 4-4z"/>
              </svg>
            </div>
            <h3>Animated</h3>
            <p>SVG illustrations and animations bring every concept to life</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M3 9h18M9 21V9"/>
              </svg>
            </div>
            <h3>Mobile-First</h3>
            <p>Designed for your phone, enhanced for desktop</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3>Research-Backed</h3>
            <p>Every story is fact-checked with verified sources</p>
          </div>
        </div>
      </div>
    </section>
  );
};

interface StoryCardProps {
  story: VisualEssay;
}

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  return (
    <Link 
      href={story.href} 
      className="story-card"
      style={{ 
        '--accent-color': CATEGORY_COLORS[story.category]
      } as React.CSSProperties}
    >
      <div className="story-card-inner">
        <div className="story-card-header">
          <span 
            className="story-category"
            style={{ color: CATEGORY_COLORS[story.category] }}
          >
            {story.category}
          </span>
          {isNewEssay(story) && <span className="story-new-badge">New</span>}
        </div>
        
        <h3 className="story-title">{story.title}</h3>
        <p className="story-subtitle">{story.subtitle}</p>
        
        <div className="story-card-footer">
          <span className="story-read-time">{story.readTime} read</span>
          <span className="story-cta">
            Experience <ArrowRight size={14} />
          </span>
        </div>
      </div>
      
      <div 
        className="story-card-glow"
        style={{ background: `radial-gradient(circle at 50% 100%, ${CATEGORY_COLORS[story.category]}20 0%, transparent 70%)` }}
      />
    </Link>
  );
};

const FeaturedSection: React.FC = () => {
  return (
    <section id="featured" className="featured-section">
      <div className="featured-header">
        <span className="section-label">Featured Stories</span>
        <h2 className="featured-title">
          Start your journey
        </h2>
        <p className="featured-description">
          Dive into our collection of visual essays spanning science, 
          history, technology, and culture.
        </p>
      </div>
      
      <div className="stories-grid">
        {featuredStories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
      
      <div className="featured-cta">
        <Link href="/essays/" className="view-all-link">
          View all {publishedVisualEssays.length} Visual Essays
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

const TechSection: React.FC = () => {
  return (
    <section className="tech-section">
      <div className="tech-content">
        <span className="section-label">Built Different</span>
        <h2 className="tech-title">
          Powered by AI-driven production
        </h2>
        <p className="tech-description">
          We&apos;ve built specialized AI agents that can produce rich, 
          interactive scrollytelling experiences at unprecedented scale. 
          Each story features custom SVG animations, researched narratives, 
          and mobile-first design.
        </p>
        
        <div className="tech-stats">
          <div className="tech-stat">
            <span className="stat-number">{publishedVisualEssays.length}+</span>
            <span className="stat-label">Visual Essays</span>
          </div>
          <div className="tech-stat-divider" />
          <div className="tech-stat">
            <span className="stat-number">60</span>
            <span className="stat-label">FPS Animations</span>
          </div>
          <div className="tech-stat-divider" />
          <div className="tech-stat">
            <span className="stat-number">100%</span>
            <span className="stat-label">Mobile-First</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTASection: React.FC = () => {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2 className="cta-title">
          Ready to experience<br />
          <span className="cta-accent">stories differently?</span>
        </h2>
        <p className="cta-description">
          Explore our growing collection of visual essays
        </p>
        <Link href="/essays/" className="cta-button">
          <Play size={20} />
          Start Exploring
        </Link>
      </div>
    </section>
  );
};

// ==================== MAIN ====================

const ScrollytellingShowcase: React.FC = () => {
  return (
    <div className="scrollytelling-showcase">
      <Hero />
      <WhatIsSection />
      <FeaturedSection />
      <TechSection />
      <CTASection />
    </div>
  );
};

export default ScrollytellingShowcase;

