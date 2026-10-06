/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import './the-diamond-cartel.css';

// ============================================================================
// TYPES
// ============================================================================

interface Source {
  title: string;
  url: string;
}

interface FigureProfile {
  name: string;
  epithet: string;
  contributions: string[];
  quote?: string;
  photograph: string;
}

// ============================================================================
// DATA
// ============================================================================

const sources: Source[] = [
  {
    title: 'Have You Ever Tried to Sell a Diamond? — The Atlantic (1982)',
    url: 'https://www.theatlantic.com/magazine/archive/1982/02/have-you-ever-tried-to-sell-a-diamond/304575/'
  },
  {
    title: 'The Diamond Empire — PBS Frontline Documentary',
    url: 'https://www.pbs.org/wgbh/pages/frontline/shows/diamond/'
  },
  {
    title: 'Diamonds, Gold and War: The Making of South Africa — Martin Meredith',
    url: 'https://www.publicaffairsbooks.com/titles/martin-meredith/diamonds-gold-and-war/9781586486419/'
  },
  {
    title: 'The Heartless Stone: A Journey Through the World of Diamonds — Tom Zoellner',
    url: 'https://us.macmillan.com/books/9780312339708/theheartlessstone'
  },
  {
    title: 'Blood Diamonds: Tracing the Path of the World\'s Most Precious Stones — Greg Campbell',
    url: 'https://www.hachettebookgroup.com/titles/greg-campbell/blood-diamonds/9780813342207/'
  },
  {
    title: 'De Beers and Beyond: The History of the International Diamond Cartel — Debora Spar, Harvard Business School',
    url: 'https://www.hbs.edu/faculty/Pages/item.aspx?num=28086'
  },
  {
    title: 'The Kimberley Process — Official Documentation',
    url: 'https://www.kimberleyprocess.com/'
  },
  {
    title: 'Global Witness Blood Diamonds Campaign',
    url: 'https://www.globalwitness.org/en/campaigns/conflict-diamonds/'
  },
  {
    title: 'Lab-Grown Diamonds: A Review — GIA (Gemological Institute of America)',
    url: 'https://www.gia.edu/gia-news-research/cvd-synthetic-diamonds'
  },
  {
    title: 'The Rise and Fall of the De Beers Diamond Monopoly — Economist',
    url: 'https://www.economist.com/business/2004/07/15/the-cartel-isnt-for-ever'
  }
];

// ============================================================================
// HOOKS
// ============================================================================

