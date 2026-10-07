/* eslint-disable react/no-unescaped-entities */
"use client";

/**
 * ΠΌΡΝΗ: THE ETYMOLOGY OF A FORBIDDEN WORD
 * =========================================
 * A Visual Essay on the Origin and Evolution of "Pornography"
 * 
 * From ancient Greek slave markets to modern digital discourse—
 * the 2,500-year journey of a word society couldn't stop using 
 * or openly discuss.
 * 
 * Visual Treatment: Photorealistic with Classical Typography
 * - Ancient Greek manuscripts and inscriptions
 * - Victorian-era dictionaries and legal documents
 * - Era-specific typography treatments
 * - Scholarly, etymological aesthetic
 */

import React from 'react';
import Image from 'next/image';
import {
  VisualEssay,
  VoiceUnseen,
  VoiceEternal,
  PullQuote,
  SectionDivider,
  useIntersectionReveal,
  useCinematicScroll,
  useReducedMotion,
} from '@/components/VisualEssay';
import './origin-of-porn.css';

// ===========================================
// ETYMOLOGY CALLOUT COMPONENT
// ===========================================

interface EtymologyCalloutProps {
  greek: string;
  transliteration: string;
  meaning: string;
  notes?: string;
}

const EtymologyCallout: React.FC<EtymologyCalloutProps> = ({
  greek,
  transliteration,
  meaning,
  notes,
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  return (
    <div ref={ref} className={`etymology-callout ${isVisible ? 'visible' : ''}`}>
      <span className="greek-word">{greek}</span>
      <span className="transliteration">{transliteration}</span>
      <p className="etymology-meaning">{meaning}</p>
      {notes && <p className="etymology-notes">{notes}</p>}
    </div>
  );
};

// ===========================================
// WORD MORPHOLOGY COMPONENT
// ===========================================

interface WordPart {
  text: string;
  label: string;
  meaning: string;
}

interface WordMorphologyProps {
  parts: WordPart[];
  result: string;
}

const WordMorphology: React.FC<WordMorphologyProps> = ({ parts, result }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  return (
    <div ref={ref} className={`word-morphology ${isVisible ? 'visible' : ''}`}>
      <div className="morphology-parts">
        {parts.map((part, index) => (
          <React.Fragment key={part.label}>
            <div className="morphology-part" style={{ transitionDelay: `${index * 150}ms` }}>
              <span className="part-text">{part.text}</span>
              <span className="part-label">{part.label}</span>
              <span className="part-meaning">{part.meaning}</span>
            </div>
            {index < parts.length - 1 && <span className="morphology-plus">+</span>}
          </React.Fragment>
        ))}
      </div>
      <div className="morphology-result" style={{ transitionDelay: `${parts.length * 150 + 100}ms` }}>
        <span className="result-arrow">↓</span>
        <span className="result-word">{result}</span>
      </div>
    </div>
  );
};

// ===========================================
// TIMELINE ERA MARKER
// ===========================================

interface TimelineEraProps {
  era: string;
  years: string;
  children: React.ReactNode;
}

const TimelineEra: React.FC<TimelineEraProps> = ({ era, years, children }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  return (
    <div ref={ref} className={`timeline-era ${isVisible ? 'visible' : ''}`}>
      <div className="era-marker">
        <span className="era-label">{era}</span>
        <span className="era-years">{years}</span>
      </div>
      <div className="era-content">{children}</div>
    </div>
  );
};

// ===========================================
// HISTORICAL FIGURE PROFILE
// ===========================================

interface ScholarProfileProps {
  name: string;
  epithet: string;
  dates: string;
  contributions: string[];
  quote?: string;
  quoteSource?: string;
  era: 'ancient' | 'victorian' | 'modern';
}

const ScholarProfile: React.FC<ScholarProfileProps> = ({
  name,
  epithet,
  dates,
  contributions,
  quote,
  quoteSource,
  era,
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  return (
    <figure ref={ref} className={`scholar-profile era-${era} ${isVisible ? 'visible' : ''}`}>
      <div className="scholar-initial">{name.charAt(0)}</div>
      <figcaption className="scholar-details">
        <h4 className="scholar-name">{name}</h4>
        <p className="scholar-epithet">{epithet}</p>
        <p className="scholar-dates">{dates}</p>
        
        <ul className="scholar-contributions">
          {contributions.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        
        {quote && (
          <blockquote className="scholar-quote">
            <p>"{quote}"</p>
            {quoteSource && <cite>— {quoteSource}</cite>}
          </blockquote>
        )}
      </figcaption>
    </figure>
  );
};

// ===========================================
// CHAPTER HEADER COMPONENT
// ===========================================

interface ChapterHeaderProps {
  number: string;
  greekNumeral?: string;
  title: string;
  subtitle: string;
}

const ChapterHeader: React.FC<ChapterHeaderProps> = ({ number, greekNumeral, title, subtitle }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  return (
    <div ref={ref} className={`chapter-header ${isVisible ? 'visible' : ''}`}>
      <div className="chapter-numerals">
        <span className="chapter-number">{number}</span>
        {greekNumeral && <span className="chapter-greek">{greekNumeral}</span>}
      </div>
      <h2 className="chapter-title">{title}</h2>
      <span className="chapter-subtitle">{subtitle}</span>
    </div>
  );
};

// ===========================================
// REVEALED BLOCK
// ===========================================

interface RevealedBlockProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const RevealedBlock: React.FC<RevealedBlockProps> = ({ children, className = '', delay = 0 }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  return (
    <div 
      ref={ref}
      className={`revealed-block ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ===========================================
// LEXICON ENTRY COMPONENT
// ===========================================

interface LexiconEntryProps {
  word: string;
  pronunciation?: string;
  partOfSpeech: string;
  definitions: string[];
  etymology: string;
  year?: string;
}

const LexiconEntry: React.FC<LexiconEntryProps> = ({
  word,
  pronunciation,
  partOfSpeech,
  definitions,
  etymology,
  year,
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  return (
    <div ref={ref} className={`lexicon-entry ${isVisible ? 'visible' : ''}`}>
      <div className="lexicon-header">
        <h4 className="lexicon-word">{word}</h4>
        {pronunciation && <span className="lexicon-pronunciation">{pronunciation}</span>}
        <span className="lexicon-pos">{partOfSpeech}</span>
        {year && <span className="lexicon-year">{year}</span>}
      </div>
      <ol className="lexicon-definitions">
        {definitions.map((def, i) => (
          <li key={i}>{def}</li>
        ))}
      </ol>
      <div className="lexicon-etymology">
        <span className="etymology-label">Etymology:</span> {etymology}
      </div>
    </div>
  );
};

// ===========================================
// SCROLL PROGRESS INDICATOR
// ===========================================

const EtymologyProgress: React.FC<{ progress: number }> = ({ progress }) => {
  const eras = [
    { label: 'Αρχαία', year: '~500 BCE', position: 0 },
    { label: 'Roman', year: '~100 CE', position: 20 },
    { label: 'Medieval', year: '~1200', position: 35 },
    { label: 'Victorian', year: '1857', position: 55 },
    { label: '20th C', year: '1957', position: 75 },
    { label: 'Digital', year: '2024', position: 95 },
  ];
  
  return (
    <div className="etymology-progress" aria-label={`Reading progress: ${Math.round(progress * 100)}%`}>
      <div className="progress-track">
        <div 
          className="progress-fill"
          style={{ height: `${progress * 100}%` }}
        />
        {eras.map((era) => (
          <div 
            key={era.label}
            className={`progress-marker ${progress * 100 >= era.position ? 'passed' : ''}`}
            style={{ top: `${era.position}%` }}
          >
            <span className="marker-dot" />
            <span className="marker-label">{era.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===========================================
// MAIN CLIENT COMPONENT
// ===========================================

export default function OriginOfPornClient() {
  const { progress: scrollProgress } = useCinematicScroll();
  const prefersReduced = useReducedMotion();
  
  return (
    <VisualEssay className="origin-of-porn-essay">
      {/* Progress Indicator */}
      <EtymologyProgress progress={scrollProgress} />
      
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <header className="hero-section">
        <div className="hero-background">
          <div className="hero-pattern" aria-hidden="true" />
          <div className="hero-gradient" />
        </div>
        
        <div className="hero-content">
          <div className="hero-greek-letters" aria-hidden="true">
            <span className="floating-letter" style={{ '--delay': 0 } as React.CSSProperties}>Π</span>
            <span className="floating-letter" style={{ '--delay': 1 } as React.CSSProperties}>Ό</span>
            <span className="floating-letter" style={{ '--delay': 2 } as React.CSSProperties}>Ρ</span>
            <span className="floating-letter" style={{ '--delay': 3 } as React.CSSProperties}>Ν</span>
            <span className="floating-letter" style={{ '--delay': 4 } as React.CSSProperties}>Η</span>
          </div>
          
          <p className="hero-kicker">A Visual Essay on Etymology</p>
          <h1 className="hero-title">
            <span className="title-greek">Πόρνη</span>
            <span className="title-english">The Forbidden Word</span>
          </h1>
          <p className="hero-subtitle">
            From ancient Greek slave markets to the Oxford English Dictionary—
            the 2,500-year journey of a word society couldn't stop using 
            or openly discuss
          </p>
          
          <div className="hero-scroll-prompt">
            <span>Descend into etymology</span>
            <div className="scroll-line" />
          </div>
        </div>
      </header>
      
      {/* ============================================
          PROLOGUE
          ============================================ */}
      <section className="prologue">
        <div className="prologue-content">
          <RevealedBlock className="prologue-text large" delay={0}>
            Every word has a birthplace.
          </RevealedBlock>
          <RevealedBlock className="prologue-text" delay={200}>
            Some arrive gently—borrowed from neighbors, adapted from needs.
            Others are forged in the crucible of power, shame, and commerce.
          </RevealedBlock>
          <RevealedBlock className="prologue-text" delay={400}>
            This word was born in the marketplaces of ancient Athens, 
            where human beings were bought and sold. It has never stopped 
            being controversial—yet never stopped being used.
          </RevealedBlock>
          <RevealedBlock className="prologue-text large" delay={600}>
            This is its story.
          </RevealedBlock>
        </div>
      </section>
      
      {/* ============================================
          CHAPTER 1: THE GREEK ROOT
          ============================================ */}
      <section className="chapter chapter-1 era-ancient" id="greek-root">
        <ChapterHeader 
          number="I" 
          greekNumeral="Α"
          title="The Greek Root" 
          subtitle="Athens, ~500 BCE" 
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            In the agora of ancient Athens, commerce was the heartbeat of civilization.
            Olive oil, pottery, grain, slaves—everything had a price. And for those
            who were sold, a specific word emerged from the marketplace vocabulary.
          </VoiceUnseen>
        </div>
        
        <EtymologyCallout
          greek="πέρνημι"
          transliteration="pérnēmi"
          meaning="to sell, to export"
          notes="The verb at the root of it all—the act of selling, particularly of slaves."
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            From <em>pérnēmi</em>—to sell—came <em>pórnē</em> (πόρνη): 
            literally, "one who is sold." In practical terms, a prostitute.
            Not a courtesan, not a companion, but someone whose body was a 
            commodity in the most literal sense.
          </VoiceUnseen>
        </div>
        
        <EtymologyCallout
          greek="πόρνη"
          transliteration="pórnē"
          meaning="prostitute; literally 'one who is sold'"
          notes="Feminine noun. The male form, pórnos (πόρνος), meant a male prostitute or fornicator."
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The Greeks, never ones to shy from documentation, also had a word for 
            those who wrote about such commerce. When <em>pórnē</em> met 
            <em>gráphein</em>—to write—a new compound was born.
          </VoiceUnseen>
        </div>
        
        <WordMorphology
          parts={[
            { text: "πόρνη", label: "pórnē", meaning: "prostitute" },
            { text: "γράφειν", label: "gráphein", meaning: "to write" },
          ]}
          result="πορνογράφος (pornográphos)"
        />
        
        <EtymologyCallout
          greek="πορνογράφος"
          transliteration="pornográphos"
          meaning="one who writes about prostitutes"
          notes="Attested in classical Greek texts. The writer Athenaeus used this term for authors who described the lives of courtesans."
        />
        
        <ScholarProfile
          name="Athenaeus of Naucratis"
          epithet="The Gastronomer"
          dates="c. 170–230 CE"
          contributions={[
            "Greek-Egyptian author of 'Deipnosophistae' (Dinner-Table Philosophers)",
            "Preserved countless fragments of lost Greek texts",
            "Used 'pornográphos' to describe authors who documented prostitution",
          ]}
          quote="The pornographoi wrote of the women who could be bought in the marketplace, their names and their prices."
          quoteSource="Deipnosophistae, Book XIII"
          era="ancient"
        />
        
        <VoiceEternal>
          The word was clinical. Descriptive. Not yet forbidden—merely precise.
        </VoiceEternal>
        
        <SectionDivider symbol="☧" />
      </section>
      
      {/* ============================================
          CHAPTER 2: BURIED IN POMPEII
          ============================================ */}
      <section className="chapter chapter-2 era-ancient" id="roman-inheritance">
        <ChapterHeader 
          number="II" 
          greekNumeral="Β"
          title="Buried in Pompeii" 
          subtitle="Rome, 79 CE – 1819" 
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The Romans borrowed freely from Greek—vocabulary, gods, vices.
            They also preserved what would have otherwise been lost.
            On August 24, 79 CE, Vesuvius erupted and buried Pompeii 
            under twenty feet of volcanic ash.
          </VoiceUnseen>
          <VoiceUnseen>
            When excavations began in earnest during the 18th century,
            archaeologists found more than they bargained for.
          </VoiceUnseen>
        </div>
        
        <div className="artifact-callout">
          <div className="artifact-label">THE SECRET CABINET</div>
          <p className="artifact-text">
            The explicit frescoes, sculptures, and objects discovered in Pompeii
            were so shocking to 18th-century sensibilities that King Francis I of Naples
            ordered them locked away in the "Secret Cabinet" (Gabinetto Segreto)
            of the Naples Archaeological Museum—accessible only to scholars
            of "mature age and respected morals."
          </p>
        </div>
        
        <div className="narrative-block">
          <VoiceUnseen>
            The problem was one of language. How do scholars write about 
            explicit ancient artifacts without themselves becoming indecent?
            They needed a term that was clinical, classical, and safely 
            distanced from common vulgarity.
          </VoiceUnseen>
          <VoiceUnseen>
            They found it in the Greek.
          </VoiceUnseen>
        </div>
        
        <VoiceEternal>
          What the Greeks had named, the Victorians would resurrect—with a new purpose.
        </VoiceEternal>
        
        <SectionDivider symbol="✦" />
      </section>
      
      {/* ============================================
          CHAPTER 3: THE VICTORIAN INVENTION
          ============================================ */}
      <section className="chapter chapter-3 era-victorian" id="victorian-invention">
        <ChapterHeader 
          number="III" 
          greekNumeral="Γ"
          title="The Victorian Invention" 
          subtitle="England, 1857" 
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The word "pornography" first appeared in English in 1857.
            Not in a scandal sheet or a court transcript—but in a medical 
            dictionary. The Victorians, masters of speaking about the 
            unspeakable, had found their perfect euphemism.
          </VoiceUnseen>
        </div>
        
        <LexiconEntry
          word="pornography"
          pronunciation="/pɔːˈnɒɡrəfi/"
          partOfSpeech="noun"
          year="1857"
          definitions={[
            "A description of prostitutes or of prostitution, as a matter of public hygiene.",
            "The expression or suggestion of obscene or unchaste subjects in literature or art.",
          ]}
          etymology="From Greek pornográphos (writing about harlots), from pórnē (prostitute) + gráphein (to write)."
        />
        
        <PullQuote 
          attribution="Robley Dunglison" 
          year="Medical Lexicon, 1857"
        >
          PORNOGRAPHY: A treatise on prostitutes, or on prostitution, 
          in its sanitary relations.
        </PullQuote>
        
        <div className="narrative-block">
          <VoiceUnseen>
            Dr. Robley Dunglison's <em>Medical Lexicon</em> was the first English 
            dictionary to include the term. His definition was studiously clinical—
            pornography as public health concern, not moral failing.
            This medical framing would not last.
          </VoiceUnseen>
        </div>
        
        <TimelineEra era="The Obscene Publications Act" years="1857">
          <p>
            The same year "pornography" entered English dictionaries, 
            Parliament passed Lord Campbell's Act—the first modern obscenity law.
            The timing was not coincidental. A word was needed to name 
            what the law would now prosecute.
          </p>
        </TimelineEra>
        
        <ScholarProfile
          name="Lord John Campbell"
          epithet="The Lord Chief Justice"
          dates="1779–1861"
          contributions={[
            "British Lord Chancellor who authored the Obscene Publications Act of 1857",
            "Created the first legal definition of obscenity in English law",
            "Established 'deprave and corrupt' as the legal test for obscenity",
          ]}
          quote="The measure was intended to apply exclusively to works written for the single purpose of corrupting the morals of youth."
          quoteSource="House of Lords debate, 1857"
          era="victorian"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            By 1864, Webster's American Dictionary had adopted the term.
            By the 1880s, it had spread throughout legal discourse.
            The word had found its permanent home in English—but its 
            meaning was already shifting from the clinical to the moral.
          </VoiceUnseen>
        </div>
        
        <VoiceEternal>
          What began as medical vocabulary became legal weapon.
        </VoiceEternal>
        
        <SectionDivider symbol="◆" />
      </section>
      
      {/* ============================================
          CHAPTER 4: THE AMERICAN EVOLUTION
          ============================================ */}
      <section className="chapter chapter-4 era-modern" id="american-evolution">
        <ChapterHeader 
          number="IV" 
          greekNumeral="Δ"
          title="The American Evolution" 
          subtitle="United States, 1957–1973" 
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            A century after its English birth, the word arrived at the 
            United States Supreme Court. In a series of landmark cases,
            the justices struggled with a fundamental question: 
            what exactly is pornography?
          </VoiceUnseen>
        </div>
        
        <TimelineEra era="Roth v. United States" years="1957">
          <p>
            The Supreme Court ruled that obscenity was not protected by the 
            First Amendment. But distinguishing "pornography" from protected art
            proved nearly impossible. Justice William Brennan's test—"whether 
            to the average person, applying contemporary community standards"—
            created as many problems as it solved.
          </p>
        </TimelineEra>
        
        <PullQuote 
          attribution="Justice Potter Stewart" 
          year="Jacobellis v. Ohio, 1964"
        >
          I shall not today attempt further to define the kinds of material 
          I understand to be embraced within that shorthand description; 
          and perhaps I could never succeed in intelligibly doing so. 
          But I know it when I see it.
        </PullQuote>
        
        <div className="famous-quote-callout">
          <span className="quote-marker">"</span>
          <p className="quote-text">I know it when I see it.</p>
          <p className="quote-context">
            Perhaps the most famous admission of definitional failure 
            in American legal history. The word that the Greeks had 
            named precisely had become, in the hands of the law, 
            irreducibly subjective.
          </p>
        </div>
        
        <TimelineEra era="Miller v. California" years="1973">
          <p>
            The Court established the three-pronged "Miller test" that remains 
            the legal standard today. Material is obscene if:
            (1) the average person would find it appeals to prurient interest;
            (2) it depicts sexual conduct in a patently offensive way;
            (3) it lacks serious literary, artistic, political, or scientific value.
          </p>
        </TimelineEra>
        
        <ScholarProfile
          name="Chief Justice Warren Burger"
          epithet="The Conservative Reformer"
          dates="1907–1995"
          contributions={[
            "15th Chief Justice of the United States (1969–1986)",
            "Authored the Miller v. California opinion establishing obscenity standards",
            "Created the 'SLAPS test' (Serious Literary, Artistic, Political, or Scientific value)",
          ]}
          era="modern"
        />
        
        <VoiceEternal>
          The word had traveled from Greek marketplace to American courtroom—
          and still resisted precise definition.
        </VoiceEternal>
        
        <SectionDivider symbol="✧" />
      </section>
      
      {/* ============================================
          CHAPTER 5: THE DIGITAL PROLIFERATION
          ============================================ */}
      <section className="chapter chapter-5 era-digital" id="digital-age">
        <ChapterHeader 
          number="V" 
          greekNumeral="Ε"
          title="The Digital Proliferation" 
          subtitle="The Internet Era, 1991–Present" 
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The World Wide Web launched in 1991. Within a decade, the word
            "porn" had become one of the most searched terms in human history.
            The ancient Greek root had found its ultimate vector of transmission.
          </VoiceUnseen>
        </div>
        
        <div className="statistics-callout">
          <div className="stat-item">
            <span className="stat-number">~35%</span>
            <span className="stat-label">of all internet downloads</span>
            <span className="stat-source">estimated, 2006</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">4.2M</span>
            <span className="stat-label">websites worldwide</span>
            <span className="stat-source">estimated, 2020</span>
          </div>
        </div>
        
        <div className="narrative-block">
          <VoiceUnseen>
            The word itself underwent compression. "Pornography" became "porn"—
            a truncation that mirrored the internet's impatience with syllables.
            The abbreviation, rare before the 1990s, became ubiquitous.
          </VoiceUnseen>
        </div>
        
        <WordMorphology
          parts={[
            { text: "pornography", label: "1857", meaning: "6 syllables" },
            { text: "porno", label: "~1960s", meaning: "3 syllables" },
          ]}
          result="porn (~1990s) — 1 syllable"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The digital age also fractured the word into countless compounds:
            revenge porn, deepfake porn, food porn, real estate porn, 
            poverty porn, ruin porn. The suffix detached from its sexual 
            origin and came to mean any content designed to provoke 
            visceral, often voyeuristic, response.
          </VoiceUnseen>
        </div>
        
        <div className="compound-grid">
          <div className="compound-item">
            <span className="compound-word">food porn</span>
            <span className="compound-def">Images of food designed to be visually alluring</span>
          </div>
          <div className="compound-item">
            <span className="compound-word">ruin porn</span>
            <span className="compound-def">Aestheticized photographs of urban decay</span>
          </div>
          <div className="compound-item">
            <span className="compound-word">poverty porn</span>
            <span className="compound-def">Media exploiting images of the poor</span>
          </div>
          <div className="compound-item">
            <span className="compound-word">doom porn</span>
            <span className="compound-def">Content designed to provoke anxiety about collapse</span>
          </div>
        </div>
        
        <VoiceEternal>
          The word that meant "selling" had become the word for "selling attention."
        </VoiceEternal>
        
        <SectionDivider symbol="❖" />
      </section>
      
      {/* ============================================
          CHAPTER 6: THE LINGUISTIC LEGACY
          ============================================ */}
      <section className="chapter chapter-6 era-present" id="linguistic-legacy">
        <ChapterHeader 
          number="VI" 
          greekNumeral="Ζ"
          title="The Linguistic Legacy" 
          subtitle="Today" 
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            Two and a half millennia after a Greek verb described the act of selling,
            its descendant saturates global discourse. The word appears in legal codes,
            academic journals, news headlines, and everyday conversation—still 
            carrying traces of its origins.
          </VoiceUnseen>
        </div>
        
        <div className="etymology-tree">
          <div className="tree-root">
            <span className="root-word">*per- (PIE)</span>
            <span className="root-meaning">"to traffic, to sell"</span>
          </div>
          <div className="tree-branch">
            <span className="branch-word">πέρνημι (pérnēmi)</span>
            <span className="branch-meaning">to sell</span>
          </div>
          <div className="tree-branch">
            <span className="branch-word">πόρνη (pórnē)</span>
            <span className="branch-meaning">prostitute, "one who is sold"</span>
          </div>
          <div className="tree-branch">
            <span className="branch-word">πορνογράφος (pornográphos)</span>
            <span className="branch-meaning">one who writes about prostitutes</span>
          </div>
          <div className="tree-branch">
            <span className="branch-word">pornography (1857)</span>
            <span className="branch-meaning">writings/images about prostitution</span>
          </div>
          <div className="tree-branch final">
            <span className="branch-word">porn (1990s–)</span>
            <span className="branch-meaning">visceral, voyeuristic content</span>
          </div>
        </div>
        
        <div className="narrative-block">
          <VoiceUnseen>
            Etymology rarely changes meaning. But it illuminates origin.
            The word we cannot stop using began with an act of commodification—
            the selling of human bodies. That ghost lingers in every usage,
            whether we acknowledge it or not.
          </VoiceUnseen>
        </div>
        
        <VoiceEternal>
          Every word carries its history. This one carries 2,500 years of commerce, 
          shame, and the human attempt to name what we cannot stop doing.
        </VoiceEternal>
      </section>
      
      {/* ============================================
          EPILOGUE
          ============================================ */}
      <section className="epilogue">
        <div className="epilogue-content">
          <RevealedBlock delay={0}>
            <h2 className="epilogue-title">Πόρνη</h2>
          </RevealedBlock>
          
          <RevealedBlock className="epilogue-text" delay={200}>
            The word in your vocabulary represents millennia of human commerce,
            morality, and meaning-making. What began as marketplace transaction
            became moral panic, legal category, internet phenomenon, and 
            linguistic metaphor.
          </RevealedBlock>
          
          <RevealedBlock className="epilogue-text" delay={400}>
            Language evolves, but etymology persists.
          </RevealedBlock>
          
          <RevealedBlock className="epilogue-closing" delay={600}>
            You will never read the word the same way.
          </RevealedBlock>
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
              <li>Liddell, H.G. & Scott, R. <em>A Greek-English Lexicon</em> (9th ed., 1940)</li>
              <li>Oxford English Dictionary, <em>s.v.</em> "pornography" (3rd ed., 2006)</li>
              <li>Chantraine, P. <em>Dictionnaire étymologique de la langue grecque</em> (1968)</li>
              <li>Beekes, R. <em>Etymological Dictionary of Greek</em> (2010)</li>
            </ul>
          </div>
          
          <div className="source-category">
            <h4>Historical Context</h4>
            <ul>
              <li>Hunt, L. (ed.) <em>The Invention of Pornography</em> (1993)</li>
              <li>Kendrick, W. <em>The Secret Museum: Pornography in Modern Culture</em> (1987)</li>
              <li>Sigel, L. <em>Governing Pleasures: Pornography and Social Change</em> (2002)</li>
              <li>Clarke, J.R. <em>Looking at Lovemaking: Constructions of Sexuality in Roman Art</em> (1998)</li>
            </ul>
          </div>
          
          <div className="source-category">
            <h4>Legal History</h4>
            <ul>
              <li><em>Roth v. United States</em>, 354 U.S. 476 (1957)</li>
              <li><em>Jacobellis v. Ohio</em>, 378 U.S. 184 (1964)</li>
              <li><em>Miller v. California</em>, 413 U.S. 15 (1973)</li>
              <li>Manchester, C. <em>A History of the Crime of Obscene Libel</em> (1991)</li>
            </ul>
          </div>
        </div>
      </footer>
    </VisualEssay>
  );
}



