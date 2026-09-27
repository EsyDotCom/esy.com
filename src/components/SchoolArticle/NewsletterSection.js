"use client"

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useNewsletterSubscribe } from '@/hooks/useNewsletterSubscribe';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [newsletterHovered, setNewsletterHovered] = useState(false);
  const { subscribe, status, errorMessage, reset, honeypotProps } = useNewsletterSubscribe();

  const isError = status === 'error';
  const isSuccess = status === 'success';
  const isLoading = status === 'loading';

  const styles = {
    newsletter: {
      maxWidth: '800px',
      margin: '8rem auto',
      padding: '4rem',
      backgroundColor: 'rgba(0, 168, 150, 0.03)',
      border: '1px solid rgba(0, 168, 150, 0.1)',
      borderRadius: '16px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    newsletterGlow: {
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'radial-gradient(circle, rgba(0, 168, 150, 0.1) 0%, transparent 70%)',
      animation: newsletterHovered ? 'rotate 20s linear infinite' : 'none',
      opacity: newsletterHovered ? 1 : 0,
      transition: 'opacity 0.3s ease'
    },
    newsletterContent: {
      position: 'relative',
      zIndex: 1
    },
    newsletterTitle: {
      fontSize: '2.5rem',
      fontWeight: '200',
      marginBottom: '1rem',
      letterSpacing: '-0.02em',
      fontFamily: 'OrigamiIncised, sans-serif'
    },
    newsletterDescription: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '1.125rem',
      marginBottom: '2.5rem',
      lineHeight: '1.6'
    },
    newsletterForm: {
      display: 'flex',
      gap: '1rem',
      maxWidth: '480px',
      margin: '0 auto'
    },
    newsletterInput: {
      flex: 1,
      padding: '1rem 1.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: isError ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      color: '#ffffff',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s ease',
      boxShadow: isError ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 'none'
    },
    newsletterButton: {
      padding: '1rem 2rem',
      backgroundColor: '#00A896',
      border: 'none',
      borderRadius: '8px',
      color: '#ffffff',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: isLoading ? 'default' : 'pointer',
      transition: 'all 0.2s ease',
      opacity: isLoading ? 0.7 : 1,
      minHeight: '48px',
      whiteSpace: 'nowrap'
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (isError) reset();
  };

  return (
    <section 
      style={styles.newsletter}
      onMouseEnter={() => setNewsletterHovered(true)}
      onMouseLeave={() => setNewsletterHovered(false)}
    >
      <div style={styles.newsletterGlow} />
      <div style={styles.newsletterContent}>
        {isSuccess ? (
          /* Success state */
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '2px solid rgba(16, 185, 129, 0.2)',
              marginBottom: '1.5rem'
            }}>
              <CheckCircle2 size={28} color="#10b981" strokeWidth={1.5} />
            </div>
            <h2 style={{
              ...styles.newsletterTitle,
              fontSize: '2rem',
              fontWeight: '300',
              fontFamily: 'Literata, Georgia, serif'
            }}>
              You&apos;re in!
            </h2>
            <p style={{
              ...styles.newsletterDescription,
              marginBottom: '0'
            }}>
              Check your inbox for a welcome email. If you don&apos;t see it, check your spam or promotions folder and mark us as safe.
            </p>
          </div>
        ) : (
          /* Form state */
          <>
            <h2 style={styles.newsletterTitle}>Weekly learning digest</h2>
            <p style={styles.newsletterDescription}>
              Get the latest articles, tutorials, and AI writing insights delivered to your inbox every Thursday.
            </p>
            <div>
              <div style={styles.newsletterForm}>
                {/* Bot trap: off-screen, never focusable, never filled by a human. */}
                <input {...honeypotProps} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleInputChange}
                  style={styles.newsletterInput}
                  onFocus={(e) => {
                    if (!isError) {
                      e.target.style.borderColor = '#00A896';
                      e.target.style.backgroundColor = 'rgba(0, 168, 150, 0.08)';
                    }
                  }}
                  onBlur={(e) => {
                    if (!isError) {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }
                  }}
                />
                <button
                  style={styles.newsletterButton}
                  disabled={isLoading}
                  onClick={() => {
                    subscribe(email);
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>

              {/* Error message */}
              {isError && errorMessage && (
                <p style={{
                  marginTop: '0.75rem',
                  fontSize: '0.8125rem',
                  color: '#ef4444',
                  textAlign: 'center',
                  lineHeight: '1.4'
                }}>
                  {errorMessage}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default NewsletterSection;
