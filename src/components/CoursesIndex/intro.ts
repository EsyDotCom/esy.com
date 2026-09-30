/* The /courses intro video's details, in a plain module so server-rendered
 * heroes and the client player can both read them (a value exported from a
 * 'use client' file isn't readable on the server).
 *
 * The intro isn't made yet. Until it is, this is the SEOPage explainer (the
 * 75-second film from "How We Made Our Explainer Video in Code"), shown as a
 * sample. Making the real one means swapping the id and setting sample: false.
 */
export const INTRO_VIDEO = {
  youtubeId: 'gB9rg92S6ZA',
  title: 'SEOPage explainer: Why ChatGPT recommends your competitor (and how to fix it)',
  duration: '1:15',
  sample: true,
};
