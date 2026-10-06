'use client';

// The footer world, per mascot (2026-10-06). The live site ends on the factory
// scene (FooterWorld): a brief rides a belt into one machine and comes out on
// three belts as finished, checked work. Each round-four take tells the same
// story with its own mascot in the machine's place: briefs ride in on the
// left, the mascot works in the middle, and finished pieces fly out along 45°
// tracks to three labelled shelves, each new one getting its check.
//
// Rendered by ConditionalFooter on /prototypes/brand-shapes/<take>/ in place
// of <FooterWorld />, inside the same .fw wrapper so the footer card floats
// over it exactly as it does over the factory.

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { HiveScene } from './BeeHive';
import { Swarm } from './BeeSwarm';
import { Box, C } from './draw';
import { Colony } from './ManOWar';
import { Network } from './Mycelium';
import { Bench } from './OctoBench';
import { ColorsMark } from './OctoColors';
import { Hub } from './OctoHub';
import { pts } from './symbols';
import { BanyanScene } from './Banyan';
import { RiverScene } from './BeaverRiver';
import { ClockScene } from './Clockwork';
import { LibraryScene } from './Library';
import { StarScene } from './NorthStar';
import { ReefScene } from './OctoReef';
import { OrbitScene } from './Orbit';
import { ConductorScene } from './OctoConductor';
import { KeeperScene } from './OctoKeeper';
import { MapScene } from './OctoMap';
import { NurseryScene } from './OctoNursery';
import { StationScene } from './OctoStation';
import { BuilderScene } from './OctoBuilder';
import { CoastScene } from './OctoCoast';
import { HarborScene } from './OctoHarbor';
import { SentinelScene } from './OctoSentinel';
import { VaultScene } from './OctoVault';
import { AssembleScene } from './OctoAssemble';
import { ConnectScene } from './OctoConnect';
import { GuideScene } from './OctoGuide';
import { InspectScene } from './OctoInspect';
import { KeepScene } from './OctoKeep';
import { OneReefScene } from './OctoOneReef';
import { PolisScene } from './OctoPolis';
import { RelayScene } from './OctoRelay';
import { DenScene } from './OctoDen';
import { GardenerScene } from './OctoGardener';
import { MasonScene } from './mason-scene';
import './brand-shapes.css';

// Each take's mascot, and what its three shelves hold (sample verticals).
const SCENES: Record<string, { center: ReactNode; shelves: [string, string, string]; window?: boolean }> = {
  'octo-hub': { center: <Hub />, shelves: ['Clip art', 'SEO pages', 'News'] },
  'octo-colors': { center: <ColorsMark />, shelves: ['Clip art', 'SEO pages', 'Films'] },
  'octo-bench': { center: <Bench />, shelves: ['Writing', 'Films', 'Reports'] },
  'bee-swarm': { center: <Swarm />, shelves: ['Research', 'Drafts', 'Checks'] },
  'bee-hive': { center: <HiveScene />, shelves: ['Clip art', 'SEO pages', 'News'] },
  mycelium: { center: <Network />, shelves: ['Clip art', 'SEO pages', 'News'] },
  'man-o-war': { center: <Colony small />, shelves: ['Clip art', 'Films', 'Social'], window: true },
};

// Round five: whole worlds, each its own kind of place, shown full width.
const WORLDS: Record<string, ReactNode> = {
  'octo-reef': <ReefScene />,
  'beaver-river': <RiverScene />,
  'north-star': <StarScene />,
  banyan: <BanyanScene />,
  clockwork: <ClockScene />,
  orbit: <OrbitScene />,
  library: <LibraryScene />,
  // Round six: the octopus worlds, all with the friendly octopus.
  'octo-nursery': <NurseryScene />,
  'octo-station': <StationScene />,
  'octo-map': <MapScene />,
  'octo-conductor': <ConductorScene />,
  'octo-keeper': <KeeperScene />,
  // Round seven: the lighthouse and the octopus together, neutral octopuses.
  'octo-builder': <BuilderScene />,
  'octo-harbor': <HarborScene />,
  'octo-sentinel': <SentinelScene />,
  'octo-vault': <VaultScene />,
  'octo-coast': <CoastScene />,
  // Round eight: the octopus alone, one job each, all abstract.
  'octo-assemble': <AssembleScene />,
  'octo-inspect': <InspectScene />,
  'octo-keep': <KeepScene />,
  'octo-guide': <GuideScene />,
  'octo-connect': <ConnectScene />,
  // Round nine: several of the original octopuses in the reef, one shared thing.
  'octo-polis': <PolisScene />,
  'octo-relay': <RelayScene />,
  'octo-one-reef': <OneReefScene />,
  // Round ten: the octopus alone, living its life (sim.tsx).
  'octo-mason': <MasonScene />,
  'octo-den': <DenScene />,
  'octo-gardener': <GardenerScene />,
};
// Pages whose footer card also shows the logo proposal (teal e, navy sy).
const LOGO_PROPOSAL = new Set(['octo-polis', 'octo-relay', 'octo-one-reef', 'octo-mason', 'octo-den', 'octo-gardener']);

const EXIT: [number, number] = [842, 224];
const SHELF_Y = [150, 262, 374];
const RACK_X = 990;

