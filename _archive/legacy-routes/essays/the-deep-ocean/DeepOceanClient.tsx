"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import './the-deep-ocean.css';

/**
 * THE DEEP OCEAN - Earth's Final Frontier
 * 
 * UNIQUE MECHANICS (Anti-Pattern-Matching Applied):
 * 1. Depth meter - tracks scroll as actual depth (0m → 11,000m)
 * 2. Progressive darkness - page background darkens as you descend
 * 3. Pressure counter - shows increasing atmospheres/PSI
 * 4. Zone transitions - distinct atmospheric zones (surface → twilight → midnight → abyss → hadal)
 * 5. Light rays that fade with depth
 * 6. Bioluminescent reveals - content glows in the darkness
 * 
 * Forcing Question Answer:
 * "What could ONLY exist in a deep ocean story?"
 * → A depth meter tracking 0m → 11,000m, progressive darkness, crushing pressure stats
 */

// Ocean Zones Data
const oceanZones = [
  { name: 'Epipelagic', nickname: 'Sunlight Zone', start: 0, end: 200 },
  { name: 'Mesopelagic', nickname: 'Twilight Zone', start: 200, end: 1000 },
  { name: 'Bathypelagic', nickname: 'Midnight Zone', start: 1000, end: 4000 },
  { name: 'Abyssopelagic', nickname: 'Abyssal Zone', start: 4000, end: 6000 },
  { name: 'Hadalpelagic', nickname: 'Hadal Zone', start: 6000, end: 11000 },
];

// Exploration Timeline
const explorationTimeline = [
  {
    year: '1521',
    title: "Magellan's Attempt",
    text: 'Ferdinand Magellan attempted to measure the Pacific Ocean depth using a weighted line. The bottom remained elusive—the ocean was far deeper than anyone imagined.',
    depth: null,
  },
  {
    year: '1872-1876',
    title: 'HMS Challenger Expedition',
    text: 'The first comprehensive deep-sea exploration circumnavigated the globe, discovering over 4,000 new species and mapping ocean basins. It established oceanography as a science.',
    depth: '8,184m recorded',
  },
  {
    year: '1960',
    title: 'Trieste: The First Descent',
    text: 'Jacques Piccard and Don Walsh descended to Challenger Deep in the bathyscaphe Trieste—the first humans to reach the ocean\'s deepest point. They spent 20 minutes on the bottom.',
    depth: '10,916m',
  },
  {
    year: '1977',
    title: 'Hydrothermal Vents Discovered',
    text: 'Scientists aboard DSV Alvin discovered hydrothermal vents near the Galápagos Islands—ecosystems thriving in complete darkness, fueled by chemical energy, not sunlight.',
    depth: '2,500m',
  },
  {
    year: '2012',
    title: "Cameron's Solo Descent",
    text: 'Filmmaker James Cameron piloted the Deepsea Challenger to Challenger Deep solo, capturing high-resolution footage of the abyss for the first time.',
    depth: '10,908m',
  },
  {
    year: '2019',
    title: "Vescovo's Discovery",
    text: 'Victor Vescovo reached 10,928m—the deepest manned dive ever. At the bottom of Challenger Deep, he found something no one expected: a plastic bag and candy wrappers.',
    depth: '10,928m',
  },
];

// Deep Sea Creatures
const creatures = [
  {
    icon: '🐙',
    name: 'Giant Squid',
    depth: '300-1,000m',
    fact: 'With eyes the size of dinner plates—the largest in the animal kingdom—giant squid hunt in the twilight zone. They remained mythical until 2004, when one was finally photographed alive.',
  },
  {
    icon: '🐟',
    name: 'Anglerfish',
    depth: '200-2,000m',
    fact: 'The female anglerfish uses a bioluminescent lure to attract prey in total darkness. Males are tiny parasites that permanently fuse to females, sharing their bloodstream.',
  },
  {
    icon: '🦐',
    name: 'Giant Isopod',
    depth: '170-2,140m',
    fact: 'These deep-sea crustaceans can grow to 76cm—20x larger than their shallow-water relatives. They can survive years without food, feasting on whale carcasses that sink from above.',
  },
  {
    icon: '🐚',
    name: 'Dumbo Octopus',
    depth: '3,000-4,000m',
    fact: 'Named for their ear-like fins, these octopuses live deeper than any other. They swallow prey whole, as their soft bodies cannot crush shells in the crushing pressure.',
  },
  {
    icon: '🐠',
    name: 'Barreleye Fish',
    depth: '600-800m',
    fact: 'With a transparent head and tubular eyes that can rotate upward, the barreleye fish detects the silhouettes of prey against the faint light filtering from above.',
  },
  {
    icon: '🦑',
    name: 'Vampire Squid',
    depth: '600-900m',
    fact: "Despite its name, it doesn&apos;t drink blood. Living in oxygen-minimum zones, it has the lowest metabolic rate of any cephalopod and feeds on marine snow—falling organic debris.",
  },
];

