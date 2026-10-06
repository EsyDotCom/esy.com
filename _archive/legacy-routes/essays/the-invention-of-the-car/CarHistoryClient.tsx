"use client";

import React, { useState, useEffect, useRef } from 'react';
import './the-invention-of-the-car.css';

/*
 * THE INVENTION OF THE CAR
 * 
 * Design Research Report:
 * 
 * Visual Archaeology:
 * - Blueprint technical drawings from patent offices
 * - Hand-drawn sketches from inventor notebooks
 * - Technical annotations and callouts
 * - Engineering diagrams with measurements
 * - Grid paper and drafting aesthetics
 * 
 * Color Palette:
 * - Blueprint Dark (#0a1628) — engineering paper
 * - Blueprint Line (#4a90d9) — technical drawing ink
 * - Highlight Orange (#ff6b35) — annotation marks
 * - Sketch White (#f0f4f8) — clean paper
 * 
 * Typography:
 * - Architects Daughter — handwritten engineer notes
 * - JetBrains Mono — technical specifications
 * - Space Grotesk — modern clarity
 * 
 * Animation Philosophy:
 * - SVGs that DRAW themselves (stroke-dashoffset)
 * - Technical annotations appearing
 * - Speedometer tracking scroll as MPH
 * - Hand-sketched feel to all elements
 * 
 * Unique Mechanics (Anti-Pattern):
 * ✅ Blueprint grid background
 * ✅ SVG cars drawing with scroll
 * ✅ Speedometer progress indicator
 * ✅ Technical annotation reveals
 * ✅ Evolution strip of car silhouettes
 */

