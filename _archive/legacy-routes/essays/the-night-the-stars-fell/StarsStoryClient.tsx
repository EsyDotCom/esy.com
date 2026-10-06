"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import "./the-night-the-stars-fell.css";

/*
 * The Night the Stars Fell
 * A Children's Fiction Scrollytelling Experience
 * 
 * Story: A little girl helps a fallen star find its way home
 * Target: Children ages 5-10, with parent reading option
 * 
 * Unique Mechanics:
 * - Tap interactions throughout
 * - Light trail that draws as you scroll
 * - Star creature that responds to touch
 * - Climb progress linked to scroll
 * - Chime stars that play notes
 * - Finale celebration on tap
 */

// ============================================
// HELPER COMPONENTS
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
      { threshold: 0.2 }
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

// Generate random stars for backgrounds
const generateStars = (count: number, seed: number = 0) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const x = ((seed + i * 17) % 100);
    const y = ((seed + i * 23) % 100);
    const size = (i % 3 === 0) ? "large" : "";
    const bright = (i % 5 === 0) ? "bright" : "";
    const duration = 2 + (i % 4);
    const delay = (i % 7) * 0.5;
    stars.push({ x, y, size, bright, duration, delay, id: i });
  }
  return stars;
};

// ============================================
// HERO SECTION
// ============================================

