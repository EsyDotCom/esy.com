/**
 * Image Research & Licensing Documentation
 * Visual Essay: The Etymology of Play — How "Toy" Traveled from Sin to Innocence
 * 
 * All images sourced from authoritative archives with verified public domain
 * or Creative Commons licensing. Each URL has been individually verified.
 * 
 * Primary Sources:
 * - Huntington Library (Ellesmere Manuscript)
 * - Wikimedia Commons (verified public domain)
 * - Metropolitan Museum of Art (Open Access)
 * - Victoria & Albert Museum Digital Collections
 * - Library of Congress
 * - National Portrait Gallery (UK)
 * - Deutsche Fotothek
 * - Museum of London
 * - Louvre Museum
 * 
 * Last Verified: December 17, 2024
 * Audit Report: ./research/IMAGE_RESEARCH_AUDIT.md
 */

export interface ToyImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  attribution: string;
  source: string;
  sourceUrl: string;
  license: string;
  date?: string;
  era?: "medieval" | "renaissance" | "enlightenment" | "victorian" | "modern";
}

// ============================================================================
// HERO SECTION - Word Transformation Imagery
// ============================================================================

export const heroImages: ToyImage[] = [
  {
    id: "hero-medieval-manuscript",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Ellesmere_Chaucer%2C_mssEL_26_C_9%2C_folio_153v_cropped.jpg",
    alt: "Chaucer as a pilgrim from the Ellesmere manuscript of The Canterbury Tales",
    caption: "Geoffrey Chaucer — among the first to use the word 'toy' in English",
    attribution: "Ellesmere Chaucer, c. 1400-1410. Huntington Library. Public Domain.",
    source: "Huntington Library / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ellesmere_Chaucer,_mssEL_26_C_9,_folio_153v_cropped.jpg",
    license: "Public Domain",
    date: "c. 1400-1410",
    era: "medieval",
  },
];

// ============================================================================
// CHAPTER 1: THE MEDIEVAL TOYE (1300-1500)
// ============================================================================

export const chapter1Images: ToyImage[] = [
  {
    id: "ch1-chaucer-portrait",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Portrait_of_Geoffrey_Chaucer_%284671380%29_%28cropped%29.jpg",
    alt: "Portrait of Geoffrey Chaucer",
    caption: "Geoffrey Chaucer (c. 1343–1400) — The Father of English Poetry",
    attribution: "Anonymous, c. 15th century. National Portrait Gallery, London. Public Domain.",
    source: "National Portrait Gallery / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Portrait_of_Geoffrey_Chaucer_(4671380)_(cropped).jpg",
    license: "Public Domain",
    date: "c. 15th century",
    era: "medieval",
  },
  {
    id: "ch1-canterbury-tales",
    src: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Canterbury_Tales.png",
    alt: "Page from the Canterbury Tales manuscript",
    caption: "The Canterbury Tales — where 'toy' first appears meaning 'frivolous talk'",
    attribution: "William Caxton, 1484. British Library. Public Domain.",
    source: "British Library / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Canterbury_Tales.png",
    license: "Public Domain",
    date: "1484",
    era: "medieval",
  },
  {
    id: "ch1-medieval-lovers",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Codex_Manesse_Heinrich_von_Veldeke.jpg",
    alt: "Medieval lovers from Codex Manesse",
    caption: "Medieval courtly love — the context where 'toy' meant 'dalliance'",
    attribution: "Codex Manesse, c. 1300-1340. University Library Heidelberg. Public Domain.",
    source: "Universitätsbibliothek Heidelberg / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Codex_Manesse_Heinrich_von_Veldeke.jpg",
    license: "Public Domain",
    date: "c. 1300-1340",
    era: "medieval",
  },
];

// ============================================================================
// CHAPTER 2: TRIFLE AND DALLIANCE (1500-1650)
// ============================================================================

