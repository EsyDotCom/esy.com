"use client";

import React, { useState, useEffect, useRef } from 'react';
import './the-train.css';

/*
 * THE TRAIN - Industrial Sketch Journey
 * 
 * Design Research Report:
 * 
 * Visual Archaeology:
 * - Victorian engineering drawings
 * - Industrial Revolution aesthetics
 * - Steam locomotive technical illustrations
 * - Railroad construction blueprints
 * 
 * Color Palette (Derived from subject):
 * - Iron Gray (#4a4a50) — locomotive steel
 * - Wood Brown (#8b6914) — railway ties
 * - Coal Black (#1a1a1e) — smoke, fuel
 * - Steam White (#e8e8e8) — clouds
 * - Brass Gold (#b8860b) — fittings
 * - Rust Orange (#b54b2a) — aged metal
 * 
 * UNIQUE MECHANICS (Anti-Pattern Applied):
 * ✅ Railroad tracks that BUILD as you scroll
 * ✅ Locomotive wheels that ROTATE with scroll
 * ✅ Steam puffs that emit based on scroll
 * ✅ Mile marker progress indicator
 * ✅ Tunnel entrance darkness effect
 * ✅ Speed evolution visualization
 */

const speedData = [
  { year: '1829', speed: 30, type: 'Steam', label: 'Rocket' },
  { year: '1893', speed: 100, type: 'Steam', label: 'NYC 999' },
  { year: '1964', speed: 130, type: 'Electric', label: 'Shinkansen' },
  { year: '1981', speed: 200, type: 'Electric', label: 'TGV' },
  { year: '2007', speed: 357, type: 'Electric', label: 'TGV Record' },
  { year: '2015', speed: 375, type: 'Maglev', label: 'Japan L0' },
];

