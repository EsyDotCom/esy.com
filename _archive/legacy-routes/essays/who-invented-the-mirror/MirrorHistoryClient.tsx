"use client";

import { useEffect, useRef, useState } from 'react';
import './who-invented-the-mirror.css';

/*
 * THE MIRROR - Reflective Scrollytelling
 * 
 * Anti-Pattern-Matching Applied:
 * ✅ NO rising particles (Soda)
 * ✅ NO liquid fill (Soda)
 * ✅ NO morphing SVG (Sneaker)
 * ✅ NO horizontal gallery (Sneaker)
 * ✅ NO animated counters (Sneaker/Soda)
 * ✅ NO bar/bubble charts (Sneaker/Soda)
 * 
 * UNIQUE MECHANICS:
 * 1. Ornate frame border - viewport as mirror
 * 2. Reversed text that flips to readable on scroll
 * 3. Symmetrical parallax - mirrored content pairs
 * 4. Mercury droplet data viz - liquid metal aesthetic
 * 5. SVG mirror with reflection lines drawing
 * 6. Shimmer sweep animation
 * 
 * Forcing Question:
 * "The page IS a mirror - symmetrical, reflective, everything feels mirrored"
 */

// ==================== HOOKS ====================
const useInView = (threshold = 0.3) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / scrollHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};

// ==================== ORNATE FRAME ====================
const OrnateFrame: React.FC = () => (
  <>
    <div className="ornate-frame" />
    <div className="frame-corner top-left">
      <svg viewBox="0 0 60 60">
        <path d="M0,0 L60,0 L60,10 C40,10 10,10 10,40 L10,60 L0,60 Z" />
        <circle cx="20" cy="20" r="5" />
      </svg>
    </div>
    <div className="frame-corner top-right">
      <svg viewBox="0 0 60 60">
        <path d="M0,0 L60,0 L60,10 C40,10 10,10 10,40 L10,60 L0,60 Z" />
        <circle cx="20" cy="20" r="5" />
      </svg>
    </div>
    <div className="frame-corner bottom-left">
      <svg viewBox="0 0 60 60">
        <path d="M0,0 L60,0 L60,10 C40,10 10,10 10,40 L10,60 L0,60 Z" />
        <circle cx="20" cy="20" r="5" />
      </svg>
    </div>
    <div className="frame-corner bottom-right">
      <svg viewBox="0 0 60 60">
        <path d="M0,0 L60,0 L60,10 C40,10 10,10 10,40 L10,60 L0,60 Z" />
        <circle cx="20" cy="20" r="5" />
      </svg>
    </div>
  </>
);

// ==================== PROGRESS GLOW ====================
const ProgressGlow: React.FC = () => {
  const progress = useScrollProgress();
  
  return (
    <div className="progress-glow">
      <div className="progress-glow-fill" style={{ height: `${progress}%` }} />
    </div>
  );
};

// ==================== HERO ====================
const Hero: React.FC = () => (
  <header className="hero">
    <div className="hero-reflection-bg" />
    <div className="hero-shimmer" />
    
    <div className="hero-content">
      <div className="hero-eyebrow">8,000 Years of Reflection</div>
      
      <h1 className="hero-title">
        <span className="line"><span>The</span></span>
        <span className="line"><span>Mirror</span></span>
      </h1>
      
      <p className="hero-tagline">
        From polished obsidian to the screen in your pocket—
        humanity&apos;s eternal quest to see itself.
      </p>
    </div>
    
    <div className="hero-scroll">
      <span>Gaze deeper</span>
      <div className="scroll-mirror" />
    </div>
  </header>
);

// ==================== REFLECTION SECTION (Reversed Text) ====================
interface ReflectionSectionProps {
  era: string;
  title: string;
  text: string;
  reversedQuote: string;
}

