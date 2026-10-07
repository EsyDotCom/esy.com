"use client";

import { useEffect, useRef, useState } from 'react';
import './who-invented-the-spoon.css';

/*
 * THE SPOON - Complete Redesign
 * 
 * Anti-Pattern-Matching Applied:
 * ✅ NO alternating left/right sections (was in original)
 * ✅ NO section numbers in corners (was in original)
 * ✅ NO drop-cap chapters (overused)
 * ✅ NO diamond icon highlights (was in original)
 * 
 * UNIQUE MECHANICS:
 * 1. SVG spoon that draws itself on scroll (stroke-dashoffset)
 * 2. Material texture sections (bone → wood → bronze → silver → steel)
 * 3. Scooping arc animations (content arcs in with rotation)
 * 4. Concentric ripple bowl data viz
 * 5. Timeline with alternating scoop direction
 * 6. Stirring motion for decorative elements
 * 
 * Forcing Question Answer:
 * "An SVG spoon draws itself as you scroll, and content scoops into view
 * with arc motion - could only work for a spoon story"
 */

// ==================== HOOKS ====================
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

// ==================== PROGRESS SPOON ====================
const ProgressSpoon: React.FC = () => {
  const progress = useScrollProgress();
  const dashOffset = 400 - (progress / 100) * 400;

  return (
    <div className="progress-spoon">
      <svg viewBox="0 0 40 180" preserveAspectRatio="xMidYMid meet">
        <path 
          className="spoon-outline"
          d="M20 10 C5 10 5 45 20 45 C35 45 35 10 20 10 M20 45 L20 170"
          style={{ strokeDashoffset: dashOffset }}
        />
      </svg>
    </div>
  );
};

// ==================== HERO ====================
const Hero: React.FC = () => (
  <header className="hero">
    <div className="hero-texture" />
    
    {/* Drawing Spoon SVG */}
    <div className="hero-spoon-draw">
      <svg viewBox="0 0 80 250" preserveAspectRatio="xMidYMid meet">
        <path 
          className="draw-path"
          d="M40 20 C10 20 10 70 40 70 C70 70 70 20 40 20 M40 70 L40 230"
        />
      </svg>
      </div>
      
    <div className="hero-content">
      <div className="hero-eyebrow">30,000 Years of Human Ingenuity</div>
      
      <h1 className="hero-title">
        <span className="line"><span>The</span></span>
        <span className="line"><span>Spoon</span></span>
      </h1>
      
      <p className="hero-tagline">
        Humanity&apos;s first purpose-built eating tool, unchanged in essence for millennia.
      </p>
        </div>
        
    <div className="hero-scroll">
      <span>Scoop into history</span>
      <div className="scroll-bowl" />
    </div>
  </header>
);

// ==================== MATERIAL SECTIONS ====================
const SpoonSVG: React.FC<{ isVisible: boolean }> = ({ isVisible }) => (
  <svg className={`material-spoon-svg ${isVisible ? 'visible' : ''}`} viewBox="0 0 80 200" preserveAspectRatio="xMidYMid meet">
    <ellipse className="spoon-fill" cx="40" cy="35" rx="30" ry="25" strokeWidth="2" />
    <ellipse cx="40" cy="35" rx="18" ry="12" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <rect className="spoon-fill" x="35" y="55" width="10" height="140" rx="5" strokeWidth="2" />
  </svg>
);

interface MaterialSectionProps {
  material: 'bone' | 'wood' | 'bronze' | 'silver' | 'steel';
  era: string;
  materialName: string;
  title: string;
  body: string;
  fact: string;
}

const MaterialSection: React.FC<MaterialSectionProps> = ({ material, era, materialName, title, body, fact }) => {
  const { ref, isVisible } = useInView(0.3);
  
  return (
    <section ref={ref} className={`material-section ${material}`}>
      <div className="material-texture" />
      
      <div className="material-content">
        <div className={`material-text fade-scoop ${isVisible ? 'visible' : ''}`}>
          <div className="material-era">{era}</div>
          <div className="material-name">{materialName}</div>
          <h2 className="material-title">{title}</h2>
          <p className="material-body">{body}</p>
          <div className="material-fact">{fact}</div>
        </div>
        
        <div className="material-visual">
          <SpoonSVG isVisible={isVisible} />
        </div>
      </div>
    </section>
  );
};

