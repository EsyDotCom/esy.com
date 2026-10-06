"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import "./rock-and-roll.css";

// ==================== IMAGES ====================

const IMAGES = {
  sisterRosettaTharpe: "https://upload.wikimedia.org/wikipedia/commons/6/66/Sister_Rosetta_Tharpe_%281938_publicity_photo_with_guitar%29.jpg",
  louisJordan: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Louis_Jordan%2C_New_York%2C_N.Y.%2C_ca._July_1946_%28William_P._Gottlieb_04721%29.jpg",
  tBoneWalker: "https://upload.wikimedia.org/wikipedia/commons/e/ee/T-Bone_Walker_1972.jpg",
  fatsDomino: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Fats_Domino018.JPG",
  ikeTurner: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Ike_Turner_1971.jpg",
  alanFreed: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Alan_Freed_1957.JPG",
  leoFender: "https://upload.wikimedia.org/wikipedia/commons/a/af/FGF_museum_01._Leo_and_early_models.jpg",
  samPhillips: "https://upload.wikimedia.org/wikipedia/commons/1/18/Sun_Studio%2C_Memphis.jpg",
  earlPalmer: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Earl_Palmer.jpg",
  cosimoMatassa: "https://upload.wikimedia.org/wikipedia/commons/1/11/Cosimo_Matassa.jpg",
  elvisPresley: "https://upload.wikimedia.org/wikipedia/commons/9/99/Elvis_Presley_promoting_Jailhouse_Rock.jpg",
  jerryLeeLewis: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Jerry_Lee_Lewis_1950s_publicity_photo_cropped_retouched.jpg",
  chuckBerry: "https://upload.wikimedia.org/wikipedia/commons/2/20/Chuck_Berry_1957.jpg",
  muddyWaters: "https://upload.wikimedia.org/wikipedia/commons/6/64/Muddy_Waters.jpg",
  bigMamaThornton: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Blues_is_a_woman_Reitz_%28Big_Mama_Thornton%29.jpg",
  littleRichard: "https://upload.wikimedia.org/wikipedia/commons/5/50/Little_Richard_%281967%29.png",
  theBeatles: "https://upload.wikimedia.org/wikipedia/commons/d/d8/The_Beatles_members_at_New_York_City_in_1964.jpg",
  theRollingStones: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Rolling_Stones_1965.jpg",
  caetanoVeloso: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Caetano_Veloso_%28cropped%29.jpg",
  theRamones: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Ramones_Toronto_1976.jpg",
  kurtCobain: "https://upload.wikimedia.org/wikipedia/commons/3/37/Nirvana_around_1992_%28cropped%29.jpg",
  joanJett: "https://upload.wikimedia.org/wikipedia/commons/5/50/Joan_Jett_2013.jpg",
  janisJoplin: "https://upload.wikimedia.org/wikipedia/commons/9/92/Janis_Joplin_1970.JPG",
  georgeMartin: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Beatles_and_George_Martin_in_studio_1966.JPG",
  ruthBrown: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Ruth_Brown_cropped.jpg",
  tinaTurnerRevue: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Ike_%26_Tina_Turner%2C_Bestanddeelnr_924-2170_-_Restoration.jpg",
  tinaTurnerSolo: "https://upload.wikimedia.org/wikipedia/commons/8/86/Tina_Turner_1985.jpg",
  // Expanded Chapter 12 figures
  maRainey: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Ma_Rainey_%281917_publicity_photo%29.jpg",
  bessieSmith: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Bessie_Smith_%281936%29_by_Carl_Van_Vechten.jpg",
  lavernBaker: "https://upload.wikimedia.org/wikipedia/commons/0/01/LaVern_Baker_1956.jpg",
  ettaJames: "https://upload.wikimedia.org/wikipedia/commons/9/93/Etta_James.jpg",
  wandaJackson: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Wanda_Jackson-1958.jpg",
  arethaFranklin: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Aretha_Franklin_1968.jpg",
  graceSlick: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Grace_Slick_1977.JPG",
  ronnieSpector: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Ronnie_Spector_1966.jpg",
  heart: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nancy_and_Ann_Wilson.jpg",
  pattiSmith: "https://upload.wikimedia.org/wikipedia/commons/8/80/Patti_Smith_performing_in_Finland%2C_2007.jpg",
  debbyHarry: "https://upload.wikimedia.org/wikipedia/commons/3/32/Debbie_Harry_in_1977.jpg",
  stevieNicks: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Stevie_Nicks_2.jpg",
  suziQuatro: "https://upload.wikimedia.org/wikipedia/commons/8/87/Suzi_Quatro_-_Pair_of_45%27s_%28remastered%29_%28cropped%29.png",
  patBenatar: "https://upload.wikimedia.org/wikipedia/commons/0/0a/PAT_BENATAR_2007-09-07_%28cropped%29.jpg",
  goGos: "https://upload.wikimedia.org/wikipedia/commons/a/a1/The_Go_Gos_in_2012.jpg",
  chrissieHynde: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Chrissie_Hynde_%282021%29_%28cropped%29.jpg",
  kathleenHanna: "https://upload.wikimedia.org/wikipedia/commons/0/02/Kathleen_Hanna_2013.jpg",
  courtneyLove: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Courtney_Love_1995.jpg",
  pjHarvey: "https://upload.wikimedia.org/wikipedia/commons/4/49/PJ_Harvey_in_2011.jpg",
} as const;

// ==================== TYPES ====================

type Era = "prerock" | "explosion" | "invasion" | "evolution" | "present";

interface Figure {
  name: string;
  epithet: string;
  dates: string;
  domains: string[];
  description: string;
  quote?: string;
  quoteContext?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageCredit?: string;
  featured?: boolean;
}

interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  era: Era;
  epigraph?: { text: string; attribution: string };
  contentWarning?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageCaption?: string;
  narrative: string[];
  figures: Figure[];
}

// ==================== HOOKS ====================

const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateProgress = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setProgress(docHeight > 0 ? scrolled / docHeight : 0);
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateProgress);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
};

const useHeroProgress = (heroRef: React.RefObject<HTMLElement | null>) => {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateProgress = () => {
      const hero = heroRef.current;
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const heroHeight = hero.offsetHeight;
      const scrolled = -rect.top;
      const newProgress = Math.min(Math.max(scrolled / (heroHeight * 0.6), 0), 1);
      setProgress(newProgress);
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateProgress);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroRef]);

  return progress;
};

// ==================== PROGRESS BAR ====================

const ProgressBar: React.FC<{ progress: number; chapters: Chapter[] }> = ({
  progress,
  chapters,
}) => {
  const fillHeight = `${Math.min(progress * 100, 100)}%`;
  const needleTop = `${Math.min(progress * 100, 100)}%`;

  return (
    <>
      {/* Desktop: Vertical left bar */}
      <aside className="rnr-progress" aria-hidden="true">
        <div className="rnr-progress__track">
          <div className="rnr-progress__fill" style={{ height: fillHeight }} />
          <div className="rnr-progress__needle" style={{ top: needleTop }} />
          <div className="rnr-progress__markers">
            {chapters.map((chapter, idx) => {
              const markerProgress = idx / (chapters.length - 1);
              return (
                <div
                  key={chapter.id}
                  className={`rnr-progress__marker ${
                    progress >= markerProgress ? "rnr-progress__marker--passed" : ""
                  }`}
                  data-era={chapter.era}
                  title={chapter.title}
                />
              );
            })}
          </div>
        </div>
      </aside>

      {/* Mobile: Horizontal bottom bar */}
      <div className="rnr-progress--mobile" aria-hidden="true">
        <div
          className="rnr-progress__fill"
          style={{ width: `${Math.min(progress * 100, 100)}%` }}
        />
      </div>
    </>
  );
};

// ==================== HERO SECTION ====================

const Hero: React.FC = () => {
  return (
    <header className="rnr-hero">
      <div className="rnr-hero__ambient" />

      {/* Hero content - visible immediately */}
      <div className="rnr-hero__content">
        <span className="rnr-hero__overline">A Visual History</span>
        <h1 className="rnr-hero__title">Rock & Roll</h1>
        <p className="rnr-hero__subtitle">The Noise That Remade the World</p>
      </div>

      {/* Scroll hint */}
      <div className="rnr-hero__scroll-hint">
        <span className="rnr-hero__scroll-text">Scroll</span>
        <div className="rnr-hero__scroll-line" />
      </div>
    </header>
  );
};

// ==================== CONVERGENCE SECTION ====================

interface StreamPosition {
  x: number;
  y: number;
  opacity: number;
}

const ConvergenceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Progress from 0 (section entering viewport) to 1 (section leaving)
      const visibleTop = viewportHeight - rect.top;
      const totalTravel = viewportHeight + sectionHeight;
      const newProgress = Math.min(Math.max(visibleTop / totalTravel, 0), 1);
      setProgress(newProgress);
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateProgress);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate stream positions based on scroll progress
  const getStreamPosition = (
    index: number,
    total: number,
    prog: number
  ): StreamPosition => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    const startRadius = 200;
    const endRadius = 0;

    // Fade in from 0-40%, converge from 20-80%
    const fadeIn = Math.min(prog / 0.4, 1);
    const converge = Math.max(0, Math.min((prog - 0.2) / 0.6, 1));

    const radius = startRadius - (startRadius - endRadius) * converge;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const opacity = fadeIn * (1 - converge * 0.6);

    return { x, y, opacity };
  };

  const streams = ["gospel", "boogie", "blues", "jump", "rnb"];
  const burstOpacity = progress > 0.6 ? Math.min((progress - 0.6) / 0.2, 1) : 0;
  const taglineOpacity = progress > 0.7 ? Math.min((progress - 0.7) / 0.15, 1) : 0;

  return (
    <section ref={sectionRef} className="rnr-convergence">
      <div className="rnr-convergence__container">
        {/* Convergence streams */}
        <div className="rnr-convergence__streams">
          {streams.map((stream, idx) => {
            const pos = getStreamPosition(idx, streams.length, progress);
            return (
              <div
                key={stream}
                className={`rnr-convergence__stream rnr-convergence__stream--${stream}`}
                style={{
                  transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                  opacity: pos.opacity,
                }}
              />
            );
          })}
          <div className="rnr-convergence__burst" style={{ opacity: burstOpacity }} />
        </div>

        {/* Tagline appears after convergence */}
        <p className="rnr-convergence__tagline" style={{ opacity: taglineOpacity }}>
          It converged.
        </p>
      </div>
    </section>
  );
};

