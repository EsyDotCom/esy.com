"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import "./sammy-snail.css";

// ============================================================================
// SCROLL SECTION HOOK
// ============================================================================

function useScrollSection(threshold = 0.1, initiallyVisible = false) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(initiallyVisible);
  const [hasAnimated, setHasAnimated] = useState(initiallyVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!hasAnimated) {
            setHasAnimated(true);
          }
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, hasAnimated]);

  return { sectionRef, isVisible, hasAnimated };
}

// ============================================================================
// SECTION WRAPPER
// ============================================================================

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  slowMode?: boolean;
  initiallyVisible?: boolean;
}

function Section({ children, className = "", id, slowMode = false, initiallyVisible = false }: SectionProps) {
  const { sectionRef, isVisible, hasAnimated } = useScrollSection(0.1, initiallyVisible);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`sammy-section ${className} ${isVisible ? "visible" : ""} ${hasAnimated ? "animated" : ""} ${slowMode ? "slow-mode" : ""}`}
    >
      {children}
    </section>
  );
}

// ============================================================================
// SVG COMPONENTS
// ============================================================================

// Sammy Snail Character
interface SammyProps {
  expression?: "happy" | "excited" | "surprised" | "tired" | "peaceful";
  isGlowing?: boolean;
  isZooming?: boolean;
  className?: string;
}

function Sammy({ 
  expression = "happy", 
  isGlowing = false, 
  isZooming = false,
  className = "" 
}: SammyProps) {
  return (
    <div className={`sammy-container ${isZooming ? "zooming" : ""} ${className}`}>
      {/* Speed lines when zooming */}
      {isZooming && (
        <div className="speed-lines">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="speed-line" style={{ animationDelay: `${i * 0.05}s` }} />
          ))}
        </div>
      )}
      
      <svg
        viewBox="0 0 120 100"
        className={`sammy-svg ${expression} ${isGlowing ? "glowing" : ""}`}
        aria-label="Sammy the Snail"
      >
        {/* Glow filter for shell */}
        <defs>
          <filter id="shell-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <radialGradient id="shell-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFB347" />
            <stop offset="100%" stopColor="#FF8C42" />
          </radialGradient>
          <radialGradient id="shell-glow-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#FF6B00" />
          </radialGradient>
        </defs>

        {/* Slime trail */}
        <ellipse 
          cx="30" cy="88" rx="25" ry="4" 
          fill="#A8E6CF" 
          opacity="0.5" 
          className="slime-trail"
        />

        {/* Body */}
        <ellipse 
          cx="40" cy="75" rx="35" ry="18" 
          fill="#FFE4B5" 
          className="snail-body"
        />

        {/* Shell */}
        <g className="shell-group" filter={isGlowing ? "url(#shell-glow)" : undefined}>
          <circle 
            cx="70" cy="55" r="30" 
            fill={isGlowing ? "url(#shell-glow-gradient)" : "url(#shell-gradient)"}
            className="shell-base"
          />
          {/* Shell swirl */}
          <path
            d="M 70 55 
               Q 75 45, 70 40 
               Q 62 35, 58 42 
               Q 55 50, 62 55 
               Q 68 60, 70 55"
            fill="none"
            stroke={isGlowing ? "#FFD700" : "#D4A574"}
            strokeWidth="4"
            strokeLinecap="round"
            className="shell-swirl"
          />
          <circle cx="65" cy="48" r="8" fill={isGlowing ? "#FFF8DC" : "#FFD4A3"} opacity="0.6" />
        </g>

        {/* Head */}
        <ellipse cx="20" cy="65" rx="18" ry="15" fill="#FFE4B5" className="snail-head" />

        {/* Eye stalks */}
        <line x1="15" y1="55" x2="10" y2="42" stroke="#FFE4B5" strokeWidth="4" strokeLinecap="round" />
        <line x1="25" y1="55" x2="30" y2="42" stroke="#FFE4B5" strokeWidth="4" strokeLinecap="round" />

        {/* Eyes */}
        <circle cx="10" cy="40" r="6" fill="white" className="eye-white left" />
        <circle cx="30" cy="40" r="6" fill="white" className="eye-white right" />
        
        {/* Pupils - change based on expression */}
        <g className={`pupils ${expression}`}>
          <circle cx="11" cy="40" r="3" fill="#2C3E50" className="pupil left" />
          <circle cx="31" cy="40" r="3" fill="#2C3E50" className="pupil right" />
          {/* Eye sparkles */}
          <circle cx="9" cy="38" r="1" fill="white" className="eye-sparkle" />
          <circle cx="29" cy="38" r="1" fill="white" className="eye-sparkle" />
        </g>

        {/* Mouth - changes with expression */}
        <g className={`mouth ${expression}`}>
          {expression === "happy" && (
            <path d="M 15 72 Q 20 78 25 72" stroke="#D4A574" strokeWidth="2" fill="none" />
          )}
          {expression === "excited" && (
            <ellipse cx="20" cy="73" rx="4" ry="5" fill="#D4A574" />
          )}
          {expression === "surprised" && (
            <circle cx="20" cy="73" r="4" fill="#D4A574" />
          )}
          {expression === "tired" && (
            <path d="M 15 74 Q 20 72 25 74" stroke="#D4A574" strokeWidth="2" fill="none" />
          )}
          {expression === "peaceful" && (
            <path d="M 14 72 Q 20 77 26 72" stroke="#D4A574" strokeWidth="2.5" fill="none" />
          )}
        </g>

        {/* Cheek blush - positioned on sides of face, not like eyes */}
        <ellipse cx="6" cy="65" rx="3" ry="2" fill="#FFB6C1" opacity="0.4" />
        <ellipse cx="34" cy="65" rx="3" ry="2" fill="#FFB6C1" opacity="0.4" />
      </svg>
    </div>
  );
}

