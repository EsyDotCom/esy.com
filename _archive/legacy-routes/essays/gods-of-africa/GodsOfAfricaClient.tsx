"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import "./gods-of-africa.css";

// ============================================================================
// GODS OF AFRICA — A Journey from Light to Terror
// ============================================================================
// Visual Treatment: Museum artifact photography + atmospheric lighting
// Arc Type: Transformation (Wonder → Order → Chaos → Dread → Terror)
// Progress Bar: "The Light Fades" - color temperature shifts gold → void
// Cultural Lens: Pan-African with regional distinction honored
// ============================================================================

// ==================== TYPE DEFINITIONS ====================

interface DivineFigure {
  name: string;
  epithet: string;
  tradition: string;
  domains: string[];
  description: string;
  quote?: string;
  phase: "creation" | "order" | "trickster" | "threshold" | "terror";
  isFeatured?: boolean;
  isTerror?: boolean;
}

interface Chapter {
  id: string;
  number: string;
  title: string;
  phase: "creation" | "order" | "trickster" | "threshold" | "terror";
  epigraph?: { text: string; source: string };
  narrative: string[];
  figures: DivineFigure[];
}

// ==================== CUSTOM HOOKS ====================

const useIntersectionReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

const useGlobalScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;
      const newProgress = Math.min(Math.max(scrollTop / scrollableHeight, 0), 1);
      setProgress(newProgress);
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateProgress);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
};

// ==================== SCROLL-LOCK HERO HOOK ====================

const useScrollLockHero = (scrollDepth: number = 1500) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [heroProgress, setHeroProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const containerStartRef = useRef<number | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Store the initial offset once
    if (containerStartRef.current === null) {
      containerStartRef.current = container.getBoundingClientRect().top + window.scrollY;
    }

    const updateProgress = () => {
      const containerStart = containerStartRef.current ?? 0;
      const scrollY = window.scrollY;
      
      // How far we've scrolled past the container start
      const scrolledPast = scrollY - containerStart;
      
      // Progress through the scroll-lock sequence (0 to 1)
      const progress = Math.min(Math.max(scrolledPast / scrollDepth, 0), 1);
      
      // Locked when we're inside the scroll range
      const locked = scrolledPast >= 0 && scrolledPast < scrollDepth;
      
      setHeroProgress(progress);
      setIsLocked(locked);
      setIsComplete(progress >= 1);
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateProgress);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollDepth]);

  return { containerRef, heroProgress, isLocked, isComplete };
};

// ==================== AFRICAN CONTINENT SVG ====================

