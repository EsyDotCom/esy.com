/* eslint-disable react/no-unescaped-entities */
"use client";

/**
 * THE WORD THAT CHANGED ITS STRIPES
 * ==================================
 * A Typography-Forward Visual Essay on the Etymology of "Dick"
 * 
 * From medieval pet name to modern taboo—tracing 600 years of
 * semantic transformation through rhyming slang, military jargon,
 * and cultural anxiety.
 * 
 * Visual Treatment: Typography-forward with era-specific theming
 * - Words themselves become visual elements
 * - Era-specific color grading and typography
 * - Etymology as narrative device
 * - Scholarly tone with elegant presentation
 */

import React, { useState, useEffect, useRef } from 'react';
import './the-origin-of-dick.css';

// ===========================================
// INTERSECTION OBSERVER HOOK
// ===========================================

const useIntersectionReveal = <T extends HTMLElement>(
  options: IntersectionObserverInit = {}
): [React.RefObject<T>, boolean] => {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible];
};

// ===========================================
// SCROLL PROGRESS HOOK
// ===========================================

const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / scrollHeight) * 100;
      setProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};

// ===========================================
// ETYMOLOGY TIMELINE PROGRESS COMPONENT
// ===========================================

interface TimelineNode {
  label: string;
  position: number;
}

