/**
 * Image Research & Licensing Documentation
 * Visual Essay: Phonē: From Voice to Device
 *
 * All images sourced from authoritative archives with verified public domain
 * or Creative Commons licensing. Each URL verified via Wikimedia API.
 *
 * Primary Sources:
 * - Wikimedia Commons (verified institutional uploads)
 * - Library of Congress (LOC)
 * - US Patent Office (public domain government documents)
 * - Unsplash (CC0 / free license)
 *
 * Last Verified: February 2026
 */

export interface PhoneEssayImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  attribution: string;
  source: string;
  sourceUrl: string;
  license: string;
  date?: string;
  era: string;
}

// ============================================================================
// ERA 1: ANCIENT GREEK (Section 1) — 5 images
// ============================================================================

export const greekEraImages: PhoneEssayImage[] = [
  {
    id: "V1",
    src: "https://images.esy.com/essays/the-word-phone/symposium-scene-nicias-painter-man.58b9bc254b.webp",
    alt: "Ancient Greek red-figure pottery showing a symposium scene with figures in conversation, painted by the Nicias Painter.",
    caption: "Greek red-figure pottery showing a symposium — the world where phonē was a living word",
    attribution: "Red-figure krater, Nicias Painter, 4th c. BCE. Museo Archeologico Nazionale, Naples.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Symposium_scene_Nicias_Painter_MAN.jpg",
    license: "Public Domain",
    date: "4th c. BCE",
    era: "greek",
  },
  {
    id: "V2",
    src: "https://images.esy.com/essays/the-word-phone/p-oxy-1231.8c70f8e118.webp",
    alt: "Papyrus Oxyrhynchus 1231, an ancient Greek papyrus fragment containing poems by Sappho.",
    caption: "Papyrus fragment containing ancient Greek text — the surface phonē was first written on",
    attribution: "Papyrus Oxyrhynchus 1231, 2nd c. CE. Bodleian Library, Oxford.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:P._Oxy._1231.jpg",
    license: "Public Domain",
    date: "2nd c. CE",
    era: "greek",
  },
  {
    id: "V3",
    src: "https://images.esy.com/essays/the-word-phone/ancient-theatre-of-the-asklepieion-at-epidaurus-52002772549.ce92bf3176.webp",
    alt: "The ancient Theatre of Epidaurus in Greece, showing the perfectly preserved semicircular stone seating and orchestra.",
    caption: "The Theatre of Epidaurus — architecture designed to carry phonē across 14,000 seats",
    attribution: "Theatre of Epidaurus, 4th c. BCE. Photo: Wikimedia Commons.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ancient_Theatre_of_the_Asklepieion_at_Epidaurus_-_52002772549.jpg",
    license: "CC BY-SA 4.0",
    date: "4th c. BCE (modern photograph)",
    era: "greek",
  },
  {
    id: "V4",
    src: "https://images.esy.com/essays/the-word-phone/aristotle-altemps-inv8575.5d7814ebc3.webp",
    alt: "Marble bust of Aristotle, Roman copy after a Greek bronze original by Lysippos.",
    caption: "Aristotle — who defined phonē as 'sound significant by convention'",
    attribution: "Marble bust of Aristotle, Roman copy after Lysippos. Palazzo Altemps, Rome.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Aristotle_Altemps_Inv8575.jpg",
    license: "Public Domain",
    date: "Roman copy of 4th c. BCE original",
    era: "greek",
  },
  {
    id: "V5",
    src: "https://images.esy.com/essays/the-word-phone/marble-slab-with-greek-writing.7093c1ad28.webp",
    alt: "Ancient marble slab with carved Greek inscription showing clearly visible Greek letters.",
    caption: "Greek inscription carved in stone — the word made permanent in marble",
    attribution: "Marble slab with Greek decree inscription. Wikimedia Commons.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Marble_slab_with_Greek_writing.jpg",
    license: "CC BY-SA 3.0",
    date: "Classical period",
    era: "greek",
  },
];

// ============================================================================
// ERA 2: THE LATIN BRIDGE (Section 2) — 3 images
// ============================================================================

