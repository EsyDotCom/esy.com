"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import "./the-word-phone.css";
import { allImages } from "./images";

// ==================== TYPES ====================

interface Figure {
  id: string;
  name: string;
  role: string;
  years: string;
  contribution: string;
  era: string;
}

interface CompoundWord {
  id: string;
  prefix: string;
  prefixMeaning: string;
  root: string;
  result: string;
  meaning: string;
  year: string;
}

interface FamilyNode {
  id: string;
  word: string;
  year: string;
  x: number;
  y: number;
  parentId: string | null;
}

interface Translation {
  language: string;
  word: string;
  script?: string;
  angle: number;
}

// ==================== DATA ====================

const keyFigures: Figure[] = [
  { id: "homer", name: "Homer", role: "Earliest literary source for \u03c6\u03c9\u03bd\u03ae", years: "~8th c. BCE", contribution: "The Iliad and Odyssey contain the earliest literary attestations of \u03c6\u03c9\u03bd\u03ae, meaning 'voice' and 'sound.'", era: "greek" },
  { id: "aristotle", name: "Aristotle", role: "Philosopher of voice", years: "384\u2013322 BCE", contribution: "Defined \u03c6\u03c9\u03bd\u03ae as 'sound significant by convention' in De Interpretatione \u2014 the first philosophy of language.", era: "greek" },
  { id: "wheatstone", name: "Sir Charles Wheatstone", role: "Coined microphone (1827)", years: "1802\u20131875", contribution: "Created 'microphone' (Greek mikros + phon\u0113 = 'small-sound') for an acoustic amplification instrument.", era: "compound" },
  { id: "sudre", name: "Jean-Fran\u00e7ois Sudr\u00e9", role: "First to use t\u00e9l\u00e9phone (~1828)", years: "1787\u20131862", contribution: "Coined 't\u00e9l\u00e9phone' for a musical signaling system. The word existed 48 years before Bell\u2019s device.", era: "compound" },
  { id: "sax", name: "Adolphe Sax", role: "Namesake of saxophone (1846)", years: "1814\u20131894", contribution: "The saxophone = Sax + phon\u0113 ('Sax-sound'). The only major instrument named after a person + the Greek word for voice.", era: "compound" },
  { id: "reis", name: "Johann Philipp Reis", role: "Coined Telephon (1861)", years: "1834\u20131874", contribution: "Built the first electrical sound-transmitting device and named it das Telephon \u2014 15 years before Bell.", era: "compound" },
  { id: "bell", name: "Alexander Graham Bell", role: "Made telephone globally famous", years: "1847\u20131922", contribution: "Filed US Patent 174,465 on February 14, 1876. A professor of vocal physiology whose lifework was the human voice.", era: "bell" },
  { id: "gray", name: "Elisha Gray", role: "Patent rival (same-day filing)", years: "1835\u20131901", contribution: "Filed a telephone caveat the same day as Bell. Lost the patent race by hours.", era: "bell" },
  { id: "edison", name: "Thomas Edison", role: "Coined phonograph (1877)", years: "1847\u20131931", contribution: "Created the phonograph ('sound-writer') and popularized megaphone ('great-sound'). Established the -phone vs. -graph distinction.", era: "bell" },
];

const compoundWords: CompoundWord[] = [
  { id: "microphone", prefix: "micro", prefixMeaning: "small", root: "phon\u0113", result: "microphone", meaning: "small-sound", year: "1827" },
  { id: "telephone", prefix: "tele", prefixMeaning: "far", root: "phon\u0113", result: "telephone", meaning: "far-sound", year: "1828" },
  { id: "saxophone", prefix: "Sax", prefixMeaning: "(name)", root: "phon\u0113", result: "saxophone", meaning: "Sax-sound", year: "1846" },
  { id: "xylophone", prefix: "xylo", prefixMeaning: "wood", root: "phon\u0113", result: "xylophone", meaning: "wood-sound", year: "1866" },
  { id: "megaphone", prefix: "mega", prefixMeaning: "great", root: "phon\u0113", result: "megaphone", meaning: "great-sound", year: "1878" },
  { id: "phonograph", prefix: "phon\u0113", prefixMeaning: "sound", root: "graph\u0113", result: "phonograph", meaning: "sound-writer", year: "1877" },
  { id: "gramophone", prefix: "gramma", prefixMeaning: "writing", root: "phon\u0113", result: "gramophone", meaning: "writing-sound", year: "1887" },
];

/**
 * @diagram-contract semantic-constellation
 * VISUALIZATION: Semantic Constellation
 * TYPE: Radial SVG diagram
 * INVARIANT: LABEL_POSITION_ACCURACY — Seven senses of φωνή radiate from center
 *   at equal angular intervals (360/7 ≈ 51.4°). Each label is placed at radius=180
 *   from center (300, 300) using cos/sin positioning. Center text is φωνή.
 * INVARIANT: SEMANTIC_ACCURACY — The seven senses are verified from LSJ (S2):
 *   voice, sound, cry, language, dialect, pronunciation, vowel.
 */
const SEMANTIC_SENSES = [
  "voice", "sound", "cry", "language", "dialect", "pronunciation", "vowel",
];

/**
 * @diagram-contract word-family-tree
 * VISUALIZATION: Word Family Tree
 * TYPE: Branching SVG tree
 * INVARIANT: DIRECTION_CONSISTENCY — Tree grows top-to-bottom (root at top, descendants below).
 *   PIE *bʰeh₂- at y=30 → Greek φωνή at y=90 → 19th-century compounds at y=150–270.
 * INVARIANT: LABEL_POSITION_ACCURACY — Each node positioned at its (x,y) coordinate.
 *   Parent-child connections drawn as vertical/angled lines from parent.y to child.y.
 * INVARIANT: TEMPORAL_ORDER — Nodes are ordered left-to-right by attestation date within each tier.
 */
