"use client"
import React from 'react';
import { 
  FeaturedEssay, 
} from '@/components/Essays';
import { ClientHeroSection, ClientEssaysList } from '@/components/Essays';
import { elevatedDarkTheme } from '@/lib/theme';
import '@/app/globals.css';

const EsyEssaysHubClient = ({ essays, featuredEssay, filters }) => {
  return (
    <div className="academic-page" style={{ 
      minHeight: '100vh', 
      backgroundColor: elevatedDarkTheme.bg,
      color: elevatedDarkTheme.text,
      fontFamily: 'var(--font-inter)',
      lineHeight: 1.6
    }}>
      <ClientHeroSection filters={filters} essays={essays} />
      
      {featuredEssay && <FeaturedEssay featuredEssay={featuredEssay} />}
      
      <ClientEssaysList essays={essays} />
    </div>
  );
};

export default EsyEssaysHubClient; 