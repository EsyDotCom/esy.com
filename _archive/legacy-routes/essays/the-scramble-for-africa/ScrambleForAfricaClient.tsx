'use client';

import React, { useState, useEffect, useRef } from 'react';
import './the-scramble-for-africa.css';

// ============================================================================
// TYPES
// ============================================================================

type PartitionEra =
  | 'exploration'
  | 'berlin'
  | 'congo'
  | 'resistance'
  | 'conquest'
  | 'systems'
  | 'cartography'
  | 'legacy';

interface FigureProfile {
  name: string;
  epithet: string;
  contributions: string[];
  quote?: string;
  quoteAttribution?: string;
  photoDescription: string;
}

interface Source {
  title: string;
  url: string;
  type: string;
}

// ============================================================================
// ERA MAPPING - Colonial period visual treatments
// ============================================================================

const chapterEras: Record<string, PartitionEra> = {
  hero: 'exploration',
  'chapter-1': 'exploration',
  'chapter-2': 'berlin',
  'chapter-3': 'congo',
  'chapter-4': 'resistance',
  'chapter-5': 'conquest',
  'chapter-6': 'systems',
  'chapter-7': 'cartography',
  'chapter-8': 'legacy',
};

// ============================================================================
// DATA
// ============================================================================

const figures: Record<string, FigureProfile> = {
  leopold: {
    name: 'King Leopold II',
    epithet: 'The Butcher of the Congo',
    contributions: [
      'Personally owned the Congo Free State as private property',
      'Created rubber extraction system enforced through terror',
      'Responsible for an estimated 10 million deaths',
    ],
    quote: 'I do not want to miss a good chance of getting us a slice of this magnificent African cake.',
    quoteAttribution: 'Leopold II, 1876 (attributed)',
    photoDescription: 'Official portrait with distinctive long white beard',
  },
  bismarck: {
    name: 'Otto von Bismarck',
    epithet: 'The Iron Chancellor',
    contributions: [
      'Convened the Berlin Conference (1884–1885)',
      'Established "effective occupation" principle',
      'Used colonial expansion to manage domestic pressures',
    ],
    quote: 'My map of Africa lies in Europe. Here is Russia and here is France, and we are in the middle.',
    quoteAttribution: 'Bismarck, 1888 (attributed)',
    photoDescription: 'Stern portrait in Prussian military uniform',
  },
  menelik: {
    name: 'Menelik II',
    epithet: 'Victor of Adwa',
    contributions: [
      'Emperor of Ethiopia (1889–1913)',
      'Modernized Ethiopian army with European weapons',
      'Commanded forces at Battle of Adwa (March 1, 1896)',
      'Preserved Ethiopian independence',
    ],
    quote: 'I have no intention of being an indifferent spectator if the distant powers have the idea of dividing up Africa.',
    quoteAttribution: 'Menelik II, circular letter to European powers, April 1891',
    photoDescription: 'Emperor in full regalia with crown and robes',
  },
  taytu: {
    name: 'Empress Taytu Betul',
    epithet: 'Warrior Empress',
    contributions: [
      'Wife and co-ruler with Menelik II',
      'Led 5,000 troops personally at Adwa',
      'Key strategic advisor opposing disputed treaty',
    ],
    quote: 'I am a woman. I do not love war. But rather than accept this, I prefer war.',
    quoteAttribution: 'Attributed to Empress Taytu',
    photoDescription: 'Empress in royal Ethiopian dress',
  },
  cetshwayo: {
    name: 'Cetshwayo kaMpande',
    epithet: 'Last Great Zulu King',
    contributions: [
      'King of the Zulu nation (1873–1879)',
      'Commanded victory at Battle of Isandlwana (1879)',
      'Inflicted worst defeat on British by indigenous forces',
    ],
    quote: 'I have done nothing wrong to the English. What have I done to the great ones of the English that they should come to my land?',
    quoteAttribution: 'Cetshwayo, prior to Anglo-Zulu War',
    photoDescription: 'Royal portrait from Cape Town exile',
  },
  morel: {
    name: 'E.D. Morel',
    epithet: 'Crusader Against the Congo Horrors',
    contributions: [
      'British journalist who exposed Congo atrocities',
      'Founded Congo Reform Association (1904)',
      'Published Red Rubber (1906)',
    ],
    quote: 'The rubber system of the Congo is slavery of the worst type.',
    quoteAttribution: 'E.D. Morel, Red Rubber, 1906',
    photoDescription: 'Portrait of Victorian-era reformer',
  },
  vonTrotha: {
    name: 'Lothar von Trotha',
    epithet: 'Architect of Genocide',
    contributions: [
      'German general in Southwest Africa',
      'Issued Vernichtungsbefehl (extermination order), 1904',
      'Responsible for approximately 75,000 deaths',
    ],
    quote: 'Within the German borders, every Herero, with or without a gun, with or without cattle, will be shot.',
    quoteAttribution: 'Von Trotha, Vernichtungsbefehl, October 2, 1904',
    photoDescription: 'German military portrait',
  },
};

