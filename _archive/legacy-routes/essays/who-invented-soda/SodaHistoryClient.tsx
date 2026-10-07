"use client";

import { useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import './who-invented-soda.css';

/*
 * THE ORIGINS OF SODA - Effervescent Scrollytelling
 * 
 * Anti-Pattern-Matching Audit:
 * ✅ NO morphing SVG (used in Sneaker)
 * ✅ NO horizontal scroll gallery (used in Sneaker)
 * ✅ NO drop-cap chapters (overused)
 * ✅ NO alternating timeline (overused)
 * ✅ NO industrial black/white (used in Sneaker)
 * 
 * UNIQUE MECHANICS FOR THIS STORY:
 * 1. Rising bubble particles - continuous carbonation effect
 * 2. Liquid fill sections - content "pours in" on scroll
 * 3. Bubble-based data viz - stats shown as bubbles, not cards
 * 4. Cola Wars split comparison with brand colors
 * 
 * Forcing Question Answer:
 * "The page itself feels carbonated - bubbles rise continuously,
 * sections fill like liquid pouring into a glass"
 */

// ==================== BUBBLE GENERATOR ====================
const BubbleLayer: React.FC = () => {
  const bubbles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 8 + 4,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 8 + 6,
    }));
  }, []);

  return (
    <div className="bubble-layer">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

// ==================== PROGRESS LIQUID BAR ====================
const ProgressLiquid: React.FC = () => {
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
    <div className="progress-container">
      <div className="progress-liquid" style={{ height: `${progress}%` }} />
      <div className="progress-bubbles" />
    </div>
  );
};

// ==================== HERO ====================
const Hero: React.FC = () => (
  <header className="hero">
    <div className="hero-glow" />
    
    <div className="hero-content">
      <div className="hero-eyebrow">From Pharmacy to Phenomenon • 1767–Present</div>
      
      <h1 className="hero-title">
        <span className="line"><span>The</span></span>
        <span className="line"><span>Fizz</span></span>
      </h1>
      
      <p className="hero-tagline">
        How carbonated water became humanity&apos;s favorite way to celebrate, 
        refresh, and rebel—one bubble at a time.
      </p>
    </div>
    
    <div className="hero-scroll">
      <span>Pour into history</span>
      <div className="scroll-bottle" />
    </div>
  </header>
);

// ==================== LIQUID FILL SECTION ====================
interface LiquidSectionProps {
  era: string;
  title: string;
  children: React.ReactNode;
  highlight?: string;
}

const LiquidSection: React.FC<LiquidSectionProps> = ({ era, title, children, highlight }) => {
  const ref = useRef<HTMLElement>(null);
  const [fillHeight, setFillHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate fill based on scroll position
      const progress = Math.max(0, Math.min(1, 1 - rect.top / windowHeight));
      setFillHeight(progress * 100);
      
      if (progress > 0.2) setIsVisible(true);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={ref} className={`liquid-section ${isVisible ? 'visible' : ''}`}>
      <div className="liquid-bg" style={{ height: `${fillHeight}%` }} />
      <div className="liquid-content">
        <div className="liquid-era">{era}</div>
        <h2 className="liquid-title">{title}</h2>
        {children}
        {highlight && <div className="liquid-highlight">{highlight}</div>}
      </div>
    </section>
  );
};

