"use client";

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import './the-pale-blue-dot.css';

/**
 * THE PALE BLUE DOT - A Cosmic Perspective
 * 
 * UNIQUE MECHANICS (Anti-Pattern-Matching Applied):
 * 1. Cosmic zoom - Earth shrinks from 300px to 2px as you scroll
 * 2. Scale indicator - magnification from 1x to billions
 * 3. Distance counter - 0 km → 6 billion km
 * 4. Star parallax - multiple depth layers moving at different speeds
 * 5. Quote reveals - Sagan's words appear piece by piece
 * 6. Final photograph recreation - the actual Pale Blue Dot bands
 * 
 * Forcing Question Answer:
 * "What could ONLY exist in a Pale Blue Dot story?"
 * → Earth literally shrinking to a pixel, cosmic scale visualization, Sagan quotes
 */

// Generate random stars for parallax layers
const generateStars = (count: number, seed: number) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const pseudoRandom = Math.sin(seed + i) * 10000;
    stars.push({
      x: (pseudoRandom - Math.floor(pseudoRandom)) * 100,
      y: ((Math.sin(seed + i + 1000) * 10000) - Math.floor(Math.sin(seed + i + 1000) * 10000)) * 100,
      size: ['tiny', 'small', 'medium'][Math.floor(((Math.sin(seed + i + 2000) * 10000) - Math.floor(Math.sin(seed + i + 2000) * 10000)) * 3)]
    });
  }
  return stars;
};

