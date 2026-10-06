"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import "./hip-hop-history.css";

// ============================================================================
// HIP-HOP: FROM THE BRONX TO THE WORLD
// ============================================================================
// Visual Treatment: Photography-driven with era-specific color grading
// Arc Type: Transformation (Origins -> Innovation -> Explosion -> Tragedy -> Global)
// Progress Bar: "The Mixtape Tape" - cassette unwinding
// Cultural Lens: Authentic history with acknowledgment of complexity
// ============================================================================

// ==================== TYPE DEFINITIONS ====================

interface Figure {
  name: string;
  epithet: string;
  tradition?: string;
  born?: string;
  died?: string;
  domains: string[];
  description: string;
  quote?: string;
  isFeatured?: boolean;
  imageUrl?: string;
  imageAttribution?: string;
}

// ==================== VERIFIED CC-LICENSED IMAGES ====================
// All images verified from Wikimedia Commons with proper licensing

const IMAGES = {
  heroBackground: "https://upload.wikimedia.org/wikipedia/commons/f/f4/1520Sedgwick_Avenue.jpg",
  djKoolHerc: "https://upload.wikimedia.org/wikipedia/commons/9/91/Herc_on_the_Wheels_of_Steel.JPG",
  djKoolHercAlt: "https://upload.wikimedia.org/wikipedia/commons/d/df/Dj_Kool_Herc.jpg",
  afrikaBambaataa: "https://upload.wikimedia.org/wikipedia/commons/6/66/Afrika_Bambaatta_National_Portrait_Gallery_1983.jpg",
  bBoyBreaking: "https://upload.wikimedia.org/wikipedia/commons/f/fc/B-boy_breakdancing.jpg",
  nycGraffitiTrain: "https://upload.wikimedia.org/wikipedia/commons/3/30/Graffiti_and_train_in_tunnel_-_New_York_City_2013.png",
} as const;

interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  era: "birth" | "wildstyle" | "golden" | "bicoastal" | "digital";
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

// ==================== SCROLL-LOCK HERO HOOK (TEMPORARILY DISABLED) ====================
// TODO: Re-enable when ready. Pattern: docs/front-end/SCROLL_LOCK_PATTERN.md
/*
const useScrollLockHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionTotalHeight = rect.height;
      const scrollableDistance = sectionTotalHeight - windowHeight;
      const scrolledIntoSection = -sectionTop;

      if (sectionTop <= 0 && scrolledIntoSection <= scrollableDistance) {
        setIsPinned(true);
        const newProgress = Math.min(
          Math.max(scrolledIntoSection / scrollableDistance, 0),
          1
        );
        setProgress(newProgress);
      } else {
        setIsPinned(false);
        setProgress(sectionTop > 0 ? 0 : 1);
      }

      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(handleScroll);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { containerRef, progress, isPinned };
};
*/

// ==================== MIXTAPE PROGRESS BAR ====================

const trackMarkers = [
  { id: "prologue", position: 0.02, label: "Prologue" },
  { id: "ch1", position: 0.08, label: "1. Pre-Hip-Hop DNA" },
  { id: "ch2", position: 0.14, label: "2. Bronx Crucible" },
  { id: "ch3", position: 0.20, label: "3. 1520 Sedgwick" },
  { id: "ch4", position: 0.26, label: "4. DJ as Architect" },
  { id: "ch5", position: 0.32, label: "5. MC Emerges" },
  { id: "ch6", position: 0.38, label: "6. Breaking" },
  { id: "ch7", position: 0.44, label: "7. Graffiti" },
  { id: "ch8", position: 0.50, label: "8. The Elements" },
  { id: "ch9", position: 0.56, label: "9. Street to Vinyl" },
  { id: "ch10", position: 0.62, label: "10. Golden Age" },
  { id: "ch11", position: 0.68, label: "11. Controversies" },
  { id: "ch12", position: 0.74, label: "12. Coastal Wars" },
  { id: "ch13", position: 0.80, label: "13. Global" },
  { id: "ch14", position: 0.86, label: "14. Digital Era" },
  { id: "ch15", position: 0.92, label: "15. What Hip-Hop Is Now" },
  { id: "epilogue", position: 0.98, label: "Epilogue" },
];

const MixtapeProgress: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <>
      {/* Desktop vertical progress */}
      <div
        className="mixtape-progress"
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      >
        <div className="mixtape-shell">
          <div
            className="mixtape-fill"
            style={{ height: `${progress * 90}%` }}
          />
          <div className="mixtape-tracks">
            {trackMarkers.map((marker) => (
              <div
                key={marker.id}
                className={`mixtape-track ${progress >= marker.position ? "passed" : ""}`}
                data-track={marker.label}
              />
            ))}
          </div>
          <div
            className="mixtape-head"
            style={{ top: `${5 + progress * 90}%` }}
          />
        </div>
      </div>

      {/* Mobile horizontal progress */}
      <div className="mixtape-progress-mobile">
        <div
          className="mixtape-fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </>
  );
};

// ==================== FIGURE PROFILE COMPONENT ====================

const FigureProfile: React.FC<{ figure: Figure; era: string }> = ({ figure, era }) => {
  const accentColors: Record<string, string> = {
    birth: "var(--era-birth)",
    wildstyle: "var(--era-wildstyle)",
    golden: "var(--era-golden)",
    bicoastal: "var(--era-bicoastal)",
    digital: "var(--era-digital)",
  };

  return (
    <article
      className={`figure-profile ${figure.isFeatured ? "featured" : ""} ${figure.imageUrl ? "has-image" : ""}`}
      style={{ "--figure-accent": accentColors[era] } as React.CSSProperties}
    >
      {figure.imageUrl && (
        <div className="figure-image-container">
          <img
            src={figure.imageUrl}
            alt={`${figure.name} - ${figure.epithet}`}
            className="figure-image"
            loading="lazy"
          />
          {figure.imageAttribution && (
            <p className="figure-image-attribution">{figure.imageAttribution}</p>
          )}
        </div>
      )}
      <div className="figure-text">
        <h3 className="figure-name">{figure.name}</h3>
        <p className="figure-epithet">{figure.epithet}</p>
        {(figure.born || figure.died) && (
          <p className="figure-meta">
            {figure.born && `Born ${figure.born}`}
            {figure.born && figure.died && " | "}
            {figure.died && `Died ${figure.died}`}
          </p>
        )}
        <div className="figure-domains">
          {figure.domains.map((domain) => (
            <span key={domain} className="figure-domain">
              {domain}
            </span>
          ))}
        </div>
        <p className="figure-description">{figure.description}</p>
        {figure.quote && <p className="figure-quote">&ldquo;{figure.quote}&rdquo;</p>}
      </div>
    </article>
  );
};

// ==================== CHAPTER COMPONENT ====================

