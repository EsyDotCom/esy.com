import { MasonScene } from '@/components/BrandShapes/mason-scene';
import './FooterWorld.css';

/* Mason's reef (live 2026-10-06 → 2026-10-12): Esy's octopus quarries slabs and
 * builds an octagon gate, then a school swims through (picked on
 * /prototypes/brand-shapes/octo-mason/). Drawn in SVG and moved by a small
 * script, about 15 KB, paused while it's off screen; with reduced motion it
 * shows the finished gate, still. Kept whole so FooterWorld can switch back
 * to it in one line. */
export default function ReefFooter() {
  return (
    <div className="fw bs-fw" aria-hidden="true">
      <MasonScene />
    </div>
  );
}
