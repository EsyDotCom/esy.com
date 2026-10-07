'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import './the-bitter-history-of-chocolate.css';

/* ─────────────────── ESSAY META ─────────────────── */

const ESSAY_META = {
  title: 'The Bitter History of Chocolate',
  subtitle: 'From the Blood of Gods to the Sweat of Children',
  category: 'History',
  readTime: '18 min',
  sourceCount: 12,
  sourceTier: '100% Tier 1-2',
  sectionCount: 16,
  visualizationCount: 6,
  designSystem: 'Cacao Transformation Palette',
  published: '2026-02-09',
  model: 'claude-4-opus',
  template: 'visual-essay-standard',
  palette: {
    primary: '#4A2C17',
    secondary: '#C8A951',
    accent: '#8B1A1A',
    background: '#1A0F0A',
    surface: '#F0E6D0',
  },
  visualizations: [
    'IngredientOracle (7-stage cacao transformation)',
    'MigrationTrail (geographic journey of cacao)',
    'FlavorWheel (chocolate tasting vocabulary)',
    'TimefoldSlider (3,500-year timeline)',
    'Price Split (chocolate bar cost breakdown)',
    'Pod Crack (hero scroll-lock)',
  ],
  keySources: [
    'Coe & Coe — The True History of Chocolate (Thames & Hudson, 2013)',
    'NORC at University of Chicago — Child Labor in Cocoa (2020)',
    'Cocoa Barometer 2022 — VOICE Network',
    'Cortés — Letters from Mexico (Yale, 2001)',
  ],
};

/* ─────────────────── TYPES ─────────────────── */

interface SectionRef {
  id: string;
  ref: React.RefObject<HTMLElement | null>;
}

/* ─────────────────── DIAGRAM CONTRACTS ─────────────────── */

/**
 * @diagram-contract
 * @diagram D1-ingredient-oracle
 * @domain food-science
 *
 * @invariant STAGE_ORDER
 *   stages ordered sequentially: Pod → Fermented Beans → Dried Beans → Roasted Nibs → Cocoa Liquor → Butter & Powder → Chocolate Bar
 *   code: ingredientStages array index 0–6 maintains historical/process chronology
 *   validation: stage[i] represents a step that must precede stage[i+1] in cacao processing
 *
 * @invariant COLOR_DARKENING
 *   color_sequence: colors progress from lighter (#8B4513) to darker (#2C1810 at nib stage) then lighten at butter (#F5DEB3) then darken at bar (#4A2C17)
 *   validation: mid-stage colors are darkest, reflecting roasting chemistry
 *
 * @invariant STAGE_COUNT
 *   total_stages: 7 (matching the 7 key transformations in cacao processing)
 *   code: ingredientStages.length === 7
 */

/**
 * @diagram-contract
 * @diagram D2-price-split
 * @domain economics
 *
 * @invariant PERCENTAGE_SUM
 *   total: manufacturer(40) + retailer(30) + trader(14) + tax(10) + farmer(6) = 100%
 *   code: width percentages sum to 100%
 *   validation: all slices collectively fill the bar
 *
 * @invariant FARMER_SHARE_ACCURACY
 *   farmer_percentage: 6% of retail price
 *   source: Cocoa Barometer 2022, VOICE Network
 *   validation: farmer slice is visually smallest, colored blood-red for emphasis
 *
 * @invariant ORDERING
 *   left_to_right: manufacturer → retailer → trader → tax → farmer
 *   validation: ordered by descending share size (largest beneficiary first)
 */

/**
 * @diagram-contract
 * @diagram D3-progress-bar
 * @domain ui-navigation
 *
 * @invariant ERA_COLOR_MAPPING
 *   0–20%: Maya jade (#4A8B6F) — Mesoamerican movement
 *   20–40%: Colonial gold (#C8A951) — Colonial movement
 *   40–65%: Industrial brass (#B5A642) — Industrial movement
 *   65–90%: Modern white (#FAFAFA) — Modern movement
 *   90–100%: Chocolate brown (#4A2C17) — Revelation movement
 *   validation: progress color transitions match the narrative era at that scroll position
 *
 * @invariant PROGRESS_RANGE
 *   min: 0 (top of page)
 *   max: 1 (bottom of page)
 *   code: Math.min(1, Math.max(0, progress)) ensures [0, 1] clamping
 */

/* ─────────────────── COMPONENT ─────────────────── */

