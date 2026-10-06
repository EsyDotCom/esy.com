/**
 * Image Research & Licensing Documentation
 * Visual Essay: The Weight of a Word — A History of the N-Word in America
 * 
 * All images sourced from authoritative archives with verified public domain
 * or Creative Commons licensing. Each URL has been individually verified.
 * 
 * Primary Sources:
 * - Wikimedia Commons (verified institutional uploads)
 * - Library of Congress
 * - National Portrait Gallery, Smithsonian Institution
 * - National Archives (NARA)
 * 
 * Research Method: image-url-extraction skill applied via Wikimedia API
 * Verification: Each URL returns HTTP 200 with image/* Content-Type
 * 
 * ⚠️ CONTENT ADVISORY: Some images in this file document historical racism
 * and are included for educational purposes only.
 * 
 * Last Verified: December 26, 2025
 */

export interface NWordEssayImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  attribution: string;
  source: string;
  sourceUrl: string;
  license: string;
  date?: string;
  photographer?: string;
  era?: string;
  figureId?: string;
  contentWarning?: boolean;
}

// ============================================================================
// FIGURE PORTRAITS
// ============================================================================

export const figureImages: NWordEssayImage[] = [
  {
    id: 'frederick-douglass',
    src: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Frederick_Douglass_by_Samuel_J_Miller%2C_1847-52.png',
    alt: 'Frederick Douglass, half-length portrait, facing right. Daguerreotype by Samuel J. Miller, circa 1847-1852.',
    caption: 'Frederick Douglass became the most photographed American of the 19th century.',
    attribution: 'Frederick Douglass by Samuel J. Miller, c. 1847-52. National Portrait Gallery, Smithsonian Institution.',
    source: 'National Portrait Gallery, Smithsonian Institution',
    sourceUrl: 'https://npg.si.edu/object/npg_NPG.80.21',
    license: 'Public Domain',
    date: 'c. 1847-1852',
    photographer: 'Samuel J. Miller',
    era: 'slavery',
    figureId: 'douglass',
  },
  {
    id: 'ida-b-wells',
    src: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Mary_Garrity_-_Ida_B._Wells-Barnett_-_Google_Art_Project_-_restoration_crop.jpg',
    alt: 'Ida B. Wells-Barnett, formal portrait photograph by Mary Garrity, circa 1893.',
    caption: 'Ida B. Wells documented over 700 lynchings, exposing how racial terror was justified.',
    attribution: 'Ida B. Wells, photograph by Mary Garrity, c. 1893. National Portrait Gallery, Smithsonian Institution.',
    source: 'National Portrait Gallery, Smithsonian Institution',
    sourceUrl: 'https://npg.si.edu/object/npg_NPG.2009.36',
    license: 'Public Domain',
    date: 'c. 1893',
    photographer: 'Mary Garrity',
    era: 'jimcrow',
    figureId: 'wells',
  },
  {
    id: 'web-dubois',
    src: 'https://upload.wikimedia.org/wikipedia/commons/1/12/WEB_DuBois_1918.jpg',
    alt: 'W.E.B. Du Bois, formal portrait photograph by Cornelius Marion Battey, circa 1918.',
    caption: 'W.E.B. Du Bois: "The problem of the Twentieth Century is the problem of the color-line."',
    attribution: 'W.E.B. Du Bois, photograph by C.M. Battey, c. 1918. Library of Congress.',
    source: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/pictures/item/2004672067/',
    license: 'Public Domain',
    date: 'c. 1918',
    photographer: 'Cornelius Marion Battey',
    era: 'jimcrow',
    figureId: 'dubois',
  },
  {
    id: 'james-baldwin',
    src: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/James_Baldwin_37_Allan_Warren.jpg',
    alt: 'James Baldwin, portrait photograph by Allan Warren, 1969.',
    caption: 'James Baldwin analyzed how racist language functions as a psychological weapon.',
    attribution: 'James Baldwin, photograph by Allan Warren, 1969. Licensed under CC BY-SA 3.0.',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:James_Baldwin_37_Allan_Warren.jpg',
    license: 'CC BY-SA 3.0',
    date: '1969',
    photographer: 'Allan Warren',
    era: 'civilrights',
    figureId: 'baldwin',
  },
  {
    id: 'thurgood-marshall',
    src: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Thurgood-marshall-2.jpg',
    alt: 'Thurgood Marshall, official Supreme Court portrait.',
    caption: 'Thurgood Marshall argued Brown v. Board and became the first African American Supreme Court Justice.',
    attribution: 'Thurgood Marshall, Supreme Court of the United States. Public Domain.',
    source: 'Supreme Court of the United States',
    sourceUrl: 'https://www.supremecourt.gov/about/biographies.aspx',
    license: 'Public Domain (U.S. Government)',
    date: '1967',
    era: 'civilrights',
    figureId: 'marshall',
  },
  {
    id: 'mlk-march',
    src: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Martin_Luther_King_Jr_St_Paul_Campus_U_MN.jpg',
    alt: 'Martin Luther King Jr. speaking at the University of Minnesota.',
    caption: 'Martin Luther King Jr. offered counter-language: "content of character," "beloved community."',
    attribution: 'Martin Luther King Jr. Minnesota Historical Society. Public Domain.',
    source: 'Minnesota Historical Society',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Martin_Luther_King_Jr_St_Paul_Campus_U_MN.jpg',
    license: 'Public Domain',
    date: '1967',
    era: 'civilrights',
    figureId: 'mlk',
  },
];

