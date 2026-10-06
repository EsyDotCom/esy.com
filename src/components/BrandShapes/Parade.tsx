// D · Parade — a mother and calf walk through the frame under a chamfered sun,
// legs stepping in pairs, trunks swinging. Small herds cross dividers and empty
// pages. All CSS; the figures are the same elephant at two sizes.

import { Board, type TakeCopy } from './Board';
import { ELEPHANT } from './pieces';
import { Stage } from './Stage';

function Walker({ width, delay = 0, className = '' }: { width: string; delay?: number; className?: string }) {
  return (
    <div className={`bs-walker ${className}`} style={{ width, animationDelay: `${delay}s` }}>
      <Stage pieces={ELEPHANT.pieces} className="bs-walk" label="A stencil elephant walking" />
    </div>
  );
}

export const PARADE_COPY: TakeCopy = {
  key: 'D',
  name: 'Parade',
  headline: 'A herd that walks the site.',
  lede: 'Stencil elephants walk through bands, dividers and empty pages, steady and unhurried. A friendly character that keeps the site moving without asking for attention.',
  says: 'Patient, reliable progress. Elephants remember, and Esy remembers how everything was made.',
};

export default function Parade() {
  return (
    <Board
      tone="mint"
      copy={PARADE_COPY}
      hero={
        <div className="bs-frame bs-parade">
          <span className="bs-sun" aria-hidden="true" />
          <span className="bs-cloud bs-cloud--a" aria-hidden="true" />
          <span className="bs-cloud bs-cloud--b" aria-hidden="true" />
          <div className="bs-herd">
            <Walker width="34%" className="bs-calf" />
            <Walker width="60%" />
          </div>
          <span className="bs-ground" aria-hidden="true" />
        </div>
      }
      mark={() => <Stage pieces={ELEPHANT.pieces} className="bs-walk bs-walk--mark" label="A stencil elephant walking" />}
      divider={
        <div className="bs-rule-parade" aria-hidden="true">
          <div className="bs-herd bs-herd--mini">
            <Walker width="40px" className="bs-calf" />
            <Walker width="64px" />
            <Walker width="52px" />
          </div>
          <span className="bs-ground" />
        </div>
      }
    />
  );
}
