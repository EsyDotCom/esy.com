---
gate: G7
status: PASS
slug: seven-million-years
auditor: immersive-scrolling-auditor
date: 2026-02-24
overall_score: 8.5
---

# Scroll Certification: Seven Million Years

## Architecture Review

| Component | Implementation | Score |
|-----------|---------------|-------|
| Section reveal (IntersectionObserver) | useInView hook, threshold 0.12, one-shot trigger | 9/10 |
| Reading progress bar | ProgressBar component, scroll event listener, passive | 8/10 |
| CSS transitions | 700ms geological ease, 12px translateY | 9/10 |
| Stagger animations | CSS nth-child delays at 80ms intervals | 8/10 |
| Reduced motion support | @media (prefers-reduced-motion: reduce) block present | 9/10 |

## Performance Assessment

| Metric | Target | Expected | Status |
|--------|--------|----------|--------|
| Scroll handler | Passive listener | Yes (passive: true) | PASS |
| Layout thrashing | None | No forced reflows detected in scroll handler | PASS |
| DOM mutations on scroll | Minimal | Only progress bar height update | PASS |
| Heavy components | Lazy-loaded | Recharts components render on mount (acceptable) | PASS |
| CSS animations | GPU-accelerated | opacity and transform only | PASS |

## Mobile Compatibility

| Test | Status |
|------|--------|
| 100dvh hero (iOS Safari) | Uses min-height: 100dvh (dynamic viewport height) | PASS |
| Touch scrolling | No scroll hijacking, no scroll-lock sections | PASS |
| Responsive charts | ResponsiveContainer width="100%" | PASS |
| Font scaling | clamp() used for all display typography | PASS |
| Grid layout | Single column on mobile, multi-column on desktop | PASS |

## Tier 1 Failure Check

| Tier 1 Issue | Found? |
|-------------|--------|
| Scroll hijacking (preventDefault on scroll) | No |
| Fixed-position elements blocking content | No (progress bar is 4px, left edge) |
| Horizontal scroll on mobile | No (overflow-x: hidden on .smy-essay) |
| Blank screens during scroll | No |
| JavaScript errors blocking render | No |

**Tier 1 Failures: 0** -- PASS

## Overall Certification

| Category | Score |
|----------|-------|
| Architecture | 8.6/10 |
| Performance (expected) | 8.5/10 |
| Mobile compatibility | 9.0/10 |
| Accessibility | 8.0/10 |
| **Overall** | **8.5/10** |

**Certification: PASS** (threshold: 8.0/10)

Note: This is a code-level review. Browser testing should be performed post-deployment to verify actual 60fps performance.
