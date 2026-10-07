"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import "./how-to-write-an-essay.css";

/**
 * HOW TO WRITE AN ESSAY
 * =====================
 * 
 * An instructional scrollytelling experience that teaches essay writing
 * through visual, entertaining, and interactive methods.
 * 
 * UNIQUE MECHANICS (Anti-Pattern Applied):
 * ✅ Typewriter hero with cursor that fills page
 * ✅ Sticky note brainstorm animation
 * ✅ Expandable outline tree
 * ✅ Paragraph anatomy visualization
 * ✅ Red-pen revision mode toggle
 * ✅ Word count ticker (fixed)
 * ✅ Grade progress indicator (D → A)
 * ✅ Before/after transition comparisons
 * 
 * DESIGN RESEARCH:
 * - Paper cream backgrounds (manuscript feel)
 * - Ink black, revision red, highlight yellow
 * - Playfair Display + Georgia + IBM Plex Mono
 * - Calm, focused, educational animations
 */

// Essay text that types out in the hero
const ESSAY_TEXT = `The art of essay writing is not merely about putting words on paper—it's about crafting an argument, telling a story, and connecting with your reader.

Whether you're writing for school, work, or personal expression, the principles remain the same: clarity, structure, and purpose.

Let's learn how to write an essay that makes an impact.`;

// Intersection Observer hook
const useIntersectionObserver = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.2 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// Scroll progress hook for global progress (word count, grade)
const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = Math.min((window.scrollY / scrollHeight) * 100, 100);
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
};

// Scroll-lock hook for pinned animation sections
// Uses RAF throttling for 60fps performance
interface ScrollLockState {
  containerRef: React.RefObject<HTMLDivElement | null>;
  progress: number;
  isPinned: boolean;
  isComplete?: boolean;
}

interface ScrollLockStateExtended extends ScrollLockState {
  isComplete: boolean;
}

const useScrollLock = (sectionHeight: number = 3): ScrollLockStateExtended => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const updateScrollState = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionTotalHeight = rect.height;

      const scrollableDistance = sectionTotalHeight - windowHeight;
      const scrolledIntoSection = -sectionTop;

      if (sectionTop <= 0 && scrolledIntoSection <= scrollableDistance) {
        // Currently in the scroll-lock zone
        setIsPinned(true);
        setIsComplete(false);
        const newProgress = Math.min(
          Math.max(scrolledIntoSection / scrollableDistance, 0),
          1
        );
        setProgress(newProgress);
      } else if (sectionTop > 0) {
        // Above the section (haven't reached it yet)
        setIsPinned(false);
        setIsComplete(false);
        setProgress(0);
      } else {
        // Below the section (scrolled past it)
        setIsPinned(false);
        setIsComplete(true);
        setProgress(1);
      }
      
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScrollState);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollState();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionHeight]);

  return { containerRef, progress, isPinned, isComplete };
};

// Word Count Ticker Component
const WordCountTicker: React.FC<{ progress: number; visible: boolean }> = ({ progress, visible }) => {
  // Simulate word count growing with progress
  const baseWords = 250;
  const finalWords = 1200;
  const currentWords = Math.floor(baseWords + (progress / 100) * (finalWords - baseWords));

  return (
    <div className={`word-count-ticker ${visible ? "visible" : ""}`}>
      <span className="word-count-number">{currentWords.toLocaleString()}</span>
      <span className="word-count-label">Words</span>
    </div>
  );
};

// Grade Indicator Component
const GradeIndicator: React.FC<{ progress: number; visible: boolean }> = ({ progress, visible }) => {
  const getGrade = () => {
    if (progress < 25) return { letter: "D", class: "grade-d" };
    if (progress < 50) return { letter: "C", class: "grade-c" };
    if (progress < 75) return { letter: "B", class: "grade-b" };
    return { letter: "A", class: "grade-a" };
  };

  const grade = getGrade();

  return (
    <div className={`grade-indicator ${visible ? "visible" : ""}`}>
      <span className={`grade-letter ${grade.class}`}>{grade.letter}</span>
      <span className="grade-label">Current</span>
    </div>
  );
};

