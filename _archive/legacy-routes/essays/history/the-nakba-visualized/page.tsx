'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Metadata } from 'next';
import './the-nakba-visualized.css';

/* =============================================================================
   THE NAKBA, VISUALIZED
   1947-1949: Displacement, Memory, and the Making of a Refugee Question

   Built from scratch per Fresh Start Philosophy.
   All content derived from research package.
   ============================================================================= */

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------
interface EvidenceCard {
  id: string;
  title: string;
  description: string;
  citation: string;
}

interface FigureProfile {
  name: string;
  role: string;
  details: string[];
  quote?: string;
  imageStatus: 'available' | 'placeholder';
  imageUrl?: string;
}

interface CaseStudy {
  id: string;
  name: string;
  arabicName?: string;
  type: string;
  population: string;
  displaced: string;
  date: string;
  cause: string;
  coordinates: { lat: number; lng: number };
}

interface GlossaryTerm {
  term: string;
  arabic?: string;
  transliteration?: string;
  definition: string;
}

// -----------------------------------------------------------------------------
// Data from Research Package
// -----------------------------------------------------------------------------
const EVIDENCE_CARDS: Record<string, EvidenceCard[]> = {
  chapter1: [
    {
      id: 'ch1-1',
      title: 'Village Statistics 1945',
      description: 'British Mandate census data documenting the Palestinian population distribution across towns and villages.',
      citation: 'British Mandate Government, Village Statistics 1945, Government Printer, Jerusalem, 1945.'
    },
    {
      id: 'ch1-2',
      title: 'Survey of Palestine (1946)',
      description: 'Comprehensive British government report prepared for the Anglo-American Committee of Inquiry, documenting Palestinian society, economy, and institutions.',
      citation: 'Government of Palestine, A Survey of Palestine, 2 vols., Government Printer, Jerusalem, 1946.'
    },
    {
      id: 'ch1-3',
      title: 'Matson Collection',
      description: 'Over 23,000 photographs documenting daily life in Palestine from 1898-1946, housed at the Library of Congress.',
      citation: 'G. Eric and Edith Matson Photograph Collection, Library of Congress, Prints and Photographs Division.'
    },
    {
      id: 'ch1-4',
      title: 'Palestine Open Maps',
      description: 'Digitized Mandate-era survey maps showing villages, roads, and topography in high resolution.',
      citation: 'Palestine Open Maps, https://palopenmaps.org. Public domain.'
    }
  ],
  chapter2: [
    {
      id: 'ch2-1',
      title: "Ma'na an-Nakba (1948)",
      description: "Constantin Zurayk's pamphlet published in August 1948, first using the term 'Nakba' to describe the events.",
      citation: "Zurayk, Constantin. Ma'na an-Nakba (The Meaning of the Disaster). Beirut: Dar al-'Ilm lil-Malayin, 1948."
    },
    {
      id: 'ch2-2',
      title: 'Nakba Day Observances',
      description: 'Annual commemoration on May 15, the day after Israeli independence, marking the displacement.',
      citation: 'United Nations, International Day of Solidarity with the Palestinian People documentation.'
    },
    {
      id: 'ch2-3',
      title: 'Historiography of Naming',
      description: 'Scholarly analysis of how the term evolved from Arab self-criticism to Palestinian commemorative term.',
      citation: 'Academic historiography; multiple sources.'
    }
  ],
  chapter3: [
    {
      id: 'ch3-1',
      title: 'Balfour Declaration Text',
      description: 'The 67-word letter from Foreign Secretary Arthur Balfour to Lord Rothschild, November 2, 1917.',
      citation: 'British National Archives, FO 371/3083. Public domain.'
    },
    {
      id: 'ch3-2',
      title: 'Peel Commission Report (1937)',
      description: 'First official proposal for partition of Palestine, following the Arab Revolt.',
      citation: 'Palestine Royal Commission Report, Cmd. 5479, London: HMSO, 1937.'
    },
    {
      id: 'ch3-3',
      title: 'White Paper of 1939',
      description: 'British policy limiting Jewish immigration to Palestine, issued as WWII approached.',
      citation: 'British Government White Paper, Cmd. 6019, London: HMSO, 1939.'
    },
    {
      id: 'ch3-4',
      title: 'UNSCOP Report (1947)',
      description: "United Nations Special Committee on Palestine report recommending partition.",
      citation: 'United Nations, Report of the Special Committee on Palestine, A/364, September 1947.'
    }
  ],
  chapter4: [
    {
      id: 'ch4-1',
      title: 'UNGA 181 Full Text',
      description: 'The complete text of the UN partition resolution, including territorial provisions.',
      citation: 'UN General Assembly Resolution 181 (II), 29 November 1947. Avalon Project, Yale Law School.'
    },
    {
      id: 'ch4-2',
      title: 'Vote Tally',
      description: '33 in favor, 13 against, 10 abstentions. Analysis of voting patterns and lobbying.',
      citation: 'UN Archives, General Assembly Official Records, 1947.'
    },
    {
      id: 'ch4-3',
      title: 'Contemporary Reactions',
      description: 'Jewish Agency acceptance (with reservations) and Arab Higher Committee rejection.',
      citation: 'Multiple contemporary sources; Morris, Birth of the Palestinian Refugee Problem Revisited.'
    },
    {
      id: 'ch4-4',
      title: 'Plan vs. Reality',
      description: 'Analysis of the gap between the partition recommendation and what emerged from war.',
      citation: 'Morris, Benny. 1948: A History of the First Arab-Israeli War. Yale University Press, 2008.'
    }
  ],
  chapter5: [
    {
      id: 'ch5-1',
      title: 'Operation Nachshon',
      description: 'Haganah offensive to open the road to Jerusalem, April 1948.',
      citation: 'Morris, Birth of the Palestinian Refugee Problem Revisited, pp. 163-180.'
    },
    {
      id: 'ch5-2',
      title: 'Deir Yassin Documentation',
      description: 'Red Cross reports and casualty estimates from the April 9, 1948 attack.',
      citation: 'International Committee of the Red Cross reports; Morris; Pappé. Casualty estimates: 100-120.'
    },
    {
      id: 'ch5-3',
      title: 'Haifa Evacuation',
      description: 'Documentation of the mass evacuation of Haifa\'s Arab population, April 21-22, 1948.',
      citation: 'Morris, Birth of the Palestinian Refugee Problem Revisited, pp. 191-209.'
    },
    {
      id: 'ch5-4',
      title: 'Jaffa Siege',
      description: 'Irgun mortar campaign and refugee flows from Palestine\'s largest Arab city.',
      citation: 'Morris; IMEU (Institute for Middle East Understanding) resources.'
    },
    {
      id: 'ch5-5',
      title: 'Plan Dalet',
      description: 'Haganah operational plan. Interpretation debated between Morris and Pappé.',
      citation: 'Original plan in IDF Archives; interpretations in Morris and Pappé.'
    }
  ],
  chapter6: [
    {
      id: 'ch6-1',
      title: 'Displacement Estimates',
      description: 'Range: 520,000 to over 1,000,000. Scholarly consensus exceeds 700,000.',
      citation: 'UNRWA; Morris; Britannica. Methodology differences explain range.'
    },
    {
      id: 'ch6-2',
      title: 'Lydda/Ramle Expulsion Order',
      description: 'Documentary evidence of explicit expulsion order, signed by Yitzhak Rabin.',
      citation: 'IDF Archives; Rabin memoirs; Morris, pp. 423-436.'
    },
    {
      id: 'ch6-3',
      title: 'Benny Morris Analysis',
      description: '"The most important single factor in the exodus of April-June was Jewish attack."',
      citation: 'Morris, Benny. The Birth of the Palestinian Refugee Problem Revisited. Cambridge, 2004.'
    },
    {
      id: 'ch6-4',
      title: 'Ilan Pappé Analysis',
      description: 'Argues for deliberate ethnic cleansing through centrally coordinated planning.',
      citation: 'Pappé, Ilan. The Ethnic Cleansing of Palestine. Oneworld, 2006.'
    },
    {
      id: 'ch6-5',
      title: 'Multi-Causal Model',
      description: 'Why single-cause explanations fail: causes varied by time, place, and circumstance.',
      citation: 'Historiographical consensus across multiple scholars.'
    },
    {
      id: 'ch6-6',
      title: 'What We Still Debate',
      description: 'Open questions about degree of central planning and proportions of different causes.',
      citation: 'Ongoing academic debate; Morris vs. Pappé.'
    }
  ],
  chapter8: [
    {
      id: 'ch8-1',
      title: 'UNGA 194 Full Text',
      description: 'Resolution establishing right of return/compensation for refugees.',
      citation: 'UN General Assembly Resolution 194 (III), 11 December 1948.'
    },
    {
      id: 'ch8-2',
      title: 'UNGA 302 Full Text',
      description: 'Resolution establishing UNRWA as temporary agency (now 75+ years old).',
      citation: 'UN General Assembly Resolution 302 (IV), 8 December 1949.'
    },
    {
      id: 'ch8-3',
      title: 'Bernadotte Report',
      description: 'UN Mediator\'s final report documenting refugee conditions before his assassination.',
      citation: 'Progress Report of the United Nations Mediator on Palestine, September 1948.'
    },
    {
      id: 'ch8-4',
      title: 'Camp Geography',
      description: 'Maps showing distribution of refugees across Gaza, West Bank, Lebanon, Syria, Jordan.',
      citation: 'UNRWA maps and statistics, 1950-present.'
    }
  ],
  chapter9: [
    {
      id: 'ch9-1',
      title: 'Citizenship and Status',
      description: 'Analysis of Palestinian citizens inside Israel after 1948.',
      citation: 'Academic sources on Palestinian citizens of Israel.'
    },
    {
      id: 'ch9-2',
      title: '"Present Absentee" Concept',
      description: 'Legal category for internally displaced persons inside Israel.',
      citation: 'Israeli Absentee Property Law (1950); legal scholarship.'
    },
    {
      id: 'ch9-3',
      title: 'Land and Property',
      description: 'Post-war policies regarding abandoned/confiscated property.',
      citation: 'Morris; legal analysis of Israeli land law.'
    }
  ],
  chapter10: [
    {
      id: 'ch10-1',
      title: 'UNESCO Listing',
      description: 'Palestinian embroidery (tatreez) inscribed as Intangible Cultural Heritage, 2021.',
      citation: 'UNESCO, Representative List of the Intangible Cultural Heritage, 2021.'
    },
    {
      id: 'ch10-2',
      title: 'Oral History Methodology',
      description: 'How historians verify and triangulate oral testimony.',
      citation: 'Oral History Association guidelines; methodology literature.'
    },
    {
      id: 'ch10-3',
      title: 'Memory Archives',
      description: 'Documentation projects preserving refugee narratives.',
      citation: 'Various oral history projects and archives.'
    },
    {
      id: 'ch10-4',
      title: 'Triangulation',
      description: 'When memory and documents align (and when they diverge).',
      citation: 'Historical methodology literature.'
    }
  ],
  chapter11: [
    {
      id: 'ch11-1',
      title: 'Archive Access',
      description: 'What remains classified in Israeli and other archives.',
      citation: 'Academic discussion of archive accessibility.'
    },
    {
      id: 'ch11-2',
      title: 'Historiographical Debate',
      description: 'How Morris, Pappé, and others interpret the same evidence differently.',
      citation: 'Comparative historiography; academic debate.'
    },
    {
      id: 'ch11-3',
      title: 'Open Questions',
      description: 'What evidence would change consensus; what we still need to learn.',
      citation: 'Methodology and historiography literature.'
    }
  ]
};

