"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
interface ScrollytellingNavigationProps {
  scrollThreshold?: number;
}

const ScrollytellingNavigation: React.FC<ScrollytellingNavigationProps> = ({ 
  scrollThreshold = 100 
}) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold]);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: hasScrolled 
          ? 'rgba(15, 17, 21, 0.95)' 
          : 'transparent',
        backdropFilter: hasScrolled ? 'blur(12px)' : 'none',
        borderBottom: hasScrolled 
          ? '1px solid rgba(255, 255, 255, 0.05)' 
          : '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Logo - using transparent SVG */}
      <Link 
        href="/" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          textDecoration: 'none',
          opacity: 1,
          transition: 'opacity 0.3s ease',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-black-ops-one), sans-serif',
          fontSize: '1.75rem',
          letterSpacing: '0.03em',
          lineHeight: 1,
          userSelect: 'none',
        }}>
          <span style={{ color: '#00A896' }}>e</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.92)' }}>sy</span>
        </span>
      </Link>

      {/* CTA - only visible after scroll */}
      <div
        style={{
          opacity: hasScrolled ? 1 : 0,
          transform: hasScrolled ? 'translateY(0)' : 'translateY(-10px)',
          pointerEvents: hasScrolled ? 'auto' : 'none',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Link
          href="https://app.esy.com"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.625rem 1.25rem',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: 500,
            borderRadius: '8px',
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 92, 246, 0.3)';
          }}
        >
          Write My Essay
        </Link>
      </div>
    </nav>
  );
};

export default ScrollytellingNavigation;

