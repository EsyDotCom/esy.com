"use client";

import React, { useState, useEffect, useRef } from "react";
import "./the-word-war.css";

// ==================== TYPES ====================

interface EtymologyNode {
  id: string;
  form: string;
  language: string;
  meaning: string;
  date?: string;
  isReconstructed: boolean;
  era: "pie" | "germanic" | "frankish" | "latin" | "norman" | "english";
}

interface CrossLinguisticEntry {
  language: string;
  family: string;
  term: string;
  romanization?: string;
  ipa: string;
  etymology: string;
  relationToEnglish: string;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  isFirstAttestation?: boolean;
}

interface GlossaryTerm {
  term: string;
  definition: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface WordFamilyMember {
  word: string;
  origin: string;
  meaning: string;
}

// ==================== DATA ====================

const etymologyNodes: EtymologyNode[] = [
  {
    id: "pie",
    form: "wers-",
    language: "Proto-Indo-European",
    meaning: "to confuse, mix up",
    isReconstructed: true,
    era: "pie",
  },
  {
    id: "pgmc",
    form: "werz-a-",
    language: "Proto-Germanic",
    meaning: "to bring into confusion",
    isReconstructed: true,
    era: "germanic",
  },
  {
    id: "frankish",
    form: "werra",
    language: "Frankish",
    meaning: "confusion, strife, quarrel",
    isReconstructed: true,
    era: "frankish",
  },
  {
    id: "medieval-latin",
    form: "werra",
    language: "Medieval Latin",
    meaning: "strifes or arguments or seditions",
    date: "858 CE",
    isReconstructed: false,
    era: "latin",
  },
  {
    id: "onf",
    form: "werre",
    language: "Old North French",
    meaning: "difficulty, dispute, hostility, war",
    date: "c. 1000",
    isReconstructed: false,
    era: "norman",
  },
  {
    id: "anglo-norman",
    form: "werre",
    language: "Anglo-Norman",
    meaning: "war, armed conflict",
    date: "c. 1066+",
    isReconstructed: false,
    era: "norman",
  },
  {
    id: "middle-english",
    form: "werre / warre",
    language: "Middle English",
    meaning: "large-scale military conflict",
    date: "c. 1121",
    isReconstructed: false,
    era: "english",
  },
  {
    id: "modern-english",
    form: "war",
    language: "Modern English",
    meaning: "armed conflict between nations or states",
    date: "c. 1500+",
    isReconstructed: false,
    era: "english",
  },
];

const crossLinguisticData: CrossLinguisticEntry[] = [
  {
    language: "French",
    family: "romance",
    term: "guerre",
    ipa: "[gɛʁ]",
    etymology: "< Frankish *werra",
    relationToEnglish: "Same ultimate source",
  },
  {
    language: "Spanish",
    family: "romance",
    term: "guerra",
    ipa: "[ˈgera]",
    etymology: "< Frankish *werra",
    relationToEnglish: "Same ultimate source",
  },
  {
    language: "Italian",
    family: "romance",
    term: "guerra",
    ipa: "[ˈgwɛrra]",
    etymology: "< Frankish *werra",
    relationToEnglish: "Same ultimate source",
  },
  {
    language: "Portuguese",
    family: "romance",
    term: "guerra",
    ipa: "[ˈgɛʁɐ]",
    etymology: "< Frankish *werra",
    relationToEnglish: "Same ultimate source",
  },
  {
    language: "German",
    family: "germanic",
    term: "Krieg",
    ipa: "[kʁiːk]",
    etymology: "< OHG chreg 'stubbornness'",
    relationToEnglish: "Different root",
  },
  {
    language: "Dutch",
    family: "germanic",
    term: "oorlog",
    ipa: "[ˈoːrlɔx]",
    etymology: "< PGmc *uzlagą 'fate, destiny'",
    relationToEnglish: "Different root",
  },
  {
    language: "Russian",
    family: "slavic",
    term: "voyna",
    romanization: "война",
    ipa: "[vɐjˈna]",
    etymology: "< PSl *vojьna < *vojь 'warrior'",
    relationToEnglish: "Unrelated",
  },
  {
    language: "Polish",
    family: "slavic",
    term: "wojna",
    ipa: "[ˈvɔjna]",
    etymology: "< Proto-Slavic *vojьna",
    relationToEnglish: "Unrelated",
  },
  {
    language: "Arabic",
    family: "semitic",
    term: "harb",
    romanization: "حرب",
    ipa: "[ħarb]",
    etymology: "< Proto-Semitic *x̣arb- 'blade'",
    relationToEnglish: "Unrelated",
  },
  {
    language: "Hebrew",
    family: "semitic",
    term: "milkhamah",
    romanization: "מלחמה",
    ipa: "[milχaˈma]",
    etymology: "< root l-ḥ-m 'to fight'",
    relationToEnglish: "Unrelated",
  },
  {
    language: "Chinese",
    family: "sino-tibetan",
    term: "zhanzheng",
    romanization: "战争",
    ipa: "[ʈʂân.ʈʂə́ŋ]",
    etymology: "戰 'battle' + 爭 'struggle'",
    relationToEnglish: "Unrelated",
  },
  {
    language: "Japanese",
    family: "japonic",
    term: "senso",
    romanization: "戦争",
    ipa: "[seɴsoː]",
    etymology: "Sino-Japanese 戰爭",
    relationToEnglish: "Unrelated",
  },
  {
    language: "Korean",
    family: "koreanic",
    term: "jeonjaeng",
    romanization: "전쟁",
    ipa: "[t͡ɕʌnd͡ʑɛŋ]",
    etymology: "Sino-Korean 戰爭",
    relationToEnglish: "Unrelated",
  },
  {
    language: "Hindi",
    family: "indo-iranian",
    term: "yuddh",
    romanization: "युद्ध",
    ipa: "[jud̪d̪ʰ]",
    etymology: "< Sanskrit < PIE *yewdʰ- 'to fight'",
    relationToEnglish: "PIE cognate (distant)",
  },
  {
    language: "Swahili",
    family: "bantu",
    term: "vita",
    ipa: "[ˈvi.ta]",
    etymology: "Bantu origin, collective noun",
    relationToEnglish: "Unrelated",
  },
];

const timelineEvents: TimelineEvent[] = [
  { year: "Pre-history", title: "PIE *wers-", description: "'To confuse, mix up' - the reconstructed root" },
  { year: "c. 500 BCE", title: "Proto-Germanic", description: "*werz-a- develops in Germanic languages" },
  { year: "c. 500-850 CE", title: "Frankish *werra", description: "Germanic word for 'confusion, strife' in use" },
  { year: "858 CE", title: "First Written Record", description: "Latin episcopal letter uses 'werras' as vernacular term", isFirstAttestation: true },
  { year: "1066", title: "Norman Conquest", description: "Anglo-Norman 'werre' brought to England" },
  { year: "c. 1121", title: "First English Use", description: "Peterborough Chronicle records 'wyrre'", isFirstAttestation: true },
  { year: "c. 1300", title: "'warrior' appears", description: "From Old North French 'werreier'" },
  { year: "c. 1400", title: "'warfare' formed", description: "Compound of war + fare" },
  { year: "c. 1500", title: "Spelling standardizes", description: "'war' becomes the standard form" },
  { year: "1848", title: "'world war' coined", description: "First use in The People's Journal, Scotland" },
  { year: "1939", title: "WWI/WWII named", description: "Time Magazine coins the designations" },
  { year: "1964", title: "'War on Poverty'", description: "LBJ popularizes figurative 'war on X'" },
];

const glossaryTerms: GlossaryTerm[] = [
  { term: "Attestation", definition: "The earliest recorded occurrence of a word in written documents." },
  { term: "Cognate", definition: "Words in different languages that share a common etymological origin." },
  { term: "Reconstructed form", definition: "A hypothetical ancestral word, marked with an asterisk (*), inferred from descendant languages." },
  { term: "Loanword", definition: "A word adopted from one language into another with little or no modification." },
  { term: "Semantic shift", definition: "A change in the meaning of a word over time." },
  { term: "Proto-Indo-European (PIE)", definition: "The reconstructed common ancestor of the Indo-European language family, spoken c. 4500-2500 BCE." },
  { term: "Proto-Germanic", definition: "The reconstructed ancestor of all Germanic languages, including English, German, and Dutch." },
  { term: "Frankish", definition: "The West Germanic language of the Franks, ancestor of many French loanwords." },
  { term: "Old North French", definition: "Northern dialects of Old French, including Norman, which retained Germanic /w/ sound." },
  { term: "Anglo-Norman", definition: "The variety of Norman French spoken in England after the Conquest." },
  { term: "Middle English", definition: "English as spoken c. 1100-1500, showing heavy French influence." },
  { term: "Palimpsest", definition: "A manuscript where older text has been scraped off and new text written over, with traces remaining." },
  { term: "Cloisonne", definition: "Metalwork technique using thin metal walls to create cells filled with enamel or gemstones." },
  { term: "Rubrication", definition: "The use of red ink for headings, capitals, or annotations in manuscripts." },
  { term: "Iron gall ink", definition: "The standard writing ink from antiquity through the 19th century, made from galls and iron sulfate." },
];

const faqItems: FaqItem[] = [
  {
    question: "What is the origin of the English word 'war'?",
    answer: "The English word 'war' comes from Old North French 'werre,' which derived from Frankish '*werra' (reconstructed). This Frankish word traces back to Proto-Indo-European '*wers-' meaning 'to confuse, mix up.' The word entered English after the Norman Conquest of 1066."
  },
  {
    question: "When was 'war' first used in English?",
    answer: "The first recorded use appears in the Peterborough Chronicle, written c.1121-1122. The entry describes events of 1116 and uses the spelling 'wyrre' to describe King Henry I's conflict in Normandy."
  },
  {
    question: "Why do Romance languages use 'guerra' instead of a Latin word?",
    answer: "Romance languages abandoned the Latin word 'bellum' (war) because it became phonetically identical to 'bellus' (beautiful) in Vulgar Latin. To avoid confusion, speakers adopted the Frankish Germanic word '*werra.'"
  },
  {
    question: "What did the word 'war' originally mean?",
    answer: "The Proto-Indo-European root '*wers-' meant 'to confuse, mix up.' The Germanic descendant '*werra' meant 'confusion, strife, quarrel.' The semantic shift from 'disorder' to 'organized armed conflict' occurred gradually over centuries."
  },
  {
    question: "What Old English words did 'war' replace?",
    answer: "Before the Norman Conquest, English used native words like 'guth,' 'wig,' 'gewin,' and 'hild' for war and battle. The French-derived 'werre' displaced these terms after 1066. Some survive only in personal names."
  },
  {
    question: "Why do Germanic languages have different words for 'war'?",
    answer: "Despite being related languages, Germanic tongues use completely different words: English 'war' (from French), German 'Krieg' (from 'stubbornness'), and Dutch 'oorlog' (from 'fate'). The OED notes that 'no Germanic nation in early historic times had in living use any word properly meaning war.'"
  },
  {
    question: "When was the term 'World War' first used?",
    answer: "The term 'world war' first appeared in English in 1848 in The People's Journal (Scotland). The designations 'World War I' and 'World War II' were coined by Time Magazine on June 12, 1939."
  },
  {
    question: "What is the origin of 'War on Poverty' and similar phrases?",
    answer: "The figurative 'War on X' construction became prominent in 20th-century American politics. Attorney General Homer Cummings declared a 'War on Crime' in 1933. President Lyndon B. Johnson declared 'War on Poverty' in 1964. Nixon's 'War on Drugs' followed in 1971."
  },
  {
    question: "What does 'warrior' mean etymologically?",
    answer: "'Warrior' comes from Old North French 'werreier,' meaning 'one who wages war.' It first appeared in English around 1300 in the Chronicle of Robert of Gloucester."
  },
  {
    question: "How do other languages conceptualize 'war'?",
    answer: "Different languages encode different concepts: English 'war' (confusion), German 'Krieg' (stubbornness), Dutch 'oorlog' (fate), Russian 'voyna' (warrior activity), Arabic 'harb' (blade), Chinese 'zhanzheng' (battle-struggle), Hindi 'yuddh' (to fight)."
  },
];

const wordFamilyMembers: WordFamilyMember[] = [
  { word: "warrior", origin: "ONF werreier, c.1300", meaning: "One who wages war" },
  { word: "warfare", origin: "war + fare, c.1400", meaning: "Military operations" },
  { word: "warlike", origin: "war + like", meaning: "Disposed to war" },
  { word: "warmonger", origin: "war + monger", meaning: "One who advocates for war" },
  { word: "wartime", origin: "war + time", meaning: "Period during a war" },
  { word: "war-weary", origin: "war + weary, 1895", meaning: "Exhausted by war" },
  { word: "war chest", origin: "1901", meaning: "Funds reserved for conflict" },
  { word: "war crime", origin: "1906", meaning: "Violation of laws of war" },
];

// ==================== HOOKS ====================

const useIntersectionReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// ==================== COMPONENTS ====================

// Progress Bar showing word as tracked target
const TrackingProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  const getTargetWord = () => {
    if (progress < 33) return "*WERRA";
    if (progress < 66) return "WERRE";
    return "WAR";
  };

