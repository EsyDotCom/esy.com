"use client"
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Home/navigation';

const ClientNavigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <Navigation scrolled={scrolled} />;
};

export default ClientNavigation; 