// Typewriter Hero Component with Scroll-Lock
const TypewriterHero: React.FC = () => {
  const { containerRef, progress, isPinned, isComplete } = useScrollLock(2.5);
  
  // Typewriter types during first 70% of scroll-lock progress
  // Remaining 30% shows the title and allows reader to absorb
  const typingProgress = Math.min(progress / 0.7, 1);
  const charsToShow = Math.floor(typingProgress * ESSAY_TEXT.length);
  const displayText = ESSAY_TEXT.slice(0, charsToShow);
  
  // Show title after typing completes (progress > 70%)
  const showTitle = progress > 0.7;
  // Hide scroll hint after user starts scrolling
  const showScrollHint = progress < 0.05;

  // Determine pinned state class
  const getPinnedClass = () => {
    if (isPinned) return "is-pinned";
    if (isComplete) return "is-complete";
    return "";
  };

  return (
    <section 
      ref={containerRef}
      className="hero-scroll-lock-container"
      style={{ height: "250vh" }}
    >
      <div className={`hero-pinned ${getPinnedClass()}`}>
        <div className="typewriter-paper">
          <div className="typewriter-header">
            <span>Essay Draft</span>
            <span>Page 1</span>
          </div>
          <div className="typewriter-content">
            <p className="typewriter-text">
              {displayText}
              <span className="typewriter-cursor" />
            </p>
          </div>
        </div>
        
        <div 
          className="hero-title"
          style={{ 
            opacity: showTitle ? 1 : 0,
            transform: showTitle ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease"
          }}
        >
          <h1>How to Write an Essay</h1>
          <p className="hero-subtitle">A step-by-step visual guide</p>
        </div>

        <div 
          className="scroll-hint"
          style={{ 
            opacity: showScrollHint ? 1 : 0,
            transition: "opacity 0.4s ease"
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          <span>Scroll to begin</span>
        </div>
      </div>
    </section>
  );
};

// Step 1: Understand the Prompt
const PromptSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>} 
      className={`step-section prompt-section ${isVisible ? "visible" : ""}`}
    >
      <div className="step-header">
        <div className="step-number">Step 1</div>
        <h2 className="step-title">Understand Your Prompt</h2>
      </div>

      <div className="step-content">
        <div className="prompt-container">
          <div className="prompt-original">
            <div className="prompt-label">The Prompt</div>
            <p className="prompt-text">
              &ldquo;Analyze the impact of social media on modern communication, 
              considering both positive and negative effects. Support your 
              argument with specific examples.&rdquo;
            </p>
          </div>

          <div className="prompt-annotated">
            <div className="prompt-label">Break It Down</div>
            <p className="prompt-text">
              &ldquo;<span className="annotation">
                <span className="annotation-text">Analyze</span>
                <span className="annotation-note">🔍 Action verb = examine deeply</span>
              </span> the impact of{" "}
              <span className="annotation">
                <span className="annotation-text">social media</span>
                <span className="annotation-note">📱 Your topic focus</span>
              </span> on modern communication, considering{" "}
              <span className="annotation">
                <span className="annotation-text">both positive and negative effects</span>
                <span className="annotation-note">⚖️ Must be balanced</span>
              </span>. Support your argument with{" "}
              <span className="annotation">
                <span className="annotation-text">specific examples</span>
                <span className="annotation-note">📊 Evidence required!</span>
              </span>.&rdquo;
            </p>
          </div>
        </div>

        <div className="prompt-tips">
          <h4>💡 Pro Tips</h4>
          <ul>
            <li>Circle or highlight action verbs (analyze, compare, argue, explain)</li>
            <li>Identify the main subject and any scope limitations</li>
            <li>Note requirements: word count, sources needed, formatting</li>
            <li>Ask yourself: &ldquo;What is this question really asking?&rdquo;</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

// Step 2: Brainstorm with Sticky Notes
const BrainstormSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver();

  const stickyNotes = [
    { title: "Pro", content: "Instant global communication" },
    { title: "Con", content: "Shorter attention spans" },
    { title: "Example", content: "Twitter breaking news" },
    { title: "Pro", content: "New forms of community" },
    { title: "Con", content: "Misinformation spreads fast" },
    { title: "Quote", content: "'The medium is the message' - McLuhan" },
  ];

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={`step-section brainstorm-section ${isVisible ? "visible" : ""}`}
    >
      <div className="step-header">
        <div className="step-number">Step 2</div>
        <h2 className="step-title">Brainstorm Ideas</h2>
      </div>

      <div className="step-content">
        <div className="sticky-notes-container">
          {stickyNotes.map((note, index) => (
            <div 
              key={index} 
              className={`sticky-note ${isVisible ? "visible" : ""}`}
            >
              <div className="sticky-note-title">{note.title}</div>
              {note.content}
            </div>
          ))}
        </div>

        <div className="brainstorm-tip">
          <p>
            <strong>No idea is too small.</strong> Write everything down first, 
            then organize later. The best essays often come from unexpected connections.
          </p>
        </div>
      </div>
    </section>
  );
};

