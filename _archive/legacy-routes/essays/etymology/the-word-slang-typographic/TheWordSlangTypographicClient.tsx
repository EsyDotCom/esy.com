'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import './the-word-slang-typographic.css';

// Panel data structure
interface Panel {
  id: number;
  era: 'hook' | 'georgian' | 'victorian' | 'american' | 'digital' | 'close';
  title: string;
  subtitle: string;
  body: string;
  artifact?: {
    type: 'stamp' | 'quote' | 'dictionary' | 'glossary' | 'marginalia';
    content: string;
    source?: string;
  };
  citations?: string[];
}

// Key figure data
interface KeyFigure {
  name: string;
  years: string;
  era: string;
  bio: string;
  contribution: string;
  style: 'scholarly' | 'victorian' | 'newspaper' | 'academic' | 'poetic' | 'modern';
}

// Timeline milestone
interface Milestone {
  year: number;
  era: string;
  event: string;
  source: string;
  highlight?: boolean;
}

const panels: Panel[] = [
  // Panel 1: The Hook
  {
    id: 1,
    era: 'hook',
    title: 'The Word in the Wild',
    subtitle: "Language you weren't supposed to hear",
    body: `The earliest recorded use of "slang" dates to 1756, where it appears not as a general term for informal language, but as a specific label for criminal argot. The word belonged to the world it described.

Its etymology remains contested. The Oxford English Dictionary traces possible roots to Norwegian sleng (a sling or verbal attack) or to a clipped form of "beggars' language." What's certain is the trajectory: from the mouths of pickpockets and con artists into the pages of respectable dictionaries, a journey of about a century.`,
  },
  // Panel 2: Birth Certificate
  {
    id: 2,
    era: 'georgian',
    title: 'Birth Certificate',
    subtitle: 'London, 1756',
    body: `A novelist—not a scholar—first wrote it down. William Toldervy, penning a story of orphans navigating London's shadows, recorded the word that would outlive his forgotten fiction. "Thomas Throw had been upon the town, knew the slang well." Eight words. An etymology begins.`,
    artifact: {
      type: 'stamp',
      content: 'ATTESTED 1756',
    },
    citations: ['Toldervy, William. The History of Two Orphans. London, 1756.'],
  },
  // Panel 3: First Sighting
  {
    id: 3,
    era: 'georgian',
    title: 'The First Sighting',
    subtitle: 'A novelist captures what scholars missed',
    body: `Before Toldervy's orphans, no dictionary contained "slang." The word lived only in speech—passed between thieves, beggars, and those who moved through London's unmapped territories. When it finally reached paper, it meant something specific: the secret vocabulary of the criminal class. Not general informality. Not colorful speech. A code.`,
    artifact: {
      type: 'dictionary',
      content: 'SLANG, n. The cant language of thieves and vagabonds.',
    },
    citations: ['OED Online, "slang, n.³" First attestation 1756.'],
  },
  // Panel 4: The Mystery
  {
    id: 4,
    era: 'georgian',
    title: 'The Mystery',
    subtitle: 'Where did this word come from?',
    body: `Etymology is usually a detective story with an ending. Not here. After 250 years of scholarly attention, "slang" keeps its secrets. The leading suspect: Scandinavian languages. Norwegian has slengja (to sling) and slengjeord (slang word). But "prime suspect" isn't "convicted." The OED marks it simply: "origin unknown." Fitting, perhaps, for a word that names the ungovernable.`,
    artifact: {
      type: 'marginalia',
      content: '⚠ Etymology uncertain. Scandinavian origin plausible but unproven.',
    },
    citations: [
      'Liberman, Anatoly. "The origin of slang." OUP Blog, 2016.',
      'OED Online, etymology note.',
    ],
  },
  // Panel 5: Scandinavian Suspect
  {
    id: 5,
    era: 'georgian',
    title: 'The Scandinavian Suspect',
    subtitle: 'A theory, not a verdict',
    body: `Isaac Taylor, writing in the 1860s, first made the connection: Norwegian slengja means "to sling"—to throw words carelessly. Slengjenamn: a nickname. Slengjeord: a slang word. The semantic fit is elegant. Viking-age Scandinavians settled across Britain; their words seeped into English. But evidence remains circumstantial. No document shows the transfer. The case stays open.`,
    artifact: {
      type: 'glossary',
      content: 'slengja (Norw.) — to sling, throw\nslengjeord — slang word\nslengjenamn — nickname',
    },
    citations: ['Taylor, Isaac. Words and Places. London, 1864.'],
  },
  // Panel 6: Criminal Beginnings
  {
    id: 6,
    era: 'victorian',
    title: 'Criminal Beginnings',
    subtitle: 'Cant, flash, and the language of the underground',
    body: `Before "slang" existed, there was "cant"—the secret language of beggars and thieves documented since the 1530s. Francis Grose, a retired army captain with a taste for low company, spent nights in London's taverns collecting their vocabulary. His 1785 Classical Dictionary of the Vulgar Tongue became the Rosetta Stone of criminal speech. Entry: "SLANG. Cant language."`,
    artifact: {
      type: 'dictionary',
      content: 'SLANG. Cant language.\n— Grose, 1785',
    },
    citations: ['Grose, Francis. A Classical Dictionary of the Vulgar Tongue. London, 1785.'],
  },
  // Panel 7: The Expansion
  {
    id: 7,
    era: 'victorian',
    title: 'The Expansion',
    subtitle: 'From thieves to everyone',
    body: `By 1818, "slang" had escaped its criminal origins. The OED records a crucial shift: now it meant any "language of a highly colloquial type." No longer just thieves' cant—but the informal speech of soldiers, students, sailors, anyone. The word expanded to match a growing awareness: formal language was only one layer of how people actually talked.`,
    artifact: {
      type: 'glossary',
      content: '1756 — criminal cant\n1801 — includes jargon\n1818 — general informal speech',
    },
    citations: ['OED Online, "slang, n.³" sense development.'],
  },
  // Panel 8: Slang's Neighbors
  {
    id: 8,
    era: 'victorian',
    title: "Slang's Neighbors",
    subtitle: 'A family of outsiders',
    body: `"Slang" lives in a crowded neighborhood. Cant: the secret language of criminals. Argot: French term for the same. Jargon: technical vocabulary of professions. Colloquial: informal but stable. Vernacular: everyday speech of a region. Dialect: regional pronunciation and grammar. They overlap, blur, argue at the boundaries. Understanding slang means mapping this constellation.`,
    citations: [
      'Coleman, Julie. The Life of Slang. Oxford UP, 2012.',
      'Eble, Connie. Slang and Sociability. UNC Press, 1996.',
    ],
  },
  // Panel 9: The Collectors
  {
    id: 9,
    era: 'victorian',
    title: 'The Collectors',
    subtitle: 'Those who documented the undocumented',
    body: `Francis Grose tramped through London's dangerous nights. John Camden Hotten published the first dictionary with "slang" in its title (1859). Eric Partridge made slang academically respectable (1937). Jonathon Green spent decades compiling 125,000 entries for the largest slang dictionary ever assembled. They share a mission: treating marginal language as worthy of the same scholarly care as Shakespeare.`,
    citations: [
      "Green, Jonathon. Green's Dictionary of Slang. Chambers, 2010.",
      'Partridge, Eric. A Dictionary of Slang and Unconventional English. Routledge, 1937.',
    ],
  },
  // Panel 10: The Judges
  {
    id: 10,
    era: 'victorian',
    title: 'The Judges',
    subtitle: '"A conscious offence against propriety"',
    body: `Not everyone celebrated slang. Henry Bradley, writing the Encyclopædia Britannica entry in 1911, defined it as "a conscious offence against some conventional standard of propriety." The Victorians saw slang as moral failure—evidence of vulgarity, laziness, perhaps dangerous politics. To use slang was to mark yourself as outside respectable society. The gatekeepers watched, and judged.`,
    artifact: {
      type: 'quote',
      content: 'Slang is a conscious offence against some conventional standard of propriety.',
      source: 'Henry Bradley, 1911',
    },
    citations: ['Bradley, Henry. "Slang." Encyclopædia Britannica, 11th ed., 1911.'],
  },
  // Panel 11: The Champions
  {
    id: 11,
    era: 'american',
    title: 'The Champions',
    subtitle: '"Devised by individuals of wit and ingenuity"',
    body: `America inverted the judgment. Walt Whitman called slang "the lawless germinal element, below all words and sentences, and behind all poetry" (1885). H.L. Mencken declared that slang "is devised not by the stupid populace, but by individuals of wit and ingenuity" (1919). What Europe called vulgar, America claimed as democratic genius—the people's poetry, made fresh.`,
    artifact: {
      type: 'quote',
      content: 'Slang is the lawless germinal element, below all words and sentences, and behind all poetry.',
      source: 'Walt Whitman, 1885',
    },
    citations: [
      'Whitman, Walt. "Slang in America." North American Review, 1885.',
      'Mencken, H.L. The American Language. Knopf, 1919.',
    ],
  },
  // Panel 12: Timeline
  {
    id: 12,
    era: 'american',
    title: '250 Years of "Slang"',
    subtitle: 'A timeline',
    body: `From Harman's cant glossary (1566) through Toldervy's first attestation (1756) to Urban Dictionary (1999) and beyond—the word "slang" has traveled through criminal underworlds, scholarly dictionaries, newspaper columns, and digital platforms. Each era left its mark on what the word means and who gets to use it.`,
  },
  // Panel 13: Global Spread
  {
    id: 13,
    era: 'american',
    title: 'The Global Word',
    subtitle: 'From London to everywhere',
    body: `"Slang" spread with English itself. American slang diverged from British. Australian slang developed its own ecosystem. Indian English created hybrid forms. South African, Caribbean, Philippine—each variety generated its own informal vocabularies, all labeled with this once-marginal word. The term became global infrastructure for discussing how people actually talk.`,
    citations: ['Coleman, Julie. The Life of Slang. Oxford UP, 2012, Ch. 8.'],
  },
  // Panel 14: Internet Engine
  {
    id: 14,
    era: 'digital',
    title: 'The Internet Engine',
    subtitle: 'When slang got velocity',
    body: `The internet didn't create slang—but it accelerated everything. Words that once spread through neighborhoods now spread through platforms in hours. Urban Dictionary, founded 1999, made everyone a lexicographer. TikTok compressed the slang lifecycle from years to weeks. Gretchen McCulloch observed: "The internet didn't create new types of informal language... it made informal writing normal."`,
    artifact: {
      type: 'quote',
      content: 'The internet made informal writing normal.',
      source: 'Gretchen McCulloch, 2019',
    },
    citations: ['McCulloch, Gretchen. Because Internet. Riverhead, 2019.'],
  },
  // Panel 15: Half-Life
  {
    id: 15,
    era: 'digital',
    title: 'The Half-Life',
    subtitle: 'Why words burn bright, then vanish',
    body: `Slang has always been ephemeral—that's part of its function. Words mark belonging to a moment, a group, a generation. When everyone's parents start saying "lit," the word dies for its creators. The internet compressed this cycle. A word can be born, peak, become cringe, and fossilize within a single year. Speed is the new secrecy.`,
    artifact: {
      type: 'glossary',
      content: 'cool → groovy → rad → fresh → lit → ???',
    },
  },
  // Panel 16: Closing
  {
    id: 16,
    era: 'close',
    title: "The Rogue's Return",
    subtitle: 'Language belongs to those who speak it',
    body: `The word "slang" began as slang—insider vocabulary escaping into print. It named what dictionaries couldn't control, what schools couldn't standardize, what gatekeepers couldn't gate. Two hundred fifty years later, the mystery of its origin remains. And that feels right. Some words refuse to be fully documented. They belong to those who use them, not to those who define them.`,
    artifact: {
      type: 'quote',
      content: 'Language belongs to those who speak it.',
    },
  },
];

