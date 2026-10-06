'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * EarlyAccessSection Component
 * 
 * Non-charity positioning for monetization. Emphasizes access, proximity,
 * and seriousness rather than "support" or "donate" framing.
 * 
 * Copy Strategy:
 * - "Early Access" not "Support"
 * - Focus on workflows and process, not features
 * - No pricing shown on homepage
 * - No feature lists or SaaS patterns
 */

const EarlyAccessSection: React.FC = () => {
  return (
    <section className="early-access-section" aria-labelledby="early-access-title">
      <div className="early-access-container">
        <span className="early-access-label">Early Access</span>
        
        <h2 id="early-access-title" className="early-access-title">
          Early Access to Esy
        </h2>
        
        <p className="early-access-description">
          Get access to research workflows and writing tools as they&apos;re built, 
          using the same process behind these essays. Join a small group of 
          early adopters shaping what comes next.
        </p>
        
        <a 
          href="https://app.esy.com/signup" 
          className="early-access-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Get Early Access</span>
          <ArrowRight size={16} aria-hidden="true" />
        </a>
        
        <p className="early-access-note">
          Limited availability. No commitment required.
        </p>
      </div>
    </section>
  );
};

export default EarlyAccessSection;

