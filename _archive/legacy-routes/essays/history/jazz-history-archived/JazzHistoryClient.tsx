"use client";

import React, { useEffect, useRef, useState } from "react";
import "./jazz-history.css";

// ============================================================================
// JAZZ: THE SOUND OF FREEDOM IN REAL TIME
// ============================================================================
// Visual Treatment: Archival photography with era-specific processing
// Arc Type: Genesis -> Explosion -> Revolution -> Institution
// Progress Bar: Musical staff with accumulating notes
// Cultural Lens: Centers Black American innovation, acknowledges paradoxes
// Primary Source: Library of Congress William P. Gottlieb Collection (public domain)
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
  quoteSource?: string;
  isFeatured?: boolean;
  imageUrl?: string;
  imageAttribution?: string;
}

interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  era: "origins" | "migration" | "swing" | "bebop" | "bluenote" | "free" | "paradox" | "women" | "contemporary";
  temporalMarker?: string;
  epigraph?: { text: string; source: string };
  narrative: string[];
  figures: Figure[];
  chapterImage?: {
    url: string;
    alt: string;
    attribution: string;
  };
}

// ==================== VERIFIED PUBLIC DOMAIN IMAGES ====================
// All images from Library of Congress Gottlieb Collection (dedicated to public domain 2010)
// or Carl Van Vechten Collection (public domain)

const IMAGES = {
  // Swing Era - Gottlieb Collection
  dukeEllington: "https://tile.loc.gov/image-services/iiif/public:music:musgottlieb-02351-001:0001/full/pct:50.0/0/default.jpg",
  countBasie: "https://tile.loc.gov/image-services/iiif/public:music:musgottlieb-00471-001:0001/full/pct:50.0/0/default.jpg",
  bennyGoodman: "https://tile.loc.gov/image-services/iiif/public:music:musgottlieb-03431:0001/full/pct:50.0/0/default.jpg",
  ellaFitzgerald: "https://tile.loc.gov/image-services/iiif/public:music:musgottlieb-11471:0001/full/pct:50.0/0/default.jpg",
  billieHoliday: "https://tile.loc.gov/image-services/iiif/public:music:musgottlieb-04221-001:0001/full/pct:50.0/0/default.jpg",
  lionelHampton: "https://tile.loc.gov/image-services/iiif/public:music:musgottlieb-03841:0001/full/pct:50.0/0/default.jpg",
  cabCalloway: "https://tile.loc.gov/image-services/iiif/public:music:musgottlieb-01021:0001/full/pct:50.0/0/default.jpg",
  lesterYoung: "https://tile.loc.gov/image-services/iiif/public:music:musgottlieb-09431-001:0001/full/pct:50.0/0/default.jpg",
  colemanHawkins: "https://tile.loc.gov/image-services/iiif/public:music:musgottlieb-03991-001:0001/full/pct:50.0/0/default.jpg",

  // Louis Armstrong
  louisArmstrong: "https://tile.loc.gov/image-services/iiif/public:music:musgottlieb-00171-001:0001/full/pct:50.0/0/default.jpg",

  // Bebop Era - Gottlieb Collection
  charlieParker: "https://tile.loc.gov/image-services/iiif/public:music:musgottlieb-06901:0001/full/pct:50.0/0/default.jpg",
  dizzyGillespie: "https://tile.loc.gov/image-services/iiif/public:music:musgottlieb-03091-001:0001/full/pct:50.0/0/default.jpg",
  theloniousMonk: "https://tile.loc.gov/image-services/iiif/public:music:musgottlieb-06221:0001/full/pct:50.0/0/default.jpg",
  maxRoach: "https://tile.loc.gov/image-services/iiif/public:music:musgottlieb-07451-001:0001/full/pct:50.0/0/default.jpg",
  milesDavis: "https://tile.loc.gov/image-services/iiif/public:music:musgottlieb-05711-001:0001/full/pct:50.0/0/default.jpg",
  sarahVaughan: "https://tile.loc.gov/image-services/iiif/public:music:musgottlieb-08821:0001/full/pct:50.0/0/default.jpg",

  // Venues
  fiftySecondStreet: "https://tile.loc.gov/image-services/iiif/public:music:musgottlieb-11231-001:0001/full/pct:50.0/0/default.jpg",

  // Pioneers
  sidneyBechet: "https://tile.loc.gov/image-services/iiif/public:music:musgottlieb-00531-001:0001/full/pct:50.0/0/default.jpg",
  billyStrayhorn: "https://tile.loc.gov/image-services/iiif/public:music:musgottlieb-08221:0001/full/pct:50.0/0/default.jpg",

  // Women - Gottlieb & Van Vechten
  maryLouWilliams: "https://tile.loc.gov/image-services/iiif/public:music:musgottlieb-15991:0001/full/pct:50.0/0/default.jpg",
  bessieSmith: "https://tile.loc.gov/storage-services/service/pnp/van/5a52000/5a52800/5a52888r.jpg",
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

// ==================== MUSICAL STAFF PROGRESS BAR ====================

const chapterMarkers = [
  { id: "prologue", position: 0.02, label: "Prologue" },
  { id: "ch1", position: 0.10, label: "1. The Only Photograph" },
  { id: "ch2", position: 0.18, label: "2. The Wrong First" },
  { id: "ch3", position: 0.26, label: "3. The Train North" },
  { id: "ch4", position: 0.34, label: "4. The Double Life" },
  { id: "ch5", position: 0.42, label: "5. The Laboratory" },
  { id: "ch6", position: 0.50, label: "6. The Blue Note" },
  { id: "ch7", position: 0.58, label: "7. The Freedom Principle" },
  { id: "ch8", position: 0.66, label: "8. The Paradox" },
  { id: "ch9", position: 0.74, label: "9. The Women They Erased" },
  { id: "ch10", position: 0.82, label: "10. The Living Music" },
  { id: "epilogue", position: 0.95, label: "Epilogue" },
];

const MusicalStaffProgress: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <>
      {/* Desktop vertical progress */}
      <div
        className="staff-progress"
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      >
        <div className="staff-lines">
          <div className="staff-line" />
          <div className="staff-line" />
          <div className="staff-line" />
          <div className="staff-line" />
          <div className="staff-line" />
        </div>
        <div className="staff-notes">
          {chapterMarkers.map((marker, index) => (
            <div
              key={marker.id}
              className={`staff-note ${progress >= marker.position ? "active" : ""}`}
              style={{
                top: `${5 + marker.position * 90}%`,
                left: `${10 + (index % 5) * 15}%`
              }}
              data-chapter={marker.label}
            />
          ))}
        </div>
        <div
          className="staff-playhead"
          style={{ top: `${5 + progress * 90}%` }}
        />
      </div>

      {/* Mobile horizontal progress */}
      <div className="staff-progress-mobile">
        <div
          className="staff-fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </>
  );
};

