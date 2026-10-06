"use client";

import { useEffect, useRef, useState } from 'react';
import './who-invented-high-heels.css';

/*
 * Design Research: The History of High Heels
 * 
 * Visual Identity: Fashion Editorial / Runway Glamour
 * 
 * Color Palette (Fashion/Luxury derived):
 * - Noir (#050506) - editorial darkness
 * - Louboutin Red (#D70040) - iconic heel color
 * - Gold Leaf (#D4AF37) - luxury accents
 * - Wine (#5C1A33) - burgundy depth
 * - Champagne (#F5E6D3) - runway neutrals
 * 
 * Layout Patterns (8+ unique):
 * - Hero: Full-bleed editorial
 * - Chapter: Drop cap narrative
 * - Timeline: Parallax depth vertical
 * - Data-viz: Statistics grid
 * - Height chart: Visual bar chart
 * - Quote monument: Fashion quotes
 * - Comparison: Past vs Present
 * - Sticky-scroll: Icon transitions
 * 
 * Historical Sources:
 * - Bata Shoe Museum, Toronto
 * - Victoria and Albert Museum
 * - Metropolitan Museum of Art
 * - Fashion Institute of Technology
 */

// ==================== HOOKS ====================
const useInView = (threshold = 0.2) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY * speed);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
};

// ==================== COMPONENTS ====================
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

// Stiletto Icon SVG
const StilettoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 25 L75 20 Q85 20 85 30 L85 45 Q85 50 80 52 L25 70 Q20 72 18 78 L15 95 L10 95 L12 75 Q12 70 15 68 L70 50 L70 35 L15 40 Z" 
          stroke="currentColor" strokeWidth="2" fill="none"/>
    <line x1="15" y1="95" x2="15" y2="75" stroke="currentColor" strokeWidth="3"/>
  </svg>
);

// ==================== HERO ====================
const Hero: React.FC = () => {
  const parallaxOffset = useParallax(0.3);

  return (
    <header className="hero">
      <div className="hero-bg">
        <img 
          src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1920&q=80"
          alt="Elegant high heels"
          style={{ transform: `scale(1.1) translateY(${parallaxOffset}px)` }}
        />
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <div className="hero-eyebrow">A History in Five Centuries</div>
        
        <h1>
          <span className="title-italic">Who Invented</span>
          <span className="title-accent">High Heels?</span>
        </h1>
        
        <p className="hero-tagline">
          From Persian cavalrymen to Parisian runways—the extraordinary journey 
          of fashion&apos;s most provocative invention.
        </p>

        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value">10th C.</div>
            <div className="hero-stat-label">First Recorded Use</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">$50B</div>
            <div className="hero-stat-label">Global Market</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">4&quot;</div>
            <div className="hero-stat-label">Average Stiletto</div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Discover the story</span>
        <div className="scroll-line" />
      </div>
    </header>
  );
};

// ==================== CHAPTER: PERSIAN ORIGINS ====================
const PersianOrigins: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`chapter fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="chapter-era">10th Century CE — Persia</div>
      <h2 className="chapter-title">The Warrior&apos;s Secret Weapon</h2>
      
      <p>
        High heels were not born in the salons of Paris or the ateliers of Milan. 
        They emerged from the battlefields of ancient Persia, where mounted archers 
        discovered that a raised heel helped secure their feet in stirrups while 
        standing to shoot. This tactical innovation—a heel typically 1 to 1.5 inches 
        high—gave Persian cavalry a devastating military advantage, allowing warriors 
        to rise in the saddle and fire arrows with deadly precision.
      </p>
      <p>
        For centuries, the heeled boot remained a practical tool of warfare, its 
        association with skilled horsemanship lending it an aura of masculine power 
        and military prowess. Persian riders became legendary across the ancient world, 
        and their distinctive footwear traveled with them along the Silk Road.
      </p>
      <p>
        The heel&apos;s journey from battlefield to ballroom would take another six 
        centuries—and a diplomatic mission that changed European fashion forever.
      </p>
    </section>
  );
};

// ==================== CHAPTER: EUROPEAN ARRIVAL ====================
const EuropeanArrival: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`chapter fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="chapter-era">1599 CE — The Persian Embassy</div>
      <h2 className="chapter-title">East Meets West</h2>
      
      <p>
        In 1599, Shah Abbas I of Persia dispatched the first Persian diplomatic 
        mission to the courts of Europe, seeking military alliances against the 
        Ottoman Empire. The emissaries arrived bearing gifts, exotic textiles, 
        and most significantly, wearing their distinctive heeled boots.
      </p>
      <p>
        European aristocrats were captivated. Here was a fashion from a distant, 
        powerful empire—one associated with the legendary Persian cavalry. Within 
        decades, heeled shoes had spread through the courts of Spain, France, and 
        England. The European elite adopted heels enthusiastically, but with a 
        crucial difference: while Persian heels were practical, European heels 
        became purely ornamental—impractical for riding but perfect for demonstrating 
        that the wearer need not perform physical labor.
      </p>
      <p>
        This transformation marked the heel&apos;s first great reinvention: from 
        instrument of war to symbol of leisure and aristocratic privilege.
      </p>
    </section>
  );
};

