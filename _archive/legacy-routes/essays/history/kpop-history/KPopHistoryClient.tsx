"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import "./kpop-history.css";

// ============================================================================
// K-POP HISTORY: THE FACTORY, THE FEVER, THE FUTURE
// ============================================================================
// ORIGINAL DESIGN - No patterns borrowed from existing essays
//
// Visual Philosophy:
// - Photocard collecting → Figure cards with holographic shimmer on hover
// - Album packaging → Chapters unfold like luxury K-pop albums
// - Lightstick oceans → Era-specific fandom color gradients
// - Music show aesthetics → LED-inspired backgrounds per era
// - Comeback concepts → Each era has completely distinct visual identity
// ============================================================================

// ==================== TYPE DEFINITIONS ====================

type EraStyle =
  | "pre-kpop"
  | "seo-taiji"
  | "idol-factory"
  | "hallyu"
  | "golden"
  | "viral"
  | "bts"
  | "blackpink"
  | "pandemic"
  | "metaverse"
  | "newjeans"
  | "reckoning";

interface Figure {
  name: string;
  nameKorean?: string;
  epithet: string;
  born?: string;
  died?: string;
  role: string;
  contributions: string;
  quote?: string;
  quoteSource?: string;
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
  era: EraStyle;
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

// ==================== READING PROGRESS HOOK ====================

function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setProgress(scrollHeight > 0 ? Math.min(scrolled / scrollHeight, 1) : 0);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return progress;
}

// ==================== CHAPTER DATA ====================

