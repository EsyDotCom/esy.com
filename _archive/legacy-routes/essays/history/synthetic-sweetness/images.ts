// ============================================================================
// SYNTHETIC SWEETNESS - Image Sources
// All images should be sourced from archives listed in VISUALS.md
// ============================================================================

export interface ImageSource {
  src: string;
  alt: string;
  caption?: string;
  source?: string;
  era?: 'colonial' | 'scientific' | 'regulatory' | 'modern';
}

// Hero images
export const heroImages: ImageSource[] = [
  {
    src: "/essays/synthetic-sweetness/hero-spoon.jpg",
    alt: "Close-up of a spoon with white crystalline powder",
    caption: "What are we really swallowing?",
    era: "modern"
  }
];

// Chapter 1: The Evolutionary Trap
export const evolutionImages: ImageSource[] = [
  {
    src: "/essays/synthetic-sweetness/fruit-macro.jpg",
    alt: "Macro photography of ripe fruit glistening with natural sugars",
    era: "modern"
  },
  {
    src: "/essays/synthetic-sweetness/sugar-cane-field.jpg",
    alt: "Sugar cane fields stretching to the horizon",
    caption: "Sugar cane, first domesticated around 8000 BCE in New Guinea",
    era: "colonial"
  }
];

// Chapter 2: From Jungle to Commodity
export const crystallizationImages: ImageSource[] = [
  {
    src: "/essays/synthetic-sweetness/sugar-loaves.jpg",
    alt: "Conical sugar loaves from historical collection",
    caption: "Sugar loaves - the form in which sugar was sold for centuries",
    source: "Smithsonian National Museum of American History",
    era: "colonial"
  },
  {
    src: "/essays/synthetic-sweetness/medieval-market.jpg",
    alt: "Historical illustration of medieval European spice market",
    era: "colonial"
  }
];

// Chapter 3: Blood Sugar (Colonial/Slavery era)
export const colonialImages: ImageSource[] = [
  {
    src: "/essays/synthetic-sweetness/plantation-layout.jpg",
    alt: "Historical view of Caribbean sugar plantation layout",
    caption: "By 1667, Barbados had 745 plantation owners and 80,000 enslaved people",
    source: "Library of Congress",
    era: "colonial"
  },
  {
    src: "/essays/synthetic-sweetness/triangle-trade-map.jpg",
    alt: "Map showing the triangular trade routes across the Atlantic",
    caption: "The triangle trade: manufactured goods, enslaved people, sugar",
    era: "colonial"
  }
];

// Chapter 4: British Explosion
export const britishImages: ImageSource[] = [
  {
    src: "/essays/synthetic-sweetness/british-tea-service.jpg",
    alt: "Victorian-era British tea service with sugar bowl",
    caption: "Tea and sugar became inseparable in British culture",
    era: "colonial"
  },
  {
    src: "/essays/synthetic-sweetness/factory-tea-break.jpg",
    alt: "Factory workers during tea break in Victorian England",
    source: "Historical archives",
    era: "colonial"
  }
];

// Chapter 5: Saccharin Discovery
export const saccharinImages: ImageSource[] = [
  {
    src: "/essays/synthetic-sweetness/remsen-portrait.jpg",
    alt: "Portrait of Ira Remsen, co-discoverer of saccharin",
    caption: "Ira Remsen (1846-1927), First Professor of Chemistry at Johns Hopkins",
    source: "Science History Institute",
    era: "scientific"
  },
  {
    src: "/essays/synthetic-sweetness/fahlberg-portrait.jpg",
    alt: "Portrait of Constantine Fahlberg, discoverer of saccharin",
    caption: "Constantine Fahlberg (1850-1910)",
    era: "scientific"
  },
  {
    src: "/essays/synthetic-sweetness/jhu-lab-1870s.jpg",
    alt: "Johns Hopkins University chemistry laboratory in the 1870s",
    source: "Johns Hopkins University Archives",
    era: "scientific"
  }
];

// Chapter 6: The Bitter Dispute
export const patentImages: ImageSource[] = [
  {
    src: "/essays/synthetic-sweetness/saccharin-patent.jpg",
    alt: "Fahlberg's saccharin patent document",
    caption: "US Patent 326,281 - filed without crediting Remsen",
    source: "USPTO",
    era: "scientific"
  }
];

// Chapter 7: Roosevelt's Idiot
export const rooseveltImages: ImageSource[] = [
  {
    src: "/essays/synthetic-sweetness/roosevelt-portrait.jpg",
    alt: "President Theodore Roosevelt",
    caption: "'Anybody who says saccharin is injurious to health is an idiot.'",
    source: "Library of Congress",
    era: "scientific"
  },
  {
    src: "/essays/synthetic-sweetness/wiley-portrait.jpg",
    alt: "Harvey Washington Wiley, Chief Chemist of USDA",
    caption: "Harvey Wiley (1844-1930), father of the FDA",
    source: "Library of Congress",
    era: "scientific"
  }
];

// Chapter 8: Wartime Necessity
export const wartimeImages: ImageSource[] = [
  {
    src: "/essays/synthetic-sweetness/sugar-rationing-poster.jpg",
    alt: "World War II sugar rationing poster",
    caption: "Sugar was the first consumer commodity rationed during WWII",
    source: "National Archives",
    era: "regulatory"
  },
  {
    src: "/essays/synthetic-sweetness/ration-card.jpg",
    alt: "WWII sugar ration card with stamps",
    source: "National Park Service",
    era: "regulatory"
  }
];

