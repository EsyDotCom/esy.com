'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  type Infographic,
  type InfographicAuthorship,
  CLUSTER_LABELS,
  INFOGRAPHIC_CATEGORY_COLORS,
  getInfographicsByCluster,
} from '@/data/infographics';
import { resolveModelLabel } from '@/lib/models/registry';
import './infographic-artifact.css';

/* ─── Authorship Resolution ──────────────────────────────────── */

const AI_CONTRIBUTION_LABELS: Record<string, string> = {
  research: 'Research',
  code: 'Code',
  editing: 'Editing',
  'fact-checking': 'Fact-checking',
  visualization: 'Visualization',
};

const AUTHORSHIP_MODE_LABELS: Record<string, string> = {
  human: 'Human',
  'ai-assisted': 'AI-Assisted',
  'ai-directed': 'AI-Directed',
};

function resolveAuthorship(infographic: Infographic): InfographicAuthorship {
  if (infographic.authorship) return infographic.authorship;
  return {
    mode: 'ai-directed',
    model: infographic.model,
    director: { name: 'Zev Uhuru' },
  };
}

function formatAiContributions(contributions?: string[]): string | null {
  if (!contributions || contributions.length === 0) return null;
  return contributions
    .map((c) => AI_CONTRIBUTION_LABELS[c] || c)
    .join(', ');
}

/* ─── SVG Icons ───────────────────────────────────────────────── */

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M10 4L6 8l4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CollapseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M5 2v4H1M11 2v4h4M11 14v-4h4M5 14v-4H1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Essay Metadata for Visual Cards ────────────────────────── */

const ESSAY_META: Record<string, { title: string; image: string }> = {
  '/essays/science/seven-million-years': {
    title: 'Seven Million Years',
    image: 'https://images.esy.com/essays/seven-million-years/seven-million-years-og.f9e61cbb59.webp',
  },
  '/essays/science/turkana-boy': {
    title: 'Turkana Boy: The First Modern Body',
    image: 'https://images.esy.com/essays/turkana-boy/homo-erectus-turkana-boy-ausschnitt-fundort-nariokotome-kenia-rekonstruktion-im-neanderthal-museum.c38e9d9266.webp',
  },
  '/essays/science/lucy': {
    title: 'Lucy: Before the Genus Homo',
    image: 'https://images.esy.com/essays/lucy/lucy-og.8b2a30ed17.webp',
  },
  '/essays/science/homo-naledi': {
    title: 'Homo naledi',
    image: 'https://images.esy.com/essays/homo-naledi/homo-naledi-facial-reconstruction.e82db47297.webp',
  },
  '/essays/history/human-evolution': {
    title: 'Human Evolution, Visualized',
    image: '',
  },
};

/* ─── Category Colors ────────────────────────────────────────── */

const CATEGORY_COLORS: Record<string, string> = {
  Science: '#10B981',
  History: '#F59E0B',
  Technology: '#3B82F6',
  Culture: '#EC4899',
  Nature: '#06B6D4',
  Economics: '#22C55E',
  Education: '#14B8A6',
};

/* ─── Authorship Cards ───────────────────────────────────────── */

