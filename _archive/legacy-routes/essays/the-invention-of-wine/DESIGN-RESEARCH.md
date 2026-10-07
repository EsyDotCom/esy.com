# Design Research: The Invention of Wine

> Subject-derived visual identity documentation

---

## Design Philosophy

### Core Concept: "Dark Cellar Elegance"

The essay immerses readers in the atmosphere of a wine cellar—dark, intimate, sophisticated. Every visual decision derives from wine itself: its colors, its aging process, its material culture (bottles, corks, glasses, vats).

### Anti-Pattern Consciousness

This essay was explicitly designed to avoid common scrollytelling patterns:

| Pattern Avoided | Replacement |
|-----------------|-------------|
| Timeline cards | Vertical era sections with full-viewport presence |
| Section label/title/text blocks | Integrated layouts |
| Data grids | Animated splash counters |
| Fixed left-side indicators | Background bottle animation |
| Quote section boxes | Full-screen quote takeover |
| Hero badge structures | Organic text with background year |

### Architectural Decision: Vertical Timeline (2025-12-28)

**Original Design:** Horizontal parallax timeline using `position: sticky` with scroll-driven `translateX` animation.

**Problem Encountered:** The horizontal parallax architecture created unavoidable "dead space":
- The section needed extra height (e.g., 600vh) as "scroll fuel" to drive the horizontal animation
- A `position: sticky` container locked the timeline in view while scrolling
- When the sticky released, the remaining scroll-fuel space (empty) became visible as black gaps
- Users would scroll through 3+ viewport heights of black before reaching the next section

**Root Cause:** Sticky positioning inherently creates this problem—the sticky element releases when its container's bottom reaches the viewport bottom, but the container's extra height (needed to drive the animation) remains below the sticky, creating empty space.

**Solution:** Converted to vertical timeline layout where each era is a standard full-viewport section:
- No sticky positioning complexity
- No scroll-fuel dead space
- Consistent with the rest of the essay's scroll behavior
- Each era gets dedicated screen time as users naturally scroll

**Lesson Learned:** Horizontal parallax via sticky + translateX is architecturally fragile. For multi-section timelines, vertical layouts are more reliable and user-friendly. Reserve horizontal scroll effects for single-viewport interactions where the entire animation completes before the section exits.

### Subject-Design Alignment Score: 9/10

Every major design element derives directly from wine:
- Colors from wine aging (purple → burgundy → brick)
- Animations from winemaking (pouring, bubbling, fermenting)
- Typography from wine label elegance
- Mood from wine cellar darkness

---

## Color System

### Primary Palette

| Variable | Hex | RGB | Usage | Subject Derivation |
|----------|-----|-----|-------|-------------------|
| `--wine-grape` | #4A235A | 74, 35, 90 | Early eras, grape state | Color of unfermented grape skin |
| `--wine-young` | #722F37 | 114, 47, 55 | Primary accent | Young red wine color |
| `--wine-aged` | #8B4513 | 139, 69, 19 | Later eras | Aged/oxidized wine brick |
| `--wine-deep` | #2C1810 | 44, 24, 16 | Dark backgrounds | Deep wine shadows |
| `--champagne` | #F7E7CE | 247, 231, 206 | Text, highlights | Champagne/cream color |
| `--cream` | #FDF8F0 | 253, 248, 240 | Light accents | Lighter cream (reserved) |
| `--cellar` | #0D0D0D | 13, 13, 13 | Main background | Wine cellar darkness |
| `--cork` | #C4A35A | 196, 163, 90 | Structural elements | Cork stopper color |

### Color Progression Logic

The essay uses color to represent wine aging through time:

```
6000 BCE ─────────────────────────────────────────────▶ Present
    │                                                       │
    ▼                                                       ▼
  GRAPE          YOUNG           AGED            RENEWAL
  Purple         Burgundy        Brick           Burgundy
  #4A235A        #722F37         #8B4513         #722F37
    │               │               │               │
    └───────────────┴───────────────┴───────────────┘
           Wine aging color progression
```