// Chapter 9: The Diet Age
export const dietAgeImages: ImageSource[] = [
  {
    src: "/essays/synthetic-sweetness/no-cal-ginger-ale.jpg",
    alt: "No-Cal Ginger Ale packaging from 1952",
    caption: "The first diet soda, launched in 1952",
    era: "regulatory"
  },
  {
    src: "/essays/synthetic-sweetness/diet-rite-cola.jpg",
    alt: "Diet Rite Cola packaging from 1958",
    caption: "The first diet cola, by Royal Crown",
    era: "regulatory"
  },
  {
    src: "/essays/synthetic-sweetness/tab-cola.jpg",
    alt: "Tab cola advertisement from the 1960s",
    caption: "Coca-Cola entered the diet market in 1963",
    era: "regulatory"
  }
];

// Chapter 10: The First Ban
export const banImages: ImageSource[] = [
  {
    src: "/essays/synthetic-sweetness/fda-headquarters.jpg",
    alt: "FDA headquarters building",
    source: "FDA",
    era: "regulatory"
  },
  {
    src: "/essays/synthetic-sweetness/federal-register.jpg",
    alt: "Federal Register notice announcing cyclamate ban",
    caption: "34 FR 17063 - October 21, 1969",
    era: "regulatory"
  }
];

// Chapter 11: Aspartame Wars
export const aspartameImages: ImageSource[] = [
  {
    src: "/essays/synthetic-sweetness/gd-searle-building.jpg",
    alt: "G.D. Searle company headquarters",
    era: "regulatory"
  },
  {
    src: "/essays/synthetic-sweetness/diet-coke-launch.jpg",
    alt: "Diet Coke product launch in 1982",
    caption: "Diet Coke, launched with aspartame in 1982",
    era: "regulatory"
  }
];

// Chapter 12: Revolving Door
export const revolvingDoorImages: ImageSource[] = [
  {
    src: "/essays/synthetic-sweetness/rumsfeld-portrait.jpg",
    alt: "Donald Rumsfeld as CEO of G.D. Searle",
    caption: "Donald Rumsfeld, Searle CEO 1977-1985",
    era: "regulatory"
  },
  {
    src: "/essays/synthetic-sweetness/hayes-portrait.jpg",
    alt: "Arthur Hull Hayes Jr., FDA Commissioner",
    caption: "FDA Commissioner Hayes overruled the PBOI in 1981",
    era: "regulatory"
  },
  {
    src: "/essays/synthetic-sweetness/reagan-inauguration.jpg",
    alt: "Ronald Reagan inauguration, January 20, 1981",
    caption: "Searle resubmitted aspartame application the next day",
    source: "National Archives",
    era: "regulatory"
  }
];

// Chapter 13: Proliferation
export const proliferationImages: ImageSource[] = [
  {
    src: "/essays/synthetic-sweetness/splenda-package.jpg",
    alt: "Splenda sucralose packaging",
    caption: "'Made from sugar' - launched in 1999",
    era: "modern"
  },
  {
    src: "/essays/synthetic-sweetness/sweetener-packets.jpg",
    alt: "Array of sweetener packets - pink, blue, yellow, green",
    caption: "The color language of artificial sweeteners",
    era: "modern"
  }
];

// Chapter 14: Natural Turn
export const naturalImages: ImageSource[] = [
  {
    src: "/essays/synthetic-sweetness/stevia-plant.jpg",
    alt: "Stevia rebaudiana plant leaves",
    caption: "Stevia, native to Paraguay, approved by FDA in 2008",
    era: "modern"
  },
  {
    src: "/essays/synthetic-sweetness/monk-fruit.jpg",
    alt: "Monk fruit (luo han guo)",
    caption: "Monk fruit extract approved in 2010",
    era: "modern"
  },
  {
    src: "/essays/synthetic-sweetness/truvia-package.jpg",
    alt: "Truvia stevia-based sweetener",
    era: "modern"
  }
];

// Chapter 15: Peak and Decline
export const dataImages: ImageSource[] = [
  {
    src: "/essays/synthetic-sweetness/grocery-aisle.jpg",
    alt: "Modern grocery store beverage aisle",
    era: "modern"
  }
];

// Chapter 16: Unsettled Science
export const modernImages: ImageSource[] = [
  {
    src: "/essays/synthetic-sweetness/who-headquarters.jpg",
    alt: "World Health Organization headquarters in Geneva",
    caption: "WHO issued new sweetener guidance in 2023",
    era: "modern"
  }
];

// Figure portraits for profiles
export const figurePortraits = {
  fahlberg: saccharinImages[1],
  remsen: saccharinImages[0],
  sveda: {
    src: "/essays/synthetic-sweetness/sveda-portrait.jpg",
    alt: "Michael Sveda, discoverer of cyclamate",
    caption: "Michael Sveda (1912-1999)",
    era: "regulatory" as const
  },
  schlatter: {
    src: "/essays/synthetic-sweetness/schlatter-portrait.jpg",
    alt: "James Schlatter, discoverer of aspartame",
    caption: "James Schlatter",
    era: "regulatory" as const
  },
  phadnis: {
    src: "/essays/synthetic-sweetness/phadnis-portrait.jpg",
    alt: "Shashikant Phadnis, discoverer of sucralose",
    era: "regulatory" as const
  },
  wiley: rooseveltImages[1],
  roosevelt: rooseveltImages[0],
  rumsfeld: revolvingDoorImages[0],
  hayes: revolvingDoorImages[1],
  mintz: {
    src: "/essays/synthetic-sweetness/mintz-portrait.jpg",
    alt: "Sidney Mintz, anthropologist",
    caption: "Sidney Mintz, author of Sweetness and Power",
    era: "modern" as const
  },
  rillieux: {
    src: "/essays/synthetic-sweetness/rillieux-portrait.jpg",
    alt: "Norbert Rillieux, inventor of the multiple-effect evaporator",
    caption: "Norbert Rillieux (1806-1894)",
    source: "American Chemical Society",
    era: "colonial" as const
  }
};
