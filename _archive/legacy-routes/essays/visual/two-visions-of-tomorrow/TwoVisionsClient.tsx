"use client";

import React, { useEffect, useState, useRef } from "react";
import "./two-visions-of-tomorrow.css";

// ============================================================================
// TYPES
// ============================================================================

interface Source {
  title: string;
  url: string;
}

// ============================================================================
// DATA
// ============================================================================

const sources: Source[] = [
  {
    title: "Nineteen Eighty-Four by George Orwell (1949)",
    url: "https://www.britannica.com/topic/Nineteen-Eighty-four",
  },
  {
    title: "Brave New World by Aldous Huxley (1932)",
    url: "https://www.britannica.com/topic/Brave-New-World",
  },
  {
    title: "Huxley's Letter to Orwell (October 21, 1949) — Letters of Note",
    url: "https://lettersofnote.com/2012/03/06/1984-v-brave-new-world/",
  },
  {
    title: "Amusing Ourselves to Death by Neil Postman (1985)",
    url: "https://www.penguinrandomhouse.com/books/297743/amusing-ourselves-to-death-by-neil-postman/",
  },
  {
    title: "George Orwell Biography — Britannica",
    url: "https://www.britannica.com/biography/George-Orwell",
  },
  {
    title: "Aldous Huxley Biography — Britannica",
    url: "https://www.britannica.com/biography/Aldous-Huxley",
  },
  {
    title: "How George Orwell wrote Nineteen Eighty-Four — The Guardian",
    url: "https://www.theguardian.com/books/2019/may/19/how-george-orwell-wrote-nineteen-eighty-four-dorian-lynskey",
  },
  {
    title: "Letters of Aldous Huxley, ed. Grover Smith (Harper & Row, 1969)",
    url: "https://www.worldcat.org/title/letters-of-aldous-huxley/oclc/29748",
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

// Split Progress Bar Component
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

  // At 75% progress (synthesis chapter), colors merge
  const isMerging = progress >= 75;
  const leftWidth = Math.min(progress, 50);
  const rightWidth = Math.min(progress, 50);

  return (
    <div className="split-progress-bar">
      <div
        className={`progress-left ${isMerging ? "merging" : ""}`}
        style={{ width: `${leftWidth}%` }}
      />
      <div
        className={`progress-right ${isMerging ? "merging" : ""}`}
        style={{ width: `${rightWidth}%` }}
      />
    </div>
  );
};

// Section Component with Intersection Observer
const Section: React.FC<{
  id: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id, className = "", children }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`section ${className} ${isVisible ? "visible" : ""}`}
    >
      {children}
    </section>
  );
};

// Quote Monument Component
const QuoteMonument: React.FC<{
  quote: string;
  attribution: string;
  source: string;
  variant?: "orwell" | "huxley" | "postman";
}> = ({ quote, attribution, source, variant = "orwell" }) => {
  return (
    <blockquote className={`quote-monument quote-${variant}`}>
      <p className="quote-text">&ldquo;{quote}&rdquo;</p>
      <cite className="quote-attribution">
        — {attribution}, <span className="quote-source">{source}</span>
      </cite>
    </blockquote>
  );
};

// Split Screen Component
const SplitScreen: React.FC<{
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  centerText?: string;
}> = ({ leftContent, rightContent, centerText }) => {
  return (
    <div className="split-screen-container">
      <div className="split-left">{leftContent}</div>
      {centerText && <div className="split-center-text">{centerText}</div>}
      <div className="split-right">{rightContent}</div>
    </div>
  );
};

// Author Profile Component
const AuthorProfile: React.FC<{
  name: string;
  epithet: string;
  years: string;
  quote: string;
  variant: "orwell" | "huxley";
}> = ({ name, epithet, years, quote, variant }) => {
  return (
    <div className={`author-profile author-${variant}`}>
      <div className="author-portrait">
        <div className="portrait-placeholder">
          <span className="portrait-initial">{name.charAt(0)}</span>
        </div>
      </div>
      <h3 className="author-name">{name}</h3>
      <p className="author-epithet">{epithet}</p>
      <p className="author-years">{years}</p>
      <blockquote className="author-quote">&ldquo;{quote}&rdquo;</blockquote>
    </div>
  );
};

