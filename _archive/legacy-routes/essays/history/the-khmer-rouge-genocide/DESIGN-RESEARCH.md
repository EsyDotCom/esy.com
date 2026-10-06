# Design Research Report: Year Zero, Visualized

**Subject**: Cambodia's Civil War and the Khmer Rouge Genocide
**Generated**: December 29, 2025
**Status**: GATE 4 DELIVERABLE

---

## 1. Visual Archaeology: Subject-Derived Design Sources

### 1.1 Material Culture Analysis

**Cambodian Lacquer Traditions**
- Traditional Cambodian lacquerware uses deep black base (natural lacquer oxidation)
- Gilding with gold leaf creates luminous accents
- Red lacquer used sparingly for sacred objects
- Relevant: Memorial objects, ceremonial items, temple decorations

**Angkor Sandstone**
- Warm gray-brown sandstone (laterite and sandstone)
- Lichen-covered surfaces create gray-green patina
- Carved with precise relief work
- Relevant: Cultural heritage before destruction

**Rice Agriculture**
- Golden rice stalks at harvest
- Flooded paddies reflect sky (silver-blue)
- Green during growing season
- Relevant: Forced collectivization, starvation policy, agricultural imagery

**Regime Documentation**
- S-21 intake photographs: harsh flash, neutral backgrounds
- Documents: typewritten on thin paper, stamps, bureaucratic red
- ID cards: clinical, standardized format
- Relevant: Bureaucracy of terror, administrative violence

**Memorial Stupa (Choeung Ek)**
- White/cream exterior walls
- Multi-tiered Buddhist stupa architecture
- Glass panels containing skulls (white, bone)
- Flame ornament at pinnacle
- Relevant: Memory, witness, transformation of death into education

### 1.2 Color Derivation from Subject Materials

| Source Material | Derived Colors | Hex Values | Emotional Register |
|-----------------|----------------|------------|-------------------|
| Traditional lacquer | Deep black | `#0D0D0D` | Weight, gravity, mourning |
| Gold leaf gilding | Warm gold | `#C9A227` | Memorial, dignity, respect |
| Laterite sandstone | Warm clay | `#8B4513` | Pre-war Cambodia, heritage |
| Monsoon forest | Deep green | `#2E5A3C` | Nature, survival, recovery |
| Indochina night sky | Indigo | `#1A237E` | Cold War shadows, night |
| Bone/stupa exterior | Bone white | `#F5F2EB` | Memorial, witness, revelation |
| Warning (minimal) | Deep red-brown | `#6B0F1A` | Content warnings only |

**Color Philosophy:**
- **Black dominates** — Weight and gravity appropriate to genocide
- **Gold as memorial** — Borrowed from Buddhist tradition of gilding sacred objects; used for progress, respect
- **No bright red** — Avoid sensationalism; red appears only in content warnings
- **Warmth returns with recovery** — Post-1979 sections introduce green and warmer tones

### 1.3 Typography Research

**Historical Context:**
- French colonial administration used traditional French typography
- Khmer script: Brahmic abugida with characteristic curved forms
- Regime documents: Sans-serif typewriter fonts (bureaucratic)
- Modern Cambodia: Mix of Khmer and Latin scripts

**Typography Decisions:**

| Category | Font Choice | Rationale |
|----------|-------------|-----------|
| Headlines | Playfair Display (600) | Dignified serif with historical gravitas; editorial weight without frivolity |
| Body | Source Sans Pro | Neutral, highly readable; doesn't compete with heavy content |
| Khmer Script | Noto Sans Khmer | Google's comprehensive Khmer support; consistent with Noto family |
| Quotes | Playfair Display Italic | Distinguished from body; attribution clarity |
| Technical | JetBrains Mono | Legal case numbers, dates, document references |
| Captions | Source Sans Pro (300) | Light weight; unobtrusive metadata |

**Typography Philosophy:**
- Avoid decorative or playful fonts — inappropriate for genocide content
- Serif headlines convey historical weight and editorial seriousness
- Sans body maintains readability for long-form trauma content
- Khmer script used for terms, names, quotes where culturally appropriate

---

## 2. Era-Based Visual Processing

### 2.1 Era Treatment Specifications

