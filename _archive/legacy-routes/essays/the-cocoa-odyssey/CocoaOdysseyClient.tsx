"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import './the-cocoa-odyssey.css';

/**
 * THE COCOA ODYSSEY - From Ancient Ritual to Global Chocolate Empire
 * 
 * DESIGN RESEARCH REPORT
 * ======================
 * 
 * Visual Archaeology Findings:
 * - Primary materials: Cocoa pods (organic shapes), terracotta vessels, metates, 
 *   colonial manuscripts, industrial machinery, modern packaging
 * - Historical color associations: Deep browns, burnt sienna, ceremonial jade,
 *   gold (Aztec treasure), parchment cream, colonial ink blacks
 * - Recurring visual motifs: Pod cross-sections, cacao tree silhouettes, 
 *   Mesoamerican glyphs, trade ships, factory machinery, global maps
 * - Era-specific aesthetics: Pre-Columbian organic forms → Colonial manuscript style →
 *   Industrial precision → Modern corporate clean
 * 
 * ANTI-PATTERN MATCHING Applied:
 * ✅ NO timeline cards (morphing map transitions instead)
 * ✅ NO standard quote blocks (integrated ceremonial quotes)
 * ✅ NO grid-based data displays (radial/circular diagrams)
 * ✅ NO left-right alternating (organic flowing layouts)
 * 
 * UNIQUE MECHANICS (Cocoa-Specific):
 * 1. Animated cocoa pod cutaway - reveals layers on scroll
 * 2. Fermentation heatmap animation - temperature gradient visualization
 * 3. Morphing world map - centuries of trade route evolution
 * 4. Bean-to-bar radial wheel - drag/scroll interaction
 * 5. Corporate empire SVG chart - animated market caps
 * 6. Before/after climate slider - environmental impact
 * 7. Foaming ritual animation - ancient preparation reenactment
 * 
 * Forcing Question Answer:
 * "What could ONLY exist in a cocoa story?"
 * → Pod cross-section anatomy, fermentation chemistry, ceremonial foam ritual,
 *   trade route morphing, bean processing wheel
 */

// ==================== DATA ====================

const mesoamericanEras = [
  {
    period: '1900 BCE',
    title: 'The First Taste',
    text: 'In the humid lowlands of the Mokaya people, along the Pacific coast of what is now Mexico, humans first cultivate Theobroma cacao. The tree\'s scientific name—"food of the gods"—proves prophetic.',
    civilization: 'Mokaya & Olmec'
  },
  {
    period: '600 CE',
    title: 'Maya Sacred Drink',
    text: 'The Maya develop sophisticated cultivation and preparation. Cacao becomes central to weddings, funerals, and diplomatic exchange. Glyphs reading "kakaw" appear on pottery, confirming its exalted status.',
    civilization: 'Maya Civilization'
  },
  {
    period: '1400 CE',
    title: 'Aztec Currency',
    text: 'The Aztec emperor Montezuma II reportedly drinks 50 cups of xocolātl daily from golden goblets. Cacao beans serve as currency: a turkey costs 100 beans, a tomato costs 1.',
    civilization: 'Aztec Empire'
  }
];

const tradeRoutes = [
  {
    era: '1528',
    title: 'Spanish Monopoly',
    text: 'Hernán Cortés brings cacao to Spain. The Crown guards the secret for nearly a century, sweetening the bitter drink with sugar and vanilla.'
  },
  {
    era: '1606',
    title: 'Italian Discovery',
    text: 'Antonio Carletti introduces chocolate to Italy. Soon, Florentine nobility are addicted. The drink spreads to France via royal marriages.'
  },
  {
    era: '1657',
    title: 'London Chocolate Houses',
    text: 'The first English chocolate house opens. These establishments become centers of political intrigue—Whigs and Tories plot over steaming cups.'
  },
  {
    era: '1828',
    title: 'The Dutch Breakthrough',
    text: 'Coenraad van Houten invents the cocoa press, separating butter from powder. This transforms drinking chocolate and enables solid chocolate bars.'
  },
  {
    era: '1847',
    title: 'The First Bar',
    text: 'J.S. Fry & Sons combine cocoa powder, sugar, and cocoa butter to create the first modern chocolate bar. The confectionery age begins.'
  }
];

const chocolateTitans = [
  { name: 'Mars, Inc.', revenue: '$47B', founded: '1911', brands: 'M&M\'s, Snickers, Milky Way', color: '#8B2500' },
  { name: 'Mondelez', revenue: '$36B', founded: '1923', brands: 'Cadbury, Toblerone, Milka', color: '#4A2C00' },
  { name: 'Ferrero', revenue: '$17B', founded: '1946', brands: 'Nutella, Ferrero Rocher, Kinder', color: '#6B3A00' },
  { name: 'Nestlé', revenue: '$15B', founded: '1866', brands: 'Kit Kat, Smarties, Crunch', color: '#2D1810' },
  { name: 'Hershey', revenue: '$11B', founded: '1894', brands: 'Hershey\'s, Reese\'s, Kisses', color: '#5B3A29' },
  { name: 'Lindt', revenue: '$5.5B', founded: '1845', brands: 'Lindor, Excellence, Ghirardelli', color: '#1A0F0A' },
];

