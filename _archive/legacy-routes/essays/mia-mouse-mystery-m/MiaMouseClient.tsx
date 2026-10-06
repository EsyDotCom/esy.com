"use client";

import React, { useState, useEffect, useRef } from "react";
import "./mia-mouse-mystery-m.css";

/*
 * Mia Mouse and the Mystery M
 * A Children's Fiction Scrollytelling Experience
 *
 * Story: Mia Mouse discovers M-shaped crumbs leading to a shy hedgehog friend
 * Characters: Mia Mouse (curious explorer) and Henri Hedgehog (shy but hopeful)
 * Theme: Curiosity leads to friendship
 * Learning: Letter M recognition, counting 1-5
 */

// ============================================
// SECTION WRAPPER
// ============================================

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = "", id }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`story-section ${className} ${isVisible ? "visible" : ""}`}
    >
      {children}
    </section>
  );
};

// ============================================
// CHARACTER: MIA MOUSE
// ============================================

interface MiaMouseProps {
  expression?: "neutral" | "curious" | "excited" | "happy";
  size?: "small" | "medium" | "large";
  direction?: "left" | "right";
  className?: string;
  onClick?: () => void;
}

const MiaMouse: React.FC<MiaMouseProps> = ({
  expression = "neutral",
  size = "medium",
  direction = "right",
  className = "",
  onClick,
}) => {
  const sizeMap = {
    small: 100,
    medium: 160,
    large: 220,
  };

  const scale = sizeMap[size];

  return (
    <svg
      viewBox="0 0 200 200"
      width={scale}
      height={scale}
      className={`mia-mouse ${expression} ${direction} ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {/* Big round ears */}
      <ellipse
        cx="50"
        cy="60"
        rx="35"
        ry="40"
        className="mia-ear"
      />
      <ellipse
        cx="50"
        cy="60"
        rx="25"
        ry="30"
        className="mia-ear-inner"
      />
      <ellipse
        cx="150"
        cy="60"
        rx="35"
        ry="40"
        className="mia-ear"
      />
      <ellipse
        cx="150"
        cy="60"
        rx="25"
        ry="30"
        className="mia-ear-inner"
      />

      {/* Body */}
      <ellipse
        cx="100"
        cy="140"
        rx="45"
        ry="50"
        className="mia-body"
      />

      {/* Head */}
      <ellipse
        cx="100"
        cy="95"
        rx="55"
        ry="50"
        className="mia-head"
      />

      {/* Belly */}
      <ellipse
        cx="100"
        cy="145"
        rx="30"
        ry="35"
        className="mia-belly"
      />

      {/* Eyes */}
      <g className="mia-eyes">
        <ellipse cx="80" cy="85" rx="12" ry="14" className="mia-eye-white" />
        <ellipse cx="120" cy="85" rx="12" ry="14" className="mia-eye-white" />
        <circle
          cx={expression === "curious" ? "83" : "80"}
          cy={expression === "excited" ? "82" : "87"}
          r="6"
          className="mia-pupil"
        />
        <circle
          cx={expression === "curious" ? "123" : "120"}
          cy={expression === "excited" ? "82" : "87"}
          r="6"
          className="mia-pupil"
        />
        {/* Eye sparkles */}
        <circle cx="77" cy="83" r="2" className="mia-eye-sparkle" />
        <circle cx="117" cy="83" r="2" className="mia-eye-sparkle" />
      </g>

      {/* Nose */}
      <ellipse cx="100" cy="100" rx="8" ry="6" className="mia-nose" />

      {/* Whiskers */}
      <g className="mia-whiskers">
        <line x1="65" y1="98" x2="40" y2="92" />
        <line x1="65" y1="103" x2="38" y2="103" />
        <line x1="65" y1="108" x2="40" y2="114" />
        <line x1="135" y1="98" x2="160" y2="92" />
        <line x1="135" y1="103" x2="162" y2="103" />
        <line x1="135" y1="108" x2="160" y2="114" />
      </g>

      {/* Mouth - changes based on expression */}
      {expression === "happy" || expression === "excited" ? (
        <path
          d="M 88 115 Q 100 128 112 115"
          className="mia-mouth-happy"
        />
      ) : expression === "curious" ? (
        <ellipse cx="100" cy="118" rx="5" ry="4" className="mia-mouth-curious" />
      ) : (
        <path
          d="M 92 116 Q 100 120 108 116"
          className="mia-mouth"
        />
      )}

      {/* Cheek blush */}
      <ellipse cx="65" cy="100" rx="10" ry="6" className="mia-cheek" />
      <ellipse cx="135" cy="100" rx="10" ry="6" className="mia-cheek" />

      {/* Arms */}
      <ellipse
        cx="55"
        cy="130"
        rx="12"
        ry="20"
        className="mia-arm"
        transform="rotate(-20 55 130)"
      />
      <ellipse
        cx="145"
        cy="130"
        rx="12"
        ry="20"
        className="mia-arm"
        transform="rotate(20 145 130)"
      />

      {/* Feet */}
      <ellipse cx="75" cy="185" rx="18" ry="10" className="mia-foot" />
      <ellipse cx="125" cy="185" rx="18" ry="10" className="mia-foot" />

      {/* Tail */}
      <path
        d="M 145 150 Q 180 150 175 120 Q 170 90 185 85"
        className="mia-tail"
      />
    </svg>
  );
};

// ============================================
// CHARACTER: HENRI HEDGEHOG
// ============================================

interface HenriHedgehogProps {
  expression?: "shy" | "hopeful" | "happy";
  size?: "small" | "medium" | "large";
  className?: string;
  onClick?: () => void;
}

const HenriHedgehog: React.FC<HenriHedgehogProps> = ({
  expression = "shy",
  size = "medium",
  className = "",
  onClick,
}) => {
  const sizeMap = {
    small: 100,
    medium: 160,
    large: 220,
  };

  const scale = sizeMap[size];

  return (
    <svg
      viewBox="0 0 200 200"
      width={scale}
      height={scale}
      className={`henri-hedgehog ${expression} ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {/* Spines (back) */}
      <g className="henri-spines">
        {[...Array(11)].map((_, i) => {
          const angle = -70 + i * 14;
          const rad = (angle * Math.PI) / 180;
          const cx = 100 + Math.cos(rad) * 45;
          const cy = 100 + Math.sin(rad) * 45;
          const tipX = 100 + Math.cos(rad) * 85;
          const tipY = 100 + Math.sin(rad) * 85;
          return (
            <path
              key={i}
              d={`M ${cx} ${cy} L ${tipX} ${tipY}`}
              className="henri-spine"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          );
        })}
      </g>

      {/* Body */}
      <ellipse
        cx="100"
        cy="120"
        rx="50"
        ry="55"
        className="henri-body"
      />

      {/* Face area (lighter) */}
      <ellipse
        cx="100"
        cy="110"
        rx="35"
        ry="40"
        className="henri-face-area"
      />

      {/* Eyes */}
      <g className="henri-eyes">
        <ellipse cx="85" cy="100" rx="10" ry="12" className="henri-eye-white" />
        <ellipse cx="115" cy="100" rx="10" ry="12" className="henri-eye-white" />
        <circle
          cx="85"
          cy={expression === "shy" ? "103" : "100"}
          r="5"
          className="henri-pupil"
        />
        <circle
          cx="115"
          cy={expression === "shy" ? "103" : "100"}
          r="5"
          className="henri-pupil"
        />
        {/* Eye sparkles */}
        <circle cx="83" cy="98" r="2" className="henri-eye-sparkle" />
        <circle cx="113" cy="98" r="2" className="henri-eye-sparkle" />
      </g>

      {/* Nose */}
      <ellipse cx="100" cy="115" rx="10" ry="8" className="henri-nose" />

      {/* Mouth */}
      {expression === "happy" ? (
        <path
          d="M 90 128 Q 100 138 110 128"
          className="henri-mouth-happy"
        />
      ) : expression === "hopeful" ? (
        <path
          d="M 92 128 Q 100 133 108 128"
          className="henri-mouth"
        />
      ) : (
        <path
          d="M 95 128 Q 100 130 105 128"
          className="henri-mouth"
        />
      )}

      {/* Cheek blush */}
      <ellipse cx="70" cy="115" rx="8" ry="5" className="henri-cheek" />
      <ellipse cx="130" cy="115" rx="8" ry="5" className="henri-cheek" />

      {/* Little feet */}
      <ellipse cx="75" cy="170" rx="15" ry="10" className="henri-foot" />
      <ellipse cx="125" cy="170" rx="15" ry="10" className="henri-foot" />

      {/* Arms */}
      <ellipse
        cx="55"
        cy="130"
        rx="10"
        ry="18"
        className="henri-arm"
        transform="rotate(-15 55 130)"
      />
      <ellipse
        cx="145"
        cy="130"
        rx="10"
        ry="18"
        className="henri-arm"
        transform="rotate(15 145 130)"
      />
    </svg>
  );
};

// ============================================
// M-SHAPED CRUMB
// ============================================

interface MCrumbProps {
  found?: boolean;
  glowing?: boolean;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const MCrumb: React.FC<MCrumbProps> = ({
  found = false,
  glowing = false,
  size = "medium",
  onClick,
  className = "",
  style,
}) => {
  const sizeMap = {
    small: 40,
    medium: 60,
    large: 80,
  };

  const scale = sizeMap[size];

  return (
    <div
      className={`m-crumb ${found ? "found" : ""} ${glowing ? "glowing" : ""} ${className}`}
      onClick={onClick}
      style={{ width: scale, height: scale, ...style }}
    >
      <svg viewBox="0 0 60 60" width="100%" height="100%">
        {/* Glow filter */}
        <defs>
          <filter id="crumb-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* The M shape - like a cookie crumb */}
        <path
          d="M 10 45 L 10 20 L 20 35 L 30 15 L 40 35 L 50 20 L 50 45"
          className="crumb-m-shape"
          filter={glowing ? "url(#crumb-glow)" : undefined}
        />

        {/* Sparkles when found */}
        {found && (
          <g className="crumb-sparkles">
            <circle cx="5" cy="10" r="2" className="sparkle" />
            <circle cx="55" cy="10" r="2" className="sparkle" style={{ animationDelay: "0.2s" }} />
            <circle cx="30" cy="5" r="2" className="sparkle" style={{ animationDelay: "0.4s" }} />
            <circle cx="10" cy="55" r="2" className="sparkle" style={{ animationDelay: "0.3s" }} />
            <circle cx="50" cy="55" r="2" className="sparkle" style={{ animationDelay: "0.5s" }} />
          </g>
        )}
      </svg>
    </div>
  );
};

// ============================================
// GRASS DECORATIONS
// ============================================

const GrassBlade: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg viewBox="0 0 20 40" className="grass-blade" style={style}>
    <path
      d="M 10 40 Q 5 25 10 10 Q 15 25 10 40"
      fill="var(--grass-green)"
    />
  </svg>
);

const Flower: React.FC<{ color?: string; style?: React.CSSProperties }> = ({
  color = "var(--flower-pink)",
  style,
}) => (
  <svg viewBox="0 0 30 40" className="flower" style={style}>
    <line x1="15" y1="40" x2="15" y2="20" stroke="var(--stem-green)" strokeWidth="2" />
    <circle cx="15" cy="15" r="6" fill="var(--flower-center)" />
    <circle cx="15" cy="5" r="5" fill={color} />
    <circle cx="6" cy="12" r="5" fill={color} />
    <circle cx="24" cy="12" r="5" fill={color} />
    <circle cx="8" cy="22" r="5" fill={color} />
    <circle cx="22" cy="22" r="5" fill={color} />
  </svg>
);

// ============================================
// HERO SECTION - SUNNY MEADOW
// ============================================

const HeroSection: React.FC = () => {
  return (
    <section className="story-section hero-section visible">
      {/* Sky */}
      <div className="sky">
        <div className="sun" />
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
      </div>

      {/* Meadow layers */}
      <div className="meadow-far" />
      <div className="meadow-mid" />
      <div className="meadow-near">
        {/* Grass details */}
        <div className="grass-row">
          {[...Array(12)].map((_, i) => (
            <GrassBlade
              key={i}
              style={{
                left: `${i * 8 + Math.random() * 4}%`,
                height: `${30 + Math.random() * 20}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
        {/* Flowers */}
        <Flower color="var(--flower-pink)" style={{ left: "15%", bottom: "10%" }} />
        <Flower color="var(--flower-yellow)" style={{ left: "75%", bottom: "15%" }} />
        <Flower color="var(--flower-purple)" style={{ left: "45%", bottom: "8%" }} />
      </div>

      {/* Title */}
      <div className="hero-content">
        <h1 className="story-title">
          Mia Mouse
          <span className="title-and">&</span>
          <span className="title-mystery">the Mystery M</span>
        </h1>
        <p className="story-subtitle">A story about curiosity and friendship</p>
      </div>

      {/* Mia in the meadow */}
      <div className="hero-character">
        <MiaMouse expression="happy" size="large" />
      </div>

      <div className="scroll-hint">
        <span className="scroll-arrow">↓</span>
        Scroll to explore
      </div>
    </section>
  );
};

// ============================================
// SCENE 1: A BEAUTIFUL DAY
// ============================================

const Scene1: React.FC = () => {
  return (
    <Section className="meadow-scene" id="scene1">
      <div className="scene-content">
        <MiaMouse expression="happy" size="large" />

        <div className="story-text">
          <p>
            Mia Mouse loved sunny days in the meadow.
          </p>
          <p className="story-text-highlight">
            She loved to explore!
          </p>
        </div>
      </div>
    </Section>
  );
};

// ============================================
// SCENE 2: DISCOVERY - FIRST CRUMB
// ============================================

const Scene2: React.FC = () => {
  const [crumbFound, setCrumbFound] = useState(false);

  return (
    <Section className="discovery-scene" id="scene2">
      <div className="story-text" style={{ marginBottom: "2rem" }}>
        <p>One day, Mia saw something on the ground.</p>
        <p className="story-text-whisper">Something sparkly...</p>
      </div>

      <div className="discovery-area">
        <MCrumb
          found={crumbFound}
          glowing={!crumbFound}
          size="large"
          onClick={() => setCrumbFound(true)}
          className="crumb-interactive"
        />
        {!crumbFound && (
          <p className="tap-hint">Tap the sparkle!</p>
        )}
      </div>

      {crumbFound && (
        <div className="story-text reveal-text">
          <p>It was shaped like the letter...</p>
          <p className="letter-reveal">M!</p>
        </div>
      )}
    </Section>
  );
};

// ============================================
// SCENE 3: WHAT IS IT?
// ============================================

const Scene3: React.FC = () => {
  return (
    <Section className="meadow-scene" id="scene3">
      <div className="scene-content">
        <MiaMouse expression="curious" size="large" direction="right" />

        <div className="story-text">
          <p>&quot;What&apos;s this?&quot; Mia squeaked.</p>
          <p className="story-text-mia">&quot;It looks like a crumb!&quot;</p>
          <p style={{ marginTop: "1rem" }}>
            An M-shaped crumb. How curious!
          </p>
        </div>
      </div>

      <div className="floating-m">
        <MCrumb found size="medium" />
      </div>
    </Section>
  );
};

// ============================================
// SCENE 4: MORE CRUMBS! (COUNTING)
// ============================================

const Scene4: React.FC = () => {
  const [foundCrumbs, setFoundCrumbs] = useState<Set<number>>(new Set());
  const totalCrumbs = 5;

  const handleCrumbClick = (index: number) => {
    const newFound = new Set(foundCrumbs);
    newFound.add(index);
    setFoundCrumbs(newFound);
  };

  const allFound = foundCrumbs.size === totalCrumbs;

  return (
    <Section className="counting-scene" id="scene4">
      <div className="story-text" style={{ marginBottom: "1.5rem" }}>
        <p>Mia looked around and saw MORE crumbs!</p>
        <p className="participation-prompt">
          Can you help Mia count them?
        </p>
        <p className="instruction-text">Tap each M to count!</p>
      </div>

      <div className="crumb-field">
        {[...Array(totalCrumbs)].map((_, i) => (
          <div
            key={i}
            className="crumb-position"
            style={{
              left: `${15 + i * 17}%`,
              top: `${20 + (i % 2) * 30}%`,
            }}
          >
            <MCrumb
              found={foundCrumbs.has(i)}
              glowing={!foundCrumbs.has(i)}
              size="medium"
              onClick={() => handleCrumbClick(i)}
              className="crumb-interactive"
            />
            {foundCrumbs.has(i) && (
              <span className="crumb-number">{[...foundCrumbs].indexOf(i) + 1}</span>
            )}
          </div>
        ))}
      </div>

      <div className="count-display">
        <span className="count-number">{foundCrumbs.size}</span>
        <span className="count-label">crumbs found!</span>
      </div>

      {allFound && (
        <div className="story-text reveal-text celebration">
          <p className="celebration-text">🎉 You found all 5! 🎉</p>
          <p>The crumbs made a trail...</p>
        </div>
      )}
    </Section>
  );
};

// ============================================
// SCENE 5: FOLLOWING THE TRAIL
// ============================================

const Scene5: React.FC = () => {
  return (
    <Section className="trail-scene" id="scene5">
      <div className="trail-visual">
        <div className="trail-crumbs">
          {[...Array(7)].map((_, i) => (
            <MCrumb
              key={i}
              found
              size="small"
              className="trail-crumb"
              style={{
                animationDelay: `${i * 0.15}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>
        <MiaMouse expression="excited" size="medium" direction="right" className="walking-mia" />
      </div>

      <div className="story-text">
        <p className="story-text-mia">&quot;I wonder where they lead!&quot;</p>
        <p>Mia followed the crumbs...</p>
        <p className="story-text-highlight">deeper into the meadow...</p>
      </div>
    </Section>
  );
};

// ============================================
// SCENE 6: THE HOLLOW LOG
// ============================================

const Scene6: React.FC = () => {
  const [peekInside, setPeekInside] = useState(false);

  return (
    <Section className="log-scene" id="scene6">
      <div className="story-text" style={{ marginBottom: "2rem" }}>
        <p>The trail led to a big, hollow log.</p>
        <p>Mia peeked inside...</p>
      </div>

      <div className="log-container">
        {/* The log */}
        <div className="hollow-log">
          <div className="log-opening">
            {!peekInside && (
              <div className="mystery-darkness">
                <span className="question-marks">???</span>
              </div>
            )}
            {peekInside && (
              <div className="log-inside reveal-animation">
                <HenriHedgehog expression="shy" size="medium" />
              </div>
            )}
          </div>
        </div>

        {/* Crumbs leading to log */}
        <div className="log-crumbs">
          <MCrumb found size="small" />
          <MCrumb found size="small" />
          <MCrumb found size="small" />
        </div>
      </div>

      {!peekInside ? (
        <button
          className="story-button tap-target"
          onClick={() => setPeekInside(true)}
        >
          Help Mia peek inside!
        </button>
      ) : (
        <div className="story-text reveal-text">
          <p className="story-text-whisper">There was someone inside!</p>
          <p>A little hedgehog... looking very shy.</p>
        </div>
      )}
    </Section>
  );
};

// ============================================
// SCENE 7: MEETING HENRI
// ============================================

const Scene7: React.FC = () => {
  return (
    <Section className="meeting-scene" id="scene7">
      <div className="characters-together">
        <MiaMouse expression="curious" size="medium" />
        <HenriHedgehog expression="shy" size="medium" />
      </div>

      <div className="story-text">
        <p className="story-text-mia">&quot;Hello there!&quot;</p>
        <p>said Mia softly.</p>
        <p className="story-text-henri" style={{ marginTop: "1.5rem" }}>
          &quot;H-hello...&quot;
        </p>
        <p>whispered the hedgehog.</p>
        <p className="story-text-henri" style={{ marginTop: "1rem" }}>
          &quot;My name is Henri.&quot;
        </p>
      </div>
    </Section>
  );
};

// ============================================
// SCENE 8: HENRI'S SECRET
// ============================================

const Scene8: React.FC = () => {
  return (
    <Section className="secret-scene" id="scene8">
      <div className="scene-content">
        <HenriHedgehog expression="hopeful" size="large" />

        <div className="story-text">
          <p className="story-text-mia">&quot;Did you leave these crumbs?&quot;</p>
          <p>Mia asked gently.</p>
          <p className="story-text-henri" style={{ marginTop: "1.5rem" }}>
            &quot;Y-yes...&quot;
          </p>
          <p>Henri looked at his feet.</p>
          <p className="story-text-henri" style={{ marginTop: "1rem" }}>
            &quot;I was too shy to say hello.&quot;
          </p>
          <p className="story-text-henri">
            &quot;So I left a trail... hoping someone would find me.&quot;
          </p>
        </div>
      </div>

      <div className="floating-crumbs">
        <MCrumb found size="small" className="float-1" />
        <MCrumb found size="small" className="float-2" />
        <MCrumb found size="small" className="float-3" />
      </div>
    </Section>
  );
};

// ============================================
// SCENE 9: MIA'S KINDNESS
// ============================================

const Scene9: React.FC = () => {
  return (
    <Section className="kindness-scene" id="scene9">
      <div className="characters-together">
        <MiaMouse expression="happy" size="medium" />
        <HenriHedgehog expression="hopeful" size="medium" />
      </div>

      <div className="story-text">
        <p>Mia smiled her biggest smile.</p>
        <p className="story-text-mia" style={{ marginTop: "1.5rem" }}>
          &quot;I&apos;m so glad I found you, Henri!&quot;
        </p>
        <p className="story-text-mia">
          &quot;Would you like to be friends?&quot;
        </p>
      </div>
    </Section>
  );
};

// ============================================
// SCENE 10: FRIENDSHIP CELEBRATION
// ============================================

const Scene10: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Section className="celebration-scene" id="scene10">
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: [
                  "var(--flower-pink)",
                  "var(--flower-yellow)",
                  "var(--sky-blue)",
                  "var(--flower-purple)",
                  "var(--crumb-gold)",
                ][i % 5],
              }}
            />
          ))}
        </div>
      )}

      <div className="story-text" style={{ marginBottom: "2rem" }}>
        <p className="story-text-henri">
          &quot;Really? You want to be MY friend?&quot;
        </p>
      </div>

      <div className="characters-celebrating">
        <MiaMouse expression="excited" size="large" />
        <div className="heart-burst">❤️</div>
        <HenriHedgehog expression="happy" size="large" />
      </div>

      <div className="story-text" style={{ marginTop: "2rem" }}>
        <p>Henri&apos;s smile grew and grew!</p>
        <p className="story-text-henri" style={{ marginTop: "1rem" }}>
          &quot;YES! Oh yes!&quot;
        </p>
      </div>
    </Section>
  );
};

