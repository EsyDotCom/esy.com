"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import "./alphabet-train.css";

// ============================================================================
// ALPHABET DATA - All 26 letters with their objects/animals
// ============================================================================

interface LetterData {
  letter: string;
  word: string;
  phonics: string; // How to say the sound
  emoji: string; // Fallback visual representation
  color: string; // Cart color
}

const alphabetData: LetterData[] = [
  { letter: "A", word: "Apple", phonics: "ah", emoji: "🍎", color: "#FF6B6B" },
  { letter: "B", word: "Bear", phonics: "buh", emoji: "🐻", color: "#4ECDC4" },
  { letter: "C", word: "Cat", phonics: "kuh", emoji: "🐱", color: "#FFE66D" },
  { letter: "D", word: "Dog", phonics: "duh", emoji: "🐕", color: "#95E1D3" },
  { letter: "E", word: "Elephant", phonics: "eh", emoji: "🐘", color: "#DDA0DD" },
  { letter: "F", word: "Fish", phonics: "fff", emoji: "🐟", color: "#87CEEB" },
  { letter: "G", word: "Grapes", phonics: "guh", emoji: "🍇", color: "#9B59B6" },
  { letter: "H", word: "Horse", phonics: "huh", emoji: "🐴", color: "#F39C12" },
  { letter: "I", word: "Igloo", phonics: "ih", emoji: "🏠", color: "#A8E6CF" },
  { letter: "J", word: "Jellyfish", phonics: "juh", emoji: "🪼", color: "#FFB6C1" },
  { letter: "K", word: "Kite", phonics: "kuh", emoji: "🪁", color: "#FF69B4" },
  { letter: "L", word: "Lion", phonics: "lll", emoji: "🦁", color: "#FFA500" },
  { letter: "M", word: "Monkey", phonics: "mmm", emoji: "🐵", color: "#CD853F" },
  { letter: "N", word: "Nest", phonics: "nnn", emoji: "🪺", color: "#8B4513" },
  { letter: "O", word: "Owl", phonics: "ah", emoji: "🦉", color: "#6B5B95" },
  { letter: "P", word: "Pig", phonics: "puh", emoji: "🐷", color: "#FFB7C5" },
  { letter: "Q", word: "Queen", phonics: "kwuh", emoji: "👑", color: "#DAA520" },
  { letter: "R", word: "Rabbit", phonics: "rrr", emoji: "🐰", color: "#F5F5DC" },
  { letter: "S", word: "Sun", phonics: "sss", emoji: "☀️", color: "#FFD700" },
  { letter: "T", word: "Tiger", phonics: "tuh", emoji: "🐯", color: "#FF8C00" },
  { letter: "U", word: "Umbrella", phonics: "uh", emoji: "☂️", color: "#E74C3C" },
  { letter: "V", word: "Violin", phonics: "vvv", emoji: "🎻", color: "#8B0000" },
  { letter: "W", word: "Whale", phonics: "wuh", emoji: "🐋", color: "#1E90FF" },
  { letter: "X", word: "Xylophone", phonics: "ks", emoji: "🎹", color: "#FF1493" },
  { letter: "Y", word: "Yo-yo", phonics: "yuh", emoji: "🪀", color: "#32CD32" },
  { letter: "Z", word: "Zebra", phonics: "zzz", emoji: "🦓", color: "#2C3E50" },
];

// ============================================================================
// SCROLL SECTION HOOK
// ============================================================================

function useScrollSection(threshold = 0.4) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!hasAnimated) {
            setHasAnimated(true);
          }
        }
      },
      {
        threshold,
        rootMargin: "-5% 0px -20% 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, hasAnimated]);

  return { sectionRef, isVisible, hasAnimated };
}

// ============================================================================
// SECTION WRAPPER COMPONENT
// ============================================================================

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

function Section({ children, className = "", id }: SectionProps) {
  const { sectionRef, isVisible, hasAnimated } = useScrollSection();

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`train-section ${className} ${isVisible ? "visible" : ""} ${hasAnimated ? "animated" : ""}`}
    >
      {children}
    </section>
  );
}

// ============================================================================
// SVG COMPONENTS
// ============================================================================

