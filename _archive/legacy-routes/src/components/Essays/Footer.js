import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { elevatedDarkTheme } from '@/lib/theme';

const Footer = () => {
  return (
    <footer style={{ 
      borderTop: `1px solid ${elevatedDarkTheme.border}`,
      padding: '3rem 0',
      marginTop: '6rem',
      background: `linear-gradient(180deg, ${elevatedDarkTheme.bg} 0%, rgba(15, 15, 18, 0.98) 100%)`
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              background: elevatedDarkTheme.accent, 
              borderRadius: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <BookOpen size={16} color="white" />
            </div>
            <span style={{ fontSize: '1rem', fontWeight: 600 }}>esy</span>
          </div>

          <nav style={{ 
            display: 'flex', 
            gap: '2rem',
            fontSize: '0.813rem'
          }}>
            <Link href="/about/" style={{ color: elevatedDarkTheme.muted, textDecoration: 'none', transition: 'color 0.2s' }}>About</Link>
            <Link href="/privacy/" style={{ color: elevatedDarkTheme.muted, textDecoration: 'none', transition: 'color 0.2s' }}>Privacy</Link>
            <Link href="/terms/" style={{ color: elevatedDarkTheme.muted, textDecoration: 'none', transition: 'color 0.2s' }}>Terms</Link>
          </nav>

          <p style={{ 
            fontSize: '0.813rem',
            color: elevatedDarkTheme.faint
          }}>
            © 2025 Esy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 