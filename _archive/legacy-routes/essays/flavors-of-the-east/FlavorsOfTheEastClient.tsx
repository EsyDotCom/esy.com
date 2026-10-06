"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './flavors-of-the-east.css';

/*
 * FLAVORS OF THE EAST - A Culinary Journey Through Asia
 * China → Thailand → Myanmar
 * 
 * Design Research Report:
 * 
 * Visual Archaeology:
 * - Traditional Asian kitchen aesthetics (wok stations, bamboo steamers)
 * - Food macro photography (steam, texture, oil sheen)
 * - Antique trade route maps with watercolor styling
 * - Regional color palettes rooted in local ingredients
 * 
 * Color Palette (Material-Derived):
 * - China: Imperial red (#C41E3A), gold (#D4AF37), cast-iron black (#1a1a1a)
 * - Thailand: Citrus green (#7CB342), chili red (#E53935), tamarind brown (#6D4C41)
 * - Myanmar: Turmeric gold (#FFC107), river blue (#4FC3F7), earth tone (#8D6E63)
 * 
 * UNIQUE MECHANICS (Anti-Pattern Applied):
 * ✅ Aroma trails — visual steam/spice particles rising on scroll
 * ✅ Ingredient morphing — soybeans→soy sauce, tea→lahpet
 * ✅ Map scroll transitions with glowing trade routes
 * ✅ Chopstick progress meter
 * ✅ Tap-to-explore ingredient capsules with modal details
 * ✅ Loop animation for Tom Yum swirling broth
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

interface Ingredient {
  id: string;
  name: string;
  origin: string;
  role: string;
  tastingNotes: string;
  icon: React.ReactNode;
  color: string;
}

interface IngredientCapsuleProps {
  ingredient: Ingredient;
  onTap: (ingredient: Ingredient) => void;
}

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

// ============================================
// INGREDIENT DATA
// ============================================

const INGREDIENTS: Record<string, Ingredient> = {
  soy: {
    id: 'soy',
    name: 'Soy Sauce',
    origin: 'China, 2nd century BCE',
    role: 'The foundation of East Asian umami — fermented soybeans create depth in everything from stir-fries to marinades.',
    tastingNotes: 'Deep, salty, with caramel undertones and a fermented complexity that builds on the palate.',
    icon: (
      <svg viewBox="0 0 40 40" role="img" aria-label="Soy sauce bottle">
        <title>Soy Sauce</title>
        <rect x="14" y="8" width="12" height="24" rx="2" fill="#3d2314" />
        <rect x="16" y="10" width="8" height="4" rx="1" fill="#1a0f0a" />
        <ellipse cx="20" cy="28" rx="4" ry="2" fill="#1a0f0a" opacity="0.5" />
      </svg>
    ),
    color: '#3d2314',
  },
  fishSauce: {
    id: 'fishSauce',
    name: 'Fish Sauce (Nam Pla)',
    origin: 'Southeast Asia, 2,000+ years',
    role: 'The invisible backbone of Thai cuisine — adds umami without a fishy taste when used correctly.',
    tastingNotes: 'Pungent, briny, with an intense savory depth that transforms dishes without overwhelming them.',
    icon: (
      <svg viewBox="0 0 40 40" role="img" aria-label="Fish sauce bottle">
        <title>Fish Sauce</title>
        <path d="M15 8 L25 8 L27 32 L13 32 Z" fill="#8B4513" />
        <ellipse cx="20" cy="32" rx="7" ry="2" fill="#654321" />
        <path d="M17 12 Q20 14 23 12" stroke="#D2691E" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    color: '#8B4513',
  },
  lemongrass: {
    id: 'lemongrass',
    name: 'Lemongrass',
    origin: 'South & Southeast Asia',
    role: 'The aromatic spine of Thai soups and curries — citrusy, fresh, and unmistakably tropical.',
    tastingNotes: 'Bright citrus with ginger undertones, floral and clean, with a subtle minty finish.',
    icon: (
      <svg viewBox="0 0 40 40" role="img" aria-label="Lemongrass stalk">
        <title>Lemongrass</title>
        <path d="M20 35 Q18 25 20 15 Q22 5 24 2" stroke="#7CB342" strokeWidth="3" fill="none" />
        <path d="M20 35 Q22 25 20 15 Q18 5 16 2" stroke="#8BC34A" strokeWidth="2" fill="none" />
        <ellipse cx="20" cy="36" rx="3" ry="2" fill="#4CAF50" />
      </svg>
    ),
    color: '#7CB342',
  },
  turmeric: {
    id: 'turmeric',
    name: 'Turmeric',
    origin: 'India & Southeast Asia',
    role: 'The golden thread of Myanmar cuisine — earthy, medicinal, and visually striking.',
    tastingNotes: 'Earthy and slightly bitter with warm, peppery undertones and a mustard-like pungency.',
    icon: (
      <svg viewBox="0 0 40 40" role="img" aria-label="Turmeric root">
        <title>Turmeric</title>
        <ellipse cx="20" cy="25" rx="8" ry="5" fill="#FFC107" />
        <path d="M18 20 Q20 10 22 20" stroke="#FF9800" strokeWidth="2" fill="none" />
        <circle cx="20" cy="25" r="3" fill="#FFD54F" />
      </svg>
    ),
    color: '#FFC107',
  },
  galangal: {
    id: 'galangal',
    name: 'Galangal',
    origin: 'Indonesia, spread to Thailand',
    role: 'Tom Yum\'s secret weapon — sharper and more piney than ginger, with a medicinal edge.',
    tastingNotes: 'Pine-forward with citrus and pepper notes, more aromatic and less spicy than ginger.',
    icon: (
      <svg viewBox="0 0 40 40" role="img" aria-label="Galangal root">
        <title>Galangal</title>
        <ellipse cx="20" cy="24" rx="10" ry="6" fill="#D7CCC8" />
        <ellipse cx="16" cy="22" rx="4" ry="3" fill="#BCAAA4" />
        <ellipse cx="25" cy="26" rx="3" ry="2" fill="#A1887F" />
        <path d="M20 18 L22 8" stroke="#8D6E63" strokeWidth="2" />
      </svg>
    ),
    color: '#D7CCC8',
  },
  tamarind: {
    id: 'tamarind',
    name: 'Tamarind',
    origin: 'Africa, adopted across Asia',
    role: 'The sour soul of Pad Thai — tangy, fruity, and essential for balance.',
    tastingNotes: 'Sweet-tart with date-like fruitiness, complex acidity that brightens heavy dishes.',
    icon: (
      <svg viewBox="0 0 40 40" role="img" aria-label="Tamarind pod">
        <title>Tamarind</title>
        <ellipse cx="20" cy="22" rx="12" ry="6" fill="#6D4C41" />
        <path d="M10 22 Q12 18 16 20" stroke="#5D4037" strokeWidth="2" fill="none" />
        <ellipse cx="20" cy="22" rx="6" ry="3" fill="#4E342E" />
      </svg>
    ),
    color: '#6D4C41',
  },
  fermentedTea: {
    id: 'fermentedTea',
    name: 'Fermented Tea (Lahpet)',
    origin: 'Myanmar (Burma)',
    role: 'The national treasure of Myanmar — tea leaves fermented and eaten as salad.',
    tastingNotes: 'Tangy, slightly bitter, with earthy depth and a caffeinated kick.',
    icon: (
      <svg viewBox="0 0 40 40" role="img" aria-label="Fermented tea leaves">
        <title>Fermented Tea Leaves</title>
        <ellipse cx="20" cy="26" rx="10" ry="5" fill="#2E7D32" />
        <path d="M14 24 Q20 20 26 24" fill="#388E3C" />
        <ellipse cx="20" cy="26" rx="6" ry="2" fill="#1B5E20" opacity="0.6" />
      </svg>
    ),
    color: '#2E7D32',
  },
  szechuanPepper: {
    id: 'szechuanPepper',
    name: 'Sichuan Peppercorn',
    origin: 'Sichuan Province, China',
    role: 'The numbing spark of Chinese cuisine — creates the famous "má là" sensation.',
    tastingNotes: 'Citrusy and floral with an electric, numbing tingle that awakens the palate.',
    icon: (
      <svg viewBox="0 0 40 40" role="img" aria-label="Sichuan peppercorns">
        <title>Sichuan Peppercorn</title>
        <circle cx="20" cy="20" r="4" fill="#8B0000" />
        <circle cx="14" cy="18" r="3" fill="#A52A2A" />
        <circle cx="26" cy="22" r="3" fill="#A52A2A" />
        <circle cx="18" cy="26" r="2.5" fill="#8B0000" />
        <circle cx="24" cy="15" r="2.5" fill="#8B0000" />
      </svg>
    ),
    color: '#8B0000',
  },
  kafirLime: {
    id: 'kafirLime',
    name: 'Kaffir Lime Leaf',
    origin: 'Southeast Asia',
    role: 'The aromatic signature of Thai cuisine — intensely citrusy and irreplaceable.',
    tastingNotes: 'Explosive citrus with floral complexity, more aromatic than any other lime.',
    icon: (
      <svg viewBox="0 0 40 40" role="img" aria-label="Kaffir lime leaves">
        <title>Kaffir Lime Leaf</title>
        <ellipse cx="16" cy="20" rx="6" ry="10" fill="#66BB6A" transform="rotate(-15 16 20)" />
        <ellipse cx="24" cy="20" rx="6" ry="10" fill="#4CAF50" transform="rotate(15 24 20)" />
        <line x1="20" y1="10" x2="20" y2="30" stroke="#2E7D32" strokeWidth="1" />
      </svg>
    ),
    color: '#66BB6A',
  },
};

// ============================================
// HOOKS
// ============================================

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = Math.min(window.scrollY / scrollHeight, 1);
      setProgress(currentProgress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return progress;
}

function useIntersectionObserver(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!hasAnimated) setHasAnimated(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '-5% 0px -10% 0px' }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, hasAnimated]);
  
  return { ref, isVisible, hasAnimated };
}

// ============================================
// COMPONENTS
// ============================================

// Chopstick Progress Meter
function ChopstickProgress({ progress }: { progress: number }) {
  return (
    <div className="chopstick-progress">
      <svg 
        viewBox="0 0 200 40" 
        className="chopstick-svg"
        role="img"
        aria-label={`Reading progress: ${Math.round(progress * 100)}%`}
      >
        <title>Reading Progress</title>
        <desc>A pair of chopsticks indicating scroll progress through the culinary journey</desc>
        {/* Left chopstick */}
        <rect 
          x="10" y="5" 
          width="180" height="6" 
          rx="3" 
          fill="#3d2314" 
          opacity="0.3"
        />
        <rect 
          x="10" y="5" 
          width={180 * progress} height="6" 
          rx="3" 
          fill="#8B4513"
          className="chopstick-fill"
        />
        {/* Right chopstick */}
        <rect 
          x="10" y="29" 
          width="180" height="6" 
          rx="3" 
          fill="#3d2314" 
          opacity="0.3"
        />
        <rect 
          x="10" y="29" 
          width={180 * progress} height="6" 
          rx="3" 
          fill="#A0522D"
          className="chopstick-fill"
        />
        {/* Tips */}
        <circle cx={10 + 180 * progress} cy="8" r="3" fill="#D2691E" />
        <circle cx={10 + 180 * progress} cy="32" r="3" fill="#CD853F" />
      </svg>
      <span className="progress-label">{Math.round(progress * 100)}%</span>
    </div>
  );
}

