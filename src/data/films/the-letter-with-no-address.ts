/* The first Esy film: everything the /films pages show about it, in one place.
 *
 * The live film page (/films/the-letter-with-no-address, direction A) and the
 * prototypes it was picked from (/prototypes/films/) read this file, so the
 * facts, the cast and the package stay identical while the designs differ.
 * Frames live in /public/films/the-letter-with-no-address/. Zuri and her
 * mother are drawn from family photos, so no frame of them is used here.
 *
 * The package links are claude.ai artifacts. They open for visitors only
 * once each one is shared ("anyone with the link"); `private` marks the one
 * that stays private until Zev decides otherwise. */

export const FILM_STAGES = [
  "Look",
  "Script",
  "Cast",
  "Shot plan",
  "Table read",
  "Frames",
  "Animatic",
  "Motion",
  "Sound",
  "Final cut",
] as const;

export type PackageItem = {
  group: "film" | "book";
  title: string;
  description: string;
  kind: string;
  updated: string;
  image: string;
  url: string;
  private?: boolean;
};

export type Chapter = { label: string; title: string; text: string; image: string; alt: string; tc: string; speaker?: string; line?: string };
export type CastMember = { name: string; role: string; image: string; position: string; zoom: string };

const IMG = "/films/the-letter-with-no-address";
export const img = (name: string) => `${IMG}/${name}.webp`;