/** The 45° track from the mascot to shelf r: across, a diagonal, then along the shelf to the newest slot. */
function track(r: number): [number, number][] {
  const ty = SHELF_Y[r] - 40;
  const dy = Math.abs(ty - EXIT[1]);
  return [EXIT, [RACK_X - 16 - dy, EXIT[1]], [RACK_X - 16, ty], [RACK_X + 132, ty]];
}

/** A small finished piece: a card with two lines. */
function Piece({ w = 26, h = 32 }: { w?: number; h?: number }) {
  return (
    <g>
      <Box x={-w / 2} y={-h} w={w} h={h} c={[0, 7, 0, 0]} fill={C.ivory} stroke={C.navy} strokeWidth={2} />
      <Box x={-w / 2 + 5} y={-h + 9} w={w - 12} h={3} fill={C.teal} />
      <Box x={-w / 2 + 5} y={-h + 16} w={w - 16} h={3} fill={C.teal} />
    </g>
  );
}

function Stage({ variant }: { variant: string }) {
  const scene = SCENES[variant];
  return (
    <svg className="bs-fs" viewBox="0 0 1200 560" role="img" aria-label="Briefs ride in, the mascot does the work, and finished pieces land on three shelves">
      {/* The platform everything stands on; the footer card covers its lower half. */}
      <Box x={30} y={386} w={1140} h={150} c={[40, 40, 0, 0]} fill={C.navy} />
      <Box x={70} y={386} w={1060} h={6} fill="#163A5F" />

      {/* In: a belt carrying briefs toward the mascot. */}
      <text className="bs-fs-label" x={70} y={300}>
        Your brief
      </text>
      <Box x={56} y={344} w={300} h={22} c={11} fill={C.ink} />
      {Array.from({ length: 7 }, (_, n) => (
        <Box key={n} x={70 + n * 42} y={350} w={10} h={10} c={3} fill="#23476B" />
      ))}
      {[0, 1, 2].map((n) => (
        <g key={n} className="bs-fs-brief" style={{ '--n': n } as CSSProperties}>
          <Box x={0} y={0} w={58} h={40} c={[0, 12, 0, 0]} fill={C.ivory} stroke={C.navy} strokeWidth={2} />
          <Box x={9} y={12} w={36} h={4} fill={C.navy} />
          <Box x={9} y={22} w={26} h={4} fill={C.navy} />
        </g>
      ))}

      {/* The mascot, where the factory's machine stood. */}
      <svg x={360} y={20} width={480} height={360} viewBox="0 0 480 360" className={scene.window ? 'bs-fs-window' : undefined}>
        {scene.center}
      </svg>

      {/* Out: three 45° tracks to the rack, a piece flying along each in turn. */}
      {[0, 1, 2].map((r) => (
        <polyline key={`t${r}`} className="bs-fs-track" points={pts(track(r))} />
      ))}
      {[0, 1, 2].map((r) => {
        // The packet follows the track's four points as CSS variables (keyframes in brand-shapes.css).
        const vars = Object.fromEntries(track(r).flatMap(([x, y], i) => [[`--x${i}`, `${x}px`], [`--y${i}`, `${y}px`]]));
        return (
          <g key={`p${r}`} className="bs-fs-packet" style={{ ...vars, '--r': r } as CSSProperties}>
            <Piece w={22} h={26} />
          </g>
        );
      })}

      {/* The rack: three shelves, a few finished pieces on each, the newest getting its check. */}
      <Box x={RACK_X} y={64} w={8} h={322} fill={C.navy} />
      <Box x={RACK_X + 172} y={64} w={8} h={322} fill={C.navy} />
      {SHELF_Y.map((y, r) => (
        <g key={`s${r}`}>
          <text className="bs-fs-label" x={RACK_X + 14} y={y - 84}>
            {scene.shelves[r]}
          </text>
          <Box x={RACK_X} y={y} w={180} h={10} c={[0, 0, 5, 5]} fill={C.navy} />
          {[0, 1, 2].map((k) => (
            <g key={k} transform={`translate(${RACK_X + 30 + k * 34} ${y})`}>
              <Piece />
            </g>
          ))}
          <g className="bs-fs-new" style={{ '--r': r, transformOrigin: `${RACK_X + 132}px ${y}px` } as CSSProperties}>
            <g transform={`translate(${RACK_X + 132} ${y})`}>
              <Piece />
              <Box x={4} y={-12} w={16} h={16} c={5} fill={C.teal} />
              <polyline points="8,-4 11,-1 16,-7" fill="none" stroke={C.ivory} strokeWidth={2} />
            </g>
          </g>
        </g>
      ))}
    </svg>
  );
}

/** A world that starts its one-off moments (the Builder's build) when it scrolls into view. */
function World({ children, logo = false }: { children: ReactNode; logo?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`fw bs-fw bs-fw--world${inView ? ' is-in' : ''}${logo ? ' bs-fw--logo' : ''}`} aria-hidden="true">
      {children}
    </div>
  );
}

export default function BrandFooter({ variant }: { variant: string }) {
  if (WORLDS[variant]) return <World logo={LOGO_PROPOSAL.has(variant)}>{WORLDS[variant]}</World>;
  if (!SCENES[variant]) return null;
  return (
    <div className="fw bs-fw" aria-hidden="true">
      <Stage variant={variant} />
    </div>
  );
}
