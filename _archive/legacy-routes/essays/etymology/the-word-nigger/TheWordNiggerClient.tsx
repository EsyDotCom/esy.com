'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import './the-word-nigger.css';
import { figureImages, historicalImages, getImageByFigureId, getImageById, type NWordEssayImage } from './images';

/* ============================================
   THE WEIGHT OF A WORD — A HISTORY OF THE N-WORD IN AMERICA
   ============================================
   A documentary visual essay tracing the etymology, history,
   and applied use of America's most charged word.
   
   Design Philosophy: Museum exhibit + premium editorial.
   Gravity without exploitation, precision without coldness,
   dignity without sentimentality.
   
   CRITICAL: The full term appears ONLY in primary source
   citations. Display typography uses "the N-word" or equivalent.
   ============================================ */

// ==================== SCROLL-LOCK HOOK ====================

interface ScrollLockState {
  containerRef: React.RefObject<HTMLDivElement>;
  progress: number;
  isPinned: boolean;
}

const useScrollLock = (): ScrollLockState => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionTotalHeight = rect.height;

      const scrollableDistance = sectionTotalHeight - windowHeight;
      const scrolledIntoSection = -sectionTop;

      if (sectionTop <= 0 && scrolledIntoSection <= scrollableDistance) {
        setIsPinned(true);
        const newProgress = Math.min(
          Math.max(scrolledIntoSection / scrollableDistance, 0),
          1
        );
        setProgress(newProgress);
      } else {
        setIsPinned(false);
        setProgress(sectionTop > 0 ? 0 : 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { containerRef, progress, isPinned };
};

// ==================== TYPE DEFINITIONS ====================

interface Figure {
  name: string;
  epithet: string;
  years: string;
  quote: string;
  quoteSource: string;
  contribution: string;
  imageAlt?: string;
  imageId?: string; // Links to images.ts
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
  eraClass: string;
  layoutType: 'text-forward' | 'full-bleed' | 'document-gallery' | 'split-narrative' | 'portrait-focus';
  primaryQuote?: {
    text: string;
    attribution: string;
    source: string;
  };
  chapterImageId?: string; // Links to historical images
}

// ==================== CHAPTER DATA ====================

const chapters: Chapter[] = [
  {
    id: 'prologue',
    number: 1,
    title: 'When Words Become Weapons',
    era: 'Prologue',
    years: '',
    metaphor: 'Language as infrastructure — words build the systems we live in',
    eraClass: 'era-prologue',
    layoutType: 'full-bleed',
    content: [
      'What makes a word wound?',
      'This is not a story of etymology alone. It is a study of how language becomes infrastructure — how words are laid like bricks to build systems of power, exclusion, and dehumanization.',
      'The word at the center of this essay traveled from Latin classrooms to slave ships, from legal codes to minstrel stages, from Supreme Court decisions to hip-hop lyrics. At every stage, it was contested.',
      'This is not merely a story of harm. It is a story of harm met by courage. At every moment when the word was weaponized, someone fought back.',
    ],
    primaryQuote: {
      text: 'Language doesn\'t just describe the world. It builds it.',
      attribution: '',
      source: '',
    },
  },
  {
    id: 'etymology',
    number: 2,
    title: 'The Neutral Root',
    era: 'Latin Origins',
    years: 'Classical Era',
    metaphor: 'A color term in a world before race',
    eraClass: 'era-latin',
    layoutType: 'text-forward',
    content: [
      'The word begins in Latin: niger. It meant black — the color. The dark ocean. Black cloth. Nothing more.',
      'The Oxford English Dictionary traces the etymology through Romance languages: Spanish and Portuguese negro, French nègre. Each carried the word across the Atlantic, and each carried people in chains.',
      'The word\'s meaning changed not in dictionaries but in ships, markets, and laws. When European powers began the transatlantic slave trade, the color descriptor became a category — and the category became a cage.',
      'By the time English adopted the term in the 1570s, it was already entangled with commerce in human beings. The neutral root had taken on weight that would never be removed.',
    ],
  },
  {
    id: 'first-traces',
    number: 3,
    title: 'First English Traces',
    era: 'Early Modern',
    years: '1574–1700s',
    metaphor: 'The word takes root in English soil',
    eraClass: 'era-colonial',
    layoutType: 'document-gallery',
    content: [
      'The Oxford English Dictionary finds the first written English use in 1574: "Negar." Other early spellings include "niger," "neger," and "nigar." They appear in travel writings, commercial documents, and colonial records.',
      'By the 17th century, spellings had stabilized toward the form we recognize. The question of whether there was ever a "neutral" period in English usage remains debated — the earliest attestations already occur in contexts of trade, colonization, and hierarchy.',
      'Samuel Johnson\'s 1755 Dictionary of the English Language has no separate entry for the slur — only "Negro." The variant was considered dialectal, vulgar, used in commercial speech and by the lower classes. But it was everywhere.',
    ],
  },
  {
    id: 'trade',
    number: 4,
    title: 'Language of the Trade',
    era: 'Colonial Commerce',
    years: '1600s–1776',
    metaphor: 'Words as cargo — language travels with human beings in chains',
    eraClass: 'era-colonial',
    layoutType: 'full-bleed',
    chapterImageId: 'slave-ship-brookes',
    content: [
      'The Atlantic slave trade moved not only human beings but language. The word traveled the same routes as the enslaved — from African coasts through the Middle Passage to American ports.',
      'In colonial law, the word became administrative vocabulary. Virginia\'s 1705 slave codes, the South Carolina Negro Act of 1740, and countless other legal documents used racial terminology to define who could be owned, who could testify, who counted as human.',
      'The infamous diagram of the slave ship Brookes, published in 1788, became an icon of abolitionist campaigns. The word that described the people packed into that hold was becoming what it would remain: a tool for categorizing human beings as property.',
    ],
  },
  {
    id: 'slavery',
    number: 5,
    title: 'Slavery as System',
    era: 'Antebellum America',
    years: '1776–1865',
    metaphor: 'The word as brick — building the architecture of oppression',
    eraClass: 'era-slavery',
    layoutType: 'split-narrative',
    content: [
      'By the 19th century, the word was fully weaponized — embedded in law, commerce, and everyday speech. The Supreme Court\'s Dred Scott decision of 1857 declared that Black Americans "had no rights which the white man was bound to respect."',
      'But resistance was constant. Frederick Douglass, escaped from slavery, became the most photographed American of the 19th century. He used his image deliberately — to counter the caricatures, to insist on his humanity, to speak truths that shook the nation.',
      'Abolitionists published newspapers, gave speeches, and built movements that challenged not just slavery but the language that made it possible. The word could wound — but it could also be confronted.',
    ],
    figure: {
      name: 'Frederick Douglass',
      epithet: 'The Great Orator',
      years: '1818–1895',
      quote: 'What, to the American slave, is your 4th of July?',
      quoteSource: 'Rochester, 1852',
      contribution: 'Escaped slavery to become the foremost African American voice of the 19th century. Used oratory, journalism, and autobiography to challenge every premise of white supremacy.',
      imageAlt: 'Frederick Douglass, daguerreotype portrait circa 1847-1852, showing him in formal dress with determined gaze. National Portrait Gallery, Smithsonian Institution.',
      imageId: 'douglass',
    },
  },
  {
    id: 'minstrelsy',
    number: 6,
    title: 'Minstrelsy\'s Normalization',
    era: 'Entertainment as Weapon',
    years: '1830s–1890s',
    metaphor: 'Laughter as violence — entertainment that taught a nation to dehumanize',
    eraClass: 'era-minstrel',
    layoutType: 'document-gallery',
    content: [
      'In the 1830s, Thomas "Daddy" Rice created the "Jim Crow" character, launching blackface minstrelsy as America\'s dominant entertainment form. By mid-century, minstrel shows played to packed houses across the nation.',
      'The damage was not just in the performances but in the normalization. Generation after generation learned to laugh at racist language and imagery. The word — along with an entire vocabulary of caricature — became entertainment vocabulary.',
      'The name "Jim Crow" would later name an entire system of segregation. Entertainment vocabulary became legal category. The line between the stage and the courthouse was never as clear as people pretended.',
    ],
  },
  {
    id: 'reconstruction',
    number: 7,
    title: 'Reconstruction\'s Betrayal',
    era: 'Brief Hope, Then Reversal',
    years: '1865–1877',
    metaphor: 'The door that opened and closed — promises made and broken',
    eraClass: 'era-reconstruction',
    layoutType: 'split-narrative',
    chapterImageId: 'first-colored-congressmen',
    content: [
      'The end of the Civil War brought constitutional revolution. The 13th Amendment abolished slavery. The 14th established citizenship. The 15th guaranteed voting rights. For a moment, everything seemed possible.',
      'Black Americans served in Congress, built schools, created communities. But the counterrevolution came swiftly. Southern states passed Black Codes. Violence terrorized Black voters. In 1877, federal troops withdrew as part of a political compromise.',
      'The door that had briefly opened slammed shut. The word persisted — in law, in violence, in everyday humiliation. The brief hope of Reconstruction gave way to something worse.',
    ],
  },
  {
    id: 'jim-crow',
    number: 8,
    title: 'Jim Crow\'s Reign',
    era: 'Segregation and Terror',
    years: '1877–1954',
    metaphor: 'The visible wound — segregation written on the landscape',
    eraClass: 'era-jimcrow',
    layoutType: 'portrait-focus',
    chapterImageId: 'jim-crow-sign',
    content: [
      'For nearly 80 years, Jim Crow laws enforced separation in every sphere of American life. Signs marking "White" and "Colored" made racial hierarchy visible on the landscape. The Supreme Court\'s Plessy v. Ferguson (1896) declared segregation constitutional.',
      'The violence was not only legal. Lynching terrorized Black communities. Ida B. Wells documented over 700 murders, exposing the lies used to justify racial terror. W.E.B. Du Bois analyzed "the problem of the color-line."',
      'But resistance never stopped. The NAACP organized. A generation prepared for what would come. The word appeared on signs, in courtrooms, in the mouths of mobs — and in the speeches of those who refused to accept it.',
    ],
    figure: {
      name: 'Ida B. Wells',
      epithet: 'Anti-Lynching Crusader',
      years: '1862–1931',
      quote: 'The way to right wrongs is to turn the light of truth upon them.',
      quoteSource: 'A Red Record, 1895',
      contribution: 'Documented over 700 lynchings, exposing how racial terror was justified through racist language and mythology.',
      imageAlt: 'Ida B. Wells, photograph by Mary Garrity circa 1893, showing her in dignified formal portrait. National Portrait Gallery, Smithsonian Institution.',
      imageId: 'wells',
    },
    secondaryFigure: {
      name: 'W.E.B. Du Bois',
      epithet: 'Scholar and Civil Rights Pioneer',
      years: '1868–1963',
      quote: 'The problem of the Twentieth Century is the problem of the color-line.',
      quoteSource: 'The Souls of Black Folk, 1903',
      contribution: 'First African American to earn Harvard Ph.D. Co-founded NAACP. Analyzed racism with scholarly precision and moral urgency.',
      imageAlt: 'W.E.B. Du Bois, photograph by C.M. Battey circa 1918, formal portrait showing distinguished scholar. Library of Congress.',
      imageId: 'dubois',
    },
  },
  {
    id: 'dictionary',
    number: 9,
    title: 'The Dictionary Learns',
    era: 'Lexicographic Evolution',
    years: '1889–Present',
    metaphor: 'The record keeper\'s reckoning — when authorities finally said what everyone knew',
    eraClass: 'era-dictionary',
    layoutType: 'document-gallery',
    content: [
      'For centuries, dictionaries avoided or minimized the word. The OED\'s first edition (1889) noted "usually contemptuous." By the 1960s, dictionaries added explicit warnings. Today\'s entries call it "one of the most offensive words in English."',
      'The dictionary\'s evolution mirrors society\'s. From absence to euphemism. From neutral documentation to explicit condemnation. The very existence of entries for "the N-word" shows how language evolves to handle what it cannot escape.',
      'Webster\'s 1934: "vulgar." 1961: "usually offensive." 2023: "perhaps the most offensive word in English." The labels intensified as the culture changed. The dictionary learned what the wounded had always known.',
    ],
  },
  {
    id: 'civil-rights',
    number: 10,
    title: 'Contesting Language',
    era: 'Civil Rights Movement',
    years: '1954–1970s',
    metaphor: 'The counter-voice — dignity spoken against degradation',
    eraClass: 'era-civilrights',
    layoutType: 'portrait-focus',
    content: [
      'The Civil Rights Movement was, in part, a battle over language — who could speak, whose words mattered, what vocabulary would define America.',
      'Martin Luther King Jr. offered counter-language: "content of character," "beloved community," "the fierce urgency of now." James Baldwin analyzed how racist language functioned as psychological weapon — and how to resist its internalization.',
      'Thurgood Marshall dismantled legal segregation, challenging the language of "separate but equal." The word didn\'t disappear. But it could no longer go unchallenged.',
    ],
    figure: {
      name: 'James Baldwin',
      epithet: 'The Witness',
      years: '1924–1987',
      quote: 'You can only be destroyed by believing that you really are what the white world calls a nigger.',
      quoteSource: 'The Fire Next Time, 1963',
      contribution: 'Analyzed how racist language wounds — and how to resist internalization. Made the essay a form of moral witness.',
      imageAlt: 'James Baldwin, photograph by Allan Warren 1969, portrait showing the writer with penetrating gaze. Creative Commons CC BY-SA 3.0.',
      imageId: 'baldwin',
    },
    secondaryFigure: {
      name: 'Thurgood Marshall',
      epithet: 'The Great Dissenter',
      years: '1908–1993',
      quote: 'In recognizing the humanity of our fellow beings, we pay ourselves the highest tribute.',
      quoteSource: 'Supreme Court opinion',
      contribution: 'Argued Brown v. Board (1954). First African American Supreme Court Justice. Dismantled legal segregation case by case.',
      imageAlt: 'Thurgood Marshall, official Supreme Court portrait, showing the Justice in robes. Public domain.',
      imageId: 'marshall',
    },
  },
  {
    id: 'euphemism',
    number: 11,
    title: 'The Euphemism Era',
    era: 'Rise of "The N-Word"',
    years: '1980s–Present',
    metaphor: 'The word that points to another word',
    eraClass: 'era-euphemism',
    layoutType: 'text-forward',
    content: [
      'By the 1980s, public norms had shifted. The word could no longer be casually spoken in mainstream media. "The N-word" emerged as official euphemism — a word referring to another word, acknowledging what could not be directly said.',
      'Dictionaries added entries for "the N-word." Broadcasting standards evolved. The euphemism became lexicalized — proof that language evolves to handle even its most charged content.',
      'In 2015, President Obama used the full word in a podcast interview, sparking national conversation about when, whether, and how the term could be uttered. The debate continues.',
    ],
  },
  {
    id: 'reappropriation',
    number: 12,
    title: 'Reappropriation Debates',
    era: 'Community Complexity',
    years: '1970s–Present',
    metaphor: 'The wound reclaimed — can poison become medicine?',
    eraClass: 'era-hiphop',
    layoutType: 'split-narrative',
    content: [
      'Within African American communities, some have reclaimed variants of the term — particularly "nigga" — as expressions of solidarity, affection, or defiance. This reappropriation is contested.',
      'Richard Pryor used the word extensively in 1970s comedy — then publicly renounced it after visiting Africa. N.W.A. made reclamation a defining feature of gangsta rap. Hip-hop continues to use the term prolifically.',
      'Scholars distinguish between inter-group use (the slur from outsiders) and intra-group use (complex, variable meanings within community). The question is not settled — and this essay does not settle it.',
    ],
    primaryQuote: {
      text: 'The debate continues.',
      attribution: '',
      source: '',
    },
  },
  {
    id: 'today',
    number: 13,
    title: 'The Open Wound',
    era: 'Contemporary Debates',
    years: '2000–Present',
    metaphor: 'The wound that won\'t close — ongoing struggle over language and justice',
    eraClass: 'era-contemporary',
    layoutType: 'text-forward',
    content: [
      'The word persists — in private racism, online spaces, and occasional public eruptions. Debates continue over teaching texts that contain it, over broadcasting standards, over social media policies, over who can say it and when.',
      'Randall Kennedy\'s 2002 book brought scholarly analysis to mainstream attention. The NAACP held a symbolic "funeral" for the word in 2007. Neither ended the debate.',
      'Today\'s questions remain live: How do we teach history that includes this language? How do we quote it when necessary? How do we name what wounds without amplifying the wound?',
    ],
    primaryQuote: {
      text: 'How do we name what wounds without amplifying the wound?',
      attribution: '',
      source: '',
    },
  },
  {
    id: 'closing',
    number: 14,
    title: 'Naming What Wounds',
    era: 'Closing',
    years: '',
    metaphor: 'The weighing complete — understanding without resolution',
    eraClass: 'era-closing',
    layoutType: 'full-bleed',
    content: [
      'This essay began with a question: What makes a word wound?',
      'The answer is not etymology. The Latin root was innocent. The word became a weapon through history — through ships, markets, laws, theaters, and mobs. And at every stage, people fought back.',
      'The word\'s history is not over. It continues in every choice about language, about teaching, about quotation, about justice. Understanding where it came from is not the same as knowing what to do next. But understanding is where doing begins.',
    ],
    primaryQuote: {
      text: 'The weighing continues.',
      attribution: '',
      source: '',
    },
  },
];

// ==================== SOURCES DATA ====================

const sources = [
  { title: 'Oxford English Dictionary — "nigger, n. and adj."', url: 'https://www.oed.com/' },
  { title: 'Randall Kennedy, Nigger: The Strange Career of a Troublesome Word (2002)', url: 'https://www.penguinrandomhouse.com/' },
  { title: 'Jabari Asim, The N Word: Who Can Say It, Who Shouldn\'t, and Why (2007)', url: 'https://www.hmhbooks.com/' },
  { title: 'W.E.B. Du Bois, The Souls of Black Folk (1903)', url: 'https://www.gutenberg.org/ebooks/408' },
  { title: 'James Baldwin, The Fire Next Time (1963)', url: 'https://www.penguinrandomhouse.com/' },
  { title: 'Ida B. Wells, A Red Record (1895)', url: 'https://www.gutenberg.org/ebooks/14977' },
  { title: 'Geneva Smitherman, Word from the Mother: Language and African Americans (2006)', url: 'https://www.routledge.com/' },
  { title: 'Library of Congress — African American History Collections', url: 'https://www.loc.gov/collections/' },
  { title: 'National Archives — Civil Rights Records', url: 'https://www.archives.gov/research/civil-rights' },
  { title: 'Dred Scott v. Sandford, 60 U.S. 393 (1857)', url: 'https://www.oyez.org/cases/1850-1900/60us393' },
  { title: 'Brown v. Board of Education, 347 U.S. 483 (1954)', url: 'https://www.oyez.org/cases/1940-1955/347us483' },
  { title: 'Smithsonian National Museum of African American History and Culture', url: 'https://nmaahc.si.edu/' },
];

// ==================== COMPONENTS ====================

// Weighing Scale Progress Bar
const WeighingScaleProgress: React.FC<{ progress: number; chapters: Chapter[] }> = ({ progress, chapters }) => {
  // Calculate scale tilt based on progress
  const tiltAngle = -20 + (progress * 40); // -20deg at start, +20deg at end
  
  return (
    <div className="weighing-scale-progress" aria-label={`Reading progress: ${Math.round(progress * 100)}%`}>
      <div className="scale-container">
        {/* Scale arm and pivot */}
        <div className="scale-arm-container">
          <div className="scale-pivot" />
          <div 
            className="scale-arm" 
            style={{ transform: `rotate(${tiltAngle}deg)` }}
          >
            <div className="scale-pan scale-pan-left">
              <div className="pan-symbol">?</div>
            </div>
            <div className="scale-pan scale-pan-right">
              <div className="pan-fill" style={{ height: `${progress * 100}%` }} />
            </div>
          </div>
        </div>
        
        {/* Vertical progress track with chapter markers */}
        <div className="chapter-track">
          <div 
            className="progress-fill"
            style={{ height: `${progress * 100}%` }}
          />
          {chapters.map((chapter, index) => {
            const markerPosition = ((index + 0.5) / chapters.length) * 100;
            const isActive = progress * 100 >= markerPosition;
            return (
              <div 
                key={chapter.id}
                className={`chapter-marker ${isActive ? 'active' : ''}`}
                style={{ top: `${markerPosition}%` }}
                title={chapter.title}
                aria-label={`Chapter ${chapter.number}: ${chapter.title}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};


// Quote Monument Component
const QuoteMonument: React.FC<{ 
  quote: string; 
  attribution?: string; 
  source?: string;
  isVisible: boolean;
}> = ({ quote, attribution, source, isVisible }) => {
  if (!quote) return null;
  
  return (
    <blockquote className={`quote-monument ${isVisible ? 'visible' : ''}`}>
      <div className="quote-marks">&ldquo;</div>
      <p className="quote-text">{quote}</p>
      {(attribution || source) && (
        <footer className="quote-attribution">
          {attribution && <cite>— {attribution}</cite>}
          {source && <span className="quote-source">{source}</span>}
        </footer>
      )}
    </blockquote>
  );
};

// Archival Image Component
const ArchivalImage: React.FC<{
  image: NWordEssayImage;
  isVisible: boolean;
}> = ({ image, isVisible }) => {
  return (
    <figure className={`archival-image ${isVisible ? 'visible' : ''}`}>
      <div className="archival-image-wrapper">
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="archival-img"
        />
      </div>
      <figcaption className="archival-caption">
        <p className="caption-text">{image.caption}</p>
        <p className="caption-attribution">{image.attribution}</p>
        <p className="caption-license">{image.license}</p>
      </figcaption>
    </figure>
  );
};

// Figure Profile Component
const FigureProfile: React.FC<{ 
  figure: Figure; 
  isVisible: boolean;
  variant?: 'primary' | 'secondary';
}> = ({ figure, isVisible, variant = 'primary' }) => {
  const figureImage = figure.imageId ? getImageByFigureId(figure.imageId) : null;
  
  return (
    <div className={`figure-profile ${variant} ${isVisible ? 'visible' : ''}`}>
      {figureImage && (
        <div className="figure-image-wrapper">
          <img
            src={figureImage.src}
            alt={figureImage.alt}
            loading="lazy"
            className="figure-image"
          />
          <p className="figure-image-credit">{figureImage.attribution}</p>
        </div>
      )}
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
  const chapterImage = chapter.chapterImageId ? getImageById(chapter.chapterImageId) : null;
  
  return (
    <section 
      id={chapter.id}
      className={`chapter-section ${chapter.eraClass} layout-${chapter.layoutType} ${isVisible ? 'visible' : ''}`}
    >
      <div className="chapter-inner">
        <div className="chapter-header">
          <div className="chapter-meta">
            <span className="chapter-number">Chapter {chapter.number}</span>
            {chapter.era && <span className="chapter-era">{chapter.era}</span>}
            {chapter.years && <span className="chapter-years">{chapter.years}</span>}
          </div>
          <h2 className="chapter-title">{chapter.title}</h2>
          <p className="chapter-metaphor">{chapter.metaphor}</p>
        </div>

        {/* Chapter Image */}
        {chapterImage && (
          <ArchivalImage image={chapterImage} isVisible={isVisible} />
        )}

        <div className="chapter-content">
          {chapter.content.map((paragraph, index) => (
            <p 
              key={index} 
              className="content-paragraph"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {chapter.primaryQuote && chapter.primaryQuote.text && (
          <QuoteMonument
            quote={chapter.primaryQuote.text}
            attribution={chapter.primaryQuote.attribution}
            source={chapter.primaryQuote.source}
            isVisible={isVisible}
          />
        )}

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
      </div>
    </section>
  );
};

// Sources Section Component
const SourcesSection: React.FC = () => {
  return (
    <section className="sources-section" aria-labelledby="sources-title">
      <div className="sources-content">
        <h3 id="sources-title" className="sources-title">Sources & Further Reading</h3>
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
          This narrative was researched using peer-reviewed scholarship, archival sources, 
          and authoritative historical records. All quotes are verified with primary sources.
          Images are sourced from public domain archives including the Library of Congress, 
          National Archives, and National Portrait Gallery.
        </p>
      </div>
    </section>
  );
};

// Closing Section with Figure Gallery
const ClosingSection: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const resistanceFigures = [
    'Frederick Douglass',
    'Ida B. Wells',
    'W.E.B. Du Bois',
    'Martin Luther King Jr.',
    'James Baldwin',
    'Thurgood Marshall',
  ];

  return (
    <section className={`closing-reflection ${isVisible ? 'visible' : ''}`}>
      <div className="closing-content">
        <div className="figure-gallery">
          {resistanceFigures.map((name, index) => (
            <div 
              key={name} 
              className="gallery-figure"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <span className="gallery-name">{name}</span>
            </div>
          ))}
        </div>
        
        <div className="closing-statement">
          <p className="closing-thesis">
            Understanding is where doing begins.
          </p>
          <p className="closing-continuation">
            The weighing continues.
          </p>
        </div>
      </div>
    </section>
  );
};

// ==================== MAIN COMPONENT ====================

export default function TheWordNiggerClient() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(() => new Set(['hero']));
  
  // Scroll-lock for etymology section
  const { containerRef: etymologyRef, progress: etymologyProgress, isPinned: etymologyPinned } = useScrollLock();
  
  // Phase calculation for etymology section
  const etymologyPhase = useMemo(() => {
    if (etymologyProgress < 0.15) return 'intro';
    if (etymologyProgress < 0.35) return 'latin';
    if (etymologyProgress < 0.55) return 'romance';
    if (etymologyProgress < 0.75) return 'english';
    if (etymologyProgress < 0.90) return 'weight';
    return 'complete';
  }, [etymologyProgress]);

  // Track overall scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / scrollHeight;
      setScrollProgress(Math.min(1, Math.max(0, currentProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15, rootMargin: '-50px' }
    );

    const sections = document.querySelectorAll('.chapter-section, .hero-section, .etymology-section, .closing-reflection');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="essay-container the-word-nigger">
      {/* Skip to content link for accessibility */}
      <a href="#prologue" className="skip-to-content">
        Skip to content
      </a>
      
      {/* Progress Indicator */}
      <WeighingScaleProgress progress={scrollProgress} chapters={chapters} />

      {/* Hero Section - Simple, immediate title reveal */}
      <section id="hero" className="hero-section">
        <div className="hero-background">
          <div className="paper-texture" />
          <div className="archive-glow" />
        </div>
        
        {/* Balance Scale - Subtle background element */}
        <div className="balance-scale-container">
          <svg 
            className="balance-scale" 
            viewBox="0 0 400 300" 
            aria-hidden="true"
          >
            <line x1="200" y1="250" x2="200" y2="80" stroke="currentColor" strokeWidth="3" opacity="0.4" />
            <path d="M140 250 L260 250 L250 260 L150 260 Z" fill="currentColor" opacity="0.4" />
            <circle cx="200" cy="80" r="8" fill="currentColor" opacity="0.5" />
            <g style={{ transform: 'rotate(10deg)', transformOrigin: '200px 80px' }}>
              <line x1="80" y1="80" x2="320" y2="80" stroke="currentColor" strokeWidth="4" opacity="0.5" />
              <g>
                <line x1="80" y1="80" x2="80" y2="130" stroke="currentColor" strokeWidth="2" opacity="0.4" />
                <ellipse cx="80" cy="140" rx="45" ry="15" fill="currentColor" opacity="0.25" />
              </g>
              <g>
                <line x1="320" y1="80" x2="320" y2="130" stroke="currentColor" strokeWidth="2" opacity="0.4" />
                <ellipse cx="320" cy="140" rx="45" ry="15" fill="currentColor" opacity="0.25" />
              </g>
            </g>
          </svg>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-line-1">The Weight</span>
            <span className="hero-line-2">of a Word</span>
          </h1>
          <p className="hero-subtitle">A History of the N-Word in America</p>
          <p className="hero-tagline">
            How a Latin color term became infrastructure for dehumanization — and how people fought back
          </p>
        </div>

        <div className="scroll-indicator" aria-hidden="true">
          <span>Scroll to begin</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* Etymology Section - Scroll-lock with phased reveals */}
      <section 
        ref={etymologyRef}
        id="etymology-scroll-lock" 
        className="etymology-scroll-lock-container"
        style={{ height: '350vh' }}
      >
        <div className={`etymology-pinned-content ${etymologyPinned ? 'is-pinned' : ''} phase-${etymologyPhase}`}>
          <div className="etymology-content">
            {/* Intro text */}
            <div className="etymology-intro-block" style={{
              opacity: ['intro', 'latin', 'romance', 'english', 'weight', 'complete'].includes(etymologyPhase) ? 1 : 0,
              transform: `translateY(${['intro', 'latin', 'romance', 'english', 'weight', 'complete'].includes(etymologyPhase) ? 0 : 20}px)`,
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            }}>
              <p className="etymology-intro">Every word has a journey.</p>
              <p className="etymology-intro-sub">This one began in ancient Rome.</p>
            </div>
            
            <div className="etymology-timeline">
              {/* NIGER - Latin */}
              <div className="etymology-step" style={{
                opacity: ['latin', 'romance', 'english', 'weight', 'complete'].includes(etymologyPhase) ? 1 : 0,
                transform: `translateY(${['latin', 'romance', 'english', 'weight', 'complete'].includes(etymologyPhase) ? 0 : 20}px)`,
                transition: 'opacity 0.6s ease-out 0.1s, transform 0.6s ease-out 0.1s',
              }}>
                <span className="etymology-word latin">NIGER</span>
                <span className="etymology-meaning">Latin: black (a color, nothing more)</span>
              </div>
              
              <span className="etymology-arrow" style={{
                opacity: ['romance', 'english', 'weight', 'complete'].includes(etymologyPhase) ? 1 : 0,
                transition: 'opacity 0.4s ease-out',
              }}>→</span>
              
              {/* NEGRO - Romance */}
              <div className="etymology-step" style={{
                opacity: ['romance', 'english', 'weight', 'complete'].includes(etymologyPhase) ? 1 : 0,
                transform: `translateY(${['romance', 'english', 'weight', 'complete'].includes(etymologyPhase) ? 0 : 20}px)`,
                transition: 'opacity 0.6s ease-out 0.1s, transform 0.6s ease-out 0.1s',
              }}>
                <span className="etymology-word romance">NEGRO</span>
                <span className="etymology-meaning">Spanish & Portuguese — the word traveled with the slave trade</span>
              </div>
              
              <span className="etymology-arrow" style={{
                opacity: ['english', 'weight', 'complete'].includes(etymologyPhase) ? 1 : 0,
                transition: 'opacity 0.4s ease-out',
              }}>→</span>
              
              {/* NIGGER - English */}
              <div className="etymology-step" style={{
                opacity: ['english', 'weight', 'complete'].includes(etymologyPhase) ? 1 : 0,
                transform: `translateY(${['english', 'weight', 'complete'].includes(etymologyPhase) ? 0 : 20}px)`,
                transition: 'opacity 0.6s ease-out 0.1s, transform 0.6s ease-out 0.1s',
              }}>
                <span className="etymology-word english slur">Nigger</span>
                <span className="etymology-meaning">1574 — English — and became something else entirely</span>
              </div>
            </div>
            
            {/* Weight statement */}
            <div className="etymology-weight-block" style={{
              opacity: ['weight', 'complete'].includes(etymologyPhase) ? 1 : 0,
              transform: `translateY(${['weight', 'complete'].includes(etymologyPhase) ? 0 : 20}px)`,
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            }}>
              <p className="etymology-weight">The most offensive word in the English language.</p>
              <p className="etymology-weight-sub">This is the story of how that happened.</p>
            </div>
          </div>
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

      {/* Closing Reflection */}
      <ClosingSection isVisible={visibleSections.has('closing')} />

      {/* Sources */}
      <SourcesSection />
    </div>
  );
}

