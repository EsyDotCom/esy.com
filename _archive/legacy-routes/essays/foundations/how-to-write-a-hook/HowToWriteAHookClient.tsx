'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import './how-to-write-a-hook.css';

// ==================== SCROLL-LOCK HOOK WITH EXIT (per SCROLL_LOCK_EXIT_TRANSITION.md) ====================

interface ScrollLockState {
  containerRef: React.RefObject<HTMLDivElement | null>;
  progress: number;
  isPinned: boolean;
  isExiting: boolean;
  unpinPoint: number;
}

const useScrollLock = (): ScrollLockState => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [unpinPoint, setUnpinPoint] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = containerHeight - viewportHeight;
      const scrolledIntoSection = -rect.top;

      if (rect.top <= 0 && scrolledIntoSection <= scrollableDistance) {
        // STATE 1: Currently in scroll-lock zone
        setIsPinned(true);
        setIsExiting(false);
        setProgress(Math.min(1, Math.max(0, scrolledIntoSection / scrollableDistance)));
      } else if (rect.top > 0) {
        // STATE 2: Before scroll-lock zone (haven't entered yet)
        setIsPinned(false);
        setIsExiting(false);
        setProgress(0);
      } else {
        // STATE 3: After scroll-lock zone - SMOOTH EXIT
        setIsPinned(false);
        setIsExiting(true);
        setProgress(1);
        setUnpinPoint(scrollableDistance);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { containerRef, progress, isPinned, isExiting, unpinPoint };
};

/* ============================================
   HOW TO WRITE A HOOK — THE COGNITIVE ARCHITECTURE OF OPENINGS
   ============================================
   A typography-forward visual essay where the reader literally
   crosses through cognitive thresholds. Type forms doorways.
   No photography — typography IS the illustration.

   Central Metaphor: The Doorway/Threshold
   Based on: Loewenstein (Information Gap), Radvansky (Doorway Effect),
             Classical Rhetoric (Aristotle, Cicero, Quintilian)
   ============================================ */

// ==================== DATA ====================

interface Figure {
  name: string;
  epithet: string;
  years: string;
  quote: string;
  quoteSource: string;
  contribution: string;
}

interface Chapter {
  id: string;
  number: number;
  title: string;
  contextMarker: string;
  metaphor: string;
  content: string[];
  figures?: Figure[];
  stateClass: string;
}