  return (
    <div className="tracking-progress-bar">
      <div className="tracking-status">
        <span className="status-indicator" />
        <span className="status-text">Target Tracking</span>
      </div>
      <div className="target-word-display">
        <span className={`target-word ${progress >= 66 ? "locked" : ""}`}>
          {getTargetWord()}
        </span>
        <span className="tracking-coordinates">
          {progress < 33 ? "FRANKISH c.500" : progress < 66 ? "NORMAN 1066" : "ENGLISH 1121"}
        </span>
      </div>
      <span className="tracking-percentage">{Math.round(progress)}%</span>
    </div>
  );
};

// Section wrapper with reveal
const Section: React.FC<{
  id: string;
  era?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id, era, className = "", children }) => {
  const { ref, isVisible } = useIntersectionReveal(0.1);

  return (
    <section
      ref={ref}
      id={id}
      data-era={era}
      className={`content-section ${className} ${isVisible ? "visible" : ""}`}
    >
      {children}
    </section>
  );
};

// Data Stat
const DataStat: React.FC<{
  value: string;
  label: string;
  source?: string;
}> = ({ value, label, source }) => (
  <div className="data-stat">
    <span className="data-value">{value}</span>
    <span className="data-label">{label}</span>
    {source && <span className="data-source">{source}</span>}
  </div>
);

