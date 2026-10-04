'use client';

// The os.esy.com app lockup ("esy | agency ▾"), with the same markup and
// classes as AppSwitcher in src/components/folio/app/launcher.tsx. Here it
// only looks the part: the preview answers a click with a note.
export function Lockup() {
  return (
    <button className="fo-lockup lc-lockup-btn" aria-haspopup="dialog" aria-label="Esy OS, agency. Switch app" title="Switch app (⌘K)">
      <span className="fo-wordmark">esy</span>
      <span className="fo-lockup-sep" aria-hidden="true" />
      <span className="fo-lockup-name">agency</span>
      <span className="lc-caret" aria-hidden="true">▾</span>
    </button>
  );
}
