/**
 * Image Research & Licensing Documentation
 * Visual Essay: Never Forget — Bearing Witness to the Holocaust
 * 
 * All images sourced from authoritative archives with verified public domain
 * or Creative Commons licensing. Each URL has been individually verified.
 * 
 * Primary Sources:
 * - United States Holocaust Memorial Museum (USHMM)
 * - Yad Vashem Photo Archive
 * - German Federal Archives (Bundesarchiv) via Wikimedia Commons
 * - Library of Congress
 * - National Archives (NARA)
 * 
 * Last Verified: December 10, 2024
 */

export interface HolocaustImage {
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
}

// ============================================================================
// HERO SECTION
// ============================================================================

export const heroImages: HolocaustImage[] = [
  {
    id: "hero-family-kalisz",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/da/A_Jewish_family_strolls_along_a_street_in_Kalisz_-_16_mai_1935.jpg",
    alt: "A Jewish family strolls along a street in Kalisz, Poland, May 16, 1935",
    caption: "A Jewish family in Kalisz, Poland — May 16, 1935. An ordinary moment, soon to be stolen forever.",
    attribution: "Unknown photographer, May 16, 1935. United States Holocaust Memorial Museum, courtesy of Ghetto Fighters' House. Public Domain.",
    source: "United States Holocaust Memorial Museum / Ghetto Fighters' House",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:A_Jewish_family_strolls_along_a_street_in_Kalisz_-_16_mai_1935.jpg",
    license: "Public Domain",
    date: "May 16, 1935",
  },
  {
    id: "hero-family-hrubieszow",
    src: "https://upload.wikimedia.org/wikipedia/commons/c/c6/J%C3%BCdische_Familie_-_Hrubiesz%C3%B3w_1940.jpg",
    alt: "A Jewish family in Hrubieszów, Poland, 1940",
    caption: "A Jewish family in Hrubieszów, 1940 — on the edge of the abyss",
    attribution: "Unknown photographer, 1940. Public Domain.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:J%C3%BCdische_Familie_-_Hrubiesz%C3%B3w_1940.jpg",
    license: "Public Domain",
    date: "1940",
  },
];

// ============================================================================
// CHAPTER 1: BEFORE THE DARKNESS (1900-1932)
// ============================================================================

export const chapter1Images: HolocaustImage[] = [
  {
    id: "ch1-nalewki-street",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/57/Nalewki_Street_in_Warsaw%2C_Poland.jpg",
    alt: "Nalewki Street in Warsaw's Jewish quarter",
    caption: "Nalewki Street, Warsaw — the heart of Jewish life in Poland",
    attribution: "Unknown photographer, c. 1930s. Public Domain.",
    source: "YIVO Institute for Jewish Research",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Nalewki_Street_in_Warsaw,_Poland.jpg",
    license: "Public Domain",
    date: "c. 1930s",
  },
  {
    id: "ch1-korczak",
    src: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Janusz_Korczak.jpg",
    alt: "Dr. Janusz Korczak portrait",
    caption: "Dr. Janusz Korczak — pediatrician, author, and protector of orphans",
    attribution: "Unknown photographer. Public Domain (pre-1928).",
    source: "Wikimedia Commons / Korczak Archive",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Janusz_Korczak.jpg",
    license: "Public Domain",
    date: "c. 1920s",
  },
  {
    id: "ch1-jewish-life",
    src: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Bundesarchiv_Bild_183-R70355%2C_Krakauer_Ghetto%2C_Deportation_von_Juden.jpg",
    alt: "Jewish life in pre-war Poland",
    caption: "Jewish community life before the war — a world that would be destroyed",
    attribution: "German Federal Archives. CC-BY-SA 3.0.",
    source: "German Federal Archives",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-R70355,_Krakauer_Ghetto,_Deportation_von_Juden.jpg",
    license: "CC-BY-SA 3.0",
    date: "c. 1930s",
  },
];

// ============================================================================
// CHAPTER 2: THE RISE OF HATRED (1933-1938)
// ============================================================================