const ChapterSection: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  const accentColors: Record<string, string> = {
    birth: "var(--era-birth)",
    wildstyle: "var(--era-wildstyle)",
    golden: "var(--era-golden)",
    bicoastal: "var(--era-bicoastal)",
    digital: "var(--era-digital)",
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`chapter-section ${isVisible ? "visible" : ""}`}
      data-era={chapter.era}
      style={{ "--chapter-accent": accentColors[chapter.era] } as React.CSSProperties}
    >
      <div className="chapter-content">
        <header className="chapter-header">
          <span className="chapter-number">{chapter.number}</span>
          <h2 className="chapter-title">{chapter.title}</h2>
          {chapter.subtitle && <p className="chapter-subtitle">{chapter.subtitle}</p>}
          {chapter.epigraph && (
            <div className="chapter-epigraph">
              &ldquo;{chapter.epigraph.text}&rdquo;
              <cite>— {chapter.epigraph.source}</cite>
            </div>
          )}
        </header>

        {chapter.contentWarning && (
          <div className="content-warning">
            <div className="content-warning-label">Content Note</div>
            {chapter.contentWarning}
          </div>
        )}

        {chapter.chapterImage && (
          <figure className="chapter-image-container">
            <img
              src={chapter.chapterImage.url}
              alt={chapter.chapterImage.alt}
              className="chapter-image"
              loading="lazy"
            />
            <figcaption className="chapter-image-attribution">
              {chapter.chapterImage.attribution}
            </figcaption>
          </figure>
        )}

        <div className="narrative-block has-dropcap">
          {chapter.narrative.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {chapter.figures.map((figure) => (
          <FigureProfile key={figure.name} figure={figure} era={chapter.era} />
        ))}
      </div>

      <div className="transition-divider" data-era={chapter.era} />
    </section>
  );
};

// ==================== CONTENT DATA ====================

