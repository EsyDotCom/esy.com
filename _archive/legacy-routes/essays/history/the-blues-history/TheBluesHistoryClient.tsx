'use client';

import { useEffect, useRef, useState } from 'react';
import './the-blues-history.css';

interface FigureProfile {
  name: string;
  title?: string;
  dates?: string;
  role: string;
  bio: string[];
  quote?: { text: string; attribution?: string };
  imageUrl?: string;
  imageAlt?: string;
  imageAttribution?: string;
}

interface TimelineEvent {
  date: string;
  event: string;
}

// Figure Data from Research Package
const figures: Record<string, FigureProfile> = {
  wcHandy: {
    name: 'W.C. Handy',
    title: '"Father of the Blues"',
    dates: 'November 16, 1873 – March 28, 1958',
    role: 'Composer, bandleader',
    bio: [
      'W.C. Handy did not invent the blues—he codified and published an existing tradition for commercial consumption.',
      'In 1903, at a train station in Tutwiler, Mississippi, he heard a man playing guitar with a knife, sliding it across the strings. This encounter changed American music.',
      'His "Memphis Blues" (1912) and "St. Louis Blues" (1914) became the first commercially successful blues compositions.',
    ],
    quote: {
      text: 'The primitive Southern Negro, as he sang, was sure to bear down on the third and seventh tone of the scale, slurring between major and minor.',
      attribution: 'W.C. Handy',
    },
    imageUrl: 'https://images.esy.com/essays/the-blues-history/800px-w-c-handy-281941-van-vechten-portrait-29.5ea3f484bc.webp',
    imageAlt: 'W.C. Handy portrait by Carl Van Vechten, 1941',
    imageAttribution: 'Carl Van Vechten, 1941. Library of Congress. Public domain.',
  },
  charleyPatton: {
    name: 'Charley Patton',
    title: '"Father of the Delta Blues"',
    dates: 'c. April 1891 – April 28, 1934',
    role: 'Delta blues singer, guitarist',
    bio: [
      'Charley Patton lived and worked on Dockery Plantation from 1897, where he learned from Henry Sloan—the earliest documented Delta blues influence.',
      'Known for his showmanship, he played guitar behind his head and between his legs—decades before Hendrix.',
      'His voice reportedly carried 500 yards without amplification. He mentored Son House, Howlin\' Wolf, and Robert Johnson.',
    ],
    quote: {
      text: "Pony Blues",
      attribution: 'Added to National Recording Registry, 2006',
    },
    imageUrl: 'https://images.esy.com/essays/the-blues-history/800px-charley-patton-281929-photo-portrait-29.a34da1b44a.webp',
    imageAlt: 'Charley Patton portrait, c. 1929, Paramount Records publicity',
    imageAttribution: 'Paramount Records, c. 1929. Only known photograph of Patton. Public domain.',
  },
  bessieSmith: {
    name: 'Bessie Smith',
    title: '"Empress of the Blues"',
    dates: 'April 15, 1892 – September 26, 1937',
    role: 'Blues singer',
    bio: [
      'Orphaned young, Bessie Smith survived by street performing before meeting Ma Rainey around 1912.',
      'She became the most popular female blues singer of the 1930s and Columbia Records\' highest-paid Black artist.',
      'Her "Down-Hearted Blues" (1923) sold 780,000 copies in six months. She died in a car accident near Clarksdale, Mississippi.',
    ],
    quote: {
      text: "I ain't good-lookin', but I'm somebody's angel child.",
      attribution: 'Bessie Smith',
    },
    imageUrl: 'https://images.esy.com/essays/the-blues-history/800px-bessie-smith-281936-29-by-carl-van-vechten.2664b3ce68.webp',
    imageAlt: 'Bessie Smith portrait by Carl Van Vechten, 1936',
    imageAttribution: 'Carl Van Vechten, 1936. Library of Congress. Public domain.',
  },
  maRainey: {
    name: 'Ma Rainey',
    title: '"Mother of the Blues"',
    dates: 'April 26, 1886 – December 22, 1939',
    role: 'Blues singer, mentor',
    bio: [
      'Gertrude "Ma" Rainey began performing as a teenager on the tent show circuit.',
      'She recorded nearly 100 songs for Paramount Records between 1923 and 1928.',
      'Known for dramatic stage presence, gold teeth, and sequined gowns, she mentored Bessie Smith and shaped the classic blues era.',
    ],
    quote: {
      text: 'She claimed she "created the term \'blues\'" when asked what kind of song she was singing.',
    },
    imageUrl: 'https://images.esy.com/essays/the-blues-history/800px-ma-rainey-2c-1923.a82dd51822.webp',
    imageAlt: 'Ma Rainey theatrical portrait, c. 1923',
    imageAttribution: 'Studio portrait, c. 1923. Public domain.',
  },
  muddyWaters: {
    name: 'Muddy Waters',
    title: '"Father of Modern Chicago Blues"',
    dates: 'April 4, 1913 – April 30, 1983',
    role: 'Blues singer, guitarist',
    bio: [
      'McKinley Morganfield grew up on Stovall Plantation near Clarksdale, where Alan Lomax recorded him for the Library of Congress in 1941.',
      'He moved to Chicago in 1943 and bought his first electric guitar in 1944.',
      'At Chess Records, his band included Little Walter, Jimmy Rogers, and Willie Dixon. The Rolling Stones named themselves after his song.',
    ],
    quote: {
      text: "When I went into the clubs, the first thing I wanted was an amplifier. Couldn't nobody hear you with an acoustic.",
      attribution: 'Muddy Waters',
    },
    imageUrl: 'https://images.esy.com/essays/the-blues-history/800px-muddy-waters-28cropped-29.b8629c4ca4.webp',
    imageAlt: 'Muddy Waters performing, 1978, photo by Jean-Luc Ourlin',
    imageAttribution: 'Jean-Luc Ourlin, 1978. CC BY-SA 2.0.',
  },
  howlinWolf: {
    name: "Howlin' Wolf",
    title: 'Chicago Blues Legend',
    dates: 'June 10, 1910 – January 10, 1976',
    role: 'Blues singer, guitarist, harmonica player',
    bio: [
      'Chester Arthur Burnett stood 6\'3" and weighed nearly 300 pounds.',
      'He learned guitar from Charley Patton and harmonica from Sonny Boy Williamson II.',
      'Key songs include "Smokestack Lightnin\'," "Spoonful," "Killing Floor," and "Back Door Man."',
    ],
    quote: {
      text: "I couldn't do no yodelin', so I turned to howlin'. And it's done me just fine.",
      attribution: "Howlin' Wolf",
    },
    imageUrl: 'https://images.esy.com/essays/the-blues-history/howlin-wolf-1972.2d11c31fa9.webp',
    imageAlt: "Howlin' Wolf, 1972",
    imageAttribution: 'Photographer unknown, 1972. Wikimedia Commons. Public domain.',
  },
  robertJohnson: {
    name: 'Robert Johnson',
    title: 'Delta Blues Legend',
    dates: 'May 8, 1911 – August 16, 1938',
    role: 'Blues singer, guitarist',
    bio: [
      'Robert Johnson recorded only 29 songs in two sessions (1936-1937), yet became the most mythologized figure in blues history.',
      'The crossroads legend—that he sold his soul to the devil—originated from stories about Tommy Johnson (no relation).',
      'He studied Charley Patton and Son House carefully. His 1961 compilation sparked the blues revival.',
    ],
    quote: {
      text: 'I went to the crossroads, fell down on my knees...',
      attribution: '"Cross Road Blues"—a song about travel and desperation, not devil worship',
    },
  },
  bbKing: {
    name: 'B.B. King',
    title: '"King of the Blues"',
    dates: 'September 16, 1925 – May 14, 2015',
    role: 'Blues guitarist, singer',
    bio: [
      'Riley B. King was raised in the Mississippi Delta, cousin of Bukka White.',
      'He became a DJ at WDIA in Memphis, nicknamed "Blues Boy"—shortened to B.B.',
      '"The Thrill Is Gone" (1969) became his signature song. He won 15 Grammy Awards and the Presidential Medal of Freedom.',
    ],
    quote: {
      text: "The blues are three L's—living, loving, and hopefully laughing.",
      attribution: 'B.B. King',
    },
    imageUrl: 'https://images.esy.com/essays/the-blues-history/b-b-king-presidential-medal-of-freedom.c6b87050f0.webp',
    imageAlt: 'B.B. King receiving Presidential Medal of Freedom from George W. Bush, 2006',
    imageAttribution: 'White House photo, 2006. Public domain.',
  },
  willieDixon: {
    name: 'Willie Dixon',
    title: '"Poet Laureate of the Blues"',
    dates: 'July 1, 1915 – January 29, 1992',
    role: 'Songwriter, producer, bassist',
    bio: [
      'Willie Dixon was staff songwriter and producer at Chess Records from 1950-1965.',
      'He wrote over 500 songs including "Hoochie Coochie Man," "I Just Want to Make Love to You," and "Spoonful."',
      'He founded Blues Heaven Foundation to help exploited artists recover royalties.',
    ],
    quote: {
      text: 'The blues are the roots and the other musics are the fruits.',
      attribution: 'Willie Dixon',
    },
    imageUrl: 'https://images.esy.com/essays/the-blues-history/willie-dixon.0be4b80c98.webp',
    imageAlt: 'Willie Dixon at Monterey Jazz Festival, 1981, photo by Brianmcmillen',
    imageAttribution: 'Brian McMillen, 1981. CC BY-SA 3.0.',
  },
};