// ============================================
// SCENE 11: SHARING THE LAST CRUMB
// ============================================

const Scene11: React.FC = () => {
  const [crumbShared, setCrumbShared] = useState(false);

  return (
    <Section className="sharing-scene" id="scene11">
      <div className="story-text" style={{ marginBottom: "1.5rem" }}>
        <p>Henri held up the very last M crumb.</p>
        <p className="story-text-henri" style={{ marginTop: "1rem" }}>
          &quot;Would you like to share it?&quot;
        </p>
      </div>

      {!crumbShared ? (
        <div className="share-interaction">
          <MCrumb
            found
            glowing
            size="large"
            onClick={() => setCrumbShared(true)}
            className="crumb-interactive final-crumb"
          />
          <p className="tap-hint">Tap to share!</p>
        </div>
      ) : (
        <div className="shared-moment">
          <div className="characters-sharing">
            <MiaMouse expression="happy" size="medium" />
            <div className="shared-crumb-container">
              <MCrumb found size="small" className="half-crumb left" />
              <MCrumb found size="small" className="half-crumb right" />
            </div>
            <HenriHedgehog expression="happy" size="medium" />
          </div>

          <div className="story-text reveal-text">
            <p>They broke it in half and shared.</p>
            <p className="story-text-highlight" style={{ marginTop: "1rem" }}>
              And it was the most delicious crumb ever.
            </p>
          </div>
        </div>
      )}
    </Section>
  );
};