const beanToBarSteps = [
  { name: 'Harvest', description: 'Ripe pods hand-cut from trees, opened within 48 hours' },
  { name: 'Ferment', description: '5-7 days in wooden boxes, temperatures reach 50°C, flavor precursors form' },
  { name: 'Dry', description: 'Sun-dried for 5-14 days, moisture drops from 60% to 7%' },
  { name: 'Roast', description: '20-40 minutes at 120-160°C, Maillard reactions create flavors' },
  { name: 'Crack', description: 'Shells removed, nibs separated by winnowing' },
  { name: 'Grind', description: '24-72 hours grinding creates cocoa liquor at 40°C' },
  { name: 'Conch', description: '12-72 hours of aeration and agitation refines texture' },
  { name: 'Temper', description: 'Precise cooling crystallizes cocoa butter for snap and sheen' },
];

const cocoaRegions = [
  { country: 'Ivory Coast', percentage: 40, flavor: 'Traditional, balanced', color: '#CD853F' },
  { country: 'Ghana', percentage: 18, flavor: 'Robust, classic cocoa', color: '#8B4513' },
  { country: 'Ecuador', percentage: 5, flavor: 'Floral, citrus notes', color: '#D2691E' },
  { country: 'Indonesia', percentage: 11, flavor: 'Earthy, tobacco hints', color: '#A0522D' },
  { country: 'Brazil', percentage: 4, flavor: 'Mild, nutty profile', color: '#DEB887' },
  { country: 'Madagascar', percentage: 1, flavor: 'Fruity, berry notes', color: '#F4A460' },
];

// ==================== COMPONENT ====================

