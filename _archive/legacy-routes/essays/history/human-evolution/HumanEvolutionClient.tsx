"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import "./styles/human-evolution.css";
import { chapters, type Chapter } from "./data/chapters";
import { species } from "./data/species";
import { glossary, getTermByName } from "./data/glossary";
import { specimenImages, toolImages, siteImages, methodImages } from "./data/images";

/* ========================================
   Type Definitions
   ======================================== */

interface EvidenceCardProps {
  type: "specimen" | "artifact" | "site" | "method";
  title: string;
  subtitle?: string;
  date?: string;
  description: string;
  significance?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  link?: string;
}

interface QuoteCardProps {
  text: string;
  speaker: string;
  affiliation?: string;
  source?: string;
}

interface MisconceptionProps {
  myth: string;
  reality: string;
}

/* ========================================
   Subcomponents
   ======================================== */

function ChapterNav({
  currentChapter,
  progress,
  onChapterClick,
}: {
  currentChapter: string;
  progress: number;
  onChapterClick: (id: string) => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const current = chapters.find((c) => c.id === currentChapter);

  return (
    <nav
      className={`human-evolution__nav ${isScrolled ? "human-evolution__nav--scrolled" : ""}`}
      role="navigation"
      aria-label="Chapter navigation"
    >
      <div className="human-evolution__nav-inner">
        <span className="human-evolution__nav-title">
          {current ? `${current.number}. ${current.shortTitle}` : "Human Evolution"}
        </span>

        <div
          className="human-evolution__nav-progress"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Reading progress"
        >
          <div
            className="human-evolution__nav-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="human-evolution__nav-chapters">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              className={`human-evolution__nav-chapter ${currentChapter === chapter.id ? "human-evolution__nav-chapter--active" : ""}`}
              onClick={() => onChapterClick(chapter.id)}
              aria-current={currentChapter === chapter.id ? "true" : undefined}
            >
              {chapter.number}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function EvidenceCard({
  type,
  title,
  subtitle,
  date,
  description,
  significance,
  imageUrl,
  imageAlt,
  imageCaption,
  link,
}: EvidenceCardProps) {
  return (
    <article className="human-evolution__evidence-card">
      <div className="human-evolution__evidence-card-image">
        {imageUrl ? (
          <img src={imageUrl} alt={imageAlt || title} loading="lazy" />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-stone)",
              fontSize: "0.875rem",
            }}
          >
            {type === "specimen" && "Specimen"}
            {type === "artifact" && "Artifact"}
            {type === "site" && "Site"}
            {type === "method" && "Method"}
          </div>
        )}
      </div>
      <div className="human-evolution__evidence-card-body">
        <span className="human-evolution__evidence-card-type">{type}</span>
        <h4 className="human-evolution__evidence-card-title">
          {link ? <Link href={link} style={{ color: "inherit", textDecoration: "underline", textDecorationColor: "var(--color-accent)", textUnderlineOffset: "3px" }}>{title}</Link> : title}
        </h4>
        {subtitle && (
          <p style={{ fontSize: "0.875rem", fontStyle: "italic", marginBottom: "0.5rem" }}>
            {subtitle}
          </p>
        )}
        {date && <span className="human-evolution__evidence-card-date">{date}</span>}
        <p className="human-evolution__evidence-card-description">{description}</p>
        {significance && (
          <p style={{ fontSize: "0.875rem", color: "var(--color-accent)", marginTop: "0.5rem" }}>
            {significance}
          </p>
        )}
      </div>
    </article>
  );
}

function QuoteCard({ text, speaker, affiliation, source }: QuoteCardProps) {
  return (
    <blockquote className="human-evolution__quote">
      <p className="human-evolution__quote-text">{text}</p>
      <footer className="human-evolution__quote-attribution">
        <strong>{speaker}</strong>
        {affiliation && <span>, {affiliation}</span>}
        {source && (
          <span style={{ display: "block", marginTop: "0.25rem", fontStyle: "italic" }}>
            {source}
          </span>
        )}
      </footer>
    </blockquote>
  );
}

function MisconceptionCheckpoint({ myth, reality }: MisconceptionProps) {
  return (
    <aside className="human-evolution__misconception" role="note">
      <div className="human-evolution__misconception-header">Misconception Check</div>
      <p className="human-evolution__misconception-myth">{myth}</p>
      <p className="human-evolution__misconception-reality">{reality}</p>
    </aside>
  );
}

function GlossaryTerm({ term, children }: { term: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const termData = getTermByName(term);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!termData) {
    return <span>{children}</span>;
  }

  return (
    <span className="human-evolution__term" style={{ position: "relative", display: "inline" }}>
      <button
        ref={buttonRef}
        className="human-evolution__term-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-describedby={isOpen ? `glossary-${term.replace(/\s+/g, "-")}` : undefined}
      >
        {children}
      </button>
      {isOpen && (
        <div
          id={`glossary-${term.replace(/\s+/g, "-")}`}
          className="human-evolution__term-popup"
          role="tooltip"
        >
          <strong style={{ display: "block", marginBottom: "0.5rem" }}>{termData.term}</strong>
          {termData.pronunciation && (
            <span style={{ display: "block", fontSize: "0.75rem", color: "#9CA3AF", marginBottom: "0.5rem" }}>
              /{termData.pronunciation}/
            </span>
          )}
          {termData.definition}
        </div>
      )}
    </span>
  );
}

function DeepTimeClock() {
  return (
    <div className="human-evolution__clock">
      <div className="human-evolution__clock-face">
        {/* Clock visualization would go here - simplified for now */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--color-depth)" }}>
            12:00
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--color-stone)" }}>
            7 Million Years
          </div>
        </div>
      </div>
      <div className="human-evolution__clock-labels">
        <div className="human-evolution__clock-label">1 hour = 583,333 years</div>
        <div className="human-evolution__clock-label">1 minute = 9,722 years</div>
        <div className="human-evolution__clock-label">H. sapiens = last 20 minutes</div>
        <div className="human-evolution__clock-label">Recorded history = last 31 seconds</div>
      </div>
    </div>
  );
}

const groupColors: Record<string, string> = {
  earliest: "var(--era-earliest)",
  australopith: "var(--era-australopith)",
  paranthropus: "var(--era-paranthropus)",
  "early-homo": "var(--era-early-homo)",
  erectus: "var(--era-erectus)",
  archaic: "var(--era-archaic)",
  sapiens: "var(--era-sapiens)",
};

const groupLabels: Record<string, string> = {
  earliest: "Earliest Hominins",
  australopith: "Australopithecines",
  paranthropus: "Paranthropus",
  "early-homo": "Early Homo",
  erectus: "H. erectus group",
  archaic: "Archaic Humans",
  sapiens: "Modern Humans",
};

