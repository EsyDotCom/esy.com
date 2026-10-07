# Design Research: The Luminous Thread — Silk

> Subject-derived visual identity for the Silk visual essay.
> All design decisions are derived from the physical, cultural, and historical properties of silk itself.

---

## Design Philosophy

Silk is defined by three physical properties: **luminosity** (its triangular cross-section refracts light), **drape** (it falls with weight and grace), and **translucency** (it reveals what's behind it). These three properties become the design principles for the entire essay:

1. **Luminosity** → Light is never flat. Every surface catches and refracts. Color shifts with scroll position.
2. **Drape** → Motion is never rigid. Animations ease with the weight of fabric. Nothing snaps.
3. **Translucency** → Layers are visible through each other. Parallax creates depth. History shows through the present.

---

## Color Palette

### Primary Palette — Derived from Silk Itself

| Token | Hex | RGB | Source Derivation | Usage |
|-------|-----|-----|-------------------|-------|
| `--silk-gold` | `#C9A84C` | 201, 168, 76 | Raw silk filament color — the natural golden sheen of unbleached Bombyx mori silk | Primary accent, thread shimmer, progress indicator, interactive highlights |
| `--silk-ivory` | `#F5F0E8` | 245, 240, 232 | Undyed silk fabric — warm off-white with yellow undertone | Primary background (light sections), text background |
| `--silk-deep` | `#1A1510` | 26, 21, 16 | The darkness inside a cocoon before the moth emerges | Primary background (dark sections), hero sequence |
| `--silk-cocoon` | `#E8DCC8` | 232, 220, 200 | Dried cocoon surface — papery warm beige | Card backgrounds, caption areas, secondary surfaces |

### Era Accent Palette — Derived from Historical Silk Traditions

| Token | Hex | Source Derivation | Usage |
|-------|-----|-------------------|-------|
| `--silk-mulberry` | `#6B3A5C` | Mulberry fruit and leaf — the plant that makes silk possible | Chinese sections, sericulture content |
| `--silk-jade` | `#4A7C59` | Chinese jade — the other precious material of ancient China | Chinese era accents, nature elements |
| `--silk-lapis` | `#264B8C` | Lapis lazuli from Badakhshan, Afghanistan — traded on the same Silk Road | Silk Road sections, landscape overlays |
| `--silk-sand` | `#D4C5A9` | Taklamakan Desert sand — the Silk Road's defining landscape | Silk Road backgrounds, map elements |
| `--silk-byzantine` | `#6B2D75` | Tyrian purple — the Byzantine imperial color, worn only by the emperor on silk | Byzantine sections, Justinian content |
| `--silk-mosaic` | `#C4A235` | Byzantine mosaic gold tesserae — San Vitale | Byzantine highlights, Justinian section |
| `--silk-crimson` | `#8B1A1A` | Lyon silk — the red that made France's silk industry famous | European sections, Canut revolt, labor |
| `--silk-lyon` | `#D4AF37` | French court gold — Versailles, Louis XIV's reign | French sections, Jacquard |

### Functional Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--silk-text-primary` | `#2C2416` | Body text on light backgrounds — warm dark brown, not pure black |
| `--silk-text-secondary` | `#6B6152` | Captions, metadata — desaturated warm gray |
| `--silk-text-light` | `#F5F0E8` | Text on dark backgrounds — silk ivory |
| `--silk-border` | `#D4C5A920` | Subtle dividers — cocoon color at 12% opacity |
| `--silk-shimmer` | `linear-gradient(135deg, #C9A84C, #F5F0E8, #C9A84C)` | Animated shimmer effect for thread elements |

### Color Transition Rules

- **Movement I → II**: `--silk-deep` background fades to `--silk-ivory` as we move from darkness to ancient China
- **Movement II → III**: `--silk-jade` accents shift to `--silk-lapis` as we leave China for the road
- **Movement III climax**: `--silk-byzantine` dominates during the smuggling sequence
- **Movement III → IV**: `--silk-byzantine` cools to `--silk-crimson` (European silk wars)
- **Movement IV → V**: All colors gradually neutralize toward `--silk-gold` on `--silk-ivory` — the thread alone

---

## Typography

### Type Selection

**Primary serif: Georgia** (with `Palatino Linotype`, `Book Antiqua` fallbacks)

*Why Georgia:* Designed by Matthew Carter specifically for screen readability, Georgia carries the warmth of traditional serif type without the fragility of many book faces at small sizes. Its generous x-height and open counters make it highly legible on both dark and light backgrounds. For an essay about a 5,000-year-old material, we need a typeface that feels timeless without feeling antique — Georgia achieves this.

**Alternative if custom fonts available:** `Freight Text Pro` or `Lora` — both have the warmth and readability needed, with slightly more character than Georgia.

**Supporting sans-serif: system-ui** (with `-apple-system`, `Segoe UI`, `Roboto` fallbacks)

*Why system sans:* Captions, metadata, and interactive labels should recede — they're the frame, not the painting. System fonts render most crisply at small sizes and carry no cultural weight of their own.

**Monospace for dates: `SF Mono`, `Menlo`, `Monaco`**

*Why monospace for dates:* Timeline dates need to align visually. Monospace ensures numerical alignment and gives dates a distinct, documentary quality.

### Typography Scale

| Element | Family | Size | Weight | Line Height | Letter Spacing | Color |
|---------|--------|------|--------|-------------|----------------|-------|
| Movement titles | Serif | 3.5rem (56px) | 400 (regular) | 1.15 | +0.02em | `--silk-gold` on dark, `--silk-text-primary` on light |
| Chapter headings | Serif | 2.25rem (36px) | 600 (semibold) | 1.25 | +0.01em | `--silk-text-primary` |
| Body text | Serif | 1.125rem (18px) | 400 | 1.72 | normal | `--silk-text-primary` |
| Pull quotes | Serif italic | 1.5rem (24px) | 400 | 1.55 | +0.01em | Era accent color |
| Figure captions | Sans-serif | 0.875rem (14px) | 400 | 1.5 | +0.02em | `--silk-text-secondary` |
| Timeline dates | Monospace | 0.9375rem (15px) | 700 | 1.4 | +0.05em | `--silk-gold` |
| Interactive labels | Sans-serif | 0.8125rem (13px) | 500 | 1.4 | +0.04em | `--silk-text-secondary` |
| Blockquote attribution | Sans-serif small caps | 0.75rem (12px) | 500 | 1.5 | +0.08em | `--silk-text-secondary` |

### Typography Rules

1. **Body line length**: 65–75 characters maximum (optimal reading measure)
2. **Paragraph spacing**: 1.5× line height between paragraphs
3. **Drop caps**: Used only at Movement openings — 3-line drop, serif, `--silk-gold`
4. **Pull quotes**: Indented 2rem left, thin left border in era accent color, italic serif
5. **No bold in body text** — emphasis through italic only (bold competes with the visual density of photographs)

---

## Animation Philosophy

### Core Principle: "Move Like Silk"

Silk doesn't snap. It doesn't bounce. It unfurls, drapes, shimmers, and settles. Every animation in this essay should feel like fabric in motion — weighted but graceful, responsive but never frantic.

### Animation Specifications

| Category | Duration | Easing | Notes |
|----------|----------|--------|-------|
| **Hero reveal** | 1200ms | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Slow emergence — silk being drawn from darkness |
| **Scroll transitions** | 600ms | `cubic-bezier(0.22, 0.61, 0.36, 1)` | The "silk ease" — smooth deceleration with slight overshoot |
| **Hover states** | 200ms | `ease-out` | Quick response — silk responds to touch instantly |
| **Scroll-lock engage** | 400ms | `cubic-bezier(0.22, 0.61, 0.36, 1)` | Lock must feel like settling, not stopping |
| **Scroll-lock release** | 400ms | `cubic-bezier(0.55, 0.06, 0.68, 0.19)` | Release must feel like fabric lifting |
| **Image lazy load** | 800ms | `ease-in-out` | Fade-in from `--silk-cocoon` background |
| **MigrationTrail route line** | 80ms stagger per point | `linear` | Route draws itself — steady, relentless progress |
| **IngredientOracle reveal** | 300ms per item | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Each stage opens like unwrapping |
| **TimefoldSlider** | 400ms per era change | `cubic-bezier(0.22, 0.61, 0.36, 1)` | Smooth era transitions |
| **Color transitions (era)** | 2000ms | `linear` | Gradual — the reader shouldn't notice the shift |
| **Parallax smoothing** | 16ms throttle | `will-change: transform` | Performance — no jank |

### The "Shimmer" Effect

A signature animation unique to this essay: a subtle light refraction that plays across silk-gold elements. Implementation:

```css
@keyframes silk-shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.shimmer {
  background: linear-gradient(
    135deg,
    var(--silk-gold) 0%,
    var(--silk-ivory) 45%,
    var(--silk-gold) 55%,
    var(--silk-ivory) 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: silk-shimmer 4s ease-in-out infinite;
}
```

Used on: progress thread, Movement titles (on dark backgrounds), and the final revelation text.

### Reduced Motion

When `prefers-reduced-motion: reduce` is active:
- All animation durations → 0ms
- Parallax → disabled (all layers at 1.0× scroll)
- Scroll-lock → disabled (simple scroll continues)
- Shimmer effect → static gradient (no animation)
- Image lazy-load → instant (no fade)
- Era color transitions → instant

---

## Photography Treatment

### General Processing

All photographs receive a baseline treatment to create visual cohesion:

1. **Warm undertone**: +5% warmth across all photos (silk is never cold)
2. **Slight vignette**: 10% edge darkening (intimacy, focus)
3. **Grain**: 3% film grain at desktop, 0% on mobile (performance)
4. **Contrast**: Lifted blacks (+10 shadows) — silk reflects light even in shadow

### Era-Specific Processing

| Era | Color Temp | Saturation | Grain | Special |
|-----|-----------|------------|-------|---------|
| Neolithic/Ancient China | +15% warm | Normal | 5% | Soft focus edges |
| Silk Road | +10% warm | +10% | 3% | Wide crop, landscape emphasis |
| Byzantine | +5% warm | +15% | 2% | Deep shadows, jewel tones boosted |
| European | Neutral | +5% | 4% | Painterly contrast |
| Modern | Neutral | Normal | 0% | Sharp, editorial |

### Image Layout Rules

1. **Full-bleed heroes**: One per Movement (5 total). Edge-to-edge, no padding. Min height: 80vh.
2. **Inline photographs**: Max width 100% of content column. Rounded corners: 2px (subtle).
3. **Photo pairs**: Side-by-side at ≥768px, stacked below. Used for before/after and comparison.
4. **Photo sequences**: Horizontal scroll at ≥1200px, vertical stack below. Used for IngredientOracle.
5. **Caption placement**: Below image, left-aligned, `--silk-text-secondary`, 14px sans-serif.

---

## Layout & Spacing

### Content Grid

```
Desktop (≥1200px):
┌──────────────────────────────────────────────────┐
│  Progress Thread (left, fixed)                    │
│  ┌──────────────────────────────────────────────┐│
│  │          Content Column (max-width: 720px)   ││
│  │          centered                             ││
│  └──────────────────────────────────────────────┘│
│  Full-bleed images break out of content column    │
└──────────────────────────────────────────────────┘

Mobile (≤767px):
┌──────────────────┐
│  Content Column   │
│  (full width,     │
│   16px padding)   │
│                   │
│  No progress      │
│  thread (hidden)  │
└──────────────────┘
```

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 0.5rem (8px) | Caption gaps, inline spacing |
| `--space-sm` | 1rem (16px) | Paragraph gaps, card padding |
| `--space-md` | 2rem (32px) | Section breaks within movements |
| `--space-lg` | 4rem (64px) | Movement transitions |
| `--space-xl` | 8rem (128px) | Movement spacers (breathing room) |
| `--space-hero` | 100vh | Full-viewport hero sections |

---

## Interaction Design

### MigrationTrail — The Silk Road

**Visual**: Minimalist map on `--silk-sand` background. Route line in `--silk-gold`. Stops as dots that expand on hover/focus to reveal photograph + caption.

**Map style**: Not photorealistic — abstracted terrain with just enough geography (coastlines, mountain ridges, desert shading) to orient. Think: beautiful information design, not Google Maps.

### IngredientOracle — Sericulture

**Visual**: Horizontal row of circular photograph thumbnails on `--silk-ivory`. Each circle has a thin `--silk-gold` border. Tap/click to expand into full card with photograph + revelation text. Active item pulses with shimmer effect.

### TimefoldSlider — 5,000 Years

**Visual**: Horizontal timeline on `--silk-deep` background. Era dots in `--silk-gold`. Slider handle is a small silk thread spool icon. Current era expands into photograph + caption. Past eras dim; future eras brighten.

---

## Summary of Design Tokens

```css
:root {
  /* Primary */
  --silk-gold: #C9A84C;
  --silk-ivory: #F5F0E8;
  --silk-deep: #1A1510;
  --silk-cocoon: #E8DCC8;
  
  /* Era accents */
  --silk-mulberry: #6B3A5C;
  --silk-jade: #4A7C59;
  --silk-lapis: #264B8C;
  --silk-sand: #D4C5A9;
  --silk-byzantine: #6B2D75;
  --silk-mosaic: #C4A235;
  --silk-crimson: #8B1A1A;
  --silk-lyon: #D4AF37;
  
  /* Functional */
  --silk-text-primary: #2C2416;
  --silk-text-secondary: #6B6152;
  --silk-text-light: #F5F0E8;
  --silk-border: rgba(212, 197, 169, 0.12);
  
  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;
  --space-hero: 100vh;
  
  /* Animation */
  --ease-silk: cubic-bezier(0.22, 0.61, 0.36, 1);
  --ease-enter: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-exit: cubic-bezier(0.55, 0.06, 0.68, 0.19);
  --duration-fast: 200ms;
  --duration-base: 600ms;
  --duration-slow: 1200ms;
  --duration-era: 2000ms;
}
```
