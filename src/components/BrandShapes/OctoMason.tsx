'use client';

// AV · Mason — the octopus quarries slabs from a pile on the left and builds
// an octagon gate on the right: bottom first, then the sides, the top last.
// It walks, crouches, lifts each slab overhead, carries it over, sets it with
// a puff of sand, stops to rest and look around. When the gate is whole it
// fills with light, a school swims through, and the octopus admires its work.

import type { CSSProperties } from 'react';
import { Board, type TakeCopy } from './Board';
import { OctopusFigure } from './Octopus';
import { MasonScene } from './mason-scene';
import { ROUND_TEN_NOTE } from './sim';

export const MASON_COPY: TakeCopy = {
  key: 'AV',
  name: 'Mason',
  headline: 'Built one slab at a time.',
  lede: 'The octopus quarries slabs from a pile and builds a gate: bottom first, then the sides, the top last. It walks, lifts each slab overhead, carries it over, sets it with a puff of sand, and stops now and then to look around. When the gate is whole it fills with light and a school swims through.',
  says: 'Esy makes the hard part look easy: patient, careful building, one piece at a time, until something stands that others can pass through.',
};

export default function OctoMason() {
  return (
    <Board
      tone="night"
      header
      copy={MASON_COPY}
      note={ROUND_TEN_NOTE}
      hero={
        <div className="bs-frame bs-frame--night bs-frame--flush">
          <MasonScene view="40 40 1100 440" />
        </div>
      }
      mark={() => (
        <svg className="bs-svg" viewBox="0 0 480 360" role="img" aria-label="The octopus">
          <OctopusFigure items={{}} />
        </svg>
      )}
      divider={
        <div className="bs-rule-course bs-rule-logs" aria-hidden="true">
          {Array.from({ length: 11 }, (_, i) => (
            <span key={i} className={i === 5 ? 'bs-course-key' : ''} />
          ))}
        </div>
      }
    />
  );
}