const chapters: Chapter[] = [
  {
    id: 'the-door',
    number: 1,
    title: 'What a Hook Actually Is',
    contextMarker: 'Foundation',
    metaphor: 'A hook is not a gimmick—it is a cognitive doorway between worlds.',
    stateClass: 'state-foundation',
    content: [
      'A hook is not a clever trick. It is not a "surprising fact" pasted to the front of your essay. It is not decoration.',
      'A hook is a threshold. It is the cognitive doorway between the reader\'s world and the essay\'s world.',
      'Classical rhetoricians understood this intuitively. Aristotle called the opening a "proem"—something that "paves the way for what follows." The Roman rhetorician Cicero described three goals for any opening: make the audience attentive, receptive, and well-disposed.',
      'Notice what these goals have in common: they are all about transformation. The hook does not merely capture attention—it prepares the mind for a journey.',
      'When you cross a threshold, something changes. You are no longer outside; you are inside. The hook performs this transformation in the reader\'s mind.',
    ],
    figures: [
      {
        name: 'Aristotle',
        epithet: 'The Architect of Rhetorical Structure',
        years: '384–322 BCE',
        quote: 'The Introduction is the beginning of a speech, corresponding to the prologue in poetry and the prelude in flute-music; they are all beginnings, paving the way, as it were, for what follows.',
        quoteSource: 'Rhetoric, Book III, Chapter 14',
        contribution: 'First to define the proem as "paving the way for what follows." Established that openings are functional, not ornamental.',
      },
    ],
  },
  {
    id: 'the-mind',
    number: 2,
    title: 'What Happens in the Reader\'s Brain',
    contextMarker: 'Cognitive Science',
    metaphor: 'The brain is a prediction machine with limited capacity, driven by gaps.',
    stateClass: 'state-cognitive',
    content: [
      'What happens in the first moments of reading? Cognitive science offers a precise answer.',
      'George Loewenstein\'s Information Gap Theory explains why curiosity compels us forward. Curiosity arises when attention becomes focused on a gap in knowledge. This gap creates cognitive "hunger"—an uncomfortable state that motivates information-seeking.',
      'But there is an inverted U-curve: too small a gap creates no motivation (you already know). Too large a gap creates overwhelm (no anchor point). The optimal hook creates a gap just large enough to create hunger, with just enough information to make the gap visible.',
      'Daniel Kahneman\'s dual-process theory adds another layer. System 1 (automatic processing) monitors constantly for novelty. When something unexpected appears, System 2 (deliberate processing) is mobilized. This "surge of conscious attention" is what a hook triggers.',
      'Your working memory holds roughly seven chunks of information for about twenty seconds. The hook must work within these constraints—simple enough to comprehend instantly, complex enough to create interest.',
    ],
    figures: [
      {
        name: 'George Loewenstein',
        epithet: 'The Cartographer of Curiosity',
        years: 'b. 1955',
        quote: 'Curiosity arises when attention becomes focused on a gap in one\'s knowledge. Such information gaps produce the feeling of deprivation labeled curiosity.',
        quoteSource: 'Psychological Bulletin, 1994',
        contribution: 'Proposed Information Gap Theory. Great-grandson of Sigmund Freud. Carnegie Mellon University Professor.',
      },
      {
        name: 'Daniel Kahneman',
        epithet: 'The Dual-Mind Discoverer',
        years: '1934–2024',
        quote: 'You can also feel a surge of conscious attention whenever you are surprised. System 2 is activated when an event is detected that violates the model of the world that System 1 maintains.',
        quoteSource: 'Thinking, Fast and Slow',
        contribution: 'Nobel Prize winner (2002) without taking an economics course. Developed System 1/System 2 framework.',
      },
    ],
  },
  {
    id: 'the-metaphor',
    number: 3,
    title: 'The Doorway Effect',
    contextMarker: 'The Metaphor',
    metaphor: 'Essay hooks work like physical doorways—they create event boundaries in the brain.',
    stateClass: 'state-liminal',
    content: [
      'The doorway metaphor is not merely poetic. It has empirical grounding.',
      'In 2006, cognitive scientists Gabriel Radvansky and David Copeland made a remarkable discovery: walking through doorways causes forgetting. Participants who crossed through a doorway had significantly worse memory for objects they had just been handling.',
      'Why? Doorways serve as "event boundaries" in the mind. The brain compartmentalizes what came before, files it away, and prepares for what comes after. Crossing a threshold is a cognitive reset.',
      'This is exactly what a hook does. It signals: a new episode is beginning. Clear your mental workspace. Prepare for transformation.',
      'The anthropologist Arnold van Gennep identified a universal structure in rituals of transition: separation, liminality, incorporation. The hook performs the first movement—it separates the reader from their prior context and prepares them for entry into something new.',
    ],
    figures: [
      {
        name: 'Gabriel Radvansky',
        epithet: 'The Doorway Researcher',
        years: 'Active 2000s–Present',
        quote: 'Walking through a doorway serves as an event boundary, segmenting one episode from the next.',
        quoteSource: 'Memory & Cognition, 2006',
        contribution: 'Discovered that passing through doorways impairs short-term memory. University of Notre Dame cognitive scientist.',
      },
      {
        name: 'Arnold van Gennep',
        epithet: 'The Threshold Theorist',
        years: '1873–1957',
        quote: 'The door is the boundary between the foreign and domestic worlds... to cross the threshold is to unite oneself with a new world.',
        quoteSource: 'Les rites de passage, 1909',
        contribution: 'Introduced liminality in rites of passage. The word limen (threshold) is the root of "liminal."',
      },
    ],
  },
  {
    id: 'types-of-doors',
    number: 4,
    title: 'Hook Types Mapped to Essay Intent',
    contextMarker: 'Application',
    metaphor: 'Different journeys require different doors.',
    stateClass: 'state-application',
    content: [
      'There is no universal "best" hook because there is no universal essay. Different intentions require different thresholds.',
      'For informative essays, use an orienting hook—establish context and signal significance. The reader needs to know where they are and why it matters.',
      'For argumentative essays, use a tension hook—stake a controversial position early. Create productive disagreement that pulls the reader through.',
      'For analytical essays, use a question hook—pose the interpretive puzzle that the essay will address. Make the reader feel the problem before you offer the solution.',
      'For narrative essays, use a scene hook—drop the reader in medias res, into the middle of action. Let sensory detail do the work of orientation.',
      'Cicero distinguished two modes: principium (direct opening) for receptive audiences, and insinuatio (subtle approach) for hostile or indifferent ones. Match your door to your visitor.',
    ],
    figures: [
      {
        name: 'Marcus Tullius Cicero',
        epithet: 'The Master of Eloquence',
        years: '106–43 BCE',
        quote: 'The beginning of a speech is like the vestibule of a house—it must invite entry while preparing the visitor for what lies within.',
        quoteSource: 'De Oratore (paraphrased)',
        contribution: 'Rome\'s greatest orator. Codified the exordium: make audience benevolent, attentive, teachable.',
      },
    ],
  },
  {
    id: 'broken-doors',
    number: 5,
    title: 'Why Hooks Fail',
    contextMarker: 'Diagnosis',
    metaphor: 'Even following "rules" can produce broken thresholds.',
    stateClass: 'state-failure',
    content: [
      'Knowing how hooks work also reveals how they fail.',
      'Cicero identified seven faults of openings: vulgare (generic—could fit any essay), commune (common—your opponent could use it), commutabile (interchangeable—no connection to THIS argument), longum (tedious—exhausts before entry), separatum (disconnected—doesn\'t lead where promised), translatum (mismatched—creates wrong expectations), and contra praecepta (against principles—violates fundamental rules).',
      'Modern writing shares these problems. The overselling hook creates expectations the essay cannot fulfill. The mismatch hook activates the wrong schema—readers prepare for one kind of journey and get another. The Engfish hook (Ken Macrorie\'s term) sounds like what essays should sound like rather than genuine thought.',
      'Most dangerous is visible artifice. Quintilian warned that speakers "should give no hint of elaboration in the exordium." When readers can see the hook operating as a hook, they resist it. Technique that calls attention to itself undermines trust.',
      'The information gap can also fail: too large a gap confuses; too small a gap bores. The hook must create exactly enough mystery to motivate, with exactly enough clarity to orient.',
    ],
    figures: [
      {
        name: 'Quintilian',
        epithet: 'The Educator\'s Rhetorician',
        years: '35–100 CE',
        quote: 'Care must also be taken to avoid exciting suspicion, and speakers should therefore give no hint of elaboration in the exordium.',
        quoteSource: 'Institutio Oratoria, Book IV',
        contribution: 'First public teacher of rhetoric in Rome. Warned against visible artifice in openings.',
      },
      {
        name: 'Ken Macrorie',
        epithet: 'The Crusader Against Phony Prose',
        years: '1918–2020',
        quote: 'The biggest lesson is this: tell the truth when you write.',
        quoteSource: 'Telling Writing, 1970',
        contribution: 'Coined "Engfish": lifeless prose that sounds like what essays should sound like.',
      },
    ],
  },
  {
    id: 'thresholds-in-practice',
    number: 6,
    title: 'Three Hooks Analyzed',
    contextMarker: 'Examples',
    metaphor: 'See the mechanism at work.',
    stateClass: 'state-examples',
    content: [
      'Theory becomes clear through examples. Consider three hooks and what they do to the reader\'s mind.',
      'The Question Hook: "What if everything you believed about productivity was wrong?" This creates an information gap by threatening existing knowledge. It activates System 2 through surprise. The reader must engage to resolve the dissonance. Risk: if the essay doesn\'t deliver a genuine challenge, the hook oversells.',
      'The Scene Hook: "The laboratory was silent at 3 a.m. when the machine finally spoke." This uses sensory specificity to orient the reader in space and time. It creates a narrative gap—what did the machine say? The schema activated is "discovery story." Risk: if the essay pivots to abstract argument, the schema mismatches.',
      'The Tension Hook: "Most writing advice makes you a worse writer." This stakes a controversial claim that demands engagement. The reader is forced to choose: agree or disagree? Either way, they\'re pulled through the threshold. Risk: if the essay doesn\'t justify the bold claim, trust erodes.',
      'In each case, notice the transformation: the reader enters with one mental state and exits with another. The hook has done its work.',
    ],
  },
  {
    id: 'building-your-door',
    number: 7,
    title: 'Designing a Hook Deliberately',
    contextMarker: 'Synthesis',
    metaphor: 'A hook is engineered, not discovered by accident (though revision helps).',
    stateClass: 'state-synthesis',
    content: [
      'Understanding the mechanism enables deliberate design. Here is a framework—not a formula.',
      'Ask four questions: Who is the reader? (What do they know? What do they expect? What would surprise them?) What context do they lack? (What must you establish for the essay to make sense?) What expectation must be set? (What kind of journey are you promising?) What gap should exist after the first sentence? (What question should linger?)',
      'This framework helps you think, but it is not a checklist. The best hooks emerge from deep engagement with your material.',
      'Donald Murray, the dean of writing process pedagogy, observed: "I hear rumors of good pieces of writing that have poor leads or beginnings, but I have not been able to find any from professional writers." The hook matters—but Murray also knew that hooks are often discovered, not pre-planned.',
      'Peter Elbow taught that authentic voice emerges from authentic engagement. Write the body first. Understand your argument. Then return to the beginning. The hook you need will often reveal itself once you know what you\'re actually saying.',
    ],
    figures: [
      {
        name: 'Donald M. Murray',
        epithet: 'The Dean of Writing Process',
        years: '1924–2006',
        quote: 'I hear rumors of good pieces of writing that have poor leads or beginnings, but I have not been able to find any from professional writers.',
        quoteSource: 'Various columns and writings',
        contribution: 'Pulitzer Prize winner (1954). Key insight: good hooks discovered, not pre-planned.',
      },
      {
        name: 'Peter Elbow',
        epithet: 'The Voice of Authentic Writing',
        years: 'b. 1935',
        quote: 'Writing with voice is writing into which someone has breathed.',
        quoteSource: 'Writing with Power, 1981',
        contribution: 'Pioneer of freewriting. Key insight: authentic engagement produces authentic openings.',
      },
    ],
  },
  {
    id: 'beyond-threshold',
    number: 8,
    title: 'What You Now Understand',
    contextMarker: 'Meta-Reflection',
    metaphor: 'Understanding hooks is understanding communication itself.',
    stateClass: 'state-reflection',
    content: [
      'You have crossed eight thresholds. Look back at what you\'ve learned.',
      'A hook is a cognitive doorway. It creates an information gap that motivates forward movement. It activates relevant schemas while triggering the orienting response. It respects working memory limits while creating complexity. It establishes appropriate expectations. It transforms the reader from outsider to insider.',
      'This understanding transfers beyond essays. Research paper abstracts, article ledes, speech openings, even email subject lines—any communication that requires a reader to choose entry benefits from this framework.',
      'Notice what this essay did. It opened with an invitation: "Begin." It created gaps (what IS a hook, really?). It activated schemas (cognitive science, classical rhetoric). It fulfilled promises made in the threshold.',
      'Hooks are not tricks. They are about clarity—about helping readers make the transition from their context to yours. The mechanism serves the relationship between writer and reader.',
      'You came in knowing hooks mattered. You leave understanding why. That transformation—from recognition to comprehension—is what every threshold crossing makes possible.',
    ],
  },
];

