'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';

/**
 * EssayShowcaseGrid Component
 * 
 * Cinematic grid of visual essay hero images.
 * Creates a gallery/museum experience that showcases the breadth of work.
 * 
 * Design Philosophy:
 * - Portfolio effect: Shows range and quality
 * - Multiple entry points: Different topics for different visitors
 * - Visual-first: Let the stunning images do the talking
 * - Editorial aesthetic: Museum-quality presentation
 * 
 * Marketing rationale:
 * - Builds trust through volume and variety
 * - Creates curiosity and exploration
 * - Social proof: "This is a body of work"
 */

interface ShowcaseEssay {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryColor: string;
  readTime: string;
  href: string;
  heroImage: string;
  size?: 'featured' | 'standard';
}

// Hand-picked essays with their actual hero images
const SHOWCASE_ESSAYS: ShowcaseEssay[] = [
  {
    id: 'manhattan-project',
    title: 'Now I Am Become Death',
    subtitle: 'The Making of the Atomic Bomb',
    category: 'History',
    categoryColor: '#F59E0B',
    readTime: '22 min',
    href: '/essays/history/the-manhattan-project',
    // Trinity test mushroom cloud - actual hero image from essay
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Trinity_Test_Mushroom_Cloud_12s.jpg',
    size: 'featured',
  },
  {
    id: 'history-of-languages',
    title: 'The History of Languages',
    subtitle: "Humanity's Greatest Invention",
    category: 'Culture',
    categoryColor: '#EC4899',
    readTime: '25 min',
    href: '/essays/the-history-of-languages',
    // Library of Alexandria - actual hero image from essay
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Ancientlibraryalex.jpg',
    size: 'featured',
  },
  {
    id: 'the-word-robot',
    title: 'ROBOT',
    subtitle: 'The Word That Imagined Our Future',
    category: 'History',
    categoryColor: '#F59E0B',
    readTime: '25 min',
    href: '/essays/etymology/the-word-robot',
    // Actual hero from the essay - dramatic typography
    heroImage: '/images/robot/robot-hero.jpg',
    size: 'standard',
  },
  {
    id: 'the-rwanda-genocide',
    title: 'Kwibuka',
    subtitle: 'A Hundred Days of Darkness, A Generation of Light',
    category: 'History',
    categoryColor: '#F59E0B',
    readTime: '35 min',
    href: '/essays/the-rwanda-genocide',
    // Kigali Genocide Memorial - solemn remembrance
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Kigali_Genocide_Memorial.jpg',
    size: 'standard',
  },
];

const EssayCard: React.FC<{ essay: ShowcaseEssay }> = ({ essay }) => (
  <Link 
    href={essay.href} 
    className={`showcase-card ${essay.size === 'featured' ? 'showcase-card-featured' : ''}`}
  >
    {/* Image */}
    <div className="showcase-card-image">
      <Image
        src={essay.heroImage}
        alt={essay.title}
        fill
        sizes={essay.size === 'featured' ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
        style={{ objectFit: 'cover' }}
      />
      <div className="showcase-card-overlay" />
    </div>

    {/* Content */}
    <div className="showcase-card-content">
      <span 
        className="showcase-card-category"
        style={{ color: essay.categoryColor }}
      >
        {essay.category}
      </span>
      <h3 className="showcase-card-title">{essay.title}</h3>
      <p className="showcase-card-subtitle">{essay.subtitle}</p>
      <div className="showcase-card-meta">
        <Clock size={12} />
        <span>{essay.readTime}</span>
      </div>
    </div>

    {/* Hover CTA */}
    <div className="showcase-card-cta">
      <span>Read Essay</span>
      <ArrowRight size={16} />
    </div>
  </Link>
);

const EssayShowcaseGrid: React.FC = () => {
  return (
    <section className="essay-showcase" aria-labelledby="showcase-title">
      {/* Section Header */}
      <header className="showcase-header">
        <div className="showcase-header-content">
          <span className="showcase-eyebrow">Visual Essays</span>
          <h2 id="showcase-title" className="showcase-title">
            Cinematic Explorations
          </h2>
          <p className="showcase-description">
            Research-driven narratives that combine deep investigation with stunning design. 
            History, science, and culture—explored, not just explained.
          </p>
        </div>
      </header>

      {/* Grid */}
      <div className="showcase-grid">
        {SHOWCASE_ESSAYS.map((essay) => (
          <EssayCard key={essay.id} essay={essay} />
        ))}
      </div>

      {/* Footer CTA */}
      <footer className="showcase-footer">
        <Link href="/essays/" className="showcase-view-all">
          <span>View All Visual Essays</span>
          <ArrowRight size={16} />
        </Link>
      </footer>
    </section>
  );
};

export default EssayShowcaseGrid;