const CarHistoryClient: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mph, setMph] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / scrollHeight, 1);
      setScrollProgress(progress);
      // Map progress to MPH (0-200)
      setMph(Math.round(progress * 200));
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

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (scrollProgress * circumference);

  return (
    <div className="car-story">
      {/* Speedometer - Fixed Progress */}
      <div className="speedometer">
        <svg viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="45" className="speedo-bg" />
          <circle
            cx="60"
            cy="60"
            r="45"
            className="speedo-fill"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
          <text x="60" y="60" className="speedo-value">{mph}</text>
          <text x="60" y="75" className="speedo-label">MPH</text>
        </svg>
      </div>

      {/* Road Track */}
      <div className="road-track">
        <svg className="road-svg" viewBox="0 0 1000 60" preserveAspectRatio="none">
          <line x1="0" y1="20" x2="1000" y2="20" className="road-edge" />
          <line x1="0" y1="30" x2={scrollProgress * 1000} y2="30" className="road-line" />
          <line x1="0" y1="40" x2="1000" y2="40" className="road-edge" />
        </svg>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-wheel">
          <svg viewBox="0 0 200 200" className="wheel-svg">
            <circle cx="100" cy="100" r="90" className="wheel-outer" />
            <line x1="100" y1="10" x2="100" y2="190" className="wheel-spoke" />
            <line x1="10" y1="100" x2="190" y2="100" className="wheel-spoke" />
            <line x1="27" y1="27" x2="173" y2="173" className="wheel-spoke" />
            <line x1="173" y1="27" x2="27" y2="173" className="wheel-spoke" />
            <circle cx="100" cy="100" r="15" className="wheel-outer" />
          </svg>
        </div>
        
        <div className="hero-content">
          <div className="hero-year">SINCE 1886</div>
          <h1 className="hero-title">The</h1>
          <h2 className="hero-title-accent">Automobile</h2>
          <p className="hero-subtitle">
            A hand-drawn journey through the invention that changed civilization
          </p>
        </div>

        <div className="hero-scroll">
          <span>Scroll to drive</span>
          <div className="scroll-wheel"></div>
        </div>
      </section>

      {/* SECTION 1: The Patent-Motorwagen */}
      <section
        className="sketch-section"
        ref={(el) => { sectionRefs.current[0] = el; }}
      >
        <div className="sketch-container">
          <div className="car-drawing">
            <svg viewBox="0 0 500 300" className={`car-svg sketch-svg ${visibleSections.has(0) ? 'drawn' : 'drawing'}`}>
              {/* Benz Patent-Motorwagen sketch */}
              {/* Frame */}
              <path d="M100 180 L400 180 L420 160 L80 160 Z" className="sketch-fill" />
              <path d="M100 180 L400 180 L420 160 L80 160 Z" />
              
              {/* Wheels - Large rear */}
              <circle cx="150" cy="220" r="60" />
              <circle cx="150" cy="220" r="45" />
              <circle cx="150" cy="220" r="10" />
              
              {/* Wheel spokes */}
              <line x1="150" y1="160" x2="150" y2="280" />
              <line x1="90" y1="220" x2="210" y2="220" />
              
              <circle cx="350" cy="220" r="60" />
              <circle cx="350" cy="220" r="45" />
              <circle cx="350" cy="220" r="10" />
              
              <line x1="350" y1="160" x2="350" y2="280" />
              <line x1="290" y1="220" x2="410" y2="220" />
              
              {/* Front wheel - smaller */}
              <circle cx="250" cy="240" r="30" />
              <circle cx="250" cy="240" r="20" />
              <circle cx="250" cy="240" r="5" />
              
              {/* Steering */}
              <line x1="250" y1="210" x2="250" y2="140" />
              <path d="M230 130 Q250 120 270 130" />
              
              {/* Seat */}
              <path d="M180 140 L200 140 L200 160 L320 160 L320 140 L340 140 L340 180 L180 180 Z" />
              <rect x="200" y="130" width="120" height="30" rx="5" />
              
              {/* Engine */}
              <rect x="340" y="170" width="50" height="40" rx="3" />
              
              {/* Annotations */}
              <text x="350" y="155" className={`annotation ${visibleSections.has(0) ? 'visible' : ''}`}>954cc engine</text>
              <line x1="365" y1="160" x2="365" y2="170" className={`annotation-line ${visibleSections.has(0) ? 'visible' : ''}`} />
              
              <text x="150" y="140" className={`annotation ${visibleSections.has(0) ? 'visible' : ''}`}>Steel-spoke wheels</text>
              <line x1="150" y1="145" x2="150" y2="160" className={`annotation-line ${visibleSections.has(0) ? 'visible' : ''}`} />
            </svg>
          </div>
          
          <div className="sketch-content">
            <div className="sketch-year">JANUARY 29, 1886</div>
            <h2 className="sketch-title">The Benz Patent-Motorwagen</h2>
            <p className="sketch-text">
              Karl Benz files patent DRP-37435 for his &ldquo;vehicle powered by a gas engine&rdquo; — 
              the world&apos;s first true automobile. His three-wheeled creation featured a 
              954cc single-cylinder four-stroke engine producing just ⅔ horsepower, 
              yet it would spark a revolution.
            </p>
            <p className="sketch-text">
              Bertha Benz, Karl&apos;s wife, proved the vehicle&apos;s viability by taking it on a 
              66-mile journey from Mannheim to Pforzheim — the first long-distance automobile 
              trip in history.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Ford Model T */}
      <section
        className="sketch-section"
        ref={(el) => { sectionRefs.current[1] = el; }}
      >
        <div className="sketch-container">
          <div className="sketch-content">
            <div className="sketch-year">OCTOBER 1, 1908</div>
            <h2 className="sketch-title">The Ford Model T</h2>
            <p className="sketch-text">
              &ldquo;Any customer can have a car painted any color that he wants, so long as it is black.&rdquo; 
              Henry Ford&apos;s Model T wasn&apos;t the first car, but it was the first car for everyone.
            </p>
            <p className="sketch-text">
              At $850 (about $28,000 today), then dropping to $260 by 1925 thanks to 
              assembly line innovation, the &ldquo;Tin Lizzie&rdquo; put America on wheels. By 1918, 
              half of all cars in America were Model Ts.
            </p>
          </div>
          
          <div className="car-drawing">
            <svg viewBox="0 0 500 300" className={`car-svg sketch-svg ${visibleSections.has(1) ? 'drawn' : 'drawing'}`}>
              {/* Ford Model T sketch */}
              {/* Body */}
              <path d="M80 200 L100 160 L120 140 L200 130 L350 130 L380 150 L420 160 L430 200 Z" className="sketch-fill" />
              <path d="M80 200 L100 160 L120 140 L200 130 L350 130 L380 150 L420 160 L430 200" />
              
              {/* Cabin */}
              <path d="M150 130 L170 80 L340 80 L360 130" />
              <line x1="200" y1="80" x2="200" y2="130" />
              <line x1="300" y1="80" x2="300" y2="130" />
              
              {/* Windows */}
              <rect x="170" y="85" width="28" height="40" rx="2" />
              <rect x="205" y="85" width="90" height="40" rx="2" />
              <rect x="305" y="85" width="28" height="40" rx="2" />
              
              {/* Wheels */}
              <circle cx="130" cy="220" r="45" />
              <circle cx="130" cy="220" r="35" />
              <circle cx="130" cy="220" r="8" />
              
              <circle cx="380" cy="220" r="45" />
              <circle cx="380" cy="220" r="35" />
              <circle cx="380" cy="220" r="8" />
              
              {/* Spokes */}
              <line x1="130" y1="175" x2="130" y2="265" />
              <line x1="85" y1="220" x2="175" y2="220" />
              <line x1="380" y1="175" x2="380" y2="265" />
              <line x1="335" y1="220" x2="425" y2="220" />
              
              {/* Running board */}
              <rect x="100" y="200" width="310" height="8" />
              
              {/* Headlights */}
              <circle cx="85" cy="170" r="12" />
              <circle cx="425" cy="170" r="12" />
              
              {/* Hood */}
              <path d="M70 180 L70 150 L120 140" />
              
              {/* Annotations */}
              <text x="250" y="50" className={`annotation ${visibleSections.has(1) ? 'visible' : ''}`}>15-20 HP</text>
              <text x="85" y="240" className={`annotation ${visibleSections.has(1) ? 'visible' : ''}`}>$260-$850</text>
            </svg>
          </div>
        </div>
      </section>

      {/* DATA DASHBOARD */}
      <section
        className="data-dashboard"
        ref={(el) => { sectionRefs.current[2] = el; }}
      >
        <div className="dashboard-inner">
          <div className={`dash-item ${visibleSections.has(2) ? 'visible' : ''}`} style={{ transitionDelay: '0s' }}>
            <div className="dash-value">1.4B</div>
            <div className="dash-label">Cars on Earth today</div>
          </div>
          <div className={`dash-item ${visibleSections.has(2) ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <div className="dash-value">93</div>
            <div className="dash-label">Cars made per minute</div>
          </div>
          <div className={`dash-item ${visibleSections.has(2) ? 'visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
            <div className="dash-value">138</div>
            <div className="dash-label">Years since first patent</div>
          </div>
          <div className={`dash-item ${visibleSections.has(2) ? 'visible' : ''}`} style={{ transitionDelay: '0.6s' }}>
            <div className="dash-value">3T</div>
            <div className="dash-label">Miles driven annually (US)</div>
          </div>
        </div>
      </section>

      {/* SECTION 3: The Assembly Line */}
      <section
        className="sketch-section"
        ref={(el) => { sectionRefs.current[3] = el; }}
      >
        <div className="sketch-container">
          <div className="car-drawing">
            <svg viewBox="0 0 500 300" className={`car-svg sketch-svg ${visibleSections.has(3) ? 'drawn' : 'drawing'}`}>
              {/* Assembly line conveyor */}
              <line x1="0" y1="250" x2="500" y2="250" />
              <line x1="0" y1="260" x2="500" y2="260" />
              
              {/* Conveyor wheels */}
              <circle cx="50" cy="255" r="15" />
              <circle cx="150" cy="255" r="15" />
              <circle cx="250" cy="255" r="15" />
              <circle cx="350" cy="255" r="15" />
              <circle cx="450" cy="255" r="15" />
              
              {/* Cars in progress */}
              {/* Chassis only */}
              <rect x="30" y="200" width="80" height="40" rx="3" />
              <circle cx="45" cy="245" r="15" />
              <circle cx="95" cy="245" r="15" />
              
              {/* Chassis + body */}
              <rect x="150" y="180" width="80" height="60" rx="3" />
              <path d="M155 180 L170 150 L220 150 L225 180" />
              <circle cx="165" cy="245" r="15" />
              <circle cx="215" cy="245" r="15" />
              
              {/* Near complete */}
              <rect x="280" y="180" width="80" height="60" rx="3" />
              <path d="M285 180 L300 150 L350 150 L355 180" />
              <rect x="305" y="155" width="35" height="20" rx="2" />
              <circle cx="295" cy="245" r="15" />
              <circle cx="345" cy="245" r="15" />
              
              {/* Complete */}
              <rect x="400" y="180" width="80" height="60" rx="3" />
              <path d="M405 180 L420 150 L470 150 L475 180" />
              <rect x="425" y="155" width="35" height="20" rx="2" />
              <circle cx="390" cy="170" r="8" />
              <circle cx="415" cy="245" r="15" />
              <circle cx="465" cy="245" r="15" />
              
              {/* Workers */}
              <circle cx="120" cy="160" r="10" />
              <line x1="120" y1="170" x2="120" y2="200" />
              <line x1="120" y1="180" x2="100" y2="195" />
              <line x1="120" y1="180" x2="140" y2="195" />
              
              <circle cx="260" cy="160" r="10" />
              <line x1="260" y1="170" x2="260" y2="200" />
              <line x1="260" y1="180" x2="240" y2="195" />
              <line x1="260" y1="180" x2="280" y2="195" />
              
              {/* Annotations */}
              <text x="230" y="100" className={`annotation ${visibleSections.has(3) ? 'visible' : ''}`}>93 minutes per car</text>
              <text x="200" y="120" className={`annotation ${visibleSections.has(3) ? 'visible' : ''}`}>(down from 12+ hours)</text>
            </svg>
          </div>
          
          <div className="sketch-content">
            <div className="sketch-year">DECEMBER 1, 1913</div>
            <h2 className="sketch-title">The Moving Assembly Line</h2>
            <p className="sketch-text">
              At Ford&apos;s Highland Park plant, the first moving assembly line began operation. 
              What once took 12 hours and 28 minutes per car now took just 93 minutes.
            </p>
            <p className="sketch-text">
              This single innovation doubled worker wages (to $5/day), halved car prices, 
              and created the middle class as we know it. Mass production was born.
            </p>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="quote-section" ref={(el) => { sectionRefs.current[4] = el; }}>
        <div className="quote-bubble">
          <p className="quote-text">
            &ldquo;I will build a car for the great multitude. It will be large enough for the family, 
            but small enough for the individual to run and care for.&rdquo;
          </p>
          <p className="quote-author">— Henry Ford, 1907</p>
        </div>
      </section>

      {/* EVOLUTION STRIP */}
      <section className="evolution-section" ref={(el) => { sectionRefs.current[5] = el; }}>
        <div className="evolution-header">
          <h2>The Evolution of Form</h2>
        </div>
        
        <div className="evolution-strip">
          <div className="evo-car">
            <svg viewBox="0 0 120 80">
              {/* 1886 - Three wheeler */}
              <circle cx="30" cy="60" r="18" stroke="#4a90d9" strokeWidth="2" fill="none" />
              <circle cx="90" cy="60" r="18" stroke="#4a90d9" strokeWidth="2" fill="none" />
              <circle cx="60" cy="65" r="12" stroke="#4a90d9" strokeWidth="2" fill="none" />
              <path d="M30 45 L90 45 L60 30 Z" stroke="#4a90d9" strokeWidth="2" fill="none" />
            </svg>
            <div className="evo-year">1886</div>
          </div>
          
          <div className="evo-car">
            <svg viewBox="0 0 120 80">
              {/* 1908 - Boxy */}
              <rect x="15" y="35" width="90" height="30" rx="3" stroke="#4a90d9" strokeWidth="2" fill="none" />
              <path d="M25 35 L40 20 L80 20 L95 35" stroke="#4a90d9" strokeWidth="2" fill="none" />
              <circle cx="35" cy="65" r="12" stroke="#4a90d9" strokeWidth="2" fill="none" />
              <circle cx="85" cy="65" r="12" stroke="#4a90d9" strokeWidth="2" fill="none" />
            </svg>
            <div className="evo-year">1908</div>
          </div>
          
          <div className="evo-car">
            <svg viewBox="0 0 120 80">
              {/* 1950s - Fins */}
              <path d="M10 55 L20 40 L50 35 L80 35 L100 45 L110 55 L110 60 L10 60 Z" stroke="#4a90d9" strokeWidth="2" fill="none" />
              <path d="M100 40 L115 30 L115 50 L100 50" stroke="#4a90d9" strokeWidth="2" fill="none" />
              <circle cx="30" cy="60" r="10" stroke="#4a90d9" strokeWidth="2" fill="none" />
              <circle cx="90" cy="60" r="10" stroke="#4a90d9" strokeWidth="2" fill="none" />
            </svg>
            <div className="evo-year">1959</div>
          </div>
          
          <div className="evo-car">
            <svg viewBox="0 0 120 80">
              {/* 1990s - Rounded */}
              <path d="M10 55 C10 50, 20 35, 60 35 C100 35, 110 50, 110 55 L110 60 L10 60 Z" stroke="#4a90d9" strokeWidth="2" fill="none" />
              <circle cx="30" cy="60" r="10" stroke="#4a90d9" strokeWidth="2" fill="none" />
              <circle cx="90" cy="60" r="10" stroke="#4a90d9" strokeWidth="2" fill="none" />
            </svg>
            <div className="evo-year">1990</div>
          </div>
          
          <div className="evo-car">
            <svg viewBox="0 0 120 80">
              {/* 2024 - EV/Modern */}
              <path d="M5 55 L15 40 L30 30 L90 30 L105 40 L115 55 L115 60 L5 60 Z" stroke="#4a90d9" strokeWidth="2" fill="none" />
              <rect x="35" y="32" width="50" height="20" rx="3" stroke="#4a90d9" strokeWidth="1" fill="none" />
              <circle cx="30" cy="60" r="12" stroke="#ff6b35" strokeWidth="2" fill="none" />
              <circle cx="90" cy="60" r="12" stroke="#ff6b35" strokeWidth="2" fill="none" />
            </svg>
            <div className="evo-year">2024</div>
          </div>
        </div>
      </section>

      {/* SECTION 4: The Electric Future */}
      <section
        className="sketch-section"
        ref={(el) => { sectionRefs.current[6] = el; }}
      >
        <div className="sketch-container">
          <div className="sketch-content">
            <div className="sketch-year">THE ELECTRIC ERA</div>
            <h2 className="sketch-title">Full Circle</h2>
            <p className="sketch-text">
              In 1900, 38% of American cars were electric. Then gasoline won. Now, 138 years 
              after Benz&apos;s patent, we&apos;re returning to electric — with Tesla, Rivian, and 
              legacy automakers competing for an electrified future.
            </p>
            <p className="sketch-text">
              By 2030, EVs are projected to represent 50%+ of new car sales. The wheel 
              turns full circle — cleaner, smarter, but carrying the same dream of 
              personal mobility that started in Karl Benz&apos;s workshop.
            </p>
          </div>
          
          <div className="car-drawing">
            <svg viewBox="0 0 500 300" className={`car-svg sketch-svg ${visibleSections.has(6) ? 'drawn' : 'drawing'}`}>
              {/* Modern EV sketch */}
              {/* Body - sleek */}
              <path d="M50 200 L80 160 L120 130 L400 130 L450 170 L470 200 Z" className="sketch-fill" />
              <path d="M50 200 L80 160 L120 130 L400 130 L450 170 L470 200" />
              
              {/* Roof line */}
              <path d="M150 130 L180 90 L380 90 L410 130" />
              
              {/* Windows - panoramic */}
              <path d="M190 95 C190 95, 280 80, 370 95 L370 125 L190 125 Z" />
              
              {/* Wheels - aero covers */}
              <circle cx="130" cy="220" r="45" />
              <circle cx="130" cy="220" r="40" />
              <path d="M130 180 A40 40 0 0 1 170 220" strokeWidth="3" />
              <path d="M130 260 A40 40 0 0 1 90 220" strokeWidth="3" />
              
              <circle cx="390" cy="220" r="45" />
              <circle cx="390" cy="220" r="40" />
              <path d="M390 180 A40 40 0 0 1 430 220" strokeWidth="3" />
              <path d="M390 260 A40 40 0 0 1 350 220" strokeWidth="3" />
              
              {/* Light bar */}
              <path d="M120 140 L180 140" strokeWidth="3" />
              <path d="M340 140 L410 140" strokeWidth="3" />
              
              {/* Charging port */}
              <rect x="200" y="155" width="20" height="15" rx="2" />
              
              {/* Battery indicator */}
              <rect x="60" y="170" width="30" height="15" rx="2" />
              <rect x="62" y="172" width="25" height="11" rx="1" strokeDasharray="5 2" />
              
              {/* Annotations */}
              <text x="200" y="150" className={`annotation ${visibleSections.has(6) ? 'visible' : ''}`}>300+ mile range</text>
              <text x="55" y="165" className={`annotation ${visibleSections.has(6) ? 'visible' : ''}`}>100kWh</text>
              <text x="250" y="250" className={`annotation ${visibleSections.has(6) ? 'visible' : ''}`}>0-60: 2.5s</text>
            </svg>
          </div>
        </div>
      </section>

      {/* SOURCES */}
      <section className="sources">
        <div className="sources-inner">
          <h3>Sources & Further Reading</h3>
          <div className="sources-list">
            <a href="https://www.daimler.com/company/tradition/company-history/1885-1886.html" target="_blank" rel="noopener noreferrer">
              Daimler AG: Birth of the Automobile
            </a>
            <a href="https://www.hfmgv.org/exhibits/hf/default.asp" target="_blank" rel="noopener noreferrer">
              The Henry Ford Museum: Assembly Line History
            </a>
            <a href="https://www.britannica.com/technology/automobile" target="_blank" rel="noopener noreferrer">
              Encyclopædia Britannica: Automobile
            </a>
            <a href="https://corporate.ford.com/articles/history/the-model-t.html" target="_blank" rel="noopener noreferrer">
              Ford Motor Company: The Model T
            </a>
            <a href="https://www.iea.org/reports/global-ev-outlook-2024" target="_blank" rel="noopener noreferrer">
              IEA: Global EV Outlook 2024
            </a>
            <a href="https://www.loc.gov/collections/detroit-publishing-company/about-this-collection/" target="_blank" rel="noopener noreferrer">
              Library of Congress: Early Automobile Photography
            </a>
            <a href="https://www.autocar.co.uk/car-news/features/history-car" target="_blank" rel="noopener noreferrer">
              Autocar: Complete History of the Car
            </a>
            <a href="https://www.smithsonianmag.com/history/the-birth-of-the-automobile-180973764/" target="_blank" rel="noopener noreferrer">
              Smithsonian: The Birth of the Automobile
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="car-footer">
        <div className="footer-sketch">
          <svg viewBox="0 0 200 100">
            <path d="M20 70 L50 50 L80 45 L150 45 L180 60 L190 70" stroke="#4a90d9" strokeWidth="2" fill="none" />
            <circle cx="50" cy="80" r="15" stroke="#4a90d9" strokeWidth="2" fill="none" />
            <circle cx="160" cy="80" r="15" stroke="#4a90d9" strokeWidth="2" fill="none" />
            <path d="M90 45 L100 25 L140 25 L150 45" stroke="#4a90d9" strokeWidth="2" fill="none" />
            
            {/* Motion lines */}
            <line x1="5" y1="65" x2="15" y2="65" stroke="#ff6b35" strokeWidth="2" />
            <line x1="0" y1="70" x2="12" y2="70" stroke="#ff6b35" strokeWidth="2" />
            <line x1="5" y1="75" x2="15" y2="75" stroke="#ff6b35" strokeWidth="2" />
          </svg>
        </div>
        <p className="footer-text">
          From a single patent to 1.4 billion machines — the automobile changed everything.
        </p>
      </footer>
    </div>
  );
};

export default CarHistoryClient;

