# Jazz Visual Essay: Scroll Experience Certification

**Certification Date:** December 28, 2025
**Status:** CERTIFIED

---

## Scroll Performance Patterns

### 1. useScrollLock Hook ✓
- **Passive scroll listeners**: `{ passive: true }` prevents blocking
- **Proper cleanup**: `removeEventListener` in useEffect return
- **Mobile fallback**: Disabled on touch devices via `useIsMobile()`
- **Smooth progress**: Continuous 0-1 calculation from scroll position

### 2. useGlobalScrollProgress Hook ✓
- **requestAnimationFrame**: Prevents layout thrashing
- **Ticking pattern**: Uses ref to prevent excessive state updates
- **Passive listeners**: `{ passive: true }` for main scroll event
- **Proper cleanup**: Removes listener on unmount

### 3. useIntersectionReveal Hook ✓
- **IntersectionObserver API**: Modern, performant approach
- **Proper threshold**: 0.15 with -50px rootMargin
- **Cleanup**: `observer.disconnect()` on unmount
- **One-way reveal**: Sets visible once, doesn't reset (performance)

---

## CSS Animation Best Practices

| Pattern | Implementation | Status |
|---------|----------------|--------|
| GPU-accelerated properties | `transform`, `opacity` only | ✓ |
| `will-change` hints | Applied to scroll-lock elements | ✓ |
| Transition timing | Uses CSS custom properties | ✓ |
| Mobile optimization | Removes transitions on small screens | ✓ |

---

## Scroll-Lock Hero Sequence

| Phase | Progress Range | Animation | Status |
|-------|----------------|-----------|--------|
| Phase 1 | 0.00 - 0.25 | "There is only one photograph" | ✓ |
| Phase 2 | 0.18 - 0.45 | "Buddy Bolden. Around 1905." | ✓ |
| Phase 3 | 0.38 - 0.65 | "No one recorded his music." | ✓ |
| Phase 4 | 0.58 - 1.00 | Title "Jazz" scale-in | ✓ |
| Phase 5 | 0.72 - 1.00 | Subtitle and description | ✓ |

### Hero Scroll-Lock Details
- **Container height**: 300vh (3x viewport)
- **Pin behavior**: Fixed positioning when `isPinned`
- **End behavior**: Absolute positioning at container bottom
- **Background**: Progressive darkening via `bgDarken` phase

---

## Chapter Reveal Animations

All 14 chapters use `useIntersectionReveal`:
- **Trigger threshold**: 15% visibility
- **Animation**: Fade-in + translateY(30px → 0)
- **Duration**: 1000ms (--duration-slow)
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)

---

## Progress Bar (Musical Staff)

### Desktop Vertical Progress
- **Position**: Fixed left, 24px from edge
- **Visibility**: `display: block` at 1200px+
- **Markers**: 16 chapter markers with position-based activation
- **Playhead**: Tracks current scroll position

### Mobile Horizontal Progress
- **Position**: Fixed bottom
- **Width**: Animated fill based on progress
- **Visibility**: Always visible on mobile

---

## Performance Checklist

| Requirement | Status |
|-------------|--------|
| No layout thrashing in scroll handlers | ✓ |
| All scroll listeners passive | ✓ |
| requestAnimationFrame for animations | ✓ |
| IntersectionObserver instead of scroll events | ✓ |
| will-change applied to animated elements | ✓ |
| GPU-accelerated properties only | ✓ |
| Cleanup on component unmount | ✓ |
| Mobile-specific optimizations | ✓ |

---

## Potential Issues (Non-Blocking)

1. **Large image loading**: LOC IIIF images may cause layout shifts
   - Mitigation: `loading="lazy"` on all images
   - Recommendation: Consider aspect-ratio placeholders

2. **Long document height**: With scroll-lock hero (300vh), total height significant
   - Mitigation: Chapters use intersection reveal (lazy animation)
   - Status: Acceptable

---

## Certification Result

**CERTIFIED** — Scroll experience meets performance standards.

- All scroll patterns follow best practices
- Animations are GPU-accelerated
- Mobile experience properly degraded
- No blocking scroll handlers

---

*Last Updated: December 28, 2025*
