"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

interface ScrollytellingTheatreBarProps {
  title: string;
  description?: string;
  readTime?: string;
  backHref?: string;
  backLabel?: string;
}

/**
 * ScrollytellingTheatreBar - Elegant fixed bottom bar for scrollytelling
 * 
 * Design Philosophy (UI/UX + Immersive Experience):
 * - Hidden at top of page — appears on scroll (non-intrusive)
 * - Taller height for comfortable breathing room
 * - Smooth slide-up animation on reveal
 * - All actions within natural thumb reach
 * - Clean, uncluttered with proper safe area padding
 * 
 * Behavior:
 * - Hidden when scrollY < 100px (let hero breathe)
 * - Slides up smoothly when user scrolls
 * - Stays visible once revealed until user returns to top
 * 
 * Anatomy:
 * ┌──────────────────────────────────────────────────────────────┐
 * │                                                              │
 * │  ← Stories       ████░░░░░  42%  •  10 min          Share   │
 * │                                                              │
 * └──────────────────────────────────────────────────────────────┘
 */
export default function ScrollytellingTheatreBar({
  title,
  description = "",
  readTime,
  backHref = "/scrollytelling",
  backLabel = "Stories",
}: ScrollytellingTheatreBarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true); // Show immediately since header is removed
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((window.scrollY / scrollHeight) * 100, 100);
      setScrollProgress(progress);
      // Always visible now - no threshold needed
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close share panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".theatre-share-area")) {
        setIsShareOpen(false);
      }
    };

    if (isShareOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isShareOpen]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsShareOpen(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [shareUrl]);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);

  return (
    <>
      <style jsx>{`
        /* ==========================================
           THEATRE BAR — Scroll-Reveal Edition
           Hidden at top, slides up on scroll
           More height for breathing room
           ==========================================*/
        
        .theatre-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 100;
          
          /* INCREASED HEIGHT — More breathing room */
          /* Mobile: 64px, Tablet: 68px, Desktop: 72px */
          height: calc(64px + env(safe-area-inset-bottom, 0px));
          padding-bottom: env(safe-area-inset-bottom, 0px);
          
          /* Flex layout */
          display: flex;
          align-items: center;
          justify-content: space-between;
          
          /* Safe edge padding */
          padding-left: max(1.25rem, env(safe-area-inset-left, 1.25rem));
          padding-right: max(1.25rem, env(safe-area-inset-right, 1.25rem));
          
          /* Elegant frosted glass */
          background: rgba(10, 10, 12, 0.94);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          
          /* SCROLL REVEAL — Hidden by default, slides up */
          transform: translateY(100%);
          opacity: 0;
          transition: 
            transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.3s ease;
        }

        /* Visible state — slides up into view */
        .theatre-bar.visible {
          transform: translateY(0);
          opacity: 1;
        }

        /* Progress Line — Subtle gradient */
        .theatre-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%);
          transition: width 0.15s ease-out;
          border-radius: 0 1px 1px 0;
        }

        /* ==========================================
           LOGO LINK — Clean, minimal home navigation
           ==========================================*/
        .theatre-logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          cursor: pointer;
          transition: opacity 0.2s ease, transform 0.2s ease;
          opacity: 0.9;
        }

        .theatre-logo-link:hover {
          opacity: 1;
          transform: scale(1.02);
        }

        .theatre-logo-link:active {
          transform: scale(0.98);
        }

        /* ==========================================
           CENTER — Progress info (larger, more readable)
           ==========================================*/
        .theatre-center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
          font-size: 0.8125rem;
          font-weight: 500;
          font-variant-numeric: tabular-nums;
        }

        .theatre-progress-text {
          min-width: 36px;
          text-align: right;
        }

        .theatre-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
        }

        .theatre-read-time {
          color: rgba(255, 255, 255, 0.4);
        }

        /* ==========================================
           SHARE BUTTON — Larger, more comfortable
           ==========================================*/
        .theatre-share-area {
          position: relative;
          display: flex;
          align-items: center;
        }

        .theatre-share-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          min-height: 44px; /* iOS touch target */
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.9);
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .theatre-share-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.15);
          color: #fff;
        }

        .theatre-share-btn:active {
          transform: scale(0.98);
        }

        .theatre-share-btn svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        /* ==========================================
           SHARE PANEL — Elegant dropdown
           ==========================================*/
        .theatre-share-panel {
          position: absolute;
          bottom: calc(100% + 12px);
          right: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 8px;
          min-width: 180px;
          background: rgba(24, 24, 28, 0.98);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          box-shadow: 
            0 -4px 24px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset;
          opacity: 0;
          transform: translateY(8px) scale(0.96);
          pointer-events: none;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .theatre-share-panel.open {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        /* Share Options */
        .theatre-share-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 10px;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.9);
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.15s ease;
          text-align: left;
          width: 100%;
        }

        .theatre-share-option:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .theatre-share-option:active {
          background: rgba(255, 255, 255, 0.12);
        }

        .theatre-share-option svg {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        /* Branded icon colors */
        .theatre-share-option.twitter svg { color: #fff; }
        .theatre-share-option.facebook svg { color: #1877f2; }
        .theatre-share-option.linkedin svg { color: #0a66c2; }
        .theatre-share-option.copy svg { color: rgba(255, 255, 255, 0.6); }
        
        .theatre-share-option.copy.copied {
          color: #22c55e;
        }
        .theatre-share-option.copy.copied svg {
          color: #22c55e;
        }

        /* ==========================================
           RESPONSIVE
           ==========================================*/
        @media (max-width: 480px) {
          .theatre-bar {
            height: calc(60px + env(safe-area-inset-bottom, 0px));
            padding-left: max(0.75rem, env(safe-area-inset-left, 0.75rem));
            padding-right: max(1rem, env(safe-area-inset-right, 1rem));
          }

          .theatre-logo-link :global(img),
          .theatre-logo-link :global(svg) {
            height: 36px !important;
            width: auto !important;
          }

          .theatre-share-btn {
            padding: 0.5rem 0.875rem;
            font-size: 0.875rem;
          }

          .theatre-share-btn svg {
            width: 16px;
            height: 16px;
          }

          .theatre-center {
            font-size: 0.75rem;
            gap: 0.5rem;
          }

          .theatre-read-time {
            display: none;
          }

          .theatre-dot {
            display: none;
          }

          .theatre-share-panel {
            right: 0;
            min-width: 160px;
          }
        }

        /* Tablet+ */
        @media (min-width: 768px) {
          .theatre-bar {
            height: calc(68px + env(safe-area-inset-bottom, 0px));
            padding-left: max(1.5rem, env(safe-area-inset-left, 1.5rem));
            padding-right: max(1.5rem, env(safe-area-inset-right, 1.5rem));
          }

          .theatre-share-btn {
            padding: 0.75rem 1.25rem;
          }

          .theatre-share-panel {
            min-width: 200px;
          }
        }

        /* Desktop */
        @media (min-width: 1024px) {
          .theatre-bar {
            height: calc(72px + env(safe-area-inset-bottom, 0px));
            padding-left: 2.5rem;
            padding-right: 2.5rem;
          }
        }

        /* ==========================================
           REDUCED MOTION
           ==========================================*/
        @media (prefers-reduced-motion: reduce) {
          .theatre-bar {
            transition: opacity 0.15s ease;
          }
          
          .theatre-bar:not(.visible) {
            transform: translateY(0);
            opacity: 0;
            pointer-events: none;
          }
          
          .theatre-logo-link,
          .theatre-share-btn,
          .theatre-share-panel,
          .theatre-share-option,
          .theatre-progress {
            transition: none;
          }
          
          .theatre-logo-link:active,
          .theatre-share-btn:active {
            transform: none;
          }
        }
      `}</style>

      <div className={`theatre-bar ${isVisible ? "visible" : ""}`}>
        {/* Progress Line */}
        <div 
          className="theatre-progress" 
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Logo — Links back to Stories */}
        <Link href={backHref} className="theatre-logo-link" aria-label="Back to Stories">
          <Logo 
            suffix="" 
            href="" 
            wordmarkOnly
            wordmarkFont="blackops"
            theme="dark"
            size={48}
          />
        </Link>

        {/* Center — Progress & Read Time */}
        <div className="theatre-center">
          <span className="theatre-progress-text">{Math.round(scrollProgress)}%</span>
          {readTime && (
            <>
              <span className="theatre-dot" />
              <span className="theatre-read-time">{readTime}</span>
            </>
          )}
        </div>

        {/* Share Area */}
        <div className="theatre-share-area">
          <button
            className="theatre-share-btn"
            onClick={() => setIsShareOpen(!isShareOpen)}
            aria-label="Share this story"
            aria-expanded={isShareOpen}
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
            <span className="theatre-share-label">Share</span>
          </button>

          {/* Share Panel */}
          <div 
            className={`theatre-share-panel ${isShareOpen ? "open" : ""}`}
            role="menu"
            aria-hidden={!isShareOpen}
          >
            {/* X/Twitter */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="theatre-share-option twitter"
              onClick={() => setIsShareOpen(false)}
              role="menuitem"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>X</span>
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="theatre-share-option facebook"
              onClick={() => setIsShareOpen(false)}
              role="menuitem"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </a>

            {/* LinkedIn */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="theatre-share-option linkedin"
              onClick={() => setIsShareOpen(false)}
              role="menuitem"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>LinkedIn</span>
            </a>

            {/* Copy Link */}
            <button
              className={`theatre-share-option copy ${copied ? "copied" : ""}`}
              onClick={handleCopyLink}
              role="menuitem"
            >
              {copied ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
              <span>{copied ? "Copied!" : "Copy link"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
