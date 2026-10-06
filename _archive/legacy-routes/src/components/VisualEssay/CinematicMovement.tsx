"use client";

/**
 * ESY VISUAL ESSAY TEMPLATE V2.0 — CINEMATIC MOVEMENT COMPONENTS
 * ==============================================================
 * 
 * React components for the Five Immersive Movements structure.
 * Each movement has specific visual and behavioral characteristics.
 * 
 * Movements:
 * I.   Invocation    — Atmospheric opening, no facts
 * II.  Ancestral     — Origin story, memory-like flow
 * III. Collision     — Dramatic turning point, high energy
 * IV.  Modern        — Contemporary relevance
 * V.   Revelation    — Distilled emotional truth
 */

import React, { ReactNode, useRef, useEffect, useState } from 'react';
import { useIntersectionReveal, useReducedMotion } from './useCinematicScroll';

// ===========================================
// TYPES
// ===========================================

interface MovementProps {
  id: string;
  children: ReactNode;
  className?: string;
}

interface InvocationProps extends MovementProps {
  title: string;
  subtitle?: string;
  voice?: string;
  sensoryAnchor?: ReactNode;
}

interface AncestralProps extends MovementProps {
  scenes?: ReactNode[];
}

interface CollisionProps extends MovementProps {
  intensity?: 'low' | 'medium' | 'high';
}

interface RevelationProps extends MovementProps {
  focalElement?: ReactNode;
  closingVoice?: string;
}

// ===========================================
// MOVEMENT I: INVOCATION
// ===========================================

/**
 * The atmospheric opening. No facts—only mood, sensation, anticipation.
 * Full viewport, centered content, sensory anchor in background.
 */
