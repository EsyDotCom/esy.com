'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import './silk.css';

/* ═══════════════════════════════════════════════════════════════
   SILK — The Luminous Thread
   ═══════════════════════════════════════════════════════════════
   5,000 Years of Thread, Empire, and Espionage
   5-movement cinematic structure, 35 photographs, 3 interactions.
   ═══════════════════════════════════════════════════════════════ */

/* ─── Hooks ─── */

function useInView(opts: { threshold?: number; rootMargin?: string; repeat?: boolean } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          if (!opts.repeat) io.disconnect();
        } else if (opts.repeat) {
          setVisible(false);
        }
      },
      { threshold: opts.threshold ?? 0.15, rootMargin: opts.rootMargin ?? '0px' }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [opts.threshold, opts.rootMargin, opts.repeat]);
  return [ref, visible] as const;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

/* ─── Data ─── */

const SILK_ROAD_STOPS = [
  { name: "Xi'an", date: 'Han Dynasty', desc: 'The eastern terminus. Capital of the Tang Dynasty and starting point for caravans heading west through the Hexi Corridor.' },
  { name: 'Dunhuang', date: '4th–14th c.', desc: 'Oasis gateway to the Taklamakan Desert. Home to the Mogao Caves — 492 Buddhist grottoes with silk-painted murals.' },
  { name: 'Kashgar', date: '2nd c. BCE–', desc: 'The great crossroads where the northern and southern routes around the Taklamakan reunite. A Uyghur trading city for two millennia.' },
  { name: 'Samarkand', date: '4th–8th c.', desc: 'Heart of the Sogdian world. The merchants based here controlled East-West trade for over 400 years.' },
  { name: 'Baghdad', date: '8th–13th c.', desc: 'Abbasid capital and center of Islamic silk production. Tiraz workshops created silk textiles with woven Arabic calligraphy.' },
  { name: 'Constantinople', date: '6th c.–1453', desc: 'Byzantine terminus. Where Justinian\'s monks delivered the stolen silkworm eggs, launching European sericulture.' },
  { name: 'Venice', date: '13th c.–', desc: 'European gateway. Venetian merchants controlled the western end of the silk trade and built a textile empire on it.' },
];

const SERICULTURE_STAGES = [
  { emoji: '🌿', label: 'Mulberry Leaf', revelation: 'The only food Bombyx mori will eat. One silkworm eats 20× its body weight in mulberry leaves over its 35-day larval stage.' },
  { emoji: '🐛', label: 'Silkworm', revelation: 'Bombyx mori — blind, flightless, utterly dependent on humans after 5,000 years of selective breeding. It cannot survive in the wild.' },
  { emoji: '🫧', label: 'Cocoon', revelation: 'Spun from a single continuous filament of silk protein (fibroin) that can be up to 900 meters long. The caterpillar takes 3 days to spin it.' },
  { emoji: '🌊', label: 'Reeling', revelation: 'Cocoons are soaked in hot water to dissolve the sericin gum. A single filament — thinner than a human hair — is drawn out and wound onto a reel.' },
  { emoji: '🧵', label: 'Thread', revelation: '5 to 8 individual filaments are twisted together to create a silk thread strong enough to weave. This process is called "throwing."' },
  { emoji: '🪡', label: 'Fabric', revelation: 'The thread is woven on looms — from ancient Chinese wooden looms to the Jacquard machines of 19th-century Lyon. 25,000 cocoons for one silk dress.' },
  { emoji: '👘', label: 'Garment', revelation: 'By the Han Dynasty, Chinese masters had identified 36 distinct silk colors. Silk garments served as currency, diplomatic gifts, and burial shrouds.' },
];

