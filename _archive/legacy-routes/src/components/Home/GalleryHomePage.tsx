'use client';

import React from 'react';
import GalleryHero from './GalleryHero';
import CuratedGallery from './CuratedGallery';
import EssayShowcaseGrid from './EssayShowcaseGrid';
import RecentEssaysStrip from './RecentEssaysStrip';
import EarlyAccessSection from './EarlyAccessSection';
import QuietToolsSection from './QuietToolsSection';
import './GalleryHomePage.css';

/**
 * GalleryHomePage Component
 * 
 * Gallery-first homepage that leads with visual essays, not SaaS.
 * Creates awe, authority, and trust before any conversion ask.
 * 
 * Sequencing:
 * 1. Impression (Hero)
 * 2. Trust (Curated Gallery)
 * 3. Curiosity (Featured Essays)
 * 4. Early Access (soft monetization)
 * 5. Quiet Tools (app exists, not promoted)
 * 
 * What's intentionally removed:
 * - AI mentions in any headline
 * - "productivity", "speed", "writing faster"
 * - Fake metrics (2.5M+ papers)
 * - SaaS purple gradients
 * - Feature grids
 * - Process steps
 * - Pricing anywhere
 * - "Get Free" language
 * - App promotion above the fold
 * 
 * SEO Considerations:
 * - Semantic HTML structure
 * - Accessible navigation
 * - Meta tags set at page level
 * - Structured data ready
 * 
 * @see /orchestration/agents/engineering/frontend-architecture-expert.md
 * @see /orchestration/agents/engineering/ui-ux-design-expert.md
 * @see /orchestration/agents/engineering/seo-specialist-expert.md
 */

const GalleryHomePage: React.FC = () => {
  return (
    <div className="gallery-homepage">
      {/* Main Content */}
      <main>
        {/* Hero - Cinematic, full-viewport */}
        <GalleryHero />

        {/* Curated Gallery - Featured + hand-picked essays */}
        <CuratedGallery />

        {/* Essay Showcase Grid - Cinematic visual grid */}
        <EssayShowcaseGrid />

        {/* Recent Essays Strip - Horizontal scroll of newest essays */}
        <RecentEssaysStrip />

        {/* Early Access - Non-charity monetization */}
        <EarlyAccessSection />

        {/* Quiet Tools - De-emphasized app mention */}
        <QuietToolsSection />
      </main>
    </div>
  );
};

export default GalleryHomePage;