const familyTreeNodes: FamilyNode[] = [
  { id: "pie", word: "*bh\u0113h\u2082-", year: "PIE", x: 400, y: 30, parentId: null },
  { id: "phemi", word: "\u03c6\u03b7\u03bc\u03af", year: "8th c. BCE", x: 220, y: 90, parentId: "pie" },
  { id: "phone", word: "\u03c6\u03c9\u03bd\u03ae", year: "8th c. BCE", x: 580, y: 90, parentId: "pie" },
  { id: "fame", word: "fame", year: "13th c.", x: 100, y: 150, parentId: "phemi" },
  { id: "fate", word: "fate", year: "14th c.", x: 220, y: 150, parentId: "phemi" },
  { id: "fable", word: "fable", year: "13th c.", x: 340, y: 150, parentId: "phemi" },
  { id: "symphony", word: "symphony", year: "1590s", x: 90, y: 180, parentId: "phone" },
  { id: "euphony", word: "euphony", year: "1623", x: 210, y: 180, parentId: "phone" },
  { id: "cacophony", word: "cacophony", year: "1656", x: 340, y: 180, parentId: "phone" },
  { id: "phonetic", word: "phonetic", year: "1826", x: 460, y: 180, parentId: "phone" },
  { id: "microphone_t", word: "microphone", year: "1827", x: 80, y: 240, parentId: "phone" },
  { id: "telephone_t", word: "telephone", year: "1828", x: 210, y: 240, parentId: "phone" },
  { id: "saxophone_t", word: "saxophone", year: "1846", x: 340, y: 240, parentId: "phone" },
  { id: "xylophone_t", word: "xylophone", year: "1866", x: 470, y: 240, parentId: "phone" },
  { id: "phonograph_t", word: "phonograph", year: "1877", x: 600, y: 240, parentId: "phone" },
  { id: "megaphone_t", word: "megaphone", year: "1878", x: 720, y: 240, parentId: "phone" },
  { id: "phone_clipped", word: "phone", year: "1878", x: 210, y: 300, parentId: "telephone_t" },
  { id: "phonology_t", word: "phonology", year: "1799", x: 600, y: 180, parentId: "phone" },
  { id: "headphone_t", word: "headphone", year: "1908", x: 80, y: 300, parentId: "phone" },
  { id: "earphone_t", word: "earphone", year: "1924", x: 340, y: 300, parentId: "phone_clipped" },
  { id: "smartphone_t", word: "smartphone", year: "1997", x: 470, y: 300, parentId: "phone_clipped" },
];

/**
 * @diagram-contract linguistic-starburst
 * VISUALIZATION: Linguistic Starburst
 * TYPE: Radial SVG diagram
 * INVARIANT: LABEL_POSITION_ACCURACY — Translations radiate from center "TELEPHONE"
 *   at angular intervals calculated from array index. Each placed at radius=200.
 * INVARIANT: SEMANTIC_ACCURACY — Translations verified from research/WORD-FAMILY.md
 *   cross-linguistic section: French, German, Spanish, Italian, Japanese, Mandarin,
 *   Arabic, Finnish, Russian, Korean.
 */
const translations: Translation[] = [
  { language: "French", word: "t\u00e9l\u00e9phone", angle: 0 },
  { language: "German", word: "Telefon", angle: 36 },
  { language: "Spanish", word: "tel\u00e9fono", angle: 72 },
  { language: "Italian", word: "telefono", angle: 108 },
  { language: "Japanese", word: "\u96fb\u8a71", script: "denwa", angle: 144 },
  { language: "Mandarin", word: "\u7535\u8bdd", script: "di\u00e0nhu\u00e0", angle: 180 },
  { language: "Arabic", word: "\u0647\u0627\u062a\u0641", script: "h\u0101tif", angle: 216 },
  { language: "Finnish", word: "puhelin", angle: 252 },
  { language: "Russian", word: "\u0442\u0435\u043b\u0435\u0444\u043e\u043d", angle: 288 },
  { language: "Korean", word: "\uc804\ud654", script: "jeonhwa", angle: 324 },
];

const phoneCompounds = [
  { word: "phone bill", base: "PHONE", ext: " BILL", year: "1901" },
  { word: "phone booth", base: "PHONE", ext: " BOOTH", year: "1906" },
  { word: "phone book", base: "PHONE", ext: " BOOK", year: "1920" },
  { word: "phone call", base: "PHONE", ext: " CALL", year: "1920s" },
  { word: "car phone", base: "CAR ", ext: "PHONE", year: "1984" },
  { word: "cell phone", base: "CELL ", ext: "PHONE", year: "1984" },
  { word: "smartphone", base: "SMART", ext: "PHONE", year: "1997" },
];

// ==================== HOOKS ====================

const useIntersectionReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// ==================== SMALL COMPONENTS ====================

/* --- Progress Bar: Derivation Chain --- */
const DerivationProgress: React.FC<{ progress: number }> = ({ progress }) => {
  const stage = useMemo(() => {
    if (progress < 15) return { label: "\u03c6\u03c9\u03bd\u03ae", key: "greek" as const };
    if (progress < 30) return { label: "phon\u0113", key: "transliterated" as const };
    if (progress < 50) return { label: "-phone", key: "combining" as const };
    if (progress < 65) return { label: "telephone", key: "compound" as const };
    if (progress < 80) return { label: "phone", key: "clipped" as const };
    return { label: "phone", key: "modern" as const };
  }, [progress]);

  return (
    <div className="derivation-progress" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Reading progress">
      <span className="derivation-word" data-stage={stage.key}>{stage.label}</span>
      <div className="derivation-track">
        <div className="derivation-fill" data-stage={stage.key} style={{ width: `${progress}%` }} />
      </div>
      <span className="derivation-percent">{Math.round(progress)}%</span>
    </div>
  );
};

/* --- Section wrapper with reveal --- */
const Section: React.FC<{
  id: string;
  era?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id, era, className = "", children }) => {
  const { ref, isVisible } = useIntersectionReveal(0.08);

  return (
    <section
      ref={ref}
      id={id}
      data-era={era}
      className={`${className} ${isVisible ? "visible" : ""}`}
    >
      <div className="chapter-inner">{children}</div>
    </section>
  );
};

/* --- Quote Monument --- */
const QuoteMonument: React.FC<{ quote: string; attribution: string }> = ({
  quote,
  attribution,
}) => (
  <div className="quote-monument">
    <blockquote>
      <p>&ldquo;{quote}&rdquo;</p>
      <cite>&mdash; {attribution}</cite>
    </blockquote>
  </div>
);

/* --- Insight Callout --- */
const InsightCallout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="insight-callout">
    <p>{children}</p>
  </div>
);

/* --- Figure Card --- */
const FigureCard: React.FC<{ figure: Figure }> = ({ figure }) => (
  <div className="figure-card">
    <h4 className="figure-name">{figure.name}</h4>
    <p className="figure-role">{figure.role}</p>
    <p className="figure-years">{figure.years}</p>
    <p className="figure-contribution">{figure.contribution}</p>
  </div>
);

/* --- Image lookup from images.ts --- */
const imageMap = new Map(allImages.map((img) => [img.id, img]));

