"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import "./palestine-israel.css";

// ============================================================================
// TYPES
// ============================================================================

interface ChapterContent {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  era: string;
  metaphor: string;
  layer: string;
  layerColor: string;
  content: React.ReactNode;
}

interface SidebarContent {
  id: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

interface Source {
  title: string;
  author?: string;
  url?: string;
  type: "academic" | "institutional" | "journalism" | "documentary" | "archive";
  tradition: "Israeli" | "Palestinian" | "International" | "Arab" | "British Colonial";
}

interface ChapterImageData {
  src: string;
  alt: string;
  caption: string;
  attribution?: string;
  license?: string;
  era?: string;
}

// ============================================================================
// CHAPTER IMAGES DATA
// ============================================================================

const chapterImages: Record<string, ChapterImageData[]> = {
  "the-land": [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Levant_%28orthographic_projection%29.png",
      alt: "Levant region orthographic projection",
      caption: "The Levant—the narrow corridor between Egypt and Mesopotamia that shaped four thousand years of history.",
      attribution: "NASA/Wikimedia Commons",
      license: "Public Domain",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/d/d2/View_of_Jerusalem_from_Augusta_Victoria_%282%29.jpg",
      alt: "View of Jerusalem from Augusta Victoria",
      caption: "Jerusalem sits on a defensible ridge in the Judean Hills—holy not despite its marginality, but because of it.",
      attribution: "Wikimedia Commons",
      license: "CC BY-SA",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/0/0b/View_to_the_Jordan_Rift_Valley_near_Mitzpe_Yeriho_%2833841023664%29.jpg",
      alt: "Jordan Rift Valley panorama",
      caption: "The Jordan Rift Valley—the dramatic geological boundary that defines the land's eastern edge.",
      attribution: "Wikimedia Commons",
      license: "CC BY-SA 2.0",
    },
  ],
  "deep-antiquity": [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/4/43/Merenptah_Israel_Stele_Cairo.jpg",
      alt: "Merneptah Stele in Cairo Museum",
      caption: "The Merneptah Stele (c. 1208 BCE)—the earliest known reference to 'Israel' outside the Bible.",
      attribution: "Egyptian Museum, Cairo",
      license: "Public Domain",
      era: "antiquity",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/6/65/AERIAL_VIEW_OF_TEL_MEGIDDO_%287723470910%29.jpg",
      alt: "Aerial view of Tel Megiddo",
      caption: "Tel Megiddo—a Bronze Age city-state that controlled the vital pass between Egypt and Mesopotamia.",
      attribution: "Government Press Office of Israel",
      license: "CC BY-SA 2.0",
      era: "antiquity",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/1/15/Amarna_letter.jpg",
      alt: "Amarna Letter cuneiform tablet",
      caption: "An Amarna Letter—cuneiform tablets from local kings to Pharaoh, including pleas from Jerusalem's ruler.",
      attribution: "British Museum/Wikimedia",
      license: "Public Domain",
      era: "antiquity",
    },
  ],
  "ancient-peoples": [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Canaan.png",
      alt: "Map of ancient Canaan",
      caption: "Ancient Canaan—home to diverse peoples whose descendants still live here today.",
      attribution: "Wikimedia Commons",
      license: "CC BY-SA",
      era: "antiquity",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/3/38/Medinet_Habu_Ramses_III._Tempel_Nordostwand_19.jpg",
      alt: "Sea Peoples relief at Medinet Habu",
      caption: "Egyptian relief depicting the 'Sea Peoples' including the Peleset—whose name became 'Palestine.'",
      attribution: "Wikimedia Commons",
      license: "Public Domain",
      era: "antiquity",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Philistine_pottery_beer_Jug.JPG",
      alt: "Philistine bichrome pottery",
      caption: "Philistine pottery with distinctive Aegean-influenced designs—evidence of the Sea Peoples' Mediterranean origins.",
      attribution: "Wikimedia Commons",
      license: "CC BY-SA",
      era: "antiquity",
    },
  ],
  "rome-renaming": [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Arch_of_Titus_Menorah.png",
      alt: "Arch of Titus Menorah relief",
      caption: "The Arch of Titus in Rome—Roman soldiers carry the Temple's menorah after Jerusalem's destruction in 70 CE.",
      attribution: "Wikimedia Commons",
      license: "Public Domain",
      era: "classical",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Bar_Kokhba_Coin.jpg",
      alt: "Bar Kokhba revolt coin",
      caption: "A coin from the Bar Kokhba revolt (132-135 CE)—the last Jewish rebellion against Rome.",
      attribution: "Wikimedia Commons",
      license: "CC BY-SA",
      era: "classical",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Madaba_map.jpg",
      alt: "Madaba mosaic map",
      caption: "The Madaba Map (6th century CE)—a Byzantine mosaic showing the Holy Land with Jerusalem at center.",
      attribution: "St. George's Church, Madaba",
      license: "Public Domain",
      era: "classical",
    },
  ],
  "islamic-centuries": [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Dome_of_Rock%2C_Temple_Mount%2C_Jerusalem.jpg",
      alt: "Dome of the Rock",
      caption: "The Dome of the Rock (691 CE)—built on the Temple Mount, where holiness was layered upon holiness.",
      attribution: "Wikimedia Commons",
      license: "CC BY-SA",
      era: "islamic",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Al-Aqsa_Mosque_by_David_Shankbone.jpg",
      alt: "Al-Aqsa Mosque",
      caption: "Al-Aqsa Mosque—the third holiest site in Islam, destination of Muhammad's Night Journey.",
      attribution: "David Shankbone",
      license: "CC BY-SA",
      era: "islamic",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Saladin_the_Victorious.jpg",
      alt: "Historical depiction of Saladin",
      caption: "Saladin—who reconquered Jerusalem in 1187, notably with less bloodshed than the Crusaders.",
      attribution: "Wikimedia Commons",
      license: "Public Domain",
      era: "islamic",
    },
  ],
  "ottoman-palestine": [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/5/57/Panorama_of_Jerusalem._Frederick_Whitmore_Holland.1870.jpg",
      alt: "Panorama of Jerusalem 1870",
      caption: "Jerusalem in 1870—a provincial Ottoman city, before the transformations to come.",
      attribution: "Frederick Whitmore Holland",
      license: "Public Domain",
      era: "ottoman",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Jews_at_Western_Wall_by_Felix_Bonfils%2C_1870s.jpg",
      alt: "Jews at Western Wall 1870s",
      caption: "Jews praying at the Western Wall, 1870s—part of the small, traditional Jewish community that remained.",
      attribution: "Felix Bonfils",
      license: "Public Domain",
      era: "ottoman",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/93/Four_holy_cities_plaque.jpg",
      alt: "Four Holy Cities plaque",
      caption: "A 19th century plaque depicting the 'Four Holy Cities'—Jerusalem, Hebron, Safed, and Tiberias.",
      attribution: "Wikimedia Commons",
      license: "Public Domain",
      era: "ottoman",
    },
  ],
  "birth-nationalisms": [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/0/00/First_World_Zionist_Congress_delegates.jpg",
      alt: "First Zionist Congress delegates 1897",
      caption: "Delegates at the First Zionist Congress, Basel 1897—'At Basel I founded the Jewish state.'",
      attribution: "Wikimedia Commons",
      license: "Public Domain",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Theodor_Herzl_retouched.jpg",
      alt: "Theodor Herzl portrait",
      caption: "Theodor Herzl—the Viennese journalist who founded political Zionism after the Dreyfus Affair.",
      attribution: "Wikimedia Commons",
      license: "Public Domain",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/d/da/Jaffa_%28Joppa%29_and_environs._Jaffa_from_the_orange_groves_LOC_matpc.06520.jpg",
      alt: "Jaffa from the orange groves",
      caption: "Jaffa and its orange groves—Palestine was neither empty nor undeveloped.",
      attribution: "Library of Congress",
      license: "Public Domain",
    },
  ],
  "british-mandate": [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Balfour_declaration_unmarked.jpg",
      alt: "Balfour Declaration document",
      caption: "The Balfour Declaration (1917)—67 words that promised a 'national home' while protecting 'existing non-Jewish communities.'",
      attribution: "British National Archives",
      license: "Public Domain",
      era: "mandate",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Allenby_enters_Jerusalem_1917.jpg",
      alt: "General Allenby entering Jerusalem 1917",
      caption: "General Allenby enters Jerusalem on foot, December 1917—the end of 400 years of Ottoman rule.",
      attribution: "Library of Congress",
      license: "Public Domain",
      era: "mandate",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/5/54/Arab_rebels_during_1936_Palestine_revolt.jpg",
      alt: "Arab rebels 1936 Palestine revolt",
      caption: "Palestinian rebels during the Arab Revolt (1936-1939)—the first major uprising against British rule and Zionism.",
      attribution: "Wikimedia Commons",
      license: "Public Domain",
      era: "mandate",
    },
  ],
  "1948": [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/b/bd/UN_Palestine_Partition_Versions_1947.jpg",
      alt: "UN Partition Plan map 1947",
      caption: "UN Resolution 181 (1947)—the partition plan that Jews accepted and Arabs rejected.",
      attribution: "United Nations",
      license: "Public Domain",
      era: "1948",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/3/36/Declaration_of_State_of_Israel_1948.jpg",
      alt: "Israeli Declaration of Independence",
      caption: "David Ben-Gurion reads the Declaration of Independence, May 14, 1948—Israel is born.",
      attribution: "Government Press Office",
      license: "Public Domain",
      era: "1948",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Palestinian_refugees.jpg",
      alt: "Palestinian refugees 1948",
      caption: "Palestinian refugees fleeing during the Nakba—700,000 displaced, 400+ villages depopulated.",
      attribution: "UNRWA Archives",
      license: "Public Domain/UN",
      era: "1948",
    },
  ],
  "borders-without-peace": [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/f/fe/1947-UN-Partition-Plan-1949-Armistice-Comparison.png",
      alt: "1949 Armistice lines comparison",
      caption: "The Green Line—comparing the UN partition plan (1947) with the 1949 armistice lines.",
      attribution: "Wikimedia Commons",
      license: "CC BY-SA",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/97/Mandelbaum_Gate_%28997009326657605171.jpg",
      alt: "Mandelbaum Gate Jerusalem",
      caption: "The Mandelbaum Gate (1953)—the only crossing point between Israeli and Jordanian Jerusalem.",
      attribution: "Wikimedia Commons",
      license: "Public Domain",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Fawwar_refugee_camp_1951_ii.jpg",
      alt: "Fawwar refugee camp 1951",
      caption: "Fawwar refugee camp, 1951—where Palestinians waited for a return that never came.",
      attribution: "UNRWA Archives",
      license: "Public Domain/UN",
    },
  ],
  "occupation": [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Six_Day_War._Army_chief_chaplain_rabbi_Shlomo_Goren%2C_who_is_surrounded_by_IDF_soldiers%2C_blows_the_shofar_in_front_of_the_western_wall_in_Jerusalem._June_1967._D327-043.jpg",
      alt: "Rabbi Goren at Western Wall 1967",
      caption: "Rabbi Shlomo Goren blows the shofar at the Western Wall, June 1967—Israel captures all of Jerusalem.",
      attribution: "Israeli Government Press Office",
      license: "Public Domain",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Israeli_settlement_near_Jericho%2C_West_Bank.jpg",
      alt: "Israeli settlement near Jericho",
      caption: "An Israeli settlement in the West Bank—what began as 'bargaining chips' became permanent facts on the ground.",
      attribution: "Wikimedia Commons",
      license: "CC BY-SA",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Intifada_in_Gaza_Strip_%28FL45884441%29.jpg",
      alt: "First Intifada Gaza Strip",
      caption: "The First Intifada (1987-1993)—a popular uprising that changed the terms of the conflict.",
      attribution: "Wikimedia Commons",
      license: "Various",
    },
  ],
  "oslo-collapse": [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Bill_Clinton%2C_Yitzhak_Rabin%2C_Yasser_Arafat_at_the_White_House_1993-09-13.jpg",
      alt: "Oslo Accords handshake 1993",
      caption: "The Oslo handshake, September 13, 1993—Rabin and Arafat, with Clinton watching. Hope at its height.",
      attribution: "White House",
      license: "Public Domain",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Yitzhak_Rabin.jpg",
      alt: "Yitzhak Rabin portrait",
      caption: "Yitzhak Rabin—the Israeli general who sought peace, assassinated by an Israeli extremist in 1995.",
      attribution: "Israeli GPO",
      license: "Public Domain",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/4/49/Israeli_West_Bank_barrier.jpg",
      alt: "West Bank separation barrier",
      caption: "The separation barrier—called a 'security fence' by Israel, an 'apartheid wall' by Palestinians.",
      attribution: "B'Tselem/Wikimedia",
      license: "CC BY-SA",
    },
  ],
  "present": [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/0/0a/A_girl_walks_inside_Gaza_during_the_Gaza-Israel_war_to_get_food.png",
      alt: "Girl walking in Gaza during war",
      caption: "A girl walks through Gaza to get food, August 2024—the human cost of the ongoing conflict.",
      attribution: "Jaber Jehad Badwan",
      license: "CC BY-SA 4.0",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Fars_Photo_of_Destruction_in_Gaza_Strip_during_2023_War_12.jpg",
      alt: "Gaza destruction 2023",
      caption: "Destruction in Gaza, October 2023—60% of buildings damaged or destroyed by December 2024.",
      attribution: "Fars News Agency",
      license: "CC BY 4.0",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/6/69/Palestinian_Authority_and_Gaza_Strip_2024.png",
      alt: "Palestinian territories map 2024",
      caption: "Palestinian territories as of 2024—fragmented, blockaded, under occupation.",
      attribution: "Wikimedia Commons",
      license: "CC0",
    },
  ],
}

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

