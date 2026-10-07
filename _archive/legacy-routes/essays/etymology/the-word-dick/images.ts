/**
 * Image assets for "The Word Dick" visual essay
 *
 * All images sourced following image-research-licensing-expert.md standards:
 * - Tier 1 sources (Wikimedia Commons, National Archives)
 * - Public domain or CC0 licensing verified
 * - Direct URLs extracted per image-url-extraction skill
 *
 * Audit Date: December 2025
 */

export interface DickEssayImage {
  id: string;
  title: string;
  creator: string;
  date: string;
  source: string;
  sourceUrl: string;
  directUrl: string;
  license: string;
  licenseUrl: string;
  alt: string;
  caption?: string;
  figureId?: string;
}

// ===========================================
// FIGURE PORTRAITS
// ===========================================

export const figureImages: DickEssayImage[] = [
  {
    id: "richard-i-effigy",
    title: "Effigy of Richard I (Richard the Lionheart)",
    creator: "Unknown sculptor, c. 1199; Photo by Adam Bishop",
    date: "c. 1199 (effigy); 2011 (photograph)",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Church_of_Fontevraud_Abbey_Richard_I_effigy.jpg",
    directUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Church_of_Fontevraud_Abbey_Richard_I_effigy.jpg",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    alt: "Stone effigy of Richard I lying in repose at Fontevraud Abbey",
    caption: "Richard I's tomb effigy at Fontevraud Abbey, France",
    figureId: "richard-i",
  },
  {
    id: "francis-grose-portrait",
    title: "Captain Francis Grose, FSA",
    creator: "After Nathaniel Dance; engraved by Charles Bestland",
    date: "c. 1787",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Captain_Francisa_Grose,_FSA.jpg",
    directUrl: "https://upload.wikimedia.org/wikipedia/commons/d/da/Captain_Francisa_Grose%2C_FSA.jpg",
    license: "Public Domain",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    alt: "Oval portrait engraving of Francis Grose, a portly man in 18th-century dress",
    caption: "Francis Grose (1731–1791), author of 'A Classical Dictionary of the Vulgar Tongue'",
    figureId: "francis-grose",
  },
  {
    id: "richard-nixon-portrait",
    title: "Official Portrait of President Richard Nixon",
    creator: "White House Photo Office (1969–1974)",
    date: "1971",
    source: "National Archives and Records Administration",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Richard_Nixon_presidential_portrait_(1).jpg",
    directUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Richard_Nixon_presidential_portrait_%281%29.jpg",
    license: "Public Domain (U.S. Government Work)",
    licenseUrl: "https://en.wikipedia.org/wiki/Copyright_status_of_works_by_the_federal_government_of_the_United_States",
    alt: "Official presidential portrait of Richard Nixon in the Oval Office",
    caption: "Richard Nixon (1913–1994), the last prominent American publicly called 'Dick'",
    figureId: "richard-nixon",
  },
  {
    id: "eric-partridge-portrait",
    title: "Eric Partridge, 1971",
    creator: "Unknown photographer",
    date: "1971",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Eric_Partridge_1971A.png",
    directUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Eric_Partridge_1971A.png",
    license: "Public Domain",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    alt: "Black and white photograph of Eric Partridge, elderly man with glasses",
    caption: "Eric Partridge (1894–1979), author of 'A Dictionary of Slang and Unconventional English'",
    figureId: "eric-partridge",
  },
  {
    id: "john-s-farmer-portrait",
    title: "John S. Farmer, Spiritualist and Lexicographer",
    creator: "Unknown photographer",
    date: "c. 1880s–1900s",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:John_S._Farmer_spiritualist_(cropped).png",
    directUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b2/John_S._Farmer_spiritualist_%28cropped%29.png",
    license: "Public Domain",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    alt: "Black and white portrait photograph of John S. Farmer",
    caption: "John S. Farmer (1854–1916), author of 'Slang and Its Analogues'",
    figureId: "john-s-farmer",
  },
  {
    id: "dick-van-dyke-1961",
    title: "Dick Van Dyke and Mary Tyler Moore, The Dick Van Dyke Show",
    creator: "CBS Television (publicity photo)",
    date: "1961",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Dick_Van_Dyke_Mary_Tyler_Moore_Dick_Van_Dyke_Show_1961.JPG",
    directUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Dick_Van_Dyke_Mary_Tyler_Moore_Dick_Van_Dyke_Show_1961.JPG",
    license: "Public Domain (PD-US-no-notice)",
    licenseUrl: "https://commons.wikimedia.org/wiki/Template:PD-US-no_notice",
    alt: "Dick Van Dyke and Mary Tyler Moore in a publicity photo from The Dick Van Dyke Show, 1961",
    caption: "Dick Van Dyke (1925–present), one of few celebrities who maintained 'Dick' professionally",
    figureId: "dick-van-dyke",
  },
];

// ===========================================
// FIGURES WITHOUT IMAGES (Typography Treatment)
// ===========================================

/**
 * The following figures do not have verified public domain portraits:
 *
 * 1. Norman Bogner (1935–2022)
 *    - Author photos are copyrighted (Duffy Archive 1966, book jackets)
 *    - Syracuse University holds papers but requires permission
 *    - Recommendation: Use typographic/initial treatment
 */

export const figuresWithoutImages = [
  {
    id: "norman-bogner",
    name: "Norman Bogner",
    initial: "B",
    reason: "Author photographs copyrighted (Duffy Archive, Syracuse University)",
  },
];

// ===========================================
// IMAGE AUDIT LOG
// ===========================================

/**
 * IMAGE RESEARCH AUDIT
 * Conducted: December 23, 2025
 * Standards: image-research-licensing-expert.md
 * Method: image-url-extraction skill (deep search)
 *
 * VERIFIED IMAGES (6):
 * ✅ richard-i-effigy - CC BY-SA 3.0, Wikimedia Commons
 * ✅ francis-grose-portrait - Public Domain, 18th century engraving
 * ✅ richard-nixon-portrait - Public Domain, US Government work
 * ✅ eric-partridge-portrait - Public Domain, Wikimedia Commons
 * ✅ john-s-farmer-portrait - Public Domain, Wikimedia Commons (found via deep search)
 * ✅ dick-van-dyke-1961 - Public Domain (PD-US-no-notice), CBS publicity photo
 *
 * NOT AVAILABLE (1):
 * ⚠️ norman-bogner - Copyrighted author photos only (Duffy Archive 1966, Syracuse University)
 *
 * VERIFICATION METHOD:
 * - Direct URL extraction from Wikimedia Commons file pages (curl + grep)
 * - Content-Type header verification (image/jpeg or image/png confirmed)
 * - License verification from source pages
 * - Deep search across: Wikimedia Commons, Library of Congress, National Archives,
 *   Smithsonian, Internet Archive, National Portrait Gallery
 *
 * SEARCH NOTES:
 * - John S. Farmer: Found in Wikimedia Commons Category:John_Stephen_Farmer
 *   (spiritualist portrait, only known photograph per G. Legman research)
 * - Dick Van Dyke: 1961 CBS publicity photo is PD due to publication without
 *   copyright notice (pre-1989 requirement)
 * - Norman Bogner: Duffy Archive holds 1966 portrait but copyrighted;
 *   Syracuse University papers require permission for image use
 */

// Consolidated export
export const allImages = [...figureImages];