// Chapter Component
function Chapter({
  number,
  title,
  subtitle,
  era,
  children,
}: {
  number: string;
  title: string;
  subtitle?: string;
  era?: 'pre-recording' | 'classic' | 'depression' | 'chicago' | 'revival';
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`blues-chapter ${era ? `era-${era}` : ''} ${isVisible ? 'visible' : ''}`}
      data-era={era}
    >
      <div className="blues-chapter__number">{number}</div>
      <h2 className="blues-chapter__title">{title}</h2>
      {subtitle && <p className="blues-chapter__subtitle">{subtitle}</p>}
      <div className="blues-chapter__content">{children}</div>
    </section>
  );
}

// Figure Profile Component
function FigureCard({ figure }: { figure: FigureProfile }) {
  return (
    <div className="blues-figure">
      {figure.imageUrl && (
        <figure className="blues-figure__image-wrapper">
          <img
            src={figure.imageUrl}
            alt={figure.imageAlt || figure.name}
            className="blues-figure__image"
            loading="lazy"
          />
          {figure.imageAttribution && (
            <figcaption className="blues-figure__attribution">
              {figure.imageAttribution}
            </figcaption>
          )}
        </figure>
      )}
      <h3 className="blues-figure__name">{figure.name}</h3>
      {figure.title && <div className="blues-figure__title">{figure.title}</div>}
      {figure.dates && <div className="blues-figure__dates">{figure.dates}</div>}
      <div className="blues-figure__bio">
        {figure.bio.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      {figure.quote && (
        <blockquote>
          &ldquo;{figure.quote.text}&rdquo;
          {figure.quote.attribution && <cite>— {figure.quote.attribution}</cite>}
        </blockquote>
      )}
    </div>
  );
}

// Timeline Component
function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="blues-timeline">
      {events.map((event, i) => (
        <div key={i} className="blues-timeline__item">
          <div className="blues-timeline__date">{event.date}</div>
          <div className="blues-timeline__event">{event.event}</div>
        </div>
      ))}
    </div>
  );
}