| Era | Years | Visual Treatment | Color Processing | Texture |
|-----|-------|------------------|------------------|---------|
| Pre-War | 1863-1969 | Warm sepia, archival | Sepia tint (+15), saturation (-20) | Film grain, archival paper |
| Civil War | 1970-1975 | High contrast B&W | Full desaturation, contrast (+40) | Heavy grain, newsprint |
| Democratic Kampuchea | 1975-1979 | Stark, cold, clinical | Desaturation (-60), cool shift | Document texture, ID card |
| Post-1979 | 1979-1990s | Recovery palette | Gradual saturation return | Documentary photography |
| Justice Era | 1990s-present | Contemporary documentary | Full color, neutral processing | Clean digital |

### 2.2 Transition Logic

**Entering DK Era (1975):**
- Color drains progressively as scroll approaches Chapter 4
- Final 20% of Chapter 3 begins desaturation
- At Chapter 4 boundary: stark, cold palette in full effect

**Exiting DK Era (1979):**
- Color returns slowly through Chapter 9
- Green appears first (recovery, nature)
- Full warmth restored by Chapter 10 (Justice)

---

## 3. Animation Philosophy

### 3.1 Subject-Derived Motion Design

**Principle: Weight and Witness**

The Khmer Rouge's violence was systematic, bureaucratic, methodical. Animations must reflect this:
- **No playful motion** — No bounces, springs, or whimsical easing
- **No sudden reveals** — Respect the gravity of content
- **Slow, deliberate reveals** — Content emerges like documentary evidence
- **Witness perspective** — Reader is witness, not participant

**Animation Vocabulary:**

| Animation Type | Behavior | Easing | Duration |
|----------------|----------|--------|----------|
| Photo reveal | Fade + slight scale (1.02 → 1.0) | ease-out-quad | 600ms |
| Text reveal | Fade up, stagger lines | ease-out | 400ms (50ms stagger) |
| Parallax | Subtle depth separation | linear | continuous |
| Era transition | Cross-fade processing | ease-in-out | 800ms |
| Scroll-lock progress | Linear fill | linear | scroll-driven |

**Easing Curve:**
```css
/* Subject-derived: no bounces, no springs */
--ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);
```

### 3.2 Scroll-Lock Behavior

**Philosophy: Minimal Locking, Maximum Dignity**

Per user specification, scroll-lock is minimal (1-2 sequences maximum). When used:
- Lock announces itself (subtle visual cue)
- Progress indicator shows completion percentage
- Skip affordance always visible
- Unlock is smooth, not abrupt
- Content justifies the interruption

**Lock-Worthy Moments:**
1. **The Registry (Chapter 6)**: S-21 intake count rising—justified because numbers represent lives
2. **The Verdict (Chapter 10)**: ECCC timeline assembling—justified because justice took decades

---

## 4. Unique Visual Motifs

### 4.1 The Memorial Stupa (Progress Indicator)

**Concept**: The Choeung Ek memorial stupa serves as progress metaphor

**Design:**
- SVG stupa silhouette, vertically oriented
- Fills with warm gold light from bottom as reader progresses
- Tiers correspond to chapters
- Flame at pinnacle = essay completion

**Rationale:**
- Subject-derived (not arbitrary progress bar)
- Culturally resonant (Buddhist memorial tradition)
- Transforms from death-marker to education-marker

### 4.2 Documentary Frame

**Concept**: Photo frames suggest archival documentation

**Design:**
- Thin white border (1px) on archival photos
- Slight shadow suggesting layered documents
- Caption positioning below, not overlaid

**Rationale:**
- Evokes DC-Cam archive methodology
- Distinguishes documentary images from decorative elements

### 4.3 Evidence Card Pattern

**Concept**: Key statistics and quotes presented as "evidence cards"

