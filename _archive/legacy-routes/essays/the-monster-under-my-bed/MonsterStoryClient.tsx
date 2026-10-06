"use client";

import React, { useState, useEffect, useRef } from "react";
import "./the-monster-under-my-bed.css";

/*
 * The Monster Under My Bed
 * A Children's Fiction Scrollytelling Experience
 * 
 * Story: A child discovers the monster under their bed is actually afraid of the dark
 * Characters: Maya (the child) and Gus (the monster)
 * Theme: Fear, friendship, and understanding
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
// CHARACTER: THE MONSTER (GUS)
// ============================================

interface MonsterProps {
  expression?: "neutral" | "scared" | "happy" | "waving";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  className?: string;
}

const Monster: React.FC<MonsterProps> = ({ 
  expression = "neutral", 
  size = "medium",
  onClick,
  className = ""
}) => {
  const sizeClasses = {
    small: { width: 140, height: 160 },
    medium: { width: 220, height: 260 },
    large: { width: 280, height: 320 },
  };

  const expressionClasses = {
    neutral: "",
    scared: "scared shaking",
    happy: "happy",
    waving: "happy waving",
  };

  return (
    <div 
      className={`monster-full tap-target ${expressionClasses[expression]} ${className}`}
      style={{ width: sizeClasses[size].width, height: sizeClasses[size].height }}
      onClick={onClick}
    >
      {/* Horns */}
      <div className="monster-horns">
        <div className="monster-horn" />
        <div className="monster-horn" />
      </div>

      {/* Body */}
      <div className="monster-body">
        <div className="monster-belly" />
        
        {/* Face */}
        <div className="monster-face">
          <div className="monster-eyes">
            <div className="monster-eye">
              <div className="monster-pupil" />
            </div>
            <div className="monster-eye">
              <div className="monster-pupil" />
            </div>
          </div>
          
          <div className="monster-mouth">
            <div className="monster-tongue" />
          </div>
          
          <div className="monster-cheeks">
            <div className="monster-cheek" />
            <div className="monster-cheek" />
          </div>
        </div>
      </div>

      {/* Arms */}
      <div className="monster-arms">
        <div className="monster-arm left" />
        <div className="monster-arm right" />
      </div>

      {/* Feet */}
      <div className="monster-feet">
        <div className="monster-foot" />
        <div className="monster-foot" />
      </div>
    </div>
  );
};

// ============================================
// CHARACTER: THE CHILD (MAYA) - STANDING
// ============================================

interface ChildStandingProps {
  expression?: "neutral" | "scared" | "happy" | "curious";
  onClick?: () => void;
  className?: string;
}

const ChildStanding: React.FC<ChildStandingProps> = ({ 
  expression = "neutral",
  onClick,
  className = ""
}) => {
  return (
    <div className={`child-standing tap-target ${className}`} onClick={onClick}>
      {/* Head */}
      <div className="child-standing-head">
        <div className="child-standing-hair" />
        <div className="child-standing-face">
          <div className="child-standing-eyes">
            <div className="child-standing-eye" />
            <div className="child-standing-eye" />
          </div>
          <div className={`child-standing-mouth ${expression === "happy" ? "smiling" : ""}`} />
        </div>
      </div>

      {/* Body */}
      <div className="child-standing-body" />

      {/* Arms */}
      <div className="child-standing-arms">
        <div className="child-standing-arm" />
        <div className="child-standing-arm" />
      </div>

      {/* Legs */}
      <div className="child-standing-legs">
        <div className="child-standing-leg" />
        <div className="child-standing-leg" />
      </div>

      {/* Feet */}
      <div className="child-standing-feet">
        <div className="child-standing-foot" />
        <div className="child-standing-foot" />
      </div>
    </div>
  );
};

// ============================================
// HERO: BEDROOM AT NIGHT
// ============================================

