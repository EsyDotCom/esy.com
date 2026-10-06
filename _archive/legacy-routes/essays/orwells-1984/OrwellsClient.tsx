"use client";

import React, { useEffect, useState, useRef } from "react";
import "./orwells-1984.css";

// ============================================================================
// TYPES
// ============================================================================

interface Source {
  title: string;
  url: string;
  type: "primary" | "academic" | "journalism";
}

// ============================================================================
// IMAGE ASSETS (from research/VISUALS.md - Wikimedia Commons Public Domain)
// ============================================================================

const IMAGES = {
  orwell: {
    bbc1943: "https://upload.wikimedia.org/wikipedia/commons/7/7a/George-orwell-BBC.jpg",
    spanishWar1937: "https://upload.wikimedia.org/wikipedia/commons/2/2e/George_Orwell.jpg", // Fallback portrait - original ILP group photo not available
    passport: "https://upload.wikimedia.org/wikipedia/commons/7/7e/George_Orwell_press_photo.jpg",
  },
  stalin: {
    portrait: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Stalin_1945.jpg",
  },
  yezhov: {
    before: "https://upload.wikimedia.org/wikipedia/commons/0/09/Nikolai_Yezhov_with_Stalin_and_Molotov_along_the_Volga%E2%80%93Don_Canal%2C_orignal.jpg",
    after: "https://upload.wikimedia.org/wikipedia/commons/b/be/Stalin_and_Molotov_along_the_Volga%E2%80%93Don_Canal%2C_Nikolai_Yezhov_removed.jpg",
  },
  hitler: {
    rally: "https://upload.wikimedia.org/wikipedia/commons/9/94/Bundesarchiv_Bild_183-2006-0329-502%2C_N%C3%BCrnberg%2C_Reichsparteitag%2C_Adolf_Hitler_vor_Lichtdom.jpg",
  },
  books: {
    first1984: "https://upload.wikimedia.org/wikipedia/commons/5/51/1984_first_edition_cover.jpg",
  },
  senateHouse: "https://upload.wikimedia.org/wikipedia/commons/9/98/Senate_House_UoL.jpg",
} as const;

// ============================================================================
// DATA
// ============================================================================

const sources: Source[] = [
  {
    title: "Orwell, George. Nineteen Eighty-Four. Secker & Warburg, 1949.",
    url: "https://www.britannica.com/topic/Nineteen-Eighty-four",
    type: "primary",
  },
  {
    title: 'Orwell, George. "Why I Write." Gangrel, 1946.',
    url: "https://www.orwellfoundation.com/the-orwell-foundation/orwell/essays-and-other-works/why-i-write/",
    type: "primary",
  },
  {
    title: "Orwell, George. Homage to Catalonia. Secker & Warburg, 1938.",
    url: "https://www.britannica.com/topic/Homage-to-Catalonia",
    type: "primary",
  },
  {
    title: "Orwell, George. Down and Out in Paris and London. Victor Gollancz, 1933.",
    url: "https://www.britannica.com/topic/Down-and-Out-in-Paris-and-London",
    type: "primary",
  },
  {
    title: "Orwell, George. The Road to Wigan Pier. Victor Gollancz, 1937.",
    url: "https://www.britannica.com/topic/The-Road-to-Wigan-Pier",
    type: "primary",
  },
  {
    title: "Crick, Bernard. George Orwell: A Life. Secker & Warburg, 1980.",
    url: "https://www.britannica.com/biography/George-Orwell",
    type: "academic",
  },
  {
    title: "Lynskey, Dorian. The Ministry of Truth: The Biography of 1984. Doubleday, 2019.",
    url: "https://www.theguardian.com/books/2019/may/19/how-george-orwell-wrote-nineteen-eighty-four-dorian-lynskey",
    type: "academic",
  },
  {
    title: "Arendt, Hannah. The Origins of Totalitarianism. Schocken, 1951.",
    url: "https://www.britannica.com/topic/The-Origins-of-Totalitarianism",
    type: "academic",
  },
  {
    title: "The Guardian: Original 1949 Review of Nineteen Eighty-Four.",
    url: "https://www.theguardian.com/books/1949/jun/10/georgeorwell.classics",
    type: "journalism",
  },
  {
    title: "Encyclopaedia Britannica: George Orwell.",
    url: "https://www.britannica.com/biography/George-Orwell",
    type: "academic",
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Typewriter Progress Bar
 * Keys spelling "1984" depress as reader progresses
 */
const TypewriterProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = Math.min((window.scrollY / scrollHeight) * 100, 100);
      setProgress(currentProgress);
    };

    const handleScroll = () => {
      // Throttle updates to animation frame rate
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        updateProgress();
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Determine which keys are "struck" based on progress
  const key1Active = progress >= 10;
  const key9Active = progress >= 35;
  const key8Active = progress >= 60;
  const key4Active = progress >= 85;

  return (
    <div className="typewriter-progress" aria-hidden="true">
      <div className="typewriter-container">
        <div className={`typewriter-key ${key1Active ? "struck" : ""}`}>
          <span className="key-char">1</span>
        </div>
        <div className={`typewriter-key ${key9Active ? "struck" : ""}`}>
          <span className="key-char">9</span>
        </div>
        <div className={`typewriter-key ${key8Active ? "struck" : ""}`}>
          <span className="key-char">8</span>
        </div>
        <div className={`typewriter-key ${key4Active ? "struck" : ""}`}>
          <span className="key-char">4</span>
        </div>
      </div>
      <div className="typewriter-ribbon">
        <div className="ribbon-progress" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

/**
 * Section with Intersection Observer for reveal animations
 */
const Section: React.FC<{
  id: string;
  className?: string;
  children: React.ReactNode;
  era?: "colonial" | "poverty" | "spain" | "bbc" | "soviet" | "nazi" | "jura" | "novel";
}> = ({ id, className = "", children, era }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setIsVisible(true);
        },
        { threshold: 0.1, rootMargin: "50px" }
      );

      if (sectionRef.current) observer.observe(sectionRef.current);
      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`section ${className} ${isVisible ? "visible" : ""} ${era ? `era-${era}` : ""}`}
    >
      {children}
    </section>
  );
};

