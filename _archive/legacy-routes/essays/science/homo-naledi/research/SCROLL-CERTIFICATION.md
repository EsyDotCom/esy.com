---
gate: G7
artifact: SCROLL-CERTIFICATION
status: PASS
date: 2026-02-25
auditor: immersive-scrolling-auditor
---

# Scroll Certification: Homo naledi

## Scroll Behaviour

| Feature | Implementation | Status |
|---------|---------------|--------|
| Progress bar | Fixed left, height % based on scroll position | PASS |
| Section reveal | IntersectionObserver with 0.15 threshold | PASS |
| Opacity transition | 800ms ease-out (var --naledi-duration-normal) | PASS |
| Reduced motion | @media (prefers-reduced-motion: reduce) removes transitions | PASS |
| Scroll listener | Passive event listener on window.scroll | PASS |

## Performance

| Metric | Target | Assessment |
|--------|--------|------------|
| Scroll handler | < 1ms per frame | useScrollProgress uses simple division, no DOM queries |
| IntersectionObserver | Native API | No scroll-based position calculations |
| CSS transitions | GPU-composited | opacity-only transitions (no layout triggers) |
| D3 render | On intersection only | useInView guards all D3 useEffect hooks |
| Image loading | lazy | All images except hero use loading="lazy" |

## Mobile Compatibility

| Aspect | Implementation |
|--------|---------------|
| Touch scroll | Native browser scroll (no hijacking) |
| Responsive layout | clamp() for padding, grid auto-fit for comparisons |
| 3D viewers | Static fallback (no WebGL requirement) |
| Font scaling | clamp(min, preferred, max) on all headings |

## Status: PASS