function useIntersectionObserver(
  threshold: number = 0.2
): [React.RefObject<HTMLElement | null>, boolean] {
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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

// ============================================================================
// COMPONENTS
// ============================================================================

// Progress Bar Component - Diamond Pipeline
const DiamondPipeline: React.FC = () => {
  const progress = useScrollProgress();
  
  const chapters = [
    { icon: '⛏️', label: 'Discovery', threshold: 12.5 },
    { icon: '👑', label: 'Rhodes', threshold: 25 },
    { icon: '🤝', label: 'Monopoly', threshold: 37.5 },
    { icon: '🎬', label: 'Advertising', threshold: 50 },
    { icon: '💍', label: 'Two Months', threshold: 62.5 },
    { icon: '🩸', label: 'Blood', threshold: 75 },
    { icon: '📉', label: 'Decline', threshold: 87.5 },
    { icon: '🔬', label: 'Lab', threshold: 100 },
  ];

  return (
    <div className="diamond-pipeline">
      <div className="pipeline-track">
        <div 
          className="pipeline-fill" 
          style={{ height: `${progress}%` }}
        />
        {chapters.map((chapter, index) => (
          <div 
            key={index}
            className={`pipeline-marker ${progress >= chapter.threshold ? 'active' : ''}`}
            style={{ top: `${chapter.threshold}%` }}
            title={chapter.label}
          >
            <span className="marker-icon">{chapter.icon}</span>
          </div>
        ))}
      </div>
      <div className="pipeline-diamond" style={{ top: `${progress}%` }}>
        ◇
      </div>
    </div>
  );
};

// Hero Section with Scroll-Lock Effect
const HeroSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const [heroHeight, setHeroHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const updateHeight = () => {
      if (heroRef.current) {
        setHeroHeight(heroRef.current.offsetHeight);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateHeight);
    updateHeight();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const scrollProgress = heroHeight > 0 ? Math.min(1, scrollY / heroHeight) : 0;
  
  // Animation phases based on scroll
  const phase1 = Math.min(1, scrollProgress * 5); // 0-20%
  const phase2 = Math.max(0, Math.min(1, (scrollProgress - 0.2) * 5)); // 20-40%
  const phase3 = Math.max(0, Math.min(1, (scrollProgress - 0.4) * 5)); // 40-60%
  const phase4 = Math.max(0, Math.min(1, (scrollProgress - 0.6) * 5)); // 60-80%
  const phase5 = Math.max(0, Math.min(1, (scrollProgress - 0.8) * 5)); // 80-100%

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="hero-container">
        {/* Romantic Image Layer */}
        <div 
          className="hero-romantic-layer"
          style={{ 
            opacity: 1 - phase2,
            transform: `scale(${1 + phase1 * 0.1})`,
          }}
        >
          <div className="romantic-gradient" />
          <div className="diamond-ring-visual">
            <div className="ring-box">
              <div className="diamond-sparkle">◇</div>
            </div>
          </div>
          <div 
            className="hero-forever-text"
            style={{ opacity: phase1 }}
          >
            FOREVER
          </div>
        </div>

        {/* Fracture/Crack Layer */}
        <div 
          className="hero-fracture-layer"
          style={{ opacity: phase2 }}
        >
          <div className="fracture-lines">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="fracture-line"
                style={{ 
                  transform: `rotate(${i * 45}deg)`,
                  opacity: phase2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Mining Pit Layer */}
        <div 
          className="hero-mining-layer"
          style={{ opacity: phase3 }}
        >
          <div className="mining-pit-visual">
            <div className="pit-depth" style={{ transform: `scaleY(${phase3})` }} />
          </div>
          <div className="era-marker">1867—PRESENT</div>
        </div>

        {/* Split Statistics Layer */}
        <div 
          className="hero-stats-layer"
          style={{ opacity: phase4 }}
        >
          <div className="stat-item" style={{ transitionDelay: '0s' }}>
            <span className="stat-value">90%</span>
            <span className="stat-label">global market control</span>
          </div>
          <div className="stat-item" style={{ transitionDelay: '0.1s' }}>
            <span className="stat-value">$80B</span>
            <span className="stat-label">annual industry</span>
          </div>
          <div className="stat-item" style={{ transitionDelay: '0.2s' }}>
            <span className="stat-value">50%</span>
            <span className="stat-label">resale value loss</span>
          </div>
          <div className="stat-item" style={{ transitionDelay: '0.3s' }}>
            <span className="stat-value">1938</span>
            <span className="stat-label">"tradition" invented</span>
          </div>
        </div>

        {/* Title Card Layer */}
        <div 
          className="hero-title-layer"
          style={{ opacity: phase5 }}
        >
          <div className="hero-question">
            What if everything you believe about diamonds was designed?
          </div>
          <h1 className="hero-title">
            <span className="title-line">A DIAMOND</span>
            <span className="title-line">IS FOREVER</span>
          </h1>
          <p className="hero-subtitle">
            The Manufactured Desire That Built an Empire of Blood and Brilliance
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator" style={{ opacity: 1 - phase1 }}>
          <span>Scroll to reveal</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>
    </section>
  );
};

// Chapter Section Component
interface ChapterProps {
  number: number;
  title: string;
  era: string;
  metaphor: string;
  children: React.ReactNode;
  className?: string;
}

const Chapter: React.FC<ChapterProps> = ({ 
  number, 
  title, 
  era, 
  metaphor, 
  children,
  className = ''
}) => {
  const [sectionRef, isVisible] = useIntersectionObserver(0.1);

  return (
    <section 
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={`chapter ${className} ${isVisible ? 'visible' : ''}`}
      id={`chapter-${number}`}
    >
      <div className="chapter-header">
        <span className="chapter-number">Chapter {number}</span>
        <h2 className="chapter-title">{title}</h2>
        <span className="chapter-era">{era}</span>
        <p className="chapter-metaphor">{metaphor}</p>
      </div>
      <div className="chapter-content">
        {children}
      </div>
    </section>
  );
};

// Quote Monument Component
interface QuoteMonumentProps {
  quote: string;
  attribution: string;
  year?: string;
}

const QuoteMonument: React.FC<QuoteMonumentProps> = ({ quote, attribution, year }) => {
  const [ref, isVisible] = useIntersectionObserver(0.3);

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`quote-monument ${isVisible ? 'visible' : ''}`}
    >
      <blockquote>
        <span className="quote-mark">"</span>
        <p>{quote}</p>
        <cite>
          — {attribution}
          {year && <span className="quote-year">, {year}</span>}
        </cite>
      </blockquote>
    </div>
  );
};