// Mobile detection hook - matches the-origin-of-toy pattern
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

// ============================================================================
// COMPONENTS
// ============================================================================

const StratigraphyProgress: React.FC<{ progress: number; currentChapter: number }> = ({ progress, currentChapter }) => {
  const layers = [
    { name: "Topsoil", color: "#8B7355" },
    { name: "Bronze", color: "#CD7F32" },
    { name: "Iron", color: "#434343" },
    { name: "Marble", color: "#F5F5F5" },
    { name: "Tile", color: "#1E5F74" },
    { name: "Sandstone", color: "#D2B48C" },
    { name: "Coal", color: "#1C1C1C" },
    { name: "Brass", color: "#B5A642" },
    { name: "Concrete", color: "#808080" },
    { name: "Rebar", color: "#6B4423" },
    { name: "Wire", color: "#5C5C5C" },
    { name: "Plastic", color: "#87CEEB" },
    { name: "Glass", color: "#E8E8E8" },
  ];
  return (
    <div className="pi-stratigraphy-container">
      <div className="pi-stratigraphy-track">
        {layers.map((layer, index) => (
          <div
            key={layer.name}
            className={`pi-stratum ${index <= currentChapter ? "excavated" : ""} ${index === currentChapter ? "current" : ""}`}
            style={{ backgroundColor: layer.color, top: `${(index / layers.length) * 100}%`, height: `${100 / layers.length}%` }}
            title={layer.name}
          >
            <span className="pi-stratum-label">{layer.name}</span>
          </div>
        ))}
        <div className="pi-excavation-line" style={{ top: `${progress}%` }} />
      </div>
      <div className="pi-progress-label">
        <span className="pi-label-hebrew">ארץ</span>
        <span className="pi-label-divider">/</span>
        <span className="pi-label-arabic">فلسطين</span>
      </div>
    </div>
  );
};