const sources = [
  { title: 'Loewenstein, G. (1994). The psychology of curiosity. Psychological Bulletin, 116(1), 75-98.', url: 'https://www.cmu.edu/dietrich/sds/docs/loewenstein/PsychofCuriosity.pdf' },
  { title: 'Kahneman, D. (2011). Thinking, Fast and Slow. Farrar, Straus and Giroux.', url: 'https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow' },
  { title: 'Radvansky, G. A., & Copeland, D. E. (2006). Walking through doorways causes forgetting. Memory & Cognition.', url: 'https://news.nd.edu/news/walking-through-doorways-causes-forgetting-new-research-shows/' },
  { title: 'Aristotle. Rhetoric, Book III. Trans. W. Rhys Roberts.', url: 'http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0060' },
  { title: 'Quintilian. Institutio Oratoria, Book IV.', url: 'https://en.wikipedia.org/wiki/Institutio_Oratoria' },
  { title: 'Van Gennep, A. (1909). Les rites de passage. University of Chicago Press (1960 English ed.).', url: 'https://en.wikipedia.org/wiki/Liminality' },
  { title: 'Kintsch, W. (1998). Comprehension: A Paradigm for Cognition. Cambridge University Press.', url: 'https://en.wikipedia.org/wiki/Walter_Kintsch' },
  { title: 'Macrorie, K. (1970). Telling Writing. Heinemann.', url: 'https://www.heinemann.com/authors/151.aspx' },
  { title: 'Murray, D. M. (1972). Teach Writing as a Process Not Product. The Leaflet.', url: 'https://en.wikipedia.org/wiki/Donald_Murray_(writer)' },
  { title: 'Elbow, P. (1981). Writing with Power. Oxford University Press.', url: 'https://en.wikipedia.org/wiki/Peter_Elbow' },
];

