'use client';

/* Puts the page under a face-shape take. The wrapper class applies it from the
 * first render; the attribute on <html> reaches the site header (outside the
 * page) once mounted, and comes off when you leave, so no other page changes. */

import { useEffect, type ReactNode } from 'react';
import type { FaceShape } from './shapes';
import './face-shape.css';

export default function FaceShapeRoot({ shape, children }: { shape: FaceShape; children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.faceShape = shape;
    return () => {
      delete root.dataset.faceShape;
    };
  }, [shape]);

  return <div className={`fsh fsh--${shape}`}>{children}</div>;
}
