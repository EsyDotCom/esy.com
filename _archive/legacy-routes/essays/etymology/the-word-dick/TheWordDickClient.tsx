/* eslint-disable react/no-unescaped-entities */
"use client";

/**
 * THE WORD DICK: FROM ROYAL NICKNAME TO MODERN TABOO
 * ===================================================
 * A Typography-Forward Visual Essay on Etymology
 * 
 * Built from spec: orchestration/skills/visual-essay-invocation/specs/the-word-dick.md
 * Research package: src/app/essays/visual/the-word-dick/research/
 * 
 * Chapters:
 * 1. The Name (Medieval, 1200-1500)
 * 2. The Everyman (Tudor/Stuart, 1500-1700)
 * 3. The Slang Turn (Georgian, 1700-1840)
 * 4. The Victorian Paradox (Victorian, 1840-1900)
 * 5. The Tipping Point (Modern, 1900-1980)
 * 6. The Word Today (Contemporary, 1980-Present)
 */

import React, { useState, useEffect, useRef } from 'react';
import './the-word-dick.css';

// ===========================================
// HOOKS
// ===========================================

const useScrollProgress = (): number => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const current = (window.scrollY / scrollHeight) * 100;
      setProgress(Math.min(100, Math.max(0, current)));
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return progress;
};

const useIntersectionReveal = <T extends HTMLElement>(
  options: IntersectionObserverInit = {}
): [React.RefObject<T | null>, boolean] => {
  const ref = useRef<T | null>(null);
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
  }, []);
  
  return [ref, isVisible];
};

// ===========================================
// SEMANTIC METER (Progress Bar)
// ===========================================

interface MeterNode {
  id: string;
  label: string;
  position: number; // percentage
}