// Step 3: Create an Outline
const OutlineSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver();

  const outlineItems = [
    {
      numeral: "I.",
      main: "Introduction",
      subs: [
        "A. Hook: Surprising statistic about daily social media usage",
        "B. Context: Brief history of social platforms",
        "C. Thesis: Social media has fundamentally transformed communication, creating both unprecedented opportunities and significant challenges",
      ],
    },
    {
      numeral: "II.",
      main: "Positive Effects",
      subs: [
        "A. Global connectivity and breaking barriers",
        "B. New forms of community and support",
        "C. Democratization of information sharing",
      ],
    },
    {
      numeral: "III.",
      main: "Negative Effects",
      subs: [
        "A. Reduced attention spans and deep thinking",
        "B. Spread of misinformation",
        "C. Mental health concerns",
      ],
    },
    {
      numeral: "IV.",
      main: "Conclusion",
      subs: [
        "A. Synthesize main points",
        "B. Restate thesis in new words",
        "C. Call to action or future outlook",
      ],
    },
  ];

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={`step-section outline-section ${isVisible ? "visible" : ""}`}
    >
      <div className="step-header">
        <div className="step-number">Step 3</div>
        <h2 className="step-title">Create Your Outline</h2>
      </div>

      <div className="step-content">
        <div className="outline-tree">
          {outlineItems.map((item, index) => (
            <div 
              key={index}
              className={`outline-item ${isVisible ? "visible" : ""}`}
            >
              <div className="outline-roman">
                <span className="outline-numeral">{item.numeral}</span>
                <div className="outline-text">
                  <div className="outline-main">{item.main}</div>
                  <div className="outline-sub">
                    {item.subs.map((sub, subIndex) => (
                      <div key={subIndex} className="outline-sub-item">
                        <span className="outline-letter">{String.fromCharCode(65 + subIndex)}.</span>
                        {sub.replace(/^[A-Z]\.\s/, "")}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Step 4: Write the Introduction
const IntroSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver();

  const hooks = [
    {
      type: "The Startling Statistic",
      example: "The average person spends 2 hours and 27 minutes on social media every day—that's over 37 days per year.",
      why: "Numbers create immediate impact and curiosity",
    },
    {
      type: "The Question",
      example: "What if the way we communicate is fundamentally rewiring our brains?",
      why: "Questions engage readers' minds and create intrigue",
    },
    {
      type: "The Quote",
      example: '"In the future, everyone will be world-famous for 15 minutes." Andy Warhol couldn\'t have predicted how right he was.',
      why: "Authority lending + familiar reference = instant credibility",
    },
    {
      type: "The Scene",
      example: "A grandmother in rural Iowa video-calls her grandchildren in Tokyo. A teenager in Lagos debates climate policy with peers in Berlin...",
      why: "Vivid imagery makes abstract concepts concrete",
    },
  ];

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={`step-section intro-section ${isVisible ? "visible" : ""}`}
    >
      <div className="step-header">
        <div className="step-number">Step 4</div>
        <h2 className="step-title">Hook Your Reader</h2>
      </div>

      <div className="step-content">
        <div className="hooks-grid">
          {hooks.map((hook, index) => (
            <div 
              key={index}
              className={`hook-card ${isVisible ? "visible" : ""}`}
            >
              <div className="hook-type">{hook.type}</div>
              <div className="hook-example">&ldquo;{hook.example}&rdquo;</div>
              <div className="hook-why">✓ {hook.why}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Step 5: Body Paragraphs Anatomy
const BodySection: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={`step-section body-section ${isVisible ? "visible" : ""}`}
    >
      <div className="step-header">
        <div className="step-number">Step 5</div>
        <h2 className="step-title">Build Strong Body Paragraphs</h2>
      </div>

      <div className="step-content">
        <div className="paragraph-anatomy">
          <div className={`anatomy-layer anatomy-topic ${isVisible ? "visible" : ""}`}>
            <span className="anatomy-label">Topic Sentence</span>
            <p className="anatomy-text">
              Social media has revolutionized how quickly information travels around the globe.
            </p>
          </div>

          <div className={`anatomy-layer anatomy-evidence ${isVisible ? "visible" : ""}`}>
            <span className="anatomy-label">Evidence / Example</span>
            <p className="anatomy-text">
              During the Arab Spring of 2011, platforms like Twitter and Facebook enabled protesters 
              to organize demonstrations that traditional media couldn&apos;t cover fast enough. 
              Researchers found that tweets were being shared 3,000 times per minute at the movement&apos;s peak.
            </p>
          </div>

          <div className={`anatomy-layer anatomy-analysis ${isVisible ? "visible" : ""}`}>
            <span className="anatomy-label">Analysis / Explanation</span>
            <p className="anatomy-text">
              This demonstrates that social media has become more than just a communication tool—it&apos;s 
              now a catalyst for social change, allowing ordinary citizens to bypass traditional 
              gatekeepers and shape global narratives in real time.
            </p>
          </div>

          <div className={`anatomy-layer anatomy-transition ${isVisible ? "visible" : ""}`}>
            <span className="anatomy-label">Transition</span>
            <p className="anatomy-text">
              However, this same speed that enables positive movements also presents significant challenges...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Step 6: Transitions
const TransitionsSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver();

  const transitionWords = [
    "However", "Furthermore", "In contrast", "Similarly",
    "Moreover", "Nevertheless", "Consequently", "Therefore"
  ];

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={`step-section transitions-section ${isVisible ? "visible" : ""}`}
    >
      <div className="step-header">
        <div className="step-number">Step 6</div>
        <h2 className="step-title">Connect Your Ideas</h2>
      </div>

      <div className="step-content">
        <div className="transition-comparison">
          <div className={`transition-panel before ${isVisible ? "visible" : ""}`}>
            <div className="panel-label">❌ Without Transitions</div>
            <p className="panel-text">
              Social media helps people stay connected. <del>Social media</del> can spread 
              misinformation rapidly. Users should verify information before sharing.
            </p>
          </div>

          <div className={`transition-arrow ${isVisible ? "visible" : ""}`}>→</div>

          <div className={`transition-panel after ${isVisible ? "visible" : ""}`}>
            <div className="panel-label">✓ With Transitions</div>
            <p className="panel-text">
              Social media helps people stay connected. <ins>However,</ins> it can also spread 
              misinformation rapidly. <ins>Therefore,</ins> users should verify information before sharing.
            </p>
          </div>
        </div>

        <div className="transition-examples">
          <h4>Powerful Transition Words</h4>
          <div className="transition-chips">
            {transitionWords.map((word, index) => (
              <span key={index} className="transition-chip">{word}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Step 7: Conclusion
const ConclusionSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={`step-section conclusion-section ${isVisible ? "visible" : ""}`}
    >
      <div className="step-header">
        <div className="step-number">Step 7</div>
        <h2 className="step-title">End with Impact</h2>
      </div>

      <div className="step-content conclusion-content">
        <div className="conclusion-strategy">
          <div className={`strategy-card ${isVisible ? "visible" : ""}`}>
            <div className="strategy-icon">🔄</div>
            <h4>Echo Your Hook</h4>
            <p>Return to your opening image or question with new insight</p>
          </div>
          <div className={`strategy-card ${isVisible ? "visible" : ""}`}>
            <div className="strategy-icon">🔮</div>
            <h4>Look Forward</h4>
            <p>Suggest implications, predictions, or calls to action</p>
          </div>
          <div className={`strategy-card ${isVisible ? "visible" : ""}`}>
            <div className="strategy-icon">💡</div>
            <h4>Synthesize</h4>
            <p>Don&apos;t just summarize—show how your points connect</p>
          </div>
        </div>

        <div className="echo-demo">
          <div className="echo-intro">
            <span className="echo-label">Introduction Hook</span>
            &ldquo;The average person spends <span className="echo-highlight">2 hours and 27 minutes</span> on 
            social media every day...&rdquo;
          </div>
          <div className="echo-connector">
            <div className="connector-line" />
            ↓
            <div className="connector-line" />
          </div>
          <div className="echo-conclusion">
            <span className="echo-label">Conclusion Echo</span>
            &ldquo;Those <span className="echo-highlight">2 hours and 27 minutes</span> represent more than screen 
            time—they are moments of connection, debate, and discovery. How we choose to spend them will 
            define the future of human communication.&rdquo;
          </div>
        </div>
      </div>
    </section>
  );
};

// Step 8: Revision
const RevisionSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver();
  const [cleanMode, setCleanMode] = useState(false);

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={`step-section revision-section ${isVisible ? "visible" : ""}`}
    >
      <div className="step-header">
        <div className="step-number">Step 8</div>
        <h2 className="step-title">Revise & Edit</h2>
      </div>

      <div className="step-content">
        <div className="revision-toggle">
          <button 
            className={`toggle-btn ${!cleanMode ? "active" : ""}`}
            onClick={() => setCleanMode(false)}
          >
            Show Edits
          </button>
          <button 
            className={`toggle-btn ${cleanMode ? "active" : ""}`}
            onClick={() => setCleanMode(true)}
          >
            Clean Version
          </button>
        </div>

        <div className={`revision-paper ${cleanMode ? "clean-mode" : ""}`}>
          <div className="revision-text">
            <p>
              Social media <span className="rev-delete">is really </span>
              <span className="rev-insert">has fundamentally </span>
              changed the way <span className="rev-delete">that </span>we communicate.{" "}
              <span className="rev-comment">Remove filler words</span>
              {" "}
              <span className="rev-delete">I think that </span>
              <span className="rev-insert">Research suggests </span>
              this shift has <span className="rev-delete">both good and bad </span>
              <span className="rev-insert">profound </span>implications.{" "}
              <span className="rev-comment">Replace opinion with evidence</span>
            </p>
            <p>
              <span className="rev-delete">There are many </span>
              <span className="rev-insert">Several key </span>
              factors contribute to <span className="rev-delete">this thing</span>
              <span className="rev-insert">this phenomenon</span>.{" "}
              <span className="rev-comment">Be specific!</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Checklist items defined outside component to avoid recreating
const CHECKLIST_ITEMS = [
  { title: "Grammar & Spelling", description: "Run spell-check, then read aloud to catch what it misses" },
  { title: "Punctuation", description: "Check comma usage, apostrophes, and quotation marks" },
  { title: "Citations", description: "Verify all sources are properly cited in your required format" },
  { title: "Formatting", description: "Headers, margins, font size, page numbers—follow the guidelines" },
  { title: "Final Read", description: "Print it out or change the font to see it with fresh eyes" },
];

// Step 9: Proofread with Scroll-Lock (Assembly Pattern)
// User scrolls to check off each item - feels like completing the checklist
const ProofreadSection: React.FC = () => {
  const { containerRef, progress, isPinned, isComplete } = useScrollLock(2);
  
  // Calculate how many items should be checked based on scroll progress
  // Each item gets ~18% of scroll progress (5 items, leaving 10% buffer at end)
  const checkedCount = Math.min(
    Math.floor(progress / 0.18),
    CHECKLIST_ITEMS.length
  );
  
  // Items are "visible" once we've started scrolling into the section
  const isVisible = progress > 0;
  
  // Show completion message when all items checked
  const allChecked = checkedCount >= CHECKLIST_ITEMS.length;

  // Determine pinned state class
  const getPinnedClass = () => {
    if (isPinned) return "is-pinned";
    if (isComplete) return "is-complete";
    return "";
  };

  return (
    <section 
      ref={containerRef}
      className="proofread-scroll-lock-container"
      style={{ height: "200vh" }}
    >
      <div className={`proofread-pinned ${getPinnedClass()}`}>
        <div className="step-header">
          <div className="step-number">Step 9</div>
          <h2 className="step-title">Proofread Checklist</h2>
        </div>

        <div className="step-content">
          <div className="proofread-checklist">
            {CHECKLIST_ITEMS.map((item, index) => {
              const isChecked = index < checkedCount;
              // Stagger the reveal animation slightly
              const itemVisible = progress > (index * 0.05);
              
              return (
                <div 
                  key={index}
                  className={`checklist-item ${itemVisible ? "visible" : ""} ${isChecked ? "checked" : ""}`}
                  style={{
                    transitionDelay: `${index * 0.05}s`
                  }}
                >
                  <div className="checklist-icon">
                    {isChecked ? "✓" : ""}
                  </div>
                  <div className="checklist-content">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Completion indicator */}
          <div 
            className="checklist-complete"
            style={{
              opacity: allChecked ? 1 : 0,
              transform: allChecked ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.4s ease, transform 0.4s ease"
            }}
          >
            <span className="complete-icon">✨</span>
            <span className="complete-text">Ready to submit!</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Final Section
const FinalSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={`step-section final-section ${isVisible ? "visible" : ""}`}
    >
      <div className="final-content">
        <div className="final-grade">
          <span className="final-grade-letter">A</span>
          <span className="final-grade-plus">+</span>
        </div>

        <h2 className="final-title">Essay Complete!</h2>
        <p className="final-subtitle">You&apos;ve mastered the essentials of essay writing</p>

        <div className="final-stats">
          <div className="final-stat">
            <div className="final-stat-value">9</div>
            <div className="final-stat-label">Steps Learned</div>
          </div>
          <div className="final-stat">
            <div className="final-stat-value">4</div>
            <div className="final-stat-label">Hook Types</div>
          </div>
          <div className="final-stat">
            <div className="final-stat-value">∞</div>
            <div className="final-stat-label">Essays Ahead</div>
          </div>
        </div>

        <div className="final-tips">
          <h4>Remember:</h4>
          <ul>
            <li>Great writing is rewriting—don&apos;t expect perfection on the first draft</li>
            <li>Every essay is a conversation with your reader</li>
            <li>The more you write, the easier it becomes</li>
            <li>Your unique perspective is what makes your essay yours</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

// Sources Section
const SourcesSection: React.FC = () => {
  const sources = [
    { title: "The Elements of Style — William Strunk Jr. & E.B. White", url: "https://www.bartleby.com/141/" },
    { title: "Purdue OWL: Essay Writing", url: "https://owl.purdue.edu/owl/general_writing/the_writing_process/index.html" },
    { title: "Harvard Writing Center: Essay Structure", url: "https://writingcenter.fas.harvard.edu/pages/essay-structure" },
    { title: "The Craft of Writing Effectively — Larry McEnerney (UChicago)", url: "https://www.youtube.com/watch?v=vtIzMaLkCaM" },
    { title: "MLA Handbook (9th Edition)", url: "https://style.mla.org/" },
    { title: "On Writing Well — William Zinsser", url: "https://www.harpercollins.com/products/on-writing-well-william-zinsser" },
  ];

  return (
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
          This guide synthesizes best practices from writing centers at Harvard, Purdue, 
          and the University of Chicago, along with classic style guides.
        </p>
      </div>
    </section>
  );
};

// Main Component
const EssayWritingClient: React.FC = () => {
  const progress = useScrollProgress();
  const [showIndicators, setShowIndicators] = useState(false);

  useEffect(() => {
    // Show indicators after scrolling past hero
    if (progress > 10) {
      setShowIndicators(true);
    }
  }, [progress]);

  return (
    <div className="essay-story">
      {/* Fixed UI Elements */}
      <WordCountTicker progress={progress} visible={showIndicators} />
      <GradeIndicator progress={progress} visible={showIndicators} />

      {/* Content Sections */}
      <TypewriterHero />
      <PromptSection />
      <BrainstormSection />
      <OutlineSection />
      <IntroSection />
      <BodySection />
      <TransitionsSection />
      <ConclusionSection />
      <RevisionSection />
      <ProofreadSection />
      <FinalSection />
      <SourcesSection />
    </div>
  );
};

export default EssayWritingClient;

