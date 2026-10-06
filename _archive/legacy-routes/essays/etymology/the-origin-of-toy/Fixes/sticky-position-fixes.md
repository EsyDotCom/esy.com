# Sticky Position Fixes — The Origin of Toy

## Overview

This document records the fixes applied to resolve `position: sticky` not working in the hero scroll-lock section.

**Date:** December 2025  
**Essay:** The Etymology of Play (the-origin-of-toy)

---

## Issues Fixed

### Issue #1: `overflow-x: hidden` Breaking Sticky

**File:** `the-origin-of-toy.css`  
**Line:** ~69-76

**Problem:** The `.origin-of-toy` container had `overflow-x: hidden`, which creates a scrolling context and breaks `position: sticky` on all descendants.

**Before:**
```css
.origin-of-toy {
  min-height: 100dvh;
  background: var(--toy-bg-primary);
  color: var(--toy-text-primary);
  font-family: var(--toy-font-serif);
  overflow-x: hidden;  /* ❌ BREAKS STICKY */
  line-height: 1.7;
}
```

**After:**
```css
.origin-of-toy {
  min-height: 100dvh;
  background: var(--toy-bg-primary);
  color: var(--toy-text-primary);
  font-family: var(--toy-font-serif);
  /* CRITICAL: overflow-x: hidden breaks position: sticky! */
  /* Use overflow-clip-margin with clip instead to prevent horizontal scroll */
  overflow-x: clip;  /* ✅ CLIPS WITHOUT BREAKING STICKY */
  line-height: 1.7;
}
```

**Why:** `overflow: clip` clips overflowing content (like `hidden`) but does NOT create a scrolling context, so `position: sticky` continues to work.

---

### Issue #2: CSS Specificity Conflict

**File:** `the-origin-of-toy.css`  
**Lines:** ~713 vs ~790

**Problem:** Two CSS rules were competing to set the `position` of `.hero-content`. The less-specific rule came later in the file and was overriding `position: sticky` with `position: relative`.

**Before:**
```css
/* Line ~713: Sets sticky (specificity: 0,3,0) */
.origin-of-toy .hero-section .hero-content {
  position: sticky;
  top: 0;
  height: 100vh;
  /* ... */
}

/* Line ~790: Was overriding with relative (specificity: 0,2,0) */
.origin-of-toy .hero-content {
  position: relative;  /* ❌ OVERRIDING STICKY */
  z-index: 10;
  text-align: center;
  max-width: 800px;
}
```

**After:**
```css
/* Line ~713: Sets sticky (still correct) */
.origin-of-toy .hero-section .hero-content {
  position: sticky;
  top: 0;
  height: 100vh;
  /* ... */
}

/* Line ~790: Removed position property */
.origin-of-toy .hero-content {
  /* position: sticky is inherited from more specific selector above */
  z-index: 10;
  text-align: center;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
```

---

### Issue #3: Scroll Distance Too Short

**File:** `OriginOfToyClient.tsx`  
**Line:** ~320

**Problem:** The hero section had `height: "400vh"` which only provided ~300vh of scroll distance for a 6-phase animation. Users scrolled past before seeing all phases.

**Before:**
```tsx
<section
  ref={heroRef}
  className={`hero-section scroll-lock-section ${isPinned ? "pinned" : ""}`}
  style={{ height: "400vh" }}  /* ❌ TOO SHORT */
>
```

**After:**
```tsx
<section
  ref={heroRef}
  className={`hero-section scroll-lock-section ${isPinned ? "pinned" : ""}`}
  style={{ height: "600vh" }}  /* ✅ 500vh scroll distance */
>
```

**Calculation:**
- 6-phase animation (0-15%, 15-30%, 30-50%, 50-70%, 70-85%, 85-100%)
- Each phase should have ~80vh of comfortable scroll time
- 6 × 80vh = 480vh scroll distance needed
- Container height = scroll distance + 100vh = 580vh ≈ 600vh

---

## Verification

After applying these fixes:

1. ✅ Hero content stays pinned to viewport while scrolling through 600vh section
2. ✅ All 6 animation phases are visible with comfortable pacing:
   - 0-15%: "TOY" emerges from darkness
   - 15-30%: Flickers/cracks
   - 30-50%: Fractures → "TOYE" appears
   - 50-70%: Floating annotations
   - 70-85%: Annotations swirl
   - 85-100%: Title card appears
3. ✅ Sticky releases naturally at end of section
4. ✅ No horizontal scrollbar appears

---

## Related Documentation

- [Sticky Position Fixes (global)](/docs/front-end/STICKY_POSITION_FIXES.md)
- [Scroll-Lock Pattern](/docs/front-end/SCROLL_LOCK_PATTERN.md)
- [Scroll-Lock Patterns Reference](/orchestration/skills/visual-essay-invocation/references/scroll-lock-patterns.md)

---

## Debugging Tips

If sticky stops working again:

1. **Check ancestors for overflow:**
   ```
   DevTools → Elements → Select sticky element → Walk UP tree → Look for overflow property
   ```

2. **Check for specificity conflicts:**
   ```
   DevTools → Elements → Computed tab → position → Click arrow to see winning rule
   ```

3. **Test scroll distance:**
   - If animation feels rushed, increase container height
   - Rule: ~80vh per animation phase

---

*Last Updated: December 2025*