// Quote Block Component
function Quote({
  text,
  attribution,
  source,
}: {
  text: string;
  attribution?: string;
  source?: string;
}) {
  return (
    <blockquote>
      &ldquo;{text}&rdquo;
      {(attribution || source) && (
        <cite>
          {attribution && `— ${attribution}`}
          {source && ` (${source})`}
        </cite>
      )}
    </blockquote>
  );
}

// Chapter data for progress bar
const CHAPTERS = [
  { id: 'prologue', label: 'Prologue', short: 'PRO' },
  { id: 'ch1', label: 'Before the Blues', short: '01' },
  { id: 'ch2', label: 'After Emancipation', short: '02' },
  { id: 'ch3', label: 'Regions & Styles', short: '03' },
  { id: 'ch4', label: 'Instruments', short: '04' },
  { id: 'ch5', label: 'Juke Joints', short: '05' },
  { id: 'ch6', label: 'Race Records', short: '06' },
  { id: 'ch7', label: 'Blues Queens', short: '07' },
  { id: 'ch8', label: 'Myth & Legend', short: '08' },
  { id: 'ch9', label: 'Great Migration', short: '09' },
  { id: 'ch10', label: 'Chicago Electric', short: '10' },
  { id: 'ch11', label: 'Crossovers', short: '11' },
  { id: 'ch12', label: 'Global Blues', short: '12' },
  { id: 'epilogue', label: 'Epilogue', short: 'END' },
];

