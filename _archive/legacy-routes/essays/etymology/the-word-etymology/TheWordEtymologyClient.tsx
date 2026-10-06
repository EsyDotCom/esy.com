'use client';

import { useEffect, useRef, useState } from 'react';
import './the-word-etymology.css';

interface Section {
  id: string;
  title: string;
  subtitle?: string;
  era?: 'ancient' | 'medieval' | 'print' | 'victorian' | 'digital';
}

const sections: Section[] = [
  { id: 'hero', title: 'Etymology', subtitle: 'The Word That Dug Up Words' },
  { id: 'pronunciation', title: 'Pronouncing the Mystery', era: 'ancient' },
  { id: 'greek-roots', title: 'The True Sense', subtitle: 'Greek Roots', era: 'ancient' },
  { id: 'roman-translation', title: 'Romans Translate the Truth', era: 'ancient' },
  { id: 'medieval-encyclopedia', title: 'The Medieval Encyclopedia', era: 'medieval' },
  { id: 'english-arrival', title: 'Earliest Sighting in English', era: 'medieval' },
  { id: 'meaning-drifts', title: 'Meaning Drifts', subtitle: 'From Truth to History', era: 'print' },
  { id: 'etymology-fallacy', title: 'The Etymology Fallacy', era: 'victorian' },
  { id: 'dictionary-engine', title: 'The Dictionary Engine', era: 'victorian' },
  { id: 'sound-shifts', title: 'Sound Shifts', subtitle: 'The Scientific Revolution', era: 'victorian' },
  { id: 'america-adopts', title: 'America Adopts the Word', era: 'victorian' },
  { id: 'global-spread', title: 'The Global Spread', era: 'victorian' },
  { id: 'key-figures', title: 'Key Figures Gallery', era: 'victorian' },
  { id: 'tools', title: 'Tools of the Trade', era: 'digital' },
  { id: 'digital-age', title: 'Etymology in the Digital Age', era: 'digital' },
  { id: 'invitation', title: 'The Invitation', era: 'digital' },
];

const keyFigures = [
  {
    name: 'Plato',
    dates: 'c. 428–348 BCE',
    epithet: 'The Philosopher Who Asked About Words',
    contribution: 'Authored the Cratylus, the earliest surviving Western text on language philosophy.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Head_Platon_Glyptothek_Munich_548.jpg',
    era: 'ancient' as const,
  },
  {
    name: 'Marcus Terentius Varro',
    dates: '116–27 BCE',
    epithet: 'The First Systematic Etymologist',
    contribution: 'Author of De Lingua Latina, with 6 books devoted to etymology.',
    imageUrl: null,
    note: 'No contemporary portrait survives',
    era: 'ancient' as const,
  },
  {
    name: 'Isidore of Seville',
    dates: 'c. 560–636 CE',
    epithet: 'The Last Scholar of the Ancient World',
    contribution: 'Compiled the Etymologiae, the most influential encyclopedia of the Middle Ages.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Isidore_de_S%C3%A9ville.jpg',
    era: 'medieval' as const,
  },
  {
    name: 'Samuel Johnson',
    dates: '1709–1784',
    epithet: 'The First Great English Lexicographer',
    contribution: 'Published A Dictionary of the English Language (1755), setting the standard for 150 years.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Samuel_Johnson_by_Joshua_Reynolds.jpg',
    era: 'print' as const,
  },
  {
    name: 'Sir William Jones',
    dates: '1746–1794',
    epithet: 'Father of Comparative Linguistics',
    contribution: 'Proposed the Indo-European language family in his famous 1786 lecture.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Portrait_of_Sir_William_Jones_%284671559%29_%28cropped%29.jpg',
    era: 'victorian' as const,
  },
  {
    name: 'Jacob Grimm',
    dates: '1785–1863',
    epithet: 'The Fairy Tale Philologist',
    contribution: 'Formulated Grimm\'s Law (1822), proving sound change is regular and predictable.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Grimm.jpg',
    era: 'victorian' as const,
  },
  {
    name: 'Franz Bopp',
    dates: '1791–1867',
    epithet: 'The First Comparative Philologist',
    contribution: 'Systematically demonstrated the relationship between Sanskrit and European languages.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Franz_Bopp_-_Imagines_philologorum.jpg',
    era: 'victorian' as const,
  },
  {
    name: 'Noah Webster',
    dates: '1758–1843',
    epithet: 'The Schoolmaster of America',
    contribution: 'Published An American Dictionary of the English Language (1828), codifying American English.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Noah_Webster_pre-1843_IMG_4412.JPG',
    era: 'victorian' as const,
  },
  {
    name: 'Sir James Murray',
    dates: '1837–1915',
    epithet: 'The Man Who Built the OED',
    contribution: 'Primary editor of the Oxford English Dictionary for 36 years.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/James_Murray.jpg',
    era: 'victorian' as const,
  },
  {
    name: 'Walter Skeat',
    dates: '1835–1912',
    epithet: 'The Great English Etymologist',
    contribution: 'His Etymological Dictionary of the English Language was the standard reference for decades.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Portrait_of_Walter_William_Skeat.jpg',
    era: 'victorian' as const,
  },
];

