"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { Playfair_Display, Source_Serif_4, JetBrains_Mono } from 'next/font/google';
import './the-complete-history-of-soda.css';

// =============================================================================
// SELF-HOSTED FONTS (next/font)
// Eliminates external Google Fonts request, auto-subsets, improves LCP
// =============================================================================

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-data',
  display: 'swap',
});

/*
 * THE COMPLETE HISTORY OF SODA - Archive Drawer Scrollytelling
 *
 * Anti-Pattern-Matching Audit (FORBIDDEN from DESIGN-RESEARCH.md):
 * X NO bubble animations (used in who-invented-soda)
 * X NO liquid fill effects (used in who-invented-soda)
 * X NO bubble-based data viz (used in who-invented-soda)
 * X NO pouring/carbonation themes in mechanics
 *
 * UNIQUE MECHANICS FOR THIS STORY:
 * 1. Archive Drawer reveals - sections slide in like file drawers
 * 2. Era Crossfade - smooth color palette transitions between eras
 * 3. Ledger Counter - animated numerical data like old accounting ledgers
 * 4. Vertical Era Timeline - progress bar with era-specific colors
 *
 * 7-ERA COLOR PROGRESSION:
 * 1. Scientific Spark (1767-1780s) - Copper/Enlightenment tones
 * 2. Mineral Water Men (1783-1850) - Georgian green
 * 3. Pharmacy Counter (1850s-1920) - Brass gold/apothecary
 * 4. Building the Brands (1900-1940) - Chrome/Art Deco
 * 5. Following the Flag (1941-1959) - Olive drab/military
 * 6. Cola Wars (1959-1990) - Coca-Cola red vs Pepsi blue
 * 7. Global Fizz (1990-Present) - Clean white/modern
 */

// ==================== TYPES ====================
interface Era {
  id: string;
  number: number;
  name: string;
  years: string;
  color: string;
  accentColor: string;
}

interface Figure {
  name: string;
  role: string;
  years: string;
  contribution: string;
  image?: string;
  imageAlt?: string;
  attribution?: string;
}

// ==================== IMAGE SOURCES ====================
// All images verified for licensing - see research/IMAGES.md
const IMAGES = {
  josephPriestley: "https://images.esy.com/essays/the-complete-history-of-soda/priestley.61c3bfb343.webp",
  pneumaticTrough: "https://images.esy.com/essays/the-complete-history-of-soda/priestley-joseph-pneumatic-trough.c6a49bc172.webp",
  torbernBergman: "https://images.esy.com/essays/the-complete-history-of-soda/torbern-bergman.3d82140404.webp",
  johannSchweppe: "https://images.esy.com/essays/the-complete-history-of-soda/johann-jacob-schweppe.94e9a2cfc9.webp",
  benjaminSilliman: "https://images.esy.com/essays/the-complete-history-of-soda/benjamin-silliman.a5f84096b5.webp",
  johnPemberton: "https://images.esy.com/essays/the-complete-history-of-soda/john-pemberton.1ea2ad4604.webp",
  asaCandler: "https://images.esy.com/essays/the-complete-history-of-soda/asa-candler.61dfd0d379.webp",
  calebBradham: "https://images.esy.com/essays/the-complete-history-of-soda/caleb-davis-bradham.6cdea1918d.webp",
  charlesHires: "https://images.esy.com/essays/the-complete-history-of-soda/charles-elmer-hires.9fc8e5873c.webp",
  cocaCola1890sAd: "https://images.esy.com/essays/the-complete-history-of-soda/cocacola-5cents-1900.1904ccdd5d.webp",
  cocaCola5CentsLOC: "https://images.esy.com/essays/the-complete-history-of-soda/drink-coca-cola-5-cents.cfd3f4e715.webp",
  sodaFountainWeeds: "https://images.esy.com/essays/the-complete-history-of-soda/soda-fountain-weeds-pharmacy.5e1c013854.webp",
  sodaJerk: "https://images.esy.com/essays/the-complete-history-of-soda/soda-jerk.b15d30fb94.webp",
  contourBottlePrototype: "https://images.esy.com/essays/the-complete-history-of-soda/contour-bottle-prototype.b45d13f41d.webp",
  contourBottlePatent: "https://images.esy.com/essays/the-complete-history-of-soda/coke-bottle-patent.799e9ff35a.webp",
  vintageVendingMachine: "https://images.esy.com/essays/the-complete-history-of-soda/vintage-vending-machine.7c2fb5798e.webp",
  wwiiCocaColaAd: "https://images.esy.com/essays/the-complete-history-of-soda/wwii-coca-cola-ad.a9a43b51c8.webp",
  bottlingPlant1940: "https://images.esy.com/essays/the-complete-history-of-soda/coca-cola-bottling-plant.aae0c56bdb.webp",
  kitchenDebate: "https://images.esy.com/essays/the-complete-history-of-soda/kitchen-debate.eff685a43a.webp",
  newCokeCan: "https://images.esy.com/essays/the-complete-history-of-soda/new-coke-can.b374fab82d.webp",
  pepsiChallenge: "https://images.esy.com/essays/the-complete-history-of-soda/pepsi-challenge.e3b919e4f8.webp",
  deliveryTruckTaiwan: "https://images.esy.com/essays/the-complete-history-of-soda/delivery-truck-taiwan.c8a3510a03.webp",
  robertWoodruff: "https://images.esy.com/essays/the-complete-history-of-soda/robert-woodruff.c5ad3cc5bb.webp",
  charlesAlderton: "https://images.esy.com/essays/the-complete-history-of-soda/charles-alderton.e80a5a1551.webp",
  donaldKendall: "https://images.esy.com/essays/the-complete-history-of-soda/donald-kendall.cd15854e1a.webp",
  rootGlassCompanyTeam: "https://images.esy.com/essays/the-complete-history-of-soda/root-glass-company-team.e4f551e346.webp",
} as const;

// ==================== ERA DEFINITIONS ====================
const ERAS: Era[] = [
  { id: 'scientific-spark', number: 1, name: 'The Scientific Spark', years: '1767-1780s', color: '#B87333', accentColor: '#E8C090' },
  { id: 'mineral-water-men', number: 2, name: 'The Mineral Water Men', years: '1783-1850', color: '#2D5A4A', accentColor: '#88B5A0' },
  { id: 'pharmacy-counter', number: 3, name: 'The Pharmacy Counter', years: '1850s-1920', color: '#C5A04F', accentColor: '#F5E6C8' },
  { id: 'building-brands', number: 4, name: 'Building the Brands', years: '1900-1940', color: '#7B8B8C', accentColor: '#D4DCDD' },
  { id: 'following-flag', number: 5, name: 'Following the Flag', years: '1941-1959', color: '#556B2F', accentColor: '#C4D4A8' },
  { id: 'cola-wars', number: 6, name: 'The Cola Wars', years: '1959-1990', color: '#8B0000', accentColor: '#1E3A8A' },
  { id: 'global-fizz', number: 7, name: 'Global Fizz', years: '1990-Present', color: '#F5F5F5', accentColor: '#2563EB' },
];