const AfricaContinent: React.FC<{ progress: number }> = ({ progress }) => {
  // Simplified Africa outline path
  const pathLength = 2000; // Approximate path length
  const drawProgress = Math.min(Math.max((progress - 0.15) / 0.2, 0), 1); // Draw from 15-35%
  
  return (
    <svg
      className="africa-continent-svg"
      viewBox="0 0 400 450"
      style={{
        opacity: progress > 0.1 ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Simplified Africa outline */}
      <path
        className="africa-outline"
        d="M200,20 C240,25 280,40 300,60 C320,80 340,120 350,160 C360,200 355,240 340,280 C325,320 300,360 280,390 C260,420 220,440 180,435 C140,430 100,400 80,360 C60,320 50,280 55,240 C60,200 80,160 100,120 C120,80 160,40 200,20 Z"
        fill="none"
        stroke="url(#goldGradient)"
        strokeWidth="2"
        filter="url(#glow)"
        style={{
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength * (1 - drawProgress),
          transition: "stroke-dashoffset 0.1s linear",
        }}
      />
    </svg>
  );
};

// ==================== TRADITION LIGHT SOURCES ====================

interface TraditionLight {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
}

const traditionLights: TraditionLight[] = [
  { id: "nigeria", name: "Yoruba", x: 48, y: 38, color: "#FFD700" },
  { id: "ghana", name: "Akan", x: 38, y: 42, color: "#D4AF37" },
  { id: "egypt", name: "Egyptian", x: 65, y: 15, color: "#F5C542" },
  { id: "southafrica", name: "Zulu", x: 55, y: 85, color: "#CC7722" },
];

const TraditionLights: React.FC<{ progress: number }> = ({ progress }) => {
  // Lights appear from 35-55%, then dim from 55-90%
  const appearProgress = Math.min(Math.max((progress - 0.35) / 0.2, 0), 1);
  const dimProgress = Math.min(Math.max((progress - 0.55) / 0.35, 0), 1);
  const opacity = appearProgress * (1 - dimProgress * 0.8);

  return (
    <div className="tradition-lights" style={{ opacity }}>
      {traditionLights.map((light, index) => (
        <div
          key={light.id}
          className="tradition-light"
          style={{
            left: `${light.x}%`,
            top: `${light.y}%`,
            "--light-color": light.color,
            opacity: Math.min(appearProgress * (index + 1) * 0.3, 1),
            transform: `scale(${0.5 + appearProgress * 0.5})`,
          } as React.CSSProperties}
        >
          <div className="light-pulse" />
          <span className="light-label">{light.name}</span>
        </div>
      ))}
    </div>
  );
};

// ==================== GOLDEN EYE REVEAL ====================

const GoldenEye: React.FC<{ progress: number }> = ({ progress }) => {
  // Eye appears from 75-100%
  const eyeProgress = Math.min(Math.max((progress - 0.75) / 0.25, 0), 1);
  
  return (
    <div
      className="golden-eye"
      style={{
        opacity: eyeProgress,
        transform: `scale(${0.5 + eyeProgress * 0.5})`,
      }}
    >
      <svg viewBox="0 0 100 60" className="eye-svg">
        <defs>
          <radialGradient id="eyeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8B4513" />
          </radialGradient>
          <filter id="eyeGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Eye shape */}
        <ellipse
          cx="50"
          cy="30"
          rx="45"
          ry="25"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2"
          filter="url(#eyeGlow)"
        />
        {/* Iris */}
        <circle
          cx="50"
          cy="30"
          r="15"
          fill="url(#eyeGradient)"
          filter="url(#eyeGlow)"
        />
        {/* Pupil */}
        <ellipse
          cx="50"
          cy="30"
          rx="5"
          ry="8"
          fill="#0A0A0B"
        />
        {/* Highlight */}
        <circle cx="45" cy="26" r="3" fill="rgba(255,255,255,0.6)" />
      </svg>
    </div>
  );
};

// ==================== THE LIGHT FADES PROGRESS BAR ====================

const chapterMarkers = [
  { id: "creation", position: 0.1 },
  { id: "order", position: 0.25 },
  { id: "trickster", position: 0.4 },
  { id: "threshold", position: 0.6 },
  { id: "terror", position: 0.8 },
  { id: "epilogue", position: 0.95 },
];

const LightFadesProgress: React.FC<{ progress: number }> = ({ progress }) => {
  // Calculate ember color based on progress (gold → amber → red → gray → cold blue)
  const emberColor = useMemo(() => {
    if (progress < 0.2) return "#FFD700"; // Gold
    if (progress < 0.4) return "#F5A623"; // Amber
    if (progress < 0.6) return "#CC7722"; // Dark amber
    if (progress < 0.8) return "#4A4A4A"; // Gray
    return "#0D1B2A"; // Cold blue
  }, [progress]);

  return (
    <div
      className="light-fades-progress"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div className="light-fades-track" />
      <div
        className="light-fades-fill"
        style={{ "--progress": `${progress * 100}%` } as React.CSSProperties}
      />
      <div className="light-fades-markers">
        {chapterMarkers.map((marker) => (
          <div
            key={marker.id}
            className={`light-fades-marker ${progress >= marker.position ? "passed" : ""}`}
          />
        ))}
      </div>
      <div
        className="light-fades-ember"
        style={{
          top: `${10 + progress * 80}%`,
          "--ember-color": emberColor,
        } as React.CSSProperties}
      />
    </div>
  );
};

// ==================== DIVINE FIGURE COMPONENT ====================

const DivineFigureProfile: React.FC<{ figure: DivineFigure }> = ({ figure }) => {
  const accentColors: Record<string, string> = {
    creation: "#FFD700",
    order: "#2C3E6E",
    trickster: "#F5A623",
    threshold: "#4A4A4A",
    terror: "#0D1B2A",
  };

  return (
    <article
      className={`divine-figure ${figure.isFeatured ? "featured" : ""} ${figure.isTerror ? "terror" : ""}`}
      style={{ "--figure-accent": accentColors[figure.phase] } as React.CSSProperties}
    >
      <h3 className="figure-name">{figure.name}</h3>
      <p className="figure-epithet">{figure.epithet}</p>
      <div className="figure-domains">
        {figure.domains.map((domain) => (
          <span key={domain} className="figure-domain">
            {domain}
          </span>
        ))}
      </div>
      <p className="figure-description">{figure.description}</p>
      {figure.quote && <p className="figure-quote">&ldquo;{figure.quote}&rdquo;</p>}
    </article>
  );
};

// ==================== CHAPTER COMPONENT ====================

const ChapterSection: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  const accentColors: Record<string, string> = {
    creation: "#FFD700",
    order: "#2C3E6E",
    trickster: "#F5A623",
    threshold: "#4A4A4A",
    terror: "#0D1B2A",
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`chapter-section ${isVisible ? "visible" : ""}`}
      data-phase={chapter.phase}
      style={{ "--chapter-accent": accentColors[chapter.phase] } as React.CSSProperties}
    >
      <div className="chapter-content">
        <header className="chapter-header">
          <span className="chapter-number">{chapter.number}</span>
          <h2 className="chapter-title">{chapter.title}</h2>
          {chapter.epigraph && (
            <div className="chapter-epigraph">
              &ldquo;{chapter.epigraph.text}&rdquo;
              <cite>— {chapter.epigraph.source}</cite>
            </div>
          )}
        </header>

        <div className="narrative-block has-dropcap">
          {chapter.narrative.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {chapter.figures.map((figure) => (
          <DivineFigureProfile key={figure.name} figure={figure} />
        ))}
      </div>

      <div className="transition-divider" data-phase={chapter.phase} />
    </section>
  );
};

