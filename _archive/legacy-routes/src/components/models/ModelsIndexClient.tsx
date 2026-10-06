"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllModelPages } from '@/lib/models/data';
import { navyCalmDarkTheme } from '@/lib/theme';

// Light theme
const lightTheme = {
  bg: '#FFFFFF',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  border: 'rgba(10, 37, 64, 0.08)',
  accent: '#00A896',
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
  surface: navyCalmDarkTheme.surface,
  elevated: navyCalmDarkTheme.elevated,
};

export default function ModelsIndexClient() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const modelPages = getAllModelPages();

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

  // Get unique families and sub-families for index
  const indexEntries = modelPages
    .filter(page => page.type === 'family' || page.type === 'subfamily')
    .map(page => ({
      name: page.type === 'subfamily' 
        ? `${page.family.name} · ${page.subFamily?.name}`
        : page.family.name,
      vendor: page.family.vendor,
      description: page.description,
      slug: page.slug,
    }));

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
        paddingBottom: '6rem',
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
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Models', isCurrent: true },
            ] as Array<{ label: string; href?: string; isCurrent?: boolean }>} />
          </div>

          {/* Header */}
          <header style={{ marginBottom: '4rem' }}>
            <h1 style={{
              fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
              color: theme.text,
              fontFamily: 'var(--font-literata)',
            }}>
              Model <span style={{ color: theme.accent }}>Reference</span>
            </h1>

            <p style={{
              fontSize: '1.25rem',
              lineHeight: 1.7,
              color: theme.muted,
              maxWidth: '720px',
              letterSpacing: '-0.01em',
            }}>
              These models are used as reasoning engines inside Esy workflows. Each page explains how a model is used, where it is trusted, and which templates depend on it.
            </p>
          </header>
        </div>
      </section>

      {/* Model List Section */}
      <section style={{
        position: 'relative',
        paddingBottom: '6rem',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}>
            {indexEntries.map((entry) => (
              <Link
                key={entry.slug}
                href={`/models/${entry.slug}`}
                style={{
                  display: 'block',
                  padding: '2rem',
                  background: theme.surface,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.accent;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = isDarkMode
                    ? '0 12px 24px rgba(0, 0, 0, 0.4)'
                    : '0 12px 24px rgba(10, 37, 64, 0.08)';
                  const accentBar = e.currentTarget.querySelector('.model-card-accent-bar') as HTMLElement;
                  if (accentBar) accentBar.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.border;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  const accentBar = e.currentTarget.querySelector('.model-card-accent-bar') as HTMLElement;
                  if (accentBar) accentBar.style.opacity = '0';
                }}
              >
                {/* Subtle accent bar */}
                <div 
                  className="model-card-accent-bar"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, ${theme.accent} 0%, transparent 100%)`,
                    opacity: 0,
                    transition: 'opacity 0.25s ease',
                  }}
                />

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: theme.text,
                      marginBottom: '0.5rem',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.3,
                    }}>
                      {entry.name}
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: theme.subtle,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontWeight: 500,
                    }}>
                      {entry.vendor}
                    </p>
                  </div>

                  <p style={{
                    fontSize: '0.9375rem',
                    color: theme.muted,
                    lineHeight: 1.65,
                    margin: 0,
                  }}>
                    {entry.description}
                  </p>

                  <div style={{
                    marginTop: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: theme.accent,
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}>
                    <span>View details</span>
                    <span style={{
                      fontSize: '1rem',
                      transition: 'transform 0.25s ease',
                    }}>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