export const latinEraImages: PhoneEssayImage[] = [
  {
    id: "V6",
    src: "https://images.esy.com/essays/the-word-phone/page-from-the-arthurian-romances-illuminated-manuscript.3f2233db7e.webp",
    alt: "Richly illuminated medieval manuscript page from the Arthurian Romances, with ornate lettering and decorative borders.",
    caption: "Illuminated medieval manuscript — the preservation vessel for Greek learning",
    attribution: "Arthurian Romances illuminated manuscript, medieval. Wikimedia Commons.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Page_from_the_Arthurian_Romances_illuminated_manuscript.jpg",
    license: "Public Domain",
    date: "Medieval period",
    era: "latin",
  },
  {
    id: "V7",
    src: "https://images.esy.com/essays/the-word-phone/kellsfol034rchirhomonogram.d64661bdd6.webp",
    alt: "The Chi Rho monogram page from the Book of Kells, an illuminated manuscript masterpiece.",
    caption: "The Book of Kells — Greek letters preserved through monastic devotion",
    attribution: "Book of Kells, folio 34r, Chi Rho page, c. 800 CE. Trinity College Dublin.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:KellsFol034rChiRhoMonogram.jpg",
    license: "Public Domain",
    date: "c. 800 CE",
    era: "latin",
  },
  {
    id: "V8",
    src: "https://images.esy.com/essays/the-word-phone/faraday-lecture-at-royal-institution-1856.5e4b40ae31.webp",
    alt: "Michael Faraday lecturing at the Royal Institution before Prince Albert and other dignitaries in 1856.",
    caption: "Faraday at the Royal Institution (1856) — where gentlemen scientists reached for Greek to name their inventions",
    attribution: "Faraday lecturing at the Royal Institution, 1856. Illustration by H.B.H.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Faraday_lecture_at_Royal_Institution_1856.jpg",
    license: "Public Domain",
    date: "1856",
    era: "latin",
  },
];

// ============================================================================
// ERA 3: THE COMPOUND EXPLOSION (Section 3) — 8 images
// ============================================================================