const SemanticMeter: React.FC<{ progress: number }> = ({ progress }) => {
  const nodes: MeterNode[] = [
    { id: 'richard', label: 'RICHARD', position: 5 },
    { id: 'rick', label: 'RICK', position: 18 },
    { id: 'dick', label: 'DICK', position: 32 },
    { id: 'fellow', label: 'FELLOW', position: 48 },
    { id: 'slang', label: 'SLANG', position: 68 },
    { id: 'taboo', label: 'TABOO', position: 88 },
  ];
  
  return (
    <aside className="semantic-meter" aria-label={`Reading progress: ${Math.round(progress)}%`}>
      <div className="semantic-meter-track">
        <div className="meter-line" />
        <div className="meter-fill" style={{ height: `${progress}%` }} />
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`meter-node ${progress >= node.position ? 'active' : ''}`}
            style={{ bottom: `${node.position}%` }}
          >
            <span className="meter-dot" />
            <span className="meter-label">{node.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

// ===========================================
// ETYMOLOGY CALLOUT
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
    <div 
      ref={ref} 
      className="etymology-callout"
      style={{ 
        opacity: isVisible ? 1 : 0, 
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div className="etymology-word-display">{word}</div>
      {pronunciation && <p className="etymology-pronunciation">{pronunciation}</p>}
      <p className="etymology-meaning">{meaning}</p>
      {source && <p className="etymology-source">{source}</p>}
    </div>
  );
};

// ===========================================
// TRANSFORMATION DISPLAY
// ===========================================

interface TransformStep {
  word: string;
  label: string;
}

const TransformationDisplay: React.FC<{ steps: TransformStep[] }> = ({ steps }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>();
  
  return (
    <div 
      ref={ref} 
      className="transformation-display"
      style={{ 
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.8s ease-out'
      }}
    >
      {steps.map((step, index) => (
        <React.Fragment key={step.word}>
          <div 
            className="transform-step"
            style={{ 
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.6s ease-out ${index * 150}ms`
            }}
          >
            <span className="transform-word">{step.word}</span>
            <span className="transform-label">{step.label}</span>
          </div>
          {index < steps.length - 1 && <span className="transform-arrow">→</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

// ===========================================
// FIGURE PROFILE
// ===========================================

interface FigureProfileProps {
  name: string;
  epithet: string;
  dates: string;
  initial: string;
  contributions: string[];
  quote?: string;
  quoteSource?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageCredit?: string;
  imageLicense?: string;
  imageSourceUrl?: string;
}

const FigureProfile: React.FC<FigureProfileProps> = ({
  name,
  epithet,
  dates,
  initial,
  contributions,
  quote,
  quoteSource,
  imageUrl,
  imageAlt,
  imageCredit,
  imageLicense,
  imageSourceUrl,
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLElement>();

  return (
    <figure
      ref={ref}
      className="figure-profile"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div className="figure-portrait">
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={imageAlt || name}
              className="portrait-image"
            />
            {imageCredit && (
              <p className="portrait-caption">
                {imageSourceUrl ? (
                  <a href={imageSourceUrl} target="_blank" rel="noopener noreferrer">
                    {imageCredit}
                  </a>
                ) : (
                  imageCredit
                )}
                {imageLicense && <> · {imageLicense}</>}
              </p>
            )}
          </>
        ) : (
          <div className="portrait-placeholder">
            <span className="portrait-initial">{initial}</span>
          </div>
        )}
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
// PULL QUOTE
// ===========================================

interface PullQuoteProps {
  children: React.ReactNode;
  attribution: string;
  year?: string;
}

const PullQuote: React.FC<PullQuoteProps> = ({ children, attribution, year }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>();
  
  return (
    <div 
      ref={ref} 
      className="pull-quote"
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
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
// NARRATIVE TEXT
// ===========================================

const NarrativeText: React.FC<{ children: React.ReactNode; delay?: number }> = ({ 
  children, 
  delay = 0 
}) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLParagraphElement>();
  
  return (
    <p 
      ref={ref} 
      className="narrative-text"
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.7s ease-out ${delay}ms`
      }}
    >
      {children}
    </p>
  );
};

// ===========================================
// CHAPTER HEADER
// ===========================================

interface ChapterHeaderProps {
  number: string;
  title: string;
  era: string;
  metaphor?: string;
}

const ChapterHeader: React.FC<ChapterHeaderProps> = ({ number, title, era, metaphor }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>();
  
  return (
    <div 
      ref={ref} 
      className="chapter-header"
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <span className="chapter-number">{number}</span>
      <h2 className="chapter-title">{title}</h2>
      <span className="chapter-era">{era}</span>
      {metaphor && <p className="chapter-metaphor">"{metaphor}"</p>}
    </div>
  );
};

// ===========================================
// SECTION DIVIDER
// ===========================================

const SectionDivider: React.FC<{ symbol?: string }> = ({ symbol = '✦' }) => (
  <div className="section-divider">
    <span className="divider-symbol">{symbol}</span>
  </div>
);

// ===========================================
// SSA DATA CHART
// ===========================================

const SSAChart: React.FC = () => {
  const [ref, isVisible] = useIntersectionReveal<HTMLDivElement>();
  
  return (
    <div 
      ref={ref}
      className="ssa-chart-container"
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div className="ssa-chart-title">Name Popularity: "Dick" in the United States</div>
      <div className="ssa-chart">
        <svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
          {/* Grid lines */}
          <line x1="50" y1="20" x2="50" y2="130" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <line x1="50" y1="130" x2="380" y2="130" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          
          {/* X-axis labels */}
          <text x="80" y="145" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="var(--font-mono)">1920</text>
          <text x="155" y="145" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="var(--font-mono)">1940</text>
          <text x="230" y="145" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="var(--font-mono)">1960</text>
          <text x="290" y="145" fill="var(--accent-modern)" fontSize="8" fontFamily="var(--font-mono)" fontWeight="bold">1969</text>
          <text x="350" y="145" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="var(--font-mono)">2000</text>
          
          {/* Area fill */}
          <path
            className="ssa-chart-area"
            d="M60,110 Q100,90 140,50 Q180,30 200,35 Q220,40 250,70 Q270,100 290,120 Q320,128 370,129 L370,130 L60,130 Z"
            fill="rgba(201, 76, 76, 0.15)"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 1s ease-out 0.3s'
            }}
          />
          
          {/* Line */}
          <path
            className="ssa-chart-line"
            d="M60,110 Q100,90 140,50 Q180,30 200,35 Q220,40 250,70 Q270,100 290,120 Q320,128 370,129"
            stroke="var(--accent-modern)"
            strokeWidth="2"
            fill="none"
            style={{
              strokeDasharray: 500,
              strokeDashoffset: isVisible ? 0 : 500,
              transition: 'stroke-dashoffset 1.5s ease-out 0.5s'
            }}
          />
          
          {/* 1969 marker */}
          <line x1="290" y1="20" x2="290" y2="120" stroke="var(--accent-modern)" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
          <circle cx="290" cy="120" r="4" fill="var(--accent-modern)" />
        </svg>
      </div>
      <div className="ssa-milestone">
        <div className="ssa-milestone-year">1969</div>
        <div className="ssa-milestone-text">Falls out of top 1,000 baby names</div>
      </div>
      <div className="ssa-milestone" style={{ marginTop: '0.5rem' }}>
        <div className="ssa-milestone-year">2014</div>
        <div className="ssa-milestone-text">Fewer than 5 babies named Dick in the United States</div>
      </div>
      <p className="ssa-chart-source">
        Source: <a href="https://www.ssa.gov/oact/babynames/" target="_blank" rel="noopener noreferrer">U.S. Social Security Administration</a>
      </p>
    </div>
  );
};

// ===========================================
// MAIN COMPONENT
// ===========================================

export default function TheWordDickClient() {
  const scrollProgress = useScrollProgress();
  
  return (
    <article className="the-word-dick-essay">
      {/* Semantic Meter Progress */}
      <SemanticMeter progress={scrollProgress} />
      
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <header className="dick-hero">
        <span className="hero-etymology-tag">Etymology</span>
        
        <div className="hero-word-stage">
          <div className="hero-word-ghost">DICK</div>
          <h1 className="hero-main-word">DICK</h1>
        </div>
        
        <div className="hero-etymology-chain">
          <span className="chain-word">Richard</span>
          <span className="chain-arrow">→</span>
          <span className="chain-word">Rick</span>
          <span className="chain-arrow">→</span>
          <span className="chain-word">Dick</span>
        </div>
        
        <p className="hero-subtitle">
          How a Medieval Pet Name Became Unspeakable
        </p>
        
        <div className="hero-scroll-cue">
          <span>Scroll to begin</span>
          <div className="scroll-line" />
        </div>
      </header>
      
      {/* ============================================
          PROLOGUE
          ============================================ */}
      <section className="prologue">
        <div className="prologue-content">
          <p className="prologue-lead">
            Every word has a biography.
          </p>
          <p className="prologue-text">
            Some words live quiet lives, meaning the same thing for centuries. Others undergo 
            radical transformations—their meanings shifting, fragmenting, sometimes reversing 
            entirely. The word <span className="prologue-highlight">dick</span> belongs to 
            this latter category.
          </p>
          <p className="prologue-text">
            What began as an affectionate nickname for Richard in medieval England has 
            traveled through 800 years of semantic change—from aristocratic pet name to 
            generic everyman, from innocent slang to cultural taboo.
          </p>
          <p className="prologue-text">
            This is the story of that transformation.
          </p>
        </div>
      </section>
      
      {/* ============================================
          CHAPTER 1: THE NAME (Medieval)
          ============================================ */}
      <section className="chapter era-medieval" id="ch1-the-name">
        <ChapterHeader
          number="I"
          title="The Name"
          era="Medieval England · 1200–1500 CE"
          metaphor="In the beginning, there was Richard—and Richard needed a nickname."
        />
        
        <EtymologyCallout
          word="RICHARD"
          pronunciation="/ˈrɪtʃ.ərd/"
          meaning={<>From Germanic <em>ric</em> (ruler) + <em>hard</em> (brave). Meaning: <em>"powerful ruler"</em></>}
          source="Introduced to England by the Normans, 1066"
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
        
        <TransformationDisplay
          steps={[
            { word: 'Richard', label: 'FORMAL NAME' },
            { word: 'Rick', label: 'SHORTENED' },
            { word: 'Dick', label: 'RHYMING FORM' },
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
            <span className="text-highlight">D</span>, and Rick became Dick. By the 13th century, 
            it was as unremarkable as calling a William "Bill" today.
          </NarrativeText>
        </div>
        
        <FigureProfile
          name="Richard I (Richard the Lionheart)"
          epithet="England's Most Famous Richard"
          dates="1157–1199"
          initial="R"
          imageUrl="https://upload.wikimedia.org/wikipedia/commons/6/6b/Church_of_Fontevraud_Abbey_Richard_I_effigy.jpg"
          imageAlt="Stone effigy of Richard I lying in repose at Fontevraud Abbey"
          imageCredit="Effigy at Fontevraud Abbey"
          imageLicense="CC BY-SA 3.0"
          imageSourceUrl="https://commons.wikimedia.org/wiki/File:Church_of_Fontevraud_Abbey_Richard_I_effigy.jpg"
          contributions={[
            "King whose legendary status elevated the name's prestige",
            "Third Crusade leader, warrior-king of romance and legend",
            "Spent only six months of his reign in England",
            "His fame ensured Richard remained a top English name for centuries",
          ]}
          quote="I would sell London if I could find a buyer."
          quoteSource="Attributed, raising Crusade funds"
        />
        
        <PullQuote attribution="Medieval nicknaming pattern" year="c. 1200s">
          Richard → Rick → Dick. William → Will → Bill. Robert → Rob → Bob. 
          The rhyme was the rule.
        </PullQuote>
        
        <SectionDivider symbol="✦" />
      </section>
      
      {/* ============================================
          CHAPTER 2: THE EVERYMAN (Tudor/Stuart)
          ============================================ */}
      <section className="chapter era-tudor" id="ch2-the-everyman">
        <ChapterHeader
          number="II"
          title="The Everyman"
          era="Tudor & Stuart England · 1500–1700"
          metaphor="When a name becomes so common, it starts to mean 'anyone.'"
        />
        
        <div className="narrative-block">
          <NarrativeText>
            Something interesting happens when a name becomes extraordinarily popular: it 
            loses specificity. In Tudor England, Richard (and therefore Dick) was so common 
            that "Dick" began acquiring a secondary meaning—not a particular man named 
            Richard, but <span className="text-highlight">any man</span>, or{' '}
            <span className="text-highlight">every man</span>.
          </NarrativeText>
        </div>
        
        <EtymologyCallout
          word="DICK"
          pronunciation="/dɪk/"
          meaning={<>Evolving meaning: <em>any ordinary fellow, an everyman</em></>}
          source="First attested in this usage: 1553"
        />
        
        <div className="narrative-block">
          <NarrativeText>
            This pattern has repeated throughout English history. "Jack" underwent the same 
            transformation—from a specific name to a generic term (hence "jack-of-all-trades," 
            "every man jack"). "John" became "john" (as in "John Doe"). Names that achieve 
            critical mass become common nouns.
          </NarrativeText>
          
          <NarrativeText delay={100}>
            The phrase <span className="text-etymology">"Tom, Dick, and Harry"</span> emerged 
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
        
        <SectionDivider symbol="◆" />
      </section>
      
      {/* ============================================
          CHAPTER 3: THE SLANG TURN (Georgian)
          ============================================ */}
      <section className="chapter era-georgian" id="ch3-the-slang-turn">
        <ChapterHeader
          number="III"
          title="The Slang Turn"
          era="Georgian England · 1700–1840"
          metaphor="In the barracks and the streets, words take on new lives."
        />
        
        <div className="narrative-block">
          <NarrativeText>
            The 18th century was an age of slang. British military culture, sailor jargon, 
            criminal cant, and street language all flourished—and cross-pollinated. It was 
            in this linguistic hothouse that "dick" began acquiring its anatomical meaning.
          </NarrativeText>
          
          <NarrativeText delay={100}>
            The exact origins are debated by etymologists. Some point to the general pattern 
            of using common male names as slang for male anatomy (compare "peter," "john," 
            "johnson," "willie"). The pattern was consistent—and Dick followed it.
          </NarrativeText>
        </div>
        
        <FigureProfile
          name="Francis Grose"
          epithet="The Vulgar Lexicographer"
          dates="1731–1791"
          initial="G"
          imageUrl="https://upload.wikimedia.org/wikipedia/commons/d/da/Captain_Francisa_Grose%2C_FSA.jpg"
          imageAlt="Oval portrait engraving of Francis Grose, a portly man in 18th-century dress"
          imageCredit="After Nathaniel Dance, c. 1787"
          imageLicense="Public Domain"
          imageSourceUrl="https://commons.wikimedia.org/wiki/File:Captain_Francisa_Grose,_FSA.jpg"
          contributions={[
            "English antiquary and lexicographer",
            "Published 'A Classical Dictionary of the Vulgar Tongue' (1785)",
            "First serious attempt to document English street slang",
            "Revealed the hidden vocabulary of Georgian England",
          ]}
          quote="The Vulgar Tongue... words and phrases used by... persons of low and illiberal education."
          quoteSource="Dictionary preface"
        />
        
        <div className="narrative-block">
          <NarrativeText>
            Francis Grose's dictionary brought slang into print for the first time. Though 
            his documentation of "dick" in the anatomical sense came later, his work 
            established that street language was worthy of scholarly attention.
          </NarrativeText>
          
          <NarrativeText delay={100}>
            For decades, the new meaning coexisted with the old. The polite world used "Dick" 
            as a name; the vulgar world used it as slang. The two meanings existed in parallel, 
            separated by class and context.
          </NarrativeText>
        </div>
        
        <SectionDivider symbol="❧" />
      </section>
      
      {/* ============================================
          CHAPTER 4: THE VICTORIAN PARADOX
          ============================================ */}
      <section className="chapter era-victorian" id="ch4-the-victorian-paradox">
        <ChapterHeader
          number="IV"
          title="The Victorian Paradox"
          era="Victorian England · 1840–1900"
          metaphor="The age that invented prudery couldn't escape the vernacular."
        />
        
        <div className="narrative-block">
          <NarrativeText>
            Victorian England was famously prudish—yet the vulgar meaning of "dick" continued 
            to circulate. The respectable classes developed elaborate strategies to avoid 
            vulgar words, while those same words thrived in the streets, music halls, and 
            private conversations.
          </NarrativeText>
          
          <NarrativeText delay={100}>
            "Dick" as a personal name remained entirely acceptable. Charles Dickens used 
            "Dick Swiveller" in <em>The Old Curiosity Shop</em>. No Victorian reader found 
            the name objectionable. The word led a double life—respectable above, vulgar below.
          </NarrativeText>
        </div>
        
        <EtymologyCallout
          word="1891"
          meaning={<><em>First documented anatomical usage in print</em><br/>John S. Farmer's "Slang and Its Analogues"</>}
          source="Oxford English Dictionary earliest citation"
        />
        
        <FigureProfile
          name="John S. Farmer"
          epithet="Documenter of the Unspeakable"
          dates="1854–1916"
          initial="F"
          imageUrl="https://upload.wikimedia.org/wikipedia/commons/b/b2/John_S._Farmer_spiritualist_%28cropped%29.png"
          imageAlt="Black and white portrait photograph of John S. Farmer"
          imageCredit="Only known photograph"
          imageLicense="Public Domain"
          imageSourceUrl="https://commons.wikimedia.org/wiki/File:John_S._Farmer_spiritualist_(cropped).png"
          contributions={[
            "English lexicographer",
            "'Slang and Its Analogues' (1891) first documented the anatomical meaning",
            "His dictionary is the OED's earliest citation for this usage",
            "Made the unspeakable printable—in scholarly Latin, of course",
          ]}
        />
        
        <div className="narrative-block">
          <NarrativeText>
            In 1891, John S. Farmer's slang dictionary provided the first printed 
            documentation of the anatomical meaning. The word had likely circulated 
            in oral usage for decades before—possibly in British military slang—but 
            Farmer made it citable.
          </NarrativeText>
        </div>
        
        <PullQuote attribution="Richard von Krafft-Ebing (on similar works)" year="1886">
          The work is written in Latin where matters of a sexual nature are discussed, 
          so as to prevent it from becoming the subject of common conversation.
        </PullQuote>
        
        <SectionDivider symbol="✧" />
      </section>
      
      {/* ============================================
          CHAPTER 5: THE TIPPING POINT (Modern)
          ============================================ */}
      <section className="chapter era-modern" id="ch5-the-tipping-point">
        <ChapterHeader
          number="V"
          title="The Tipping Point"
          era="20th Century America · 1900–1980"
          metaphor="The century when the vulgar meaning won."
        />
        
        <div className="narrative-block">
          <NarrativeText>
            The 20th century witnessed the final act of "dick's" transformation. In early 
            decades, Dick remained a common name—Richard Nixon was called "Dick Nixon" 
            throughout his career. Dick Tracy was a beloved comic strip detective. 
            Dick Van Dyke became a television star.
          </NarrativeText>
          
          <NarrativeText delay={100}>
            But the tide was turning. By the 1960s and 1970s, the crude meaning had become 
            so widely known—and increasingly used openly—that the name began its decline. 
            The SSA data tells the story.
          </NarrativeText>
        </div>
        
        <SSAChart />
        
        <FigureProfile
          name="Richard Nixon"
          epithet="The Last Famous Dick"
          dates="1913–1994"
          initial="N"
          imageUrl="https://upload.wikimedia.org/wikipedia/commons/2/2c/Richard_Nixon_presidential_portrait_%281%29.jpg"
          imageAlt="Official presidential portrait of Richard Nixon in the Oval Office"
          imageCredit="White House Photo Office, 1971"
          imageLicense="Public Domain"
          imageSourceUrl="https://commons.wikimedia.org/wiki/File:Richard_Nixon_presidential_portrait_(1).jpg"
          contributions={[
            "37th President of the United States",
            "Consistently called 'Dick Nixon' throughout his career",
            "One of the last prominent Americans to use 'Dick' publicly",
            "His era marked the name's final mainstream acceptance",
          ]}
          quote="I am not a crook."
          quoteSource="Press conference, 1973"
        />
        
        <div className="narrative-block">
          <NarrativeText>
            In 1966, a new meaning crystallized. Norman Bogner's novel <em>Seventh Avenue</em> 
            contained the first documented use of "dick" as a character insult—not anatomy, 
            but personality.
          </NarrativeText>
        </div>
        
        <PullQuote attribution="Norman Bogner, Seventh Avenue" year="1966">
          He's a dick. I don't know from respect, except for my parents.
        </PullQuote>
        
        <div className="narrative-block">
          <NarrativeText>
            Parents stopped naming their sons Dick. Men named Richard increasingly went by 
            "Rich," "Rick," or "Richie." The name didn't disappear overnight, but its 
            trajectory was clear.
          </NarrativeText>
        </div>
        
        <SectionDivider symbol="◈" />
      </section>
      
      {/* ============================================
          CHAPTER 6: THE WORD TODAY (Contemporary)
          ============================================ */}
      <section className="chapter era-contemporary" id="ch6-the-word-today">
        <ChapterHeader
          number="VI"
          title="The Word Today"
          era="Contemporary Usage · 1980–Present"
          metaphor="A word that contains multitudes—all of them complicated."
        />
        
        <div className="narrative-block">
          <NarrativeText>
            Today, "dick" exists in a curious state. The personal name survives among older 
            generations—men born before 1970—but has virtually vanished from new births. 
            By 2014, fewer than five American babies received the name.
          </NarrativeText>
          
          <NarrativeText delay={100}>
            The word's meanings have stratified into distinct registers. As anatomy, it's 
            vulgar but not obscene. As an insult ("don't be a dick"), it's widely used and 
            broadly understood. As a detective ("private dick"), it's nostalgic, evoking 
            noir fiction. And as a name—nearly extinct.
          </NarrativeText>
        </div>
        
        <EtymologyCallout
          word="DICK"
          meaning={
            <>
              Contemporary meanings:<br />
              <em>1. Male anatomy (vulgar)</em><br />
              <em>2. An obnoxious person (slang insult)</em><br />
              <em>3. Detective (dated American)</em><br />
              <em>4. Personal name (increasingly rare)</em>
            </>
          }
        />
        
        <div className="narrative-block">
          <NarrativeText>
            The word's journey reveals something about language itself: meanings are not 
            fixed properties but social negotiations. A word means what its speakers 
            understand it to mean—and those understandings shift across time, class, 
            and context.
          </NarrativeText>
          
          <NarrativeText delay={100}>
            "Dick" didn't become vulgar because of some inherent property—it became vulgar 
            because enough speakers used it that way, for long enough, until the vulgar 
            meaning overwhelmed the innocent one.
          </NarrativeText>
        </div>
        
        <PullQuote attribution="Steven Pinker, The Stuff of Thought" year="2007">
          When a language isn't up to the conceptual demands of its speakers,
          they don't scratch their heads dumbfounded; they simply change the language.
          They stretch it with metaphors and metonyms, borrow words and phrases
          from other languages, or coin new slang and jargon.
        </PullQuote>
      </section>
      
      {/* ============================================
          EPILOGUE
          ============================================ */}
      <section className="epilogue">
        <div className="epilogue-content">
          <div className="epilogue-word">DICK</div>
          
          <h2 className="epilogue-title">The Word That Changed Its Stripes</h2>
          
          <p className="epilogue-text">
            800 years ago, a mother in medieval England called her son by his nickname—Dick, 
            for Richard—with nothing but affection in her voice. She could not have imagined 
            what the word would become.
          </p>
          
          <p className="epilogue-text">
            Words are living things. They are born, they grow, they change. They acquire 
            meanings their creators never imagined and shed meanings they once held dear. 
            The word "dick" has traveled further than most—from royal court to common street, 
            from innocent nickname to cultural taboo.
          </p>
          
          <p className="epilogue-text">
            The next time you hear this word—in whatever context—you're hearing 800 years 
            of history. Every meaning it carries is a layer of time, a record of how 
            speakers used it, shaped it, transformed it.
          </p>
          
          <p className="epilogue-closing">
            Etymology is biography—not of a person, but of a people.
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
            <h4>Etymology & Dictionaries</h4>
            <ul>
              <li><a href="https://www.etymonline.com/word/dick" target="_blank" rel="noopener noreferrer">Online Etymology Dictionary</a></li>
              <li><a href="https://www.merriam-webster.com/dictionary/dick" target="_blank" rel="noopener noreferrer">Merriam-Webster Dictionary</a></li>
              <li><a href="https://archive.org/details/slangitsanalogue01farmuoft" target="_blank" rel="noopener noreferrer">Farmer, John S. <em>Slang and Its Analogues</em> (1891)</a></li>
              <li><a href="https://archive.org/details/classicaldiction00grosuoft" target="_blank" rel="noopener noreferrer">Grose, Francis. <em>A Classical Dictionary of the Vulgar Tongue</em> (1785)</a></li>
            </ul>
          </div>

          <div className="source-category">
            <h4>Linguistics & Language</h4>
            <ul>
              <li><a href="https://grammarphobia.com/blog/2011/01/dick.html" target="_blank" rel="noopener noreferrer">Grammarphobia: Etymology of Dick</a></li>
              <li><a href="https://melmagazine.com/en-us/story/all-the-ways-dick-became-a-word" target="_blank" rel="noopener noreferrer">MEL Magazine: All the Ways Dick Became a Word</a></li>
              <li><a href="https://english.stackexchange.com/questions/344805/evolution-of-the-word-dick" target="_blank" rel="noopener noreferrer">English Stack Exchange: Evolution of "Dick"</a></li>
            </ul>
          </div>

          <div className="source-category">
            <h4>Data Sources</h4>
            <ul>
              <li><a href="https://www.ssa.gov/oact/babynames/" target="_blank" rel="noopener noreferrer">U.S. Social Security Administration Baby Names</a></li>
              <li><a href="https://en.wikipedia.org/wiki/Dick_(nickname)" target="_blank" rel="noopener noreferrer">Wikipedia: Dick (nickname)</a></li>
              <li><a href="https://en.wikipedia.org/wiki/Dick_(slang)" target="_blank" rel="noopener noreferrer">Wikipedia: Dick (slang)</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </article>
  );
}