// ==================== FIGURE CARD ====================

const FigureCard: React.FC<{ figure: Figure }> = ({ figure }) => {
  const hasImage = !!figure.imageSrc;

  return (
    <article
      className={`rnr-figure ${figure.featured ? "rnr-figure--featured" : ""} ${
        hasImage ? "rnr-figure--has-image" : ""
      }`}
    >
      {hasImage && (
        <div className="rnr-figure__image-wrap">
          <Image
            src={figure.imageSrc!}
            alt={figure.imageAlt || figure.name}
            width={160}
            height={220}
            className="rnr-figure__image"
          />
          {figure.imageCredit && (
            <span className="rnr-figure__image-credit">{figure.imageCredit}</span>
          )}
        </div>
      )}
      <div className="rnr-figure__content">
        <h3 className="rnr-figure__name">{figure.name}</h3>
        <p className="rnr-figure__epithet">{figure.epithet}</p>
        <span className="rnr-figure__dates">{figure.dates}</span>
        <div className="rnr-figure__domains">
          {figure.domains.map((domain) => (
            <span key={domain} className="rnr-figure__domain">
              {domain}
            </span>
          ))}
        </div>
        <p className="rnr-figure__description">{figure.description}</p>
        {figure.quote && (
          <blockquote className="rnr-figure__quote">
            &ldquo;{figure.quote}&rdquo;
            {figure.quoteContext && (
              <cite className="rnr-figure__quote-context">
                {" "}
                — {figure.quoteContext}
              </cite>
            )}
          </blockquote>
        )}
      </div>
    </article>
  );
};

// ==================== CHAPTER SECTION ====================

const ChapterSection: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: "-5% 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={chapter.id}
      className={`rnr-chapter rnr-chapter--era-${chapter.era} ${
        isVisible ? "rnr-chapter--visible" : ""
      }`}
    >
      <div className="rnr-chapter__inner">
        {/* Header */}
        <header className="rnr-chapter__header">
          <span className="rnr-chapter__number">{chapter.number}</span>
          <h2 className="rnr-chapter__title">{chapter.title}</h2>
          <p className="rnr-chapter__subtitle">{chapter.subtitle}</p>
          {chapter.epigraph && (
            <blockquote className="rnr-chapter__epigraph">
              &ldquo;{chapter.epigraph.text}&rdquo;
              <cite>{chapter.epigraph.attribution}</cite>
            </blockquote>
          )}
        </header>

        {/* Content warning */}
        {chapter.contentWarning && (
          <div className="rnr-chapter__warning">
            <div className="rnr-chapter__warning-label">Content Note</div>
            {chapter.contentWarning}
          </div>
        )}

        {/* Chapter image */}
        {chapter.imageSrc && (
          <div className="rnr-chapter__image-container">
            <Image
              src={chapter.imageSrc}
              alt={chapter.imageAlt || chapter.title}
              width={720}
              height={400}
              className="rnr-chapter__image"
            />
            {chapter.imageCaption && (
              <p className="rnr-chapter__image-caption">{chapter.imageCaption}</p>
            )}
          </div>
        )}

        {/* Narrative */}
        <div className="rnr-narrative rnr-narrative--dropcap">
          {chapter.narrative.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Figures */}
        {chapter.figures.length > 0 && (
          <div className="rnr-figures">
            {chapter.figures.map((figure) => (
              <FigureCard key={figure.name} figure={figure} />
            ))}
          </div>
        )}

        <div className="rnr-divider" />
      </div>
    </section>
  );
};

// ==================== EPILOGUE ====================

const Epilogue: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={ref}
      className={`rnr-epilogue ${isVisible ? "rnr-chapter--visible" : ""}`}
    >
      <p className="rnr-epilogue__text">
        The break is always playing. The amp is always on. The noise continues.
      </p>
      <span className="rnr-epilogue__closing">The End</span>
    </footer>
  );
};

// ==================== SOURCES ====================