export const compoundEraImages: PhoneEssayImage[] = [
  {
    id: "V9",
    src: "https://images.esy.com/essays/the-word-phone/wheatstone-charles-drawing-1868.9b0892ad1e.webp",
    alt: "Portrait drawing of Sir Charles Wheatstone, English physicist who coined the word microphone in 1827.",
    caption: "Sir Charles Wheatstone — coined 'microphone' (small-sound) in 1827",
    attribution: "Charles Wheatstone drawing, 1868. Wikimedia Commons.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Wheatstone_Charles_drawing_1868.jpg",
    license: "Public Domain",
    date: "1868",
    era: "compound",
  },
  {
    id: "V10",
    src: "https://images.esy.com/essays/the-word-phone/adolphe-sax.b6a0ec2c59.webp",
    alt: "Portrait photograph of Adolphe Sax, the Belgian instrument maker who invented the saxophone.",
    caption: "Adolphe Sax — his name merged with phonē to create 'saxophone'",
    attribution: "Portrait of Adolphe Sax, c. 1850s. Wikimedia Commons.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Adolphe_Sax.jpg",
    license: "Public Domain",
    date: "c. 1850s",
    era: "compound",
  },
  {
    id: "V11",
    src: "https://images.esy.com/essays/the-word-phone/adolphe-sax-horns-from-patent-drawing.f77cb47408.webp",
    alt: "Patent drawing showing Adolphe Sax's saxophone and saxhorn instruments from 1846.",
    caption: "Sax's patent drawing — the physical fusion of a personal name and an ancient Greek root",
    attribution: "Adolphe Sax patent drawing, 1846. Wikimedia Commons.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Adolphe-Sax-Horns-From-Patent-Drawing.jpg",
    license: "Public Domain",
    date: "1846",
    era: "compound",
  },
  {
    id: "V12",
    src: "https://images.esy.com/essays/the-word-phone/xylophone-28imso-pp59-29.cb94fb7baa.webp",
    alt: "A xylophone instrument illustration from Instruments of the Modern Symphony Orchestra, 1917.",
    caption: "Xylophone — 'wood-sound' (xylo + phonē, 1866)",
    attribution: "Xylophone illustration, Instruments of the Modern Symphony Orchestra, 1917.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Xylophone_(IMSO_pp59).jpg",
    license: "Public Domain",
    date: "1917 illustration",
    era: "compound",
  },
  {
    id: "V13",
    src: "https://images.esy.com/essays/the-word-phone/edison-and-phonograph-edit1.46da4bba8a.webp",
    alt: "Thomas Edison seated with his phonograph invention, photographed by Levin C. Handy circa 1877.",
    caption: "Edison with the phonograph — phonē amplified, recorded, and reproduced",
    attribution: "Edison and phonograph, c. 1877. Brady-Handy Collection, Library of Congress.",
    source: "Wikimedia Commons / Library of Congress",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Edison_and_phonograph_edit1.jpg",
    license: "Public Domain",
    date: "c. 1877-1878",
    era: "compound",
  },
  {
    id: "V14",
    src: "https://images.esy.com/essays/the-word-phone/emile-berliner-with-disc-record-gramophone-between-1910-and-1929.c3d7cb5b57.webp",
    alt: "Emile Berliner with his disc-playing gramophone, the 'writing-sound' device.",
    caption: "Berliner with his gramophone — 'writing-sound' (grapho + phonē, 1887)",
    attribution: "Emile Berliner with gramophone, c. 1910-1929. Library of Congress.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Emile_Berliner_with_disc_record_gramophone_-_between_1910_and_1929.jpg",
    license: "Public Domain",
    date: "c. 1910-1929",
    era: "compound",
  },
  {
    id: "V15",
    src: "https://images.esy.com/essays/the-word-phone/reis-27-telephone.bfbfa1ae9b.webp",
    alt: "Illustration of Johann Philipp Reis's Telephon device from 1861 — the first apparatus called a telephone.",
    caption: "Reis's 1861 Telephon — the first device called a 'telephone', 15 years before Bell",
    attribution: "Reis Telephone illustration, from Uppfinningarnas bok, 1874. Wikimedia Commons.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Reis%27_telephone.png",
    license: "Public Domain",
    date: "1861 device; 1874 illustration",
    era: "compound",
  },
  {
    id: "V16",
    src: "https://images.esy.com/essays/the-word-phone/bell-liquid-telephone-transmitter-1876.4658b4591e.webp",
    alt: "Drawing of Bell's liquid telephone transmitter from 1876, showing the first device to transmit human speech.",
    caption: "Bell's liquid transmitter (1876) — the concept of 'far-sound' made physical",
    attribution: "Bell liquid telephone transmitter, 1876. Wikimedia Commons.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Bell_liquid_telephone_transmitter_1876.png",
    license: "Public Domain",
    date: "1876",
    era: "compound",
  },
];

// ============================================================================
// ERA 4: THE BELL MOMENT (Section 4) — 8 images
// ============================================================================

