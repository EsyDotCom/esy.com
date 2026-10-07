"use client";

import { useState, useEffect } from 'react';
import { ModelUsage } from '@/lib/models/types';
import { navyCalmDarkTheme } from '@/lib/theme';

// Light theme
const lightTheme = {
  bg: '#FFFFFF',
  surface: '#F8FAFC',
  text: '#0A2540',
  muted: 'rgba(10, 37, 64, 0.7)',
  subtle: 'rgba(10, 37, 64, 0.5)',
  border: 'rgba(10, 37, 64, 0.08)',
  accent: '#00A896',
  accentMuted: 'rgba(0, 168, 150, 0.15)',
};

// Dark theme
const darkTheme = {
  bg: navyCalmDarkTheme.bg,
  surface: navyCalmDarkTheme.surface,
  text: navyCalmDarkTheme.text,
  muted: navyCalmDarkTheme.muted,
  subtle: navyCalmDarkTheme.subtle,
  border: navyCalmDarkTheme.border,
  accent: navyCalmDarkTheme.accent,
  accentMuted: navyCalmDarkTheme.accentTint,
};

interface ModelUsageTableProps {
  usage: ModelUsage[];
}

const agentRoleLabels: Record<string, string> = {
  planning: 'Planning',
  research: 'Research Discovery',
  synthesis: 'Draft Synthesis',
  verification: 'Verification / Critique',
  'long-context': 'Long-Context Digestion',
  'code-generation': 'Code Generation',
  'code-review': 'Code Review',
  'software-architecture': 'Software Architecture',
};

const confidenceLabels: Record<string, string> = {
  primary: 'Primary',
  secondary: 'Secondary',
  experimental: 'Experimental',
};

export default function ModelUsageTable({ usage }: ModelUsageTableProps) {
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
    <table className="models-table" style={{ marginTop: '1rem' }}>
      <thead>
        <tr>
          <th style={{ width: '25%' }}>Agent Role</th>
          <th style={{ width: '60%' }}>What it does</th>
          <th style={{ width: '15%' }}>Confidence</th>
        </tr>
      </thead>
      <tbody>
        {usage.map((item, index) => (
          <tr key={index}>
            <td style={{ fontWeight: 500, color: theme.text }}>
              {agentRoleLabels[item.agentRole] || item.agentRole}
            </td>
            <td style={{ color: theme.muted }}>
              {item.description}
            </td>
            <td>
              <span
                className={`models-confidence-badge ${item.confidence}`}
                style={{
                  backgroundColor: item.confidence === 'primary' 
                    ? theme.accentMuted 
                    : theme.surface,
                  color: item.confidence === 'primary' 
                    ? theme.accent 
                    : item.confidence === 'secondary'
                    ? theme.text
                    : theme.subtle,
                  border: `1px solid ${item.confidence === 'primary' ? theme.accent : theme.border}`,
                }}
              >
                {confidenceLabels[item.confidence]}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
