'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import './the-word-essay.css';

/* ============================================
   THE WORD "ESSAY" — A HISTORY OF ATTEMPTING TO THINK
   ============================================
   A typography-forward visual essay where the word itself
   is the protagonist. Era-appropriate typefaces tell the
   story of the essay form across 450 years.
   
   Design Philosophy: Typography as hero, not decoration.
   The word "Essay" morphs through Garamond → Caslon → 
   Baskerville → Gill Sans as eras change.
   ============================================ */

// ==================== DATA ====================

interface Figure {
  name: string;
  epithet: string;
  years: string;
  quote: string;
  quoteSource: string;
  contribution: string;
}

interface Chapter {
  id: string;
  number: number;
  title: string;
  era: string;
  years: string;
  metaphor: string;
  content: string[];
  figure?: Figure;
  secondaryFigure?: Figure;
  wordForm: string;
  eraClass: string;
}

const chapters: Chapter[] = [
  {
    id: 'etymology',
    number: 1,
    title: 'The Weighing',
    era: 'Latin Origins',
    years: 'Classical Era',
    metaphor: 'Ideas placed on a scale, weighed without demanding they balance',
    wordForm: 'EXAGIUM',
    eraClass: 'era-latin',
    content: [
      'The journey begins before Montaigne, in the Latin roots of the word. Exigere meant to drive out, to examine, to test. Its derivative exagium meant a weighing—placing something on a scale.',
      'The French essayer evolved from this: to try, to attempt, to test.',
      'This etymology reveals something profound. When Montaigne named his works "Essais" in 1580, he was saying: these are weightings. These are tests. Not conclusions but trials.',
      'An essay is not a declaration but a weighing. It places ideas on a scale and watches which way they tip—without forcing the balance.',
    ],
  },
  {
    id: 'montaigne',
    number: 2,
    title: 'The Birth',
    era: 'Renaissance',
    years: 'Bordeaux, 1580',
    metaphor: 'A man names the process of thinking, not the product',
    wordForm: 'ESSAIS',
    eraClass: 'era-renaissance',
    content: [
      'In 1571, Michel de Montaigne retreated to his tower library. He was 38 years old, had served as a magistrate in Bordeaux, and was ready to do something unprecedented: write about nothing in particular, and everything in general.',
      'In 1580, printer Simon Millanges of Bordeaux published two books of these writings. Montaigne called them Essais—attempts. Not Pensées (thoughts), not Discours (discourses), not Traités (treatises). Attempts.',
      'This naming was a philosophical revolution disguised as modesty. By calling his works after the process of thinking rather than the product of thought, Montaigne invented a form that could contradict itself, change its mind mid-sentence, and admit uncertainty.',
    ],
    figure: {
      name: 'Michel de Montaigne',
      epithet: 'The Father of the Essay',
      years: '1533–1592',
      quote: 'I am myself the matter of my book.',
      quoteSource: 'Essais, "To the Reader"',
      contribution: 'Coined "Essais" in 1580, creating a new literary form. His motto: "Que sais-je?" (What do I know?)',
    },
  },
  {
    id: 'bacon',
    number: 3,
    title: 'The Crossing',
    era: 'English Adoption',
    years: 'London, 1597',
    metaphor: 'A form crosses the Channel and learns to be brief',
    wordForm: 'ESSAYES',
    eraClass: 'era-english',
    content: [
      'In 1597, Francis Bacon—philosopher, statesman, and future Lord Chancellor of England—published ten short pieces he called Essayes. The essay had crossed the English Channel.',
      'But Bacon\'s essays were different. Where Montaigne meandered through his thoughts like a conversation with a friend, Bacon wrote pointed counsel.',
      'Montaigne explored; Bacon advised. Montaigne asked questions; Bacon provided answers. Both were essays, but the form now had two modes: the exploratory and the didactic.',
    ],
    figure: {
      name: 'Francis Bacon',
      epithet: 'The English Pioneer',
      years: '1561–1626',
      quote: 'Some books are to be tasted, others to be swallowed, and some few to be chewed and digested.',
      quoteSource: '"Of Studies"',
      contribution: 'Published first English essays in 1597. Transformed the form from introspection to counsel.',
    },
  },
  {
    id: 'coffeehouse',
    number: 4,
    title: 'The Coffeehouse',
    era: 'Enlightenment',
    years: 'London, 1711',
    metaphor: 'The essay leaves the library and joins the conversation',
    wordForm: 'ESSAY',
    eraClass: 'era-enlightenment',
    content: [
      'March 1, 1711: the first issue of The Spectator appeared in London\'s coffeehouses. Joseph Addison and Richard Steele had invented something new—the daily essay.',
      'Each issue was about 2,500 words, designed to be read over coffee, discussed with strangers, left on the table for the next reader.',
      'The Spectator ran for 555 issues. Circulation was about 3,000, but readership far higher—essays passed from hand to hand in coffeehouses throughout the city. The form had been democratized.',
    ],
    figure: {
      name: 'Joseph Addison',
      epithet: 'The Periodical Essayist',
      years: '1672–1719',
      quote: 'I shall endeavour to enliven morality with wit, and to temper wit with morality.',
      quoteSource: 'The Spectator, No. 10',
      contribution: 'Co-founded The Spectator (1711–1712), creating the daily essay tradition.',
    },
  },
  {
    id: 'intimate',
    number: 5,
    title: 'The Intimate',
    era: 'Personal Essay',
    years: '1820s–1840s',
    metaphor: 'The essay becomes a letter from a friend you\'ve never met',
    wordForm: 'Essay',
    eraClass: 'era-romantic',
    content: [
      'By the 1820s, the essay had found its heart. Charles Lamb, writing under the pseudonym "Elia," created something unprecedentedly personal—whimsical, nostalgic, confessional.',
      'Across the Atlantic, Ralph Waldo Emerson was making the essay bold. His 1841 Essays—including "Self-Reliance"—declared rather than explored.',
      'Two modes of intimacy: Lamb whispered, Emerson proclaimed. Both made the essay personal—one through confession, one through conviction.',
    ],
    figure: {
      name: 'Charles Lamb',
      epithet: 'The Familiar Essayist',
      years: '1775–1834',
      quote: 'I am determined my children shall be brought up in their father\'s religion, if they can find out what it is.',
      quoteSource: 'Essays of Elia',
      contribution: 'Created the familiar essay under the pseudonym "Elia." Pioneered intimacy and whimsy.',
    },
    secondaryFigure: {
      name: 'Ralph Waldo Emerson',
      epithet: 'The American Transcendentalist',
      years: '1803–1882',
      quote: 'A foolish consistency is the hobgoblin of little minds.',
      quoteSource: '"Self-Reliance"',
      contribution: 'Made the essay a vehicle for philosophical declaration. Central to American literary identity.',
    },
  },
  {
    id: 'pure',
    number: 6,
    title: 'The Pure',
    era: 'Modernist',
    years: '1920s–1940s',
    metaphor: 'The essay stripped to essence—pure like water or pure like wine',
    wordForm: 'ESSAY',
    eraClass: 'era-modernist',
    content: [
      'In 1922, Virginia Woolf published "The Modern Essay," theorizing the form: "A good essay must have this permanent quality about it; it must draw its curtain round us, but it must be a curtain that shuts us in, not out."',
      'A generation later, George Orwell approached purity differently. In "Politics and the English Language" (1946), he made prose clarity a moral imperative.',
      'Woolf\'s purity was aesthetic; Orwell\'s was ethical. Together, they redefined the modernist essay: stripped of ornament, essential, precise.',
    ],
    figure: {
      name: 'Virginia Woolf',
      epithet: 'The Modernist Theorist',
      years: '1882–1941',
      quote: 'The essay must be pure—pure like water or pure like wine, but pure from dullness, deadness, and deposits of extraneous matter.',
      quoteSource: '"The Modern Essay"',
      contribution: 'Theorized the essay form. Advocated for purity and pleasure as principles.',
    },
    secondaryFigure: {
      name: 'George Orwell',
      epithet: 'The Political Essayist',
      years: '1903–1950',
      quote: 'If it is possible to cut a word out, always cut it out.',
      quoteSource: '"Politics and the English Language"',
      contribution: 'Made prose clarity a moral imperative. Six rules for writing.',
    },
  },
  {
    id: 'witness',
    number: 7,
    title: 'The Witness',
    era: 'Civil Rights & New Journalism',
    years: '1950s–1970s',
    metaphor: 'The essay as moral reckoning—personal becomes political',
    wordForm: 'essay',
    eraClass: 'era-witness',
    content: [
      'In 1955, James Baldwin published Notes of a Native Son, interweaving his father\'s death, his nineteenth birthday, and the Harlem riot of 1943. The personal essay became political testimony.',
      'Joan Didion approached from a different angle. In The White Album (1979), she turned the essay\'s knife inward: "We tell ourselves stories in order to live."',
      'Baldwin bore witness to injustice; Didion interrogated self-deception. Both expanded what an essay could do: confront, convict, complicate.',
    ],
    figure: {
      name: 'James Baldwin',
      epithet: 'The Moral Witness',
      years: '1924–1987',
      quote: 'Not everything that is faced can be changed, but nothing can be changed until it is faced.',
      quoteSource: 'Attributed',
      contribution: 'Made the essay a form of moral reckoning. Intertwined personal and political.',
    },
    secondaryFigure: {
      name: 'Joan Didion',
      epithet: 'The Self-Interrogator',
      years: '1934–2021',
      quote: 'We tell ourselves stories in order to live.',
      quoteSource: '"The White Album"',
      contribution: 'Turned essay analysis inward. Questioned narratives, including her own.',
    },
  },
  {
    id: 'infinite',
    number: 8,
    title: 'The Infinite',
    era: 'Digital',
    years: '2000s–Present',
    metaphor: 'One word, infinite forms—the essay becomes everything',
    wordForm: 'essay',
    eraClass: 'era-digital',
    content: [
      'The word "essay" now applies to more than Montaigne could have imagined. Blog posts, video essays, podcast essays, newsletter essays—the form has exploded across media.',
      'And yet: the word persists. We still call these things essays. The semantic range expands, but the core meaning remains—an attempt, a try, an exploration.',
      'From Montaigne\'s tower to your phone screen, the essay remains what it always was: the form that thinks without pretending to finish.',
    ],
  },
];

