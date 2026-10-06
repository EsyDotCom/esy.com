"use client";

/**
 * ESY VISUAL ESSAY TEMPLATE V2.0 — WHISPERING OBJECT
 * ===================================================
 * 
 * Mode E: A bowl, leaf, or pot reveals memories on hover/tap.
 * 
 * Features:
 * - Object glows on interaction
 * - Cycles through memories automatically
 * - Works with hover (desktop) and tap (mobile)
 * - Accessible with ARIA live regions
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';

// ===========================================
// TYPES
// ===========================================

export interface WhisperingObjectConfig {
  /** Object name for accessibility */
  name: string;
  /** Array of memory strings to cycle through */
  memories: string[];
  /** SVG content or image URL */
  visual: React.ReactNode;
  /** Time in ms between memory changes */
  cycleInterval?: number;
  /** Glow color */
  glowColor?: string;
}

interface WhisperingObjectProps extends WhisperingObjectConfig {
  className?: string;
}

// ===========================================
// COMPONENT
// ===========================================

export const WhisperingObject: React.FC<WhisperingObjectProps> = ({
  name,
  memories,
  visual,
  cycleInterval = 4000,
  glowColor = 'var(--ve-accent, #6366f1)',
  className = '',
}) => {
  const [isWhispering, setIsWhispering] = useState(false);
  const [currentMemory, setCurrentMemory] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Start cycling through memories
  const startWhispering = useCallback(() => {
    setIsWhispering(true);
    setCurrentMemory(0);
    
    intervalRef.current = setInterval(() => {
      setCurrentMemory(prev => (prev + 1) % memories.length);
    }, cycleInterval);
  }, [memories.length, cycleInterval]);
  
  // Stop cycling
  const stopWhispering = useCallback(() => {
    setIsWhispering(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  // Toggle for touch devices
  const handleToggle = useCallback(() => {
    if (isWhispering) {
      stopWhispering();
    } else {
      startWhispering();
    }
  }, [isWhispering, startWhispering, stopWhispering]);
  
  return (
    <>
      <div
        className={`whispering-object ${isWhispering ? 'active' : ''} ${className}`}
        onMouseEnter={startWhispering}
        onMouseLeave={stopWhispering}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`${name} - ${isWhispering ? 'Click to stop' : 'Click to reveal memories'}`}
        aria-pressed={isWhispering}
        style={{ '--glow-color': glowColor } as React.CSSProperties}
      >
        {/* Object Visual */}
        <div className="object-visual">
          {visual}
          <div className="object-glow" aria-hidden="true" />
          <div className="object-ripple" aria-hidden="true" />
        </div>
        
        {/* Whispered Memories */}
        <div 
          className="object-memories"
          aria-live="polite"
          aria-atomic="true"
        >
          {isWhispering && (
            <p className="memory-text" key={currentMemory}>
              {memories[currentMemory]}
            </p>
          )}
        </div>
        
        {/* Hint */}
        {!isWhispering && (
          <p className="object-hint">Touch to awaken</p>
        )}
      </div>
      
      <style jsx>{`
        .whispering-object {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          cursor: pointer;
          outline: none;
        }
        
        .whispering-object:focus-visible {
          outline: 2px solid var(--glow-color);
          outline-offset: 4px;
          border-radius: 8px;
        }
        
        .object-visual {
          position: relative;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .whispering-object:hover .object-visual,
        .whispering-object.active .object-visual {
          transform: scale(1.03);
        }
        
        .object-glow {
          position: absolute;
          inset: -30%;
          background: radial-gradient(
            circle at center,
            var(--glow-color) 0%,
            transparent 60%
          );
          opacity: 0;
          filter: blur(30px);
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: -1;
        }
        
        .whispering-object.active .object-glow {
          opacity: 0.5;
        }
        
        .object-ripple {
          position: absolute;
          inset: -10%;
          border: 2px solid var(--glow-color);
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
        }
        
        .whispering-object.active .object-ripple {
          animation: ripple-out 2s ease-out infinite;
        }
        
        @keyframes ripple-out {
          0% {
            opacity: 0.6;
            transform: scale(0.8);
          }
          100% {
            opacity: 0;
            transform: scale(1.5);
          }
        }
        
        .object-memories {
          min-height: 4rem;
          margin-top: 1.5rem;
          text-align: center;
          max-width: 400px;
        }
        
        .memory-text {
          font-family: var(--ve-font-serif, Georgia, serif);
          font-size: 1.125rem;
          font-style: italic;
          color: var(--ve-text-secondary, rgba(255, 255, 255, 0.7));
          line-height: 1.6;
          margin: 0;
          animation: memory-fade-in 0.6s ease-out;
        }
        
        @keyframes memory-fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .object-hint {
          position: absolute;
          bottom: 0;
          font-family: var(--ve-font-sans, sans-serif);
          font-size: 0.75rem;
          color: var(--ve-text-tertiary, rgba(255, 255, 255, 0.4));
          margin: 0;
          animation: hint-pulse 2s ease-in-out infinite;
        }
        
        @keyframes hint-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .object-visual {
            transition: none;
          }
          
          .object-ripple {
            animation: none;
          }
          
          .memory-text {
            animation: none;
          }
          
          .object-hint {
            animation: none;
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  );
};

export default WhisperingObject;




































