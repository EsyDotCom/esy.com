# Mobile Scroll-Lock Disabled — "The Origin of Toy"

## Overview

This document records the decision and implementation to **disable scroll-lock behavior on mobile devices** for the hero section animation.

**Date:** December 2025
**Essay:** The Etymology of Play (the-origin-of-toy)
**Component:** `HeroSection` in `OriginOfToyClient.tsx`

---

## Architecture Note: Multiple Scroll-Lock Patterns

This essay uses **multiple independent scroll-lock implementations**:

| Section | Component | Scroll-Lock Pattern | Mobile Behavior |
|---------|-----------|---------------------|-----------------|
| Hero | `HeroSection` | CSS `position: sticky` + JS phases | **DISABLED** |
| Chapter 1 | `DictionaryArchaeology` | Inline scroll handler + `isPinned` | Active |
| Chapter 2 | `ShakespeareShuffle` | Inline scroll handler + `isPinned` | Active |
| Chapter 3 | `ChildhoodInvention` | Inline scroll handler + `isPinned` | Active |
| Chapter 4 | `ToymakerBench` | Inline scroll handler + `isPinned` | Active |
| Chapter 5 | `DepartmentStore` | Inline scroll handler + `isPinned` | Active |
| Chapter 6 | `WordBranches` | Inline scroll handler + `isPinned` | Active |
| Chapter 7 | `EtymologyReveal` | Inline scroll handler + `isPinned` | Active |

**Why multiple patterns?**
Each scroll-lock section has unique animation choreography (different progress calculations, phase timings, visual effects). Rather than a single generic hook, each component manages its own scroll state for precise control.

**Shared utility:**
The `useIsMobile()` hook (lines 49-68) provides mobile detection and can be reused by any component that needs to disable pinning on mobile.

**Note:** The `useScrollLock` hook at the top of the file is **not currently used** by any component. It was an earlier abstraction attempt. The actual scroll-lock behavior is implemented inline within each section component.

---

## Complete Fix Summary

The mobile fix required changes in **three layers**:

### Layer 1: CSS — Disable Sticky Positioning

**File:** `the-origin-of-toy.css` (lines 1082-1131)

```css
@media (max-width: 768px) {
  /* Remove sticky positioning - hero scrolls naturally */
  .origin-of-toy .hero-section .hero-content {
    position: relative;
    height: auto;
    min-height: 100vh;
  }

  /* Reduce hero section height - no need for 600vh scroll distance */
  .origin-of-toy .hero-section {
    height: auto !important; /* Override inline style */
    min-height: 100vh;
  }

  /* Show final state immediately */
  .origin-of-toy .hero-section .hero-background {
    opacity: 1 !important;
  }

  /* Show title immediately */
  .origin-of-toy .hero-section .essay-title-card {
    opacity: 1 !important;
  }

  /* Hide scroll-lock UI elements */
  .origin-of-toy .hero-section .skip-button,
  .origin-of-toy .hero-section .scroll-lock-progress,
  .origin-of-toy .hero-section .blocks-progress {
    display: none !important;
  }

  /* Hide header (back to essays + category) on mobile */
  .origin-of-toy .essay-header {
    display: none !important;
  }

  /* Hide intermediate animation states, show final word */
  .origin-of-toy .hero-section .modern-word {
    display: none;
  }

  .origin-of-toy .hero-section .medieval-word {
    opacity: 1 !important;
    position: relative;
    transform: none;
  }

  /* Hide floating definitions on mobile */
  .origin-of-toy .hero-section .floating-definitions {
    display: none;
  }
}
```

**Why CSS matters:**
The actual viewport pinning was done via `position: sticky` in CSS, not JavaScript. Without this CSS fix, the hero would still pin on mobile regardless of JS changes.

---

### Layer 2: JavaScript — Skip Animation Phases

**File:** `OriginOfToyClient.tsx`

#### A. Mobile Detection Hook (lines 49-68)

```tsx
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isNarrowViewport = window.innerWidth < 768;
      const hasTouchCapability = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isNarrowViewport || (hasTouchCapability && window.innerWidth < 1024));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};
```

#### B. HeroSection Uses Mobile Detection (line 291)

```tsx
const isMobile = useIsMobile();
```

#### C. Skip Pinning on Mobile (lines 313-327)

```tsx
// MOBILE: Skip pinning entirely - page scrolls naturally
if (isMobile) {
  setIsPinned(false);
  // Still track progress for any visual effects
  // ...
  return;
}
```

#### D. Skip Animation Phases on Mobile (lines 365-384)