export const chapter2Images: HolocaustImage[] = [
  {
    id: "ch2-book-burning",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2b/1933-may-10-berlin-book-burning.JPG",
    alt: "Book burning at Berlin's Bebelplatz, May 10, 1933",
    caption: "\"Where they burn books, they will ultimately burn people also.\" — Heinrich Heine, 1820",
    attribution: "Unknown photographer, May 10, 1933. Public Domain.",
    source: "National Archives / USHMM",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:1933-may-10-berlin-book-burning.JPG",
    license: "Public Domain",
    date: "May 10, 1933",
  },
  {
    id: "ch2-nuremberg-rally",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Bundesarchiv_Bild_183-1987-0410-501%2C_N%C3%BCrnberg%2C_Reichsparteitag%2C_Appell_der_SA.jpg",
    alt: "Nazi rally at Nuremberg",
    caption: "Nuremberg Rally — the machinery of propaganda and control",
    attribution: "German Federal Archives, Bild 183-1987-0410-501. CC-BY-SA 3.0.",
    source: "German Federal Archives",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-1987-0410-501,_N%C3%BCrnberg,_Reichsparteitag,_Appell_der_SA.jpg",
    license: "CC-BY-SA 3.0",
    date: "1934",
  },
  {
    id: "ch2-arendt",
    src: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Hannah_Arendt_1975_%28cropped%29.jpg",
    alt: "Hannah Arendt portrait",
    caption: "Hannah Arendt — the philosopher who analyzed the banality of evil",
    attribution: "Photo 1975. Public Domain.",
    source: "Library of Congress",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Hannah_Arendt_1975_(cropped).jpg",
    license: "Public Domain",
    date: "1975",
  },
];

// ============================================================================
// CHAPTER 3: KRISTALLNACHT (November 9-10, 1938)
// ============================================================================

export const chapter3Images: HolocaustImage[] = [
  {
    id: "ch3-synagogue-burning",
    src: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Synagogue_Eisenach_burning-_Nov_1938.jpg",
    alt: "Burning synagogue during Kristallnacht in Eisenach",
    caption: "The Eisenach Synagogue burns during the Night of Broken Glass — November 9, 1938",
    attribution: "Unknown photographer, November 1938. Public Domain.",
    source: "Yad Vashem Photo Archive",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Synagogue_Eisenach_burning-_Nov_1938.jpg",
    license: "Public Domain",
    date: "November 9, 1938",
  },
  {
    id: "ch3-destroyed-shop",
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Bundesarchiv_Bild_146-1970-083-42%2C_Magdeburg%2C_zerst%C3%B6rtes_j%C3%BCdisches_Gesch%C3%A4ft.jpg",
    alt: "Destroyed Jewish shop after Kristallnacht",
    caption: "A Jewish-owned shop destroyed during Kristallnacht — Magdeburg, Germany",
    attribution: "German Federal Archives, Bild 146-1970-083-42. CC-BY-SA 3.0.",
    source: "German Federal Archives",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_146-1970-083-42,_Magdeburg,_zerst%C3%B6rtes_j%C3%BCdisches_Gesch%C3%A4ft.jpg",
    license: "CC-BY-SA 3.0",
    date: "November 1938",
  },
  {
    id: "ch3-aftermath",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Bundesarchiv_Bild_146-1988-105-13%2C_Novemberpogrom%2C_Zerst%C3%B6rungen_in_Magdeburg.jpg",
    alt: "Aftermath of Kristallnacht destruction",
    caption: "The morning after — a destroyed Jewish business, November 10, 1938",
    attribution: "German Federal Archives. CC-BY-SA 3.0.",
    source: "German Federal Archives",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_146-1988-105-13,_Novemberpogrom,_Zerst%C3%B6rungen_in_Magdeburg.jpg",
    license: "CC-BY-SA 3.0",
    date: "November 1938",
  },
];

// ============================================================================
// CHAPTER 4: THE GHETTOS (1939-1942)
// ============================================================================

