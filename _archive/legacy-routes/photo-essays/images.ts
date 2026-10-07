/**
 * Photo Essays Landing Page - Image Assets
 * 
 * All images verified for licensing compliance per image-research-licensing-expert.md
 * 
 * Verification Date: December 2024
 * Researcher: Image Research & Licensing Expert Agent
 */

export interface LandingImage {
  src: string;
  alt: string;
  caption: string;
  source: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  attributionRequired: boolean;
  attribution?: string;
  date?: string;
  creator?: string;
}

/**
 * Trinity Test - Manhattan Project Hero
 * 
 * Rights Status: Public Domain (U.S. Government Work)
 * Verification: U.S. Department of Energy work, 17 U.S.C. § 105
 */
export const trinityTestImage: LandingImage = {
  src: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Trinity_Detonation_T%26B.jpg",
  alt: "Trinity nuclear test mushroom cloud rising into the New Mexico sky, July 16, 1945",
  caption: "The Trinity test mushroom cloud — the first detonation of a nuclear weapon",
  source: "U.S. Department of Energy / Los Alamos National Laboratory",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Trinity_Detonation_T%26B.jpg",
  license: "Public Domain (U.S. Government Work - DOE)",
  licenseUrl: "https://en.wikipedia.org/wiki/Copyright_status_of_works_by_the_federal_government_of_the_United_States",
  attributionRequired: false,
  date: "July 16, 1945",
};

/**
 * Auschwitz Gate - Holocaust Essay
 * 
 * Rights Status: Public Domain
 * Verification: Photographer's work in public domain
 */
export const auschwitzImage: LandingImage = {
  src: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Auschwitz_I_entrance_snow.jpg",
  alt: "The entrance gate to Auschwitz I concentration camp in winter",
  caption: "The gates of Auschwitz — a symbol of the Holocaust",
  source: "Wikimedia Commons",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Auschwitz_I_entrance_snow.jpg",
  license: "Public Domain",
  licenseUrl: "https://commons.wikimedia.org/wiki/File:Auschwitz_I_entrance_snow.jpg",
  attributionRequired: false,
};

/**
 * Alan Turing Portrait - Thinking Machine Essay
 * 
 * Rights Status: Public Domain (PD-old-70-expired)
 * Verification: Photographer died before 1954, life + 70 years expired
 */
export const turingImage: LandingImage = {
  src: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg",
  alt: "Alan Turing at age 16, passport photograph",
  caption: "Alan Turing — father of computer science and artificial intelligence",
  source: "Wikimedia Commons",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Alan_Turing_Aged_16.jpg",
  license: "Public Domain (PD-old-70-expired)",
  licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
  attributionRequired: false,
  date: "1928",
};

/**
 * Ramayana Art - Using Chola Bronze from Met Museum Open Access
 * 
 * Rights Status: CC0 (Met Museum Open Access)
 * Verification: Met Museum Open Access program, CC0 dedication
 * 
 * Note: Replaced original image with verified CC0 source
 */
export const ramayanaImage: LandingImage = {
  src: "https://images.metmuseum.org/CRDImages/as/original/DP251139.jpg",
  alt: "Hanuman, the Monkey God, bronze sculpture from South India, Chola period",
  caption: "Hanuman — the devoted servant in the Ramayana epic",
  source: "The Metropolitan Museum of Art",
  sourceUrl: "https://www.metmuseum.org/art/collection/search/39328",
  license: "CC0 (Public Domain Dedication)",
  licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  attributionRequired: false,
  date: "11th century",
  creator: "Unknown (Chola dynasty)",
};

/**
 * Fork Collection - The Fork Essay
 * 
 * Rights Status: CC BY-SA 3.0 US
 * Verification: Creative Commons Attribution-ShareAlike 3.0 United States
 * Attribution: Required per CC BY-SA terms
 */
export const forkImage: LandingImage = {
  src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Assorted_forks.jpg",
  alt: "Collection of antique forks spanning centuries of design",
  caption: "The fork — once condemned as satanic vanity, now invisible",
  source: "Wikimedia Commons",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Assorted_forks.jpg",
  license: "CC BY-SA 3.0 US",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/us/deed.en",
  attributionRequired: true,
  attribution: "Photo by Rainer Zenz, CC BY-SA 3.0 US",
  creator: "Rainer Zenz",
};

/**
 * All essay showcase images with full documentation
 */
export const essayImages = {
  manhattanProject: trinityTestImage,
  holocaust: auschwitzImage,
  thinkingMachine: turingImage,
  ramayana: ramayanaImage,
  fork: forkImage,
};

/**
 * Image Research Report Summary
 * 
 * Project: Photo Essays Landing Page
 * Date: December 2024
 * 
 * LICENSING VERIFICATION SUMMARY:
 * 
 * | Image | License | Attribution | Verified |
 * |-------|---------|-------------|----------|
 * | Trinity Test | PD (US Gov) | Not Required | ✅ |
 * | Auschwitz | PD | Not Required | ✅ |
 * | Alan Turing | PD (70yr) | Not Required | ✅ |
 * | Hanuman/Ramayana | CC0 (Met) | Not Required | ✅ |
 * | Forks | CC BY-SA 3.0 | Required | ✅ |
 * 
 * NOTES:
 * - Trinity Test is colorized but remains PD as derivative of PD source
 * - Ramayana image replaced with verified CC0 from Met Museum Open Access
 * - Fork image requires attribution to Rainer Zenz under CC BY-SA 3.0 US
 * 
 * All images sourced from Tier 1 authoritative sources:
 * - Wikimedia Commons (with original source verification)
 * - Metropolitan Museum of Art Open Access
 */

