const TIMEFOLD_ERAS = [
  { date: '6500 BCE', event: 'First silk use — silk protein residues found at Hemudu, Zhejiang. Three thousand years before the Leizu legend.' },
  { date: '2700 BCE', event: 'Empress Leizu legend crystallizes — a cocoon falls into tea, and sericulture is born. The myth that launched an industry.' },
  { date: '138 BCE', event: 'Zhang Qian opens the Silk Road — sent west by Emperor Wu, captured for 10 years, completes the mission anyway.' },
  { date: '552 CE', event: 'The Byzantine heist — two monks smuggle silkworm eggs from China in hollow bamboo canes. China\'s 3,000-year monopoly: broken.' },
  { date: '1300', event: 'Marco Polo describes Chinese silk production: "The whole province is full of mulberry trees." Europe takes notice.' },
  { date: '1804', event: 'Jacquard perfects the punch-card loom. Each card encodes one row of pattern. Stack the cards: program the machine.' },
  { date: '1948', event: 'Jim Thompson arrives in Bangkok. Thai silk is dying. He builds a global luxury brand — then vanishes in 1967.' },
  { date: 'Today', event: 'China still produces 80% of the world\'s raw silk. Same caterpillar, same mulberry leaf, same shimmer. $16.9 billion industry.' },
];

const BIBLIOGRAPHY = [
  { id: 'C1', text: 'Hansen, V. (2012). The Silk Road: A New History. Oxford University Press.' },
  { id: 'C2', text: 'Prasad, A. (2024). Silk: A World History. HarperCollins.' },
  { id: 'C3', text: 'Procopius of Caesarea (c. 550 CE). History of the Wars, Book VIII. Trans. H.B. Dewing. Loeb Classical Library.' },
  { id: 'C4', text: 'Needham, J. & Kuhn, D. (1988). Science and Civilisation in China, Vol. 5, Part 9: Textile Technology. Cambridge University Press.' },
  { id: 'C5', text: 'Gong, Y. & Li, W. (2011). "Archaeological Evidence for Early Silk Production in China." Archaeometry 53(4), 697–712.' },
  { id: 'C6', text: 'Metropolitan Museum of Art. "Silk in the Medieval Islamic World." Heilbrunn Timeline of Art History.' },
  { id: 'C7', text: 'Victoria and Albert Museum. "Chinese Silk: A Cultural History."' },
  { id: 'C11', text: 'Warren, W. (1998). Jim Thompson: The Unsolved Mystery. Editions Didier Millet.' },
  { id: 'C15', text: 'Essinger, J. (2004). Jacquard\'s Web: How a Hand-Loom Led to the Birth of the Information Age. Oxford University Press.' },
  { id: 'C16', text: 'Whitfield, S. (2018). Silk, Slaves, and Stupas: Material Culture of the Silk Road. University of California Press.' },
  { id: 'C19', text: 'de la Vaissière, É. (2005). Sogdian Traders: A History. Brill.' },
  { id: 'C22', text: 'Pliny the Elder (79 CE). Natural History, Books VI and XI. Trans. Bostock & Riley. Perseus Digital Library.' },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

/* ─── FadeIn Wrapper ─── */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, visible] = useInView();
  const delayClass = delay === 1 ? 'silk-fade--delay-1' : delay === 2 ? 'silk-fade--delay-2' : delay === 3 ? 'silk-fade--delay-3' : '';
  return (
    <div ref={ref} className={`silk-fade ${visible ? 'silk-fade--visible' : ''} ${delayClass} ${className}`}>
      {children}
    </div>
  );
}

/* ─── MigrationTrail ─── */
function MigrationTrail() {
  const [active, setActive] = useState(0);

  return (
    <div className="silk-migration">
      <div className="silk-migration__title">The Silk Road — Xi&apos;an to Venice</div>
      <div className="silk-migration__route" role="tablist" aria-label="Silk Road stops">
        {SILK_ROAD_STOPS.map((stop, i) => (
          <React.Fragment key={stop.name}>
            <button
              className={`silk-migration__stop ${i === active ? 'silk-migration__stop--active' : ''}`}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              aria-label={`${stop.name}, ${stop.date}`}
            >
              <div className="silk-migration__connector" aria-hidden="true" />
              <div className="silk-migration__dot" />
              <div className="silk-migration__name">{stop.name}</div>
              <div className="silk-migration__date">{stop.date}</div>
            </button>
          </React.Fragment>
        ))}
      </div>
      <div className="silk-migration__detail" role="tabpanel" aria-label={`Details for ${SILK_ROAD_STOPS[active].name}`}>
        <div className="silk-migration__detail-name">{SILK_ROAD_STOPS[active].name}</div>
        <div className="silk-migration__detail-desc">{SILK_ROAD_STOPS[active].desc}</div>
      </div>
    </div>
  );
}

