"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ModelVersion, ModelPage } from '@/lib/models/types';
import { navyCalmDarkTheme } from '@/lib/theme';

// Light theme
const lightTheme = {
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  border: 'rgba(10, 37, 64, 0.08)',
  accent: '#00A896',
  accentMuted: 'rgba(0, 168, 150, 0.15)',
  accentBorder: 'rgba(0, 168, 150, 0.2)',
  surface: '#F8FAFC',
};

// Dark theme
const darkTheme = {
  text: navyCalmDarkTheme.text,
  muted: navyCalmDarkTheme.muted,
  subtle: navyCalmDarkTheme.subtle,
  border: navyCalmDarkTheme.border,
  accent: navyCalmDarkTheme.accent,
  accentMuted: navyCalmDarkTheme.accentTint,
  accentBorder: navyCalmDarkTheme.accentBorder,
  surface: navyCalmDarkTheme.surface,
};

interface ModelVersionsSectionProps {
  modelPage: ModelPage;
}

export default function ModelVersionsSection({ modelPage }: ModelVersionsSectionProps) {
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

  // Get versions from sub-family or family
  const versions = modelPage.subFamily?.versions || modelPage.family.versions || [];

  if (versions.length === 0) {
    return null;
  }

  const recommended = versions.find(v => v.status === 'recommended');
  const supported = versions.filter(v => v.status === 'supported');
  const legacy = versions.filter(v => v.status === 'legacy');
  const deprecated = versions.filter(v => v.status === 'deprecated');

  const getVersionSlug = (version: ModelVersion) => {
    const familySlug = modelPage.family.id.toLowerCase();
    if (modelPage.subFamily) {
      return `${familySlug}-${modelPage.subFamily.id.toLowerCase()}/${version.version}`;
    }
    return `${familySlug}/${version.version}`;
  };

  return (
    <div>
      {recommended && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ 
            fontSize: '0.875rem', 
            fontWeight: 600, 
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: theme.subtle,
            marginBottom: '1rem',
          }}>
            Recommended
          </h3>
          <div style={{
            padding: '1rem 1.25rem',
            background: theme.accentMuted,
            border: `1px solid ${theme.accentBorder}`,
            borderRadius: '8px',
            marginBottom: '1rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{ 
                fontSize: '1.125rem', 
                fontWeight: 600, 
                color: theme.text 
              }}>
                {modelPage.family.name} {recommended.version}
              </span>
              <span
                className="models-version-badge recommended"
                style={{
                  backgroundColor: theme.accentMuted,
                  color: theme.accent,
                  border: `1px solid ${theme.accentBorder}`,
                }}
              >
                Recommended
              </span>
            </div>
            {recommended.note && (
              <p style={{ fontSize: '0.875rem', color: theme.muted, margin: 0 }}>
                {recommended.note}
              </p>
            )}
            {modelPage.type !== 'version' && (
              <Link
                href={`/models/${getVersionSlug(recommended)}`}
                style={{
                  display: 'inline-block',
                  marginTop: '0.75rem',
                  fontSize: '0.875rem',
                  color: theme.accent,
                  textDecoration: 'none',
                }}
              >
                View version details →
              </Link>
            )}
          </div>
        </div>
      )}

      {supported.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ 
            fontSize: '0.875rem', 
            fontWeight: 600, 
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: theme.subtle,
            marginBottom: '1rem',
          }}>
            Supported Versions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {supported.map((version) => (
              <div
                key={version.version}
                style={{
                  padding: '0.875rem 1rem',
                  background: theme.surface,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: theme.text }}>
                      {modelPage.family.name} {version.version}
                    </span>
                    <span
                      className="models-version-badge supported"
                      style={{
                        backgroundColor: theme.surface,
                        color: theme.text,
                        border: `1px solid ${theme.border}`,
                      }}
                    >
                      Supported
                    </span>
                  </div>
                  {version.note && (
                    <p style={{ fontSize: '0.8125rem', color: theme.subtle, margin: '0.25rem 0 0 0' }}>
                      {version.note}
                    </p>
                  )}
                </div>
                {modelPage.type !== 'version' && (
                  <Link
                    href={`/models/${getVersionSlug(version)}`}
                    style={{
                      fontSize: '0.875rem',
                      color: theme.accent,
                      textDecoration: 'none',
                    }}
                  >
                    View →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {legacy.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ 
            fontSize: '0.875rem', 
            fontWeight: 600, 
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: theme.subtle,
            marginBottom: '1rem',
          }}>
            Legacy Versions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {legacy.map((version) => (
              <div
                key={version.version}
                style={{
                  padding: '0.875rem 1rem',
                  background: theme.surface,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: theme.text }}>
                      {modelPage.family.name} {version.version}
                    </span>
                    <span
                      className="models-version-badge legacy"
                      style={{
                        backgroundColor: theme.surface,
                        color: theme.subtle,
                        border: `1px solid ${theme.border}`,
                      }}
                    >
                      Legacy
                    </span>
                  </div>
                  {version.note && (
                    <p style={{ fontSize: '0.8125rem', color: theme.subtle, margin: '0.25rem 0 0 0' }}>
                      {version.note}
                    </p>
                  )}
                </div>
                {modelPage.type !== 'version' && (
                  <Link
                    href={`/models/${getVersionSlug(version)}`}
                    style={{
                      fontSize: '0.875rem',
                      color: theme.accent,
                      textDecoration: 'none',
                    }}
                  >
                    View →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
