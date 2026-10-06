"use client";

import React, { useState, useEffect, useRef } from 'react';
import './the-skyscraper.css';

/*
 * THE SKYSCRAPER - Reaching for the Sky
 * 
 * Design Research Report:
 * 
 * Visual Archaeology:
 * - Art Deco architectural drawings
 * - Construction site photography
 * - Steel frame blueprints
 * - 1930s NYC skyline postcards
 * 
 * UNIQUE MECHANICS (Anti-Pattern Applied):
 * ✅ Building that constructs FLOOR BY FLOOR
 * ✅ Elevator that RISES with scroll
 * ✅ Floor counter progress
 * ✅ Steel frame drawing itself
 * ✅ Height comparison visualization
 * ✅ Crane lifting beams animation
 */

const MAX_FLOORS = 163; // Burj Khalifa

const heightData = [
  { name: 'Home Insurance', year: '1885', height: 42, meters: 42, floors: 10 },
  { name: 'Woolworth', year: '1913', height: 241, meters: 241, floors: 57 },
  { name: 'Empire State', year: '1931', height: 381, meters: 381, floors: 102 },
  { name: 'WTC', year: '1973', height: 417, meters: 417, floors: 110 },
  { name: 'Willis Tower', year: '1974', height: 442, meters: 442, floors: 108 },
  { name: 'Burj Khalifa', year: '2010', height: 828, meters: 828, floors: 163 },
];