/* ─── IngredientOracle ─── */
function IngredientOracle() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="silk-oracle">
      <div className="silk-oracle__title">The Sericulture Process</div>
      <div className="silk-oracle__stages" role="tablist" aria-label="Silk production stages">
        {SERICULTURE_STAGES.map((stage, i) => (
          <React.Fragment key={stage.label}>
            {i > 0 && <div className="silk-oracle__arrow" aria-hidden="true">→</div>}
            <button
              className={`silk-oracle__stage ${active === i ? 'silk-oracle__stage--active' : ''}`}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(active === i ? null : i)}
              aria-label={stage.label}
            >
              <div className="silk-oracle__circle">{stage.emoji}</div>
              <div className="silk-oracle__label">{stage.label}</div>
            </button>
          </React.Fragment>
        ))}
      </div>
      {active !== null && (
        <div className="silk-oracle__reveal" role="tabpanel">
          <div className="silk-oracle__reveal-title">{SERICULTURE_STAGES[active].label}</div>
          <div className="silk-oracle__reveal-text">{SERICULTURE_STAGES[active].revelation}</div>
        </div>
      )}
    </div>
  );
}

/* ─── TimefoldSlider ─── */
function TimefoldSlider() {
  const [active, setActive] = useState(0);

  return (
    <div className="silk-timefold">
      <div className="silk-timefold__title">5,000 Years in Eight Moments</div>
      <div className="silk-timefold__track">
        <div className="silk-timefold__fill" style={{ width: `${(active / (TIMEFOLD_ERAS.length - 1)) * 100}%` }} />
        <div className="silk-timefold__dots">
          {TIMEFOLD_ERAS.map((era, i) => (
            <button
              key={era.date}
              className={`silk-timefold__dot ${i === active ? 'silk-timefold__dot--active' : i < active ? 'silk-timefold__dot--past' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Era: ${era.date}`}
            />
          ))}
        </div>
      </div>
      <div className="silk-timefold__labels">
        {TIMEFOLD_ERAS.map((era, i) => (
          <span key={era.date} className={`silk-timefold__label ${i === active ? 'silk-timefold__label--active' : ''}`}>
            {era.date.replace(' BCE', '').replace(' CE', '').slice(0, 5)}
          </span>
        ))}
      </div>
      <div className="silk-timefold__card">
        <div className="silk-timefold__card-date">{TIMEFOLD_ERAS[active].date}</div>
        <div className="silk-timefold__card-event">{TIMEFOLD_ERAS[active].event}</div>
      </div>
    </div>
  );
}

