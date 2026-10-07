# Design Research: The Speed of Everything

> **Date**: February 9, 2026  
> **Agent**: Design Researcher  
> **Subject**: A visual essay about the full spectrum of speeds in nature, from continental drift to the speed of light  
> **Core Visual Metaphor**: The logarithmic ruler — a single unified axis spanning 17 orders of magnitude

---

## Design Philosophy

The subject is **scale itself**. The essay's central challenge is making the reader *feel* the incomprehensible gap between 10⁻⁹ m/s and 10⁸ m/s. The visual identity must therefore:

1. **Use space as metaphor**: The vastness of the speed spectrum should be reflected in generous vertical spacing, deep scrolling, and the physical act of traveling through the log scale
2. **Derive color from the cosmos**: Since the essay spans from geological to electromagnetic phenomena, the palette moves from earth tones (geological) through cool blues (human/engineered) to luminous gold (light)
3. **Let numbers be beautiful**: Speed values are the primary data — they should be typographically prominent, not tucked away in annotations

---

## Color Palette

### Primary Palette — Subject-Derived

The color system is derived from the essay's domain categories. Each speed "lives" in a color world determined by what it describes.

| Token | Hex | RGB | Usage | Derivation |
|-------|-----|-----|-------|------------|
| `--geo` | `#C4923A` | 196, 146, 58 | Geological speeds (drift, glaciers) | Amber of sandstone and geological strata |
| `--bio` | `#34A853` | 52, 168, 83 | Biological speeds (hair, blood, nerves) | Chlorophyll green, living systems |
| `--human` | `#4285F4` | 66, 133, 244 | Human-engineered speeds | Blueprint blue, engineering precision |
| `--atmo` | `#78909C` | 120, 144, 156 | Atmospheric speeds (sound, wind) | Steel-grey of air and weather |
| `--cosmic` | `#9C27B0` | 156, 39, 176 | Cosmic velocities (orbital, galactic) | Nebula purple, deep space |
| `--em` | `#FFB300` | 255, 179, 0 | Electromagnetic (light, signals) | The color of visible light's warm center |

### Background System

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-deep` | `#08080C` | Primary background — deep space black |
| `--bg-section` | `#0F0F1A` | Section backgrounds — slightly warmer |
| `--bg-viz` | `#141428` | Visualization containers — dark blue-black |
| `--bg-card` | `#1A1A2E` | Cards and callout boxes |

### Text System

| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#E8ECF1` | Primary body text — warm white |
| `--text-secondary` | `#8B95A5` | Secondary / annotation text |
| `--text-muted` | `#4A5568` | Subtle labels, de-emphasized text |
| `--text-accent` | `#FFB300` | Speed values, highlighted numbers |

### Gradient

The essay background subtly shifts from warm dark at the top (geological) to cool dark-blue in the middle (engineered/cosmic) to a faint golden glow at the bottom (speed of light). This is not decorative — it mirrors the essay's journey.

```css
background: linear-gradient(
  to bottom,
  #08080C 0%,        /* geological section — deep earth */
  #0A0A14 20%,       /* biological — hint of warmth */
  #0C0C1E 50%,       /* human/cosmic — cool blue-black */
  #0F0D14 80%,       /* approaching light — faint warm */
  #12100A 100%        /* the speed of light — golden dark */
);
```

---

## Typography

### Type Scale

| Element | Family | Size (desktop) | Size (mobile) | Weight | Letter Spacing |
|---------|--------|---------------|---------------|--------|----------------|
| Essay title | System sans (Inter) | 3rem | 2rem | 800 | -0.02em |
| Section title | System sans (Inter) | 2.25rem | 1.75rem | 700 | -0.01em |
| Body text | System sans (Inter) | 1.125rem | 1rem | 400 | 0 |
| Speed values | Monospace (JetBrains Mono) | 1.5rem | 1.25rem | 600 | 0.02em |
| Speed units | System sans (Inter) | 0.875rem | 0.75rem | 400 | 0.05em |
| Annotations | System sans (Inter) | 0.8125rem | 0.75rem | 400 | 0 |
| Pull quotes | System sans (Inter) | 1.375rem | 1.125rem | 400 italic | 0 |

### Typography Philosophy

**Speed values as first-class typography**: Numbers are the essay's primary content. They receive monospace treatment, larger sizing, and the accent color (`--text-accent`, amber). This makes them scannable and visually distinct from prose.