const keyFigures: KeyFigure[] = [
  {
    name: 'Francis Grose',
    years: '1731–1791',
    era: 'Georgian',
    bio: 'Antiquarian and lexicographer who compiled the first major dictionary of "low" English by spending nights in London taverns with thieves and beggars.',
    contribution: '"SLANG. Cant language." — Classical Dictionary, 1785',
    style: 'scholarly',
  },
  {
    name: 'John Camden Hotten',
    years: '1832–1873',
    era: 'Victorian',
    bio: 'Publisher and lexicographer who produced the first dictionary with "Slang" in its title, legitimizing the field.',
    contribution: 'The Slang Dictionary, 1859 — first etymological slang reference',
    style: 'victorian',
  },
  {
    name: 'Henry Bradley',
    years: '1845–1923',
    era: 'Victorian',
    bio: 'Philologist and OED editor who wrote the authoritative (and judgmental) Britannica entry on slang.',
    contribution: '"A conscious offence against propriety" — Britannica, 1911',
    style: 'scholarly',
  },
  {
    name: 'Walt Whitman',
    years: '1819–1892',
    era: 'American',
    bio: 'Poet who championed slang as democratic expression—the "lawless germinal element" beneath all poetry.',
    contribution: '"Slang in America" — North American Review, 1885',
    style: 'poetic',
  },
  {
    name: 'H.L. Mencken',
    years: '1880–1956',
    era: 'American',
    bio: 'Journalist and cultural critic who celebrated American slang as creative genius, not vulgarity.',
    contribution: 'The American Language, 1919 — rehabilitated slang\'s reputation',
    style: 'newspaper',
  },
  {
    name: 'Eric Partridge',
    years: '1894–1979',
    era: 'Modern',
    bio: 'New Zealand-born lexicographer who made slang study academically respectable with rigorous documentation.',
    contribution: 'Dictionary of Slang and Unconventional English, 1937',
    style: 'academic',
  },
  {
    name: 'Connie Eble',
    years: 'b. 1940s',
    era: 'Modern',
    bio: 'Sociolinguist who reframed slang as social glue rather than linguistic decay.',
    contribution: '"Creates solidarity within a social group" — 1996',
    style: 'academic',
  },
  {
    name: 'Jonathon Green',
    years: 'b. 1948',
    era: 'Contemporary',
    bio: 'Lexicographer who spent 30 years compiling the largest slang dictionary ever: 125,000+ entries.',
    contribution: 'Green\'s Dictionary of Slang, 2010',
    style: 'modern',
  },
];

