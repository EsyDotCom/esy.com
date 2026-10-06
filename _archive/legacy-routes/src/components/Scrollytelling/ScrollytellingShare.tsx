"use client";

import React, { useState, useEffect, useCallback } from "react";

interface ScrollytellingShareProps {
  title: string;
  description?: string;
  url?: string;
  showAfterScroll?: number;
}

/**
 * ScrollytellingShare - World-class social sharing widget
 * 
 * Design Philosophy:
 * - Top-right placement to avoid conflict with progress bars (typically left/bottom)
 * - Minimal initial footprint: single share icon
 * - Elegant expansion with branded social icons
 * - Glass-morphism with subtle backdrop blur
 * - Horizontal layout for minimal vertical intrusion
 */
export default function ScrollytellingShare({
  title,
  description = "",
  url,
  showAfterScroll = 0.05,
}: ScrollytellingShareProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(url || window.location.href);
  }, [url]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / scrollHeight;
      setIsVisible(progress > showAfterScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfterScroll]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".st-share")) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isExpanded]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [shareUrl]);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedDesc = encodeURIComponent(description);

  return (
    <>
      <style jsx>{`
        /* ==========================================
           SCROLLYTELLING SHARE - World Class Design
           ==========================================
           
           Position: Top-right corner
           - Avoids left-side progress bars (depth meters, etc.)
           - Avoids bottom progress indicators
           - Clear of scroll-to-top buttons
           
           Design: Horizontal expansion
           - Minimal vertical footprint
           - Branded social icons with hover states
           - Glass-morphism aesthetic
        */
        
        .st-share {
          position: fixed;
          top: 5rem;
          right: 1.5rem;
          z-index: 80;
          display: flex;
          align-items: center;
          gap: 0;
          opacity: 0;
          transform: translateX(20px);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .st-share.visible {
          opacity: 1;
          transform: translateX(0);
          pointer-events: auto;
        }

        /* Trigger Button */
        .st-share-trigger {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: rgba(255, 255, 255, 0.9);
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          position: relative;
          z-index: 10;
        }

        .st-share-trigger:hover {
          background: rgba(0, 0, 0, 0.75);
          transform: scale(1.05);
        }

        .st-share-trigger svg {
          width: 18px;
          height: 18px;
          transition: transform 0.3s ease;
        }

        .st-share.expanded .st-share-trigger {
          border-radius: 20px 0 0 20px;
        }

        .st-share.expanded .st-share-trigger svg {
          transform: rotate(90deg);
        }

        /* Expanded Panel */
        .st-share-panel {
          display: flex;
          align-items: center;
          gap: 0;
          height: 40px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 0 20px 20px 0;
          overflow: hidden;
          width: 0;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          margin-left: -1px;
        }

        .st-share.expanded .st-share-panel {
          width: 200px;
          opacity: 1;
          padding: 0 8px 0 4px;
        }

        /* Social Icons */
        .st-share-icon {
          width: 36px;
          height: 36px;
          border-radius: 18px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          color: rgba(255, 255, 255, 0.8);
          transition: all 0.25s ease;
          text-decoration: none;
          flex-shrink: 0;
        }

        .st-share-icon:hover {
          transform: scale(1.1);
        }

        .st-share-icon svg {
          width: 18px;
          height: 18px;
        }

        /* Branded Colors on Hover */
        .st-share-icon.twitter:hover {
          color: #fff;
          background: #000;
        }

        .st-share-icon.facebook:hover {
          color: #fff;
          background: #1877f2;
        }

        .st-share-icon.linkedin:hover {
          color: #fff;
          background: #0a66c2;
        }

        .st-share-icon.copy:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.2);
        }

        .st-share-icon.copy.copied {
          color: #22c55e;
        }

        /* Divider */
        .st-share-divider {
          width: 1px;
          height: 20px;
          background: rgba(255, 255, 255, 0.15);
          margin: 0 2px;
          flex-shrink: 0;
        }

        /* Label */
        .st-share-label {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          white-space: nowrap;
          padding-right: 4px;
          opacity: 0;
          transition: opacity 0.3s ease 0.1s;
        }

        .st-share.expanded .st-share-label {
          opacity: 1;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .st-share {
            top: auto;
            bottom: 1.5rem;
            right: 1rem;
          }

          .st-share.expanded .st-share-panel {
            width: 180px;
          }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .st-share,
          .st-share-trigger,
          .st-share-panel,
          .st-share-icon {
            transition: none;
          }
        }
      `}</style>

      <div className={`st-share ${isVisible ? "visible" : ""} ${isExpanded ? "expanded" : ""}`}>
        <button
          className="st-share-trigger"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Close share menu" : "Share this story"}
          title="Share"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isExpanded ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </>
            )}
          </svg>
        </button>

        <div className="st-share-panel">
          {/* X/Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="st-share-icon twitter"
            aria-label="Share on X"
            title="Share on X"
            onClick={() => setIsExpanded(false)}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="st-share-icon facebook"
            aria-label="Share on Facebook"
            title="Share on Facebook"
            onClick={() => setIsExpanded(false)}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="st-share-icon linkedin"
            aria-label="Share on LinkedIn"
            title="Share on LinkedIn"
            onClick={() => setIsExpanded(false)}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          <div className="st-share-divider" />

          {/* Copy Link */}
          <button
            className={`st-share-icon copy ${copied ? "copied" : ""}`}
            onClick={handleCopyLink}
            aria-label={copied ? "Link copied!" : "Copy link"}
            title={copied ? "Copied!" : "Copy link"}
          >
            {copied ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
