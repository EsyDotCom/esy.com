export interface Chapter {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  hook: string;
  description: string;
}

export const chapters: Chapter[] = [
  {
    id: "deep-time",
    number: 1,
    title: "Deep Time",
    shortTitle: "Deep Time",
    hook: "If Earth's 4.5 billion year history were compressed into a single year, humans would appear in the final 4 seconds before midnight on December 31st.",
    description: "Understanding the vast timescales of evolution"
  },
  {
    id: "how-we-know",
    number: 2,
    title: "How We Know",
    shortTitle: "Evidence",
    hook: "Every fossil tells a story—but reading that story requires multiple scientific disciplines working in concert.",
    description: "The methods of paleoanthropology"
  },
  {
    id: "tree-of-life",
    number: 3,
    title: "Tree of Life",
    shortTitle: "Tree",
    hook: "We share 98.8% of our DNA with chimpanzees. That 1.2% difference—accumulated over 6-7 million years—is what makes us human.",
    description: "Our place among primates"
  },
  {
    id: "african-origins",
    number: 4,
    title: "African Origins",
    shortTitle: "Origins",
    hook: "The East African Rift Valley—a geological scar running through the continent—preserved the evidence of our earliest ancestors in its sediments.",
    description: "The earliest hominins"
  },
  {
    id: "walking-upright",
    number: 5,
    title: "Walking Upright",
    shortTitle: "Bipedalism",
    hook: "The footprints at Laetoli, frozen in volcanic ash 3.66 million years ago, show creatures walking upright—before brain expansion, before stone tools.",
    description: "The evolution of bipedalism"
  },
  {
    id: "genus-homo",
    number: 6,
    title: "Genus Homo",
    shortTitle: "Genus Homo",
    hook: "When the first stone tools were struck 3.3 million years ago, something unprecedented had begun—technology as a survival strategy.",
    description: "The emergence of our genus"
  },
  {
    id: "other-humans",
    number: 7,
    title: "Other Humans",
    shortTitle: "Others",
    hook: "For most of our evolutionary history, we were not alone. Multiple human species walked the Earth simultaneously.",
    description: "Neanderthals, Denisovans, and more"
  },
  {
    id: "homo-sapiens",
    number: 8,
    title: "Homo Sapiens",
    shortTitle: "Sapiens",
    hook: "In a cave in Morocco, 315,000 years ago, people who looked remarkably like us were shaping stone tools and burying their dead.",
    description: "The emergence of our species"
  },
  {
    id: "migrations",
    number: 9,
    title: "Migrations",
    shortTitle: "Migrations",
    hook: "Between 70,000 and 50,000 years ago, a small group of humans left Africa. Their descendants would eventually populate every continent.",
    description: "The spread of humanity"
  },
  {
    id: "culture-cognition",
    number: 10,
    title: "Culture & Cognition",
    shortTitle: "Culture",
    hook: "The same 32 geometric symbols appear in caves across Europe over 30,000 years. This was not the start-up phase of a new invention.",
    description: "The evolution of the human mind"
  },
  {
    id: "present-future",
    number: 11,
    title: "Present & Future",
    shortTitle: "Now",
    hook: "You carry within your DNA fragments of Neanderthals, perhaps Denisovans, and countless ancestors stretching back millions of years.",
    description: "Where we are and where we're going"
  }
];

export const getChapterById = (id: string): Chapter | undefined => {
  return chapters.find(chapter => chapter.id === id);
};

export const getChapterByNumber = (num: number): Chapter | undefined => {
  return chapters.find(chapter => chapter.number === num);
};
