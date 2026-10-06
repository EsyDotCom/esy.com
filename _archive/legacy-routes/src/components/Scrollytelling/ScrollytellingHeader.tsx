"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

/**
 * ScrollytellingHeader - World-class minimal header for immersive stories
 * 
 * Design Philosophy (Mobile-First):
 * - Uses same Logo component as main navigation for pixel-perfect consistency
 * - Transparent by default, elegant frosted glass on scroll
 * - Proper safe area handling for notches and status bars
 * - Links to scrollytelling index (not home)
 * 
 * Consistency:
 * - Uses the SAME Logo component as main navigation
 * - Matches padding breakpoints: 1rem → 1.5rem → 2rem
 * - Logo size and positioning identical to main nav
 */
export default function ScrollytellingHeader() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style jsx>{`
        .st-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 90;
          
          /* Safe area: respect notch/status bar */
          padding-top: env(safe-area-inset-top, 0px);
          
          /* Content container - matches .nav-inner exactly */
          display: flex;
          align-items: center;
          
          /* Match main nav: Mobile padding */
          padding: 0.75rem 1rem;
          padding-top: calc(0.75rem + env(safe-area-inset-top, 0px));
          
          background: transparent;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Frosted glass state on scroll */
        .st-header.scrolled {
          background: rgba(10, 10, 12, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Logo link wrapper */
        .st-header-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        /* Tablet: match main nav padding */
        @media (min-width: 769px) {
          .st-header {
            padding: 1rem;
            padding-top: calc(1rem + env(safe-area-inset-top, 0px));
          }
        }

        /* Medium screens: match main nav */
        @media (min-width: 1024px) {
          .st-header {
            padding: 1rem 1.5rem;
            padding-top: calc(1rem + env(safe-area-inset-top, 0px));
          }
        }

        /* Large screens: match main nav */
        @media (min-width: 1280px) {
          .st-header {
            padding: 1rem 2rem;
            padding-top: calc(1rem + env(safe-area-inset-top, 0px));
          }
        }

        /* Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          .st-header {
            transition: none;
          }
        }
      `}</style>

      <header className={`st-header ${hasScrolled ? "scrolled" : ""}`}>
        <Link href="/scrollytelling/" className="st-header-logo" aria-label="Back to Stories">
          <Logo 
            suffix="" 
            href="" 
            showText={false} 
            theme="dark"
            size={60}
          />
        </Link>
      </header>
    </>
  );
}

