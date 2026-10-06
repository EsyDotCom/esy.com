/* eslint-disable react/no-unescaped-entities */
"use client";

/**
 * SOLD: THE ETYMOLOGY OF PORNOGRAPHY
 * ===================================
 * A Visual Essay on Linguistic History
 * 
 * From ancient Greek slave markets to modern search bars—
 * the 2,500-year journey of a word born in commerce,
 * shaped by scandal, and transformed by technology.
 * 
 * Visual Treatment: Photorealistic-Hybrid with Typography as Hero
 * Built from SPEC.md using research package (FIGURES.md, TIMELINE.md, CITATIONS.md)
 */

import React, { useState, useEffect } from 'react';
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
import './sold.css';

// ===========================================
// ETYMOLOGY TREE PROGRESS
// ===========================================

const EtymologyTreeProgress: React.FC<{ progress: number }> = ({ progress }) => {
  const branches = [
    { label: '*per-', meaning: 'to sell (PIE)', position: 0 },
    { label: 'πέρνημι', meaning: 'to sell', position: 18 },
    { label: 'πόρνη', meaning: 'prostitute', position: 36 },
    { label: 'πορνογράφος', meaning: 'writer of', position: 54 },
    { label: 'pornography', meaning: '1857', position: 72 },
    { label: 'porn', meaning: 'compounds', position: 90 },
  ];
  
  return (
    <div className="etymology-tree-progress" aria-label={`Reading progress: ${Math.round(progress * 100)}%`}>
      <div className="tree-trunk">
        <div className="tree-growth" style={{ height: `${progress * 100}%` }} />
        {branches.map((branch) => (
          <div 
            key={branch.label}
            className={`tree-branch ${progress * 100 >= branch.position ? 'grown' : ''}`}
            style={{ top: `${branch.position}%` }}
          >
            <span className="branch-line" />
            <div className="branch-content">
              <span className="branch-label">{branch.label}</span>
              <span className="branch-meaning">{branch.meaning}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===========================================
// WORD MORPHOLOGY COMPONENT (From Spec Layer 4)
// ===========================================

interface MorphologyPart {
  greek: string;
  transliteration: string;
  meaning: string;
}

interface WordMorphologyProps {
  parts: MorphologyPart[];
  result: { greek: string; transliteration: string; meaning: string };
  era?: 'ancient' | 'victorian' | 'modern';
}

const WordMorphology: React.FC<WordMorphologyProps> = ({ parts, result, era = 'ancient' }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  return (
    <div ref={ref} className={`word-morphology era-${era} ${isVisible ? 'visible' : ''}`}>
      <div className="morphology-equation">
        {parts.map((part, index) => (
          <React.Fragment key={part.greek}>
            <div className="morphology-part" style={{ animationDelay: `${index * 200}ms` }}>
              <span className="part-greek">{part.greek}</span>
              <span className="part-transliteration">{part.transliteration}</span>
              <span className="part-meaning">{part.meaning}</span>
            </div>
            {index < parts.length - 1 && <span className="morphology-operator">+</span>}
          </React.Fragment>
        ))}
        <span className="morphology-operator">=</span>
        <div className="morphology-result" style={{ animationDelay: `${parts.length * 200 + 100}ms` }}>
          <span className="result-greek">{result.greek}</span>
          <span className="result-transliteration">{result.transliteration}</span>
          <span className="result-meaning">{result.meaning}</span>
        </div>
      </div>
    </div>
  );
};

// ===========================================
// ETYMOLOGY CALLOUT (Large Greek Word Display)
// ===========================================

interface EtymologyCalloutProps {
  greek: string;
  transliteration: string;
  meaning: string;
  notes?: string;
  era?: 'ancient' | 'victorian' | 'legal' | 'digital';
}

const EtymologyCallout: React.FC<EtymologyCalloutProps> = ({
  greek,
  transliteration,
  meaning,
  notes,
  era = 'ancient',
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  return (
    <div ref={ref} className={`etymology-callout era-${era} ${isVisible ? 'visible' : ''}`}>
      <span className="callout-greek">{greek}</span>
      <span className="callout-transliteration">{transliteration}</span>
      <p className="callout-meaning">{meaning}</p>
      {notes && <p className="callout-notes">{notes}</p>}
    </div>
  );
};

// ===========================================
// SCHOLAR PROFILE (From Spec Layer 4)
// ===========================================

interface ScholarProfileProps {
  name: string;
  epithet: string;
  dates: string;
  contributions: string[];
  quote?: string;
  quoteSource?: string;
  era: 'ancient' | 'victorian' | 'legal' | 'digital';
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
      <div className="scholar-monogram">{name.charAt(0)}</div>
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
// CHAPTER HEADER (From Spec Layer 4)
// ===========================================

interface ChapterHeaderProps {
  number: string;
  title: string;
  location: string;
  metaphor?: string;
}

const ChapterHeader: React.FC<ChapterHeaderProps> = ({ number, title, location, metaphor }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  return (
    <div ref={ref} className={`chapter-header ${isVisible ? 'visible' : ''}`}>
      <span className="chapter-number">{number}</span>
      <h2 className="chapter-title">{title}</h2>
      <span className="chapter-location">{location}</span>
      {metaphor && <p className="chapter-metaphor">{metaphor}</p>}
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
// DICTIONARY ENTRY (From Spec Layer 4)
// ===========================================

interface DictionaryEntryProps {
  word: string;
  pronunciation?: string;
  partOfSpeech: string;
  definition: string;
  etymology: string;
  source: string;
  year: string;
}

const DictionaryEntry: React.FC<DictionaryEntryProps> = ({
  word,
  pronunciation,
  partOfSpeech,
  definition,
  etymology,
  source,
  year,
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  return (
    <div ref={ref} className={`dictionary-entry ${isVisible ? 'visible' : ''}`}>
      <div className="dict-header">
        <h4 className="dict-word">{word}</h4>
        {pronunciation && <span className="dict-pronunciation">{pronunciation}</span>}
        <span className="dict-pos">{partOfSpeech}</span>
      </div>
      <p className="dict-definition">{definition}</p>
      <div className="dict-etymology">
        <span className="etym-label">Etymology:</span> {etymology}
      </div>
      <div className="dict-source">
        <span className="source-name">{source}</span>
        <span className="source-year">{year}</span>
      </div>
    </div>
  );
};

// ===========================================
// LEGAL MILESTONE (From Spec Layer 4)
// ===========================================

interface LegalMilestoneProps {
  caseName: string;
  year: string;
  significance: string;
}

const LegalMilestone: React.FC<LegalMilestoneProps> = ({ caseName, year, significance }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  return (
    <div ref={ref} className={`legal-milestone ${isVisible ? 'visible' : ''}`}>
      <div className="milestone-year">{year}</div>
      <div className="milestone-content">
        <h4 className="milestone-case">{caseName}</h4>
        <p className="milestone-significance">{significance}</p>
      </div>
    </div>
  );
};

// ===========================================
// COMPOUND WORD GRID (From Spec Layer 4)
// ===========================================

interface CompoundWord {
  word: string;
  meaning: string;
  yearCoined: string;
}

const CompoundWordGrid: React.FC<{ compounds: CompoundWord[] }> = ({ compounds }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  return (
    <div ref={ref} className={`compound-grid ${isVisible ? 'visible' : ''}`}>
      {compounds.map((compound, index) => (
        <div 
          key={compound.word} 
          className="compound-item"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <span className="compound-word">{compound.word}</span>
          <span className="compound-meaning">{compound.meaning}</span>
          <span className="compound-year">{compound.yearCoined}</span>
        </div>
      ))}
    </div>
  );
};

// ===========================================
// MAIN CLIENT COMPONENT
// ===========================================

export default function SoldClient() {
  const { progress: scrollProgress } = useCinematicScroll();
  const prefersReduced = useReducedMotion();
  
  const compoundWords: CompoundWord[] = [
    { word: 'food porn', meaning: 'Visually alluring food imagery', yearCoined: '~2006' },
    { word: 'ruin porn', meaning: 'Aestheticized urban decay', yearCoined: '~2009' },
    { word: 'poverty porn', meaning: 'Exploitation of deprivation', yearCoined: '~2008' },
    { word: 'doom porn', meaning: 'Apocalyptic content', yearCoined: '~2010s' },
  ];

  return (
    <VisualEssay className="sold-essay">
      {/* Etymology Tree Progress */}
      <EtymologyTreeProgress progress={scrollProgress} />
      
      {/* ============================================
          HERO: THE SELLING ROOT
          ============================================ */}
      <header className="hero-section">
        <div className="hero-background">
          <div className="hero-pattern" aria-hidden="true" />
          <div className="hero-gradient" />
        </div>
        
        <div className="hero-content">
          <p className="hero-kicker">A Visual Essay on Etymology</p>
          
          <div className="hero-title">
            <span className="title-greek">Πόρνη</span>
            <span className="title-translation">one who is sold</span>
          </div>
          
          <h1 className="hero-main-title">SOLD</h1>
          <p className="hero-subtitle">
            From ancient marketplace to modern search bar—the 2,500-year 
            journey of a word born in commerce, shaped by scandal, 
            and transformed by technology
          </p>
          
          <div className="hero-scroll-prompt">
            <span>Trace the etymology</span>
            <div className="scroll-line" />
          </div>
        </div>
      </header>
      
      {/* ============================================
          PROLOGUE
          ============================================ */}
      <section className="prologue">
        <div className="prologue-content">
          <RevealedBlock className="prologue-large" delay={0}>
            Every word has a birthplace.
          </RevealedBlock>
          <RevealedBlock delay={200}>
            This one was born in the slave markets of ancient Athens, 
            where human beings were bought and sold like pottery.
          </RevealedBlock>
          <RevealedBlock delay={400}>
            For 2,500 years, this word has traveled through empires, buried cities, 
            courtrooms, and fiber optic cables. It was clinical vocabulary for Greek 
            merchants. It was a medical term for Victorian doctors. It was an unsolvable 
            puzzle for Supreme Court justices.
          </RevealedBlock>
          <RevealedBlock delay={600}>
            And now it is one of the most searched words in human history.
          </RevealedBlock>
          <RevealedBlock className="prologue-large" delay={800}>
            This is its story.
          </RevealedBlock>
        </div>
      </section>
      
      {/* ============================================
          CHAPTER 1: THE MARKETPLACE
          ============================================ */}
      <section className="chapter chapter-1 era-ancient" id="marketplace">
        <ChapterHeader 
          number="I" 
          title="The Marketplace"
          location="Athens, ~500 BCE"
          metaphor="Words are commodities — language is born in transaction"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            In the agora of ancient Athens, commerce was the heartbeat of civilization.
            Olive oil, pottery, grain, slaves — everything had a price. And language,
            ever practical, developed vocabulary for every transaction.
          </VoiceUnseen>
        </div>
        
        <EtymologyCallout
          greek="πέρνημι"
          transliteration="pérnēmi"
          meaning="to sell, to export"
          notes="The verb at the root of it all — the act of selling, particularly of slaves for export."
          era="ancient"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            From <em>pérnēmi</em> — to sell — came <em>pórnē</em>: literally, 
            "one who is sold." In practice, a prostitute. But not any prostitute.
            The <em>pórnē</em> was distinguished from the <em>hetaira</em>, the 
            educated companion. The <em>pórnē</em> was commodity, not companion — 
            merchandise with a market price.
          </VoiceUnseen>
        </div>
        
        <EtymologyCallout
          greek="πόρνη"
          transliteration="pórnē"
          meaning="prostitute — literally 'one who is sold'"
          notes="The feminine noun. The male form, πόρνος (pórnos), meant male prostitute or fornicator."
          era="ancient"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The Greeks, ever precise in their documentation, had a word for those
            who wrote about such commerce. When <em>pórnē</em> met 
            <em>gráphein</em> — to write — a compound was born.
          </VoiceUnseen>
        </div>
        
        <WordMorphology
          parts={[
            { greek: 'πόρνη', transliteration: 'pórnē', meaning: 'prostitute' },
            { greek: 'γράφειν', transliteration: 'gráphein', meaning: 'to write' },
          ]}
          result={{
            greek: 'πορνογράφος',
            transliteration: 'pornográphos',
            meaning: 'one who writes of prostitutes',
          }}
          era="ancient"
        />
        
        <ScholarProfile
          name="Athenaeus of Naucratis"
          epithet="The Documenter"
          dates="c. 170–230 CE"
          contributions={[
            "Greek-Egyptian author of 'Deipnosophistae' (Dinner-Table Philosophers)",
            "Preserved fragments of over 800 lost Greek texts",
            "First known use of the compound 'pornográphos'",
          ]}
          quote="The pornographoi wrote of the women who could be bought in the marketplace, their names and their prices."
          quoteSource="Deipnosophistae, Book XIII"
          era="ancient"
        />
        
        <VoiceEternal>
          The word was clinical. Descriptive. Not yet forbidden — merely precise.
        </VoiceEternal>
        
        <SectionDivider symbol="☧" />
      </section>
      
      {/* ============================================
          CHAPTER 2: THE BURIED CITY
          ============================================ */}
      <section className="chapter chapter-2 era-buried" id="buried-city">
        <ChapterHeader 
          number="II" 
          title="The Buried City"
          location="Pompeii, 79 CE – 1819"
          metaphor="Preservation creates scandal — time buries, then reveals"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            On August 24, 79 CE, Mount Vesuvius erupted and buried Pompeii 
            under twenty feet of volcanic ash. The city became a time capsule — 
            its citizens frozen mid-gesture, its frescoes preserved in perfect color, 
            its private pleasures sealed from sight for seventeen centuries.
          </VoiceUnseen>
          <VoiceUnseen>
            When systematic excavation began in 1748, commissioned by Charles VII 
            of Naples, the diggers found more than architecture. They found 
            intimate imagery that shocked 18th-century sensibilities.
          </VoiceUnseen>
        </div>
        
        <div className="secret-cabinet-callout">
          <div className="cabinet-label">GABINETTO SEGRETO</div>
          <div className="cabinet-content">
            <p>The Secret Cabinet — established 1819</p>
            <p className="cabinet-rule">
              "Accessible only to persons of mature age and respected morals."
            </p>
            <p className="cabinet-note">
              King Francis I of Naples ordered the explicit artifacts sequestered.
              A special room. A locked door. A new problem: how to discuss 
              what could not be displayed?
            </p>
          </div>
        </div>
        
        <div className="narrative-block">
          <VoiceUnseen>
            The problem wasn't what they found — it was what to call it. 
            How do Victorian-era scholars write about Roman erotica without 
            themselves becoming indecent? They needed a term that was clinical, 
            classical, safely distanced from vulgarity.
          </VoiceUnseen>
          <VoiceUnseen>
            They found it in the Greek.
          </VoiceUnseen>
        </div>
        
        <VoiceEternal>
          What ancient Greeks had named, modern Europeans would resurrect — 
          with a new purpose entirely.
        </VoiceEternal>
        
        <SectionDivider symbol="⚱" />
      </section>
      
      {/* ============================================
          CHAPTER 3: THE VICTORIAN INVENTION
          ============================================ */}
      <section className="chapter chapter-3 era-victorian" id="victorian">
        <ChapterHeader 
          number="III" 
          title="The Victorian Invention"
          location="England, 1857"
          metaphor="Naming creates category — the word invents the crime"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The word "pornography" first appeared in English in 1857. 
            Not in a scandal sheet or a court transcript — but in a medical 
            dictionary. The Victorians, masters of speaking about the unspeakable, 
            had found their perfect euphemism.
          </VoiceUnseen>
        </div>
        
        <DictionaryEntry
          word="pornography"
          pronunciation="/pɔːˈnɒɡrəfi/"
          partOfSpeech="noun"
          definition="A treatise on prostitutes, or on prostitution, in its sanitary relations."
          etymology="From Greek pornográphos, from pórnē (prostitute) + gráphein (to write)."
          source="Dunglison's Medical Lexicon"
          year="1857"
        />
        
        <ScholarProfile
          name="Dr. Robley Dunglison"
          epithet="The Definer"
          dates="1798–1869"
          contributions={[
            "English-American physician, personal doctor to Thomas Jefferson",
            "Compiled the influential 'Medical Lexicon' (first edition 1833)",
            "First to include 'pornography' in an English dictionary (1857)",
            "Framed the term as public health vocabulary, not moral category",
          ]}
          quote="PORNOGRAPHY: A treatise on prostitutes, or on prostitution, in its sanitary relations."
          quoteSource="Medical Lexicon, 1857 edition"
          era="victorian"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The timing was not coincidental. That same year, Parliament passed 
            Lord Campbell's Obscene Publications Act — the first comprehensive 
            obscenity law in English legal history. A word and a law, born together.
          </VoiceUnseen>
        </div>
        
        <ScholarProfile
          name="Lord John Campbell"
          epithet="The Legislator"
          dates="1779–1861"
          contributions={[
            "Lord Chief Justice of the Queen's Bench",
            "Lord Chancellor of Great Britain (1859–1861)",
            "Authored the Obscene Publications Act 1857",
            "Created the legal framework that would define obscenity for a century",
          ]}
          quote="The measure was intended to apply exclusively to works written for the single purpose of corrupting the morals of youth."
          quoteSource="House of Lords debate, 1857"
          era="victorian"
        />
        
        <PullQuote attribution="Historical observation" year="1857">
          The word and the law arrived in the same year. What Victorian doctors 
          defined, Victorian courts could now prosecute.
        </PullQuote>
        
        <VoiceEternal>
          What began as medical vocabulary became legal weapon.
        </VoiceEternal>
        
        <SectionDivider symbol="⚖" />
      </section>
      
      {/* ============================================
          CHAPTER 4: THE COURTROOM
          ============================================ */}
      <section className="chapter chapter-4 era-legal" id="courtroom">
        <ChapterHeader 
          number="IV" 
          title="The Courtroom"
          location="United States, 1957–1973"
          metaphor="Definition fails — law cannot name what it prosecutes"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            A century after its English birth, the word arrived at the 
            United States Supreme Court. In a series of landmark cases, 
            the justices struggled with a fundamental question: 
            what exactly is pornography?
          </VoiceUnseen>
        </div>
        
        <LegalMilestone
          caseName="Roth v. United States"
          year="1957"
          significance="Obscenity declared unprotected by First Amendment. But defining it proved nearly impossible. Justice Brennan's 'contemporary community standards' test created as many problems as it solved."
        />
        
        <div className="famous-quote-block">
          <div className="quote-decoration">"</div>
          <blockquote className="the-quote">
            I shall not today attempt further to define the kinds of material 
            I understand to be embraced within that shorthand description; 
            and perhaps I could never succeed in intelligibly doing so. 
            But I know it when I see it.
          </blockquote>
          <cite className="quote-attribution">
            Justice Potter Stewart — <em>Jacobellis v. Ohio</em>, 1964
          </cite>
        </div>
        
        <ScholarProfile
          name="Justice Potter Stewart"
          epithet="The Honest Judge"
          dates="1915–1985"
          contributions={[
            "Associate Justice of the U.S. Supreme Court (1958–1981)",
            "Authored the most famous admission of definitional failure",
            "Later called his phrase 'the best I could do'",
            "Acknowledged the impossibility of precise legal definition",
          ]}
          era="legal"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            Nine years later, the Court tried again. Chief Justice Warren Burger's 
            opinion in <em>Miller v. California</em> (1973) established the 
            three-pronged test that remains law today:
          </VoiceUnseen>
        </div>
        
        <div className="miller-test">
          <h4>The Miller Test (1973)</h4>
          <ol>
            <li>Whether the average person, applying contemporary community standards, would find the work appeals to the <em>prurient interest</em>;</li>
            <li>Whether the work depicts sexual conduct in a <em>patently offensive</em> way;</li>
            <li>Whether the work <em>lacks serious</em> literary, artistic, political, or scientific value.</li>
          </ol>
        </div>
        
        <VoiceEternal>
          The Greeks had named it precisely. Two thousand years later, 
          the law could only shrug: "I know it when I see it."
        </VoiceEternal>
        
        <SectionDivider symbol="⚡" />
      </section>
      
      {/* ============================================
          CHAPTER 5: THE DIGITAL FLOOD
          ============================================ */}
      <section className="chapter chapter-5 era-digital" id="digital">
        <ChapterHeader 
          number="V" 
          title="The Digital Flood"
          location="1991 – Present"
          metaphor="Compression — words shrink as content explodes"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            On August 6, 1991, the World Wide Web went public. 
            Within a decade, the word that Victorian doctors had coined 
            for medical journals became one of the most searched terms 
            in human history.
          </VoiceUnseen>
        </div>
        
        <div className="compression-visual">
          <div className="compression-stage">
            <span className="comp-word">pornography</span>
            <span className="comp-syllables">6 syllables</span>
            <span className="comp-era">1857</span>
          </div>
          <div className="compression-arrow">→</div>
          <div className="compression-stage">
            <span className="comp-word">porno</span>
            <span className="comp-syllables">3 syllables</span>
            <span className="comp-era">~1960s</span>
          </div>
          <div className="compression-arrow">→</div>
          <div className="compression-stage final">
            <span className="comp-word">porn</span>
            <span className="comp-syllables">1 syllable</span>
            <span className="comp-era">~1990s</span>
          </div>
        </div>
        
        <div className="narrative-block">
          <VoiceUnseen>
            The internet didn't invent pornography. It didn't even invent 
            the word. But it compressed both — the word from six syllables 
            to one, the content from locked cabinets to infinite accessibility.
          </VoiceUnseen>
          <VoiceUnseen>
            And then something unexpected happened: the suffix detached 
            from its origin entirely.
          </VoiceUnseen>
        </div>
        
        <VoiceEternal>
          The word that meant "selling" now means "selling attention."
        </VoiceEternal>
        
        <SectionDivider symbol="◈" />
      </section>
      
      {/* ============================================
          CHAPTER 6: THE SEMANTIC DRIFT
          ============================================ */}
      <section className="chapter chapter-6 era-modern" id="semantic-drift">
        <ChapterHeader 
          number="VI" 
          title="The Semantic Drift"
          location="2010s – Present"
          metaphor="Detachment — the suffix leaves its origin behind"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            Somewhere in the 2000s, "-porn" became a productive suffix 
            in English, detached from its sexual meaning. The word that 
            began in slave markets now appears in food magazines and 
            urban planning journals.
          </VoiceUnseen>
        </div>
        
        <CompoundWordGrid compounds={compoundWords} />
        
        <div className="narrative-block">
          <VoiceUnseen>
            What do these compounds have in common? They describe content 
            designed to provoke visceral, often voyeuristic response. 
            Content that sells attention. Content that commodifies viewing.
          </VoiceUnseen>
          <VoiceUnseen>
            The marketplace where the word was born — πέρνημι, to sell — 
            echoes in every compound. The selling never stopped. 
            Only what was sold changed.
          </VoiceUnseen>
        </div>
        
        <VoiceEternal>
          Etymology persists. Even when we forget, the word remembers.
        </VoiceEternal>
      </section>
      
      {/* ============================================
          EPILOGUE: THE ETYMOLOGY TREE
          ============================================ */}
      <section className="epilogue">
        <div className="etymology-tree-full">
          <div className="tree-level root">
            <span className="tree-word">*per-</span>
            <span className="tree-meaning">Proto-Indo-European: to traffic, to sell</span>
          </div>
          <div className="tree-connector" />
          <div className="tree-level">
            <span className="tree-word">πέρνημι</span>
            <span className="tree-meaning">Ancient Greek: to sell, to export</span>
          </div>
          <div className="tree-connector" />
          <div className="tree-level">
            <span className="tree-word">πόρνη</span>
            <span className="tree-meaning">prostitute — "one who is sold"</span>
          </div>
          <div className="tree-connector" />
          <div className="tree-level">
            <span className="tree-word">πορνογράφος</span>
            <span className="tree-meaning">one who writes of prostitutes</span>
          </div>
          <div className="tree-connector" />
          <div className="tree-level">
            <span className="tree-word">pornography</span>
            <span className="tree-meaning">English, 1857: writings about prostitution</span>
          </div>
          <div className="tree-connector" />
          <div className="tree-level final">
            <span className="tree-word">porn</span>
            <span className="tree-meaning">visceral, voyeuristic content</span>
          </div>
          <div className="tree-branches">
            <span>food porn</span>
            <span>ruin porn</span>
            <span>poverty porn</span>
            <span>doom porn</span>
          </div>
        </div>
        
        <div className="epilogue-content">
          <RevealedBlock delay={0}>
            <div className="epilogue-greek">Πόρνη</div>
          </RevealedBlock>
          
          <RevealedBlock delay={200}>
            <p className="epilogue-translation">one who is sold</p>
          </RevealedBlock>
          
          <RevealedBlock className="epilogue-text" delay={400}>
            The word in your vocabulary represents millennia of human transaction.
            From Greek marketplaces to Victorian dictionaries to digital search bars,
            it carries the ghost of its commercial origin.
          </RevealedBlock>
          
          <RevealedBlock className="epilogue-text" delay={600}>
            Language evolves. Etymology persists.
          </RevealedBlock>
          
          <RevealedBlock className="epilogue-closing" delay={800}>
            You will never read the word the same way.
          </RevealedBlock>
        </div>
      </section>
      
      {/* ============================================
          SOURCES (From CITATIONS.md)
          ============================================ */}
      <footer className="sources-section">
        <h3>Sources & Further Reading</h3>
        
        <div className="sources-grid">
          <div className="source-category">
            <h4>Etymology & Linguistics</h4>
            <ul>
              <li>Liddell, H.G. & Scott, R. <em>A Greek-English Lexicon</em> (9th ed., 1940)</li>
              <li>Oxford English Dictionary, <em>s.v.</em> "pornography" (3rd ed., 2006)</li>
              <li>Beekes, R. <em>Etymological Dictionary of Greek</em> (2010)</li>
              <li>Chantraine, P. <em>Dictionnaire étymologique de la langue grecque</em> (1968)</li>
            </ul>
          </div>
          
          <div className="source-category">
            <h4>Historical Context</h4>
            <ul>
              <li>Athenaeus, <em>Deipnosophistae</em> (Loeb Classical Library)</li>
              <li>Hunt, L. (ed.) <em>The Invention of Pornography</em> (1993)</li>
              <li>Kendrick, W. <em>The Secret Museum: Pornography in Modern Culture</em> (1987)</li>
              <li>Sigel, L. <em>Governing Pleasures: Pornography and Social Change</em> (2002)</li>
            </ul>
          </div>
          
          <div className="source-category">
            <h4>Legal Sources</h4>
            <ul>
              <li><em>Roth v. United States</em>, 354 U.S. 476 (1957)</li>
              <li><em>Jacobellis v. Ohio</em>, 378 U.S. 184 (1964)</li>
              <li><em>Miller v. California</em>, 413 U.S. 15 (1973)</li>
              <li>Obscene Publications Act 1857 (20 & 21 Vict. c. 83)</li>
            </ul>
          </div>
        </div>
      </footer>
    </VisualEssay>
  );
}