// ==================== CONTENT DATA ====================

const chapters: Chapter[] = [
  // ACT I: THE CREATORS
  {
    id: "creators",
    number: "Chapter I",
    title: "The Creators",
    phase: "creation",
    epigraph: {
      text: "In the beginning, there was only the word, and the word was with Olodumare.",
      source: "Yoruba Creation Tradition",
    },
    narrative: [
      "Before time had meaning, before the waters separated from the sky, the creator gods dreamed the world into being. Across the vast African continent, from the mist-shrouded mountains of Ethiopia to the sun-scorched savannas of the Sahel, each people preserved their own account of that first miraculous dawn.",
      "These were not distant, abstract forces. They were personalities—majestic, capricious, benevolent, terrifying. They walked among their creations, argued with their children, and shaped the cosmos with their breath, their sweat, their tears.",
    ],
    figures: [
      {
        name: "OLODUMARE",
        epithet: "Owner of Endless Space",
        tradition: "Yoruba",
        domains: ["Supreme Creator", "Source of Ashe", "The Unknowable"],
        description:
          "So vast that even the orishas cannot perceive his fullness. Olodumare is the source of ashe—the divine energy that flows through all creation. He does not receive sacrifice directly, for he is beyond such offerings. He simply IS, the eternal background from which all reality emerges.",
        quote: "I have placed the power in your hands. What you do with it defines who you become.",
        phase: "creation",
        isFeatured: true,
      },
      {
        name: "NYAME",
        epithet: "He Who Knows and Sees All",
        tradition: "Akan",
        domains: ["Sky Father", "Supreme Deity", "Creator of the Universe"],
        description:
          "Nyame sits enthroned in the heavens, watching over his creation with the patience of eternal time. The Akan people do not build temples to him—for how can you contain the sky? Instead, they honor him at the Nyame Dua, the 'God's Tree,' a forked branch altar in every courtyard.",
        quote: "If you wish to speak to Nyame, speak to the wind.",
        phase: "creation",
        isFeatured: true,
      },
      {
        name: "ATUM",
        epithet: "The Complete One",
        tradition: "Egyptian",
        domains: ["Self-Created", "Father of Gods", "The Setting Sun"],
        description:
          "From the primordial waters of Nun, Atum arose upon the first mound of earth—the Benben stone. Through his own will, without partner or precedent, he created Shu and Tefnut, beginning the great chain of divine birth. He is both the first and the last, the rising and the setting sun.",
        phase: "creation",
      },
    ],
  },

  // ACT II: THE COSMIC ORDER
  {
    id: "order",
    number: "Chapter II",
    title: "The Cosmic Order",
    phase: "order",
    epigraph: {
      text: "The universe is balanced on the head of a serpent.",
      source: "Fon Proverb",
    },
    narrative: [
      "Once the world was made, it required structure. The creator gods appointed stewards—deities of sky and earth, water and fire, life and death. These were the administrators of existence, the forces that kept chaos at bay.",
      "Each tradition mapped the cosmos differently, yet all recognized the delicate balance required to maintain reality. The slightest disruption could unravel everything.",
    ],
    figures: [
      {
        name: "AIDO HWEDO",
        epithet: "The Rainbow Serpent",
        tradition: "Fon/Dahomey",
        domains: ["Cosmic Foundation", "Rainbow", "World Bearer"],
        description:
          "When the creator god Mawu-Lisa needed to shape the earth, it was Aido Hwedo who carried her in his mouth, their journey carving mountains and valleys across the land. Now the great serpent coils beneath the earth, holding up the world. When he shifts, the earth trembles. When he finally tires, the world will end.",
        quote: "The serpent does not sleep. The serpent only waits.",
        phase: "order",
        isFeatured: true,
      },
      {
        name: "MAWU-LISA",
        epithet: "The Divine Twins",
        tradition: "Fon/Dahomey",
        domains: ["Moon and Sun", "Creation", "Divine Duality"],
        description:
          "Mawu is the moon, cool and reflective, mother of the west. Lisa is the sun, fierce and illuminating, father of the east. Together they are the primordial unity that split to create the world, and one day they will reunite, ending the cosmic cycle.",
        phase: "order",
      },
      {
        name: "OBATALA",
        epithet: "King of the White Cloth",
        tradition: "Yoruba",
        domains: ["Sculptor of Humanity", "Purity", "Wisdom"],
        description:
          "Olodumare gave Obatala the sacred task of molding human bodies from clay. He shapes each one with care—though legend whispers that once, intoxicated on palm wine, his hands slipped, creating those born different. To this day, the Yoruba consider such children sacred, touched by Obatala's fallible grace.",
        phase: "order",
      },
    ],
  },

  // ACT III: THE TRICKSTERS
  {
    id: "tricksters",
    number: "Chapter III",
    title: "The Tricksters",
    phase: "trickster",
    epigraph: {
      text: "No one goes to the house of the spider to teach it wisdom.",
      source: "Ashanti Proverb",
    },
    narrative: [
      "Order cannot exist without chaos testing its boundaries. Enter the tricksters—gods who delight in confusion, who challenge the powerful, who remind both mortals and immortals that the universe has a sense of humor.",
      "But do not mistake them for clowns. The trickster carries wisdom wrapped in foolishness. His chaos serves a purpose: to keep the cosmos flexible, to prevent stagnation, to remind the proud that even gods can be outwitted.",
    ],
    figures: [
      {
        name: "ANANSI",
        epithet: "The Spider Who Owns All Stories",
        tradition: "Akan/Ashanti",
        domains: ["Trickster", "Wisdom", "Storytelling"],
        description:
          "Once, all stories belonged to Nyame, the Sky God. Anansi wanted them. Through cunning beyond measure, he captured the python, the hornets, and the leopard—impossible tasks that even the gods thought beyond a mere spider. Now every tale in the world is an 'Anansi story,' and we are all caught in his web.",
        quote: "The cunning of the spider is not in its poison, but in its patience.",
        phase: "trickster",
        isFeatured: true,
      },
      {
        name: "ESHU",
        epithet: "Guardian of the Crossroads",
        tradition: "Yoruba",
        domains: ["Messenger", "Trickster", "Divine Linguist"],
        description:
          "Eshu stands where paths converge—between gods and humans, between fate and free will, between what is and what could be. No prayer reaches the orishas without his permission. No sacrifice is complete without his portion. Treat him well, or find your messages... lost in translation.",
        quote: "Eshu threw a stone today and killed a bird yesterday.",
        phase: "trickster",
        isFeatured: true,
      },
      {
        name: "HARE",
        epithet: "The First Trickster",
        tradition: "East African (Various)",
        domains: ["Cunning", "Survival", "Outwitting the Powerful"],
        description:
          "Before Brer Rabbit, before Bugs Bunny, there was Hare. Small and seemingly helpless, he defeats lions, elephants, and even death itself through pure wit. His stories crossed the Atlantic on slave ships, transforming into the trickster tales of the Americas.",
        phase: "trickster",
      },
    ],
  },

  // ACT IV: THE THRESHOLD GUARDIANS
  {
    id: "threshold",
    number: "Chapter IV",
    title: "The Threshold Guardians",
    phase: "threshold",
    epigraph: {
      text: "The heart is weighed, and the soul is judged.",
      source: "Egyptian Book of the Dead",
    },
    narrative: [
      "Between this world and the next, guardians wait. They are neither good nor evil—they simply are. They hold the balance, weigh the heart, ferry the dead. Their realm is twilight, the in-between place where living breath gives way to eternal silence.",
      "Here the journey grows cold. The golden light of creation dims to amber, then gray. We approach the threshold that all must cross.",
    ],
    figures: [
      {
        name: "ANUBIS",
        epithet: "Guardian of the Scales",
        tradition: "Egyptian",
        domains: ["Mummification", "The Dead", "Judgment"],
        description:
          "Jackal-headed and patient beyond measure, Anubis invented mummification to preserve his father Osiris. Now he presides over the weighing of hearts—placing each soul's essence against the feather of Ma'at. A heart heavy with sin sinks, and Ammit waits to devour it.",
        phase: "threshold",
        isFeatured: true,
      },
      {
        name: "OWUO",
        epithet: "Death Himself",
        tradition: "Akan",
        domains: ["Death", "Inevitability", "The Final Passage"],
        description:
          "The Akan do not personify death as we might expect. Owuo is not a skeleton or a reaper, but an inescapable force—the destination of all journeys, the answer to all questions. To meet Owuo is to meet the truth of existence.",
        quote: "When Owuo calls, even kings answer.",
        phase: "threshold",
      },
      {
        name: "THE ANCESTORS",
        epithet: "The Living Dead",
        tradition: "Pan-African",
        domains: ["Memory", "Guidance", "Continuity"],
        description:
          "In African tradition, the dead do not fully depart. They linger in memory, in ritual, in the blood of their descendants. The ancestors can bless or curse, guide or abandon. They are the bridge between what was and what will be.",
        phase: "threshold",
      },
    ],
  },

  // ACT V: THE TERRORS
  {
    id: "terrors",
    number: "Chapter V",
    title: "The Devourers",
    phase: "terror",
    epigraph: {
      text: "There are things older than the gods, and they remember the darkness.",
      source: "Congo Basin Oral Tradition",
    },
    narrative: [
      "Now we descend into the final darkness. These are not the orderly forces of death or the playful chaos of tricksters. These are the nightmares—beings that exist to destroy, to consume, to remind humanity that the universe is not always kind.",
      "They dwell at the edge of firelight, in the deepest waters, in the space between one heartbeat and the next. They are what the creators could not control, what the order could not contain, what even the tricksters fear.",
    ],
    figures: [
      {
        name: "APOPHIS",
        epithet: "The Uncreated Serpent",
        tradition: "Egyptian",
        domains: ["Chaos", "Destruction", "Eternal Enemy of Ra"],
        description:
          "Every night, as Ra sails through the underworld, Apophis attacks. This is no metaphor—this is cosmic battle, repeated eternally. The serpent of chaos wraps his coils around the sun, threatening to swallow light itself. If Ra ever fails to emerge at dawn, creation ends.",
        quote: "I was before the gods. I will be after them.",
        phase: "terror",
        isFeatured: true,
        isTerror: true,
      },
      {
        name: "AMMIT",
        epithet: "Devourer of the Dead",
        tradition: "Egyptian",
        domains: ["Punishment", "Consumption", "Final Death"],
        description:
          "Part crocodile, part lion, part hippopotamus—three of Egypt's deadliest creatures combined into one horror. Ammit crouches beside the scales of judgment, waiting. If your heart is heavier than the feather of truth, she consumes you. Not death—obliteration. No afterlife. Nothing.",
        phase: "terror",
        isTerror: true,
      },
      {
        name: "POPOBAWA",
        epithet: "The Bat-Winged Terror",
        tradition: "Zanzibar/East African",
        domains: ["Nocturnal Terror", "Shapeshifter", "Violation"],
        description:
          "The Popobawa is not ancient mythology—it is living fear. First reported in 1965, this bat-winged shadow attacks at night, leaving victims traumatized and communities in panic. Skeptics call it mass hysteria. Those who have seen its single, burning eye do not sleep well.",
        quote: "Do not speak of it after dark. It knows when you speak its name.",
        phase: "terror",
        isFeatured: true,
        isTerror: true,
      },
      {
        name: "THE TIKOLOSHE",
        epithet: "The Mischief That Maims",
        tradition: "Zulu/South African",
        domains: ["Malevolent Spirit", "Night Terror", "Witchcraft"],
        description:
          "A small, hairy creature that can become invisible by swallowing a stone. The Tikoloshe is called forth by witches to torment enemies. It strangles sleepers, spreads disease, and causes misfortune. Many in South Africa still raise their beds on bricks—because the Tikoloshe cannot climb.",
        phase: "terror",
        isTerror: true,
      },
    ],
  },
];

