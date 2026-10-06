---
gate: G7
essay: turkana-boy
auditor: scroll-certification-agent
status: PASS
scroll_score: 8.1
date: 2026-03-05
---

# Scroll Certification — Turkana Boy

## Scroll Certification

### 1. Visual Density and Progression

The essay contains multiple image blocks, seven implemented visualizations, and sectioned evidence panels. Scroll progression is varied enough to avoid long text-only dead zones.

### 2. Image Usage

The client component references more than five images from the `IMAGES` constant, and figure rendering is distributed across the essay rather than clustered in one place.

### 3. Lazy Loading

Lazy loading is present in the implementation, including essay photography and side figures. This supports lower scroll cost below the fold.

### 4. Responsive Layout

The essay CSS includes mobile breakpoints for:

- hero collapse
- two-column prose collapse
- image-grid collapse
- source-column collapse

### 5. Horizontal Overflow Risk

No obvious horizontal-overflow risk is present in the authored layout. Major grid structures collapse at smaller widths, and large SVGs are width-constrained.

### 6. Reduced Motion / Motion Restraint

The essay is motion-light by construction. No aggressive scroll-lock or heavy animation systems are present in the current implementation, reducing performance risk.

---

**Score: 8.1/10**

No Tier 1 failures detected from source inspection. Real device and browser verification is still recommended before final deployment, but the implementation clears the certification threshold on code-level review.
