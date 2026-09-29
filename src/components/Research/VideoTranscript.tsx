"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { ChevronDown, Search, ArrowDown, X, AlignLeft } from "lucide-react";
import type { MuxPlayerElement } from "@mux/mux-player-react";
import { type TranscriptSegment, formatTimestamp } from "@/lib/transcripts";
import "./VideoTranscript.css";

type VideoTranscriptProps = {
  segments: TranscriptSegment[];
  /** Handle to the page's Mux player for click-to-seek and playback sync. */
  playerRef: RefObject<MuxPlayerElement | null>;
};

// How many lines the closed card previews, fading out under the header.
const PREVIEW_LINES = 3;

// Highlight search matches inside a segment without breaking SSR text content.
function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "ig"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="vt-mark">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/** "15 min" from the last segment's start, for the closed card's subtitle. */
function minutesLabel(seconds: number): string {
  return `${Math.max(1, Math.round(seconds / 60))} min`;
}

/**
 * Interactive video transcript, set as its own card under the player.
 *
 * Follows the Apple Podcasts / Mux interactive-transcript pattern: paragraphs
 * are tap-to-seek, the spoken segment is highlighted while others stay dimmed,
 * the panel auto-follows playback (pausing politely when the user scrolls),
 * and the text is searchable.
 *
 * Closed, it's an invitation rather than a flap: a serif "Read the transcript"
 * with the length and an Open button, over the first lines fading out. Styles
 * live in VideoTranscript.css and fall back to the brand hexes, so the card
 * reads the same inside and outside the publication's `.nl` scope.
 *
 * SEO contract: every segment is always in the DOM — the panel is hidden with
 * CSS when collapsed, never conditionally rendered — so the full transcript
 * ships in the statically exported HTML.
 */