**Design:**
- Cream/bone background (#F5F2EB)
- Thin gold border accent
- Citation always visible
- Slightly elevated (subtle shadow)

**Rationale:**
- Reinforces sourced, documented nature
- Creates visual hierarchy for key claims
- Invites reader to verify

---

## 5. Trauma-Informed Design Principles

### 5.1 Content Warning System

**Global Warning (Hero Section):**
- Visible before any scroll
- Clear, factual language
- No dramatic styling

**Chapter-Level Warnings:**
- Appear before distressing sections
- Announce specific content type
- Provide context without sensationalizing

### 5.2 Click-to-Reveal System

**Triggering Content:**
- Victim photographs (S-21)
- Mass grave imagery
- Graphic violence descriptions
- Remains/skulls (stupa interior)

**Reveal Design:**
- Blurred placeholder with description
- Clear "[Click to reveal]" label
- Confirmation step: "This image shows [description]. Reveal?"
- No auto-reveal on scroll

### 5.3 Pacing Considerations

**Recovery Moments:**
- After Chapter 6 (S-21), provide visual breathing room
- Chapter 7 (Legal Definition) is more abstract—allows emotional regulation
- Landscape/nature imagery in transitions

**Exit Affordances:**
- "Take a break" suggestions at chapter boundaries
- No shame language
- Resources link visible throughout

---

## 6. Accessibility Specifications

### 6.1 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  /* All parallax disabled */
  .parallax-layer { transform: none !important; }

  /* Scroll-lock becomes instant reveal */
  .scroll-lock-sequence { animation: none; opacity: 1; }

  /* Transitions become instant */
  * { transition-duration: 0.001ms !important; }
}
```

### 6.2 Color Contrast

| Element | Foreground | Background | Ratio | WCAG |
|---------|------------|------------|-------|------|
| Body text | #F5F2EB | #0D0D0D | 15.2:1 | AAA |
| Caption text | #A8A8A8 | #0D0D0D | 7.1:1 | AA |
| Gold accent | #C9A227 | #0D0D0D | 6.8:1 | AA |
| Link text | #C9A227 | #0D0D0D | 6.8:1 | AA |

### 6.3 Focus Management

- Visible focus rings (gold outline)
- Skip links for scroll-lock sequences
- Logical heading hierarchy
- ARIA labels for all interactive elements

---

## 7. Design System Summary

### 7.1 Color Tokens

```css
:root {
  /* Primary */
  --color-background: #0D0D0D;          /* Lacquer black */
  --color-surface: #1A1A1A;             /* Elevated black */
  --color-text-primary: #F5F2EB;        /* Bone white */
  --color-text-secondary: #A8A8A8;      /* Muted */

  /* Accents */
  --color-accent-primary: #C9A227;      /* Rice-stalk gold */
  --color-accent-warm: #8B4513;         /* Warm clay */
  --color-accent-cold: #1A237E;         /* Indigo night */
  --color-accent-recovery: #2E5A3C;     /* Monsoon green */

  /* Semantic */
  --color-warning: #6B0F1A;             /* Content warning only */
  --color-focus: #C9A227;               /* Focus rings */
}
```

### 7.2 Typography Tokens

```css
:root {
  /* Font Families */
  --font-headline: 'Playfair Display', Georgia, serif;
  --font-body: 'Source Sans Pro', system-ui, sans-serif;
  --font-khmer: 'Noto Sans Khmer', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Font Sizes */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 2rem;       /* 32px */
  --text-4xl: 2.5rem;     /* 40px */

  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

### 7.3 Animation Tokens

```css
:root {
  /* Durations */
  --duration-fast: 200ms;
  --duration-normal: 400ms;
  --duration-slow: 600ms;
  --duration-slower: 800ms;

  /* Easing */
  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);

  /* Stagger */
  --stagger-lines: 50ms;
  --stagger-cards: 100ms;

  /* Parallax */
  --parallax-bg: 0.3;
  --parallax-mid: 0.7;
  --parallax-subject: 1.0;
  --parallax-ambient: 0.2;
}
```

### 7.4 Spacing System

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-24: 6rem;     /* 96px */
}
```

---

## 8. Gate 4 Verification Checklist

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Color palette derived from subject | ✅ | Section 1.2: lacquer, gold leaf, sandstone, rice |
| Typography justified by era/character | ✅ | Section 1.3: historical weight, Khmer script support |
| Animation philosophy matches subject | ✅ | Section 3: weight, witness, no playfulness |
| Unique visual motifs identified | ✅ | Section 4: stupa progress, documentary frame |
| Visual identity is novel (not copied) | ✅ | All elements derived from subject archaeology |
| Trauma-informed principles applied | ✅ | Section 5: content warnings, click-to-reveal |
| Accessibility specified | ✅ | Section 6: reduced motion, contrast, focus |
| Design tokens documented | ✅ | Section 7: complete token system |

---

## 9. Implementation Notes for Production Orchestrator

1. **Use Design Research Report as visual foundation** — Do not invent colors or fonts
2. **Parallax ratios are specified** — Background 0.3x, Mid 0.7x, Subject 1.0x
3. **Era transitions are documented** — Follow processing specifications in Section 2
4. **Scroll-lock philosophy is minimal** — Maximum 2 sequences per user spec
5. **Click-to-reveal is mandatory** for distressing content — Follow Section 5.2
6. **Stupa progress bar** — Implement per Section 4.1 specifications
7. **All animations use specified easing** — No bounces, springs, or playful motion

---

*End of Design Research Report*
