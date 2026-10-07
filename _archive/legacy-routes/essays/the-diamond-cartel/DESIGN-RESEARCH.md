# Design Research Report: The Diamond Cartel

## Subject Visual Archaeology Findings

### Primary Materials
- **Diamonds**: Clear crystalline carbon, prismatic light refraction, cold brilliance
- **Mine equipment**: Iron, steel, rust, wood scaffolding
- **African earth**: Red laterite soil, clay, rock
- **Velvet and silk**: Luxury presentation materials (ring boxes, display cases)
- **Gold**: Settings, jewelry, wealth
- **Paper**: Advertisements, stock certificates, corporate documents
- **Blood**: The human cost—deep crimson

### Historical Color Associations
- **Diamond brilliance**: Pure white, prismatic rainbows (#FFFFFF, #E8E8E8)
- **African mining soil**: Deep terracotta red (#8B4513, #CD5C5C)
- **Colonial era**: Sepia, aged ivory (#F5DEB3, #D2B48C)
- **Corporate power**: Navy, charcoal, gold (#1A1A2E, #4A4A4A, #D4AF37)
- **Advertising golden age**: Warm cream, rose pink (#FAEBD7, #FFB6C1)
- **Blood diamonds**: Crimson, dried blood (#8B0000, #660000)
- **Lab diamonds**: Clinical blue, sterile white (#87CEEB, #F0F8FF)

### Recurring Visual Motifs
- The diamond shape (◇) — aspiration, value, eternity
- The engagement ring — manufactured tradition
- Mining pits — extraction, exploitation
- Velvet boxes — luxury presentation
- Advertising imagery — manufactured desire
- African landscapes — colonial backdrop
- Corporate boardrooms — power and control
- Severed hands — blood diamond atrocities (used sparingly, with content warning)

### Era-Specific Aesthetics
| Era | Visual Treatment |
|-----|------------------|
| 1867-1900 | High-contrast B&W, sepia tones, colonial photography grain |
| 1900-1938 | Formal B&W portraits, imperial aesthetic, power compositions |
| 1938-1960 | Golden age advertising, warm Kodachrome, aspirational romance |
| 1960-1990 | Commercial color, split between glamour (ads) and harsh (mining) |
| 1990-2003 | Documentary realism, unflinching journalism, desaturated conflict |
| 2003-present | Contemporary clean, clinical lab aesthetics, uncertain futures |

---

## Proposed Color Palette

### Primary Palette
```css
--color-bg-primary: #0D0D0D;       /* Carbon black — diamond's origin */
--color-bg-secondary: #1A1A1A;     /* Elevated surfaces */
--color-bg-tertiary: #242424;      /* Card backgrounds */
```

### Accent Colors
```css
--color-diamond-white: #E8E8E8;    /* Diamond brilliance — aspiration */
--color-antique-gold: #8B7355;     /* Wealth, corruption, colonial era */
--color-blood-red: #8B0000;        /* Exploitation, conflict, cost */
--color-romance-pink: #FFB6C1;     /* Advertising, manufactured desire */
--color-lab-blue: #87CEEB;         /* Technology, future, transparency */
--color-cartel-gray: #4A4A4A;      /* Corporate control, monopoly */
```

### Text Colors
```css
--color-text-primary: #F5F5F5;     /* 95% opacity on dark */
--color-text-secondary: #A0A0A0;   /* Muted text */
--color-text-faint: #666666;       /* Captions, metadata */
```

### Semantic Colors
```css
--color-era-colonial: #D2B48C;     /* Sepia warmth */
--color-era-golden: #FFD700;       /* Advertising golden age */
--color-era-blood: #660000;        /* Conflict diamond era */
--color-era-modern: #B0C4DE;       /* Contemporary neutrality */
```

---

## Typography Stack

### Display Font
**Playfair Display** — Elegant, old-money serif with sharp contrast
- Evokes luxury, tradition, the world De Beers created
- High contrast reflects diamond brilliance
- Historical gravitas appropriate for century-spanning narrative

### Body Font  
**Inter** — Clean, modern, highly readable
- Professional without being cold
- Excellent rendering at small sizes (mobile)
- Neutral enough to not compete with emotional content

### Quote Font
**Cormorant Garamond** (Italic) — Archival, literary voice
- Classic book typography
- Italics convey spoken words, historical quotes
- Bridges academic rigor with accessible storytelling

### Data Font
**JetBrains Mono** — Cold precision for statistics
- Tabular numbers align properly
- Technical aesthetic for pricing, percentages
- Creates visual contrast with emotional content

### Era Markers
**Oswald** (Light, Uppercase, Letter-spaced) — Timeline navigation
- Industrial, utilitarian
- Works at small sizes
- Clear wayfinding without decoration

---

## Animation Philosophy

### Overall Tempo
**Variable by era and content:**
- Colonial/Mining sections: Slower, weighted (600-800ms)
- Advertising sections: Snappier, more energetic (300-500ms)
- Blood diamond sections: Deliberate, uncomfortable pauses (800-1200ms)
- Modern sections: Quick, contemporary (250-400ms)

### Reveal Style
**"The Curtain Pull"** — Core metaphor throughout
- Content hidden behind dark overlays
- Scroll "pulls back curtain" to reveal truth
- Romantic imagery literally peels away to show exploitation beneath
- Visual metaphor for the essay's thesis: manufactured desire hiding reality

### Parallax Intensity
**Moderate to subtle (0.3x - 0.6x for backgrounds)**
- Subtle enough not to distract
- Creates depth without nausea
- More pronounced in hero, reduced in content-heavy sections

### Special Effects
- **Diamond sparkle particles**: Ambient layer, become blood drops in Ch. 6
- **Era color grading shifts**: Scroll-driven processing changes (sepia → color → desaturated)
- **Statistics builds**: Numbers animate up like stock tickers
- **Comparison sliders**: Drag to reveal "advertising vs. reality"
- **Fracturing glass**: Hero image shatters to reveal mining beneath

### Easing
```css
--ease-reveal: cubic-bezier(0.25, 0.1, 0.25, 1.0);     /* Smooth, weighted */
--ease-dramatic: cubic-bezier(0.16, 1, 0.3, 1);        /* Snappy entrance */
--ease-uncomfortable: cubic-bezier(0.4, 0, 0.2, 1);    /* Deliberate, heavy */
```

---

## Visual Motifs

### Decorative Elements
- **Diamond shapes (◇)**: Section dividers, bullet points, progress markers
- **Ring silhouettes**: Chapter headers for marketing-related sections
- **Pickaxe icons**: Mining/exploitation sections
- **Price tags**: Statistics, "cost of love" metaphor
- **Velvet texture**: Luxury sections, advertising era
- **Cracked earth**: Exploitation, environmental cost

### Section Transitions
- **Glamour → Reality**: Color saturation drains as scroll reveals truth
- **Romance → Exploitation**: Pink warms to blood red
- **Past → Present**: Grain/noise reduces, clarity increases
- **Myth → Truth**: Soft focus sharpens to documentary clarity

### Progress Indicator Concept
**"The Diamond Pipeline"** — Subject-specific progress bar
- Vertical pipeline on left edge (mobile: bottom)
- Shows journey from mine to finger
- Icons at chapter markers: pickaxe → sorting → camera → ring
- Color shifts based on content (red underground, gold marketing, clear modern)
- Current position shown as pulsing diamond that changes color

---

## Differentiation Check

### How This Differs From Other Esy Visual Essays
1. **Era-based color grading**: Most essays have consistent palette; this one shifts dramatically
2. **Dual reality motif**: Split-screen advertising/exploitation comparisons unique
3. **Manufactured desire thesis**: Meta-commentary on marketing itself
4. **Violence content warnings**: Blood diamond content requires explicit warnings
5. **Statistics as weapon**: Numbers deployed to shock, not just inform
6. **Diamond pipeline progress**: Progress bar is subject-specific, not generic

### What Makes This Design Unmistakably "About Diamonds"
- Diamond shape (◇) used throughout as decorative motif
- Brilliance/sparkle particles in ambient layer
- Velvet textures in luxury sections
- Ring silhouettes as chapter markers
- "Forever" typography treatment (dissolving letters)
- Contrast between pristine white and blood red

### Topic-Specific Interactive Element
**"The Two Hands"** — Only possible in a diamond story
- Scroll reveals elegant hand with engagement ring
- Below it, child miner's hand offering rough diamond
- As hands approach, child's arm revealed as amputee stump
- Ring sparkles above the stump
- This interaction cannot exist in any other story

---

## Layout Pattern Plan

| Section | Layout | Notes |
|---------|--------|-------|
| Hero | `scroll-lock-fullbleed` | Fracturing romantic image |
| Ch 1: The Soil Ran Red | `sticky-scroll` | Descent into mine as sticky |
| Ch 2: Man Who Would Be King | `split-screen` | Rhodes portrait left, text right |
| Ch 3: Monopoly Machine | `timeline` | Pipeline visualization |
| Ch 4: Manufacturing Desire | `comparison` | Ad imagery vs. reality |
| Ch 5: Two-Month Rule | `data-viz` | Statistics build, calculator |
| Ch 6: Blood Diamonds | `full-bleed` | Documentary imagery (warning) |
| Ch 7: Unraveling | `split-screen` | Market share decline |
| Ch 8: End of Forever | `comparison` | Lab vs. natural diamond |

**Layout Diversity**: 5 distinct patterns (scroll-lock, sticky-scroll, split-screen, timeline, comparison, data-viz, full-bleed)
**Consecutive Same**: ❌ None — ✅ APPROVED

---

## Mobile Considerations

### Touch Interactions
- Comparison sliders work with swipe gestures
- Statistics build on viewport entry (no tap required)
- Content warnings require explicit tap to continue
- Skip buttons always visible for scroll-lock sequences

### Typography Scaling
```css
/* Mobile base */
--font-size-body: 18px;
--font-size-headline: 2rem;
--font-size-quote: 1.25rem;

/* Desktop enhancement */
@media (min-width: 768px) {
  --font-size-body: 20px;
  --font-size-headline: 3rem;
  --font-size-quote: 1.5rem;
}
```

### Performance Budget
- Max 3 simultaneous animations
- Parallax reduced to 2 layers on mobile
- Diamond sparkle particles reduced from 50 to 20 on mobile
- Era transitions simplified (instant vs. 2s crossfade)

---

*This design research ensures the Diamond Cartel visual essay has a unique identity derived from its subject matter—the contrast between manufactured luxury and exploited reality, the shift from romance to revelation, and the visual language of brilliance built on blood.*