const sources: Source[] = [
  { title: 'General Act of the Berlin Conference (1885)', url: 'https://en.wikisource.org/wiki/General_Act_of_the_Berlin_Conference', type: 'Primary' },
  { title: 'Hochschild, Adam. King Leopold\'s Ghost (1998)', url: 'https://www.amazon.com/King-Leopolds-Ghost-Heroism-Colonial/dp/0618001905', type: 'Academic' },
  { title: 'Pakenham, Thomas. The Scramble for Africa (1991)', url: 'https://www.amazon.com/Scramble-Africa-White-Conquest-1876/dp/0349104492', type: 'Academic' },
  { title: 'Marcus, Harold G. A History of Ethiopia (2002)', url: 'https://www.ucpress.edu/book/9780520224797/a-history-of-ethiopia', type: 'Academic' },
  { title: 'Olusoga & Erichsen. The Kaiser\'s Holocaust (2010)', url: 'https://www.amazon.com/Kaisers-Holocaust-Germanys-Forgotten-Genocide/dp/0571231411', type: 'Academic' },
  { title: 'UNESCO General History of Africa, Volumes VI-VII', url: 'https://unesdoc.unesco.org/', type: 'Academic' },
  { title: 'Britannica: Scramble for Africa', url: 'https://www.britannica.com/event/Scramble-for-Africa', type: 'Encyclopedia' },
  { title: 'Casement Report on the Congo (1904)', url: 'https://archive.org/details/correspondencere00greaiala', type: 'Primary' },
  { title: 'Morel, E.D. Red Rubber (1906)', url: 'https://archive.org/details/redrubbertheglor00moreuoft', type: 'Primary' },
  { title: 'Vandervort, Bruce. Wars of Imperial Conquest in Africa (1998)', url: 'https://www.amazon.com/Wars-Imperial-Conquest-Africa-1830-1914/dp/0253211786', type: 'Academic' },
];

// ============================================================================
// COMPONENTS
// ============================================================================

// Progress Bar - River filling with colonial colors
const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setProgress(Math.min(currentProgress, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="partition-progress" aria-hidden="true">
      <div className="partition-progress-track">
        <div className="partition-progress-fill" style={{ height: `${progress}%` }} />
      </div>
      <div className="partition-progress-markers">
        <span className="partition-progress-year" style={{ top: '5%' }}>1870</span>
        <span className="partition-progress-year" style={{ top: '25%' }}>1885</span>
        <span className="partition-progress-year" style={{ top: '50%' }}>1896</span>
        <span className="partition-progress-year" style={{ top: '75%' }}>1905</span>
        <span className="partition-progress-year" style={{ top: '95%' }}>1914</span>
      </div>
    </div>
  );
};

// Section wrapper with visibility detection
const Section: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
  era?: PartitionEra;
}> = ({ children, className = '', id, era }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const eraClass = era ? `partition-era-${era}` : '';

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`partition-section ${className} ${eraClass} ${isVisible ? 'visible' : ''}`}
    >
      {children}
    </section>
  );
};

// Quote Monument component
const QuoteMonument: React.FC<{
  quote: string;
  attribution: string;
  variant?: 'resistance' | 'atrocity';
}> = ({ quote, attribution, variant }) => {
  const variantClass = variant ? `partition-quote-${variant}` : '';

  return (
    <Section className={`partition-quote-monument ${variantClass}`}>
      <blockquote>
        <p>&ldquo;{quote}&rdquo;</p>
        <cite>— {attribution}</cite>
      </blockquote>
    </Section>
  );
};

