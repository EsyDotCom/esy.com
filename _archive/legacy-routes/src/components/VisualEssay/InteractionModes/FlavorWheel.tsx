"use client";

/**
 * ESY VISUAL ESSAY TEMPLATE V2.0 — FLAVOR RESONANCE WHEEL
 * ========================================================
 * 
 * Mode C: User rotates a dial to explore aromatic/flavor layers.
 * 
 * Features:
 * - SVG-based rotating wheel with segments
 * - Click/tap or drag to rotate
 * - Active segment highlighting
 * - Detail panel with description and notes
 * - Touch-friendly controls
 */

import React, { useState, useCallback, useMemo } from 'react';

// ===========================================
// TYPES
// ===========================================

export interface FlavorSegment {
  id: string;
  name: string;
  description: string;
  notes: string[];
  color: string;
}

interface FlavorWheelProps {
  flavors: FlavorSegment[];
  /** Size of the wheel */
  size?: number;
  className?: string;
}

// ===========================================
// HELPERS
// ===========================================

function calculateSegmentPath(
  index: number, 
  total: number, 
  innerRadius: number, 
  outerRadius: number,
  centerX: number,
  centerY: number
): string {
  const anglePerSegment = (2 * Math.PI) / total;
  const startAngle = index * anglePerSegment - Math.PI / 2;
  const endAngle = (index + 1) * anglePerSegment - Math.PI / 2;
  
  const x1 = centerX + outerRadius * Math.cos(startAngle);
  const y1 = centerY + outerRadius * Math.sin(startAngle);
  const x2 = centerX + outerRadius * Math.cos(endAngle);
  const y2 = centerY + outerRadius * Math.sin(endAngle);
  const x3 = centerX + innerRadius * Math.cos(endAngle);
  const y3 = centerY + innerRadius * Math.sin(endAngle);
  const x4 = centerX + innerRadius * Math.cos(startAngle);
  const y4 = centerY + innerRadius * Math.sin(startAngle);
  
  const largeArc = anglePerSegment > Math.PI ? 1 : 0;
  
  return `
    M ${x1} ${y1}
    A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}
    L ${x3} ${y3}
    A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
    Z
  `;
}

function calculateLabelPosition(
  index: number,
  total: number,
  radius: number,
  centerX: number,
  centerY: number
): { x: number; y: number; rotation: number } {
  const anglePerSegment = (2 * Math.PI) / total;
  const midAngle = (index + 0.5) * anglePerSegment - Math.PI / 2;
  
  return {
    x: centerX + radius * Math.cos(midAngle),
    y: centerY + radius * Math.sin(midAngle),
    rotation: (midAngle * 180) / Math.PI + 90,
  };
}

// ===========================================
// COMPONENT
// ===========================================

