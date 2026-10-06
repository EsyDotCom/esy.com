"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import "./eternal-honey.css";

/* ===========================================
   PYRAMID SVG (Multi-layer silhouettes)
   =========================================== */
const PyramidsSVG = () => (
  <svg viewBox="0 0 1200 400" className="pyramids-svg" preserveAspectRatio="xMidYMax slice">
    {/* Great Pyramid (Khufu) - center */}
    <polygon
      points="600,50 850,350 350,350"
      fill="url(#pyramidGrad1)"
      opacity="0.9"
    />
    {/* Khafre - right */}
    <polygon
      points="900,100 1100,350 700,350"
      fill="url(#pyramidGrad2)"
      opacity="0.8"
    />
    {/* Menkaure - left */}
    <polygon
      points="250,150 400,350 100,350"
      fill="url(#pyramidGrad3)"
      opacity="0.7"
    />
    
    <defs>
      <linearGradient id="pyramidGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#d4a853" />
        <stop offset="100%" stopColor="#8b6914" />
      </linearGradient>
      <linearGradient id="pyramidGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#c9a227" />
        <stop offset="100%" stopColor="#7a5c10" />
      </linearGradient>
      <linearGradient id="pyramidGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#b89830" />
        <stop offset="100%" stopColor="#6d530e" />
      </linearGradient>
    </defs>
  </svg>
);

/* ===========================================
   PYRAMID CROSS-SECTION SVG
   =========================================== */
const PyramidCrossSection = ({
  chamberReveal,
  jarDiscovered,
}: {
  chamberReveal: number;
  jarDiscovered: boolean;
}) => (
  <svg viewBox="0 0 500 400" className="pyramid-cross-svg" preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient id="stoneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#e8dcc4" />
        <stop offset="100%" stopColor="#a89070" />
      </linearGradient>
      <linearGradient id="chamberGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1a1a2e" />
        <stop offset="100%" stopColor="#0d0d14" />
      </linearGradient>
      <radialGradient id="honeyGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f5a623" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#f5a623" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Pyramid outline */}
    <polygon
      points="250,30 480,370 20,370"
      fill="url(#stoneGrad)"
      stroke="#a89070"
      strokeWidth="2"
    />

    {/* Sand layer at bottom */}
    <rect x="0" y="370" width="500" height="30" fill="#d4a853" />

    {/* Internal passages */}
    <path
      d="M250,100 L250,150 L320,200 L320,280"
      fill="none"
      stroke="#0d0d14"
      strokeWidth="8"
      opacity={chamberReveal > 0.2 ? 1 : 0.3}
      style={{ transition: "opacity 0.5s ease" }}
    />

    {/* King's Chamber */}
    <rect
      x="280"
      y="240"
      width="80"
      height="50"
      fill="url(#chamberGrad)"
      className={`tomb-chamber ${chamberReveal > 0.4 ? "revealed" : ""}`}
    />

    {/* Queen's Chamber */}
    <rect
      x="200"
      y="280"
      width="60"
      height="40"
      fill="url(#chamberGrad)"
      className={`tomb-chamber ${chamberReveal > 0.6 ? "revealed" : ""}`}
    />

    {/* Grand Gallery */}
    <path
      d="M250,150 L250,180 L280,200 L280,240"
      fill="none"
      stroke="#2d2d44"
      strokeWidth="12"
      className={`tomb-chamber ${chamberReveal > 0.3 ? "revealed" : ""}`}
    />

    {/* Honey Jar in King's Chamber */}
    <g
      className={`honey-jar-group ${jarDiscovered ? "discovered" : ""}`}
      transform="translate(310, 250)"
    >
      {/* Golden rays */}
      <circle
        cx="15"
        cy="20"
        r="30"
        fill="url(#honeyGlow)"
        className={`golden-rays ${jarDiscovered ? "active" : ""}`}
      />
      
      {/* Jar body */}
      <ellipse cx="15" cy="28" rx="10" ry="4" fill="#8b6914" opacity="0.5" />
      <path
        d="M5,25 Q2,20 5,10 Q10,5 15,5 Q20,5 25,10 Q28,20 25,25 Z"
        fill="#c9a227"
        stroke="#8b6914"
        strokeWidth="1"
      />
      {/* Honey inside */}
      <path
        d="M7,22 Q5,18 8,12 Q12,8 15,8 Q18,8 22,12 Q25,18 23,22 Z"
        fill="#f5a623"
        opacity="0.8"
      />
      {/* Lid */}
      <ellipse cx="15" cy="5" rx="8" ry="3" fill="#a89070" stroke="#8b6914" strokeWidth="0.5" />
    </g>

    {/* Depth markers */}
    <g fontFamily="JetBrains Mono" fontSize="10" fill="#d4a853" opacity="0.7">
      <text x="470" y="100">-10m</text>
      <text x="470" y="200">-20m</text>
      <text x="470" y="280">-26m</text>
    </g>
  </svg>
);