function SpeciesTimeline() {
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const [hoveredSpecies, setHoveredSpecies] = useState<string | null>(null);

  // Maximum time in ka (7 million years = 7000 ka)
  const maxTime = 7000;
  const minTime = 0;

  // Convert species dates to ka for consistent display
  const normalizedSpecies = species.map((s) => ({
    ...s,
    startKa: s.dateUnit === "Ma" ? s.dateFirst * 1000 : s.dateFirst,
    endKa: s.dateUnit === "Ma" ? s.dateLast * 1000 : s.dateLast,
  }));

  // Sort by start date (oldest first)
  const sortedSpecies = [...normalizedSpecies].sort((a, b) => b.startKa - a.startKa);

  const getBarWidth = (startKa: number, endKa: number) => {
    const duration = startKa - endKa;
    return (duration / maxTime) * 100;
  };

  const getBarOffset = (startKa: number) => {
    return ((maxTime - startKa) / maxTime) * 100;
  };

  const selectedData = selectedSpecies
    ? sortedSpecies.find(s => s.id === selectedSpecies)
    : null;

  return (
    <div className="human-evolution__timeline" role="figure" aria-label="Species timeline showing temporal ranges of human ancestors">
      <div className="human-evolution__timeline-header">
        <h3 className="human-evolution__timeline-title">Species Through Time</h3>
        <div className="human-evolution__timeline-legend">
          {Object.entries(groupLabels).slice(0, 4).map(([key, label]) => (
            <div key={key} className="human-evolution__timeline-legend-item">
              <div
                className="human-evolution__timeline-legend-dot"
                style={{ backgroundColor: groupColors[key] }}
              />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Time axis */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "var(--space-md)",
        paddingLeft: "200px",
        fontSize: "0.75rem",
        fontFamily: "var(--font-mono)",
        color: "var(--color-stone)"
      }}>
        <span>7 Ma</span>
        <span>5 Ma</span>
        <span>3 Ma</span>
        <span>1 Ma</span>
        <span>Now</span>
      </div>

      {/* Species bars */}
      <div style={{ position: "relative" }}>
        {sortedSpecies.map((s) => (
          <button
            key={s.id}
            className="human-evolution__timeline-species"
            onClick={() => setSelectedSpecies(selectedSpecies === s.id ? null : s.id)}
            onMouseEnter={() => setHoveredSpecies(s.id)}
            onMouseLeave={() => setHoveredSpecies(null)}
            style={{
              width: "100%",
              background: selectedSpecies === s.id ? "var(--color-sediment)" : "transparent",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
            }}
            aria-pressed={selectedSpecies === s.id}
            aria-label={`${s.name}: ${s.dateFirst} to ${s.dateLast} ${s.dateUnit}`}
          >
            <span className="human-evolution__timeline-species-name">
              {s.name}
            </span>
            <div style={{ flex: 1, position: "relative", height: "24px" }}>
              <div
                className="human-evolution__timeline-species-bar"
                style={{
                  backgroundColor: groupColors[s.group],
                  width: `${getBarWidth(s.startKa, s.endKa)}%`,
                  marginLeft: `${getBarOffset(s.startKa)}%`,
                  opacity: hoveredSpecies === s.id || selectedSpecies === s.id ? 1 : 0.7,
                  transition: "opacity var(--transition-fast)",
                }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Selected species detail */}
      {selectedData && (
        <div
          style={{
            marginTop: "var(--space-lg)",
            padding: "var(--space-lg)",
            background: "var(--color-bone)",
            borderRadius: "8px",
            borderLeft: `4px solid ${groupColors[selectedData.group]}`,
          }}
          role="region"
          aria-live="polite"
        >
          <h4 style={{ fontFamily: "var(--font-display)", marginBottom: "var(--space-sm)" }}>
            <em>{selectedData.name}</em>
            {selectedData.commonName && (
              <span style={{ fontStyle: "normal", color: "var(--color-stone)" }}>
                {" "}({selectedData.commonName})
              </span>
            )}
          </h4>
          <p style={{ fontSize: "0.875rem", marginBottom: "var(--space-sm)" }}>
            <strong>Time range:</strong> {selectedData.dateFirst} - {selectedData.dateLast} {selectedData.dateUnit}
          </p>
          <p style={{ fontSize: "0.875rem", marginBottom: "var(--space-sm)" }}>
            <strong>Location:</strong> {selectedData.location}
          </p>
          {selectedData.brainSize && (
            <p style={{ fontSize: "0.875rem", marginBottom: "var(--space-sm)" }}>
              <strong>Brain size:</strong> {selectedData.brainSize.value} cc
              {selectedData.brainSize.range && (
                <span> (range: {selectedData.brainSize.range[0]}-{selectedData.brainSize.range[1]} cc)</span>
              )}
            </p>
          )}
          <p style={{ fontSize: "0.875rem", marginBottom: "var(--space-sm)" }}>
            <strong>Significance:</strong> {selectedData.significance}
          </p>
          <div style={{ marginTop: "var(--space-md)" }}>
            <strong style={{ fontSize: "0.875rem" }}>Key features:</strong>
            <ul style={{ fontSize: "0.875rem", marginTop: "var(--space-xs)", paddingLeft: "1.5rem" }}>
              {selectedData.keyFeatures.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function AdmixtureVisualizer() {
  const populations = [
    { name: "Sub-Saharan African", neanderthal: 0, denisovan: 0 },
    { name: "European", neanderthal: 2.0, denisovan: 0 },
    { name: "East Asian", neanderthal: 2.3, denisovan: 0.2 },
    { name: "South Asian", neanderthal: 2.2, denisovan: 0.3 },
    { name: "Melanesian", neanderthal: 2.0, denisovan: 4.0 },
    { name: "Native American", neanderthal: 1.7, denisovan: 0.1 },
  ];

  const maxPercent = 6;

  return (
    <div
      className="human-evolution__timeline"
      role="figure"
      aria-label="Archaic human DNA in modern populations"
    >
      <div className="human-evolution__timeline-header">
        <h3 className="human-evolution__timeline-title">Archaic DNA in Modern Populations</h3>
        <div className="human-evolution__timeline-legend">
          <div className="human-evolution__timeline-legend-item">
            <div
              className="human-evolution__timeline-legend-dot"
              style={{ backgroundColor: "var(--era-archaic)" }}
            />
            <span>Neanderthal</span>
          </div>
          <div className="human-evolution__timeline-legend-item">
            <div
              className="human-evolution__timeline-legend-dot"
              style={{ backgroundColor: "var(--era-erectus)" }}
            />
            <span>Denisovan</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "var(--space-lg)" }}>
        {populations.map((pop) => (
          <div
            key={pop.name}
            style={{
              marginBottom: "var(--space-md)",
              display: "grid",
              gridTemplateColumns: "150px 1fr",
              alignItems: "center",
              gap: "var(--space-md)",
            }}
          >
            <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{pop.name}</span>
            <div style={{ display: "flex", gap: "2px", height: "24px" }}>
              <div
                style={{
                  width: `${(pop.neanderthal / maxPercent) * 100}%`,
                  backgroundColor: "var(--era-archaic)",
                  borderRadius: "3px 0 0 3px",
                  transition: "width var(--transition-base)",
                }}
                title={`${pop.neanderthal}% Neanderthal`}
              />
              <div
                style={{
                  width: `${(pop.denisovan / maxPercent) * 100}%`,
                  backgroundColor: "var(--era-erectus)",
                  borderRadius: "0 3px 3px 0",
                  transition: "width var(--transition-base)",
                }}
                title={`${pop.denisovan}% Denisovan`}
              />
              <span style={{
                marginLeft: "var(--space-sm)",
                fontSize: "0.75rem",
                color: "var(--color-stone)",
                alignSelf: "center",
              }}>
                {(pop.neanderthal + pop.denisovan).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <p style={{
        fontSize: "0.8125rem",
        color: "var(--color-stone)",
        marginTop: "var(--space-lg)",
        fontStyle: "italic",
      }}>
        Note: Percentages are approximate averages. Individual variation exists within all populations.
        Source: Compiled from Green et al. 2010, Reich et al. 2010, Sankararaman et al. 2014
      </p>
    </div>
  );
}

function TableOfContents({ onChapterClick }: { onChapterClick: (id: string) => void }) {
  return (
    <nav className="human-evolution__toc" aria-label="Table of contents">
      <h3 style={{
        fontFamily: "var(--font-ui)",
        fontSize: "0.875rem",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: "var(--color-stone)",
        marginBottom: "var(--space-lg)",
      }}>
        Contents
      </h3>
      <ol style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "var(--space-sm)",
      }}>
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <button
              onClick={() => onChapterClick(chapter.id)}
              style={{
                background: "none",
                border: "none",
                padding: "var(--space-sm) var(--space-md)",
                width: "100%",
                textAlign: "left",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                color: "var(--color-earth)",
                borderRadius: "4px",
                transition: "background var(--transition-fast)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-sediment)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
              }}
            >
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--color-stone)",
                marginRight: "var(--space-sm)",
              }}>
                {chapter.number.toString().padStart(2, "0")}
              </span>
              {chapter.title}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function GlossarySection() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const categories = ["anatomy", "species", "method", "era", "concept", "tool", "site"] as const;
  const categoryLabels: Record<typeof categories[number], string> = {
    anatomy: "Anatomy",
    species: "Species",
    method: "Methods",
    era: "Geological Eras",
    concept: "Concepts",
    tool: "Tool Industries",
    site: "Key Sites",
  };

  return (
    <section className="human-evolution__glossary-section">
      <h3 style={{
        fontFamily: "var(--font-display)",
        fontSize: "1.5rem",
        marginBottom: "var(--space-lg)",
      }}>
        Glossary
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
        {categories.map((category) => {
          const terms = glossary.filter(t => t.category === category);
          const isOpen = openCategory === category;

          return (
            <div key={category} style={{
              background: "white",
              borderRadius: "8px",
              overflow: "hidden",
            }}>
              <button
                onClick={() => setOpenCategory(isOpen ? null : category)}
                style={{
                  width: "100%",
                  padding: "var(--space-md) var(--space-lg)",
                  background: "none",
                  border: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  fontFamily: "var(--font-ui)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--color-earth)",
                }}
                aria-expanded={isOpen}
              >
                <span>{categoryLabels[category]}</span>
                <span style={{
                  fontSize: "0.75rem",
                  color: "var(--color-stone)",
                }}>
                  {terms.length} terms {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <div style={{
                  padding: "0 var(--space-lg) var(--space-lg)",
                  display: "grid",
                  gap: "var(--space-md)",
                }}>
                  {terms.map((term) => (
                    <div key={term.term} style={{
                      paddingBottom: "var(--space-md)",
                      borderBottom: "1px solid var(--color-sediment)",
                    }}>
                      <strong style={{ display: "block" }}>
                        {term.term}
                        {term.pronunciation && (
                          <span style={{
                            fontWeight: "normal",
                            fontSize: "0.8125rem",
                            color: "var(--color-stone)",
                            marginLeft: "var(--space-sm)",
                          }}>
                            /{term.pronunciation}/
                          </span>
                        )}
                      </strong>
                      <p style={{
                        fontSize: "0.875rem",
                        color: "var(--color-earth)",
                        marginTop: "var(--space-xs)",
                        lineHeight: 1.5,
                      }}>
                        {term.definition}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SourcesSection() {
  const sources = {
    books: [
      "Stringer, C. & Andrews, P. (2012). The Complete World of Human Evolution. Thames & Hudson.",
      "Reich, D. (2018). Who We Are and How We Got Here. Pantheon Books.",
      "Pääbo, S. (2014). Neanderthal Man: In Search of Lost Genomes. Basic Books.",
      "Johanson, D. & Edgar, B. (2006). From Lucy to Language. Simon & Schuster.",
      "Wood, B. (2019). Human Evolution: A Very Short Introduction. Oxford University Press.",
    ],
    journals: [
      "Nature (www.nature.com) - Primary source for major fossil and genetic discoveries",
      "Science (www.science.org) - Major research publications on human evolution",
      "Journal of Human Evolution - Specialized peer-reviewed research",
      "Proceedings of the National Academy of Sciences - Interdisciplinary human evolution research",
    ],
    institutions: [
      "Smithsonian National Museum of Natural History - Human Origins Program",
      "Natural History Museum, London - Human Evolution collection",
      "Max Planck Institute for Evolutionary Anthropology",
      "The Leakey Foundation",
    ],
  };

  return (
    <section className="human-evolution__sources-section">
      <h3 style={{
        fontFamily: "var(--font-display)",
        fontSize: "1.5rem",
        marginBottom: "var(--space-lg)",
      }}>
        Sources & Further Reading
      </h3>

      <div style={{ display: "grid", gap: "var(--space-xl)" }}>
        <div>
          <h4 style={{
            fontFamily: "var(--font-ui)",
            fontSize: "0.875rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--color-stone)",
            marginBottom: "var(--space-md)",
          }}>
            Key Books
          </h4>
          <ul style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            fontSize: "0.875rem",
            color: "var(--color-earth)",
          }}>
            {sources.books.map((book, i) => (
              <li key={i} style={{ marginBottom: "var(--space-sm)" }}>{book}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{
            fontFamily: "var(--font-ui)",
            fontSize: "0.875rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--color-stone)",
            marginBottom: "var(--space-md)",
          }}>
            Academic Journals
          </h4>
          <ul style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            fontSize: "0.875rem",
            color: "var(--color-earth)",
          }}>
            {sources.journals.map((journal, i) => (
              <li key={i} style={{ marginBottom: "var(--space-sm)" }}>{journal}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{
            fontFamily: "var(--font-ui)",
            fontSize: "0.875rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--color-stone)",
            marginBottom: "var(--space-md)",
          }}>
            Research Institutions
          </h4>
          <ul style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            fontSize: "0.875rem",
            color: "var(--color-earth)",
          }}>
            {sources.institutions.map((inst, i) => (
              <li key={i} style={{ marginBottom: "var(--space-sm)" }}>{inst}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{
            fontFamily: "var(--font-ui)",
            fontSize: "0.875rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--color-stone)",
            marginBottom: "var(--space-md)",
          }}>
            Further Reading on Esy
          </h4>
          <ul style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            fontSize: "0.875rem",
            color: "var(--color-earth)",
          }}>
            <li style={{ marginBottom: "var(--space-md)" }}>
              <Link href="/essays/science/turkana-boy" style={{ color: "var(--color-accent)" }}>
                Turkana Boy: The Skeleton That Redefined Human Evolution
              </Link>
              {" — "}
              KNM-WT 15000, the most complete early human skeleton ever found. An interactive visual essay with 3D fossil specimens.
            </li>
            <li style={{ marginBottom: "var(--space-md)" }}>
              <Link href="/essays/science/homo-naledi" style={{ color: "var(--color-accent)" }}>
                Homo naledi: The Small-Brained Species That Buried Its Dead
              </Link>
              {" — "}
              The Rising Star Cave discovery that challenges the link between brain size and behavioural complexity.
            </li>
            <li style={{ marginBottom: "var(--space-md)" }}>
              <Link href="/essays/science/seven-million-years" style={{ color: "var(--color-accent)" }}>
                Seven Million Years: A Visual Journey Through Human Evolution
              </Link>
              {" — "}
              From Sahelanthropus to Homo sapiens — the complete arc of hominin evolution in one visual essay.
            </li>
            <li style={{ marginBottom: "var(--space-md)" }}>
              <Link href="/infographics/seven-million-years-homo" style={{ color: "var(--color-accent)" }}>
                Infographic: How Our Brains Grew Over 7 Million Years
              </Link>
              {" — "}
              Cranial capacity comparison across 8 hominid species, from Sahelanthropus (350 cc) to Homo sapiens (1,350 cc).
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function BrainSizeComparison() {
  const brainData = [
    { species: "Chimpanzee", size: 400, era: "reference" },
    { species: "Sahelanthropus", size: 350, era: "earliest" },
    { species: "Australopithecus", size: 450, era: "australopith" },
    { species: "Homo habilis", size: 550, era: "early-homo" },
    { species: "Homo ergaster", size: 850, era: "erectus" },
    { species: "Homo erectus", size: 1000, era: "erectus" },
    { species: "H. heidelbergensis", size: 1250, era: "archaic" },
    { species: "Neanderthal", size: 1450, era: "archaic" },
    { species: "Homo sapiens", size: 1350, era: "sapiens" },
  ];

  const maxSize = 1700;

  return (
    <div
      className="human-evolution__timeline"
      role="figure"
      aria-label="Brain size comparison across hominin species"
    >
      <div className="human-evolution__timeline-header">
        <h3 className="human-evolution__timeline-title">Brain Size Through Evolution</h3>
      </div>

      <div style={{ marginTop: "var(--space-lg)" }}>
        {brainData.map((item) => (
          <div
            key={item.species}
            style={{
              marginBottom: "var(--space-sm)",
              display: "grid",
              gridTemplateColumns: "140px 1fr 60px",
              alignItems: "center",
              gap: "var(--space-sm)",
            }}
          >
            <span style={{
              fontSize: "0.8125rem",
              fontStyle: item.species !== "Chimpanzee" ? "italic" : "normal",
            }}>
              {item.species}
            </span>
            <div style={{
              height: "20px",
              background: "var(--color-sediment)",
              borderRadius: "3px",
              overflow: "hidden",
            }}>
              <div
                style={{
                  width: `${(item.size / maxSize) * 100}%`,
                  height: "100%",
                  backgroundColor: item.era === "reference"
                    ? "var(--color-stone)"
                    : groupColors[item.era] || "var(--color-accent)",
                  transition: "width var(--transition-base)",
                }}
              />
            </div>
            <span style={{
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              color: "var(--color-stone)",
            }}>
              {item.size} cc
            </span>
          </div>
        ))}
      </div>

      <p style={{
        fontSize: "0.8125rem",
        color: "var(--color-stone)",
        marginTop: "var(--space-lg)",
        fontStyle: "italic",
      }}>
        Brain sizes shown are species averages. Significant individual variation existed within each species.
      </p>
    </div>
  );
}

/* ========================================
   Chapter Content Components
   ======================================== */

function ChapterDeepTime() {
  const chapter = chapters[0];
  return (
    <section id={chapter.id} className="human-evolution__chapter">
      <div className="human-evolution__content">
        <header className="human-evolution__chapter-header">
          <span className="human-evolution__chapter-number">Chapter {chapter.number}</span>
          <h2>{chapter.title}</h2>
        </header>

        <p className="human-evolution__chapter-hook">{chapter.hook}</p>

        <p>
          To understand human evolution, we must first grapple with a concept our brains struggle
          to comprehend: deep time. The Earth is approximately 4.54 billion years old. Life
          appeared roughly 3.8 billion years ago. But our lineage—the{" "}
          <GlossaryTerm term="Hominin">hominins</GlossaryTerm>—branched off from chimpanzees
          only about 6-7 million years ago.
        </p>

        <DeepTimeClock />

        <p>
          If we compress Earth&apos;s entire history into a 12-hour clock starting at midnight,
          the first <GlossaryTerm term="Hominin">hominins</GlossaryTerm> appear at approximately
          11:59:07—less than a minute before noon. Modern humans, <em>Homo sapiens</em>, emerge
          in the final 20 minutes. And all of recorded human history—agriculture, cities,
          writing, empires—occupies just the last 31 seconds.
        </p>

        <QuoteCard
          text="When you take a long, long view... the one thing about the long term perspective is that it lowers the blood pressure."
          speaker="Daniel Lord Smail"
          affiliation="Professor of History, Harvard University"
          source="The Harvard Crimson, February 2025"
        />

        <p>
          This perspective matters. It reminds us that the characteristics we consider
          quintessentially human—language, art, complex societies—are evolutionary novelties.
          For most of our lineage&apos;s existence, our ancestors lived very differently than we do.
        </p>

        <MisconceptionCheckpoint
          myth="Evolution is a ladder from primitive to advanced, with humans at the top."
          reality="Evolution is a branching bush with many contemporary lineages. Humans are one twig among millions, not the culmination of a directed process."
        />
      </div>
    </section>
  );
}

function ChapterHowWeKnow() {
  const chapter = chapters[1];
  return (
    <section id={chapter.id} className="human-evolution__chapter">
      <div className="human-evolution__content">
        <header className="human-evolution__chapter-header">
          <span className="human-evolution__chapter-number">Chapter {chapter.number}</span>
          <h2>{chapter.title}</h2>
        </header>

        <p className="human-evolution__chapter-hook">{chapter.hook}</p>

        <p>
          The study of human evolution relies on multiple converging lines of evidence. No single
          fossil or gene tells the whole story. Instead, scientists piece together our past from
          fossilized bones, stone tools, ancient DNA, and comparative anatomy with living species.
        </p>

        <div className="human-evolution__evidence-grid">
          <EvidenceCard
            type="method"
            title="Radiometric Dating"
            description="Measures the decay of radioactive isotopes in volcanic rocks surrounding fossils. Potassium-argon and argon-argon dating work for rocks millions of years old."
            significance="Provides absolute ages with known error ranges"
            imageUrl={methodImages.radiometricDating.src}
            imageAlt={methodImages.radiometricDating.alt}
            imageCaption={methodImages.radiometricDating.caption}
          />
          <EvidenceCard
            type="method"
            title="Ancient DNA"
            description="Genetic material extracted from bones up to several hundred thousand years old. Has revealed interbreeding between human species."
            significance="Revolutionized our understanding since 2010"
            imageUrl={methodImages.ancientDNA.src}
            imageAlt={methodImages.ancientDNA.alt}
            imageCaption={methodImages.ancientDNA.caption}
          />
          <EvidenceCard
            type="method"
            title="Stratigraphy"
            description="The study of rock layers and their sequence. Fossils in lower layers are generally older than those above."
            significance="Establishes relative chronology"
            imageUrl={methodImages.stratigraphy.src}
            imageAlt={methodImages.stratigraphy.alt}
            imageCaption={methodImages.stratigraphy.caption}
          />
          <EvidenceCard
            type="method"
            title="Comparative Anatomy"
            description="Comparing skeletal features with living apes and other fossils to understand evolutionary relationships and locomotion."
            significance="Reveals how our bodies changed over time"
            imageUrl={methodImages.comparativeAnatomy.src}
            imageAlt={methodImages.comparativeAnatomy.alt}
            imageCaption={methodImages.comparativeAnatomy.caption}
          />
        </div>

        <QuoteCard
          text="I used to say I was trying to improve our understanding of human evolution. Now I prefer to say I'm trying to reduce our ignorance about it."
          speaker="Bernard Wood"
          affiliation="George Washington University"
          source="FAPESP interview, 2023"
        />

        <p>
          The fossil record is inherently incomplete. Fossilization requires specific conditions,
          and most organisms decompose without leaving traces. What we have discovered represents
          a tiny fraction of the individuals who ever lived. Yet despite these limitations, the
          evidence consistently points to Africa as the birthplace of our lineage.
        </p>
      </div>
    </section>
  );
}

function ChapterTreeOfLife() {
  const chapter = chapters[2];
  return (
    <section id={chapter.id} className="human-evolution__chapter">
      <div className="human-evolution__content">
        <header className="human-evolution__chapter-header">
          <span className="human-evolution__chapter-number">Chapter {chapter.number}</span>
          <h2>{chapter.title}</h2>
        </header>

        <p className="human-evolution__chapter-hook">{chapter.hook}</p>

        <p>
          Humans belong to the great ape family (<GlossaryTerm term="Hominid">Hominidae</GlossaryTerm>),
          which includes chimpanzees, bonobos, gorillas, and orangutans. Within this family, we
          share our closest relationship with chimpanzees and bonobos—we diverged from their
          ancestors approximately 6-7 million years ago.
        </p>

        <p>
          But this doesn&apos;t mean we &quot;evolved from chimps.&quot; Modern chimpanzees and modern
          humans are cousins, not ancestors and descendants. Both lineages have been evolving
          for the same amount of time since our split. The common ancestor we shared would have
          looked different from either species today.
        </p>

        <MisconceptionCheckpoint
          myth="Humans evolved from chimpanzees or gorillas."
          reality="Humans and African apes share common ancestors. We are evolutionary cousins, not descendants of any living ape species."
        />

        <p>
          What makes human evolution particularly interesting is that for most of our history,
          multiple hominin species coexisted. The idea of a single &quot;missing link&quot; is
          fundamentally flawed—evolution produced a &quot;bushy&quot; tree with many branches,
          not a simple chain.
        </p>

        <SpeciesTimeline />

        <QuoteCard
          text="The straight line has blossomed into a spreading, rather uncontrolled bush."
          speaker="Paleoanthropologists"
          source="On the modern understanding of human phylogeny"
        />
      </div>
    </section>
  );
}

function ChapterAfricanOrigins() {
  const chapter = chapters[3];
  return (
    <section id={chapter.id} className="human-evolution__chapter">
      <div className="human-evolution__content">
        <header className="human-evolution__chapter-header">
          <span className="human-evolution__chapter-number">Chapter {chapter.number}</span>
          <h2>{chapter.title}</h2>
        </header>

        <p className="human-evolution__chapter-hook">{chapter.hook}</p>

        <p>
          The earliest known hominins come from Africa. The Great Rift Valley—a massive geological
          feature running from Ethiopia to Mozambique—has been particularly productive for fossil
          discoveries. The rifting process exposed ancient sediments and created conditions that
          preserved bones for millions of years.
        </p>

        <div className="human-evolution__evidence-grid">
          <EvidenceCard
            type="specimen"
            title="Sahelanthropus tchadensis"
            subtitle="'Toumai'"
            date="~7-6 Ma"
            description="The oldest candidate hominin, found in Chad. Its forward-positioned foramen magnum suggests possible bipedalism."
            significance="May represent the earliest known hominin"
            imageUrl={specimenImages.toumai.src}
            imageAlt={specimenImages.toumai.alt}
            imageCaption={specimenImages.toumai.caption}
          />
          <EvidenceCard
            type="specimen"
            title="Ardipithecus ramidus"
            subtitle="'Ardi'"
            date="4.4 Ma"
            description="A 45% complete skeleton from Ethiopia showing a mosaic of ape-like and hominin features. Had a grasping big toe but walked bipedally."
            significance="Demonstrates woodland bipedalism"
            imageUrl={specimenImages.ardi.src}
            imageAlt={specimenImages.ardi.alt}
            imageCaption={specimenImages.ardi.caption}
          />
          <EvidenceCard
            type="specimen"
            title="Australopithecus afarensis"
            subtitle="'Lucy'"
            date="3.2 Ma"
            description="The famous partial skeleton from Hadar, Ethiopia. About 40% complete, representing a young adult female."
            significance="Best-known early hominin"
            imageUrl={specimenImages.lucy.src}
            imageAlt={specimenImages.lucy.alt}
            imageCaption={specimenImages.lucy.caption}
          />
        </div>

        <QuoteCard
          text="The message we would like to convey is that our species is much older than we thought and that it did not emerge in an Adamic way in a small 'Garden of Eden' somewhere in East Africa. It is a pan-African process and more complex scenario than what has been envisioned so far."
          speaker="Jean-Jacques Hublin"
          affiliation="Max Planck Institute for Evolutionary Anthropology"
          source="Press release, June 2017"
        />

        <p>
          The <GlossaryTerm term="Australopithecus">australopithecines</GlossaryTerm> represent
          a diverse radiation of early hominins. They had small brains (roughly the size of a
          chimpanzee&apos;s), but their lower bodies were adapted for walking upright. This
          combination—bipedal locomotion with small brains—challenges the old assumption that
          brain expansion drove human evolution.
        </p>
      </div>
    </section>
  );
}

function ChapterWalkingUpright() {
  const chapter = chapters[4];
  return (
    <section id={chapter.id} className="human-evolution__chapter">
      <div className="human-evolution__content">
        <header className="human-evolution__chapter-header">
          <span className="human-evolution__chapter-number">Chapter {chapter.number}</span>
          <h2>{chapter.title}</h2>
        </header>

        <p className="human-evolution__chapter-hook">{chapter.hook}</p>

        <p>
          <GlossaryTerm term="Bipedalism">Bipedalism</GlossaryTerm>—walking upright on two
          legs—is the defining characteristic of hominins. It appeared millions of years before
          large brains, complex tools, or language. The footprints at{" "}
          <GlossaryTerm term="Laetoli">Laetoli</GlossaryTerm>, Tanzania, preserved in volcanic
          ash 3.66 million years ago, provide direct evidence of this early walking.
        </p>

        <EvidenceCard
          type="site"
          title="Laetoli Footprints"
          date="3.66 Ma"
          description="A trackway of footprints made by at least two individuals walking through fresh volcanic ash. The prints show a human-like gait with a heel strike and toe push-off."
          significance="Oldest direct evidence of bipedal locomotion"
          imageUrl={specimenImages.laetoli.src}
          imageAlt={specimenImages.laetoli.alt}
          imageCaption={specimenImages.laetoli.caption}
        />

        <p>
          The skeleton underwent significant modifications for upright walking. The{" "}
          <GlossaryTerm term="Foramen magnum">foramen magnum</GlossaryTerm> shifted from the
          back of the skull to underneath it, allowing the head to balance atop the spine. The
          pelvis became shorter and bowl-shaped to support internal organs. The spine developed
          an S-curve for shock absorption.
        </p>

        <p>
          Why did bipedalism evolve? Scientists have proposed many hypotheses: freeing the hands
          for carrying food or tools, seeing over tall grass, thermoregulation in open
          environments, or simply being an efficient way to travel between food patches. The
          truth likely involves multiple factors—evolution rarely has single causes.
        </p>

        <MisconceptionCheckpoint
          myth="Bipedalism evolved because our ancestors moved from forests to savannas."
          reality="Early bipeds like Ardipithecus lived in woodlands. Bipedalism predates savanna expansion and likely evolved for multiple reasons."
        />
      </div>
    </section>
  );
}

function ChapterGenusHomo() {
  const chapter = chapters[5];
  return (
    <section id={chapter.id} className="human-evolution__chapter">
      <div className="human-evolution__content">
        <header className="human-evolution__chapter-header">
          <span className="human-evolution__chapter-number">Chapter {chapter.number}</span>
          <h2>{chapter.title}</h2>
        </header>

        <p className="human-evolution__chapter-hook">{chapter.hook}</p>

        <p>
          The genus <em>Homo</em> emerged around 2.5 million years ago, marked by increased brain
          size and a new relationship with technology. <GlossaryTerm term="Homo habilis">Homo habilis</GlossaryTerm>,
          the &quot;handy man,&quot; is associated with the earliest{" "}
          <GlossaryTerm term="Oldowan">Oldowan</GlossaryTerm> stone tools—simple flakes struck
          from river cobbles.
        </p>

        <div className="human-evolution__evidence-grid">
          <EvidenceCard
            type="artifact"
            title="Oldowan Tools"
            date="2.6 Ma"
            description="Simple choppers and flakes made by striking one rock against another. Used for processing meat and plant foods."
            significance="Earliest systematic tool tradition"
            imageUrl={toolImages.oldowanChopper.src}
            imageAlt={toolImages.oldowanChopper.alt}
            imageCaption={toolImages.oldowanChopper.caption}
          />
          <EvidenceCard
            type="artifact"
            title="Acheulean Handaxes"
            date="1.76 Ma"
            description="Teardrop-shaped bifacial tools requiring sophisticated planning and skill. Remarkably consistent across continents and millennia."
            significance="Shows advanced cognitive planning"
            imageUrl={toolImages.acheuleanHandaxe.src}
            imageAlt={toolImages.acheuleanHandaxe.alt}
            imageCaption={toolImages.acheuleanHandaxe.caption}
          />
          <EvidenceCard
            type="specimen"
            title="Turkana Boy"
            subtitle="KNM-WT 15000"
            date="1.6 Ma"
            description="A nearly complete Homo ergaster skeleton of an adolescent boy. Shows modern human body proportions with a tall, lean build."
            significance="First evidence of modern body plan"
            imageUrl={specimenImages.turkanaBoy.src}
            imageAlt={specimenImages.turkanaBoy.alt}
            imageCaption={specimenImages.turkanaBoy.caption}
            link="/essays/science/turkana-boy"
          />
        </div>

        <p>
          <GlossaryTerm term="Homo erectus">Homo erectus</GlossaryTerm> was the first hominin
          to leave Africa. By 1.8 million years ago, populations had reached Georgia (at the
          site of Dmanisi) and eventually spread across Asia. This species survived for nearly
          2 million years—far longer than our own species has existed.
        </p>

        <BrainSizeComparison />

        <QuoteCard
          text="Fifty years ago, we really could have put most of our evidence on a small card table. Now this stage couldn't hold it all. There are thousands of fossils."
          speaker="Richard Leakey"
          source="University of Delaware lecture, 2018"
        />
      </div>
    </section>
  );
}

function ChapterOtherHumans() {
  const chapter = chapters[6];
  return (
    <section id={chapter.id} className="human-evolution__chapter">
      <div className="human-evolution__content">
        <header className="human-evolution__chapter-header">
          <span className="human-evolution__chapter-number">Chapter {chapter.number}</span>
          <h2>{chapter.title}</h2>
        </header>

        <p className="human-evolution__chapter-hook">{chapter.hook}</p>

        <p>
          Perhaps the most humbling discovery of modern paleoanthropology is that <em>Homo sapiens</em>
          was never alone. For most of our species&apos; existence, we shared the planet with other
          human species—some of whom we met, lived alongside, and even had children with.
        </p>

        <div className="human-evolution__evidence-grid">
          <EvidenceCard
            type="specimen"
            title="Homo neanderthalensis"
            subtitle="Neanderthals"
            date="400-40 ka"
            description="Our closest extinct relatives, living in Europe and western Asia. They had larger brains than us, made sophisticated tools, buried their dead, and created art."
            significance="1-2% of non-African DNA is Neanderthal"
            imageUrl={specimenImages.neanderthalSkull.src}
            imageAlt={specimenImages.neanderthalSkull.alt}
            imageCaption={specimenImages.neanderthalSkull.caption}
          />
          <EvidenceCard
            type="specimen"
            title="Denisovans"
            date="~300-30 ka"
            description="Known primarily from DNA extracted from bone fragments found in Siberia. They ranged across Asia and interbred with both Neanderthals and modern humans."
            significance="Up to 6% of Melanesian DNA is Denisovan"
            imageUrl={specimenImages.denisovaCave.src}
            imageAlt={specimenImages.denisovaCave.alt}
            imageCaption={specimenImages.denisovaCave.caption}
          />
          <EvidenceCard
            type="specimen"
            title="Homo floresiensis"
            subtitle="'Hobbit'"
            date="190-50 ka"
            description="A small-bodied, small-brained human species from the island of Flores, Indonesia. Adults stood only about 1 meter tall."
            significance="Survived until ~50,000 years ago"
            imageUrl={specimenImages.floresiensisSkull.src}
            imageAlt={specimenImages.floresiensisSkull.alt}
            imageCaption={specimenImages.floresiensisSkull.caption}
          />
          <EvidenceCard
            type="specimen"
            title="Homo naledi"
            date="335-236 ka"
            description="Discovered in South Africa's Rising Star Cave system. Combined primitive body features with human-like hands and feet. May have deliberately disposed of their dead."
            significance="Contemporary with early H. sapiens"
            imageUrl={specimenImages.nalediSkull.src}
            imageAlt={specimenImages.nalediSkull.alt}
            imageCaption={specimenImages.nalediSkull.caption}
          />
        </div>

        <QuoteCard
          text="We used to think that when modern humans left Africa, they entered a Europe populated only by Neanderthals. But the genetic evidence tells us there were multiple populations, multiple migrations, and multiple mixings."
          speaker="Svante Pääbo"
          affiliation="Max Planck Institute for Evolutionary Anthropology"
          source="Nobel Prize Lecture, 2022"
        />

        <p>
          The discovery of <GlossaryTerm term="Admixture">admixture</GlossaryTerm>—genetic mixing
          between species—has transformed our understanding. <GlossaryTerm term="Neanderthal">Neanderthals</GlossaryTerm>
          weren&apos;t simply replaced; they were partially absorbed into our gene pool. Their DNA
          persists in billions of people today, influencing everything from immune function to
          skin pigmentation.
        </p>

        <MisconceptionCheckpoint
          myth="Neanderthals were brutish, stupid cavemen who died out because they were inferior to us."
          reality="Neanderthals had brains as large as or larger than ours, made tools, art, and jewelry, cared for their sick, and buried their dead. Their extinction likely resulted from multiple factors including climate change, competition, and absorption through interbreeding."
        />

        <AdmixtureVisualizer />
      </div>
    </section>
  );
}

function ChapterHomoSapiens() {
  const chapter = chapters[7];
  return (
    <section id={chapter.id} className="human-evolution__chapter">
      <div className="human-evolution__content">
        <header className="human-evolution__chapter-header">
          <span className="human-evolution__chapter-number">Chapter {chapter.number}</span>
          <h2>{chapter.title}</h2>
        </header>

        <p className="human-evolution__chapter-hook">{chapter.hook}</p>

        <p>
          In 2017, a team of researchers announced a discovery that pushed back the origin of our
          species by over 100,000 years. At <GlossaryTerm term="Jebel Irhoud">Jebel Irhoud</GlossaryTerm>,
          Morocco, they found fossils of early <em>Homo sapiens</em> dating to approximately 315,000
          years ago—making them the oldest known members of our species.
        </p>

        <EvidenceCard
          type="site"
          title="Jebel Irhoud"
          date="315 ka"
          description="A cave site in Morocco where at least five individuals were found, along with stone tools and animal bones. The skulls show modern human faces but more elongated braincases."
          significance="Oldest known Homo sapiens fossils"
          imageUrl={specimenImages.jebelIrhoud.src}
          imageAlt={specimenImages.jebelIrhoud.alt}
          imageCaption={specimenImages.jebelIrhoud.caption}
        />

        <p>
          What defines <em>Homo sapiens</em>? Anatomically, we have a distinctive suite of features:
          a high, rounded cranium; a flat, vertical forehead; a small, retracted face tucked under
          the braincase; and a chin—a feature unique among hominins. But these traits didn&apos;t
          appear all at once. The Jebel Irhoud fossils show that our species&apos; emergence was
          gradual, with different features evolving at different times.
        </p>

        <QuoteCard
          text="There is no 'Garden of Eden' in Africa, or elsewhere, where our species first arose. Instead, Homo sapiens evolved as an interconnected population spread across Africa."
          speaker="Jean-Jacques Hublin"
          affiliation="Max Planck Institute for Evolutionary Anthropology"
        />

        <div className="human-evolution__evidence-grid">
          <EvidenceCard
            type="specimen"
            title="Omo Kibish"
            date="~233 ka"
            description="Two partial skulls from Ethiopia. Omo I shows more modern features; Omo II is more archaic. Found in the same deposits, they illustrate the variation among early H. sapiens."
            significance="Among the oldest in East Africa"
            imageUrl={specimenImages.omoKibish.src}
            imageAlt={specimenImages.omoKibish.alt}
            imageCaption={specimenImages.omoKibish.caption}
          />
          <EvidenceCard
            type="specimen"
            title="Herto Skulls"
            date="160 ka"
            description="Three skulls from the Middle Awash, Ethiopia. Nearly complete, they show clear H. sapiens anatomy and evidence of mortuary practices—skulls were defleshed and polished."
            significance="Evidence of early ritual behavior"
            imageUrl={specimenImages.herto.src}
            imageAlt={specimenImages.herto.alt}
            imageCaption={specimenImages.herto.caption}
          />
        </div>

        <MisconceptionCheckpoint
          myth="Homo sapiens evolved in one place in East Africa and then spread out."
          reality="Current evidence suggests H. sapiens evolved across Africa from interconnected populations. Our species' emergence was a pan-African process, not a single point of origin."
        />
      </div>
    </section>
  );
}

function ChapterMigrations() {
  const chapter = chapters[8];
  return (
    <section id={chapter.id} className="human-evolution__chapter">
      <div className="human-evolution__content">
        <header className="human-evolution__chapter-header">
          <span className="human-evolution__chapter-number">Chapter {chapter.number}</span>
          <h2>{chapter.title}</h2>
        </header>

        <p className="human-evolution__chapter-hook">{chapter.hook}</p>

        <p>
          The <GlossaryTerm term="Out of Africa">Out of Africa</GlossaryTerm> dispersal represents
          one of the most consequential events in human history. While earlier migrations (such as
          those that brought <em>Homo erectus</em> to Asia 1.8 million years ago) were significant,
          the movement of <em>Homo sapiens</em> would eventually lead to the colonization of every
          continent except Antarctica.
        </p>

        <p>
          Genetic evidence suggests a major dispersal between 70,000 and 50,000 years ago. A
          relatively small founding population—perhaps just a few thousand individuals—crossed
          from Africa into the Arabian Peninsula and beyond. From this population descended all
          non-African peoples alive today.
        </p>

        <div className="human-evolution__evidence-grid">
          <EvidenceCard
            type="site"
            title="Skhul and Qafzeh"
            date="~120-90 ka"
            description="Caves in Israel with early modern human remains, representing an earlier migration out of Africa that may not have contributed significantly to later populations."
            significance="Evidence of early failed dispersal"
            imageUrl={siteImages.skhulCave.src}
            imageAlt={siteImages.skhulCave.alt}
            imageCaption={siteImages.skhulCave.caption}
          />
          <EvidenceCard
            type="site"
            title="Niah Cave, Borneo"
            date="~45 ka"
            description="Deep skull fragments represent some of the earliest modern humans in Southeast Asia, showing rapid dispersal along the southern route."
            significance="Early Southeast Asian presence"
            imageUrl={siteImages.niahCave.src}
            imageAlt={siteImages.niahCave.alt}
            imageCaption={siteImages.niahCave.caption}
          />
          <EvidenceCard
            type="site"
            title="Lake Mungo, Australia"
            date="~42-45 ka"
            description="Skeletal remains and cremation from Australia, indicating humans crossed the Wallace Line (requiring sea voyages) very early."
            significance="Earliest evidence in Australia"
            imageUrl={siteImages.lakeMungo.src}
            imageAlt={siteImages.lakeMungo.alt}
            imageCaption={siteImages.lakeMungo.caption}
          />
        </div>

        <QuoteCard
          text="The peopling of the Americas was the final chapter in the long story of human migration, but it was far more complex than a single wave of pioneers crossing an ice-free corridor."
          speaker="Eske Willerslev"
          affiliation="University of Copenhagen"
        />

        <p>
          As modern humans spread across the globe, they encountered other human species. In Europe
          and western Asia, they met <GlossaryTerm term="Neanderthal">Neanderthals</GlossaryTerm>.
          In Asia, they encountered <GlossaryTerm term="Denisovan">Denisovans</GlossaryTerm> and
          possibly other archaic groups. These meetings weren&apos;t always peaceful, but they
          weren&apos;t always violent either—the genetic evidence proves that interbreeding occurred.
        </p>

        <MisconceptionCheckpoint
          myth="Humans evolved independently in different parts of the world (multiregional hypothesis)."
          reality="While there was regional variation and gene flow from archaic humans, all modern humans descend primarily from African populations. The multiregional hypothesis is not supported by genetic evidence."
        />
      </div>
    </section>
  );
}

function ChapterCultureCognition() {
  const chapter = chapters[9];
  return (
    <section id={chapter.id} className="human-evolution__chapter">
      <div className="human-evolution__content">
        <header className="human-evolution__chapter-header">
          <span className="human-evolution__chapter-number">Chapter {chapter.number}</span>
          <h2>{chapter.title}</h2>
        </header>

        <p className="human-evolution__chapter-hook">{chapter.hook}</p>

        <p>
          What makes humans human? Beyond anatomy, we are distinguished by our capacity for
          symbolic thought, complex language, cumulative culture, and the ability to imagine
          things that don&apos;t exist. When did these abilities emerge?
        </p>

        <p>
          For decades, researchers spoke of a &quot;Human Revolution&quot; occurring around 50,000
          years ago in Europe, marked by an explosion of art, ornaments, and complex tools. But
          discoveries in Africa have overturned this narrative. Symbolic behavior appears much
          earlier—and <em>Homo sapiens</em> isn&apos;t the only species that showed it.
        </p>

        <div className="human-evolution__evidence-grid">
          <EvidenceCard
            type="artifact"
            title="Blombos Cave Engravings"
            date="77 ka"
            description="Ochre blocks with geometric patterns from South Africa—crosshatched designs that represent some of the earliest known abstract art."
            significance="Earliest known deliberate abstract marking"
            imageUrl={toolImages.blombosOchre.src}
            imageAlt={toolImages.blombosOchre.alt}
            imageCaption={toolImages.blombosOchre.caption}
          />
          <EvidenceCard
            type="artifact"
            title="Nassarius Shell Beads"
            date="82 ka"
            description="Perforated shells from Grotte des Pigeons, Morocco, that were strung as beads. Microscopic analysis confirms they were worn, not just collected."
            significance="Evidence of personal ornamentation"
            imageUrl={toolImages.blombosBeads.src}
            imageAlt={toolImages.blombosBeads.alt}
            imageCaption={toolImages.blombosBeads.caption}
          />
          <EvidenceCard
            type="artifact"
            title="Levallois Technique"
            date="~400 ka"
            description="A sophisticated method of preparing stone cores to produce flakes of predetermined shape. Required mental planning and teaching."
            significance="Evidence of advanced cognition"
            imageUrl={toolImages.levalloisCore.src}
            imageAlt={toolImages.levalloisCore.alt}
            imageCaption={toolImages.levalloisCore.caption}
          />
        </div>

        <QuoteCard
          text="The geometric signs we find in caves across Europe appear in the same forms for over 30,000 years. That's not the start-up phase of a new invention—it's a system that was already in place."
          speaker="Genevieve von Petzinger"
          affiliation="Paleoanthropologist and rock art researcher"
        />

        <p>
          <GlossaryTerm term="Neanderthal">Neanderthals</GlossaryTerm>, too, showed signs of
          symbolic behavior. They made jewelry from eagle talons, created pigments from manganese
          dioxide, and may have produced cave art. The boundary between &quot;us&quot; and
          &quot;them&quot; becomes increasingly blurry the more we learn.
        </p>

        <MisconceptionCheckpoint
          myth="The 'Human Revolution' around 50,000 years ago marked the sudden appearance of modern behavior."
          reality="Symbolic behavior, art, and complex cognition emerged gradually over hundreds of thousands of years in Africa. The European record is not the beginning—it's a later chapter."
        />
      </div>
    </section>
  );
}

function ChapterPresentFuture() {
  const chapter = chapters[10];
  return (
    <section id={chapter.id} className="human-evolution__chapter">
      <div className="human-evolution__content">
        <header className="human-evolution__chapter-header">
          <span className="human-evolution__chapter-number">Chapter {chapter.number}</span>
          <h2>{chapter.title}</h2>
        </header>

        <p className="human-evolution__chapter-hook">{chapter.hook}</p>

        <p>
          The story of human evolution is not over. We are living it. Every person alive today
          carries a genetic archive stretching back millions of years—including fragments from
          species we thought were long gone.
        </p>

        <p>
          Modern genetic technology has revealed that most people outside Africa carry approximately
          1-2% <GlossaryTerm term="Neanderthal">Neanderthal</GlossaryTerm> DNA. Melanesians and some
          other populations carry an additional 3-6% <GlossaryTerm term="Denisovan">Denisovan</GlossaryTerm>
          DNA. These aren&apos;t just curiosities—they&apos;ve had real effects. Denisovan genes
          help Tibetans live at high altitude. Neanderthal genes influence our immune systems and
          may affect susceptibility to certain diseases.
        </p>

        <QuoteCard
          text="As a species, humans are remarkably similar genetically, reflecting our recent common ancestry from Africa within the past 100,000 years. We are all Africans."
          speaker="Sarah Tishkoff"
          affiliation="University of Pennsylvania"
        />

        <div className="human-evolution__evidence-grid">
          <EvidenceCard
            type="method"
            title="EPAS1 Gene"
            description="Tibetans carry a variant of this gene that helps with high-altitude adaptation. Analysis revealed it came from Denisovans—an example of adaptive introgression."
            significance="Archaic genes still helping us today"
            imageUrl={methodImages.dnaStructure.src}
            imageAlt={methodImages.dnaStructure.alt}
            imageCaption="DNA: the molecular archive preserving archaic contributions"
          />
          <EvidenceCard
            type="method"
            title="HLA Genes"
            description="Genes critical to immune function. Studies show that some Neanderthal and Denisovan variants were beneficial and were rapidly selected for in modern human populations."
            significance="Ancient immune adaptations"
            imageUrl={methodImages.ancientDNA.src}
            imageAlt={methodImages.ancientDNA.alt}
            imageCaption="Ancient DNA analysis reveals beneficial archaic gene variants"
          />
        </div>

        <p>
          Is human evolution still occurring? In the biological sense, yes—but slowly, and shaped
          increasingly by culture and technology. Medicine allows survival of individuals who might
          not have survived in the past. Travel connects gene pools that were once isolated.
          The selective pressures that shaped our ancestors have largely changed.
        </p>

        <p>
          Yet the fundamental lesson of human evolution remains: we are part of nature, not separate
          from it. We are the products of the same processes that shaped every other species on
          Earth—mutation, selection, drift, and the contingency of historical accident. Understanding
          our past helps us understand ourselves.
        </p>

        <MisconceptionCheckpoint
          myth="Human evolution stopped when we developed culture and technology."
          reality="Evolution is ongoing, though its pace and direction are influenced by cultural factors. Recent studies have identified genes under selection in the past few thousand years."
        />

        <QuoteCard
          text="We have this extraordinary view now of our past, through genetics and fossils, that shows us we're part of a vast experiment in what it means to be human."
          speaker="Chris Stringer"
          affiliation="Natural History Museum, London"
        />
      </div>
    </section>
  );
}

/* ========================================
   Main Component
   ======================================== */

export default function HumanEvolutionClient() {
  const [currentChapter, setCurrentChapter] = useState("deep-time");
  const [progress, setProgress] = useState(0);
  const chapterRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Scroll progress and current chapter detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(scrollPercent, 100));

      // Find current chapter based on scroll position
      let current = "deep-time";
      chapterRefs.current.forEach((el, id) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) {
          current = id;
        }
      });
      setCurrentChapter(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChapter = (id: string) => {
    const el = chapterRefs.current.get(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Register chapter refs
  const registerChapterRef = useCallback((id: string, el: HTMLElement | null) => {
    if (el) {
      chapterRefs.current.set(id, el);
    }
  }, []);

  return (
    <article className="human-evolution">
      {/* Hero Section */}
      <header className="human-evolution__hero">
        <h1 className="human-evolution__hero-title">Human Evolution</h1>
        <p className="human-evolution__hero-subtitle">Visualized</p>
        <p className="human-evolution__hero-hook">
          7 million years of our story—from the first upright steps in African woodlands
          to the genetic echoes of Neanderthals in your DNA.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <button
            onClick={() => scrollToChapter("deep-time")}
            style={{
              background: "var(--color-accent)",
              color: "white",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: "pointer",
              fontFamily: "var(--font-ui)",
            }}
          >
            Begin the Journey
          </button>
        </div>
      </header>

      {/* Table of Contents */}
      <div style={{
        maxWidth: "var(--wide-width)",
        margin: "0 auto",
        padding: "var(--space-2xl) var(--space-lg)",
      }}>
        <TableOfContents onChapterClick={scrollToChapter} />
      </div>

      {/* Sticky Navigation */}
      <ChapterNav
        currentChapter={currentChapter}
        progress={progress}
        onChapterClick={scrollToChapter}
      />

      {/* Main Content */}
      <main>
        <div ref={(el) => registerChapterRef("deep-time", el)}>
          <ChapterDeepTime />
        </div>
        <div ref={(el) => registerChapterRef("how-we-know", el)}>
          <ChapterHowWeKnow />
        </div>
        <div ref={(el) => registerChapterRef("tree-of-life", el)}>
          <ChapterTreeOfLife />
        </div>
        <div ref={(el) => registerChapterRef("african-origins", el)}>
          <ChapterAfricanOrigins />
        </div>
        <div ref={(el) => registerChapterRef("walking-upright", el)}>
          <ChapterWalkingUpright />
        </div>
        <div ref={(el) => registerChapterRef("genus-homo", el)}>
          <ChapterGenusHomo />
        </div>
        <div ref={(el) => registerChapterRef("other-humans", el)}>
          <ChapterOtherHumans />
        </div>
        <div ref={(el) => registerChapterRef("homo-sapiens", el)}>
          <ChapterHomoSapiens />
        </div>
        <div ref={(el) => registerChapterRef("migrations", el)}>
          <ChapterMigrations />
        </div>
        <div ref={(el) => registerChapterRef("culture-cognition", el)}>
          <ChapterCultureCognition />
        </div>
        <div ref={(el) => registerChapterRef("present-future", el)}>
          <ChapterPresentFuture />
        </div>
      </main>

      {/* Supplementary Sections */}
      <div style={{
        maxWidth: "var(--wide-width)",
        margin: "0 auto",
        padding: "var(--space-3xl) var(--space-lg)",
      }}>
        <GlossarySection />
      </div>

      <div style={{
        maxWidth: "var(--wide-width)",
        margin: "0 auto",
        padding: "0 var(--space-lg) var(--space-3xl)",
      }}>
        <SourcesSection />
      </div>

      {/* Footer */}
      <footer className="human-evolution__footer">
        <div className="human-evolution__footer-content">
          <p style={{ marginBottom: "1rem" }}>
            <strong>Human Evolution, Visualized</strong>
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--color-sediment)", marginBottom: "1rem" }}>
            This visual essay synthesizes findings from peer-reviewed scientific literature,
            museum collections, and established research institutions. All dates, measurements,
            and interpretations reflect the current scientific consensus as of 2024.
          </p>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-sediment)", marginBottom: "1rem" }}>
            Reconstructions of extinct species are artistic interpretations based on fossil
            evidence. The fossil record is inherently incomplete, and our understanding
            continues to evolve with new discoveries.
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--color-stone)" }}>
            &copy; {new Date().getFullYear()} Esy. Educational content for non-commercial use.
          </p>
        </div>
      </footer>
    </article>
  );
}
