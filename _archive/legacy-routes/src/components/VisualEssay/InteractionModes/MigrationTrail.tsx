"use client";

/**
 * ESY VISUAL ESSAY TEMPLATE V2.0 — MIGRATION TRAIL
 * =================================================
 * 
 * Mode B: Lines animate across a sleek vector canvas showing movement/spread.
 * 
 * ⚠️ NO aged map textures. Premium SVG only.
 * 
 * Features:
 * - Clean, minimalist map design (Apple Keynote quality)
 * - Animated path drawing
 * - Route selection with era labels
 * - Origin/destination markers with labels
 * - Fully accessible
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

// ===========================================
// TYPES
// ===========================================

export interface Route {
  id: string;
  era: string;
  description?: string;
  path: string; // SVG path d attribute
  origin: { x: number; y: number; label: string };
  destination: { x: number; y: number; label: string };
  color?: string;
}

export interface MapConfig {
  viewBox: string;
  landPaths: string[]; // Array of SVG path d attributes for landmasses
  labels?: Array<{ x: number; y: number; text: string }>;
}

interface MigrationTrailProps {
  routes: Route[];
  mapConfig: MapConfig;
  /** Auto-play through routes */
  autoPlay?: boolean;
  /** Interval for auto-play in ms */
  autoPlayInterval?: number;
  className?: string;
}

// ===========================================
// COMPONENT
// ===========================================

