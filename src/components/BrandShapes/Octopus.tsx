// K · Octopus — one brain, many hands. A navy mantle over eight stencil arms,
// four navy in front and four deep teal behind. Each arm is a chain of
// segments that curls in a travelling wave; three arms hold what they made.

import type { CSSProperties } from 'react';
import { Board } from './Board';
import { MASCOT_NOTE } from './draw';
import { OctopusFigure } from './octopus-figure';

export { OctopusFigure };
import type { TakeCopy } from './symbols';

export const OCTOPUS_COPY: TakeCopy = {
  key: 'K',
  name: 'Octopus',
  headline: 'One brain, many hands.',
  lede: 'An octopus thinks with its whole body: one brain sets the goal while each of its eight arms works on its own. Eight arms, like the eight sides of our cut. Here three of them hold what they made.',
  says: 'Esy is the brain, not the hands. Your tools do the work; Esy keeps the goal, what each arm did, and what came back.',
};

export default function Octopus() {
  return (
    <Board
      copy={OCTOPUS_COPY}
      note={MASCOT_NOTE}
      hero={
        <div className="bs-frame">
          <OctopusFigure bubbles />
        </div>
      }
      mark={() => <OctopusFigure />}
      divider={
        <div className="bs-rule-tentacle" aria-hidden="true">
          {Array.from({ length: 40 }, (_, i) => (
            <span key={i} style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
      }
    />
  );
}
