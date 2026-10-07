"use client";

/**
 * ESY VISUAL ESSAY TEMPLATE V2.0 — NARRATION SYSTEM
 * ==================================================
 * 
 * Components for the Three Voices narration system:
 * 
 * Voice 1: The Seen (Descriptive)
 *   - Describes what is visible on screen
 *   - Present tense, concrete, sensory
 *   - Appears as captions or subtle overlay
 * 
 * Voice 2: The Unseen (Contextual)
 *   - Explains cultural depth, emotional context
 *   - Past or present tense, richer vocabulary
 *   - Appears as body text paragraphs
 * 
 * Voice 3: The Eternal (Poetic)
 *   - Elevated, poetic, universal truth
 *   - Single carefully crafted sentence
 *   - Appears as pull quotes or section dividers
 */

import React, { ReactNode } from 'react';
import { useIntersectionReveal } from './useCinematicScroll';

// ===========================================
// TYPES
// ===========================================

interface NarrationBlockProps {
  /** Voice 1: What we see (optional) */
  seen?: string;
  /** Voice 2: The deeper context (required) */
  unseen: string;
  /** Voice 3: The eternal truth (optional) */
  eternal?: string;
  /** Additional className */
  className?: string;
  /** Whether to animate on scroll */
  animate?: boolean;
}

interface VoiceProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

// ===========================================
// NARRATION BLOCK
// ===========================================

/**
 * Complete narration block combining all three voices.
 * Use this for standard narrative sections.
 */
