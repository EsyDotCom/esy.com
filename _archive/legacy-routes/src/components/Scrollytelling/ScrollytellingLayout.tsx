"use client";

import React from "react";
import ScrollytellingTheatreBar from "./ScrollytellingTheatreBar";
import ScrollytellingEndCard from "./ScrollytellingEndCard";
import "./scrollytelling-layout.css";

interface ScrollytellingLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  readTime?: string;
  storyId?: string; // For EndCard recommendations
}

/**
 * SCROLLYTELLING LAYOUT
 * =====================
 * 
 * App-like wrapper for immersive scrollytelling experiences.
 * Provides consistent header, footer, and end card across all story pages.
 * 
 * Anatomy (Mobile-First):
 * ┌─────────────────────────────────────────────┐
 * │ [Logo]                          (Header)    │  48px mobile / 56px desktop
 * ├─────────────────────────────────────────────┤
 * │                                             │
 * │           Story Content Area                │  Full viewport minus bars
 * │         (scrolls independently)             │
 * │                                             │
 * ├─────────────────────────────────────────────┤
 * │                                             │
 * │           End Card (What's Next)            │  Full viewport
 * │     - Featured next story                   │
 * │     - Related story pills                   │
 * │     - Browse all stories                    │
 * │                                             │
 * ├─────────────────────────────────────────────┤
 * │ ← Back │ ███░░░ 100% │ Share ↗  (Footer)   │  52px mobile / 56px desktop
 * └─────────────────────────────────────────────┘
 * 
 * Design Philosophy:
 * - App-like immersive experience
 * - No traditional site navigation during story
 * - Logo links back to scrollytelling index
 * - Theatre Bar provides all actions (back, progress, share)
 * - End Card promotes story discovery
 * - Mobile-first: thumb-reachable actions at bottom
 * 
 * Usage:
 * ```tsx
 * <ScrollytellingLayout
 *   title="Story Title"
 *   description="Brief description for sharing"
 *   readTime="12 min"
 *   storyId="the-story-slug"
 * >
 *   <YourStoryClient />
 * </ScrollytellingLayout>
 * ```
 */
export default function ScrollytellingLayout({
  children,
  title,
  description = "",
  readTime,
  storyId,
}: ScrollytellingLayoutProps) {
  return (
    <div className="scrollytelling-layout">
      {/* Story Content - Full immersion, no header */}
      <div className="scrollytelling-content">
        {children}
      </div>
      
      {/* End Card - What's Next (only if storyId provided) */}
      {storyId && (
        <ScrollytellingEndCard
          currentStoryId={storyId}
          storyTitle={title}
        />
      )}
      
      {/* Theatre Bar Footer - Back, Progress, Share */}
      <ScrollytellingTheatreBar
        title={title}
        description={description}
        readTime={readTime}
      />
    </div>
  );
}