### Background Treatments

| Section | Background | Rationale |
|---------|------------|-----------|
| Hero | Radial gradients (grape + young) over cellar | Mysterious origin moment |
| Grape Transform | Cellar with wine stains | Transformation space |
| Fermentation Vat | Gradient: cellar → deep | Underground fermentation |
| Timeline Eras | Era-specific gradients | Visual era distinction |
| Split Screen | Grape vs Young | Contrast of states |
| Quote | Wine-deep | Contemplative space |
| Data Splash | Gradient: grape → young → aged | Full journey |
| Footer | Wine-deep | Closing cellar depth |

---

## Typography

### Font Selection

| Role | Font | Source | Rationale |
|------|------|--------|-----------|
| Display | Playfair Display | Google Fonts | Wine label elegance, classical serif |
| Body | DM Sans | Google Fonts | Modern clarity, clean sans |

### Playfair Display Usage
- Hero title
- Era years and titles
- Quote blockquote
- Data numbers
- Statistics (ferment-value)
- Footer text

**Rationale**: Playfair Display evokes the elegance of wine labels, château names, and classical European typography. Its high contrast and refined serifs suggest sophistication without pretension.

### DM Sans Usage
- Body paragraphs
- Era descriptions
- Labels and captions
- Source links

**Rationale**: DM Sans provides excellent readability at body sizes while maintaining a contemporary feel that balances Playfair's classical elegance.

### Type Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Hero Title | clamp(3rem, 8vw, 5.5rem) | 400 | 1.1 |
| Hero Intro | 1.25rem | 300 | 1.8 |
| Section H2 | 2.5rem | 400 | 1.2 |
| Body | 1.0625rem | 400 | 1.9 |
| Era Year | clamp(4rem, 12vw, 8rem) | 400 | — |
| Data Numbers | clamp(3rem, 8vw, 5rem) | 400 | 1 |
| Labels | 0.7-0.8rem | — | 1.5 |

---

## Animation System

### Custom Easing

| Variable | Value | Usage |
|----------|-------|-------|
| `--ease-pour` | cubic-bezier(0.4, 0, 0.2, 1) | Liquid movements, smooth transitions |
| `--ease-swirl` | cubic-bezier(0.34, 1.56, 0.64, 1) | Bouncy reveals, playful elements |

### Scroll-Driven Animations

| Animation | Trigger | Behavior | Subject Connection |
|-----------|---------|----------|-------------------|
| Bottle Rotation | Page scroll | 0° → 45° tilt | Wine being poured/served |
| Wine Level | Page scroll | 0% → 100% fill | Glass filling metaphor |
| Timeline Progress | Section scroll | Horizontal translate | Journey through time |
| Wine Stream | Rotation > 20° | Ellipse appears | Pour stream when tilted |

### Infinite Loop Animations

| Animation | Duration | Behavior | Subject Connection |
|-----------|----------|----------|-------------------|
| Bubble Rise | 4s | Bottom → Top with fade | CO₂ from fermentation |
| Wine Drop | 2s | Drip down + scale | Wine droplet falling |

### Intersection-Triggered Animations

| Animation | Threshold | Behavior | Purpose |
|-----------|-----------|----------|---------|
| Data Items | 0.5 | Scale 0.8→1 + fade in | Progressive reveal of statistics |

### Animation Philosophy

**Functional over decorative**: Every animation serves a purpose connected to wine or winemaking:
- Bubbles = fermentation CO₂ (scientifically accurate)
- Pour = progression through content (metaphorical)
- Drip = invitation to scroll (functional)

---

## Component Architecture

### Unique Visual Mechanics

#### 1. Pouring Bottle SVG
```
Position: Fixed center, low opacity (0.15)
Behavior: Rotates 0-45° with scroll, wine level rises
Purpose: Constant visual connection to wine, progress indicator
Z-index: 5 (behind content, above backgrounds)
```