**Monospace for precision**: All numerical values (m/s, km/h, scientific notation) use monospace. This signals "this is data, not prose" and ensures digit alignment in tables and the logarithmic ruler.

**Font stack**:
```css
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
```

---

## Animation Philosophy

### Core Principle: Motion = Metaphor

In an essay about speed, animation is not decoration — it is content. The speed at which things move on screen communicates information.

### Animation Rules

| Rule | Implementation |
|------|---------------|
| **Slow things animate slowly** | Geological entries ease in over 1.5–2s with `ease-out` |
| **Fast things animate fast** | Light-related entries appear in 100–200ms with sharp `ease-in` |
| **Human-scale = comfortable** | Walking/driving speeds use 400–600ms transitions |
| **No auto-play loops** | All animation is scroll-triggered or interaction-triggered |
| **GPU only** | Only `transform` and `opacity` are animated. No `width`, `height`, `top`, `left`. |
| **Reduced motion respected** | `prefers-reduced-motion: reduce` skips all animation; content appears immediately |

### Scroll-Lock Zone (Section 6: The Logarithmic Ruler)

The culminating visualization is scroll-locked:
- 400vh scroll zone on desktop (200vh mobile)
- Reader's scroll position maps linearly to position on the logarithmic axis
- As the reader scrolls, they "travel" from 10⁻⁹ to 10⁸·⁵
- Speed entries appear at their correct log positions
- Current position is indicated by a glowing horizontal line
- Entry labels fade in as they approach the viewport center

### Transition Timing by Category

```css
/* Geological — slow and patient */
--transition-geo: 1500ms cubic-bezier(0.25, 0.1, 0.25, 1);

/* Biological — organic, medium */
--transition-bio: 800ms cubic-bezier(0.4, 0, 0.2, 1);

/* Human-engineered — crisp, mechanical */
--transition-human: 400ms cubic-bezier(0.4, 0, 0.6, 1);

/* Cosmic — steady, grand */
--transition-cosmic: 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);

/* Electromagnetic — sharp, nearly instant */
--transition-em: 150ms cubic-bezier(0, 0, 0.2, 1);
```

---

## Visual Element Design

### The Logarithmic Ruler (Hero Visualization)

- **Structure**: Full-width vertical axis, 17 major ticks (one per order of magnitude)
- **Ticks**: Labeled `10⁻⁹`, `10⁻⁸`, ..., `10⁰`, ..., `10⁸` along the left edge
- **Entries**: Small circles (color-coded by category) positioned at their log₁₀ value, with labels extending right
- **Active indicator**: A glowing horizontal rule (amber, `--em` color) at the current scroll position
- **"You Are Here" band**: A highlighted region at log₁₀ ≈ 0–1.5 showing the human perception range

### Speed Entry Cards

Each speed entry in the body sections uses a consistent card format:
- Left: color-coded vertical bar (4px, category color)
- Center: name + description
- Right: speed value in monospace + unit
- Bottom: one-line source attribution

### Section Dividers

No horizontal rules. Sections are separated by:
- 30vh vertical spacing
- A single centered text element (the transition quote) in italic
- A subtle color temperature shift in the background

---

## Responsive Strategy

| Aspect | Desktop (>1024px) | Tablet (768–1024px) | Mobile (<768px) |
|--------|-------------------|---------------------|-----------------|
| Log ruler scroll zone | 400vh | 300vh | 200vh |
| Speed entry layout | Two-column (label + value) | Two-column | Single column |
| Visualization width | 960px max | 100% padded | 100% padded |
| Section spacing | 30vh | 25vh | 20vh |
| Speed values size | 1.5rem | 1.25rem | 1.125rem |

---

## Accessibility

- All color-coded categories also use distinct icons/shapes (not color-alone)
- Minimum contrast ratio: 4.5:1 for all text on `--bg-deep`
- The logarithmic ruler has `aria-label="Logarithmic speed scale from 10 to the negative 9 to 10 to the 8 metres per second"`
- Each speed entry has `role="listitem"` within a `role="list"` container
- Scroll-lock zone includes skip link: "Press Escape to skip visualization"

---

*Design research complete. This visual identity is derived entirely from the subject matter — the speed spectrum of nature — and should produce a unique, data-rich, typographically driven visual essay that has no visual overlap with any prior essay in the Esy collection.*