// Aroma Trail Particles
function AromaTrail({ type = 'steam', intensity = 1 }: { type?: 'steam' | 'spice' | 'herbs'; intensity?: number }) {
  return (
    <div className={`aroma-trail aroma-${type}`} style={{ opacity: intensity }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div 
          key={i} 
          className="aroma-particle"
          style={{
            left: `${10 + Math.random() * 80}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

// Ingredient Capsule
function IngredientCapsule({ ingredient, onTap }: IngredientCapsuleProps) {
  return (
    <button 
      className="ingredient-capsule"
      onClick={() => onTap(ingredient)}
      style={{ '--capsule-color': ingredient.color } as React.CSSProperties}
    >
      <div className="capsule-icon">{ingredient.icon}</div>
      <span className="capsule-name">{ingredient.name}</span>
      <div className="capsule-texture" />
    </button>
  );
}

// Ingredient Modal
function IngredientModal({ 
  ingredient, 
  onClose 
}: { 
  ingredient: Ingredient | null; 
  onClose: () => void;
}) {
  if (!ingredient) return null;
  
  return (
    <div className="ingredient-modal-overlay" onClick={onClose}>
      <div className="ingredient-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-icon">{ingredient.icon}</div>
        <h3 className="modal-name">{ingredient.name}</h3>
        <p className="modal-origin">{ingredient.origin}</p>
        <div className="modal-section">
          <h4>Cultural Role</h4>
          <p>{ingredient.role}</p>
        </div>
        <div className="modal-section">
          <h4>Tasting Notes</h4>
          <p>{ingredient.tastingNotes}</p>
        </div>
      </div>
    </div>
  );
}

// Section Wrapper
function Section({ id, className = '', children }: SectionProps) {
  const { ref, isVisible, hasAnimated } = useIntersectionObserver(0.15);
  
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id={id}
      className={`flavors-section ${className} ${isVisible ? 'visible' : ''} ${hasAnimated ? 'animated' : ''}`}
    >
      {children}
    </section>
  );
}

// Map Transition Component
function MapTransition({ 
  from, 
  to, 
  progress 
}: { 
  from: string; 
  to: string; 
  progress: number;
}) {
  return (
    <div className="map-transition">
      <svg 
        viewBox="0 0 800 400" 
        className="map-svg"
        role="img"
        aria-labelledby="map-title map-desc"
      >
        <title id="map-title">Culinary Trade Route Map</title>
        <desc id="map-desc">A stylized map of Asia showing the culinary journey from {from} to {to}, with an animated trade route connecting China, Thailand, and Myanmar</desc>
        {/* Watercolor background */}
        <defs>
          <filter id="watercolor">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" />
            <feDisplacementMap in="SourceGraphic" scale="10" />
          </filter>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C41E3A" />
            <stop offset="50%" stopColor="#7CB342" />
            <stop offset="100%" stopColor="#FFC107" />
          </linearGradient>
        </defs>
        
        {/* Simplified Asia outline */}
        <path 
          d="M100 100 Q200 80 350 120 Q500 100 600 150 Q700 200 750 300 Q650 350 500 320 Q350 350 200 300 Q100 250 100 100"
          fill="#f5f0e6"
          stroke="#d4c4a8"
          strokeWidth="2"
          filter="url(#watercolor)"
        />
        
        {/* China marker */}
        <circle cx="250" cy="150" r="12" fill="#C41E3A" opacity="0.8" />
        <text x="250" y="135" textAnchor="middle" className="map-label">China</text>
        
        {/* Thailand marker */}
        <circle cx="400" cy="250" r="12" fill="#7CB342" opacity="0.8" />
        <text x="400" y="235" textAnchor="middle" className="map-label">Thailand</text>
        
        {/* Myanmar marker */}
        <circle cx="350" cy="220" r="12" fill="#FFC107" opacity="0.8" />
        <text x="350" y="205" textAnchor="middle" className="map-label">Myanmar</text>
        
        {/* Trade route path */}
        <path 
          d="M250 150 Q300 180 350 220 Q375 235 400 250"
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="4"
          strokeDasharray="400"
          strokeDashoffset={400 - (400 * progress)}
          strokeLinecap="round"
          className="route-path"
        />
        
        {/* Glowing current position */}
        <circle 
          cx={250 + (150 * progress)} 
          cy={150 + (100 * progress)} 
          r="8" 
          fill="#fff"
          className="route-glow"
        />
      </svg>
      <div className="map-labels">
        <span className="from-label">{from}</span>
        <span className="arrow">→</span>
        <span className="to-label">{to}</span>
      </div>
    </div>
  );
}

// Ingredient Morph Animation
function IngredientMorph({ 
  stages 
}: { 
  stages: { name: string; visual: React.ReactNode }[];
}) {
  const { ref, isVisible } = useIntersectionObserver(0.3);
  const [currentStage, setCurrentStage] = useState(0);
  
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentStage((prev) => (prev + 1) % stages.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isVisible, stages.length]);
  
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="ingredient-morph">
      <div className="morph-container">
        {stages.map((stage, idx) => (
          <div 
            key={idx}
            className={`morph-stage ${idx === currentStage ? 'active' : ''}`}
          >
            <div className="morph-visual">{stage.visual}</div>
            <span className="morph-label">{stage.name}</span>
          </div>
        ))}
      </div>
      <div className="morph-indicators">
        {stages.map((_, idx) => (
          <span 
            key={idx} 
            className={`morph-dot ${idx === currentStage ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

// Tom Yum Swirl Animation
function TomYumSwirl() {
  const { ref, isVisible } = useIntersectionObserver(0.3);
  
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`tomyum-swirl ${isVisible ? 'active' : ''}`}>
      <svg 
        viewBox="0 0 300 300" 
        className="swirl-svg"
        role="img"
        aria-labelledby="tomyum-title tomyum-desc"
      >
        <title id="tomyum-title">Tom Yum Soup</title>
        <desc id="tomyum-desc">A steaming bowl of Thai Tom Yum soup with swirling broth containing lemongrass, galangal, kaffir lime leaves, chili, and shrimp, with rising steam</desc>
        {/* Broth gradient */}
        <defs>
          <radialGradient id="brothGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="60%" stopColor="#E53935" />
            <stop offset="100%" stopColor="#BF360C" />
          </radialGradient>
        </defs>
        
        {/* Bowl */}
        <ellipse cx="150" cy="150" rx="130" ry="130" fill="url(#brothGradient)" />
        
        {/* Swirling ingredients */}
        <g className="swirl-ingredients">
          {/* Lemongrass */}
          <rect x="100" y="80" width="40" height="8" rx="4" fill="#7CB342" className="swirl-item" />
          {/* Galangal */}
          <circle cx="200" cy="120" r="12" fill="#D7CCC8" className="swirl-item" style={{ animationDelay: '0.5s' }} />
          {/* Kaffir lime */}
          <ellipse cx="130" cy="200" rx="15" ry="8" fill="#66BB6A" className="swirl-item" style={{ animationDelay: '1s' }} />
          {/* Chili */}
          <ellipse cx="180" cy="180" rx="8" ry="18" fill="#E53935" className="swirl-item" style={{ animationDelay: '1.5s' }} />
          {/* Shrimp */}
          <path d="M220 160 Q230 150 225 140 Q220 150 210 155 Z" fill="#FF8A65" className="swirl-item" style={{ animationDelay: '2s' }} />
        </g>
        
        {/* Steam */}
        <g className="steam-lines">
          <path d="M120 50 Q125 30 120 10" stroke="rgba(255,255,255,0.6)" strokeWidth="3" fill="none" />
          <path d="M150 40 Q155 20 150 0" stroke="rgba(255,255,255,0.5)" strokeWidth="3" fill="none" />
          <path d="M180 50 Q185 30 180 10" stroke="rgba(255,255,255,0.6)" strokeWidth="3" fill="none" />
        </g>
      </svg>
    </div>
  );
}

// Wok Toss Animation
function WokToss({ ingredients }: { ingredients: string[] }) {
  const { ref, isVisible } = useIntersectionObserver(0.3);
  
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`wok-toss ${isVisible ? 'active' : ''}`}>
      <svg 
        viewBox="0 0 300 200" 
        className="wok-svg"
        role="img"
        aria-labelledby="wok-title wok-desc"
      >
        <title id="wok-title">Wok Stir-Fry</title>
        <desc id="wok-desc">An animated wok over flames with ingredients being tossed in the air, demonstrating the traditional stir-fry technique of wok hei</desc>
        {/* Wok */}
        <ellipse cx="150" cy="160" rx="120" ry="30" fill="#2d2d2d" />
        <path 
          d="M30 160 Q150 200 270 160 Q270 120 150 140 Q30 120 30 160" 
          fill="#1a1a1a"
        />
        
        {/* Handle */}
        <rect x="270" y="140" width="25" height="8" rx="2" fill="#5d3a1a" />
        
        {/* Fire */}
        <g className="wok-fire">
          <ellipse cx="100" cy="185" rx="15" ry="8" fill="#FF5722" opacity="0.8" />
          <ellipse cx="150" cy="190" rx="20" ry="10" fill="#FF9800" opacity="0.7" />
          <ellipse cx="200" cy="185" rx="15" ry="8" fill="#FF5722" opacity="0.8" />
        </g>
        
        {/* Tossing ingredients */}
        <g className="toss-items">
          <ellipse cx="120" cy="100" rx="10" ry="6" fill="#FFF8E1" className="toss-noodle" />
          <ellipse cx="150" cy="80" rx="12" ry="7" fill="#FFF8E1" className="toss-noodle" style={{ animationDelay: '0.2s' }} />
          <ellipse cx="180" cy="90" rx="10" ry="6" fill="#FFF8E1" className="toss-noodle" style={{ animationDelay: '0.4s' }} />
          <circle cx="140" cy="110" r="6" fill="#FF8A65" className="toss-shrimp" />
          <rect x="165" y="105" width="15" height="4" rx="2" fill="#7CB342" className="toss-chive" />
        </g>
      </svg>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function FlavorsOfTheEastClient() {
  const progress = useScrollProgress();
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [mapProgress, setMapProgress] = useState(0);
  const mapSectionRef = useRef<HTMLElement>(null);
  
  // Track map section scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (mapSectionRef.current) {
        const rect = mapSectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        
        if (sectionTop < viewportHeight && sectionTop + sectionHeight > 0) {
          const progress = Math.max(0, Math.min(1, 
            (viewportHeight - sectionTop) / (viewportHeight + sectionHeight)
          ));
          setMapProgress(progress);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleIngredientTap = useCallback((ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
  }, []);
  
  const closeModal = useCallback(() => {
    setSelectedIngredient(null);
  }, []);

  return (
    <div className="flavors-story">
      {/* Chopstick Progress */}
      <ChopstickProgress progress={progress} />
      
      {/* Ingredient Modal */}
      <IngredientModal ingredient={selectedIngredient} onClose={closeModal} />

      {/* ==================== HERO ==================== */}
      <Section id="hero" className="hero full-bleed">
        <div className="hero-background">
          <AromaTrail type="steam" intensity={0.8} />
          <div className="kitchen-glow" />
        </div>
        <div className="hero-content">
          <p className="hero-era">A Culinary Journey</p>
          <h1 className="hero-title">
            <span className="title-line">FLAVORS</span>
            <span className="title-line accent">OF THE</span>
            <span className="title-line">EAST</span>
          </h1>
          <p className="hero-tagline">Taste is history. Flavor is culture.</p>
          <p className="hero-description">
            From ancient Chinese fermentation to Myanmar&apos;s tea leaf salads — 
            explore how ingredients, geography, and tradition shaped the cuisines 
            of three nations.
          </p>
          <div className="hero-regions">
            <span className="region china">China</span>
            <span className="region-arrow">→</span>
            <span className="region thailand">Thailand</span>
            <span className="region-arrow">→</span>
            <span className="region myanmar">Myanmar</span>
          </div>
        </div>
        <div className="scroll-hint">
          <span>Scroll to begin the journey</span>
          <div className="scroll-bowl">🥢</div>
        </div>
      </Section>

      {/* ==================== CHINA: FOUNDATIONS ==================== */}
      <Section id="china-intro" className="chapter-intro china-theme">
        <div className="chapter-background">
          <div className="dragon-pattern" />
        </div>
        <div className="chapter-content">
          <span className="chapter-number">01</span>
          <h2 className="chapter-title">Ancient China</h2>
          <p className="chapter-subtitle">Foundations of East Asian Flavor</p>
          <p className="chapter-description">
            Over two millennia ago, Chinese cooks discovered the transformative 
            power of fermentation. From this single innovation, an entire vocabulary 
            of umami was born — one that would spread across Asia and define 
            the taste of a continent.
          </p>
        </div>
        <AromaTrail type="spice" intensity={0.6} />
      </Section>

      {/* Soy Sauce Origin */}
      <Section id="soy-sauce" className="ingredient-origin">
        <div className="origin-visual">
          <IngredientMorph
            stages={[
              { 
                name: 'Soybeans', 
                visual: (
                  <svg viewBox="0 0 100 100" role="img" aria-label="Raw soybeans">
                    <title>Soybeans</title>
                    <ellipse cx="30" cy="50" rx="12" ry="15" fill="#C9B896" />
                    <ellipse cx="50" cy="45" rx="12" ry="15" fill="#D4C8A8" />
                    <ellipse cx="70" cy="52" rx="12" ry="15" fill="#C9B896" />
                    <ellipse cx="40" cy="65" rx="10" ry="12" fill="#BFB38A" />
                    <ellipse cx="60" cy="62" rx="11" ry="13" fill="#C9B896" />
                  </svg>
                )
              },
              { 
                name: 'Fermentation', 
                visual: (
                  <svg viewBox="0 0 100 100" role="img" aria-label="Fermentation jar">
                    <title>Fermentation Process</title>
                    <rect x="25" y="30" width="50" height="50" rx="5" fill="#8B4513" />
                    <rect x="30" y="35" width="40" height="40" rx="3" fill="#3d2314" />
                    <circle cx="40" cy="50" r="4" fill="#5D4037" opacity="0.6" />
                    <circle cx="55" cy="55" r="3" fill="#5D4037" opacity="0.5" />
                    <circle cx="50" cy="45" r="5" fill="#5D4037" opacity="0.7" />
                    <path d="M35 60 Q50 58 65 60" stroke="#6D4C41" strokeWidth="2" fill="none" />
                  </svg>
                )
              },
              { 
                name: 'Soy Sauce', 
                visual: (
                  <svg viewBox="0 0 100 100" role="img" aria-label="Soy sauce bottle">
                    <title>Soy Sauce</title>
                    <rect x="35" y="20" width="30" height="60" rx="4" fill="#3d2314" />
                    <rect x="38" y="23" width="24" height="15" rx="2" fill="#1a0f0a" />
                    <ellipse cx="50" cy="70" rx="10" ry="3" fill="#1a0f0a" opacity="0.5" />
                    <path d="M42 45 L42 55 Q50 58 58 55 L58 45" fill="#2d1810" />
                  </svg>
                )
              },
            ]}
          />
        </div>
        <div className="origin-content">
          <h3 className="origin-title">The Birth of Umami</h3>
          <p className="origin-text">
            In the 2nd century BCE, Chinese cooks discovered that salting and 
            fermenting soybeans created a liquid with extraordinary depth — 
            <strong>jiàng yóu</strong>, the ancestor of soy sauce.
          </p>
          <p className="origin-text">
            This wasn&apos;t just seasoning. It was alchemy. The fermentation process 
            breaks proteins into amino acids, creating glutamates — the very 
            essence of umami, the &ldquo;fifth taste&rdquo; that wouldn&apos;t be scientifically 
            identified for another 2,000 years.
          </p>
          <div className="ingredient-row">
            <IngredientCapsule ingredient={INGREDIENTS.soy} onTap={handleIngredientTap} />
            <IngredientCapsule ingredient={INGREDIENTS.szechuanPepper} onTap={handleIngredientTap} />
          </div>
        </div>
      </Section>

      {/* Wok Innovation */}
      <Section id="wok" className="wok-section">
        <div className="wok-content">
          <h3 className="section-title">The Wok: Control Through Fire</h3>
          <p className="section-text">
            The round-bottomed wok, developed during the Han Dynasty, wasn&apos;t just 
            cookware — it was a revolution in heat control. Its shape concentrates 
            flame at the center while allowing ingredients to rest on cooler edges.
          </p>
          <p className="section-text">
            This enabled <strong>wok hei</strong> — the &ldquo;breath of the wok&rdquo; — 
            that smoky, charred essence that defines Cantonese stir-fry. It&apos;s the 
            flavor of 1,000°F iron meeting oil, protein, and vegetable in 
            millisecond bursts.
          </p>
        </div>
        <div className="wok-visual">
          <WokToss ingredients={['noodles', 'shrimp', 'chives']} />
          <AromaTrail type="steam" intensity={1} />
        </div>
      </Section>

      {/* ==================== LAN ZHOU NOODLES (Sticky Scroll) ==================== */}
      <Section id="lanzhou-noodles" className="sticky-section">
        <div className="sticky-visual">
          <svg 
            viewBox="0 0 400 400" 
            className="noodle-svg"
            role="img"
            aria-labelledby="lanzhou-title lanzhou-desc"
          >
            <title id="lanzhou-title">Lan Zhou Hand-Pulled Noodles</title>
            <desc id="lanzhou-desc">A steaming bowl of Lanzhou hand-pulled noodles in rich beef broth, topped with scallions, chili oil, and tender beef slices</desc>
            {/* Bowl */}
            <ellipse cx="200" cy="320" rx="150" ry="40" fill="#8B4513" />
            <ellipse cx="200" cy="280" rx="140" ry="100" fill="#D2691E" />
            <ellipse cx="200" cy="280" rx="130" ry="90" fill="#CD853F" />
            
            {/* Broth */}
            <ellipse cx="200" cy="280" rx="120" ry="80" fill="#8B0000" opacity="0.3" />
            
            {/* Noodles */}
            <g className="noodle-strands">
              <path d="M100 250 Q150 280 200 250 Q250 220 300 260" stroke="#FFF8E1" strokeWidth="8" fill="none" />
              <path d="M110 270 Q160 240 210 270 Q260 300 290 270" stroke="#FFFDE7" strokeWidth="7" fill="none" />
              <path d="M120 260 Q170 290 220 260 Q270 230 310 265" stroke="#FFF8E1" strokeWidth="8" fill="none" />
            </g>
            
            {/* Toppings */}
            <ellipse cx="150" cy="240" rx="20" ry="8" fill="#4CAF50" /> {/* Scallions */}
            <circle cx="250" cy="235" r="15" fill="#C41E3A" opacity="0.8" /> {/* Chili oil */}
            <ellipse cx="200" cy="220" rx="25" ry="12" fill="#8D6E63" /> {/* Beef */}
            
            {/* Steam */}
            <g className="bowl-steam">
              <path d="M160 180 Q165 150 160 120" stroke="rgba(255,255,255,0.5)" strokeWidth="4" fill="none" />
              <path d="M200 170 Q205 140 200 110" stroke="rgba(255,255,255,0.6)" strokeWidth="4" fill="none" />
              <path d="M240 180 Q245 150 240 120" stroke="rgba(255,255,255,0.5)" strokeWidth="4" fill="none" />
            </g>
          </svg>
        </div>
        <div className="sticky-content">
          <div className="sticky-scroll-text">
            <h3 className="dish-title">Lan Zhou Hand-Pulled Noodles</h3>
            <p className="dish-subtitle">兰州拉面 — The Art of Stretching</p>
            
            <div className="dish-block">
              <h4>Historical Evolution</h4>
              <p>
                Born in Lanzhou, Gansu Province, these noodles date to the 
                Qing Dynasty (1799). A Muslim chef named Ma Baozi perfected 
                the technique of pulling a single lump of dough into hundreds 
                of uniform strands — no knife required.
              </p>
            </div>
            
            <div className="dish-block">
              <h4>Seasoning Architecture</h4>
              <ul className="seasoning-list">
                <li><span className="cat">Aromatics:</span> Star anise, ginger, Sichuan peppercorn</li>
                <li><span className="cat">Base:</span> Beef bone broth, 8-hour simmer</li>
                <li><span className="cat">Heat:</span> Chili oil with toasted seeds</li>
                <li><span className="cat">Fresh:</span> Cilantro, scallion, white radish</li>
              </ul>
            </div>
            
            <div className="dish-block">
              <h4>Cultural Function</h4>
              <p>
                A breakfast staple across northern China, these noodles represent 
                the Hui Muslim culinary tradition. The beef-only broth (no pork) 
                reflects halal requirements, making this dish a symbol of 
                China&apos;s religious diversity expressed through food.
              </p>
            </div>
            
            <div className="ingredient-row">
              <IngredientCapsule ingredient={INGREDIENTS.szechuanPepper} onTap={handleIngredientTap} />
            </div>
          </div>
        </div>
      </Section>

      {/* ==================== MAP TRANSITION: CHINA → THAILAND ==================== */}
      <section 
        ref={mapSectionRef as React.RefObject<HTMLElement>} 
        className="flavors-section map-section"
        id="map-china-thailand"
      >
        <div className="map-container">
          <h3 className="map-title">The Southern Migration of Flavor</h3>
          <p className="map-description">
            Trade routes, river valleys, and migrating peoples carried Chinese 
            culinary techniques southward. In Thailand, they met tropical 
            ingredients and transformed into something entirely new.
          </p>
          <MapTransition from="China" to="Thailand" progress={mapProgress} />
        </div>
      </section>

      {/* ==================== THAILAND: BALANCE ==================== */}
      <Section id="thailand-intro" className="chapter-intro thailand-theme">
        <div className="chapter-background">
          <div className="lotus-pattern" />
        </div>
        <div className="chapter-content">
          <span className="chapter-number">02</span>
          <h2 className="chapter-title">Thailand</h2>
          <p className="chapter-subtitle">The Art of Balance</p>
          <p className="chapter-description">
            Thai cuisine is a high-wire act: sour, sweet, salty, spicy — all 
            in perfect tension. Where Chinese cooking often builds depth through 
            layering, Thai food creates harmony through contrast.
          </p>
        </div>
        <AromaTrail type="herbs" intensity={0.7} />
      </Section>

      {/* ==================== PAD THAI (Horizontal Gallery) ==================== */}
      <Section id="pad-thai" className="gallery-section">
        <h3 className="dish-title">Pad Thai</h3>
        <p className="dish-subtitle">ผัดไทย — A Nation&apos;s Identity on a Plate</p>
        
        <div className="horizontal-gallery">
          <div className="gallery-track">
            {/* Tamarind */}
            <div className="gallery-panel">
              <div className="panel-visual">
                <svg viewBox="0 0 150 150" role="img" aria-label="Tamarind pod">
                  <title>Tamarind</title>
                  <ellipse cx="75" cy="80" rx="50" ry="30" fill="#6D4C41" />
                  <ellipse cx="75" cy="80" rx="30" ry="15" fill="#4E342E" />
                  <path d="M40 80 Q50 70 65 75" stroke="#5D4037" strokeWidth="3" fill="none" />
                </svg>
              </div>
              <h4>Tamarind</h4>
              <p>The sour soul — fruity acidity that defines the dish&apos;s tang</p>
              <IngredientCapsule ingredient={INGREDIENTS.tamarind} onTap={handleIngredientTap} />
            </div>
            
            {/* Fish Sauce */}
            <div className="gallery-panel">
              <div className="panel-visual">
                <svg viewBox="0 0 150 150" role="img" aria-label="Fish sauce bottle">
                  <title>Fish Sauce</title>
                  <path d="M55 30 L95 30 L100 120 L50 120 Z" fill="#8B4513" />
                  <ellipse cx="75" cy="120" rx="25" ry="8" fill="#654321" />
                  <rect x="60" y="35" width="30" height="10" rx="2" fill="#D2691E" />
                </svg>
              </div>
              <h4>Fish Sauce</h4>
              <p>Umami backbone — fermented anchovies transformed into liquid depth</p>
              <IngredientCapsule ingredient={INGREDIENTS.fishSauce} onTap={handleIngredientTap} />
            </div>
            
            {/* Palm Sugar */}
            <div className="gallery-panel">
              <div className="panel-visual">
                <svg viewBox="0 0 150 150" role="img" aria-label="Palm sugar disc">
                  <title>Palm Sugar</title>
                  <circle cx="75" cy="80" r="35" fill="#D4A574" />
                  <ellipse cx="75" cy="80" rx="25" ry="20" fill="#C4956A" />
                  <path d="M55 75 Q75 85 95 75" stroke="#8B6914" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <h4>Palm Sugar</h4>
              <p>Caramel sweetness — balances the sour and salty with mellow depth</p>
            </div>
            
            {/* Dried Shrimp */}
            <div className="gallery-panel">
              <div className="panel-visual">
                <svg viewBox="0 0 150 150" role="img" aria-label="Dried shrimp">
                  <title>Dried Shrimp</title>
                  <path d="M50 70 Q65 55 80 60 Q95 65 90 80 Q85 95 70 90 Q55 85 50 70" fill="#FF8A65" />
                  <path d="M70 70 Q75 65 80 70" stroke="#E64A19" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <h4>Dried Shrimp</h4>
              <p>Ocean essence — concentrated brininess and satisfying chew</p>
            </div>
            
            {/* Roasted Peanuts */}
            <div className="gallery-panel">
              <div className="panel-visual">
                <svg viewBox="0 0 150 150" role="img" aria-label="Roasted peanuts">
                  <title>Roasted Peanuts</title>
                  <ellipse cx="60" cy="75" rx="15" ry="20" fill="#D4A574" />
                  <ellipse cx="90" cy="80" rx="15" ry="18" fill="#C9A066" />
                  <ellipse cx="75" cy="90" rx="12" ry="16" fill="#D4A574" />
                  <ellipse cx="70" cy="65" rx="10" ry="14" fill="#C9A066" />
                </svg>
              </div>
              <h4>Roasted Peanuts</h4>
              <p>Crunch and richness — textural contrast and nutty sweetness</p>
            </div>
            
            {/* Chili */}
            <div className="gallery-panel">
              <div className="panel-visual">
                <svg viewBox="0 0 150 150" role="img" aria-label="Red chili pepper">
                  <title>Chili Flakes</title>
                  <path d="M65 100 Q60 70 70 40 Q75 35 80 40 Q90 70 85 100 Q75 110 65 100" fill="#E53935" />
                  <path d="M70 40 L70 25 Q75 20 80 25 L80 40" fill="#4CAF50" />
                </svg>
              </div>
              <h4>Chili Flakes</h4>
              <p>The heat — smoky, fruity burn that lingers and elevates</p>
            </div>
          </div>
        </div>
        
        <div className="wok-toss-container">
          <WokToss ingredients={['noodles', 'shrimp', 'egg', 'tofu']} />
        </div>
        
        <div className="dish-history">
          <h4>Historical Evolution</h4>
          <p>
            Pad Thai was invented in the 1930s as part of Prime Minister Phibun&apos;s 
            nation-building campaign. Facing rice shortages, the government promoted 
            noodles as an alternative. The dish was deliberately designed to showcase 
            Thai ingredients and create a symbol of national identity.
          </p>
        </div>
      </Section>

      {/* ==================== TOM YUM (Loop Animation) ==================== */}
      <Section id="tom-yum" className="loop-section">
        <div className="loop-visual">
          <TomYumSwirl />
          <AromaTrail type="herbs" intensity={1} />
        </div>
        <div className="loop-content">
          <h3 className="dish-title">Tom Yum</h3>
          <p className="dish-subtitle">ต้มยำ — The Spicy-Sour Symphony</p>
          
          <p className="dish-text">
            Tom Yum is Thailand&apos;s gift to the world: a broth that attacks every 
            tastebud simultaneously. Hot, sour, salty, fragrant — and somehow, 
            perfectly balanced.
          </p>
          
          <div className="swirl-ingredients-list">
            <h4>The Essential Five</h4>
            <div className="ingredient-grid">
              <IngredientCapsule ingredient={INGREDIENTS.lemongrass} onTap={handleIngredientTap} />
              <IngredientCapsule ingredient={INGREDIENTS.galangal} onTap={handleIngredientTap} />
              <IngredientCapsule ingredient={INGREDIENTS.kafirLime} onTap={handleIngredientTap} />
              <IngredientCapsule ingredient={INGREDIENTS.fishSauce} onTap={handleIngredientTap} />
            </div>
          </div>
          
          <div className="dish-block">
            <h4>Cultural Function</h4>
            <p>
              Tom Yum isn&apos;t just soup — it&apos;s medicine. Thai tradition holds that 
              the aromatics clear sinuses, the chili boosts metabolism, and the 
              herbs aid digestion. It&apos;s served at the first sign of a cold and 
              after heavy meals alike.
            </p>
          </div>
        </div>
      </Section>

      {/* ==================== MAP TRANSITION: THAILAND → MYANMAR ==================== */}
      <Section id="map-thailand-myanmar" className="map-section">
        <div className="map-container">
          <h3 className="map-title">Westward to the River Valleys</h3>
          <p className="map-description">
            Crossing the Tenasserim Range into Myanmar, we enter a cuisine 
            shaped by the Irrawaddy River, Indian influences, and a unique 
            tradition of fermented tea.
          </p>
          <MapTransition from="Thailand" to="Myanmar" progress={mapProgress} />
        </div>
      </Section>

      {/* ==================== MYANMAR: FERMENTATION ==================== */}
      <Section id="myanmar-intro" className="chapter-intro myanmar-theme">
        <div className="chapter-background">
          <div className="wave-pattern" />
        </div>
        <div className="chapter-content">
          <span className="chapter-number">03</span>
          <h2 className="chapter-title">Myanmar</h2>
          <p className="chapter-subtitle">Where Tea Becomes Food</p>
          <p className="chapter-description">
            Myanmar&apos;s cuisine sits at a crossroads: Chinese noodles meet Indian 
            spices, Thai aromatics blend with Burmese fermentation. The result 
            is unlike anywhere else — earthy, oily, and punctuated by the 
            singular taste of fermented tea leaves.
          </p>
        </div>
        <AromaTrail type="spice" intensity={0.6} />
      </Section>

      {/* ==================== MOHINGA (Full-Bleed Hero) ==================== */}
      <Section id="mohinga" className="hero-dish full-bleed">
        <div className="hero-dish-background">
          <div className="golden-glow" />
          <AromaTrail type="steam" intensity={0.9} />
        </div>
        <div className="hero-dish-content">
          <h3 className="dish-title">Mohinga</h3>
          <p className="dish-subtitle">မုန့်ဟင်းခါး — The National Breakfast</p>
          
          <div className="mohinga-visual">
            <svg 
              viewBox="0 0 400 300" 
              className="mohinga-svg"
              role="img"
              aria-labelledby="mohinga-title mohinga-desc"
            >
              <title id="mohinga-title">Mohinga</title>
              <desc id="mohinga-desc">A steaming bowl of Mohinga, Myanmar&apos;s national breakfast dish, featuring golden turmeric-infused catfish broth with rice noodles, herbs, crispy fritters, and chili oil</desc>
              {/* Bowl */}
              <ellipse cx="200" cy="260" rx="160" ry="30" fill="#8D6E63" />
              <ellipse cx="200" cy="230" rx="150" ry="90" fill="#A1887F" />
              
              {/* Golden broth */}
              <ellipse cx="200" cy="220" rx="140" ry="80" fill="#FFC107" opacity="0.8" />
              <ellipse cx="200" cy="210" rx="130" ry="70" fill="#FFD54F" opacity="0.6" />
              
              {/* Noodles */}
              <path d="M100 200 Q150 220 200 200 Q250 180 300 210" stroke="#FFF8E1" strokeWidth="6" fill="none" />
              <path d="M110 215 Q160 195 210 215 Q260 235 290 210" stroke="#FFFDE7" strokeWidth="5" fill="none" />
              
              {/* Toppings */}
              <ellipse cx="150" cy="190" rx="15" ry="6" fill="#8BC34A" /> {/* Herbs */}
              <circle cx="250" cy="185" r="12" fill="#FF6F00" opacity="0.7" /> {/* Chili oil */}
              <ellipse cx="200" cy="180" rx="20" ry="8" fill="#D7CCC8" /> {/* Crispy fritters */}
              
              {/* Steam */}
              <g className="mohinga-steam">
                <path d="M150 140 Q155 100 150 60" stroke="rgba(255,255,255,0.5)" strokeWidth="4" fill="none" />
                <path d="M200 130 Q205 90 200 50" stroke="rgba(255,255,255,0.6)" strokeWidth="4" fill="none" />
                <path d="M250 140 Q255 100 250 60" stroke="rgba(255,255,255,0.5)" strokeWidth="4" fill="none" />
              </g>
            </svg>
          </div>
          
          <div className="dish-details">
            <div className="dish-block">
              <h4>Historical Evolution</h4>
              <p>
                Mohinga likely emerged from the confluence of Mon, Bamar, and 
                Indian culinary traditions. The catfish-based broth reflects 
                Myanmar&apos;s river culture, while rice noodles point to Chinese 
                influence. It became the national dish not by decree, but by 
                daily devotion — eaten at breakfast across the country.
              </p>
            </div>
            
            <div className="dish-block">
              <h4>Seasoning Architecture</h4>
              <ul className="seasoning-list">
                <li><span className="cat">Base:</span> Catfish, slow-simmered with banana stem</li>
                <li><span className="cat">Aromatics:</span> Lemongrass, ginger, garlic</li>
                <li><span className="cat">Color:</span> Turmeric, paprika</li>
                <li><span className="cat">Depth:</span> Fish sauce, fermented fish paste</li>
                <li><span className="cat">Texture:</span> Rice noodles, crispy fritters, boiled egg</li>
              </ul>
            </div>
            
            <div className="ingredient-row">
              <IngredientCapsule ingredient={INGREDIENTS.turmeric} onTap={handleIngredientTap} />
              <IngredientCapsule ingredient={INGREDIENTS.lemongrass} onTap={handleIngredientTap} />
              <IngredientCapsule ingredient={INGREDIENTS.fishSauce} onTap={handleIngredientTap} />
            </div>
          </div>
        </div>
      </Section>

      {/* ==================== LAHPET THOKE (Fermentation Sequence) ==================== */}
      <Section id="lahpet" className="fermentation-section">
        <h3 className="dish-title">Lahpet Thoke</h3>
        <p className="dish-subtitle">လက်ဖက်သုပ် — Fermented Tea Leaf Salad</p>
        
        <div className="fermentation-visual">
          <IngredientMorph
            stages={[
              { 
                name: 'Fresh Tea Leaves', 
                visual: (
                  <svg viewBox="0 0 120 120" role="img" aria-label="Fresh tea leaves on branch">
                    <title>Fresh Tea Leaves</title>
                    <ellipse cx="40" cy="50" rx="15" ry="25" fill="#4CAF50" transform="rotate(-20 40 50)" />
                    <ellipse cx="60" cy="45" rx="15" ry="25" fill="#66BB6A" transform="rotate(10 60 45)" />
                    <ellipse cx="80" cy="55" rx="15" ry="25" fill="#4CAF50" transform="rotate(20 80 55)" />
                    <line x1="60" y1="80" x2="60" y2="100" stroke="#8D6E63" strokeWidth="3" />
                  </svg>
                )
              },
              { 
                name: 'Fermentation Jar', 
                visual: (
                  <svg viewBox="0 0 120 120" role="img" aria-label="Fermentation jar with tea leaves">
                    <title>Fermentation Jar</title>
                    <rect x="30" y="25" width="60" height="70" rx="8" fill="#8D6E63" />
                    <rect x="35" y="30" width="50" height="60" rx="5" fill="#5D4037" />
                    <ellipse cx="60" cy="60" rx="20" ry="25" fill="#2E7D32" opacity="0.8" />
                    <rect x="35" y="20" width="50" height="10" rx="3" fill="#6D4C41" />
                    <circle cx="50" cy="50" r="3" fill="#1B5E20" opacity="0.6" />
                    <circle cx="70" cy="65" r="2" fill="#1B5E20" opacity="0.5" />
                  </svg>
                )
              },
              { 
                name: 'Lahpet Thoke', 
                visual: (
                  <svg viewBox="0 0 120 120" role="img" aria-label="Lahpet Thoke salad bowl">
                    <title>Lahpet Thoke</title>
                    <ellipse cx="60" cy="80" rx="45" ry="15" fill="#8D6E63" />
                    <ellipse cx="60" cy="65" rx="40" ry="25" fill="#A1887F" />
                    <ellipse cx="60" cy="60" rx="35" ry="20" fill="#2E7D32" />
                    {/* Toppings */}
                    <ellipse cx="45" cy="55" rx="8" ry="4" fill="#FFD54F" /> {/* Peanuts */}
                    <ellipse cx="75" cy="58" rx="6" ry="3" fill="#FFECB3" /> {/* Sesame */}
                    <ellipse cx="60" cy="50" rx="10" ry="5" fill="#FF7043" /> {/* Chili */}
                    <circle cx="50" cy="62" r="3" fill="#E8F5E9" /> {/* Garlic */}
                  </svg>
                )
              },
            ]}
          />
        </div>
        
        <div className="lahpet-content">
          <p className="dish-text">
            Lahpet is Myanmar&apos;s most distinctive contribution to world cuisine: 
            tea leaves, fermented for months, then dressed with oil and mixed 
            with an orchestra of crunchy toppings.
          </p>
          
          <div className="dish-block">
            <h4>Texture Symphony</h4>
            <ul className="texture-list">
              <li>🍃 Soft, tangy fermented tea leaves</li>
              <li>🥜 Crunchy roasted peanuts</li>
              <li>✨ Toasted sesame seeds</li>
              <li>🧄 Crispy fried garlic chips</li>
              <li>🌶️ Dried shrimp for brininess</li>
              <li>🫘 Split peas for earthy crunch</li>
            </ul>
          </div>
          
          <div className="dish-block">
            <h4>Cultural Function</h4>
            <p>
              In Myanmar, offering lahpet is a gesture of peace. Historically, 
              treaties were sealed by sharing this salad. Today, it&apos;s served 
              at weddings, funerals, and family gatherings alike — a bridge 
              between celebration and mourning.
            </p>
          </div>
          
          <div className="ingredient-row">
            <IngredientCapsule ingredient={INGREDIENTS.fermentedTea} onTap={handleIngredientTap} />
          </div>
        </div>
      </Section>

      {/* ==================== REGIONAL INGREDIENT MAP ==================== */}
      <Section id="ingredient-map" className="ingredient-map-section">
        <h3 className="section-title">The Flavor Map of Asia</h3>
        <p className="section-subtitle">Tap each category to explore regional ingredients</p>
        
        <div className="ingredient-categories">
          <div className="category-cluster fermented">
            <h4>Fermented Bases</h4>
            <div className="cluster-items">
              <IngredientCapsule ingredient={INGREDIENTS.soy} onTap={handleIngredientTap} />
              <IngredientCapsule ingredient={INGREDIENTS.fishSauce} onTap={handleIngredientTap} />
              <IngredientCapsule ingredient={INGREDIENTS.fermentedTea} onTap={handleIngredientTap} />
            </div>
          </div>
          
          <div className="category-cluster aromatics">
            <h4>Aromatics</h4>
            <div className="cluster-items">
              <IngredientCapsule ingredient={INGREDIENTS.lemongrass} onTap={handleIngredientTap} />
              <IngredientCapsule ingredient={INGREDIENTS.galangal} onTap={handleIngredientTap} />
              <IngredientCapsule ingredient={INGREDIENTS.kafirLime} onTap={handleIngredientTap} />
            </div>
          </div>
          
          <div className="category-cluster heat">
            <h4>Heat Sources</h4>
            <div className="cluster-items">
              <IngredientCapsule ingredient={INGREDIENTS.szechuanPepper} onTap={handleIngredientTap} />
            </div>
          </div>
          
          <div className="category-cluster color">
            <h4>Color & Depth</h4>
            <div className="cluster-items">
              <IngredientCapsule ingredient={INGREDIENTS.turmeric} onTap={handleIngredientTap} />
              <IngredientCapsule ingredient={INGREDIENTS.tamarind} onTap={handleIngredientTap} />
            </div>
          </div>
        </div>
      </Section>

      {/* ==================== CLOSING ==================== */}
      <Section id="closing" className="closing-section full-bleed">
        <div className="closing-background">
          <div className="ambient-glow" />
        </div>
        <div className="closing-content">
          <blockquote className="closing-quote">
            In every bowl is a story of people, places, and time.
          </blockquote>
          
          <div className="closing-dishes">
            <div className="dish-memory">
              <span className="dish-icon">🍜</span>
              <span className="dish-name">Lan Zhou Noodles</span>
            </div>
            <div className="dish-memory">
              <span className="dish-icon">🍲</span>
              <span className="dish-name">Pad Thai</span>
            </div>
            <div className="dish-memory">
              <span className="dish-icon">🥣</span>
              <span className="dish-name">Tom Yum</span>
            </div>
            <div className="dish-memory">
              <span className="dish-icon">🍛</span>
              <span className="dish-name">Mohinga</span>
            </div>
            <div className="dish-memory">
              <span className="dish-icon">🥗</span>
              <span className="dish-name">Lahpet Thoke</span>
            </div>
          </div>
          
          <p className="closing-text">
            These dishes are more than recipes. They&apos;re living documents — 
            testaments to trade routes walked, ingredients discovered, and 
            cultures intertwined. Each bite connects you to millennia of 
            human ingenuity, survival, and celebration.
          </p>
        </div>
      </Section>

      {/* ==================== SOURCES ==================== */}
      <section className="sources-section">
        <div className="sources-inner">
          <h3 className="sources-title">Sources & Further Reading</h3>
          <div className="sources-grid">
            <a href="https://www.britannica.com/topic/Chinese-cuisine" target="_blank" rel="noopener noreferrer">
              Encyclopædia Britannica: Chinese Cuisine
            </a>
            <a href="https://www.smithsonianmag.com/history/history-pad-thai-180973485/" target="_blank" rel="noopener noreferrer">
              Smithsonian: The History of Pad Thai
            </a>
            <a href="https://www.seriouseats.com/thai-cuisine-essential-guide" target="_blank" rel="noopener noreferrer">
              Serious Eats: Essential Guide to Thai Cuisine
            </a>
            <a href="https://www.saveur.com/article/Kitchen/The-Art-of-the-Wok/" target="_blank" rel="noopener noreferrer">
              Saveur: The Art of the Wok
            </a>
            <a href="https://www.bbc.com/travel/article/20190618-myanmars-beloved-breakfast" target="_blank" rel="noopener noreferrer">
              BBC Travel: Myanmar&apos;s Beloved Breakfast (Mohinga)
            </a>
            <a href="https://tastecooking.com/fermented-tea-leaves-myanmars-national-dish/" target="_blank" rel="noopener noreferrer">
              Taste: Fermented Tea Leaves - Myanmar&apos;s Lahpet
            </a>
            <a href="https://www.nationalgeographic.com/travel/article/asian-street-food-guide" target="_blank" rel="noopener noreferrer">
              National Geographic: Asian Street Food Guide
            </a>
            <a href="https://www.jstor.org/stable/10.7312/will17168" target="_blank" rel="noopener noreferrer">
              JSTOR: The Oxford Handbook of Food History
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}



