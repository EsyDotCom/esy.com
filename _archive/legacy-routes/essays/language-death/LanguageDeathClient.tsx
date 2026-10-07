"use client";

import React, { useEffect, useState, useRef } from 'react';
import './language-death.css';

/**
 * LANGUAGE DEATH - The Silence of Extinction
 * 
 * UNIQUE MECHANICS (Anti-Pattern-Matching Applied):
 * 1. Countdown counter - languages DECREASING as you scroll (7000 → fewer)
 * 2. Fading/dissolving text - words from endangered languages disappear
 * 3. Language graveyard - extinct language "tombstones" that appear
 * 4. Last words monument - final phrases from extinct languages
 * 5. Progressive emptiness - page becomes sparser as story progresses
 * 
 * Forcing Question Answer:
 * "What could ONLY exist in a language death story?"
 * → Text that literally disappears, counter going DOWN, silence visualization
 */

// Words from endangered languages that will fade
const endangeredWords = [
  { word: 'Kalaw Lagaw Ya', x: 10, y: 15 },
  { word: 'Chamicuro', x: 75, y: 20 },
  { word: 'Dumi', x: 25, y: 35 },
  { word: 'Ongota', x: 65, y: 45 },
  { word: 'Liki', x: 15, y: 55 },
  { word: 'Taushiro', x: 80, y: 60 },
  { word: 'Tanema', x: 40, y: 75 },
  { word: 'Njerep', x: 55, y: 25 },
  { word: 'Chemehuevi', x: 30, y: 85 },
  { word: 'Resígaro', x: 70, y: 80 },
  { word: 'Patwin', x: 20, y: 65 },
  { word: 'Kawésqar', x: 85, y: 40 },
];

// Extinct languages graveyard
const extinctLanguages = [
  {
    name: 'Eyak',
    region: 'Alaska, USA',
    death: 'Died: January 21, 2008',
    speaker: 'Last speaker: Marie Smith Jones'
  },
  {
    name: 'Ubykh',
    region: 'Caucasus / Turkey',
    death: 'Died: October 7, 1992',
    speaker: 'Last speaker: Tevfik Esenç'
  },
  {
    name: 'Siletz Dee-ni',
    region: 'Oregon, USA',
    death: 'Died: 1972',
    speaker: 'Last speaker: Alfred Lane'
  },
  {
    name: 'Boro (Australia)',
    region: 'Northern Territory',
    death: 'Died: 1974',
    speaker: 'Last speaker: Charlie Mungulda'
  },
  {
    name: 'Klallam',
    region: 'Washington State, USA',
    death: 'Died: February 4, 2014',
    speaker: 'Last speaker: Hazel Sampson'
  },
  {
    name: 'Livonian',
    region: 'Latvia / Estonia',
    death: 'Died: June 2, 2013',
    speaker: 'Last speaker: Grizelda Kristiņa'
  }
];

// Last words/phrases from extinct or dying languages
const lastWords = [
  {
    phrase: '"Ughunâ tânxwâ gáh siyé"',
    translation: '"I hear the birds"',
    language: 'Eyak — Extinct 2008'
  },
  {
    phrase: '"Pşə gụəmə"',
    translation: '"My soul"',
    language: 'Ubykh — Extinct 1992'
  },
  {
    phrase: '"Tił-til-a"',
    translation: '"To remember"',
    language: 'Haida — Critically Endangered'
  },
  {
    phrase: '"Miyá gíshk"',
    translation: '"Good morning"',
    language: 'Klallam — Extinct 2014'
  }
];