// Figure Profile Component
const FigureProfileCard: React.FC<{ figure: FigureProfile }> = ({ figure }) => {
  const [ref, isVisible] = useIntersectionObserver(0.2);

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`figure-profile ${isVisible ? 'visible' : ''}`}
    >
      <div className="figure-portrait">
        <div className="portrait-placeholder">
          <span className="portrait-initial">{figure.name.charAt(0)}</span>
        </div>
      </div>
      <div className="figure-info">
        <h4 className="figure-name">{figure.name}</h4>
        <p className="figure-epithet">{figure.epithet}</p>
        <ul className="figure-contributions">
          {figure.contributions.map((contribution, i) => (
            <li key={i}>{contribution}</li>
          ))}
        </ul>
        {figure.quote && (
          <p className="figure-quote">"{figure.quote}"</p>
        )}
        <p className="figure-photo-desc">{figure.photograph}</p>
      </div>
    </div>
  );
};

// Statistics Counter Component
interface StatCounterProps {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

const StatCounter: React.FC<StatCounterProps> = ({ value, label, prefix = '', suffix = '' }) => {
  const [ref, isVisible] = useIntersectionObserver(0.5);
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (isVisible) {
      // Simple animation to target value
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
      const duration = 1500;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          if (value.includes('%')) {
            setDisplayValue(Math.floor(current) + '%');
          } else if (value.includes('B')) {
            setDisplayValue('$' + Math.floor(current) + 'B');
          } else {
            setDisplayValue(String(Math.floor(current)));
          }
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`stat-counter ${isVisible ? 'visible' : ''}`}
    >
      <span className="stat-prefix">{prefix}</span>
      <span className="stat-value">{displayValue}</span>
      <span className="stat-suffix">{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
};

// Comparison Panel Component
interface ComparisonPanelProps {
  leftTitle: string;
  leftContent: React.ReactNode;
  rightTitle: string;
  rightContent: React.ReactNode;
  dividerLabel?: string;
}

const ComparisonPanel: React.FC<ComparisonPanelProps> = ({
  leftTitle,
  leftContent,
  rightTitle,
  rightContent,
  dividerLabel
}) => {
  const [ref, isVisible] = useIntersectionObserver(0.2);

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`comparison-panel ${isVisible ? 'visible' : ''}`}
    >
      <div className="comparison-left">
        <h4>{leftTitle}</h4>
        {leftContent}
      </div>
      {dividerLabel && (
        <div className="comparison-divider">
          <span>{dividerLabel}</span>
        </div>
      )}
      <div className="comparison-right">
        <h4>{rightTitle}</h4>
        {rightContent}
      </div>
    </div>
  );
};

// Content Warning Component
interface ContentWarningProps {
  message: string;
  onContinue: () => void;
  onSkip: () => void;
}

const ContentWarning: React.FC<ContentWarningProps> = ({ message, onContinue, onSkip }) => {
  return (
    <div className="content-warning">
      <div className="warning-icon">⚠️</div>
      <h3>Content Warning</h3>
      <p>{message}</p>
      <div className="warning-actions">
        <button className="btn-skip" onClick={onSkip}>Skip Chapter</button>
        <button className="btn-continue" onClick={onContinue}>Continue</button>
      </div>
    </div>
  );
};