// Train Engine SVG
function TrainEngine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={`train-engine ${className}`}
      aria-label="Train engine"
    >
      {/* Main body */}
      <rect x="20" y="30" width="160" height="60" rx="15" fill="#E74C3C" />
      {/* Cabin */}
      <rect x="120" y="10" width="50" height="50" rx="10" fill="#C0392B" />
      {/* Window */}
      <rect x="130" y="18" width="30" height="25" rx="5" fill="#AED6F1" />
      {/* Smokestack */}
      <rect x="40" y="5" width="25" height="30" rx="5" fill="#2C3E50" />
      {/* Smoke puffs */}
      <circle cx="52" cy="-5" r="12" fill="#ECF0F1" className="smoke smoke-1" />
      <circle cx="45" cy="-20" r="10" fill="#ECF0F1" className="smoke smoke-2" />
      <circle cx="55" cy="-35" r="8" fill="#ECF0F1" className="smoke smoke-3" />
      {/* Wheels */}
      <circle cx="50" cy="100" r="18" fill="#2C3E50" />
      <circle cx="50" cy="100" r="8" fill="#7F8C8D" />
      <circle cx="100" cy="100" r="18" fill="#2C3E50" />
      <circle cx="100" cy="100" r="8" fill="#7F8C8D" />
      <circle cx="150" cy="100" r="18" fill="#2C3E50" />
      <circle cx="150" cy="100" r="8" fill="#7F8C8D" />
      {/* Cow catcher */}
      <polygon points="0,90 20,70 20,90" fill="#F39C12" />
      {/* Light */}
      <circle cx="10" cy="50" r="10" fill="#F1C40F" className="train-light" />
    </svg>
  );
}

// Train Cart SVG
interface TrainCartProps {
  letter: string;
  color: string;
  emoji: string;
  isVisible: boolean;
  onClick?: () => void;
}