const timeline: Milestone[] = [
  { year: 1566, era: 'pre', event: 'Harman\'s cant glossary—first documentation of criminal vocabulary', source: 'Harman', highlight: false },
  { year: 1698, era: 'pre', event: 'B.E.\'s Canting Crew dictionary published', source: 'B.E.', highlight: false },
  { year: 1741, era: 'georgian', event: 'First verb use: "slanging" in Tyburn account', source: 'OED', highlight: false },
  { year: 1756, era: 'georgian', event: 'FIRST NOUN ATTESTATION — Toldervy\'s orphans', source: 'Toldervy', highlight: true },
  { year: 1785, era: 'georgian', event: 'Grose\'s Vulgar Tongue published', source: 'Grose', highlight: true },
  { year: 1801, era: 'victorian', event: '"Slang" expands to include jargon', source: 'OED', highlight: false },
  { year: 1818, era: 'victorian', event: 'Meaning broadens to general informal speech', source: 'OED', highlight: false },
  { year: 1859, era: 'victorian', event: 'Hotten\'s Slang Dictionary—first with "slang" in title', source: 'Hotten', highlight: true },
  { year: 1864, era: 'victorian', event: 'Taylor proposes Scandinavian etymology', source: 'Taylor', highlight: false },
  { year: 1885, era: 'victorian', event: 'Whitman\'s "Slang in America" essay', source: 'Whitman', highlight: true },
  { year: 1911, era: 'victorian', event: 'Bradley\'s Britannica definition: "conscious offence"', source: 'Bradley', highlight: false },
  { year: 1919, era: 'american', event: 'Mencken\'s American Language champions slang', source: 'Mencken', highlight: true },
  { year: 1937, era: 'american', event: 'Partridge\'s Dictionary legitimizes academic study', source: 'Partridge', highlight: false },
  { year: 1960, era: 'american', event: 'Sociolinguistics emerges as field', source: 'Labov', highlight: false },
  { year: 1996, era: 'digital', event: 'Eble\'s Slang and Sociability reframes slang as solidarity', source: 'Eble', highlight: false },
  { year: 1999, era: 'digital', event: 'Urban Dictionary founded—crowdsourced lexicography', source: 'Peckham', highlight: true },
  { year: 2010, era: 'digital', event: 'Green\'s Dictionary: 125,000+ entries', source: 'Green', highlight: false },
  { year: 2019, era: 'digital', event: 'McCulloch\'s Because Internet analyzes digital slang', source: 'McCulloch', highlight: false },
];

