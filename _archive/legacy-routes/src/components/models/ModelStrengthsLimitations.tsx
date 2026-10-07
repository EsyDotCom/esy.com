"use client";

import { useState, useEffect } from 'react';
import { navyCalmDarkTheme } from '@/lib/theme';

// Light theme
const lightTheme = {
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  border: 'rgba(10, 37, 64, 0.08)',
  accent: '#00A896',
};

// Dark theme
const darkTheme = {
  text: navyCalmDarkTheme.text,
  muted: navyCalmDarkTheme.muted,
  subtle: navyCalmDarkTheme.subtle,
  border: navyCalmDarkTheme.border,
  accent: navyCalmDarkTheme.accent,
};

interface ModelStrengthsLimitationsProps {
  strengths: string[];
  limitations: string[];
}

export default function ModelStrengthsLimitations({ 
  strengths, 
  limitations 
}: ModelStrengthsLimitationsProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const storedTheme = localStorage.getItem('theme-models');
      setIsDarkMode(storedTheme === 'dark');
    };
    
    checkTheme();
    window.addEventListener('themechange', checkTheme);
    return () => window.removeEventListener('themechange', checkTheme);
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <div className="models-two-column">
      <div className="models-column">
        <h3 style={{ color: theme.text, marginTop: 0 }}>Strengths</h3>
        <ul>
          {strengths.map((strength, index) => (
            <li key={index} style={{ color: theme.muted }}>
              {strength}
            </li>
          ))}
        </ul>
      </div>
      <div className="models-column">
        <h3 style={{ color: theme.text, marginTop: 0 }}>Limitations</h3>
        <ul>
          {limitations.map((limitation, index) => (
            <li key={index} style={{ color: theme.muted }}>
              {limitation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