// Speed Trail Effect
function SpeedTrail({ active }: { active: boolean }) {
  if (!active) return null;
  
  return (
    <div className="speed-trail">
      {Array.from({ length: 5 }).map((_, i) => (
        <div 
          key={i} 
          className="trail-segment"
          style={{ 
            opacity: 1 - (i * 0.2),
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
}

// Zoom Burst Effect
function ZoomBurst({ active, onComplete }: { active: boolean; onComplete: () => void }) {
  useEffect(() => {
    if (active) {
      const timer = setTimeout(onComplete, 800);
      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <div className="zoom-burst">
      <span className="zoom-text">ZOOM!</span>
      <div className="burst-ring ring-1" />
      <div className="burst-ring ring-2" />
      <div className="burst-ring ring-3" />
      {Array.from({ length: 12 }).map((_, i) => (
        <div 
          key={i} 
          className="sparkle-burst"
          style={{ 
            transform: `rotate(${i * 30}deg) translateY(-60px)`,
            animationDelay: `${i * 0.03}s`
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );
}

// Dew Drop
function DewDrop({ glowing = false, onClick }: { glowing?: boolean; onClick?: () => void }) {
  return (
    <div className={`dew-drop ${glowing ? "glowing" : ""}`} onClick={onClick}>
      <svg viewBox="0 0 40 50" className="dew-drop-svg">
        <defs>
          <radialGradient id="dew-gradient" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor={glowing ? "#E8F8FF" : "#E8F4FF"} />
            <stop offset="50%" stopColor={glowing ? "#88D8FF" : "#B8E4FF"} />
            <stop offset="100%" stopColor={glowing ? "#00BFFF" : "#87CEEB"} />
          </radialGradient>
          <filter id="dew-glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path
          d="M 20 5 Q 35 25, 20 45 Q 5 25, 20 5"
          fill="url(#dew-gradient)"
          filter={glowing ? "url(#dew-glow)" : undefined}
          className="dew-shape"
        />
        <ellipse cx="15" cy="20" rx="4" ry="6" fill="white" opacity="0.6" />
      </svg>
    </div>
  );
}

// Leaf
function Leaf({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 50" className={`leaf-svg ${className}`}>
      <path
        d="M 5 25 Q 40 0, 75 25 Q 40 50, 5 25"
        fill="#7CB342"
        stroke="#558B2F"
        strokeWidth="1"
      />
      <path
        d="M 5 25 Q 40 22, 75 25"
        fill="none"
        stroke="#558B2F"
        strokeWidth="1.5"
      />
      {/* Leaf veins */}
      <path d="M 25 25 Q 30 18, 35 25" fill="none" stroke="#558B2F" strokeWidth="0.5" opacity="0.5" />
      <path d="M 45 25 Q 50 32, 55 25" fill="none" stroke="#558B2F" strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}

// Bunny Character
function Bunny({ className = "", surprised = false }: { className?: string; surprised?: boolean }) {
  return (
    <svg viewBox="0 0 80 100" className={`bunny-svg ${className} ${surprised ? "surprised" : ""}`}>
      {/* Ears */}
      <ellipse cx="30" cy="20" rx="8" ry="25" fill="#E8D4C4" />
      <ellipse cx="50" cy="20" rx="8" ry="25" fill="#E8D4C4" />
      <ellipse cx="30" cy="20" rx="4" ry="18" fill="#FFB6C1" />
      <ellipse cx="50" cy="20" rx="4" ry="18" fill="#FFB6C1" />
      {/* Body */}
      <ellipse cx="40" cy="75" rx="25" ry="20" fill="#E8D4C4" />
      {/* Head */}
      <circle cx="40" cy="50" r="20" fill="#E8D4C4" />
      {/* Eyes */}
      <circle cx="33" cy="48" r="4" fill="white" />
      <circle cx="47" cy="48" r="4" fill="white" />
      <circle cx={surprised ? "33" : "34"} cy="48" r="2" fill="#2C3E50" />
      <circle cx={surprised ? "47" : "48"} cy="48" r="2" fill="#2C3E50" />
      {/* Nose */}
      <ellipse cx="40" cy="55" rx="3" ry="2" fill="#FFB6C1" />
      {/* Mouth */}
      <path d="M 37 58 Q 40 62 43 58" stroke="#D4A574" strokeWidth="1.5" fill="none" />
      {/* Cheeks */}
      <circle cx="28" cy="55" r="3" fill="#FFB6C1" opacity="0.4" />
      <circle cx="52" cy="55" r="3" fill="#FFB6C1" opacity="0.4" />
    </svg>
  );
}

// Bird
function Bird({ className = "", startled = false }: { className?: string; startled?: boolean }) {
  return (
    <svg viewBox="0 0 50 40" className={`bird-svg ${className} ${startled ? "startled" : ""}`}>
      {/* Body */}
      <ellipse cx="25" cy="25" rx="15" ry="12" fill="#5DADE2" />
      {/* Wing */}
      <ellipse cx="30" cy="22" rx="10" ry="6" fill="#3498DB" className="wing" />
      {/* Head */}
      <circle cx="15" cy="20" r="8" fill="#5DADE2" />
      {/* Beak */}
      <polygon points="5,20 12,18 12,22" fill="#F39C12" />
      {/* Eye */}
      <circle cx="13" cy="18" r="3" fill="white" />
      <circle cx="12" cy="18" r="1.5" fill="#2C3E50" />
      {/* Tail */}
      <polygon points="40,25 50,20 50,30" fill="#3498DB" />
    </svg>
  );
}

// Tree for loop scene
function BigTree() {
  return (
    <svg viewBox="0 0 200 300" className="big-tree-svg">
      {/* Trunk */}
      <rect x="85" y="180" width="30" height="120" fill="#8B4513" rx="5" />
      {/* Trunk texture */}
      <line x1="95" y1="190" x2="95" y2="290" stroke="#6B3510" strokeWidth="2" />
      <line x1="105" y1="200" x2="105" y2="280" stroke="#6B3510" strokeWidth="1.5" />
      {/* Foliage layers */}
      <ellipse cx="100" cy="120" rx="80" ry="60" fill="#228B22" />
      <ellipse cx="70" cy="100" rx="50" ry="40" fill="#2E8B2E" />
      <ellipse cx="130" cy="100" rx="50" ry="40" fill="#2E8B2E" />
      <ellipse cx="100" cy="80" rx="60" ry="45" fill="#32CD32" />
      <ellipse cx="100" cy="60" rx="40" ry="30" fill="#3CB371" />
    </svg>
  );
}

// Mushroom
function Mushroom({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 50" className={`mushroom-svg ${className}`}>
      {/* Stem */}
      <rect x="14" y="30" width="12" height="18" fill="#F5F5DC" rx="3" />
      {/* Cap */}
      <ellipse cx="20" cy="25" rx="18" ry="12" fill="#E74C3C" />
      {/* Spots */}
      <circle cx="12" cy="22" r="3" fill="white" />
      <circle cx="25" cy="20" r="4" fill="white" />
      <circle cx="18" cy="28" r="2" fill="white" />
    </svg>
  );
}

// Flower
function Flower({ className = "", color = "#FF69B4" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 30 40" className={`flower-svg ${className}`}>
      {/* Stem */}
      <line x1="15" y1="20" x2="15" y2="40" stroke="#228B22" strokeWidth="2" />
      {/* Leaf */}
      <ellipse cx="18" cy="32" rx="5" ry="3" fill="#32CD32" transform="rotate(30, 18, 32)" />
      {/* Petals */}
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="15"
          cy="10"
          rx="5"
          ry="8"
          fill={color}
          transform={`rotate(${angle}, 15, 15)`}
        />
      ))}
      {/* Center */}
      <circle cx="15" cy="15" r="4" fill="#FFD700" />
    </svg>
  );
}

// Rainbow Trail
function RainbowTrail({ active }: { active: boolean }) {
  if (!active) return null;
  
  const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#9B59B6"];
  
  return (
    <div className="rainbow-trail">
      {colors.map((color, i) => (
        <div
          key={i}
          className="rainbow-stripe"
          style={{
            backgroundColor: color,
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
}

// Progress Indicator (Snail-themed)
interface ProgressProps {
  progress: number;
}

function SnailProgress({ progress }: ProgressProps) {
  return (
    <div className="snail-progress">
      <div className="progress-track">
        <div className="progress-slime" style={{ width: `${progress}%` }} />
        <div className="progress-snail" style={{ left: `${progress}%` }}>
          🐌
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function SammySnailClient() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [showZoomBurst, setShowZoomBurst] = useState(false);
  const [hasDiscoveredDew, setHasDiscoveredDew] = useState(false);
  const [isSpeedMode, setIsSpeedMode] = useState(false);
  const [loopCount, setLoopCount] = useState(0);
  const totalScenes = 14;

  // Track current scene for progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setCurrentScene(Math.floor((scrollPercent / 100) * totalScenes));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle zoom tap
  const handleZoomTap = useCallback(() => {
    if (isSpeedMode && !showZoomBurst) {
      setShowZoomBurst(true);
      setIsZooming(true);
    }
  }, [isSpeedMode, showZoomBurst]);

  const handleZoomComplete = useCallback(() => {
    setShowZoomBurst(false);
    setIsZooming(false);
  }, []);

  // Handle dew drop tap
  const handleDewTap = useCallback(() => {
    if (!hasDiscoveredDew) {
      setHasDiscoveredDew(true);
      setTimeout(() => setIsSpeedMode(true), 1500);
    }
  }, [hasDiscoveredDew]);

  // Handle loop tap
  const handleLoopTap = useCallback(() => {
    setLoopCount(prev => prev + 1);
  }, []);

  const progress = (currentScene / totalScenes) * 100;

  return (
    <div className="sammy-story">
      {/* Progress Bar */}
      <SnailProgress progress={progress} />

      {/* Global Zoom Burst (shown on tap) */}
      <ZoomBurst active={showZoomBurst} onComplete={handleZoomComplete} />

      {/* ================================================================== */}
      {/* SCENE 1: OPENING - Slow Sammy */}
      {/* ================================================================== */}
      <Section className="scene-opening full-bleed" id="scene-1" initiallyVisible={true}>
        <div className="scene-content">
          <div className="morning-sky" />
          <div className="forest-bg">
            <Mushroom className="bg-mushroom m1" />
            <Mushroom className="bg-mushroom m2" />
            <Flower className="bg-flower f1" color="#FF69B4" />
            <Flower className="bg-flower f2" color="#DDA0DD" />
            <Flower className="bg-flower f3" color="#FFD700" />
          </div>
          
          <div className="slow-sammy-intro">
            <Sammy expression="happy" className="sammy-slow" />
            <SpeedTrail active={false} />
          </div>

          <div className="story-text intro-text">
            <h1 className="story-title">Sammy Snail&apos;s Super Speed Day</h1>
            <p className="scene-text">This is Sammy Snail.</p>
            <p className="scene-text">He likes going slow.</p>
          </div>

          <div className="scroll-hint">
            <span className="hint-arrow">↓</span>
            <span className="hint-text">Scroll to start!</span>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SCENE 2: Morning Dew Discovery */}
      {/* ================================================================== */}
      <Section className="scene-dew-discovery" id="scene-2">
        <div className="scene-content">
          <div className="leaf-platform">
            <Leaf className="big-leaf" />
            <DewDrop glowing={!hasDiscoveredDew} onClick={handleDewTap} />
          </div>

          <Sammy 
            expression={hasDiscoveredDew ? "surprised" : "happy"} 
            className="sammy-discovering"
          />

          <div className="story-text">
            <p className="scene-text">
              {hasDiscoveredDew 
                ? "Sammy tasted the dew drop!" 
                : "A sparkly dew drop!"}
            </p>
            {!hasDiscoveredDew && (
              <p className="tap-hint">Tap the dew drop!</p>
            )}
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SCENE 3: Magic Moment */}
      {/* ================================================================== */}
      <Section className="scene-magic full-bleed" id="scene-3">
        <div className="scene-content magic-scene">
          <div className="magic-swirls">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="magic-swirl" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>

          <Sammy 
            expression="excited" 
            isGlowing={hasDiscoveredDew}
            className="sammy-transforming"
          />

          <div className="story-text magic-text">
            <p className="scene-text big-text">The dew drop felt...</p>
            <p className="scene-text magic-word">MAGICAL!</p>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SCENE 4: Speed Activation - ZOOM! */}
      {/* ================================================================== */}
      <Section className="scene-zoom full-bleed" id="scene-4">
        <div className="scene-content zoom-scene" onClick={handleZoomTap}>
          <RainbowTrail active={isSpeedMode} />
          
          <Sammy 
            expression="excited" 
            isGlowing={true}
            isZooming={isZooming}
            className="sammy-zooming"
          />

          <div className="zoom-effect-text">
            <span className="zoom-word">ZOOM!</span>
          </div>

          <div className="story-text">
            <p className="scene-text">Sammy went SUPER FAST!</p>
            <p className="tap-hint">Tap to zoom faster! 🚀</p>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SCENE 5: Racing the Bunny */}
      {/* ================================================================== */}
      <Section className="scene-race-bunny" id="scene-5">
        <div className="scene-content race-scene" onClick={handleZoomTap}>
          <div className="race-track">
            <Sammy 
              expression="excited" 
              isGlowing={true}
              isZooming={isZooming}
              className="sammy-racing"
            />
            <Bunny className="bunny-racing" surprised={true} />
          </div>

          <div className="story-text">
            <p className="scene-text">Sammy zoomed past Bunny!</p>
            <p className="scene-text small">&quot;Wow!&quot; said Bunny.</p>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SCENE 6: River Splash */}
      {/* ================================================================== */}
      <Section className="scene-river" id="scene-6">
        <div className="scene-content river-scene" onClick={handleZoomTap}>
          <div className="river">
            <div className="water-surface">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="water-ripple" style={{ animationDelay: `${i * 0.3}s` }} />
              ))}
            </div>
            <div className="splash-effects">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="splash-drop" style={{ animationDelay: `${i * 0.1}s` }}>
                  💧
                </div>
              ))}
            </div>
          </div>

          <Sammy 
            expression="surprised" 
            isGlowing={true}
            className="sammy-splashing"
          />

          <div className="story-text">
            <p className="scene-text">SPLASH! Over the river!</p>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SCENE 7: Loop Around Tree */}
      {/* ================================================================== */}
      <Section className="scene-loop sticky-scroll" id="scene-7">
        <div className="scene-content loop-scene" onClick={handleLoopTap}>
          <BigTree />
          
          <div className={`loop-path loop-${loopCount % 4}`}>
            <Sammy 
              expression="excited" 
              isGlowing={true}
              className="sammy-looping"
            />
          </div>

          <div className="loop-counter">
            Loops: {loopCount} 🔄
          </div>

          <div className="story-text">
            <p className="scene-text">Round and round the tree!</p>
            <p className="tap-hint">Tap to loop again!</p>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SCENE 8: Startling Birds */}
      {/* ================================================================== */}
      <Section className="scene-birds" id="scene-8">
        <div className="scene-content birds-scene" onClick={handleZoomTap}>
          <div className="birds-group">
            <Bird className="bird b1" startled={true} />
            <Bird className="bird b2" startled={true} />
            <Bird className="bird b3" startled={true} />
          </div>

          <Sammy 
            expression="excited" 
            isGlowing={true}
            isZooming={isZooming}
            className="sammy-bird-scene"
          />

          <div className="story-text">
            <p className="scene-text">Whoosh! Birds flew away!</p>
            <p className="scene-text small">&quot;Excuse me!&quot; giggled Sammy.</p>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SCENE 9: Up the Hill */}
      {/* ================================================================== */}
      <Section className="scene-hill" id="scene-9">
        <div className="scene-content hill-scene" onClick={handleZoomTap}>
          <div className="hill">
            <svg viewBox="0 0 400 200" className="hill-svg">
              <path d="M 0 200 Q 200 50, 400 200" fill="#7CB342" />
              <path d="M 0 200 Q 200 80, 400 200" fill="#8BC34A" />
            </svg>
          </div>

          <Sammy 
            expression="excited" 
            isGlowing={true}
            className="sammy-climbing"
          />

          <div className="story-text">
            <p className="scene-text">Up, up, UP the hill!</p>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SCENE 10: Rainbow Trail */}
      {/* ================================================================== */}
      <Section className="scene-rainbow" id="scene-10">
        <div className="scene-content rainbow-scene" onClick={handleZoomTap}>
          <RainbowTrail active={true} />

          <Sammy 
            expression="excited" 
            isGlowing={true}
            isZooming={isZooming}
            className="sammy-rainbow"
          />

          <div className="story-text">
            <p className="scene-text">So fast he made a rainbow!</p>
            <p className="scene-text">✨🌈✨</p>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SCENE 11: Comedy Beat - Knot */}
      {/* ================================================================== */}
      <Section className="scene-knot" id="scene-11">
        <div className="scene-content knot-scene">
          <div className="dizzy-stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="dizzy-star" style={{ animationDelay: `${i * 0.2}s` }}>
                ⭐
              </span>
            ))}
          </div>

          <Sammy 
            expression="surprised" 
            isGlowing={true}
            className="sammy-dizzy"
          />

          <div className="story-text">
            <p className="scene-text big-text">Oops! Too fast!</p>
            <p className="scene-text">Sammy got all dizzy!</p>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SCENE 12: Magic Wearing Off */}
      {/* ================================================================== */}
      <Section className="scene-slowing" id="scene-12" slowMode={true}>
        <div className="scene-content slowing-scene">
          <div className="fading-glow">
            <Sammy 
              expression="tired" 
              isGlowing={false}
              className="sammy-slowing"
            />
          </div>

          <div className="story-text slow-text">
            <p className="scene-text">The magic was fading...</p>
            <p className="scene-text">Sammy slowed... down...</p>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SCENE 13: Peaceful Ending */}
      {/* ================================================================== */}
      <Section className="scene-ending full-bleed" id="scene-13">
        <div className="scene-content ending-scene">
          <div className="sunset-sky" />
          <div className="peaceful-setting">
            <Leaf className="resting-leaf" />
            <Sammy 
              expression="peaceful" 
              isGlowing={false}
              className="sammy-resting"
            />
          </div>

          <div className="ending-flowers">
            <Flower className="end-flower f1" color="#FF69B4" />
            <Flower className="end-flower f2" color="#DDA0DD" />
            <Flower className="end-flower f3" color="#FFB6C1" />
          </div>

          <div className="story-text ending-text">
            <p className="scene-text ending-message">
              &quot;Going slow lets me see everything!&quot;
            </p>
            <p className="scene-text">Sammy smiled.</p>
            <p className="scene-text">Slow is special too. 💚</p>
          </div>

          <div className="the-end">
            <span>The End</span>
            <span className="end-snail">🐌</span>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* PARENT NOTE */}
      {/* ================================================================== */}
      <Section className="scene-parent-note" id="scene-14">
        <div className="scene-content parent-section">
          <h3 className="parent-title">💚 A Note for Grown-Ups</h3>
          
          <div className="parent-message">
            <p>
              Sammy&apos;s adventure celebrates both excitement AND calm. 
              It&apos;s okay to zoom through life sometimes—and it&apos;s 
              also wonderful to slow down and notice the little things.
            </p>
            <p>
              <strong>Try this:</strong> After reading, take a &quot;slow walk&quot; 
              together. What tiny beautiful things can you spot when you go 
              at snail pace?
            </p>
          </div>

          <div className="activity-ideas">
            <div className="activity">
              <span className="activity-icon">🐌</span>
              <span>Play &quot;fast and slow&quot;—run fast, then tiptoe slow!</span>
            </div>
            <div className="activity">
              <span className="activity-icon">🎨</span>
              <span>Draw Sammy with his glowing shell!</span>
            </div>
            <div className="activity">
              <span className="activity-icon">🌿</span>
              <span>Go on a real snail hunt in your garden!</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* CREDITS */}
      {/* ================================================================== */}
      <section className="credits-section">
        <div className="credits-content">
          <p className="credits-made">Made with 💚 by</p>
          <p className="credits-esy">Esy&apos;s Scrollytelling Engine</p>
          <div className="credits-sammy">🐌</div>
          <p className="credits-tagline">For little ones who love to zoom—and rest.</p>
          <a href="/scrollytelling" className="credits-link">
            Explore more stories →
          </a>
        </div>
      </section>
    </div>
  );
}

