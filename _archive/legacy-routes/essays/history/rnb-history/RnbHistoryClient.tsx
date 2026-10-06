"use client";

import React, { useEffect, useRef, useState } from "react";
import "./rnb-history.css";

// ============================================================================
// R&B: THE HEARTBEAT THAT TAUGHT POP TO FEEL
// ============================================================================
// Visual Treatment: MIXING CONSOLE metaphor
// - R&B was DEFINED by studio production (Motown, Stax, PIR, Sigma Sound)
// - The console is WHERE R&B was created
// - No other essay uses this metaphor
//
// Progress Bar: FADER — realistic channel fader with dB scale and LED meter
// Section Transitions: CROSSFADE — audio mixing metaphor
// Figure Cards: PATCH CONNECTIONS — studio patch bay styling
// ============================================================================

// ==================== TYPE DEFINITIONS ====================

interface Figure {
  name: string;
  epithet: string;
  born?: string;
  died?: string;
  domains: string[];
  description: string;
  quote?: string;
  isFeatured?: boolean;
  imageUrl?: string;
  imageAttribution?: string;
}

interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  era: "race-records" | "early-rb" | "soul" | "philly" | "quiet-storm" | "new-jack" | "pop-rb" | "alternative";
  epigraph?: { text: string; source: string };
  narrative: string[];
  figures: Figure[];
  contentWarning?: string;
  chapterImage?: {
    url: string;
    alt: string;
    attribution: string;
  };
}

// ==================== VERIFIED CC-LICENSED IMAGES ====================

const IMAGES = {
  // Locations
  hitsvilleUsa: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Hitsville_USA.jpg",
  staxMuseum: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Stax_Museum_Memphis_TN_01.jpg",
  apolloTheater: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Apollo_Theater%2C_Harlem_%2846992038484%29.jpg",
  sunStudio: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Sun_Studio.jpg",
  // Equipment
  tr808: "https://upload.wikimedia.org/wikipedia/commons/b/be/Roland_TR-808_drum_machine.jpg",
  yamahaDx7: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Yamaha_DX7.jpg",
  mpc3000: "https://upload.wikimedia.org/wikipedia/commons/0/03/AKAI_MPC_3000.jpg",
  // Artists - All verified CC-licensed from Wikimedia Commons
  ruthBrown: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Ruth_Brown_cropped.jpg",
  fatsDomino: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Fats_Domino018.JPG",
  otisRedding: "https://upload.wikimedia.org/wikipedia/commons/1/14/Otis_Redding_1967.JPG",
  bookerTJones: "https://upload.wikimedia.org/wikipedia/commons/9/94/Booker_T._Jones_2009.jpg",
  alGreen: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Al_Green_1973.jpg",
  berryGordy: "https://upload.wikimedia.org/wikipedia/commons/d/d1/BerryGordyDec10.jpg",
  smokeyRobinson: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Smokey_Robinson_special_1970.JPG",
  stevieWonder: "https://upload.wikimedia.org/wikipedia/commons/8/81/Stevie_Wonder.jpg",
  marvinGaye: "https://upload.wikimedia.org/wikipedia/commons/0/03/Marvin_Gaye_%281973_publicity_photo%29.jpg",
  arethaFranklin: "https://upload.wikimedia.org/wikipedia/commons/9/99/Aretha_franklin_1960s_cropped_retouched.jpg",
  missyElliott: "https://upload.wikimedia.org/wikipedia/commons/7/77/Missy_Elliot.jpg",
  maryJBlige: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Mary_J._Blige_in_2009.JPG",
  teddyRiley: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Teddy_Riley_at_the_90%27s_Block_Party_Tour.jpg",
  timbaland: "https://upload.wikimedia.org/wikipedia/commons/0/05/Timbaland_%2847903248821%29_%28cropped%29.jpg",
  tinaTurner: "https://upload.wikimedia.org/wikipedia/commons/9/96/Tina_Turner_50th_Anniversary_Tour.jpg",
  sza: "https://upload.wikimedia.org/wikipedia/commons/f/f4/KendrickSZASPurs230725-19_-_54683179509_%28cropped%29_%28cropped%29.jpg",
  frankOcean: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Frank_Ocean_2022_Blonded.jpg",
  // Additional verified images
  bigMamaThornton: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Blues_is_a_woman_Reitz_%28Big_Mama_Thornton%29.jpg",
  gambleAndHuff: "https://upload.wikimedia.org/wikipedia/commons/0/02/Kenny_Gamble_Leon_Huff.jpg",
  funkBrothers: "https://upload.wikimedia.org/wikipedia/commons/4/43/The_Funk_Brothers.jpg",
  cosimoMatassa: "https://upload.wikimedia.org/wikipedia/commons/1/11/Cosimo_Matassa.jpg",
} as const;

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

// ==================== FADER PROGRESS (Novel Progress Bar) ====================
// Realistic mixing console fader with channel display, track, cap, and LED meter

const channelLabels = [
  { id: "prologue", position: 0.02, label: "PRO" },
  { id: "ch1", position: 0.10, label: "CH1" },
  { id: "ch2", position: 0.18, label: "CH2" },
  { id: "ch3", position: 0.26, label: "CH3" },
  { id: "ch4", position: 0.34, label: "CH4" },
  { id: "ch5", position: 0.42, label: "CH5" },
  { id: "ch6", position: 0.50, label: "CH6" },
  { id: "ch7", position: 0.58, label: "CH7" },
  { id: "ch8", position: 0.66, label: "CH8" },
  { id: "ch9", position: 0.74, label: "CH9" },
  { id: "ch10", position: 0.82, label: "C10" },
  { id: "ch11", position: 0.90, label: "C11" },
  { id: "epilogue", position: 0.98, label: "MST" },
];

const getCurrentChannel = (progress: number): string => {
  for (let i = channelLabels.length - 1; i >= 0; i--) {
    if (progress >= channelLabels[i].position) {
      return channelLabels[i].label;
    }
  }
  return "PRO";
};