const FIGURES: Record<string, FigureProfile> = {
  zurayk: {
    name: 'Constantin Zurayk',
    role: 'The Man Who Named the Catastrophe',
    details: [
      'Born Damascus, 1909; Greek Orthodox Christian family',
      'PhD Princeton; Professor at American University of Beirut',
      "Published Ma'na an-Nakba (The Meaning of the Disaster), August 1948"
    ],
    quote: 'The defeat of the Arabs in Palestine is not a small downfall—naksa... It is a catastrophe—nakba—in every sense of the word.',
    imageStatus: 'placeholder'
  },
  balfour: {
    name: 'Arthur Balfour',
    role: 'Author of the Balfour Declaration',
    details: [
      'British Foreign Secretary 1916-1919',
      'Signed the declaration that shaped Mandate policy',
      '67 words that launched decades of conflict'
    ],
    imageStatus: 'available',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Arthur_Balfour%2C_photo_portrait_facing_left.jpg'
  },
  weizmann: {
    name: 'Chaim Weizmann',
    role: 'Architect of British Support',
    details: [
      'President of World Zionist Organization',
      'WWI chemistry contributions gave access to British officials',
      'Lobbied for Balfour Declaration',
      'Later: First President of Israel'
    ],
    imageStatus: 'available',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Chaim_Weizmann.jpg'
  },
  begin: {
    name: 'Menachem Begin',
    role: 'Irgun Commander',
    details: [
      'Commander of Irgun Zvai Leumi',
      'Irgun conducted mortar campaign on Jaffa',
      'Irgun participated in Deir Yassin attack',
      'Later: Prime Minister of Israel'
    ],
    imageStatus: 'available',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Menachem_Begin%2C_1978.jpg'
  },
  rabin: {
    name: 'Yitzhak Rabin',
    role: 'IDF Commander',
    details: [
      'Palmach officer during 1948 war',
      'Signed Lydda/Ramle expulsion order',
      'Reported Ben-Gurion\'s gesture: "Drive them out"',
      'Later: Prime Minister, Oslo Accords, assassinated 1995'
    ],
    imageStatus: 'available',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Yitzhak_Rabin_%281986%29_cropped.jpg'
  },
  bengurion: {
    name: 'David Ben-Gurion',
    role: "Israel's Founding Prime Minister",
    details: [
      'Declared independence May 14, 1948',
      "Ordered Lydda/Ramle expulsion according to Rabin's account",
      'Historians debate degree of central planning'
    ],
    imageStatus: 'available',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Ben_Gurion_1959.jpg'
  },
  bernadotte: {
    name: 'Count Folke Bernadotte',
    role: 'First UN Mediator',
    details: [
      'Swedish diplomat; WWII rescue hero',
      'Appointed UN mediator May 1948',
      'Achieved initial truce',
      'Assassinated September 17, 1948 by Lehi',
      'His report documented refugee situation'
    ],
    imageStatus: 'available',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Count_folke_bernadotte.jpg'
  },
  bunche: {
    name: 'Ralph Bunche',
    role: 'Second UN Mediator',
    details: [
      'Succeeded Bernadotte after assassination',
      'Negotiated 1949 armistice agreements',
      'First African American to win Nobel Peace Prize (1950)'
    ],
    imageStatus: 'available',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Ralph_Bunche_-_1963_March_on_Washington.jpg'
  }
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'haifa',
    name: 'Haifa',
    arabicName: 'حيفا',
    type: 'Major Port City',
    population: '~70,000 Arabs (of ~145,000 total)',
    displaced: '~60,000',
    date: 'April 1948',
    cause: 'Military operations + fear + economic collapse',
    coordinates: { lat: 32.7940, lng: 34.9896 }
  },
  {
    id: 'jaffa',
    name: 'Jaffa',
    arabicName: 'يافا',
    type: 'Major Cultural/Economic Center',
    population: '~70,000 Arabs',
    displaced: '~70,000',
    date: 'April-May 1948',
    cause: 'Siege + mortar attacks + economic strangulation',
    coordinates: { lat: 32.0503, lng: 34.7508 }
  },
  {
    id: 'lydda-ramle',
    name: 'Lydda & Ramle',
    arabicName: 'اللد والرملة',
    type: 'Twin Towns, Inland',
    population: '50,000-70,000 combined',
    displaced: '50,000-70,000',
    date: 'July 1948',
    cause: 'Documented Mass Expulsion',
    coordinates: { lat: 31.9510, lng: 34.8882 }
  },
  {
    id: 'safed',
    name: 'Safed',
    arabicName: 'صفد',
    type: 'Ancient Galilean City',
    population: '~10,000 Arabs (~12,000 Jews)',
    displaced: '~10,000',
    date: 'May 1948',
    cause: 'Military defeat + fear',
    coordinates: { lat: 32.9646, lng: 35.4962 }
  },
  {
    id: 'lifta',
    name: 'Lifta',
    arabicName: 'لفتا',
    type: 'Village Near Jerusalem',
    population: '~2,500',
    displaced: '~2,500',
    date: 'January-March 1948',
    cause: 'Early-phase violence + fear',
    coordinates: { lat: 31.7839, lng: 35.1961 }
  },
  {
    id: 'al-birwa',
    name: 'Al-Birwa',
    arabicName: 'البروة',
    type: 'Rural Agricultural Village',
    population: '~1,500',
    displaced: '~1,500',
    date: 'June 1948',
    cause: 'Military operations + prevented return',
    coordinates: { lat: 32.8631, lng: 35.1242 }
  }
];

