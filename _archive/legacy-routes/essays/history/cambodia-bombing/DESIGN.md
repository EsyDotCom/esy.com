# Design System: CAMBODIA BOMBED (1965–1973)

## Design Philosophy

### Core Concept: "Declassification as Visual Journey"

The essay's visual language mirrors the transformation of classified information becoming public knowledge. Design elements progress from obscured/redacted states to revealed/clear states as the reader advances.

**Visual Metaphor**: A document emerging from darkness—stamps peeling, redaction bars lifting, truth surfacing.

### Aesthetic Anchors

1. **Archival Documentary** — Not slick war documentary, but raw archival footage aesthetic
2. **Institutional Bureaucracy** — The horror is in the paperwork, the codes, the procedures
3. **Cambodian Earth** — Laterite soil, monsoon skies, palm forests as grounding colors
4. **Forensic Precision** — Data visualization with scholarly rigor

---

## Color System

### Primary Palette

| Name | Hex | RGB | Usage | Rationale |
|------|-----|-----|-------|-----------|
| **Laterite Earth** | `#8B4513` | 139, 69, 19 | Accent, borders, emphasis | Cambodian laterite soil—the earth that absorbed the bombs |
| **Monsoon Slate** | `#2F4F4F` | 47, 79, 79 | Primary backgrounds, headers | The overcast skies of rainy season Cambodia |
| **Palm-Leaf Green** | `#228B22` | 34, 139, 34 | Hope, contemporary, clearance | Cambodia's forests, regrowth, demining success |
| **Document Cream** | `#F5F5DC` | 245, 245, 220 | Paper texture, document backgrounds | Aged archival paper |
| **Redaction Black** | `#1A1A1A` | 26, 26, 26 | Classification bars, deep backgrounds | The void of secrecy |

### Secondary Palette

| Name | Hex | RGB | Usage | Rationale |
|------|-----|-----|-------|-----------|
| **Blood Rust** | `#8B0000` | 139, 0, 0 | Warnings, casualties, UXO | Danger, lives lost |
| **Archive Yellow** | `#DAA520` | 218, 165, 32 | Stamps, dates, aging | Declassified stamps, aged documents |
| **Teletype Gray** | `#696969` | 105, 105, 105 | Secondary text, captions | Typewriter ribbon, mimeograph |
| **Photograph Sepia** | `#704214` | 112, 66, 20 | Image overlays (1960s-70s) | Period photography tint |
| **Contemporary White** | `#FAFAFA` | 250, 250, 250 | Modern sections, clarity | Present-day clearance work |

### Semantic Colors

| Purpose | Color | Usage |
|---------|-------|-------|
| **Classification** | Redaction Black | Classified content, bars |
| **Revelation** | Document Cream | Declassified, revealed |
| **Danger/Warning** | Blood Rust | Content warnings, UXO |
| **Hope/Progress** | Palm-Leaf Green | Clearance, contemporary |
| **Historical** | Photograph Sepia | 1960s-70s imagery |
| **Data/Statistics** | Archive Yellow | Numbers, charts, emphasis |

### Gradient Progressions

```css
/* Classification to Revelation */
--gradient-declassify: linear-gradient(
  to right,
  #1A1A1A 0%,
  #696969 40%,
  #DAA520 70%,
  #F5F5DC 100%
);

/* Historical to Contemporary */
--gradient-era: linear-gradient(
  to bottom,
  #704214 0%,
  #8B4513 50%,
  #228B22 100%
);

/* Danger Zone */
--gradient-uxo: linear-gradient(
  135deg,
  #8B0000 0%,
  #1A1A1A 100%
);
```

---

## Typography System

### Font Stack

```css
/* Headlines - Documentary gravitas */
--font-headline: 'Playfair Display', Georgia, 'Times New Roman', serif;

/* Body - Clean readability */
--font-body: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, sans-serif;

/* Documents/Quotes - Teletype feel */
--font-document: 'Courier Prime', 'Courier New', monospace;

/* Data/Statistics - Technical precision */
--font-data: 'IBM Plex Mono', 'SF Mono', 'Consolas', monospace;

/* Khmer Script (for Cambodian terms) */
--font-khmer: 'Noto Sans Khmer', sans-serif;
```

### Type Scale

