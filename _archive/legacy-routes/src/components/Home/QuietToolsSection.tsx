'use client';

import React from 'react';

/**
 * QuietToolsSection Component
 * 
 * De-emphasized mention that the app exists. Must be discoverable
 * but NOT promoted. No screenshots, no features, no "start writing" CTA.
 * 
 * Design: Minimal, quiet, almost footnote-like presence
 */

const QuietToolsSection: React.FC = () => {
  return (
    <section className="quiet-tools-section" aria-label="Tools information">
      <div className="quiet-tools-container">
        <span className="quiet-tools-label">Also from Esy</span>
        
        <h3 className="quiet-tools-title">
          Research &amp; Writing Tools
        </h3>
        
        <p className="quiet-tools-description">
          We&apos;re building tools for researching and writing essays 
          using the workflows behind these visual essays.
        </p>
        
        <a 
          href="https://app.esy.com" 
          className="quiet-tools-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more →
        </a>
      </div>
    </section>
  );
};

export default QuietToolsSection;