const Sources: React.FC = () => (
  <section className="rnr-sources">
    <div className="rnr-sources__inner">
      <h2 className="rnr-sources__title">Sources & Further Reading</h2>

      <div className="rnr-sources__category">
        <h3 className="rnr-sources__category-title">Primary Archives (.gov)</h3>
        <ul className="rnr-sources__list">
          <li>
            <a href="https://www.loc.gov/programs/national-recording-preservation-board/recording-registry/" target="_blank" rel="noopener noreferrer">
              Library of Congress — National Recording Registry
            </a>
          </li>
          <li>
            <a href="https://www.loc.gov/collections/alan-lomax-manuscripts/" target="_blank" rel="noopener noreferrer">
              Library of Congress — Alan Lomax Collection
            </a>
          </li>
          <li>
            <a href="https://www.neh.gov/" target="_blank" rel="noopener noreferrer">
              National Endowment for the Humanities — Sun Records
            </a>
          </li>
        </ul>
      </div>

      <div className="rnr-sources__category">
        <h3 className="rnr-sources__category-title">Institutional Archives</h3>
        <ul className="rnr-sources__list">
          <li>
            <a href="https://www.rockhall.com/library-archives" target="_blank" rel="noopener noreferrer">
              Rock and Roll Hall of Fame — Library and Archives
            </a>
          </li>
          <li>
            <a href="https://www.si.edu/search?edan_q=sister%20rosetta%20tharpe" target="_blank" rel="noopener noreferrer">
              Smithsonian Institution — Sister Rosetta Tharpe Collections
            </a>
          </li>
          <li>
            <a href="https://blues.org/halloffame/" target="_blank" rel="noopener noreferrer">
              Blues Foundation Hall of Fame
            </a>
          </li>
          <li>
            <a href="https://case.edu/ech/articles/f/freed-alan" target="_blank" rel="noopener noreferrer">
              Case Western Reserve — Encyclopedia of Cleveland History (Alan Freed)
            </a>
          </li>
        </ul>
      </div>

      <div className="rnr-sources__category">
        <h3 className="rnr-sources__category-title">Academic Books</h3>
        <ul className="rnr-sources__list">
          <li>
            <a href="https://www.hup.harvard.edu/books/9780674984318" target="_blank" rel="noopener noreferrer">
              Jack Hamilton, <em>Just Around Midnight</em> (Harvard, 2016)
            </a>
          </li>
          <li>
            <a href="https://www.dukeupress.edu/right-to-rock" target="_blank" rel="noopener noreferrer">
              Maureen Mahon, <em>Right to Rock</em> (Duke, 2004)
            </a>
          </li>
          <li>
            <a href="https://www.ucpress.edu/book/9780520212473/just-my-soul-responding" target="_blank" rel="noopener noreferrer">
              Brian Ward, <em>Just My Soul Responding</em> (UC Press, 1998)
            </a>
          </li>
          <li>
            <a href="https://books.google.com/books?id=0GqTDwAAQBAJ" target="_blank" rel="noopener noreferrer">
              Peter Guralnick, <em>Last Train to Memphis</em> (Little Brown, 1994)
            </a>
          </li>
          <li>
            <a href="https://books.google.com/books?id=DkFYAAAAYAAJ" target="_blank" rel="noopener noreferrer">
              Robert Palmer, <em>Deep Blues</em> (Viking, 1981)
            </a>
          </li>
        </ul>
      </div>

      <div className="rnr-sources__category">
        <h3 className="rnr-sources__category-title">Documentaries</h3>
        <ul className="rnr-sources__list">
          <li>
            <a href="https://www.imdb.com/title/tt0112077/" target="_blank" rel="noopener noreferrer">
              <em>The History of Rock &apos;n&apos; Roll</em> (1995)
            </a>
          </li>
          <li>
            <a href="https://www.imdb.com/title/tt2103197/" target="_blank" rel="noopener noreferrer">
              <em>Sister Rosetta Tharpe: The Godmother of Rock & Roll</em> (2011)
            </a>
          </li>
          <li>
            <a href="https://www.imdb.com/title/tt0314725/" target="_blank" rel="noopener noreferrer">
              <em>Standing in the Shadows of Motown</em> (2002)
            </a>
          </li>
        </ul>
      </div>

      <p className="rnr-sources__note">
        Complete bibliography with 100+ sources available in the research package.
      </p>

      <div className="rnr-sources__category">
        <h3 className="rnr-sources__category-title">Image Credits</h3>
        <p className="rnr-sources__note" style={{ marginBottom: "1rem" }}>
          All images sourced from Wikimedia Commons. Click names to view original files.
        </p>
        <ul className="rnr-sources__list">
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Sister_Rosetta_Tharpe_(1938_publicity_photo_with_guitar).jpg" target="_blank" rel="noopener noreferrer">
              Sister Rosetta Tharpe
            </a> — Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Louis_Jordan,_New_York,_N.Y.,_ca._July_1946_(William_P._Gottlieb_04721).jpg" target="_blank" rel="noopener noreferrer">
              Louis Jordan
            </a> — William P. Gottlieb, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:T-Bone_Walker_1972.jpg" target="_blank" rel="noopener noreferrer">
              T-Bone Walker
            </a> — Heinrich Klaffs, CC BY-SA 2.0
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Fats_Domino018.JPG" target="_blank" rel="noopener noreferrer">
              Fats Domino
            </a> — Teddyyy, CC BY-SA 3.0
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Ike_Turner_1971.jpg" target="_blank" rel="noopener noreferrer">
              Ike Turner
            </a> — Heinrich Klaffs, CC BY-SA 2.0
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Alan_Freed_1957.JPG" target="_blank" rel="noopener noreferrer">
              Alan Freed
            </a> — ABC-TV, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:FGF_museum_01._Leo_and_early_models.jpg" target="_blank" rel="noopener noreferrer">
              Leo Fender
            </a> — Fender Guitar Factory Museum, CC BY-SA 3.0
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Sun_Studio,_Memphis.jpg" target="_blank" rel="noopener noreferrer">
              Sam Phillips / Sun Studio
            </a> — Thomas R Machnitzki, CC BY-SA 3.0
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Earl_Palmer.jpg" target="_blank" rel="noopener noreferrer">
              Earl Palmer
            </a> — Rock and Roll Hall of Fame, Fair Use
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Cosimo_Matassa.jpg" target="_blank" rel="noopener noreferrer">
              Cosimo Matassa
            </a> — PRA, CC BY-SA 4.0
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Elvis_Presley_promoting_Jailhouse_Rock.jpg" target="_blank" rel="noopener noreferrer">
              Elvis Presley
            </a> — MGM, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Jerry_Lee_Lewis_1950s_publicity_photo_cropped_retouched.jpg" target="_blank" rel="noopener noreferrer">
              Jerry Lee Lewis
            </a> — Sun Records, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Chuck_Berry_1957.jpg" target="_blank" rel="noopener noreferrer">
              Chuck Berry
            </a> — Chess Records, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Muddy_Waters.jpg" target="_blank" rel="noopener noreferrer">
              Muddy Waters
            </a> — Chess Records, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Blues_is_a_woman_Reitz_(Big_Mama_Thornton).jpg" target="_blank" rel="noopener noreferrer">
              Big Mama Thornton
            </a> — Stephanie Wiesand, CC BY-SA 3.0
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Little_Richard_(1967).png" target="_blank" rel="noopener noreferrer">
              Little Richard
            </a> — CBS Television, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:The_Beatles_members_at_New_York_City_in_1964.jpg" target="_blank" rel="noopener noreferrer">
              The Beatles
            </a> — United Press International, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Rolling_Stones_1965.jpg" target="_blank" rel="noopener noreferrer">
              The Rolling Stones
            </a> — Decca Records, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Caetano_Veloso_(cropped).jpg" target="_blank" rel="noopener noreferrer">
              Caetano Veloso
            </a> — Governo do Estado de São Paulo, CC BY 2.0
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Ramones_Toronto_1976.jpg" target="_blank" rel="noopener noreferrer">
              The Ramones
            </a> — Plismo, CC BY 2.0
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Nirvana_around_1992_(cropped).jpg" target="_blank" rel="noopener noreferrer">
              Nirvana / Kurt Cobain
            </a> — DGC Records, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Joan_Jett_2013.jpg" target="_blank" rel="noopener noreferrer">
              Joan Jett
            </a> — Andrew Hurley, CC BY-SA 2.0
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Janis_Joplin_1970.JPG" target="_blank" rel="noopener noreferrer">
              Janis Joplin
            </a> — Albert B. Grossman Management, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Beatles_and_George_Martin_in_studio_1966.JPG" target="_blank" rel="noopener noreferrer">
              George Martin
            </a> — EMI Records, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Ruth_Brown_cropped.jpg" target="_blank" rel="noopener noreferrer">
              Ruth Brown
            </a> — Atlantic Records, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Ike_%26_Tina_Turner,_Bestanddeelnr_924-2170_-_Restoration.jpg" target="_blank" rel="noopener noreferrer">
              Tina Turner (Ike & Tina era)
            </a> — Nationaal Archief, CC0
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Tina_Turner_1985.jpg" target="_blank" rel="noopener noreferrer">
              Tina Turner (solo era)
            </a> — Iris Schneider / Los Angeles Times, CC BY 4.0
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Ma_Rainey_(1917_publicity_photo).jpg" target="_blank" rel="noopener noreferrer">
              Ma Rainey
            </a> — Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Bessie_Smith_(1936)_by_Carl_Van_Vechten.jpg" target="_blank" rel="noopener noreferrer">
              Bessie Smith
            </a> — Carl Van Vechten, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:LaVern_Baker_1956.jpg" target="_blank" rel="noopener noreferrer">
              LaVern Baker
            </a> — Atlantic Records, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Etta_James.jpg" target="_blank" rel="noopener noreferrer">
              Etta James
            </a> — Chess Records, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Wanda_Jackson-1958.jpg" target="_blank" rel="noopener noreferrer">
              Wanda Jackson
            </a> — Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Aretha_Franklin_1968.jpg" target="_blank" rel="noopener noreferrer">
              Aretha Franklin
            </a> — Atlantic Records, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Grace_Slick_1967.png" target="_blank" rel="noopener noreferrer">
              Grace Slick
            </a> — RCA Records, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Ronnie_Spector_1971.jpg" target="_blank" rel="noopener noreferrer">
              Ronnie Spector
            </a> — Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Ann_and_Nancy_Wilson_of_Heart.jpg" target="_blank" rel="noopener noreferrer">
              Heart (Ann & Nancy Wilson)
            </a> — Capitol Records, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Patti_Smith_performing_in_Finland,_2007.jpg" target="_blank" rel="noopener noreferrer">
              Patti Smith
            </a> — Beni Muck, CC BY-SA 2.0
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Debbie_Harry_1977.jpg" target="_blank" rel="noopener noreferrer">
              Debbie Harry
            </a> — Chris Stein, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Stevie_Nicks_-_1977.jpg" target="_blank" rel="noopener noreferrer">
              Stevie Nicks
            </a> — Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Pat_Benatar_1980.jpg" target="_blank" rel="noopener noreferrer">
              Pat Benatar
            </a> — Chrysalis Records, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:The_Go-Gos_1981.jpg" target="_blank" rel="noopener noreferrer">
              The Go-Go&apos;s
            </a> — IRS Records, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Chrissie_hynde_1702710099.jpg" target="_blank" rel="noopener noreferrer">
              Chrissie Hynde
            </a> — Sire Records, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Kathleen_Hanna_2.jpg" target="_blank" rel="noopener noreferrer">
              Kathleen Hanna
            </a> — Colin Mutchler, CC BY-SA 2.0
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:Courtney_Love_1995.jpg" target="_blank" rel="noopener noreferrer">
              Courtney Love
            </a> — DGC Records, Public Domain
          </li>
          <li>
            <a href="https://commons.wikimedia.org/wiki/File:PJ_Harvey_2017.jpg" target="_blank" rel="noopener noreferrer">
              PJ Harvey
            </a> — Kris Krug, CC BY-SA 2.0
          </li>
        </ul>
      </div>
    </div>
  </section>
);

// ==================== CHAPTER DATA ====================