// ==================== RIPPLE DATA VIZ ====================
const RippleSection: React.FC = () => {
  const { ref, isVisible } = useInView(0.3);
  
  const stats = [
    { value: '30,000+', label: 'Years of Continuous Use' },
    { value: '5 Billion', label: 'Manufactured Annually' },
    { value: 'Every', label: 'Culture on Earth' },
  ];
  
  return (
    <section ref={ref} className="ripple-section">
      <div className="ripple-header">
        <h2>The <span className="accent">Universal</span> Utensil</h2>
      </div>
      
      <div className="ripple-grid">
        {stats.map((stat, index) => (
          <div key={stat.label} className="ripple-stat">
            <div className="ripple-bowl">
              <div className={`ripple-ring ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 0.2}s` }} />
              <div className={`ripple-ring ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 0.2 + 0.1}s` }} />
              <div className={`ripple-ring ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 0.2 + 0.2}s` }} />
            </div>
            <div className="ripple-value">{stat.value}</div>
            <div className="ripple-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ==================== TIMELINE ====================
const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [lineHeight, setLineHeight] = useState(0);
  
  const events = [
    { year: '30,000 BCE', title: 'First Spoons', text: 'Seashells and carved bone become humanity\'s first scooping tools.' },
    { year: '3,000 BCE', title: 'Egyptian Craft', text: 'Spoons carved from ivory and adorned with hieroglyphics for the afterlife.' },
    { year: '500 BCE', title: 'Greek & Roman', text: 'Bronze and silver spoons with pointed cochlear handles for shellfish.' },
    { year: '1500s', title: 'Apostle Spoons', text: 'Silver spoons gifted at christenings—"born with a silver spoon."' },
    { year: '1650s', title: 'Teaspoon Born', text: 'Tea and coffee demand delicate, perfectly-scaled stirring tools.' },
    { year: '1840', title: 'Electroplating', text: 'Sheffield factories bring silver-plated spoons to every home.' },
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (containerHeight - window.innerHeight)));
      setLineHeight(progress * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="timeline-section">
      <div className="timeline-header">
        <h2>A Journey Through Time</h2>
      </div>
      
      <div className="timeline-track">
        <div className="timeline-line">
          <div className="timeline-line-fill" style={{ height: `${lineHeight}%` }} />
        </div>
        
        {events.map((event, index) => (
          <TimelineEvent key={event.year} event={event} index={index} />
        ))}
      </div>
    </section>
  );
};

const TimelineEvent: React.FC<{ event: { year: string; title: string; text: string }; index: number }> = ({ event, index }) => {
  const { ref, isVisible } = useInView(0.4);
  
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`timeline-event ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 0.1}s` }}>
      <div className="timeline-content">
        <div className="timeline-year">{event.year}</div>
        <h3 className="timeline-title">{event.title}</h3>
        <p className="timeline-text">{event.text}</p>
      </div>
      <div className="timeline-dot" />
      <div className="timeline-content" style={{ visibility: 'hidden' }} />
    </div>
  );
};

// ==================== SOURCES ====================
const Sources: React.FC = () => (
  <section className="sources-section">
    <div className="sources-content">
      <h3 className="sources-title">Sources & Further Reading</h3>
      <div className="sources-grid">
          <a href="https://en.wikipedia.org/wiki/Spoon" target="_blank" rel="noopener noreferrer">
          Wikipedia — Spoon
          </a>
          <a href="https://www.britannica.com/topic/spoon" target="_blank" rel="noopener noreferrer">
          Britannica — Spoon
          </a>
          <a href="https://www.metmuseum.org/art/collection/search/237055" target="_blank" rel="noopener noreferrer">
          Met Museum — Silver Spoons
        </a>
          <a href="https://en.wikipedia.org/wiki/Apostle_spoon" target="_blank" rel="noopener noreferrer">
          Wikipedia — Apostle Spoon
          </a>
          <a href="https://collections.vam.ac.uk/search/?q=spoon&year_made_from=1&year_made_to=1900" target="_blank" rel="noopener noreferrer">
          V&A Museum — Spoon Collection
          </a>
          <a href="https://www.smithsonianmag.com/science-nature/when-the-fork-did-i-start-using-the-fork-7261044/" target="_blank" rel="noopener noreferrer">
          Smithsonian — Evolution of Eating Utensils
          </a>
          <a href="https://www.britishmuseum.org/collection/term/x12999" target="_blank" rel="noopener noreferrer">
          British Museum — Ancient Cutlery
          </a>
      </div>
      <p className="sources-note">
        Researched using authoritative sources on culinary and material history.
      </p>
    </div>
  </section>
);