// ============================================================================
// HISTORICAL DOCUMENTS & SCENES
// ============================================================================

export const historicalImages: NWordEssayImage[] = [
  {
    id: 'slave-ship-brookes',
    src: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Slaveshipposter.jpg',
    alt: 'Diagram of the slave ship Brookes, showing the inhumane arrangement of enslaved people in the hold, published by abolitionists in 1788.',
    caption: 'The slave ship Brookes diagram became an icon of abolitionist campaigns.',
    attribution: 'Diagram of the slave ship Brookes, 1788. Library of Congress.',
    source: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/pictures/item/98504459/',
    license: 'Public Domain',
    date: '1788',
    era: 'colonial',
    contentWarning: true,
  },
  {
    id: 'first-colored-congressmen',
    src: 'https://upload.wikimedia.org/wikipedia/commons/0/01/First_Colored_Senator_and_Representatives.jpg',
    alt: 'First Colored Senator and Representatives: Hiram Rhodes Revels, Benjamin Turner, Robert De Large, Josiah Walls, Jefferson Long, Joseph Rainey, and Robert Brown Elliot. Currier & Ives lithograph, 1872.',
    caption: 'During Reconstruction, Black Americans served in Congress and built schools.',
    attribution: 'First Colored Senator and Representatives, Currier & Ives, 1872. Library of Congress.',
    source: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/pictures/item/2003674566/',
    license: 'Public Domain',
    date: '1872',
    era: 'reconstruction',
  },
  {
    id: 'jim-crow-sign',
    src: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/1943_Colored_Waiting_Room_Sign.jpg',
    alt: 'Colored Waiting Room sign from 1943, an example of Jim Crow segregation signage.',
    caption: 'Signs marking "White" and "Colored" made racial hierarchy visible on the landscape.',
    attribution: 'Colored Waiting Room sign, 1943. Library of Congress.',
    source: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/pictures/item/2017762891/',
    license: 'Public Domain',
    date: '1943',
    era: 'jimcrow',
    contentWarning: true,
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getImageById(id: string): NWordEssayImage | undefined {
  return [...figureImages, ...historicalImages].find(img => img.id === id);
}

export function getImagesByEra(era: string): NWordEssayImage[] {
  return [...figureImages, ...historicalImages].filter(img => img.era === era);
}

export function getImageByFigureId(figureId: string): NWordEssayImage | undefined {
  return figureImages.find(img => img.figureId === figureId);
}

// ============================================================================
// IMAGE EXPORTS BY CHAPTER
// ============================================================================

export const chapterImages = {
  prologue: [],
  etymology: [],
  firstTraces: [],
  trade: [getImageById('slave-ship-brookes')],
  slavery: [getImageById('frederick-douglass')],
  minstrelsy: [],
  reconstruction: [getImageById('first-colored-congressmen')],
  jimCrow: [
    getImageById('jim-crow-sign'),
    getImageById('ida-b-wells'),
    getImageById('web-dubois'),
  ],
  dictionary: [],
  civilRights: [
    getImageById('mlk-march'),
    getImageById('james-baldwin'),
    getImageById('thurgood-marshall'),
  ],
  euphemism: [],
  reappropriation: [],
  today: [],
  closing: [],
};