// Core concepts covered in this essay
interface Concept {
  name: string;
  definition: string;
  domain: string;
}

const concepts: Concept[] = [
  { name: 'Information Gap Theory', definition: 'Curiosity arises when attention focuses on a gap in knowledge, creating cognitive "hunger" that motivates information-seeking.', domain: 'Cognitive Science' },
  { name: 'Dual-Process Theory', definition: 'System 1 monitors for novelty; System 2 engages deliberate processing when surprised. Hooks trigger this attention surge.', domain: 'Cognitive Science' },
  { name: 'The Doorway Effect', definition: 'Doorways serve as "event boundaries" in the mind, triggering cognitive resets. Essay hooks function similarly.', domain: 'Cognitive Science' },
  { name: 'Proem & Exordium', definition: 'Classical terms for openings that "pave the way" and make audiences attentive, receptive, and well-disposed.', domain: 'Classical Rhetoric' },
  { name: 'Principium vs. Insinuatio', definition: 'Direct openings for receptive audiences; subtle approaches for hostile or indifferent ones.', domain: 'Classical Rhetoric' },
  { name: 'Visible Artifice', definition: 'When readers can see technique operating as technique, they resist it. Hide the mechanism.', domain: 'Classical Rhetoric' },
  { name: 'Liminality', definition: 'The transitional state between separation and incorporation. From Latin limen (threshold).', domain: 'Anthropology' },
  { name: 'Hook as Cognitive Threshold', definition: 'A hook is not a gimmick—it is the cognitive doorway between the reader\'s world and the essay\'s world.', domain: 'Writing Pedagogy' },
  { name: 'Engfish', definition: 'Lifeless prose that sounds like what essays "should" sound like rather than genuine thought.', domain: 'Writing Pedagogy' },
  { name: 'The Four-Question Framework', definition: 'Who is the reader? What context do they lack? What expectation must be set? What gap should exist?', domain: 'Practical Application' },
];

