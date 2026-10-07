# Scroll-Lock Fixes — "The Word Pussy"

## What was broken
- **Fixed positioning was ignored**: Scroll-lock containers sat inside `<Section>` elements that used CSS `transform` for entrance transitions, which breaks `position: fixed` on children. Result: locks never pinned; users scrolled straight past.
- **Inline style override**: A `position: relative` inline style on the branching lock’s `pinned-content` overrode the `.is-pinned { position: fixed; }` rule.
- **Too-short lock heights**: Early implementations used 175vh for branching/Victorian locks, causing them to unpin almost immediately.
- **Branching layout incorrect**: Static boxes instead of the spec’d word-duplication drift to corners; overlap persisted in final state.

## What we changed
- **Moved all scroll-lock components outside transformed `<Section>` wrappers** so fixed positioning works:
  - `ScrollLockBranching`
  - `ScrollLock1583`
  - `ScrollLockJohnson`
  - `ScrollLockVictorian`
- **Removed inline `position: relative`** from branching `pinned-content` so `.is-pinned` applies.
- **Set explicit height on pinned state** (`.pinned-content.is-pinned { height: 100vh; }`) to ensure full-viewport pinning.
- **Increased lock heights** for breathing room:
  - Branching: 300vh
  - Victorian split: 250vh
  - 1583: 250vh (unchanged but confirmed)
  - Johnson: 250vh (unchanged but confirmed)
- **Branching animation aligned to spec**:
  - 0–30%: single word
  - 30–60%: words duplicate and drift
  - 60–100%: three meanings spread to corners (feline/top, anatomical/bottom-left, coward/bottom-right)
  - Added light fade-out near end to smooth unlock
- **Added `chapter-continued` sections** after locks to keep content flow, with `transform: none` to avoid breaking future fixed children.

## Outcome (current behavior)
- All four scroll-locks now pin and play through their phases before unlocking.
- Branching shows the three meanings in their own positions without transform conflicts; overlap is minimized and revealed during drift.
- Hero sequence remains unchanged.

## Files touched (for traceability)
- `src/app/essays/the-word-pussy/TheWordPussyClient.tsx`
- `src/app/essays/the-word-pussy/the-word-pussy.css`

## Notes
- If we need zero overlap at the end of the branching spread, we can nudge final positions (e.g., slightly more Y-offset separation) without changing the lock behavior.***