// Quote Monument
const QuoteMonument: React.FC<{
  quote: string;
  attribution: string;
  translation?: string;
  isHistorical?: boolean;
}> = ({ quote, attribution, translation, isHistorical }) => (
  <div className={`quote-monument ${isHistorical ? "historical" : ""}`}>
    <blockquote>
      <p>&ldquo;{quote}&rdquo;</p>
      {translation && <p className="translation">{translation}</p>}
      <cite>&mdash; {attribution}</cite>
    </blockquote>
  </div>
);

// Etymology Node Component
const EtymologyNodeCard: React.FC<{ node: EtymologyNode }> = ({ node }) => (
  <div className={`etymology-node ${node.isReconstructed ? "reconstructed" : ""}`}>
    <div className="node-content">
      <div className="node-language">{node.language}</div>
      <div className={`node-form ${node.isReconstructed ? "reconstructed" : ""}`}>
        {node.form}
      </div>
      <div className="node-meaning">&ldquo;{node.meaning}&rdquo;</div>
      {node.date && <div className="node-date">{node.date}</div>}
    </div>
  </div>
);

// Cognate Card
const CognateCard: React.FC<{ entry: CrossLinguisticEntry }> = ({ entry }) => (
  <div className="cognate-card" data-family={entry.family}>
    <div className="cognate-language">{entry.language}</div>
    <div className="cognate-word">
      {entry.romanization || entry.term}
    </div>
    {entry.romanization && (
      <div className="cognate-ipa">{entry.term}</div>
    )}
    <div className="cognate-ipa">{entry.ipa}</div>
    <div className="cognate-etymology">{entry.etymology}</div>
    <div className="cognate-relation">{entry.relationToEnglish}</div>
  </div>
);

