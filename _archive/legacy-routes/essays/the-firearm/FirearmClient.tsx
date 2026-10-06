"use client";

import React, { useState, useEffect, useRef } from 'react';
import './the-firearm.css';

/*
 * THE FIREARM - Precision & Power
 * 
 * Design Research Report:
 * 
 * Visual Archaeology:
 * - Military technical manuals
 * - Patent drawings (Colt, Browning)
 * - Shooting range aesthetics
 * - Industrial steel manufacturing
 * 
 * UNIQUE MECHANICS (Anti-Pattern Applied):
 * ✅ Revolver cylinder that ROTATES with scroll
 * ✅ Ammunition counter (bullets fired progress)
 * ✅ Muzzle flash effects at sections
 * ✅ Target rings for data visualization
 * ✅ Bullet trajectory arc drawing
 * ✅ Gun silhouette evolution strip
 */

const TOTAL_BULLETS = 6;

const FirearmClient: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cylinderRotation, setCylinderRotation] = useState(0);
  const [bulletsFired, setBulletsFired] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const [trajectoryVisible, setTrajectoryVisible] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const lastSectionRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / scrollHeight, 1);
      setScrollProgress(progress);
      
      // Rotate cylinder with scroll (60 degrees per "chamber")
      setCylinderRotation(progress * 360);
      
      // Calculate bullets fired based on scroll
      const newBulletsFired = Math.min(Math.floor(progress * (TOTAL_BULLETS + 1)), TOTAL_BULLETS);
      
      // Trigger muzzle flash when a new bullet is "fired"
      if (newBulletsFired > bulletsFired) {
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 150);
      }
      
      setBulletsFired(newBulletsFired);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [bulletsFired]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleSections((prev) => new Set([...prev, index]));
            
            // Trigger flash for each new section
            if (index > lastSectionRef.current) {
              setShowFlash(true);
              setTimeout(() => setShowFlash(false), 150);
              lastSectionRef.current = index;
            }
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
    const trajectorySection = document.querySelector('.trajectory-section');
    if (!trajectorySection) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTrajectoryVisible(true);
      },
      { threshold: 0.3 }
    );
    
    observer.observe(trajectorySection);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="firearm-story">
      {/* Muzzle Flash Effect */}
      <div className={`muzzle-flash ${showFlash ? 'active' : ''}`} />

      {/* Revolver Cylinder Progress */}
      <div className="cylinder-progress">
        <svg className="cylinder-svg" viewBox="0 0 80 80">
          {/* Cylinder body */}
          <circle cx="40" cy="40" r="35" className="cylinder-body" />
          {/* Chambers (6 chambers, rotating) */}
          <g style={{ transform: `rotate(${cylinderRotation}deg)`, transformOrigin: '40px 40px', transition: 'transform 0.1s ease' }}>
            {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
              const x = 40 + 20 * Math.cos((angle - 90) * Math.PI / 180);
              const y = 40 + 20 * Math.sin((angle - 90) * Math.PI / 180);
              return (
                <circle 
                  key={angle} 
                  cx={x} 
                  cy={y} 
                  r="8" 
                  className={`cylinder-chamber ${idx >= bulletsFired ? 'loaded' : ''}`}
                />
              );
            })}
          </g>
          {/* Center pin */}
          <circle cx="40" cy="40" r="8" className="cylinder-center" />
        </svg>
      </div>

      {/* Ammunition Counter */}
      <div className="ammo-counter">
        <div className="ammo-display">
          <span className="ammo-number">{TOTAL_BULLETS - bulletsFired}</span>
          <span className="ammo-label">rounds left</span>
        </div>
        <div className="ammo-bullets">
          {Array.from({ length: TOTAL_BULLETS }).map((_, idx) => (
            <div 
              key={idx} 
              className={`ammo-bullet ${idx < bulletsFired ? 'fired' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* ==================== HERO ==================== */}
      <section className="hero">
        {/* Crosshair Background */}
        <svg className="crosshair-bg" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="150" className="crosshair-ring" />
          <circle cx="200" cy="200" r="100" className="crosshair-ring" />
          <circle cx="200" cy="200" r="50" className="crosshair-ring" />
          <line x1="200" y1="0" x2="200" y2="400" className="crosshair-line" />
          <line x1="0" y1="200" x2="400" y2="200" className="crosshair-line" />
        </svg>

        <div className="hero-content">
          <div className="hero-era">Since the 13th Century</div>
          <h1 className="hero-title">
            THE <span className="accent">FIRE</span>ARM
          </h1>
          <p className="hero-subtitle">From Fire Lance to Modern Precision</p>
          <p className="hero-description">
            The weapon that ended knights, built empires, and shaped the modern world. 
            From Chinese bamboo tubes to the rifles of today — 800 years of controlled explosions.
          </p>
        </div>

        <div className="hero-scroll">
          <span>Pull the trigger</span>
          <div className="trigger-icon">
            <svg viewBox="0 0 100 60" className="revolver-icon">
              {/* Barrel */}
              <rect x="45" y="18" width="50" height="10" rx="2" className="gun-metal" />
              <rect x="90" y="20" width="8" height="6" rx="1" className="gun-dark" />
              {/* Frame */}
              <path 
                d="M45 18 L45 38 L25 38 L20 45 L15 45 L15 35 L25 28 L45 18" 
                className="gun-metal"
              />
              {/* Cylinder */}
              <ellipse cx="38" cy="28" rx="14" ry="12" className="gun-metal" />
              <circle cx="38" cy="28" r="8" className="gun-dark" />
              {/* Chamber holes */}
              <circle cx="38" cy="20" r="2.5" className="brass-chamber" />
              <circle cx="45" cy="25" r="2.5" className="brass-chamber" />
              <circle cx="45" cy="31" r="2.5" className="brass-chamber" />
              <circle cx="38" cy="36" r="2.5" className="brass-chamber" />
              <circle cx="31" cy="31" r="2.5" className="brass-chamber" />
              <circle cx="31" cy="25" r="2.5" className="brass-chamber" />
              {/* Grip */}
              <path 
                d="M15 35 L8 52 L14 54 L22 42 L25 38" 
                className="gun-wood"
              />
              {/* Trigger */}
              <path 
                d="M22 40 L20 48 L18 47 L20 39" 
                className="trigger-pull"
              />
              {/* Trigger guard */}
              <path 
                d="M25 38 Q15 42 18 50 Q20 52 22 50 Q26 44 25 38" 
                fill="none"
                stroke="#5a5a5a"
                strokeWidth="1.5"
              />
              {/* Hammer */}
              <path d="M25 20 L28 12 L32 14 L29 22" className="gun-metal" />
            </svg>
          </div>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* ==================== SECTION 1: Fire Lance ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[0] = el; }}
      >
        <div className="section-layout">
          <div className="section-visual">
            <svg viewBox="0 0 400 280" className="gun-svg">
              {/* Fire Lance - bamboo tube with spear tip */}
              <g className={`fade-up ${visibleSections.has(0) ? 'visible' : ''}`}>
                {/* Bamboo tube */}
                <rect x="80" y="120" width="200" height="35" rx="5" className="gun-stock" />
                <line x1="120" y1="120" x2="120" y2="155" stroke="#8b5a2b" strokeWidth="2" />
                <line x1="160" y1="120" x2="160" y2="155" stroke="#8b5a2b" strokeWidth="2" />
                <line x1="200" y1="120" x2="200" y2="155" stroke="#8b5a2b" strokeWidth="2" />
                <line x1="240" y1="120" x2="240" y2="155" stroke="#8b5a2b" strokeWidth="2" />
                
                {/* Spear tip */}
                <path d="M280 120 L320 137.5 L280 155" fill="#5a5a5a" stroke="#a0a0a0" strokeWidth="1.5" />
                
                {/* Fire blast */}
                <ellipse cx="340" cy="137.5" rx="35" ry="25" fill="#ff5722" opacity="0.7" />
                <ellipse cx="360" cy="137.5" rx="25" ry="18" fill="#ffab00" opacity="0.6" />
                <ellipse cx="375" cy="137.5" rx="15" ry="12" fill="#e8e8e8" opacity="0.5" />
                
                {/* Sparks */}
                <circle cx="350" cy="115" r="3" fill="#ff5722" />
                <circle cx="365" cy="125" r="2" fill="#ffab00" />
                <circle cx="355" cy="160" r="3" fill="#ff5722" />
                <circle cx="370" cy="150" r="2" fill="#ffab00" />
                
                {/* Handle */}
                <rect x="40" y="125" width="45" height="25" rx="3" fill="#5d3a1a" stroke="#8b5a2b" strokeWidth="1" />
                
                <text x="200" y="220" fontFamily="Caveat" fontSize="14" fill="#a0a0a0" textAnchor="middle">
                  Fire Lance (Huǒ Qiāng), c. 1132 CE
                </text>
              </g>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-era">The Proto-Gun</div>
            <div className="section-year">1132</div>
            <h3 className="section-title">THE FIRE LANCE: WORLD&apos;S FIRST GUN</h3>
            <p className="section-text">
              Song Dynasty soldiers strapped bamboo tubes filled with gunpowder to their spears. 
              When ignited, they shot flames, shrapnel, and poisonous smoke at enemies. It was 
              terrifying — and it worked.
            </p>
            <p className="section-text">
              By the late 1200s, Chinese engineers replaced bamboo with bronze and iron. 
              The Heilongjiang hand cannon (1288) is the oldest surviving firearm — proof 
              that the jump from fire lance to true gun happened quickly.
            </p>
            <div className="section-highlight">
              Historical accounts describe fire lances spitting flames for up to five minutes, burning everything before them.
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 2: European Handgonnes ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[1] = el; }}
      >
        <div className="section-layout reverse">
          <div className="section-visual">
            <svg viewBox="0 0 400 280" className="gun-svg">
              {/* Medieval Handgonne */}
              <g className={`fade-up ${visibleSections.has(1) ? 'visible' : ''}`}>
                {/* Iron barrel */}
                <rect x="120" y="125" width="180" height="30" rx="3" className="gun-barrel" />
                <ellipse cx="300" cy="140" rx="8" ry="15" fill="#3d3d3d" stroke="#a0a0a0" strokeWidth="1" />
                
                {/* Touch hole */}
                <circle cx="260" cy="125" r="4" fill="#0a0a0a" stroke="#5a5a5a" />
                
                {/* Match/fuse burning */}
                <line x1="260" y1="110" x2="260" y2="125" stroke="#ff5722" strokeWidth="3" />
                <circle cx="260" cy="105" r="5" fill="#ffab00" />
                
                {/* Wooden tiller */}
                <path 
                  d="M120 125 L120 155 L40 200 L30 195 L30 160 L120 125" 
                  className="gun-stock"
                />
                
                {/* Metal bands */}
                <rect x="140" y="123" width="10" height="34" rx="1" fill="#5a5a5a" stroke="#a0a0a0" />
                <rect x="200" y="123" width="10" height="34" rx="1" fill="#5a5a5a" stroke="#a0a0a0" />
                
                {/* Smoke puff from barrel */}
                <ellipse cx="320" cy="140" rx="20" ry="15" fill="#a0a0a0" opacity="0.4" />
                <ellipse cx="340" cy="135" rx="15" ry="12" fill="#a0a0a0" opacity="0.3" />
                
                <text x="200" y="250" fontFamily="Caveat" fontSize="14" fill="#a0a0a0" textAnchor="middle">
                  European Handgonne, c. 1364 CE
                </text>
              </g>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-era">Europe Adopts the Gun</div>
            <div className="section-year">1364</div>
            <h3 className="section-title">THE HANDGONNE: THUNDER STICKS</h3>
            <p className="section-text">
              European blacksmiths forged iron tubes mounted on wooden tillers. To fire, 
              soldiers had to hold the &ldquo;thunder stick&rdquo; with one hand while applying 
              a burning match to the touch hole with the other. Accuracy was terrible. 
              The psychological impact was immense.
            </p>
            <p className="section-text">
              At Crécy (1346), English cannons roared. By 1400, handgonnes were common 
              across Europe. The armored knight&apos;s days were numbered — a peasant with 
              a gun could kill a lord in plate armor.
            </p>
            <div className="section-highlight">
              Early guns were so inaccurate they were aimed at formations, not individuals.
            </div>
          </div>
        </div>
      </section>

      {/* ==================== BULLET TRAJECTORY ==================== */}
      <section className="trajectory-section">
        <div className="trajectory-inner">
          <svg className="trajectory-svg" viewBox="0 0 1000 300">
            {/* Gun silhouette on left */}
            <rect x="20" y="140" width="80" height="25" rx="3" fill="#3d3d3d" />
            <rect x="100" y="145" width="40" height="15" rx="2" fill="#2a2a2a" />
            
            {/* Trajectory arc */}
            <path 
              d="M140 152 Q400 50 950 152" 
              className={`trajectory-path ${trajectoryVisible ? 'visible' : ''}`}
            />
            
            {/* Target on right */}
            <circle cx="950" cy="150" r="40" fill="none" stroke="#5a5a5a" strokeWidth="2" />
            <circle cx="950" cy="150" r="25" fill="none" stroke="#a0a0a0" strokeWidth="2" />
            <circle cx="950" cy="150" r="10" fill="#c41e3a" />
            
            {/* Distance markers */}
            <g className="trajectory-labels">
              <text x="140" y="200">0m</text>
              <text x="350" y="100">Apex</text>
              <text x="550" y="120">500m</text>
              <text x="950" y="220" textAnchor="middle">1000m</text>
            </g>
          </svg>
        </div>
      </section>

      {/* ==================== SECTION 3: The Revolver ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[2] = el; }}
      >
        <div className="section-layout">
          <div className="section-visual">
            <svg viewBox="0 0 400 280" className="gun-svg">
              {/* Colt Revolver */}
              <g className={`fade-up ${visibleSections.has(2) ? 'visible' : ''}`}>
                {/* Barrel */}
                <rect x="180" y="120" width="150" height="25" rx="3" className="gun-barrel" />
                <ellipse cx="330" cy="132.5" rx="5" ry="12.5" fill="#2a2a2a" />
                
                {/* Frame */}
                <path 
                  d="M180 120 L180 160 L120 160 L100 185 L90 185 L90 160 L120 130 L180 120" 
                  className="gun-body"
                />
                
                {/* Cylinder */}
                <ellipse cx="160" cy="140" rx="35" ry="30" className="gun-body" />
                <circle cx="160" cy="140" r="20" fill="#2a2a2a" stroke="#5a5a5a" />
                {/* Chamber holes */}
                <circle cx="160" cy="118" r="6" fill="#c4a35a" />
                <circle cx="175" cy="130" r="6" fill="#c4a35a" />
                <circle cx="175" cy="150" r="6" fill="#c4a35a" />
                <circle cx="160" cy="162" r="6" fill="#c4a35a" />
                <circle cx="145" cy="150" r="6" fill="#c4a35a" />
                <circle cx="145" cy="130" r="6" fill="#c4a35a" />
                
                {/* Grip */}
                <path 
                  d="M90 160 L75 210 L85 215 L110 180 L120 160" 
                  className="gun-stock"
                />
                
                {/* Trigger */}
                <path d="M105 170 L100 190 L95 188 L100 168" fill="#c4a35a" stroke="#a08040" />
                
                {/* Hammer */}
                <path d="M120 115 L130 100 L140 105 L130 120" className="gun-body" />
                
                <text x="200" y="250" fontFamily="Caveat" fontSize="14" fill="#a0a0a0" textAnchor="middle">
                  Colt Paterson Revolver, 1836 CE
                </text>
              </g>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-era">The Repeater Revolution</div>
            <div className="section-year">1836</div>
            <h3 className="section-title">SAMUEL COLT&apos;S REVOLVER</h3>
            <p className="section-text">
              &ldquo;God created men. Sam Colt made them equal.&rdquo; — <em>Popular frontier saying, origin disputed</em>. 
              The revolving cylinder meant six shots without reloading — a massive advantage when your opponent 
              had a single-shot weapon.
            </p>
            <p className="section-text">
              Colt&apos;s genius wasn&apos;t just the design — it was manufacturing. 
              Using interchangeable parts and assembly lines, he made guns affordable 
              and reliable. The Colt &ldquo;Peacemaker&rdquo; (1873) became the gun that 
              &ldquo;won the West.&rdquo;
            </p>
            <div className="section-highlight">
              By 1856, Colt&apos;s factory produced 150 guns per day using 1,400 machine operations.
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TARGET DATA VIZ ==================== */}
      <section className="target-section">
        <div className="target-inner">
          <h3 className="target-title">GLOBAL FIREARM STATISTICS</h3>
          <p className="target-subtitle">The scale of an industry</p>
          
          <div className="target-display">
            <svg className="target-svg" viewBox="0 0 250 250">
              <circle cx="125" cy="125" r="100" className="target-ring outer" />
              <circle cx="125" cy="125" r="70" className="target-ring mid" />
              <circle cx="125" cy="125" r="40" className="target-ring inner" />
              <circle cx="125" cy="125" r="15" className="target-ring bullseye" />
              {/* Impact marks */}
              <circle cx="120" cy="60" r="4" fill="#c4a35a" />
              <circle cx="85" cy="110" r="4" fill="#c4a35a" />
              <circle cx="160" cy="90" r="4" fill="#c4a35a" />
              <circle cx="130" cy="125" r="4" fill="#c4a35a" />
            </svg>
            
            <div className="target-stats">
              <div className="target-stat">
                <div className="stat-value">1 BILLION+</div>
                <div className="stat-label">Firearms in circulation worldwide</div>
              </div>
              <div className="target-stat">
                <div className="stat-value">$98 BILLION</div>
                <div className="stat-label">Global firearms market (2023)</div>
              </div>
              <div className="target-stat">
                <div className="stat-value">393 MILLION</div>
                <div className="stat-label">Civilian guns in the United States</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 4: Automatic Weapons ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[3] = el; }}
      >
        <div className="section-layout reverse">
          <div className="section-visual">
            <svg viewBox="0 0 400 280" className="gun-svg">
              {/* AK-47 Style */}
              <g className={`fade-up ${visibleSections.has(3) ? 'visible' : ''}`}>
                {/* Receiver */}
                <rect x="100" y="115" width="180" height="35" rx="3" className="gun-body" />
                
                {/* Barrel */}
                <rect x="280" y="122" width="80" height="18" rx="2" className="gun-barrel" />
                <ellipse cx="360" cy="131" rx="4" ry="9" fill="#2a2a2a" />
                
                {/* Front sight */}
                <rect x="340" y="110" width="5" height="12" fill="#3d3d3d" />
                
                {/* Gas tube */}
                <rect x="180" y="108" width="100" height="8" rx="2" fill="#5a5a5a" />
                
                {/* Magazine */}
                <path 
                  d="M160 150 L150 210 L180 210 L190 150" 
                  fill="#3d3d3d" 
                  stroke="#5a5a5a" 
                  strokeWidth="1"
                />
                
                {/* Stock */}
                <path 
                  d="M100 115 L100 150 L40 170 L30 165 L30 130 L100 115" 
                  className="gun-stock"
                />
                
                {/* Pistol grip */}
                <path 
                  d="M130 150 L120 200 L140 205 L155 155" 
                  className="gun-stock"
                />
                
                {/* Trigger */}
                <path d="M145 160 L140 180 L135 178 L140 158" fill="#3d3d3d" />
                
                {/* Selector switch */}
                <circle cx="115" cy="125" r="5" fill="#5a5a5a" stroke="#a0a0a0" />
                
                <text x="200" y="250" fontFamily="Caveat" fontSize="14" fill="#a0a0a0" textAnchor="middle">
                  AK-47, Designed 1947 CE
                </text>
              </g>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-era">The Automatic Era</div>
            <div className="section-year">1947</div>
            <h3 className="section-title">THE AK-47: MOST PRODUCED GUN IN HISTORY</h3>
            <p className="section-text">
              Mikhail Kalashnikov, a Soviet tank commander, designed a weapon that could 
              survive mud, sand, ice, and abuse. Simple enough for conscripts to maintain, 
              reliable enough to fire 600 rounds per minute.
            </p>
            <p className="section-text">
              Over 100 million AK-47s and variants have been produced. It appears on 
              national flags (Mozambique), in revolutions, and conflicts worldwide. 
              No other firearm has shaped modern warfare so profoundly.
            </p>
            <div className="section-highlight">
              The AK-47 has only 8 moving parts. A soldier can field-strip it in 30 seconds.
            </div>
          </div>
        </div>
      </section>

      {/* ==================== EVOLUTION STRIP ==================== */}
      <section className="evolution-section">
        <div className="evolution-inner">
          <h3 className="evolution-title">800 YEARS OF EVOLUTION</h3>
          <div className="evolution-strip">
            <div className="evolution-item">
              <svg className="evolution-icon" viewBox="0 0 80 50">
                <rect x="10" y="20" width="50" height="10" rx="2" fill="#5d3a1a" />
                <polygon points="60,20 70,25 60,30" fill="#5a5a5a" />
              </svg>
              <div className="evolution-year">1132</div>
              <div className="evolution-name">Fire Lance</div>
            </div>
            <div className="evolution-item">
              <svg className="evolution-icon" viewBox="0 0 80 50">
                <rect x="20" y="18" width="40" height="14" rx="2" fill="#3d3d3d" />
                <path d="M20 18 L10 35 L5 33 L15 18" fill="#5d3a1a" />
              </svg>
              <div className="evolution-year">1364</div>
              <div className="evolution-name">Handgonne</div>
            </div>
            <div className="evolution-item">
              <svg className="evolution-icon" viewBox="0 0 80 50">
                <rect x="25" y="18" width="35" height="12" rx="2" fill="#3d3d3d" />
                <ellipse cx="22" cy="24" rx="12" ry="10" fill="#3d3d3d" />
                <path d="M15 28 L10 45 L20 42" fill="#5d3a1a" />
              </svg>
              <div className="evolution-year">1836</div>
              <div className="evolution-name">Revolver</div>
            </div>
            <div className="evolution-item">
              <svg className="evolution-icon" viewBox="0 0 80 50">
                <rect x="15" y="18" width="50" height="14" rx="2" fill="#3d3d3d" />
                <rect x="30" y="32" width="15" height="15" fill="#3d3d3d" />
                <path d="M15 18 L5 28 L5 20 L15 14" fill="#5d3a1a" />
              </svg>
              <div className="evolution-year">1911</div>
              <div className="evolution-name">Semi-Auto</div>
            </div>
            <div className="evolution-item">
              <svg className="evolution-icon" viewBox="0 0 80 50">
                <rect x="10" y="16" width="55" height="16" rx="2" fill="#3d3d3d" />
                <rect x="25" y="32" width="12" height="18" fill="#3d3d3d" />
                <path d="M10 16 L2 22 L2 18 L10 12" fill="#5d3a1a" />
                <rect x="55" y="10" width="3" height="8" fill="#3d3d3d" />
              </svg>
              <div className="evolution-year">1947</div>
              <div className="evolution-name">Assault Rifle</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== QUOTE ==================== */}
      <section className="quote-section">
        <div className="quote-inner">
          <p className="quote-text">
            The gun became the great equalizer — taking away the advantage of the strong 
            over the weak, the many over the few. For better or worse, it changed 
            the calculus of power forever.
          </p>
          <p className="quote-author">— Editorial synthesis</p>
        </div>
      </section>

      {/* ==================== SOURCES ==================== */}
      <section className="sources-section">
        <div className="sources-inner">
          <h3 className="sources-title">SOURCES & FURTHER READING</h3>
          <div className="sources-grid">
            <a href="https://www.britannica.com/technology/small-arm" target="_blank" rel="noopener noreferrer">
              Encyclopædia Britannica: Small Arms History
            </a>
            <a href="https://www.nramuseum.org/guns/the-galleries.aspx" target="_blank" rel="noopener noreferrer">
              NRA National Firearms Museum: Historical Galleries
            </a>
            <a href="https://americanhistory.si.edu/collections/search?edan_q=firearms" target="_blank" rel="noopener noreferrer">
              Smithsonian: National Museum of American History Firearms Collection
            </a>
            <a href="https://guides.loc.gov/american-firearms" target="_blank" rel="noopener noreferrer">
              Library of Congress: American Firearms Research Guide
            </a>
            <a href="https://smallarmssurvey.org/database/global-firearms-holdings" target="_blank" rel="noopener noreferrer">
              Small Arms Survey: Global Firearms Holdings
            </a>
            <a href="https://www.metmuseum.org/toah/hd/aams/hd_aams.htm" target="_blank" rel="noopener noreferrer">
              Metropolitan Museum: Arms and Armor
            </a>
            <a href="https://daily.jstor.org/guns-in-america-foundations-and-key-concepts/" target="_blank" rel="noopener noreferrer">
              JSTOR Daily: Guns in America — Foundations and Key Concepts
            </a>
            <a href="https://royalarmouries.org/collection?type=Firearm" target="_blank" rel="noopener noreferrer">
              Royal Armouries: Firearms Collection (UK)
            </a>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="story-footer">
        <div className="footer-content">
          <svg className="footer-icon" viewBox="0 0 60 30">
            {/* Bullet casing */}
            <rect x="5" y="8" width="25" height="14" rx="2" fill="#c4a35a" />
            <rect x="30" y="10" width="25" height="10" rx="5" fill="#c41e3a" />
          </svg>
          <p className="footer-text">
            From bamboo tubes to precision rifles — the firearm changed what it means 
            to wage war, defend oneself, and hold power. Its story is humanity&apos;s story.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FirearmClient;