export function VideoTranscript({ segments, playerRef }: VideoTranscriptProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isFollowing, setIsFollowing] = useState(true);
  const [query, setQuery] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const segmentEls = useRef<(HTMLDivElement | null)[]>([]);

  const matchCount = useMemo(() => {
    if (!query) return 0;
    const q = query.toLowerCase();
    return segments.filter((s) => s.text.toLowerCase().includes(q)).length;
  }, [query, segments]);

  // Track playback → active segment. Only wired while open so a closed
  // transcript costs nothing.
  useEffect(() => {
    if (!isOpen) return;
    const player = playerRef.current;
    if (!player) return;

    const onTimeUpdate = () => {
      const t = player.currentTime;
      let idx = -1;
      for (let i = 0; i < segments.length; i++) {
        if (segments[i].start <= t) idx = i;
        else break;
      }
      setActiveIndex(idx);
    };
    onTimeUpdate();
    player.addEventListener("timeupdate", onTimeUpdate);
    return () => player.removeEventListener("timeupdate", onTimeUpdate);
  }, [isOpen, segments, playerRef]);

  // Auto-follow: keep the active paragraph centered in the panel. Searching
  // suspends following so results don't scroll away under the reader.
  useEffect(() => {
    if (!isOpen || !isFollowing || query || activeIndex < 0) return;
    const panel = scrollRef.current;
    const el = segmentEls.current[activeIndex];
    if (!panel || !el) return;
    panel.scrollTo({
      top: el.offsetTop - panel.clientHeight / 2 + el.clientHeight / 2,
      behavior: "smooth",
    });
  }, [activeIndex, isFollowing, isOpen, query]);

  // User scroll intent (wheel/touch, not our programmatic scrolls) pauses
  // auto-follow; a "Back to current" pill restores it.
  useEffect(() => {
    if (!isOpen) return;
    const panel = scrollRef.current;
    if (!panel) return;
    const pause = () => setIsFollowing(false);
    panel.addEventListener("wheel", pause, { passive: true });
    panel.addEventListener("touchmove", pause, { passive: true });
    return () => {
      panel.removeEventListener("wheel", pause);
      panel.removeEventListener("touchmove", pause);
    };
  }, [isOpen]);

  if (segments.length === 0) return null;

  const seekTo = (seconds: number) => {
    const player = playerRef.current;
    if (!player) return;
    player.currentTime = seconds;
    void player.play();
    setIsFollowing(true);
    player.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const lastStart = segments[segments.length - 1].start;
  const totalLabel = formatTimestamp(lastStart);

  return (
    <section aria-label="Video transcript" className={`vt ${isOpen ? "is-open" : ""}`}>
      {/* ── Closed: an invitation, then the opening lines fading out ─────── */}
      <button
        type="button"
        className="vt-closed"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        hidden={isOpen}
      >
        <span className="vt-head">
          <span className="vt-icon" aria-hidden="true">
            <AlignLeft size={18} />
          </span>
          <span className="vt-head-text">
            <span className="vt-title">Read the transcript</span>
            <span className="vt-sub">
              {minutesLabel(lastStart)} · click any line to jump there
            </span>
          </span>
          <span className="vt-pill">
            Open <ChevronDown size={15} aria-hidden="true" />
          </span>
        </span>
        <span className="vt-preview" aria-hidden="true">
          {segments.slice(0, PREVIEW_LINES).map((s) => (
            <span key={s.start} className="vt-preview-line">
              <span className="vt-time">{formatTimestamp(s.start)}</span>
              <span className="vt-preview-text">{s.text}</span>
            </span>
          ))}
        </span>
      </button>

      {/* ── Open: header with search, then the reading panel ─────────────── */}
      <div className="vt-open" hidden={!isOpen}>
        <div className="vt-bar">
          <span className="vt-bar-title">
            <span className="vt-icon vt-icon--sm" aria-hidden="true">
              <AlignLeft size={15} />
            </span>
            Transcript
            <span className="vt-bar-len">{totalLabel}</span>
          </span>

          <span className="vt-bar-tools">
            {/* Search within the transcript (Apple Podcasts pattern). */}
            <label className="vt-search">
              <Search size={14} aria-hidden="true" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the transcript"
                aria-label="Search transcript"
              />
              {query && (
                <button type="button" className="vt-search-clear" onClick={() => setQuery("")} aria-label="Clear search">
                  <X size={13} />
                </button>
              )}
            </label>
            {query && (
              <span className={`vt-count ${matchCount > 0 ? "has-matches" : ""}`}>
                {matchCount} match{matchCount === 1 ? "" : "es"}
              </span>
            )}
            <button type="button" className="vt-pill" onClick={() => setIsOpen(false)} aria-label="Hide transcript">
              Close <ChevronDown size={15} className="vt-flip" aria-hidden="true" />
            </button>
          </span>
        </div>

        <div className="vt-panel-wrap">
          <div ref={scrollRef} className="vt-panel">
            <div className="vt-lines">
              {segments.map((segment, i) => {
                const isActive = i === activeIndex;
                const hasMatch = !!query && segment.text.toLowerCase().includes(query.toLowerCase());
                return (
                  <div
                    key={segment.start}
                    ref={(el) => {
                      segmentEls.current[i] = el;
                    }}
                    onClick={() => seekTo(segment.start)}
                    className={`vt-line ${isActive ? "is-active" : ""} ${query && !hasMatch ? "is-dim" : ""}`}
                  >
                    <button
                      type="button"
                      className="vt-time"
                      onClick={(e) => {
                        e.stopPropagation();
                        seekTo(segment.start);
                      }}
                      aria-label={`Jump to ${formatTimestamp(segment.start)}`}
                    >
                      {formatTimestamp(segment.start)}
                    </button>
                    <p className="vt-text">
                      <HighlightedText text={segment.text} query={query} />
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Soft edge fades so the scroll area reads as continuous prose. */}
          <div aria-hidden className="vt-fade vt-fade--top" />
          <div aria-hidden className="vt-fade vt-fade--bottom" />

          {/* Re-engage auto-follow after the reader scrolled away. */}
          {!isFollowing && activeIndex >= 0 && !query && (
            <button type="button" className="vt-back" onClick={() => setIsFollowing(true)}>
              <ArrowDown size={13} />
              Back to current
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