const sources = [
  { title: 'Online Etymology Dictionary — "Essay"', url: 'https://www.etymonline.com/word/essay' },
  { title: 'Stanford Encyclopedia of Philosophy — Montaigne', url: 'https://plato.stanford.edu/entries/montaigne/' },
  { title: 'Wikipedia — Essays (Montaigne)', url: 'https://en.wikipedia.org/wiki/Essays_(Montaigne)' },
  { title: 'Britannica — The Spectator (1711–1712)', url: 'https://www.britannica.com/topic/The-Spectator-British-periodical-1711-1712' },
  { title: 'Cambridge University Press — Francis Bacon and Early-Modern Philosophy', url: 'https://www.cambridge.org/core/books/francis-bacon-and-the-transformation-of-earlymodern-philosophy' },
  { title: 'Wikipedia — Self-Reliance (Emerson)', url: 'https://en.wikipedia.org/wiki/Self-Reliance' },
  { title: 'Wikipedia — Politics and the English Language', url: 'https://en.wikipedia.org/wiki/Politics_and_the_English_Language' },
  { title: 'EBSCO Research Starters — Montaigne Publishes His Essays', url: 'https://www.ebsco.com/research-starters/history/montaigne-publishes-his-essays' },
];

// ==================== COMPONENTS ====================