// 78 RPM Record Progress Bar Component
function RecordProgressBar({ progress }: { progress: number }) {
  // Calculate needle angle (starts at -135deg, ends at -45deg as progress goes 0-1)
  const needleAngle = -135 + (progress * 90);

  return (
    <>
      {/* Desktop: Vertical record with needle */}
      <div
        className="blues-progress blues-progress--desktop"
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      >
        <div className="blues-progress__record">
          <div className="blues-progress__grooves" />
          <div className="blues-progress__label">
            <span className="blues-progress__label-text">BLUES</span>
          </div>
          <div
            className="blues-progress__needle"
            style={{ transform: `rotate(${needleAngle}deg)` }}
          />
        </div>
        <div className="blues-progress__tracks">
          {CHAPTERS.map((chapter, index) => {
            const chapterProgress = index / (CHAPTERS.length - 1);
            const isActive = progress >= chapterProgress - 0.02;
            const isCurrent = progress >= chapterProgress - 0.02 && progress < (index + 1) / (CHAPTERS.length - 1);
            return (
              <div
                key={chapter.id}
                className={`blues-progress__track ${isActive ? 'blues-progress__track--active' : ''} ${isCurrent ? 'blues-progress__track--current' : ''}`}
                title={chapter.label}
              >
                <span className="blues-progress__track-num">{chapter.short}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: Horizontal bar */}
      <div
        className="blues-progress blues-progress--mobile"
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      >
        <div
          className="blues-progress__fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </>
  );
}

// Main Client Component
export function TheBluesHistoryClient() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <article className="blues-essay">
      {/* Progress Bar */}
      <RecordProgressBar progress={scrollProgress} />

      {/* Hero Section */}
      <header className="blues-hero">
        <div className="blues-hero__image-container">
          <img
            src="https://images.esy.com/essays/the-blues-history/8c10917v.5e58fca1fc.webp"
            alt="Jitterbugging in a juke joint on Saturday evening, outside Clarksdale, Mississippi Delta, November 1939. Photo by Marion Post Wolcott for the Farm Security Administration."
            className="blues-hero__image"
          />
          <div className="blues-hero__overlay" />
          <figcaption className="blues-hero__attribution">
            Marion Post Wolcott, 1939. Library of Congress, FSA Collection. Public domain.
          </figcaption>
        </div>
        <div className="blues-hero__content">
          <p className="blues-hero__context">
            Somewhere in the American South. Sometime after 1865.
          </p>
          <h1 className="blues-hero__title">The Blues</h1>
          <p className="blues-hero__subtitle">America&apos;s Haunted Foundation</p>
          <p className="blues-hero__context">
            A Documentary Visual History
          </p>
        </div>
      </header>

      {/* Prologue */}
      <Chapter
        number="Prologue"
        title="A Note Bent Against the World"
        era="pre-recording"
      >
        <p>
          A single bent note hangs in the air. This is the blues: not a genre, but a feeling.
          A way of bending pitch that came from somewhere, from someone, from conditions so
          specific they cannot be separated from the music.
        </p>
        <p>
          The blues is not &ldquo;old.&rdquo; It is not &ldquo;primitive.&rdquo; It emerged in the decades after
          emancipation, when four million freed people found themselves with nothing—no land,
          no capital, no legal protection—in a South determined to re-enslave them through
          other means.
        </p>
        <p>
          The blues was their report, their resistance, their refusal.
        </p>
        <Quote
          text="The blues are the roots and the other musics are the fruits."
          attribution="Willie Dixon"
        />
        <p>
          This is a story about America. Every note of jazz, rock, R&B, soul, and hip-hop
          bends because the blues bent first. This is where it started.
        </p>
      </Chapter>

      {/* Chapter 1: Before the Blues Had a Name */}
      <Chapter
        number="Chapter 1"
        title="Before the Blues Had a Name"
        subtitle="African Roots and the Pre-Conditions (1619-1890s)"
        era="pre-recording"
      >
        <p>
          The blues synthesized several distinct African American musical traditions that
          developed during and after enslavement.
        </p>
        <p>
          <strong>African Elements:</strong> Bent notes (microtonality), call-and-response
          patterns, polyrhythmic structures, the emphasis on rhythm as carrier of meaning.
        </p>
        <p>
          <strong>Work Songs and Field Hollers:</strong> Created to &ldquo;lighten the load&rdquo; of
          forced labor, work songs used rhythm to coordinate movement. Field hollers were
          solo vocal expressions—one person crying out across a cotton field—that anticipated
          blues&apos; personal, emotional directness.
        </p>
        <p>
          <strong>Spirituals:</strong> Religious music that encoded double meanings—songs
          about crossing Jordan meant crossing to freedom.
        </p>
        <p>
          The blues emerged gradually between approximately 1870 and 1900, during the
          transition from slavery to sharecropping. No single &ldquo;inventor&rdquo; or birthplace
          can be definitively identified because blues existed as folk practice for
          decades before anyone documented it.
        </p>
        <Timeline
          events={[
            { date: '1619', event: 'First Africans arrive in English North America' },
            { date: '1700s-1800s', event: 'Development of work songs, field hollers, spirituals' },
            { date: '1865', event: 'End of Civil War / Emancipation' },
            { date: '1870s-1890s', event: 'Probable blues emergence' },
          ]}
        />
      </Chapter>

      {/* Chapter 2: The South After Emancipation */}
      <Chapter
        number="Chapter 2"
        title="The South After Emancipation"
        subtitle="Labor, Conditions, and the Birth of the Blues (1865-1920)"
        era="pre-recording"
      >
        <p>
          The blues emerged directly from post-emancipation economic oppression. Freed
          people had no land, capital, or tools. Sharecropping trapped them in perpetual
          debt; convict leasing re-enslaved them through the criminal justice system.
        </p>
        <p>
          <strong>The Sharecropping Cycle:</strong> Landowners offered land use in exchange
          for crop share (typically 50% or more). Sharecroppers were forced to buy supplies
          on credit from plantation stores at inflated prices. Accounting manipulation
          ensured perpetual debt. Laws tied indebted workers to land.
        </p>
        <p>
          <strong>Dockery Plantation</strong> exemplifies how labor conditions created blues.
          Founded in 1895, this 10,000-acre operation became &ldquo;birthplace of the blues.&rdquo;
          Workers paid in plantation scrip gathered Saturday evenings at the commissary.
          Musicians could earn $250 cash in one night versus 50 cents per day in fields.
        </p>
        <p>Music became economic resistance.</p>
        <FigureCard figure={figures.wcHandy} />
        <Timeline
          events={[
            { date: '1895', event: 'Dockery Plantation founded' },
            { date: '1897', event: 'Patton family arrives at Dockery' },
            { date: 'c. 1903', event: "W.C. Handy's Tutwiler encounter" },
            { date: '1908', event: 'W.C. Handy moves to Memphis' },
          ]}
        />
      </Chapter>

      {/* Chapter 3: Regions, Roads, and Styles */}
      <Chapter
        number="Chapter 3"
        title="Regions, Roads, and Styles"
        subtitle="Delta, Piedmont, Texas Blues (1900s-1940s)"
        era="classic"
      >
        <p>
          While no single birthplace exists, distinct regional styles developed.
        </p>
        <h3>Mississippi Delta Blues</h3>
        <p>
          Raw, intensely emotional vocals. Slide (bottleneck) guitar technique. Modal,
          drone-based harmonic approach. Rhythmic flexibility; solo performance tradition.
        </p>
        <FigureCard figure={figures.charleyPatton} />

        <h3>Texas Blues</h3>
        <p>
          Texas blues developed its own distinctive character, shaped by the state&apos;s
          vast geography and diverse musical influences. Unlike the claustrophobic intensity
          of Delta blues, Texas blues featured cleaner, more melodic guitar work with
          sophisticated single-note runs influenced by jazz. The chord progressions
          were more varied, and the rhythms often incorporated elements of country and
          western swing.
        </p>
        <p>
          Blind Lemon Jefferson, recording from 1926 to 1929, became the first major
          male blues star and sold millions of records. Lead Belly (Huddie Ledbetter)
          brought Texas blues to broader audiences after his discovery by the Lomaxes.
          Lightnin&apos; Hopkins later carried the tradition into the electric era.
        </p>

        <h3>Piedmont Blues</h3>
        <p>
          Ragtime-influenced fingerpicking. Alternating bass pattern (like stride piano).
          Lighter, more buoyant feel than Delta. Geographic base: Eastern seaboard from
          Georgia to Virginia.
        </p>
        <p>
          The railroad was crucial: lines like the Yazoo &amp; Mississippi Valley (the &ldquo;Yellow Dog&rdquo;)
          connected isolated communities, spreading musical ideas and musicians themselves.
        </p>
      </Chapter>

      {/* Chapter 4: Instruments as Evidence */}
      <Chapter
        number="Chapter 4"
        title="Instruments as Evidence"
        subtitle="Guitar, Harmonica, Voice, and the Technologies of Blues"
        era="classic"
      >
        <p>
          Blues instruments were not neutral choices. They were shaped by economics,
          portability, and the specific needs of Black musicians in the Jim Crow South.
        </p>
        <p>
          <strong>The Guitar:</strong> Portable, relatively affordable, capable of
          accompanying voice. The slide technique—using a bottleneck, knife, or metal
          tube to create microtonal bends—may connect to African single-string instruments.
        </p>
        <p>
          <strong>The Harmonica:</strong> Cheap, pocketable, indestructible. Could be
          played while working. Its ability to bend notes matched the blues aesthetic
          perfectly.
        </p>
        <p>
          <strong>The Voice:</strong> The most fundamental instrument. Field hollers,
          moans, and melismatic singing connected African vocal traditions to blues
          expression. The human voice bending notes predates instrumental blues.
        </p>
      </Chapter>

      {/* Chapter 5: Juke Joints */}
      <Chapter
        number="Chapter 5"
        title="Juke Joints, Medicine Shows, and the Blues Economy"
        subtitle="Where Blues Was Performed (1890s-1940s)"
        era="classic"
      >
        <p>
          Before records, blues lived in specific places. Understanding those spaces
          reveals the culture&apos;s social function.
        </p>
        <p>
          <strong>The Juke Joint:</strong> Informal drinking and dancing establishments
          in rural Black communities. The name may derive from Gullah &ldquo;joog&rdquo; (rowdy).
          These were spaces of release from week-long labor, of community gathering,
          of courtship and conflict.
        </p>
        <p>
          <strong>Medicine Shows:</strong> Traveling spectacles that sold patent medicines
          using music as the draw. Ma Rainey began performing on the tent show circuit
          as a teenager.
        </p>
        <p>
          <strong>Vaudeville and TOBA:</strong> The Theater Owners Booking Association
          (&ldquo;Tough On Black Artists&rdquo;) provided a circuit of Black theaters. The pay was
          exploitative, but it built audiences and careers.
        </p>
      </Chapter>

      {/* Chapter 6: Race Records */}
      <Chapter
        number="Chapter 6"
        title="The Recording Industry and Race Records"
        subtitle="Documentation and Exploitation (1920-1945)"
        era="classic"
      >
        <p>
          On August 10, 1920, Mamie Smith recorded &ldquo;Crazy Blues&rdquo; for Okeh Records.
          It sold 75,000 copies in its first month, over 1 million in its first year.
          The race records industry was born.
        </p>
        <p>
          <strong>Industry Growth:</strong> An estimated 15,000 race record titles
          were released in the 1920s-1930s. Peak sales reached $100 million in 1927.
          The Depression collapsed sales to $6 million by 1933.
        </p>
        <p>
          <strong>Systematic Exploitation:</strong> Artists were paid flat session
          fees ($25-100), with no royalties. Copyright was routinely assigned to
          producers or labels. Illiterate artists signed away rights unknowingly.
        </p>
        <Quote
          text="Made Columbia millions of dollars but was never paid royalties."
          source="On Bessie Smith"
        />
        <Quote
          text="That song sold over 2 million records. I got one check for $500 and never saw another."
          attribution="Big Mama Thornton"
          source="On 'Hound Dog'"
        />
      </Chapter>

      {/* Chapter 7: The Blues Queens */}
      <Chapter
        number="Chapter 7"
        title="Classic Blues and the Blues Queens"
        subtitle="Women at the Center (1920-1935)"
        era="classic"
      >
        <p>
          Women did not merely participate in blues—they dominated its commercial era.
          This chapter is not a sidebar; it corrects the historical record.
        </p>
        <p>
          <strong>The Classic Blues Era (1920-1930):</strong> First blues recordings
          were by women (Mamie Smith). Women sold the most records (Bessie Smith, Ma Rainey).
          Women were the highest-paid artists. Men entered recording later, as &ldquo;country&rdquo;
          or &ldquo;down-home&rdquo; blues.
        </p>
        <FigureCard figure={figures.maRainey} />
        <FigureCard figure={figures.bessieSmith} />
        <Quote
          text="Working-class, African-American sensibility quite different from the 'uplift the race' gentility of their middle-class peers."
          attribution="Angela Davis"
          source="Blues Legacies and Black Feminism"
        />
      </Chapter>

      {/* Chapter 8: Myth and Archive */}
      <Chapter
        number="Chapter 8"
        title="Myth, Legend, and the Archive"
        subtitle="The Crossroads Debunking and What We Cannot Know"
        era="depression"
      >
        <p>
          The crossroads legend is the blues&apos; most famous story—and it&apos;s wrong.
        </p>
        <p>
          <strong>The Robert Johnson Crossroads Myth:</strong> According to legend,
          Johnson sold his soul to the devil at a crossroads at midnight in exchange
          for supernatural guitar ability.
        </p>
        <p>
          <strong>The Evidence:</strong> No documentation exists of Johnson making
          this claim himself. The legend originated from stories about <em>Tommy Johnson</em>
          (different person, no relation). The stories were conflated over time due
          to the shared surname.
        </p>
        <FigureCard figure={figures.robertJohnson} />
        <p>
          The &ldquo;haunted, primitive&rdquo; artist image was constructed by white promoters
          and archivists. Johnson was actually an ambitious young professional who
          studied other musicians carefully.
        </p>
        <p>
          <strong>The music was remarkable enough without devils.</strong>
        </p>
      </Chapter>

      {/* Chapter 9: The Great Migration */}
      <Chapter
        number="Chapter 9"
        title="The Great Migration and the City"
        subtitle="Blues Travels North (1916-1970)"
        era="chicago"
      >
        <p>
          Between 1916 and 1970, approximately 6 million African Americans relocated
          from the rural South to cities in the North and West. The blues migrated
          with them.
        </p>
        <p>
          <strong>The Chicago Defender&apos;s Role:</strong> This African American newspaper
          actively promoted migration. Distributed via Pullman porters throughout the
          South, it publicized economic opportunities and documented Southern violence.
        </p>
        <p>
          <strong>The Mississippi-to-Chicago Pipeline:</strong> The Illinois Central
          Railroad ran directly from the Delta to Chicago. Musicians could board in
          Clarksdale and step off on Maxwell Street.
        </p>
        <FigureCard figure={figures.muddyWaters} />
        <Timeline
          events={[
            { date: '1916-1970', event: 'The Great Migration (6 million African Americans relocate)' },
            { date: '1941', event: 'Alan Lomax records Muddy Waters at Stovall Plantation' },
            { date: '1943', event: 'Muddy Waters moves to Chicago' },
            { date: '1944', event: 'Waters buys first electric guitar' },
          ]}
        />
      </Chapter>

      {/* Chapter 10: Electricity and Chicago */}
      <Chapter
        number="Chapter 10"
        title="Electricity and the Chicago Crucible"
        subtitle="The Amplified Blues (1945-1970)"
        era="chicago"
      >
        <p>
          The Chicago blues was Delta blues electrified—not just in sound but in
          intensity, volume, and urban energy.
        </p>
        <Quote
          text="When I went into the clubs, the first thing I wanted was an amplifier. Couldn't nobody hear you with an acoustic."
          attribution="Muddy Waters"
        />
        <p>
          <strong>Chess Records:</strong> Founded by Leonard and Phil Chess (Polish
          Jewish immigrants) in 1950, Chess Records became the epicenter of Chicago
          blues. At 2120 S. Michigan Avenue, they recorded Muddy Waters, Howlin&apos; Wolf,
          Little Walter, and Willie Dixon.
        </p>
        <FigureCard figure={figures.howlinWolf} />
        <FigureCard figure={figures.willieDixon} />
        <Timeline
          events={[
            { date: '1948', event: 'Muddy Waters first Chess recordings' },
            { date: '1950', event: 'Chess Records officially founded' },
            { date: '1952', event: 'Little Walter\'s "Juke"; Big Mama Thornton\'s "Hound Dog"' },
            { date: '1956', event: 'Howlin\' Wolf\'s "Smokestack Lightnin\'"' },
            { date: '1958', event: 'Muddy Waters tours England' },
          ]}
        />
      </Chapter>

      {/* Chapter 11: Crossovers */}
      <Chapter
        number="Chapter 11"
        title="Crossovers, Hybrids, and Industry Rebranding"
        subtitle="Blues Becomes Rock, R&B, Soul (1950s-1970s)"
        era="chicago"
      >
        <p>
          By the late 1950s, the blues had become the foundation for virtually all
          American popular music—but the name &ldquo;blues&rdquo; was being eclipsed.
        </p>
        <p>
          <strong>Rhythm and Blues (R&amp;B):</strong> The term replaced &ldquo;race music&rdquo; in 1949.
        </p>
        <p>
          <strong>Rock and Roll:</strong> &ldquo;What they call Rock and Roll I&apos;ve been
          playing in New Orleans for years,&rdquo; said Fats Domino. Early rock hits were
          R&B songs rebranded.
        </p>
        <p>
          The irony: as these genres exploded commercially, the artists who created
          the blues often remained impoverished while their styles generated billions.
        </p>
        <FigureCard figure={figures.bbKing} />
      </Chapter>

      {/* Chapter 12: Global Blues */}
      <Chapter
        number="Chapter 12"
        title="Global Blues and the British Invasion"
        subtitle="Translation Without Permission (1958-Present)"
        era="revival"
      >
        <p>
          The blues didn&apos;t ask permission to travel. It went where records went,
          where migrants went, where radio signals reached.
        </p>
        <p>
          <strong>The British Blues Boom:</strong> American race records exported to UK.
          British collectors discovered prewar blues. Young British musicians—Clapton,
          Rolling Stones, John Mayall—emulated American blues. Then British bands
          reintroduced blues to white American audiences.
        </p>
        <p>
          <strong>The Irony:</strong> The Rolling Stones, named after a Muddy Waters song,
          recorded at Chess Records in 1964. This was less &ldquo;discovery&rdquo; than return to sender.
        </p>
        <Quote
          text="The most important blues musician who ever lived."
          attribution="Eric Clapton"
          source="On Robert Johnson"
        />
        <Timeline
          events={[
            { date: '1958', event: 'Muddy Waters UK tour shocks audiences' },
            { date: '1961', event: 'King of the Delta Blues Singers released—sparks revival' },
            { date: '1964', event: 'Rolling Stones record at Chess Records' },
            { date: '1986', event: 'Robert Johnson inducted to Rock Hall' },
            { date: '2021', event: 'Charley Patton inducted to Rock Hall' },
          ]}
        />
      </Chapter>

      {/* Epilogue */}
      <Chapter
        number="Epilogue"
        title="The Blues Isn't Old—It's Persistent"
        era="revival"
      >
        <p>
          The blues is not a museum piece. It is not &ldquo;roots music&rdquo; in the sense
          of something that stopped growing.
        </p>
        <p>
          Every bent note in contemporary music—in hip-hop samples, in rock guitar
          solos, in R&B melisma—carries the DNA of the blues. The conditions that
          created the blues—economic oppression, racial inequality, the need to
          express what cannot otherwise be said—have not disappeared.
        </p>
        <p>
          The blues persists because it was never just entertainment. It was testimony.
          And testimony is always needed.
        </p>
        <Quote
          text="The blues has become the basis for nearly every form of American popular music over the past 100 years: jazz, R&B, rock, hip-hop."
          source="Library of Congress"
        />
        <p>
          What began on Dockery Plantation, in juke joints lit by kerosene, in tent
          shows crossing the South, became the foundation of global popular music.
        </p>
        <p className="blues-center">
          <strong>The note still bends. The blues isn&apos;t old—it&apos;s persistent.</strong>
        </p>
      </Chapter>

      {/* Methodology Note */}
      <section className="blues-methodology">
        <h2 className="blues-methodology__title">A Note on Sources</h2>
        <p>
          This essay acknowledges the following limitations in the historical record:
        </p>
        <ul className="blues-methodology__list">
          <li>
            <strong>Pre-recording era gaps:</strong> Documentation is sparse before 1920;
            oral histories were often collected decades after events occurred.
          </li>
          <li>
            <strong>Power dynamics in documentation:</strong> Most early documentation was
            by white collectors with varying ethical practices.
          </li>
          <li>
            <strong>Birth dates:</strong> Many early artists have disputed or estimated
            birth years, indicated by &ldquo;c.&rdquo; (circa) where appropriate.
          </li>
          <li>
            <strong>Economic records:</strong> Financial exploitation is documented through
            patterns and specific examples; exact figures are often estimated.
          </li>
          <li>
            <strong>Attribution of &ldquo;firsts&rdquo;:</strong> Multiple competing claims exist
            for various firsts; this essay uses qualified language.
          </li>
          <li>
            <strong>The crossroads legend:</strong> Explicitly documented as folklore, not history.
          </li>
        </ul>
      </section>

      {/* Sources Section */}
      <footer className="blues-sources">
        <h2 className="blues-sources__title">Sources</h2>
        <ul className="blues-sources__list">
          <li className="blues-sources__item">
            <span className="blues-sources__tier blues-sources__tier--1">T1</span>
            <a href="https://www.loc.gov/collections/lomax/" target="_blank" rel="noopener noreferrer">
              Library of Congress, Lomax Collection
            </a>
          </li>
          <li className="blues-sources__item">
            <span className="blues-sources__tier blues-sources__tier--1">T1</span>
            <a href="https://nmaahc.si.edu/" target="_blank" rel="noopener noreferrer">
              Smithsonian National Museum of African American History and Culture
            </a>
          </li>
          <li className="blues-sources__item">
            <span className="blues-sources__tier blues-sources__tier--1">T1</span>
            <a href="https://msbluestrail.org/" target="_blank" rel="noopener noreferrer">
              Mississippi Blues Trail
            </a>
          </li>
          <li className="blues-sources__item">
            <span className="blues-sources__tier blues-sources__tier--1">T1</span>
            <a href="https://blues.org/" target="_blank" rel="noopener noreferrer">
              Blues Foundation / Blues Hall of Fame
            </a>
          </li>
          <li className="blues-sources__item">
            <span className="blues-sources__tier blues-sources__tier--2">T2</span>
            Davis, Angela Y. <em>Blues Legacies and Black Feminism</em>. Pantheon Books, 1998.
          </li>
          <li className="blues-sources__item">
            <span className="blues-sources__tier blues-sources__tier--2">T2</span>
            Lomax, Alan. <em>The Land Where the Blues Began</em>. The New Press, 1993.
          </li>
          <li className="blues-sources__item">
            <span className="blues-sources__tier blues-sources__tier--2">T2</span>
            Wald, Elijah. <em>Escaping the Delta: Robert Johnson and the Invention of the Blues</em>. Amistad, 2004.
          </li>
          <li className="blues-sources__item">
            <span className="blues-sources__tier blues-sources__tier--2">T2</span>
            Oliver, Paul. <em>Blues Fell This Morning: Meaning in the Blues</em>. Cambridge University Press, 1990.
          </li>
          <li className="blues-sources__item">
            <span className="blues-sources__tier blues-sources__tier--2">T2</span>
            Cohn, Lawrence. <em>Nothing But the Blues: The Music and the Musicians</em>. Abbeville Press, 1993.
          </li>
        </ul>

        <h3 className="blues-sources__subtitle">Image Credits</h3>
        <ul className="blues-sources__list blues-sources__list--images">
          <li className="blues-sources__item">
            <strong>Hero:</strong> &ldquo;Jitterbugging in Negro juke joint, Saturday evening, outside Clarksdale, Mississippi.&rdquo;
            Marion Post Wolcott, November 1939. Library of Congress, Farm Security Administration Collection (LC-USF34-052594-D). Public domain.
          </li>
          <li className="blues-sources__item">
            <strong>W.C. Handy:</strong> Portrait by Carl Van Vechten, 1941.
            Library of Congress, Van Vechten Collection. Public domain.
          </li>
          <li className="blues-sources__item">
            <strong>Charley Patton:</strong> Paramount Records publicity photograph, c. 1929.
            Only known surviving photograph of Patton. Public domain.
          </li>
          <li className="blues-sources__item">
            <strong>Bessie Smith:</strong> Portrait by Carl Van Vechten, 1936.
            Library of Congress, Van Vechten Collection. Public domain.
          </li>
          <li className="blues-sources__item">
            <strong>Ma Rainey:</strong> Studio portrait, c. 1923. Public domain.
          </li>
          <li className="blues-sources__item">
            <strong>Muddy Waters:</strong> Jean-Luc Ourlin, Ontario Place, Toronto, June 1978.
            Wikimedia Commons. CC BY-SA 2.0.
          </li>
          <li className="blues-sources__item">
            <strong>Howlin&apos; Wolf:</strong> Photograph, 1972.
            Wikimedia Commons. Public domain.
          </li>
          <li className="blues-sources__item">
            <strong>B.B. King:</strong> Presidential Medal of Freedom ceremony, White House, December 15, 2006.
            U.S. Government photograph. Public domain.
          </li>
          <li className="blues-sources__item">
            <strong>Willie Dixon:</strong> Brian McMillen, Monterey Jazz Festival, 1981.
            Wikimedia Commons. CC BY-SA 3.0.
          </li>
        </ul>
      </footer>
    </article>
  );
}
