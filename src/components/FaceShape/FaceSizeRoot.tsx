/* Puts the homepage under a portrait-size take (face-size.css). */

import type { ReactNode } from 'react';
import './face-size.css';

export type FaceSize = '440' | '360' | '280';

export const FACE_SIZES: Record<string, FaceSize> = { '440': '440', '360': '360', '280': '280' };

export default function FaceSizeRoot({ size, children }: { size: FaceSize; children: ReactNode }) {
  return <div className={`fz fz--${size}`}>{children}</div>;
}