// ==================== SOURCES DATA ====================

const sources = [
  { title: "Yoruba Religion and Medicine in Africa and the Diaspora — University of Wisconsin Press", url: "https://uwpress.wisc.edu/books/5643.htm" },
  { title: "African Mythology A to Z — Facts on File", url: "https://www.infobase.com/product/schools/african-mythology-a-to-z-2nd-edition-p53125/" },
  { title: "Akan Religion — Oxford Research Encyclopedia", url: "https://oxfordre.com/religion/view/10.1093/acrefore/9780199340378.001.0001/acrefore-9780199340378-e-587" },
  { title: "The Gods and Symbols of Ancient Egypt — Thames & Hudson", url: "https://thamesandhudson.com/an-illustrated-dictionary-of-the-gods-and-symbols-of-ancient-egypt-9780500273135" },
  { title: "African Religions: A Very Short Introduction — Oxford University Press", url: "https://academic.oup.com/book/732" },
  { title: "Dahomey and Its Neighbours — Cambridge University Press", url: "https://www.cambridge.org/core/books/dahomey-and-its-neighbours/7ACBD7E7E87C3A5E9A7BAD18A8C0E2AA" },
  { title: "Mami Wata: Arts for Water Spirits — UCLA Fowler Museum", url: "https://www.fowler.ucla.edu/exhibitions/mami-wata-arts-for-water-spirits-in-africa-and-its-diasporas/" },
  { title: "British Museum — African Collections", url: "https://www.britishmuseum.org/collection/africa" },
];