const HeroSection: React.FC = () => {
  const [fallingVisible, setFallingVisible] = useState(false);
  const [isFalling, setIsFalling] = useState(false);
  const stars = generateStars(40, 42);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.2;
      
      if (scrollY > threshold && !fallingVisible) {
        setFallingVisible(true);
        setTimeout(() => setIsFalling(true), 500);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fallingVisible]);

  const handleStarTap = (e: React.MouseEvent | React.TouchEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.transform = "scale(2.5)";
    target.style.boxShadow = "0 0 20px var(--starlight)";
    setTimeout(() => {
      target.style.transform = "";
      target.style.boxShadow = "";
    }, 300);
  };

  return (
    <section className="hero-section">
      <div className="hero-stars-container">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`hero-star ${star.size} ${star.bright}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              "--twinkle-duration": `${star.duration}s`,
              "--twinkle-delay": `${star.delay}s`,
            } as React.CSSProperties}
            onClick={handleStarTap}
            onTouchStart={handleStarTap}
          />
        ))}
        <div
          className={`falling-star ${fallingVisible ? "visible" : ""} ${isFalling ? "falling" : ""}`}
          style={{ top: "15%", right: "20%" }}
        />
      </div>

      <div className="hero-content">
        <h1 className="story-title">The Night the Stars Fell</h1>
        <p className="story-subtitle">A bedtime story</p>
      </div>

      <div className="scroll-indicator">
        <span>Scroll to begin</span>
        <div className="scroll-indicator-arrow" />
      </div>
    </section>
  );
};

// ============================================
// THE MISSING STAR
// ============================================

const MissingStarSection: React.FC = () => {
  const [gapTapped, setGapTapped] = useState(false);

  return (
    <Section className="missing-star-section" id="missing-star">
      <div className="window-scene">
        <div className="window-frame">
          <div className="window-glow" />
          <svg className="luna-silhouette" viewBox="0 0 60 80">
            <ellipse cx="30" cy="65" rx="15" ry="12" fill="#1a1a2e" />
            <circle cx="30" cy="35" r="12" fill="#1a1a2e" />
            <path d="M 20 50 Q 30 45 40 50" stroke="#1a1a2e" strokeWidth="8" fill="none" />
          </svg>
        </div>

        <div className="story-text">
          <p>Luna loved counting stars before bed.</p>
          <p className="star-whisper">One, two, three, four, five...</p>
          <p>But tonight, something was wrong.</p>
        </div>

        <div
          className={`constellation-gap tap-target ${gapTapped ? "tapped" : ""}`}
          onClick={() => setGapTapped(true)}
          onTouchStart={() => setGapTapped(true)}
        >
          <svg viewBox="0 0 100 100" width="100" height="100">
            <circle cx="20" cy="20" r="3" fill="var(--starlight)" />
            <circle cx="80" cy="25" r="3" fill="var(--starlight)" />
            <circle cx="30" cy="70" r="3" fill="var(--starlight)" />
            <circle cx="70" cy="80" r="3" fill="var(--starlight)" />
            {/* The gap where a star should be */}
            <circle cx="50" cy="45" r="6" fill="none" stroke="var(--trail-gold-soft)" strokeWidth="1" strokeDasharray="3 2" />
          </svg>
          <div className="gap-highlight" />
        </div>
      </div>

      <p className="star-whisper" style={{ marginTop: "2rem", textAlign: "center" }}>
        Where did you go?
      </p>
    </Section>
  );
};

// ============================================
// THE TRAIL APPEARS
// ============================================

const TrailSection: React.FC = () => {
  const [tappedDots, setTappedDots] = useState<number[]>([]);

  const handleDotTap = (index: number) => {
    if (!tappedDots.includes(index)) {
      setTappedDots([...tappedDots, index]);
    }
  };

  return (
    <Section className="trail-section" id="trail">
      <div className="trail-container">
        <svg className="trail-svg" viewBox="0 0 300 300" preserveAspectRatio="none">
          <path
            className="trail-path"
            d="M 50 280 Q 100 200, 150 220 T 250 150 T 200 50"
          />
        </svg>

        <div className="story-text" style={{ position: "relative", zIndex: 10 }}>
          <p>She saw it then — a trail of light, like breadcrumbs made of gold.</p>
          <p>It started at her windowsill.</p>
          <p>It went somewhere far away.</p>
        </div>

        <div className="trail-dots">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`trail-dot tap-target ${tappedDots.includes(i) ? "tapped" : ""}`}
              onClick={() => handleDotTap(i)}
              onTouchStart={() => handleDotTap(i)}
            />
          ))}
        </div>

        <div className="story-text" style={{ marginTop: "3rem" }}>
          <p>Luna put on her slippers.</p>
          <p>Then she took them off again.</p>
          <p>Stars, she decided, were worth cold feet.</p>
        </div>
      </div>
    </Section>
  );
};

// ============================================
// THE FOREST
// ============================================

const ForestSection: React.FC = () => {
  const [litFireflies, setLitFireflies] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const fireflies = [
    { x: 20, y: 30 },
    { x: 45, y: 50 },
    { x: 70, y: 25 },
    { x: 30, y: 70 },
    { x: 80, y: 60 },
    { x: 15, y: 55 },
    { x: 60, y: 40 },
  ];

  const handleFireflyTap = (index: number) => {
    if (!litFireflies.includes(index)) {
      setLitFireflies([...litFireflies, index]);
    }
  };

  return (
    <Section className="forest-section" id="forest">
      <div className="parallax-forest">
        {/* Tree silhouettes would be SVGs in production */}
        <div className="forest-layer forest-layer-1" />
        <div className="forest-layer forest-layer-2" />
        <div className="forest-layer forest-layer-3" />
      </div>

      <div className="fireflies-container">
        {fireflies.map((ff, i) => (
          <div
            key={i}
            className={`firefly tap-target ${litFireflies.includes(i) ? "lit" : ""}`}
            style={{ left: `${ff.x}%`, top: `${ff.y}%` }}
            onClick={() => handleFireflyTap(i)}
            onTouchStart={() => handleFireflyTap(i)}
          />
        ))}
      </div>

      <div className="forest-content">
        <div className="story-text">
          <p>The trail led past the garden gate, through the whispering woods where shadows told secrets to each other.</p>
          <p>Luna wasn&apos;t scared.</p>
          <p>Well, maybe a little scared.</p>
          <p>But the trail glowed so kindly, like it was saying:</p>
          <p className="star-whisper">This way. Don&apos;t worry. This way.</p>
          <p>She followed.</p>
        </div>
      </div>
    </Section>
  );
};

// ============================================
// FINDING THE STAR
// ============================================

const FindingSection: React.FC = () => {
  const [starCalm, setStarCalm] = useState(false);

  const handleStarTap = () => {
    setStarCalm(true);
  };

  return (
    <Section className="finding-section" id="finding">
      <div className="star-creature-container">
        <div className="story-text" style={{ textAlign: "center" }}>
          <p>And there, in a nest of fallen leaves, Luna found it.</p>
          <p>A tiny star.</p>
          <p>No bigger than her hand.</p>
          <p>It was shaking.</p>
        </div>

        <div
          className={`star-creature tap-target ${starCalm ? "calm" : "shivering"}`}
          onClick={handleStarTap}
          onTouchStart={handleStarTap}
        >
          <svg className="star-creature-svg" viewBox="0 0 100 100">
            <defs>
              <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--star-creature)" />
                <stop offset="70%" stopColor="var(--star-creature)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--star-creature)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="url(#starGlow)" />
            <circle cx="50" cy="50" r="25" fill="var(--star-creature)" />
            {/* Little eyes */}
            <circle cx="42" cy="45" r="3" fill="var(--night-sky)" />
            <circle cx="58" cy="45" r="3" fill="var(--night-sky)" />
            {/* Tiny smile when calm */}
            {starCalm && (
              <path d="M 42 55 Q 50 62 58 55" stroke="var(--night-sky)" strokeWidth="2" fill="none" />
            )}
          </svg>
        </div>

        <div className="story-text" style={{ textAlign: "center" }}>
          <p>&quot;Are you lost?&quot; she whispered.</p>
          <p>The star blinked once. Twice. <em>Yes.</em></p>
          <p>&quot;I know the way home,&quot; Luna said, though she didn&apos;t, not really. &quot;It&apos;s up.&quot;</p>
        </div>
      </div>
    </Section>
  );
};

// ============================================
// THE CLIMB
// ============================================

const ClimbSection: React.FC = () => {
  const [climbProgress, setClimbProgress] = useState(0);
  const [revealedFootholds, setRevealedFootholds] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const encouragements = ["Keep going", "You&apos;re brave", "Almost there"];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate progress through this section
      const scrolledIntoSection = viewportHeight - rect.top;
      const totalScrollableInSection = sectionHeight - viewportHeight;
      const progress = Math.max(0, Math.min(100, (scrolledIntoSection / totalScrollableInSection) * 100));
      
      setClimbProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFootholdTap = (index: number) => {
    if (!revealedFootholds.includes(index)) {
      setRevealedFootholds([...revealedFootholds, index]);
    }
  };

  return (
    <div ref={sectionRef} className="climb-section">
      <div className="climb-container">
        <div className="climb-progress">
          <div className="climb-progress-fill" style={{ height: `${climbProgress}%` }} />
        </div>

        <div className="climbers" style={{ transform: `translateY(${-climbProgress * 0.5}px)` }}>
          <svg viewBox="0 0 80 100" width="80" height="100">
            {/* Luna silhouette */}
            <ellipse cx="40" cy="85" rx="12" ry="10" fill="var(--moon-silver)" />
            <circle cx="40" cy="55" r="10" fill="var(--moon-silver)" />
            <path d="M 30 70 Q 40 65 50 70" stroke="var(--moon-silver)" strokeWidth="6" fill="none" />
            {/* Star on shoulder */}
            <circle cx="55" cy="50" r="8" fill="var(--star-creature)" />
          </svg>
        </div>

        <div className="footholds">
          {encouragements.map((text, i) => (
            <div
              key={i}
              className={`foothold tap-target ${revealedFootholds.includes(i) ? "revealed" : ""}`}
              onClick={() => handleFootholdTap(i)}
              onTouchStart={() => handleFootholdTap(i)}
              dangerouslySetInnerHTML={{ __html: revealedFootholds.includes(i) ? text : "" }}
            />
          ))}
        </div>

        <div className="story-text" style={{ textAlign: "center", marginTop: "2rem" }}>
          <p>The star was too tired to fly.</p>
          <p>So Luna carried it.</p>
          <p>Up the hill behind her house. Up the rocks that looked like sleeping giants.</p>
          <p>&quot;Almost there,&quot; she said, even when her legs got wobbly.</p>
          <p>The star glowed a little warmer against her cheek.</p>
        </div>
      </div>
    </div>
  );
};

// ============================================
// THE SUMMIT
// ============================================

const SummitSection: React.FC = () => {
  const [chimedStars, setChimedStars] = useState<number[]>([]);

  const chimeStars = [
    { x: 15, y: 20 },
    { x: 30, y: 15 },
    { x: 50, y: 10 },
    { x: 70, y: 18 },
    { x: 85, y: 25 },
    { x: 25, y: 35 },
    { x: 45, y: 30 },
    { x: 65, y: 28 },
    { x: 80, y: 40 },
    { x: 10, y: 45 },
  ];

  const handleChimeTap = (index: number) => {
    if (!chimedStars.includes(index)) {
      setChimedStars([...chimedStars, index]);
      // In a full implementation, this would play a chime sound
    }
  };

  return (
    <Section className="summit-section" id="summit">
      <div className="summit-stars">
        {chimeStars.map((star, i) => (
          <div
            key={i}
            className={`chime-star tap-target ${chimedStars.includes(i) ? "chimed" : ""}`}
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
            onClick={() => handleChimeTap(i)}
            onTouchStart={() => handleChimeTap(i)}
          />
        ))}
      </div>

      <div className="summit-content">
        <div className="story-text">
          <p>At the top of the world, Luna stopped.</p>
          <p>The sky was so big.</p>
          <p>She was so small.</p>
          <p>But the star on her shoulder? It belonged up there.</p>
        </div>

        <div className="constellation-with-gap">
          <svg viewBox="0 0 200 200" width="200" height="200">
            <circle cx="40" cy="40" r="4" fill="var(--starlight)" />
            <circle cx="160" cy="50" r="4" fill="var(--starlight)" />
            <circle cx="60" cy="140" r="4" fill="var(--starlight)" />
            <circle cx="140" cy="160" r="4" fill="var(--starlight)" />
            {/* The gap */}
            <circle cx="100" cy="90" r="8" fill="none" stroke="var(--trail-gold)" strokeWidth="2" strokeDasharray="4 3" />
            {/* Lines connecting */}
            <line x1="40" y1="40" x2="100" y2="90" stroke="var(--starlight)" strokeOpacity="0.3" strokeWidth="1" />
            <line x1="160" y1="50" x2="100" y2="90" stroke="var(--starlight)" strokeOpacity="0.3" strokeWidth="1" />
            <line x1="60" y1="140" x2="100" y2="90" stroke="var(--starlight)" strokeOpacity="0.3" strokeWidth="1" />
            <line x1="140" y1="160" x2="100" y2="90" stroke="var(--starlight)" strokeOpacity="0.3" strokeWidth="1" />
          </svg>
        </div>

        <div className="story-text">
          <p>&quot;I can see where you go,&quot; Luna said, pointing at the gap. &quot;Right there. That&apos;s your spot.&quot;</p>
        </div>
      </div>
    </Section>
  );
};

// ============================================
// LETTING GO
// ============================================

const GoodbyeSection: React.FC = () => {
  const [starRising, setStarRising] = useState(false);
  const [finalTap, setFinalTap] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          setTimeout(() => setStarRising(true), 1000);
        }
      },
      { threshold: 0.6 }
    );

    const section = document.getElementById("goodbye");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleFinalTap = () => {
    setFinalTap(true);
  };

  return (
    <Section className="goodbye-section" id="goodbye">
      <div className="goodbye-vignette" />

      <div className="goodbye-container">
        <div className="story-text">
          <p>The star hovered for a moment.</p>
          <p>It didn&apos;t want to leave either.</p>
          <p>&quot;It&apos;s okay,&quot; Luna said, even though her eyes felt prickly. &quot;You have to go home. Everyone has to go home.&quot;</p>
          <p>She reached up one last time.</p>
        </div>

        <div
          className={`rising-star tap-target ${starRising ? "rising" : ""} ${finalTap ? "tapped" : ""}`}
          onClick={handleFinalTap}
          onTouchStart={handleFinalTap}
        >
          <svg className="rising-star-svg" viewBox="0 0 100 100">
            <defs>
              <radialGradient id="risingGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--star-creature)" />
                <stop offset="60%" stopColor="var(--star-creature)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="var(--trail-gold)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="url(#risingGlow)" />
            <circle cx="50" cy="50" r="20" fill="var(--star-creature)" />
          </svg>
        </div>

        <div className="story-text">
          <p>The star touched her fingertip.</p>
          <p>Then it rose.</p>
          <p className="star-whisper">Up. Up. Up.</p>
        </div>
      </div>
    </Section>
  );
};

// ============================================
// THE BRIGHTEST STAR (FINALE)
// ============================================

const FinaleSection: React.FC = () => {
  const [dancing, setDancing] = useState(false);

  const finaleStars = generateStars(30, 99);

  const handleSkyTap = () => {
    setDancing(true);
    setTimeout(() => setDancing(false), 3000);
  };

  return (
    <Section className="finale-section" id="finale">
      <div
        className={`finale-sky ${dancing ? "finale-dancing" : ""}`}
        onClick={handleSkyTap}
        onTouchStart={handleSkyTap}
      >
        {finaleStars.map((star, i) => (
          <div
            key={i}
            className={`finale-star ${i === 0 ? "brightest-star" : ""}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              "--dance-delay": `${star.delay * 0.1}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="finale-content">
        <div className="story-text">
          <p>Luna watched until the star found its place.</p>
          <p>And you know what?</p>
          <p>It glowed <em>brighter</em> than before.</p>
          <p>Brighter than any star in the whole sky.</p>
          <p>Maybe because it had been loved.</p>
          <p>Maybe because it remembered.</p>
        </div>

        <p className="tap-anywhere">Tap the sky to celebrate</p>

        <div className="story-text" style={{ marginTop: "3rem" }}>
          <p>Luna smiled all the way home.</p>
          <p>And every night after that, when she counted the stars —</p>
          <p className="star-whisper">One, two, three, four, five...</p>
          <p>— she always counted that one twice.</p>
        </div>

        <p className="story-ending" style={{ marginTop: "4rem" }}>THE END</p>
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
      <h3 className="credits-title">✦</h3>
      <p className="credits-text">
        &quot;The Night the Stars Fell&quot; is an original story created for{" "}
        <a href="https://esy.com">Esy</a>, designed as an interactive bedtime experience
        for children and families.
      </p>
      <p className="credits-text" style={{ marginTop: "1rem" }}>
        Written with love for dreamers everywhere.
      </p>
    </div>
  </section>
);

// ============================================
// MAIN COMPONENT
// ============================================

const StarsStoryClient: React.FC = () => {
  return (
    <div className="stars-story">
      <HeroSection />
      <MissingStarSection />
      <TrailSection />
      <ForestSection />
      <FindingSection />
      <ClimbSection />
      <SummitSection />
      <GoodbyeSection />
      <FinaleSection />
      <CreditsSection />
    </div>
  );
};

export default StarsStoryClient;






