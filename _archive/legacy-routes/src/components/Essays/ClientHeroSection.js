"use client"
import React, { useState } from 'react';
import HeroSection from './HeroSection';

const ClientHeroSection = ({ filters, essays }) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <HeroSection 
      searchFocused={searchFocused}
      setSearchFocused={setSearchFocused}
      activeFilter={activeFilter}
      setActiveFilter={setActiveFilter}
      filters={filters}
      essays={essays}
    />
  );
};

export default ClientHeroSection; 