const chapters: Chapter[] = [
  {
    id: "prologue",
    number: "Prologue",
    title: "The Convergence",
    subtitle: "Before the Name: Multiple Streams Toward a Single Sound",
    era: "prerock",
    epigraph: {
      text: "All this new stuff they call Rock and Roll, why I've been playing that for years now.",
      attribution: "Sister Rosetta Tharpe, 1957",
    },
    narrative: [
      "Who invented rock and roll? It's the question everyone asks, and it's the wrong question. Rock and roll was not invented—it converged. At least six distinct streams of African American musical innovation merged in the late 1940s, powered by new technologies and reaching across racial lines.",
      "Boogie-woogie piano from Texas lumber camps. Jump blues from Kansas City and New York. Electric blues electrifying the Delta sound in Chicago. Gospel driving sacred music with rock rhythms. Rhythm & Blues as an industry category replacing 'race records.' Western swing from cross-racial Texas dance halls.",
      "Each stream had its own masters, techniques, and regional character. When they converged—when amplifiers got loud enough, when tape recorders captured the energy, when radio waves crossed state lines and segregation barriers—they became something the world had never heard before.",
    ],
    figures: [
      {
        name: "Sister Rosetta Tharpe",
        epithet: "The Godmother of Rock and Roll",
        dates: "1915–1973",
        domains: ["Gospel", "Electric Guitar", "Pioneer"],
        description:
          "First gospel recording star; pioneered electric guitar distortion. Her 1944 'Strange Things Happening Every Day' was the first gospel song to reach the R&B Top 10.",
        quote: "All this new stuff they call Rock and Roll, why I've been playing that for years now.",
        quoteContext: "1957",
        imageSrc: IMAGES.sisterRosettaTharpe,
        imageAlt: "Sister Rosetta Tharpe with guitar, 1938",
        imageCredit: "Public Domain",
        featured: true,
      },
      {
        name: "Louis Jordan",
        epithet: "Father of Rhythm & Blues",
        dates: "1908–1975",
        domains: ["Jump Blues", "Saxophone", "Showman"],
        description:
          "Alto saxophonist and bandleader with 57 R&B chart hits and 113 weeks at #1 between 1943 and 1950. His Tympany Five dominated the decade.",
        quote: "Rock and roll would have never happened without him.",
        quoteContext: "Doc Pomus",
        imageSrc: IMAGES.louisJordan,
        imageAlt: "Louis Jordan, New York, 1946",
        imageCredit: "William P. Gottlieb, Public Domain",
        featured: false,
      },
    ],
  },
  {
    id: "chapter-1",
    number: "Chapter 1",
    title: "Rivers Before the Flood",
    subtitle: "The Pre-Rock Streams (1920s–1949)",
    era: "prerock",
    narrative: [
      "Before rock and roll had a name, Black women were creating its vocabulary. Ma Rainey—the 'Mother of the Blues'—began recording in 1923, her raw power and stage presence inventing the template for everything that followed. Her protégé Bessie Smith became the highest-paid Black entertainer of the 1920s, selling millions of records with a vocal intensity that would echo through every rock singer who ever screamed into a microphone.",
      "In Texas lumber camps of the 1870s, African American pianists developed a driving style—eight-to-the-bar left-hand patterns beneath improvised right-hand melodies. The music migrated to Chicago, where Pinetop Smith's 'Pinetop's Boogie Woogie' (December 29, 1928) became the first hit with 'boogie' in the title.",
      "On December 23, 1938, boogie-woogie reached Carnegie Hall. The 'Spirituals to Swing' concert featured Meade 'Lux' Lewis, Albert Ammons, and Pete Johnson. Classical America heard the rolling thunder.",
      "Meanwhile, T-Bone Walker picked up the electric guitar in 1935 and invented its vocabulary—single-string phrases, double-string slurs, showmanship like playing behind his head. When Muddy Waters moved from Mississippi to Chicago in 1943, he faced a problem: acoustic Delta blues couldn't compete with Chicago's noisy clubs. The Delta blues became electrified, loud enough to shake walls.",
    ],
    figures: [
      {
        name: "Ma Rainey",
        epithet: "Mother of the Blues",
        dates: "1886–1939",
        domains: ["Blues", "Vaudeville", "Pioneer"],
        description:
          "The first great professional blues vocalist. Began recording in 1923 for Paramount Records; over 100 recordings. Mentored Bessie Smith. Her raw power, gold teeth, and elaborate stage presence created the template for rock stardom itself.",
        quote: "They hear it come out, but they don't know how it got there.",
        imageSrc: IMAGES.maRainey,
        imageAlt: "Ma Rainey, 1917",
        imageCredit: "Public Domain",
        featured: true,
      },
      {
        name: "Bessie Smith",
        epithet: "Empress of the Blues",
        dates: "1894–1937",
        domains: ["Blues", "Jazz", "Icon"],
        description:
          "The highest-paid Black entertainer of the 1920s. Columbia Records' best-selling artist. Her vocal power—singing to thousands without a microphone—created the emotional intensity that defines rock singing. Every screamer traces back to Bessie.",
        quote: "I ain't good-lookin', but I'm somebody's angel child.",
        imageSrc: IMAGES.bessieSmith,
        imageAlt: "Bessie Smith, 1936",
        imageCredit: "Carl Van Vechten, Public Domain",
        featured: true,
      },
      {
        name: "Pinetop Smith",
        epithet: "First Boogie-Woogie Recording Star",
        dates: "1904–1929",
        domains: ["Boogie-Woogie", "Piano"],
        description:
          "Recorded 'Pinetop's Boogie Woogie' (December 29, 1928), the first recording with 'boogie' in the title. Died from a gunshot wound in a Chicago dance-hall fight at age 24.",
        featured: false,
      },
      {
        name: "T-Bone Walker",
        epithet: "Electric Blues Guitar Pioneer",
        dates: "1910–1975",
        domains: ["Electric Blues", "Guitar", "Showman"],
        description:
          "First blues guitarist to make electric guitar a solo centerpiece (1935). Invented the vocabulary: single-string phrases, double-string slurs, playing behind his head.",
        quote: "I thought 'Jesus Himself had returned to earth playing electric guitar.'",
        quoteContext: "B.B. King",
        imageSrc: IMAGES.tBoneWalker,
        imageAlt: "T-Bone Walker performing, 1972",
        imageCredit: "Heinrich Klaffs, CC BY-SA 2.0",
        featured: true,
      },
    ],
  },
  {
    id: "chapter-2",
    number: "Chapter 2",
    title: "The Impossible Question",
    subtitle: "What Was the First Rock and Roll Record? (1944–1951)",
    era: "explosion",
    narrative: [
      "The search for rock's 'first record' is impossible to resolve definitively—and the attempt reveals how we construct origin myths. 1944: Sister Rosetta Tharpe's 'Strange Things Happening Every Day'—gospel with electric guitar distortion, crossing to the secular R&B chart. 1947: Roy Brown's 'Good Rockin' Tonight'—the word 'rock' used musically rather than sexually. 1949: Fats Domino's 'The Fat Man'—first rock record to sell one million copies.",
      "Then there's 1951: 'Rocket 88' by Jackie Brenston with Ike Turner's Kings of Rhythm. Often cited as the first rock and roll record. Features distorted guitar—Willie Kizart's amplifier broke en route to Sun Studio; Sam Phillips stuffed newspaper in the cone to stop rattling, creating the first recorded distortion.",
      "Nick Tosches wrote: 'It is impossible to discern the first modern rock record, just as it is impossible to discern where blue becomes indigo in the spectrum.' The impossibility of the question reveals the truth: rock emerged from a continuum of Black musical innovation. There was no single moment, no single inventor. There was a convergence.",
    ],
    figures: [
      {
        name: "Fats Domino",
        epithet: "New Orleans' Gentle Giant",
        dates: "1928–2017",
        domains: ["Piano", "R&B", "New Orleans"],
        description:
          "Record sales in the 1950s-60s rivaled only by Elvis Presley; 65 million records sold. 'The Fat Man' (1949) was the first rock record to sell 1 million copies.",
        quote: "Rock 'n roll is nothing but rhythm and blues, and we've been playing it for years down in New Orleans.",
        imageSrc: IMAGES.fatsDomino,
        imageAlt: "Fats Domino performing",
        imageCredit: "Teddyyy, CC BY-SA 3.0",
        featured: true,
      },
      {
        name: "Ike Turner",
        epithet: "Architect of 'Rocket 88'",
        dates: "1931–2007",
        domains: ["Piano", "Bandleader", "Producer"],
        description:
          "Led the Kings of Rhythm; wrote and arranged 'Rocket 88' though Jackie Brenston got vocal credit. Sam Phillips called him 'the most talented person he ever worked with.'",
        imageSrc: IMAGES.ikeTurner,
        imageAlt: "Ike Turner, 1971",
        imageCredit: "Rob Mieremet, CC0",
        featured: false,
      },
      {
        name: "Tina Turner",
        epithet: "The Voice of the Revue",
        dates: "1939–2023",
        domains: ["Vocalist", "Dancer", "Performer"],
        description:
          "As Anna Mae Bullock, she joined Ike Turner's Kings of Rhythm in 1957. The Ike & Tina Turner Revue became one of the most electrifying live acts of the 1960s. 'River Deep – Mountain High' (1966) was a masterpiece. Behind the stage, she endured years of abuse.",
        quote: "I didn't have anybody, really, no foundation in life, so I had to make my own way.",
        imageSrc: IMAGES.tinaTurnerRevue,
        imageAlt: "Ike & Tina Turner performing",
        imageCredit: "Nationaal Archief, CC0",
        featured: true,
      },
    ],
  },
  {
    id: "chapter-3",
    number: "Chapter 3",
    title: "The Naming",
    subtitle: "Alan Freed and the Word 'Rock and Roll' (1951–1952)",
    era: "explosion",
    narrative: [
      "The music existed before the name. African American artists and audiences knew what they were hearing. But for the music to cross the racial divide, it needed a new vocabulary.",
      "Leo Mintz ran Record Rendezvous in Cleveland. In the late 1940s, he noticed something strange: white teenagers were coming into his store to buy R&B records marketed to Black audiences. They were dancing to music not meant for them. Mintz saw opportunity.",
      "He approached local DJ Alan Freed with an idea: a radio show featuring this music, pitched to white teenagers. On July 11, 1951, Freed debuted 'The Moondog Rock 'n' Roll Party' on WJW Cleveland. The term 'rock and roll' had existed in Black culture for decades. Freed didn't invent it; he appropriated it, sanitizing the term for white consumption.",
      "On March 21, 1952, Freed organized the Moondog Coronation Ball at Cleveland Arena—capacity 10,000. Over 20,000 people showed up. The fire department shut it down after one song. It was the first major rock and roll concert—and it nearly ended before it began.",
    ],
    figures: [
      {
        name: "Alan Freed",
        epithet: "Moondog—Rock's First DJ Champion",
        dates: "1921–1965",
        domains: ["Radio", "Promoter", "DJ"],
        description:
          "Popularized 'rock and roll' on radio starting July 11, 1951. Organized the Moondog Coronation Ball (March 21, 1952)—the first major rock concert. Destroyed by payola scandal; died penniless at 43.",
        quote: "When the dance was stopped, I went off and cried. I'm not ashamed to admit it.",
        imageSrc: IMAGES.alanFreed,
        imageAlt: "Alan Freed, 1957",
        imageCredit: "Topps Gum Cards, Public Domain",
        featured: true,
      },
    ],
  },
  {
    id: "chapter-4",
    number: "Chapter 4",
    title: "The Electric Revolution",
    subtitle: "Technology as Co-Author (1935–1959)",
    era: "explosion",
    narrative: [
      "Rock and roll was not just performed with new technologies—it was constituted by them. The physics of solid-body guitars, the electronics of tube amplifiers, the economics of 45 RPM singles: these shaped the music's fundamental character.",
      "The acoustic guitar's hollow body created feedback when amplified. Leo Fender—who never learned to play guitar—solved this with a solid slab of wood: the Broadcaster (later Telecaster, 1950) and Stratocaster (1954). The solid body eliminated feedback and enabled volume. Rock's aggression became possible.",
      "When vacuum tube amplifiers were pushed past their intended limits, they distorted the signal. This 'flaw' became rock's signature sound. The 45 RPM single (1949) made records affordable for teenagers and shaped song structure—rock songs had to be short, immediate, impactful. The Regency TR-1 transistor radio (1954) let teenagers listen privately, away from parents. Rock became youth property.",
    ],
    figures: [
      {
        name: "Leo Fender",
        epithet: "Solid-Body Guitar Creator",
        dates: "1909–1991",
        domains: ["Inventor", "Luthier", "Engineer"],
        description:
          "Created the first mass-produced solid-body electric guitar (Telecaster, 1950; Stratocaster, 1954). Rock and Roll Hall of Fame inductee (1992). Never learned to play guitar.",
        imageSrc: IMAGES.leoFender,
        imageAlt: "Leo Fender with early guitar models",
        imageCredit: "Mr. Littlehand, CC BY 2.0",
        featured: true,
      },
      {
        name: "Sam Phillips",
        epithet: "Sun Records Founder",
        dates: "1923–2003",
        domains: ["Producer", "Engineer", "Label Owner"],
        description:
          "Produced 'Rocket 88,' discovered Elvis, invented the slapback echo technique using two Ampex 350 tape recorders. First non-performer inducted into Rock and Roll Hall of Fame (1986).",
        quote: "I knew that for black music to come to its rightful place in this country, we had to have some white singers come over and do black music.",
        imageSrc: IMAGES.samPhillips,
        imageAlt: "Sun Studio, Memphis",
        imageCredit: "Public Domain",
        featured: true,
      },
    ],
  },
  {
    id: "chapter-5",
    number: "Chapter 5",
    title: "The Crescent City Sound",
    subtitle: "New Orleans: The Rhythmic Foundation (1945–1960)",
    era: "explosion",
    narrative: [
      "New Orleans gave rock and roll its rhythm. The city's unique musical culture—blending Caribbean, African, French, and American traditions—produced the backbeat that would define the music.",
      "Drummer Earl Palmer is 'correctly identified as the man who put the backbeat in rock 'n' roll'—emphasizing beats 2 and 4 rather than 1 and 3. This rhythmic innovation, rooted in New Orleans second-line tradition, became rock's defining pulse.",
      "Cosimo Matassa opened J&M Recording Studio at 838 North Rampart Street in 1945. In just 15 x 16 feet, he captured virtually every New Orleans R&B hit from the late 1940s through the early 1970s. Producer Dave Bartholomew and artist Fats Domino created over 40 Top 10 R&B hits together. Their partnership defined the New Orleans sound.",
    ],
    figures: [
      {
        name: "Earl Palmer",
        epithet: "The Man Who Put the Backbeat in Rock 'n' Roll",
        dates: "1924–2008",
        domains: ["Drums", "Session Musician", "New Orleans"],
        description:
          "Drummer on Little Richard's 'Tutti Frutti,' Fats Domino's hits, and countless others. Session musician on over 250 records. Rock and Roll Hall of Fame inductee (2000).",
        quote: "I wasn't thinking about inventing anything. I was just playing what felt right.",
        imageSrc: IMAGES.earlPalmer,
        imageAlt: "Earl Palmer",
        imageCredit: "Kingkongphoto, CC BY-SA 2.0",
        featured: true,
      },
      {
        name: "Cosimo Matassa",
        epithet: "New Orleans Recording Engineer",
        dates: "1926–2014",
        domains: ["Engineer", "Studio Owner", "Producer"],
        description:
          "Captured virtually every New Orleans R&B hit from the late 1940s through early 1970s at J&M Studio. Rock and Roll Hall of Fame inductee (2012).",
        quote: "The sound was in the room, not in the equipment.",
        imageSrc: IMAGES.cosimoMatassa,
        imageAlt: "Cosimo Matassa",
        imageCredit: "WhyArts, CC BY-SA 4.0",
        featured: false,
      },
    ],
  },
  {
    id: "chapter-6",
    number: "Chapter 6",
    title: "Where the Soul Was Recorded",
    subtitle: "Memphis and Sun Studio (1950–1959)",
    era: "explosion",
    narrative: [
      "Memphis was where the races met in music—not without tension, not without exploitation, but with revolutionary results. Sam Phillips opened Memphis Recording Service (later Sun Studio) at 706 Union Avenue on January 3, 1950.",
      "In August 1953, an 18-year-old truck driver paid $4 to record a demo for his mother. Elvis Presley's voice impressed Marion Keisker, Phillips's assistant. A year later, on July 5, 1954, Elvis returned to the studio. After hours of frustrating attempts at ballads, he started fooling around with Arthur Crudup's 'That's All Right.'",
      "Phillips recognized the sound immediately. On July 7, 1954, DJ Dewey Phillips played 'That's All Right' on WHBQ Memphis. The phone lines exploded. A white boy singing Black music—not imitating, not sanitizing, but inhabiting it. The crossover began.",
    ],
    figures: [
      {
        name: "Elvis Presley",
        epithet: "The King—The Crossover",
        dates: "1935–1977",
        domains: ["Singer", "Actor", "Icon"],
        description:
          "Bridged Black and white music for a mass audience. Over 1 billion records sold worldwide. His Sun Studio recordings changed American music.",
        quote: "A lot of people seem to think I started this business. But rock 'n' roll was here a long time before I came along. Nobody can sing it like colored people.",
        quoteContext: "1957",
        imageSrc: IMAGES.elvisPresley,
        imageAlt: "Elvis Presley promoting Jailhouse Rock",
        imageCredit: "MGM, Public Domain",
        featured: true,
      },
      {
        name: "Jerry Lee Lewis",
        epithet: "The Killer",
        dates: "1935–2022",
        domains: ["Piano", "Rock", "Country"],
        description:
          "Wild piano style; 'Whole Lotta Shakin' Going On' (1957), 'Great Balls of Fire' (1957). Career derailed by marriage to 13-year-old cousin (1958).",
        quote: "Rock and roll is not a sin. Some of the people who play it are sinners.",
        imageSrc: IMAGES.jerryLeeLewis,
        imageAlt: "Jerry Lee Lewis, 1950s",
        imageCredit: "Maurice Seymour, Public Domain",
        featured: false,
      },
      {
        name: "Wanda Jackson",
        epithet: "The Queen of Rockabilly",
        dates: "b. 1937",
        domains: ["Rockabilly", "Country", "Pioneer"],
        description:
          "Toured with Elvis in 1955–56; he encouraged her to sing rockabilly. Her growling vocals on 'Fujiyama Mama' and 'Let's Have a Party' were harder than any man's. The only woman in 1950s rockabilly's front ranks.",
        quote: "Elvis told me, 'You need to stop singing country and sing rock and roll.' So I did.",
        imageSrc: IMAGES.wandaJackson,
        imageAlt: "Wanda Jackson, 1958",
        imageCredit: "Public Domain",
        featured: true,
      },
    ],
  },
  {
    id: "chapter-7",
    number: "Chapter 7",
    title: "The House That Blues Built",
    subtitle: "Chicago and Chess Records (1950–1969)",
    era: "explosion",
    narrative: [
      "When the Delta blues came to Chicago, it got loud. Leonard Chess (born Lejzor Czyz) and Phil Chess (born Fiszel Czyz)—Polish Jewish immigrants—owned nightclubs on Chicago's South Side where bluesmen performed. In 1950, they founded Chess Records. At 2120 South Michigan Avenue, they built a catalog that defined electric blues.",
      "Muddy Waters brought the Delta blues north and plugged it in. His 1958 UK tour shocked British audiences—electric blues at volume levels they'd never experienced. He planted seeds that would grow into the British Invasion.",
      "Chuck Berry was the complete package: guitar innovation, lyrical wit, showmanship, and business sense. 'Maybellene' (1955) was his breakthrough—#1 R&B, #5 Pop. But Berry lost royalties for 31 years. Alan Freed demanded co-writing credit as payment for radio play. Berry didn't regain full ownership until 1986.",
    ],
    figures: [
      {
        name: "Chuck Berry",
        epithet: "Rock's Supreme Poet",
        dates: "1926–2017",
        domains: ["Guitar", "Singer", "Songwriter"],
        description:
          "'Maybellene' (1955) moved Chess from R&B into mainstream rock. Lost royalties for 31 years when Alan Freed was added to writing credits.",
        quote: "It used to be called boogie-woogie, it used to be called blues, it used to be called rhythm and blues... It's called rock now.",
        imageSrc: IMAGES.chuckBerry,
        imageAlt: "Chuck Berry, 1957",
        imageCredit: "Public Domain",
        featured: true,
      },
      {
        name: "Muddy Waters",
        epithet: "Father of Modern Chicago Blues",
        dates: "1913–1983",
        domains: ["Electric Blues", "Guitar", "Bandleader"],
        description:
          "Recorded by Alan Lomax for Library of Congress (1941-1942). Electrified Delta blues in Chicago. His 1958 UK tour inspired the British Invasion.",
        quote: "When I went into the clubs, the first thing I wanted was an amplifier.",
        imageSrc: IMAGES.muddyWaters,
        imageAlt: "Muddy Waters performing",
        imageCredit: "Jean-Luc Ourlin, CC BY-SA 2.0",
        featured: true,
      },
      {
        name: "Etta James",
        epithet: "The Matriarch of R&B",
        dates: "1938–2012",
        domains: ["R&B", "Blues", "Rock"],
        description:
          "Signed to Chess subsidiary at 17. 'At Last' became timeless. Bridged R&B, blues, and rock with raw emotional power across six decades. Battled addiction, came back stronger. Six Grammys, Rock Hall 1993.",
        quote: "I'm a woman. I'm Black. I'm from the ghetto. I just wanted to sing.",
        imageSrc: IMAGES.ettaJames,
        imageAlt: "Etta James performing",
        imageCredit: "Chess Records, Public Domain",
        featured: true,
      },
    ],
  },
  {
    id: "chapter-8",
    number: "Chapter 8",
    title: "The Crossover and The Theft",
    subtitle: "Race, Covers, and Erasure (1950–1960)",
    era: "explosion",
    contentWarning:
      "This chapter discusses racism, economic exploitation, and systemic erasure of Black artists.",
    narrative: [
      "Rock and roll's history cannot be separated from the history of American racism—in its creation, exploitation, erasure, and eventual (partial) integration.",
      "In the 1950s, white artists routinely covered Black artists' songs with sanitized arrangements for segregated radio markets. Big Mama Thornton's 'Hound Dog' (1953) topped the R&B chart for seven weeks. She received a flat fee of $500. No royalties. Elvis's 1956 version sold 10 million copies. Thornton died penniless in 1984.",
      "Little Richard's 'Tutti Frutti' was covered by Pat Boone, who outsold the original. LaVern Baker's 'Tweedle Dee' was covered by Georgia Gibbs using nearly the identical arrangement. Baker was so frustrated she petitioned Congress to outlaw note-for-note covers.",
      "Yet something else was happening. At rock and roll shows, the segregated seating—often enforced by literal ropes—began to collapse. Ralph Bass, Chess Records producer: 'Then, hell, the rope would come down, and they'd all be dancing together.' Music became a space where integration happened in practice before it was achieved in law.",
    ],
    figures: [
      {
        name: "Big Mama Thornton",
        epithet: "Hound Dog Original",
        dates: "1926–1984",
        domains: ["Blues", "Harmonica", "Singer"],
        description:
          "Her 1953 'Hound Dog' topped the R&B chart for seven weeks, sold 500,000+ copies. Paid a flat fee of $500, no royalties. Died penniless in Los Angeles.",
        quote: "Didn't get no money from them at all. Everybody livin' in a house but me. I'm just livin.",
        quoteContext: "1984",
        imageSrc: IMAGES.bigMamaThornton,
        imageAlt: "Big Mama Thornton performing",
        imageCredit: "Barbara Weinberg Barefield, CC BY-SA 3.0",
        featured: true,
      },
      {
        name: "Little Richard",
        epithet: "The Architect of Rock and Roll",
        dates: "1932–2020",
        domains: ["Piano", "Singer", "Showman"],
        description:
          "Recorded 'Tutti Frutti,' 'Long Tall Sally,' 'Good Golly Miss Molly.' Self-proclaimed innovator, originator, and architect of rock and roll.",
        quote: "I am the innovator. I am the originator. I am the emancipator. I am the architect of rock 'n' roll.",
        imageSrc: IMAGES.littleRichard,
        imageAlt: "Little Richard, 1957",
        imageCredit: "Topps Gum Cards, Public Domain",
        featured: true,
      },
      {
        name: "LaVern Baker",
        epithet: "Rock's First Lady",
        dates: "1929–1997",
        domains: ["R&B", "Rock", "Activist"],
        description:
          "Atlantic Records star whose 'Tweedle Dee' (1954) was covered note-for-note by Georgia Gibbs. Baker petitioned Congress for copyright protection—the first artist to publicly fight back against cover theft. Rock Hall 1991.",
        quote: "I was making hits while they were making copies.",
        imageSrc: IMAGES.lavernBaker,
        imageAlt: "LaVern Baker, 1956",
        imageCredit: "Atlantic Records, Public Domain",
        featured: true,
      },
    ],
  },
  {
    id: "chapter-9",
    number: "Chapter 9",
    title: "The Feedback Loop",
    subtitle: "The British Invasion Returns the Blues (1958–1966)",
    era: "invasion",
    narrative: [
      "The British Invasion was not merely an export of American music—it was a transformation that changed American rock itself. In October 1958, Muddy Waters toured the UK. British audiences, expecting acoustic folk blues, were stunned by his electric ferocity.",
      "Alexis Korner and Cyril Davies founded Blues Incorporated in 1961—'Britain's First Rhythm & Blues Band.' The Ealing Club became a training ground. Young musicians who would become the Rolling Stones, Cream, and Led Zeppelin cycled through.",
      "On February 9, 1964, the Beatles appeared on Ed Sullivan. 73 million Americans watched. The British Invasion began. But the British bands carried a secret cargo: American blues. The Rolling Stones named themselves after a Muddy Waters song. They recorded at Chess Records, 2120 South Michigan Avenue.",
      "White British teenagers reintroduced Black American music to white American teenagers. The feedback loop was complete—but the original creators were still being credited last.",
    ],
    figures: [
      {
        name: "The Beatles",
        epithet: "Liverpool's Gift to the World",
        dates: "1960–1970",
        domains: ["Rock", "Pop", "Cultural Revolution"],
        description:
          "73 million watched their Ed Sullivan appearance (February 9, 1964). Hamburg crucible transformed raw talent into world-beaters.",
        quote: "I was born in Liverpool, but I grew up in Hamburg.",
        quoteContext: "John Lennon",
        imageSrc: IMAGES.theBeatles,
        imageAlt: "The Beatles on Ed Sullivan Show, 1964",
        imageCredit: "Bernard Gotfryd, Public Domain",
        featured: true,
      },
      {
        name: "The Rolling Stones",
        epithet: "Blues Devotees",
        dates: "1962–present",
        domains: ["Rock", "Blues", "British Invasion"],
        description:
          "Named after a Muddy Waters song. Recorded at Chess Records. Mick Jagger and Keith Richards reconnected over blues albums.",
        quote: "We wanted to turn people on to blues. That was the whole idea.",
        quoteContext: "Keith Richards",
        imageSrc: IMAGES.theRollingStones,
        imageAlt: "The Rolling Stones, 1965",
        imageCredit: "London Records, Public Domain",
        featured: true,
      },
      {
        name: "Ronnie Spector",
        epithet: "The Voice of the Wall of Sound",
        dates: "1943–2022",
        domains: ["Pop", "Rock", "Girl Groups"],
        description:
          "Lead singer of The Ronettes. 'Be My Baby' (1963) defined Phil Spector's Wall of Sound—its opening drum beat became the most imitated in rock history. Brian Wilson pulled his car over when he first heard it. The Beatles, the Stones, Springsteen—all cite her as foundational.",
        quote: "I used to tell myself, 'Ronnie, someday you're gonna be free, and you're gonna make music again.'",
        imageSrc: IMAGES.ronnieSpector,
        imageAlt: "Ronnie Spector, 1971",
        imageCredit: "Apple Records, Public Domain",
        featured: true,
      },
    ],
  },
  {
    id: "chapter-10",
    number: "Chapter 10",
    title: "Global Amplification",
    subtitle: "Rock Spreads Worldwide (1964–1980)",
    era: "invasion",
    narrative: [
      "Rock and roll was never just American or British. Almost as soon as it had a name, it began to travel—and everywhere it landed, it adapted.",
      "In Brazil, Caetano Veloso and Gilberto Gil led Tropicalia—a movement fusing psychedelic rock with Brazilian traditions. Os Mutantes became the 'house band' of the movement. But the music was too radical for Brazil's military dictatorship. In 1969, Veloso and Gil were arrested, imprisoned, and eventually exiled.",
      "The Beatles' performances at Tokyo's Budokan in June-July 1966 triggered Japan's 'Group Sounds' explosion. In Germany, Kraftwerk, Neu!, and Tangerine Dream rejected both Anglo-American rock and conservative German culture, creating electronic rock that would influence punk, new wave, and all electronic music that followed.",
    ],
    figures: [
      {
        name: "Caetano Veloso",
        epithet: "Tropicalia Founder",
        dates: "b. 1942",
        domains: ["Tropicalia", "MPB", "Political Art"],
        description:
          "Led Tropicalia movement with Gilberto Gil, fusing psychedelia with Brazilian traditions. Arrested by military regime 1969; later exiled.",
        quote: "The violent aspect of rock 'n' roll interested us more because we were seeing violence.",
        imageSrc: IMAGES.caetanoVeloso,
        imageAlt: "Caetano Veloso performing",
        imageCredit: "Governo do Estado de São Paulo, CC BY 2.0",
        featured: true,
      },
    ],
  },
  {
    id: "chapter-11",
    number: "Chapter 11",
    title: "The Fracturing",
    subtitle: "Genre Evolution (1968–1995)",
    era: "evolution",
    narrative: [
      "Rock didn't stay unified. From the late 1960s, it splintered into genres—each with its own rules, heroes, and audiences. And in every genre, women were there from the beginning.",
      "Aretha Franklin commanded soul-rock crossover with Muscle Shoals sessions. Janis Joplin brought blues intensity to rock's biggest stages. Grace Slick fronted Jefferson Airplane through psychedelia's peak. Black Sabbath emerged from Birmingham in 1968, creating heavy metal. Heart proved women could match that heaviness—Ann Wilson's vocals soaring over Nancy's hard rock guitar.",
      "CBGB at 315 Bowery became ground zero for punk. The Ramones stripped rock to three chords. But alongside them: Patti Smith merged poetry and punk with 'Horses' (1975). Debbie Harry made Blondie a new wave powerhouse. Suzi Quatro pioneered leather-clad female rock stardom, directly inspiring Joan Jett.",
      "On August 1, 1981, MTV launched. Pat Benatar brought rock credibility to the video age. The Go-Go's became the first all-female band writing and playing their own #1 album. Stevie Nicks became rock royalty with Fleetwood Mac. In 1991, Nirvana's 'Nevermind' broke grunge mainstream—but so did Hole, with Courtney Love's raw confessional power. Riot grrrl exploded: Kathleen Hanna and Bikini Kill named the industry's sexism explicitly. PJ Harvey proved women could dominate art rock.",
    ],
    figures: [
      {
        name: "Aretha Franklin",
        epithet: "Queen of Soul",
        dates: "1942–2018",
        domains: ["Soul", "R&B", "Gospel"],
        description:
          "The voice that demanded R-E-S-P-E-C-T. 18 Grammys, first woman inducted into Rock Hall (1987). Her Muscle Shoals sessions bridged soul and rock, her power transcending every genre boundary.",
        quote: "Being the Queen is not all about singing. It has much to do with your service to people.",
        imageSrc: IMAGES.arethaFranklin,
        imageAlt: "Aretha Franklin, 1968",
        imageCredit: "Atlantic Records, Public Domain",
        featured: true,
      },
      {
        name: "Janis Joplin",
        epithet: "Rock's First Female Superstar",
        dates: "1943–1970",
        domains: ["Blues Rock", "Psychedelic", "Vocalist"],
        description:
          "Fronted Big Brother and the Holding Company. Her raw, soulful wail broke every barrier—except the one that killed her. Dead at 27 from overdose, she remains rock's most visceral female voice.",
        quote: "Don't compromise yourself. You are all you've got.",
        imageSrc: IMAGES.janisJoplin,
        imageAlt: "Janis Joplin performing, 1970",
        imageCredit: "Albert B. Grossman Management, Public Domain",
        featured: true,
      },
      {
        name: "Grace Slick",
        epithet: "Psychedelic Voice",
        dates: "b. 1939",
        domains: ["Psychedelic", "Rock", "Counterculture"],
        description:
          "Fronted Jefferson Airplane; wrote and sang 'White Rabbit' and 'Somebody to Love' (1967). The voice of San Francisco psychedelia. Unapologetically rebellious through the 1960s and beyond.",
        quote: "Through the looking glass and down the rabbit hole.",
        imageSrc: IMAGES.graceSlick,
        imageAlt: "Grace Slick, 1967",
        imageCredit: "RCA Records, Public Domain",
        featured: true,
      },
      {
        name: "The Ramones",
        epithet: "Punk Originators",
        dates: "1974–1996",
        domains: ["Punk", "Rock", "CBGB"],
        description:
          "Stripped rock to three chords and two minutes. 'Blitzkrieg Bop' (1976) became a punk anthem.",
        quote: "We decided to start our own group because we were bored with everything we heard.",
        quoteContext: "Joey Ramone",
        imageSrc: IMAGES.theRamones,
        imageAlt: "The Ramones performing in Toronto, 1976",
        imageCredit: "Plismo, CC BY 2.0",
        featured: true,
      },
      {
        name: "Ann & Nancy Wilson",
        epithet: "Heart",
        dates: "b. 1950 / b. 1954",
        domains: ["Hard Rock", "Arena Rock", "Pioneers"],
        description:
          "Proved women could play hard rock at the highest level. 'Barracuda,' 'Crazy on You,' 35 million albums sold. Sisters who led a band in a man's world and never backed down.",
        quote: "We had to be twice as good to be taken half as seriously.",
        imageSrc: IMAGES.heart,
        imageAlt: "Ann and Nancy Wilson of Heart",
        imageCredit: "Capitol Records, Public Domain",
        featured: true,
      },
      {
        name: "Patti Smith",
        epithet: "Punk Poet Laureate",
        dates: "b. 1946",
        domains: ["Punk", "Poetry", "Art Rock"],
        description:
          "Merged poetry and punk with 'Horses' (1975), one of rock's most influential debuts. 'Because the Night' (1978) co-written with Springsteen. Godmother of punk, still performing.",
        quote: "Jesus died for somebody's sins but not mine.",
        imageSrc: IMAGES.pattiSmith,
        imageAlt: "Patti Smith performing, 2007",
        imageCredit: "Beni Muck, CC BY-SA 2.0",
        featured: true,
      },
      {
        name: "Debbie Harry",
        epithet: "Blondie",
        dates: "b. 1945",
        domains: ["New Wave", "Punk", "Disco"],
        description:
          "Fronted Blondie; crossed genres from punk to disco to rap. 'Heart of Glass,' 'Call Me,' 'Rapture'—the last being the first rap song to hit #1. Made new wave glamorous and dangerous.",
        quote: "I wasn't a sex symbol, I was a sex object. But I used it.",
        imageSrc: IMAGES.debbyHarry,
        imageAlt: "Debbie Harry, 1977",
        imageCredit: "Chrysalis Records, Public Domain",
        featured: true,
      },
      {
        name: "Joan Jett",
        epithet: "Rock's Bad Reputation",
        dates: "b. 1958",
        domains: ["Rock", "Punk", "Label Owner"],
        description:
          "Rejected by 23 labels; formed Blackheart Records. 'I Love Rock 'n' Roll' (1981) spent eight weeks at #1. Proved women could build their own empires.",
        quote: "I don't give a damn 'bout my bad reputation.",
        imageSrc: IMAGES.joanJett,
        imageAlt: "Joan Jett performing live, 2013",
        imageCredit: "Andrew Hurley, CC BY-SA 2.0",
        featured: true,
      },
      {
        name: "Stevie Nicks",
        epithet: "Rock Royalty",
        dates: "b. 1948",
        domains: ["Rock", "Solo", "Fleetwood Mac"],
        description:
          "Joined Fleetwood Mac in 1975; 'Rumours' sold 40 million copies. Solo career with 'Edge of Seventeen.' First woman inducted into Rock Hall twice (with Fleetwood Mac and solo).",
        quote: "I'm not just a rock star. I'm a survivor.",
        imageSrc: IMAGES.stevieNicks,
        imageAlt: "Stevie Nicks, 1977",
        imageCredit: "Warner Bros., Public Domain",
        featured: true,
      },
      {
        name: "Pat Benatar",
        epithet: "Rock's Voice on MTV",
        dates: "b. 1953",
        domains: ["Rock", "Pop", "MTV Era"],
        description:
          "Four consecutive Grammy Awards for Best Female Rock Vocal. 'Hit Me with Your Best Shot,' 'Love Is a Battlefield.' Brought rock credibility to the video age.",
        quote: "We are young, heartache to heartache we stand.",
        imageSrc: IMAGES.patBenatar,
        imageAlt: "Pat Benatar, 1980",
        imageCredit: "Chrysalis Records, Public Domain",
        featured: true,
      },
      {
        name: "The Go-Go's",
        epithet: "All-Female #1",
        dates: "Formed 1978",
        domains: ["New Wave", "Pop", "Punk"],
        description:
          "First all-female band to write their own songs, play their own instruments, and have a #1 album ('Beauty and the Beat,' 1981). 'We Got the Beat,' 'Our Lips Are Sealed.' Rock Hall 2021.",
        quote: "We didn't set out to make history. We just wanted to make music.",
        imageSrc: IMAGES.goGos,
        imageAlt: "The Go-Go's, 1981",
        imageCredit: "IRS Records, Public Domain",
        featured: true,
      },
      {
        name: "Chrissie Hynde",
        epithet: "The Pretender",
        dates: "b. 1951",
        domains: ["Rock", "New Wave", "Songwriter"],
        description:
          "Founded The Pretenders; 'Brass in Pocket' (1979). Uncompromising leadership, distinctive voice. One of rock's great frontpeople, period.",
        quote: "I wasn't going to be a woman in rock. I was going to be a musician.",
        imageSrc: IMAGES.chrissieHynde,
        imageAlt: "Chrissie Hynde",
        imageCredit: "Sire Records, Public Domain",
        featured: true,
      },
      {
        name: "Kurt Cobain",
        epithet: "Grunge Martyr",
        dates: "1967–1994",
        domains: ["Grunge", "Alternative", "Songwriter"],
        description:
          "Nirvana frontman; 'Nevermind' sold 30 million copies. Suicide at 27 ended grunge's brightest voice.",
        quote: "I'd rather be hated for who I am than loved for who I am not.",
        imageSrc: IMAGES.kurtCobain,
        imageAlt: "Nirvana band members circa 1992",
        imageCredit: "DGC Records, Public Domain",
        featured: true,
      },
      {
        name: "Kathleen Hanna",
        epithet: "Riot Grrrl",
        dates: "b. 1968",
        domains: ["Punk", "Feminism", "DIY"],
        description:
          "Led Bikini Kill; named the industry's sexism explicitly. 'Girls to the front!' Riot grrrl gave women a voice and a movement. Later formed Le Tigre and The Julie Ruin.",
        quote: "Punk rock should mean freedom.",
        imageSrc: IMAGES.kathleenHanna,
        imageAlt: "Kathleen Hanna performing",
        imageCredit: "Colin Mutchler, CC BY-SA 2.0",
        featured: true,
      },
      {
        name: "Courtney Love",
        epithet: "Hole",
        dates: "b. 1964",
        domains: ["Grunge", "Alternative", "Confrontational"],
        description:
          "Fronted Hole; 'Live Through This' (1994) was raw confessional rock released the same week as Nirvana's end. Controversial, confrontational, unapologetically herself.",
        quote: "I'm not a woman. I'm a force of nature.",
        imageSrc: IMAGES.courtneyLove,
        imageAlt: "Courtney Love, 1995",
        imageCredit: "DGC Records, Public Domain",
        featured: true,
      },
      {
        name: "PJ Harvey",
        epithet: "Art Rock Auteur",
        dates: "b. 1969",
        domains: ["Art Rock", "Alternative", "Songwriter"],
        description:
          "Only artist to win the Mercury Prize twice. From 'Rid of Me' (1993) to 'Let England Shake' (2011), an uncompromising artistic vision across 30 years. Proved women could dominate art rock on their own terms.",
        quote: "I don't think about gender. I think about making the best possible work.",
        imageSrc: IMAGES.pjHarvey,
        imageAlt: "PJ Harvey, 2017",
        imageCredit: "Kris Krug, CC BY-SA 2.0",
        featured: true,
      },
    ],
  },
  {
    id: "chapter-12",
    number: "Chapter 12",
    title: "The Full Chorus",
    subtitle: "Recognition at Last (1987–Present)",
    era: "present",
    narrative: [
      "For decades, rock history was told with half the band missing. The women who invented the sound, who taught the moves, who wrote the songs—they were there all along. Now we hear them.",
      "In 1987, Aretha Franklin became the first woman inducted into the Rock and Roll Hall of Fame. It took 45 more years to induct Sister Rosetta Tharpe—the woman who invented the rock guitar style in the 1940s. Ruth Brown fought for 20 years to get royalties from Atlantic, the label she built. Tina Turner left an abusive marriage with 36 cents, then became the highest-grossing solo touring artist of her era.",
      "The reckoning continues. The Go-Go's entered the Rock Hall in 2021. Stevie Nicks became the first woman inducted twice. Young artists now cite Big Mama Thornton and Sister Rosetta Tharpe by name. Documentaries like 'Twenty Feet from Stardom' and 'The Go-Go's' tell the complete story.",
      "The women profiled throughout this essay—in every chapter, in every era—are no longer footnotes. From Ma Rainey to PJ Harvey, they were the foundation. We finally know.",
    ],
    figures: [
      {
        name: "Tina Turner",
        epithet: "The Queen of Rock 'n' Roll",
        dates: "1939–2023",
        domains: ["Rock", "R&B", "Triumph"],
        description:
          "Left an abusive marriage in 1976 with 36 cents and a Mobil gas card. Eight years later, 'Private Dancer' sold 20 million copies. At 44, she became the oldest solo female artist to top the charts. She didn't just survive—she became the undisputed Queen of Rock 'n' Roll.",
        quote: "I will never give up, and I will never give in.",
        imageSrc: IMAGES.tinaTurnerSolo,
        imageAlt: "Tina Turner, 1985",
        imageCredit: "Iris Schneider / Los Angeles Times, CC BY 4.0",
        featured: true,
      },
      {
        name: "Ruth Brown",
        epithet: "Miss Rhythm—Justice at Last",
        dates: "1928–2006",
        domains: ["R&B", "Activist", "Pioneer"],
        description:
          "Her hits made Atlantic 'The House That Ruth Built.' Left the label in the 1960s with no savings; worked as a bus driver, floor scrubber. Fought for 20 years; won $20,000 in back royalties and established the Rhythm and Blues Foundation. Rock Hall 1993. Tony Award 1989.",
        quote: "They called Atlantic 'The House That Ruth Built.' But Ruth wasn't getting paid. Until she fought back.",
        imageSrc: IMAGES.ruthBrown,
        imageAlt: "Ruth Brown portrait",
        imageCredit: "Atlantic Records, Public Domain",
        featured: true,
      },
      {
        name: "Sister Rosetta Tharpe",
        epithet: "The Godmother—Recognized",
        dates: "1915–1973",
        domains: ["Gospel", "Electric Guitar", "Pioneer"],
        description:
          "Invented the rock guitar style in the 1940s—a decade before Chuck Berry or Elvis. Influenced every guitarist who followed. Died in 1973, largely forgotten by rock historians. Inducted into Rock and Roll Hall of Fame in 2018—45 years later. Her legacy is finally secure.",
        quote: "All this new stuff they call Rock and Roll, why I've been playing that for years now.",
        quoteContext: "1957",
        imageSrc: IMAGES.sisterRosettaTharpe,
        imageAlt: "Sister Rosetta Tharpe with guitar, 1938",
        imageCredit: "Public Domain",
        featured: true,
      },
      {
        name: "Big Mama Thornton",
        epithet: "Hound Dog Original—Remembered",
        dates: "1926–1984",
        domains: ["Blues", "Pioneer", "Legacy"],
        description:
          "Her 1953 'Hound Dog' topped the R&B chart for seven weeks. Paid $500, no royalties. Elvis's version made him the King. She died in a Los Angeles boarding house with $10,000. Today, she's finally credited as the original—every article about 'Hound Dog' names her first.",
        quote: "Didn't get no money from them at all. Everybody livin' in a house but me.",
        quoteContext: "1984",
        imageSrc: IMAGES.bigMamaThornton,
        imageAlt: "Big Mama Thornton performing",
        imageCredit: "Barbara Weinberg Barefield, CC BY-SA 3.0",
        featured: true,
      },
    ],
  },
  {
    id: "chapter-13",
    number: "Chapter 13",
    title: "The Invisible Architects",
    subtitle: "Producers, Engineers, and Session Musicians",
    era: "evolution",
    narrative: [
      "Behind every rock hit, there are names you've never heard. Producers who shaped the sound. Engineers who captured it. Session musicians who played on more hits than the stars themselves.",
      "Phil Spector created the 'Wall of Sound' at Gold Star Studios. George Martin was the 'Fifth Beatle.' The Wrecking Crew in Los Angeles played on more #1 hits than anyone can count—drummer Hal Blaine played on 40 #1 singles. Bassist Carol Kaye played on 'Good Vibrations,' 'Wichita Lineman,' and thousands more.",
      "The Funk Brothers at Motown played on more #1 hits than the Beatles, Elvis, Rolling Stones, and Beach Boys combined—yet most died unknown and uncompensated.",
    ],
    figures: [
      {
        name: "George Martin",
        epithet: "The Fifth Beatle",
        dates: "1926–2016",
        domains: ["Producer", "Arranger", "Orchestrator"],
        description:
          "Produced virtually all Beatles recordings. Arranged strings, experimented with tape effects, enabled the band's artistic evolution.",
        imageSrc: IMAGES.georgeMartin,
        imageAlt: "The Beatles with George Martin in the studio, 1966",
        imageCredit: "EMI Records, Public Domain",
        featured: true,
      },
      {
        name: "Carol Kaye",
        epithet: "Bass Legend",
        dates: "b. 1935",
        domains: ["Bass", "Session Musician", "Wrecking Crew"],
        description:
          "Played bass on 'Good Vibrations,' 'Wichita Lineman,' and thousands more. One of few female session musicians in a male-dominated field.",
        quote: "I played on so many records, I stopped counting.",
        featured: true,
      },
    ],
  },
  {
    id: "chapter-14",
    number: "Chapter 14",
    title: "The Living Sound",
    subtitle: "Rock's Ongoing Evolution (1986–Present)",
    era: "present",
    narrative: [
      "Rock and roll was never meant to stay still. From the moment it had a name, it began to travel, to mutate, to merge with every local tradition it touched. Every decade declares rock dead; every decade it returns transformed.",
      "In Brazil, Tropicalia's children still fuse rock with samba. In Mali and Niger, Tinariwen and Bombino play 'desert blues'—the music completing a circle back to its African roots. K-rock and J-rock thrive in Asia. Måneskin won Eurovision 2021 with raw Italian rock. In every city in the world, somewhere right now, a teenager is picking up a guitar for the first time.",
      "The story is no longer written by critics in a few cities. Hip-hop sampled rock and took it somewhere new. Olivia Rodrigo cites Paramore who cite Blondie who cite the Ronettes. Brittany Howard, Fantastic Negrito, Yola, and Black Pumas carry the tradition forward, explicitly naming their lineage. The history is being told correctly now—not just who made the music, but who made the music possible.",
      "Rock and roll began as a convergence—gospel, blues, country, rhythm and blues, all flowing together into something the world had never heard. It was made by Black hands and white hands, by women and men, by the poor who had nothing but a guitar and a voice. From Memphis to Liverpool to Tokyo to Lagos to São Paulo and back. Seventy years later, the noise continues. The noise that remade the world.",
    ],
    figures: [],
  },
];

// ==================== MAIN COMPONENT ====================

export default function RockAndRollClient() {
  const scrollProgress = useScrollProgress();

  return (
    <article className="rnr-essay">
      <ProgressBar progress={scrollProgress} chapters={chapters} />
      <Hero />
      <ConvergenceSection />

      {chapters.map((chapter) => (
        <ChapterSection key={chapter.id} chapter={chapter} />
      ))}

      <Epilogue />
      <Sources />
    </article>
  );
}