export const MigrationTrail: React.FC<MigrationTrailProps> = ({
  routes,
  mapConfig,
  autoPlay = false,
  autoPlayInterval = 5000,
  className = '',
}) => {
  const [activeRoute, setActiveRoute] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);
  
  // Get current route
  const currentRoute = routes[activeRoute];
  const routeColor = currentRoute.color || 'var(--ve-map-route, #58a6ff)';
  
  // Animate path drawing
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    
    // Reset animation
    setIsAnimating(true);
    const length = path.getTotalLength();
    
    // Set up stroke dash
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    
    // Force reflow
    path.getBoundingClientRect();
    
    // Start animation
    path.style.transition = 'stroke-dashoffset 3s ease-out';
    path.style.strokeDashoffset = '0';
    
    const timer = setTimeout(() => setIsAnimating(false), 3000);
    return () => clearTimeout(timer);
  }, [activeRoute]);
  
  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setActiveRoute(prev => (prev + 1) % routes.length);
    }, autoPlayInterval);
    
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, routes.length]);
  
  // Handle route selection
  const handleRouteSelect = useCallback((index: number) => {
    if (index === activeRoute) return;
    setActiveRoute(index);
  }, [activeRoute]);
  
  return (
    <>
      <div className={`migration-container ${className}`}>
        {/* Map SVG */}
        <svg 
          viewBox={mapConfig.viewBox}
          className="migration-map"
          aria-label={`Migration map showing ${currentRoute.era} route`}
        >
          {/* Landmasses */}
          <g className="map-lands">
            {mapConfig.landPaths.map((path, index) => (
              <path
                key={index}
                d={path}
                className="map-landmass"
              />
            ))}
          </g>
          
          {/* Optional labels */}
          {mapConfig.labels && (
            <g className="map-labels-group">
              {mapConfig.labels.map((label, index) => (
                <text
                  key={index}
                  x={label.x}
                  y={label.y}
                  className="map-label"
                >
                  {label.text}
                </text>
              ))}
            </g>
          )}
          
          {/* Route glow (background) */}
          <path
            d={currentRoute.path}
            className="map-route-glow"
            style={{ stroke: routeColor }}
          />
          
          {/* Animated Route */}
          <path
            ref={pathRef}
            d={currentRoute.path}
            className="map-route"
            style={{ stroke: routeColor }}
          />
          
          {/* Origin marker */}
          <g className={`route-marker-group origin ${isAnimating ? '' : 'visible'}`}>
            <circle
              cx={currentRoute.origin.x}
              cy={currentRoute.origin.y}
              r="8"
              className="route-marker"
              style={{ fill: routeColor }}
            />
            <text
              x={currentRoute.origin.x}
              y={currentRoute.origin.y - 15}
              className="marker-label"
            >
              {currentRoute.origin.label}
            </text>
          </g>
          
          {/* Destination marker */}
          <g className={`route-marker-group destination ${!isAnimating ? 'visible' : ''}`}>
            <circle
              cx={currentRoute.destination.x}
              cy={currentRoute.destination.y}
              r="8"
              className="route-marker"
              style={{ fill: routeColor }}
            />
            <text
              x={currentRoute.destination.x}
              y={currentRoute.destination.y - 15}
              className="marker-label"
            >
              {currentRoute.destination.label}
            </text>
          </g>
        </svg>
        
        {/* Route Controls */}
        <div className="route-controls" role="tablist" aria-label="Select time period">
          {routes.map((route, index) => (
            <button
              key={route.id}
              role="tab"
              aria-selected={index === activeRoute}
              className={`route-control ${index === activeRoute ? 'active' : ''}`}
              onClick={() => handleRouteSelect(index)}
              style={{ 
                '--route-color': route.color || 'var(--ve-accent)' 
              } as React.CSSProperties}
            >
              {route.era}
            </button>
          ))}
        </div>
        
        {/* Route Description */}
        {currentRoute.description && (
          <p className="route-description">
            {currentRoute.description}
          </p>
        )}
      </div>
      
      <style jsx>{`
        .migration-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          padding: 2rem;
        }
        
        .migration-map {
          width: 100%;
          max-width: 900px;
          height: auto;
          background: var(--ve-map-bg, #0d1117);
          border-radius: 12px;
          overflow: hidden;
        }
        
        .map-landmass {
          fill: var(--ve-map-land, #161b22);
          stroke: var(--ve-map-border, #30363d);
          stroke-width: 0.5;
        }
        
        .map-label {
          font-family: var(--ve-font-sans, sans-serif);
          font-size: 10px;
          font-weight: 500;
          fill: var(--ve-map-label, rgba(255, 255, 255, 0.5));
          text-anchor: middle;
        }
        
        .map-route-glow {
          fill: none;
          stroke-width: 8;
          stroke-linecap: round;
          opacity: 0.3;
          filter: blur(6px);
        }
        
        .map-route {
          fill: none;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        
        .route-marker-group {
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .route-marker-group.visible {
          opacity: 1;
        }
        
        .route-marker-group.origin {
          opacity: 1; /* Origin always visible */
        }
        
        .route-marker {
          stroke: var(--ve-map-bg, #0d1117);
          stroke-width: 3;
        }
        
        .marker-label {
          font-family: var(--ve-font-sans, sans-serif);
          font-size: 11px;
          font-weight: 600;
          fill: white;
          text-anchor: middle;
        }
        
        .route-controls {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .route-control {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--ve-border, rgba(255, 255, 255, 0.1));
          border-radius: 8px;
          font-family: var(--ve-font-sans, sans-serif);
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--ve-text-secondary, rgba(255, 255, 255, 0.7));
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .route-control:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--ve-text-primary, white);
        }
        
        .route-control:focus {
          outline: 2px solid var(--route-color);
          outline-offset: 2px;
        }
        
        .route-control.active {
          background: var(--route-color);
          border-color: var(--route-color);
          color: white;
        }
        
        .route-description {
          font-family: var(--ve-font-serif, Georgia, serif);
          font-size: 1rem;
          color: var(--ve-text-secondary, rgba(255, 255, 255, 0.7));
          text-align: center;
          max-width: 600px;
          margin: 0;
          line-height: 1.6;
        }
        
        @media (max-width: 768px) {
          .migration-container {
            padding: 1rem;
          }
          
          .route-control {
            padding: 6px 12px;
            font-size: 0.75rem;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .map-route {
            stroke-dasharray: none !important;
            stroke-dashoffset: 0 !important;
            transition: none !important;
          }
          
          .route-marker-group {
            transition: none;
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default MigrationTrail;




































