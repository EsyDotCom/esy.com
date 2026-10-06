import Link from 'next/link';
import type { Prototype, PrototypeVariant } from '@/components/prototypes/registry';
import RunwayWindow from './RunwayWindow';
import './preview.css';

/** One runway direction on an esy.com page: what it is, then the working window. */
export default function RunwayStage({
  prototype,
  variant,
  src,
  children,
}: {
  prototype: Prototype;
  variant: PrototypeVariant;
  /** Waitlist source, so prototype clicks never count as real signups. */
  src: string;
  children: React.ReactNode;
}) {
  return (
    <main className="rvp-stage">
      <div className="rvp-stage-in">
        <p className="rvp-stage-kicker">Esy prototypes · {prototype.name} · {variant.key} · {variant.name}</p>
        <h1>{variant.title}</h1>
        <p className="rvp-stage-lede">{variant.blurb}</p>
        <p className="rvp-stage-note">
          A working copy of os.esy.com/agency/runway. Every number is a sample: a one-person agency, Esy LLC, and its owner&rsquo;s own accounts. Scroll inside the window; the sliders and switches work.
        </p>
        <RunwayWindow>{children}</RunwayWindow>
        <p className="rvp-stage-cta">
          Runway is part of Esy OS. <Link href={`/waitlist/?src=${src}`}>Join the waitlist</Link>
        </p>
      </div>
    </main>
  );
}
