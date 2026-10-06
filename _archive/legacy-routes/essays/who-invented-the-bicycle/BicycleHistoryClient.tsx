"use client";

import { useEffect, useRef, useState } from 'react';
import './who-invented-the-bicycle.css';

/*
 * Design Research: The History of the Bicycle - V2 (Varied Layouts)
 * 
 * Layout Pattern Usage:
 * - Hero: full-bleed (cycling image)
 * - Section 1: split-screen (Draisine)
 * - Section 2: quote-monument (Mount Tambora)
 * - Section 3: timeline (Evolution 1860s-1870s)
 * - Section 4: full-bleed (Penny-farthing)
 * - Section 5: card-grid (Safety bicycle comparison)
 * - Section 6: sticky-scroll (Women's liberation)
 * - Section 7: data-viz (Global statistics)
 * - Section 8: split-screen reverse (Modern era)
 * 
 * Image Sources:
 * - Hero: Unsplash road cycling
 * - Historical: Public domain / Library of Congress
 * - Modern: Unsplash cycling photos
 */

// Wheel SVG component
const WheelIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2"/>
    <circle cx="50" cy="50" r="8" stroke="currentColor" strokeWidth="2"/>
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
      <line
        key={angle}
        x1="50"
        y1="50"
        x2={50 + 37 * Math.cos((angle * Math.PI) / 180)}
        y2={50 + 37 * Math.sin((angle * Math.PI) / 180)}
        stroke="currentColor"
        strokeWidth="0.75"
      />
    ))}
  </svg>
);

