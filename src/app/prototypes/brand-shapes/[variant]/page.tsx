import { notFound } from 'next/navigation';
import type { ComponentType } from 'react';
import Banyan from '@/components/BrandShapes/Banyan';
import Beaver from '@/components/BrandShapes/Beaver';
import BeaverRiver from '@/components/BrandShapes/BeaverRiver';
import Bee from '@/components/BrandShapes/Bee';
import BeeHive from '@/components/BrandShapes/BeeHive';
import BeeSwarm from '@/components/BrandShapes/BeeSwarm';
import Blueprint from '@/components/BrandShapes/Blueprint';
import Clockwork from '@/components/BrandShapes/Clockwork';
import Folio from '@/components/BrandShapes/Folio';
import Graph from '@/components/BrandShapes/Graph';
import Keystone from '@/components/BrandShapes/Keystone';
import Library from '@/components/BrandShapes/Library';
import Lighthouse from '@/components/BrandShapes/Lighthouse';
import Loom from '@/components/BrandShapes/Loom';
import ManOWar from '@/components/BrandShapes/ManOWar';
import Mosaic from '@/components/BrandShapes/Mosaic';
import Mycelium from '@/components/BrandShapes/Mycelium';
import NorthStar from '@/components/BrandShapes/NorthStar';
import OctoAssemble from '@/components/BrandShapes/OctoAssemble';
import OctoBench from '@/components/BrandShapes/OctoBench';
import OctoBuilder from '@/components/BrandShapes/OctoBuilder';
import OctoCoast from '@/components/BrandShapes/OctoCoast';
import OctoConductor from '@/components/BrandShapes/OctoConductor';
import OctoConnect from '@/components/BrandShapes/OctoConnect';
import OctoDen from '@/components/BrandShapes/OctoDen';
import OctoGardener from '@/components/BrandShapes/OctoGardener';
import OctoGuide from '@/components/BrandShapes/OctoGuide';
import OctoColors from '@/components/BrandShapes/OctoColors';
import OctoHarbor from '@/components/BrandShapes/OctoHarbor';
import OctoHub from '@/components/BrandShapes/OctoHub';
import OctoInspect from '@/components/BrandShapes/OctoInspect';
import OctoKeep from '@/components/BrandShapes/OctoKeep';
import OctoMason from '@/components/BrandShapes/OctoMason';
import OctoOneReef from '@/components/BrandShapes/OctoOneReef';
import OctoPolis from '@/components/BrandShapes/OctoPolis';
import OctoKeeper from '@/components/BrandShapes/OctoKeeper';
import OctoMap from '@/components/BrandShapes/OctoMap';
import OctoNursery from '@/components/BrandShapes/OctoNursery';
import OctoReef from '@/components/BrandShapes/OctoReef';
import OctoRelay from '@/components/BrandShapes/OctoRelay';
import OctoSentinel from '@/components/BrandShapes/OctoSentinel';
import OctoStation from '@/components/BrandShapes/OctoStation';
import OctoVault from '@/components/BrandShapes/OctoVault';
import Octopus from '@/components/BrandShapes/Octopus';
import Orbit from '@/components/BrandShapes/Orbit';
import Parade from '@/components/BrandShapes/Parade';
import Raven from '@/components/BrandShapes/Raven';
import Seal from '@/components/BrandShapes/Seal';
import Stencil from '@/components/BrandShapes/Stencil';
import Tangram from '@/components/BrandShapes/Tangram';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';

// Animated shape themes built on the esy e's 45° stencil cut, each shown full
// size and then in use across the site (loader, profile picture, empty page,
// article stamp, divider). Round one: animals. Round two: symbols from the e.
// Round three: mascots, each standing for one thing Esy is. Round four: more
// octopus and bee, two new organisms, and a footer world for each. Round five:
// seven whole worlds, animals and symbols, each also the page's footer. Round
// six: five octopus worlds with a friendlier octopus. Round seven: the
// lighthouse and the octopus together, with four neutral octopuses. Round
// eight: the octopus alone, one job per world, everything abstract. Round
// nine: several octopuses in the reef, one shared thing. Round ten: the
// octopus alone, living its life, driven by a small script (sim.tsx).

const TAKES: Record<string, ComponentType> = {
  stencil: Stencil,
  tangram: Tangram,
  blueprint: Blueprint,
  parade: Parade,
  mosaic: Mosaic,
  seal: Seal,
  folio: Folio,
  graph: Graph,
  loom: Loom,
  keystone: Keystone,
  octopus: Octopus,
  raven: Raven,
  bee: Bee,
  beaver: Beaver,
  lighthouse: Lighthouse,
  'octo-hub': OctoHub,
  'octo-colors': OctoColors,
  'octo-bench': OctoBench,
  'bee-swarm': BeeSwarm,
  'bee-hive': BeeHive,
  mycelium: Mycelium,
  'man-o-war': ManOWar,
  'octo-reef': OctoReef,
  'beaver-river': BeaverRiver,
  'north-star': NorthStar,
  banyan: Banyan,
  clockwork: Clockwork,
  orbit: Orbit,
  library: Library,
  'octo-nursery': OctoNursery,
  'octo-station': OctoStation,
  'octo-map': OctoMap,
  'octo-conductor': OctoConductor,
  'octo-keeper': OctoKeeper,
  'octo-builder': OctoBuilder,
  'octo-harbor': OctoHarbor,
  'octo-sentinel': OctoSentinel,
  'octo-vault': OctoVault,
  'octo-coast': OctoCoast,
  'octo-assemble': OctoAssemble,
  'octo-inspect': OctoInspect,
  'octo-keep': OctoKeep,
  'octo-guide': OctoGuide,
  'octo-connect': OctoConnect,
  'octo-polis': OctoPolis,
  'octo-relay': OctoRelay,
  'octo-one-reef': OctoOneReef,
  'octo-mason': OctoMason,
  'octo-den': OctoDen,
  'octo-gardener': OctoGardener,
};

const prototype = findPrototype('brand-shapes')!;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Brand shapes ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function BrandShapesVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const Take = TAKES[variant];
  if (!Take) notFound();
  return (
    <>
      <Take />
      <PrototypeBar prototype={prototype} current={variant} />
    </>
  );
}
