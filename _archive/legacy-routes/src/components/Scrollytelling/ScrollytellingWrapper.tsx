"use client";

import React from "react";
import ScrollytellingShare from "./ScrollytellingShare";

interface ScrollytellingWrapperProps {
  children: React.ReactNode;
  /**
   * Story title for sharing
   */
  title: string;
  /**
   * Story description for sharing
   */
  description?: string;
}

/**
 * ScrollytellingWrapper - Wraps scrollytelling pages with share functionality
 * 
 * Usage in page.tsx:
 * ```tsx
 * import ScrollytellingWrapper from "@/components/Scrollytelling/ScrollytellingWrapper";
 * import MyStoryClient from "./MyStoryClient";
 * 
 * export default function MyStoryPage() {
 *   return (
 *     <ScrollytellingWrapper
 *       title="My Story Title"
 *       description="Story description for sharing"
 *     >
 *       <MyStoryClient />
 *     </ScrollytellingWrapper>
 *   );
 * }
 * ```
 */
export default function ScrollytellingWrapper({
  children,
  title,
  description = "",
}: ScrollytellingWrapperProps) {
  return (
    <>
      {children}
      <ScrollytellingShare
        title={title}
        description={description}
        showAfterScroll={0.05}
      />
    </>
  );
}

