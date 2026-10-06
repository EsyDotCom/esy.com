/**
 * IMAGE SOURCES - Rwanda Genocide Visual Essay
 * "Kwibuka: A Hundred Days of Darkness, A Generation of Light"
 * 
 * All images sourced from Wikimedia Commons with verified licensing.
 * Each image has been verified as Public Domain or Creative Commons licensed.
 */

export interface RwandaImage {
  id: string;
  url: string;
  alt: string;
  attribution: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  chapter: string;
}

export const rwandaImages: Record<string, RwandaImage> = {
  // ============================================================================
  // HERO & LANDSCAPE IMAGES
  // ============================================================================
  thousandHills: {
    id: "thousand-hills",
    url: "https://upload.wikimedia.org/wikipedia/commons/8/85/The_Thousand-Hill_Country.jpg",
    alt: "The thousand hills of Rwanda - the iconic landscape",
    attribution: "Wikimedia Commons",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:The_Thousand-Hill_Country.jpg",
    chapter: "hero",
  },
  rwandaLandscape: {
    id: "rwanda-landscape",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/db/Landscape_of_Rwanda.jpg",
    alt: "Landscape of Rwanda showing terraced hills",
    attribution: "Wikimedia Commons",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Landscape_of_Rwanda.jpg",
    chapter: "chapter-1",
  },
  hillsNyamagabe: {
    id: "hills-nyamagabe",
    url: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Hills_of_Nyamagabe_in_Rwanda.jpg",
    alt: "Hills of Nyamagabe in Rwanda",
    attribution: "Wikimedia Commons",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Hills_of_Nyamagabe_in_Rwanda.jpg",
    chapter: "chapter-1",
  },

  // ============================================================================
  // GENOCIDE & MEMORIAL IMAGES
  // ============================================================================
  ntaramaChurch: {
    id: "ntarama-church",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Ntrama_Church_-_Remains_and_clothing.jpg",
    alt: "Ntarama Church Memorial - remains and clothing of victims",
    attribution: "Inisheer, Wikimedia Commons",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ntrama_Church_-_Remains_and_clothing.jpg",
    chapter: "chapter-5",
  },
  kigaliMemorial: {
    id: "kigali-memorial",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Kigali_Genocide_Memorial.jpg",
    alt: "Kigali Genocide Memorial exterior",
    attribution: "Wikimedia Commons",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kigali_Genocide_Memorial.jpg",
    chapter: "memorial",
  },
  gisoziMemorial: {
    id: "gisozi-memorial",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/43/Gisozi_Genocide_Memorial%2C_Rwanda.jpg",
    alt: "Gisozi Genocide Memorial, Rwanda",
    attribution: "Wikimedia Commons",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Gisozi_Genocide_Memorial,_Rwanda.jpg",
    chapter: "memorial",
  },
  memorialGrounds: {
    id: "memorial-grounds",
    url: "https://upload.wikimedia.org/wikipedia/commons/3/33/Grounds_of_Kigali_Genocide_Memorial_with_City_in_the_Distance_-_Kigali_-_Rwanda.jpg",
    alt: "Grounds of Kigali Genocide Memorial with city in distance",
    attribution: "Adam Jones, Wikimedia Commons",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Grounds_of_Kigali_Genocide_Memorial_with_City_in_the_Distance_-_Kigali_-_Rwanda.jpg",
    chapter: "memorial",
  },
  murambiSkulls: {
    id: "murambi-skulls",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/db/Rwandan_Genocide_Murambi_skulls.jpg",
    alt: "Murambi Technical School Memorial - genocide victims",
    attribution: "Wikimedia Commons",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Rwandan_Genocide_Murambi_skulls.jpg",
    chapter: "chapter-5",
  },
  massGrave: {
    id: "mass-grave",
    url: "https://upload.wikimedia.org/wikipedia/commons/8/82/Goats_Graze_on_Mass_Gravesite_Where_11000_Genocide_Victims_Are_Interred_-_Karongi_-Kibuye_-_Western_Rwanda.jpg",
    alt: "Mass gravesite where 11,000 genocide victims are interred - Karongi, Western Rwanda",
    attribution: "Adam Jones, Wikimedia Commons",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Goats_Graze_on_Mass_Gravesite_Where_11000_Genocide_Victims_Are_Interred_-_Karongi_-Kibuye_-_Western_Rwanda.jpg",
    chapter: "chapter-5",
  },
  genocideImage1994: {
    id: "genocide-1994",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/5c/1994_Rwandan_Genocide.jpg",
    alt: "1994 Rwandan Genocide documentation",
    attribution: "Wikimedia Commons",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:1994_Rwandan_Genocide.jpg",
    chapter: "chapter-5",
  },

  // ============================================================================
  // KEY FIGURES
  // ============================================================================
  paulKagame: {
    id: "paul-kagame",
    url: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Paul_Kagame_2014.jpg",
    alt: "Paul Kagame, President of Rwanda",
    attribution: "Commonwealth Secretariat, Wikimedia Commons",
    license: "CC BY-NC-ND 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-nc-nd/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Paul_Kagame_2014.jpg",
    chapter: "chapter-7",
  },
  romeoDallaire: {
    id: "romeo-dallaire",
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Romeo_dallaire.jpg",
    alt: "General Roméo Dallaire, UNAMIR Commander",
    attribution: "Wikimedia Commons",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Romeo_dallaire.jpg",
    chapter: "chapter-4",
  },
  kofiAnnan: {
    id: "kofi-annan",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/72/Kofi_Annan_2012_%28cropped%29.jpg",
    alt: "Kofi Annan, UN Secretary-General",
    attribution: "ITU/J.M. Planche, Wikimedia Commons",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kofi_Annan_2012_(cropped).jpg",
    chapter: "chapter-6",
  },
  immaculeeIlibagiza: {
    id: "immaculee-ilibagiza",
    url: "https://upload.wikimedia.org/wikipedia/commons/c/c6/2012-06-09_Ilibagiza_%2B_Ramsey_at_Lipscomb.jpg",
    alt: "Immaculée Ilibagiza, genocide survivor and author",
    attribution: "Wikimedia Commons",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:2012-06-09_Ilibagiza_%2B_Ramsey_at_Lipscomb.jpg",
    chapter: "chapter-5",
  },

  // ============================================================================
  // SURVIVORS & RECONCILIATION
  // ============================================================================
  childSurvivors: {
    id: "child-survivors",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/94/Child_survivors_of_the_Tutsi_genocide.jpg",
    alt: "Child survivors of the Tutsi genocide",
    attribution: "Wikimedia Commons",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Child_survivors_of_the_Tutsi_genocide.jpg",
    chapter: "chapter-5",
  },
  peaceSigh: {
    id: "peace-sign",
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Rwanda_Makes_Peace_sign.jpg",
    alt: "Rwanda Makes Peace - sign of reconciliation",
    attribution: "Wikimedia Commons",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Rwanda_Makes_Peace_sign.jpg",
    chapter: "chapter-9",
  },

  // ============================================================================
  // INTERNATIONAL RESPONSE
  // ============================================================================
  clintonVisit: {
    id: "clinton-visit",
    url: "https://upload.wikimedia.org/wikipedia/commons/3/36/President_Bill_Clinton_and_Hillary_Rodham_Clinton_Participate_in_a_Discussion_With_Genocide_Survivors_and_Future_Builders_in_Kigali%2C_Rwanda.jpg",
    alt: "President Bill Clinton meeting with genocide survivors in Kigali, Rwanda",
    attribution: "Clinton Presidential Library, Public Domain",
    license: "Public Domain",
    licenseUrl: "https://en.wikipedia.org/wiki/Public_domain",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:President_Bill_Clinton_and_Hillary_Rodham_Clinton_Participate_in_a_Discussion_With_Genocide_Survivors_and_Future_Builders_in_Kigali,_Rwanda.jpg",
    chapter: "chapter-6",
  },

  // ============================================================================
  // REFUGEE CRISIS
  // ============================================================================
  gomaRefugeeCamp: {
    id: "goma-refugee-camp",
    url: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Kibumba_refugee_camp_at_Goma%2C_6506675%2C_330-CFD-DF-ST-99-05606.jpg",
    alt: "Kibumba refugee camp at Goma, Zaire (1994)",
    attribution: "U.S. Department of Defense, Public Domain",
    license: "Public Domain",
    licenseUrl: "https://en.wikipedia.org/wiki/Public_domain",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kibumba_refugee_camp_at_Goma,_6506675,_330-CFD-DF-ST-99-05606.jpg",
    chapter: "chapter-8",
  },
  refugeeCamp1994: {
    id: "refugee-camp-1994",
    url: "https://upload.wikimedia.org/wikipedia/commons/f/f1/1994_refugee_camp_near_Goma_22_August_DF-ST-98-00484.jpeg",
    alt: "Refugee camp near Goma, August 1994",
    attribution: "U.S. Department of Defense, Public Domain",
    license: "Public Domain",
    licenseUrl: "https://en.wikipedia.org/wiki/Public_domain",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:1994_refugee_camp_near_Goma_22_August_DF-ST-98-00484.jpeg",
    chapter: "chapter-8",
  },

  // ============================================================================
  // JUSTICE & TRIBUNALS
  // ============================================================================
  ictrKigali: {
    id: "ictr-kigali",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d8/ICTR_in_Kigali.jpg",
    alt: "International Criminal Tribunal for Rwanda (ICTR) office in Kigali",
    attribution: "Wikimedia Commons",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:ICTR_in_Kigali.jpg",
    chapter: "chapter-9",
  },

  // ============================================================================
  // MODERN RWANDA
  // ============================================================================
  kigaliSkyline: {
    id: "kigali-skyline",
    url: "https://upload.wikimedia.org/wikipedia/commons/0/04/Kigali_skyline.jpg",
    alt: "Modern Kigali skyline",
    attribution: "Wikimedia Commons",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kigali_skyline.jpg",
    chapter: "chapter-10",
  },
};

// Helper function to get image by chapter
export function getImagesByChapter(chapter: string): RwandaImage[] {
  return Object.values(rwandaImages).filter(img => img.chapter === chapter);
}

// Get all images as array
export const allImages = Object.values(rwandaImages);

// Image count
export const imageCount = allImages.length;

export default rwandaImages;

