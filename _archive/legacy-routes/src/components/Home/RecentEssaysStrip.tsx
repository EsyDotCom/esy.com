'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  publishedVisualEssays, 
  CATEGORY_COLORS,
  type VisualEssay 
} from '@/data/visualEssays';
import { cdnImageSrc } from '@/lib/imageCdn';

/**
 * RecentEssaysStrip Component
 * 
 * Horizontal scrolling strip of recent essays with hero images.
 * Creates freshness signal and shows activity/new content.
 * 
 * Design: Horizontal scroll with snap points, editorial cards with images
 */

// Recent essays with hero images - these are the newest additions
interface RecentEssay {
  id: string;
  heroImage: string;
  heroAlt: string;
}

// Map of essay IDs to their hero images (most recent first)
const RECENT_ESSAY_IMAGES: RecentEssay[] = [
  {
    id: 'the-origin-of-toy',
    heroImage: '/og/the-origin-of-toy.png',
    heroAlt: 'TOY - The etymology of play, from sin to innocence',
  },
  {
    id: 'the-history-of-pizza',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
    heroAlt: 'Pizza Margherita - 10,000 years of culinary history',
  },
  {
    id: 'the-history-of-burmese-cuisine',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Myanmar%E2%80%99s_Traditional_Food_-_Mohinga.jpg',
    heroAlt: 'Mohinga - Myanmar national dish',
  },
  {
    id: 'the-history-of-languages',
    heroImage: '/og/the-history-of-languages.png',
    heroAlt: 'The History of Languages - Humanity\'s greatest invention',
  },
  {
    id: 'how-money-is-created',
    heroImage: '/og/how-money-is-created.png',
    heroAlt: 'How Money Is Created - The mechanics of modern banking',
  },
  {
    id: 'the-invention-of-wine',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Wine_grapes.jpg',
    heroAlt: 'Wine grapes - 8,000 years in a glass',
  },
];

// Get recent essays with images
const getRecentEssays = (): (VisualEssay & { heroImage: string; heroAlt: string })[] => {
  return RECENT_ESSAY_IMAGES
    .map(recent => {
      const essay = publishedVisualEssays.find(e => e.id === recent.id);
      if (!essay) return null;
      return { ...essay, heroImage: recent.heroImage, heroAlt: recent.heroAlt };
    })
    .filter((essay): essay is (VisualEssay & { heroImage: string; heroAlt: string }) => essay !== null);
};

/**
 * Recent Essay Card
 */
interface RecentCardProps {
  essay: VisualEssay & { heroImage: string; heroAlt: string };
}

const RecentCard: React.FC<RecentCardProps> = ({ essay }) => (
  <Link href={essay.href} className="recent-card">
    {/* Image */}
    <div className="recent-card-image">
      <Image
        src={cdnImageSrc(essay.heroImage)}
        alt={essay.heroAlt}
        fill
        sizes="(max-width: 768px) 280px, 320px"
        style={{ objectFit: 'cover' }}
      />
      <div className="recent-card-overlay" />
    </div>

    {/* Content */}
    <div className="recent-card-content">
      <span 
        className="recent-card-category"
        style={{ color: CATEGORY_COLORS[essay.category] }}
      >
        {essay.category}
      </span>
      <h3 className="recent-card-title">{essay.title}</h3>
      <p className="recent-card-subtitle">{essay.subtitle}</p>
      <div className="recent-card-meta">
        <Clock size={12} />
        <span>{essay.readTime}</span>
      </div>
    </div>
  </Link>
);

/**
 * Recent Essays Strip Component
 */
const RecentEssaysStrip: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const recentEssays = getRecentEssays();

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 340; // card width + gap
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (recentEssays.length === 0) return null;

  return (
    <section className="recent-essays-strip" aria-labelledby="recent-title">
      {/* Header */}
      <header className="recent-header">
        <div className="recent-header-text">
          <span className="recent-eyebrow">Recently Added</span>
          <h2 id="recent-title" className="recent-title">Fresh Perspectives</h2>
        </div>
        
        {/* Scroll Controls */}
        <div className="recent-controls">
          <button 
            onClick={() => scroll('left')} 
            className="recent-scroll-btn"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')} 
            className="recent-scroll-btn"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </header>

      {/* Scrollable Strip */}
      <div className="recent-scroll-container" ref={scrollRef}>
        <div className="recent-scroll-track">
          {recentEssays.map((essay) => (
            <RecentCard key={essay.id} essay={essay} />
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <footer className="recent-footer">
        <Link href="/essays/" className="recent-view-all">
          <span>Browse All Essays</span>
          <ArrowRight size={16} />
        </Link>
      </footer>
    </section>
  );
};

export default RecentEssaysStrip;