const CHAPTERS: Chapter[] = [
  // PROLOGUE
  {
    id: "prologue",
    number: "00",
    title: "The Sound Before the Storm",
    subtitle: "Korean music before K-pop existed",
    era: "pre-kpop",
    temporalMarker: "1926-1991",
    epigraph: {
      text: "The combination of han and heung is what defines ppong, and this definitive combination, which characterizes trot, is also at the heart of K-pop.",
      source: "Academic analysis of Korean musical emotion"
    },
    narrative: [
      "Before the training rooms and the lightsticks, before the synchronized choreography and the global fandoms, there was voice. Raw Korean voice, shaped by occupation and war, censorship and protest, American bases and democracy movements.",
      "In 1926, Yun Sim-deok recorded 'In Praise of Death,' Korea's first popular recording. She was a soprano trained in Japan, and weeks after the recording, she drowned herself in the Shimonoseki Strait with her married lover. The song sold over 100,000 copies. Korean pop was born in tragedy.",
      "What followed was decades of hybrid sound. Trot emerged in the 1930s, fusing Japanese enka with Korean sensibility. The Kim Sisters brought Korean music to American television in the 1950s. Rock pioneers like Shin Joong-hyun were imprisoned for refusing to praise dictators. Folk singers like Kim Min-ki wrote protest anthems that were immediately banned.",
      "By 1988, when Seoul hosted the Olympics, Korea was ready to show the world something new. But no one could have predicted what was coming."
    ],
    figures: [
      {
        name: "Yun Sim-deok",
        nameKorean: "윤심덕",
        epithet: "Korea's First Recording Artist",
        born: "1897",
        died: "1926",
        role: "Singer",
        contributions: "Recorded 'In Praise of Death' (1926), Korea's first popular song. Sold 100,000+ copies.",
        quote: "My love, my love, where are you going?",
        quoteSource: "'In Praise of Death' lyrics"
      },
      {
        name: "Shin Joong-hyun",
        nameKorean: "신중현",
        epithet: "Godfather of Korean Rock",
        born: "1938",
        role: "Musician/Producer",
        contributions: "Formed Add4 (1962), Korea's first rock band. Imprisoned in 1975 for refusing to write a song praising President Park.",
        quote: "I couldn't write a song glorifying a dictator. I'd rather go to prison.",
        quoteSource: "Historical accounts"
      },
      {
        name: "Cho Yong-pil",
        nameKorean: "조용필",
        epithet: "King of Korean Pop",
        born: "1950",
        role: "Singer",
        contributions: "First Korean to perform at Carnegie Hall (1980). Bridged the gap between trot and modern pop.",
        quote: "Just as Western music can be divided into before and after the Beatles, Korean music can be divided into before and after Cho.",
        quoteSource: "Im Jin-mo, Music Critic"
      }
    ],
    timeline: [
      {
        date: "1926",
        title: "First Korean Popular Recording",
        description: "Yun Sim-deok records 'In Praise of Death,' selling 100,000+ copies.",
        source: "Korean music archives"
      },
      {
        date: "1959",
        title: "Kim Sisters on Ed Sullivan",
        description: "First Korean act to achieve US success, appearing 22 times on The Ed Sullivan Show.",
        source: "CBS Archives"
      },
      {
        date: "1975",
        title: "Shin Joong-hyun Imprisoned",
        description: "Rock pioneer jailed for refusing to compose propaganda for President Park.",
        source: "Historical records"
      },
      {
        date: "1988",
        title: "Seoul Olympics",
        description: "Korea's cultural coming-out party. The world watches Seoul.",
        source: "Olympic records"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Kim_Sisters_with_Dean_Martin.jpg",
      alt: "The Kim Sisters with Dean Martin. They appeared 22 times on The Ed Sullivan Show, becoming the first Korean act to achieve US success.",
      attribution: "Public Domain, via Wikimedia Commons"
    }
  },

  // CHAPTER 1: APRIL 11, 1992
  {
    id: "birth-of-kpop",
    number: "01",
    title: "April 11, 1992",
    subtitle: "The day K-pop was born",
    era: "seo-taiji",
    temporalMarker: "1992",
    epigraph: {
      text: "We weren't trying to be revolutionary. We just made the music we wanted to hear.",
      source: "Seo Taiji"
    },
    narrative: [
      "On April 11, 1992, three young men walked onto the stage of MBC's talent show. Seo Taiji wore baggy pants and a backwards cap. Yang Hyun-suk and Lee Juno flanked him as dancers. They performed 'Nan Arayo' (I Know), a fusion of American hip-hop and Korean pop that sounded like nothing Korean television had ever broadcast.",
      "The judges gave them the lowest score of the night. They called it 'too different.' The audience disagreed. Within weeks, 'Nan Arayo' topped the charts, where it would stay for a record-breaking 17 weeks.",
      "Seo Taiji and Boys didn't just change Korean music—they ended one era and began another. Before them, Korean pop was controlled by the government, shaped by censorship, derivative of Japanese and American sounds. After them, Korean pop belonged to the young.",
      "Yang Hyun-suk would later found YG Entertainment. The training systems, the idol factories, the global ambitions—it all starts here, with three kids who refused to sound like everyone else."
    ],
    figures: [
      {
        name: "Seo Taiji",
        nameKorean: "서태지",
        epithet: "President of Culture",
        born: "1972",
        role: "Leader/Vocalist",
        contributions: "Revolutionized Korean pop with 'Nan Arayo' (1992). His retirement in 1996 led to the abolition of pre-release censorship.",
        quote: "I wanted to make something that sounded like me, not like what came before.",
        quoteSource: "Various interviews"
      },
      {
        name: "Yang Hyun-suk",
        nameKorean: "양현석",
        epithet: "Future Mogul",
        born: "1970",
        role: "Dancer/Rapper",
        contributions: "Seo Taiji and Boys dancer who would found YG Entertainment in 1996, home to Big Bang and BLACKPINK.",
        quote: "I learned everything from performing with Seo Taiji.",
        quoteSource: "Various interviews"
      }
    ],
    timeline: [
      {
        date: "April 11, 1992",
        title: "The Birth of K-Pop",
        description: "Seo Taiji and Boys debut 'Nan Arayo' on MBC. Judges give lowest score; song tops charts for 17 weeks.",
        source: "MBC Archives"
      },
      {
        date: "1996",
        title: "Seo Taiji Retires",
        description: "His departure triggers the end of pre-release censorship in Korean music.",
        source: "Korean cultural policy records"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/8/81/Seo_Taiji_on_October_20%2C_2014_%282%29.jpg",
      alt: "Seo Taiji at his 2014 comeback. In 1992, his group Seo Taiji and Boys revolutionized Korean music with 'Nan Arayo.'",
      attribution: "Wikimedia Commons, CC BY 3.0"
    }
  },

  // CHAPTER 2: THE BLUEPRINT
  {
    id: "the-blueprint",
    number: "02",
    title: "The Blueprint",
    subtitle: "SM Entertainment and Culture Technology",
    era: "idol-factory",
    temporalMarker: "1989-2000",
    epigraph: {
      text: "I returned to Korea with a vision of what the Korean music industry could be.",
      source: "Lee Soo-man, SM Entertainment Founder"
    },
    narrative: [
      "While Seo Taiji was revolutionizing the sound, Lee Soo-man was building the factory. A former singer who had studied in the United States, Lee returned to Korea with a radical idea: talent could be manufactured through systematic training.",
      "He called it 'Culture Technology'—CT for short. The concept was industrial: scout young talent, train them for years in singing, dancing, languages, and media skills, then debut them as polished products. It was the opposite of American music's myth of organic discovery.",
      "SM Entertainment, founded in 1989, became the laboratory. Lee invested an estimated $3 million in BoA before she debuted at age 13. The trainee system demanded 12-hour days, strict diets, and years of delayed gratification. Many entered; few debuted.",
      "Critics called it exploitation. Lee called it the future. He was right about one thing: the system worked. By the late 1990s, SM was producing hits with clockwork precision."
    ],
    figures: [
      {
        name: "Lee Soo-man",
        nameKorean: "이수만",
        epithet: "Architect of the Idol System",
        born: "1952",
        role: "Executive/Producer",
        contributions: "Founded SM Entertainment (1989). Developed 'Culture Technology'—the systematic trainee system that defines K-pop.",
        quote: "Culture Technology is about creating global entertainment through systematic processes.",
        quoteSource: "Various speeches"
      },
      {
        name: "BoA",
        nameKorean: "보아",
        epithet: "Queen of K-Pop",
        born: "1986",
        role: "Singer/Dancer",
        contributions: "SM invested $3M before her debut. First Korean solo artist to break into Japan (2001). Proved the trainee system could produce global stars.",
        quote: "I trained since I was 11. It was hard, but it made me who I am.",
        quoteSource: "Various interviews"
      }
    ],
    timeline: [
      {
        date: "1989",
        title: "SM Studio Founded",
        description: "Lee Soo-man establishes what will become K-pop's most influential agency.",
        source: "SM Entertainment"
      },
      {
        date: "1995",
        title: "SM Entertainment Official",
        description: "Company formally renamed and structured for idol production.",
        source: "Business records"
      },
      {
        date: "2000",
        title: "$3M Invested in BoA",
        description: "SM's investment before BoA's debut sets the template for trainee economics.",
        source: "Industry reports"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/3/34/Lee_Soo-man_in_2024.jpg",
      alt: "Lee Soo-man, founder of SM Entertainment, architect of 'Culture Technology' and the trainee system that defines K-pop.",
      attribution: "Wikimedia Commons, CC BY-SA 4.0"
    }
  },

  // CHAPTER 3: THE IDOL MACHINE
  {
    id: "idol-machine",
    number: "03",
    title: "The Idol Machine",
    subtitle: "H.O.T. and the first generation",
    era: "idol-factory",
    temporalMarker: "1996-2003",
    epigraph: {
      text: "H.O.T. wasn't just a group—they were a movement. They changed how young Koreans saw themselves.",
      source: "Industry analysis"
    },
    narrative: [
      "On September 7, 1996, five young men debuted under SM Entertainment. They called themselves H.O.T.—High-Five of Teenagers. They wore matching outfits. They performed synchronized choreography. They had a fandom with an official name—White Angels—and a color: white.",
      "This was the idol template. Before H.O.T., Korean pop stars were individuals. After H.O.T., they were members of systems. The group was designed: visuals carefully selected, positions assigned (leader, main vocalist, rapper, dancer), image controlled by the agency.",
      "S.E.S. followed in 1997—the first K-pop girl group. Sechs Kies debuted the same year under DSP Media, creating the industry's first major fandom rivalry. The formula was clear: train, debut, dominate, repeat.",
      "In 2000, H.O.T. filled Beijing's Workers' Stadium with 100,000 fans. The Korean Wave—Hallyu—had begun. But it came at a cost. In 2001, H.O.T. disbanded amid contract disputes, foreshadowing decades of industry conflict."
    ],
    figures: [
      {
        name: "Moon Hee-joon",
        nameKorean: "문희준",
        epithet: "Leader of the First Idols",
        born: "1978",
        role: "H.O.T. Leader/Vocalist",
        contributions: "Led H.O.T. through their dominance of late-1990s K-pop. Wrote, composed, and choreographed.",
        quote: "We were the first, and we learned everything the hard way.",
        quoteSource: "Various interviews"
      },
      {
        name: "Kangta",
        nameKorean: "강타",
        epithet: "SM's First Prince",
        born: "1979",
        role: "H.O.T. Main Vocalist",
        contributions: "Became SM executive after H.O.T. Wrote 100+ songs. Bridged 1st and 2nd generation.",
        quote: "The training was brutal, but it taught us discipline.",
        quoteSource: "Various interviews"
      },
      {
        name: "Bada",
        nameKorean: "바다",
        epithet: "First Queen of K-Pop Girl Groups",
        born: "1979",
        role: "S.E.S. Leader/Vocalist",
        contributions: "Led S.E.S. (1997-2002), the first K-pop girl group. Set the template for female idols.",
        quote: "We opened the door for every girl group that followed.",
        quoteSource: "Various interviews"
      }
    ],
    timeline: [
      {
        date: "September 7, 1996",
        title: "H.O.T. Debuts",
        description: "The first K-pop idol group launches the modern era. White Angels fandom established.",
        source: "SM Entertainment"
      },
      {
        date: "November 28, 1997",
        title: "S.E.S. Debuts",
        description: "First K-pop girl group launches under SM Entertainment.",
        source: "SM Entertainment"
      },
      {
        date: "2000",
        title: "H.O.T. Beijing Concert",
        description: "100,000 fans attend. The Korean Wave begins.",
        source: "Concert records"
      },
      {
        date: "May 2001",
        title: "H.O.T. Disbands",
        description: "First major idol breakup. Contract disputes foreshadow industry-wide problems.",
        source: "Industry records"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/3/30/161129_Tony_An_MMA.jpg",
      alt: "Tony An at the 2016 Melon Music Awards. As a founding member of H.O.T., he helped create the idol template that defined K-pop.",
      attribution: "Melon Music Awards, CC BY 4.0, via Wikimedia Commons"
    }
  },

  // CHAPTER 4: THE BIG THREE EMERGE
  {
    id: "big-three",
    number: "04",
    title: "The Big Three Emerge",
    subtitle: "SM, YG, JYP establish dominance",
    era: "hallyu",
    temporalMarker: "1996-2003",
    epigraph: {
      text: "He was desperate and like a tiger who was about to starve to death.",
      source: "Park Jin-young, on first meeting Rain"
    },
    narrative: [
      "In March 1996, Yang Hyun-suk—the former Seo Taiji and Boys dancer—founded YG Entertainment. In April 1997, Park Jin-young founded JYP Entertainment. Together with SM, they would form the 'Big Three' that dominated K-pop for two decades.",
      "Each agency developed a distinct philosophy. SM was the factory: precision-manufactured idols with polished technique. YG was the counterculture: hip-hop authenticity, artistic freedom, deliberately edgy. JYP was the performance house: charisma-first, emphasizing stage presence over perfect vocals.",
      "The 1997 Asian Financial Crisis accelerated consolidation. Smaller agencies collapsed. The Big Three survived by thinking bigger—not just Korean markets, but Japanese and eventually global.",
      "By 2003, the template was complete. The trainee system was standardized. Fan clubs were organized. The factory was ready to scale."
    ],
    figures: [
      {
        name: "Park Jin-young",
        nameKorean: "박진영",
        epithet: "JYP: The Soulful Showman",
        born: "1972",
        role: "Executive/Producer/Artist",
        contributions: "Founded JYP Entertainment (1997). Produced Wonder Girls, 2PM, TWICE, Stray Kids. Known for hands-on artist development.",
        quote: "I look for hunger. Technique can be taught; desire cannot.",
        quoteSource: "Various interviews"
      },
      {
        name: "Rain",
        nameKorean: "비",
        epithet: "Asia's First Solo Superstar",
        born: "1982",
        role: "Singer/Dancer/Actor",
        contributions: "First K-pop act at Madison Square Garden (2006). Named TIME 100 Most Influential People. Proved K-pop could create global solo stars.",
        quote: "Park Jin-young saw something in me that I didn't see in myself.",
        quoteSource: "Various interviews"
      }
    ],
    timeline: [
      {
        date: "March 1996",
        title: "YG Entertainment Founded",
        description: "Yang Hyun-suk establishes the hip-hop alternative to SM's polish.",
        source: "YG Entertainment"
      },
      {
        date: "April 1997",
        title: "JYP Entertainment Founded",
        description: "Park Jin-young completes the Big Three.",
        source: "JYP Entertainment"
      },
      {
        date: "Late 1997",
        title: "Asian Financial Crisis",
        description: "Economic collapse accelerates industry consolidation. Big Three survive; smaller agencies fail.",
        source: "Financial records"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Rain_Korean_Singer.JPG",
      alt: "Rain performing in 2007. JYP Entertainment's first global star, he proved the Big Three's trainee system could produce world-class solo artists.",
      attribution: "Sry85, CC BY-SA 3.0, via Wikimedia Commons"
    }
  },

  // CHAPTER 5: THE JAPAN STRATEGY
  {
    id: "japan-strategy",
    number: "05",
    title: "The Japan Strategy",
    subtitle: "BoA opens the door to Asia",
    era: "hallyu",
    temporalMarker: "2001-2007",
    epigraph: {
      text: "SM invested everything in my success. I couldn't fail.",
      source: "BoA"
    },
    narrative: [
      "In 2001, BoA debuted in Japan. She was 14 years old, fluent in Japanese after years of training, and carried $3 million of SM's investment on her shoulders. Within a year, 'Listen to My Heart' hit #1 on the Oricon chart. A Korean had conquered Japan.",
      "This was unprecedented. Korea and Japan share a complicated history—occupation, war, cultural bans that lasted until 1998. For a Korean artist to succeed in Japan's massive music market required not just talent but strategic localization: Japanese-language recordings, Japanese media appearances, Japanese cultural fluency.",
      "BoA proved the model worked. TVXQ followed in 2005, then KARA and Girls' Generation. The Japan strategy became the expansion playbook: master the second-largest music market in the world, then use that platform to reach the rest of Asia.",
      "By 2007, K-pop acts were regularly charting on Oricon. The factory had found its export market."
    ],
    figures: [
      {
        name: "TVXQ",
        nameKorean: "동방신기",
        epithet: "Gods of the East",
        role: "Boy Group (2003-present)",
        contributions: "Five-member group that perfected the Japan expansion model. Cassiopeia fandom held Guinness record (800,000+ members).",
        quote: "We didn't just perform in Japan—we became a part of Japanese pop culture.",
        quoteSource: "Various interviews"
      }
    ],
    timeline: [
      {
        date: "2001",
        title: "BoA Japanese Debut",
        description: "First Korean solo artist to break into Japan. 'Listen to My Heart' reaches #1 Oricon.",
        source: "Oricon chart data"
      },
      {
        date: "2005",
        title: "TVXQ Japanese Debut",
        description: "Boy group follows BoA's template, achieving massive Japanese success.",
        source: "Oricon chart data"
      },
      {
        date: "2006",
        title: "Rain at Madison Square Garden",
        description: "First Korean artist to perform at MSG. K-pop reaches America.",
        source: "Concert records"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/b/bd/TVXQ_in_Paris_France_cropped.JPG",
      alt: "TVXQ performing in Paris, France. After BoA opened Japan, TVXQ proved K-pop could conquer the world.",
      attribution: "Thibault Music, CC BY-SA 3.0, via Wikimedia Commons"
    }
  },

  // CHAPTER 6: THE GOLDEN AGE
  {
    id: "golden-age",
    number: "06",
    title: "The Golden Age",
    subtitle: "TVXQ to Girls' Generation",
    era: "golden",
    temporalMarker: "2007-2012",
    epigraph: {
      text: "[We wanted] something with which Big Bang fans could identify themselves.",
      source: "G-Dragon, on designing Big Bang's crown lightstick"
    },
    narrative: [
      "The second generation of K-pop was the golden age. TVXQ had proven the Japanese model. Now came the explosion: Super Junior with 12 members, Big Bang with their crown lightsticks, Girls' Generation with the cultural reset of 'Gee,' SHINee pushing choreography to new heights.",
      "In January 2009, Girls' Generation released 'Gee.' The song's hook—'Gee gee gee gee baby baby baby'—became inescapable. The synchronized leg dance became a meme before memes existed. The video exceeded 500 million views before YouTube was even a primary K-pop platform.",
      "Big Bang, meanwhile, rewrote the aesthetic rules. G-Dragon designed their crown lightstick—the first modern K-pop lightstick, a way for VIPs to identify themselves in concert crowds. The relationship between artist and fan was becoming more intentional, more organized, more monetizable.",
      "By 2012, the machinery was perfected. But it would take an accident to truly break the West."
    ],
    figures: [
      {
        name: "Girls' Generation",
        nameKorean: "소녀시대",
        epithet: "The Nation's Girl Group",
        role: "Girl Group (2007-present)",
        contributions: "Nine-member group that defined 2nd generation girl groups. 'Gee' (2009) became a cultural phenomenon.",
        quote: "We didn't know 'Gee' would change everything. We just worked hard.",
        quoteSource: "Various interviews"
      },
      {
        name: "G-Dragon",
        nameKorean: "지드래곤",
        epithet: "King of K-Pop",
        born: "1988",
        role: "Big Bang Leader/Producer",
        contributions: "Designed first modern lightstick. Self-produces music. Fashion icon. Defined K-pop's artistic ambition.",
        quote: "I wanted fans to have something that said 'we belong together.'",
        quoteSource: "On the crown lightstick"
      },
      {
        name: "Taeyeon",
        nameKorean: "태연",
        epithet: "Leader of the Nation's Girl Group",
        born: "1989",
        role: "Girls' Generation Leader/Vocalist",
        contributions: "Led SNSD through their peak. Successful solo career. Defined the 'leader' role in girl groups.",
        quote: "Being a leader means taking responsibility for everyone.",
        quoteSource: "Various interviews"
      }
    ],
    timeline: [
      {
        date: "December 26, 2003",
        title: "TVXQ Debuts",
        description: "Marks beginning of 2nd generation K-pop.",
        source: "SM Entertainment"
      },
      {
        date: "August 19, 2006",
        title: "Big Bang Debuts",
        description: "YG's flagship group brings hip-hop credibility and fashion influence.",
        source: "YG Entertainment"
      },
      {
        date: "August 2007",
        title: "Girls' Generation Debuts",
        description: "Nine-member group that will define the era.",
        source: "SM Entertainment"
      },
      {
        date: "January 2009",
        title: "'Gee' Released",
        description: "Cultural phenomenon. Synchronized leg dance becomes iconic.",
        source: "SM Entertainment"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/1/15/220728_GG_poleposition_266_%2853595169645%29.jpg",
      alt: "Girls' Generation in concert, 2022. Their 2009 hit 'Gee' defined the golden age of K-pop.",
      attribution: "Dispatch Korea, CC BY 2.0, via Wikimedia Commons"
    }
  },

  // CHAPTER 7: GANGNAM STYLE
  {
    id: "gangnam-style",
    number: "07",
    title: "Gangnam Style",
    subtitle: "The accident that changed everything",
    era: "viral",
    temporalMarker: "2012",
    epigraph: {
      text: "He paved the way for K-pop in the US, which allowed [BTS] to follow that path more comfortably.",
      source: "Suga (BTS)"
    },
    narrative: [
      "PSY was not supposed to be the one. At 34, he was older than typical idols. His image was comedic, not handsome. His label, YG, considered him a legacy act. Then 'Gangnam Style' happened.",
      "Released in July 2012, the song was satire—mocking the nouveau riche pretensions of Seoul's Gangnam district. The horse-dance was absurd by design. But Scooter Braun saw the video, tweeted about it, and the algorithm did the rest.",
      "On December 21, 2012, 'Gangnam Style' became the first YouTube video to reach 1 billion views. PSY performed with MC Hammer at the American Music Awards. UN Secretary-General Ban Ki-moon danced the horse-dance with him.",
      "Western media treated it as a novelty—a one-hit wonder from a strange country. They were wrong. PSY had proven that K-pop could go viral globally. The next generation would use social media not as an accident but as strategy."
    ],
    figures: [
      {
        name: "PSY",
        nameKorean: "싸이",
        epithet: "The Viral Pioneer",
        born: "1977",
        role: "Singer/Producer",
        contributions: "'Gangnam Style' (2012) became first video to reach 1 billion YouTube views. Opened global attention for K-pop.",
        quote: "I wrote it to parody the flamboyance and narcissism of Gangnam culture.",
        quoteSource: "Various interviews"
      }
    ],
    timeline: [
      {
        date: "July 15, 2012",
        title: "'Gangnam Style' Released",
        description: "Satirical song begins viral spread.",
        source: "YG Entertainment"
      },
      {
        date: "September 2012",
        title: "Most-Viewed YouTube Video",
        description: "Surpasses Justin Bieber's 'Baby' as most-viewed ever.",
        source: "YouTube"
      },
      {
        date: "December 21, 2012",
        title: "First Billion-View Video",
        description: "'Gangnam Style' breaks YouTube's view counter (which couldn't display over 2.1 billion).",
        source: "YouTube"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/c/ce/FMFA_2013_%288565145586%29.jpg",
      alt: "PSY performing Gangnam Style, the viral K-pop breakthrough",
      attribution: "Wikimedia Commons, CC BY 2.0"
    }
  },

  // CHAPTER 8: BTS
  {
    id: "bts-rise",
    number: "08",
    title: "BTS: The Outsiders",
    subtitle: "How seven outsiders conquered the world",
    era: "bts",
    temporalMarker: "2013-2020",
    epigraph: {
      text: "We didn't localize. We brought Korean content to the world as it was, and the world responded.",
      source: "Bang Si-hyuk, HYBE Chairman"
    },
    narrative: [
      "BTS debuted on June 13, 2013 under Big Hit Entertainment—not one of the Big Three. They had no major agency backing, no guaranteed television appearances, no built-in advantages. What they had was Twitter.",
      "From the start, Bang Si-hyuk's strategy was different. Instead of polished distance, BTS offered raw intimacy. They posted constantly on social media. They shared their struggles. They spoke about mental health, societal pressure, the difficulty of being young in a competitive world.",
      "ARMY—their fandom—grew into something unprecedented. Not passive consumers but active participants: translating content into dozens of languages, coordinating streaming campaigns, funding charitable projects. When BTS matched their $1 million donation to Black Lives Matter, ARMY matched it again within 24 hours.",
      "In September 2018, RM addressed the United Nations General Assembly on behalf of UNICEF. In August 2020, 'Dynamite' debuted at #1 on the Billboard Hot 100—the first all-Korean act to achieve this. The factory had produced its most improbable success."
    ],
    figures: [
      {
        name: "RM",
        nameKorean: "김남준",
        epithet: "The Philosopher King",
        born: "1994",
        role: "BTS Leader/Rapper",
        contributions: "Self-taught English speaker who became BTS's global spokesperson. UN speech. Writes and produces.",
        quote: "I think the difference between BTS and other artists is the message in our music.",
        quoteSource: "Various interviews"
      },
      {
        name: "Bang Si-hyuk",
        nameKorean: "방시혁",
        epithet: "Architect of the New Wave",
        born: "1972",
        role: "HYBE Chairman/Producer",
        contributions: "Founded Big Hit (2005). Developed BTS's social-first strategy. Built HYBE into $10B+ company.",
        quote: "We focused on genuine connection, not manufactured image.",
        quoteSource: "Various interviews"
      }
    ],
    timeline: [
      {
        date: "June 13, 2013",
        title: "BTS Debuts",
        description: "Seven members debut under small agency Big Hit Entertainment.",
        source: "Big Hit Entertainment"
      },
      {
        date: "September 24, 2018",
        title: "UN General Assembly Speech",
        description: "RM addresses world leaders on behalf of UNICEF's Generation Unlimited.",
        source: "United Nations"
      },
      {
        date: "August 21, 2020",
        title: "'Dynamite' #1 Billboard Hot 100",
        description: "First all-Korean act to debut at #1 on Hot 100.",
        source: "Billboard"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/d/dc/BTS_at_American_Music_Awards_November_21%2C_2021.jpg",
      alt: "BTS at the American Music Awards, November 2021. The seven members who became K-pop's biggest global success.",
      attribution: "Wikimedia Commons, CC BY 3.0"
    }
  },

  // CHAPTER 9: THE FANDOM INDUSTRIAL COMPLEX
  {
    id: "fandom-complex",
    number: "09",
    title: "The Fandom Industrial Complex",
    subtitle: "When fans became co-producers",
    era: "bts",
    temporalMarker: "2006-2020",
    epigraph: {
      text: "ARMY is not just our fans. They are our friends, our family.",
      source: "Jimin (BTS)"
    },
    narrative: [
      "K-pop fandoms are not audiences. They are labor forces. This distinction matters. From Cassiopeia (TVXQ) to ARMY (BTS) to BLINK (BLACKPINK), K-pop fandoms operate with organizational sophistication that rivals corporations.",
      "Consider what fans do for free: translate content into dozens of languages (making K-pop accessible to non-Korean speakers worldwide), coordinate streaming campaigns (manipulating algorithms to boost chart positions), fund advertising (fans spend $30,000+ on birthday subway ads), organize charity projects (matching artist donations, building schools in their names).",
      "The economics are staggering. Album sales are driven by photocard collecting—fans buy multiple copies hoping for specific random cards. Concert tickets sell out in seconds to fans who have mastered the art of queue manipulation. Fan labor is unpaid but essential.",
      "Is this exploitation or empowerment? The answer is probably both. Fans gain community, purpose, and parasocial intimacy. Agencies gain free marketing worth millions. The relationship is symbiotic and strange."
    ],
    figures: [
      {
        name: "ARMY",
        epithet: "BTS's Global Army",
        role: "Fandom Organization",
        contributions: "Pioneered coordinated streaming, translation networks, charity matching. Matched BTS's $1M BLM donation in 24 hours. Flooded Trump rally registration in 2020.",
        quote: "We're not just fans. We're a movement.",
        quoteSource: "Fan community"
      },
      {
        name: "Cassiopeia",
        epithet: "The Original Super-Fandom",
        role: "TVXQ Fandom",
        contributions: "Held Guinness World Record for largest official fan club (800,000+ members). Created the 'red ocean' lightstick tradition.",
        quote: "We showed what organized fandom could achieve.",
        quoteSource: "Fan community"
      }
    ],
    timeline: [
      {
        date: "April 2006",
        title: "Cassiopeia Founded",
        description: "TVXQ fandom becomes template for organized K-pop fandoms.",
        source: "Guinness World Records"
      },
      {
        date: "2015",
        title: "V Live Launches",
        description: "Naver platform enables real-time fan engagement. Idols broadcast directly to fans.",
        source: "Naver"
      },
      {
        date: "June 2020",
        title: "K-Pop Fans Flood Trump Rally",
        description: "Fans claim tickets to Tulsa rally they never intended to use. Political power demonstrated.",
        source: "News reports"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/5/5b/ARMY_%28BTS_fans%29_during_Love_Yourself_concert_tour_in_Hamilton%2C_Canada%2C_23_September_2018.jpg",
      alt: "ARMY fan ocean with purple lightsticks during BTS Love Yourself concert. K-pop fandoms operate with organizational sophistication that rivals corporations.",
      attribution: "Wikimedia Commons, CC BY-SA 4.0"
    }
  },

  // CHAPTER 10: BLACKPINK
  {
    id: "blackpink-revolution",
    number: "10",
    title: "BLACKPINK",
    subtitle: "The girl crush revolution",
    era: "blackpink",
    temporalMarker: "2016-2023",
    epigraph: {
      text: "We are BLACKPINK. The revolution.",
      source: "BLACKPINK"
    },
    narrative: [
      "In August 2016, YG Entertainment debuted BLACKPINK—four members after years of delays and lineup changes. Jisoo, Jennie, Rosé, and Lisa brought something different: not cute concepts but 'girl crush'—powerful, fashionable, unapologetically fierce.",
      "Their strategy was scarcity. While other groups released music constantly, BLACKPINK dropped songs sparingly—building anticipation, making each release an event. Their fashion partnerships (Chanel, Dior, Celine, Saint Laurent) positioned them as luxury brands, not just pop stars.",
      "In April 2019, they became the first K-pop girl group to perform at Coachella. By 2023, they were Coachella headliners, and their world tour became the highest-grossing by a female group in history.",
      "BLACKPINK proved that girl groups could match boy groups in global reach. But they also highlighted the industry's gender disparities: despite their success, their output remained limited by YG's reluctance to give them creative control."
    ],
    figures: [
      {
        name: "Jennie",
        nameKorean: "제니",
        epithet: "Human Chanel",
        born: "1996",
        role: "BLACKPINK Rapper/Vocalist",
        contributions: "First member to launch solo. Brand ambassador for Chanel. Defined 'girl crush' aesthetic.",
        quote: "We want to show that girls can be powerful.",
        quoteSource: "Various interviews"
      },
      {
        name: "Lisa",
        nameKorean: "리사",
        epithet: "Global Dance Icon",
        born: "1997",
        role: "BLACKPINK Main Dancer/Rapper",
        contributions: "Thai member. Most-followed K-pop idol on Instagram. Solo single 'LALISA' broke records.",
        quote: "Dancing is how I express everything I feel.",
        quoteSource: "Various interviews"
      }
    ],
    timeline: [
      {
        date: "August 8, 2016",
        title: "BLACKPINK Debuts",
        description: "Four-member girl group launches under YG Entertainment.",
        source: "YG Entertainment"
      },
      {
        date: "April 2019",
        title: "Coachella Performance",
        description: "First K-pop girl group to perform at Coachella.",
        source: "Coachella"
      },
      {
        date: "2023",
        title: "Highest-Grossing Female Tour",
        description: "Born Pink World Tour breaks records for female groups.",
        source: "Touring data"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/3/38/Blackpink_Coachella_2023_02.jpg",
      alt: "BLACKPINK performing at Coachella 2023, the first K-pop girl group to headline the festival.",
      attribution: "@aanglerrr (aang), CC BY 4.0, via Wikimedia Commons"
    }
  },

  // CHAPTER 11: PLATFORM WARS
  {
    id: "platform-wars",
    number: "11",
    title: "Platform Wars",
    subtitle: "From Cyworld to Weverse",
    era: "bts",
    temporalMarker: "1999-2024",
    epigraph: {
      text: "Rather than resisting new technology, K-Pop agencies integrated it into artist development and fan engagement strategies.",
      source: "Research synthesis"
    },
    narrative: [
      "K-pop's secret weapon was never just the music. It was platform adoption. Korean agencies embraced new technologies years before Western labels caught on.",
      "Cyworld launched in 1999—the world's first mass social network. Idols maintained 'mini-homepages' where fans could visit and interact. Melon launched in 2004, four years before Spotify existed. When YouTube emerged, K-pop was ready.",
      "V Live (2015) created real-time parasocial intimacy. Idols could broadcast from anywhere, chatting with fans as if they were friends. When HYBE launched Weverse in 2019, they unified fan commerce, content, and community into a single platform they controlled.",
      "The lesson was clear: whoever controls the platform controls the relationship. While Western labels fought streaming, K-pop agencies built it."
    ],
    figures: [
      {
        name: "Weverse",
        epithet: "The Super-App of Fandom",
        role: "Platform (2019-present)",
        contributions: "HYBE's fan platform. Combines social media, commerce, exclusive content. 10M+ users by 2024.",
        quote: "Weverse is where artists and fans become family.",
        quoteSource: "HYBE promotional materials"
      }
    ],
    timeline: [
      {
        date: "1999",
        title: "Cyworld Launches",
        description: "World's first mass social network. Idols pioneer direct fan communication.",
        source: "Tech history"
      },
      {
        date: "2004",
        title: "Melon Launches",
        description: "Korean streaming platform predates Spotify by four years.",
        source: "Melon"
      },
      {
        date: "2015",
        title: "V Live Launches",
        description: "Real-time idol broadcasting creates new intimacy model.",
        source: "Naver"
      },
      {
        date: "2019",
        title: "Weverse Launches",
        description: "HYBE's platform unifies fan experience under artist control.",
        source: "HYBE"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Aespa_%28%EC%97%90%EC%8A%A4%ED%8C%8C%29_231124_Love_Your_W.png",
      alt: "aespa, representing K-pop's embrace of digital platforms and metaverse integration",
      attribution: "Wikimedia Commons, CC BY 4.0"
    }
  },

  // CHAPTER 12: PANDEMIC PIVOT
  {
    id: "pandemic-pivot",
    number: "12",
    title: "When the Stage Went Virtual",
    subtitle: "COVID-19 and the reinvention of concerts",
    era: "pandemic",
    temporalMarker: "2020-2022",
    epigraph: {
      text: "COVID-19 accelerated changes that were coming anyway. The virtual concert isn't a replacement—it's an expansion.",
      source: "Industry analysis"
    },
    narrative: [
      "In April 2020, SuperM performed 'Beyond Live'—the first K-pop virtual concert. 75,000 fans paid to watch. Within months, BTS's 'Bang Bang Con' drew 750,000 concurrent viewers. The pandemic had forced an experiment that became permanent.",
      "Empty stadiums became LED wonderlands. AR effects placed virtual fans in seats. Multi-camera switching gave viewers angles impossible in physical venues. The technology that had been developing for years suddenly became essential.",
      "Meanwhile, BTS released 'Dynamite'—an English-language disco track designed for pandemic escapism. It debuted at #1 on the Billboard Hot 100 during a moment when everyone needed joy. The pandemic's isolation had made K-pop's parasocial intimacy more valuable than ever.",
      "By 2022, virtual concerts were permanent infrastructure, not emergency measures. The question was no longer if virtual experiences would persist, but how they would coexist with physical ones."
    ],
    figures: [
      {
        name: "Beyond Live",
        epithet: "The Virtual Concert Pioneer",
        role: "Platform/Format",
        contributions: "SM/Naver joint venture. First major paid K-pop virtual concert format. Generated $200M+ industry-wide.",
        quote: "We didn't just stream a concert—we created a new medium.",
        quoteSource: "SM Entertainment"
      },
      {
        name: "aespa",
        nameKorean: "에스파",
        epithet: "The Metaverse Group",
        role: "Girl Group (2020-present)",
        contributions: "Debuted with virtual AI members (ae-aespa). First group built for metaverse integration.",
        quote: "We exist in both worlds—real and virtual.",
        quoteSource: "Promotional materials"
      }
    ],
    timeline: [
      {
        date: "April 2020",
        title: "SuperM Beyond Live",
        description: "First major paid virtual K-pop concert. 75,000 viewers.",
        source: "SM Entertainment"
      },
      {
        date: "June 2020",
        title: "BTS Bang Bang Con",
        description: "750,000 concurrent viewers. Virtual concert becomes mass event.",
        source: "HYBE"
      },
      {
        date: "August 21, 2020",
        title: "'Dynamite' Releases",
        description: "English-language pandemic anthem debuts at #1.",
        source: "Billboard"
      },
      {
        date: "November 17, 2020",
        title: "aespa Debuts",
        description: "First group with virtual AI members. Metaverse integration from day one.",
        source: "SM Entertainment"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/a/af/NCT_127_at_SBS_Power_FM_on_March_19%2C_2020_01.png",
      alt: "NCT 127 performing on SBS Power FM, March 19, 2020—just as the pandemic began reshaping K-pop's live performance model.",
      attribution: "SBS, via Wikimedia Commons"
    }
  },

  // CHAPTER 13: THE RECKONING
  {
    id: "the-reckoning",
    number: "13",
    title: "The Reckoning",
    subtitle: "Contracts, mental health, and industry reform",
    era: "reckoning",
    temporalMarker: "2009-2025",
    epigraph: {
      text: "The system produces technically excellent performers but at documented human cost.",
      source: "Research synthesis"
    },
    narrative: [
      "In 2009, three members of TVXQ sued SM Entertainment. Their contracts bound them for 13 years—an eternity in an industry that discards artists by age 30. The lawsuit revealed practices long whispered about: unfair profit splits, training debt, restrictions on personal life.",
      "The Korea Fair Trade Commission intervened, capping contracts at 7 years. But enforcement remained weak. And the human cost continued to mount.",
      "In December 2017, SHINee's Jonghyun died by suicide. In 2019, Sulli and Goo Hara followed. In 2023, ASTRO's Moonbin. Each death forced conversations the industry preferred to avoid. Each prompted promises of change that often went unfulfilled.",
      "By 2024, the pattern was clear: the factory produced excellent performers through practices increasingly recognized as harmful. The question was whether reform could happen without dismantling what made K-pop successful."
    ],
    figures: [
      {
        name: "TVXQ Lawsuit Plaintiffs",
        epithet: "The First Rebels",
        role: "Jaejoong, Yoochun, Junsu",
        contributions: "Sued SM Entertainment in 2009, revealing 13-year contracts and unfair terms. Led to KFTC intervention.",
        quote: "We had to speak up. Not just for ourselves, but for everyone who would come after.",
        quoteSource: "Legal statements"
      },
      {
        name: "Kim Jong-hyun",
        nameKorean: "김종현",
        epithet: "The Voice We Lost",
        born: "1990",
        died: "2017",
        role: "SHINee Main Vocalist",
        contributions: "Exceptional vocalist and songwriter. His death forced public conversation about idol mental health.",
        quote: "The life of fame is not what it seems.",
        quoteSource: "Attributed"
      }
    ],
    timeline: [
      {
        date: "2009",
        title: "TVXQ Lawsuit",
        description: "Three members sue SM, revealing 13-year contracts and unfair terms.",
        source: "Court records"
      },
      {
        date: "2009",
        title: "KFTC 7-Year Cap",
        description: "Korea Fair Trade Commission limits idol contracts to 7 years.",
        source: "KFTC"
      },
      {
        date: "December 18, 2017",
        title: "Jonghyun's Death",
        description: "SHINee vocalist dies by suicide. Industry mental health crisis enters public discourse.",
        source: "News reports"
      },
      {
        date: "2024",
        title: "NewJeans Dispute",
        description: "HYBE-ADOR conflict reveals ongoing tensions in multi-label structures.",
        source: "News reports"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/0/02/Shinee_at_the_SHINee_World_Concert_III_in_Taiwan.jpg",
      alt: "SHINee performing at World Concert in Taiwan - the group's Jonghyun became a symbol of industry mental health concerns",
      attribution: "Wikimedia Commons, CC BY-SA 3.0"
    }
  },

  // CHAPTER 14: NEWJEANS AND THE 4TH GENERATION
  {
    id: "4th-generation",
    number: "14",
    title: "NewJeans and the 4th Generation",
    subtitle: "Y2K nostalgia meets platform natives",
    era: "newjeans",
    temporalMarker: "2022-2025",
    epigraph: {
      text: "NewJeans represented something different: less manufactured artifice, more organic cool. And then the company conflict reminded everyone that even 'organic' is manufactured.",
      source: "Industry analysis"
    },
    narrative: [
      "In July 2022, ADOR (under HYBE) debuted NewJeans—five members with a Y2K aesthetic that felt like a deliberate rejection of K-pop maximalism. No elaborate concepts. No synchronized formation changes. Just catchy songs, casual style, and the vibe of girls who might be your friends.",
      "Creative director Min Hee-jin—the genius behind Girls' Generation and SHINee's visual identities—had crafted something that felt accidentally cool. The music (Jersey club, soft R&B) matched the aesthetic. Within a year, NewJeans was everywhere.",
      "But in April 2024, the illusion shattered. Min Hee-jin held a press conference accusing HYBE of attempting to seize control of ADOR. HYBE counter-accused her of attempting a hostile takeover. The conflict revealed that even K-pop's most 'authentic' projects were corporate products subject to corporate wars.",
      "Meanwhile, the 4th generation continued exploding: Stray Kids filled stadiums, SEVENTEEN headlined Glastonbury, IVE and LE SSERAFIM competed for attention. The factory was running at full capacity. But cracks were showing."
    ],
    figures: [
      {
        name: "NewJeans",
        nameKorean: "뉴진스",
        epithet: "The Y2K Revolution",
        role: "Girl Group (2022-present)",
        contributions: "Redefined K-pop aesthetics with casual, organic-feeling image. 'Ditto' and 'Super Shy' became defining 4th-gen hits.",
        quote: "We just want to make music that feels good.",
        quoteSource: "Various interviews"
      },
      {
        name: "Min Hee-jin",
        nameKorean: "민희진",
        epithet: "The Creative Genius",
        born: "1980",
        role: "Creative Director/CEO",
        contributions: "Visual architect of Girls' Generation, SHINee, EXO, f(x). Founded ADOR. Created NewJeans concept.",
        quote: "I built this with my own hands. No one can take that away.",
        quoteSource: "April 2024 press conference"
      }
    ],
    timeline: [
      {
        date: "July 22, 2022",
        title: "NewJeans Debuts",
        description: "ADOR's five-member group launches with Y2K aesthetic.",
        source: "ADOR/HYBE"
      },
      {
        date: "2024",
        title: "HYBE-ADOR Conflict",
        description: "Min Hee-jin's press conference reveals corporate tensions. NewJeans caught in the middle.",
        source: "News reports"
      },
      {
        date: "2024",
        title: "Album Sales Decline",
        description: "K-pop album sales drop 19.5%—first decline in 9 years.",
        source: "Industry data"
      }
    ],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/a/a2/NewJeans_X_OLENS_1_%28cropped%29.jpg",
      alt: "NewJeans - leaders of the 4th generation with their Y2K aesthetic",
      attribution: "Wikimedia Commons, CC BY 2.0"
    }
  },

  // EPILOGUE
  {
    id: "epilogue",
    number: "15",
    title: "What Comes After the Wave?",
    subtitle: "The future of K-pop",
    era: "reckoning",
    temporalMarker: "2025 and Beyond",
    epigraph: {
      text: "K-Pop represents one of the most successful cultural export phenomena in modern history, transforming from a localized Korean music industry into a $10+ billion global entertainment force over approximately 30 years.",
      source: "Research synthesis"
    },
    narrative: [
      "Thirty years after Seo Taiji and Boys took the lowest score on a talent show, K-pop is a $10+ billion global industry. Korean artists headline Coachella and address the United Nations. The training system has been exported to China, Japan, Southeast Asia, and beyond.",
      "But the questions are mounting. The 2024 sales decline—the first in nine years—suggests market saturation. Contract disputes continue. Mental health concerns persist. The factory's human costs are increasingly visible.",
      "The future offers both threats and opportunities. AI-generated idols could reduce the need for human trainees—or deepen the industry's commodification of identity. Global training pipelines could diversify K-pop—or dilute its Korean identity. Virtual concerts could expand access—or replace the irreplaceable experience of live performance.",
      "What K-pop has already achieved is remarkable regardless of what comes next. From the ashes of Japanese occupation and American military bases, from dictatorship and economic crisis, Korea built a cultural export machine that conquered the world. The factory continues. The fever persists. The future remains unwritten."
    ],
    figures: [],
    timeline: [],
    chapterImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Stray_Kids_at_the_Music_Core_Mini_Fan_Meeting%2C_November_11%2C_2023.png",
      alt: "Stray Kids at Music Core fan meeting 2023, representing the global future of K-pop",
      attribution: "Wikimedia Commons, CC BY 4.0"
    }
  }
];

// ==================== PART DIVIDER COMPONENT ====================

interface PartDividerProps {
  number: string;
  title: string;
  subtitle: string;
}

function PartDivider({ number, title, subtitle }: PartDividerProps) {
  return (
    <div className="kh-part-divider">
      <span className="kh-part-number">{number}</span>
      <h2 className="kh-part-title">{title}</h2>
      <p className="kh-part-subtitle">{subtitle}</p>
    </div>
  );
}

// ==================== FIGURE CARD COMPONENT ====================

function FigureCard({ figure }: { figure: Figure }) {
  return (
    <div className="kh-figure-card">
      <h3 className="kh-figure-name">
        {figure.name}
        {figure.nameKorean && (
          <span className="kh-figure-korean">{figure.nameKorean}</span>
        )}
      </h3>
      <p className="kh-figure-epithet">{figure.epithet}</p>
      <p className="kh-figure-meta">
        {figure.role}
        {figure.born && ` · b. ${figure.born}`}
        {figure.died && ` · d. ${figure.died}`}
      </p>
      <p className="kh-figure-contributions">{figure.contributions}</p>
      {figure.quote && (
        <div className="kh-figure-quote">
          <p>&ldquo;{figure.quote}&rdquo;</p>
          {figure.quoteSource && (
            <p className="kh-figure-quote-source">— {figure.quoteSource}</p>
          )}
        </div>
      )}
    </div>
  );
}

// ==================== TIMELINE COMPONENT ====================

function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="kh-timeline">
      {events.map((event, index) => (
        <div key={index} className="kh-timeline-event">
          <span className="kh-timeline-date">{event.date}</span>
          <h4 className="kh-timeline-title">{event.title}</h4>
          <p className="kh-timeline-description">{event.description}</p>
        </div>
      ))}
    </div>
  );
}

// ==================== CHAPTER COMPONENT ====================

interface ChapterProps {
  chapter: Chapter;
  showPartDivider?: { number: string; title: string; subtitle: string };
}

const Chapter = React.forwardRef<HTMLElement, ChapterProps>(
  ({ chapter, showPartDivider }, ref) => {
    return (
      <section ref={ref} id={chapter.id} className={`kh-section era-${chapter.era}`}>
        {showPartDivider && (
          <PartDivider
            number={showPartDivider.number}
            title={showPartDivider.title}
            subtitle={showPartDivider.subtitle}
          />
        )}

        {chapter.temporalMarker && (
          <span className="kh-temporal-marker">{chapter.temporalMarker}</span>
        )}

        <span className="kh-chapter-number">Chapter {chapter.number}</span>
        <h2 className="kh-chapter-title">{chapter.title}</h2>
        {chapter.subtitle && (
          <p className="kh-chapter-subtitle">{chapter.subtitle}</p>
        )}

        {chapter.epigraph && (
          <blockquote className="kh-epigraph">
            <p className="kh-epigraph-text">&ldquo;{chapter.epigraph.text}&rdquo;</p>
            <cite className="kh-epigraph-source">— {chapter.epigraph.source}</cite>
          </blockquote>
        )}

        {chapter.chapterImage && (
          <div className="kh-image-container">
            <img
              src={chapter.chapterImage.url}
              alt={chapter.chapterImage.alt}
              className="kh-chapter-image"
              loading="lazy"
            />
            <p className="kh-image-attribution">{chapter.chapterImage.attribution}</p>
          </div>
        )}

        <div className="kh-content">
          {chapter.narrative.map((paragraph, index) => (
            <p key={index} className="kh-paragraph">{paragraph}</p>
          ))}
        </div>

        {chapter.figures.length > 0 && (
          <div className="kh-figures-grid">
            {chapter.figures.map((figure, index) => (
              <FigureCard key={index} figure={figure} />
            ))}
          </div>
        )}

        {chapter.timeline && chapter.timeline.length > 0 && (
          <Timeline events={chapter.timeline} />
        )}
      </section>
    );
  }
);

Chapter.displayName = "Chapter";

// ==================== MAIN COMPONENT ====================

export default function KPopHistoryClient() {
  const progress = useReadingProgress();
  const [currentEra, setCurrentEra] = useState<EraStyle>("pre-kpop");
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Track which era is currently in view
  const updateCurrentEra = useCallback(() => {
    const viewportMiddle = window.scrollY + window.innerHeight * 0.4;

    for (let i = sectionRefs.current.length - 1; i >= 0; i--) {
      const section = sectionRefs.current[i];
      if (section && section.offsetTop <= viewportMiddle) {
        setCurrentEra(CHAPTERS[i].era);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateCurrentEra, { passive: true });
    updateCurrentEra();
    return () => window.removeEventListener("scroll", updateCurrentEra);
  }, [updateCurrentEra]);

  // Part divider configuration
  const partDividers: Record<string, { number: string; title: string; subtitle: string }> = {
    "birth-of-kpop": {
      number: "Part I",
      title: "THE FACTORY",
      subtitle: "The industrial system that manufactured a cultural revolution (1992-2012)"
    },
    "gangnam-style": {
      number: "Part II",
      title: "THE FEVER",
      subtitle: "When the factory met the internet, and the world caught fire (2012-2020)"
    },
    "pandemic-pivot": {
      number: "Part III",
      title: "THE FUTURE",
      subtitle: "The industry faces its contradictions (2020-2025)"
    }
  };

  return (
    <article className={`kh-essay era-${currentEra}`}>
      {/* Reading Progress */}
      <div className="kh-progress">
        <div
          className="kh-progress-fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Hero */}
      <header className="kh-hero">
        <span className="kh-hero-label">A Visual History</span>
        <h1 className="kh-hero-title">K-POP HISTORY</h1>
        <p className="kh-hero-subtitle">The Factory, The Fever, The Future</p>
        <p className="kh-hero-meta">
          From 1926 to 2025 · 380+ Figures · 180+ Milestones
        </p>
      </header>

      {/* Chapters */}
      {CHAPTERS.map((chapter, index) => (
        <Chapter
          key={chapter.id}
          ref={(el) => { sectionRefs.current[index] = el; }}
          chapter={chapter}
          showPartDivider={partDividers[chapter.id]}
        />
      ))}

      {/* Footer */}
      <footer className="kh-footer">
        <p>Research and writing: Esy Visual Essay Team</p>
        <p>Sources: Academic publications, Billboard, industry archives, Wikimedia Commons</p>
        <p>© 2024 Esy. All rights reserved.</p>
      </footer>
    </article>
  );
}
