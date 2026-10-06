"use client"
import React, { useState } from 'react';
import EssaysList from './EssaysList';

const ClientEssaysList = ({ essays }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedSort, setSelectedSort] = useState('relevance');

  return (
    <EssaysList 
      essays={essays}
      hoveredCard={hoveredCard}
      setHoveredCard={setHoveredCard}
      selectedSort={selectedSort}
      setSelectedSort={setSelectedSort}
    />
  );
};

export default ClientEssaysList; 