// ==================== COMPONENTS ====================

// Opening Door Progress Bar
const OpeningDoorProgress: React.FC<{ progress: number; chapters: Chapter[] }> = ({ progress, chapters }) => {
  // Door angle: 0% = closed (0 degrees), 100% = open (90 degrees)
  const doorAngle = progress * 90;

  return (
    <div className="opening-door-progress" aria-label={`Reading progress: ${Math.round(progress * 100)}%`}>
      <div className="door-frame">
        <div className="door-interior">
          {/* Light rays that appear as door opens */}
          <div
            className="door-light"
            style={{ opacity: Math.max(0, progress - 0.5) * 2 }}
          />
        </div>
        <div
          className="door-panel"
          style={{ transform: `perspective(200px) rotateY(${-doorAngle}deg)` }}
        >
          <div className="door-knob" />
        </div>
        <div className="door-threshold" />
      </div>
      <div className="chapter-dots">
        {chapters.map((chapter, index) => {
          const chapterPosition = (index + 1) / chapters.length;
          const isActive = progress >= chapterPosition - 0.05;
          return (
            <div
              key={chapter.id}
              className={`chapter-dot ${isActive ? 'active' : ''}`}
              title={`Chapter ${chapter.number}: ${chapter.title}`}
            />
          );
        })}
      </div>
    </div>
  );
};