```tsx
// MOBILE: Skip all phases, show final state immediately
const phase1 = !isMobile && scrollProgress >= 0 && scrollProgress < 10;
const phase2 = !isMobile && scrollProgress >= 10 && scrollProgress < 25;
const phase3 = !isMobile && scrollProgress >= 25 && scrollProgress < 45;
const phase4 = !isMobile && scrollProgress >= 45 && scrollProgress < 65;
const phase5 = !isMobile && scrollProgress >= 65 && scrollProgress < 82;
const phase6 = isMobile || scrollProgress >= 82;  // ALWAYS true on mobile

const wordVisible = !isMobile;  // Hidden on mobile
const titleVisible = isMobile || scrollProgress >= 82;  // ALWAYS visible on mobile
```

#### E. Force Full Opacity on Mobile (lines 410-416)

```tsx
// Title card - MOBILE: Always fully visible
const titleOpacity = isMobile ? 1 : (titleVisible ? Math.min(1, (scrollProgress - 82) / 15) : 0);

// Background - MOBILE: Always fully visible
const backgroundOpacity = isMobile ? 1 : Math.min(1, 0.15 + (scrollProgress / 25) * 0.85);
```

---

### Layer 3: UI Elements Hidden

On mobile, these elements are hidden:
- **Essay header** — "Back to Essays" link + "History" category badge
- **Skip button** — Not needed since there's no animation
- **Progress bar** — Not needed since there's no scroll-lock
- **Blocks progress** — Building blocks indicator
- **Modern word** — "TOY" that transforms
- **Floating definitions** — Swirling annotations
- **Medieval word transform** — Shown statically instead

---

## What Mobile Users See

| Element | Desktop | Mobile |
|---------|---------|--------|
| Header (back link) | Visible, fixed | **Hidden** |
| Hero height | 600vh (scroll distance) | 100vh (single screen) |
| Position | `sticky` (pins to viewport) | `relative` (scrolls normally) |
| Word animation | 6-phase transformation | **Skipped** |
| Title card | Fades in at 82% | **Immediately visible** |
| Background | Fades in gradually | **Immediately visible** |
| Skip button | Visible during animation | **Hidden** |
| Progress bar | Shows completion % | **Hidden** |

---

## How to Revert

### Full Revert (restore mobile animation)

1. **Remove CSS media query** in `the-origin-of-toy.css`:
   - Delete lines 1082-1131 (the `@media (max-width: 768px)` block for hero)

2. **Remove mobile checks in JS** in `OriginOfToyClient.tsx`:
   - Line 291: Remove `const isMobile = useIsMobile();`
   - Lines 313-327: Remove the `if (isMobile)` early return block
   - Lines 365-384: Remove `!isMobile &&` prefixes from phase calculations
   - Lines 410-416: Remove `isMobile ? 1 :` ternary prefixes

3. **Keep the `useIsMobile` hook** — other components might use it later

### Partial Revert (show header only)

Remove only this CSS rule:
```css
.origin-of-toy .essay-header {
  display: none !important;
}
```

### Partial Revert (allow animation, keep short height)

Keep the CSS height override but remove phase skipping in JS.

---

## Files Changed

| File | Change |
|------|--------|
| `OriginOfToyClient.tsx` | Added `useIsMobile` hook, mobile detection in `HeroSection`, phase skipping, opacity overrides |
| `the-origin-of-toy.css` | Added mobile media query to disable sticky, hide elements, show final state |
| `Fixes/mobile-scroll-lock-disabled.md` | This documentation |

---

## Git Commits

```
4af1568 Disable hero scroll-lock on mobile for the-origin-of-toy essay
4fb2fb8 Fix: disable hero scroll-lock pinning on mobile (HeroSection component)
d50ea6e Document multiple scroll-lock patterns in the-origin-of-toy essay
a849304 Fix: disable hero scroll-lock on mobile via CSS (position:sticky was the issue)
152cc27 Fix: show title card immediately on mobile (skip animation phases)
d64af9c Hide essay header on mobile for the-origin-of-toy
```

---

## Testing Checklist

- [ ] **Desktop Chrome** — Full animation works, all phases visible
- [ ] **Desktop Firefox** — Full animation works
- [ ] **Desktop Safari** — Full animation works
- [ ] **Mobile Chrome (Android)** — Title visible immediately, no animation, no header
- [ ] **Mobile Safari (iOS)** — Title visible immediately, no animation, no header
- [ ] **iPad (Portrait)** — Static hero (touch + width < 1024)
- [ ] **iPad (Landscape)** — Full animation (width >= 1024)
- [ ] **Window resize** — Behavior updates when crossing 768px breakpoint

---

## Related Documentation

- `scroll-lock-pinning-fixes.md` — Fixes for pinned content during scroll-lock
- `sticky-position-fixes.md` — Fixes for sticky positioning in hero
- `/docs/front-end/SCROLL_PATTERNS.md` — Global scroll pattern reference

---

*Pattern established: Disable scroll-lock on mobile for all visual essays with this pattern.*
