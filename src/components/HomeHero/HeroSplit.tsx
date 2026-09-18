/* Hero A · Split — copy on the left, the Books window running off the right
 * edge. The familiar SaaS layout, done calmly. Not interactive beyond the
 * window itself, so it stays a server component. */

import OfficePreview from '@/components/OfficePreview/OfficePreview';
import { HeroActions, HeroProof, PreviewCaption } from './shared';

export default function HeroSplit({ src = 'hero-split' }: { src?: string }) {
  return (
    <section className="hl hl-hero">
      <div className="hl-wrap hl-split">
        <div>
          <span className="hl-eyebrow">
            <span className="dot" aria-hidden="true" />
            Esy OS
          </span>
          <h1 className="hl-h1">
            Know what your AI made, and <em>what it cost</em>.
          </h1>
          <p className="hl-sub">
            Esy runs your AI workers and keeps the books: what each client got, what every piece cost, and what&apos;s
            waiting for your sign-off. One page, updated as the work happens.
          </p>
          <HeroActions src={src} />
          <HeroProof />
        </div>
        <div className="hl-shot">
          <OfficePreview screenHeight={760} />
          <PreviewCaption />
        </div>
      </div>
    </section>
  );
}