// ==================== MAIN COMPONENT ====================

// ==================== SCROLL-LOCK HERO SECTION ====================

const ScrollLockHero: React.FC = () => {
  const { containerRef, heroProgress, isLocked, isComplete } = useScrollLockHero(1500);
  
  // Memoize particle positions to prevent re-renders
  const particlePositions = useMemo(() => 
    [...Array(30)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      size: 1 + Math.random() * 2,
    })), []
  );

  // Phase text reveals based on scroll progress
  const phases = [
    { start: 0, end: 0.15, text: "In the beginning, there was light..." },
    { start: 0.15, end: 0.35, text: "...and the gods shaped the world." },
    { start: 0.35, end: 0.55, text: "Every people had their creators..." },
    { start: 0.55, end: 0.75, text: "...their tricksters..." },
    { start: 0.75, end: 0.9, text: "...and their terrors." },
  ];

  // Determine current phase
  const currentPhase = phases.findIndex(
    (p) => heroProgress >= p.start && heroProgress < p.end
  );
  
  // Calculate light intensity (dims after 55%)
  const lightIntensity = heroProgress < 0.55 
    ? Math.min(heroProgress / 0.35, 1) 
    : Math.max(1 - (heroProgress - 0.55) / 0.35, 0.2);

  // Shadow intensity (increases after 55%)
  const shadowIntensity = Math.min(Math.max((heroProgress - 0.55) / 0.35, 0), 1);

  // Title card appears at 90%+
  const showTitleCard = heroProgress >= 0.9;

  return (
    <div
      ref={containerRef}
      className={`hero-scroll-lock-container ${isLocked ? "is-locked" : ""} ${isComplete ? "is-complete" : ""}`}
    >
      <section className="hero-section hero-pinned">
        {/* Dynamic background that shifts from gold to void */}
        <div
          className="hero-background"
          style={{
            "--light-intensity": lightIntensity,
            "--shadow-intensity": shadowIntensity,
          } as React.CSSProperties}
        />

        {/* Central light source */}
        <div
          className="hero-central-light"
          style={{
            opacity: lightIntensity,
            transform: `scale(${0.5 + heroProgress * 0.5})`,
          }}
        />

        {/* Animated particles that respond to scroll */}
        <div className="hero-particles" style={{ opacity: lightIntensity }}>
          {particlePositions.map((pos, i) => (
            <div
              key={i}
              className="hero-particle"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animationDelay: `${pos.delay}s`,
                width: `${pos.size}px`,
                height: `${pos.size}px`,
                opacity: lightIntensity,
              }}
            />
          ))}
        </div>

        {/* African continent outline (traces from 15-35%) */}
        <div className="hero-continent-layer">
          <AfricaContinent progress={heroProgress} />
        </div>

        {/* Tradition light sources (appear 35-55%, dim after) */}
        <TraditionLights progress={heroProgress} />

        {/* Shadow overlay that creeps in */}
        <div
          className="hero-shadow-overlay"
          style={{ opacity: shadowIntensity * 0.7 }}
        />

        {/* Progressive text reveals */}
        <div className="hero-phase-text">
          {phases.map((phase, index) => {
            const isActive = heroProgress >= phase.start && heroProgress < phase.end;
            const isPast = heroProgress >= phase.end;
            return (
              <p
                key={index}
                className={`phase-text ${isActive ? "active" : ""} ${isPast ? "past" : ""}`}
              >
                {phase.text}
              </p>
            );
          })}
        </div>

        {/* Golden eye (reveals 75-100%) */}
        <GoldenEye progress={heroProgress} />

        {/* Title card (appears at 90%+) */}
        <div
          className="hero-content"
          style={{
            opacity: showTitleCard ? 1 : 0,
            transform: `translateY(${showTitleCard ? 0 : 30}px)`,
          }}
        >
          <span className="hero-overline">A Visual Essay</span>
          <h1 className="hero-title">Gods of Africa</h1>
          <p className="hero-subtitle">A Journey from Light to Terror</p>
        </div>

        {/* Scroll indicator (only at start and end) */}
        <div
          className="hero-scroll-indicator"
          style={{
            opacity: heroProgress < 0.05 || isComplete ? 1 : 0,
          }}
        >
          <span className="scroll-text">
            {isComplete ? "Continue Scrolling" : "Scroll to Begin"}
          </span>
          <div className="scroll-line" />
        </div>

        {/* Skip button (appears after 2s of lock) */}
        {isLocked && heroProgress > 0.1 && heroProgress < 0.9 && (
          <button
            className="hero-skip-button"
            onClick={() => {
              const container = containerRef.current;
              if (container) {
                const targetScroll = container.offsetTop + 2500;
                window.scrollTo({ top: targetScroll, behavior: "smooth" });
              }
            }}
          >
            Skip Intro →
          </button>
        )}
      </section>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================