const HeroSection: React.FC = () => {
  const [eyesVisible, setEyesVisible] = useState(false);
  const [lampOn, setLampOn] = useState(false);
  const [childAwake, setChildAwake] = useState(false);

  useEffect(() => {
    // Show monster eyes after a delay
    const timer = setTimeout(() => setEyesVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleLamp = () => {
    setLampOn(!lampOn);
    if (!lampOn) {
      setChildAwake(true);
    }
  };

  return (
    <section className="story-section hero-section visible">
      {/* Window with moon */}
      <div className="window">
        <div className="window-moon" />
        <div className="window-stars">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="window-star"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Lamp */}
      <div 
        className={`bedside-lamp tap-target ${lampOn ? "lamp-on" : ""}`}
        onClick={toggleLamp}
      >
        <div className="lamp-shade">
          <div className="lamp-glow" />
        </div>
        <div className="lamp-stem" />
        <div className="lamp-base" />
      </div>

      {/* Bed with child */}
      <div className="bed">
        <div className="pillow" />
        <div className="child-in-bed">
          <div className="child-head">
            <div className="child-hair" />
            <div className="child-face">
              <div className="child-eyes">
                <div className={`child-eye ${!childAwake ? "closed" : ""}`}>
                  {childAwake && <div className="child-pupil" />}
                </div>
                <div className={`child-eye ${!childAwake ? "closed" : ""}`}>
                  {childAwake && <div className="child-pupil" />}
                </div>
              </div>
              <div className="child-cheeks">
                <div className="child-cheek" />
                <div className="child-cheek" />
              </div>
            </div>
          </div>
        </div>
        <div className="blanket" />
        <div className="mattress" />
        <div className="bed-frame" />
        <div className="under-bed">
          <div className={`monster-eyes-peeking ${eyesVisible ? "visible" : ""}`}>
            <div className="peeking-eye" />
            <div className="peeking-eye" />
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="hero-content">
        <h1 className="story-title">The Monster Under My Bed</h1>
        <p className="story-subtitle">A bedtime story about friendship</p>
      </div>

      <div className="scroll-hint">Scroll to begin ↓</div>
    </section>
  );
};

// ============================================
// SCENE 1: MAYA HEARS SOMETHING
// ============================================

const Scene1: React.FC = () => {
  return (
    <Section className="under-bed-scene" id="scene1">
      <div className="darkness-overlay" />
      
      <div className="story-text">
        <p>Maya couldn&apos;t sleep.</p>
        <p style={{ marginTop: "1.5rem" }}>
          She heard a sound. A small, scared sound.
        </p>
        <p className="story-text-whisper" style={{ marginTop: "1.5rem" }}>
          &quot;Whimper... whimper...&quot;
        </p>
        <p style={{ marginTop: "1.5rem" }}>
          It was coming from <span className="story-text-emphasis">under the bed</span>.
        </p>
      </div>
    </Section>
  );
};

// ============================================
// SCENE 2: MAYA LOOKS UNDER THE BED
// ============================================

const Scene2: React.FC = () => {
  const [monsterRevealed, setMonsterRevealed] = useState(false);

  return (
    <Section className="under-bed-scene" id="scene2">
      <div className="darkness-overlay" />

      <div className="story-text" style={{ marginBottom: "2rem" }}>
        <p>Maya took a deep breath.</p>
        <p style={{ marginTop: "1rem" }}>
          She leaned over the edge of her bed...
        </p>
        <p style={{ marginTop: "1rem" }}>
          and looked <span className="story-text-emphasis">underneath</span>.
        </p>
      </div>

      <div 
        className="tap-target"
        onClick={() => setMonsterRevealed(true)}
        style={{ marginTop: "2rem" }}
      >
        {!monsterRevealed ? (
          <div style={{ 
            width: 200, 
            height: 150, 
            background: "#0a0a15", 
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px dashed rgba(255,255,255,0.2)"
          }}>
            <span className="tap-hint">Tap to look</span>
          </div>
        ) : (
          <Monster expression="scared" size="medium" />
        )}
      </div>

      {monsterRevealed && (
        <div className="story-text" style={{ marginTop: "2rem" }}>
          <p>There was a <span className="story-text-emphasis">MONSTER!</span></p>
          <p style={{ marginTop: "1rem" }}>
            But wait... it was <em>shaking</em>.
          </p>
        </div>
      )}
    </Section>
  );
};

// ============================================
// SCENE 3: THE MONSTER IS SCARED
// ============================================

const Scene3: React.FC = () => {
  return (
    <Section className="under-bed-scene" id="scene3">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
        <Monster expression="scared" size="large" />

        <div className="story-text">
          <p className="story-text-monster">&quot;P-please don&apos;t be scared of me!&quot;</p>
          <p style={{ marginTop: "1.5rem" }}>
            the monster whispered.
          </p>
          <p className="story-text-monster" style={{ marginTop: "1.5rem" }}>
            &quot;I&apos;m the one who&apos;s scared!&quot;
          </p>
        </div>
      </div>
    </Section>
  );
};

// ============================================
// SCENE 4: MAYA ASKS WHY
// ============================================

const Scene4: React.FC = () => {
  return (
    <Section id="scene4">
      <div style={{ display: "flex", alignItems: "flex-end", gap: "3rem", flexWrap: "wrap", justifyContent: "center" }}>
        <ChildStanding expression="curious" />
        <Monster expression="scared" size="medium" />
      </div>

      <div className="story-text" style={{ marginTop: "2rem" }}>
        <p>&quot;Scared?&quot; Maya asked. &quot;Scared of what?&quot;</p>
        <p className="story-text-monster" style={{ marginTop: "1.5rem" }}>
          &quot;The... the dark,&quot;
        </p>
        <p style={{ marginTop: "0.5rem" }}>
          the monster said quietly.
        </p>
        <p className="story-text-monster" style={{ marginTop: "1.5rem" }}>
          &quot;It&apos;s so dark under here. And lonely.&quot;
        </p>
      </div>
    </Section>
  );
};

// ============================================
// SCENE 5: MAYA HAS AN IDEA
// ============================================

const Scene5: React.FC = () => {
  const [lampTapped, setLampTapped] = useState(false);

  return (
    <Section className="light-scene" id="scene5">
      <div className="story-text" style={{ marginBottom: "2rem" }}>
        <p>Maya had an idea.</p>
        <p style={{ marginTop: "1rem" }}>
          &quot;What if I turn on my lamp?&quot;
        </p>
      </div>

      <div 
        className={`bedside-lamp tap-target ${lampTapped ? "lamp-on" : ""}`}
        onClick={() => setLampTapped(true)}
        style={{ position: "relative", marginBottom: "2rem" }}
      >
        <div className="lamp-shade">
          <div className="lamp-glow" />
        </div>
        <div className="lamp-stem" />
        <div className="lamp-base" />
      </div>

      {!lampTapped && <p className="tap-hint">Tap the lamp</p>}

      {lampTapped && (
        <div className="story-text">
          <p>The room filled with <span className="story-text-emphasis">warm, golden light</span>.</p>
        </div>
      )}
    </Section>
  );
};

// ============================================
// SCENE 6: THE MONSTER IS HAPPY
// ============================================

const Scene6: React.FC = () => {
  const [monsterTapped, setMonsterTapped] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleMonsterTap = () => {
    setMonsterTapped(true);
    // Add floating hearts
    const newHearts = [...Array(3)].map((_, i) => ({
      id: Date.now() + i,
      x: 50 + (Math.random() - 0.5) * 100,
      y: 0,
    }));
    setHearts([...hearts, ...newHearts]);
  };

  return (
    <Section className="light-scene" id="scene6">
      <div className="story-text" style={{ marginBottom: "2rem" }}>
        <p>The monster&apos;s big eyes grew even bigger.</p>
      </div>

      <div style={{ position: "relative" }}>
        <Monster 
          expression={monsterTapped ? "happy" : "neutral"} 
          size="large" 
          onClick={handleMonsterTap}
        />
        
        {hearts.map(heart => (
          <div 
            key={heart.id}
            className="heart-container"
            style={{ left: heart.x, top: heart.y }}
          >
            <span className="heart">❤️</span>
          </div>
        ))}
      </div>

      {!monsterTapped && <p className="tap-hint">Tap the monster</p>}

      {monsterTapped && (
        <div className="story-text" style={{ marginTop: "2rem" }}>
          <p className="story-text-monster">&quot;It&apos;s... it&apos;s beautiful!&quot;</p>
          <p style={{ marginTop: "1rem" }}>
            the monster said, smiling for the first time.
          </p>
        </div>
      )}
    </Section>
  );
};

// ============================================
// SCENE 7: INTRODUCING GUS
// ============================================

const Scene7: React.FC = () => {
  return (
    <Section className="friendship-scene" id="scene7">
      <div style={{ display: "flex", alignItems: "flex-end", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
        <ChildStanding expression="happy" />
        <Monster expression="waving" size="medium" />
      </div>

      <div className="story-text" style={{ marginTop: "2rem" }}>
        <p>&quot;I&apos;m Maya,&quot; said Maya.</p>
        <p className="story-text-monster" style={{ marginTop: "1.5rem" }}>
          &quot;I&apos;m Gus,&quot;
        </p>
        <p style={{ marginTop: "0.5rem" }}>said the monster.</p>
        <p className="story-text-monster" style={{ marginTop: "1.5rem" }}>
          &quot;Want to be friends?&quot;
        </p>
      </div>
    </Section>
  );
};

// ============================================
// SCENE 8: FRIENDSHIP
// ============================================

const Scene8: React.FC = () => {
  return (
    <Section className="friendship-scene" id="scene8">
      <div className="story-text">
        <p>Maya smiled.</p>
        <p style={{ marginTop: "1.5rem" }}>
          &quot;Yes,&quot; she said. &quot;But you can&apos;t sleep under the bed anymore.&quot;
        </p>
        <p style={{ marginTop: "1.5rem" }}>
          &quot;Where will I sleep?&quot; Gus asked.
        </p>
        <p style={{ marginTop: "1.5rem" }}>
          Maya pointed to the cozy rug beside her bed.
        </p>
        <p style={{ marginTop: "1.5rem" }}>
          &quot;<span className="story-text-emphasis">Right here</span>, where the night light can reach you.&quot;
        </p>
      </div>
    </Section>
  );
};

// ============================================
// SCENE 9: SLEEPING TOGETHER
// ============================================

const Scene9: React.FC = () => {
  const [showZzz, setShowZzz] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowZzz(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Section className="sleep-scene" id="scene9">
      <div className={`zzz-container ${showZzz ? "visible" : ""}`}>
        Z z z . . .
      </div>

      <div className="story-text">
        <p>That night, Maya slept better than ever before.</p>
        <p style={{ marginTop: "1.5rem" }}>
          And Gus?
        </p>
        <p style={{ marginTop: "1.5rem" }}>
          Gus wasn&apos;t scared anymore.
        </p>
        <p style={{ marginTop: "2rem" }}>
          Because he had a <span className="story-text-emphasis">friend</span>.
        </p>
        <p style={{ marginTop: "1rem" }}>
          And a <span className="story-text-emphasis">night light</span>.
        </p>
        <p style={{ marginTop: "1rem" }}>
          And that was <em>more</em> than enough.
        </p>
      </div>
    </Section>
  );
};

// ============================================
// FINALE: THE END
// ============================================

const FinaleSection: React.FC = () => {
  return (
    <Section className="sleep-scene" id="finale">
      <div style={{ display: "flex", alignItems: "flex-end", gap: "1rem", marginBottom: "3rem" }}>
        <Monster expression="happy" size="small" />
        <div style={{ fontSize: "3rem" }}>💛</div>
        <ChildStanding expression="happy" />
      </div>

      <p className="story-ending">The End</p>

      <div className="story-text" style={{ marginTop: "2rem", fontStyle: "italic", opacity: 0.8 }}>
        <p>Sometimes the scariest things are just as scared as we are.</p>
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
      <div className="credits-monster">
        <Monster expression="happy" size="small" />
      </div>
      <p className="credits-text">
        &quot;The Monster Under My Bed&quot; is an original story created for{" "}
        <a href="https://esy.com">Esy</a>.
      </p>
      <p className="credits-text" style={{ marginTop: "1rem" }}>
        For all the children who are afraid of the dark — and the monsters who are too.
      </p>
    </div>
  </section>
);

// ============================================
// MAIN COMPONENT
// ============================================

const MonsterStoryClient: React.FC = () => {
  return (
    <div className="monster-story">
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
      <FinaleSection />
      <CreditsSection />
    </div>
  );
};

export default MonsterStoryClient;