export const bellEraImages: PhoneEssayImage[] = [
  {
    id: "V17",
    src: "https://images.esy.com/essays/the-word-phone/alexander-graham-bell.bbf03d36c5.webp",
    alt: "Portrait photograph of Alexander Graham Bell, the man who made the word telephone globally famous.",
    caption: "Alexander Graham Bell — the man who made phonē the most famous Greek root in the world",
    attribution: "Alexander Graham Bell, c. 1914-1919. Moffett Studio. Library and Archives Canada.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Alexander_Graham_Bell.jpg",
    license: "Public Domain",
    date: "c. 1914-1919",
    era: "bell",
  },
  {
    id: "V18",
    src: "https://images.esy.com/essays/the-word-phone/portrait-of-sir-charles-wheatstone-wellcome-m0006781.5ffdc5ff38.webp",
    alt: "Portrait of Sir Charles Wheatstone by the Wellcome Collection, half-length facing right.",
    caption: "The scientific world obsessed with phonē — naming every sound device with Greek",
    attribution: "Portrait of Sir Charles Wheatstone. Wellcome Collection. CC BY 4.0.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Portrait_of_Sir_Charles_Wheatstone_Wellcome_M0006781.jpg",
    license: "CC BY 4.0",
    date: "19th c.",
    era: "bell",
  },
  {
    id: "V19",
    src: "https://images.esy.com/essays/the-word-phone/mabel-hubbard-bell-ppmsc-00849.f38886c347.webp",
    alt: "Portrait of Mabel Hubbard Bell, Alexander Graham Bell's deaf wife, seated facing front.",
    caption: "Mabel Hubbard Bell — the deaf woman who married the man who made the world hear at a distance",
    attribution: "Mabel Hubbard Bell, c. 1917. Harris & Ewing. Library of Congress.",
    source: "Wikimedia Commons / Library of Congress",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Mabel_Hubbard_Bell_ppmsc.00849.jpg",
    license: "Public Domain",
    date: "c. 1917",
    era: "bell",
  },
  {
    id: "V20",
    src: "https://images.esy.com/essays/the-word-phone/uspto-telephone-patent-no-174465.954da49162.webp",
    alt: "US Patent 174,465 — Alexander Graham Bell's telephone patent drawing, filed February 14, 1876.",
    caption: "US Patent 174,465 — the legal document that made the word 'telephone' commercially real",
    attribution: "US Patent 174,465, A.G. Bell, filed Feb 14, 1876. US Patent Office.",
    source: "Wikimedia Commons / US Patent Office",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:USPTO_Telephone_Patent_No._174465.jpg",
    license: "Public Domain (US Government)",
    date: "Filed February 14, 1876",
    era: "bell",
  },
  {
    id: "V21",
    src: "https://images.esy.com/essays/the-word-phone/bell-22gallows-22-telephone-1875-side-view.cc3fad8e7c.webp",
    alt: "Bell's gallows telephone from 1875, the first telephone transmitter and receiver.",
    caption: "Bell's 'gallows' telephone (1875) — the physical object the word became permanently attached to",
    attribution: "Bell gallows telephone, 1875, side view. Wikimedia Commons.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Bell_%22gallows%22_telephone_1875_side_view.jpg",
    license: "Public Domain",
    date: "1875",
    era: "bell",
  },
  {
    id: "V22",
    src: "https://images.esy.com/essays/the-word-phone/portrait-elisha-gray.08dd2853c5.webp",
    alt: "Portrait photograph of Elisha Gray, the inventor who filed a telephone caveat the same day as Bell.",
    caption: "Elisha Gray — the man who lost the word by hours",
    attribution: "Portrait of Elisha Gray, 1878. Oberlin College Archives.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Portrait_elisha_gray.jpg",
    license: "Public Domain",
    date: "1878",
    era: "bell",
  },
  {
    id: "V23",
    src: "https://images.esy.com/essays/the-word-phone/photograph-of-women-working-at-a-bell-system-telephone-switchboard-283660047829-29.353d00f0bd.webp",
    alt: "Women operators working at a Bell System telephone switchboard, connecting calls by hand.",
    caption: "Telephone exchange operators — the word made physical infrastructure",
    attribution: "Bell System telephone switchboard operators. Wikimedia Commons.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Photograph_of_Women_Working_at_a_Bell_System_Telephone_Switchboard_(3660047829).jpg",
    license: "Public Domain",
    date: "Early 20th c.",
    era: "bell",
  },
  {
    id: "V24",
    src: "https://images.esy.com/essays/the-word-phone/new-haven-directory-1878.ab015aae71.webp",
    alt: "The 1878 New Haven telephone directory — the world's first phone book.",
    caption: "First telephone directory (New Haven, 1878) — the word entering commercial culture",
    attribution: "New Haven District Telephone Company directory, 1878. Wikimedia Commons.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:New_haven_directory_1878.jpg",
    license: "Public Domain",
    date: "1878",
    era: "bell",
  },
];

// ============================================================================
// ERA 5: THE GREAT TRUNCATION (Section 5) — 7 images
// ============================================================================

