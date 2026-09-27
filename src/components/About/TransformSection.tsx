"use client";

import React, { useState } from 'react';
import { ArrowRight, Play, Mail } from 'lucide-react';
import { useNewsletterSubscribe } from '@/hooks/useNewsletterSubscribe';

interface TransformSectionProps {
  currentTheme: {
    muted: string;
    subtle: string;
    accent: string;
  };
}

const TransformSection: React.FC<TransformSectionProps> = ({ currentTheme }) => {
  const [email, setEmail] = useState('');
  const { subscribe, status, honeypotProps } = useNewsletterSubscribe();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscribe(email);
    }
  };

  return (
    <section id="transform" style={{ 
      padding: '10rem 0',
      background: `linear-gradient(180deg, rgba(18, 18, 21, 0) 0%, rgba(59, 130, 246, 0.05) 100%)`,
      position: 'relative'
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '800px',
        background: `radial-gradient(circle, ${currentTheme.accent}10 0%, transparent 70%)`,
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        {/* Main Headline */}
        <h2 style={{
          fontSize: '4rem',
          fontWeight: 300,
          letterSpacing: '-0.03em',
          lineHeight: 1.2,
          marginBottom: '2rem',
          textAlign: 'center',
          fontFamily: 'var(--font-literata)'
        }}>
          Six months from now,
          <br />
          <span style={{ fontWeight: 400, color: 'white' }}>
            you&apos;ll wish you started today.
          </span>
        </h2>

        {/* Subheadline */}
        <p style={{
          fontSize: '1.5rem',
          lineHeight: 1.7,
          color: currentTheme.muted,
          marginBottom: '3rem',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto 3rem'
        }}>
          The researchers who join Esy now will have a{' '}
          <span style={{ fontWeight: 600, color: 'white' }}>6-month head start</span>{' '}
          on everyone else.
        </p>

        {/* Benefit List */}
        <div style={{
          fontSize: '1.25rem',
          lineHeight: 2,
          color: currentTheme.muted,
          marginBottom: '4rem',
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto 4rem'
        }}>
          <div style={{ marginBottom: '0.75rem' }}>
            Six months of <span style={{ color: currentTheme.accent, fontWeight: 600 }}>refined prompts</span>.
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            Six months of <span style={{ color: currentTheme.accent, fontWeight: 600 }}>compound productivity gains</span>.
          </div>
          <div>
            Six months of <span style={{ color: currentTheme.accent, fontWeight: 600 }}>publications, grants, and breakthroughs</span>
            <br />
            <span style={{ fontStyle: 'italic', color: currentTheme.subtle }}>that could have been yours</span>.
          </div>
        </div>

        {/* CTA Cluster */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {/* Email Form */}
          <form onSubmit={handleSubmit} style={{
            width: '100%',
            maxWidth: '500px',
            display: 'flex',
            gap: '1rem',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Mail size={20} color={currentTheme.subtle} style={{
                  position: 'absolute',
                  left: '1.25rem',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }} />
                {/* Bot trap: off-screen, never focusable, never filled by a human. */}
                <input {...honeypotProps} />
                <input
                  type="email"
                  placeholder="Enter your academic email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '1.125rem 1.25rem 1.125rem 3.5rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${currentTheme.subtle}30`,
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = currentTheme.accent;
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = `${currentTheme.subtle}30`;
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }}
                />
              </div>
              <button type="submit" style={{
                padding: '1.125rem 2.5rem',
                background: currentTheme.accent,
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '1.0625rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.3s ease',
                boxShadow: `0 4px 20px ${currentTheme.accent}40`,
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 6px 30px ${currentTheme.accent}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 20px ${currentTheme.accent}40`;
              }}
              >
                {status === 'loading' ? 'Submitting...' : status === 'success' ? 'Added! ✓' : 'Request Access'}
                {status !== 'success' && status !== 'loading' && <ArrowRight size={20} strokeWidth={2.5} />}
              </button>
            </div>
          </form>

          {/* Secondary CTA */}
          <button style={{
            padding: '0',
            background: 'transparent',
            border: 'none',
            color: currentTheme.muted,
            fontSize: '1rem',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'color 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = currentTheme.accent}
          onMouseLeave={(e) => e.currentTarget.style.color = currentTheme.muted}
          >
            <Play size={16} fill="currentColor" />
            Watch 2-min demo first
          </button>
        </div>

        {/* Final Social Proof */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <div style={{
            fontSize: '1.125rem',
            fontWeight: 500,
            color: 'white',
            marginBottom: '0.5rem'
          }}>
            Join 2,847 researchers from 340+ institutions
          </div>
          <div style={{
            fontSize: '0.9375rem',
            color: currentTheme.subtle
          }}>
            Next cohort opens in{' '}
            <span style={{
              padding: '0.25rem 0.75rem',
              background: `${currentTheme.accent}15`,
              borderRadius: '12px',
              color: currentTheme.accent,
              fontWeight: 600
            }}>
              18 days
            </span>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          padding: '3rem 0 0',
          borderTop: `1px solid ${currentTheme.subtle}20`
        }}>
          <div style={{
            fontSize: '0.9375rem',
            color: currentTheme.subtle,
            marginBottom: '1rem'
          }}>
            Questions? Email{' '}
            <a href="mailto:founders@esy.com" style={{
              color: currentTheme.accent,
              textDecoration: 'none',
              fontWeight: 500
            }}>
              founders@esy.com
            </a>
          </div>
          <div style={{
            fontSize: '0.875rem',
            color: currentTheme.subtle
          }}>
            We respond within 24 hours
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformSection;
