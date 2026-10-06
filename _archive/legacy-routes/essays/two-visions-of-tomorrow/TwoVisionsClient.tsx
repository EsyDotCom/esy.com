"use client";

import React, { useEffect, useState, useRef } from "react";
import "./two-visions-of-tomorrow.css";

// ============================================================================
// TYPES
// ============================================================================

interface Source {
  title: string;
  url: string;
  type: "primary" | "academic" | "journalism";
}

// ============================================================================
// IMAGE ASSETS (from research/VISUALS.md)
// ============================================================================

const IMAGES = {
  orwell: {
    bbc1940: "https://upload.wikimedia.org/wikipedia/commons/7/7a/George-orwell-BBC.jpg",
    spanishWar1937: "https://upload.wikimedia.org/wikipedia/commons/3/3a/George_Orwell_and_Eileen_O%E2%80%99Shaughnessy_with_members_of_the_ILP_unit_on_the_Aragon_Front_outside_Huesca%2C_13th_March_1937.jpg",
  },
  huxley: {
    life1947: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Aldous_Huxley_1947.png",
    collier1927: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Aldous_Huxley_1927.png",
  },
  books: {
    first1984: "https://upload.wikimedia.org/wikipedia/commons/c/c3/1984first.jpg",
  },
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
    title: "Huxley, Aldous. Brave New World. Chatto & Windus, 1932.",
    url: "https://www.britannica.com/topic/Brave-New-World",
    type: "primary",
  },
  {
    title:
      "Huxley, Aldous. Letter to George Orwell, 21 October 1949. Letters of Note.",
    url: "https://lettersofnote.com/2012/03/06/1984-v-brave-new-world/",
    type: "primary",
  },
  {
    title:
      "Postman, Neil. Amusing Ourselves to Death: Public Discourse in the Age of Show Business. Penguin, 1985.",
    url: "https://www.penguinrandomhouse.com/books/297743/amusing-ourselves-to-death-by-neil-postman/",
    type: "academic",
  },
  {
    title: "Crick, Bernard. George Orwell: A Life. Secker & Warburg, 1980.",
    url: "https://www.britannica.com/biography/George-Orwell",
    type: "academic",
  },
  {
    title:
      "Bedford, Sybille. Aldous Huxley: A Biography. Chatto & Windus, 1973-74.",
    url: "https://www.britannica.com/biography/Aldous-Huxley",
    type: "academic",
  },
  {
    title:
      "Lynskey, Dorian. The Ministry of Truth: The Biography of George Orwell's 1984. Doubleday, 2019.",
    url: "https://www.theguardian.com/books/2019/may/19/how-george-orwell-wrote-nineteen-eighty-four-dorian-lynskey",
    type: "journalism",
  },
  {
    title:
      "Smith, Grover, ed. Letters of Aldous Huxley. Harper & Row, 1969.",
    url: "https://www.worldcat.org/title/letters-of-aldous-huxley/oclc/29748",
    type: "primary",
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Split Progress Bar
 * Two colors advancing from opposite edges, merging at synthesis
 */
const SplitProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = Math.min(
        (window.scrollY / scrollHeight) * 100,
        100
      );
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Colors merge at 75% (synthesis chapter)
  const isMerging = progress >= 75;
  const leftWidth = Math.min(progress, 50);
  const rightWidth = Math.min(progress, 50);

  return (
    <div className="split-progress-bar" aria-hidden="true">
      <div
        className={`progress-orwell ${isMerging ? "merging" : ""}`}
        style={{ width: `${leftWidth}%` }}
      />
      <div
        className={`progress-huxley ${isMerging ? "merging" : ""}`}
        style={{ width: `${rightWidth}%` }}
      />
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
  era?: "formation" | "radicalization" | "prophecies" | "legacy" | "synthesis";
}> = ({ id, className = "", children, era }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true); // Start visible to ensure images load

  useEffect(() => {
    // Reset to false then use IO for animation effect
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
  variant: "orwell" | "huxley" | "postman";
}> = ({ quote, speaker, source, year, variant }) => {
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
 * Split Frame - Side-by-side comparison with 1984/BNW aesthetic
 */
const SplitFrame: React.FC<{
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  centerDivider?: boolean;
}> = ({ leftContent, rightContent, centerDivider = true }) => {
  return (
    <div className="split-frame">
      <div className="split-orwell">{leftContent}</div>
      {centerDivider && <div className="split-divider" />}
      <div className="split-huxley">{rightContent}</div>
    </div>
  );
};

/**
 * Author Portrait Card
 */
const AuthorCard: React.FC<{
  name: string;
  years: string;
  epithet: string;
  quote: string;
  quoteSource: string;
  variant: "orwell" | "huxley";
  imageUrl: string;
}> = ({ name, years, epithet, quote, quoteSource, variant, imageUrl }) => {
  return (
    <article className={`author-card author-${variant}`}>
      <div className="author-portrait-frame">
        <img 
          src={imageUrl} 
          alt={`Portrait of ${name}`}
          className="author-portrait-image"
        />
      </div>
      <h3 className="author-name">{name}</h3>
      <p className="author-years">{years}</p>
      <p className="author-epithet">{epithet}</p>
      <blockquote className="author-quote">
        <p>{quote}</p>
        <cite>{quoteSource}</cite>
      </blockquote>
    </article>
  );
};

/**
 * The Letter - Scroll-driven text reveal of Huxley's 1949 letter
 */
const TheLetter: React.FC = () => {
  const [revealProgress, setRevealProgress] = useState(0);
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!letterRef.current) return;
      const rect = letterRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      const scrolledIntoView = windowHeight - rect.top;
      const progress = Math.min(
        Math.max(scrolledIntoView / (sectionHeight * 0.6), 0),
        1
      );
      setRevealProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const letterText = `Within the next generation I believe that the world's rulers will discover that infant conditioning and narco-hypnosis are more efficient, as instruments of government, than clubs and prisons, and that the lust for power can be just as completely satisfied by suggesting people into loving their servitude as by flogging and kicking them into obedience.`;

  const visibleLength = Math.floor(revealProgress * letterText.length);
  const visibleText = letterText.slice(0, visibleLength);
  const showSignature = revealProgress > 0.95;
  const showEpilogue = revealProgress > 0.98;

  return (
    <div ref={letterRef} className="the-letter">
      <div className="letter-paper">
        <header className="letter-header">
          <span className="letter-date">21 October 1949</span>
          <span className="letter-location">Wrightwood, California</span>
        </header>
        <div className="letter-body">
          <p className="letter-salutation">Dear Mr. Orwell,</p>
          <p className="letter-text">
            {visibleText}
            {revealProgress < 1 && <span className="letter-cursor" />}
          </p>
        </div>
        <footer
          className="letter-signature"
          style={{ opacity: showSignature ? 1 : 0 }}
        >
          Yours sincerely,
          <br />
          <span className="signature-name">Aldous Huxley</span>
        </footer>
      </div>
      <p
        className="letter-epilogue"
        style={{ opacity: showEpilogue ? 1 : 0 }}
      >
        Three months later, George Orwell was dead.
      </p>
    </div>
  );
};

/**
 * Comparison Panel
 */
const ComparisonPanel: React.FC<{
  title: string;
  items: string[];
  variant: "orwell" | "huxley";
}> = ({ title, items, variant }) => {
  return (
    <div className={`comparison-panel panel-${variant}`}>
      <h4 className="panel-title">{title}</h4>
      <ul className="panel-list">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

/**
 * Sources Section
 */
const SourcesSection: React.FC<{ sources: Source[] }> = ({ sources }) => {
  const grouped = {
    primary: sources.filter((s) => s.type === "primary"),
    academic: sources.filter((s) => s.type === "academic"),
    journalism: sources.filter((s) => s.type === "journalism"),
  };

  return (
    <section className="sources-section">
      <div className="sources-content">
        <h3 className="sources-title">Sources & Further Reading</h3>

        {grouped.primary.length > 0 && (
          <div className="source-group">
            <h4 className="source-group-title">Primary Sources</h4>
            <ul className="sources-list">
              {grouped.primary.map((source, index) => (
                <li key={index}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {grouped.academic.length > 0 && (
          <div className="source-group">
            <h4 className="source-group-title">Scholarly Works</h4>
            <ul className="sources-list">
              {grouped.academic.map((source, index) => (
                <li key={index}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {grouped.journalism.length > 0 && (
          <div className="source-group">
            <h4 className="source-group-title">Further Reading</h4>
            <ul className="sources-list">
              {grouped.journalism.map((source, index) => (
                <li key={index}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="sources-note">
          This essay was fact-checked against primary sources, scholarly
          biographies, and authoritative historical records. All quotes are
          verified from original texts and correspondence.
        </p>
      </div>
    </section>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function TwoVisionsClient() {
  return (
    <>
      <SplitProgressBar />

      {/* ================================================================== */}
      {/* HERO SECTION */}
      {/* ================================================================== */}
      <Section id="hero" className="hero-section" era="synthesis">
        <div className="hero-split-background">
          <div className="hero-orwell-bg" aria-hidden="true" />
          <div className="hero-huxley-bg" aria-hidden="true" />
          <div className="hero-divider-glow" aria-hidden="true" />
        </div>

        <div className="hero-content">
          <p className="hero-tagline">Two men imagined the end of freedom</p>
          <h1 className="hero-title">Two Visions of Tomorrow</h1>
          <p className="hero-subtitle">The Prophets Who Saw Our Future</p>

          <div className="hero-dichotomy">
            <span className="dichotomy-fear">Fear</span>
            <span className="dichotomy-or">or</span>
            <span className="dichotomy-pleasure">Pleasure</span>
          </div>

          <p className="hero-question">Which future did we get?</p>
        </div>

        <div className="scroll-indicator" aria-hidden="true">
          <span>Scroll to explore</span>
          <div className="scroll-line" />
        </div>
      </Section>

      {/* ================================================================== */}
      {/* PROLOGUE: THE QUESTION */}
      {/* ================================================================== */}
      <Section id="prologue" className="chapter-section" era="synthesis">
        <div className="section-content">
          <header className="chapter-header">
            <span className="chapter-label">Prologue</span>
            <h2 className="chapter-title">The Question</h2>
            <p className="chapter-subtitle">Our Present Moment</p>
          </header>

          <div className="prose-block">
            <p className="prose-lede">
              You check your phone dozens of times a day. Each time, something
              watches you — camera, microphone, location, biometrics. Each time,
              something entertains you — notifications, content, connection,
              infinite scroll.
            </p>
            <p>
              The device in your pocket is both <strong>telescreen</strong> and{" "}
              <strong>soma</strong>. It surveils while it satisfies. It tracks
              while it entertains.
            </p>
            <p>
              Two writers, working seventeen years apart, each imagined a future
              where humanity loses its freedom. One feared we would be crushed
              by external oppression. The other feared we would not need to be
              oppressed — we would come to love our servitude.
            </p>
          </div>

          <div className="metaphor-statement">
            <p>
              This is the story of their visions — and how we ended up living
              in both.
            </p>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* CHAPTER 1: TWO PROPHETS */}
      {/* ================================================================== */}
      <Section id="chapter-1" className="chapter-section" era="formation">
        <div className="section-content">
          <header className="chapter-header">
            <span className="chapter-label">Chapter One</span>
            <h2 className="chapter-title">Two Prophets</h2>
            <p className="chapter-subtitle">Parallel Lives, 1894–1946</p>
          </header>

          <div className="metaphor-box">
            <p>
              Two telescopes pointed at the same sky, seeing different
              constellations.
            </p>
          </div>

          <SplitFrame
            leftContent={
              <AuthorCard
                name="George Orwell"
                years="1903–1950"
                epithet="The Prophet of the Boot"
                quote="Every line of serious work that I have written since 1936 has been written, directly or indirectly, against totalitarianism."
                quoteSource="Why I Write, 1946"
                variant="orwell"
                imageUrl={IMAGES.orwell.bbc1940}
              />
            }
            rightContent={
              <AuthorCard
                name="Aldous Huxley"
                years="1894–1963"
                epithet="The Prophet of Pleasure"
                quote="A really efficient totalitarian state would be one in which the all-powerful executive of political bosses and their army of managers control a population of slaves who do not have to be coerced, because they love their servitude."
                quoteSource="Brave New World, Foreword, 1946"
                variant="huxley"
                imageUrl={IMAGES.huxley.life1947}
              />
            }
          />

          <div className="prose-block">
            <h3 className="prose-heading">Eric Arthur Blair</h3>
            <p>
              Born in 1903 in colonial India, the man who would become George
              Orwell served as an Imperial Police officer in Burma, where he
              witnessed the brutality of colonial power firsthand. He fought
              fascism in the Spanish Civil War and was shot through the throat —
              a wound that nearly killed him. He worked for the BBC during WWII,
              producing propaganda he found distasteful, gaining intimate
              knowledge of how official truth is manufactured.
            </p>
            <p className="path-statement path-orwell">
              Orwell&apos;s path: Imperialism → Fascism → Propaganda → Fear of
              the State
            </p>
          </div>

          <div className="prose-block">
            <h3 className="prose-heading">Aldous Leonard Huxley</h3>
            <p>
              Born in 1894 into England&apos;s intellectual aristocracy —
              grandson of Thomas Henry Huxley, &quot;Darwin&apos;s
              Bulldog&quot; — Aldous Huxley grew up steeped in scientific
              rationalism and literary privilege. At sixteen, an eye disease
              left him nearly blind for eighteen months, forcing him to develop
              extraordinary inner perception. He observed 1920s consumerism from
              his privileged vantage, then moved to California in 1937, where he
              watched Hollywood manufacture desire.
            </p>
            <p className="path-statement path-huxley">
              Huxley&apos;s path: Privilege → Blindness → Consumerism → Fear of
              Ourselves
            </p>
          </div>

          <div className="timeline-marker">
            <div className="timeline-point">
              <span className="timeline-year">1932</span>
              <span className="timeline-event">
                Brave New World published
              </span>
            </div>
            <div className="timeline-gap">17 years</div>
            <div className="timeline-point">
              <span className="timeline-year">1949</span>
              <span className="timeline-event">
                Nineteen Eighty-Four published
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* CHAPTER 2: TWO NIGHTMARES */}
      {/* ================================================================== */}
      <Section id="chapter-2" className="chapter-section" era="radicalization">
        <div className="section-content">
          <header className="chapter-header">
            <span className="chapter-label">Chapter Two</span>
            <h2 className="chapter-title">Two Nightmares</h2>
            <p className="chapter-subtitle">The Worlds They Built</p>
          </header>

          <div className="metaphor-box">
            <p>
              Two prisons with the same outcome but opposite methods — one with
              visible bars, one with invisible comfort.
            </p>
          </div>

          <SplitFrame
            leftContent={
              <ComparisonPanel
                title="Oceania (1984)"
                variant="orwell"
                items={[
                  "The Telescreen — You are always watched",
                  "The Thought Police — Even your mind is surveilled",
                  "The Ministry of Truth — History rewritten daily",
                  "Doublethink — Hold contradictory beliefs simultaneously",
                  "Newspeak — Eliminate words for unapproved thoughts",
                  "Room 101 — Confront your deepest terror",
                ]}
              />
            }
            rightContent={
              <ComparisonPanel
                title="The World State"
                variant="huxley"
                items={[
                  "Conditioning — Programmed from embryo to death",
                  "Hypnopaedia — Sleep-teaching reinforces social order",
                  "Soma — Perfect drug, no hangover, no rebellion",
                  "The Feelies — Entertainment so immersive you never think",
                  "Promiscuity — No deep attachments, no dangerous loyalty",
                  "Exile — Dissenters aren't killed, just removed",
                ]}
              />
            }
          />

          <div className="control-dichotomy">
            <div className="control-mechanism control-fear">
              <span className="mechanism-label">Control through</span>
              <span className="mechanism-word">Fear</span>
              <p className="mechanism-description">
                You obey because the consequences of disobedience are
                unbearable. The boot on the face, forever.
              </p>
            </div>
            <div className="control-mechanism control-pleasure">
              <span className="mechanism-label">Control through</span>
              <span className="mechanism-word">Pleasure</span>
              <p className="mechanism-description">
                You obey because you love your servitude. Why rebel against
                what feels so good?
              </p>
            </div>
          </div>

          <QuoteMonument
            quote="If you want a picture of the future, imagine a boot stamping on a human face — forever."
            speaker="O'Brien"
            source="Nineteen Eighty-Four"
            year="1949"
            variant="orwell"
          />
        </div>
      </Section>

      {/* ================================================================== */}
      {/* CHAPTER 3: THE LETTER */}
      {/* ================================================================== */}
      <Section id="chapter-3" className="chapter-section chapter-letter" era="prophecies">
        <div className="section-content">
          <header className="chapter-header">
            <span className="chapter-label">Chapter Three</span>
            <h2 className="chapter-title">The Letter</h2>
            <p className="chapter-subtitle">October 21, 1949</p>
          </header>

          <div className="metaphor-box">
            <p>
              Two prophets, one soon to die, exchanging visions across the void
              — literature&apos;s most prescient correspondence.
            </p>
          </div>

          <div className="prose-block prose-centered">
            <p>
              Three months before George Orwell would die of tuberculosis at
              age 46, Aldous Huxley — seventeen years his senior, once briefly
              his teacher at Eton — wrote him a letter. He had just finished
              reading <em>Nineteen Eighty-Four</em>.
            </p>
          </div>

          <TheLetter />

          <div className="prose-block prose-centered">
            <p>
              Huxley admired the novel profoundly. But he believed his own
              vision would prove more accurate — not because Orwell was wrong
              about tyranny&apos;s appeal, but because a subtler mechanism of
              control would prove more efficient.
            </p>
            <p className="prose-emphasis">
              The boot can be resisted. But what do you resist when you love
              your chains?
            </p>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* CHAPTER 4: TRUTH AND MEMORY */}
      {/* ================================================================== */}
      <Section id="chapter-4" className="chapter-section" era="legacy">
        <div className="section-content">
          <header className="chapter-header">
            <span className="chapter-label">Chapter Four</span>
            <h2 className="chapter-title">Truth and Memory</h2>
            <p className="chapter-subtitle">Two Methods of Killing Reality</p>
          </header>

          <div className="metaphor-box">
            <p>
              The memory hole and the irrelevant avalanche — two methods, one
              outcome: truth becomes impossible.
            </p>
          </div>

          <SplitFrame
            leftContent={
              <div className="truth-panel truth-orwell">
                <h4>In Oceania: Truth is Destroyed</h4>
                <p>
                  The Ministry of Truth rewrites history daily. Inconvenient
                  documents vanish down the memory hole. The Party slogan:
                  &quot;Who controls the past controls the future.&quot;
                  Newspeak systematically eliminates words for unapproved
                  concepts.
                </p>
                <p className="truth-result">
                  <strong>Result:</strong> The truth is whatever the Party says
                  it is, moment to moment.
                </p>
              </div>
            }
            rightContent={
              <div className="truth-panel truth-huxley">
                <h4>In the World State: Truth is Drowned</h4>
                <p>
                  &quot;History is bunk.&quot; Why bother controlling the past
                  when no one cares about it? Conditioning means no one
                  questions. So much entertainment — who has time for truth?
                  The past simply doesn&apos;t matter.
                </p>
                <p className="truth-result">
                  <strong>Result:</strong> Truth is irrelevant when pleasure is
                  all that matters.
                </p>
              </div>
            }
          />

          <QuoteMonument
            quote="Orwell feared that the truth would be concealed from us. Huxley feared the truth would be drowned in a sea of irrelevance."
            speaker="Neil Postman"
            source="Amusing Ourselves to Death"
            year="1985"
            variant="postman"
          />
        </div>
      </Section>

      {/* ================================================================== */}
      {/* CHAPTER 5: LOVE AND REBELLION */}
      {/* ================================================================== */}
      <Section id="chapter-5" className="chapter-section" era="legacy">
        <div className="section-content">
          <header className="chapter-header">
            <span className="chapter-label">Chapter Five</span>
            <h2 className="chapter-title">Love and Rebellion</h2>
            <p className="chapter-subtitle">Bodies as Instruments of Control</p>
          </header>

          <div className="metaphor-box">
            <p>
              Two prisons for desire — the locked room and the open door that
              leads nowhere.
            </p>
          </div>

          <SplitFrame
            leftContent={
              <div className="love-panel love-orwell">
                <h4>Sexuality Forbidden</h4>
                <p>
                  The Anti-Sex League promotes &quot;goodsex&quot; —
                  reproduction only, no pleasure. Winston and Julia&apos;s
                  affair is political rebellion. Physical desire itself is
                  dangerous because it creates private loyalty outside the
                  Party.
                </p>
                <p className="love-result">
                  They are captured. Tortured. &quot;I betrayed you.&quot;
                  &quot;I betrayed you.&quot; They no longer love.
                </p>
              </div>
            }
            rightContent={
              <div className="love-panel love-huxley">
                <h4>Sexuality Mandatory</h4>
                <p>
                  &quot;Everyone belongs to everyone else.&quot; Exclusive
                  relationships are scandalous. Sex is constant, meaningless,
                  recreational. Children are raised communally, decanted in
                  bottles. No family, no private loyalty.
                </p>
                <p className="love-result">
                  They don&apos;t know how to love. Connection is impossible
                  when attachment is prohibited.
                </p>
              </div>
            }
            centerDivider={false}
          />

          <div className="convergence-statement">
            <p>
              Same outcome: No one loves deeply enough to rebel for anyone.
            </p>
          </div>

          <QuoteMonument
            quote="But I don't want comfort. I want God, I want poetry, I want real danger, I want freedom, I want goodness. I want sin."
            speaker="John the Savage"
            source="Brave New World"
            year="1932"
            variant="huxley"
          />
        </div>
      </Section>

      {/* ================================================================== */}
      {/* CHAPTER 6: THE SYNTHESIS */}
      {/* ================================================================== */}
      <Section id="chapter-6" className="chapter-section chapter-synthesis" era="synthesis">
        <div className="section-content">
          <header className="chapter-header">
            <span className="chapter-label">Chapter Six</span>
            <h2 className="chapter-title">The Synthesis</h2>
            <p className="chapter-subtitle">We Got Both</p>
          </header>

          <div className="metaphor-box metaphor-synthesis">
            <p>
              The smartphone as telescreen and soma dispenser — we are watched
              while we scroll, surveilled while we are gratified.
            </p>
          </div>

          <SplitFrame
            leftContent={
              <div className="synthesis-column synthesis-orwell">
                <h4>Orwellian Today</h4>
                <ul>
                  <li>Mass surveillance — NSA, facial recognition, metadata</li>
                  <li>&quot;Fake news&quot; and contested reality</li>
                  <li>History revised in real-time on social media</li>
                  <li>Authoritarian governments rising globally</li>
                  <li>Cameras everywhere, always recording</li>
                </ul>
              </div>
            }
            rightContent={
              <div className="synthesis-column synthesis-huxley">
                <h4>Huxleyan Today</h4>
                <ul>
                  <li>Infinite entertainment on demand</li>
                  <li>Pharmaceutical solutions for every discomfort</li>
                  <li>Social media as soma — dopamine by design</li>
                  <li>Consumerism as meaning, shopping as therapy</li>
                  <li>Attention economy: your focus is the product</li>
                </ul>
              </div>
            }
          />

          <div className="synthesis-merge">
            <div className="merge-visual" aria-hidden="true">
              <div className="merge-orwell" />
              <div className="merge-huxley" />
            </div>
            <div className="merge-text">
              <p className="merge-headline">The Smartphone</p>
              <p>
                It watches you: camera, microphone, location, biometrics,
                browsing history.
              </p>
              <p>
                It entertains you: apps, games, content, social connection,
                infinite scroll.
              </p>
              <p>You carry it voluntarily. You check it compulsively.</p>
              <p className="merge-conclusion">
                Big Brother <em>and</em> soma. In one device. In your pocket.
              </p>
            </div>
          </div>

          <QuoteMonument
            quote="Orwell warns that we will be overcome by an externally imposed oppression. But in Huxley's vision, no Big Brother is required to deprive people of their autonomy, maturity and history. As he saw it, people will come to love their oppression, to adore the technologies that undo their capacities to think."
            speaker="Neil Postman"
            source="Amusing Ourselves to Death"
            year="1985"
            variant="postman"
          />

          <div className="synthesis-conclusion">
            <p>
              The binary was always false. We are surveilled while we are
              entertained. Tracked while we are gratified. Both mechanisms
              operate simultaneously, often through the same technologies.
            </p>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* EPILOGUE */}
      {/* ================================================================== */}
      <Section id="epilogue" className="chapter-section epilogue-section" era="synthesis">
        <div className="section-content">
          <header className="chapter-header">
            <span className="chapter-label">Epilogue</span>
            <h2 className="chapter-title">The Unanswered Question</h2>
          </header>

          <div className="epilogue-portraits">
            <div className="epilogue-portrait portrait-orwell">
              <div className="portrait-frame">
                <img 
                  src={IMAGES.orwell.bbc1940} 
                  alt="George Orwell"
                  className="portrait-image"
                />
              </div>
              <span className="portrait-name">George Orwell</span>
              <span className="portrait-years">1903–1950</span>
            </div>
            <div className="epilogue-portrait portrait-huxley">
              <div className="portrait-frame">
                <img 
                  src={IMAGES.huxley.life1947} 
                  alt="Aldous Huxley"
                  className="portrait-image"
                />
              </div>
              <span className="portrait-name">Aldous Huxley</span>
              <span className="portrait-years">1894–1963</span>
            </div>
          </div>

          <div className="prose-block">
            <p>
              Would Orwell feel vindicated by surveillance states, facial
              recognition, the manipulation of truth? Would he be horrified
              that we carry telescreens voluntarily?
            </p>
            <p>
              Would Huxley feel vindicated by pharmaceutical billions, attention
              economies, populations scrolling toward oblivion? Would he be
              surprised that surveillance coexists with pleasure?
            </p>
            <p>Neither author offered clear solutions. Both were diagnosticians, not healers.</p>
          </div>

          <div className="final-questions">
            <p>When you unlock your phone, are you being watched or entertained?</p>
            <p>Are you choosing, or are you conditioned to choose?</p>
            <p>Is this fear, or is this pleasure?</p>
            <p className="final-challenge">
              And if it is both — what does that mean for how you live?
            </p>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* SOURCES */}
      {/* ================================================================== */}
      <SourcesSection sources={sources} />
    </>
  );
}