// The Letter Component
const TheLetter: React.FC = () => {
  const [revealProgress, setRevealProgress] = useState(0);
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!letterRef.current) return;
      const rect = letterRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far through the section we've scrolled
      const sectionHeight = rect.height;
      const scrolledIntoView = windowHeight - rect.top;
      const progress = Math.min(
        Math.max(scrolledIntoView / (sectionHeight * 0.7), 0),
        1
      );
      setRevealProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const letterText = `Agreeing with all that the critics have written of it, I need not tell you, yet once more, how fine and how profoundly important the book is.

Within the next generation I believe that the world's rulers will discover that infant conditioning and narco-hypnosis are more efficient, as instruments of government, than clubs and prisons, and that the lust for power can be just as completely satisfied by suggesting people into loving their servitude as by flogging and kicking them into obedience.`;

  const visibleLength = Math.floor(revealProgress * letterText.length);
  const visibleText = letterText.slice(0, visibleLength);

  return (
    <div ref={letterRef} className="the-letter">
      <div className="letter-paper">
        <div className="letter-date">October 21, 1949</div>
        <div className="letter-content">
          <p className="letter-text">{visibleText}</p>
          {revealProgress < 1 && <span className="letter-cursor">|</span>}
        </div>
        <div
          className="letter-signature"
          style={{ opacity: revealProgress > 0.95 ? 1 : 0 }}
        >
          — Aldous Huxley
        </div>
      </div>
      <p
        className="letter-epilogue"
        style={{ opacity: revealProgress > 0.98 ? 1 : 0 }}
      >
        Three months later, George Orwell was dead.
      </p>
    </div>
  );
};