| Level | Size (rem) | Line Height | Weight | Font | Usage |
|-------|------------|-------------|--------|------|-------|
| **Display** | 4.5 | 1.1 | 700 | Playfair | Essay title only |
| **H1** | 3.0 | 1.2 | 700 | Playfair | Chapter titles |
| **H2** | 2.25 | 1.25 | 600 | Playfair | Section headers |
| **H3** | 1.5 | 1.3 | 600 | Source Sans | Subsections |
| **Body Large** | 1.25 | 1.6 | 400 | Source Sans | Lead paragraphs |
| **Body** | 1.0 | 1.7 | 400 | Source Sans | Main text |
| **Quote** | 1.125 | 1.5 | 400 | Courier Prime | Document quotes |
| **Caption** | 0.875 | 1.4 | 300 | Source Sans | Image captions |
| **Data** | 0.875 | 1.3 | 500 | IBM Plex Mono | Statistics, dates |
| **Micro** | 0.75 | 1.3 | 400 | Source Sans | Citations, footnotes |

### Quote Styling

```css
/* Primary document quotes */
.quote-document {
  font-family: var(--font-document);
  font-size: 1.125rem;
  line-height: 1.5;
  color: #1A1A1A;
  background: #F5F5DC;
  padding: 1.5rem 2rem;
  border-left: 4px solid #DAA520;
  position: relative;
}

.quote-document::before {
  content: 'DECLASSIFIED';
  position: absolute;
  top: -0.75rem;
  left: 1rem;
  font-size: 0.625rem;
  letter-spacing: 0.1em;
  color: #8B0000;
  background: #F5F5DC;
  padding: 0.125rem 0.5rem;
}

/* Kissinger/Nixon quotes - more dramatic */
.quote-principal {
  font-family: var(--font-document);
  font-size: 1.5rem;
  line-height: 1.4;
  color: #FAFAFA;
  background: #1A1A1A;
  padding: 2rem 2.5rem;
  border: 1px solid #DAA520;
}
```

---

## Era Treatments

### 1965-1973: The War Years

```css
.era-war {
  /* Color grading */
  filter:
    sepia(15%)
    saturate(85%)
    contrast(105%);

  /* Film grain overlay */
  background-image: url('/textures/grain-heavy.png');
  background-blend-mode: overlay;

  /* Vignette */
  box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.4);
}

.era-war-bw {
  filter:
    grayscale(100%)
    contrast(110%)
    brightness(95%);
  background-image: url('/textures/grain-heavy.png');
  background-blend-mode: overlay;
}
```

### 1973-2000: Post-War / Declassification

```css
.era-postwar {
  filter:
    sepia(8%)
    saturate(90%)
    contrast(102%);

  background-image: url('/textures/grain-light.png');
  background-blend-mode: soft-light;
}
```

### 2000-Present: Contemporary

```css
.era-contemporary {
  /* Clean, sharp, full color */
  filter: none;

  /* No grain */
  background-image: none;

  /* Subtle lift for hope */
  filter: brightness(102%) saturate(105%);
}
```

---

## Component Patterns

### Classification Bar (Progress Indicator)

```css
.classification-bar {
  height: 48px;
  background: #1A1A1A;
  position: relative;
  overflow: hidden;
}

.classification-bar__text {
  font-family: var(--font-document);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #FAFAFA;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.classification-bar__reveal {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent 0%,
    #DAA520 50%,
    #F5F5DC 100%
  );
  transition: width 0.3s ease-out;
}

/* States */
.classification-bar[data-status="classified"] { /* 0-15% */ }
.classification-bar[data-status="leaked"] { /* 15-30% */ }
.classification-bar[data-status="denied"] { /* 30-45% */ }
.classification-bar[data-status="debated"] { /* 45-65% */ }
.classification-bar[data-status="declassified"] { /* 65-85% */ }
.classification-bar[data-status="unfinished"] { /* 85-100% */ }
```

### Document Card

```css
.document-card {
  background: #F5F5DC;
  border: 1px solid #8B4513;
  padding: 1.5rem;
  position: relative;
  box-shadow:
    2px 2px 0 #8B4513,
    4px 4px 8px rgba(0, 0, 0, 0.2);
}

.document-card__stamp {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-family: var(--font-document);
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  color: #8B0000;
  border: 2px solid #8B0000;
  padding: 0.25rem 0.5rem;
  transform: rotate(-5deg);
}

.document-card__date {
  font-family: var(--font-data);
  font-size: 0.75rem;
  color: #696969;
  margin-bottom: 0.5rem;
}

.document-card__content {
  font-family: var(--font-document);
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #1A1A1A;
}
```

### Figure Profile Card

