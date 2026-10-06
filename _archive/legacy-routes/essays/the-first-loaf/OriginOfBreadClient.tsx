"use client";

import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import "./origin-of-bread.css";

/* ===========================================
   THE ORIGIN OF BREAD
   A Cinematic History of Humanity's First Food
   Mythic + Scientific Hybrid Scrollytelling
   Version II.1 (SVG-Strict)
   ===========================================
   
   DESIGN PHILOSOPHY:
   - Cosmic scale: grains as celestial bodies
   - Primordial darkness illuminated by ember
   - Three-voice narration system
   - Abstract SVG geometry (NO literal maps, NO stock imagery)
   - Mobile-native, 60fps GPU-accelerated
   
   VISUAL MODES:
   1. Sensory Overwhelm — grain cosmos, fire embers
   2. Historical Dreamscape — abstract vector landscapes
   3. Collision Montage — fermentation miracle
   4. Global Threads — abstract network geometry
   
   NARRATION VOICES:
   - Voice 1 (The Seen): Concrete visuals
   - Voice 2 (The Unseen): Cultural layers
   - Voice 3 (The Eternal): Philosophical depth
*/

/* ===========================================
   COSMIC GRAIN FIELD
   Grains drifting like comets through void
   =========================================== */
const CosmicGrainField: React.FC<{ 
  density?: number; 
  lightLevel?: number;
}> = ({ density = 1, lightLevel = 0 }) => {
  const grains = useMemo(() => {
    const count = Math.floor(35 * density);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      startY: -10 - Math.random() * 30,
      size: 2 + Math.random() * 4,
      glow: 0.4 + Math.random() * 0.5,
      duration: 18 + Math.random() * 12,
      delay: Math.random() * 15,
      drift: (Math.random() - 0.5) * 30,
      rotation: Math.random() * 360,
    }));
  }, [density]);

  return (
    <div className="cosmic-grain-field" aria-hidden="true">
      <svg 
        className="grain-cosmos-svg" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="grainGlow" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#F5A623" stopOpacity="1" />
            <stop offset="50%" stopColor="#C7A43C" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#C7A43C" stopOpacity="0" />
          </radialGradient>
          <filter id="grainBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.3" />
          </filter>
        </defs>
        
        {grains.map((grain) => (
          <g
            key={grain.id}
            className="cosmic-grain"
            style={{
              '--start-x': `${grain.x}%`,
              '--start-y': `${grain.startY}%`,
              '--drift': `${grain.drift}px`,
              '--duration': `${grain.duration}s`,
              '--delay': `${grain.delay}s`,
              '--rotation': `${grain.rotation}deg`,
              '--glow-intensity': grain.glow * (0.3 + lightLevel * 0.7),
            } as React.CSSProperties}
          >
            {/* Grain body - elongated ellipse */}
            <ellipse
              cx="0"
              cy="0"
              rx={grain.size * 0.35}
              ry={grain.size}
              fill="url(#grainGlow)"
              filter="url(#grainBlur)"
              opacity={grain.glow}
            />
            {/* Grain highlight */}
            <ellipse
              cx="0"
              cy={-grain.size * 0.3}
              rx={grain.size * 0.15}
              ry={grain.size * 0.4}
              fill="#F2EDE4"
              opacity={0.6}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

/* ===========================================
   PRIMORDIAL EMBER
   The fire that waits below
   =========================================== */
const PrimordialEmber: React.FC<{ intensity?: number }> = ({ intensity = 0.5 }) => (
  <div className="primordial-ember" aria-hidden="true">
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMax slice">
      <defs>
        <radialGradient id="emberCore" cx="50%" cy="100%" r="80%">
          <stop offset="0%" stopColor="#D4451A" stopOpacity={intensity} />
          <stop offset="40%" stopColor="#F5A623" stopOpacity={intensity * 0.6} />
          <stop offset="100%" stopColor="#050403" stopOpacity="0" />
        </radialGradient>
        <filter id="emberBlur" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>
      
      {/* Main ember glow */}
      <ellipse 
        cx="200" 
        cy="200" 
        rx="180" 
        ry="120"
        fill="url(#emberCore)"
        filter="url(#emberBlur)"
        className="ember-pulse"
      />
      
      {/* Hot core */}
      <ellipse
        cx="200"
        cy="195"
        rx="60"
        ry="30"
        fill="#F5A623"
        opacity={intensity * 0.4}
        filter="url(#emberBlur)"
        className="ember-core-pulse"
      />
    </svg>
  </div>
);

/* ===========================================
   FLOUR DUST PARTICLES
   Fine mist gathering into dunes
   =========================================== */
const FlourDust: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const particles = useMemo(() => 
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 60 + Math.random() * 40,
      size: 1 + Math.random() * 2,
      opacity: 0.15 + Math.random() * 0.25,
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 8,
    })), []
  );

  if (!active) return null;

  return (
    <div className="flour-dust" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="flour-mote"
          style={{
            '--x': `${p.x}%`,
            '--y': `${p.y}%`,
            '--size': `${p.size}px`,
            '--opacity': p.opacity,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

/* ===========================================
   ABSTRACT PLAINS SVG
   Wind-blown grass as curved vector lines
   NO literal maps, only dreamscape
   =========================================== */
const AbstractPlainsSVG: React.FC<{ windIntensity?: number }> = ({ windIntensity = 0.5 }) => (
  <svg 
    className="abstract-plains" 
    viewBox="0 0 1000 500" 
    preserveAspectRatio="xMidYMax slice"
    aria-label="Abstract landscape of wild grass plains"
  >
    <defs>
      <linearGradient id="skyFade" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#050403" />
        <stop offset="70%" stopColor="#0D0B09" />
        <stop offset="100%" stopColor="#1A1612" />
      </linearGradient>
      <linearGradient id="grassStroke" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#4A4239" stopOpacity="0.2" />
        <stop offset="60%" stopColor="#8B7355" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#C7A43C" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    
    {/* Sky gradient */}
    <rect x="0" y="0" width="1000" height="350" fill="url(#skyFade)" />
    
    {/* Ground plane */}
    <path 
      d="M0,400 Q250,380 500,390 Q750,400 1000,385 L1000,500 L0,500 Z" 
      fill="#1A1612" 
    />
    
    {/* Abstract grass stalks - curved lines swaying */}
    <g className="grass-field">
      {[...Array(50)].map((_, i) => {
        const x = 20 + (i * 20);
        const height = 80 + Math.sin(i * 0.4) * 50;
        const curve = Math.sin(i * 0.3) * 20 * windIntensity;
        const delay = i * 0.05;
        
        return (
          <path
            key={i}
            className="grass-stalk"
            d={`M${x},450 Q${x + curve * 0.5},${450 - height * 0.5} ${x + curve},${450 - height}`}
            stroke="url(#grassStroke)"
            strokeWidth={1 + Math.random() * 0.8}
            fill="none"
            strokeLinecap="round"
            style={{ '--delay': `${delay}s` } as React.CSSProperties}
          />
        );
      })}
    </g>
  </svg>
);

/* ===========================================
   STONE MORTAR SVG
   Abstract grinding ritual
   =========================================== */
const StoneMortarSVG: React.FC<{ grindProgress?: number }> = ({ grindProgress = 0 }) => {
  const grindAngle = Math.sin(grindProgress * Math.PI * 4) * 12;
  
  return (
    <svg 
      className="stone-mortar" 
      viewBox="0 0 200 180"
      aria-label="Ancient stone mortar and grinding stone"
    >
      <defs>
        <radialGradient id="mortarStone" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#6B6155" />
          <stop offset="70%" stopColor="#4A4239" />
          <stop offset="100%" stopColor="#2A2520" />
        </radialGradient>
        <linearGradient id="grindStone" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7A7065" />
          <stop offset="100%" stopColor="#4A4239" />
        </linearGradient>
        <radialGradient id="grainMass" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C7A43C" />
          <stop offset="100%" stopColor="#8B7355" />
        </radialGradient>
      </defs>
      
      {/* Shadow */}
      <ellipse cx="100" cy="165" rx="70" ry="12" fill="#0A0908" opacity="0.4" />
      
      {/* Mortar bowl */}
      <path
        d="M35,150 Q25,110 40,70 Q60,45 100,40 Q140,45 160,70 Q175,110 165,150 Q150,165 100,170 Q50,165 35,150"
        fill="url(#mortarStone)"
      />
      
      {/* Inner cavity */}
      <ellipse cx="100" cy="110" rx="50" ry="30" fill="#1A1612" />
      
      {/* Grain being crushed */}
      <ellipse 
        cx="100" 
        cy="115" 
        rx={20 + grindProgress * 20} 
        ry={10 + grindProgress * 8}
        fill="url(#grainMass)"
        opacity={0.5 + grindProgress * 0.4}
      />
      
      {/* Grinding stone */}
      <g 
        className="grinder"
        style={{ 
          transform: `rotate(${grindAngle}deg)`,
          transformOrigin: '100px 90px'
        }}
      >
        <ellipse cx="100" cy="105" rx="30" ry="15" fill="#4A4239" />
        <ellipse cx="100" cy="60" rx="18" ry="40" fill="url(#grindStone)" />
        <ellipse cx="100" cy="30" rx="12" ry="8" fill="#6B6155" />
      </g>
      
      {/* Scattered grain fragments */}
      {grindProgress > 0.2 && (
        <g className="grain-scatter" opacity={grindProgress * 0.8}>
          {[...Array(8)].map((_, i) => (
            <ellipse
              key={i}
              cx={70 + Math.random() * 60}
              cy={100 + Math.random() * 25}
              rx={1 + Math.random() * 2}
              ry={2 + Math.random() * 3}
              fill="#C7A43C"
              opacity={0.4 + Math.random() * 0.4}
            />
          ))}
        </g>
      )}
    </svg>
  );
};

/* ===========================================
   CLAY BOWL SVG
   Fermentation vessel with rain and bubbles
   =========================================== */
const ClayBowlSVG: React.FC<{ 
  stage: 'empty' | 'rain' | 'fermenting' | 'alive';
}> = ({ stage }) => {
  const hasRain = stage === 'rain' || stage === 'fermenting' || stage === 'alive';
  const hasBubbles = stage === 'fermenting' || stage === 'alive';
  const isAlive = stage === 'alive';
  
  return (
    <svg 
      className={`clay-bowl stage-${stage}`}
      viewBox="0 0 180 220"
      aria-label="Clay vessel with fermenting grain mixture"
    >
      <defs>
        <linearGradient id="clayBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A07050" />
          <stop offset="50%" stopColor="#8B5E3C" />
          <stop offset="100%" stopColor="#6A4530" />
        </linearGradient>
        <radialGradient id="doughSurface" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#D4C4A8" />
          <stop offset="100%" stopColor="#B8A080" />
        </radialGradient>
        <radialGradient id="bubbleShine" cx="30%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#F2EDE4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F2EDE4" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Shadow */}
      <ellipse cx="90" cy="210" rx="55" ry="10" fill="#0A0908" opacity="0.3" />
      
      {/* Bowl body */}
      <path
        d="M30,200 Q20,150 30,90 Q45,50 90,45 Q135,50 150,90 Q160,150 150,200 Q130,215 90,218 Q50,215 30,200"
        fill="url(#clayBody)"
      />
      
      {/* Bowl rim */}
      <ellipse cx="90" cy="52" rx="48" ry="12" fill="#9A6545" />
      <ellipse cx="90" cy="48" rx="42" ry="10" fill="#5A3A28" />
      
      {/* Grain/dough mixture */}
      <ellipse 
        className="dough-mass"
        cx="90" 
        cy={isAlive ? 65 : hasBubbles ? 78 : 90}
        rx={isAlive ? 38 : 35}
        ry={isAlive ? 25 : hasBubbles ? 18 : 12}
        fill="url(#doughSurface)"
      />
      
      {/* Rain drops falling */}
      {hasRain && !isAlive && (
        <g className="rain-drops">
          {[...Array(5)].map((_, i) => (
            <line
              key={i}
              className="rain-drop"
              x1={70 + i * 10}
              y1={10}
              x2={70 + i * 10}
              y2={18}
              stroke="#A8D4E6"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
              style={{ '--delay': `${i * 0.3}s` } as React.CSSProperties}
            />
          ))}
        </g>
      )}
      
      {/* Yeast spores drifting in */}
      {hasBubbles && (
        <g className="yeast-spores">
          {[...Array(6)].map((_, i) => (
            <circle
              key={i}
              className="yeast-spore"
              cx={60 + i * 12}
              cy={30}
              r={1}
              fill="#F2EDE4"
              opacity="0.5"
              style={{ '--delay': `${i * 0.5}s` } as React.CSSProperties}
            />
          ))}
        </g>
      )}
      
      {/* Fermentation bubbles */}
      {hasBubbles && (
        <g className="ferment-bubbles">
          {[...Array(8)].map((_, i) => (
            <circle
              key={i}
              className="ferment-bubble"
              cx={65 + (i % 4) * 15}
              cy={isAlive ? 70 : 82}
              r={2 + Math.random() * 2.5}
              fill="url(#bubbleShine)"
              style={{ '--delay': `${i * 0.35}s` } as React.CSSProperties}
            />
          ))}
        </g>
      )}
      
      {/* Clay texture lines */}
      <g stroke="#5A3A28" strokeWidth="1" fill="none" opacity="0.25">
        <path d="M45,160 Q70,155 90,158 Q110,161 135,156" />
        <path d="M40,130 Q65,125 90,128 Q115,131 140,126" />
      </g>
    </svg>
  );
};

/* ===========================================
   CLAY OVEN SVG
   Beehive oven with fire glow
   =========================================== */
const ClayOvenSVG: React.FC<{ firing?: boolean }> = ({ firing = false }) => (
  <svg 
    className={`clay-oven ${firing ? 'firing' : ''}`}
    viewBox="0 0 260 220"
    aria-label="Ancient beehive clay oven"
  >
    <defs>
      <radialGradient id="ovenInterior" cx="50%" cy="70%" r="60%">
        <stop offset="0%" stopColor={firing ? "#D4451A" : "#1A1612"} />
        <stop offset="60%" stopColor={firing ? "#8B2A10" : "#0D0B09"} />
        <stop offset="100%" stopColor="#050403" />
      </radialGradient>
      <linearGradient id="ovenClay" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#9A8070" />
        <stop offset="100%" stopColor="#6A5545" />
      </linearGradient>
    </defs>
    
    {/* Ground */}
    <rect x="10" y="185" width="240" height="35" fill="#2A2520" />
    
    {/* Oven dome */}
    <path
      d="M40,185 Q30,100 70,55 Q130,20 190,55 Q230,100 220,185 Z"
      fill="url(#ovenClay)"
    />
    
    {/* Oven opening */}
    <ellipse cx="130" cy="155" rx="35" ry="45" fill="url(#ovenInterior)" />
    
    {/* Fire glow */}
    {firing && (
      <g className="oven-fire">
        <ellipse 
          cx="130" 
          cy="160" 
          rx="30" 
          ry="40" 
          fill="#D4451A" 
          opacity="0.5"
          className="fire-glow"
        />
        <path
          className="flame"
          d="M115,175 Q110,155 120,140 Q115,150 125,155 Q120,165 115,175"
          fill="#F5A623"
        />
        <path
          className="flame"
          d="M130,180 Q125,150 135,130 Q130,145 140,155 Q135,170 130,180"
          fill="#F5A623"
          style={{ '--delay': '0.2s' } as React.CSSProperties}
        />
        <path
          className="flame"
          d="M145,175 Q140,155 150,142 Q145,152 155,158 Q150,168 145,175"
          fill="#F5A623"
          style={{ '--delay': '0.4s' } as React.CSSProperties}
        />
      </g>
    )}
    
    {/* Oven texture */}
    <g stroke="#5A4A3A" strokeWidth="1" fill="none" opacity="0.2">
      <path d="M55,140 Q100,130 130,135 Q160,140 205,130" />
      <path d="M50,100 Q100,90 130,95 Q160,100 210,90" />
      <path d="M70,65 Q110,55 130,60 Q150,65 190,55" />
    </g>
  </svg>
);

/* ===========================================
   GLOBAL NETWORK SVG
   Abstract geometry — NOT a map
   Cultural diffusion as pulsing nodes
   =========================================== */
const GlobalNetworkSVG: React.FC<{ pulseIntensity?: number }> = ({ pulseIntensity = 0.5 }) => (
  <svg 
    className="global-network"
    viewBox="0 0 600 350"
    aria-label="Abstract network of global bread cultures"
  >
    <defs>
      <linearGradient id="threadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#C7A43C" stopOpacity="0" />
        <stop offset="50%" stopColor="#C7A43C" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#C7A43C" stopOpacity="0" />
      </linearGradient>
      <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    
    {/* Connection threads — abstract paths */}
    <g className="network-threads">
      <path 
        className="thread" 
        d="M100,175 Q200,100 300,150" 
        stroke="url(#threadGradient)" 
        strokeWidth="1.5" 
        fill="none" 
      />
      <path 
        className="thread" 
        d="M300,150 Q400,200 500,140" 
        stroke="url(#threadGradient)" 
        strokeWidth="1.5" 
        fill="none" 
      />
      <path 
        className="thread" 
        d="M150,250 Q250,180 350,230" 
        stroke="url(#threadGradient)" 
        strokeWidth="1.5" 
        fill="none" 
      />
      <path 
        className="thread" 
        d="M350,230 Q450,280 520,200" 
        stroke="url(#threadGradient)" 
        strokeWidth="1.5" 
        fill="none" 
      />
      <path 
        className="thread" 
        d="M100,175 Q125,220 150,250" 
        stroke="url(#threadGradient)" 
        strokeWidth="1.5" 
        fill="none" 
      />
      <path 
        className="thread" 
        d="M300,150 Q325,190 350,230" 
        stroke="url(#threadGradient)" 
        strokeWidth="1.5" 
        fill="none" 
      />
      <path 
        className="thread" 
        d="M500,140 Q510,170 520,200" 
        stroke="url(#threadGradient)" 
        strokeWidth="1.5" 
        fill="none" 
      />
    </g>
    
    {/* Culture nodes — abstract circles */}
    <g className="culture-nodes">
      {/* Flatbreads node */}
      <g className="node node-1">
        <circle cx="100" cy="175" r="20" fill="#D4451A" opacity={0.2 + pulseIntensity * 0.3} filter="url(#nodeGlow)" />
        <circle cx="100" cy="175" r="12" fill="#D4451A" />
        <circle cx="100" cy="175" r="6" fill="#F2EDE4" />
        <text x="100" y="210" textAnchor="middle" className="node-label">Flatbreads</text>
      </g>
      
      {/* Fermented node */}
      <g className="node node-2">
        <circle cx="300" cy="150" r="24" fill="#C7A43C" opacity={0.2 + pulseIntensity * 0.3} filter="url(#nodeGlow)" />
        <circle cx="300" cy="150" r="14" fill="#C7A43C" />
        <circle cx="300" cy="150" r="7" fill="#F2EDE4" />
        <text x="300" y="190" textAnchor="middle" className="node-label">Leavened</text>
      </g>
      
      {/* Steamed node */}
      <g className="node node-3">
        <circle cx="500" cy="140" r="18" fill="#8B7355" opacity={0.2 + pulseIntensity * 0.3} filter="url(#nodeGlow)" />
        <circle cx="500" cy="140" r="11" fill="#8B7355" />
        <circle cx="500" cy="140" r="5" fill="#F2EDE4" />
        <text x="500" y="175" textAnchor="middle" className="node-label">Steamed</text>
      </g>
      
      {/* Corn node */}
      <g className="node node-4">
        <circle cx="150" cy="250" r="16" fill="#E8B84A" opacity={0.2 + pulseIntensity * 0.3} filter="url(#nodeGlow)" />
        <circle cx="150" cy="250" r="10" fill="#E8B84A" />
        <circle cx="150" cy="250" r="5" fill="#F2EDE4" />
        <text x="150" y="280" textAnchor="middle" className="node-label">Maize</text>
      </g>
      
      {/* Rye node */}
      <g className="node node-5">
        <circle cx="350" cy="230" r="15" fill="#6A5545" opacity={0.2 + pulseIntensity * 0.3} filter="url(#nodeGlow)" />
        <circle cx="350" cy="230" r="9" fill="#6A5545" />
        <circle cx="350" cy="230" r="4" fill="#F2EDE4" />
        <text x="350" y="260" textAnchor="middle" className="node-label">Rye</text>
      </g>
      
      {/* Rice node */}
      <g className="node node-6">
        <circle cx="520" cy="200" r="14" fill="#B8A080" opacity={0.2 + pulseIntensity * 0.3} filter="url(#nodeGlow)" />
        <circle cx="520" cy="200" r="8" fill="#B8A080" />
        <circle cx="520" cy="200" r="4" fill="#F2EDE4" />
        <text x="520" y="230" textAnchor="middle" className="node-label">Rice</text>
      </g>
    </g>
    
    {/* Floating particles */}
    <g className="network-particles">
      {[...Array(20)].map((_, i) => (
        <circle
          key={i}
          className="network-particle"
          cx={80 + (i * 25) % 480}
          cy={100 + (i * 17) % 180}
          r={1 + (i % 2)}
          fill="#C7A43C"
          opacity="0.3"
          style={{ '--delay': `${i * 0.2}s` } as React.CSSProperties}
        />
      ))}
    </g>
  </svg>
);

/* ===========================================
   NATUFIAN SCENE SVG
   Hunter-gatherer campsite with grinding stones
   =========================================== */
const NatufianCampSVG: React.FC<{ activityLevel?: number }> = ({ activityLevel = 0.5 }) => (
  <svg 
    className="natufian-camp" 
    viewBox="0 0 600 350"
    aria-label="Natufian hunter-gatherer camp scene"
  >
    <defs>
      <linearGradient id="moonGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F2EDE4" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#F2EDE4" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="fireGlow" cx="50%" cy="100%" r="80%">
        <stop offset="0%" stopColor="#D4451A" stopOpacity={0.4 + activityLevel * 0.3} />
        <stop offset="50%" stopColor="#F5A623" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#050403" stopOpacity="0" />
      </linearGradient>
      <filter id="campFireBlur">
        <feGaussianBlur stdDeviation="8" />
      </filter>
    </defs>
    
    {/* Night sky */}
    <rect x="0" y="0" width="600" height="200" fill="#050403" />
    
    {/* Moon */}
    <circle cx="520" cy="60" r="25" fill="url(#moonGlow)" />
    <circle cx="520" cy="60" r="15" fill="#F2EDE4" opacity="0.8" />
    
    {/* Stars */}
    {[...Array(12)].map((_, i) => (
      <circle
        key={i}
        cx={50 + (i * 47) % 500}
        cy={30 + (i * 23) % 120}
        r={0.8 + (i % 3) * 0.4}
        fill="#F2EDE4"
        opacity={0.3 + (i % 3) * 0.2}
      />
    ))}
    
    {/* Ground */}
    <path 
      d="M0,200 Q150,190 300,195 Q450,185 600,200 L600,350 L0,350 Z" 
      fill="#1A1612" 
    />
    
    {/* Campfire glow */}
    <ellipse cx="300" cy="280" rx="120" ry="60" fill="url(#fireGlow)" filter="url(#campFireBlur)" />
    
    {/* Campfire */}
    <g className="camp-fire">
      <path d="M290,290 L300,250 L310,290 Z" fill="#D4451A" opacity="0.9" className="flame" />
      <path d="M280,290 L290,260 L300,290 Z" fill="#F5A623" opacity="0.7" className="flame" />
      <path d="M300,290 L310,265 L320,290 Z" fill="#F5A623" opacity="0.7" className="flame" />
      {/* Embers */}
      {[...Array(6)].map((_, i) => (
        <circle
          key={i}
          cx={280 + i * 8}
          cy={295}
          r={2 + Math.random()}
          fill="#D4451A"
          opacity={0.5 + Math.random() * 0.3}
        />
      ))}
    </g>
    
    {/* Stone mortar - left */}
    <ellipse cx="180" cy="285" rx="35" ry="20" fill="#4A4239" />
    <ellipse cx="180" cy="278" rx="28" ry="12" fill="#2A2520" />
    
    {/* Grinding stone nearby */}
    <ellipse cx="220" cy="290" rx="15" ry="8" fill="#6B6155" />
    
    {/* Grass basket with grain */}
    <path d="M400,260 Q420,280 440,260" stroke="#8B7355" strokeWidth="3" fill="none" />
    <ellipse cx="420" cy="268" rx="18" ry="10" fill="#C7A43C" opacity="0.6" />
    
    {/* Figure silhouettes */}
    <ellipse cx="150" cy="270" rx="15" ry="30" fill="#1A1612" /> {/* Person grinding */}
    <ellipse cx="350" cy="265" rx="12" ry="25" fill="#1A1612" /> {/* Person by fire */}
  </svg>
);

/* ===========================================
   FERTILE CRESCENT MAP SVG
   Abstract representation of early agriculture
   =========================================== */
const FertileCrescentSVG: React.FC<{ revealProgress?: number }> = ({ revealProgress = 0 }) => (
  <svg 
    className="fertile-crescent" 
    viewBox="0 0 500 300"
    aria-label="Abstract representation of the Fertile Crescent"
  >
    <defs>
      <linearGradient id="crescentGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C7A43C" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#F5A623" stopOpacity="0.4" />
      </linearGradient>
      <filter id="crescentGlow">
        <feGaussianBlur stdDeviation="4" />
      </filter>
    </defs>
    
    {/* Abstract crescent arc */}
    <path
      d="M80,250 Q150,80 300,60 Q450,60 480,200"
      stroke="url(#crescentGold)"
      strokeWidth={3 + revealProgress * 4}
      fill="none"
      strokeLinecap="round"
      strokeDasharray={800}
      strokeDashoffset={800 - revealProgress * 800}
      filter="url(#crescentGlow)"
    />
    
    {/* Agriculture origin points */}
    {revealProgress > 0.3 && (
      <g className="origin-points" opacity={revealProgress}>
        <circle cx="200" cy="90" r={5 + revealProgress * 3} fill="#C7A43C" />
        <text x="200" y="115" textAnchor="middle" fill="#8B7355" fontSize="10">Karacadağ</text>
        
        <circle cx="150" cy="140" r={4 + revealProgress * 2} fill="#F5A623" />
        <text x="150" y="165" textAnchor="middle" fill="#8B7355" fontSize="9">Göbekli Tepe</text>
      </g>
    )}
    
    {/* Wild grain symbols */}
    {revealProgress > 0.5 && (
      <g className="grain-symbols" opacity={(revealProgress - 0.5) * 2}>
        {[...Array(15)].map((_, i) => (
          <path
            key={i}
            d={`M${120 + i * 25},${180 - Math.sin(i * 0.5) * 40} l2,-15 l-4,0 l2,15`}
            fill="#C7A43C"
            opacity="0.6"
          />
        ))}
      </g>
    )}
  </svg>
);

/* ===========================================
   EGYPTIAN BAKERY SVG
   Ancient Egyptian bread production scene
   =========================================== */
const EgyptianBakerySVG: React.FC<{ ovenGlow?: number }> = ({ ovenGlow = 0.5 }) => (
  <svg 
    className="egyptian-bakery" 
    viewBox="0 0 500 350"
    aria-label="Ancient Egyptian bakery scene"
  >
    <defs>
      <linearGradient id="nileBlue" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1A4A5E" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#2A6A7E" stopOpacity="0.5" />
      </linearGradient>
      <linearGradient id="sandstone" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#D4B896" />
        <stop offset="100%" stopColor="#B89B6E" />
      </linearGradient>
      <radialGradient id="ovenHeat" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#D4451A" stopOpacity={ovenGlow} />
        <stop offset="60%" stopColor="#F5A623" stopOpacity={ovenGlow * 0.5} />
        <stop offset="100%" stopColor="#B89B6E" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Sky */}
    <rect x="0" y="0" width="500" height="100" fill="#0D2538" />
    
    {/* Sun disc */}
    <circle cx="420" cy="50" r="30" fill="#F5A623" opacity="0.8" />
    <circle cx="420" cy="50" r="25" fill="#FFF" opacity="0.3" />
    
    {/* Wall structure */}
    <rect x="50" y="100" width="400" height="250" fill="url(#sandstone)" />
    
    {/* Hieroglyph decorations */}
    <g className="hieroglyphs" opacity="0.3">
      <rect x="70" y="120" width="8" height="20" fill="#6A5545" />
      <circle cx="90" cy="130" r="6" fill="#6A5545" />
      <path d="M110,120 l10,10 l-10,10" stroke="#6A5545" strokeWidth="2" fill="none" />
      <rect x="130" y="118" width="15" height="5" fill="#6A5545" />
    </g>
    
    {/* Cylindrical oven (beehive style) */}
    <ellipse cx="200" cy="320" rx="70" ry="30" fill="#8B7355" />
    <path 
      d="M130,320 Q130,200 200,180 Q270,200 270,320" 
      fill="#A89070" 
      stroke="#8B7355"
      strokeWidth="3"
    />
    
    {/* Oven opening with fire glow */}
    <ellipse cx="200" cy="280" rx="25" ry="15" fill="url(#ovenHeat)" />
    <ellipse cx="200" cy="280" rx="20" ry="12" fill="#1A1612" />
    {ovenGlow > 0.3 && (
      <g className="oven-flames">
        <path d="M195,285 l5,-15 l5,15" fill="#D4451A" opacity={ovenGlow} />
        <path d="M185,287 l4,-10 l4,10" fill="#F5A623" opacity={ovenGlow * 0.7} />
      </g>
    )}
    
    {/* Bread loaves */}
    <g className="loaves">
      <ellipse cx="350" cy="290" rx="20" ry="10" fill="#C7A43C" />
      <ellipse cx="380" cy="295" rx="18" ry="9" fill="#B89B6E" />
      <ellipse cx="365" cy="310" rx="22" ry="11" fill="#D4B896" />
    </g>
    
    {/* Grain storage vessel */}
    <path d="M420,320 Q410,280 420,250 Q430,220 440,250 Q450,280 440,320 Z" fill="#8B7355" />
    <ellipse cx="430" cy="260" rx="15" ry="5" fill="#C7A43C" opacity="0.7" />
    
    {/* Worker figure (silhouette) */}
    <ellipse cx="300" cy="300" rx="15" ry="35" fill="#4A4239" />
  </svg>
);

/* ===========================================
   BREAD TIMELINE SVG
   Visual timeline of bread evolution
   =========================================== */
const BreadTimelineSVG: React.FC<{ progress?: number }> = ({ progress = 0 }) => (
  <svg 
    className="bread-timeline" 
    viewBox="0 0 600 200"
    aria-label="Timeline of bread evolution through history"
  >
    <defs>
      <linearGradient id="timelineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4A4239" />
        <stop offset={`${progress * 100}%`} stopColor="#C7A43C" />
        <stop offset={`${progress * 100}%`} stopColor="#4A4239" />
        <stop offset="100%" stopColor="#4A4239" />
      </linearGradient>
    </defs>
    
    {/* Main timeline */}
    <line x1="50" y1="100" x2="550" y2="100" stroke="url(#timelineGrad)" strokeWidth="3" />
    
    {/* Era markers */}
    {[
      { x: 50, year: '30,000 BCE', label: 'First Grinding' },
      { x: 150, year: '14,400 BCE', label: 'Natufian Bread' },
      { x: 250, year: '9,500 BCE', label: 'Agriculture' },
      { x: 350, year: '4,000 BCE', label: 'Egyptian Ovens' },
      { x: 450, year: '300 BCE', label: 'Leavened Bread' },
      { x: 550, year: 'Today', label: 'Global Culture' },
    ].map((era, i) => {
      const revealed = progress > (i / 6);
      return (
        <g key={i} className="era-marker" opacity={revealed ? 1 : 0.3}>
          <circle cx={era.x} cy="100" r={revealed ? 8 : 5} fill={revealed ? '#C7A43C' : '#4A4239'} />
          <text x={era.x} y="80" textAnchor="middle" fill="#8B7355" fontSize="9">{era.year}</text>
          <text x={era.x} y="130" textAnchor="middle" fill="#F2EDE4" fontSize="8">{era.label}</text>
        </g>
      );
    })}
  </svg>
);

/* ===========================================
   THREE-VOICE NARRATION COMPONENT
   =========================================== */
interface VoiceProps {
  voice: 'seen' | 'unseen' | 'eternal';
  children: React.ReactNode;
}

const Voice: React.FC<VoiceProps> = ({ voice, children }) => (
  <div className={`voice voice-${voice}`} role="text">
    <span className="voice-marker" aria-hidden="true">
      {voice === 'seen' && '●'}
      {voice === 'unseen' && '◆'}
      {voice === 'eternal' && '✦'}
    </span>
    <p className="voice-text">{children}</p>
  </div>
);

/* ===========================================
   SOURCES DATA
   =========================================== */
const sources = [
  { 
    title: 'Arranz-Otaegui et al. — "Archaeobotanical evidence reveals the origins of bread 14,400 years ago" (PNAS 2018)', 
    url: 'https://www.pnas.org/doi/10.1073/pnas.1801071115' 
  },
  { 
    title: 'Heun et al. — "Site of Einkorn Wheat Domestication Identified by DNA Fingerprinting" (Science 1997)', 
    url: 'https://www.science.org/doi/10.1126/science.278.5341.1312' 
  },
  { 
    title: 'Revedin et al. — "Thirty thousand-year-old evidence of plant food processing" (PNAS 2010)', 
    url: 'https://www.pnas.org/doi/10.1073/pnas.1006993107' 
  },
  { 
    title: 'Zohary, Daniel & Hopf, Maria — "Domestication of Plants in the Old World" (Oxford University Press)', 
    url: 'https://global.oup.com/academic/product/domestication-of-plants-in-the-old-world-9780199549061' 
  },
  { 
    title: 'Bar-Yosef, Ofer — "The Natufian Culture in the Levant" (Annual Review of Anthropology)', 
    url: 'https://www.annualreviews.org/doi/abs/10.1146/annurev.an.27.100198.001101' 
  },
  { 
    title: 'Samuel, Delwen — "Investigation of Ancient Egyptian Baking and Brewing Methods" (Science 1996)', 
    url: 'https://www.science.org/doi/10.1126/science.273.5274.488' 
  },
  { 
    title: 'Rubel, William — "Bread: A Global History" (Reaktion Books)', 
    url: 'https://reaktionbooks.co.uk/work/bread' 
  },
  { 
    title: 'McGee, Harold — "On Food and Cooking: The Science and Lore of the Kitchen" (Scribner)', 
    url: 'https://www.simonandschuster.com/books/On-Food-and-Cooking/Harold-McGee/9780684800011' 
  },
  { 
    title: 'Tannahill, Reay — "Food in History" (Three Rivers Press)', 
    url: 'https://www.amazon.com/Food-History-Reay-Tannahill/dp/0517884046' 
  },
  { 
    title: 'Fuller, Dorian Q. — "Contrasting Patterns in Crop Domestication" (Annals of Botany 2007)', 
    url: 'https://academic.oup.com/aob/article/100/5/903/216034' 
  },
];

/* ===========================================
   MAIN CLIENT COMPONENT
   =========================================== */
export default function OriginOfBreadClient() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lightLevel, setLightLevel] = useState(0);
  const [grindProgress, setGrindProgress] = useState(0);
  const [bowlStage, setBowlStage] = useState<'empty' | 'rain' | 'fermenting' | 'alive'>('empty');
  const [ovenFiring, setOvenFiring] = useState(false);
  const [networkPulse, setNetworkPulse] = useState(0);
  // New state for expanded sections
  const [natufianActivity, setNatufianActivity] = useState(0);
  const [crescentReveal, setCrescentReveal] = useState(0);
  const [egyptOvenGlow, setEgyptOvenGlow] = useState(0.3);
  const [timelineProgress, setTimelineProgress] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const movementRefs = useRef<(HTMLElement | null)[]>([]);

  // Scroll handler
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollTop / docHeight, 1);
    setScrollProgress(progress);

    // Update state based on which movement is in view
    movementRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const threshold = window.innerHeight * 0.5;
        
        if (rect.top < threshold && rect.bottom > 0) {
          const sectionProgress = Math.max(0, Math.min(1, (threshold - rect.top) / rect.height));
          
          // Movement I: Invocation — light increases with scroll
          if (index === 0) {
            setLightLevel(sectionProgress);
          }
          
          // Movement II: Ancestral — grinding progress  
          if (index === 1) {
            setGrindProgress(sectionProgress);
          }
          
          // Movement II-B: Natufian — camp activity
          if (index === 2) {
            setNatufianActivity(sectionProgress);
          }
          
          // Movement III: Fertile Crescent — agriculture revolution
          if (index === 3) {
            setCrescentReveal(sectionProgress);
          }
          
          // Movement IV: Collision — fermentation stages
          if (index === 4) {
            if (sectionProgress < 0.25) setBowlStage('empty');
            else if (sectionProgress < 0.5) setBowlStage('rain');
            else if (sectionProgress < 0.75) setBowlStage('fermenting');
            else setBowlStage('alive');
            setOvenFiring(sectionProgress > 0.6);
          }
          
          // Movement V: Egyptian — oven glow
          if (index === 5) {
            setEgyptOvenGlow(0.3 + sectionProgress * 0.7);
          }
          
          // Movement VI: Timeline — progressive reveal
          if (index === 6) {
            setTimelineProgress(sectionProgress);
          }
          
          // Movement VII: Echo — network pulse
          if (index === 7) {
            setNetworkPulse(sectionProgress);
          }
        }
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <article className="origin-of-bread" ref={containerRef}>
      
      {/* ==========================================
          MOVEMENT I — INVOCATION
          Sensory Overwhelm Mode
          ========================================== */}
      <section 
        className="movement movement-invocation"
        ref={(el) => { movementRefs.current[0] = el; }}
        aria-label="Movement I: Invocation"
      >
        <CosmicGrainField density={1.2} lightLevel={lightLevel} />
        <PrimordialEmber intensity={0.3 + lightLevel * 0.5} />
        <FlourDust active={lightLevel > 0.3} />
        
        <div className="invocation-content">
          <div className="invocation-stage">
            <h1 className="cinematic-title reveal">
              <span className="title-line">The Origin</span>
              <span className="title-line title-accent">of Bread</span>
            </h1>
            
            <p className="cinematic-subtitle reveal">
              {`A Cinematic History of Humanity's First Food`}
            </p>
          </div>
          
          <div className="voice-stack reveal">
            <Voice voice="seen">
              Grain falls through darkness, landing on stone.
            </Voice>
            
            <Voice voice="unseen">
              Long before cities, before metal, before names… humans reached for wild grass and found possibility.
            </Voice>
            
            <Voice voice="eternal">
              Civilization begins when hunger meets imagination.
            </Voice>
          </div>
          
          <div className="scroll-indicator reveal" aria-hidden="true">
            <span>Descend</span>
            <div className="scroll-line" />
          </div>
        </div>
      </section>

      {/* ==========================================
          MOVEMENT II — THE ANCESTRAL PULSE
          Historical Dreamscape Mode
          ========================================== */}
      <section 
        className="movement movement-ancestral"
        ref={(el) => { movementRefs.current[1] = el; }}
        aria-label="Movement II: The Ancestral Pulse"
      >
        <div className="ancestral-backdrop">
          <AbstractPlainsSVG windIntensity={0.5 + grindProgress * 0.5} />
        </div>
        
        <div className="ancestral-content">
          <div className="movement-label reveal">MOVEMENT II</div>
          <h2 className="section-heading reveal">The Ancestral Pulse</h2>
          
          <div className="voice-block reveal">
            <Voice voice="seen">
              Hands crush wild kernels between stones.
            </Voice>
            
            <Voice voice="unseen">
              They gather einkorn and emmer from the hillsides, not knowing they are gathering their future.
            </Voice>
            
            <Voice voice="eternal">
              Every origin is small, fragile, and nearly forgotten.
            </Voice>
          </div>
          
          <div className="ritual-scene reveal">
            <div className="ritual-visual">
              <StoneMortarSVG grindProgress={grindProgress} />
            </div>
            <div className="ritual-narrative">
              <p className="scientific-note">
                <span className="era-badge">30,000 BCE</span>
                {`At Grotta Paglicci in Italy, archaeologists discovered stone tools bearing traces of starch residue—evidence that our Paleolithic ancestors were grinding wild grains into flour long before the advent of agriculture. This paste, smeared onto hot stones and charred by fire, represents humanity's first attempt to transform grass into sustenance.`}
              </p>
            </div>
          </div>
          
          <div className="deep-context reveal">
            <p>
              The grains they gathered—wild <em>Hordeum spontaneum</em> (barley) and <em>Triticum dicoccoides</em> (emmer)—grew sparse across the Levantine hillsides. Each seed was a caloric gamble, requiring hours of collection for a single meal. Yet these hunter-gatherers persisted, developing specialized grinding stones that archaeologists call <em>manos</em> and <em>metates</em>.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          MOVEMENT II-B — THE NATUFIAN THRESHOLD
          14,400 Years Ago
          ========================================== */}
      <section 
        className="movement movement-natufian"
        ref={(el) => { movementRefs.current[2] = el; }}
        aria-label="Movement II-B: The Natufian Threshold"
      >
        <div className="natufian-backdrop">
          <NatufianCampSVG activityLevel={natufianActivity} />
        </div>
        
        <div className="natufian-content">
          <div className="movement-label reveal">MOVEMENT II-B</div>
          <h2 className="section-heading reveal">The Natufian Threshold</h2>
          
          <div className="voice-block reveal">
            <Voice voice="seen">
              Firelight flickers across stone mortars. Hands work in practiced rhythm.
            </Voice>
            
            <Voice voice="unseen">
              In the Jordan Valley, a people called Natufians were about to change everything—not through intention, but through stubborn repetition.
            </Voice>
            
            <Voice voice="eternal">
              The first revolution is always invisible to those who live it.
            </Voice>
          </div>
          
          <div className="narrative-block reveal">
            <p className="scientific-note">
              <span className="era-badge">14,400 BCE</span>
              At Shubayqa 1 in northeastern Jordan, archaeologists made a stunning discovery in 2018: charred breadcrumbs embedded in an ancient hearth. Analysis by Amaia Arranz-Otaegui revealed these 14,400-year-old fragments contained wild einkorn, club-rush tubers, and barley—the earliest direct evidence of bread production, predating agriculture by 4,000 years.
            </p>
          </div>
          
          <div className="deep-narrative reveal">
            <h3 className="subsection-title">The Natufian Way</h3>
            <p>
              The Natufians were not farmers. They were semi-sedentary hunter-gatherers who built circular stone dwellings and gathered wild cereals during seasonal abundance. Their settlements—including Ain Mallaha in northern Israel and Wadi Hammeh in Jordan—show evidence of permanent occupation, elaborate burials, and complex social organization.
            </p>
            <p>
              Their toolkit included lunate microliths (crescent-shaped flint blades) hafted into wooden handles to create sickles—tools purpose-built for harvesting wild grains. The mortars and pestles found at their sites bear unmistakable starch residues, testimony to countless hours of grinding.
            </p>
          </div>
          
          <blockquote className="featured-quote reveal">
            <p>{`"The discovery of bread at Shubayqa 1 suggests that bread production was already established before plant cultivation began."`}</p>
            <cite>— Dr. Amaia Arranz-Otaegui, University of Copenhagen, 2018</cite>
          </blockquote>
        </div>
      </section>

      {/* ==========================================
          MOVEMENT III — THE AGRICULTURAL REVOLUTION
          The Fertile Crescent
          ========================================== */}
      <section 
        className="movement movement-agriculture"
        ref={(el) => { movementRefs.current[3] = el; }}
        aria-label="Movement III: The Agricultural Revolution"
      >
        <div className="crescent-backdrop">
          <FertileCrescentSVG revealProgress={crescentReveal} />
        </div>
        
        <div className="agriculture-content">
          <div className="movement-label reveal">MOVEMENT III</div>
          <h2 className="section-heading reveal">The Agricultural Revolution</h2>
          
          <div className="voice-block reveal">
            <Voice voice="seen">
              Seeds fall into prepared soil. A line is drawn between before and after.
            </Voice>
            
            <Voice voice="unseen">
              For ten thousand generations, humans had gathered what nature offered. Now, they would make nature offer more.
            </Voice>
            
            <Voice voice="eternal">
              When humans learned to plant grain, they planted themselves.
            </Voice>
          </div>
          
          <div className="narrative-block reveal">
            <p className="scientific-note">
              <span className="era-badge">9,500 BCE</span>
              {`In the highlands of southeastern Turkey, near the volcanic slopes of Karacadağ, wild einkorn wheat (`}<em>Triticum monococcum</em>{`) underwent genetic transformation. DNA analysis by Manfred Heun's team (1997) identified this precise region as the birthplace of domesticated wheat—the genetic Eve of nearly all bread we eat today.`}
            </p>
          </div>
          
          <div className="deep-narrative reveal">
            <h3 className="subsection-title">The Neolithic Package</h3>
            <p>
              {`The transition from foraging to farming—what archaeologists call the "Neolithic Revolution"—was neither sudden nor universal. It emerged gradually across the Fertile Crescent, a arc-shaped region stretching from the Persian Gulf through modern Iraq, Syria, Lebanon, Israel, and Jordan.`}
            </p>
            <p>
              {`Alongside wheat and barley, early farmers domesticated lentils, peas, chickpeas, bitter vetch, and flax. They developed irrigation, built permanent villages, and invented pottery for storage. The "Neolithic Package" was a complete transformation of human existence—from mobile to settled, from opportunistic to planned.`}
            </p>
          </div>
          
          <div className="stat-highlight reveal">
            <div className="stat-item">
              <span className="stat-number">8</span>
              <span className="stat-label">founder crops domesticated in the Fertile Crescent</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">years of continuous wheat cultivation</span>
            </div>
          </div>
          
          <div className="deep-narrative reveal">
            <h3 className="subsection-title">Göbekli Tepe: The Temple Before the Farm</h3>
            <p>
              At Göbekli Tepe in southeastern Turkey, massive carved pillars—some weighing 20 tons—were erected around 9600 BCE, predating Stonehenge by 6,000 years. This was not a settlement but a ceremonial site, built by hunter-gatherers who gathered here in great numbers.
            </p>
            <p>
              Archaeological evidence suggests these gatherings required vast quantities of food, including processed grain. Some researchers, including Klaus Schmidt who excavated the site, argue that the social demands of Göbekli Tepe may have <em>driven</em> agricultural development—that bread came not from hunger, but from the need to feast.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          MOVEMENT IV — THE COLLISION OF WORLDS
          Fermentation Discovery
          ========================================== */}
      <section 
        className="movement movement-collision"
        ref={(el) => { movementRefs.current[4] = el; }}
        aria-label="Movement IV: The Collision of Worlds"
      >
        <div className="collision-content">
          <div className="movement-label reveal">MOVEMENT IV</div>
          <h2 className="section-heading reveal">The Collision of Worlds</h2>
          
          <p className="collision-catalyst reveal">
            The accidental discovery of <em>fermentation</em>.
          </p>
          
          <div className="collision-triptych">
            <div className="triptych-panel reveal">
              <ClayBowlSVG stage={bowlStage} />
              <div className="panel-caption">
                <h3>The Accident</h3>
                <p>A forgotten clay bowl fills with rain. Wild yeast drifts into the mixture.</p>
              </div>
            </div>
            
            <div className="triptych-panel triptych-center reveal">
              <div className="voice-block">
                <Voice voice="seen">
                  The wet grain stirs. The surface rises.
                </Voice>
                <Voice voice="unseen">
                  Wild yeast slips into the mixture, an unseen guest that rewrites human hunger.
                </Voice>
                <Voice voice="eternal">
                  From a mistake came the architecture of nourishment.
                </Voice>
              </div>
              <p className="scientific-note">
                Wild <em>Saccharomyces cerevisiae</em> yeasts—present on grain husks, in the air, on human hands—consume sugars and release carbon dioxide. Trapped within the gluten matrix, these gas bubbles expand the dough, creating the light, airy texture that distinguishes leavened bread from dense flatbreads.
              </p>
            </div>
            
            <div className="triptych-panel reveal">
              <ClayOvenSVG firing={ovenFiring} />
              <div className="panel-caption">
                <h3>The Birth</h3>
                <p>Heat kills the yeast but preserves its work—a risen loaf, golden and fragrant.</p>
              </div>
            </div>
          </div>
          
          <div className="deep-narrative reveal">
            <h3 className="subsection-title">The Science of Rising</h3>
            <p>
              {`Yeast fermentation is a byproduct of anaerobic respiration. When `}<em>Saccharomyces</em>{` encounters flour's starches (broken down into simple sugars by enzymes), it metabolizes these sugars into ethanol and carbon dioxide. The ethanol evaporates during baking, leaving behind the characteristic flavor compounds of fermented bread.`}
            </p>
            <p>
              {`The discovery was almost certainly accidental. A wet grain mixture left too long, a warm environment, and the ubiquitous presence of wild yeast created the conditions for spontaneous fermentation. The first person to bake this "spoiled" dough discovered something miraculous: bread that was lighter, more flavorful, and easier to digest.`}
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          MOVEMENT V — THE EGYPTIAN MASTERY
          Bread as Civilization
          ========================================== */}
      <section 
        className="movement movement-egypt"
        ref={(el) => { movementRefs.current[5] = el; }}
        aria-label="Movement V: The Egyptian Mastery"
      >
        <div className="egypt-backdrop">
          <EgyptianBakerySVG ovenGlow={egyptOvenGlow} />
        </div>
        
        <div className="egypt-content">
          <div className="movement-label reveal">MOVEMENT V</div>
          <h2 className="section-heading reveal">The Egyptian Mastery</h2>
          
          <div className="voice-block reveal">
            <Voice voice="seen">
              Along the Nile, conical clay ovens dot the landscape. Workers are paid in loaves.
            </Voice>
            
            <Voice voice="unseen">
              {`The Egyptians didn't just bake bread—they built a civilization upon it. Bread was currency, sacrament, and identity.`}
            </Voice>
            
            <Voice voice="eternal">
              To control bread is to control everything.
            </Voice>
          </div>
          
          <div className="narrative-block reveal">
            <p className="scientific-note">
              <span className="era-badge">4,000 BCE</span>
              {`Ancient Egypt elevated breadmaking from subsistence to art. Archaeological evidence from tomb paintings, wooden models, and remarkably preserved loaves reveals a sophisticated baking industry. Delwen Samuel's microscopic analysis of 3,000-year-old bread samples (1996) identified cell structures remarkably similar to modern sourdough.`}
            </p>
          </div>
          
          <div className="deep-narrative reveal">
            <h3 className="subsection-title">Bread as Economy</h3>
            <p>
              {`The Great Pyramid of Giza wasn't built by slaves—it was built by paid workers, and their wages were measured in bread and beer. Papyrus records detail daily rations: 10 loaves and a measure of beer per worker, with supervisors receiving more. The bakeries that fed pyramid construction were industrial operations, producing thousands of loaves daily.`}
            </p>
            <p>
              Egyptian bread came in at least 40 distinct varieties, from simple emmer loaves to elaborate festival breads shaped like lotus flowers, fish, or sacred symbols. The hieroglyph for bread (𓏋) appears in countless contexts—it was one of the most fundamental concepts in Egyptian writing.
            </p>
          </div>
          
          <div className="stat-highlight reveal">
            <div className="stat-item">
              <span className="stat-number">40+</span>
              <span className="stat-label">varieties of bread documented in ancient Egypt</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10</span>
              <span className="stat-label">loaves daily wage for pyramid workers</span>
            </div>
          </div>
          
          <div className="deep-narrative reveal">
            <h3 className="subsection-title">Sacred Technology</h3>
            <p>
              {`Egyptian bakers developed the closed oven—a dome-shaped structure that retained heat and allowed consistent temperatures. They understood sourdough fermentation, maintaining "mother" cultures passed from batch to batch. Tomb models show complete bakeries with dough bowls, proving trays, and specialized tools.`}
            </p>
            <p>
              {`Bread accompanied the dead into the afterlife. Loaves placed in tombs were meant to sustain the `}<em>ka</em>{` (spirit) on its eternal journey. Many of these ritual loaves, preserved by Egypt's dry climate, survive today in museum collections—edible artifacts from 3,000 years past.`}
            </p>
          </div>
          
          <blockquote className="featured-quote reveal">
            <p>{`"The analysis of Egyptian bread samples shows that the ancient Egyptians used complex fermentation processes similar to those of modern sourdough bread production."`}</p>
            <cite>— Dr. Delwen Samuel, Science, 1996</cite>
          </blockquote>
        </div>
      </section>

      {/* ==========================================
          MOVEMENT VI — THE SPREADING WEB
          Timeline of Bread's Journey
          ========================================== */}
      <section 
        className="movement movement-timeline"
        ref={(el) => { movementRefs.current[6] = el; }}
        aria-label="Movement VI: The Spreading Web"
      >
        <div className="timeline-content">
          <div className="movement-label reveal">MOVEMENT VI</div>
          <h2 className="section-heading reveal">The Spreading Web</h2>
          
          <div className="voice-block reveal">
            <Voice voice="unseen">
              From the Fertile Crescent, bread traveled with humans across the planet—adapting, transforming, becoming.
            </Voice>
          </div>
          
          <div className="timeline-visual reveal">
            <BreadTimelineSVG progress={timelineProgress} />
          </div>
          
          <div className="timeline-narrative">
            <div className="timeline-era reveal">
              <h3>Greece & Rome <span className="era-date">800 BCE – 400 CE</span></h3>
              <p>
                {`The Greeks established professional bakers (`}<em>artokopos</em>{`) and developed white bread as a luxury. Romans industrialized production—by 100 CE, Rome had 329 commercial bakeries. The `}<em>annona</em>{` (grain dole) distributed free bread to citizens, making grain supply a matter of political survival.`}
              </p>
            </div>
            
            <div className="timeline-era reveal">
              <h3>Medieval Europe <span className="era-date">500 – 1500 CE</span></h3>
              <p>
                Dark rye bread sustained peasants through harsh winters. Lords controlled mills and ovens, extracting fees from every loaf. Monasteries became centers of baking innovation, developing new techniques and preserving ancient knowledge through the Dark Ages.
              </p>
            </div>
            
            <div className="timeline-era reveal">
              <h3>The Industrial Revolution <span className="era-date">1800 – 1900 CE</span></h3>
              <p>
                {`Roller mills replaced stone grinding, producing fine white flour at unprecedented scale. Commercial yeast (Louis Pasteur's pure cultures, 1857) eliminated the unpredictability of wild fermentation. The Chorleywood Bread Process (1961) accelerated production but divorced bread from craft.`}
              </p>
            </div>
            
            <div className="timeline-era reveal">
              <h3>The Modern Renaissance <span className="era-date">1990 – Present</span></h3>
              <p>
                A counter-movement emerged. Artisan bakers revived sourdough, ancient grains returned to bakeries, and consumers rediscovered the connection between good bread and patient fermentation. The 2020 pandemic sparked a global sourdough revival, as millions discovered the meditative rhythm of feeding starter cultures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          MOVEMENT VII — THE MODERN ECHO
          Global Threads Mode
          ========================================== */}
      <section 
        className="movement movement-echo"
        ref={(el) => { movementRefs.current[7] = el; }}
        aria-label="Movement VII: The Modern Echo"
      >
        <div className="echo-content">
          <div className="movement-label reveal">MOVEMENT VII</div>
          <h2 className="section-heading reveal">The Modern Echo</h2>
          
          <p className="echo-intro reveal">
            Today, bread takes a thousand forms across every culture—yet all trace back to that first moment when grain met stone, when accident met observation, when hunger met imagination.
          </p>
          
          <div className="network-stage reveal">
            <GlobalNetworkSVG pulseIntensity={networkPulse} />
          </div>
          
          <div className="global-traditions reveal">
            <div className="tradition-grid">
              <div className="tradition-item">
                <h4>Naan & Roti</h4>
                <p>{`South Asia's tandoor-baked flatbreads, descended from ancient Persian traditions`}</p>
              </div>
              <div className="tradition-item">
                <h4>Tortilla</h4>
                <p>{`Mesoamerica's corn-based bread, nixtamalized for 3,500 years`}</p>
              </div>
              <div className="tradition-item">
                <h4>Baguette</h4>
                <p>{`France's iconic loaf, legally regulated for shape and ingredients`}</p>
              </div>
              <div className="tradition-item">
                <h4>Injera</h4>
                <p>{`Ethiopia's sourdough flatbread, fermented with teff flour`}</p>
              </div>
              <div className="tradition-item">
                <h4>Pita</h4>
                <p>The pocket bread of the Levant, unchanged for millennia</p>
              </div>
              <div className="tradition-item">
                <h4>Mantou</h4>
                <p>{`China's steamed bread, rising in bamboo instead of ovens`}</p>
              </div>
            </div>
          </div>
          
          <div className="echo-closing reveal">
            <Voice voice="eternal">
              What began as accident became ritual. What was survival became culture.
              In every loaf, the memory of ten thousand generations.
            </Voice>
          </div>
          
          <div className="final-reflection reveal">
            <p>
              The next time you tear a piece of bread, pause. In your hands is 30,000 years of human ingenuity—the accumulated wisdom of countless ancestors who learned to transform tough grass seeds into nourishment. That simple act connects you to Paleolithic grinders, Natufian bakers, Egyptian priests, Roman citizens, medieval peasants, and artisan craftspeople. 
            </p>
            <p>
              {`Bread is not merely food. It is memory made edible. It is civilization's first and most enduring technology. It is, in the most literal sense, what made us human.`}
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          SOURCES & FURTHER READING
          ========================================== */}
      <section className="sources-section" aria-label="Sources and Further Reading">
        <div className="sources-container">
          <h3 className="sources-title">Sources & Further Reading</h3>
          <ul className="sources-list">
            {sources.map((source, index) => (
              <li key={index}>
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
          <p className="sources-note">
            This narrative draws from peer-reviewed archaeological research and authoritative historical scholarship.
          </p>
        </div>
      </section>

      {/* ==========================================
          STORY END
          ========================================== */}
      <footer className="story-footer">
        <div className="footer-emblem" aria-hidden="true">
          <svg viewBox="0 0 60 40">
            <ellipse cx="30" cy="25" rx="22" ry="12" fill="#C7A43C" opacity="0.8" />
            <path d="M12,23 Q30,15 48,23" stroke="#8B7355" strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </div>
        <p className="footer-text">
          Grain remembers. Stone remembers. Fire remembers.
          <br />In every rising loaf, the echo of our beginning.
        </p>
        <span className="footer-mark">An Esy Visual Essay</span>
      </footer>
    </article>
  );
}