export const truncationEraImages: PhoneEssayImage[] = [
  {
    id: "V25",
    src: "https://images.esy.com/essays/the-word-phone/first-bell-telephone-1875.ede4a4a512.webp",
    alt: "Illustration of the first Bell telephone from 1875, showing the transmitter and receiver.",
    caption: "The first Bell telephone (1875) — the device that launched the age of 'phone' words",
    attribution: "First Bell telephone, 1875. Wikimedia Commons.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:First_Bell_telephone_1875.png",
    license: "Public Domain",
    date: "1875",
    era: "truncation",
  },
  {
    id: "V26",
    src: "https://images.esy.com/essays/the-word-phone/candlestick-phone.93123818f8.webp",
    alt: "A Western Electric candlestick telephone from the early 1900s — the first 'phone' form factor.",
    caption: "Candlestick telephone — the device people first called 'the phone'",
    attribution: "Western Electric candlestick telephone. Wikimedia Commons.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Candlestick_phone.JPG",
    license: "Public Domain",
    date: "c. 1900s-1910s",
    era: "truncation",
  },
  {
    id: "V27",
    src: "https://images.esy.com/essays/the-word-phone/alexander-graham-bell-27s-telephone-patent-drawing-and-oath-nara-302052-28page-2-29.e48497d1ea.webp",
    alt: "Alexander Graham Bell's telephone patent drawing and oath from the National Archives.",
    caption: "Bell's patent oath — the word 'telephone' inscribed into law",
    attribution: "Bell Telephone Patent Drawing and Oath. NARA. Wikimedia Commons.",
    source: "Wikimedia Commons / National Archives",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Alexander_Graham_Bell%27s_Telephone_Patent_Drawing_and_Oath_-_NARA_-_302052_(page_2).jpg",
    license: "Public Domain",
    date: "1876",
    era: "truncation",
  },
  {
    id: "V28",
    src: "https://images.esy.com/essays/the-word-phone/red-telephone-box-2c-st-paul-27s-cathedral-2c-london-2c-england-2c-gb-2c-img-5182-edit.e73a3847e5.webp",
    alt: "Classic red K2 telephone box in front of St Paul's Cathedral, London.",
    caption: "The red phone booth — the word 'phone' made into architecture",
    attribution: "Red telephone box, St Paul's Cathedral, London. Wikimedia Commons.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Red_telephone_box,_St_Paul%27s_Cathedral,_London,_England,_GB,_IMG_5182_edit.jpg",
    license: "CC BY-SA 3.0",
    date: "K2 design, 1926",
    era: "truncation",
  },
  {
    id: "V29",
    src: "https://images.esy.com/essays/the-word-phone/royal-institution-lecture-theatre.d60291330e.webp",
    alt: "The Royal Institution lecture theatre in London, where scientific naming conventions were born.",
    caption: "The Royal Institution — institution where Greek-rooted naming became convention",
    attribution: "Royal Institution Lecture Theatre. Wikimedia Commons.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Royal_Institution_Lecture_Theatre.jpg",
    license: "CC BY-SA 3.0",
    date: "Modern photograph of 19th c. institution",
    era: "truncation",
  },
  {
    id: "V30",
    src: "https://images.esy.com/essays/the-word-phone/siemens-and-halske-telephone-with-a-rotary-dial-1910-cropped.987c314c16.webp",
    alt: "Vintage rotary dial telephone by Siemens and Halske, the archetypal mid-century phone.",
    caption: "Rotary dial telephone — the archetypal 'phone'",
    attribution: "Siemens & Halske rotary dial telephone, c. 1910. Wikimedia Commons.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Siemens_and_Halske_Telephone_with_a_rotary_dial_1910_cropped.jpg",
    license: "CC BY-SA 3.0",
    date: "c. 1910",
    era: "truncation",
  },
  {
    id: "V31",
    src: "https://images.esy.com/essays/the-word-phone/dynatac8000x.9a20b9b7f0.webp",
    alt: "A Motorola DynaTAC 8000X — the first commercially available handheld cell phone from 1984.",
    caption: "Motorola DynaTAC 8000X (1984) — 'phone' begins detaching from landlines",
    attribution: "Motorola DynaTAC 8000X. Wikimedia Commons.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:DynaTAC8000X.jpg",
    license: "CC BY-SA 3.0",
    date: "1984",
    era: "truncation",
  },
];

// ============================================================================
// ERA 6: THE SMARTPHONE SINGULARITY (Section 6) — 7 images
// ============================================================================

