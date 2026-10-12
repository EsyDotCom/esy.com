'use client';

import { useEffect, useState } from 'react';
import OfficeFooter from './OfficeFooter';
import ReefFooter from './ReefFooter';
import StudyFooter from './StudyFooter';

/* The world every page ends inside.
 *
 * The scene runs full-bleed beneath the last section, and the site footer
 * floats over it as a rounded card (FooterWorld.css reaches the footer, since
 * the footer is rendered by the layout, not by this component).
 *
 * Three worlds, each its own component: Mason's study in vinyl (StudyFooter,
 * the default since 2026-10-12), his office of many Masons (OfficeFooter), and
 * the reef drawn in code that was live before (ReefFooter). To change the live
 * one, change LIVE. */
const WORLDS = { study: StudyFooter, office: OfficeFooter, reef: ReefFooter };
type World = keyof typeof WORLDS;
const LIVE: World = 'study';

export default function FooterWorld() {
  const [world, setWorld] = useState<World>(LIVE);
  // Local review only: ?footer=office|study|reef swaps the world on any page. Never in production builds.
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;
    const asked = new URLSearchParams(window.location.search).get('footer');
    if (asked && asked in WORLDS) setWorld(asked as World);
  }, []);
  const World = WORLDS[world];
  return <World />;
}
