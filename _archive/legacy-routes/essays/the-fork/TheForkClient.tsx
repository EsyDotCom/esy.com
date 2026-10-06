/* eslint-disable react/no-unescaped-entities */
"use client";

/**
 * THE DISTANCE BETWEEN
 * ====================
 * A Photorealistic Visual Essay on the History of the Fork
 * 
 * From Byzantine courts to modern tables—2,000 years of the utensil
 * that measured civilization itself.
 * 
 * Visual Treatment: Photorealistic
 * - Archival photography from museum collections
 * - Renaissance paintings and medieval manuscripts
 * - Era-specific color grading and grain
 * - Cinematic parallax with real imagery
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
import './the-fork.css';

// ===========================================
// IMAGE SOURCES - Museum & Archive References
// ===========================================

const IMAGES = {
  // Hero - Byzantine silver fork and spoon, 4th century AD, Cleveland Museum of Art
  hero: {
    fork: '/images/essays/fork/hero-byzantine-fork.jpg',
    alt: 'Early Byzantine silver fork and spoon with animal hoof finial, 4th century AD, Cleveland Museum of Art',
  },
  
  // Chapter 1: Byzantine
  byzantine: {
    court: '/images/essays/fork/byzantine-court-mosaic.jpg',
    courtAlt: 'Emperor Justinian I mosaic from Basilica of San Vitale, Ravenna, 6th century',
    fork: '/images/essays/fork/hero-byzantine-fork.jpg',
    forkAlt: 'Early Byzantine silver fork, 4th century AD, Cleveland Museum of Art',
    empress: '/images/essays/fork/theophanu-ivory.jpg',
    empressAlt: 'Ivory plaque depicting Empress Theophanu, 10th century, Musée de Cluny',
    banquet: '/images/essays/fork/byzantine-banquet.jpg',
    banquetAlt: 'Empress Theodora mosaic from Basilica of San Vitale, Ravenna, 6th century',
  },
  
  // Chapter 2: Medieval
  medieval: {
    manuscript: '/images/essays/fork/medieval-marginalia.jpg',
    manuscriptAlt: 'French wedding banquet illumination, 15th century manuscript',
    dining: '/images/essays/fork/medieval-dining.jpg',
    diningAlt: 'Banquet of Charles V of France, Grandes Chroniques de France, 1378',
  },
  
  // Chapter 3: Renaissance
  renaissance: {
    catherine: '/images/essays/fork/catherine-de-medici.jpg',
    catherineAlt: 'Portrait of Catherine de Medici by Santi di Tito, c. 1585-1586, Uffizi Gallery',
    banquet: '/images/essays/fork/veronese-wedding-cana.jpg',
    banquetAlt: 'The Wedding at Cana by Paolo Veronese, 1563, Louvre Museum',
    scappi: '/images/essays/fork/scappi-cookbook.jpg',
    scappiAlt: 'Title page of Opera dell\'arte del cucinare by Bartolomeo Scappi, 1570',
  },
  
  // Chapter 4: English
  english: {
    coryat: '/images/essays/fork/thomas-coryat.jpg',
    coryatAlt: 'Thomas Coryat from the title page of Coryat\'s Crudities, 1611',
    crudities: '/images/essays/fork/coryats-crudities.jpg',
    cruditiesAlt: 'Title page engraving of Coryat\'s Crudities by William Hole, 1611',
    james: '/images/essays/fork/king-james-i.jpg',
    jamesAlt: 'Portrait of King James I by John de Critz, early 17th century',
  },
  
  // Chapter 5: Industrial
  industrial: {
    boulton: '/images/essays/fork/matthew-boulton.jpg',
    boultonAlt: 'Portrait of Matthew Boulton by Carl Frederik von Breda, c. 1792, Birmingham Museums Trust',
    jefferson: '/images/essays/fork/thomas-jefferson.jpg',
    jeffersonAlt: 'Official Presidential portrait of Thomas Jefferson by Rembrandt Peale, 1800, White House Collection',
    massProduced: '/images/essays/fork/victorian-cutlery.jpg',
    massProducedAlt: 'Set of flatware: spoon, fork and knife, late 19th century, Zakopane',
  },
  
  // Chapter 6: Modern
  modern: {
    emilyPost: '/images/essays/fork/emily-post.jpg',
    emilyPostAlt: 'Emily Post, photograph from 1912, Library of Congress',
    jensen: '/images/essays/fork/georg-jensen.jpg',
    jensenAlt: 'Georg Jensen Blossom pattern chocolate service, c. 1905-1908, Royal Ontario Museum',
  },
  
  // Chapter 7: Global
  global: {
    chopsticks: '/images/essays/fork/japanese-dining.jpg',
    chopsticksAlt: 'Traditional Japanese cuisine with chopsticks',
    indian: '/images/essays/fork/indian-thali.jpg',
    indianAlt: 'Traditional South Indian thali meal, Chennai',
    ethiopian: '/images/essays/fork/ethiopian-injera.jpg',
    ethiopianAlt: 'Ethiopian traditional food with injera bread',
    western: '/images/essays/fork/formal-western-setting.jpg',
    westernAlt: 'Formal Western place setting with multiple forks',
  },
};

// ===========================================
// PARALLAX IMAGE COMPONENT
// ===========================================

interface ParallaxImageProps {
  src: string;
  alt: string;
  layer?: 0 | 1 | 2 | 3;
  className?: string;
  era?: 'byzantine' | 'medieval' | 'renaissance' | 'industrial' | 'modern';
  priority?: boolean;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  layer = 2,
  className = '',
  era,
  priority = false,
}) => {
  const speeds = [0.2, 0.5, 1.0, 1.3];
  const [ref, style] = useParallax<HTMLDivElement>({ speed: speeds[layer] });
  
  return (
    <div 
      ref={ref}
      className={`parallax-image layer-${layer} ${era ? `era-${era}` : ''} ${className}`}
      style={style}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        className="image-fill"
        priority={priority}
      />
      <div className="image-grain" aria-hidden="true" />
    </div>
  );
};

// ===========================================
// FIGURE PROFILE - PHOTOREALISTIC
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
  era: 'byzantine' | 'medieval' | 'renaissance' | 'industrial' | 'modern';
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
// SCROLL-DRIVEN IMAGE REVEAL
// ===========================================

interface ImageRevealProps {
  src: string;
  alt: string;
  caption?: string;
  era?: 'byzantine' | 'medieval' | 'renaissance' | 'industrial' | 'modern';
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
// COMPARISON SLIDER (Before/After)
// ===========================================

interface ComparisonSliderProps {
  beforeSrc: string;
  beforeAlt: string;
  beforeLabel: string;
  afterSrc: string;
  afterAlt: string;
  afterLabel: string;
}

const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
  beforeSrc,
  beforeAlt,
  beforeLabel,
  afterSrc,
  afterAlt,
  afterLabel,
}) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percentage);
  }, []);
  
  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) handleMove(e.clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };
  
  return (
    <div 
      ref={containerRef}
      className="comparison-slider"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After image (full width) */}
      <div className="comparison-after">
        <Image src={afterSrc} alt={afterAlt} fill className="comparison-image" />
        <span className="comparison-label after-label">{afterLabel}</span>
      </div>
      
      {/* Before image (clipped) */}
      <div 
        className="comparison-before"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image src={beforeSrc} alt={beforeAlt} fill className="comparison-image" />
        <span className="comparison-label before-label">{beforeLabel}</span>
      </div>
      
      {/* Slider handle */}
      <div 
        className="comparison-handle"
        style={{ left: `${position}%` }}
      >
        <div className="handle-line" />
        <div className="handle-grip">
          <span className="grip-arrow left">‹</span>
          <span className="grip-arrow right">›</span>
        </div>
      </div>
    </div>
  );
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
// CHAPTER HEADER WITH STAGGER
// ===========================================