export const chapter2Images: ToyImage[] = [
  {
    id: "ch2-shakespeare-portrait",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Shakespeare.jpg",
    alt: "The Chandos portrait of William Shakespeare",
    caption: "William Shakespeare — used 'toy' 30+ times, never meaning 'plaything'",
    attribution: "John Taylor (attributed), c. 1600-1610. National Portrait Gallery. Public Domain.",
    source: "National Portrait Gallery / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Shakespeare.jpg",
    license: "Public Domain",
    date: "c. 1600-1610",
    era: "renaissance",
  },
  {
    id: "ch2-first-folio",
    src: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Title_page_William_Shakespeare%27s_First_Folio_1623.jpg",
    alt: "Title page of Shakespeare's First Folio, 1623",
    caption: "The First Folio (1623) — preserving Shakespeare's uses of 'toy'",
    attribution: "Martin Droeshout, 1623. Public Domain.",
    source: "Folger Shakespeare Library / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Title_page_William_Shakespeare%27s_First_Folio_1623.jpg",
    license: "Public Domain",
    date: "1623",
    era: "renaissance",
  },
  {
    id: "ch2-hamlet-quarto",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Hamlet_First_Quarto_first_page_%281603%29.jpg",
    alt: "First page of the first quarto of Hamlet, 1603",
    caption: "Hamlet — 'These are but wild and whirling toys'",
    attribution: "1603 Quarto edition. Public Domain.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Hamlet_First_Quarto_first_page_(1603).jpg",
    license: "Public Domain",
    date: "1603",
    era: "renaissance",
  },
  {
    id: "ch2-elizabethan-jewelry",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Nicholas_Hilliard_Elizabeth_I_The_Pelican_Portrait.jpg",
    alt: "Elizabeth I wearing ornamental 'toys' (jewelry)",
    caption: "Queen Elizabeth I — wealthy women wore 'toys' (ornamental jewelry)",
    attribution: "Nicholas Hilliard (attributed), c. 1575. Walker Art Gallery. Public Domain.",
    source: "Walker Art Gallery / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Nicholas_Hilliard_Elizabeth_I_The_Pelican_Portrait.jpg",
    license: "Public Domain",
    date: "c. 1575",
    era: "renaissance",
  },
];

// ============================================================================
// CHAPTER 3: THE CHILDREN'S CLAIM (17th-18th Century)
// ============================================================================

export const chapter3Images: ToyImage[] = [
  {
    id: "ch3-locke-portrait",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d1/JohnLocke.png",
    alt: "Portrait of John Locke by Godfrey Kneller",
    caption: "John Locke (1632–1704) — championed learning through play",
    attribution: "Godfrey Kneller, 1697. Hermitage Museum. Public Domain.",
    source: "Hermitage Museum / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:JohnLocke.png",
    license: "Public Domain",
    date: "1697",
    era: "enlightenment",
  },
  {
    id: "ch3-rousseau-portrait",
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Jean-Jacques_Rousseau_%28painted_portrait%29.jpg",
    alt: "Portrait of Jean-Jacques Rousseau",
    caption: "Jean-Jacques Rousseau (1712–1778) — revolutionized thinking about childhood",
    attribution: "Maurice Quentin de La Tour, 1753. Public Domain.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Jean-Jacques_Rousseau_(painted_portrait).jpg",
    license: "Public Domain",
    date: "1753",
    era: "enlightenment",
  },
  {
    id: "ch3-johnson-portrait",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/20/Samuel_Johnson_by_Joshua_Reynolds.jpg",
    alt: "Portrait of Samuel Johnson by Joshua Reynolds",
    caption: "Samuel Johnson (1709–1784) — his Dictionary captured 'toy' in transition",
    attribution: "Joshua Reynolds, c. 1756. National Portrait Gallery. Public Domain.",
    source: "National Portrait Gallery / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Samuel_Johnson_by_Joshua_Reynolds.jpg",
    license: "Public Domain",
    date: "c. 1756",
    era: "enlightenment",
  },
  {
    id: "ch3-johnson-dictionary",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f1/A_Dictionary_of_the_English_Language_1755.jpg",
    alt: "Title page of Samuel Johnson's Dictionary, 1755",
    caption: "A Dictionary of the English Language (1755) — defining 'toy' for the ages",
    attribution: "W. Strahan, 1755. Public Domain.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:A_Dictionary_of_the_English_Language_1755.jpg",
    license: "Public Domain",
    date: "1755",
    era: "enlightenment",
  },
  {
    id: "ch3-chardin-children",
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Jean-Baptiste_Sim%C3%A9on_Chardin_006.jpg",
    alt: "Boy with a Spinning Top by Jean-Siméon Chardin",
    caption: "L'Enfant au toton (1738) — Chardin captures childhood play",
    attribution: "Jean-Siméon Chardin, 1738. Louvre Museum. Public Domain.",
    source: "Louvre Museum / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Jean-Baptiste_Siméon_Chardin_006.jpg",
    license: "Public Domain",
    date: "1738",
    era: "enlightenment",
  },
];