const Section: React.FC<{
  id: string;
  className?: string;
  children: React.ReactNode;
  onVisible?: () => void;
  ariaLabel?: string;
}> = ({ id, className = "", children, onVisible, ariaLabel }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          onVisible?.();
        }
      },
      { threshold: 0.05, rootMargin: "100px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <section ref={sectionRef} id={id} className={`pi-section ${className} ${isVisible ? "visible" : ""}`} aria-label={ariaLabel} tabIndex={-1}>
      {children}
    </section>
  );
};

const ChapterHeader: React.FC<{ chapter: ChapterContent }> = ({ chapter }) => (
  <div className="pi-chapter-header">
    <div className="pi-chapter-number">Chapter {chapter.number}</div>
    <h2 className="pi-chapter-title">{chapter.title}</h2>
    <p className="pi-chapter-subtitle">{chapter.subtitle}</p>
    <div className="pi-chapter-era">{chapter.era}</div>
    <p className="pi-chapter-metaphor">{chapter.metaphor}</p>
  </div>
);

const QuoteMonument: React.FC<{ quote: string; attribution: string; context?: string }> = ({ quote, attribution, context }) => (
  <div className="pi-quote-monument">
    <blockquote>
      <p>&ldquo;{quote}&rdquo;</p>
      <cite>— {attribution}</cite>
      {context && <span className="pi-quote-context">{context}</span>}
    </blockquote>
  </div>
);

const ChapterImage: React.FC<{ image: ChapterImageData; position?: "left" | "center" | "right" }> = ({ image, position = "center" }) => {
  const eraClass = image.era ? `pi-image-${image.era}` : "";
  return (
    <figure className={`pi-chapter-figure pi-figure-${position}`}>
      <div className="pi-figure-image-wrapper">
        <img
          src={image.src}
          alt={image.alt}
          className={`pi-chapter-image ${eraClass}`}
          loading="lazy"
        />
      </div>
      <figcaption className="pi-figure-caption">
        <p className="pi-caption-text">{image.caption}</p>
        {image.attribution && (
          <p className="pi-caption-attribution">
            {image.attribution}
            {image.license && ` · ${image.license}`}
          </p>
        )}
      </figcaption>
    </figure>
  );
};

const ChapterImages: React.FC<{ chapterId: string }> = ({ chapterId }) => {
  const images = chapterImages[chapterId];
  if (!images || images.length === 0) return null;

  return (
    <div className="pi-chapter-images">
      {images.map((image, index) => (
        <ChapterImage key={index} image={image} />
      ))}
    </div>
  );
};

