"use client";

/**
 * ESY VISUAL ESSAY TEMPLATE V2.0 — INGREDIENT ORACLE
 * ===================================================
 * 
 * Mode A: Ingredients/objects whisper their history when tapped.
 * 
 * Features:
 * - Positioned items with subtle glow
 * - Tap/click to reveal whisper and history
 * - Touch-friendly hit areas (44px+)
 * - Smooth reveal animations
 * - Accessible with ARIA attributes
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';

// ===========================================
// TYPES
// ===========================================

export interface OracleItem {
  id: string;
  name: string;
  /** Short poetic line revealed first */
  whisper: string;
  /** Expanded historical/cultural content */
  history: string;
  /** Position as percentage (0-100) */
  position: { x: number; y: number };
  /** Optional custom color */
  color?: string;
}

interface IngredientOracleProps {
  items: OracleItem[];
  /** Background content (image, SVG, etc.) */
  children?: React.ReactNode;
  /** Close panel when clicking outside */
  closeOnOutsideClick?: boolean;
  className?: string;
}

// ===========================================
// COMPONENT
// ===========================================

export const IngredientOracle: React.FC<IngredientOracleProps> = ({
  items,
  children,
  closeOnOutsideClick = true,
  className = '',
}) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get active item data
  const activeData = items.find(item => item.id === activeItem);
  
  // Handle outside click
  useEffect(() => {
    if (!closeOnOutsideClick || !activeItem) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.oracle-item') && !target.closest('.oracle-reveal')) {
        setActiveItem(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeItem, closeOnOutsideClick]);
  
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveItem(null);
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);
  
  const handleItemClick = useCallback((id: string) => {
    setActiveItem(prev => prev === id ? null : id);
  }, []);
  
  return (
    <>
      <div 
        ref={containerRef}
        className={`oracle-container ${className}`}
      >
        {/* Background Content */}
        <div className="oracle-background">
          {children}
        </div>
        
        {/* Oracle Items */}
        {items.map(item => (
          <button
            key={item.id}
            className={`oracle-item ${activeItem === item.id ? 'active' : ''}`}
            style={{ 
              left: `${item.position.x}%`, 
              top: `${item.position.y}%`,
              '--item-color': item.color || 'var(--ve-accent)',
            } as React.CSSProperties}
            onClick={() => handleItemClick(item.id)}
            aria-expanded={activeItem === item.id}
            aria-label={`Learn about ${item.name}`}
          >
            <span className="oracle-glow" aria-hidden="true" />
            <span className="oracle-pulse" aria-hidden="true" />
            <span className="oracle-name">{item.name}</span>
          </button>
        ))}
        
        {/* Reveal Panel */}
        {activeData && (
          <div 
            className="oracle-reveal"
            role="tooltip"
            aria-live="polite"
          >
            <button 
              className="oracle-close"
              onClick={() => setActiveItem(null)}
              aria-label="Close"
            >
              ×
            </button>
            <p className="oracle-whisper">{activeData.whisper}</p>
            <p className="oracle-history">{activeData.history}</p>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .oracle-container {
          position: relative;
          width: 100%;
          min-height: 400px;
        }
        
        .oracle-background {
          width: 100%;
          height: 100%;
        }
        
        .oracle-item {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 44px;
          min-height: 44px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 24px;
          color: var(--ve-text-secondary, rgba(255, 255, 255, 0.7));
          font-family: var(--ve-font-sans, sans-serif);
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
          transform: translate(-50%, -50%);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 10;
        }
        
        .oracle-item:hover,
        .oracle-item:focus {
          background: rgba(255, 255, 255, 0.12);
          border-color: var(--item-color);
          color: var(--ve-text-primary, white);
          transform: translate(-50%, -50%) scale(1.05);
        }
        
        .oracle-item:focus {
          outline: 2px solid var(--item-color);
          outline-offset: 2px;
        }
        
        .oracle-item.active {
          background: var(--item-color);
          border-color: var(--item-color);
          color: white;
          transform: translate(-50%, -50%) scale(1.1);
        }
        
        .oracle-glow {
          position: absolute;
          inset: -6px;
          border-radius: inherit;
          background: var(--item-color);
          opacity: 0;
          filter: blur(12px);
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: -1;
        }
        
        .oracle-item:hover .oracle-glow,
        .oracle-item.active .oracle-glow {
          opacity: 0.4;
        }
        
        .oracle-pulse {
          position: absolute;
          inset: -4px;
          border-radius: inherit;
          border: 2px solid var(--item-color);
          opacity: 0;
          animation: oracle-pulse 2s ease-out infinite;
          pointer-events: none;
        }
        
        .oracle-item:not(.active) .oracle-pulse {
          opacity: 0.5;
        }
        
        @keyframes oracle-pulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        .oracle-name {
          position: relative;
          z-index: 1;
        }
        
        .oracle-reveal {
          position: fixed;
          bottom: calc(80px + env(safe-area-inset-bottom, 0px));
          left: 50%;
          transform: translateX(-50%);
          max-width: 400px;
          width: calc(100% - 2rem);
          padding: 1.5rem;
          background: rgba(20, 20, 24, 0.98);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          z-index: 100;
          animation: oracle-reveal-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }
        
        @keyframes oracle-reveal-up {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        
        .oracle-close {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.25rem;
          line-height: 1;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .oracle-close:hover {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }
        
        .oracle-whisper {
          font-family: var(--ve-font-serif, Georgia, serif);
          font-size: 1.125rem;
          font-style: italic;
          color: var(--ve-accent, #6366f1);
          margin: 0 0 0.75rem;
          line-height: 1.5;
        }
        
        .oracle-history {
          font-family: var(--ve-font-sans, sans-serif);
          font-size: 0.875rem;
          color: var(--ve-text-secondary, rgba(255, 255, 255, 0.7));
          line-height: 1.6;
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .oracle-reveal {
            bottom: calc(70px + env(safe-area-inset-bottom, 0px));
            width: calc(100% - 1rem);
            padding: 1.25rem;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .oracle-pulse {
            animation: none;
          }
          
          .oracle-reveal {
            animation: none;
          }
          
          .oracle-item,
          .oracle-glow {
            transition: none;
          }
        }
      `}</style>
    </>
  );
};

export default IngredientOracle;




