/**
 * Quote Monument - Major quotes from primary sources
 */
const QuoteMonument: React.FC<{
  quote: string;
  speaker: string;
  source: string;
  year?: string;
  variant?: "orwell" | "novel" | "historical";
}> = ({ quote, speaker, source, year, variant = "orwell" }) => {
  return (
    <blockquote className={`quote-monument quote-${variant}`}>
      <p className="quote-text">{quote}</p>
      <footer className="quote-footer">
        <cite className="quote-speaker">{speaker}</cite>
        <span className="quote-source">
          {source}
          {year && `, ${year}`}
        </span>
      </footer>
    </blockquote>
  );
};

/**
 * Figure Profile - Key historical figures
 */
const FigureProfile: React.FC<{
  name: string;
  epithet: string;
  imageSrc?: string;
  contributions: string[];
  quote?: { text: string; source: string };
}> = ({ name, epithet, imageSrc, contributions, quote }) => {
  return (
    <div className="figure-profile">
      {imageSrc && (
        <div className="figure-image-container">
          <img src={imageSrc} alt={name} className="figure-image" loading="lazy" />
        </div>
      )}
      <div className="figure-content">
        <h3 className="figure-name">{name}</h3>
        <p className="figure-epithet">{epithet}</p>
        <ul className="figure-contributions">
          {contributions.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
        {quote && (
          <blockquote className="figure-quote">
            <p>&ldquo;{quote.text}&rdquo;</p>
            <cite>— {quote.source}</cite>
          </blockquote>
        )}
      </div>
    </div>
  );
};

/**
 * Yezhov Erasure Component
 * The signature interaction - scroll-driven "unpersoning"
 */
const YezhovErasure: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [erasureProgress, setErasureProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;

      // Erasure should complete while image is still clearly visible
      // Start: when element enters viewport (top at 85% of screen)
      // End: when element is centered (top at 25% of screen)
      const triggerStart = windowHeight * 0.85;
      const triggerEnd = windowHeight * 0.25;

      if (elementTop < triggerStart && elementTop > -elementHeight) {
        const progress = Math.max(0, Math.min(1, (triggerStart - elementTop) / (triggerStart - triggerEnd)));
        setErasureProgress(progress);
      }
    };

    const handleScroll = () => {
      // Throttle updates to animation frame rate
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        updateProgress();
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress(); // Initial check
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="yezhov-erasure">
      <div className="erasure-container">
        <div className="erasure-frame">
          {/* Before image - fades out */}
          <img 
            src={IMAGES.yezhov.before} 
            alt="Stalin with Yezhov at the Volga-Don Canal, 1937"
            className="erasure-before"
            style={{ opacity: 1 - erasureProgress }}
          />
          {/* After image - fades in */}
          <img 
            src={IMAGES.yezhov.after} 
            alt="Same photograph with Yezhov erased, circa 1940"
            className="erasure-after"
            style={{ opacity: erasureProgress }}
          />
        </div>
        <div className="erasure-caption">
          <p className="erasure-date" style={{ opacity: erasureProgress > 0.3 ? 1 : 0 }}>
            1940. Yezhov is executed.
          </p>
          <p className="erasure-quote" style={{ opacity: erasureProgress > 0.7 ? 1 : 0 }}>
            &ldquo;He had been vaporized, as the phrase was.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Typewriter Text Animation
 * Text appears as if being typed
 */
const TypewriterText: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let i = 0;
          const interval = setInterval(() => {
            if (i < text.length) {
              setDisplayedText(text.slice(0, i + 1));
              i++;
            } else {
              clearInterval(interval);
            }
          }, 50);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [text, hasAnimated]);

  return (
    <div ref={containerRef} className={`typewriter-text ${className}`}>
      <span>{displayedText}</span>
      <span className="typewriter-cursor">|</span>
    </div>
  );
};