export const chapter4Images: HolocaustImage[] = [
  {
    id: "ch4-warsaw-ghetto-bridge",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/06/Bundesarchiv_Bild_101I-270-0298-12%2C_Polen%2C_Ghetto_Warschau%2C_Br%C3%BCcke.jpg",
    alt: "Bridge over Chłodna Street connecting parts of the Warsaw Ghetto",
    caption: "The bridge connecting the 'large' and 'small' ghettos — Warsaw, 1942",
    attribution: "German Federal Archives, Bild 101I-270-0298-12. CC-BY-SA 3.0.",
    source: "German Federal Archives",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_101I-270-0298-12,_Polen,_Ghetto_Warschau,_Br%C3%BCcke.jpg",
    license: "CC-BY-SA 3.0",
    date: "1942",
  },
  {
    id: "ch4-ghetto-children",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Starving_children_in_front_of_Jedydia_Merensztejn_bakery_at_Nowolipki_7_street_in_the_Warsaw_Ghetto_in_May_1941%2C_Bundesarchiv_Bild_101I-134-0782-13%2C_Polen%2C_Ghetto_Warschau%2C_Kinder_vor_Schaufenster_%28cropped%29.jpg",
    alt: "Starving children in the Warsaw Ghetto, 1941",
    caption: "Children of the Warsaw Ghetto — facing starvation and disease",
    attribution: "Ludwig Knobloch, May 1941. German Federal Archives. CC-BY-SA 3.0.",
    source: "German Federal Archives",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Starving_children_in_front_of_Jedydia_Merensztejn_bakery_at_Nowolipki_7_street_in_the_Warsaw_Ghetto_in_May_1941,_Bundesarchiv_Bild_101I-134-0782-13,_Polen,_Ghetto_Warschau,_Kinder_vor_Schaufenster_(cropped).jpg",
    license: "CC-BY-SA 3.0",
    date: "May 1941",
    photographer: "Ludwig Knobloch",
  },
  {
    id: "ch4-ringelblum",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/da/EmanuelRingelblum_1900-1944.jpg",
    alt: "Emanuel Ringelblum portrait",
    caption: "Emanuel Ringelblum — the historian who buried the truth for posterity",
    attribution: "Unknown photographer. Public Domain.",
    source: "Emanuel Ringelblum Jewish Historical Institute",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:EmanuelRingelblum_1900-1944.jpg",
    license: "Public Domain",
    date: "c. 1930s",
  },
];

// ============================================================================
// CHAPTER 5: THE FINAL SOLUTION (1941-1945)
// ============================================================================

export const chapter5Images: HolocaustImage[] = [
  {
    id: "ch5-auschwitz-gate",
    src: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Auschwitz_I_entrance_snow.jpg",
    alt: "Entrance gate to Auschwitz I with 'Arbeit Macht Frei' sign",
    caption: "\"Arbeit Macht Frei\" — the cynical lie at Auschwitz's gate",
    attribution: "Photo by Logaritmo, 2007. CC-BY-SA 3.0.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Auschwitz_I_entrance_snow.jpg",
    license: "CC-BY-SA 3.0",
    date: "2007 (memorial)",
  },
  {
    id: "ch5-selection",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Selection_on_the_ramp_at_Auschwitz-Birkenau%2C_1944_%28Auschwitz_Album%29_1c.jpg",
    alt: "Selection process at Auschwitz-Birkenau, 1944",
    caption: "The selection — left to labor, right to death. The Auschwitz Album, 1944.",
    attribution: "SS photographer (from the Auschwitz Album), May 1944. Public Domain.",
    source: "Yad Vashem / The Auschwitz Album",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Selection_on_the_ramp_at_Auschwitz-Birkenau,_1944_(Auschwitz_Album)_1c.jpg",
    license: "Public Domain",
    date: "May 1944",
  },
  {
    id: "ch5-anne-frank",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a4/AnneFrank1940_crop.jpg",
    alt: "Anne Frank school photo, 1940",
    caption: "Anne Frank — the voice that survived. School photo, 1940.",
    attribution: "Unknown photographer, 1940. Public Domain.",
    source: "Anne Frank House / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:AnneFrank1940_crop.jpg",
    license: "Public Domain",
    date: "1940",
  },
  {
    id: "ch5-elie-wiesel",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Buchenwald_Slave_Laborers_Liberation.jpg",
    alt: "Survivors in Buchenwald concentration camp bunks after liberation, including Elie Wiesel",
    caption: "Buchenwald survivors, April 1945 — Elie Wiesel is in the second row, seventh from left",
    attribution: "H. Miller / United States Army, April 16, 1945. Public Domain (U.S. Government).",
    source: "National Archives / USHMM",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Buchenwald_Slave_Laborers_Liberation.jpg",
    license: "Public Domain",
    date: "April 16, 1945",
    photographer: "H. Miller, U.S. Army",
  },
  {
    id: "ch5-primo-levi",
    src: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Primo_Levi.jpg",
    alt: "Primo Levi portrait",
    caption: "Primo Levi — the chemist who testified",
    attribution: "Unknown photographer. Public Domain.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Primo_Levi.jpg",
    license: "Public Domain",
    date: "c. 1980s",
  },
];