const DeepOceanClient: React.FC = () => {
  const [depth, setDepth] = useState(0);
  const [pressure, setPressure] = useState(1);
  const [lightOpacity, setLightOpacity] = useState(1);
  const [currentZone, setCurrentZone] = useState('surface');
  const [visibleCreatures, setVisibleCreatures] = useState<number[]>([]);
  const [visibleTimeline, setVisibleTimeline] = useState<number[]>([]);
  const [visibleData, setVisibleData] = useState<number[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const creatureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dataRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Calculate depth and pressure based on scroll
  const updateDepthFromScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(window.scrollY / scrollHeight, 1);
    
    // Map scroll to depth (0m to 11,000m)
    const newDepth = Math.round(scrollProgress * 11000);
    setDepth(newDepth);
    
    // Calculate pressure (roughly 1 atm per 10m, plus 1 atm at surface)
    const newPressure = Math.round(1 + (newDepth / 10));
    setPressure(newPressure);
    
    // Light fades rapidly in first 1000m
    const lightProgress = Math.min(newDepth / 1000, 1);
    setLightOpacity(1 - lightProgress);
    
    // Determine zone
    if (newDepth < 200) setCurrentZone('surface');
    else if (newDepth < 1000) setCurrentZone('twilight');
    else if (newDepth < 4000) setCurrentZone('midnight');
    else if (newDepth < 6000) setCurrentZone('abyss');
    else setCurrentZone('hadal');
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateDepthFromScroll, { passive: true });
    updateDepthFromScroll();
    return () => window.removeEventListener('scroll', updateDepthFromScroll);
  }, [updateDepthFromScroll]);

  // Intersection observers
  useEffect(() => {
    const observerOptions = { threshold: 0.3 };
    
    const creatureObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = creatureRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setTimeout(() => {
              setVisibleCreatures(prev => [...new Set([...prev, index])]);
            }, index * 100);
          }
        }
      });
    }, observerOptions);

    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = timelineRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setTimeout(() => {
              setVisibleTimeline(prev => [...new Set([...prev, index])]);
            }, index * 150);
          }
        }
      });
    }, observerOptions);

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
    }, observerOptions);

    creatureRefs.current.forEach(ref => ref && creatureObserver.observe(ref));
    timelineRefs.current.forEach(ref => ref && timelineObserver.observe(ref));
    dataRefs.current.forEach(ref => ref && dataObserver.observe(ref));

    return () => {
      creatureObserver.disconnect();
      timelineObserver.disconnect();
      dataObserver.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`ocean-container zone-${currentZone}`}
    >
      {/* Depth Meter - Fixed */}
      <div className="depth-meter">
        <div className="depth-track">
          <div 
            className="depth-fill" 
            style={{ height: `${(depth / 11000) * 100}%` }}
          />
        </div>
        <div>
          <div className="depth-value">{depth.toLocaleString()}</div>
          <div className="depth-unit">meters</div>
          <div className="pressure-value">{pressure.toLocaleString()} atm</div>
        </div>
      </div>

      {/* Light Rays - Fade with depth */}
      <div className="light-rays" style={{ opacity: lightOpacity }}>
        <div className="light-ray" />
        <div className="light-ray" />
        <div className="light-ray" />
        <div className="light-ray" />
        <div className="light-ray" />
      </div>

      {/* === HERO === */}
      <section className="hero">
        <div className="hero-badge">EARTH&apos;S FINAL FRONTIER</div>
        <h1 className="hero-title">
          The Deep<br />Ocean
        </h1>
        <p className="hero-subtitle">
          We have better maps of Mars than the ocean floor. 
          More humans have walked on the Moon than have visited the deepest trenches.
          Scroll down to descend into the abyss.
        </p>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value">71%</div>
            <div className="hero-stat-label">of Earth&apos;s Surface</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">&lt;0.001%</div>
            <div className="hero-stat-label">Visually Explored</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">10,935m</div>
            <div className="hero-stat-label">Deepest Point</div>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Descend</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* === SUNLIGHT ZONE === */}
      <section className="zone-section">
        <div className="zone-header">
          <div className="zone-badge">
            <span>Epipelagic Zone</span>
            <span className="zone-depth">0-200m</span>
          </div>
          <h2 className="zone-title">The Sunlight Zone</h2>
          <p className="zone-description">
            Sunlight penetrates here, enabling photosynthesis. This thin layer—just 2.4% of the 
            ocean&apos;s volume—contains 90% of all marine life. Whales, dolphins, tuna, and most 
            fish we eat live in this zone. Below 200 meters, sunlight cannot reach.
          </p>
        </div>
      </section>

      {/* === TWILIGHT ZONE === */}
      <section className="zone-section">
        <div className="zone-header">
          <div className="zone-badge">
            <span>Mesopelagic Zone</span>
            <span className="zone-depth">200-1,000m</span>
          </div>
          <h2 className="zone-title">The Twilight Zone</h2>
          <p className="zone-description">
            Too dark for photosynthesis, but faint light still filters down. 
            This is the realm of bioluminescence—90% of creatures here produce their own light.
            Giant squid hunt in the darkness. Pressure reaches 100 atmospheres.
          </p>
        </div>
      </section>

      {/* === CREATURES OF THE DEEP === */}
      <section className="zone-section">
        <div className="zone-header">
          <h2 className="zone-title">Creatures of the Abyss</h2>
          <p className="zone-description">
            Life finds a way in the crushing darkness. These organisms have evolved 
            extraordinary adaptations: enormous eyes, bioluminescent lures, 
            transparent bodies, and metabolism slowed to survive years without food.
          </p>
        </div>
        
        <div className="creatures-grid">
          {creatures.map((creature, index) => (
            <div
              key={index}
              ref={el => { creatureRefs.current[index] = el; }}
              className={`creature-card ${visibleCreatures.includes(index) ? 'visible' : ''}`}
            >
              <div className="creature-icon">{creature.icon}</div>
              <div className="creature-name">{creature.name}</div>
              <div className="creature-depth">{creature.depth}</div>
              <div className="creature-fact">{creature.fact}</div>
            </div>
          ))}
        </div>
      </section>

      {/* === MIDNIGHT ZONE === */}
      <section className="zone-section">
        <div className="zone-header">
          <div className="zone-badge">
            <span>Bathypelagic Zone</span>
            <span className="zone-depth">1,000-4,000m</span>
          </div>
          <h2 className="zone-title">The Midnight Zone</h2>
          <p className="zone-description">
            Total darkness. No sunlight has ever reached these depths. Temperature hovers 
            just above freezing at 4°C. The pressure is 400 times greater than at the surface—
            enough to crush a submarine. Yet life thrives here, feeding on &ldquo;marine snow&rdquo;: 
            the constant rain of organic matter falling from above.
          </p>
        </div>
      </section>

      {/* === EXPLORATION TIMELINE === */}
      <section className="timeline-section">
        <div className="zone-header">
          <h2 className="zone-title">The History of Exploration</h2>
          <p className="zone-description">
            Humanity&apos;s quest to reach the ocean&apos;s depths spans five centuries—from 
            Magellan&apos;s weighted lines to modern submersibles capable of withstanding 
            1,000 atmospheres of pressure.
          </p>
        </div>
        
        <div className="timeline">
          {explorationTimeline.map((item, index) => (
            <div
              key={index}
              ref={el => { timelineRefs.current[index] = el; }}
              className={`timeline-item ${visibleTimeline.includes(index) ? 'visible' : ''}`}
            >
              <div className="timeline-content">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-title">{item.title}</div>
                <div className="timeline-text">{item.text}</div>
                {item.depth && <div className="timeline-depth">Depth: {item.depth}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === ABYSSAL ZONE === */}
      <section className="zone-section">
        <div className="zone-header">
          <div className="zone-badge">
            <span>Abyssopelagic Zone</span>
            <span className="zone-depth">4,000-6,000m</span>
          </div>
          <h2 className="zone-title">The Abyssal Zone</h2>
          <p className="zone-description">
            Near-freezing temperatures. Complete darkness. Pressure exceeding 600 atmospheres.
            The abyssal plains are the largest habitat on Earth—covering more than 50% of 
            the planet&apos;s surface. Yet we have explored less of it than the surface of the Moon.
          </p>
        </div>
      </section>

      {/* === DATA SECTION === */}
      <section className="data-section">
        <div className="zone-header">
          <h2 className="zone-title">By The Numbers</h2>
        </div>
        
        <div className="data-grid">
          <div
            ref={el => { dataRefs.current[0] = el; }}
            className={`data-card ${visibleData.includes(0) ? 'visible' : ''}`}
          >
            <div className="data-value">90<span className="unit">%</span></div>
            <div className="data-label">Heat Absorbed</div>
            <div className="data-context">
              The deep ocean absorbs 90% of excess heat from climate change
            </div>
          </div>
          
          <div
            ref={el => { dataRefs.current[1] = el; }}
            className={`data-card ${visibleData.includes(1) ? 'visible' : ''}`}
          >
            <div className="data-value">30<span className="unit">%</span></div>
            <div className="data-label">CO₂ Absorbed</div>
            <div className="data-context">
              Oceans absorb roughly 30% of human-produced carbon dioxide
            </div>
          </div>
          
          <div
            ref={el => { dataRefs.current[2] = el; }}
            className={`data-card ${visibleData.includes(2) ? 'visible' : ''}`}
          >
            <div className="data-value">1,086<span className="unit">atm</span></div>
            <div className="data-label">Challenger Deep Pressure</div>
            <div className="data-context">
              Pressure at 10,935m—equivalent to 50 jumbo jets stacked on a person
            </div>
          </div>
          
          <div
            ref={el => { dataRefs.current[3] = el; }}
            className={`data-card ${visibleData.includes(3) ? 'visible' : ''}`}
          >
            <div className="data-value">24<span className="unit">°C/km</span></div>
            <div className="data-label">Geothermal Gradient</div>
            <div className="data-context">
              Temperature increases 24°C per kilometer beneath the seafloor
            </div>
          </div>
        </div>
      </section>

      {/* === HADAL ZONE === */}
      <section className="zone-section">
        <div className="zone-header">
          <div className="zone-badge">
            <span>Hadalpelagic Zone</span>
            <span className="zone-depth">6,000-11,000m</span>
          </div>
          <h2 className="zone-title">The Hadal Zone</h2>
          <p className="zone-description">
            Named after Hades, god of the underworld. Only 27 trenches in the world 
            reach these depths. The Mariana Trench&apos;s Challenger Deep is the deepest—
            10,935 meters below the surface. Pressure here exceeds 1,000 atmospheres.
            Only three humans have ever visited.
          </p>
        </div>
      </section>

      {/* === QUOTE === */}
      <section className="quote-section">
        <div className="quote-glow" />
        <div className="quote-content">
          <p className="quote-text">
            &ldquo;We know more about the surface of Mars and the Moon than we do 
            about the deep sea floor, despite the fact that we have yet to extract 
            a single gram of food, a single breath of oxygen, or a single drop 
            of water from those bodies.&rdquo;
          </p>
          <div className="quote-attribution">
            — Dr. Robert Ballard, Deep-Sea Explorer
          </div>
        </div>
      </section>

      {/* === HUMAN IMPACT === */}
      <section className="zone-section">
        <div className="zone-header">
          <h2 className="zone-title">The Footprint We Leave</h2>
          <p className="zone-description">
            In 2019, Victor Vescovo reached the deepest point in the ocean. 
            At 10,928 meters—further from sunlight than Mount Everest is tall—
            he discovered plastic bags and candy wrappers on the seafloor.
            No corner of Earth remains untouched.
          </p>
        </div>
      </section>

      {/* === SOURCES === */}
      <section className="sources-section">
        <div className="sources-content">
          <h3 className="sources-title">Sources &amp; Further Reading</h3>
          <div className="sources-grid">
            <a 
              href="https://oceanexplorer.noaa.gov/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              NOAA Ocean Exploration
            </a>
            <a 
              href="https://schmidtocean.org/technology/4500m-remotely-operated-vehicle-rov/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Schmidt Ocean Institute
            </a>
            <a 
              href="https://www.whoi.edu/know-your-ocean/ocean-topics/ocean-life/deep-ocean/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Woods Hole Oceanographic Institution
            </a>
            <a 
              href="https://www.mbari.org/science/upper-ocean-systems/deep-sea/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Monterey Bay Aquarium Research Institute
            </a>
            <a 
              href="https://www.britannica.com/science/deep-sea-trench" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Britannica: Deep-Sea Trenches
            </a>
            <a 
              href="https://time.com/5588691/victor-vescovo-plastic-oceans/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              TIME: Vescovo&apos;s Discovery
            </a>
            <a 
              href="https://www.nationalgeographic.com/environment/article/mariana-trench" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              National Geographic: Mariana Trench
            </a>
            <a 
              href="https://ocean.si.edu/ecosystems/deep-sea" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Smithsonian Ocean Portal
            </a>
          </div>
          <p className="sources-note">
            This narrative was compiled from peer-reviewed oceanographic research 
            and authoritative scientific institutions.
          </p>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="footer">
        <div className="footer-depth">10,935m</div>
        <div className="footer-label">Challenger Deep • Mariana Trench</div>
        <p className="footer-message">
          You have reached the deepest point on Earth.
          Only three humans have ever been here.
          Above you lies 11 kilometers of water—and an entire planet 
          we have barely begun to explore.
        </p>
      </footer>
    </div>
  );
};

export default DeepOceanClient;

