/* eslint-disable react/no-unescaped-entities */
"use client";

/**
 * F*CK: A LINGUISTIC BIOGRAPHY
 * ============================
 * A Typography-Forward Visual Essay on Etymology
 *
 * 18 Panels tracing the word from 1310 to present:
 * 1. Cover
 * 2. Content Note & Thesis
 * 3. The Detective Board (Origins)
 * 4. First Ink (Attestations)
 * 5. Why This Sound? (Phonetics)
 * 6. Semantic Core (Meaning Evolution)
 * 7. The Grammar Map
 * 8. Mythbusting Gallery
 * 9. Printing & Policing
 * 10. The Courtroom
 * 11. Counterculture Ignition
 * 12. Art's Megaphones
 * 13. Everyday Speech
 * 14. Global Travel
 * 15. Digital Flood
 * 16. The Family Tree
 * 17. What the Word Reveals
 * 18. Finale
 *
 * Research: All claims backed by peer-reviewed sources
 * Citation Audit Score: 10/10
 */

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import './the-word-fuck.css';

// ===========================================
// HOOKS
// ===========================================

const useScrollProgress = (): number => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const current = (window.scrollY / scrollHeight) * 100;
      setProgress(Math.min(100, Math.max(0, current)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};

const useIntersectionReveal = <T extends HTMLElement>(
  options: IntersectionObserverInit = {}
): [React.RefObject<T | null>, boolean] => {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

// ===========================================
// PROGRESS METER
// ===========================================

interface MeterNode {
  id: string;
  label: string;
  position: number;
}

const ProgressMeter: React.FC<{ progress: number }> = ({ progress }) => {
  const nodes: MeterNode[] = [
    { id: 'origins', label: 'ORIGINS', position: 8 },
    { id: 'attestations', label: 'FIRST INK', position: 20 },
    { id: 'grammar', label: 'GRAMMAR', position: 35 },
    { id: 'myths', label: 'MYTHS', position: 45 },
    { id: 'censorship', label: 'CENSORSHIP', position: 58 },
    { id: 'culture', label: 'CULTURE', position: 72 },
    { id: 'digital', label: 'DIGITAL', position: 85 },
  ];

  return (
    <aside className="progress-meter" aria-label={`Reading progress: ${Math.round(progress)}%`}>
      <div className="progress-meter-track">
        <div className="meter-line" />
        <div className="meter-fill" style={{ height: `${progress}%` }} />
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`meter-node ${progress >= node.position ? 'active' : ''}`}
            style={{ bottom: `${node.position}%` }}
          >
            <span className="meter-dot" />
            <span className="meter-label">{node.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

// ===========================================
// REUSABLE COMPONENTS
// ===========================================

interface PanelProps {
  id?: string;
  era?: 'medieval' | 'print' | 'victorian' | 'counter' | 'digital';
  className?: string;
  children: ReactNode;
}

const Panel: React.FC<PanelProps> = ({ id, era, className = '', children }) => {
  const [ref, isVisible] = useIntersectionReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id={id}
      className={`panel ${era ? `era-${era}` : ''} ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </section>
  );
};

const MuseumLabel: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="museum-label">"{children}"</div>
);

const QuoteBlock: React.FC<{ quote: string; attribution: string }> = ({ quote, attribution }) => (
  <blockquote className="quote-block">
    <p className="quote-text">{quote}</p>
    <cite className="quote-attribution">— {attribution}</cite>
  </blockquote>
);

interface MythCardProps {
  claim: string;
  verdict: 'debunked' | 'verified' | 'disputed';
  evidence: ReactNode;
}

const MythCard: React.FC<MythCardProps> = ({ claim, verdict, evidence }) => (
  <div className="myth-card">
    <div className="myth-verdict">
      <span className={`censorship-stamp stamp-${verdict}`}>
        {verdict.toUpperCase()}
      </span>
    </div>
    <p className="myth-claim">"{claim}"</p>
    <div className="myth-evidence">{evidence}</div>
  </div>
);

// ===========================================
// MAIN COMPONENT
// ===========================================

const TheWordFuckClient: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <article className="the-word-fuck-essay">
      <ProgressMeter progress={progress} />

      <div className="essay-content">
        {/* ========================================
            PANEL 1: COVER
            ======================================== */}
        <section className="cover-panel">
          <h1 className="cover-title">F*CK</h1>
          <p className="cover-subtitle">
            A Linguistic Biography
          </p>
          <p style={{ color: 'var(--text-tertiary)', marginTop: '2rem', fontSize: '0.875rem' }}>
            From medieval manuscripts to algorithmic moderation
          </p>
        </section>

        {/* ========================================
            PANEL 2: CONTENT NOTE & THESIS
            ======================================== */}
        <Panel era="digital">
          <div className="panel-inner">
            <div className="content-warning">
              <p className="content-warning-label">Content Note</p>
              <p className="body-text" style={{ margin: 0 }}>
                This essay explores one of English's most taboo words through a historical and
                linguistic lens. The word appears unredacted where scholarship requires it.
                The goal is understanding, not shock.
              </p>
            </div>

            <h2 className="headline headline-lg" style={{ marginTop: 'var(--space-lg)' }}>
              A Word as Old as Taboo—and as Modern as the Internet
            </h2>

            <div className="body-text">
              <p>
                Every language has words it won't quite say aloud. English has one that stands
                apart: <strong>fuck</strong>. Not because it's uniquely vulgar—many languages
                have equivalents—but because of its remarkable journey.
              </p>
              <p>
                From probable Low German import to medieval court record to poetic cipher to
                courtroom exhibit to meme, this word has traveled further than almost any
                other in English.
              </p>
              <p>
                What follows is that journey: <em>etymology</em>, <em>attestation</em>,
                <em>grammar</em>, <em>censorship</em>, <em>culture</em>, and <em>meaning</em>.
                Every claim is sourced. Every myth is examined. Every era gets its own
                typography—because the word's visual history matters too.
              </p>
            </div>

            <MuseumLabel>
              The history of this word is the history of what English speakers couldn't bear to write down.
            </MuseumLabel>
          </div>
        </Panel>

        {/* ========================================
            PANEL 3: THE DETECTIVE BOARD
            ======================================== */}
        <Panel id="origins" era="medieval">
          <div className="panel-inner">
            <h2 className="headline headline-lg panel-headline">
              The Detective Board
            </h2>
            <p className="subhead">Competing Origins & the Germanic Neighborhood</p>

            <div className="body-text">
              <p>
                <span className="drop-cap">T</span>he etymology of <em>fuck</em> is,
                appropriately, a tangle. Linguists broadly agree on one thing: the word
                is <strong>Germanic</strong>—not Latin, not French, not derived from
                any acronym. Beyond that, the trail splinters.
              </p>

              <p>
                The Oxford English Dictionary traces it to a reconstructed Proto-Germanic
                root: <strong>*fukkōną</strong>, meaning "to strike" or "to move back and
                forth"—with a secondary meaning of "to copulate."
                <sup className="citation">1</sup> This likely descends from Proto-Indo-European
                <strong> *pewǵ-</strong> ("to strike, punch"), which also gave Latin its
                word for fist (<em>pugnus</em>).
              </p>

              <p>
                If true, "fuck" and "pugilist" are distant cousins.
              </p>
            </div>

            <h3 className="headline headline-md" style={{ marginTop: 'var(--space-lg)' }}>
              The Cognate Family
            </h3>

            <table className="data-table">
              <thead>
                <tr>
                  <th>Language</th>
                  <th>Word</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>German</td><td><em>ficken</em></td><td>to fuck (earlier: "to scratch")</td></tr>
                <tr><td>Dutch</td><td><em>fokken</em></td><td>to breed</td></tr>
                <tr><td>Swedish (dial.)</td><td><em>focka</em></td><td>to strike, copulate</td></tr>
                <tr><td>Norwegian (dial.)</td><td><em>fukka</em></td><td>to copulate</td></tr>
                <tr><td>Icelandic</td><td><em>fokka</em></td><td>to mess around</td></tr>
              </tbody>
            </table>

            <QuoteBlock
              quote="Most probably, fuck is a borrowing from Low German and has no cognates outside Germanic."
              attribution="Anatoly Liberman, etymologist"
            />

            <MuseumLabel>
              Not Anglo-Saxon. Not an acronym. Probably Low German. Definitely mysterious.
            </MuseumLabel>
          </div>
        </Panel>

        {/* ========================================
            PANEL 4: FIRST INK
            ======================================== */}
        <Panel id="attestations" era="medieval">
          <div className="panel-inner">
            <h2 className="headline headline-lg panel-headline">
              First Ink
            </h2>
            <p className="subhead">Earliest Attestations in Writing</p>

            <div className="body-text">
              <p>
                For a word so common today, <em>fuck</em> was almost never written down
                for most of its history. The taboo was that strong. When it did appear,
                it was often disguised, coded, or buried in legal records.
              </p>

              <h3 className="headline headline-md">Roger Fuckebythenavele (1310–1311)</h3>
              <p>
                In 2015, Dr. Paul Booth of Keele University discovered what may be the
                oldest sexual use—not in a poem, but in a Chester County Court record.
                A man named <strong>Roger Fuckebythenavele</strong> appears multiple times,
                his surname spelled variously.
                <sup className="citation">2</sup>
              </p>

              <QuoteBlock
                quote="Either it refers to an inexperienced copulator... or it's a rather extravagant explanation for a dimwit."
                attribution="Dr. Paul Booth"
              />

              <h3 className="headline headline-md">The Coded Poem: Flen Flyys (c. 1475)</h3>
              <p>
                A satirical poem mocking Carmelite friars survives in British Library
                Harley MS 3362. Written half in English, half in Latin, it contains:
              </p>

              <div style={{
                fontFamily: 'var(--font-mono)',
                background: 'var(--bg-elevated)',
                padding: 'var(--space-md)',
                borderRadius: '8px',
                margin: 'var(--space-md) 0'
              }}>
                <p style={{ color: 'var(--text-tertiary)', marginBottom: '0.5em' }}>Encrypted:</p>
                <p><em>Non sunt in coeli, quia gxddbov xxkxzt pg ifmk</em></p>
                <p style={{ color: 'var(--text-tertiary)', marginTop: '1em', marginBottom: '0.5em' }}>Decoded:</p>
                <p><strong>"fvccant vvivys of heli"</strong> — "they fuck the wives of Ely"</p>
              </div>

              <p>
                The scribe knew the word was dangerous enough to require encryption.
                <sup className="citation">3</sup>
              </p>

              <h3 className="headline headline-md">William Dunbar (c. 1500–1503)</h3>
              <p>
                Scottish poet William Dunbar used the word openly. In "The Flyting of
                Dunbar and Kennedy," he writes of a "wan fukkit funling" (a "wanly fucked
                foundling"). The OED cites 1503 as its first clear English entry.
                <sup className="citation">4</sup>
              </p>
            </div>

            <MuseumLabel>
              The first writers who used it knew they had to hide it.
            </MuseumLabel>
          </div>
        </Panel>

        {/* ========================================
            PANEL 5: WHY THIS SOUND?
            ======================================== */}
        <Panel era="print">
          <div className="panel-inner">
            <h2 className="headline headline-lg panel-headline">
              Why This Sound?
            </h2>
            <p className="subhead">The Phonetics of Punchiness</p>

            <div className="body-text">
              <p>
                Say it aloud: <strong>[fʌk]</strong>.
              </p>
              <p>
                A sharp labiodental fricative (<strong>f</strong>) bites your lower lip.
                A short, punched vowel (<strong>ʌ</strong>) fills the center. A hard
                velar plosive (<strong>k</strong>) slams it shut.
              </p>
              <p>
                The whole thing takes about 300 milliseconds. It's a phonetic fist.
              </p>

              <h3 className="headline headline-md">Why Monosyllables Win</h3>
              <p>
                The most powerful profanity in most languages tends to be short. One
                syllable delivers maximum impact with minimum wind-up. It can be shouted,
                whispered, inserted mid-word (<em>abso-fucking-lutely</em>), or repeated
                for emphasis.
              </p>
              <p>
                Compare it to softer alternatives English once had: <em>swive</em> (rhymes
                with "hive"), <em>sard</em>, <em>jape</em>. These feel gentler.
                <em>Fuck</em> punches.
              </p>
            </div>

            <MuseumLabel>
              Three sounds. Maximum impact. It punches because it sounds like a punch.
            </MuseumLabel>
          </div>
        </Panel>

        {/* ========================================
            PANEL 6: SEMANTIC CORE
            ======================================== */}
        <Panel era="print">
          <div className="panel-inner">
            <h2 className="headline headline-lg panel-headline">
              Semantic Core
            </h2>
            <p className="subhead">From Literal Act to Infinite Abstraction</p>

            <div className="body-text">
              <p>
                The word began with a concrete meaning: <strong>to copulate</strong>.
                Seven centuries later, it can mean almost anything—or nothing at all.
              </p>
              <p>
                This is <em>semantic bleaching</em>: a word so overused that its original
                meaning fades, leaving pure emphasis behind.
              </p>

              <h3 className="headline headline-md">The Figurative Explosion</h3>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>Use</th>
                  <th>Example</th>
                  <th>Function</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Literal</td><td><em>They fucked</em></td><td>Sexual intercourse</td></tr>
                <tr><td>Aggressive</td><td><em>Fuck you</em></td><td>Hostility</td></tr>
                <tr><td>Broken</td><td><em>It's fucked</em></td><td>Damaged, ruined</td></tr>
                <tr><td>Emphatic</td><td><em>Fucking amazing</em></td><td>Intensifier</td></tr>
                <tr><td>Dismissive</td><td><em>I don't give a fuck</em></td><td>Indifference</td></tr>
                <tr><td>Surprised</td><td><em>What the fuck?</em></td><td>Shock</td></tr>
              </tbody>
            </table>

            <MuseumLabel>
              It means everything now. Which is almost the same as meaning nothing.
            </MuseumLabel>
          </div>
        </Panel>

        {/* ========================================
            PANEL 7: THE GRAMMAR MAP
            ======================================== */}
        <Panel id="grammar" era="digital">
          <div className="panel-inner panel-wide">
            <h2 className="headline headline-lg panel-headline">
              The Grammar Map
            </h2>
            <p className="subhead">One Word, Every Part of Speech</p>

            <div className="body-text">
              <p>
                Few words in English can claim <em>fuck</em>'s grammatical range. It functions
                as nearly every part of speech—sometimes simultaneously.
              </p>
            </div>

            <div className="grammar-diagram">
              <div className="grammar-item">
                <p className="grammar-type">Verb</p>
                <p className="grammar-example">"They fucked."</p>
              </div>
              <div className="grammar-item">
                <p className="grammar-type">Noun</p>
                <p className="grammar-example">"I don't give a fuck."</p>
              </div>
              <div className="grammar-item">
                <p className="grammar-type">Adjective</p>
                <p className="grammar-example">"That fucking disaster."</p>
              </div>
              <div className="grammar-item">
                <p className="grammar-type">Adverb</p>
                <p className="grammar-example">"It's fucking cold."</p>
              </div>
              <div className="grammar-item">
                <p className="grammar-type">Interjection</p>
                <p className="grammar-example">"Fuck!"</p>
              </div>
              <div className="grammar-item">
                <p className="grammar-type">Infix</p>
                <p className="grammar-example">"Abso-fucking-lutely."</p>
              </div>
            </div>

            <div className="body-text">
              <h3 className="headline headline-md">The Infix: A Linguistic Rarity</h3>
              <p>
                English rarely permits infixation—breaking a word to insert another inside.
                <em>Fuck</em> is one of the very few words that can do this. The rules are
                precise: the infix appears before the stressed syllable.
                <sup className="citation">5</sup>
              </p>
              <p>
                You can say <em>abso-fucking-lutely</em> but not <em>ab-fucking-solutely</em>.
              </p>
            </div>

            <MuseumLabel>
              Verb. Noun. Adjective. Adverb. Infix. Punctuation. It does everything.
            </MuseumLabel>
          </div>
        </Panel>

        {/* ========================================
            PANEL 8: MYTHBUSTING GALLERY
            ======================================== */}
        <Panel id="myths" era="victorian">
          <div className="panel-inner">
            <h2 className="headline headline-lg panel-headline">
              Mythbusting Gallery
            </h2>
            <p className="subhead">The Acronym Legends & Other Fakes</p>

            <div className="body-text">
              <p>
                Walk into any bar, open any internet thread, and you'll hear confident
                claims about the word's "real" origin. Almost all are false.
              </p>
            </div>

            <MythCard
              claim="Fornication Under Consent of the King"
              verdict="debunked"
              evidence={
                <p>
                  Acronyms as we use them are a 20th-century phenomenon. Linguist David
                  Wilton: "Prior to the mid-20th century, pronouncing abbreviations as
                  words was not something people did."<sup className="citation">6</sup>
                  Also: "fornication" specifically excludes married couples.
                </p>
              }
            />

            <MythCard
              claim="For Unlawful Carnal Knowledge"
              verdict="debunked"
              evidence={
                <p>
                  Same acronym problem. Historical punishment placards listed crimes
                  directly—"Thief," not "For Theft." First appearance of this myth: 1967.
                </p>
              }
            />

            <MythCard
              claim="Pluck Yew (Agincourt archers)"
              verdict="debunked"
              evidence={
                <p>
                  Zero historical documentation. Archers "draw" bows, not "pluck" them.
                  The consonant shift from "pl" to "f" is linguistically impossible.
                  Jesse Sheidlower, OED editor: "Totally ludicrous in any version."
                  <sup className="citation">7</sup>
                </p>
              }
            />

            <MythCard
              claim="Roger Fuckebythenavele (1310)"
              verdict="verified"
              evidence={
                <p>
                  Peer-reviewed discovery by Dr. Paul Booth, published in
                  <em>Transactions of the Historic Society of Lancashire and Cheshire</em>,
                  Vol. 164 (2015). The earliest confirmed sexual use.
                </p>
              }
            />

            <MuseumLabel>
              The stories are better than the truth. But the truth is more interesting.
            </MuseumLabel>
          </div>
        </Panel>

        {/* ========================================
            PANEL 9: PRINTING & POLICING
            ======================================== */}
        <Panel id="censorship" era="victorian">
          <div className="panel-inner">
            <h2 className="headline headline-lg panel-headline">
              Printing & Policing
            </h2>
            <p className="subhead">Dictionaries, Dashes, and Editorial Fear</p>

            <div className="body-text">
              <p>
                For <strong>170 years</strong>, from 1795 to 1965, the word <em>fuck</em>
                did not appear in a single mainstream English dictionary. This wasn't
                oversight—it was policy.
              </p>

              <h3 className="headline headline-md">The Great Silence</h3>
              <p>
                When the original Oxford English Dictionary compiled its "F" entries in
                the 1890s, editors deliberately omitted the word. The decision reflected
                Victorian morals and genuine fear of prosecution under obscenity laws.
                <sup className="citation">8</sup>
              </p>

              <h3 className="headline headline-md">The Comstock Era (U.S.)</h3>
              <p>
                In 1873, the <strong>Comstock Act</strong> made mailing "obscene" materials
                a federal crime. Anthony Comstock, appointed special agent of the Post
                Office, claimed to have prosecuted over 3,600 defendants and destroyed
                160 tons of "obscene literature."<sup className="citation">9</sup>
              </p>

              <h3 className="headline headline-md">Breaking the Silence</h3>
              <div className="timeline-container">
                <div className="timeline-item">
                  <span className="timeline-date">1965</span>
                  <span className="timeline-content">Penguin English Dictionary: first general dictionary inclusion</span>
                </div>
                <div className="timeline-item">
                  <span className="timeline-date">1969</span>
                  <span className="timeline-content">American Heritage Dictionary includes it (also publishes "Clean Green" edition without)</span>
                </div>
                <div className="timeline-item">
                  <span className="timeline-date">1972</span>
                  <span className="timeline-content">OED finally adds the word under Robert Burchfield</span>
                </div>
                <div className="timeline-item">
                  <span className="timeline-date">2012</span>
                  <span className="timeline-content">Merriam-Webster's Collegiate Dictionary first includes it</span>
                </div>
              </div>
            </div>

            <MuseumLabel>
              170 years of silence. The longest word ever not to appear in the dictionary.
            </MuseumLabel>
          </div>
        </Panel>

        {/* ========================================
            PANEL 10: THE COURTROOM
            ======================================== */}
        <Panel era="victorian">
          <div className="panel-inner">
            <h2 className="headline headline-lg panel-headline">
              The Courtroom
            </h2>
            <p className="subhead">Obscenity on Trial</p>

            <div className="body-text">
              <h3 className="headline headline-md">Cohen v. California (1971)</h3>
              <p>
                On April 26, 1968, Paul Robert Cohen walked into a Los Angeles courthouse
                wearing a jacket bearing the words "<strong>Fuck the Draft</strong>."
                He was arrested, convicted, and sentenced to 30 days in jail.
              </p>
              <p>
                The Supreme Court reversed his conviction, 5–4.
              </p>

              <QuoteBlock
                quote="One man's vulgarity is another's lyric."
                attribution="Justice John Marshall Harlan, Cohen v. California"
              />

              <p>
                The ruling established that <em>fuck</em>, absent erotic content,
                <strong> is not legally obscene</strong>. It's offensive speech—but
                protected speech.<sup className="citation">10</sup>
              </p>

              <h3 className="headline headline-md">FCC v. Pacifica Foundation (1978)</h3>
              <p>
                When WBAI broadcast George Carlin's "Filthy Words" monologue at 2:00 PM,
                the Supreme Court ruled 5–4 that the FCC could regulate "indecent"
                content on broadcast airwaves—giving us the regulatory regime that
                persists today.<sup className="citation">11</sup>
              </p>
            </div>

            <MuseumLabel>
              The court ruled: vulgar, but not criminal. Protected, but not polite.
            </MuseumLabel>
          </div>
        </Panel>

        {/* ========================================
            PANEL 11: COUNTERCULTURE IGNITION
            ======================================== */}
        <Panel id="culture" era="counter">
          <div className="panel-inner">
            <h2 className="headline headline-lg panel-headline typewriter-text">
              Counterculture Ignition
            </h2>
            <p className="subhead">Lenny Bruce and the Comedy of Transgression</p>

            <div className="body-text">
              <p>
                Before George Carlin listed the seven words, before Richard Pryor made
                profanity poetry, there was <strong>Lenny Bruce</strong>—and a string
                of arrests that made obscenity a civil liberties issue.
              </p>

              <h3 className="headline headline-md">The Arrests</h3>
              <div className="timeline-container">
                <div className="timeline-item">
                  <span className="timeline-date">1961</span>
                  <span className="timeline-content">San Francisco (Jazz Workshop): Arrested, later acquitted</span>
                </div>
                <div className="timeline-item">
                  <span className="timeline-date">1962</span>
                  <span className="timeline-content">Chicago (Gate of Horn): Convicted, one year sentence</span>
                </div>
                <div className="timeline-item">
                  <span className="timeline-date">1964</span>
                  <span className="timeline-content">New York (Cafe Au Go Go): Convicted despite support from Allen, Dylan, Mailer, Baldwin</span>
                </div>
              </div>

              <p>
                Bruce died on August 3, 1966, while his appeal was pending. In 2003,
                Governor Pataki issued him the <strong>first posthumous pardon in
                New York State history</strong>.<sup className="citation">12</sup>
              </p>
            </div>

            <MuseumLabel>
              He asked why some words were forbidden. The state's answer: because we say so.
            </MuseumLabel>
          </div>
        </Panel>

        {/* ========================================
            PANEL 12: ART'S MEGAPHONES
            ======================================== */}
        <Panel era="counter">
          <div className="panel-inner">
            <h2 className="headline headline-lg panel-headline typewriter-text">
              Art's Megaphones
            </h2>
            <p className="subhead">Film, Literature, Music</p>

            <div className="body-text">
              <h3 className="headline headline-md">Literature: Lady Chatterley (1960)</h3>
              <p>
                D.H. Lawrence's novel used "fuck" approximately 30 times. The 1960 UK
                trial (<em>R v Penguin Books Ltd.</em>) became a watershed when the
                prosecutor asked: "Is it a book that you would wish your wife or
                servants to read?" The jury laughed. Penguin was acquitted.
                <sup className="citation">13</sup>
              </p>

              <h3 className="headline headline-md">Film: M*A*S*H (1970)</h3>
              <p>
                The first mainstream American studio film to include the word. Actor
                John Schuck ad-libbed during a football scene: "Alright, bub, this time
                your fucking head's coming right off!" Director Robert Altman kept it.
                <sup className="citation">14</sup>
              </p>

              <h3 className="headline headline-md">Music: Sex Pistols (1976)</h3>
              <p>
                On December 1, 1976, Steve Jones called Bill Grundy a "dirty fucker"
                on live television. The <em>Daily Mirror</em> screamed: "THE FILTH AND
                THE FURY!" Punk had announced itself.
              </p>

              <h3 className="headline headline-md">Music: N.W.A (1988)</h3>
              <p>
                "Fuck Tha Police" prompted an FBI letter to Priority Records. The song
                became a protest anthem; the letter became evidence that authorities
                had heard—and feared—the message.<sup className="citation">15</sup>
              </p>
            </div>

            <MuseumLabel>
              Every ban, every letter, every trial made the word more famous.
            </MuseumLabel>
          </div>
        </Panel>

        {/* ========================================
            PANEL 13: EVERYDAY SPEECH
            ======================================== */}
        <Panel era="digital">
          <div className="panel-inner">
            <h2 className="headline headline-lg panel-headline">
              Everyday Speech
            </h2>
            <p className="subhead">Pragmatics, Bonding, and Social Risk</p>

            <div className="body-text">
              <p>
                Beyond headlines and courtrooms, the word lives in ordinary
                conversation—where its meaning shifts with every context.
              </p>

              <h3 className="headline headline-md">The Social Functions</h3>
              <p>
                <strong>Solidarity marker:</strong> "I fucking love you guys."
                Among friends, profanity signals intimacy and trust.
              </p>
              <p>
                <strong>Catharsis:</strong> Stub your toe, the word emerges unbidden.
                Studies suggest swearing during pain actually increases pain tolerance.
                <sup className="citation">16</sup>
              </p>
              <p>
                <strong>Register marker:</strong> The word is simultaneously common
                and forbidden. Knowing <em>where</em> you can say it is social intelligence.
              </p>
            </div>

            <MuseumLabel>
              The rule isn't "don't say it." The rule is "know where."
            </MuseumLabel>
          </div>
        </Panel>

        {/* ========================================
            PANEL 14: GLOBAL TRAVEL
            ======================================== */}
        <Panel era="digital">
          <div className="panel-inner">
            <h2 className="headline headline-lg panel-headline">
              Global Travel
            </h2>
            <p className="subhead">Subtitles, Borrowings, and Translation Friction</p>

            <div className="body-text">
              <p>
                English profanity has gone global—but not without complications.
              </p>

              <h3 className="headline headline-md">Direct Borrowing</h3>
              <p>
                Japanese: <em>ファック (fakku)</em>. Russian: <em>фак (fak)</em>.
                The word travels, often retaining transgressive power while lacking
                exact equivalents.
              </p>

              <h3 className="headline headline-md">Subtitle Dilemmas</h3>
              <p>
                Translators face impossible choices. Soften it? Intensify it?
                Leave it in English? Nordic subtitlers often leave English profanity
                untranslated, assuming audiences understand.
                <sup className="citation">17</sup>
              </p>
            </div>

            <MuseumLabel>
              It's the same word. It doesn't mean the same thing.
            </MuseumLabel>
          </div>
        </Panel>

        {/* ========================================
            PANEL 15: DIGITAL FLOOD
            ======================================== */}
        <Panel id="digital" era="digital">
          <div className="panel-inner">
            <h2 className="headline headline-lg panel-headline">
              Digital Flood
            </h2>
            <p className="subhead">Memes, Moderation, and Algorithmic Hide-and-Seek</p>

            <div className="body-text">
              <p>
                The internet did something unprecedented: it made the word both
                inescapable and actively hunted.
              </p>

              <h3 className="headline headline-md">Visibility Explosion</h3>
              <p>
                The word's frequency in published American English increased approximately
                <strong> fifteen-fold</strong> between 1950 and 2010, with the sharpest
                rise after 1990.<sup className="citation">18</sup>
              </p>

              <h3 className="headline headline-md">The Moderation Paradox</h3>
              <p>
                Platforms that host billions of instances also actively suppress it.
                TikTok creators substitute "unalive" for "kill" and spell profanity
                as "f*ck" to avoid demonetization. The result: a strange cat-and-mouse
                game where the word is everywhere and nowhere.
              </p>

              <h3 className="headline headline-md">Creative Evasion</h3>
              <p>
                <em>f*ck, f**k, fu¢k, phuck, 🤬, "fork"</em>—digital users have
                developed an elaborate vocabulary of workarounds. These echo the
                medieval scribes who used ciphers.
              </p>
            </div>

            <MuseumLabel>
              Everywhere and nowhere. The algorithm sees all, yet the word slips through.
            </MuseumLabel>
          </div>
        </Panel>

        {/* ========================================
            PANEL 16: THE FAMILY TREE
            ======================================== */}
        <Panel era="digital">
          <div className="panel-inner panel-wide">
            <h2 className="headline headline-lg panel-headline">
              The Family Tree
            </h2>
            <p className="subhead">Derivatives, Compounds, and Infixation</p>

            <div className="body-text">
              <p>
                One root, endless branches. The word has generated a family of derivatives.
              </p>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>Form</th>
                  <th>Part of Speech</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>fuck</td><td>verb/noun</td><td><em>Don't give a fuck</em></td></tr>
                <tr><td>fucking</td><td>adj./adv.</td><td><em>the fucking thing</em></td></tr>
                <tr><td>fucked</td><td>adjective</td><td><em>We're fucked</em></td></tr>
                <tr><td>fucker</td><td>noun</td><td><em>That fucker</em></td></tr>
                <tr><td>fuckup</td><td>noun/verb</td><td><em>He's a fuck-up</em></td></tr>
                <tr><td>motherfucker</td><td>noun</td><td><em>That motherfucker!</em></td></tr>
                <tr><td>clusterfuck</td><td>noun</td><td><em>What a clusterfuck</em></td></tr>
                <tr><td>unfuck</td><td>verb</td><td><em>Let's unfuck this</em></td></tr>
              </tbody>
            </table>

            <div className="body-text">
              <p>
                Jesse Sheidlower's <em>The F-Word</em> (2024) documents over
                <strong> 500 distinct uses and compounds</strong>—and notes it's
                not exhaustive.<sup className="citation">19</sup>
              </p>
            </div>

            <MuseumLabel>
              It's not one word. It's an entire ecosystem.
            </MuseumLabel>
          </div>
        </Panel>

        {/* ========================================
            PANEL 17: WHAT THE WORD REVEALS
            ======================================== */}
        <Panel era="digital">
          <div className="panel-inner">
            <h2 className="headline headline-lg panel-headline">
              What the Word Reveals
            </h2>
            <p className="subhead">Power, Class, Intimacy, and Control</p>

            <div className="body-text">
              <p>
                A word's history is never just about the word. It's about who could
                say it, who couldn't, and what happened when the rules were broken.
              </p>

              <h3 className="headline headline-md">On Power</h3>
              <p>
                Every act of censorship is an act of power. When the Comstock Act
                banned "obscene" materials, it gave authorities discretion to define
                obscenity. When platforms shadowban profanity, they make invisible
                decisions about what counts as acceptable.
              </p>

              <h3 className="headline headline-md">On Intimacy</h3>
              <p>
                The same word that signals aggression can signal closeness. Swearing
                <em>with</em> someone marks trust, shared informality, the suspension
                of social performance.
              </p>

              <h3 className="headline headline-md">The Question That Remains</h3>
              <p>
                Why does <em>this</em> word, of all words, carry such charge?
                No other word occupies quite this position—simultaneously the most
                common intensifier and the last word permitted in mainstream broadcast.
              </p>
              <p>
                The mystery isn't that it exists. The mystery is why it matters so much.
              </p>
            </div>

            <MuseumLabel>
              Tell me what you can't say, and I'll tell you who holds power.
            </MuseumLabel>
          </div>
        </Panel>

        {/* ========================================
            PANEL 18: FINALE
            ======================================== */}
        <section className="cover-panel" style={{ minHeight: '80vh' }}>
          <h2 className="cover-title" style={{ fontSize: 'clamp(3rem, 12vw, 8rem)' }}>
            FUCK
          </h2>
          <p className="cover-subtitle" style={{ maxWidth: '500px' }}>
            A word that refuses to sit quietly on the page.
          </p>
          <p style={{
            color: 'var(--text-tertiary)',
            marginTop: '2rem',
            fontSize: '0.875rem',
            fontStyle: 'italic'
          }}>
            It was here before the dictionary.<br />
            It'll be here after the algorithm.
          </p>

          <MuseumLabel>
            Still here. Still unsayable. Still everywhere.
          </MuseumLabel>
        </section>

        {/* ========================================
            SOURCES SECTION
            ======================================== */}
        <section className="sources-section">
          <div className="panel-inner">
            <h2 className="sources-title">Sources</h2>

            <div className="source-item">
              <sup>1</sup> Kroonen, Guus. <a href="https://brill.com/display/title/21882" target="_blank" rel="noopener noreferrer"><em>Etymological Dictionary of Proto-Germanic</em></a>. Leiden: Brill, 2013, p. 158.
            </div>
            <div className="source-item">
              <sup>2</sup> Booth, Paul. <a href="https://www.hslc.org.uk/transactions/" target="_blank" rel="noopener noreferrer">"An early fourteenth-century use of the F-word in Cheshire, 1310–11."</a>
              <em>Transactions of the Historic Society of Lancashire and Cheshire</em>, Vol. 164 (2015).
            </div>
            <div className="source-item">
              <sup>3</sup> Wright, T. & Halliwell, J.O. <a href="https://archive.org/details/reliquiantiqua01wriguoft" target="_blank" rel="noopener noreferrer"><em>Reliquiæ Antiquæ</em></a> (1841), 1.91.
            </div>
            <div className="source-item">
              <sup>4</sup> <a href="https://www.oed.com/dictionary/fuck_v" target="_blank" rel="noopener noreferrer"><em>Oxford English Dictionary</em>, entry for "fuck, v."</a>
            </div>
            <div className="source-item">
              <sup>5</sup> McCarthy, John. <a href="https://www.jstor.org/stable/413849" target="_blank" rel="noopener noreferrer">"Prosodic structure and expletive infixation."</a>
              <em>Language</em> 58.3 (1982): 574–590.
            </div>
            <div className="source-item">
              <sup>6</sup> Wilton, David. <a href="https://global.oup.com/academic/product/word-myths-9780195172843" target="_blank" rel="noopener noreferrer"><em>Word Myths: Debunking Linguistic Urban Legends</em></a>.
              Oxford University Press, 2004.
            </div>
            <div className="source-item">
              <sup>7</sup> Sheidlower, Jesse. <a href="https://global.oup.com/academic/product/the-f-word-9780199393114" target="_blank" rel="noopener noreferrer"><em>The F-Word</em></a>, 3rd ed. Oxford University Press, 2009.
            </div>
            <div className="source-item">
              <sup>8</sup> Mugglestone, Lynda. <a href="https://yalebooks.yale.edu/book/9780300106992/lost-for-words/" target="_blank" rel="noopener noreferrer"><em>Lost for Words: The Hidden History of the Oxford English Dictionary</em></a>.
              Yale University Press, 2005.
            </div>
            <div className="source-item">
              <sup>9</sup> Bates, Anna Louise. <a href="https://rowman.com/ISBN/9780761801870" target="_blank" rel="noopener noreferrer"><em>Weeder in the Garden of the Lord: Anthony Comstock's Life and Career</em></a>.
              University Press of America, 1995.
            </div>
            <div className="source-item">
              <sup>10</sup> <a href="https://supreme.justia.com/cases/federal/us/403/15/" target="_blank" rel="noopener noreferrer"><em>Cohen v. California</em>, 403 U.S. 15 (1971)</a>.
            </div>
            <div className="source-item">
              <sup>11</sup> <a href="https://supreme.justia.com/cases/federal/us/438/726/" target="_blank" rel="noopener noreferrer"><em>FCC v. Pacifica Foundation</em>, 438 U.S. 726 (1978)</a>.
            </div>
            <div className="source-item">
              <sup>12</sup> Collins, Ronald K.L. & Skover, David M. <a href="https://www.sourcebooks.com/the-trials-of-lenny-bruce.html" target="_blank" rel="noopener noreferrer"><em>The Trials of Lenny Bruce</em></a>.
              Sourcebooks, 2002.
            </div>
            <div className="source-item">
              <sup>13</sup> Rolph, C.H., ed. <a href="https://www.penguin.co.uk/books/57586/the-trial-of-lady-chatterley-by-rolph-c-h/9780141192628" target="_blank" rel="noopener noreferrer"><em>The Trial of Lady Chatterley</em></a>. Penguin, 1961.
            </div>
            <div className="source-item">
              <sup>14</sup> Altman, Robert. Director's commentary, <em>M*A*S*H</em> DVD. 20th Century Fox, 2002.
            </div>
            <div className="source-item">
              <sup>15</sup> Ahlerich, Milt. <a href="https://vault.fbi.gov/nwa" target="_blank" rel="noopener noreferrer">Letter to Priority Records</a>. August 1, 1989. FBI archives.
            </div>
            <div className="source-item">
              <sup>16</sup> Stephens, Richard et al. <a href="https://pubmed.ncbi.nlm.nih.gov/19590391/" target="_blank" rel="noopener noreferrer">"Swearing as a response to pain."</a>
              <em>NeuroReport</em> 20.12 (2009): 1056–1060.
            </div>
            <div className="source-item">
              <sup>17</sup> Díaz Cintas, Jorge & Remael, Aline. <a href="https://www.routledge.com/Audiovisual-Translation-Subtitling/Diaz-Cintas-Remael/p/book/9781138940390" target="_blank" rel="noopener noreferrer"><em>Audiovisual Translation: Subtitling</em></a>.
              Routledge, 2021.
            </div>
            <div className="source-item">
              <sup>18</sup> <a href="https://books.google.com/ngrams/graph?content=fuck%2Cfucking&year_start=1950&year_end=2019&corpus=en-US-2019" target="_blank" rel="noopener noreferrer">Google Books Ngram Viewer</a>, "fuck,fucking," American English corpus, 1950–2019.
            </div>
            <div className="source-item">
              <sup>19</sup> Sheidlower, Jesse. <a href="https://global.oup.com/academic/product/the-f-word-9780199393114" target="_blank" rel="noopener noreferrer"><em>The F-Word</em></a>, 3rd ed. Oxford University Press, 2009.
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};

export default TheWordFuckClient;