```css
.figure-card {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #2F4F4F;
  border-left: 4px solid #DAA520;
}

.figure-card__image {
  width: 120px;
  height: 150px;
  object-fit: cover;
  filter: sepia(10%) contrast(105%);
  border: 2px solid #F5F5DC;
}

.figure-card__name {
  font-family: var(--font-headline);
  font-size: 1.25rem;
  font-weight: 600;
  color: #F5F5DC;
  margin-bottom: 0.25rem;
}

.figure-card__role {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-style: italic;
  color: #DAA520;
  margin-bottom: 1rem;
}

.figure-card__quote {
  font-family: var(--font-document);
  font-size: 0.9375rem;
  color: #FAFAFA;
  padding-left: 1rem;
  border-left: 2px solid #DAA520;
}
```

### Statistics Block

```css
.stats-block {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  background: #1A1A1A;
}

.stat-item {
  text-align: center;
}

.stat-item__number {
  font-family: var(--font-data);
  font-size: 2.5rem;
  font-weight: 700;
  color: #DAA520;
  line-height: 1;
}

.stat-item__label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #696969;
  margin-top: 0.5rem;
}

.stat-item__source {
  font-family: var(--font-body);
  font-size: 0.625rem;
  color: #4a4a4a;
  margin-top: 0.25rem;
}
```

### Before/After Slider

```css
.comparison-slider {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16/9;
}

.comparison-slider__before,
.comparison-slider__after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.comparison-slider__before {
  filter: sepia(15%) contrast(105%);
}

.comparison-slider__after {
  clip-path: inset(0 0 0 50%);
}

.comparison-slider__handle {
  position: absolute;
  top: 0;
  left: 50%;
  width: 4px;
  height: 100%;
  background: #DAA520;
  cursor: ew-resize;
}

.comparison-slider__label {
  position: absolute;
  bottom: 1rem;
  font-family: var(--font-data);
  font-size: 0.75rem;
  color: #FAFAFA;
  background: rgba(26, 26, 26, 0.8);
  padding: 0.25rem 0.75rem;
}

.comparison-slider__label--before { left: 1rem; }
.comparison-slider__label--after { right: 1rem; }
```

### Content Warning

```css
.content-warning {
  background: linear-gradient(135deg, #8B0000 0%, #1A1A1A 100%);
  border: 2px solid #8B0000;
  padding: 1.5rem;
  margin: 2rem 0;
}

.content-warning__icon {
  width: 24px;
  height: 24px;
  fill: #FAFAFA;
  margin-bottom: 0.75rem;
}

.content-warning__title {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #FAFAFA;
  margin-bottom: 0.5rem;
}

.content-warning__text {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: #F5F5DC;
  margin-bottom: 1rem;
}

.content-warning__actions {
  display: flex;
  gap: 1rem;
}

.content-warning__btn {
  font-family: var(--font-body);
  font-size: 0.875rem;
  padding: 0.5rem 1.5rem;
  border: none;
  cursor: pointer;
}

.content-warning__btn--continue {
  background: #F5F5DC;
  color: #1A1A1A;
}

.content-warning__btn--skip {
  background: transparent;
  color: #F5F5DC;
  border: 1px solid #F5F5DC;
}
```

---

## Animation Specifications

### Scroll-Lock Transitions

```css
/* Entering scroll-lock */
.scroll-lock-enter {
  animation: lock-in 400ms ease-out forwards;
}

@keyframes lock-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Exiting scroll-lock */
.scroll-lock-exit {
  animation: lock-out 300ms ease-in forwards;
}

@keyframes lock-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}
```

### Document Reveal

```css
.document-reveal {
  animation: reveal 600ms ease-in-out forwards;
}

@keyframes reveal {
  0% {
    clip-path: inset(0 100% 0 0);
    filter: blur(4px);
  }
  50% {
    clip-path: inset(0 50% 0 0);
    filter: blur(2px);
  }
  100% {
    clip-path: inset(0 0 0 0);
    filter: blur(0);
  }
}
```

### Quote Typing Effect

```css
.quote-typing {
  overflow: hidden;
  border-right: 2px solid #DAA520;
  white-space: nowrap;
  animation:
    typing 3s steps(40, end),
    blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink-caret {
  from, to { border-color: transparent; }
  50% { border-color: #DAA520; }
}
```

### Parallax Layer Speeds