const ReflectionSection: React.FC<ReflectionSectionProps> = ({ era, title, text, reversedQuote }) => {
  const { ref, isVisible } = useInView(0.4);

  return (
    <section ref={ref} className="reflection-section">
      <div className="reflection-content">
        <div className={`reflection-text fade-up ${isVisible ? 'visible' : ''}`}>
          <div className="reflection-era">{era}</div>
          <h2 className="reflection-title">{title}</h2>
          <p className="reflection-body">{text}</p>
        </div>
        
        <div className="reflection-visual">
          <div className={`reversed-text ${isVisible ? 'readable' : ''}`}>
            {reversedQuote}
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== SYMMETRY SECTION ====================
const SymmetrySection: React.FC = () => {
  const pairs = [
    {
      left: { year: '6000 BCE', title: 'Obsidian', text: 'In Anatolia, craftsmen polish volcanic glass to a mirror finish. These obsidian mirrors are humanity\'s first manufactured reflective surfaces.' },
      right: { year: '4000 BCE', title: 'Bronze', text: 'Mesopotamian artisans discover that polished bronze can reflect images. Metal mirrors spread across Egypt and the ancient world.' },
    },
    {
      left: { year: '500 CE', title: 'Chinese Magic', text: 'Han Dynasty craftsmen create "magic mirrors"—bronze discs that project hidden patterns when light reflects off them.' },
      right: { year: '1500 CE', title: 'Venetian Glass', text: 'Murano glassmakers develop tin-mercury amalgam backing. Venice guards the secret fiercely—artisans face death for leaving.' },
    },
  ];

  return (
    <section className="symmetry-section">
      <div className="symmetry-container">
        <div className="symmetry-center" />
        
        {pairs.map((pair, index) => (
          <SymmetryPair key={index} left={pair.left} right={pair.right} index={index} />
        ))}
      </div>
    </section>
  );
};

const SymmetryPair: React.FC<{
  left: { year: string; title: string; text: string };
  right: { year: string; title: string; text: string };
  index: number;
}> = ({ left, right, index }) => {
  const { ref, isVisible } = useInView(0.3);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="symmetry-pair">
      <div 
        className={`symmetry-item left fade-up ${isVisible ? 'visible' : ''}`}
        style={{ transitionDelay: `${index * 0.1}s` }}
      >
        <div className="symmetry-year">{left.year}</div>
        <h3 className="symmetry-title">{left.title}</h3>
        <p className="symmetry-text">{left.text}</p>
      </div>
      
      <div 
        className={`symmetry-item right fade-up ${isVisible ? 'visible' : ''}`}
        style={{ transitionDelay: `${index * 0.1 + 0.2}s` }}
      >
        <div className="symmetry-year">{right.year}</div>
        <h3 className="symmetry-title">{right.title}</h3>
        <p className="symmetry-text">{right.text}</p>
      </div>
    </div>
  );
};

// ==================== MERCURY DATA VIZ ====================
const MercurySection: React.FC = () => {
  const { ref, isVisible } = useInView(0.3);

  const stats = [
    { value: '$145B', unit: '', label: 'Global Mirror Market', source: '2024' },
    { value: '8,000', unit: 'yrs', label: 'Years of History', source: '' },
    { value: '38', unit: 'min', label: 'Avg. Daily Mirror Time', source: '2014 Survey' },
    { value: '85%', unit: '', label: 'Homes with Mirrors', source: 'Est.' },
  ];

  return (
    <section ref={ref} className="mercury-section">
      <div className="mercury-bg" />
      
      <div className="mercury-header">
        <h2>The <span className="gold">Reflection</span> Economy</h2>
      </div>
      
      <div className="mercury-pools">
        {stats.map((stat, index) => (
          <div key={stat.label} className="mercury-pool">
            <div 
              className={`mercury-droplet ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <span className="mercury-value">{stat.value}</span>
              {stat.unit && <span className="mercury-unit">{stat.unit}</span>}
            </div>
            <span className="mercury-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

// ==================== SVG MIRROR WITH ANIMATION ====================
const MirrorSVGSection: React.FC = () => {
  const { ref, isVisible } = useInView(0.4);

  return (
    <section ref={ref} className="mirror-svg-section">
      <div className="mirror-svg-container">
        <svg className={`mirror-frame-svg ${isVisible ? 'visible' : ''}`} viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="mirrorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E8E8E8" />
              <stop offset="30%" stopColor="#D0D0D0" />
              <stop offset="50%" stopColor="#E8E8E8" />
              <stop offset="70%" stopColor="#C0C0C0" />
              <stop offset="100%" stopColor="#E8E8E8" />
            </linearGradient>
            <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DAA520" />
              <stop offset="50%" stopColor="#B87333" />
              <stop offset="100%" stopColor="#DAA520" />
            </linearGradient>
          </defs>
          
          {/* Outer frame */}
          <rect x="20" y="20" width="360" height="460" rx="20" className="frame-border" stroke="url(#frameGradient)" />
          
          {/* Inner mirror surface */}
          <rect x="40" y="40" width="320" height="420" rx="10" className="mirror-surface" />
          
          {/* Ornamental corners */}
          <circle cx="40" cy="40" r="8" className="frame-ornament" />
          <circle cx="360" cy="40" r="8" className="frame-ornament" />
          <circle cx="40" cy="460" r="8" className="frame-ornament" />
          <circle cx="360" cy="460" r="8" className="frame-ornament" />
          
          {/* Reflection lines that draw on scroll */}
          <line x1="60" y1="80" x2="340" y2="80" className="reflection-line" />
          <line x1="80" y1="420" x2="320" y2="420" className="reflection-line" style={{ transitionDelay: '0.3s' }} />
          <line x1="200" y1="60" x2="200" y2="440" className="reflection-line" style={{ transitionDelay: '0.6s' }} />
        </svg>
        
        <div className="mirror-quote">
          <p>&ldquo;We don&apos;t see things as they are, we see them as we are.&rdquo;</p>
          <cite>— Anaïs Nin</cite>
        </div>
      </div>
    </section>
  );
};

// ==================== FINAL CHAPTER ====================
const FinalChapter: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const para1Ref = useRef<HTMLDivElement>(null);
  const para2Ref = useRef<HTMLDivElement>(null);
  const para3Ref = useRef<HTMLDivElement>(null);
  
  const [headerVisible, setHeaderVisible] = useState(false);
  const [para1Visible, setPara1Visible] = useState(false);
  const [para2Visible, setPara2Visible] = useState(false);
  const [para3Visible, setPara3Visible] = useState(false);

  useEffect(() => {
    const createObserver = (
      ref: React.RefObject<HTMLDivElement>,
      setter: (visible: boolean) => void,
      threshold: number
    ) => {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setter(true); },
        { threshold }
      );
      if (ref.current) observer.observe(ref.current);
      return observer;
    };

    const observers = [
      createObserver(headerRef, setHeaderVisible, 0.5),
      createObserver(para1Ref, setPara1Visible, 0.6),
      createObserver(para2Ref, setPara2Visible, 0.6),
      createObserver(para3Ref, setPara3Visible, 0.6),
    ];

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  return (
    <section className="final-chapter-section">
      <div className="final-chapter-container">
        {/* Header with era and title */}
        <div ref={headerRef} className={`final-header fade-up ${headerVisible ? 'visible' : ''}`}>
          <div className="final-era">1835 — The Modern Mirror</div>
          <h2 className="final-title">Justus von Liebig&apos;s Revolution</h2>
          <div className="final-divider">
            <span className="divider-line" />
            <span className="divider-icon">◆</span>
            <span className="divider-line" />
          </div>
        </div>

        {/* Paragraph 1: The Discovery */}
        <div ref={para1Ref} className={`final-paragraph fade-up ${para1Visible ? 'visible' : ''}`}>
          <p>
            In 1835, German chemist Justus von Liebig discovered that depositing a thin layer of 
            metallic silver onto glass created the clearest, most durable mirrors ever made.
          </p>
          <p className="final-highlight">
            His silver nitrate process made mirrors affordable for everyone—not just royalty.
          </p>
        </div>

        {/* Visual Break */}
        <div className={`final-visual-break ${para1Visible ? 'visible' : ''}`}>
          <div className="mirror-shard" />
        </div>

        {/* Paragraph 2: The Transformation */}
        <div ref={para2Ref} className={`final-paragraph fade-up ${para2Visible ? 'visible' : ''}`}>
          <p>
            Within decades, mirrors transformed from rare luxuries into household necessities.
          </p>
          <p className="final-callout">
            The person staring back at you in the bathroom mirror each morning? 
            You can thank a 19th-century chemist for that daily encounter with your own reflection.
          </p>
        </div>

        {/* Visual Break */}
        <div className={`final-visual-break ${para2Visible ? 'visible' : ''}`}>
          <div className="mirror-shard" />
        </div>

        {/* Paragraph 3: Modern Day */}
        <div ref={para3Ref} className={`final-paragraph fade-up ${para3Visible ? 'visible' : ''}`}>
          <p>
            Today, mirrors are everywhere: in our pockets as smartphone cameras, on our walls as 
            smart displays, in telescopes peering at distant galaxies.
          </p>
          <p className="final-conclusion">
            After 8,000 years, we&apos;re still fascinated by the simple act of seeing ourselves.
          </p>
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
      <div className="sources-grid">
        {/* Tier 1 - Academic/Institutional */}
        <a href="https://www.britannica.com/biography/Justus-baron-von-Liebig" target="_blank" rel="noopener noreferrer">
          Britannica — Justus von Liebig Biography
        </a>
        <a href="https://www.britannica.com/technology/mirror-optics" target="_blank" rel="noopener noreferrer">
          Britannica — Mirror Optics
        </a>
        <a href="https://www.mcgill.ca/oss/article/you-asked/how-are-mirrors-made" target="_blank" rel="noopener noreferrer">
          McGill University — How Mirrors Are Made
        </a>
        {/* Tier 2 - Reputable Publications */}
        <a href="https://www.livescience.com/34466-who-invented-mirror.html" target="_blank" rel="noopener noreferrer">
          LiveScience — History of Mirrors
        </a>
        <a href="https://www.britannica.com/art/Venetian-glass" target="_blank" rel="noopener noreferrer">
          Britannica — Venetian Glass & Murano
        </a>
        {/* Tier 3 - Reference (Supporting) */}
        <a href="https://en.wikipedia.org/wiki/Chinese_magic_mirror" target="_blank" rel="noopener noreferrer">
          Wikipedia — Chinese Magic Mirrors
        </a>
      </div>
      <p className="sources-note">
        Statistics: Global mirror market data from Business Research Insights (2024). 
        Daily mirror time from international surveys (2014-2015).
      </p>
    </div>
  </section>
);

// ==================== FOOTER ====================
const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-reflection">🪞</div>
    <p className="footer-quote">
      &ldquo;What you see in the mirror is not what others see.&rdquo;
    </p>
    <div className="footer-author">— Unknown</div>
    <p className="footer-tagline">8,000 years of asking: Who is that looking back?</p>
  </footer>
);

// ==================== MAIN ====================
const MirrorHistoryClient: React.FC = () => {
  return (
    <div className="mirror-container">
      <OrnateFrame />
      <ProgressGlow />
      <Hero />
      
      <ReflectionSection
        era="The First Gaze"
        title="Before the Mirror, There Was Water"
        text="Long before humans crafted reflective surfaces, they glimpsed themselves in still pools and calm rivers. The myth of Narcissus captures this primal encounter—the shock of seeing one's own face staring back. But nature's mirrors were fleeting, disturbed by the slightest ripple."
        reversedQuote="Know Thyself"
      />
      
      <SymmetrySection />
      
      <ReflectionSection
        era="The Venetian Secret"
        title="An Island of Mirrors"
        text="By the 16th century, the island of Murano near Venice held the world's most valuable secret: how to make clear glass mirrors. Artisans who tried to leave faced execution. The Republic understood that controlling reflection meant controlling vanity—and vanity was good business."
        reversedQuote="Reflection is Power"
      />
      
      <MercurySection />
      <MirrorSVGSection />
      <FinalChapter />
      <Sources />
      <Footer />
    </div>
  );
};

export default MirrorHistoryClient;

