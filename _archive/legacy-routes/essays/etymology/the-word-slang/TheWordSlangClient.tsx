'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import './the-word-slang.css';

// ==================== TYPES ====================

interface Chapter {
  id: string;
  title: string;
  era: EraKey;
  letter?: string;
}

interface TimelineEntry {
  year: string;
  event: string;
  significance?: string;
  era: EraKey;
}

interface KeyFigure {
  id: string;
  name: string;
  years: string;
  role: string;
  contribution: string;
  quote?: string;
  imageUrl?: string;
  imageAlt?: string;
}

type EraKey = 'georgian' | 'victorian' | 'jazz' | 'midcentury' | 'hiphop' | 'digital';

// ==================== DATA ====================

const chapters: Chapter[] = [
  { id: 'title', title: 'Title', era: 'georgian' },
  { id: 'the-spark', title: 'The Spark', era: 'georgian', letter: 'S' },
  { id: 'birth-certificate', title: 'Birth Certificate', era: 'georgian', letter: 'SL' },
  { id: 'the-mystery', title: 'The Mystery', era: 'victorian', letter: 'SLA' },
  { id: 'social-life', title: 'Social Life', era: 'victorian', letter: 'SLAN' },
  { id: 'american-timeline', title: 'America\'s Timeline', era: 'jazz', letter: 'SLANG' },
  { id: 'global-spread', title: 'Global Spread', era: 'midcentury' },
  { id: 'gatekeepers', title: 'Gatekeepers & Champions', era: 'victorian' },
  { id: 'slang-today', title: 'Slang Today', era: 'digital' },
  { id: 'closing', title: 'Language Belongs to the People', era: 'digital' },
  { id: 'timeline', title: 'Timeline', era: 'digital' },
  { id: 'sources', title: 'Sources', era: 'digital' },
];

const timeline: TimelineEntry[] = [
  { year: '1566', event: 'Thomas Harman publishes first English cant glossary', significance: 'Pre-slang: "cant" and "pedlars French" name criminal language', era: 'georgian' },
  { year: '1698', event: 'B.E. Gentleman\'s "New Dictionary of the Canting Crew"', significance: 'Expands underworld vocabulary documentation', era: 'georgian' },
  { year: '1741', event: 'Earliest verb usage: "slanging the gentry mort"', significance: 'Criminal deception scheme described at Tyburn execution', era: 'georgian' },
  { year: '1756', event: 'First noun attestation in Toldervy\'s novel', significance: '"knew the slang well" — earliest confirmed written use', era: 'georgian' },
  { year: '1785', event: 'Grose\'s "Classical Dictionary of the Vulgar Tongue"', significance: 'First major slang dictionary; scholarly yet subversive', era: 'georgian' },
  { year: '1801', event: 'OED attests "slang" for any professional jargon', significance: 'Semantic expansion beyond criminal vocabulary', era: 'victorian' },
  { year: '1818', event: '"Slang" attested for informal language generally', significance: 'Modern broad meaning emerges', era: 'victorian' },
  { year: '1859', event: 'Hotten\'s "Slang Dictionary" published', significance: 'First etymological treatment of slang words', era: 'victorian' },
  { year: '1860s', event: 'Isaac Taylor proposes Scandinavian etymology', significance: '"Narrow strip of land" theory—still leading hypothesis', era: 'victorian' },
  { year: '1911', event: 'Bradley\'s Britannica definition', significance: '"Conscious offence against propriety" — canonical Victorian view', era: 'victorian' },
  { year: '1919', event: 'Mencken\'s "The American Language"', significance: 'Rehabilitates slang as creative, respectable innovation', era: 'jazz' },
  { year: '1937', event: 'Partridge\'s "Dictionary of Slang"', significance: 'Standard 20th-century reference work', era: 'jazz' },
  { year: '1950s', event: 'Beat generation coins "cool," "hip," "square"', significance: 'Slang becomes countercultural badge', era: 'midcentury' },
  { year: '1960s', event: 'Sociolinguistics emerges as discipline', significance: 'Academic study of informal language begins', era: 'midcentury' },
  { year: '1980s', event: 'Hip-hop creates rapid vocabulary innovation', significance: 'AAVE influences mainstream American English', era: 'hiphop' },
  { year: '1996', event: 'Eble\'s "Slang and Sociability"', significance: 'Reframes slang as identity and solidarity marker', era: 'hiphop' },
  { year: '1999', event: 'Urban Dictionary founded', significance: 'Crowdsourced lexicography democratizes definition', era: 'digital' },
  { year: '2010', event: 'Green\'s Dictionary of Slang published', significance: '125,000+ entries, largest slang dictionary ever', era: 'digital' },
  { year: '2016', event: 'Liberman claims etymology "is known"', significance: 'Advocates Scandinavian origin; OED remains unconvinced', era: 'digital' },
  { year: '2019', event: 'McCulloch\'s "Because Internet"', significance: 'Documents how digital communication creates new informal language', era: 'digital' },
  { year: '2020s', event: 'TikTok accelerates slang evolution', significance: 'Digital virality creates and spreads new vocabulary', era: 'digital' },
];

