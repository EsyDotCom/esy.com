"use client";

import React, { useEffect, useState, useRef } from "react";
import "./honey-never-spoils.css";

/* ===========================================
   HONEYCOMB SVG
   =========================================== */
const HexagonSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 60 52" className={className}>
    <polygon
      points="30,1 58,14 58,38 30,51 2,38 2,14"
      fill="var(--honey-gold)"
      stroke="var(--honey-dark)"
      strokeWidth="2"
    />
  </svg>
);

/* ===========================================
   HONEYCOMB CELL
   =========================================== */
const HoneycombCell = ({ filled }: { filled: boolean }) => (
  <div className={`hex-cell ${filled ? "filled" : ""}`}>
    <svg viewBox="0 0 60 52">
      <polygon
        className="hex-bg-fill"
        points="30,1 58,14 58,38 30,51 2,38 2,14"
      />
      <polygon
        className="hex-honey-fill"
        points="30,6 52,16 52,36 30,46 8,36 8,16"
      />
    </svg>
  </div>
);

/* ===========================================
   JAR SVG
   =========================================== */
const JarSVG = ({ fillPercent = 70 }: { fillPercent?: number }) => {
  const fillHeight = 70 * (fillPercent / 100);
  const fillY = 100 - fillHeight;

  return (
    <svg viewBox="0 0 80 100" className="jar-svg">
      {/* Jar body */}
      <defs>
        <linearGradient id="honeyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--honey-light)" />
          <stop offset="50%" stopColor="var(--honey-gold)" />
          <stop offset="100%" stopColor="var(--honey-dark)" />
        </linearGradient>
        <clipPath id="jarClip">
          <path d="M15,30 Q10,35 10,45 L10,85 Q10,95 25,95 L55,95 Q70,95 70,85 L70,45 Q70,35 65,30 Z" />
        </clipPath>
      </defs>

      {/* Jar outline */}
      <path
        d="M15,30 Q10,35 10,45 L10,85 Q10,95 25,95 L55,95 Q70,95 70,85 L70,45 Q70,35 65,30 Z"
        fill="none"
        stroke="var(--honey-dark)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Honey fill */}
      <rect
        x="10"
        y={fillY}
        width="60"
        height={fillHeight}
        fill="url(#honeyGrad)"
        clipPath="url(#jarClip)"
      />

      {/* Lid */}
      <rect x="20" y="15" width="40" height="15" rx="3" fill="var(--beeswax)" stroke="var(--honey-dark)" strokeWidth="2" />
      <rect x="25" y="10" width="30" height="8" rx="2" fill="var(--honey-light)" stroke="var(--honey-dark)" strokeWidth="1.5" />

      {/* Jar glass shine */}
      <path
        d="M18,40 L18,75"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
};

/* ===========================================
   BEE SVG
   =========================================== */
const BeeSVG = ({ size = 40 }: { size?: number }) => (
  <svg viewBox="0 0 50 40" width={size} height={size * 0.8}>
    {/* Wings */}
    <ellipse cx="18" cy="12" rx="8" ry="5" fill="var(--cream)" stroke="var(--honey-dark)" strokeWidth="1" opacity="0.7" />
    <ellipse cx="32" cy="12" rx="8" ry="5" fill="var(--cream)" stroke="var(--honey-dark)" strokeWidth="1" opacity="0.7" />

    {/* Body */}
    <ellipse cx="25" cy="22" rx="12" ry="10" fill="var(--honey-gold)" stroke="var(--honey-dark)" strokeWidth="1.5" />

    {/* Stripes */}
    <path d="M18,18 Q25,16 32,18" stroke="var(--text-dark)" strokeWidth="2.5" fill="none" />
    <path d="M17,24 Q25,22 33,24" stroke="var(--text-dark)" strokeWidth="2.5" fill="none" />
    <path d="M19,30 Q25,28 31,30" stroke="var(--text-dark)" strokeWidth="2" fill="none" />

    {/* Head */}
    <circle cx="25" cy="8" r="5" fill="var(--honey-gold)" stroke="var(--honey-dark)" strokeWidth="1.5" />

    {/* Eyes */}
    <circle cx="23" cy="7" r="1.5" fill="var(--text-dark)" />
    <circle cx="27" cy="7" r="1.5" fill="var(--text-dark)" />

    {/* Antennae */}
    <path d="M22,4 L20,0" stroke="var(--honey-dark)" strokeWidth="1" fill="none" />
    <path d="M28,4 L30,0" stroke="var(--honey-dark)" strokeWidth="1" fill="none" />

    {/* Stinger */}
    <path d="M25,32 L25,36" stroke="var(--text-dark)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ===========================================
   MAIN COMPONENT
   =========================================== */
export default function HoneyNeverSpoilsClient() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [filledCells, setFilledCells] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);

      // Years counter: 0 to 3000
      setYearsCount(Math.floor(progress * 3000));

      // Honeycomb cells: 0 to 19
      setFilledCells(Math.floor(progress * 19));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for fade animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".fade-up, .draw-line");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const expirationData = [
    { name: "Fresh Milk", class: "milk", time: "5-7 days" },
    { name: "Bread", class: "bread", time: "5-7 days" },
    { name: "Eggs", class: "eggs", time: "3-5 weeks" },
    { name: "Hard Cheese", class: "cheese", time: "3-4 months" },
    { name: "Honey", class: "honey", time: "Forever", forever: true },
  ];

  const scienceReasons = [
    {
      icon: "💧",
      title: "Low Moisture",
      text: "Only 14-18% water — too dry for bacteria to survive",
    },
    {
      icon: "🍬",
      title: "High Sugar",
      text: "80% sugars create osmotic pressure that kills microbes",
    },
    {
      icon: "⚗️",
      title: "Low pH",
      text: "pH of 3.2-4.5 — too acidic for pathogens",
    },
    {
      icon: "🧪",
      title: "Hydrogen Peroxide",
      text: "Glucose oxidase enzyme produces natural antiseptic",
    },
  ];

  return (
    <div className="honey-story" ref={containerRef}>
      {/* Honey Drip Progress */}
      <div className="honey-drip-progress">
        <div className="drip-container">
          <div
            className="honey-fill"
            style={{ height: `${scrollProgress * 100}%` }}
          />
          <div
            className="drip-blob"
            style={{
              bottom: `${scrollProgress * 100 - 3}%`,
              opacity: scrollProgress > 0.02 ? 1 : 0,
            }}
          />
        </div>
      </div>

      {/* Time Counter */}
      <div className="time-counter">
        <div className="years-display">{yearsCount.toLocaleString()}</div>
        <div className="years-label">years old</div>
        <div className="still-good">✓ still edible</div>
      </div>

      {/* Hero */}
      <section className="hero">
        <div className="hex-bg">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <HexagonSVG key={i} className="hex-shape" />
          ))}
        </div>

        <div className="hero-content">
          <div className="hero-jar">
            <JarSVG fillPercent={75} />
          </div>

          <h1 className="hero-title">
            Honey <span className="gold">Never</span> Spoils
          </h1>
          <p className="hero-subtitle">The Eternal Elixir</p>
          <p className="hero-description">
            3,000-year-old honey found in Egyptian tombs is still perfectly
            edible. Discover why this golden substance defies time itself.
          </p>

          <div className="hero-fact">
            <BeeSVG size={30} />
            <span>The only food that truly lasts forever</span>
          </div>
        </div>

        <div className="hero-scroll">
          <span>Scroll to explore</span>
          <div className="scroll-honey" />
        </div>
      </section>

      {/* Ancient Discovery */}
      <section className="content-section">
        <div className="section-layout fade-up">
          <div className="section-visual">
            <svg viewBox="0 0 300 250" className="illustration-svg">
              {/* Egyptian Jar */}
              <ellipse cx="150" cy="220" rx="60" ry="15" fill="var(--cream-dark)" />
              <path
                className="draw-line"
                d="M100,200 Q90,150 100,100 Q120,60 150,50 Q180,60 200,100 Q210,150 200,200 Z"
                fill="none"
                stroke="var(--egyptian-gold)"
                strokeWidth="3"
              />
              <path
                d="M100,200 Q90,150 100,100 Q120,60 150,50 Q180,60 200,100 Q210,150 200,200 Z"
                fill="var(--honey-gold)"
                opacity="0.3"
              />
              {/* Hieroglyphic decorations */}
              <circle cx="130" cy="130" r="5" fill="var(--egyptian-gold)" />
              <circle cx="170" cy="130" r="5" fill="var(--egyptian-gold)" />
              <path d="M140,150 L160,150" stroke="var(--egyptian-gold)" strokeWidth="2" />
              <path d="M135,170 L165,170 L150,185 Z" fill="none" stroke="var(--egyptian-gold)" strokeWidth="2" />
              {/* Lid */}
              <ellipse cx="150" cy="50" rx="35" ry="10" fill="var(--beeswax)" stroke="var(--honey-dark)" strokeWidth="2" />
              {/* Year badge */}
              <text x="150" y="240" textAnchor="middle" fontFamily="var(--font-sketch)" fontSize="14" fill="var(--text-medium)">
                ~1323 BCE
              </text>
            </svg>
          </div>

          <div className="section-content">
            <span className="section-badge">The Discovery</span>
            <h2 className="section-title">
              3,000-Year-Old Honey from Tutankhamun&apos;s Tomb
            </h2>
            <p className="section-text">
              In 1922, archaeologist Howard Carter discovered jars of honey in
              King Tutankhamun&apos;s tomb — sealed for over 3,000 years. When
              opened, the honey was perfectly preserved and still edible.
            </p>
            <p className="section-text">
              The Egyptians valued honey so highly they placed it in tombs to
              nourish the dead in the afterlife. They also used it to embalm
              bodies, a testament to its preservative powers.
            </p>
            <div className="section-highlight">
              Archaeologists have found 5,500-year-old honey in Georgia that was
              still consumable — the oldest known sample.
            </div>
          </div>
        </div>
      </section>

      {/* Honeycomb Section */}
      <section className="honeycomb-section">
        <div className="honeycomb-inner">
          <h2 className="honeycomb-title">Nature&apos;s Perfect Storage</h2>
          <p className="honeycomb-subtitle">
            Honeycomb: the most efficient shape in nature
          </p>

          <div className="honeycomb-grid">
            {Array.from({ length: 19 }).map((_, i) => (
              <HoneycombCell key={i} filled={i < filledCells} />
            ))}
          </div>

          <p className="honeycomb-fact">
            Bees instinctively build hexagonal cells because hexagons use the
            least wax while providing maximum storage — an optimization
            mathematicians call the &quot;honeycomb conjecture.&quot;
          </p>
        </div>
      </section>

      {/* Science Section */}
      <section className="science-section">
        <div className="science-inner">
          <h2 className="science-title">Why Honey Never Spoils</h2>

          <div className="science-grid">
            {scienceReasons.map((reason, i) => (
              <div key={i} className="science-card fade-up">
                <div className="science-icon">{reason.icon}</div>
                <h4>{reason.title}</h4>
                <p>{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Bees */}
      <section className="content-section">
        <div className="section-layout reverse fade-up">
          <div className="section-visual">
            <svg viewBox="0 0 300 250" className="illustration-svg">
              {/* Flower */}
              <circle cx="150" cy="180" r="25" fill="var(--honey-light)" />
              <circle cx="150" cy="180" r="12" fill="var(--honey-gold)" />
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <ellipse
                  key={i}
                  cx={150 + 35 * Math.cos((angle * Math.PI) / 180)}
                  cy={180 + 35 * Math.sin((angle * Math.PI) / 180)}
                  rx="15"
                  ry="25"
                  fill="var(--honey-light)"
                  stroke="var(--honey-gold)"
                  strokeWidth="1"
                  transform={`rotate(${angle + 90} ${150 + 35 * Math.cos((angle * Math.PI) / 180)} ${180 + 35 * Math.sin((angle * Math.PI) / 180)})`}
                />
              ))}
              {/* Stem */}
              <path d="M150,205 Q145,230 140,250" stroke="var(--honey-deep)" strokeWidth="3" fill="none" />
              {/* Bee flying */}
              <g transform="translate(100, 80)">
                <ellipse cx="12" cy="6" rx="6" ry="4" fill="var(--cream)" opacity="0.7" />
                <ellipse cx="28" cy="6" rx="6" ry="4" fill="var(--cream)" opacity="0.7" />
                <ellipse cx="20" cy="15" rx="10" ry="8" fill="var(--honey-gold)" stroke="var(--honey-dark)" strokeWidth="1.5" />
                <path d="M13,13 Q20,11 27,13" stroke="var(--text-dark)" strokeWidth="2" fill="none" />
                <path d="M13,18 Q20,16 27,18" stroke="var(--text-dark)" strokeWidth="2" fill="none" />
                <circle cx="20" cy="5" r="4" fill="var(--honey-gold)" />
              </g>
              {/* Flight path */}
              <path
                className="draw-line"
                d="M120,95 Q180,60 200,120 Q220,180 150,180"
                stroke="var(--honey-gold)"
                strokeWidth="2"
                strokeDasharray="5,5"
                fill="none"
              />
              {/* Stats */}
              <text x="220" y="60" fontFamily="var(--font-sketch)" fontSize="12" fill="var(--text-medium)">
                2 million flowers
              </text>
              <text x="220" y="75" fontFamily="var(--font-sketch)" fontSize="12" fill="var(--text-medium)">
                = 1 lb honey
              </text>
            </svg>
          </div>

          <div className="section-content">
            <span className="section-badge">The Makers</span>
            <h2 className="section-title">
              Bees: The Ultimate Alchemists
            </h2>
            <p className="section-text">
              A single bee visits 50-100 flowers per foraging trip. To produce
              just one pound of honey, bees collectively fly about 55,000 miles
              and visit roughly 2 million flowers.
            </p>
            <p className="section-text">
              When bees bring nectar back to the hive, they pass it mouth-to-mouth,
              adding enzymes that break down complex sugars. Then they fan the
              nectar with their wings, evaporating water until it reaches the
              perfect 17-18% moisture content.
            </p>
            <div className="section-highlight">
              The average worker bee makes only 1/12 teaspoon of honey in her
              entire lifetime — about 6 weeks.
            </div>
          </div>
        </div>
      </section>

      {/* Expiration Comparison */}
      <section className="expiration-section">
        <div className="expiration-inner">
          <h2 className="expiration-title">
            How Long Foods Last (at room temperature)
          </h2>

          <div className="expiration-items">
            {expirationData.map((item, i) => (
              <div key={i} className="expiration-item fade-up">
                <span className="item-name">{item.name}</span>
                <div className="item-bar">
                  <div className={`item-fill ${item.class}`} />
                </div>
                <span className={`item-time ${item.forever ? "forever" : ""}`}>
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Uses */}
      <section className="content-section">
        <div className="section-layout fade-up">
          <div className="section-visual">
            <svg viewBox="0 0 300 250" className="illustration-svg">
              {/* Medical cross */}
              <rect x="130" y="50" width="40" height="100" rx="5" fill="none" stroke="var(--honey-gold)" strokeWidth="3" />
              <rect x="100" y="80" width="100" height="40" rx="5" fill="none" stroke="var(--honey-gold)" strokeWidth="3" />
              {/* Honey dipper */}
              <path
                className="draw-line"
                d="M200,160 L220,180 M210,165 L230,185 M220,170 L240,190"
                stroke="var(--beeswax)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <ellipse cx="215" cy="195" rx="20" ry="10" fill="var(--beeswax)" stroke="var(--honey-dark)" strokeWidth="2" />
              {/* Honey drip */}
              <path d="M215,205 Q215,215 210,225 Q205,235 215,235 Q225,235 220,225 Q215,215 215,205" fill="var(--honey-gold)" />
              {/* Text */}
              <text x="150" y="180" textAnchor="middle" fontFamily="var(--font-sketch)" fontSize="14" fill="var(--text-medium)">
                Medical-grade honey
              </text>
              <text x="150" y="200" textAnchor="middle" fontFamily="var(--font-sketch)" fontSize="14" fill="var(--text-medium)">
                treats wounds today
              </text>
            </svg>
          </div>

          <div className="section-content">
            <span className="section-badge">Modern Science</span>
            <h2 className="section-title">
              From Ancient Medicine to Modern Hospitals
            </h2>
            <p className="section-text">
              Ancient Egyptians used honey to treat wounds — and modern medicine
              has proven them right. Medical-grade Manuka honey is now FDA-approved
              for wound care, effectively treating burns, ulcers, and surgical wounds.
            </p>
            <p className="section-text">
              Studies show honey can kill antibiotic-resistant bacteria like MRSA.
              Its combination of low pH, hydrogen peroxide production, and unique
              compounds make it a powerful antimicrobial agent.
            </p>
            <div className="section-highlight">
              In 2020, researchers found honey more effective than conventional
              treatments for upper respiratory infections.
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section">
        <div className="quote-inner fade-up">
          <p className="quote-text">
            &quot;The only reason for being a bee that I know of is to make
            honey... and the only reason for making honey is so I can eat it.&quot;
          </p>
          <p className="quote-author">— Winnie the Pooh (A.A. Milne)</p>
        </div>
      </section>

      {/* Fun Facts */}
      <section className="content-section">
        <div className="section-layout reverse fade-up">
          <div className="section-visual">
            <svg viewBox="0 0 300 250" className="illustration-svg">
              {/* Globe */}
              <circle cx="150" cy="125" r="80" fill="none" stroke="var(--honey-gold)" strokeWidth="2" />
              <ellipse cx="150" cy="125" rx="80" ry="30" fill="none" stroke="var(--honey-gold)" strokeWidth="1" />
              <ellipse cx="150" cy="125" rx="40" ry="80" fill="none" stroke="var(--honey-gold)" strokeWidth="1" />
              {/* Honey drops around globe */}
              <path d="M50,80 Q50,90 55,95 Q60,100 50,100 Q40,100 45,95 Q50,90 50,80" fill="var(--honey-gold)" />
              <path d="M250,150 Q250,160 255,165 Q260,170 250,170 Q240,170 245,165 Q250,160 250,150" fill="var(--honey-gold)" />
              <path d="M150,230 Q150,240 155,245 Q160,250 150,250 Q140,250 145,245 Q150,240 150,230" fill="var(--honey-gold)" />
              {/* Stats */}
              <text x="150" y="30" textAnchor="middle" fontFamily="var(--font-elegant)" fontSize="16" fill="var(--text-dark)">
                1.9 million tons
              </text>
              <text x="150" y="48" textAnchor="middle" fontFamily="var(--font-sketch)" fontSize="12" fill="var(--text-medium)">
                produced globally each year
              </text>
            </svg>
          </div>

          <div className="section-content">
            <span className="section-badge">Fun Facts</span>
            <h2 className="section-title">
              Honey by the Numbers
            </h2>
            <p className="section-text">
              • <strong>1.9 million tons</strong> of honey produced globally each year
            </p>
            <p className="section-text">
              • <strong>20,000+</strong> bee species on Earth (only 7 make honey)
            </p>
            <p className="section-text">
              • <strong>300+</strong> unique varieties of honey in the US alone
            </p>
            <p className="section-text">
              • <strong>$8 billion</strong> global honey market value
            </p>
            <p className="section-text">
              • <strong>Crystallization</strong> is natural and reversible — just warm it up!
            </p>
            <div className="section-highlight">
              Honey is the only food produced by insects that humans eat. It&apos;s
              also mentioned in religious texts from the Bible to the Quran.
            </div>
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="sources-section">
        <div className="sources-inner">
          <h2 className="sources-title">Sources & Further Reading</h2>
          <div className="sources-grid">
            <a
              href="https://www.smithsonianmag.com/science-nature/the-science-behind-honeys-eternal-shelf-life-1218690/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Smithsonian Magazine — The Science Behind Honey&apos;s Eternal Shelf Life
            </a>
            <a
              href="https://www.nationalgeographic.com/animals/article/bees-honey-antimicrobial"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Geographic — Why Honey Is the Only Food That Doesn&apos;t Spoil
            </a>
            <a
              href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3758027/"
              target="_blank"
              rel="noopener noreferrer"
            >
              NIH — Honey: A Therapeutic Agent for Disorders of the Gastrointestinal Tract
            </a>
            <a
              href="https://www.fda.gov/medical-devices/recently-approved-devices/activon-tube-k090903"
              target="_blank"
              rel="noopener noreferrer"
            >
              FDA — Medical-Grade Honey Approval for Wound Care
            </a>
            <a
              href="https://pubmed.ncbi.nlm.nih.gov/32817011/"
              target="_blank"
              rel="noopener noreferrer"
            >
              BMJ Evidence-Based Medicine — Honey for Upper Respiratory Tract Infections
            </a>
            <a
              href="https://education.nationalgeographic.org/resource/honey-bees/"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Geographic Education — Honey Bees
            </a>
            <a
              href="https://www.pnas.org/doi/10.1073/pnas.1514076112"
              target="_blank"
              rel="noopener noreferrer"
            >
              PNAS — Ancient Georgian Honey Discovery (5,500 years old)
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="story-footer">
        <div className="footer-content">
          <div className="footer-bee">🐝</div>
          <p className="footer-text">
            Next time you taste honey, remember: you&apos;re enjoying a substance
            that could outlast human civilization itself.
          </p>
        </div>
      </footer>
    </div>
  );
}