interface ChapterHeaderProps {
  number: string;
  title: string;
  era: string;
}

const ChapterHeader: React.FC<ChapterHeaderProps> = ({ number, title, era }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  return (
    <div ref={ref} className={`chapter-header ${isVisible ? 'visible' : ''}`}>
      <span className="chapter-number">{number}</span>
      <h2 className="chapter-title">{title}</h2>
      <span className="chapter-era">{era}</span>
    </div>
  );
};

// ===========================================
// TINE EXPLANATION WITH SCROLL PROGRESS
// ===========================================

interface TineExplanationProps {
  scrollProgress: number;
}

const TineExplanation: React.FC<TineExplanationProps> = ({ scrollProgress }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  // Determine which tine is active based on section scroll progress
  // This creates a sequential reveal effect
  const getActiveIndex = () => {
    if (scrollProgress < 0.5) return 0;
    if (scrollProgress < 0.7) return 1;
    return 2;
  };
  
  const activeIndex = getActiveIndex();
  
  const tines = [
    { count: 2, description: 'Spears, but cannot scoop' },
    { count: 3, description: 'Better, but still unstable' },
    { count: 4, description: 'Pierce, scoop, lift, stabilize—perfect' },
  ];
  
  return (
    <div ref={ref} className={`tine-explanation ${isVisible ? 'visible' : ''}`}>
      {tines.map((tine, index) => (
        <div 
          key={tine.count}
          className={`tine-item ${index === activeIndex ? 'active' : ''} ${isVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          <span className="tine-count">{tine.count}</span>
          <p>{tine.description}</p>
        </div>
      ))}
    </div>
  );
};

// ===========================================
// GLOBAL TRADITION CARD WITH REVEAL
// ===========================================

interface GlobalTraditionProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  index: number;
}

const GlobalTradition: React.FC<GlobalTraditionProps> = ({ 
  imageSrc, imageAlt, title, description, index 
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  return (
    <div 
      ref={ref}
      className={`global-tradition ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <ImageReveal src={imageSrc} alt={imageAlt} era="modern" />
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};

// ===========================================
// TIMELINE PROGRESS INDICATOR
// ===========================================

const TimelineProgress: React.FC<{ progress: number }> = ({ progress }) => {
  const eras = [
    { label: 'Byzantine', year: '400', position: 0 },
    { label: 'Medieval', year: '1000', position: 15 },
    { label: 'Renaissance', year: '1500', position: 35 },
    { label: 'Enlightenment', year: '1700', position: 55 },
    { label: 'Industrial', year: '1850', position: 75 },
    { label: 'Modern', year: '2000', position: 95 },
  ];
  
  return (
    <div className="timeline-progress" aria-label={`Reading progress: ${Math.round(progress * 100)}%`}>
      <div className="timeline-track">
        <div 
          className="timeline-fill"
          style={{ height: `${progress * 100}%` }}
        />
        {eras.map((era, i) => (
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
// MAIN CLIENT COMPONENT
// ===========================================

export default function TheForkClient() {
  const { progress: scrollProgress } = useCinematicScroll();
  const prefersReduced = useReducedMotion();
  
  return (
    <VisualEssay className="the-fork-essay">
      {/* Timeline Progress */}
      <TimelineProgress progress={scrollProgress} />
      
      {/* ============================================
          HERO: THE DISTANCE BETWEEN
          ============================================ */}
      <header className="hero-section">
        <div className="hero-background">
          <Image
            src={IMAGES.hero.fork}
            alt={IMAGES.hero.alt}
            fill
            priority
            className="hero-image"
          />
          <div className="hero-gradient" />
          <div className="hero-grain" />
        </div>
        
        <div className="hero-content">
          <p className="hero-kicker">A Visual Essay</p>
          <h1 className="hero-title">The Distance Between</h1>
          <p className="hero-subtitle">
            How a pronged instrument became the measure of civilization itself
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
            For ten thousand generations, the hand was the first tool.
          </RevealedBlock>
          <RevealedBlock className="prologue-text" delay={200}>
            Then came a tiny pronged instrument—and with it, a distance. 
            Between finger and food. Between animal and aspirant. 
            Between what we were and what we wished to become.
          </RevealedBlock>
          <RevealedBlock className="prologue-text" delay={400}>
            This is the story of that distance.
          </RevealedBlock>
        </div>
      </section>
      
      {/* ============================================
          CHAPTER 1: THE BYZANTINE BITE
          ============================================ */}
      <section className="chapter chapter-1 era-byzantine" id="byzantine">
        <ChapterHeader 
          number="I" 
          title="The Byzantine Bite" 
          era="Constantinople, 4th–11th Century" 
        />
        
        <ImageReveal 
          src={IMAGES.byzantine.court}
          alt="Byzantine court mosaic showing imperial dining scene, Ravenna, 6th century"
          caption="The imperial court of Byzantium, where sweetness required separation"
          era="byzantine"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The fork's origin is not in hunger but in stickiness. Byzantine nobles 
            faced a delicate problem: their beloved honey-soaked sweetmeats, their 
            candied fruits and rose-water pastries, left fingers impossibly tacky. 
            The solution was a tiny two-pronged spear—a personal tool for lifting 
            the delicacy to the lips without soiling the hands.
          </VoiceUnseen>
        </div>
        
        <div className="image-pair">
          <ImageReveal 
            src={IMAGES.byzantine.fork}
            alt="Byzantine gold fork with jeweled handle, 10th century, Metropolitan Museum"
            caption="Byzantine fork, gold with ivory handle, c. 950 CE"
            era="byzantine"
          />
          <ImageReveal 
            src={IMAGES.byzantine.banquet}
            alt="Byzantine manuscript illumination depicting imperial banquet"
            caption="Imperial banquet scene from Byzantine manuscript"
            era="byzantine"
          />
        </div>
        
        <div className="narrative-block">
          <VoiceUnseen>
            These were not humble implements. Byzantine forks were status symbols—gold, 
            silver, ivory, studded with gems. They belonged to empresses and emperors, 
            passed down through generations. The fork was the mark of a civilization 
            that could afford to be fastidious.
          </VoiceUnseen>
        </div>
        
        <VoiceEternal>
          The distance between hand and food measured the distance between appetite and refinement.
        </VoiceEternal>
        
        <FigureProfile
          name="Theophanu"
          epithet="The Byzantine Bride"
          dates="c. 955–991 CE"
          imageSrc={IMAGES.byzantine.empress}
          imageAlt="Ivory relief portrait of Empress Theophanu, 10th century"
          contributions={[
            "Brought the fork to Western Europe through marriage to Holy Roman Emperor Otto II in 972",
            "Scandalized the German court by refusing to eat with her hands",
            "Her Greek customs were mocked as effeminate and vain",
          ]}
          quote="She did not touch food with her fingers, but had servants cut it into small pieces, which she would pick up with a certain golden two-pronged instrument and carry to her mouth."
          quoteSource="Peter Damian, c. 1070"
          era="byzantine"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The Byzantine fork remained an Eastern secret for centuries. Western 
            visitors to Constantinople noted these strange implements with curiosity 
            but not adoption. The fork was as foreign as the silk, as exotic as 
            the spices—admired but not imitated.
          </VoiceUnseen>
          <VoiceUnseen>
            This would change with a single woman—and a single death.
          </VoiceUnseen>
        </div>
        
        <SectionDivider symbol="✦" />
      </section>
      
      {/* ============================================
          CHAPTER 2: THE DEVIL'S INSTRUMENT
          ============================================ */}
      <section className="chapter chapter-2 era-medieval" id="medieval">
        <ChapterHeader 
          number="II" 
          title="The Devil's Instrument" 
          era="Medieval Europe, 11th–15th Century" 
        />
        
        <ImageReveal 
          src={IMAGES.medieval.manuscript}
          alt="Medieval manuscript marginalia showing demons with pitchforks"
          caption="Marginalia demons with fork-like implements, 13th century"
          era="medieval"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The fork arrived in Western Christendom like a whisper of heresy. When 
            Princess Maria Argyropoulina, Byzantine bride of the Doge of Venice, 
            brought her golden fork to Italy in 1004, the reaction was not curiosity 
            but horror.
          </VoiceUnseen>
          <VoiceUnseen>
            The clergy pronounced judgment: this was the devil's own instrument.
          </VoiceUnseen>
        </div>
        
        <PullQuote 
          attribution="Peter Damian, Cardinal" 
          year="c. 1070"
        >
          Nor did she deign to touch food with her fingers, but would command her 
          eunuchs to cut it up into small pieces, which she would impale on a 
          certain golden instrument with two prongs and thus carry to her mouth.
        </PullQuote>
        
        <div className="narrative-block">
          <VoiceUnseen>
            The condemnation was theological. God had given humans fingers—natural 
            forks, divinely designed. To reject God's gift for a metal substitute 
            was vanity, pride, and potentially satanic. When Maria died of plague 
            two years after her arrival, churchmen pointed to her corpse as proof.
          </VoiceUnseen>
        </div>
        
        <div className="furcifer-callout">
          <div className="furcifer-word">Peter Damian</div>
          <p className="furcifer-meaning">Cardinal & Doctor of the Church <em>(1007–1072)</em></p>
          <p className="furcifer-context">His fierce condemnation of the Byzantine princess's fork shaped Western attitudes for centuries. The fork, to him, was vanity made metal.</p>
        </div>
        
        <ImageReveal 
          src={IMAGES.medieval.dining}
          alt="Medieval manuscript showing nobles dining with hands, knives, and spoons"
          caption="Medieval dining—hands, knives, bread. No forks in sight."
          era="medieval"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            For nearly four hundred years, the fork remained rare in Western Europe. 
            Medieval diners ate with knives, spoons, and fingers. Bread served as 
            both food and utensil—trenchers soaked up sauces, chunks of bread conveyed 
            morsels to the mouth.
          </VoiceUnseen>
        </div>
        
        <VoiceEternal>
          The fork was trapped in purgatory—neither banned nor accepted, waiting for resurrection.
        </VoiceEternal>
        
        <SectionDivider symbol="◆" />
      </section>
      
      {/* ============================================
          CHAPTER 3: THE MEDICI TOUCH
          ============================================ */}
      <section className="chapter chapter-3 era-renaissance" id="renaissance">
        <ChapterHeader 
          number="III" 
          title="The Medici Touch" 
          era="Renaissance Italy, 15th–16th Century" 
        />
        
        <ImageReveal 
          src={IMAGES.renaissance.banquet}
          alt="Detail from Veronese's Wedding at Cana showing Renaissance dining"
          caption="Paolo Veronese, 'The Wedding at Cana' (detail), 1563"
          era="renaissance"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            Italy saved the fork. While Northern Europe still ate with fingers, 
            Italian city-states—Venice, Florence, Rome—embraced the prong as a 
            mark of sophistication. The Renaissance rediscovered antiquity, and 
            with it, a hunger for civilization.
          </VoiceUnseen>
          <VoiceUnseen>
            The fork fit perfectly.
          </VoiceUnseen>
        </div>
        
        <ImageReveal 
          src={IMAGES.renaissance.scappi}
          alt={IMAGES.renaissance.scappiAlt}
          caption="From Bartolomeo Scappi's 'Opera', 1570—forks as standard kitchen equipment"
          era="renaissance"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            In 15th-century Italy, to eat with a fork was to declare oneself cultured, 
            refined, humanist. Italian travelers were mocked abroad for their "effeminate" 
            utensils, but they persisted. Venetian glassworkers created exquisite handles. 
            Florentine silversmiths crafted ever-more elaborate designs.
          </VoiceUnseen>
        </div>
        
        <FigureProfile
          name="Catherine de' Medici"
          epithet="The Fork's Ambassador"
          dates="1519–1589"
          imageSrc={IMAGES.renaissance.catherine}
          imageAlt="Portrait of Catherine de' Medici by François Clouet"
          contributions={[
            "Florentine noblewoman who became Queen of France",
            "Married Henry II at age 14, bringing Italian customs to French court",
            "Introduced the fork, modern cuisine, and table etiquette to France",
            "Mother of three French kings",
          ]}
          quote="The queen eats in the Italian manner."
          quoteSource="French courtier, c. 1540"
          era="renaissance"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The great leap came with a wedding. In 1533, fourteen-year-old Catherine 
            de' Medici arrived in France to marry the future King Henry II. She brought 
            her Florentine entourage—including cooks, pastry chefs, and a full set of 
            personal forks.
          </VoiceUnseen>
          <VoiceUnseen>
            The French court was scandalized and fascinated in equal measure.
          </VoiceUnseen>
        </div>
        
        <VoiceEternal>
          What was shocking became expected. What was Italian became French. What was royal became aspiration.
        </VoiceEternal>
        
        <SectionDivider symbol="❧" />
      </section>
      
      {/* ============================================
          CHAPTER 4: THE ENGLISH CURIOSITY
          ============================================ */}
      <section className="chapter chapter-4 era-renaissance" id="english">
        <ChapterHeader 
          number="IV" 
          title="The English Curiosity" 
          era="England, 16th–17th Century" 
        />
        
        <ImageReveal 
          src={IMAGES.english.crudities}
          alt="Title page from Coryat's Crudities, 1611"
          caption="Coryat's Crudities, 1611—the first English guide to Continental manners"
          era="renaissance"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            Thomas Coryat was an eccentric. A court jester, travel writer, and shameless 
            self-promoter, he walked across Europe in 1608 and returned with tales that 
            astonished his countrymen. Among them: the Italian fork.
          </VoiceUnseen>
        </div>
        
        <PullQuote attribution="Thomas Coryat" year="1611">
          The Italian cannot by any means endure to have his dish touched with fingers, 
          seeing all men's fingers are not alike clean.
        </PullQuote>
        
        <FigureProfile
          name="Thomas Coryat"
          epithet="The Fork's English Champion"
          dates="1577–1617"
          imageSrc={IMAGES.english.coryat}
          imageAlt="Frontispiece portrait from Coryat's Crudities"
          contributions={[
            "English travel writer and eccentric",
            "Walked across Europe recording observations",
            "First Englishman to extensively describe and advocate fork use",
            "Mocked as 'Furcifer' (fork-bearer/rascal) by his contemporaries",
          ]}
          era="renaissance"
        />
        
        <div className="furcifer-callout">
          <span className="furcifer-word">FURCIFER</span>
          <p className="furcifer-meaning">
            Latin: <em>fork-bearer</em> — but also <em>rascal</em>, <em>gallows-bird</em>
          </p>
          <p className="furcifer-context">
            The pun delighted Coryat's critics. He persisted anyway.
          </p>
        </div>
        
        <ImageReveal 
          src={IMAGES.english.james}
          alt={IMAGES.english.jamesAlt}
          caption="English court dining, early 17th century"
          era="renaissance"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            Within a generation, the English aristocracy began importing Italian forks. 
            The island's resistance was crumbling. What begins in laughter often ends 
            in imitation.
          </VoiceUnseen>
        </div>
        
        <VoiceEternal>
          The eccentric's affectation became the gentleman's requirement.
        </VoiceEternal>
        
        <SectionDivider symbol="✧" />
      </section>
      
      {/* ============================================
          CHAPTER 5: THE INDUSTRIAL APPETITE
          ============================================ */}
      <section className="chapter chapter-5 era-industrial" id="industrial">
        <ChapterHeader 
          number="V" 
          title="The Industrial Appetite" 
          era="18th–19th Century" 
        />
        
        <ImageReveal 
          src={IMAGES.industrial.massProduced}
          alt={IMAGES.industrial.massProducedAlt}
          caption="Victorian-era flatware—the fork democratized"
          era="industrial"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            For a thousand years, the fork was a luxury. Gold, silver, ivory—materials 
            that marked their owners as elite. The Industrial Revolution changed everything.
          </VoiceUnseen>
          <VoiceUnseen>
            Sheffield, England, became the crucible of culinary democracy.
          </VoiceUnseen>
        </div>
        
        <div className="image-pair">
          <FigureProfile
            name="Matthew Boulton"
            epithet="The Industrialist's Fork"
            dates="1728–1809"
            imageSrc={IMAGES.industrial.boulton}
            imageAlt="Portrait of Matthew Boulton"
            contributions={[
              "Birmingham manufacturer and entrepreneur",
              "Pioneered industrial silver plating (Sheffield plate)",
              "Made silverware affordable for the middle class",
            ]}
            era="industrial"
          />
          <FigureProfile
            name="Thomas Jefferson"
            epithet="America's Fork Advocate"
            dates="1743–1826"
            imageSrc={IMAGES.industrial.jefferson}
            imageAlt="Portrait of Thomas Jefferson by Rembrandt Peale"
            contributions={[
              "Third U.S. President",
              "Encountered French fork customs as ambassador",
              "Returned with sophisticated dining habits",
            ]}
            era="industrial"
          />
        </div>
        
        <ImageReveal 
          src={IMAGES.industrial.massProduced}
          alt="Victorian cutlery sets showing standardized fork designs"
          caption="Mass-produced steel forks, c. 1880—luxury becomes standard"
          era="industrial"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            New alloys, new manufacturing techniques, new economies of scale. The first 
            inexpensive steel forks appeared—rough by aristocratic standards but functional. 
            The middle class could now set a proper table.
          </VoiceUnseen>
          <VoiceUnseen>
            America accelerated the democratization. Young, ambitious, lacking Europe's 
            feudal table manners, Americans embraced the fork with practical enthusiasm.
          </VoiceUnseen>
        </div>
        
        <VoiceEternal>
          The fork's journey from Byzantine court to working-class kitchen was complete.
        </VoiceEternal>
        
        <SectionDivider symbol="◈" />
      </section>
      
      {/* ============================================
          CHAPTER 6: THE FOUR-TINED TRIUMPH
          ============================================ */}
      <section className="chapter chapter-6 era-modern" id="modern">
        <ChapterHeader 
          number="VI" 
          title="The Four-Tined Triumph" 
          era="19th–20th Century" 
        />
        
        <ImageReveal 
          src={IMAGES.modern.jensen}
          alt={IMAGES.modern.jensenAlt}
          caption="Georg Jensen Blossom pattern—modernism meets tradition"
          era="modern"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            The four-tined fork became standard in the early 19th century, and then—
            remarkably—stopped changing. The design was perfected. Two thousand years 
            of evolution reached its terminus in a simple, elegant form.
          </VoiceUnseen>
        </div>
        
        <TineExplanation scrollProgress={scrollProgress} />
        
        <FigureProfile
          name="Emily Post"
          epithet="The Arbiter of Proper Use"
          dates="1872–1960"
          imageSrc={IMAGES.modern.emilyPost}
          imageAlt="Portrait photograph of Emily Post"
          contributions={[
            "American author and etiquette authority",
            "Her 'Etiquette' (1922) codified American dining customs",
            "Made explicit what had been implicit—the rules of the table",
          ]}
          quote="The fork is held with the handle in the palm, the tines curving downward."
          era="modern"
        />
        
        <ImageReveal 
          src={IMAGES.modern.emilyPost}
          alt={IMAGES.modern.emilyPostAlt}
          caption="Emily Post, 1912—the codifier of American table manners"
          era="modern"
        />
        
        <div className="narrative-block">
          <VoiceUnseen>
            With form fixed, the fork became a canvas for meaning. Etiquette codified 
            its use—hold it this way, not that way; switch hands (American) or don't 
            (Continental). Designers reimagined its aesthetics without changing its function.
          </VoiceUnseen>
        </div>
        
        <FigureProfile
          name="Georg Jensen"
          epithet="The Fork as Art"
          dates="1866–1935"
          imageSrc={IMAGES.modern.jensen}
          imageAlt="Portrait of Georg Jensen with his silverware designs"
          contributions={[
            "Danish silversmith and designer",
            "Created iconic modernist flatware",
            "Proved the fork could be functional art",
          ]}
          era="modern"
        />
        
        <VoiceEternal>
          The mathematics of eating had been solved. Now began the endless refinement of meaning.
        </VoiceEternal>
        
        <SectionDivider symbol="❖" />
      </section>
      
      {/* ============================================
          CHAPTER 7: THE GLOBAL TABLE
          ============================================ */}
      <section className="chapter chapter-7 era-modern" id="global">
        <ChapterHeader 
          number="VII" 
          title="The Global Table" 
          era="Present Day" 
        />
        
        <div className="narrative-block intro">
          <VoiceUnseen>
            The fork conquered Western tables. But what of the rest of the world?
          </VoiceUnseen>
        </div>
        
        <div className="global-grid">
          <GlobalTradition
            imageSrc={IMAGES.global.western}
            imageAlt="Formal Western table setting with fork, knife, and spoon"
            title="Western"
            description="Fork, knife, spoon. Individual portions. Distance from food."
            index={0}
          />
          <GlobalTradition
            imageSrc={IMAGES.global.chopsticks}
            imageAlt="Japanese table setting with chopsticks on hashioki rest"
            title="East Asian"
            description="Chopsticks: 5,000 years old. No cutting at the table—that's for the kitchen."
            index={1}
          />
          <GlobalTradition
            imageSrc={IMAGES.global.indian}
            imageAlt="Indian thali with hand reaching toward food"
            title="South Asian"
            description="Each finger channels different energy. The fork interrupts that flow."
            index={2}
          />
          <GlobalTradition
            imageSrc={IMAGES.global.ethiopian}
            imageAlt="Ethiopian mesob with injera and communal dishes"
            title="Ethiopian"
            description="Injera is utensil. Eating from a common plate is not poverty—it is intimacy."
            index={3}
          />
        </div>
        
        <div className="narrative-block">
          <VoiceUnseen>
            The fork, then, is not universal progress but cultural choice. It embodies 
            Western values: individuality, hygiene anxiety, the separation of self from 
            food, the primacy of visual over tactile experience.
          </VoiceUnseen>
          <VoiceUnseen>
            To eat with a fork is to hold the world at arm's length.
          </VoiceUnseen>
        </div>
        
        <VoiceEternal>
          There is no "right" way to eat. Only the way each culture chose.
        </VoiceEternal>
      </section>
      
      {/* ============================================
          EPILOGUE: THE DISTANCE
          ============================================ */}
      <section className="epilogue">
        <div className="epilogue-image">
          <Image
            src={IMAGES.hero.fork}
            alt="A single fork against dark background"
            fill
            className="epilogue-fork"
          />
          <div className="epilogue-gradient" />
        </div>
        
        <div className="epilogue-content">
          <RevealedBlock delay={0}>
            <h2 className="epilogue-title">The Distance Between</h2>
          </RevealedBlock>
          
          <RevealedBlock className="epilogue-text" delay={200}>
            The fork in your hand represents centuries of controversy, class warfare, 
            and cultural negotiation. What medieval clergy called satanic vanity is 
            now so ubiquitous it's invisible.
          </RevealedBlock>
          
          <RevealedBlock className="epilogue-text" delay={400}>
            Nothing about our daily rituals is inevitable.
          </RevealedBlock>
          
          <RevealedBlock className="epilogue-closing" delay={600}>
            You will never look at a table setting the same way.
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
            <h4>Primary Sources</h4>
            <ul>
              <li>Peter Damian, <em>De Institutis Ordinis Eremitarum</em> (c. 1070)</li>
              <li>Thomas Coryat, <em>Coryat's Crudities</em> (1611)</li>
              <li>Bartolomeo Scappi, <em>Opera dell'arte del cucinare</em> (1570)</li>
              <li>Emily Post, <em>Etiquette</em> (1922)</li>
            </ul>
          </div>
          
          <div className="source-category">
            <h4>Secondary Sources</h4>
            <ul>
              <li>Bee Wilson, <em>Consider the Fork: A History of How We Cook and Eat</em> (2012)</li>
              <li>Henry Petroski, <em>The Evolution of Useful Things</em> (1992)</li>
              <li>Margaret Visser, <em>The Rituals of Dinner</em> (1991)</li>
              <li>Norbert Elias, <em>The Civilizing Process</em> (1939)</li>
            </ul>
          </div>
          
          <div className="source-category">
            <h4>Image Archives</h4>
            <ul>
              <li>Metropolitan Museum of Art, Byzantine Collection</li>
              <li>Victoria & Albert Museum, Metalwork Collection</li>
              <li>British Museum, Medieval Europe Gallery</li>
              <li>Sheffield Industrial Museums Trust</li>
              <li>Bibliothèque nationale de France, Manuscripts</li>
            </ul>
          </div>
        </div>
      </footer>
    </VisualEssay>
  );
}