const timeline = [
  { year: 'c. 360 BCE', event: "Plato's Cratylus debates word origins" },
  { year: 'c. 43 BCE', event: 'Varro completes De Lingua Latina' },
  { year: 'c. 630 CE', event: 'Isidore completes the Etymologiae' },
  { year: 'c. 1350–1400', event: 'Etymology first appears in English' },
  { year: '1755', event: 'Johnson publishes his Dictionary' },
  { year: '1786', event: 'Jones proposes Indo-European family' },
  { year: '1822', event: "Grimm formulates Grimm's Law" },
  { year: '1828', event: "Webster's American Dictionary" },
  { year: '1879', event: 'Murray becomes OED editor' },
  { year: '2001', event: 'Etymonline launches' },
];

export default function TheWordEtymologyClient() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);

      // Determine active section
      const sectionElements = containerRef.current.querySelectorAll('section');
      sectionElements.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="etymology-essay" ref={containerRef}>
      {/* Progress Bar */}
      <div className="progress-bar" aria-hidden="true">
        <div className="progress-track">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`progress-marker ${index <= activeSection ? 'active' : ''}`}
              style={{ top: `${(index / (sections.length - 1)) * 100}%` }}
              title={section.title}
            />
          ))}
          <div
            className="progress-fill"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="progress-root">ε</div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="section hero-section">
        <div className="hero-background">
          <div className="dust-particles" aria-hidden="true" />
        </div>
        <div className="hero-content">
          <div className="hero-greek" aria-label="Etymology in Greek">ΕΤΥΜΟΛΟΓΙΑ</div>
          <h1 className="hero-title">Etymology</h1>
          <p className="hero-subtitle">The Word That Dug Up Words</p>
          <p className="hero-tagline">A Biography of a Word That Studies Biographies of Words</p>
        </div>
        <div className="scroll-indicator" aria-hidden="true">
          <span>Scroll to explore</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* Section 1: The Word That Studies Words */}
      <section id="intro" className="section content-section era-ancient">
        <div className="section-content">
          <h2>The Word That Studies Words</h2>
          <div className="lead-text">
            <p>Every word you speak has a past.</p>
            <p>Some words traveled continents; others survived catastrophe. A few became fossils. But only one word was invented to ask: <em>Where did all these words come from?</em></p>
          </div>
          <p>That word is <strong>etymology</strong> — from the Greek for &ldquo;true sense.&rdquo; It&apos;s the biography of words, the archaeology of language, the discipline that treats dictionaries like crime scenes and traces meanings back through centuries of whispered change.</p>
          <p>This is its story. And it&apos;s older — and stranger — than you might expect.</p>

          <div className="fact-box">
            <h4>Key Facts</h4>
            <ul>
              <li>Derived from Greek: ἔτυμον (étymon, &ldquo;true sense&rdquo;) + -λογία (-logía, &ldquo;study of&rdquo;)</li>
              <li>First appears in English around 1350–1400 CE</li>
              <li>Cicero translated it into Latin as <em>veriloquium</em> (&ldquo;truth-speaking&rdquo;)</li>
              <li>Etymology ≠ definition: origins don&apos;t dictate current meaning</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2: Pronunciation */}
      <section id="pronunciation" className="section content-section era-ancient">
        <div className="section-content">
          <h2>Pronouncing the Mystery</h2>
          <div className="pronunciation-display">
            <div className="ipa">/ˌɛt.ɪˈmɒl.ə.dʒi/</div>
            <div className="phonetic">et-uh-MOL-uh-jee</div>
            <div className="syllables">Five syllables. Stress on the third.</div>
          </div>

          <p>Now the architecture. Every word is built from parts, and &ldquo;etymology&rdquo; wears its blueprint openly:</p>

          <div className="morpheme-breakdown">
            <div className="morpheme">
              <span className="greek">ἔτυμον</span>
              <span className="transliteration">étymon</span>
              <span className="meaning">&ldquo;true sense&rdquo; or &ldquo;original meaning&rdquo;</span>
            </div>
            <span className="plus">+</span>
            <div className="morpheme">
              <span className="greek">-λογία</span>
              <span className="transliteration">-logía</span>
              <span className="meaning">&ldquo;study of&rdquo;</span>
            </div>
            <span className="equals">=</span>
            <div className="morpheme result">
              <span className="meaning">&ldquo;the study of the true sense&rdquo;</span>
            </div>
          </div>

          <p>In ancient Greek, <em>étymos</em> meant &ldquo;true&rdquo; or &ldquo;real&rdquo; — but the noun form <em>étymon</em> came to mean something more specific: the genuine, uncorrupted essence of what a word <em>really</em> signifies.</p>

          <div className="fact-box">
            <h4>Key Facts</h4>
            <ul>
              <li>The Greek root <em>étymos</em> is related to <em>eteós</em> (&ldquo;true&rdquo;)</li>
              <li><em>Logos</em> has over 70 distinct meanings in Greek</li>
              <li>The -ology suffix appears in 400+ English words</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: Greek Roots */}
      <section id="greek-roots" className="section content-section era-ancient">
        <div className="section-content">
          <div className="section-marker">Ancient Athens, c. 360 BCE</div>
          <h2>The True Sense: Greek Roots</h2>

          <blockquote className="pull-quote">
            &ldquo;Words were thought to hold hidden truths — etymology was the art of uncovering them.&rdquo;
          </blockquote>

          <p>Around 360 BCE, in an Athenian dialogue called the <em>Cratylus</em>, Plato staged a debate that would echo for millennia: Do words have <em>natural</em> connections to their meanings, or are they just arbitrary conventions?</p>

          <p>The character Cratylus believed names revealed hidden truths. Hermogenes said they were mere social agreement. Socrates, characteristically, landed somewhere in between — and in doing so, performed a famous (and often absurd) <em>etymological survey</em>, dissecting dozens of Greek words to find what they &ldquo;truly&rdquo; meant.</p>

          <p>This is the conceptual cradle of &ldquo;etymology&rdquo;: the idea that beneath every word lies an <em>étymon</em> — a &ldquo;true sense&rdquo; waiting to be uncovered. The Greeks didn&apos;t yet use the compound noun <em>etymología</em> regularly, but the concept was born in these debates about language and truth.</p>

          <div className="figure-card">
            <div className="figure-image">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/88/Head_Platon_Glyptothek_Munich_548.jpg"
                alt="Portrait of Plato"
                loading="lazy"
              />
            </div>
            <div className="figure-info">
              <h4>Plato</h4>
              <p className="dates">c. 428–348 BCE</p>
              <p className="epithet">The Philosopher Who Asked About Words</p>
              <p>His dialogue <em>Cratylus</em> is the oldest surviving Western text devoted entirely to language philosophy.</p>
            </div>
          </div>

          <div className="fact-box">
            <h4>Key Facts</h4>
            <ul>
              <li>Plato&apos;s <em>Cratylus</em> (c. 360 BCE) is the oldest surviving Western text dedicated entirely to language philosophy</li>
              <li>Socrates&apos; etymological analyses in the <em>Cratylus</em> are often intentionally comic</li>
              <li>Greek philosophers debated: do words have &ldquo;natural&rdquo; or &ldquo;conventional&rdquo; meanings?</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 4: Roman Translation */}
      <section id="roman-translation" className="section content-section era-ancient">
        <div className="section-content">
          <div className="section-marker">Rome, 1st Century BCE</div>
          <h2>Romans Translate the Truth</h2>

          <blockquote className="pull-quote">
            &ldquo;To inherit an idea, you must name it in your own language.&rdquo;
          </blockquote>

          <p>The Romans inherited Greek intellectual culture, including its obsession with word-origins. But they needed Latin vocabulary for Greek concepts.</p>

          <p>Marcus Tullius Cicero, the great orator-philosopher, encountered <em>etymología</em> and created a Latin calque: <strong><em>veriloquium</em></strong> — literally &ldquo;truth-speaking,&rdquo; from <em>verus</em> (&ldquo;true&rdquo;) + <em>loquor</em> (&ldquo;I speak&rdquo;). It was a word-for-word translation of the Greek idea.</p>

          <p>But Cicero wasn&apos;t the only Roman thinking about language. His contemporary <strong>Varro</strong> (116–27 BCE) wrote <em>De Lingua Latina</em> (&ldquo;On the Latin Language&rdquo;) — the first large-scale linguistic analysis of Latin. Originally 25 books, only 6 survive today, including his ambitious attempt to trace the origins of Latin words.</p>

          <p>Varro&apos;s etymologies are often fanciful by modern standards — but his <em>method</em> mattered. He was trying to be systematic. He was treating language as something that could be <em>studied</em>, not just used.</p>

          <div className="figure-card">
            <div className="figure-image">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Bust_of_Cicero_%281st-cent._BC%29_-_Palazzo_Nuovo_-_Musei_Capitolini_-_Rome_2016.jpg"
                alt="Bust of Cicero"
                loading="lazy"
              />
            </div>
            <div className="figure-info">
              <h4>Marcus Tullius Cicero</h4>
              <p className="dates">106–43 BCE</p>
              <p className="epithet">The Orator Who Named Ideas</p>
              <p>Coined <em>veriloquium</em> as Latin translation of Greek <em>etymología</em>.</p>
            </div>
          </div>

          <div className="fact-box">
            <h4>Key Facts</h4>
            <ul>
              <li>Cicero coined <em>veriloquium</em> as a Latin translation of Greek <em>etymología</em></li>
              <li>Varro&apos;s <em>De Lingua Latina</em> (c. 43 BCE) devoted 6 books to etymology</li>
              <li>Varro identified Greek, Gaulish, and Etruscan layers in Latin vocabulary</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5: Medieval Encyclopedia */}
      <section id="medieval-encyclopedia" className="section content-section era-medieval">
        <div className="section-content">
          <div className="section-marker">Seville, c. 630 CE</div>
          <h2>The Medieval Encyclopedia</h2>

          <blockquote className="pull-quote">
            &ldquo;To save all knowledge, one man made etymology the key to everything.&rdquo;
          </blockquote>

          <p>In the early 7th century, as Roman learning was fading, one man tried to save everything.</p>

          <p><strong>Isidore of Seville</strong> (c. 560–636 CE) was a Spanish bishop who compiled the <em>Etymologiae</em> — a 20-book encyclopedia covering grammar, law, medicine, agriculture, architecture, warfare, the natural world, and more. It would become the most copied and consulted reference work of the Middle Ages.</p>

          <p>The title says it all: Isidore believed that understanding a word&apos;s <em>origin</em> was the key to understanding its <em>meaning</em>. He packed his encyclopedia with etymologies — some brilliant, many creative, and a few hilariously wrong. (He derived <em>baculus</em>, &ldquo;walking stick,&rdquo; from Bacchus, god of wine — because you need a stick to walk after drinking.)</p>

          <p>But accuracy wasn&apos;t the point. For Isidore, etymology was <em>theology</em>. Words held divine traces. Origins revealed God&apos;s design.</p>

          <p>For a thousand years, this was how Europe understood &ldquo;etymology.&rdquo;</p>

          <div className="figure-card">
            <div className="figure-image">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Isidore_de_S%C3%A9ville.jpg"
                alt="Isidore of Seville"
                loading="lazy"
              />
            </div>
            <div className="figure-info">
              <h4>Isidore of Seville</h4>
              <p className="dates">c. 560–636 CE</p>
              <p className="epithet">The Last Scholar of the Ancient World</p>
              <p>His <em>Etymologiae</em> was the most influential encyclopedia of the Middle Ages.</p>
            </div>
          </div>

          <div className="fact-box">
            <h4>Key Facts</h4>
            <ul>
              <li>The <em>Etymologiae</em> was written c. 615–636 CE</li>
              <li>20 books covering nearly all human knowledge</li>
              <li>Over 1,000 manuscript copies survive</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: English Arrival */}
      <section id="english-arrival" className="section content-section era-medieval">
        <div className="section-content">
          <div className="section-marker">England, c. 1350–1400</div>
          <h2>Earliest Sighting in English</h2>

          <blockquote className="pull-quote">
            &ldquo;A word lands softly in a new language, barely noticed at first.&rdquo;
          </blockquote>

          <p>Sometime in the late 1300s — scholars place it between 1350 and 1400 — the word <em>ethimolegia</em> first appears in English.</p>

          <p>It arrived via Old French (<em>etimologie</em>), which had borrowed it from Latin (<em>etymologia</em>), which had taken it from Greek (<em>etymología</em>). Four languages. Two thousand years. One idea.</p>

          <p>The Middle English spelling was wonderfully unstable: <em>ethimolegia</em>, <em>ethymologie</em>, <em>ethimologie</em>. The concept was still the same as Plato&apos;s — finding the &ldquo;true sense&rdquo; of words — but now it was available to English readers.</p>

          <p>This was the era of Chaucer, of the Black Death, of the Hundred Years&apos; War. English itself was in flux, absorbing French vocabulary wholesale. And in that churning moment, &ldquo;etymology&rdquo; quietly joined the lexicon.</p>

          <div className="spelling-evolution">
            <div className="spelling">ΕΤΥΜΟΛΟΓΙΑ</div>
            <div className="arrow">→</div>
            <div className="spelling">etymologia</div>
            <div className="arrow">→</div>
            <div className="spelling">etimologie</div>
            <div className="arrow">→</div>
            <div className="spelling">ethimolegia</div>
            <div className="arrow">→</div>
            <div className="spelling current">etymology</div>
          </div>

          <div className="fact-box">
            <h4>Key Facts</h4>
            <ul>
              <li>First English attestation: c. 1350–1400 CE</li>
              <li>Borrowed from Old French <em>etimologie</em> (14th century)</li>
              <li>By the mid-1400s, meaning shifted toward &ldquo;the history of a word&rdquo;</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 7: Meaning Drifts */}
      <section id="meaning-drifts" className="section content-section era-print">
        <div className="section-content">
          <h2>Meaning Drifts: From Truth to History</h2>

          <blockquote className="pull-quote">
            &ldquo;The word that tracks change has itself changed.&rdquo;
          </blockquote>

          <p>Meanings change. That&apos;s the first lesson etymology teaches — and &ldquo;etymology&rdquo; itself is Exhibit A.</p>

          <p>In ancient Greek, the emphasis was on <em>truth</em>: an <em>étymon</em> was the <em>true sense</em> of a word, its hidden essence. For Plato and the Stoics, etymology was almost mystical — a way to access reality through language.</p>

          <p>By the Roman period, it was becoming more analytical: Varro&apos;s etymologies were attempts to explain Latin through historical layers.</p>

          <p>In the medieval era, it was theological: origins revealed divine design.</p>

          <p>Then came the Enlightenment and the 19th century — and &ldquo;etymology&rdquo; finally landed where we know it today: the <em>historical study</em> of word origins and development. Not truth-seeking. Not theology. Just careful, comparative, evidence-based tracing of how words changed over time.</p>

          <div className="timeline-mini">
            <h4>Definition Snapshots</h4>
            <div className="timeline-item">
              <span className="year">~360 BCE</span>
              <span className="definition">étymon = &ldquo;true sense&rdquo; (philosophical)</span>
            </div>
            <div className="timeline-item">
              <span className="year">~630 CE</span>
              <span className="definition">Etymology = divine key to meaning (theological)</span>
            </div>
            <div className="timeline-item">
              <span className="year">~1755</span>
              <span className="definition">Etymology = tracing word origins (Johnson&apos;s Dictionary)</span>
            </div>
            <div className="timeline-item">
              <span className="year">~1880s</span>
              <span className="definition">Etymology = rigorous comparative linguistics (OED era)</span>
            </div>
            <div className="timeline-item">
              <span className="year">~2001</span>
              <span className="definition">Etymology = accessible online research (Etymonline)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Etymology Fallacy */}
      <section id="etymology-fallacy" className="section content-section era-victorian">
        <div className="section-content">
          <h2>The Etymology Fallacy</h2>

          <blockquote className="pull-quote">
            &ldquo;Knowing where a word came from doesn&apos;t tell you where it must go.&rdquo;
          </blockquote>

          <p>Here&apos;s the trap: if you know a word&apos;s origin, you might think you&apos;ve found its &ldquo;real&rdquo; meaning.</p>

          <p>This is the <strong>etymological fallacy</strong> — the mistaken belief that a word&apos;s historical origin determines (or should determine) its current meaning.</p>

          <div className="comparison-grid">
            <div className="comparison-card">
              <h4>NICE</h4>
              <div className="before">
                <span className="label">13th century:</span>
                <span className="meaning">&ldquo;foolish&rdquo; or &ldquo;stupid&rdquo;</span>
              </div>
              <div className="after">
                <span className="label">Today:</span>
                <span className="meaning">&ldquo;pleasant&rdquo;</span>
              </div>
            </div>
            <div className="comparison-card">
              <h4>DECIMATE</h4>
              <div className="before">
                <span className="label">Latin:</span>
                <span className="meaning">&ldquo;kill every tenth soldier&rdquo;</span>
              </div>
              <div className="after">
                <span className="label">Today:</span>
                <span className="meaning">&ldquo;destroy a large portion&rdquo;</span>
              </div>
            </div>
            <div className="comparison-card">
              <h4>VILLAIN</h4>
              <div className="before">
                <span className="label">Medieval:</span>
                <span className="meaning">&ldquo;farm laborer&rdquo;</span>
              </div>
              <div className="after">
                <span className="label">Today:</span>
                <span className="meaning">&ldquo;evil person&rdquo;</span>
              </div>
            </div>
          </div>

          <p>Etymology is a map, not a rulebook. It shows you where words traveled — but not where they must stay. Meanings evolve. That&apos;s what living languages do.</p>

          <div className="fact-box warning">
            <h4>The Key Insight</h4>
            <p><strong>Usage defines meaning; etymology provides history.</strong></p>
            <p>The pedant who insists &ldquo;decimate&rdquo; must mean exactly 10% is... wrong.</p>
          </div>
        </div>
      </section>

      {/* Section 9: Dictionary Engine */}
      <section id="dictionary-engine" className="section content-section era-victorian">
        <div className="section-content">
          <div className="section-marker">London, 1755 and 1879</div>
          <h2>The Dictionary Engine</h2>

          <blockquote className="pull-quote">
            &ldquo;Words leave paper trails — and some people spend their lives following them.&rdquo;
          </blockquote>

          <p>In 1755, <strong>Samuel Johnson</strong> published <em>A Dictionary of the English Language</em> — the first great dictionary of English. He worked alone for seven years, defining 42,773 words and illustrating them with 114,000 literary quotations. His etymologies were informed guesses, not scientific analyses — but his format revolutionized lexicography.</p>

          <p>A century later, the <strong>Oxford English Dictionary</strong> would take Johnson&apos;s vision to industrial scale.</p>

          <p><strong>James Murray</strong>, a self-educated Scotsman who &ldquo;was captivated by words and strange languages,&rdquo; became editor in 1879. He built a corrugated-iron shed called the <strong>Scriptorium</strong> and filled it with pigeonhole racks to hold citation slips — paper cards on which volunteers recorded word usages from historical texts. Eventually, 3.5 million slips arrived from around the English-speaking world.</p>

          <p>The OED tracked not just definitions but <em>histories</em>: how meanings evolved over time. Etymology became a science of evidence.</p>

          <div className="figure-card">
            <div className="figure-image">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/40/James_Murray.jpg"
                alt="Sir James Murray"
                loading="lazy"
              />
            </div>
            <div className="figure-info">
              <h4>Sir James Murray</h4>
              <p className="dates">1837–1915</p>
              <p className="epithet">The Man Who Built the OED</p>
              <p>Personally edited entries for A–D, H–K, O–P, and T — more than half the English vocabulary.</p>
            </div>
          </div>

          <div className="fact-box">
            <h4>Key Facts</h4>
            <ul>
              <li>Johnson&apos;s <em>Dictionary</em> (1755): 42,773 words, single-handed</li>
              <li>OED (1884–1928): 414,825 words, 1.8 million citations</li>
              <li>The Scriptorium held 1,000 pigeonholes for citation slips</li>
              <li>Johnson famously defined &ldquo;lexicographer&rdquo; as &ldquo;a harmless drudge&rdquo;</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 10: Sound Shifts */}
      <section id="sound-shifts" className="section content-section era-victorian">
        <div className="section-content">
          <div className="section-marker">Europe, 1786–1870</div>
          <h2>Sound Shifts: The Scientific Revolution</h2>

          <blockquote className="pull-quote">
            &ldquo;Sound changes are regular — which means we can work backwards.&rdquo;
          </blockquote>

          <p>In 1786, <strong>Sir William Jones</strong> stood before the Asiatic Society of Bengal and made a revolutionary observation: Sanskrit, Greek, and Latin were too structurally similar to be coincidence. They must share a common ancestor.</p>

          <p>This sparked comparative linguistics — and transformed etymology from guesswork into science.</p>

          <p><strong>Franz Bopp</strong> (1816) proved Jones&apos;s hunch by systematically comparing verb conjugations across languages. <strong>Rasmus Rask</strong> (1818) discovered consonant correspondences. And <strong>Jacob Grimm</strong> (yes, the fairy-tale Grimm) formulated <strong>Grimm&apos;s Law</strong> (1822): a set of regular sound shifts explaining why Latin <em>pater</em> became English <em>father</em>, why Greek <em>kardia</em> became English <em>heart</em>.</p>

          <p>Suddenly, etymologies weren&apos;t just stories — they were <em>predictable</em>. If sound changes were regular, you could reconstruct words that were never written down.</p>

          <p>Etymology became archaeology. The shovel was sound.</p>

          <div className="grimms-law">
            <h4>Grimm&apos;s Law: Consonant Shifts</h4>
            <div className="shift-examples">
              <div className="shift">
                <span className="original">P</span>
                <span className="arrow">→</span>
                <span className="result">F</span>
                <span className="example">pater → father</span>
              </div>
              <div className="shift">
                <span className="original">T</span>
                <span className="arrow">→</span>
                <span className="result">Þ (th)</span>
                <span className="example">tres → three</span>
              </div>
              <div className="shift">
                <span className="original">K</span>
                <span className="arrow">→</span>
                <span className="result">H</span>
                <span className="example">kardia → heart</span>
              </div>
            </div>
          </div>

          <div className="fact-box">
            <h4>Key Facts</h4>
            <ul>
              <li>1786: William Jones proposes Indo-European language family</li>
              <li>1816: Franz Bopp&apos;s comparative grammar of Sanskrit, Greek, Latin</li>
              <li>1822: Jacob Grimm publishes Grimm&apos;s Law (systematic sound shifts)</li>
              <li>August Schleicher (1863): first language family tree (Stammbaum)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 11: America Adopts */}
      <section id="america-adopts" className="section content-section era-victorian">
        <div className="section-content">
          <div className="section-marker">United States, 1783–1900</div>
          <h2>America Adopts the Word</h2>

          <blockquote className="pull-quote">
            &ldquo;A new nation needed its own dictionary — and its own relationship with word origins.&rdquo;
          </blockquote>

          <p>When <strong>Noah Webster</strong> published his <em>American Dictionary of the English Language</em> in 1828, he wasn&apos;t just listing words — he was building a nation.</p>

          <p>Webster believed Americans needed their own linguistic identity. He simplified spellings (<em>colour</em> → <em>color</em>, <em>centre</em> → <em>center</em>) and included distinctly American words. His etymologies were ambitious: he studied over 20 languages to trace word origins.</p>

          <p>Meanwhile, the study of language was professionalizing. In 1869, <strong>William Dwight Whitney</strong> founded the <strong>American Philological Association</strong> at Yale, institutionalizing the study of etymology, grammar, and linguistic history in American universities.</p>

          <p>By the late 1800s, &ldquo;etymology&rdquo; was standard vocabulary in American education. Schoolchildren learned Latin and Greek roots. Spelling bees tested word derivations. Etymology wasn&apos;t just for scholars — it was for citizens.</p>

          <div className="fact-box">
            <h4>Key Facts</h4>
            <ul>
              <li>1783: Webster&apos;s &ldquo;Blue-Backed Speller&rdquo; published (sold 100 million copies)</li>
              <li>1828: <em>An American Dictionary of the English Language</em> (70,000 entries)</li>
              <li>1869: American Philological Association founded</li>
              <li>Webster studied 26 languages for his etymological work</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 12: Global Spread */}
      <section id="global-spread" className="section content-section era-victorian">
        <div className="section-content">
          <h2>The Global Spread</h2>

          <blockquote className="pull-quote">
            &ldquo;The word &lsquo;etymology&rsquo; is remarkably stable across languages — because they all borrowed from the same source.&rdquo;
          </blockquote>

          <div className="language-grid">
            <div className="language-item">
              <span className="lang">French</span>
              <span className="word">étymologie</span>
            </div>
            <div className="language-item">
              <span className="lang">German</span>
              <span className="word">Etymologie</span>
            </div>
            <div className="language-item">
              <span className="lang">Spanish</span>
              <span className="word">etimología</span>
            </div>
            <div className="language-item">
              <span className="lang">Italian</span>
              <span className="word">etimologia</span>
            </div>
            <div className="language-item">
              <span className="lang">Russian</span>
              <span className="word">этимология</span>
            </div>
            <div className="language-item">
              <span className="lang">Portuguese</span>
              <span className="word">etimologia</span>
            </div>
          </div>

          <p>All traceable to Latin <em>etymologia</em>, itself from Greek <em>etymología</em>.</p>

          <p>But etymology as a <em>discipline</em> developed unevenly. German philologists dominated the 19th century — Grimm, Bopp, Schleicher, and the <em>Neogrammarians</em> (who argued that sound laws have no exceptions). French and English lexicographers produced major dictionaries. Russian and other traditions developed their own scholarly lineages.</p>

          <p>Today, every major language has etymological dictionaries — and the comparative method developed in 19th-century Europe has been applied to language families worldwide, from Bantu to Austronesian to Sino-Tibetan.</p>

          <div className="fact-box">
            <h4>Key Facts</h4>
            <ul>
              <li>The word &ldquo;etymology&rdquo; is nearly identical in Romance, Germanic, and Slavic languages</li>
              <li>Indo-European is just one of ~400 language families worldwide</li>
              <li>Major etymological dictionaries: OED (English), TLFi (French), DWDS (German), DRAE (Spanish)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 13: Key Figures Gallery */}
      <section id="key-figures" className="section content-section era-victorian">
        <div className="section-content">
          <h2>Key Figures Gallery</h2>
          <p className="section-intro">10 Portraits Across 2,500 Years</p>

          <div className="figures-gallery">
            {keyFigures.map((figure, index) => (
              <div key={index} className={`figure-card gallery-card era-${figure.era}`}>
                <div className={`figure-image ${!figure.imageUrl ? 'placeholder' : ''}`}>
                  {figure.imageUrl ? (
                    <img
                      src={figure.imageUrl}
                      alt={`Portrait of ${figure.name}`}
                      loading="lazy"
                    />
                  ) : (
                    <span>{'note' in figure ? figure.note : 'No portrait available'}</span>
                  )}
                </div>
                <div className="figure-info">
                  <h4>{figure.name}</h4>
                  <p className="dates">{figure.dates}</p>
                  <p className="epithet">{figure.epithet}</p>
                  <p>{figure.contribution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 14: Tools of the Trade */}
      <section id="tools" className="section content-section era-digital">
        <div className="section-content">
          <h2>Tools of the Trade</h2>

          <blockquote className="pull-quote">
            &ldquo;The tools changed; the curiosity didn&apos;t.&rdquo;
          </blockquote>

          <div className="tools-timeline">
            <div className="tool-era">
              <h4>Ancient</h4>
              <p>Papyrus, stylus, memory. Scholars like Varro worked from personal libraries and oral tradition.</p>
            </div>
            <div className="tool-era">
              <h4>Medieval</h4>
              <p>Scriptoria where monks copied manuscripts by candlelight. Isidore&apos;s <em>Etymologiae</em> was hand-copied over 1,000 times.</p>
            </div>
            <div className="tool-era">
              <h4>Print Era</h4>
              <p>Movable type made dictionaries distributable. Johnson worked with printed books; Murray with a flood of handwritten citation slips.</p>
            </div>
            <div className="tool-era">
              <h4>Card-Catalog Era</h4>
              <p>The OED&apos;s Scriptorium — a filing system as massive as the language itself.</p>
            </div>
            <div className="tool-era">
              <h4>Digital Era</h4>
              <p>Searchable corpora, OCR, and databases. The Online Etymology Dictionary (2001) made word origins accessible to anyone with an internet connection.</p>
            </div>
          </div>

          <div className="fact-box">
            <h4>Key Facts</h4>
            <ul>
              <li>The OED&apos;s original Scriptorium held 3.5 million citation slips</li>
              <li>Google Books Ngram Viewer covers 1500–2019</li>
              <li>COCA (Corpus of Contemporary American English): 1 billion words</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 15: Digital Age */}
      <section id="digital-age" className="section content-section era-digital">
        <div className="section-content">
          <h2>Etymology in the Digital Age</h2>

          <blockquote className="pull-quote">
            &ldquo;The internet democratized etymology — and also weaponized folk etymology.&rdquo;
          </blockquote>

          <p>In 2001, a historian named <strong>Douglas Harper</strong> launched the <strong>Online Etymology Dictionary</strong> (Etymonline) — a free, searchable database of word origins compiled from major scholarly sources.</p>

          <p>Today, it&apos;s one of the most-visited etymology resources in the world. Harper, a Civil War historian and newspaper editor, considers himself &ldquo;essentially and for the most part a compiler&rdquo; — but his site has democratized access to linguistic history.</p>

          <p>The internet also brought <strong>folk etymology</strong> to mass scale. Viral posts claim &ldquo;posh&rdquo; stands for &ldquo;Port Out, Starboard Home&rdquo; (it doesn&apos;t) or that &ldquo;OK&rdquo; comes from a misspelling (debated). Etymology has become content — and myth-busting has become a genre.</p>

          <p>The good news: reliable information is more accessible than ever. The bad news: so is nonsense. The eternal lesson: <strong>check your sources</strong>.</p>

          <div className="myth-busting">
            <h4>Folk Etymology vs. Reality</h4>
            <div className="myth">
              <span className="claim">MYTH: &ldquo;Posh&rdquo; = Port Out, Starboard Home</span>
              <span className="reality">REALITY: Likely from Romani <em>posh</em> (&ldquo;half&rdquo;)</span>
            </div>
            <div className="myth">
              <span className="claim">MYTH: &ldquo;Golf&rdquo; = Gentlemen Only, Ladies Forbidden</span>
              <span className="reality">REALITY: Scottish, probably from Dutch <em>kolf</em> (&ldquo;club&rdquo;)</span>
            </div>
          </div>

          <div className="fact-box">
            <h4>Key Facts</h4>
            <ul>
              <li>Etymonline launched in 2001; over 50,000 entries today</li>
              <li>Harper draws on OED, Barnhart, Klein, and other major dictionaries</li>
              <li>Folk etymology: false origins that spread virally</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 16: The Invitation */}
      <section id="invitation" className="section content-section era-digital invitation-section">
        <div className="section-content">
          <h2>The Invitation</h2>

          <div className="closing-meditation">
            <p className="lead">Every word you speak has a biography.</p>

            <p>The words for <em>father</em> and <em>mother</em> are thousands of years old. The words for <em>computer</em> and <em>blog</em> were invented in living memory. Some words traveled from India to Ireland; others crossed from Arabic to Spanish to English. Some died out and were resurrected by scholars. Some are wearing disguises.</p>

            <p>Etymology is the art of noticing. It doesn&apos;t tell you what words <em>should</em> mean — only where they&apos;ve been. It&apos;s a map of human contact, migration, conquest, trade, and thought.</p>

            <p className="cta">The next time you use a word, consider: <em>where did this come from?</em></p>

            <p className="finale">You&apos;ll be joining a conversation that started 2,500 years ago.</p>
          </div>

          <div className="word-morphing" aria-hidden="true">
            <span className="morph-word">ΕΤΥΜΟΛΟΓΙΑ</span>
            <span className="morph-word">etymologia</span>
            <span className="morph-word">ethimologie</span>
            <span className="morph-word">etymology</span>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="section timeline-section">
        <div className="section-content">
          <h2>Timeline: 2,500 Years of Etymology</h2>

          <div className="timeline">
            {timeline.map((item, index) => (
              <div key={index} className="timeline-event">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-content">{item.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sources Section */}
      <section id="sources" className="section sources-section">
        <div className="section-content">
          <h2>Sources & Further Reading</h2>

          <div className="sources-grid">
            <div className="source-category">
              <h4>Primary References</h4>
              <ul>
                <li><a href="https://www.etymonline.com/word/etymology" target="_blank" rel="noopener noreferrer">Online Etymology Dictionary — Etymology entry</a></li>
                <li><a href="https://www.merriam-webster.com/dictionary/etymology" target="_blank" rel="noopener noreferrer">Merriam-Webster — Etymology</a></li>
                <li><a href="https://plato.stanford.edu/entries/plato-cratylus/" target="_blank" rel="noopener noreferrer">Stanford Encyclopedia of Philosophy — Plato&apos;s Cratylus</a></li>
              </ul>
            </div>

            <div className="source-category">
              <h4>Historical Sources</h4>
              <ul>
                <li><a href="https://www.britannica.com/biography/James-Murray" target="_blank" rel="noopener noreferrer">Britannica — James Murray</a></li>
                <li><a href="https://www.britannica.com/topic/Grimms-law" target="_blank" rel="noopener noreferrer">Britannica — Grimm&apos;s Law</a></li>
                <li><a href="https://en.wikipedia.org/wiki/Etymologiae" target="_blank" rel="noopener noreferrer">Wikipedia — Etymologiae</a></li>
              </ul>
            </div>

            <div className="source-category">
              <h4>Academic Works</h4>
              <ul>
                <li><a href="https://www.cambridge.org/core/books/etymologies-of-isidore-of-seville/F2336BA779D4ED95E6D25AAE2CCBAD25" target="_blank" rel="noopener noreferrer">Cambridge University Press — The Etymologies of Isidore of Seville</a></li>
                <li><a href="https://blog.philsoc.org.uk/2016/12/03/varros-de-lingua-latina-on-the-latin-language/" target="_blank" rel="noopener noreferrer">Philological Society — Varro&apos;s De Lingua Latina</a></li>
              </ul>
            </div>

            <div className="source-category">
              <h4>Image Sources</h4>
              <ul>
                <li>Wikimedia Commons — Public Domain portraits and manuscripts</li>
                <li>British Library Digitized Manuscripts</li>
                <li>Library of Congress</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="essay-footer">
        <p>A visual essay by <a href="https://esy.com">Esy</a></p>
        <p className="footer-note">Every word has a story. This was the story of the word that tells those stories.</p>
      </footer>
    </div>
  );
}