function AuthorshipCards({
  authorship,
}: {
  authorship: InfographicAuthorship;
}) {
  const { mode, author, director, model, aiContributions } = authorship;
  const contributionsLabel = formatAiContributions(aiContributions);
  const modeLabel = AUTHORSHIP_MODE_LABELS[mode] || mode;

  if (mode === 'human') {
    return (
      <>
        <div className="iga-spec__card">
          <div className="iga-spec__card-label">Author</div>
          <div className="iga-spec__card-value">
            {author?.name || 'Unknown'}
            {author?.role && (
              <span className="iga-spec__card-secondary">
                {' '}
                · {author.role}
              </span>
            )}
          </div>
        </div>
        <div className="iga-spec__card">
          <div className="iga-spec__card-label">Method</div>
          <div className="iga-spec__card-value">{modeLabel}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="iga-spec__card">
        <div className="iga-spec__card-label">Director</div>
        <div className="iga-spec__card-value">
          {director?.name || author?.name || 'Unknown'}
          {(director?.role || author?.role) && (
            <span className="iga-spec__card-secondary">
              {' '}
              · {director?.role || author?.role}
            </span>
          )}
        </div>
      </div>
      <div className="iga-spec__card">
        <div className="iga-spec__card-label">Method</div>
        <div className="iga-spec__card-value">
          {modeLabel}
          {contributionsLabel && (
            <span className="iga-spec__card-secondary">
              {' '}
              · {contributionsLabel}
            </span>
          )}
        </div>
      </div>
      <div className="iga-spec__card">
        <div className="iga-spec__card-label">Model</div>
        <div className="iga-spec__card-value">
          {model ? resolveModelLabel(model) : '—'}
        </div>
      </div>
    </>
  );
}

/* ─── Main Wrapper ────────────────────────────────────────────── */

interface Props {
  infographic: Infographic;
}

export default function InfographicArtifactWrapper({ infographic }: Props) {
  const [cinematicMode, setCinematicMode] = useState(false);
  const [specExpanded, setSpecExpanded] = useState(false);

  const categoryColor =
    CATEGORY_COLORS[infographic.category] ||
    INFOGRAPHIC_CATEGORY_COLORS[infographic.category] ||
    '#6B7280';

  const clusterLabel =
    CLUSTER_LABELS[infographic.cluster] || infographic.cluster;

  const clusterSiblings = useMemo(
    () =>
      getInfographicsByCluster(infographic.cluster).filter(
        (i) => i.id !== infographic.id
      ),
    [infographic.cluster, infographic.id]
  );

  const allInCluster = useMemo(
    () => getInfographicsByCluster(infographic.cluster),
    [infographic.cluster]
  );

  const currentIndex = allInCluster.findIndex(
    (i) => i.id === infographic.id
  );

  const formattedDate = new Date(
    infographic.publishedDate
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const sourceCount = infographic.sources?.length || 0;
  const authorship = resolveAuthorship(infographic);

  const hasDataPoints =
    infographic.dataPoints && infographic.dataPoints.length > 0;
  const hasSources = sourceCount > 0;
  const hasRelatedEssays =
    infographic.relatedEssays && infographic.relatedEssays.length > 0;
  const hasPalette =
    infographic.palette && infographic.palette.length > 0;

  // Escape key exits cinematic mode
  useEffect(() => {
    if (!cinematicMode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCinematicMode(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cinematicMode]);

  // Arrow keys navigate cluster in cinematic mode
  const navigateCluster = useCallback(
    (direction: 'prev' | 'next') => {
      const idx =
        direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
      if (idx >= 0 && idx < allInCluster.length) {
        window.location.href = `/infographics/${allInCluster[idx].id}`;
      }
    },
    [currentIndex, allInCluster]
  );

  useEffect(() => {
    if (!cinematicMode) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigateCluster('prev');
      if (e.key === 'ArrowRight') navigateCluster('next');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [cinematicMode, navigateCluster]);

  /* ─── Cinematic Mode ─── */
  if (cinematicMode) {
    const prevItem = currentIndex > 0 ? allInCluster[currentIndex - 1] : null;
    const nextItem =
      currentIndex < allInCluster.length - 1
        ? allInCluster[currentIndex + 1]
        : null;

    return (
      <div className="iga-cinematic">
        {/* Lite Toolbar */}
        <header className="iga-cinematic__toolbar">
          <button
            className="iga-cinematic__exit"
            onClick={() => setCinematicMode(false)}
            aria-label="Exit cinematic mode"
            title="Exit cinematic mode (Esc)"
          >
            <CollapseIcon />
            <span className="iga-cinematic__exit-label">Exit</span>
          </button>
          <span className="iga-cinematic__title">{infographic.title}</span>
          {infographic.animatedSrc && (
            <div className="iga-cinematic__toggle">
              <span className="iga-cinematic__toggle-label">Animated</span>
            </div>
          )}
        </header>

        {/* Image Viewport */}
        <div className="iga-cinematic__viewport">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={infographic.imageSrc}
            alt={infographic.imageAlt}
            className="iga-cinematic__image"
          />
        </div>

        {/* Cluster Navigation */}
        {prevItem && (
          <Link
            href={`/infographics/${prevItem.id}`}
            className="iga-cinematic__nav iga-cinematic__nav--prev"
            aria-label={`Previous: ${prevItem.title}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        )}
        {nextItem && (
          <Link
            href={`/infographics/${nextItem.id}`}
            className="iga-cinematic__nav iga-cinematic__nav--next"
            aria-label={`Next: ${nextItem.title}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        )}
      </div>
    );
  }

  /* ─── Artifact Mode (Default) ─── */
  return (
    <div className="iga-page">
      {/* ─── Toolbar ─── */}
      <header className="iga-toolbar">
        <Link href="/infographics" className="iga-toolbar__back">
          <ChevronLeftIcon />
          <span>Infographics</span>
        </Link>
        <div className="iga-toolbar__right">
          <span
            className="iga-toolbar__badge"
            style={{ '--badge-color': categoryColor } as React.CSSProperties}
          >
            {infographic.category}
          </span>
          <button
            className="iga-toolbar__cinematic"
            onClick={() => setCinematicMode(true)}
            aria-label="Enter cinematic mode"
          >
            <ExpandIcon />
            <span className="iga-toolbar__cinematic-label">
              Cinematic Mode
            </span>
          </button>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="iga-hero">
        <div className="iga-hero__inner">
          <div className="iga-hero__provenance">
            <span className="iga-hero__provenance-line" aria-hidden="true" />
            <span className="iga-hero__provenance-text">
              <span className="iga-hero__provenance-type">Artifact</span>
              <span
                className="iga-hero__provenance-sep"
                aria-hidden="true"
              >
                ·
              </span>
              <span className="iga-hero__provenance-template">
                Research Infographic
              </span>
            </span>
            <span className="iga-hero__provenance-line" aria-hidden="true" />
          </div>
          <h1 className="iga-hero__title">{infographic.title}</h1>
          <p className="iga-hero__subtitle">{infographic.description}</p>
          <div className="iga-hero__meta">
            {sourceCount > 0 && (
              <>
                <span className="iga-hero__meta-item">
                  <span className="iga-hero__meta-value">{sourceCount}</span>
                  <span className="iga-hero__meta-label">
                    {infographic.sourceTier || ''} sources
                  </span>
                </span>
                <span
                  className="iga-hero__meta-dot"
                  aria-hidden="true"
                />
              </>
            )}
            <span className="iga-hero__meta-item">
              <span className="iga-hero__meta-value">{clusterLabel}</span>
              <span className="iga-hero__meta-label">cluster</span>
            </span>
            <span className="iga-hero__meta-dot" aria-hidden="true" />
            <span className="iga-hero__meta-item">
              <span className="iga-hero__meta-value">
                {infographic.width} × {infographic.height}
              </span>
              <span className="iga-hero__meta-label">px</span>
            </span>
          </div>
          <div className="iga-hero__actions">
            <a
              href="#iga-image"
              className="iga-hero__cta iga-hero__cta--primary"
            >
              View Infographic
            </a>
            <button
              className="iga-hero__cta iga-hero__cta--secondary"
              onClick={() => setCinematicMode(true)}
            >
              <ExpandIcon />
              Cinematic Mode
            </button>
          </div>
        </div>
      </section>

      {/* ─── Spec Panel ─── */}
      <section className="iga-spec">
        <div className="iga-spec__inner">
          <button
            className="iga-spec__toggle"
            onClick={() => setSpecExpanded(!specExpanded)}
            aria-expanded={specExpanded}
          >
            <span className="iga-spec__toggle-label">Artifact Spec</span>
            <svg
              className={`iga-spec__toggle-icon ${specExpanded ? 'iga-spec__toggle-icon--open' : ''}`}
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M3 5l3 3 3-3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            className={`iga-spec__content ${specExpanded ? 'iga-spec__content--open' : ''}`}
          >
            <div className="iga-spec__grid">
              <div className="iga-spec__card">
                <div className="iga-spec__card-label">Template</div>
                <div className="iga-spec__card-value">
                  Research Infographic
                </div>
              </div>
              <div className="iga-spec__card">
                <div className="iga-spec__card-label">Design System</div>
                <div className="iga-spec__card-value">
                  {infographic.designSystem || 'Subject-derived'}
                </div>
              </div>
              <div className="iga-spec__card">
                <div className="iga-spec__card-label">Published</div>
                <div className="iga-spec__card-value">{formattedDate}</div>
              </div>
              <AuthorshipCards authorship={authorship} />
              <div className="iga-spec__card">
                <div className="iga-spec__card-label">Source Quality</div>
                <div className="iga-spec__card-value">
                  {sourceCount} {infographic.sourceTier || ''}
                </div>
              </div>
              <div className="iga-spec__card">
                <div className="iga-spec__card-label">Citation-First</div>
                <div className="iga-spec__card-value iga-spec__card-value--bool">
                  {infographic.citationFirst ? (
                    <span className="iga-spec__bool iga-spec__bool--yes">
                      Yes
                    </span>
                  ) : (
                    <span className="iga-spec__bool iga-spec__bool--no">
                      No
                    </span>
                  )}
                </div>
              </div>
              <div className="iga-spec__card">
                <div className="iga-spec__card-label">Dimensions</div>
                <div className="iga-spec__card-value">
                  {infographic.width} × {infographic.height}
                </div>
              </div>
            </div>

            {/* Palette */}
            {hasPalette && (
              <div className="iga-spec__section">
                <div className="iga-spec__section-label">Color Palette</div>
                <div className="iga-spec__palette">
                  {infographic.palette!.map((p) => (
                    <div key={p.name} className="iga-spec__palette-chip">
                      <span
                        className="iga-spec__palette-swatch"
                        style={{ background: p.color }}
                      />
                      <span className="iga-spec__palette-name">
                        {p.name}
                      </span>
                      <span className="iga-spec__palette-hex">
                        {p.color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Sources */}
            {hasSources && (
              <div className="iga-spec__section">
                <div className="iga-spec__section-label">Key Sources</div>
                <div className="iga-spec__sources">
                  {infographic.sources!.map((s) => (
                    <span key={s} className="iga-spec__source-tag">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Essays */}
            {hasRelatedEssays && (
              <div className="iga-spec__section">
                <div className="iga-spec__section-label">
                  Related Visual Essays
                </div>
                <div className="iga-spec__related-essays">
                  {infographic.relatedEssays!.map((href) => {
                    const name = href
                      .split('/')
                      .pop()
                      ?.replace(/-/g, ' ')
                      .replace(/\b\w/g, (c) => c.toUpperCase());
                    return (
                      <Link
                        key={href}
                        href={href}
                        className="iga-spec__essay-link"
                      >
                        <span className="iga-spec__essay-link-icon">◈</span>
                        <span>{name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Image Section ─── */}
      <section className="iga-image" id="iga-image">
        <div className="iga-image__container">
          <Image
            src={infographic.imageSrc}
            alt={infographic.imageAlt}
            width={infographic.width}
            height={infographic.height}
            quality={95}
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <button
            className="iga-image__cinematic-btn"
            onClick={() => setCinematicMode(true)}
            aria-label="View in cinematic mode"
          >
            <ExpandIcon />
          </button>
        </div>
      </section>

      {/* ─── Data Points ─── */}
      {hasDataPoints && (
        <section className="iga-data">
          <div className="iga-data__inner">
            <h2 className="iga-data__title">Key Data</h2>
            <ul className="iga-data__list">
              {infographic.dataPoints!.map((dp, i) => (
                <li key={i} className="iga-data__item">
                  <span className="iga-data__label">{dp.label}</span>
                  <span className="iga-data__value">{dp.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ─── Cluster Siblings ─── */}
      {clusterSiblings.length > 0 && (
        <section className="iga-cluster">
          <h2 className="iga-cluster__title">More in {clusterLabel}</h2>
          <div className="iga-cluster__grid">
            {clusterSiblings.slice(0, 3).map((related) => (
              <Link
                key={related.id}
                href={`/infographics/${related.id}`}
                className="iga-cluster__card"
              >
                <div className="iga-cluster__card-image">
                  <Image
                    src={related.thumbnailSrc || related.imageSrc}
                    alt={related.imageAlt}
                    width={related.width}
                    height={related.height}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="iga-cluster__card-meta">
                  <span className="iga-cluster__card-title">
                    {related.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ─── Related Visual Essays ─── */}
      {hasRelatedEssays && (
        <section className="iga-essays">
          <h2 className="iga-essays__title">Source Visual Essays</h2>
          <p className="iga-essays__subtitle">
            The research behind this infographic
          </p>
          <div className="iga-essays__grid">
            {infographic.relatedEssays!.map((href) => {
              const meta = ESSAY_META[href];
              const essayName = meta?.title ?? href
                .split('/')
                .pop()
                ?.replace(/-/g, ' ')
                .replace(/\b\w/g, (c) => c.toUpperCase());
              const category = href.includes('/science/') ? 'Science' : href.includes('/history/') ? 'History' : 'Essay';
              return (
                <Link
                  key={href}
                  href={href}
                  className="iga-essays__card"
                >
                  <div className="iga-essays__card-image">
                    {meta?.image ? (
                      <Image
                        src={meta.image}
                        alt={essayName ?? ''}
                        width={480}
                        height={320}
                        sizes="(max-width: 768px) 90vw, 440px"
                      />
                    ) : (
                      <div className="iga-essays__card-placeholder">
                        <span className="iga-essays__card-placeholder-icon">◈</span>
                        <span className="iga-essays__card-placeholder-label">Visual Essay</span>
                      </div>
                    )}
                    <div className="iga-essays__card-gradient" />
                    <span className="iga-essays__card-badge">{category}</span>
                  </div>
                  <div className="iga-essays__card-body">
                    <span className="iga-essays__card-name">{essayName}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ─── Minimal Footer ─── */}
      <footer className="iga-footer">
        <Link href="/" className="iga-footer__brand">
          <span style={{
            fontFamily: 'var(--font-black-ops-one), sans-serif',
            fontSize: '1.5rem',
            letterSpacing: '0.03em',
            lineHeight: 1,
            userSelect: 'none',
          }}>
            <span style={{ color: '#00A896' }}>e</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.92)' }}>sy</span>
          </span>
        </Link>
      </footer>

    </div>
  );
}