const TrainClient: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [wheelRotation, setWheelRotation] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const [speedVisible, setSpeedVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / scrollHeight, 1);
      setScrollProgress(progress);
      setWheelRotation(window.scrollY * 0.5);
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
    const speedSection = document.querySelector('.speed-section');
    if (!speedSection) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSpeedVisible(true);
      },
      { threshold: 0.3 }
    );
    
    observer.observe(speedSection);
    return () => observer.disconnect();
  }, []);

  const milesTraveled = Math.round(scrollProgress * 100);
  const maxSpeed = 375;

  return (
    <div className="train-story">
      {/* Steam Puffs */}
      <div className="steam-container">
        <div className="steam-puff"></div>
        <div className="steam-puff"></div>
        <div className="steam-puff"></div>
        <div className="steam-puff"></div>
        <div className="steam-puff"></div>
      </div>

      {/* Mile Marker Progress */}
      <div className="mile-marker">
        <div className="mile-post">
          <svg viewBox="0 0 50 80">
            {/* Post */}
            <rect x="20" y="30" width="10" height="50" fill="#8b6914" stroke="#5a4510" strokeWidth="1" />
            {/* Sign */}
            <rect x="5" y="5" width="40" height="30" rx="3" fill="#e8e8e8" stroke="#4a4a50" strokeWidth="2" />
            {/* Mile number inside */}
            <text x="25" y="26" textAnchor="middle" fontFamily="Oswald" fontSize="16" fontWeight="600" fill="#1a1a1e">
              {milesTraveled}
            </text>
          </svg>
        </div>
        <span className="mile-label">miles</span>
      </div>

      {/* Railroad Track - Fixed */}
      <div className="railroad-track">
        <svg className="track-svg" viewBox="0 0 1000 40" preserveAspectRatio="none">
          {/* Rails */}
          <line x1="0" y1="10" x2={scrollProgress * 1000} y2="10" className="rail" />
          <line x1="0" y1="30" x2={scrollProgress * 1000} y2="30" className="rail" />
          {/* Ties */}
          {Array.from({ length: 50 }).map((_, i) => (
            <rect 
              key={i} 
              x={i * 20} 
              y="5" 
              width="8" 
              height="30" 
              className="tie"
              opacity={i * 20 < scrollProgress * 1000 ? 1 : 0.2}
            />
          ))}
        </svg>
      </div>

      {/* ==================== HERO ==================== */}
      <section className="hero">
        {/* Background Locomotive */}
        <div className="hero-locomotive">
          <svg viewBox="0 0 600 400">
            {/* Boiler */}
            <ellipse cx="250" cy="250" rx="150" ry="80" className="loco-body" />
            {/* Smoke stack */}
            <rect x="120" y="140" width="40" height="110" rx="5" className="loco-body" />
            <ellipse cx="140" cy="140" rx="25" ry="15" className="loco-body" />
            {/* Cab */}
            <rect x="350" y="180" width="100" height="120" rx="5" className="loco-body" />
            {/* Wheels */}
            <g style={{ transform: `rotate(${wheelRotation}deg)`, transformOrigin: '180px 320px' }}>
              <circle cx="180" cy="320" r="50" className="loco-body" />
              <line x1="180" y1="270" x2="180" y2="370" className="loco-body" />
              <line x1="130" y1="320" x2="230" y2="320" className="loco-body" />
            </g>
            <g style={{ transform: `rotate(${wheelRotation}deg)`, transformOrigin: '320px 320px' }}>
              <circle cx="320" cy="320" r="50" className="loco-body" />
              <line x1="320" y1="270" x2="320" y2="370" className="loco-body" />
              <line x1="270" y1="320" x2="370" y2="320" className="loco-body" />
            </g>
            <g style={{ transform: `rotate(${wheelRotation}deg)`, transformOrigin: '450px 320px' }}>
              <circle cx="450" cy="320" r="35" className="loco-body" />
              <line x1="450" y1="285" x2="450" y2="355" className="loco-body" />
              <line x1="415" y1="320" x2="485" y2="320" className="loco-body" />
            </g>
          </svg>
        </div>

        <div className="hero-content">
          <div className="hero-era">Since 1804</div>
          <h1 className="hero-title">The Train</h1>
          <p className="hero-subtitle">Iron Horse of Industry</p>
          <p className="hero-description">
            The machine that shrank continents, built nations, and transformed 
            human civilization. From Richard Trevithick&apos;s first steam locomotive 
            to today&apos;s 375 mph maglev trains — this is the story of the rails.
          </p>
        </div>

        <div className="hero-scroll">
          <span>All aboard</span>
          <div className="scroll-wheel-icon"></div>
        </div>
      </section>

      {/* ==================== SECTION 1: The First Steam ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[0] = el; }}
      >
        <div className="section-layout">
          <div className="section-visual">
            <svg viewBox="0 0 400 300" className="train-svg">
              {/* Trevithick's Locomotive - Simple early design */}
              <g className={`fade-in ${visibleSections.has(0) ? 'visible' : ''}`}>
                {/* Boiler - horizontal cylinder */}
                <ellipse cx="200" cy="180" rx="120" ry="50" className="boiler" />
                <ellipse cx="80" cy="180" rx="20" ry="50" fill="#4a4a50" stroke="#2a2a2e" strokeWidth="2" />
                <ellipse cx="320" cy="180" rx="20" ry="50" fill="#4a4a50" stroke="#2a2a2e" strokeWidth="2" />
                
                {/* Chimney */}
                <rect x="100" y="100" width="30" height="80" className="smoke-stack" />
                <ellipse cx="115" cy="100" rx="20" ry="10" fill="#2a2a2e" />
                
                {/* Steam coming out */}
                <ellipse cx="115" cy="70" rx="25" ry="15" fill="#e8e8e8" opacity="0.6" />
                <ellipse cx="105" cy="50" rx="20" ry="12" fill="#e8e8e8" opacity="0.4" />
                
                {/* Wheels - large driving wheels */}
                <g style={{ transform: `rotate(${wheelRotation * 0.3}deg)`, transformOrigin: '140px 250px' }}>
                  <circle cx="140" cy="250" r="40" className="wheel-outer" />
                  <circle cx="140" cy="250" r="30" fill="none" stroke="#6a6a70" strokeWidth="2" />
                  <circle cx="140" cy="250" r="8" className="wheel-hub" />
                  <line x1="140" y1="210" x2="140" y2="290" className="wheel-spoke" />
                  <line x1="100" y1="250" x2="180" y2="250" className="wheel-spoke" />
                </g>
                <g style={{ transform: `rotate(${wheelRotation * 0.3}deg)`, transformOrigin: '260px 250px' }}>
                  <circle cx="260" cy="250" r="40" className="wheel-outer" />
                  <circle cx="260" cy="250" r="30" fill="none" stroke="#6a6a70" strokeWidth="2" />
                  <circle cx="260" cy="250" r="8" className="wheel-hub" />
                  <line x1="260" y1="210" x2="260" y2="290" className="wheel-spoke" />
                  <line x1="220" y1="250" x2="300" y2="250" className="wheel-spoke" />
                </g>
                
                {/* Frame */}
                <rect x="90" y="220" width="220" height="15" fill="#4a4a50" stroke="#2a2a2e" strokeWidth="1" />
              </g>
              
              {/* Label */}
              <text x="200" y="295" textAnchor="middle" fontFamily="Caveat" fontSize="14" fill="#4a4a50">
                Trevithick&apos;s Locomotive, 1804
              </text>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-year">1804</div>
            <div className="section-badge">The Birth of Rail</div>
            <h3 className="section-title">The First Steam Locomotive</h3>
            <p className="section-text">
              On February 21, 1804, Richard Trevithick&apos;s unnamed locomotive hauled 
              10 tons of iron and 70 men along 9 miles of track in Wales. It was the 
              first time a steam-powered vehicle had successfully run on rails.
            </p>
            <p className="section-text">
              The journey took about 2 hours at an average speed of 5 mph. The 
              locomotive broke several of the brittle cast-iron rails, but it proved 
              something revolutionary: steam power could move heavy loads on rails.
            </p>
            <div className="section-highlight">
              &ldquo;I have been at work on a carriage to run on a tramroad... 
              it will be a great advantage to the country.&rdquo; — Richard Trevithick
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 2: Stephenson's Rocket ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[1] = el; }}
      >
        <div className="section-layout reverse">
          <div className="section-visual">
            <svg viewBox="0 0 400 320" className="train-svg">
              {/* Stephenson's Rocket */}
              <g className={`fade-in ${visibleSections.has(1) ? 'visible' : ''}`}>
                {/* Boiler - tubular design */}
                <ellipse cx="180" cy="180" rx="100" ry="55" className="boiler" />
                
                {/* Distinctive angled chimney */}
                <path d="M100 130 L85 60 L115 60 L100 130" className="smoke-stack" />
                <ellipse cx="100" cy="60" rx="18" ry="8" fill="#2a2a2e" />
                
                {/* Steam */}
                <ellipse cx="100" cy="35" rx="20" ry="12" fill="#e8e8e8" opacity="0.5" />
                <ellipse cx="90" cy="18" rx="15" ry="10" fill="#e8e8e8" opacity="0.3" />
                
                {/* Firebox at back */}
                <rect x="260" y="140" width="50" height="80" rx="3" className="cab" />
                
                {/* Famous large driving wheels */}
                <g style={{ transform: `rotate(${wheelRotation * 0.4}deg)`, transformOrigin: '140px 260px' }}>
                  <circle cx="140" cy="260" r="55" className="wheel-outer" />
                  <circle cx="140" cy="260" r="45" fill="none" stroke="#6a6a70" strokeWidth="2" />
                  <circle cx="140" cy="260" r="10" className="wheel-hub" />
                  <line x1="140" y1="205" x2="140" y2="315" className="wheel-spoke" />
                  <line x1="85" y1="260" x2="195" y2="260" className="wheel-spoke" />
                  <line x1="101" y1="221" x2="179" y2="299" className="wheel-spoke" />
                  <line x1="179" y1="221" x2="101" y2="299" className="wheel-spoke" />
                </g>
                
                {/* Smaller front wheel */}
                <g style={{ transform: `rotate(${wheelRotation * 0.4}deg)`, transformOrigin: '280px 270px' }}>
                  <circle cx="280" cy="270" r="35" className="wheel-outer" />
                  <circle cx="280" cy="270" r="8" className="wheel-hub" />
                  <line x1="280" y1="235" x2="280" y2="305" className="wheel-spoke" />
                  <line x1="245" y1="270" x2="315" y2="270" className="wheel-spoke" />
                </g>
                
                {/* Connecting rod */}
                <line x1="140" y1="260" x2="280" y2="270" stroke="#4a4a50" strokeWidth="4" />
                
                {/* Water barrel tender */}
                <rect x="320" y="200" width="60" height="70" rx="5" fill="#8b6914" stroke="#5a4510" strokeWidth="2" />
                <ellipse cx="350" cy="200" rx="25" ry="10" fill="#5a4510" />
              </g>
              
              <text x="200" y="315" textAnchor="middle" fontFamily="Caveat" fontSize="14" fill="#4a4a50">
                Stephenson&apos;s Rocket, 1829
              </text>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-year">1829</div>
            <div className="section-badge">The Rainhill Trials</div>
            <h3 className="section-title">The Rocket: Speed Meets Reliability</h3>
            <p className="section-text">
              George Stephenson&apos;s &ldquo;Rocket&rdquo; won the Rainhill Trials in October 1829, 
              reaching an astonishing 30 mph — faster than any human had ever traveled 
              by land. It became the template for all steam locomotives to follow.
            </p>
            <p className="section-text">
              The following year, the Liverpool and Manchester Railway opened as the 
              world&apos;s first intercity passenger railroad. A new era had begun — one that 
              would reshape cities, economies, and the very concept of time itself.
            </p>
            <div className="section-highlight">
              The Rocket&apos;s multi-tube boiler design increased heating surface area by 
              10x, generating more steam and more power than any previous design.
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SPEED EVOLUTION ==================== */}
      <section className="speed-section">
        <div className="speed-inner">
          <h3 className="speed-title">The Race for Speed</h3>
          <p className="speed-subtitle">From 30 mph to 375 mph in less than 200 years</p>
          
          <div className="speed-timeline">
            {speedData.map((item, idx) => (
              <div key={item.year} className="speed-bar">
                <div className="speed-value">{item.speed}</div>
                <div 
                  className="speed-fill"
                  style={{ 
                    height: speedVisible ? `${(item.speed / maxSpeed) * 200}px` : '0px',
                    transitionDelay: `${idx * 0.15}s`
                  }}
                />
                <div className="speed-year">{item.year}</div>
                <div className="speed-type">{item.type}<br/>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 3: Transcontinental ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[2] = el; }}
      >
        <div className="section-layout">
          <div className="section-visual">
            <svg viewBox="0 0 400 300" className="train-svg">
              {/* Golden Spike Scene */}
              <g className={`fade-in ${visibleSections.has(2) ? 'visible' : ''}`}>
                {/* Two locomotives facing each other */}
                {/* Central Pacific - left */}
                <rect x="40" y="180" width="100" height="50" rx="5" className="boiler" />
                <rect x="50" y="150" width="20" height="30" className="smoke-stack" />
                <circle cx="70" cy="245" r="25" className="wheel-outer" />
                <circle cx="110" cy="245" r="25" className="wheel-outer" />
                <circle cx="70" cy="245" r="5" className="wheel-hub" />
                <circle cx="110" cy="245" r="5" className="wheel-hub" />
                
                {/* Union Pacific - right */}
                <rect x="260" y="180" width="100" height="50" rx="5" className="boiler" />
                <rect x="330" y="150" width="20" height="30" className="smoke-stack" />
                <circle cx="290" cy="245" r="25" className="wheel-outer" />
                <circle cx="330" cy="245" r="25" className="wheel-outer" />
                <circle cx="290" cy="245" r="5" className="wheel-hub" />
                <circle cx="330" cy="245" r="5" className="wheel-hub" />
                
                {/* Golden Spike in center */}
                <rect x="195" y="240" width="10" height="30" fill="#b8860b" stroke="#8b6914" strokeWidth="1" />
                <polygon points="200,230 195,240 205,240" fill="#d4a520" />
                
                {/* Rails meeting */}
                <line x1="0" y1="270" x2="195" y2="270" stroke="#a0a0a8" strokeWidth="4" />
                <line x1="205" y1="270" x2="400" y2="270" stroke="#a0a0a8" strokeWidth="4" />
                
                {/* Celebration rays */}
                <line x1="200" y1="200" x2="200" y2="100" stroke="#b8860b" strokeWidth="2" strokeDasharray="5 3" />
                <line x1="200" y1="200" x2="150" y2="120" stroke="#b8860b" strokeWidth="2" strokeDasharray="5 3" />
                <line x1="200" y1="200" x2="250" y2="120" stroke="#b8860b" strokeWidth="2" strokeDasharray="5 3" />
              </g>
              
              <text x="200" y="295" textAnchor="middle" fontFamily="Caveat" fontSize="14" fill="#4a4a50">
                The Golden Spike, Promontory Summit, 1869
              </text>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-year">1869</div>
            <div className="section-badge">Coast to Coast</div>
            <h3 className="section-title">The Transcontinental Railroad</h3>
            <p className="section-text">
              On May 10, 1869, at Promontory Summit, Utah, the Central Pacific and 
              Union Pacific railroads met. Leland Stanford drove the ceremonial 
              Golden Spike, completing a 1,912-mile link from Omaha to Sacramento.
            </p>
            <p className="section-text">
              What once took 6 months by wagon could now be done in 6 days. The 
              American continent had effectively shrunk. Within 20 years, four more 
              transcontinental lines would follow.
            </p>
            <div className="section-highlight">
              Over 20,000 workers — many of them Chinese and Irish immigrants — 
              built the railroad through deserts and over the Sierra Nevada.
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TUNNEL SECTION ==================== */}
      <section className="tunnel-section">
        <div className="tunnel-arch">
          <svg viewBox="0 0 400 500">
            {/* Stone arch */}
            <path 
              d="M50 500 L50 200 Q50 50 200 50 Q350 50 350 200 L350 500" 
              className="tunnel-stone"
            />
            {/* Inner darkness */}
            <path 
              d="M80 500 L80 210 Q80 80 200 80 Q320 80 320 210 L320 500" 
              className="tunnel-darkness"
            />
            {/* Stone texture lines */}
            <line x1="50" y1="150" x2="80" y2="150" stroke="#2a2a2e" strokeWidth="1" />
            <line x1="320" y1="150" x2="350" y2="150" stroke="#2a2a2e" strokeWidth="1" />
            <line x1="50" y1="250" x2="80" y2="250" stroke="#2a2a2e" strokeWidth="1" />
            <line x1="320" y1="250" x2="350" y2="250" stroke="#2a2a2e" strokeWidth="1" />
            <line x1="50" y1="350" x2="80" y2="350" stroke="#2a2a2e" strokeWidth="1" />
            <line x1="320" y1="350" x2="350" y2="350" stroke="#2a2a2e" strokeWidth="1" />
            {/* Rails going into tunnel */}
            <line x1="120" y1="500" x2="150" y2="300" stroke="#a0a0a8" strokeWidth="3" />
            <line x1="280" y1="500" x2="250" y2="300" stroke="#a0a0a8" strokeWidth="3" />
          </svg>
        </div>
        <div className="tunnel-text">
          <h3>Into the Unknown</h3>
          <p>Tunnels conquered mountains that once seemed impassable</p>
        </div>
      </section>

      {/* ==================== SECTION 4: Modern Era ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[3] = el; }}
      >
        <div className="section-layout reverse">
          <div className="section-visual">
            <svg viewBox="0 0 400 280" className="train-svg">
              {/* Modern Bullet Train / Shinkansen */}
              <g className={`fade-in ${visibleSections.has(3) ? 'visible' : ''}`}>
                {/* Aerodynamic nose */}
                <path 
                  d="M30 160 Q80 140 150 150 L150 190 Q80 200 30 180 Z" 
                  fill="#e8e8e8" 
                  stroke="#4a4a50" 
                  strokeWidth="2"
                />
                {/* Main body */}
                <rect x="150" y="145" width="220" height="50" rx="5" fill="#e8e8e8" stroke="#4a4a50" strokeWidth="2" />
                {/* Windows */}
                <rect x="160" y="155" width="25" height="20" rx="3" fill="#8eb4d0" stroke="#4a4a50" />
                <rect x="195" y="155" width="25" height="20" rx="3" fill="#8eb4d0" stroke="#4a4a50" />
                <rect x="230" y="155" width="25" height="20" rx="3" fill="#8eb4d0" stroke="#4a4a50" />
                <rect x="265" y="155" width="25" height="20" rx="3" fill="#8eb4d0" stroke="#4a4a50" />
                <rect x="300" y="155" width="25" height="20" rx="3" fill="#8eb4d0" stroke="#4a4a50" />
                <rect x="335" y="155" width="25" height="20" rx="3" fill="#8eb4d0" stroke="#4a4a50" />
                
                {/* Blue stripe */}
                <line x1="30" y1="170" x2="370" y2="170" stroke="#1e90ff" strokeWidth="4" />
                
                {/* Wheels/bogies (hidden under sleek body) */}
                <rect x="100" y="195" width="50" height="15" rx="3" fill="#4a4a50" />
                <rect x="280" y="195" width="50" height="15" rx="3" fill="#4a4a50" />
                
                {/* Speed lines */}
                <line x1="5" y1="155" x2="25" y2="155" stroke="#c0c0c4" strokeWidth="2" opacity="0.5" />
                <line x1="0" y1="170" x2="25" y2="170" stroke="#c0c0c4" strokeWidth="2" opacity="0.5" />
                <line x1="5" y1="185" x2="25" y2="185" stroke="#c0c0c4" strokeWidth="2" opacity="0.5" />
              </g>
              
              <text x="200" y="250" textAnchor="middle" fontFamily="Caveat" fontSize="14" fill="#4a4a50">
                Shinkansen Bullet Train, 1964-present
              </text>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-year">1964</div>
            <div className="section-badge">The High-Speed Revolution</div>
            <h3 className="section-title">Bullet Trains: A New Era</h3>
            <p className="section-text">
              Japan&apos;s Shinkansen (&ldquo;new trunk line&rdquo;) debuted for the Tokyo Olympics, 
              covering 320 miles between Tokyo and Osaka in just 4 hours at speeds 
              up to 130 mph. It was the world&apos;s first high-speed rail system.
            </p>
            <p className="section-text">
              In 60 years of operation, the Shinkansen has carried over 10 billion 
              passengers with zero fatalities from derailments or collisions. Its 
              average delay? 54 seconds per year.
            </p>
            <div className="section-highlight">
              Today, Japan&apos;s L0 Series maglev holds the world speed record at 
              375 mph — that&apos;s Tokyo to Osaka in under an hour.
            </div>
          </div>
        </div>
      </section>

      {/* ==================== QUOTE ==================== */}
      <section className="quote-section">
        <div className="quote-inner">
          <p className="quote-text">
            &ldquo;The railroad was the first technology to master space and time. 
            It conquered geography and annihilated distance. The iron horse 
            made the world small.&rdquo;
          </p>
          <p className="quote-author">— Wolfgang Schivelbusch, The Railway Journey</p>
        </div>
      </section>

      {/* ==================== SECTION 5: Global Impact ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[4] = el; }}
      >
        <div className="section-layout">
          <div className="section-visual">
            <svg viewBox="0 0 400 300" className="train-svg">
              {/* Global statistics visualization */}
              <g className={`fade-in ${visibleSections.has(4) ? 'visible' : ''}`}>
                {/* World outline (simplified) */}
                <ellipse cx="200" cy="130" rx="150" ry="100" fill="none" stroke="#c0c0c4" strokeWidth="2" strokeDasharray="5 3" />
                
                {/* Railroad tracks crossing globe */}
                <path d="M50 130 Q200 80 350 130" fill="none" stroke="#b8860b" strokeWidth="3" />
                <path d="M80 180 Q200 230 320 180" fill="none" stroke="#b8860b" strokeWidth="3" />
                <path d="M200 40 L200 220" stroke="#b8860b" strokeWidth="3" />
                
                {/* Stats */}
                <text x="200" y="260" textAnchor="middle" fontFamily="Oswald" fontSize="28" fontWeight="600" fill="#4a4a50">
                  1.3 MILLION KM
                </text>
                <text x="200" y="285" textAnchor="middle" fontFamily="Caveat" fontSize="16" fill="#6a6a70">
                  of track worldwide
                </text>
              </g>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-year">Today</div>
            <div className="section-badge">Global Network</div>
            <h3 className="section-title">The World on Rails</h3>
            <p className="section-text">
              Today, over 1.3 million kilometers of railroad track circle the globe — 
              enough to wrap around Earth 32 times. Trains carry 8% of global freight 
              and transport billions of passengers annually.
            </p>
            <p className="section-text">
              From India&apos;s 68,000 km network to Europe&apos;s integrated high-speed system, 
              rail remains one of the most energy-efficient ways to move people and goods. 
              One freight train can replace 300 trucks.
            </p>
            <div className="section-highlight">
              China alone has built 40,000+ km of high-speed rail since 2008 — 
              more than the rest of the world combined.
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SOURCES ==================== */}
      <section className="sources-section">
        <div className="sources-inner">
          <h3 className="sources-title">Sources & Further Reading</h3>
          <div className="sources-grid">
            <a href="https://www.britannica.com/technology/railroad" target="_blank" rel="noopener noreferrer">
              Encyclopædia Britannica: Railroad History & Development
            </a>
            <a href="https://www.loc.gov/collections/railroad-maps-1828-to-1900/" target="_blank" rel="noopener noreferrer">
              Library of Congress: Railroad Maps, 1828-1900
            </a>
            <a href="https://www.nps.gov/gosp/learn/historyculture/the-golden-spike-ceremony.htm" target="_blank" rel="noopener noreferrer">
              National Park Service: The Golden Spike Ceremony
            </a>
            <a href="https://www.sciencemuseum.org.uk/objects-and-stories/making-modern-world/stephensons-rocket" target="_blank" rel="noopener noreferrer">
              Science Museum: Stephenson&apos;s Rocket
            </a>
            <a href="https://www.railway-technical.com/history.html" target="_blank" rel="noopener noreferrer">
              Railway Technical: History of Railways
            </a>
            <a href="https://global.jr-central.co.jp/en/company/ir/annualreport/" target="_blank" rel="noopener noreferrer">
              JR Central: Shinkansen Technical Data
            </a>
            <a href="https://uic.org/statistics" target="_blank" rel="noopener noreferrer">
              International Union of Railways: Global Statistics
            </a>
            <a href="https://www.smithsonianmag.com/history/the-transcontinental-railroad-156346012/" target="_blank" rel="noopener noreferrer">
              Smithsonian: The Transcontinental Railroad
            </a>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="story-footer">
        <div className="footer-content">
          <div className="footer-track">
            <svg viewBox="0 0 200 40">
              {/* Rails */}
              <line x1="0" y1="10" x2="200" y2="10" stroke="#a0a0a8" strokeWidth="3" />
              <line x1="0" y1="30" x2="200" y2="30" stroke="#a0a0a8" strokeWidth="3" />
              {/* Ties */}
              {Array.from({ length: 10 }).map((_, i) => (
                <rect key={i} x={i * 20 + 5} y="5" width="6" height="30" fill="#8b6914" />
              ))}
            </svg>
          </div>
          <p className="footer-text">
            From steam to maglev, the train remains humanity&apos;s most elegant 
            solution to moving across vast distances — the iron horse that never stopped running.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TrainClient;