// ==================== BUBBLE DATA VIZ ====================
const BubbleDataSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: '$400B+', unit: '', label: 'Global Soft Drink Market', size: 180 },
    { value: '1.9B', unit: '', label: 'Coke Servings Daily', size: 150 },
    { value: '200+', unit: '', label: 'Countries with Coca-Cola', size: 130 },
    { value: '3,500+', unit: '', label: 'Beverage Products by Coke', size: 120 },
  ];

  return (
    <section ref={ref} className="bubble-data-section">
      <div className="bubble-data-header">
        <h2>The <span className="cherry">Numbers</span> Are Fizzing</h2>
      </div>
      
      <div className="bubble-chart">
        {stats.map((stat, index) => (
          <div key={stat.label} className="bubble-stat">
            <div 
              className="bubble-circle"
              style={{
                width: isVisible ? `${stat.size}px` : '0px',
                height: isVisible ? `${stat.size}px` : '0px',
                transitionDelay: `${index * 0.15}s`,
              }}
            >
              <span className="bubble-value">{stat.value}</span>
              {stat.unit && <span className="bubble-unit">{stat.unit}</span>}
            </div>
            <span className="bubble-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

// ==================== POUR TIMELINE ====================
const PourTimeline: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [streamHeight, setStreamHeight] = useState(0);

  const events = [
    {
      year: '1767',
      title: 'The Spark of Fizz',
      text: 'English scientist Joseph Priestley discovers how to infuse water with carbon dioxide by suspending a bowl over a beer vat. He calls it "impregnated water" and believes it has healing properties.',
    },
    {
      year: '1783',
      title: 'Commercial Carbonation',
      text: 'Swiss watchmaker Jacob Schweppe perfects a process for manufacturing carbonated water and founds Schweppes in Geneva. The age of commercial soda begins.',
    },
    {
      year: '1886',
      title: 'The Coca-Cola Formula',
      text: 'Atlanta pharmacist John Pemberton creates a syrup intended as a "brain tonic." Mixed with carbonated water at a soda fountain, Coca-Cola is born. Price: 5 cents a glass.',
    },
    {
      year: '1893',
      title: 'Pepsi Enters the Ring',
      text: 'Caleb Bradham, a North Carolina pharmacist, creates "Brad\'s Drink"—later renamed Pepsi-Cola. The name comes from pepsin and kola nuts, hinting at digestive benefits.',
    },
    {
      year: '1929',
      title: 'The Vending Revolution',
      text: 'Coca-Cola introduces the first coin-operated vending machines. Soda becomes available anywhere, anytime. The era of ubiquitous refreshment begins.',
    },
    {
      year: '1985',
      title: 'New Coke Disaster',
      text: 'Coca-Cola changes its century-old formula. Public outrage is immediate and fierce. "Original" Coke returns 79 days later. The lesson: don\'t mess with the fizz.',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (containerHeight - window.innerHeight)));
      setStreamHeight(progress * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Calculate initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="pour-timeline">
      <div className="pour-header">
        <h2>The Pour Through Time</h2>
      </div>
      
      <div className="pour-stream">
        <div className="pour-stream-fill" style={{ height: `${streamHeight}%` }} />
      </div>
      
      <div className="pour-events">
        {events.map((event, index) => (
          <PourEvent key={event.year} event={event} index={index} />
        ))}
      </div>
    </section>
  );
};

const PourEvent: React.FC<{ event: { year: string; title: string; text: string }; index: number }> = ({ event, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`pour-event ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 0.1}s` }}>
      <div className="pour-event-content">
        <div className="pour-event-year">{event.year}</div>
        <h3 className="pour-event-title">{event.title}</h3>
        <p className="pour-event-text">{event.text}</p>
      </div>
      <div className="pour-drop">{index + 1}</div>
      <div className="pour-event-extra" />
    </div>
  );
};

// ==================== COLA WARS ====================
const ColaWars: React.FC = () => (
  <section className="cola-wars">
    <div className="cola-side coca">
      <div className="cola-brand">Coca-Cola</div>
      <div className="cola-year">Founded 1886 • Atlanta, Georgia</div>
      <p className="cola-founder">
        Created by pharmacist John Pemberton as a &quot;brain tonic.&quot; 
        Sold to Asa Candler for $2,300. Today worth over $280 billion.
      </p>
      <div className="cola-fact">
        → 1.9 billion servings consumed daily worldwide
      </div>
    </div>
    
    <div className="cola-side pepsi">
      <div className="cola-brand">Pepsi-Cola</div>
      <div className="cola-year">Founded 1893 • New Bern, North Carolina</div>
      <p className="cola-founder">
        Created by pharmacist Caleb Bradham as &quot;Brad&apos;s Drink.&quot; 
        Went bankrupt twice before becoming a global giant.
      </p>
      <div className="cola-fact">
        → Won the blind taste tests but lost the brand war
      </div>
    </div>
  </section>
);

// ==================== RELATED ESSAY ====================
const RelatedEssay: React.FC = () => (
  <section className="related-essay-section">
    <div className="related-essay-content">
      <span className="related-label">Continue Reading</span>
      <Link href="/essays/history/the-complete-history-of-soda/" className="related-essay-card">
        <div className="related-essay-info">
          <h3 className="related-essay-title">The Complete History of Soda</h3>
          <p className="related-essay-description">
            From Joseph Priestley&apos;s 1767 brewery experiment to 1.9 billion daily servings —
            the full 260-year story with 28 verified sources and 11 documented figures.
          </p>
          <span className="related-essay-cta">Read the deep dive →</span>
        </div>
      </Link>
    </div>
  </section>
);

// ==================== SOURCES ====================
const Sources: React.FC = () => (
  <section className="sources-section">
    <div className="sources-content">
      <h3 className="sources-title">Sources & Further Reading</h3>
      <div className="sources-list">
        <a href="https://en.wikipedia.org/wiki/Coca-Cola" target="_blank" rel="noopener noreferrer">
          Wikipedia — Coca-Cola
        </a>
        <a href="https://en.wikipedia.org/wiki/Pepsi" target="_blank" rel="noopener noreferrer">
          Wikipedia — Pepsi History
        </a>
        <a href="https://www.britannica.com/topic/soft-drink" target="_blank" rel="noopener noreferrer">
          Britannica — Soft Drinks
        </a>
        <a href="https://blog.library.si.edu/blog/2017/06/22/cooling-off-soda-fountain-1920/" target="_blank" rel="noopener noreferrer">
          Smithsonian Libraries — Soda Fountains
        </a>
        <a href="https://www.history.com/articles/history-of-cocaine" target="_blank" rel="noopener noreferrer">
          History.com — Cocaine &amp; Coca-Cola Origins
        </a>
        <a href="https://www.sciencehistory.org/stories/magazine/powerful-effervescence/" target="_blank" rel="noopener noreferrer">
          Science History Institute — Carbonation Science
        </a>
        <a href="https://www.coca-colacompany.com/about-us/history" target="_blank" rel="noopener noreferrer">
          Coca-Cola Company Archives — Official History
        </a>
        <a href="https://www.statista.com/outlook/cmo/non-alcoholic-drinks/soft-drinks/worldwide" target="_blank" rel="noopener noreferrer">
          Statista — Soft Drinks Market Data
        </a>
      </div>
      <p className="sources-note">
        Market statistics from Statista and Coca-Cola Company reports (2024).
      </p>
    </div>
  </section>
);

// ==================== FOOTER ====================
const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-fizz">🥤</div>
    <p className="footer-quote">
      &quot;There&apos;s nothing more refreshing than an ice-cold Coke.&quot;
    </p>
    <div className="footer-author">— Every American Summer, 1886–Present</div>
    <p className="footer-tagline">From pharmacy shelves to global phenomenon—one bubble at a time.</p>
  </footer>
);