/* ─── Figure Profile ─── */
function FigureProfile({ name, dates, role, quote, quoteSource }: {
  name: string;
  dates: string;
  role: string;
  quote?: string;
  quoteSource?: string;
}) {
  return (
    <FadeIn>
      <div className="silk-figure">
        <div className="silk-figure__image">
          {/* Placeholder — images will be sourced via G4.5 */}
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', background: 'var(--silk-cocoon)' }}>
            {name.charAt(0)}
          </div>
        </div>
        <div>
          <div className="silk-figure__name">{name}</div>
          <div className="silk-figure__dates">{dates}</div>
          <div className="silk-figure__role">{role}</div>
          {quote && (
            <div className="silk-figure__quote">
              &ldquo;{quote}&rdquo;
              {quoteSource && <div className="silk-quote__attribution">{quoteSource}</div>}
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MOVEMENTS
   ═══════════════════════════════════════════════════════════════ */

/* ─── I. INVOCATION ─── */
function MovementInvocation() {
  const [heroRef, heroVisible] = useInView({ threshold: 0.3 });

  return (
    <section className="silk-movement silk-movement--invocation" aria-label="Invocation">
      <div className="silk-hero" ref={heroRef}>
        <div className={`silk-hero__thread ${heroVisible ? 'silk-hero__thread--visible' : ''}`} aria-hidden="true" />
        <p className={`silk-hero__tagline ${heroVisible ? 'silk-hero__tagline--visible' : ''}`}>
          For three thousand years, China kept one secret.
          <br />
          <em>How caterpillars make thread.</em>
        </p>
        <p className={`silk-hero__subtitle ${heroVisible ? 'silk-hero__subtitle--visible' : ''}`}>
          5,000 Years of Silk, Secrecy, and Civilization
        </p>
        <h1 className={`silk-hero__title silk-shimmer-text ${heroVisible ? 'silk-hero__title--visible' : ''}`}>
          The Luminous Thread
        </h1>
      </div>
    </section>
  );
}

/* ─── II. ANCESTRAL PULSE ─── */
function MovementAncestral() {
  return (
    <section className="silk-movement silk-movement--ancestral" aria-label="Ancestral Pulse: The Secret Kingdom">
      <div className="silk-content-col">
        <FadeIn>
          <span className="silk-era-marker silk-era-marker--china">Ancient China</span>
          <h2 className="silk-movement-title">The Secret Kingdom</h2>
          <p className="silk-movement-subtitle">Neolithic China → Han Dynasty, 6500 BCE – 200 CE</p>
        </FadeIn>

        <FadeIn>
          <p className="silk-body silk-drop-cap">
            Silk begins in silence. Sometime around 6,500 years ago, in the river
            villages of what is now Zhejiang Province, humans began cultivating a
            relationship with a small, pale caterpillar — <em>Bombyx mori</em>,
            the silkworm. Archaeological evidence from the Hemudu site shows silk
            protein residues on artifacts that predate writing, bronze, and every
            other &ldquo;civilization marker&rdquo; except agriculture itself. The
            Chinese didn&apos;t just discover silk. They domesticated the creature
            that makes it — breeding it over millennia until <em>Bombyx mori</em>{' '}
            became blind, flightless, and utterly dependent on human care. It
            cannot survive in the wild.
          </p>
        </FadeIn>

        <FadeIn>
          <p className="silk-body">
            The legend says it differently. According to Chinese tradition,
            Empress Leizu — wife of the Yellow Emperor — was drinking tea beneath
            a mulberry tree around 2700 BCE when a silkworm cocoon fell into her
            cup. As she retrieved it, a single filament unwound. She followed the
            thread, and in following it, discovered sericulture.
          </p>
        </FadeIn>

        <FadeIn>
          <p className="silk-body">
            The legend is almost certainly myth — the archaeological record puts
            silk use three thousand years earlier. But the myth itself is
            historically significant. For millennia, it was used to justify silk
            as China&apos;s civilizational gift to the world. Annual Leizu worship
            festivals still occur in Yanting County, Sichuan.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="silk-divider" />
        </FadeIn>

        <FadeIn>
          <h3 className="silk-section-heading">The State Secret</h3>
          <p className="silk-body">
            What China built around silk was not just an industry. It was the most
            protected trade secret in the ancient world. For roughly three
            thousand years, China held a monopoly on sericulture — the cultivation
            of silkworms and production of raw silk. Smuggling silkworm eggs,
            larvae, or mulberry seeds out of China was punishable by death.
          </p>
        </FadeIn>

        <FadeIn>
          <p className="silk-body">
            Silk was not merely fabric. It was currency. Han Dynasty soldiers were
            paid in bolts of silk. Diplomatic gifts between kingdoms were measured
            in silk weight. Tax payments were rendered in silk. The Chinese
            character for silk, 丝 (sī), became one of the most common radicals
            in Chinese writing — appearing in characters for &ldquo;thread,&rdquo;
            &ldquo;weave,&rdquo; &ldquo;fine,&rdquo; and &ldquo;organization.&rdquo;
            Silk was woven into the language itself.
          </p>
        </FadeIn>

        <FadeIn>
          <IngredientOracle />
        </FadeIn>

        <FadeIn>
          <div className="silk-divider" />
        </FadeIn>

        <FadeIn>
          <h3 className="silk-section-heading">Zhang Qian Opens the Road</h3>
          <p className="silk-body">
            In 138 BCE, Emperor Wu of the Han Dynasty sent a young diplomat named
            Zhang Qian on a mission west — to forge an alliance with the Yuezhi
            people against the nomadic Xiongnu who threatened China&apos;s
            northern borders. Zhang Qian was captured by the Xiongnu and held
            prisoner for ten years. He escaped, completed his mission, was
            captured again, escaped again, and finally returned to the Han court
            after thirteen years — with the first detailed Chinese account of
            Central Asia, Persia, and the lands beyond.
          </p>
        </FadeIn>

        <FigureProfile
          name="Zhang Qian"
          dates="d. 114 BCE"
          role="Han Dynasty diplomat who opened the Silk Road"
          quote="Zhang Qian was the first person to bring back a clear account of the regions west of China."
          quoteSource="Sima Qian, Records of the Grand Historian"
        />

        <FadeIn>
          <p className="silk-body">
            Zhang Qian&apos;s intelligence reports didn&apos;t just describe
            foreign lands. They described opportunities. Emperor Wu launched
            military campaigns to secure the Hexi Corridor — the narrow passage
            between the Tibetan Plateau and the Gobi Desert — and established the
            Protectorate of the Western Regions. The routes Zhang Qian mapped
            would carry silk westward for the next thousand years. A German
            geographer would name them the Silk Road in 1877.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── III. COLLISION OF WORLDS ─── */
function MovementCollision() {
  return (
    <section className="silk-movement silk-movement--collision" aria-label="Collision of Worlds: The Road and the Heist">
      <div className="silk-content-col">
        <FadeIn>
          <span className="silk-era-marker silk-era-marker--road">The Silk Road</span>
          <h2 className="silk-movement-title">The Road and the Heist</h2>
          <p className="silk-movement-subtitle">Sogdian Merchants → Byzantine Espionage → Islamic Silk, 200 BCE – 1300 CE</p>
        </FadeIn>

        <FadeIn>
          <p className="silk-body silk-drop-cap">
            The Silk Road was not one road. Valerie Hansen, in her landmark 2012
            revision, demonstrated that the romantic name — coined by Ferdinand
            von Richthofen in 1877 — masks a more complex reality: a shifting
            network of routes where most trade was local relay rather than
            end-to-end. No single merchant traveled from Xi&apos;an to Rome. Goods
            changed hands dozens of times, each middleman adding markup and
            mystery.
          </p>
        </FadeIn>

        <FadeIn>
          <p className="silk-body">
            But the name captures something real. For the first time in human
            history, a continuous chain of commercial relationships linked the
            Pacific coast of China to the Mediterranean coast of Rome. Silk was
            the commodity valuable enough — per ounce — to justify the journey.
            And the people who made it work were the ones history almost forgot.
          </p>
        </FadeIn>

        <FadeIn>
          <MigrationTrail />
        </FadeIn>

        <FadeIn>
          <h3 className="silk-section-heading">The Invisible Intermediaries</h3>
          <p className="silk-body">
            The Sogdians were Iranian-speaking merchants based in Samarkand who
            dominated Silk Road commerce for over four hundred years, from the 4th
            to the 8th century. They operated trading networks from Xi&apos;an to
            Constantinople, translating between languages and cultures, maintaining
            way stations and warehouses, and physically transporting the goods
            that connected civilizations.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="silk-quote silk-quote--lapis">
            <p className="silk-quote__text">
              &ldquo;The Sogdians left behind letters, contracts, and account books that
              reveal the mechanics of Silk Road trade in unprecedented detail.&rdquo;
            </p>
            <div className="silk-quote__attribution">
              Étienne de la Vaissière, <em>Sogdian Traders</em> (2005)
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <p className="silk-body">
            The Afrasiab murals in Samarkand — discovered in 1965, dating to the
            7th century — are the only surviving large-scale portraits of Sogdian
            merchants. They show dignified men in elaborate robes, conducting
            diplomatic ceremonies. These were not mere traders. They were the
            connective tissue of the pre-modern world.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="silk-divider" />
        </FadeIn>

        <FadeIn>
          <h3 className="silk-section-heading">Rome&apos;s Obsession</h3>
          <p className="silk-body">
            At the western end of these routes, Romans craved silk with an
            intensity that alarmed their own moralists — and they had no idea
            where it came from. Pliny the Elder, writing in the 1st century CE,
            believed silk grew on trees: &ldquo;The Seres are famous for the
            woollen substance obtained from their forests; after a soaking in
            water they comb off the white down of the leaves.&rdquo;
          </p>
        </FadeIn>

        <FadeIn>
          <div className="silk-quote">
            <p className="silk-quote__text">
              &ldquo;So manifold is the labour employed, and so distant is the region of
              the globe drawn upon, to enable the Roman matron to flaunt
              transparent raiment in public.&rdquo;
            </p>
            <div className="silk-quote__attribution">
              Pliny the Elder, <em>Natural History</em>, Book XI (79 CE)
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <p className="silk-body">
            The Roman Senate tried to ban men from wearing silk: &ldquo;Let no man
            disgrace himself by wearing silk.&rdquo; The ban failed spectacularly.
            Pliny estimated Rome&apos;s annual trade deficit to Asia at 100
            million sesterces — a hemorrhage of gold flowing east along the same
            routes that carried silk west.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="silk-divider" />
        </FadeIn>

        <FadeIn>
          <span className="silk-era-marker silk-era-marker--byzantine">Byzantine Empire</span>
          <h3 className="silk-section-heading">The Heist</h3>
          <p className="silk-body">
            By the 6th century, the Byzantine Emperor Justinian I faced a crisis.
            The Persian Sassanid Empire controlled the western silk trade, acting
            as intermediaries between Chinese producers and Byzantine consumers —
            and charging ruinous prices. Justinian needed to break the monopoly.
            The opportunity arrived in the form of two unnamed monks.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="silk-quote silk-quote--byzantine">
            <p className="silk-quote__text">
              &ldquo;About the same time there came from India certain monks; and when
              they had satisfied Justinian Augustus that the Romans no longer should
              buy silk from the Persians, they promised the emperor in an interview
              that they would provide the materials for making silk so that never
              should the Romans seek business of this kind from their enemy the
              Persians, or from any other people whatsoever.&rdquo;
            </p>
            <div className="silk-quote__attribution">
              Procopius of Caesarea, <em>History of the Wars</em>, Book VIII, Chapter 17 (c. 550 CE)
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <p className="silk-body">
            The monks — likely Nestorian Christians who had lived in Central Asia
            — promised Justinian they could smuggle silkworm eggs out of China.
            They traveled east, acquired the eggs (scholars debate whether from
            China proper or from Khotan), and concealed them in hollow bamboo
            canes. They returned to Constantinople. The eggs hatched. Byzantium
            had its own silkworms.
          </p>
        </FadeIn>

        <FadeIn>
          <p className="silk-body">
            China&apos;s three-thousand-year monopoly — protected by death
            penalty, enforced by border guards, sustained by the world&apos;s most
            sophisticated secret-keeping apparatus — was broken by two anonymous
            men and a bamboo cane. Their names were never recorded. It is one of
            history&apos;s most consequential anonymous acts.
          </p>
        </FadeIn>

        <FigureProfile
          name="Justinian I"
          dates="482–565 CE"
          role="Byzantine Emperor who broke China's silk monopoly"
          quote="They said that they were formerly in Serinda, and that while they were living there they had learned the whole art of making silk."
          quoteSource="Procopius, History of the Wars"
        />

        <FadeIn>
          <div className="silk-divider" />
        </FadeIn>

        <FadeIn>
          <h3 className="silk-section-heading">Islamic Silk</h3>
          <p className="silk-body">
            The Islamic conquests of the 7th and 8th centuries brought silk
            production to Damascus, Baghdad, and Córdoba. Islamic artisans
            developed a distinctive silk aesthetic — the tiraz tradition, in which
            Arabic calligraphy was woven directly into silk fabric, merging text
            and textile into a single art form. The English word &ldquo;damask&rdquo;
            derives from Damascus, where some of the finest Islamic silks were
            produced.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── IV. MODERN ECHO ─── */
function MovementModern() {
  return (
    <section className="silk-movement silk-movement--modern" aria-label="Modern Echo: The Machine and the Mystery">
      <div className="silk-content-col">
        <FadeIn>
          <span className="silk-era-marker silk-era-marker--europe">European Silk</span>
          <h2 className="silk-movement-title">The Machine and the Mystery</h2>
          <p className="silk-movement-subtitle">Jacquard → Computing → Jim Thompson, 1804 – Present</p>
        </FadeIn>

        <FadeIn>
          <h3 className="silk-section-heading">The Punch Card Revolution</h3>
          <p className="silk-body silk-drop-cap">
            In 1804, a Lyon silk weaver named Joseph Marie Jacquard perfected a
            mechanism that would change far more than textiles. His loom used
            interchangeable punch cards — each card encoding one row of a woven
            pattern. Stack the cards: program the loom. Change the cards: change
            the pattern. It was the first programmable machine.
          </p>
        </FadeIn>

        <FigureProfile
          name="Joseph Marie Jacquard"
          dates="1752–1834"
          role="French weaver who invented the programmable loom"
          quote="It is the invention which weaves flowered silks, in a style far superior to anything that was done before."
          quoteSource="British government report, 1812"
        />

        <FadeIn>
          <p className="silk-body">
            Jacquard demonstrated the loom&apos;s power with one of history&apos;s
            great flex moves: a silk self-portrait, woven using 24,000 punch
            cards. Charles Babbage obtained a copy and hung it in his study. It
            directly inspired his design for the Analytical Engine. Ada Lovelace
            made the connection explicit:
          </p>
        </FadeIn>

        <FadeIn>
          <div className="silk-quote silk-quote--crimson">
            <p className="silk-quote__text">
              &ldquo;The Analytical Engine weaves algebraic patterns just as the
              Jacquard loom weaves flowers and leaves.&rdquo;
            </p>
            <div className="silk-quote__attribution">
              Ada Lovelace, Notes on the Analytical Engine (1843)
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <p className="silk-body">
            The technical lineage is direct, not metaphorical: Jacquard&apos;s
            punch cards → Babbage&apos;s Analytical Engine → Hollerith&apos;s
            census machine → IBM → the computer in your pocket. Silk literally
            helped birth the information age.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="silk-divider" />
        </FadeIn>

        <FadeIn>
          <h3 className="silk-section-heading">The Lyon Workers&apos; Revolt</h3>
          <p className="silk-body">
            By 1720, Lyon&apos;s silk industry employed over 28,000 workers. The
            silk that clothed kings was woven by hands that couldn&apos;t afford
            bread. In 1831, the Canuts — Lyon&apos;s silk workers — revolted
            under the banner: &ldquo;Vivre en travaillant ou mourir en
            combattant!&rdquo; <em>(Live working or die fighting!)</em>
          </p>
        </FadeIn>

        <FadeIn>
          <div className="silk-quote silk-quote--crimson">
            <p className="silk-quote__text">
              &ldquo;We work sixteen hours a day and yet we lack bread.&rdquo;
            </p>
            <div className="silk-quote__attribution">
              Lyon silk workers&apos; petition, 1831
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <p className="silk-body">
            The revolt was brutally suppressed. A second followed in 1834. The
            Canut revolts are considered a founding moment of the industrial labor
            movement — workers producing the world&apos;s most luxurious fabric,
            demanding the most basic human dignity.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="silk-divider" />
        </FadeIn>

        <FadeIn>
          <span className="silk-era-marker silk-era-marker--modern">20th Century</span>
          <h3 className="silk-section-heading">The American Spy Who Saved Thai Silk</h3>
          <p className="silk-body">
            Jim Thompson was an American architect who served in the OSS (the
            CIA&apos;s predecessor) during World War II. After the war, he settled
            in Bangkok and found the Thai silk industry in terminal decline —
            traditional weavers were abandoning hand looms for cheaper synthetic
            fibers. Thompson saw what they couldn&apos;t: a global market hungry
            for exactly what they made.
          </p>
        </FadeIn>

        <FigureProfile
          name="Jim Thompson"
          dates="1906–1967 (presumed dead)"
          role="American who revived Thai silk, then vanished"
          quote="Thai silk was dying when I arrived. The weavers were switching to synthetic threads. I simply showed them the world still wanted what they made."
          quoteSource="attributed, via William Warren biography"
        />

        <FadeIn>
          <p className="silk-body">
            Thompson single-handedly created a global luxury brand from hand-woven
            Thai silk. He modernized production methods while preserving
            traditional weaving techniques. International designers came to
            Bangkok. Thai silk appeared in Hollywood costumes and New York fashion
            houses. Thompson&apos;s house — a stunning assemblage of six
            traditional Thai houses — became a cultural landmark.
          </p>
        </FadeIn>

        <FadeIn>
          <p className="silk-body">
            On March 26, 1967, while on holiday in the Cameron Highlands of
            Malaysia, Jim Thompson went for an afternoon walk and was never seen
            again. His body was never found. The theories multiply: a tiger
            attack, abduction by Communist agents, a CIA operation gone wrong, a
            staged disappearance. None has been confirmed. His house in Bangkok is
            now a museum, surrounded by silk.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="silk-divider" />
        </FadeIn>

        <FadeIn>
          <h3 className="silk-section-heading">The Thread Today</h3>
          <p className="silk-body">
            Five thousand years after Neolithic villagers first cultivated{' '}
            <em>Bombyx mori</em>, China still produces approximately 80% of the
            world&apos;s raw silk. India produces most of the remainder. The
            global silk market was valued at approximately $16.9 billion in 2023.
            The same caterpillar, the same mulberry leaf, the same shimmering
            thread — now also used in medical sutures, biocompatible scaffolds,
            and experimental spider-silk synthesis.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── V. REVELATION ─── */
function MovementRevelation() {
  return (
    <section className="silk-movement silk-movement--revelation" aria-label="Revelation: The Thread That Remains">
      <div className="silk-content-col">
        <FadeIn>
          <h2 className="silk-movement-title" style={{ color: 'var(--silk-gold)' }}>
            The Thread That Remains
          </h2>
          <div className="silk-divider silk-divider--light" />
        </FadeIn>

        <FadeIn>
          <p className="silk-body silk-body--revelation">
            A single filament of silk is one twenty-fifth the diameter of a human
            hair. Under a scanning electron microscope, its cross-section reveals
            a triangular shape — and it is this geometry, not dye or treatment,
            that gives silk its shimmer. Light enters the fiber, refracts through
            the triangular prism, and exits as a spectrum. The shimmer you see in
            a silk scarf is the same physics that caught firelight in a Neolithic
            Chinese village eight thousand years ago.
          </p>
        </FadeIn>

        <FadeIn>
          <p className="silk-body silk-body--revelation">
            China discovered silk around 6500 BCE. China still makes 80% of the
            world&apos;s silk. That is the longest-running economic dominance in
            human history. The mulberry tree still grows. The silkworm still
            spins. The thread still shimmers. But now it runs through the history
            of espionage, the history of computing, the history of labor, the
            history of empire, the history of fashion — and one unsolved mystery
            in a Malaysian jungle.
          </p>
        </FadeIn>

        <FadeIn>
          <TimefoldSlider />
        </FadeIn>

        <FadeIn>
          <div className="silk-divider silk-divider--light" />
        </FadeIn>

        <FadeIn>
          <p className="silk-body silk-body--revelation" style={{ textAlign: 'center', fontStyle: 'italic', fontSize: '1.25rem', color: 'var(--silk-gold)' }}>
            The caterpillar spins in darkness.
            <br />
            It does not know it is making civilization.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Bibliography ─── */
function Bibliography() {
  return (
    <section className="silk-movement silk-movement--ancestral" aria-label="Bibliography">
      <div className="silk-content-col">
        <div className="silk-bibliography">
          <h2 className="silk-bibliography__title">Sources</h2>
          <ul className="silk-bibliography__list">
            {BIBLIOGRAPHY.map((source) => (
              <li key={source.id} className="silk-bibliography__item">
                <span className="silk-bibliography__id">{source.id}</span>
                {source.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function SilkClient() {
  return (
    <article className="silk-essay">
      <MovementInvocation />
      <MovementAncestral />
      <MovementCollision />
      <MovementModern />
      <MovementRevelation />
      <Bibliography />
    </article>
  );
}
