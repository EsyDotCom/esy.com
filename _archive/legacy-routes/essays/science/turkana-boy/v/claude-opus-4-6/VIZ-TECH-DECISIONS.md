---
status: PASS
date: 2026-03-05
build: opus-4-6
---

# Visualization Technology Decisions — Turkana Boy (opus-4-6)

---

## Decisions

| # | Visualization | Minimum Tier | Technology | Required Imports |
|---|---------------|-------------|------------|-----------------|
| 1 | Skeletal Completeness Reveal | Tier 2 (SVG) | Interactive SVG with sequential animation | React state + SVG |
| 2 | Dental vs. Skeletal Age Comparison | Tier 2 (D3+SVG) | D3 scale + annotated SVG range chart | `d3` |
| 3 | Growth Projection Curves | Tier 2 (D3+SVG) | Recharts AreaChart with multiple series | `recharts` |
| 4 | Body Proportion Comparison | Tier 2 (D3+SVG) | Recharts grouped BarChart | `recharts` |
| 5 | Brain Volume Across Species | Tier 2 (D3+SVG) | Recharts BarChart with annotations | `recharts` |
| 6 | Thoracic Canal Debate Timeline | Tier 1 (CSS+SVG) | Annotated SVG timeline with state toggles | React state + SVG |
| 7 | Migration Route Map | Tier 2 (D3+SVG) | D3-geo projection + SVG paths | `d3` |

---

## Summary

| Tier | Count |
|------|-------|
| Tier 0 (CSS-Only) | 0 |
| Tier 1 (CSS+SVG) | 1 |
| Tier 2 (D3+SVG/Canvas) | 6 |
| Tier 3 (Canvas 2D) | 0 |
| Tier 4 (Three.js/WebGL) | 0 |
| **Total** | **7** |

**Average Minimum Tier**: 1.86 (rounded to Tier 2)

---

## Notes

- The skeletal completeness reveal is the hero visualization — it should animate bone regions appearing sequentially
- Growth curves use Recharts for clean area charts with multiple species overlay
- The migration map uses D3-geo for a proper geographic projection (Natural Earth or Orthographic centered on East Africa)
- The voice debate visualization is deliberately low-tech (Tier 1) because the content is about uncertainty, and a simple annotated timeline conveys that better than a complex interactive