const SkyscraperClient: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFloor, setCurrentFloor] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const [heightVisible, setHeightVisible] = useState(false);
  const [frameVisible, setFrameVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / scrollHeight, 1);
      setScrollProgress(progress);
      
      // Calculate current floor
      const floor = Math.round(progress * MAX_FLOORS);
      setCurrentFloor(floor);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleSections((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const heightSection = document.querySelector('.height-section');
    if (!heightSection) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeightVisible(true);
      },
      { threshold: 0.3 }
    );
    
    observer.observe(heightSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const frameSection = document.querySelector('.frame-section');
    if (!frameSection) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFrameVisible(true);
      },
      { threshold: 0.3 }
    );
    
    observer.observe(frameSection);
    return () => observer.disconnect();
  }, []);

  const elevatorPosition = scrollProgress * 260; // 300 - 40 (car height)
  const buildingHeight = scrollProgress * 100;
  const maxHeight = 828; // Burj Khalifa in meters

  return (
    <div className="skyscraper-story">
      {/* Elevator Progress Indicator */}
      <div className="elevator-progress">
        <div className="elevator-shaft">
          <div 
            className="elevator-car"
            style={{ bottom: `${elevatorPosition}px` }}
          >
            <div className="elevator-doors">
              <div className="elevator-door" />
              <div className="elevator-door" />
            </div>
          </div>
        </div>
        <div className="floor-indicator">
          <div className="floor-number">{currentFloor}</div>
          <div className="floor-label">Floor</div>
        </div>
      </div>

      {/* Mini Building Construction */}
      <div className="construction-progress">
        <div className="mini-building">
          <div 
            className="building-floors"
            style={{ height: `${buildingHeight}%` }}
          />
          <div className="crane-arm">
            <div className="crane-cable" />
            <div className="crane-hook" />
          </div>
        </div>
      </div>

      {/* ==================== HERO ==================== */}
      <section className="hero">
        <svg className="hero-skyline" viewBox="0 0 1000 200" preserveAspectRatio="none">
          {/* NYC-style skyline silhouette */}
          <path 
            d="M0 200 L0 150 L50 150 L50 100 L70 100 L70 80 L90 80 L90 120 L120 120 L120 60 L140 60 L140 40 L160 40 L160 60 L180 60 L180 100 L220 100 L220 50 L240 50 L240 30 L250 20 L260 30 L260 50 L280 50 L280 90 L320 90 L320 70 L350 70 L350 110 L400 110 L400 80 L430 80 L430 60 L450 60 L450 40 L470 40 L470 20 L475 10 L480 20 L480 40 L500 40 L500 70 L540 70 L540 90 L580 90 L580 130 L620 130 L620 100 L660 100 L660 80 L700 80 L700 50 L720 50 L720 30 L740 30 L740 60 L780 60 L780 90 L820 90 L820 120 L860 120 L860 100 L900 100 L900 140 L950 140 L950 120 L1000 120 L1000 200 Z"
            fill="#3d4a5a"
          />
        </svg>

        <div className="hero-content">
          <div className="hero-era">Since 1885</div>
          <h1 className="hero-title">
            The Skyscraper
            <span className="accent">TOUCHING THE CLOUDS</span>
          </h1>
          <p className="hero-subtitle">How steel, elevators, and ambition reshaped our cities</p>
          <p className="hero-description">
            From 10-story beginnings to 163-floor towers piercing the clouds — 
            the skyscraper is humanity&apos;s vertical conquest of space.
          </p>
          
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="stat-number">828m</div>
              <div className="stat-label">Tallest (Burj Khalifa)</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">163</div>
              <div className="stat-label">Most Floors</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">139</div>
              <div className="stat-label">Years of History</div>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <span>Rise with us</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* ==================== SECTION 1: The Elevator ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[0] = el; }}
      >
        <div className="section-layout">
          <div className="section-visual">
            <svg viewBox="0 0 280 400" className="building-svg">
              {/* Elevator shaft illustration */}
              <g className={`fade-up ${visibleSections.has(0) ? 'visible' : ''}`}>
                {/* Shaft */}
                <rect x="90" y="50" width="100" height="300" fill="#3d4a5a" stroke="#5a6a7a" strokeWidth="2" />
                
                {/* Guide rails */}
                <line x1="100" y1="50" x2="100" y2="350" stroke="#8090a0" strokeWidth="3" />
                <line x1="180" y1="50" x2="180" y2="350" stroke="#8090a0" strokeWidth="3" />
                
                {/* Elevator car */}
                <rect x="105" y="200" width="70" height="60" fill="#d4af37" stroke="#5a6a7a" strokeWidth="2" />
                <line x1="140" y1="200" x2="140" y2="260" stroke="#5a6a7a" strokeWidth="2" />
                
                {/* Cable */}
                <line x1="140" y1="50" x2="140" y2="200" stroke="#5a6a7a" strokeWidth="3" />
                
                {/* Pulley at top */}
                <circle cx="140" cy="40" r="15" fill="#8090a0" stroke="#5a6a7a" strokeWidth="2" />
                <circle cx="140" cy="40" r="5" fill="#5a6a7a" />
                
                {/* Safety brake mechanism */}
                <rect x="85" y="215" width="8" height="30" fill="#ff6600" />
                <rect x="187" y="215" width="8" height="30" fill="#ff6600" />
                
                {/* Floor indicators */}
                <text x="70" y="80" fontFamily="Roboto Mono" fontSize="10" fill="#8090a0">5</text>
                <text x="70" y="140" fontFamily="Roboto Mono" fontSize="10" fill="#8090a0">4</text>
                <text x="70" y="200" fontFamily="Roboto Mono" fontSize="10" fill="#8090a0">3</text>
                <text x="70" y="260" fontFamily="Roboto Mono" fontSize="10" fill="#8090a0">2</text>
                <text x="70" y="320" fontFamily="Roboto Mono" fontSize="10" fill="#8090a0">1</text>
                
                <text x="140" y="380" fontFamily="Caveat" fontSize="14" fill="#8090a0" textAnchor="middle">
                  Otis Safety Elevator, 1852
                </text>
              </g>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-era">The Enabling Technology</div>
            <div className="section-year">1852</div>
            <h3 className="section-title">Elisha Otis &amp; The Safety Elevator</h3>
            <p className="section-text">
              Before Otis, elevators existed but were death traps. If the rope snapped, 
              the car plummeted. At the 1854 Crystal Palace, Otis stood on a platform, 
              had the rope cut, and his automatic brake caught the fall. &ldquo;All safe, 
              gentlemen!&rdquo; he declared.
            </p>
            <p className="section-text">
              The first commercial passenger elevator was installed in New York&apos;s 
              Haughwout Building in 1857. Suddenly, upper floors — once undesirable — 
              became premium real estate. The race upward could begin.
            </p>
            <div className="section-highlight">
              &ldquo;Without the elevator, there would be no skyscraper. 
              No one climbs 50 flights of stairs.&rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 2: First Skyscraper ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[1] = el; }}
      >
        <div className="section-layout reverse">
          <div className="section-visual">
            <svg viewBox="0 0 280 400" className="building-svg">
              {/* Home Insurance Building */}
              <g className={`fade-up ${visibleSections.has(1) ? 'visible' : ''}`}>
                {/* Foundation */}
                <rect x="60" y="350" width="160" height="20" className="concrete-base" />
                
                {/* Steel frame (revealed) */}
                <g className="steel-frame">
                  {/* Vertical columns */}
                  <line x1="70" y1="100" x2="70" y2="350" strokeWidth="4" stroke="#5a6a7a" />
                  <line x1="140" y1="100" x2="140" y2="350" strokeWidth="4" stroke="#5a6a7a" />
                  <line x1="210" y1="100" x2="210" y2="350" strokeWidth="4" stroke="#5a6a7a" />
                  
                  {/* Horizontal beams */}
                  {[100, 150, 200, 250, 300].map((y) => (
                    <line key={y} x1="70" y1={y} x2="210" y2={y} strokeWidth="3" stroke="#5a6a7a" />
                  ))}
                </g>
                
                {/* Building facade */}
                <rect x="65" y="95" width="150" height="255" fill="none" stroke="#a0a0a0" strokeWidth="2" />
                
                {/* Windows */}
                {[110, 160, 210, 260, 310].map((y) => (
                  <g key={y}>
                    <rect x="80" y={y} width="40" height="30" className="glass-panel" />
                    <rect x="160" y={y} width="40" height="30" className="glass-panel" />
                  </g>
                ))}
                
                {/* Decorative cornice */}
                <rect x="60" y="85" width="160" height="15" fill="#a0a0a0" stroke="#707070" />
                <rect x="55" y="80" width="170" height="8" fill="#707070" />
                
                <text x="140" y="390" fontFamily="Caveat" fontSize="14" fill="#8090a0" textAnchor="middle">
                  Home Insurance Building, Chicago
                </text>
              </g>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-era">The First Skyscraper</div>
            <div className="section-year">1885</div>
            <h3 className="section-title">Home Insurance Building: Steel Changes Everything</h3>
            <p className="section-text">
              William Le Baron Jenney&apos;s 10-story building in Chicago was revolutionary 
              not for its height, but its skeleton. Instead of thick masonry walls bearing 
              the load, a steel frame supported the structure. Walls became mere curtains.
            </p>
            <p className="section-text">
              This &ldquo;Chicago skeleton&rdquo; construction meant buildings could rise far 
              higher without impossibly thick walls at the base. The Home Insurance Building 
              was demolished in 1931, but its DNA lives in every skyscraper since.
            </p>
            <div className="section-highlight">
              At 138 feet, it was modest by today&apos;s standards — but it proved 
              that steel could carry a building to the sky.
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STEEL FRAME SECTION ==================== */}
      <section className="frame-section">
        <div className="frame-inner">
          <h3 className="frame-title">The Steel Skeleton</h3>
          <svg className="frame-svg" viewBox="0 0 600 300">
            {/* Animated steel frame construction */}
            <g>
              {/* Vertical columns */}
              <line 
                x1="100" y1="280" x2="100" y2="50" 
                className={`frame-beam ${frameVisible ? 'visible' : ''}`}
                style={{ transitionDelay: '0s' }}
              />
              <line 
                x1="250" y1="280" x2="250" y2="50" 
                className={`frame-beam ${frameVisible ? 'visible' : ''}`}
                style={{ transitionDelay: '0.2s' }}
              />
              <line 
                x1="400" y1="280" x2="400" y2="50" 
                className={`frame-beam ${frameVisible ? 'visible' : ''}`}
                style={{ transitionDelay: '0.4s' }}
              />
              <line 
                x1="550" y1="280" x2="550" y2="50" 
                className={`frame-beam ${frameVisible ? 'visible' : ''}`}
                style={{ transitionDelay: '0.6s' }}
              />
              
              {/* Horizontal beams */}
              <line 
                x1="100" y1="280" x2="550" y2="280" 
                className={`frame-beam ${frameVisible ? 'visible' : ''}`}
                style={{ transitionDelay: '0.8s' }}
              />
              <line 
                x1="100" y1="200" x2="550" y2="200" 
                className={`frame-beam ${frameVisible ? 'visible' : ''}`}
                style={{ transitionDelay: '1s' }}
              />
              <line 
                x1="100" y1="120" x2="550" y2="120" 
                className={`frame-beam ${frameVisible ? 'visible' : ''}`}
                style={{ transitionDelay: '1.2s' }}
              />
              <line 
                x1="100" y1="50" x2="550" y2="50" 
                className={`frame-beam ${frameVisible ? 'visible' : ''}`}
                style={{ transitionDelay: '1.4s' }}
              />
              
              {/* Rivets */}
              {[100, 250, 400, 550].map((x) => (
                [50, 120, 200, 280].map((y) => (
                  <circle 
                    key={`${x}-${y}`}
                    cx={x} 
                    cy={y} 
                    r="6" 
                    className={`frame-rivet ${frameVisible ? 'visible' : ''}`}
                    style={{ transitionDelay: `${1.6 + Math.random() * 0.5}s` }}
                  />
                ))
              ))}
            </g>
          </svg>
        </div>
      </section>

      {/* ==================== SECTION 3: The Golden Age ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[2] = el; }}
      >
        <div className="section-layout">
          <div className="section-visual">
            <svg viewBox="0 0 280 450" className="building-svg">
              {/* Empire State Building */}
              <g className={`fade-up ${visibleSections.has(2) ? 'visible' : ''}`}>
                {/* Base */}
                <rect x="40" y="380" width="200" height="40" fill="#a0a0a0" stroke="#707070" strokeWidth="2" />
                
                {/* Main tower - stepped setbacks */}
                <rect x="50" y="280" width="180" height="100" fill="#8090a0" stroke="#5a6a7a" strokeWidth="1" />
                <rect x="70" y="180" width="140" height="100" fill="#8090a0" stroke="#5a6a7a" strokeWidth="1" />
                <rect x="90" y="100" width="100" height="80" fill="#8090a0" stroke="#5a6a7a" strokeWidth="1" />
                <rect x="110" y="50" width="60" height="50" fill="#8090a0" stroke="#5a6a7a" strokeWidth="1" />
                
                {/* Spire */}
                <rect x="130" y="20" width="20" height="30" fill="#5a6a7a" />
                <polygon points="140,5 130,20 150,20" fill="#d4af37" />
                
                {/* Art Deco details */}
                <rect x="125" y="45" width="30" height="8" className="deco-detail" />
                <rect x="105" y="95" width="70" height="8" className="deco-detail" />
                <rect x="85" y="175" width="110" height="8" className="deco-detail" />
                
                {/* Windows (simplified) */}
                {[290, 310, 330, 350].map((y) => (
                  <g key={y}>
                    {[60, 100, 140, 180].map((x) => (
                      <rect key={x} x={x} y={y} width="15" height="12" fill="#87ceeb" opacity="0.6" />
                    ))}
                  </g>
                ))}
                
                {/* Observation deck indicator */}
                <circle cx="140" cy="110" r="3" fill="#ff6600" />
                
                <text x="140" y="435" fontFamily="Caveat" fontSize="14" fill="#8090a0" textAnchor="middle">
                  Empire State Building, 1931
                </text>
              </g>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-era">The Race to the Top</div>
            <div className="section-year">1931</div>
            <h3 className="section-title">The Empire State Building: Icon of an Era</h3>
            <p className="section-text">
              Built during the Great Depression, the Empire State Building rose at an 
              astonishing pace — 4.5 floors per week. At 1,454 feet with 102 floors, 
              it was the world&apos;s tallest for 40 years.
            </p>
            <p className="section-text">
              Its Art Deco crown and setback design weren&apos;t just aesthetic — 1916 
              zoning laws required setbacks to let light reach the street. Constraint 
              became style. The building used 60,000 tons of steel and 10 million bricks.
            </p>
            <div className="section-highlight">
              3,400 workers built it in just 410 days. At peak, they completed 
              14 floors in 10 days.
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HEIGHT COMPARISON ==================== */}
      <section className="height-section">
        <div className="height-inner">
          <h3 className="height-title">The Race to the Sky</h3>
          <p className="height-subtitle">How we&apos;ve grown — 1885 to 2010</p>
          
          <div className="height-comparison">
            {heightData.map((building, idx) => (
              <div key={building.name} className="height-item">
                <div 
                  className="height-bar"
                  style={{ 
                    height: heightVisible ? `${(building.height / maxHeight) * 280}px` : '0px',
                    transitionDelay: `${idx * 0.15}s`
                  }}
                />
                <div className="height-value">{building.meters}m</div>
                <div className="height-name">{building.name}</div>
                <div className="height-year">{building.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 4: Modern Era ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[3] = el; }}
      >
        <div className="section-layout reverse">
          <div className="section-visual">
            <svg viewBox="0 0 280 500" className="building-svg">
              {/* Burj Khalifa */}
              <g className={`fade-up ${visibleSections.has(3) ? 'visible' : ''}`}>
                {/* Base podium */}
                <ellipse cx="140" cy="470" rx="80" ry="20" fill="#a0a0a0" />
                
                {/* Main tower - Y-shaped buttressed core */}
                <path 
                  d="M140 30 L160 100 L180 200 L190 350 L190 450 L90 450 L90 350 L100 200 L120 100 Z"
                  fill="linear-gradient(to bottom, #87ceeb, #5a9ab8)"
                  stroke="#5a6a7a"
                  strokeWidth="1"
                />
                
                {/* Stepped setbacks */}
                <path d="M140 30 L155 80 L125 80 Z" fill="#5a9ab8" />
                <line x1="140" y1="100" x2="175" y2="180" stroke="#5a6a7a" strokeWidth="0.5" />
                <line x1="140" y1="100" x2="105" y2="180" stroke="#5a6a7a" strokeWidth="0.5" />
                <line x1="140" y1="180" x2="185" y2="300" stroke="#5a6a7a" strokeWidth="0.5" />
                <line x1="140" y1="180" x2="95" y2="300" stroke="#5a6a7a" strokeWidth="0.5" />
                
                {/* Spire */}
                <line x1="140" y1="30" x2="140" y2="10" stroke="#5a6a7a" strokeWidth="3" />
                <circle cx="140" cy="8" r="3" fill="#d4af37" />
                
                {/* Glass curtain wall pattern */}
                {[120, 180, 240, 300, 360, 420].map((y) => (
                  <line key={y} x1="100" y1={y} x2="180" y2={y} stroke="#5a6a7a" strokeWidth="0.5" opacity="0.5" />
                ))}
                
                {/* Y-shape wings hint */}
                <line x1="90" y1="450" x2="60" y2="400" stroke="#5a6a7a" strokeWidth="2" />
                <line x1="190" y1="450" x2="220" y2="400" stroke="#5a6a7a" strokeWidth="2" />
                
                <text x="140" y="495" fontFamily="Caveat" fontSize="14" fill="#8090a0" textAnchor="middle">
                  Burj Khalifa, Dubai, 2010
                </text>
              </g>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-era">The Supertall Era</div>
            <div className="section-year">2010</div>
            <h3 className="section-title">Burj Khalifa: 828 Meters of Ambition</h3>
            <p className="section-text">
              At 2,717 feet with 163 floors, Dubai&apos;s Burj Khalifa isn&apos;t just 
              tall — it&apos;s a different category. Its Y-shaped floor plan reduces 
              wind forces; its buttressed core concept came from studying flowers.
            </p>
            <p className="section-text">
              The tower uses 330,000 cubic meters of concrete and pumped it to 
              record heights. Its elevators travel at 22 mph. The observation deck 
              on floor 148 offers views of 80+ miles on clear days.
            </p>
            <div className="section-highlight">
              The Burj is so tall that residents on upper floors experience sunset 
              2-3 minutes later than those at ground level.
            </div>
          </div>
        </div>
      </section>

      {/* ==================== QUOTE ==================== */}
      <section className="quote-section">
        <div className="quote-inner">
          <p className="quote-text">
            &ldquo;The skyscraper is the great contribution of American civilization 
            to the art of building. It is the natural expression of an age that 
            believes in the possible conquest of nature.&rdquo;
          </p>
          <p className="quote-author">— Louis Sullivan, Father of the Skyscraper</p>
        </div>
      </section>

      {/* ==================== SOURCES ==================== */}
      <section className="sources-section">
        <div className="sources-inner">
          <h3 className="sources-title">Sources & Further Reading</h3>
          <div className="sources-grid">
            <a href="https://www.britannica.com/technology/skyscraper" target="_blank" rel="noopener noreferrer">
              Encyclopædia Britannica: Skyscraper History
            </a>
            <a href="https://www.ctbuh.org/resource/height" target="_blank" rel="noopener noreferrer">
              Council on Tall Buildings: Global Database
            </a>
            <a href="https://www.esbnyc.com/about/history" target="_blank" rel="noopener noreferrer">
              Empire State Building: Official History
            </a>
            <a href="https://www.burjkhalifa.ae/en/the-tower/construction/" target="_blank" rel="noopener noreferrer">
              Burj Khalifa: Construction Facts
            </a>
            <a href="https://www.loc.gov/collections/detroit-publishing-company/" target="_blank" rel="noopener noreferrer">
              Library of Congress: Early Skyscraper Photography
            </a>
            <a href="https://www.smithsonianmag.com/history/birth-american-skyscraper-180954508/" target="_blank" rel="noopener noreferrer">
              Smithsonian: Birth of the American Skyscraper
            </a>
            <a href="https://www.skyscraper.org/EXHIBITIONS/TENYEARS/tenyears.htm" target="_blank" rel="noopener noreferrer">
              Skyscraper Museum: Historical Archives
            </a>
            <a href="https://www.archdaily.com/tag/skyscraper" target="_blank" rel="noopener noreferrer">
              ArchDaily: Contemporary Skyscraper Design
            </a>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="story-footer">
        <div className="footer-content">
          <svg className="footer-skyline" viewBox="0 0 200 60">
            {/* Mini skyline */}
            <rect x="10" y="40" width="15" height="20" fill="#5a6a7a" />
            <rect x="30" y="30" width="20" height="30" fill="#8090a0" />
            <rect x="55" y="20" width="15" height="40" fill="#5a6a7a" />
            <rect x="75" y="10" width="25" height="50" fill="#a0a0a0" />
            <rect x="105" y="25" width="18" height="35" fill="#5a6a7a" />
            <rect x="128" y="35" width="22" height="25" fill="#8090a0" />
            <rect x="155" y="15" width="20" height="45" fill="#5a6a7a" />
            <rect x="180" y="40" width="15" height="20" fill="#a0a0a0" />
          </svg>
          <p className="footer-text">
            From 10 stories to 163 floors in 139 years — the skyscraper remains 
            humanity&apos;s most visible expression of ambition, engineering, and the 
            belief that we can always build higher.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SkyscraperClient;