export default function GodsOfAfricaClient() {
  const progress = useGlobalScrollProgress();

  return (
    <div className="gods-of-africa">
      <LightFadesProgress progress={progress} />

      {/* SCROLL-LOCK HERO */}
      <ScrollLockHero />

      {/* CHAPTERS */}
      {chapters.map((chapter) => (
        <ChapterSection key={chapter.id} chapter={chapter} />
      ))}

      {/* EPILOGUE */}
      <section className="epilogue-section">
        <div className="epilogue-flame">
          <svg className="flame-svg" viewBox="0 0 60 80">
            <defs>
              <filter id="flame-blur">
                <feGaussianBlur stdDeviation="3" />
              </filter>
            </defs>
            <ellipse className="flame-glow" cx="30" cy="50" rx="20" ry="30" />
            <ellipse className="flame-core" cx="30" cy="55" rx="10" ry="20" />
          </svg>
        </div>
        <p className="epilogue-text">
          The fire still burns. The stories still travel. From mouth to ear, from
          generation to generation, the gods of Africa remain—not relics of the
          past, but living presences in the present.
        </p>
      </section>

      {/* SOURCES */}
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
            This narrative draws from peer-reviewed academic sources, museum
            collections, and documented oral traditions. All deity descriptions
            honor the living traditions from which they emerge.
          </p>
        </div>
      </section>
    </div>
  );
}