// Typographic Doorway Component
const TypographicDoorway: React.FC<{
  text: string;
  isVisible: boolean;
  variant?: 'hero' | 'chapter' | 'quote';
}> = ({ text, isVisible, variant = 'chapter' }) => {
  return (
    <div className={`typographic-doorway ${variant} ${isVisible ? 'visible' : ''}`}>
      <div className="doorway-frame">
        <div className="doorway-lintel" />
        <div className="doorway-posts">
          <div className="doorway-post left" />
          <div className="doorway-content">
            <span className="doorway-text">{text}</span>
          </div>
          <div className="doorway-post right" />
        </div>
        <div className="doorway-threshold-line" />
      </div>
    </div>
  );
};

// Figure Profile Component
const FigureProfile: React.FC<{
  figure: Figure;
  isVisible: boolean;
  index?: number;
}> = ({ figure, isVisible, index = 0 }) => {
  return (
    <div
      className={`figure-profile ${isVisible ? 'visible' : ''}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="figure-header">
        <h4 className="figure-name">{figure.name}</h4>
        <span className="figure-years">{figure.years}</span>
      </div>
      <p className="figure-epithet">{figure.epithet}</p>
      <p className="figure-contribution">{figure.contribution}</p>
      <blockquote className="figure-quote">
        <p>&ldquo;{figure.quote}&rdquo;</p>
        <cite>— {figure.quoteSource}</cite>
      </blockquote>
    </div>
  );
};

// Chapter Section Component
const ChapterSection: React.FC<{
  chapter: Chapter;
  isVisible: boolean;
}> = ({ chapter, isVisible }) => {
  return (
    <section
      id={chapter.id}
      className={`chapter-section ${chapter.stateClass} ${isVisible ? 'visible' : ''}`}
    >
      <div className="chapter-header">
        <div className="chapter-meta">
          <span className="chapter-number">Chapter {chapter.number}</span>
          <span className="chapter-marker">{chapter.contextMarker}</span>
        </div>
        <h2 className="chapter-title">{chapter.title}</h2>
        <p className="chapter-metaphor">{chapter.metaphor}</p>
      </div>

      <TypographicDoorway
        text={`${chapter.number}`}
        isVisible={isVisible}
        variant="chapter"
      />

      <div className="chapter-content">
        {chapter.content.map((paragraph, index) => (
          <p
            key={index}
            className="content-paragraph"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {chapter.figures && chapter.figures.length > 0 && (
        <div className="figures-container">
          {chapter.figures.map((figure, index) => (
            <FigureProfile
              key={figure.name}
              figure={figure}
              isVisible={isVisible}
              index={index}
            />
          ))}
        </div>
      )}
    </section>
  );
};

// Conceptual Foundations Section
const ConceptsCoveredSection: React.FC = () => {
  // Group concepts by domain
  const conceptsByDomain = concepts.reduce((acc, concept) => {
    if (!acc[concept.domain]) {
      acc[concept.domain] = [];
    }
    acc[concept.domain].push(concept);
    return acc;
  }, {} as Record<string, Concept[]>);

  const domainOrder = ['Cognitive Science', 'Classical Rhetoric', 'Anthropology', 'Writing Pedagogy', 'Practical Application'];

  return (
    <section className="concepts-section">
      <div className="concepts-content">
        <h3 className="concepts-title">Conceptual Foundations</h3>
        <p className="concepts-intro">
          Key theories and frameworks explored in this essay, organized by domain.
        </p>
        <div className="concepts-grid">
          {domainOrder.map((domain) => (
            conceptsByDomain[domain] && (
              <div key={domain} className="concept-domain">
                <h4 className="domain-label">{domain}</h4>
                <ul className="concept-list">
                  {conceptsByDomain[domain].map((concept, index) => (
                    <li key={index} className="concept-item">
                      <span className="concept-name">{concept.name}</span>
                      <span className="concept-definition">{concept.definition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

// Sources Section
const SourcesSection: React.FC = () => {
  return (
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
          All quotes verified against primary sources. Research grounded in peer-reviewed
          cognitive science, classical rhetoric scholarship, and composition studies.
        </p>
      </div>
    </section>
  );
};

// ==================== MAIN COMPONENT ====================

export default function HowToWriteAHookClient() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['hero']));
  const [isMounted, setIsMounted] = useState(false);

  // Use scroll-lock hook for hero section (per SCROLL_LOCK_EXIT_TRANSITION.md)
  const { containerRef: heroRef, progress: heroProgress, isPinned, isExiting, unpinPoint } = useScrollLock();

  // Phase calculation with useMemo - extended ranges for smoother transitions
  const heroPhase = useMemo(() => {
    if (heroProgress < 0.15) return 'begin';
    if (heroProgress < 0.35) return 'doorway';
    if (heroProgress < 0.55) return 'title';
    if (heroProgress < 0.75) return 'promise';
    return 'insight';
  }, [heroProgress]);

  // Mark as mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Track overall scroll progress for progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / scrollHeight;
      setScrollProgress(Math.min(1, Math.max(0, currentProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15, rootMargin: '-50px' }
    );

    const sections = document.querySelectorAll('.chapter-section, .closing-section, .intro-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="essay-container how-to-write-a-hook">
      {/* Progress Indicator - Opening Door */}
      <OpeningDoorProgress progress={scrollProgress} chapters={chapters} />

      {/* Hero Section - The Threshold Crossing (per SCROLL_LOCK_EXIT_TRANSITION.md) */}
      <section
        ref={heroRef}
        id="hero"
        className={`hero-section phase-${heroPhase} ${isMounted ? 'visible' : ''}`}
        style={{ height: '400vh', position: 'relative' }}
      >
        <div
          className={`hero-pinned ${isPinned ? 'is-pinned' : ''}`}
          style={isExiting ? {
            position: 'absolute',
            top: `${unpinPoint}px`,
            left: 0,
            right: 0,
            height: '100vh',
          } : undefined}
        >
          <div className="hero-background">
            <div className="threshold-glow" />
            <div className="manuscript-texture" />
          </div>

          <div className="hero-content">
            {/* Phase: begin (0-20%) - EXCLUSIVE */}
            <p
              className="hero-statement begin-word"
              style={{
                opacity: heroPhase === 'begin' ? 1 : 0,
                visibility: heroPhase === 'begin' ? 'visible' : 'hidden',
                transition: 'opacity 0.8s ease-out, visibility 0.8s ease-out',
              }}
            >
              Begin.
            </p>

            {/* Phase: doorway (20-40%) - doorway frame appears, fades before title */}
            <div
              className="hero-stage stage-doorway"
              style={{
                opacity: heroPhase === 'doorway' ? 1 : 0,
                visibility: heroPhase === 'doorway' ? 'visible' : 'hidden',
                transition: 'opacity 0.8s ease-out, visibility 0.8s ease-out',
              }}
            >
              <TypographicDoorway
                text="H"
                isVisible={heroPhase === 'doorway'}
                variant="hero"
              />
            </div>

            {/* Phase: title (40-60%) - title appears, fades before promise */}
            <div
              className="hero-stage stage-title"
              style={{
                opacity: heroPhase === 'title' ? 1 : 0,
                visibility: heroPhase === 'title' ? 'visible' : 'hidden',
                transition: 'opacity 0.8s ease-out, visibility 0.8s ease-out',
              }}
            >
              <h1 className="hero-title">
                <span className="title-main">How to Write a Hook</span>
                <span className="title-sub">The Cognitive Architecture of Openings</span>
              </h1>
            </div>

            {/* Phase: promise (60-80%) - fades before insight */}
            <p
              className="hero-promise"
              style={{
                opacity: heroPhase === 'promise' ? 1 : 0,
                visibility: heroPhase === 'promise' ? 'visible' : 'hidden',
                transition: 'opacity 0.8s ease-out, visibility 0.8s ease-out',
              }}
            >
              This is not about tips. This is about mechanism.
            </p>

            {/* Phase: insight (80-100%) - final reveal */}
            <div
              className="hero-insight"
              style={{
                opacity: heroPhase === 'insight' ? 1 : 0,
                visibility: heroPhase === 'insight' ? 'visible' : 'hidden',
                transition: 'opacity 0.8s ease-out, visibility 0.8s ease-out',
              }}
            >
              <blockquote>
                <p>&ldquo;A hook is a threshold between the reader&apos;s world and the essay&apos;s world.&rdquo;</p>
              </blockquote>
            </div>
          </div>

          <div
            className="scroll-indicator"
            style={{
              opacity: heroPhase === 'begin' ? 1 : 0,
              visibility: heroPhase === 'begin' ? 'visible' : 'hidden',
              transition: 'opacity 0.8s ease-out, visibility 0.8s ease-out',
            }}
          >
            <span>Cross the threshold</span>
            <div className="scroll-arrow">↓</div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section id="intro" className={`intro-section ${visibleSections.has('intro') ? 'visible' : ''}`}>
        <div className="intro-content">
          <p className="intro-lead">
            Most advice about hooks gets it wrong.
          </p>
          <p>
            &ldquo;Start with a surprising fact!&rdquo; &ldquo;Use a question!&rdquo; &ldquo;Open with a quote!&rdquo;
            These are tactics without understanding—techniques without theory.
          </p>
          <p>
            What if you understood <em>why</em> hooks work? What if you could see the cognitive
            mechanism that transforms a reader from outsider to insider, from skeptic to listener?
          </p>
          <p>
            That understanding exists. It sits at the intersection of cognitive science,
            classical rhetoric, and writing pedagogy. It begins with a metaphor:
            <strong> the doorway</strong>.
          </p>
        </div>
      </section>

      {/* Chapters */}
      <main className="chapters-container">
        {chapters.map((chapter) => (
          <ChapterSection
            key={chapter.id}
            chapter={chapter}
            isVisible={visibleSections.has(chapter.id)}
          />
        ))}
      </main>

      {/* Closing Section */}
      <section id="closing" className={`closing-section ${visibleSections.has('closing') ? 'visible' : ''}`}>
        <div className="closing-content">
          <h2 className="closing-title">Through the Door</h2>

          <div className="closing-thresholds">
            <span className="threshold-count">8</span>
            <span className="threshold-label">thresholds crossed</span>
          </div>

          <div className="four-questions">
            <h3>The Framework</h3>
            <ol>
              <li><strong>Who is the reader?</strong></li>
              <li><strong>What context do they lack?</strong></li>
              <li><strong>What expectation must be set?</strong></li>
              <li><strong>What gap should exist after the first sentence?</strong></li>
            </ol>
          </div>

          <blockquote className="closing-quote">
            <p>&ldquo;The hook doesn&apos;t just introduce—it transforms.&rdquo;</p>
          </blockquote>

          <div className="final-message">
            <p>
              You entered this essay with one understanding of hooks.
              You leave with another. That transformation—from recognition to
              comprehension—is what every threshold crossing makes possible.
            </p>
            <p>
              Now go write your own doorway.
            </p>
          </div>
        </div>
      </section>

      {/* Conceptual Foundations */}
      <ConceptsCoveredSection />

      {/* Sources */}
      <SourcesSection />
    </div>
  );
}