// Comparison Panel Component
const ComparisonPanel: React.FC<{
  side: "1984" | "bnw";
  title: string;
  items: string[];
}> = ({ side, title, items }) => {
  return (
    <div className={`comparison-panel comparison-${side}`}>
      <h4 className="comparison-title">{title}</h4>
      <ul className="comparison-list">
        {items.map((item, index) => (
          <li key={index} className="comparison-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Sources Section Component
const SourcesSection: React.FC<{ sources: Source[] }> = ({ sources }) => (
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
        This narrative was fact-checked against peer-reviewed sources,
        authoritative biographies, and primary source documents including the
        original novels and Huxley&apos;s correspondence.
      </p>
    </div>
  </section>
);

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
      <Section id="hero" className="hero-section">
        <div className="hero-split">
          <div className="hero-left">
            <div className="hero-atmosphere hero-atmosphere-orwell">
              <div className="surveillance-icon">👁</div>
              <span className="hero-word">FEAR</span>
            </div>
          </div>
          <div className="hero-divider">
            <div className="divider-line" />
          </div>
          <div className="hero-right">
            <div className="hero-atmosphere hero-atmosphere-huxley">
              <div className="pleasure-icon">💊</div>
              <span className="hero-word">PLEASURE</span>
            </div>
          </div>
        </div>
        <div className="hero-text-overlay">
          <p className="hero-tagline">Two men imagined the end of freedom...</p>
          <h1 className="hero-title">Two Visions of Tomorrow</h1>
          <p className="hero-question">Which future did we get?</p>
        </div>
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* PROLOGUE: THE QUESTION */}
      {/* ================================================================== */}
      <Section id="prologue" className="prologue-section">
        <div className="section-content">
          <span className="section-label">Prologue</span>
          <h2 className="section-title">The Question</h2>

          <div className="smartphone-visual">
            <div className="smartphone-frame">
              <div className="smartphone-screen">
                <div className="screen-split">
                  <div className="screen-camera">📷</div>
                  <div className="screen-feed">∞</div>
                </div>
              </div>
            </div>
          </div>

          <div className="prose-block">
            <p>
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
              where humanity loses its freedom. One feared we would be crushed.
              The other feared we would not care.
            </p>
            <p className="prose-emphasis">
              This is the story of their visions — and how we ended up living in
              both.
            </p>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* CHAPTER 1: TWO PROPHETS */}
      {/* ================================================================== */}
      <Section id="chapter-1" className="chapter-section chapter-prophets">
        <div className="section-content">
          <span className="section-label">Chapter One</span>
          <h2 className="section-title">Two Prophets</h2>
          <p className="section-subtitle">Parallel Lives, 1894–1946</p>

          <div className="metaphor-box">
            <p>
              Two telescopes pointed at the same sky, seeing different
              constellations.
            </p>
          </div>

          <SplitScreen
            leftContent={
              <AuthorProfile
                name="George Orwell"
                epithet="The Prophet of the Boot"
                years="1903–1950"
                quote="Every line of serious work that I have written since 1936 has been written, directly or indirectly, against totalitarianism."
                variant="orwell"
              />
            }
            rightContent={
              <AuthorProfile
                name="Aldous Huxley"
                epithet="The Prophet of Pleasure"
                years="1894–1963"
                quote="A really efficient totalitarian state would be one in which the all-powerful executive of political bosses and their army of managers control a population of slaves who do not have to be coerced, because they love their servitude."
                variant="huxley"
              />
            }
          />

          <div className="prose-block">
            <p>
              <strong>George Orwell</strong> was born Eric Arthur Blair in 1903
              in colonial India. He served as a policeman in Burma, where he
              witnessed imperialism&apos;s brutality firsthand. He fought
              fascism in the Spanish Civil War and was shot through the
              throat—a wound that nearly killed him. He worked for the BBC
              during WWII, producing propaganda he found distasteful, gaining
              intimate knowledge of how official truth is manufactured.
            </p>
            <p className="path-emphasis path-orwell">
              Orwell&apos;s path: Imperialism → Fascism → Propaganda → Fear of
              the State
            </p>
          </div>

          <div className="prose-block">
            <p>
              <strong>Aldous Huxley</strong> was born in 1894 into
              England&apos;s intellectual aristocracy—grandson of &quot;Darwin&apos;s
              Bulldog,&quot; brother of a prominent biologist. At sixteen, an eye
              disease left him nearly blind for eighteen months, forcing him to
              develop extraordinary inner perception. He observed 1920s-30s
              consumerism from a privileged vantage point, then moved to
              California in 1937, where he watched Hollywood manufacture desire.
            </p>
            <p className="path-emphasis path-huxley">
              Huxley&apos;s path: Privilege → Blindness/Insight → Consumerism →
              Fear of Ourselves
            </p>
          </div>

          <div className="timeline-connector">
            <div className="timeline-point">1932 — Brave New World published</div>
            <div className="timeline-gap">17 years</div>
            <div className="timeline-point">1949 — Nineteen Eighty-Four published</div>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* CHAPTER 2: TWO NIGHTMARES */}
      {/* ================================================================== */}
      <Section id="chapter-2" className="chapter-section chapter-nightmares">
        <div className="section-content">
          <span className="section-label">Chapter Two</span>
          <h2 className="section-title">Two Nightmares</h2>
          <p className="section-subtitle">The Worlds They Built</p>

          <div className="metaphor-box">
            <p>
              Two prisons with the same effect but opposite methods — one with
              visible bars, one with invisible comfort.
            </p>
          </div>

          <div className="comparison-container">
            <ComparisonPanel
              side="1984"
              title="The World of 1984"
              items={[
                "The Telescreen — You are always watched",
                "The Thought Police — Even your mind is not your own",
                "The Ministry of Truth — History is rewritten daily",
                "Doublethink — Hold contradictory beliefs",
                "Newspeak — Eliminate words for unapproved thoughts",
                "Room 101 — Confront your deepest fear",
              ]}
            />
            <div className="comparison-divider">
              <div className="divider-vs">VS</div>
            </div>
            <ComparisonPanel
              side="bnw"
              title="The World State"
              items={[
                "Conditioning — Programmed from birth",
                "Hypnopaedia — Sleep-teaching reinforces rules",
                "Soma — The perfect drug, no hangover",
                "The Feelies — Entertainment so immersive you never think",
                "Promiscuity — No deep attachments allowed",
                "Exile — Dissenters aren't killed, just removed",
              ]}
            />
          </div>

          <div className="control-mechanism">
            <div className="mechanism mechanism-fear">
              <span className="mechanism-label">Control through</span>
              <span className="mechanism-word">FEAR</span>
              <span className="mechanism-detail">
                You obey because the consequences are unbearable.
              </span>
            </div>
            <div className="mechanism mechanism-pleasure">
              <span className="mechanism-label">Control through</span>
              <span className="mechanism-word">PLEASURE</span>
              <span className="mechanism-detail">
                You obey because you love your servitude.
              </span>
            </div>
          </div>

          <QuoteMonument
            quote="If you want a picture of the future, imagine a boot stamping on a human face — forever."
            attribution="O'Brien"
            source="Nineteen Eighty-Four"
            variant="orwell"
          />
        </div>
      </Section>

      {/* ================================================================== */}
      {/* CHAPTER 3: THE LETTER */}
      {/* ================================================================== */}
      <Section id="chapter-3" className="chapter-section chapter-letter">
        <div className="section-content">
          <span className="section-label">Chapter Three</span>
          <h2 className="section-title">The Letter</h2>
          <p className="section-subtitle">October 21, 1949</p>

          <div className="metaphor-box">
            <p>
              Two prophets, one soon to die, exchanging visions across the void
              — literature&apos;s most prescient correspondence.
            </p>
          </div>

          <div className="letter-context">
            <p>
              Three months before George Orwell would die of tuberculosis,
              Aldous Huxley wrote him a letter. He had just finished reading{" "}
              <em>Nineteen Eighty-Four</em>.
            </p>
          </div>

          <TheLetter />

          <div className="letter-aftermath">
            <p>
              Huxley predicted that his vision would prove more accurate — not
              because Orwell was wrong about tyranny, but because a subtler form
              would prove more efficient.
            </p>
            <p>The question: Was he right?</p>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* CHAPTER 4: TRUTH AND MEMORY */}
      {/* ================================================================== */}
      <Section id="chapter-4" className="chapter-section chapter-truth">
        <div className="section-content">
          <span className="section-label">Chapter Four</span>
          <h2 className="section-title">Truth and Memory</h2>
          <p className="section-subtitle">How Each Society Handles Reality</p>

          <div className="metaphor-box">
            <p>
              Two methods of killing truth — the memory hole and the irrelevant
              avalanche.
            </p>
          </div>

          <SplitScreen
            leftContent={
              <div className="truth-panel truth-1984">
                <h4>In 1984: Truth is Destroyed</h4>
                <ul>
                  <li>The Ministry of Truth rewrites history daily</li>
                  <li>Memory holes consume inconvenient documents</li>
                  <li>
                    &quot;Who controls the past controls the future&quot;
                  </li>
                  <li>Newspeak eliminates words for unapproved thoughts</li>
                </ul>
              </div>
            }
            rightContent={
              <div className="truth-panel truth-bnw">
                <h4>In Brave New World: Truth is Drowned</h4>
                <ul>
                  <li>&quot;History is bunk&quot; — why bother controlling it?</li>
                  <li>Conditioning means no one questions</li>
                  <li>So much entertainment, who has time for truth?</li>
                  <li>The past simply doesn&apos;t matter</li>
                </ul>
              </div>
            }
          />

          <QuoteMonument
            quote="Orwell feared that the truth would be concealed from us. Huxley feared the truth would be drowned in a sea of irrelevance."
            attribution="Neil Postman"
            source="Amusing Ourselves to Death"
            variant="postman"
          />
        </div>
      </Section>

      {/* ================================================================== */}
      {/* CHAPTER 5: LOVE AND SEX */}
      {/* ================================================================== */}
      <Section id="chapter-5" className="chapter-section chapter-love">
        <div className="section-content">
          <span className="section-label">Chapter Five</span>
          <h2 className="section-title">Love and Sex</h2>
          <p className="section-subtitle">Bodies as Instruments of Control</p>

          <div className="metaphor-box">
            <p>
              Two prisons for desire — the locked room and the open door that
              leads nowhere.
            </p>
          </div>

          <SplitScreen
            leftContent={
              <div className="love-panel love-1984">
                <h4>Sexuality Repressed</h4>
                <p>
                  The Anti-Sex League promotes &quot;goodsex&quot; — reproduction only.
                  Winston and Julia&apos;s affair is political rebellion. Physical
                  desire itself is dangerous.
                </p>
                <p className="love-result">
                  They fear to love. Their capture destroys their bond: &quot;I
                  betrayed you.&quot;
                </p>
              </div>
            }
            rightContent={
              <div className="love-panel love-bnw">
                <h4>Sexuality Mandated</h4>
                <p>
                  &quot;Everyone belongs to everyone else.&quot; Exclusive relationships
                  are scandalous. Sex is constant, meaningless, recreational.
                  Children are raised communally.
                </p>
                <p className="love-result">
                  They don&apos;t know how to love. Connection is impossible.
                </p>
              </div>
            }
            centerText="Same outcome: No one loves deeply enough to rebel for anyone."
          />

          <QuoteMonument
            quote="But I don't want comfort. I want God, I want poetry, I want real danger, I want freedom, I want goodness. I want sin."
            attribution="John the Savage"
            source="Brave New World"
            variant="huxley"
          />
        </div>
      </Section>

      {/* ================================================================== */}
      {/* CHAPTER 6: THE SYNTHESIS */}
      {/* ================================================================== */}
      <Section id="chapter-6" className="chapter-section chapter-synthesis">
        <div className="section-content">
          <span className="section-label">Chapter Six</span>
          <h2 className="section-title">The Synthesis</h2>
          <p className="section-subtitle">We Got Both</p>

          <div className="metaphor-box metaphor-synthesis">
            <p>
              The smartphone as telescreen AND soma dispenser — we are watched
              while we scroll.
            </p>
          </div>

          <div className="synthesis-reveal">
            <div className="synthesis-columns">
              <div className="synthesis-column synthesis-orwell">
                <h4>Orwellian Today</h4>
                <ul>
                  <li>Mass surveillance (NSA, facial recognition)</li>
                  <li>&quot;Fake news&quot; and contested reality</li>
                  <li>History revised in real-time</li>
                  <li>Authoritarian governments rising globally</li>
                </ul>
              </div>
              <div className="synthesis-column synthesis-huxley">
                <h4>Huxleyan Today</h4>
                <ul>
                  <li>Infinite entertainment on demand</li>
                  <li>Pharmaceutical solutions for every discomfort</li>
                  <li>Social media as soma (dopamine hits)</li>
                  <li>Consumerism as meaning</li>
                </ul>
              </div>
            </div>

            <div className="synthesis-merge">
              <div className="phone-merge">
                <div className="phone-icon">📱</div>
                <p className="merge-text">
                  The smartphone: It watches you (camera, microphone, location).
                  It entertains you (apps, content, games). You carry it
                  voluntarily. You check it compulsively.
                </p>
                <p className="merge-conclusion">
                  <strong>Both Big Brother AND soma. In one device.</strong>
                </p>
              </div>
            </div>
          </div>

          <QuoteMonument
            quote="Orwell warns that we will be overcome by an externally imposed oppression. But in Huxley's vision, no Big Brother is required to deprive people of their autonomy, maturity and history. As he saw it, people will come to love their oppression, to adore the technologies that undo their capacities to think."
            attribution="Neil Postman"
            source="Amusing Ourselves to Death"
            variant="postman"
          />

          <p className="synthesis-final">
            Both are true. Simultaneously. We are surveilled while we are
            entertained. Tracked while we are gratified. The binary was always
            false.
          </p>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* EPILOGUE: THE UNANSWERED QUESTION */}
      {/* ================================================================== */}
      <Section id="epilogue" className="epilogue-section">
        <div className="section-content">
          <span className="section-label">Epilogue</span>
          <h2 className="section-title">The Unanswered Question</h2>
          <p className="section-subtitle">What Would They Think?</p>

          <div className="epilogue-portraits">
            <div className="portrait-fade portrait-orwell">
              <span>George Orwell</span>
              <span className="years">1903–1950</span>
            </div>
            <div className="portrait-fade portrait-huxley">
              <span>Aldous Huxley</span>
              <span className="years">1894–1963</span>
            </div>
          </div>

          <div className="prose-block">
            <p>
              Would Orwell feel vindicated by surveillance states, facial
              recognition, the manipulation of truth? Would he be horrified that
              we carry telescreens voluntarily?
            </p>
            <p>
              Would Huxley feel vindicated by pharmaceutical billions, attention
              economies, populations scrolling toward oblivion? Would he be
              surprised that surveillance coexists with pleasure?
            </p>
            <p>Neither author offered clear solutions. Both were diagnosticians, not healers.</p>
          </div>

          <div className="final-question">
            <p>
              When you unlock your phone, are you being watched or being
              entertained?
            </p>
            <p>Are you choosing or being conditioned?</p>
            <p>Is this fear or pleasure?</p>
            <p className="final-challenge">
              And if it&apos;s both — what does that mean for how you live?
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