// Hero Section - Static title display (no interaction required)
const HeroSection: React.FC = () => {
  return (
    <section className="pi-hero-section pi-hero-static" aria-label="Essay title">
      <div className="pi-hero-pinned-content">
        <div className="pi-hero-background">
          <div className="pi-hero-image-wrapper" style={{ transform: "scale(1.2) translateZ(0)" }}>
            <div className="pi-hero-placeholder"><div className="pi-land-gradient" /></div>
          </div>
          <div className="pi-hero-gradient" />
        </div>

        {/* Title display - always visible */}
        <div className="pi-hero-stage pi-hero-stage-title active">
          <h1 className="pi-hero-title">
            <span className="pi-title-hebrew">ארץ</span>
            <span className="pi-title-divider">/</span>
            <span className="pi-title-arabic">فلسطين</span>
          </h1>
          <p className="pi-hero-subtitle">A Land of Many Names, A People&apos;s Many Griefs</p>
          <p className="pi-hero-subtitle-small">From Deep Antiquity to Today</p>
        </div>

        {/* Scroll hint */}
        <div className="pi-hero-scroll-hint">
          <span>Scroll to begin</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// CHAPTER CONTENT DATA
// ============================================================================

const chapters: ChapterContent[] = [
  {
    id: "the-land",
    number: 0,
    title: "The Land Before Flags",
    subtitle: "Geography and Environment",
    era: "Timeless",
    metaphor: "The stage before the actors—the land that shaped the history that would unfold on it.",
    layer: "Topsoil",
    layerColor: "#8B7355",
    content: (
      <>
        <p className="pi-lead-paragraph">Before any people claimed this land, the land itself shaped what would happen.</p>
        <p>The geography explains everything: a narrow coastal plain, a spine of hills running north-south, a deep rift valley, and desert to the east. The only fertile corridor between Egypt and Mesopotamia—anyone wanting to move armies or trade goods between the great civilizations had to pass through here.</p>
        <p>This made the land strategically vital for empires and exposed to constant conquest. For four thousand years, armies have marched through this corridor: Egyptian, Assyrian, Babylonian, Persian, Greek, Roman, Arab, Crusader, Ottoman, British. The same 60 miles, again and again.</p>
        <div className="pi-emphasis-block">
          <p>60 miles from the Mediterranean to the Jordan River. This is what everyone has fought over for 4,000 years.</p>
        </div>
        <p>Water scarcity meant settlements clustered around springs and seasonal streams. The limestone hills collected rainwater in cisterns. Olive trees, grapevines, wheat, and barley could grow here—but barely. Pastoralism and agriculture coexisted, sometimes uneasily.</p>
        <p>Jerusalem&apos;s location makes no geographic sense—no river, no major trade route. But it sits on a defensible ridge, with water access (the Gihon Spring), between the northern tribes and the southern. It became holy not despite its marginality but because of it: a place for pilgrimage, not commerce.</p>
      </>
    ),
  },
  {
    id: "deep-antiquity",
    number: 1,
    title: "Deep Antiquity",
    subtitle: "Archaeological Record (Before 1200 BCE)",
    era: "Before 1200 BCE",
    metaphor: "The questions archaeology asks—and the limits of what it can answer.",
    layer: "Bronze",
    layerColor: "#CD7F32",
    content: (
      <>
        <p className="pi-lead-paragraph">Human habitation here stretches back 10,000+ years. By the Bronze Age (3300-1200 BCE), the land was home to Canaanite city-states that traded with Egypt and Mesopotamia.</p>
        <p>Megiddo, Hazor, Jericho, Jerusalem, Gaza—these were thriving cities with temples and palaces. The Canaanites were not one people but many: city-dwellers, farmers, pastoralists, speaking related Semitic languages, worshipping El and Baal.</p>
        <p>Egypt dominated during much of this period. The Amarna Letters (14th century BCE) show local kings writing to Pharaoh, pleading for help against rivals. One letter from Abdi-Heba, king of Jerusalem, reads: &ldquo;Neither my father nor my mother set me in this place—the arm of the mighty king installed me.&rdquo;</p>
        <QuoteMonument
          quote="Neither my father nor my mother set me in this place—the arm of the mighty king installed me."
          attribution="Abdi-Heba, King of Jerusalem"
          context="Amarna Letter to Pharaoh Akhenaten, c. 1350 BCE"
        />
        <p>The Bronze Age collapsed around 1200 BCE. Invasion, drought, trade disruption—scholars debate the causes. But the old Canaanite city-states fell. Into this vacuum came new peoples: Israelites from the hill country, Philistines from the sea.</p>
      </>
    ),
  },
  {
    id: "ancient-peoples",
    number: 2,
    title: "Peoples of the Iron Age",
    subtitle: "Canaanites, Israelites, Philistines (1200-586 BCE)",
    era: "1200–539 BCE",
    metaphor: "When the identities we argue about today first crystallized—but not yet in their modern forms.",
    layer: "Iron",
    layerColor: "#434343",
    content: (
      <>
        <p className="pi-lead-paragraph">The Iron Age saw the emergence of peoples whose names still echo today. But ancient peoples do NOT map neatly onto modern national identities.</p>
        <p>The Canaanites did not disappear. Genetic studies show substantial continuity between Bronze Age Canaanites and modern Levantine populations—Lebanese, Jews, and Palestinians all share significant Canaanite ancestry.</p>
        <QuoteMonument
          quote="Most of today's Jewish and Arabic-speaking populations share a strong genetic link to the ancient Canaanites."
          attribution="PMC genetic study"
          context="Based on ancient DNA analysis"
        />
        <p>Israelite identity emerged gradually from within this Canaanite context, not through sudden conquest. Israeli archaeologist Israel Finkelstein&apos;s research demonstrates: the settlers were likely &ldquo;indigenous to Canaan... pastoralists who lived on the fringes of settled areas.&rdquo;</p>
        <p>The Philistines—Sea Peoples who arrived around 1175 BCE—settled the southern coast. Despite distinct origins, they quickly intermarried with local populations. The name &ldquo;Palestine&rdquo; derives from &ldquo;Philistines&rdquo; via Greek.</p>
        <p>The kingdoms of Israel (north) and Judah (south) rose and fell. Assyria destroyed Israel in 722 BCE. Babylon conquered Judah in 586 BCE, destroying the First Temple and deporting elites.</p>
        <div className="pi-emphasis-block">
          <p><strong>Critical finding:</strong> Population continuity and mixture, not replacement, characterizes this region&apos;s history. Both Jewish and Arab populations today share substantial Canaanite ancestry.</p>
        </div>
      </>
    ),
  },
  {
    id: "rome-renaming",
    number: 3,
    title: "Rome and Renaming",
    subtitle: "Roman/Byzantine & 'Palaestina'",
    era: "63 BCE–636 CE",
    metaphor: "The empire that scattered the Jews and gave the land the name 'Palestine.'",
    layer: "Marble",
    layerColor: "#F5F5F5",
    content: (
      <>
        <p className="pi-lead-paragraph">Rome arrived in 63 BCE, when Pompey conquered Jerusalem. For the next seven centuries, this land would be part of the Roman (later Byzantine) Empire.</p>
        <p>The Jewish population revolted repeatedly. The Great Revolt (66-73 CE) ended with Jerusalem&apos;s destruction and the Temple&apos;s burning, depicted on the Arch of Titus in Rome.</p>
        <p>The Bar Kokhba Revolt (132-135 CE) was crushed even more brutally. After this, Emperor Hadrian renamed Jerusalem &ldquo;Aelia Capitolina&rdquo; and the province &ldquo;Syria Palaestina&rdquo;—after the Philistines, Israel&apos;s ancient enemies. The renaming was deliberate humiliation.</p>
        <QuoteMonument
          quote="All the rest of the wall encompassing the city was so completely levelled to the ground as to leave future visitors to the spot no ground for believing that it had ever been inhabited."
          attribution="Josephus"
          context="The Jewish War, Book VII (75 CE)"
        />
        <p>The Jewish population diminished but did not disappear. Communities remained, especially in Galilee. The Mishnah and Palestinian Talmud were compiled here. But Jews were now a minority in a land renamed to erase them.</p>
        <p>Christianity changed everything. After Constantine&apos;s conversion (312 CE), Palestine became the Holy Land—a Christian pilgrimage destination. Churches rose over sites of Jesus&apos;s life.</p>
        <div className="pi-emphasis-block">
          <p><strong>Key note:</strong> The name &ldquo;Palestine&rdquo; comes from this Roman renaming. It is not invented in the 20th century. But neither is it neutral—it was chosen to displace Jewish identity.</p>
        </div>
      </>
    ),
  },
  {
    id: "islamic-centuries",
    number: 4,
    title: "The Islamic Centuries",
    subtitle: "Arab Conquest to Ottoman Arrival",
    era: "636–1516 CE",
    metaphor: "When Jerusalem became holy to Islam and the land became Arab—but never only Arab.",
    layer: "Tile",
    layerColor: "#1E5F74",
    content: (
      <>
        <p className="pi-lead-paragraph">Arab armies conquered Palestine in 636-640 CE. The transformation that followed was gradual but profound.</p>
        <p>Over centuries, the population—previously Greek-speaking Christian and Aramaic-speaking Jewish—became predominantly Arabic-speaking Muslim. This happened through conversion, intermarriage, immigration, and cultural absorption—not mass population replacement.</p>
        <p>The process was not forced en masse. Christians and Jews were <em>dhimmis</em>—protected peoples who paid special taxes but could practice their faiths. But over centuries, conversion offered social and economic advantages.</p>
        <p>Jerusalem was sacred to Muslims as well—the site of Muhammad&apos;s Night Journey. The Dome of the Rock (691 CE) and Al-Aqsa Mosque were built on the Temple Mount / Haram al-Sharif. The layering of holiness on holiness would become one of history&apos;s most explosive inheritances.</p>
        <p>The Crusades (1099-1291) brought European Christian rule for two centuries—brutal conquest followed by complex coexistence. The 1099 massacre saw Jews and Muslims slaughtered in the city. Saladin&apos;s reconquest (1187) was notably less violent—ransomed rather than massacred.</p>
        <QuoteMonument
          quote="In the Temple and porch of Solomon, men rode in blood up to their knees and bridle reins."
          attribution="Raymond of Aguilers"
          context="Crusader chronicler on the 1099 massacre (imagery drawn from Revelation 14:20)"
        />
        <div className="pi-emphasis-block">
          <p><strong>Critical finding:</strong> The Arab conquest was not &ldquo;replacement.&rdquo; Modern Palestinians&apos; ancestors are largely the same population as Byzantine Palestine—transformed by Arabization and Islamization.</p>
        </div>
      </>
    ),
  },
  {
    id: "ottoman-palestine",
    number: 5,
    title: "Ottoman Palestine",
    subtitle: "Four Centuries Under the Sultans",
    era: "1516–1917",
    metaphor: "The long quiet—the centuries when Palestine was a backwater, before the world wanted it again.",
    layer: "Sandstone",
    layerColor: "#D2B48C",
    content: (
      <>
        <p className="pi-lead-paragraph">The Ottoman Empire conquered Palestine in 1516 and held it until 1917—four centuries of relative stability.</p>
        <p>For most of this period, Palestine was a provincial backwater. The Ottomans divided it into administrative districts under the province of Syria. There was no single &ldquo;Palestine&rdquo; administrative unit.</p>
        <p>The population was predominantly Arab Muslim, with Christian Arab minorities and small Jewish communities in the &ldquo;Four Holy Cities&rdquo;—Jerusalem, Hebron, Safed, and Tiberias. These Jewish communities were mostly religious scholars supported by diaspora charity.</p>
        <p>Life was agricultural, traditional, and local. Villages were organized around clan loyalties. Landlords owned large estates; peasants worked the land. Major changes were rare.</p>
        <p>Everything changed in the late 19th century. Ottoman reform, European penetration, new land laws, and the arrival of the first Zionist immigrants began transforming the land.</p>
        <div className="pi-figure-profile">
          <h4>Moses Montefiore (1784-1885)</h4>
          <p>British Jewish philanthropist who made seven trips to Palestine and built the first neighborhood outside Jerusalem&apos;s walls (Mishkenot Sha&apos;ananim, 1860).</p>
        </div>
        <p>By 1914, the population was approximately 700,000-800,000, with about 60,000-85,000 Jews (roughly 8-10%).</p>
        <div className="pi-emphasis-block">
          <p><strong>Key finding:</strong> Ottoman Palestine was neither an independent state nor an empty land. It was a functioning agricultural society with established communities.</p>
        </div>
      </>
    ),
  },
  {
    id: "birth-nationalisms",
    number: 6,
    title: "Birth of Nationalisms",
    subtitle: "Competing National Projects",
    era: "1880s–1917",
    metaphor: "When two peoples discovered they wanted the same land—and neither would yield.",
    layer: "Coal",
    layerColor: "#1C1C1C",
    content: (
      <>
        <p className="pi-lead-paragraph">In the late 19th century, as nationalism swept the world, Jews and Arabs both developed modern national movements. Both focused on the same territory.</p>
        <p>Political Zionism emerged primarily from European Jewish communities facing antisemitism. The Dreyfus Affair (1894) convinced Theodor Herzl that Jews would never be safe as minorities in Europe. The solution: a Jewish state in the ancestral homeland.</p>
        <QuoteMonument
          quote="At Basel I founded the Jewish state. If I said this out loud today I would be greeted by universal laughter. In five years perhaps, and certainly in fifty years, everyone will perceive it."
          attribution="Theodor Herzl, 1897"
          context="Israel was declared in 1948, 51 years later"
        />
        <p>The First Zionist Congress (1897) established the movement. Immigration began—first from Russia (escaping pogroms), then from across Europe. By 1914, about 85,000 Jews lived in Palestine.</p>
        <p>Arab nationalism was awakening throughout the Ottoman Empire. In Palestine specifically, Arabs began noticing that these Jewish immigrants were not traditional religious pilgrims—they were settlers with national aspirations.</p>
        <QuoteMonument
          quote="We must surely learn, from both our past and present history, how careful we must be not to provoke the anger of the native people by doing them wrong."
          attribution="Ahad Ha'am"
          context="'Truth from Eretz Israel,' 1891"
        />
        <p>The first clashes occurred before World War I. Arab newspapers warned about land purchases. In 1891, Jerusalem notables petitioned Istanbul against Jewish immigration—one of the first documented Palestinian political acts regarding Zionism.</p>
        <div className="pi-emphasis-block">
          <p><strong>Key finding:</strong> Both nationalisms are modern constructions—like all nationalisms. This does not make either less real or less legitimate. The tragedy is that both movements claimed the same land.</p>
        </div>
      </>
    ),
  },
  {
    id: "british-mandate",
    number: 7,
    title: "The British Mandate",
    subtitle: "Promises, Contradictions, Violence",
    era: "1917–1947",
    metaphor: "The empire that promised the same land to two peoples—then couldn't keep order when they fought.",
    layer: "Brass",
    layerColor: "#B5A642",
    content: (
      <>
        <p className="pi-lead-paragraph">The Balfour Declaration of 1917 promised Jews a &ldquo;national home&rdquo; while pledging that &ldquo;nothing shall be done which may prejudice the civil and religious rights of existing non-Jewish communities.&rdquo; This was contradiction, not compromise.</p>
        <QuoteMonument
          quote="His Majesty's Government view with favour the establishment in Palestine of a national home for the Jewish people..."
          attribution="Balfour Declaration"
          context="November 2, 1917"
        />
        <p>Jewish immigration transformed demographics. From 11% Jewish in 1922 to 32% in 1947. Arab resistance grew—riots in 1920, 1921, 1929 (including the Hebron massacre of 67 Jews), and the full-scale Arab Revolt (1936-1939).</p>
        <p>Britain&apos;s 1939 White Paper severely limited Jewish immigration just as European Jews desperately needed refuge—a decision that would cost hundreds of thousands of lives during the Holocaust.</p>
        <QuoteMonument
          quote="We will fight the war as if there were no White Paper, and we will fight the White Paper as if there were no war."
          attribution="David Ben-Gurion, 1939"
        />
        <p>After WWII, with Holocaust survivors demanding entry, Jewish underground groups attacked British forces. The King David Hotel bombing (1946) killed 91. Britain, exhausted, handed the problem to the UN.</p>
        <p>UN Resolution 181 (November 29, 1947) proposed partition: 56% to Jews (32% of population), 43% to Arabs, Jerusalem international. Jews accepted; Arabs rejected. Violence began immediately.</p>
        <div className="pi-emphasis-block">
          <p><strong>Critical finding:</strong> The Mandate&apos;s two promises could not both be fulfilled. A Jewish national home with significant immigration was incompatible with protecting Arab rights.</p>
        </div>
      </>
    ),
  },
  {
    id: "1948",
    number: 8,
    title: "1948",
    subtitle: "Holocaust, Partition, War, Nakba",
    era: "1945–1949",
    metaphor: "The catastrophe that created one state and shattered another people—the wound that has never healed.",
    layer: "Concrete",
    layerColor: "#808080",
    content: (
      <>
        <p className="pi-lead-paragraph">Both peoples experienced 1948 as existential. For Jews, it was survival after the Holocaust and the creation of a state. For Palestinians, it was catastrophe—the destruction of their society.</p>
        <p>The civil war phase (November 1947-May 1948) saw Jewish forces gain the upper hand. The Deir Yassin massacre (April 9, 1948)—100+ villagers killed—spread terror. Haifa and Jaffa fell. Populations fled or were expelled.</p>
        <p>On May 14, 1948, David Ben-Gurion declared Israeli independence. Arab armies invaded the next day. The war continued until 1949.</p>
        <h4>The Nakba: Scale and Mechanisms</h4>
        <p>700,000-750,000 Palestinians were displaced. 400-500 villages depopulated. ~80% of the Arab population in Israeli-controlled territory fled or was expelled.</p>
        <QuoteMonument
          quote="'Driving out' is a term with a harsh ring. Psychologically, this was one of the most difficult actions we undertook. The population of Lod did not leave willingly."
          attribution="Yitzhak Rabin"
          context="From his memoirs, passage censored in 1979 and later restored"
        />
        <p>Historian Benny Morris&apos;s research shows: ~55% fled due to Jewish military operations, ~25% from fear and panic, ~15% from explicit expulsion orders. The claim that Arab leaders ordered the flight has been largely debunked.</p>
        <p>By 1949: Israel controlled 78% of Mandate Palestine. Jordan held the West Bank and East Jerusalem. Egypt held Gaza. No peace treaties were signed—only armistices.</p>
        <div className="pi-emphasis-block">
          <p><strong>Critical finding:</strong> The Holocaust and the Nakba are not morally equivalent—6 million murdered is not the same as 700,000 displaced. But both are catastrophes that shape their peoples&apos; consciousness. Understanding this requires holding multiple truths simultaneously.</p>
        </div>
      </>
    ),
  },
  {
    id: "borders-without-peace",
    number: 9,
    title: "Borders Without Peace",
    subtitle: "New States, Refugees, Cold War",
    era: "1949–1967",
    metaphor: "The armistice lines that became borders—and the refugees who waited to return.",
    layer: "Rebar",
    layerColor: "#6B4423",
    content: (
      <>
        <p className="pi-lead-paragraph">The Green Line created a temporary boundary that became permanent in fact but was never accepted as final by any party.</p>
        <p>Israel absorbed mass immigration—700,000 Jews arrived 1948-1951, including Holocaust survivors from Europe and Mizrahi Jews expelled from Arab countries. Population doubled in three years.</p>
        <p>150,000 Palestinians remained in Israel as citizens but under military administration until 1966. Land confiscation continued under the Absentee Property Law.</p>
        <p>Palestinian refugees remained in camps in Gaza, West Bank, Lebanon, Syria, and Jordan. UNRWA was established in 1949 to administer them. Israel refused return. Resolution 194 was ignored. The refugee issue remains unresolved.</p>
        <p>The 1956 Suez Crisis saw Israel conquer Sinai, only to withdraw under US/USSR pressure. The 1964 PLO founding marked Palestinian nationalism taking organizational form.</p>
        <p>By 1967, tensions escalated: water disputes, border incidents, fedayeen raids. Nasser closed the Straits of Tiran. War was coming.</p>
        <div className="pi-emphasis-block">
          <p><strong>Key finding:</strong> Armistice is not peace. Both sides prepared for the next war, which arrived in 1967.</p>
        </div>
      </>
    ),
  },
  {
    id: "occupation",
    number: 10,
    title: "The Occupation",
    subtitle: "1967 to Oslo",
    era: "1967–1993",
    metaphor: "When Israel captured the rest of Palestine—and couldn't decide what to do with it.",
    layer: "Barbed Wire",
    layerColor: "#5C5C5C",
    content: (
      <>
        <p className="pi-lead-paragraph">The 1967 Six-Day War transformed the conflict. Israel captured the West Bank, Gaza, Sinai, and Golan Heights—tripling its controlled territory and placing millions of Palestinians under military occupation.</p>
        <p>UN Resolution 242 called for &ldquo;withdrawal from territories&rdquo; (ambiguously: &ldquo;the&rdquo; territories vs. some territories) in exchange for peace. It remains the basis for all subsequent negotiations.</p>
        <p>What was intended as &ldquo;bargaining chips&rdquo; became permanent. The first settlements appeared in 1967. By 1993, over 100,000 settlers lived in the West Bank and Gaza.</p>
        <h4>Life Under Occupation</h4>
        <p>Military administration. Permits required for movement, building, work. Land confiscation for settlements. Detention without trial. Economic restrictions. Collective punishment.</p>
        <p>The 1973 Yom Kippur War led to the Camp David Accords (1978)—full peace with Egypt; Israel returned Sinai. But the Palestinian dimension was never resolved.</p>
        <p>The First Intifada (1987-1993)—a popular uprising of strikes, boycotts, and stone-throwing—changed everything. ~1,100 Palestinians and ~160 Israelis died. It created the conditions for Oslo.</p>
        <div className="pi-emphasis-block">
          <p><strong>Key finding:</strong> Occupation intended as temporary became permanent. Settlements created &ldquo;facts on the ground&rdquo; that made withdrawal increasingly difficult.</p>
        </div>
      </>
    ),
  },
  {
    id: "oslo-collapse",
    number: 11,
    title: "Oslo's Promise and Collapse",
    subtitle: "From Handshake to Intifada to Split",
    era: "1993–2007",
    metaphor: "The peace that almost was—and how it died.",
    layer: "Plastic",
    layerColor: "#87CEEB",
    content: (
      <>
        <p className="pi-lead-paragraph">The Oslo Accords (1993) raised hopes for a two-state solution. The Palestinian Authority was established; Israel and PLO recognized each other. But Oslo was a framework, not a final agreement.</p>
        <p>The West Bank was divided: Area A (PA control), B (joint), C (Israeli control). Final status issues—Jerusalem, refugees, settlements, borders—were deferred. And settlements doubled during the &ldquo;peace process.&rdquo;</p>
        <p>Rabin&apos;s assassination by an Israeli extremist (November 1995) removed the Israeli leader most committed to territorial compromise. Camp David II (2000) failed—blame contested by both sides.</p>
        <p>The Second Intifada (2000-2005) was far deadlier than the first. Suicide bombings killed ~1,000 Israeli civilians. Israeli military operations killed ~3,000 Palestinians. Trust was destroyed.</p>
        <p>Sharon&apos;s 2005 Gaza disengagement removed all Israeli settlements but left Gaza isolated—Israel retained control of borders, airspace, and coast. In 2006, Hamas won Palestinian elections. In 2007, Hamas and Fatah split: Hamas controlled Gaza; PA/Fatah controlled parts of the West Bank.</p>
        <div className="pi-emphasis-block">
          <p><strong>Key finding:</strong> Oslo created a Palestinian Authority but not a Palestinian state. The peace process failed to deliver peace. By 2007, the two-state solution was in critical condition.</p>
        </div>
      </>
    ),
  },
  {
    id: "present",
    number: 12,
    title: "The Present Crisis",
    subtitle: "Gaza Wars and Beyond",
    era: "2007–Present",
    metaphor: "The conflict today—Gaza, settlements, walls, and the question of what comes next.",
    layer: "Glass",
    layerColor: "#E8E8E8",
    content: (
      <>
        <p className="pi-lead-paragraph">Since 2007, the conflict has been characterized by Gaza&apos;s isolation, periodic devastating wars, West Bank settlement expansion, and diplomatic stalemate.</p>
        <p>Gaza under blockade became what the UN called &ldquo;unlivable&rdquo;—96% of water unfit to drink, 4-8 hours of electricity daily, 45% unemployment. Periodic wars (2008-09, 2012, 2014, 2021) caused massive destruction.</p>
        <p>West Bank settlements expanded continuously—from 280,000 settlers in 2007 to 500,000+ by 2023 (plus 230,000 in East Jerusalem).</p>
        <h4>October 7, 2023 and Aftermath</h4>
        <p>On October 7, 2023, Hamas-led forces attacked southern Israel. ~1,200 people were killed—mostly civilians. ~240 hostages taken. It was the deadliest day for Jews since the Holocaust.</p>
        <p>Israel&apos;s military response has caused unprecedented destruction in Gaza. As of December 2024: 40,000+ killed according to Gaza Health Ministry, 1.9 million displaced, 60%+ of buildings damaged or destroyed. The conflict continues.</p>
        <p>International responses have included UN ceasefire calls (US vetoed multiple), an ICJ genocide case filed by South Africa (ongoing), and ICC arrest warrant applications for Israeli and Hamas leaders.</p>
        <div className="pi-emphasis-block">
          <p><strong>Note:</strong> This is an active conflict. Events are ongoing. Some claims require verification. The essay presents verified facts where available and documents uncertainty where it exists.</p>
        </div>
      </>
    ),
  },
];

// ============================================================================
// SIDEBAR CONTENT DATA
// ============================================================================

const sidebars: SidebarContent[] = [
  {
    id: "naming-etymology",
    title: "What Is This Place Called?",
    subtitle: "Palestine Naming Timeline & Etymology",
    content: (
      <>
        <p className="pi-lead-paragraph">Names are lenses, not proofs. The land has always been multi-named, reflecting its multi-peopled reality.</p>
        <p>The name &ldquo;Palestine&rdquo; has a clear etymological chain:</p>
        <ul className="pi-etymology-chain">
          <li><strong>Peleset</strong> — Egyptian, ~1150 BCE (Sea Peoples)</li>
          <li><strong>Palaistinē</strong> — Greek, Herodotus ~450 BCE</li>
          <li><strong>Palaestina</strong> — Latin, Roman administration</li>
          <li><strong>Filastin</strong> — Arabic, Islamic period</li>
          <li><strong>Palestine</strong> — English, via Latin/Greek</li>
        </ul>
        <p>A common misconception: &ldquo;Palestine&rdquo; was a Roman invention of 135 CE. In fact, Herodotus used the term 600 years earlier. The Romans adopted an existing geographic name—but the 135 CE renaming <em>was</em> significant: it replaced &ldquo;Judaea&rdquo; after the Bar Kokhba revolt.</p>
        <p>The land has been called: Canaan (Bronze Age), Philistia (coastal Iron Age), Israel/Judah (Iron Age kingdoms), Judaea (Roman), Syria Palaestina (post-135 CE), Jund Filastin (Islamic), various Ottoman sanjaks, and Mandatory Palestine (British).</p>
        <p><strong>What this does NOT mean:</strong> Modern Palestinians do not &ldquo;descend from Philistines&rdquo;—they do not. It does not mean Jews have no historical connection—they do. It simply explains how the name came to be.</p>
      </>
    ),
  },
  {
    id: "indigeneity",
    title: "Who Is Indigenous?",
    subtitle: "Unpacking a Contested Framework",
    content: (
      <>
        <p className="pi-lead-paragraph">The question &ldquo;Who is indigenous?&rdquo; is asked constantly. Yet the question itself is problematic.</p>
        <p>&ldquo;Indigeneity&rdquo; as a legal and anthropological concept was developed for specific situations—primarily European colonization of the Americas, Australia, and Africa—that don&apos;t map cleanly onto this case.</p>
        <p><strong>Jewish Historical Connection:</strong> 3,000+ years of archaeological and textual evidence. Ancient kingdoms. Jerusalem as capital. Daily prayers for 2,000 years. Diaspora resulted from Roman conquest. Small communities remained throughout history. Major return began late 19th century.</p>
        <p><strong>Palestinian Arab Historical Connection:</strong> 1,300+ years of continuous majority presence. Gradual Arabization of existing population. Distinct culture, dialect, traditions. Displacement in living memory (1948).</p>
        <p><strong>Why simple framings fail:</strong></p>
        <ul>
          <li>&ldquo;Jews are indigenous, Arabs are invaders&rdquo; — ignores 1,300 years of Arab presence; ignores that many &ldquo;Arabs&rdquo; descended from pre-Arab populations</li>
          <li>&ldquo;Palestinians are indigenous, Jews are colonizers&rdquo; — ignores 3,000-year Jewish connection; ignores that ~50% of Israeli Jews are Mizrahi (Middle Eastern)</li>
        </ul>
        <p><strong>Better framing:</strong> Both peoples have deep connections—of different types. Neither claim negates the other. Understanding both is essential. History doesn&apos;t assign moral winners.</p>
      </>
    ),
  },
  {
    id: "myths-truths",
    title: "Common Myths, Common Truths",
    subtitle: "What Both Sides Get Wrong—and Right",
    content: (
      <>
        <p className="pi-lead-paragraph">Advocacy for both peoples relies on mythologized histories. The goal here is not &ldquo;both sides are wrong&rdquo; nihilism but &ldquo;the truth is more complex than slogans.&rdquo;</p>
        <h4>Pro-Israel Myths</h4>
        <ul>
          <li><strong>&ldquo;A land without a people&rdquo;</strong> — Palestine had 450,000+ people in 1878</li>
          <li><strong>&ldquo;Arabs rejected every peace offer&rdquo;</strong> — Both sides have rejected offers; framing Palestinians as uniquely rejectionist is selective</li>
          <li><strong>&ldquo;Palestinians fled voluntarily&rdquo;</strong> — Israeli &ldquo;New Historians&rdquo; documented forced expulsions</li>
        </ul>
        <h4>Pro-Palestinian Myths</h4>
        <ul>
          <li><strong>&ldquo;Jews are just European colonizers&rdquo;</strong> — ~50% of Israeli Jews are Mizrahi; Jewish connection spans 3,000+ years</li>
          <li><strong>&ldquo;No Jewish connection to the land&rdquo;</strong> — Iron Age kingdoms are archaeologically attested</li>
          <li><strong>&ldquo;Israel is uniquely evil&rdquo;</strong> — Violations are documented but comparable situations exist globally</li>
        </ul>
        <h4>Common Truths</h4>
        <ul>
          <li><strong>The Nakba happened</strong> — 700,000+ displaced; documented by Israeli and Palestinian historians</li>
          <li><strong>October 7 was a massacre</strong> — ~1,200 killed, mostly civilians; a war crime regardless of context</li>
          <li><strong>Occupation is real</strong> — 57 years; different legal systems for settlers and Palestinians</li>
          <li><strong>Both peoples exist and aren&apos;t going away</strong> — ~7 million each; any solution requires acknowledging both</li>
        </ul>
      </>
    ),
  },
];

// ============================================================================
// SOURCES DATA
// ============================================================================

// Academic Books & Journals
const academicSources: Source[] = [
  { title: "A History of Modern Palestine", author: "Ilan Pappé", type: "academic", tradition: "Israeli", url: "https://www.cambridge.org/core/books/history-of-modern-palestine/340212C82BBF67C63552F6B822E10B0C" },
  { title: "The Question of Palestine", author: "Edward Said", type: "academic", tradition: "Palestinian", url: "https://www.penguinrandomhouse.com/books/159795/the-question-of-palestine-by-edward-w-said/" },
  { title: "1948: A History of the First Arab-Israeli War", author: "Benny Morris", type: "academic", tradition: "Israeli", url: "https://yalebooks.yale.edu/book/9780300151121/1948/" },
  { title: "The Ethnic Cleansing of Palestine", author: "Ilan Pappé", type: "academic", tradition: "Israeli", url: "https://oneworld-publications.com/work/the-ethnic-cleansing-of-palestine/" },
  { title: "Palestine: A Four Thousand Year History", author: "Nur Masalha", type: "academic", tradition: "Palestinian", url: "https://www.goodreads.com/book/show/36645450-palestine" },
  { title: "The Bible Unearthed", author: "Israel Finkelstein & Neil Silberman", type: "academic", tradition: "Israeli", url: "https://www.simonandschuster.com/books/The-Bible-Unearthed/Israel-Finkelstein/9780684869131" },
  { title: "The Birth of the Palestinian Refugee Problem Revisited", author: "Benny Morris", type: "academic", tradition: "Israeli", url: "https://www.cambridge.org/core/books/birth-of-the-palestinian-refugee-problem-revisited/8AE72A6813CEA7DDDE8F9386313F0D97" },
  { title: "Palestinian Identity", author: "Rashid Khalidi", type: "academic", tradition: "Palestinian", url: "https://cup.columbia.edu/book/palestinian-identity/9780231150750" },
  { title: "The Iron Cage", author: "Rashid Khalidi", type: "academic", tradition: "Palestinian", url: "https://www.beacon.org/The-Iron-Cage-P669.aspx" },
];

// University Research Guides (.edu) - Tier 1
const eduSources: Source[] = [
  { title: "Israel & Palestine: Historical Primary Sources", author: "UC Berkeley Library", type: "academic", tradition: "International", url: "https://guides.lib.berkeley.edu/c.php?g=810896&p=7333572" },
  { title: "Palestinian Studies: Archives & Primary Sources", author: "Brown University Library", type: "academic", tradition: "International", url: "https://libguides.brown.edu/Palestine/primary" },
  { title: "Middle East Primary Sources Guide", author: "Princeton University Library", type: "academic", tradition: "International", url: "https://libguides.princeton.edu/c.php?g=84230&p=543629" },
  { title: "Readings and Digital Resources on Palestine", author: "Harvard Center for Middle Eastern Studies", type: "academic", tradition: "International", url: "https://cmes.fas.harvard.edu/news/readings-and-digital-resources-palestine" },
];

// Primary Archives (.gov) - Tier 1
const govSources: Source[] = [
  { title: "Mandate for Palestine (1922)", author: "Library of Congress", type: "archive", tradition: "International", url: "https://www.loc.gov/item/2021666887/" },
  { title: "American Colony in Jerusalem Collection", author: "Library of Congress", type: "archive", tradition: "International", url: "https://www.loc.gov/collections/american-colony-in-jerusalem/about-this-collection/" },
  { title: "U.S. Recognition of Israel: Primary Documents", author: "National Archives", type: "archive", tradition: "International", url: "https://www.archives.gov/education/lessons/us-israel" },
];

// Institutional Reports & Human Rights Organizations
const institutionalSources: Source[] = [
  { title: "UN Information System on the Question of Palestine", type: "institutional", tradition: "International", url: "https://www.un.org/unispal/" },
  { title: "B'Tselem Human Rights Reports", type: "institutional", tradition: "Israeli", url: "https://www.btselem.org/" },
  { title: "Institute for Palestine Studies", type: "institutional", tradition: "Palestinian", url: "https://www.palestine-studies.org/" },
  { title: "Amnesty International Reports", type: "institutional", tradition: "International", url: "https://www.amnesty.org/en/location/middle-east-and-north-africa/middle-east/israel-and-the-occupied-palestinian-territory/report-israel-and-the-occupied-palestinian-territory/" },
  { title: "UN OCHA Reports on Gaza", type: "institutional", tradition: "International", url: "https://www.ochaopt.org/" },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const PalestineIsraelClient: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / scrollHeight) * 100;
      setProgress(Math.min(currentProgress, 100));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="palestine-israel-essay">
      <a href="#the-land" className="pi-skip-link">Skip to main content</a>
      <StratigraphyProgress progress={progress} currentChapter={currentChapter} />
      <HeroSection />

      {/* Chapters */}
      {chapters.map((chapter, index) => (
        <Section key={chapter.id} id={chapter.id} className="pi-chapter" onVisible={() => setCurrentChapter(index)}>
          <ChapterHeader chapter={chapter} />
          <div className="pi-chapter-content">
            {chapter.content}
            <ChapterImages chapterId={chapter.id} />
          </div>
        </Section>
      ))}

      {/* Sidebars */}
      <Section id="sidebars" className="pi-sidebars-section">
        <h2 className="pi-sidebars-heading">Sidebars</h2>
        <p className="pi-sidebars-intro">Deeper dives into contested questions that deserve careful treatment.</p>
        {sidebars.map((sidebar) => (
          <div key={sidebar.id} className="pi-sidebar">
            <div className="pi-sidebar-header">
              <span className="pi-sidebar-label">Sidebar</span>
              <h3 className="pi-sidebar-title">{sidebar.title}</h3>
              <p className="pi-sidebar-subtitle">{sidebar.subtitle}</p>
            </div>
            <div className="pi-sidebar-content">{sidebar.content}</div>
          </div>
        ))}
      </Section>

      {/* Sources */}
      <section className="pi-sources-section">
        <div className="pi-sources-content">
          <h3 className="pi-sources-title">Sources & Further Reading</h3>
          <p className="pi-sources-methodology">
            This essay draws on sources from multiple scholarly traditions. Each source is labeled by its institutional origin for transparency. Contested claims are sourced from multiple traditions.
          </p>

          {/* Primary Archives (.gov) */}
          <h4 className="pi-sources-category">Primary Archives <span className="pi-source-domain">.gov</span></h4>
          <ul className="pi-sources-list">
            {govSources.map((source, index) => (
              <li key={`gov-${index}`}>
                {source.url ? (
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="pi-source-title pi-source-link">{source.title}</a>
                ) : (
                  <span className="pi-source-title">{source.title}</span>
                )}
                {source.author && <span className="pi-source-author"> — {source.author}</span>}
                <span className="pi-source-type">{source.type}</span>
              </li>
            ))}
          </ul>

          {/* University Research Guides (.edu) */}
          <h4 className="pi-sources-category">University Research Guides <span className="pi-source-domain">.edu</span></h4>
          <ul className="pi-sources-list">
            {eduSources.map((source, index) => (
              <li key={`edu-${index}`}>
                {source.url ? (
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="pi-source-title pi-source-link">{source.title}</a>
                ) : (
                  <span className="pi-source-title">{source.title}</span>
                )}
                {source.author && <span className="pi-source-author"> — {source.author}</span>}
                <span className="pi-source-type">{source.type}</span>
              </li>
            ))}
          </ul>

          {/* Academic Books & Journals */}
          <h4 className="pi-sources-category">Academic Books & Journals</h4>
          <ul className="pi-sources-list">
            {academicSources.map((source, index) => (
              <li key={`academic-${index}`}>
                {source.url ? (
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="pi-source-title pi-source-link">{source.title}</a>
                ) : (
                  <span className="pi-source-title">{source.title}</span>
                )}
                {source.author && <span className="pi-source-author"> — {source.author}</span>}
                <span className="pi-source-type">{source.type}</span>
                <span className="pi-source-tradition">{source.tradition}</span>
              </li>
            ))}
          </ul>

          {/* Institutional Reports */}
          <h4 className="pi-sources-category">Institutional Reports & Human Rights Organizations</h4>
          <ul className="pi-sources-list">
            {institutionalSources.map((source, index) => (
              <li key={`inst-${index}`}>
                {source.url ? (
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="pi-source-title pi-source-link">{source.title}</a>
                ) : (
                  <span className="pi-source-title">{source.title}</span>
                )}
                {source.author && <span className="pi-source-author"> — {source.author}</span>}
                <span className="pi-source-type">{source.type}</span>
                <span className="pi-source-tradition">{source.tradition}</span>
              </li>
            ))}
          </ul>

          {/* Image Credits */}
          <h4 className="pi-sources-category">Image Credits</h4>
          <p className="pi-sources-note">All images sourced from Wikimedia Commons with proper licensing. No fair use images.</p>
          <ul className="pi-sources-list pi-image-credits">
            {Object.entries(chapterImages).flatMap(([, images]) =>
              images.map((img, idx) => (
                <li key={`img-${img.alt}-${idx}`} className="pi-image-credit">
                  <span className="pi-image-subject">{img.alt}</span>
                  {img.attribution && <span className="pi-image-attribution"> — {img.attribution}</span>}
                  <span className="pi-image-license">{img.license}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="pi-essay-footer">
        <p className="pi-footer-dedication">
          This visual essay was created with the intention of honoring all victims of this long conflict and presenting the historical record as accurately as current scholarship allows. Where historians disagree, we have documented the disagreement. Where evidence is contested, we have said so.
        </p>
        <div className="pi-footer-phrase">
          <span className="pi-phrase-hebrew">זכור</span>
          <span className="pi-phrase-divider">·</span>
          <span className="pi-phrase-arabic">تذكر</span>
          <p className="pi-phrase-translation">Remember</p>
        </div>
      </footer>
    </div>
  );
};

export default PalestineIsraelClient;