export const MovementInvocation: React.FC<InvocationProps> = ({
  id,
  title,
  subtitle,
  voice,
  sensoryAnchor,
  children,
  className = '',
}) => {
  const prefersReduced = useReducedMotion();
  const [ref, isVisible] = useIntersectionReveal<HTMLElement>({ 
    threshold: 0.3,
    triggerOnce: true 
  });
  
  return (
    <section
      id={id}
      ref={ref}
      className={`movement movement-invocation mode-sensory-overwhelm ${className}`}
      aria-label="Opening"
    >
      {/* Sensory Anchor Background */}
      {sensoryAnchor && (
        <div className="sensory-anchor anchor-opening" aria-hidden="true">
          {sensoryAnchor}
        </div>
      )}
      
      {/* Noise Texture Overlay */}
      <div className="sensory-texture" aria-hidden="true" />
      
      {/* Content */}
      <div className={`invocation-content ${isVisible ? 'visible' : ''}`}>
        <h1 
          className="invocation-title"
          style={prefersReduced ? { opacity: 1, transform: 'none', animation: 'none' } : undefined}
        >
          {title}
        </h1>
        
        {subtitle && (
          <p 
            className="invocation-subtitle"
            style={prefersReduced ? { opacity: 1, transform: 'none', animation: 'none' } : undefined}
          >
            {subtitle}
          </p>
        )}
        
        {voice && (
          <p 
            className="invocation-voice"
            style={prefersReduced ? { opacity: 1, transform: 'none', animation: 'none' } : undefined}
          >
            {voice}
          </p>
        )}
        
        {children}
      </div>
      
      {/* Scroll Indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <div className="scroll-indicator-line" />
      </div>
    </section>
  );
};

// ===========================================
// MOVEMENT II: ANCESTRAL PULSE
// ===========================================

/**
 * Origin story, mythic context. This must feel like MEMORY, not documentation.
 * Memory-like flow with multiple scene transitions.
 */
export const MovementAncestral: React.FC<AncestralProps> = ({
  id,
  scenes,
  children,
  className = '',
}) => {
  return (
    <section
      id={id}
      className={`movement movement-ancestral mode-dreamscape ${className}`}
      aria-label="Origins"
    >
      <div className="ancestral-content">
        {scenes ? (
          scenes.map((scene, index) => (
            <AncestralScene key={index} index={index}>
              {scene}
            </AncestralScene>
          ))
        ) : (
          children
        )}
      </div>
    </section>
  );
};

/**
 * Individual scene within the Ancestral movement.
 */
const AncestralScene: React.FC<{ children: ReactNode; index: number }> = ({ 
  children, 
  index 
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({ 
    threshold: 0.2,
    triggerOnce: true 
  });
  
  return (
    <div
      ref={ref}
      className={`ancestral-scene ${isVisible ? 'visible' : ''}`}
      style={{ 
        transitionDelay: `${index * 0.1}s`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}
    >
      {children}
    </div>
  );
};

// ===========================================
// MOVEMENT III: COLLISION OF WORLDS
// ===========================================

/**
 * The dramatic turning point. Highest visual density, fastest transitions.
 * Cultures mixing, techniques merging, adversity or triumph.
 */
export const MovementCollision: React.FC<CollisionProps> = ({
  id,
  intensity = 'high',
  children,
  className = '',
}) => {
  const intensityStyles = {
    low: { '--ve-collision-speed': '0.5s' },
    medium: { '--ve-collision-speed': '0.35s' },
    high: { '--ve-collision-speed': '0.2s' },
  };
  
  return (
    <section
      id={id}
      className={`movement movement-collision mode-collision intensity-${intensity} ${className}`}
      style={intensityStyles[intensity] as React.CSSProperties}
      aria-label="Transformation"
    >
      <div className="collision-content">
        {children}
      </div>
    </section>
  );
};

/**
 * Collision Panel - Reveals with animation when visible
 */
export const CollisionPanel: React.FC<{ 
  children: ReactNode; 
  delay?: number;
  className?: string;
}> = ({ 
  children, 
  delay = 0,
  className = '' 
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({ 
    threshold: 0.3,
    triggerOnce: true 
  });
  
  return (
    <div
      ref={ref}
      className={`collision-panel ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

/**
 * Collision Contrast - Side-by-side comparison panels
 */
export const CollisionContrast: React.FC<{
  before: ReactNode;
  after: ReactNode;
  dividerLabel?: string;
  className?: string;
}> = ({ 
  before, 
  after, 
  dividerLabel,
  className = '' 
}) => {
  return (
    <div className={`collision-contrast ${className}`}>
      <div className="contrast-before">
        {before}
      </div>
      {dividerLabel && (
        <div className="collision-divider">
          <span className="collision-divider-label">{dividerLabel}</span>
        </div>
      )}
      <div className="contrast-after">
        {after}
      </div>
    </div>
  );
};

// ===========================================
// MOVEMENT IV: MODERN ECHO
// ===========================================

/**
 * The subject's life today. Return to intimate scale after Movement III.
 * Diaspora, global interpretation, contemporary relevance.
 */
export const MovementModern: React.FC<MovementProps> = ({
  id,
  children,
  className = '',
}) => {
  return (
    <section
      id={id}
      className={`movement movement-modern ${className}`}
      aria-label="Today"
    >
      <div className="modern-content">
        {children}
      </div>
    </section>
  );
};

// ===========================================
// MOVEMENT V: REVELATION
// ===========================================

/**
 * Distilled emotional truth. Deliberate slowdown, visual stillness.
 * Return to the sensory anchor, transformed.
 */
export const MovementRevelation: React.FC<RevelationProps> = ({
  id,
  focalElement,
  closingVoice,
  children,
  className = '',
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLElement>({ 
    threshold: 0.4,
    triggerOnce: true 
  });
  
  return (
    <section
      id={id}
      ref={ref}
      className={`movement movement-revelation mode-stillness ${className}`}
      aria-label="Revelation"
    >
      {/* Focal Element */}
      {focalElement && (
        <div className={`stillness-focal stillness-element ${isVisible ? 'visible' : ''}`}>
          {focalElement}
        </div>
      )}
      
      {/* Content */}
      <div className={`stillness-content ${isVisible ? 'visible' : ''}`}>
        {children}
      </div>
      
      {/* Closing Voice */}
      {closingVoice && (
        <p className={`stillness-text stillness-element ${isVisible ? 'visible' : ''}`}>
          {closingVoice}
        </p>
      )}
    </section>
  );
};

// ===========================================
// VISUAL ESSAY CONTAINER
// ===========================================

interface VisualEssayProps {
  children: ReactNode;
  className?: string;
  /** Story-specific CSS variables */
  style?: React.CSSProperties;
}

/**
 * Main container for a Visual Essay experience.
 * Wraps all five movements and applies base styling.
 */
export const VisualEssay: React.FC<VisualEssayProps> = ({
  children,
  className = '',
  style,
}) => {
  return (
    <article 
      className={`visual-essay ${className}`}
      style={style}
    >
      {/* SVG Filters for dreamscape effects */}
      <svg className="dreamscape-watercolor-defs" aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id="ve-watercolor">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="0.5" />
          </filter>
          
          <filter id="ve-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      
      {children}
    </article>
  );
};

// ===========================================
// SCROLL INDICATOR
// ===========================================

/**
 * Animated scroll indicator for the hero section.
 */
export const ScrollIndicator: React.FC<{ className?: string }> = ({ className = '' }) => {
  const prefersReduced = useReducedMotion();
  
  if (prefersReduced) return null;
  
  return (
    <div className={`scroll-indicator ${className}`} aria-hidden="true">
      <style jsx>{`
        .scroll-indicator {
          position: absolute;
          bottom: calc(80px + env(safe-area-inset-bottom, 0px));
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0.5;
        }
        
        .scroll-indicator-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            currentColor 50%,
            transparent 100%
          );
          animation: scroll-pulse 2s ease-in-out infinite;
        }
        
        @keyframes scroll-pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scaleY(0.8);
          }
          50% {
            opacity: 0.7;
            transform: scaleY(1);
          }
        }
      `}</style>
      <div className="scroll-indicator-line" />
    </div>
  );
};

// ===========================================
// EXPORTS
// ===========================================

export default {
  VisualEssay,
  MovementInvocation,
  MovementAncestral,
  MovementCollision,
  MovementModern,
  MovementRevelation,
  CollisionPanel,
  CollisionContrast,
  ScrollIndicator,
};




