const EtymologyTimelineProgress: React.FC<{ progress: number }> = ({ progress }) => {
  const nodes: TimelineNode[] = [
    { label: 'richard', position: 5 },
    { label: 'rick', position: 18 },
    { label: 'dick', position: 32 },
    { label: 'fellow', position: 48 },
    { label: 'everyman', position: 62 },
    { label: 'slang', position: 78 },
    { label: 'taboo', position: 92 },
  ];

  return (
    <aside className="etymology-timeline-progress" aria-label={`Reading progress: ${Math.round(progress)}%`}>
      <div className="timeline-trunk">
        <div className="trunk-line" />
        <div className="trunk-fill" style={{ height: `${progress}%` }} />
        {nodes.map((node) => (
          <div
            key={node.label}
            className={`timeline-node ${progress >= node.position ? 'active' : ''}`}
            style={{ bottom: `${node.position}%` }}
          >
            <span className="node-dot" />
            <span className="node-label">{node.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

// ===========================================
// ETYMOLOGY CALLOUT COMPONENT
// ===========================================

interface EtymologyCalloutProps {
  word: string;
  pronunciation?: string;
  meaning: React.ReactNode;
  source?: string;
}

const EtymologyCallout: React.FC<EtymologyCalloutProps> = ({
  word,
  pronunciation,
  meaning,
  source,
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`etymology-callout ${isVisible ? 'visible' : ''}`}>
      <div className="etymology-word-display">{word}</div>
      {pronunciation && <p className="etymology-pronunciation">{pronunciation}</p>}
      <p className="etymology-meaning">{meaning}</p>
      {source && <p className="etymology-source">{source}</p>}
    </div>
  );
};

// ===========================================
// CHAPTER HEADER COMPONENT
// ===========================================

interface ChapterHeaderProps {
  number: string;
  title: string;
  era: string;
  epigraph?: string;
}

const ChapterHeader: React.FC<ChapterHeaderProps> = ({ number, title, era, epigraph }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`chapter-header ${isVisible ? 'visible' : ''}`}>
      <span className="chapter-number">{number}</span>
      <h2 className="chapter-title">{title}</h2>
      <span className="chapter-era">{era}</span>
      {epigraph && <p className="chapter-epigraph">"{epigraph}"</p>}
    </div>
  );
};

// ===========================================
// NARRATIVE TEXT COMPONENT
// ===========================================

interface NarrativeTextProps {
  children: React.ReactNode;
  delay?: number;
}

const NarrativeText: React.FC<NarrativeTextProps> = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLParagraphElement>();

  return (
    <p
      ref={ref}
      className={`narrative-text ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </p>
  );
};

// ===========================================
// PULL QUOTE COMPONENT
// ===========================================

interface PullQuoteProps {
  children: React.ReactNode;
  attribution: string;
  year?: string;
}

const PullQuote: React.FC<PullQuoteProps> = ({ children, attribution, year }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`pull-quote ${isVisible ? 'visible' : ''}`}>
      <div className="pull-quote-mark">"</div>
      <p className="pull-quote-text">{children}</p>
      <div className="pull-quote-attribution">
        — {attribution}
        {year && <span className="pull-quote-year">{year}</span>}
      </div>
    </div>
  );
};

// ===========================================
// TRANSFORMATION FLOW COMPONENT
// ===========================================

interface TransformNodeData {
  word: string;
  meaning: string;
}

const TransformationFlow: React.FC<{ nodes: TransformNodeData[] }> = ({ nodes }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="transformation-flow">
      {nodes.map((node, index) => (
        <React.Fragment key={node.word}>
          <div
            className={`transform-node ${isVisible ? 'visible' : ''}`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <span className="transform-word">{node.word}</span>
            <span className="transform-meaning">{node.meaning}</span>
          </div>
          {index < nodes.length - 1 && <span className="transform-arrow">→</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

// ===========================================
// FIGURE PROFILE COMPONENT
// ===========================================

interface FigureProfileProps {
  name: string;
  epithet: string;
  dates: string;
  initial: string;
  contributions: string[];
  quote?: string;
  quoteSource?: string;
}

const FigureProfile: React.FC<FigureProfileProps> = ({
  name,
  epithet,
  dates,
  initial,
  contributions,
  quote,
  quoteSource,
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLElement>();

  return (
    <figure ref={ref} className={`figure-profile ${isVisible ? 'visible' : ''}`}>
      <div className="figure-portrait">
        <div className="portrait-placeholder">
          <span className="portrait-initial">{initial}</span>
        </div>
        <div className="portrait-frame" />
      </div>

      <figcaption className="figure-details">
        <h4 className="figure-name">{name}</h4>
        <p className="figure-epithet">{epithet}</p>
        <p className="figure-dates">{dates}</p>

        <ul className="figure-contributions">
          {contributions.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        {quote && (
          <blockquote className="figure-quote">
            <p>"{quote}"</p>
            {quoteSource && <cite>— {quoteSource}</cite>}
          </blockquote>
        )}
      </figcaption>
    </figure>
  );
};

// ===========================================
// MEANING ERA COMPONENT
// ===========================================

interface MeaningEraProps {
  date: string;
  title: string;
  description: string;
  example?: string;
  delay?: number;
}

const MeaningEra: React.FC<MeaningEraProps> = ({ date, title, description, example, delay = 0 }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`meaning-era ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="meaning-date">{date}</span>
      <div className="meaning-content">
        <h4>{title}</h4>
        <p>{description}</p>
        {example && <span className="meaning-example">"{example}"</span>}
      </div>
    </div>
  );
};

// ===========================================
// VOICE SCHOLARLY COMPONENT
// ===========================================

const VoiceScholarly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`voice-scholarly ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  );
};

// ===========================================
// SECTION DIVIDER COMPONENT
// ===========================================

const SectionDivider: React.FC<{ symbol?: string }> = ({ symbol = '✦' }) => (
  <div className="section-divider">
    <span className="divider-symbol">{symbol}</span>
  </div>
);

// ===========================================
// MAIN CLIENT COMPONENT
// ===========================================

export default function OriginOfDickClient() {
  const scrollProgress = useScrollProgress();

  return (
    <article className="origin-of-dick-essay">
      {/* Etymology Timeline Progress */}
      <EtymologyTimelineProgress progress={scrollProgress} />

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <header className="dick-hero">
        <span className="hero-etymology-badge">Etymology</span>

        <div className="hero-word-container">
          <div className="hero-word-shadow">DICK</div>
          <h1 className="hero-word">DICK</h1>
        </div>

        <div className="hero-rhyme-chain">
          <span className="rhyme-word">Richard</span>
          <span className="rhyme-arrow">→</span>
          <span className="rhyme-word">Rick</span>
          <span className="rhyme-arrow">→</span>
          <span className="rhyme-word">Dick</span>
        </div>

        <p className="hero-subtitle">
          How a medieval pet name became one of English's most versatile—and contested—words
        </p>

        <div className="hero-scroll-indicator">
          <span>Scroll to begin</span>
          <div className="scroll-line" />
        </div>
      </header>

      {/* ============================================
          PROLOGUE
          ============================================ */}
      <section className="prologue">
        <div className="prologue-content">
          <p className="prologue-text lead">
            Every word has a biography.
          </p>
          <p className="prologue-text">
            Some words live quiet lives, meaning the same thing for centuries. Others
            undergo radical transformations—their meanings shifting, fragmenting, sometimes
            reversing entirely. The word <span className="prologue-highlight">dick</span> belongs
            to this latter category.
          </p>
          <p className="prologue-text">
            What began as an affectionate nickname for Richard in medieval England has
            traveled through six centuries of semantic change—from aristocratic pet name
            to generic everyman, from innocent slang to cultural taboo. This is the story
            of that journey.
          </p>
        </div>
      </section>

      {/* ============================================
          CHAPTER 1: THE NAME
          ============================================ */}
      <section className="chapter era-medieval" id="medieval">
        <ChapterHeader
          number="I"
          title="The Name"
          era="Medieval England · 1200–1500 CE"
          epigraph="In the beginning, there was Richard—and Richard needed a nickname."
        />

        <EtymologyCallout
          word="RICHARD"
          pronunciation="/ˈrɪtʃ.ərd/"
          meaning={<>From Germanic <em>ric</em> (ruler) + <em>hard</em> (brave, strong). Meaning: <em>"powerful ruler"</em></>}
          source="Introduced to England by the Normans, 11th century"
        />

        <div className="narrative-block">
          <NarrativeText>
            The name Richard came to England with the Norman Conquest in 1066. Derived from
            the Germanic elements meaning "powerful ruler," it became one of the most popular
            names in medieval England—borne by kings, nobles, and commoners alike.
          </NarrativeText>

          <NarrativeText delay={100}>
            But in an age when many men shared the same few names, nicknames became essential.
            Medieval English developed a fascinating system for generating pet names: start
            with the first syllable, then create a rhyming variant.
          </NarrativeText>
        </div>

        <TransformationFlow
          nodes={[
            { word: 'Richard', meaning: 'formal name' },
            { word: 'Rick', meaning: 'shortened' },
            { word: 'Dick', meaning: 'rhyming form' },
          ]}
        />

        <div className="narrative-block">
          <NarrativeText>
            This rhyming pattern was extremely common in medieval England. Consider the
            parallels: <span className="text-etymology">William → Will → Bill</span>,{' '}
            <span className="text-etymology">Robert → Rob → Bob</span>,{' '}
            <span className="text-etymology">Margaret → Meg → Peg</span>.
          </NarrativeText>

          <NarrativeText delay={100}>
            The linguistic mechanism was simple: change the initial consonant of the
            shortened form to create a new, distinctive nickname. <span className="text-highlight">R</span> became{' '}
            <span className="text-highlight">D</span>, and Rick became Dick.
          </NarrativeText>
        </div>

        <FigureProfile
          name="Richard I (Richard the Lionheart)"
          epithet="England's Most Famous Richard"
          dates="1157–1199"
          initial="R"
          contributions={[
            "King of England whose popularity elevated the name Richard",
            "Third Crusade leader, legendary warrior-king",
            "Spent only six months of his reign in England",
            "His fame ensured Richard remained a top English name for centuries",
          ]}
          quote="I would sell London if I could find a buyer."
          quoteSource="Attributed, raising Crusade funds"
        />

        <div className="narrative-block">
          <NarrativeText>
            By the 13th century, Dick was firmly established as a standard pet name for
            Richard—as unremarkable as calling a William "Bill" today. There was nothing
            vulgar, nothing suggestive, nothing remarkable about it.
          </NarrativeText>

          <NarrativeText delay={100}>
            The name appeared in official records, in literature, in everyday speech.
            A man named Dick was simply a man named Richard, addressed informally.
          </NarrativeText>
        </div>

        <VoiceScholarly>
          For three centuries, "Dick" meant only one thing: Richard. The word was innocent, familiar, unremarkable.
        </VoiceScholarly>

        <SectionDivider symbol="✦" />
      </section>

      {/* ============================================
          CHAPTER 2: THE EVERYMAN
          ============================================ */}
      <section className="chapter era-tudor" id="tudor">
        <ChapterHeader
          number="II"
          title="The Everyman"
          era="Tudor & Stuart England · 1500–1700"
          epigraph="When a name becomes so common, it starts to mean 'anyone.'"
        />

        <div className="narrative-block">
          <NarrativeText>
            Something interesting happens when a name becomes extraordinarily popular:
            it begins to lose its specificity. In Tudor England, Richard (and therefore
            Dick) was so common that "Dick" started acquiring a secondary meaning—not
            a particular man named Richard, but <span className="text-highlight">any man</span>,
            or <span className="text-highlight">every man</span>.
          </NarrativeText>
        </div>

        <EtymologyCallout
          word="DICK"
          pronunciation="/dɪk/"
          meaning={<>Evolving meaning: <em>any ordinary fellow, an everyman</em></>}
          source="First attested in this usage: 16th century"
        />

        <div className="narrative-block">
          <NarrativeText>
            This pattern has repeated throughout English history. "Jack" underwent
            the same transformation—from a specific name to a generic term (hence
            "jack-of-all-trades," "every man jack"). "John" became "john" (as in
            "John Doe"). Names that achieve critical mass become common nouns.
          </NarrativeText>

          <NarrativeText delay={100}>
            The phrase <span className="text-quote-inline">"Tom, Dick, and Harry"</span> emerged
            in this period—meaning "any random group of ordinary people." Dick stood between
            Tom and Harry as the quintessential common Englishman, unremarkable and interchangeable.
          </NarrativeText>
        </div>

        <PullQuote attribution="English proverb" year="c. 1600s">
          Every Tom, Dick, and Harry has an opinion.
        </PullQuote>

        <div className="narrative-block">
          <NarrativeText>
            This generic usage spawned numerous compound expressions. A "clever dick" was
            someone who thought themselves too smart. The word was becoming flexible,
            adaptable, moving beyond its origins as a personal name.
          </NarrativeText>
        </div>

        <div className="meaning-timeline">
          <MeaningEra
            date="1500s"
            title="Generic fellow"
            description="'Dick' begins meaning any ordinary man, not specifically someone named Richard."
            example="Any Dick could tell you that."
            delay={0}
          />
          <MeaningEra
            date="1550s"
            title="Tom, Dick, and Harry"
            description="The phrase emerges as shorthand for 'ordinary people' or 'everyone.'"
            example="Don't let every Tom, Dick, and Harry through the gate."
            delay={100}
          />
          <MeaningEra
            date="1600s"
            title="Clever Dick"
            description="Compound terms using 'Dick' as a generic masculine placeholder become common."
            example="He thinks he's such a clever Dick."
            delay={200}
          />
        </div>

        <VoiceScholarly>
          The word was evolving. No longer just a name, "Dick" was becoming a linguistic tool—a stand-in for anonymous masculinity.
        </VoiceScholarly>

        <SectionDivider symbol="◆" />
      </section>

      {/* ============================================
          CHAPTER 3: THE SLANG TURN
          ============================================ */}
      <section className="chapter era-georgian" id="georgian">
        <ChapterHeader
          number="III"
          title="The Slang Turn"
          era="Georgian England · 1700–1840"
          epigraph="In the barracks and the streets, words take on new lives."
        />

        <div className="narrative-block">
          <NarrativeText>
            The 18th century was an age of slang. British military culture, sailor
            jargon, criminal cant, and street language all flourished—and cross-pollinated.
            It was in this linguistic hothouse that "dick" began acquiring its anatomical meaning.
          </NarrativeText>

          <NarrativeText delay={100}>
            The exact origins are debated by etymologists. Some point to the leather
            garments called "dicks" worn by horsemen. Others note the general pattern
            of using common male names as slang for male anatomy (compare "peter," "john,"
            "johnson," "willie").
          </NarrativeText>
        </div>

        <EtymologyCallout
          word="DICK"
          pronunciation="/dɪk/"
          meaning={<>New slang meaning: <em>the male member</em> (vulgar)</>}
          source="First documented: late 18th century, British military slang"
        />

        <div className="narrative-block">
          <NarrativeText>
            Francis Grose's <em>Classical Dictionary of the Vulgar Tongue</em> (1785)—the
            first comprehensive dictionary of English slang—recorded numerous crude terms,
            though its documentation of "dick" in this sense came in later editions.
          </NarrativeText>
        </div>

        <FigureProfile
          name="Francis Grose"
          epithet="The Vulgar Lexicographer"
          dates="1731–1791"
          initial="G"
          contributions={[
            "English antiquary and lexicographer",
            "Published 'A Classical Dictionary of the Vulgar Tongue' (1785)",
            "First serious attempt to document street slang and cant",
            "Revealed the hidden vocabulary of Georgian England",
          ]}
          quote="The Vulgar Tongue... words and phrases used by... persons of low and illiberal education."
          quoteSource="Dictionary preface"
        />

        <div className="narrative-block">
          <NarrativeText>
            The new meaning coexisted with the old. Through the Georgian and early
            Victorian periods, men continued to be named Dick, addressed as Dick,
            and called Dick in print—while the vulgar meaning circulated in barracks,
            taverns, and the lower registers of speech.
          </NarrativeText>

          <NarrativeText delay={100}>
            This was linguistic stratification: the polite world used "Dick" as a name;
            the vulgar world used it as slang. The two meanings existed in parallel,
            separated by class and context.
          </NarrativeText>
        </div>

        <PullQuote attribution="Eric Partridge, A Dictionary of Slang" year="1937">
          The process by which male names become slang for male anatomy is one of the
          most consistent patterns in vulgar English.
        </PullQuote>

        <VoiceScholarly>
          For nearly two centuries, "Dick" led a double life—respectable name above, crude slang below.
        </VoiceScholarly>

        <SectionDivider symbol="❧" />
      </section>

      {/* ============================================
          CHAPTER 4: THE VICTORIAN PARADOX
          ============================================ */}
      <section className="chapter era-victorian" id="victorian">
        <ChapterHeader
          number="IV"
          title="The Victorian Paradox"
          era="Victorian England · 1840–1900"
          epigraph="The age that invented prudery couldn't escape the vernacular."
        />

        <div className="narrative-block">
          <NarrativeText>
            Victorian England was famously prudish—or famously hypocritical, depending
            on your perspective. The respectable classes developed elaborate strategies
            to avoid vulgar words, while those same words thrived in the streets,
            music halls, and private conversations.
          </NarrativeText>

          <NarrativeText delay={100}>
            "Dick" as a personal name remained entirely acceptable. Charles Dickens—who
            knew something about names—used Dick in numerous works. "Dick Swiveller" in
            <em> The Old Curiosity Shop</em> was a lovable scoundrel. No Victorian reader
            found the name itself objectionable.
          </NarrativeText>
        </div>

        <FigureProfile
          name="Charles Dickens"
          epithet="The Great Namer"
          dates="1812–1870"
          initial="D"
          contributions={[
            "Created memorable characters with evocative names",
            "Used 'Dick' as a character name multiple times",
            "Dick Swiveller, Dick Whittington references",
            "His usage reflected the name's continued respectability",
          ]}
          quote="There are strings in the human heart that had better not be wibrated."
          quoteSource="Barnaby Rudge (Dick's malapropism)"
        />

        <div className="narrative-block">
          <NarrativeText>
            Yet the slang meaning was gaining ground. As literacy spread and the middle
            classes expanded, the linguistic stratification began to break down. More
            people knew both meanings—and the tension between them started to matter.
          </NarrativeText>

          <NarrativeText delay={100}>
            By the late Victorian period, "dick" had acquired yet another meaning in
            American English: a detective or police officer. This usage—possibly from
            rhyming slang ("dick" = "dick van dyke" = "tec" = detective) or from the
            Pinkerton Agency's "private eye"—would persist well into the 20th century.
          </NarrativeText>
        </div>

        <div className="meaning-timeline">
          <MeaningEra
            date="1840s"
            title="Still a respectable name"
            description="Dick remains common as a personal name and informal address."
            delay={0}
          />
          <MeaningEra
            date="1870s"
            title="Detective (American)"
            description="'Dick' becomes slang for a detective or investigator in American English."
            example="The private dick was on the case."
            delay={100}
          />
          <MeaningEra
            date="1890s"
            title="Growing awareness"
            description="The vulgar meaning becomes more widely known, though still suppressed in polite company."
            delay={200}
          />
        </div>

        <VoiceScholarly>
          The Victorians maintained the fiction that "Dick" was just a name. But the other meaning was waiting, growing, preparing to eclipse its origins.
        </VoiceScholarly>

        <SectionDivider symbol="✧" />
      </section>

      {/* ============================================
          CHAPTER 5: THE TWENTIETH CENTURY SHIFT
          ============================================ */}
      <section className="chapter era-modern" id="modern">
        <ChapterHeader
          number="V"
          title="The Tipping Point"
          era="20th Century America · 1900–1980"
          epigraph="The century when the vulgar meaning won."
        />

        <div className="narrative-block">
          <NarrativeText>
            The 20th century witnessed the final act of "dick's" transformation. What
            had been a parallel existence—respectable name and vulgar slang—became
            increasingly uncomfortable as mass media spread the vulgar meaning to
            ever-wider audiences.
          </NarrativeText>

          <NarrativeText delay={100}>
            In early 20th-century America, Dick remained a common name. Richard Nixon
            was called "Dick Nixon" throughout his career. Dick Van Dyke became a
            television star. "Dick Tracy" was a beloved comic strip detective.
          </NarrativeText>
        </div>

        <FigureProfile
          name="Richard Nixon"
          epithet="The Last Famous Dick"
          dates="1913–1994"
          initial="N"
          contributions={[
            "37th President of the United States",
            "Consistently referred to as 'Dick Nixon' in media",
            "One of the last prominent Americans to use 'Dick' publicly",
            "His era marked the name's final mainstream acceptance",
          ]}
          quote="I am not a crook."
          quoteSource="Press conference, 1973"
        />

        <div className="narrative-block">
          <NarrativeText>
            But the tide was turning. By the 1960s and 1970s, the crude meaning had
            become so widely known—and increasingly used openly in counterculture
            and entertainment—that the name began its decline.
          </NarrativeText>

          <NarrativeText delay={100}>
            Parents stopped naming their sons Dick. Men named Richard increasingly
            went by "Rich," "Rick," or "Richie" instead. The name didn't disappear
            overnight, but its trajectory was clear.
          </NarrativeText>
        </div>

        <PullQuote attribution="Social Security Administration data analysis" year="2020">
          The name Dick peaked in American popularity in the 1930s-1940s.
          By the 1980s, it had virtually disappeared from birth certificates.
        </PullQuote>

        <div className="narrative-block">
          <NarrativeText>
            The word also expanded its pejorative usage. To be a "dick" meant to be
            obnoxious, thoughtless, or cruel—an insult that connected male anatomy
            with male misbehavior. "Don't be a dick" became a common admonition.
          </NarrativeText>
        </div>

        <div className="meaning-timeline">
          <MeaningEra
            date="1920s-40s"
            title="Peak as a name"
            description="Dick reaches maximum popularity as a given name in America."
            delay={0}
          />
          <MeaningEra
            date="1960s"
            title="Counterculture usage"
            description="The vulgar meaning becomes more open in speech and print."
            delay={100}
          />
          <MeaningEra
            date="1970s-80s"
            title="Name decline begins"
            description="Parents increasingly avoid the name; 'Rich' and 'Rick' become preferred."
            delay={200}
          />
        </div>

        <VoiceScholarly>
          What the Victorians suppressed, the 20th century spoke aloud. And once spoken, the word could never return to innocence.
        </VoiceScholarly>

        <SectionDivider symbol="◈" />
      </section>

      {/* ============================================
          CHAPTER 6: THE CONTEMPORARY WORD
          ============================================ */}
      <section className="chapter era-contemporary" id="contemporary">
        <ChapterHeader
          number="VI"
          title="The Word Today"
          era="Contemporary English · 1980–Present"
          epigraph="A word that contains multitudes—all of them complicated."
        />

        <div className="narrative-block">
          <NarrativeText>
            Today, "dick" exists in a curious state. The personal name survives among
            older generations—there are still men named Dick, mostly born before 1970—but
            it has effectively vanished from new births. The Social Security Administration
            records almost no children named Dick in recent decades.
          </NarrativeText>

          <NarrativeText delay={100}>
            The word's meanings have stratified into distinct registers. As anatomy, it's
            vulgar but not obscene—milder than some alternatives, cruder than others.
            As an insult ("he's such a dick"), it's widely used and broadly understood.
            As a detective ("private dick"), it's nostalgic, evoking noir fiction and
            old Hollywood.
          </NarrativeText>
        </div>

        <EtymologyCallout
          word="DICK"
          meaning={
            <>
              Contemporary meanings:<br />
              <em>1. Male anatomy (vulgar)</em><br />
              <em>2. An obnoxious person (slang)</em><br />
              <em>3. Detective (dated American)</em><br />
              <em>4. Personal name (increasingly rare)</em>
            </>
          }
        />

        <div className="narrative-block">
          <NarrativeText>
            The word's journey reveals something about language itself: meanings are
            not fixed properties but social negotiations. A word means what its speakers
            understand it to mean—and those understandings shift across time, class,
            and context.
          </NarrativeText>

          <NarrativeText delay={100}>
            "Dick" didn't become vulgar because of some inherent property; it became
            vulgar because enough speakers used it that way, for long enough, until
            the vulgar meaning overwhelmed the innocent one.
          </NarrativeText>
        </div>

        <PullQuote attribution="Steven Pinker, The Stuff of Thought" year="2007">
          Words are not just labels for concepts; they are tiny vehicles of meaning
          that carry cultural freight from one mind to another.
        </PullQuote>

        <div className="narrative-block">
          <NarrativeText>
            The name Richard, meanwhile, continues to thrive. Men named Richard go by
            Rich, Rick, Ricky, or simply Richard—but rarely Dick anymore. The rhyming
            nickname that served for six centuries has been quietly retired.
          </NarrativeText>
        </div>

        <VoiceScholarly>
          A word that meant "powerful ruler" now means... something else entirely. And yet both meanings remain, layered like geological strata, in the living English language.
        </VoiceScholarly>
      </section>

      {/* ============================================
          EPILOGUE
          ============================================ */}
      <section className="epilogue">
        <div className="epilogue-content">
          <div className="epilogue-word">DICK</div>

          <h2 className="epilogue-title">The Word That Changed Its Stripes</h2>

          <p className="epilogue-text">
            Six centuries ago, a mother in medieval England called her son by his
            nickname—Dick, for Richard—with nothing but affection in her voice.
            She could not have imagined what the word would become.
          </p>

          <p className="epilogue-text">
            Words are living things. They are born, they grow, they change. They
            acquire meanings their creators never imagined and shed meanings they
            once held dear. The word "dick" has traveled further than most—from
            royal court to common street, from innocent nickname to cultural taboo.
          </p>

          <p className="epilogue-text">
            The next time you hear this word—in whatever context—you're hearing
            six hundred years of history. Every meaning it carries is a layer of
            time, a record of how speakers used it, shaped it, transformed it.
          </p>

          <p className="epilogue-closing">
            Etymology is autobiography—not of a person, but of a people.
          </p>
        </div>
      </section>

      {/* ============================================
          SOURCES
          ============================================ */}
      <footer className="sources-section">
        <h3>Sources & Further Reading</h3>

        <div className="sources-grid">
          <div className="source-category">
            <h4>Etymology & Linguistics</h4>
            <ul>
              <li><em>Oxford English Dictionary</em>, "dick, n."</li>
              <li><em>Etymonline.com</em>, Douglas Harper</li>
              <li>Eric Partridge, <em>A Dictionary of Slang and Unconventional English</em></li>
              <li>Jonathon Green, <em>Green's Dictionary of Slang</em></li>
            </ul>
          </div>

          <div className="source-category">
            <h4>Historical Documentation</h4>
            <ul>
              <li>Francis Grose, <em>A Classical Dictionary of the Vulgar Tongue</em> (1785)</li>
              <li>John Camden Hotten, <em>A Dictionary of Modern Slang</em> (1859)</li>
              <li>Social Security Administration, baby name statistics</li>
            </ul>
          </div>

          <div className="source-category">
            <h4>Language & Meaning</h4>
            <ul>
              <li>Steven Pinker, <em>The Stuff of Thought</em> (2007)</li>
              <li>John McWhorter, <em>Words on the Move</em> (2016)</li>
              <li>Kate Burridge, <em>Blooming English</em> (2004)</li>
            </ul>
          </div>
        </div>
      </footer>
    </article>
  );
}



