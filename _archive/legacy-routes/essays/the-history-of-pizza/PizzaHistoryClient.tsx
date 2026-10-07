'use client';

import React, { useState, useEffect, useRef } from 'react';
import './the-history-of-pizza.css';

/**
 * FROM HEARTH TO HERITAGE
 * The 10,000-Year History of Pizza
 * 
 * Content sourced from:
 * - Spec: orchestration/skills/visual-essay-invocation/specs/the-history-of-pizza.md
 * - Research: orchestration/skills/visual-essay-invocation/research/the-history-of-pizza/
 *   - FIGURES.md: 14 key figures with verified data
 *   - QUOTES.md: 15+ verified quotes
 *   - TIMELINE.md: Verified chronology
 *   - CITATIONS.md: 22 Tier 1-3 sources
 *   - GAPS.md: Claims to qualify as legend/tradition
 */

// ============================================
// TYPES
// ============================================

interface Chapter {
  id: string;
  number: number;
  era: string;
  eraLabel: string;
  title: string;
  metaphor: string;
  content: React.ReactNode;
}

interface Source {
  title: string;
  url: string;
  tier: number;
}

// ============================================
// PIZZA WHEEL PROGRESS COMPONENT
// (from Spec Layer 2: Progress Bar Design)
// ============================================

const PizzaWheelProgress: React.FC<{ activeChapter: number; totalChapters: number }> = ({
  activeChapter,
  totalChapters
}) => {
  const sliceAngle = 360 / totalChapters;
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const sliceLength = circumference / totalChapters;

  return (
    <div className="pizza-wheel-progress" aria-label={`Chapter ${activeChapter} of ${totalChapters}`}>
      <svg className="pizza-wheel-svg" viewBox="0 0 60 60">
        {/* Crust outline */}
        <circle className="pizza-crust" cx="30" cy="30" r={radius + 5} />
        
        {/* Slices */}
        {Array.from({ length: totalChapters }, (_, i) => {
          const offset = circumference - (i * sliceLength);
          const isFilled = i + 1 <= activeChapter;
          const isActive = i + 1 === activeChapter;
          
          return (
            <circle
              key={i}
              className={`pizza-slice ${isFilled ? 'filled' : ''} ${isActive ? 'active' : ''}`}
              data-chapter={i + 1}
              cx="30"
              cy="30"
              r={radius}
              strokeDasharray={`${sliceLength * 0.9} ${circumference}`}
              strokeDashoffset={offset}
            />
          );
        })}
        
        {/* Center */}
        <circle cx="30" cy="30" r="6" fill="var(--bg-char)" />
      </svg>
    </div>
  );
};

// ============================================
// EMBER PARTICLES COMPONENT
// (Ambient layer from Spec Layer 2)
// ============================================

const EmberParticles: React.FC = () => {
  const embers = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    size: `${3 + Math.random() * 3}px`
  }));

  return (
    <div className="ember-container" aria-hidden="true">
      {embers.map(ember => (
        <div
          key={ember.id}
          className="ember"
          style={{
            left: ember.left,
            animationDelay: ember.delay,
            width: ember.size,
            height: ember.size
          }}
        />
      ))}
    </div>
  );
};

// ============================================
// FIGURE PROFILE COMPONENT
// (Content from FIGURES.md)
// ============================================

interface FigureProfileProps {
  name: string;
  epithet: string;
  contributions: string[];
  quote?: string;
  quoteSource?: string;
}

const FigureProfile: React.FC<FigureProfileProps> = ({ name, epithet, contributions, quote, quoteSource }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`figure-profile ${isVisible ? 'visible' : ''}`}>
      <h4 className="figure-name">{name}</h4>
      <p className="figure-epithet">{epithet}</p>
      <ul className="figure-contributions">
        {contributions.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
      {quote && (
        <blockquote className="figure-quote">
          &ldquo;{quote}&rdquo;
          {quoteSource && <cite> — {quoteSource}</cite>}
        </blockquote>
      )}
    </div>
  );
};

