import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { elevatedDarkTheme } from '@/lib/theme';

const FeaturedEssay = ({ featuredEssay }) => {
  return (
    <section style={{ 
      padding: '4rem 0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ 
            fontSize: '0.75rem', 
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: elevatedDarkTheme.accent
          }}>
            Featured Research
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <Link href={`/essays/${featuredEssay.id}/`} style={{ textDecoration: 'none' }}>
              <h2 style={{ 
                fontSize: '2.25rem',
                fontWeight: 300,
                lineHeight: 1.2,
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em',
                color: 'white',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}>
                {featuredEssay.title}
              </h2>
            </Link>

            <div style={{ 
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.5)',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span>{featuredEssay.authors.join(', ')}</span>
              <span>·</span>
              <span>{featuredEssay.institution}</span>
            </div>

            <p style={{ 
              fontSize: '1.063rem',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: 1.7,
              marginBottom: '2rem'
            }}>
              {featuredEssay.abstract}
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href={`/essays/${featuredEssay.id}/`} style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '0.75rem 1.5rem',
                  background: elevatedDarkTheme.accent,
                  border: 'none',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'background 0.2s'
                }}>
                  Read Essay
                  <ArrowUpRight size={16} />
                </button>
              </Link>
              <button style={{
                padding: '0.75rem 1.5rem',
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '6px',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                Edit & Build Upon
              </button>
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '1.5rem',
            paddingTop: '3rem'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'baseline',
              gap: '1rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <span style={{ fontSize: '2rem', fontWeight: 300 }}>
                {featuredEssay.metrics.citations}
              </span>
              <span style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                citations
              </span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'baseline',
              gap: '1rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <span style={{ fontSize: '2rem', fontWeight: 300 }}>
                {(featuredEssay.metrics.views / 1000).toFixed(1)}k
              </span>
              <span style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                views
              </span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'baseline',
              gap: '1rem'
            }}>
              <span style={{ fontSize: '2rem', fontWeight: 300 }}>
                {featuredEssay.metrics.impact}
              </span>
              <span style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                impact score
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEssay; 