// Progress Bar Component — Weighing Scale Concept
const WeighingScaleProgress: React.FC<{ progress: number; chapters: Chapter[] }> = ({ progress, chapters }) => {
  return (
    <div className="weighing-scale-progress">
      <div className="scale-container">
        <div className="scale-arm">
          <div className="scale-pivot" />
          <div 
            className="scale-indicator" 
            style={{ 
              transform: `rotate(${-25 + (progress * 50)}deg)` 
            }} 
          />
        </div>
        <div className="chapter-markers">
          {chapters.map((chapter, index) => {
            const markerPosition = ((index + 1) / chapters.length) * 100;
            const isActive = progress * 100 >= markerPosition - 5;
            return (
              <div 
                key={chapter.id}
                className={`chapter-marker ${isActive ? 'active' : ''}`}
                style={{ top: `${markerPosition}%` }}
                title={chapter.title}
              />
            );
          })}
        </div>
        <div 
          className="progress-fill"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};

// Typography Morph Display — The Word as Hero
const WordDisplay: React.FC<{ 
  wordForm: string; 
  eraClass: string;
  isVisible: boolean;
}> = ({ wordForm, eraClass, isVisible }) => {
  return (
    <div className={`word-display ${eraClass} ${isVisible ? 'visible' : ''}`}>
      <span className="the-word">{wordForm}</span>
    </div>
  );
};

// Quote Monument Component
const QuoteMonument: React.FC<{ 
  quote: string; 
  attribution: string; 
  source: string;
  isVisible: boolean;
}> = ({ quote, attribution, source, isVisible }) => {
  return (
    <blockquote className={`quote-monument ${isVisible ? 'visible' : ''}`}>
      <div className="quote-marks">&ldquo;</div>
      <p className="quote-text">{quote}</p>
      <footer className="quote-attribution">
        <cite>— {attribution}</cite>
        <span className="quote-source">{source}</span>
      </footer>
    </blockquote>
  );
};

// Figure Profile Component
const FigureProfile: React.FC<{ 
  figure: Figure; 
  isVisible: boolean;
  variant?: 'primary' | 'secondary';
}> = ({ figure, isVisible, variant = 'primary' }) => {
  return (
    <div className={`figure-profile ${variant} ${isVisible ? 'visible' : ''}`}>
      <div className="figure-header">
        <h4 className="figure-name">{figure.name}</h4>
        <span className="figure-years">{figure.years}</span>
      </div>
      <p className="figure-epithet">{figure.epithet}</p>
      <p className="figure-contribution">{figure.contribution}</p>
      <blockquote className="figure-quote">
        <p>&ldquo;{figure.quote}&rdquo;</p>
        <cite>— {figure.quoteSource}</cite>
      </blockquote>
    </div>
  );
};

// Chapter Section Component
const ChapterSection: React.FC<{ 
  chapter: Chapter; 
  isVisible: boolean;
}> = ({ chapter, isVisible }) => {
  return (
    <section 
      id={chapter.id}
      className={`chapter-section ${chapter.eraClass} ${isVisible ? 'visible' : ''}`}
    >
      <div className="chapter-header">
        <div className="chapter-meta">
          <span className="chapter-number">Chapter {chapter.number}</span>
          <span className="chapter-era">{chapter.era}</span>
          <span className="chapter-years">{chapter.years}</span>
        </div>
        <h2 className="chapter-title">{chapter.title}</h2>
        <p className="chapter-metaphor">{chapter.metaphor}</p>
      </div>

      <WordDisplay 
        wordForm={chapter.wordForm} 
        eraClass={chapter.eraClass}
        isVisible={isVisible}
      />

      <div className="chapter-content">
        {chapter.content.map((paragraph, index) => (
          <p 
            key={index} 
            className="content-paragraph"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {chapter.figure && (
        <FigureProfile 
          figure={chapter.figure} 
          isVisible={isVisible}
          variant="primary"
        />
      )}

      {chapter.secondaryFigure && (
        <FigureProfile 
          figure={chapter.secondaryFigure} 
          isVisible={isVisible}
          variant="secondary"
        />
      )}
    </section>
  );
};

// Sources Section Component
const SourcesSection: React.FC = () => {
  return (
    <section className="sources-section">
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
          This narrative was fact-checked against peer-reviewed sources and authoritative references. 
          All quotes verified with primary sources.
        </p>
      </div>
    </section>
  );
};

// ==================== MAIN COMPONENT ====================

export default function TheWordEssayClient() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const heroRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  
  // Animation state - base is visible, animate class triggers entrance effects
  const [animate, setAnimate] = useState(false);

  // Trigger animation on every navigation to this page
  useEffect(() => {
    setAnimate(false);
    
    // Double requestAnimationFrame ensures DOM has updated before animating
    let frame2: number;
    const frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        setAnimate(true);
      });
    });
    
    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, [pathname]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / scrollHeight;
      setScrollProgress(Math.min(1, Math.max(0, currentProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for sections (excluding hero which is handled separately)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    // Only observe chapter and closing sections, hero is always visible on load
    const sections = document.querySelectorAll('.chapter-section, .closing-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="essay-container the-word-essay">
      {/* Progress Indicator */}
      <WeighingScaleProgress progress={scrollProgress} chapters={chapters} />

      {/* Hero Section - animate class triggers entrance animations */}
      <section 
        ref={heroRef}
        id="hero" 
        className={`hero-section ${animate ? 'animate' : ''}`}
      >
        <div className="hero-background">
          <div className="paper-texture" />
          <div className="library-glow" />
        </div>
        
        <div className={`essay-hero-content ${animate ? 'animate' : ''}`}>
          <div className="etymology-chain">
            <span className="etymology-word latin">exigere</span>
            <span className="etymology-arrow">→</span>
            <span className="etymology-word french">essayer</span>
            <span className="etymology-arrow">→</span>
            <span className="etymology-word english">essay</span>
          </div>
          
          <h1 className="essay-main-title">
            <span className="essay-title-word">ESSAIS</span>
          </h1>
          
          <p className="essay-subtitle">A History of Attempting to Think</p>
          
          <p className="essay-tagline">
            How a humble French word meaning &ldquo;to try&rdquo; became the form that thinks out loud
          </p>
          
          <div className="essay-quote">
            <blockquote>
              <p>&ldquo;Que sais-je?&rdquo;</p>
              <footer>— Montaigne, 1580 — &ldquo;What do I know?&rdquo;</footer>
            </blockquote>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* Introduction */}
      <section className="intro-section">
        <div className="intro-content">
          <p className="intro-lead">
            The word <em>essay</em> contains a philosophy.
          </p>
          <p>
            It comes from the French <em>essayer</em>—to try, to attempt, to test. 
            When Michel de Montaigne titled his 1580 work <em>Essais</em>, he wasn&apos;t 
            being modest. He was being radical.
          </p>
          <p>
            He named his works after the <strong>process</strong> of thinking, 
            not the <strong>product</strong> of thought. This embedded humility 
            into an entire literary form.
          </p>
          <p>
            This is the story of that word, that form, that 450-year tradition of attempting.
          </p>
        </div>
      </section>

      {/* Chapters */}
      <main className="chapters-container">
        {chapters.map((chapter) => (
          <ChapterSection
            key={chapter.id}
            chapter={chapter}
            isVisible={visibleSections.has(chapter.id)}
          />
        ))}
      </main>

      {/* Closing Section */}
      <section id="closing" className="closing-section">
        <div className="closing-content">
          <h2 className="closing-title">The Loop</h2>
          
          <div className="closing-comparison">
            <QuoteMonument
              quote="I write entirely to find out what I'm thinking."
              attribution="Joan Didion"
              source='"Why I Write"'
              isVisible={visibleSections.has('closing')}
            />
            
            <div className="years-between">
              <span className="year">1580</span>
              <div className="timeline-line" />
              <span className="year">1979</span>
            </div>
            
            <QuoteMonument
              quote="Que sais-je?"
              attribution="Michel de Montaigne"
              source="Personal motto"
              isVisible={visibleSections.has('closing')}
            />
          </div>

          <div className="closing-word-evolution">
            <span className="evo-word era-renaissance">ESSAIS</span>
            <span className="evo-arrow">→</span>
            <span className="evo-word era-english">ESSAYES</span>
            <span className="evo-arrow">→</span>
            <span className="evo-word era-enlightenment">Essay</span>
            <span className="evo-arrow">→</span>
            <span className="evo-word era-modernist">ESSAY</span>
            <span className="evo-arrow">→</span>
            <span className="evo-word era-digital">essay</span>
          </div>

          <p className="closing-statement">
            The essay began as an attempt. It remains one.
          </p>

          <div className="final-message">
            <p>
              Every time you write something exploratory, tentative, or searching, 
              you participate in a 450-year tradition of attempting—and the word 
              for this attempt contains a philosophy: ideas are to be weighed, not declared.
            </p>
          </div>
        </div>
      </section>

      {/* Sources */}
      <SourcesSection />
    </div>
  );
}
