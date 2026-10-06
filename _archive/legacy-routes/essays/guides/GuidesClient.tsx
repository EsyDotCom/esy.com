"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen, Lightbulb, PenTool, CheckCircle } from "lucide-react";
import './guides.css';

/*
 * Essay Writing Guides Hub
 * 
 * Design Philosophy:
 * - Clean, educational aesthetic
 * - Clear learning paths
 * - Focus on actionable content
 * - Mobile-first
 */

// ==================== TYPES ====================

interface Guide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  readTime: string;
  href: string;
  icon: 'book' | 'lightbulb' | 'pen' | 'check';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isNew?: boolean;
  isFeatured?: boolean;
}

// ==================== GUIDES DATA ====================

const guides: Guide[] = [
  {
    id: "how-to-write-an-essay",
    title: "How to Write an Essay",
    subtitle: "A Visual Step-by-Step Guide",
    description: "Master essay writing from start to finish. Learn brainstorming, outlining, drafting, and revision through an interactive visual experience.",
    readTime: "8 min",
    href: "/essays/foundations/how-to-write-an-essay",
    icon: "pen",
    difficulty: "Beginner",
    isFeatured: true,
    isNew: true,
  },
  // Future guides will be added here
  // {
  //   id: "thesis-statement-guide",
  //   title: "Crafting a Thesis Statement",
  //   subtitle: "The Foundation of Every Essay",
  //   description: "Learn to write clear, arguable thesis statements that anchor your essay and guide your reader.",
  //   readTime: "6 min",
  //   href: "/essays/guides/thesis-statement",
  //   icon: "lightbulb",
  //   difficulty: "Beginner",
  // },
];

const ICON_MAP = {
  book: BookOpen,
  lightbulb: Lightbulb,
  pen: PenTool,
  check: CheckCircle,
};

const DIFFICULTY_COLORS = {
  'Beginner': '#10B981',
  'Intermediate': '#F59E0B',
  'Advanced': '#EF4444',
};

// ==================== COMPONENTS ====================

// Hero Section
const Hero: React.FC = () => (
  <section className="guides-hero">
    <div className="guides-hero-content">
      <Link href="/essays" className="guides-back-link">
        ← Back to Essays
      </Link>
      <span className="guides-label">Writing Guides</span>
      <h1 className="guides-title">
        Learn to Write
        <span className="guides-title-accent"> Better Essays</span>
      </h1>
      <p className="guides-description">
        Interactive step-by-step guides that teach essay writing through 
        visual storytelling. From brainstorming to final draft.
      </p>
    </div>
  </section>
);

// Featured Guide Card
const FeaturedGuide: React.FC<{ guide: Guide }> = ({ guide }) => {
  const IconComponent = ICON_MAP[guide.icon];
  
  return (
    <Link href={guide.href} className="featured-guide">
      <div className="featured-guide-badge">Featured Guide</div>
      <div className="featured-guide-icon">
        <IconComponent size={32} />
      </div>
      <div className="featured-guide-content">
        <div className="featured-guide-meta">
          <span 
            className="featured-guide-difficulty"
            style={{ color: DIFFICULTY_COLORS[guide.difficulty] }}
          >
            {guide.difficulty}
          </span>
          <span className="featured-guide-time">
            <Clock size={14} />
            {guide.readTime}
          </span>
          {guide.isNew && <span className="featured-guide-new">New</span>}
        </div>
        <h2 className="featured-guide-title">{guide.title}</h2>
        <p className="featured-guide-subtitle">{guide.subtitle}</p>
        <p className="featured-guide-description">{guide.description}</p>
        <span className="featured-guide-cta">
          Start Learning <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
};

// Guide Card
const GuideCard: React.FC<{ guide: Guide }> = ({ guide }) => {
  const IconComponent = ICON_MAP[guide.icon];
  
  return (
    <Link href={guide.href} className="guide-card">
      <div className="guide-card-icon">
        <IconComponent size={24} />
      </div>
      <div className="guide-card-meta">
        <span 
          className="guide-card-difficulty"
          style={{ color: DIFFICULTY_COLORS[guide.difficulty] }}
        >
          {guide.difficulty}
        </span>
        {guide.isNew && <span className="guide-card-new">New</span>}
      </div>
      <h3 className="guide-card-title">{guide.title}</h3>
      <p className="guide-card-subtitle">{guide.subtitle}</p>
      <p className="guide-card-description">{guide.description}</p>
      <div className="guide-card-footer">
        <span className="guide-card-time">
          <Clock size={12} />
          {guide.readTime}
        </span>
        <ArrowRight size={16} className="guide-card-arrow" />
      </div>
    </Link>
  );
};

// Guides Grid
const GuidesGrid: React.FC<{ guides: Guide[] }> = ({ guides }) => {
  const featured = guides.find(g => g.isFeatured);
  const otherGuides = guides.filter(g => !g.isFeatured);
  
  return (
    <section className="guides-section">
      {featured && (
        <div className="guides-featured">
          <FeaturedGuide guide={featured} />
        </div>
      )}
      
      {otherGuides.length > 0 && (
        <div className="guides-grid">
          {otherGuides.map(guide => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      )}
      
      {guides.length === 1 && (
        <div className="guides-coming-soon">
          <div className="coming-soon-card">
            <Lightbulb size={32} className="coming-soon-icon" />
            <h3 className="coming-soon-title">More Guides Coming Soon</h3>
            <p className="coming-soon-text">
              We&apos;re developing comprehensive guides for thesis statements, 
              essay structure, argumentation, research methods, and more.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

// ==================== MAIN ====================

const GuidesClient: React.FC = () => {
  return (
    <div className="guides-index">
      <Hero />
      <GuidesGrid guides={guides} />
    </div>
  );
};

export default GuidesClient;

