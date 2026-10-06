# Design Research — Turkana Boy: The First Modern Body

**Build**: opus-4-6 (Claude Opus 4.6)  
**Status**: APPROVED  
**Date**: March 5, 2026

---

## Color Palette

The palette draws from the Turkana landscape and the materiality of bone and sediment.

| Token | Hex | Source |
|-------|-----|--------|
| `--tb-strata` | `#0f1114` | Deep sedimentary darkness — the geological matrix the bones were embedded in |
| `--tb-bone` | `#ede2d0` | Fossilized bone — warm ivory with ochre cast |
| `--tb-sediment` | `#b8a07a` | Sun-bleached Turkana Basin sediment |
| `--tb-lake` | `#4a8c8c` | Lake Turkana's jade-green volcanic water |
| `--tb-heat` | `#d4803a` | Equatorial midday — the heat that shaped the body |
| `--tb-charcoal` | `#262b30` | Excavation soil layers |
| `--tb-dust` | `#f0e6d4` | Rift Valley dust in afternoon light |
| `--tb-accent` | `#c45a2d` | Warning/emphasis — fever, pathology, the abscess |
| `--tb-muted` | `#8a9199` | Secondary text, annotations |

**Rationale**: The palette is warmer and more earth-toned than Lucy (which used cool greens and dusty pinks). Turkana Boy's essay should feel drier, hotter — open savanna at midday rather than wooded Afar. The bone color dominates the reading experience; the strata dark is the background.

---

## Typography

| Element | Family | Weight | Size | Notes |
|---------|--------|--------|------|-------|
| Body text | System serif stack (`Georgia, 'Times New Roman', serif`) | 400 | 1.125rem (18px) | Legibility for long-form reading |
| Section headings | System sans (`-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`) | 700 | clamp(1.75rem, 4vw, 2.5rem) | Clean, geological |
| Figure captions | System sans | 400 | 0.875rem | Muted color, tight leading |
| Data labels (viz) | Monospace (`'SF Mono', 'Fira Code', monospace`) | 400 | 0.75rem | Measurement precision |
| Blockquote | System serif | 400 italic | 1.0625rem | Left border in `--tb-accent` |

**Rationale**: Serif body text signals "this is a long, substantive read." Sans headings give geological weight. Monospace for data labels reinforces the forensic/measurement theme — every number is a clue.

---

## Animation & Motion

| Trigger | Effect | Duration | Easing |
|---------|--------|----------|--------|
| Section entry (scroll) | Fade-in + 12px translate-up | 600ms | ease-out |
| Figure reveal | Opacity 0→1, scale 0.97→1 | 500ms | ease-out |
| Viz data point hover | Scale 1.05 + tooltip fade-in | 200ms | ease-in-out |
| Skeletal completeness reveal | Bone regions fade in sequentially (head→torso→arms→legs) | 1200ms total | staggered ease-out |
| Growth curve animation | Line draws left-to-right on scroll | 800ms | ease-out |

**Reduced motion**: All animations respect `prefers-reduced-motion: reduce`. Replace transitions with instant state changes. No parallax. Scroll-triggered animations become immediate reveals.

---

## Layout Architecture

```
HERO (full-width, reconstruction image, title overlay)
│
├── Section (prose-dominant, max-width 720px centered)
│   └── Inline visualization (full-width breakout)
│
├── Section (two-column: prose left, figure right)
│   └── Side figure with sticky positioning
│
├── Section (visualization focus: full-width data viz)
│   └── Prose below as annotation
│
├── Image row (2-up side-by-side figures)
│
└── Sources (collapsible bibliography)
```

**Responsive breakpoints**:
- `< 640px`: Single column, full-width figures, reduced figure padding
- `640px–1024px`: Narrower prose column, figures break out slightly
- `> 1024px`: Full two-column layout for applicable sections

---

## Visual Motifs

1. **Bone grain**: Subtle texture overlay on section backgrounds (CSS noise pattern, not an image) — references the materiality of fossil bone
2. **Stratigraphic layering**: Sections separated by thin horizontal lines in `--tb-sediment`, suggesting geological strata
3. **Forensic measurement**: Data visualizations use thin rules, precise annotations, and monospace labels — the aesthetic of anatomical measurement
4. **Heat shimmer**: The hero section uses a radial gradient with warm colors fading to dark, evoking the Turkana landscape at noon

---

## Photography Treatment

- Hero image: Full-width, slight warm grade (increase saturation 5%, warm temperature +2%)
- Inline figures: Constrained width (max 560px), 4px border-radius, 1px border in `--tb-charcoal`
- Side figures: Sticky positioning in two-column layout on desktop
- All images: `object-fit: cover` for consistency, lazy loading except hero

---

## Visualization Design Language

- **Chart backgrounds**: `--tb-strata` or transparent
- **Data colors**: `--tb-lake` (primary data), `--tb-heat` (highlight/emphasis), `--tb-bone` (reference lines)
- **Axis lines**: `--tb-muted` at 0.5px
- **Grid lines**: `--tb-charcoal` at 0.3 opacity
- **Tooltips**: `--tb-charcoal` background, `--tb-bone` text, 8px border-radius, subtle shadow
- **Annotations**: `--tb-accent` for callout lines, `--tb-muted` for secondary annotations