// ============================================================================
// CHAPTER 4: THE TOYMAKER'S ART (Nuremberg, 1600-1850)
// ============================================================================

export const chapter4Images: ToyImage[] = [
  {
    id: "ch4-nuremberg-toys",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/5f/22-06-26_Spielzeugmuseum_N%C3%BCnberg.jpg",
    alt: "Historical toys from the Spielzeugmuseum Nuremberg",
    caption: "Nuremberg toys — the 'Toy Capital of the World' since the 18th century",
    attribution: "Spielzeugmuseum Nürnberg. CC BY-SA 4.0.",
    source: "Spielzeugmuseum Nürnberg / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:22-06-26_Spielzeugmuseum_Nünberg.jpg",
    license: "CC BY-SA 4.0",
    date: "Various dates",
    era: "enlightenment",
  },
  {
    id: "ch4-tin-soldiers",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/5e/19th_century_German_infantry_%2825351522626%29.jpg",
    alt: "19th century German infantry tin soldiers",
    caption: "Tin soldiers — when toymaking became a respected craft",
    attribution: "19th century German infantry figures. CC BY 2.0.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:19th_century_German_infantry_(25351522626).jpg",
    license: "CC BY 2.0",
    date: "19th century",
    era: "victorian",
  },
  {
    id: "ch4-wooden-horse",
    src: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Antique_Rocking_Horse_%285457510271%29.jpg",
    alt: "Antique wooden rocking horse",
    caption: "Rocking horse — a beloved toy of the Victorian nursery",
    attribution: "Antique Rocking Horse. CC BY-SA 2.0.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Antique_Rocking_Horse_(5457510271).jpg",
    license: "CC BY-SA 2.0",
    date: "19th century",
    era: "victorian",
  },
  {
    id: "ch4-weigel-trades",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Fotothek_df_tg_0008527_St%C3%A4ndebuch_%5E_Beruf_%5E_Handwerk_%5E_Puppenmacher_%5E_Spielzeug_%5E_Spielzeugmacher_%5E_Pup.jpg",
    alt: "Doll maker from a Book of Trades",
    caption: "Puppenmacher (Doll Maker) — from an 18th century Ständebuch",
    attribution: "Deutsche Fotothek. Public Domain.",
    source: "Deutsche Fotothek / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Fotothek_df_tg_0008527_Ständebuch_^_Beruf_^_Handwerk_^_Puppenmacher_^_Spielzeug_^_Spielzeugmacher_^_Pup.jpg",
    license: "Public Domain",
    date: "18th century",
    era: "enlightenment",
  },
];

// ============================================================================
// CHAPTER 5: INDUSTRY AND INNOCENCE (Victorian Era)
// ============================================================================

export const chapter5Images: ToyImage[] = [
  {
    id: "ch5-victorian-toyshop",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/da/Museum_of_London_Victorian_toyshop.JPG",
    alt: "Victorian toy shop recreation at Museum of London",
    caption: "A Victorian toy shop — where 'toy' became synonymous with childhood",
    attribution: "Museum of London. CC BY-SA 4.0.",
    source: "Museum of London / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Museum_of_London_Victorian_toyshop.JPG",
    license: "CC BY-SA 4.0",
    date: "Victorian era recreation",
    era: "victorian",
  },
  {
    id: "ch5-victorian-dolls",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/99/Victorian_dolls_and_old_hamper._Porcelain_heads%2C_feet_and_hands._Stuffed_with_sawdust.jpg",
    alt: "Victorian porcelain dolls",
    caption: "Porcelain dolls — toys became objects of desire for children everywhere",
    attribution: "Victorian dolls with porcelain heads. CC BY-SA 4.0.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Victorian_dolls_and_old_hamper._Porcelain_heads,_feet_and_hands._Stuffed_with_sawdust.jpg",
    license: "CC BY-SA 4.0",
    date: "c. 1840-1860",
    era: "victorian",
  },
  {
    id: "ch5-christmas-toys",
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e3/The_Christmas_Tree_at_Windsor_Castle%2C_by_J._L._Williams_-_ILN_1848_%28cropped%29.jpg",
    alt: "The Christmas Tree at Windsor Castle, 1848",
    caption: "Victorian Christmas traditions made toy-giving a ritual of love",
    attribution: "J. L. Williams, Illustrated London News, 1848. Public Domain.",
    source: "Illustrated London News / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:The_Christmas_Tree_at_Windsor_Castle,_by_J._L._Williams_-_ILN_1848_(cropped).jpg",
    license: "Public Domain",
    date: "1848",
    era: "victorian",
  },
  {
    id: "ch5-marklin-train",
    src: "https://upload.wikimedia.org/wikipedia/commons/7/7c/M%C3%A4rklin_Tinplate_Volkskrokodil_RV_66_12960_Spur_0.jpg",
    alt: "Märklin tinplate locomotive",
    caption: "Märklin locomotive — German toymaking reached industrial scale",
    attribution: "Märklin Tinplate locomotive. Public Domain.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Märklin_Tinplate_Volkskrokodil_RV_66_12960_Spur_0.jpg",
    license: "Public Domain",
    date: "c. 1900",
    era: "victorian",
  },
];

