# Scroll-Lock Pinning Fixes — "The Origin of Toy"

## Overview

This document records the fixes applied to make `DictionaryArchaeology` and `ShakespeareShuffle` components properly pin during their scroll-lock sequences.

**Date:** December 2025  
**Essay:** The Etymology of Play (the-origin-of-toy)

---

## Issues Fixed

### Issue #1: Missing Scroll-Lock Pinning

**Components Affected:** `DictionaryArchaeology`, `ShakespeareShuffle`

**Problem:** These scroll-lock sections were scroll-progress-animated but **NOT pinned**. The content scrolled normally with the page instead of locking the viewport during the animation sequence.

**Root Cause:** 
1. Missing `isPinned` state tracking
2. Missing `pinned-content` wrapper with `is-pinned` class
3. Missing CSS for `position: fixed` when pinned
4. Components were placed INSIDE ChapterSection (which has CSS transforms that break fixed positioning)

**Before:**
```tsx
// No isPinned state
const [scrollProgress, setScrollProgress] = useState(0);

// No pinning logic - just calculates progress
return (
  <div ref={containerRef} className="dictionary-archaeology">
    {/* Content scrolls away with page */}
  </div>
);
```

**After:**
```tsx
const [scrollProgress, setScrollProgress] = useState(0);
const [isPinned, setIsPinned] = useState(false);

// Proper scroll-lock pinning logic
if (rect.top <= 0 && scrolledIntoSection <= scrollableDistance) {
  setIsPinned(true);
  // Calculate progress only while pinned
} else {
  setIsPinned(false);
}

return (
  <div ref={containerRef} className="dictionary-archaeology" style={{ height: "300vh" }}>
    <div className={`pinned-content ${isPinned ? "is-pinned" : ""}`}>
      {/* Content locks to viewport during sequence */}
    </div>
  </div>
);
```

---

### Issue #2: Components Inside Transformed ChapterSection

**Problem:** `DictionaryArchaeology` and `ShakespeareShuffle` were rendered inside `<ChapterSection>` components, which use CSS transforms for entrance animations. CSS transforms break `position: fixed`.

**Before:**
```tsx
<ChapterSection chapter={1} title="The Medieval Toye" ...>
  {/* Content */}
  <DictionaryArchaeology /> {/* ❌ Inside transformed parent */}
</ChapterSection>
```

**After:**
```tsx
<ChapterSection chapter={1} title="The Medieval Toye" ...>
  {/* Content before scroll-lock */}
</ChapterSection>

{/* Scroll-Lock: OUTSIDE section to avoid transform conflicts */}
<DictionaryArchaeology />

{/* Chapter 1 continued after scroll-lock */}
<div className="chapter-continued" style={{ transform: "none" }} />
```

---

## CSS Added

```css
/* Dictionary Archaeology */
.dictionary-archaeology .pinned-content {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  /* Center all content vertically */
  gap: var(--toy-space-xs);  /* Tight gap to fit 5 cards */
  padding: var(--toy-space-sm) var(--toy-space-md);
  background: var(--toy-bg-primary);
}

.dictionary-archaeology .pinned-content.is-pinned {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;  /* Must set height when fixed */
  z-index: 50;    /* High enough to be above other content */
  background: var(--toy-bg-primary);  /* Must have background */
}

/* Exit transition - content scrolls naturally */
.dictionary-archaeology .pinned-content.is-exiting {
  background: var(--toy-bg-primary);
}

/* Shakespeare Shuffle (identical pattern) */
.shakespeare-shuffle .pinned-content { ... }
.shakespeare-shuffle .pinned-content.is-pinned { ... }
```

---

## Issue #3: Exit Transition Abrupt Disappearance

**Problem:** When scroll-lock sequence completes, content abruptly disappears instead of smoothly scrolling away.

**Root Cause:** Switching from `position: fixed` to `position: relative` causes content to jump to top of its container (off-screen).

**Solution:** Add `isExiting` and `unpinPoint` states. When exiting, use `position: absolute` at the unpin point.

```tsx
const [isExiting, setIsExiting] = useState(false);
const [unpinPoint, setUnpinPoint] = useState(0);

// In scroll handler:
} else if (scrolledIntoSection >= scrollableDistance && rect.top <= 0) {
  // Exiting - scrolled past the section
  setIsPinned(false);
  setIsExiting(true);
  setUnpinPoint(scrollableDistance);
  setScrollProgress(100);
}

// In JSX:
<div 
  className={`pinned-content ${isPinned ? "is-pinned" : ""} ${isExiting ? "is-exiting" : ""}`}
  style={isExiting ? {
    position: "absolute",
    top: `${unpinPoint}px`,
    left: 0,
    right: 0,
    height: "100vh",
  } : undefined}
>
```

---

## Issue #4: Content Cutoff (5 Cards Don't Fit in Viewport)

**Problem:** Only 3-4 dictionary layers visible instead of all 5. First card (Modern 2024) cut off at top.

**Root Cause:** 
1. Gaps too large between cards
2. Card padding too large
3. Font sizes too large
4. With `justify-content: center`, content overflows both edges

**Solution:** Compact everything so all 5 cards + header + footer fit in 100vh.

```css
/* Tight gaps */
.dictionary-layers {
  gap: 6px;
}

/* Compact cards */
.dict-layer {
  padding: 8px 16px;
}

/* Smaller fonts */
.layer-word {
  font-size: 1.4rem;
  margin: 2px 0;
}

.layer-def {
  font-size: 0.9rem;
  line-height: 1.3;
}

/* Compact header/footer */
.archaeology-label {
  font-size: 0.7rem;
  margin-bottom: 0.25rem;
}

.archaeology-footer {
  padding-top: 8px;
}
```

---

## Issue #5: Footer Text Behind Cards

**Problem:** "The original meaning revealed..." text appeared BEHIND the dictionary layer cards instead of below them.

**Root Cause:** Cards had inline z-index but footer had no z-index.

**Solution:** Add position and z-index to footer.

```css
.archaeology-footer {
  position: relative;
  z-index: 10;  /* Above all cards */
}
```

---

## Files Touched

- `src/app/essays/the-origin-of-toy/OriginOfToyClient.tsx`
  - Added `isPinned`, `isExiting`, `unpinPoint` states
  - Wrapped content in `pinned-content` div with conditional styling
  - Moved components outside ChapterSection
  - Added skip buttons and progress bars
  
- `src/app/essays/the-origin-of-toy/the-origin-of-toy.css`
  - Added `.pinned-content`, `.is-pinned`, `.is-exiting` styles
  - Compacted card padding, gaps, and font sizes
  - Added z-index to footer

---

## Verification Checklist

- [x] `DictionaryArchaeology` pins to viewport when reached
- [x] `DictionaryArchaeology` shows skip button and progress bar
- [x] **All 5** dictionary layers visible (Modern → Medieval)
- [x] Footer text visible below cards (not behind)
- [x] Smooth exit transition (scrolls away naturally)
- [x] Viewport releases when sequence completes
- [x] `ShakespeareShuffle` pins to viewport when reached
- [x] Folio cards reveal and spread during sequence
- [x] Conclusion text appears at end of sequence
- [x] No empty headings or broken structure after fixes

---

## Related Fixes

- `sticky-position-fixes.md` — Fixes for `overflow-x: hidden` breaking `position: sticky` in hero
- `/docs/front-end/STICKY_POSITION_FIXES.md` — Global reference for sticky/fixed positioning issues

---

*This follows the same pattern established in "The Word Pussy" essay's `scroll-lock-fixes.md`*