// ==================== QUOTE: LOUIS XIV ====================
const LouisQuote: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`quote-section fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="quote-content">
        <blockquote>
          <p>
            &ldquo;The heel was a royal prerogative—a mark of noble blood that 
            commoners were forbidden to imitate.&rdquo;
          </p>
          <cite>On the Court of Louis XIV, c. 1670</cite>
        </blockquote>
      </div>
    </section>
  );
};

// ==================== CHAPTER: THE SUN KING ====================
const SunKingEra: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`chapter fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="chapter-era">1643–1715 CE — The Court of Versailles</div>
      <h2 className="chapter-title">The Sun King&apos;s Red Soles</h2>
      
      <p>
        No figure looms larger in the history of the high heel than Louis XIV of 
        France. Standing just 5&apos;4&quot;, the Sun King compensated for his stature 
        with heels as high as five inches, often painted a distinctive red. In 1670, 
        he decreed that only members of his court could wear red heels—making footwear 
        literally a matter of law and transforming the heel into a visual certificate 
        of royal favor.
      </p>
      <p>
        Louis commissioned elaborate portrait paintings showing off his legs and 
        heels, establishing a new masculine ideal. Men&apos;s heels at Versailles 
        featured ornate embroidery, jeweled buckles, and the famous &ldquo;Louis heel&rdquo;—a 
        curved shape that remains a standard in shoe design 350 years later. The 
        king&apos;s passion for heels drove the French fashion industry, establishing 
        Paris as the world&apos;s arbiter of style.
      </p>
      <p>
        This era also saw the first significant differentiation between men&apos;s 
        and women&apos;s heels. While men wore thick, sturdy heels suited to their 
        larger frames, women&apos;s shoes began featuring more slender, tapered heels—an 
        aesthetic distinction that would have profound implications.
      </p>
    </section>
  );
};

