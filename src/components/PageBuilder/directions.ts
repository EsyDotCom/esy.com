import type { BarKind } from './bars';
import type { ShellKind } from './headers';

/** Each variant is the picked builder (R12) with a different bar or header. */
export const DIRECTIONS: Record<string, { bar?: BarKind; shell?: ShellKind }> = {
  r12: {},
  r18: { bar: 'one' },
  r19: { bar: 'tabs' },
  r20: { bar: 'float' },
  r21: { bar: 'tabs', shell: 'light' },
  r22: { bar: 'tabs', shell: 'navy' },
  r23: { bar: 'tabs', shell: 'crumb' },
};
