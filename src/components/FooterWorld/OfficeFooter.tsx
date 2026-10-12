import Image from 'next/image';
import './FooterWorld.css';

/* Mason's office (W · Office floor on /prototypes/mason-toy/, 2026-10-12): an
 * open-plan vinyl office at night, a dozen Masons at their own desks in rows,
 * a window wall onto the city. The footer line says "Build the AI systems that
 * run marketing"; this is those systems running, many agents and one mind.
 * Made on api.esy.com with Sunburst from his studio shot (run-f035f57f). */
export default function OfficeFooter() {
  return (
    <div className="fw fw--study fw--office" aria-hidden="true">
      <Image src="/brand/scenes/mason-office.webp" alt="" width={1536} height={1024} sizes="100vw" />
    </div>
  );
}
