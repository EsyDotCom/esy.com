"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ModelPage } from '@/lib/models/types';
import { navyCalmDarkTheme } from '@/lib/theme';
import ModelUsageTable from './ModelUsageTable';
import ModelVersionsSection from './ModelVersionsSection';
import ModelTemplatesSection from './ModelTemplatesSection';
import ModelStrengthsLimitations from './ModelStrengthsLimitations';

// Light theme
const lightTheme = {
  bg: '#FFFFFF',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  border: 'rgba(10, 37, 64, 0.08)',
  accent: '#00A896',
  accentMuted: 'rgba(0, 168, 150, 0.15)',
  accentBorder: 'rgba(0, 168, 150, 0.2)',
  surface: '#F8FAFC',
  elevated: '#F1F5F9',
};

// Dark theme
const darkTheme = {
  bg: navyCalmDarkTheme.bg,
  text: navyCalmDarkTheme.text,
  muted: navyCalmDarkTheme.muted,
  subtle: navyCalmDarkTheme.subtle,
  border: navyCalmDarkTheme.border,
  accent: navyCalmDarkTheme.accent,
  accentMuted: navyCalmDarkTheme.accentTint,
  accentBorder: navyCalmDarkTheme.accentBorder,
  surface: navyCalmDarkTheme.surface,
  elevated: navyCalmDarkTheme.elevated,
};

interface ModelPageClientProps {
  modelPage: ModelPage;
}

export default function ModelPageClient({ modelPage }: ModelPageClientProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const storedTheme = localStorage.getItem('theme-models');
      setIsDarkMode(storedTheme === 'dark');
    };
    
    checkTheme();
    window.addEventListener('themechange', checkTheme);
    return () => window.removeEventListener('themechange', checkTheme);
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;

  // Build title based on type
  const getTitle = () => {
    if (modelPage.type === 'version') {
      return `${modelPage.family.name} ${modelPage.version?.version}`;
    }
    if (modelPage.type === 'subfamily') {
      return `${modelPage.family.name} · ${modelPage.subFamily?.name}`;
    }
    return modelPage.family.name;
  };

  // Build breadcrumbs
  const getBreadcrumbs = (): Array<{ label: string; href?: string; isCurrent?: boolean }> => {
    const items: Array<{ label: string; href?: string; isCurrent?: boolean }> = [
      { label: 'Home', href: '/' },
      { label: 'Models', href: '/models' },
    ];

    if (modelPage.type === 'version') {
      items.push({ label: modelPage.family.name, href: `/models/${modelPage.family.id.toLowerCase()}` });
      items.push({ label: `${modelPage.family.name} ${modelPage.version?.version}`, isCurrent: true });
    } else if (modelPage.type === 'subfamily') {
      items.push({ label: getTitle(), isCurrent: true });
    } else {
      items.push({ label: modelPage.family.name, isCurrent: true });
    }

    return items;
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.bg,
      color: theme.text,
    }}>
      {/* Hero Section with Grid Background */}
      <section style={{
        position: 'relative',
        paddingTop: '8rem',
        paddingBottom: '4rem',
        overflow: 'hidden',
      }}>
        {/* Grid Background Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: isDarkMode
            ? `
              linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `
            : `
              linear-gradient(rgba(10, 37, 64, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(10, 37, 64, 0.03) 1px, transparent 1px)
            `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
        }}>
          {/* Breadcrumbs */}
          <div style={{ marginBottom: '2rem' }}>
            <Breadcrumbs items={getBreadcrumbs()} />
          </div>

          {/* Header */}
          <header style={{ marginBottom: '3rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: theme.accentMuted,
              border: `1px solid ${theme.accentBorder}`,
              borderRadius: '8px',
              marginBottom: '1.5rem',
            }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: theme.accent,
              }}>
                {modelPage.family.vendor}
            </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
              color: theme.text,
              fontFamily: 'var(--font-literata)',
            }}>
              {getTitle()}
            </h1>

            <p style={{
              fontSize: '1.25rem',
              lineHeight: 1.7,
              color: theme.muted,
              maxWidth: '720px',
              letterSpacing: '-0.01em',
            }}>
              {modelPage.description}
            </p>
          </header>
        </div>
      </section>

      {/* Content Sections */}
      <section style={{
        position: 'relative',
        paddingBottom: '6rem',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
        }}>
          {/* How Esy Uses This Model */}
          <div style={{
            marginBottom: '5rem',
            paddingTop: '3rem',
            borderTop: `1px solid ${theme.border}`,
          }}>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
              color: theme.text,
              marginBottom: '2rem',
            }}>
              How Esy Uses This Model
            </h2>
            <ModelUsageTable usage={modelPage.usage} />
          </div>

          {/* Strengths & Limitations */}
          <div style={{
            marginBottom: '5rem',
            paddingTop: '3rem',
            borderTop: `1px solid ${theme.border}`,
          }}>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
              color: theme.text,
              marginBottom: '2rem',
            }}>
              Strengths & Limitations
            </h2>
            <ModelStrengthsLimitations
              strengths={modelPage.strengths}
              limitations={modelPage.limitations}
            />
          </div>

          {/* Versions */}
          {(modelPage.subFamily?.versions || modelPage.family.versions) && (
            <div style={{
              marginBottom: '5rem',
              paddingTop: '3rem',
              borderTop: `1px solid ${theme.border}`,
            }}>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: 1.3,
                color: theme.text,
                marginBottom: '2rem',
              }}>
                Versions
              </h2>
              <ModelVersionsSection modelPage={modelPage} />
            </div>
          )}

          {/* Templates that use this model */}
          <div style={{
            marginBottom: '5rem',
            paddingTop: '3rem',
            borderTop: `1px solid ${theme.border}`,
          }}>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
              color: theme.text,
              marginBottom: '2rem',
            }}>
              Templates that use this model
            </h2>
            <ModelTemplatesSection templates={modelPage.templates} />
          </div>

          {/* Research & notes */}
          {(modelPage.researchLinks || modelPage.lastReviewed) && (
            <div style={{
              marginTop: '3rem',
              paddingTop: '3rem',
              borderTop: `1px solid ${theme.border}`,
            }}>
              <div style={{
                fontSize: '0.875rem',
                color: theme.subtle,
              }}>
                {modelPage.lastReviewed && (
                  <p style={{ margin: '0 0 0.75rem 0' }}>
                    Last reviewed: {new Date(modelPage.lastReviewed).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}
                {modelPage.researchLinks && modelPage.researchLinks.length > 0 && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <span style={{ marginRight: '0.5rem' }}>Research:</span>
                    {modelPage.researchLinks.map((link, index) => (
                      <span key={index}>
                        {index > 0 && <span style={{ margin: '0 0.5rem', color: theme.subtle }}>·</span>}
                        <Link
                          href={link.href}
                          style={{
                            color: theme.accent,
                            textDecoration: 'none',
                          }}
                        >
                          {link.label}
                        </Link>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