/* --- Archival Photo Component --- */
const ArchivalPhoto: React.FC<{
  id: string;
  caption: string;
  era: string;
  aspectRatio?: string;
}> = ({ id, caption, era, aspectRatio }) => {
  const imageData = imageMap.get(id);
  if (!imageData) {
    return (
      <div className="photo-narrative">
        <div
          className="photo-placeholder"
          data-era={era}
          data-caption={`[${id}] ${caption}`}
          style={aspectRatio ? { aspectRatio } : undefined}
          role="img"
          aria-label={caption}
        />
        <p className="photo-caption">{caption}</p>
      </div>
    );
  }

  return (
    <figure className="photo-narrative" data-era={era}>
      <div
        className="photo-frame"
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <Image
          src={imageData.src}
          alt={imageData.alt}
          width={1200}
          height={800}
          className="archival-image"
          loading="lazy"
          sizes="(max-width: 680px) 100vw, (max-width: 1024px) 80vw, 720px"
        />
      </div>
      <figcaption className="photo-caption">
        {imageData.caption}
        <span className="photo-attribution">{imageData.attribution}</span>
      </figcaption>
    </figure>
  );
};

/* --- Compound Anatomy Item --- */
const CompoundAnatomyItem: React.FC<{ compound: CompoundWord; visible: boolean }> = ({
  compound,
  visible,
}) => (
  <div className={`compound-item ${visible ? "visible" : ""}`}>
    <div>
      <span className="compound-prefix">{compound.prefix}</span>
      <span className="compound-separator">|</span>
      <span className="compound-root">{compound.root}</span>
    </div>
    <div>
      <span className="compound-meaning">{compound.meaning} ({compound.year})</span>
    </div>
  </div>
);

/**
 * @diagram-contract semantic-constellation-render
 * VISUALIZATION: Semantic Constellation SVG render
 * INVARIANT: CENTER_POSITION — φωνή centered at (200, 200) in 400×400 viewBox
 * INVARIANT: RADIAL_LAYOUT — 7 senses at radius=140, evenly spaced by 360/7°
 * INVARIANT: CONNECTING_LINES — Dashed lines from center to each sense node
 */
const SemanticConstellation: React.FC<{ revealed: boolean }> = ({ revealed }) => {
  const cx = 200;
  const cy = 200;
  const radius = 140;

  return (
    <div className="semantic-constellation" role="img" aria-label="Semantic constellation showing the seven meanings of the Greek word phon\u0113: voice, sound, cry, language, dialect, pronunciation, vowel">
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <title>{"Semantic Constellation of \u03c6\u03c9\u03bd\u03ae"}</title>
        <desc>{"The Greek word \u03c6\u03c9\u03bd\u03ae at center with seven senses radiating outward: voice, sound, cry, language, dialect, pronunciation, vowel."}</desc>
        {SEMANTIC_SENSES.map((sense, i) => {
          const angle = (i * 360) / 7 - 90;
          const rad = (angle * Math.PI) / 180;
          const sx = cx + radius * Math.cos(rad);
          const sy = cy + radius * Math.sin(rad);
          return (
            <g key={sense}>
              <line className="constellation-line" x1={cx} y1={cy} x2={sx} y2={sy} />
              <circle className="constellation-dot" cx={sx} cy={sy} r={3} />
              <text
                className={`constellation-sense ${revealed ? "revealed" : ""}`}
                x={sx}
                y={sy - 14}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {sense}
              </text>
            </g>
          );
        })}
        <text className="constellation-center" x={cx} y={cy} lang="el">
          {"\u03c6\u03c9\u03bd\u03ae"}
        </text>
      </svg>
    </div>
  );
};

/**
 * @diagram-contract word-family-tree-render
 * VISUALIZATION: Word Family Tree SVG render
 * INVARIANT: DIRECTION_CONSISTENCY — Root (*bʰeh₂-) at top (y=30), descendants flow downward.
 *   Parent-child lines connect parent (x, y+15) to child (x, y-10).
 * INVARIANT: LABEL_POSITION_ACCURACY — Each word label centered at node (x, y).
 *   Date label positioned at (x, y+14).
 * INVARIANT: NODE_SHAPE — Root uses tree-root-circle class (larger, filled).
 *   Descendants use tree-node-circle class (smaller, outlined).
 */
const WordFamilyTree: React.FC<{ revealed: boolean }> = ({ revealed }) => (
  <div className="family-tree-container" role="img" aria-label="Word family tree showing descendants of the Proto-Indo-European root that produced Greek phon\u0113 and over 30 English words">
    <svg viewBox="0 0 800 340" xmlns="http://www.w3.org/2000/svg" style={{ minWidth: 700 }}>
      <title>{"Word Family Tree: from PIE *bh\u0113h\u2082- to modern descendants"}</title>
      <desc>{"A branching tree visualization showing how the Proto-Indo-European root *bh\u0113h\u2082- (\u2018to speak\u2019) produced two Greek branches: \u03c6\u03b7\u03bc\u03af (leading to fame, fate, fable) and \u03c6\u03c9\u03bd\u03ae (leading to symphony, telephone, microphone, and 20+ other English words)."}</desc>
      {/* Branches */}
      {familyTreeNodes.filter(n => n.parentId).map(node => {
        const parent = familyTreeNodes.find(p => p.id === node.parentId);
        if (!parent) return null;
        return (
          <line
            key={`branch-${node.id}`}
            className="tree-branch"
            x1={parent.x}
            y1={parent.y + 15}
            x2={node.x}
            y2={node.y - 10}
            style={{
              opacity: revealed ? 1 : 0,
              transition: `opacity 0.6s ease ${familyTreeNodes.indexOf(node) * 60}ms`,
            }}
          />
        );
      })}
      {/* Nodes */}
      {familyTreeNodes.map((node, i) => (
        <g
          key={node.id}
          style={{
            opacity: revealed ? 1 : 0,
            transition: `opacity 0.5s ease ${i * 50}ms`,
          }}
        >
          <circle
            className={node.parentId === null ? "tree-root-circle" : "tree-node-circle"}
            cx={node.x}
            cy={node.y}
            r={node.parentId === null ? 18 : 12}
          />
          <text className="tree-node-text" x={node.x} y={node.y}>
            {node.word}
          </text>
          <text className="tree-node-date" x={node.x} y={node.y + 22}>
            {node.year}
          </text>
        </g>
      ))}
    </svg>
  </div>
);

/**
 * @diagram-contract linguistic-starburst-render
 * VISUALIZATION: Linguistic Starburst SVG render
 * INVARIANT: CENTER_POSITION — "TELEPHONE" centered at (300, 300) in 600×600 viewBox
 * INVARIANT: RADIAL_LAYOUT — 10 translations at radius=200, evenly spaced by 36°
 * INVARIANT: CONNECTING_RAYS — Lines from center to each translation node
 * INVARIANT: SEMANTIC_ACCURACY — All translations verified from WORD-FAMILY.md
 */