// Concept constellation data
const concepts = [
  { term: 'SLANG', definition: 'Informal, ephemeral, in-group vocabulary', x: 50, y: 50, primary: true },
  { term: 'CANT', definition: 'Secret criminal language', x: 25, y: 30 },
  { term: 'ARGOT', definition: 'French term; insider speech', x: 75, y: 25 },
  { term: 'JARGON', definition: 'Technical professional vocabulary', x: 80, y: 55 },
  { term: 'COLLOQUIAL', definition: 'Informal but stable speech', x: 65, y: 80 },
  { term: 'VERNACULAR', definition: 'Everyday regional speech', x: 35, y: 75 },
  { term: 'DIALECT', definition: 'Regional pronunciation & grammar', x: 20, y: 55 },
];

export default function TheWordSlangTypographicClient() {
  const [activePanel, setActivePanel] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  // ChatGPT Fix A: animate class is added AFTER mount
  // Base state is visible; animation only runs when .animate is present
  const [animate, setAnimate] = useState(false);

  // Trigger animation on every navigation to this page
  // Using pathname as dependency ensures it runs on client-side navigation too
  useEffect(() => {
    // Reset animation state first
    setAnimate(false);
    
    // Double requestAnimationFrame ensures:
    // 1. First frame: DOM updates with animate=false
    // 2. Second frame: CSS has processed the change, now safe to animate
    let frame2: number;
    const frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        setAnimate(true);
      });
    });
    
    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);

      // Determine active panel based on scroll position
      const panelHeight = window.innerHeight;
      const currentPanel = Math.floor(scrollTop / (panelHeight * 0.8));
      setActivePanel(Math.min(currentPanel, panels.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getEraClass = (era: string) => {
    switch (era) {
      case 'hook': return 'era-hook';
      case 'georgian': return 'era-georgian';
      case 'victorian': return 'era-victorian';
      case 'american': return 'era-american';
      case 'digital': return 'era-digital';
      case 'close': return 'era-close';
      default: return '';
    }
  };

  const renderArtifact = (artifact: Panel['artifact']) => {
    if (!artifact) return null;

    switch (artifact.type) {
      case 'stamp':
        return (
          <div className="artifact artifact-stamp">
            <span className="stamp-text">{artifact.content}</span>
          </div>
        );
      case 'quote':
        return (
          <div className="artifact artifact-quote">
            <blockquote>&ldquo;{artifact.content}&rdquo;</blockquote>
            {artifact.source && <cite>— {artifact.source}</cite>}
          </div>
        );
      case 'dictionary':
        return (
          <div className="artifact artifact-dictionary">
            <div className="dictionary-entry">
              {artifact.content.split('\n').map((line, i) => (
                <div key={i} className="dictionary-line">{line}</div>
              ))}
            </div>
          </div>
        );
      case 'glossary':
        return (
          <div className="artifact artifact-glossary">
            {artifact.content.split('\n').map((line, i) => (
              <div key={i} className="glossary-line">{line}</div>
            ))}
          </div>
        );
      case 'marginalia':
        return (
          <div className="artifact artifact-marginalia">
            <span className="marginalia-text">{artifact.content}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="slang-typographic" ref={containerRef}>
      {/* Progress bar */}
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ height: `${scrollProgress * 100}%` }}
        />
        <div className="progress-markers">
          {panels.map((_, i) => (
            <div 
              key={i}
              className={`progress-marker ${i <= activePanel ? 'active' : ''}`}
              style={{ top: `${(i / (panels.length - 1)) * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="panel-nav">
        <div className="nav-title">SLANG</div>
        <div className="nav-subtitle">The Rogue Archive</div>
      </nav>

      {/* Hero Section - .animate class triggers CSS animations after mount */}
      <section className={`hero-section ${animate ? 'animate' : ''}`}>
        <div className="hero-background">
          <div className="floating-words">
            <span className="float-word" style={{ '--delay': '0s', '--x': '10%', '--y': '20%' } as React.CSSProperties}>cool</span>
            <span className="float-word" style={{ '--delay': '0.5s', '--x': '80%', '--y': '15%' } as React.CSSProperties}>lit</span>
            <span className="float-word" style={{ '--delay': '1s', '--x': '25%', '--y': '70%' } as React.CSSProperties}>hip</span>
            <span className="float-word" style={{ '--delay': '1.5s', '--x': '70%', '--y': '60%' } as React.CSSProperties}>groovy</span>
            <span className="float-word" style={{ '--delay': '2s', '--x': '15%', '--y': '45%' } as React.CSSProperties}>rad</span>
            <span className="float-word" style={{ '--delay': '2.5s', '--x': '85%', '--y': '40%' } as React.CSSProperties}>fresh</span>
            <span className="float-word" style={{ '--delay': '3s', '--x': '50%', '--y': '80%' } as React.CSSProperties}>dope</span>
            <span className="float-word" style={{ '--delay': '3.5s', '--x': '40%', '--y': '25%' } as React.CSSProperties}>sick</span>
          </div>
        </div>
        <div className={`slang-hero-content ${animate ? 'animate' : ''}`}>
          <h1 className={`slang-hero-title ${animate ? 'animate' : ''}`}>
            <span className="slang-letter slang-s">S</span>
            <span className="slang-letter slang-l">L</span>
            <span className="slang-letter slang-a">A</span>
            <span className="slang-letter slang-n">N</span>
            <span className="slang-letter slang-g">G</span>
          </h1>
          <p className="slang-tagline">The Rogue Archive</p>
          <p className="slang-subtitle">A typographic etymology of the word that names the unnamed</p>
          <div className="scroll-indicator">
            <span>Scroll to begin</span>
            <div className="scroll-arrow">↓</div>
          </div>
        </div>
      </section>

      {/* Panels */}
      {panels.map((panel, index) => (
        <section 
          key={panel.id}
          className={`panel ${getEraClass(panel.era)} ${index === activePanel ? 'active' : ''}`}
          id={`panel-${panel.id}`}
        >
          <div className="panel-content">
            <div className="panel-header">
              <span className="panel-number">{String(panel.id).padStart(2, '0')}</span>
              <div className="panel-era-badge">{panel.era.toUpperCase()}</div>
            </div>
            
            <h2 className="panel-title">{panel.title}</h2>
            <p className="panel-subtitle">{panel.subtitle}</p>
            
            <div className="panel-body">
              <p>{panel.body}</p>
            </div>

            {renderArtifact(panel.artifact)}

            {panel.citations && panel.citations.length > 0 && (
              <div className="panel-citations">
                {panel.citations.map((citation, i) => (
                  <cite key={i} className="citation">{citation}</cite>
                ))}
              </div>
            )}
          </div>

          {/* Special content for specific panels */}
          {panel.id === 8 && (
            <div className="concept-constellation">
              <h3 className="constellation-title">The Neighborhood</h3>
              <div className="constellation-map">
                {concepts.map((concept) => (
                  <div 
                    key={concept.term}
                    className={`constellation-node ${concept.primary ? 'primary' : ''}`}
                    style={{ left: `${concept.x}%`, top: `${concept.y}%` }}
                  >
                    <span className="node-term">{concept.term}</span>
                    <span className="node-definition">{concept.definition}</span>
                  </div>
                ))}
                {/* Connection lines */}
                <svg className="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1="50" y1="50" x2="25" y2="30" className="connection-line" />
                  <line x1="50" y1="50" x2="75" y2="25" className="connection-line" />
                  <line x1="50" y1="50" x2="80" y2="55" className="connection-line" />
                  <line x1="50" y1="50" x2="65" y2="80" className="connection-line" />
                  <line x1="50" y1="50" x2="35" y2="75" className="connection-line" />
                  <line x1="50" y1="50" x2="20" y2="55" className="connection-line" />
                </svg>
              </div>
            </div>
          )}

          {panel.id === 9 && (
            <div className="identity-cards">
              {keyFigures.slice(0, 4).map((figure) => (
                <div key={figure.name} className={`identity-card style-${figure.style}`}>
                  <div className="card-name">{figure.name}</div>
                  <div className="card-years">{figure.years}</div>
                  <div className="card-era">{figure.era}</div>
                  <p className="card-bio">{figure.bio}</p>
                  <div className="card-contribution">{figure.contribution}</div>
                </div>
              ))}
            </div>
          )}

          {panel.id === 12 && (
            <div className="timeline-component">
              <div className="timeline-spine">
                {timeline.map((milestone, i) => (
                  <div 
                    key={i}
                    className={`timeline-milestone era-${milestone.era} ${milestone.highlight ? 'highlight' : ''}`}
                  >
                    <div className="milestone-year">{milestone.year}</div>
                    <div className="milestone-marker" />
                    <div className="milestone-content">
                      <p className="milestone-event">{milestone.event}</p>
                      <cite className="milestone-source">{milestone.source}</cite>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      ))}

      {/* More Key Figures (second set) */}
      <section className="panel era-american" id="panel-figures-2">
        <div className="panel-content">
          <h2 className="panel-title">More Champions</h2>
          <p className="panel-subtitle">The modern documentarians</p>
        </div>
        <div className="identity-cards">
          {keyFigures.slice(4).map((figure) => (
            <div key={figure.name} className={`identity-card style-${figure.style}`}>
              <div className="card-name">{figure.name}</div>
              <div className="card-years">{figure.years}</div>
              <div className="card-era">{figure.era}</div>
              <p className="card-bio">{figure.bio}</p>
              <div className="card-contribution">{figure.contribution}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Bibliography */}
      <section className="bibliography-section">
        <h2 className="bibliography-title">Sources</h2>
        <div className="bibliography-content">
          <div className="bib-category">
            <h3>Primary Dictionaries</h3>
            <ul>
              <li>Grose, Francis. <em>A Classical Dictionary of the Vulgar Tongue</em>. London, 1785.</li>
              <li>Hotten, John Camden. <em>The Slang Dictionary</em>. London, 1859.</li>
              <li>Partridge, Eric. <em>A Dictionary of Slang and Unconventional English</em>. Routledge, 1937.</li>
              <li>Green, Jonathon. <em>Green&apos;s Dictionary of Slang</em>. Chambers, 2010.</li>
            </ul>
          </div>
          <div className="bib-category">
            <h3>Scholarly Works</h3>
            <ul>
              <li>Coleman, Julie. <em>The Life of Slang</em>. Oxford UP, 2012.</li>
              <li>Eble, Connie. <em>Slang and Sociability</em>. UNC Press, 1996.</li>
              <li>McCulloch, Gretchen. <em>Because Internet</em>. Riverhead, 2019.</li>
              <li>Mencken, H.L. <em>The American Language</em>. Knopf, 1919.</li>
            </ul>
          </div>
          <div className="bib-category">
            <h3>Essays & Articles</h3>
            <ul>
              <li>Whitman, Walt. &ldquo;Slang in America.&rdquo; <em>North American Review</em>, 1885.</li>
              <li>Bradley, Henry. &ldquo;Slang.&rdquo; <em>Encyclopædia Britannica</em>, 11th ed., 1911.</li>
              <li>Liberman, Anatoly. &ldquo;The origin of slang.&rdquo; <em>OUP Blog</em>, 2016.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="essay-footer">
        <div className="footer-content">
          <p className="footer-colophon">
            A typographic visual essay by Esy. No photographs were used in this production.
            Type is the protagonist.
          </p>
          <p className="footer-copyright">© 2026 Esy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