const keyFigures: KeyFigure[] = [
  {
    id: 'grose',
    name: 'Francis Grose',
    years: '1731–1791',
    role: 'The First Major Lexicographer',
    contribution: 'Published "A Classical Dictionary of the Vulgar Tongue" (1785), deliberately parodying Samuel Johnson\'s august Dictionary by applying the same scholarly methods to disreputable vocabulary.',
    quote: 'SLANG: Cant language.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Captain_Francisa_Grose%2C_FSA.jpg',
    imageAlt: 'Portrait of Captain Francis Grose'
  },
  {
    id: 'hotten',
    name: 'John Camden Hotten',
    years: '1832–1873',
    role: 'The Etymologist',
    contribution: 'Published "The Slang Dictionary" (1859), the first attempt to trace etymologies of slang words—putting "slang" in a book title for the first time.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/John_Camden_Hotten.png/440px-John_Camden_Hotten.png',
    imageAlt: 'John Camden Hotten'
  },
  {
    id: 'whitman',
    name: 'Walt Whitman',
    years: '1819–1892',
    role: 'The Poetic Defender',
    contribution: 'Defended slang as democratic expression in "Slang in America" (1885), arguing that living language comes from the people, not from academies.',
    quote: 'Slang... is the lawless germinal element, below all words and sentences, and behind all poetry.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Walt_Whitman_-_George_Collins_Cox.jpg',
    imageAlt: 'Walt Whitman portrait by George Collins Cox'
  },
  {
    id: 'mencken',
    name: 'H.L. Mencken',
    years: '1880–1956',
    role: 'The American Champion',
    contribution: 'Published "The American Language" (1919), rehabilitating American English and its slang as legitimate linguistic innovation, not colonial degradation.',
    quote: 'Slang in its origin is nearly always respectable; it is devised not by the stupid populace, but by individuals of wit and ingenuity.',
    imageUrl: 'https://tile.loc.gov/storage-services/service/pnp/van/5a52000/5a52400/5a52407r.jpg',
    imageAlt: 'H.L. Mencken by Carl Van Vechten'
  },
  {
    id: 'partridge',
    name: 'Eric Partridge',
    years: '1894–1979',
    role: 'The 20th-Century Authority',
    contribution: 'Published "A Dictionary of Slang and Unconventional English" (1937), the standard reference for decades, treating slang with scholarly rigor and obvious delight.',
    quote: 'Slang is language at play.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/0/09/Eric_Partridge.jpg',
    imageAlt: 'Eric Partridge'
  },
  {
    id: 'green',
    name: 'Jonathon Green',
    years: '1948–present',
    role: 'The Contemporary Authority',
    contribution: 'Published "Green\'s Dictionary of Slang" (2010), the largest English slang dictionary ever compiled with 125,000+ headwords spanning 500 years.',
    quote: 'Slang is the poetry of everyday life.',
    imageAlt: 'Jonathon Green'
  },
  {
    id: 'mcculloch',
    name: 'Gretchen McCulloch',
    years: '1988–present',
    role: 'The Internet Linguist',
    contribution: 'Published "Because Internet" (2019), documenting how digital communication creates new forms of informal language and changes how we write.',
    quote: 'The internet didn\'t create new types of informal language... it made informal writing normal.',
    imageAlt: 'Gretchen McCulloch'
  }
];