const GLOSSARY_TERMS: GlossaryTerm[] = [
  { term: 'Nakba', arabic: 'النكبة', transliteration: 'al-Nakba', definition: '"The catastrophe"; Palestinian term for the 1948 displacement' },
  { term: 'UNGA 181', definition: 'UN partition resolution (November 1947)' },
  { term: 'UNGA 194', definition: 'UN refugee resolution establishing return/compensation principle (December 1948)' },
  { term: 'UNRWA', definition: 'United Nations Relief and Works Agency for Palestine Refugees' },
  { term: 'Armistice', definition: 'Ceasefire agreements (1949); not peace treaties' },
  { term: 'Green Line', definition: '1949 armistice line' },
  { term: "al-'Awda", arabic: 'العودة', definition: 'The return; aspiration to return home' },
  { term: 'Sumud', arabic: 'صمود', definition: 'Steadfastness; resilience' },
  { term: 'Tatreez', arabic: 'تطريز', definition: 'Traditional Palestinian embroidery' },
  { term: 'Fallah', arabic: 'فلاح', definition: 'Farmer; peasant' },
  { term: 'Yishuv', definition: 'Jewish community in Mandate Palestine' },
  { term: 'Haganah', definition: 'Main Zionist paramilitary; became IDF' },
  { term: 'Irgun', definition: 'Revisionist Zionist paramilitary' },
  { term: 'Lehi', definition: '"Stern Gang"; radical paramilitary' },
  { term: 'British Mandate', definition: 'British administration of Palestine (1920-1948)' },
  { term: 'Partition', definition: 'Division of territory into separate states' },
  { term: 'Depopulated village', definition: 'Village whose population was displaced/expelled' },
  { term: 'Present absentee', definition: 'Legal status of displaced persons inside Israel' },
  { term: 'Refugee', definition: 'Person displaced from home; UNRWA definition specific' },
  { term: 'Plan Dalet', definition: 'Haganah operational plan (March 1948); interpretation debated' },
  { term: 'Palmach', definition: 'Elite strike force of the Haganah' },
  { term: 'UNSCOP', definition: 'UN Special Committee on Palestine (1947)' },
  { term: 'Arab Higher Committee', definition: 'Palestinian political leadership during Mandate' },
  { term: 'Corpus separatum', definition: 'Proposed international status for Jerusalem under partition plan' }
];

// -----------------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------------

function EvidenceCardComponent({ card, isExpanded, onToggle }: {
  card: EvidenceCard;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`ntv__testimony ${isExpanded ? 'ntv__testimony--expanded' : ''}`}>
      <div className="ntv__testimony__header" onClick={onToggle}>
        <span className="ntv__testimony__icon">E</span>
        <span className="ntv__testimony__title">{card.title}</span>
        <span className="ntv__testimony__toggle">&#9662;</span>
      </div>
      <div className="ntv__testimony__body">
        <p className="ntv__testimony__description">{card.description}</p>
        <p className="ntv__testimony__citation">{card.citation}</p>
      </div>
    </div>
  );
}

function FigureProfileComponent({ figure }: { figure: FigureProfile }) {
  return (
    <div className="ntv__witness">
      {figure.imageStatus === 'available' && figure.imageUrl ? (
        <img
          src={figure.imageUrl}
          alt={figure.name}
          className="ntv__witness__image"
        />
      ) : (
        <div className="ntv__witness__image ntv__witness__image--placeholder">
          Portrait unavailable
        </div>
      )}
      <div className="ntv__witness__content">
        <h4 className="ntv__witness__name">{figure.name}</h4>
        <p className="ntv__witness__role">{figure.role}</p>
        <ul className="ntv__witness__details">
          {figure.details.map((detail, i) => (
            <li key={i}>{detail}</li>
          ))}
        </ul>
        {figure.quote && (
          <blockquote className="ntv__witness__quote">
            &quot;{figure.quote}&quot;
          </blockquote>
        )}
      </div>
    </div>
  );
}

function MisconceptionCheckpoint({ myth, evidence }: { myth: string; evidence: string }) {
  return (
    <div className="ntv__corrective">
      <div className="ntv__corrective__header">
        Misconception Checkpoint
      </div>
      <div className="ntv__corrective__myth">
        <span className="ntv__corrective__myth-label">MYTH</span>
        {myth}
      </div>
      <div className="ntv__corrective__evidence">
        <span className="ntv__corrective__evidence-label">EVIDENCE</span>
        <p>{evidence}</p>
      </div>
    </div>
  );
}

function ContentWarning({
  title,
  text,
  onContinue,
  onSkip
}: {
  title: string;
  text: string;
  onContinue: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="ntv__trauma-gate">
      <div className="ntv__trauma-gate__icon">&#9888;</div>
      <div className="ntv__trauma-gate__title">{title}</div>
      <p className="ntv__trauma-gate__text">{text}</p>
      <div className="ntv__trauma-gate__actions">
        <button className="ntv__trauma-gate__btn ntv__trauma-gate__btn--continue" onClick={onContinue}>
          Continue
        </button>
        <button className="ntv__trauma-gate__btn ntv__trauma-gate__btn--skip" onClick={onSkip}>
          Skip this section
        </button>
      </div>
    </div>
  );
}

function DocumentLens({
  title,
  date,
  text,
  highlights,
  annotation,
  source
}: {
  title: string;
  date: string;
  text: string;
  highlights: string[];
  annotation: string;
  source: string;
}) {
  let processedText = text;
  highlights.forEach(h => {
    processedText = processedText.replace(h, `<span class="ntv__archive-lens__highlight">${h}</span>`);
  });

  return (
    <div className="ntv__archive-lens">
      <div className="ntv__archive-lens__header">
        <h4 className="ntv__archive-lens__title">{title}</h4>
        <p className="ntv__archive-lens__meta">{date}</p>
      </div>
      <div className="ntv__archive-lens__content">
        <div
          className="ntv__archive-lens__text"
          dangerouslySetInnerHTML={{ __html: processedText }}
        />
        <div className="ntv__archive-lens__annotation">{annotation}</div>
      </div>
      <div className="ntv__archive-lens__footer">
        Source: {source}
      </div>
    </div>
  );
}

function SoWhat({ text }: { text: string }) {
  return (
    <div className="ntv__significance">
      <h4 className="ntv__significance__title">So What?</h4>
      <p className="ntv__significance__text">{text}</p>
    </div>
  );
}