```css
:root {
  --parallax-bg: 0.3;      /* Background: slowest */
  --parallax-mid: 0.6;     /* Mid-ground */
  --parallax-subject: 1.0; /* Subject: scroll speed */
  --parallax-overlay: 1.2; /* Overlay: slightly faster */
  --parallax-ambient: 0.1; /* Ambient: barely moves */
}
```

### Stagger Timing

```css
/* Document elements entering */
.stagger-docs > * {
  animation: fade-up 400ms ease-out forwards;
  opacity: 0;
}

.stagger-docs > *:nth-child(1) { animation-delay: 0ms; }
.stagger-docs > *:nth-child(2) { animation-delay: 100ms; }
.stagger-docs > *:nth-child(3) { animation-delay: 200ms; }
.stagger-docs > *:nth-child(4) { animation-delay: 300ms; }

/* Statistics counting up */
.stagger-stats > * {
  animation: count-in 300ms ease-out forwards;
  opacity: 0;
}

.stagger-stats > *:nth-child(1) { animation-delay: 0ms; }
.stagger-stats > *:nth-child(2) { animation-delay: 150ms; }
.stagger-stats > *:nth-child(3) { animation-delay: 300ms; }
.stagger-stats > *:nth-child(4) { animation-delay: 450ms; }
```

---

## Texture Assets Required

| Asset | Description | Usage |
|-------|-------------|-------|
| `grain-heavy.png` | Dense film grain (4-6% opacity) | War years imagery |
| `grain-light.png` | Subtle film grain (2-3% opacity) | Post-war sections |
| `paper-texture.jpg` | Aged document paper | Document cards |
| `declassified-stamp.svg` | "DECLASSIFIED" stamp graphic | Document overlays |
| `classified-stamp.svg` | "CLASSIFIED" stamp graphic | Initial states |
| `top-secret-stamp.svg` | "TOP SECRET" stamp graphic | Key documents |
| `redaction-bar.svg` | Black redaction bar | Text censorship effect |

---

## Responsive Breakpoints

```css
/* Mobile first */
:root {
  --container-max: 100%;
  --parallax-enabled: false;
  --scroll-lock-enabled: false;
}

/* Tablet */
@media (min-width: 768px) {
  :root {
    --container-max: 720px;
    --parallax-enabled: true;
    --scroll-lock-enabled: true;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  :root {
    --container-max: 960px;
  }
}

/* Large Desktop */
@media (min-width: 1280px) {
  :root {
    --container-max: 1140px;
  }
}

/* Ultra-wide */
@media (min-width: 1536px) {
  :root {
    --container-max: 1320px;
  }
}
```

---

## Accessibility Overrides

```css
/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .scroll-lock {
    /* Instant transitions instead of scroll-locked animations */
    position: static !important;
  }

  .parallax-layer {
    transform: none !important;
  }
}

/* High contrast */
@media (prefers-contrast: high) {
  :root {
    --redaction-black: #000000;
    --document-cream: #FFFFFF;
    --archive-yellow: #FFD700;
  }

  .document-card {
    border-width: 2px;
  }
}

/* Focus indicators */
:focus-visible {
  outline: 3px solid #DAA520;
  outline-offset: 2px;
}

button:focus-visible,
a:focus-visible {
  outline: 3px solid #DAA520;
  outline-offset: 2px;
}
```

---

## Dark Mode Considerations

This essay uses a predominantly dark palette by design (reflecting the gravity of subject matter). No light/dark toggle required—the dark aesthetic is intentional and thematic.

---

## CSS Custom Properties Summary

```css
:root {
  /* Colors */
  --color-laterite: #8B4513;
  --color-monsoon: #2F4F4F;
  --color-palm: #228B22;
  --color-cream: #F5F5DC;
  --color-black: #1A1A1A;
  --color-rust: #8B0000;
  --color-yellow: #DAA520;
  --color-gray: #696969;
  --color-sepia: #704214;
  --color-white: #FAFAFA;

  /* Typography */
  --font-headline: 'Playfair Display', Georgia, serif;
  --font-body: 'Source Sans Pro', sans-serif;
  --font-document: 'Courier Prime', monospace;
  --font-data: 'IBM Plex Mono', monospace;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;

  /* Timing */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 600ms;
  --easing-default: ease-out;
  --easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* Parallax */
  --parallax-bg: 0.3;
  --parallax-mid: 0.6;
  --parallax-subject: 1.0;
  --parallax-overlay: 1.2;
}
```

---

*Design System generated: December 29, 2024*
*Status: DRAFT — Awaiting Gate 4 Approval*