export const modernEraImages: PhoneEssayImage[] = [
  {
    id: "V32",
    src: "https://images.esy.com/essays/the-word-phone/motorola-dynatac.7dc55a1f4e.webp",
    alt: "A Motorola DynaTAC mobile phone on display — the 'brick phone' era.",
    caption: "The Motorola DynaTAC on display — the first mobile 'phone'",
    attribution: "Motorola DynaTAC. Wikimedia Commons.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Motorola_DynaTAC.jpg",
    license: "CC BY-SA 4.0",
    date: "1983",
    era: "modern",
  },
  {
    id: "V33",
    src: "https://images.esy.com/essays/the-word-phone/nokia-3310-blue.36ea4190b0.webp",
    alt: "The iconic Nokia 3310 mobile phone in blue — peak 'phone as phone' before the smartphone era.",
    caption: "Nokia 3310 — the last era when 'phone' primarily meant voice",
    attribution: "Nokia 3310. Wikimedia Commons.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Nokia_3310_blue.jpg",
    license: "CC BY-SA 3.0",
    date: "2000",
    era: "modern",
  },
  {
    id: "V34",
    src: "https://images.esy.com/essays/the-word-phone/blackberry-8820-2c-blackberry-bold-9900-and-blackberry-classic.abf70512d1.webp",
    alt: "Three generations of BlackBerry devices showing the evolution from phone to smartphone.",
    caption: "BlackBerry evolution — still called a 'phone' but primarily used for email",
    attribution: "BlackBerry 8820, Bold 9900, and Classic. Wikimedia Commons.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:BlackBerry_8820,_BlackBerry_Bold_9900_and_BlackBerry_Classic.jpg",
    license: "CC BY-SA 4.0",
    date: "2007-2014",
    era: "modern",
  },
  {
    id: "V35",
    src: "https://images.esy.com/essays/the-word-phone/iphone-first-generation-8gb-283680455198-29.f8fa707efd.webp",
    alt: "The original first-generation iPhone from 2007 — the device that redefined what phone means.",
    caption: "iPhone 1st generation (2007) — the moment 'phone' became 'pocket computer'",
    attribution: "iPhone First Generation, 2007. Photo: Carl Berkeley. Wikimedia Commons.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:IPhone_First_Generation_8GB_(3680455198).jpg",
    license: "CC BY-SA 2.0",
    date: "2007",
    era: "modern",
  },
  {
    id: "V36",
    src: "https://images.esy.com/essays/the-word-phone/modern-smartphone-in-hand.9de1d9464d.webp",
    alt: "A modern smartphone held in hand, showing the glass touchscreen — the current referent of the word phone.",
    caption: "The modern smartphone — an object bearing no resemblance to Bell's 1876 device",
    attribution: "Photo: Unsplash (free license)",
    source: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/b5B_Kk6LF3s",
    license: "Unsplash License (free)",
    date: "Contemporary",
    era: "modern",
  },
  {
    id: "V37",
    src: "https://images.esy.com/essays/the-word-phone/person-using-smartphone-not-calling.44bc8d6597.webp",
    alt: "A person absorbed in their smartphone screen — eyes, not mouth, engaged with the phone.",
    caption: "Using a 'phone' without any voice — the word's meaning has fossilized",
    attribution: "Photo: Unsplash (free license)",
    source: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/ZKBKwNpSzKg",
    license: "Unsplash License (free)",
    date: "Contemporary",
    era: "modern",
  },
  {
    id: "V38",
    src: "https://images.esy.com/essays/the-word-phone/hand-holding-smartphone-closing.970b51e3e7.webp",
    alt: "Close-up of a hand holding a smartphone with warm light.",
    caption: "phonē — voice — in the palm of your hand",
    attribution: "Photo: Unsplash (free license)",
    source: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/N3btvQ51dL0",
    license: "Unsplash License (free)",
    date: "Contemporary",
    era: "modern",
  },
];

// ============================================================================
// ALL IMAGES (combined export for migration script)
// ============================================================================

export const allImages: PhoneEssayImage[] = [
  ...greekEraImages,
  ...latinEraImages,
  ...compoundEraImages,
  ...bellEraImages,
  ...truncationEraImages,
  ...modernEraImages,
];