// Figure Profile component
const FigureCard: React.FC<{ figure: FigureProfile }> = ({ figure }) => (
  <div className="partition-figure-card">
    <div className="partition-figure-icon" aria-hidden="true">
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="30" r="18" fill="currentColor" opacity="0.3" />
        <path d="M15 70 Q40 55 65 70" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.3" />
      </svg>
    </div>
    <h4 className="partition-figure-name">{figure.name}</h4>
    <p className="partition-figure-epithet">{figure.epithet}</p>
    <ul className="partition-figure-list">
      {figure.contributions.map((c, i) => (
        <li key={i}>{c}</li>
      ))}
    </ul>
    {figure.quote && (
      <blockquote className="partition-figure-quote">
        <p>&ldquo;{figure.quote}&rdquo;</p>
        {figure.quoteAttribution && <cite>— {figure.quoteAttribution}</cite>}
      </blockquote>
    )}
  </div>
);

// Timeline Event component
const TimelineEvent: React.FC<{
  year: string;
  title: string;
  description: string;
}> = ({ year, title, description }) => (
  <div className="partition-timeline-event">
    <span className="partition-timeline-year">{year}</span>
    <div className="partition-timeline-body">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </div>
);

// Statistic component
const Statistic: React.FC<{
  value: string;
  label: string;
  emphasis?: boolean;
}> = ({ value, label, emphasis = false }) => (
  <div className={`partition-stat ${emphasis ? 'emphasis' : ''}`}>
    <span className="partition-stat-value">{value}</span>
    <span className="partition-stat-label">{label}</span>
  </div>
);

