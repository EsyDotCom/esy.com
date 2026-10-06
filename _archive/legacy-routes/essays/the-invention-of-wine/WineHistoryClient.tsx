"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import './the-invention-of-wine.css';

/**
 * THE INVENTION OF WINE - 8,000 Years in a Glass
 * 
 * RADICAL Anti-Pattern-Matching Applied:
 * ✅ NO timeline cards (horizontal scroll parallax instead)
 * ✅ NO section label/title/text blocks (integrated layouts)
 * ✅ NO data grids (animated splash counters)
 * ✅ NO fixed left-side indicator (background bottle animation)
 * 
 * UNIQUE MECHANICS (Wine-Specific):
 * 1. Pouring bottle SVG - tilts in background as you scroll
 * 2. Fermentation bubbles - CO2 rising animation
 * 3. Horizontal parallax timeline - eras scroll horizontally via vertical scroll
 * 4. Grape cluster → wine drop transformation
 * 5. Split screen contrast (grape purple vs wine red)
 * 6. Full-screen quote takeover with giant quote mark
 * 7. Animated data counters on splash gradient
 * 
 * Forcing Question Answer:
 * "What could ONLY exist in a wine story?"
 * → Fermentation bubbles, grape→wine transformation, horizontal era timeline, pour animation
 */

// Timeline Eras for horizontal parallax
const eras = [
  {
    year: '6000 BCE',
    title: 'The First Vintage',
    text: 'In the hills of the South Caucasus, Neolithic farmers discover that crushed grapes left in clay jars transform into something extraordinary. The Eurasian grape vine (Vitis vinifera) is domesticated.',
    location: 'Georgia & Armenia'
  },
  {
    year: '3150 BCE',
    title: 'Wine of the Pharaohs',
    text: 'Wine reaches Egypt. King Scorpion I is buried with 700 jars. Hieroglyphics document sophisticated cultivation. Wine becomes the drink of gods and kings.',
    location: 'Ancient Egypt'
  },
  {
    year: '1500 BCE',
    title: 'Dionysus Rises',
    text: 'The Greeks worship Dionysus, god of wine and ecstasy. Symposia—drinking parties with philosophy—shape Western civilization. Viticulture spreads across the Mediterranean.',
    location: 'Ancient Greece'
  },
  {
    year: '200 BCE',
    title: 'Bacchus and Empire',
    text: 'Rome perfects large-scale production. Wooden barrels replace amphorae. Grape varieties are classified. Vineyards spread across Gaul, Iberia, and Germania.',
    location: 'Roman Empire'
  },
  {
    year: '1668 CE',
    title: 'Monks and Champagne',
    text: 'For centuries, monasteries preserve viticulture. Cistercian monks classify Burgundy terroir. Dom Pérignon advances sparkling wine. The great wine regions emerge.',
    location: 'Medieval Europe'
  },
  {
    year: '1863',
    title: 'The Phylloxera Crisis',
    text: 'A microscopic aphid from America devastates European vineyards. Within decades, 70% of vines are dead. The solution comes from the very continent that caused the plague.',
    location: 'Europe'
  },
  {
    year: 'Today',
    title: 'A Global Industry',
    text: 'From Napa to New Zealand, wine is now a $300+ billion global industry. Climate change reshapes regions. Natural wines rise. The ancient craft continues to evolve.',
    location: 'Worldwide'
  },
];