/* ===========================================
   FOOTER JAR SVG
   =========================================== */
const FooterJarSVG = () => (
  <svg viewBox="0 0 60 80" className="footer-jar">
    <defs>
      <linearGradient id="footerHoneyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffc847" />
        <stop offset="50%" stopColor="#f5a623" />
        <stop offset="100%" stopColor="#c47f0a" />
      </linearGradient>
    </defs>
    {/* Jar body */}
    <path
      d="M10,60 Q5,45 10,25 Q20,15 30,15 Q40,15 50,25 Q55,45 50,60 Z"
      fill="#e8dcc4"
      stroke="#c9a227"
      strokeWidth="2"
    />
    {/* Honey */}
    <path
      d="M13,55 Q10,42 15,28 Q22,20 30,20 Q38,20 45,28 Q50,42 47,55 Z"
      fill="url(#footerHoneyGrad)"
    />
    {/* Lid */}
    <ellipse cx="30" cy="15" rx="15" ry="5" fill="#c9a227" stroke="#8b6914" strokeWidth="1" />
    <rect x="20" y="8" width="20" height="7" fill="#d4a853" />
  </svg>
);

/* ===========================================
   MAIN COMPONENT
   =========================================== */
export default function EternalHoneyClient() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [depth, setDepth] = useState(0);
  const [chamberReveal, setChamberReveal] = useState(0);
  const [jarDiscovered, setJarDiscovered] = useState(false);
  const [parallaxOffsets, setParallaxOffsets] = useState({ sky: 0, pyramids: 0, sand: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const tombRef = useRef<HTMLDivElement>(null);

  // Scroll handler with parallax
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollTop / docHeight, 1);
    setScrollProgress(progress);

    // Depth calculation (0m to -26m based on progress)
    setDepth(Math.floor(progress * 26));

    // Parallax for hero section
    if (heroRef.current) {
      const heroHeight = heroRef.current.offsetHeight;
      const heroProgress = Math.min(scrollTop / heroHeight, 1);
      setParallaxOffsets({
        sky: scrollTop * 0.1,
        pyramids: scrollTop * 0.3,
        sand: scrollTop * 0.5,
      });

      // Fade hero content
      const heroContent = document.querySelector(".hero-content-overlay") as HTMLElement;
      if (heroContent) {
        heroContent.style.opacity = String(1 - heroProgress * 1.5);
        heroContent.style.transform = `translateY(${scrollTop * 0.3}px)`;
      }
    }

    // Tomb section progress
    if (tombRef.current) {
      const tombRect = tombRef.current.getBoundingClientRect();
      const tombProgress = Math.max(0, Math.min(1, -tombRect.top / (tombRect.height - window.innerHeight)));
      setChamberReveal(tombProgress);
      setJarDiscovered(tombProgress > 0.7);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Intersection Observer for fade-in elements
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

    const elements = document.querySelectorAll(".panel-content, .timeline-event, .science-card");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const timelineEvents = [
    {
      year: "3000 BCE",
      era: "Ancient Egypt",
      title: "Honey as Divine Gift",
      text: "Egyptians believe honey is the tears of Ra, the sun god. Beekeeping becomes a royal profession.",
    },
    {
      year: "1323 BCE",
      era: "New Kingdom",
      title: "Tutankhamun's Burial",
      text: "Honey jars placed in the young pharaoh's tomb to nourish him in the afterlife.",
    },
    {
      year: "1922 CE",
      era: "Discovery",
      title: "Howard Carter Opens the Tomb",
      text: "After 3,245 years sealed in darkness, the honey jars are found — still perfectly edible.",
    },
    {
      year: "2003 CE",
      era: "Archaeological Record",
      title: "World's Oldest Honey Found",
      text: "5,500-year-old honey discovered in Georgia — still preserved, still edible.",
    },
  ];

  const scienceData = [
    {
      value: "17%",
      label: "Moisture Content",
      desc: "Too dry for bacteria. Most foods spoil at 20%+.",
    },
    {
      value: "3.9",
      label: "pH Level",
      desc: "Acidic enough to kill most pathogens on contact.",
    },
    {
      value: "H₂O₂",
      label: "Hydrogen Peroxide",
      desc: "Bees add glucose oxidase, creating natural antiseptic.",
    },
    {
      value: "80%",
      label: "Sugar Concentration",
      desc: "Osmotic pressure draws water from bacteria, killing them.",
    },
  ];

  return (
    <div className="eternal-honey" ref={containerRef}>
      {/* Depth Meter */}
      <div className="depth-meter">
        <span className="depth-label">DEPTH</span>
        <div className="depth-track">
          <div
            className="depth-indicator"
            style={{ top: `${scrollProgress * 188}px` }}
          />
        </div>
        <span className="depth-value">-{depth}m</span>
      </div>

      {/* Sand Particles */}
      <div className="sand-particles">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="sand-particle" />
        ))}
      </div>

      {/* Parallax Hero */}
      <section className="parallax-hero" ref={heroRef}>
        {/* Sky Layer */}
        <div
          className="parallax-layer layer-sky"
          style={{ transform: `translateY(${parallaxOffsets.sky}px)` }}
        >
          <div className="stars" />
        </div>

        {/* Pyramids Layer */}
        <div
          className="parallax-layer layer-pyramids"
          style={{ transform: `translateY(${parallaxOffsets.pyramids}px)` }}
        >
          <PyramidsSVG />
        </div>

        {/* Sand Layer */}
        <div
          className="parallax-layer layer-sand"
          style={{ transform: `translateY(${parallaxOffsets.sand}px)` }}
        >
          <div className="sand-dunes" />
        </div>

        {/* Hero Content */}
        <div className="hero-content-overlay">
          <span className="hero-badge">GIZA, EGYPT • 1323 BCE</span>
          <h1 className="hero-title">
            <span className="glow">Eternal</span> Honey
          </h1>
          <p className="hero-subtitle">
            A 3,000-year journey into the tomb — and the science of immortality
          </p>

          <div className="hero-scroll-hint">
            <span>DESCEND</span>
            <div className="scroll-arrow" />
          </div>
        </div>
      </section>

      {/* Tomb Descent with Cross-Section */}
      <section className="tomb-descent" ref={tombRef}>
        <div className="tomb-cross-section">
          <PyramidCrossSection
            chamberReveal={chamberReveal}
            jarDiscovered={jarDiscovered}
          />
        </div>

        <div className="tomb-panels">
          <div className="tomb-panel">
            <div className="panel-content">
              <span className="panel-depth">DEPTH: -10 METERS</span>
              <h2 className="panel-title">Into the Great Pyramid</h2>
              <p className="panel-text">
                The Great Pyramid of Giza stands 146 meters tall — the tallest
                human-made structure for over 3,800 years. Inside, a network of
                passages leads to chambers that have protected their contents
                for millennia.
              </p>
              <p className="panel-text">
                The entrance, hidden on the north face, opens to a descending
                passage cut through solid limestone. Temperature inside remains
                a constant 20°C (68°F) — perfect for preservation.
              </p>
            </div>
          </div>

          <div className="tomb-panel">
            <div className="panel-content">
              <span className="panel-depth">DEPTH: -20 METERS</span>
              <h2 className="panel-title">The Grand Gallery</h2>
              <p className="panel-text">
                A corbelled corridor rises 8.6 meters high, leading to the
                King&apos;s Chamber. The precision of construction is
                breathtaking — stones fitted so precisely that a piece of paper
                cannot slip between them.
              </p>
              <div className="panel-highlight">
                The ancient Egyptians believed honey was a bridge between the
                mortal world and the afterlife — a food fit for both pharaohs
                and gods.
              </div>
            </div>
          </div>

          <div className="tomb-panel">
            <div className="panel-content">
              <span className="panel-depth">DEPTH: -26 METERS</span>
              <h2 className="panel-title">The Discovery</h2>
              <p className="panel-text">
                In 1922, Howard Carter unsealed Tutankhamun&apos;s tomb after
                3,245 years. Among the treasures: sealed clay jars containing
                honey. When opened, the honey was perfectly preserved.
              </p>
              <p className="panel-text">
                Archaeologists tasted it. It was still sweet. Still edible. The
                only food known to humanity that truly never spoils.
              </p>
              <div className="panel-highlight">
                &quot;When we opened those jars, honey poured out like it had
                been sealed yesterday.&quot; — Archaeological account
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hieroglyphic Timeline */}
      <section className="hieroglyph-timeline">
        <h2 className="timeline-title">A Timeline Etched in Gold</h2>

        <div className="timeline-track">
          <div className="timeline-line" />

          {timelineEvents.map((event, i) => (
            <div key={i} className="timeline-event">
              <div className="timeline-date">
                <span className="timeline-year">{event.year}</span>
                <span className="timeline-era">{event.era}</span>
              </div>
              <div className="timeline-marker" />
              <div className="timeline-content">
                <h4>{event.title}</h4>
                <p>{event.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Science Section */}
      <section className="science-section">
        <div className="science-inner">
          <h2 className="science-title">The Science of Immortality</h2>

          <div className="science-grid">
            {scienceData.map((item, i) => (
              <div key={i} className="science-card">
                <div className="science-value">{item.value}</div>
                <div className="science-label">{item.label}</div>
                <p className="science-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Monument */}
      <section className="quote-monument">
        <div className="quote-inner">
          <div className="quote-marks">&ldquo;</div>
          <p className="quote-text">
            Honey is the only food that includes all the substances necessary to
            sustain life, including enzymes, vitamins, minerals, and water; and
            it&apos;s the only food that contains pinocembrin, an antioxidant
            associated with improved brain functioning.
          </p>
          <p className="quote-author">
            — National Honey Board
          </p>
        </div>
      </section>

      {/* Sources */}
      <section className="sources-section">
        <div className="sources-inner">
          <h2 className="sources-title">Sources & Further Reading</h2>
          <div className="sources-list">
            <a
              href="https://www.smithsonianmag.com/science-nature/the-science-behind-honeys-eternal-shelf-life-1218690/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Smithsonian — The Science Behind Honey&apos;s Eternal Shelf Life
            </a>
            <a
              href="https://www.nationalgeographic.com/history/article/141022-king-tut-tutankhamen-discovery-tomb-carter"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Geographic — The Discovery of King Tut&apos;s Tomb
            </a>
            <a
              href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3758027/"
              target="_blank"
              rel="noopener noreferrer"
            >
              NIH — Honey and Its Role in Traditional Medicine
            </a>
            <a
              href="https://www.pnas.org/doi/10.1073/pnas.1514076112"
              target="_blank"
              rel="noopener noreferrer"
            >
              PNAS — Ancient Georgian Honey (5,500 years old)
            </a>
            <a
              href="https://www.britannica.com/place/Great-Pyramid-of-Giza"
              target="_blank"
              rel="noopener noreferrer"
            >
              Britannica — The Great Pyramid of Giza
            </a>
            <a
              href="https://www.metmuseum.org/toah/hd/tut/hd_tut.htm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Metropolitan Museum of Art — Tutankhamun&apos;s Tomb
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="story-footer">
        <div className="footer-content">
          <FooterJarSVG />
          <p className="footer-text">
            Sealed in darkness for three millennia, honey emerged unchanged —
            a golden thread connecting ancient Egypt to your breakfast table.
          </p>
        </div>
      </footer>
    </div>
  );
}