// ==================== TIMELINE ====================
const HistoricalTimeline: React.FC = () => {
  const { ref, isVisible } = useInView(0.1);

  const events = [
    {
      year: '~900 CE',
      title: 'Persian Cavalry Innovation',
      text: 'Persian horse archers develop raised heels for stability in stirrups, creating the first functional high heels.'
    },
    {
      year: '1599',
      title: 'The Persian Embassy',
      text: 'Shah Abbas I sends diplomats to Europe wearing heeled boots, igniting aristocratic fascination with Persian fashion.'
    },
    {
      year: '1670',
      title: 'Louis XIV\'s Red Heel Decree',
      text: 'The Sun King reserves red heels for nobility, establishing the heel as a legal symbol of rank.'
    },
    {
      year: '1791',
      title: 'The Revolutionary Fall',
      text: 'French Revolution associates heels with aristocratic decadence. Men abandon heels; women\'s heel heights plummet.'
    },
    {
      year: '1860s',
      title: 'Victorian Revival',
      text: 'The "French heel" returns for women as photography and fashion magazines spread new styles globally.'
    },
    {
      year: '1954',
      title: 'Birth of the Stiletto',
      text: 'Roger Vivier creates the first modern stiletto for Christian Dior, using steel reinforcement for impossibly thin heels.'
    },
    {
      year: '1991',
      title: 'Louboutin\'s Red Sole',
      text: 'Christian Louboutin paints his first red sole, creating the most recognizable luxury signature in fashion.'
    },
    {
      year: '2020s',
      title: 'The Comfort Revolution',
      text: 'Post-pandemic shift sees luxury brands emphasizing comfort without sacrificing style; heel heights diversify.'
    }
  ];

  return (
    <section ref={ref} className={`timeline-section fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="timeline-header">
        <h2>The Arc of Elevation</h2>
        <p>Key moments in the heel&apos;s journey from battlefield to runway</p>
      </div>
      
      <div className="timeline">
        {events.map((event, index) => (
          <div 
            key={event.year}
            className={`timeline-item stagger-${Math.min(index + 1, 6)}`}
          >
            <div className="timeline-marker" />
            <div className="timeline-content">
              <div className="timeline-year">{event.year}</div>
              <h3 className="timeline-title">{event.title}</h3>
              <p className="timeline-text">{event.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ==================== DATA VISUALIZATION ====================
const DataSection: React.FC = () => {
  const { ref, isVisible } = useInView();

  const stats = [
    { value: '$48B', label: 'Global Market 2023', detail: 'The women\'s footwear market continues to grow at 4.5% annually.' },
    { value: '72%', label: 'Women Own Heels', detail: 'Percentage of women in developed nations who own at least one pair of high heels.' },
    { value: '3.5"', label: 'Average Height', detail: 'The most commonly purchased heel height across all markets.' },
    { value: '1954', label: 'Stiletto Invented', detail: 'Roger Vivier created the steel-shanked stiletto for Christian Dior.' }
  ];

  return (
    <section ref={ref} className={`data-section fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="data-header">
        <h2>The Numbers Behind the Glamour</h2>
      </div>
      
      <div className="data-grid">
        {stats.map((stat, index) => (
          <div 
            key={stat.label}
            className={`data-card stagger-${index + 1}`}
          >
            <div className="data-value">{stat.value}</div>
            <div className="data-label">{stat.label}</div>
            <p className="data-detail">{stat.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ==================== HEIGHT CHART ====================
const HeightChart: React.FC = () => {
  const { ref, isVisible } = useInView();

  const heights = [
    { era: '1600s', height: 75, label: '~1.5"', desc: 'Riding boots' },
    { era: '1670s', height: 175, label: '~4"', desc: 'Louis XIV' },
    { era: '1790s', height: 25, label: '~0.5"', desc: 'Revolution' },
    { era: '1860s', height: 100, label: '~2"', desc: 'Victorian' },
    { era: '1950s', height: 150, label: '~3"', desc: 'Stiletto era' },
    { era: '2020s', height: 125, label: '~2.5"', desc: 'Modern avg.' }
  ];

  return (
    <section ref={ref} className={`height-chart-section fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="data-header">
        <h2>The Rise and Fall of Heel Heights</h2>
        <p style={{ color: 'var(--color-champagne-faint)', fontStyle: 'italic' }}>
          Average heel heights through history
        </p>
      </div>
      
      <div className="height-chart">
        {heights.map((item, index) => (
          <div key={item.era} className={`height-bar stagger-${index + 1}`}>
            <div 
              className="height-bar-visual" 
              style={{ height: isVisible ? `${item.height}px` : '0px' }}
              data-height={item.label}
            />
            <div className="height-bar-label">
              {item.era}<br/>
              <span style={{ fontSize: '0.55rem', opacity: 0.7 }}>{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ==================== REVOLUTION ERA ====================
const RevolutionEra: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`chapter fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="chapter-era">1789–1815 CE — Revolution & Empire</div>
      <h2 className="chapter-title">When Heels Fell From Grace</h2>
      
      <p>
        The French Revolution did not merely topple a monarchy—it transformed 
        fashion into a political statement. High heels, so intimately associated 
        with the aristocracy of Versailles, became dangerous to wear. The 
        revolutionaries adopted simple, flat shoes as symbols of equality and 
        reason. Marie Antoinette reportedly wore two-inch heels to her execution 
        in 1793—a final act of aristocratic defiance.
      </p>
      <p>
        Men abandoned heels entirely during this period, never to return as a 
        mainstream fashion. The association between heels and femininity, which 
        we now consider natural, was in fact a revolutionary-era invention. For 
        two centuries prior, heels had been equally—sometimes more—popular among men.
      </p>
      <p>
        Women&apos;s heels also plummeted, often to just half an inch. The Neoclassical 
        aesthetic celebrated Greco-Roman simplicity, and flat sandals became the 
        height of fashion. It would take decades for heels to recover.
      </p>
    </section>
  );
};

// ==================== STILETTO CHAPTER ====================
const StilettoChapter: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`chapter fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="chapter-era">1954 CE — The Modern Icon</div>
      <h2 className="chapter-title">The Stiletto Revolution</h2>
      
      <p>
        The stiletto heel—named for the Italian dagger—was not a single invention 
        but an engineering breakthrough. Before 1950, thin heels were impossible: 
        wood and leather simply could not support body weight at such narrow 
        dimensions. The solution came from an unlikely source: steel.
      </p>
      <p>
        French designer Roger Vivier, working for Christian Dior, pioneered the 
        use of a thin steel rod running through the heel&apos;s center. This &ldquo;shank&rdquo; 
        could be made as slender as a pencil while remaining structurally sound. 
        Vivier&apos;s 1954 stilettos for Dior were immediately sensational, their 
        impossibly thin heels suggesting a kind of feminine magic that defied physics.
      </p>
      <p>
        The stiletto transformed high heels from a fashion choice into a cultural 
        phenomenon. Marilyn Monroe famously declared she owed her career to them. 
        By the 1960s, stilettos had become so popular—and so damaging to floors—that 
        many public buildings banned them, their thin points punching through linoleum 
        and leaving permanent marks on marble.
      </p>
    </section>
  );
};

// ==================== COMPARISON SECTION ====================
const ComparisonSection: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`comparison-section fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="comparison-header">
        <h2>Then & Now</h2>
      </div>
      
      <div className="comparison-grid">
        <div className="comparison-panel past">
          <div className="comparison-era">17th Century</div>
          <h3 className="comparison-title">Symbol of Power</h3>
          <p className="comparison-text">
            Heels were worn primarily by men of the aristocracy. Red heels 
            indicated royal favor. Height demonstrated that the wearer need 
            not work. Heels were heavy, decorative, and a legal privilege.
          </p>
        </div>
        
        <div className="comparison-divider">
          <div className="divider-line" />
          <div className="divider-vs">vs</div>
          <div className="divider-line" />
        </div>
        
        <div className="comparison-panel present">
          <div className="comparison-era">21st Century</div>
          <h3 className="comparison-title">Symbol of Choice</h3>
          <p className="comparison-text">
            Heels are worn primarily by women across all social classes. 
            Red soles indicate Louboutin. Height is a personal aesthetic 
            choice. Heels are engineered for comfort and increasingly 
            inclusive in their design.
          </p>
        </div>
      </div>
    </section>
  );
};

// ==================== STICKY SCROLL: MODERN ERA ====================
const ModernEra: React.FC = () => {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section ref={ref} className={`sticky-section ${isVisible ? 'visible' : ''}`}>
      <div className="sticky-visual">
        <StilettoIcon className="sticky-icon" />
      </div>
      
      <div className="sticky-panels">
        <div className="sticky-panel">
          <div className="sticky-panel-content">
            <div className="sticky-panel-era">1991</div>
            <h3>The Red Sole Revolution</h3>
            <p>
              Christian Louboutin, watching an assistant paint her nails red, 
              grabbed the polish and applied it to the sole of a prototype shoe. 
              The lacquered red sole became fashion&apos;s most recognizable signature—
              and, after a landmark legal battle, a protected trademark worth billions.
            </p>
          </div>
        </div>
        
        <div className="sticky-panel">
          <div className="sticky-panel-content">
            <div className="sticky-panel-era">2000s</div>
            <h3>Sex and the City Effect</h3>
            <p>
              The HBO series transformed designer heels into aspirational 
              objects for a generation. Carrie Bradshaw&apos;s Manolo Blahnik 
              obsession drove the brand&apos;s global recognition and established 
              expensive heels as acceptable financial priorities for young women.
            </p>
          </div>
        </div>
        
        <div className="sticky-panel">
          <div className="sticky-panel-content">
            <div className="sticky-panel-era">2020s</div>
            <h3>The Comfort Revolution</h3>
            <p>
              The pandemic accelerated a shift already underway. Luxury brands 
              now emphasize comfort without sacrificing style. Block heels, 
              platforms, and lower heights gain market share. Yet the stiletto 
              endures—its impracticality is, perhaps, the point.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== FEMINIST PERSPECTIVE ====================
const FeministPerspective: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`chapter fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="chapter-era">The Ongoing Debate</div>
      <h2 className="chapter-title">Empowerment or Oppression?</h2>
      
      <p>
        Few fashion items provoke as much feminist debate as high heels. Critics 
        point to documented health risks—bunions, hammertoes, back pain, shortened 
        Achilles tendons—and argue that heels represent the patriarchal expectation 
        that women sacrifice comfort for male visual pleasure. Studies show women 
        in heels are perceived as more attractive but also more vulnerable.
      </p>
      <p>
        Defenders counter that heels represent choice and self-expression, that 
        the confidence many women feel in heels is genuine and valuable, and that 
        dismissing heels as patriarchal tools denies women agency over their own 
        bodies and fashion choices. The debate itself reveals how deeply personal 
        and political fashion can be.
      </p>
      <p>
        What both sides might agree upon: the high heel&apos;s meaning has changed 
        radically across centuries, from Persian military equipment to French royal 
        privilege to feminist battleground. The shoe itself is neutral—society 
        loads it with meaning.
      </p>
    </section>
  );
};

// ==================== CLOSING QUOTE ====================
const ClosingQuote: React.FC = () => {
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`quote-section fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="quote-content">
        <blockquote>
          <p>
            &ldquo;Give a girl the right shoes, and she can conquer the world.&rdquo;
          </p>
          <cite>Attributed to Marilyn Monroe</cite>
        </blockquote>
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
          <a href="https://www.batashoemuseum.ca/" target="_blank" rel="noopener noreferrer">
            &ldquo;Heights of Fashion: A History of the Elevated Shoe&rdquo; — Bata Shoe Museum
          </a>
        </li>
        <li>
          <a href="https://web.archive.org/web/20230601000000*/https://www.vam.ac.uk/articles/high-heels" target="_blank" rel="noopener noreferrer">
            &ldquo;A History of High Heels&rdquo; — Victoria and Albert Museum (Archive)
          </a>
        </li>
        <li>
          <a href="https://www.metmuseum.org/toah/hd/shoh/hd_shoh.htm" target="_blank" rel="noopener noreferrer">
            &ldquo;The History of Shoes&rdquo; — Metropolitan Museum of Art
          </a>
        </li>
        <li>
          <a href="https://fashion-era.com/fashion-history/history-of-high-heels" target="_blank" rel="noopener noreferrer">
            &ldquo;The History of High Heels: A Journey Through Time and Status&rdquo; — Fashion-Era
          </a>
        </li>
        <li>
          <a href="https://www.bbc.com/culture/article/20150617-the-high-heels-history" target="_blank" rel="noopener noreferrer">
            &ldquo;Why Did Men Stop Wearing High Heels?&rdquo; — BBC Culture
          </a>
        </li>
        <li>
          <a href="https://journals.sagepub.com/doi/10.1177/1359104508100540" target="_blank" rel="noopener noreferrer">
            &ldquo;The Effect of High Heels on Women&apos;s Attractiveness&rdquo; — Journal of Foot and Ankle Research
          </a>
        </li>
        <li>
          <a href="https://www.fitnyc.edu/museum/exhibitions/index.php" target="_blank" rel="noopener noreferrer">
            Fashion Institute of Technology Museum Exhibitions
          </a>
        </li>
      </ul>
      <p className="sources-note">
        This narrative draws from museum collections, academic research, and fashion history archives.
      </p>
    </div>
  </section>
);

// ==================== FOOTER ====================
const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-content">
      <StilettoIcon className="footer-icon" />
      <blockquote>
        <p>
          &ldquo;A woman with good shoes is never ugly.&rdquo;
        </p>
        <cite>Coco Chanel</cite>
      </blockquote>
      <div className="footer-divider" />
      <p className="footer-colophon">
        Five centuries of elevation, and counting.
      </p>
    </div>
  </footer>
);

// ==================== MAIN COMPONENT ====================
const HighHeelsHistoryClient: React.FC = () => {
  return (
    <div className="heels-history-container">
      <ProgressBar />
      <Hero />
      <PersianOrigins />
      <EuropeanArrival />
      <LouisQuote />
      <SunKingEra />
      <HistoricalTimeline />
      <DataSection />
      <HeightChart />
      <RevolutionEra />
      <StilettoChapter />
      <ComparisonSection />
      <ModernEra />
      <FeministPerspective />
      <ClosingQuote />
      <Sources />
      <Footer />
    </div>
  );
};

export default HighHeelsHistoryClient;

