"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import "./rap-history.css";

// ============================================================================
// RAP: THE WORLD'S LOUDEST ARCHIVE
// ============================================================================
// Visual Treatment: Era-morphing photorealistic with 12 design skins
// Arc Type: Origins -> Explosion -> Regional -> Global -> Now
// Progress Bar: Vinyl record with spinning animation
// Cultural Lens: Centers Black American innovation, acknowledges paradoxes
// Sources: Cornell Hip-Hop Collection, Smithsonian NMAAHC, Joe Conzo Jr.,
//          Janette Beckman, Glen E. Friedman archives
// ============================================================================

// ==================== TYPE DEFINITIONS ====================

type DesignSkin =
  | "neon-playground"
  | "tv-gloss"
  | "newsprint-urgency"
  | "boombox-brutalism"
  | "casefile-noir"
  | "chrome-heat"
  | "mixtape-xerox"
  | "luxury-minimal"
  | "trap-architecture"
  | "cctv-frost"
  | "algorithm-glitch"
  | "global-patchwork";

interface Figure {
  name: string;
  stageName?: string;
  epithet: string;
  born?: string;
  died?: string;
  role: string;
  contributions: string;
  quote?: string;
  quoteSource?: string;
  imageUrl?: string;
  imageAttribution?: string;
}

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  source?: string;
}

interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  skin: DesignSkin;
  temporalMarker?: string;
  epigraph?: { text: string; source: string };
  narrative: string[];
  figures: Figure[];
  timeline?: TimelineEvent[];
  chapterImage?: {
    url: string;
    alt: string;
    attribution: string;
  };
}

// ==================== SCROLL-LOCK HOOK ====================

interface ScrollLockState {
  containerRef: React.RefObject<HTMLDivElement | null>;
  progress: number;
  isPinned: boolean;
}

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isNarrowViewport = window.innerWidth < 768;
      const hasTouchCapability = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isNarrowViewport || (hasTouchCapability && window.innerWidth < 1024));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const useScrollLock = (sectionHeight: number = 2.5): ScrollLockState => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

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
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, sectionHeight]);

  return { containerRef, progress, isPinned };
};

// ==================== READING PROGRESS HOOK ====================

const useReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      setProgress(Math.min(scrollTop / documentHeight, 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
};

// ==================== CHAPTER DATA ====================

const CHAPTERS: Chapter[] = [
  // PROLOGUE
  {
    id: "prologue",
    number: "00",
    title: "Before the Mic Was a Weapon",
    subtitle: "African diasporic oral traditions and the prehistory of rap",
    skin: "neon-playground",
    temporalMarker: "Before 1973",
    epigraph: {
      text: "Hip-hop is the last form of American folk music. It's the voice of people who have no voice in the political system.",
      source: "Killer Mike, 2016"
    },
    narrative: [
      "Before hip-hop had a name, before the first record dropped, before any of it was a billion-dollar industry—there was voice. Raw, rhythmic, rebellious voice.",
      "The roots of rap reach deeper than the South Bronx. They stretch back through centuries of African diasporic oral tradition: the griots of West Africa who carried history in their vocal cords; the ring shouts of enslaved communities; the signifying and playing the dozens that turned language into sport; the toasts and boasts of prison yards and street corners.",
      "In Jamaica, sound system culture was already transforming how music moved through communities. DJs like King Tubby and U-Roy were 'toasting' over records—talking, chanting, improvising over the beat. When Caribbean immigrants brought these traditions to New York, they carried the seeds of something new.",
      "By the early 1970s, the South Bronx was burning—literally. Landlords torched their own buildings for insurance money. The Cross Bronx Expressway had gutted communities. Manufacturing jobs vanished. The city abandoned its poorest neighborhoods. But in the rubble, young people were building something unprecedented."
    ],
    figures: [
      {
        name: "The Griots",
        epithet: "Keepers of History",
        role: "West African Oral Tradition",
        contributions: "Carried genealogies, histories, and social commentary through rhythmic speech for centuries. The griot tradition established the role of the verbal artist as community historian.",
        quote: "The griot is a living archive, a walking library, a speaking museum.",
        quoteSource: "Malian proverb"
      },
      {
        name: "The Last Poets",
        epithet: "Proto-Rap Prophets",
        role: "Spoken Word Group",
        contributions: "Formed in 1968, combined jazz rhythms with politically charged poetry. Their 1970 self-titled album is considered a direct precursor to rap.",
        quote: "When the revolution comes...",
        quoteSource: "The Last Poets, 1970"
      },
      {
        name: "Gil Scott-Heron",
        epithet: "The Godfather of Rap",
        born: "1949",
        died: "2011",
        role: "Poet/Musician",
        contributions: "'The Revolution Will Not Be Televised' (1970) established the template for politically conscious spoken word over music.",
        quote: "The first revolution is when you change your mind about how you look at things.",
        quoteSource: "Gil Scott-Heron"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/8/84/Susu_Griot%2C_circa_1910%2C_Conakry%2C_Guinea.jpg",
      alt: "Susu griot with traditional instrument, Guinea, circa 1910",
      attribution: "Wikimedia Commons, Public Domain"
    }
  },

  // CHAPTER 1: THE BRONX CRUCIBLE
  {
    id: "bronx-crucible",
    number: "01",
    title: "The Bronx Crucible",
    subtitle: "From party ritual to cultural form",
    skin: "neon-playground",
    temporalMarker: "1973-1979",
    epigraph: {
      text: "I was just playing for my sister's party, trying to give the people what they wanted. I figured out that the break was the best part, so I extended it.",
      source: "DJ Kool Herc, Can't Stop Won't Stop (2005)"
    },
    narrative: [
      "On August 11, 1973, Clive Campbell—a Jamaican immigrant known as DJ Kool Herc—threw a back-to-school party for his sister Cindy in the recreation room of 1520 Sedgwick Avenue in the Bronx. He had figured out something that would change music forever.",
      "Using two copies of the same record on two turntables, Herc isolated and extended the 'break'—the percussion-heavy section that dancers went crazy for. He called it the 'Merry-Go-Round.' The dancers who waited for these breaks became known as break-boys and break-girls. The culture was forming.",
      "Herc's MCs, Coke La Rock and Clark Kent, would toast over the beats—hyping the crowd, shouting out friends, keeping the energy high. This call-and-response between DJ and MC became the foundation of hip-hop performance.",
      "Other DJs emerged to push the form further. Joseph Saddler—Grandmaster Flash—brought scientific precision, developing 'Quick Mix Theory' to cut between records with surgical accuracy. Grand Wizard Theodore accidentally discovered scratching while trying to hold a record still. Afrika Bambaataa, a former gang leader, saw hip-hop's potential to redirect youth energy and founded the Universal Zulu Nation."
    ],
    figures: [
      {
        name: "Clive Campbell",
        stageName: "DJ Kool Herc",
        epithet: "The Father of Hip-Hop",
        born: "1955",
        role: "DJ/Pioneer",
        contributions: "Invented the breakbeat technique at 1520 Sedgwick Ave on August 11, 1973. Created the 'Merry-Go-Round' method of extending breaks using two turntables.",
        quote: "I called it the Merry-Go-Round because it was just going in a circle.",
        quoteSource: "The Hip Hop Years (BBC, 1999)"
      },
      {
        name: "Joseph Saddler",
        stageName: "Grandmaster Flash",
        epithet: "The Scientist",
        born: "1958",
        role: "DJ/Producer",
        contributions: "Developed Quick Mix Theory; invented punch phrasing and the technique of using headphones to cue records. Created the first DJ as virtuoso.",
        quote: "I had to create a cue system, a mixer, and techniques that didn't exist. I was a scientist trying to figure out how to surgically drop the needle at the exact point where the break starts.",
        quoteSource: "TED Talk (2014)"
      },
      {
        name: "Kevin Donovan",
        stageName: "Afrika Bambaataa",
        epithet: "The Godfather",
        born: "1957",
        role: "DJ/Organizer",
        contributions: "Founded the Universal Zulu Nation; pioneered electro-funk with 'Planet Rock' (1982); brought together the four elements of hip-hop culture.",
        quote: "Hip-hop is supposed to uplift and create, to educate people on a larger level and to make a change.",
        quoteSource: "Style Wars (1983)"
      },
      {
        name: "Theodore Livingston",
        stageName: "Grand Wizard Theodore",
        epithet: "The Inventor of Scratching",
        born: "1963",
        role: "DJ",
        contributions: "Invented scratching in 1977 while trying to hold a record still as his mother called him. Pioneered needle drops.",
        quote: "I was just trying to hold the record, and it made this sound.",
        quoteSource: "Various interviews"
      },
      {
        name: "Grandmaster Caz",
        stageName: "Caz",
        epithet: "The Lyrical Architect",
        born: "1961",
        role: "MC/DJ",
        contributions: "Cold Crush Brothers MC; wrote the lyrics that Big Bank Hank used on 'Rapper's Delight' without credit.",
        quote: "I'm the C-A-S-A-N-the-O-V-A, and the rest is F-L-Y.",
        quoteSource: "Cold Crush Brothers performances"
      }
    ],
    timeline: [
      {
        date: "August 11, 1973",
        title: "The Birth of Hip-Hop",
        description: "DJ Kool Herc hosts 'Back to School Jam' at 1520 Sedgwick Avenue, Bronx. First documented use of breakbeat technique.",
        source: "Chang, Can't Stop Won't Stop (2005)"
      },
      {
        date: "1974",
        title: "Afrika Bambaataa Forms Zulu Nation",
        description: "Former Black Spades gang member channels youth energy into hip-hop culture through the Universal Zulu Nation.",
        source: "Charnas, The Big Payback (2010)"
      },
      {
        date: "1977",
        title: "Scratching Is Invented",
        description: "Grand Wizard Theodore accidentally discovers scratching while holding a record still.",
        source: "Yes Yes Y'all oral history"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/9/91/Herc_on_the_Wheels_of_Steel.JPG",
      alt: "DJ Kool Herc spinning records in the Bronx, the founder of hip-hop at the turntables",
      attribution: "Photo by Bigtimepeace, Wikimedia Commons, Public Domain"
    }
  },

  // CHAPTER 2: THE RECORD ARRIVES
  {
    id: "record-arrives",
    number: "02",
    title: "The Record Arrives",
    subtitle: "Rap becomes a product",
    skin: "boombox-brutalism",
    temporalMarker: "1979-1984",
    epigraph: {
      text: "I heard kids in the park doing this new thing, and I knew it was going to be big.",
      source: "Sylvia Robinson, Sugar Hill Records founder"
    },
    narrative: [
      "For six years, hip-hop existed only in parks, community centers, and clubs. There was no record. The culture was local, ephemeral, passed through cassette tapes and word of mouth. Then Sylvia Robinson changed everything.",
      "Robinson, a former singer ('Love Is Strange,' 'Pillow Talk') turned record executive, heard rappers at a party and recognized commercial potential. She assembled three unknown MCs—Big Bank Hank, Wonder Mike, and Master Gee—called them the Sugarhill Gang, and in September 1979 released 'Rapper's Delight.'",
      "The song sampled Chic's 'Good Times,' ran nearly 15 minutes long, and became an international hit. Hip-hop had a record. It also had its first controversy: Big Bank Hank's verses were written by Grandmaster Caz, who never received credit or payment.",
      "Sugar Hill Records dominated early rap, but the sound was still disco-inflected, polished for radio. The real revolution came when Russell Simmons and Rick Rubin founded Def Jam in a NYU dorm room in 1984. Their philosophy was radical: don't soften hip-hop for the mainstream. Make the hardest records possible and let the mainstream come to you."
    ],
    figures: [
      {
        name: "Sylvia Robinson",
        epithet: "The Mother of Hip-Hop Records",
        born: "1935",
        died: "2011",
        role: "Executive/Producer",
        contributions: "Founded Sugar Hill Records; produced 'Rapper's Delight' (1979) and 'The Message' (1982). First to recognize rap's commercial potential.",
        quote: "I heard kids in the park doing this new thing, and I knew it was going to be big.",
        quoteSource: "Various interviews"
      },
      {
        name: "Russell Simmons",
        epithet: "The Godfather of Hip-Hop Business",
        born: "1957",
        role: "Executive",
        contributions: "Co-founded Def Jam Records and Rush Management. Built hip-hop into a mainstream industry while maintaining artistic integrity.",
        quote: "We never tried to make crossover records. We made the hardest, rawest records we could, and the mainstream came to us.",
        quoteSource: "Life and Def (2001)"
      },
      {
        name: "Rick Rubin",
        epithet: "The Minimalist Producer",
        born: "1963",
        role: "Producer/Executive",
        contributions: "Co-founded Def Jam; developed stripped-down production style that emphasized beats and vocals over disco embellishment.",
        quote: "I wanted to make records that sounded like the park jams.",
        quoteSource: "Various interviews"
      },
      {
        name: "Melvin Glover",
        stageName: "Melle Mel",
        epithet: "The Messenger",
        born: "1961",
        role: "MC",
        contributions: "Furious Five MC; wrote and performed 'The Message' (1982), the first socially conscious rap hit that proved rap could be serious art.",
        quote: "Don't push me 'cause I'm close to the edge.",
        quoteSource: "'The Message' (1982)"
      },
      {
        name: "Kurtis Blow",
        epithet: "The First Major Label Rapper",
        born: "1959",
        role: "MC",
        contributions: "First rapper signed to a major label (Mercury); 'The Breaks' (1980) was the first gold-certified rap single.",
        quote: "These are the breaks!",
        quoteSource: "'The Breaks' (1980)"
      }
    ],
    timeline: [
      {
        date: "September 1979",
        title: "'Rapper's Delight' Released",
        description: "The Sugarhill Gang's single becomes the first commercially successful rap record, reaching #36 on the Billboard Hot 100.",
        source: "Billboard chart data"
      },
      {
        date: "1980",
        title: "Kurtis Blow Goes Gold",
        description: "'The Breaks' becomes the first gold-certified rap single; Kurtis Blow becomes first rapper on a major label.",
        source: "RIAA certification"
      },
      {
        date: "July 1982",
        title: "'The Message' Drops",
        description: "Grandmaster Flash and the Furious Five release the first socially conscious rap hit, changing expectations for the genre.",
        source: "Sugar Hill Records"
      },
      {
        date: "1984",
        title: "Def Jam Founded",
        description: "Russell Simmons and Rick Rubin launch Def Jam Records from Rubin's NYU dorm room.",
        source: "Charnas, The Big Payback"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Grandmaster_Flash_and_The_Furious_Five_%281982_Sugar_Hill_Press_Photo%29.jpg",
      alt: "Grandmaster Flash and The Furious Five, 1982 Sugar Hill Records press photo",
      attribution: "Sugar Hill Records press photo, Wikimedia Commons, Public Domain"
    }
  },

  // CHAPTER 3: RUN-DMC AND THE NEW SCHOOL
  {
    id: "new-school",
    number: "03",
    title: "The New School",
    subtitle: "Run-DMC rewrites the rules",
    skin: "boombox-brutalism",
    temporalMarker: "1983-1986",
    epigraph: {
      text: "We wanted to sound like the streets. No disco. No musicians. Just beats.",
      source: "Darryl McDaniels (D.M.C.)"
    },
    narrative: [
      "Run-DMC didn't just change how rap sounded. They changed what rappers looked like, how they dressed, and what they represented. Before them, rappers wore sequins and leather like disco stars. Run-DMC wore what they wore on the streets of Hollis, Queens: Adidas sneakers with no laces, black fedoras, gold chains, and leather jackets.",
      "Their sound was equally stripped down. Producer Larry Smith and later Rick Rubin gave them beats built from drum machines and nothing else—no live bands, no disco strings. Just the beat and the voice. 'It's Like That' / 'Sucker M.C.'s' (1983) announced a new era.",
      "The 1986 Adidas endorsement deal—the first major sneaker deal in hip-hop—proved rappers could be corporate partners without selling out. When they performed 'My Adidas' at Madison Square Garden and 20,000 fans held their sneakers in the air, Adidas executives in the audience immediately signed them.",
      "'Walk This Way' (1986), their collaboration with Aerosmith, broke MTV's color barrier and introduced hip-hop to rock audiences. It wasn't just a crossover—it was proof that hip-hop could absorb any genre and make it its own."
    ],
    figures: [
      {
        name: "Joseph Simmons",
        stageName: "Run",
        epithet: "The King of Rock",
        born: "1964",
        role: "MC",
        contributions: "Run-DMC co-founder; pioneered the new school sound and aesthetic that defined mid-80s hip-hop.",
        quote: "We changed the whole style. No more costumes. We dressed like ourselves.",
        quoteSource: "Various interviews"
      },
      {
        name: "Darryl McDaniels",
        stageName: "D.M.C.",
        epithet: "The Devastating Mic Controller",
        born: "1964",
        role: "MC",
        contributions: "Run-DMC's lyrical powerhouse; developed the back-and-forth trading of verses with Run.",
        quote: "I'm D.M.C. in the place to be, I go to St. John's University.",
        quoteSource: "'Rock Box' (1984)"
      },
      {
        name: "Jason Mizell",
        stageName: "Jam Master Jay",
        epithet: "The Master of the Mix",
        born: "1965",
        died: "2002",
        role: "DJ",
        contributions: "Run-DMC's DJ; brought turntablism to mainstream audiences. Murdered in 2002; case solved in 2022.",
        quote: "The DJ is the foundation.",
        quoteSource: "Various interviews"
      },
      {
        name: "James Todd Smith",
        stageName: "LL Cool J",
        epithet: "Ladies Love Cool James",
        born: "1968",
        role: "MC",
        contributions: "Def Jam's first signing; 'Radio' (1985) was the label's first album. Proved rappers could be solo stars.",
        quote: "I'm bad.",
        quoteSource: "'I'm Bad' (1987)"
      }
    ],
    timeline: [
      {
        date: "1983",
        title: "Run-DMC Debuts",
        description: "'It's Like That' / 'Sucker M.C.'s' announces the new school: drum machines, no live band, street clothes.",
        source: "Profile Records"
      },
      {
        date: "1984",
        title: "'Radio' Drops",
        description: "LL Cool J releases Def Jam's first album at age 16.",
        source: "Def Jam Records"
      },
      {
        date: "1986",
        title: "'Walk This Way' Breaks MTV",
        description: "Run-DMC's collaboration with Aerosmith becomes first rap video in heavy rotation on MTV.",
        source: "MTV chart data"
      },
      {
        date: "1986",
        title: "Adidas Deal Signed",
        description: "Run-DMC becomes first hip-hop act to sign a major endorsement deal with a sneaker company.",
        source: "Sports business records"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/7/77/Run-DMC_Beastie_Boys_1987_press_photo.jpg",
      alt: "Run-DMC and Beastie Boys, 1987 press photo showing the new school hip-hop aesthetic",
      attribution: "Press photo, Wikimedia Commons, Public Domain"
    }
  },

  // CHAPTER 4: GOLDEN AGE LYRICISM
  {
    id: "golden-age",
    number: "04",
    title: "The Golden Age",
    subtitle: "When lyrics became architecture",
    skin: "boombox-brutalism",
    temporalMarker: "1986-1992",
    epigraph: {
      text: "I wrote with a thesaurus and a dictionary. I'd look up words just to expand my vocabulary. I wanted to say things in ways they hadn't been said.",
      source: "Rakim, Check the Technique (2007)"
    },
    narrative: [
      "Between 1986 and 1992, hip-hop experienced an explosion of lyrical innovation that still defines the art form's technical standards. The Golden Age wasn't just about what rappers said—it was about how they said it.",
      "Rakim changed everything. Before him, MCs rhymed at the end of lines in simple patterns. Rakim put rhymes in the middle of lines, stacked multiple rhymes in single bars, and rode the beat with unprecedented rhythmic complexity. 'Paid in Full' (1987) became the template for lyrical craft.",
      "Big Daddy Kane brought speed and multisyllabic complexity. Kool G Rap layered internal rhymes and told street stories with cinematic detail. Slick Rick turned verses into short films. The Juice Crew and BDP battled in 'The Bridge Wars,' proving that competition drove innovation.",
      "Native Tongues—De La Soul, A Tribe Called Quest, Queen Latifah, Jungle Brothers—expanded hip-hop's thematic range beyond street narratives to include Afrocentric consciousness, jazz sampling, and playful experimentation. '3 Feet High and Rising' (1989) sampled everything from Steely Dan to Johnny Cash."
    ],
    figures: [
      {
        name: "William Griffin Jr.",
        stageName: "Rakim",
        epithet: "The God MC",
        born: "1968",
        role: "MC",
        contributions: "Revolutionized lyrical technique with internal rhyme, complex flows, and intellectual content. 'Paid in Full' (1987) is considered the most influential rap album ever.",
        quote: "I heard everybody rhyming the same way—at the end of the line. I started putting rhymes in the middle, in different pockets.",
        quoteSource: "NPR Music interview (2018)"
      },
      {
        name: "Antonio Hardy",
        stageName: "Big Daddy Kane",
        epithet: "The Smooth Operator",
        born: "1968",
        role: "MC",
        contributions: "Pioneered fast-flow multisyllabic rhyming; mentor to Jay-Z. Combined lyrical skill with sex appeal.",
        quote: "Rappers I monkey flip 'em with the funky rhythm I be kickin'.",
        quoteSource: "'Raw' (1988)"
      },
      {
        name: "Kamaal Fareed",
        stageName: "Q-Tip",
        epithet: "The Abstract",
        born: "1970",
        role: "MC/Producer",
        contributions: "A Tribe Called Quest leader; pioneered jazz-rap fusion and alternative hip-hop aesthetic.",
        quote: "Rap is not pop, if you call it that then stop.",
        quoteSource: "'Check the Rhime' (1991)"
      },
      {
        name: "Malik Taylor",
        stageName: "Phife Dawg",
        epithet: "The Five Foot Assassin",
        born: "1970",
        died: "2016",
        role: "MC",
        contributions: "A Tribe Called Quest's lyrical counterweight to Q-Tip; street-level perspective balanced the group's abstract tendencies.",
        quote: "Microphone check one two what is this?",
        quoteSource: "'Buggin' Out' (1991)"
      },
      {
        name: "Dana Owens",
        stageName: "Queen Latifah",
        epithet: "The Queen",
        born: "1970",
        role: "MC",
        contributions: "Feminist hip-hop pioneer; 'All Hail the Queen' (1989) and 'U.N.I.T.Y.' (1993) addressed women's issues.",
        quote: "Who you callin' a bitch?",
        quoteSource: "'U.N.I.T.Y.' (1993)"
      }
    ],
    timeline: [
      {
        date: "1987",
        title: "'Paid in Full' Drops",
        description: "Eric B. & Rakim release the album that redefines lyrical technique.",
        source: "4th & B'way Records"
      },
      {
        date: "1988",
        title: "'The Bridge' Battle",
        description: "BDP's 'The Bridge Is Over' defeats MC Shan in hip-hop's most famous battle.",
        source: "Hip-hop oral history"
      },
      {
        date: "1989",
        title: "Native Tongues Form",
        description: "De La Soul's '3 Feet High and Rising' launches the alternative hip-hop collective.",
        source: "Tommy Boy Records"
      },
      {
        date: "1991",
        title: "'The Low End Theory'",
        description: "A Tribe Called Quest perfects jazz-rap fusion.",
        source: "Jive Records"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/a/af/Eric_B_%26_Rakim_press_photo_1987.jpg",
      alt: "Eric B. & Rakim, 1987 press photo representing the Golden Age of hip-hop lyricism",
      attribution: "Press photo, Wikimedia Commons, Public Domain"
    }
  },

  // CHAPTER 5: PUBLIC ENEMY AND POLITICAL RAP
  {
    id: "fight-the-power",
    number: "05",
    title: "Fight the Power",
    subtitle: "Rap as newspaper, rap as weapon",
    skin: "newsprint-urgency",
    temporalMarker: "1987-1992",
    epigraph: {
      text: "Rap is Black America's CNN. It's the only way we can get our message across without the media filtering it.",
      source: "Chuck D, Rolling Stone (1990)"
    },
    narrative: [
      "Public Enemy didn't just make political music. They made music that felt like politics—dense, confrontational, and impossible to ignore. The Bomb Squad's production layered sirens, speeches, and noise into a wall of sound that matched Chuck D's verbal assault.",
      "Chuck D conceived of Public Enemy as a 'Black CNN'—a news source for communities ignored by mainstream media. 'It Takes a Nation of Millions to Hold Us Back' (1988) and 'Fear of a Black Planet' (1990) addressed mass incarceration, media bias, and systemic racism with an intellectual rigor unprecedented in popular music.",
      "The group's militaristic staging—S1Ws in uniform, Flavor Flav's clock, the crosshairs logo—created a visual vocabulary of resistance. When Spike Lee used 'Fight the Power' as the theme for 'Do the Right Thing' (1989), the song became an anthem for a generation.",
      "But conscious rap wasn't only Public Enemy. KRS-One combined philosophical inquiry with street knowledge. X-Clan brought Afrocentrism. Paris brought revolutionary socialism. Poor Righteous Teachers brought Five Percenter theology. Hip-hop became a classroom."
    ],
    figures: [
      {
        name: "Carlton Ridenhour",
        stageName: "Chuck D",
        epithet: "The Black Voice of the Voiceless",
        born: "1960",
        role: "MC",
        contributions: "Public Enemy frontman; developed rap as political commentary and media critique. The most influential political voice in hip-hop history.",
        quote: "We wanted to make music that was uncompromising. The music had to be loud, aggressive, and intelligent—like a fist in your ear.",
        quoteSource: "Fight the Power (1997)"
      },
      {
        name: "William Drayton",
        stageName: "Flavor Flav",
        epithet: "The Clock King",
        born: "1959",
        role: "Hype Man",
        contributions: "Public Enemy's contrast to Chuck D's seriousness; the clock became hip-hop's most recognizable prop.",
        quote: "Yeah, boyeee!",
        quoteSource: "Public Enemy performances"
      },
      {
        name: "Lawrence Parker",
        stageName: "KRS-One",
        epithet: "The Teacha",
        born: "1965",
        role: "MC",
        contributions: "Boogie Down Productions leader; combined street credibility with philosophical depth. Coined 'edutainment.'",
        quote: "Rap is something you do. Hip-hop is something you live.",
        quoteSource: "The Gospel of Hip Hop (2009)"
      }
    ],
    timeline: [
      {
        date: "1987",
        title: "'Yo! Bum Rush the Show'",
        description: "Public Enemy debuts on Def Jam with raw, abrasive political hip-hop.",
        source: "Def Jam Records"
      },
      {
        date: "1988",
        title: "'Nation of Millions'",
        description: "Public Enemy's second album is declared the 'Sgt. Pepper's' of hip-hop.",
        source: "Critical consensus"
      },
      {
        date: "1989",
        title: "'Fight the Power' in 'Do the Right Thing'",
        description: "Spike Lee's film gives Public Enemy's anthem a permanent place in American culture.",
        source: "Universal Pictures"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Chuck_D_Public_Enemy_Way_Out_West_2013.jpg",
      alt: "Chuck D of Public Enemy performing, the voice of political hip-hop",
      attribution: "Photo by Kim Metso, Wikimedia Commons, CC BY-SA 3.0"
    }
  },

  // CHAPTER 6: N.W.A AND THE WEST COAST
  {
    id: "straight-outta-compton",
    number: "06",
    title: "Straight Outta Compton",
    subtitle: "Gangsta rap and the West Coast explosion",
    skin: "casefile-noir",
    temporalMarker: "1986-1992",
    epigraph: {
      text: "I'm not trying to glorify anything. I'm reporting from the streets. If you don't like what I'm saying, change the streets.",
      source: "Ice-T, 1992"
    },
    narrative: [
      "While New York debated lyrical technique and Afrocentric consciousness, Los Angeles was on fire. The crack epidemic devastated communities. The LAPD's Operation Hammer subjected Black neighborhoods to military-style occupation. Gangs filled the vacuum left by manufacturing job losses. From this chaos came gangsta rap.",
      "Ice-T's '6 in the Mornin'' (1986) established the template: first-person street narratives told without apology or moral commentary. But N.W.A—Niggaz Wit Attitudes—took it further. 'Straight Outta Compton' (1988) was hip-hop's most dangerous record, a vivid and violent portrait of South Central life.",
      "The FBI sent Ruthless Records a letter objecting to 'Fuck tha Police.' Concerts were shut down. Radio wouldn't touch it. The album still went platinum. Gangsta rap proved that controversy sold—and that there was a massive audience for unfiltered Black anger.",
      "Dr. Dre's production gave N.W.A a sonic identity: heavy funk samples, P-Funk synthesizers, deep bass. After N.W.A's bitter breakup, he'd refine this into G-funk on 'The Chronic' (1992), establishing Death Row Records as the dominant force of the early '90s."
    ],
    figures: [
      {
        name: "Eric Wright",
        stageName: "Eazy-E",
        epithet: "The Godfather of Gangsta Rap",
        born: "1964",
        died: "1995",
        role: "MC/Executive",
        contributions: "Founded Ruthless Records; funded N.W.A's debut; proved independent hip-hop labels could achieve major success.",
        quote: "I started this gangsta shit, and this the motherfuckin' thanks I get?",
        quoteSource: "'Real Muthaphuckkin G's' (1993)"
      },
      {
        name: "Andre Young",
        stageName: "Dr. Dre",
        epithet: "The Doctor",
        born: "1965",
        role: "Producer/MC",
        contributions: "Created N.W.A's sound; invented G-funk with 'The Chronic' (1992); discovered Snoop Dogg, Eminem, 50 Cent, Kendrick Lamar.",
        quote: "I wanted to make music that sounded like California. The funk, the low-riders, the sunshine. That's what G-funk is.",
        quoteSource: "The Defiant Ones (2017)"
      },
      {
        name: "O'Shea Jackson",
        stageName: "Ice Cube",
        epithet: "The Architect",
        born: "1969",
        role: "MC",
        contributions: "N.W.A's primary lyricist; solo career balanced gangsta imagery with political consciousness. 'AmeriKKKa's Most Wanted' (1990) merged East and West.",
        quote: "Life ain't nothin' but bitches and money.",
        quoteSource: "'Gangsta Gangsta' (1988)"
      },
      {
        name: "Tracy Marrow",
        stageName: "Ice-T",
        epithet: "The Original Gangster",
        born: "1958",
        role: "MC",
        contributions: "Created the gangsta rap template before N.W.A; 'Rhyme Pays' (1987) was the first West Coast rap album with a Parental Advisory sticker.",
        quote: "I'm not trying to glorify anything. I'm reporting from the streets.",
        quoteSource: "Interview (1992)"
      }
    ],
    timeline: [
      {
        date: "1986",
        title: "'6 in the Mornin''",
        description: "Ice-T releases the first true gangsta rap single.",
        source: "Techno Hop Records"
      },
      {
        date: "August 1988",
        title: "'Straight Outta Compton' Drops",
        description: "N.W.A releases the most controversial album in hip-hop history.",
        source: "Ruthless/Priority Records"
      },
      {
        date: "1989",
        title: "FBI Letter",
        description: "The FBI sends Ruthless Records a letter warning about 'Fuck tha Police.'",
        source: "FBI archives"
      },
      {
        date: "December 1992",
        title: "'The Chronic' Redefines West Coast",
        description: "Dr. Dre's solo debut creates G-funk and launches Death Row Records.",
        source: "Death Row/Interscope"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Ice_Cube_2012.jpg",
      alt: "Ice Cube, N.W.A's primary lyricist who helped define gangsta rap",
      attribution: "Photo by Kris Krüg, Wikimedia Commons, CC BY-SA 2.0"
    }
  },

  // CHAPTER 7: EAST VS. WEST
  {
    id: "east-west",
    number: "07",
    title: "Coast to Coast",
    subtitle: "The rivalry that almost destroyed hip-hop",
    skin: "casefile-noir",
    temporalMarker: "1994-1997",
    epigraph: {
      text: "I wanted to be the narrator of my generation's story. Everything happening in the hood—I wanted to document it.",
      source: "Nas, Hip-Hop Evolution (2016)"
    },
    narrative: [
      "By 1994, the geographic center of hip-hop had become a battleground. Death Row Records, led by the notoriously violent Suge Knight, dominated the West with Dr. Dre, Snoop Dogg, and Tupac Shakur. Bad Boy Records, led by Sean 'Puffy' Combs, ruled the East with The Notorious B.I.G.",
      "What began as regional competition—whose sound was harder, whose streets were realer—escalated into personal war after Tupac was shot during a robbery at Quad Studios in 1994. Tupac blamed Biggie and Puffy. The accusations, true or not, set both coasts on collision course.",
      "The music was extraordinary. Biggie's 'Ready to Die' (1994) combined street narratives with pop ambition. Nas's 'Illmatic' (1994) achieved literary heights. Tupac's 'All Eyez on Me' (1996) was a double album of California swagger and vulnerability. But the beef overshadowed everything.",
      "On September 7, 1996, Tupac was shot in Las Vegas. He died six days later. On March 9, 1997, Biggie was shot in Los Angeles. He died that night. Hip-hop's greatest rivalry ended in tragedy, and the genre was forced to reckon with the violence it had sometimes celebrated."
    ],
    figures: [
      {
        name: "Christopher Wallace",
        stageName: "The Notorious B.I.G.",
        epithet: "The King of New York",
        born: "1972",
        died: "1997",
        role: "MC",
        contributions: "Defined East Coast dominance with 'Ready to Die' (1994); combined street narratives with commercial appeal. Considered one of the greatest MCs ever.",
        quote: "It was all a dream.",
        quoteSource: "'Juicy' (1994)"
      },
      {
        name: "Tupac Shakur",
        stageName: "2Pac",
        epithet: "The Poet of the Streets",
        born: "1971",
        died: "1996",
        role: "MC/Actor",
        contributions: "Combined thug imagery with political consciousness and vulnerability. 'All Eyez on Me' (1996) sold 10 million copies.",
        quote: "I'm not saying I'm gonna change the world, but I guarantee that I will spark the brain that will change the world.",
        quoteSource: "Interview"
      },
      {
        name: "Nasir Jones",
        stageName: "Nas",
        epithet: "The Poet Laureate",
        born: "1973",
        role: "MC",
        contributions: "'Illmatic' (1994) is considered the greatest hip-hop album ever made. Established literary standards for lyricism.",
        quote: "I wanted to be the narrator of my generation's story.",
        quoteSource: "Hip-Hop Evolution (2016)"
      },
      {
        name: "Sean Combs",
        stageName: "Puff Daddy",
        epithet: "The Bad Boy",
        born: "1969",
        role: "Executive/MC",
        contributions: "Founded Bad Boy Records; developed the 'shiny suit' era of polished, sample-heavy hip-hop. Discovered Biggie.",
        quote: "Can't nobody hold me down.",
        quoteSource: "'Can't Nobody Hold Me Down' (1997)"
      }
    ],
    timeline: [
      {
        date: "April 1994",
        title: "'Illmatic' Drops",
        description: "Nas releases the album that will be crowned hip-hop's greatest.",
        source: "Columbia Records"
      },
      {
        date: "September 1994",
        title: "'Ready to Die'",
        description: "The Notorious B.I.G.'s debut establishes East Coast dominance.",
        source: "Bad Boy Records"
      },
      {
        date: "November 1994",
        title: "Quad Studios Shooting",
        description: "Tupac is shot during a robbery; blames Biggie and Puffy, escalating the feud.",
        source: "News reports"
      },
      {
        date: "September 13, 1996",
        title: "Tupac Dies",
        description: "Tupac Shakur dies from gunshot wounds in Las Vegas.",
        source: "News reports"
      },
      {
        date: "March 9, 1997",
        title: "Biggie Dies",
        description: "The Notorious B.I.G. is killed in Los Angeles.",
        source: "News reports"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/d/d4/2pac_edit_cropped_further.jpg",
      alt: "Tupac Shakur, whose death alongside Biggie ended the East-West rivalry in tragedy",
      attribution: "Wikimedia Commons, Public Domain"
    }
  },

  // CHAPTER 8: THE SOUTH RISES
  {
    id: "dirty-south",
    number: "08",
    title: "The Dirty South",
    subtitle: "Regional independence and bass culture",
    skin: "chrome-heat",
    temporalMarker: "1995-2005",
    epigraph: {
      text: "The South got something to say.",
      source: "Andre 3000, Source Awards acceptance speech (August 3, 1995)"
    },
    narrative: [
      "When OutKast won Best New Rap Group at the 1995 Source Awards, the New York crowd booed. Andre 3000's response—'The South got something to say'—became a rallying cry for an entire region's creative independence.",
      "The South had been building for years. Miami had bass music and 2 Live Crew. Houston had the Geto Boys and Scarface's cinematic storytelling. Memphis had Three 6 Mafia's dark, horror-influenced production. New Orleans had Cash Money and No Limit's independent hustle. Atlanta had Organized Noize's live instrumentation.",
      "These weren't regional variations on a New York template. They were wholly distinct sonic identities. DJ Screw's 'chopped and screwed' technique slowed Houston rap to a syrup-thick crawl. Lil Jon's crunk turned Atlanta clubs into mosh pits. Miami bass made cars bounce.",
      "Master P and Cash Money proved the business model too. By owning their masters, controlling distribution, and keeping operations local, they built empires that rivaled major labels. Master P appeared on Forbes's list of highest-paid entertainers in 1998."
    ],
    figures: [
      {
        name: "Andre Benjamin",
        stageName: "Andre 3000",
        epithet: "Three Stacks",
        born: "1975",
        role: "MC",
        contributions: "OutKast co-founder; pushed hip-hop's sonic and thematic boundaries further than anyone since. 'The South got something to say.'",
        quote: "The South got something to say.",
        quoteSource: "Source Awards (1995)"
      },
      {
        name: "Antwan Patton",
        stageName: "Big Boi",
        epithet: "Sir Lucious Left Foot",
        born: "1975",
        role: "MC",
        contributions: "OutKast co-founder; grounded the group's experimentation with street credibility and lyrical precision.",
        quote: "ATLiens, but we still the realest.",
        quoteSource: "'ATLiens' (1996)"
      },
      {
        name: "Brad Jordan",
        stageName: "Scarface",
        epithet: "The Southern Storyteller",
        born: "1970",
        role: "MC",
        contributions: "Geto Boys member; pioneered cinematic, long-form narrative in Southern hip-hop.",
        quote: "Down South, we tell stories. Long stories. We don't do 16 bars—we do four minutes, five minutes. We paint a picture.",
        quoteSource: "Hip-Hop Evolution (2016)"
      },
      {
        name: "Robert Earl Davis Jr.",
        stageName: "DJ Screw",
        epithet: "The Originator",
        born: "1971",
        died: "2000",
        role: "DJ/Producer",
        contributions: "Invented 'chopped and screwed' technique that defined Houston hip-hop. His mixtapes created the template for regional scene documentation.",
        quote: "Music sounds better chopped and screwed. You hear things you never heard before.",
        quoteSource: "DJ Screw documentary (2006)"
      },
      {
        name: "Percy Miller",
        stageName: "Master P",
        epithet: "The Colonel",
        born: "1970",
        role: "MC/Executive",
        contributions: "Built No Limit Records into an independent empire; proved Southern hip-hop could compete commercially with majors.",
        quote: "I treated rap like a business from day one. I owned my masters, distributed my own records, and kept my money in the family.",
        quoteSource: "Forbes interview (1999)"
      }
    ],
    timeline: [
      {
        date: "August 3, 1995",
        title: "'The South Got Something to Say'",
        description: "OutKast accepts Source Award to boos; Andre 3000's response becomes a rallying cry.",
        source: "Source Awards broadcast"
      },
      {
        date: "1996",
        title: "'ATLiens' Establishes Atlanta",
        description: "OutKast's second album proves Southern hip-hop can be artistically ambitious.",
        source: "LaFace Records"
      },
      {
        date: "1998",
        title: "Master P on Forbes",
        description: "Master P becomes one of the highest-paid entertainers in America through independent distribution.",
        source: "Forbes"
      },
      {
        date: "2000",
        title: "DJ Screw Dies",
        description: "The inventor of chopped and screwed dies at 29; his influence only grows.",
        source: "News reports"
      },
      {
        date: "2003",
        title: "'Speakerboxxx/The Love Below'",
        description: "OutKast's double album wins Album of the Year at the Grammys; 'Hey Ya!' dominates pop radio.",
        source: "Recording Academy"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Andre_Benjamin.jpg",
      alt: "Andre 3000 of OutKast, whose 'The South got something to say' declaration changed hip-hop geography",
      attribution: "Wikimedia Commons, CC BY 2.0"
    }
  },

  // Continuing with remaining chapters...
  // CHAPTER 9: JAY-Z AND THE BUSINESS OF RAP
  {
    id: "business",
    number: "09",
    title: "The Business",
    subtitle: "When rappers became moguls",
    skin: "luxury-minimal",
    temporalMarker: "1996-2010",
    epigraph: {
      text: "I'm not a businessman. I'm a business, man.",
      source: "Jay-Z, 'Diamonds from Sierra Leone (Remix)' (2005)"
    },
    narrative: [
      "After Biggie and Tupac died, hip-hop faced an existential question: could the culture survive without destroying itself? Jay-Z answered by turning hip-hop into an industry—and himself into a brand.",
      "Shawn Carter came up hustling in Brooklyn's Marcy Projects. When major labels passed on him, he co-founded Roc-A-Fella Records with Damon Dash and Kareem 'Biggs' Burke. 'Reasonable Doubt' (1996) established his credentials; the string of platinum albums that followed made him impossible to ignore.",
      "But Jay-Z's real innovation was off the record. He didn't just rap about Cristal and Maybach—he accumulated ownership stakes, endorsement deals, and eventually equity in ventures from clothing (Rocawear) to sports (the Brooklyn Nets) to streaming (Tidal). He made 'mogul' a hip-hop job title.",
      "The 50 Cent/Vitamin Water deal, Diddy's liquor empire, Dr. Dre's Beats headphones—hip-hop artists realized their brands were worth more than their music. The genre had come a long way from block parties in the Bronx."
    ],
    figures: [
      {
        name: "Shawn Carter",
        stageName: "Jay-Z",
        epithet: "Hov",
        born: "1969",
        role: "MC/Executive",
        contributions: "Proved rappers could be billionaires. 14 #1 albums. Roc-A-Fella, Rocawear, Roc Nation, Tidal. The blueprint for hip-hop business.",
        quote: "I'm not a businessman. I'm a business, man.",
        quoteSource: "'Diamonds from Sierra Leone (Remix)' (2005)"
      },
      {
        name: "Curtis Jackson",
        stageName: "50 Cent",
        epithet: "The Hustler",
        born: "1975",
        role: "MC/Executive",
        contributions: "'Get Rich or Die Tryin'' sold 12 million copies. Vitamin Water equity stake worth $100M+. G-Unit brand.",
        quote: "Get rich or die tryin'.",
        quoteSource: "Album title (2003)"
      },
      {
        name: "Kanye West",
        stageName: "Ye",
        epithet: "The Dropout",
        born: "1977",
        role: "Producer/MC",
        contributions: "Proved rappers didn't need street credibility. Sped up soul samples for Jay-Z; 'The College Dropout' (2004) redefined hip-hop's sonic palette.",
        quote: "George Bush doesn't care about Black people.",
        quoteSource: "Hurricane Katrina telethon (2005)"
      }
    ],
    timeline: [
      {
        date: "1996",
        title: "'Reasonable Doubt'",
        description: "Jay-Z's debut on Roc-A-Fella Records begins his rise.",
        source: "Roc-A-Fella/Priority"
      },
      {
        date: "2003",
        title: "'Get Rich or Die Tryin''",
        description: "50 Cent's Eminem/Dre-backed debut sells 872,000 copies in first week.",
        source: "Interscope Records"
      },
      {
        date: "2004",
        title: "'The College Dropout'",
        description: "Kanye West's debut challenges gangsta rap's dominance with soulful production and personal lyrics.",
        source: "Roc-A-Fella/Def Jam"
      },
      {
        date: "2007",
        title: "50 Cent's Vitamin Water Deal",
        description: "50 Cent's equity stake in Vitamin Water yields $100M+ when Coca-Cola acquires Glacéau.",
        source: "Business records"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Jay-Z_%40_Shawn_%27Jay-Z%27_Carter_Foundation_Carnival_%28crop_2%29.jpg",
      alt: "Jay-Z, who transformed hip-hop artists into business moguls",
      attribution: "Photo by Joella Marano, Wikimedia Commons, CC BY-SA 2.0"
    }
  },

  // CHAPTER 10: TRAP TAKES OVER
  {
    id: "trap",
    number: "10",
    title: "Trap Architecture",
    subtitle: "The 808 rewrites everything",
    skin: "trap-architecture",
    temporalMarker: "2003-2018",
    epigraph: {
      text: "The beat has to feel like something. If it doesn't make your head nod or your heart feel something, it doesn't matter how clever it is.",
      source: "Pharrell Williams, Masterclass (2017)"
    },
    narrative: [
      "In the early 2000s, a sound emerged from Atlanta strip clubs that would eventually swallow hip-hop whole. Trap music—named for the houses where drugs were sold—took the Roland TR-808's booming bass and rapid-fire hi-hats and built an entire sonic architecture.",
      "T.I.'s 'Trap Muzik' (2003) named the genre. Young Jeezy's 'Let's Get It: Thug Motivation 101' (2005) perfected the formula. Gucci Mane's prolific mixtape run established the street canon. But it was the producers—Shawty Redd, Drumma Boy, Lex Luger, eventually Metro Boomin and Zaytoven—who created the sound that would define the 2010s.",
      "Trap wasn't just a subgenre. It was a template. The hi-hat patterns, the 808 rolls, the dark melodic loops—these became the default setting for hip-hop production worldwide. Future's Auto-Tuned vulnerability, Young Thug's melodic inventiveness, Migos' triplet flow—all built on trap's foundation.",
      "By 2018, hip-hop had become the most consumed genre in America, and trap was its dominant dialect. The sound born in Atlanta trap houses now topped charts from Lagos to London to Tokyo."
    ],
    figures: [
      {
        name: "Clifford Harris",
        stageName: "T.I.",
        epithet: "The King of the South",
        born: "1980",
        role: "MC",
        contributions: "'Trap Muzik' (2003) named the genre; combined street credibility with crossover appeal.",
        quote: "I'm the king of the South.",
        quoteSource: "'King' (2006)"
      },
      {
        name: "Radric Davis",
        stageName: "Gucci Mane",
        epithet: "The Trap God",
        born: "1980",
        role: "MC",
        contributions: "Mixtape king who established trap's street canon. 1017 Records incubated talent.",
        quote: "I'm a trap god.",
        quoteSource: "'Trap God' (2012)"
      },
      {
        name: "Nayvadius Wilburn",
        stageName: "Future",
        epithet: "Future Hendrix",
        born: "1983",
        role: "MC",
        contributions: "Merged trap production with Auto-Tuned vulnerability; established the modern melodic rap template.",
        quote: "Mask on, fuck it, mask off.",
        quoteSource: "'Mask Off' (2017)"
      },
      {
        name: "Leland Wayne",
        stageName: "Metro Boomin",
        epithet: "The Producer of the Decade",
        born: "1993",
        role: "Producer",
        contributions: "Defined 2010s trap production with work for Future, Migos, 21 Savage, Drake. 'Metro Boomin want some more!'",
        quote: "If Young Metro don't trust you, I'm gon' shoot you.",
        quoteSource: "Producer tag"
      }
    ],
    timeline: [
      {
        date: "2003",
        title: "'Trap Muzik'",
        description: "T.I. names the genre that will dominate the next two decades.",
        source: "Grand Hustle/Atlantic"
      },
      {
        date: "2005",
        title: "'Thug Motivation 101'",
        description: "Young Jeezy's debut perfects the trap formula.",
        source: "Def Jam"
      },
      {
        date: "2013",
        title: "Migos' 'Versace'",
        description: "The triplet flow goes viral; Drake remix proves crossover potential.",
        source: "Quality Control"
      },
      {
        date: "2017",
        title: "Hip-Hop Becomes #1",
        description: "Nielsen reports hip-hop/R&B is the most consumed genre in America for the first time.",
        source: "Nielsen Music"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/b/be/Roland_TR-808_drum_machine.jpg",
      alt: "The Roland TR-808 drum machine, whose bass kick became the sonic foundation of trap music",
      attribution: "Wikimedia Commons, CC BY-SA 3.0"
    }
  },

  // CHAPTER 11: DRILL
  {
    id: "drill",
    number: "11",
    title: "Drill",
    subtitle: "Cold sound, hot consequences",
    skin: "cctv-frost",
    temporalMarker: "2011-present",
    epigraph: {
      text: "The streets is talking.",
      source: "Chief Keef"
    },
    narrative: [
      "Drill emerged from Chicago's South Side as the city's murder rate spiked in the early 2010s. The music was cold, minimal, nihilistic—sliding 808s, ominous synths, and lyrics that named real people and real conflicts. It wasn't gangsta rap's cinematic storytelling. It was real-time documentation of a war.",
      "Chief Keef was 16 when 'I Don't Like' went viral in 2012. The song, and its remix featuring Kanye West, introduced drill to the world. But drill was also linked to actual violence—beefs that started in songs sometimes ended in shootings. The genre became a case study in the ethics of representation.",
      "Drill migrated. UK drill, emerging from South London around 2012, added its own slang, flows, and production style. By 2020, Brooklyn drill—led by Pop Smoke before his murder at 20—had brought the sound back to New York with new energy.",
      "The genre's relationship with violence remains contested. Is drill a mirror held up to reality, or does it amplify and accelerate conflict? Critics cite songs used as evidence in murder trials. Defenders note that drill artists, like all rappers, are often narrating environments they didn't create."
    ],
    figures: [
      {
        name: "Keith Cozart",
        stageName: "Chief Keef",
        epithet: "The Drill Originator",
        born: "1995",
        role: "MC",
        contributions: "'I Don't Like' (2012) and 'Love Sosa' defined Chicago drill's sound and attitude.",
        quote: "O'Block, 3hunna.",
        quoteSource: "Chief Keef (various)"
      },
      {
        name: "Bashar Jackson",
        stageName: "Pop Smoke",
        epithet: "The Woo",
        born: "1999",
        died: "2020",
        role: "MC",
        contributions: "Brought UK drill production to Brooklyn; 'Welcome to the Party' (2019) launched a new era before his murder at 20.",
        quote: "Woo!",
        quoteSource: "Pop Smoke adlibs"
      }
    ],
    timeline: [
      {
        date: "2011",
        title: "Chicago Drill Emerges",
        description: "King Louie, Lil Durk, and Chief Keef develop the sound on Chicago's South Side.",
        source: "Local Chicago coverage"
      },
      {
        date: "2012",
        title: "'I Don't Like' Goes Viral",
        description: "Chief Keef's breakout; Kanye remix introduces drill to mainstream.",
        source: "Interscope Records"
      },
      {
        date: "2019",
        title: "'Welcome to the Party'",
        description: "Pop Smoke's debut single brings UK drill production to Brooklyn.",
        source: "Victor Victor/Republic"
      },
      {
        date: "February 2020",
        title: "Pop Smoke Killed",
        description: "Pop Smoke murdered in home invasion at 20; posthumous album 'Shoot for the Stars' tops charts.",
        source: "News reports"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/6/64/Chief_Keef_2019_performance.jpg",
      alt: "Chief Keef performing, the artist who brought Chicago drill to worldwide attention",
      attribution: "Wikimedia Commons, CC BY-SA 4.0"
    }
  },

  // CHAPTER 12: INTERNET RAP
  {
    id: "internet-rap",
    number: "12",
    title: "The Algorithm Age",
    subtitle: "When the internet broke the gatekeepers",
    skin: "algorithm-glitch",
    temporalMarker: "2010-present",
    epigraph: {
      text: "Hip-hop is supposed to be about being different. When did everyone start sounding the same?",
      source: "Tyler, the Creator, Complex (2017)"
    },
    narrative: [
      "The internet didn't just change how rap was distributed. It changed who could make it, who could hear it, and how quickly sounds could rise and fall. SoundCloud, WorldStarHipHop, YouTube, and eventually TikTok created new pathways around traditional gatekeepers.",
      "Odd Future, led by Tyler, the Creator, built a cult following through free mixtapes and provocative videos before any label involvement. Chance the Rapper won Grammys without ever selling an album. Lil B's 'based' philosophy and prolific output created a template for internet-native fame.",
      "SoundCloud rap emerged in the mid-2010s: emo-inflected, lo-fi, often featuring face tattoos and colored dreads. Lil Uzi Vert, XXXTentacion, and Juice WRLD channeled emotional vulnerability through distorted production. The tragic early deaths of XXX and Juice underscored the genre's dark undercurrents.",
      "TikTok further compressed the cycle. Songs could go viral in days, artists could be discovered without ever performing live, and trends could emerge from a 15-second clip. The algorithm replaced the A&R."
    ],
    figures: [
      {
        name: "Tyler Okonma",
        stageName: "Tyler, the Creator",
        epithet: "The Odd One",
        born: "1991",
        role: "MC/Producer",
        contributions: "Built Odd Future through internet presence before label deals; evolved from shock rap to acclaimed artistry on 'Flower Boy' and 'Igor.'",
        quote: "Hip-hop is supposed to be about being different.",
        quoteSource: "Complex (2017)"
      },
      {
        name: "Chancelor Bennett",
        stageName: "Chance the Rapper",
        epithet: "The Independent",
        born: "1993",
        role: "MC",
        contributions: "Won three Grammys for 'Coloring Book' without ever selling an album; proved streaming-only model could achieve critical success.",
        quote: "I don't make songs for free, I make them for freedom.",
        quoteSource: "'Blessings' (2016)"
      },
      {
        name: "Jahseh Onfroy",
        stageName: "XXXTentacion",
        epithet: "The Troubled Genius",
        born: "1998",
        died: "2018",
        role: "MC",
        contributions: "Pioneered emo-rap's emotional vulnerability; '17' and '?' achieved platinum status. Murdered at 20.",
        quote: "Pain is temporary.",
        quoteSource: "XXXTentacion"
      }
    ],
    timeline: [
      {
        date: "2010",
        title: "Odd Future Emerges",
        description: "Tyler, the Creator and Odd Future build following through free internet content.",
        source: "Odd Future records"
      },
      {
        date: "2017",
        title: "'Coloring Book' Wins Grammys",
        description: "Chance the Rapper wins Best Rap Album for a streaming-only release.",
        source: "Recording Academy"
      },
      {
        date: "2018",
        title: "XXXTentacion Killed",
        description: "XXXTentacion murdered at 20 in Florida; posthumous releases continue.",
        source: "News reports"
      },
      {
        date: "2020",
        title: "TikTok Dominance",
        description: "TikTok becomes primary discovery platform for new hip-hop; Lil Nas X's 'Old Town Road' had already proved the model.",
        source: "Industry analysis"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Tyler%2C_The_Creator_%288048745695%29_%28cropped%29.jpg",
      alt: "Tyler, the Creator, who built a following through free internet content before label involvement",
      attribution: "Photo by Jason Persse, Wikimedia Commons, CC BY-SA 2.0"
    }
  },

  // CHAPTER 13: GLOBAL RAP
  {
    id: "global",
    number: "13",
    title: "The World's Language",
    subtitle: "When rap stopped being American",
    skin: "global-patchwork",
    temporalMarker: "1990s-present",
    epigraph: {
      text: "Hip-hop has done more for racial relations than most cultural icons. It brings kids together from every race, every background.",
      source: "Kendrick Lamar, GQ (2016)"
    },
    narrative: [
      "Hip-hop was never purely American. Jamaican sound system culture shaped its birth. But as the genre spread globally, it didn't just translate—it transformed. Every scene that adopted hip-hop made it local.",
      "French rap, emerging in the banlieues of Paris, became a voice for North African immigrant communities. Grime, born in East London's pirate radio stations, created a distinctly British MC culture. German rap evolved from political consciousness to gangsta narratives. Brazilian funk carioca merged Miami bass with favela energy.",
      "By the 2010s, hip-hop scenes existed on every continent. Korean hip-hop produced globally successful artists. Nigerian Afrobeats increasingly merged with American rap. South African 'gqom' influenced producers worldwide. Reggaeton and Latin trap made Spanish-language rap competitive with English.",
      "The question of authenticity became global. Could you be a 'real' rapper without ever setting foot in America? The answer, increasingly, was yes. Local scenes developed their own hierarchies, their own legends, their own standards—while remaining in conversation with hip-hop's American origins."
    ],
    figures: [
      {
        name: "MC Solaar",
        epithet: "The French Pioneer",
        born: "1969",
        role: "MC",
        contributions: "Brought hip-hop to French mainstream in the 1990s; proved rap could work in French language.",
        quote: "Prose combat.",
        quoteSource: "'Prose Combat' (1994)"
      },
      {
        name: "Skepta",
        epithet: "The Grime King",
        born: "1982",
        role: "MC",
        contributions: "Led grime's international breakthrough; 'Shutdown' (2015) brought UK scene to global attention.",
        quote: "That's not me.",
        quoteSource: "'That's Not Me' (2014)"
      },
      {
        name: "Bad Bunny",
        stageName: "Bad Bunny",
        epithet: "El Conejo Malo",
        born: "1994",
        role: "MC",
        contributions: "Made Latin trap globally dominant; most-streamed artist on Spotify multiple years running.",
        quote: "Yo perreo sola.",
        quoteSource: "'Yo Perreo Sola' (2020)"
      }
    ],
    timeline: [
      {
        date: "1991",
        title: "MC Solaar Breaks in France",
        description: "'Qui Sème le Vent Récolte le Tempo' proves French-language rap can succeed commercially.",
        source: "French chart data"
      },
      {
        date: "2003",
        title: "Grime Emerges in London",
        description: "Dizzee Rascal's 'Boy in da Corner' wins Mercury Prize; grime gains critical recognition.",
        source: "Mercury Prize"
      },
      {
        date: "2017",
        title: "'Despacito' Dominates",
        description: "Luis Fonsi and Daddy Yankee's track (with Justin Bieber remix) becomes most-viewed YouTube video ever.",
        source: "YouTube data"
      },
      {
        date: "2020",
        title: "Bad Bunny Most-Streamed",
        description: "A Spanish-language rapper becomes the most-streamed artist globally.",
        source: "Spotify data"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/8/85/Skepta_2_F.I.B._2016.jpg",
      alt: "Skepta performing, representing UK grime's global breakthrough",
      attribution: "Photo by Raph_PH, Wikimedia Commons, CC BY 2.0"
    }
  },

  // CHAPTER 14: KENDRICK AND THE NEW CANON
  {
    id: "new-canon",
    number: "14",
    title: "The New Canon",
    subtitle: "Hip-hop as literature",
    skin: "luxury-minimal",
    temporalMarker: "2010-present",
    epigraph: {
      text: "I treat every verse like it's going to be studied. Every word has to mean something.",
      source: "Kendrick Lamar, Rolling Stone (2015)"
    },
    narrative: [
      "In 2018, Kendrick Lamar won the Pulitzer Prize for Music for 'DAMN.' It was the first time a non-classical or jazz work had received the award. The committee cited the album's 'vernacular authenticity and rhythmic dynamism that offers affecting vignettes capturing the complexity of modern African-American life.'",
      "The Pulitzer represented something larger: hip-hop's recognition as serious art. After decades of dismissal by cultural gatekeepers, rap had earned the academy's highest honor. But Kendrick hadn't waited for permission. 'good kid, m.A.A.d city' (2012) and 'To Pimp a Butterfly' (2015) had already established him as his generation's most ambitious artist.",
      "Kendrick's success opened space for other artists pursuing depth over trend-chasing. J. Cole proved conscious rap could sell. Tyler, the Creator evolved from shock value to sophisticated composition. Even as trap dominated streaming, there remained appetite for substance.",
      "The debate over hip-hop's literary merit was over. The question now was which artists would join the canon—and who would write the next chapter."
    ],
    figures: [
      {
        name: "Kendrick Lamar Duckworth",
        stageName: "Kendrick Lamar",
        epithet: "Kung Fu Kenny",
        born: "1987",
        role: "MC",
        contributions: "First rapper to win Pulitzer Prize for Music. 'To Pimp a Butterfly' and 'DAMN.' established new literary standards.",
        quote: "I treat every verse like it's going to be studied. Every word has to mean something.",
        quoteSource: "Rolling Stone (2015)"
      },
      {
        name: "Jermaine Cole",
        stageName: "J. Cole",
        epithet: "The Dreamvillain",
        born: "1985",
        role: "MC/Producer",
        contributions: "'2014 Forest Hills Drive' went platinum with no features; proved conscious rap could dominate commercially.",
        quote: "There's a difference between being popular and being important. I'd rather be the second one.",
        quoteSource: "Angie Martinez Show (2014)"
      }
    ],
    timeline: [
      {
        date: "October 2012",
        title: "'good kid, m.A.A.d city'",
        description: "Kendrick's major label debut is immediately hailed as a classic.",
        source: "Interscope/Aftermath/TDE"
      },
      {
        date: "March 2015",
        title: "'To Pimp a Butterfly'",
        description: "Kendrick's jazz-funk opus becomes the critical benchmark for the decade.",
        source: "Interscope/Aftermath/TDE"
      },
      {
        date: "April 2018",
        title: "Pulitzer Prize",
        description: "Kendrick Lamar wins Pulitzer Prize for Music for 'DAMN.'—the first non-classical/jazz winner.",
        source: "Pulitzer Prize Board"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/c/cc/KendrickSZASPurs230725-144_%28cropped%29.jpg",
      alt: "Kendrick Lamar, the first rapper to win the Pulitzer Prize for Music",
      attribution: "Wikimedia Commons, CC BY-SA 2.0"
    }
  },

  // CHAPTER 15: WOMEN IN RAP
  {
    id: "women",
    number: "15",
    title: "Queens",
    subtitle: "Women who built hip-hop",
    skin: "tv-gloss",
    temporalMarker: "1984-present",
    epigraph: {
      text: "Women in hip-hop don't need protection. We need opportunity. Give us the microphone and get out the way.",
      source: "Megan Thee Stallion, Rolling Stone (2020)"
    },
    narrative: [
      "Women have been central to hip-hop since before it had a name. Cindy Campbell co-hosted the 1520 Sedgwick Avenue party that started it all. Sha-Rock of the Funky 4 + 1 was the first female MC to record with a major label. But the history keeps getting written without them.",
      "Roxanne Shanté was 14 when 'Roxanne's Revenge' (1984) answered UTFO's 'Roxanne, Roxanne' and ignited the Roxanne Wars—hip-hop's first major beef. Salt-N-Pepa made hip-hop safe for pop radio. MC Lyte became the first female solo rapper to release a full album. Queen Latifah's 'U.N.I.T.Y.' (1993) called out misogyny in the culture.",
      "Lil' Kim and Foxy Brown brought explicit sexuality to female rap in the late '90s, claiming space previously reserved for male bravado. Missy Elliott proved women could be visionary producers and directors. Lauryn Hill's 'The Miseducation of Lauryn Hill' (1998) won Album of the Year at the Grammys.",
      "The 2010s and 2020s brought a new wave: Nicki Minaj dominated for a decade. Cardi B became the first solo female rapper to top the Billboard Hot 100 since 1998. Megan Thee Stallion, Doja Cat, and City Girls proved the lane was wider than ever. But the fight for equal recognition continues."
    ],
    figures: [
      {
        name: "Lolita Shanté Gooden",
        stageName: "Roxanne Shanté",
        epithet: "The Battle Rap Pioneer",
        born: "1969",
        role: "MC",
        contributions: "At 14, recorded 'Roxanne's Revenge' (1984); first female battle rapper to achieve fame.",
        quote: "Go on, girl.",
        quoteSource: "'Roxanne's Revenge'"
      },
      {
        name: "Onika Maraj",
        stageName: "Nicki Minaj",
        epithet: "The Queen",
        born: "1982",
        role: "MC",
        contributions: "Dominated female rap for a decade; proved women could match male sales and acclaim.",
        quote: "I'm a bad bitch, I'm a, I'm a bad bitch.",
        quoteSource: "'Feeling Myself' (2014)"
      },
      {
        name: "Belcalis Almanzar",
        stageName: "Cardi B",
        epithet: "The Bronx Bombshell",
        born: "1992",
        role: "MC",
        contributions: "'Bodak Yellow' (2017) first female solo #1 since Lauryn Hill. Grammy winner.",
        quote: "I don't pretend to be somebody I'm not. That's why people connect with me.",
        quoteSource: "Vogue (2018)"
      },
      {
        name: "Megan Pete",
        stageName: "Megan Thee Stallion",
        epithet: "Hot Girl Meg",
        born: "1995",
        role: "MC",
        contributions: "'Savage' remix with Beyoncé topped charts; Grammy winner; continues fighting for women's space in hip-hop.",
        quote: "Women in hip-hop don't need protection. We need opportunity.",
        quoteSource: "Rolling Stone (2020)"
      },
      {
        name: "Lauryn Hill",
        epithet: "L-Boogie",
        born: "1975",
        role: "MC",
        contributions: "'The Miseducation of Lauryn Hill' (1998) won Album of the Year—first hip-hop album to do so.",
        quote: "It could all be so simple.",
        quoteSource: "'Ex-Factor' (1998)"
      }
    ],
    timeline: [
      {
        date: "1984",
        title: "'Roxanne's Revenge'",
        description: "14-year-old Roxanne Shanté's answer record ignites the Roxanne Wars.",
        source: "Pop Art Records"
      },
      {
        date: "1993",
        title: "'U.N.I.T.Y.'",
        description: "Queen Latifah's feminist anthem wins Grammy for Best Rap Solo Performance.",
        source: "Recording Academy"
      },
      {
        date: "1999",
        title: "'The Miseducation' Makes History",
        description: "Lauryn Hill's album wins Album of the Year at the Grammys.",
        source: "Recording Academy"
      },
      {
        date: "2017",
        title: "'Bodak Yellow' Tops Charts",
        description: "Cardi B becomes first solo female rapper at #1 since Lauryn Hill in 1998.",
        source: "Billboard"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Queen_Latifah_by_Gage_Skidmore.jpg",
      alt: "Queen Latifah, pioneering feminist voice in hip-hop whose 'U.N.I.T.Y.' called out misogyny in the culture",
      attribution: "Photo by Gage Skidmore, Wikimedia Commons, CC BY-SA 3.0"
    }
  },

  // EPILOGUE
  {
    id: "epilogue",
    number: "∞",
    title: "The Last Bar Is a Door",
    subtitle: "Hip-hop now and next",
    skin: "trap-architecture",
    temporalMarker: "2024 and beyond",
    epigraph: {
      text: "Hip-hop is the dominant cultural force of the post-civil rights era.",
      source: "Nelson George, Hip Hop America (1998)"
    },
    narrative: [
      "Fifty years after DJ Kool Herc's back-to-school party, hip-hop is the world's most consumed genre. Its grammar shapes pop music globally. Its fashion dictates streetwear. Its slang becomes mainstream English. Its artists are billionaires, Oscar winners, fashion designers, sports team owners.",
      "The kids in the Bronx who invented hip-hop with nothing but turntables and voices created the dominant culture of the 21st century. Not by asking permission. Not by waiting for recognition. By making something so powerful that the world had no choice but to pay attention.",
      "What comes next? Hip-hop has always been about innovation—taking what exists and making it new. The next generation will sample, remix, and reinvent just as every generation before them has. The technology will change. The sounds will change. But the impulse—to take the microphone and tell your truth—remains.",
      "The last bar is always a door. The beat goes on."
    ],
    figures: [],
    timeline: [],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Future_-_Openair_Frauenfeld_2019_05.jpg",
      alt: "Future performing, representing hip-hop's continued evolution and global dominance",
      attribution: "Photo by Openair Frauenfeld, Wikimedia Commons, CC BY-SA 2.0"
    }
  }
];

// ==================== GLOSSARY DATA ====================

const glossaryTerms = [
  // Foundational Terms
  { term: "Hip-Hop", definition: "The broader culture encompassing four elements: DJing, MCing (rapping), graffiti art, and breaking (breakdancing). Originated in the South Bronx in the early 1970s.", era: "origins" },
  { term: "Rap", definition: "The vocal art form of rhythmic speech over beats. As KRS-One stated: 'Rap is something you do. Hip-hop is something you live.'", era: "origins" },
  { term: "MC", definition: "Master of Ceremonies or Mic Controller. The person who raps; originally the host who kept the crowd engaged while the DJ played.", era: "origins" },
  { term: "DJ", definition: "Disc Jockey. In hip-hop, the artist who manipulates records on turntables to create beats and sounds.", era: "origins" },
  { term: "B-Boy/B-Girl", definition: "Break-boy or break-girl. Dancers who perform during the 'break' section of songs; practitioners of breaking.", era: "origins" },
  { term: "Breaking", definition: "The original hip-hop dance form, featuring athletic floor work, freezes, and power moves. Often incorrectly called 'breakdancing.'", era: "origins" },

  // DJ Techniques
  { term: "Breakbeat", definition: "The percussion-heavy section of a funk or soul record that DJs isolate and extend. DJ Kool Herc invented the technique of looping breaks in 1973.", era: "origins" },
  { term: "Merry-Go-Round", definition: "DJ Kool Herc's technique of using two copies of the same record to extend the break indefinitely by switching between turntables.", era: "origins" },
  { term: "Scratching", definition: "Moving a vinyl record back and forth under the needle to create rhythmic sounds. Invented by Grand Wizard Theodore in 1977.", era: "origins" },
  { term: "Quick Mix Theory", definition: "Grandmaster Flash's systematic approach to DJing, including punch phrasing, cutting, and using headphones to cue records precisely.", era: "origins" },
  { term: "Beat Juggling", definition: "Advanced DJ technique of manipulating two copies of a record to create new rhythms and patterns.", era: "golden-age" },
  { term: "Turntablism", definition: "The art of using turntables as musical instruments rather than just playback devices.", era: "golden-age" },

  // Lyrical Terms
  { term: "Flow", definition: "The rhythmic pattern and delivery style of a rapper. How words ride the beat.", era: "golden-age" },
  { term: "Bars", definition: "Lines of rap lyrics. A standard verse is typically 16 bars. 'Spitting bars' means rapping.", era: "golden-age" },
  { term: "Verse", definition: "A section of a rap song where the MC delivers their lyrics, typically 16 bars.", era: "recording" },
  { term: "Hook", definition: "The catchy, repeated section of a song; the chorus.", era: "recording" },
  { term: "Freestyle", definition: "Improvised rapping, either completely off the top of the head or using pre-written material in a spontaneous context.", era: "golden-age" },
  { term: "Ghostwriter", definition: "A writer who creates lyrics for another artist without public credit.", era: "commercial" },
  { term: "Multisyllabic Rhyming", definition: "Rhyming multiple syllables within words rather than just end sounds. Pioneered by Rakim and Big Daddy Kane.", era: "golden-age" },
  { term: "Internal Rhyme", definition: "Rhymes placed within the middle of lines rather than only at the end. Rakim revolutionized this technique.", era: "golden-age" },
  { term: "Punchline", definition: "A clever line designed for impact, often the culmination of a setup. Central to battle rap.", era: "golden-age" },
  { term: "Wordplay", definition: "Clever manipulation of language including double meanings, homophones, and metaphors.", era: "golden-age" },

  // Production Terms
  { term: "Beat", definition: "The instrumental track that an MC raps over. Created by a producer.", era: "recording" },
  { term: "Sample", definition: "A portion of a previously recorded song used in a new composition. Central to hip-hop production.", era: "golden-age" },
  { term: "Chopping", definition: "Cutting a sample into smaller pieces and rearranging them to create new patterns.", era: "golden-age" },
  { term: "Loop", definition: "A repeating section of music, often a sampled break or drum pattern.", era: "origins" },
  { term: "808", definition: "The Roland TR-808 drum machine. Its booming bass drum and crisp hi-hats define trap and modern hip-hop.", era: "trap" },
  { term: "MPC", definition: "Music Production Center. Akai's sampling workstation that became the standard hip-hop production tool.", era: "golden-age" },
  { term: "SP-1200", definition: "E-mu's sampler/sequencer known for its gritty sound. Defined the boom-bap era.", era: "golden-age" },
  { term: "Boom-Bap", definition: "The hard-hitting, sample-based production style of Golden Age New York hip-hop. Named for the kick-snare pattern.", era: "golden-age" },
  { term: "G-Funk", definition: "The melodic, synthesizer-heavy West Coast production style pioneered by Dr. Dre on 'The Chronic' (1992).", era: "gangsta" },
  { term: "Chopped and Screwed", definition: "Houston production technique invented by DJ Screw: slowing tracks to 60-70 BPM and 'chopping' in stuttered effects.", era: "southern" },
  { term: "Trap Beat", definition: "Production style featuring 808 bass, rapid hi-hats, dark melodies, and heavy use of synthesizers. Originated in Atlanta.", era: "trap" },

  // Subgenres and Styles
  { term: "Conscious Rap", definition: "Hip-hop focused on social issues, politics, and Black empowerment. Exemplified by Public Enemy, KRS-One.", era: "golden-age" },
  { term: "Gangsta Rap", definition: "Subgenre depicting street life, violence, and conflict with authorities. Pioneered by Ice-T and N.W.A.", era: "gangsta" },
  { term: "Mafioso Rap", definition: "Subgenre using organized crime imagery and storytelling. Pioneered by Kool G Rap.", era: "gangsta" },
  { term: "Horrorcore", definition: "Subgenre featuring horror movie imagery, violence, and dark themes.", era: "gangsta" },
  { term: "Crunk", definition: "High-energy Southern style emphasizing call-and-response and aggressive delivery. Popularized by Lil Jon.", era: "southern" },
  { term: "Snap Music", definition: "Minimalist Atlanta style featuring finger snaps as percussion. 'Lean wit It, Rock wit It' era.", era: "southern" },
  { term: "Trap", definition: "Atlanta-originated style named for drug houses. Characterized by 808s, hi-hat rolls, and dark melodies.", era: "trap" },
  { term: "Drill", definition: "Chicago-originated style featuring dark, minimal production and lyrics about street violence. Later spread to UK and Brooklyn.", era: "drill" },
  { term: "Mumble Rap", definition: "Derogatory term for melodic trap where lyrics are secondary to flow and vibe. Contested terminology.", era: "modern" },
  { term: "Emo Rap", definition: "Fusion of hip-hop with emo and punk aesthetics, featuring vulnerable lyrics about depression and heartbreak.", era: "internet" },
  { term: "Cloud Rap", definition: "Atmospheric, hazy production style pioneered by Lil B, Clams Casino, and A$AP Rocky.", era: "internet" },

  // Industry Terms
  { term: "A&R", definition: "Artists and Repertoire. Label executives who discover talent and oversee recording.", era: "recording" },
  { term: "360 Deal", definition: "Record contract where labels take percentage of all revenue streams, not just records.", era: "commercial" },
  { term: "Masters", definition: "The original recordings. Owning your masters means controlling your music's future.", era: "commercial" },
  { term: "Publishing", definition: "Rights to the underlying composition. Separate from master recording ownership.", era: "commercial" },
  { term: "Mixtape", definition: "Originally: DJ-compiled collections. Later: free promotional albums by artists. Circumvented label control.", era: "mixtape" },
  { term: "Street Single", definition: "A track released independently to build buzz before official label release.", era: "mixtape" },
  { term: "Feature", definition: "A guest appearance by another artist on a track.", era: "commercial" },

  // Cultural Terms
  { term: "Cipher", definition: "A circle of MCs freestyling in turn. A foundational hip-hop practice.", era: "origins" },
  { term: "Battle Rap", definition: "Competitive rapping where MCs trade insults and demonstrate lyrical superiority.", era: "origins" },
  { term: "Diss Track", definition: "A song attacking another artist. Part of hip-hop's competitive tradition.", era: "golden-age" },
  { term: "Beef", definition: "A public feud between artists, often played out through diss tracks.", era: "gangsta" },
  { term: "Keeping It Real", definition: "Maintaining authenticity to one's background and experiences.", era: "gangsta" },
  { term: "Street Credibility", definition: "Authenticity derived from actual experience in the environments rappers describe.", era: "gangsta" },
  { term: "The Culture", definition: "Hip-hop as a way of life, not just music. Encompasses fashion, language, values.", era: "origins" },
  { term: "Four Elements", definition: "The foundational pillars of hip-hop: DJing, MCing, breaking, and graffiti.", era: "origins" },
  { term: "Fifth Element", definition: "Knowledge/consciousness, sometimes cited as the philosophical fifth pillar of hip-hop.", era: "golden-age" },

  // Slang Terms
  { term: "Dope", definition: "Excellent, impressive. Originally referred to drugs but became general praise.", era: "golden-age" },
  { term: "Wack", definition: "Weak, unimpressive, lacking skill or authenticity.", era: "golden-age" },
  { term: "Fresh", definition: "New, innovative, stylish. One of hip-hop's earliest superlatives.", era: "origins" },
  { term: "Ill", definition: "Exceptionally skilled or impressive. 'Illmatic' = masterful.", era: "golden-age" },
  { term: "Def", definition: "Excellent, cool. Origin of 'Def Jam' label name.", era: "recording" },
  { term: "Fly", definition: "Stylish, attractive, impressive in appearance or presentation.", era: "origins" },
  { term: "Word", definition: "Affirmation meaning 'truth' or 'I agree.' Also: 'word is bond.'", era: "golden-age" },
  { term: "Props", definition: "Respect, recognition. Short for 'proper respect.'", era: "golden-age" },
  { term: "Frontin'", definition: "Faking, pretending to be something you're not.", era: "golden-age" },
  { term: "Biting", definition: "Copying another artist's style or lyrics without credit.", era: "golden-age" },
  { term: "Drip", definition: "Style, fashionable appearance. Modern term for being well-dressed.", era: "trap" },
  { term: "Cap/No Cap", definition: "Lie/truth. 'No cap' means 'I'm not lying.'", era: "trap" },

  // Regional Terms
  { term: "Dirty South", definition: "The Southern hip-hop movement, particularly Atlanta, Houston, Memphis, New Orleans.", era: "southern" },
  { term: "Third Coast", definition: "The South as hip-hop's third major region after East and West coasts.", era: "southern" },
  { term: "Hyphy", definition: "Bay Area movement emphasizing energetic, uninhibited behavior and 'going dumb.'", era: "southern" },
  { term: "Bounce", definition: "New Orleans style featuring call-and-response and the 'Triggerman' beat.", era: "southern" },
  { term: "Screw Tape", definition: "A mixtape in DJ Screw's chopped and screwed style.", era: "southern" },
  { term: "Grime", definition: "UK genre blending hip-hop, UK garage, and dancehall. Faster BPM than American hip-hop.", era: "global" },
  { term: "UK Drill", definition: "British adaptation of Chicago drill, featuring sliding 808s and distinct slang.", era: "drill" },

  // Modern/Digital Terms
  { term: "SoundCloud Rap", definition: "Lo-fi, internet-native hip-hop that emerged on SoundCloud circa 2015.", era: "internet" },
  { term: "Plugg", definition: "Production style featuring atmospheric, video-game-influenced beats.", era: "internet" },
  { term: "Type Beat", definition: "Instrumentals created in the style of a specific artist, sold online to rappers.", era: "internet" },
  { term: "Viral", definition: "Rapid spread through social media. TikTok now drives much chart success.", era: "internet" },
  { term: "Drop", definition: "To release music. 'Dropping an album' or 'the beat drops.'", era: "modern" },
  { term: "Streaming", definition: "Digital music consumption via platforms like Spotify, Apple Music. Replaced physical sales.", era: "modern" },

  // Recording Terms
  { term: "Adlibs", definition: "Vocal additions like 'yeah,' 'uh,' or signature phrases layered behind main vocals.", era: "recording" },
  { term: "Hook", definition: "The catchy, repeated chorus of a song.", era: "recording" },
  { term: "Bridge", definition: "A transitional section connecting verse and chorus.", era: "recording" },
  { term: "Outro", definition: "The closing section of a track.", era: "recording" },
  { term: "Producer Tag", definition: "Audio signature identifying a producer ('Metro Boomin want some more!').", era: "trap" },
  { term: "Auto-Tune", definition: "Pitch correction software used as an artistic effect. Popularized by T-Pain, now ubiquitous.", era: "modern" },
];

// ==================== SOURCES DATA ====================

const sourcesByCategory = {
  academicBooks: [
    { title: "Can't Stop Won't Stop: A History of the Hip-Hop Generation", author: "Jeff Chang", year: "2005", publisher: "St. Martin's Press", url: "https://books.google.com/books/about/Can_t_Stop_Won_t_Stop.html?id=4aofRcBRvMgC" },
    { title: "Black Noise: Rap Music and Black Culture in Contemporary America", author: "Tricia Rose", year: "1994", publisher: "Wesleyan University Press", url: "https://www.weslpress.org/9780819562753/black-noise/" },
    { title: "The Big Payback: The History of the Business of Hip-Hop", author: "Dan Charnas", year: "2010", publisher: "NAL", url: "https://books.google.com/books/about/The_Big_Payback.html?id=idYFcmXcRm4C" },
    { title: "Book of Rhymes: The Poetics of Hip Hop", author: "Adam Bradley", year: "2009", publisher: "Basic Civitas Books", url: "https://books.google.com/books/about/Book_of_Rhymes.html?id=mQoJAQAAMAAJ" },
    { title: "Groove Music: The Art and Culture of the Hip-Hop DJ", author: "Mark Katz", year: "2012", publisher: "Oxford University Press", url: "https://global.oup.com/academic/product/groove-music-9780195331127" },
    { title: "Third Coast: OutKast, Timbaland, and How Hip-Hop Became a Southern Thing", author: "Roni Sarig", year: "2007", publisher: "Da Capo Press", url: "https://books.google.com/books/about/Third_Coast.html?id=-f0AAwAAQBAJ" },
    { title: "Check the Technique: Liner Notes for Hip-Hop Junkies", author: "Brian Coleman", year: "2007", publisher: "Villard Books", url: "https://books.google.com/books/about/Check_the_Technique.html?id=QuOBbFeg0JIC" },
    { title: "Hip Hop America", author: "Nelson George", year: "1998", publisher: "Viking", url: "https://books.google.com/books/about/Hip_Hop_America.html?id=-T3aAAAAMAAJ" },
    { title: "Yes Yes Y'all: The Experience Music Project Oral History", author: "Jim Fricke & Charlie Ahearn", year: "2002", publisher: "Da Capo Press", url: "https://books.google.com/books/about/Yes_Yes_Y_all.html?id=fPxDAQAAIAAJ" },
    { title: "The Anthology of Rap", author: "Adam Bradley & Andrew DuBois", year: "2010", publisher: "Yale University Press", url: "https://yalebooks.yale.edu/book/9780300141917/anthology-rap" },
  ],
  archives: [
    { name: "Cornell University Hip-Hop Collection", description: "250,000+ items; largest academic hip-hop archive", url: "https://rmc.library.cornell.edu/hiphop/" },
    { name: "Smithsonian NMAAHC", description: "Musical Crossroads exhibit; CC0 licensing on many images", url: "https://nmaahc.si.edu/" },
    { name: "Rock and Roll Hall of Fame Library and Archives", description: "Inductee archives; photograph collection", url: "https://library.rockhall.com/" },
    { name: "Joe Conzo Jr. Archive", description: "Essential South Bronx origins photography", url: "https://joeconzo.com/" },
    { name: "Janette Beckman Archive", description: "Iconic 1980s hip-hop portraiture", url: "https://janettebeckman.com/" },
  ],
  documentaries: [
    { title: "Wild Style", year: "1983", director: "Charlie Ahearn", note: "First hip-hop film; essential primary source", url: "https://www.imdb.com/title/tt0084904/" },
    { title: "Style Wars", year: "1983", director: "Tony Silver & Henry Chalfant", note: "Essential graffiti/b-boy documentary", url: "https://www.imdb.com/title/tt0177262/" },
    { title: "Hip-Hop Evolution", year: "2016-2020", director: "Darby Wheeler", note: "4-season Netflix series; extensive pioneer interviews", url: "https://www.imdb.com/title/tt6093786/" },
    { title: "The Defiant Ones", year: "2017", director: "Allen Hughes", note: "Dr. Dre and Jimmy Iovine dual biography", url: "https://www.imdb.com/title/tt6958602/" },
    { title: "Beats, Rhymes & Life", year: "2011", director: "Michael Rapaport", note: "A Tribe Called Quest documentary", url: "https://www.imdb.com/title/tt1613023/" },
  ],
  tradePublications: [
    { name: "Billboard Hot Rap Songs", note: "Essential for chart verification; Hot Rap Songs (1989-present)", url: "https://www.billboard.com/charts/hot-rap-songs/" },
    { name: "The Source Magazine", note: "First hip-hop magazine; 5-mic rating system; 1988-2000s essential", url: "https://thesource.com/" },
    { name: "XXL Magazine", note: "Freshmen Class lists; 2000s-present", url: "https://www.xxlmag.com/" },
    { name: "Vibe Magazine", note: "Essential 90s documentation; extensive photography", url: "https://www.vibe.com/" },
    { name: "Rolling Stone Hip-Hop", note: "Mainstream coverage; extensive interview archive", url: "https://www.rollingstone.com/t/hip-hop/" },
    { name: "Complex Music", note: "Digital-native; fashion/culture crossover", url: "https://www.complex.com/music" },
  ],
  imageCredits: [
    { subject: "Susu Griot, c. 1910", source: "Wikimedia Commons", license: "Public Domain", photographer: "Unknown" },
    { subject: "DJ Kool Herc at the Turntables", source: "Wikimedia Commons", license: "Public Domain", photographer: "Bigtimepeace" },
    { subject: "Grandmaster Flash & Furious Five (1982)", source: "Wikimedia Commons", license: "Public Domain", photographer: "Sugar Hill Records press photo" },
    { subject: "Run-DMC and Beastie Boys (1987)", source: "Wikimedia Commons", license: "Public Domain", photographer: "Press photo" },
    { subject: "Eric B. & Rakim (1987)", source: "Wikimedia Commons", license: "Public Domain", photographer: "Press photo" },
    { subject: "Chuck D of Public Enemy", source: "Wikimedia Commons", license: "CC BY-SA 3.0", photographer: "Kim Metso" },
    { subject: "Ice Cube (2012)", source: "Wikimedia Commons", license: "CC BY-SA 2.0", photographer: "Kris Krüg" },
    { subject: "Tupac Shakur", source: "Wikimedia Commons", license: "Public Domain", photographer: "Unknown" },
    { subject: "Andre 3000 of OutKast", source: "Wikimedia Commons", license: "CC BY 2.0", photographer: "Unknown" },
    { subject: "Jay-Z", source: "Wikimedia Commons", license: "CC BY-SA 2.0", photographer: "Joella Marano" },
    { subject: "Roland TR-808 drum machine", source: "Wikimedia Commons", license: "CC BY-SA 3.0", photographer: "Unknown" },
    { subject: "Chief Keef (2019)", source: "Wikimedia Commons", license: "CC BY-SA 4.0", photographer: "Unknown" },
    { subject: "Tyler, the Creator", source: "Wikimedia Commons", license: "CC BY-SA 2.0", photographer: "Jason Persse" },
    { subject: "Skepta", source: "Wikimedia Commons", license: "CC BY 2.0", photographer: "Raph_PH" },
    { subject: "Kendrick Lamar", source: "Wikimedia Commons", license: "CC BY-SA 2.0", photographer: "Unknown" },
    { subject: "Queen Latifah", source: "Wikimedia Commons", license: "CC BY-SA 3.0", photographer: "Gage Skidmore" },
    { subject: "Future", source: "Wikimedia Commons", license: "CC BY-SA 2.0", photographer: "Openair Frauenfeld" },
  ],
};

// ==================== GLOSSARY COMPONENT ====================

const GlossarySection: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories = [
    { id: "origins", label: "Origins (1973-1979)" },
    { id: "golden-age", label: "Golden Age (1986-1996)" },
    { id: "recording", label: "Recording Industry" },
    { id: "gangsta", label: "Gangsta Era" },
    { id: "southern", label: "Southern Hip-Hop" },
    { id: "trap", label: "Trap Era" },
    { id: "drill", label: "Drill" },
    { id: "internet", label: "Internet Era" },
    { id: "modern", label: "Modern Rap" },
    { id: "commercial", label: "Industry & Business" },
    { id: "mixtape", label: "Mixtape Era" },
    { id: "global", label: "Global Hip-Hop" },
  ];

  return (
    <section className="rap-glossary">
      <header className="rap-glossary__header">
        <h2 className="section-title">Glossary</h2>
        <p className="section-subtitle">The Language of Hip-Hop — 90+ Terms</p>
      </header>

      <div className="rap-glossary__categories">
        {categories.map((category) => {
          const terms = glossaryTerms.filter((t) => t.era === category.id);
          const isExpanded = expandedCategory === category.id;

          return (
            <div key={category.id} className="rap-glossary__category">
              <button
                className={`rap-glossary__category-header ${isExpanded ? 'expanded' : ''}`}
                onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
              >
                <span className="rap-glossary__category-label">{category.label}</span>
                <span className="rap-glossary__category-count">{terms.length}</span>
                <svg
                  className="rap-glossary__category-arrow"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {isExpanded && (
                <div className="rap-glossary__terms">
                  {terms.map((item, idx) => (
                    <div key={idx} className="rap-glossary__term">
                      <dt className="rap-glossary__term-name">{item.term}</dt>
                      <dd className="rap-glossary__term-definition">{item.definition}</dd>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

// ==================== SOURCES COMPONENT ====================

const SourcesSection: React.FC = () => {
  return (
    <section className="rap-sources">
      <header className="rap-sources__header">
        <h2 className="section-title">Sources &amp; Further Reading</h2>
      </header>

      <div className="rap-sources__content">
        <div className="rap-sources__category">
          <h3>Academic Sources</h3>
          <ul className="rap-sources__list">
            {sourcesByCategory.academicBooks.map((book, idx) => (
              <li key={idx} className="rap-sources__item">
                {book.author}.{" "}
                <a href={book.url} target="_blank" rel="noopener noreferrer">
                  <em>{book.title}</em>
                </a>
                . {book.publisher}, {book.year}.
              </li>
            ))}
          </ul>
        </div>

        <div className="rap-sources__category">
          <h3>Archives &amp; Collections</h3>
          <ul className="rap-sources__list">
            {sourcesByCategory.archives.map((archive, idx) => (
              <li key={idx} className="rap-sources__item">
                <a href={archive.url} target="_blank" rel="noopener noreferrer">
                  <strong>{archive.name}</strong>
                </a>{" "}
                — {archive.description}
              </li>
            ))}
          </ul>
        </div>

        <div className="rap-sources__category">
          <h3>Essential Documentaries</h3>
          <ul className="rap-sources__list">
            {sourcesByCategory.documentaries.map((doc, idx) => (
              <li key={idx} className="rap-sources__item">
                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                  <em>{doc.title}</em>
                </a>{" "}
                ({doc.year}, dir. {doc.director}). {doc.note}
              </li>
            ))}
          </ul>
        </div>

        <div className="rap-sources__category">
          <h3>Trade Publications</h3>
          <ul className="rap-sources__list">
            {sourcesByCategory.tradePublications.map((pub, idx) => (
              <li key={idx} className="rap-sources__item">
                <a href={pub.url} target="_blank" rel="noopener noreferrer">
                  <strong>{pub.name}</strong>
                </a>{" "}
                — {pub.note}
              </li>
            ))}
          </ul>
        </div>

        <div className="rap-sources__category">
          <h3>Image Credits</h3>
          <ul className="rap-sources__list rap-sources__list--images">
            {sourcesByCategory.imageCredits.map((img, idx) => (
              <li key={idx} className="rap-sources__item">
                <strong>{img.subject}</strong>: {img.photographer !== "Unknown" ? `${img.photographer}, ` : ""}{img.source}. {img.license}.
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

// ==================== COMPONENTS ====================

const ProgressBar: React.FC<{ progress: number; isPlaying: boolean }> = ({ progress, isPlaying }) => {
  return (
    <div className={`rap-progress ${progress > 0.05 ? 'visible' : ''} ${isPlaying ? 'playing' : ''}`}>
      <div className="rap-progress__vinyl" />
      <div
        className="rap-progress__fill"
        style={{ '--progress': progress } as React.CSSProperties}
      />
    </div>
  );
};

const Hero: React.FC = () => {
  const { containerRef, progress, isPinned } = useScrollLock(3);
  const isMobile = useIsMobile();

  const titleOpacity = Math.max(0, 1 - progress * 2);
  const subtitleOpacity = Math.max(0, Math.min(1, (progress - 0.3) * 3));

  return (
    <section className="rap-hero" ref={containerRef}>
      <div className="rap-hero__sticky">
        <div className="rap-hero__background">
          {/* Background image would go here */}
        </div>
        <div className="rap-hero__content">
          <h1
            className="rap-hero__title"
            style={{
              opacity: isMobile ? 1 : titleOpacity,
              transform: isMobile ? 'none' : `scale(${1 + progress * 0.1})`
            }}
          >
            RAP
          </h1>
          <p
            className="rap-hero__subtitle"
            style={{ opacity: isMobile ? 1 : subtitleOpacity }}
          >
            The World&apos;s Loudest Archive
          </p>
        </div>
        {!isMobile && progress < 0.1 && (
          <div className="rap-hero__scroll-indicator">
            <span>Scroll to begin</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        )}
      </div>
    </section>
  );
};

const FigureCard: React.FC<{ figure: Figure }> = ({ figure }) => {
  return (
    <article className="rap-figure-card">
      {figure.imageUrl && (
        <div className="rap-figure-card__image">
          <img src={figure.imageUrl} alt={figure.name} loading="lazy" />
        </div>
      )}
      <div className="rap-figure-card__content">
        <h4 className="rap-figure-card__name">
          {figure.stageName || figure.name}
        </h4>
        <p className="rap-figure-card__epithet">{figure.epithet}</p>
        {(figure.born || figure.died) && (
          <p className="rap-figure-card__dates">
            {figure.born && `b. ${figure.born}`}
            {figure.born && figure.died && ' — '}
            {figure.died && `d. ${figure.died}`}
          </p>
        )}
        <p className="rap-figure-card__description">{figure.contributions}</p>
        {figure.quote && (
          <blockquote className="rap-figure-card__quote">
            &ldquo;{figure.quote}&rdquo;
            {figure.quoteSource && (
              <cite> — {figure.quoteSource}</cite>
            )}
          </blockquote>
        )}
      </div>
    </article>
  );
};

const ChapterComponent: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  return (
    <section
      className={`rap-chapter skin-${chapter.skin}`}
      id={chapter.id}
      data-chapter={chapter.number}
    >
      <header className="rap-chapter__header">
        <p className="rap-chapter__number">Chapter {chapter.number}</p>
        <h2 className="rap-chapter__title chapter-header">{chapter.title}</h2>
        {chapter.subtitle && (
          <p className="rap-chapter__subtitle">{chapter.subtitle}</p>
        )}
        {chapter.temporalMarker && (
          <p className="rap-chapter__temporal">{chapter.temporalMarker}</p>
        )}
      </header>

      {chapter.chapterImage && (
        <figure className="rap-chapter__image chapter-image">
          <img
            src={chapter.chapterImage.url}
            alt={chapter.chapterImage.alt}
            loading="lazy"
          />
          <figcaption className="rap-chapter__image-caption">
            {chapter.chapterImage.alt}. {chapter.chapterImage.attribution}
          </figcaption>
        </figure>
      )}

      {chapter.epigraph && (
        <blockquote className="rap-epigraph">
          <p className="rap-epigraph__text">&ldquo;{chapter.epigraph.text}&rdquo;</p>
          <cite className="rap-epigraph__source">— {chapter.epigraph.source}</cite>
        </blockquote>
      )}

      <div className="rap-narrative">
        {chapter.narrative.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>

      {chapter.figures.length > 0 && (
        <div className="rap-figures">
          {chapter.figures.map((figure, idx) => (
            <FigureCard key={idx} figure={figure} />
          ))}
        </div>
      )}

      {chapter.timeline && chapter.timeline.length > 0 && (
        <div className="rap-timeline">
          {chapter.timeline.map((event, idx) => (
            <div key={idx} className="rap-timeline__event">
              <p className="rap-timeline__date">{event.date}</p>
              <h4 className="rap-timeline__title">{event.title}</h4>
              <p className="rap-timeline__description">{event.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

// ==================== MAIN COMPONENT ====================

const RapHistoryClient: React.FC = () => {
  const readingProgress = useReadingProgress();
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <main className="rap-essay">
      <Hero />

      {CHAPTERS.map((chapter) => (
        <ChapterComponent key={chapter.id} chapter={chapter} />
      ))}

      <GlossarySection />
      <SourcesSection />

      <ProgressBar progress={readingProgress} isPlaying={isScrolling} />
    </main>
  );
};

export default RapHistoryClient;