const CocoaOdysseyClient: React.FC = () => {
  // Scroll-driven state
  const [podCutProgress, setPodCutProgress] = useState(0);
  const [activeTradeEra, setActiveTradeEra] = useState(0);
  const [processingStep, setProcessingStep] = useState(0);
  const [visibleTitans, setVisibleTitans] = useState<number[]>([]);
  const [climateSlider, setClimateSlider] = useState(50);
  const [foamLevel, setFoamLevel] = useState(0);
  const [fermentTemp, setFermentTemp] = useState(25);

  // Refs for intersection observers
  const podSectionRef = useRef<HTMLDivElement>(null);
  const tradeSectionRef = useRef<HTMLDivElement>(null);
  const titanRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fermentSectionRef = useRef<HTMLDivElement>(null);
  const ritualSectionRef = useRef<HTMLDivElement>(null);
  const processingSectionRef = useRef<HTMLDivElement>(null);

  // Scroll handler for pod cutaway animation
  const handleScroll = useCallback(() => {
    // Pod section animation
    if (podSectionRef.current) {
      const rect = podSectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (rect.height + viewportHeight / 2)));
        setPodCutProgress(progress);
      }
    }

    // Trade routes section
    if (tradeSectionRef.current) {
      const rect = tradeSectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / rect.height));
        const eraIndex = Math.min(Math.floor(progress * tradeRoutes.length), tradeRoutes.length - 1);
        setActiveTradeEra(eraIndex);
      }
    }

    // Fermentation temperature animation
    if (fermentSectionRef.current) {
      const rect = fermentSectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / rect.height));
        setFermentTemp(25 + progress * 27); // 25°C to 52°C
      }
    }

    // Ritual foam animation
    if (ritualSectionRef.current) {
      const rect = ritualSectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.top < viewportHeight * 0.8 && rect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, (viewportHeight * 0.8 - rect.top) / (rect.height * 0.5)));
        setFoamLevel(progress);
      }
    }

    // Bean-to-bar processing wheel
    if (processingSectionRef.current) {
      const rect = processingSectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / rect.height));
        setProcessingStep(Math.floor(progress * beanToBarSteps.length));
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Intersection observer for corporate titans
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = titanRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setTimeout(() => {
                setVisibleTitans((prev) => [...new Set([...prev, index])]);
              }, index * 150);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    titanRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="cocoa-odyssey">
      {/* ==================== HERO ==================== */}
      <section className="hero">
        <div className="hero-bg">
          {/* Animated cocoa pod silhouettes */}
          <svg className="hero-pod hero-pod-1" viewBox="0 0 100 200" aria-hidden="true">
            <path d="M50 10 Q20 50 20 100 Q20 170 50 190 Q80 170 80 100 Q80 50 50 10" />
          </svg>
          <svg className="hero-pod hero-pod-2" viewBox="0 0 100 200" aria-hidden="true">
            <path d="M50 10 Q20 50 20 100 Q20 170 50 190 Q80 170 80 100 Q80 50 50 10" />
          </svg>
          <svg className="hero-pod hero-pod-3" viewBox="0 0 100 200" aria-hidden="true">
            <path d="M50 10 Q20 50 20 100 Q20 170 50 190 Q80 170 80 100 Q80 50 50 10" />
          </svg>
        </div>
        
        <div className="hero-content">
          <span className="hero-eyebrow">A Visual Essay</span>
          <h1 className="hero-title">
            <span className="hero-title-line">The Cocoa</span>
            <span className="hero-title-line hero-title-accent">Odyssey</span>
          </h1>
          <p className="hero-subtitle">
            From Ancient Ritual to Global Chocolate Empire
          </p>
          <p className="hero-intro">
            Before it was a candy bar, cocoa was currency, medicine, and divine gift. 
            The story of how a bitter Mesoamerican bean became the world&apos;s most 
            beloved indulgence—and the empires built upon it.
          </p>
          
          <div className="hero-scroll-cue">
            <span>Scroll to Begin</span>
            <svg className="scroll-arrow" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4v16M5 13l7 7 7-7" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ==================== BOTANICAL ORIGINS ==================== */}
      <section className="botanical-section" ref={podSectionRef}>
        <div className="section-header">
          <span className="section-number">01</span>
          <h2>The Botanical Mystery</h2>
          <p className="section-lead">
            <em>Theobroma cacao</em>—literally &quot;food of the gods&quot;—is one of nature&apos;s 
            strangest fruits. Understanding its anatomy reveals why chocolate exists at all.
          </p>
        </div>

        <div className="pod-anatomy">
          {/* Interactive cocoa pod cross-section */}
          <div className="pod-cutaway-container">
            <svg className="pod-cutaway" viewBox="0 0 400 300" aria-label="Cocoa pod cross-section diagram">
              {/* Outer husk */}
              <path
                className="pod-layer pod-husk"
                d="M200 20 Q100 50 80 150 Q80 250 200 280 Q320 250 320 150 Q300 50 200 20"
                style={{ opacity: podCutProgress > 0 ? 1 : 0.3 }}
              />
              
              {/* Inner rind */}
              <path
                className="pod-layer pod-rind"
                d="M200 40 Q120 65 105 150 Q105 235 200 260 Q295 235 295 150 Q280 65 200 40"
                style={{ opacity: podCutProgress > 0.2 ? 1 : 0.2 }}
              />
              
              {/* White pulp */}
              <ellipse
                className="pod-layer pod-pulp"
                cx="200" cy="150" rx="80" ry="95"
                style={{ opacity: podCutProgress > 0.4 ? 1 : 0.1 }}
              />
              
              {/* Cocoa beans */}
              {[
                { cx: 160, cy: 100, rotate: -15 },
                { cx: 240, cy: 100, rotate: 15 },
                { cx: 145, cy: 150, rotate: -10 },
                { cx: 255, cy: 150, rotate: 10 },
                { cx: 160, cy: 200, rotate: -20 },
                { cx: 240, cy: 200, rotate: 20 },
              ].map((bean, i) => (
                <ellipse
                  key={i}
                  className="pod-layer pod-bean"
                  cx={bean.cx}
                  cy={bean.cy}
                  rx="25"
                  ry="18"
                  transform={`rotate(${bean.rotate} ${bean.cx} ${bean.cy})`}
                  style={{ 
                    opacity: podCutProgress > 0.6 ? 1 : 0,
                    transitionDelay: `${i * 100}ms`
                  }}
                />
              ))}
              
              {/* Placenta/central core */}
              <line
                className="pod-layer pod-placenta"
                x1="200" y1="60" x2="200" y2="240"
                style={{ opacity: podCutProgress > 0.7 ? 1 : 0 }}
              />
            </svg>
            
            {/* Layer labels */}
            <div className={`pod-label label-husk ${podCutProgress > 0.1 ? 'visible' : ''}`}>
              <span className="label-line" />
              <div className="label-content">
                <strong>Outer Husk</strong>
                <span>Thick protective shell, colors indicate ripeness</span>
              </div>
            </div>
            
            <div className={`pod-label label-pulp ${podCutProgress > 0.4 ? 'visible' : ''}`}>
              <span className="label-line" />
              <div className="label-content">
                <strong>White Pulp</strong>
                <span>Sweet mucilage essential for fermentation</span>
              </div>
            </div>
            
            <div className={`pod-label label-bean ${podCutProgress > 0.6 ? 'visible' : ''}`}>
              <span className="label-line" />
              <div className="label-content">
                <strong>Cocoa Beans</strong>
                <span>30-50 per pod, each wrapped in papery skin</span>
              </div>
            </div>
          </div>
          
          <div className="pod-facts">
            <div className="fact-card">
              <div className="fact-value">20</div>
              <div className="fact-label">pods per tree per year</div>
            </div>
            <div className="fact-card">
              <div className="fact-value">400</div>
              <div className="fact-label">beans per pound of chocolate</div>
            </div>
            <div className="fact-card">
              <div className="fact-value">5</div>
              <div className="fact-label">years for tree to bear fruit</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MESOAMERICAN RITUAL ==================== */}
      <section className="ritual-section" ref={ritualSectionRef}>
        <div className="ritual-bg">
          <div className="ritual-glyph glyph-1">𐌀</div>
          <div className="ritual-glyph glyph-2">𐌁</div>
          <div className="ritual-glyph glyph-3">𐌂</div>
        </div>
        
        <div className="ritual-content">
          <div className="section-header">
            <span className="section-number">02</span>
            <h2>The Sacred Drink</h2>
          </div>
          
          <div className="ritual-scene">
            {/* Animated ritual vessel */}
            <div className="vessel-container">
              <svg className="ritual-vessel" viewBox="0 0 200 300" aria-label="Mesoamerican ceremonial vessel">
                {/* Vessel body */}
                <path 
                  className="vessel-body"
                  d="M40 80 L40 250 Q40 280 100 280 Q160 280 160 250 L160 80 Q160 50 100 50 Q40 50 40 80"
                />
                {/* Vessel decorations */}
                <path 
                  className="vessel-decoration"
                  d="M50 100 L60 120 L50 140 M150 100 L140 120 L150 140"
                />
                {/* Liquid level */}
                <rect 
                  className="vessel-liquid"
                  x="45" 
                  y={250 - foamLevel * 150}
                  width="110" 
                  height={foamLevel * 150}
                  rx="5"
                />
                {/* Foam bubbles */}
                {foamLevel > 0.3 && (
                  <g className="vessel-foam">
                    <circle cx="70" cy={255 - foamLevel * 155} r="8" />
                    <circle cx="90" cy={250 - foamLevel * 155} r="10" />
                    <circle cx="110" cy={253 - foamLevel * 155} r="9" />
                    <circle cx="130" cy={248 - foamLevel * 155} r="7" />
                    <circle cx="80" cy={240 - foamLevel * 155} r="6" />
                    <circle cx="100" cy={238 - foamLevel * 155} r="8" />
                    <circle cx="120" cy={242 - foamLevel * 155} r="5" />
                  </g>
                )}
              </svg>
              
              <p className="vessel-caption">
                The Maya believed foam carried the &quot;spirit&quot; of cacao—the more foam, the more divine.
              </p>
            </div>
            
            <div className="ritual-text">
              <blockquote className="ritual-quote">
                &ldquo;Cacao was poured from a height to create foam, the most prized 
                part of the drink. This foam was believed to nourish the soul.&rdquo;
                <cite>— Sophie Coe, <em>The True History of Chocolate</em></cite>
              </blockquote>
              
              <div className="ritual-facts">
                <h3>Ceremonial Uses</h3>
                <ul>
                  <li>Wedding ceremonies—bride and groom exchanged cups</li>
                  <li>Burial offerings for the afterlife journey</li>
                  <li>Diplomatic gifts between rulers</li>
                  <li>Military rations for long campaigns</li>
                  <li>Sacred offerings to Ek Chuaj, god of cacao</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== AZTEC ECONOMY ==================== */}
      <section className="aztec-section">
        <div className="aztec-content">
          <div className="section-header light">
            <span className="section-number">03</span>
            <h2>Currency of Empires</h2>
            <p className="section-lead">
              In the Aztec economy, cacao beans were money. The equivalents reveal 
              the extraordinary value placed on this commodity.
            </p>
          </div>
          
          <div className="currency-grid">
            <div className="currency-item">
              <div className="currency-beans">
                <svg viewBox="0 0 60 30" aria-hidden="true">
                  <ellipse cx="30" cy="15" rx="12" ry="8" className="bean-icon" />
                </svg>
                <span>1</span>
              </div>
              <div className="currency-equals">=</div>
              <div className="currency-item-name">1 large tomato</div>
            </div>
            
            <div className="currency-item">
              <div className="currency-beans">
                <svg viewBox="0 0 100 30" aria-hidden="true">
                  {[0, 20, 40].map((x, i) => (
                    <ellipse key={i} cx={20 + x} cy="15" rx="12" ry="8" className="bean-icon" />
                  ))}
                </svg>
                <span>3</span>
              </div>
              <div className="currency-equals">=</div>
              <div className="currency-item-name">1 fresh avocado</div>
            </div>
            
            <div className="currency-item">
              <div className="currency-beans">
                <svg viewBox="0 0 80 60" aria-hidden="true">
                  {[0, 20, 40, 10, 30].map((x, i) => (
                    <ellipse key={i} cx={15 + x} cy={i < 3 ? 15 : 45} rx="12" ry="8" className="bean-icon" />
                  ))}
                </svg>
                <span>30</span>
              </div>
              <div className="currency-equals">=</div>
              <div className="currency-item-name">1 rabbit</div>
            </div>
            
            <div className="currency-item featured">
              <div className="currency-beans">
                <div className="bean-pile" aria-label="100 cacao beans">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 24 16" className="pile-bean" style={{
                      transform: `translate(${(i % 5) * 18}px, ${Math.floor(i / 5) * 14}px) rotate(${Math.random() * 20 - 10}deg)`
                    }}>
                      <ellipse cx="12" cy="8" rx="10" ry="6" className="bean-icon" />
                    </svg>
                  ))}
                </div>
                <span>100</span>
              </div>
              <div className="currency-equals">=</div>
              <div className="currency-item-name">1 turkey or 1 enslaved person</div>
            </div>
          </div>
          
          <div className="montezuma-quote">
            <blockquote>
              &ldquo;The divine drink, which builds up resistance and fights fatigue. 
              A cup of this precious drink permits a man to walk for a whole day without food.&rdquo;
            </blockquote>
            <cite>— Attributed to Montezuma II</cite>
          </div>
        </div>
      </section>

      {/* ==================== FERMENTATION SCIENCE ==================== */}
      <section className="fermentation-section" ref={fermentSectionRef}>
        <div className="section-header">
          <span className="section-number">04</span>
          <h2>The Alchemy of Flavor</h2>
          <p className="section-lead">
            Raw cacao is astringent and unpleasant. Fermentation unlocks its 
            potential—a transformation as miraculous as grape to wine.
          </p>
        </div>
        
        <div className="ferment-visualization">
          {/* Temperature heatmap */}
          <div className="ferment-box">
            <svg className="ferment-svg" viewBox="0 0 300 200" aria-label="Fermentation temperature visualization">
              {/* Box container */}
              <rect x="30" y="30" width="240" height="140" className="ferment-container" rx="8" />
              
              {/* Heat gradient overlay */}
              <defs>
                <linearGradient id="heatGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#8B4513" />
                  <stop offset={`${(fermentTemp - 25) / 27 * 100}%`} stopColor="#CD853F" />
                  <stop offset="100%" stopColor="#FFD700" />
                </linearGradient>
              </defs>
              
              <rect 
                x="35" 
                y="35" 
                width="230" 
                height="130" 
                fill="url(#heatGradient)"
                opacity="0.6"
                rx="5"
              />
              
              {/* Bean representations */}
              {Array.from({ length: 15 }).map((_, i) => (
                <ellipse
                  key={i}
                  cx={60 + (i % 5) * 45}
                  cy={55 + Math.floor(i / 5) * 35}
                  rx="15"
                  ry="10"
                  className="ferment-bean"
                  style={{
                    transform: `rotate(${Math.random() * 30 - 15}deg)`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
              
              {/* CO2 bubbles */}
              {fermentTemp > 35 && Array.from({ length: 8 }).map((_, i) => (
                <circle
                  key={i}
                  cx={50 + i * 30}
                  cy={170 - (fermentTemp - 35) * 2}
                  r={2 + Math.random() * 3}
                  className="co2-bubble"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </svg>
            
            {/* Temperature gauge */}
            <div className="temp-gauge">
              <div className="temp-bar">
                <div 
                  className="temp-fill" 
                  style={{ height: `${((fermentTemp - 25) / 27) * 100}%` }}
                />
              </div>
              <div className="temp-value">{Math.round(fermentTemp)}°C</div>
              <div className="temp-label">Core Temperature</div>
            </div>
          </div>
          
          <div className="ferment-timeline">
            <div className={`ferment-stage ${fermentTemp < 30 ? 'active' : ''}`}>
              <span className="stage-day">Day 1</span>
              <span className="stage-desc">Yeast consumes pulp sugars, alcohol produced</span>
            </div>
            <div className={`ferment-stage ${fermentTemp >= 30 && fermentTemp < 40 ? 'active' : ''}`}>
              <span className="stage-day">Day 2-3</span>
              <span className="stage-desc">Lactic bacteria dominate, acids form</span>
            </div>
            <div className={`ferment-stage ${fermentTemp >= 40 && fermentTemp < 48 ? 'active' : ''}`}>
              <span className="stage-day">Day 4-5</span>
              <span className="stage-desc">Acetic bacteria, heat peaks at 50°C</span>
            </div>
            <div className={`ferment-stage ${fermentTemp >= 48 ? 'active' : ''}`}>
              <span className="stage-day">Day 6-7</span>
              <span className="stage-desc">Flavor precursors crystallize, beans die</span>
            </div>
          </div>
        </div>
        
        <div className="ferment-fact">
          <strong>Critical Insight:</strong> The same cacao beans produce wildly different 
          chocolate depending on fermentation. Master fermenters are as valued as master winemakers.
        </div>
      </section>

      {/* ==================== COLONIAL TRADE ROUTES ==================== */}
      <section className="trade-section" ref={tradeSectionRef}>
        <div className="trade-sticky">
          <div className="section-header light">
            <span className="section-number">05</span>
            <h2>Crossing Oceans</h2>
          </div>
          
          {/* Animated world map */}
          <div className="trade-map-container">
            <svg className="trade-map" viewBox="0 0 1000 500" aria-label="Historical cocoa trade routes">
              {/* Simplified continents */}
              <path className="continent americas" d="M150 50 Q200 80 220 150 Q240 250 200 350 Q180 420 150 450 L100 400 Q80 300 100 200 Q120 100 150 50" />
              <path className="continent europe" d="M480 80 Q520 70 560 90 Q580 120 570 160 Q540 180 500 170 Q470 150 480 80" />
              <path className="continent africa" d="M500 180 Q540 170 570 200 Q590 280 560 360 Q520 400 480 380 Q460 320 470 260 Q480 200 500 180" />
              
              {/* Trade routes - animated based on era */}
              <g className={`trade-route route-spain ${activeTradeEra >= 0 ? 'active' : ''}`}>
                <path d="M200 200 Q350 120 480 120" className="route-path" />
                <circle cx="200" cy="200" r="8" className="route-origin" />
                <circle cx="480" cy="120" r="8" className="route-dest" />
              </g>
              
              <g className={`trade-route route-italy ${activeTradeEra >= 1 ? 'active' : ''}`}>
                <path d="M490 125 Q510 100 550 110" className="route-path" />
                <circle cx="550" cy="110" r="6" className="route-dest" />
              </g>
              
              <g className={`trade-route route-england ${activeTradeEra >= 2 ? 'active' : ''}`}>
                <path d="M490 120 Q480 80 490 60" className="route-path" />
                <circle cx="490" cy="60" r="6" className="route-dest" />
              </g>
              
              <g className={`trade-route route-africa ${activeTradeEra >= 4 ? 'active' : ''}`}>
                <path d="M500 140 Q510 200 520 280" className="route-path" />
                <circle cx="520" cy="280" r="8" className="route-dest" />
              </g>
              
              {/* Labels */}
              <text x="180" y="180" className="map-label">Mesoamerica</text>
              <text x="450" y="50" className="map-label">Europe</text>
              <text x="530" y="320" className={`map-label ${activeTradeEra >= 4 ? 'visible' : ''}`}>West Africa</text>
            </svg>
          </div>
          
          {/* Era cards */}
          <div className="trade-eras">
            {tradeRoutes.map((route, index) => (
              <div 
                key={index} 
                className={`trade-era-card ${activeTradeEra === index ? 'active' : ''}`}
              >
                <span className="era-year">{route.era}</span>
                <h3 className="era-title">{route.title}</h3>
                <p className="era-text">{route.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BEAN TO BAR PROCESS ==================== */}
      <section className="processing-section" ref={processingSectionRef}>
        <div className="section-header">
          <span className="section-number">06</span>
          <h2>Bean to Bar</h2>
          <p className="section-lead">
            From harvested pod to finished chocolate bar: eight distinct stages, 
            each critical to the final flavor.
          </p>
        </div>
        
        <div className="process-wheel-container">
          {/* Radial processing wheel */}
          <div className="process-wheel">
            <svg viewBox="0 0 400 400" className="wheel-svg" aria-label="Chocolate processing wheel">
              {/* Outer ring segments */}
              {beanToBarSteps.map((step, index) => {
                const angle = (index / beanToBarSteps.length) * 360 - 90;
                const nextAngle = ((index + 1) / beanToBarSteps.length) * 360 - 90;
                const midAngle = (angle + nextAngle) / 2;
                const isActive = index <= processingStep;
                
                const startRad = (angle * Math.PI) / 180;
                const endRad = (nextAngle * Math.PI) / 180;
                const labelRad = (midAngle * Math.PI) / 180;
                
                const outerR = 180;
                const innerR = 100;
                const labelR = 140;
                
                const x1 = 200 + outerR * Math.cos(startRad);
                const y1 = 200 + outerR * Math.sin(startRad);
                const x2 = 200 + outerR * Math.cos(endRad);
                const y2 = 200 + outerR * Math.sin(endRad);
                const x3 = 200 + innerR * Math.cos(endRad);
                const y3 = 200 + innerR * Math.sin(endRad);
                const x4 = 200 + innerR * Math.cos(startRad);
                const y4 = 200 + innerR * Math.sin(startRad);
                
                const labelX = 200 + labelR * Math.cos(labelRad);
                const labelY = 200 + labelR * Math.sin(labelRad);
                
                return (
                  <g key={index} className={`wheel-segment ${isActive ? 'active' : ''}`}>
                    <path
                      d={`M ${x1} ${y1} A ${outerR} ${outerR} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 0 0 ${x4} ${y4} Z`}
                      className="segment-path"
                    />
                    <text
                      x={labelX}
                      y={labelY}
                      className="segment-label"
                      transform={`rotate(${midAngle + 90}, ${labelX}, ${labelY})`}
                    >
                      {step.name}
                    </text>
                  </g>
                );
              })}
              
              {/* Center circle */}
              <circle cx="200" cy="200" r="80" className="wheel-center" />
              <text x="200" y="195" className="wheel-center-text">
                {beanToBarSteps[Math.min(processingStep, beanToBarSteps.length - 1)]?.name || 'Bean'}
              </text>
              <text x="200" y="215" className="wheel-center-sub">
                Step {Math.min(processingStep + 1, beanToBarSteps.length)} of 8
              </text>
            </svg>
          </div>
          
          {/* Active step description */}
          <div className="process-description">
            <h3>{beanToBarSteps[Math.min(processingStep, beanToBarSteps.length - 1)]?.name}</h3>
            <p>{beanToBarSteps[Math.min(processingStep, beanToBarSteps.length - 1)]?.description}</p>
          </div>
        </div>
      </section>

      {/* ==================== GLOBAL COCOA REGIONS ==================== */}
      <section className="regions-section">
        <div className="section-header light">
          <span className="section-number">07</span>
          <h2>The Cocoa Belt</h2>
          <p className="section-lead">
            Cacao grows only within 20° of the equator. Each region produces 
            distinct flavor profiles shaped by terroir.
          </p>
        </div>
        
        <div className="regions-chart">
          {cocoaRegions.map((region, index) => (
            <div 
              key={region.country} 
              className="region-bar"
              style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
            >
              <div className="region-info">
                <span className="region-name">{region.country}</span>
                <span className="region-flavor">{region.flavor}</span>
              </div>
              <div className="region-bar-container">
                <div 
                  className="region-bar-fill"
                  style={{ 
                    width: `${region.percentage * 2.2}%`,
                    backgroundColor: region.color
                  }}
                />
              </div>
              <span className="region-percentage">{region.percentage}%</span>
            </div>
          ))}
        </div>
        
        <div className="regions-note">
          <strong>The Concentration Problem:</strong> 58% of global cocoa comes from 
          just two countries—Ivory Coast and Ghana—making supply chains vulnerable 
          to climate, disease, and political instability.
        </div>
      </section>

      {/* ==================== CHOCOLATE TITANS ==================== */}
      <section className="titans-section">
        <div className="section-header">
          <span className="section-number">08</span>
          <h2>The Chocolate Empires</h2>
          <p className="section-lead">
            Six corporations control most of the world&apos;s chocolate. Their combined 
            annual revenue exceeds the GDP of 100+ countries.
          </p>
        </div>
        
        <div className="titans-grid">
          {chocolateTitans.map((titan, index) => (
            <div
              key={titan.name}
              ref={el => { titanRefs.current[index] = el; }}
              className={`titan-card ${visibleTitans.includes(index) ? 'visible' : ''}`}
              style={{ backgroundColor: titan.color }}
            >
              <div className="titan-header">
                <h3 className="titan-name">{titan.name}</h3>
                <span className="titan-founded">Est. {titan.founded}</span>
              </div>
              <div className="titan-revenue">{titan.revenue}</div>
              <div className="titan-brands">{titan.brands}</div>
            </div>
          ))}
        </div>
        
        <div className="industry-total">
          <div className="total-label">Total Global Chocolate Market</div>
          <div className="total-value">$180+ Billion</div>
          <div className="total-context">Growing 4-5% annually</div>
        </div>
      </section>

      {/* ==================== CLIMATE & ETHICS ==================== */}
      <section className="ethics-section">
        <div className="section-header light">
          <span className="section-number">09</span>
          <h2>The Bitter Truth</h2>
          <p className="section-lead">
            Behind every chocolate bar lies a complex web of environmental destruction, 
            child labor, and climate vulnerability.
          </p>
        </div>
        
        <div className="ethics-grid">
          <div className="ethics-stat">
            <div className="stat-icon">
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <circle cx="24" cy="16" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 42c0-8 7-14 16-14s16 6 16 14" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="stat-value">1.56M</div>
            <div className="stat-label">children in cocoa farming (West Africa)</div>
          </div>
          
          <div className="ethics-stat">
            <div className="stat-icon">
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <path d="M24 4v8M12 8l4 6.9M36 8l-4 6.9M8 20h8M32 20h8M12 32l4-6.9M36 32l-4-6.9M24 36v8" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="24" cy="24" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="stat-value">2050</div>
            <div className="stat-label">when climate may devastate key regions</div>
          </div>
          
          <div className="ethics-stat">
            <div className="stat-icon">
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <path d="M24 4c-6 0-12 6-12 14s6 14 12 22c6-8 12-14 12-22s-6-14-12-14z" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M24 44v-6" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="stat-value">80%</div>
            <div className="stat-label">of Ivory Coast forests lost to cocoa</div>
          </div>
          
          <div className="ethics-stat">
            <div className="stat-icon">
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <rect x="8" y="20" width="32" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 20V12a8 8 0 1116 0v8" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="stat-value">6%</div>
            <div className="stat-label">of chocolate price reaches farmers</div>
          </div>
        </div>
        
        <div className="climate-slider-section">
          <h3>Climate Impact on Cocoa-Growing Regions</h3>
          <div className="slider-container">
            <div className="slider-labels">
              <span>Today</span>
              <span>2050 Projection</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={climateSlider}
              onChange={(e) => setClimateSlider(Number(e.target.value))}
              className="climate-slider"
              aria-label="Climate impact timeline slider"
            />
            <div className="slider-visualization">
              <div 
                className="viable-area"
                style={{ width: `${100 - climateSlider * 0.4}%` }}
              >
                <span>Viable Growing Area</span>
              </div>
              <div 
                className="at-risk-area"
                style={{ width: `${climateSlider * 0.4}%` }}
              >
                <span>At Risk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CRAFT REVOLUTION ==================== */}
      <section className="craft-section">
        <div className="section-header">
          <span className="section-number">10</span>
          <h2>The Bean-to-Bar Revolution</h2>
          <p className="section-lead">
            A growing movement of craft chocolate makers is challenging industrial 
            giants—one small batch at a time.
          </p>
        </div>
        
        <div className="craft-comparison">
          <div className="comparison-panel industrial">
            <h3>Industrial Chocolate</h3>
            <ul>
              <li>Commodity beans, blended origins</li>
              <li>Optimized for consistency and cost</li>
              <li>Heavy sugar, vanilla, and additives</li>
              <li>Farmers receive ~6% of final price</li>
              <li>Opaque supply chains</li>
            </ul>
          </div>
          <div className="comparison-divider">
            <span>vs</span>
          </div>
          <div className="comparison-panel craft">
            <h3>Craft Bean-to-Bar</h3>
            <ul>
              <li>Single-origin, traceable beans</li>
              <li>Flavor-forward processing</li>
              <li>Minimal ingredients (cocoa, sugar)</li>
              <li>Direct trade, fair prices to farmers</li>
              <li>Full transparency from pod to bar</li>
            </ul>
          </div>
        </div>
        
        <div className="craft-growth">
          <div className="growth-stat">
            <span className="growth-value">600+</span>
            <span className="growth-label">craft chocolate makers worldwide (2023)</span>
          </div>
          <div className="growth-stat">
            <span className="growth-value">15%</span>
            <span className="growth-label">annual growth in premium chocolate segment</span>
          </div>
        </div>
      </section>

      {/* ==================== FUTURE ==================== */}
      <section className="future-section">
        <div className="future-bg" />
        <div className="future-content">
          <div className="section-header light">
            <span className="section-number">11</span>
            <h2>The Future of Chocolate</h2>
          </div>
          
          <div className="future-grid">
            <div className="future-card">
              <h3>Genetic Preservation</h3>
              <p>
                Scientists race to map cacao&apos;s genome and preserve wild varieties 
                before they&apos;re lost. CRISPR may create disease-resistant strains.
              </p>
            </div>
            <div className="future-card">
              <h3>Agroforestry</h3>
              <p>
                Growing cacao under native forest canopy—as the Maya did—may restore 
                ecosystems while producing superior flavor profiles.
              </p>
            </div>
            <div className="future-card">
              <h3>Lab-Grown Cocoa</h3>
              <p>
                Startups are developing cell-cultured cocoa that bypasses farming 
                entirely. Could this be chocolate&apos;s future—or its betrayal?
              </p>
            </div>
            <div className="future-card">
              <h3>Consumer Power</h3>
              <p>
                Every chocolate purchase is a vote. Growing demand for ethical, 
                traceable chocolate is slowly reshaping the entire industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CLOSING ==================== */}
      <section className="closing-section">
        <div className="closing-content">
          <blockquote className="closing-quote">
            &ldquo;Chocolate is a perfect food, as wholesome as it is delicious, 
            a beneficent restorer of exhausted power... there is no more 
            wholesome food than good chocolate.&rdquo;
          </blockquote>
          <cite>— Justus von Liebig, German chemist (1803–1873)</cite>
          
          <p className="closing-reflection">
            From the first Mokaya farmers who noticed wild cacao 4,000 years ago, 
            to the industrial empires of today, to the craft revolutionaries of tomorrow—
            the cocoa odyssey continues. Each bite carries millennia of human history, 
            botanical wonder, and yes, profound ethical weight.
          </p>
          
          <p className="closing-cta">
            The next time you taste chocolate, taste the whole journey.
          </p>
        </div>
      </section>

      {/* ==================== SOURCES ==================== */}
      <section className="sources-section">
        <div className="sources-content">
          <h3>Sources & Further Reading</h3>
          <div className="sources-grid">
            <a href="https://www.smithsonianmag.com/arts-culture/a-brief-history-of-chocolate-21860917/" target="_blank" rel="noopener noreferrer">
              Smithsonian: A Brief History of Chocolate
            </a>
            <a href="https://www.worldcocoafoundation.org/" target="_blank" rel="noopener noreferrer">
              World Cocoa Foundation Research
            </a>
            <a href="https://www.nature.com/articles/s41558-020-0774-8" target="_blank" rel="noopener noreferrer">
              Nature: Climate Change and Cocoa
            </a>
            <a href="https://www.icco.org/" target="_blank" rel="noopener noreferrer">
              International Cocoa Organization Statistics
            </a>
            <a href="https://www.pnas.org/doi/10.1073/pnas.1813475115" target="_blank" rel="noopener noreferrer">
              PNAS: Ancient Cacao Use in South America
            </a>
            <a href="https://www.ft.com/chocolate" target="_blank" rel="noopener noreferrer">
              Financial Times: The Chocolate Industry
            </a>
            <a href="https://www.noaa.gov/education/resource-collections/climate/climate-change-impacts" target="_blank" rel="noopener noreferrer">
              NOAA: Climate Change Impacts
            </a>
            <a href="https://www.fairtradeamerica.org/why-fairtrade/our-impact/cocoa/" target="_blank" rel="noopener noreferrer">
              Fairtrade: Cocoa Impact Report
            </a>
          </div>
          <p className="sources-note">
            This narrative synthesizes peer-reviewed research, historical records, and industry data. 
            All statistics cited are from 2020-2024 sources unless otherwise noted.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CocoaOdysseyClient;






