// Content Warning component
const ContentWarning: React.FC<{
  onProceed: () => void;
  visible: boolean;
}> = ({ onProceed, visible }) => {
  if (!visible) return null;

  return (
    <div className="partition-warning">
      <div className="partition-warning-inner">
        <h3>Content Warning</h3>
        <p>
          The following section contains descriptions and references to colonial violence,
          including forced labor, mutilation, and mass death. This historical documentation
          is presented to accurately convey the reality of the Congo Free State under Leopold II.
        </p>
        <div className="partition-warning-actions">
          <button onClick={onProceed} className="partition-warning-proceed">
            Continue Reading
          </button>
          <a href="#chapter-4" className="partition-warning-skip">
            Skip to African Resistance
          </a>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const ScrambleForAfricaClient: React.FC = () => {
  const [showWarning, setShowWarning] = useState(true);
  const [warningDismissed, setWarningDismissed] = useState(false);

  const handleProceed = () => {
    setWarningDismissed(true);
    setShowWarning(false);
  };

  return (
    <div className="partition-essay partition-era-exploration">
      <ProgressBar />

      {/* ================================================================== */}
      {/* HERO SECTION */}
      {/* ================================================================== */}
      <section className="partition-hero partition-era-exploration">
        <div className="partition-hero-bg" aria-hidden="true">
          <div className="partition-africa-outline">
            <svg viewBox="0 0 400 450" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                className="partition-africa-path"
                d="M200 20 L230 40 L260 35 L290 50 L320 45 L350 70 L370 100 L380 140 L375 180 L370 220 L365 260 L350 300 L330 340 L300 370 L270 390 L240 400 L210 410 L180 415 L150 405 L120 390 L100 360 L80 320 L70 280 L60 240 L55 200 L60 160 L70 120 L90 80 L120 50 L150 35 L180 25 Z"
              />
            </svg>
          </div>
          <div className="partition-hero-grain" />
        </div>

        <div className="partition-hero-content">
          <span className="partition-hero-date">1870 – 1914</span>
          <h1 className="partition-hero-title">
            <span className="partition-title-line">The</span>
            <span className="partition-title-line partition-title-main">Scramble</span>
          </h1>
          <p className="partition-hero-subtitle">
            How Europe Carved Up a Continent in a Generation
          </p>
          <div className="partition-hero-stats">
            <Statistic value="10%" label="European control, 1870" />
            <Statistic value="90%" label="European control, 1914" emphasis />
          </div>
        </div>

        <div className="partition-scroll-cue" aria-hidden="true">
          <span>Scroll to explore</span>
          <div className="partition-scroll-line" />
        </div>
      </section>

      {/* ================================================================== */}
      {/* CHAPTER 1: THE STAGE IS SET */}
      {/* ================================================================== */}
      <Section id="chapter-1" className="partition-chapter" era={chapterEras['chapter-1']}>
        <div className="partition-chapter-header">
          <span className="partition-chapter-number">Chapter 1</span>
          <span className="partition-chapter-era">1870–1880</span>
        </div>
        <h2 className="partition-chapter-title">The Stage Is Set</h2>
        <p className="partition-chapter-metaphor">
          The feast before the feeding frenzy—Africa as imagined prize.
        </p>

        <div className="partition-chapter-content">
          <div className="partition-content-block">
            <p>
              In 1870, Africa remained one of Earth&apos;s last frontiers for European empires.
              Colonial presence hugged the coasts—French in Algeria and Senegal, British in
              the Cape and Gold Coast, Portuguese clinging to Angola and Mozambique&apos;s shores.
              The interior was a mystery European cartographers filled with speculation.
            </p>
            <p>
              Then came the explorers. Henry Morton Stanley&apos;s famous 1871 encounter with
              David Livingstone captured imaginations. His 1877 mapping of the Congo River
              opened new possibilities. King Leopold II of Belgium, watching hungrily, saw
              opportunity where others saw wilderness.
            </p>
            <p>
              The technology was finally arriving: <strong>quinine</strong> made malaria survivable,
              <strong>steamships</strong> could navigate great rivers, and the <strong>telegram</strong> connected
              expeditions to capitals. What had been impossible became merely difficult.
            </p>
          </div>

          <div className="partition-figures-grid">
            <FigureCard figure={figures.leopold} />
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* CHAPTER 2: THE RULES OF THE GAME */}
      {/* ================================================================== */}
      <Section id="chapter-2" className="partition-chapter" era={chapterEras['chapter-2']}>
        <div className="partition-chapter-header">
          <span className="partition-chapter-number">Chapter 2</span>
          <span className="partition-chapter-era">1884–1885</span>
        </div>
        <h2 className="partition-chapter-title">The Rules of the Game</h2>
        <p className="partition-chapter-metaphor">
          Fourteen nations carve a continent around a table where no Africans sat.
        </p>

        <div className="partition-chapter-content partition-split">
          <div className="partition-content-block">
            <p>
              On November 15, 1884, representatives of fourteen European nations gathered
              in Berlin at Chancellor Otto von Bismarck&apos;s invitation. For three months they
              debated, negotiated, and established rules for what was already underway:
              <strong>the division of Africa</strong>.
            </p>
            <p>
              The General Act of Berlin codified the <em>&ldquo;effective occupation&rdquo;</em> principle—European
              powers could claim African territory only by demonstrating actual control. This
              accelerated the scramble; claiming on paper was no longer enough.
              <strong>The race was on.</strong>
            </p>
            <p>
              Not a single African was invited. The men in Berlin drew lines on maps with
              rulers, cutting through kingdoms and cultures they neither knew nor cared to
              understand. The Yoruba were divided. The Somali were split among four powers.
              Ethnic groups who had coexisted for centuries found themselves in different
              colonial administrations.
            </p>
          </div>

          <div className="partition-berlin-visual">
            <div className="partition-conference" aria-hidden="true">
              <div className="partition-conference-table" />
              <div className="partition-delegates">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="partition-delegate" />
                ))}
              </div>
              <div className="partition-map-table" />
            </div>
            <p className="partition-visual-caption">
              Berlin Conference, 1884–1885: European delegates divide Africa
            </p>
          </div>
        </div>

        <div className="partition-figures-grid">
          <FigureCard figure={figures.bismarck} />
        </div>
      </Section>

      {/* QUOTE MONUMENT: BISMARCK */}
      <QuoteMonument
        quote="My map of Africa lies in Europe. Here is Russia and here is France, and we are in the middle. That is my map of Africa."
        attribution="Otto von Bismarck (attributed)"
      />

      {/* ================================================================== */}
      {/* CHAPTER 3: THE KING'S PRIVATE HELL */}
      {/* ================================================================== */}
      <Section id="chapter-3" className="partition-chapter" era={chapterEras['chapter-3']}>
        <div className="partition-chapter-header">
          <span className="partition-chapter-number">Chapter 3</span>
          <span className="partition-chapter-era">1885–1908</span>
        </div>
        <h2 className="partition-chapter-title">The King&apos;s Private Hell</h2>
        <p className="partition-chapter-metaphor">
          One man&apos;s personal property—larger than Western Europe—and the millions who died to make him rich.
        </p>

        {!warningDismissed && (
          <ContentWarning onProceed={handleProceed} visible={showWarning} />
        )}

        {warningDismissed && (
          <div className="partition-chapter-content">
            <div className="partition-content-block">
              <p>
                The Congo Free State was not a Belgian colony. It was <strong>Leopold&apos;s
                personal property</strong>, recognized by the Berlin Conference as his to exploit.
                And exploit he did, creating what Adam Hochschild called &ldquo;one of the great
                crimes of the modern era.&rdquo;
              </p>
              <p>
                The rubber quota system was enforced through terror. Villages that failed to
                meet quotas faced punishment. Force Publique soldiers were required to account
                for every bullet fired—and they did so by <em>bringing back severed hands</em>.
                Photographs of Congolese with amputated limbs circulated in reform campaigns,
                shocking the world.
              </p>
              <p>
                The death toll is contested but catastrophic. Hochschild&apos;s estimate of
                <strong>10 million—half the population</strong>—is widely cited. Entire regions were
                depopulated. People fled into forests or perished from overwork, starvation,
                and colonial violence.
              </p>
            </div>

            <div className="partition-data-block">
              <h3>The Toll</h3>
              <div className="partition-stats-row">
                <Statistic value="~10M" label="Estimated deaths" emphasis />
                <Statistic value="50%" label="Population loss" />
                <Statistic value="23 yrs" label="Leopold&apos;s rule" />
              </div>
            </div>

            <div className="partition-content-block">
              <p>
                Yet the Congo also produced history&apos;s first international human rights campaign.
                E.D. Morel, analyzing shipping records, noticed ships arrived with guns and left
                with only rubber and ivory—no trade goods. He exposed the system in <em>Red Rubber</em>.
                Roger Casement&apos;s 1904 British consular report provided official documentation.
              </p>
              <p>
                Together they built the Congo Reform Association, and in 1908, international
                pressure forced Leopold to surrender his prize to the Belgian state.
              </p>
            </div>

            <div className="partition-figures-grid two-col">
              <FigureCard figure={figures.morel} />
            </div>
          </div>
        )}
      </Section>

      {/* ================================================================== */}
      {/* CHAPTER 4: THOSE WHO FOUGHT BACK */}
      {/* ================================================================== */}
      <Section id="chapter-4" className="partition-chapter" era={chapterEras['chapter-4']}>
        <div className="partition-chapter-header">
          <span className="partition-chapter-number">Chapter 4</span>
          <span className="partition-chapter-era">1879–1898</span>
        </div>
        <h2 className="partition-chapter-title">Those Who Fought Back</h2>
        <p className="partition-chapter-metaphor">
          Resistance was the rule, not the exception—from Zulu spears to Ethiopian artillery.
        </p>

        <div className="partition-chapter-content">
          <div className="partition-content-block">
            <p>
              The narrative of passive African submission is a colonial myth.
              <strong>Resistance was widespread</strong>, varied, and sometimes successful.
            </p>
          </div>

          <div className="partition-timeline">
            <TimelineEvent
              year="1879"
              title="Battle of Isandlwana"
              description="Zulu forces under King Cetshwayo annihilated a British column—the worst defeat ever inflicted on the British army by an indigenous force."
            />
            <TimelineEvent
              year="1882–1898"
              title="Samori Ture&apos;s Resistance"
              description="In West Africa, Samori Ture resisted French conquest for sixteen years, building the Wassoulou Empire and manufacturing his own firearms."
            />
            <TimelineEvent
              year="1896"
              title="Battle of Adwa"
              description="Ethiopian forces crushed the Italian invasion. Italy recognized Ethiopian independence—the only European power to do so."
            />
          </div>

          <div className="partition-highlight">
            <div className="partition-highlight-content">
              <h3>The Victory at Adwa</h3>
              <p>
                Emperor Menelik II had modernized his army, purchasing European weapons
                while exploiting European rivalries. When Italy claimed Ethiopia as a
                protectorate based on a disputed treaty, Menelik prepared for war.
              </p>
              <p>
                On <strong>March 1, 1896</strong>, 100,000 Ethiopian soldiers faced 17,000 Italians.
                The result was devastating for Italy: 6,000 dead, 1,500 wounded, 3,000 captured.
                Ethiopia remained <em>the only African nation to repel European colonization</em>.
              </p>
              <div className="partition-stats-row">
                <Statistic value="100,000" label="Ethiopian forces" emphasis />
                <Statistic value="6,000" label="Italian dead" />
              </div>
            </div>
          </div>

          <div className="partition-figures-grid two-col">
            <FigureCard figure={figures.menelik} />
            <FigureCard figure={figures.taytu} />
          </div>
        </div>
      </Section>

      {/* QUOTE MONUMENT: MENELIK */}
      <QuoteMonument
        quote="I have no intention of being an indifferent spectator if the distant powers have the idea of dividing up Africa."
        attribution="Emperor Menelik II, 1891"
        variant="resistance"
      />

      {/* ================================================================== */}
      {/* CHAPTER 5: THE TOOLS OF CONQUEST */}
      {/* ================================================================== */}
      <Section id="chapter-5" className="partition-chapter" era={chapterEras['chapter-5']}>
        <div className="partition-chapter-header">
          <span className="partition-chapter-number">Chapter 5</span>
          <span className="partition-chapter-era">1880–1900</span>
        </div>
        <h2 className="partition-chapter-title">The Tools of Conquest</h2>
        <p className="partition-chapter-metaphor">
          Not superior civilization but superior firepower—quinine, steamships, and the Maxim gun.
        </p>

        <div className="partition-chapter-content">
          <div className="partition-content-block">
            <p>
              European conquest of Africa was not inevitable. For centuries, Africa had
              repelled European penetration—disease killed colonizers faster than they could
              establish footholds. <strong>What changed was technology.</strong>
            </p>
          </div>

          <div className="partition-tech-grid">
            <div className="partition-tech-card">
              <div className="partition-tech-icon" aria-hidden="true">💊</div>
              <h4>Quinine</h4>
              <p>Made malaria survivable for Europeans. What had been &ldquo;the white man&apos;s grave&rdquo; became accessible.</p>
            </div>
            <div className="partition-tech-card">
              <div className="partition-tech-icon" aria-hidden="true">🚢</div>
              <h4>Steamships</h4>
              <p>Enabled river navigation—the Congo, the Niger, the Nile—carrying troops where foot travel was impossible.</p>
            </div>
            <div className="partition-tech-card">
              <div className="partition-tech-icon" aria-hidden="true">⚙️</div>
              <h4>Maxim Gun</h4>
              <p>The first portable machine gun. The decisive technology that turned battles into massacres.</p>
            </div>
          </div>

          <div className="partition-data-panel">
            <h3>Battle of Omdurman, 1898</h3>
            <p>
              British forces under General Kitchener faced the Mahdist army of Sudan.
              The result was slaughter.
            </p>
            <div className="partition-comparison">
              <div className="partition-comparison-block casualties">
                <span className="partition-stat-label">Mahdist Casualties</span>
                <span className="partition-stat-value">11,000</span>
                <span className="partition-comparison-note">killed in hours</span>
              </div>
              <div className="partition-comparison-vs">vs</div>
              <div className="partition-comparison-block">
                <span className="partition-stat-label">British Casualties</span>
                <span className="partition-stat-value">47</span>
                <span className="partition-comparison-note">total dead</span>
              </div>
            </div>
            <p className="partition-data-conclusion">
              This asymmetry was not about courage or civilization.
              <strong>It was about bullets per minute.</strong>
            </p>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* CHAPTER 6: THE COLONIAL MACHINE */}
      {/* ================================================================== */}
      <Section id="chapter-6" className="partition-chapter" era={chapterEras['chapter-6']}>
        <div className="partition-chapter-header">
          <span className="partition-chapter-number">Chapter 6</span>
          <span className="partition-chapter-era">1890–1914</span>
        </div>
        <h2 className="partition-chapter-title">The Colonial Machine</h2>
        <p className="partition-chapter-metaphor">
          Different labels, same extraction—how European powers built systems to drain a continent.
        </p>

        <div className="partition-chapter-content">
          <div className="partition-content-block">
            <p>
              Once territory was claimed, Europeans built systems to exploit it. The methods
              varied—British &ldquo;indirect rule,&rdquo; French &ldquo;assimilation,&rdquo; Belgian extraction terror,
              German militarized administration—but <strong>the logic was shared</strong>:
              Africa existed to enrich Europe.
            </p>
          </div>

          <div className="partition-systems-grid">
            <div className="partition-system-panel british">
              <h4>British Empire</h4>
              <p className="partition-system-label">Indirect Rule</p>
              <p>Used African chiefs as intermediaries under British supervision. Cheaper and created illusion of African participation.</p>
            </div>
            <div className="partition-system-panel french">
              <h4>French Empire</h4>
              <p className="partition-system-label">Assimilation</p>
              <p>Goal to create &ldquo;Black Frenchmen.&rdquo; More centralized, cultural replacement, French law and education.</p>
            </div>
            <div className="partition-system-panel belgian">
              <h4>Belgian Congo</h4>
              <p className="partition-system-label">Extraction Terror</p>
              <p>Leopold&apos;s personal rule, pure exploitation, worst abuses. Rubber quotas enforced through mutilation.</p>
            </div>
            <div className="partition-system-panel german">
              <h4>German Empire</h4>
              <p className="partition-system-label">Militarized Control</p>
              <p>Settler emphasis, brutal suppression. Herero and Nama genocide—the 20th century&apos;s first.</p>
            </div>
          </div>

          <div className="partition-content-block">
            <p>
              In German Southwest Africa (Namibia), colonization took its most extreme form.
              General Lothar von Trotha&apos;s <em>Vernichtungsbefehl</em>—extermination order—was explicit:
            </p>
          </div>
        </div>
      </Section>

      {/* QUOTE MONUMENT: VON TROTHA */}
      <QuoteMonument
        quote="Within the German borders, every Herero, with or without a gun, with or without cattle, will be shot. I will no longer accept women and children."
        attribution="Lothar von Trotha, Vernichtungsbefehl, October 2, 1904"
        variant="atrocity"
      />

      <Section className="partition-genocide-section" era="systems">
        <div className="partition-genocide-inner">
          <h3>The First Genocide of the 20th Century</h3>
          <div className="partition-stats-row">
            <Statistic value="65,000" label="Herero killed" emphasis />
            <Statistic value="80%" label="of Herero population" />
            <Statistic value="10,000" label="Nama killed" />
            <Statistic value="2021" label="Germany recognized genocide" />
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* CHAPTER 7: LINES ON MAPS, LIVES DIVIDED */}
      {/* ================================================================== */}
      <Section id="chapter-7" className="partition-chapter" era={chapterEras['chapter-7']}>
        <div className="partition-chapter-header">
          <span className="partition-chapter-number">Chapter 7</span>
          <span className="partition-chapter-era">1885–1914</span>
        </div>
        <h2 className="partition-chapter-title">Lines on Maps, Lives Divided</h2>
        <p className="partition-chapter-metaphor">
          Borders drawn with rulers in Europe sliced through peoples who had lived together for millennia.
        </p>

        <div className="partition-chapter-content">
          <div className="partition-content-block">
            <p>
              The lines drawn in Berlin and negotiated in subsequent treaties had one thing
              in common: <strong>they ignored Africa</strong>.
            </p>
            <p>
              An estimated <strong>177 ethnic groups were divided by colonial borders</strong>. The Maasai
              found themselves split between British Kenya and German Tanganyika. The Ewe
              were divided among British, French, and German territories. Kingdoms that had
              existed for centuries were partitioned or absorbed into unrelated administrative units.
            </p>
          </div>

          <div className="partition-impact-stat">
            <span className="partition-big-number">177</span>
            <span className="partition-impact-label">Ethnic groups divided by colonial borders</span>
          </div>

          <div className="partition-content-block">
            <p>
              The scramble also created flash points that nearly ignited European war.
              At <strong>Fashoda in 1898</strong>, French and British forces met in Sudan—two empires
              converging on the same point. War seemed imminent before France backed down.
            </p>
            <p>
              By <strong>1914</strong>, only Ethiopia and Liberia remained independent. The rest of Africa
              was colored on European maps, governed from European capitals, and bled for
              European profit.
            </p>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* CHAPTER 8: THE BORDERS THAT REMAIN */}
      {/* ================================================================== */}
      <Section id="chapter-8" className="partition-chapter" era={chapterEras['chapter-8']}>
        <div className="partition-chapter-header">
          <span className="partition-chapter-number">Chapter 8</span>
          <span className="partition-chapter-era">1914–Present</span>
        </div>
        <h2 className="partition-chapter-title">The Borders That Remain</h2>
        <p className="partition-chapter-metaphor">
          Independence changed the flags but kept the lines—the scramble&apos;s longest legacy.
        </p>

        <div className="partition-chapter-content">
          <div className="partition-content-block">
            <p>
              When African nations gained independence in the mid-20th century, they
              <strong>inherited colonial borders</strong>. The Organization of African Unity, founded
              in 1963, explicitly maintained these boundaries to prevent endless territorial
              disputes. The lines drawn in Berlin would remain.
            </p>
            <p>
              Those lines continue to shape African politics. Ethnic groups divided in 1885
              remain divided today. Landlocked nations created by colonial negotiation remain
              dependent on neighbors for port access. Resource-rich regions claimed by distant
              capitals remain sites of extraction and conflict.
            </p>
            <p>
              The scramble&apos;s economic patterns also persist. Many African nations still export
              raw materials to former colonial powers and import manufactured goods. The
              infrastructure built for extraction—railroads from mine to port—still constrains
              development.
            </p>
          </div>

          <div className="partition-legacy-compare">
            <div className="partition-compare-panel">
              <span className="partition-compare-year">1914</span>
              <p>Colonial Africa: Territories named by European powers</p>
              <ul>
                <li>French West Africa</li>
                <li>Belgian Congo</li>
                <li>German East Africa</li>
                <li>British Nigeria</li>
              </ul>
            </div>
            <div className="partition-legacy-arrow" aria-hidden="true">→</div>
            <div className="partition-compare-panel">
              <span className="partition-compare-year">Today</span>
              <p>Independent nations: African names, <em>same borders</em></p>
              <ul>
                <li>Mali, Senegal, Niger...</li>
                <li>Democratic Republic of Congo</li>
                <li>Tanzania, Rwanda, Burundi</li>
                <li>Nigeria</li>
              </ul>
            </div>
          </div>

          <div className="partition-content-block partition-closing">
            <p>
              This is not destiny. African nations have built, grown, and transformed in the
              century since colonial rule ended. But understanding <em>why the map looks the way
              it does</em>—and why certain conflicts recur—requires understanding the forty years
              when Europe carved up a continent.
            </p>
            <p className="partition-closing-line">
              <strong>The scramble ended. Its consequences did not.</strong>
            </p>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SOURCES SECTION */}
      {/* ================================================================== */}
      <section className="partition-sources">
        <div className="partition-sources-inner">
          <h3 className="partition-sources-title">Sources & Further Reading</h3>
          <ul className="partition-sources-list">
            {sources.map((source, index) => (
              <li key={index}>
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.title}
                </a>
                <span className="partition-source-type">{source.type}</span>
              </li>
            ))}
          </ul>
          <p className="partition-sources-note">
            This narrative was fact-checked against peer-reviewed academic sources and
            authoritative historical records. Primary documents from the Berlin Conference,
            Casement Report, and contemporary reform publications were consulted.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FOOTER */}
      {/* ================================================================== */}
      <footer className="partition-footer">
        <div className="partition-footer-inner">
          <p className="partition-footer-attr">
            A visual essay by <strong>Esy</strong>
          </p>
          <p className="partition-footer-date">December 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default ScrambleForAfricaClient;