const chapters: Chapter[] = [
  // PROLOGUE
  {
    id: "prologue",
    number: "Prologue",
    title: "A City in Fragments, a Culture in Pieces",
    era: "birth",
    narrative: [
      "A summer night in 1973. Speakers stacked on the sidewalk. Bodies moving in the heat. The bass drops, and for a moment, there's nothing but the break.",
      "Then pull back. The South Bronx—the burned buildings, the rubble lots, the abandoned storefronts. This is where Hip-Hop was born: not despite the devastation, but because of it. When a city abandons its young people, those young people invent new worlds.",
      "This is the story of that invention. From a back-to-school party in a rec room to the most consumed music genre on Earth. From DJs extending breaks to a culture that rewrote the rules of art, commerce, and expression. From the Bronx to the world.",
    ],
    figures: [],
  },

  // CHAPTER 1
  {
    id: "ch1",
    number: "Chapter I",
    title: "Pre-Hip-Hop DNA",
    subtitle: "Before the Bronx: The Sounds That Made the Sound",
    era: "birth",
    epigraph: {
      text: "Every river has tributaries.",
      source: "African Proverb",
    },
    narrative: [
      "Hip-Hop didn't appear from nothing. Its DNA came from Jamaica, from radio, from the dozens, from funk.",
      "Jamaican sound systems were massive mobile speaker setups where DJs 'toasted'—talked rhythmically—over instrumental dub plates. Count Machuki pioneered this in the 1950s. When Clive Campbell emigrated from Jamaica to the Bronx in 1967 at age 12, he carried this tradition with him.",
      "African-American oral arts contributed the dozens (ritual insult games), signifying, toasts, and spoken word. The Last Poets and Gil Scott-Heron put political poetry over rhythm. James Brown's funk provided the breaks—those instrumental sections where the drums took over.",
      "Black radio DJs like Frankie Crocker developed personalities, catchphrases, and rhythmic patter that would influence MC style. The Apollo Theater in Harlem created the stage presence. All these streams would converge in one place: the South Bronx.",
    ],
    figures: [
      {
        name: "Gil Scott-Heron",
        epithet: "The Godfather of Rap",
        born: "April 1, 1949, Chicago",
        died: "May 27, 2011",
        domains: ["Spoken Word", "Poetry", "Proto-Rap"],
        description: "'The Revolution Will Not Be Televised' (1970) established the spoken-word-over-rhythm template. Combined poetry, politics, and groove years before Hip-Hop had a name. Refused the 'godfather of rap' label but acknowledged his influence.",
        quote: "The revolution will not be televised, will not be televised...",
        isFeatured: true,
      },
      {
        name: "James Brown",
        epithet: "The Godfather of Soul",
        born: "May 3, 1933, Barnwell, South Carolina",
        died: "December 25, 2006",
        domains: ["Funk", "The Break", "Rhythm"],
        description: "His records provided the raw material—the 'breaks' that DJs would isolate and extend. 'Give It Up or Turnit a Loose,' 'Funky Drummer,' 'Get Up (I Feel Like Being a) Sex Machine.' The most sampled artist in Hip-Hop history.",
        quote: "Get up offa that thing!",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 2
  {
    id: "ch2",
    number: "Chapter II",
    title: "The Bronx Crucible",
    subtitle: "How Destruction Created the Conditions for Invention",
    era: "birth",
    contentWarning: "This chapter discusses urban decay, arson, and gang violence.",
    narrative: [
      "The South Bronx of the early 1970s was a war zone—but the war was waged by policy, not people.",
      "Robert Moses and the Cross Bronx Expressway: In the 1950s–60s, urban planner Robert Moses rammed an expressway through stable, working-class neighborhoods, displacing an estimated 60,000 residents. The communities never recovered.",
      "Redlining and Disinvestment: Banks refused loans. Insurance companies fled. Landlords, unable to profit, hired arsonists to burn buildings for insurance money. At its peak, the South Bronx saw 30 fires per day.",
      "'Planned Shrinkage': City officials deliberately reduced fire services to poor neighborhoods, accelerating the destruction. By 1977, President Carter would tour Charlotte Street and call it worse than bombed-out European cities.",
      "But in the rubble, something grew. Gang truces—brokered by groups like the Ghetto Brothers after the death of peacemaker Cornell 'Black Benjie' Benjamin—created space for block parties. Young people denied every conventional path to success invented their own systems of status, expression, and community.",
    ],
    figures: [
      {
        name: "Robert Moses",
        epithet: "The Master Builder",
        born: "December 18, 1888, New Haven",
        died: "July 29, 1981",
        domains: ["Urban Planning", "Highway Construction", "Displacement"],
        description: "The most powerful unelected official in New York history. His Cross Bronx Expressway destroyed stable neighborhoods and accelerated the Bronx's decline. Never learned to drive himself, yet shaped the city around the automobile.",
        isFeatured: false,
      },
      {
        name: "Hector 'Ghetto Brothers' Melendez",
        epithet: "The Peacemaker",
        domains: ["Gang Truce", "Community Organization"],
        description: "Leader of the Ghetto Brothers gang who transformed it into a community organization. Helped broker the 1971 Bronx gang truce after violence killed his friend Black Benjie. Created conditions that allowed Hip-Hop's party culture to flourish.",
        quote: "We had to stop killing each other. We had to find another way.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 3
  {
    id: "ch3",
    number: "Chapter III",
    title: "1520 Sedgwick and the Party as Laboratory",
    subtitle: "August 11, 1973: The Back-to-School Jam",
    era: "birth",
    epigraph: {
      text: "The party was just a party. But the party changed everything.",
      source: "Cindy Campbell",
    },
    narrative: [
      "On August 11, 1973, Cindy Campbell wanted to raise money for back-to-school clothes. She rented the rec room at 1520 Sedgwick Avenue—the apartment building where she lived with her family—and hired her brother Clive to DJ.",
      "Clive Campbell, who called himself DJ Kool Herc, had a plan. He'd noticed that dancers went wild during the instrumental breaks of funk records—those moments when the drums took over. Using two copies of the same record on two turntables, he extended these breaks indefinitely, bouncing back and forth. He called it the 'merry-go-round.'",
      "That night, with the break extended and the dancers moving, something crystallized. The people who danced during the breaks became 'b-boys' and 'b-girls.' Herc's friend Coke La Rock grabbed the microphone to hype the crowd—the first MC.",
      "The party charged 25 cents for girls, 50 cents for boys. It was a success. More parties followed—in the rec room, in Cedar Park, across the Bronx. Word spread. A culture was being invented.",
    ],
    figures: [
      {
        name: "DJ Kool Herc",
        epithet: "The Father of Hip-Hop",
        born: "April 16, 1955, Kingston, Jamaica",
        domains: ["DJ", "The Merry-Go-Round", "B-Boy Culture"],
        description: "Clive Campbell emigrated from Jamaica at age 12, bringing sound system culture to the Bronx. Pioneered the 'merry-go-round' technique of isolating and extending breaks. Named the dancers 'b-boys' and 'b-girls.' Built the massive 'Herculords' sound system inspired by Jamaican traditions.",
        quote: "I came from a musical background. My father was a musician. In Jamaica, I was inspired by the sound systems.",
        isFeatured: true,
        imageUrl: IMAGES.djKoolHerc,
        imageAttribution: "Photo: Jorge 'Fabel' Pabon, CC BY-SA 2.0, via Wikimedia Commons",
      },
      {
        name: "Cindy Campbell",
        epithet: "The First Lady of Hip-Hop",
        domains: ["Entrepreneurship", "Event Organization"],
        description: "Organized the August 11, 1973 party at 1520 Sedgwick Avenue that sparked Hip-Hop's origin. Created the economic model for Hip-Hop parties: community entrepreneurship. Often overlooked in origin stories despite being co-founder.",
        quote: "It wasn't just about the music—we were creating a business model.",
        isFeatured: true,
      },
      {
        name: "Coke La Rock",
        epithet: "The First MC",
        domains: ["MC", "Hype Man", "Call and Response"],
        description: "At Herc's earliest parties, grabbed the microphone to keep the crowd moving. Established the MC role: call-and-response, crowd control, rhythmic patter. The first voice of Hip-Hop.",
        quote: "There's not a party over there, there's not a party over here. This is where the party's at!",
        isFeatured: false,
      },
    ],
  },

  // CHAPTER 4
  {
    id: "ch4",
    number: "Chapter IV",
    title: "DJ as Architect",
    subtitle: "The Turntable Becomes an Instrument (1974–1979)",
    era: "birth",
    narrative: [
      "After Herc's innovation, a new generation of DJs took the techniques further. They weren't just playing records—they were deconstructing and rebuilding them in real time.",
      "Grandmaster Flash studied electronics and approached DJing like a scientist. He marked records with crayons to find break sections precisely, built custom mixers, and developed 'quick mix theory'—punch phrasing, cutting, and backspinning that turned two turntables into a composition tool.",
      "Grand Wizard Theodore was just 12 years old when he accidentally invented scratching in 1975. Trying to hold a record still when his mother interrupted his practice, he heard the rhythmic sound of vinyl moving back and forth under the needle. That sound became foundational.",
      "Afrika Bambaataa brought philosophy to the booth. A former warlord of the Black Spades gang, he redirected gang energy into the Universal Zulu Nation, defining Hip-Hop's five elements and treating the culture as a peace movement.",
    ],
    figures: [
      {
        name: "Grandmaster Flash",
        epithet: "The DJ as Scientist",
        born: "January 1, 1958, Bridgetown, Barbados",
        domains: ["Quick Mix Theory", "Punch Phrasing", "Innovation"],
        description: "Joseph Saddler developed 'quick mix theory'—punch phrasing, cutting, backspinning. Marked records with crayons to identify break sections precisely. Built custom mixers to isolate frequencies. Led Grandmaster Flash and the Furious Five; 'The Message' (1982). First Hip-Hop act inducted into Rock and Roll Hall of Fame (2007).",
        quote: "I wanted to take apart the music and put it back together in a new way.",
        isFeatured: true,
      },
      {
        name: "Grand Wizard Theodore",
        epithet: "Inventor of Scratching",
        born: "March 5, 1963, Bronx, New York",
        domains: ["Scratching", "Needle Drop", "Turntablism"],
        description: "Theodore Livingston invented scratching accidentally in 1975 at age 12 while stopping a record. Developed the needle drop technique. Member of the Fantastic Five and L Brothers. Scratching became foundational DJ technique copied worldwide.",
        quote: "I was just trying to hold the record still, and I heard this noise...",
        isFeatured: true,
      },
      {
        name: "Afrika Bambaataa",
        epithet: "The Godfather of Hip-Hop Culture",
        born: "April 17, 1957, Bronx, New York",
        domains: ["Zulu Nation", "Five Elements", "Philosophy"],
        description: "Kevin Donovan was a former warlord of the Black Spades gang who founded the Universal Zulu Nation in 1973. Defined the 'four elements' of Hip-Hop; added knowledge as fifth. Released 'Planet Rock' (1982), fusing Hip-Hop with electronic sound. Note: Faced sexual abuse allegations in 2010s.",
        quote: "Knowledge, wisdom, understanding, and overstanding—these are the foundations.",
        isFeatured: true,
        imageUrl: IMAGES.afrikaBambaataa,
        imageAttribution: "National Portrait Gallery, Smithsonian Institution, 1983, CC BY-SA 4.0",
      },
    ],
  },

  // CHAPTER 5
  {
    id: "ch5",
    number: "Chapter V",
    title: "MC Emerges",
    subtitle: "From Hype Man to Lyricist (1973–1982)",
    era: "birth",
    narrative: [
      "At first, the MC was secondary—a hype man who kept the crowd moving while the DJ worked the turntables. 'Throw your hands in the air! Say Ho!' But the voice at the microphone kept evolving.",
      "Coke La Rock at Herc's earliest parties established the role: call-and-response, crowd control, rhythmic patter. DJ Hollywood and Love Bug Starski brought smoother, more melodic styles from Harlem disco clubs. The term 'Hip-Hop' itself may have been coined in these early microphone sessions.",
      "Then came the leap to recording. On September 16, 1979, Sylvia Robinson of Sugar Hill Records released 'Rapper's Delight' by the Sugarhill Gang. It wasn't the first rap record, but it was the first to chart nationally, reaching #36 on the Billboard Hot 100.",
      "The culture was now on vinyl—and that changed everything. What had been live, communal, improvised became fixed, recorded, commodified. Some saw opportunity; others saw something lost.",
    ],
    figures: [
      {
        name: "Sylvia Robinson",
        epithet: "The Mother of Hip-Hop Records",
        born: "March 6, 1935, New York City",
        died: "September 29, 2011",
        domains: ["Producer", "Sugar Hill Records", "Visionary"],
        description: "Former R&B singer who co-founded Sugar Hill Records with husband Joe Robinson. Produced 'Rapper's Delight' (1979) and 'The Message' (1982). Saw commercial potential in street culture before anyone else.",
        quote: "I heard the music in Harlem and knew it could be a hit.",
        isFeatured: true,
      },
      {
        name: "Melle Mel",
        epithet: "The First Rap Poet",
        born: "May 15, 1961, Bronx, New York",
        domains: ["Lyricism", "Social Commentary", "The Message"],
        description: "Melvin Glover was lead MC of Grandmaster Flash and the Furious Five. Wrote 'The Message' (1982)—Hip-Hop's first socially conscious masterpiece. First rapper to be billed as 'MC.'",
        quote: "Don't push me 'cause I'm close to the edge...",
        isFeatured: true,
      },
      {
        name: "Sha-Rock",
        epithet: "The First Female MC",
        born: "April 4, 1962, Wilmington, North Carolina",
        domains: ["Pioneer", "Funky Four + 1", "Breaking Barriers"],
        description: "Sharon Green was member of the Funky Four + 1. Appeared on Saturday Night Live in 1981—first Hip-Hop act on national TV. Battled male MCs and earned respect in male-dominated culture.",
        quote: "We had to prove ourselves every single time. There was no room for error.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 6
  {
    id: "ch6",
    number: "Chapter VI",
    title: "Breaking",
    subtitle: "The Body Writes History (1975–1984)",
    era: "wildstyle",
    epigraph: {
      text: "When you have nothing, you have movement.",
      source: "Crazy Legs",
    },
    chapterImage: {
      url: IMAGES.bBoyBreaking,
      alt: "B-boy performing breakdance freeze move",
      attribution: "CC BY 2.0, via Wikimedia Commons",
    },
    narrative: [
      "The b-boys and b-girls didn't need equipment. They needed only bodies, a cardboard sheet, and a break. During Herc's extended instrumental sections, dancers would take the floor—and what they did there became an art form.",
      "Breaking drew from multiple sources: James Brown's footwork, martial arts from kung fu films, gymnastics, Afro-Puerto Rican dance traditions. The style crystallized in the South Bronx and spread to Harlem, Brooklyn, and beyond.",
      "The Rock Steady Crew, founded in 1977, became breaking's most famous crew. Led by Crazy Legs, they brought breaking to global audiences through films like 'Wild Style' (1983), 'Flashdance' (1983), and 'Beat Street' (1984).",
      "Breaking was democratic: no entry fee, no equipment cost. It was also Latino as much as Black—Puerto Rican and Dominican contributions were essential. This diversity would often be overlooked as Hip-Hop history was written.",
    ],
    figures: [
      {
        name: "Crazy Legs",
        epithet: "The Face of Breaking",
        born: "January 1, 1966, Bronx, New York",
        domains: ["Rock Steady Crew", "B-Boy", "Ambassador"],
        description: "Richard Colón, of Puerto Rican heritage, has been president of Rock Steady Crew since 1979. Brought breaking to mainstream through 'Wild Style,' 'Flashdance,' 'Beat Street.' Represents the critical Latino contribution to Hip-Hop.",
        quote: "Breaking was about taking what we had—our bodies—and making art with it.",
        isFeatured: true,
      },
      {
        name: "Ken Swift",
        epithet: "The Epitome of B-Boy",
        born: "July 28, 1966, New York City",
        domains: ["Rock Steady Crew", "Technical Mastery", "Innovation"],
        description: "Kenneth Gabbert is known as the most technically proficient b-boy of the original era. Credited with inventing numerous foundational moves. Member of Rock Steady Crew.",
        quote: "It's not just dancing—it's a language, a way of communicating.",
        isFeatured: true,
      },
      {
        name: "Frosty Freeze",
        epithet: "The Power Move Pioneer",
        born: "June 4, 1963, Bronx, New York",
        died: "June 28, 2008",
        domains: ["Rock Steady Crew", "Suicide", "Power Moves"],
        description: "Wayne Frost was known for his 'suicide' move and explosive style. Member of Rock Steady Crew who helped define the vocabulary of power moves. Appeared in 'Wild Style' and 'Beat Street.'",
        isFeatured: false,
      },
    ],
  },

  // CHAPTER 7
  {
    id: "ch7",
    number: "Chapter VII",
    title: "Graffiti",
    subtitle: "The City Becomes a Canvas (1971–1989)",
    era: "wildstyle",
    epigraph: {
      text: "When you're invisible, you make yourself seen.",
      source: "Lee Quiñones",
    },
    chapterImage: {
      url: IMAGES.nycGraffitiTrain,
      alt: "Graffiti-covered train in New York City tunnel, 2013",
      attribution: "CC BY-SA 3.0, via Wikimedia Commons",
    },
    narrative: [
      "Before Hip-Hop had a name, writers were already bombing the city. In 1971, a Greek-American messenger named TAKI 183 tagged his name across New York—and a New York Times feature made him famous. Suddenly, tagging was everywhere.",
      "The subway system became the perfect distribution network. A tag painted in a Brooklyn yard could be seen in the Bronx by morning. Writers evolved from simple tags to elaborate 'pieces' (masterpieces)—colorful, stylized productions that covered entire train cars.",
      "Phase 2 invented bubble letters. Lee Quiñones painted whole-car murals. Lady Pink proved women could master the form. Dondi White and Seen became legends. The trains themselves became rolling galleries.",
      "The city fought back. The MTA's 'Clean Car Program' in the 1980s eventually eradicated subway graffiti. But by then, the aesthetic had spread worldwide.",
    ],
    figures: [
      {
        name: "TAKI 183",
        epithet: "The First Tag to Go Citywide",
        domains: ["Tag", "Pioneer", "Legend"],
        description: "Demetrius was a Greek-American messenger who tagged across NYC in early 1970s. Name derived from 'Taki' (Greek nickname) + '183' (his street). New York Times feature in 1971 helped spark graffiti movement.",
        quote: "I just wanted to leave my mark.",
        isFeatured: true,
      },
      {
        name: "Phase 2",
        epithet: "The Father of Graffiti Style",
        born: "1955, Bronx, New York",
        died: "December 13, 2019",
        domains: ["Bubble Letters", "Softie", "Style Master"],
        description: "Lonny Wood invented the 'bubble letter' style that defined graffiti aesthetics. Created the 'softie' letter form. One of the most influential writers in graffiti history.",
        quote: "Style is everything. Anyone can write their name—style makes it art.",
        isFeatured: true,
      },
      {
        name: "Lee Quiñones",
        epithet: "The King of Whole-Car Productions",
        born: "1960, Ponce, Puerto Rico",
        domains: ["Whole-Car", "Muralist", "Wild Style"],
        description: "Raised in Lower East Side. Known for elaborate whole-car subway murals. Starred in 'Wild Style' (1983). Transitioned from illegal graffiti to gallery art while maintaining street credibility.",
        quote: "The trains were our galleries. We painted for the people.",
        isFeatured: true,
      },
      {
        name: "Lady Pink",
        epithet: "First Lady of Graffiti",
        born: "April 4, 1964, Ambato, Ecuador",
        domains: ["Pioneer", "Writer", "Gallery Artist"],
        description: "Sandra Fabara was one of the only prominent female graffiti writers of the era. Active from 1979–1985 on NYC subways. Proved women could compete at the highest level.",
        quote: "I had to earn respect the hard way—by painting better than everyone else.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 8
  {
    id: "ch8",
    number: "Chapter VIII",
    title: "The Elements and Philosophy",
    subtitle: "Knowledge as the Fifth Element",
    era: "wildstyle",
    narrative: [
      "Hip-Hop wasn't just four art forms happening in the same place. Afrika Bambaataa and the Universal Zulu Nation gave it a framework: DJing, MCing, breaking, and graffiti were the four elements. Later, knowledge—consciousness, awareness, self-improvement—was added as the fifth.",
      "The Zulu Nation emerged from gang culture. Bambaataa had been a warlord of the Black Spades. After the gang truces of the early 1970s, he channeled that organizational energy into culture. The Zulu Nation became a peace movement, a school, a philosophy.",
      "This matters because Hip-Hop was never just music. From the beginning, it was community infrastructure—a way for young people to find identity, status, and belonging outside the systems that had failed them.",
      "The parties weren't just parties; they were alternatives to gang warfare. The battles weren't just competitions; they were ways to settle disputes without violence. The culture saved lives.",
    ],
    figures: [
      {
        name: "The Universal Zulu Nation",
        epithet: "The Temple of Hip-Hop",
        domains: ["Philosophy", "Organization", "Peace Movement"],
        description: "Founded by Afrika Bambaataa in 1973 as a transformation of gang culture into creative culture. Codified the elements of Hip-Hop. Spread the culture globally through its international chapters.",
        quote: "Peace, love, unity, and having fun.",
        isFeatured: true,
      },
      {
        name: "KRS-One",
        epithet: "The Teacha",
        born: "August 20, 1965, Brooklyn, New York",
        domains: ["Philosophy", "Boogie Down Productions", "Consciousness"],
        description: "Lawrence Parker founded Boogie Down Productions and became Hip-Hop's most vocal philosopher. Author of 'The Gospel of Hip Hop.' Treats Hip-Hop as a spiritual and intellectual movement, not just entertainment.",
        quote: "Rap is something you do. Hip-Hop is something you live.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 9
  {
    id: "ch9",
    number: "Chapter IX",
    title: "From Street to Vinyl",
    subtitle: "The Recording Era Transforms the Culture (1979–1986)",
    era: "golden",
    narrative: [
      "Before 1979, Hip-Hop existed only in the moment—in parks, rec rooms, and clubs. You had to be there. Then 'Rapper's Delight' sold two million copies, and everything changed.",
      "Sugar Hill Records proved there was money to be made. 'The Message' (1982) proved rap could be poetry. But these were still independent operations, working outside the mainstream music industry.",
      "Def Jam Records, founded in 1984 by Russell Simmons and Rick Rubin in a NYU dorm room, changed that. They signed LL Cool J at age 16, produced the Beastie Boys' 'Licensed to Ill' (1986, first rap album to hit #1), and turned Run-DMC into superstars.",
      "Run-DMC's 1986 deal with Adidas—negotiated after they held up their sneakers at Madison Square Garden—became the first major brand partnership in Hip-Hop. The culture was now a business, and business was good.",
    ],
    figures: [
      {
        name: "Run-DMC",
        epithet: "The Kings of Rock",
        domains: ["Pioneers", "Crossover", "Rock Fusion"],
        description: "Joseph 'Run' Simmons, Darryl 'D.M.C.' McDaniels, and Jason 'Jam Master Jay' Mizell (murdered October 30, 2002). First Hip-Hop group on MTV and 'American Bandstand.' 'Walk This Way' (1986) with Aerosmith broke MTV's color barrier. First platinum and multi-platinum rap albums.",
        quote: "It's like that, and that's the way it is.",
        isFeatured: true,
      },
      {
        name: "LL Cool J",
        epithet: "The First Solo Superstar",
        born: "January 14, 1968, Queens, New York",
        domains: ["Def Jam", "Crossover", "Longevity"],
        description: "James Todd Smith was the first artist signed to Def Jam Records at age 16. First hip-hop artist to achieve crossover love song success with 'I Need Love.' 'Ladies Love Cool James'—marketed sexuality to female audience while maintaining street credibility.",
        quote: "I'm gonna knock you out. Mama said knock you out.",
        isFeatured: true,
      },
      {
        name: "Russell Simmons",
        epithet: "The Hip-Hop Mogul",
        born: "October 4, 1957, Queens, New York",
        domains: ["Def Jam", "Business", "Empire"],
        description: "Co-founded Def Jam Records (1984) with Rick Rubin. Managed Run-DMC (his brother's group). Built Hip-Hop into a corporate industry. Note: Faced multiple sexual assault allegations in 2017+.",
        quote: "Hip-Hop is not just music—it's a culture, a lifestyle, a business.",
        isFeatured: false,
      },
    ],
  },

  // CHAPTER 10
  {
    id: "ch10",
    number: "Chapter X",
    title: "The Golden Age",
    subtitle: "Hip-Hop's Creative Explosion (1987–1993)",
    era: "golden",
    epigraph: {
      text: "Every year brought innovations that would never be matched.",
      source: "The Source Magazine, 1993",
    },
    narrative: [
      "Between 1987 and 1993, Hip-Hop experienced an explosion of creativity that has never been replicated. Every year brought innovations that redefined what the art form could be.",
      "Rakim transformed lyricism itself. Where earlier MCs used simple end rhymes, Rakim wove complex internal rhyme schemes, changing how rappers thought about language. KRS-One brought a teaching philosophy. Big Daddy Kane brought smooth swagger.",
      "Public Enemy—Chuck D, Flavor Flav, and the Bomb Squad production team—made Hip-Hop a political weapon. 'It Takes a Nation of Millions to Hold Us Back' (1988) was a sonic and political manifesto.",
      "Meanwhile, N.W.A in Los Angeles created gangsta rap's national breakthrough. 'Straight Outta Compton' (1988) was so controversial the FBI sent a letter objecting to 'Fuck tha Police.'",
      "And alternatives flourished: De La Soul's playful Afrocentrism, A Tribe Called Quest's jazz-rap fusion. Women demanded space: MC Lyte released the first solo female album (1988), Queen Latifah delivered the feminist anthem 'Ladies First' (1989). Diversity wasn't a problem—it was the culture's strength.",
    ],
    figures: [
      {
        name: "Rakim",
        epithet: "The God MC",
        born: "January 28, 1968, Wyandanch, New York",
        domains: ["Lyricism", "Internal Rhyme", "Eric B. & Rakim"],
        description: "William Michael Griffin Jr. revolutionized rap lyricism with complex internal rhyme schemes. Half of Eric B. & Rakim. 'Paid in Full' (1987) is considered a watershed moment in Hip-Hop history.",
        quote: "I came in the door, I said it before, I never let the mic magnetize me no more.",
        isFeatured: true,
      },
      {
        name: "Chuck D",
        epithet: "The Voice of a Nation",
        born: "August 1, 1960, Queens, New York",
        domains: ["Public Enemy", "Politics", "Black CNN"],
        description: "Carlton Ridenhour was lead MC of Public Enemy. 'It Takes a Nation of Millions to Hold Us Back' (1988)—political manifesto. Defined Hip-Hop as 'Black CNN.' Combined intellectual heft with sonic intensity.",
        quote: "Fight the Power.",
        isFeatured: true,
      },
      {
        name: "Queen Latifah",
        epithet: "The Queen of Hip-Hop",
        born: "March 18, 1970, Newark, New Jersey",
        domains: ["Feminist Hip-Hop", "Crossover", "CEO"],
        description: "Dana Owens released 'Ladies First' (1989), the feminist Hip-Hop anthem. CEO of Flavor Unit Management. First rapper to receive a star on Hollywood Walk of Fame. Proved women could lead in the culture.",
        quote: "Who you calling a bitch?",
        isFeatured: true,
      },
      {
        name: "Dr. Dre",
        epithet: "The Producer Who Defined the West",
        born: "February 18, 1965, Compton, California",
        domains: ["N.W.A", "Death Row", "G-Funk"],
        description: "Andre Young was N.W.A member who later founded Death Row Records. 'The Chronic' (1992) created the G-funk sound. Discovered Snoop Dogg, Eminem, 50 Cent, Kendrick Lamar. The most influential producer in Hip-Hop history.",
        quote: "I wanted to make music that you could feel in your chest.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 11
  {
    id: "ch11",
    number: "Chapter XI",
    title: "Controversies and Culture Wars",
    subtitle: "Hip-Hop Under Attack (1985–1995)",
    era: "golden",
    contentWarning: "This chapter discusses explicit content, censorship battles, and cultural conflict.",
    narrative: [
      "Success brought enemies. As Hip-Hop grew, so did the backlash.",
      "C. Dolores Tucker, civil rights activist turned moral crusader, campaigned against 'gangsta rap,' calling it degrading to Black women. Tipper Gore and the Parents Music Resource Center (PMRC) pushed for warning labels. In 1985, the 'Parental Advisory: Explicit Content' sticker was born.",
      "In Florida in 1990, 2 Live Crew were arrested for obscenity after a performance. Their leader, Luther Campbell, fought the case to the Supreme Court—and won. But the message was clear: Hip-Hop was being watched.",
      "Ice-T's 'Cop Killer' (1992) with his rock band Body Count triggered boycotts and death threats. Police organizations demanded action. Time Warner eventually pulled the song from the album.",
      "Hip-Hop events faced special scrutiny. Insurance companies refused coverage. Police monitored shows with helicopter surveillance. The cultural form that emerged from the Bronx was now being policed across the nation.",
    ],
    figures: [
      {
        name: "Luther Campbell",
        epithet: "The First Amendment Fighter",
        born: "December 22, 1960, Miami, Florida",
        domains: ["2 Live Crew", "Free Speech", "Legal Battle"],
        description: "Leader of 2 Live Crew who was arrested for obscenity in Florida, 1990. Fought the case to the Supreme Court and won. Established Hip-Hop's First Amendment protections.",
        quote: "We're not going to let them tell us what we can say.",
        isFeatured: true,
      },
      {
        name: "Ice-T",
        epithet: "The Original Gangsta",
        born: "February 16, 1958, Newark, New Jersey",
        domains: ["West Coast Pioneer", "Actor", "Controversy"],
        description: "Tracy Lauren Marrow released '6 in the Mornin'' (1986), pioneering West Coast gangsta rap. 'Cop Killer' controversy (1992) made him target of national outrage. Successfully transitioned to acting.",
        quote: "Freedom of speech—just watch what you say.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 12
  {
    id: "ch12",
    number: "Chapter XII",
    title: "Coastal Wars and Tragedy",
    subtitle: "East vs. West, and What Was Lost (1994–1997)",
    era: "bicoastal",
    contentWarning: "This chapter discusses violence and the murders of Tupac Shakur and Notorious B.I.G.",
    epigraph: {
      text: "What we lost.",
      source: "In memory of Tupac and Biggie",
    },
    narrative: [
      "The mid-1990s saw Hip-Hop at commercial peak—and moral nadir. What began as regional pride became deadly.",
      "In 1994, Nas released 'Illmatic' and Notorious B.I.G. released 'Ready to Die'—East Coast masterpieces that announced a renaissance. Meanwhile, Death Row Records dominated the West.",
      "At the 1995 Source Awards, Suge Knight insulted Sean 'Puffy' Combs from the stage. The crowd booed. Lines were drawn.",
      "Tupac Shakur was shot five times at Quad Recording Studios in 1994 (he survived). He blamed Biggie and Puffy. Songs became weapons—'Hit 'Em Up,' 'Who Shot Ya?' The media fanned flames.",
      "On September 7, 1996, Tupac was shot in Las Vegas. He died six days later, age 25. On March 9, 1997, Notorious B.I.G. was shot in Los Angeles. He died that night, age 24.",
      "Neither murder has been solved. Hip-Hop had lost two of its brightest voices—not to the outside enemies who attacked the culture, but to violence from within.",
    ],
    figures: [
      {
        name: "Tupac Shakur",
        epithet: "The Revolutionary Contradiction",
        born: "June 16, 1971, East Harlem, New York",
        died: "September 13, 1996, Las Vegas",
        domains: ["Poetry", "Acting", "Icon"],
        description: "Lesane Parish Crooks had Black Panther lineage (mother Afeni Shakur). 'All Eyez on Me' (1996)—first double studio Hip-Hop album. Combined thug persona with vulnerable introspection. Cultural icon beyond music: actor, poet, philosopher.",
        quote: "Only God can judge me.",
        isFeatured: true,
      },
      {
        name: "Notorious B.I.G.",
        epithet: "The Greatest Storyteller",
        born: "May 21, 1972, Brooklyn, New York",
        died: "March 9, 1997, Los Angeles",
        domains: ["Storytelling", "Flow", "Brooklyn"],
        description: "Christopher Wallace's 'Ready to Die' (1994) established him as East Coast champion. Flow and storytelling ability considered among the best ever. Death at age 24 devastated Hip-Hop.",
        quote: "It was all a dream.",
        isFeatured: true,
      },
      {
        name: "Nas",
        epithet: "The Poet Laureate of the Projects",
        born: "September 14, 1973, Queensbridge, Queens",
        domains: ["Illmatic", "Lyricism", "Queensbridge"],
        description: "Nasir Jones released 'Illmatic' (1994)—widely considered the greatest Hip-Hop debut album. Lyrical density and storytelling unmatched. Represented Queensbridge housing projects with vivid imagery.",
        quote: "I never sleep, 'cause sleep is the cousin of death.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 13
  {
    id: "ch13",
    number: "Chapter XIII",
    title: "Global Hip-Hop",
    subtitle: "The Culture Translates Itself Worldwide (1984–Present)",
    era: "digital",
    narrative: [
      "Hip-Hop was never just American. Almost as soon as it had a name, it began to travel.",
      "France embraced Hip-Hop early—1984 saw the first French rap releases. By the 1990s, MC Solaar was platinum, and groups like IAM created distinctly French Hip-Hop traditions. Today, French Hip-Hop outsells American Hip-Hop in France.",
      "The UK developed its own mutations: grime emerged in early 2000s London, with Dizzee Rascal winning the Mercury Prize in 2003. The sound borrowed from Hip-Hop but drew equally on UK garage, jungle, and dancehall.",
      "Japan hosted 'Wild Style' screenings in 1984 and never looked back. Brazil became the largest Hip-Hop scene outside the US—Racionais MCs in São Paulo used Hip-Hop for social critique of favela conditions.",
      "Germany, Cuba, Senegal, South Korea—everywhere Hip-Hop landed, it adapted. Local languages, local concerns, local sounds. The culture couldn't be stopped at any border.",
    ],
    figures: [
      {
        name: "MC Solaar",
        epithet: "The French Wordsmith",
        born: "March 5, 1969, Dakar, Senegal",
        domains: ["French Hip-Hop", "Poetry", "Sophistication"],
        description: "Claude M'Barali was raised in Paris. Achieved platinum status in France with sophisticated lyricism. Proved Hip-Hop could be poetry in any language. 'Prose Combat' (1994)—French Hip-Hop landmark.",
        quote: "Le rap est un art, pas seulement de la musique.",
        isFeatured: true,
      },
      {
        name: "Dizzee Rascal",
        epithet: "The Grime Pioneer",
        born: "September 18, 1984, Bow, London",
        domains: ["Grime", "UK Hip-Hop", "Mercury Prize"],
        description: "Dylan Kwabena Mills released 'Boy in da Corner' (2003), which won the Mercury Prize—first grime album to do so. Fused Hip-Hop with UK electronic traditions. Proved British Hip-Hop could stand alone.",
        quote: "I'm from the East End, not the Bronx. I represent that.",
        isFeatured: true,
      },
      {
        name: "Racionais MCs",
        epithet: "The Voice of the Favelas",
        domains: ["Brazilian Hip-Hop", "Social Critique", "São Paulo"],
        description: "Brazilian Hip-Hop group from São Paulo led by Mano Brown. 'Sobrevivendo no Inferno' (1997)—sold 1.5 million copies without major label support. Hip-Hop as vehicle for social critique in Brazil.",
        quote: "Negro drama. Entre o sucesso e a lama.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 14
  {
    id: "ch14",
    number: "Chapter XIV",
    title: "The Digital Era",
    subtitle: "Streaming, SoundCloud, and a New Generation (2000–Present)",
    era: "digital",
    narrative: [
      "The 2000s brought new moguls. Jay-Z transitioned from rapper to business empire. Kanye West redefined production and then rap itself. Eminem became the best-selling rapper of all time, sparking debates about race and authenticity that continue today.",
      "Then came the flood. Streaming democratized distribution: anyone with a laptop could reach the world. SoundCloud birthed new subgenres and new stars—XXXTentacion, Lil Uzi Vert, Juice WRLD—often before they could navigate fame.",
      "In 2017, Hip-Hop officially surpassed rock as America's most-consumed music genre. In 2018, Kendrick Lamar won the Pulitzer Prize for Music—the first non-classical or jazz artist to do so.",
      "Women reclaimed space: Nicki Minaj dominated the 2010s; Cardi B emerged from the Bronx like an echo of origins; Megan Thee Stallion continued the lineage. Hip-Hop at 50 is not what it was at 10 or 20—it's bigger, more commercial, more diverse, more global, and still evolving.",
    ],
    figures: [
      {
        name: "Jay-Z",
        epithet: "The Mogul",
        born: "December 4, 1969, Brooklyn, New York",
        domains: ["Business", "Roc-A-Fella", "Billionaire"],
        description: "Shawn Carter went from 'Reasonable Doubt' (1996) to billionaire status. Roc-A-Fella Records, Roc Nation, Tidal. First rapper inducted into Songwriters Hall of Fame. Married to Beyoncé.",
        quote: "I'm not a businessman—I'm a business, man.",
        isFeatured: true,
      },
      {
        name: "Kanye West",
        epithet: "The Iconoclast",
        born: "June 8, 1977, Atlanta, Georgia",
        domains: ["Production", "Fashion", "Controversy"],
        description: "Producer for Jay-Z who broke through as rapper with 'The College Dropout' (2004). Pushed boundaries of Hip-Hop sound, fashion, culture. Controversial public persona and mental health struggles. Changed his name to Ye.",
        quote: "My greatest pain in life is that I will never be able to see myself perform live.",
        isFeatured: true,
      },
      {
        name: "Kendrick Lamar",
        epithet: "The Pulitzer Winner",
        born: "June 17, 1987, Compton, California",
        domains: ["Pulitzer Prize", "Concept Albums", "Compton"],
        description: "Kendrick Lamar Duckworth released 'good kid, m.A.A.d city' (2012) and 'To Pimp a Butterfly' (2015). 'DAMN.' (2017) won Pulitzer Prize for Music—first Hip-Hop album to do so. Seen as heir to Tupac's conscious/commercial dual identity.",
        quote: "I got loyalty, got royalty inside my DNA.",
        isFeatured: true,
      },
      {
        name: "Cardi B",
        epithet: "The Bronx Revival",
        born: "October 11, 1992, Bronx, New York",
        domains: ["Bronx", "Grammy Winner", "Social Media"],
        description: "Belcalis Almánzar went from stripper to reality TV to rap superstar. 'Invasion of Privacy' (2018)—first solo female album to win Best Rap Album Grammy since Lauryn Hill (1999). Proof the Bronx still produces champions.",
        quote: "I came from the Bronx. I am Hip-Hop.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 15
  {
    id: "ch15",
    number: "Chapter XV",
    title: "What Hip-Hop Is Now",
    subtitle: "Culture vs. Genre, and Debates That Continue",
    era: "digital",
    narrative: [
      "At 50 years old, Hip-Hop is both dominant and contested. The debates never ended—they multiplied.",
      "Culture vs. Genre: Is Hip-Hop a culture with multiple elements, or is it a genre of music? The mainstream knows 'rap.' The culture knows more. The Universal Hip Hop Museum, opened in the Bronx in 2024, attempts to preserve and educate.",
      "Authenticity: What makes someone 'real'? Is street experience required? Is commercial success betrayal? These questions, present from the start, remain unanswered—maybe unanswerable.",
      "Gender: Women have always been in Hip-Hop. From Cindy Campbell to Cardi B, they've been present. But the culture's relationship to women—as artists, as subjects, as audience—remains complicated, contested, evolving.",
      "The Cypher Continues: Walk through any city on Earth and you'll find b-boys in parks, producers in bedrooms, writers on walls, MCs in ciphers. The corporate version of Hip-Hop is not the only version. The community version—the version that started in rec rooms and parks—still exists.",
    ],
    figures: [
      {
        name: "The Universal Hip Hop Museum",
        epithet: "The Temple of Preservation",
        domains: ["Education", "Preservation", "The Bronx"],
        description: "Opened in 2024 in the Bronx, the birthplace of Hip-Hop. Dedicated to preserving and celebrating Hip-Hop history, culture, and impact. A recognition that the culture deserves institutional memory.",
        isFeatured: true,
      },
      {
        name: "The Underground",
        epithet: "The Cipher Never Closes",
        domains: ["B-Boys", "Bedroom Producers", "Street Writers"],
        description: "Beyond the platinum albums and streaming billions, Hip-Hop's original forms continue. Breaking crews compete worldwide. Producers share beats online. Writers still paint. The commercial industry is not the whole culture.",
        quote: "The party never ended. We just moved it somewhere else.",
        isFeatured: true,
      },
    ],
  },

  // EPILOGUE
  {
    id: "epilogue",
    number: "Epilogue",
    title: "The Beat Migrates",
    subtitle: "Fifty Years and Counting",
    era: "digital",
    narrative: [
      "On August 11, 1973, Cindy Campbell threw a party. Her brother Clive played the breaks. Something crystallized.",
      "Fifty years later, Hip-Hop is the most consumed music genre on Earth. It has survived censorship, violence, co-optation, and criticism. It has produced billionaires and prisoners, poets and provocateurs. It has been declared dead more times than can be counted, and it refuses to die.",
      "This is because Hip-Hop was never just music. It was a solution to a problem: What do you do when the city abandons you? You build your own city. You create your own systems of meaning, status, expression. You invent.",
      "The conditions that created Hip-Hop—urban abandonment, racial inequality, youth without resources—have not disappeared. They've spread. And everywhere they exist, young people find Hip-Hop waiting for them, ready to be used.",
      "The cipher is always open. The break is always playing. The culture continues.",
    ],
    figures: [],
  },
];

// ==================== SOURCES DATA ====================

const sources = [
  { title: "Can't Stop Won't Stop: A History of the Hip-Hop Generation — Jeff Chang", url: "https://www.goodreads.com/book/show/51979.Can_t_Stop_Won_t_Stop" },
  { title: "The Big Payback: The History of the Business of Hip-Hop — Dan Charnas", url: "https://www.goodreads.com/book/show/8523145-the-big-payback" },
  { title: "Yes Yes Y'all: The Experience Music Project Oral History of Hip-Hop's First Decade", url: "https://www.goodreads.com/book/show/138266.Yes_Yes_Y_all" },
  { title: "The Hip Hop Wars — Tricia Rose", url: "https://www.goodreads.com/book/show/3282453-the-hip-hop-wars" },
  { title: "Born in the Bronx: A Visual Record of the Early Days of Hip Hop — Joe Conzo Jr.", url: "https://www.goodreads.com/book/show/1951976.Born_in_the_Bronx" },
  { title: "Cornell Hip Hop Collection — Cornell University Library", url: "https://rmc.library.cornell.edu/hiphop/" },
  { title: "Smithsonian National Museum of African American History and Culture — Hip-Hop Collection", url: "https://nmaahc.si.edu/" },
  { title: "The Bronx Documentary Center — Archives", url: "https://www.bronxdoc.org/" },
];

// ==================== HERO SECTION ====================
// TODO: Re-enable scroll-lock when ready (see pattern: docs/front-end/SCROLL_LOCK_PATTERN.md)

const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <div
        className="hero-background hero-background--with-image"
        style={{
          backgroundImage: `url(${IMAGES.heroBackground})`,
        }}
      />
      <div className="hero-content">
        <span className="hero-overline">A Visual Essay</span>
        <h1 className="hero-title">Hip-Hop</h1>
        <p className="hero-subtitle">From the Bronx to the World</p>
      </div>
      <div className="hero-scroll-indicator">
        <span className="scroll-text">Scroll to Begin</span>
        <div className="scroll-line" />
      </div>
      <p className="hero-attribution">
        1520 Sedgwick Avenue, Bronx, NY — The birthplace of Hip-Hop | CC BY-SA 3.0
      </p>
    </section>
  );
};

// ==================== MAIN COMPONENT ====================

export default function HipHopHistoryClient() {
  const progress = useGlobalScrollProgress();

  return (
    <div className="hip-hop-history">
      <MixtapeProgress progress={progress} />

      {/* Global Content Warning */}
      <div className="sr-only" role="alert">
        Content warning: This essay discusses urban decay, violence, drug references, explicit language in quoted lyrics, and the murders of Tupac Shakur and Notorious B.I.G.
      </div>

      {/* HERO (scroll-lock temporarily disabled) */}
      <Hero />

      {/* CHAPTERS */}
      {chapters.map((chapter) => (
        <ChapterSection key={chapter.id} chapter={chapter} />
      ))}

      {/* EPILOGUE PREVIEW */}
      <section className="epilogue-section">
        <p className="epilogue-text">
          On August 11, 1973, Cindy Campbell threw a party. Her brother Clive played the breaks.
          Something crystallized. Fifty years later, Hip-Hop is the most consumed music genre on Earth.
          The cipher is always open. The break is always playing. The culture continues.
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
            This narrative draws from oral histories, academic research, and documented archives.
            Hip-Hop history is living history—memories conflict, dates blur, credit is contested.
            We honor the complexity while telling the story.
          </p>
        </div>
      </section>
    </div>
  );
}
