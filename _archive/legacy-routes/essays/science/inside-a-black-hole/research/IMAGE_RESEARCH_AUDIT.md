---
gate: G4.5
name: Image Sourcing
status: PASS
score: 100
essay: inside-a-black-hole
auditor: image-sourcing-agent
date: 2026-02-08
---

# G4.5 Image Research Audit: Inside a Black Hole

## Executive Summary

**No external raster images are required for this essay.** All 6 visualizations are programmatic SVG diagrams or Canvas renderings generated entirely in code. No photographs, illustrations, or raster assets need to be sourced, licensed, or hosted.

**Overall: ✅ PASS — No External Images Required**

---

## Visualization Inventory

| # | Visualization | Type | Requires External Image? |
|---|---------------|------|--------------------------|
| 1 | EHT Ring Annotation | SVG (stylized ring, not EHT photo) | ❌ No — stylized diagram, not the actual photograph |
| 2 | Observer Duality Split | SVG/CSS (split panels with animated elements) | ❌ No |
| 3 | Crossing the Horizon | SVG/CSS (scroll transition, particle dots) | ❌ No |
| 4 | Penrose Diagram Build | SVG (geometric paths, light cones) | ❌ No |
| 5 | Tidal Force Comparison | SVG (human silhouettes, panels) | ❌ No |
| 6 | Information Flow Diagram | SVG (icons, particles, flow paths) | ❌ No |

### Note on the EHT Image

The essay's opening references the EHT photograph of M87*, but the visualization is a **stylized SVG diagram inspired by the ring structure**, not the actual EHT photograph. This is deliberate:

1. The EHT image has specific usage restrictions (CC BY 4.0 with attribution to EHT Collaboration)
2. A stylized diagram better serves the pedagogical goal — we can annotate and deconstruct
3. The Design Research specifies "Stylized EHT-inspired ring" not "EHT photograph"

If future revisions require the actual EHT image:
- **License**: CC BY 4.0 (Creative Commons Attribution)
- **Attribution**: "EHT Collaboration, 2019"
- **Source**: https://eventhorizontelescope.org/
- **Restrictions**: Must credit the collaboration, may be modified

---

## SVG Asset Production Notes

All visualizations will be produced programmatically during G5 (Production). No pre-built SVG files need to be sourced. The SVGs are generated via React JSX or inline SVG markup with these characteristics:

- **Penrose diagrams**: Mathematical paths computed from coordinates
- **Human silhouettes**: Simple path data (< 1KB each)
- **Ring structure**: Circle + glow filter
- **Particle dots**: CSS-animated circles
- **Flow arrows**: SVG path elements with marker-end

**Total estimated SVG weight**: < 30KB (all visualizations combined)

---

## License Summary

| Asset | License | Status |
|-------|---------|--------|
| All SVG diagrams | Original work (produced in G5) | ✅ No license needed |
| Newsreader font | SIL Open Font License 1.1 | ✅ Free for web use |
| JetBrains Mono font | SIL Open Font License 1.1 | ✅ Free for web use |
| Lucide icons (if used) | ISC License | ✅ Free for commercial use |

**No unlicensed assets. No pending sourcing tasks.**

---

*This essay demonstrates the SVG-only approach described in the Design Research document. All visual content is code-generated, eliminating external image dependencies, licensing risks, and loading performance concerns.*
