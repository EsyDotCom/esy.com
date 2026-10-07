"use client";

import React, { useState, useEffect, useRef } from 'react';
import { elevatedDarkTheme } from '@/lib/theme';
import { 
  Brain, 
  Target, 
  Zap, 
  Shield,
  Sparkles,
  FileText,
  BookOpen,
  PenTool,
  Layers,
  CheckCircle,
  TrendingUp,
  Award,
  ChevronRight,
  ArrowUpRight,
  type LucideIcon
} from 'lucide-react';

interface FeatureCard {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  stat?: string;
  statLabel?: string;
  gradient?: string;
  size: 'small' | 'medium' | 'large';
  demo?: React.ReactNode;
}

const ModernFeaturesBento: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState<{ [key: string]: number }>({});
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Check if mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Start counter animations
          animateCounters();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Animate counters
  const animateCounters = () => {
    const targetValues = {
      accuracy: 87,
      speed: 3,
      sources: 50,
      users: 10
    };

    Object.keys(targetValues).forEach(key => {
      let current = 0;
      const target = targetValues[key as keyof typeof targetValues];
      const increment = target / 30;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 50);
    });
  };

  const features: FeatureCard[] = [
    {
      id: 'intelligence',
      icon: Brain,
      title: 'Intelligent Writing Engine',
      description: 'AI that understands academic context and maintains your unique voice',
      stat: counters.accuracy?.toString() || '0',
      statLabel: '% Accuracy',
      gradient: `linear-gradient(135deg, ${elevatedDarkTheme.accent} 0%, #ec4899 100%)`,
      size: 'large'
    },
    {
      id: 'speed',
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate drafts in seconds',
      stat: counters.speed?.toString() || '0',
      statLabel: 'x Faster',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
      size: 'small'
    },
    {
      id: 'research',
      icon: BookOpen,
      title: 'Research Integration',
      description: 'Access millions of academic sources instantly',
      stat: counters.sources?.toString() || '0',
      statLabel: '+ Sources',
      gradient: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
      size: 'medium'
    },
    {
      id: 'prompts',
      icon: Sparkles,
      title: '68 Expert Prompts',
      description: 'Professionally crafted templates for every writing scenario',
      gradient: `linear-gradient(135deg, ${elevatedDarkTheme.accent} 0%, ${elevatedDarkTheme.accentDark} 100%)`,
      size: 'medium'
    },
    {
      id: 'privacy',
      icon: Shield,
      title: 'Your Data, Protected',
      description: 'End-to-end encryption, no training on your work',
      gradient: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
      size: 'small'
    },
    {
      id: 'formats',
      icon: Layers,
      title: 'All Formats',
      description: 'Essays, research papers, dissertations, and more',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)',
      size: 'small'
    }
  ];

  const styles = {
    container: {
      width: '100%',
      padding: isMobile ? '4rem 1rem' : '6rem 2rem',
      background: elevatedDarkTheme.bg,
      position: 'relative' as const,
      overflow: 'hidden'
    },
    wrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
      transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: isMobile ? '3rem' : '4rem'
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      background: `linear-gradient(135deg, ${elevatedDarkTheme.accentGlow} 0%, rgba(159, 122, 234, 0.05) 100%)`,
      border: `1px solid ${elevatedDarkTheme.accentBorder}`,
      borderRadius: '100px',
      marginBottom: '1.5rem'
    },
    badgeText: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#a78bfa',
      letterSpacing: '0.025em',
      textTransform: 'uppercase' as const
    },
    title: {
      fontSize: isMobile ? '2rem' : '3rem',
      fontWeight: '300',
      color: '#ffffff',
      marginBottom: '1rem',
      letterSpacing: '-0.03em',
      lineHeight: 1.2,
      fontFamily: 'var(--font-literata)'
    },
    titleGradient: {
      background: `linear-gradient(135deg, ${elevatedDarkTheme.accent} 0%, #ec4899 100%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontWeight: '400'
    },
    subtitle: {
      fontSize: isMobile ? '1rem' : '1.125rem',
      color: 'rgba(255, 255, 255, 0.6)',
      lineHeight: 1.6,
      maxWidth: '600px',
      margin: '0 auto'
    },
    bentoGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
      gridTemplateRows: 'auto',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    card: {
      background: elevatedDarkTheme.elevated,
      backdropFilter: 'blur(10px)',
      border: `1px solid ${elevatedDarkTheme.border}`,
      borderRadius: '20px',
      padding: isMobile ? '1.5rem' : '2rem',
      position: 'relative' as const,
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex',
      flexDirection: 'column' as const
    },
    cardLarge: {
      gridColumn: isMobile ? 'span 1' : 'span 2',
      gridRow: isMobile ? 'span 1' : 'span 2'
    },
    cardMedium: {
      gridColumn: isMobile ? 'span 1' : 'span 2',
      gridRow: 'span 1'
    },
    cardSmall: {
      gridColumn: 'span 1',
      gridRow: 'span 1'
    },
    cardGradient: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      height: '2px',
      opacity: 0,
      transition: 'opacity 0.3s ease'
    },
    cardGlow: {
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      width: '200%',
      height: '200%',
      transform: 'translate(-50%, -50%)',
      background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 60%)',
      opacity: 0,
      transition: 'opacity 0.4s ease',
      pointerEvents: 'none' as const
    },
    iconWrapper: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1rem',
      background: elevatedDarkTheme.accentGlow,
      border: `1px solid ${elevatedDarkTheme.accentBorder}`,
      transition: 'all 0.3s ease'
    },
    cardTitle: {
      fontSize: isMobile ? '1.125rem' : '1.25rem',
      fontWeight: '600',
      color: '#ffffff',
      marginBottom: '0.5rem',
      letterSpacing: '-0.01em'
    },
    cardDescription: {
      fontSize: '0.9375rem',
      color: 'rgba(255, 255, 255, 0.6)',
      lineHeight: 1.6,
      marginBottom: '1rem',
      flex: 1
    },
    cardStat: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '0.5rem',
      marginTop: 'auto'
    },
    statNumber: {
      fontSize: '2.5rem',
      fontWeight: '700',
      fontFamily: 'var(--font-literata)',
      letterSpacing: '-0.02em'
    },
    statLabel: {
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.5)',
      fontWeight: '500'
    },
    learnMore: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontSize: '0.875rem',
      color: '#a78bfa',
      fontWeight: '500',
      marginTop: 'auto',
      transition: 'all 0.2s ease'
    },
    floatingElement: {
      position: 'absolute' as const,
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
      filter: 'blur(60px)',
      animation: 'float 20s infinite ease-in-out',
      pointerEvents: 'none' as const
    }
  };

  return (
    <section ref={containerRef} style={styles.container}>
      {/* Floating Background Elements */}
      <div style={{ ...styles.floatingElement, top: '-150px', left: '-150px' }} />
      <div style={{ ...styles.floatingElement, bottom: '-150px', right: '-150px', animationDelay: '10s' }} />

      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.badge}>
            <Layers size={16} />
            <span style={styles.badgeText}>Features</span>
          </div>
          
          <h2 style={styles.title}>
            How Esy {isMobile ? <br /> : ''}
            <span style={styles.titleGradient}>Transforms Your Writing</span>
          </h2>
          
          <p style={styles.subtitle}>
            {isMobile 
              ? 'Write with confidence using AI that understands excellence' 
              : 'Every tool you need to write with confidence, backed by intelligent AI that understands academic excellence.'}
          </p>
        </div>

        {/* Bento Grid */}
        <div style={styles.bentoGrid}>
          {features.map((feature) => (
            <div
              key={feature.id}
              style={{
                ...styles.card,
                ...(feature.size === 'large' ? styles.cardLarge : 
                    feature.size === 'medium' ? styles.cardMedium : 
                    styles.cardSmall),
                ...(hoveredCard === feature.id ? {
                  transform: 'translateY(-8px) scale(1.02)'
                } : {})
              }}
              onMouseEnter={() => setHoveredCard(feature.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >

              {/* Glow Effect */}
              <div 
                style={{
                  ...styles.cardGlow,
                  opacity: hoveredCard === feature.id ? 1 : 0
                }}
              />

              {/* Icon */}
              <div style={{
                ...styles.iconWrapper,
                ...(hoveredCard === feature.id ? {
                  background: elevatedDarkTheme.accentGlow,
                  transform: 'rotate(-5deg) scale(1.1)'
                } : {})
              }}>
                <feature.icon 
                  size={24} 
                  color={hoveredCard === feature.id ? elevatedDarkTheme.accentLight : elevatedDarkTheme.accent}
                />
              </div>

              {/* Content */}
              <h3 style={styles.cardTitle}>{feature.title}</h3>
              <p style={styles.cardDescription}>{feature.description}</p>

              {/* Stats or Learn More */}
              {feature.stat ? (
                <div style={styles.cardStat}>
                  <span style={{
                    ...styles.statNumber,
                    background: feature.gradient || `linear-gradient(135deg, ${elevatedDarkTheme.accent} 0%, #ec4899 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {feature.stat}
                  </span>
                  <span style={styles.statLabel}>{feature.statLabel}</span>
                </div>
              ) : (
                <div style={{
                  ...styles.learnMore,
                  ...(hoveredCard === feature.id ? {
                    color: '#ec4899',
                    transform: 'translateX(4px)'
                  } : {})
                }}>
                  Learn more
                  <ArrowUpRight size={14} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '3rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s'
        }}>
          <p style={{ 
            fontSize: isMobile ? '1.125rem' : '1rem', 
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: '1.5rem',
            lineHeight: 1.4
          }}>
            {isMobile ? (
              <>Ready to experience<br />the difference?</>
            ) : (
              'Ready to experience the difference?'
            )}
          </p>
          <button
            style={{
              padding: '0.875rem 2rem',
              background: `linear-gradient(135deg, ${elevatedDarkTheme.accent} 0%, ${elevatedDarkTheme.accentDark} 100%)`,
              border: 'none',
              borderRadius: '12px',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
            onClick={() => window.open('https://app.esy.com', '_blank')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
          >
            Start Writing Free
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
        }
      `}</style>
    </section>
  );
};

export default ModernFeaturesBento;