// ==================== KEY FIGURES ====================
const FIGURES: Figure[] = [
  {
    name: 'Joseph Priestley',
    role: 'Discoverer of Carbonation',
    years: '1733-1804',
    contribution: 'First to create artificial carbonated water in 1767 at a Leeds brewery. Called it his "happiest discovery."',
    image: IMAGES.josephPriestley,
    imageAlt: 'Portrait of Joseph Priestley by Ellen Sharples',
    attribution: 'Ellen Sharples, Public Domain'
  },
  {
    name: 'Johann Jacob Schweppe',
    role: 'First Commercial Producer',
    years: '1740-1821',
    contribution: 'German-Swiss watchmaker who commercialized carbonated water in Geneva (1783) and London (1792).',
    image: IMAGES.johannSchweppe,
    imageAlt: 'Portrait of Johann Jacob Schweppe, 1783',
    attribution: 'Public Domain (1783)'
  },
  {
    name: 'John Stith Pemberton',
    role: 'Inventor of Coca-Cola',
    years: '1831-1888',
    contribution: 'Atlanta pharmacist who created Coca-Cola on May 8, 1886. Civil War veteran with morphine addiction.',
    image: IMAGES.johnPemberton,
    imageAlt: 'Photograph of John Stith Pemberton',
    attribution: 'Public Domain'
  },
  {
    name: 'Asa Griggs Candler',
    role: 'Marketing Pioneer',
    years: '1851-1929',
    contribution: 'Bought Coca-Cola for $2,300 and invented modern brand marketing. Built a $25 million empire.',
    image: IMAGES.asaCandler,
    imageAlt: 'Asa G. Candler by Harris & Ewing, 1923',
    attribution: 'Harris & Ewing, Library of Congress'
  },
  {
    name: 'Caleb Bradham',
    role: 'Creator of Pepsi-Cola',
    years: '1867-1934',
    contribution: 'North Carolina pharmacist who created "Brad\'s Drink" in 1893, renamed Pepsi-Cola in 1898.',
    image: IMAGES.calebBradham,
    imageAlt: 'Photograph of Caleb Davis Bradham, circa 1900',
    attribution: 'Public Domain'
  },
  {
    name: 'Robert W. Woodruff',
    role: 'Global Expansion Architect',
    years: '1889-1985',
    contribution: 'Led Coca-Cola\'s WWII expansion: 64 bottling plants, 5 billion bottles to troops.',
    image: IMAGES.robertWoodruff,
    imageAlt: 'Robert Winship Woodruff, President of Coca-Cola, 1944',
    attribution: 'Joseph Janney Steinmetz, State Archives of Florida'
  },
  {
    name: 'Charles Hires',
    role: 'Root Beer Pioneer',
    years: '1851-1937',
    contribution: 'Philadelphia pharmacist who created Hires Root Beer (1876) and pioneered national advertising.',
    image: IMAGES.charlesHires,
    imageAlt: 'Portrait of Charles Elmer Hires, 1902',
    attribution: 'Moses King, Public Domain'
  },
  {
    name: 'Charles Alderton',
    role: 'Dr Pepper Inventor',
    years: '1857-1941',
    contribution: 'Waco, Texas pharmacist who created Dr Pepper in 1885—America\'s oldest major soft drink brand.',
    image: IMAGES.charlesAlderton,
    imageAlt: 'Photograph of Charles Alderton',
    attribution: 'Public Domain via Wikimedia Commons'
  },
  {
    name: 'Earl R. Dean',
    role: 'Contour Bottle Designer',
    years: '1890-1972',
    contribution: 'Designed the iconic Coca-Cola contour bottle (1915) that became recognizable even in the dark.',
    image: IMAGES.rootGlassCompanyTeam,
    imageAlt: 'Root Glass Company team, Earl Dean stands 4th from right',
    attribution: 'Vigo County Historical Museum, CC BY-NC-SA 4.0'
  },
  {
    name: 'Roberto Goizueta',
    role: 'New Coke Architect',
    years: '1931-1997',
    contribution: 'Cuban-born CEO who launched New Coke (1985). Called it "smoother, rounder, yet bolder."'
    // No public domain image available
  },
  {
    name: 'Donald Kendall',
    role: 'Pepsi Cold War Strategist',
    years: '1921-2020',
    contribution: 'Got Pepsi into Khrushchev\'s hand (1959). Later traded cola for Soviet submarines.',
    image: IMAGES.donaldKendall,
    imageAlt: 'Donald McIntosh Kendall, PepsiCo CEO',
    attribution: 'Public Domain via Wikimedia Commons'
  },
];

// ==================== TIMELINE DATA ====================
const TIMELINE_EVENTS = [
  { year: 1767, event: 'Priestley discovers carbonation at Leeds brewery', era: 1 },
  { year: 1772, event: 'Priestley publishes "Impregnating Water with Fixed Air"', era: 1 },
  { year: 1773, event: 'Priestley receives Copley Medal from Royal Society', era: 1 },
  { year: 1783, event: 'Schweppe founds company in Geneva', era: 2 },
  { year: 1792, event: 'Schweppes expands to London', era: 2 },
  { year: 1831, event: 'Schweppes receives Royal Warrant', era: 2 },
  { year: 1851, event: 'Schweppes supplies the Great Exhibition', era: 2 },
  { year: 1876, event: 'Hires Root Beer debuts at Centennial Exhibition', era: 3 },
  { year: 1885, event: 'Dr Pepper invented in Waco, Texas', era: 3 },
  { year: 1886, event: 'Coca-Cola invented in Atlanta', era: 3 },
  { year: 1892, event: 'Candler founds The Coca-Cola Company', era: 3 },
  { year: 1893, event: 'Pepsi-Cola created in New Bern, NC', era: 3 },
  { year: 1899, event: 'First Coca-Cola bottling contract signed', era: 3 },
  { year: 1903, event: 'Cocaine removed from Coca-Cola formula', era: 3 },
  { year: 1915, event: 'Iconic contour bottle designed', era: 4 },
  { year: 1919, event: 'Ernest Woodruff acquires Coca-Cola', era: 4 },
  { year: 1923, event: 'Robert Woodruff becomes president', era: 4 },
  { year: 1929, event: 'First coin-operated Coke vending machines', era: 4 },
  { year: 1941, event: 'Woodruff pledges 5-cent Coke for troops', era: 5 },
  { year: 1943, event: 'Eisenhower orders 3M bottles for North Africa', era: 5 },
  { year: 1945, event: '64 overseas bottling plants established', era: 5 },
  { year: 1950, event: 'Coca-Cola owns 85% of US vending machines', era: 5 },
  { year: 1959, event: 'Khrushchev drinks Pepsi at Moscow exhibition', era: 6 },
  { year: 1975, event: 'Pepsi Challenge launches in Dallas', era: 6 },
  { year: 1983, event: 'Diet Coke becomes #3 soft drink', era: 6 },
  { year: 1985, event: 'New Coke launches; Classic returns 79 days later', era: 6 },
  { year: 1990, event: 'Pepsi trades for Soviet submarines', era: 6 },
  { year: 2000, event: 'Global soft drink market reaches $200B', era: 7 },
  { year: 2010, event: 'Coca-Cola reaches 1.5B daily servings', era: 7 },
  { year: 2024, event: '1.9 billion Coca-Cola servings daily', era: 7 },
];