// Sources Section Component
const SourcesSection: React.FC<{ sources: Source[] }> = ({ sources }) => {
  const [ref, isVisible] = useIntersectionObserver(0.1);

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={`sources-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="sources-content">
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
          This narrative was fact-checked against peer-reviewed sources, historical archives, 
          and investigative journalism. The story of the diamond industry is extensively documented 
          by historians, economists, and human rights organizations.
        </p>
      </div>
    </section>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const DiamondCartelClient: React.FC = () => {
  const [showBloodDiamondsWarning, setShowBloodDiamondsWarning] = useState(true);
  const [skipBloodDiamonds, setSkipBloodDiamonds] = useState(false);

  // Reduced motion check
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleContinueBloodDiamonds = useCallback(() => {
    setShowBloodDiamondsWarning(false);
  }, []);

  const handleSkipBloodDiamonds = useCallback(() => {
    setSkipBloodDiamonds(true);
    setShowBloodDiamondsWarning(false);
    // Scroll to next chapter
    const chapter7 = document.getElementById('chapter-7');
    if (chapter7) {
      chapter7.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className={`diamond-cartel-essay ${prefersReducedMotion ? 'reduced-motion' : ''}`}>
      {/* Progress Indicator */}
      <DiamondPipeline />

      {/* Hero Section */}
      <HeroSection />

      {/* Chapter 1: The Soil Ran Red */}
      <Chapter
        number={1}
        title="The Soil Ran Red"
        era="1867–1888"
        metaphor="When dirt turned to diamonds, humanity turned to madness"
        className="chapter-colonial"
      >
        <div className="narrative-block">
          <p className="narrative-intro">
            In 1867, a 15-year-old Boer boy named Erasmus Jacobs found a pretty pebble 
            near the Orange River. That pebble was a 21-carat diamond, and its discovery 
            would transform South Africa from colonial backwater to the most brutally 
            exploited territory in Africa.
          </p>
          
          <p>
            The Kimberley diamond rush began immediately. Within two years, 50,000 
            prospectors descended on claims barely larger than living rooms. The digging 
            was done almost entirely by Black African workers, lured from their lands by 
            colonial taxes that could only be paid in wages.
          </p>

          <p>
            What emerged was not a gold rush of independent miners striking it rich. 
            It was a system of industrial exploitation. Black workers were housed in 
            prison-like compounds, strip-searched daily to prevent "theft" of stones, 
            forbidden from leaving the mine premises for months at a time.
          </p>
        </div>

        <div className="visual-element pit-descent">
          <div className="pit-visualization">
            <div className="pit-layer" style={{ '--depth': '1' } as React.CSSProperties}>1867</div>
            <div className="pit-layer" style={{ '--depth': '2' } as React.CSSProperties}>1873</div>
            <div className="pit-layer" style={{ '--depth': '3' } as React.CSSProperties}>1880</div>
            <div className="pit-layer" style={{ '--depth': '4' } as React.CSSProperties}>1888</div>
          </div>
          <p className="pit-caption">
            The Big Hole at Kimberley—eventually one mile wide and 1,500 feet deep—was 
            dug entirely by hand. The death toll was never properly recorded.
          </p>
        </div>

        <div className="stat-grid">
          <StatCounter value="50000" label="Workers in the mines" suffix="+" />
          <StatCounter value="1500" label="Feet deep" suffix=" ft" />
          <StatCounter value="0" label="Black deaths recorded" prefix="~" />
        </div>

        <QuoteMonument
          quote="Into this chaos stepped a sickly young Englishman named Cecil Rhodes, 
                 who understood immediately that the real wealth wasn't in digging—it 
                 was in controlling who could dig."
          attribution="Historical narrative"
        />

        <FigureProfileCard
          figure={{
            name: "Cecil John Rhodes",
            epithet: "The Empire Builder",
            contributions: [
              "Arrived in Kimberley age 18 (1871)",
              "Began buying claims while still at Oxford",
              "Founded De Beers Mining Company (1880)",
              "Would eventually control 90% of world diamond production"
            ],
            quote: "I would annex the planets if I could.",
            photograph: "Young Rhodes at the mines, thin and ambitious, already calculating"
          }}
        />
      </Chapter>

      {/* Chapter 2: The Man Who Would Be King */}
      <Chapter
        number={2}
        title="The Man Who Would Be King"
        era="1880–1902"
        metaphor="One man's fever dream of total control"
        className="chapter-rhodes"
      >
        <div className="narrative-block">
          <p className="narrative-intro">
            Cecil Rhodes did not want to be rich. He wanted to be God.
          </p>

          <p>
            His ambition went beyond diamonds—he envisioned British rule "from Cape to 
            Cairo," the entire African continent as an Anglo-Saxon possession. Diamonds 
            were merely the means.
          </p>

          <QuoteMonument
            quote="Pure philanthropy is very well, but philanthropy plus five percent 
                   is a good deal better."
            attribution="Cecil Rhodes"
          />

          <p>
            In 1880, he formed De Beers Mining Company, named after the farming brothers 
            whose land sat above the richest deposits. His enemy was Barney Barnato, a 
            Jewish entrepreneur who controlled the neighboring Kimberley Central mine. 
            For nearly a decade, they battled for supremacy.
          </p>

          <p>
            In 1888, Rhodes won. He bought Barnato's entire operation for £5,338,650—a 
            single cheque, the largest sum ever written at the time. Barnato received a 
            De Beers directorship. He would later go insane and throw himself from a ship.
          </p>
        </div>

        <div className="cheque-visual">
          <div className="cheque-amount">£5,338,650</div>
          <div className="cheque-caption">
            The largest cheque ever written—for total control of world diamond supply
          </div>
        </div>

        <div className="narrative-block">
          <p>
            But Rhodes understood something crucial: diamonds had no inherent scarcity. 
            Unlike gold, which had limited deposits, diamonds were everywhere. If they 
            all reached the market, prices would collapse. The value of diamonds was 
            entirely artificial.
          </p>

          <p className="narrative-emphasis">
            So Rhodes created artificial scarcity. De Beers didn't just mine diamonds—it 
            controlled how many reached the market. The company hoarded stones in London 
            vaults, releasing just enough to maintain prices.
          </p>

          <p>
            It was the most successful cartel in history.
          </p>
        </div>

        <FigureProfileCard
          figure={{
            name: "Barney Barnato",
            epithet: "The Man Who Sold Everything",
            contributions: [
              "Rhodes's rival who built Kimberley Central",
              "Sold to Rhodes for record sum (1888)",
              "Mental breakdown within years",
              "Died by suicide, jumping from ship (1897)"
            ],
            quote: "I'll never be the same again.",
            photograph: "Barnato in formal dress, eyes already haunted"
          }}
        />

        <QuoteMonument
          quote="Remember that you are an Englishman, and have consequently won 
                 first prize in the lottery of life."
          attribution="Cecil Rhodes"
        />
      </Chapter>

      {/* Chapter 3: The Monopoly Machine */}
      <Chapter
        number={3}
        title="The Monopoly Machine"
        era="1902–1938"
        metaphor="The invisible hand that held every diamond on earth"
        className="chapter-monopoly"
      >
        <div className="narrative-block">
          <p className="narrative-intro">
            Cecil Rhodes died in 1902, but his machine survived him.
          </p>

          <p>
            A young German immigrant named Ernest Oppenheimer arrived in Kimberley to 
            represent a diamond trading firm. By 1929, he controlled De Beers. The 
            Oppenheimer family would maintain control for nearly a century.
          </p>

          <p>
            Ernest perfected Rhodes's cartel into something unprecedented: a global 
            distribution system that gave De Beers control not just over mining, but 
            over every step of the diamond pipeline.
          </p>
        </div>

        <div className="pipeline-visual">
          <div className="pipeline-stage">
            <span className="stage-icon">⛏️</span>
            <span className="stage-label">Mine</span>
          </div>
          <div className="pipeline-arrow">→</div>
          <div className="pipeline-stage">
            <span className="stage-icon">🔍</span>
            <span className="stage-label">Sort</span>
          </div>
          <div className="pipeline-arrow">→</div>
          <div className="pipeline-stage">
            <span className="stage-icon">📦</span>
            <span className="stage-label">Sight</span>
          </div>
          <div className="pipeline-arrow">→</div>
          <div className="pipeline-stage">
            <span className="stage-icon">💎</span>
            <span className="stage-label">Cut</span>
          </div>
          <div className="pipeline-arrow">→</div>
          <div className="pipeline-stage">
            <span className="stage-icon">💍</span>
            <span className="stage-label">Retail</span>
          </div>
          <p className="pipeline-control">De Beers controlled every step</p>
        </div>

        <div className="narrative-block">
          <p>
            The Central Selling Organization (CSO) in London became the world's diamond 
            gatekeeper. Ten times a year, selected dealers were invited to "sights"—carefully 
            assembled boxes of rough diamonds.
          </p>

          <p className="narrative-emphasis">
            You took the box at the price offered, or you were never invited back. 
            No negotiation. No inspection beforehand. Total submission or exile.
          </p>

          <p>
            By the 1930s, De Beers had total supply control—but no demand. Depression-era 
            America had little interest in luxury stones. Only 10% of American engagement 
            rings contained diamonds. Other gemstones were just as popular.
          </p>
        </div>

        <QuoteMonument
          quote="Common sense tells us that the only way to increase the value of 
                 diamonds is to make them scarce."
          attribution="Ernest Oppenheimer"
        />

        <FigureProfileCard
          figure={{
            name: "Ernest Oppenheimer",
            epithet: "The Architect of Total Control",
            contributions: [
              "German-Jewish immigrant who came to represent trading firm",
              "Took control of De Beers by 1929",
              "Created Central Selling Organization",
              "Expanded monopoly to distribution, not just mining"
            ],
            photograph: "Oppenheimer at his desk, the patient architect of monopoly"
          }}
        />
      </Chapter>

      {/* Chapter 4: Manufacturing Desire */}
      <Chapter
        number={4}
        title="Manufacturing Desire"
        era="1938–1960"
        metaphor="How Madison Avenue taught America that love has a price tag"
        className="chapter-advertising"
      >
        <div className="narrative-block">
          <p className="narrative-intro">
            In 1938, De Beers faced a crisis. Despite total supply control, demand was 
            collapsing.
          </p>

          <p>
            De Beers hired N.W. Ayer, a Philadelphia advertising agency, with an unusual 
            assignment: Don't advertise De Beers. Don't advertise specific diamonds. 
            Instead, <em>change the meaning of diamonds in American culture</em>.
          </p>

          <p className="narrative-emphasis">
            Create the desire, then own the supply.
          </p>
        </div>

        <div className="memo-visual">
          <div className="memo-content">
            <span className="memo-header">N.W. AYER INTERNAL MEMO</span>
            <p>"We are dealing with a problem in mass psychology."</p>
          </div>
        </div>

        <div className="narrative-block">
          <p>
            Frances Gerety, a young copywriter who would never marry, was assigned the 
            account. In 1947, struggling with a deadline, she scribbled four words:
          </p>
        </div>

        <div className="slogan-reveal">
          <h3 className="slogan-text">A Diamond is Forever</h3>
        </div>

        <div className="narrative-block">
          <p>
            Those four words did something extraordinary. They linked diamonds to eternal 
            love—implying that anything less was temporary, cheap, insufficient. They made 
            diamonds not a luxury but a necessity.
          </p>

          <p>
            The campaign went far beyond a slogan. De Beers planted stories about celebrity 
            engagements. They sent lecturers to college campuses. They loaned diamonds to 
            Hollywood—Marilyn Monroe singing "Diamonds Are a Girl's Best Friend" wasn't an 
            accident; it was marketing.
          </p>
        </div>

        <ComparisonPanel
          leftTitle="1938"
          leftContent={
            <div className="comparison-stat">
              <span className="big-number">10%</span>
              <p>of American brides received diamond rings</p>
            </div>
          }
          rightTitle="1965"
          rightContent={
            <div className="comparison-stat">
              <span className="big-number">80%</span>
              <p>of American brides received diamond rings</p>
            </div>
          }
          dividerLabel="27 years"
        />

        <div className="narrative-block">
          <p className="narrative-emphasis">
            A tradition invented within a generation—then made to feel eternal.
          </p>
        </div>

        <FigureProfileCard
          figure={{
            name: "Frances Gerety",
            epithet: "The Woman Who Wrote Forever",
            contributions: [
              "N.W. Ayer copywriter assigned De Beers account",
              "Created 'A Diamond is Forever' slogan (1947)",
              "Worked on the campaign for over 25 years",
              "Never married, never received a diamond engagement ring"
            ],
            photograph: "Gerety at her typewriter, architect of a tradition she never joined"
          }}
        />
      </Chapter>

      {/* Chapter 5: The Two-Month Rule */}
      <Chapter
        number={5}
        title="The Two-Month Rule"
        era="1960–1990"
        metaphor="How a made-up rule became a moral obligation"
        className="chapter-pricing"
      >
        <div className="narrative-block">
          <p className="narrative-intro">
            Having convinced America that diamonds were necessary, De Beers faced another 
            problem: how much should men spend?
          </p>

          <p>
            In the 1980s, N.W. Ayer invented the answer:
          </p>
        </div>

        <div className="rule-visual">
          <div className="rule-text">Two months' salary</div>
          <div className="rule-subtext">(Three months in Japan)</div>
        </div>

        <div className="narrative-block">
          <p>
            This wasn't tradition. It wasn't economics. It was pure invention—a number 
            designed to maximize spending while maintaining purchase rates.
          </p>

          <p>
            The genius was framing it as a question of love. Advertisements implied that 
            spending less meant loving less.
          </p>
        </div>

        <QuoteMonument
          quote="Isn't two months' salary a small price to pay for something that 
                 lasts forever?"
          attribution="De Beers Advertisement, 1980s"
        />

        <div className="calculator-visual">
          <div className="calc-row">
            <span className="calc-label">Average salary</span>
            <span className="calc-value">$60,000/year</span>
          </div>
          <div className="calc-row">
            <span className="calc-label">× 2 months</span>
            <span className="calc-value">= $10,000</span>
          </div>
          <div className="calc-row result">
            <span className="calc-label">"Expected" ring</span>
            <span className="calc-value">$10,000</span>
          </div>
          <div className="calc-row warning">
            <span className="calc-label">Resale value</span>
            <span className="calc-value">~$5,000 (50% loss)</span>
          </div>
        </div>

        <div className="narrative-block">
          <p>
            But here's what De Beers never advertised: <strong>diamonds have no resale 
            value</strong>. The moment you leave the jewelry store, your diamond loses 
            50% of its value.
          </p>

          <p>
            This wasn't accident—it was design. De Beers needed to prevent a secondary 
            market. If people sold diamonds freely, supply would increase and prices 
            would fall.
          </p>

          <p className="narrative-emphasis">
            So De Beers created the mystique of keeping diamonds "forever"—never selling, 
            passing down as heirlooms. The slogan was economics disguised as sentiment.
          </p>
        </div>
      </Chapter>

      {/* Chapter 6: Blood Diamonds */}
      {!skipBloodDiamonds && (
        <Chapter
          number={6}
          title="Blood Diamonds"
          era="1990–2003"
          metaphor="The crimson price tag that glittered in the shadows"
          className="chapter-blood"
        >
          {showBloodDiamondsWarning ? (
            <ContentWarning
              message="This chapter contains descriptions of war crimes, including references 
                       to amputations, child soldiers, and civilian casualties. These events 
                       are historically documented but deeply disturbing."
              onContinue={handleContinueBloodDiamonds}
              onSkip={handleSkipBloodDiamonds}
            />
          ) : (
            <>
              <div className="narrative-block">
                <p className="narrative-intro">
                  For decades, De Beers maintained the pleasant fiction that diamonds 
                  represented pure love. But in the 1990s, the world learned where 
                  diamonds really came from.
                </p>

                <p>
                  Sierra Leone's civil war (1991-2002) was funded by diamonds. The 
                  Revolutionary United Front (RUF), backed by Liberia's Charles Taylor, 
                  captured diamond mines and traded stones for weapons.
                </p>

                <p className="narrative-emphasis">
                  Their signature terror: amputating the hands of civilians, including 
                  children, to spread fear and clear mining areas.
                </p>
              </div>

              <div className="stat-grid blood-stats">
                <StatCounter value="75000" label="People killed" suffix="+" />
                <StatCounter value="11" label="Average mining child age" suffix=" years" />
              </div>

              <div className="narrative-block">
                <p>
                  These weren't rogue operations. The system leaked because the system 
                  allowed it. De Beers, which had long bought diamonds from any source 
                  to maintain supply control, was implicated.
                </p>

                <p>
                  Global Witness and other NGOs exposed the crisis. The term "blood 
                  diamonds" entered public consciousness. In 2000, the diamond industry 
                  established the Kimberley Process—a certification system meant to 
                  prevent conflict diamonds from entering legitimate trade.
                </p>

                <p className="narrative-emphasis">
                  Critics called it a fig leaf. The Kimberley Process certified governments, 
                  not individual stones. Human rights organizations found that conflict and 
                  exploitation continued, certified by the very system meant to prevent it.
                </p>
              </div>

              <FigureProfileCard
                figure={{
                  name: "Charmian Gooch",
                  epithet: "The Investigator",
                  contributions: [
                    "Co-founder of Global Witness",
                    "Led campaign exposing blood diamond trade",
                    "Forced industry acknowledgment and reforms"
                  ],
                  quote: "This is an industry built on suppressing information.",
                  photograph: "Gooch with campaign materials, the disruptor"
                }}
              />
            </>
          )}
        </Chapter>
      )}

      {/* Chapter 7: The Unraveling */}
      <Chapter
        number={7}
        title="The Unraveling"
        era="2000–2015"
        metaphor="The grip loosens when the secret is spoken"
        className="chapter-decline"
      >
        <div className="narrative-block">
          <p className="narrative-intro">
            The monopoly that Rhodes built and the Oppenheimers perfected began crumbling 
            in the 1990s—not from competition, but from exposure.
          </p>

          <p>
            Australia's Argyle mine refused to join the De Beers system. Russia's state 
            diamond company began selling directly. Canadian mines bypassed the CSO entirely.
          </p>
        </div>

        <div className="market-share-visual">
          <div className="share-bar">
            <div className="share-fill" style={{ width: '90%' }}>
              <span>90% (1990)</span>
            </div>
          </div>
          <div className="share-bar">
            <div className="share-fill declining" style={{ width: '40%' }}>
              <span>~35% (2015)</span>
            </div>
          </div>
        </div>

        <div className="narrative-block">
          <p>
            In 2001, De Beers agreed to plead guilty to US price-fixing charges, paying 
            $10 million. The company had been locked out of direct US operations since 
            1945 antitrust rulings.
          </p>

          <p>
            The Oppenheimer family, sensing change, began extracting themselves. In 2011, 
            they sold their 40% stake to Anglo American for $5.1 billion.
          </p>

          <p className="narrative-emphasis">
            A family dynasty that began in 1902 ended not with a battle, but with a 
            strategic retreat.
          </p>
        </div>

        <QuoteMonument
          quote="The world changed. We changed with it."
          attribution="Nicky Oppenheimer"
          year="2011"
        />

        <FigureProfileCard
          figure={{
            name: "Nicky Oppenheimer",
            epithet: "The Last Oppenheimer",
            contributions: [
              "Grandson of Ernest, inherited control",
              "Oversaw decline from 90% to 40% market share",
              "Sold family stake for $5.1 billion"
            ],
            photograph: "Nicky Oppenheimer in modern office, the elegant ending of an era"
          }}
        />
      </Chapter>

      {/* Chapter 8: The End of Forever */}
      <Chapter
        number={8}
        title="The End of Forever"
        era="2015–Present"
        metaphor="When chemistry creates what geology took billions of years to form"
        className="chapter-future"
      >
        <div className="narrative-block">
          <p className="narrative-intro">
            The final irony: De Beers spent a century convincing the world that diamonds 
            were rare and precious. Now technology has made them common.
          </p>

          <p>
            Lab-grown diamonds are chemically, physically, and optically identical to 
            mined diamonds. Even trained gemologists cannot tell them apart without 
            specialized equipment. They cost 70-90% less.
          </p>

          <p>
            They're also, inarguably, more ethical. No mining. No environmental devastation. 
            No blood.
          </p>
        </div>

        <ComparisonPanel
          leftTitle="Natural Diamond"
          leftContent={
            <div className="diamond-comparison">
              <div className="diamond-icon natural">◇</div>
              <ul>
                <li>Billions of years to form</li>
                <li>Mining required</li>
                <li>Environmental impact</li>
                <li>~$15,000 for 1 carat</li>
              </ul>
            </div>
          }
          rightTitle="Lab Diamond"
          rightContent={
            <div className="diamond-comparison">
              <div className="diamond-icon lab">◇</div>
              <ul>
                <li>Weeks to create</li>
                <li>No mining</li>
                <li>Minimal footprint</li>
                <li>~$1,500 for 1 carat</li>
              </ul>
            </div>
          }
          dividerLabel="Identical"
        />

        <div className="narrative-block">
          <p>
            At first, De Beers dismissed lab diamonds as "fake." By 2018, the company 
            surrendered—launching its own lab diamond brand at commodity-level pricing.
          </p>
        </div>

        <div className="stat-grid">
          <StatCounter value="70" label="Gen Z prefers lab diamonds" suffix="%" />
          <StatCounter value="30" label="De Beers market share" suffix="%" prefix="<" />
        </div>

        <div className="narrative-block">
          <p>
            The mythology is fracturing. Young consumers don't believe diamonds are rare—
            because they're not. They don't believe spending more equals loving more—because 
            it doesn't.
          </p>

          <p className="narrative-emphasis">
            "A Diamond is Forever" was the most successful advertising slogan ever written. 
            But forever is a long time. And the forever De Beers invented may not survive 
            the generation that can simply make their own diamonds.
          </p>
        </div>

        <div className="closing-question">
          <p>
            The question isn't which diamond is real. The question is whether the story 
            was ever true.
          </p>
        </div>
      </Chapter>

      {/* Sources Section */}
      <SourcesSection sources={sources} />

      {/* Footer */}
      <footer className="essay-footer">
        <div className="footer-content">
          <p className="footer-note">
            This visual essay documents the history of the diamond industry through 
            verified historical sources. The story of De Beers is extensively documented 
            by historians, economists, journalists, and human rights organizations.
          </p>
          <div className="footer-cta">
            <a href="/essays/visual" className="btn-explore">
              Explore More Visual Essays
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DiamondCartelClient;