// ==================== MAIN COMPONENT ====================

const TheWordWarClient: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroWord, setHeroWord] = useState("*WERRA");
  const [heroClass, setHeroClass] = useState("frankish-form");

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, currentProgress)));

      // Update hero word based on scroll
      if (currentProgress < 20) {
        setHeroWord("*WERRA");
        setHeroClass("frankish-form");
      } else if (currentProgress < 40) {
        setHeroWord("WERRE");
        setHeroClass("frankish-form");
      } else {
        setHeroWord("WAR");
        setHeroClass("settled-form");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="war-essay">
      {/* Progress Bar */}
      <TrackingProgressBar progress={scrollProgress} />

      {/* ==================== HERO SECTION ==================== */}
      <section className="hero-section">
        <div className="radar-sweep" />
        <p className="hero-acquisition">Signal Detected // Linguistic Asset</p>
        <div className="hero-target-container">
          <span className={`hero-word ${scrollProgress >= 66 ? "tracking" : ""}`}>{heroWord}</span>
        </div>
        <p className="hero-designation">
          ORIGIN: PIE *wers- // STATUS: {scrollProgress >= 66 ? "LOCKED" : "TRACKING"}
        </p>
        <h1 className="hero-subtitle">
          How a Frankish term for confusion became English&apos;s name for organized violence
        </h1>
        <div className="evergreen-frame">
          This essay studies the history of a word, not the glamor of violence.
        </div>
      </section>

      {/* ==================== SECTION 1: WHAT WE MEAN ==================== */}
      <Section id="what-we-mean" era="english" className="chapter">
        <div className="section-header">
          <span className="section-id">SEC-01</span>
          <h2 className="section-title">What We Mean When We Say &ldquo;War&rdquo;</h2>
        </div>

        <div className="section-intro">
          <p className="lead-paragraph">
            The Oxford English Dictionary defines <strong>war</strong> as &ldquo;hostile
            contention by means of armed forces, carried on between nations, states,
            or rulers, or between parties in the same nation or state.&rdquo; This
            definition carries legal weight: declarations of war invoke international
            law, war crimes tribunals, and the laws of armed conflict.
          </p>
        </div>

        <div className="content-block">
          <p>
            But the word has traveled far from its origins. When a medieval scribe
            first wrote <em lang="enm">wyrre</em> in the Peterborough Chronicle, the
            word meant something closer to &ldquo;confusion&rdquo; or &ldquo;strife&rdquo;
            than the organized, state-sanctioned violence we now understand.
          </p>
          <p>
            This essay studies the history of a word, not the glamor of violence.
            Every date is drawn from scholarly sources. Every reconstructed form is
            marked with an asterisk. The journey begins in prehistory and ends in
            the present moment.
          </p>
        </div>
      </Section>

      <div className="wax-seal-break">
        <div className="wax-seal">W</div>
      </div>

      {/* ==================== SECTION 2: ETYMOLOGY SPINE ==================== */}
      <Section id="etymology-spine" era="frankish" className="chapter">
        <div className="section-header">
          <span className="section-number">Section Two</span>
          <h2 className="section-title">The Etymology Spine</h2>
          <span className="section-temporal">From PIE to Modern English</span>
        </div>

        <div className="section-intro">
          <p className="lead-paragraph">
            The word <strong>war</strong> traces back to Proto-Indo-European{" "}
            <span className="reconstructed-form" lang="ine">wers-</span>, meaning
            &ldquo;to confuse, mix up.&rdquo; This root evolved through Proto-Germanic,
            Frankish, and Norman French before arriving in English.
          </p>
        </div>

        <div className="etymology-river">
          <h3 className="etymology-river-title">The Complete Pathway</h3>
          <div className="etymology-nodes">
            {etymologyNodes.map((node) => (
              <EtymologyNodeCard key={node.id} node={node} />
            ))}
          </div>
        </div>

        <QuoteMonument
          quote="It is a curious fact that no Germanic nation in early historic times had in living use any word properly meaning 'war'."
          attribution="Oxford English Dictionary (1921)"
        />
      </Section>

      <div className="chevron-divider" />

      {/* ==================== SECTION 3: SPELLINGS TO SOUNDS ==================== */}
      <Section id="spellings-sounds" era="norman" className="chapter">
        <div className="section-header">
          <span className="section-number">Section Three</span>
          <h2 className="section-title">From Spellings to Sounds</h2>
          <span className="section-temporal">The w-/gu- Split</span>
        </div>

        <div className="section-intro">
          <p className="lead-paragraph">
            Why does English say <strong>war</strong> while French says{" "}
            <strong lang="fr">guerre</strong>? The answer lies in a sound change that
            divided France&apos;s linguistic geography.
          </p>
        </div>

        <div className="content-block">
          <h3>The Northern Exception</h3>
          <p>
            Standard Old French changed the Germanic /w/ sound to /gw/, which later
            simplified to /g/. This is why Latin <em>Willelmus</em> became French{" "}
            <em lang="fr">Guillaume</em>. The Frankish word <em>*werra</em> followed
            this pattern to become <em lang="fr">guerre</em>.
          </p>
          <p>
            But the northern dialects&mdash;Norman, Picard, Burgundian&mdash;resisted
            this change. They kept the Germanic /w/ sound intact. When Norman
            soldiers crossed the Channel in 1066, they brought <em>werre</em>, not{" "}
            <em>guerre</em>. This is why English has &ldquo;war,&rdquo; &ldquo;ward,&rdquo;
            &ldquo;warden,&rdquo; and &ldquo;warrant&rdquo;&mdash;all preserving the
            Norman /w/.
          </p>
        </div>

        <div className="content-block">
          <h3>Middle English Variants</h3>
          <p>
            The Middle English Dictionary records dozens of spellings: <em>werre</em>,{" "}
            <em>warre</em>, <em>war</em>, <em>weer</em>, <em>weir</em>, <em>weorre</em>,{" "}
            <em>wer</em>, <em>were</em>, <em>werr</em>, and even <em>guer</em>,{" "}
            <em>guerre</em>, <em>gwerre</em>&mdash;showing continued contact with
            Central French forms. The spelling &ldquo;war&rdquo; stabilized only with
            the spread of printing after 1476.
          </p>
        </div>
      </Section>

      <div className="era-transition" />

      {/* ==================== SECTION 4: MEANING DRIFT ==================== */}
      <Section id="meaning-drift" era="frankish" className="chapter">
        <div className="section-header">
          <span className="section-number">Section Four</span>
          <h2 className="section-title">Meaning Drift</h2>
          <span className="section-temporal">From Confusion to Organized Violence</span>
        </div>

        <div className="section-intro">
          <p className="lead-paragraph">
            The word&apos;s semantic journey is as striking as its phonological one.
            The Proto-Indo-European root <span className="reconstructed-form">wers-</span>{" "}
            meant &ldquo;to confuse, mix up&rdquo;&mdash;disorder, not battle.
          </p>
        </div>

        <div className="content-block">
          <p>
            In Proto-Germanic, the verb <span className="reconstructed-form">werran-</span>{" "}
            meant &ldquo;to bring into confusion.&rdquo; Old Saxon <em>werran</em> and
            Old High German <em>werran</em> meant &ldquo;to confuse.&rdquo; The noun{" "}
            <em>werra</em> in Old High German meant &ldquo;confusion, strife.&rdquo;
          </p>
          <p>
            By the time the word entered Frankish and was borrowed into Medieval Latin
            in 858 CE, it had shifted to &ldquo;strife, quarrel, sedition.&rdquo; The
            episcopal letter that first attests it glosses <em>werras</em> as what common
            people call &ldquo;strifes or arguments or seditions.&rdquo;
          </p>
          <p>
            The further shift to &ldquo;organized armed conflict between states&rdquo;
            appears complete by the Middle English period. The Peterborough Chronicle&apos;s
            first use in 1121 already refers to King Henry I&apos;s campaign in Normandy&mdash;a
            royal military expedition, not mere confusion.
          </p>
        </div>

        <QuoteMonument
          quote="The cognates suggest the original sense was 'bring into confusion.'"
          attribution="Douglas Harper, Etymonline"
        />
      </Section>

      <div className="wax-seal-break">
        <div className="wax-seal">W</div>
      </div>

      {/* ==================== SECTION 5: WORD FAMILY ==================== */}
      <Section id="word-family" era="english" className="chapter">
        <div className="section-header">
          <span className="section-number">Section Five</span>
          <h2 className="section-title">The Word Family</h2>
          <span className="section-temporal">Warrior, Warfare, and Compounds</span>
        </div>

        <div className="section-intro">
          <p className="lead-paragraph">
            Once <em>war</em> entered English, it became remarkably productive,
            generating compounds and derivatives that extended its semantic reach
            across centuries.
          </p>
        </div>

        <div className="word-family">
          <h3 className="word-family-title">The War Word Family</h3>
          <div className="word-family-grid">
            {wordFamilyMembers.map((member) => (
              <div key={member.word} className="word-family-item">
                <div className="word-family-word">{member.word}</div>
                <div className="word-family-origin">{member.origin}</div>
                <div className="word-family-meaning">{member.meaning}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="content-block">
          <h3>The Figurative &ldquo;War on X&rdquo;</h3>
          <p>
            The 20th century extended &ldquo;war&rdquo; metaphorically to non-military
            campaigns. Attorney General Homer Cummings declared a &ldquo;War on
            Crime&rdquo; in 1933. President Lyndon B. Johnson&apos;s 1964 State of the
            Union declared &ldquo;unconditional war on poverty in America.&rdquo;
            Nixon&apos;s &ldquo;War on Drugs&rdquo; followed in 1971. The construction
            is now ubiquitous.
          </p>
        </div>
      </Section>

      <div className="chevron-divider" />

      {/* ==================== SECTION 6: SEMANTIC CONSTELLATION ==================== */}
      <Section id="semantic-constellation" era="english" className="chapter">
        <div className="section-header">
          <span className="section-number">Section Six</span>
          <h2 className="section-title">War vs. Battle vs. Conflict</h2>
          <span className="section-temporal">The Semantic Constellation</span>
        </div>

        <div className="section-intro">
          <p className="lead-paragraph">
            English distinguishes between terms that other languages may conflate.
            Understanding these distinctions illuminates what makes &ldquo;war&rdquo;
            semantically unique.
          </p>
        </div>

        <div className="semantic-constellation">
          <h3 className="semantic-constellation-title">Three Key Terms</h3>
          <div className="semantic-grid">
            <div className="semantic-card primary">
              <div className="semantic-word">War</div>
              <div className="semantic-etymology">From Frankish *werra &ldquo;confusion&rdquo;</div>
              <div className="semantic-distinction">
                Sustained armed conflict between nations or organized groups.
                Legal status: can be declared, governed by international law.
              </div>
            </div>
            <div className="semantic-card">
              <div className="semantic-word">Battle</div>
              <div className="semantic-etymology">From OF bataille &lt; VL *battualia</div>
              <div className="semantic-distinction">
                A single engagement or combat. Discrete event within a war.
                Etymology from &ldquo;beating, fighting.&rdquo;
              </div>
            </div>
            <div className="semantic-card">
              <div className="semantic-word">Conflict</div>
              <div className="semantic-etymology">From L conflictus &ldquo;striking together&rdquo;</div>
              <div className="semantic-distinction">
                Broader term including non-violent opposition. Can be
                interpersonal, political, or ideological.
              </div>
            </div>
          </div>
        </div>
      </Section>

      <div className="era-transition" />

      {/* ==================== SECTION 7: WORLD TOUR ==================== */}
      <Section id="world-tour" className="chapter">
        <div className="section-header">
          <span className="section-number">Section Seven</span>
          <h2 className="section-title">A World Tour of &ldquo;War&rdquo;</h2>
          <span className="section-temporal">15 Languages, 7 Families</span>
        </div>

        <div className="section-intro">
          <p className="lead-paragraph">
            How do other languages name war? The diversity reveals different
            conceptualizations of conflict across cultures.
          </p>
        </div>

        <div className="cognate-network">
          <h3 className="cognate-network-title">Cross-Linguistic Comparison</h3>
          <div className="cognate-grid">
            {crossLinguisticData.map((entry) => (
              <CognateCard key={entry.language} entry={entry} />
            ))}
          </div>
        </div>

        <div className="content-block">
          <h3>Key Observations</h3>
          <p>
            <strong>The Frankish Spread:</strong> The Frankish word{" "}
            <em>*werra</em> became the standard word for &ldquo;war&rdquo; in English,
            French, Spanish, Italian, and Portuguese&mdash;all major Romance languages
            except Romanian (which uses the Slavic <em>razboi</em>).
          </p>
          <p>
            <strong>Germanic Diversity:</strong> Despite being language relatives,
            English uses <em>war</em> (from Frankish via French), German uses{" "}
            <em>Krieg</em> (from &ldquo;stubbornness&rdquo;), and Dutch uses{" "}
            <em>oorlog</em> (from &ldquo;fate/decree&rdquo;).
          </p>
          <p>
            <strong>East Asian Unity:</strong> Chinese, Japanese, and Korean all
            use the same characters (戰爭), reflecting historical cultural borrowing
            of Chinese vocabulary.
          </p>
        </div>
      </Section>

      <div className="wax-seal-break">
        <div className="wax-seal">W</div>
      </div>

      {/* ==================== SECTION 8: DEBATES ==================== */}
      <Section id="debates" className="chapter">
        <div className="section-header">
          <span className="section-number">Section Eight</span>
          <h2 className="section-title">Debates and Uncertainties</h2>
        </div>

        <div className="section-intro">
          <p className="lead-paragraph">
            Etymology is not settled science. Several aspects of the word&apos;s
            history remain debated among scholars.
          </p>
        </div>

        <div className="content-block">
          <h3>The Frankish Form</h3>
          <p>
            Frankish is unattested&mdash;no texts survive in the language. The form{" "}
            <span className="reconstructed-form">werra</span> is reconstructed from
            its Romance descendants (French <em>guerre</em>, Spanish/Italian/Portuguese{" "}
            <em>guerra</em>) and the Old High German cognate <em>werra</em>. Some
            sources reconstruct <span className="reconstructed-form">werru</span>.
          </p>

          <h3>Original Meaning</h3>
          <p>
            Sources variously gloss Frankish <span className="reconstructed-form">werra</span>{" "}
            as &ldquo;confusion,&rdquo; &ldquo;strife,&rdquo; &ldquo;quarrel,&rdquo;
            &ldquo;riot,&rdquo; or &ldquo;tumult.&rdquo; The PIE root suggests
            &ldquo;confusion&rdquo; was primary, but Germanic attestations emphasize
            &ldquo;strife/conflict.&rdquo;
          </p>

          <h3>Why Not Latin <em>bellum</em>?</h3>
          <p>
            The dominant theory holds that <em>bellum</em> was abandoned because it
            merged phonologically with <em>bellus</em> (&ldquo;beautiful&rdquo;) in
            Vulgar Latin. Alternative theories suggest <em>bellum</em> described
            &ldquo;orderly&rdquo; Roman warfare while <em>werra</em> captured
            post-Roman chaos, or that <em>bellum</em> acquired taboo associations.
          </p>
        </div>
      </Section>

      <div className="chevron-divider" />

      {/* ==================== SECTION 9: WHY THIS MATTERS ==================== */}
      <Section id="why-matters" era="english" className="chapter">
        <div className="section-header">
          <span className="section-number">Section Nine</span>
          <h2 className="section-title">Why This Matters</h2>
        </div>

        <div className="section-intro">
          <p className="lead-paragraph">
            The etymology of &ldquo;war&rdquo; is not antiquarian trivia. It reveals
            how language shapes thought and how historical forces shape language.
          </p>
        </div>

        <div className="content-block">
          <p>
            The word &ldquo;war&rdquo; is itself a casualty of war. It arrived in
            English on the back of the Norman Conquest, part of the vast linguistic
            transformation that reshaped English after 1066. Native English words
            for war&mdash;<em lang="ang">guth</em>, <em lang="ang">wig</em>,{" "}
            <em lang="ang">hild</em>&mdash;were displaced just as Anglo-Saxon nobles
            were displaced by Norman lords. These Old English words survive only in
            personal names and ancient poetry.
          </p>
          <p>
            The original meaning&mdash;&ldquo;confusion&rdquo;&mdash;persists as
            semantic DNA. War brings confusion. The etymology knew this before
            modern theory articulated &ldquo;fog of war.&rdquo;
          </p>
          <p>
            And the figurative extension to &ldquo;war on poverty,&rdquo; &ldquo;war
            on drugs,&rdquo; &ldquo;culture wars&rdquo; shows how the word continues
            to evolve, its semantic range still expanding a thousand years after it
            first appeared in English.
          </p>
        </div>
      </Section>

      {/* ==================== TIMELINE ==================== */}
      <Section id="timeline" className="chapter">
        <div className="section-header">
          <h2 className="section-title">Timeline: The Word&apos;s Journey</h2>
        </div>
        <div className="timeline-section">
          <div className="timeline">
            {timelineEvents.map((event, i) => (
              <div
                key={i}
                className={`timeline-event ${event.isFirstAttestation ? "first-attestation" : ""}`}
              >
                <span className="timeline-year">{event.year}</span>
                <span className="timeline-dot" />
                <div className="timeline-content">
                  <p className="timeline-event-title">{event.title}</p>
                  <p className="timeline-event-description">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ==================== FAQ SECTION ==================== */}
      <Section id="faq" className="chapter">
        <div className="faq-section">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          {faqItems.map((item, i) => (
            <div key={i} className="faq-item">
              <h3 className="faq-question">{item.question}</h3>
              <p className="faq-answer">{item.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ==================== GLOSSARY ==================== */}
      <section className="glossary-section">
        <h2 className="glossary-title">Mini-Glossary</h2>
        <div className="glossary-grid">
          {glossaryTerms.map((term) => (
            <div key={term.term} className="glossary-term">
              <div className="glossary-term-word">{term.term}</div>
              <div className="glossary-term-definition">{term.definition}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== SOURCES ==================== */}
      <section className="sources-section">
        <h2 className="sources-title">Sources and Further Reading</h2>
        <div className="sources-grid">
          <div className="source-category">
            <h3 className="source-category-title">Primary Dictionaries</h3>
            <ul className="source-list">
              <li>Oxford English Dictionary, &ldquo;war, n.1&rdquo;</li>
              <li>Middle English Dictionary, &ldquo;wer(re)&rdquo;</li>
              <li>Anglo-Norman Dictionary</li>
              <li>Johnson, Samuel. <em>A Dictionary of the English Language</em> (1755)</li>
            </ul>
          </div>
          <div className="source-category">
            <h3 className="source-category-title">Etymological References</h3>
            <ul className="source-list">
              <li>Harper, Douglas. Etymonline, &ldquo;war&rdquo;</li>
              <li>Kluge, Friedrich. <em>Etymological Dictionary of the German Language</em></li>
              <li>de Vaan, Michiel. <em>Etymological Dictionary of Latin</em> (2008)</li>
              <li>Watkins, Calvert. <em>American Heritage Dictionary of Indo-European Roots</em></li>
            </ul>
          </div>
          <div className="source-category">
            <h3 className="source-category-title">Primary Sources</h3>
            <ul className="source-list">
              <li>Peterborough Chronicle (MS. Laud Misc. 636, Bodleian Library)</li>
              <li>Episcopal letter from NE France (858 CE), cited in OED</li>
              <li>Time Magazine, June 12, 1939</li>
              <li>LBJ State of the Union Address, January 8, 1964</li>
            </ul>
          </div>
          <div className="source-category">
            <h3 className="source-category-title">Scholarly Works</h3>
            <ul className="source-list">
              <li>Huizinga, Johan. <em>Homo Ludens</em> (1938)</li>
              <li>Britannica entries on Total War, War on Poverty</li>
              <li>Wikipedia entries with scholarly citations verified</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ==================== CONCLUSION ==================== */}
      <section className="conclusion">
        <h2 className="conclusion-title">The Conquered Word</h2>
        <p className="conclusion-text">
          A word born in the confusion of Proto-Indo-European, carried by Frankish
          warriors, transmitted through Norman conquest, and still evolving in
          metaphorical extensions&mdash;&ldquo;war&rdquo; has traveled further than
          most armies. Its etymology is its history: displacement, adoption,
          transformation. The native English words it conquered are forgotten.
          Only the conqueror remains.
        </p>
        <p className="conclusion-question">
          What will &ldquo;war&rdquo; mean in another thousand years?
        </p>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="war-footer">
        <p className="footer-word">WAR</p>
        <p className="footer-text">A Visual Essay by Esy.com</p>
      </footer>
    </div>
  );
};

export default TheWordWarClient;