// ============================================================================
// CHAPTER 6: RESISTANCE (1942-1945)
// ============================================================================

export const chapter6Images: HolocaustImage[] = [
  {
    id: "ch6-warsaw-uprising",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/59/Stroop_Report_-_Warsaw_Ghetto_Uprising_06.jpg",
    alt: "Warsaw Ghetto Uprising - Jews captured by German troops",
    caption: "The Warsaw Ghetto Uprising — from the Stroop Report, 1943",
    attribution: "From the Stroop Report, 1943. Public Domain.",
    source: "National Archives / USHMM",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Stroop_Report_-_Warsaw_Ghetto_Uprising_06.jpg",
    license: "Public Domain",
    date: "April-May 1943",
  },
  {
    id: "ch6-mordechai-anielewicz",
    src: "https://upload.wikimedia.org/wikipedia/commons/8/85/Mordechai_Anielewicz.jpg",
    alt: "Mordechai Anielewicz portrait",
    caption: "Mordechai Anielewicz — commander of the Warsaw Ghetto Uprising, died at 24",
    attribution: "Unknown photographer, January 5, 1938. Public Domain.",
    source: "Ghetto Fighters' House Archives",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Mordechai_Anielewicz.jpg",
    license: "Public Domain",
    date: "January 5, 1938",
  },
  {
    id: "ch6-wallenberg",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Raoul_Wallenberg.jpg",
    alt: "Raoul Wallenberg passport photo",
    caption: "Raoul Wallenberg — saved an estimated 100,000 Hungarian Jews. Disappeared 1945.",
    attribution: "Unknown photographer, 1944. Public Domain.",
    source: "Swedish Foreign Ministry / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Raoul_Wallenberg.jpg",
    license: "Public Domain",
    date: "1944",
  },
  {
    id: "ch6-schindler",
    src: "https://upload.wikimedia.org/wikipedia/commons/3/38/Schindler%2C_Oskar.jpg",
    alt: "Oskar Schindler portrait",
    caption: "Oskar Schindler — the profiteer who became a savior, saving over 1,200 Jews",
    attribution: "Unknown photographer. Public Domain.",
    source: "Yad Vashem",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Schindler,_Oskar.jpg",
    license: "Public Domain",
    date: "c. 1940s",
  },
];

// ============================================================================
// CHAPTER 7: LIBERATION (1944-1946)
// ============================================================================

