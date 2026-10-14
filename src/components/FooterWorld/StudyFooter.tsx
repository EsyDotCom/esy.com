import Image from 'next/image';
import Link from 'next/link';
import './FooterWorld.css';

/* Mason's study (live since 2026-10-12, S · Study on /prototypes/mason-toy/):
 * a glossy vinyl study at night, Mason seen from behind at two glowing
 * monitors, his arms on the keys. One still in the brand's vinyl
 * (org-docs/brand/VISUAL_LANGUAGE.md), made on api.esy.com with Sunburst from
 * his studio shot (run-19c6888e). Full-bleed, cropped toward the desk so it
 * stays above the footer card; loaded lazily, since few visitors reach it. */
export default function StudyFooter() {
  return (
    <div className="fw fw--study">
      <Image src="/brand/scenes/mason-study.webp" alt="" width={1536} height={1024} sizes="100vw" />
      {/* Who that is (2026-10-14): a small tag in the scene's corner. */}
      <Link href="/mason/" className="fw-mason-tag">That&rsquo;s Mason <span aria-hidden="true">&rarr;</span></Link>
    </div>
  );
}