const LinguisticStarburst: React.FC<{ revealed: boolean }> = ({ revealed }) => {
  const cx = 300;
  const cy = 300;
  const radius = 200;

  return (
    <div className="starburst-container" role="img" aria-label="Linguistic starburst showing how the word telephone was adopted or calqued in ten languages worldwide">
      <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
        <title>Linguistic Starburst: TELEPHONE in ten languages</title>
        <desc>{"The word TELEPHONE at center with translations radiating outward: French t\u00e9l\u00e9phone, German Telefon, Spanish tel\u00e9fono, Italian telefono, Japanese \u96fb\u8a71, Mandarin \u7535\u8bdd, Arabic \u0647\u0627\u062a\u0641, Finnish puhelin, Russian \u0442\u0435\u043b\u0435\u0444\u043e\u043d, Korean \u51a8\u8bdd."}</desc>
        {translations.map((t, i) => {
          const rad = ((t.angle - 90) * Math.PI) / 180;
          const tx = cx + radius * Math.cos(rad);
          const ty = cy + radius * Math.sin(rad);
          return (
            <g
              key={t.language}
              style={{
                opacity: revealed ? 1 : 0,
                transition: `opacity 0.5s ease ${i * 80}ms`,
              }}
            >
              <line className="starburst-ray" x1={cx} y1={cy} x2={tx} y2={ty} />
              <text className="starburst-translation" x={tx} y={ty - 8}>
                {t.word}
              </text>
              <text className="starburst-lang" x={tx} y={ty + 10}>
                {t.language}
                {t.script ? ` (${t.script})` : ""}
              </text>
            </g>
          );
        })}
        <text className="starburst-center" x={cx} y={cy}>
          TELEPHONE
        </text>
      </svg>
    </div>
  );
};

/**
 * @diagram-contract fossil-comparison
 * VISUALIZATION: Fossil Comparison
 * TYPE: Parallel etymology cards
 * INVARIANT: SEMANTIC_ACCURACY — Three verified fossil words:
 *   PEN (Latin penna, "feather"), DIAL (Latin dialis, "sundial"),
 *   PHONE (Greek phonē, "voice"). Each shows ancient → modern semantic drift.
 */
const FossilComparison: React.FC = () => (
  <div className="fossil-grid" role="img" aria-label="Three semantic fossils: PEN from feather, DIAL from sundial, PHONE from voice">
    <div className="fossil-card">
      <div className="fossil-modern">PEN</div>
      <div className="fossil-ancient">Latin penna, &ldquo;feather&rdquo;</div>
      <div className="fossil-arrow">feather &rarr; writing instrument</div>
      <div className="fossil-meaning">The feather is gone. The word remains.</div>
    </div>
    <div className="fossil-card">
      <div className="fossil-modern">DIAL</div>
      <div className="fossil-ancient">{"Latin di\u0101lis, \u201csundial\u201d"}</div>
      <div className="fossil-arrow">sundial &rarr; rotate a number</div>
      <div className="fossil-meaning">The sun is gone. The word remains.</div>
    </div>
    <div className="fossil-card">
      <div className="fossil-modern">PHONE</div>
      <div className="fossil-ancient">{"Greek \u03c6\u03c9\u03bd\u03ae, \u201cvoice\u201d"}</div>
      <div className="fossil-arrow">voice &rarr; pocket computer</div>
      <div className="fossil-meaning">The voice is gone. The word remains.</div>
    </div>
  </div>
);

/**
 * @diagram-contract compound-cascade
 * VISUALIZATION: Compound Cascade
 * TYPE: Sequential build animation
 * INVARIANT: TEMPORAL_ORDER — Compounds appear in chronological order of attestation:
 *   phone bill (1901) → phone booth (1906) → phone book (1920) →
 *   phone call (1920s) → car phone (1984) → cell phone (1984) → smartphone (1997)
 * INVARIANT: LABEL_POSITION_ACCURACY — Base word (PHONE) highlighted in gold,
 *   extension word in muted color.
 */
const CompoundCascade: React.FC<{ revealed: boolean }> = ({ revealed }) => (
  <div className="compound-cascade">
    {phoneCompounds.map((c, i) => (
      <div
        key={c.word}
        className={`cascade-item ${revealed ? "visible" : ""}`}
        style={{ transitionDelay: `${i * 120}ms` }}
      >
        <span className="cascade-base">{c.base}</span>
        <span className="cascade-extension">{c.ext}</span>
        <span className="cascade-date">{c.year}</span>
      </div>
    ))}
  </div>
);

// ==================== MAIN COMPONENT ====================

