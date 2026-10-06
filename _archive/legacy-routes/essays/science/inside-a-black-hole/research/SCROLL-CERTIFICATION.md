---
gate: G7
name: Scroll Certification
status: PASS
score: 95
essay: inside-a-black-hole
auditor: scroll-certification-agent
date: 2026-02-08
---

# G7 Scroll Certification: Inside a Black Hole

## Overall Status: ✅ Certified

---

## 1. Scroll Progress Tracking

| Criterion | Status |
|---|---|
| Progress indicator present | ✅ Fixed 2px bar at top of viewport |
| Uses `requestAnimationFrame` | ✅ Throttled via `ticking` flag |
| Passive scroll listener | ✅ `{ passive: true }` on `window.scroll` |
| Tracks full document height | ✅ `scrollTop / (scrollHeight - innerHeight)` |
| Visual feedback accurate | ✅ `scaleX(progress)` with `transform-origin: left` |

**Implementation**: `useScrollProgress()` hook (lines 58–79) — clean, performant, no jank risk.

---

## 2. Intersection Observer Usage

| Criterion | Status |
|---|---|
| IntersectionObserver API used | ✅ `useInView()` custom hook |
| Configurable threshold | ✅ Default 0.15, per-component overrides (0.2, 0.3, 0.5) |
| Configurable rootMargin | ✅ Optional parameter supported |
| Observer cleanup on unmount | ✅ `observer.disconnect()` in return cleanup |
| One-shot option (unobserve after trigger) | ✅ `options.once !== false` defaults to fire-once |

**Implementation**: `useInView()` hook (lines 34–55) — minimal, correct, no memory leaks.

---

## 3. Section-Level Scroll Behavior

| Section | Trigger | Behavior | Status |
|---|---|---|---|
| Hero | Immediate | Static title + subtitle | ✅ |
| §1 We Photographed One | Scroll into view | Fade-in + EHT ring annotations stagger | ✅ |
| §2 Approaching the Horizon | Scroll into view | Fade-in + observer duality auto-phases | ✅ |
| §3 The Crossing | Scroll into view (threshold: 0.5) | Starfield + horizon flash after 1.5s | ✅ |
| §4 Where Space Becomes Time | Scroll into view | Penrose diagram builds in 5 steps (1.2s each) | ✅ |
| §5 The Stretch | Scroll into view | Tidal comparison cards stagger in (150ms delay) | ✅ |
| §6 Reading the Map | Scroll into view | Interactive Penrose — tap points for light cones | ✅ |
| §7 The Evaporating Paradox | Scroll into view | Information flow diagram + quantum bg gradient | ✅ |
| §8 Firewalls, Holograms | Scroll into view | Prose-only (quantum bg gradient) | ✅ |
| §9 What Black Holes Tell Us | Scroll into view | Prose + closing pull quote | ✅ |

**Narrative pacing**: Excellent. Visualizations are spaced between prose blocks, maintaining a reading rhythm. No two consecutive heavy visualizations.

---

## 4. Animation Quality

| Criterion | Status |
|---|---|
| CSS transitions (not JS animation loops) | ✅ All animations via CSS `transition` or `@keyframes` |
| Cubic-bezier easing (not linear) | ✅ `cubic-bezier(0.25, 0.1, 0.25, 1)` for fade-ins |
| Staggered reveals (not simultaneous pop) | ✅ EHT annotations stagger 200ms, tidal cards 150ms |
| No animation on scroll (perf risk) | ✅ Scroll only tracked for progress bar (RAF-throttled) |
| Transform-based animations (GPU composited) | ✅ `opacity` + `translateY` — compositor-friendly |
| No layout-triggering animations | ✅ No `width`, `height`, `top`, `left` animations |

---

## 5. Performance

| Criterion | Status |
|---|---|
| No scroll-linked layout recalculations | ✅ |
| `useMemo` for static data | ✅ Stars array, singularity path |
| Observers disconnected on cleanup | ✅ |
| No re-renders on scroll (except progress) | ✅ Progress state doesn't cascade |
| Passive event listeners | ✅ |
| No `getBoundingClientRect` in scroll handlers | ✅ Delegation to IntersectionObserver |

---

## 6. Accessibility

| Criterion | Status |
|---|---|
| `role="img"` or `role="figure"` on visualizations | ✅ All 6 visualizations |
| `aria-label` on each visualization | ✅ Descriptive labels (not generic) |
| `prefers-reduced-motion` media query | ✅ Disables all transitions + animations |
| Keyboard navigation for interactive elements | ⚠️ Penrose points use `onClick` but no `onKeyDown` — minor gap |
| Semantic HTML structure | ✅ `<article>`, `<header>`, `<section>`, `<footer>` |
| Reading order preserved without JS | ✅ Content makes sense with animations disabled |

---

## 7. Responsive Behavior

| Breakpoint | Adaptations | Status |
|---|---|---|
| ≤768px | Split grid → stack, tidal cards → single col, info flow → stack | ✅ |
| ≤480px | EHT ring shrinks to 200px, section padding reduced | ✅ |
| All sizes | `clamp()` for font sizes | ✅ |

---

## Summary

| Category | Score |
|---|---|
| Progress tracking | 10/10 |
| Intersection observers | 10/10 |
| Section scroll behavior | 10/10 |
| Animation quality | 10/10 |
| Performance | 10/10 |
| Accessibility | 9/10 |
| Responsive | 10/10 |

**Total: 69/70 (98.6%)**

**Minor issue**: Interactive Penrose diagram points lack keyboard event handlers (`onKeyDown`/`tabIndex`). This is a non-blocking accessibility improvement that should be addressed before final production but does not affect scroll certification.

**Scroll Certification: ✅ PASS**

*The essay delivers a polished, performant scrollytelling experience with well-paced reveals, GPU-composited animations, proper observer cleanup, and comprehensive reduced-motion support.*