const WineHistoryClient: React.FC = () => {
  const [bottleRotation, setBottleRotation] = useState(0);
  const [wineLevel, setWineLevel] = useState(0);
  const [visibleData, setVisibleData] = useState<number[]>([]);

  const dataRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Update bottle animation based on scroll
  const updateFromScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(window.scrollY / scrollHeight, 1);

    // Bottle tilts and wine level increases
    setBottleRotation(scrollProgress * 45); // 0 to 45 degrees
    setWineLevel(scrollProgress * 100);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateFromScroll, { passive: true });
    updateFromScroll();
    return () => window.removeEventListener('scroll', updateFromScroll);
  }, [updateFromScroll]);

  // Intersection observer for data counters
  useEffect(() => {
    const dataObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = dataRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setTimeout(() => {
              setVisibleData(prev => [...new Set([...prev, index])]);
            }, index * 200);
          }
        }
      });
    }, { threshold: 0.5 });

    dataRefs.current.forEach(ref => ref && dataObserver.observe(ref));
    return () => dataObserver.disconnect();
  }, []);

  return (
    <div className="wine-story">
      
      {/* Background Pouring Bottle */}
      <div className="bottle-pour-container">
        <svg 
          className="bottle-svg" 
          viewBox="0 0 200 300"
          style={{ transform: `rotate(${bottleRotation}deg)` }}
        >
          {/* Bottle shape */}
          <path 
            className="bottle-glass"
            d="M80 20 L80 80 Q60 100 60 140 L60 280 Q60 290 70 290 L130 290 Q140 290 140 280 L140 140 Q140 100 120 80 L120 20 Z"
          />
          {/* Wine inside bottle */}
          <clipPath id="bottle-clip">
            <path d="M62 142 L62 278 Q62 288 72 288 L128 288 Q138 288 138 278 L138 142 Q138 102 118 82 L118 142 Z" />
          </clipPath>
          <rect 
            className="wine-liquid"
            x="60" 
            y={290 - (wineLevel * 1.5)} 
            width="80" 
            height={wineLevel * 1.5}
            clipPath="url(#bottle-clip)"
          />
          {/* Pour stream when tilted enough */}
          {bottleRotation > 20 && (
            <ellipse 
              className="wine-stream pouring"
              cx="145" 
              cy="120" 
              rx="8" 
              ry={bottleRotation - 15}
              style={{ 
                fill: 'var(--wine-young)',
                opacity: Math.min(1, (bottleRotation - 20) / 25)
              }}
            />
          )}
        </svg>
      </div>

      {/* === HERO === */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-year">6000</div>
        <div className="hero-content">
          <h1 className="hero-title">
            The Invention<br />of <em>Wine</em>
          </h1>
          <p className="hero-intro">
            Before writing. Before the wheel. Before cities rose and empires fell.
            Humanity discovered the magic of fermentation—and nothing was ever the same.
          </p>
        </div>
        <div className="hero-scroll">
          <span className="hero-scroll-text">Pour</span>
          <div className="wine-drop" />
        </div>
      </section>

      {/* === GRAPE TO WINE TRANSFORMATION === */}
      <section className="grape-section">
        <div className="wine-stain stain-1" />
        <div className="grape-transform">
          <svg className="grape-svg" viewBox="0 0 100 100">
            {/* Grape cluster */}
            <circle className="grape-circle" cx="35" cy="30" r="12" />
            <circle className="grape-circle" cx="55" cy="25" r="14" />
            <circle className="grape-circle" cx="70" cy="35" r="11" />
            <circle className="grape-circle" cx="30" cy="50" r="13" />
            <circle className="grape-circle" cx="50" cy="45" r="15" />
            <circle className="grape-circle" cx="70" cy="55" r="12" />
            <circle className="grape-circle" cx="40" cy="70" r="14" />
            <circle className="grape-circle" cx="60" cy="72" r="13" />
            {/* Stem */}
            <path d="M50 10 Q55 5 60 8" stroke="var(--cork)" strokeWidth="3" fill="none" />
          </svg>
          
          <span className="transform-arrow">→</span>
          
          <svg className="wine-drop-svg" viewBox="0 0 100 140">
            <path 
              className="drop-shape"
              d="M50 10 Q20 60 20 90 Q20 130 50 130 Q80 130 80 90 Q80 60 50 10"
            />
          </svg>
        </div>
        <div className="grape-text">
          <h2>Wild grapes, crushed and forgotten</h2>
          <p>
            In clay vessels across the Caucasus, wild Vitis vinifera grapes were left 
            to their own devices. Natural yeasts on the skins began their ancient work, 
            converting sugars to alcohol. The first winemakers discovered their creation 
            by accident—and recognized its power immediately.
          </p>
        </div>
      </section>

      {/* === FERMENTATION VAT === */}
      <section className="vat-section fermentation-section">
        {/* Bubbles */}
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        
        <div className="vat-container">
          <svg className="vat-svg" viewBox="0 0 150 200">
            {/* Vat outline */}
            <path 
              className="vat-body"
              d="M20 30 L20 180 Q20 195 35 195 L115 195 Q130 195 130 180 L130 30 Q130 15 115 15 L35 15 Q20 15 20 30"
            />
            {/* Wine in vat */}
            <rect className="vat-liquid" x="22" y="50" width="106" height="143" rx="10" />
            {/* Bubbles inside */}
            <circle cx="50" cy="120" r="4" fill="rgba(247,231,206,0.3)">
              <animate attributeName="cy" values="150;60;150" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.6;0" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="80" cy="140" r="3" fill="rgba(247,231,206,0.3)">
              <animate attributeName="cy" values="160;70;160" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.5;0" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="100" cy="130" r="5" fill="rgba(247,231,206,0.3)">
              <animate attributeName="cy" values="155;65;155" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.4;0" dur="3.5s" repeatCount="indefinite" />
            </circle>
          </svg>
          
          <div className="vat-content">
            <h2>The Magic of Fermentation</h2>
            <p>
              Yeast consumes sugar. Alcohol and CO₂ are born. This transformation—
              invisible to the ancient eye—seemed nothing short of divine.
              The bubbling, the changing flavors, the warming effect:
              early humans attributed it to the gods.
            </p>
            <p>
              It wasn&apos;t until the 1860s that Louis Pasteur proved fermentation was caused
              by living microorganisms—yeast—not spontaneous magic. Yet the process
              remains essentially unchanged after 8,000 years. Wild yeasts still cling
              to grape skins. Fermentation still produces roughly 12-14% alcohol.
              Nature perfected the formula long before we understood it.
            </p>
            <div className="ferment-stats">
              <div className="ferment-stat">
                <div className="ferment-value">14%</div>
                <div className="ferment-label">Max Natural Alcohol</div>
              </div>
              <div className="ferment-stat">
                <div className="ferment-value">2-4</div>
                <div className="ferment-label">Weeks to Ferment</div>
              </div>
              <div className="ferment-stat">
                <div className="ferment-value">8,000</div>
                <div className="ferment-label">Years of Tradition</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === VERTICAL TIMELINE === */}
      <section className="vertical-timeline">
        {eras.map((era, index) => (
          <div key={index} className={`timeline-era era-${index + 1}`}>
            <div className="era-bg" />
            <div className="era-year">{era.year}</div>
            <div className="era-content">
              <h2 className="era-title">{era.title}</h2>
              <p className="era-text">{era.text}</p>
              <div className="era-location">{era.location}</div>
            </div>
          </div>
        ))}
      </section>

      {/* === SPLIT SCREEN CONTRAST === */}
      <section className="split-section">
        <div className="split-left">
          <div className="split-content">
            <div className="split-stat">700</div>
            <h3>Jars of Wine</h3>
            <p>
              Buried with King Scorpion I of Egypt in 3150 BCE—the largest 
              collection of wine ever found in an ancient tomb. Each jar 
              was sealed with clay and stamped with its origin.
            </p>
          </div>
        </div>
        <div className="split-right">
          <div className="split-content">
            <div className="split-stat">325</div>
            <h3>CE: The Speyer Bottle</h3>
            <p>
              The oldest unopened wine bottle in existence. Sealed with olive 
              oil and wax, it has survived 1,700 years in a Roman tomb in Germany.
              Scientists refuse to open it.
            </p>
          </div>
        </div>
      </section>

      {/* === TERROIR SECTION === */}
      <section className="terroir-section">
        <div className="terroir-content">
          <h2>The Mystery of <em>Terroir</em></h2>
          <p className="terroir-intro">
            Why does a Burgundy taste different from a Bordeaux, even when made
            from the same grape? The French call it <em>terroir</em>—the complete
            natural environment in which wine is produced.
          </p>
          <div className="terroir-grid">
            <div className="terroir-factor">
              <div className="terroir-icon">
                <svg viewBox="0 0 60 60">
                  <path d="M10 50 L30 10 L50 50 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <line x1="10" y1="50" x2="50" y2="50" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="20" cy="45" r="3" fill="var(--wine-aged)"/>
                  <circle cx="35" cy="42" r="2" fill="var(--wine-aged)"/>
                  <circle cx="42" cy="46" r="4" fill="var(--wine-aged)"/>
                </svg>
              </div>
              <h3>Soil</h3>
              <p>Limestone, clay, gravel, slate—each mineral composition
              stresses vines differently, forcing roots deeper and concentrating flavors.</p>
            </div>
            <div className="terroir-factor">
              <div className="terroir-icon">
                <svg viewBox="0 0 60 60">
                  <circle cx="30" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <line x1="30" y1="32" x2="30" y2="55" stroke="currentColor" strokeWidth="2"/>
                  <line x1="20" y1="45" x2="30" y2="55" stroke="currentColor" strokeWidth="2"/>
                  <line x1="40" y1="45" x2="30" y2="55" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Climate</h3>
              <p>Temperature swings between day and night, rainfall patterns,
              and hours of sunlight determine sugar development and acidity balance.</p>
            </div>
            <div className="terroir-factor">
              <div className="terroir-icon">
                <svg viewBox="0 0 60 60">
                  <path d="M10 45 Q20 30 30 35 Q40 40 50 25" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="30" cy="35" r="3" fill="var(--wine-young)"/>
                  <path d="M28 32 L28 20 M32 32 L32 22" stroke="var(--cork)" strokeWidth="1.5"/>
                </svg>
              </div>
              <h3>Topography</h3>
              <p>Slope angle, altitude, and drainage affect sun exposure and
              water retention—why the same hillside produces wines of different character.</p>
            </div>
            <div className="terroir-factor">
              <div className="terroir-icon">
                <svg viewBox="0 0 60 60">
                  <ellipse cx="30" cy="35" rx="15" ry="8" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <ellipse cx="25" cy="32" rx="2" ry="1" fill="currentColor" opacity="0.5"/>
                  <ellipse cx="35" cy="36" rx="3" ry="1.5" fill="currentColor" opacity="0.5"/>
                  <ellipse cx="30" cy="38" rx="2" ry="1" fill="currentColor" opacity="0.5"/>
                </svg>
              </div>
              <h3>Microbes</h3>
              <p>Local yeasts and bacteria populations contribute unique fermentation
              characteristics—the invisible signature of place.</p>
            </div>
          </div>
          <p className="terroir-conclusion">
            No two vineyards produce identical wines. Terroir is why wine lovers speak
            of specific hills, specific rows, specific patches of earth with reverence.
          </p>
        </div>
      </section>

      {/* === PHYLLOXERA CRISIS === */}
      <section className="phylloxera-section">
        <div className="phylloxera-bg" />
        <div className="phylloxera-content">
          <div className="phylloxera-header">
            <span className="crisis-label">1863–1890</span>
            <h2>The Aphid Apocalypse</h2>
          </div>
          <div className="phylloxera-story">
            <p>
              In 1863, vines in southern France began dying mysteriously.
              Leaves yellowed, roots rotted, entire vineyards collapsed within seasons.
              By the time botanist Jules-Émile Planchon identified the culprit in 1868,
              it was already too late.
            </p>
            <div className="aphid-visual">
              <svg className="aphid-svg" viewBox="0 0 100 80">
                <ellipse cx="50" cy="40" rx="25" ry="20" fill="var(--wine-aged)" opacity="0.8"/>
                <ellipse cx="50" cy="40" rx="20" ry="15" fill="var(--cellar)"/>
                <circle cx="40" cy="35" r="3" fill="var(--champagne)" opacity="0.6"/>
                <circle cx="60" cy="35" r="3" fill="var(--champagne)" opacity="0.6"/>
                <ellipse cx="50" cy="45" rx="5" ry="3" fill="var(--wine-young)" opacity="0.5"/>
                <line x1="30" y1="50" x2="20" y2="60" stroke="var(--wine-aged)" strokeWidth="2"/>
                <line x1="70" y1="50" x2="80" y2="60" stroke="var(--wine-aged)" strokeWidth="2"/>
                <line x1="35" y1="55" x2="25" y2="70" stroke="var(--wine-aged)" strokeWidth="2"/>
                <line x1="65" y1="55" x2="75" y2="70" stroke="var(--wine-aged)" strokeWidth="2"/>
              </svg>
              <p className="aphid-caption">
                <em>Phylloxera vastatrix</em> — less than 1mm long,
                yet capable of destroying civilizations of vines
              </p>
            </div>
            <p>
              The pest was <em>Daktulosphaira vitifoliae</em>, an aphid native to
              North America, accidentally imported on botanical specimens.
              American vines had evolved resistance over millennia; European
              <em>Vitis vinifera</em> had none.
            </p>
          </div>
          <div className="devastation-stats">
            <div className="devastation-stat">
              <div className="devastation-number">70%</div>
              <div className="devastation-label">of European vineyards destroyed</div>
            </div>
            <div className="devastation-stat">
              <div className="devastation-number">2.5M</div>
              <div className="devastation-label">hectares lost in France alone</div>
            </div>
            <div className="devastation-stat">
              <div className="devastation-number">30</div>
              <div className="devastation-label">years to full recovery</div>
            </div>
          </div>
          <div className="phylloxera-solution">
            <h3>The Paradox of Salvation</h3>
            <p>
              The solution came from the same continent that brought the plague.
              American grape species, having co-evolved with phylloxera, were resistant.
              By grafting precious European vines onto American rootstock,
              the wine industry was saved—forever transformed.
            </p>
            <p className="grafting-note">
              Today, nearly every European vine grows on American roots.
              The wine in your glass is a testament to this transatlantic collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* === QUOTE TAKEOVER === */}
      <section className="quote-takeover">
        <div className="quote-inner">
          <blockquote>
            &ldquo;Wine is one of the most civilized things in the world
            and one of the most natural things that has been brought
            to the greatest perfection.&rdquo;
          </blockquote>
          <cite>— Ernest Hemingway, Death in the Afternoon</cite>
        </div>
      </section>

      {/* === DATA SPLASH === */}
      <section className="data-splash">
        <div className="data-inner">
          <div 
            ref={el => { dataRefs.current[0] = el; }}
            className={`data-item ${visibleData.includes(0) ? 'visible' : ''}`}
          >
            <div className="data-number">260B</div>
            <div className="data-desc">liters of wine produced annually worldwide</div>
          </div>
          <div
            ref={el => { dataRefs.current[1] = el; }}
            className={`data-item ${visibleData.includes(1) ? 'visible' : ''}`}
          >
            <div className="data-number">$300B+</div>
            <div className="data-desc">global wine market value</div>
          </div>
          <div 
            ref={el => { dataRefs.current[2] = el; }}
            className={`data-item ${visibleData.includes(2) ? 'visible' : ''}`}
          >
            <div className="data-number">10,000+</div>
            <div className="data-desc">grape varieties cultivated worldwide</div>
          </div>
          <div 
            ref={el => { dataRefs.current[3] = el; }}
            className={`data-item ${visibleData.includes(3) ? 'visible' : ''}`}
          >
            <div className="data-number">7.4M</div>
            <div className="data-desc">hectares of vineyards globally</div>
          </div>
        </div>
      </section>

      {/* === SOURCES === */}
      <section className="sources">
        <div className="sources-inner">
          <h3>Sources &amp; Further Reading</h3>
          <div className="sources-list">
            <a href="https://www.pnas.org/doi/10.1073/pnas.1714728114" target="_blank" rel="noopener noreferrer">
              PNAS: Early Neolithic Wine of Georgia
            </a>
            <a href="https://www.nationalgeographic.com/history/article/oldest-winemaking-grapes-georgia-archaeology" target="_blank" rel="noopener noreferrer">
              National Geographic: Oldest Evidence of Winemaking
            </a>
            <a href="https://www.smithsonianmag.com/smart-news/oldest-evidence-wine-making-found-georgia-180967199/" target="_blank" rel="noopener noreferrer">
              Smithsonian: Oldest Evidence of Wine Making
            </a>
            <a href="https://www.oiv.int/what-we-do/statistics" target="_blank" rel="noopener noreferrer">
              OIV: International Wine Statistics
            </a>
            <a href="https://www.britannica.com/topic/wine" target="_blank" rel="noopener noreferrer">
              Britannica: Wine
            </a>
            <a href="https://www.penn.museum/research/project.php?pid=30" target="_blank" rel="noopener noreferrer">
              Penn Museum: Biomolecular Archaeology
            </a>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="wine-footer">
        <svg className="footer-glass" viewBox="0 0 60 100">
          <path 
            d="M10 10 Q10 40 30 45 Q50 40 50 10 L50 10 L10 10 M30 45 L30 85 M15 85 L45 85"
            fill="none"
            stroke="var(--champagne)"
            strokeWidth="2"
            opacity="0.4"
          />
          <ellipse cx="30" cy="35" rx="18" ry="20" fill="var(--wine-young)" opacity="0.6" />
        </svg>
        <p className="footer-text">
          &ldquo;In vino veritas&rdquo;<br />
          <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>— Pliny the Elder</span>
        </p>
      </footer>
    </div>
  );
};

export default WineHistoryClient;