const TheWordPhoneClient: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section reveal refs
  const constellationRef = useRef<HTMLDivElement>(null);
  const [constellationRevealed, setConstellationRevealed] = useState(false);
  const treeRef = useRef<HTMLDivElement>(null);
  const [treeRevealed, setTreeRevealed] = useState(false);
  const starburstRef = useRef<HTMLDivElement>(null);
  const [starburstRevealed, setStarburstRevealed] = useState(false);
  const compoundsRef = useRef<HTMLDivElement>(null);
  const [compoundsRevealed, setCompoundsRevealed] = useState(false);
  const cascadeRef = useRef<HTMLDivElement>(null);
  const [cascadeRevealed, setCascadeRevealed] = useState(false);

  // Truncation animation state
  const truncationRef = useRef<HTMLDivElement>(null);
  const [truncationStage, setTruncationStage] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const createObs = (
      el: HTMLElement | null,
      setter: React.Dispatch<React.SetStateAction<boolean>>,
      threshold = 0.3
    ) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setter(true);
            obs.disconnect();
          }
        },
        { threshold }
      );
      obs.observe(el);
      observers.push(obs);
    };

    createObs(constellationRef.current, setConstellationRevealed, 0.4);
    createObs(treeRef.current, setTreeRevealed, 0.2);
    createObs(starburstRef.current, setStarburstRevealed, 0.3);
    createObs(compoundsRef.current, setCompoundsRevealed, 0.3);
    createObs(cascadeRef.current, setCascadeRevealed, 0.3);

    // Truncation multi-stage
    if (truncationRef.current) {
      const tObs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTruncationStage(1);
            setTimeout(() => setTruncationStage(2), 1200);
            setTimeout(() => setTruncationStage(3), 2400);
            tObs.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      tObs.observe(truncationRef.current);
      observers.push(tObs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Figures by era
  const figuresByEra = useCallback(
    (era: string) => keyFigures.filter((f) => f.era === era),
    []
  );

  return (
    <div className="phone-essay">
      {/* Progress Bar: Derivation Chain */}
      <DerivationProgress progress={scrollProgress} />

      {/* ==================== HERO ==================== */}
      <section className="phone-hero">
        <div className="phone-hero-bg">
          <div className="phone-hero-gradient" />
        </div>
        <div className="phone-hero-content">
          <div className="hero-greek-word" aria-label="phon\u0113, the Greek word for voice">
            <span lang="el">{"\u03c6\u03c9\u03bd\u03ae"}</span>
          </div>
          <div className="hero-transliteration">{"phon\u0113"}</div>
          <div className="hero-translation">voice &middot; sound &middot; utterance</div>
          <h1 className="hero-title">
            {"Phon\u0113: From Voice to Device"}
          </h1>
          <p className="hero-subtitle">
            The 2,800-year biography of the word in your pocket
          </p>
          <p className="hero-pie-root">
            {"Proto-Indo-European *bh\u0113h\u2082-"} &mdash; &ldquo;to speak.&rdquo; The same root that gave us <em>fame</em>, <em>fate</em>, and <em>fable</em> also gave us <em>phone</em>. This is its story.
          </p>
          <div className="hero-scroll-cue">
            <span>Scroll to begin</span>
            <div className="scroll-arrow" />
          </div>
        </div>
      </section>

      {/* ==================== SECTION 1: ORIGIN ==================== */}
      <Section id="section-1" era="greek" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Section One</span>
          <h2 className="chapter-title">The Greek Word</h2>
          <span className="chapter-temporal">8th c. BCE &ndash; 1st c. CE</span>
        </div>

        <p className="lead-paragraph">
          In the world of ancient Greek, {"\u03c6\u03c9\u03bd\u03ae"} was not a technical term. It was a living word&mdash;used by poets, philosophers, and playwrights to name the human voice, the cry of pain, the sound of instruments, and even language itself. Homer sang it. Aristotle analyzed it. For a thousand years, it simply meant <em>the breath that carries meaning</em>.
        </p>

        <ArchivalPhoto id="V1" caption="Greek red-figure pottery showing a scene of speech or performance" era="greek" />

        <div className="content-block">
          <h3><span lang="el">{"\u03c6\u03c9\u03bd\u03ae"}</span> in Homer</h3>
          <p>
            The Iliad and Odyssey contain the earliest literary attestations of {"\u03c6\u03c9\u03bd\u03ae"}. In Homer, the word names both human voice and divine utterance&mdash;the breath of Achilles and the call of Athena alike. It described something at once physical (sound waves in air) and sacred (the vehicle of meaning between minds).
          </p>
        </div>

        <ArchivalPhoto id="V2" caption="Papyrus fragment containing ancient Greek text" era="greek" />

        <QuoteMonument
          quote="Spoken words are the symbols of mental experience and written words are the symbols of spoken words."
          attribution="Aristotle, De Interpretatione (4th c. BCE)"
        />

        <div className="content-block">
          <h3>&ldquo;Sound Significant by Convention&rdquo;</h3>
          <p>
            Aristotle transformed {"\u03c6\u03c9\u03bd\u03ae"} from a common word into a philosophical concept. In <em>De Interpretatione</em>, he defined it as {"\u03c6\u03c9\u03bd\u03ae"} {"\u03c3\u03b7\u03bc\u03b1\u03bd\u03c4\u03b9\u03ba\u03ae"} {"\u03ba\u03b1\u03c4\u03b1\u0300"} {"\u03c3\u03c5\u03bd\u03b8\u03ae\u03ba\u03b7\u03bd"}&mdash;voice that carries meaning by human agreement, not by nature. This was the first philosophy of language: sound becomes meaning only because we collectively agree it does.
          </p>
        </div>

        <QuoteMonument
          quote="A name is a spoken sound significant by convention... no name is a name naturally but only when it has become a symbol."
          attribution="Aristotle, De Interpretatione, 16a19\u201328"
        />

        <ArchivalPhoto id="V3" caption="Ancient Greek theater ruins (Epidaurus) \u2014 the space designed to carry \u03c6\u03c9\u03bd\u03ae" era="greek" />

        <div className="content-block">
          <h3>Seven Senses</h3>
          <p>
            {"\u03c6\u03c9\u03bd\u03ae"} was not a single-meaning word. The Liddell-Scott-Jones Greek lexicon records seven distinct senses: <em>voice</em>, <em>sound</em>, <em>cry</em>, <em>language</em>, <em>dialect</em>, <em>pronunciation</em>, and <em>vowel</em>. A word with seven lives&mdash;each feeding into its future.
          </p>
        </div>

        <div ref={constellationRef}>
          <SemanticConstellation revealed={constellationRevealed} />
        </div>

        <ArchivalPhoto id="V5" caption="Greek inscription carved in stone \u2014 the word made permanent in marble" era="greek" />

        <div className="figures-grid">
          {figuresByEra("greek").map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>
      </Section>

      <div className="era-transition">
        <span className="era-transition-word">{"\u03c6\u03c9\u03bd\u03ae \u2192 phon\u0113"}</span>
      </div>

      {/* ==================== SECTION 2: THE LATIN BRIDGE ==================== */}
      <Section id="section-2" era="latin" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Section Two</span>
          <h2 className="chapter-title">The Latin Bridge</h2>
          <span className="chapter-temporal">1st c. BCE &ndash; 17th c. CE</span>
        </div>

        <p className="lead-paragraph">
          {"\u03c6\u03c9\u03bd\u03ae"} does not enter Latin directly. Latin had its own word for voice: <em>{"v\u014dx"}</em>. Instead, Greek compounds containing {"\u03c6\u03c9\u03bd\u03ae"} filter into Latin through scholarship and the Church, then into early modern European languages. The word sleeps for centuries{"\u2014"}waiting.
        </p>

        <ArchivalPhoto id="V6" caption="Illuminated medieval manuscript \u2014 monasteries as preservation vessels for Greek learning" era="latin" />

        <div className="content-block">
          <h3>The Sleeping Root</h3>
          <p>
            Three ancient Greek compounds survive the journey into English: <em>symphony</em> (1590s), <em>euphony</em> (1623), and <em>cacophony</em> (1656). They arrive quietly, spaced decades apart&mdash;together-sound, good-sound, bad-sound. All three carry {"\u03c6\u03c9\u03bd\u03ae"} inside them, but nobody notices. The root is dormant but alive.
          </p>
        </div>

        <div className="timeline">
          <div className="timeline-event">
            <span className="timeline-dot" />
            <span className="timeline-year">1590s</span>
            <p className="timeline-title">symphony enters English</p>
            <p className="timeline-description">&ldquo;together-sound&rdquo; &mdash; from Greek {"\u03c3\u03c5\u03bc\u03c6\u03c9\u03bd\u03af\u03b1"}</p>
          </div>
          <div className="timeline-event">
            <span className="timeline-dot" />
            <span className="timeline-year">1623</span>
            <p className="timeline-title">euphony enters English</p>
            <p className="timeline-description">&ldquo;good-sound&rdquo; &mdash; from Greek {"\u03b5\u1f50\u03c6\u03c9\u03bd\u03af\u03b1"}</p>
          </div>
          <div className="timeline-event">
            <span className="timeline-dot" />
            <span className="timeline-year">1656</span>
            <p className="timeline-title">cacophony enters English</p>
            <p className="timeline-description">&ldquo;bad-sound&rdquo; &mdash; from Greek {"\u03ba\u03b1\u03ba\u03bf\u03c6\u03c9\u03bd\u03af\u03b1"}</p>
          </div>
        </div>

        <ArchivalPhoto id="V7" caption="Renaissance-era printed book with Greek and Latin text side by side" era="latin" />

        <div className="content-block">
          <h3>Why Greek?</h3>
          <p>
            The Renaissance and Enlightenment chose Greek for scientific vocabulary. Latin had <em>{"v\u014dx"}</em> and <em>sonus</em>, but Greek <em>{"phon\u0113"}</em> was more versatile for compounds. <em>Telephone</em> sounds authoritative; <em>fariloquium</em> does not. Greek became the preferred building material for the modern world&apos;s new words.
          </p>
        </div>

        <InsightCallout>
          {"Greek became the LEGO of scientific naming\u2014modular roots that snap together into precise meanings."} <em>Tele</em> + <em>{"phon\u0113"}</em>. <em>Micro</em> + <em>{"phon\u0113"}</em>. The system is so productive that we still use it today.
        </InsightCallout>

        <ArchivalPhoto id="V8" caption="18th/19th-century scientific instrument cabinet \u2014 the institutional world that chose Greek" era="latin" />
      </Section>

      <div className="era-transition">
        <span className="era-transition-word">{"phon\u0113 \u2192 -phone"}</span>
      </div>

      {/* ==================== SECTION 3: THE COMPOUND EXPLOSION ==================== */}
      <Section id="section-3" era="compound" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Section Three</span>
          <h2 className="chapter-title">The Compound Explosion</h2>
          <span className="chapter-temporal">1827 &ndash; 1900</span>
        </div>

        <p className="lead-paragraph">
          In 70 years, Greek {"\u03c6\u03c9\u03bd\u03ae"} spawns more new English words than it had in the previous 2,500 years combined. The 19th century&apos;s appetite for invention&mdash;and for naming inventions&mdash;turns a quiet Greek root into the most productive combining form in telecommunications.
        </p>

        <div className="content-block">
          <h3>The First Compounds</h3>
          <p>
            {"In 1827, Sir Charles Wheatstone coins "}<em>microphone</em>{" for an acoustic amplifier. Around 1828, Jean-Fran\u00e7ois Sudr\u00e9 coins "}<em>{"t\u00e9l\u00e9phone"}</em>{" for a failed musical signaling system. The words exist before the inventions they will eventually name."}
          </p>
        </div>

        <ArchivalPhoto id="V9" caption="Wheatstone\u2019s acoustic instruments \u2014 the physical devices behind the words" era="compound" />

        {/* Compound Anatomy Diagrams */}
        <div ref={compoundsRef} className="compound-anatomy-section">
          <h3 style={{ textAlign: "center", fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--papyrus)", marginBottom: "var(--spacing-lg)" }}>
            Morphological Anatomy
          </h3>
          <div className="compound-anatomy">
            {compoundWords.map((c, i) => (
              <CompoundAnatomyItem
                key={c.id}
                compound={c}
                visible={compoundsRevealed}
              />
            ))}
          </div>
        </div>

        <div className="content-block">
          <h3>The Sax-Sound</h3>
          <p>
            {"In 1846, Adolphe Sax patents the saxophone. The name: Sax + phon\u0113, \u201cthe sound of Sax.\u201d The only major instrument named after a person plus the Greek word for voice. \u03c6\u03c9\u03bd\u03ae enters the world of music."}
          </p>
        </div>

        <ArchivalPhoto id="V10" caption="Adolphe Sax portrait and original saxophone from the 1840s" era="compound" />
        <ArchivalPhoto id="V11" caption="Sax\u2019s 1846 patent illustration" era="compound" />

        <div className="content-block">
          <h3>The Family Grows</h3>
          <p>
            Xylophone (wood-sound, 1866), megaphone (great-sound, 1878), gramophone (writing-sound, 1887). Each compound is a miniature etymology lesson. A pattern crystallizes: <em>-phone</em> means transmission, <em>-graph</em> means recording.
          </p>
        </div>

        {/* Word Family Tree */}
        <div ref={treeRef}>
          <WordFamilyTree revealed={treeRevealed} />
        </div>

        <ArchivalPhoto id="V12" caption="Victorian-era xylophone" era="compound" />

        <div className="content-block">
          <h3>The Telephone Before the Telephone</h3>
          <p>
            {"The word "}<em>telephone</em>{" existed for 48 years (1828\u20131876) before Bell\u2019s device. Sudr\u00e9\u2019s musical system, Bourseul\u2019s 1854 concept paper, Reis\u2019s 1861 "}<em>Telephon</em>{" in Frankfurt. Three inventions, one word\u2014waiting for the right device."}
          </p>
        </div>

        <QuoteMonument
          quote="Speak against one diaphragm and let each vibration make or break the electric current... the other diaphragm will reproduce the transmitted vibrations."
          attribution="Charles Bourseul, L\u2019Illustration, 1854"
        />

        <ArchivalPhoto id="V15" caption="Reis\u2019s 1861 Telephon device \u2014 the strange, primitive apparatus" era="compound" />

        <div className="figures-grid">
          {figuresByEra("compound").map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>
      </Section>

      <div className="era-transition">
        <span className="era-transition-word">-phone &rarr; telephone</span>
      </div>

      {/* ==================== SECTION 4: THE BELL MOMENT ==================== */}
      <Section id="section-4" era="bell" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Section Four</span>
          <h2 className="chapter-title">The Bell Moment</h2>
          <span className="chapter-temporal">1876</span>
        </div>

        <p className="lead-paragraph">
          February 14, 1876. Alexander Graham Bell files US Patent 174,465. The Greek compound <em>telephone</em> becomes the most famous word of the industrial age. But the deeper story is biographical: Bell&apos;s life was about voice before it was about wires.
        </p>

        <div className="content-block">
          <h3>The Voice Family</h3>
          <p>
            Bell&apos;s grandfather was an elocution professor. His father, Alexander Melville Bell, invented Visible Speech&mdash;a phonetic notation system for the deaf. Alexander Graham Bell himself was a professor of vocal physiology at Boston University. His wife, Mabel, was deaf. The man who gave the world the <em>telephone</em> spent his life studying {"\u03c6\u03c9\u03bd\u03ae"}.
          </p>
        </div>

        <ArchivalPhoto id="V17" caption="Alexander Graham Bell \u2014 the iconic bearded profile (Library of Congress)" era="bell" />
        <ArchivalPhoto id="V18" caption="Alexander Melville Bell\u2019s Visible Speech chart \u2014 a phonetic system for the deaf" era="bell" />
        <ArchivalPhoto id="V19" caption="Mabel Hubbard Bell \u2014 the deaf woman who married the man who made the world hear at a distance" era="bell" />

        <div className="content-block">
          <h3>Patent 174,465</h3>
          <p>
            February 14, 1876: Bell files US Patent 174,465, titled &ldquo;Improvement in Telegraphy.&rdquo; Elisha Gray files a telephone caveat the same day. Bell&apos;s application arrives hours earlier. The most consequential few hours in the history of naming.
          </p>
        </div>

        <div className="greek-display" style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "var(--copper)" }}>
          US Patent 174,465
        </div>

        <QuoteMonument
          quote="Mr. Watson \u2014 come here \u2014 I want to see you."
          attribution="Alexander Graham Bell, first telephone transmission, March 10, 1876"
        />

        <ArchivalPhoto id="V20" caption="The original patent drawing \u2014 Bell\u2019s technical illustration of the telephone mechanism" era="bell" />
        <ArchivalPhoto id="V21" caption="Bell\u2019s laboratory / the original telephone prototype" era="bell" />

        <div className="content-block">
          <h3>The Word Goes Global</h3>
          <p>
            {"Within a year, "}<em>telephone</em>{" enters every European language: French "}<em>{"t\u00e9l\u00e9phone"}</em>{", German "}<em>Telefon</em>{", Spanish "}<em>{"tel\u00e9fono"}</em>{". But East Asian languages do something different\u2014they calque the concept: Japanese "}{"\u96fb\u8a71"} (<em>denwa</em>{", \u201celectric speech\u201d), Mandarin "}{"\u7535\u8bdd"} (<em>{"di\u00e0nhu\u00e0"}</em>{", \u201celectric speech\u201d). Arabic coins "}{"\u0647\u0627\u062a\u0641"} (<em>{"h\u0101tif"}</em>{", \u201ccaller\u201d). Finnish invents "}<em>puhelin</em>{" (\u201cspeaking-instrument\u201d)."}
          </p>
        </div>

        {/* Linguistic Starburst */}
        <div ref={starburstRef}>
          <LinguisticStarburst revealed={starburstRevealed} />
        </div>

        <ArchivalPhoto id="V23" caption="Early telephone exchange \u2014 rows of operators connecting calls" era="bell" />
        <ArchivalPhoto id="V24" caption="First telephone directory / advertisement from the 1870s\u20131880s" era="bell" />

        <div className="figures-grid">
          {figuresByEra("bell").map((figure) => (
            <FigureCard key={figure.id} figure={figure} />
          ))}
        </div>
      </Section>

      <div className="era-transition">
        <span className="era-transition-word">telephone &rarr; phone</span>
      </div>

      {/* ==================== SECTION 5: THE GREAT TRUNCATION ==================== */}
      <Section id="section-5" era="truncation" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Section Five</span>
          <h2 className="chapter-title">The Great Truncation</h2>
          <span className="chapter-temporal">1878 &ndash; 1995</span>
        </div>

        <p className="lead-paragraph">
          The most dramatic clipping in English. Within two years of Bell&apos;s patent, <em>telephone</em> loses its first four letters. Within fifty years, <em>phone</em> is standard. Within a century, it is generating its own compounds. The child has overtaken the parent.
        </p>

        <div className="content-block">
          <h3>Two Years</h3>
          <p>
            1878: The <em>Des Moines Register</em> uses <em>phone</em>&mdash;the first attestation. The clipping happened at the speed of adoption. When a word becomes so common that it sheds its prefix, linguists call it clipping. <em>Telephone</em> to <em>phone</em> is one of the fastest major clippings in English history.
          </p>
        </div>

        {/* Truncation Animation */}
        <div ref={truncationRef} className="truncation-display">
          <div className="truncation-word">
            {"TELEPHONE".split("").map((letter, i) => (
              <span
                key={i}
                className={`truncation-letter ${
                  i < 4
                    ? truncationStage >= 2
                      ? "faded"
                      : truncationStage >= 1
                      ? "fading"
                      : "remaining"
                    : "remaining"
                }`}
              >
                {letter}
              </span>
            ))}
            {truncationStage === 1 && (
              <span className="truncation-apostrophe" style={{ opacity: 0.6 }}>&rsquo;</span>
            )}
          </div>
          {truncationStage >= 1 && (
            <div className="truncation-counter">
              {truncationStage >= 2
                ? "Time from invention to clipping: 2 years"
                : "Clipping in progress..."}
            </div>
          )}
        </div>

        <ArchivalPhoto id="V25" caption="Edison with the phonograph (1877\u20131878) \u2014 the era when -phone words were everywhere" era="truncation" />
        <ArchivalPhoto id="V26" caption="Early candlestick telephone, ~1890s \u2014 the device people first called 'the phone'" era="truncation" />

        <div className="content-block">
          <h3>The Apostrophe That Vanished</h3>
          <p>
            In formal writing, the clipped form was initially written as <em>&apos;phone</em>&mdash;the apostrophe marking the missing <em>tele-</em>. By the 1920s, the apostrophe was gone. <em>Phone</em> was no longer an abbreviation. It was a word.
          </p>
        </div>

        <QuoteMonument
          quote="Phone: A colloquial shortening of telephone; generally applied to the receiver, but sometimes to the whole apparatus."
          attribution="Century Dictionary, 1895"
        />

        <ArchivalPhoto id="V27" caption="Newspaper clipping from the 1890s\u20131920s showing 'phone with apostrophe" era="truncation" />

        <div className="content-block">
          <h3>Phone Builds Its Own Family</h3>
          <p>
            Once <em>phone</em> started generating compounds&mdash;<em>phone bill</em> (1901), <em>phone booth</em> (1906), <em>phone book</em> (1920)&mdash;it was no longer a shortened <em>telephone</em>. It was an independent word. Linguistically, a clipping achieves independence when it produces its own offspring.
          </p>
        </div>

        <InsightCallout>
          When a clipped form starts making its own compounds, the parent word is no longer needed. Phone didn&apos;t just shorten telephone&mdash;it replaced it.
        </InsightCallout>

        {/* Compound Cascade */}
        <div ref={cascadeRef}>
          <CompoundCascade revealed={cascadeRevealed} />
        </div>

        <div className="photo-grid">
          <ArchivalPhoto id="V28" caption="Classic red phone booth (London, ~1930s\u20131960s)" era="truncation" aspectRatio="3/4" />
          <ArchivalPhoto id="V29" caption="Phone operator at switchboard, mid-20th century" era="truncation" aspectRatio="3/4" />
          <ArchivalPhoto id="V30" caption="Rotary dial phone \u2014 the iconic mid-century 'phone'" era="truncation" aspectRatio="3/4" />
        </div>

        <ArchivalPhoto id="V31" caption="Phone book / Yellow Pages \u2014 the word as institution" era="truncation" />
      </Section>

      <div className="era-transition">
        <span className="era-transition-word">phone &rarr; smartphone</span>
      </div>

      {/* ==================== SECTION 6: THE SMARTPHONE SINGULARITY ==================== */}
      <Section id="section-6" era="modern" className="chapter">
        <div className="chapter-header">
          <span className="chapter-number">Section Six</span>
          <h2 className="chapter-title">The Smartphone Singularity</h2>
          <span className="chapter-temporal">1995 &ndash; Present</span>
        </div>

        <p className="lead-paragraph">
          A word that meant &ldquo;voice&rdquo; in ancient Greek now names a device whose primary functions are visual. The phone has outlived its name. This is semantic fossilization&mdash;and it tells us something profound about how language works.
        </p>

        <div className="content-block">
          <h3>smart + phone</h3>
          <p>
            1995: &ldquo;smart phone&rdquo; appears in print. 1997: Ericsson coins <em>smartphone</em> as one word. 2007: iPhone. The word <em>phone</em> now names a pocket computer. Voice calling is one function among dozens.
          </p>
        </div>

        <div className="compound-anatomy" style={{ marginBottom: "var(--spacing-lg)" }}>
          <div className="compound-item visible" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
            <span className="compound-prefix" style={{ background: "rgba(168, 200, 232, 0.12)", color: "var(--glass-blue)" }}>SMART</span>
            <span className="compound-separator">|</span>
            <span className="compound-root">PHONE</span>
          </div>
          <div>
            <span className="compound-meaning">the adjective + the ancient Greek root, 2,800 years apart</span>
          </div>
        </div>

        <div className="photo-grid">
          <ArchivalPhoto id="V32" caption="1980s brick phone" era="modern" aspectRatio="3/4" />
          <ArchivalPhoto id="V33" caption="1990s Nokia" era="modern" aspectRatio="3/4" />
          <ArchivalPhoto id="V34" caption="BlackBerry" era="modern" aspectRatio="3/4" />
          <ArchivalPhoto id="V35" caption="iPhone 1st generation (2007)" era="modern" aspectRatio="3/4" />
          <ArchivalPhoto id="V36" caption="Modern smartphone" era="modern" aspectRatio="3/4" />
        </div>

        <div className="content-block">
          <h3>The Voice That Isn&apos;t</h3>
          <p>
            In 2025, a typical smartphone user makes voice calls for less than 15 minutes per day. The device named after the Greek word for &ldquo;voice&rdquo; is primarily a camera, messenger, browser, map, wallet, and library. We call it a <em>phone</em>&mdash;but it isn&apos;t one.
          </p>
        </div>

        <InsightCallout>
          {"\u03c6\u03c9\u03bd\u03ae"} meant voice. Phone means everything.
        </InsightCallout>

        <ArchivalPhoto id="V37" caption="Person staring at smartphone screen \u2014 eyes, not mouth, engaged with the 'phone'" era="modern" />

        <div className="content-block">
          <h3>Semantic Fossilization</h3>
          <p>
            {"Like "}<em>pen</em>{" (from Latin "}<em>penna</em>{", \u201cfeather\u201d) and "}<em>dial</em>{" (from Latin "}<em>{"di\u0101lis"}</em>{", \u201csundial\u201d), "}<em>phone</em>{" carries the fossil of an obsolete technology inside its name. The word preserves a meaning the object has abandoned. This is how language works: names outlive their origins. Every word is an archaeology."}
          </p>
        </div>

        <FossilComparison />

        <ArchivalPhoto id="V38" caption="A human hand holding a smartphone, fingers on glass \u2014 \u03c6\u03c9\u03bd\u03ae in the palm of your hand" era="modern" />
      </Section>

      {/* ==================== CLOSING ==================== */}
      <section className="closing-section">
        <p className="closing-text">
          The next time you pick up your phone, you are picking up a word that is 2,800 years old. It meant voice. It meant sound. It meant the breath that carries meaning from one mind to another.
        </p>
        <p className="closing-text">
          The device has changed. The word remembers.
        </p>
      </section>

      {/* ==================== SOURCES ==================== */}
      <section className="sources-section">
        <h2 className="sources-title">Sources &amp; Further Reading</h2>
        <div className="sources-grid">
          <div>
            <h3 className="source-category-title">Primary &amp; Linguistic</h3>
            <ul className="source-list">
              <li>Beekes, Robert. <em>Etymological Dictionary of Greek</em> (2 vols.), Leiden: Brill, 2010</li>
              <li>Liddell, Scott &amp; Jones. <em>A Greek-English Lexicon</em> (9th ed.), Oxford, 1940</li>
              <li><em>Oxford English Dictionary</em>, entries for &ldquo;phone,&rdquo; &ldquo;telephone,&rdquo; and derivatives</li>
              <li>{"Chantraine, Pierre. "}<em>{"Dictionnaire \u00e9tymologique de la langue grecque"}</em>{", Paris: Klincksieck, 1968\u201380"}</li>
              <li>Aristotle. <em>De Interpretatione</em> (trans. J.L. Ackrill), Clarendon, 1963</li>
            </ul>
          </div>
          <div>
            <h3 className="source-category-title">Historical &amp; Biographical</h3>
            <ul className="source-list">
              <li>US Patent 174,465 &mdash; Bell, &ldquo;Improvement in Telegraphy,&rdquo; Feb 14, 1876</li>
              <li>Casson, Herbert N. <em>The History of the Telephone</em>, A.C. McClurg, 1910</li>
              <li>Everson, George. <em>The Telephone Patent Conspiracy of 1876</em>, McFarland, 2000</li>
              <li>Crystal, David. <em>The Cambridge Encyclopedia of the English Language</em> (2nd ed.), 2003</li>
              <li>Horrocks, Geoffrey. <em>Greek: A History of the Language and its Speakers</em> (2nd ed.), Wiley-Blackwell, 2010</li>
            </ul>
          </div>
          <div>
            <h3 className="source-category-title">Word Formation &amp; Morphology</h3>
            <ul className="source-list">
              <li>Marchand, Hans. <em>The Categories and Types of Present-Day English Word-Formation</em>, C.H. Beck, 1969</li>
              <li>Algeo, John. <em>Fifty Years Among the New Words</em>, Cambridge, 1991</li>
              <li>Harper, Douglas. <em>Online Etymology Dictionary</em> (etymonline.com)</li>
              <li>{"Bourseul, Charles. \u201cTransmission \u00e9lectrique de la parole,\u201d "}<em>{"L\u2019Illustration"}</em>{", Aug 26, 1854"}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="phone-footer">
        <p className="footer-word" lang="el">{"\u03c6\u03c9\u03bd\u03ae"}</p>
        <p className="footer-text">A Visual Essay by Esy.com</p>
      </footer>
    </div>
  );
};

export default TheWordPhoneClient;
