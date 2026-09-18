// Prototypes: clickable directions we compare before shipping, kept after a
// pick so the next prototype has something to build from. Never indexed.
// The pattern is written up in docs/prototypes/README.md.
export const metadata = {
  robots: { index: false, follow: false },
};

export default function PrototypesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