// ==================== MAIN ====================
const SodaHistoryClient: React.FC = () => {
  return (
    <div className="soda-container">
      <BubbleLayer />
      <ProgressLiquid />
      <Hero />
      
      <LiquidSection
        era="1767 — The Discovery"
        title="The Accidental Elixir"
        highlight="Joseph Priestley called it &quot;mephitic julep&quot; — fancy talk for fizzy water"
      >
        <p className="liquid-text">
          In 1767, an English clergyman and amateur scientist named Joseph Priestley 
          made a discovery that would change human refreshment forever. Living next 
          to a brewery in Leeds, he suspended a bowl of water over a fermenting beer vat 
          and observed that the water absorbed the gas—carbon dioxide—rising from the brew.
        </p>
        <p className="liquid-text">
          The result was artificially carbonated water. Priestley believed his invention 
          had medicinal properties, particularly for treating scurvy on long sea voyages. 
          He had no idea he&apos;d just invented the foundation of a $400 billion industry.
        </p>
      </LiquidSection>
      
      <LiquidSection
        era="1800s — The Pharmacy Era"
        title="Medicine or Pleasure?"
        highlight="Early sodas were sold as cures for headaches, indigestion, and &quot;nervous disorders&quot;"
      >
        <p className="liquid-text">
          In 19th-century America, pharmacists became the first soda entrepreneurs. 
          They mixed carbonated water with flavored syrups and sold them as health 
          tonics at ornate soda fountains—the social media of their era.
        </p>
        <p className="liquid-text">
          These &quot;nerve tonics&quot; often contained ingredients we&apos;d find shocking today: 
          coca leaf extract, kola nut caffeine, and various herbs. Coca-Cola&apos;s original 
          formula contained trace amounts of cocaine until 1903. The line between 
          medicine and refreshment was deliciously blurred.
        </p>
      </LiquidSection>
      
      <BubbleDataSection />
      <PourTimeline />
      <ColaWars />
      <RelatedEssay />
      <Sources />
      <Footer />
    </div>
  );
};

export default SodaHistoryClient;