// ============================================================================
// CHAPTER 6: THE LIVING WORD (20th Century-Present)
// ============================================================================

export const chapter6Images: ToyImage[] = [
  {
    id: "ch6-lego-bricks",
    src: "https://upload.wikimedia.org/wikipedia/commons/3/32/Lego_Color_Bricks.jpg",
    alt: "LEGO color bricks",
    caption: "LEGO — from Danish 'leg godt' (play well), the world's most successful toy",
    attribution: "Alan Chia, 2006. CC BY-SA 2.0.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Lego_Color_Bricks.jpg",
    license: "CC BY-SA 2.0",
    date: "2006",
    era: "modern",
  },
  // NOTE: Barbie image removed due to Fair Use licensing concerns
  // See IMAGE_RESEARCH_AUDIT.md for details and recommendations
  // TODO: Source a CC-licensed alternative image of vintage fashion dolls
  {
    id: "ch6-toy-poodle",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Full_attention_%288067543690%29.jpg",
    alt: "Toy poodle dog",
    caption: "Toy poodle — even dog breeds carry the word now",
    attribution: "Stuart Richards, 2012. CC BY 2.0.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Full_attention_(8067543690).jpg",
    license: "CC BY 2.0",
    date: "2012",
    era: "modern",
  },
];

// ============================================================================
// CHAPTER 7: THE MEANING OF PLAY (Reflection)
// ============================================================================

export const chapter7Images: ToyImage[] = [
  {
    id: "ch7-huizinga",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/21/Johan-huizinga1.jpg",
    alt: "Portrait of Johan Huizinga",
    caption: "Johan Huizinga (1872–1945) — 'Play is older than culture'",
    attribution: "Unknown photographer. Public Domain.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Johan-huizinga1.jpg",
    license: "Public Domain",
    date: "c. 1930s",
    era: "modern",
  },
  {
    id: "ch7-children-playing",
    src: "https://upload.wikimedia.org/wikipedia/commons/7/72/Fotothek_df_roe-neg_0006504_035_Ein_Junge_spielt_mit_Holzspielzeug%2C_Herbstmesse_1953.jpg",
    alt: "A boy playing with wooden toys, Leipzig Fair 1953",
    caption: "Children at play — the word 'toy' found its permanent home",
    attribution: "Deutsche Fotothek, 1953. CC BY-SA 3.0 de.",
    source: "Deutsche Fotothek / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Fotothek_df_roe-neg_0006504_035_Ein_Junge_spielt_mit_Holzspielzeug,_Herbstmesse_1953.jpg",
    license: "CC BY-SA 3.0 de",
    date: "1953",
    era: "modern",
  },
  {
    id: "ch7-homo-ludens",
    src: "https://upload.wikimedia.org/wikipedia/commons/8/88/Joan_Huizinga%2C_Homo_ludens_maitrier.jpg",
    alt: "Homo Ludens book and Johan Huizinga materials",
    caption: "Homo Ludens (1938) — the book that elevated play to philosophy",
    attribution: "CC BY-SA 4.0.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Joan_Huizinga,_Homo_ludens_maitrier.jpg",
    license: "CC BY-SA 4.0",
    date: "1938",
    era: "modern",
  },
];

// ============================================================================
// ALL IMAGES EXPORT
// ============================================================================

export const allImages: ToyImage[] = [
  ...heroImages,
  ...chapter1Images,
  ...chapter2Images,
  ...chapter3Images,
  ...chapter4Images,
  ...chapter5Images,
  ...chapter6Images,
  ...chapter7Images,
];

// Helper to get images by era
export const getImagesByEra = (era: ToyImage["era"]): ToyImage[] => 
  allImages.filter(img => img.era === era);

// Helper to get image by ID
export const getImageById = (id: string): ToyImage | undefined =>
  allImages.find(img => img.id === id);
