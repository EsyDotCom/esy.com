"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./scrollytelling-endcard.css";

// Story data for recommendations
interface Story {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  href: string;
}

const allStories: Story[] = [
  { id: "mammary-gland-evolution", title: "Mammary Gland Evolution", subtitle: "Anatomical Journey", category: "Biology", readTime: "14 min", href: "/scrollytelling/mammary-gland-evolution" },
  { id: "evolution-of-mammary-glands", title: "Evolution of Mammary Glands", subtitle: "310 Million Years of Milk", category: "Biology", readTime: "12 min", href: "/scrollytelling/evolution-of-mammary-glands" },
  { id: "eternal-honey", title: "Eternal Honey", subtitle: "Into the Pyramid", category: "Archaeology", readTime: "12 min", href: "/scrollytelling/eternal-honey" },
  { id: "honey-never-spoils", title: "Honey Never Spoils", subtitle: "The Eternal Elixir", category: "Science", readTime: "11 min", href: "/scrollytelling/honey-never-spoils" },
  { id: "the-dna-helix", title: "DNA & The Double Helix", subtitle: "The Code of Life", category: "Science", readTime: "13 min", href: "/scrollytelling/the-dna-helix" },
  { id: "the-skyscraper", title: "The Skyscraper", subtitle: "Reaching for the Sky", category: "Architecture", readTime: "14 min", href: "/scrollytelling/the-skyscraper" },
  { id: "the-firearm", title: "The Firearm", subtitle: "From Fire Lance to Precision", category: "Military", readTime: "13 min", href: "/scrollytelling/the-firearm" },
  { id: "the-gunpowder", title: "Gunpowder", subtitle: "The Discovery That Changed Everything", category: "Military", readTime: "14 min", href: "/scrollytelling/the-gunpowder" },
  { id: "the-train", title: "The Train", subtitle: "Iron Horse of Industry", category: "Transportation", readTime: "13 min", href: "/scrollytelling/the-train" },
  { id: "the-invention-of-the-car", title: "The Automobile", subtitle: "A Sketch-Style Journey", category: "Transportation", readTime: "11 min", href: "/scrollytelling/the-invention-of-the-car" },
  { id: "the-invention-of-wine", title: "The Invention of Wine", subtitle: "8,000 Years in a Glass", category: "History", readTime: "11 min", href: "/scrollytelling/the-invention-of-wine" },
  { id: "the-pale-blue-dot", title: "The Pale Blue Dot", subtitle: "A Cosmic Perspective", category: "Space", readTime: "10 min", href: "/scrollytelling/the-pale-blue-dot" },
  { id: "the-deep-ocean", title: "The Deep Ocean", subtitle: "Earth's Final Frontier", category: "Science", readTime: "12 min", href: "/scrollytelling/the-deep-ocean" },
  { id: "language-death", title: "Language Death", subtitle: "The Silence of Extinction", category: "Linguistics", readTime: "9 min", href: "/scrollytelling/language-death" },
  { id: "who-invented-the-mirror", title: "The Mirror", subtitle: "8,000 Years of Reflection", category: "Material", readTime: "10 min", href: "/scrollytelling/who-invented-the-mirror" },
  { id: "who-invented-soda", title: "The Fizz", subtitle: "From Pharmacy to Phenomenon", category: "Food", readTime: "10 min", href: "/scrollytelling/who-invented-soda" },
  { id: "who-invented-the-sneaker", title: "The Sneaker Story", subtitle: "From Plimsolls to $75 Billion", category: "Fashion", readTime: "12 min", href: "/scrollytelling/who-invented-the-sneaker" },
  { id: "who-invented-high-heels", title: "The High Heels Story", subtitle: "500 Years of Elevation", category: "Fashion", readTime: "14 min", href: "/scrollytelling/who-invented-high-heels" },
  { id: "who-invented-the-bicycle", title: "The Bicycle Story", subtitle: "200 Years of Two Wheels", category: "Transportation", readTime: "10 min", href: "/scrollytelling/who-invented-the-bicycle" },
  { id: "who-invented-the-spoon", title: "The Spoon Story", subtitle: "30,000 Years of Essential Tools", category: "Material", readTime: "10 min", href: "/scrollytelling/who-invented-the-spoon" },
  { id: "who-invented-basketball", title: "The Basketball Story", subtitle: "From Peach Baskets to Global Culture", category: "Sports", readTime: "10 min", href: "/scrollytelling/who-invented-basketball" },
  { id: "who-invented-the-fork", title: "The Fork Story", subtitle: "4,000 Years of Revolution", category: "Material", readTime: "12 min", href: "/scrollytelling/who-invented-the-fork" },
];

interface ScrollytellingEndCardProps {
  currentStoryId: string;
  storyTitle: string;
}

/**
 * ScrollytellingEndCard - "What's Next" section at the end of each story
 * 
 * Design Philosophy:
 * - Full-viewport takeover signals story completion
 * - One featured "Next" story reduces decision paralysis
 * - 3 related suggestions as horizontal pills
 * - Escape hatch to "All Stories"
 * - Mobile-first, thumb-friendly design
 */
export default function ScrollytellingEndCard({
  currentStoryId,
  storyTitle,
}: ScrollytellingEndCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Get recommendations (exclude current story)
  const otherStories = allStories.filter(s => s.id !== currentStoryId);
  
  // Get current story index to find "next" story
  const currentIndex = allStories.findIndex(s => s.id === currentStoryId);
  const nextStory = otherStories[(currentIndex) % otherStories.length];
  
  // Get 3 random related stories (excluding next)
  const relatedStories = otherStories
    .filter(s => s.id !== nextStory?.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  useEffect(() => {
    // Animate in on mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!nextStory) return null;

  return (
    <section className={`endcard ${isVisible ? "visible" : ""}`}>
      <div className="endcard-content">
        {/* Completion Badge */}
        <div className="endcard-badge">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>Story Complete</span>
        </div>

        {/* Title */}
        <h2 className="endcard-title">
          You finished<br />
          <span className="endcard-story-name">{storyTitle}</span>
        </h2>

        {/* Next Story Card */}
        <Link href={nextStory.href} className="endcard-next">
          <span className="endcard-next-label">Up Next</span>
          <h3 className="endcard-next-title">{nextStory.title}</h3>
          <p className="endcard-next-subtitle">{nextStory.subtitle}</p>
          <div className="endcard-next-meta">
            <span className="endcard-next-time">{nextStory.readTime}</span>
            <span className="endcard-next-category">{nextStory.category}</span>
          </div>
          <div className="endcard-next-cta">
            <span>Start Reading</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Related Stories */}
        <div className="endcard-related">
          <span className="endcard-related-label">Or explore:</span>
          <div className="endcard-related-pills">
            {relatedStories.map(story => (
              <Link key={story.id} href={story.href} className="endcard-pill">
                {story.title}
              </Link>
            ))}
          </div>
        </div>

        {/* All Stories Link */}
        <Link href="/scrollytelling/" className="endcard-all">
          <span>Browse All Stories</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