// ============================================
// FINALE: THE END
// ============================================

const FinaleSection: React.FC = () => {
  return (
    <Section className="finale-scene" id="finale">
      <div className="finale-characters">
        <MiaMouse expression="happy" size="medium" />
        <div className="friendship-heart">💛</div>
        <HenriHedgehog expression="happy" size="medium" />
      </div>

      <p className="story-ending">The End</p>

      <div className="story-text finale-moral">
        <p>And from that day on,</p>
        <p>Mia and Henri were the best of friends.</p>
        <p className="story-text-highlight" style={{ marginTop: "1.5rem" }}>
          Sometimes the best discoveries
        </p>
        <p className="story-text-highlight">
          are the friends we find along the way.
        </p>
      </div>

      <div className="floating-m-trail">
        {[...Array(5)].map((_, i) => (
          <MCrumb
            key={i}
            found
            size="small"
            className="finale-crumb"
            style={{ animationDelay: `${i * 0.3}s` } as React.CSSProperties}
          />
        ))}
      </div>
    </Section>
  );
};

// ============================================
// CREDITS
// ============================================

const CreditsSection: React.FC = () => (
  <section className="story-credits">
    <div className="credits-content">
      <div className="credits-characters">
        <MiaMouse expression="happy" size="small" />
        <HenriHedgehog expression="happy" size="small" />
      </div>
      <p className="credits-text">
        &quot;Mia Mouse and the Mystery M&quot; is an original story created for{" "}
        <a href="https://esy.com">Esy</a>.
      </p>
      <p className="credits-text" style={{ marginTop: "1rem" }}>
        For all the curious explorers and the shy friends waiting to be found.
      </p>
      <div className="credits-letter">
        <span className="big-m">M</span>
        <span className="credits-tagline">is for Mouse, Mystery, and Making friends!</span>
      </div>
    </div>
  </section>
);

// ============================================
// MAIN COMPONENT
// ============================================

const MiaMouseClient: React.FC = () => {
  return (
    <div className="mia-mouse-story">
      <HeroSection />
      <Scene1 />
      <Scene2 />
      <Scene3 />
      <Scene4 />
      <Scene5 />
      <Scene6 />
      <Scene7 />
      <Scene8 />
      <Scene9 />
      <Scene10 />
      <Scene11 />
      <FinaleSection />
      <CreditsSection />
    </div>
  );
};

export default MiaMouseClient;