const LanguageDeathClient: React.FC = () => {
  const [languageCount, setLanguageCount] = useState(7168);
  const [visibleTombstones, setVisibleTombstones] = useState<number[]>([]);
  const [visibleStats, setVisibleStats] = useState<number[]>([]);
  const [visibleLastWords, setVisibleLastWords] = useState<number[]>([]);
  const [fadedWords, setFadedWords] = useState<number[]>([]);
  
  const tombstoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastWordRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Countdown counter based on scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = window.scrollY / scrollHeight;
      
      // Count DOWN from 7168 to ~3500 (representing 50% loss by 2100)
      const newCount = Math.round(7168 - (scrollProgress * 3668));
      setLanguageCount(Math.max(3500, newCount));
      
      // Fade words progressively
      const wordsToFade = Math.floor(scrollProgress * endangeredWords.length);
      const newFaded = [];
      for (let i = 0; i < wordsToFade; i++) {
        newFaded.push(i);
      }
      setFadedWords(newFaded);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observers
  useEffect(() => {
    const observerOptions = { threshold: 0.3 };
    
    // Tombstones observer
    const tombstoneObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = tombstoneRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setTimeout(() => {
              setVisibleTombstones(prev => [...new Set([...prev, index])]);
            }, index * 150);
          }
        }
      });
    }, observerOptions);

    // Stats observer
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = statRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setTimeout(() => {
              setVisibleStats(prev => [...new Set([...prev, index])]);
            }, index * 200);
          }
        }
      });
    }, observerOptions);

    // Last words observer
    const lastWordObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = lastWordRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setTimeout(() => {
              setVisibleLastWords(prev => [...new Set([...prev, index])]);
            }, index * 300);
          }
        }
      });
    }, observerOptions);

    tombstoneRefs.current.forEach(ref => ref && tombstoneObserver.observe(ref));
    statRefs.current.forEach(ref => ref && statObserver.observe(ref));
    lastWordRefs.current.forEach(ref => ref && lastWordObserver.observe(ref));

    return () => {
      tombstoneObserver.disconnect();
      statObserver.disconnect();
      lastWordObserver.disconnect();
    };
  }, []);

  return (
    <div className="language-container" ref={containerRef}>
      
      {/* Countdown Progress - Languages Remaining */}
      <div className="countdown-progress">
        <div className="countdown-number">{languageCount.toLocaleString()}</div>
        <div className="countdown-label">Languages Remaining</div>
      </div>

      {/* === HERO === */}
      <section className="hero">
        <div className="hero-void" />
        <div className="hero-content">
          <div className="hero-stat">Every 14 days, a language dies forever</div>
          <h1 className="hero-title">
            <span className="line"><span>The Silence</span></span>
            <span className="line"><span>of Extinction</span></span>
          </h1>
          <p className="hero-subtitle">
            7,168 languages exist today. Half will disappear by 2100.
            When a language dies, a universe of thought dies with it.
          </p>
        </div>
        <div className="hero-scroll">
          <span>Scroll to witness</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* === FADING WORDS SECTION === */}
      <section className="fading-section">
        {/* Endangered language names that fade as you scroll */}
        <div className="fading-words">
          {endangeredWords.map((item, index) => (
            <div
              key={index}
              className={`fading-word ${fadedWords.includes(index) ? 'faded' : 'visible'}`}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
            >
              {item.word}
            </div>
          ))}
        </div>
        
        <div className="fading-content">
          <div className="fading-eyebrow">The Weight of Words</div>
          <h2 className="fading-title">
            A language is not just words—it is a way of seeing the universe
          </h2>
          <p className="fading-body">
            The Hopi language has no words for time as a flowing substance. 
            The Pirahã language has no numbers beyond one and two. 
            The Guugu Yimithirr language has no words for &ldquo;left&rdquo; or &ldquo;right&rdquo;—only 
            cardinal directions. When these languages die, these ways of 
            perceiving reality disappear forever.
          </p>
        </div>
      </section>

      {/* === GRAVEYARD - Extinct Languages === */}
      <section className="graveyard-section">
        <div className="graveyard-header">
          <h2>
            Languages <span className="faded">Already Lost</span>
          </h2>
        </div>
        
        <div className="tombstones">
          {extinctLanguages.map((lang, index) => (
            <div
              key={index}
              ref={el => { tombstoneRefs.current[index] = el; }}
              className={`tombstone ${visibleTombstones.includes(index) ? 'visible' : ''}`}
            >
              <div className="tombstone-name">{lang.name}</div>
              <div className="tombstone-region">{lang.region}</div>
              <div className="tombstone-death">{lang.death}</div>
              <div className="tombstone-speaker">{lang.speaker}</div>
            </div>
          ))}
        </div>
      </section>

      {/* === DATA SECTION === */}
      <section className="data-section">
        <div className="data-header">
          <h2>The <span className="urgent">Mathematics</span> of Loss</h2>
        </div>
        
        <div className="data-grid">
          <div
            ref={el => { statRefs.current[0] = el; }}
            className={`data-stat ${visibleStats.includes(0) ? 'visible' : ''}`}
          >
            <div className="data-value">
              <span className="red">43</span>%
            </div>
            <div className="data-label">Endangered</div>
            <div className="data-context">
              Of all 7,168 known languages, over 3,000 are endangered
            </div>
          </div>
          
          <div
            ref={el => { statRefs.current[1] = el; }}
            className={`data-stat ${visibleStats.includes(1) ? 'visible' : ''}`}
          >
            <div className="data-value">
              <span className="red">1</span>/14d
            </div>
            <div className="data-label">Extinction Rate</div>
            <div className="data-context">
              One language dies approximately every two weeks
            </div>
          </div>
          
          <div
            ref={el => { statRefs.current[2] = el; }}
            className={`data-stat ${visibleStats.includes(2) ? 'visible' : ''}`}
          >
            <div className="data-value">
              <span className="red">4</span>%
            </div>
            <div className="data-label">Global Speakers</div>
            <div className="data-context">
              96% of languages are spoken by only 4% of the world&apos;s population
            </div>
          </div>
          
          <div
            ref={el => { statRefs.current[3] = el; }}
            className={`data-stat ${visibleStats.includes(3) ? 'visible' : ''}`}
          >
            <div className="data-value">
              <span className="red">~570</span>
            </div>
            <div className="data-label">Critically Endangered</div>
            <div className="data-context">
              Languages with fewer than 10 fluent speakers remaining
            </div>
          </div>
        </div>
      </section>

      {/* === LAST WORDS MONUMENT === */}
      <section className="last-words-section">
        <div className="last-words-content">
          <div className="last-words-intro">Final phrases from vanishing tongues</div>
          
          {lastWords.map((item, index) => (
            <div
              key={index}
              ref={el => { lastWordRefs.current[index] = el; }}
              className={`last-word ${visibleLastWords.includes(index) ? 'visible' : ''}`}
            >
              <div className="last-word-phrase">{item.phrase}</div>
              <div className="last-word-translation">{item.translation}</div>
              <div className="last-word-language">{item.language}</div>
            </div>
          ))}
        </div>
      </section>

      {/* === HOPE SECTION === */}
      <section className="hope-section">
        <div className="hope-content">
          <div className="hope-eyebrow">But There Is Hope</div>
          <h2 className="hope-title">
            Languages can be saved—and even revived
          </h2>
          <p className="hope-body">
            Hebrew was nearly extinct for everyday speech for nearly 2,000 years 
            before being revived in the 20th century. The Māori language has 
            recovered from near-extinction through immersion schools. 
            Welsh has seen a renaissance through education and media policies.
            <br /><br />
            Documentation projects, language nests, and digital archives are 
            racing against time to preserve the voices of humanity.
            Every recording, every dictionary, every speaker matters.
          </p>
        </div>
      </section>

      {/* === SOURCES === */}
      <section className="sources-section">
        <div className="sources-content">
          <h3 className="sources-title">Sources & Further Reading</h3>
          <div className="sources-grid">
            <a 
              href="https://www.ethnologue.com/guides/how-many-languages-are-endangered" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Ethnologue: Language Endangerment
            </a>
            <a 
              href="https://www.unesco.org/en/languages-education/endangered-languages" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              UNESCO: Endangered Languages Atlas
            </a>
            <a 
              href="https://www.endangeredlanguages.com/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Endangered Languages Project
            </a>
            <a 
              href="https://linguistics.berkeley.edu/~survey/resources/language-endangerment" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              UC Berkeley Survey of Languages
            </a>
            <a 
              href="https://www.linguisticsociety.org/resource/language-endangerment" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Linguistic Society of America
            </a>
            <a 
              href="https://www.cam.ac.uk/research/news/language-death" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Cambridge Language Death Research
            </a>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="footer">
        <div className="footer-void">◌</div>
        <p className="footer-final">
          &ldquo;When we lose a language, we lose centuries of human thinking 
          about time, seasons, sea creatures, reindeer, edible flowers, 
          mathematics, landscapes, myths, music, and the unknown.&rdquo;
          <br />
          <span style={{ fontSize: '0.875rem', color: '#6B6B6B', marginTop: '1rem', display: 'block' }}>
            — Wade Davis, Anthropologist
          </span>
        </p>
      </footer>
    </div>
  );
};

export default LanguageDeathClient;