export const FlavorWheel: React.FC<FlavorWheelProps> = ({
  flavors,
  size = 400,
  className = '',
}) => {
  const [rotation, setRotation] = useState(0);
  const [activeSegment, setActiveSegment] = useState(0);
  
  const center = size / 2;
  const outerRadius = size * 0.45;
  const innerRadius = size * 0.15;
  const labelRadius = (outerRadius + innerRadius) / 2;
  
  const segmentAngle = 360 / flavors.length;
  
  const handleRotation = useCallback((direction: 'cw' | 'ccw') => {
    const newRotation = direction === 'cw' 
      ? rotation + segmentAngle 
      : rotation - segmentAngle;
    setRotation(newRotation);
    
    const newActive = direction === 'cw'
      ? (activeSegment + 1) % flavors.length
      : (activeSegment - 1 + flavors.length) % flavors.length;
    setActiveSegment(newActive);
  }, [rotation, activeSegment, flavors.length, segmentAngle]);
  
  const handleSegmentClick = useCallback((index: number) => {
    const targetRotation = -index * segmentAngle;
    setRotation(targetRotation);
    setActiveSegment(index);
  }, [segmentAngle]);
  
  const activeFlavor = flavors[activeSegment];
  
  return (
    <>
      <div className={`flavor-wheel-container ${className}`}>
        {/* Wheel */}
        <div className="wheel-wrapper">
          <svg 
            viewBox={`0 0 ${size} ${size}`}
            className="flavor-wheel"
            aria-label="Flavor wheel - click segments or use arrows to explore"
          >
            {/* Segments Group - Rotates */}
            <g 
              className="wheel-segments"
              style={{ 
                transform: `rotate(${rotation}deg)`,
                transformOrigin: `${center}px ${center}px`,
              }}
            >
              {flavors.map((flavor, index) => {
                const path = calculateSegmentPath(
                  index, 
                  flavors.length, 
                  innerRadius, 
                  outerRadius,
                  center,
                  center
                );
                const label = calculateLabelPosition(
                  index,
                  flavors.length,
                  labelRadius,
                  center,
                  center
                );
                
                return (
                  <g key={flavor.id} className="wheel-segment-group">
                    <path
                      d={path}
                      fill={flavor.color}
                      className={`wheel-segment ${index === activeSegment ? 'active' : ''}`}
                      onClick={() => handleSegmentClick(index)}
                      style={{ cursor: 'pointer' }}
                    />
                    <text
                      x={label.x}
                      y={label.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="wheel-label"
                      style={{
                        transform: `rotate(${label.rotation}deg)`,
                        transformOrigin: `${label.x}px ${label.y}px`,
                      }}
                    >
                      {flavor.name}
                    </text>
                  </g>
                );
              })}
            </g>
            
            {/* Center Circle */}
            <circle
              cx={center}
              cy={center}
              r={innerRadius - 5}
              className="wheel-center"
            />
            
            {/* Active Indicator */}
            <polygon
              points={`${center},${center - outerRadius - 15} ${center - 10},${center - outerRadius - 5} ${center + 10},${center - outerRadius - 5}`}
              className="wheel-indicator"
            />
          </svg>
          
          {/* Controls */}
          <button
            className="wheel-control prev"
            onClick={() => handleRotation('ccw')}
            aria-label="Previous flavor"
          >
            ←
          </button>
          <button
            className="wheel-control next"
            onClick={() => handleRotation('cw')}
            aria-label="Next flavor"
          >
            →
          </button>
        </div>
        
        {/* Detail Panel */}
        <div className="flavor-detail">
          <h3 className="flavor-name">{activeFlavor.name}</h3>
          <p className="flavor-description">{activeFlavor.description}</p>
          <div className="flavor-notes">
            {activeFlavor.notes.map(note => (
              <span key={note} className="flavor-note">{note}</span>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .flavor-wheel-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          padding: 2rem;
        }
        
        .wheel-wrapper {
          position: relative;
          width: 100%;
          max-width: ${size}px;
        }
        
        .flavor-wheel {
          width: 100%;
          height: auto;
        }
        
        .wheel-segments {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .wheel-segment {
          transition: opacity 0.2s ease, filter 0.2s ease;
          stroke: var(--ve-bg-primary, #0a0a0c);
          stroke-width: 2;
        }
        
        .wheel-segment:hover {
          opacity: 0.85;
          filter: brightness(1.1);
        }
        
        .wheel-segment.active {
          filter: brightness(1.2) saturate(1.1);
        }
        
        .wheel-label {
          font-family: var(--ve-font-sans, sans-serif);
          font-size: 12px;
          font-weight: 600;
          fill: rgba(0, 0, 0, 0.8);
          pointer-events: none;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .wheel-center {
          fill: var(--ve-bg-primary, #0a0a0c);
          stroke: var(--ve-border, rgba(255, 255, 255, 0.1));
          stroke-width: 2;
        }
        
        .wheel-indicator {
          fill: var(--ve-accent, #6366f1);
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }
        
        .wheel-control {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          border: 1px solid var(--ve-border, rgba(255, 255, 255, 0.1));
          color: var(--ve-text-secondary, rgba(255, 255, 255, 0.7));
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .wheel-control:hover {
          background: rgba(255, 255, 255, 0.15);
          color: var(--ve-text-primary, white);
        }
        
        .wheel-control:focus {
          outline: 2px solid var(--ve-accent, #6366f1);
          outline-offset: 2px;
        }
        
        .wheel-control.prev {
          left: -20px;
        }
        
        .wheel-control.next {
          right: -20px;
        }
        
        .flavor-detail {
          text-align: center;
          max-width: 400px;
          animation: fade-in 0.4s ease;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .flavor-name {
          font-family: var(--ve-font-display, Georgia, serif);
          font-size: 1.75rem;
          font-weight: 400;
          color: var(--ve-text-primary, white);
          margin: 0 0 0.5rem;
        }
        
        .flavor-description {
          font-family: var(--ve-font-serif, Georgia, serif);
          font-size: 1rem;
          color: var(--ve-text-secondary, rgba(255, 255, 255, 0.7));
          line-height: 1.6;
          margin: 0 0 1rem;
        }
        
        .flavor-notes {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .flavor-note {
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          font-family: var(--ve-font-sans, sans-serif);
          font-size: 0.75rem;
          color: var(--ve-text-tertiary, rgba(255, 255, 255, 0.5));
        }
        
        @media (max-width: 768px) {
          .wheel-wrapper {
            padding: 0 2rem;
          }
          
          .wheel-control.prev {
            left: 0;
          }
          
          .wheel-control.next {
            right: 0;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .wheel-segments {
            transition: none;
          }
          
          .flavor-detail {
            animation: none;
          }
        }
      `}</style>
    </>
  );
};

export default FlavorWheel;




