export const NarrationBlock: React.FC<NarrationBlockProps> = ({
  seen,
  unseen,
  eternal,
  className = '',
  animate = true,
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  const visibleClass = animate && isVisible ? 'visible' : '';
  const noAnimateClass = !animate ? 'no-animate' : '';
  
  return (
    <div 
      ref={ref}
      className={`narration-block ${visibleClass} ${noAnimateClass} ${className}`}
    >
      {seen && <VoiceSeen animate={animate}>{seen}</VoiceSeen>}
      <VoiceUnseen animate={animate}>{unseen}</VoiceUnseen>
      {eternal && <VoiceEternal animate={animate}>{eternal}</VoiceEternal>}
      
      <style jsx>{`
        .narration-block {
          max-width: 700px;
          margin: 0 auto var(--ve-space-lg, 2rem);
          opacity: ${animate ? '0' : '1'};
          transform: ${animate ? 'translateY(20px)' : 'none'};
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .narration-block.visible,
        .narration-block.no-animate {
          opacity: 1;
          transform: translateY(0);
        }
        
        @media (prefers-reduced-motion: reduce) {
          .narration-block {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
};

// ===========================================
// VOICE 1: THE SEEN
// ===========================================

/**
 * Voice 1: Describes what is visible on screen.
 * Present tense, concrete, sensory language, short sentences.
 */
export const VoiceSeen: React.FC<VoiceProps> = ({ 
  children, 
  className = '',
  animate = true,
}) => {
  return (
    <>
      <p className={`voice-seen ${className}`}>
        {children}
      </p>
      <style jsx>{`
        .voice-seen {
          font-family: var(--ve-font-sans, sans-serif);
          font-size: 0.875rem;
          font-style: italic;
          color: var(--ve-text-tertiary, rgba(255, 255, 255, 0.5));
          margin-bottom: var(--ve-space-xs, 0.5rem);
          letter-spacing: 0.01em;
          line-height: 1.6;
        }
      `}</style>
    </>
  );
};

// ===========================================
// VOICE 2: THE UNSEEN
// ===========================================

/**
 * Voice 2: Explains cultural depth, emotional context, historical significance.
 * Richer vocabulary, medium-length sentences, body text paragraphs.
 */
export const VoiceUnseen: React.FC<VoiceProps> = ({ 
  children, 
  className = '',
  animate = true,
}) => {
  return (
    <>
      <p className={`voice-unseen ${className}`}>
        {children}
      </p>
      <style jsx>{`
        .voice-unseen {
          font-family: var(--ve-font-serif, Georgia, serif);
          font-size: clamp(1.125rem, 2.5vw, 1.25rem);
          line-height: 1.7;
          color: var(--ve-text-primary, rgba(255, 255, 255, 0.95));
          margin: 0;
        }
        
        .voice-unseen + .voice-unseen {
          margin-top: var(--ve-space-md, 1.5rem);
        }
      `}</style>
    </>
  );
};

// ===========================================
// VOICE 3: THE ETERNAL
// ===========================================

/**
 * Voice 3: Elevated, poetic sentence that transcends to universal truth.
 * Timeless present tense, metaphorical, carefully crafted.
 * Appears as pull quote with decorative borders.
 */
export const VoiceEternal: React.FC<VoiceProps> = ({ 
  children, 
  className = '',
  animate = true,
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLQuoteElement>({
    threshold: 0.5,
    triggerOnce: true,
  });
  
  return (
    <>
      <blockquote 
        ref={ref}
        className={`voice-eternal ${animate && isVisible ? 'visible' : ''} ${!animate ? 'no-animate' : ''} ${className}`}
      >
        <p>{children}</p>
      </blockquote>
      <style jsx>{`
        .voice-eternal {
          font-family: var(--ve-font-display, Georgia, serif);
          font-size: clamp(1.5rem, 4vw, 2.25rem);
          font-weight: 400;
          font-style: italic;
          text-align: center;
          color: var(--ve-accent, #6366f1);
          padding: var(--ve-space-lg, 2rem) var(--ve-space-md, 1rem);
          margin: var(--ve-space-xl, 4rem) 0;
          border-top: 1px solid var(--ve-border, rgba(255, 255, 255, 0.08));
          border-bottom: 1px solid var(--ve-border, rgba(255, 255, 255, 0.08));
          line-height: 1.4;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1s ease-out, transform 1s ease-out;
        }
        
        .voice-eternal.visible,
        .voice-eternal.no-animate {
          opacity: 1;
          transform: translateY(0);
        }
        
        .voice-eternal p {
          margin: 0;
        }
        
        .voice-eternal p::before {
          content: '"';
          color: var(--ve-accent-glow, rgba(99, 102, 241, 0.3));
        }
        
        .voice-eternal p::after {
          content: '"';
          color: var(--ve-accent-glow, rgba(99, 102, 241, 0.3));
        }
        
        @media (prefers-reduced-motion: reduce) {
          .voice-eternal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </>
  );
};

// ===========================================
// PULL QUOTE
// ===========================================

interface PullQuoteProps {
  children: ReactNode;
  attribution?: string;
  year?: string;
  className?: string;
}

/**
 * Standalone pull quote with optional attribution.
 * For quotes from historical figures or sources.
 */
export const PullQuote: React.FC<PullQuoteProps> = ({
  children,
  attribution,
  year,
  className = '',
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLQuoteElement>({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  return (
    <>
      <blockquote 
        ref={ref}
        className={`pull-quote ${isVisible ? 'visible' : ''} ${className}`}
      >
        <p className="pull-quote-text">{children}</p>
        {(attribution || year) && (
          <cite className="pull-quote-cite">
            {attribution && <span className="cite-name">— {attribution}</span>}
            {year && <span className="cite-year">, {year}</span>}
          </cite>
        )}
      </blockquote>
      <style jsx>{`
        .pull-quote {
          position: relative;
          max-width: 600px;
          margin: var(--ve-space-xl, 4rem) auto;
          padding: var(--ve-space-lg, 2rem);
          padding-left: var(--ve-space-xl, 3rem);
          border-left: 3px solid var(--ve-accent, #6366f1);
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .pull-quote.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .pull-quote-text {
          font-family: var(--ve-font-serif, Georgia, serif);
          font-size: clamp(1.25rem, 3vw, 1.5rem);
          font-style: italic;
          line-height: 1.6;
          color: var(--ve-text-primary, rgba(255, 255, 255, 0.95));
          margin: 0 0 var(--ve-space-sm, 1rem);
        }
        
        .pull-quote-text::before {
          content: '"';
          position: absolute;
          left: var(--ve-space-sm, 0.75rem);
          top: var(--ve-space-md, 1rem);
          font-size: 3rem;
          line-height: 1;
          color: var(--ve-accent-glow, rgba(99, 102, 241, 0.3));
          font-family: Georgia, serif;
        }
        
        .pull-quote-cite {
          display: block;
          font-family: var(--ve-font-sans, sans-serif);
          font-size: 0.875rem;
          font-style: normal;
          color: var(--ve-text-tertiary, rgba(255, 255, 255, 0.5));
        }
        
        .cite-year {
          color: var(--ve-text-tertiary, rgba(255, 255, 255, 0.4));
        }
        
        @media (prefers-reduced-motion: reduce) {
          .pull-quote {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </>
  );
};

// ===========================================
// SECTION TITLE
// ===========================================

interface SectionTitleProps {
  children: ReactNode;
  subtitle?: string;
  year?: string;
  className?: string;
}

/**
 * Section title with optional subtitle and year badge.
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  subtitle,
  year,
  className = '',
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  return (
    <>
      <div 
        ref={ref}
        className={`section-title-block ${isVisible ? 'visible' : ''} ${className}`}
      >
        {year && <span className="section-year">{year}</span>}
        <h2 className="section-title">{children}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      <style jsx>{`
        .section-title-block {
          margin-bottom: var(--ve-space-lg, 2rem);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .section-title-block.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .section-year {
          display: inline-block;
          padding: 4px 12px;
          margin-bottom: var(--ve-space-sm, 1rem);
          background: var(--ve-accent-glow, rgba(99, 102, 241, 0.2));
          border-radius: 4px;
          font-family: var(--ve-font-sans, sans-serif);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: var(--ve-accent, #6366f1);
        }
        
        .section-title {
          font-family: var(--ve-font-display, Georgia, serif);
          font-size: clamp(1.75rem, 5vw, 2.5rem);
          font-weight: 400;
          line-height: 1.2;
          color: var(--ve-text-primary, rgba(255, 255, 255, 0.95));
          margin: 0 0 var(--ve-space-xs, 0.5rem);
        }
        
        .section-subtitle {
          font-family: var(--ve-font-serif, Georgia, serif);
          font-size: clamp(1rem, 2vw, 1.125rem);
          font-style: italic;
          color: var(--ve-text-secondary, rgba(255, 255, 255, 0.7));
          margin: 0;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .section-title-block {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </>
  );
};

// ===========================================
// SECTION DIVIDER
// ===========================================

interface SectionDividerProps {
  symbol?: string;
  className?: string;
}

/**
 * Visual divider between sections. Uses decorative symbol.
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({
  symbol = '◆',
  className = '',
}) => {
  return (
    <>
      <div className={`section-divider ${className}`} aria-hidden="true">
        <span className="divider-symbol">{symbol}</span>
      </div>
      <style jsx>{`
        .section-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--ve-space-xl, 4rem) 0;
        }
        
        .divider-symbol {
          font-size: 0.75rem;
          color: var(--ve-text-tertiary, rgba(255, 255, 255, 0.3));
          letter-spacing: 0.5em;
        }
      `}</style>
    </>
  );
};

// ===========================================
// EXPORTS
// ===========================================

export default {
  NarrationBlock,
  VoiceSeen,
  VoiceUnseen,
  VoiceEternal,
  PullQuote,
  SectionTitle,
  SectionDivider,
};




