#### 2. Fermentation Bubbles
```
Count: 6 bubbles
Position: Absolute within fermentation section
Animation: Staggered rise (0-2.5s delays), 4s cycle
Visual: Radial gradient (champagne color), 6-12px diameter
```

#### 3. Vertical Timeline (Revised Architecture)
```
Container: Natural height (sum of era sections)
Each Era: min-height 100vh, full-viewport presence
Layout: Standard vertical scroll, no sticky positioning
Eras: 7 total (6000 BCE → Today)
```
**Note:** Originally designed as horizontal parallax with sticky positioning, but converted to vertical layout due to unavoidable dead-space issues. See "Architectural Decision" section above.

#### 4. Grape → Wine Transformation
```
Layout: Flex row (stacks on mobile)
Elements: Grape cluster SVG + arrow + wine drop SVG
Colors: Grape purple transforming to wine burgundy
```

#### 5. Split Screen Contrast
```
Layout: CSS Grid, 1fr 1fr (stacks mobile)
Left: Grape purple background (ancient)
Right: Wine burgundy background (preserved)
Purpose: Visual contrast of archaeological evidence
```

### SVG Illustrations

All visuals are inline SVG (no external images):

| SVG | Location | Purpose |
|-----|----------|---------|
| Bottle | Fixed background | Pour animation |
| Grape Cluster | Grape section | Transformation start |
| Wine Drop | Grape section | Transformation end |
| Fermentation Vat | Vat section | Scientific illustration |
| Animated Bubbles | Inside vat SVG | Fermentation visualization |
| Wine Glass | Footer | Closing motif |

---

## Responsive Design

### Breakpoint: 768px

| Element | Desktop | Mobile |
|---------|---------|--------|
| Bottle animation | Visible (fixed) | Hidden (performance) |
| Split section | 2-column grid | Single column stack |
| Data grid | 2x2 grid | Single column |
| Grape transform | Horizontal row | Vertical stack |
| Vat container | Side-by-side | Vertical stack |
| Sources grid | 2-column | Single column |
| Ferment stats | Horizontal row | Vertical stack |

### Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  .bubble, .wine-drop, .data-item {
    animation: none;
    transition: none;
    opacity: 1;
    transform: none;
  }
}
```

---

## Extension Guidelines

### For New Sections (Phylloxera, Modern)

#### Color Extensions
| New Era | Recommended Colors |
|---------|-------------------|
| Phylloxera Crisis | Desaturated burgundy, gray undertones |
| Modern/Recovery | Return to full --wine-young |

#### Animation Extensions
| New Element | Recommended Animation |
|-------------|----------------------|
| Dead vines | Fade/wilt keyframes |
| Grafting diagram | Sequential reveal |
| World map | Region highlight on scroll |
| Data charts | Count-up animation |

#### Typography Extensions
- Maintain Playfair Display for headlines
- Maintain DM Sans for body
- No new fonts needed

### New Visual Elements (if needed)

| Element | Approach | Rationale |
|---------|----------|-----------|
| Phylloxera aphid | Inline SVG, microscopic style | Subject-derived |
| World map | SVG with region fills | Data visualization |
| Grafting diagram | Technical illustration SVG | Educational |
| Modern bottles | Simplified SVG silhouettes | Continuity |

---

## Design System Summary

### What to Preserve (CRITICAL)
- Entire color system
- Both typography choices
- All custom easing curves
- Bottle pour animation
- Fermentation bubbles
- Horizontal parallax timeline
- Dark cellar aesthetic

### What Can Extend
- New era color treatments (within system)
- New SVG illustrations (matching style)
- New animation patterns (functional purpose)
- Additional data visualizations

### What Not to Change
- Font families
- Core color palette
- Animation philosophy (functional > decorative)
- Dark background approach
- SVG-first illustration approach

---

## Credits

**Original Design**: Esy Editorial Team
**Design Documentation**: Visual Essay Refurbish Agent
**Date**: December 28, 2025

---

*This design research documents the existing visual identity for preservation and informed extension. All decisions are subject-derived from wine and winemaking.*
