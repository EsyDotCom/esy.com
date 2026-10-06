// Money and date formatting, as the live Runway page writes it
// (os.esy.com src/components/folio/app/runway.tsx and the banking runway
// model's monthLabel, main @ e051361).

export const usd = (cents: number, withCents = false) => {
  const v = cents / 100;
  return `${v < 0 ? '−' : ''}$${Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: withCents ? 2 : 0, maximumFractionDigits: withCents ? 2 : 0 })}`;
};
export const usdK = (cents: number) => {
  const v = Math.abs(cents / 100);
  return `${cents < 0 ? '−' : ''}$${v >= 1000 ? `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}k` : Math.round(v)}`;
};
export const mo = (m: number | null) => (m == null ? '—' : m.toFixed(1));
export const shortDate = (iso: string) =>
  new Date(iso.length === 10 ? `${iso}T12:00:00` : iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

/** 1 → "1st", 12 → "12th", 22 → "22nd". */
export const ordinal = (n: number) => {
  const tens = n % 100;
  const suffix = tens >= 11 && tens <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' } as Record<number, string>)[n % 10] ?? 'th';
  return `${n}${suffix}`;
};

export function monthLabel(period: string): string {
  const [year, month] = period.split('-').map(Number);
  if (!year || !month) return period;
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
}