const PaleBlueDotClient: React.FC = () => {
  const [earthSize, setEarthSize] = useState(300);
  const [scale, setScale] = useState('1x');
  const [distance, setDistance] = useState(0);
  const [visibleQuotes, setVisibleQuotes] = useState<number[]>([]);
  const [visibleData, setVisibleData] = useState<number[]>([]);
  const [showFinalSection, setShowFinalSection] = useState(false);
  
  const quoteRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dataRefs = useRef<(HTMLDivElement | null)[]>([]);
  const finalRef = useRef<HTMLDivElement>(null);

  // Generate star layers with fixed seeds for consistency
  const starLayers = useMemo(() => [
    { stars: generateStars(50, 1), speed: 0.1 },
    { stars: generateStars(30, 2), speed: 0.2 },
    { stars: generateStars(20, 3), speed: 0.3 },
  ], []);

  // Calculate scale and Earth size based on scroll
  const updateFromScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(window.scrollY / scrollHeight, 1);
    
    // Earth shrinks from 300px to 2px
    const newSize = Math.max(2, 300 - (scrollProgress * 298));
    setEarthSize(newSize);
    
    // Scale indicator changes
    if (scrollProgress < 0.1) setScale('1x');
    else if (scrollProgress < 0.2) setScale('100x');
    else if (scrollProgress < 0.3) setScale('10,000x');
    else if (scrollProgress < 0.4) setScale('1M×');
    else if (scrollProgress < 0.5) setScale('100M×');
    else if (scrollProgress < 0.6) setScale('1B×');
    else if (scrollProgress < 0.7) setScale('10B×');
    else if (scrollProgress < 0.8) setScale('50B×');
    else setScale('100B×');
    
    // Distance counter (0 to 6 billion km)
    const newDistance = Math.round(scrollProgress * 6000000000);
    setDistance(newDistance);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateFromScroll, { passive: true });
    updateFromScroll();
    return () => window.removeEventListener('scroll', updateFromScroll);
  }, [updateFromScroll]);

  // Intersection observers
  useEffect(() => {
    const observerOptions = { threshold: 0.4 };
    
    const quoteObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = quoteRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setVisibleQuotes(prev => [...new Set([...prev, index])]);
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
            }, index * 150);
          }
        }
      });
    }, observerOptions);

    const finalObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setShowFinalSection(true);
      });
    }, { threshold: 0.2 });

    quoteRefs.current.forEach(ref => ref && quoteObserver.observe(ref));
    dataRefs.current.forEach(ref => ref && dataObserver.observe(ref));
    if (finalRef.current) finalObserver.observe(finalRef.current);

    return () => {
      quoteObserver.disconnect();
      dataObserver.disconnect();
      finalObserver.disconnect();
    };
  }, []);

  // Format distance with commas
  const formatDistance = (d: number) => {
    if (d >= 1000000000) return `${(d / 1000000000).toFixed(1)} billion km`;
    if (d >= 1000000) return `${(d / 1000000).toFixed(0)} million km`;
    if (d >= 1000) return `${(d / 1000).toFixed(0)} thousand km`;
    return `${d} km`;
  };

  return (
    <div className="pale-blue-dot">
      
      {/* Star Field - Parallax Layers */}
      <div className="star-field">
        {starLayers.map((layer, layerIndex) => (
          <div key={layerIndex} className="star-layer">
            {layer.stars.map((star, starIndex) => (
              <div
                key={starIndex}
                className={`star ${star.size}`}
                style={{ left: `${star.x}%`, top: `${star.y}%` }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Scale Indicator - Fixed */}
      <div className="scale-indicator">
        <div className="scale-value">{scale}</div>
        <div className="scale-label">Scale</div>
        <div className="distance-value">{formatDistance(distance)}</div>
      </div>

      {/* Earth - Shrinking Center */}
      <div 
        className="earth-container"
        style={{ opacity: earthSize > 10 ? 1 : 0.8 }}
      >
        <svg 
          className="earth-shrinking"
          width={earthSize} 
          height={earthSize}
          viewBox="0 0 100 100"
        >
          <defs>
            <radialGradient id="earth-gradient" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#87CEEB" />
              <stop offset="50%" stopColor="#4A90D9" />
              <stop offset="100%" stopColor="#1E5799" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle 
            cx="50" cy="50" r="48" 
            fill="url(#earth-gradient)" 
            filter="url(#glow)"
          />
        </svg>
        <div 
          className="earth-glow"
          style={{ 
            width: earthSize * 1.5, 
            height: earthSize * 1.5,
            opacity: Math.max(0, (earthSize - 50) / 250)
          }}
        />
      </div>

      {/* === HERO === */}
      <section className="hero">
        <div className="hero-earth">
          {/* Empty - Earth is now fixed and shrinking */}
        </div>
        <div className="hero-content">
          <div className="hero-date">February 14, 1990</div>
          <h1 className="hero-title">
            The Pale Blue Dot
          </h1>
          <p className="hero-subtitle">
            From 6 billion kilometers away, Voyager 1 turned its camera back 
            toward home and captured the most distant photograph of Earth ever taken.
          </p>
        </div>
        <div className="hero-scroll">
          <span>Zoom Out</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* === JOURNEY: LEAVING EARTH === */}
      <section className="journey-section">
        <div className="journey-content">
          <div className="journey-label">Leaving Earth</div>
          <h2 className="journey-title">
            Voyager 1 launched on September 5, 1977
          </h2>
          <p className="journey-text">
            Its primary mission was to study Jupiter and Saturn. But Carl Sagan 
            had another idea: before the camera was turned off forever, 
            turn it around and photograph home from the edge of the solar system.
          </p>
        </div>
      </section>

      {/* === QUOTE 1 === */}
      <section className="quote-section">
        <div className="quote-content">
          <p 
            ref={el => { quoteRefs.current[0] = el; }}
            className={`quote-text ${visibleQuotes.includes(0) ? 'visible' : ''}`}
          >
            &ldquo;Look again at that dot. That&apos;s here. That&apos;s home. That&apos;s us.&rdquo;
          </p>
          <div className="quote-attribution">— Carl Sagan</div>
        </div>
      </section>

      {/* === JOURNEY: THE MISSION === */}
      <section className="journey-section">
        <div className="journey-content">
          <div className="journey-label">The Final Portrait</div>
          <h2 className="journey-title">
            NASA initially resisted the idea
          </h2>
          <p className="journey-text">
            Engineers worried the camera would be damaged if pointed toward the Sun. 
            The image would have no scientific value—Earth would be less than a pixel. 
            But Sagan persisted. On Valentine&apos;s Day 1990, Voyager 1 took 60 frames 
            of the solar system. In one of them, Earth appeared.
          </p>
        </div>
      </section>

      {/* === QUOTE 2 === */}
      <section className="quote-section">
        <div className="quote-content">
          <p 
            ref={el => { quoteRefs.current[1] = el; }}
            className={`quote-text ${visibleQuotes.includes(1) ? 'visible' : ''}`}
          >
            &ldquo;On it everyone you love, everyone you know, everyone you ever heard of, 
            every human being who ever was, lived out their lives.&rdquo;
          </p>
          <div className="quote-attribution">— Carl Sagan</div>
        </div>
      </section>

      {/* === DATA SECTION === */}
      <section className="data-section">
        <div className="data-grid">
          <div
            ref={el => { dataRefs.current[0] = el; }}
            className={`data-card ${visibleData.includes(0) ? 'visible' : ''}`}
          >
            <div className="data-value">6.06B km</div>
            <div className="data-label">Distance from Earth<br/>when photo was taken</div>
          </div>
          <div
            ref={el => { dataRefs.current[1] = el; }}
            className={`data-card ${visibleData.includes(1) ? 'visible' : ''}`}
          >
            <div className="data-value">0.12</div>
            <div className="data-label">Pixels<br/>Earth occupied in the image</div>
          </div>
          <div
            ref={el => { dataRefs.current[2] = el; }}
            className={`data-card ${visibleData.includes(2) ? 'visible' : ''}`}
          >
            <div className="data-value">5.5 hrs</div>
            <div className="data-label">Time for image data<br/>to reach Earth at light speed</div>
          </div>
        </div>
      </section>

      {/* === QUOTE 3 === */}
      <section className="quote-section">
        <div className="quote-content">
          <p 
            ref={el => { quoteRefs.current[2] = el; }}
            className={`quote-text ${visibleQuotes.includes(2) ? 'visible' : ''}`}
          >
            &ldquo;The aggregate of our joy and suffering, thousands of confident religions, 
            ideologies, and economic doctrines, every hunter and forager, every hero and coward, 
            every creator and destroyer of civilization...&rdquo;
          </p>
          <div className="quote-attribution">— Carl Sagan</div>
        </div>
      </section>

      {/* === JOURNEY: PERSPECTIVE === */}
      <section className="journey-section">
        <div className="journey-content">
          <div className="journey-label">Cosmic Perspective</div>
          <h2 className="journey-title">
            The photograph changed everything
          </h2>
          <p className="journey-text">
            Scientifically, it was worthless—a blurry dot in a sunbeam. 
            But philosophically, it became one of the most important images ever taken. 
            It showed us what we are: a small, fragile world suspended in the vastness of space.
          </p>
        </div>
      </section>

      {/* === QUOTE 4 === */}
      <section className="quote-section">
        <div className="quote-content">
          <p 
            ref={el => { quoteRefs.current[3] = el; }}
            className={`quote-text ${visibleQuotes.includes(3) ? 'visible' : ''}`}
          >
            &ldquo;...every king and peasant, every young couple in love, every mother and father, 
            hopeful child, inventor and explorer, every teacher of morals, every corrupt politician, 
            every superstar, every supreme leader...&rdquo;
          </p>
          <div className="quote-attribution">— Carl Sagan</div>
        </div>
      </section>

      {/* === THE PHOTOGRAPH === */}
      <section className="photograph-section" ref={finalRef}>
        <div className="photograph-intro">The Actual Photograph</div>
        <div className="photograph-frame">
          <div className="photograph-bands">
            <div className="band" />
            <div className="band" />
            <div className="band" />
          </div>
          <div className="the-dot" />
        </div>
        <p className="photograph-caption">
          Earth appears as a tiny point of light, a crescent only 0.12 pixel in size,<br />
          suspended in a sunbeam scattered by the camera optics.
        </p>
      </section>

      {/* === FINAL QUOTE === */}
      <section className="final-quote-section">
        <div className="final-quote-content">
          <p className="final-quote-text">
            &ldquo;...every saint and sinner in the history of our species lived there—on 
            a mote of dust <span className="highlight">suspended in a sunbeam</span>.
            <br /><br />
            The Earth is a very small stage in a vast cosmic arena. Think of the rivers of blood 
            spilled by all those generals and emperors so that, in glory and triumph, they could 
            become the momentary masters of a <span className="highlight">fraction of a dot</span>.
            <br /><br />
            Our posturings, our imagined self-importance, the delusion that we have some privileged 
            position in the Universe, are challenged by this point of pale light.
            <br /><br />
            There is perhaps no better demonstration of the folly of human conceits than this 
            distant image of our tiny world. To me, it underscores our responsibility to deal more 
            kindly with one another, and to preserve and cherish <span className="highlight">the 
            pale blue dot</span>, the only home we&apos;ve ever known.&rdquo;
          </p>
          <div className="final-attribution">
            — Carl Sagan, 1994
          </div>
        </div>
      </section>

      {/* === SOURCES === */}
      <section className="sources-section">
        <div className="sources-content">
          <h3 className="sources-title">Sources &amp; Further Reading</h3>
          <div className="sources-grid">
            <a 
              href="https://science.nasa.gov/mission/voyager/voyager-1s-pale-blue-dot/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              NASA Science: Voyager 1&apos;s Pale Blue Dot
            </a>
            <a 
              href="https://www.jpl.nasa.gov/images/pia00452-solar-system-portrait-earth-as-pale-blue-dot/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              NASA JPL: Solar System Portrait
            </a>
            <a 
              href="https://www.nasa.gov/image-article/our-pale-blue-dot/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              NASA: Our Pale Blue Dot
            </a>
            <a 
              href="https://www.planetary.org/worlds/pale-blue-dot" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              The Planetary Society
            </a>
            <a 
              href="https://www.loc.gov/item/cosmos000110/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Library of Congress: Cosmos
            </a>
            <a 
              href="https://en.wikipedia.org/wiki/Pale_Blue_Dot" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Wikipedia: Pale Blue Dot
            </a>
            <a 
              href="https://aeon.co/essays/why-pale-blue-dot-generates-feelings-of-cosmic-insignificance" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Aeon: Why Pale Blue Dot Generates Feelings of Cosmic Insignificance
            </a>
            <a 
              href="https://www.loc.gov/static/programs/national-recording-preservation-board/documents/pale-blue-dot.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Carl Sagan: Pale Blue Dot (1994)
            </a>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="footer">
        <div className="footer-dot" />
        <p className="footer-message">
          The only home we&apos;ve ever known.
        </p>
      </footer>
    </div>
  );
};

export default PaleBlueDotClient;