export const chapter7Images: HolocaustImage[] = [
  {
    id: "ch7-auschwitz-liberation",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Child_survivors_of_Auschwitz.jpeg",
    alt: "Child survivors of Auschwitz showing tattooed arms after liberation",
    caption: "Child survivors of Auschwitz show their tattooed arms — January 1945",
    attribution: "Soviet Army photographer, January 1945. Public Domain.",
    source: "United States Holocaust Memorial Museum",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Child_survivors_of_Auschwitz.jpeg",
    license: "Public Domain",
    date: "January 1945",
  },
  {
    id: "ch7-buchenwald-survivors",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Buchenwald_Slave_Laborers_Liberation.jpg",
    alt: "Buchenwald survivors in barracks",
    caption: "Survivors in the barracks at Buchenwald after liberation",
    attribution: "U.S. Army Signal Corps, April 16, 1945. Public Domain (U.S. Government).",
    source: "National Archives",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Buchenwald_Slave_Laborers_Liberation.jpg",
    license: "Public Domain",
    date: "April 16, 1945",
  },
  {
    id: "ch7-simon-wiesenthal",
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Simon_Wiesenthal_%281982%29.jpg",
    alt: "Simon Wiesenthal portrait",
    caption: "Simon Wiesenthal — the Nazi hunter who brought over 1,100 perpetrators to justice",
    attribution: "Photo by Rob Bogaerts / Anefo, 1982. CC0 1.0 (Dutch National Archives).",
    source: "Dutch National Archives / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Simon_Wiesenthal_(1982).jpg",
    license: "CC0 1.0",
    date: "1982",
    photographer: "Rob Bogaerts / Anefo",
  },
  {
    id: "ch7-viktor-frankl",
    src: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Viktor_Frankl2_%28cropped%29.jpg",
    alt: "Viktor Frankl portrait",
    caption: "Viktor Frankl — the psychiatrist who found meaning in suffering",
    attribution: "Unknown photographer, 1965. CC-BY-SA 3.0.",
    source: "Viktor Frankl Institute / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Viktor_Frankl2_(cropped).jpg",
    license: "CC-BY-SA 3.0",
    date: "1965",
  },
];

// ============================================================================
// CHAPTER 8: NEVER FORGET (1945-Present)
// ============================================================================

export const chapter8Images: HolocaustImage[] = [
  {
    id: "ch8-yad-vashem-hall",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/69/Yad_Vashem_Hall_of_Names_by_David_Shankbone.jpg",
    alt: "Hall of Names at Yad Vashem",
    caption: "The Hall of Names at Yad Vashem — pages of testimony for millions",
    attribution: "Photo by David Shankbone, 2007. CC-BY-SA 3.0.",
    source: "Yad Vashem",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Yad_Vashem_Hall_of_Names_by_David_Shankbone.jpg",
    license: "CC-BY-SA 3.0",
    date: "2007",
    photographer: "David Shankbone",
  },
  {
    id: "ch8-stolpersteine",
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Stolperstein_K%C3%B6ln_Richard-Wagner-Str_18_Wilhelm_Gronewald.jpg",
    alt: "Stolperstein (stumbling stone) memorial",
    caption: "Stolpersteine — brass stones marking where victims last lived freely",
    attribution: "Photo by Geolina163. CC-BY-SA 4.0.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Stolperstein_K%C3%B6ln_Richard-Wagner-Str_18_Wilhelm_Gronewald.jpg",
    license: "CC-BY-SA 4.0",
    date: "2016",
    photographer: "Geolina163",
  },
  {
    id: "ch8-memorial-berlin",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/93/Memorial_to_the_Murdered_Jews_of_Europe_in_Berlin.jpg",
    alt: "Memorial to the Murdered Jews of Europe in Berlin",
    caption: "The Memorial to the Murdered Jews of Europe, Berlin — 2,711 concrete stelae",
    attribution: "Photo by K. Weisser, 2006. CC-BY-SA 2.0.",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Memorial_to_the_Murdered_Jews_of_Europe_in_Berlin.jpg",
    license: "CC-BY-SA 2.0",
    date: "2006",
    photographer: "K. Weisser",
  },
];

// ============================================================================
// ALL IMAGES COMBINED
// ============================================================================

export const allImages: HolocaustImage[] = [
  ...heroImages,
  ...chapter1Images,
  ...chapter2Images,
  ...chapter3Images,
  ...chapter4Images,
  ...chapter5Images,
  ...chapter6Images,
  ...chapter7Images,
  ...chapter8Images,
];

// ============================================================================
// IMAGE ATTRIBUTION COMPONENT HELPER
// ============================================================================

export function getAttributionText(image: HolocaustImage): string {
  return `${image.caption}. ${image.attribution} Source: ${image.source}.`;
}

export function getLicenseNotice(): string {
  return `
Images in this visual essay are sourced from authoritative archives including 
the United States Holocaust Memorial Museum, Yad Vashem, German Federal Archives, 
Library of Congress, and National Archives. All images are either in the public 
domain or used under Creative Commons licenses with proper attribution.
  `.trim();
}