function CaseStudySelector({
  cases,
  selectedId,
  onSelect
}: {
  cases: CaseStudy[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="ntv__locality-grid">
      {cases.map(c => (
        <div
          key={c.id}
          className={`ntv__locality ${selectedId === c.id ? 'ntv__locality--selected' : ''}`}
          onClick={() => onSelect(c.id)}
        >
          <h4 className="ntv__locality__name">
            {c.name} {c.arabicName && <span className="arabic-text">({c.arabicName})</span>}
          </h4>
          <p className="ntv__locality__type">{c.type}</p>
          <div className="ntv__locality__stats">
            <div>
              <span className="ntv__locality__stat-value">{c.displaced}</span>
              <span className="ntv__locality__stat-label"> displaced</span>
            </div>
            <div>
              <span className="ntv__locality__stat-value">{c.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Essay Component
// -----------------------------------------------------------------------------
export default function TheNakbaVisualizedPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [showDeirYassin, setShowDeirYassin] = useState(false);
  const [currentEra, setCurrentEra] = useState<'ottoman' | 'mandate' | 'catastrophe' | 'aftermath'>('mandate');

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(progress);

      // Determine era based on scroll position
      if (progress < 15) setCurrentEra('ottoman');
      else if (progress < 25) setCurrentEra('mandate');
      else if (progress < 75) setCurrentEra('catastrophe');
      else setCurrentEra('aftermath');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleCard = useCallback((id: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const scrollToChapter = (chapterId: string) => {
    const element = document.getElementById(chapterId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <article className="ntv">
      {/* Progress Bar */}
      <div className={`ntv__stratigraphy ntv__stratigraphy--${currentEra}`}>
        <div
          className="ntv__stratigraphy__fill"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="ntv__stratigraphy__markers">
          <div className="ntv__stratigraphy__marker">
            <span className="ntv__stratigraphy__marker-label">1917</span>
          </div>
          <div className="ntv__stratigraphy__marker">
            <span className="ntv__stratigraphy__marker-label">1947</span>
          </div>
          <div className="ntv__stratigraphy__marker">
            <span className="ntv__stratigraphy__marker-label">1948</span>
          </div>
          <div className="ntv__stratigraphy__marker">
            <span className="ntv__stratigraphy__marker-label">1950</span>
          </div>
        </div>
      </div>

      {/* Hero Section — NO SCROLL-LOCK */}
      <header className="ntv__key-hero" id="hero">
        <div className="ntv__key-hero__language-toggle">
          <button
            className={`ntv__key-hero__lang-btn ${language === 'en' ? 'ntv__key-hero__lang-btn--active' : ''}`}
            onClick={() => setLanguage('en')}
          >
            English
          </button>
          <button
            className={`ntv__key-hero__lang-btn ${language === 'ar' ? 'ntv__key-hero__lang-btn--active' : ''}`}
            onClick={() => setLanguage('ar')}
          >
            العربية
          </button>
        </div>

        <div className="ntv__key-hero__content">
          <div className="ntv__key-hero__poetic">
            <p>A key that no longer fits a lock.</p>
            <p>A map of roads that changed their names.</p>
            <p>A thread that carries a village home.</p>
          </div>

          <h1 className="ntv__key-hero__title">
            {language === 'en' ? 'THE NAKBA, VISUALIZED' : 'النكبة، مُصَوَّرة'}
          </h1>
          <p className="ntv__key-hero__subtitle">
            1947-1949: Displacement, Memory, and the Making of a Refugee Question
          </p>

          <p className="ntv__key-hero__factual">
            Between 1947 and 1949, over 700,000 Palestinians were displaced from their homes.
            This is what happened—and how we know.
          </p>

          <button
            className="ntv__key-hero__cta"
            onClick={() => scrollToChapter('chapter-1')}
          >
            Start exploring &#8595;
          </button>

          <div className="ntv__key-hero__chapter-jump">
            <select onChange={(e) => scrollToChapter(e.target.value)}>
              <option value="">Jump to chapter...</option>
              <option value="chapter-1">1. Before 1948</option>
              <option value="chapter-2">2. The Word: Nakba</option>
              <option value="chapter-3">3. Mandate Years</option>
              <option value="chapter-4">4. Partition</option>
              <option value="chapter-5">5. Civil War</option>
              <option value="chapter-6">6. Displacement</option>
              <option value="chapter-7">7. Case Files</option>
              <option value="chapter-8">8. Aftermath</option>
              <option value="chapter-9">9. Those Who Remained</option>
              <option value="chapter-10">10. Memory as Evidence</option>
              <option value="chapter-11">11. What We Don&apos;t Know</option>
            </select>
          </div>
        </div>
      </header>

      {/* Chapter 1: Before 1948 */}
      <section className="ntv__stratum ntv__stratum--mandate" id="chapter-1">
        <div className="ntv__stratum__inner">
          <header className="ntv__stratum__header">
            <p className="ntv__stratum__temporal-marker">Palestine, 1946</p>
            <h2 className="ntv__stratum__title">BEFORE 1948: A LIVING MOSAIC</h2>
          </header>

          <div className="ntv__stratum__vignette">
            <p>
              A morning in Jaffa. The smell of bread and sea air. A vendor calls in Arabic; another responds.
              Newspapers print opinions; unions organize workers; municipal councils meet. In the hills,
              olive groves silver under morning light. On the coast, oranges ripen for export. Twenty-nine towns,
              over eight hundred villages, 1.3 million lives—each with a name, a story, a place.
              This was not empty land. This was home.
            </p>
          </div>

          <div className="ntv__stratum__content">
            <h3>The World Before</h3>
            <p>
              Mandate Palestine in 1946 was a functioning society. British census data documented approximately
              1.3 million Arabs living in 29 towns and over 800 villages. Major cities—Jerusalem, Haifa, Jaffa—were
              centers of commerce, culture, and political activity.
            </p>
            <p>
              The economy centered on agriculture: olive groves in the hills, orange groves on the coastal plain.
              Jaffa&apos;s famous oranges were exported across the Mediterranean. Ports at Haifa and Jaffa connected
              Palestine to global trade routes.
            </p>
            <p>
              Institutions flourished: Arabic-language newspapers debated politics and culture; labor unions organized
              workers; municipal governments managed civic affairs. Cafés in Jaffa and Jerusalem hosted intellectual
              life; cinemas showed films.
            </p>

            <h3>Evidence</h3>
            <div className="ntv__testimonys">
              {EVIDENCE_CARDS.chapter1.map(card => (
                <EvidenceCardComponent
                  key={card.id}
                  card={card}
                  isExpanded={expandedCards.has(card.id)}
                  onToggle={() => toggleCard(card.id)}
                />
              ))}
            </div>

            <MisconceptionCheckpoint
              myth="&quot;There was nothing here / no society.&quot;"
              evidence="British Mandate records, census data, photographs, and institutional documentation show a complex, functioning society with towns, villages, agriculture, trade, and cultural institutions."
            />

            <SoWhat
              text="Understanding displacement requires seeing what existed. Homes were not abstractions—they had addresses, neighbors, and morning routines. The scale of loss becomes real only when the world-before becomes visible."
            />
          </div>
        </div>
      </section>

      {/* Chapter 2: The Word — Nakba */}
      <section className="ntv__stratum ntv__stratum--aftermath" id="chapter-2">
        <div className="ntv__stratum__inner">
          <header className="ntv__stratum__header">
            <p className="ntv__stratum__temporal-marker">August 1948 and after</p>
            <h2 className="ntv__stratum__title">THE WORD: NAKBA <span className="arabic-text">(النكبة)</span></h2>
          </header>

          <div className="ntv__stratum__vignette">
            <p>
              August 1948. In Beirut, a professor sits with his pen. Constantin Zurayk has watched the Arab
              armies falter, watched refugees stream across borders. He writes quickly—not a history but a reckoning.
              He chooses his word carefully: not <em>naksa</em> (setback), but <em>nakba</em> (catastrophe).
              In every sense of the word. Within weeks, his pamphlet circulates. A term is born. Over decades,
              it will shift from Arab self-criticism to Palestinian memorial. The word <em>nakba</em> now carries
              the weight of dispossession itself.
            </p>
          </div>

          <div className="ntv__stratum__content">
            <FigureProfileComponent figure={FIGURES.zurayk} />

            <h3>The Naming</h3>
            <p>
              The term &quot;Nakba&quot; was coined by Constantin Zurayk in his 1948 pamphlet <em>Ma&apos;na an-Nakba</em>
              (The Meaning of the Disaster). Zurayk, a Syrian-born historian and professor at the American
              University of Beirut, wrote it as a work of Arab self-criticism—an analysis of why the Arab
              states had failed to prevent the establishment of Israel.
            </p>
            <p>
              Over subsequent decades, the term shifted. It became less about Arab failure and more about
              Palestinian displacement. Today, &quot;Nakba&quot; is the central term Palestinians use to describe the
              events of 1948. May 15—the day after Israeli independence is declared—is observed as Nakba Day.
            </p>

            <h3>Contested Naming</h3>
            <p>
              The same events carry different names. Israelis call 1948 the &quot;War of Independence&quot; (<em>Milchemet
              Ha&apos;atzma&apos;ut</em>). Palestinians call it the Nakba. The choice of term reflects perspective:
              one emphasizes birth; the other, dispossession. Both refer to the same historical events.
            </p>

            <h3>Evidence</h3>
            <div className="ntv__testimonys">
              {EVIDENCE_CARDS.chapter2.map(card => (
                <EvidenceCardComponent
                  key={card.id}
                  card={card}
                  isExpanded={expandedCards.has(card.id)}
                  onToggle={() => toggleCard(card.id)}
                />
              ))}
            </div>

            <MisconceptionCheckpoint
              myth="&quot;The term Nakba is a modern invention with no historical roots.&quot;"
              evidence="The term was coined in 1948 by Constantin Zurayk. Its meaning has evolved, but its historical origin is documented."
            />

            <SoWhat
              text="Naming is not ornament—it shapes what people remember, mourn, and demand. Understanding why Palestinians call 1948 'the catastrophe' requires understanding how that name emerged and what it carries."
            />
          </div>
        </div>
      </section>

      {/* Chapter 3: Mandate Years */}
      <section className="ntv__stratum ntv__stratum--ottoman" id="chapter-3">
        <div className="ntv__stratum__inner">
          <header className="ntv__stratum__header">
            <p className="ntv__stratum__temporal-marker">1917-1947</p>
            <h2 className="ntv__stratum__title">MANDATE YEARS: PROMISES, MIGRATION, REVOLT</h2>
          </header>

          <div className="ntv__stratum__vignette">
            <p>
              November 2, 1917. Sixty-seven words change everything. Arthur Balfour writes to Lord Rothschild:
              His Majesty&apos;s Government views with favour the establishment in Palestine of a national home
              for the Jewish people. Thirty years later, ships arrive. Streets tense. A revolt is crushed.
              A committee investigates. Another partition is proposed. The British, exhausted by war and empire,
              announce they are leaving. They turn the problem over to the United Nations. The fuse is lit.
            </p>
          </div>

          <div className="ntv__stratum__content">
            <DocumentLens
              title="The Balfour Declaration"
              date="November 2, 1917"
              text={`His Majesty's Government view with favour the establishment in Palestine of a national home for the Jewish people, and will use their best endeavours to facilitate the achievement of this object, it being clearly understood that nothing shall be done which may prejudice the civil and religious rights of existing non-Jewish communities in Palestine, or the rights and political status enjoyed by Jews in any other country.`}
              highlights={['national home for the Jewish people', 'existing non-Jewish communities']}
              annotation="Note: 'existing non-Jewish communities' refers to the Arab population, which constituted approximately 90% of Palestine's inhabitants in 1917. The declaration promised a 'national home' (not a state) while protecting existing rights—promises that proved difficult to reconcile."
              source="British National Archives, FO 371/3083. Public domain."
            />

            <FigureProfileComponent figure={FIGURES.balfour} />
            <FigureProfileComponent figure={FIGURES.weizmann} />

            <h3>The Mandate Period</h3>
            <p>
              The British Mandate (1920-1948) attempted to fulfill contradictory promises. Jewish immigration
              increased, especially after Hitler&apos;s rise to power in 1933. Arab resistance grew, culminating
              in the Arab Revolt of 1936-39, which the British suppressed with significant force.
            </p>
            <p>
              The Peel Commission (1937) first proposed partition. The White Paper of 1939 limited immigration
              just as European Jews faced Nazi persecution. After World War II, Holocaust survivors sought entry;
              the British tried to limit it. UNSCOP (1947) recommended partition. The British announced withdrawal.
            </p>

            <h3>Evidence</h3>
            <div className="ntv__testimonys">
              {EVIDENCE_CARDS.chapter3.map(card => (
                <EvidenceCardComponent
                  key={card.id}
                  card={card}
                  isExpanded={expandedCards.has(card.id)}
                  onToggle={() => toggleCard(card.id)}
                />
              ))}
            </div>

            <MisconceptionCheckpoint
              myth="&quot;Everything began in 1948.&quot;"
              evidence="The events of 1948 emerged from thirty years of British Mandate policy, immigration, revolt, and international pressure. The Nakba did not appear from nowhere."
            />

            <SoWhat
              text="The Nakba emerges from a collision of imperial withdrawal, competing nationalisms, and postwar crisis. To understand 1948, you must understand 1917-1947."
            />
          </div>
        </div>
      </section>

      {/* Chapter 4: Partition */}
      <section className="ntv__stratum ntv__stratum--catastrophe" id="chapter-4">
        <div className="ntv__stratum__inner">
          <header className="ntv__stratum__header">
            <p className="ntv__stratum__temporal-marker">November 29, 1947</p>
            <h2 className="ntv__stratum__title">PARTITION: THE VOTE THAT SPLIT THE MAP</h2>
          </header>

          <div className="ntv__stratum__vignette">
            <p>
              November 29, 1947. At Lake Success, New York, delegates vote. The board lights up: 33 for,
              13 against, 10 abstentions. The United Nations has recommended partition—a Jewish state,
              an Arab state, Jerusalem under international control. In Tel Aviv, crowds dance. In Palestinian
              cities, dread settles. The plan allocates 55% of the land to the Jewish state, though Jews are
              a third of the population. Arabs reject it. Jews reluctantly accept. Within hours, shots are fired.
              The civil war has begun.
            </p>
          </div>

          <div className="ntv__stratum__content">
            <DocumentLens
              title="UN General Assembly Resolution 181"
              date="November 29, 1947"
              text={`The General Assembly...

Recommends to the United Kingdom, as the mandatory Power for Palestine, and to all other Members of the United Nations the adoption and implementation, with regard to the future government of Palestine, of the Plan of Partition with Economic Union...`}
              highlights={['Recommends', 'Plan of Partition']}
              annotation="Key: The resolution 'recommends'—it does not mandate or enforce. The partition plan was never implemented as written. What emerged came from war, not from this plan."
              source="UN General Assembly Resolution 181 (II), 29 November 1947. Avalon Project, Yale Law School."
            />

            <h3>What the Plan Proposed</h3>
            <p>
              Resolution 181 recommended dividing Palestine into a Jewish state (55% of land), an Arab state (44%),
              and an international zone for Jerusalem and Bethlehem. The Jewish state would include most of the
              coastal plain, the eastern Galilee, and the Negev desert. The Arab state would include the western
              Galilee, the hill country, and Gaza.
            </p>
            <p>
              The Jewish Agency accepted, despite internal reservations about boundaries. The Arab Higher Committee
              rejected it, arguing that the majority population should not have its land divided by the minority.
              Violence began immediately.
            </p>

            <h3>Evidence</h3>
            <div className="ntv__testimonys">
              {EVIDENCE_CARDS.chapter4.map(card => (
                <EvidenceCardComponent
                  key={card.id}
                  card={card}
                  isExpanded={expandedCards.has(card.id)}
                  onToggle={() => toggleCard(card.id)}
                />
              ))}
            </div>

            <MisconceptionCheckpoint
              myth="&quot;The UN created the state in a simple, clean way.&quot;"
              evidence="The UN recommended partition but had no mechanism to implement it. The partition plan was never implemented as written—what emerged came from war."
            />

            <SoWhat
              text="A line on a map can become a trigger—especially when people live on both sides of it. The vote did not create peace; it accelerated conflict."
            />
          </div>
        </div>
      </section>

      {/* Chapter 5: Civil War */}
      <section className="ntv__stratum ntv__stratum--catastrophe" id="chapter-5">
        <div className="ntv__stratum__inner">
          <header className="ntv__stratum__header">
            <p className="ntv__stratum__temporal-marker">November 1947 - May 1948</p>
            <h2 className="ntv__stratum__title">CIVIL WAR, COLLAPSE, FLIGHT</h2>
          </header>

          <div className="ntv__stratum__vignette">
            <p>
              December 1947. The buses stop running. Snipers control the roads between neighborhoods.
              A woman in Haifa hears that a village was attacked. She packs what she can carry. In Jerusalem,
              a convoy is ambushed. In Jaffa, mortars fall on the city center. No one is in charge.
              The British are leaving. By April, Haifa&apos;s Arab population—60,000 people—will leave in two days.
              By May, Jaffa will fall. The Nakba is already underway before Israel is declared.
            </p>
          </div>

          <div className="ntv__stratum__content">
            <h3>The Unraveling</h3>
            <p>
              The civil war phase (November 1947 - May 1948) saw intercommunal violence escalate rapidly.
              Key developments included:
            </p>
            <ul>
              <li><strong>Operation Nachshon (April 1948)</strong>: Haganah offensive to open the road to Jerusalem</li>
              <li><strong>Deir Yassin (April 9, 1948)</strong>: Attack that spread fear and accelerated flight</li>
              <li><strong>Haifa evacuation (April 21-22)</strong>: ~60,000 Arabs left in 48-72 hours</li>
              <li><strong>Jaffa siege</strong>: Irgun mortars; city fell by May 13</li>
            </ul>

            <ContentWarning
              title="Content Warning"
              text="This section discusses a massacre. It focuses on documented evidence and historical impact, not graphic details."
              onContinue={() => setShowDeirYassin(true)}
              onSkip={() => {
                const el = document.getElementById('chapter-6');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {showDeirYassin && (
              <>
                <h3>Deir Yassin and Its Impact</h3>
                <p>
                  On April 9, 1948, Irgun and Lehi forces attacked the village of Deir Yassin near Jerusalem.
                  Casualty estimates range from 100 to 120. The event was publicized by both sides—by Jewish
                  forces as a warning, by Arab sources to mobilize resistance. The psychological impact was
                  significant: news of Deir Yassin spread fear and accelerated flight from other localities.
                </p>
                <p>
                  Historians debate the extent to which the attack was planned, the precise casualty count,
                  and whether atrocities occurred beyond the killing itself. What is documented: a massacre
                  occurred; it was publicized; it affected behavior in subsequent evacuations.
                </p>
              </>
            )}

            <FigureProfileComponent figure={FIGURES.begin} />

            <h3>Evidence</h3>
            <div className="ntv__testimonys">
              {EVIDENCE_CARDS.chapter5.map(card => (
                <EvidenceCardComponent
                  key={card.id}
                  card={card}
                  isExpanded={expandedCards.has(card.id)}
                  onToggle={() => toggleCard(card.id)}
                />
              ))}
            </div>

            <MisconceptionCheckpoint
              myth="&quot;Everyone left only after the Arab armies entered in May 1948.&quot;"
              evidence="Major urban evacuations (Haifa, Jaffa) and significant village depopulations occurred BEFORE May 14, 1948. The displacement began during the civil war phase."
            />

            <SoWhat
              text="Displacement often begins as a slow unraveling before it becomes a stampede. Understanding the civil war phase shows the Nakba was a process, not a single moment."
            />
          </div>
        </div>
      </section>

      {/* Chapter 6: Displacement */}
      <section className="ntv__stratum ntv__stratum--catastrophe" id="chapter-6">
        <div className="ntv__stratum__inner">
          <header className="ntv__stratum__header">
            <p className="ntv__stratum__temporal-marker">May - December 1948</p>
            <h2 className="ntv__stratum__title">1948 WAR: DISPLACEMENT AS A PROCESS</h2>
          </header>

          <div className="ntv__stratum__vignette">
            <p>
              July 1948. A family in Lydda hears the soldiers coming. They have minutes. What do you take?
              The key. The deed. The photograph. A loaf of bread. They join thousands on the road—on foot,
              in summer heat, toward Ramallah. Some will collapse. The soldiers have orders: &quot;The residents
              of Lydda must be expelled quickly without attention to age.&quot; This is not flight. This is expulsion.
              Elsewhere, causes differ: fear, combat, collapse. One event, multiple mechanisms.
              This is displacement as process.
            </p>
          </div>

          <div className="ntv__stratum__content">
            <h3>The Numbers</h3>
            <p>
              Displacement estimates range from approximately 520,000 to over 1,000,000, with scholarly consensus
              exceeding 700,000. Why do numbers differ?
            </p>
            <ul>
              <li>Different counting methodologies</li>
              <li>Inclusion/exclusion of Bedouin populations</li>
              <li>Political motivations in early estimates</li>
              <li>Archive access limitations</li>
            </ul>
            <p>
              The uncertainty is itself meaningful. We present ranges, not false precision.
            </p>

            <h3>The Causes</h3>
            <p>
              Displacement was not a single mechanism. Causes varied by locality, time, and circumstance:
            </p>
            <ul>
              <li><strong>Direct expulsion</strong>: Documented in Lydda/Ramle; expulsion orders exist in archives</li>
              <li><strong>Fear of violence</strong>: Widespread after Deir Yassin; psychological impact documented</li>
              <li><strong>Military operations</strong>: Evacuations during/after attacks</li>
              <li><strong>Economic/social collapse</strong>: Supply disruption, service breakdown</li>
            </ul>

            <FigureProfileComponent figure={FIGURES.rabin} />
            <FigureProfileComponent figure={FIGURES.bengurion} />

            <h3>The Lydda/Ramle Expulsion</h3>
            <p>
              The Lydda/Ramle expulsion (July 1948) is the largest documented mass expulsion of the war.
              50,000-70,000 people were expelled. A written expulsion order exists in IDF archives.
              Yitzhak Rabin later wrote: &quot;The residents of Lydda must be expelled quickly without attention to age.&quot;
            </p>
            <p>
              This was not flight from fear. This was explicit expulsion, documented in primary sources.
            </p>

            <h3>The Historiographical Debate</h3>
            <p>
              Historians disagree about the degree of central planning. Benny Morris argues that &quot;the most
              important single factor in the exodus of April-June was Jewish attack,&quot; but stops short of
              calling it planned ethnic cleansing. Ilan Pappé argues for deliberate, centrally coordinated
              ethnic cleansing. Both use the same archives but interpret them differently.
            </p>

            <h3>Evidence</h3>
            <div className="ntv__testimonys">
              {EVIDENCE_CARDS.chapter6.map(card => (
                <EvidenceCardComponent
                  key={card.id}
                  card={card}
                  isExpanded={expandedCards.has(card.id)}
                  onToggle={() => toggleCard(card.id)}
                />
              ))}
            </div>

            <MisconceptionCheckpoint
              myth="&quot;There was one single cause / one single order.&quot;"
              evidence="Displacement resulted from multiple causes varying by time and place. Some localities saw documented expulsion; others saw flight from fear or combat. The multi-causal model is the scholarly consensus."
            />

            <SoWhat
              text="How we interpret causality affects justice claims, moral narratives, and policy today. Understanding the complexity prevents both denial and oversimplification."
            />
          </div>
        </div>
      </section>

      {/* Chapter 7: Case Files */}
      <section className="ntv__stratum ntv__stratum--catastrophe" id="chapter-7">
        <div className="ntv__stratum__inner">
          <header className="ntv__stratum__header">
            <p className="ntv__stratum__temporal-marker">1947-1948</p>
            <h2 className="ntv__stratum__title">CASE FILES: SIX PLACES, SIX DIFFERENT STORIES</h2>
          </header>

          <div className="ntv__stratum__content">
            <p>
              The Nakba was one event but not one script. Each locality experienced displacement differently.
              These six case studies demonstrate the variation in causes, timing, and mechanisms.
            </p>

            <CaseStudySelector
              cases={CASE_STUDIES}
              selectedId={selectedCase}
              onSelect={setSelectedCase}
            />

            {selectedCase && (
              <div className="ntv__locality-detail">
                {(() => {
                  const c = CASE_STUDIES.find(cs => cs.id === selectedCase);
                  if (!c) return null;
                  return (
                    <>
                      <h3>{c.name} {c.arabicName && <span className="arabic-text">({c.arabicName})</span>}</h3>
                      <p><strong>Type:</strong> {c.type}</p>
                      <p><strong>Pre-1948 Population:</strong> {c.population}</p>
                      <p><strong>Displaced:</strong> {c.displaced}</p>
                      <p><strong>Date:</strong> {c.date}</p>
                      <p><strong>Primary Cause:</strong> {c.cause}</p>
                      <p><strong>Coordinates:</strong> {c.coordinates.lat}° N, {c.coordinates.lng}° E</p>
                    </>
                  );
                })()}
              </div>
            )}

            <MisconceptionCheckpoint
              myth="&quot;All places experienced the same mechanism.&quot;"
              evidence="Case studies show significant variation. Lydda/Ramle was documented expulsion; Haifa was military operations plus evacuation; Lifta was gradual flight from violence. Different mechanisms, same outcome."
            />

            <SoWhat
              text="The Nakba is one event, but not one script. Understanding local variation prevents both oversimplification and denial."
            />
          </div>
        </div>
      </section>

      {/* Chapter 8: Aftermath */}
      <section className="ntv__stratum ntv__stratum--aftermath" id="chapter-8">
        <div className="ntv__stratum__inner">
          <header className="ntv__stratum__header">
            <p className="ntv__stratum__temporal-marker">1948-1950</p>
            <h2 className="ntv__stratum__title">AFTERMATH: REFUGEEHOOD AND THE BIRTH OF UNRWA</h2>
          </header>

          <div className="ntv__stratum__vignette">
            <p>
              December 1949. The war is over. The armistice lines are drawn. But the refugees remain—in tents,
              in camps, in neighboring countries. The United Nations establishes UNRWA: relief and works for
              Palestine refugees. A three-year mandate. Seventy-five years later, UNRWA still operates.
              The camps became cities. The tents became concrete. The ration cards became identity.
              Five million registered refugees. The question remains: what does &quot;return&quot; mean when decades
              have passed and the doors remain closed?
            </p>
          </div>

          <div className="ntv__stratum__content">
            <DocumentLens
              title="UN General Assembly Resolution 194, Paragraph 11"
              date="December 11, 1948"
              text={`Resolves that the refugees wishing to return to their homes and live at peace with their neighbours should be permitted to do so at the earliest practicable date, and that compensation should be paid for the property of those choosing not to return and for loss of or damage to property which, under principles of international law or in equity, should be made good by the Governments or authorities responsible...`}
              highlights={['wishing to return', 'live at peace', 'compensation']}
              annotation="This paragraph is the textual basis for Palestinian 'right of return' claims. Note the conditions: 'wishing to return' AND 'live at peace with their neighbours.' Israel has not implemented this resolution. It is reaffirmed by the UN General Assembly annually."
              source="UN General Assembly Resolution 194 (III), 11 December 1948."
            />

            <FigureProfileComponent figure={FIGURES.bernadotte} />
            <FigureProfileComponent figure={FIGURES.bunche} />

            <h3>UNRWA</h3>
            <p>
              UNRWA (United Nations Relief and Works Agency for Palestine Refugees in the Near East) was
              established in December 1949 with a three-year renewable mandate. It was intended as temporary.
              75+ years later, it continues to operate.
            </p>
            <p>
              UNRWA registers descendants of original refugees. Today, 5.9 million people are registered
              as Palestine refugees. The camps became permanent communities—cities within cities.
            </p>

            <h3>Evidence</h3>
            <div className="ntv__testimonys">
              {EVIDENCE_CARDS.chapter8.map(card => (
                <EvidenceCardComponent
                  key={card.id}
                  card={card}
                  isExpanded={expandedCards.has(card.id)}
                  onToggle={() => toggleCard(card.id)}
                />
              ))}
            </div>

            <MisconceptionCheckpoint
              myth="&quot;UNRWA exists because refugees choose to remain refugees.&quot;"
              evidence="UNRWA exists because the political deadlock has never been resolved. The agency was created as temporary; political circumstances made it permanent."
            />

            <SoWhat
              text="Refugee status becomes a long corridor of time when politics blocks the exit. Understanding UNRWA requires understanding the political failure to resolve the underlying question."
            />
          </div>
        </div>
      </section>

      {/* Chapter 9: Those Who Remained */}
      <section className="ntv__stratum ntv__stratum--aftermath" id="chapter-9">
        <div className="ntv__stratum__inner">
          <header className="ntv__stratum__header">
            <p className="ntv__stratum__temporal-marker">1948-1950s</p>
            <h2 className="ntv__stratum__title">THOSE WHO REMAINED</h2>
          </header>

          <div className="ntv__stratum__vignette">
            <p>
              Not everyone left. Some stayed—in Nazareth, in the Galilee villages, in the mixed cities.
              They became citizens of the new state. But citizenship did not mean equality. Some were
              &quot;present absentees&quot;—physically present but legally absent from property they could see from
              their windows. Villages emptied around them. Names changed. Roads rerouted. To remain was
              to witness transformation. The Nakba is not only exile. It is also survival inside a landscape
              that no longer recognizes you.
            </p>
          </div>

          <div className="ntv__stratum__content">
            <h3>Inside the New State</h3>
            <p>
              Approximately 150,000 Palestinians remained inside what became Israel. They became citizens,
              but lived under military administration until 1966. Some were internally displaced—unable to
              return to homes visible from their new locations.
            </p>
            <p>
              The legal category of &quot;present absentee&quot; applied to those who were inside Israel but absent
              from their property on specific dates. They could not reclaim their land even though they
              remained in the country.
            </p>

            <h3>Evidence</h3>
            <div className="ntv__testimonys">
              {EVIDENCE_CARDS.chapter9.map(card => (
                <EvidenceCardComponent
                  key={card.id}
                  card={card}
                  isExpanded={expandedCards.has(card.id)}
                  onToggle={() => toggleCard(card.id)}
                />
              ))}
            </div>

            <MisconceptionCheckpoint
              myth="&quot;If some stayed, the Nakba did not happen.&quot;"
              evidence="Approximately 150,000 Palestinians remained inside what became Israel. Their presence does not negate the displacement of 700,000+. Survival and dispossession coexist."
            />

            <SoWhat
              text="The Nakba is not only exile. It is also living among transformed geographies—seeing your village from a distance, walking roads with changed names, existing in a landscape that no longer recognizes you."
            />
          </div>
        </div>
      </section>

      {/* Chapter 10: Memory as Evidence */}
      <section className="ntv__stratum ntv__stratum--memory" id="chapter-10">
        <div className="ntv__stratum__inner">
          <header className="ntv__stratum__header">
            <p className="ntv__stratum__temporal-marker">1948-Present</p>
            <h2 className="ntv__stratum__title">MEMORY AS EVIDENCE</h2>
          </header>

          <div className="ntv__stratum__vignette">
            <p>
              In a refugee camp in Lebanon, an elderly woman embroiders. Each stitch follows a pattern
              passed from her mother, who learned it from her mother, who learned it in a village that
              no longer exists on any map. The pattern is specific: these colors, this geometry, this village.
              <em>Tatreez</em> carries identity across generations. When archives are incomplete, memory
              becomes a second archive—imperfect but essential. How do historians use oral testimony?
              How does culture preserve what documents cannot?
            </p>
          </div>

          <div className="ntv__stratum__content">
            <h3>Tatreez: Stitching Identity</h3>
            <p>
              In 2021, UNESCO inscribed Palestinian embroidery (<em>tatreez</em>) on the Representative List
              of the Intangible Cultural Heritage of Humanity. Traditional patterns encoded village identity:
              specific motifs indicated origin, status, and regional affiliation.
            </p>
            <p>
              When villages were depopulated and archives scattered, embroidery preserved what paper could not.
              The patterns continue in diaspora, transmitted across generations.
            </p>

            <h3>Oral History as Method</h3>
            <p>
              Oral history is a recognized methodology in academic historiography. Historians triangulate
              testimony with documents, maps, and multiple accounts. Memory is imperfect—but so are archives.
              The question is not &quot;is memory reliable?&quot; but &quot;how do we use multiple sources together?&quot;
            </p>

            <h3>Evidence</h3>
            <div className="ntv__testimonys">
              {EVIDENCE_CARDS.chapter10.map(card => (
                <EvidenceCardComponent
                  key={card.id}
                  card={card}
                  isExpanded={expandedCards.has(card.id)}
                  onToggle={() => toggleCard(card.id)}
                />
              ))}
            </div>

            <MisconceptionCheckpoint
              myth="&quot;Memory is inherently unreliable, so it is useless.&quot;"
              evidence="Oral history is a recognized methodology. Historians triangulate testimony with documents, maps, and multiple accounts. Memory is imperfect but essential—especially when archives are incomplete or closed."
            />

            <SoWhat
              text="When archives are closed or incomplete, memory becomes a second archive—imperfect, but essential. Understanding how historians use testimony teaches readers how knowledge is built."
            />
          </div>
        </div>
      </section>

      {/* Chapter 11: What We Don't Know */}
      <section className="ntv__stratum ntv__stratum--memory" id="chapter-11">
        <div className="ntv__stratum__inner">
          <header className="ntv__stratum__header">
            <p className="ntv__stratum__temporal-marker">Present Day / Methodology</p>
            <h2 className="ntv__stratum__title">WHAT WE STILL DON&apos;T KNOW</h2>
          </header>

          <div className="ntv__stratum__vignette">
            <p>
              In the Israeli Defense Forces archives, files remain classified. In a refugee camp, an elderly
              witness dies before her story is recorded. In a village registry, pages are missing. History is
              not a completed puzzle—it is an ongoing reconstruction with pieces still being found. What would
              newly declassified documents reveal? What testimony remains uncollected? Responsible history
              does not mean neutral feelings—it means transparent methods. What we don&apos;t know matters as much
              as what we do.
            </p>
          </div>

          <div className="ntv__stratum__content">
            <h3>Open Questions</h3>
            <ul>
              <li>What do classified Israeli archives contain?</li>
              <li>What oral history remains uncollected as witnesses age and die?</li>
              <li>How should we weigh competing interpretations of the same evidence?</li>
              <li>What evidence would change scholarly consensus?</li>
            </ul>

            <h3>The Morris/Pappé Debate</h3>
            <p>
              Benny Morris and Ilan Pappé represent two poles of interpretation. Both are &quot;New Historians&quot;
              who used Israeli archives opened in the 1980s. Morris documents extensive violence and expulsion
              but argues against a master plan. Pappé argues for systematic ethnic cleansing. They use similar
              sources but draw different conclusions.
            </p>
            <p>
              This is how scholarship works: disagreement is productive. What matters is methodology, evidence,
              and transparent reasoning.
            </p>

            <h3>Epistemic Humility</h3>
            <p>
              Responsible history acknowledges uncertainty without claiming that nothing is knowable.
              Historians agree on much:
            </p>
            <ul>
              <li>Displacement happened</li>
              <li>Numbers exceed 700,000</li>
              <li>Documented expulsions occurred (Lydda/Ramle)</li>
              <li>Fear played a significant role</li>
              <li>The discredited &quot;Arab orders&quot; claim lacks evidence</li>
            </ul>
            <p>
              They debate interpretation: degree of planning, proportions of causes, moral framing.
              Disagreement is productive, not paralyzing.
            </p>

            <h3>Evidence</h3>
            <div className="ntv__testimonys">
              {EVIDENCE_CARDS.chapter11.map(card => (
                <EvidenceCardComponent
                  key={card.id}
                  card={card}
                  isExpanded={expandedCards.has(card.id)}
                  onToggle={() => toggleCard(card.id)}
                />
              ))}
            </div>

            <MisconceptionCheckpoint
              myth="&quot;If historians disagree, nothing is knowable.&quot;"
              evidence="Disagreement is how scholarship works. Historians agree on much (displacement happened, numbers exceed 700,000, documented expulsions occurred). They debate interpretation (degree of planning, proportions of causes). Disagreement is productive, not paralyzing."
            />

            <SoWhat
              text="Responsible history does not mean neutral feelings—it means transparent methods. Understanding what we don&apos;t know is as important as understanding what we do."
            />
          </div>
        </div>
      </section>

      {/* Epilogue */}
      <section className="ntv__coda" id="epilogue">
        <div className="ntv__coda__text">
          <p>
            The Nakba is history. It is also present. Over five million people are registered as Palestine
            refugees. The villages exist as ruins, as memories, as stitches in fabric. The keys are still kept.
          </p>
          <p>
            This essay has not told you what to think. It has shown you evidence, methodology, and uncertainty.
            It has distinguished established facts from contested interpretations. It has centered human dignity
            without sensationalism.
          </p>
          <p>
            Understanding does not require agreement. But it does require engagement with evidence.
            A map is not a home. A document is not a life. But they are where understanding begins.
          </p>
        </div>
        <p className="ntv__coda__closing">
          What you do with this understanding is yours to decide.
        </p>
      </section>

      {/* Glossary */}
      <section className="ntv__lexicon" id="glossary">
        <h2 className="ntv__lexicon__title">Glossary</h2>
        <div className="ntv__lexicon__grid">
          {GLOSSARY_TERMS.map((term, i) => (
            <div key={i} className="ntv__lexicon__term">
              <div className="ntv__lexicon__word">{term.term}</div>
              {term.arabic && (
                <div className="ntv__lexicon__arabic">
                  {term.arabic} {term.transliteration && <span className="transliteration">({term.transliteration})</span>}
                </div>
              )}
              <div className="ntv__lexicon__definition">{term.definition}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Bibliography */}
      <section className="ntv__sources" id="bibliography">
        <h2 className="ntv__lexicon__title">Bibliography</h2>

        <div className="ntv__sources__section">
          <h3 className="ntv__sources__section-title">Primary Documents</h3>
          <ul className="ntv__sources__list">
            <li className="ntv__sources__item">
              British Government. <em>A Survey of Palestine</em>. 2 vols. Jerusalem: Government Printer, 1946.
            </li>
            <li className="ntv__sources__item">
              British Government. <em>Palestine Royal Commission Report</em> (Peel Commission). Cmd. 5479. London: HMSO, 1937.
            </li>
            <li className="ntv__sources__item">
              United Nations. General Assembly Resolution 181 (II). 29 November 1947.
            </li>
            <li className="ntv__sources__item">
              United Nations. General Assembly Resolution 194 (III). 11 December 1948.
            </li>
            <li className="ntv__sources__item">
              United Nations. General Assembly Resolution 302 (IV). 8 December 1949.
            </li>
          </ul>
        </div>

        <div className="ntv__sources__section">
          <h3 className="ntv__sources__section-title">Academic Books</h3>
          <ul className="ntv__sources__list">
            <li className="ntv__sources__item">
              Morris, Benny. <em>The Birth of the Palestinian Refugee Problem Revisited</em>. Cambridge University Press, 2004.
            </li>
            <li className="ntv__sources__item">
              Morris, Benny. <em>1948: A History of the First Arab-Israeli War</em>. Yale University Press, 2008.
            </li>
            <li className="ntv__sources__item">
              Pappé, Ilan. <em>The Ethnic Cleansing of Palestine</em>. Oneworld Publications, 2006.
            </li>
            <li className="ntv__sources__item">
              Khalidi, Walid. <em>All That Remains: The Palestinian Villages Occupied and Depopulated by Israel in 1948</em>. Institute for Palestine Studies, 1992.
            </li>
            <li className="ntv__sources__item">
              Khalidi, Rashid. <em>The Hundred Years&apos; War on Palestine</em>. Metropolitan Books, 2020.
            </li>
            <li className="ntv__sources__item">
              Segev, Tom. <em>One Palestine, Complete: Jews and Arabs Under the British Mandate</em>. Metropolitan Books, 2000.
            </li>
            <li className="ntv__sources__item">
              Shlaim, Avi. <em>The Iron Wall: Israel and the Arab World</em>. W.W. Norton, 2000.
            </li>
            <li className="ntv__sources__item">
              Zurayk, Constantin. <em>Ma&apos;na an-Nakba</em> (The Meaning of the Disaster). Beirut: Dar al-&apos;Ilm lil-Malayin, 1948.
            </li>
          </ul>
        </div>

        <div className="ntv__sources__section">
          <h3 className="ntv__sources__section-title">Archives & Collections</h3>
          <ul className="ntv__sources__list">
            <li className="ntv__sources__item">
              G. Eric and Edith Matson Photograph Collection, Library of Congress. <a href="https://www.loc.gov/collections/g-eric-and-edith-matson-photographs/" target="_blank" rel="noopener noreferrer">https://www.loc.gov/collections/g-eric-and-edith-matson-photographs/</a>
            </li>
            <li className="ntv__sources__item">
              Palestine Open Maps. <a href="https://palopenmaps.org" target="_blank" rel="noopener noreferrer">https://palopenmaps.org</a>
            </li>
            <li className="ntv__sources__item">
              United Nations Archives. <a href="https://archives.un.org" target="_blank" rel="noopener noreferrer">https://archives.un.org</a>
            </li>
            <li className="ntv__sources__item">
              UNRWA. <a href="https://www.unrwa.org" target="_blank" rel="noopener noreferrer">https://www.unrwa.org</a>
            </li>
            <li className="ntv__sources__item">
              Avalon Project, Yale Law School. <a href="https://avalon.law.yale.edu" target="_blank" rel="noopener noreferrer">https://avalon.law.yale.edu</a>
            </li>
          </ul>
        </div>

        <div className="ntv__sources__section">
          <h3 className="ntv__sources__section-title">Image Credits</h3>
          <ul className="ntv__sources__list">
            <li className="ntv__sources__item">
              Historical photographs: G. Eric and Edith Matson Photograph Collection, Library of Congress. No known restrictions on publication.
            </li>
            <li className="ntv__sources__item">
              Map data: Palestine Open Maps (palopenmaps.org). Public domain.
            </li>
            <li className="ntv__sources__item">
              Figure portraits: Wikimedia Commons. License verified per image.
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
}
