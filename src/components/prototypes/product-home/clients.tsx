// Copied from os.esy.com src/components/folio/agency/sample-clients.tsx (main,
// 2026-10-18), so esy.com shows the same four fictional sample clients as the
// os.esy.com sign-in. Class names moved to the ph- prefix; nothing else changed.

// Sample clients for the sign-in / sign-up prototypes (2026-10-18). Zev: "if
// you're going to use a sample company as an example that requires a logo,
// no silly ugly text only with borders … dress this up". Four fictional local
// businesses, each with a designed mark and wordmark in its own colours. The
// colours live inside the logo only; the UI around them stays Esy's palette.
// None is a real company; every page that shows them says they're samples.

export type ClientId = 'fernvale' | 'copperline' | 'juniper' | 'halloway';

export const CLIENTS: Record<ClientId, { name: string; kind: string; site: string; city: string }> = {
  fernvale: { name: 'Fernvale Heating & Air', kind: 'HVAC', site: 'fernvaleair.com', city: 'Boise' },
  copperline: { name: 'Copperline Roofing', kind: 'Roofing', site: 'copperlineroofs.com', city: 'Denver' },
  juniper: { name: 'Juniper Lane Dental', kind: 'Dental practice', site: 'juniperlanedental.com', city: 'Austin' },
  halloway: { name: 'Halloway & Reed', kind: 'Law firm', site: 'hallowayreed.com', city: 'Raleigh' },
};

/** Just the mark, square: for small rows and avatars. */
export function ClientMark({ id, size = 28 }: { id: ClientId; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 40 40', 'aria-hidden': true as const };
  if (id === 'fernvale') {
    // A river wave under a split sun: flame on one side, frost on the other.
    return (
      <svg {...common}>
        <rect width="40" height="40" rx="9" fill="#123B7A" />
        <path d="M20 8a10 10 0 0 0 0 20z" fill="#F28C28" />
        <path d="M20 8a10 10 0 0 1 0 20z" fill="#7CC4F2" />
        <path d="M20 11v14M15 14l10 8M25 14l-10 8" stroke="#123B7A" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
        <path d="M6 30c3-2.4 6-2.4 9 0s6 2.4 9 0 6-2.4 10 0" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === 'copperline') {
    // Two roof lines, the upper one in copper.
    return (
      <svg {...common}>
        <rect width="40" height="40" rx="9" fill="#2B2F36" />
        <path d="M8 22 20 11l12 11" stroke="#C8743D" strokeWidth="3.4" fill="none" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M11 29 20 21l9 8" stroke="#E9E4DD" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === 'juniper') {
    // A tooth whose crown sprouts a juniper sprig.
    return (
      <svg {...common}>
        <rect width="40" height="40" rx="9" fill="#E8F4EF" />
        <path d="M13 15c0-4 3-5 5-4 1 .5 3 .5 4 0 2-1 5 0 5 4 0 4-1.5 6-2 10-.4 3-2.6 3-3-.5l-.6-4.5h-2.8l-.6 4.5c-.4 3.5-2.6 3.5-3 .5-.5-4-2-6-2-10z" fill="#fff" stroke="#1F6B55" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M20 12c0-3 1.5-5 4-6M24 6c-1 2-.5 3.5 1 4.5M24 6c-2 .5-3 1.8-3 3.5" stroke="#3E9C7A" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  // Halloway & Reed: a serif monogram under a pediment.
  return (
    <svg {...common}>
      <rect width="40" height="40" rx="9" fill="#6E1E2B" />
      <path d="M9 14 20 8l11 6z" fill="#E7C98B" />
      <text x="20" y="30" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="13" fontWeight="700" fill="#F6EFE4">H&amp;R</text>
    </svg>
  );
}

/** The full logo: the mark and the client's wordmark, set in its own type. */
export function ClientLogo({ id, size = 28, light = false }: { id: ClientId; size?: number; light?: boolean }) {
  const c = CLIENTS[id];
  const word: Record<ClientId, { top: string; sub: string; font: string; weight: number; color: string; subColor: string }> = {
    fernvale: { top: 'Fernvale', sub: 'HEATING & AIR', font: "'Inter', system-ui, sans-serif", weight: 800, color: '#123B7A', subColor: '#F28C28' },
    copperline: { top: 'COPPERLINE', sub: 'ROOFING', font: "'Inter', system-ui, sans-serif", weight: 800, color: '#2B2F36', subColor: '#C8743D' },
    juniper: { top: 'Juniper Lane', sub: 'DENTAL', font: "Georgia, 'Times New Roman', serif", weight: 700, color: '#1F6B55', subColor: '#3E9C7A' },
    halloway: { top: 'Halloway & Reed', sub: 'ATTORNEYS AT LAW', font: "Georgia, 'Times New Roman', serif", weight: 700, color: '#6E1E2B', subColor: '#8A6A3A' },
  };
  const w = word[id];
  return (
    <span className="ph-logo" role="img" aria-label={`${c.name} (sample client)`}>
      <ClientMark id={id} size={size} />
      <span className="ph-logo-word" style={{ fontFamily: w.font }}>
        <b style={{ fontWeight: w.weight, color: light ? '#fff' : w.color, letterSpacing: id === 'copperline' ? '0.08em' : '-0.01em' }}>{w.top}</b>
        <small style={{ color: light ? 'rgba(255,255,255,0.75)' : w.subColor }}>{w.sub}</small>
      </span>
    </span>
  );
}
