/* eslint-disable react/no-unescaped-entities */
"use client";

/**
 * ANIMA — THE ORIGIN OF THE WORD ANIMAL
 * ======================================
 * A Photorealistic Visual Essay on Etymology
 * 
 * From Latin "anima" (breath, soul) to modern zoological classification—
 * tracing 2,500 years of the word that defined life itself.
 * 
 * Visual Treatment: Photorealistic with Era-Evolving Typography
 * - Classical inscriptions (Roman era)
 * - Medieval manuscript illumination (Bestiaries)
 * - Renaissance naturalist style (Scientific Revolution)
 * - Modern biological typography (Linnaeus onwards)
 * 
 * Color Palette:
 * - Ancient: Warm terracotta, papyrus cream, aged bronze
 * - Medieval: Vellum gold, manuscript vermillion, forest green
 * - Renaissance: Sepia, burnt umber, naturalist greens
 * - Modern: Clinical white, taxonomy black, specimen blue
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  VisualEssay,
  NarrationBlock,
  VoiceUnseen,
  VoiceEternal,
  PullQuote,
  SectionTitle,
  SectionDivider,
  useCinematicScroll,
  useIntersectionReveal,
  useSectionProgress,
  useReducedMotion,
  useParallax,
} from '@/components/VisualEssay';
import './the-origin-of-animal.css';

// ===========================================
// IMAGE SOURCES - Museum & Archive References
// ===========================================

const IMAGES = {
  // Hero - Roman bronze of wolf or ancient animal sculpture
  hero: {
    main: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1920&q=80',
    alt: 'Close-up of an animal eye reflecting light, symbolizing the breath of life',
  },
  
  // Chapter 1: Ancient Origins
  ancient: {
    romanInscription: 'https://images.unsplash.com/photo-1584707824245-f67bad4d0e16?w=1200&q=80',
    romanInscriptionAlt: 'Ancient Roman stone inscription with Latin text',
    greekPhilosophy: 'https://images.unsplash.com/photo-1608036066528-99f07c3190b5?w=1200&q=80',
    greekPhilosophyAlt: 'Ancient Greek philosophy manuscript or bust',
    aristotle: 'https://images.unsplash.com/photo-1564490292125-2e3c78a0c5b8?w=800&q=80',
    aristotleAlt: 'Classical Greek philosophical imagery',
  },
  
  // Chapter 2: Medieval Bestiaries
  medieval: {
    bestiary: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80',
    bestiaryAlt: 'Medieval illuminated manuscript page',
    monastery: 'https://images.unsplash.com/photo-1569587112025-0d460e81a126?w=1200&q=80',
    monasteryAlt: 'Medieval monastery scriptorium setting',
    lion: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=1200&q=80',
    lionAlt: 'Majestic lion portrait representing medieval bestiary symbolism',
  },
  
  // Chapter 3: Renaissance & Scientific Revolution
  renaissance: {
    naturalist: 'https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=1200&q=80',
    naturalistAlt: 'Renaissance-style natural history illustration',
    cabinet: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80',
    cabinetAlt: 'Cabinet of curiosities with natural specimens',
    skeleton: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?w=1200&q=80',
    skeletonAlt: 'Anatomical study of animal skeleton',
  },
  
  // Chapter 4: Linnaeus & Classification
  linnaeus: {
    taxonomy: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1200&q=80',
    taxonomyAlt: 'Scientific classification documents or botanical plates',
    specimens: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=1200&q=80',
    specimensAlt: 'Natural history museum specimens',
    herbarium: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=1200&q=80',
    herbariumAlt: 'Scientific herbarium or specimen collection',
  },
  
  // Chapter 5: Darwin & Evolution
  darwin: {
    finches: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=1200&q=80',
    finchesAlt: 'Bird species representing evolutionary diversity',
    tree: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&q=80',
    treeAlt: 'Tree of life representing evolutionary branching',
    fossils: 'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=1200&q=80',
    fossilsAlt: 'Ancient fossils showing evolutionary history',
  },
  
  // Chapter 6: Modern Understanding
  modern: {
    dna: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&q=80',
    dnaAlt: 'DNA double helix representing modern biological understanding',
    diversity: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=1200&q=80',
    diversityAlt: 'Diverse animal species representing the animal kingdom',
    microscope: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&q=80',
    microscopeAlt: 'Modern scientific research equipment',
  },
  
  // Epilogue
  epilogue: {
    eye: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1920&q=80',
    eyeAlt: 'Animal eye closeup representing the living soul',
  },
};

// ===========================================
// SCROLL-REVEALED NARRATIVE BLOCK
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
// CHAPTER HEADER WITH ERA TYPOGRAPHY
// ===========================================

interface ChapterHeaderProps {
  number: string;
  title: string;
  subtitle: string;
  era: 'ancient' | 'medieval' | 'renaissance' | 'enlightenment' | 'modern';
}

const ChapterHeader: React.FC<ChapterHeaderProps> = ({ number, title, subtitle, era }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  return (
    <div ref={ref} className={`chapter-header era-${era} ${isVisible ? 'visible' : ''}`}>
      <span className="chapter-number">{number}</span>
      <h2 className="chapter-title">{title}</h2>
      <span className="chapter-subtitle">{subtitle}</span>
    </div>
  );
};

// ===========================================
// IMAGE REVEAL WITH ERA FILTERING
// ===========================================

interface ImageRevealProps {
  src: string;
  alt: string;
  caption?: string;
  era?: 'ancient' | 'medieval' | 'renaissance' | 'enlightenment' | 'modern';
}

const ImageReveal: React.FC<ImageRevealProps> = ({ src, alt, caption, era }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.15,
    triggerOnce: true,
  });
  
  return (
    <div 
      ref={ref}
      className={`image-reveal ${isVisible ? 'visible' : ''} ${era ? `era-${era}` : ''}`}
    >
      <div className="image-reveal-inner">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="reveal-image"
        />
        <div className="image-vignette" />
        <div className="image-grain" aria-hidden="true" />
      </div>
      {caption && (
        <p className="image-caption">{caption}</p>
      )}
    </div>
  );
};

// ===========================================
// ETYMOLOGY CALLOUT - WORD SPOTLIGHT
// ===========================================

interface EtymologyCalloutProps {
  word: string;
  pronunciation?: string;
  language: string;
  meaning: string;
  year?: string;
  context?: string;
  era: 'ancient' | 'medieval' | 'renaissance' | 'enlightenment' | 'modern';
}

const EtymologyCallout: React.FC<EtymologyCalloutProps> = ({
  word,
  pronunciation,
  language,
  meaning,
  year,
  context,
  era,
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  return (
    <div 
      ref={ref}
      className={`etymology-callout era-${era} ${isVisible ? 'visible' : ''}`}
    >
      <span className="etymology-word">{word}</span>
      {pronunciation && (
        <span className="etymology-pronunciation">/{pronunciation}/</span>
      )}
      <div className="etymology-details">
        <span className="etymology-language">{language}</span>
        {year && <span className="etymology-year">{year}</span>}
      </div>
      <p className="etymology-meaning">{meaning}</p>
      {context && (
        <p className="etymology-context">{context}</p>
      )}
    </div>
  );
};

// ===========================================
// FIGURE PROFILE - HISTORICAL FIGURE
// ===========================================

interface FigureProfileProps {
  name: string;
  epithet: string;
  dates: string;
  imageSrc: string;
  imageAlt: string;
  contributions: string[];
  quote?: string;
  quoteSource?: string;
  era: 'ancient' | 'medieval' | 'renaissance' | 'enlightenment' | 'modern';
}

const FigureProfile: React.FC<FigureProfileProps> = ({
  name,
  epithet,
  dates,
  imageSrc,
  imageAlt,
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
    <figure 
      ref={ref}
      className={`figure-profile era-${era} ${isVisible ? 'visible' : ''}`}
    >
      <div className="figure-portrait">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={200}
          height={260}
          className="portrait-image"
        />
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
// TIMELINE PROGRESS INDICATOR
// ===========================================

const TimelineProgress: React.FC<{ progress: number }> = ({ progress }) => {
  const eras = [
    { label: 'Ancient', year: '350 BCE', position: 0 },
    { label: 'Medieval', year: '1200', position: 20 },
    { label: 'Renaissance', year: '1550', position: 40 },
    { label: 'Enlightenment', year: '1750', position: 60 },
    { label: 'Darwin', year: '1859', position: 80 },
    { label: 'Modern', year: '2025', position: 95 },
  ];
  
  return (
    <div className="timeline-progress" aria-label={`Reading progress: ${Math.round(progress * 100)}%`}>
      <div className="timeline-track">
        <div 
          className="timeline-fill"
          style={{ height: `${progress * 100}%` }}
        />
        {eras.map((era) => (
          <div 
            key={era.label}
            className={`timeline-marker ${progress * 100 >= era.position ? 'passed' : ''}`}
            style={{ top: `${era.position}%` }}
          >
            <span className="marker-dot" />
            <span className="marker-year">{era.year}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===========================================
// WORD EVOLUTION VISUALIZATION
// ===========================================

const WordEvolution: React.FC = () => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  const stages = [
    { word: 'anima', meaning: 'breath, soul', era: 'Latin', year: '350 BCE' },
    { word: 'animalis', meaning: 'having breath', era: 'Latin', year: '200 BCE' },
    { word: 'animal', meaning: 'living being', era: 'Latin', year: '1st C. CE' },
    { word: 'animal', meaning: 'beast, creature', era: 'Old French', year: '12th C.' },
    { word: 'animal', meaning: 'living organism', era: 'English', year: '14th C.' },
    { word: 'animal', meaning: 'Animalia kingdom', era: 'Scientific', year: '1758' },
  ];
  
  return (
    <div ref={ref} className={`word-evolution ${isVisible ? 'visible' : ''}`}>
      <h3 className="evolution-title">The Evolution of a Word</h3>
      <div className="evolution-track">
        {stages.map((stage, index) => (
          <div 
            key={index}
            className="evolution-stage"
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <span className="stage-word">{stage.word}</span>
            <span className="stage-meaning">{stage.meaning}</span>
            <span className="stage-era">{stage.era} • {stage.year}</span>
            {index < stages.length - 1 && <div className="stage-connector" />}
          </div>
        ))}
      </div>
    </div>
  );
};

// ===========================================
// MAIN CLIENT COMPONENT
// ===========================================

export default function AnimalEtymologyClient() {
  const { progress: scrollProgress } = useCinematicScroll();
  const prefersReduced = useReducedMotion();
  
  return (
    <VisualEssay className="animal-etymology-essay">
      {/* Timeline Progress */}
      <TimelineProgress progress={scrollProgress} />
      
      {/* ============================================
          HERO: ANIMA - THE BREATH OF LIFE
          ============================================ */}
      <header className="hero-section">
        <div className="hero-background">
          <Image
            src={IMAGES.hero.main}
            alt={IMAGES.hero.alt}
            fill
            priority
            className="hero-image"
          />
          <div className="hero-gradient" />
          <div className="hero-grain" />
        </div>
        
        <div className="hero-content">
          <p className="hero-kicker">The Etymology of</p>
          <h1 className="hero-title">
            <span className="hero-title-word">ANIMA</span>
            <span className="hero-title-arrow">→</span>
            <span className="hero-title-word">ANIMAL</span>
          </h1>
          <p className="hero-subtitle">
            The Word That Named Every Creature That Breathes
          </p>
          
          <div className="hero-scroll-prompt">
            <span>Scroll to begin</span>
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
            What is an animal?
          </RevealedBlock>
          <RevealedBlock className="prologue-text" delay={200}>
            Today, we answer with biology: a multicellular, eukaryotic organism 
            that consumes organic matter, breathes oxygen, and is capable of movement.
          </RevealedBlock>
          <RevealedBlock className="prologue-text" delay={400}>
            But two thousand years ago, the answer was simpler—and more profound.
          </RevealedBlock>
          <RevealedBlock className="prologue-text emphasis" delay={600}>
            An animal was anything that had anima.<br />
            Breath. Soul. The invisible force that separates the living from the dead.
          </RevealedBlock>
        </div>
      </section>
      
      {/* ============================================
          CHAPTER 1: THE ANCIENT ROOT
          ============================================ */}
      <section className="chapter chapter-1 era-ancient" id="ancient">
        <ChapterHeader 
          number="I" 
          title="The Breath of Life" 
          subtitle="Ancient Greece & Rome • 350 BCE – 100 CE"
          era="ancient"
        />
        
        <ImageReveal 
          src={IMAGES.ancient.romanInscription}
          alt={IMAGES.ancient.romanInscriptionAlt}
          caption="Roman inscription from the Temple of Vesta—where eternal flames symbolized living breath"
          era="ancient"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The story begins not with beasts, but with breath. In ancient Rome, 
            the word anima meant the breath of life—the invisible vapor that 
            entered a body at birth and departed at death. It was the soul made 
            manifest in respiration.
          </VoiceUnseen>
        </div>
        
        <EtymologyCallout
          word="anima"
          pronunciation="AH-nee-mah"
          language="Latin"
          meaning="breath, soul, life force, the vital principle"
          year="c. 350 BCE"
          context="From Proto-Indo-European *h₂enh₁- meaning 'to breathe'"
          era="ancient"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The Romans derived animalis from anima—meaning "having breath" or 
            "having a soul." At first, this included humans. We too were animalia: 
            creatures possessed of the breath that signified life.
          </VoiceUnseen>
        </div>
        
        <ImageReveal 
          src={IMAGES.ancient.greekPhilosophy}
          alt={IMAGES.ancient.greekPhilosophyAlt}
          caption="Greek philosophical traditions that shaped Roman understanding of the soul"
          era="ancient"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            But it was Aristotle, writing in Greek a century before Rome's 
            linguistic dominance, who first systematically categorized living 
            things. His word was zōion (ζῷον)—literally "living being"—from 
            which we inherit "zoology."
          </VoiceUnseen>
          <VoiceUnseen>
            Aristotle divided nature into three kingdoms: things that grow 
            (plants), things that feel (animals), and things that reason (humans). 
            The animal was defined by sensation and voluntary movement—the 
            ability to perceive and to act.
          </VoiceUnseen>
        </div>
        
        <PullQuote 
          attribution="Aristotle" 
          year="De Anima, 350 BCE"
        >
          The soul is the cause and principle of the living body... it is that by 
          which we live, perceive, and think.
        </PullQuote>
        
        <EtymologyCallout
          word="animalis"
          pronunciation="ah-nee-MAH-lees"
          language="Latin"
          meaning="having breath; pertaining to living creatures"
          year="c. 200 BCE"
          context="From anima + suffix -alis (pertaining to)"
          era="ancient"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            When Latin scholars translated Aristotle's zōion, they chose animalis. 
            The Greek focus on "living" became the Roman focus on "breathing." 
            This subtle shift would echo through two millennia.
          </VoiceUnseen>
        </div>
        
        <VoiceEternal>
          Before we named them by their forms, we named them by their breath. The taxonomy was theological before it was biological.
        </VoiceEternal>
        
        <SectionDivider symbol="◆" />
      </section>
      
      {/* ============================================
          CHAPTER 2: MEDIEVAL METAMORPHOSIS
          ============================================ */}
      <section className="chapter chapter-2 era-medieval" id="medieval">
        <ChapterHeader 
          number="II" 
          title="Beasts & Bestiaries" 
          subtitle="Medieval Europe • 500 – 1500 CE"
          era="medieval"
        />
        
        <ImageReveal 
          src={IMAGES.medieval.bestiary}
          alt={IMAGES.medieval.bestiaryAlt}
          caption="Medieval bestiary illumination—where animals taught moral lessons"
          era="medieval"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            In medieval Europe, the Latin animal transformed. Christianity 
            collapsed Aristotle's three categories into two: humans (with 
            immortal souls) and animals (with merely animal souls—mortal, 
            extinguished at death).
          </VoiceUnseen>
          <VoiceUnseen>
            The word became a boundary. To call something an "animal" was to 
            place it below humanity—soulful enough to live, but not enough to 
            be saved.
          </VoiceUnseen>
        </div>
        
        <ImageReveal 
          src={IMAGES.medieval.lion}
          alt={IMAGES.medieval.lionAlt}
          caption="The lion in medieval bestiaries represented Christ—even beasts served divine symbolism"
          era="medieval"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            Yet this same era produced the bestiaries: gorgeously illustrated 
            manuscripts cataloging real and mythical animals. The lion 
            symbolized Christ. The pelican represented sacrifice. The unicorn 
            was purity incarnate.
          </VoiceUnseen>
          <VoiceUnseen>
            For medieval scholars, animals existed not as biological specimens 
            but as moral lessons—each creature a letter in God's alphabet, 
            spelling out divine truth.
          </VoiceUnseen>
        </div>
        
        <PullQuote 
          attribution="Isidore of Seville" 
          year="Etymologiae, c. 630 CE"
        >
          Animals are so called because they are animated by life and moved by spirit.
        </PullQuote>
        
        <div className="narrative-block">
          <VoiceUnseen>
            The Old French animal entered English around the 14th century, 
            initially as a learned term used by scholars. Common folk still 
            said "beast" (from Latin bestia) or "creature" (from creatura, 
            "something created").
          </VoiceUnseen>
        </div>
        
        <EtymologyCallout
          word="animal"
          pronunciation="AN-ih-mul"
          language="Middle English"
          meaning="a living being other than a human; a beast"
          year="c. 1380"
          context="From Old French animal, from Latin animalis"
          era="medieval"
        />
        
        <VoiceEternal>
          The medieval animal was half biology, half theology—a breathing sermon in fur and feather.
        </VoiceEternal>
        
        <SectionDivider symbol="❧" />
      </section>
      
      {/* ============================================
          CHAPTER 3: RENAISSANCE REDISCOVERY
          ============================================ */}
      <section className="chapter chapter-3 era-renaissance" id="renaissance">
        <ChapterHeader 
          number="III" 
          title="The Cabinet of Curiosities" 
          subtitle="Renaissance & Early Modern • 1450 – 1700"
          era="renaissance"
        />
        
        <ImageReveal 
          src={IMAGES.renaissance.cabinet}
          alt={IMAGES.renaissance.cabinetAlt}
          caption="Cabinets of curiosities—where collectors displayed the wonders of the natural world"
          era="renaissance"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The Renaissance brought rediscovery: ancient Greek and Roman texts, 
            but also new lands, new species, new questions. European explorers 
            returned with armadillos, hummingbirds, opossums—creatures that 
            fit no medieval category.
          </VoiceUnseen>
          <VoiceUnseen>
            The word animal began its slow migration from theology to natural 
            philosophy. In cabinets of curiosities, nobles displayed specimens 
            not as moral exemplars but as objects of wonder and study.
          </VoiceUnseen>
        </div>
        
        <ImageReveal 
          src={IMAGES.renaissance.naturalist}
          alt={IMAGES.renaissance.naturalistAlt}
          caption="Natural history illustration—observation replacing symbolism"
          era="renaissance"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            Artists like Albrecht Dürer and Conrad Gessner depicted animals with 
            unprecedented accuracy. Dürer's rhinoceros (1515), drawn from 
            descriptions alone, became more famous than any living specimen. 
            Gessner's Historia Animalium (1551-1558) attempted to catalog every 
            known creature.
          </VoiceUnseen>
        </div>
        
        <ImageReveal 
          src={IMAGES.renaissance.skeleton}
          alt={IMAGES.renaissance.skeletonAlt}
          caption="Comparative anatomy revealed hidden connections across species"
          era="renaissance"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The question changed. Medieval scholars asked: what does this animal 
            mean? Renaissance naturalists asked: what is this animal? How does 
            it move, eat, reproduce? What is its place in nature?
          </VoiceUnseen>
          <VoiceUnseen>
            But classification remained chaotic. Was a bat a bird? Was a whale a 
            fish? The very definition of "animal" needed reinvention.
          </VoiceUnseen>
        </div>
        
        <VoiceEternal>
          Wonder replaced worship. The animal became a puzzle to solve, not a 
          sermon to interpret.
        </VoiceEternal>
        
        <SectionDivider symbol="✧" />
      </section>
      
      {/* ============================================
          CHAPTER 4: LINNAEUS & THE KINGDOM
          ============================================ */}
      <section className="chapter chapter-4 era-enlightenment" id="linnaeus">
        <ChapterHeader 
          number="IV" 
          title="Animalia" 
          subtitle="The Linnaean Revolution • 1758"
          era="enlightenment"
        />
        
        <ImageReveal 
          src={IMAGES.linnaeus.taxonomy}
          alt={IMAGES.linnaeus.taxonomyAlt}
          caption="Systema Naturae—the book that gave every living thing a Latin name"
          era="enlightenment"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            Carl Linnaeus changed everything. In 1735, the Swedish botanist 
            published Systema Naturae, a slim catalog that would grow through 
            twelve editions into the foundation of modern taxonomy.
          </VoiceUnseen>
          <VoiceUnseen>
            Linnaeus formalized what had been chaos. He divided nature into 
            three kingdoms: Animalia, Vegetabilia, and Mineralia. For the first 
            time, "animal" had a precise scientific boundary.
          </VoiceUnseen>
        </div>
        
        <EtymologyCallout
          word="Animalia"
          pronunciation="ah-nee-MAH-lee-ah"
          language="Scientific Latin"
          meaning="The taxonomic kingdom comprising all animals"
          year="1758"
          context="Linnaeus's 10th edition of Systema Naturae established binomial nomenclature"
          era="enlightenment"
        />
        
        <ImageReveal 
          src={IMAGES.linnaeus.specimens}
          alt={IMAGES.linnaeus.specimensAlt}
          caption="Natural history specimens—the evidence base for Linnaean classification"
          era="enlightenment"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            Linnaeus's definition was clear: animals are organisms that move 
            voluntarily, sense their environment, and consume organic matter. 
            They are distinguished from plants (which grow but do not move) 
            and minerals (which do neither).
          </VoiceUnseen>
          <VoiceUnseen>
            Crucially, Linnaeus placed humans firmly within Animalia. We were 
            Homo sapiens—the "wise man"—but animals nonetheless. The theological 
            boundary between human and beast had been crossed by science.
          </VoiceUnseen>
        </div>
        
        <PullQuote 
          attribution="Carl Linnaeus" 
          year="Systema Naturae, 1758"
        >
          I demand of you, and of the whole world, that you show me a generic 
          character by which to distinguish between Man and Ape.
        </PullQuote>
        
        <div className="narrative-block">
          <VoiceUnseen>
            This was revolutionary—and controversial. Linnaeus had used the 
            ancient Latin animalis not to separate humans from beasts, but to 
            unite them. The word's original meaning—"having breath"—now 
            included every breathing creature without theological hierarchy.
          </VoiceUnseen>
        </div>
        
        <WordEvolution />
        
        <VoiceEternal>
          Science reclaimed the word. The hierarchy of souls collapsed into the 
          democracy of species.
        </VoiceEternal>
        
        <SectionDivider symbol="◈" />
      </section>
      
      {/* ============================================
          CHAPTER 5: DARWIN & SHARED ANCESTRY
          ============================================ */}
      <section className="chapter chapter-5 era-enlightenment" id="darwin">
        <ChapterHeader 
          number="V" 
          title="Descent with Modification" 
          subtitle="The Darwinian Revolution • 1859"
          era="enlightenment"
        />
        
        <ImageReveal 
          src={IMAGES.darwin.finches}
          alt={IMAGES.darwin.finchesAlt}
          caption="Darwin's finches—variation within a kind"
          era="enlightenment"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            If Linnaeus arranged life into a system, Darwin explained how it got 
            that way. On the Origin of Species (1859) proposed that all animals 
            shared common ancestry—that the kingdom Animalia was not a divine 
            filing system but a family tree.
          </VoiceUnseen>
          <VoiceUnseen>
            The word animal suddenly meant something deeper: not just "having 
            breath," but "descended from breath-havers." Every animal was 
            cousin to every other, separated only by millions of years and 
            millions of mutations.
          </VoiceUnseen>
        </div>
        
        <ImageReveal 
          src={IMAGES.darwin.tree}
          alt={IMAGES.darwin.treeAlt}
          caption="The tree of life—Darwin's radical insight that all life is connected"
          era="enlightenment"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            Darwin's only illustration in Origin was a branching diagram—the 
            now-iconic tree of life. He showed that species were not fixed 
            categories but temporary snapshots of an endless process of change.
          </VoiceUnseen>
          <VoiceUnseen>
            The animal kingdom became the animal family. And humans, far from 
            being set apart, were revealed as particularly clever apes—recently 
            evolved, sharing 98% of our DNA with chimpanzees.
          </VoiceUnseen>
        </div>
        
        <PullQuote 
          attribution="Charles Darwin" 
          year="The Descent of Man, 1871"
        >
          We thus learn that man is descended from a hairy quadruped, furnished 
          with a tail and pointed ears, probably arboreal in its habits.
        </PullQuote>
        
        <ImageReveal 
          src={IMAGES.darwin.fossils}
          alt={IMAGES.darwin.fossilsAlt}
          caption="The fossil record—ancestors frozen in stone"
          era="enlightenment"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The etymology now carried evolutionary weight. Anima—breath—was the 
            common inheritance of all animal life, passed down through billions 
            of years from the first oxygen-breathing organisms.
          </VoiceUnseen>
        </div>
        
        <VoiceEternal>
          We are animals not by category but by ancestry. The word became a 
          family name.
        </VoiceEternal>
        
        <SectionDivider symbol="◇" />
      </section>
      
      {/* ============================================
          CHAPTER 6: THE MODERN UNDERSTANDING
          ============================================ */}
      <section className="chapter chapter-6 era-modern" id="modern">
        <ChapterHeader 
          number="VI" 
          title="Kingdom Animalia Today" 
          subtitle="Modern Biology • 1950 – Present"
          era="modern"
        />
        
        <ImageReveal 
          src={IMAGES.modern.dna}
          alt={IMAGES.modern.dnaAlt}
          caption="DNA sequencing reveals the molecular definition of 'animal'"
          era="modern"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            Modern biology has both complicated and clarified the meaning of 
            "animal." DNA sequencing allows us to trace ancestry with precision 
            impossible for Linnaeus or Darwin. The kingdom Animalia is now 
            defined by molecular characteristics.
          </VoiceUnseen>
          <VoiceUnseen>
            Animals are eukaryotes (cells with nuclei), heterotrophs (consuming 
            other organisms for energy), and multicellular. They lack cell walls 
            (unlike plants), develop from a blastula (a hollow ball of cells), 
            and most are motile at some life stage.
          </VoiceUnseen>
        </div>
        
        <EtymologyCallout
          word="animal"
          pronunciation="AN-ih-muhl"
          language="Modern English"
          meaning="Any member of the kingdom Animalia; a multicellular eukaryotic organism that develops from a blastula and is typically capable of voluntary movement"
          year="Contemporary"
          context="Current scientific and colloquial usage"
          era="modern"
        />
        
        <ImageReveal 
          src={IMAGES.modern.diversity}
          alt={IMAGES.modern.diversityAlt}
          caption="The extraordinary diversity of Animalia—from tardigrades to blue whales"
          era="modern"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The numbers are staggering. Animalia includes approximately 1.5 
            million described species—and perhaps 8 million yet to be cataloged. 
            From tardigrades measuring 0.1mm to blue whales at 30 meters, from 
            jellyfish without brains to humans with the most complex ones.
          </VoiceUnseen>
          <VoiceUnseen>
            Yet all share that ancient quality: they breathe, in some form. 
            Even animals without lungs—fish, insects, worms—exchange oxygen and 
            carbon dioxide. The Latin anima persists at the molecular level.
          </VoiceUnseen>
        </div>
        
        <ImageReveal 
          src={IMAGES.modern.microscope}
          alt={IMAGES.modern.microscopeAlt}
          caption="Modern research continues to expand our understanding of animal life"
          era="modern"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            Today, "animal" serves multiple meanings simultaneously. In everyday 
            speech, it often excludes humans—we say "humans and animals" as if 
            we were separate. In scientific usage, we are undeniably included.
          </VoiceUnseen>
          <VoiceUnseen>
            The word has also expanded metaphorically. We call someone a "party 
            animal" or say they have "animal instincts." The ancient association 
            with vitality, appetite, and physicality survives in every usage.
          </VoiceUnseen>
        </div>
        
        <VoiceEternal>
          From breath to biology, from soul to sequence—the word evolved with 
          our understanding, and carries every layer still.
        </VoiceEternal>
      </section>
      
      {/* ============================================
          EPILOGUE: THE BREATH REMAINS
          ============================================ */}
      <section className="epilogue">
        <div className="epilogue-image">
          <Image
            src={IMAGES.epilogue.eye}
            alt={IMAGES.epilogue.eyeAlt}
            fill
            className="epilogue-background"
          />
          <div className="epilogue-gradient" />
        </div>
        
        <div className="epilogue-content">
          <RevealedBlock delay={0}>
            <h2 className="epilogue-title">The Breath Remains</h2>
          </RevealedBlock>
          
          <RevealedBlock className="epilogue-text" delay={200}>
            When you use the word "animal," you invoke 2,500 years of human 
            questioning. What is life? What is soul? What separates the living 
            from the dead, the moving from the still, the sentient from the 
            inert?
          </RevealedBlock>
          
          <RevealedBlock className="epilogue-text" delay={400}>
            The Romans heard breath. Medieval monks heard moral instruction. 
            Linnaeus heard scientific precision. Darwin heard shared ancestry. 
            Modern biologists hear molecular definition.
          </RevealedBlock>
          
          <RevealedBlock className="epilogue-text" delay={600}>
            But beneath every meaning, the original intuition persists: an 
            animal is something that breathes. Something with anima. Something 
            alive in the way that stones and plants are not quite alive.
          </RevealedBlock>
          
          <RevealedBlock className="epilogue-closing" delay={800}>
            Look at any creature—a sparrow, a whale, a spider, your own hand.<br />
            You are witnessing anima made flesh.<br />
            The breath that named a kingdom.
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
              <li>Oxford English Dictionary, "animal, n. and adj."</li>
              <li>Lewis & Short, <em>A Latin Dictionary</em> (1879)</li>
              <li>Liddell & Scott, <em>Greek-English Lexicon</em></li>
              <li>Watkins, <em>American Heritage Dictionary of Indo-European Roots</em></li>
            </ul>
          </div>
          
          <div className="source-category">
            <h4>Classical Sources</h4>
            <ul>
              <li>Aristotle, <em>De Anima</em> (On the Soul)</li>
              <li>Aristotle, <em>Historia Animalium</em></li>
              <li>Pliny the Elder, <em>Naturalis Historia</em></li>
              <li>Isidore of Seville, <em>Etymologiae</em> (c. 630 CE)</li>
            </ul>
          </div>
          
          <div className="source-category">
            <h4>Natural History</h4>
            <ul>
              <li>Carl Linnaeus, <em>Systema Naturae</em> (1758)</li>
              <li>Charles Darwin, <em>On the Origin of Species</em> (1859)</li>
              <li>Charles Darwin, <em>The Descent of Man</em> (1871)</li>
              <li>Ernst Mayr, <em>The Growth of Biological Thought</em> (1982)</li>
            </ul>
          </div>
        </div>
        
        <p className="sources-note">
          Images sourced from Unsplash under free license. Visual essay created 
          for educational purposes.
        </p>
      </footer>
    </VisualEssay>
  );
}