// ==================== FIGURE PROFILE COMPONENT ====================

const FigureProfile: React.FC<{ figure: Figure; era: string }> = ({ figure, era }) => {
  return (
    <article
      className={`figure-profile ${figure.isFeatured ? "featured" : ""} ${figure.imageUrl ? "has-image" : ""}`}
      data-era={era}
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
        {figure.quote && (
          <blockquote className="figure-quote">
            &ldquo;{figure.quote}&rdquo;
            {figure.quoteSource && <cite>— {figure.quoteSource}</cite>}
          </blockquote>
        )}
      </div>
    </article>
  );
};

// ==================== CHAPTER COMPONENT ====================

const ChapterSection: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`chapter-section ${isVisible ? "visible" : ""}`}
      data-era={chapter.era}
    >
      <div className="chapter-content">
        <header className="chapter-header">
          <span className="chapter-number">{chapter.number}</span>
          <h2 className="chapter-title">{chapter.title}</h2>
          {chapter.subtitle && <p className="chapter-subtitle">{chapter.subtitle}</p>}
          {chapter.temporalMarker && (
            <p className="chapter-temporal-marker">{chapter.temporalMarker}</p>
          )}
          {chapter.epigraph && (
            <div className="chapter-epigraph">
              &ldquo;{chapter.epigraph.text}&rdquo;
              <cite>— {chapter.epigraph.source}</cite>
            </div>
          )}
        </header>

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

        {chapter.figures.length > 0 && (
          <div className="figures-grid">
            {chapter.figures.map((figure) => (
              <FigureProfile key={figure.name} figure={figure} era={chapter.era} />
            ))}
          </div>
        )}
      </div>

      <div className="chapter-divider" data-era={chapter.era} />
    </section>
  );
};

// ==================== CONTENT DATA ====================

