import LightHeader from '@/components/LightHeader/LightHeader';
import PhoneFrame from '@/components/prototypes/PhoneFrame';
// The prototype tokens (--p-ink…) and .proto scope; other prototype pages get
// them through PrototypeBar, which this page doesn't render.
import '@/components/prototypes/prototypes.css';
import '@/components/prototypes/phone-frames.css';

// F and its three phone layouts, side by side in phone-sized frames, each
// with where its Subscribe button lands. Desktop is the same for all four, so
// only the phone matters here. Each frame is the real prototype page.

export const metadata = { title: 'F on a phone — Esy prototypes' };

const PHONES = [
  { slug: 'studio', label: 'F · Studio (as shipped)', note: 'Big portrait above the copy.' },
  { slug: 'studio-avatar', label: 'G · Avatar', note: '64px face beside “Hi, I’m Zev.”' },
  { slug: 'studio-profile', label: 'H · Profile', note: '112px face with name and role.' },
  { slug: 'studio-after', label: 'I · Photo after', note: 'Signup first, portrait under it.' },
];

export default function PhonesPage() {
  return (
    <div className="proto">
      <LightHeader />
      <main className="pf-page">
        <header className="pf-intro">
          <p className="pi-kicker">Education hero · round 3</p>
          <h1>F on a phone</h1>
          <p>
            Same desktop in all four. On a phone, where does the face go so the signup stays on the first screen? Each
            frame is the real page at iPhone size. Scroll inside it, or open it full size.
          </p>
        </header>
        <div className="pf-row">
          {PHONES.map((p) => (
            <PhoneFrame key={p.slug} src={`/prototypes/education/${p.slug}/`} label={p.label} note={p.note} />
          ))}
        </div>
      </main>
    </div>
  );
}