function TrainCart({ letter, color, emoji, isVisible, onClick }: TrainCartProps) {
  return (
    <div
      className={`train-cart-container ${isVisible ? "cart-visible" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Tap to hear the sound of letter ${letter}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.();
        }
      }}
    >
      <svg viewBox="0 0 180 140" className="train-cart-svg">
        {/* Cart body */}
        <rect x="10" y="20" width="160" height="80" rx="15" fill={color} />
        {/* Cart inner panel */}
        <rect x="20" y="30" width="140" height="60" rx="10" fill="white" fillOpacity="0.9" />
        {/* Wheels */}
        <circle cx="45" cy="115" r="18" fill="#2C3E50" />
        <circle cx="45" cy="115" r="8" fill="#7F8C8D" />
        <circle cx="135" cy="115" r="18" fill="#2C3E50" />
        <circle cx="135" cy="115" r="8" fill="#7F8C8D" />
        {/* Connector hooks */}
        <rect x="0" y="50" width="15" height="20" rx="3" fill="#7F8C8D" />
        <rect x="165" y="50" width="15" height="20" rx="3" fill="#7F8C8D" />
      </svg>
      {/* Letter display (absolutely positioned over cart) */}
      <div className="cart-letter" style={{ color: color }}>
        {letter}
      </div>
      {/* Emoji/object display */}
      <div className="cart-emoji">{emoji}</div>
      {/* Tap indicator */}
      <div className="tap-indicator">
        <span className="tap-hand">👆</span>
        <span className="tap-text">Tap me!</span>
      </div>
    </div>
  );
}

// Cloud SVG for background
function Cloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 50" className={`cloud ${className}`}>
      <ellipse cx="30" cy="35" rx="25" ry="15" fill="white" />
      <ellipse cx="50" cy="25" rx="30" ry="20" fill="white" />
      <ellipse cx="75" cy="35" rx="20" ry="12" fill="white" />
    </svg>
  );
}

// Sun SVG
function Sun({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`sun ${className}`}>
      <circle cx="50" cy="50" r="25" fill="#FFD93D" />
      {/* Sun rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="50"
          y1="50"
          x2={50 + 40 * Math.cos((angle * Math.PI) / 180)}
          y2={50 + 40 * Math.sin((angle * Math.PI) / 180)}
          stroke="#FFD93D"
          strokeWidth="4"
          strokeLinecap="round"
          className="sun-ray"
        />
      ))}
      {/* Happy face */}
      <circle cx="42" cy="45" r="4" fill="#2C3E50" />
      <circle cx="58" cy="45" r="4" fill="#2C3E50" />
      <path d="M 38 58 Q 50 70 62 58" stroke="#2C3E50" strokeWidth="3" fill="none" />
    </svg>
  );
}

// Hills for parallax background
function Hills() {
  return (
    <div className="hills-container">
      <svg viewBox="0 0 1440 200" className="hills hills-back" preserveAspectRatio="none">
        <path
          d="M0,200 L0,120 Q180,60 360,100 Q540,140 720,80 Q900,20 1080,90 Q1260,160 1440,100 L1440,200 Z"
          fill="#90EE90"
        />
      </svg>
      <svg viewBox="0 0 1440 200" className="hills hills-front" preserveAspectRatio="none">
        <path
          d="M0,200 L0,150 Q240,80 480,130 Q720,180 960,110 Q1200,40 1440,120 L1440,200 Z"
          fill="#7CCD7C"
        />
      </svg>
    </div>
  );
}

// Train Track
function TrainTrack() {
  return (
    <div className="train-track">
      <div className="track-rail track-rail-top" />
      <div className="track-ties">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="track-tie" />
        ))}
      </div>
      <div className="track-rail track-rail-bottom" />
    </div>
  );
}

// Confetti for celebration
function Confetti() {
  const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3", "#DDA0DD", "#87CEEB", "#9B59B6", "#F39C12"];
  
  return (
    <div className="confetti-container">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

// Sparkle effect
function Sparkles({ active }: { active: boolean }) {
  if (!active) return null;
  
  return (
    <div className="sparkles-container">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// PROGRESS INDICATOR
// ============================================================================

interface ProgressIndicatorProps {
  currentLetter: number; // 0-25 for A-Z, -1 for intro, 26 for complete
  totalLetters: number;
}

function ProgressIndicator({ currentLetter, totalLetters }: ProgressIndicatorProps) {
  const progress = Math.max(0, Math.min(100, ((currentLetter + 1) / totalLetters) * 100));
  
  return (
    <div className="progress-indicator">
      <div className="progress-label">
        <span className="progress-letter">A</span>
        <div className="progress-bar-container">
          <div className="progress-bar-bg" />
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
          <div
            className="progress-train-icon"
            style={{ left: `${progress}%` }}
          >
            🚂
          </div>
        </div>
        <span className="progress-letter">Z</span>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function AlphabetTrainClient() {
  const [currentLetter, setCurrentLetter] = useState(-1);
  const [tappedLetter, setTappedLetter] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Track which letter section is most visible
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    alphabetData.forEach((item, index) => {
      const element = document.getElementById(`letter-${item.letter}`);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setCurrentLetter(index);
            }
          },
          { threshold: 0.5 }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    // Check for completion section
    const completionEl = document.getElementById("completion-section");
    if (completionEl) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentLetter(26);
            setShowCelebration(true);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(completionEl);
      observers.push(observer);
    }

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Handle letter tap (would trigger sound in production)
  const handleLetterTap = useCallback((letter: string, phonics: string, word: string) => {
    setTappedLetter(letter);
    
    // In production, this would trigger audio:
    // playSound(`${letter} says /${phonics}/! ${word} starts with ${letter}!`);
    
    // Visual feedback timeout
    setTimeout(() => setTappedLetter(null), 1500);
    
    // Log for development
    console.log(`🔊 ${letter} says /${phonics}/! ${word} starts with ${letter}!`);
  }, []);

  return (
    <main className="alphabet-train-story">
      {/* Sticky Progress Indicator */}
      <ProgressIndicator currentLetter={currentLetter} totalLetters={26} />

      {/* Background Elements */}
      <div className="story-background">
        <div className="sky" />
        <Sun className="background-sun" />
        <Cloud className="cloud-1" />
        <Cloud className="cloud-2" />
        <Cloud className="cloud-3" />
        <Hills />
      </div>

      {/* ================================================================== */}
      {/* OPENING SCENE */}
      {/* ================================================================== */}
      <Section className="hero-section opening-scene" id="opening">
        <div className="hero-content">
          <h1 className="story-title">
            <span className="title-the">The</span>
            <span className="title-main">Alphabet Adventure Train</span>
            <span className="title-choo">🚂 Choo Choo!</span>
          </h1>
          
          <div className="opening-train">
            <TrainEngine className="hero-engine" />
          </div>
          
          <p className="opening-text">
            All aboard! Let&apos;s learn our ABCs!
          </p>
          
          <div className="scroll-hint">
            <span className="scroll-arrow">↓</span>
            <span className="scroll-text">Scroll to start your adventure!</span>
          </div>
        </div>
        
        <TrainTrack />
      </Section>

      {/* ================================================================== */}
      {/* LETTER SECTIONS A-Z */}
      {/* ================================================================== */}
      {alphabetData.map((item, index) => (
        <Section
          key={item.letter}
          className={`letter-section letter-${item.letter.toLowerCase()}`}
          id={`letter-${item.letter}`}
        >
          <div className="letter-content">
            {/* Big Letter Display */}
            <div className="letter-hero">
              <span
                className="letter-big"
                style={{
                  color: item.color,
                  textShadow: `3px 3px 0 ${item.color}40`,
                }}
              >
                {item.letter}
              </span>
            </div>

            {/* Train Cart with Object */}
            <div className="cart-scene">
              <TrainCart
                letter={item.letter}
                color={item.color}
                emoji={item.emoji}
                isVisible={true}
                onClick={() => handleLetterTap(item.letter, item.phonics, item.word)}
              />
              <Sparkles active={tappedLetter === item.letter} />
            </div>

            {/* Phonics Text */}
            <div className="phonics-display">
              <p className="phonics-sentence">
                <span className="letter-highlight" style={{ color: item.color }}>
                  {item.letter}
                </span>{" "}
                says{" "}
                <span className="sound-highlight">/{item.phonics}/</span>!
              </p>
              <p className="word-sentence">
                <span className="word-highlight" style={{ color: item.color }}>
                  {item.word}
                </span>{" "}
                starts with{" "}
                <span className="letter-highlight" style={{ color: item.color }}>
                  {item.letter}
                </span>!
              </p>
            </div>

            {/* Object Display */}
            <div className="object-display">
              <span className="object-emoji">{item.emoji}</span>
              <span className="object-label">{item.word}</span>
            </div>

            {/* Tap CTA */}
            <button
              className="sound-button"
              onClick={() => handleLetterTap(item.letter, item.phonics, item.word)}
              style={{ backgroundColor: item.color }}
            >
              <span className="button-icon">🔊</span>
              <span className="button-text">Tap to hear the sound!</span>
            </button>

            {/* Letter counter */}
            <div className="letter-counter">
              {index + 1} of 26
            </div>
          </div>
          
          <TrainTrack />
        </Section>
      ))}

      {/* ================================================================== */}
      {/* COMPLETION CELEBRATION */}
      {/* ================================================================== */}
      <Section className="completion-section" id="completion-section">
        {showCelebration && <Confetti />}
        
        <div className="completion-content">
          <h2 className="completion-title">
            🎉 You Did It! 🎉
          </h2>
          
          <p className="completion-subtitle">
            You built the whole Alphabet Train!
          </p>

          {/* Full train display */}
          <div className="full-train-display">
            <div className="full-train-scroll">
              <TrainEngine className="mini-engine" />
              {alphabetData.map((item) => (
                <div
                  key={item.letter}
                  className="mini-cart"
                  style={{ backgroundColor: item.color }}
                >
                  <span className="mini-letter">{item.letter}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Celebration message */}
          <div className="celebration-message">
            <p className="great-job">Great job, superstar! ⭐</p>
            <p className="now-you-know">
              Now you know all 26 letters of the alphabet!
            </p>
          </div>

          {/* Alphabet song reminder */}
          <div className="alphabet-song">
            <p className="song-intro">Can you sing the alphabet song?</p>
            <p className="song-letters">
              A B C D E F G, H I J K L M N O P,
              <br />
              Q R S T U V, W X Y and Z!
            </p>
            <p className="song-outro">
              Now I know my ABCs, next time won&apos;t you sing with me! 🎵
            </p>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* PARENT TIPS SECTION */}
      {/* ================================================================== */}
      <Section className="parent-section" id="parent-tips">
        <div className="parent-content">
          <h3 className="parent-title">📚 Tips for Parents & Caregivers</h3>
          
          <div className="tips-grid">
            <div className="tip-card">
              <span className="tip-icon">🔁</span>
              <h4>Repetition is Key</h4>
              <p>
                Read through the alphabet train multiple times. 
                Children learn through repetition!
              </p>
            </div>
            
            <div className="tip-card">
              <span className="tip-icon">🎵</span>
              <h4>Sing Along</h4>
              <p>
                Pair this with the classic ABC song to reinforce 
                letter order and sounds.
              </p>
            </div>
            
            <div className="tip-card">
              <span className="tip-icon">🔍</span>
              <h4>Letter Hunt</h4>
              <p>
                After reading, find letters around your home. 
                &ldquo;Can you find something that starts with B?&rdquo;
              </p>
            </div>
            
            <div className="tip-card">
              <span className="tip-icon">✍️</span>
              <h4>Practice Writing</h4>
              <p>
                Let your child trace letters in sand, playdough, 
                or with finger paint!
              </p>
            </div>
          </div>
          
          <div className="parent-note">
            <p>
              <strong>Remember:</strong> Every child learns at their own pace. 
              Make letter learning fun and pressure-free. Celebrate small wins! 🌟
            </p>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* CREDITS */}
      {/* ================================================================== */}
      <Section className="credits-section" id="credits">
        <div className="credits-content">
          <p className="credits-made">Made with ❤️ by</p>
          <p className="credits-esy">Esy&apos;s Scrollytelling Engine</p>
          <p className="credits-for">
            For curious little minds everywhere
          </p>
          
          <div className="credits-divider">🚂</div>
          
          <p className="credits-more">
            Explore more stories at{" "}
            <a href="/scrollytelling" className="credits-link">
              esy.com/scrollytelling
            </a>
          </p>
        </div>
      </Section>
    </main>
  );
}