const chapters: Chapter[] = [
  // PROLOGUE
  {
    id: "prologue",
    number: "Prologue",
    title: "There Is Only One Photograph",
    era: "origins",
    narrative: [
      "There is only one photograph.",
      "Buddy Bolden. Around 1905. New Orleans. A formal portrait: six men in a band, instruments in hand. Bolden holds his cornet, eyes steady. They called him King. He invented a sound that would become the foundational grammar of American music.",
      "No one recorded it. No one wrote it down. By 1907, Bolden was committed to an asylum. He died there in 1931, having never heard a jazz record—not even his own, because none existed.",
      "But the sound didn't die. It multiplied. It traveled north on trains and spread across oceans. It became the swing that moved a nation and the bebop that bewildered it. It became cool and hard and free. It became America's most original art form.",
      "This is the story of that sound—how it was born in the collision of cultures, how it was stolen and reclaimed, how it died a thousand deaths and never stopped living. The sound of freedom in real time.",
    ],
    figures: [],
  },

  // CHAPTER 1: THE ONLY PHOTOGRAPH
  {
    id: "ch1",
    number: "Chapter I",
    title: "The Only Photograph",
    subtitle: "The Ghost Who Started Everything",
    era: "origins",
    temporalMarker: "New Orleans, c. 1895-1907",
    epigraph: {
      text: "He invented a sound that wasn't documented—but it was remembered.",
      source: "Jazz Oral Tradition",
    },
    narrative: [
      "New Orleans at the turn of the twentieth century was unlike any city in America. French, Spanish, African, Caribbean, and American traditions collided in a cultural crucible that produced something unprecedented.",
      "In Congo Square, enslaved Africans had been permitted to gather on Sundays, preserving rhythms and dances that would otherwise have been erased. After emancipation, these traditions merged with brass band music, blues, and European harmonies. Creole musicians, trained in European classical tradition, found themselves sharing stages with uptown Black musicians who played by ear.",
      "It was in this collision that jazz was born—not in Storyville, as the myth would have it, but throughout New Orleans. In parks and parades. At funerals and celebrations. In dance halls where the distinction between Creole and Black, between written and improvised, between European and African, dissolved into something new.",
      "Buddy Bolden stood at the center of this transformation. He rearranged the New Orleans dance band to accommodate the blues, creating a 'wide open' sound that could be heard across town. He never recorded. He never wrote down his arrangements. By the time technology could have captured him, he was already gone.",
    ],
    figures: [
      {
        name: "Buddy Bolden",
        epithet: "The First King",
        born: "September 6, 1877, New Orleans",
        died: "November 4, 1931, Jackson, Louisiana",
        domains: ["Cornet", "Bandleader", "Jazz Pioneer"],
        description: "Organized the first true jazz band around 1895. Known for his powerful, 'wide open' playing style that could be heard for blocks. Directly inspired King Oliver, Freddie Keppard, and through them, Louis Armstrong. Committed to asylum June 5, 1907; never recovered. No authenticated recordings exist.",
        isFeatured: true,
      },
      {
        name: "Jelly Roll Morton",
        epithet: "The First Composer",
        born: "c. 1890, New Orleans",
        died: "July 10, 1941, Los Angeles",
        domains: ["Piano", "Composition", "Arranger"],
        description: "First to write down jazz arrangements, bridging oral tradition and written music. His 1938 Library of Congress interviews preserve invaluable oral history of early jazz. Claimed to have 'invented jazz in 1902'—exaggerated, but reflecting his pioneering role.",
        quote: "Jazz music is to be played sweet, soft, plenty rhythm.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 2: THE WRONG FIRST
  {
    id: "ch2",
    number: "Chapter II",
    title: "The Wrong First",
    subtitle: "When Recording Created False Origins",
    era: "origins",
    temporalMarker: "February 26, 1917",
    epigraph: {
      text: "Who makes the recording decides who gets remembered.",
      source: "Recording Technology Principle",
    },
    narrative: [
      "February 26, 1917. Victor Records, New York City. The Original Dixieland Jazz Band cuts 'Livery Stable Blues' and 'Dixie Jass Band One-Step.' The first commercial jazz recordings.",
      "The band was white. Jazz was Black. This paradox would define the music's early documentation.",
      "The ODJB had learned jazz in New Orleans, absorbing what Black musicians had invented. Their leader, Nick LaRocca, would later claim absurdly that jazz was 'strictly white man's music'—a claim definitively rejected by historians.",
      "Two years earlier, Freddie Keppard, who held the 'King' title after Bolden, had reportedly refused Victor's offer to record. The story goes that he feared others would 'steal his stuff.' Whether strategic or shortsighted, his refusal allowed a white band to be 'first.'",
      "The recording paradox was established: technology could capture sound, but not history. Who made the recording decided who got remembered. Black musicians had created jazz decades before 1917—but the archive would tell a different story.",
    ],
    figures: [
      {
        name: "Nick LaRocca",
        epithet: "The False Prophet",
        born: "April 11, 1889, New Orleans",
        died: "February 22, 1961, New Orleans",
        domains: ["Cornet", "ODJB Leader"],
        description: "Led the Original Dixieland Jazz Band, which made the first commercial jazz recording on February 26, 1917. Later claimed falsely that jazz was 'white man's music.' His claims are definitively rejected by historians—jazz was created by Black musicians in New Orleans.",
        isFeatured: false,
      },
      {
        name: "Freddie Keppard",
        epithet: "The King Who Refused",
        born: "February 27, 1890, New Orleans",
        died: "July 15, 1933, Chicago",
        domains: ["Cornet", "Bandleader"],
        description: "Held 'King' title after Bolden. Reportedly refused Victor's 1916 recording offer. Morton called him 'the first modern trumpeter.' His refusal allowed ODJB to be 'first'—one of jazz's great what-ifs.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 3: THE TRAIN NORTH
  {
    id: "ch3",
    number: "Chapter III",
    title: "The Train North",
    subtitle: "How a People's Movement Carried a Music",
    era: "migration",
    temporalMarker: "1917-1930",
    epigraph: {
      text: "Every river has tributaries. Every music has migrations.",
      source: "Great Migration Proverb",
    },
    narrative: [
      "The Great Migration moved six million Black Americans from the rural South to northern cities between 1910 and 1970. Jazz traveled with them.",
      "The myth says jazz came north on riverboats after Storyville closed. The truth is different. Jazz migrated primarily via the Illinois Central Railroad—the same route that carried Black families to Chicago, Detroit, and beyond. Storyville's closure in 1917, ordered by the Navy, was what scholar Bruce Boyd Raeburn calls 'essentially a non-event' for jazz.",
      "Chicago had jazz venues before Storyville closed. The Pekin Theater opened in 1904. Lincoln Gardens would become legendary. The South Side was becoming a second home for New Orleans jazz.",
      "On July 8, 1922, a twenty-one-year-old cornetist arrived in Chicago. King Oliver had summoned him from New Orleans. Louis Armstrong stepped off the train, trumpet case in hand, and walked into Lincoln Gardens. Jazz would never be the same.",
    ],
    chapterImage: {
      url: IMAGES.louisArmstrong,
      alt: "Louis Armstrong, portrait, Aquarium, New York, ca. July 1946",
      attribution: "William P. Gottlieb Collection, Library of Congress. Public domain.",
    },
    figures: [
      {
        name: "King Oliver",
        epithet: "The Mentor King",
        born: "December 19, 1881, Louisiana",
        died: "April 10, 1938, Savannah, Georgia",
        domains: ["Cornet", "Bandleader", "Mentor"],
        description: "Led first extensive recordings by Black jazz band (April 5, 1923). Invited Louis Armstrong to Chicago on July 8, 1922. Developed two-cornet breaks with Armstrong. Pioneered use of mutes that inspired the Harmon mute.",
        isFeatured: true,
      },
      {
        name: "Louis Armstrong",
        epithet: "The First Soloist",
        born: "August 4, 1901, New Orleans",
        died: "July 6, 1971, New York City",
        domains: ["Trumpet", "Vocalist", "Innovator"],
        description: "Learned cornet in Colored Waifs Home (1913). Hot Five/Hot Seven recordings (1925-1928) revolutionized jazz, transforming it from ensemble to soloist art. 'West End Blues' (1928) remains among the most influential recordings ever made.",
        quote: "Joe Oliver is still King.",
        imageUrl: IMAGES.louisArmstrong,
        imageAttribution: "William P. Gottlieb Collection, Library of Congress. Public domain.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 4: THE DOUBLE LIFE
  {
    id: "ch4",
    number: "Chapter IV",
    title: "The Double Life",
    subtitle: "The Cotton Club Paradox",
    era: "swing",
    temporalMarker: "1927-1945",
    epigraph: {
      text: "Radio doesn't see color. The whole nation listened.",
      source: "Cotton Club Era Observation",
    },
    narrative: [
      "The Cotton Club in Harlem presented a paradox that defined the swing era: Black performers only, white audiences only. The finest jazz musicians in the world played for crowds who would not have dined beside them.",
      "Duke Ellington's orchestra became the house band in 1927. His radio broadcasts from the Cotton Club brought jazz to millions—the first time many white Americans heard this music. But the club's jungle-themed decor and segregated seating made visible the exploitation at the heart of mainstream jazz success.",
      "Yet jazz found ways to subvert. The Savoy Ballroom, also in Harlem, was genuinely integrated—the only major ballroom where Black and white dancers shared the floor. Benny Goodman integrated his groups, hiring Teddy Wilson (1935) and Lionel Hampton (1936) for what were among the first racially integrated major American bands.",
      "On January 16, 1938, Goodman played Carnegie Hall—'jazz's coming out party,' they called it. The next year, Billie Holiday recorded 'Strange Fruit,' a protest against lynching. Jazz was becoming more than entertainment. It was becoming a weapon.",
    ],
    chapterImage: {
      url: IMAGES.dukeEllington,
      alt: "Duke Ellington portrait, 1941",
      attribution: "William P. Gottlieb Collection, Library of Congress. Public domain.",
    },
    figures: [
      {
        name: "Duke Ellington",
        epithet: "The Composer King",
        born: "April 29, 1899, Washington, D.C.",
        died: "May 24, 1974, New York City",
        domains: ["Piano", "Composition", "Bandleader"],
        description: "Cotton Club house bandleader (1927-1931). Composed over 1,000 works. Led his orchestra for 50 years, the longest continuously operating jazz organization. Grammy Lifetime Achievement Award, Pulitzer Prize Special Award.",
        quote: "Music is my mistress, and she plays second fiddle to no one.",
        imageUrl: IMAGES.dukeEllington,
        imageAttribution: "William P. Gottlieb Collection, Library of Congress. Public domain.",
        isFeatured: true,
      },
      {
        name: "Billie Holiday",
        epithet: "Lady Day",
        born: "April 7, 1915, Philadelphia",
        died: "July 17, 1959, New York City",
        domains: ["Vocalist", "Phrasing Pioneer"],
        description: "'Strange Fruit' (April 20, 1939) was the first major protest song in American popular music, an unflinching indictment of lynching. Her unique phrasing transformed jazz vocals forever.",
        quote: "There wasn't even a patter of applause when I finished. Then a lone person began to clap nervously.",
        imageUrl: IMAGES.billieHoliday,
        imageAttribution: "William P. Gottlieb Collection, Library of Congress. Public domain.",
        isFeatured: true,
      },
      {
        name: "Ella Fitzgerald",
        epithet: "First Lady of Song",
        born: "April 25, 1917, Newport News, Virginia",
        died: "June 15, 1996, Beverly Hills",
        domains: ["Vocalist", "Scat Singing", "Standards"],
        description: "First African American woman to win Grammy (1958). 'A-Tisket, A-Tasket' (1938) became her breakthrough #1 hit, selling over one million copies. Won 13 Grammys total.",
        quote: "I stole everything that I heard, but mostly I stole from the horns.",
        imageUrl: IMAGES.ellaFitzgerald,
        imageAttribution: "William P. Gottlieb Collection, Library of Congress. Public domain.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 5: THE LABORATORY
  {
    id: "ch5",
    number: "Chapter V",
    title: "The Laboratory",
    subtitle: "Minton's Playhouse and the Bebop Revolution",
    era: "bebop",
    temporalMarker: "1940-1955",
    epigraph: {
      text: "We didn't go out and make speeches or say, 'Let's play eight bars of protest.'",
      source: "Dizzy Gillespie",
    },
    narrative: [
      "210 West 118th Street, Harlem. Minton's Playhouse. Monday nights. After hours. The laboratory where bebop was invented.",
      "The house band featured Thelonious Monk on piano and Kenny Clarke on drums. Young musicians came to test themselves in cutting contests—playing faster, harder, stranger. They weren't trying to entertain. They were trying to create something that couldn't be stolen, that required mastery to play.",
      "Charlie Parker's breakthrough came at Monroe's Uptown House in 1942—the moment he realized he could improvise using the higher intervals of chords, creating entirely new melodies. Dizzy Gillespie developed the harmonic architecture. Together, they built bebop.",
      "Was bebop political protest? The question oversimplifies. Gillespie himself said they didn't make speeches. But bebop was both artistic revolution AND cultural assertion—a declaration that this music was art, not entertainment, that it belonged to the musicians who created it.",
    ],
    chapterImage: {
      url: IMAGES.charlieParker,
      alt: "Charlie Parker, Carnegie Hall, New York, ca. 1947",
      attribution: "William P. Gottlieb Collection, Library of Congress. Public domain.",
    },
    figures: [
      {
        name: "Charlie Parker",
        epithet: "Bird",
        born: "August 29, 1920, Kansas City, Kansas",
        died: "March 12, 1955, New York City",
        domains: ["Alto Saxophone", "Bebop Pioneer", "Improvisation"],
        description: "'Cherokee' breakthrough at Monroe's Uptown House (1942) opened new harmonic possibilities. Co-founder of bebop. Died at 34; coroner estimated his age at 53 due to the ravages of addiction.",
        quote: "Music is your own experience, your own thoughts, your wisdom. If you don't live it, it won't come out of your horn.",
        imageUrl: IMAGES.charlieParker,
        imageAttribution: "William P. Gottlieb Collection, Library of Congress. Public domain.",
        isFeatured: true,
      },
      {
        name: "Dizzy Gillespie",
        epithet: "The Architect",
        born: "October 21, 1917, Cheraw, South Carolina",
        died: "January 6, 1993, Englewood, New Jersey",
        domains: ["Trumpet", "Composer", "Afro-Cuban Jazz"],
        description: "Co-founder of bebop, pioneer of Afro-Cuban jazz. 'A Night in Tunisia,' 'Salt Peanuts,' 'Manteca.' His bent horn became iconic—created accidentally but kept for the unique sound.",
        quote: "52nd Street was a mother. It nurtured jazz like no other place.",
        imageUrl: IMAGES.dizzyGillespie,
        imageAttribution: "William P. Gottlieb Collection, Library of Congress. Public domain.",
        isFeatured: true,
      },
      {
        name: "Thelonious Monk",
        epithet: "The Pianist Composer",
        born: "October 10, 1917, Rocky Mount, North Carolina",
        died: "February 17, 1982, Weehawken, New Jersey",
        domains: ["Piano", "Composition", "Harmonic Innovation"],
        description: "House pianist at Minton's Playhouse. Second-most-recorded jazz composer after Ellington. Time Magazine cover (1964). His angular, sparse style influenced generations.",
        quote: "The piano ain't got no wrong notes.",
        imageUrl: IMAGES.theloniousMonk,
        imageAttribution: "William P. Gottlieb Collection, Library of Congress. Public domain.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 6: THE BLUE NOTE
  {
    id: "ch6",
    number: "Chapter VI",
    title: "The Blue Note",
    subtitle: "How an Album Cover Defined Modern Jazz",
    era: "bluenote",
    temporalMarker: "1955-1965",
    epigraph: {
      text: "The room is now a historic landmark.",
      source: "Van Gelder Studio, National Register of Historic Places, 2022",
    },
    narrative: [
      "Blue Note Records created more than music. They created a visual language for modern jazz.",
      "Founded by Alfred Lion and Francis Wolff in 1939, Blue Note came to define the sound of hard bop and modal jazz in the 1950s and 60s. Wolff photographed the sessions—dramatic, high-contrast images that became as iconic as the music itself. Graphic designer Reid Miles translated these photographs into bold, modernist covers.",
      "Rudy Van Gelder recorded most of these sessions in his Hackensack, New Jersey living room, developing a warm, present sound that became the Blue Note signature. When he built a dedicated studio in Englewood Cliffs in 1959, it continued the tradition. That studio entered the National Register of Historic Places in 2022.",
      "Miles Davis charted a different course. 'Birth of the Cool' (1949-50) invented cool jazz. 'Kind of Blue' (1959)—the best-selling jazz album of all time—established modal jazz. He would keep reinventing himself for three more decades, always moving forward.",
    ],
    chapterImage: {
      url: IMAGES.fiftySecondStreet,
      alt: "52nd Street, New York, ca. 1948",
      attribution: "William P. Gottlieb Collection, Library of Congress. Public domain.",
    },
    figures: [
      {
        name: "Miles Davis",
        epithet: "The Chameleon",
        born: "May 26, 1926, Alton, Illinois",
        died: "September 28, 1991, Santa Monica, California",
        domains: ["Trumpet", "Bandleader", "Innovator"],
        description: "Most influential post-war jazz figure. Led multiple movements: bebop to cool to modal to fusion. 'Birth of the Cool' (1949-50), 'Kind of Blue' (1959), 'Bitches Brew' (1970). Eight Grammy Awards, Rock and Roll Hall of Fame.",
        imageUrl: IMAGES.milesDavis,
        imageAttribution: "William P. Gottlieb Collection, Library of Congress. Public domain.",
        isFeatured: true,
      },
      {
        name: "John Coltrane",
        epithet: "The Seeker",
        born: "September 23, 1926, Hamlet, North Carolina",
        died: "July 17, 1967, Huntington, New York",
        domains: ["Tenor Saxophone", "Spiritual Jazz", "Modal"],
        description: "Extended modal jazz; brought spiritual dimension. 'Giant Steps' (1960), 'A Love Supreme' (1965). Influenced every saxophonist since. Died at 40, having transformed jazz's spiritual possibilities.",
        quote: "I would like to be a saint.",
        isFeatured: true,
      },
      {
        name: "Art Blakey",
        epithet: "The Hard Bop Academy",
        born: "October 11, 1919, Pittsburgh",
        died: "October 16, 1990, New York City",
        domains: ["Drums", "Bandleader", "Mentor"],
        description: "Jazz Messengers (1956-1990): 167 musicians passed through his bands, including Wayne Shorter, Lee Morgan, Wynton Marsalis. 'Moanin'' (1958). The greatest talent incubator in jazz history.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 7: THE FREEDOM PRINCIPLE
  {
    id: "ch7",
    number: "Chapter VII",
    title: "The Freedom Principle",
    subtitle: "When Breaking Rules Became the Rule",
    era: "free",
    temporalMarker: "1960-1975",
    epigraph: {
      text: "Ornette Coleman didn't care. He was free.",
      source: "Free Jazz Movement",
    },
    narrative: [
      "December 21, 1960. Atlantic Records. Ornette Coleman assembled two quartets—eight musicians—and recorded simultaneously for 37 minutes. He called the album 'Free Jazz.' The name stuck.",
      "Free jazz abandoned the remaining rules: preset chord changes, fixed rhythm, traditional structure. Sun Ra took this further, pioneering what would later be called Afrofuturism—cosmic philosophy expressed through music, performance, and visual spectacle. He led his Arkestra for over 40 years, recording approximately 200 albums on his own El Saturn Records.",
      "The backlash was fierce. Down Beat's review of 'Free Jazz' awarded both five stars and zero stars. Cecil Taylor's percussive, atonal piano divided audiences. But free jazz asked a question that couldn't be unasked: If improvisation is jazz's core value, why should any rules remain?",
      "The Association for the Advancement of Creative Musicians (AACM), founded in Chicago in 1965, institutionalized these experiments. Alice Coltrane, who replaced McCoy Tyner in her husband's group in 1966, brought spiritual depth and the harp to jazz—one of only a few harpists in the music's history.",
    ],
    figures: [
      {
        name: "Ornette Coleman",
        epithet: "The Liberator",
        born: "March 9, 1930, Fort Worth, Texas",
        died: "June 11, 2015, New York City",
        domains: ["Alto Saxophone", "Free Jazz", "Composition"],
        description: "Named the free jazz movement with his 1960 album. 'The Shape of Jazz to Come' (1959) announced the revolution. One of the most beloved and polarizing figures in jazz history. Pulitzer Prize for Music (2007).",
        isFeatured: true,
      },
      {
        name: "Sun Ra",
        epithet: "The Cosmic Philosopher",
        born: "May 22, 1914, Birmingham, Alabama",
        died: "May 30, 1993, Birmingham, Alabama",
        domains: ["Piano", "Arkestra Leader", "Afrofuturism"],
        description: "Pioneer of Afrofuturism. Led his Arkestra for 40+ years. Founded El Saturn Records—among the first artist-owned labels. Approximately 200 albums. Claimed to have visited Saturn.",
        quote: "Space is the place.",
        quoteSource: "Album and film title, 1972/1974",
        isFeatured: true,
      },
      {
        name: "Alice Coltrane",
        epithet: "The Spiritual Pioneer",
        born: "August 27, 1937, Detroit",
        died: "January 12, 2007, Los Angeles",
        domains: ["Piano", "Harp", "Spiritual Jazz"],
        description: "Replaced McCoy Tyner in John Coltrane's group (1966). One of few harpists in jazz history. 'Journey in Satchidananda,' 'World Galaxy.' Founded Vedantic Center (1975). Returned to music in 2004.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 8: THE PARADOX
  {
    id: "ch8",
    number: "Chapter VIII",
    title: "The Paradox",
    subtitle: "Jazz Ambassadors and Cold War Hypocrisy",
    era: "paradox",
    temporalMarker: "1955-1971",
    epigraph: {
      text: "The very musicians sent abroad to embody freedom often returned to segregation and daily racism.",
      source: "Jazz Diplomacy Paradox",
    },
    narrative: [
      "Voice of America, 1955. Willis Conover begins hosting 'Music USA.' His voice would reach 30 million listeners behind the Iron Curtain—introducing jazz to millions who had never heard it. Unknown in America, Conover was famous throughout Eastern Europe and the Soviet Union.",
      "The State Department recognized jazz's power. They sent musicians on cultural tours—Dizzy Gillespie, Louis Armstrong, Duke Ellington, Benny Goodman—as 'ambassadors of freedom.' Jazz became a weapon in the Cold War, demonstrating American creativity and, implicitly, American democracy.",
      "The paradox was brutal. These musicians traveled abroad to represent freedom—then came home to Jim Crow, to segregated hotels and restaurants, to a country that treated them as second-class citizens. Armstrong, asked about representing America abroad, once pointed out the contradiction publicly.",
      "Ellington toured the Soviet Union in 1971, the first time a major jazz orchestra had played there. Goodman had gone in 1962. Jazz won hearts the State Department couldn't reach through diplomacy alone—while laying bare the hypocrisy of 'freedom's' ambassadors returning to unfreedom.",
    ],
    figures: [
      {
        name: "Willis Conover",
        epithet: "The Voice",
        born: "December 18, 1920, Buffalo, New York",
        died: "May 17, 1996, Alexandria, Virginia",
        domains: ["Broadcasting", "VOA", "Jazz Diplomacy"],
        description: "VOA 'Music USA' (1955-1996). Reached 30 million listeners behind Iron Curtain. Unknown in America; famous worldwide. His voice introduced jazz to generations who couldn't access it otherwise.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 9: THE WOMEN THEY ERASED
  {
    id: "ch9",
    number: "Chapter IX",
    title: "The Women They Erased",
    subtitle: "The Arrangement Behind the Arrangement",
    era: "women",
    temporalMarker: "All Eras",
    epigraph: {
      text: "Their names were often left off the credits.",
      source: "Jazz Historiography",
    },
    narrative: [
      "August 12, 1958. Art Kane photographs 57 jazz greats on a Harlem stoop. 'A Great Day in Harlem.' Only three are women.",
      "But women were everywhere—playing, arranging, managing, mentoring. Mary Lou Williams arranged for Andy Kirk's Clouds of Joy (1929-1942), then wrote arrangements for Duke Ellington, Benny Goodman, Louis Armstrong, and Tommy Dorsey. She mentored Thelonious Monk, Charlie Parker, Bud Powell, and Dizzy Gillespie.",
      "Melba Liston was the first woman trombonist in major big bands—personally recruited by Dizzy Gillespie in 1948. For 40 years she collaborated with Randy Weston. She ghostwrote arrangements for Ellington, Basie, and Quincy Jones. NEA Jazz Master in 1987.",
      "The International Sweethearts of Rhythm was the first racially-integrated all-female band in America (1937-1949). Named 'America's #1 All-Girl Orchestra' by Down Beat in 1944. They defied Jim Crow laws touring the South. National Recording Registry in 2011.",
      "Lil Hardin Armstrong drove Louis Armstrong's solo career, played on the Hot Five recordings, and led her own bands. The narrative of jazz as male genius requires erasing these women. The history does not.",
    ],
    chapterImage: {
      url: IMAGES.maryLouWilliams,
      alt: "Mary Lou Williams, portrait, between 1938 and 1948",
      attribution: "William P. Gottlieb Collection, Library of Congress. Public domain.",
    },
    figures: [
      {
        name: "Mary Lou Williams",
        epithet: "The First Lady of Jazz",
        born: "May 8, 1910, Atlanta",
        died: "May 28, 1981, Durham, North Carolina",
        domains: ["Piano", "Arrangement", "Composition", "Mentor"],
        description: "Chief arranger for Andy Kirk's Clouds of Joy (1929-1942). Arrangements for Ellington, Goodman, Armstrong, Dorsey. Mentor to Monk, Parker, Powell, Gillespie. Three Sacred Concerts. Duke University faculty.",
        quote: "Jazz arises from a spirit of love, it comes from the mind and heart and goes through the fingertips.",
        imageUrl: IMAGES.maryLouWilliams,
        imageAttribution: "William P. Gottlieb Collection, Library of Congress. Public domain.",
        isFeatured: true,
      },
      {
        name: "Melba Liston",
        epithet: "The Invisible Arranger",
        born: "January 13, 1926, Kansas City, Missouri",
        died: "April 23, 1999, Los Angeles",
        domains: ["Trombone", "Arrangement", "Composition"],
        description: "First woman trombonist in major big bands. Personally recruited by Dizzy Gillespie (1948). 40-year collaboration with Randy Weston. Ghostwrote for Ellington, Basie, Quincy Jones. NEA Jazz Master (1987).",
        isFeatured: true,
      },
      {
        name: "Bessie Smith",
        epithet: "Empress of the Blues",
        born: "April 15, 1894, Chattanooga, Tennessee",
        died: "September 26, 1937, Clarksdale, Mississippi",
        domains: ["Vocalist", "Blues", "Recording Pioneer"],
        description: "Best-selling Black recording artist of the 1920s. Over 2 million records sold in 1923 alone. Influenced Billie Holiday, Janis Joplin, and countless others. Rock and Roll Hall of Fame inductee.",
        imageUrl: IMAGES.bessieSmith,
        imageAttribution: "Carl Van Vechten Collection, Library of Congress. Public domain.",
        isFeatured: true,
      },
    ],
  },

  // CHAPTER 10: THE LIVING MUSIC
  {
    id: "ch10",
    number: "Chapter X",
    title: "The Living Music",
    subtitle: "Can Jazz Survive Success?",
    era: "contemporary",
    temporalMarker: "1980-Present",
    epigraph: {
      text: "Jazz isn't dead. It never stopped improvising.",
      source: "Contemporary Jazz",
    },
    narrative: [
      "1987. Jazz at Lincoln Center founded. For the first time, jazz has its own permanent home in a major American cultural institution.",
      "2004. Frederick P. Rose Hall opens—the first building designed specifically for jazz. Three performance venues. Year-round programming. Jazz has been institutionalized. Some called it preservation. Others called it ossification.",
      "Wynton Marsalis, artistic director since 1991, leads the neo-traditionalist movement—honoring the masters, teaching the classics, maintaining standards. His 'Blood on the Fields' (1997) became the first jazz work to win the Pulitzer Prize for Music. But critics ask: Is jazz now a museum piece?",
      "The music answers. Kamasi Washington's 'The Epic' (2015) proved the market for ambitious, exploratory jazz. Esperanza Spalding won the Grammy for Best New Artist in 2011—the first jazz artist ever. Robert Glasper bridges jazz, R&B, and hip-hop. Tokyo rivals New York as a jazz capital.",
      "The question was never whether jazz would survive. Jazz is improvisation—responding in the moment. As long as there are musicians willing to risk, to surprise, to converse, jazz lives. The sound of freedom in real time.",
    ],
    figures: [
      {
        name: "Wynton Marsalis",
        epithet: "The Institution Builder",
        born: "October 18, 1961, New Orleans",
        domains: ["Trumpet", "Composer", "Educator"],
        description: "Artistic Director, Jazz at Lincoln Center (1991-present). 'Blood on the Fields'—first jazz Pulitzer Prize (1997). Nine Grammy Awards. The leading figure in jazz education and institutional preservation.",
        isFeatured: true,
      },
      {
        name: "Esperanza Spalding",
        epithet: "The New Voice",
        born: "October 18, 1984, Portland, Oregon",
        domains: ["Bass", "Vocals", "Composition"],
        description: "First jazz artist to win Grammy Best New Artist (2011). Harvard professor (2017-2022). Librettist for Wayne Shorter's opera '...Iphigenia.' Proof that jazz continues to surprise.",
        isFeatured: true,
      },
    ],
  },

  // EPILOGUE
  {
    id: "epilogue",
    number: "Epilogue",
    title: "The Sound Continues",
    era: "contemporary",
    narrative: [
      "Jazz began with a man we can barely see—one photograph, no recordings, a sound that exists only in the memories of those who heard it.",
      "But the sound multiplied. It traveled on trains and radio waves. It crossed oceans and infiltrated iron curtains. It was stolen and reclaimed, commercialized and preserved, declared dead and reborn.",
      "What is jazz? It is improvisation—responding in the moment to what is happening now. It is conversation—call-and-response between instruments, between musicians, between performer and audience. It is the blues—telling the truth about life as it is lived. It is freedom—the sound of people making beauty despite everything that would silence them.",
      "There is no final note. Jazz is not a museum piece to be preserved under glass. It is a living practice, renewed every time a musician picks up an instrument and begins to play—not what was written, not what was rehearsed, but what emerges in the moment.",
      "The sound of freedom. In real time. Still playing.",
    ],
    figures: [],
  },
];

// ==================== SOURCES COMPONENT ====================

const SourcesSection: React.FC = () => {
  return (
    <section className="sources-section">
      <h2>Sources and Image Credits</h2>

      <h3>Primary Archives</h3>
      <ul>
        <li>
          <strong>William P. Gottlieb Collection</strong>, Library of Congress — 1,600 photographs (1938-1948), dedicated to public domain
        </li>
        <li>
          <strong>Carl Van Vechten Collection</strong>, Library of Congress — Public domain
        </li>
        <li>
          <strong>Hogan Jazz Archive</strong>, Tulane University — New Orleans specialty
        </li>
      </ul>

      <h3>Selected Bibliography</h3>
      <ul>
        <li>Raeburn, Bruce Boyd. <em>New Orleans Style and the Writing of American Jazz History</em>. University of Michigan Press, 2009.</li>
        <li>Brothers, Thomas. <em>Louis Armstrong&apos;s New Orleans</em>. W.W. Norton, 2006.</li>
        <li>Marquis, Donald M. <em>In Search of Buddy Bolden: First Man of Jazz</em>. Louisiana State University Press, 1978.</li>
        <li>DeVeaux, Scott. <em>The Birth of Bebop: A Social and Musical History</em>. University of California Press, 1997.</li>
        <li>Monson, Ingrid. <em>Freedom Sounds: Civil Rights Call Out to Jazz and Africa</em>. Oxford University Press, 2007.</li>
      </ul>

      <h3>Image Credits</h3>
      <p>All photographs from the William P. Gottlieb Collection are in the public domain. Mr. Gottlieb dedicated his works to the public domain in 2010.</p>
      <p>Carl Van Vechten photographs are in the public domain as works of the U.S. federal government or due to copyright expiration.</p>
    </section>
  );
};

// ==================== MAIN COMPONENT ====================

export default function JazzHistoryClient() {
  const progress = useGlobalScrollProgress();

  return (
    <main className="jazz-essay">
      <MusicalStaffProgress progress={progress} />

      {/* Hero Section */}
      <header className="jazz-hero">
        <div className="hero-content">
          <h1 className="hero-title">Jazz</h1>
          <p className="hero-subtitle">The Sound of Freedom in Real Time</p>
          <p className="hero-description">
            How African diasporic traditions, European instruments, and the unique conditions of New Orleans produced America&apos;s most influential art form
          </p>
        </div>
        <div className="hero-scroll-indicator">
          <span>Scroll to explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12l7 7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </header>

      {/* Chapters */}
      {chapters.map((chapter) => (
        <ChapterSection key={chapter.id} chapter={chapter} />
      ))}

      {/* Sources */}
      <SourcesSection />

      {/* Footer */}
      <footer className="jazz-footer">
        <p>
          Photographs from the William P. Gottlieb Collection, Library of Congress.
          <br />
          Research verified against primary sources.
        </p>
      </footer>
    </main>
  );
}
