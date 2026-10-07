"use client";

/**
 * ESY VISUAL ESSAY TEMPLATE V2.0 — TIMEFOLD SLIDER
 * =================================================
 * 
 * Mode D: Drag to see one location transform across decades/centuries.
 * 
 * Features:
 * - Drag or click to scrub through time
 * - Smooth blending between eras
 * - Year labels at each era
 * - Touch-friendly interaction
 * - Keyboard accessible
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';

// ===========================================
// TYPES
// ===========================================

export interface Era {
  id: string;
  year: string;
  label: string;
  /** Image URL or SVG content */
  image: string;
  /** Optional description shown on hover */
  description?: string;
}

interface TimefoldSliderProps {
  eras: Era[];
  className?: string;
  aspectRatio?: string;
}

// ===========================================
// COMPONENT
// ===========================================

export const TimefoldSlider: React.FC<TimefoldSliderProps> = ({
  eras,
  className = '',
  aspectRatio = '16/9',
}) => {
  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calculate current and next era based on position
  const currentEraIndex = Math.min(
    Math.floor(position * eras.length),
    eras.length - 1
  );
  const nextEraIndex = Math.min(currentEraIndex + 1, eras.length - 1);
  const blend = (position * eras.length) % 1;
  
  const currentEra = eras[currentEraIndex];
  const nextEra = eras[nextEraIndex];
  
  // Handle position update
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const clamped = Math.max(0, Math.min(0.9999, x)); // Clamp to prevent going past last era
    setPosition(clamped);
  }, []);
  
  // Mouse events
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX);
  }, [updatePosition]);
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  }, [isDragging, updatePosition]);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  // Touch events
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);
  
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    updatePosition(e.touches[0].clientX);
  }, [isDragging, updatePosition]);
  
  // Global mouse up listener
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);
  
  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const step = 1 / (eras.length - 1);
    if (e.key === 'ArrowLeft') {
      setPosition(prev => Math.max(0, prev - step));
    } else if (e.key === 'ArrowRight') {
      setPosition(prev => Math.min(0.9999, prev + step));
    }
  }, [eras.length]);
  
  return (
    <>
      <div 
        ref={containerRef}
        className={`timefold-container ${isDragging ? 'dragging' : ''} ${className}`}
        style={{ aspectRatio }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
        aria-label="Time period slider"
        aria-valuemin={0}
        aria-valuemax={eras.length - 1}
        aria-valuenow={currentEraIndex}
        aria-valuetext={`${currentEra.year}: ${currentEra.label}`}
      >
        {/* Base Layer (Current Era) */}
        <div className="timefold-layer base">
          <img 
            src={currentEra.image} 
            alt={`${currentEra.year}: ${currentEra.label}`}
            draggable={false}
          />
        </div>
        
        {/* Blend Layer (Next Era) */}
        {currentEraIndex !== nextEraIndex && (
          <div 
            className="timefold-layer blend"
            style={{ opacity: blend }}
          >
            <img 
              src={nextEra.image} 
              alt={`${nextEra.year}: ${nextEra.label}`}
              draggable={false}
            />
          </div>
        )}
        
        {/* Slider Indicator */}
        <div 
          className="timefold-indicator"
          style={{ left: `${position * 100}%` }}
        >
          <div className="indicator-line" />
          <div className="indicator-handle" />
          <span className="indicator-year">
            {currentEra.year}
            {currentEraIndex !== nextEraIndex && ` → ${nextEra.year}`}
          </span>
        </div>
        
        {/* Era Labels */}
        <div className="timefold-labels">
          {eras.map((era, i) => (
            <button
              key={era.id}
              className={`era-label ${i === currentEraIndex ? 'active' : ''}`}
              style={{ left: `${(i / (eras.length - 1)) * 100}%` }}
              onClick={() => setPosition(i / (eras.length - 1) * 0.9999)}
              aria-label={`Jump to ${era.year}`}
            >
              <span className="era-year">{era.year}</span>
            </button>
          ))}
        </div>
        
        {/* Instructions */}
        <div className="timefold-hint">
          <span>Drag to travel through time</span>
        </div>
      </div>
      
      <style jsx>{`
        .timefold-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 12px;
          cursor: ew-resize;
          user-select: none;
          background: var(--ve-bg-secondary, #111);
        }
        
        .timefold-container:focus {
          outline: 2px solid var(--ve-accent, #6366f1);
          outline-offset: 2px;
        }
        
        .timefold-container.dragging {
          cursor: grabbing;
        }
        
        .timefold-layer {
          position: absolute;
          inset: 0;
        }
        
        .timefold-layer img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .timefold-layer.blend {
          transition: opacity 0.05s linear;
        }
        
        .timefold-indicator {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 2px;
          transform: translateX(-50%);
          pointer-events: none;
          z-index: 10;
        }
        
        .indicator-line {
          position: absolute;
          inset: 0;
          background: white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }
        
        .indicator-handle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 40px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        
        .indicator-handle::before,
        .indicator-handle::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 4px;
          height: 12px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 2px;
          transform: translateY(-50%);
        }
        
        .indicator-handle::before { left: 5px; }
        .indicator-handle::after { right: 5px; }
        
        .indicator-year {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) translateY(-40px);
          padding: 6px 12px;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(4px);
          border-radius: 6px;
          font-family: var(--ve-font-sans, sans-serif);
          font-size: 0.8125rem;
          font-weight: 600;
          color: white;
          white-space: nowrap;
        }
        
        .timefold-labels {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          right: 1rem;
          display: flex;
          justify-content: space-between;
          pointer-events: none;
        }
        
        .era-label {
          position: absolute;
          transform: translateX(-50%);
          padding: 4px 8px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          cursor: pointer;
          pointer-events: auto;
          transition: all 0.2s ease;
        }
        
        .era-label:hover {
          background: rgba(0, 0, 0, 0.8);
          border-color: rgba(255, 255, 255, 0.4);
        }
        
        .era-label.active {
          background: var(--ve-accent, #6366f1);
          border-color: var(--ve-accent, #6366f1);
        }
        
        .era-year {
          font-family: var(--ve-font-sans, sans-serif);
          font-size: 0.6875rem;
          font-weight: 600;
          color: white;
        }
        
        .timefold-hint {
          position: absolute;
          top: 1rem;
          left: 50%;
          transform: translateX(-50%);
          padding: 6px 16px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          border-radius: 20px;
          font-family: var(--ve-font-sans, sans-serif);
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
          opacity: 1;
          transition: opacity 0.3s ease;
        }
        
        .timefold-container.dragging .timefold-hint {
          opacity: 0;
        }
        
        @media (max-width: 768px) {
          .timefold-labels {
            bottom: 0.75rem;
            left: 0.75rem;
            right: 0.75rem;
          }
          
          .indicator-year {
            font-size: 0.75rem;
            padding: 4px 8px;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .timefold-layer.blend {
            transition: none;
          }
        }
      `}</style>
    </>
  );
};

export default TimefoldSlider;




