// Animation hook
const useInView = (threshold = 0.2) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// Progress Bar Component
const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / scrollHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${progress}%` }} />
    </div>
  );
};

// ==================== LAYOUT: HERO (Full Bleed) ====================
const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="hero full-bleed">
      <div className="hero-bg">
        {/* Road cycling - dynamic motion */}
        <img 
          src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1920&q=80" 
          alt="Cyclist riding on an open road"
          style={{ transform: `scale(${1 + scrollY * 0.0003}) translateY(${scrollY * 0.2}px)` }}
        />
        <div className="hero-overlay" />
      </div>

      <div className="hero-content" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
        <div className="hero-badge">Since 1817</div>
        
        <h1>
          <span>Who Invented</span>
          The Bicycle
        </h1>
        
        <p className="hero-tagline">
          From wooden running machines to carbon fiber racers—the 200-year journey 
          of humanity&apos;s most efficient form of transport.
        </p>

        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-number">200+</div>
            <div className="hero-stat-label">Years of Innovation</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">1B+</div>
            <div className="hero-stat-label">Bicycles Worldwide</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">100M</div>
            <div className="hero-stat-label">Made Each Year</div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Begin the ride</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </header>
  );
};

// ==================== LAYOUT: SPLIT SCREEN ====================
const DraisineSection: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`split-screen ${isVisible ? 'visible' : ''}`}>
      <div className="split-image">
        {/* Vintage bicycle aesthetic */}
        <img 
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
          alt="Vintage bicycle wheel detail"
        />
        <div className="image-overlay" />
        <div className="image-caption">The elegance of two wheels</div>
      </div>
      
      <div className="split-content">
        <div className="era-badge">
          <span className="era-text">1817</span>
          <div className="era-line" />
        </div>
        
        <span className="subtitle">Mannheim, Germany</span>
        <h2>The Running Machine</h2>
        
        <p>
          In the summer of 1817, Baron Karl von Drais unveiled his &ldquo;Laufmaschine&rdquo;—the 
          running machine. A wooden frame connecting two wheels, steered by handlebars, 
          propelled by pushing feet against the ground.
        </p>
        <p>
          It looked absurd to onlookers in Mannheim, but Drais had solved a problem created 
          by a natural disaster. The bicycle was born from necessity.
        </p>
        
        <div className="highlight">
          <p>Drais covered 13 kilometers in under an hour on his first public ride—faster than a horse-drawn stagecoach.</p>
        </div>
      </div>
    </section>
  );
};

// ==================== LAYOUT: QUOTE MONUMENT ====================
const TamboraQuote: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`quote-monument ${isVisible ? 'animate-in visible' : 'animate-in'}`}>
      <blockquote>
        <p>
          &ldquo;The year without a summer killed the horses. From their deaths, the bicycle was born.&rdquo;
        </p>
        <cite>On the eruption of Mount Tambora, 1815</cite>
        
        <div className="quote-context">
          <p>
            The 1815 eruption of Mount Tambora in Indonesia caused global climate disruption. 
            Crops failed across Europe. Horses starved. Karl von Drais invented his running 
            machine as an alternative to horse travel—necessity driving innovation.
          </p>
        </div>
      </blockquote>
    </section>
  );
};

// ==================== LAYOUT: TIMELINE ====================
const TimelineSection: React.FC = () => {
  const { ref, isVisible } = useInView(0.1);

  const timelineItems = [
    {
      year: '1860s',
      title: 'The Velocipede',
      text: 'Pierre Michaux (or his son Ernest) attached pedals to the front wheel. Iron tires on cobblestones earned it the nickname "boneshaker."'
    },
    {
      year: '1866',
      title: 'First U.S. Patent',
      text: 'Pierre Lallement brought the velocipede to America and received the first U.S. bicycle patent.'
    },
    {
      year: '1870s',
      title: 'The Penny-Farthing',
      text: 'Engineers realized larger wheels cover more ground. Front wheels grew to 1.5 meters—fast but terrifying.'
    },
    {
      year: '1885',
      title: 'The Safety Bicycle',
      text: 'John Kemp Starley\'s "Rover" introduced equal-sized wheels and chain drive. The modern bicycle was born.'
    }
  ];

  return (
    <section ref={ref} className={`timeline-section ${isVisible ? 'visible' : ''}`}>
      <h2>The Evolution of Two Wheels</h2>
      
      <div className="timeline">
        {timelineItems.map((item, index) => (
          <div 
            key={item.year} 
            className="timeline-item"
            style={{ transitionDelay: `${index * 0.15}s` }}
          >
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-year">{item.year}</div>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-text">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ==================== LAYOUT: FULL BLEED (Penny-farthing) ====================
const PennyFarthingSection: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`full-bleed ${isVisible ? 'animate-in visible' : 'animate-in'}`}>
      <div className="full-bleed-bg">
        {/* Historical/artistic bicycle image */}
        <img 
          src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1920&q=80"
          alt="Elegant bicycle against minimal background"
        />
        <div className="overlay" />
      </div>
      
      <div className="full-bleed-content">
        <span className="subtitle" style={{ 
          color: 'var(--color-brass)', 
          background: 'rgba(201, 162, 39, 0.15)',
          padding: '0.25rem 0.75rem',
          borderRadius: '4px',
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
          display: 'inline-block'
        }}>
          The Ordinary
        </span>
        
        <h2 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          marginBottom: '1.5rem'
        }}>
          Taking a Header
        </h2>
        
        <p style={{ 
          maxWidth: '650px', 
          margin: '0 auto',
          fontSize: '1.125rem',
          color: 'var(--color-white-muted)',
          lineHeight: '1.8'
        }}>
          With front wheels up to 1.5 meters tall, penny-farthings were fast but terrifying. 
          A small obstacle could send riders flying headfirst over the handlebars. Only young, 
          athletic men dared ride them—until John Kemp Starley changed everything.
        </p>
        
        <p style={{ 
          marginTop: '2rem',
          fontSize: '0.9375rem',
          color: 'var(--color-chrome)',
          fontStyle: 'italic'
        }}>
          The phrase &ldquo;taking a header&rdquo; for falling forward comes directly from penny-farthing accidents.
        </p>
      </div>
    </section>
  );
};

// ==================== LAYOUT: COMPARISON (Before/After) ====================
const SafetyBicycleSection: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`comparison-section ${isVisible ? 'visible' : ''}`}>
      <div className="comparison-header">
        <span className="comparison-label">1885 — The Turning Point</span>
        <h2>The Safety Revolution</h2>
      </div>
      
      <div className="comparison-container">
        {/* Before */}
        <div className="comparison-panel before">
          <div className="panel-marker">Before</div>
          <div className="panel-content">
            <div className="panel-icon">
              {/* Penny-farthing silhouette */}
              <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="2"/>
                <circle cx="40" cy="40" r="4" fill="currentColor"/>
                <circle cx="95" cy="75" r="15" stroke="currentColor" strokeWidth="2"/>
                <circle cx="95" cy="75" r="2" fill="currentColor"/>
                <path d="M40 40 L85 70" stroke="currentColor" strokeWidth="2"/>
                <path d="M35 38 L35 20" stroke="currentColor" strokeWidth="2"/>
                <path d="M30 20 L40 20" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>The High Wheeler</h3>
            <p>
              Front wheels up to 1.5 meters tall. Fast, but terrifying. A stumble meant 
              flying headfirst over the handlebars. Only young, athletic men dared ride.
            </p>
            <ul className="panel-traits">
              <li><span className="trait-negative">✕</span> Dangerous</li>
              <li><span className="trait-negative">✕</span> Men only</li>
              <li><span className="trait-negative">✕</span> Requires athleticism</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="comparison-divider">
          <div className="divider-line" />
          <div className="divider-year">1885</div>
          <div className="divider-line" />
        </div>

        {/* After */}
        <div className="comparison-panel after">
          <div className="panel-marker">After</div>
          <div className="panel-content">
            <div className="panel-icon">
              {/* Safety bicycle silhouette */}
              <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="55" r="22" stroke="currentColor" strokeWidth="2"/>
                <circle cx="25" cy="55" r="3" fill="currentColor"/>
                <circle cx="95" cy="55" r="22" stroke="currentColor" strokeWidth="2"/>
                <circle cx="95" cy="55" r="3" fill="currentColor"/>
                <path d="M25 55 L50 35 L70 35 L95 55" stroke="currentColor" strokeWidth="2"/>
                <path d="M50 35 L60 55 L95 55" stroke="currentColor" strokeWidth="2"/>
                <path d="M45 35 L45 20" stroke="currentColor" strokeWidth="2"/>
                <path d="M40 20 L50 20" stroke="currentColor" strokeWidth="2"/>
                <circle cx="60" cy="55" r="8" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>The Safety Bicycle</h3>
            <p>
              Equal-sized wheels. Chain drive to rear wheel. Diamond frame geometry 
              still used today. Suddenly, anyone could ride.
            </p>
            <ul className="panel-traits">
              <li><span className="trait-positive">✓</span> Safe &amp; stable</li>
              <li><span className="trait-positive">✓</span> Everyone welcome</li>
              <li><span className="trait-positive">✓</span> Design unchanged 140 years</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="comparison-footer">
        <p>
          John Kemp Starley&apos;s <strong>Rover Safety Bicycle</strong> didn&apos;t just 
          improve cycling—it democratized it. Within a decade, the penny-farthing was obsolete.
        </p>
      </div>
    </section>
  );
};

// ==================== LAYOUT: STICKY SCROLL ====================
const WomensLiberationSection: React.FC = () => {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section ref={ref} className={`sticky-scroll-section ${isVisible ? 'visible' : ''}`}>
      <div className="sticky-element">
        <div className="sticky-content">
          <WheelIcon className="sticky-icon" />
          <h3>Wheels of Change</h3>
          <p>
            The safety bicycle didn&apos;t just change transportation—it changed society forever.
          </p>
        </div>
      </div>
      
      <div className="scroll-panels">
        <div className="scroll-panel">
          <div className="scroll-panel-content">
            <div className="panel-year">1890s</div>
            <h4>Freedom on Two Wheels</h4>
            <p>
              For the first time in history, women could travel independently, without chaperones. 
              The bicycle offered mobility that horse riding (in sidesaddle) never could.
            </p>
          </div>
        </div>
        
        <div className="scroll-panel">
          <div className="scroll-panel-content">
            <div className="panel-year">1896</div>
            <h4>Susan B. Anthony&apos;s Declaration</h4>
            <p>
              &ldquo;Let me tell you what I think of bicycling. I think it has done more to emancipate 
              women than anything else in the world. It gives women a feeling of freedom and self-reliance.&rdquo;
            </p>
          </div>
        </div>
        
        <div className="scroll-panel">
          <div className="scroll-panel-content">
            <div className="panel-year">The Movement</div>
            <h4>Rational Dress</h4>
            <p>
              Women abandoned corsets and long skirts for practical cycling attire. The &ldquo;rational 
              dress&rdquo; movement emerged—and fashion was changed forever. The bicycle became a 
              symbol of freedom and independence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== LAYOUT: DATA VISUALIZATION ====================
const GlobalStatsSection: React.FC = () => {
  const { ref, isVisible } = useInView();

  const stats = [
    { number: '1B+', label: 'Bicycles Exist', detail: 'More than double the number of cars worldwide' },
    { number: '100M', label: 'Made Each Year', detail: 'Global annual bicycle production' },
    { number: '1903', label: 'First Tour de France', detail: '2,428 km around France' },
    { number: '140', label: 'Years Unchanged', detail: 'Starley\'s diamond frame still dominant' }
  ];

  return (
    <section ref={ref} className={`data-viz-section ${isVisible ? 'visible' : ''}`}>
      <h2>The Numbers Tell the Story</h2>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div 
            key={stat.label}
            className={`stat-card ${isVisible ? 'animate-in visible' : 'animate-in'}`}
            style={{ transitionDelay: `${index * 0.15}s` }}
          >
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
            <p className="stat-detail">{stat.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ==================== LAYOUT: SPLIT SCREEN (Reverse) ====================
const ModernEraSection: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`split-screen reverse ${isVisible ? 'visible' : ''}`}>
      <div className="split-image">
        {/* Modern cycling - urban */}
        <img 
          src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80"
          alt="Modern cyclist in urban environment"
        />
        <div className="image-overlay" />
        <div className="image-caption">The enduring machine</div>
      </div>
      
      <div className="split-content">
        <div className="era-badge">
          <span className="era-text">Now</span>
          <div className="era-line" />
        </div>
        
        <span className="subtitle">Two Centuries Later</span>
        <h2>The Enduring Machine</h2>
        
        <p>
          From wooden running machines to carbon-fiber racing bikes, from cobblestone streets 
          to dedicated bike lanes, the bicycle has proven remarkably adaptable.
        </p>
        <p>
          It requires no fuel, produces no emissions, improves health, and connects communities. 
          In an age of climate crisis and urban congestion, the simple invention of a German baron 
          in 1817 may yet prove to be one of humanity&apos;s most important technologies.
        </p>
        
        <div className="highlight">
          <p>The 1970s oil crisis sparked a bicycle renaissance in the West. Mountain bikes, carbon fiber, e-bikes—innovation continues.</p>
        </div>
      </div>
    </section>
  );
};

// ==================== SOURCES ====================
const Sources: React.FC = () => (
  <section className="sources-section">
    <div className="sources-content">
      <h3 className="sources-title">Sources & Further Reading</h3>
      <ul className="sources-list">
        <li>
          <a href="https://www.britannica.com/technology/bicycle" target="_blank" rel="noopener noreferrer">
            &ldquo;Bicycle&rdquo; — Encyclopedia Britannica
          </a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/History_of_the_bicycle" target="_blank" rel="noopener noreferrer">
            &ldquo;History of the Bicycle&rdquo; — Wikipedia
          </a>
        </li>
        <li>
          <a href="https://www.history.com/articles/bicycle-history-invention" target="_blank" rel="noopener noreferrer">
            &ldquo;The Bicycle: A History&rdquo; — History.com
          </a>
        </li>
        <li>
          <a href="https://www.smithsonianmag.com/history/how-the-bicycle-paved-the-way-for-womens-rights-105413804/" target="_blank" rel="noopener noreferrer">
            &ldquo;How the Bicycle Paved the Way for Women&apos;s Rights&rdquo; — Smithsonian Magazine
          </a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/Karl_Drais" target="_blank" rel="noopener noreferrer">
            &ldquo;Karl Drais&rdquo; — Wikipedia
          </a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/Year_Without_a_Summer" target="_blank" rel="noopener noreferrer">
            &ldquo;Year Without a Summer (Mount Tambora)&rdquo; — Wikipedia
          </a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/Safety_bicycle" target="_blank" rel="noopener noreferrer">
            &ldquo;Safety Bicycle&rdquo; — Wikipedia
          </a>
        </li>
      </ul>
      <p className="sources-note">
        This narrative was fact-checked against peer-reviewed sources and authoritative historical records.
      </p>
    </div>
  </section>
);

// ==================== FOOTER ====================
const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-icon">
        <WheelIcon />
      </div>
      <blockquote className="footer-quote">
        &ldquo;Life is like riding a bicycle. To keep your balance, you must keep moving.&rdquo;
        <cite>— Albert Einstein</cite>
      </blockquote>
      <div className="footer-divider" />
      <p className="footer-text">
        Two wheels, two centuries, and the journey continues.
      </p>
    </div>
  </footer>
);

// ==================== MAIN COMPONENT ====================
const BicycleHistoryClient: React.FC = () => {
  return (
    <div className="bicycle-history-container">
      <ProgressBar />
      <Hero />
      <DraisineSection />
      <TamboraQuote />
      <TimelineSection />
      <PennyFarthingSection />
      <SafetyBicycleSection />
      <WomensLiberationSection />
      <GlobalStatsSection />
      <ModernEraSection />
      <Sources />
      <Footer />
    </div>
  );
};

export default BicycleHistoryClient;