// ==================== PROGRESS BAR ====================
const EraProgress: React.FC<{ currentEra: number }> = ({ currentEra }) => {
  return (
    <nav className="era-progress" aria-label="Era navigation">
      <div className="era-progress-track">
        {ERAS.map((era) => (
          <div
            key={era.id}
            className={`era-progress-segment ${currentEra >= era.number ? 'active' : ''}`}
            style={{
              '--era-color': era.color,
              '--era-accent': era.accentColor,
            } as React.CSSProperties}
            aria-label={`Era ${era.number}: ${era.name}`}
          >
            <span className="era-progress-number">{era.number}</span>
          </div>
        ))}
      </div>
    </nav>
  );
};

// ==================== HERO ====================
const Hero: React.FC = () => (
  <header className="soda-hero">
    <div className="soda-hero-archive">
      <div className="archive-label">ARCHIVE FILE No. 1767-2024</div>
      <div className="archive-classification">COMPREHENSIVE HISTORY</div>
    </div>

    <div className="soda-hero-content">
      <div className="soda-hero-eyebrow">From Scientific Discovery to Global Phenomenon</div>

      <h1 className="soda-hero-title">
        <span className="title-line">The Complete</span>
        <span className="title-line title-main">History of Soda</span>
      </h1>

      <p className="soda-hero-tagline">
        How a Leeds brewery experiment became 1.9 billion daily servings.
        The pharmacists, the marketers, the wars, and the 79-day mistake.
      </p>

      <div className="soda-hero-stats">
        <div className="stat-block">
          <span className="stat-value">260</span>
          <span className="stat-label">Years of History</span>
        </div>
        <div className="stat-block">
          <span className="stat-value">$450B+</span>
          <span className="stat-label">Global Market</span>
        </div>
        <div className="stat-block">
          <span className="stat-value">200+</span>
          <span className="stat-label">Countries</span>
        </div>
      </div>
    </div>

    <div className="soda-hero-scroll">
      <span>Open the archive</span>
      <div className="scroll-drawer-icon" aria-hidden="true" />
    </div>
  </header>
);

// ==================== ARCHIVE DRAWER SECTION ====================
interface ArchiveDrawerProps {
  era: Era;
  children: React.ReactNode;
}

const ArchiveDrawer: React.FC<ArchiveDrawerProps> = ({ era, children }) => {
  const ref = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsOpen(true); },
      { threshold: 0.15, rootMargin: '-50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`archive-drawer ${isOpen ? 'drawer-open' : ''}`}
      style={{
        '--era-color': era.color,
        '--era-accent': era.accentColor,
      } as React.CSSProperties}
      data-era={era.id}
      aria-labelledby={`era-${era.id}-title`}
    >
      <div className="drawer-tab">
        <span className="drawer-era-number">ERA {era.number}</span>
        <span className="drawer-era-years">{era.years}</span>
      </div>

      <div className="drawer-content">
        <header className="drawer-header">
          <h2 id={`era-${era.id}-title`} className="drawer-title">{era.name}</h2>
          <div className="drawer-period">{era.years}</div>
        </header>

        {children}
      </div>
    </section>
  );
};

// ==================== LEDGER COUNTER ====================
interface LedgerCounterProps {
  value: string;
  label: string;
  unit?: string;
}

const LedgerCounter: React.FC<LedgerCounterProps> = ({ value, label, unit }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`ledger-counter ${isVisible ? 'counted' : ''}`}>
      <div className="ledger-value">
        {value.split('').map((char, i) => (
          <span
            key={i}
            className="ledger-digit"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {char}
          </span>
        ))}
        {unit && <span className="ledger-unit">{unit}</span>}
      </div>
      <div className="ledger-label">{label}</div>
    </div>
  );
};

// ==================== FIGURE PROFILE CARD ====================
interface FigureCardProps {
  figure: Figure;
  index: number;
}

