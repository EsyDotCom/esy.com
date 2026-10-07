"use client";

import React, { useState, useEffect, useRef } from 'react';
import './the-dna-helix.css';

/*
 * DNA & THE DOUBLE HELIX - The Code of Life
 * 
 * Design Research Report:
 * 
 * Visual Archaeology:
 * - X-ray crystallography patterns
 * - Scientific journal illustrations
 * - Laboratory aesthetics
 * 
 * UNIQUE MECHANICS (Anti-Pattern Applied):
 * ✅ Double helix that TWISTS with scroll
 * ✅ Base pairs (A-T, G-C) connecting
 * ✅ Photo 51 X-ray revealing
 * ✅ Genetic sequence typing out
 * ✅ CRISPR scissors animation
 * ✅ Nucleotide base color coding
 */

const DNA_SEQUENCE = ['A', 'T', 'G', 'C', 'G', 'A', 'T', 'C', 'A', 'G', 'T', 'A'];
const COMPLEMENT: Record<string, string> = { A: 'T', T: 'A', G: 'C', C: 'G' };

const DNAHelixClient: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [helixRotation, setHelixRotation] = useState(0);
  const [activeBases, setActiveBases] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / scrollHeight, 1);
      setScrollProgress(progress);
      
      // Rotate helix with scroll
      setHelixRotation(progress * 720); // Two full rotations
      
      // Activate bases progressively
      const bases = Math.floor(progress * DNA_SEQUENCE.length);
      setActiveBases(bases);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleSections((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Generate helix path points
  const generateHelixPath = (offset: number = 0) => {
    const points = [];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      const x = 20 + 15 * Math.sin((t * 4 + offset) * Math.PI + (helixRotation * Math.PI / 180));
      const y = t * 300;
      points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
    }
    return points.join(' ');
  };

  return (
    <div className="dna-story">
      {/* Helix Progress Indicator */}
      <div className="helix-progress">
        <svg className="helix-svg" viewBox="0 0 40 300">
          <path 
            d={generateHelixPath(0)} 
            className="helix-strand-left"
          />
          <path 
            d={generateHelixPath(1)} 
            className="helix-strand-right"
          />
          {/* Base pairs connecting the strands */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
            const t = (i + 0.5) / 10;
            const y = t * 300;
            const x1 = 20 + 15 * Math.sin((t * 4) * Math.PI + (helixRotation * Math.PI / 180));
            const x2 = 20 + 15 * Math.sin((t * 4 + 1) * Math.PI + (helixRotation * Math.PI / 180));
            const isVisible = scrollProgress > t;
            return (
              <line
                key={i}
                x1={x1}
                y1={y}
                x2={x2}
                y2={y}
                className={`base-pair ${i % 2 === 0 ? 'at' : 'gc'} ${isVisible ? 'visible' : ''}`}
              />
            );
          })}
        </svg>
      </div>

      {/* Sequence Display */}
      <div className="sequence-display">
        <div className="sequence-strand">
          {DNA_SEQUENCE.map((base, idx) => (
            <div 
              key={`5-${idx}`} 
              className={`sequence-base ${base} ${idx < activeBases ? 'active' : ''}`}
            >
              {base}
            </div>
          ))}
        </div>
        <div className="sequence-strand">
          {DNA_SEQUENCE.map((base, idx) => (
            <div 
              key={`3-${idx}`} 
              className={`sequence-base ${COMPLEMENT[base]} ${idx < activeBases ? 'active' : ''}`}
            >
              {COMPLEMENT[base]}
            </div>
          ))}
        </div>
        <div className="sequence-label">5&apos; → 3&apos;</div>
      </div>

      {/* ==================== HERO ==================== */}
      <section className="hero">
        <div className="floating-bases">
          <span className="floating-base">A</span>
          <span className="floating-base">T</span>
          <span className="floating-base">G</span>
          <span className="floating-base">C</span>
          <span className="floating-base">A</span>
          <span className="floating-base">G</span>
        </div>

        <div className="hero-content">
          <div className="hero-era">Discovered 1953</div>
          <h1 className="hero-title">
            DNA &amp; The <span className="helix-text">Double Helix</span>
          </h1>
          <p className="hero-subtitle">The Molecule That Codes Life Itself</p>
          <p className="hero-description">
            In 1953, humanity glimpsed the architecture of heredity — a twisted ladder 
            of sugar, phosphate, and four chemical letters that spell out every living thing.
          </p>
          
          <div className="hero-bases">
            <div className="hero-base A">A</div>
            <div className="hero-base T">T</div>
            <div className="hero-base G">G</div>
            <div className="hero-base C">C</div>
          </div>
        </div>

        <div className="hero-scroll">
          <span>Unwind the helix</span>
          <div className="scroll-helix" />
        </div>
      </section>

      {/* ==================== SECTION 1: Early Discovery ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[0] = el; }}
      >
        <div className="section-layout">
          <div className="section-visual">
            <svg viewBox="0 0 300 350" className="illustration-svg">
              {/* Miescher's laboratory scene */}
              <g className={`fade-up ${visibleSections.has(0) ? 'visible' : ''}`}>
                {/* Test tube */}
                <rect x="120" y="80" width="60" height="180" rx="30" fill="none" stroke="#64748b" strokeWidth="3" />
                <ellipse cx="150" cy="80" rx="30" ry="10" fill="none" stroke="#64748b" strokeWidth="3" />
                
                {/* Liquid inside */}
                <path d="M125 180 Q150 200 175 180 L175 250 Q150 260 125 250 Z" fill="#f97316" opacity="0.3" />
                
                {/* Precipitate at bottom */}
                <ellipse cx="150" cy="250" rx="25" ry="8" fill="#64748b" opacity="0.5" />
                
                {/* DNA strands emerging (artistic) */}
                <path 
                  d="M145 150 Q160 130 145 110 Q130 90 145 70" 
                  fill="none" 
                  stroke="#0077b6" 
                  strokeWidth="2"
                  strokeDasharray="5 3"
                />
                <path 
                  d="M155 150 Q140 130 155 110 Q170 90 155 70" 
                  fill="none" 
                  stroke="#7c3aed" 
                  strokeWidth="2"
                  strokeDasharray="5 3"
                />
                
                {/* Label */}
                <text x="150" y="320" fontFamily="IBM Plex Mono" fontSize="11" fill="#64748b" textAnchor="middle">
                  &quot;Nuclein&quot; — Miescher, 1869
                </text>
              </g>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-era">The Discovery Begins</div>
            <div className="section-year">1869</div>
            <h3 className="section-title">Friedrich Miescher Discovers &ldquo;Nuclein&rdquo;</h3>
            <p className="section-text">
              In a Swiss laboratory, Friedrich Miescher extracted a strange substance 
              from the nuclei of white blood cells in pus-soaked bandages. He called it 
              &ldquo;nuclein&rdquo; — rich in phosphorus, resistant to protein-digesting enzymes.
            </p>
            <p className="section-text">
              Miescher suspected it might be important for heredity, but his discovery 
              lay dormant for decades. Scientists assumed proteins, with their 20 amino 
              acids, must carry genetic information — not this simpler molecule.
            </p>
            <div className="section-highlight">
              &ldquo;I am at a loss to say what Miescher&apos;s nuclein is good for.&rdquo; 
              — Contemporary scientist
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 2: The Race ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[1] = el; }}
      >
        <div className="section-layout reverse">
          <div className="section-visual">
            <svg viewBox="0 0 300 350" className="illustration-svg">
              {/* Chargaff's rules visualization */}
              <g className={`fade-up ${visibleSections.has(1) ? 'visible' : ''}`}>
                {/* A = T bars */}
                <rect x="50" y="80" width="80" height="30" rx="4" fill="#22c55e" />
                <text x="90" y="100" fontFamily="IBM Plex Mono" fontSize="16" fill="white" textAnchor="middle" fontWeight="bold">A</text>
                
                <rect x="170" y="80" width="80" height="30" rx="4" fill="#ef4444" />
                <text x="210" y="100" fontFamily="IBM Plex Mono" fontSize="16" fill="white" textAnchor="middle" fontWeight="bold">T</text>
                
                <text x="150" y="100" fontFamily="IBM Plex Mono" fontSize="20" fill="#64748b" textAnchor="middle">=</text>
                
                {/* G = C bars */}
                <rect x="50" y="140" width="80" height="30" rx="4" fill="#eab308" />
                <text x="90" y="160" fontFamily="IBM Plex Mono" fontSize="16" fill="#0f172a" textAnchor="middle" fontWeight="bold">G</text>
                
                <rect x="170" y="140" width="80" height="30" rx="4" fill="#3b82f6" />
                <text x="210" y="160" fontFamily="IBM Plex Mono" fontSize="16" fill="white" textAnchor="middle" fontWeight="bold">C</text>
                
                <text x="150" y="160" fontFamily="IBM Plex Mono" fontSize="20" fill="#64748b" textAnchor="middle">=</text>
                
                {/* Percentages */}
                <text x="90" y="210" fontFamily="IBM Plex Mono" fontSize="12" fill="#64748b" textAnchor="middle">~30%</text>
                <text x="210" y="210" fontFamily="IBM Plex Mono" fontSize="12" fill="#64748b" textAnchor="middle">~30%</text>
                <text x="90" y="230" fontFamily="IBM Plex Mono" fontSize="12" fill="#64748b" textAnchor="middle">~20%</text>
                <text x="210" y="230" fontFamily="IBM Plex Mono" fontSize="12" fill="#64748b" textAnchor="middle">~20%</text>
                
                {/* Label */}
                <text x="150" y="300" fontFamily="IBM Plex Mono" fontSize="11" fill="#64748b" textAnchor="middle">
                  Chargaff&apos;s Rules, 1950
                </text>
              </g>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-era">The Clue</div>
            <div className="section-year">1950</div>
            <h3 className="section-title">Chargaff&apos;s Rules: A = T, G = C</h3>
            <p className="section-text">
              Erwin Chargaff discovered something profound: in any organism&apos;s DNA, 
              the amount of adenine (A) always equals thymine (T), and guanine (G) 
              always equals cytosine (C). This wasn&apos;t random — it was a rule.
            </p>
            <p className="section-text">
              This complementary pairing was the key clue. If A always paired with T, 
              and G with C, then DNA must have two strands — mirror images of each other. 
              The race to find the structure was on.
            </p>
            <div className="section-highlight">
              The 1:1 ratios suggested a pairing mechanism — but no one yet knew 
              what shape it took.
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PHOTO 51 SECTION ==================== */}
      <section className="photo51-section">
        <div className="photo51-inner">
          <div className="photo51-visual">
            <div className="photo51-frame">
              <svg className="photo51-xray" viewBox="0 0 200 200">
                {/* X-ray diffraction pattern */}
                <circle cx="100" cy="100" r="80" className="xray-pattern" />
                <circle cx="100" cy="100" r="60" className="xray-pattern" />
                <circle cx="100" cy="100" r="40" className="xray-pattern" />
                <circle cx="100" cy="100" r="20" className="xray-center" />
                
                {/* The characteristic X pattern */}
                <line x1="30" y1="30" x2="170" y2="170" stroke="rgba(255,255,255,0.4)" strokeWidth="8" />
                <line x1="170" y1="30" x2="30" y2="170" stroke="rgba(255,255,255,0.4)" strokeWidth="8" />
                
                {/* Diffraction spots */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <circle 
                    key={angle}
                    cx={100 + 50 * Math.cos(angle * Math.PI / 180)}
                    cy={100 + 50 * Math.sin(angle * Math.PI / 180)}
                    r="5"
                    fill="rgba(255,255,255,0.6)"
                  />
                ))}
              </svg>
            </div>
          </div>
          
          <div className="photo51-content">
            <h3>Photo 51</h3>
            <div className="scientist">Rosalind Franklin — May 1952</div>
            <p>
              The most important photograph in biology. Rosalind Franklin&apos;s X-ray 
              crystallography image revealed the helical structure of DNA. The distinctive 
              &ldquo;X&rdquo; pattern proved DNA was a helix; the spacing showed it had two strands.
            </p>
            <p>
              Franklin didn&apos;t receive the Nobel Prize — she died of ovarian cancer in 
              1958, possibly from radiation exposure. Her contribution was acknowledged 
              only decades later.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 3: The Discovery ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[2] = el; }}
      >
        <div className="section-layout">
          <div className="section-visual">
            <svg viewBox="0 0 300 400" className="illustration-svg">
              {/* Double helix illustration */}
              <g className={`fade-up ${visibleSections.has(2) ? 'visible' : ''}`}>
                {/* Left strand */}
                <path 
                  d="M100 50 Q150 100 100 150 Q50 200 100 250 Q150 300 100 350"
                  fill="none"
                  stroke="#0077b6"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* Right strand */}
                <path 
                  d="M200 50 Q150 100 200 150 Q250 200 200 250 Q150 300 200 350"
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                
                {/* Base pairs */}
                <line x1="100" y1="75" x2="200" y2="75" stroke="#22c55e" strokeWidth="3" />
                <line x1="100" y1="125" x2="200" y2="125" stroke="#ef4444" strokeWidth="3" />
                <line x1="100" y1="175" x2="200" y2="175" stroke="#eab308" strokeWidth="3" />
                <line x1="100" y1="225" x2="200" y2="225" stroke="#3b82f6" strokeWidth="3" />
                <line x1="100" y1="275" x2="200" y2="275" stroke="#22c55e" strokeWidth="3" />
                <line x1="100" y1="325" x2="200" y2="325" stroke="#ef4444" strokeWidth="3" />
                
                {/* Base pair labels */}
                <text x="85" y="80" fontFamily="IBM Plex Mono" fontSize="10" fill="#22c55e">A</text>
                <text x="205" y="80" fontFamily="IBM Plex Mono" fontSize="10" fill="#ef4444">T</text>
                <text x="85" y="130" fontFamily="IBM Plex Mono" fontSize="10" fill="#ef4444">T</text>
                <text x="205" y="130" fontFamily="IBM Plex Mono" fontSize="10" fill="#22c55e">A</text>
                <text x="85" y="180" fontFamily="IBM Plex Mono" fontSize="10" fill="#eab308">G</text>
                <text x="205" y="180" fontFamily="IBM Plex Mono" fontSize="10" fill="#3b82f6">C</text>
                
                <text x="150" y="390" fontFamily="IBM Plex Mono" fontSize="11" fill="#64748b" textAnchor="middle">
                  The Double Helix, 1953
                </text>
              </g>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-era">The Structure Revealed</div>
            <div className="section-year">1953</div>
            <h3 className="section-title">Watson &amp; Crick: &ldquo;We Have Found the Secret of Life&rdquo;</h3>
            <p className="section-text">
              On February 28, 1953, James Watson and Francis Crick walked into the Eagle 
              pub in Cambridge and announced they had discovered &ldquo;the secret of life.&rdquo; 
              They had built a model showing DNA as a double helix — two strands twisted 
              around each other like a spiral staircase.
            </p>
            <p className="section-text">
              Their one-page paper in <em>Nature</em> (April 25, 1953) ended with perhaps 
              the greatest understatement in scientific history: &ldquo;It has not escaped 
              our notice that the specific pairing we have postulated immediately suggests 
              a possible copying mechanism for the genetic material.&rdquo;
            </p>
            <div className="section-highlight">
              The structure explained everything — how genetic information is stored, 
              copied, and passed on.
            </div>
          </div>
        </div>
      </section>

      {/* ==================== BASE PAIRING ==================== */}
      <section className="pairing-section">
        <div className="pairing-inner">
          <h3 className="pairing-title">The Language of Life</h3>
          <p className="pairing-subtitle">Four letters. Infinite combinations. Every living thing.</p>
          
          <div className="pairing-pairs">
            <div className="pairing-pair">
              <div className="pair-base A">A</div>
              <div className="pair-bond">
                <div className="bond-line" />
                <div className="bond-line" />
              </div>
              <div className="pair-base T">T</div>
              <div className="pair-label">2 hydrogen bonds</div>
            </div>
            
            <div className="pairing-pair">
              <div className="pair-base G">G</div>
              <div className="pair-bond">
                <div className="bond-line" />
                <div className="bond-line" />
                <div className="bond-line" />
              </div>
              <div className="pair-base C">C</div>
              <div className="pair-label">3 hydrogen bonds</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 4: Modern Era ==================== */}
      <section 
        className="content-section"
        ref={(el) => { sectionRefs.current[3] = el; }}
      >
        <div className="section-layout reverse">
          <div className="section-visual">
            <svg viewBox="0 0 300 350" className="illustration-svg">
              {/* Human Genome visualization */}
              <g className={`fade-up ${visibleSections.has(3) ? 'visible' : ''}`}>
                {/* Chromosome pairs */}
                {[0, 1, 2, 3].map((row) => (
                  [0, 1, 2, 3, 4, 5].map((col) => (
                    <g key={`${row}-${col}`}>
                      <rect 
                        x={50 + col * 35} 
                        y={60 + row * 70} 
                        width="8" 
                        height="50" 
                        rx="4"
                        fill={`hsl(${(row * 6 + col) * 15}, 70%, 60%)`}
                      />
                      <rect 
                        x={62 + col * 35} 
                        y={60 + row * 70} 
                        width="8" 
                        height="50" 
                        rx="4"
                        fill={`hsl(${(row * 6 + col) * 15}, 70%, 60%)`}
                        opacity="0.6"
                      />
                    </g>
                  ))
                ))}
                
                {/* Label */}
                <text x="150" y="330" fontFamily="IBM Plex Mono" fontSize="11" fill="#64748b" textAnchor="middle">
                  23 Chromosome Pairs
                </text>
                <text x="150" y="345" fontFamily="IBM Plex Mono" fontSize="10" fill="#64748b" textAnchor="middle">
                  3.2 Billion Base Pairs
                </text>
              </g>
            </svg>
          </div>
          
          <div className="section-content">
            <div className="section-era">The Genome Era</div>
            <div className="section-year">2003</div>
            <h3 className="section-title">The Human Genome Project: Reading Our Blueprint</h3>
            <p className="section-text">
              After 13 years and $2.7 billion, scientists completed the Human Genome 
              Project — sequencing all 3.2 billion base pairs of human DNA. Every A, T, 
              G, and C that makes us human was finally catalogued.
            </p>
            <p className="section-text">
              Today, sequencing your entire genome costs less than $1,000 and takes 
              days instead of years. This revolution in reading DNA has transformed 
              medicine, ancestry research, and forensics.
            </p>
            <div className="section-highlight">
              99.9% of human DNA is identical between any two people. The 0.1% 
              difference is what makes you unique.
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CRISPR SECTION ==================== */}
      <section className="crispr-section">
        <div className="crispr-inner">
          <h3 className="crispr-title">CRISPR: Editing the Code of Life</h3>
          
          <div className="crispr-visual">
            <div className="crispr-dna" />
            <svg className="crispr-scissors" viewBox="0 0 60 60">
              <path 
                d="M10 30 L25 20 L30 30 L25 40 Z" 
                fill="#ef4444"
              />
              <path 
                d="M50 30 L35 20 L30 30 L35 40 Z" 
                fill="#ef4444"
              />
              <circle cx="30" cy="30" r="5" fill="#64748b" />
            </svg>
          </div>
          
          <p className="crispr-text">
            In 2012, Jennifer Doudna and Emmanuelle Charpentier developed CRISPR-Cas9 — 
            &ldquo;genetic scissors&rdquo; that can cut DNA at precise locations. For the first 
            time, we can edit the code of life itself. Cure genetic diseases. Eliminate 
            inherited conditions. The implications are staggering — and so are the ethical questions.
          </p>
        </div>
      </section>

      {/* ==================== QUOTE ==================== */}
      <section className="quote-section">
        <div className="quote-inner">
          <p className="quote-text">
            &ldquo;We used to think our fate was in our stars. Now we know, in large 
            measure, our fate is in our genes.&rdquo;
          </p>
          <p className="quote-author">— James Watson</p>
        </div>
      </section>

      {/* ==================== SOURCES ==================== */}
      <section className="sources-section">
        <div className="sources-inner">
          <h3 className="sources-title">Sources &amp; Further Reading</h3>
          <div className="sources-grid">
            <a href="https://www.nature.com/articles/171737a0" target="_blank" rel="noopener noreferrer">
              Nature: Watson &amp; Crick&apos;s Original 1953 Paper
            </a>
            <a href="https://www.nobelprize.org/prizes/medicine/1962/summary/" target="_blank" rel="noopener noreferrer">
              Nobel Prize: 1962 Physiology or Medicine
            </a>
            <a href="https://www.genome.gov/human-genome-project" target="_blank" rel="noopener noreferrer">
              NIH: Human Genome Project Overview
            </a>
            <a href="https://www.dnalc.org/resources/3d/index.html" target="_blank" rel="noopener noreferrer">
              Cold Spring Harbor: DNA Learning Center
            </a>
            <a href="https://profiles.nlm.nih.gov/spotlight/kr" target="_blank" rel="noopener noreferrer">
              National Library of Medicine: Rosalind Franklin Papers
            </a>
            <a href="https://www.britannica.com/science/DNA" target="_blank" rel="noopener noreferrer">
              Encyclopædia Britannica: DNA
            </a>
            <a href="https://www.sciencehistory.org/education/scientific-biographies/james-watson-francis-crick-maurice-wilkins-and-rosalind-franklin/" target="_blank" rel="noopener noreferrer">
              Science History Institute: DNA Discoverers
            </a>
            <a href="https://www.broadinstitute.org/what-broad/areas-focus/project-spotlight/questions-and-answers-about-crispr" target="_blank" rel="noopener noreferrer">
              Broad Institute: CRISPR FAQ
            </a>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="story-footer">
        <div className="footer-content">
          <div className="footer-helix">
            <div className="footer-base A">A</div>
            <div className="footer-base T">T</div>
            <div className="footer-base G">G</div>
            <div className="footer-base C">C</div>
          </div>
          <p className="footer-text">
            From a mysterious substance in pus-soaked bandages to the code that defines 
            all life — DNA&apos;s story is humanity&apos;s greatest detective tale, still being 
            written in every cell of every living thing.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DNAHelixClient;