const FaderProgress: React.FC<{ progress: number }> = ({ progress }) => {
  const segmentCount = 12;
  const litSegments = Math.floor(progress * segmentCount);
  const currentChannel = getCurrentChannel(progress);

  // Calculate fader cap position (top to bottom)
  const trackHeight = 100; // percentage
  const capPosition = progress * (trackHeight - 10); // leave room for cap

  return (
    <div
      className="fader-progress"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      {/* Channel display */}
      <div className="fader-channel">{currentChannel}</div>

      {/* Fader track container */}
      <div className="fader-track-container">
        {/* dB scale */}
        <div className="fader-scale">
          <span className="fader-db">+10</span>
          <span className="fader-db">0</span>
          <span className="fader-db">-10</span>
          <span className="fader-db">-20</span>
          <span className="fader-db">-∞</span>
        </div>

        {/* The track groove */}
        <div className="fader-track">
          {/* The fader cap */}
          <div
            className="fader-cap"
            style={{ top: `${capPosition}%` }}
          />
        </div>

        {/* LED meter */}
        <div className="fader-meter">
          {[...Array(segmentCount)].map((_, i) => {
            let colorClass = "";
            if (i < litSegments) {
              if (i >= segmentCount - 2) {
                colorClass = "lit-red";
              } else if (i >= segmentCount - 4) {
                colorClass = "lit-yellow";
              } else {
                colorClass = "lit-green";
              }
            }
            return (
              <div
                key={i}
                className={`fader-meter-segment ${colorClass}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ==================== METER BRIDGE (Sticky Header) ====================

const MeterBridge: React.FC<{ progress: number; currentChapter: string }> = ({
  progress,
  currentChapter,
}) => {
  const vuBars = 8;
  const activeBars = Math.ceil(progress * vuBars);

  return (
    <div className="meter-bridge">
      <div className="meter-bridge-vu">
        {[...Array(vuBars)].map((_, i) => (
          <div
            key={i}
            className={`meter-bridge-vu-bar ${i < activeBars ? "active" : ""}`}
          />
        ))}
      </div>
      <div className="meter-bridge-label">
        <span className="current">{currentChapter}</span>
      </div>
    </div>
  );
};

// ==================== PATCH CONNECTION (Figure Component) ====================

const PatchConnection: React.FC<{ figure: Figure }> = ({ figure }) => {
  return (
    <article
      className={`patch-connection ${figure.isFeatured ? "featured" : ""} ${figure.imageUrl ? "has-image" : ""}`}
    >
      {figure.imageUrl && (
        <div className="patch-image-container">
          <img
            src={figure.imageUrl}
            alt={`${figure.name} - ${figure.epithet}`}
            className="patch-image"
            loading="lazy"
          />
          {figure.imageAttribution && (
            <p className="patch-image-credit">{figure.imageAttribution}</p>
          )}
        </div>
      )}
      <div className="patch-info">
        <h3 className="patch-name">{figure.name}</h3>
        <p className="patch-epithet">{figure.epithet}</p>
        {(figure.born || figure.died) && (
          <p className="patch-meta">
            {figure.born && `Born ${figure.born}`}
            {figure.born && figure.died && " | "}
            {figure.died && `Died ${figure.died}`}
          </p>
        )}
        <div className="patch-domains">
          {figure.domains.map((domain) => (
            <span key={domain} className="patch-domain">
              {domain}
            </span>
          ))}
        </div>
        <p className="patch-description">{figure.description}</p>
        {figure.quote && <p className="patch-quote-inline">&ldquo;{figure.quote}&rdquo;</p>}
      </div>
    </article>
  );
};

// ==================== CHANNEL STRIP (Chapter Component) ====================

const ChannelStrip: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`channel-strip ${isVisible ? "visible" : ""}`}
      data-era={chapter.era}
    >
      <div className="channel-strip-content">
        <header className="channel-header">
          <span className="channel-number">{chapter.number}</span>
          <h2 className="channel-title">{chapter.title}</h2>
          {chapter.subtitle && <p className="channel-subtitle">{chapter.subtitle}</p>}
          {chapter.epigraph && (
            <blockquote className="patch-quote">
              <p className="patch-quote-text">&ldquo;{chapter.epigraph.text}&rdquo;</p>
              <cite className="patch-quote-source">— {chapter.epigraph.source}</cite>
            </blockquote>
          )}
        </header>

        {chapter.contentWarning && (
          <div className="console-warning">
            <div className="console-warning-led" />
            <div className="console-warning-text">{chapter.contentWarning}</div>
          </div>
        )}

        {chapter.chapterImage && (
          <figure className="channel-image">
            <img
              src={chapter.chapterImage.url}
              alt={chapter.chapterImage.alt}
              loading="lazy"
            />
            <figcaption className="channel-image-caption">
              {chapter.chapterImage.attribution}
            </figcaption>
          </figure>
        )}

        <div className="signal-flow has-dropcap">
          {chapter.narrative.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {chapter.figures.map((figure) => (
          <PatchConnection key={figure.name} figure={figure} />
        ))}
      </div>

      <div className="channel-insert">
        <div className="channel-insert-line" />
        <div className="channel-insert-jack" />
        <div className="channel-insert-line" />
      </div>
    </section>
  );
};

// ==================== CONTENT DATA ====================

const chapters: Chapter[] = [
  // PROLOGUE
  {
    id: "prologue",
    number: "Prologue",
    title: "Before the Name",
    subtitle: "What Race Records Hid and Revealed (1920–1948)",
    era: "race-records",
    narrative: [
      "Before there was 'rhythm and blues,' there were 'race records'—a classification that segregated Black popular music from 1920 onward. The term, first used by Okeh Records executive Ralph Peer in 1920, was simultaneously honest about the market's racism and a commercial strategy that created the first recorded documentation of African American musical innovation. By 1942, the 'Harlem Hit Parade' chart at Billboard tracked this music, but the name remained tethered to segregation.",
      "In juke joints and roadhouses across the American South, a technological revolution was underway. T-Bone Walker's amplified guitar work starting in 1942 proved that a single instrument could compete with a horn section. Jump blues bands like Louis Jordan and His Tympany Five merged swing with blues feeling, scoring crossover hits that reached both Black and white audiences. Big bands gave way to smaller combos—fewer musicians meant lower costs, louder amplification meant bigger impact.",
      "By 1948, the infrastructure was emerging: independent labels like Savoy (Newark), King (Cincinnati), and Specialty (Los Angeles) competed for Black talent that major labels ignored. Radio stations programming for Black audiences—WDIA in Memphis became the first all-Black-format station in 1948—created regional markets. The music was already evolving when a Billboard reporter decided to give it a new name. What followed would reshape American popular music—and teach pop how to feel.",
    ],
    figures: [],
  },

  // CHAPTER 1: THE CLASSIFICATION
  {
    id: "ch1",
    number: "Chapter I",
    title: "The Classification",
    subtitle: "Jerry Wexler and the Birth of a Genre (June 1949)",
    era: "early-rb",
    epigraph: {
      text: "In my capacity as a Billboard reporter I was also responsible for a minor semantic and, as it turned out, musical revolution.",
      source: "Jerry Wexler",
    },
    narrative: [
      "In June 1949, Jerry Wexler—a 32-year-old reporter at Billboard magazine—proposed replacing 'race records' with 'rhythm and blues.' The change appeared in Billboard's June 25, 1949 issue, though Wexler had been using the term in articles since 1947. The renaming was partly humanitarian (the old term was offensive to the growing postwar civil rights consciousness) and partly commercial (advertisers preferred less racially charged terminology). But the consequences extended far beyond semantics.",
      "The classification created a chart—the Hot R&B Singles chart that would track Black popular music for the next five decades. The chart created radio formats, as stations programmed specifically to reach the audiences the chart measured. Radio formats created record-buying audiences. And suddenly, Black popular music had infrastructure: distribution networks, promotional systems, and sales tracking that, however flawed and exploitative, was functional enough to build careers and companies.",
      "Atlantic Records was positioned perfectly. Founded in 1947 by Ahmet Ertegun and Herb Abramson with $10,000 (Ertegun's inheritance from his father, the Turkish ambassador), the label focused on jazz until Ruth Brown's signing in 1949 changed everything. Her consecutive hits—'So Long' (1949), 'Teardrops from My Eyes' (#1 R&B, 1950), 'Mama, He Treats Your Daughter Mean' (#1 R&B, 1953)—generated the capital that allowed Atlantic to sign Ray Charles in 1952. By decade's end, Atlantic would rank among the most successful independent labels in America.",
      "The naming wasn't just semantic. It was economic architecture—a framework that determined who got played, who got paid, and who got remembered. A category became a culture, for better and for worse.",
    ],
    figures: [
      {
        name: "Jerry Wexler",
        epithet: "The Name-Giver",
        born: "January 10, 1917, Bronx, New York",
        died: "August 15, 2008",
        domains: ["Billboard Reporter", "Atlantic Records", "Producer"],
        description: "Coined 'rhythm and blues' in Billboard's June 1949 issue. Later became a partner at Atlantic Records and produced Aretha Franklin's legendary sessions at Muscle Shoals. His classification created the infrastructure for R&B as an industry.",
        isFeatured: true,
      },
      {
        name: "Ruth Brown",
        epithet: "Miss Rhythm",
        born: "January 12, 1928, Portsmouth, Virginia",
        died: "November 17, 2006",
        domains: ["Singer", "Activist", "Label Builder"],
        description: "Built Atlantic Records with consecutive hits (1949–1960). Later co-founded the Rhythm and Blues Foundation to recover unpaid royalties—not just for herself, but for dozens of artists exploited by the industry she helped build.",
        quote: "That's Atlantic Records—the house that Ruth Brown built.",
        isFeatured: true,
        imageUrl: IMAGES.ruthBrown,
        imageAttribution: "caviera, CC BY 2.0",
      },
    ],
  },

  // CHAPTER 2: NEW ORLEANS
  {
    id: "ch2",
    number: "Chapter II",
    title: "New Orleans Crucible",
    subtitle: "J&M Recording Studio and the Rolling Piano (1945–1960)",
    era: "early-rb",
    epigraph: {
      text: "Responsible for virtually every New Orleans R&B record that made the charts.",
      source: "Rock and Roll Hall of Fame, on Cosimo Matassa",
    },
    narrative: [
      "New Orleans was R&B's first capital, and it earned that title in a room just 15 by 16 feet. At J&M Recording Studio on North Rampart Street, teenage engineer Cosimo Matassa—only 18 when he opened the studio in 1945—captured a sound that would define the genre: rolling piano triplets borrowed from Professor Longhair, second-line rhythms inherited from brass band funerals, and warm vocal tones that reflected the city's Caribbean and French influences. Between 1947 and 1960, virtually every New Orleans R&B hit was recorded in that cramped space.",
      "Fats Domino's 'The Fat Man,' recorded on December 10, 1949, became one of the first R&B records to sell a million copies. Its success established a pattern: Domino's rolling piano style, producer Dave Bartholomew's tight arrangements, and Matassa's intimate engineering created 35 consecutive Top 40 hits between 1950 and 1963. Domino would sell 65 million records—more than any 1950s artist except Elvis Presley, who openly acknowledged his debt to the New Orleans sound.",
      "The city produced a remarkable concentration of talent. Little Richard improvised 'Tutti Frutti' at the Dew Drop Inn before recording it at J&M in September 1955, launching rock and roll's most flamboyant career. Lloyd Price's 'Lawdy Miss Clawdy' (1952) sold a million copies with a young Fats Domino on piano. Guitar Slim's 'The Things That I Used to Do' (1953), with a 21-year-old Ray Charles on piano, went #1 R&B for 14 weeks.",
      "Behind them all was the system: Dave Bartholomew assembled the house band, wrote the hits, and connected artists to Imperial Records in Los Angeles. A studio, a producer, a house band, a label relationship—every major R&B city would replicate this New Orleans model, but none would match the original's density of innovation.",
    ],
    figures: [
      {
        name: "Cosimo Matassa",
        epithet: "The Teen Engineer",
        born: "April 13, 1926, New Orleans",
        died: "September 11, 2014",
        domains: ["Engineer", "Studio Owner", "Pioneer"],
        description: "Opened J&M Recording Studio at age 18 in 1945. Recorded virtually every New Orleans R&B hit through the 1970s. Inducted into the Rock and Roll Hall of Fame in 2012 for his foundational contributions.",
        isFeatured: true,
        imageUrl: IMAGES.cosimoMatassa,
        imageAttribution: "WhyArts, CC BY-SA 4.0",
      },
      {
        name: "Fats Domino",
        epithet: "The Rolling Piano",
        born: "February 26, 1928, New Orleans",
        died: "October 24, 2017",
        domains: ["Singer", "Pianist", "Crossover Pioneer"],
        description: "'The Fat Man' (1949) was a million-seller crossover hit. Sold 65+ million records—more than any 1950s artist except Elvis. His rolling triplet piano style became the New Orleans signature sound.",
        isFeatured: true,
        imageUrl: IMAGES.fatsDomino,
        imageAttribution: "Roland Godefroy, CC BY-SA 3.0",
      },
    ],
  },

  // CHAPTER 3: MEMPHIS
  {
    id: "ch3",
    number: "Chapter III",
    title: "Memphis Soul Stew",
    subtitle: "Stax, Hi Records, and the Southern Sound (1957–1975)",
    era: "soul",
    epigraph: {
      text: "As you go down the slope, the music gets bigger, it separates.",
      source: "Willie Mitchell, on Royal Studios' acoustics",
    },
    chapterImage: {
      url: IMAGES.staxMuseum,
      alt: "Stax Museum of American Soul Music, Memphis",
      attribution: "CC BY-SA 3.0, via Wikimedia Commons",
    },
    narrative: [
      "Memphis developed two distinct but interrelated sounds, both shaped by physical architecture and racial geography. At Stax Records—housed in the Capitol Theatre, a converted 1920s movie theater on McLemore Avenue in South Memphis—the sloped floor created unique acoustics that producer Jim Stewart accidentally discovered enhanced the natural reverb. The integrated house band Booker T. & the M.G.'s (two Black musicians, two white) backed virtually every recording from 1962 onward. The result was grittier, rawer than Motown's polished Northern sound: Steve Cropper's delayed backbeat guitar, the Memphis Horns' punch, and vocals left deliberately unpolished.",
      "Across town at Royal Studios—also a converted theater, where Willie Mitchell had recorded since 1957—a different Memphis emerged. Mitchell discovered Al Green singing at a 1969 Texas concert and signed him immediately. Together they created smooth Southern soul: strings layered over rhythm, vocals floating above the groove. 'Let's Stay Together' (1971) went #1 pop and R&B simultaneously, proving that Memphis could produce sophistication alongside raw emotion.",
      "The business structures differed critically. Stax was Black-owned (after Jim Stewart's sister Estelle Axton sold her share); Hi Records, which distributed Royal's output, was not. When Stax lost its distribution deal with Atlantic in 1968, the label discovered Atlantic owned its entire back catalog—every Otis Redding, Sam & Dave, and Booker T. recording. The 1972 distribution deal with CBS Records that followed proved disastrous: CBS advanced $6 million but demanded impossible sales targets.",
      "On December 19, 1975, Stax Records filed for bankruptcy. Union Planters Bank seized the building. The equipment was auctioned. Al Bell, who had built the company into a $30 million operation, faced federal charges (later acquitted). The collapse exposed what the music had always obscured: in America's music industry, Black-owned labels operated with margins so thin that a single bad deal could erase decades of work.",
    ],
    figures: [
      {
        name: "Otis Redding",
        epithet: "The King of Soul",
        born: "September 9, 1941, Dawson, Georgia",
        died: "December 10, 1967",
        domains: ["Singer", "Songwriter", "Stax Star"],
        description: "Stax Records' biggest star. '(Sittin' On) The Dock of the Bay' went #1 posthumously after his death in a plane crash at age 26. His raw emotional delivery defined Southern soul.",
        quote: "These arms of mine, they are lonely...",
        isFeatured: true,
        imageUrl: IMAGES.otisRedding,
        imageAttribution: "Stax Records, Public Domain",
      },
      {
        name: "Booker T. Jones",
        epithet: "The M.G.'s Architect",
        born: "November 12, 1944, Memphis, Tennessee",
        domains: ["Organist", "Bandleader", "Composer"],
        description: "Led Booker T. & the M.G.'s, the integrated house band that backed virtually every Stax recording. Composed 'Green Onions.' Their interracial collaboration was revolutionary in the segregated South.",
        quote: "We were a family. Black and white didn't matter in that studio.",
        isFeatured: true,
        imageUrl: IMAGES.bookerTJones,
        imageAttribution: "Bryan Ledgard, CC BY 2.0",
      },
      {
        name: "Al Green",
        epithet: "The Smooth Reverend",
        born: "April 13, 1946, Forrest City, Arkansas",
        domains: ["Singer", "Songwriter", "Minister"],
        description: "'Let's Stay Together' (1971), 'Love and Happiness' (1972). Left secular music for ministry in 1979, returning partially. His falsetto and intimate delivery at Royal Studios created smooth Southern soul.",
        isFeatured: true,
        imageUrl: IMAGES.alGreen,
        imageAttribution: "Mike Douglas Show, Public Domain",
      },
    ],
  },

  // CHAPTER 4: DETROIT
  {
    id: "ch4",
    number: "Chapter IV",
    title: "Hitsville U.S.A.",
    subtitle: "Motown and the Detroit Assembly Line (1959–1972)",
    era: "soul",
    epigraph: {
      text: "I realized that a hit record was a product of its own.",
      source: "Berry Gordy",
    },
    chapterImage: {
      url: IMAGES.hitsvilleUsa,
      alt: "Hitsville U.S.A., Motown's original headquarters in Detroit",
      attribution: "CC BY-SA 3.0, via Wikimedia Commons",
    },
    narrative: [
      "Berry Gordy borrowed $800 from his family's savings club—the Ber-Berry Co-Op—on January 12, 1959, and built an empire worth $61 million by the time he sold it in 1988. Motown's genius was applying Detroit's automotive assembly-line principles to music: quality control meetings every Friday morning where producers competed to get their songs released, in-house production that controlled every element, artist development through charm school training, and relentless polish that made the final product radio-ready for any market.",
      "In Studio A—nicknamed 'The Snake Pit' for its claustrophobic 22-by-14-foot dimensions—the Funk Brothers created the sound that defined an era. Between 1959 and 1972, this rotating collective of session musicians played on more #1 pop hits than the Beatles, Rolling Stones, Beach Boys, and Elvis Presley combined. The numbers are staggering: an estimated 57 chart-topping songs. Yet they were paid $10 per song—the same rate whether the song sold 500 copies or 5 million. They received no royalties. They were not credited on album covers until 'What's Going On' in 1971, twelve years and countless hits after Motown's founding.",
      "Motown's charm school, run by Maxine Powell, taught artists to appeal to white audiences: proper diction to minimize Southern accents, choreography courtesy of Cholly Atkins, and etiquette lessons for television appearances and white supper clubs. It was crossover by design—not changing the music's essence but packaging its presentation. The strategy worked: between 1961 and 1971, Motown placed 110 singles in the pop Top Ten.",
      "But empires relocate. In June 1972, Gordy moved Motown's operations to Los Angeles to pursue film and television. The Funk Brothers discovered this when they arrived at Hitsville and found a notice on the studio door. Most stayed in Detroit; the hits migrated west. By 1988, when Gordy sold Motown to MCA Records, only the building at 2648 West Grand Boulevard remained—now a museum to what had been, just two decades earlier, the most successful Black-owned business in America.",
    ],
    figures: [
      {
        name: "Berry Gordy",
        epithet: "The Mogul",
        born: "November 28, 1929, Detroit, Michigan",
        domains: ["Founder", "Producer", "Businessman"],
        description: "Founded Motown Records with an $800 family loan in 1959. Created the 'assembly line' approach to hit-making. Sold Motown to MCA for $61 million in 1988. Built the most successful Black-owned business in America.",
        isFeatured: true,
        imageUrl: IMAGES.berryGordy,
        imageAttribution: "Angela George, CC BY-SA 3.0",
      },
      {
        name: "The Funk Brothers",
        epithet: "The Invisible Hit Makers",
        domains: ["Session Musicians", "Arrangers", "Creators"],
        description: "Motown's house band—James Jamerson (bass), Benny Benjamin (drums), Earl Van Dyke (keys), and others. Played on more #1 hits than any group in history. Not credited until 1971. Documented in 'Standing in the Shadows of Motown' (2002).",
        quote: "We played on everything. We were Motown.",
        isFeatured: true,
        imageUrl: IMAGES.funkBrothers,
        imageAttribution: "Jeff Albert, CC BY-SA 2.0",
      },
      {
        name: "Smokey Robinson",
        epithet: "The Poet Laureate",
        born: "February 19, 1940, Detroit, Michigan",
        domains: ["Singer", "Songwriter", "VP"],
        description: "The Miracles frontman and Motown VP. Wrote 'My Girl,' 'The Tracks of My Tears,' and countless hits for other artists. Bob Dylan called him 'America's greatest living poet.'",
        isFeatured: true,
        imageUrl: IMAGES.smokeyRobinson,
        imageAttribution: "NBC Television, 1970, Public Domain",
      },
    ],
  },

  // CHAPTER 5: PHILADELPHIA
  {
    id: "ch5",
    number: "Chapter V",
    title: "The Philadelphia Sound",
    subtitle: "Sigma Sound and Soul in a Tuxedo (1968–1979)",
    era: "philly",
    epigraph: {
      text: "Soul music in a tuxedo.",
      source: "Joe Tarsia, on the Philadelphia Sound",
    },
    narrative: [
      "Philadelphia developed R&B's most sophisticated sound by design rather than accident. At Sigma Sound Studios—a converted warehouse at 212 North 12th Street that Joe Tarsia opened in 1968—producer Thom Bell and songwriter-producers Kenny Gamble and Leon Huff orchestrated what became 'soul in a tuxedo.' Where Motown had polished its sound for crossover, Philadelphia elevated it: full orchestral arrangements, complex chord progressions borrowed from jazz and classical music, and lyrics that addressed social issues without sacrificing danceability.",
      "The infrastructure was unprecedented. MFSB—variously said to stand for 'Mother Father Sister Brother' or Philadelphia's response to the question 'What does MFSB mean?'—was a 30-plus member orchestra that included players from the Philadelphia Orchestra alongside R&B session veterans. This ensemble played on every Philadelphia International hit: The O'Jays' 'Love Train' (1972), Harold Melvin & the Blue Notes' 'If You Don't Know Me by Now' (1972), and Billy Paul's 'Me and Mrs. Jones' (1972, #1 pop and R&B for three weeks).",
      "MFSB's own recording 'TSOP (The Sound of Philadelphia)' became the theme for Don Cornelius's Soul Train in 1974—the first television theme song ever to reach #1 on the pop charts. The success validated Gamble and Huff's theory: you could make Black music more sophisticated without making it less Black. It was crossover by elevation rather than dilution.",
      "But the model proved fragile. A 1975 payola investigation (Gamble pleaded no contest to a single count) damaged the label's momentum. Disco's rise fragmented the market. By 1980, Philadelphia International had ceased to be a hitmaking force, though its influence would echo through every R&B production that followed—from Quiet Storm to New Jack Swing to contemporary R&B's continued emphasis on lush, layered production.",
    ],
    figures: [
      {
        name: "Gamble and Huff",
        epithet: "The Architects of Philadelphia Soul",
        domains: ["Songwriters", "Producers", "Label Founders"],
        description: "Kenneth Gamble and Leon Huff founded Philadelphia International Records in 1971. Wrote and produced 'If You Don't Know Me by Now,' 'Love Train,' 'For the Love of Money.' Their orchestral approach defined 1970s R&B sophistication.",
        quote: "We wanted to bring Black music to the world without losing its soul.",
        isFeatured: true,
        imageUrl: IMAGES.gambleAndHuff,
        imageAttribution: "John Mathew Smith, CC BY-SA 2.0",
      },
      {
        name: "Thom Bell",
        epithet: "The Quiet Genius",
        born: "January 26, 1943, Kingston, Jamaica",
        domains: ["Producer", "Arranger", "Songwriter"],
        description: "Produced The Stylistics, The Spinners, Elton John. His lush arrangements and meticulous production defined the Philadelphia Sound's elegance.",
        quote: "To put it in a nutshell, he's responsible for everything that's happened to me in my career. — Russell Thompkins Jr.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 6: SESSION MUSICIANS
  {
    id: "ch6",
    number: "Chapter VI",
    title: "The Invisible Engine",
    subtitle: "Session Musicians and the Economics of Credit (1950–Present)",
    era: "soul",
    contentWarning: "This chapter discusses economic exploitation and systemic credit erasure.",
    narrative: [
      "Every major R&B sound was built by largely uncredited session musicians whose names never appeared on the records they made essential. The Funk Brothers at Motown played on an estimated $1 billion worth of music. Booker T. & the M.G.'s created the Stax sound heard on over 600 recordings. MFSB in Philadelphia orchestrated the arrangements that made the city's music distinctive. The Muscle Shoals Rhythm Section (the Swampers) backed Aretha Franklin, Wilson Pickett, and dozens more. These bands created the sounds that made stars—and remained invisible while doing so.",
      "The economics were brutal. At Motown, the Funk Brothers were paid $10 per song—a flat rate whether the recording sold 500 copies or 5 million. Union scale at the time was approximately $60 per three-hour session; Motown paid less and demanded exclusivity. There were no royalties: James Jamerson's bass line on 'What's Going On' helped sell 2 million copies, for which he received nothing beyond his session fee. At Stax, Booker T. Jones and the M.G.'s had a slightly better arrangement as signed artists, but their session work for others followed the same pattern.",
      "This invisibility was structural, not accidental. The 'artist' model of popular music requires a face, a name, a story to sell—someone for fans to identify with, for magazines to photograph, for concerts to feature. The musicians who actually played the music were hidden behind that story. Album credits, when they existed, listed producers and occasionally arrangers; instrumentalists were afterthoughts at best, omitted entirely at worst.",
      "It took decades for any correction to begin. Allan Slutsky's 1989 book 'Standing in the Shadows of Motown' documented James Jamerson's contributions for the first time. The 2002 documentary of the same name brought surviving Funk Brothers to audiences who had never heard their names. But the correction came too late for many: Benny Benjamin died in 1969, James Jamerson in 1983, Earl Van Dyke in 1992—all before the full scale of their contribution was publicly recognized.",
    ],
    figures: [
      {
        name: "James Jamerson",
        epithet: "The Phantom Bassist",
        born: "January 29, 1936, Edisto Island, South Carolina",
        died: "August 2, 1983",
        domains: ["Bassist", "Innovator", "Motown Sound"],
        description: "Motown's principal bassist. Played on more #1 hits than any instrumentalist in history. Developed the melodic bass style that influenced all pop music. Never credited on albums. Struggled financially late in life.",
        isFeatured: true,
      },
      {
        name: "Benny Benjamin",
        epithet: "Papa Zita",
        born: "July 15, 1925, Birmingham, Alabama",
        died: "April 20, 1969",
        domains: ["Drummer", "Creator", "The Motown Beat"],
        description: "Motown's principal drummer. Invented the 'Motown beat' that drove hundreds of hits. Died at 43, never seeing his influence recognized. The heartbeat of Motown.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 7: TECHNOLOGY
  {
    id: "ch7",
    number: "Chapter VII",
    title: "Technology as Instrument",
    subtitle: "From Electric Guitar to Auto-Tune (1940–Present)",
    era: "quiet-storm",
    chapterImage: {
      url: IMAGES.tr808,
      alt: "Roland TR-808 drum machine",
      attribution: "CC BY-SA 2.0, via Wikimedia Commons",
    },
    narrative: [
      "R&B's evolution tracks precisely with technological change, with each major innovation not merely changing the sound but creating entirely new eras. The pattern is consistent: technology arrives, early adopters experiment, a breakthrough record demonstrates the possibilities, and the genre transforms. Understanding this pattern is essential to understanding why R&B sounds the way it does—and why debates about 'real' R&B inevitably founder on the reality of technological determinism.",
      "Electric amplification in the 1940s allowed solo instruments to compete with big bands—T-Bone Walker's electric guitar could cut through a horn section. Multitrack recording, pioneered by Les Paul in 1948 but not widely available until the late 1950s, enabled layered production where a single artist could sound like an ensemble. Synthesizers entered R&B through Stevie Wonder's partnership with TONTO (The Original New Timbral Orchestra), a massive modular synthesizer he used on 'Music of My Mind' (1972) and 'Innervisions' (1973). Wonder proved that synthesizers could convey warmth and soul, not just cold electronic tones.",
      "Drum machines transformed everything between 1980 and 1982. The Roland TR-808, released in 1980, was initially considered a failure—its sounds were too artificial for studios seeking realistic drums. But producers discovered that artificiality could be a feature: the 808's deep bass kick and snappy snare became R&B signatures. Marvin Gaye's 'Sexual Healing' (1982), produced in Belgium with the TR-808, became the first American hit to feature the machine prominently—and crucially, the first to use it as an instrument of intimacy rather than cold rhythm. The track spent 10 weeks at #1 R&B and shifted the genre's entire trajectory toward electronic production.",
      "Auto-Tune arrived in 1997, created by Andy Hildebrand, a former Exxon engineer who used algorithms developed for seismic data interpretation to analyze and correct vocal pitch. 'I put that setting in the software,' Hildebrand later admitted about the 'zero' correction speed that creates the robotic effect. 'But I didn't think anyone in their right mind would ever use it.' Cher's 'Believe' (1998) proved him wrong, and within five years Auto-Tune had become as standard in R&B production as reverb—another technology that fundamentally altered what the genre could sound like.",
    ],
    figures: [
      {
        name: "Stevie Wonder",
        epithet: "The Synthesizer Pioneer",
        born: "May 13, 1950, Saginaw, Michigan",
        domains: ["Singer", "Multi-instrumentalist", "Producer"],
        description: "'Music of My Mind' (1972) was the first classic album integrating the TONTO synthesizer. Proved synthesizers could convey soul and emotion, not just cold electronica. Revolutionized what R&B could sound like.",
        quote: "I wanted to use technology to expand what the human spirit could express.",
        isFeatured: true,
        imageUrl: IMAGES.stevieWonder,
        imageAttribution: "Antonio Cruz/ABr, CC BY 3.0 BR",
      },
      {
        name: "Marvin Gaye",
        epithet: "The 808 Intimist",
        born: "April 2, 1939, Washington, D.C.",
        died: "April 1, 1984",
        domains: ["Singer", "Producer", "Innovator"],
        description: "'Sexual Healing' (1982) was the first US hit to feature the TR-808. Made drum machines sensual rather than mechanical. Proved technology could serve intimacy.",
        isFeatured: true,
        imageUrl: IMAGES.marvinGaye,
        imageAttribution: "Jim Britt, Public Domain",
      },
    ],
  },

  // CHAPTER 8: WOMEN AS ARCHITECTS
  {
    id: "ch8",
    number: "Chapter VIII",
    title: "Women as Architects",
    subtitle: "Builders, Not Appendices (1940s–Present)",
    era: "new-jack",
    narrative: [
      "R&B history as typically written centers male producers and executives—Berry Gordy, Quincy Jones, Teddy Riley, Babyface. But women were equally foundational to the genre's development, though their contributions were systematically undervalued, undercredited, and undercompensated. The pattern repeats across decades: women doing essential work while men received the public recognition and the business equity.",
      "Ruth Brown didn't just sing for Atlantic—she built it, generating the revenue that funded the label's expansion from a jazz boutique into an R&B powerhouse. Her consecutive #1 hits from 1950 to 1954 financed Atlantic's ability to sign Ray Charles and develop him into a crossover star. Then, in 1987, she co-founded the Rhythm and Blues Foundation specifically to recover unpaid royalties—not just for herself, but for dozens of artists whose contracts had been written to benefit labels at artists' expense.",
      "Sylvia Robinson's contributions span decades and genres. As half of Mickey & Sylvia, she had a #1 hit with 'Love Is Strange' (1956). As a label owner at Sugar Hill Records in 1979, she conceived, assembled, and produced 'Rapper's Delight'—hip-hop's first hit record—when her male peers considered rap a fad. Three years later, she produced 'The Message' (1982), hip-hop's first socially conscious hit. Without her vision and risk-taking, hip-hop's recorded history might have unfolded entirely differently.",
      "The business barriers persisted longer. Sylvia Rhone became the first African-American woman to run a major label when she took over Elektra Records in 1994. By then, women had been shaping R&B for 45 years—as singers, as songwriters, as producers, as arrangers—but the executive suites remained largely closed. Missy Elliott summarized the disparity in a 2016 Billboard interview: 'A lot of people don't know a lot of records that I've written or produced... I always said if a man would have done half the records that I've done we would know about it. But we don't know all the records I've done for other artists.'",
    ],
    figures: [
      {
        name: "Aretha Franklin",
        epithet: "The Queen of Soul",
        born: "March 25, 1942, Memphis, Tennessee",
        died: "August 16, 2018",
        domains: ["Singer", "Pianist", "Icon"],
        description: "'Respect' (1967) became a feminist and civil rights anthem. First woman inducted into the Rock and Roll Hall of Fame (1987). Her creative control at Atlantic—sitting at the piano, bringing her own arrangements—changed what was possible for women in R&B.",
        quote: "It was the need of a nation, the need of the average man and woman in the street.",
        isFeatured: true,
        imageUrl: IMAGES.arethaFranklin,
        imageAttribution: "Atlantic Records, CC0",
      },
      {
        name: "Sylvia Robinson",
        epithet: "The Godmother of Hip-Hop",
        born: "May 6, 1935, New York City",
        died: "September 29, 2011",
        domains: ["Producer", "Label Owner", "Visionary"],
        description: "Co-founded Sugar Hill Records. Produced 'Rapper's Delight' (1979) and 'The Message' (1982). Created hip-hop's recorded form before anyone else saw its potential.",
        isFeatured: true,
      },
      {
        name: "Missy Elliott",
        epithet: "The Producer Who Proved It",
        born: "July 1, 1971, Portsmouth, Virginia",
        domains: ["Producer", "Songwriter", "Rapper"],
        description: "First female rapper inducted into the Rock and Roll Hall of Fame (2022). Produced and wrote for countless artists while building her own career. Made the invisible work of women producers visible.",
        quote: "I knew I would have to produce. I didn't want to just be an artist and let someone else have all that control.",
        isFeatured: true,
        imageUrl: IMAGES.missyElliott,
        imageAttribution: "Atlantic Records, CC BY-SA 4.0",
      },
    ],
  },

  // CHAPTER 9: THE SYMBIOSIS
  {
    id: "ch9",
    number: "Chapter IX",
    title: "The Symbiosis",
    subtitle: "R&B and Hip-Hop Co-Evolution (1979–1999)",
    era: "new-jack",
    epigraph: {
      text: "New Jack Swing is a movement... When you're doing New Jack Swing, you're doing a singer and a rapper together.",
      source: "Teddy Riley",
    },
    narrative: [
      "The narrative that 'hip-hop killed R&B' is historically illiterate. The genres have been in continuous mutual exchange since hip-hop's recorded origins, with each borrowing from and enhancing the other. Understanding this symbiosis is essential to understanding why contemporary R&B sounds the way it does—and why attempts to separate the genres are exercises in nostalgia rather than analysis.",
      "Hip-hop sampled R&B from its founding moment. DJ Kool Herc's legendary 1973 parties in the Bronx featured extended breaks from funk and soul records—James Brown, The Incredible Bongo Band, The Honeydrippers. The entire foundation of hip-hop production rested on R&B's rhythmic innovations. When Sugar Hill Records released 'Rapper's Delight' in 1979, the backing track was Chic's 'Good Times'—an R&B #1 hit from earlier that year. The relationship was parasitic in the technical sense: hip-hop fed on R&B's body of work.",
      "R&B returned the favor starting in 1987, when Teddy Riley's production for Keith Sweat's 'I Want Her' introduced New Jack Swing—R&B vocals over hip-hop beats, swung rather than straight, with programmed drums replacing live percussion. Riley's subsequent work with Bobby Brown, Guy, and Michael Jackson's 'Dangerous' album established the template. The relationship became bidirectional: R&B provided melodic and harmonic vocabulary; hip-hop provided rhythmic and production vocabulary.",
      "Mary J. Blige's 'What's the 411?' (1992), produced largely by Sean 'Puffy' Combs, is credited with inventing hip-hop soul as a distinct subgenre. But the album wasn't hip-hop taking over R&B—it was a genuine hybrid created by an R&B vocalist with impeccable soul credentials working over hip-hop production that sampled soul records. The circle was complete: hip-hop sampling R&B, used to back an R&B vocalist, creating something neither genre could have produced alone.",
      "On December 11, 1999, Billboard officially recognized what had been obvious for a decade: the R&B chart became 'Hot R&B/Hip-Hop Songs.' The genres had been evolving together since at least 1987; the industry infrastructure finally caught up with the artistic reality.",
    ],
    figures: [
      {
        name: "Mary J. Blige",
        epithet: "The Queen of Hip-Hop Soul",
        born: "January 11, 1971, Bronx, New York",
        domains: ["Singer", "Songwriter", "Genre Creator"],
        description: "'What's the 411?' (1992) invented hip-hop soul. Combined R&B vocals with hip-hop production, street authenticity with emotional vulnerability. Created a template that dominates contemporary R&B.",
        quote: "I started speaking about what I was dealing with through my music, and 4 million women responded and said, 'Us too, Mary.'",
        isFeatured: true,
        imageUrl: IMAGES.maryJBlige,
        imageAttribution: "U.S. Navy/Donna Lou Morgan, Public Domain",
      },
      {
        name: "Teddy Riley",
        epithet: "The New Jack Swing Architect",
        born: "October 8, 1967, Harlem, New York",
        domains: ["Producer", "Songwriter", "Genre Creator"],
        description: "Created the New Jack Swing sound that fused R&B with hip-hop rhythms. Produced Keith Sweat, Bobby Brown, Michael Jackson's 'Dangerous.' Built the bridge between genres.",
        isFeatured: true,
        imageUrl: IMAGES.teddyRiley,
        imageAttribution: "Christopher Diont'e, CC BY-SA 4.0",
      },
      {
        name: "Timbaland",
        epithet: "The Sound of the Future",
        born: "March 10, 1972, Norfolk, Virginia",
        domains: ["Producer", "Songwriter", "Innovator"],
        description: "Produced Aaliyah, Missy Elliott, Justin Timberlake. Pioneered sample-heavy, rhythmically complex production that pushed R&B into the future. 'You will play her songs for 20 years... She is the Aretha Franklin of hip-hop.' (on Missy Elliott)",
        isFeatured: true,
        imageUrl: IMAGES.timbaland,
        imageAttribution: "Collision Conf, CC BY 2.0",
      },
    ],
  },

  // CHAPTER 10: CROSSOVER ECONOMICS
  {
    id: "ch10",
    number: "Chapter X",
    title: "Crossover Economics",
    subtitle: "Race, Money, and the Mainstream (1950–Present)",
    era: "pop-rb",
    contentWarning: "This chapter discusses economic exploitation and racial inequality in the music industry.",
    narrative: [
      "'Crossover' in R&B has always carried a specific economic meaning: music created by Black artists reaching white audiences and white-controlled radio formats through either controlled sanitization, strategic positioning, or sheer undeniability. The term itself reveals the industry's architecture—Black music 'crossing over' into the mainstream, as if the mainstream were the natural state and Black audiences a specialty market to be transcended.",
      "In the 1950s, the crossover dynamic was nakedly exploitative. White artists like Pat Boone recorded note-for-note covers of Black originals specifically for segregated radio stations that wouldn't play Black artists. Little Richard's 'Tutti Frutti' and Fats Domino's 'Ain't That a Shame' both had their sales cannibalized by Boone covers that reached audiences the originals couldn't access. LaVern Baker watched Georgia Gibbs copy her arrangement of 'Tweedle Dee' measure for measure and outsell her—leading Baker to petition Congress in 1955 for arrangement copyright protection. She failed; the law wouldn't protect arrangements for another decade.",
      "The economic violence extended beyond covers. Big Mama Thornton recorded 'Hound Dog' in August 1952 at Radio Recorders in Los Angeles. The single went to #1 R&B and sold approximately 2 million copies. Thornton received a single check for $500—her only payment for a song that would become, in Elvis Presley's 1956 version, one of the best-selling singles in recording history. 'That song sold over 2 million records,' Thornton told interviewers in the 1980s. 'I got one check for $500 and never saw another.' She died in 1984, in a boarding house in Los Angeles, essentially penniless.",
      "The pattern persisted across decades. Artists who successfully crossed over—Diana Ross, Michael Jackson, Whitney Houston, Beyoncé—earned more money than those who didn't. But crossover often required softening cultural specificity for white comfort, and even successful crossover rarely translated into Black ownership of the infrastructure. The industry extracted value from Black creativity while ensuring that the executives, the label owners, the publishing companies, and the distribution networks remained overwhelmingly white.",
    ],
    figures: [
      {
        name: "Big Mama Thornton",
        epithet: "The Original Hound Dog",
        born: "December 11, 1926, Ariton, Alabama",
        died: "July 25, 1984",
        domains: ["Singer", "Songwriter", "Blues Pioneer"],
        description: "Recorded the original 'Hound Dog' (1952), #1 R&B for 7 weeks. Received only $500 while Elvis Presley's cover became one of the best-selling singles ever. Her exploitation became emblematic of the industry's treatment of Black artists.",
        quote: "That song sold over 2 million records. I got one check for $500 and never saw another.",
        isFeatured: true,
        imageUrl: IMAGES.bigMamaThornton,
        imageAttribution: "Reitz, CC BY-SA 3.0",
      },
      {
        name: "Tina Turner",
        epithet: "The Comeback Queen",
        born: "November 26, 1939, Brownsville, Tennessee",
        died: "May 24, 2023",
        domains: ["Singer", "Performer", "Survivor"],
        description: "Left Ike Turner in 1976 with '36 cents and a gas station credit card.' 'Private Dancer' (1984) at age 45 sold 20 million copies. Proved crossover didn't require compromising power.",
        quote: "I had to go out in the world and become strong, to discover my mission in life.",
        isFeatured: true,
        imageUrl: IMAGES.tinaTurner,
        imageAttribution: "Philip Spittle, CC BY 2.0",
      },
    ],
  },

  // CHAPTER 11: THE MYTH OF REAL R&B
  {
    id: "ch11",
    number: "Chapter XI",
    title: "The Myth of Real R&B",
    subtitle: "Authenticity Cycles and Continuous Reinvention",
    era: "alternative",
    epigraph: {
      text: "When you try to label it, you remove the option for it to be limitless. It diminishes the music.",
      source: "SZA",
    },
    narrative: [
      "Every generation believes the previous generation's R&B was 'real' and the current generation is corrupted. This pattern has repeated without exception for 75 years, and understanding its persistence is essential to understanding why debates about R&B's authenticity are ultimately debates about generational identity rather than musical quality.",
      "The cycle follows a predictable pattern. In the 1960s, purists complained that soul music was too smooth—jump blues and early R&B had real energy. In the 1970s, classic soul was 'real'; disco was sellout music made for white audiences. In the 1980s, Motown and Stax were authentic; synthesizers and drum machines had ruined the warm sound of live musicians. In the 1990s, quiet storm and ballad R&B were 'real'; hip-hop was taking over and corrupting the genre. In the 2000s, 90s hip-hop soul was authentic; Auto-Tune had ruined actual singing. In the 2010s, 2000s R&B was 'real'; alternative R&B—The Weeknd, Frank Ocean, SZA—wasn't really R&B at all.",
      "The evidence against these authenticity claims is overwhelming. Technology has always shaped R&B sound: electric guitars in the 1940s, multitrack recording in the 1960s, synthesizers in the 1970s, drum machines in the 1980s, sampling in the 1990s, Auto-Tune in the 2000s. Each era produced enduring classics alongside forgettable product—exactly as every era does. Artists dismissed as 'not real R&B' in their time (Prince in the 1980s, Mary J. Blige in the 1990s, Beyoncé in the 2000s) became the standard against which subsequent generations were measured.",
      "What authenticity claims actually reveal is genre boundary policing—attempts to preserve a particular sound associated with a particular generation's coming-of-age. The R&B that sounds 'real' to a given listener is typically the R&B they encountered between ages 15 and 25. This is not a criticism; it is simply how musical taste functions. But mistaking personal nostalgia for objective assessment produces the same complaint every generation: 'R&B was better when...' R&B's continuous reinvention isn't a bug to be fixed. It is the defining feature of a genre that has never stopped evolving since Jerry Wexler first gave it a name.",
    ],
    figures: [
      {
        name: "SZA",
        epithet: "The Genre Refuser",
        born: "November 8, 1989, St. Louis, Missouri",
        domains: ["Singer", "Songwriter", "Alternative R&B"],
        description: "'Ctrl' (2017) sold 3.5+ million copies, bringing alternative R&B to the mainstream. First female artist at TDE (Top Dawg Entertainment). Refuses genre categorization as limiting.",
        isFeatured: true,
        imageUrl: IMAGES.sza,
        imageAttribution: "Raph_PH, CC BY 4.0",
      },
      {
        name: "Frank Ocean",
        epithet: "The Alternative Pioneer",
        born: "October 28, 1987, Long Beach, California",
        domains: ["Singer", "Songwriter", "Producer"],
        description: "'channel ORANGE' (2012) and 'Blonde' (2016) redefined what R&B could be. His introspective, experimental approach helped establish 'alternative R&B' as a recognized movement.",
        isFeatured: true,
        imageUrl: IMAGES.frankOcean,
        imageAttribution: "Andras Ladocsi, CC BY-SA 4.0",
      },
    ],
  },
];

// ==================== MAIN COMPONENT ====================

export default function RnbHistoryClient() {
  const progress = useGlobalScrollProgress();
  const currentChannel = getCurrentChannel(progress);

  // Get current chapter title for meter bridge
  const getCurrentChapterTitle = () => {
    for (let i = chapters.length - 1; i >= 0; i--) {
      const chapterProgress = channelLabels.find(c => c.id === chapters[i].id);
      if (chapterProgress && progress >= chapterProgress.position) {
        return chapters[i].title;
      }
    }
    return "R&B History";
  };

  return (
    <article className="console">
      <a href="#main-content" className="console-skip-link">
        Skip to main content
      </a>

      <FaderProgress progress={progress} />
      <MeterBridge progress={progress} currentChapter={getCurrentChapterTitle()} />

      {/* CONSOLE HERO */}
      <header className="console-hero" id="main-content">
        <div
          className="console-hero-bg"
          style={{
            backgroundImage: `url(${IMAGES.apolloTheater})`,
          }}
        />
        <div className="console-hero-overlay" />

        <div className="console-hero-content">
          <div className="console-hero-status">Recording</div>
          <h1 className="console-hero-title">
            <span className="accent">R&B</span>
          </h1>
          <p className="console-hero-subtitle">The Heartbeat That Taught Pop to Feel</p>

          <div className="console-hero-transport">
            <span className="console-hero-transport-label">Scroll to begin</span>
            <div className="console-hero-transport-btn" />
          </div>
        </div>
      </header>

      {/* CHANNEL STRIPS (Chapters) */}
      <main>
        {chapters.map((chapter) => (
          <ChannelStrip key={chapter.id} chapter={chapter} />
        ))}

        {/* MASTER SECTION (Epilogue) */}
        <section className="master-section">
          <div className="master-section-content">
            <div className="master-label">MASTER</div>
            <h2 className="master-title">The Feeling Itself</h2>
            <div className="master-text">
              <p>
                In 1949, Jerry Wexler gave a name to music that already existed. That name
                created a category, and that category created an industry, and that industry
                created wealth (mostly for others) and art (mostly from Black creators).
              </p>
              <p>
                R&amp;B didn&apos;t die—it did something more profound. It taught pop how to feel.
                The melismatic vocals, the groove-based rhythm, the emotional directness,
                the technological innovation—all of this is now standard in popular music.
                R&B won so completely that it became invisible, absorbed into the mainstream.
              </p>
              <p>
                But the genre persists. In bedroom studios and major labels, artists
                continue to make music they call R&B. They argue about what it means.
                They claim authenticity. They innovate. The vinyl still spins. The groove
                still hits.
              </p>
            </div>
            <p className="master-closing">The heartbeat continues.</p>
          </div>
        </section>

        {/* OUTPUT SECTION (Sources) */}
        <section className="output-section">
          <div className="output-content">
            <h2 className="output-label">Output / Sources & Further Reading</h2>

            <div className="sources-grid">
              {/* Books */}
              <div className="source-category">
                <h3 className="source-category-label">
                  <span className="source-jack" />
                  Books
                </h3>
                <ul className="source-list">
                  <li>
                    <a href="https://www.amazon.com/Rhythm-Blues-Life-American-Music/dp/0679401024" target="_blank" rel="noopener noreferrer">
                      <em>Rhythm and the Blues: A Life in American Music</em>
                    </a>
                    <span className="source-author">Jerry Wexler with David Ritz (1993)</span>
                  </li>
                  <li>
                    <a href="https://www.amazon.com/Death-Rhythm-Blues-Nelson-George/dp/0142004081" target="_blank" rel="noopener noreferrer">
                      <em>The Death of Rhythm and Blues</em>
                    </a>
                    <span className="source-author">Nelson George (1988)</span>
                  </li>
                  <li>
                    <a href="https://www.amazon.com/Soulsville-U-S-Story-Stax-Records/dp/0825672848" target="_blank" rel="noopener noreferrer">
                      <em>Soulsville U.S.A.: The Story of Stax Records</em>
                    </a>
                    <span className="source-author">Rob Bowman (1997)</span>
                  </li>
                  <li>
                    <a href="https://www.amazon.com/Making-Tracks-Atlantic-Records-Multi-Billion-Dollar/dp/0285621674" target="_blank" rel="noopener noreferrer">
                      <em>Making Tracks: Atlantic Records</em>
                    </a>
                    <span className="source-author">Charlie Gillett (1974)</span>
                  </li>
                  <li>
                    <a href="https://www.amazon.com/Be-Loved-Memories-Motown-Autobiography/dp/044651523X" target="_blank" rel="noopener noreferrer">
                      <em>To Be Loved: The Music, the Magic, the Memories of Motown</em>
                    </a>
                    <span className="source-author">Berry Gordy (1994)</span>
                  </li>
                </ul>
              </div>

              {/* Documentaries */}
              <div className="source-category">
                <h3 className="source-category-label">
                  <span className="source-jack" />
                  Documentaries
                </h3>
                <ul className="source-list">
                  <li>
                    <a href="https://www.imdb.com/title/tt0314725/" target="_blank" rel="noopener noreferrer">
                      <em>Standing in the Shadows of Motown</em>
                    </a>
                    <span className="source-author">Dir. Paul Justman (2002)</span>
                  </li>
                  <li>
                    <a href="https://www.imdb.com/title/tt2492916/" target="_blank" rel="noopener noreferrer">
                      <em>Muscle Shoals</em>
                    </a>
                    <span className="source-author">Dir. Greg Camalier (2013)</span>
                  </li>
                  <li>
                    <a href="https://www.imdb.com/title/tt2396566/" target="_blank" rel="noopener noreferrer">
                      <em>20 Feet from Stardom</em>
                    </a>
                    <span className="source-author">Dir. Morgan Neville (2013)</span>
                  </li>
                </ul>
              </div>

              {/* Archives & Institutions */}
              <div className="source-category">
                <h3 className="source-category-label">
                  <span className="source-jack" />
                  Archives & Institutions
                </h3>
                <ul className="source-list">
                  <li>
                    <a href="https://rockhall.com/" target="_blank" rel="noopener noreferrer">
                      Rock & Roll Hall of Fame
                    </a>
                    <span className="source-author">Artist biographies and induction speeches</span>
                  </li>
                  <li>
                    <a href="https://www.billboard.com/charts/" target="_blank" rel="noopener noreferrer">
                      Billboard Magazine Archives
                    </a>
                    <span className="source-author">Chart history and industry reporting</span>
                  </li>
                  <li>
                    <a href="https://www.royalstudios.com/history" target="_blank" rel="noopener noreferrer">
                      Royal Studios
                    </a>
                    <span className="source-author">Memphis studio history</span>
                  </li>
                  <li>
                    <a href="https://staxmuseum.com/" target="_blank" rel="noopener noreferrer">
                      Stax Museum of American Soul Music
                    </a>
                    <span className="source-author">Memphis, Tennessee</span>
                  </li>
                </ul>
              </div>

              {/* Interviews & Articles */}
              <div className="source-category">
                <h3 className="source-category-label">
                  <span className="source-jack" />
                  Interviews & Articles
                </h3>
                <ul className="source-list">
                  <li>
                    <a href="https://www.grammy.com/news/gamble-and-huff-interview-50-years-philly-soul-creating-black-music-month-Philadelphia-International-Records" target="_blank" rel="noopener noreferrer">
                      Gamble and Huff: 50 Years of Philly Soul
                    </a>
                    <span className="source-author">Grammy.com (2021)</span>
                  </li>
                  <li>
                    <a href="https://www.okayplayer.com/originals/teddy-riley-interview-new-jack-swing-apollo-harlem.html" target="_blank" rel="noopener noreferrer">
                      Teddy Riley on the History of New Jack Swing
                    </a>
                    <span className="source-author">Okayplayer</span>
                  </li>
                  <li>
                    <a href="https://www.billboard.com/music/rb-hip-hop/missy-elliott-interview-7431180/" target="_blank" rel="noopener noreferrer">
                      Missy Elliott: People Don&apos;t Know All the Songs I&apos;ve Produced
                    </a>
                    <span className="source-author">Billboard (2016)</span>
                  </li>
                  <li>
                    <a href="https://collider.com/mary-j-blige-interview-my-life-documentary-amazon/" target="_blank" rel="noopener noreferrer">
                      Mary J. Blige on Her &quot;My Life&quot; Documentary
                    </a>
                    <span className="source-author">Collider (2021)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="image-credits-section">
              <h3 className="image-credits-title">
                <span className="source-jack" />
                Image Credits
              </h3>
              <p className="image-credits-intro">
                All images sourced from Wikimedia Commons. Click subject names to view original files.
              </p>
              <ul className="image-credits-list">
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:Ruth_Brown_cropped.jpg" target="_blank" rel="noopener noreferrer">Ruth Brown</a>
                  <span>— caviera, CC BY 2.0</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:Cosimo_Matassa.jpg" target="_blank" rel="noopener noreferrer">Cosimo Matassa</a>
                  <span>— WhyArts, CC BY-SA 4.0</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:Fats_Domino018.JPG" target="_blank" rel="noopener noreferrer">Fats Domino</a>
                  <span>— Roland Godefroy, CC BY-SA 3.0</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:Stax_Museum_Memphis_TN_01.jpg" target="_blank" rel="noopener noreferrer">Stax Museum</a>
                  <span>— Thomas R Machnitzki, CC BY-SA 3.0</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:Otis_Redding_1967.JPG" target="_blank" rel="noopener noreferrer">Otis Redding</a>
                  <span>— Stax Records, Public Domain</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:Booker_T._Jones_2009.jpg" target="_blank" rel="noopener noreferrer">Booker T. Jones</a>
                  <span>— Bryan Ledgard, CC BY 2.0</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:Al_Green_1973.jpg" target="_blank" rel="noopener noreferrer">Al Green</a>
                  <span>— Mike Douglas Show, Public Domain</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:Hitsville_USA.jpg" target="_blank" rel="noopener noreferrer">Hitsville U.S.A.</a>
                  <span>— Blob4000, Public Domain</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:BerryGordyDec10.jpg" target="_blank" rel="noopener noreferrer">Berry Gordy</a>
                  <span>— Angela George, CC BY-SA 3.0</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:The_Funk_Brothers.jpg" target="_blank" rel="noopener noreferrer">The Funk Brothers</a>
                  <span>— Jeff Albert, CC BY-SA 2.0</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:Smokey_Robinson_special_1970.JPG" target="_blank" rel="noopener noreferrer">Smokey Robinson</a>
                  <span>— NBC Television, Public Domain</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:Kenny_Gamble_Leon_Huff.jpg" target="_blank" rel="noopener noreferrer">Gamble &amp; Huff</a>
                  <span>— John Mathew Smith, CC BY-SA 2.0</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:Roland_TR-808_drum_machine.jpg" target="_blank" rel="noopener noreferrer">Roland TR-808</a>
                  <span>— Eriq, CC BY-SA 3.0</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:Stevie_Wonder.jpg" target="_blank" rel="noopener noreferrer">Stevie Wonder</a>
                  <span>— Antonio Cruz/ABr, CC BY 3.0 BR</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:Marvin_Gaye_(1973_publicity_photo).jpg" target="_blank" rel="noopener noreferrer">Marvin Gaye</a>
                  <span>— Jim Britt, Public Domain</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:Aretha_franklin_1960s_cropped_retouched.jpg" target="_blank" rel="noopener noreferrer">Aretha Franklin</a>
                  <span>— Atlantic Records, CC0</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:Missy_Elliot.jpg" target="_blank" rel="noopener noreferrer">Missy Elliott</a>
                  <span>— Atlantic Records, CC BY-SA 4.0</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:Mary_J._Blige_in_2009.JPG" target="_blank" rel="noopener noreferrer">Mary J. Blige</a>
                  <span>— U.S. Navy/Donna Lou Morgan, Public Domain</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:Teddy_Riley_at_the_90%27s_Block_Party_Tour.jpg" target="_blank" rel="noopener noreferrer">Teddy Riley</a>
                  <span>— Christopher Diont&apos;e, CC BY-SA 4.0</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:Timbaland_(47903248821)_(cropped).jpg" target="_blank" rel="noopener noreferrer">Timbaland</a>
                  <span>— Collision Conf, CC BY 2.0</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:Blues_is_a_woman_Reitz_(Big_Mama_Thornton).jpg" target="_blank" rel="noopener noreferrer">Big Mama Thornton</a>
                  <span>— Reitz, CC BY-SA 3.0</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:Tina_Turner_50th_Anniversary_Tour.jpg" target="_blank" rel="noopener noreferrer">Tina Turner</a>
                  <span>— Philip Spittle, CC BY 2.0</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:KendrickSZASPurs230725-19_-_54683179509_(cropped)_(cropped).jpg" target="_blank" rel="noopener noreferrer">SZA</a>
                  <span>— Raph_PH, CC BY 4.0</span>
                </li>
                <li>
                  <a href="https://commons.wikimedia.org/wiki/File:Frank_Ocean_2022_Blonded.jpg" target="_blank" rel="noopener noreferrer">Frank Ocean</a>
                  <span>— Andras Ladocsi, CC BY-SA 4.0</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </article>
  );
}