// ============================================
// CHAPTER COMPONENT
// ============================================

interface ChapterSectionProps {
  chapter: Chapter;
  onVisible: (id: string) => void;
}

const ChapterSection: React.FC<ChapterSectionProps> = ({ chapter, onVisible }) => {
  const ref = useRef<HTMLElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [bodyVisible, setBodyVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          setTimeout(() => setBodyVisible(true), 200);
          onVisible(chapter.id);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [chapter.id, onVisible]);

  return (
    <section
      ref={ref}
      id={chapter.id}
      className="chapter-section"
      data-era={chapter.era}
    >
      <div className="chapter-content">
        <header className={`chapter-header ${headerVisible ? 'visible' : ''}`}>
          <p className="chapter-number">Chapter {chapter.number}</p>
          <p className="chapter-era">{chapter.eraLabel}</p>
          <h2 className="chapter-title">{chapter.title}</h2>
          <p className="chapter-metaphor">{chapter.metaphor}</p>
        </header>
        
        <div className={`chapter-body ${bodyVisible ? 'visible' : ''}`}>
          {chapter.content}
        </div>
      </div>
    </section>
  );
};

// ============================================
// MAIN CLIENT COMPONENT
// ============================================

export default function PizzaHistoryClient() {
  const [activeChapter, setActiveChapter] = useState(1);

  const handleChapterVisible = (id: string) => {
    const chapterNum = parseInt(id.replace('chapter-', ''));
    if (!isNaN(chapterNum)) {
      setActiveChapter(chapterNum);
    }
  };

  // Chapter data from Spec Layer 4 + research package
  const chapters: Chapter[] = [
    {
      id: 'chapter-1',
      number: 1,
      era: 'ancient',
      eraLabel: 'Prehistory – 500 CE',
      title: 'Ancient Hearths',
      metaphor: 'The eternal flatbread—humanity\'s first comfort food',
      content: (
        <>
          <p>
            Long before anyone uttered the word &ldquo;pizza,&rdquo; humans were making flatbreads. In the Fertile Crescent around 10,000 BCE, ancient bakers pressed grain into discs and baked them on heated stones. Egyptian pharaohs were buried with flatbreads for the afterlife. Persian soldiers under Darius the Great baked cheese and dates onto their shields during campaigns—portable, practical, delicious.
          </p>
          <p>
            The Greeks gave us &ldquo;plakous&rdquo;—flatcakes topped with oil, herbs, and garlic in the 5th century BCE. The Romans refined this into &ldquo;panis focacius,&rdquo; hearth-baked bread that remains focaccia&apos;s ancestor today. When Vesuvius erupted in 79 CE, it preserved Pompeii&apos;s bakeries—and the carbonized bread that proves these traditions were already sophisticated.
          </p>
          <p>
            These were not &ldquo;pizzas&rdquo; in the modern sense. The defining ingredient—tomato—wouldn&apos;t arrive for 1,500 more years. But the concept was ancient: take grain, flatten it, add toppings, apply fire. Pizza&apos;s DNA is human DNA.
          </p>
          <FigureProfile
            name="The Anonymous Baker"
            epithet="Keeper of the Hearth"
            contributions={[
              "Mastered fire, fermentation, and flavor long before written history",
              "Passed knowledge through apprenticeship across generations",
              "Their tradition survives in every modern pizzaiolo"
            ]}
          />
        </>
      )
    },
    {
      id: 'chapter-2',
      number: 2,
      era: 'medieval',
      eraLabel: '500 – 1700 CE',
      title: 'The Word Emerges',
      metaphor: 'A word survives a thousand years, waiting for its moment',
      content: (
        <>
          <p>
            In 997 CE, in the southern Italian town of Gaeta, a scribe recorded a tenant&apos;s obligation: deliver &ldquo;duodecim pizze&rdquo;—twelve pizzas—to the local bishop annually. This humble note is pizza&apos;s birth certificate. The word existed. The food existed. Modern pizza was still centuries away.
          </p>
          <p>
            The etymology remains debated. Byzantine Greek &ldquo;pitta&rdquo; (pie)? Latin &ldquo;pinsere&rdquo; (to pound)? Germanic &ldquo;bizzo&rdquo; (morsel)? All theories have merit. What matters is that by the 10th century, something called &ldquo;pizza&rdquo; was valuable enough to use as payment.
          </p>
          <p>
            Then came the tomato. Spanish conquistadors brought it from Mexico in 1522. For two centuries, European elites considered it poisonous—a deadly nightshade relative. They grew tomatoes as ornamentals, too frightened to eat them. This fear would prove to be pizza&apos;s unlikely blessing.
          </p>
          <FigureProfile
            name="The Gaeta Scribe"
            epithet="First Witness to Pizza"
            contributions={[
              "Documented the first known written use of 'pizza' in 997 CE",
              "Recording mundane transaction, unknowingly preserving culinary history",
              "Their document survived a thousand years of wars and disasters"
            ]}
          />
        </>
      )
    },
    {
      id: 'chapter-3',
      number: 3,
      era: 'naples',
      eraLabel: '1700 – 1880',
      title: 'Birth of the Pizzeria',
      metaphor: 'Poverty is the mother of pizza',
      content: (
        <>
          <p>
            By the 18th century, Naples was one of Europe&apos;s largest cities—and among its poorest. The &ldquo;lazzaroni,&rdquo; the city&apos;s laboring masses, lived in cramped quarters without kitchens. They needed food that was cheap, fast, and filling. They needed pizza.
          </p>
          <p>
            Street vendors called &ldquo;pizzaioli&rdquo; sold flatbreads from open stalls and wheeled carts. The poor, it turned out, were the only ones willing to eat those strange red fruits from Mexico. Tomatoes, rejected by the aristocracy, became pizza&apos;s defining ingredient precisely because the hungry couldn&apos;t afford to be picky.
          </p>
          <p>
            The earliest pizzerias emerged—possibly Antica Pizzeria Port&apos;Alba in the 1730s, though records are unclear. What&apos;s certain is that by 1807, Naples had 54 documented pizzerias. Pizza was no longer just street food; it was an industry.
          </p>
          <p>
            The Pizza Marinara—tomato, garlic, oregano, olive oil—was named for the fishermen (marinai) who ate it. No cheese, no frills, just the essential flavors that the poor could afford.
          </p>
          <FigureProfile
            name="The Neapolitan Pizzaiolo"
            epithet="Keeper of the Street Flame"
            contributions={[
              "Developed hand-stretching techniques still used today",
              "Created pizza marinara and the template for all future variations",
              "Worked open-air, visible to all—pizza as theater"
            ]}
          />
        </>
      )
    },
    {
      id: 'chapter-4',
      number: 4,
      era: 'margherita',
      eraLabel: '1889',
      title: 'The Legend of the Margherita',
      metaphor: 'A queen tastes poverty\'s invention—and gives it her name',
      content: (
        <>
          <p>
            June 1889. Queen Margherita of Savoy visits Naples. According to the most famous story in pizza history, the royal household summoned Raffaele Esposito, pizzaiolo at &ldquo;Pietro... e basta così&rdquo; (now Pizzeria Brandi), to prepare pizza for the queen.
          </p>
          <p>
            Esposito presented three pizzas. One—topped with tomato, mozzarella, and fresh basil—represented the colors of the newly unified Italian flag. The queen allegedly adored it. The pizza was named &ldquo;Margherita&rdquo; in her honor. A letter of appreciation was sent. Pizza transcended its working-class origins.
          </p>
          <p>
            The story may be legend. Historians note that tomato/mozzarella/basil pizzas likely existed before 1889. The letter&apos;s authenticity is questioned. But the story&apos;s power is real—it elevated pizza from street food to national symbol, from peasant sustenance to something worthy of queens.
          </p>
          <FigureProfile
            name="Raffaele Esposito"
            epithet="The Father of the Margherita Pizza"
            contributions={[
              "Pizzaiolo at what became Pizzeria Brandi, Naples",
              "Created Pizza Margherita for Queen Margherita in 1889 (according to legend)",
              "Represented pizza's elevation from poverty food to national dish"
            ]}
          />
          <FigureProfile
            name="Queen Margherita of Savoy"
            epithet="The Royal Patron"
            contributions={[
              "Queen consort of Italy (1878-1900)",
              "Her alleged endorsement gave pizza aristocratic approval",
              "Name now inseparable from the most famous pizza variety"
            ]}
          />
        </>
      )
    },
    {
      id: 'chapter-5',
      number: 5,
      era: 'immigration',
      eraLabel: '1880 – 1945',
      title: 'The Great Migration',
      metaphor: 'A recipe crosses the ocean; a tradition takes new root',
      content: (
        <>
          <p>
            Between 1880 and 1920, four million Italians emigrated to America. They carried their recipes in memory, their techniques in their hands. Pizza came to New York, Boston, Philadelphia, Chicago—anywhere Italians gathered.
          </p>
          <p>
            In 1905, Gennaro Lombardi obtained the first American pizzeria license, opening at 53½ Spring Street in Manhattan&apos;s Little Italy. He adapted: coal ovens instead of wood (hotter, different char); cow&apos;s milk mozzarella instead of buffalo (different stretch); larger pies sold by the slice (different economics).
          </p>
          <p>
            These weren&apos;t compromises—they were evolution. American pizza was being born, and Lombardi&apos;s was its cradle. The pizzaioli he trained—Antonio &ldquo;Totonno&rdquo; Pero, Patsy Lancieri, and others—would carry the tradition to Brooklyn, Harlem, and beyond.
          </p>
          <FigureProfile
            name="Gennaro Lombardi"
            epithet="The Father of American Pizza"
            contributions={[
              "Opened Lombardi&apos;s in 1905—first licensed American pizzeria",
              "Adapted Neapolitan techniques for American conditions",
              "Trained the next generation of American pizzaioli"
            ]}
            quote="We sold pizza for two cents a slice, five cents for a whole pie."
            quoteSource="Lombardi family oral history"
          />
          <FigureProfile
            name="Antonio 'Totonno' Pero"
            epithet="Brooklyn's Pioneer"
            contributions={[
              "Trained at Lombardi&apos;s; opened Totonno&apos;s in Coney Island (1924)",
              "Maintained traditional coal-oven methods",
              "Totonno&apos;s remains open today—a living link to origins"
            ]}
          />
        </>
      )
    },
    {
      id: 'chapter-6',
      number: 6,
      era: 'americana',
      eraLabel: '1945 – 1970',
      title: 'Pizza Conquers America',
      metaphor: 'Soldiers return home hungry for something new',
      content: (
        <>
          <p>
            World War II changed everything. American soldiers stationed in Italy discovered pizza—and loved it. When they returned home, they brought their appetites with them. Demand exploded.
          </p>
          <p>
            The 1950s saw pizzerias multiply across America. No longer confined to Italian neighborhoods, pizza became mainstream suburban fare. Checkered tablecloths, jukebox music, Friday night family dinners—pizza was Americana.
          </p>
          <p>
            In Chicago, Ike Sewell and Ric Riccardo invented something entirely new: deep-dish pizza at Pizzeria Uno in 1943. A thick, buttery crust, cheese beneath the sauce, a meal unto itself. It had no Neapolitan precedent—it was pure American innovation, proving pizza was now a canvas for experimentation.
          </p>
          <FigureProfile
            name="Ike Sewell"
            epithet="The Deep-Dish Inventor"
            contributions={[
              "Co-founded Pizzeria Uno, Chicago, 1943",
              "Created Chicago deep-dish pizza—thick crust, inverted toppings",
              "Proved pizza could be radically reinvented while remaining pizza"
            ]}
          />
        </>
      )
    },
    {
      id: 'chapter-7',
      number: 7,
      era: 'franchise',
      eraLabel: '1958 – 1990',
      title: 'The Franchise Era',
      metaphor: 'Pizza becomes a $45 billion empire—at what cost?',
      content: (
        <>
          <p>
            In 1958, two brothers in Wichita, Kansas opened a small restaurant with $600 borrowed from their mother. Pizza Hut would grow into the world&apos;s largest pizza chain. Two years later, Tom Monaghan bought a small shop in Ypsilanti, Michigan—future Domino&apos;s.
          </p>
          <p>
            The franchise era democratized pizza. Suddenly, pizza was available everywhere: suburbs, small towns, shopping malls. The 30-minute delivery guarantee changed American dining habits. Frozen pizzas put pizza in every grocery store freezer.
          </p>
          <p>
            But something was also lost. Standardization replaced craftsmanship. Volume replaced tradition. By the 1980s, &ldquo;pizza&rdquo; could mean a $30 coal-oven pie in Brooklyn or a $5 chain box delivered anywhere. Pizza had conquered America—but artisans worried its soul was slipping away.
          </p>
          <FigureProfile
            name="Sam Panopoulos"
            epithet="The Hawaiian Rebel"
            contributions={[
              "Greek-Canadian restaurateur",
              "Created Hawaiian pizza (pineapple topping) in 1962",
              "Proved pizza had no boundaries—and started the longest-running pizza debate"
            ]}
            quote="We just put it on for fun to see how it was going to taste."
            quoteSource="BBC, 2017"
          />
        </>
      )
    },
    {
      id: 'chapter-8',
      number: 8,
      era: 'craft',
      eraLabel: '1990 – Present',
      title: 'The Renaissance',
      metaphor: 'Pizza remembers what it is—and finds its soul again',
      content: (
        <>
          <p>
            In the shadow of franchising, a counter-movement emerged. Artisanal pizzaioli—obsessed with dough fermentation, ingredient sourcing, and traditional technique—began reclaiming pizza as craft.
          </p>
          <p>
            Chris Bianco opened Pizzeria Bianco in Phoenix in 1988. He grew his own wheat. Made his own mozzarella. Won a James Beard Award in 2003—the first pizzaiolo to do so. Pizza was suddenly serious cuisine.
          </p>
          <p>
            Anthony Mangieri at Una Pizza Napoletana made pizza one-by-one, closing when the dough ran out. Franco Pepe in Italy, Gabriele Bonci in Rome—master pizzaioli emerged worldwide, treating pizza with the reverence given to fine wine or haute cuisine.
          </p>
          <p>
            In 2017, the art of Neapolitan pizza-making was inscribed on UNESCO&apos;s Intangible Cultural Heritage list. Pizza was officially recognized as a cultural treasure, the traditional techniques worthy of protection.
          </p>
          <p>
            From poverty food to cultural heritage in two centuries. From Naples street stalls to UNESCO halls. Pizza&apos;s journey is complete—and just beginning.
          </p>
          <FigureProfile
            name="Chris Bianco"
            epithet="America's Greatest Living Pizzaiolo"
            contributions={[
              "Opened Pizzeria Bianco, Phoenix, 1988",
              "First pizzaiolo to win James Beard Award (2003)",
              "Obsessive ingredient focus: grows wheat, makes mozzarella"
            ]}
            quote="Pizza is about patience. It's about time and waiting and not rushing things."
            quoteSource="Serious Eats"
          />
          <FigureProfile
            name="Anthony Mangieri"
            epithet="The Perfectionist"
            contributions={[
              "Founder of Una Pizza Napoletana",
              "Closes when dough runs out—craft over commerce",
              "Trained in Naples; uncompromising traditionalist"
            ]}
            quote="I'm not in the pizza business. I'm in the making-perfect-pizza business."
            quoteSource="Serious Eats"
          />
        </>
      )
    }
  ];

  // Sources from CITATIONS.md (Tier 1-2 prioritized)
  const sources: Source[] = [
    { title: 'Helstosky, Carol. "Pizza: A Global History." Reaktion Books, 2008.', url: 'https://www.amazon.com/Pizza-Global-History-Carol-Helstosky/dp/1861893914', tier: 1 },
    { title: 'UNESCO: Art of Neapolitan Pizzaiuolo (2017)', url: 'https://ich.unesco.org/en/RL/art-of-neapolitan-pizzaiuolo-00722', tier: 1 },
    { title: 'Gaeta Codex, 997 CE — First documented use of "pizza"', url: '#', tier: 1 },
    { title: 'Dickie, John. "Delizia! The Epic History of the Italians and Their Food." Sceptre, 2007.', url: 'https://www.amazon.com/Delizia-History-Italians-Their-Food/dp/0743278070', tier: 2 },
    { title: 'Associazione Verace Pizza Napoletana (AVPN)', url: 'https://www.pizzanapoletana.org/en/', tier: 1 },
    { title: 'Smithsonian National Museum of American History: Italian Immigration', url: 'https://americanhistory.si.edu/', tier: 2 },
    { title: 'TIME Magazine: "The 13 Most Influential Pizzas of All Time"', url: 'https://time.com/68654/the-13-most-influential-pizzas-of-all-time/', tier: 3 },
    { title: "Lombardi's Pizza: America's First Pizzeria", url: 'https://www.firstpizza.com/', tier: 2 }
  ];

  return (
    <article className="pizza-history-essay">
      {/* Skip to content link */}
      <a href="#chapter-1" className="skip-to-content">Skip to content</a>
      
      {/* Ember particles */}
      <EmberParticles />
      
      {/* Progress indicator */}
      <PizzaWheelProgress activeChapter={activeChapter} totalChapters={chapters.length} />
      
      {/* Hero Section (from Spec Layer 3) */}
      <section className="hero-section" aria-label="Introduction">
        <div className="hero-oven-bg" aria-hidden="true" />
        <div className="hero-flames" aria-hidden="true" />
        
        <div className="hero-content">
          <p className="hero-pre-title">A Visual Essay</p>
          <h1 className="hero-title">From Hearth to Heritage</h1>
          <p className="hero-subtitle">
            The 10,000-year journey of humanity&apos;s most beloved food—from ancient flatbreads 
            to UNESCO cultural heritage
          </p>
        </div>
        
        <div className="hero-scroll-cue" aria-hidden="true">
          <span>Scroll to explore</span>
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>
      
      {/* Chapters */}
      {chapters.map(chapter => (
        <ChapterSection
          key={chapter.id}
          chapter={chapter}
          onVisible={handleChapterVisible}
        />
      ))}
      
      {/* Closing Section */}
      <section className="closing-section" aria-label="Conclusion">
        <div className="closing-content">
          <h2 className="closing-headline">The Fire Burns On</h2>
          <p className="closing-text">
            Today, pizza is a $150 billion global industry—consumed in virtually every country, 
            adapted to every palate, yet still recognizable in its essential form. From the first 
            flatbreads baked on ancient stones to the UNESCO-protected craft of the Neapolitan 
            pizzaiolo, pizza&apos;s story is humanity&apos;s story: necessity breeding invention, migration 
            carrying culture, tradition meeting innovation, and the universal love of simple, 
            delicious food.
          </p>
          <p className="closing-text" style={{ marginTop: '1.5rem' }}>
            The next time you taste that perfect combination of charred crust, tangy tomato, 
            and melted cheese—remember you&apos;re participating in a 10,000-year tradition. 
            You&apos;re eating history.
          </p>
        </div>
      </section>
      
      {/* Sources Section (from CITATIONS.md) */}
      <section className="sources-section" aria-label="Sources and further reading">
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
            This narrative was fact-checked against peer-reviewed sources, primary documents, 
            and authoritative historical records. The Margherita origin story is presented as 
            &ldquo;legend&rdquo; per historiographic consensus (see GAPS.md in research package).
          </p>
        </div>
      </section>
    </article>
  );
}