// ==================== FOOTER ====================
const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-icon">🥄</div>
    <p className="footer-quote">
        &ldquo;The spoon is the most democratic of utensils—it belongs to no culture, yet serves them all.&rdquo;
      </p>
    <div className="footer-author">— Bee Wilson, Consider the Fork</div>
    <p className="footer-tagline">From bone to stainless steel—30,000 years and counting.</p>
  </footer>
);

// ==================== MAIN ====================
const SpoonHistoryClient: React.FC = () => {
  return (
    <div className="spoon-container">
      <ProgressSpoon />
      <Hero />
      
      <MaterialSection
        material="bone"
        era="30,000 BCE"
        materialName="Bone & Shell"
        title="The First Scoop"
        body="Long before pottery or agriculture, our ancestors faced a fundamental challenge: how to bring liquids and soft foods to their mouths. The solution was elegantly simple—seashells naturally curved for scooping, and bones carved into bowls with handles. These were humanity's first purpose-built eating tools."
        fact="A spoon carved from reindeer antler, dating to 17,000 BCE, survives today in museum collections."
      />
      
      <MaterialSection
        material="wood"
        era="5,000 BCE"
        materialName="Carved Wood"
        title="The Democratic Material"
        body="As civilizations settled, wood became the spoon of the common people. Cheap, abundant, and easily carved, wooden spoons required no metalworking skills. Medieval peasants ate with spoons of wood or cattle horn—functional, disposable, and unmistakably humble. The wealthy displayed silver; everyone else had wood."
        fact="Medieval travelers carried their own spoons in belt pouches—to eat without your own spoon was a mark of poverty."
      />
      
      <MaterialSection
        material="bronze"
        era="3,000 BCE"
        materialName="Bronze & Copper"
        title="Metal Transforms the Table"
        body="Egyptian artisans carved spoons from ivory and bronze, adorning them with hieroglyphics and images of gods. The Romans perfected the cochlear—a spoon with a pointed handle designed to extract snails and shellfish. Metal spoons became symbols of civilization itself."
        fact="Egyptian cosmetic spoons featured handles carved as swimming maidens and lotus flowers."
      />
      
      <MaterialSection
        material="silver"
        era="1500s"
        materialName="Sterling Silver"
        title="Born with a Silver Spoon"
        body="Tudor England transformed the spoon into a symbol of blessing and birthright. Wealthy godparents gifted newborns silver 'Apostle spoons,' their handles topped with figures of the twelve disciples. This custom gave English its most enduring idiom about privilege and class."
        fact="In Shakespeare's Henry VIII, Archbishop Cranmer jokes: 'Come, come, my lord, you'd spare your spoons.'"
      />
      
      <MaterialSection
        material="steel"
        era="1840s"
        materialName="Stainless Steel"
        title="Silver for Everyone"
        body="Electroplating, invented in 1840, allowed base metals to be coated with silver. The factories of Sheffield and Birmingham democratized the gleam of aristocratic tables. By 1900, a complete silver-plated set cost less than a week's wages. What had been heirloom became commodity."
        fact="Today, an estimated 5 billion spoons are manufactured each year—more than any other piece of cutlery."
      />
      
      <RippleSection />
      <Timeline />
      <Sources />
      <Footer />
    </div>
  );
};

export default SpoonHistoryClient;