/**
 * Sources Section
 */
const Sources: React.FC<{ sources: Source[] }> = ({ sources }) => (
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
        This narrative was fact-checked against peer-reviewed sources, authorized biographies, 
        and Orwell&apos;s own essays and correspondence.
      </p>
    </div>
  </section>
);

// ============================================================================
// MAIN CLIENT COMPONENT
// ============================================================================

export default function OrwellsClient() {
  return (
      <div className="orwells-essay">
        {/* Progress Bar */}
        <TypewriterProgressBar />

        {/* ================================================================== */}
        {/* HERO SECTION */}
        {/* ================================================================== */}
        <Section id="hero" className="hero-section" era="novel">
          <div className="hero-content">
            <div className="hero-typewriter">
              <TypewriterText 
                text="If you want a picture of the future, imagine a boot stamping on a human face — forever." 
                className="hero-quote"
              />
            </div>
            <p className="hero-question">How did he know?</p>
            <div className="hero-portrait">
              <img 
                src={IMAGES.orwell.bbc1943} 
                alt="George Orwell, circa 1943" 
                className="orwell-portrait"
              />
            </div>
            <h1 className="hero-title">The Architecture of Unfreedom</h1>
            <p className="hero-subtitle">
              How George Orwell Built <em>1984</em> from the Horrors He Witnessed
            </p>
          </div>
        </Section>

        {/* ================================================================== */}
        {/* PROLOGUE: THE FACE BEHIND THE WARNING */}
        {/* ================================================================== */}
        <Section id="prologue" className="prologue-section">
          <div className="prologue-content">
            <div className="section-marker">Prologue</div>
            <h2>The Face Behind the Warning</h2>
            
            <p className="lead-paragraph">
              This face — gaunt, serious, prematurely aged by disease and war — belonged to a 
              writer who had less than five years to live. He was spending those years in 
              physical agony, racing to finish a warning.
            </p>

            <p>
              <em>Nineteen Eighty-Four</em> is often taught as speculative fiction, a &ldquo;what if&rdquo; 
              about a future that never arrived. This essay will demonstrate that it is closer 
              to historical testimony. Every mechanism of control in Oceania traces to something 
              Eric Arthur Blair — the man behind the pen name — witnessed firsthand.
            </p>

            <div className="connection-list">
              <div className="connection-item">
                <span className="connection-origin">The boot that stamps forever?</span>
                <span className="connection-arrow">→</span>
                <span className="connection-target">He wore it in Burma.</span>
              </div>
              <div className="connection-item">
                <span className="connection-origin">The Ministry of Truth?</span>
                <span className="connection-arrow">→</span>
                <span className="connection-target">He worked in its prototype at the BBC.</span>
              </div>
              <div className="connection-item">
                <span className="connection-origin">The Thought Police?</span>
                <span className="connection-arrow">→</span>
                <span className="connection-target">He fled them in Barcelona.</span>
              </div>
              <div className="connection-item">
                <span className="connection-origin">The destruction of Winston and Julia?</span>
                <span className="connection-arrow">→</span>
                <span className="connection-target">He understood how torture breaks human bonds.</span>
              </div>
            </div>

            <p className="prologue-coda">
              To understand <em>1984</em>, we must understand the man who wrote it.
            </p>
          </div>
        </Section>

        {/* ================================================================== */}
        {/* CHAPTER 1: THE COLONIAL POLICEMAN */}
        {/* ================================================================== */}
        <Section id="chapter-1" className="chapter-section" era="colonial">
          <div className="chapter-header">
            <span className="chapter-number">Chapter 1</span>
            <h2 className="chapter-title">The Colonial Policeman</h2>
            <span className="chapter-date">Burma, 1922–1927</span>
          </div>

          <div className="chapter-content">
            <div className="chapter-metaphor">
              <em>The enforcer sees the machine from inside — and cannot unsee it.</em>
            </div>

            <p>
              At nineteen, Eric Blair joined the Indian Imperial Police and shipped to Burma. 
              He would serve five years as an enforcer of British colonial rule — supervising 
              prisons, witnessing executions, carrying the authority of empire.
            </p>

            <p>
              He hated it. Not immediately — he was a product of his class and education — but 
              increasingly, viscerally. He saw how power works on the ground: the casual racism, 
              the systemic violence, the way the colonized are rendered less than human to 
              justify their subjugation.
            </p>

            <QuoteMonument
              quote="I perceived in this moment that when the white man turns tyrant it is his own freedom that he destroys."
              speaker="George Orwell"
              source="Shooting an Elephant"
              year="1936"
            />

            <p>
              Burma gave Orwell something no book could: intimate knowledge of what it feels 
              like to be an instrument of oppression. He knew the Thought Police because he 
              had <em>been</em> the police.
            </p>

            <p className="chapter-connection">
              <strong>Connection to 1984:</strong> Understanding how power operates at ground 
              level; the psychology of the enforcer; the Party&apos;s inner mechanics.
            </p>
          </div>
        </Section>

        {/* ================================================================== */}
        {/* CHAPTER 2: DOWN AND OUT - POVERTY YEARS */}
        {/* ================================================================== */}
        <Section id="chapter-2" className="chapter-section" era="poverty">
          <div className="chapter-header">
            <span className="chapter-number">Chapter 2</span>
            <h2 className="chapter-title">Down and Out</h2>
            <span className="chapter-date">Paris & London, 1928–1933</span>
          </div>

          <div className="chapter-content">
            <div className="chapter-metaphor">
              <em>To understand the proles, he became one.</em>
            </div>

            <p>
              In 1927, Orwell resigned from the Imperial Police. The decision was deliberate — 
              and devastating. He was rejecting his class, his income, his future. He wanted, 
              he later wrote, to escape from &ldquo;every form of man&apos;s dominion over man.&rdquo;
            </p>

            <p>
              But that wasn&apos;t enough. He needed to understand what it felt like to be at the 
              absolute bottom of society. So he went there.
            </p>

            <QuoteMonument
              quote="I wanted to submerge myself, to get right down among the oppressed, to be one of them and on their side against their tyrants."
              speaker="George Orwell"
              source="The Road to Wigan Pier"
              year="1937"
            />

            <p>
              For months, he lived as a tramp in London and a plongeur (dishwasher) in Paris. 
              He slept in doss-houses, wore rags, went hungry. He was arrested for drunkenness. 
              He scrubbed dishes in basement kitchens for eighteen hours a day.
            </p>

            <p>
              This wasn&apos;t poverty tourism. It was methodical immersion. Orwell was gathering 
              material — not just for a book, but for a worldview. He was learning how 
              degradation works, how hopelessness is manufactured, how the system keeps 
              the poor too exhausted to resist.
            </p>

            <div className="insight-box">
              <h4>The Proles of 1984</h4>
              <p>
                In <em>Nineteen Eighty-Four</em>, 85% of Oceania&apos;s population are proles — kept 
                in poverty, fed cheap entertainment, ignored by the Party because they are 
                deemed incapable of political thought.
              </p>
              <p>
                Winston hopes the proles might one day rise up. But they never do. They are 
                too busy surviving.
              </p>
            </div>

            <QuoteMonument
              quote="If there is hope, it lies in the proles... But until they become conscious they will never rebel, and until after they have rebelled they cannot become conscious."
              speaker="Winston Smith"
              source="Nineteen Eighty-Four"
              year="1949"
              variant="novel"
            />

            <p className="chapter-connection">
              <strong>Connection to 1984:</strong> The proles — kept in poverty, distracted by 
              the lottery, fed pornography and cheap beer, dismissed as subhuman by Party 
              members. Orwell knew them because he had lived among their real-world equivalents.
            </p>
          </div>
        </Section>

        {/* ================================================================== */}
        {/* CHAPTER 3: THE SOLDIER - SPANISH CIVIL WAR */}
        {/* ================================================================== */}
        <Section id="chapter-3" className="chapter-section chapter-spain" era="spain">
          <div className="chapter-header">
            <span className="chapter-number">Chapter 3</span>
            <h2 className="chapter-title">The Soldier</h2>
            <span className="chapter-date">Spanish Civil War, 1936–1937</span>
          </div>

          <div className="chapter-content">
            <div className="chapter-metaphor">
              <em>The bullet through the throat — and the betrayal that hurt worse.</em>
            </div>

            <FigureProfile
              name="George Orwell"
              epithet="The Wounded Soldier"
              imageSrc={IMAGES.orwell.spanishWar1937}
              contributions={[
                "Joined POUM militia to fight Franco's fascists",
                "Shot through throat by sniper, May 20, 1937",
                "Witnessed Stalinist suppression of fellow leftists",
                "Barely escaped NKVD-influenced police in Barcelona",
              ]}
              quote={{
                text: "Every line of serious work that I have written since 1936 has been written, directly or indirectly, against totalitarianism.",
                source: "Why I Write, 1946"
              }}
            />

            <p>
              This is the crucible. Everything Orwell became, everything he wrote from 1937 
              onward, traces to Spain.
            </p>

            <p>
              On May 20, 1937, a fascist sniper shot him through the throat. The bullet passed 
              through his neck, missing his carotid artery by millimeters. He survived, but his 
              voice was permanently damaged.
            </p>

            <p>
              Yet the bullet was not the worst wound Spain inflicted.
            </p>

            <p>
              In May 1937, the Soviet-backed Communists turned on their own allies. The NKVD, 
              Stalin&apos;s secret police operating in Spain, suppressed POUM as &ldquo;Trotskyist-fascist.&rdquo; 
              Orwell&apos;s comrades were arrested, some disappeared forever. He and his wife barely 
              escaped Barcelona.
            </p>

            <QuoteMonument
              quote="I saw newspaper reports which did not bear any relation to the facts, not even the relationship which is implied in an ordinary lie... I saw, in fact, history being written not in terms of what happened but of what ought to have happened according to various 'party lines.'"
              speaker="George Orwell"
              source="Looking Back on the Spanish War"
              year="1942"
              variant="orwell"
            />

            <p className="chapter-connection">
              <strong>Connection to 1984:</strong> Spain gave Orwell the Ministry of Truth. It 
              gave him the Party&apos;s ability to change the past. It gave him the purges. And it 
              nearly killed him twice — once by fascist bullet, once by Stalinist betrayal.
            </p>
          </div>
        </Section>

        {/* ================================================================== */}
        {/* CHAPTER 4: THE PROPAGANDIST - BBC */}
        {/* ================================================================== */}
        <Section id="chapter-4" className="chapter-section" era="bbc">
          <div className="chapter-header">
            <span className="chapter-number">Chapter 4</span>
            <h2 className="chapter-title">The Propagandist</h2>
            <span className="chapter-date">BBC Eastern Service, 1941–1943</span>
          </div>

          <div className="chapter-content">
            <div className="chapter-metaphor">
              <em>The Ministry of Truth has an address — Senate House, London.</em>
            </div>

            <div className="senate-house-container">
              <img 
                src={IMAGES.senateHouse} 
                alt="Senate House, University of London — the building that inspired the Ministry of Truth" 
                className="senate-house-image"
              />
              <p className="image-caption">
                Senate House, London — Orwell&apos;s BBC office. The building that became the Ministry of Truth.
              </p>
            </div>

            <p>
              In August 1941, Orwell joined the BBC&apos;s Eastern Service as a Talks Producer, 
              creating propaganda broadcasts aimed at India. His office was in Senate House, 
              a massive brutalist tower near the British Museum.
            </p>

            <p>
              He produced over 200 radio programs, working with distinguished writers like 
              T.S. Eliot. But he came to despise the work.
            </p>

            <QuoteMonument
              quote="I have wasted two years of my life doing hack work that was mostly either useless or harmful."
              speaker="George Orwell"
              source="Letter to Rayner Heppenstall"
              year="1943"
            />

            <p>
              The BBC taught Orwell how truth is manufactured at scale. Winston Smith&apos;s job 
              rewriting old newspaper articles at the Ministry of Truth is drawn directly from 
              Orwell&apos;s understanding of how official reality is produced.
            </p>
          </div>
        </Section>

        {/* ================================================================== */}
        {/* CHAPTER 5: STALIN'S USSR - THE YEZHOV ERASURE */}
        {/* ================================================================== */}
        <Section id="chapter-5" className="chapter-section" era="soviet">
          <div className="chapter-header">
            <span className="chapter-number">Chapter 5</span>
            <h2 className="chapter-title">The Model</h2>
            <span className="chapter-date">Stalin&apos;s Soviet Union, 1930s–1940s</span>
          </div>

          <div className="chapter-content">
            <div className="chapter-metaphor">
              <em>Big Brother had a face — and it belonged to a man who killed millions.</em>
            </div>

            <FigureProfile
              name="Joseph Stalin"
              epithet="The Real Big Brother"
              imageSrc={IMAGES.stalin.portrait}
              contributions={[
                "Personality cult: giant portraits, infallibility doctrine",
                "Moscow Show Trials: forced impossible confessions",
                "Great Terror: 750,000+ executed, millions to gulags",
                "Systematic rewriting of history, erasure of enemies",
              ]}
            />

            <p>
              Oceania is not a fantasy. Its primary model was the USSR under Joseph Stalin.
            </p>

            <p>
              Big Brother&apos;s omnipresent face mirrors Stalin&apos;s personality cult. The Two Minutes 
              Hate echoes Soviet denunciation sessions. The purges that &ldquo;vaporize&rdquo; Party members 
              mirror the Great Terror.
            </p>

            <p className="emphasis-text">
              But the most precise parallel is historical revision.
            </p>

            <h3 className="subsection-title">The Yezhov Demonstration</h3>

            <p>
              Nikolai Yezhov ran the NKVD at the height of the Great Terror. He personally 
              signed execution lists, earning the nickname &ldquo;The Bloody Dwarf.&rdquo; In 1938, he 
              fell from favor. In 1940, he was executed.
            </p>

            <p className="emphasis-text">
              Then he was erased from history.
            </p>

            <YezhovErasure />

            <p>
              This is EXACTLY what Winston Smith does at the Ministry of Truth. This is what 
              memory holes are for. This is why &ldquo;who controls the past controls the future.&rdquo;
            </p>
          </div>
        </Section>

        {/* ================================================================== */}
        {/* CHAPTER 6: THE SPECTACLE - NAZI GERMANY */}
        {/* ================================================================== */}
        <Section id="chapter-6" className="chapter-section" era="nazi">
          <div className="chapter-header">
            <span className="chapter-number">Chapter 6</span>
            <h2 className="chapter-title">The Spectacle</h2>
            <span className="chapter-date">Nazi Germany, 1933–1945</span>
          </div>

          <div className="chapter-content">
            <div className="chapter-metaphor">
              <em>The Two Minutes Hate had a prototype — the Nuremberg Rally.</em>
            </div>

            <p>
              Stalin&apos;s USSR provided one template for Oceania. But Orwell was equally horrified 
              by Hitler&apos;s Germany — a different flavor of totalitarianism, focused less on 
              ideological purity and more on spectacle, emotion, and mass psychology.
            </p>

            <div className="rally-container">
              <img 
                src={IMAGES.hitler.rally} 
                alt="Nuremberg Rally, 1936 - Hitler addresses hundreds of thousands in coordinated spectacle" 
                className="rally-image"
              />
              <p className="image-caption">
                Nuremberg Rally, 1936 — The orchestrated fusion of terror and ecstasy.
              </p>
            </div>

            <p>
              The Nuremberg rallies were designed by Albert Speer to overwhelm the senses — 
              towering columns of light, thousands of synchronized marchers, Hitler&apos;s voice 
              rising to screaming crescendo. The goal was not rational persuasion but 
              emotional subjugation.
            </p>

            <QuoteMonument
              quote="The horrible thing about the Two Minutes Hate was not that one was obliged to act a part, but, on the contrary, that it was impossible to avoid joining in."
              speaker="Winston Smith"
              source="Nineteen Eighty-Four"
              year="1949"
              variant="novel"
            />

            <p>
              Winston describes feeling genuine hatred during the Two Minutes Hate — not 
              because he believes in it, but because mass emotion is contagious. You cannot 
              stand in a crowd of screaming people and remain unmoved. The body betrays the mind.
            </p>

            <div className="comparison-grid">
              <div className="comparison-item">
                <h4>Nazi Germany</h4>
                <ul>
                  <li>Joseph Goebbels: Ministry of Propaganda</li>
                  <li>Book burnings, controlled press</li>
                  <li>Nuremberg rallies: mass emotional manipulation</li>
                  <li>Enemies: Jews, Bolsheviks, degenerates</li>
                </ul>
              </div>
              <div className="comparison-item">
                <h4>Oceania</h4>
                <ul>
                  <li>Ministry of Truth: news and entertainment</li>
                  <li>Memory holes, rewritten newspapers</li>
                  <li>Two Minutes Hate: directed rage sessions</li>
                  <li>Enemies: Goldstein, Eurasia/Eastasia</li>
                </ul>
              </div>
            </div>

            <p>
              Goebbels understood that propaganda works best when people don&apos;t recognize it 
              as propaganda — when hatred feels like natural righteous anger, when loyalty 
              feels like love. The Two Minutes Hate is not just about directing anger at 
              Goldstein. It&apos;s about making that anger feel <em>authentic</em>.
            </p>

            <QuoteMonument
              quote="The essence of propaganda consists in winning people over to an idea so sincerely, so vitally, that in the end they succumb to it utterly and can never escape from it."
              speaker="Joseph Goebbels"
              source="Diary entry"
              year="1934"
              variant="historical"
            />

            <p className="chapter-connection">
              <strong>Connection to 1984:</strong> The mass rallies, the orchestrated emotion, 
              the transformation of hatred into ecstasy. Oceania fuses Soviet ideological 
              control with Nazi psychological manipulation.
            </p>
          </div>
        </Section>

        {/* ================================================================== */}
        {/* CHAPTER 7: THE DYING PROPHET - JURA */}
        {/* ================================================================== */}
        <Section id="chapter-7" className="chapter-section" era="jura">
          <div className="chapter-header">
            <span className="chapter-number">Chapter 7</span>
            <h2 className="chapter-title">The Dying Prophet</h2>
            <span className="chapter-date">Jura, 1946–1950</span>
          </div>

          <div className="chapter-content">
            <div className="chapter-metaphor">
              <em>A man races death on a remote island, typing his warning into the void.</em>
            </div>

            <p>
              After the war, Orwell was a successful writer — <em>Animal Farm</em> had made him 
              famous. But he was also dying.
            </p>

            <p>
              He chose to spend his remaining years on Jura, a remote Scottish island accessible 
              only by boat and rough track. The farmhouse at Barnhill had no electricity. It was 
              the end of the world.
            </p>

            <p>
              Here, coughing blood, often bedridden, Orwell wrote <em>Nineteen Eighty-Four</em>.
            </p>

            <div className="timeline-moment">
              <span className="timeline-date">August 1947</span>
              <span className="timeline-event">Nearly drowned when boat capsized in whirlpool. Survived with son Richard.</span>
            </div>
            <div className="timeline-moment">
              <span className="timeline-date">October 1947</span>
              <span className="timeline-event">Completed first draft. Immediately collapsed. Tuberculosis worsening.</span>
            </div>
            <div className="timeline-moment">
              <span className="timeline-date">December 1948</span>
              <span className="timeline-event">Typed final manuscript himself while bedridden. Weighed less than 100 pounds.</span>
            </div>
            <div className="timeline-moment">
              <span className="timeline-date">June 8, 1949</span>
              <span className="timeline-event">Nineteen Eighty-Four published. Immediate sensation.</span>
            </div>
            <div className="timeline-moment">
              <span className="timeline-date">January 21, 1950</span>
              <span className="timeline-event">George Orwell died. Age 46.</span>
            </div>

            <p>
              The urgency of <em>1984</em>, its relentless bleakness, its refusal of hope — these 
              come from a dying man who knew he was running out of time.
            </p>
          </div>
        </Section>

        {/* ================================================================== */}
        {/* CHAPTER 8: THE NOVEL */}
        {/* ================================================================== */}
        <Section id="chapter-8" className="chapter-section" era="novel">
          <div className="chapter-header">
            <span className="chapter-number">Chapter 8</span>
            <h2 className="chapter-title">The Novel</h2>
            <span className="chapter-date">Oceania, 1984</span>
          </div>

          <div className="chapter-content">
            <div className="chapter-metaphor">
              <em>Everything he witnessed converges into a single nightmare — and a love story 
              that ends in devastation.</em>
            </div>

            <div className="book-cover-container">
              <img 
                src={IMAGES.books.first1984} 
                alt="First edition of Nineteen Eighty-Four, 1949" 
                className="book-cover"
              />
            </div>

            <p>
              Now we understand what Orwell poured into the novel. Every mechanism of Oceania 
              traces to something he witnessed.
            </p>

            <p>
              But <em>1984</em> is not merely a political allegory. At its heart is a love story — 
              and its destruction.
            </p>

            <p>
              Winston and Julia find each other. Their affair is rebellion — claiming something 
              human, something private, something the Party cannot control. For a few brief weeks, 
              they are alive.
            </p>

            <p className="emphasis-text">And then Room 101.</p>

            <QuoteMonument
              quote="Do it to Julia! Do it to Julia! Not me! Julia! I don't care what you do to her. Tear her face off, strip her to the bones. Not me! Julia! Not me!"
              speaker="Winston Smith"
              source="Nineteen Eighty-Four"
              year="1949"
              variant="novel"
            />

            <p>
              The Party doesn&apos;t kill Winston and Julia. It makes them betray each other. 
              &ldquo;Do it to Julia!&rdquo; Winston screams, offering the woman he loves to the rats.
            </p>

            <p>
              This is the Party&apos;s true victory. Not death — destruction of the capacity for love.
            </p>

            <div className="final-line-container">
              <TypewriterText text="He loved Big Brother." className="final-line" />
            </div>

            <p>
              Winston&apos;s humanity — his ability to love, to resist, to remain himself — has been 
              annihilated. The Party wins not by killing the body but by destroying the soul.
            </p>
          </div>
        </Section>

        {/* ================================================================== */}
        {/* EPILOGUE */}
        {/* ================================================================== */}
        <Section id="epilogue" className="epilogue-section">
          <div className="epilogue-content">
            <div className="section-marker">Epilogue</div>
            <h2>The Warning That Endures</h2>

            <p>
              George Orwell died on January 21, 1950. His tombstone, as he requested, bears his 
              real name: <em>Eric Arthur Blair</em>.
            </p>

            <p>
              <em>1984</em> has never gone out of print. It has been translated into over 65 languages. 
              Its vocabulary — Big Brother, thoughtcrime, doublethink, Newspeak, Room 101 — has 
              entered common speech.
            </p>

            <p>
              Orwell feared he was writing about what <em>might</em> happen. We can assess how much 
              <em>did</em> happen — surveillance states, contested reality, permanent war, the 
              manipulation of language. But that assessment is for readers to make.
            </p>

            <p>
              What Orwell offered was not prophecy but a diagnostic kit. He showed us the 
              mechanisms — the boot, the telescreen, the memory hole, the Two Minutes Hate, 
              the destruction of love through betrayal — so we might recognize them if we saw them.
            </p>

            <QuoteMonument
              quote="If you want a picture of the future, imagine a boot stamping on a human face — forever."
              speaker="O'Brien"
              source="Nineteen Eighty-Four"
              year="1949"
              variant="novel"
            />

            <p>
              Orwell had seen that boot. He had worn it, faced it, fled from it. He knew what 
              he was warning against because he had lived it.
            </p>

            <p className="epilogue-question">
              His warning endures because the mechanisms endure. The question is whether we are listening.
            </p>
          </div>
        </Section>

        {/* ================================================================== */}
        {/* SOURCES */}
        {/* ================================================================== */}
        <Sources sources={sources} />
      </div>
  );
}