const FigureCard: React.FC<FigureCardProps> = ({ figure, index }) => {
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
    <article
      ref={ref}
      className={`figure-card ${isVisible ? 'revealed' : ''} ${figure.image ? 'has-image' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="figure-index">{String(index + 1).padStart(2, '0')}</div>
      {figure.image && (
        <div className="figure-image-container">
          <img
            src={figure.image}
            alt={figure.imageAlt || `Portrait of ${figure.name}`}
            className="figure-image"
            loading="lazy"
          />
          {figure.attribution && (
            <span className="figure-attribution">{figure.attribution}</span>
          )}
        </div>
      )}
      <div className="figure-content">
        <h3 className="figure-name">{figure.name}</h3>
        <div className="figure-role">{figure.role}</div>
        <div className="figure-years">{figure.years}</div>
        <p className="figure-contribution">{figure.contribution}</p>
      </div>
    </article>
  );
};

// ==================== TIMELINE VISUALIZATION ====================
const ArchiveTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      setActiveIndex(Math.floor(progress * TIMELINE_EVENTS.length));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="archive-timeline">
      <div className="timeline-header">
        <h2>260 Years in the Archive</h2>
        <p className="timeline-subtitle">Key moments in carbonated history</p>
      </div>

      <div ref={containerRef} className="timeline-track">
        {TIMELINE_EVENTS.map((event, index) => {
          const era = ERAS[event.era - 1];
          return (
            <div
              key={`${event.year}-${index}`}
              className={`timeline-event ${index <= activeIndex ? 'filed' : ''}`}
              style={{
                '--era-color': era.color,
                '--era-accent': era.accentColor,
              } as React.CSSProperties}
            >
              <div className="timeline-year">{event.year}</div>
              <div className="timeline-marker" />
              <div className="timeline-description">{event.event}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// ==================== COLA WARS SPLIT ====================
const ColaWarsSplit: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [splitActive, setSplitActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSplitActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={`cola-wars-split ${splitActive ? 'split-active' : ''}`} data-era="cola-wars">
      <h2 className="split-header">The Cola Wars</h2>
      <p className="split-intro">
        Between 1975 and 1990, two companies waged the most intense marketing battle
        in commercial history. The weapon: perception. The battlefield: your mind.
      </p>

      <figure className="cola-wars-hero-image">
        <img
          src={IMAGES.kitchenDebate}
          alt="Nixon and Khrushchev at the Kitchen Debate, Moscow 1959"
          className="chapter-image"
          loading="lazy"
        />
        <figcaption>
          The Kitchen Debate (July 24, 1959): Nixon and Khrushchev at the American
          National Exhibition in Moscow. Donald Kendall ensured Pepsi was in
          Khrushchev&apos;s hand. Photo: Thomas J. O&apos;Halloran, Library of Congress.
        </figcaption>
      </figure>

      <div className="split-container">
        <div className="split-side split-coca">
          <div className="split-brand">Coca-Cola</div>
          <div className="split-founded">Est. 1886 | Atlanta, Georgia</div>

          <figure className="split-artifact">
            <img
              src={IMAGES.newCokeCan}
              alt="New Coke can from 1985"
              loading="lazy"
            />
            <figcaption>The 79-Day Mistake</figcaption>
          </figure>

          <div className="split-stats">
            <div className="split-stat">
              <span className="split-stat-value">60.5%</span>
              <span className="split-stat-label">1975 Market Share</span>
            </div>
            <div className="split-stat">
              <span className="split-stat-value">38.8%</span>
              <span className="split-stat-label">1984 Market Share</span>
            </div>
          </div>

          <div className="split-fact">
            <strong>The 79-Day Mistake:</strong> New Coke launched April 23, 1985.
            Classic returned July 11, 1985. 1,500 calls/day to the protest hotline.
          </div>
        </div>

        <div className="split-divider">
          <span className="split-vs">VS</span>
        </div>

        <div className="split-side split-pepsi">
          <div className="split-brand">Pepsi-Cola</div>
          <div className="split-founded">Est. 1893 | New Bern, North Carolina</div>

          <figure className="split-artifact">
            <img
              src={IMAGES.pepsiChallenge}
              alt="Pepsi Challenge promotional materials from 1980s"
              loading="lazy"
            />
            <figcaption>The Pepsi Challenge</figcaption>
          </figure>

          <div className="split-stats">
            <div className="split-stat">
              <span className="split-stat-value">23.3%</span>
              <span className="split-stat-label">1975 Market Share</span>
            </div>
            <div className="split-stat">
              <span className="split-stat-value">31.7%</span>
              <span className="split-stat-label">1984 Market Share</span>
            </div>
          </div>

          <div className="split-fact">
            <strong>The Pepsi Challenge:</strong> Blind taste tests in Dallas (1975)
            showed consumers preferred Pepsi. The gap closed by 23 points in a decade.
          </div>
        </div>
      </div>

      <blockquote className="split-quote">
        &quot;We&apos;re disarming the Soviet Union faster than you are.&quot;
        <cite>— Donald Kendall to Brent Scowcroft, after trading Pepsi for 17 Soviet submarines</cite>
      </blockquote>
    </section>
  );
};

// ==================== DATA VISUALIZATION ====================
const DataVisualization: React.FC = () => {
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

  const marketData = [
    { label: 'Coca-Cola Co.', value: 43, color: '#E53935' },
    { label: 'PepsiCo', value: 24, color: '#1E88E5' },
    { label: 'Keurig Dr Pepper', value: 8, color: '#7B1FA2' },
    { label: 'Others', value: 25, color: '#757575' },
  ];

  return (
    <section ref={ref} className={`data-viz-section ${isVisible ? 'data-visible' : ''}`}>
      <h2>The Industry Today</h2>
      <p className="data-intro">
        What began with Priestley&apos;s brewery experiment now constitutes one of the
        largest consumer goods industries on Earth.
      </p>

      <div className="data-grid">
        <div className="data-card data-card-large">
          <LedgerCounter value="1.9" label="Billion Coca-Cola servings daily" unit="B" />
        </div>

        <div className="data-card data-card-large">
          <LedgerCounter value="450" label="Billion USD global market" unit="B" />
        </div>

        <div className="data-card">
          <LedgerCounter value="200" label="Countries with Coca-Cola" unit="+" />
        </div>

        <div className="data-card">
          <LedgerCounter value="2" label="Countries without (N. Korea, Cuba)" />
        </div>
      </div>

      <div className="market-share-viz">
        <h3>Global Carbonated Soft Drink Market Share (2024)</h3>
        <div className="bar-chart">
          {marketData.map((item, index) => (
            <div
              key={item.label}
              className="bar-row"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <span className="bar-label">{item.label}</span>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{
                    width: isVisible ? `${item.value}%` : '0%',
                    backgroundColor: item.color,
                    transitionDelay: `${index * 0.15 + 0.3}s`
                  }}
                />
              </div>
              <span className="bar-value">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== BIBLIOGRAPHY ====================
const Bibliography: React.FC = () => (
  <section className="bibliography">
    <h2>Sources & Further Reading</h2>

    <div className="source-category">
      <h3>Primary & Academic Sources</h3>
      <ul className="source-list">
        <li>
          <a href="https://www.ypsyork.org/resources/yorkshire-scientists-and-innovators/joseph_priestley/" target="_blank" rel="noopener noreferrer">
            Yorkshire Philosophical Society — Joseph Priestley
          </a>
        </li>
        <li>
          <a href="https://www.sciencehistory.org/stories/magazine/powerful-effervescence/" target="_blank" rel="noopener noreferrer">
            Science History Institute — Powerful Effervescence
          </a>
        </li>
        <li>
          <a href="https://www.georgiaencyclopedia.org/articles/business-economy/john-stith-pemberton-1831-1888/" target="_blank" rel="noopener noreferrer">
            New Georgia Encyclopedia — John Stith Pemberton
          </a>
        </li>
        <li>
          <a href="https://www.georgiaencyclopedia.org/articles/business-economy/robert-w-woodruff-1889-1985/" target="_blank" rel="noopener noreferrer">
            New Georgia Encyclopedia — Robert W. Woodruff
          </a>
        </li>
        <li>
          <a href="https://www.ncpedia.org/biography/bradham-caleb-davis" target="_blank" rel="noopener noreferrer">
            NCpedia — Caleb Bradham Biography
          </a>
        </li>
        <li>
          <a href="https://www.britannica.com/money/Asa-Griggs-Candler" target="_blank" rel="noopener noreferrer">
            Britannica — Asa Griggs Candler
          </a>
        </li>
        <li>
          <a href="https://pabook.libraries.psu.edu/literary-cultural-heritage-map-pa/feature-articles/hires-root-beer-great-health-drink" target="_blank" rel="noopener noreferrer">
            Pennsylvania Center for the Book — Hires Root Beer
          </a>
        </li>
        <li>
          <a href="https://www.ncpedia.org/pepsi-cola" target="_blank" rel="noopener noreferrer">
            NCpedia — Pepsi-Cola Company History
          </a>
        </li>
        <li>
          <a href="https://www.britannica.com/biography/Roberto-Crispulo-Goizueta" target="_blank" rel="noopener noreferrer">
            Britannica — Roberto Goizueta
          </a>
        </li>
        <li>
          <a href="https://philadelphiaencyclopedia.org/essays/root-beer/" target="_blank" rel="noopener noreferrer">
            Philadelphia Encyclopedia — Root Beer
          </a>
        </li>
        <li>
          <a href="https://connecticuthistory.org/benjamin-silliman-and-soda-water-who-knew/" target="_blank" rel="noopener noreferrer">
            Connecticut History — Benjamin Silliman and Soda Water
          </a>
        </li>
      </ul>
    </div>

    <div className="source-category">
      <h3>Corporate Archives & Official Sources</h3>
      <ul className="source-list">
        <li>
          <a href="https://www.coca-colacompany.com/about-us/history/the-birth-of-a-refreshing-idea" target="_blank" rel="noopener noreferrer">
            Coca-Cola Company — The Birth of a Refreshing Idea
          </a>
        </li>
        <li>
          <a href="https://www.coca-colacompany.com/about-us/history/the-history-of-the-coca-cola-contour-bottle" target="_blank" rel="noopener noreferrer">
            Coca-Cola Company — History of the Contour Bottle
          </a>
        </li>
        <li>
          <a href="https://www.coca-colacompany.com/about-us/history/new-coke-the-most-memorable-marketing-blunder-ever" target="_blank" rel="noopener noreferrer">
            Coca-Cola Company — New Coke: The Most Memorable Marketing Blunder
          </a>
        </li>
        <li>
          <a href="https://www.uso.org/stories/155-the-uso-coca-cola-a-refreshing-75-year-partnership" target="_blank" rel="noopener noreferrer">
            USO — Coca-Cola Partnership (WWII Expansion)
          </a>
        </li>
        <li>
          <a href="https://www.coca-colacompany.com/faqs/how-many-drinks-does-the-coca-cola-company-sell-worldwide-each-day" target="_blank" rel="noopener noreferrer">
            Coca-Cola Company — Daily Servings FAQ
          </a>
        </li>
      </ul>
    </div>

    <div className="source-category">
      <h3>Journalism & Analysis</h3>
      <ul className="source-list">
        <li>
          <a href="https://www.npr.org/sections/money/2012/11/15/165143816/why-coke-cost-a-nickel-for-70-years" target="_blank" rel="noopener noreferrer">
            NPR Planet Money — Why Coke Cost a Nickel for 70 Years
          </a>
        </li>
        <li>
          <a href="https://www.history.com/articles/cola-wars-pepsi-new-coke-failure" target="_blank" rel="noopener noreferrer">
            HISTORY — The Blood Feud: Cola Wars
          </a>
        </li>
        <li>
          <a href="https://www.history.com/articles/pepsi-navy-soviet-submarines" target="_blank" rel="noopener noreferrer">
            HISTORY — Pepsi&apos;s Cold War Trade: Cola for Submarines
          </a>
        </li>
        <li>
          <a href="https://www.statista.com/outlook/cmo/non-alcoholic-drinks/soft-drinks/worldwide" target="_blank" rel="noopener noreferrer">
            Statista — Global Soft Drinks Market
          </a>
        </li>
        <li>
          <a href="https://www.history.com/articles/why-coca-cola-new-coke-flopped" target="_blank" rel="noopener noreferrer">
            HISTORY — Why New Coke Flopped
          </a>
        </li>
        <li>
          <a href="https://www.pharmacytimes.com/view/soda-fountains--their-pharmacist-inventors" target="_blank" rel="noopener noreferrer">
            Pharmacy Times — Soda Fountains & Their Pharmacist Inventors
          </a>
        </li>
      </ul>
    </div>

    <div className="source-category">
      <h3>Reference Sources</h3>
      <ul className="source-list">
        <li>
          <a href="https://en.wikipedia.org/wiki/Carbonated_water" target="_blank" rel="noopener noreferrer">
            Wikipedia — Carbonated Water
          </a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/Johann_Jacob_Schweppe" target="_blank" rel="noopener noreferrer">
            Wikipedia — Johann Jacob Schweppe
          </a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/Schweppes" target="_blank" rel="noopener noreferrer">
            Wikipedia — Schweppes
          </a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/Pepsi_Challenge" target="_blank" rel="noopener noreferrer">
            Wikipedia — Pepsi Challenge
          </a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/Fixed_price_of_Coca-Cola_from_1886_to_1959" target="_blank" rel="noopener noreferrer">
            Wikipedia — Fixed Price of Coca-Cola
          </a>
        </li>
      </ul>
    </div>

    <div className="source-category">
      <h3>Books</h3>
      <ul className="source-list">
        <li>
          Pendergrast, Mark. <em>For God, Country and Coca-Cola: The Definitive History of the Great American Soft Drink and the Company That Makes It</em>. Basic Books, 2013.
        </li>
      </ul>
    </div>

    <p className="source-note">
      Market statistics sourced from Statista, Coca-Cola Company investor reports, and
      industry analysis (2024). Historical data verified through multiple academic sources.
    </p>

    <div className="image-credits">
      <h3>Image Credits</h3>
      <div className="image-credits-ledger">
        <div className="credit-entry">
          <span className="credit-subject">Joseph Priestley portrait</span>
          <span className="credit-attribution">Ellen Sharples, Public Domain via Wikimedia Commons</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">Pneumatic trough apparatus</span>
          <span className="credit-attribution">Public Domain via Wikimedia Commons</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">Torbern Bergman portrait</span>
          <span className="credit-attribution">Public Domain via Smithsonian</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">Johann Jacob Schweppe portrait (1783)</span>
          <span className="credit-attribution">Public Domain via Wikimedia Commons</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">Benjamin Silliman portrait</span>
          <span className="credit-attribution">William G. Jackman, Public Domain</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">John Stith Pemberton photograph</span>
          <span className="credit-attribution">Public Domain via Wikimedia Commons</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">Asa G. Candler photograph</span>
          <span className="credit-attribution">Harris &amp; Ewing (1923), Library of Congress</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">Caleb Bradham photograph (c. 1900)</span>
          <span className="credit-attribution">Public Domain via Wikimedia Commons</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">Charles Elmer Hires portrait</span>
          <span className="credit-attribution">Moses King (1902), Public Domain</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">Soda fountain at Weed&apos;s Pharmacy (c. 1910)</span>
          <span className="credit-attribution">MOHAI, Public Domain</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">Soda jerk photograph</span>
          <span className="credit-attribution">Alan Fisher (1936), Library of Congress</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">Coca-Cola 1890s advertisement</span>
          <span className="credit-attribution">Public Domain via Wikimedia Commons</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">Coca-Cola 5 cents chromolithograph</span>
          <span className="credit-attribution">Library of Congress</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">1915 contour bottle prototype</span>
          <span className="credit-attribution">Gavinmacqueen, CC BY-SA 3.0</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">Coca-Cola bottle patent</span>
          <span className="credit-attribution">Alexander Samuelson (1915), USPTO</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">Root Glass Company team (c. 1900s)</span>
          <span className="credit-attribution">Vigo County Historical Museum, CC BY-NC-SA 4.0</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">Vintage vending machine</span>
          <span className="credit-attribution">Myotus, CC BY-SA 4.0</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">WWII &quot;Kia Ora&quot; advertisement</span>
          <span className="credit-attribution">Dean Cornwell (1943-45), Archives New Zealand</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">Coca-Cola Bottling Plant, Worcester</span>
          <span className="credit-attribution">B. Michael Zuckerman, CC BY-SA 4.0</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">Kitchen Debate photograph</span>
          <span className="credit-attribution">Thomas J. O&apos;Halloran (1959), Library of Congress</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">New Coke can</span>
          <span className="credit-attribution">Public Domain via Wikimedia Commons</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">Pepsi Challenge materials</span>
          <span className="credit-attribution">TeemPlayer, CC BY-SA 3.0</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">Coca-Cola delivery truck, Taiwan</span>
          <span className="credit-attribution">Uwe Aranas, CC BY-SA 3.0</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">Robert W. Woodruff portrait (1944)</span>
          <span className="credit-attribution">Joseph Janney Steinmetz, State Archives of Florida</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">Charles Alderton photograph</span>
          <span className="credit-attribution">Public Domain via Wikimedia Commons</span>
        </div>
        <div className="credit-entry">
          <span className="credit-subject">Donald Kendall portrait</span>
          <span className="credit-attribution">Public Domain via Wikimedia Commons</span>
        </div>
      </div>
    </div>
  </section>
);

// ==================== FOOTER ====================
const Footer: React.FC = () => (
  <footer className="soda-footer">
    <div className="footer-archive-stamp">
      ARCHIVE CLOSED
    </div>

    <blockquote className="footer-quote">
      &quot;Every man in uniform gets a bottle of Coca-Cola for five cents,
      wherever he is and whatever it costs our company.&quot;
      <cite>— Robert W. Woodruff, 1941</cite>
    </blockquote>

    <p className="footer-tagline">
      From a Leeds brewery to 1.9 billion daily servings —
      the 260-year story of humanity&apos;s favorite refreshment.
    </p>

    <div className="footer-meta">
      <span>Research completed January 2026</span>
      <span>27 verified sources consulted</span>
    </div>
  </footer>
);

// ==================== MAIN COMPONENT ====================
export default function SodaHistoryClient() {
  const [currentEra, setCurrentEra] = useState(0);

  // Combine font variables for CSS custom properties
  const fontClasses = `${playfairDisplay.variable} ${sourceSerif4.variable} ${jetbrainsMono.variable}`;

  const handleScroll = useCallback(() => {
    const sections = document.querySelectorAll('[data-era]');
    let activeEra = 0;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.5 && rect.bottom > 0) {
        const eraId = section.getAttribute('data-era');
        const era = ERAS.find(e => e.id === eraId);
        if (era) activeEra = era.number;
      }
    });

    setCurrentEra(activeEra);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className={`soda-history-container ${fontClasses}`}>
      <EraProgress currentEra={currentEra} />
      <Hero />

      {/* ERA 1: THE SCIENTIFIC SPARK */}
      <ArchiveDrawer era={ERAS[0]}>
        <div className="drawer-narrative">
          <figure className="chapter-figure chapter-figure-right">
            <img
              src={IMAGES.josephPriestley}
              alt="Portrait of Joseph Priestley by Ellen Sharples"
              className="chapter-image"
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 280px"
            />
            <figcaption>Joseph Priestley (1733-1804), by Ellen Sharples</figcaption>
          </figure>

          <p className="narrative-lead">
            In 1767, an English clergyman and amateur scientist made a discovery that
            would eventually spawn a $450 billion industry. Joseph Priestley wasn&apos;t
            looking for refreshment—he was looking for science.
          </p>

          <p>
            Living next to a brewery in Leeds, Priestley noticed that a layer of gas
            hovered over the fermenting beer vats. He suspended a bowl of water over
            the vat and observed that the water absorbed the gas. When he tasted it,
            he described &quot;an exceedingly pleasant sparkling water, resembling Seltzer water.&quot;
          </p>

          <figure className="chapter-figure chapter-figure-wide">
            <img
              src={IMAGES.pneumaticTrough}
              alt="Priestley's pneumatic trough apparatus for carbonation experiments"
              className="chapter-image"
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 708px"
            />
            <figcaption>
              Priestley&apos;s pneumatic trough apparatus (1775) — the device that created
              the first artificial carbonated water
            </figcaption>
          </figure>

          <p>
            Priestley published his method in 1772 (&quot;Impregnating Water with Fixed Air&quot;)
            and received the Copley Medal from the Royal Society in 1773. He believed
            his discovery could prevent scurvy on long sea voyages.
          </p>

          <blockquote className="narrative-quote">
            &quot;This is perhaps the happiest discovery I have ever made.&quot;
            <cite>— Joseph Priestley, on artificial carbonation</cite>
          </blockquote>

          <figure className="chapter-figure chapter-figure-right">
            <img
              src={IMAGES.torbernBergman}
              alt="Portrait of Torbern Bergman, Swedish chemist"
              className="chapter-image"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 280px"
            />
            <figcaption>Torbern Bergman (1735-1784), who refined Priestley&apos;s process</figcaption>
          </figure>

          <p>
            But Priestley was a scientist, not an entrepreneur. He shared his method
            freely and never commercialized it. Swedish chemist Torbern Bergman
            improved the process in 1771, but it would take 16 years for someone
            to see the business potential.
          </p>
        </div>
      </ArchiveDrawer>

      {/* ERA 2: THE MINERAL WATER MEN */}
      <ArchiveDrawer era={ERAS[1]}>
        <div className="drawer-narrative">
          <figure className="chapter-figure chapter-figure-right">
            <img
              src={IMAGES.johannSchweppe}
              alt="Portrait of Johann Jacob Schweppe, 1783"
              className="chapter-image"
              loading="lazy"
            />
            <figcaption>Johann Jacob Schweppe (1740-1821)</figcaption>
          </figure>

          <p className="narrative-lead">
            Johann Jacob Schweppe was a watchmaker, not a scientist. But he understood
            something Priestley didn&apos;t: people would pay for pleasant sparkling water.
          </p>

          <p>
            In 1783, working in Geneva, Schweppe patented a commercial process for
            manufacturing carbonated water. He called his company J. Schweppe & Co.—
            the first soft drink company in history.
          </p>

          <p>
            Schweppe expanded to London in 1792, establishing a factory at 141 Drury Lane.
            By 1831, Schweppes had received a Royal Warrant as official supplier to the
            British Royal Household. At the 1851 Great Exhibition, Schweppes sold over
            a million bottles.
          </p>

          <div className="drawer-stats">
            <LedgerCounter value="16" label="Years from discovery to commercialization" />
            <LedgerCounter value="1783" label="Schweppes founded in Geneva" />
            <LedgerCounter value="1831" label="Royal Warrant received" />
          </div>

          <figure className="chapter-figure chapter-figure-inline">
            <img
              src={IMAGES.benjaminSilliman}
              alt="Benjamin Silliman, Yale's first chemistry professor"
              className="chapter-image"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 400px"
            />
            <figcaption>
              Benjamin Silliman (1779-1864) — Yale&apos;s first chemistry professor,
              brought soda water to America in 1806
            </figcaption>
          </figure>

          <p>
            The lesson was clear: scientific discoveries don&apos;t automatically become
            industries. It takes an entrepreneur to see commercial potential in what
            scientists consider mere curiosities.
          </p>
        </div>
      </ArchiveDrawer>

      {/* ERA 3: THE PHARMACY COUNTER */}
      <ArchiveDrawer era={ERAS[2]}>
        <div className="drawer-narrative">
          <figure className="chapter-figure chapter-figure-wide">
            <img
              src={IMAGES.sodaFountainWeeds}
              alt="Soda fountain at Weed's Pharmacy, Seattle, circa 1910"
              className="chapter-image"
              loading="lazy"
            />
            <figcaption>
              A soda fountain at Weed&apos;s Pharmacy, Seattle (c. 1910) — the 19th century&apos;s
              innovation hub. MOHAI, Public Domain.
            </figcaption>
          </figure>

          <p className="narrative-lead">
            Nearly every major American soft drink was invented by a pharmacist.
            The soda fountain—where pharmacists dispensed medicinal carbonated waters—
            was the 19th century&apos;s equivalent of the tech startup garage.
          </p>

          <div className="pharmacy-founders-grid">
            <figure className="pharmacy-founder">
              <img src={IMAGES.johnPemberton} alt="John Stith Pemberton" loading="lazy" />
              <figcaption>John Pemberton<br />Coca-Cola (1886)</figcaption>
            </figure>
            <figure className="pharmacy-founder">
              <img src={IMAGES.calebBradham} alt="Caleb Bradham" loading="lazy" />
              <figcaption>Caleb Bradham<br />Pepsi-Cola (1893)</figcaption>
            </figure>
            <figure className="pharmacy-founder">
              <img src={IMAGES.charlesHires} alt="Charles Hires" loading="lazy" />
              <figcaption>Charles Hires<br />Root Beer (1876)</figcaption>
            </figure>
          </div>

          <p>
            In 1885, Charles Alderton created Dr Pepper in Waco, Texas. In 1886,
            John Stith Pemberton invented Coca-Cola in Atlanta. In 1893, Caleb Bradham
            created &quot;Brad&apos;s Drink&quot; (later Pepsi-Cola) in New Bern, North Carolina.
          </p>

          <div className="pharmacy-timeline">
            <div className="pharmacy-event">
              <span className="pharmacy-year">1875</span>
              <span className="pharmacy-drink">Hires Root Beer</span>
              <span className="pharmacy-inventor">Charles Hires, Philadelphia</span>
            </div>
            <div className="pharmacy-event">
              <span className="pharmacy-year">1885</span>
              <span className="pharmacy-drink">Dr Pepper</span>
              <span className="pharmacy-inventor">Charles Alderton, Waco</span>
            </div>
            <div className="pharmacy-event">
              <span className="pharmacy-year">1886</span>
              <span className="pharmacy-drink">Coca-Cola</span>
              <span className="pharmacy-inventor">John Pemberton, Atlanta</span>
            </div>
            <div className="pharmacy-event">
              <span className="pharmacy-year">1893</span>
              <span className="pharmacy-drink">Pepsi-Cola</span>
              <span className="pharmacy-inventor">Caleb Bradham, New Bern</span>
            </div>
          </div>

          <p>
            These pharmacists had chemical knowledge, access to ingredients, retail
            locations, and customers seeking &quot;tonics.&quot; The soft drink industry emerged
            from medicine, not food. Coca-Cola&apos;s original formula contained trace
            amounts of cocaine (from coca leaf) until 1903.
          </p>

          <div className="pharmacy-culture-grid">
            <figure className="chapter-figure">
              <img
                src={IMAGES.cocaCola1890sAd}
                alt="Coca-Cola 5 cents advertisement from 1890s featuring Hilda Clark"
                className="chapter-image"
                loading="lazy"
              />
              <figcaption>
                &quot;Drink Coca-Cola 5¢&quot; — 1890s ad featuring actress Hilda Clark
              </figcaption>
            </figure>
            <figure className="chapter-figure">
              <img
                src={IMAGES.sodaJerk}
                alt="Soda jerk passing ice cream soda between fountains, 1936"
                className="chapter-image"
                loading="lazy"
              />
              <figcaption>
                A soda jerk at work (1936) — Alan Fisher, Library of Congress
              </figcaption>
            </figure>
          </div>

          <p>
            Frank Robinson, Pemberton&apos;s partner, suggested the name Coca-Cola,
            reasoning that &quot;the two Cs would look well in advertising.&quot; He designed
            the famous Spencerian script logo that remains virtually unchanged today.
          </p>
        </div>
      </ArchiveDrawer>

      {/* ERA 4: BUILDING THE BRANDS */}
      <ArchiveDrawer era={ERAS[3]}>
        <div className="drawer-narrative">
          <figure className="chapter-figure chapter-figure-right">
            <img
              src={IMAGES.asaCandler}
              alt="Asa G. Candler, the Coca-Cola king of Atlanta"
              className="chapter-image"
              loading="lazy"
            />
            <figcaption>
              Asa G. Candler (1851-1929) — bought Coca-Cola for $2,300,
              built a $25 million empire. Harris &amp; Ewing, 1923.
            </figcaption>
          </figure>

          <p className="narrative-lead">
            Asa Candler didn&apos;t invent a better soda. He invented modern brand marketing.
          </p>

          <p>
            In 1891, Candler acquired Coca-Cola for $2,300—possibly history&apos;s
            greatest return on investment. While competitors listed ingredients,
            Candler sold an experience.
          </p>

          <div className="candler-innovations">
            <h4>Candler&apos;s Marketing Revolution</h4>
            <ul>
              <li>1891: Invested $11,000 in marketing (typical Atlanta merchant: under $100)</li>
              <li>First year: Ordered 45,000 calendars with Coca-Cola logo</li>
              <li>Introduced coupons for free glasses—revolutionary concept</li>
              <li>Hired Hilda Clark as celebrity endorser (among first celebrity endorsements)</li>
              <li>Advertising budget: $100,000 (1901) to $1 million (1911)</li>
            </ul>
          </div>

          <div className="contour-bottle-showcase">
            <figure className="bottle-figure">
              <img
                src={IMAGES.contourBottlePatent}
                alt="Coca-Cola contour bottle patent drawing, 1915"
                className="chapter-image"
                loading="lazy"
              />
              <figcaption>US Design Patent 48,160 (1915)</figcaption>
            </figure>
            <figure className="bottle-figure">
              <img
                src={IMAGES.contourBottlePrototype}
                alt="1915 Coca-Cola contour bottle prototype"
                className="chapter-image"
                loading="lazy"
              />
              <figcaption>The iconic silhouette</figcaption>
            </figure>
          </div>

          <p>
            In 1915, the Root Glass Company designed the iconic contour bottle—
            recognizable even in the dark or when broken. Earl Dean based the
            design on a cocoa pod (he misheard &quot;coca&quot;). The &quot;Georgia Green&quot;
            color became a trademark.
          </p>

          <figure className="chapter-figure chapter-figure-wide">
            <img
              src={IMAGES.rootGlassCompanyTeam}
              alt="Workers outside the Root Glass Company, circa 1900s. Earl R. Dean stands 4th from right, Alexander Samuelson on far left."
              className="chapter-image"
              loading="lazy"
            />
            <figcaption>
              The Root Glass Company team. Earl R. Dean, designer of the contour bottle,
              stands 4th from right. Plant Supervisor Alexander Samuelson is on the far left.
              Vigo County Historical Museum, c. 1900s. CC BY-NC-SA 4.0.
            </figcaption>
          </figure>

          <div className="drawer-stats">
            <LedgerCounter value="2300" label="Dollars Candler paid for Coca-Cola" unit="$" />
            <LedgerCounter value="5" label="Cents per glass (1886-1959)" />
            <LedgerCounter value="70" label="Years at the same price" unit="+" />
          </div>

          <div className="five-cent-showcase">
            <figure className="chapter-figure">
              <img
                src={IMAGES.cocaCola5CentsLOC}
                alt="Drink Coca-Cola 5 cents chromolithograph from Library of Congress"
                className="chapter-image"
                loading="lazy"
              />
              <figcaption>
                &quot;Drink Coca-Cola 5¢&quot; — chromolithograph, Library of Congress
              </figcaption>
            </figure>
            <figure className="chapter-figure">
              <img
                src={IMAGES.vintageVendingMachine}
                alt="Vintage Coca-Cola vending machine"
                className="chapter-image"
                loading="lazy"
              />
              <figcaption>
                Vintage vending machine — built for nickels only
              </figcaption>
            </figure>
          </div>

          <p>
            The five-cent price held for over 70 years through three wars, the
            Great Depression, and massive inflation. By 1950, Coca-Cola owned 85%
            of America&apos;s 460,000 vending machines—all built for nickels only. In 1953,
            the company asked the U.S. Treasury to mint a 7.5-cent coin. The request
            was denied.
          </p>
        </div>
      </ArchiveDrawer>

      {/* ERA 5: FOLLOWING THE FLAG */}
      <ArchiveDrawer era={ERAS[4]}>
        <div className="drawer-narrative">
          <figure className="chapter-figure chapter-figure-wide">
            <img
              src={IMAGES.wwiiCocaColaAd}
              alt="WWII Coca-Cola advertisement: Have a Coke = Kia Ora"
              className="chapter-image"
              loading="lazy"
            />
            <figcaption>
              &quot;Have a &apos;Coke&apos; = Kia Ora&quot; — Dean Cornwell&apos;s WWII advertisement
              depicting American soldiers sharing Coca-Cola with Maori people.
              Archives New Zealand, c. 1943-1945.
            </figcaption>
          </figure>

          <p className="narrative-lead">
            Robert Woodruff&apos;s 1941 directive would create a global empire:
            &quot;Every man in uniform gets a bottle of Coca-Cola for five cents,
            wherever he is and whatever it costs our company.&quot;
          </p>

          <p>
            What looked like patriotic sacrifice was brilliant strategy. Coca-Cola
            deployed 148 &quot;Technical Observers&quot; (nicknamed &quot;Coca-Cola Colonels&quot;) to
            war zones. The company built 64 bottling plants worldwide at its own
            expense. 5 billion bottles reached American troops during the war.
          </p>

          <div className="wwii-stats">
            <LedgerCounter value="148" label="Technical Observers deployed" />
            <LedgerCounter value="64" label="Overseas bottling plants built" />
            <LedgerCounter value="5" label="Billion bottles to troops" unit="B" />
          </div>

          <figure className="chapter-figure chapter-figure-inline">
            <img
              src={IMAGES.bottlingPlant1940}
              alt="Coca-Cola Bottling Plant, Worcester, Massachusetts, 1940"
              className="chapter-image"
              loading="lazy"
            />
            <figcaption>
              Coca-Cola Bottling Plant, Worcester, MA (built 1940) — one of the
              64 plants that became the foundation for global expansion.
            </figcaption>
          </figure>

          <p>
            Eisenhower&apos;s top-secret telegram ordered 3 million bottles for the
            North Africa invasion. By 1968, 50% of Coca-Cola&apos;s profits came from
            foreign operations.
          </p>

          <p>
            The wartime plants became post-war infrastructure for global expansion.
            Coca-Cola became synonymous with American identity—both its promise and
            its imperialism. The term &quot;Coca-Colonization&quot; emerged to describe
            American cultural expansion.
          </p>

          <blockquote className="narrative-quote">
            &quot;Coca-Cola was not simply a tasty beverage, but a symbol of
            American abundance and freedom.&quot;
            <cite>— Mark Pendergrast, &quot;For God, Country and Coca-Cola&quot;</cite>
          </blockquote>
        </div>
      </ArchiveDrawer>

      {/* ERA 6: THE COLA WARS */}
      <ColaWarsSplit />

      {/* ERA 7: GLOBAL FIZZ */}
      <ArchiveDrawer era={ERAS[6]}>
        <div className="drawer-narrative">
          <p className="narrative-lead">
            What began with one man and one brewery now serves 1.9 billion drinks daily.
          </p>

          <figure className="chapter-figure chapter-figure-wide">
            <img
              src={IMAGES.deliveryTruckTaiwan}
              alt="Coca-Cola delivery truck in Taiwan"
              className="chapter-image"
              loading="lazy"
            />
            <figcaption>
              Coca-Cola delivery infrastructure spans 200+ countries — from Atlanta
              to Taipei. Photo: Uwe Aranas, CC BY-SA 3.0.
            </figcaption>
          </figure>

          <p>
            The soft drink industry today is worth between $450 and $630 billion globally.
            Coca-Cola products are sold in over 200 countries—only North Korea and Cuba
            lack official distribution. The brand is recognized by 94% of the world&apos;s population.
          </p>

          <p>
            The industry has faced new challenges: health concerns over sugar consumption,
            environmental criticism of plastic bottles, and competition from energy drinks
            and bottled water. But the fundamental appeal remains: flavored carbonated water,
            just as Priestley discovered in 1767.
          </p>
        </div>
      </ArchiveDrawer>

      <ArchiveTimeline />

      <DataVisualization />

      <section className="figures-section">
        <h2>The Architects of Fizz</h2>
        <p className="figures-intro">
          Eleven figures who transformed a scientific curiosity into a global phenomenon.
        </p>

        <div className="figures-grid">
          {FIGURES.map((figure, index) => (
            <FigureCard key={figure.name} figure={figure} index={index} />
          ))}
        </div>
      </section>

      <Bibliography />
      <Footer />
    </div>
  );
}