const slangLifecycle = [
  { stage: 'Birth', description: 'Coined in small group', example: '"rizz" (2021)', color: '#22c55e' },
  { stage: 'Cool', description: 'Spreads to in-groups', example: '"vibe" (1960s→)', color: '#3b82f6' },
  { stage: 'Peak', description: 'Mainstream adoption', example: '"cool" (1950s→)', color: '#8b5cf6' },
  { stage: 'Cringe', description: 'Overuse by outsiders', example: '"on fleek" (2014→2016)', color: '#f97316' },
  { stage: 'Fossil', description: 'Dated or dead', example: '"groovy" (1960s→1980s)', color: '#6b7280' },
];

// ==================== DICTIONARY PROGRESS COMPONENT ====================

function DictionaryProgress({ progress }: { progress: number }) {
  const letters = ['S', 'L', 'A', 'N', 'G'];
  const visibleLetters = Math.ceil(progress * 5);
  
  return (
    <div className="dictionary-progress">
      <div className="dictionary-progress-page">
        <div className="dictionary-progress-word">
          {letters.map((letter, i) => (
            <span 
              key={i} 
              className={`dictionary-letter ${i < visibleLetters ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="dictionary-progress-bar">
          <div 
            className="dictionary-progress-fill" 
            style={{ width: `${progress * 100}%` }} 
          />
        </div>
      </div>
    </div>
  );
}

// ==================== FIGURE CARD COMPONENT ====================

function FigureCard({ figure }: { figure: KeyFigure }) {
  return (
    <div className="figure-card">
      <div className="figure-card-image">
        {figure.imageUrl ? (
          <img src={figure.imageUrl} alt={figure.imageAlt || figure.name} loading="lazy" />
        ) : (
          <div className="figure-card-placeholder">
            <span>{figure.name.split(' ').map(n => n[0]).join('')}</span>
          </div>
        )}
      </div>
      <div className="figure-card-content">
        <h3 className="figure-card-name">{figure.name}</h3>
        <div className="figure-card-years">{figure.years}</div>
        <div className="figure-card-role">{figure.role}</div>
        <p className="figure-card-contribution">{figure.contribution}</p>
        {figure.quote && (
          <blockquote className="figure-card-quote">
            &ldquo;{figure.quote}&rdquo;
          </blockquote>
        )}
      </div>
    </div>
  );
}

// ==================== SLANG LIFECYCLE COMPONENT ====================

function SlangLifecycle() {
  return (
    <div className="lifecycle-diagram">
      <div className="lifecycle-track">
        {slangLifecycle.map((stage, i) => (
          <div key={i} className="lifecycle-stage">
            <div 
              className="lifecycle-node" 
              style={{ backgroundColor: stage.color }}
            />
            <div className="lifecycle-label">
              <strong>{stage.stage}</strong>
              <span className="lifecycle-description">{stage.description}</span>
              <span className="lifecycle-example">{stage.example}</span>
            </div>
          </div>
        ))}
        <div className="lifecycle-line" />
      </div>
    </div>
  );
}

// ==================== ETYMOLOGY THEORIES COMPONENT ====================

function EtymologyTheories() {
  const theories = [
    { 
      name: 'Scandinavian Origin', 
      confidence: 3, 
      description: 'From Norwegian "slengja" (to sling) or "slengjenamn" (nickname)', 
      status: 'Leading hypothesis' 
    },
    { 
      name: 'Romani Origin', 
      confidence: 2, 
      description: 'Connected to Romani vocabulary through criminal cant networks', 
      status: 'Speculative' 
    },
    { 
      name: 'Internal Cant Coinage', 
      confidence: 2, 
      description: 'Self-referential term invented within underworld communities', 
      status: 'Speculative' 
    },
    { 
      name: 'Sling + Language', 
      confidence: 1, 
      description: 'Folk etymology combining "sling" and "language"', 
      status: 'Unlikely' 
  },
];

  return (
    <div className="etymology-theories">
      {theories.map((theory, i) => (
        <div key={i} className="theory-card">
          <div className="theory-header">
            <span className="theory-name">{theory.name}</span>
            <span className="theory-confidence">
              {'★'.repeat(theory.confidence)}{'☆'.repeat(3 - theory.confidence)}
            </span>
          </div>
          <p className="theory-description">{theory.description}</p>
          <span className="theory-status">{theory.status}</span>
        </div>
      ))}
    </div>
  );
}

// ==================== GLOBAL SPREAD MAP COMPONENT ====================

function GlobalSpreadMap() {
  const regions = [
    { name: 'UK', examples: ['bloody', 'cheeky', 'knackered', 'gobsmacked'], x: 48, y: 25 },
    { name: 'USA', examples: ['cool', 'awesome', 'dude', 'bro'], x: 22, y: 35 },
    { name: 'Australia', examples: ['arvo', 'brekkie', 'servo', 'sickie'], x: 82, y: 75 },
    { name: 'Ireland', examples: ['craic', 'grand', 'eejit', 'gobshite'], x: 45, y: 23 },
    { name: 'South Africa', examples: ['lekker', 'bru', 'howzit', 'eish'], x: 55, y: 72 },
    { name: 'Jamaica', examples: ['irie', 'bumbaclot', 'ting', 'yute'], x: 26, y: 45 },
  ];
  
  return (
    <div className="global-spread-map">
      <div className="map-container">
        {regions.map((region, i) => (
          <div 
            key={i} 
            className="map-region"
            style={{ left: `${region.x}%`, top: `${region.y}%` }}
          >
            <div className="map-dot" />
            <div className="map-tooltip">
              <strong>{region.name}</strong>
              <div className="map-examples">
                {region.examples.map((ex, j) => (
                  <span key={j} className="map-example">{ex}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== MAIN COMPONENT ====================

export default function TheWordSlangClient() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentEra, setCurrentEra] = useState<EraKey>('georgian');
  const [activeChapter, setActiveChapter] = useState('title');
  const [progressWord, setProgressWord] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);

    // Find active chapter
    for (let i = chapters.length - 1; i >= 0; i--) {
      const chapter = chapters[i];
      const element = document.getElementById(chapter.id);
      if (element) {
        const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
          setActiveChapter(chapter.id);
          setCurrentEra(chapter.era);
          if (chapter.letter) {
            setProgressWord(chapter.letter);
            }
            break;
          }
        }
      }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className={`slang-essay era-${currentEra}`} ref={contentRef}>
      {/* Dictionary Progress Indicator */}
      <DictionaryProgress progress={scrollProgress} />

      {/* Navigation */}
      <nav className="slang-nav">
        <Link href="/essays" className="slang-nav-back">
          ← Essays
        </Link>
        <div className="slang-nav-chapters">
          {chapters.slice(1, -2).map((chapter) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              className={`slang-nav-link ${activeChapter === chapter.id ? 'active' : ''}`}
            >
              {chapter.title}
            </a>
          ))}
        </div>
      </nav>

      {/* ==================== TITLE ==================== */}
      <section id="title" className="slang-section slang-hero">
        <div className="slang-hero-content">
          <div className="slang-hero-label">Etymology</div>
          <h1 className="slang-hero-title">SLANG</h1>
          <p className="slang-hero-subtitle">The Word That Named the Unnameable</p>
          <div className="slang-hero-meta">
            <span>First attested 1756</span>
            <span className="slang-hero-dot">•</span>
            <span>Origin unknown</span>
          </div>
        </div>
        <div className="slang-scroll-cue">
          <span>Scroll to explore</span>
          <div className="slang-scroll-arrow">↓</div>
        </div>
      </section>

      {/* ==================== CHAPTER A: THE SPARK ==================== */}
      <section id="the-spark" className="slang-section slang-spark">
        <div className="slang-section-inner">
          <div className="slang-chapter-marker">Chapter A</div>
          <h2 className="slang-section-title">The Spark</h2>
          <p className="slang-section-subtitle">What &ldquo;Slang&rdquo; Feels Like</p>
          
          <div className="slang-spark-grid">
            <div className="slang-spark-examples">
              <div className="slang-example-card">
                <span className="slang-era-tag">1920s</span>
                <span className="slang-word">&ldquo;bee&apos;s knees&rdquo;</span>
              </div>
              <div className="slang-example-card">
                <span className="slang-era-tag">1950s</span>
                <span className="slang-word">&ldquo;cool&rdquo;</span>
              </div>
              <div className="slang-example-card">
                <span className="slang-era-tag">1980s</span>
                <span className="slang-word">&ldquo;dope&rdquo;</span>
              </div>
              <div className="slang-example-card">
                <span className="slang-era-tag">2020s</span>
                <span className="slang-word">&ldquo;no cap&rdquo;</span>
              </div>
            </div>
          </div>

          <div className="slang-narrative">
            <p className="slang-lede">
              You know slang when you hear it. It carries a charge—of belonging, of rebellion, 
              of in-group knowledge. It&apos;s the vocabulary that doesn&apos;t appear in school books 
              but fills every schoolyard.
            </p>
            <p>
              Slang is <em>not</em> dialect (regional speech), jargon (professional vocabulary), 
              or profanity (though it often overlaps). Slang is specifically vocabulary that 
              marks social identity and currency—words that say &ldquo;I belong here&rdquo; as much 
              as they mean anything at all.
            </p>
            <p>
              But here&apos;s the question: where did the <em>word</em> &ldquo;slang&rdquo; itself come from? 
              To name something is to have power over it. Who first named this phenomenon—and 
              what were they trying to contain?
            </p>
          </div>
        </div>
      </section>

      {/* ==================== CHAPTER B: BIRTH CERTIFICATE ==================== */}
      <section id="birth-certificate" className="slang-section slang-birth">
        <div className="slang-section-inner">
          <div className="slang-chapter-marker">Chapter B</div>
          <h2 className="slang-section-title">Birth Certificate</h2>
          <p className="slang-section-subtitle">First Sightings in Print</p>

          <div className="slang-attestation-block">
            <div className="slang-attestation-year">1756</div>
            <blockquote className="slang-attestation-quote">
              <p>
                &ldquo;Thomas Throw had been upon the town, <mark>knew the slang well</mark>; had 
                often sate a flasher at M——d——g——n&apos;s, and understood every word in the
                scoundrel&apos;s dictionary.&rdquo;
              </p>
              <cite>
                —William Toldervy, <em>The History of Two Orphans</em>, 1756
              </cite>
            </blockquote>
          </div>

          <div className="slang-narrative">
            <p>
              The year 1756 marks the earliest confirmed written use of &ldquo;slang&rdquo; as a noun. 
              Toldervy&apos;s novel describes a character who &ldquo;knew the slang well&rdquo;—meaning 
              he understood the criminal vocabulary, the secret language of the London underworld.
            </p>
            <p>
              But words live in speech long before they appear in print. Fifteen years earlier, 
              in 1741, an account of the pickpocket Mary Young (alias Jenny Diver) at Tyburn execution 
              used <em>slang</em> as a verb: &ldquo;slanging the gentry mort rumly with a sham kinchin&rdquo;—describing 
              an elaborate deception scheme.
            </p>
            <p>
              The word was already in circulation, already useful, already marking the boundary
              between those who belonged and those who did not.
            </p>
          </div>

          <figure className="slang-figure">
                <div className="slang-figure-image">
                  <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d0/William_Hogarth_-_Gin_Lane.jpg"
                alt="Gin Lane by William Hogarth, 1751"
                    loading="lazy"
                  />
                </div>
                <figcaption>
              The world where &ldquo;slang&rdquo; was born: Georgian London&apos;s underworld. 
              William Hogarth, &ldquo;Gin Lane,&rdquo; 1751. Public Domain.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ==================== CHAPTER C: THE MYSTERY ==================== */}
      <section id="the-mystery" className="slang-section slang-mystery">
        <div className="slang-section-inner">
          <div className="slang-chapter-marker">Chapter C</div>
          <h2 className="slang-section-title">The Mystery</h2>
          <p className="slang-section-subtitle">Where the Word Came From</p>
          
          <div className="slang-dictionary-entry-box">
            <div className="slang-dict-word">slang</div>
            <div className="slang-dict-pronunciation">/slaŋ/</div>
            <div className="slang-dict-pos">noun</div>
            <div className="slang-dict-origin">
                <strong>Origin:</strong> unknown
            </div>
          </div>

          <div className="slang-narrative">
            <p className="slang-emphasis">
              Here is the paradox at the heart of this etymology: the word &ldquo;slang&rdquo;—which 
              names vocabulary of marginal, obscure, uncertain origin—is itself of marginal, 
              obscure, uncertain origin.
            </p>
          </div>

          <EtymologyTheories />

          <div className="slang-narrative">
            <p>
              In 2016, etymologist Anatoly Liberman declared confidently that the origin &ldquo;is known.&rdquo; 
              The OED, reviewing the same evidence, politely disagreed. The mystery endures.
            </p>
            <p className="slang-emphasis">
              The word performs what it names: it arrived from the margins, its papers never quite
              in order, and it has never fully disclosed its origins.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== CHAPTER D: SOCIAL LIFE ==================== */}
      <section id="social-life" className="slang-section slang-social">
        <div className="slang-section-inner">
          <div className="slang-chapter-marker">Chapter D</div>
          <h2 className="slang-section-title">The Social Life of Slang</h2>
          <p className="slang-section-subtitle">Why It Exists</p>

          <div className="slang-narrative">
            <p className="slang-lede">
              Every slang word is born for a reason. And every slang word eventually dies. 
              Understanding why reveals what slang actually <em>does</em>.
            </p>
          </div>

          <div className="slang-functions-grid">
            <div className="slang-function-card">
              <div className="slang-function-icon">🔐</div>
              <h4>Secrecy</h4>
              <p>From thieves&apos; cant to teen texting—keeping outsiders out</p>
          </div>
            <div className="slang-function-card">
              <div className="slang-function-icon">🤝</div>
              <h4>Identity</h4>
              <p>&ldquo;We speak this way; they don&apos;t&rdquo;—marking belonging</p>
            </div>
            <div className="slang-function-card">
              <div className="slang-function-icon">⚡</div>
              <h4>Rebellion</h4>
              <p>Rejecting &ldquo;proper&rdquo; language, asserting autonomy</p>
        </div>
            <div className="slang-function-card">
              <div className="slang-function-icon">✨</div>
              <h4>Freshness</h4>
              <p>Novelty, economy, expressiveness—saying more with less</p>
            </div>
          </div>

          <h3 className="slang-subsection-title">The Lifecycle of a Slang Word</h3>
          <SlangLifecycle />

          <blockquote className="slang-blockquote">
            <p>&ldquo;Slang is language at play.&rdquo;</p>
            <cite>— Eric Partridge, 1933</cite>
          </blockquote>
          </div>
      </section>

      {/* ==================== CHAPTER E: AMERICAN TIMELINE ==================== */}
      <section id="american-timeline" className="slang-section slang-america">
        <div className="slang-section-inner">
          <div className="slang-chapter-marker">Chapter E</div>
          <h2 className="slang-section-title">America&apos;s Timeline</h2>
          <p className="slang-section-subtitle">From Cant to Cool</p>
          
          <div className="slang-era-timeline">
            <div className="slang-era-card era-jazz">
              <div className="slang-era-decade">1920s</div>
              <div className="slang-era-name">Jazz Age</div>
              <div className="slang-era-examples">
                <span>bee&apos;s knees</span>
                <span>cat&apos;s meow</span>
                <span>hooch</span>
                <span>speakeasy</span>
                </div>
            </div>
            <div className="slang-era-card era-beat">
              <div className="slang-era-decade">1950s</div>
              <div className="slang-era-name">Beat Generation</div>
              <div className="slang-era-examples">
                <span>cool</span>
                <span>hip</span>
                <span>square</span>
                <span>dig</span>
              </div>
            </div>
            <div className="slang-era-card era-hippie">
              <div className="slang-era-decade">1960s</div>
              <div className="slang-era-name">Counterculture</div>
              <div className="slang-era-examples">
                <span>groovy</span>
                <span>far out</span>
                <span>uptight</span>
                <span>trip</span>
          </div>
          </div>
            <div className="slang-era-card era-hiphop">
              <div className="slang-era-decade">1980s</div>
              <div className="slang-era-name">Hip-Hop</div>
              <div className="slang-era-examples">
                <span>dope</span>
                <span>fresh</span>
                <span>fly</span>
                <span>dis</span>
        </div>
            </div>
            <div className="slang-era-card era-internet">
              <div className="slang-era-decade">2000s</div>
              <div className="slang-era-name">Internet</div>
              <div className="slang-era-examples">
                <span>LOL</span>
                <span>epic</span>
                <span>fail</span>
                <span>noob</span>
              </div>
            </div>
            <div className="slang-era-card era-tiktok">
              <div className="slang-era-decade">2020s</div>
              <div className="slang-era-name">TikTok</div>
              <div className="slang-era-examples">
                <span>rizz</span>
                <span>bussin&apos;</span>
                <span>no cap</span>
                <span>slay</span>
              </div>
            </div>
          </div>

          <blockquote className="slang-blockquote slang-mencken-quote">
            <p>
              &ldquo;Slang in its origin is nearly always respectable; it is devised not by the 
              stupid populace, but by individuals of wit and ingenuity.&rdquo;
            </p>
            <cite>— H.L. Mencken, <em>The American Language</em>, 1919</cite>
          </blockquote>
        </div>
      </section>

      {/* ==================== CHAPTER F: GLOBAL SPREAD ==================== */}
      <section id="global-spread" className="slang-section slang-global">
        <div className="slang-section-inner">
          <div className="slang-chapter-marker">Chapter F</div>
          <h2 className="slang-section-title">Global Spread</h2>
          <p className="slang-section-subtitle">English Slang Around the World</p>
          
          <GlobalSpreadMap />

          <div className="slang-narrative">
            <p>
              English slang has diversified across continents. Australian English coined 
              <em> arvo</em> (afternoon), <em>brekkie</em> (breakfast), and <em>servo</em> (service station). 
              British slang gave us <em>cheeky</em>, <em>knackered</em>, and <em>gobsmacked</em>. 
              South African English blends Afrikaans (<em>lekker</em>) with local innovation.
            </p>
            <p>
              The same word can mean entirely different things: American &ldquo;pants&rdquo; vs. British 
              &ldquo;pants&rdquo; (trousers vs. underwear). What&apos;s casual in one dialect can be shocking 
              in another.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== CHAPTER G: GATEKEEPERS ==================== */}
      <section id="gatekeepers" className="slang-section slang-gatekeepers">
        <div className="slang-section-inner">
          <div className="slang-chapter-marker">Chapter G</div>
          <h2 className="slang-section-title">Gatekeepers &amp; Champions</h2>
          <p className="slang-section-subtitle">Who Documented Slang</p>

          <div className="slang-narrative">
            <p>
              For centuries, &ldquo;proper&rdquo; lexicographers ignored slang or condemned it. 
              The people who documented it were rebels themselves—antiquaries, journalists, 
              poets, and linguists who believed everyday speech deserved scholarly attention.
            </p>
          </div>

          <div className="slang-figures-gallery">
            {keyFigures.map((figure) => (
              <FigureCard key={figure.id} figure={figure} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CHAPTER H: SLANG TODAY ==================== */}
      <section id="slang-today" className="slang-section slang-digital">
        <div className="slang-section-inner">
          <div className="slang-chapter-marker">Chapter H</div>
          <h2 className="slang-section-title">Slang Today</h2>
          <p className="slang-section-subtitle">The Internet as a Slang Engine</p>

          <div className="slang-digital-mockup">
            <div className="slang-search-bar">
              <span className="slang-search-icon">🔍</span>
              <span className="slang-search-text">Define...</span>
            </div>
            <div className="slang-definition-card">
              <div className="slang-def-word">slang</div>
              <div className="slang-def-votes">
                <span className="slang-upvote">▲ 42,847</span>
                <span className="slang-downvote">▼ 1,203</span>
              </div>
              <div className="slang-def-text">
                Words that exist to confuse your parents and make you feel old.
              </div>
              <div className="slang-def-example">
                &ldquo;I don&apos;t understand any of this slang anymore&rdquo;
              </div>
            </div>
          </div>

          <div className="slang-narrative">
            <p>
              In 1999, Urban Dictionary appeared, promising definitions &ldquo;written by you.&rdquo; 
              The democratic impulse Mencken championed had found its ultimate expression: 
              anyone could define slang, anyone could vote on meanings.
            </p>
            <p>
              By the 2020s, TikTok accelerated slang evolution to unprecedented speed. Words 
              like <em>rizz</em>, <em>bussin&apos;</em>, and <em>no cap</em> traveled from niche 
              usage to mainstream awareness in weeks rather than decades.
            </p>
          </div>

          <blockquote className="slang-blockquote">
            <p>
              &ldquo;The internet didn&apos;t create new types of informal language... 
              it made informal writing normal.&rdquo;
            </p>
            <cite>— Gretchen McCulloch, <em>Because Internet</em>, 2019</cite>
          </blockquote>
        </div>
      </section>

      {/* ==================== CHAPTER I: CLOSING ==================== */}
      <section id="closing" className="slang-section slang-closing">
        <div className="slang-section-inner">
          <div className="slang-closing-content">
            <p className="slang-closing-lead">
              To trace the word <em>slang</em> is to trace the contested boundary between 
              proper speech and everything that threatens it.
            </p>
            <p>
              From Toldervy&apos;s 1756 novel to today&apos;s crowdsourced definitions, the word 
              has named the outside, the excluded, the improper—even as that boundary 
              constantly shifts.
            </p>
            <p>
              The word performs what it describes: uncertain origin, marginal beginnings, 
              gradual legitimization. Like the vocabulary it names, <em>slang</em> arrived 
              from somewhere we cannot quite pin down.
            </p>
            <p className="slang-closing-final">
              And like language itself, it refuses to hold still.
            </p>
          </div>

          <blockquote className="slang-blockquote slang-closing-quote">
            <p>&ldquo;Slang is the poetry of everyday life.&rdquo;</p>
            <cite>— Jonathon Green</cite>
          </blockquote>
        </div>
      </section>

      {/* ==================== TIMELINE ==================== */}
      <section id="timeline" className="slang-section slang-timeline-section">
        <div className="slang-section-inner">
          <h2 className="slang-section-title">Timeline</h2>
          <div className="slang-timeline">
            {timeline.map((entry, index) => (
              <div key={index} className={`slang-timeline-entry era-${entry.era}`}>
                <div className="slang-timeline-year">{entry.year}</div>
                <div className="slang-timeline-content">
                  <div className="slang-timeline-event">{entry.event}</div>
                  {entry.significance && (
                    <div className="slang-timeline-significance">{entry.significance}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SOURCES ==================== */}
      <section id="sources" className="slang-section slang-sources-section">
        <div className="slang-section-inner">
          <h2 className="slang-section-title">Sources</h2>

          <div className="slang-sources-grid">
            <div className="slang-source-category">
              <h3>Primary Sources</h3>
              <ul>
                <li>
                  <a href="https://www.oed.com" target="_blank" rel="noopener noreferrer">
                    Oxford English Dictionary
                  </a>, &ldquo;slang, n.³&rdquo; and etymology notes
                </li>
                <li>
                  <a href="https://greensdictofslang.com" target="_blank" rel="noopener noreferrer">
                    Green&apos;s Dictionary of Slang
                  </a>, Jonathon Green (2010)
                </li>
                <li>
                  <a href="https://www.etymonline.com/word/slang" target="_blank" rel="noopener noreferrer">
                    Online Etymology Dictionary
                  </a>
                </li>
              </ul>
            </div>

            <div className="slang-source-category">
              <h3>Historical Dictionaries</h3>
              <ul>
                <li>Francis Grose, <em>A Classical Dictionary of the Vulgar Tongue</em> (1785)</li>
                <li>John Camden Hotten, <em>The Slang Dictionary</em> (1859)</li>
                <li>Eric Partridge, <em>A Dictionary of Slang and Unconventional English</em> (1937)</li>
              </ul>
            </div>

            <div className="slang-source-category">
              <h3>Scholarly Works</h3>
              <ul>
                <li>Julie Coleman, <em>The Life of Slang</em> (2012)</li>
                <li>H.L. Mencken, <em>The American Language</em> (1919)</li>
                <li>Gretchen McCulloch, <em>Because Internet</em> (2019)</li>
                <li>Connie Eble, <em>Slang and Sociability</em> (1996)</li>
                <li>Michael Adams, <em>Slang: The People&apos;s Poetry</em> (2009)</li>
              </ul>
            </div>

            <div className="slang-source-category">
              <h3>Images</h3>
              <ul>
                <li>William Hogarth, &ldquo;Gin Lane&rdquo; (1751) — Wikimedia Commons</li>
                <li>Francis Grose portrait — Yale Center for British Art</li>
                <li>H.L. Mencken — Library of Congress</li>
                <li>Walt Whitman — Library of Congress</li>
              </ul>
            </div>
          </div>

          <div className="slang-sources-note">
            <p>
              <strong>Note on Etymology:</strong> This essay presents the current scholarly
              consensus that the etymology of &ldquo;slang&rdquo; remains uncertain. The Scandinavian 
              theory is the leading hypothesis but has not been definitively proven.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="slang-footer">
        <div className="slang-footer-content">
          <div className="slang-footer-nav">
            <Link href="/essays" className="slang-footer-link">← All Essays</Link>
            <Link href="/essays/etymology" className="slang-footer-link">Etymology Essays</Link>
          </div>
          <div className="slang-footer-meta">
            <p>A visual etymology essay by Esy</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