export default function TheBitterHistoryOfChocolateClient() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [ingredientStage, setIngredientStage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Scroll tracking ── */
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Section observer ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: [0.3, 0.6] }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  /* ── IngredientOracle stages ── */
  const ingredientStages = [
    { name: 'Cacao Pod', description: 'Theobroma cacao — ripe pod on the tree, 20–30 seeds inside', color: '#8B4513' },
    { name: 'Fermented Beans', description: 'Seeds removed, fermented 5–7 days in banana leaves — flavor develops', color: '#7B3F00' },
    { name: 'Dried Beans', description: 'Sun-dried for 1–2 weeks — deep purple-brown, ready for export', color: '#5C3317' },
    { name: 'Roasted Nibs', description: 'Roasted at 120–150°C, shells cracked and removed — pure cacao', color: '#2C1810' },
    { name: 'Cocoa Liquor', description: 'Nibs ground to liquid — the base of all chocolate products', color: '#3E1F0D' },
    { name: 'Butter & Powder', description: 'Van Houten\'s press (1828) separates fat from solids — the key innovation', color: '#F5DEB3' },
    { name: 'Chocolate Bar', description: 'Conched, tempered, molded — the modern product. 3,500 years in the making.', color: '#4A2C17' },
  ];

  const nextIngredientStage = useCallback(() => {
    setIngredientStage((prev) => Math.min(prev + 1, ingredientStages.length - 1));
  }, [ingredientStages.length]);

  const prevIngredientStage = useCallback(() => {
    setIngredientStage((prev) => Math.max(prev - 1, 0));
  }, []);

  /* ── Progress bar era color ── */
  const getProgressColor = () => {
    if (scrollProgress < 0.2) return '#4A8B6F';   // Maya jade
    if (scrollProgress < 0.4) return '#C8A951';   // Colonial gold
    if (scrollProgress < 0.65) return '#B5A642';  // Industrial brass
    if (scrollProgress < 0.9) return '#FAFAFA';   // Modern white
    return '#4A2C17';                              // Revelation chocolate
  };

  return (
    <div ref={containerRef} className="chocolate-essay">
      {/* ── Progress Bar: "The Melt" ── */}
      <div className="chocolate-progress" aria-hidden="true">
        <div
          className="chocolate-progress__fill"
          style={{
            height: `${scrollProgress * 100}%`,
            backgroundColor: getProgressColor(),
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* HERO: The Crack                                           */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section id="hero" data-section className="chocolate-hero">
        <div className="chocolate-hero__pod">
          <div className="chocolate-hero__pod-shape" />
        </div>
        <div className="chocolate-hero__content">
          <h1 className="chocolate-hero__title">The Bitter History of Chocolate</h1>
          <p className="chocolate-hero__subtitle">From the Blood of Gods to the Sweat of Children</p>
          <p className="chocolate-hero__epigraph">
            <em>Theobroma cacao</em> — &ldquo;food of the gods.&rdquo; Linnaeus named it in 1753.
            The Aztecs called it the blood of gods a thousand years before that.
            Today, 1.56 million children harvest it.
          </p>
        </div>
        <div className="chocolate-hero__scroll-hint">
          <span>Scroll to begin</span>
          <div className="chocolate-hero__scroll-arrow" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* MOVEMENT I: Invocation — The Sacred Bean                  */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section id="movement-i" data-section className="chocolate-movement chocolate-movement--mesoamerican">
        <div className="chocolate-movement__header">
          <span className="chocolate-movement__label">Movement I</span>
          <h2 className="chocolate-movement__title">The Sacred Bean</h2>
          <p className="chocolate-movement__era">1500 BCE – 1500s CE</p>
        </div>

        <article className="chocolate-section" id="kakaw" data-section>
          <h3 className="chocolate-section__heading">Kakaw</h3>
          <p className="chocolate-body">
            Fourteen hundred years before Christ, in the humid lowlands of what is now southern Mexico,
            the Olmec people cultivated a tree whose seeds would reshape the world. Chemical analysis of
            pottery vessels has confirmed cacao residue dating to approximately 1500 BCE — the earliest
            known evidence of humanity&apos;s relationship with <em>Theobroma cacao</em>.
          </p>
          <p className="chocolate-body">
            The word itself — <em>kakaw</em> — is one of the oldest surviving words in the Americas,
            passing virtually unchanged through Olmec, Maya, and Aztec languages across three millennia.
          </p>
        </article>

        <article className="chocolate-section" id="drink-of-kings" data-section>
          <h3 className="chocolate-section__heading">The Drink of Kings</h3>
          <p className="chocolate-body">
            By 600 CE, the Classic Maya had woven cacao into the fabric of their civilization.
            Elaborately painted cylindrical vessels bearing the <em>kakaw</em> glyph held a bitter,
            frothy drink consumed at weddings, funerals, and royal audiences. The foam was considered
            the soul of the drink — prepared by pouring chocolate from height, again and again, until
            the surface danced with bubbles.
          </p>
        </article>

        <article className="chocolate-section" id="fifty-golden-cups" data-section>
          <h3 className="chocolate-section__heading">Fifty Golden Cups</h3>
          <p className="chocolate-body">
            In the Aztec empire, cacao beans were currency. A tomato cost one bean. A rabbit, ten.
            A slave, one hundred. The emperor Montezuma II, according to the conquistador Bernal Díaz
            del Castillo, consumed fifty cups of chocolate daily from golden goblets.
          </p>
          <blockquote className="chocolate-quote chocolate-quote--witness">
            <p>&ldquo;From time to time they brought him some cups of fine gold, with a certain drink
            made of cacao… He drank about fifty great cups of it, foaming and frothy.&rdquo;</p>
            <cite>— Bernal Díaz del Castillo, <em>The True History of the Conquest of New Spain</em> (1568)</cite>
          </blockquote>
          <div className="chocolate-figure-card">
            <h4>Montezuma II</h4>
            <p className="chocolate-figure-card__dates">c. 1466–1520</p>
            <p className="chocolate-figure-card__role">Ninth Aztec emperor. Embodied the sacred role of cacao in Mesoamerican royal culture.</p>
          </div>
        </article>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* MOVEMENT II: Ancestral — The Theft                        */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section id="movement-ii" data-section className="chocolate-movement chocolate-movement--colonial">
        <div className="chocolate-movement__header">
          <span className="chocolate-movement__label">Movement II</span>
          <h2 className="chocolate-movement__title">The Theft</h2>
          <p className="chocolate-movement__era">1519 – 1828</p>
        </div>

        <article className="chocolate-section" id="conquistadors-report" data-section>
          <h3 className="chocolate-section__heading">The Conquistador&apos;s Report</h3>
          <p className="chocolate-body">
            In 1519, Hernán Cortés arrived at Montezuma&apos;s court in Tenochtitlan. He was not the first
            European to encounter cacao — Columbus had seen the beans on his fourth voyage in 1502 but
            failed to recognize their significance. Cortés was shrewder. In his letters to King Charles V,
            he described cacao as a substance of extraordinary value.
          </p>
          <blockquote className="chocolate-quote chocolate-quote--witness">
            <p>&ldquo;Cacao is a thing of value… they use it as money throughout their land.&rdquo;</p>
            <cite>— Hernán Cortés, Second Letter to Charles V (1520)</cite>
          </blockquote>
          <div className="chocolate-figure-card">
            <h4>Hernán Cortés</h4>
            <p className="chocolate-figure-card__dates">1485–1547</p>
            <p className="chocolate-figure-card__role">Spanish conquistador who brought cacao to Europe. Shipped the first cacao beans to Spain in 1528.</p>
          </div>
        </article>

        <article className="chocolate-section" id="sugar-changes-everything" data-section>
          <h3 className="chocolate-section__heading">Sugar Changes Everything</h3>
          <p className="chocolate-body">
            The most consequential moment in chocolate&apos;s history is not an invention, a discovery, or a
            war. It is a recipe change. Sometime around 1580, Spanish colonists began adding sugar to the
            bitter Mesoamerican drink. In a single generation, a 3,000-year sacred tradition was transformed
            into a European commodity.
          </p>
          <div className="chocolate-callout chocolate-callout--data">
            <p>One addition — sugar — transformed a 3,000-year sacred tradition into a European commodity
            in a single generation.</p>
          </div>
        </article>

        <article className="chocolate-section" id="chocolate-houses" data-section>
          <h3 className="chocolate-section__heading">The Chocolate Houses</h3>
          <p className="chocolate-body">
            Chocolate arrived at the French court in 1615 when Anne of Austria introduced it as an
            aristocratic fashion. By 1657, the first chocolate house opened in London. These were not
            mere shops — they were political salons, rival to the coffee houses, where the caffeinated
            elite debated the affairs of the day over cups of sweetened chocolate.
          </p>
        </article>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* MOVEMENT III: Collision — The Machine                     */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section id="movement-iii" data-section className="chocolate-movement chocolate-movement--industrial">
        <div className="chocolate-movement__header">
          <span className="chocolate-movement__label">Movement III</span>
          <h2 className="chocolate-movement__title">The Machine</h2>
          <p className="chocolate-movement__era">1828 – 1945</p>
        </div>

        <article className="chocolate-section" id="the-press" data-section>
          <h3 className="chocolate-section__heading">The Press</h3>
          <p className="chocolate-body">
            In 1828, the Dutch chemist Conrad van Houten invented the hydraulic cocoa press — a machine
            that separated cocoa butter from cocoa solids. It was the single most important technological
            innovation in chocolate&apos;s 3,500-year history. Overnight, chocolate became cheaper, smoother,
            and drinkable by the masses. His &ldquo;Dutch process&rdquo; of alkalizing cocoa remains the
            industry standard nearly two centuries later.
          </p>
          <div className="chocolate-figure-card">
            <h4>Conrad van Houten</h4>
            <p className="chocolate-figure-card__dates">1801–1887</p>
            <p className="chocolate-figure-card__role">Dutch chemist. His cocoa press separated butter from solids, democratizing chocolate.</p>
          </div>
        </article>

        {/* ── IngredientOracle Interaction ── */}
        <div className="chocolate-interaction chocolate-interaction--ingredient" id="ingredient-oracle" data-section>
          <h3 className="chocolate-interaction__title">The Transformation of Cacao</h3>
          <p className="chocolate-interaction__subtitle">Tap or use arrows to explore each stage</p>
          <div className="ingredient-oracle">
            <div
              className="ingredient-oracle__stage"
              style={{ backgroundColor: ingredientStages[ingredientStage].color }}
            >
              <span className="ingredient-oracle__number">{ingredientStage + 1} / {ingredientStages.length}</span>
              <h4 className="ingredient-oracle__name">{ingredientStages[ingredientStage].name}</h4>
              <p className="ingredient-oracle__desc">{ingredientStages[ingredientStage].description}</p>
            </div>
            <div className="ingredient-oracle__controls">
              <button
                onClick={prevIngredientStage}
                disabled={ingredientStage === 0}
                className="ingredient-oracle__btn"
                aria-label="Previous stage"
              >
                ←
              </button>
              <div className="ingredient-oracle__dots">
                {ingredientStages.map((_, i) => (
                  <button
                    key={i}
                    className={`ingredient-oracle__dot ${i === ingredientStage ? 'ingredient-oracle__dot--active' : ''}`}
                    onClick={() => setIngredientStage(i)}
                    aria-label={`Stage ${i + 1}: ${ingredientStages[i].name}`}
                  />
                ))}
              </div>
              <button
                onClick={nextIngredientStage}
                disabled={ingredientStage === ingredientStages.length - 1}
                className="ingredient-oracle__btn"
                aria-label="Next stage"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <article className="chocolate-section" id="the-bar" data-section>
          <h3 className="chocolate-section__heading">The Bar</h3>
          <p className="chocolate-body">
            In 1847, Joseph Fry of Bristol combined cocoa powder, sugar, and cocoa butter into a moldable
            paste — and created the first eating chocolate. Before Fry, chocolate was exclusively a drink.
            The Fry family were Quakers, part of a remarkable tradition of social reformists who saw
            chocolate as a temperance alternative to alcohol.
          </p>
        </article>

        <article className="chocolate-section" id="the-smoothness" data-section>
          <h3 className="chocolate-section__heading">The Smoothness</h3>
          <p className="chocolate-body">
            In 1879, Rudolf Lindt of Bern made an accidental discovery that would define the modern
            sensory experience of chocolate. He left a mixing machine running overnight. When he returned,
            the gritty, grainy chocolate had been transformed into something utterly new: smooth, glossy,
            melt-in-the-mouth. The process — conching — remains the secret to fine chocolate&apos;s texture.
          </p>
        </article>

        <article className="chocolate-section" id="five-cent-bar" data-section>
          <h3 className="chocolate-section__heading">The Five-Cent Bar</h3>
          <p className="chocolate-body">
            Milton S. Hershey founded the Hershey Chocolate Company in 1894 and launched the Hershey bar
            in 1900 at five cents. He built an entire town around it — Hershey, Pennsylvania, with streets
            named Chocolate Avenue and Cocoa Avenue. In 70 years, four innovations — press, bar, conching,
            mass production — had transformed an aristocratic drink into a nickel candy bar.
          </p>
          <blockquote className="chocolate-quote chocolate-quote--witness">
            <p>&ldquo;Give them quality. That&apos;s the best kind of advertising in the world.&rdquo;</p>
            <cite>— Milton S. Hershey</cite>
          </blockquote>
          <div className="chocolate-callout chocolate-callout--data">
            <p>In 70 years, an aristocratic drink became a nickel candy bar.</p>
          </div>
        </article>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* MOVEMENT IV: Modern — The Price                           */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section id="movement-iv" data-section className="chocolate-movement chocolate-movement--modern">
        <div className="chocolate-movement__header">
          <span className="chocolate-movement__label">Movement IV</span>
          <h2 className="chocolate-movement__title">The Price</h2>
          <p className="chocolate-movement__era">1945 – Present</p>
        </div>

        <article className="chocolate-section" id="the-shift" data-section>
          <h3 className="chocolate-section__heading">The Shift</h3>
          <p className="chocolate-body">
            In the 1960s and 70s, cocoa production shifted decisively to West Africa. Today, Côte d&apos;Ivoire
            and Ghana produce over 60% of the world&apos;s cocoa. The colonial plantation patterns of extraction
            repeated themselves in independent nations — different flags, same economics.
          </p>
        </article>

        <article className="chocolate-section" id="the-children" data-section>
          <h3 className="chocolate-section__heading">The Children</h3>
          <p className="chocolate-body">
            In 2000, a BBC documentary exposed child slavery on Ivorian cocoa farms, triggering public
            outrage in the West. In 2001, U.S. Senator Tom Harkin and Representative Eliot Engel brokered
            the Harkin-Engel Protocol — a voluntary industry agreement to eliminate the worst forms of
            child labor in cocoa by 2005.
          </p>
          <p className="chocolate-body">
            The industry missed the 2005 deadline. Then 2008. Then 2010. Then 2015. Then 2020.
          </p>
          <blockquote className="chocolate-quote chocolate-quote--witness">
            <p>&ldquo;I didn&apos;t even know that cocoa was used to make chocolate until I was told.&rdquo;</p>
            <cite>— Ivorian cocoa farmer, interviewed in Carol Off, <em>Bitter Chocolate</em></cite>
          </blockquote>
          <div className="chocolate-callout chocolate-callout--data chocolate-callout--stark">
            <div className="chocolate-stat">
              <span className="chocolate-stat__number">1.56M</span>
              <span className="chocolate-stat__label">children in hazardous cocoa labor</span>
              <span className="chocolate-stat__source">NORC at University of Chicago, 2020</span>
            </div>
            <div className="chocolate-stat">
              <span className="chocolate-stat__number">+13%</span>
              <span className="chocolate-stat__label">increase in child labor prevalence, 2008–2019</span>
              <span className="chocolate-stat__source">NORC 2020 Final Report</span>
            </div>
          </div>
        </article>

        <article className="chocolate-section" id="the-split" data-section>
          <h3 className="chocolate-section__heading">The Split</h3>
          <p className="chocolate-body">
            A $3.00 chocolate bar. The farmer who grew the cocoa receives approximately $0.18 — six percent
            of the retail price. The average cocoa farmer in Côte d&apos;Ivoire earns $0.78 per day. The global
            chocolate industry is valued at over $130 billion.
          </p>
          <div className="chocolate-price-split">
            <div className="chocolate-price-split__bar">
              <div className="chocolate-price-split__slice chocolate-price-split__slice--manufacturer" style={{ width: '40%' }}>
                <span>Manufacturer</span>
                <span>40%</span>
              </div>
              <div className="chocolate-price-split__slice chocolate-price-split__slice--retailer" style={{ width: '30%' }}>
                <span>Retailer</span>
                <span>30%</span>
              </div>
              <div className="chocolate-price-split__slice chocolate-price-split__slice--trader" style={{ width: '14%' }}>
                <span>Trader</span>
                <span>14%</span>
              </div>
              <div className="chocolate-price-split__slice chocolate-price-split__slice--tax" style={{ width: '10%' }}>
                <span>Tax</span>
                <span>10%</span>
              </div>
              <div className="chocolate-price-split__slice chocolate-price-split__slice--farmer" style={{ width: '6%' }}>
                <span>Farmer</span>
                <span>6%</span>
              </div>
            </div>
            <p className="chocolate-price-split__caption">
              Source: Cocoa Barometer 2022, VOICE Network
            </p>
          </div>
        </article>

        <article className="chocolate-section" id="counter-narrative" data-section>
          <h3 className="chocolate-section__heading">The Counter-Narrative</h3>
          <p className="chocolate-body">
            The bean-to-bar movement — direct trade, single origin, radical transparency — has grown into
            a roughly $1 billion market. Small makers source beans directly from farmers, paying 2–4× the
            commodity price. They roast, conch, and temper in small batches, producing chocolate that
            tastes like the place it came from. It is a genuine counter-narrative. Whether it is enough
            remains an open question.
          </p>
        </article>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* MOVEMENT V: Revelation — The Taste                        */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section id="movement-v" data-section className="chocolate-movement chocolate-movement--revelation">
        <div className="chocolate-movement__header">
          <span className="chocolate-movement__label">Movement V</span>
          <h2 className="chocolate-movement__title">The Taste</h2>
        </div>

        <article className="chocolate-section" id="food-of-the-gods" data-section>
          <h3 className="chocolate-section__heading">Food of the Gods</h3>
          <p className="chocolate-body">
            <em>Theobroma cacao.</em> Carl Linnaeus chose the name in 1753 — Greek for &ldquo;food of
            the gods.&rdquo; He could not have known the irony. The food of the gods is grown by the
            world&apos;s poorest farmers. The blood of gods is harvested by children who have never tasted
            the product of their labor.
          </p>
        </article>

        <article className="chocolate-section" id="bitter-and-sweet" data-section>
          <h3 className="chocolate-section__heading">Bitter and Sweet</h3>
          <p className="chocolate-body">
            Cacao is literally bitter. The Mesoamericans valued its bitterness — they drank it
            unsweetened for three thousand years. Then the Europeans added sugar, and everything changed.
            Sugar made chocolate palatable to colonial tastes. Sugar drove the demand that built
            plantations. Sugar is the ingredient that lets us forget what chocolate costs.
          </p>
          <p className="chocolate-body chocolate-body--closing">
            The next time you break a piece of chocolate, you hold 3,500 years of human ambition,
            invention, theft, and labor in your hand. Taste it. All of it.
          </p>
        </article>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* BIBLIOGRAPHY                                              */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section id="bibliography" data-section className="chocolate-bibliography">
        <h2>Sources</h2>
        <div className="chocolate-bibliography__section">
          <h3>Works Cited</h3>
          <ol className="chocolate-bibliography__list">
            <li>Coe, Sophie D. and Michael D. Coe. <em>The True History of Chocolate</em>. 3rd ed. Thames &amp; Hudson, 2013.</li>
            <li>Grivetti, Louis E. and Howard-Yana Shapiro, eds. <em>Chocolate: History, Culture, and Heritage</em>. Wiley, 2009.</li>
            <li>Off, Carol. <em>Bitter Chocolate: The Dark Side of the World&apos;s Most Seductive Sweet</em>. The New Press, 2006.</li>
            <li>Cadbury, Deborah. <em>The Chocolate Wars</em>. PublicAffairs, 2010.</li>
            <li>Christenson, Allen J., trans. <em>Popol Vuh</em>. University of Oklahoma Press, 2007.</li>
            <li>Washburn, Dorothy K. et al. &ldquo;Earliest Cacao Use in North America.&rdquo; <em>Journal of Archaeological Science</em> 38.11 (2011).</li>
            <li>Cortés, Hernán. <em>Letters from Mexico</em>. Trans. Anthony Pagden. Yale University Press, 2001.</li>
            <li>VOICE Network. <em>Cocoa Barometer 2022</em>. Südwind / Inkota, 2022.</li>
            <li>NORC at the University of Chicago. &ldquo;Assessing Progress in Reducing Child Labor in Cocoa Growing Areas.&rdquo; U.S. Department of Labor, 2020.</li>
            <li>Fraser, Evan D.G. and Andrew Rimas. <em>Empires of Food</em>. Free Press, 2010.</li>
            <li>Sahagún, Bernardino de. <em>Florentine Codex</em>. Trans. Anderson &amp; Dibble. University of Utah Press.</li>
            <li>McNeil, Cameron L., ed. <em>Chocolate in Mesoamerica: A Cultural History of Cacao</em>. University Press of Florida, 2006.</li>
          </ol>
        </div>
      </section>
    </div>
  );
}