export const LETTER = {
  slug: "the-letter-with-no-address",
  title: "The Letter With No Address",
  series: "Lullo the Moon Bear",
  runtime: "4:13",
  shots: 39,
  lines: 33,
  voices: 6,
  ages: "3–7",
  stageIndex: FILM_STAGES.indexOf("Animatic"),
  version: 15,
  logline:
    "A letter arrives at the Cloud Post Office with no address, only a child's crayon drawing of a star, a moon and a pair of tiny booties. Lullo follows the drawing from the Sleepy Stars to the Moon to a quiet lane, until a window lights up.",
  tagline: "A letter with no address, a crayon drawing for a clue, and one very determined postman.",
  animaticUrl: "https://claude.ai/artifact/LqbXkKbumDwiqZK8BL2e2B",
  // The animatic's own media (48 MB of frames, clips and recorded lines) lives in
  // esy.com's R2 bucket, one folder per cut (upload with
  // scripts/r2-upload-film-media.mjs). Files are cached for a year, so a new cut
  // goes up under a new folder and this line moves to it.
  animaticMedia: "films/the-letter-with-no-address/animatic/v15",
  storybookUrl: "https://clip.art/stories/milo/",
  packsUrl: "https://clip.art/packs/",
  chapters: [
    {
      label: "Chapter one",
      title: "The Cloud Post Office",
      tc: "00:07",
      text: "Every letter in Starlight Town is delivered before sunrise. Tonight one arrives with no address at all.",
      image: "milo-stamp",
      alt: "Lullo stamping a letter at his sorting desk",
      speaker: "Lullo",
      line: "Stamp. Seal. Slot. Goodnight, letter.",
    },
    {
      label: "Chapter two",
      title: "The Sleepy Stars",
      tc: "01:10",
      text: "In starlight, the first line of the letter appears.",
      image: "stars-bounce",
      alt: "The three Sleepy Stars bouncing on a cloud as the balloon arrives",
      speaker: "Tiny Star",
      line: "For us?",
    },
    {
      label: "Chapter three",
      title: "The Moon",
      tc: "01:50",
      text: "Moonlight shows the second line, and the Moon lays a silver path down to the rooftops.",
      image: "d1-moon",
      alt: "Lullo's balloon beside the Moon",
      speaker: "The Moon",
      line: "Lullo. You're early. Or I'm late.",
    },
    {
      label: "Chapter four",
      title: "Morning",
      tc: "03:35",
      text: "Home by sunrise, with the Lost Letters drawer glowing. What happens at the window, you'll have to watch.",
      image: "dawn-home",
      alt: "Dawn over the Cloud Post Office as the balloon comes home",
    },
  ] satisfies Chapter[],
  cast: [
    { name: "Lullo the Moon Bear", role: "The night postman. Gentle, a little shy.", image: "milo-smile", position: "50% 30%", zoom: "220%" },
    { name: "Ottoline", role: "The owl postmistress. Rules are rules.", image: "ottoline-perch", position: "27% 24%", zoom: "300%" },
    { name: "The Moon", role: "Slow and velvety. Sees every window.", image: "moon-tender", position: "20% 46%", zoom: "230%" },
    { name: "The Sleepy Stars", role: "Tall, Round and Tiny.", image: "stars-still", position: "62% 62%", zoom: "260%" },
  ] satisfies CastMember[],
  credits: [
    { label: "Story", title: "Screenplay draft B", note: "Written after research on children's screenwriting, and checked against ten rules" },
    { label: "Voices", title: "Six designed voices", note: "Lullo, Ottoline, the Moon and three Sleepy Stars, on ElevenLabs" },
    { label: "Frames", title: "Esy", note: "32 stills from the Lullo the Moon Bear pack, on gpt-image-2" },
    { label: "Motion", title: "Next", note: "Seedance 2.5, Kling O3 and OmniHuman 1.5, once the timing is locked" },
    { label: "Sound", title: "Temp score", note: "From the Lullo storybook, mixed to broadcast loudness standards" },
    { label: "Made by", title: "Zev, with Claude and Esy", note: "ESY LLC" },
  ],
  reel: [
    { image: "milo-stamp", alt: "Lullo at the sorting desk" },
    { image: "launch", alt: "Lift-off from the post office roof" },
    { image: "stars-bounce", alt: "The Sleepy Stars" },
    { image: "moon-rise", alt: "The balloon rising to the Moon" },
    { image: "lane-search", alt: "Over Honeysuckle Lane" },
    { image: "drawer-glow", alt: "The Lost Letters drawer glowing" },
  ],
  versions: [
    { v: "v1", text: "First cut, timed to the real voices" },
    { v: "v2", text: "Clips stop looping back" },
    { v: "v3", text: "Self-review: continuity, music, sound on words" },
    { v: "v4", text: "The mix meets loudness standards" },
    { v: "v5", text: "Transitions from editing research" },
    { v: "v6", text: "Opening sound: the crickets go" },
    { v: "v7", text: "Owl, nightingale and songbird options" },
    { v: "v8", text: "Lullo reads the envelope; the P.S. appears" },
    { v: "v9", text: "“Welcome home”" },
  ],
  making: [
    { n: "10", text: "stages, from the look to the animatic" },
    { n: "32", text: "stills drawn by Esy from the pack" },
    { n: "33", text: "lines recorded one at a time" },
    { n: "9", text: "versions of the animatic, each reviewed" },
  ],
  package: [
    { group: "film", title: "Lullo's Animatic", description: "The whole film as a timed rough cut: every shot, every recorded line, temp music, and the mix and transition checks.", kind: "Animatic", updated: "28 Sep", image: "animatic-player", url: "https://claude.ai/artifact/LqbXkKbumDwiqZK8BL2e2B" },
    { group: "film", title: "The Letter, Rewritten", description: "The screenplay, checked against ten research-based rules and rewritten three ways.", kind: "Script", updated: "27 Sep", image: "b-env-written", url: "https://claude.ai/artifact/F2uVCzzM1xBk5BR5RqX2x4" },
    { group: "film", title: "Lullo's First Film", description: "The first research: three directions for the film, the voice casting and the video model test.", kind: "Development", updated: "27 Sep", image: "look-world", url: "https://claude.ai/artifact/ErwpThPs1jfzpWbB7S9qBc" },
    { group: "film", title: "Zuri, Three Ways", description: "Zuri drawn in three styles. The first style was chosen.", kind: "Characters", updated: "27 Sep", image: "sill-wait", url: "https://claude.ai/artifact/Vg61xybLFZqDDDKRYWdTdK", private: true },
    { group: "film", title: "Esy Film Pipeline", description: "How Esy makes the next film on its own: sixteen workflows, the API, and the exact recipe for this animatic.", kind: "Pipeline", updated: "28 Sep", image: "milo-realises", url: "https://claude.ai/artifact/2TJqgkv2Dbk7q8hjKVEa4y" },
    { group: "film", title: "Sound and Mix", description: "The sound standard: the research on how loud a children's film should be, the targets, how the mix is measured, and the numbers for all 13 mix passes.", kind: "Sound", updated: "30 Sep", image: "stars-bounce", url: "https://claude.ai/artifact/9A7rm6HcCEurGwMPMLB58b" },
    { group: "film", title: "Lullo Video Thumbnails", description: "Three thumbnails for the narrated story video on YouTube and LinkedIn.", kind: "Marketing", updated: "27 Sep", image: "letter-moonlight", url: "https://claude.ai/artifact/WAYBFKin1Z3o25CGkneUhv" },
    { group: "book", title: "Lullo, One Night One Sky", description: "A storybook direction for Lullo's night.", kind: "Storybook", updated: "27 Sep", image: "stars-letter", url: "https://claude.ai/artifact/NE8Lc4qZmjBTPx8J7vuHdL" },
    { group: "book", title: "Lullo by Scroll", description: "A storybook direction told by scrolling.", kind: "Storybook", updated: "27 Sep", image: "r-washing", url: "https://claude.ai/artifact/LctPgbiCZ3n4RCZwNwSoCP" },
    { group: "book", title: "Lullo Openings", description: "Opening options for the Lullo storybook.", kind: "Storybook", updated: "27 Sep", image: "pigeon-glow", url: "https://claude.ai/artifact/HRrs67rDkXfvF858Ky1TnS" },
    { group: "book", title: "Lullo Endings", description: "Ending options for the Lullo storybook.", kind: "Storybook", updated: "27 Sep", image: "milo-asleep-shawl", url: "https://claude.ai/artifact/RcwzNZKhRZTvY3gVAJt2W2" },
    { group: "book", title: "Three Books for the Shelf", description: "Three new clip.art Stories, each built from a pack. Lullo's is the first.", kind: "Proposal", updated: "27 Sep", image: "launch", url: "https://claude.ai/artifact/YQhPKmBoN3ugP1TWW7cYVf" },
    { group: "book", title: "Stories on Clip Art Pages", description: "How the stories show up on clip.art pages, led by Starlight Town.", kind: "Proposal", updated: "27 Sep", image: "lane-search", url: "https://claude.ai/artifact/DiknXKJPQRWrXThD1mFtgX" },
  ] satisfies PackageItem[],
};

export const PACKAGE_GROUPS = [
  { key: "film" as const, title: "The film" },
  { key: "book" as const, title: "Where Lullo started: the storybook" },
];
