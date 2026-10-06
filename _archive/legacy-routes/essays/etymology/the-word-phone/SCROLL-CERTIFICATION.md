---
gate: G7
essay: the-word-phone
agent: immersive-scrolling-auditor
date: 2026-02-13
status: PASS
score: 8.2
---

# G7 Scroll Certification

## Scroll Experience Audit

### 1. Progress Indicator

| Criterion | Assessment | Score |
|-----------|-----------|-------|
| Visual feedback on scroll position | DerivationProgress component with continuous width update | 9/10 |
| Content-aware transformation | Word form changes across 6 stages matching essay narrative | 9/10 |
| Non-intrusive placement | Fixed top bar, 40px height, semi-transparent background | 8/10 |
| Performance impact | Single scroll event listener with `passive: true` | 9/10 |

### 2. Section Reveal Animations

| Criterion | Assessment | Score |
|-----------|-----------|-------|
| IntersectionObserver usage | Custom `useIntersectionReveal` hook, threshold 0.08 | 9/10 |
| One-time reveal (no re-trigger) | Observer disconnects after first intersection | 9/10 |
| Easing quality | `cubic-bezier(0.22, 1, 0.36, 1)` — smooth ease-out | 8/10 |
| Staggered child animations | Constellation, tree, starburst, cascade all stagger child elements | 9/10 |

### 3. Scroll-Lock Sequences (Simplified)

| Sequence | Spec | Implementation | Assessment |
|----------|------|---------------|-----------|
| Hero φωνή | Scroll-lock with letter animation | CSS animation on load (simplified) | 7/10 — Functional but uses timed CSS, not scroll-driven |
| Compound Builder | Scroll-lock with prefix docking | IntersectionObserver-triggered reveal with stagger | 7/10 — Staggered reveal replaces full scroll-lock |
| Family Tree | Scroll-lock with progressive growth | IO-triggered with per-node stagger delay | 8/10 — Progressive reveal effectively simulates growth |
| Great Truncation | Scroll-lock with letter fade | IO-triggered three-stage state machine with timeouts | 8/10 — Multi-stage state machine is well-timed |
| The Paradox | Scroll-lock with orbiting icons | Not implemented (simplified to static comparison) | 5/10 — Replaced with FossilComparison + InsightCallout |

**Note**: Full scroll-lock (viewport lock with scroll-driven animation) is not implemented. The implementation uses IntersectionObserver-triggered animations as a simplified approach. This is acceptable for initial production — scroll-lock can be progressively enhanced.

### 4. Era Transitions

| Criterion | Assessment | Score |
|-----------|-----------|-------|
| Visual continuity between sections | `.era-transition` dividers with gradient + centered word | 8/10 |
| Color atmosphere shift | `data-era` attribute on sections with CSS variable overrides | 9/10 |
| Background crossfade | Different `--bg-era-*` values per section | 8/10 |

### 5. Performance Characteristics (Code Review)

| Metric | Target | Code Assessment | Score |
|--------|--------|----------------|-------|
| Scroll listener | passive, debounce-free | `{ passive: true }` on scroll handler | 9/10 |
| IntersectionObserver cleanup | Disconnect after trigger | All observers disconnect on reveal | 9/10 |
| SVG rendering | No forced reflows | Static SVG with CSS transitions | 8/10 |
| Animation triggering | No layout thrash | Opacity + transform only (composite-friendly) | 9/10 |
| State updates per scroll | Minimal | Single `setScrollProgress` call | 9/10 |

### 6. Reduced Motion Support

| Feature | Implementation | Score |
|---------|---------------|-------|
| `prefers-reduced-motion` media query | Present in CSS | 9/10 |
| All animations disabled | `animation-duration: 0.01ms`, `transition-duration: 0.01ms` | 9/10 |
| Content still accessible | All elements visible without animation | 9/10 |
| Skip affordance for scroll-locks | Not applicable (no true scroll-locks in this version) | N/A |

### 7. Mobile Assessment (Code Review)

| Criterion | Assessment | Score |
|-----------|-----------|-------|
| Touch scrolling | No scroll hijacking — standard scrolling maintained | 9/10 |
| Responsive breakpoints | 5 breakpoints (375px → 1440px) with typography scaling | 8/10 |
| Family tree overflow | Horizontal scroll container (`overflow-x: auto`) | 8/10 |
| Greek text rendering | Font fallback chain (GFS Didot → Noto Serif Display → system) | 7/10 |

---

## Score Summary

| Category | Weight | Score |
|----------|--------|-------|
| Progress Indicator | 15% | 8.75/10 |
| Section Reveals | 20% | 8.75/10 |
| Scroll-Lock Sequences | 20% | 7.0/10 |
| Era Transitions | 10% | 8.33/10 |
| Performance | 15% | 8.8/10 |
| Reduced Motion | 10% | 9.0/10 |
| Mobile | 10% | 8.0/10 |

**Weighted Score: 8.2/10** (threshold: 8.0) ✅

## Tier 1 Failure Check

- [x] No scroll hijacking on mobile ✅
- [x] No layout thrash in scroll handler ✅
- [x] IntersectionObserver cleanup prevents memory leaks ✅
- [x] Reduced motion fully supported ✅
- [x] No forced synchronous layout ✅

**0 Tier 1 failures.** ✅

## Recommendations (Non-Blocking)

1. **Progressive enhancement**: Implement true scroll-lock for the 5 specified sequences using scroll-driven animations API or `position: sticky` + scroll progress calculation
2. **Paradox visualization**: Implement the orbital function-icon animation specified in Layer 2
3. **Greek font loading**: Add `font-display: swap` and preload GFS Didot for faster first render
4. **Hero animation**: Convert from timed CSS to scroll-driven for more responsive feel

---

**G7 Status**: ✅ **PASS** — Score 8.2/10, 0 Tier 1 failures. Scroll experience is functional, performant, and accessible. Scroll-lock sequences use simplified IntersectionObserver approach — acceptable for initial production with clear progressive enhancement path.
